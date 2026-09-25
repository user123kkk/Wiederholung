/* 3.17.27: Scrollen fluessig? Touch-Scrollgeste (CDP synthesizeScrollGesture)
   auf Verwalten, Fortschritt, Einstellungen - 400 Karten, CPU 4x gedrosselt.
   Zaehlt Bilder > 34 ms (spuerbares Ruckeln) und die laengste Blockade.
   node t_scrollen.js [karten] [drossel] */
const { start, neueSeite, aktion, GERAETE, vollerStore } = require('./lib');
(async () => {
  const N = +(process.argv[2] || 400), rate = +(process.argv[3] || 4);
  const store = vollerStore();
  const vorlage = Object.entries(store).filter(([k]) => k.includes('/karten/')).map(([, v]) => v);
  const ids = [];
  for (let i = 0; i < N; i++) { const v = Object.assign({}, vorlage[i % vorlage.length], { order: i, wort: vorlage[i % vorlage.length].wort + i }); store['users/u1/karten/g' + i] = v; ids.push('g' + i); }
  for (const k of Object.keys(store)) if (k.includes('/karten/k')) delete store[k];
  const bb = store['users/u1/bereiche/b1'];
  bb.sets.s1.cardIds = ids.slice(0, N / 4); bb.sets.s2.cardIds = ids.slice(N / 4, N / 2); bb.sets.s3.cardIds = ids.slice(N / 2); bb.sets.s4.cardIds = ids.slice(0, 30); bb.sets.s5.cardIds = ids.slice(0, 5);
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 2500, store });
  const cdp = await p.context().newCDPSession(p);
  for (const [name, schritt] of [['Verwalten', ['tab-verwalten']], ['Fortschritt', ['tab-fortschritt']], ['Einstellungen', ['einstellungen']]]) {
    await aktion(p, schritt[0], null, 1500);
    await p.evaluate(() => window.scrollTo(0, 0));
    await cdp.send('Emulation.setCPUThrottlingRate', { rate });
    await p.evaluate(() => {
      window.__fr = []; window.__lt = [];
      new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push(Math.round(e.duration)))).observe({ type: 'longtask' });
      let last = performance.now(); window.__laeuft = true;
      const tick = t => { window.__fr.push(t - last); last = t; if (window.__laeuft) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    for (let i = 0; i < 3; i++) {
      await cdp.send('Input.synthesizeScrollGesture', { x: 195, y: 600, yDistance: -1400, speed: 2400, gestureSourceType: 'touch' });
    }
    await cdp.send('Input.synthesizeScrollGesture', { x: 195, y: 300, yDistance: 2000, speed: 3000, gestureSourceType: 'touch' });
    const r = await p.evaluate(() => { window.__laeuft = false; const f = window.__fr.slice(2); return { bilder: f.length, ruckler: f.filter(x => x > 34).length, max: Math.round(Math.max(...f)), lt: window.__lt, y: Math.round(scrollY) }; });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    console.log(name.padEnd(14), '| Bilder', r.bilder, '| Ruckler > 34 ms:', r.ruckler, '(' + (100 * r.ruckler / Math.max(1, r.bilder)).toFixed(1) + ' %) | max', r.max, 'ms | Blockaden', JSON.stringify(r.lt));
    if (name === 'Einstellungen') await aktion(p, 'einstellungen-zu', null, 600).catch(() => {});
  }
  console.log(p.fehler.join('\n') || 'keine Fehler');
  await b.close();
})();
