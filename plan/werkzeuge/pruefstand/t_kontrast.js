/* Laeuft ueber die wichtigsten Bildschirme in beiden Fassungen und
   sammelt Kontrastfunde. node t_kontrast.js */
const { start, neueSeite, aktion, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
(async () => {
  const b = await start();
  const alle = [];
  for (const thema of ['dunkel', 'hell']) {
    const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800, thema });
    const pr = async n => alle.push(...await pruefeKontrast(p, thema + '/' + n));
    const tu = async (a, id, w) => { try { await aktion(p, a, id, w || 700); return true; } catch (e) { return false; } };
    await pr('lernen');
    if (await tu('start-session')) { await pr('runde-vorn'); await p.click('.study-flaeche'); await p.waitForTimeout(800); await pr('runde-hinten'); await tu('end-session'); }
    await tu('tab-fortschritt', null, 900); await pr('fortschritt');
    await tu('tab-verwalten', null, 900); await pr('verwalten');
    if (await tu('open-drill')) { await pr('ueben-auswahl'); await tu('close-drill'); }
    if (await tu('card-detail', null, 800)) { await pr('karte-detail'); if (await tu('card-detail-bearbeiten', null, 800)) await pr('karte-bearbeiten'); }
    await p.keyboard.press('Escape'); await p.waitForTimeout(400);
    await tu('tab-lernen');
    if (await tu('einstellungen', null, 800)) { await pr('einstellungen'); if (await tu('einst-seite', 'daten')) await pr('daten'); }
    await p.context().close();
    const { p: q } = await neueSeite(b, GERAETE.handy, { warte: 1800, thema, user: null });
    alle.push(...await pruefeKontrast(q, thema + '/einstieg-0'));
    await q.context().close();
  }
  const echte = alle.filter(f => !f.disabled);
  console.log('Funde:', echte.length);
  for (const f of echte) console.log(f.bild.padEnd(24), String(f.kontrast).padEnd(5), '<', f.soll, '|', f.klasse, '|', f.text);
  await b.close();
})();
