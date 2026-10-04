"""Kalte Flushes mit einzelnen Ganesh-/ANGLE-Operationen, keine Produktabnahme."""
import json, sys, os, hashlib
from pathlib import Path
for arg in sys.argv[1:]:
    root=Path(os.environ['TEMP'])/('paket-d-ursachen-messung-'+arg)/'0'
    ev=json.loads((root/'boot-trace.json').read_text(encoding='utf-8'))['traceEvents']
    marks={e.get('args',{}).get('data',{}).get('message'):e['ts'] for e in ev if e['name']=='TimeStamp'}
    assert 'D15 Bildfolge vor' in marks and 'D15 Bildfolge nach' in marks, 'Unvollstaendige Bildspur'
    flushes=[]
    earlier=[]
    for f in sorted((e for e in ev if e['name']=='RasterDecoderImpl::DoEndRasterCHROMIUM' and e.get('dur',0)>20000),key=lambda e:e['ts']):
        if not marks['D15 Bildfolge vor']<=f['ts']<f['ts']+f['dur']<=marks['D15 Bildfolge nach']:
            earlier.append(f)
            continue
        inside=[e for e in ev if e['pid']==f['pid'] and e['tid']==f['tid'] and f['ts']<=e['ts']<f['ts']+f['dur']]
        compiles=[]
        for c in sorted((e for e in inside if e['name']=='shader_compile'),key=lambda e:e['ts']):
            parents=[e for e in inside if e['name'].endswith('Op') and e['ts']<=c['ts'] and c['ts']+c['dur']<=e['ts']+e.get('dur',0)]
            parent=min(parents,key=lambda e:e['dur']) if parents else None
            sources=[e for e in ev if e['pid']==f['pid'] and c['ts']<=e['ts']<c['ts']+c['dur'] and e['name']=='ShaderTranslateTaskD3D::run']
            compiles.append({'compile':c,'operation':parent,'sources':[{'event':s,'sha256':hashlib.sha256(s['args']['source'].encode()).hexdigest()} for s in sources]})
        r={'flush':f,'shader_ms':sum(c['compile']['dur'] for c in compiles)/1000,'compiles':compiles}
        flushes.append(r)
        print(arg,'Flush',f['dur']/1000,'Shader',r['shader_ms'],'Operationen',[(c['operation']['name'] if c['operation'] else '?',c['compile']['dur']/1000) for c in compiles])
    (root/'treiber-auswertung.json').write_text(json.dumps({'marks':marks,'flushes':flushes,'ausserhalb_bildfolge':earlier},indent=2),encoding='utf-8')
