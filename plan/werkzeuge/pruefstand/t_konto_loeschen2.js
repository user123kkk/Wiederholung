/* Abnahme G-051/G-011 (KONTO-12/KONTO-2), 3.17.38.
   A) Immer neu anmelden vor dem Loeschen - unabhaengig davon, wie frisch
      lastSignInTime aussieht (kontoAnmeldungFrisch() ist weg). Geprueft
      ueber die Reihenfolge im Stub-Protokoll (window.__FB.protokoll):
      "reauth" muss vor "commit"/"deleteUser" stehen.
   B) Offline gesperrt: Halteknopf und E-Mail-Feld disabled, kein
      deleteDoc/commit im Protokoll, obwohl geklickt wird.
   C) Ein haengendes commit() (window.__COMMIT_HAENGT) loest nach dem
      Zeitlimit (window.__TEST_KONTO_LOESCHEN_MS, Stellschraube nur fuer den
      Pruefstand) eine Meldung aus, .busy geht weg, bevor neu geladen wird.

   Gegenprobe fest auf Commit 1c8aaa1 (Stand vor 3.17.38): gegen HEAD waere
   sie nach der Behebung wertlos (LEHREN § 15, Vorfall Runde 7). Alle drei
   Faelle muessen dort FEHLER melden. */
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

function nutzer() {
  return { uid: 'u1', email: 'test@example.com', displayName: 'Test', emailVerified: true,
    providerData: [{ providerId: 'password' }],
    metadata: { creationTime: 'Mon, 03 Aug 2026 10:00:00 GMT', lastSignInTime: new Date().toUTCString() } };
}
async function halten(p) {
  const k = await p.$('[data-action="delete-account"]');
  const r = await k.boundingBox();
  await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
  await p.mouse.down(); await p.waitForTimeout(2300); await p.mouse.up(); await p.waitForTimeout(400);
}
async function zurLoeschseite(p) {
  await p.evaluate(() => { const k = document.querySelector('[data-action="einstellungen"]'); if (k) k.click(); });
  await p.waitForTimeout(800);
  await p.evaluate(() => { const k = document.querySelector('[data-action="einst-seite"][data-id="konto-loeschen"]'); if (k) k.click(); });
  await p.waitForTimeout(900);
}

