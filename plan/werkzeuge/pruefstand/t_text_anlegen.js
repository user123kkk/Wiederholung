/* Stufe 2 (texte-lernen/KONZEPT.md § 13): Text anlegen, bearbeiten,
   sichern, einspielen, loeschen - ueber die echte Oberflaeche.
   Die 30 Zeilen Arabisch mit Harakat kommen unveraendert aus
   quran/tanzil-uthmani.txt (Sure 2, Aya 1-30) - kein Wortlaut vom Agenten.
   1. Einfuegen: 30 Zeilen -> Vorschau 30; Zusammen (29), Teilen (30),
      Wortlaut bleibt insgesamt gleich.
   2. "Kann ich schon bis 15": 15 frisch (heute faellig), 15 neu.
   3. Zeile bearbeiten: Wortlaut neu, Lernstand bleibt (T13); neue Zeile
      danach; Zeile loeschen.
   4. Sichern (echter Download) -> Einspielen (echtes Dateifeld): gleicher
      Wortlaut, gleiche Zustaende, neue Nummern, Verweise stimmen.
   5. Text loeschen: kein Dokument, kein Set bleibt.
   6. Konto ohne Probelauf sieht "Karte hinzufuegen" und keinen Texte-Block. */
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { start, vollerStore, tag } = require('./lib');
const { seiteMitApp, storeLesen, BETREIBER_UID, textStore } = require('./text_lib');

const QUELLE = fs.readFileSync(path.join(__dirname, '../../../quran/tanzil-uthmani.txt'), 'utf8')
  .split('\n').filter(l => l && l[0] !== '#').map(l => l.split('|'));
const ZEILEN = QUELLE.filter(p => p[0] === '2' && +p[1] <= 30).map(p => p[2]);
const U = 'users/' + BETREIBER_UID;
const zusatz = `sichern: () => exportBackup(true),`;

