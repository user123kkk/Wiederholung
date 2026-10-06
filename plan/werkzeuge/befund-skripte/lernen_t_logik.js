/* LERNEN-Audit: Serie > 120 Tage, Gesehen+Rueckgaengig, reife Karte vergessen,
   Rundenlimit-Auswahl, Joker-Richtung. Echte app.js, Attrappe. */
const P = '/home/user/Wiederholung/plan/werkzeuge/pruefstand/';
const { start, neueSeite, aktion, GERAETE, tag } = require(P + 'lib');

function basis(verlauf, streak, karten, bereich, settings) {
  const s = {
    'users/u1/bereiche/b1': Object.assign({ name: 'Vokabeln', order: 0, gefuehrt: false, satzId: null, satzVersion: 0, sets: {} }, bereich || {}),
    'users/u1': { name: 'Test', schemaVersion: 2, settings: Object.assign({ arabGroesse: 'normal', thema: 'dunkel', sitzungsLimit: 'alle', lastBackup: tag(0) }, settings || {}),
      streak: streak || { sockel: 0, sockelBis: tag(-999), beste: 0 }, verlauf: verlauf || {} }
  };
  (karten || []).forEach((k, i) => { s['users/u1/karten/' + k.id] = Object.assign({ extra: '', quelleId: null, rueckfaelle: 0, order: i, bereichId: 'b1' }, k); });
  return s;
}
const serieLesen = p => p.evaluate(() => { const el = document.querySelector('.serie-zahl strong'); return el ? Number(el.textContent) : 0; });
const karte = (p, id) => p.evaluate(id => window.__FB.store.get('users/u1/karten/' + id), id);
const doc = p => p.evaluate(() => window.__FB.store.get('users/u1'));
const eineKarte = (id, stufe, next, extra) => Object.assign({ id, wort: 'كَلِمَة ' + id, uebersetzung: 'Wort ' + id, stufe, maxStufe: stufe, nextReview: next, ersteBewertung: tag(-400) }, extra || {});

