/* Stufe 3 (texte-lernen/KONZEPT.md § 5, § 13): Neu lernen ueber die echte
   Oberflaeche. Testtext aus text_lib (neutrale Testsaetze): z8, z9 neu,
   z9 mit 1216 Zeichen.
   1. Lesen -> Anfangsbuchstaben: "Aufdecken" gedimmt (Denkpause), ein Tipp
      darin tut nichts; nach dem Aufdecken nimmt "Konnte ich" erst nach der
      Sperre Tipps an; "Noch nicht" -> zurueck zu Lesen.
   2. Ohne Hilfe -> Am Stueck -> "Hakt" -> Zeile antippen -> ueben -> wieder
      am Stueck. Bis hier nichts gespeichert (Schritt 7).
   3. "Fliessend": z8 frisch, morgen faellig, Protokoll t = 1, w/n
      unveraendert, Tag zaehlt fuer die Serie (tagGelernt).
   4. Rueckgaengig: z8 wieder neu, t = 0; erneut fliessend.
   5. Naechste Zeile z9: am Stueck stehen z8 und z9. Danach keine weitere,
      "Fuer heute aufhoeren" fuehrt zur Text-Ansicht.
   6. Lage: Seite nie hoeher als der Bildschirm, Knoepfe an derselben Stelle
      (Aufdecken = Konnte ich), bei 390x844 und 320x568.
   7. Abbruch vor "Fliessend" speichert nichts.
   Gegenprobe: ohne verlaufZaehle("t") wird es rot. */
const { start, tag } = require('./lib');
const { seiteMitApp, storeLesen, BETREIBER_UID, textStore } = require('./text_lib');
const U = 'users/' + BETREIBER_UID;
const zusatz = `tagGelernt: () => tagGelernt(verlauf[todayStr()]), verlauf: () => JSON.parse(JSON.stringify(verlauf[todayStr()] || null)), tl: () => ui.textLernen && ui.textLernen.schritt,`;

