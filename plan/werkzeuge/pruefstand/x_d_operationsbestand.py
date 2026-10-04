"""Vorhandene D12-Pixel und D15-Zeichenlisten auswerten; keine neue Aufnahme."""
import json, os, time
from pathlib import Path
from collections import Counter
from PIL import Image, ImageChops

base = Path(os.environ['TEMP'])
out = base / ('paket-d-operationen-' + str(time.time_ns()))
out.mkdir(exist_ok=False)
photos = base / 'paket-d-fotos/d12-20261003-stand1'
report = {'historische_pixel': [], 'kalte_operationen': []}
for name, folder in [('320-dunkel-bewegt-voll-einst-konto-loeschen', 'nach'),
                     ('390-dunkel-bewegt-leer-einstellungen', 'nach-fortsetzung')]:
    a = Image.open(photos/'vor'/(name+'.png')).convert('RGB')
    b = Image.open(photos/folder/(name+'.png')).convert('RGB')
    d = ImageChops.difference(a,b)
    box = d.getbbox()
    points = [(x,y) for y in range(box[1],box[3]) for x in range(box[0],box[2]) if a.getpixel((x,y)) != b.getpixel((x,y))]
    colors = Counter((a.getpixel(q), b.getpixel(q)) for q in points)
    r = {'name': name, 'size': a.size, 'bounds': box, 'count': len(points),
         'color_pairs': [{'vor': c[0], 'nach': c[1], 'count': n} for c,n in colors.most_common(30)]}
    if len(points) < 100:
        r['pixels'] = [{'xy': q, 'vor': a.getpixel(q), 'nach': b.getpixel(q)} for q in points]
        # Ganze Bilder durchsuchen, keine Abnahmemaske: kommt der rote Ausschnitt anderswo vor?
        patch = b.crop(box)
        matches = []
        for image_name, im in [('vor',a), ('nach',b)]:
            target = patch.getpixel((0,0))
            for y in range(im.height-patch.height+1):
                for x in range(im.width-patch.width+1):
                    if im.getpixel((x,y)) == target and im.crop((x,y,x+patch.width,y+patch.height)).tobytes() == patch.tobytes():
                        matches.append({'image':image_name,'xy':[x,y]})
        r['identischer_ausschnitt_anderswo'] = matches
    a.crop((max(0,box[0]-12),max(0,box[1]-12),min(a.width,box[2]+12),min(a.height,box[3]+12))).resize((384,192)).save(out/(name+'-vor.png'))
    b.crop((max(0,box[0]-12),max(0,box[1]-12),min(b.width,box[2]+12),min(b.height,box[3]+12))).resize((384,192)).save(out/(name+'-nach.png'))
    report['historische_pixel'].append(r)
    print(name, json.dumps(r,ensure_ascii=True))

for folder in ['paket-d-ursachen-messung-1791028258361/0','paket-d-ursachen-messung-1791031283179/0']:
    root = base/folder
    mappings = json.loads((root/'raster-dom-zuordnung.json').read_text(encoding='utf-8'))
    logs = json.loads((root/'boot-raster.json').read_text(encoding='utf-8')) if (root/'boot-raster.json').exists() else []
    for r in mappings:
        commands = Counter(e['name'] for e in r['skia_draw'])
        ids = [z['task']['args']['tileData']['layerId'] for z in r['zuordnung']]
        display = [l for l in logs if int(l['layer']['layerId']) in ids]
        item = {'source':folder,'raster_id':r['raster_id'],'flush_ms':r['gpu_ende']['dur']/1000,
                'layer_ids':ids,'trace_commands':dict(commands),'displaylists':display,
                'displayliste_vorhanden':(root/'boot-raster.json').exists()}
        report['kalte_operationen'].append(item)
        print(folder,'raster',r['raster_id'],'flush_ms',item['flush_ms'],'commands',dict(commands),'displaylists',len(display))

(out/'bestand.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(out)
