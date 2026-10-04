import json, os
from pathlib import Path
from PIL import Image
tmp=Path(os.environ['TEMP'])
foto=tmp/'paket-d-fotos/d12-20261003-stand1/gpu-quads-20261003-1402/diagnose/0'
ev=json.loads((foto/'trace.json').read_text())['traceEvents']
for name in ['390-hell-bewegt-voll-einst-kartensaetze','390-hell-bewegt-voll-ende']:
    marks=[e for e in ev if e['name']=='TimeStamp' and name in e.get('args',{}).get('data',{}).get('message','')]
    lo,hi=marks[0]['ts'],marks[1]['ts']
    print(name,'Renderpässe',[(round((e['ts']-lo)/1000,2),e.get('args')) for e in ev if lo<e['ts']<hi and e['name']=='DirectRenderer::DrawRenderPass'])
base=tmp/'paket-d-ursachen-messung-1791028258361'
reports=[]
for run in range(3):
    p=base/str(run); times=json.loads((p/'boot-framezeiten.json').read_text()); origin=json.loads((p/'boot-origin.json').read_text())['timeOrigin']
    raf=json.loads((p/'boot-raf.json').read_text()); fade=[r for r in raf if 'view' in (r.get('art') or '') and r.get('op') is not None]
    im=[Image.open(p/f'boot-{i}.png').convert('RGB') for i in range(len(times))]; last=im[-1]
    points=[(x,y) for y in range(120,148) for x in range(30,160) if min(last.getpixel((x,y)))>220]
    vals=[sum(sum(img.getpixel(pt)) for pt in points)/(3*len(points)) for img in im]
    frames=[{'i':i,'t':t*1000-origin,'dt':(t-times[i-1])*1000 if i else 0,'titel':vals[i],'titelschritt':vals[i]-vals[i-1] if i else 0} for i,t in enumerate(times)]
    jumps=[{'vor':a,'nach':b,'dt':b['t']-a['t'],'schritt':float(b['op'])-float(a['op'])} for a,b in zip(fade,fade[1:]) if 0<float(a['op'])<1 and abs(float(b['op'])-float(a['op']))>0.2]
    report={'lauf':run,'frames':frames,'raf_spruenge':jumps}; reports.append(report)
    print('D15',run,'Bilder',len(times),'rAF-Sprünge',[(round(j['dt'],2),round(j['schritt'],4)) for j in jumps],'Titelmax',max(frames,key=lambda f:f['titelschritt']),'Bildpausen',[(f['i'],round(f['t'],2),round(f['dt'],2)) for f in frames if f['dt']>50])
(base/'bilder-auswertung.json').write_text(json.dumps(reports,indent=2),encoding='utf-8')
