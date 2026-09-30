/* Stufe 4 (texte-lernen/WIEDERHOLEN.md § 3, § 9): der Kreis, mit der
   echten Rechenlogik aus app.js.
   - 30 feste Zeilen, kreisTage 7 -> 5 Zeilen pro Tag, nach 6 Tagen einmal
     durch, jede Zeile genau einmal.
   - verpasste Tage verschieben nichts (kreisPos bleibt, kein Rueckstand).
   - Aufhoeren mitten im Stueck: der Rest kommt am selben Tag (portion) und
     nicht doppelt.
   - Nachstellen bei 80 % -> 5, bei 97 % -> 9; Grenzen 3 und 30; unter 20
     Antworten unveraendert.
   - Abschnitte: hoechstens 5, eine Zeile ueber 200 Zeichen steht allein.
   --gegenprobe: mit falschem Rundungsweg (floor statt ceil) muss es rot werden. */
const { logikLaden } = require('./text_lib');
const gegenprobe = process.argv.includes('--gegenprobe');
const L = logikLaden({ ersetze: gegenprobe ? [['return anzahlFest ? Math.ceil(anzahlFest / Math.max(1, kreisTage)) : 0;', 'return anzahlFest ? Math.floor(anzahlFest / Math.max(1, kreisTage)) : 0;']] : [] });
const fehler = [];
const pruefe = (ok, t) => { if (!ok) fehler.push(t); };
const fest = (n, lang) => Array.from({ length: n }, (_, i) => ({ id: 'f' + i, wort: lang && lang.includes(i) ? 'x'.repeat(250) : 'Zeile ' + i, stufe: 7, ersteBewertung: '2026-08-01', nextReview: '2099-12-31' }));
const tag = n => { const d = new Date('2026-10-01T12:00:00'); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

// 30 feste Zeilen, 7 Tage
let z = fest(30), t = { kreisTage: 7, kreisPos: null, kreisTag: null, portion: 0, festErgebnisse: '' };
pruefe(L.kreisGroesse(30, 7) === 5, 'Groesse ' + L.kreisGroesse(30, 7) + ' statt 5');
const gesehen = [];
for (let d = 0; d < 6; d++) {
  const stueck = L.kreisStueck(z, t, tag(d));
  const n = stueck.flat().length;
  pruefe(n === 5, 'Tag ' + d + ': ' + n + ' Zeilen statt 5');
  let bisher = L.kreisGroesse(30, t.kreisTage);   // wie wdhSpeichern: portion = Rest des Tages
  for (const a of stueck) {
    gesehen.push(...a);
    const w = L.kreisWeiter(z, a);
    bisher -= a.length;
    t.kreisPos = w.pos; t.kreisTag = tag(d); t.portion = Math.max(0, bisher);
    if (d === 5 && a === stueck[stueck.length - 1]) pruefe(w.umlauf, 'Nach 6 Tagen kein Umlauf');
  }
  pruefe(L.kreisStueck(z, t, tag(d)).length === 0, 'Tag ' + d + ': nach dem Stueck noch Arbeit');
}
pruefe(gesehen.length === 30 && new Set(gesehen).size === 30, 'Nicht jede Zeile genau einmal: ' + gesehen.length + '/' + new Set(gesehen).size);

// Verpasste Tage: Position bleibt, Stueck bleibt 5
t = { kreisTage: 7, kreisPos: 'f10', kreisTag: tag(0), portion: 0, festErgebnisse: '' };
const nachPause = L.kreisStueck(z, t, tag(9)).flat();
pruefe(nachPause.length === 5 && nachPause[0] === 10, 'Nach 9 Tagen Pause: ' + nachPause.join(',') + ' statt 10-14');

// Aufhoeren mitten im Stueck (Abschnitte zu 5 -> mit 10 Zeilen/Tag zwei Abschnitte)
t = { kreisTage: 3, kreisPos: 'f0', kreisTag: null, portion: 0, festErgebnisse: '' };
const erstes = L.kreisStueck(z, t, tag(0));
pruefe(erstes.flat().length === 10 && erstes.length === 2, 'kreisTage 3: ' + erstes.map(a => a.length).join('+') + ' statt 5+5');
t.kreisPos = L.kreisWeiter(z, erstes[0]).pos; t.kreisTag = tag(0); t.portion = 10 - 5;
const rest = L.kreisStueck(z, t, tag(0));
pruefe(rest.flat().length === 5 && rest[0][0] === 5, 'Rest am selben Tag: ' + rest.flat().join(','));

// Nachstellen
const erg = (n, eins) => '1'.repeat(eins) + '0'.repeat(n - eins);
pruefe(L.kreisNachstellen(7, erg(20, 16)) === 5, '80 %: ' + L.kreisNachstellen(7, erg(20, 16)) + ' statt 5');
pruefe(L.kreisNachstellen(7, erg(40, 39)) === 9, '97 %: ' + L.kreisNachstellen(7, erg(40, 39)) + ' statt 9');
pruefe(L.kreisNachstellen(7, erg(20, 18)) === 7, '90 %: unveraendert erwartet');
pruefe(L.kreisNachstellen(3, erg(20, 10)) === 3, 'Untergrenze 3');
pruefe(L.kreisNachstellen(30, erg(20, 20)) === 30, 'Obergrenze 30');
pruefe(L.kreisNachstellen(7, erg(19, 10)) === 7, 'unter 20 Antworten: unveraendert erwartet');

// Abschnitte
const lang = fest(12, [6]);
const ab = L.abschnitteBilden(lang, [...Array(12).keys()]);
pruefe(JSON.stringify(ab) === JSON.stringify([[0, 1, 2, 3, 4], [5], [6], [7, 8, 9, 10, 11]]), 'Abschnitte: ' + JSON.stringify(ab));

// Kontrollfrage (WIEDERHOLEN.md § 7): etwa jeder zehnte Abschnitt, drei
// verschiedene Woerter aus demselben Text, das richtige dabei.
let gefragt = 0;
for (let i = 0; i < 2000; i++) if (L.kontrollfrageFaellig('id' + i, '2026-10-01')) gefragt++;
pruefe(gefragt > 140 && gefragt < 260, 'Kontrollfrage bei ' + gefragt + ' von 2000 statt etwa 200');
const kz = ['alpha beta gamma', 'delta epsilon', 'zeta eta'].map((w, i) => ({ id: 'k' + i, wort: w }));
const k = L.kontrollWoerter(kz, kz[1], '2026-10-01');
pruefe(k && k.richtig === 'delta' && k.woerter.length === 3 && new Set(k.woerter).size === 3 && k.woerter.includes('delta'), 'Kontrollwoerter: ' + JSON.stringify(k));
pruefe(L.kontrollWoerter([{ id: 'a', wort: 'eins zwei' }], { id: 'a', wort: 'eins zwei' }, '2026-10-01') === null, 'Kontrollfrage trotz weniger als 3 Woertern');

// Tagesmenge (§ 5): 10 s je Zeile plus 1 s je 10 Zeichen
pruefe(L.zeileSekunden({ wort: 'x'.repeat(50) }) === 15, 'Zeit je Zeile: ' + L.zeileSekunden({ wort: 'x'.repeat(50) }));
const viel = Array.from({ length: 120 }, (_, i) => ({ id: 'v' + i, wort: 'x'.repeat(40), stufe: 1, ersteBewertung: '2026-09-01', nextReview: '2026-10-01' }));
const arbeit = L.textHeuteArbeit(viel, { kreisTage: 7 }, '2026-10-01');
pruefe(arbeit.sekunden > 20 * 60, 'Tagesmenge: 120 frische Zeilen nur ' + arbeit.sekunden + ' s');

if (gegenprobe) {
  console.log(fehler.length ? 'Gegenprobe wie erwartet rot (' + fehler[0] + ')' : 'FEHLER Gegenprobe: keine Befunde');
  process.exitCode = fehler.length ? 0 : 1;
} else {
  console.log(fehler.length ? 'ROT:\n  ' + fehler.join('\n  ') : 'OK: 30 Zeilen in 6 Tagen je einmal, Pause, Rest am selben Tag, Nachstellen, Abschnitte');
  process.exitCode = fehler.length ? 1 : 0;
}
