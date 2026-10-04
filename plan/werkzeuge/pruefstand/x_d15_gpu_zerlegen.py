"""Kalte GPU-Aufgaben in vorhandenen Traces zerlegen; keine Produktversuche."""
from pathlib import Path
from collections import Counter
import os, json
base=Path(os.environ['TEMP'])/'paket-d-ursachen-messung-1791025838429'
out=Path(os.environ['TEMP'])/'paket-d15-gpu-zerlegung-20261003-1356'; out.mkdir(exist_ok=False)
for run in range(3):
    ev=json.loads((base/str(run)/'boot-trace.json').read_text())['traceEvents']
    metrics=json.loads((base/str(run)/'boot-metrics.json').read_text())['metrics']
    nav=next(e['value']*1e6 for e in metrics if e['name']=='NavigationStart')
    names={(e['pid'],e.get('tid')):e.get('args',{}).get('name') for e in ev if e['name']=='thread_name'}
    gpu=[e for e in ev if e['name'] in ['RasterDecoderImpl::DoEndRasterCHROMIUM','SkiaOutputSurfaceImplOnGpu::FinishPaintRenderPass'] and e.get('ph')=='X' and e.get('dur',0)>20000]
    ranges=[]
    for task in gpu:
        lo,hi=task['ts'],task['ts']+task['dur']
        inside=[{**e,'thread':names.get((e['pid'],e.get('tid'))),'ab_nav_ms':(e['ts']-nav)/1000} for e in ev if lo<=e['ts']<=hi]
        same=[e for e in inside if e['pid']==task['pid'] and e.get('tid')==task.get('tid')]
        stages=[e for e in inside if any(s in e['name'].lower() for s in ['shader','compile','program','pipeline','raster','paint','wait'])]
        ranges.append({'task':task,'same_thread':same,'all_stages':stages})
        print('LAUF',run,'Aufgabe',task['name'],'ab_nav',round((lo-nav)/1000,2),'ms',task['dur']/1000)
        print('Gleicher Thread',[(e['name'],round(e.get('dur',0)/1000,3),e.get('args')) for e in same if e.get('dur',0)>500 or 'Shader' in e['name']])
        print('Andere lange Aufgaben',[(e['name'],e['thread'],round(e.get('dur',0)/1000,3),e.get('args')) for e in inside if e.get('dur',0)>5000 and e not in same][:25])
    window=[{**e,'thread':names.get((e['pid'],e.get('tid'))),'ab_nav_ms':(e['ts']-nav)/1000} for e in ev if nav+1100000<=e['ts']<=nav+1500000]
    (out/f'{run}.json').write_text(json.dumps({'aufgaben':ranges,'zeitfenster':window}),encoding='utf-8')
    print('LAUF',run,'Shader-Ereignisse',[(e['name'],round(e['ab_nav_ms'],2),e.get('dur',0)/1000) for e in window if any(s in e['name'].lower() for s in ['shader','compile','program'])])
print(out)
