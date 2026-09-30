/* Stufe 4 (texte-lernen/WIEDERHOLEN.md § 2, § 5, § 7, § 9) ueber die
   echte Oberflaeche. 12 Zeilen: z0 frisch(3) faellig, z3 frisch(6)
   faellig, z10 frisch morgen, z11 neu, sonst fest; Kreis ab z4, 7 Tage ->
   Portion 2 (z4, z5).
   1. Reihenfolge: Kreis-Stueck, dann frische Bloecke (z0-z1, z2-z4).
   2. Kreis: z5 gehakt -> frisch(0) morgen, z4 bleibt fest, Ergebnis "10".
   3. frisch gehakt (z0, allein bewertet -> direkt) -> 0, morgen.
   4. frisch(6) sicher -> fest (7, 2099-12-31).
   5. Protokoll t = 4; Rueckgaengig: z3 wieder 6/heute, t = 3; nochmal.
   6. Danach ist heute nichts mehr faellig (einmal pro Tag).
   7. Verpasster Tag: Oeffnen schreibt nichts.
   8. Kontrollfrage: falsches Wort -> Zeile zaehlt als gehakt trotz
      "Fliessend".
   9. Tagesmenge > 20 min: Hinweis, "Neu lernen" nur noch zweitrangig.
   Gegenprobe: Schwelle fest bei k+1 >= 8 statt 7 -> rot. */
const { start, tag } = require('./lib');
const { seiteMitApp, storeLesen, BETREIBER_UID, zeilenStore, FEST } = require('./text_lib');
const zusatz = require('./kreis_sim') + ` kontrolleGleich: () => { kontrollZaehler = KONTROLLE_JEDER - 1; }, verlaufHeute: () => (verlauf[todayStr()] || {}).t || 0,`;
const U = 'users/' + BETREIBER_UID;
const fr = (k, d) => ({ stufe: k, next: tag(d), erste: tag(-10) });
const NEU = { stufe: 0, next: tag(0), erste: null };
const zustand = i => i === 0 ? fr(3, 0) : i === 3 ? fr(6, 0) : i === 10 ? fr(2, 1) : i === 11 ? NEU : FEST;

