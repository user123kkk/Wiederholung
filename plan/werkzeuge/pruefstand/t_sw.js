/* Gegenprobe fest auf Commit 7563249 (Stand vor 3.17.36): gegen HEAD waere sie nach
   dem Commit der Behebung wertlos - HEAD IST dann die Behebung (LEHREN § 15). */
/* G-029/G-068 (TECHNIK-4/TECHNIK-11): Service Worker (sw.js).
   A) unveraenderliche URLs (app.js?v=…, styles.css?v=…, firebase-*.js) sind
      "Cache zuerst" - nach einer Aufwaermrunde loest kein Reload mehr eine
      Netzanfrage dafuer aus; die Navigation (index.html) bleibt "Netz zuerst".
   B) eine neue, noch nicht zwischengespeicherte Version (neues ?v=) wird
      trotzdem vom Netz geholt - "Cache zuerst" heisst nicht "nur Cache".
   C) fehlt beim Installieren einer neuen Version eine Kerndatei (app.js),
      MUSS die Installation scheitern und der alte, funktionierende Worker
      samt Cache aktiv bleiben.

   Zaehlen ueber ctx.on('request') funktioniert hier NICHT zuverlaessig: Chrome
   meldet darueber auch Ressourcen, die der Service Worker rein aus dem
   Cache Storage beantwortet, ohne dass je eine echte Netzanfrage lief. Erst
   an context.route() haengende Zaehler schlagen nur an, wenn tatsaechlich
   ein Netzabruf versucht wird (das war die "Methode, die im Gegentest
   wirklich anschlaegt" - mit der ersten Fassung dieses Tests, per
   ctx.on('request'), war Station A GEGEN DIE EIGENE, korrekte sw.js rot).

   registration.update() loest in diesem Aufbau (Chromium/Playwright,
   context.route) KEINEN sichtbaren Netzabruf fuer sw.js aus - offenbar
   umgeht der interne Update-Check hier den ueblichen Netzwerk-Pfad.
   navigator.serviceWorker.register(neueUrl) mit einer veraenderten Skript-
   URL (z.B. "./sw.js?upd=…") loest dieselbe Installations-Kaskade aus und
   WIRD abgefangen - das benutzt Station C deshalb statt update(). Ein Fund,
   der nicht in diesen Auftrag gehoert (siehe Bericht).

   SW-eigene Netzanfragen sieht nur context.route (Chromium), nicht
   page.route - siehe lib.js. Deshalb baut dieser Test eigene Kontexte statt
   neueSeite() aus lib.js zu verwenden.

   Gegenprobe (LEHREN § 5.3): A und C laufen zusaetzlich gegen die letzte
   COMMITTETE sw.js (git show 7563249:sw.js, nur in eine Variable im Speicher
   gelesen - die Datei im Repo bleibt unangetastet). Dort ist alles "Netz
   zuerst" und jede Datei einzeln mit .catch() - der Test muss dort FEHLER
   melden, sonst waere er nichts wert. */
const { chromium } = require('playwright');
const { APP, AUTH, FS } = require('./stubs');
const { vollerStore } = require('./lib');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..', '..');
const BASE = 'http://127.0.0.1:8099/index.html';
const APP_JS_ECHT = fs.readFileSync(path.join(REPO, 'app.js'), 'utf8');
const INDEX_ECHT = fs.readFileSync(path.join(REPO, 'index.html'), 'utf8');
const SW_NEU = fs.readFileSync(path.join(REPO, 'sw.js'), 'utf8'); // die gerade geaenderte Datei
let SW_ALT = null;
try {
  SW_ALT = execSync('git show 7563249:sw.js', { cwd: REPO, encoding: 'utf8' });
} catch (e) {
  console.log('Kein Git-HEAD fuer sw.js gefunden - Gegenprobe entfaellt:', e.message);
}

let funde = 0;
function pruefe(bedingung, text) {
  if (bedingung) { console.log('ok     ', text); }
  else { console.log('FEHLER ', text); funde++; }
}

