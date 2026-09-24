/* Startbilder fuer iOS erzeugen (3.13.0) - siehe README.md, "Startbilder".
   Fotografiert den Ladebildschirm aus index.html (.boot, dunkel, erstes Bild,
   Animationen angehalten, Linie versteckt) in jeder Pixelgroesse, die iOS als
   apple-touch-startup-image erwartet, und schreibt die <link>-Zeilen fuer
   index.html nach splash-links.txt.

   Voraussetzung: Node + Playwright mit Chromium; die App lokal ausgeliefert:
     python3 -m http.server 8099 --bind 127.0.0.1     (im Repo-Wurzelordner)
     node plan/werkzeuge/startbilder.js
   Danach verkleinern (von ~7 MB auf ~3 MB, 256 Farben, sichtbar gleich):
     python3 -c "import glob;from PIL import Image;[Image.open(f).convert('RGB').quantize(256,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.FLOYDSTEINBERG).save(f,optimize=True) for f in glob.glob('splash/*.png')]"
   Liegt unter plan/, damit Firebase Hosting es nicht ausliefert. */
const { chromium } = require('playwright');
const fs = require('fs');
const GER = [
  [440, 956, 3], [402, 874, 3], [430, 932, 3], [393, 852, 3], [428, 926, 3], [390, 844, 3],
  [375, 812, 3], [360, 780, 3], [414, 896, 3], [414, 896, 2], [414, 736, 3], [375, 667, 2], [320, 568, 2],
  [1032, 1376, 2], [1024, 1366, 2], [834, 1210, 2], [834, 1194, 2], [820, 1180, 2], [834, 1112, 2],
  [810, 1080, 2], [768, 1024, 2], [744, 1133, 2]
];
const path = require('path');
const ZIEL = path.join(__dirname, '..', '..', 'splash');
fs.mkdirSync(ZIEL, { recursive: true });
(async () => {
  const b = await chromium.launch({ ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}) });
  const links = [];
  for (const [w, h, d] of GER) {
    const lagen = w >= 700 ? [['portrait', w, h], ['landscape', h, w]] : [['portrait', w, h]];
    for (const [o, vw, vh] of lagen) {
      const ctx = await b.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: d });
      const p = await ctx.newPage();
      await p.route('**/www.gstatic.com/**', () => {});
      await p.route('**/verses.quran.foundation/**', r => r.abort());
      await p.goto('http://127.0.0.1:8099/index.html');
      await p.addStyleTag({ content: '*,*::before,*::after{animation-play-state:paused!important;animation-delay:0s!important}.boot__linie{visibility:hidden!important}' });
      await p.waitForTimeout(250);
      const name = 'splash-' + (vw * d) + 'x' + (vh * d) + '.png';
      await p.screenshot({ path: ZIEL + '/' + name });
      links.push('<link rel="apple-touch-startup-image" media="(device-width: ' + w + 'px) and (device-height: ' + h +
        'px) and (-webkit-device-pixel-ratio: ' + d + ') and (orientation: ' + o + ')" href="./splash/' + name + '">');
      await ctx.close();
    }
  }
  fs.writeFileSync(path.join(ZIEL, '..', 'plan', 'werkzeuge', 'splash-links.txt'), links.join('\n'));
  await b.close();
})();