(async () => {
  const b = await start();

  /* 1: Serie ueber 120 Tage */
  for (const n of [100, 119, 125, 200]) {
    const v = {}; for (let i = 0; i < n; i++) v[tag(-i)] = { w: 3, n: 0 };
    const { ctx, p } = await neueSeite(b, GERAETE.handy, { store: basis(v, null, [eineKarte('a', 3, tag(2))]), warte: 1300 });
    const z = await serieLesen(p); const d = await doc(p);
    console.log('[1] ' + n + ' Tage am Stueck gelernt -> Serie angezeigt: ' + z + ' | Tage im Protokoll nach Laden: ' + Object.keys(d.verlauf).length);
    await ctx.close();
  }

  /* 2: Gesehen + Rueckgaengig in der Durchsicht (gefuehrter Bereich) */
  {
    const karten = [0, 1, 2].map(i => ({ id: 'n' + i, wort: 'جَدِيد ' + i, uebersetzung: 'Neu ' + i, stufe: 0, maxStufe: 0, nextReview: tag(0), ersteBewertung: null }));
    const bereich = { gefuehrt: true, sets: { s1: { name: 'Lektion 1', order: 0, art: 'lektion', quelleId: null, cardIds: ['n0', 'n1', 'n2'] } } };
    const { ctx, p } = await neueSeite(b, GERAETE.handy, { store: basis({}, null, karten, bereich), warte: 1300 });
    const vor = await serieLesen(p);
    await aktion(p, 'lern-set', 's1', 700);
    await aktion(p, 'lern-haken', 'n0', 900);
    const zw = JSON.stringify((await doc(p)).verlauf[tag(0)] || null);
    await aktion(p, 'lern-undo', null, 900);
    await p.waitForTimeout(2500);
    const d = await doc(p); const k = await karte(p, 'n0');
    await aktion(p, 'lern-ende', null, 500).catch(() => {});
    await p.evaluate(() => { const e = document.querySelector('[data-action="tab"][data-id="lernen"]') ; if (e) e.click(); });
    await p.waitForTimeout(600);
    console.log('[2] Serie vorher ' + vor + ' | nach Gesehen verlauf heute ' + zw + ' | nach Rueckgaengig verlauf heute ' + JSON.stringify(d.verlauf[tag(0)] || null) +
      ' | Karte n0 ersteBewertung ' + k.ersteBewertung + ' | Serie danach ' + await serieLesen(p) + (p.fehler.length ? ' | ' + p.fehler.join('/') : ''));
    await ctx.close();
  }

  /* 3: reife Karte vergessen: Nicht, dann in derselben Runde Sicher */
  for (const st of [12, 11, 10, 8, 5]) {
    const { ctx, p } = await neueSeite(b, GERAETE.handy, { store: basis({}, null, [eineKarte('m', st, tag(0))]), warte: 1300 });
    await aktion(p, 'start-session', null, 700);
    await p.keyboard.press('Space'); await p.waitForTimeout(500);
    await p.keyboard.press('1'); await p.waitForTimeout(900);
    const zw = await karte(p, 'm');
    await p.keyboard.press('Space'); await p.waitForTimeout(500);
    await p.keyboard.press('3'); await p.waitForTimeout(900);
    const k = await karte(p, 'm');
    const tage = Math.round((new Date(k.nextReview) - new Date(tag(0))) / 864e5);
    console.log('[3] Stufe ' + st + ' -> Nicht: Stufe ' + zw.stufe + ' -> gleich danach Sicher: Stufe ' + k.stufe + ', naechste Abfrage in ' + tage + ' Tagen');
    await ctx.close();
  }

  /* 4: Rundenlimit 10 bei 30 faelligen: welche kommen? Liste: oben neueste (order klein), unten 60 Tage ueberfaellig */
  {
    const karten = [];
    for (let i = 0; i < 30; i++) karten.push(eineKarte('r' + String(i).padStart(2, '0'), 3, tag(i < 10 ? 0 : -(i * 2))));
    const { ctx, p } = await neueSeite(b, GERAETE.handy, { store: basis({}, null, karten, null, { sitzungsLimit: 10 }), warte: 1300 });
    await aktion(p, 'start-session', null, 700);
    for (let i = 0; i < 10; i++) { await p.keyboard.press('Space'); await p.waitForTimeout(350); await p.keyboard.press('3'); await p.waitForTimeout(450); }
    await p.waitForTimeout(800);
    const bewertet = [];
    for (const k of karten) { const x = await karte(p, k.id); if (x.stufe === 4) bewertet.push(k.id + '(' + k.nextReview + ')'); }
    console.log('[4] Limit 10, 30 faellig (r00-r09 heute faellig, r10-r29 20-58 Tage ueberfaellig). Drangekommen: ' + bewertet.join(' '));
    await ctx.close();
  }

  /* 5: Joker-Richtung: vorher/nachher-Zahl, wenn eine zweite Luecke kurz nach der ersten kommt */
  {
    // Gestern-Sicht: Luecke vor 5 Tagen (verziehen), davor 30 Tage. Heute: zusaetzlich gestern ausgelassen, heute gelernt.
    const v = {};
    for (let i = 2; i <= 4; i++) v[tag(-i)] = { w: 2, n: 0 };      // 3 Tage
    for (let i = 6; i <= 35; i++) v[tag(-i)] = { w: 2, n: 0 };     // 30 Tage, Luecke bei 5
    const v1 = Object.assign({}, v);                                // Stand "vorgestern abends": Tag -2 ist der juengste
    let { ctx, p } = await neueSeite(b, GERAETE.handy, { store: basis(v1, null, [eineKarte('a', 3, tag(3))]), warte: 1300 });
    const heuteOffenGesternFehlt = await serieLesen(p);
    await ctx.close();
    const v2 = Object.assign({}, v, { [tag(0)]: { w: 1, n: 0 } });  // heute gelernt, gestern (Tag -1) ausgelassen
    ({ ctx, p } = await neueSeite(b, GERAETE.handy, { store: basis(v2, null, [eineKarte('a', 3, tag(3))]), warte: 1300 }));
    const nachLernen = await serieLesen(p);
    await ctx.close();
    const v0 = {};
    for (let i = 1; i <= 3; i++) v0[tag(-i)] = { w: 2, n: 0 };
    for (let i = 5; i <= 34; i++) v0[tag(-i)] = { w: 2, n: 0 };
    ({ ctx, p } = await neueSeite(b, GERAETE.handy, { store: basis(v0, null, [eineKarte('a', 3, tag(0))]), warte: 1300 }));
    const tagDavor = await serieLesen(p);
    const hinweisDavor = await p.evaluate(() => { const h = document.querySelector('.hinweis'); return h ? h.textContent.trim().slice(0, 90) : '(kein Hinweis)'; });
    await ctx.close();
    ({ ctx, p } = await neueSeite(b, GERAETE.handy, { store: basis(v1, null, [eineKarte('a', 3, tag(0))]), warte: 1300 }));
    const hinweisDanach = await p.evaluate(() => { const h = document.querySelector('.hinweis'); return h ? h.textContent.trim().slice(0, 90) : '(kein Hinweis)'; });
    await ctx.close();
    console.log('[5a] Tag davor (noch nicht gelernt, gestern gelernt): Serie ' + tagDavor + ' | Hinweis: ' + hinweisDavor);
    console.log('[5b] Tag danach, Hinweis: ' + hinweisDanach);
    console.log('[5] Verlauf: 30 Tage, Luecke, 3 Tage, gestern Luecke. Heute noch nicht gelernt: Serie ' + heuteOffenGesternFehlt + ' | heute gelernt: Serie ' + nachLernen);
  }

  await b.close();
})();
