/* Stufe 4 (texte-lernen/WIEDERHOLEN.md § 3, § 9): der Kreis.
   1. 30 feste Zeilen, kreisTage 7 -> 5 Zeilen je Tag, nach 6 Tagen einmal
      durch, jede Zeile genau einmal, Reihenfolge des Textes.
   2. Verpasster Tag: Plan zweimal gelesen ohne Bewertung -> dieselben
      Zeilen, kreisPos unveraendert.
   3. Nachstellen: 100 % sicher nach der Runde -> 9 Tage; 80 % -> 5; Grenzen
      3/30; unter 20 Antworten unveraendert.
   4. Gehakt im Kreis: Zeile wird frisch (0), '0' im Ergebnis; kreisPos
      springt ueber sie hinweg.
   5. Gespeichert: kreisPos/kreisTage/festErgebnisse im Store.
   Gegenprobe: ohne Weiterruecken von kreisPos rot. */
const { start } = require('./lib');
const { seiteMitApp, storeLesen, BETREIBER_UID, zeilenStore, FEST } = require('./text_lib');
const zusatz = require('./kreis_sim');

async function lauf(browser, ersetze) {
  const fehler = [];
  const pruefe = (ok, text) => { if (!ok) fehler.push(text); };
  const { ctx, p } = await seiteMitApp(browser, zeilenStore(30, () => FEST), { uid: BETREIBER_UID, zusatz, ersetze });
  const ev = (f, ...a) => p.evaluate(([f, a]) => window.__PRUEF[f](...a), [f, a]);
  try {
    const gesehen = [];
    for (let d = 0; d < 6; d++) {
      const vorher = (await ev('plan', 't1')).map(x => x.ids).flat();
      const nochmal = (await ev('plan', 't1')).map(x => x.ids).flat();
      if (d === 1) pruefe(vorher.join() === nochmal.join(), 'Plan ohne Bewertung aendert sich');
      const r = await ev('tagSim', 't1', [], true);
      const ids = r.ids.flat();
      pruefe(ids.length === 5, 'Tag ' + (d + 1) + ': ' + ids.length + ' statt 5 Zeilen');
      gesehen.push(...ids);
      if (d === 5) {
        pruefe(r.kreisPos === 'z0', 'nach 6 Tagen kreisPos ' + r.kreisPos + ' statt z0');
        pruefe(r.kreisTage === 9, 'Nachstellen bei 100 %: ' + r.kreisTage + ' statt 9');
      }
    }
    pruefe(gesehen.join() === Array.from({ length: 30 }, (_, i) => 'z' + i).join(), 'Kreis nicht genau einmal in Reihenfolge: ' + gesehen.join());
    // 3. Nachstellen
    const e = n1 => '1'.repeat(n1) + '0'.repeat(20 - n1);
    pruefe(await ev('nachstellen', 7, e(16)) === 5, '80 % -> ' + await ev('nachstellen', 7, e(16)));
    pruefe(await ev('nachstellen', 7, e(18)) === 7, '90 % aendert');
    pruefe(await ev('nachstellen', 3, e(10)) === 3, 'Untergrenze 3');
    pruefe(await ev('nachstellen', 30, e(20)) === 30, 'Obergrenze 30');
    pruefe(await ev('nachstellen', 7, '0'.repeat(19)) === 7, 'unter 20 Antworten nachgestellt');
    // 4. Gehakt im Kreis (kreisTage jetzt 9 -> ceil(30/9) = 4 Zeilen)
    const r = await ev('tagSim', 't1', ['z1'], true);
    const z1 = await ev('zeile', 'z1');
    pruefe(r.ids.flat().includes('z1') && z1.stufe === 0 && z1.nextReview > '2026', 'gehakte Kreis-Zeile nicht frisch: ' + JSON.stringify(z1));
    // Portion ceil(30/9) = 4: genau z0-z3 (nicht auf 5 aufgerundet, Logbuch 30.09.)
    pruefe(r.ids.flat().join() === 'z0,z1,z2,z3' && r.erg.slice(-4) === '1011', 'Stueck/Ergebnisse: ' + r.ids.flat().join() + ' ' + r.erg.slice(-4));
    const naechster = await ev('tagSim', 't1', [], true);
    pruefe(!naechster.ids.flat().includes('z1'), 'frisch gewordene Zeile weiter im Kreis');
    // 5. Store
    await p.waitForTimeout(1500);
    const s = await storeLesen(p);
    const set = s['users/' + BETREIBER_UID + '/bereiche/b1'].sets.t1;
    pruefe(set.kreisPos === naechster.kreisPos && set.kreisTage === 9 && set.festErgebnisse === naechster.erg, 'Store: ' + JSON.stringify([set.kreisPos, set.kreisTage, set.festErgebnisse.length]));
    pruefe(p.fehler.length === 0, 'Seitenfehler: ' + p.fehler.join('; '));
  } catch (e) { fehler.push('Abbruch: ' + e.message.split('\n')[0]); } finally { await ctx.close(); }
  return fehler;
}

(async () => {
  const browser = await start();
  try {
    const f = await lauf(browser);
    const g = await lauf(browser, ['t.kreisPos = naechste ? naechste.id : null;', '']);
    console.log('Gegenprobe ohne Weiterruecken: ' + g.length + ' Befunde (rot erwartet)');
    if (!g.length) f.push('Gegenprobe blieb gruen');
    if (f.length) { console.log('FEHLER:\n' + f.join('\n')); process.exitCode = 1; }
    else console.log('OK t_text_kreis: 6 Tage x 5 Zeilen, Nachstellen, Grenzen, gehakt, Store');
  } finally { await browser.close(); }
})();
