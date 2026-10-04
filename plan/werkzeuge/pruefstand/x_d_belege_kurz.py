import json, os
from pathlib import Path
root=Path(os.environ['TEMP'])/'paket-d-belegvergleich-20261003-1345'
for f in root.glob('*.json'):
    if 'ereignisse' in f.name: continue
    r=json.loads(f.read_text())
    print('\nFALL',r['name'],'DOM',len(r['dom_unterschiede']),'Snapshot',r['snapshot_gleich'])
    for d in r['dom_unterschiede']: print('DOM-Diff',d['i'],d['rot']['html'][:100],[(k,d['rot'][k],d['gruen'][k]) for k in d['rot'] if k!='html' and d['rot'][k]!=d['gruen'][k]])
    for k,v in r['snapshot_differenzen'].items(): print('Snapshot-Diff',k,len(v),str(v)[:2000])
    for label in ['rot','gruen']: print('Animationen',label,[(a['name'],a['state'],a['timing']['progress']) for a in r['animationen_'+label]])
    for t in r['traces']:
        print('LAUF',t['lauf'],'Marken',[(m['args']['data']['message'],m['ts']) for m in t['marken']])
        print('Ebenen',json.dumps(t['ebenen']))
        print('Kopierpfad',[(n,c) for n,c in t['ereignisnamen'] if any(s in n for s in ['Copy','Read','Capture','Viewport','Shader'])])
        print('Aufgaben',[(x['name'],round(x['rel_ms'],2),round(x['ms'],2)) for x in t['aufgaben'] if x['name'] in ['GPUTask','RasterDecoderImpl::DoEndRasterCHROMIUM','SkiaOutputSurfaceImplOnGpu::FinishPaintRenderPass','UpdateLayoutTree','Layout','Paint','Layerize','RasterTask','ActivateLayerTree','DrawFrame','CopyOutputRequest','ReadPixels']])
