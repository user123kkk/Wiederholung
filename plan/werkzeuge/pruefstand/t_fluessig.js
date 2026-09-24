/* Fluessig? CPU 4x gedrosselt (aelteres Handy). Misst je Handlung: laengste
   Hauptthread-Blockade (longtask) und Bilder ueber 34 ms (verpasste Frames). */
const { start, neueSeite, aktion, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  const g = process.argv[2] || 'handy';
  const { p } = await neueSeite(b, GERAETE[g], { warte: 1800 });
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: +(process.argv[3] || 4) });
  await p.evaluate(() => {
    window.__lt = []; new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push(Math.round(e.duration)))).observe({ type: 'longtask', buffered: false });
    window.__fr = []; let last = performance.now();
    const tick = t => { window.__fr.push(t - last); last = t; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
  });
  const miss = async (name, fn, warte = 900) => {
    await p.evaluate(() => { window.__lt = []; window.__fr = []; });
    const t0 = Date.now(); await fn(); await p.waitForTimeout(warte);
    const r = await p.evaluate(() => ({ lt: window.__lt.slice(), fr: window.__fr.slice() }));
    const lang = r.fr.filter(x => x > 34).map(x => Math.round(x));
    console.log(name.padEnd(28), '| laengste Blockade', r.lt.length ? Math.max(...r.lt) + ' ms (' + r.lt.length + 'x)' : '–', '| Ruckler', lang.length ? lang.length + ' Bilder, max ' + Math.max(...lang) + ' ms' : 0);
  };
  const tipp = (a, id) => p.evaluate(([a, id]) => { const k = document.querySelector('#app [data-action="' + a + '"]' + (id ? '[data-id="' + id + '"]' : '')) || document.querySelector('[data-action="' + a + '"]'); k && k.click(); }, [a, id]);
  await miss('Runde starten', () => tipp('start-session'));
  for (let i = 0; i < 3; i++) {
    await miss('Umdrehen ' + (i + 1), () => tipp('reveal'));
    await miss('Bewerten ' + (i + 1), () => tipp(['grade-known', 'grade-almost', 'grade-unknown'][i]));
  }
  await miss('Runde beenden', () => tipp('end-session'));
  await miss('Tab Fortschritt', () => tipp('tab-fortschritt'), 1400);
  await miss('Tab Verwalten', () => tipp('tab-verwalten'), 1400);
  await miss('Tab Lernen', () => tipp('tab-lernen'), 1200);
  await miss('Einstellungen auf', () => tipp('einstellungen'), 1200);
  console.log(p.fehler.join('|') || 'ok');
  await b.close();
})();
