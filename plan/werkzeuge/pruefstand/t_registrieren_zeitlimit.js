/* Abnahme G-050 (KONTO-11), 3.17.38: createUserWithEmailAndPassword laeuft
   ins Zeitlimit (mitZeitlimit, 12s), das Konto entsteht aber doch noch -
   window.__CREATE_USER_VERZOEGERUNG_MS laesst den Stub das nach 13s
   nachholen. onAuthStateChanged muss dann genau EINMAL sendEmailVerification
   nachschicken, den getippten Namen per updateProfile nachtragen und die
   Zeitlimit-Meldung durch "Konto angelegt." ersetzen.
   Gegenprobe fest auf Commit 1c8aaa1 (Stand vor 3.17.38): dort bleibt es bei
   der Zeitlimit-Fehlermeldung, kein sendEmailVerification (LEHREN § 15,
   Vorfall Runde 7). */
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
  const init = { user: null, store: vollerStore(), ls: {} };
  await p.addInitScript(i => {
    window.__START_USER = i.user; window.__START_STORE = i.store;
    try { for (const [k, v] of Object.entries(i.ls)) localStorage.setItem(k, v); } catch (e) {}
  }, init);
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForTimeout(opt.warte || 1500);
  return { ctx, p };
}

let funde = 0;
function pruefe(bedingung, text) {
  if (bedingung) console.log('ok     ', text);
  else { console.log('FEHLER ', text); funde++; }
}

/* "Neues Konto anlegen" fuehrt ueber den Einstieg (Plan speichern), nicht
   direkt aufs Formular - derselbe Klickpfad wie in t_anmelden.js. */
async function registrieren(p) {
  await p.evaluate(() => { const k = document.querySelector('[data-action="einstieg-konto"]'); if (k) k.click(); });
  await p.waitForTimeout(700);
  await p.evaluate(() => { const k = document.querySelector('[data-action="mode-register"]'); if (k) k.click(); });
  await p.waitForTimeout(900);
  const kl = async sel => { const el = await p.$(sel); if (el) { await el.click(); await p.waitForTimeout(700); } };
  await kl('[data-action="einstieg-ziel"]'); await kl('[data-action="einstieg-weiter"]');
  await kl('[data-action="einstieg-huerde"]'); await kl('[data-action="einstieg-weiter"]');
  await kl('[data-action="einstieg-aufdecken"]'); await kl('[data-action="einstieg-bewerten"][data-id="Sicher"]'); await kl('[data-action="einstieg-weiter"]');
  await kl('[data-action="einstieg-weiter"]'); await kl('[data-action="einstieg-weiter"]');
  await kl('[data-action="einstieg-anker"]'); await kl('[data-action="einstieg-weiter"]');
  await p.waitForTimeout(7000);
  await p.evaluate(() => { const k = [...document.querySelectorAll('.einstieg-aktion button')].pop(); if (k) k.click(); });
  await p.waitForTimeout(900);
  await p.fill('#a-name', 'Layla');
  await p.fill('#a-email', 'layla@example.com');
  await p.fill('#a-pass', 'geheim1');
  await p.evaluate(() => { const k = document.querySelector('[data-action="register"]'); if (k) k.click(); });
}

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});

  console.log('-- aktueller Stand: Zeitlimit, Konto entsteht mit 13s Verzoegerung --');
  const { p, ctx } = await seite(b);
  await p.evaluate(() => { window.__CREATE_USER_VERZOEGERUNG_MS = 13000; });
  await registrieren(p);
  await p.waitForTimeout(12500);
  const zwischenstand = await p.evaluate(() => (document.querySelector('.error-box') || {}).innerText || null);
  pruefe(/Verbindung/.test(zwischenstand || ''), 'nach 12s zeigt der Fehler-Kasten das Zeitlimit: ' + JSON.stringify(zwischenstand));
  await p.waitForTimeout(2000); // Konto entsteht bei 13s, onAuthStateChanged + Nachholen brauchen noch etwas
  const st = await p.evaluate(() => ({
    protokoll: (window.__FB.protokoll || []).slice(),
    sendCalls: window.__FB.sendEmailVerificationCalls || 0,
    displayName: window.__FB.user ? window.__FB.user.displayName : null,
    seite: document.querySelector('.brief-bild') ? 'bestaetigen' : (document.querySelector('[data-action="register"]') ? 'register' : 'anders'),
    info: (document.querySelector('.info-box') || {}).innerText || null,
    fehler: (document.querySelector('.error-box') || {}).innerText || null
  }));
  console.log('  Protokoll:', st.protokoll.join(' > '));
  pruefe(st.sendCalls === 1, 'genau ein sendEmailVerification-Aufruf: ' + st.sendCalls);
  pruefe(st.displayName === 'Layla', 'displayName wurde nachgetragen: ' + JSON.stringify(st.displayName));
  pruefe(st.seite === 'bestaetigen', 'Bestaetigungsseite wird gezeigt');
  pruefe(st.info === 'Konto angelegt.' || (st.fehler || '') === '', '"Konto angelegt." statt der Zeitlimit-Meldung: info=' + JSON.stringify(st.info) + ' fehler=' + JSON.stringify(st.fehler));
  console.log('Fehler im aktuellen Stand:', funde, '|', p.fehler.join('|') || 'ok');
  await ctx.close();

  console.log('\n' + funde + ' Fehler insgesamt auf dem aktuellen Stand.');

  if (APP_ALT) {
    console.log('\n-- Gegenprobe gegen 1c8aaa1 (muss rot sein) --');
    const { p: p2, ctx: ctx2 } = await seite(b, { appAlt: true });
    await p2.evaluate(() => { window.__CREATE_USER_VERZOEGERUNG_MS = 13000; });
    await registrieren(p2);
    await p2.waitForTimeout(15500);
    const st2 = await p2.evaluate(() => ({
      sendCalls: window.__FB.sendEmailVerificationCalls || (window.__FB.protokoll || []).filter(x => x === 'sendEmailVerification').length,
      fehler: (document.querySelector('.error-box') || {}).innerText || null,
      info: (document.querySelector('.info-box') || {}).innerText || null
    }));
    if ((st2.sendCalls || 0) === 0 && /Verbindung/.test(st2.fehler || '')) {
      console.log('  ok (=Fehler im Altstand) : kein sendEmailVerification, Zeitlimit-Meldung bleibt stehen: ' + JSON.stringify(st2.fehler));
    } else {
      console.log('  unerwartet: alter Stand holt schon nach - sendCalls=' + st2.sendCalls + ' fehler=' + JSON.stringify(st2.fehler) + ' info=' + JSON.stringify(st2.info));
    }
    await ctx2.close();
  }

  await b.close();
  process.exitCode = funde ? 1 : 0;
})();
