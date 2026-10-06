/* 3.18.20 (Betreiber 06.10.2026): Am Verschiebe-Griff zu frueh losziehen (vor Ende
   der Halte-Animation) liess die Seite nach dem Loslassen bis zu 2000 px
   weiterschiessen, wenn mehrere Bewegungen im selben Augenblick ankamen (so liefert
   sie das iPhone). Echte Touch-Ereignisse per CDP; "Buendel" = Bewegungen ohne Pause.
   --gegenprobe: Stand vor 3.18.20 (d8839b2), dort laeuft die Seite bei Buendel 4 davon. */
const assert = require('node:assert/strict');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { start, neueSeite, aktion, GERAETE } = require('./lib');
const alt = process.argv.includes('--gegenprobe');
const repo = path.join(__dirname, '../../..');
const altApp = alt ? execFileSync('git', ['show', 'd8839b2:app.js'], { cwd: repo, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }) : null;
const WEG = 96, SCHRITTE = 12;
/* Nach dem Loslassen laeuft die Seite mit dem Tempo des Fingers aus (Abklingen
   0,995 je ms, also rund 200 ms mal Tempo). Hoechsttempo 3 px/ms -> 600 px. */
const GRENZE_AUSLAUF = 650, GRENZE_SCHRITT = 60;

(async () => {
  const b = await start();
  try {
    let schlimmster = 0;
    for (const buendel of [1, 2, 4, 6]) {
      const { p, ctx } = await neueSeite(b, GERAETE.handy, { warte: 1500, vorher: async c => {
        await c.addInitScript(() => {
          window.__scroll = [];
          const echt = window.scrollBy.bind(window);
          window.scrollBy = (x, y) => { window.__scroll.push([performance.now(), y]); return echt(x, y); };
        });
        if (alt) await c.route('**/app.js?*', r => r.fulfill({ contentType: 'text/javascript', body: altApp }));
      } });
      try {
        await aktion(p, 'tab-verwalten', null, 1200);
        await p.evaluate(() => window.scrollTo(0, 600)); await p.waitForTimeout(400);
        const griff = await p.evaluate(() => {
          const g = [...document.querySelectorAll('#karten-liste .card-row .drag-handle')].find(e => { const r = e.getBoundingClientRect(); return r.top > 300 && r.top < 600; });
          if (!g) return null; const r = g.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        });
        assert.ok(griff, 'ein Griff liegt im Bild');
        const cdp = await p.context().newCDPSession(p);
        const pt = (x, y) => [{ x: Math.round(x), y: Math.round(y), id: 1 }];
        const y0 = await p.evaluate(() => scrollY);
        await p.evaluate(() => { window.__scroll.length = 0; });
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(griff.x, griff.y) });
        await p.waitForTimeout(60);   // deutlich vor den 350 ms Halten
        for (let i = 1; i <= SCHRITTE; i += buendel) {
          const sendungen = [];
          for (let k = i; k < i + buendel && k <= SCHRITTE; k++)
            sendungen.push(cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(griff.x, griff.y - WEG * k / SCHRITTE) }));
          await Promise.all(sendungen);
          await p.waitForTimeout(16);
        }
        const tLos = await p.evaluate(() => performance.now());
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        const yLos = await p.evaluate(() => scrollY);
        await p.waitForTimeout(2500);
        const yEnde = await p.evaluate(() => scrollY);
        const danach = (await p.evaluate(() => window.__scroll)).filter(r => r[0] > tLos).map(r => Math.abs(r[1]));
        const auslauf = Math.round(yEnde - yLos), schritt = Math.round(Math.max(0, ...danach));
        const gezogen = await p.evaluate(() => !!document.querySelector('.card-row.dragging'));
        console.log((alt ? 'ALT  ' : 'OK   ') + 'Buendel ' + buendel + ': Finger ' + WEG + ' px | Seite folgt ' + Math.round(yLos - y0) + ' px | laeuft aus ' + auslauf + ' px, groesster Schritt danach ' + schritt + ' px');
        assert.equal(gezogen, false, 'frueh losziehen ist Scrollen, kein Ziehen');
        assert.equal(Math.round(yLos - y0), WEG, 'Seite folgt dem Finger genau');
        schlimmster = Math.max(schlimmster, auslauf);
        if (!alt) {
          assert.ok(auslauf >= 0 && auslauf <= GRENZE_AUSLAUF, 'Auslauf bleibt im Rahmen (' + auslauf + ' px)');
          assert.ok(schritt <= GRENZE_SCHRITT, 'kein Sprung im Auslauf (' + schritt + ' px)');
        }
        assert.deepEqual(p.fehler, []);
      } finally { await ctx.close(); }
    }
    if (alt) assert.ok(schlimmster > GRENZE_AUSLAUF, 'Gegenprobe: alter Stand schiesst davon (' + schlimmster + ' px)');
    /* Halten bleibt Ziehen: nach 350 ms ohne Bewegung folgt die Zeile, die Seite scrollt nicht. */
    {
      const { p, ctx } = await neueSeite(b, GERAETE.handy, { warte: 1500, vorher: async c => {
        if (alt) await c.route('**/app.js?*', r => r.fulfill({ contentType: 'text/javascript', body: altApp }));
      } });
      try {
        await aktion(p, 'tab-verwalten', null, 1200);
        await p.evaluate(() => window.scrollTo(0, 600)); await p.waitForTimeout(400);
        const griff = await p.evaluate(() => {
          const g = [...document.querySelectorAll('#karten-liste .card-row .drag-handle')].find(e => { const r = e.getBoundingClientRect(); return r.top > 300 && r.top < 500; });
          const r = g.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, id: g.closest('.card-row').dataset.cardid };
        });
        const cdp = await p.context().newCDPSession(p);
        const pt = (x, y) => [{ x: Math.round(x), y: Math.round(y), id: 1 }];
        const y0 = await p.evaluate(() => scrollY);
        const platz = id => p.evaluate(id => [...document.querySelectorAll('#karten-liste > .card-row')].findIndex(r => r.dataset.cardid === id), id);
        const vorher = await platz(griff.id);
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(griff.x, griff.y) });
        await p.waitForTimeout(450);
        for (let k = 1; k <= 8; k++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(griff.x, griff.y + k * 15) }); await p.waitForTimeout(16); }
        const zieht = await p.evaluate(() => !!document.querySelector('.card-row.dragging'));
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        await p.waitForTimeout(800);
        const nachher = await platz(griff.id), yEnde = await p.evaluate(() => scrollY);
        console.log((alt ? 'ALT  ' : 'OK   ') + 'Halten und ziehen: Zeile folgt ' + zieht + ' | Platz ' + vorher + ' -> ' + nachher + ' | Seite bewegt ' + Math.round(yEnde - y0) + ' px');
        assert.equal(zieht, true, 'nach dem Halten wird gezogen');
        assert.ok(nachher > vorher, 'Zeile liegt nach dem Ziehen weiter unten');
        assert.equal(Math.round(yEnde - y0), 0, 'Seite scrollt beim Ziehen nicht mit');
        assert.deepEqual(p.fehler, []);
      } finally { await ctx.close(); }
    }
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
