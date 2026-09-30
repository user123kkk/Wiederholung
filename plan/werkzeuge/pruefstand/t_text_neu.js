/* Stufe 3 (texte-lernen/KONZEPT.md § 5, § 13): Neu lernen ueber die echte
   Oberflaeche. Neutraler Testtext, 5 neue Zeilen.
   1. lesen -> Anfangsbuchstaben -> ohne Hilfe; "Noch nicht" geht eine Stufe
      zurueck; Denkpause: "Aufdecken" gedimmt, frueher Tipp wirkt nicht;
      Bewerten direkt nach dem Aufdecken wirkt nicht (BEWERTEN_SPERRE_MS).
   2. Am Stueck -> "Fliessend": Zeile frisch (Stufe 0, heute gelernt,
      morgen faellig), Tagesprotokoll t = 1.
   3. Rueckgaengig: Zeile wieder neu, t = 0.
   4. Zweite Zeile: am Stueck mit Zeile 1; "Hakt" an Zeile 1 -> Zeile 1
      nachueben -> wieder am Stueck -> "Fliessend": nur Zeile 2 aendert sich.
   5. Abbrechen mitten in Zeile 3: nichts gespeichert.
   6. Hinweiszeile: bei "ohne Hilfe" steht die Zeile davor grau, nie die
      folgende; nach drei neuen Zeilen "Für heute ist das gut".
   7. Serie: ein Tag nur mit Textzeilen zaehlt (tagGelernt). */
const { start, vollerStore, tag } = require('./lib');
const { seiteMitApp, storeLesen, BETREIBER_UID } = require('./text_lib');
const U = 'users/' + BETREIBER_UID;
const WORT = i => 'Satz ' + ['eins', 'zwei', 'drei', 'vier', 'fünf'][i] + ' mit vier Wörtern';

