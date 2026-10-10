/* Diagnose abgelehnter Tagesantworten nach Neustart. Echter SDK und lokale
   Repo-Regeln; nur Demo-Emulator 8082. --schutz verlangt dauerhaften Erhalt.
   Keine Lernregel und keine Produktivdaten werden geaendert. */
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const {start} = require('./lib');
const {seite, seed, fertig, cloud, SDK, APP_SOURCE} = require('./diagnose_karten_konflikt');
(async () => {
  const sources = {};
  for (const name of ['firebase-app.js', 'firebase-firestore.js']) {
    const response = await fetch(SDK + name);
    assert.ok(response.ok);
    sources[name] = await response.text();
  }
  console.log('app.js SHA256 ' + crypto.createHash('sha256').update(APP_SOURCE.replace(/\r\n/g, '\n')).digest('hex'));
  const browser = await start();
  const losses = [];
  try {
    for (const [reject, restart] of [[false, true], [true, false], [true, true]]) {
      await seed();
      let page = await seite(browser, sources);
      const context = page.context();
      try {
        const day = await page.evaluate(() => window.__PRUEF.heute());
        await page.evaluate(reject => {
          window.__PRUEF_ABLEHNEN = reject;
          window.__PRUEF.starten();
          window.__PRUEF.bewerten('known');
          window.__PRUEF.flush();
        }, reject);
        await fertig(page);
        if (reject) await page.waitForFunction(day => window.__PRUEF.offen()[day]?.w === 1, day);
        else await page.waitForFunction(day => window.__PRUEF.verlauf()[day]?.w === 1, day);
        const before = await page.evaluate(() => ({local: window.__PRUEF.verlauf(), pending: window.__PRUEF.offen(), card: window.__PRUEF.karte(), error: window.__PRUEF.fehler()}));
        assert.equal(before.local[day].w, 1);
        assert.equal((await cloud(day)).w, reject ? 0 : 1);
        assert.ok(before.card.bewertungsStand, 'Kartenbewertung wurde tatsaechlich bestaetigt');
        if (restart) {
          await page.close();
          page = await seite(browser, sources, context);
        }
        await page.evaluate(async () => {window.__PRUEF_ABLEHNEN = false; await window.__PRUEF.nachholen(); window.__PRUEF.flush();});
        await fertig(page);
        const after = await page.evaluate(() => ({local: window.__PRUEF.verlauf(), pending: window.__PRUEF.offen(), card: window.__PRUEF.karte(), error: window.__PRUEF.fehler(), journal: window.__PRUEF.tagesantworten()}));
        assert.equal(after.card.bewertungsStand, before.card.bewertungsStand, 'Bestaetigte Karte bleibt erhalten');
        assert.deepEqual(page.fehler, []);
        const server = await cloud(day);
        console.log((reject && restart ? 'BEFUND' : 'KONTROLLE') + ' ' + JSON.stringify({reject, restart, day, before, after, server}));
        if (reject && restart && server.w !== 1) losses.push('Bestaetigte Bewertung: abgelehnte Tagesantwort nach Neustart verloren');
        if (!reject || !restart) assert.equal(server.w, 1, 'Tagesantwort im Kontrollfall erhalten');
      } finally {await context.close();}
    }
    if (process.argv.includes('--schutz')) assert.deepEqual(losses, [], 'Schutzpruefung: abgelehnte Tagesantwort dauerhaft erhalten');
    console.log('Diagnose abgeschlossen: ' + losses.length + ' Verlustfall; kein Gesamturteil.');
  } finally {await browser.close();}
})().catch(error => {console.error(error); process.exitCode = 1;});