async function oeffnen(p) {
  await p.click('[data-action="tab-verwalten"]'); await p.waitForTimeout(400);
  await p.click('[data-action="text-oeffnen"][data-id="t1"]'); await p.waitForTimeout(400);
}
async function aufdecken(p) {
  await p.waitForSelector('[data-action="text-aufdecken"]:not(.gedimmt)', { timeout: 7000 });
  await p.click('[data-action="text-aufdecken"]'); await p.waitForTimeout(450);
}
async function lauf(browser, ersetze) {
  const fehler = [];
  const pruefe = (ok, text) => { if (!ok) fehler.push(text); };
  let { ctx, p } = await seiteMitApp(browser, zeilenStore(12, zustand, { set: { kreisPos: 'z4' } }), { uid: BETREIBER_UID, zusatz, ersetze });
  const karte = async id => (await storeLesen(p))[U + '/karten/' + id];
  try {
    const plan = await p.evaluate(() => window.__PRUEF.plan('t1'));
    pruefe(JSON.stringify(plan.map(x => [x.art, x.ids.join()])) === JSON.stringify([['kreis', 'z4,z5'], ['frisch', 'z0,z1'], ['frisch', 'z2,z3,z4']]), 'Plan: ' + JSON.stringify(plan.map(x => [x.art, x.ids.join()])));
    await oeffnen(p);
    await p.click('[data-action="text-wdh-start"]'); await p.waitForTimeout(400);
    // 2. Kreis, z5 gehakt
    await aufdecken(p);
    await p.click('[data-action="text-wdh"][data-id="hakt"]'); await p.waitForTimeout(300);
    await p.click('[data-action="text-zeile-hakt"][data-id="z5"]'); await p.waitForTimeout(300);
    await p.click('[data-action="text-wdh-hakt-weiter"]'); await p.waitForTimeout(400);
    // 3. z0 gehakt (allein -> direkt bewertet)
    await aufdecken(p);
    await p.click('[data-action="text-wdh"][data-id="hakt"]'); await p.waitForTimeout(400);
    // 4. z3 sicher -> fest
    await aufdecken(p);
    await p.click('[data-action="text-wdh"][data-id="fliessend"]'); await p.waitForTimeout(1200);
    let z = { z0: await karte('z0'), z3: await karte('z3'), z4: await karte('z4'), z5: await karte('z5') };
    pruefe(z.z5.stufe === 0 && z.z5.nextReview === tag(1), 'z5 (Kreis gehakt): ' + [z.z5.stufe, z.z5.nextReview]);
    pruefe(z.z4.stufe === 7 && z.z4.nextReview === '2099-12-31', 'z4 (Kreis sicher) nicht fest');
    pruefe(z.z0.stufe === 0 && z.z0.nextReview === tag(1), 'z0 (frisch gehakt): ' + [z.z0.stufe, z.z0.nextReview]);
    pruefe(z.z3.stufe === 7 && z.z3.nextReview === '2099-12-31', 'z3 (frisch 6 sicher) nicht fest: ' + [z.z3.stufe, z.z3.nextReview]);
    const set = (await storeLesen(p))[U + '/bereiche/b1'].sets.t1;
    pruefe(set.festErgebnisse === '10' && set.kreisTag === tag(0) && set.kreisPos === 'z6', 'Kreisfelder: ' + JSON.stringify([set.festErgebnisse, set.kreisTag, set.kreisPos]));
    pruefe(await p.evaluate(() => window.__PRUEF.verlaufHeute()) === 4, 'Protokoll t: ' + await p.evaluate(() => window.__PRUEF.verlaufHeute()));
    pruefe((await p.textContent('h1')).includes('wiederholt'), 'kein Fertig-Bildschirm');
    // 5. Rueckgaengig
    await p.click('[data-action="text-wdh-rueckgaengig"]'); await p.waitForTimeout(1200);
    z.z3 = await karte('z3');
    pruefe(z.z3.stufe === 6 && z.z3.nextReview === tag(0), 'Rueckgaengig z3: ' + [z.z3.stufe, z.z3.nextReview]);
    pruefe(await p.evaluate(() => window.__PRUEF.verlaufHeute()) === 3, 'Rueckgaengig Protokoll');
    await aufdecken(p);
    await p.click('[data-action="text-wdh"][data-id="fliessend"]'); await p.waitForTimeout(800);
    await p.click('[data-action="text-lernen-zu"]'); await p.waitForTimeout(400);
    // 6. einmal pro Tag
    pruefe((await p.evaluate(() => window.__PRUEF.plan('t1'))).length === 0 && !(await p.$('[data-action="text-wdh-start"]')), 'heute noch etwas faellig');
    pruefe(p.fehler.length === 0, 'Seitenfehler: ' + p.fehler.join('; '));
    await ctx.close();
    // 7. Verpasster Tag
    ({ ctx, p } = await seiteMitApp(browser, zeilenStore(12, i => i === 0 ? fr(2, -5) : zustand(i), { set: { kreisPos: 'z4', kreisTag: tag(-5) } }), { uid: BETREIBER_UID, zusatz, ersetze }));
    const vor = JSON.stringify(await storeLesen(p));
    await oeffnen(p); await p.waitForTimeout(1500);
    pruefe(JSON.stringify(await storeLesen(p)) === vor, 'Oeffnen nach verpassten Tagen schreibt');
    await ctx.close();
    // 8. Kontrollfrage
    ({ ctx, p } = await seiteMitApp(browser, zeilenStore(12, () => FEST, { wort: i => ['eins', 'zwei', 'drei', 'vier'][i % 4] + ' Satz ' + i, set: { kreisPos: 'z0' } }), { uid: BETREIBER_UID, zusatz, ersetze }));
    await p.evaluate(() => window.__PRUEF.kontrolleGleich());
    await oeffnen(p);
    await p.click('[data-action="text-wdh-start"]'); await p.waitForTimeout(400);
    const wahl = await p.$$eval('[data-action="text-kontrolle"]', es => es.map(e => e.dataset.id));
    pruefe(wahl.length === 3 && wahl.includes('eins'), 'Kontrollfrage: ' + wahl.join());
    await p.click('[data-action="text-kontrolle"]:not([data-id="eins"])'); await p.waitForTimeout(400);
    await aufdecken(p);
    await p.click('[data-action="text-wdh"][data-id="fliessend"]'); await p.waitForTimeout(1200);
    const k0 = await karte('z0'), k1 = await karte('z1');
    pruefe(k0.stufe === 0 && k1.stufe === 7, 'Kontrollfrage falsch zaehlt nicht als gehakt: ' + [k0.stufe, k1.stufe]);
    await ctx.close();
    // 9. Tagesmenge
    ({ ctx, p } = await seiteMitApp(browser, zeilenStore(151, i => i < 150 ? fr(1, 0) : NEU), { uid: BETREIBER_UID, zusatz, ersetze }));
    await oeffnen(p);
    pruefe((await p.textContent('.text-seite')).includes('Heute lieber das Gelernte halten'), 'kein Hinweis bei > 20 min');
    pruefe(await p.$eval('[data-action="text-lernen"]', e => e.classList.contains('secondary')), 'Neu lernen nicht zweitrangig');
  } catch (e) { fehler.push('Abbruch: ' + e.message.split('\n')[0]); } finally { await ctx.close(); }
  return fehler;
}

(async () => {
  const browser = await start();
  try {
    const f = await lauf(browser);
    const g = await lauf(browser, ['else if (z.stufe + 1 >= TEXT_FEST_STUFE)', 'else if (z.stufe + 1 >= TEXT_FEST_STUFE + 1)']);
    console.log('Gegenprobe Schwelle 8: ' + g.length + ' Befunde (rot erwartet)');
    if (!g.length) f.push('Gegenprobe blieb gruen');
    if (f.length) { console.log('FEHLER:\n' + f.join('\n')); process.exitCode = 1; }
    else console.log('OK t_text_zustaende: Tabelle § 2, Rueckgaengig, einmal pro Tag, verpasster Tag, Kontrollfrage, Tagesmenge');
  } finally { await browser.close(); }
})();
