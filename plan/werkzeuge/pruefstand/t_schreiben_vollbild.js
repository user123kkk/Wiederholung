/* 3.18.19 (Betreiber 06.10.2026, iPhone 11): Im Ueben mit Handschrift im Vollbild
   schreiben, dann verkleinern - die Schrift war weg und kam erst im Vollbild
   wieder. Ursache: Striche sind als Anteil der Breite gespeichert; die hohe
   Vollbild-Flaeche hat Hoehenwerte, die unter dem Rand der kleinen liegen.
   --gegenprobe: Stand vor 3.18.19 (802c56a), dort bleibt die kleine Flaeche leer. */
const assert = require('node:assert/strict');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { start, neueSeite, aktion, GERAETE } = require('./lib');
const alt = process.argv.includes('--gegenprobe');
const repo = path.join(__dirname, '../../..');
const altApp = alt ? execFileSync('git', ['show', '802c56a:app.js'], { cwd: repo, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }) : null;

(async () => {
  const b = await start();
  try {
    for (const g of ['handy', 'klein', 'ipad']) {
      const { p, ctx } = await neueSeite(b, GERAETE[g], { warte: 1800, vorher: async c => {
        if (alt) await c.route('**/app.js?*', r => r.fulfill({ contentType: 'text/javascript', body: altApp }));
      } });
      try {
        await aktion(p, 'tab-verwalten', null, 800); await aktion(p, 'open-drill', null, 700);
        await p.evaluate(() => { document.getElementById('drill-handwriting').checked = true; });
        await aktion(p, 'start-drill', null, 1200);
        /* Tinte: deckende Pixel, dazu der Bereich, in dem sie liegen (in Anteilen der Flaeche). */
        const tinte = () => p.evaluate(() => {
          const c = document.getElementById('hw-canvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
          let n = 0, x0 = 1, x1 = 0, y0 = 1, y1 = 0;
          for (let y = 0; y < c.height; y += 2) for (let x = 0; x < c.width; x += 2) if (d[(y * c.width + x) * 4 + 3] > 200) {
            n++; x0 = Math.min(x0, x / c.width); x1 = Math.max(x1, x / c.width); y0 = Math.min(y0, y / c.height); y1 = Math.max(y1, y / c.height);
          }
          const r = c.getBoundingClientRect();
          return { n, x0: +x0.toFixed(2), x1: +x1.toFixed(2), y0: +y0.toFixed(2), y1: +y1.toFixed(2), form: +(r.height / r.width).toFixed(2) };
        });
        /* Ein Strich bei 70 % der Hoehe, quer ueber die halbe Breite. */
        const strich = async () => {
          const r = await (await p.$('#hw-canvas')).boundingBox();
          const y = r.y + r.height * 0.7, x = r.x + r.width * 0.25;
          await p.mouse.move(x, y); await p.mouse.down();
          for (let i = 1; i <= 20; i++) await p.mouse.move(x + i * r.width * 0.025, y + Math.sin(i / 2) * 12);
          await p.mouse.up(); await p.waitForTimeout(400);
        };
        const klein0 = await tinte();
        await aktion(p, 'hw-fullscreen', null, 700);
        assert.equal(await p.locator('.hw-canvas-wrap.fullscreen').count(), 1, 'Vollbild offen');
        await strich();
        const voll = await tinte();
        assert.ok(voll.n > 0, 'Strich im Vollbild gezeichnet');
        await aktion(p, 'hw-fullscreen', null, 700);
        assert.equal(await p.locator('.hw-canvas-wrap.fullscreen').count(), 0, 'Vollbild verlassen');
        const klein = await tinte();
        await aktion(p, 'hw-fullscreen', null, 700);
        const wieder = await tinte();
        await aktion(p, 'hw-fullscreen', null, 700);
        /* Ein Strich in der kleinen Ansicht bleibt im Vollbild sichtbar (war schon so). */
        await strich();
        const klein2 = await tinte();
        await aktion(p, 'hw-fullscreen', null, 700);
        const voll2 = await tinte();
        console.log((alt ? 'ALT  ' : 'OK   ') + g + ': Form klein ' + klein0.form + ', Vollbild ' + voll.form + ' | Vollbild Tinte ' + voll.n + ' bei y ' + voll.y0 + '-' + voll.y1 +
          ' | verkleinert Tinte ' + klein.n + (klein.n ? ' bei x ' + klein.x0 + '-' + klein.x1 + ', y ' + klein.y0 + '-' + klein.y1 : '') +
          ' | wieder Vollbild ' + wieder.n + ' | zweiter Strich klein ' + klein2.n + ', im Vollbild ' + voll2.n);
        if (voll.form <= klein0.form) { console.log('     ' + g + ': Vollbild ist hier nicht hoeher als die kleine Flaeche, Fall entfaellt'); continue; }
        if (alt) assert.equal(klein.n, 0, 'Gegenprobe: alte Fassung zeigt den Vollbild-Strich verkleinert nicht');
        else {
          assert.ok(klein.n > 0, 'Vollbild-Strich ist nach dem Verkleinern sichtbar');
          assert.ok(klein.y1 <= 0.98 && klein.x0 >= 0.02 && klein.x1 <= 0.98, 'Strich liegt ganz in der kleinen Flaeche');
          assert.ok(Math.abs((klein.y0 + klein.y1) / 2 - (voll.y0 + voll.y1) / 2) < 0.08, 'Strich sitzt auf derselben Hoehe relativ zur Grundlinie');
          assert.ok(wieder.n > 0, 'zurueck im Vollbild weiter sichtbar');
          assert.ok(klein2.n > klein.n && voll2.n > wieder.n, 'Strich aus der kleinen Ansicht bleibt in beiden sichtbar');
        }
        assert.deepEqual(p.fehler, []);
      } finally { await ctx.close(); }
    }
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
