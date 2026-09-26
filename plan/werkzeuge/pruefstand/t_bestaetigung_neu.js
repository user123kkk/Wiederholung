/* Abnahme G-054 (KONTO-15), 3.17.38: "Adresse falsch? Neu anfangen" auf der
   Bestaetigungsseite - fragt nach, loescht das unbestaetigte Konto
   (fb.deleteUser), landet danach auf dem Registrieren-Bildschirm mit leerem
   E-Mail-Feld (Name darf bleiben).
   Gegenprobe fest auf Commit 1c8aaa1 (Stand vor 3.17.38): der Knopf darf es
   dort nicht geben (LEHREN § 15, Vorfall Runde 7). */
const { chromium } = require('playwright');
const { AUTH, FS, APP } = require('./stubs');
const { vollerStore } = require('./lib');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..', '..');
const BASE = 'http://127.0.0.1:8099/index.html';
let APP_ALT = null;
try { APP_ALT = execSync('git show 1c8aaa1:app.js', { cwd: REPO, encoding: 'utf8' }); }
catch (e) { console.log('Kein Git-Stand 1c8aaa1 fuer app.js gefunden - Gegenprobe entfaellt:', e.message); }

async function seite(b, opt = {}) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  if (opt.appAlt && APP_ALT) {
    await ctx.route(u => u.hostname === '127.0.0.1' && u.pathname.endsWith('/app.js'),
      r => r.fulfill({ status: 200, contentType: 'text/javascript', body: APP_ALT }));
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
  const init = { user: opt.user, store: opt.store || vollerStore(), ls: opt.ls || {} };
  await p.addInitScript(i => {
    window.__START_USER = i.user; window.__START_STORE = i.store;
    try { for (const [k, v] of Object.entries(i.ls)) localStorage.setItem(k, v); } catch (e) {}
  }, init);
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForTimeout(opt.warte || 1500);
  return { ctx, p };
}

const NUTZER = { uid: 'neu1', email: 'vertippt@example.com', displayName: 'Neu', emailVerified: false,
  providerData: [{ providerId: 'password' }], metadata: { creationTime: new Date().toUTCString(), lastSignInTime: new Date().toUTCString() } };

let funde = 0;
function pruefe(bedingung, text) {
  if (bedingung) console.log('ok     ', text);
  else { console.log('FEHLER ', text); funde++; }
}

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});

  console.log('-- aktueller Stand --');
  const { p, ctx } = await seite(b, { user: NUTZER });
  const knopfDa = await p.evaluate(() => !!document.querySelector('[data-action="konto-vertippt"]'));
  pruefe(knopfDa, 'Knopf "Adresse falsch? Neu anfangen" ist da');
  await p.evaluate(() => { const k = document.querySelector('[data-action="konto-vertippt"]'); if (k) k.click(); });
  await p.waitForTimeout(700);
  const frage = await p.evaluate(() => { const d = [...document.querySelectorAll('.dlg')].pop(); return d ? d.innerText.replace(/\s+/g, ' ').slice(0, 160) : null; });
  pruefe(/gel.scht/.test(frage || '') && /neu registrieren/.test(frage || ''), 'Rueckfrage nennt Loeschen und Neu-Registrieren: ' + JSON.stringify(frage));
  await p.evaluate(() => { const k = [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Konto löschen'); if (k) k.click(); });
  await p.waitForTimeout(1200);
  const danach = await p.evaluate(() => ({
    geloescht: !!window.__FB.geloescht,
    modus: (document.querySelector('[data-action="register"]') ? 'register' : (document.querySelector('[data-action="login"]') ? 'login' : null)),
    email: (document.getElementById('a-email') || {}).value,
    name: (document.getElementById('a-name') || {}).value
  }));
  pruefe(danach.geloescht, 'fb.deleteUser wurde aufgerufen');
  pruefe(danach.modus === 'register', 'Anmeldebildschirm steht im Modus Registrieren: ' + danach.modus);
  pruefe(danach.email === '', 'E-Mail-Feld ist leer: ' + JSON.stringify(danach.email));
  pruefe(danach.name === 'Neu', 'Name blieb erhalten: ' + JSON.stringify(danach.name));
  console.log('Fehler im aktuellen Stand:', funde, '|', p.fehler.join('|') || 'ok');
  await ctx.close();

  console.log('-- Abbruch: Konto bleibt --');
  const { p: p2, ctx: ctx2 } = await seite(b, { user: NUTZER });
  await p2.evaluate(() => { const k = document.querySelector('[data-action="konto-vertippt"]'); if (k) k.click(); });
  await p2.waitForTimeout(700);
  await p2.evaluate(() => { const k = [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Abbrechen'); if (k) k.click(); });
  await p2.waitForTimeout(700);
  const nachAbbruch = await p2.evaluate(() => ({ geloescht: !!window.__FB.geloescht, seite: !!document.querySelector('[data-action="konto-vertippt"]') }));
  pruefe(!nachAbbruch.geloescht, 'Abbruch: nichts geloescht');
  pruefe(nachAbbruch.seite, 'Abbruch: immer noch auf der Bestaetigungsseite');
  await ctx2.close();

  console.log('\n' + funde + ' Fehler insgesamt auf dem aktuellen Stand.');

  if (APP_ALT) {
    console.log('\n-- Gegenprobe gegen 1c8aaa1 (muss rot sein) --');
    const { p: p3, ctx: ctx3 } = await seite(b, { user: NUTZER, appAlt: true });
    const knopfAlt = await p3.evaluate(() => !!document.querySelector('[data-action="konto-vertippt"]'));
    if (!knopfAlt) console.log('  ok (=Fehler im Altstand) : Knopf gibt es dort noch nicht');
    else console.log('  unerwartet: alter Stand hat den Knopf schon');
    await ctx3.close();
  }

  await b.close();
  process.exitCode = funde ? 1 : 0;
})();
