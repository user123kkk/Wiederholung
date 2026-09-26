/* G-036 (LERNEN-5 a): lernenHinweis() warnte bisher nur, wenn HEUTE UND
   GESTERN nicht gelernt wurde. serieAktuell() verzeiht aber immer die
   juengste Luecke (seitJoker faengt bei jedem Aufruf neu bei
   SERIE_JOKER_TAGE an) - eine AELTERE Luecke, die noch keine sieben
   gelernten Tage Abstand hat, beendet die Zaehlung schon beim naechsten
   Tag. Bisher kam die Warnung dann nicht: heute ist die Serie noch hoch
   (die juengste Luecke von heute/morgen wird ja verziehen), aber lässt man
   heute aus, bricht sie an der aelteren Luecke ab - der Verlust ist dann
   schon passiert.

   Seit 3.17.33 vergleicht die Bedingung stattdessen serieAktuell() heute
   mit serieAktuell({ versatz: 1 }) - also: wie die Serie MORGEN ohne
   heutige Runde aussaehe. Ist sie kleiner, wird gewarnt.

   Test wie t_serie.js: ECHTE app.js, kein Nachbau der Formel. Gelesen wird
   der Hinweistext auf dem Lernen-Tab (.hinweis). vollerStore() liefert
   faellige Karten (dueCards().length > 0), sonst kaeme die Warnung nie. */
const { start, neueSeite, vollerStore, tag, GERAETE } = require('./lib');

function verlaufAus(gelernteOffsets) {
  const v = {};
  for (const off of gelernteOffsets) v[tag(-off)] = { w: 1, n: 0 };
  return v;
}
function bereich(offsets) { const a = []; for (let i = offsets[0]; i <= offsets[1]; i++) a.push(i); return a; }

/* Wie in t_serie.js: sockelBis weit in der Vergangenheit haelt
   serieSockelSichern() aus der konstruierten Verlaufs-Geschichte heraus. */
const KEIN_SOCKEL = { sockel: 0, sockelBis: tag(-999) };

const FAELLE = [
  {
    name: 'a) 3 Tage gelernt, Luecke, 30 Tage gelernt, heute nichts - aeltere Luecke bricht morgen ab',
    verlauf: verlaufAus([1, 2, 3, ...bereich([5, 34])]),
    streak: KEIN_SOCKEL,
    warnung: true,
    zahl: 33
  },
  {
    name: 'b) 20 Tage ohne Luecke bis gestern, heute nichts - Normalfall, keine Warnung',
    verlauf: verlaufAus(bereich([1, 20])),
    streak: KEIN_SOCKEL,
    warnung: false
  },
  {
    name: 'c) gestern und heute nichts, davor 10 Tage - bisheriger Fall bleibt erfasst',
    verlauf: verlaufAus(bereich([2, 11])),
    streak: KEIN_SOCKEL,
    warnung: true,
    zahl: 10
  },
  {
    name: 'd) wie a), aber heute schon gelernt - keine Warnung',
    verlauf: verlaufAus([0, 1, 2, 3, ...bereich([5, 34])]),
    streak: KEIN_SOCKEL,
    warnung: false
  }
];

(async () => {
  const b = await start();
  let fehler = 0;
  for (const f of FAELLE) {
    const store = vollerStore();
    store['users/u1'].verlauf = f.verlauf;
    store['users/u1'].streak = f.streak;
    const { p } = await neueSeite(b, GERAETE.handy, { store, warte: 1200 });
    const info = await p.evaluate(() => {
      const serieEl = document.querySelector('.serie-zahl strong');
      const h = document.querySelector('.hinweis--serie .hinweis__text');
      return { serie: serieEl ? Number(serieEl.textContent) : 0, text: h ? h.textContent.trim() : null };
    });
    const hatWarnung = !!info.text;
    let ok = hatWarnung === f.warnung;
    let zahlOk = true;
    if (ok && f.warnung) {
      zahlOk = info.text.indexOf('Serie von ' + f.zahl + ' Tagen') !== -1;
      ok = ok && zahlOk;
    }
    if (!ok) fehler++;
    console.log((ok ? 'OK  ' : 'FEHL') + ' ' + f.name + ' | erwartet Warnung: ' + f.warnung +
      (f.warnung ? (' (' + f.zahl + ' Tage)') : '') + ' | gemessen: ' + (hatWarnung ? info.text : '(keine)') +
      ' | Serie ' + info.serie + (p.fehler.length ? ' | Konsole: ' + p.fehler.join(' / ') : ''));
    await p.context().close();
  }
  await b.close();
  console.log(fehler === 0 ? 'Alle Faelle richtig.' : (fehler + ' von ' + FAELLE.length + ' falsch.'));
  process.exit(fehler === 0 ? 0 : 1);
})();
