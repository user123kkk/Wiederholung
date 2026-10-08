/* Paket I, F-1 "Liste einfuegen": prueft die reine Lesefunktion listeLesen()
   aus app.js. Kein Browser noetig: node t_liste_lesen.js */
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const quelle = fs.readFileSync(path.resolve(__dirname, '../../../app.js'), 'utf8');
const a = quelle.indexOf('//LISTE-LESEN-ANFANG'), e = quelle.indexOf('//LISTE-LESEN-ENDE');
assert.ok(a > 0 && e > a, 'Marken um listeLesen nicht gefunden');
const listeLesen = new Function(quelle.slice(a, e) + '\nreturn listeLesen;')();
const L = t => listeLesen(t, 1000, 5000);
let n = 0;
function fall(name, tun) { tun(); n++; console.log('grün: ' + name); }

fall('leer', () => {
  assert.deepEqual(L('').karten, []); assert.deepEqual(L('  \n\n ').karten, []); assert.equal(L(null).trenner, null);
});
fall('Tab, drei Spalten, Windows-Zeilenenden', () => {
  const r = L('كِتَابٌ\tBuch\tPlural: كُتُبٌ\r\nقَلَمٌ\tStift\r\n');
  assert.equal(r.trenner, '\t'); assert.equal(r.karten.length, 2); assert.equal(r.getauscht, false);
  assert.deepEqual(r.karten[0], { nr: 1, wort: 'كِتَابٌ', uebersetzung: 'Buch', extra: 'Plural: كُتُبٌ' });
  assert.equal(r.karten[1].extra, '');
});
fall('Deutsch vorne wird getauscht', () => {
  const r = L('Buch;كِتَابٌ\nStift;قَلَمٌ\nHaus;بَيْتٌ');
  assert.equal(r.getauscht, true); assert.equal(r.karten[0].wort, 'كِتَابٌ'); assert.equal(r.karten[0].uebersetzung, 'Buch');
});
fall('Harakat bleiben Zeichen für Zeichen', () => {
  const wort = 'مُعَلِّمٌ';
  assert.equal(L(wort + ' - Lehrer').karten[0].wort, wort);
  assert.equal([...L(wort + ' - Lehrer').karten[0].wort].length, [...wort].length);
});
fall('Gedankenstrich, Gleichheitszeichen, senkrechter Strich', () => {
  assert.equal(L('بَابٌ – Tür\nبَيْتٌ – Haus').trenner, ' – ');
  assert.equal(L('بَابٌ = Tür').karten[0].uebersetzung, 'Tür');
  assert.equal(L('بَابٌ | Tür | Notiz').karten[0].extra, 'Notiz');
});
fall('Bindestrich im Wort ist kein Trenner', () => {
  const r = L('Fajr-Gebet;صَلَاةُ الْفَجْرِ');
  assert.equal(r.trenner, ';'); assert.equal(r.karten[0].uebersetzung, 'Fajr-Gebet');
});
fall('Zeilen ohne Trenner oder mit leerer Seite werden gemeldet, nicht verworfen', () => {
  const r = L('كِتَابٌ;Buch\nnur ein Wort\n;Stift\nقَلَمٌ;\n\nبَيْتٌ;Haus');
  assert.equal(r.karten.length, 2);
  assert.deepEqual(r.fehler.map(f => [f.nr, f.grund]), [[2, 'kein Trenner'], [3, 'eine Seite fehlt'], [4, 'eine Seite fehlt']]);
  assert.equal(r.karten[1].nr, 6);
});
fall('gar kein Trenner', () => {
  const r = L('eins\nzwei'); assert.equal(r.trenner, null); assert.equal(r.karten.length, 0); assert.equal(r.fehler.length, 2);
});
fall('mehr als drei Spalten: Rest landet in der Notiz', () => {
  assert.equal(L('a\tb\tc\td').karten[0].extra, 'c · d');
});
fall('Längen werden gekappt', () => {
  const r = listeLesen('x'.repeat(50) + ';' + 'y'.repeat(50) + ';' + 'z'.repeat(50), 10, 20);
  assert.equal(r.karten[0].wort.length, 10); assert.equal(r.karten[0].uebersetzung.length, 10); assert.equal(r.karten[0].extra.length, 20);
});
fall('zu viele Zeilen: nichts lesen, Zahl melden', () => {
  const r = L(Array.from({ length: 1001 }, (_, i) => 'a' + i + ';b').join('\n'));
  assert.equal(r.zuViele, 1001); assert.equal(r.karten.length, 0);
  assert.equal(L(Array.from({ length: 1000 }, (_, i) => 'a' + i + ';b').join('\n')).karten.length, 1000);
});
fall('beide Spalten arabisch oder beide deutsch: nicht tauschen', () => {
  assert.equal(L('كِتَابٌ;كُتُبٌ').getauscht, false); assert.equal(L('Buch;book').getauscht, false);
});
fall('geschütztes Leerzeichen und Leerraum am Rand', () => {
  assert.equal(L('  كِتَابٌ ;  Buch  ').karten[0].uebersetzung, 'Buch');
});
console.log(n + ' Fälle grün');
