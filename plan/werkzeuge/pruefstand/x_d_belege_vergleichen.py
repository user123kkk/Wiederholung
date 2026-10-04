"""Gesicherte rote/grüne D-Fotos auswerten, ohne Browserwiederholung."""
import json, os, re
from pathlib import Path
from collections import Counter
from PIL import Image, ImageChops

base = Path(os.environ['TEMP']) / 'paket-d-fotos/d12-20261003-stand1'
out = Path(os.environ['TEMP']) / 'paket-d-belegvergleich-20261003-1345'
out.mkdir(exist_ok=False)
cases = [
    ('instrumentiert-20261003-1319', 'instrumentiert-entwurf-kontrolle-20261003-1331', '390-hell-bewegt-voll-ende'),
    ('instrumentiert-vorstand-20261003-1325', 'instrumentiert-entwurf-kontrolle-20261003-1331', '390-hell-bewegt-voll-einst-kartensaetze'),
]
reports=[]
for red, green, name in cases:
    rd=base/red/'diagnose/0'; gd=base/green/'diagnose/0'
    a=json.loads((rd/(name+'-vor.json')).read_text()); b=json.loads((gd/(name+'-vor.json')).read_text())
    diff=[]
    for i,(x,y) in enumerate(zip(a['elemente'],b['elemente'])):
        if x!=y: diff.append({'i':i,'rot':x,'gruen':y})
    snaps=[]
    for d in (rd,gd):
        s=json.loads((d/(name+'-vor-domsnapshot.json')).read_text())
        # IDs sind pro Browserprozess verschieden; alle Stringreferenzen auflösen.
        doc=s['documents'][0]; strings=s['strings']; nodes=doc['nodes']; layout=doc['layout']
        snaps.append({'nodes':[{k:(strings[v[i]] if k in ['nodeName','nodeValue'] else [strings[n] for n in v[i]] if k=='attributes' else v[i]) for k,v in nodes.items() if isinstance(v,list) and k!='backendNodeId'} for i in range(len(nodes['nodeName']))],
                      'layout':[{k:([strings[n] for n in v[i]] if k=='styles' else strings[v[i]] if k=='text' else v[i]) for k,v in layout.items() if isinstance(v,list) and len(v)==len(layout['nodeIndex'])} for i in range(len(layout['nodeIndex']))]})
    pixel=[]
    baseline=Image.open(base/'vor'/(name+'.png')).convert('RGB')
    for label,folder in [('rot',red),('gruen',green)]:
        im=Image.open(base/folder/(name+'.png')).convert('RGB'); d=ImageChops.difference(im,baseline)
        counts=Counter(tuple(x-y for x,y in zip(p,q)) for p,q in zip(im.getdata(),baseline.getdata()))
        pixel.append({'lauf':label,'bereich':d.getbbox(),'differenzen':counts.most_common(20)})
    traces=[]
    for label,folder in [('rot',rd),('gruen',gd)]:
        events=json.loads((folder/'trace.json').read_text())['traceEvents']
        marks=[e for e in events if e['name']=='TimeStamp' and name in e.get('args',{}).get('data',{}).get('message','')]
        lo=marks[0]['ts']; hi=marks[1]['ts']
        threads={(e['pid'],e.get('tid')):e['args'].get('name') for e in events if e['name']=='thread_name'}
        # Einschließlich überlappender Aufgaben vor der DOM-Marke.
        near=[{**e,'thread':threads.get((e['pid'],e.get('tid'))),'rel_ms':(e['ts']-lo)/1000} for e in events if lo-100000<=e['ts']<=hi+100000 and e['name']!='thread_name']
        (out/(name+'-'+label+'-ereignisse.json')).write_text(json.dumps(near),encoding='utf-8')
        tasks=[{'name':e['name'],'ms':e.get('dur',0)/1000,'rel_ms':e['rel_ms'],'thread':e['thread'],'args':e.get('args')} for e in near if e.get('ph')=='X' and e.get('dur',0)>1000]
        layerdata=json.loads((folder/'layers.json').read_text())
        wall=a['timeOrigin']+a['zeit'] if label=='rot' else b['timeOrigin']+b['zeit']
        before=[e for e in layerdata if e['zeit']<=wall]
        selected=before[-1] if before else layerdata[0]
        traces.append({'lauf':label,'marken':marks,'aufgaben':tasks,'ebenen':selected,'ereignisnamen':Counter(e['name'] for e in near).most_common()})
        del events
    report={'name':name,'dom_unterschiede':diff,'elementzahlen':[len(a['elemente']),len(b['elemente'])], 'animationen_rot':a['animationen'],'animationen_gruen':b['animationen'], 'snapshot_gleich':snaps[0]==snaps[1], 'snapshot_differenzen':{k:[{'i':i,'rot':x,'gruen':y} for i,(x,y) in enumerate(zip(snaps[0][k],snaps[1][k])) if x!=y] for k in snaps[0]},'pixel':pixel,'traces':traces}
    (out/(name+'.json')).write_text(json.dumps(report,indent=2),encoding='utf-8')
    reports.append({'name':name,'dom_diff':len(diff),'snapshot_gleich':report['snapshot_gleich'],'snapshot_diff':{k:len(v) for k,v in report['snapshot_differenzen'].items()},'pixel':pixel,'traces':[{'lauf':t['lauf'],'aufgaben':t['aufgaben'],'ebenen':len(t['ebenen'].get('layers',[]))} for t in traces]})
print(out)
print(json.dumps(reports,indent=2))
