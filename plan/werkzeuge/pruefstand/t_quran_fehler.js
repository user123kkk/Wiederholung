/* Stufe 2, Gegenpruefung: Laedt der Quran-Text nicht (Netzfehler), darf die
   offene Text-Ansicht einer Sure nicht bei jedem Neuzeichnen erneut laden
   (LEHREN § 6.7, Endlosschleife 3.9.1). Erwartet: genau ein Versuch je
   Datei, auch nach mehreren Neuzeichnungen; die Ansicht bleibt bedienbar.
   Auf der Anlege-Seite gibt es "Erneut versuchen" - der Knopf laedt neu.
   --gegenprobe: ohne die Sperre (!quranFehler) muss es mehrere Versuche geben. */
const { start } = require('./lib');
const { textStore, seiteMitApp, BETREIBER_UID } = require('./text_lib');

(async () => {
  const gegenprobe = process.argv.includes('--gegenprobe');
  const fehler = [];
  const browser = await start();
  try {
    const ersetze = gegenprobe ? ['if (t.quelle === "tanzil" && !quranFehler) quranLaden();', 'if (t.quelle === "tanzil") quranLaden();'] : null;
    const { ctx, p } = await seiteMitApp(browser, textStore(), { uid: BETREIBER_UID, ersetze, zusatz: 'neuZeichnen: () => render(),' });
    let versuche = 0;
    await p.route('**/quran/**', r => { versuche++; r.abort(); });
    await p.click('[data-action="tab-verwalten"]'); await p.waitForTimeout(500);
    await p.click('[data-action="text-oeffnen"]'); await p.waitForTimeout(800);
    for (let i = 0; i < 5; i++) { await p.evaluate(() => window.__PRUEF.neuZeichnen()); await p.waitForTimeout(300); }
    await p.waitForTimeout(1000);
    const zeilen = await p.$$eval('.text-zeile', e => e.length);
    console.log('Ladeversuche: ' + versuche + ', Zeilen sichtbar: ' + zeilen);
    if (gegenprobe) {
      console.log(versuche > 2 ? 'Gegenprobe wie erwartet rot' : 'FEHLER Gegenprobe: kein Mehrfachladen');
      process.exitCode = versuche > 2 ? 0 : 1;
    } else {
      if (versuche !== 2) fehler.push('Ladeversuche ' + versuche + ' statt 2 (Text + Metadaten)');
      if (zeilen !== 10) fehler.push('Ansicht zeigt ' + zeilen + ' statt 10 Zeilen');
      // Anlege-Seite: Fehler steht da, "Erneut versuchen" laedt ein weiteres Mal
      await p.click('[data-action="text-schliessen"]'); await p.waitForTimeout(400);
      await p.click('[data-action="neu-wahl"]'); await p.waitForTimeout(400);
      await p.click('[data-action="text-neu"][data-id="quran"]'); await p.waitForTimeout(900);
      if (await p.$('.dlg [data-action="dlg-ok"]')) { await p.click('.dlg [data-action="dlg-ok"]'); await p.waitForTimeout(900); }
      const knopf = await p.$('[data-action="quran-neu-laden"]');
      if (!knopf) fehler.push('Anlege-Seite: kein "Erneut versuchen"');
      else {
        const vorher = versuche;
        await knopf.click(); await p.waitForTimeout(1200);
        if (versuche !== vorher + 2) fehler.push('"Erneut versuchen": ' + (versuche - vorher) + ' statt 2 Versuche');
      }
      if (p.fehler.length) fehler.push('Seitenfehler: ' + p.fehler.join(' | '));
    }
    await ctx.close();
  } finally { await browser.close(); }
  if (!gegenprobe) {
    console.log(fehler.length ? 'ROT:\n  ' + fehler.join('\n  ') : 'OK');
    process.exitCode = fehler.length ? 1 : 0;
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