async function fallA(b, opt = {}) {
  const { p, ctx } = await seite(b, { user: nutzer(), ...opt });
  await zurLoeschseite(p);
  await p.fill('#konto-loeschen-email', 'test@example.com'); await p.waitForTimeout(300);
  await halten(p);
  /* Der Altstand (1c8aaa1) ueberspringt die Neu-Anmeldung bei "frischer"
     lastSignInTime komplett - dann erscheint gar kein Dialog (genau das
     zeigt die Gegenprobe). */
  const dialogDa = await p.evaluate(() => !!document.getElementById('dlg-input')).catch(() => false);
  if (dialogDa) {
    await p.fill('#dlg-input', 'geheim');
    await p.evaluate(() => { const k = [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Weiter'); if (k) k.click(); });
  }
  await p.waitForTimeout(1500);
  const st = await p.evaluate(() => ({
    protokoll: (window.__FB.protokoll || []).slice(),
    daten: [...window.__FB.store.keys()].filter(k => k.startsWith('users/u1')).length,
    geloescht: !!window.__FB.geloescht
  }));
  await ctx.close();
  return st;
}
async function fallB(b, opt = {}) {
  const { p, ctx } = await seite(b, { user: nutzer(), ...opt });
  await zurLoeschseite(p);
  await ctx.setOffline(true); await p.evaluate(() => window.dispatchEvent(new Event('offline'))); await p.waitForTimeout(700);
  await p.fill('#konto-loeschen-email', 'test@example.com').catch(() => {});
  await p.waitForTimeout(300);
  const zustand = await p.evaluate(() => {
    const email = document.getElementById('konto-loeschen-email');
    const knopf = document.querySelector('[data-action="delete-account"]');
    const hinweis = document.getElementById('konto-loeschen-hinweis');
    return { emailDisabled: email ? email.disabled : null, knopfDisabled: knopf ? knopf.disabled : null,
      hinweis: hinweis ? hinweis.textContent : null };
  });
  // Versuch, trotzdem auszuloesen - bei einem disabled-Knopf feuert der Browser kein click.
  await p.evaluate(() => { const k = document.querySelector('[data-action="delete-account"]'); if (k) k.click(); });
  await p.waitForTimeout(700);
  const st = await p.evaluate(() => ({ protokoll: (window.__FB.protokoll || []).slice() }));
  await ctx.close();
  return Object.assign({}, zustand, st);
}
async function fallC(b, opt = {}) {
  const { p, ctx } = await seite(b, { user: nutzer(), ...opt });
  await zurLoeschseite(p);
  await p.evaluate(() => { window.__COMMIT_HAENGT = true; window.__TEST_KONTO_LOESCHEN_MS = 1200; });
  await p.fill('#konto-loeschen-email', 'test@example.com'); await p.waitForTimeout(300);
  await halten(p);
  const dialogDa = await p.evaluate(() => !!document.getElementById('dlg-input')).catch(() => false);
  if (dialogDa) {
    await p.fill('#dlg-input', 'geheim');
    await p.evaluate(() => { const k = [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Weiter'); if (k) k.click(); });
  }
  await p.waitForTimeout(700);
  const waehrend = await p.evaluate(() => !!document.querySelector('[data-action="delete-account"].busy'));
  await p.waitForTimeout(2200); // 1200ms Zeitlimit + Puffer
  const danach = await p.evaluate(() => {
    const knopf = document.querySelector('[data-action="delete-account"]');
    const dlg = [...document.querySelectorAll('.dlg')].pop();
    return { busy: knopf ? knopf.classList.contains('busy') : null,
      dlgText: dlg ? dlg.innerText.replace(/\s+/g, ' ').slice(0, 200) : null };
  });
  await ctx.close().catch(() => {});
  return { waehrend, danach };
}

let funde = 0;
function pruefe(bedingung, text) {
  if (bedingung) console.log('ok     ', text);
  else { console.log('FEHLER ', text); funde++; }
}

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});

  console.log('-- A) immer neu anmelden vor dem Loeschen --');
  const a = await fallA(b);
  const reauthIdx = a.protokoll.indexOf('reauth');
  const commitIdx = a.protokoll.indexOf('commit');
  const deleteUserIdx = a.protokoll.indexOf('deleteUser');
  console.log('  Protokoll:', a.protokoll.join(' > '));
  pruefe(reauthIdx !== -1, 'reauth wurde aufgerufen');
  pruefe(reauthIdx !== -1 && commitIdx !== -1 && reauthIdx < commitIdx, 'reauth kommt vor commit');
  pruefe(reauthIdx !== -1 && deleteUserIdx !== -1 && reauthIdx < deleteUserIdx, 'reauth kommt vor deleteUser');
  pruefe(a.geloescht && a.daten === 0, 'Konto und Daten sind weg');

  console.log('-- B) offline gesperrt --');
  const bb = await fallB(b);
  pruefe(bb.emailDisabled === true, 'E-Mail-Feld ist disabled');
  pruefe(bb.knopfDisabled === true, 'Halteknopf ist disabled');
  pruefe(/Verbindung/.test(bb.hinweis || ''), 'Hinweis nennt die Verbindung: ' + JSON.stringify(bb.hinweis));
  pruefe(!bb.protokoll.includes('deleteDoc') && !bb.protokoll.includes('commit'), 'kein deleteDoc/commit im Protokoll');

  console.log('-- C) haengendes commit() -> Zeitlimit --');
  const cc = await fallC(b);
  pruefe(cc.waehrend === true, 'waehrend des Loeschens dreht der Knopf (.busy)');
  pruefe(cc.danach.busy === false, 'nach dem Zeitlimit dreht der Knopf nicht mehr');
  pruefe(/Nicht fertig gel.scht/.test(cc.danach.dlgText || ''), 'Meldung in Worten: ' + JSON.stringify(cc.danach.dlgText));

  console.log('\n' + funde + ' Fehler auf dem aktuellen Stand.');

  if (APP_ALT) {
    console.log('\n-- Gegenprobe gegen 1c8aaa1 (muss rot sein) --');
    let altFunde = 0;
    const a2 = await fallA(b, { appAlt: true });
    const altReauthFehlt = a2.protokoll.indexOf('reauth') === -1;
    if (altReauthFehlt) { console.log('  ok (=Fehler im Altstand) : reauth fehlt trotz frischer Anmeldung im Protokoll'); altFunde++; }
    else console.log('  unerwartet: alter Stand meldet reauth auch schon');
    const b2 = await fallB(b, { appAlt: true });
    if (b2.knopfDisabled !== true) { console.log('  ok (=Fehler im Altstand) : Halteknopf bleibt offline bedienbar'); altFunde++; }
    else console.log('  unerwartet: alter Stand sperrt schon offline');
    const c2 = await fallC(b, { appAlt: true });
    /* Nicht am .busy messen: im Altstand dreht der Knopf nach dem Halten gar
       nicht sichtbar, die Frage koennte dort nie anschlagen (LEHREN § 5.3).
       Scharf ist die Meldung in Worten - die gibt es nur mit Zeitlimit. */
    if (!/Nicht fertig gel.scht/.test(c2.danach.dlgText || '')) { console.log('  ok (=Fehler im Altstand) : keine Zeitlimit-Meldung, es wartet endlos'); altFunde++; }
    else console.log('  unerwartet: alter Stand kennt schon ein Zeitlimit');
    console.log(altFunde + ' von 3 erwarteten Gegenproben-Fehlern gefunden.');
    if (altFunde < 3) { console.log('FEHLER  Gegenprobe schlaegt nicht ueberall an'); funde++; }
  }

  await b.close();
  process.exitCode = funde ? 1 : 0;
})();
