const { start, neueSeite, aktion, GERAETE, vollerStore } = require('/home/user/Wiederholung/plan/werkzeuge/pruefstand/lib.js');
(async () => {
  const b = await start();
  const s = vollerStore();
  Object.assign(s['users/u1/bereiche/b2'], { teilCode: 'KLMNP-QRSTU', teilFreigabe: 2, satzId: 'quran-1', satzVersion: 3 });
  s['users/u1/bereiche/b3'] = { name: 'Lehrer-Satz', order: 2, gefuehrt: true, satzId: 'medina-x', satzVersion: 5, lehrerCode: 'ABCDE-FGHJK', lehrerOffenBis: 2, sets: {} };
  s['geteilteLektionen/KLMNP-QRSTU'] = { ownerUid: 'u1', erstelltAm: 'x', inhalt: { bereiche: [] }, freigabe: { offenBis: 2 } };
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800, store: s });
  const vorher = await p.evaluate(() => ({ b2: window.__FB.store.get('users/u1/bereiche/b2'), b3: window.__FB.store.get('users/u1/bereiche/b3') }));
  // anderes Geraet loescht b1 - Snapshot hat dieses Geraet noch nicht erreicht
  await p.evaluate(() => { window.__FB.store.delete('users/u1/bereiche/b1'); });
  await aktion(p, 'tab-verwalten', null, 1000);
  await aktion(p, 'bereich-mehr-auf', null, 600); await aktion(p, 'bereich-mehr-umbenennen', null, 700);
  await p.evaluate(() => { const i = [...document.querySelectorAll('.dlg input')].pop(); i.value = 'Neuer Name'; i.dispatchEvent(new Event('input', {bubbles:true})); });
  await p.evaluate(() => [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Speichern').click());
  await p.waitForTimeout(2000);
  const nachher = await p.evaluate(() => ({ b1: window.__FB.store.get('users/u1/bereiche/b1'), b2: window.__FB.store.get('users/u1/bereiche/b2'), b3: window.__FB.store.get('users/u1/bereiche/b3') }));
  const strip = o => o && Object.fromEntries(Object.entries(o).filter(([k]) => k !== 'sets'));
  console.log('VORHER b2', JSON.stringify(strip(vorher.b2)), '\nVORHER b3', JSON.stringify(strip(vorher.b3)));
  console.log('NACHHER b1', JSON.stringify(strip(nachher.b1)), '\nNACHHER b2', JSON.stringify(strip(nachher.b2)), '\nNACHHER b3', JSON.stringify(strip(nachher.b3)));
  console.log('Fehler', p.fehler);
  await b.close();
})();
