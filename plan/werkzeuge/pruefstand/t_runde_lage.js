/* 3.17.29 - Betreiber: "manchmal geht der Antwort-zeigen-Knopf unten ueber
   den Rand hinaus". Geht eine ganze Runde durch (alle faelligen Karten, dazu
   Karten mit langer Notiz / langer Antwort / Sorgenkind-Hinweis) und misst
   je Karte vor und nach dem Aufdecken:
   - liegt der Knopf ("Antwort zeigen" bzw. die Bewertungszeile) ganz im Bild?
   - laesst sich die Seite scrollen (scrollHeight > Bildhoehe)?
   - steht die Seite oben (scrollY)?
   node t_runde_lage.js */
const { start, neueSeite, aktion, vollerStore, tag } = require('./lib');
const GERAETE = {
  'iPhone 13 (390x844)': { width: 390, height: 844, touch: true, mobile: true },
  'iPhone SE (375x667)': { width: 375, height: 667, touch: true, mobile: true },
  'klein (360x640)': { width: 360, height: 640, touch: true, mobile: true },
  'iPhone Max (430x932)': { width: 430, height: 932, touch: true, mobile: true },
};
function store() {
  const s = vollerStore();
  const lang = 'Merksatz: ' + 'Das Wort steht im Buch in Lektion 3, Beispielsatz mit Erklaerung. '.repeat(5);
  s['users/u1/karten/k5'].extra = lang;                    // lange Notiz
  s['users/u1/karten/k6'].uebersetzung = 'ein sehr langer Uebersetzungstext, der ueber mehrere Zeilen geht und dabei die Karte hoch macht';
  s['users/u1/karten/k7'].extra = 'Kurz.\nZweite Zeile.\nDritte Zeile.\nVierte.';
  return s;
}
(async () => {
  const b = await start();
  let fehler = 0;
  for (const [name, vp] of Object.entries(GERAETE)) {
    const { p } = await neueSeite(b, vp, { store: store(), warte: 1500 });
    await aktion(p, 'start-session', null, 900);
    const befunde = [];
    for (let i = 0; i < 14; i++) {
      const m = async zustand => p.evaluate(z => {
        const knopf = z === 'zu' ? document.querySelector('.study-aufdecken') : document.querySelector('.grade-row');
        if (!knopf) return null;
        const r = knopf.getBoundingClientRect();
        return { unten: Math.round(r.bottom), bild: innerHeight, scroll: Math.round(scrollY),
          seite: document.documentElement.scrollHeight, wort: (document.querySelector('.study-word') || {}).textContent };
      }, zustand);
      const zu = await m('zu');
      if (!zu) break;
      await aktion(p, 'reveal', null, 700);
      const offen = await m('offen');
      for (const [z, w] of [['vorher', zu], ['nachher', offen]]) {
        if (!w) continue;
        const raus = w.unten > w.bild;
        const scrollt = w.seite > w.bild + 1;
        if (raus || scrollt || w.scroll) befunde.push('Karte ' + (i + 1) + ' ' + z + ': Knopf-Unterkante ' + w.unten + '/' + w.bild + (scrollt ? ', Seite ' + w.seite + ' hoch (scrollbar)' : '') + (w.scroll ? ', scrollY ' + w.scroll : ''));
      }
      await aktion(p, 'grade-known', null, 700);
    }
    fehler += befunde.length;
    console.log((befunde.length ? 'FEHL ' : 'OK   ') + name + (befunde.length ? '\n     ' + befunde.join('\n     ') : '') + (p.fehler.length ? ' | ' + p.fehler.join('|') : ''));
    await p.context().close();
  }
  await b.close();
  console.log(fehler ? fehler + ' Befunde' : 'alles ok');
  process.exit(fehler ? 1 : 0);
})();
