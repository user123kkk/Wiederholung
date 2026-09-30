// Zufallstester: klickt N-mal auf sichtbare Bedienelemente und sammelt Fehler.
// node affe.js <geraet> <schritte> <seed>
const { start, neueSeite, GERAETE, tag } = require('./lib');
const geraet = process.argv[2] || 'handy';
const SCHRITTE = +(process.argv[3] || 250);
let seed = +(process.argv[4] || 1);
const zufall = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const VERBOTEN = ['logout', 'delete-account', 'import-trigger', 'export-backup', 'export-backup-current', 'konto-backup',
  'seite-neu-laden', 'start-neu-versuchen', 'hw-fullscreen', 'open-error-modal', 'feedback-submit', 'feedback-delete',
  'google-login', 'apple-login', 'code-copy-clipboard', 'link-copy-clipboard', 'teile-lektion-link'];
const TEXTE = process.env.AFFE_TEXTE === '1';
// Im Texte-Modus nicht gleich alle Texte weg (Widerruf, Loeschen), sonst endet der Test dort.
if (TEXTE) VERBOTEN.push('texte-widerrufen', 'text-loeschen');

(async () => {
  const b = await start();
  /* AFFE_TEXTE=1: Betreiber-Konto mit Testtext und Einwilligung (Texte
     lernen, Stufe 7) - sonst wie immer das Testkonto ohne Texte. */
  const { p } = process.env.AFFE_TEXTE === '1'
    ? await (async () => { const T = require('./text_lib'); const s = T.textStore(); s['users/u1'].texteEinwilligung = tag(0);
        const g = GERAETE[geraet]; return T.seiteMitApp(b, s, { uid: T.BETREIBER_UID, viewport: { width: g.width, height: g.height } }); })()
    : await neueSeite(b, GERAETE[geraet], { warte: 1800 });
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
    /* Texte-Modus: Text-Aktionen zu 60 % bevorzugt, sonst traf der Zufall
       die Text-Bildschirme kaum (7-10 von 200 Schritten). */
    const textK = TEXTE ? kandidaten.map((x, j) => /^(text|zeile|quran)/.test(x) ? j : -1).filter(j => j >= 0) : [];
    const k = textK.length && zufall() < 0.6 ? textK[Math.floor(zufall() * textK.length)] : Math.floor(zufall() * kandidaten.length);
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
  if (process.env.AFFE_TEXTE === '1') console.log('Texte-Aktionen:', verlauf.filter(v => /^(text|zeile|neu-wahl|quran)/.test(v)).length, [...new Set(verlauf.filter(v => /^(text|zeile|neu-wahl|quran)/.test(v)).map(v => v.split(':')[0]))].join(' '));
  console.log(geraet, 'Schritte:', SCHRITTE, 'Befunde:', befunde.size);
  for (const [k, v] of befunde) console.log('---\n' + v.f.slice(0, 600) + '\n  Weg: ' + v.weg.join(' > '));
  await b.close();
})();