/* Eigener Kontext statt lib.js' neueSeite(): braucht context.route (nicht
   page.route), damit auch Anfragen, die der Service Worker selbst stellt,
   erfasst/gestubbt werden. opt.swText ersetzt die ausgelieferte sw.js durch
   einen anderen Text (fuer die Gegenprobe). zaehler wird bei jeder
   tatsaechlichen Netzanfrage fuer die beobachteten Muster hochgezaehlt. */
async function neuerKontext(b, opt = {}) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'allow' });
  const zaehler = { appJs: 0, stylesCss: 0, fbApp: 0, fbAuth: 0, fbFs: 0, navigation: 0 };
  if (opt.swText) {
    await ctx.route('**/sw.js', r => r.fulfill({ status: 200, contentType: 'text/javascript', body: opt.swText }));
  }
  await ctx.route('**/www.gstatic.com/**', r => {
    const u = r.request().url();
    if (/firebase-app\.js/.test(u)) zaehler.fbApp++;
    else if (/firebase-auth\.js/.test(u)) zaehler.fbAuth++;
    else if (/firebase-firestore\.js/.test(u)) zaehler.fbFs++;
    r.fulfill({ status: 200, contentType: 'text/javascript', body: u.includes('auth') ? AUTH : u.includes('firestore') ? FS : APP });
  });
  await ctx.route('**/verses.quran.foundation/**', r => r.abort());
  await ctx.route('**/apis.google.com/**', r => r.abort());
  await ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/app.js') && u.searchParams.has('v'),
    r => { zaehler.appJs++; r.continue(); });
  await ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/styles.css') && u.searchParams.has('v'),
    r => { zaehler.stylesCss++; r.continue(); });
  await ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/index.html'),
    r => { zaehler.navigation++; r.continue(); });
  const p = await ctx.newPage();
  p.fehler = [];
  p.on('pageerror', e => p.fehler.push('PAGEERROR: ' + e.message));
  const init = { user: { uid: 'u1', email: 'test@example.com', displayName: 'Test', emailVerified: true, metadata: { creationTime: 'Mon, 03 Aug 2026 10:00:00 GMT' } }, store: vollerStore(), ls: {} };
  await p.addInitScript(i => {
    window.__START_USER = i.user; window.__START_STORE = i.store;
    try { for (const [k, v] of Object.entries(i.ls)) localStorage.setItem(k, v); } catch (e) {}
  }, init);
  return { ctx, p, zaehler };
}

async function ladenBisKontrolliert(p) {
  await p.goto(BASE, { waitUntil: 'load' });
  try {
    await p.waitForFunction(() => !!navigator.serviceWorker.controller, { timeout: 6000 });
  } catch (e) {
    // ggf. einmal neu laden - self.clients.claim() in activate() sollte das
    // eigentlich schon beim ersten Laden erledigen, aber sicher ist sicher.
    await p.reload({ waitUntil: 'load' });
    await p.waitForFunction(() => !!navigator.serviceWorker.controller, { timeout: 6000 });
  }
}

/* Station A: nach einer Aufwaermrunde (damit auch die gstatic-Dateien einmal
   im SW-Cache liegen) loest ein weiterer Reload fuer app.js?v=…,
   styles.css?v=… und die drei firebase-*.js KEINE Netzanfrage mehr aus;
   index.html (Navigation) geht weiter ans Netz. */
async function stationA(b, swText) {
  const { ctx, p, zaehler } = await neuerKontext(b, { swText });
  await ladenBisKontrolliert(p);
  await p.reload({ waitUntil: 'load' });            // Aufwaermrunde: gstatic ins Cache
  await p.waitForTimeout(1500);
  Object.keys(zaehler).forEach(k => { zaehler[k] = 0; }); // ab hier wird mitgeschnitten
  await p.reload({ waitUntil: 'load' });
  await p.waitForTimeout(1500);
  await ctx.close();
  return { ...zaehler };
}

