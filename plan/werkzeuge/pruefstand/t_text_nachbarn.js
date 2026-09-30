/* Stufe 4 (texte-lernen/WIEDERHOLEN.md § 4, § 9): gehakte Zeile im
   Zusammenhang. 30 Zeilen fest, Zeile 12 (z11) frisch und faellig, Kreis
   heute erledigt (kreisTag = heute).
   1. Block 11-13 (z10-z12), bewertet nur z11.
   2. Oberflaeche: 9-10 grau darueber, 14 nie im DOM; nach "Fliessend"
      aendert sich nur z11 (Stufe +1), z10/z12 unveraendert.
   3. Zeilen 12 und 14 frisch -> ein Block 11-15.
   4. Nachbar, der noch neu ist, gehoert nicht in den Block.
   Gegenprobe: ohne Zusammenlegen (Abstand <= 0) zwei Bloecke -> rot. */
const { start, tag } = require('./lib');
const { seiteMitApp, storeLesen, BETREIBER_UID, zeilenStore, FEST } = require('./text_lib');
const zusatz = require('./kreis_sim');
const U = 'users/' + BETREIBER_UID;
const frisch = { stufe: 2, next: tag(0), erste: tag(-3) };
const neu = { stufe: 0, next: tag(0), erste: null };

async function seite(browser, zustand, ersetze) {
  return seiteMitApp(browser, zeilenStore(30, zustand, { set: { kreisTag: tag(0), kreisPos: 'z0' } }), { uid: BETREIBER_UID, zusatz, ersetze });
}
async function lauf(browser, ersetze) {
  const fehler = [];
  const pruefe = (ok, text) => { if (!ok) fehler.push(text); };
  let { ctx, p } = await seite(browser, i => i === 11 ? frisch : FEST, ersetze);
  const ev = (f, ...a) => p.evaluate(([f, a]) => window.__PRUEF[f](...a), [f, a]);
  try {
    let plan = await ev('plan', 't1');
    pruefe(plan.length === 1 && plan[0].ids.join() === 'z10,z11,z12' && plan[0].bewerten.join() === 'z11', 'Block 12: ' + JSON.stringify(plan));
    await p.click('[data-action="tab-verwalten"]'); await p.waitForTimeout(400);
    await p.click('[data-action="text-oeffnen"][data-id="t1"]'); await p.waitForTimeout(400);
    await p.click('[data-action="text-wdh-start"]'); await p.waitForTimeout(400);
    const text = await p.$$eval('.text-buehne__zeile', es => es.map(e => [e.className, e.textContent]));
    const hinweis = text.filter(x => x[0].includes('hinweis')).map(x => x[1]);
    pruefe(hinweis.join('|') === 'Satz 9 alpha beta|Satz 10 alpha beta', 'Hinweis: ' + hinweis.join('|'));
    pruefe(text.filter(x => x[0].includes('verdeckt')).length === 3, 'nicht 3 verdeckte Zeilen');
    await p.waitForSelector('[data-action="text-aufdecken"]:not(.gedimmt)', { timeout: 7000 });
    await p.click('[data-action="text-aufdecken"]'); await p.waitForTimeout(500);
    pruefe(!(await p.textContent('.text-buehne')).includes('Satz 14 '), 'Zeile 14 sichtbar');
    await p.click('[data-action="text-wdh"][data-id="fliessend"]'); await p.waitForTimeout(1500);
    const s = await storeLesen(p);
    pruefe(s[U + '/karten/z11'].stufe === 3 && s[U + '/karten/z11'].nextReview === tag(1), 'z11 nicht +1: ' + s[U + '/karten/z11'].stufe);
    pruefe(s[U + '/karten/z10'].stufe === 7 && s[U + '/karten/z12'].stufe === 7 && s[U + '/karten/z12'].nextReview === '2099-12-31', 'Nachbarn veraendert');
    pruefe(await p.$('h1') && (await p.textContent('h1')).includes('wiederholt'), 'kein Fertig-Bildschirm');
    pruefe(p.fehler.length === 0, 'Seitenfehler: ' + p.fehler.join('; '));
    await ctx.close();
    ({ ctx, p } = await seite(browser, i => i === 11 || i === 13 ? frisch : FEST, ersetze));
    plan = await p.evaluate(() => window.__PRUEF.plan('t1'));
    pruefe(plan.length === 1 && plan[0].ids.join() === 'z10,z11,z12,z13,z14' && plan[0].bewerten.join() === 'z11,z13', '12+14: ' + JSON.stringify(plan.map(x => x.ids)));
    await ctx.close();
    ({ ctx, p } = await seite(browser, i => i < 5 ? frisch : neu, ersetze));
    plan = await p.evaluate(() => window.__PRUEF.plan('t1'));
    pruefe(plan.length === 1 && plan[0].ids.join() === 'z0,z1,z2,z3,z4', 'neuer Nachbar im Block: ' + JSON.stringify(plan.map(x => x.ids)));
  } catch (e) { fehler.push('Abbruch: ' + e.message.split('\n')[0]); } finally { await ctx.close(); }
  return fehler;
}

(async () => {
  const browser = await start();
  try {
    const f = await lauf(browser);
    const g = await lauf(browser, ['i - g[g.length - 1] <= 2', 'i - g[g.length - 1] <= 0']);
    console.log('Gegenprobe ohne Zusammenlegen: ' + g.length + ' Befunde (rot erwartet)');
    if (!g.length) f.push('Gegenprobe blieb gruen');
    if (f.length) { console.log('FEHLER:\n' + f.join('\n')); process.exitCode = 1; }
    else console.log('OK t_text_nachbarn: Block 11-13, Hinweis 9-10, 14 unsichtbar, nur 12 bewertet, 12+14 ein Block');
  } finally { await browser.close(); }
})();
