/* Stufe 5 (texte-lernen/WIEDERHOLEN.md § 6, § 9): Regler je Bereich.
   Gezaehlt werden Antworten auf Karten, die VOR der Antwort Stufe >= 7
   hatten. 20 solche Antworten, davon 14 "Sicher" (70 %) -> abstandFaktor
   0,9, festErgebnisse beginnt neu. Danach:
   - neue Abstaende verkuerzt: Stufe 8 -> round(61 * 0,9) = 55 Tage (Streuung
     im Test auf 0 gesetzt);
   - bestehende nextReview anderer Karten unveraendert;
   - Rueckgaengig nimmt auch den Regler zurueck;
   - Karten unter Stufe 7 zaehlen nicht;
   - Konto ohne Probelauf: kein Feld, gewohnte Abstaende (61 Tage) - das ist
     zugleich die Gegenprobe.
   Die Bewertungen laufen ueber gradeCard (dieselbe Funktion wie die Knoepfe). */
const { start, vollerStore, tag } = require('./lib');
const { seiteMitApp, storeLesen, BETREIBER_UID } = require('./text_lib');

const zusatz = `
  starten: () => { startSession(); return ui.session ? ui.session.queue.slice() : []; },
  karte: id => JSON.parse(JSON.stringify(findCard(id))),
  bewerte: (id, kind) => { const s = ui.session; if (!s || s.queue[0] !== id) return 'nicht vorn: ' + (s && s.queue[0]); s.revealed = true; gradeCard(kind); return 'ok'; },
  rueck: () => undoLastGrade(),
  bereich: () => { const b = currentBereich(); return { abstandFaktor: b.abstandFaktor, festErgebnisse: b.festErgebnisse }; },
  naechster: (stufe, faktor) => { const r = Math.random; Math.random = () => 0.5; try { return nextReviewForStufe(stufe, faktor); } finally { Math.random = r; } },`;

function storeMitGefestigten() {
  const store = vollerStore();
  store['users/u1'].settings.sitzungsLimit = 'alle';
  // k0-k19: Stufe 8, heute faellig (gefestigt); k20-k39 bleiben wie sie sind
  for (let i = 0; i < 20; i++) Object.assign(store['users/u1/karten/k' + i], { stufe: 8, maxStufe: 8, nextReview: tag(0), ersteBewertung: tag(-100) });
  for (let i = 20; i < 40; i++) Object.assign(store['users/u1/karten/k' + i], { nextReview: tag(5 + i) });
  return store;
}

async function lauf(browser, uid) {
  const { ctx, p } = await seiteMitApp(browser, storeMitGefestigten(), { uid, zusatz });
  const U = 'users/' + uid;
  const vorher = await storeLesen(p);
  const queue = await p.evaluate(() => window.__PRUEF.starten());
  const r = { fehler: [] };
  let sicher = 0, n = 0;
  for (const id of queue) {
    if (!/^k(1?\d)$/.test(id) || +id.slice(1) >= 20) continue;
    const kind = sicher < 14 ? 'known' : 'unknown';
    const ok = await p.evaluate(([id, k]) => window.__PRUEF.bewerte(id, k), [id, kind]);
    if (ok !== 'ok') { r.fehler.push('Bewerten ' + id + ': ' + ok); break; }
    if (kind === 'known') sicher++;
    n++;
    if (n === 19) r.nach19 = await p.evaluate(() => window.__PRUEF.bereich());
    if (n === 20) break;
  }
  r.anzahl = n;
  r.nach20 = await p.evaluate(() => window.__PRUEF.bereich());
  await p.waitForTimeout(600);
  r.doc = (await storeLesen(p))[U + '/bereiche/b1'];
  r.abstand = await p.evaluate(f => window.__PRUEF.naechster(8, f), r.nach20.abstandFaktor);
  const nachher = await storeLesen(p);
  r.unberuehrt = [...Array(20).keys()].map(i => 'k' + (i + 20)).every(id => nachher[U + '/karten/' + id].nextReview === vorher[U + '/karten/' + id].nextReview);
  // Rueckgaengig der letzten (20.) Antwort stellt den Regler wieder her
  await p.evaluate(() => window.__PRUEF.rueck());
  r.nachRueck = await p.evaluate(() => window.__PRUEF.bereich());
  r.seitenfehler = p.fehler;
  await ctx.close();
  return r;
}

(async () => {
  const fehler = [];
  const pruefe = (ok, t) => { if (!ok) fehler.push(t); };
  const browser = await start();
  try {
    const b = await lauf(browser, BETREIBER_UID);
    pruefe(b.anzahl === 20, 'Betreiber: nur ' + b.anzahl + ' Antworten');
    pruefe(b.nach19 && b.nach19.festErgebnisse && b.nach19.festErgebnisse.length === 19 && b.nach19.abstandFaktor === undefined, 'nach 19: ' + JSON.stringify(b.nach19));
    pruefe(b.nach20.abstandFaktor === 0.9 && !b.nach20.festErgebnisse, 'nach 20 (70 %): ' + JSON.stringify(b.nach20));
    pruefe(b.doc.abstandFaktor === 0.9, 'Faktor nicht gespeichert: ' + b.doc.abstandFaktor);
    pruefe(b.abstand === tag(55), 'Abstand Stufe 8 mit 0,9: ' + b.abstand + ' statt ' + tag(55));
    pruefe(b.unberuehrt, 'bestehende nextReview veraendert');
    pruefe(b.nachRueck.abstandFaktor === undefined && (b.nachRueck.festErgebnisse || '').length === 19, 'Rueckgaengig: ' + JSON.stringify(b.nachRueck));
    pruefe(!b.fehler.length && !b.seitenfehler.length, 'Betreiber: ' + b.fehler.concat(b.seitenfehler).join(' | '));

    const o = await lauf(browser, 'u1');
    pruefe(o.anzahl === 20, 'ohne Probelauf: nur ' + o.anzahl + ' Antworten');
    pruefe(o.nach20.abstandFaktor === undefined && !o.nach20.festErgebnisse, 'ohne Probelauf veraendert: ' + JSON.stringify(o.nach20));
    pruefe(!('abstandFaktor' in o.doc) && !('festErgebnisse' in o.doc), 'ohne Probelauf gespeichert');
    pruefe(o.abstand === tag(61), 'ohne Probelauf Abstand ' + o.abstand + ' statt ' + tag(61));
  } finally { await browser.close(); }
  console.log(fehler.length ? 'ROT:\n  ' + fehler.join('\n  ') : 'OK: 70 % -> 0,9, Abstand 55 statt 61, andere Karten unberuehrt, Rueckgaengig, ohne Probelauf unveraendert');
  process.exitCode = fehler.length ? 1 : 0;
})().catch(e => { console.error(e); process.exitCode = 1; });
