/* Fluessig: letzte Bewertung -> Rundenende (Feier-Bewegung), CPU 4x. */
const { start, neueSeite, aktion, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1500 });
  await aktion(p, 'start-session', null, 900);
  for (let i = 0; i < 11; i++) { await p.keyboard.press('Space'); await p.waitForTimeout(300); await p.keyboard.press('3'); await p.waitForTimeout(400); }
  await p.keyboard.press('Space'); await p.waitForTimeout(600);
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.evaluate(() => { window.__lt = []; new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push(Math.round(e.duration)))).observe({ type: 'longtask' });
    window.__fr = []; let last = performance.now(); const t = x => { window.__fr.push(x - last); last = x; requestAnimationFrame(t); }; requestAnimationFrame(t); });
  await p.keyboard.press('3'); await p.waitForTimeout(1800);
  const r = await p.evaluate(() => ({ lt: window.__lt, fr: window.__fr.filter(x => x > 34).map(Math.round), ende: !!document.querySelector('#app .ende') }));
  console.log('Ende erreicht', r.ende, '| Blockaden', JSON.stringify(r.lt), '| Bilder > 34 ms', JSON.stringify(r.fr), '|', p.fehler.join('|') || 'ok');
  await b.close();
})();
