/* Gegenprobe fest auf Commit 7563249 (Stand vor 3.17.36): gegen HEAD waere sie nach
   dem Commit der Behebung wertlos - HEAD IST dann die Behebung (LEHREN § 15). */
/* G-030 (3.17.36): initFirebase() laedt die drei Firebase-Bausteine seit
   dieser Version mit Promise.all() statt nacheinander mit drei einzelnen
   await. Dieser Test verzoegert alle gstatic-Antworten kuenstlich um rund
   300 ms und misst, wann die drei firebase-*.js-Anfragen jeweils LOSGEHEN
   (nicht wann sie fertig sind): Bei einem Wasserfall liegen die Startzeiten
   je rund 300 ms auseinander, parallel liegen sie innerhalb weniger ms.

   Wichtig: index.html startet die drei Abrufe seit G-030 zusaetzlich per
   modulepreload schon beim Parsen - das allein macht die Startzeiten schon
   eng, unabhaengig davon, ob app.js parallel oder nacheinander laedt. Um die
   Aenderung an app.js selbst zu belegen, misst dieser Test daher ZWEIMAL:
   einmal mit dem echten index.html (mit modulepreload), einmal mit den drei
   modulepreload-Zeilen per Routing entfernt (ohne modulepreload) - nur der
   zweite Lauf zeigt, ob initFirebase() selbst parallel laedt. */
const path = require('path');
const { execFileSync } = require('child_process');
const { start, vollerStore } = require('./lib');
const { AUTH, FS, APP } = require('./stubs');

const WURZEL = path.join(__dirname, '..', '..', '..');
const VERZOEGERUNG_MS = 300;
const TOLERANZ_MS = 60; // Ziel laut Auftrag ~50 ms, etwas Luft gegen Jitter im Prüfstand

const funde = [];

function bausteinKoerper(url) {
  if (url.includes('firebase-auth')) return AUTH;
  if (url.includes('firebase-firestore')) return FS;
  return APP; // firebase-app.js
}

// Liefert gstatic-Firebase-Dateien verzoegert aus, damit ein Wasserfall
// sichtbar wird (parallel: alle Anfragen liegen eng beieinander).
async function routeVerzoegertesGstatic(p) {
  await p.route('**/www.gstatic.com/firebasejs/**', async r => {
    await new Promise(res => setTimeout(res, VERZOEGERUNG_MS));
    r.fulfill({ status: 200, contentType: 'text/javascript', body: bausteinKoerper(r.request().url()) });
  });
}

// Startzeiten der drei firebase-*.js-Anfragen mitschreiben (Anfrage-Beginn,
// nicht Antwort - genau das zeigt den Wasserfall bzw. dessen Fehlen).
function verkableStartzeiten(p) {
  const start = {};
  p.on('request', req => {
    const u = req.url();
    const m = u.match(/firebasejs\/[^/]+\/firebase-(app|auth|firestore)\.js/);
    if (m && !(m[1] in start)) start[m[1]] = Date.now();
  });
  return start;
}

function spanne(start) {
  const werte = Object.values(start);
  if (werte.length < 3) return null;
  return Math.max(...werte) - Math.min(...werte);
}

async function seiteMitInit(browser, opt) {
  const initUser = { uid: 'u1', email: 'test@example.com', displayName: 'Test', emailVerified: true,
    metadata: { creationTime: 'Mon, 03 Aug 2026 10:00:00 GMT' } };
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  p.fehler = [];
  p.on('pageerror', e => p.fehler.push('PAGEERROR: ' + e.message));
  const start = verkableStartzeiten(p);
  await routeVerzoegertesGstatic(p);
  await p.route('**/verses.quran.foundation/**', r => r.abort());
  await p.route('**/apis.google.com/**', r => r.abort());
  if (opt.appJsKoerper) {
    await p.route('**/app.js?*', r => r.fulfill({ status: 200, contentType: 'text/javascript', body: opt.appJsKoerper }));
  }
  if (opt.ohneModulepreload) {
    // Navigation abfangen und die drei modulepreload-Zeilen fuer Firebase
    // herausnehmen - NICHT die Datei im Repo aendern.
    await p.route('**/index.html', async r => {
      const resp = await r.fetch();
      const html = (await resp.text()).replace(
        /<link rel="modulepreload" href="https:\/\/www\.gstatic\.com\/firebasejs\/[^"]+" crossorigin>\n?/g,
        ''
      );
      r.fulfill({ response: resp, body: html, headers: { ...resp.headers(), 'content-length': String(Buffer.byteLength(html)) } });
    });
  }
  // Der eigene Service Worker (app.js registriert sw.js) darf bei den
  // absichtlich verlangsamten Anfragen dieses Tests nicht dazwischenfunken:
  // Aktiviert er sich waehrend eines langsamen Wasserfalls (Gegenprobe unten
  // mit altem app.js), fing er die spaeten gstatic-Anfragen ab und sie
  // schlugen mit ERR_FAILED fehl (ausserhalb unserer Route, per Test
  // nachgewiesen) - ein reines Artefakt der Verzoegerung, nichts, was G-030
  // betrifft. SW-Registrierung deshalb fuer diesen Test abschalten.
  await p.addInitScript(() => {
    try {
      Object.defineProperty(navigator, 'serviceWorker', {
        value: { register: () => Promise.resolve({}), getRegistrations: () => Promise.resolve([]) }
      });
    } catch (e) {}
  });
  await p.addInitScript(i => {
    window.__START_USER = i.user; window.__START_STORE = i.store;
  }, { user: initUser, store: vollerStore() });
  await p.goto('http://127.0.0.1:8099/index.html', { waitUntil: 'load' });
  await p.waitForTimeout(1600);
  return { ctx, p, start };
}

