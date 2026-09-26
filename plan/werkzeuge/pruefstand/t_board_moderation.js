/* 3.17.40 (G-015/REGELN-4): Die Moderation loescht eine Idee nicht mehr
   (deleteDoc liess die Unter-Sammlung votes mit der Konto-Kennung der
   Abstimmenden fuer immer liegen), sondern setzt status: "entfernt"
   (updateDoc). Die Liste blendet status "entfernt" aus - auch bei der
   Moderation. kontoDatenLoeschen() findet das Dokument darueber weiter
   (seitenweises Lesen nach documentId, § 3.17.38) und raeumt den eigenen
   Stimm-Merker darunter ab.
   Gegenprobe fest gegen app.js aus c70729b (Stand vor 3.17.40): dort
   verschwindet das Dokument ganz (deleteDoc statt status).
   Aufruf: node t_board_moderation.js */
const { execFileSync } = require('child_process');
const path = require('path');
const { start, neueSeite, aktion, GERAETE, vollerStore } = require('./lib');
const APP_ALT = execFileSync('git', ['show', 'c70729b:app.js'], { cwd: path.join(__dirname, '../../..'), maxBuffer: 1 << 26 }).toString();

const MOD_UID = 'pitcQCAowlSOMjCvJ4xKSnuGVXi1';   // BETREIBER_UIDS[0] in app.js

function storeModerator() {
  const basis = vollerStore();
  const remap = {};
  for (const [k, v] of Object.entries(basis)) remap[k.startsWith('users/u1') ? k.replace('users/u1', 'users/' + MOD_UID) : k] = v;
  remap['feedback/f1'] = { text: 'Karten mit Bild', erstelltAm: '2026-09-20T10:00:00Z', votes: 2, status: 'offen' };
  remap['feedback/f1/votes/' + MOD_UID] = {};
  return remap;
}
const MOD_USER = { uid: MOD_UID, email: 'mod@example.com', displayName: 'Mod', emailVerified: true, metadata: { creationTime: 'Mon, 03 Aug 2026 10:00:00 GMT' } };

async function lauf(b, alt) {
  const vorher = alt ? ctx => ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/app.js'),
    r => r.fulfill({ status: 200, contentType: 'text/javascript', body: APP_ALT })) : null;
  const { p, ctx } = await neueSeite(b, GERAETE.handy, { warte: 1600, store: storeModerator(), user: MOD_USER, vorher });
  await aktion(p, 'einstellungen', null, 900);
  await aktion(p, 'einst-seite', 'feedback', 1800);
  await aktion(p, 'feedback-delete', 'f1', 700);
  await aktion(p, 'dlg-ok', null, 900);
  const zeilen = await p.evaluate(() => document.querySelectorAll('#ideen-inhalt .ideen-zeile:not(.ideen-zeile--platz)').length);
  const dok = await p.evaluate(() => { const s = window.__FB.store; return s.has('feedback/f1') ? s.get('feedback/f1') : null; });
  return { p, ctx, zeilen, dok };
}

(async () => {
  const b = await start(); let funde = 0;
  const pruef = (n, ok, info) => { if (!ok) funde++; console.log((ok ? 'ok     ' : 'FEHLER ') + n + ' | ' + info); };

  const r = await lauf(b, false);
  pruef('(a) Idee verschwindet aus der Liste', r.zeilen === 0, 'Zeilen: ' + r.zeilen);
  pruef('(b) Dokument besteht weiter, status "entfernt"', !!r.dok && r.dok.status === 'entfernt', JSON.stringify(r.dok));
  /* Dirigent bei der Abnahme: "entfernt" allein liess Titel/Beschreibung fuer
     jedes Konto ueber die Schnittstelle lesbar - beim Entfernen werden sie
     geleert (firestore.rules erlaubt der Moderation genau das). */
  pruef('(b2) Titel und Beschreibung sind geleert', !!r.dok && r.dok.text === '' && (r.dok.beschreibung == null), JSON.stringify(r.dok));
  pruef('(c) keine Seitenfehler', !r.p.fehler.length, r.p.fehler.join(' / '));

  // Konto loeschen raeumt den eigenen Stimm-Merker unter der entfernten Idee ab.
  // Erst zurueck auf die Einstellungen-Uebersicht (wie t_board_limit.js), von
  // der Ideen-Unterseite aus gibt es den Knopf "Konto loeschen" nicht.
  await r.p.evaluate(() => { const k = document.querySelector('[data-action="einstellungen"]'); if (k) k.click(); });
  await r.p.waitForTimeout(800);
  await r.p.evaluate(() => { const k = document.querySelector('[data-action="einst-seite"][data-id="konto-loeschen"]'); if (k) k.click(); });
  await r.p.waitForTimeout(900);
  await r.p.fill('#konto-loeschen-email', 'mod@example.com'); await r.p.waitForTimeout(300);
  const knopf = await (await r.p.$('[data-action="delete-account"]')).boundingBox();
  await r.p.mouse.move(knopf.x + knopf.width / 2, knopf.y + knopf.height / 2); await r.p.mouse.down();
  await r.p.waitForTimeout(2300); await r.p.mouse.up(); await r.p.waitForTimeout(500);
  if (await r.p.$('#dlg-input')) {
    await r.p.fill('#dlg-input', 'geheim');
    await r.p.evaluate(() => { const x = [...document.querySelectorAll('.dlg button')].find(y => y.innerText.trim() === 'Weiter'); if (x) x.click(); });
  }
  await r.p.waitForTimeout(2500);
  const merkerWeg = await r.p.evaluate(mod => !window.__FB.store.has('feedback/f1/votes/' + mod), MOD_UID).catch(() => false);
  pruef('(d) eigener Stimm-Merker unter der entfernten Idee ist weg', merkerWeg, String(merkerWeg));
  await r.ctx.close();

  const alt = await lauf(b, true);
  pruef('Gegenprobe c70729b: Dokument verschwindet ganz statt Status "entfernt" (muss ROT sein)', alt.dok === null, JSON.stringify(alt.dok));
  await alt.ctx.close();

  console.log('Funde: ' + funde); await b.close(); process.exit(funde ? 1 : 0);
})();
