/* Erzeugt fixtures/quran-stellen.json aus der mitgelieferten Quelldatei.
   Die Fixture enthaelt nur Fundstellen (Sure, Aya), den Grund der Auswahl
   und den SHA-256 der Zeile - keinen Wortlaut. Tests lesen den Text immer
   aus quran/tanzil-uthmani.txt (LEHREN Par. 2: kein Agent schreibt Quran-
   Wortlaut, auch nicht als Testdaten). Aufruf: node quran_stellen_erzeugen.js */
const fs = require('node:fs'), path = require('node:path');
const { createHash } = require('node:crypto');
const quelle = path.join(__dirname, '../../../../quran/tanzil-uthmani.txt');
const ayat = fs.readFileSync(quelle, 'utf8').split('\n').filter(l => l && !l.startsWith('#'))
  .map(l => { const p = l.split('|'); return { sure: +p[0], aya: +p[1], t: p[2] }; });
const auswahl = [
  [1, 1, 'Sure 1, Aya 1: Basmala als eigene Aya; Tatweel vor hochgestelltem Alif'],
  [1, 2], [1, 3, 'kurze Aya (2 Woerter)'], [1, 4], [1, 5], [1, 6], [1, 7],
  [2, 1, 'Aya 1 einer Sure mit vorangestellter Basmala (Quelldatei so)'],
  [2, 2, 'Wort nur aus Waqf-Zeichen (faellt bei Anfangsbuchstaben weg)'],
  [2, 282, 'laengste Aya, ueber 1000 Zeichen (KONZEPT Par. 7.4)'],
  [7, 206, 'Sajda-Zeichen'],
  [9, 1, 'Sure ohne Basmala'],
  [114, 6, 'letzte Aya']
];
const stellen = auswahl.map(([s, a, grund]) => {
  const x = ayat.find(y => y.sure === s && y.aya === a);
  if (!x) throw new Error('fehlt: ' + s + ':' + a);
  return { sure: s, aya: a, grund: grund || 'Sure 1 vollstaendig', woerter: x.t.split(' ').length,
    zeichen: x.t.length, sha256: createHash('sha256').update(x.t).digest('hex') };
});
fs.writeFileSync(path.join(__dirname, 'quran-stellen.json'), JSON.stringify({
  quelle: 'quran/tanzil-uthmani.txt (Tanzil Uthmani 1.1, CC BY 3.0)',
  hinweis: 'Nur Fundstellen und Pruefsummen, kein Wortlaut. Neu erzeugen mit quran_stellen_erzeugen.js.',
  stellen }, null, 2) + '\n');
console.log(stellen.length + ' Stellen geschrieben');
