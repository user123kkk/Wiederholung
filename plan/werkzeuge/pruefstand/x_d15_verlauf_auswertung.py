"""Kalte Original/ohne-Verlauf/Original-Gegenprobe, keine Produktabnahme."""
import json, os, sys, time
from pathlib import Path
from collections import Counter
from PIL import Image
base=Path(os.environ['TEMP'])
folders=sys.argv[1:] or ['1791033118201','1791033137707','1791033156200']
reports=[]
for folder in folders:
    root=base/('paket-d-ursachen-messung-'+folder)/'0'
    ev=json.loads((root/'boot-trace.json').read_text(encoding='utf-8'))['traceEvents']
    met=json.loads((root/'boot-metrics.json').read_text(encoding='utf-8'))['metrics']
    nav=next(e['value']*1e6 for e in met if e['name']=='NavigationStart')
    times=json.loads((root/'boot-framezeiten.json').read_text(encoding='utf-8'))
    origin=json.loads((root/'boot-origin.json').read_text(encoding='utf-8'))['timeOrigin']
    images=[Image.open(root/('boot-'+str(i)+'.png')).convert('RGB') for i in range(len(times))]
    last=images[-1]
    pts=[(x,y) for y in range(120,148) for x in range(30,160) if min(last.getpixel((x,y)))>220]
    assert pts, 'Titelprobe fehlt'
    vals=[sum(sum(im.getpixel(p)) for p in pts)/(3*len(pts)) for im in images]
    frames=[{'i':i,'t_ms':t*1000-origin,'dt_ms':(t-times[i-1])*1000 if i else 0,
             'titelhelligkeit':vals[i],'titelschritt':vals[i]-vals[i-1] if i else 0} for i,t in enumerate(times)]
    tasks=[]
    for end in ev:
        if end['name']!='RasterDecoderImpl::DoEndRasterCHROMIUM' or not(nav+1000000<=end['ts']<=nav+1800000):continue
        draws=[e for e in ev if e['name']=='RasterDecoderImpl::DoRasterCHROMIUM' and e['pid']==end['pid'] and e['tid']==end['tid'] and e['ts']<=end['ts']]
        if not draws:continue
        draw=max(draws,key=lambda e:e['ts'])
        skia=[e['name'] for e in ev if e['pid']==draw['pid'] and e['tid']==draw['tid'] and draw['ts']<=e['ts']<draw['ts']+draw.get('dur',0) and 'SkCanvas' in e['name']]
        tasks.append({'raster_id':draw['args'].get('raster_id'),'t_ms':(end['ts']-nav)/1000,'ms':end.get('dur',0)/1000,'skia_order':skia})
    logs=json.loads((root/'boot-raster.json').read_text(encoding='utf-8'))
    lists=[{'layer':l['layer'],'node':l.get('node'),'methods':Counter(c['method'] for c in l.get('befehle',{}).get('commandLog',[])),
            'shader_rects':[c for c in l.get('befehle',{}).get('commandLog',[]) if c['method']=='drawRect' and 'shader' in c.get('params',{}).get('paint',{})]} for l in logs]
    r={'source':str(root),'css':json.loads((root/'diagnose-css.json').read_text(encoding='utf-8')) if (root/'diagnose-css.json').exists() else None,
       'frames':frames,'tasks':tasks,'displaylists':lists,
       'max_gap_start':max((f for f in frames if 1000<f['t_ms']<1800),key=lambda f:f['dt_ms']),
       'max_titelschritt':max(frames,key=lambda f:f['titelschritt'])}
    reports.append(r)
    print(folder,'CSS',bool(r['css']),'Bilder',len(frames),'Bildpause',r['max_gap_start'],'Titelschritt',r['max_titelschritt'])
    print('Lange Rasterarbeit',[(t['raster_id'],round(t['t_ms'],2),round(t['ms'],3),dict(Counter(t['skia_order']))) for t in tasks if t['ms']>20])
    print('Verlauf-Rechtecke',[(l['node']['node'].get('attributes'),len(l['shader_rects'])) for l in lists if l.get('node')])
out=base/('paket-d15-kalt-gegenprobe-'+str(time.time_ns())+'.json')
out.write_text(json.dumps(reports,indent=2),encoding='utf-8')
print(out)
