/* Messhilfe (nicht Teil der Abnahme): A/B wie t_text_tempo, abwechselnd
   alter Stand (Commit, Vorgabe HEAD) und Arbeitsstand, damit Schwankungen
   des Rechners beide gleich treffen. Je Lauf die laengste Aufgabe der
   Schritte Verwalten und Text oeffnen. Aufruf: node x_ab_tempo.js [N] [commit] */
const fs = require('node:fs'), path = require('node:path');
const { start, tag } = require('./lib');
const { seiteMitApp, BETREIBER_UID, zeilenStore } = require('./text_lib');
const S2 = fs.readFileSync(path.join(__dirname, '../../../quran/tanzil-uthmani.txt'), 'utf8')
  .split('\n').filter(l => l && l[0] !== '#').map(l => l.split('|')).filter(p => p[0] === '2').map(p => p[2]);
const N = +process.argv[2] || 6, ALT = process.argv[3] || 'HEAD';

async function lauf(browser, commit) {
  const store = zeilenStore(S2.length, i => i < 250 ? { stufe: 7, next: '2099-12-31', erste: tag(-30) }
    : i < 270 ? { stufe: 2, next: tag(0), erste: tag(-4) } : { stufe: 0, next: tag(0), erste: null },
    { wort: i => S2[i], set: { quelle: 'tanzil', sure: 2, kreisPos: 'z0' } });
  const { ctx, p } = await seiteMitApp(browser, store, { uid: BETREIBER_UID, commit });
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.evaluate(() => { window.__lang = []; window.__schritt = 'start';
    new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lang.push([window.__schritt, Math.round(e.duration)]); }).observe({ type: 'longtask', buffered: false }); });
  const schritt = async (name, fn, warte = 800) => { await p.evaluate(n => { window.__schritt = n; }, name); await fn(); await p.waitForTimeout(warte); };
  await schritt('V', () => p.click('[data-action="tab-verwalten"]'));
  await schritt('T', () => p.click('[data-action="text-oeffnen"][data-id="t1"]'), 1500);
  const l = await p.evaluate(() => window.__lang);
  await ctx.close();
  const max = s => Math.max(0, ...l.filter(x => x[0] === s).map(x => x[1]));
  return [max('V'), max('T')];
}
(async () => {
  const browser = await start();
  const erg = { alt: [], neu: [] };
  try {
    for (let i = 0; i < N; i++) {
      erg.alt.push(await lauf(browser, ALT));
      erg.neu.push(await lauf(browser, null));
    }
  } finally { await browser.close(); }
  for (const k of ['alt', 'neu']) {
    const v = erg[k].map(x => x[0]).sort((a, b) => a - b), t = erg[k].map(x => x[1]).sort((a, b) => a - b);
    const med = a => a[Math.floor(a.length / 2)];
    console.log(k + ': Verwalten ' + v.join('/') + ' (Median ' + med(v) + ', > 200: ' + v.filter(x => x > 200).length + ')  Text ' + t.join('/') + ' (Median ' + med(t) + ', > 200: ' + t.filter(x => x > 200).length + ')');
  }
})();
