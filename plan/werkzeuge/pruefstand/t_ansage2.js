/* Gegenprobe fest auf Commit dd81f95 (Stand vor 3.17.37): gegen HEAD waere sie nach
   dem Commit der Behebung wertlos - HEAD IST dann die Behebung (LEHREN § 15). */
/* G-087: weitere Live-Regionen, die bisher mit ihrem Text zusammen ins DOM
   kamen (render() ersetzt #app komplett) - dieselbe Ursache wie t_ansage.js
   (dort: zeigeToast()), nur an anderen Stellen. Seit 3.17.37 sagt #ansage
   (index.html) den Text an, und die sichtbaren Elemente tragen kein
   role="status"/aria-live mehr, damit nichts doppelt vorgelesen wird.

   Prueft:
   (a) Anmelde-Info ("Passwort vergessen" -> Info) landet in #ansage, das
       sichtbare .info-box hat kein role/aria-live mehr.
   (b) Modus-Wechsel (Uebungsmodus starten) landet in #ansage, das sichtbare
       .mitte-wechsel__a hat kein role/aria-live mehr.
   (c) Gegenprobe gegen den letzten COMMITTETEN Stand (git show dd81f95:app.js,
       nur im Speicher, die Datei im Repo bleibt unangetastet - per
       ctx.route auf app.js ausgeliefert, VOR dem ersten goto
       registriert): dort bleibt #ansage in beiden Faellen leer (muss ROT
       sein, sonst waere der Test nichts wert, LEHREN Paragraph 5.3).
   (d) keine Seitenfehler. */
const { chromium } = require('playwright');
const { APP, AUTH, FS } = require('./stubs');
const { vollerStore } = require('./lib');
const { execSync } = require('child_process');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const BASE = 'http://127.0.0.1:8099/index.html';
const APP_JS_ALT = execSync('git show dd81f95:app.js', { cwd: REPO, maxBuffer: 1024 * 1024 * 20 }).toString();

/* Eigener Kontext statt lib.js' neueSeite(): die Gegenprobe braucht eine
   Route auf app.js, die VOR dem ersten goto() steht - siehe t_sw.js. */
async function neuerKontext(b, opt = {}) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const p = await ctx.newPage();
  p.fehler = [];
  p.on('pageerror', e => p.fehler.push('PAGEERROR: ' + e.message));
  p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|ERR_/.test(m.text())) p.fehler.push('CONSOLE: ' + m.text()); });
  if (opt.appJsAlt) {
    await ctx.route('**/app.js*', r => r.fulfill({ status: 200, contentType: 'text/javascript', body: APP_JS_ALT }));
  }
  await ctx.route('**/www.gstatic.com/**', r => {
    const u = r.request().url();
    r.fulfill({ status: 200, contentType: 'text/javascript', body: u.includes('auth') ? AUTH : u.includes('firestore') ? FS : APP });
  });
  await ctx.route('**/verses.quran.foundation/**', r => r.abort());
  await ctx.route('**/apis.google.com/**', r => r.abort());
  const init = { user: opt.user === undefined ? { uid: 'u1', email: 'test@example.com', displayName: 'Test', emailVerified: true, metadata: { creationTime: 'Mon, 03 Aug 2026 10:00:00 GMT' } } : opt.user,
    store: opt.store || vollerStore(), ls: opt.ls || {} };
  await p.addInitScript(i => {
    window.__START_USER = i.user; window.__START_STORE = i.store;
    try { for (const [k, v] of Object.entries(i.ls)) localStorage.setItem(k, v); } catch (e) {}
  }, init);
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForTimeout(1500);
  return { ctx, p };
}

async function aktion(p, action, id, warte = 550) {
  const ok = await p.evaluate(([a, id]) => {
    const els = [...document.querySelectorAll('[data-action="' + a + '"]')].filter(e => id == null || e.dataset.id === id);
    const el = els.find(e => e.offsetParent !== null) || els[0];
    if (!el) return false; el.click(); return true;
  }, [action, id]);
  if (!ok) throw new Error('keine Aktion ' + action + (id ? ' / ' + id : ''));
  await p.waitForTimeout(warte);
}

