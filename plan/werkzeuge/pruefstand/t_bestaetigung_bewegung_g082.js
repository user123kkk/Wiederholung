/* Abnahme G-082 (EINSTIEG-10): Auf der Bestaetigungsseite liefen zwei
   Bewegungen endlos (brief-schweben, puls) - man wartet dort oft Minuten auf
   die Mail (LEHREN § 6.4: kein Endlos-Loop, WCAG 2.2.2 verlangt einen Stopp
   ab 5s). Jetzt: brief-schweben 1-2 Durchlaeufe, puls hoechstens ~6.
   Danach steht alles still. `grep -n "infinite" styles.css` darf nur noch
   Ladekreis, Skelett, Ladebildschirm und einstieg-atmen zeigen.

   Gegenprobe fest auf Commit 5ad0a11 (Stand vor 3.17.42, LEHREN § 15). */
const { chromium } = require('playwright');
const { AUTH, FS, APP } = require('./stubs');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

const REPO = path.join(__dirname, '..', '..', '..');
const BASE = 'http://127.0.0.1:8099/index.html';
let CSS_ALT = null;
try { CSS_ALT = execSync('git show 5ad0a11:styles.css', { cwd: REPO, encoding: 'utf8' }); }
catch (e) { console.log('Kein Git-Stand 5ad0a11 fuer styles.css gefunden - Gegenprobe entfaellt:', e.message); }

const NUTZER = { uid: 'neu1', email: 'neu@example.com', displayName: 'Neu', emailVerified: false,
  metadata: { creationTime: 'Thu, 24 Sep 2026 10:00:00 GMT' } };

async function seite(b, opt = {}) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 },
    reducedMotion: opt.ruhig ? 'reduce' : 'no-preference' });
  if (opt.cssAlt && CSS_ALT) {
    await ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/styles.css'),
      r => r.fulfill({ status: 200, contentType: 'text/css', body: CSS_ALT }));
  }
  await ctx.route('**/www.gstatic.com/**', r => {
    const u = r.request().url();
    r.fulfill({ status: 200, contentType: 'text/javascript', body: u.includes('auth') ? AUTH : u.includes('firestore') ? FS : APP });
  });
  await ctx.route('**/verses.quran.foundation/**', r => r.abort());
  await ctx.route('**/apis.google.com/**', r => r.abort());
  const p = await ctx.newPage();
  p.fehler = [];
  p.on('pageerror', e => p.fehler.push('PAGEERROR: ' + e.message));
  await p.addInitScript(u => { window.__START_USER = u; window.__START_STORE = {}; }, NUTZER);
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForTimeout(opt.warte || 1500);
  return { ctx, p };
}

let funde = 0;
function pruefe(bedingung, text) {
  if (bedingung) console.log('ok     ', text);
  else { console.log('FEHLER ', text); funde++; }
}

/* Liest die tatsaechlichen laufenden Animationen aus (Web Animations API):
   Anzahl der Wiederholungen (Infinity bei "infinite"), damit wir nicht nur
   die CSS-Quelle, sondern das, was der Browser wirklich tut, pruefen. */
async function animationsInfo(p) {
  return p.evaluate(() => {
    const lesen = sel => {
      const el = document.querySelector(sel);
      if (!el) return null;
      return el.getAnimations().map(a => ({
        name: a.animationName || (a.effect && a.effect.getKeyframes && 'keyframes') || '?',
        iterations: a.effect ? a.effect.getTiming().iterations : null,
        playState: a.playState
      }));
    };
    return { brief: lesen('.brief-bild .i-xl'), punkt: lesen('.bestaetigung-warten__punkt') };
  });
}

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});

  console.log('-- aktueller Stand --');
  for (const thema of ['dunkel', 'hell']) {
    const { p, ctx } = await seite(b);
    if (thema === 'hell') await p.evaluate(() => document.documentElement.setAttribute('data-thema', 'hell'));
    await p.waitForTimeout(200);
    const info = await animationsInfo(p);
    pruefe(!!info.brief && info.brief.length > 0 && info.brief.every(a => a.iterations !== Infinity && a.iterations <= 2),
      thema + ': brief-schweben laeuft nicht endlos (Wiederholungen <= 2): ' + JSON.stringify(info.brief));
    pruefe(!!info.punkt && info.punkt.length > 0 && info.punkt.every(a => a.iterations !== Infinity && a.iterations <= 6),
      thema + ': puls laeuft nicht endlos (Wiederholungen <= 6): ' + JSON.stringify(info.punkt));
    console.log(thema, '| Fehler auf der Seite:', p.fehler.join('|') || 'ok');
    await ctx.close();
  }

  console.log('\n-- prefers-reduced-motion: reduce --');
  {
    const { p, ctx } = await seite(b, { ruhig: true });
    // Nach etwas Wartezeit muss alles fertig gelaufen sein (globale Regel setzt animation-duration auf 0.01ms).
    await p.waitForTimeout(500);
    const info = await animationsInfo(p);
    const laueftNoch = (arr) => (arr || []).some(a => a.playState === 'running');
    pruefe(!laueftNoch(info.brief) && !laueftNoch(info.punkt),
      'reduzierte Bewegung: nichts laeuft mehr nach kurzer Wartezeit: ' + JSON.stringify(info));
    console.log('reduced-motion | Fehler auf der Seite:', p.fehler.join('|') || 'ok');
    await ctx.close();
  }

  console.log('\n-- grep "infinite" in styles.css --');
  const cssPfad = path.join(REPO, 'styles.css');
  const css = fs.readFileSync(cssPfad, 'utf8');
  const zeilen = css.split('\n').map((z, i) => [i + 1, z]).filter(([, z]) => /infinite/.test(z) && !/^\s*\/\*|^\s*\*/.test(z));
  const erlaubt = /dreh 640ms|schimmer 1\.4s|boot-hof|boot-linie|einstieg-atmen/;
  const unerwartet = zeilen.filter(([, z]) => !erlaubt.test(z));
  console.log('  gefunden:', zeilen.map(([n]) => n).join(', '));
  pruefe(unerwartet.length === 0,
    'nur Ladekreis/Skelett/Ladebildschirm/einstieg-atmen benutzen noch "infinite": ' +
    (unerwartet.length ? JSON.stringify(unerwartet) : 'ok'));

  console.log('\n' + funde + ' Fehler insgesamt auf dem aktuellen Stand.');

  if (CSS_ALT) {
    console.log('\n-- Gegenprobe gegen 5ad0a11 (muss rot sein) --');
    let altFunde = 0;
    const { p, ctx } = await seite(b, { cssAlt: true });
    const info = await animationsInfo(p);
    const briefEndlos = (info.brief || []).some(a => a.iterations === Infinity);
    const punktEndlos = (info.punkt || []).some(a => a.iterations === Infinity);
    if (!briefEndlos) { console.log('  unerwartet: alter Stand hat brief-schweben schon begrenzt'); altFunde++; }
    else console.log('  ok (=Fehler im Altstand): brief-schweben laeuft im alten Stand endlos');
    if (!punktEndlos) { console.log('  unerwartet: alter Stand hat puls schon begrenzt'); altFunde++; }
    else console.log('  ok (=Fehler im Altstand): puls laeuft im alten Stand endlos');
    await ctx.close();
    console.log('\n' + altFunde + ' unerwartete "schon gut"-Treffer im Altstand (soll 0 sein).');
    funde += altFunde;
  }

  await b.close();
  process.exitCode = funde ? 1 : 0;
})();