async function lauf(browser, { ersetze, viewport } = {}) {
  const fehler = [];
  const pruefe = (ok, text) => { if (!ok) fehler.push(text); };
  const { ctx, p } = await seiteMitApp(browser, textStore(), { uid: BETREIBER_UID, zusatz, ersetze, viewport });
  const klick = async (sel, w = 450) => { await p.click(sel, { timeout: 5000 }); await p.waitForTimeout(w); };
  const schritt = () => p.evaluate(() => window.__PRUEF.tl());
  const karte = async id => (await storeLesen(p))[U + '/karten/' + id];
  const lage = async wo => {
    const m = await p.evaluate(() => {
      const k = document.querySelector('.text-knoepfe > button:last-child');
      return { h: document.documentElement.scrollHeight, vh: innerHeight, unten: k ? Math.round(k.getBoundingClientRect().bottom) : -1,
        top: k ? Math.round(k.getBoundingClientRect().top) : -1, nav: !!document.querySelector('.nav__tabs:not([hidden])') && getComputedStyle(document.querySelector('.nav')).display !== 'none', h1: document.querySelectorAll('h1').length };
    });
    pruefe(m.h <= m.vh + 1, wo + ': Seite ' + m.h + ' px hoeher als Bildschirm ' + m.vh);
    pruefe(m.unten > 0 && m.unten <= m.vh, wo + ': Knopf ausserhalb (' + m.unten + ')');
    pruefe(m.h1 === 1, wo + ': ' + m.h1 + ' Ueberschriften h1');
    return m;
  };
  const aufdecken = async wo => {
    const knopf = '[data-action="text-aufdecken"]';
    pruefe(await p.$eval(knopf, e => e.classList.contains('gedimmt') && e.getAttribute('aria-disabled') === 'true'), wo + ': Aufdecken nicht gedimmt');
    /* Echter Tipp an die Stelle: p.click wartete bei aria-disabled selbst. */
    const r = await p.$eval(knopf, e => { const b = e.getBoundingClientRect(); return [b.x + b.width / 2, b.y + b.height / 2]; });
    await p.mouse.click(r[0], r[1]); await p.waitForTimeout(100);
    pruefe(await p.$(knopf) !== null, wo + ': Tipp in der Denkpause deckte auf');
    const vor = await lage(wo + ' vor Aufdecken');
    await p.waitForSelector(knopf + ':not(.gedimmt)', { timeout: 7000 });
    await p.click(knopf);
    const nach = await lage(wo + ' nach Aufdecken');
    pruefe(vor.top === nach.top, wo + ': Knopf sprang ' + vor.top + ' -> ' + nach.top);
  };
  try {
    await klick('[data-action="tab-verwalten"]');
    await klick('[data-action="text-oeffnen"][data-id="t1"]');
    await klick('[data-action="text-lernen"][data-id="t1"]');
    pruefe(await schritt() === 'lesen', 'Start nicht bei Lesen');
    pruefe((await p.textContent('.text-buehne__zeile--offen')).startsWith('Testzeile 9'), 'erste neue Zeile ist nicht z8');
    await lage('Lesen');
    // 1. Anfangsbuchstaben, Denkpause, Sperre, "Noch nicht"
    await klick('[data-action="text-lernen-schritt"][data-id="buchstaben"]', 100);
    pruefe((await p.textContent('.text-buehne__zeile--buchstaben')) === 'T 9 e z d', 'Anfangsbuchstaben: ' + await p.textContent('.text-buehne__zeile--buchstaben'));
    await aufdecken('Buchstaben');
    await p.click('[data-action="text-konnte"][data-id="nein"]'); await p.waitForTimeout(100);
    pruefe(await schritt() === 'buchstaben', 'Tipp vor der Sperre wurde angenommen');
    await p.waitForTimeout(400);
    await klick('[data-action="text-konnte"][data-id="nein"]');
    pruefe(await schritt() === 'lesen', '"Noch nicht" fuehrt nicht zu Lesen');
    // 2. bis am Stueck, Hakt
    await klick('[data-action="text-lernen-schritt"][data-id="buchstaben"]', 100);
    await aufdecken('Buchstaben 2'); await p.waitForTimeout(450);
    await klick('[data-action="text-konnte"][data-id="ja"]', 100);
    pruefe(await schritt() === 'ohne', 'nach Konnte nicht ohne Hilfe');
    await aufdecken('Ohne'); await p.waitForTimeout(450);
    await klick('[data-action="text-konnte"][data-id="ja"]', 100);
    pruefe(await schritt() === 'amStueck', 'nicht am Stueck');
    await aufdecken('Am Stueck'); await p.waitForTimeout(450);
    await klick('[data-action="text-am-stueck"][data-id="hakt"]');
    pruefe(await p.$eval('[data-action="text-hakt-weiter"]', e => e.disabled), '"Diese ueben" ohne Auswahl aktiv');
    await klick('[data-action="text-zeile-hakt"][data-id="z8"]');
    await klick('[data-action="text-hakt-weiter"]', 100);
    pruefe(await schritt() === 'buchstaben', 'Hakt fuehrt nicht zu Anfangsbuchstaben');
    let z8 = await karte('z8');
    pruefe(z8.ersteBewertung === null && !((await p.evaluate(() => window.__PRUEF.verlauf())) || {}).t, 'vor "Fliessend" schon gespeichert');
    await aufdecken('Hakt-Buchstaben'); await p.waitForTimeout(450);
    await klick('[data-action="text-konnte"][data-id="ja"]', 100);
    await aufdecken('Hakt-Ohne'); await p.waitForTimeout(450);
    await klick('[data-action="text-konnte"][data-id="ja"]', 100);
    await aufdecken('Am Stueck 2'); await p.waitForTimeout(450);
    // 3. Fliessend
    await klick('[data-action="text-am-stueck"][data-id="fliessend"]', 800);
    z8 = await karte('z8');
    pruefe(z8.stufe === 0 && z8.nextReview === tag(1) && z8.ersteBewertung === tag(0), 'z8 nicht frisch: ' + JSON.stringify([z8.stufe, z8.nextReview, z8.ersteBewertung]));
    let v = await p.evaluate(() => window.__PRUEF.verlauf());
    pruefe(v && v.t === 1 && !v.w && !v.n, 'Protokoll: ' + JSON.stringify(v));
    pruefe(await p.evaluate(() => window.__PRUEF.tagGelernt()), 'Tag zaehlt nicht fuer die Serie');
    await lage('Gelernt');
    // 4. Rueckgaengig
    await klick('[data-action="text-lernen-rueckgaengig"]', 800);
    z8 = await karte('z8');
    v = await p.evaluate(() => window.__PRUEF.verlauf());
    pruefe(z8.ersteBewertung === null && (!v || !v.t), 'Rueckgaengig: ' + JSON.stringify([z8.ersteBewertung, v]));
    pruefe(await schritt() === 'amStueck', 'Rueckgaengig nicht zurueck am Stueck');
    await aufdecken('Am Stueck 3'); await p.waitForTimeout(450);
    await klick('[data-action="text-am-stueck"][data-id="fliessend"]', 800);
    // 5. Naechste Zeile z9, am Stueck z8 + z9
    await klick('[data-action="text-lernen-weiter"]');
    pruefe((await p.textContent('.text-buehne__zeile--offen')).startsWith('Lange Testzeile'), 'naechste Zeile nicht z9');
    await lage('Lesen lang');
    await klick('[data-action="text-lernen-schritt"][data-id="buchstaben"]', 100);
    await aufdecken('Buchstaben lang'); await p.waitForTimeout(450);
    await klick('[data-action="text-konnte"][data-id="ja"]', 100);
    await aufdecken('Ohne lang'); await p.waitForTimeout(450);
    await klick('[data-action="text-konnte"][data-id="ja"]', 100);
    pruefe(await p.$$eval('.text-buehne__zeile--verdeckt', e => e.length) === 2, 'am Stueck nicht z8 und z9');
    await aufdecken('Am Stueck lang'); await p.waitForTimeout(450);
    await klick('[data-action="text-am-stueck"][data-id="fliessend"]', 800);
    v = await p.evaluate(() => window.__PRUEF.verlauf());
    pruefe(v && v.t === 2, 'Protokoll nach zwei Zeilen: ' + JSON.stringify(v));
    pruefe(await p.$('[data-action="text-lernen-weiter"]') === null, '"Naechste" obwohl keine neue Zeile');
    await klick('[data-action="text-lernen-zu"]');
    pruefe(await schritt() === null && await p.$('[data-action="text-lernen"]') === null && await p.$('.text-zeilen') !== null, 'Ende fuehrt nicht zur Text-Ansicht');
    pruefe(p.fehler.length === 0, 'Seitenfehler: ' + p.fehler.join('; '));
  } catch (e) { fehler.push('Abbruch des Laufs: ' + e.message.split('\n')[0]); } finally { await ctx.close(); }
  return fehler;
}

