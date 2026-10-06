/* 3.18.21 (Betreiber 06.10.2026): Im Karten-Blatt, geoeffnet aus einer Speicherkarte,
   fuehrt "In der Kartenliste zeigen" zur Karte in der Liste des Bereichs: Blatt zu,
   Suche leer, richtige Seite, Zeile im Bild und einmal aufleuchtend. Aus der Liste
   selbst geoeffnet gibt es den Knopf nicht.
   --gegenprobe: Stand vor 3.18.21 (b710e6f), dort fehlt der Knopf. */
const assert = require('node:assert/strict');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { start, neueSeite, aktion, GERAETE, vollerStore } = require('./lib');
const alt = process.argv.includes('--gegenprobe');
const repo = path.join(__dirname, '../../..');
const altApp = alt ? execFileSync('git', ['show', 'b710e6f:app.js'], { cwd: repo, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }) : null;

/* Grosser Bestand: 220 Karten (ueber der Seiten-Schwelle), Karte k180 liegt in "Schwierig". */
function grosserStore() {
  const s = vollerStore();
  const muster = s['users/u1/karten/k39'];
  for (let i = 40; i < 220; i++) s['users/u1/karten/k' + i] = { ...muster, wort: 'كلمة' + i, uebersetzung: 'Wort ' + i, order: i, extra: '' };
  s['users/u1/bereiche/b1'].sets.s5.cardIds = ['k5', 'k180'];
  return s;
}
async function oeffneSet(p, setId) {
  if (!(await p.locator('.sets-panel.offen').count())) await aktion(p, 'toggle-sets', null, 500);
  await aktion(p, 'toggle-set-open', setId, 600);
}
const lage = (p, id) => p.evaluate(id => {
  const e = document.getElementById('karte-zeile-' + id); if (!e) return null;
  const r = e.getBoundingClientRect();
  return { imBild: r.top >= 0 && r.bottom <= innerHeight, leuchtet: e.classList.contains('aufleuchten'), wort: (e.querySelector('.wort') || {}).textContent };
}, id);

(async () => {
  const b = await start();
  try {
    for (const [g, gross, ruhig] of [['handy', false, false], ['klein', false, true], ['ipad', false, false], ['handy', true, false]]) {
      const { p, ctx } = await neueSeite(b, GERAETE[g], { warte: 1500, ruhig, store: gross ? grosserStore() : vollerStore(), vorher: async c => {
        if (alt) await c.route('**/app.js?*', r => r.fulfill({ contentType: 'text/javascript', body: altApp }));
      } });
      try {
        const name = g + (gross ? ' 220 Karten' : '') + (ruhig ? ' ruhig' : '');
        await aktion(p, 'tab-verwalten', null, 1000);
        // Aus der Liste geoeffnet: kein Knopf.
        await p.evaluate(() => document.querySelector('#karten-liste > .card-row[data-action="card-detail"]').click()); await p.waitForTimeout(500);
        assert.equal(await p.locator('.dlg--card-detail').count(), 1, 'Karten-Blatt aus der Liste offen');
        const inListe = await p.locator('[data-action="card-detail-in-liste"]').count();
        await aktion(p, 'card-detail-zu', null, 500);
        // Suche setzen, dann aus der Speicherkarte oeffnen.
        const ziel = gross ? 'k180' : 'k9';
        await p.fill('#f-search', 'zzz'); await p.waitForTimeout(500);
        await oeffneSet(p, 's5');
        await p.evaluate(id => document.querySelector('.set-cards .card-row[data-id="' + id + '"]').click(), ziel); await p.waitForTimeout(500);
        assert.equal(await p.locator('.dlg--card-detail').count(), 1, 'Karten-Blatt aus der Speicherkarte offen');
        const knopf = await p.locator('[data-action="card-detail-in-liste"]').count();
        if (alt) {
          console.log('ALT  ' + name + ': Knopf im Blatt aus der Speicherkarte ' + knopf);
          assert.equal(knopf, 0, 'Gegenprobe: alter Stand hat den Knopf nicht');
          continue;
        }
        assert.equal(inListe, 0, 'aus der Liste geoeffnet: kein Knopf');
        assert.equal(knopf, 1, 'aus der Speicherkarte geoeffnet: Knopf da');
        const breite = await p.evaluate(() => { const n = document.querySelector('.dlg-nebenweg').getBoundingClientRect(), d = document.querySelector('.dlg').getBoundingClientRect(); return n.right <= d.right + 1 && n.left >= d.left - 1; });
        const hoehe = await p.evaluate(() => Math.round(document.querySelector('[data-action="card-detail-in-liste"]').getBoundingClientRect().height));
        await aktion(p, 'card-detail-in-liste', null, 300);
        const sofort = await lage(p, ziel);
        await p.waitForTimeout(1300);
        const zwischen = await lage(p, ziel);
        await p.waitForTimeout(2500);
        const danach = await lage(p, ziel);
        const top = await p.evaluate(id => Math.round(document.getElementById('karte-zeile-' + id).getBoundingClientRect().top), ziel);
        console.log('     nach 1,6 s im Bild ' + zwischen.imBild + ', nach 4,1 s im Bild ' + danach.imBild + ', Oberkante ' + top + ' von ' + await p.evaluate(() => innerHeight));
        const zustand = await p.evaluate(() => ({ blatt: !!document.querySelector('.dlg--card-detail'), suche: document.getElementById('f-search').value,
          seite: (document.querySelector('.seiten-leiste') || {}).innerText || '', quer: document.documentElement.scrollWidth > innerWidth }));
        console.log('OK   ' + name + ': Knopf ' + hoehe + ' px hoch, im Blatt ' + breite + ' | danach Blatt zu ' + !zustand.blatt + ', Suche "' + zustand.suche + '", Zeile ' + JSON.stringify(danach) + ', leuchtete ' + (sofort && sofort.leuchtet) + (zustand.seite ? ' | ' + zustand.seite.replace(/\s+/g, ' ') : ''));
        assert.ok(breite, 'Nebenweg bleibt im Blatt');
        assert.ok(hoehe >= 44, 'Trefferflaeche mindestens 44 px');
        assert.equal(zustand.blatt, false, 'Blatt ist zu');
        assert.equal(zustand.suche, '', 'Suche ist geleert');
        assert.equal(zustand.quer, false, 'kein Querueberlauf');
        assert.ok(danach && danach.imBild, 'Zeile der Karte steht im Bild');
        assert.ok(sofort && sofort.leuchtet, 'Zeile leuchtet einmal auf');
        assert.deepEqual(p.fehler, []);
      } finally { await ctx.close(); }
    }
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
