/* Stufe 4 (WIEDERHOLEN.md § 2-5, § 7): Wiederholen ueber die echte
   Oberflaeche. Text mit 12 Zeilen: 1-9 fest (kreisTage 7 -> 2 je Tag),
   10 frisch (6 Tage sicher), 11 frisch (2), 12 neu.
   1. Text-Ansicht bietet "Wiederholen" vor "Neu lernen".
   2. Kreis zuerst: 9 feste Zeilen / 7 Tage = 2, aufgerundet auf einen ganzen
      Abschnitt -> Zeilen 1-5 verdeckt, keine Hinweiszeile, Denkpause;
      "Sicher" -> kreisPos Zeile 6, kreisTag heute, portion 0,
      festErgebnisse "11111", Protokoll t = 5 (im Speicher; geschrieben
      wird gebuendelt).
   3. Dann der frische Block 9-11 (12 ist neu und bleibt verborgen),
      Hinweiszeilen 7-8; "Hakt" -> Zeile 11 waehlen: 10 wird fest
      (2099-12-31), 11 frisch 0 morgen; Nachbar 9 unveraendert; t = 4.
   4. Rueckgaengig nimmt den letzten Block zurueck (10/11 wie vorher, t = 2),
      danach erneut "Sicher" fuer beide.
   5. Ende "Für heute wiederholt"; ein zweites Oeffnen hat keine Arbeit mehr.
   6. Eine gehakte feste Zeile im Kreis wird frisch, Rueckfaelle + 1
      (zweiter Text, ein Tag spaeter simuliert ueber kreisTag).
   Mehrgeraete-Test mit echtem SDK: Nachholliste (Emulator). */
const { start, vollerStore, tag } = require('./lib');
const { seiteMitApp, storeLesen, BETREIBER_UID } = require('./text_lib');
const U = 'users/' + BETREIBER_UID;
const WORT = i => 'Zeile ' + ['eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf'][i] + ' ist hier';