(async () => {
  const b = await start();

  // 1) Mit modulepreload (echtes index.html) - erwartungsgemaess eng, weil
  //    der Browser die Abrufe unabhaengig von app.js schon vorzieht.
  const a = await seiteMitInit(b, {});
  const spanneMit = spanne(a.start);
  console.log('Mit modulepreload: Startzeiten', a.start, '| Spanne', spanneMit, 'ms');
  if (spanneMit === null) funde.push('Mit modulepreload: nicht alle drei Anfragen gesehen: ' + JSON.stringify(a.start));
  else if (spanneMit > TOLERANZ_MS) funde.push('Mit modulepreload: Spanne ' + spanneMit + ' ms > ' + TOLERANZ_MS + ' ms');
  const angemeldetMit = await a.p.evaluate(() => !!document.querySelector('.lernen-gruss'));
  console.log('Mit modulepreload: Lernen-Bildschirm sichtbar?', angemeldetMit, a.p.fehler.join('|') || 'ok');
  if (!angemeldetMit) funde.push('Mit modulepreload: kein Lernen-Bildschirm nach dem Start');
  if (a.p.fehler.length) funde.push('Mit modulepreload: Seitenfehler: ' + a.p.fehler.join('|'));
  await a.ctx.close();

  // 2) Ohne modulepreload - zeigt, ob initFirebase() selbst parallel laedt.
  const c = await seiteMitInit(b, { ohneModulepreload: true });
  const spanneOhne = spanne(c.start);
  console.log('Ohne modulepreload (aktuelles app.js): Startzeiten', c.start, '| Spanne', spanneOhne, 'ms');
  if (spanneOhne === null) funde.push('Ohne modulepreload: nicht alle drei Anfragen gesehen: ' + JSON.stringify(c.start));
  else if (spanneOhne > TOLERANZ_MS) funde.push('Ohne modulepreload: Spanne ' + spanneOhne + ' ms > ' + TOLERANZ_MS + ' ms (Wasserfall statt parallel)');
  const angemeldetOhne = await c.p.evaluate(() => !!document.querySelector('.lernen-gruss'));
  console.log('Ohne modulepreload: Lernen-Bildschirm sichtbar?', angemeldetOhne, c.p.fehler.join('|') || 'ok');
  if (!angemeldetOhne) funde.push('Ohne modulepreload: kein Lernen-Bildschirm nach dem Start');
  if (c.p.fehler.length) funde.push('Ohne modulepreload: Seitenfehler: ' + c.p.fehler.join('|'));
  await c.ctx.close();

  // 3) Gegenprobe: altes app.js (Stand vor G-030, aus HEAD) ohne
  //    modulepreload muss den Wasserfall zeigen - Beleg, dass der Test die
  //    Aenderung an initFirebase() selbst misst und nicht nur modulepreload.
  // Stand vor G-030 direkt aus git holen statt eine zweite Kopie im Repo zu
  // pflegen - HEAD ist hier absichtlich der alte, noch nicht committete
  // Wasserfall-Code (diese Aufgabe committet nicht).
  const altesAppJs = execFileSync('git', ['show', '7563249:app.js'], { cwd: WURZEL }).toString();
  const d = await seiteMitInit(b, { ohneModulepreload: true, appJsKoerper: altesAppJs });
  const spanneAlt = spanne(d.start);
  console.log('GEGENPROBE altes app.js, ohne modulepreload: Startzeiten', d.start, '| Spanne', spanneAlt, 'ms',
    spanneAlt !== null && spanneAlt > TOLERANZ_MS ? '(erwartungsgemaess Wasserfall, ROT - Beleg der Testschaerfe)' : '(unerwartet eng!)');
  await d.ctx.close();

  await b.close();

  console.log('');
  console.log('Funde: ' + funde.length);
  funde.forEach(f => console.log(' - ' + f));
  process.exit(funde.length ? 1 : 0);
})();
