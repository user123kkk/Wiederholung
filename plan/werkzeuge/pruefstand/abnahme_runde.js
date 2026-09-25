/* Abnahme der Lernrunde - EIN Befehl, alle Messungen, eine Liste.
   Betreiber 25.09.2026: "ich weiss, ein Tool ohne Bugs ist wahrscheinlich
   nicht moeglich, daher will ich was Genaues, wo viel abgenommen wird."
   Pflicht vor jeder Veroeffentlichung, die die Runde beruehrt (LEHREN § 14).

     node abnahme_runde.js          (Server auf 8099, CHROMIUM gesetzt)

   Jede Zeile ist ein echter Fund aus der Vergangenheit; die Tests schlagen
   mit dem Code von damals an (Gegenprobe steht im jeweiligen Logbuch).
   Endet mit Code 1, sobald ein Test rot ist. Ein roter Test wird behoben
   oder begruendet - nie ignoriert (LEHREN § 5.3). */
const { spawnSync } = require('child_process');
const PRUEFUNGEN = [
  ['t_runde_lage.js',      'Knopf immer im Bild, Seite scrollt nie (4 Handygroessen, lange Notiz/Antwort)'],
  ['t_sprung.js',          'Karte springt nicht: Aufdecken und Karte zu Karte, 4 Geraete'],
  ['t_sprung_ueben.js',    'dasselbe im Ueben'],
  ['t_wischen.js',         'Wischen: weit, schnell, direkt nach Aufdecken, zu kurz, Abbruch'],
  ['t_wischen_schraeg.js', 'Wischen schraeg / mit Daumen, Seite scrollt nicht mit'],
  ['t_doppeltipp.js',      'schneller Doppeltipp bewertet nicht blind'],
  ['t_x_mitten.js',        'X mitten in der Runde: nichts geht verloren, Serie +1'],
  ['t_abgelehnt.js',       'von der Cloud abgelehnte Bewertung wird nachgeschickt'],
  ['t_undo_verlauf.js',    'Rueckgaengig nimmt auch den Tageszaehler zurueck'],
  ['t_serie.js',           'Serie: Luecken, Joker, Sockel'],
  /* Die drei folgenden beschreiben nur (Text, Werte), sie urteilen nicht
     selbst: automatisch rot werden sie nur bei Konsolenfehlern. Ihre Ausgabe
     steht darunter und wird gelesen. */
  ['t_rundenende.js',      'Rundenende, Limit, Weiterlernen (lesen)', true],
  ['t_ueben.js',           'Ueben bewertet und endet (lesen)', true],
  ['t_schreiben.js',       'Schreiben: Zeichenflaeche im Bild (lesen)', true],
];
let rot = 0;
const zeilen = [];
for (const [datei, was, lesen] of PRUEFUNGEN) {
  const t0 = Date.now();
  const r = spawnSync('node', [datei], { cwd: __dirname, encoding: 'utf8', timeout: 600000, env: process.env });
  const aus = (r.stdout || '') + (r.stderr || '');
  const ok = r.status === 0 && !/\bFEHL\b|PAGEERROR|Error:/.test(aus);
  if (!ok) rot++;
  zeilen.push((ok ? 'OK    ' : 'FEHLER') + '  ' + datei.padEnd(22) + was + '  (' + Math.round((Date.now() - t0) / 1000) + ' s)');
  console.log(zeilen[zeilen.length - 1]);
  if (!ok) console.log('        ' + aus.split('\n').filter(z => /FEHL|Error|PAGEERROR/.test(z)).slice(0, 6).join('\n        '));
  if (lesen) console.log('        ' + aus.split('\n').filter(z => z.trim() && !/agent-proxy|www\.google|For details/.test(z)).slice(0, 12).join('\n        '));
}
console.log('\n' + (rot ? rot + ' von ' + PRUEFUNGEN.length + ' ROT - nicht veroeffentlichen.' : 'Alle ' + PRUEFUNGEN.length + ' Pruefungen gruen.'));
process.exit(rot ? 1 : 0);
