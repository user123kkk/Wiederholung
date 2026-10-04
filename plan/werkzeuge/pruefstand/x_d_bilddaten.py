"""D12/D15: vorhandene Pixel und Zeitdaten auswerten, Originale erhalten."""
import json, os, sys
from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance
p=Path(sys.argv[1])
if (p/'boot-raf.json').exists():
    times=json.loads((p/'boot-framezeiten.json').read_text())
    images=[Image.open(p/f'boot-{i}.png').convert('RGB') for i in range(len(times))]
    print('Frames', len(images), 'Größe',images[-1].size)
    # Helle Pixel des Endbilds: feste Probe für die zusammengesetzte Helligkeit.
    # Dies ist keine isolierte Deckkraftmessung; Kinder können separat animieren.
    final=images[-1]
    points=[(x,y) for y in range(160,350) for x in range(40,350) if min(final.getpixel((x,y)))>220]
    vals=[]
    for i,im in enumerate(images):
        vals.append(sum(sum(im.getpixel(q)) for q in points)/(len(points)*3))
    report=[{'i':i,'zeit':round((t-times[0])*1000,1),'helligkeit':round(vals[i],2),'abstand_ms':round((t-times[i-1])*1000,1) if i else 0} for i,t in enumerate(times)]
    (p/'boot-pixelwerte.json').write_text(json.dumps(report,indent=2))
    print(json.dumps(report[:45],indent=2))
else:
    root=Path(os.environ['TEMP'])/'paket-d-fotos/d12-20261003-stand1'
    for name,after in [('320-dunkel-bewegt-voll-einst-konto-loeschen','nach'),('390-dunkel-bewegt-leer-einstellungen','nach-fortsetzung')]:
        a=Image.open(root/'vor'/f'{name}.png').convert('RGB');b=Image.open(root/after/f'{name}.png').convert('RGB')
        d=ImageChops.difference(a,b);ImageEnhance.Contrast(d).enhance(32).save(p/f'{name}-diff-verstaerkt.png')
        print(name,d.getbbox(), 'Farben',d.getcolors(1000000)[:20])
