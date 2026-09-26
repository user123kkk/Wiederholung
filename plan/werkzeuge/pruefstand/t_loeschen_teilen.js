/* 3.17.24: Loeschen raeumt geteilte Kartensaetze und Stimm-Merker mit ab;
   Bilder aus fremden Kartensaetzen werden nicht von selbst geladen.
   node t_loeschen_teilen.js */
const { start, neueSeite, aktion, GERAETE, vollerStore, tag } = require('./lib');
const nutzer = { uid: 'u1', email: 'test@example.com', displayName: 'Test', emailVerified: true,
  providerData: [{ providerId: 'password' }], metadata: { creationTime: 'Mon, 03 Aug 2026 10:00:00 GMT', lastSignInTime: new Date().toUTCString() } };
function store() {
  const s = vollerStore();
  s['users/u1/bereiche/b1'].teilCode = 'ABCDE-FGHJK';
  s['users/u1/bereiche/b2'].teilCode = 'KLMNP-QRSTU';
  const satz = uid => ({ ownerUid: uid, erstelltAm: '2026-09-20T10:00:00Z', inhalt: { bereiche: [] } });
  s['geteilteLektionen/ABCDE-FGHJK'] = satz('u1');
  s['geteilteLektionen/KLMNP-QRSTU'] = satz('u1');
  s['geteilteLektionen/ZZZZZ-ZZZZZ'] = satz('u2');
  // 3.17.30 (G-006): verwaister eigener Satz - kein Bereich traegt seinen Code mehr
  s['geteilteLektionen/WAWAW-WAWAW'] = satz('u1');
  s['feedback/f1'] = { text: 'Idee', erstelltAm: '2026-09-20T10:00:00Z', votes: 2, status: 'offen' };
  s['feedback/f1/votes/u1'] = {};
  s['feedback/f1/votes/u2'] = {};
  const karte = (extra, quelleId, order) => ({ wort: 'بَيْتٌ', uebersetzung: 'Haus', extra, stufe: 0, nextReview: tag(0),
    ersteBewertung: null, rueckfaelle: 0, quelleId, maxStufe: 0, order, bereichId: 'b1' });
  s['users/u1/karten/kfremd'] = karte('https://bilder.example/bild-fremd.png', 'q-fremd', -2);
  s['users/u1/karten/keigen'] = karte('https://bilder.example/bild-eigen.png', null, -1);
  return s;
}
const reste = p => p.evaluate(() => [...window.__FB.store.keys()].filter(k => /^geteilteLektionen|^feedback|^users\/u1/.test(k)).sort());
(async () => {
  const b = await start();
  let fehler = 0;
  const pruefe = (name, ok) => { console.log((ok ? 'OK  ' : 'FEHL') + ' ' + name); if (!ok) fehler++; };

  // A: Konto loeschen
  {
    const { p } = await neueSeite(b, GERAETE.handy, { warte: 1500, user: nutzer, store: store() });
    await aktion(p, 'einstellungen', null, 800); await aktion(p, 'einst-seite', 'konto-loeschen', 900);
    await p.fill('#konto-loeschen-email', 'test@example.com'); await p.waitForTimeout(300);
    const k = await p.$('[data-action="delete-account"]'); const r = await k.boundingBox();
    await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2); await p.mouse.down(); await p.waitForTimeout(2300); await p.mouse.up();
    /* 3.17.38 (G-051): vor dem Loeschen wird IMMER neu angemeldet - vorher
       sprang die Abfrage bei "frischer" lastSignInTime weg, dieser Test hat
       sie deshalb nie beantwortet (5 Fehler seit 3.17.38, erst in Runde 10
       bemerkt). */
    await p.waitForTimeout(500);
    if (await p.$('#dlg-input')) {
      await p.fill('#dlg-input', 'geheim');
      await p.evaluate(() => { const x = [...document.querySelectorAll('.dlg button')].find(y => y.innerText.trim() === 'Weiter'); if (x) x.click(); });
    }
    await p.waitForTimeout(2500);
    const rest = await reste(p);
    pruefe('Konto: eigene geteilte Saetze weg', !rest.includes('geteilteLektionen/ABCDE-FGHJK') && !rest.includes('geteilteLektionen/KLMNP-QRSTU'));
    pruefe('Konto: verwaister eigener Satz (ohne teilCode am Bereich) weg', !rest.includes('geteilteLektionen/WAWAW-WAWAW'));
    pruefe('Konto: fremder geteilter Satz bleibt', rest.includes('geteilteLektionen/ZZZZZ-ZZZZZ'));
    pruefe('Konto: eigener Stimm-Merker weg, fremder bleibt', !rest.includes('feedback/f1/votes/u1') && rest.includes('feedback/f1/votes/u2'));
    pruefe('Konto: Vorschlag selbst bleibt', rest.includes('feedback/f1'));
    pruefe('Konto: users/u1 leer', !rest.some(x => x.startsWith('users/u1')));
    pruefe('Konto: Auth-Konto geloescht', await p.evaluate(() => !!window.__FB.geloescht));
    pruefe('Konto: keine Seitenfehler', !p.fehler.length); if (p.fehler.length) console.log(p.fehler.join('\n'));
    await p.context().close();
  }

  // B: Bereich loeschen beendet das Teilen
  {
    const { p } = await neueSeite(b, GERAETE.handy, { warte: 1500, user: nutzer, store: store() });
    await aktion(p, 'tab-verwalten', null, 1200);
    await aktion(p, 'bereich-sheet-auf', null, 700);
    await p.evaluate(() => [...document.querySelectorAll('[data-action="select-bereich"]')].find(x => x.innerText.includes('Quran')).click()); await p.waitForTimeout(700);
    await aktion(p, 'bereich-mehr-auf', null, 500); await aktion(p, 'bereich-mehr-loeschen', null, 700);
    const frage = await p.evaluate(() => { const d = [...document.querySelectorAll('.dlg')].pop(); return d ? d.innerText.replace(/\s+/g, ' ') : ''; });
    pruefe('Bereich: Rueckfrage nennt den Code (' + frage.slice(0, 90) + ')', frage.includes('KLMNP-QRSTU'));
    await p.evaluate(() => [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Löschen').click()); await p.waitForTimeout(1200);
    const rest = await reste(p);
    pruefe('Bereich: geteilter Satz des Bereichs weg', !rest.includes('geteilteLektionen/KLMNP-QRSTU'));
    pruefe('Bereich: anderer eigener Satz bleibt', rest.includes('geteilteLektionen/ABCDE-FGHJK'));
    pruefe('Bereich: keine Seitenfehler', !p.fehler.length); if (p.fehler.length) console.log(p.fehler.join('\n'));
    await p.context().close();
  }

  // C: Bilder aus fremden Kartensaetzen
  {
    const { p, ctx } = await neueSeite(b, GERAETE.handy, { warte: 1500, user: nutzer, store: store() });
    const geladen = [];
    await ctx.route('**/bilder.example/**', r => { geladen.push(r.request().url()); r.fulfill({ status: 200, contentType: 'image/png', body: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64') }); });
    await aktion(p, 'tab-verwalten', null, 1500);
    const dom = await p.evaluate(() => ({
      imgFremd: !!document.querySelector('img[src*="bild-fremd"]'), linkFremd: !!document.querySelector('a[href*="bild-fremd"]'),
      imgEigen: !!document.querySelector('img[src*="bild-eigen"]') }));
    await p.waitForTimeout(800);
    /* 3.17.32 (G-020): Die Liste zeigt statt des Bildes nur noch "Bild" -
       das eigene Bild erscheint in der Kartenansicht. */
    dom.listeOhneBild = !dom.imgEigen && await p.evaluate(() => { const r = document.querySelector('[data-action="card-detail"][data-id="keigen"] .extra-note'); return !!r && r.innerText.includes('Bild'); });
    await p.evaluate(() => document.querySelector('[data-action="card-detail"][data-id="keigen"]').click()); await p.waitForTimeout(1000);
    dom.imgEigen = await p.evaluate(() => !!document.querySelector('img[src*="bild-eigen"]'));
    pruefe('Bild: fremdes nur als Link, kein <img>', dom.linkFremd && !dom.imgFremd);
    pruefe('Bild: fremdes nicht geladen', !geladen.some(u => u.includes('bild-fremd')));
    pruefe('Bild: eigenes in der Liste nur als „Bild"', dom.listeOhneBild);
    pruefe('Bild: eigenes in der Kartenansicht als Bild', dom.imgEigen);
    pruefe('Bild: keine Seitenfehler', !p.fehler.length); if (p.fehler.length) console.log(p.fehler.join('\n'));
    await p.context().close();
  }

  console.log(fehler ? fehler + ' Fehler' : 'alles ok');
  await b.close();
})();