(async () => {
  const fehler = [];
  const pruefe = (ok, text) => { if (!ok) fehler.push(text); };
  const store = vollerStore();
  store['users/u1'].texteEinwilligung = tag(0);
  store['users/u1'].verlauf = {};
  const ids = [0, 1, 2, 3, 4].map(i => 'n' + i);
  ids.forEach((id, i) => { store['users/u1/karten/' + id] = { wort: WORT(i), uebersetzung: '', extra: null, stufe: 0,
    nextReview: tag(0), ersteBewertung: null, rueckfaelle: 0, quelleId: null, maxStufe: 0, order: i, bereichId: 'b1', textId: 'tn' }; });
  store['users/u1/bereiche/b1'].sets.tn = { name: 'Neutraltext', order: 9, art: 'text', quelleId: null, cardIds: ids,
    nummerAb: 1, quelle: null, kreisTage: 7, kreisPos: null, kreisTag: null, festErgebnisse: '' };
  const browser = await start();
  try {
    /* --gegenprobe: ohne Denkpausen- und Bewerten-Sperre - Punkt 1 muss rot werden. */
    const ersetze = process.argv.includes('--gegenprobe') ? [
      ['if (!tl || tl.aufgedeckt || !tl.frei || Date.now() < tl.denkBis) return;', 'if (!tl || tl.aufgedeckt) return;'],
      ['return !tl || !tl.aufgedeckt || Date.now() - tl.aufgedecktAm < BEWERTEN_SPERRE_MS;', 'return !tl || !tl.aufgedeckt;']] : null;
    const { ctx, p } = await seiteMitApp(browser, store, { uid: BETREIBER_UID, ersetze,
      zusatz: 'serieHeute: () => tagGelernt(verlauf[todayStr()]),' });
    const klick = async (sel, w = 250) => { await p.click(sel); await p.waitForTimeout(w); };
    const schritt = () => p.evaluate(() => { const h = document.querySelector('.text-buehne h1'); return h ? h.textContent : ''; });
    const buehne = () => p.$eval('.text-buehne', e => e.innerText);
    const zeile = async id => (await storeLesen(p))[U + '/karten/' + id];
    const protokoll = async () => { const v = ((await storeLesen(p))[U].verlauf || {})[tag(0)] || {}; return v.t || 0; };
    const frei = () => p.waitForFunction(() => { const k = document.querySelector('[data-action="text-aufdecken"]'); return k && !k.classList.contains('gedimmt'); }, null, { timeout: 8000 });
    const aufdecken = async () => { await frei(); await klick('[data-action="text-aufdecken"]', 450); };
    const konnte = async ja => klick('[data-action="text-konnte"][data-id="' + (ja ? 'ja' : 'nein') + '"]', 300);
    const zeileDurch = async () => {   // lesen -> buchstaben -> ohne -> am Stueck
      await klick('[data-action="text-lernen-schritt"][data-id="buchstaben"]');
      await aufdecken(); await konnte(true);
      await aufdecken(); await konnte(true);
    };

    await klick('[data-action="tab-verwalten"]', 500);
    await klick('[data-action="text-oeffnen"]', 500);
    await klick('[data-action="text-lernen"]', 500);
    // 1. Hilfestufen, Denkpause, Sperre
    pruefe(/Lesen/.test(await schritt()) && (await buehne()).includes(WORT(0)), '1: Lesen zeigt die Zeile nicht');
    await klick('[data-action="text-lernen-schritt"][data-id="buchstaben"]', 100);
    const b = await buehne();
    pruefe(/Anfangsbuchstaben/.test(await schritt()) && b.includes('S e m v W') && !b.includes(WORT(0)), '1: Anfangsbuchstaben falsch: ' + b.slice(0, 80));
    const gedimmt = await p.$eval('[data-action="text-aufdecken"]', e => e.classList.contains('gedimmt') && e.getAttribute('aria-disabled') === 'true');
    pruefe(gedimmt, '1: Aufdecken nicht gedimmt waehrend der Denkpause');
    /* p.click wartet bei aria-disabled, bis der Knopf frei ist - der fruehe
       Tipp muss deshalb direkt ausgeloest werden. */
    await p.evaluate(() => document.querySelector('[data-action="text-aufdecken"]').click()); await p.waitForTimeout(150);
    pruefe(!(await p.$('[data-action="text-konnte"]')), '1: Aufdecken wirkte in der Denkpause');
    if (process.argv.includes('--gegenprobe')) throw new Error('GEGENPROBE_ENDE');   // der weitere Ablauf setzt Punkt 1 voraus
    const lage1 = await p.$eval('[data-action="text-aufdecken"]', e => e.getBoundingClientRect().top);
    await frei();
    const lage2 = await p.$eval('[data-action="text-aufdecken"]', e => e.getBoundingClientRect().top);
    pruefe(Math.abs(lage1 - lage2) <= 1, '1: Knopf sprang beim Freiwerden (' + lage1 + ' -> ' + lage2 + ')');
    await p.evaluate(() => {   // Aufdecken und sofort bewerten: Bewerten muss gesperrt sein
      document.querySelector('[data-action="text-aufdecken"]').click();
      document.querySelector('[data-action="text-konnte"][data-id="ja"]').click();
    });
    await p.waitForTimeout(200);
    pruefe(/Anfangsbuchstaben/.test(await schritt()), '1: Doppeltipp bewertete sofort');
    await p.waitForTimeout(400);
    await konnte(false);
    pruefe(/Lesen/.test(await schritt()), '1: "Noch nicht" bei Anfangsbuchstaben fuehrt nicht zu Lesen');
    await klick('[data-action="text-lernen-schritt"][data-id="buchstaben"]');
    await aufdecken(); await konnte(true);
    pruefe(/Ohne Hilfe/.test(await schritt()) && !(await buehne()).includes(WORT(0)), '1: ohne Hilfe zeigt die Zeile');
    await aufdecken(); await konnte(false);
    pruefe(/Anfangsbuchstaben/.test(await schritt()), '1: "Noch nicht" ohne Hilfe fuehrt nicht zu Anfangsbuchstaben');
    await aufdecken(); await konnte(true);
    await aufdecken(); await konnte(true);
    pruefe(/aufsagen/.test(await schritt()), '1: kein Am-Stueck-Schritt');
    pruefe((await zeile('n0')).ersteBewertung === null, '1: vor "Fliessend" schon gespeichert');
    // 2. Fliessend
    await aufdecken();
    await klick('[data-action="text-am-stueck"][data-id="fliessend"]', 700);
    let z = await zeile('n0');
    pruefe(z.stufe === 0 && z.ersteBewertung === tag(0) && z.nextReview === tag(1), '2: Zeile 1 nicht frisch: ' + JSON.stringify([z.stufe, z.ersteBewertung, z.nextReview]));
    pruefe(await protokoll() === 1, '2: Protokoll t = ' + await protokoll());
    pruefe(await p.evaluate(() => window.__PRUEF.serieHeute()), '7: Tag mit nur Textzeile zaehlt nicht');
    // 3. Rueckgaengig
    await klick('[data-action="text-lernen-rueckgaengig"]', 700);
    z = await zeile('n0');
    pruefe(z.ersteBewertung === null, '3: Rueckgaengig: Zeile nicht wieder neu');
    pruefe(await protokoll() === 0, '3: Rueckgaengig: Protokoll t = ' + await protokoll());
    await aufdecken();
    await klick('[data-action="text-am-stueck"][data-id="fliessend"]', 700);
    // 4. Zweite Zeile mit Hakt
    await klick('[data-action="text-lernen-weiter"]', 300);
    await zeileDurch();
    const amStueck = await buehne();
    pruefe(/am Stück/.test(await schritt()), '4: Zeile 2 nicht am Stueck mit Zeile 1');
    await aufdecken();
    pruefe((await buehne()).includes(WORT(0)) && (await buehne()).includes(WORT(1)), '4: am Stueck fehlt eine Zeile');
    await klick('[data-action="text-am-stueck"][data-id="hakt"]', 300);
    await klick('[data-action="text-zeile-hakt"][data-id="n0"]', 200);
    await klick('[data-action="text-hakt-weiter"]', 300);
    pruefe(/Anfangsbuchstaben/.test(await schritt()) && (await buehne()).includes('Zeile 1'), '4: Hakt uebt nicht Zeile 1');
    await aufdecken(); await konnte(true);
    await aufdecken(); await konnte(true);
    await aufdecken();
    await klick('[data-action="text-am-stueck"][data-id="fliessend"]', 700);
    const n0 = await zeile('n0'), n1 = await zeile('n1');
    pruefe(n1.ersteBewertung === tag(0) && n0.ersteBewertung === tag(0) && n0.stufe === 0, '4: Zustaende nach Zeile 2');
    pruefe(await protokoll() === 2, '4: Protokoll t = ' + await protokoll());
    // 6. Hinweiszeile bei Zeile 3
    await klick('[data-action="text-lernen-weiter"]', 300);
    await klick('[data-action="text-lernen-schritt"][data-id="buchstaben"]');
    await aufdecken(); await konnte(true);
    const ohne = await buehne();
    pruefe(ohne.includes(WORT(1)) && !ohne.includes(WORT(2)) && !ohne.includes(WORT(3)), '6: Hinweis/verdeckt falsch: ' + ohne.replace(/\s+/g, ' ').slice(0, 120));
    // 5. Abbrechen mitten in Zeile 3
    await klick('[data-action="text-lernen-zu"]', 600);
    pruefe((await zeile('n2')).ersteBewertung === null && await protokoll() === 2, '5: Abbrechen hat gespeichert');
    pruefe(!!(await p.$('.text-zeile')), '5: nach dem Beenden nicht zurueck in der Text-Ansicht');
    // 6b. dritte Zeile ganz -> "Für heute ist das gut"
    await klick('[data-action="text-lernen"]', 500);
    await zeileDurch();
    await aufdecken();
    await klick('[data-action="text-am-stueck"][data-id="fliessend"]', 700);
    pruefe((await buehne()).includes('Für heute ist das gut'), '6: nach drei Zeilen kein ruhiger Satz');
    pruefe(await protokoll() === 3, '6: Protokoll t = ' + await protokoll());
    pruefe(p.fehler.length === 0, 'Seitenfehler: ' + p.fehler.join(' | '));
    await ctx.close();
  } catch (e) { if (e.message !== 'GEGENPROBE_ENDE') throw e; } finally { await browser.close(); }
  if (process.argv.includes('--gegenprobe')) {
    const rot = fehler.some(f => /wirkte in der Denkpause/.test(f));
    console.log(rot ? 'Gegenprobe wie erwartet rot: ' + fehler.filter(f => /Denkpause|Doppeltipp/.test(f)).join('; ') : 'FEHLER Gegenprobe: ' + (fehler.join('; ') || 'nichts gefunden'));
    process.exitCode = rot ? 0 : 1;
    return;
  }
  console.log(fehler.length ? 'ROT:\n  ' + fehler.join('\n  ') : 'OK: Hilfestufen, Denkpause, Sperre, Fliessend, Rueckgaengig, Hakt, Abbrechen, Hinweis, Serie');
  process.exitCode = fehler.length ? 1 : 0;
})().catch(e => { console.error(e); process.exitCode = 1; });
