// G-005 (DATEN-3): Sortieren schreibt nur Karten, deren Platz sich aendert.
// Zaehlt je Handlung die geschriebenen Kartendokumente.
const { start, neueSeite, GERAETE, vollerStore, tag } = require('./lib.js');
(async () => {
  const N = 2000;
  const store = vollerStore();
  for (const k of Object.keys(store)) if (k.includes('/karten/')) delete store[k];
  store['users/u1/bereiche/b1'].sets = {};
  for (let i = 0; i < N; i++) {
    store['users/u1/karten/k' + i] = { wort: 'كلمة' + i, uebersetzung: 'Wort ' + i, extra: '', stufe: 2, nextReview: tag(3),
      ersteBewertung: tag(-10), rueckfaelle: 0, quelleId: null, maxStufe: 2, order: i, bereichId: 'b1' };
  }
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { store, warte: 2500 });
  await p.evaluate(() => {
    const m = window.__FB.store; const orig = m.set.bind(m);
    window.__kartenSchreib = [];
    m.set = (k, v) => { if (k.includes('/karten/')) window.__kartenSchreib.push(k.split('/').pop()); return orig(k, v); };
  });
  const zaehle = async () => { const n = await p.evaluate(() => { const n = window.__kartenSchreib.length; window.__kartenSchreib = []; return n; }); return n; };
  const reihe = () => p.evaluate(() => [...document.querySelectorAll('#karten-liste > .card-row')].slice(0, 3).map(r => r.dataset.cardid).join(','));
  const erg = [];
  await p.evaluate(() => document.querySelector('[data-action="tab-verwalten"]').click()); await p.waitForTimeout(1500);
  await zaehle();
  const vor = await reihe();
  await p.focus('#karten-liste > .card-row .drag-handle'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(900);
  const n1 = await zaehle(); const nach = await reihe();
  erg.push(['Pfeil runter: ' + vor + ' -> ' + nach, n1, n1 >= 1 && n1 <= 2 && nach.startsWith('k1,k0')]);
  await p.keyboard.press('ArrowDown'); await p.waitForTimeout(900);
  const n2 = await zaehle(); const nach2 = await reihe();
  erg.push(['nochmal runter: ' + nach2, n2, n2 >= 1 && n2 <= 2 && nach2.startsWith('k1,k2,k0')]);
  await p.keyboard.press('ArrowUp'); await p.waitForTimeout(900);
  const n3 = await zaehle();
  erg.push(['wieder hoch: ' + await reihe(), n3, n3 >= 1 && n3 <= 2]);
  const cloud = await p.evaluate(() => ['k0', 'k1', 'k2', 'k3'].map(id => id + '=' + window.__FB.store.get('users/u1/karten/' + id).order).join(' '));
  erg.push(['Cloud-Ordnung ' + cloud, 0, cloud === 'k0=1 k1=0 k2=2 k3=3']);
  for (const [t, n, ok] of erg) console.log((ok ? 'OK   ' : 'FEHL ') + t + ' | Kartendokumente geschrieben: ' + n);
  console.log(p.fehler.join(' | ') || 'keine Fehler');
  await b.close();
  process.exit(erg.every(e => e[2]) ? 0 : 1);
})();
