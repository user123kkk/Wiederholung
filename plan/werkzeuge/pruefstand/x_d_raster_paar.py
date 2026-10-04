"""D12: detailliertes Rot gegen vorhandenes Grün, alle Rohdaten erhalten."""
import json, os
from pathlib import Path
from datetime import datetime
from PIL import Image, ImageChops
base=Path(os.environ['TEMP'])/'paket-d-fotos/d12-20261003-stand1'
name='390-hell-bewegt-voll-antwort'
out=Path(os.environ['TEMP'])/('paket-d-raster-paar-'+datetime.now().strftime('%Y%m%d-%H%M%S'))
out.mkdir(exist_ok=False)
result=[]
for label,folder in [('rot','animationsebenen-20261003-weiter2'),('gruen','gpu-quads-20261003-1402')]:
    d=base/folder/'diagnose/0'
    dom=json.loads((d/(name+'-vor.json')).read_text(encoding='utf-8'))
    ev=json.loads((d/'trace.json').read_text(encoding='utf-8'))['traceEvents']
    marks=[e for e in ev if e['name']=='TimeStamp' and e.get('args',{}).get('data',{}).get('message') in [name+' vor',name+' nach']]
    lo,hi=marks[0]['ts'],marks[1]['ts']
    near=[{**e,'rel_ms':(e['ts']-lo)/1000} for e in ev if lo-20000<=e['ts']<=hi+20000]
    (out/(label+'-ereignisse.json')).write_text(json.dumps(near),encoding='utf-8')
    snaps=[e for e in near if 'snapshot' in e.get('args',{}) and e['name']=='LayerTreeHostImpl:snapshot']
    snapreports=[]
    for e in snaps:
        s=e['args']['snapshot']
        layers=[{k:l.get(k) for k in ['layer_id','owner_node','layer_name','bounds','opacity','position','layer_quad','ideal_scales','raster_scales','compositing_reason_ids','coverage_tiles']} for l in s.get('active_tree',{}).get('layers',[])]
        snapreports.append({'rel_ms':e['rel_ms'],'viewport':s.get('device_viewport_size'),'layers':layers,'tiles':s.get('active_tiles'),'passes':s.get('frame',{}).get('render_passes')})
    image=Image.open(base/folder/(name+'.png')).convert('RGB')
    ref=Image.open(base/'vor'/(name+'.png')).convert('RGB')
    diff=ImageChops.difference(image,ref)
    report={'label':label,'elemente':dom['elemente'],'animationen':dom['animationen'],'snapshot':snapreports,'pixel':{'count':sum(p!=(0,0,0) for p in diff.getdata()),'bounds':diff.getbbox(),'extrema':diff.getextrema()},'quads':[{k:e.get(k) for k in ['name','rel_ms','args']} for e in near if lo<=e['ts']<=hi and e['name'] in ['DirectRenderer::DrawRenderPass','CopyOutputRequest::SendResult','SkiaRenderer::DoDrawQuad']]}
    (out/(label+'.json')).write_text(json.dumps(report,indent=2),encoding='utf-8');result.append(report)
    print(label,report['pixel'],'DOM',len(dom['elemente']),'Snapshots',len(snaps))
    for s in snapreports:
        print(' Frame',round(s['rel_ms'],2),s['viewport'],'Pässe',[(p.get('output_rect'),p.get('quad_list_size'),p.get('copy_requests')) for p in s['passes'] or []])
        print(' Raster',[(l['layer_name'],l['raster_scales']) for l in s['layers'] if l['raster_scales'] and l['raster_scales'].get('device_scale') and 'bg-glow' in l['layer_name']])
print('DOM identisch',result[0]['elemente']==result[1]['elemente'])
print(out)
