/* Stufe 1 (texte-lernen/KONZEPT.md § 13): textId, Set-Art "text" samt
   Kreisfeldern und die Reglerfelder des Bereichs ueberstehen
   (1) Neuladen, (2) Vollschreiben (persistAllAusfuehren),
   (3) Sicherung -> Einspielen (neue Nummern, Verweise umgeschrieben),
   (4) Umzug aus dem alten Format (bereicheMapToArray <- bereichFelder),
   (5) Bewertungs-Echo aus dem Snapshot (Teilabgleich).
   Echte app.js, Firebase-Attrappe. Textimport im Betreiber-Konto mit
   Einwilligung; normale Konten prueft t_import_einwilligung. Das vorherige
   Leeren des Stores entfernt auch die Einwilligung: vor Import neu zustimmen.
   --gegenprobe: derselbe Ablauf mit app.js aus 48002ad (vor Stufe 1) muss
   an mindestens vier der fuenf Wege scheitern. */
const { start } = require('./lib');
const { textWort, textStore, seiteMitApp, storeLesen, VOR_STUFE_1, BETREIBER_UID } = require('./text_lib');
const U = 'users/' + BETREIBER_UID;

const gegenprobe = process.argv.includes('--gegenprobe');
const zusatz = `
  vollschreiben: () => persistAllAusfuehren(),
  importieren: daten => verarbeiteImportDaten(daten),
  umzugRundlauf: () => JSON.parse(JSON.stringify(bereicheMapToArray({ b1: bereichFelder(bereiche.find(b => b.id === 'b1'), 0) }))),
  zeileBewerten: (bid, cid) => patchDoc({ [pfadKarte(bid, cid) + '.stufe']: 5 }),`;

const TEXT_FELDER = ['nummerAb', 'quelle', 'sure', 'kreisTage', 'kreisPos', 'kreisTag', 'festErgebnisse'];
const ERWARTET_TEXT = { nummerAb: 3, quelle: 'tanzil', sure: 2, kreisTage: 9, kreisPos: 'z2', festErgebnisse: '10110' };

function pruefeBereich(b, name, fehler, { neueIds } = {}) {
  const zeilen = b.zeilen || [];
  const texte = b.texte || [];
  if ((b.karten || []).some(c => c.textId)) fehler.push(name + ': Textzeile in b.karten');
  if ((b.karten || []).length !== 40) fehler.push(name + ': Karten ' + (b.karten || []).length + ' statt 40');
  if ((b.sets || []).some(s => s.art === 'text')) fehler.push(name + ': Text in b.sets');
  if (zeilen.length !== 10) fehler.push(name + ': Zeilen ' + zeilen.length + ' statt 10');
  if (texte.length !== 1) { fehler.push(name + ': Texte ' + texte.length + ' statt 1'); return; }
  const t = texte[0];
  if (t.art !== 'text') fehler.push(name + ': Art ' + t.art);
  for (const f of ['nummerAb', 'quelle', 'sure', 'kreisTage', 'festErgebnisse'])
    if (t[f] !== ERWARTET_TEXT[f]) fehler.push(name + ': ' + f + ' = ' + JSON.stringify(t[f]));
  if (!t.kreisTag) fehler.push(name + ': kreisTag fehlt');
  if (zeilen.some(z => z.textId !== t.id)) fehler.push(name + ': textId zeigt nicht auf den Text');
  if (t.cardIds.join() !== zeilen.map(z => z.id).join()) fehler.push(name + ': Reihenfolge/Verweise der Zeilen');
  const pos = zeilen.findIndex(z => z.id === t.kreisPos);
  if (pos !== 2) fehler.push(name + ': kreisPos zeigt auf Zeile ' + pos + ' statt 2');
  if (zeilen.map(z => z.wort).join('|') !== Array.from({ length: 10 }, (_, i) => textWort(i)).join('|'))
    fehler.push(name + ': Zeilentexte/Reihenfolge (laengste Zeile ' + Math.max(...zeilen.map(z => z.wort.length)) + ' Zeichen)');
  if (zeilen.filter(z => z.stufe === 7).length !== 4) fehler.push(name + ': Stufen der Zeilen');
  if (neueIds && zeilen.some(z => /^z\d$/.test(z.id))) fehler.push(name + ': Zeilen behielten alte Nummern');
  if (!neueIds && (b.abstandFaktor !== 0.8 || b.festErgebnisse !== '1110')) fehler.push(name + ': Reglerfelder ' + b.abstandFaktor + '/' + b.festErgebnisse);
}