async function anmeldeInfoLauf(p) {
  await aktion(p, 'einstieg-konto', null, 900);
  await aktion(p, 'mode-reset', null, 700);
  await p.fill('#a-email', 'x@y.de');
  await aktion(p, 'reset', null, 1200);
  return p.evaluate(() => {
    const ansage = document.getElementById('ansage');
    const box = document.querySelector('.info-box');
    return {
      ansageText: ansage ? ansage.textContent.trim() : null,
      boxText: box ? box.innerText.trim() : null,
      boxRolle: box ? box.getAttribute('role') : null,
      boxLive: box ? box.getAttribute('aria-live') : null,
    };
  });
}

async function modusWechselLauf(p) {
  await aktion(p, 'tab-verwalten', null, 800);
  await aktion(p, 'open-drill', null, 700);
  await aktion(p, 'start-drill', null, 900);
  return p.evaluate(() => {
    const ansage = document.getElementById('ansage');
    const el = document.querySelector('.mitte-wechsel__a');
    return {
      ansageText: ansage ? ansage.textContent.trim() : null,
      elText: el ? el.textContent.trim() : null,
      elRolle: el ? el.getAttribute('role') : null,
      elLive: el ? el.getAttribute('aria-live') : null,
    };
  });
}

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  let fehler = 0;
  const pruef = (bez, ok, info) => {
    if (!ok) fehler++;
    console.log((ok ? 'OK  ' : 'FEHL') + ' ' + bez + (info ? ' | ' + info : ''));
  };

  // ---- neuer Code: soll gruen sein ----
  {
    const { ctx, p } = await neuerKontext(b, { user: null });
    const a = await anmeldeInfoLauf(p);
    pruef('(a) #ansage traegt die Anmelde-Info', !!a.ansageText, 'ansage="' + a.ansageText + '" box="' + a.boxText + '"');
    pruef('(a) .info-box ohne role/aria-live', !a.boxRolle && !a.boxLive, 'role=' + a.boxRolle + ' aria-live=' + a.boxLive);
    pruef('(a) keine Seitenfehler', p.fehler.length === 0, p.fehler.join(' / '));
    await ctx.close();
  }
  {
    const { ctx, p } = await neuerKontext(b, {});
    const m = await modusWechselLauf(p);
    pruef('(b) #ansage traegt den Modus-Wechsel', m.ansageText === 'Übung – zählt nicht als Wiederholung', 'ansage="' + m.ansageText + '" el="' + m.elText + '"');
    pruef('(b) .mitte-wechsel__a ohne role/aria-live', !m.elRolle && !m.elLive, 'role=' + m.elRolle + ' aria-live=' + m.elLive);
    pruef('(b) keine Seitenfehler', p.fehler.length === 0, p.fehler.join(' / '));
    await ctx.close();
  }

  // ---- Gegenprobe: letzter committeter Stand (git HEAD) soll rot sein ----
  {
    const { ctx, p } = await neuerKontext(b, { user: null, appJsAlt: true });
    const a = await anmeldeInfoLauf(p);
    pruef('(c) Gegenprobe Anmelde-Info: alter Stand bleibt stumm (muss ROT sein)', !a.ansageText, 'ansage="' + a.ansageText + '" box="' + a.boxText + '"');
    await ctx.close();
  }
  {
    const { ctx, p } = await neuerKontext(b, { appJsAlt: true });
    const m = await modusWechselLauf(p);
    pruef('(c) Gegenprobe Modus-Wechsel: alter Stand bleibt stumm (muss ROT sein)', !m.ansageText, 'ansage="' + m.ansageText + '" el="' + m.elText + '"');
    await ctx.close();
  }

  await b.close();
  console.log(fehler === 0 ? 'Alle Faelle richtig.' : (fehler + ' Fehlschlaege.'));
  process.exit(fehler === 0 ? 0 : 1);
})();
