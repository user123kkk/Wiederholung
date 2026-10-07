/* 3.18.23 (Betreiber 06.10.2026): Eine Runde laeuft Bereich fuer Bereich weiter.
   Erst das Faellige des offenen Bereichs, dann - solange in der Rundengroesse Platz
   ist - die faelligen Wiederholungen der anderen Bereiche, ohne neue Karten und ohne
   Liegengebliebenes. Rueckgaengig nimmt auch den Schritt ueber die Bereichsgrenze
   zurueck; gespeichert wird je Karte in ihrem eigenen Bereich.
   --gegenprobe: Stand vor 3.18.23 (b45a13b), dort endet die Runde am Bereich. */
const assert = require('node:assert/strict');
const { start, tag } = require('./lib');
const { seiteMitApp, storeLesen } = require('./text_lib');
const alt = process.argv.includes('--gegenprobe');

/* bereiche: [{ id, name, karten: [{ id, stufe, spaet, neu }] }] */
function store(bereiche, limit) {
  const s = {};
  bereiche.forEach((b, bi) => {
    s['users/u1/bereiche/' + b.id] = { name: b.name, order: bi, gefuehrt: false, satzId: null, satzVersion: 0, sets: {} };
    b.karten.forEach((k, i) => {
      s['users/u1/karten/' + k.id] = { wort: 'w-' + k.id, uebersetzung: 'u-' + k.id, extra: '', stufe: k.stufe ?? 3, nextReview: tag(-(k.spaet || 0)),
        ersteBewertung: k.neu ? null : tag(-90), rueckfaelle: 0, quelleId: null, maxStufe: k.stufe ?? 3, order: i, bereichId: b.id };
    });
  });
  s['users/u1'] = { name: 'Test', schemaVersion: 2, settings: { arabGroesse: 'normal', thema: 'dunkel', sitzungsLimit: limit, lastBackup: tag(-1) },
    streak: { count: 1, beste: 1, sockel: 0, sockelBis: tag(-400) }, verlauf: {} };
  return s;
}
const n = (prefix, anzahl, mehr = {}) => Array.from({ length: anzahl }, (_, i) => ({ id: prefix + i, ...mehr }));
const DREI = () => [
  { id: 'b1', name: 'Medina', karten: n('a', 3) },
  { id: 'b2', name: 'Quran-Wörter', karten: [...n('b', 3), ...n('bneu', 2, { neu: true, stufe: 0 }), ...n('balt', 2, { spaet: 20 })] },
  { id: 'b3', name: 'Eigenes', karten: n('c', 2) }
];

async function oeffne(b, bereiche, limit) {
  return seiteMitApp(b, store(bereiche, limit), { commit: alt ? 'b45a13b' : null, zusatz: 'get ui(){return ui;}, get bereiche(){return bereiche;}, get verlauf(){return verlauf;},' });
}
const stand = p => p.evaluate(() => { const u = window.__PRUEF.ui, s = u.session; return {
  bereich: u.bereichId, kopf: (document.querySelector('.modebar__mitte, .modebar .mitte') || document.querySelector('.modebar') || {}).innerText || '',
  ende: !!document.querySelector('#app .ende'), endeText: (document.querySelector('#app .ende') || {}).innerText || '',
  total: s ? s.total : null, karte: s && s.queue[0] || null, rest: s && s.rest ? s.rest.map(a => a.bereichId + ':' + a.ids.length).join(',') : '' }; });
const klick = async (p, a, warte = 520) => { await p.evaluate(a => { const e = document.querySelector('#app [data-action="' + a + '"]'); if (!e) throw new Error('keine Aktion ' + a); e.click(); }, a); await p.waitForTimeout(warte); };
const bewerte = async (p, art = 'known') => { await klick(p, 'reveal', 520); await klick(p, 'grade-' + art, 560); };

