"""448-Diagnose gegen vorhandene Referenz und vollständige grüne Detailspur."""
import json, os
from pathlib import Path
from PIL import Image, ImageChops
base=Path(os.environ['TEMP'])/'paket-d-fotos/d12-20261003-stand1'
red=base/'kacheln448-20261003-1515'
green=base/'gpu-quads-20261003-1402'
name='390-hell-bewegt-voll-einst-feedback'
rd=red/'diagnose/0'; gd=green/'diagnose/0'
doms=[json.loads((d/(name+'-vor.json')).read_text(encoding='utf-8')) for d in [rd,gd]]
report={'name':name,'elemente_gleich':doms[0]['elemente']==doms[1]['elemente'],
        'elementzahlen':[len(d['elemente']) for d in doms], 'animationen':[d['animationen'] for d in doms], 'runs':[]}
ref=Image.open(base/'vor'/(name+'.png')).convert('RGB')
for label,root in [('448',red),('historisch_gruen',green)]:
    im=Image.open(root/(name+'.png')).convert('RGB'); diff=ImageChops.difference(im,ref)
    ev=json.loads((root/'diagnose/0/trace.json').read_text(encoding='utf-8'))['traceEvents']
    marks={e.get('args',{}).get('data',{}).get('message'):e['ts'] for e in ev if e['name']=='TimeStamp'}
    assert name+' vor' in marks and name+' nach' in marks, 'Fotozeitmarken fehlen'
    lo,hi=marks[name+' vor'],marks[name+' nach']
    snaps=[e for e in ev if e['name']=='LayerTreeHostImpl:snapshot' and 'snapshot' in e.get('args',{}) and lo<=e['ts']<=hi]
    layers=[]
    for e in snaps:
        s=e['args']['snapshot']
        for layer in s.get('active_tree',{}).get('layers',[]):
            layers.append({'t_ms':(e['ts']-lo)/1000,'viewport':s.get('device_viewport_size'),
                           'name':layer.get('layer_name'),'bounds':layer.get('bounds'),
                           'raster':layer.get('raster_scales'),
                           'tiles':[t for t in s.get('active_tiles',[]) if t.get('layer_id')==layer['layer_id']]})
    report['runs'].append({'label':label,'pixels':sum(p!=(0,0,0) for p in diff.getdata()),
                           'bounds':diff.getbbox(),'extrema':diff.getextrema(),'marks':[lo,hi],
                           'layers':layers})
    print(label,'Pixel',report['runs'][-1]['pixels'],'Bereich',diff.getbbox(),'Max',diff.getextrema())
    print('Hintergrundkacheln',[(l['t_ms'],l['viewport'],[(t.get('tile_size'),t.get('content_rect')) for t in l['tiles']]) for l in layers if 'bg-glow' in (l['name'] or '')])
for i in range(3):
    im=Image.open(rd/(name+'-kontrolle-'+str(i)+'.png')).convert('RGB')
    d=ImageChops.difference(im,ref)
    print('Folgefoto nur Diagnose',i,sum(p!=(0,0,0) for p in d.getdata()))
print('DOM gleich',report['elemente_gleich'])
(red/'auswertung.json').write_text(json.dumps(report,indent=2),encoding='utf-8')

# Konto-löschen vollständig zählen: starke Fehlerklasse vorhanden?
n='320-dunkel-bewegt-voll-einst-konto-loeschen'
a=Image.open(base/'vor'/(n+'.png')).convert('RGB'); b=Image.open(base/'nach'/(n+'.png')).convert('RGB')
d=ImageChops.difference(a,b)
counts={str(k):sum(max(p)>k for p in d.getdata()) for k in [0,1,2,3,10]}
r={'name':n,'extrema':d.getextrema(),'counts_groesser':counts,'size':a.size,'bounds':d.getbbox()}
(red/'konto-historische-pixel.json').write_text(json.dumps(r,indent=2),encoding='utf-8')
print('Konto',json.dumps(r))