(async () => {
  const fehler = [];
  const pruefe = (ok, t) => { if (!ok) fehler.push(t); };
  const store = vollerStore();
  store['users/u1'].texteEinwilligung = tag(-30);
  store['users/u1'].verlauf = {};
  const ids = [...Array(12).keys()].map(i => 'w' + i);
  ids.forEach((id, i) => {
    const z = i < 9 ? { stufe: 7, nextReview: '2099-12-31', ersteBewertung: tag(-40), maxStufe: 7 }
      : i === 9 ? { stufe: 6, nextReview: tag(0), ersteBewertung: tag(-10), maxStufe: 6 }
      : i === 10 ? { stufe: 2, nextReview: tag(0), ersteBewertung: tag(-5), maxStufe: 2 }
      : { stufe: 0, nextReview: tag(0), ersteBewertung: null, maxStufe: 0 };
    store['users/u1/karten/' + id] = { wort: WORT(i), uebersetzung: '', extra: null, rueckfaelle: 1, quelleId: null, order: i, bereichId: 'b1', textId: 'tw', ...z };
  });
  store['users/u1/bereiche/b1'].sets.tw = { name: 'Wiederholtext', order: 9, art: 'text', quelleId: null, cardIds: ids,
    nummerAb: 1, quelle: null, kreisTage: 7, kreisPos: null, kreisTag: null, festErgebnisse: '', portion: 0 };
  const browser = await start();
  try {
    const { ctx, p } = await seiteMitApp(browser, store, { uid: BETREIBER_UID, zusatz: 'verlaufT: () => (verlauf[todayStr()] || {}).t || 0, frageErzwingen: () => { const w = ui.textWdh; const a = w.aufgaben[w.nr]; const t = findText(currentBereich(), w.textId); const k = kontrollWoerter(textZeilenVon(currentBereich(), t), currentBereich().zeilen.find(x => x.id === a.zeigen[0]), todayStr()); w.frage = { richtig: k.richtig, woerter: k.woerter, gewaehlt: null }; render(); }, erstesWort: () => { const w = ui.textWdh; const a = w.aufgaben[w.nr]; const z = currentBereich().zeilen.find(x => x.id === a.zeigen[0]); return zeileWoerter(z.wort)[0]; },' });
    await p.evaluate(() => { window.verlaufHeuteT = window.__PRUEF.verlaufT; });
    const klick = async (sel, w = 300) => { await p.click(sel); await p.waitForTimeout(w); };
    const buehne = () => p.$eval('.text-buehne', e => e.innerText);
    const doc = async id => (await storeLesen(p))[U + '/karten/' + id];
    const set = async () => (await storeLesen(p))[U + '/bereiche/b1'].sets.tw;
    const t = async () => p.evaluate(() => (verlaufHeuteT()));
    const frageBeantworten = async () => {
      if (!(await p.$('.text-frage'))) return;
      const richtig = await p.evaluate(() => { const a = document.querySelectorAll('.text-frage__wort'); return [...a].map(x => x.dataset.id); });
      const erstes = await p.evaluate(() => window.__PRUEF.erstesWort());
      pruefe(richtig.includes(erstes), 'Kontrollfrage ohne richtiges Wort');
      await klick('[data-action="wdh-frage"][data-id="' + erstes + '"]');
    };
    const aufdecken = async () => {
      await frageBeantworten();
      await p.waitForFunction(() => { const k = document.querySelector('[data-action="text-aufdecken"]'); return k && !k.classList.contains('gedimmt'); }, null, { timeout: 8000 });
      await klick('[data-action="text-aufdecken"]', 500);
    };

    await klick('[data-action="tab-verwalten"]', 500);
    await klick('[data-action="text-oeffnen"]', 600);
    // 1.
    const knoepfe = await p.$$eval('.text-seite button[data-action^="text-"]', e => e.map(x => x.dataset.action));
    pruefe(knoepfe.indexOf('text-wiederholen') !== -1 && knoepfe.indexOf('text-wiederholen') < knoepfe.indexOf('text-lernen'), '1: Reihenfolge ' + knoepfe.join(','));
    await klick('[data-action="text-wiederholen"]', 500);
    await p.evaluate(() => window.__PRUEF.frageErzwingen());
    // 2. Kreis
    let b = await buehne();
    pruefe(/Wie geht es weiter/.test(b) && !b.includes(WORT(0)) && !b.includes(WORT(2)), '2: Kreis-Aufgabe falsch: ' + b.replace(/\s+/g, ' ').slice(0, 100));
    await aufdecken();
    b = await buehne();
    pruefe(b.includes(WORT(0)) && b.includes(WORT(4)) && !b.includes(WORT(5)), '2: aufgedeckt falsch');
    await klick('[data-action="wdh-antwort"][data-id="sicher"]', 700);
    let s = await set();
    pruefe(s.kreisPos === 'w5' && s.kreisTag === tag(0) && s.portion === 0 && s.festErgebnisse === '11111', '2: Kreis-Felder ' + JSON.stringify([s.kreisPos, s.kreisTag, s.portion, s.festErgebnisse]));
    pruefe(await t() === 5, '2: t = ' + await t());
    // 3. frischer Block
    b = await buehne();
    pruefe(/Nachbarzeilen/.test(b) && b.includes(WORT(6)) && b.includes(WORT(7)) && !b.includes(WORT(11)), '3: Block/Hinweis falsch: ' + b.replace(/\s+/g, ' ').slice(0, 140));
    await aufdecken();
    b = await buehne();
    pruefe(b.includes(WORT(8)) && b.includes(WORT(9)) && b.includes(WORT(10)) && !b.includes(WORT(11)), '3: aufgedeckt falsch (12 sichtbar?)');
    await klick('[data-action="wdh-antwort"][data-id="hakt"]', 300);
    pruefe(!(await p.$('[data-action="wdh-zeile-hakt"][data-id="w8"]')), '3: Nachbar 9 waehlbar');
    await klick('[data-action="wdh-zeile-hakt"][data-id="w10"]');
    await klick('[data-action="wdh-hakt-weiter"]', 700);
    let z9 = await doc('w9'), z10 = await doc('w10'), z8 = await doc('w8');
    pruefe(z9.stufe === 7 && z9.nextReview === '2099-12-31', '3: Zeile 10 nicht fest: ' + JSON.stringify([z9.stufe, z9.nextReview]));
    pruefe(z10.stufe === 0 && z10.nextReview === tag(1) && z10.rueckfaelle === 1, '3: Zeile 11 falsch: ' + JSON.stringify([z10.stufe, z10.nextReview, z10.rueckfaelle]));
    pruefe(z8.stufe === 7 && z8.nextReview === '2099-12-31', '3: Nachbar 9 veraendert');
    pruefe(await t() === 7, '3: t = ' + await t());
    // 4. Rueckgaengig
    pruefe(/wiederholt/.test(await buehne()), '5: kein Ende');
    await klick('[data-action="wdh-rueckgaengig"]', 700);
    z9 = await doc('w9'); z10 = await doc('w10');
    pruefe(z9.stufe === 6 && z9.nextReview === tag(0) && z10.stufe === 2 && z10.nextReview === tag(0), '4: Rueckgaengig: ' + JSON.stringify([z9.stufe, z10.stufe]));
    pruefe(await t() === 5, '4: t nach Rueckgaengig = ' + await t());
    await aufdecken();
    await klick('[data-action="wdh-antwort"][data-id="sicher"]', 700);
    z10 = await doc('w10');
    pruefe(z10.stufe === 3 && z10.nextReview === tag(1), '4: Zeile 11 nach Sicher: ' + JSON.stringify([z10.stufe, z10.nextReview]));
    // 5. Ende, keine Arbeit mehr
    await klick('[data-action="wdh-zu"]', 500);
    pruefe(!(await p.$('[data-action="text-wiederholen"]')), '5: nach dem Wiederholen noch Arbeit angeboten');
    pruefe(p.fehler.length === 0, 'Seitenfehler: ' + p.fehler.join(' | '));
    await ctx.close();

    // 6. gehakte feste Zeile im Kreis
    const st2 = vollerStore();
    st2['users/u1'].texteEinwilligung = tag(-30);
    ['a', 'b', 'c'].forEach((x, i) => { st2['users/u1/karten/f' + i] = { wort: WORT(i), uebersetzung: '', extra: null, stufe: 7, nextReview: '2099-12-31', ersteBewertung: tag(-40), maxStufe: 7, rueckfaelle: 0, quelleId: null, order: i, bereichId: 'b1', textId: 'tf' }; });
    st2['users/u1/bereiche/b1'].sets.tf = { name: 'Fest', order: 9, art: 'text', quelleId: null, cardIds: ['f0', 'f1', 'f2'], nummerAb: 1, kreisTage: 3, kreisPos: 'f1', kreisTag: tag(-1), portion: 0, festErgebnisse: '' };
    const { ctx: c2, p: p2 } = await seiteMitApp(browser, st2, { uid: BETREIBER_UID, zusatz: 'erstesWort: () => { const w = ui.textWdh; const a = w.aufgaben[w.nr]; const z = currentBereich().zeilen.find(x => x.id === a.zeigen[0]); return zeileWoerter(z.wort)[0]; },' });
    await p2.click('[data-action="tab-verwalten"]'); await p2.waitForTimeout(500);
    await p2.click('[data-action="text-oeffnen"]'); await p2.waitForTimeout(500);
    await p2.click('[data-action="text-wiederholen"]'); await p2.waitForTimeout(500);
    if (await p2.$('.text-frage')) { const w = await p2.evaluate(() => window.__PRUEF.erstesWort()); await p2.click('[data-action="wdh-frage"][data-id="' + w + '"]'); await p2.waitForTimeout(300); }
    await p2.waitForFunction(() => { const k = document.querySelector('[data-action="text-aufdecken"]'); return k && !k.classList.contains('gedimmt'); }, null, { timeout: 8000 });
    await p2.click('[data-action="text-aufdecken"]'); await p2.waitForTimeout(500);
    await p2.click('[data-action="wdh-antwort"][data-id="hakt"]'); await p2.waitForTimeout(400);
    await p2.click('[data-action="wdh-zeile-hakt"][data-id="f1"]'); await p2.waitForTimeout(300);
    await p2.click('[data-action="wdh-hakt-weiter"]'); await p2.waitForTimeout(700);
    const f1 = (await storeLesen(p2))[U + '/karten/f1'];
    const s2 = (await storeLesen(p2))[U + '/bereiche/b1'].sets.tf;
    pruefe(f1.stufe === 0 && f1.nextReview === tag(1) && f1.rueckfaelle === 1, '6: feste gehakte Zeile: ' + JSON.stringify([f1.stufe, f1.nextReview, f1.rueckfaelle]));
    pruefe(s2.festErgebnisse === '01' && s2.kreisPos === 'f0', '6: Kreis nach Hakt: ' + JSON.stringify([s2.festErgebnisse, s2.kreisPos]));
    await c2.close();
  } finally { await browser.close(); }
  console.log(fehler.length ? 'ROT:\n  ' + fehler.join('\n  ') : 'OK: Reihenfolge, Kreis, Block mit Nachbarn, Hakt, fest, Rueckgaengig, Ende, feste Zeile gehakt');
  process.exitCode = fehler.length ? 1 : 0;
})().catch(e => { console.error(e); process.exitCode = 1; });
