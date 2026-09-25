/* 3.17.28 - Betreiber 25.09.2026: "Karten, die ich Sicher bewertet habe,
   kamen wieder, wenn ich mitten im Lernen auf das X druecke, und die Serie
   ging nicht hoch."
   Fall A: 3x Sicher per Knopf, X -> im Speicher bewertet, nicht mehr
           faellig, Tagesprotokoll geschrieben, Serie +1, neue Runde ohne sie.
   Fall B: per Wischen bewerten und SOFORT (< 150 ms) X -> die Bewertung
           darf nicht verloren gehen.
   node t_x_mitten.js */
const { start, neueSeite, aktion, GERAETE, tag, vollerStore } = require('./lib');
const lage = (p, t) => p.evaluate(t => ({
  verlaufHeute: JSON.stringify((window.__FB.store.get('users/u1').verlauf || {})[t] || null),
  faellig: [...window.__FB.store.keys()].filter(k => k.includes('/karten/')).filter(k => window.__FB.store.get(k).nextReview <= t).length,
  serie: Number((document.querySelector('.serie-zahl strong') || {}).textContent || 0)
}), t);
const wortStufe = (p, w) => p.evaluate(w => { const k = [...window.__FB.store.keys()].find(k => k.includes('/karten/') && window.__FB.store.get(k).wort === w); const s = window.__FB.store.get(k); return s.stufe + '/' + s.nextReview; }, w);
(async () => {
  const b = await start();
  const heute = tag(0);
  let fehler = 0;
  const pruef = (ok, text) => { if (!ok) fehler++; console.log((ok ? 'OK  ' : 'FEHL') + ' ' + text); };

  /* Fall A */
  {
    const store = vollerStore(); store['users/u1'].streak = { sockel: 0, sockelBis: tag(-999), beste: 11 };
    const { p } = await neueSeite(b, GERAETE.handy, { store, warte: 1500 });
    const vor = await lage(p, heute);
    await aktion(p, 'start-session', null, 900);
    const bewertet = [];
    for (let i = 0; i < 3; i++) {
      bewertet.push(await p.evaluate(() => document.querySelector('.study-word').textContent));
      await aktion(p, 'reveal', null, 700);
      /* die letzte Antwort kurz vor dem X: ihr Protokoll-Eintrag waere
         sonst noch 2 s gebuendelt. ACHTUNG (LEHREN 5.3/5.4): Dieser Punkt
         schlaegt in der Attrappe auch mit dem alten Code nicht an - sie meldet
         jedes eigene Schreiben als neuen Stand (ohne hasPendingWrites), und
         verlaufNachschicken() schickt daraufhin den ganzen Tag. Echtes
         Firebase ignoriert dieses Echo. Der Punkt prueft hier also nur, dass
         nichts fehlt, nicht das sofortige Schreiben selbst. */
      await aktion(p, 'grade-known', null, i < 2 ? 2500 : 150);
    }
    await aktion(p, 'end-session', null, 300);
    const nach = await lage(p, heute);
    const stufen = await Promise.all(bewertet.map(w => wortStufe(p, w)));
    pruef(stufen.every(s => s.split('/')[1] > heute), 'A: bewertete Karten im Speicher nicht mehr faellig (' + stufen.join(', ') + ')');
    pruef(nach.faellig === vor.faellig - 3, 'A: faellig ' + vor.faellig + ' -> ' + nach.faellig);
    pruef(nach.verlaufHeute !== 'null' && JSON.parse(nach.verlaufHeute).w + JSON.parse(nach.verlaufHeute).n === 3, 'A: Tagesprotokoll sofort nach X komplett: ' + nach.verlaufHeute);
    pruef(nach.serie === vor.serie + 1, 'A: Serie ' + vor.serie + ' -> ' + nach.serie);
    await aktion(p, 'start-session', null, 900);
    const neu = [];
    for (let i = 0; i < 12; i++) { const w = await p.evaluate(() => { const e = document.querySelector('.study-word'); return e && e.textContent; }); if (!w) break; neu.push(w); await aktion(p, 'reveal', null, 600); await aktion(p, 'grade-known', null, 700); }
    pruef(!bewertet.some(w => neu.includes(w)), 'A: neue Runde ohne die bewerteten Karten');
    pruef(!p.fehler.length, 'A: Konsole sauber ' + p.fehler.join('|'));
    await p.context().close();
  }
  /* Fall B */
  {
    const { p } = await neueSeite(b, GERAETE.handy, { warte: 1500 });
    const cdp = await p.context().newCDPSession(p);
    await aktion(p, 'start-session', null, 1200);
    const wort = await p.evaluate(() => document.querySelector('.study-word').textContent);
    const vorher = await wortStufe(p, wort);
    await p.click('.study-aufdecken');
    await p.waitForTimeout(700);
    const r = await p.evaluate(() => { const b = document.querySelector('.study-flaeche').getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
    const pt = (x, y) => [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }];
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(r.x, r.y) });
    for (let i = 1; i <= 10; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(r.x + 15 * i, r.y) }); await p.waitForTimeout(30); }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await p.evaluate(() => document.querySelector('[data-action="end-session"]').click());   // sofort, < 150 ms
    await p.waitForTimeout(600);
    const nachher = await wortStufe(p, wort);
    pruef(nachher !== vorher && nachher.split('/')[1] > heute, 'B: Wischen + sofort X: ' + vorher + ' -> ' + nachher);
    pruef(await p.evaluate(() => !document.querySelector('.study-flaeche')), 'B: Runde ist zu');
    pruef(!p.fehler.length, 'B: Konsole sauber ' + p.fehler.join('|'));
    await p.context().close();
  }
  await b.close();
  console.log(fehler ? fehler + ' Fehler' : 'alles ok');
  process.exit(fehler ? 1 : 0);
})();
