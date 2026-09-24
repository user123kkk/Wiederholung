/* Tab-Wechsel mit vielen Karten: wie lange blockiert render()? Mit CPU-Profil. */
const { start, neueSeite, GERAETE, vollerStore, tag } = require('./lib');
const fs = require('fs');
(async () => {
  const N = +(process.argv[2] || 400);
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
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const zeit = async a => p.evaluate(a => new Promise(r => { const k = document.querySelector('[data-action="' + a + '"]'); const t = performance.now(); k.click(); const d = performance.now() - t; requestAnimationFrame(() => r(Math.round(d) + ' ms JS, erstes Bild nach ' + Math.round(performance.now() - t) + ' ms')); }), a);
  if (process.argv[3] === 'fort') {
    await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', { interval: 200 }); await cdp.send('Profiler.start');
    console.log('tab-fortschritt (erstes Mal)', await zeit('tab-fortschritt'));
    const pr = (await cdp.send('Profiler.stop')).profile; const m = new Map(pr.nodes.map(n => [n.id, n])); const self = {};
    pr.samples.forEach((id, i) => { const n = m.get(id); const k = n.callFrame.functionName || '(' + n.callFrame.url.split('/').pop() + ')'; self[k] = (self[k] || 0) + (pr.timeDeltas[i] || 0) / 1000; });
    // Gesamtzeit je Funktion (inkl. Kinder)
    const kinder = new Map(pr.nodes.map(n => [n.id, n.children || []])); const selbst = new Map(); pr.samples.forEach((id, i) => selbst.set(id, (selbst.get(id) || 0) + (pr.timeDeltas[i] || 0) / 1000));
    const tot = id => (selbst.get(id) || 0) + kinder.get(id).reduce((a, c) => a + tot(c), 0); const ges = {};
    for (const n of pr.nodes) { const k = n.callFrame.functionName; if (k) ges[k] = Math.max(ges[k] || 0, tot(n.id)); }
    console.log('Selbst:', Object.entries(self).sort((a, c) => c[1] - a[1]).slice(0, 10).map(([k, v]) => k + ' ' + v.toFixed(1)).join(', '));
    console.log('Gesamt:', Object.entries(ges).sort((a, c) => c[1] - a[1]).slice(0, 16).map(([k, v]) => k + ' ' + v.toFixed(1)).join(', '));
    await b.close(); return;
  }
  for (const a of ['tab-fortschritt', 'tab-verwalten', 'tab-lernen', 'tab-verwalten', 'tab-fortschritt', 'tab-lernen']) console.log(a.padEnd(16), await zeit(a));
  // Profil fuer Verwalten
  await cdp.send('Profiler.enable'); await cdp.send('Profiler.start');
  await zeit('tab-verwalten');
  const { profile } = await cdp.send('Profiler.stop');
  const self = {}; const byId = new Map(profile.nodes.map(n => [n.id, n]));
  const dt = profile.timeDeltas; profile.samples.forEach((id, i) => { const n = byId.get(id); const k = n.callFrame.functionName || '(' + n.callFrame.url.split('/').pop() + ')'; self[k] = (self[k] || 0) + (dt[i] || 0) / 1000; });
  console.log('Selbstzeit Verwalten (ms):', Object.entries(self).sort((a, c) => c[1] - a[1]).slice(0, 12).map(([k, v]) => k + ' ' + v.toFixed(1)).join(', '));
  await cdp.send('Profiler.start');
  await zeit('tab-fortschritt');
  const pr2 = (await cdp.send('Profiler.stop')).profile;
  const s2 = {}; const b2 = new Map(pr2.nodes.map(n => [n.id, n])); pr2.samples.forEach((id, i) => { const n = b2.get(id); const k = n.callFrame.functionName || '(' + n.callFrame.url.split('/').pop() + ')'; s2[k] = (s2[k] || 0) + (pr2.timeDeltas[i] || 0) / 1000; });
  console.log('Selbstzeit Fortschritt (ms):', Object.entries(s2).sort((a, c) => c[1] - a[1]).slice(0, 12).map(([k, v]) => k + ' ' + v.toFixed(1)).join(', '));
  console.log(p.fehler.join('|') || 'ok');
  await b.close();
})();
