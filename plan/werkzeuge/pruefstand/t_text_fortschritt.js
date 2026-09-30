/* Stufe 6 (texte-lernen/KONZEPT.md § 8.1 Punkt 3, § 13; WIEDERHOLEN § 8).
   Testtext aus text_lib: 4 fest, 4 frisch (faellig), 2 neu.
   1. Lernen-Tab zeigt den Block "Texte": Balken aus den gespeicherten
      Zustaenden (fest 40 %, frisch 40 %), "Heute: etwa N Minuten".
   2. Tipp startet das Wiederholen im Lernen-Tab; durchlaufen, "Fertig" ->
      wieder Lernen-Tab, Status "Wiederholt – Neues moeglich".
   3. Kartenring (heuteAnteil) zaehlt keine Textantworten; der Tag zaehlt
      trotzdem fuer die Serie (tagGelernt), w/n bleiben 0.
   4. Einstellungen: Probelauf-Zeilen (Faktor 0,8; Kreis 9 Tage).
   5. Desktop 1024: der Block steht rechts (Spalte 2).
   6. Konto ohne Probelauf: kein Block, keine Probelauf-Zeilen.
   Gegenprobe: ohne lernenTexte im Lernen-Tab rot. */
const { start } = require('./lib');
const { seiteMitApp, BETREIBER_UID, textStore } = require('./text_lib');
const zusatz = `ring: () => heuteAnteil(currentCards(), currentBereich().id).getan,
  heute: () => JSON.parse(JSON.stringify(verlauf[todayStr()] || {})), gelernt: () => tagGelernt(verlauf[todayStr()]),`;

async function lauf(browser, { uid = BETREIBER_UID, ersetze, viewport } = {}) {
  const fehler = [];
  const pruefe = (ok, text) => { if (!ok) fehler.push(text); };
  const { ctx, p } = await seiteMitApp(browser, textStore(), { uid, zusatz, ersetze, viewport });
  const ev = f => p.evaluate(f => window.__PRUEF[f](), f);
  try {
    if (uid !== BETREIBER_UID) {
      pruefe(!(await p.$('.texte-lernen')), 'ohne Probelauf: Texte-Block sichtbar');
      await p.click('[data-action="einstellungen"]').catch(() => {}); await p.waitForTimeout(400);
      pruefe(!(await p.textContent('body')).includes('Probelauf (nur du)'), 'ohne Probelauf: Probelauf-Zeilen');
      return fehler;
    }
    if (viewport) {
      pruefe(await p.$eval('.texte-lernen', e => getComputedStyle(e).gridColumnStart) === '2', 'Desktop: Block nicht in Spalte 2');
      return fehler;
    }
    const balken = await p.$eval('.texte-lernen__balken', e => [e.getAttribute('aria-label'), e.children[0].style.width, e.children[1].style.width]);
    pruefe(balken[0] === '2 neu, 4 frisch, 4 fest' && parseFloat(balken[1]) === 40 && parseFloat(balken[2]) === 40, 'Balken: ' + balken.join(' '));
    pruefe(/Heute: etwa \d+ Minute/.test(await p.textContent('.texte-lernen')), 'Status ohne Minuten: ' + await p.textContent('.texte-lernen'));
    const ringVor = await ev('ring');
    pruefe(!(await ev('gelernt')), 'Tag zaehlt schon vorher');
    await p.click('[data-action="text-heute"]'); await p.waitForTimeout(400);
    for (let i = 0; i < 6 && !(await p.$('[data-action="text-lernen-zu"].lg')); i++) {
      await p.waitForSelector('[data-action="text-aufdecken"]:not(.gedimmt)', { timeout: 8000 });
      await p.click('[data-action="text-aufdecken"]'); await p.waitForTimeout(450);
      await p.click('[data-action="text-wdh"][data-id="fliessend"]'); await p.waitForTimeout(500);
    }
    await p.click('[data-action="text-lernen-zu"].lg'); await p.waitForTimeout(500);
    pruefe(await p.$('.texte-lernen') !== null, 'nach "Fertig" nicht im Lernen-Tab');
    pruefe((await p.textContent('.texte-lernen')).includes('Wiederholt – Neues möglich'), 'Status danach: ' + await p.textContent('.texte-lernen'));
    const h = await ev('heute');
    pruefe(await ev('ring') === ringVor && !h.w && !h.n && h.t > 0, 'Ring/Protokoll: ' + JSON.stringify([ringVor, await ev('ring'), h]));
    pruefe(await ev('gelernt'), 'Tag zaehlt nicht fuer die Serie');
    await p.click('[data-action="einstellungen"]'); await p.waitForTimeout(500);
    const txt = await p.textContent('body');
    pruefe(txt.includes('Probelauf (nur du)') && txt.includes('Faktor 0,8') && txt.includes('Kreis 9\u00a0Tage'), 'Probelauf-Zeilen fehlen');
    pruefe(p.fehler.length === 0, 'Seitenfehler: ' + p.fehler.join('; '));
  } catch (e) { fehler.push('Abbruch: ' + e.message.split('\n')[0]); } finally { await ctx.close(); }
  return fehler;
}

(async () => {
  const browser = await start();
  try {
    const f = [...await lauf(browser), ...(await lauf(browser, { viewport: { width: 1024, height: 768 } })).map(x => '1024: ' + x),
      ...(await lauf(browser, { uid: 'u1' })).map(x => 'u1: ' + x)];
    const g = await lauf(browser, { ersetze: ['  html += lernenTexte(b);\n  html += lernenSerie();', '  html += lernenSerie();'] });
    console.log('Gegenprobe ohne Block: ' + g.length + ' Befunde (rot erwartet)');
    if (!g.length) f.push('Gegenprobe blieb gruen');
    if (f.length) { console.log('FEHLER:\n' + f.join('\n')); process.exitCode = 1; }
    else console.log('OK t_text_fortschritt: Balken, Minuten, Wiederholen aus dem Lernen-Tab, Ring unberuehrt, Serie, Probelauf, Desktop, ohne Schalter nichts');
  } finally { await browser.close(); }
})();
