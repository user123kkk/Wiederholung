/* Stufe 4 (WIEDERHOLEN.md § 4, § 9): frische Zeilen mit Nachbarn.
   - gehakte Zeile 12 von 30 -> Block 11-13, grau 9-10, nie 14 sichtbar.
   - Zeilen 12 und 14 frisch -> ein Block 11-15.
   - Zeilen 12 und 16 -> zwei Bloecke.
   - Nachbar, der noch neu ist, wird nicht gezeigt; Zeile 1 hat keinen
     Vorgaenger und keine Hinweiszeilen.
   - Bewertet werden nur die frischen Zeilen (bewerten = frisch).
   --gegenprobe: ohne Zusammenlegen (Abstand <= 2) muss es rot werden. */
const { logikLaden } = require('./text_lib');
const gegenprobe = process.argv.includes('--gegenprobe');
const L = logikLaden({ ersetze: gegenprobe ? [['i - letzter.frisch[letzter.frisch.length - 1] <= 2', 'false'] ] : [] });
const fehler = [];
const pruefe = (ok, t) => { if (!ok) fehler.push(t); };
const HEUTE = '2026-10-01';
const text = (frischNr, neuAb) => Array.from({ length: 30 }, (_, i) => {
  const nr = i + 1;
  if (neuAb && nr >= neuAb) return { id: 'z' + nr, wort: 'Zeile ' + nr, stufe: 0, ersteBewertung: null, nextReview: HEUTE };
  if (frischNr.includes(nr)) return { id: 'z' + nr, wort: 'Zeile ' + nr, stufe: 0, ersteBewertung: '2026-09-01', nextReview: HEUTE };
  return { id: 'z' + nr, wort: 'Zeile ' + nr, stufe: 7, ersteBewertung: '2026-08-01', nextReview: '2099-12-31' };
});
const nr = liste => liste.map(i => i + 1);

let b = L.frischBloecke(text([12]), HEUTE);
pruefe(b.length === 1, '12: ' + b.length + ' Bloecke');
pruefe(JSON.stringify(nr(b[0].zeigen)) === '[11,12,13]', '12: zeigt ' + nr(b[0].zeigen));
pruefe(JSON.stringify(nr(b[0].hinweis)) === '[9,10]', '12: Hinweis ' + nr(b[0].hinweis));
pruefe(JSON.stringify(nr(b[0].frisch)) === '[12]', '12: bewertet ' + nr(b[0].frisch));
pruefe(!b[0].zeigen.concat(b[0].hinweis).includes(13), '12: Zeile 14 sichtbar');

b = L.frischBloecke(text([12, 14]), HEUTE);
pruefe(b.length === 1 && JSON.stringify(nr(b[0].zeigen)) === '[11,12,13,14,15]', '12+14: ' + b.map(x => nr(x.zeigen)).join(' | '));
pruefe(b.length === 1 && JSON.stringify(nr(b[0].frisch)) === '[12,14]', '12+14: bewertet');

b = L.frischBloecke(text([12, 16]), HEUTE);
pruefe(b.length === 2, '12+16: ' + b.length + ' Bloecke statt 2');

b = L.frischBloecke(text([20], 21), HEUTE);
pruefe(b.length === 1 && JSON.stringify(nr(b[0].zeigen)) === '[19,20]', 'neuer Nachbar gezeigt: ' + nr(b[0].zeigen));

b = L.frischBloecke(text([1]), HEUTE);
pruefe(b.length === 1 && JSON.stringify(nr(b[0].zeigen)) === '[1,2]' && b[0].hinweis.length === 0, 'Zeile 1: ' + nr(b[0].zeigen) + ' / ' + nr(b[0].hinweis));

const morgen = text([12]); morgen[11].nextReview = '2026-10-02';
pruefe(L.frischBloecke(morgen, HEUTE).length === 0, 'morgen faellige Zeile heute schon gezeigt');

if (gegenprobe) {
  console.log(fehler.length ? 'Gegenprobe wie erwartet rot (' + fehler[0] + ')' : 'FEHLER Gegenprobe: keine Befunde');
  process.exitCode = fehler.length ? 0 : 1;
} else {
  console.log(fehler.length ? 'ROT:\n  ' + fehler.join('\n  ') : 'OK: Block 11-13, 11-15, getrennte Bloecke, neue Nachbarn, Textanfang, Faelligkeit');
  process.exitCode = fehler.length ? 1 : 0;
}
