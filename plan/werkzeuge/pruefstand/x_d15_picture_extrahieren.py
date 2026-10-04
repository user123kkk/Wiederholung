"""Zeitgleiche Picture-Daten statt späterer DOM-Displaylisten sichern."""
import json, os
from pathlib import Path
root=Path(os.environ['TEMP'])/'paket-d-ursachen-messung-1791033304233/0'
ev=json.loads((root/'boot-trace.json').read_text(encoding='utf-8'))['traceEvents']
marks={e['args']['data']['message']:e['ts'] for e in ev if e['name']=='TimeStamp'}
assert 'D15 Bildfolge vor' in marks and 'D15 Bildfolge nach' in marks
long=[e for e in ev if e['name']=='RasterDecoderImpl::DoEndRasterCHROMIUM' and e.get('dur',0)>80000]
assert len(long)==1
t=long[0]['ts']
out=root/'zeitgleiche-pictures';out.mkdir(exist_ok=False)
items=[]
for e in ev:
    if e['name']!='cc::DisplayItemList:snapshot' or not t-50000<e['ts']<t+50000:continue
    s=e['args']['snapshot']; name=str(e['ts'])+'.json'
    (out/name).write_text(json.dumps({'tiles':[{'x':0,'y':0,'picture':s['skp64']}]}),encoding='utf-8')
    items.append({'file':name,'ts':e['ts'],'relative_flush_ms':(e['ts']-t)/1000,'params':s['params']})
(out/'index.json').write_text(json.dumps({'marks':marks,'flush':long[0],'pictures':items},indent=2),encoding='utf-8')
print(out); print(json.dumps(items))
