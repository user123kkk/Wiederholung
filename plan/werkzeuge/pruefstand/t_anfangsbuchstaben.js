/* Stufe 3 (texte-lernen/KONZEPT.md § 8.3, § 13): Anfangsbuchstaben.
   Echte Funktionen aus app.js (per Quelltext geladen), Wortlaut aus
   quran/tanzil-uthmani.txt ueber fixtures/quran-stellen.json - kein
   Wortlaut vom Agenten.
   - Harakat, Quran-Zeichen (U+0610-061A, 064B-065F, 0670, 06D6-06ED) und
     Tatweel (U+0640) sind weg; jedes Zeichen ist ein Grundbuchstabe.
   - Anzahl = Woerter ohne die, die nur aus solchen Zeichen bestehen.
   - Deutsch: erster Buchstabe, Satzzeichen bleiben.
   Gegenprobe: ohne das Entfernen der Zeichen muessen Befunde kommen. */
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const repo = path.join(__dirname, '../../..');
const quelle = fs.readFileSync(path.join(repo, 'app.js'), 'utf8');
const stueck = (anfang, ende) => {
  const i = quelle.indexOf(anfang);
  if (i === -1) throw new Error('nicht gefunden: ' + anfang);
  const j = quelle.indexOf(ende, i);
  if (j === -1) throw new Error('Ende nicht gefunden: ' + ende);
  return quelle.slice(i, j + ende.length);
};
const gegenprobe = process.argv.includes('--gegenprobe');
let code = [
  stueck('const ARAB_ZEICHEN', ';'),
  'function istArabisch(text) { return ARAB_ZEICHEN.test(String(text || "")); }',
  stueck('const ARAB_OHNE_BUCHSTABE', ';'),
  stueck('function anfangsbuchstaben(zeile) {', '\n}'),
  stueck('function zeileWoerter(zeile) {', '\n}')
].join('\n');
if (gegenprobe) code = code.replace('w.replace(ARAB_OHNE_BUCHSTABE, "").charAt(0)', 'w.charAt(0)');
const ctx = {}; vm.createContext(ctx); vm.runInContext(code + '\nthis.ab = anfangsbuchstaben; this.woerter = zeileWoerter;', ctx);

const ayat = fs.readFileSync(path.join(repo, 'quran/tanzil-uthmani.txt'), 'utf8').split('\n')
  .filter(l => l && l[0] !== '#').map(l => l.split('|'));
const aya = (s, a) => ayat.find(p => +p[0] === s && +p[1] === a)[2];
const stellen = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/quran-stellen.json'), 'utf8')).stellen;
const MARKE = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/;
const GRUND = /^[\u0621-\u063A\u0641-\u064A\u0671-\u06D3]$/;

const fehler = [];
for (const st of stellen) {
  const z = aya(st.sure, st.aya);
  const b = ctx.ab(z).split(' ').filter(Boolean);
  const nurZeichen = z.split(' ').filter(w => w && !w.replace(new RegExp(MARKE.source, 'g'), '')).length;
  const soll = z.split(' ').filter(Boolean).length - nurZeichen;
  if (b.length !== soll) fehler.push(st.sure + ':' + st.aya + ' ' + b.length + ' statt ' + soll + ' Buchstaben');
  if (b.some(x => MARKE.test(x))) fehler.push(st.sure + ':' + st.aya + ' enthaelt Harakat/Zeichen');
  if (b.some(x => !GRUND.test(x))) fehler.push(st.sure + ':' + st.aya + ' kein Grundbuchstabe: ' + b.filter(x => !GRUND.test(x)).map(x => [...x].map(c => c.codePointAt(0).toString(16)).join('+')).join(' '));
  if (ctx.woerter(z).length !== soll) fehler.push(st.sure + ':' + st.aya + ' Wortzahl fuer Denkpause ' + ctx.woerter(z).length);
}
// Grossflaechig: alle 6236 Ayat
let alle = 0;
for (const p of ayat) { const b = ctx.ab(p[2]); if (MARKE.test(b) || b.split(' ').some(x => x && !GRUND.test(x))) alle++; }
if (alle) fehler.push(alle + ' von 6236 Ayat mit Zeichen, die kein Grundbuchstabe sind');
// Deutsch und Satzzeichen
const de = [['Hallo, Welt!', 'H, W!'], ['„Wer fragt, lernt.“', '„W f, l.“'], ['Kapitel 12 beginnt', 'K 1 b']];
for (const [ein, aus] of de) if (ctx.ab(ein) !== aus) fehler.push('Deutsch: "' + ein + '" -> "' + ctx.ab(ein) + '" statt "' + aus + '"');

if (gegenprobe) {
  console.log(fehler.length ? 'Gegenprobe wie erwartet rot (' + fehler.length + ' Befunde, z. B. ' + fehler[0] + ')' : 'FEHLER Gegenprobe: keine Befunde');
  process.exitCode = fehler.length ? 0 : 1;
} else {
  console.log(fehler.length ? 'ROT:\n  ' + fehler.join('\n  ') : 'OK: ' + stellen.length + ' Stichproben und alle 6236 Ayat, Deutsch mit Satzzeichen');
  process.exitCode = fehler.length ? 1 : 0;
}