(async () => {
  const browser = await start();
  const wege = {};
  try {
    const store = textStore();
    store['users/u1'].texteEinwilligung = '2026-09-01';
    const { ctx, p } = await seiteMitApp(browser, store, { uid: BETREIBER_UID, commit: gegenprobe ? VOR_STUFE_1 : null, zusatz });

    // (1) Neuladen
    let f = [];
    const b1 = (await p.evaluate(() => window.__PRUEF.bereiche())).find(b => b.id === 'b1');
    pruefeBereich(b1, 'Neuladen', f);
    wege.neuladen = f;

    // (2) Vollschreiben: alle Dokumente frisch geschrieben, danach Store pruefen
    f = [];
    await p.evaluate(() => { window.__FB.store.clear(); });
    await p.evaluate(() => window.__PRUEF.vollschreiben());
    const s = await storeLesen(p);
    for (let i = 0; i < 10; i++) {
      const z = s[U + '/karten/z' + i];
      if (!z) { f.push('Vollschreiben: z' + i + ' fehlt'); continue; }
      if (z.textId !== 't1') f.push('Vollschreiben: z' + i + ' textId = ' + z.textId);
    }
    const kz = Object.entries(s).filter(([k, v]) => k.startsWith(U + '/karten/') && 'textId' in v && !/\/z\d$/.test(k));
    if (kz.length) f.push('Vollschreiben: ' + kz.length + ' gewoehnliche Karten tragen textId');
    const bd = s[U + '/bereiche/b1'] || {};
    const t1 = (bd.sets || {}).t1 || {};
    for (const [k, v] of Object.entries(ERWARTET_TEXT)) if (t1[k] !== v) f.push('Vollschreiben: sets.t1.' + k + ' = ' + JSON.stringify(t1[k]));
    if (t1.art !== 'text') f.push('Vollschreiben: sets.t1.art = ' + t1.art);
    if (bd.abstandFaktor !== 0.8 || bd.festErgebnisse !== '1110') f.push('Vollschreiben: Regler ' + bd.abstandFaktor + '/' + bd.festErgebnisse);
    if ('abstandFaktor' in (s[U + '/bereiche/b2'] || {})) f.push('Vollschreiben: Regler an Bereich ohne Regler');
    for (const [k, v] of Object.entries((bd.sets || {}))) if (v.art !== 'text' && TEXT_FELDER.some(x => x in v)) f.push('Vollschreiben: Kreisfelder an Speicherkarte ' + k);
    wege.vollschreiben = f;

    // (3) Sicherung -> Einspielen
    f = [];
    await p.evaluate(() => {
      window.__PRUEF.importieren({ bereiche: [JSON.parse(JSON.stringify(window.__PRUEF.bereiche().find(b => b.id === 'b1')))] })
        .then(() => { window.__FELDER_IMPORT_FERTIG = true; });
    });
    if (!gegenprobe) {
      await p.locator('.dlg').filter({ hasText: 'Texte speichern' }).waitFor();
      await p.locator('[data-action="dlg-ok"]').click();
    }
    await p.waitForFunction(() => window.__FELDER_IMPORT_FERTIG);
    await p.waitForTimeout(500);
    const nachImport = await p.evaluate(() => window.__PRUEF.bereiche());
    const kopie = nachImport.find(b => b.name === 'Medina Buch 1 (2)');
    if (!kopie) f.push('Import: kein neuer Bereich');
    else {
      pruefeBereich(kopie, 'Import', f, { neueIds: true });
      const s2 = await storeLesen(p);
      const doks = Object.values(s2).filter(v => v.bereichId === kopie.id && v.textId);
      if (doks.length !== 10) f.push('Import: ' + doks.length + ' Zeilen-Dokumente statt 10');
      if (doks.some(d => d.textId !== (kopie.texte[0] || {}).id)) f.push('Import: textId im Dokument nicht umgeschrieben');
    }
    wege.import = f;

    // (4) Umzug aus dem alten Format
    f = [];
    const umzug = await p.evaluate(() => window.__PRUEF.umzugRundlauf());
    pruefeBereich(umzug[0], 'Umzug', f);
    wege.umzug = f;

    // (5) Bewertungs-Echo: Zeile bleibt Zeile
    f = [];
    await p.evaluate(() => window.__PRUEF.zeileBewerten('b1', 'z5'));
    await p.waitForTimeout(500);
    const nachEcho = (await p.evaluate(() => window.__PRUEF.bereiche())).find(b => b.id === 'b1');
    const z5 = (nachEcho.zeilen || []).find(z => z.id === 'z5');
    if (!z5 || z5.stufe !== 5) f.push('Echo: z5 nicht als Zeile mit Stufe 5 (' + JSON.stringify(z5 && z5.stufe) + ')');
    if (nachEcho.karten.some(c => c.id === 'z5')) f.push('Echo: z5 unter den Karten');
    wege.echo = f;

    if (p.fehler.length) wege.seitenfehler = p.fehler;
    await ctx.close();
  } finally { await browser.close(); }

  let rot = 0;
  for (const [weg, f] of Object.entries(wege)) {
    console.log((f.length ? 'ROT ' : 'OK  ') + weg + (f.length ? ':\n    ' + f.slice(0, 6).join('\n    ') : ''));
    if (f.length) rot++;
  }
  if (gegenprobe) {
    const erwartet = rot >= 4;
    console.log(erwartet ? 'Gegenprobe wie erwartet rot (' + rot + ' Wege)' : 'FEHLER Gegenprobe: nur ' + rot + ' Wege rot');
    process.exitCode = erwartet ? 0 : 1;
  } else {
    console.log(rot ? 'ROT (' + rot + ')' : 'OK');
    process.exitCode = rot ? 1 : 0;
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