(async () => {
  const b = await start();
  const fehler = [];
  const pruefe = (ok, text) => { console.log((ok ? 'OK   ' : (alt ? 'ALT  ' : 'FEHL ')) + text); if (!ok) fehler.push(text); };
  try {
    /* 1. Drei Bereiche, ohne Limit: 3 + 3 + 2, keine neuen, nichts Liegengebliebenes. */
    let { p, ctx } = await oeffne(b, DREI(), 'alle');
    try {
      /* 0. Der Lernen-Bildschirm zaehlt dasselbe wie die Runde und sagt, woher es kommt. */
      const lernen = await p.evaluate(() => ({ zahl: (document.querySelector('.stapel__zahl') || {}).innerText, text: document.getElementById('app').innerText.replace(/\s+/g, ' ') }));
      if (!alt) {
        pruefe(lernen.zahl === '8', '0 Lernen zeigt ' + lernen.zahl + ' faellig (soll 8, wie die Runde)');
        pruefe(/Mit dabei: Quran-Wörter \(3\), Eigenes \(2\)/.test(lernen.text), '0 Hinweis nennt die anderen Bereiche: "' + (lernen.text.match(/Mit dabei:[^.]{0,40}/) || [''])[0] + '"');
      }
      await klick(p, 'start-session', 700);
      let z = await stand(p);
      pruefe(z.total === 8, '1 Runde ueber drei Bereiche zaehlt ' + z.total + ' Karten (soll 8: 3+3+2, ohne neue und Liegengebliebene) | Rest ' + z.rest);
      if (alt) { await ctx.close(); throw { gegenprobe: true }; }
      pruefe(/Karte 1 von 8/.test(z.kopf), '1 Kopf zaehlt die ganze Runde: "' + z.kopf.replace(/\s+/g, ' ').trim() + '"');
      await bewerte(p); await bewerte(p);
      /* 2. "Nicht" bleibt im Bereich und kommt dort wieder. */
      await bewerte(p, 'unknown');
      z = await stand(p);
      pruefe(z.bereich === 'b1' && /^a/.test(z.karte), '2 nach "Nicht" weiter im ersten Bereich (' + z.bereich + ', Karte ' + z.karte + ')');
      await bewerte(p);
      z = await stand(p);
      pruefe(z.bereich === 'b2' && /^b\d/.test(z.karte), '3 nach dem letzten "Sicher" im ersten Bereich: weiter im zweiten (' + z.bereich + ', Karte ' + z.karte + ')');
      pruefe(/Quran-Wörter/.test(z.kopf), '3 Kopf nennt den neuen Bereich: "' + z.kopf.replace(/\s+/g, ' ').trim() + '"');
      /* 4. Rueckgaengig ueber die Grenze. */
      await klick(p, 'undo-grade', 600);
      z = await stand(p);
      const karteA = await p.evaluate(id => { const c = window.__PRUEF.bereiche.find(x => x.id === 'b1').karten.find(c => c.id === id); return c ? c.stufe + '/' + c.nextReview : null; }, z.karte);
      pruefe(z.bereich === 'b1' && /^a/.test(z.karte) && z.rest === 'b2:3,b3:2' && z.total === 8, '4 Rueckgaengig fuehrt in den ersten Bereich zurueck (' + z.bereich + ', Karte ' + z.karte + ', Rest ' + z.rest + ', Stand ' + karteA + ')');
      await klick(p, 'grade-known', 600);
      z = await stand(p);
      pruefe(z.bereich === 'b2', '4 danach wieder im zweiten Bereich (' + z.bereich + ')');
      for (let i = 0; i < 3; i++) await bewerte(p);
      z = await stand(p);
      pruefe(z.bereich === 'b3' && /Eigenes/.test(z.kopf), '5 dritter Bereich folgt (' + z.bereich + '), Kopf "' + z.kopf.replace(/\s+/g, ' ').trim() + '"');
      await bewerte(p); await bewerte(p);
      z = await stand(p);
      pruefe(z.ende && /Alle 8 Karten für heute durch/.test(z.endeText), '6 Rundenende: "' + z.endeText.split('\n').slice(0, 2).join(' | ') + '"');
      await p.waitForTimeout(600);
      const gespeichert = await storeLesen(p);
      const heute = tag(0);
      const weiter = id => gespeichert['users/u1/karten/' + id].nextReview > heute;
      const unberuehrt = id => gespeichert['users/u1/karten/' + id].nextReview <= heute;
      pruefe(['a0', 'a1', 'a2', 'b0', 'b1', 'b2', 'c0', 'c1'].every(weiter) && ['bneu0', 'bneu1', 'balt0', 'balt1'].every(unberuehrt),
        '7 gespeichert: alle acht Karten neu terminiert, neue und liegengebliebene Karten unberuehrt');
      pruefe(['a0', 'b0', 'c0'].every(id => gespeichert['users/u1/karten/' + id].bereichId === (id[0] === 'a' ? 'b1' : id[0] === 'b' ? 'b2' : 'b3')), '7 jede Karte bleibt in ihrem Bereich');
      const protokoll = await p.evaluate(t => window.__PRUEF.verlauf[t], heute);
      /* Neun Antworten: acht Karten, eine davon nach "Nicht" ein zweites Mal (jede Antwort zaehlt, wie in jeder Runde). */
      pruefe(protokoll && protokoll.w === 9, '7 Tagesprotokoll zaehlt 9 Antworten ueber alle drei Bereiche (' + JSON.stringify(protokoll) + ')');
      assert.deepEqual(p.fehler, []);
    } finally { await ctx.close().catch(() => {}); }

    /* 8. Limit 10: 7 im ersten, 7 im zweiten Bereich -> 7 + 3; danach "Weiterlernen" mit den uebrigen 4. */
    ({ p, ctx } = await oeffne(b, [{ id: 'b1', name: 'Medina', karten: n('a', 7) }, { id: 'b2', name: 'Quran-Wörter', karten: n('b', 7) }], 10));
    try {
      await klick(p, 'start-session', 700);
      let z = await stand(p);
      pruefe(z.total === 10 && z.rest === 'b2:3', '8 Limit 10 bei 7 + 7: Runde ' + z.total + ', Rest ' + z.rest);
      for (let i = 0; i < 10; i++) await bewerte(p);
      z = await stand(p);
      pruefe(z.ende && /noch 4 Karten offen/.test(z.endeText.replace(/\s+/g, ' ')), '8 Rundenende nennt die offenen 4: "' + z.endeText.replace(/\s+/g, ' ').slice(0, 90) + '"');
      await klick(p, 'start-session', 700);
      z = await stand(p);
      pruefe(z.total === 4 && z.bereich === 'b2', '8 Weiterlernen: ' + z.total + ' Karten im zweiten Bereich (' + z.bereich + ')');
      assert.deepEqual(p.fehler, []);
    } finally { await ctx.close(); }

    /* 9. Limit genau am Bereichsende: 10 + 4 -> Runde 10, danach Weiterlernen startet im anderen Bereich. */
    ({ p, ctx } = await oeffne(b, [{ id: 'b1', name: 'Medina', karten: n('a', 10) }, { id: 'b2', name: 'Quran-Wörter', karten: n('b', 4) }], 10));
    try {
      await klick(p, 'start-session', 700);
      for (let i = 0; i < 10; i++) await bewerte(p);
      let z = await stand(p);
      pruefe(z.ende && z.bereich === 'b1' && /noch 4 Karten offen/.test(z.endeText.replace(/\s+/g, ' ')), '9 Ende im ersten Bereich, 4 im anderen offen');
      await klick(p, 'start-session', 700);
      z = await stand(p);
      pruefe(z.total === 4 && z.bereich === 'b2', '9 Weiterlernen wechselt in den Bereich mit den offenen Karten (' + z.bereich + ', ' + z.total + ')');
      assert.deepEqual(p.fehler, []);
    } finally { await ctx.close(); }

    /* 11. Im offenen Bereich ist nichts faellig, in einem anderen schon: derselbe Stapel, derselbe Knopf. */
    ({ p, ctx } = await oeffne(b, [{ id: 'b1', name: 'Medina', karten: n('a', 3, { spaet: -5 }) }, { id: 'b2', name: 'Quran-Wörter', karten: n('b', 4) }], 'alle'));
    try {
      const lernen = await p.evaluate(() => ({ zahl: (document.querySelector('.stapel__zahl') || {}).innerText, knopf: !!document.querySelector('#app [data-action="start-session"]'),
        fertig: !!document.querySelector('.stapel--fertig') }));
      pruefe(lernen.zahl === '4' && lernen.knopf && !lernen.fertig, '11 offener Bereich leer, anderer mit 4: Stapel zeigt ' + lernen.zahl + ', Startknopf ' + lernen.knopf);
      await klick(p, 'start-session', 700);
      const z = await stand(p);
      pruefe(z.total === 4 && z.bereich === 'b2', '11 Runde startet im Bereich mit den faelligen Karten (' + z.bereich + ', ' + z.total + ')');
      assert.deepEqual(p.fehler, []);
    } finally { await ctx.close(); }

    /* 12. Nirgends etwas faellig: der ruhige Zustand wie bisher. */
    ({ p, ctx } = await oeffne(b, [{ id: 'b1', name: 'Medina', karten: n('a', 3, { spaet: -5 }) }, { id: 'b2', name: 'Quran-Wörter', karten: n('b', 2, { spaet: -3 }) }], 'alle'));
    try {
      const lernen = await p.evaluate(() => ({ fertig: !!document.querySelector('.stapel--fertig'), knopf: !!document.querySelector('#app [data-action="start-session"]') }));
      pruefe(lernen.fertig && !lernen.knopf, '12 nichts faellig: ruhiger Zustand, kein Startknopf');
      assert.deepEqual(p.fehler, []);
    } finally { await ctx.close(); }

    /* 10. Ein einzelner Bereich: alles wie bisher. */
    ({ p, ctx } = await oeffne(b, [{ id: 'b1', name: 'Medina', karten: [...n('a', 4), ...n('aneu', 2, { neu: true, stufe: 0 })] }], 'alle'));
    try {
      await klick(p, 'start-session', 700);
      const z = await stand(p);
      pruefe(z.total === 6 && z.rest === '', '10 ein Bereich: ' + z.total + ' Karten (4 Wiederholungen + 2 neue), kein Rest');
      assert.deepEqual(p.fehler, []);
    } finally { await ctx.close(); }
  } catch (e) { if (!e.gegenprobe) throw e; } finally { await b.close(); }
  if (alt) {
    const schlaegtAn = fehler.some(t => t.startsWith('1 '));
    console.log(schlaegtAn ? 'Gegenprobe: alter Stand bleibt im Bereich (Fall 1 schlaegt an)' : 'Gegenprobe schlaegt NICHT an');
    process.exitCode = schlaegtAn ? 0 : 1;
  } else {
    console.log(fehler.length ? fehler.length + ' Fehler' : 'ok');
    process.exitCode = fehler.length ? 1 : 0;
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
