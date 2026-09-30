/* Stufe 4 (WIEDERHOLEN.md § 2, § 9): jede Zeile der Uebergangstabelle.
   neu -> frisch(0) steht in t_text_neu / t_text_anlegen; hier:
   - frisch(k) sicher -> k+1, morgen; bei 7 -> fest, 2099-12-31
   - frisch(k) gehakt -> 0, morgen, Rueckfaelle unveraendert
   - fest sicher -> bleibt (keine Aenderung)
   - fest gehakt -> frisch(0), morgen, Rueckfaelle + 1
   - maxStufe waechst mit, faellt nie
   - verpasster Tag: frische Zeile bleibt faellig (nextReview in der
     Vergangenheit ist faellig), nichts wird veraendert
   --gegenprobe: fest gehakt ohne Rueckfall-Zaehler muss rot werden. */
const { logikLaden } = require('./text_lib');
const gegenprobe = process.argv.includes('--gegenprobe');
const L = logikLaden({ ersetze: gegenprobe ? [['rueckfaelle: (z.rueckfaelle || 0) + 1', 'rueckfaelle: z.rueckfaelle || 0']] : [] });
const fehler = [];
const pruefe = (ok, t) => { if (!ok) fehler.push(t); };
const H = '2026-10-01', M = '2026-10-02';
const z = (stufe, extra = {}) => ({ id: 'a', wort: 'x', stufe, ersteBewertung: '2026-09-01', nextReview: H, rueckfaelle: 2, maxStufe: stufe, ...extra });

for (let k = 0; k < 6; k++) {
  const n = L.zeileNachAntwort(z(k), true, H, M);
  pruefe(n.stufe === k + 1 && n.nextReview === M && n.maxStufe === k + 1, 'frisch ' + k + ' sicher: ' + JSON.stringify(n));
}
let n = L.zeileNachAntwort(z(6), true, H, M);
pruefe(n.stufe === 7 && n.nextReview === L.TEXT_FEST_DATUM && L.zeilenZustand({ ...z(6), ...n }) === 'fest', 'frisch 6 sicher -> fest: ' + JSON.stringify(n));
n = L.zeileNachAntwort(z(4), false, H, M);
pruefe(n.stufe === 0 && n.nextReview === M && n.rueckfaelle === 2 && n.maxStufe === 4, 'frisch 4 gehakt: ' + JSON.stringify(n));
n = L.zeileNachAntwort(z(7, { nextReview: '2099-12-31' }), true, H, M);
pruefe(n === null, 'fest sicher: Aenderung ' + JSON.stringify(n));
n = L.zeileNachAntwort(z(7, { nextReview: '2099-12-31' }), false, H, M);
pruefe(n && n.stufe === 0 && n.nextReview === M && n.rueckfaelle === 3 && n.maxStufe === 7, 'fest gehakt: ' + JSON.stringify(n));
// verpasster Tag
const alt = [z(2, { nextReview: '2026-09-25' })];
const bl = L.frischBloecke(alt, H);
pruefe(bl.length === 1, 'verpasster Tag: frische Zeile nicht faellig');

if (gegenprobe) {
  console.log(fehler.length ? 'Gegenprobe wie erwartet rot (' + fehler[0] + ')' : 'FEHLER Gegenprobe: keine Befunde');
  process.exitCode = fehler.length ? 0 : 1;
} else {
  console.log(fehler.length ? 'ROT:\n  ' + fehler.join('\n  ') : 'OK: alle Uebergaenge aus WIEDERHOLEN.md § 2');
  process.exitCode = fehler.length ? 1 : 0;
}
