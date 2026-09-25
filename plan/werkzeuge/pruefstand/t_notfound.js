/* G-003 (3.17.30): Ein Geraet loescht einen Bereich, das andere benennt ihn
   danach noch um -> "not-found". Bis 3.17.29 schrieb die App dann ALLE
   Bereiche ohne merge neu: Teilen-, Lehrer- und Satz-Felder weg, der
   geloeschte Bereich kam zurueck. Gegenprobe mit 3.17.29: FEHL. */
const { start, neueSeite, aktion, GERAETE, vollerStore } = require('./lib.js');
(async () => {
  const b = await start();
  const s = vollerStore();
  Object.assign(s['users/u1/bereiche/b2'], { teilCode: 'KLMNP-QRSTU', teilFreigabe: 2, satzId: 'quran-1', satzVersion: 3 });
  s['users/u1/bereiche/b3'] = { name: 'Lehrer-Satz', order: 2, gefuehrt: true, satzId: 'medina-x', satzVersion: 5, lehrerCode: 'ABCDE-FGHJK', lehrerOffenBis: 2, sets: {} };
  s['geteilteLektionen/KLMNP-QRSTU'] = { ownerUid: 'u1', erstelltAm: 'x', inhalt: { bereiche: [] }, freigabe: { offenBis: 2 } };
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800, store: s });
  const felder = () => p.evaluate(() => ['b2', 'b3'].map(id => { const d = window.__FB.store.get('users/u1/bereiche/' + id) || {}; const { sets, ...r } = d; return JSON.stringify(r); }));
  const vorher = await felder();
  await p.evaluate(() => { window.__FB.store.delete('users/u1/bereiche/b1'); });
  await aktion(p, 'tab-verwalten', null, 1000);
  await aktion(p, 'bereich-mehr-auf', null, 600); await aktion(p, 'bereich-mehr-umbenennen', null, 700);
  await p.evaluate(() => { const i = [...document.querySelectorAll('.dlg input')].pop(); i.value = 'Neuer Name'; i.dispatchEvent(new Event('input', {bubbles:true})); });
  await p.evaluate(() => [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Speichern').click());
  await p.waitForTimeout(2000);
  const nachher = await felder();
  const b1 = await p.evaluate(() => window.__FB.store.get('users/u1/bereiche/b1'));
  let fehl = 0;
  if (vorher[0] !== nachher[0]) { fehl++; console.log('FEHL b2 veraendert', vorher[0], '->', nachher[0]); }
  if (vorher[1] !== nachher[1]) { fehl++; console.log('FEHL b3 veraendert', vorher[1], '->', nachher[1]); }
  if (b1 !== undefined) { fehl++; console.log('FEHL geloeschter Bereich b1 ist wieder da'); }
  if (p.fehler.length) { fehl++; console.log('FEHL Seitenfehler', p.fehler); }
  console.log(fehl ? fehl + ' Fehler' : 'ok: Felder erhalten, Loeschung gewinnt');
  await b.close();
  process.exit(fehl ? 1 : 0);
})();
