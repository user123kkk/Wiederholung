#!/usr/bin/env python3
"""Kontaktbogen: python3 bogen.py ausgabe.png hoehe datei1 datei2 ...
Jedes Bild wird auf die gleiche Hoehe skaliert (lange Ganzseiten werden oben
auf das 2,6-fache der Breite beschnitten) und nebeneinander gesetzt."""
import sys
from PIL import Image, ImageDraw
aus, hoehe, dateien = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
bilder = []
for d in dateien:
    im = Image.open(d).convert('RGB')
    w, h = im.size
    maxh = int(w * 2.6)
    if h > maxh:
        im = im.crop((0, 0, w, maxh)); h = maxh
    f = hoehe / h
    im = im.resize((max(1, int(w * f)), hoehe))
    bilder.append((d.split('/')[-1][:-4], im))
gesamt = sum(im.size[0] for _, im in bilder) + 12 * (len(bilder) + 1)
bogen = Image.new('RGB', (gesamt, hoehe + 40), (60, 60, 70))
x = 12
dr = ImageDraw.Draw(bogen)
for name, im in bilder:
    bogen.paste(im, (x, 34))
    dr.text((x, 10), name, fill=(240, 240, 240))
    x += im.size[0] + 12
bogen.save(aus)
print(aus, bogen.size)
