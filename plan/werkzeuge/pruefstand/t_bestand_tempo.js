/* LERNEN-Audit: grosse Bestaende - Dauer je Bewertung (lange Aufgaben) bei
   N Karten, gefuehrter Bereich mit vielen Lektionen, CPU 4x gedrosselt. */
const P = './';
const { start, neueSeite, GERAETE, tag } = require(P + 'lib');
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const assert = require('node:assert/strict');
const quelle = process.env.PRUEF_ALT
  ? execFileSync('git', ['show', '637995c:app.js'], { cwd:path.join(__dirname, '../../..'), maxBuffer:1 << 24 }).toString()
  : fs.readFileSync(path.join(__dirname, '../../../app.js'), 'utf8');
// Separat messen: App-Arbeit und lange Aufgaben inklusive Firebase-Attrappe.
const messung = `\nwindow.__appZeit = [];
for (const name of ['gradeCard','render','datenZusammenbauen','bereicheAusSammlungen','offeneLektionIds']) {
  const original = eval(name);
  eval(name + ' = function(...args) { const t=performance.now(); try { return original(...args); } finally { window.__appZeit.push({name,ms:performance.now()-t}); } }');
}`;

function store(n, lektionen, gefuehrt) {
  const s = {};
  const ids = [];
  for (let i = 0; i < n; i++) {
    const id = 'k' + i; ids.push(id);
    s['users/u1/karten/' + id] = { wort: 'كَلِمَةٌ ' + i, uebersetzung: 'Wort ' + i, extra: i % 5 ? '' : 'Notiz '.repeat(20), stufe: 3, maxStufe: 3,
      nextReview: i % 10 === 0 ? tag(0) : tag(1 + (i % 50)), ersteBewertung: tag(-100), rueckfaelle: 0, quelleId: null, order: i, bereichId: 'b1' };
  }
  const sets = {};
  const pro = Math.ceil(n / lektionen);
  for (let l = 0; l < lektionen; l++) sets['s' + l] = { name: 'Lektion ' + (l + 1), order: l, art: 'lektion', quelleId: null, cardIds: ids.slice(l * pro, (l + 1) * pro) };
  s['users/u1/bereiche/b1'] = { name: 'Gross', order: 0, gefuehrt, satzId: gefuehrt ? 'x' : null, satzVersion: 1, sets };
  const v = {}; for (let i = 1; i < 60; i++) v[tag(-i)] = { w: 20, n: 2 };
  s['users/u1'] = { name: 'T', schemaVersion: 2, settings: { arabGroesse: 'normal', thema: 'dunkel', sitzungsLimit: 'alle', lastBackup: tag(0) },
    streak: { sockel: 0, sockelBis: tag(-999), beste: 0 }, verlauf: v };
  return s;
}

(async () => {
  const b = await start();
  try {
  for (const [n, lek, gef] of [[300, 15, true], [1000, 50, true], [3000, 150, true], [3000, 150, false], [6000, 300, true]]) {
    if (process.env.PRUEF_KARTEN && n !== Number(process.env.PRUEF_KARTEN)) continue;
    const { ctx, p } = await neueSeite(b, GERAETE.handy, { store: store(n, lek, gef), warte: 2500,
      vorher: ctx => ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/app.js'),
        r => r.fulfill({contentType:'text/javascript', body:quelle + messung})) });
    const cdp = await ctx.newCDPSession(p);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await p.evaluate(() => { window.__lt = []; new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lt.push(e.duration); }).observe({ type: 'longtask', buffered: false }); });
    const t0 = Date.now();
    await p.evaluate(() => { const e = document.querySelector('[data-action="start-session"]'); if (e) e.click(); });
    await p.waitForTimeout(1200);
    const startLt = await p.evaluate(() => { const a = window.__lt; window.__lt = []; return a; });
    const proBewertung = [];
    for (let i = 0; i < 5; i++) {
      await p.keyboard.press('Space'); await p.waitForTimeout(500);
      await p.evaluate(() => { window.__lt = []; window.__appZeit = []; });
      await p.keyboard.press('3'); await p.waitForTimeout(1200);
      const lt = await p.evaluate(() => window.__lt.slice());
      proBewertung.push(Math.round(lt.reduce((a, x) => a + x, 0)));
      const zeiten = await p.evaluate(() => window.__appZeit);
      console.log('App-Zeiten', JSON.stringify(zeiten));
      assert.equal(zeiten.filter(x=>x.name==='gradeCard').length,1,'Bewertung wurde nicht genau einmal ausgefuehrt');
      if(n===3000) assert.ok(proBewertung[i]<=100,`G-037: ${proBewertung[i]} ms statt maximal 100 ms`);
    }
    console.log(n + ' Karten, ' + lek + ' Lektionen, ' + (gef ? 'gefuehrt' : 'eigen') + ' | Runde starten: lange Aufgaben ' + Math.round(startLt.reduce((a, x) => a + x, 0)) +
      ' ms | je Bewertung (Summe lange Aufgaben, CPU 4x): ' + proBewertung.join(', ') + ' ms' + (p.fehler.length ? ' | ' + p.fehler.join('/') : ''));
    assert.deepEqual(p.fehler,[],'Seitenfehler beim Bewerten');
    await ctx.close();
  }
  } finally { await b.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});

