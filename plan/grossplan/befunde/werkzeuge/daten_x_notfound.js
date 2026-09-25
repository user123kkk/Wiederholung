const { start, neueSeite, aktion, GERAETE, vollerStore, tag } = require('/home/user/Wiederholung/plan/werkzeuge/pruefstand/lib.js');
(async () => {
  const store = vollerStore();
  store['users/u1/bereiche/b1'].teilCode = 'ABCDE-FGHJK'; store['users/u1/bereiche/b1'].satzId = 'medina-own'; store['users/u1/bereiche/b1'].satzVersion = 3;
  store['users/u1/bereiche/b3'] = { name: 'Medina (Lehrer)', order: 2, gefuehrt: true, satzId: 'medina-abc', satzVersion: 1, lehrerCode: 'ZZZZZ-ZZZZZ', lehrerOffenBis: 3,
    sets: { l1: { name: 'Lektion 1', order: 0, art: 'lektion', quelleId: 'ql1', cardIds: ['ka'] } } };
  store['users/u1/karten/ka'] = { wort: 'عَيْنٌ', uebersetzung: 'Auge', extra: '', stufe: 5, nextReview: tag(9), ersteBewertung: tag(-30), rueckfaelle: 0, quelleId: 'qa', maxStufe: 5, order: 0, bereichId: 'b3' };
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { store, warte: 1800 });
  const vorher = await p.evaluate(() => JSON.stringify([window.__FB.store.get('users/u1/bereiche/b1'), window.__FB.store.get('users/u1/bereiche/b3')].map(d => { const { sets, ...r } = d; return r; })));
  await aktion(p, 'tab-verwalten', null, 700);
  await aktion(p, 'edit-card', 'k5', 700).catch(async () => { await aktion(p, 'card-detail', 'k5', 600); await aktion(p, 'card-detail-bearbeiten', null, 600); });
  // anderes Geraet loescht k5 (ohne dass hier schon ein Snapshot ankam)
  await p.evaluate(() => window.__FB.store.delete('users/u1/karten/k5'));
  await p.fill('#f-ueb', 'Student (geaendert)');
  await aktion(p, 'submit-card', null, 1200);
  const nachher = await p.evaluate(() => JSON.stringify([window.__FB.store.get('users/u1/bereiche/b1'), window.__FB.store.get('users/u1/bereiche/b3')].map(d => { const { sets, ...r } = d; return r; })));
  console.log('vorher :', vorher); console.log('nachher:', nachher);
  console.log('k5 wieder da:', await p.evaluate(() => JSON.stringify(window.__FB.store.get('users/u1/karten/k5'))));
  console.log(p.fehler.join(' | ') || 'keine Fehler');
  await b.close();
})();
