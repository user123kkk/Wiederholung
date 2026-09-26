/* G-070 (TECHNIK-13): navigator.storage.persist() anfragen, damit der
   Browser die ungesendeten Schreibvorgaenge im Firestore-IndexedDB-Cache
   nicht bei Speichermangel raeumt - aber NUR in der installierten App
   (display-mode: standalone), nie im normalen Tab (dort zeigt z.B. Firefox
   einen eigenen Dialog), und hoechstens einmal pro Seitenleben.

   Eigene Kontexte statt lib.js' neueSeite(): der Spion auf
   navigator.storage.persist und die display-mode-Faelschung (per CDP) muessen
   VOR dem ersten goto() stehen.

   Prueft:
   (a) standalone: navigator.storage.persist wird nach dem Start GENAU EINMAL
       aufgerufen, auch nach mehreren render() (Tab-Wechsel).
   (b) normaler Tab (kein standalone): 0 Aufrufe. */
const { chromium } = require('playwright');
const { APP, AUTH, FS } = require('./stubs');
const { vollerStore } = require('./lib');

const BASE = 'http://127.0.0.1:8099/index.html';

async function neuerKontext(b, { standalone }) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const p = await ctx.newPage();
  p.fehler = [];
  p.on('pageerror', e => p.fehler.push('PAGEERROR: ' + e.message));
  p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|ERR_/.test(m.text())) p.fehler.push('CONSOLE: ' + m.text()); });
  /* Spion: navigator.storage.persist() ersetzen, VOR jedem Seiten-Skript. */
  await p.addInitScript(() => {
    window.__persistAufrufe = 0;
    const spion = () => { window.__persistAufrufe++; return Promise.resolve(true); };
    if (navigator.storage) navigator.storage.persist = spion;
    else Object.defineProperty(navigator, 'storage', { value: { persist: spion }, configurable: true });
  });
  if (standalone) {
    /* CDP-Emulation (Emulation.setEmulatedMedia mit display-mode) griff in
       diesem Aufbau nicht zuverlaessig - matchMedia() direkt ueberschrieben,
       nur fuer genau die Abfrage, die app.js stellt. */
    await p.addInitScript(() => {
      const echt = window.matchMedia.bind(window);
      window.matchMedia = q => {
        if (q === '(display-mode: standalone)') {
          return { matches: true, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} };
        }
        return echt(q);
      };
    });
  }
  await ctx.route('**/www.gstatic.com/**', r => {
    const u = r.request().url();
    r.fulfill({ status: 200, contentType: 'text/javascript', body: u.includes('auth') ? AUTH : u.includes('firestore') ? FS : APP });
  });
  await ctx.route('**/verses.quran.foundation/**', r => r.abort());
  await ctx.route('**/apis.google.com/**', r => r.abort());
  const init = { user: { uid: 'u1', email: 'test@example.com', displayName: 'Test', emailVerified: true, metadata: { creationTime: 'Mon, 03 Aug 2026 10:00:00 GMT' } },
    store: vollerStore(), ls: {} };
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

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  let fehler = 0;
  const pruef = (bez, ok, info) => { if (!ok) fehler++; console.log((ok ? 'OK  ' : 'FEHL') + ' ' + bez + (info ? ' | ' + info : '')); };

  // (a) standalone: genau 1 Aufruf, auch nach mehreren render().
  {
    const { ctx, p } = await neuerKontext(b, { standalone: true });
    const displayMode = await p.evaluate(() => matchMedia('(display-mode: standalone)').matches);
    const n1 = await p.evaluate(() => window.__persistAufrufe);
    pruef('(a) display-mode: standalone greift in dieser Seite', displayMode === true, 'displayMode=' + displayMode);
    pruef('(a) genau 1 Aufruf nach dem Start', n1 === 1, 'Aufrufe=' + n1);
    await aktion(p, 'tab-fortschritt', null, 700);
    await aktion(p, 'tab-verwalten', null, 700);
    await aktion(p, 'tab-lernen', null, 700);
    const n2 = await p.evaluate(() => window.__persistAufrufe);
    pruef('(a) weiterhin genau 1 Aufruf nach mehreren render()', n2 === 1, 'Aufrufe=' + n2);
    pruef('(a) keine Seitenfehler', p.fehler.length === 0, p.fehler.join(' / '));
    await ctx.close();
  }

  // (b) kein standalone (normaler Tab): 0 Aufrufe.
  {
    const { ctx, p } = await neuerKontext(b, { standalone: false });
    const displayMode = await p.evaluate(() => matchMedia('(display-mode: standalone)').matches);
    await aktion(p, 'tab-fortschritt', null, 700);
    await aktion(p, 'tab-lernen', null, 700);
    const n = await p.evaluate(() => window.__persistAufrufe);
    pruef('(b) display-mode: standalone greift hier NICHT', displayMode === false, 'displayMode=' + displayMode);
    pruef('(b) 0 Aufrufe im normalen Tab', n === 0, 'Aufrufe=' + n);
    pruef('(b) keine Seitenfehler', p.fehler.length === 0, p.fehler.join(' / '));
    await ctx.close();
  }

  await b.close();
  console.log(fehler === 0 ? 'Alle Faelle richtig.' : (fehler + ' Fehlschlaege.'));
  process.exit(fehler === 0 ? 0 : 1);
})();