/* Station B: der Server liefert eine index.html mit einem NEUEN ?v= aus
   (noch nicht im Cache) - die dazugehoerige app.js?v=TEST muss trotz
   "Cache zuerst" vom Netz geholt werden. */
async function stationB(b) {
  const { ctx, p } = await neuerKontext(b);
  await ladenBisKontrolliert(p);
  await p.reload({ waitUntil: 'load' });             // app.js/styles.css der jetzigen VERSION ins Cache
  await p.waitForTimeout(1200);
  const neuHtml = INDEX_ECHT
    .replace(/app\.js\?v=[^"']+/, 'app.js?v=TEST')
    .replace(/styles\.css\?v=[^"']+/, 'styles.css?v=TEST');
  let appJsTestTreffer = 0;
  await ctx.route('**/index.html', r => r.fulfill({ status: 200, contentType: 'text/html', body: neuHtml }));
  await ctx.route(u => u.pathname.endsWith('/app.js') && u.searchParams.get('v') === 'TEST',
    r => { appJsTestTreffer++; r.fulfill({ status: 200, contentType: 'text/javascript', body: APP_JS_ECHT }); });
  await p.reload({ waitUntil: 'load' });
  await p.waitForTimeout(1200);
  await ctx.close();
  return appJsTestTreffer > 0;
}

/* Station C: eine neue Version, deren app.js?v=<neu> mit 500 antwortet, darf
   die Installation NICHT erfolgreich abschliessen - der alte Worker/Cache
   muss danach noch aktiv sein. Ohne die 500 muss das Update dagegen gelingen
   und der alte Cache verschwinden.

   navigator.serviceWorker.register(neueSkriptUrl) statt reg.update() - siehe
   Kommentar am Dateianfang. */
async function stationC(b, { versagt, swBasis, marker }) {
  const { ctx, p } = await neuerKontext(b);
  await ladenBisKontrolliert(p);
  await p.waitForTimeout(800);
  const vorher = await p.evaluate(async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    return { caches: await caches.keys(), active: reg.active && reg.active.scriptURL };
  });
  const neueVersion = '3.17.35-' + marker;
  const swNeuerText = swBasis.replace(/const CACHE_NAME = "[^"]+"/, 'const CACHE_NAME = "adrabic-' + neueVersion + '"');
  await ctx.route('**/sw.js*', r => r.fulfill({ status: 200, contentType: 'text/javascript', body: swNeuerText }));
  if (versagt) {
    await ctx.route(u => u.pathname.endsWith('/app.js') && u.searchParams.get('v') === neueVersion,
      r => r.fulfill({ status: 500, body: 'kaputt' }));
  }
  await p.evaluate(pfad => navigator.serviceWorker.register(pfad).catch(() => {}), './sw.js?upd=' + marker);
  await p.waitForTimeout(3000);
  const nachher = await p.evaluate(async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    return { caches: await caches.keys(), installing: !!reg.installing, waiting: !!reg.waiting, active: reg.active && reg.active.scriptURL };
  });
  const appJsNeuImCache = await p.evaluate(u => caches.match(u).then(r => !!r), './app.js?v=' + neueVersion);
  await ctx.close();
  return { vorher, neuerCacheName: 'adrabic-' + neueVersion, nachher, appJsNeuImCache };
}

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});

  // --- Station A, gegen die NEUE sw.js (unser Fix) ---
  const a = await stationA(b, null);
  console.log('A (neu):', JSON.stringify(a));
  pruefe(a.appJs === 0, 'A: app.js?v=… kommt beim zweiten Reload aus dem Cache (keine Netzanfrage)');
  pruefe(a.stylesCss === 0, 'A: styles.css?v=… kommt beim zweiten Reload aus dem Cache (keine Netzanfrage)');
  pruefe(a.fbApp === 0 && a.fbAuth === 0 && a.fbFs === 0, 'A: firebase-*.js kommen beim zweiten Reload aus dem Cache (keine Netzanfrage)');
  pruefe(a.navigation > 0, 'A: index.html (Navigation) geht weiter ans Netz');

  // --- Station B ---
  const bTreffer = await stationB(b);
  console.log('B: neue app.js?v=TEST vom Netz geholt?', bTreffer);
  pruefe(bTreffer, 'B: eine neue, noch nicht zwischengespeicherte app.js?v=TEST wird vom Netz geholt');

  // --- Station C: scheiternde Installation ---
  const cFail = await stationC(b, { versagt: true, swBasis: SW_NEU, marker: 'c-fail' });
  console.log('C (scheitert):', JSON.stringify(cFail));
  pruefe(cFail.nachher.active === cFail.vorher.active, 'C: nach gescheiterter Installation ist weiterhin der alte Worker aktiv');
  pruefe(cFail.nachher.caches.includes(cFail.vorher.caches[0]), 'C: nach gescheiterter Installation ist der alte Cache noch da');
  pruefe(!cFail.nachher.installing && !cFail.nachher.waiting, 'C: kein haengengebliebener installierender/wartender Worker nach dem Fehlschlag');

  // --- Station C: gelingende Installation (Gegenrichtung) ---
  const cOk = await stationC(b, { versagt: false, swBasis: SW_NEU, marker: 'c-ok' });
  console.log('C (gelingt):', JSON.stringify(cOk));
  pruefe(cOk.nachher.active !== cOk.vorher.active, 'C: nach gelungener Installation ist der neue Worker aktiv');
  pruefe(cOk.nachher.caches.includes(cOk.neuerCacheName), 'C: nach gelungener Installation gibt es den neuen Cache');
  pruefe(!cOk.nachher.caches.includes(cOk.vorher.caches[0]), 'C: nach gelungener Installation ist der alte Cache weg');
  pruefe(cOk.appJsNeuImCache, 'C: die neue app.js liegt nach gelungener Installation im Cache');

  await b.close();

  /* Gegenprobe: dieselben Stationen A und C gegen die letzte COMMITTETE
     sw.js (git show 7563249:sw.js) - dort ist alles "Netz zuerst" und jede
     Datei einzeln mit .catch(). Diese muessen ROT sein, sonst waere der Test
     oben nichts wert (LEHREN § 5.3). Die Gegenprobe zaehlt eigene "ok"-/
     "FEHLER"-Zeilen wie die eigentlichen Pruefungen - ein "ok" bedeutet
     hier: "die alte sw.js zeigt tatsaechlich den Fehler". */
  if (SW_ALT) {
    const b2 = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
    const aAlt = await stationA(b2, SW_ALT);
    console.log('Gegenprobe A (alte sw.js):', JSON.stringify(aAlt));
    const aAltRot = aAlt.appJs > 0 && aAlt.stylesCss > 0 && (aAlt.fbApp > 0 || aAlt.fbAuth > 0 || aAlt.fbFs > 0);
    pruefe(aAltRot, 'Gegenprobe A: die alte sw.js fragt beim zweiten Reload weiter das Netz (muss ROT sein)');

    const cAlt = await stationC(b2, { versagt: true, swBasis: SW_ALT, marker: 'alt-fail' });
    console.log('Gegenprobe C (alte sw.js):', JSON.stringify(cAlt));
    // Der Fehler bei der alten sw.js: trotz 500 auf app.js wird der neue
    // Worker aktiv, der alte Cache verschwindet, und die neue app.js liegt
    // NICHT im Cache - genau das Bild aus der Fehlerbeschreibung (TECHNIK-11).
    const cAltRot = cAlt.nachher.active !== cAlt.vorher.active
      && !cAlt.nachher.caches.includes(cAlt.vorher.caches[0])
      && !cAlt.appJsNeuImCache;
    pruefe(cAltRot, 'Gegenprobe C: die alte sw.js aktiviert die neue Version trotz fehlender app.js und loescht den alten Cache (muss ROT sein)');
    await b2.close();
  } else {
    console.log('Gegenprobe uebersprungen: kein Git-HEAD fuer sw.js gefunden');
  }

  console.log('Funde:', funde);
  if (funde > 0) process.exit(1);
})();
