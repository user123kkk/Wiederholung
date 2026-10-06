const { start, neueSeite, aktion, GERAETE, vollerStore } = require('/home/user/Wiederholung/plan/werkzeuge/pruefstand/lib.js');
(async () => {
  const N = +(process.argv[2] || 2000);
  const store = vollerStore();
  const vorlage = Object.entries(store).filter(([k]) => k.includes('/karten/')).map(([, v]) => v);
  const ids = [];
  for (let i = 0; i < N; i++) { const v = Object.assign({}, vorlage[i % vorlage.length], { order: i, wort: vorlage[i % vorlage.length].wort + ' ' + i, extra: 'Beispielsatz mit etwas Text Nummer ' + i + ' und noch mehr Worten darin' }); store['users/u1/karten/g' + i] = v; ids.push('g' + i); }
  for (const k of Object.keys(store)) if (k.includes('/karten/k')) delete store[k];
  const bb = store['users/u1/bereiche/b1'];
  bb.sets.s1.cardIds = ids.slice(0, N / 4); bb.sets.s2.cardIds = ids.slice(N / 4, N / 2); bb.sets.s3.cardIds = ids.slice(N / 2); bb.sets.s4.cardIds = ids.slice(0, 30); bb.sets.s5.cardIds = ids.slice(0, 5);
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 3000, store });
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.evaluate(() => { window.__lt = []; new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push(Math.round(e.duration)))).observe({ entryTypes: ['longtask'] }); });
  const t0 = Date.now();
  await aktion(p, 'tab-verwalten', null, 1500);
  console.log('Verwalten oeffnen, longtasks:', JSON.stringify(await p.evaluate(() => window.__lt.splice(0))));
  for (const q of ['كتاب', 'كِتَابٌ', 'Schlussel', 'xqzvw', 'Beispielsatz']) {
    await p.fill('#f-search', ''); await p.waitForTimeout(500); await p.evaluate(() => window.__lt.splice(0));
    await p.type('#f-search', q, { delay: 60 }); await p.waitForTimeout(1500);
    const n = await p.evaluate(() => (document.querySelector('.liste-hinweis') || {}).innerText);
    console.log(JSON.stringify(q), '->', n, '| longtasks ms:', JSON.stringify(await p.evaluate(() => window.__lt.splice(0))));
  }
  // alle Bereiche + unscharf
  await p.fill('#f-search', ''); await p.waitForTimeout(400);
  await p.type('#f-search', 'Schlüsselx', { delay: 60 }); await p.waitForTimeout(1500);
  console.log('unscharf Schlüsselx ->', await p.evaluate(() => (document.querySelector('.liste-hinweis') || {}).innerText), JSON.stringify(await p.evaluate(() => window.__lt.splice(0))));
  console.log(p.fehler.join('|') || 'ok');
  await b.close();
})();