async function abbruch(browser) {
  const { ctx, p } = await seiteMitApp(browser, textStore(), { uid: BETREIBER_UID, zusatz });
  try {
    await p.click('[data-action="tab-verwalten"]'); await p.waitForTimeout(400);
    await p.click('[data-action="text-oeffnen"][data-id="t1"]'); await p.waitForTimeout(400);
    const vor = JSON.stringify(await storeLesen(p));
    await p.click('[data-action="text-lernen"][data-id="t1"]'); await p.waitForTimeout(400);
    await p.click('[data-action="text-lernen-schritt"][data-id="buchstaben"]'); await p.waitForTimeout(2500);
    await p.click('[data-action="text-aufdecken"]'); await p.waitForTimeout(500);
    await p.click('[data-action="text-lernen-zu"]'); await p.waitForTimeout(2500);
    return JSON.stringify(await storeLesen(p)) === vor ? [] : ['Abbruch hat gespeichert'];
  } finally { await ctx.close(); }
}

(async () => {
  const browser = await start();
  try {
    const f = [...await lauf(browser), ...(await lauf(browser, { viewport: { width: 320, height: 568 } })).map(x => '320: ' + x), ...await abbruch(browser)];
    const g = await lauf(browser, { ersetze: ['verlaufZaehle("t");', ''] });
    console.log('Gegenprobe ohne Protokoll "t": ' + g.length + ' Befunde (rot erwartet)');
    if (g.length === 0) f.push('Gegenprobe blieb gruen');
    if (f.length) { console.log('FEHLER:\n' + f.join('\n')); process.exitCode = 1; }
    else console.log('OK t_text_neu: Schritte 1-8, Denkpause, Sperre, Lage 390/320, Abbruch');
  } finally { await browser.close(); }
})();
