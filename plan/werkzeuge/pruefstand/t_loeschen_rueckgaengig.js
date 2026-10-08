/* Paket I, E-09: Einzelkarte löschen ohne Rückfrage, "Rückgängig" holt sie
   mit Lernstand, Platz und Speicherkarten zurück.
   node t_loeschen_rueckgaengig.js   (Server und CHROMIUM wie in LIESMICH.md) */
const assert = require('node:assert/strict');
const { start, neueSeite, aktion, GERAETE, vollerStore } = require('./lib');

const karte = (p, id) => p.evaluate(id => window.__FB.store.get('users/u1/karten/' + id) || null, id);
const setIds = (p, sid) => p.evaluate(sid => window.__FB.store.get('users/u1/bereiche/b1').sets[sid].cardIds, sid);
const reihe = p => p.evaluate(() => [...document.querySelectorAll('#karten-liste > .card-row')].slice(0, 8).map(z => z.textContent.slice(0, 24)));

(async () => {
  const b = await start();
  try {
    for (const vp of [GERAETE.handy, GERAETE.ipad]) {
      const { p, ctx } = await neueSeite(b, vp, { store: vollerStore({}) });
      try {
        await aktion(p, 'tab-verwalten');
        const vorKarte = await karte(p, 'k5');           // Stufe 2, 6 Rückfälle, in s1 und s5
        const vorS1 = await setIds(p, 's1'), vorS5 = await setIds(p, 's5');
        const vorReihe = await reihe(p);
        assert.ok(vorKarte && vorS1.includes('k5') && vorS5.includes('k5'), 'Ausgang');

        // Löschen über die Detailansicht: keine Rückfrage, Meldung mit Rückgängig
        await aktion(p, 'card-detail', 'k5');
        await aktion(p, 'card-detail-loeschen', 'k5', 500);
        assert.equal(await p.locator('.dlg').count(), 0, 'keine Rückfrage, kein Blatt mehr offen');
        assert.equal(await karte(p, 'k5'), null, 'Karte ist gelöscht');
        assert.ok(!(await setIds(p, 's1')).includes('k5') && !(await setIds(p, 's5')).includes('k5'), 'aus Speicherkarten entfernt');
        assert.match(await p.locator('.toast').textContent(), /Karte gelöscht/);
        assert.equal(await p.locator('[data-action="toast-rueckgaengig"]').count(), 1, 'Rückgängig angeboten');

        // Rückgängig
        await aktion(p, 'toast-rueckgaengig', null, 600);
        const nach = await karte(p, 'k5');
        for (const f of ['wort', 'uebersetzung', 'extra', 'stufe', 'nextReview', 'ersteBewertung', 'rueckfaelle', 'order', 'bereichId'])
          assert.deepEqual(nach[f], vorKarte[f], 'Feld ' + f + ' wieder wie vorher');
        assert.deepEqual(await setIds(p, 's1'), vorS1, 'Lektion 1 wie vorher, gleiche Stelle');
        assert.deepEqual(await setIds(p, 's5'), vorS5, 'eigene Speicherkarte wie vorher');
        assert.deepEqual(await reihe(p), vorReihe, 'Liste in derselben Reihenfolge');
        assert.match(await p.locator('.toast').textContent(), /wieder da/);

        // Ohne Rückgängig bleibt sie gelöscht; die Meldung verschwindet von selbst
        await aktion(p, 'card-detail', 'k6');
        await aktion(p, 'card-detail-loeschen', 'k6', 500);
        await p.waitForTimeout(6600);
        assert.equal(await p.locator('[data-action="toast-rueckgaengig"]').count(), 0, 'Angebot nach sechs Sekunden weg');
        assert.equal(await karte(p, 'k6'), null);

        // Mehrfachauswahl fragt weiter nach (unverändert)
        await p.evaluate(() => document.querySelector('[data-action="bereich-mehr-auf"]').click()); await p.waitForTimeout(500);
        assert.equal(await p.locator('[data-action="bereich-mehr-auswaehlen"]').count(), 1);
        await p.keyboard.press('Escape'); await p.waitForTimeout(400);

        assert.deepEqual(p.fehler, []);
        console.log('grün: ' + vp.width + '×' + vp.height);
      } finally { await ctx.close(); }
    }
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
