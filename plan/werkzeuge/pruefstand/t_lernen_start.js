/* Station 5: Lernen-Start - leer, Start-Liste, mit Karten, alles erledigt, Serie.
   Misst Layout-Verschiebungen ab dem Laden (layout-shift, wie CLS), Kontrast,
   waagerechtes Scrollen; fotografiert jeden Zustand. */
const { start, neueSeite, foto, GERAETE, vollerStore, tag } = require('./lib');
const { pruefeKontrast } = require('./kontrast');

function zustaende() {
  const z = {};
  z.leer = { store: vollerStore({ leer: true }) };
  // eine Karte angelegt, noch nie bewertet
  const eine = vollerStore({ leer: true });
  eine['users/u1/karten/k0'] = { wort: 'كِتَابٌ', uebersetzung: 'Buch', extra: '', stufe: 0, nextReview: tag(0), ersteBewertung: null, rueckfaelle: 0, quelleId: null, maxStufe: 0, order: 0, bereichId: 'b1' };
  z.eineKarte = { store: eine };
  // erste Runde gemacht (heute), Schritt 3 offen
  const runde = JSON.parse(JSON.stringify(eine));
  Object.assign(runde['users/u1/karten/k0'], { stufe: 1, nextReview: tag(1), ersteBewertung: tag(0), maxStufe: 1 });
  runde['users/u1'].verlauf = { [tag(0)]: { w: 0, n: 1 } };
  z.ersteRunde = { store: runde };
  z.voll = { store: vollerStore() };
  // alles erledigt: nichts faellig, heute gelernt
  const fertig = vollerStore();
  for (const [k, v] of Object.entries(fertig)) if (k.includes('/karten/') && v.nextReview <= tag(0)) { v.nextReview = tag(2); if (v.ersteBewertung === null) v.ersteBewertung = tag(0); }
  fertig['users/u1'].verlauf[tag(0)] = { w: 8, n: 4 };
  fertig['users/u1'].streak = { count: 5, beste: 11, lastCompletedDate: tag(0), lastEvaluatedDate: tag(0) };
  z.erledigt = { store: fertig };
  // Serie in Gefahr: gestern nicht gelernt
  const gefahr = vollerStore();
  delete gefahr['users/u1'].verlauf[tag(-1)];
  gefahr['users/u1'].streak = { count: 4, beste: 11, lastCompletedDate: tag(-2), lastEvaluatedDate: tag(0) };
  z.serie = { store: gefahr };
  // zweiter Bereich mit Faelligem
  const zwei = vollerStore();
  zwei['users/u1/karten/x1'] = { wort: 'بَحْرٌ', uebersetzung: 'Meer', extra: '', stufe: 2, nextReview: tag(0), ersteBewertung: tag(-9), rueckfaelle: 0, quelleId: null, maxStufe: 2, order: 0, bereichId: 'b2' };
  z.zweiBereiche = { store: zwei };
  return z;
}

(async () => {
  const b = await start();
  const geraete = process.argv[2] ? process.argv[2].split(',') : ['handy', 'klein', 'ipad'];
  for (const g of geraete) for (const thema of (g === 'handy' ? ['dunkel', 'hell'] : ['dunkel'])) {
    for (const [name, z] of Object.entries(zustaende())) {
      if (thema === 'hell') z.store['users/u1'].settings.thema = 'hell';
      const ctxOpt = { warte: 50, store: z.store, ls: thema === 'hell' ? { 'adrabic-thema': 'hell' } : {} };
      const { p } = await neueSeite(b, GERAETE[g], ctxOpt);
      await p.evaluate(() => { window.__cls = []; new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls.push({ v: e.value, t: Math.round(e.startTime), q: (e.sources || []).map(s => (s.node && s.node.className ? String(s.node.className).slice(0, 40) : s.node ? s.node.nodeName : '?') + ' ' + (s.currentRect.y - s.previousRect.y)) }); }).observe({ type: 'layout-shift', buffered: true }); });
      await p.waitForTimeout(3000);
      const cls = await p.evaluate(() => window.__cls);
      const summe = cls.reduce((a, e) => a + e.v, 0);
      const funde = await pruefeKontrast(p, name);
      const quer = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      const inhalt = await p.evaluate(() => [...document.querySelectorAll('#app h1, #app h2, #app h3, #app button, #app .banner__text, #app .hinweis, #app p')].filter(e => e.offsetParent).map(e => e.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean).slice(0, 30));
      const knopf = await p.evaluate(() => { const k = document.querySelector('#app button:not(.secondary):not(.ghost):not(.icon-btn)'); if (!k) return null; const r = k.getBoundingClientRect(); return { text: k.innerText.trim().slice(0, 30), unten: Math.round(r.bottom), fenster: innerHeight }; });
      await foto(p, 'l-' + g + '-' + thema + '-' + name);
      console.log(g, thema, name, '| CLS', summe.toFixed(4), cls.length ? JSON.stringify(cls.slice(0, 4)) : '', '| Kontrast', funde.length ? funde.map(f => '"' + f.text + '" ' + f.kontrast + ' ' + f.klasse).join('; ') : 0, '| quer', quer, '| Hauptknopf', JSON.stringify(knopf), '|', p.fehler.join('|') || 'ok');
      if (g === 'handy' && thema === 'dunkel') console.log('   ', inhalt.join(' ¦ '));
      await p.context().close();
    }
  }
  await b.close();
})();
