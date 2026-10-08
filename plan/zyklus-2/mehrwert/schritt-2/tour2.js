/* Schritt 2, zweiter Rundgang: Blaetter, Menues, Dialoge - je Oeffnen und Schliessen.
   Misst zusaetzlich, ob das Element beim Schliessen sofort weg ist (harter Wechsel).
   Aufruf wie tour.js: node tour2.js <geraet> <thema> */
const path = require('node:path');
const fs = require('node:fs');
const PS = path.resolve(__dirname, '../../../werkzeuge/pruefstand') + '/';
const { start, neueSeite, GERAETE, vollerStore, OUT } = require(PS + 'lib');
const [geraetName = 'handy', thema = 'dunkel'] = process.argv.slice(2);
const vp = { ...GERAETE[geraetName], dpr: 1 };
const prefix = [geraetName, thema, 'extra'].join('-');
let nr = 0;

async function laufend(p) {
  return p.evaluate(() => document.getAnimations().filter(a => a.playState !== 'finished').map(a => {
    const t = a.effect.getComputedTiming(), el = a.effect.target, pe = a.effect.pseudoElement || '';
    return (a.animationName || ('T:' + a.transitionProperty)) + '@' + (el ? el.tagName.toLowerCase() + (el.classList.length ? '.' + [...el.classList].slice(0, 2).join('.') : '') : '?') + pe +
      ' ' + Math.round(t.delay || 0) + '+' + Math.round(t.duration);
  }));
}
/* Oberste Ebenen: was liegt gerade ueber der Seite? */
async function ebenen(p) {
  return p.evaluate(() => [...document.querySelectorAll('[role="dialog"], .sheet, .dlg, .toast, .menu, [class*="sheet"], [class*="blatt"]')]
    .filter(e => { const r = e.getBoundingClientRect(); return r.width > 40 && r.height > 40 && getComputedStyle(e).visibility !== 'hidden' && +getComputedStyle(e).opacity > 0.05; })
    .map(e => e.tagName.toLowerCase() + '.' + [...e.classList].slice(0, 2).join('.')).slice(0, 6));
}
async function schritt(p, name, tun) {
  nr++;
  const id = String(nr).padStart(2, '0') + '-' + name;
  let fehler = null;
  try { await tun(); } catch (e) { fehler = String(e.message || e).slice(0, 140); }
  const proben = [];
  if (!fehler) for (const warte of [20, 70, 130, 200]) {
    await p.waitForTimeout(warte);
    proben.push({ a: await laufend(p), e: await ebenen(p) });
  }
  const alle = [...new Set(proben.flatMap(x => x.a))];
  await p.waitForTimeout(700);
  if (!fehler) await p.screenshot({ path: path.join(OUT, prefix + '-' + id + '.png') });
  const o = { id, fehler, anim: alle.length, namen: alle.slice(0, 14), ebenenBei20ms: proben[0] && proben[0].e, ebenenAmEnde: await ebenen(p), seitenfehler: p.fehler.splice(0) };
  console.log(JSON.stringify(o));
  return !fehler;
}
const tipp = (p, action, id) => async () => {
  const ok = await p.evaluate(([a, id]) => {
    const els = [...document.querySelectorAll('[data-action="' + a + '"]')].filter(e => id == null || e.dataset.id === id);
    const el = els.find(e => e.offsetParent !== null) || els[0];
    if (!el) return false; el.click(); return true;
  }, [action, id]);
  if (!ok) throw new Error('keine Aktion ' + action);
};
const taste = (p, k) => async () => { await p.keyboard.press(k); };
const erste = (p, action) => p.evaluate(a => { const e = document.querySelector('[data-action="' + a + '"]'); return e ? e.dataset.id || null : null; }, action);

(async () => {
  const b = await start();
  try {
    const { p } = await neueSeite(b, vp, { thema, hell: thema === 'hell', store: vollerStore({ thema }), ls: { 'adrabic-thema': thema } });
    await schritt(p, 'bereich-blatt-auf', tipp(p, 'bereich-sheet-auf'));
    await schritt(p, 'bereich-blatt-zu-escape', taste(p, 'Escape'));
    await schritt(p, 'hinweis-weg', tipp(p, 'hinweis-weg'));
    await schritt(p, 'verwalten', tipp(p, 'tab-verwalten'));
    await schritt(p, 'mehr-auf', tipp(p, 'bereich-mehr-auf'));
    await schritt(p, 'mehr-zu-escape', taste(p, 'Escape'));
    await schritt(p, 'speicherkarten-auf', tipp(p, 'toggle-sets'));
    await schritt(p, 'speicherkarten-zu', tipp(p, 'toggle-sets'));
    await schritt(p, 'karte-detail-auf', tipp(p, 'card-detail', await erste(p, 'card-detail')));
    await schritt(p, 'karte-detail-zu-escape', taste(p, 'Escape'));
    await schritt(p, 'kartenblatt-auf', tipp(p, 'karte-neu'));
    await schritt(p, 'kartenblatt-zu-fertig', tipp(p, 'karte-sheet-zu'));
    await schritt(p, 'kartenblatt-auf2', tipp(p, 'karte-neu'));
    await schritt(p, 'kartenblatt-zu-daneben', tipp(p, 'karte-sheet-neben'));
    await schritt(p, 'ueben-auf', tipp(p, 'open-drill'));
    await schritt(p, 'ueben-start', tipp(p, 'start-drill'));
    await schritt(p, 'ueben-aufdecken', taste(p, 'Space'));
    await schritt(p, 'ueben-ende-x', tipp(p, 'end-session'));
    await schritt(p, 'lernen', tipp(p, 'tab-lernen'));
    await schritt(p, 'einstellungen', tipp(p, 'einstellungen'));
    await schritt(p, 'wahl-blatt-auf', tipp(p, 'wahl-sheet', await erste(p, 'wahl-sheet')));
    await schritt(p, 'wahl-blatt-zu-escape', taste(p, 'Escape'));
    await schritt(p, 'erinnerung-auf', tipp(p, 'erinnerung-auf'));
    await schritt(p, 'erinnerung-zu-escape', taste(p, 'Escape'));
    await schritt(p, 'name-auf', tipp(p, 'konto-name'));
    await schritt(p, 'name-zu-escape', taste(p, 'Escape'));
    await schritt(p, 'fehler-melden-auf', tipp(p, 'open-error-modal'));
    await schritt(p, 'fehler-melden-zu-escape', taste(p, 'Escape'));
    await schritt(p, 'abmelden-dialog', tipp(p, 'logout'));
    await schritt(p, 'abmelden-dialog-zu-escape', taste(p, 'Escape'));
    await schritt(p, 'einstellungen-zu', tipp(p, 'einstellungen-zu'));
    await schritt(p, 'runde', tipp(p, 'start-session'));
    await schritt(p, 'runde-x-dialog', tipp(p, 'end-session'));
    fs.writeFileSync(path.join(OUT, prefix + '.fertig'), '');
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
