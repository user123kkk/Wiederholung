/* Paket G0: Schnelltests für den rechnenden Kern der Lernlogik (Lerntag,
   Abstände, Bewertungsregel). Ohne Browser: node t_lernlogik.js
   Der Block wird zwischen den Marken //LERNLOGIK-ANFANG und //LERNLOGIK-ENDE
   aus app.js gelesen und mit einer festen Uhr und festem Zufall ausgeführt.
   Diese Tests halten den HEUTIGEN Stand fest. Wer die Lernlogik ändert
   (Paket G), ändert hier bewusst die Erwartung und nennt die Entscheidung. */
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const quelle = fs.readFileSync(path.resolve(__dirname, '../../../app.js'), 'utf8');
const a = quelle.indexOf('//LERNLOGIK-ANFANG'), e = quelle.indexOf('//LERNLOGIK-ENDE');
assert.ok(a > 0 && e > a, 'Marken um die Lernlogik nicht gefunden');
const block = quelle.slice(a, e);
assert.ok(!/\b(ui|document|window|app|bereiche|verlauf|localStorage)\b\s*[.\[]/.test(block.replace(/\/\*[\s\S]*?\*\//g, '')),
  'Der Lernlogik-Block darf weder Zustand noch Bildschirm anfassen');

/* Feste Uhr und fester Zufall. jetzt = lokale Zeit als "JJJJ-MM-TTTHH:MM". */
function kern(jetzt, zufall = 0.5) {
  const Echt = Date;
  const fest = new Echt(jetzt + ':00').getTime();
  class Uhr extends Echt { constructor(...x) { if (x.length) super(...x); else super(fest); } static now() { return fest; } }
  const Zufall = Object.create(Math); Zufall.random = () => zufall;
  return new Function('Date', 'Math', block +
    '\nreturn { fmtDate, logicalToday, todayStr, dateInDays, intervalForStufe, nextReviewForStufe, bewertungAnwenden, MAX_STUFE, MAX_INTERVAL_DAYS, DAY_START_HOUR };')(Uhr, Zufall);
}
const karte = (stufe, mehr = {}) => ({ stufe, nextReview: '2026-01-01', maxStufe: stufe, rueckfaelle: 0, ...mehr });
let n = 0;
function fall(name, tun) { tun(); n++; console.log('grün: ' + name); }

fall('Abstände je Stufe (Tabelle)', () => {
  const k = kern('2026-10-08T12:00');
  assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(k.intervalForStufe), [1, 2, 3, 6, 10, 19, 34, 61, 110, 180, 180, 180]);
  assert.equal(k.intervalForStufe(0), 1, 'Stufe 0 rechnet wie Stufe 1');
  assert.equal(k.intervalForStufe(99), 180, 'über dem Deckel bleibt der Deckel');
  assert.equal(k.MAX_STUFE, 12); assert.equal(k.MAX_INTERVAL_DAYS, 180);
});
fall('Lerntag beginnt um 4 Uhr', () => {
  assert.equal(kern('2026-10-08T03:59').todayStr(), '2026-10-07');
  assert.equal(kern('2026-10-08T04:00').todayStr(), '2026-10-08');
  assert.equal(kern('2026-10-08T23:59').todayStr(), '2026-10-08');
  assert.equal(kern('2026-10-08T00:00').todayStr(), '2026-10-07');
  assert.equal(kern('2026-10-08T03:59').dateInDays(1), '2026-10-08');
});
fall('dateInDays über Monats- und Jahresgrenze', () => {
  const k = kern('2026-12-31T12:00');
  assert.equal(k.dateInDays(1), '2027-01-01'); assert.equal(k.dateInDays(-31), '2026-11-30'); assert.equal(k.dateInDays(0), '2026-12-31');
});
fall('Sicher: eine Stufe hoch, Termin nach dem Abstand der neuen Stufe', () => {
  const k = kern('2026-10-08T12:00', 0.5);            // Zufall 0,5 = keine Streuung
  const c = karte(0, { maxStufe: 0 }); k.bewertungAnwenden(c, 'known');
  assert.deepEqual([c.stufe, c.nextReview, c.maxStufe, c.rueckfaelle], [1, '2026-10-09', 1, 0]);
  const d = karte(4); k.bewertungAnwenden(d, 'known');
  assert.deepEqual([d.stufe, d.nextReview], [5, k.dateInDays(10)]);
  const o = karte(12); k.bewertungAnwenden(o, 'known');
  assert.deepEqual([o.stufe, o.nextReview], [12, k.dateInDays(180)], 'oberste Stufe bleibt, Deckel 180 Tage');
});
fall('Streuung: höchstens 15 Prozent, nie über 180, nie unter 1 Tag', () => {
  const unten = kern('2026-10-08T12:00', 0), oben = kern('2026-10-08T12:00', 0.999999);
  const tage = (k, stufe) => { const c = karte(stufe - 1); k.bewertungAnwenden(c, 'known'); return Math.round((new Date(c.nextReview + 'T12:00:00') - new Date('2026-10-08T12:00:00')) / 86400000); };
  assert.deepEqual([tage(unten, 8), tage(oben, 8)], [52, 70], 'Stufe 8: 61 Tage, minus 9 bis plus 9');
  assert.deepEqual([tage(unten, 1), tage(oben, 1)], [1, 1], 'ein Tag streut nicht');
  assert.deepEqual([tage(unten, 3), tage(oben, 3)], [3, 3], 'drei Tage streuen nicht (0,45 rundet auf 0)');
  assert.equal(tage(oben, 12), 180, 'oben gekappt'); assert.equal(tage(unten, 12), 153, 'unten streut es weiter');
});
fall('Fast: eine Stufe zurück, morgen', () => {
  const k = kern('2026-10-08T12:00');
  const c = karte(5, { rueckfaelle: 2 }); k.bewertungAnwenden(c, 'almost');
  assert.deepEqual([c.stufe, c.nextReview, c.maxStufe, c.rueckfaelle], [4, '2026-10-09', 5, 2]);
  const u = karte(0); k.bewertungAnwenden(u, 'almost'); assert.equal(u.stufe, 0, 'nicht unter 0');
});
fall('Nicht: zwei Stufen zurück, heute; Rückfall nur nach erstem Wissen', () => {
  const k = kern('2026-10-08T12:00');
  const c = karte(5); k.bewertungAnwenden(c, 'unknown');
  assert.deepEqual([c.stufe, c.nextReview, c.maxStufe, c.rueckfaelle], [3, '2026-10-08', 5, 1]);
  const neu = karte(0, { maxStufe: 0 }); k.bewertungAnwenden(neu, 'unknown');
  assert.deepEqual([neu.stufe, neu.rueckfaelle], [0, 0], 'neue Karte: kein Rückfall');
  const eins = karte(1); k.bewertungAnwenden(eins, 'unknown'); assert.equal(eins.stufe, 0);
});
fall('Regler (Probelauf): Faktor kürzt den Abstand, nie unter einen Tag', () => {
  const k = kern('2026-10-08T12:00', 0.5);
  const c = karte(4); k.bewertungAnwenden(c, 'known', 0.5); assert.equal(c.nextReview, k.dateInDays(5));
  const d = karte(0); k.bewertungAnwenden(d, 'known', 0.1); assert.equal(d.nextReview, k.dateInDays(1));
  const o = karte(4); k.bewertungAnwenden(o, 'known', 1); assert.equal(o.nextReview, k.dateInDays(10), 'Faktor 1 = ohne Regler');
});
fall('IST-Stand vor Paket G (Frage 7): „Nicht“ dann „Sicher“ gibt sofort den vollen Abstand', () => {
  const k = kern('2026-10-08T12:00', 0.5);
  const c = karte(8); k.bewertungAnwenden(c, 'unknown'); k.bewertungAnwenden(c, 'known');
  assert.deepEqual([c.stufe, c.nextReview], [7, k.dateInDays(34)], 'heute: Stufe 7, 34 Tage – das ändert Paket G');
});
fall('Paket G, Frage 7: „Sicher“ nach „Nicht“ in derselben Runde hebt die Stufe nicht, Karte kommt morgen', () => {
  const k = kern('2026-10-08T12:00', 0.999999);
  const c = karte(8); k.bewertungAnwenden(c, 'unknown'); k.bewertungAnwenden(c, 'known', undefined, true);
  assert.deepEqual([c.stufe, c.nextReview, c.maxStufe, c.rueckfaelle], [6, '2026-10-09', 8, 1]);
  const o = karte(12); k.bewertungAnwenden(o, 'unknown'); k.bewertungAnwenden(o, 'known', undefined, true);
  assert.deepEqual([o.stufe, o.nextReview], [10, '2026-10-09'], 'oberste Stufe: morgen statt nach Monaten');
  const neu = karte(0, { maxStufe: 0 }); k.bewertungAnwenden(neu, 'unknown'); k.bewertungAnwenden(neu, 'known', undefined, true);
  assert.deepEqual([neu.stufe, neu.nextReview, neu.rueckfaelle], [0, '2026-10-09', 0], 'neue Karte bleibt auf 0 und kommt morgen');
  // Am nächsten Tag ohne Rückfall steigt sie wieder normal
  const morgen = kern('2026-10-09T12:00', 0.5); morgen.bewertungAnwenden(c, 'known');
  assert.deepEqual([c.stufe, c.nextReview], [7, morgen.dateInDays(34)]);
  // „Fast“ und „Nicht“ nach „Nicht“ bleiben wie immer
  const f = karte(5); k.bewertungAnwenden(f, 'almost', undefined, true); assert.deepEqual([f.stufe, f.nextReview], [4, '2026-10-09']);
  const x = karte(5); k.bewertungAnwenden(x, 'unknown', undefined, true); assert.deepEqual([x.stufe, x.nextReview], [3, '2026-10-08']);
});
fall('Paket G, Frage 9: neue Karte – erstes „Sicher“ hebt nicht, bleibt heute fällig; zweites bringt Stufe 1 und morgen', () => {
  const k = kern('2026-10-08T12:00', 0.5);
  const c = karte(0, { maxStufe: 0 });
  k.bewertungAnwenden(c, 'known', undefined, false, true);
  assert.deepEqual([c.stufe, c.nextReview, c.maxStufe, c.rueckfaelle], [0, '2026-10-08', 0, 0]);
  k.bewertungAnwenden(c, 'known', undefined, false, false);
  assert.deepEqual([c.stufe, c.nextReview, c.maxStufe], [1, '2026-10-09', 1]);
  // „Fast“ und „Nicht“ bei einer neuen Karte bleiben wie immer
  const f = karte(0, { maxStufe: 0 }); k.bewertungAnwenden(f, 'almost', undefined, false, true); assert.deepEqual([f.stufe, f.nextReview], [0, '2026-10-09']);
  const x = karte(0, { maxStufe: 0 }); k.bewertungAnwenden(x, 'unknown', undefined, false, true); assert.deepEqual([x.stufe, x.nextReview, x.rueckfaelle], [0, '2026-10-08', 0]);
});
fall('Bewertung nach Mitternacht zählt zum Vortag', () => {
  const k = kern('2026-10-09T00:30');
  const c = karte(3); k.bewertungAnwenden(c, 'unknown'); assert.equal(c.nextReview, '2026-10-08');
  const f = karte(3); k.bewertungAnwenden(f, 'almost'); assert.equal(f.nextReview, '2026-10-09');
});
console.log(n + ' Fälle grün');
