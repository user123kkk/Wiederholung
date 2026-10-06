/* Diagnose (kein Abnahmetest): Betreiber 06.10.2026 - am Verschiebe-Griff zu frueh
   losziehen (vor Ende der 350-ms-Halte-Animation) laesst "den Bildschirm spinnen".
   Stellt das mit echten Touch-Ereignissen nach und misst, wie weit die Seite nach
   dem Loslassen weiterlaeuft, verglichen mit dem Weg des Fingers.
     node x_griff_probe.js [buendel]   buendel = wie viele Bewegungen ohne Pause
                                       hintereinander gesendet werden (Standard 1) */
const { start, neueSeite, aktion, GERAETE } = require('./lib');
const buendel = +process.argv[2] || 1;
(async () => {
  const b = await start();
  try {
    const { p, ctx } = await neueSeite(b, GERAETE.handy, { warte: 1500, vorher: async c => {
      await c.addInitScript(() => {
        window.__scroll = [];
        const echt = window.scrollBy.bind(window);
        window.scrollBy = (x, y) => { window.__scroll.push([Math.round(performance.now()), Math.round(y * 10) / 10]); return echt(x, y); };
      });
    } });
    try {
      await aktion(p, 'tab-verwalten', null, 1200);
      await p.evaluate(() => window.scrollTo(0, 600)); await p.waitForTimeout(400);
      const griff = await p.evaluate(() => {
        const g = [...document.querySelectorAll('#karten-liste .card-row .drag-handle')].find(e => { const r = e.getBoundingClientRect(); return r.top > 300 && r.top < 600; });
        if (!g) return null; const r = g.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
      if (!griff) throw new Error('kein Griff im Bild');
      const cdp = await p.context().newCDPSession(p);
      const pt = (x, y) => [{ x: Math.round(x), y: Math.round(y), id: 1 }];
      const y0 = await p.evaluate(() => scrollY);
      await p.evaluate(() => { window.__scroll.length = 0; });
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(griff.x, griff.y) });
      await p.waitForTimeout(60);   // deutlich vor den 350 ms
      // Finger wandert 96 px nach oben, in 12 Schritten zu 8 px, je "buendel" ohne Pause.
      const schritte = 12, weg = 96;
      for (let i = 1; i <= schritte; i += buendel) {
        const sendungen = [];
        for (let k = i; k < i + buendel && k <= schritte; k++)
          sendungen.push(cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(griff.x, griff.y - weg * k / schritte) }));
        await Promise.all(sendungen);
        await p.waitForTimeout(16);
      }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      const yLos = await p.evaluate(() => scrollY);
      await p.waitForTimeout(2500);
      const yEnde = await p.evaluate(() => scrollY);
      const rufe = await p.evaluate(() => window.__scroll);
      const max = Math.max(0, ...rufe.map(r => Math.abs(r[1])));
      console.log('Buendel ' + buendel + ': Finger ' + weg + ' px in ~' + (schritte / buendel * 16) + ' ms | Seite beim Loslassen ' + Math.round(yLos - y0) +
        ' px | danach weitergelaufen ' + Math.round(yEnde - yLos) + ' px | scrollBy-Aufrufe ' + rufe.length + ', groesster Einzelschritt ' + max + ' px' +
        ' | Zeile wird gezogen: ' + await p.evaluate(() => !!document.querySelector('.card-row.dragging')));
      console.log('erste Aufrufe: ' + JSON.stringify(rufe.slice(0, 16)));
      console.log(p.fehler.join('|') || 'ok');
    } finally { await ctx.close(); }
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
