/* 3.18.19 (Betreiber 06.10.2026): Tippen neben das Karten-Blatt und neben den
   Eingabe-Dialog schliesst wie Herunterwischen und Escape - leer sofort, mit
   getipptem Text ueber die vorhandene Rueckfrage bzw. gar nicht.
   --gegenprobe: Stand vor 3.18.19 (802c56a), dort schliesst beides nicht. */
const assert = require('node:assert/strict');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { start, neueSeite, aktion, GERAETE } = require('./lib');
const alt = process.argv.includes('--gegenprobe');
const repo = path.join(__dirname, '../../..');
const altApp = alt ? execFileSync('git', ['show', '802c56a:app.js'], { cwd: repo, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }) : null;

/* Einen Punkt suchen, an dem wirklich der Hintergrund liegt, und dort tippen. */
async function nebenTippen(p) {
  const punkt = await p.evaluate(() => {
    for (let y = 6; y < innerHeight; y += 12) for (let x = 6; x < innerWidth; x += 24) {
      const e = document.elementFromPoint(x, y);
      if (e && e.classList.contains('dlg-backdrop')) return [x, y];
    }
    return null;
  });
  assert.ok(punkt, 'kein freier Hintergrund neben dem Blatt gefunden');
  await p.mouse.click(punkt[0], punkt[1]);
  await p.waitForTimeout(600);
}
const offen = (p, sel) => p.locator(sel).count();

(async () => {
  const b = await start();
  try {
    for (const g of ['handy', 'klein', 'ipad']) {
      const { p, ctx } = await neueSeite(b, GERAETE[g], { warte: 1500, vorher: async c => {
        if (alt) await c.route('**/app.js?*', r => r.fulfill({ contentType: 'text/javascript', body: altApp }));
      } });
      try {
        // Vergleich: das Bereichs-Blatt schloss schon immer.
        await aktion(p, 'tab-verwalten', null, 900);
        // 1. Karten-Blatt leer
        await aktion(p, 'karte-neu', null, 800);
        assert.equal(await offen(p, '.dlg #f-wort'), 1, 'Karten-Blatt offen');
        await nebenTippen(p);
        const leerZu = await offen(p, '.dlg #f-wort') === 0;
        // 2. Karten-Blatt mit Text: vorhandene Rueckfrage, Abbrechen behaelt alles
        if (!leerZu) await p.keyboard.press('Escape'), await p.waitForTimeout(500);
        await aktion(p, 'karte-neu', null, 800);
        await p.fill('#f-wort', 'Probe');
        await nebenTippen(p);
        const frage = await p.locator('#dlg-title').filter({ hasText: 'Angefangene Karte verwerfen?' }).count() === 1;
        if (frage) { await aktion(p, 'dlg-cancel', null, 500); }
        const textDa = await p.evaluate(() => { const e = document.getElementById('f-wort'); return e ? e.value : null; });
        // aufraeumen: verwerfen
        await p.keyboard.press('Escape'); await p.waitForTimeout(400);
        if (await offen(p, '[data-action="dlg-ok"]')) await aktion(p, 'dlg-ok', null, 600);
        // 3. Code-Dialog leer und mit Text
        await aktion(p, 'einstellungen', null, 700); await aktion(p, 'einst-seite', 'kartensaetze', 700);
        await aktion(p, 'code-einloesen-start', null, 600);
        assert.equal(await offen(p, '#dlg-input'), 1, 'Code-Dialog offen');
        await nebenTippen(p);
        const codeLeerZu = await offen(p, '#dlg-input') === 0;
        if (!codeLeerZu) await aktion(p, 'dlg-cancel', null, 500);
        await aktion(p, 'code-einloesen-start', null, 600);
        await p.fill('#dlg-input', 'ABCDE');
        await nebenTippen(p);
        const codeTextBleibt = await p.evaluate(() => { const e = document.getElementById('dlg-input'); return e ? e.value : null; });
        if (await offen(p, '#dlg-input')) await aktion(p, 'dlg-cancel', null, 500);
        // 4. Rueckfrage (Abmelden) bleibt bei Tippen daneben stehen, wie bisher
        await aktion(p, 'seite-zu', null, 600);
        let rueckfrageBleibt = null;
        if (await offen(p, '[data-action="logout"]')) {
          await aktion(p, 'logout', null, 600);
          if (await offen(p, '#dlg-title')) { await nebenTippen(p); rueckfrageBleibt = await offen(p, '#dlg-title') === 1; await aktion(p, 'dlg-cancel', null, 400); }
        }
        const zeile = g + ': Karte leer schliesst ' + leerZu + ' | mit Text Rueckfrage ' + frage + ', Text danach "' + textDa + '" | Code leer schliesst ' + codeLeerZu + ' | Code mit Text bleibt "' + codeTextBleibt + '" | Rueckfrage bleibt ' + rueckfrageBleibt;
        console.log((alt ? 'ALT  ' : 'OK   ') + zeile);
        if (alt) {
          assert.equal(leerZu, false, 'Gegenprobe: altes Karten-Blatt schloss nicht');
          assert.equal(codeLeerZu, false, 'Gegenprobe: alter Code-Dialog schloss nicht');
        } else {
          assert.equal(leerZu, true, 'leeres Karten-Blatt schliesst bei Tippen daneben');
          assert.equal(frage, true, 'Karten-Blatt mit Text fragt nach');
          assert.equal(textDa, 'Probe', 'Text bleibt nach Abbrechen der Rueckfrage');
          assert.equal(codeLeerZu, true, 'leerer Code-Dialog schliesst bei Tippen daneben');
          assert.equal(codeTextBleibt, 'ABCDE', 'Code-Dialog mit Text bleibt offen');
          if (rueckfrageBleibt !== null) assert.equal(rueckfrageBleibt, true, 'Rueckfrage schliesst nicht durch Tippen daneben');
        }
        assert.deepEqual(p.fehler, []);
      } finally { await ctx.close(); }
    }
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
