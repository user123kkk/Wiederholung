/* Paket I, F-1 "Liste einfuegen": Blatt, Vorschau, Anlegen, Doppelte, Abbruch.
   node t_liste_einfuegen.js   (Server und CHROMIUM wie in LIESMICH.md) */
const assert = require('node:assert/strict');
const { start, neueSeite, aktion, GERAETE, vollerStore } = require('./lib');

const LISTE = [
  'Tisch;طَاوِلَةٌ;Lektion 4',          // Deutsch vorne: muss getauscht werden
  'Buch;كِتَابٌ',                        // gibt es im Bereich schon
  'Fenster ohne Trenner',               // unlesbar
  'Apfel;تُفَّاحَةٌ',
  'Tisch;طَاوِلَةٌ',                     // doppelt in der Liste selbst
  'Birne;كُمَّثْرَى'
].join('\n');

async function kartenZahl(p) { return p.evaluate(() => document.querySelectorAll('#karten-liste > .card-row').length); }
async function ersteWoerter(p, n) {
  return p.evaluate(n => [...document.querySelectorAll('#karten-liste > .card-row')].slice(0, n).map(z => z.textContent), n);
}

(async () => {
  const b = await start();
  try {
    for (const vp of [GERAETE.handy, { ...GERAETE.handy, width: 320, height: 568 }, GERAETE.ipad]) {
      const { p, ctx } = await neueSeite(b, vp, { store: vollerStore({}) });
      try {
        await aktion(p, 'tab-verwalten');
        const vorher = await kartenZahl(p);
        assert.equal(vorher, 40, 'Ausgang 40 Karten');

        // Öffnen über "Mehr"
        await aktion(p, 'bereich-mehr-auf');
        await aktion(p, 'liste-auf');
        assert.equal(await p.locator('#liste-text').count(), 1, 'Feld da');
        assert.equal(await p.locator('.dlg').count(), 1, 'nur ein Blatt offen');

        // Leere Vorschau: Meldung am Feld, nichts angelegt
        await aktion(p, 'liste-vorschau');
        assert.match(await p.locator('#liste-meldung').textContent(), /Füg zuerst/);

        // Text bleibt über ein Neuzeichnen erhalten (Zustand in ui, nicht nur im Feld)
        await p.fill('#liste-text', LISTE);
        await p.evaluate(() => window.dispatchEvent(new Event('resize')));
        await aktion(p, 'liste-vorschau');
        const blatt = await p.locator('.dlg--liste').textContent();
        assert.match(blatt, /3 neue Karten/, 'drei neue: ' + blatt);
        assert.match(blatt, /Spalten getauscht/);
        assert.match(blatt, /2 Zeilen gibt es schon/);
        assert.match(blatt, /1 Zeile ohne lesbare Übersetzung \(Zeile 3\)/);
        assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'kein Querüberlauf');

        // Zurück: Text steht noch da
        await aktion(p, 'liste-zurueck');
        assert.equal(await p.inputValue('#liste-text'), LISTE, 'Text nach Zurück erhalten');

        // Escape mit Entwurf fragt nach; Abbrechen lässt das Blatt stehen
        await p.keyboard.press('Escape'); await p.waitForTimeout(400);
        assert.match(await p.locator('.dlg[aria-labelledby="dlg-title"]').textContent(), /Liste verwerfen/);
        await aktion(p, 'dlg-cancel'); await p.waitForTimeout(400);
        assert.equal(await p.inputValue('#liste-text'), LISTE, 'Text nach abgebrochenem Verwerfen erhalten');

        // Anlegen
        await aktion(p, 'liste-vorschau');
        await aktion(p, 'liste-anlegen', null, 900);
        assert.equal(await p.locator('.dlg--liste').count(), 0, 'Blatt zu');
        assert.equal(await kartenZahl(p), vorher + 3, 'drei Karten mehr');
        const oben = await ersteWoerter(p, 3);
        assert.ok(oben[0].includes('طَاوِلَةٌ') && oben[0].includes('Tisch') && oben[0].includes('Lektion 4'), 'erste Zeile oben, arabisch vorne, Notiz: ' + oben[0]);
        assert.ok(oben[1].includes('Apfel') && oben[2].includes('Birne'), 'Reihenfolge wie in der Liste');
        assert.match(await p.locator('.toast').textContent(), /3 Karten angelegt/);

        // Dieselbe Liste noch einmal: alles doppelt, Knopf gesperrt
        await aktion(p, 'bereich-mehr-auf');
        await aktion(p, 'liste-auf');
        assert.equal(await p.inputValue('#liste-text'), '', 'neues Blatt ist leer');
        await p.fill('#liste-text', LISTE);
        await aktion(p, 'liste-vorschau');
        assert.match(await p.locator('.dlg--liste').textContent(), /0 neue Karten/);
        assert.ok(await p.locator('[data-action="liste-anlegen"]').isDisabled(), 'Anlegen gesperrt');
        await aktion(p, 'liste-zurueck');
        await p.fill('#liste-text', '');
        await p.keyboard.press('Escape'); await p.waitForTimeout(500);
        assert.equal(await p.locator('.dlg').count(), 0, 'leeres Blatt schließt ohne Rückfrage');
        assert.equal(await kartenZahl(p), vorher + 3);

        // Zu viele Zeilen
        await aktion(p, 'bereich-mehr-auf');
        await aktion(p, 'liste-auf');
        await p.fill('#liste-text', Array.from({ length: 1001 }, (_, i) => 'w' + i + ';u' + i).join('\n'));
        await aktion(p, 'liste-vorschau');
        assert.match(await p.locator('#liste-meldung').textContent(), /1001 Zeilen/);
        await p.fill('#liste-text', '');
        await p.keyboard.press('Escape'); await p.waitForTimeout(500);

        assert.deepEqual(p.fehler, []);
        console.log('grün: ' + vp.width + '×' + vp.height);
      } finally { await ctx.close(); }
    }
    // Geführter Bereich: kein Eintrag "Liste einfügen"
    {
      const store = vollerStore({});
      store['users/u1/bereiche/b1'].gefuehrt = true;
      const { p, ctx } = await neueSeite(b, GERAETE.handy, { store });
      try {
        await aktion(p, 'tab-verwalten');
        await aktion(p, 'bereich-mehr-auf');
        assert.equal(await p.locator('[data-action="liste-auf"]').count(), 0, 'geführt: kein Einfügen');
        assert.deepEqual(p.fehler, []);
        console.log('grün: geführter Bereich');
      } finally { await ctx.close(); }
    }
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
