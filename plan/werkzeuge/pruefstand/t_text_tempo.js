/* Stufe 7 (texte-lernen/KONZEPT.md § 13): Sure 2 mit 286 Ayat (unveraendert
   aus quran/tanzil-uthmani.txt), CPU 4x gedrosselt, 390x844. Gemessen wird
   jede Aufgabe des Hauptthreads (PerformanceObserver "longtask") waehrend:
   Lernen-Tab -> Verwalten -> Text oeffnen -> scrollen -> Wiederholen ->
   Aufdecken -> Fliessend -> Beenden -> Lernen-Tab. Ziel: kein Bild
   > 50 ms laenger als noetig; gemeldet wird jede Aufgabe > 50 ms mit dem
   Schritt, in dem sie lag (lesen). Rot ab einer Aufgabe > 200 ms (sichtbares
   Stocken) - dazwischen ist Befund zum Lesen, gemessen im Container.
   Zustand: 250 fest, 20 frisch faellig, 16 neu. */
const fs = require('node:fs'), path = require('node:path');
const { start, tag } = require('./lib');
const { seiteMitApp, BETREIBER_UID, zeilenStore } = require('./text_lib');
const S2 = fs.readFileSync(path.join(__dirname, '../../../quran/tanzil-uthmani.txt'), 'utf8')
  .split('\n').filter(l => l && l[0] !== '#').map(l => l.split('|')).filter(p => p[0] === '2').map(p => p[2]);

(async () => {
  const browser = await start();
  const fehler = [];
  try {
    const store = zeilenStore(S2.length, i => i < 250 ? { stufe: 7, next: '2099-12-31', erste: tag(-30) }
      : i < 270 ? { stufe: 2, next: tag(0), erste: tag(-4) } : { stufe: 0, next: tag(0), erste: null },
      { wort: i => S2[i], set: { quelle: 'tanzil', sure: 2, kreisPos: 'z0' } });
    const { ctx, p } = await seiteMitApp(browser, store, { uid: BETREIBER_UID });
    const cdp = await ctx.newCDPSession(p);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await p.evaluate(() => { window.__lang = []; window.__schritt = 'start';
      new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lang.push([window.__schritt, Math.round(e.duration)]); }).observe({ type: 'longtask', buffered: false }); });
    const schritt = async (name, fn, warte = 800) => { await p.evaluate(n => { window.__schritt = n; }, name); await fn(); await p.waitForTimeout(warte); };
    await schritt('Verwalten', () => p.click('[data-action="tab-verwalten"]'));
    await schritt('Text oeffnen (286)', () => p.click('[data-action="text-oeffnen"][data-id="t1"]'), 1500);
    await schritt('scrollen', async () => { for (let i = 0; i < 10; i++) { await p.mouse.wheel(0, 800); await p.waitForTimeout(80); } });
    await schritt('Wiederholen starten', async () => { await p.evaluate(() => scrollTo(0, 0)); await p.click('[data-action="text-wdh-start"]'); }, 1200);
    await schritt('Aufdecken', async () => { await p.waitForSelector('[data-action="text-aufdecken"]:not(.gedimmt)', { timeout: 30000 }); await p.click('[data-action="text-aufdecken"]'); });
    await schritt('Fliessend', () => p.click('[data-action="text-wdh"][data-id="fliessend"]'), 1200);
    await schritt('Beenden', () => p.click('[data-action="text-lernen-zu"]'), 1200);
    await schritt('Lernen-Tab', () => p.click('[data-action="tab-lernen"]'), 1200);
    const lang = await p.evaluate(() => window.__lang);
    const je = {};
    for (const [s, d] of lang) (je[s] = je[s] || []).push(d);
    console.log('(lesen) Aufgaben > 50 ms je Schritt (CPU 4x): ' + (Object.keys(je).length ? Object.entries(je).map(([s, d]) => s + ': ' + d.join('/')).join(' | ') : 'keine'));
    const max = Math.max(0, ...lang.map(x => x[1]));
    if (max > 200) fehler.push('Aufgabe mit ' + max + ' ms (> 200 ms)');
    if (p.fehler.length) fehler.push('Seitenfehler: ' + p.fehler.join('; '));
    await ctx.close();
  } catch (e) { fehler.push('Abbruch: ' + e.message.split('\n')[0]); } finally { await browser.close(); }
  if (fehler.length) { console.log('FEHLER:\n' + fehler.join('\n')); process.exitCode = 1; }
  else console.log('OK t_text_tempo: 286 Ayat, CPU 4x, keine Aufgabe > 200 ms');
})();
