import json, os
from pathlib import Path
root=Path(os.environ['TEMP'])/'paket-d-belegvergleich-20261003-1345'
for f in root.glob('*-ereignisse.json'):
    ev=json.loads(f.read_text()); print('\n',f.name)
    for e in ev:
        if any(s in e['name'] for s in ['CopyOutput','Viewport','Shader','DrawRenderPass','Scale']):
            print(round(e['rel_ms'],3),e['name'],e.get('ph'),e.get('args'))
