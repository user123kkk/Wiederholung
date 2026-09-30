/* Stufe 5 (texte-lernen/WIEDERHOLEN.md § 6, § 9): Karten-Regler, nur im
   Probelauf. 28 gefestigte Karten (Stufe 7) heute faellig, alle anderen
   spaeter faellig.
   1. 20 Antworten, 14 sicher (70 %) -> abstandFaktor 0,9, Fenster leer;
      gespeichert im Bereichsdokument.
   2. Naechstes "Sicher" auf Stufe 7 -> Stufe 8: Abstand = round(61 x 0,9)
      = 55 Tage (Streuung im Test aus: Math.random = 0,5); ohne Regler 61.
   3. Bestehende nextReview anderer Karten unveraendert.
   4. Rueckgaengig stellt Faktor und Fenster zurueck (auch direkt nach der
      20. Antwort, die den Faktor verstellt hat).
   5. Antworten auf Karten unter Stufe 7 zaehlen nicht.
   Gegenprobe: Konto ohne Probelauf (u1) -> kein Regler-Feld, voller Abstand. */
const { start, vollerStore, tag } = require('./lib');
const { seiteMitApp, storeLesen, BETREIBER_UID } = require('./text_lib');
const zusatz = `start: () => { Math.random = () => 0.5; startSession(); }, grade: k => gradeCard(k), undo: () => undoLastGrade(),
  erste: () => { const c = findCard(ui.session.queue[0]); return { id: c.id, stufe: c.stufe }; },
  karte: id => JSON.parse(JSON.stringify(findCard(id))), b: () => { const b = currentBereich(); return { f: b.abstandFaktor, e: b.festErgebnisse || '' }; },`;

function store() {
  const s = vollerStore();
  for (const [k, v] of Object.entries(s)) {
    const m = k.match(/\/karten\/k(\d+)$/);
    if (!m) continue;
    const i = +m[1];
    if (i >= 12) Object.assign(v, { stufe: 7, maxStufe: 7, nextReview: tag(0), ersteBewertung: tag(-60) });
    else Object.assign(v, { nextReview: tag(30), ersteBewertung: tag(-60), stufe: 3, maxStufe: 3 });
  }
  return s;
}
const tageBis = d => Math.round((new Date(d) - new Date(tag(0))) / 864e5);

async function lauf(browser, uid) {
  const fehler = [], info = {};
  const pruefe = (ok, text) => { if (!ok) fehler.push(text); };
  const { ctx, p } = await seiteMitApp(browser, store(), { uid, zusatz });
  const ev = (f, ...a) => p.evaluate(([f, a]) => window.__PRUEF[f](...a), [f, a]);
  try {
    await ev('start');
    const vorher = await ev('karte', 'k0');
    for (let i = 0; i < 20; i++) await ev('grade', i < 14 ? 'known' : 'unknown');
    info.nach20 = await ev('b');
    await ev('undo');
    info.undo20 = await ev('b');
    await ev('grade', 'unknown');
    await p.waitForTimeout(1200);
    const bd = (await storeLesen(p))['users/' + uid + '/bereiche/b1'];
    info.store = [bd.abstandFaktor, bd.festErgebnisse];
    const e = await ev('erste');
    await ev('grade', 'known');
    const k = await ev('karte', e.id);
    info.tage = tageBis(k.nextReview);
    info.ab1 = await ev('b');
    await ev('undo');
    info.undo = await ev('b');
    pruefe(JSON.stringify(await ev('karte', 'k0')) === JSON.stringify(vorher), 'k0 veraendert');
    pruefe(p.fehler.length === 0, 'Seitenfehler: ' + p.fehler.join('; '));
  } catch (e) { fehler.push('Abbruch: ' + e.message.split('\n')[0]); } finally { await ctx.close(); }
  return { fehler, info };
}

(async () => {
  const browser = await start();
  try {
    const { fehler: f, info } = await lauf(browser, BETREIBER_UID);
    const pruefe = (ok, text) => { if (!ok) f.push(text); };
    console.log('(lesen) ' + JSON.stringify(info));
    pruefe(info.nach20 && info.nach20.f === 0.9 && info.nach20.e === '', 'nach 20 Antworten (70 %): ' + JSON.stringify(info.nach20));
    pruefe(info.undo20 && (info.undo20.f === undefined || info.undo20.f === 1) && info.undo20.e.length === 19, 'Rueckgaengig der 20. Antwort: ' + JSON.stringify(info.undo20));
    pruefe(info.store && info.store[0] === 0.9 && info.store[1] === '', 'Store: ' + JSON.stringify(info.store));
    pruefe(info.tage === 55, 'Abstand Stufe 8 mit 0,9: ' + info.tage + ' statt 55 Tage');
    pruefe(info.ab1 && info.ab1.e === '1', 'Antwort 21 nicht im neuen Fenster: ' + JSON.stringify(info.ab1));
    pruefe(info.undo && info.undo.f === 0.9 && info.undo.e === '', 'Rueckgaengig: ' + JSON.stringify(info.undo));
    const g = await lauf(browser, 'u1');
    console.log('(lesen) Gegenprobe ohne Probelauf: ' + JSON.stringify(g.info));
    if (!(g.info.nach20 && g.info.nach20.f === undefined && g.info.store[0] == null && g.info.tage === 61)) f.push('Konto ohne Probelauf bekam einen Regler');
    if (g.fehler.length) f.push(...g.fehler.map(x => 'u1: ' + x));
    if (f.length) { console.log('FEHLER:\n' + f.join('\n')); process.exitCode = 1; }
    else console.log('OK t_regler_karten: 70 % -> 0,9, Abstand verkuerzt, Rueckgaengig, ohne Probelauf unveraendert');
  } finally { await browser.close(); }
})();
