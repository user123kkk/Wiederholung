const { start, neueSeite, aktion, GERAETE, vollerStore, tag } = require('/home/user/Wiederholung/plan/werkzeuge/pruefstand/lib.js');
(async () => {
  const store = vollerStore();
  store['users/u1/bereiche/b3'] = { name: 'Medina', order: 2, gefuehrt: true, satzId: 'medina-abc', satzVersion: 1,
    sets: { l1: { name: 'Lektion 1', order: 0, art: 'lektion', quelleId: 'ql1', cardIds: ['ka', 'kb'] } } };
  store['users/u1/karten/ka'] = { wort: 'عَيْنٌ', uebersetzung: 'Auge', extra: '', stufe: 5, nextReview: tag(9), ersteBewertung: tag(-30), rueckfaelle: 0, quelleId: 'qa', maxStufe: 5, order: 0, bereichId: 'b3' };
  store['users/u1/karten/kb'] = { wort: 'بَابٌ', uebersetzung: 'Tür', extra: '', stufe: 4, nextReview: tag(5), ersteBewertung: tag(-30), rueckfaelle: 0, quelleId: 'qb', maxStufe: 4, order: 1, bereichId: 'b3' };
  store['geteilteLektionen/ABCDE-FGHJK'] = { ownerUid: 'u9', erstelltAm: 'x', inhalt: { bereiche: [{ id: 'z', name: 'Medina', gefuehrt: true, satzId: 'medina-abc', satzVersion: 2,
    karten: [{ id: 'x1', quelleId: 'qa', wort: 'عَيْنٌ', uebersetzung: 'Auge', extra: '', stufe: 0 },
             { id: 'x2', quelleId: 'qb', wort: 'بَابٌ', uebersetzung: 'Tür', extra: '', stufe: 0 },
             { id: 'x3', quelleId: 'qc', wort: 'عَيْنٌ', uebersetzung: 'Quelle', extra: '', stufe: 0 }],
    sets: [{ id: 's', quelleId: 'ql1', name: 'Lektion 1', art: 'lektion', cardIds: ['x1', 'x2', 'x3'] }] }] } };
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { store, warte: 1800 });
  const blatt = () => p.evaluate(() => { const d = [...document.querySelectorAll('.dlg')].pop(); return d ? d.innerText.replace(/\s+/g, ' ').slice(0, 300) : '–'; });
  const ok = () => p.evaluate(() => { const k = [...document.querySelectorAll('.dlg button')].pop(); if (k) k.click(); });
  await aktion(p, 'einstellungen', null, 700); await aktion(p, 'einst-seite', 'kartensaetze', 700);
  await aktion(p, 'code-einloesen-start', null, 600); await p.fill('#dlg-input', 'ABCDE-FGHJK'); await ok(); await p.waitForTimeout(800);
  console.log('1:', await blatt()); await ok(); await p.waitForTimeout(800);
  console.log('2:', await blatt()); await ok(); await p.waitForTimeout(800);
  console.log('3:', await blatt()); await ok(); await p.waitForTimeout(800);
  const k = await p.evaluate(() => [...window.__FB.store.entries()].filter(([k, v]) => k.includes('/karten/') && v.bereichId === 'b3').map(([k, v]) => k.split('/').pop() + ':' + v.wort + '=' + v.uebersetzung + ' stufe' + v.stufe + ' order' + v.order));
  const s = await p.evaluate(() => JSON.stringify(window.__FB.store.get('users/u1/bereiche/b3').sets));
  console.log('Karten b3 in Cloud:', k.join(' | ')); console.log('Sets:', s);
  console.log(p.fehler.join(' | ') || 'keine Fehler');
  await b.close();
})();
