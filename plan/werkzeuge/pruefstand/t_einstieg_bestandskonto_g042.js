/* Abnahme G-042 (EINSTIEG-7, nur der mechanische Teil): Meldet sich jemand
   in ein BESTEHENDES Konto an (Cloud-Dokument existiert schon), loescht die
   App die beiden Einstiegs-Zwischenspeicher aus localStorage:
     adrabic-einstieg-antworten   (Schrift-/Rundengroesse aus dem Gast-Einstieg)
     adrabic-einstieg-nachklang   (der Wenn-dann-Satz)
   Datenschutzerklaerung Punkt 7: "bis dein Konto angelegt ist" - bei einem
   BESTEHENDEN Konto ist das laengst der Fall, der Zwischenspeicher blieb
   vorher trotzdem fuer immer liegen.
   WICHTIG: Es wird nichts angewendet (kein einstiegAnwenden()) - die
   Einstellungen eines bestehenden Kontos duerfen von einem Gast-Durchlauf
   auf demselben Geraet nicht ueberschrieben werden.

   Gegenprobe fest auf Commit 5ad0a11 (Stand vor 3.17.42, LEHREN § 15). */
const { chromium } = require('playwright');
const { AUTH, FS, APP } = require('./stubs');
const { vollerStore } = require('./lib');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.join(__dirname, '..', '..', '..');
const BASE = 'http://127.0.0.1:'+(process.env.PRUEF_PORT||8099)+'/index.html';
let APP_ALT = null;
try { APP_ALT = execSync('git show 5ad0a11:app.js', { cwd: REPO, encoding: 'utf8' }); }
catch (e) { console.log('Kein Git-Stand 5ad0a11 fuer app.js gefunden - Gegenprobe entfaellt:', e.message); }

const NUTZER = { uid: 'u1', email: 'bestand@example.com', displayName: 'Bestand', emailVerified: true,
  metadata: { creationTime: 'Mon, 03 Aug 2026 10:00:00 GMT' } };
const LS_VORHER = {
  'adrabic-einstieg-antworten': JSON.stringify({ arabGroesse: 'gross', sitzungsLimit: 10 }),
  'adrabic-einstieg-nachklang': JSON.stringify({ satz: 'Nach dem Maghrib-Gebet mache ich eine Runde.' })
};

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
  const init = { user: NUTZER, store: vollerStore({ thema: 'dunkel' }), ls: LS_VORHER };
  await p.addInitScript(i => {
    window.__START_USER = i.user; window.__START_STORE = i.store;
    try { for (const [k, v] of Object.entries(i.ls)) localStorage.setItem(k, v); } catch (e) {}
  }, init);
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForTimeout(opt.warte || 2200);
  return { ctx, p };
}

let funde = 0;
function pruefe(bedingung, text) {
  if (bedingung) console.log('ok     ', text);
  else { console.log('FEHLER ', text); funde++; }
}

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});

  console.log('-- aktueller Stand: Anmeldung ins Bestandskonto --');
  const { p, ctx } = await seite(b);
  const nach = await p.evaluate(() => ({
    antworten: localStorage.getItem('adrabic-einstieg-antworten'),
    nachklang: localStorage.getItem('adrabic-einstieg-nachklang'),
    // settings.arabGroesse darf NICHT vom Gast-Zwischenspeicher ueberschrieben werden -
    // vollerStore() legt 'normal' fest, der Gast-Zwischenspeicher hatte 'gross'.
    schriftKachel: (document.querySelector('[data-action="oeffne-einstellungen"]'), null)
  }));
  pruefe(nach.antworten === null, 'adrabic-einstieg-antworten ist geloescht: ' + JSON.stringify(nach.antworten));
  pruefe(nach.nachklang === null, 'adrabic-einstieg-nachklang ist geloescht: ' + JSON.stringify(nach.nachklang));
  console.log('Fehler auf der Seite:', p.fehler.join('|') || 'ok');
  await ctx.close();

  console.log('\n-- Einstellungen des Bestandskontos bleiben unangetastet (nicht ueberschrieben) --');
  const { p: p2, ctx: ctx2 } = await seite(b);
  /* vollerStore() legt settings.arabGroesse = 'normal' fest, der Gast-
     Zwischenspeicher hatte 'gross'. Wuerde einstiegAnwenden() faelschlich
     mitlaufen, stuende hier 'gross' - das waere ein bestehendes Konto, dessen
     Einstellung ein fremder Gast-Durchlauf auf demselben Geraet ueberschrieben
     haette. */
  const cloudSettings = await p2.evaluate(() => {
    const doc = window.__FB && window.__FB.store && window.__FB.store.get('users/u1');
    return doc ? doc.settings : null;
  });
  pruefe(!!cloudSettings && cloudSettings.arabGroesse === 'normal',
    'Cloud-Einstellung arabGroesse bleibt "normal" (nicht vom Gast-Zwischenspeicher ueberschrieben): ' + JSON.stringify(cloudSettings));
  await ctx2.close();

  console.log('\n' + funde + ' Fehler insgesamt auf dem aktuellen Stand.');

  if (APP_ALT) {
    console.log('\n-- Gegenprobe gegen 5ad0a11 (muss rot sein) --');
    const { p: p3, ctx: ctx3 } = await seite(b, { appAlt: true });
    const altNach = await p3.evaluate(() => ({
      antworten: localStorage.getItem('adrabic-einstieg-antworten'),
      nachklang: localStorage.getItem('adrabic-einstieg-nachklang')
    }));
    const beideWeg = altNach.antworten === null && altNach.nachklang === null;
    if (beideWeg) console.log('  unerwartet: alter Stand loescht die Schluessel auch schon');
    else console.log('  ok (=Fehler im Altstand): Schluessel bleiben liegen: ' + JSON.stringify(altNach));
    await ctx3.close();
  }

  await b.close();
  process.exitCode = funde ? 1 : 0;
})();
