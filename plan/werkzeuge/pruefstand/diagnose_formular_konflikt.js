/* Vorhandenes Kartenformular, echter SDK/Repo-Regeln, zwei Profile.
   Auth-Attrappe, Worker blockiert; keine neue Abfragefunktion. */
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const {start} = require('./lib');
const {seite, seed, fertig, rest, ROOT, SDK, APP_SOURCE} = require('./diagnose_karten_konflikt');
const sha = s => crypto.createHash('sha256').update(s.replace(/\r\n/g, '\n')).digest('hex');
const cases = ['manuelle-Stufe', 'Textkorrektur-Rueckfaelle', 'Notiz-nach-fremder-Bewertung', 'manuelle-Stufe-nach-fremder-Bewertung', 'unberuehrtes-Blatt-nach-Snapshot', 'Notiz-nach-fremder-Loeschung', 'Offline-Notiz-nach-fremder-Bewertung', 'Textkorrektur-nach-fremder-Bewertung'];
async function server(id) {
  const data = await (await rest(ROOT + '/users/u1/karten/' + id)).json();
  return Object.fromEntries(Object.entries(data.fields).map(([k,v]) => [k, v.stringValue ?? (v.integerValue === undefined ? null : Number(v.integerValue))]));
}
async function edit(p, id) {
  await p.locator('[data-action="tab-verwalten"]').click();
  await p.locator('#karten-liste [data-action="card-detail"][data-id="' + id + '"]').click();
  await p.locator('[data-action="card-detail-bearbeiten"]').click();
  await p.locator('#f-stufe').waitFor();
}
(async () => {
  const single = process.argv.find(x => x.startsWith('--fall='))?.slice(7);
  assert.ok(single === undefined || cases.includes(single), 'Unbekannter Formular-Prueffall: ' + single);
  console.log('app.js SHA256 ' + sha(APP_SOURCE));
  console.log('firestore.rules SHA256 ' + sha(fs.readFileSync(path.join(__dirname, '../../../firestore.rules'), 'utf8')));
  const sources = {};
  for (const name of ['firebase-app.js', 'firebase-firestore.js']) {
    const r = await fetch(SDK + name); assert.ok(r.ok); sources[name] = await r.text();
  }
  const b = await start();
  try {
    for (const kind of cases) {
      if (single && single !== kind) continue;
      await seed();
      const a = await seite(b, sources), c = await seite(b, sources);
      const id = kind.startsWith('Textkorrektur') ? 'k5' : 'k4';
      const other = await server('k6');
      try {
        await edit(a, id);
        const before = await server(id);
        if (kind === 'Notiz-nach-fremder-Loeschung') {
          await a.fill('#f-extra', 'Entwurf nach fremder Loeschung');
          await c.evaluate(id => window.__PRUEF_SDK.deleteDoc(window.__PRUEF_SDK.doc(window.__PRUEF_DB, 'users/u1/karten/' + id)), id);
          await fertig(c);
          await a.waitForFunction(id => window.__PRUEF.karte(id) === null, id);
          const readMissing = async () => {
            const r = await fetch(ROOT + '/users/u1/karten/' + id, {headers: {Authorization: 'Bearer owner'}});
            assert.equal(r.status, 404, 'Fremd geloeschte Karte darf nicht wieder angelegt werden');
          };
          await readMissing();
          assert.equal(await a.locator('#f-extra').inputValue(), 'Entwurf nach fremder Loeschung');
          await a.locator('[data-action="submit-card"]').click();
          await a.locator('[aria-labelledby="dlg-title"]').waitFor();
          assert.match(await a.locator('[aria-labelledby="dlg-title"]').innerText(), /Karte.*gelöscht|Karte gibt es nicht mehr/s);
          await a.locator('[data-action="dlg-ok"]').click();
          await fertig(a);
          await readMissing();
          assert.equal(await a.locator('#f-extra').inputValue(), 'Entwurf nach fremder Loeschung');
          console.log('GRUEN ' + kind + ': Server bleibt geloescht, Entwurf und Hinweis erhalten');
        } else if (kind === 'Offline-Notiz-nach-fremder-Bewertung') {
          await a.evaluate(() => window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB));
          await a.fill('#f-extra', 'Notiz offline gespeichert');
          await a.locator('[data-action="submit-card"]').click();
          await a.waitForFunction(() => !document.querySelector('#f-extra'));
          await a.waitForFunction(id => window.__PRUEF.karte(id)?.extra === 'Notiz offline gespeichert', id);
          const saved = await a.evaluate(async id => {
            const doc = await window.__PRUEF_SDK.getDocFromCache(window.__PRUEF_SDK.doc(window.__PRUEF_DB, 'users/u1/karten/' + id));
            return {notiz: doc.data().extra, pending: doc.metadata.hasPendingWrites};
          }, id);
          assert.deepEqual(saved, {notiz: 'Notiz offline gespeichert', pending: true});
          await c.evaluate(id => {window.__PRUEF.starten(id); window.__PRUEF.bewerten('known'); window.__PRUEF.flush();}, id);
          await fertig(c);
          const newer = await server(id);
          assert.notEqual(newer.stufe, before.stufe);
          await a.evaluate(() => window.__PRUEF_SDK.enableNetwork(window.__PRUEF_DB));
          await fertig(a);
          const after = await server(id);
          assert.equal(after.extra, 'Notiz offline gespeichert');
          for (const field of ['stufe', 'nextReview', 'ersteBewertung', 'rueckfaelle', 'maxStufe', 'bewertungsStand'])
            assert.equal(after[field], newer[field], 'Offline-Notiz darf fremde Bewertung nicht ersetzen: ' + field);
          console.log('GRUEN ' + kind + ': SDK-Cache mit ausstehendem Write bestaetigt, fremde Bewertung erhalten');
        } else if (kind === 'manuelle-Stufe') {
          const options = await a.locator('#f-stufe option').evaluateAll(xs => xs.map(x => x.value));
          const chosen = options.find(x => Number(x) !== before.stufe);
          assert.notEqual(chosen, undefined);
          await a.selectOption('#f-stufe', chosen);
          await a.locator('[data-action="submit-card"]').click(); await fertig(a);
          const after = await server(id);
          assert.equal(after.stufe, Number(chosen));
          assert.ok(after.bewertungsStand);
          console.log('GRUEN ' + kind + ': Serverstufe ' + after.stufe);
        } else if (kind === 'Textkorrektur-nach-fremder-Bewertung') {
          assert.ok(before.rueckfaelle > 0);
          const text = before.uebersetzung + ' gezielt korrigiert';
          await a.fill('#f-ueb', text);
          await c.evaluate(id => {window.__PRUEF.starten(id); window.__PRUEF.bewerten('known'); window.__PRUEF.flush();}, id);
          await fertig(c);
          const newer = await server(id);
          assert.notEqual(newer.stufe, before.stufe);
          assert.ok(newer.rueckfaelle > 0);
          await a.waitForFunction(([id, stand]) => window.__PRUEF.karte(id)?.bewertungsStand === stand, [id, newer.bewertungsStand]);
          assert.equal(await a.locator('#f-ueb').inputValue(), text);
          await a.locator('[data-action="submit-card"]').click(); await fertig(a);
          const after = await server(id);
          assert.equal(after.uebersetzung, text); assert.equal(after.rueckfaelle, 0);
          for (const field of ['stufe', 'nextReview', 'ersteBewertung', 'maxStufe'])
            assert.equal(after[field], newer[field], 'Textkorrektur darf fremde Bewertung nicht ersetzen: ' + field);
          assert.equal(after.bewertungsBasis, newer.bewertungsStand);
          assert.notEqual(after.bewertungsStand, newer.bewertungsStand);
          console.log('GRUEN ' + kind + ': Text/Rueckfallreset erlaubt, fremde Stufe und passende Bewertungsbasis erhalten');
        } else if (kind === 'Textkorrektur-Rueckfaelle') {
          assert.ok(before.rueckfaelle > 0);
          await a.fill('#f-ueb', before.uebersetzung + ' korrigiert');
          await a.locator('[data-action="submit-card"]').click(); await fertig(a);
          const after = await server(id);
          assert.equal(after.uebersetzung, before.uebersetzung + ' korrigiert');
          assert.equal(after.rueckfaelle, 0);
          assert.equal(after.stufe, before.stufe);
          console.log('GRUEN ' + kind + ': Text und Rueckfallreset bestaetigt');
        } else {
          const intentional = kind === 'manuelle-Stufe-nach-fremder-Bewertung';
          const untouched = kind === 'unberuehrtes-Blatt-nach-Snapshot';
          const initialChoice = await a.locator('#f-stufe').inputValue();
          assert.equal(Number(initialChoice), before.stufe);
          if (intentional) await a.selectOption('#f-stufe', '0');
          if (!untouched) await a.fill('#f-extra', 'Nur Notiz geaendert');
          await c.evaluate(id => {window.__PRUEF.starten(id); window.__PRUEF.bewerten('known'); window.__PRUEF.flush();}, id);
          await fertig(c);
          const newer = await server(id);
          assert.notEqual(newer.stufe, before.stufe);
          await a.waitForFunction(stand => window.__PRUEF.karte().bewertungsStand === stand, newer.bewertungsStand);
          assert.equal(await a.locator('#f-extra').inputValue(), untouched ? before.extra : 'Nur Notiz geaendert');
          const offeredChoice = await a.locator('#f-stufe').inputValue();
          if (untouched) {
            await a.keyboard.press('Escape');
            await a.waitForFunction(() => !document.querySelector('#f-wort'));
            assert.equal(await a.locator('[data-action="dlg-ok"]').count(), 0);
          } else {
            await a.locator('[data-action="submit-card"]').click(); await fertig(a);
          }
          const after = await server(id);
          console.log(JSON.stringify({fall: kind, vor: before.stufe, fremd: newer.stufe, feldVor: initialChoice, feldNachSnapshot: offeredChoice, nach: after.stufe, notiz: after.extra}));
          assert.equal(after.extra, untouched ? newer.extra : 'Nur Notiz geaendert');
          if (intentional) {
            assert.equal(Number(offeredChoice), 0);
            assert.equal(after.stufe, 0);
            assert.notEqual(after.bewertungsStand, newer.bewertungsStand);
          } else for (const field of ['stufe', 'nextReview', 'ersteBewertung', 'rueckfaelle', 'maxStufe', 'bewertungsStand'])
            assert.equal(after[field], newer[field], 'Unberuehrte Stufe darf fremde Bewertung nicht ersetzen: ' + field);
          console.log('GRUEN ' + kind);
        }
        assert.deepEqual(await server('k6'), other);
        assert.deepEqual(a.fehler, []); assert.deepEqual(c.fehler, []);
      } finally {await a.context().close(); await c.context().close();}
    }
  } finally {await b.close();}
})().catch(e => {console.error(e); process.exitCode = 1;});
