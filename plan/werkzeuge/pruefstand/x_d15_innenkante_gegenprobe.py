"""Feste kalte Diagnose A/B/A, kein Produkttest und keine Startabnahme.

Nur --kante an .nav und .startliste entfernt. Quellen und rohe Bilder bleiben.
"""
import json, os, hashlib
from pathlib import Path
base=Path(os.environ['TEMP'])
target='5eca2e32640eaf1e5d4ddaba6aabba71f6e8893512b84baeeb471b3cf8d5f811'
reports=[]
for folder,expected in [('1791041628637',True),('1791041699853',False),('1791041758778',True)]:
    root=base/('paket-d-ursachen-messung-'+folder)/'0'
    raw=(root/'boot-trace.json').read_bytes()
    ev=json.loads(raw)['traceEvents']
    met=json.loads((root/'boot-metrics.json').read_text(encoding='utf-8'))['metrics']
    nav=next(e['value']*1e6 for e in met if e['name']=='NavigationStart')
    marks={e.get('args',{}).get('data',{}).get('message'):e['ts'] for e in ev if e['name']=='TimeStamp'}
    assert 'D15 Bildfolge vor' in marks and 'D15 Bildfolge nach' in marks
    phase=[e for e in ev if nav+1000000<=e['ts']<=nav+1800000]
    hits=[e for e in phase if e['name']=='ShaderTranslateTaskD3D::run' and hashlib.sha256(e['args']['source'].encode()).hexdigest()==target]
    assert bool(hits)==expected, (folder,'Shader nicht wie erwartet')
    flush=[e for e in phase if e['name']=='RasterDecoderImpl::DoEndRasterCHROMIUM' and e.get('dur',0)>20000]
    reports.append({'source':str(root),'trace_sha256':hashlib.sha256(raw).hexdigest(),'shader_sha256':target,
                    'shader_vorhanden':bool(hits),'hits':hits,'lange_flush_ms':[e['dur']/1000 for e in flush],
                    'marks':marks,'diagnose_css':json.loads((root/'diagnose-css.json').read_text(encoding='utf-8')) if (root/'diagnose-css.json').exists() else None})
    print(folder,'Shader',bool(hits),'spaete Flushes',reports[-1]['lange_flush_ms'])
out=base/'paket-d15-innenkante-feste-gegenprobe.json'
assert not out.exists(), 'Vorhandenen Beleg nicht ersetzen'
out.write_text(json.dumps({'status':'Kalte Diagnose, keine Produktabnahme','runs':reports},indent=2),encoding='utf-8')
print(out)
