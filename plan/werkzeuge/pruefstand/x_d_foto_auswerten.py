"""Erstes Fehlerfoto exakt vergleichen und passende gesicherte DOM-Daten nennen."""
import json, sys
from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance
root, name = Path(sys.argv[1]), sys.argv[2]
before = root.parent / 'vor' / (name + '.png')
after = root / (name + '.png')
a, b = Image.open(before).convert('RGB'), Image.open(after).convert('RGB')
d = ImageChops.difference(a, b)
box = d.getbbox()
print('Größe', a.size, b.size, 'Bereich', box, 'Pixel', sum(p != (0,0,0) for p in d.getdata()))
d.save(root / (name + '-diff.png'))
ImageEnhance.Contrast(d).enhance(32).save(root / (name + '-diff-verstaerkt.png'))
if box:
    x0,y0,x1,y1=box
    report={'bereich':box,'pixel':sum(p!=(0,0,0) for p in d.getdata()),'maxima':d.getextrema(),'dom':[]}
    for f in (root/'diagnose').glob('*/'+name+'-*.json'):
        if 'domsnapshot' in f.name: continue
        data=json.loads(f.read_text())
        scale=data['viewport']['dpr']
        rect=(x0/scale,y0/scale,x1/scale,y1/scale)
        elements=[e for e in data['elemente'] if e['rect']['width']>0 and e['rect']['height']>0
                  and e['rect']['x']<rect[2] and e['rect']['right']>rect[0]
                  and e['rect']['y']+data['scrollY']<rect[3] and e['rect']['bottom']+data['scrollY']>rect[1]]
        report['dom'].append({'datei':str(f),'zeit':data['zeit'],'scrollY':data['scrollY'],'animationen':data['animationen'],'elemente':elements})
    (root/(name+'-befund.json')).write_text(json.dumps(report,indent=2),encoding='utf-8')
    print('Maxima', report['maxima'])
    for data in report['dom']:
        print(data['datei'],data['zeit'],'Animationen',len(data['animationen']))
        for e in sorted(data['elemente'],key=lambda e:e['rect']['width']*e['rect']['height'])[:12]:
            print(e['html'][:160],e['rect'],e['stil'])
    for f in (root/'diagnose').glob('*/trace.json'):
        events=json.loads(f.read_text())['traceEvents']
        marks=[e for e in events if e['name']=='TimeStamp' and name in e.get('args',{}).get('data',{}).get('message','')]
        if not marks:continue
        names={(e['pid'],e.get('tid')):e.get('args',{}).get('name') for e in events if e.get('ph')=='M' and e['name']=='thread_name'}
        lo,hi=marks[0]['ts'],marks[-1]['ts']
        tasks=[{'name':e['name'],'ms':e['dur']/1000,'ab_vor_ms':(e['ts']-lo)/1000,'thread':names.get((e['pid'],e.get('tid'))),'args':e.get('args')}
               for e in events if e.get('ph')=='X' and e.get('dur',0)>=1000 and lo<=e['ts']<=hi]
        (f.parent/(name+'-trace-auswertung.json')).write_text(json.dumps({'marken':marks,'aufgaben':tasks},indent=2),encoding='utf-8')
        print('Trace-Marken',[(m['args']['data']['message'],m['ts']) for m in marks])
        print('Längste Aufgaben',json.dumps(sorted(tasks,key=lambda e:-e['ms'])[:8]))
    for f in (root/'diagnose').glob('*/'+name+'-kontrolle-*.png'):
        im=Image.open(f).convert('RGB')
        print('Kontrolle',f.name,'gegen Vorher',ImageChops.difference(a,im).getbbox(),'gegen Fehler',ImageChops.difference(b,im).getbbox())
