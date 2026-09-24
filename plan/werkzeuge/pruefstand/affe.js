// Zufallstester: klickt N-mal auf sichtbare Bedienelemente und sammelt Fehler.
// node affe.js <geraet> <schritte> <seed>
const { start, neueSeite, GERAETE } = require('./lib');
const geraet = process.argv[2] || 'handy';
const SCHRITTE = +(process.argv[3] || 250);
let seed = +(process.argv[4] || 1);
const zufall = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const VERBOTEN = ['logout', 'delete-account', 'import-trigger', 'export-backup', 'export-backup-current', 'konto-backup',
  'seite-neu-laden', 'start-neu-versuchen', 'hw-fullscreen', 'open-error-modal', 'feedback-submit', 'feedback-delete',
  'google-login', 'apple-login', 'code-copy-clipboard', 'link-copy-clipboard', 'teile-lektion-link'];

(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE[geraet], { warte: 1800 });
  p.on('dialog', d => d.dismiss().catch(() => {}));
  const verlauf = [];
  const befunde = new Map();
  for (let i = 0; i < SCHRITTE; i++) {
    const kandidaten = await p.evaluate((verboten) => {
      const sichtbar = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && !el.disabled; };
      const els = [...document.querySelectorAll('[data-action], .einstieg-option, input[type=checkbox]')].filter(sichtbar)
        .filter(el => !verboten.includes(el.dataset.action));
      return els.map((el, k) => { el.dataset.affe = k; return (el.dataset.action || el.tagName) + (el.dataset.id ? ':' + el.dataset.id : ''); });
    }, VERBOTEN);
    // Eingabefelder gelegentlich fuellen
    if (zufall() < 0.15) {
      await p.evaluate((t) => { const f = [...document.querySelectorAll('input[type=text], input:not([type]), textarea')].filter(x => x.offsetParent); if (f.length) { const x = f[Math.floor(Math.random() * f.length)]; x.value = t; x.dispatchEvent(new Event('input', { bubbles: true })); } }, ['كتاب', 'Test', '', 'x'.repeat(50)][i % 4]);
    }
    if (!kandidaten.length) { await p.keyboard.press('Escape'); await p.waitForTimeout(150); continue; }
    const k = Math.floor(zufall() * kandidaten.length);
    verlauf.push(kandidaten[k]);
    try {
      await p.click('[data-affe="' + k + '"]', { timeout: 1500 });
    } catch (e) { /* verdeckt o.ae. */ }
    await p.waitForTimeout(120 + Math.floor(zufall() * 200));
    // Dialoge gelegentlich bestaetigen
    if (zufall() < 0.3) await p.evaluate(() => { const b = document.querySelector('[data-action="dlg-cancel"]'); if (b) b.click(); });
    const neue = p.fehler.splice(0);
    for (const f of neue) {
      const key = f.split('\n')[0].slice(0, 160);
      if (!befunde.has(key)) { befunde.set(key, { f, weg: verlauf.slice(-8) }); console.log('BEFUND', i, f.slice(0, 500).replace(/\n/g, ' / '), '\n   Weg:', verlauf.slice(-8).join(' > ')); }
    }
    // Ueberlauf pruefen
    const ueber = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (i % 50 === 0) console.log('schritt', i);
    if (ueber > 1) {
      const key = 'UEBERLAUF ' + ueber + 'px';
      if (!befunde.has(key)) befunde.set(key, { f: key + ' ' + (await p.evaluate(() => { const w = innerWidth; return [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > w + 1).slice(0, 4).map(e => e.className || e.tagName).join(' | '); })), weg: verlauf.slice(-6) });
    }
  }
  console.log(geraet, 'Schritte:', SCHRITTE, 'Befunde:', befunde.size);
  for (const [k, v] of befunde) console.log('---\n' + v.f.slice(0, 600) + '\n  Weg: ' + v.weg.join(' > '));
  await b.close();
})();
