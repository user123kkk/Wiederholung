/* C11 / VERW-1: echte zweite Suche mit 1500 Karten und Notizen.
   Feste Gegenprobe: --alt liefert app.js aus b60abf4. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const {start, neueSeite, aktion, GERAETE, vollerStore} = require('./lib');
const repo = path.resolve(__dirname, '../../..');
const alt = process.argv.includes('--alt');
const store = vollerStore();
const vorlage = store['users/u1/karten/k4'];
for (let i = 40; i < 1540; i++) {
  store['users/u1/karten/suche' + i] = {...vorlage,
    wort: vorlage.wort + ' ' + i, uebersetzung: 'Suchkarte ' + i,
    extra: 'Notiz zur Suchkarte ' + i, order: i};
}
(async () => {
  const browser = await start();
  try {
    const {p, ctx} = await neueSeite(browser, GERAETE.handy, {store, vorher: async ctx => {
      await ctx.addInitScript(() => { navigator.serviceWorker.register = () => Promise.reject(new Error('Test ohne Worker')); });
      const body = (alt ? execFileSync('git', ['show', 'b60abf4:app.js'], {cwd: repo, encoding: 'utf8', maxBuffer: 4e6})
        : fs.readFileSync(path.join(repo, 'app.js'), 'utf8')) + '\nwindow.__suche = { ui, zeichneKartenListe };';
      await ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/app.js'), r => r.fulfill({body, contentType: 'text/javascript'}));
    }});
    try {
      await aktion(p, 'tab-verwalten');
      const zahlen = await p.evaluate(() => {
        const original = String.prototype.normalize;
        let aufrufe = 0;
        String.prototype.normalize = function(...args) { aufrufe++; return original.apply(this, args); };
        try {
          __suche.ui.searchAll = true;
          __suche.ui.searchQuery = 'Suchkarte';
          __suche.zeichneKartenListe();
          const erste = aufrufe;
          aufrufe = 0;
          __suche.zeichneKartenListe();
          return {erste, zweite: aufrufe, treffer: document.querySelector('#karten-liste').textContent};
        } finally { String.prototype.normalize = original; }
      });
      console.log('C11 normalize-Aufrufe:', zahlen.erste, 'zweite Suche:', zahlen.zweite);
      assert.ok(zahlen.treffer.includes('Suchkarte'), 'Echte Treffer fehlen');
      assert.ok(zahlen.zweite < 6000, 'Wiederholte Suche berechnet die Felder erneut: ' + zahlen.zweite);
      assert.deepEqual(p.fehler, []);
    } finally { await ctx.close(); }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
