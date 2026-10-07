/* 3.18.22 (E-05 / LERNEN-4, Betreiber 06.10.2026 "reihenfolge ja"): Welche Karten
   kommen in eine begrenzte Runde? Zuerst, was im Verhaeltnis zum eigenen Abstand
   am wenigsten ueberfaellig ist; bei Gleichstand der kuerzere Abstand; neue Karten
   danach. Ohne Limit aendert sich nichts.
   Abstaende je Stufe (1,8 hoch Stufe-1, gerundet): 1:1  2:2  3:3  4:6  5:10  8:61 Tage.
   --gegenprobe: Stand vor 3.18.22 (8ac38a8), dort kommen die ersten der Liste. */
const assert = require('node:assert/strict');
const { start, tag } = require('./lib');
const { seiteMitApp } = require('./text_lib');
const alt = process.argv.includes('--gegenprobe');

/* Bereich mit genau den genannten Karten; order = Reihenfolge in der Liste. */
function store(karten, limit) {
  const s = {};
  s['users/u1/bereiche/b1'] = { name: 'Probe', order: 0, gefuehrt: false, satzId: null, satzVersion: 0, sets: {} };
  karten.forEach((k, i) => {
    s['users/u1/karten/' + k.id] = { wort: 'w' + k.id, uebersetzung: 'u' + k.id, extra: '', stufe: k.stufe, nextReview: tag(-(k.spaet || 0)),
      ersteBewertung: k.neu ? null : tag(-90), rueckfaelle: 0, quelleId: null, maxStufe: k.stufe, order: i, bereichId: 'b1' };
  });
  s['users/u1'] = { name: 'Test', schemaVersion: 2, settings: { arabGroesse: 'normal', thema: 'dunkel', sitzungsLimit: limit, lastBackup: tag(-1) },
    streak: { count: 1, beste: 1, sockel: 0, sockelBis: tag(-400) }, verlauf: {} };
  return s;
}
const reihe = (prefix, n, stufe, spaet, neu) => Array.from({ length: n }, (_, i) => ({ id: prefix + i, stufe, spaet, neu }));

async function runde(b, karten, limit) {
  const { p, ctx } = await seiteMitApp(b, store(karten, limit), { commit: alt ? '8ac38a8' : null, zusatz: 'get ui(){return ui;}, startSession,' });
  try {
    await p.evaluate(() => { window.__PRUEF.startSession(); });
    await p.waitForTimeout(300);
    const ids = await p.evaluate(() => [...window.__PRUEF.ui.session.queue]);
    assert.deepEqual(p.fehler, []);
    return ids;
  } finally { await ctx.close(); }
}
const zaehle = (ids, prefix) => ids.filter(i => i.startsWith(prefix)).length;

(async () => {
  const b = await start();
  const befunde = [];
  const pruefe = (ok, text) => { console.log((ok ? 'OK   ' : (alt ? 'ALT  ' : 'FEHL ')) + text); if (!ok) befunde.push(text); };
  try {
    /* 1. Alltag: 15 heute faellig, Limit 10. In der Liste stehen die festen zuerst. */
    let ids = await runde(b, [...reihe('fest', 5, 8, 0), ...reihe('mittel', 5, 4, 0), ...reihe('frisch', 5, 1, 0)], 10);
    pruefe(ids.length === 10 && zaehle(ids, 'frisch') === 5 && zaehle(ids, 'mittel') === 5 && zaehle(ids, 'fest') === 0,
      '1 Alltag, alle heute faellig: frisch ' + zaehle(ids, 'frisch') + '/5, mittel ' + zaehle(ids, 'mittel') + '/5, fest ' + zaehle(ids, 'fest') + ' (soll 5/5/0)');

    /* 2. Nach 60 Tagen Pause: 10 mit Abstand 2, 10 mit Abstand 10, 10 mit Abstand 61; Limit 10. */
    ids = await runde(b, [...reihe('kurz', 10, 2, 60), ...reihe('mittel', 10, 5, 60), ...reihe('fest', 10, 8, 60)], 10);
    pruefe(ids.length === 10 && zaehle(ids, 'fest') === 10,
      '2 nach 60 Tagen Pause: fest ' + zaehle(ids, 'fest') + ', mittel ' + zaehle(ids, 'mittel') + ', kurz ' + zaehle(ids, 'kurz') + ' (soll 10/0/0)');

    /* 3. Fall aus LERNEN-4: oben 10 heute faellige, darunter 20 seit 20-58 Tagen ueberfaellige, alle Stufe 3. */
    const alte = Array.from({ length: 20 }, (_, i) => ({ id: 'alt' + i, stufe: 3, spaet: 20 + i * 2 }));
    ids = await runde(b, [...reihe('heute', 10, 3, 0), ...alte], 10);
    pruefe(ids.length === 10 && zaehle(ids, 'heute') === 10,
      '3 LERNEN-4, heute faellig vor lange ueberfaellig: heute ' + zaehle(ids, 'heute') + ', alt ' + zaehle(ids, 'alt') + ' (soll 10/0)');

    /* 4. Dieselben lange ueberfaelligen ohne frische: die am wenigsten ueberfaelligen zuerst (alt0-alt9). */
    ids = await runde(b, [...alte].reverse(), 10);
    const juengste = ids.filter(i => +i.slice(3) < 10).length;
    pruefe(ids.length === 10 && juengste === 10, '4 nur ueberfaellige, umgekehrt in der Liste: die zehn am wenigsten ueberfaelligen ' + juengste + '/10');

    /* 5. Neue Karten bleiben hinter den Wiederholungen. */
    ids = await runde(b, [...reihe('neu', 8, 0, 0, true), ...reihe('wdh', 6, 2, 3)], 10);
    pruefe(ids.length === 10 && zaehle(ids, 'wdh') === 6 && zaehle(ids, 'neu') === 4, '5 neue hinter Wiederholungen: wdh ' + zaehle(ids, 'wdh') + '/6, neu ' + zaehle(ids, 'neu') + ' (soll 6/4)');

    /* 6. Ohne Limit ("alle") und wenn alles hineinpasst: dieselbe Menge wie bisher. */
    ids = await runde(b, [...reihe('fest', 5, 8, 0), ...reihe('frisch', 5, 1, 0)], 'alle');
    pruefe(ids.length === 10, '6 ohne Limit: alle ' + ids.length + '/10 in der Runde');
    ids = await runde(b, [...reihe('fest', 5, 8, 0), ...reihe('frisch', 3, 1, 0)], 10);
    pruefe(ids.length === 8, '6 Limit groesser als faellig: ' + ids.length + '/8 in der Runde');
  } finally { await b.close(); }
  if (alt) {
    /* Der alte Stand muss an Fall 1, 2 und 4 scheitern (er nimmt die ersten der Liste). */
    const erwartet = ['1 ', '2 ', '4 '].every(n => befunde.some(t => t.startsWith(n)));
    console.log(erwartet ? 'Gegenprobe: alter Stand nimmt die ersten der Liste (Faelle 1, 2, 4 schlagen an)' : 'Gegenprobe schlaegt NICHT an');
    process.exitCode = erwartet ? 0 : 1;
  } else {
    console.log(befunde.length ? befunde.length + ' Fehler' : 'ok');
    process.exitCode = befunde.length ? 1 : 0;
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
