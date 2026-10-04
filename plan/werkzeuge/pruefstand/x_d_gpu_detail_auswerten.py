"""Detailspur: direkte GPU-/Shader-Ereignisse statt Vermutung aus Cache-Namen."""
import json, os
from pathlib import Path
from collections import Counter
root=Path(os.environ['TEMP'])/'paket-d-ursachen-messung-1791028258361'
for i in range(3):
    ev=json.loads((root/str(i)/'boot-trace.json').read_text())['traceEvents']
    met=json.loads((root/str(i)/'boot-metrics.json').read_text())['metrics']; nav=next(e['value']*1e6 for e in met if e['name']=='NavigationStart')
    names=Counter(e['name'] for e in ev)
    direct=[e for e in ev if any(s in e['name'].lower() for s in ['shader','compile','program','link'])]
    nearby=[{**e,'ab_nav_ms':(e['ts']-nav)/1000} for e in direct if nav+1000000<=e['ts']<=nav+1600000]
    (root/str(i)/'shader-auswertung.json').write_text(json.dumps(nearby,indent=2),encoding='utf-8')
    print('LAUF',i,'Kategorien',Counter(e.get('cat') for e in ev if 'disabled' in e.get('cat','')).most_common(15))
    print('Direkte Namen',[(n,c) for n,c in names.items() if any(s in n.lower() for s in ['shader','compile','program','link','quad'])])
    print('Lange direkte Ereignisse',[(e['name'],round(e['ab_nav_ms'],2),e.get('dur',0)/1000,e.get('args')) for e in nearby if e.get('dur',0)>1000][:35])
    print('Raster',[(e['name'],round((e['ts']-nav)/1000,2),e.get('dur',0)/1000) for e in ev if e['name'] in ['RasterDecoderImpl::DoEndRasterCHROMIUM','SkiaOutputSurfaceImplOnGpu::FinishPaintRenderPass'] and e.get('dur',0)>20000])
    print('GPU detail',[(e['name'],round((e['ts']-nav)/1000,2),round(e.get('dur',0)/1000,3),e.get('args')) for e in ev if 'disabled-by-default-gpu' in e.get('cat','') and nav+1100000<=e['ts']<=nav+1400000][:35])
    if i==0:
        long=next(e for e in ev if e['name']=='RasterDecoderImpl::DoEndRasterCHROMIUM' and e.get('dur',0)>80000)
        print('Flush Detail',[(e['name'],round((e['ts']-long['ts'])/1000,3),round(e.get('dur',0)/1000,3),e.get('args')) for e in ev if e['pid']==long['pid'] and e.get('tid')==long.get('tid') and long['ts']<=e['ts']<=long['ts']+long['dur'] and e.get('ph')=='X' and e.get('dur',0)>100])
