/* DATEN-3/DATEN-8: echter Service Worker, nur lokale Dateien und SDK-Attrappe.
   --gegenprobe: fester Vorstand c4b1c30 (3.18.10), erwartete Fehler.
   Abgebrochene und erfolgreiche Installation, Rechtsseiten offline und
   erster Online-Aufruf nach einer Aenderung. Keine Produktivverbindung. */
const assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const { execFileSync } = require('node:child_process');
const http = require('node:http');
const { start, vollerStore } = require('./lib');
const { APP, AUTH, FS } = require('./stubs');
const repo = path.join(__dirname, '../../..');
const alt = process.argv.includes('--gegenprobe');
const sw = alt ? execFileSync('git', ['show', 'c4b1c30:sw.js'], { cwd: repo, encoding: 'utf8' }) : fs.readFileSync(path.join(repo, 'sw.js'), 'utf8');
const version = sw.match(/const CACHE_NAME = "adrabic-([^"]+)"/)[1];
const servers = [];
const html = fs.readFileSync(path.join(repo, 'index.html'), 'utf8').replace(/\?v=[^"']+/g, '?v=' + version);
const app = fs.readFileSync(path.join(repo, 'app.js'), 'utf8');
async function warteAsync(p, pruefung, arg) {
  const ende = Date.now() + 30000;
  while (Date.now() < ende) {
    if (await p.evaluate(pruefung, arg)) return;
    await p.waitForTimeout(100);
  }
  throw new Error('Asynchrone SW-/Cache-Bedingung nach 30 s nicht erfuellt');
}
async function kontext(browser) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'allow' });
  const stand = { update: false, workerNeu: false, versagt: false, htmlNeu: false, legalNeu: false, neueVersion: version + '-paket-a' };
  // Ein echter lokaler Server: Routen fuer Navigationen koennen Chromiums
  // Offline-Schalter umgehen oder vor dem Worker abbrechen (kein SW-Test).
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    let body, type = 'application/octet-stream', status = 200;
    if (url.pathname === '/' || url.pathname === '/index.html') { type = 'text/html'; body = stand.update ? html.replaceAll('?v=' + version, '?v=' + stand.neueVersion) : html; if (stand.htmlNeu) body += '<p id="html-test-neu">Lokale HTML-Korrektur</p>'; }
    else if (url.pathname === '/sw.js') { type = 'text/javascript'; body = stand.workerNeu ? sw.replace('adrabic-' + version, 'adrabic-' + stand.neueVersion) : sw; }
    else if (url.pathname === '/app.js') { type = 'text/javascript'; const v = url.searchParams.get('v'); status = stand.versagt && v === stand.neueVersion ? 503 : 200; body = status === 503 ? 'abgebrochen' : app + '\nwindow.__SW_TEST_VERSION=' + JSON.stringify(v) + ';'; }
    else {
      const file = path.resolve(repo, '.' + url.pathname);
      if (!file.startsWith(repo + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { status = 404; body = 'fehlt'; }
      else { body = fs.readFileSync(file); if (file.endsWith('.html')) { type = 'text/html'; if (stand.legalNeu) body = body.toString() + '<p id="legal-test-neu">Neue lokale Rechtsfassung</p>'; } else if (file.endsWith('.css')) type = 'text/css'; else if (file.endsWith('.json')) type = 'application/json'; }
    }
    res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' }); res.end(body);
  });
  servers.push(server);
  await new Promise(ok => server.listen(0, '127.0.0.1', ok));
  const base = 'http://127.0.0.1:' + server.address().port;
  await ctx.addInitScript(store => { window.__START_STORE = store; window.__START_USER = { uid: 'u1', email: 'test@example.com', emailVerified: true }; }, vollerStore());
  await ctx.route('**/www.gstatic.com/**', r => r.fulfill({ contentType: 'text/javascript', body: r.request().url().includes('auth') ? AUTH : r.request().url().includes('firestore') ? FS : APP }));
  await ctx.route('**/verses.quran.foundation/**', r => r.abort());
  await ctx.route('**/apis.google.com/**', r => r.abort());
  const p = await ctx.newPage();
  await p.goto(base + '/index.html');
  await p.waitForFunction(() => navigator.serviceWorker.controller?.state === 'activated' && !!window.__SW_TEST_VERSION);
  await p.reload(); // SDK-Dateien ebenfalls im Worker-Cache
  await p.waitForFunction(() => !!document.querySelector('.lernen-gruss') && !document.querySelector('.boot'));
  await warteAsync(p, async () => {
    const reg=await navigator.serviceWorker.getRegistration();
    return reg.active?.state==='activated'&&!reg.installing&&!reg.waiting&&
      (await Promise.all((await caches.keys()).map(async n => (await (await caches.open(n)).keys()).some(r => r.url === 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js')))).some(Boolean);
  });
  return { ctx, p, stand, base };
}
(async () => {
  const browser = await start();
  try {
    for (const versagt of (process.argv.includes('--normal') ? [false] : [false, true])) {
      const { ctx, p, stand } = await kontext(browser);
      try {
        stand.update = true; stand.versagt = versagt;
        await p.reload(); // alter Worker bekommt neue HTML-Antwort im Hintergrund
        await p.waitForTimeout(500);
        const altCache = await p.evaluate(async name => { const c = await caches.open(name); const r = await c.match('./index.html'); return r && r.text(); }, 'adrabic-' + version);
        assert.ok(altCache.includes('app.js?v=' + (alt ? stand.neueVersion : version)), 'Version der HTML-Antwort im alten Cache');
        stand.workerNeu=true;
        await p.evaluate(async()=>{
          const reg=await navigator.serviceWorker.getRegistration();window.__UPDATE_STATES=[];
          reg.addEventListener('updatefound',()=>{
            const worker=reg.installing;
            worker.addEventListener('statechange',()=>window.__UPDATE_STATES.push(worker.state));
          });
          await reg.update();
        });
        await warteAsync(p, async([name,versagt])=>{
          const reg=await navigator.serviceWorker.getRegistration(),c=await caches.keys();
          return navigator.serviceWorker.controller?.state==='activated'&&navigator.serviceWorker.controller===reg.active&&reg.active?.state==='activated'&&!reg.installing&&!reg.waiting&&
            (versagt?window.__UPDATE_STATES.includes('redundant')&&c.includes(name.replace('-paket-a','')):
              window.__UPDATE_STATES.includes('activated')&&c.includes(name)&&!c.includes(name.replace('-paket-a','')));
        },['adrabic-'+stand.neueVersion,versagt]);
        if(!versagt){
          // Der normale Online-Neustart nach dem Update laedt auch das SDK
          // in den neuen Cache. Erst dann diesen Stand offline neu starten.
          await p.reload();
          await p.waitForFunction(v=>window.__SW_TEST_VERSION===v&&!!document.querySelector('.lernen-gruss'),stand.neueVersion);
          await warteAsync(p, async name=>{
            const c=await caches.open(name);
            return (await c.keys()).some(r => r.url === 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');
          },'adrabic-'+stand.neueVersion);
        }
        await ctx.setOffline(true);
        await p.reload();
        if (alt && versagt) {
          await p.waitForTimeout(1500);
          assert.equal(await p.evaluate(() => window.__SW_TEST_VERSION || null), null);
          assert.ok(await p.locator('.boot').count());
          console.log('OK Gegenprobe c4b1c30: abgebrochenes Update blockiert Offline-Start.');
        } else {
          await p.waitForFunction(() => !!document.querySelector('.lernen-gruss') && !document.querySelector('.boot'));
          assert.equal(await p.evaluate(() => window.__SW_TEST_VERSION), versagt ? version : stand.neueVersion);
          await p.goto(new URL('/', p.url()).href);
          await p.waitForFunction(() => !!document.querySelector('.lernen-gruss') && !document.querySelector('.boot'));
          assert.equal(await p.evaluate(() => window.__SW_TEST_VERSION), versagt ? version : stand.neueVersion);
          console.log('OK ' + (versagt ? 'Abbruch: alter Stand startet offline.' : 'Gelungenes Update: neuer Stand startet offline.'));
        }
      } finally { await ctx.close(); }
    }
    if(process.argv.includes('--normal'))return;
    {
      const {ctx,p,stand}=await kontext(browser);
      try {
        stand.htmlNeu=true;
        await p.reload();
        await warteAsync(p,async name=>{
          const c=await caches.open(name),r=await c.match('./index.html');
          return !!r&&(await r.text()).includes('html-test-neu');
        },'adrabic-'+version);
        await ctx.setOffline(true);await p.reload();
        assert.equal(await p.locator('#html-test-neu').count(),1);
        console.log('OK HTML-Korrektur mit gleicher Version bleibt cachebar.');
      } finally {await ctx.close();}
    }
    const { ctx, p, stand, base } = await kontext(browser);
    try {
      await ctx.setOffline(true);
      for (const datei of ['impressum.html', 'datenschutzerklaerung.html']) {
        await p.goto(base + '/' + datei);
        const inhalt = await p.content();
        assert.equal(inhalt.includes('id="app"'), alt, datei + ': Rechtsseite statt App-Fallback');
        if (!alt) assert.equal(await p.locator('h1').textContent(), datei === 'impressum.html' ? 'Impressum' : 'Datenschutz');
      }
      if (alt) {
        await p.goto(base + '/nicht-vorhanden.html');
        assert.equal(await p.locator('#app').count(),1);
      } else {
        await assert.rejects(p.goto(base + '/nicht-vorhanden.html'), /net::ERR_/);
      }
      await ctx.setOffline(false);
      for (const datei of ['impressum.html', 'datenschutzerklaerung.html']) {
        stand.legalNeu = false;
        await p.goto(base + '/' + datei); await p.waitForTimeout(500);
        stand.legalNeu = true;
        await p.reload();
        assert.equal(await p.locator('#legal-test-neu').count(), alt ? 0 : 1);
      }
      console.log('OK Rechtsseiten: ' + (alt ? 'Gegenprobe zeigt App offline und alte Fassung online.' : 'offline lesbar, erste Online-Antwort frisch.'));
    } finally { await ctx.close(); }
  } finally { await browser.close(); await Promise.all(servers.map(s => new Promise(ok => s.close(ok)))); }
})().catch(e => { console.error(e); process.exitCode = 1; });
