/* Gegenprobe fest auf Commit dd81f95 (Stand vor 3.17.37): gegen HEAD waere sie nach
   dem Commit der Behebung wertlos - HEAD IST dann die Behebung (LEHREN § 15). */
/* G-067 (REST-13): "Fehler melden" - leer abschicken zeigte bisher einen
   dlgAlert() (LEHREN § 6.7: Fehler gehoeren ans Feld, nicht in den Dialog).
   Ausserdem setzte closeErrorModal() das Formular bei JEDEM Schliessen
   zurueck (Esc/X/Zurueck) - seit 3.17.37 nur noch nach erfolgreichem
   Absenden.

   Prueft:
   (a) leer absenden -> Fehlerzeile am Feld sichtbar, aria-invalid="true",
       Fokus im Feld, KEIN .dlg/dlgAlert, Modal bleibt offen.
   (b) tippen laesst die Fehlerzeile wieder verschwinden.
   (c) Esc schliesst und OEFFNET erneut -> Text ist noch da.
   (d) erfolgreich absenden (mailto abgefangen) -> Text bleibt stehen
       (3.17.14: ob ein Mailprogramm aufging, weiss die Seite nicht), kein
       Feldfehler mehr.
   (e) Gegenprobe gegen den letzten committeten Stand (git show dd81f95:app.js):
       dort zeigt leer absenden einen .dlg (dlgAlert), keine Fehlerzeile am
       Feld - und der Text bleibt nach Esc/X NICHT erhalten (Formular wird
       zurueckgesetzt). Muss ROT sein (LEHREN § 5.3), sonst waere der Test
       nichts wert. */
const { chromium } = require('playwright');
const { APP, AUTH, FS } = require('./stubs');
const { vollerStore } = require('./lib');
const { execSync } = require('child_process');
const path = require('path');

const REPO = path.join(__dirname, '..', '..', '..');
const BASE = 'http://127.0.0.1:8099/index.html';
const APP_JS_ALT = execSync('git show dd81f95:app.js', { cwd: REPO, maxBuffer: 1024 * 1024 * 20 }).toString();

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

const feldZustand = p => p.evaluate(() => {
  const ta = document.getElementById('error-description');
  const fehler = document.getElementById('error-description-fehler');
  const modal = document.getElementById('errorModal');
  return {
    text: ta ? ta.value : null,
    ariaInvalid: ta ? ta.getAttribute('aria-invalid') : null,
    fehlerSichtbar: fehler ? !fehler.hidden : null,
    fokusImFeld: document.activeElement === ta,
    modalOffen: modal ? modal.getAttribute('aria-hidden') === 'false' : null,
    dlgDa: !!document.querySelector('.dlg'),
  };
});

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  let fehler = 0;
  const pruef = (bez, ok, info) => { if (!ok) fehler++; console.log((ok ? 'OK  ' : 'FEHL') + ' ' + bez + (info ? ' | ' + info : '')); };

  // ---- neuer Code ----
  {
    const { ctx, p } = await neuerKontext(b);
    await aktion(p, 'einstellungen', null, 900);
    await aktion(p, 'open-error-modal', null, 800);

    // (a) leer absenden
    await p.click('#errorForm button[type=submit]');
    await p.waitForTimeout(400);
    const a = await feldZustand(p);
    pruef('(a) Fehlerzeile am Feld sichtbar', a.fehlerSichtbar === true, JSON.stringify(a));
    pruef('(a) aria-invalid="true"', a.ariaInvalid === 'true', JSON.stringify(a));
    pruef('(a) Fokus im Feld', a.fokusImFeld === true, JSON.stringify(a));
    pruef('(a) kein Dialog (.dlg)', a.dlgDa === false, JSON.stringify(a));
    pruef('(a) Modal bleibt offen', a.modalOffen === true, JSON.stringify(a));

    // (b) tippen laesst den Fehler verschwinden
    await p.fill('#error-description', 'Beim Umdrehen flackert die Karte.');
    await p.waitForTimeout(200);
    const b1 = await feldZustand(p);
    pruef('(b) Fehlerzeile weg nach Tippen', b1.fehlerSichtbar === false, JSON.stringify(b1));
    pruef('(b) aria-invalid weg nach Tippen', !b1.ariaInvalid, JSON.stringify(b1));

    // (c) Esc schliesst, wieder oeffnen -> Text noch da
    await p.keyboard.press('Escape');
    await p.waitForTimeout(400);
    await aktion(p, 'open-error-modal', null, 600);
    const c1 = await feldZustand(p);
    pruef('(c) Text nach Esc + erneutem Oeffnen noch da', c1.text === 'Beim Umdrehen flackert die Karte.', JSON.stringify(c1));

    // (d) erfolgreich absenden (mailto abfangen)
    let mailUrl = null;
    p.on('request', r => { if (r.url().startsWith('mailto:')) mailUrl = r.url(); });
    await p.evaluate(() => { window.__hrefAlt = Object.getOwnPropertyDescriptor(window.Location.prototype, 'href'); });
    await p.click('#errorForm button[type=submit]');
    await p.waitForTimeout(500);
    const d1 = await feldZustand(p);
    pruef('(d) mailto: ausgeloest', !!mailUrl, String(mailUrl));
    pruef('(d) Text bleibt nach dem Absenden (3.17.14)', d1.text === 'Beim Umdrehen flackert die Karte.', JSON.stringify(d1));
    pruef('(d) kein Feldfehler mehr', d1.fehlerSichtbar === false, JSON.stringify(d1));
    pruef('(d) keine Seitenfehler', p.fehler.length === 0, p.fehler.join(' / '));
    await ctx.close();
  }

  // ---- Gegenprobe: letzter committeter Stand (git HEAD) soll rot sein ----
  {
    const { ctx, p } = await neuerKontext(b, { appJsAlt: true });
    await aktion(p, 'einstellungen', null, 900);
    await aktion(p, 'open-error-modal', null, 800);
    await p.click('#errorForm button[type=submit]');
    await p.waitForTimeout(400);
    const dlgDa = await p.evaluate(() => !!document.querySelector('.dlg'));
    pruef('(e) Gegenprobe: alter Stand zeigt einen Dialog statt Feldfehler (muss ROT sein)', dlgDa, 'dlgDa=' + dlgDa);
    await p.fill('#error-description', 'Testtext');
    await p.waitForTimeout(300);
    await aktion(p, 'close-error-modal', null, 400);
    await aktion(p, 'open-error-modal', null, 600);
    const text = await p.evaluate(() => { const ta = document.getElementById('error-description'); return ta ? ta.value : null; });
    pruef('(e) Gegenprobe: alter Stand setzt den Text beim Schliessen zurueck (muss ROT sein)', text === '', 'text="' + text + '"');
    await ctx.close();
  }

  await b.close();
  console.log(fehler === 0 ? 'Alle Faelle richtig.' : (fehler + ' Fehlschlaege.'));
  process.exit(fehler === 0 ? 0 : 1);
})();
