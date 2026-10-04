"""Historische Zahlenkandidaten, KEIN Beweis einer CPU/GPU-Verknuepfung.

Client und Decoder zaehlen separat. Gleiche Nummern verbinden keine Auftraege.
Alte Ergebnisse bleiben erhalten; neue Berichte heissen ausdruecklich Kandidaten.
"""
import json, os, sys
from pathlib import Path
root=Path(sys.argv[1]) if len(sys.argv)>1 else Path(os.environ['TEMP'])/'paket-d-ursachen-messung-1791028258361/0'
ev=json.loads((root/'boot-trace.json').read_text(encoding='utf-8'))['traceEvents']
reports=[]
for end in ev:
    if end['name']!='RasterDecoderImpl::DoEndRasterCHROMIUM' or end.get('dur',0)<20000:continue
    draws=[e for e in ev if e['name']=='RasterDecoderImpl::DoRasterCHROMIUM' and e['pid']==end['pid'] and e['tid']==end['tid'] and e['ts']<=end['ts']]
    draw=max(draws,key=lambda e:e['ts']);rid=draw['args'].get('raster_id')
    cpu=[e for e in ev if e['name']=='RasterImplementation::RasterCHROMIUM' and e.get('args',{}).get('raster_chromium_id')==rid]
    r={'status':'unbestaetigte Zahlenkandidaten; separate Client-/Decoder-Zaehler','gpu_ende':end,'gpu_draw':draw,'raster_id':rid,'zuordnung':[]}
    for c in cpu:
        parents=[e for e in ev if e['name']=='RasterTask' and e['pid']==c['pid'] and e['tid']==c['tid'] and e['ts']<=c['ts']<=e['ts']+e.get('dur',0)]
        for task in parents:
            lid=task['args']['tileData']['layerId']
            candidates=[]
            for e in ev:
                if e['name']!='LayerTreeHostImpl:snapshot' or 'snapshot' not in e.get('args',{}):continue
                if e['pid']!=task['pid']:continue
                s=e['args']['snapshot']
                for l in s.get('active_tree',{}).get('layers',[]):
                    if l.get('layer_id')==lid:candidates.append({'zeit':e['ts'],'layer':l,'tiles':[t for t in s.get('active_tiles',[]) if t.get('layer_id')==lid]})
            closest=min(candidates,key=lambda x:abs(x['zeit']-task['ts'])) if candidates else None
            if closest and (root/'boot-domsnapshot.json').exists():
                ds=json.loads((root/'boot-domsnapshot.json').read_text(encoding='utf-8'));doc=ds['documents'][0];nodes=doc['nodes'];strings=ds['strings'];owner=closest['layer'].get('owner_node')
                if owner in nodes['backendNodeId']:
                    ix=nodes['backendNodeId'].index(owner);closest['dom_node']={'name':strings[nodes['nodeName'][ix]],'attributes':[strings[n] for n in nodes['attributes'][ix]]}
                    lay=doc['layout'];li=[i for i,n in enumerate(lay['nodeIndex']) if n==ix]
                    closest['dom_node']['layout']=[{k:([strings[n] for n in v[i]] if k=='styles' else v[i]) for k,v in lay.items() if isinstance(v,list) and len(v)==len(lay['nodeIndex'])} for i in li]
            r['zuordnung'].append({'cpu':c,'task':task,'snapshot':closest})
    r['skia_draw']=[e for e in ev if e['pid']==draw['pid'] and e['tid']==draw['tid'] and draw['ts']<=e['ts']<=draw['ts']+draw.get('dur',0) and 'SkCanvas' in e['name']]
    reports.append(r)
    print('UNBESTAETIGTE Kandidaten, Raster',rid,'GPU Ende ms',end['dur']/1000,'DOM',[(z['task']['args']['tileData']['layerId'],z['snapshot']['layer'].get('layer_name') if z['snapshot'] else None,z['snapshot'].get('dom_node') if z['snapshot'] else None) for z in r['zuordnung']],'Skia-Befehle',len(r['skia_draw']))
(root/'raster-dom-kandidaten.json').write_text(json.dumps(reports,indent=2),encoding='utf-8')
