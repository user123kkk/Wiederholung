/* Abnahme G-053 (KONTO-14), 3.17.38: Anmelden/Registrieren/Passwort-vergessen
   stehen in einem <form> - Enter in JEDEM Feld sendet ab, ueber die
   submit-Delegation an body. Ein Doppel-Enter darf nicht zweimal abschicken
   (authBusy-Sperre in doLogin/doRegister/doReset).
   Gegenprobe fest auf Commit 1c8aaa1 (Stand vor 3.17.38): Enter im
   E-Mail-Feld tut beim Anmelden dort nichts (LEHREN § 15, Vorfall Runde 7). */
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

async function zumLogin(p) {
  await p.evaluate(() => { const k = document.querySelector('[data-action="einstieg-konto"]'); if (k) k.click(); });
  await p.waitForTimeout(700);
}

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});

  console.log('-- Enter im E-Mail-Feld meldet an --');
  {
    const { p, ctx } = await seite(b);
    await zumLogin(p);
    await p.fill('#a-email', 'x@y.de');
    await p.fill('#a-pass', 'geheim');
    await p.focus('#a-email');
    await p.keyboard.press('Enter');
    await p.waitForTimeout(1000);
    const st = await p.evaluate(() => ({ signInCalls: window.__FB.signInCalls || 0 }));
    pruefe(st.signInCalls === 1, 'signInWithEmailAndPassword genau einmal aufgerufen: ' + st.signInCalls);
    await ctx.close();
  }

  console.log('-- Doppel-Enter sendet nur einmal --');
  {
    const { p, ctx } = await seite(b);
    await zumLogin(p);
    await p.fill('#a-email', 'x@y.de');
    await p.fill('#a-pass', 'geheim');
    await p.focus('#a-pass');
    await p.keyboard.press('Enter');
    await p.keyboard.press('Enter'); // gleich danach - authBusy muss das zweite Mal abfangen
    await p.waitForTimeout(1000);
    const st = await p.evaluate(() => ({ signInCalls: window.__FB.signInCalls || 0 }));
    pruefe(st.signInCalls === 1, 'trotz Doppel-Enter genau ein Aufruf: ' + st.signInCalls);
    await ctx.close();
  }

  console.log('-- Passwort vergessen: Enter im E-Mail-Feld sendet ab --');
  {
    const { p, ctx } = await seite(b);
    await zumLogin(p);
    await p.evaluate(() => { const k = document.querySelector('[data-action="mode-reset"]'); if (k) k.click(); });
    await p.waitForTimeout(700);
    await p.fill('#a-email', 'x@y.de');
    await p.focus('#a-email');
    await p.keyboard.press('Enter');
    await p.waitForTimeout(1000);
    const info = await p.evaluate(() => (document.querySelector('.info-box') || {}).innerText || null);
    pruefe(!!info, 'Enter im E-Mail-Feld bei "Passwort vergessen" sendet ab: ' + JSON.stringify(info));
    await ctx.close();
  }

  console.log('-- Formular vorhanden, Absende-Knopf type=submit, Nebenknoepfe type=button --');
  {
    const { p, ctx } = await seite(b);
    await zumLogin(p);
    const st = await p.evaluate(() => {
      const form = document.querySelector('form[data-submit="login"]');
      const submit = document.querySelector('[data-action="login"]');
      const google = document.querySelector('[data-action="google-login"]');
      const auge = document.querySelector('[data-action="passwort-zeigen"]');
      return { formDa: !!form, submitType: submit ? submit.type : null, googleType: google ? google.type : null, augeType: auge ? auge.type : null };
    });
    pruefe(st.formDa, '<form data-action="login"> ist da');
    pruefe(st.submitType === 'submit', 'Absende-Knopf ist type=submit: ' + st.submitType);
    pruefe(st.googleType === 'button', 'Google-Knopf ist type=button: ' + st.googleType);
    pruefe(st.augeType === 'button', 'Augen-Knopf ist type=button: ' + st.augeType);
    await ctx.close();
  }

  console.log('\n' + funde + ' Fehler auf dem aktuellen Stand.');

  if (APP_ALT) {
    console.log('\n-- Gegenprobe gegen 1c8aaa1 (muss rot sein) --');
    const { p, ctx } = await seite(b, { appAlt: true });
    await zumLogin(p);
    await p.fill('#a-email', 'x@y.de');
    await p.fill('#a-pass', 'geheim');
    await p.focus('#a-email');
    await p.keyboard.press('Enter');
    await p.waitForTimeout(1000);
    const st = await p.evaluate(() => ({ signInCalls: window.__FB.signInCalls || (window.__FB.protokoll || []).length || 0 }));
    if ((st.signInCalls || 0) === 0) console.log('  ok (=Fehler im Altstand) : Enter im E-Mail-Feld tut nichts, signInCalls=' + st.signInCalls);
    else console.log('  unerwartet: alter Stand meldet trotzdem an - signInCalls=' + st.signInCalls);
    await ctx.close();
  }

  await b.close();
  process.exitCode = funde ? 1 : 0;
})();
