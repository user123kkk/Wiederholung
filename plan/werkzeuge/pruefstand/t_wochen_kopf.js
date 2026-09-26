/* REST-4 (3.17.34): "0 Antworten diese Woche" + rote "-100 %"-Pille nach
   einer Pause - eine Zahl, die Stillstand liest, und "diese Woche"/"Vorwoche"
   ist ohnehin nur eine rollende 7-Tage-Summe (verlaufSumme(7) /
   verlaufSummeSpanne(7,14)), keine Kalenderwoche.

   Vorbild fuer das Pause-Szenario: rest_check2.js Teil 3.
   Geprueft ueber die ECHTE app.js (kein Nachbau der Formel), Anzeige auf dem
   Fortschritts-Tab (.stat-block) gelesen. */
const { start, neueSeite, aktion, GERAETE, vollerStore, tag } = require('./lib');

const KEIN_SOCKEL = { sockel: 0, sockelBis: tag(-999) };

function bereich(offsets) { const a = []; for (let i = offsets[0]; i <= offsets[1]; i++) a.push(i); return a; }
function verlaufAus(gelernteOffsets, je = { w: 5, n: 1 }) {
  const v = {};
  for (const off of gelernteOffsets) v[tag(-off)] = { w: je.w, n: je.n };
  return v;
}

const FAELLE = [
  {
    name: 'a) nur vor 8-13 Tagen gelernt - Pause seit einer Woche',
    verlauf: verlaufAus(bereich([8, 13]), { w: 10, n: 1 }),
    erwartet: { kopf: false, pill: false, satz: true, zahl: false }
  },
  {
    name: 'b) letzte 7 Tage UND 8-13 Tage davor',
    verlauf: Object.assign(verlaufAus(bereich([0, 6]), { w: 5, n: 1 }), verlaufAus(bereich([8, 13]), { w: 5, n: 1 })),
    erwartet: { kopf: true, pill: true, satz: false, zahl: true }
  },
  {
    name: 'c) nur letzte 7 Tage, nichts davor',
    verlauf: verlaufAus(bereich([0, 6]), { w: 5, n: 1 }),
    erwartet: { kopf: true, pill: false, satz: false, zahl: true }
  },
  {
    name: 'd) gar kein Verlauf',
    verlauf: {},
    erwartet: { kopf: false, pill: false, satz: false, zahl: false }
  }
];

(async () => {
  const b = await start();
  let fehler = 0;
  for (const f of FAELLE) {
    const st = vollerStore();
    st['users/u1'].verlauf = f.verlauf;
    st['users/u1'].streak = KEIN_SOCKEL;
    const { p } = await neueSeite(b, GERAETE.handy, { store: st });
    await aktion(p, 'tab-fortschritt', null, 1500);

    const stand = await p.evaluate(() => {
      const block = document.querySelector('.stat-block');
      const kal = document.querySelector('.kal');
      return {
        text: block ? block.innerText.replace(/\s+/g, ' ').trim() : null,
        grossZahl: !!(block && block.querySelector('.gross-zahl')),
        pill: !!(block && block.querySelector('.trend-pill')),
        satz: !!(block && [...block.querySelectorAll('.stat-sub')].some(e => e.textContent.includes('noch keine Antwort'))),
        kalTop: kal ? kal.getBoundingClientRect().top : null
      };
    });

    console.log('---', f.name);
    console.log('   Text:', stand.text);
    console.log('   Kalender-Lage (top):', stand.kalTop);

    const pruef = (bez, ist, soll) => {
      const ok = ist === soll;
      if (!ok) fehler++;
      console.log('  ', ok ? 'OK  ' : 'FEHL', bez, '- erwartet', soll, '- ist', ist);
    };
    pruef('grosse Zahl (.gross-zahl)', stand.grossZahl, f.erwartet.zahl);
    pruef('Trend-Pille (.trend-pill)', stand.pill, f.erwartet.pill);
    pruef('Pause-Satz (.stat-sub "noch keine Antwort")', stand.satz, f.erwartet.satz);
    if (f.erwartet.zahl) {
      pruef('Beschriftung "in den letzten 7 Tagen"', stand.text.includes('in den letzten 7 Tagen'), true);
      pruef('kein "diese Woche" im Text', stand.text.includes('diese Woche'), false);
    }
    if (f.erwartet.pill) {
      pruef('Pillentext "zu den 7 Tagen davor"', stand.text.includes('zu den 7 Tagen davor'), true);
      pruef('kein "zur Vorwoche" im Text', stand.text.includes('zur Vorwoche'), false);
    }
    await p.context().close();
  }
  await b.close();
  if (fehler) { console.log('\nFEHLGESCHLAGEN:', fehler); process.exit(1); }
  console.log('\nAlle Pruefungen OK.');
})();