(async () => {
  const fehler = [];
  const pruefe = (ok, text) => { if (!ok) fehler.push(text); };
  const browser = await start();
  try {
    const store = vollerStore();
    store['users/u1'].texteEinwilligung = tag(0);
    const { ctx, p } = await seiteMitApp(browser, store, { uid: BETREIBER_UID, zusatz });
    const klick = async (sel, w = 600) => { await p.click(sel); await p.waitForTimeout(w); };
    const texteImStore = async () => {
      const s = await storeLesen(p);
      return { s, zeilen: Object.entries(s).filter(([k, v]) => k.startsWith(U + '/karten/') && v.textId) };
    };

    // 1. Einfuegen, Vorschau, Zusammen, Teilen
    await klick('[data-action="tab-verwalten"]');
    await klick('[data-action="neu-wahl"]');
    await klick('[data-action="text-neu"][data-id="selbst"]');
    await p.fill('#t-titel', 'Testtext 30');
    await p.fill('#t-roh', ZEILEN.join('\n') + '\n\n');
    await klick('[data-action="text-pruefen"]');
    const vorschau = () => p.$$eval('.text-vorschau__text', els => els.map(e => e.textContent));
    let v = await vorschau();
    pruefe(v.length === 30, 'Vorschau: ' + v.length + ' statt 30 Zeilen');
    pruefe(v.join('|') === ZEILEN.join('|'), 'Vorschau: Wortlaut weicht von der Quelle ab');
    await klick('[data-action="text-zusammen"][data-id="0"]');
    v = await vorschau();
    pruefe(v.length === 29 && v[0] === ZEILEN[0] + ' ' + ZEILEN[1], 'Zusammen: ' + v.length + ' Zeilen');
    await klick('[data-action="text-teilen"][data-id="0"]');
    v = await vorschau();
    pruefe(v.length === 30 && v.join(' ') === ZEILEN.join(' '), 'Teilen: ' + v.length + ' Zeilen, Wortlaut gesamt ' + (v.join(' ') === ZEILEN.join(' ') ? 'gleich' : 'anders'));

    // 2. Kann ich schon bis 15, anlegen
    await p.selectOption('#t-kann', '15');
    await p.waitForTimeout(200);
    await klick('[data-action="text-anlegen"]', 1000);
    let { s, zeilen } = await texteImStore();
    const set = Object.values(s[U + '/bereiche/b1'].sets).find(x => x.art === 'text');
    pruefe(!!set && set.name === 'Testtext 30', 'Set fehlt oder falscher Name');
    pruefe(zeilen.length === 30, 'Zeilen-Dokumente: ' + zeilen.length);
    if (set) {
      const nachId = Object.fromEntries(zeilen.map(([k, d]) => [k.split('/').pop(), d]));
      const geordnet = set.cardIds.map(id => nachId[id]);
      pruefe(geordnet.every(Boolean), 'cardIds zeigen ins Leere');
      pruefe(geordnet.map(d => d && d.wort).join(' ') === ZEILEN.join(' '), 'Gespeicherter Wortlaut weicht ab');
      const frisch = geordnet.filter(d => d && d.ersteBewertung === tag(0) && d.nextReview === tag(0) && d.stufe === 0);
      const neu = geordnet.filter(d => d && d.ersteBewertung === null);
      pruefe(frisch.length === 15 && geordnet.slice(0, 15).every(d => d && d.ersteBewertung === tag(0)), 'frisch: ' + frisch.length + ' statt 15 (die ersten)');
      pruefe(neu.length === 15, 'neu: ' + neu.length + ' statt 15');
      const setId = Object.entries(s[U + '/bereiche/b1'].sets).find(([, x]) => x.art === 'text')[0];
      pruefe(geordnet.every(d => d && d.textId === setId), 'textId zeigt nicht auf den Text');
    }
    pruefe(await p.$('.text-zeile') !== null, 'Text-Ansicht nach dem Anlegen nicht offen');
    const karteZaehler = await p.evaluate(() => window.__PRUEF.bereiche()[0].karten.length);
    pruefe(karteZaehler === 40, 'Karten nach dem Anlegen: ' + karteZaehler + ' statt 40');

    // 3. Bearbeiten, Einfuegen, Loeschen einer Zeile
    const ersteId = await p.$eval('.text-zeile', e => e.dataset.id);
    await klick('.text-zeile');
    await p.fill('#z-wort', ZEILEN[0] + ' X');
    await klick('[data-action="zeile-speichern"]');
    ({ s } = await texteImStore());
    const bearbeitet = s[U + '/karten/' + ersteId];
    pruefe(bearbeitet.wort === ZEILEN[0] + ' X', 'Bearbeiten: Wortlaut nicht gespeichert');
    pruefe(bearbeitet.ersteBewertung === tag(0) && bearbeitet.stufe === 0, 'Bearbeiten: Lernstand veraendert');
    await klick('.text-zeile');
    await klick('[data-action="zeile-einfuegen"]');
    await p.fill('#z-wort', 'Neue Testzeile');
    await klick('[data-action="zeile-speichern"]');
    ({ s, zeilen } = await texteImStore());
    let t = Object.values(s[U + '/bereiche/b1'].sets).find(x => x.art === 'text');
    pruefe(zeilen.length === 31 && s[U + '/karten/' + t.cardIds[1]].wort === 'Neue Testzeile', 'Einfuegen: nicht an Position 2 (' + zeilen.length + ')');
    await p.click('.text-zeile >> nth=1'); await p.waitForTimeout(500);
    await klick('[data-action="zeile-loeschen"]');
    await klick('[data-action="dlg-ok"]', 800);
    ({ s, zeilen } = await texteImStore());
    t = Object.values(s[U + '/bereiche/b1'].sets).find(x => x.art === 'text');
    pruefe(zeilen.length === 30 && t.cardIds.length === 30, 'Zeile loeschen: ' + zeilen.length + ' Dokumente, ' + t.cardIds.length + ' Verweise');

    // 4. Sichern -> Einspielen
    const [download] = await Promise.all([p.waitForEvent('download'), p.evaluate(() => window.__PRUEF.sichern())]);
    const datei = path.join(os.tmpdir(), 'adrabic-text-sicherung.json');
    await download.saveAs(datei);
    const gesichert = JSON.parse(fs.readFileSync(datei, 'utf8'));
    pruefe((gesichert.bereiche[0].zeilen || []).length === 30 && (gesichert.bereiche[0].texte || []).length === 1, 'Sicherung ohne Zeilen/Text');
    await p.setInputFiles('#import-file-input', datei);
    await p.waitForTimeout(1500);
    const alleB = await p.evaluate(() => window.__PRUEF.bereiche());
    const kopie = alleB.find(b => b.name === 'Medina Buch 1 (2)');
    const original = alleB.find(b => b.id === 'b1');
    pruefe(!!kopie, 'Einspielen: kein neuer Bereich');
    if (kopie && original) {
      const reihe = b => b.texte[0].cardIds.map(id => b.zeilen.find(z => z.id === id));
      const ro = reihe(original), rk = reihe(kopie);
      pruefe(rk.length === 30 && rk.every(Boolean), 'Einspielen: ' + rk.length + ' Zeilen');
      pruefe(rk.map(z => z.wort + '/' + z.stufe + '/' + z.ersteBewertung).join('|') === ro.map(z => z.wort + '/' + z.stufe + '/' + z.ersteBewertung).join('|'), 'Einspielen: Wortlaut oder Lernstand anders');
      pruefe(rk.every(z => z.textId === kopie.texte[0].id) && kopie.texte[0].id !== original.texte[0].id, 'Einspielen: Verweise/Nummern');
      pruefe(!rk.some(z => ro.some(o => o.id === z.id)), 'Einspielen: alte Zeilen-Nummern wiederverwendet');
      pruefe(kopie.karten.length === 40, 'Einspielen: Karten ' + kopie.karten.length);
    }

    // 5. Text loeschen (im Original) - vorher die Meldung "eingespielt" schliessen
    if (await p.$('.dlg [data-action="dlg-ok"]')) await klick('.dlg [data-action="dlg-ok"]');
    await p.evaluate(() => { const k = document.querySelector('[data-action="tab-lernen"]'); k.click(); });
    await p.waitForTimeout(400);
    await klick('[data-action="tab-verwalten"]');
    await klick('[data-action="text-oeffnen"]');
    await klick('[data-action="text-loeschen"]');
    await klick('[data-action="dlg-ok"]', 1000);
    ({ s } = await texteImStore());
    const rest = Object.entries(s).filter(([k, v]) => k.startsWith(U + '/karten/') && v.bereichId === 'b1' && v.textId);
    const setsB1 = Object.values(s[U + '/bereiche/b1'].sets).filter(x => x.art === 'text');
    pruefe(rest.length === 0 && setsB1.length === 0, 'Loeschen: ' + rest.length + ' Zeilen, ' + setsB1.length + ' Texte bleiben');
    pruefe(p.fehler.length === 0, 'Seitenfehler: ' + p.fehler.join(' | '));
    await ctx.close();

    // 6. Ohne Probelauf: kein Angebot, auch wenn Texte da sind
    const { ctx: c2, p: p2 } = await seiteMitApp(browser, textStore(), {});
    await p2.click('[data-action="tab-verwalten"]'); await p2.waitForTimeout(600);
    pruefe(await p2.$('[data-action="neu-wahl"]') === null && await p2.$('[data-action="karte-neu"]') !== null, 'Ohne Probelauf: falscher Knopf');
    pruefe(await p2.$('[data-action="text-oeffnen"]') === null, 'Ohne Probelauf: Texte-Block sichtbar');
    await c2.close();
  } finally { await browser.close(); }
  if (fehler.length) { console.log('ROT:\n  ' + fehler.join('\n  ')); process.exitCode = 1; }
  else console.log('OK: Anlegen, Vorschau, kann-ich-schon, Bearbeiten, Sichern/Einspielen, Loeschen, Schalter');
})().catch(e => { console.error(e); process.exitCode = 1; });
