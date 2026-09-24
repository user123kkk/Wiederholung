/* Station 1 (Start): (a) Firebase-Bausteine haengen -> nach 9 s Hinweis +
   Neu laden; (b) normaler Start -> kein Hinweis, Uebergang Bild fuer Bild;
   (c) Startbild == erstes Bild der Seite (Pixelvergleich 390x844 @3). */
const { chromium } = require('playwright');
const { start, neueSeite, foto, GERAETE, OUT } = require('./lib');
const path = require('path');
(async () => {
  const b = await start();
  // (a) Haenger
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.route('**/www.gstatic.com/**', () => {});             // antwortet nie
  await p.route('**/verses.quran.foundation/**', r => r.abort());
  await p.goto('http://127.0.0.1:8099/index.html');
  await p.waitForTimeout(8500);
  const lage = () => p.evaluate(() => { const z = document.querySelector('.boot__zeichen-hof').getBoundingClientRect(); const m = document.querySelector('.boot__marke').getBoundingClientRect(); return Math.round(z.top) + '/' + Math.round(m.top); });
  const vorher = await lage();
  console.log('nach 8,5 s Hinweis?', await p.evaluate(() => !!document.querySelector('[data-stand="langsam"]')));
  await p.waitForTimeout(1000);
  console.log('Zeichen/Name vorher', vorher, 'nachher', await lage());
  console.log('nach 9,5 s Hinweis?', await p.evaluate(() => !!document.querySelector('[data-stand="langsam"]')),
    '| Text:', await p.evaluate(() => (document.querySelector('.boot__text') || {}).textContent),
    '| Knopf:', await p.evaluate(() => (document.querySelector('.boot [data-action="seite-neu-laden"]') || {}).textContent));
  await p.waitForTimeout(600);
  await foto(p, 'start-haenger');
  let neu = false; p.on('framenavigated', () => { neu = true; });
  await p.click('.boot [data-action="seite-neu-laden"]'); await p.waitForTimeout(800);
  console.log('Neu laden laedt neu?', neu);
  await ctx.close();
  // (b) normaler Start
  const { p: q } = await neueSeite(b, GERAETE.handy, { warte: 10 });
  const t0 = Date.now(); const bilder = [];
  for (const t of [150, 450, 700, 850, 1000, 1200, 1600]) {
    const w = t - (Date.now() - t0); if (w > 0) await q.waitForTimeout(w);
    const zustand = await q.evaluate(() => { const bo = document.querySelector('.boot'); return bo ? (bo.classList.contains('boot--exit') ? 'boot geht' : 'boot') : (document.querySelector('.lernen-gruss') ? 'app' : 'leer?'); });
    bilder.push(t + 'ms:' + zustand);
  }
  console.log('Uebergang:', bilder.join(' | '));
  await q.waitForTimeout(9500);
  console.log('normaler Start: Hinweis faelschlich?', await q.evaluate(() => !!document.querySelector('[data-stand="langsam"], .boot__hinweis')), q.fehler.join('|') || 'ok');
  await b.close();
})();
