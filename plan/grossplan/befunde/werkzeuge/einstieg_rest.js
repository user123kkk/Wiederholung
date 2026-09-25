process.env.PRUEF_BILDER = __dirname + '/bilder';
const { start, neueSeite, foto, GERAETE, vollerStore } = require('/home/user/Wiederholung/plan/werkzeuge/pruefstand/lib.js');
const k = async (p, sel, w = 700) => { const el = await p.$(sel); if (!el) { console.log('FEHLT', sel); return; } await el.click(); await p.waitForTimeout(w); };
async function durch(p) {
  await p.waitForTimeout(400);
  await k(p, '[data-action="einstieg-weiter"]', 900);
  await k(p, '[data-action="einstieg-ziel"][data-id="kurs"]'); await k(p, '[data-action="einstieg-weiter"]', 900);
  await k(p, '[data-action="einstieg-huerde"][data-id="schrift"]'); await k(p, '[data-action="einstieg-weiter"]', 900);
  await k(p, '[data-action="einstieg-aufdecken"]'); await k(p, '[data-action="einstieg-bewerten"][data-id="Fast"]');
  await k(p, '[data-action="einstieg-weiter"]', 900); await k(p, '[data-action="einstieg-weiter"]', 900); await k(p, '[data-action="einstieg-weiter"]', 900);
  await k(p, '[data-action="einstieg-anker"][data-id="maghrib"]'); await k(p, '[data-action="einstieg-weiter"]', 7500);
  await k(p, '[data-action="einstieg-fertig"]', 900);
}
(async () => {
  const b = await start();
  // 1: Einstieg -> Plan speichern -> "Ich habe schon ein Konto" -> bestehendes Konto
  { const { p } = await neueSeite(b, GERAETE.handy, { warte: 1500, user: null });
    await durch(p);
    await k(p, '[data-action="mode-login"]', 700); await foto(p, 'x-login');
    await p.fill('#a-email', 't@e.de'); await p.fill('#a-pass', 'geheim1'); await k(p, '[data-action="login"]', 3000);
    const ls = await p.evaluate(() => ({ a: localStorage.getItem('adrabic-einstieg-antworten'), n: localStorage.getItem('adrabic-einstieg-nachklang') }));
    console.log('Bestandskonto nach Einstieg:', JSON.stringify(ls));
    await foto(p, 'x-bestand-lernen');
    // Abmelden -> was sieht man?
    await p.evaluate(() => window.__FB && null);
    await p.context().close(); }
  // 2: Registrieren ohne Auto-Bestaetigung -> Bestaetigungsseite
  { const { p } = await neueSeite(b, GERAETE.handy, { warte: 1500, user: null, store: {} });
    await durch(p);
    await p.fill('#a-name', 'Ahmad'); await p.fill('#a-email', 'a@b.de'); await p.fill('#a-pass', 'geheim1');
    await k(p, '[data-action="register"]', 2500); await foto(p, 'x-bestaetigen', true);
    console.log('Bestaetigung h1:', await p.evaluate(() => document.querySelector('#app h1').textContent));
    // nun bestaetigen und reload simulieren
    await p.context().close(); }
  // 3: neues Konto nach Einstieg: Einstellungen uebernommen?
  { const { p } = await neueSeite(b, GERAETE.handy, { warte: 1500, user: null, store: {} });
    await p.evaluate(() => { window.__AUTO_VERIFY = true; });
    await durch(p);
    await p.fill('#a-name', 'Ahmad'); await p.fill('#a-email', 'a@b.de'); await p.fill('#a-pass', 'geheim1');
    await k(p, '[data-action="register"]', 3000);
    const s = await p.evaluate(() => { const d = window.__FB.store.get('users/neu1'); return d ? JSON.stringify(d.settings) : 'kein Dok'; });
    console.log('neues Konto settings:', s);
    await k(p, '[data-action="karte-neu"]', 900); await foto(p, 'x-erste-karte');
    await p.context().close(); }
  // 4: Abgemeldet mit Bestandsdaten: Startbild nach Abmelden
  { const { p } = await neueSeite(b, GERAETE.handy, { warte: 2000 });
    await p.evaluate(() => { const el = document.querySelector('[data-action="einstellungen"]'); el && el.click(); }); await p.waitForTimeout(700);
    await p.evaluate(() => { const el = document.querySelector('[data-action="logout"]'); el && el.click(); }); await p.waitForTimeout(700);
    await foto(p, 'x-abmelden-dialog');
    await p.evaluate(() => { const b = [...document.querySelectorAll('.dlg button')].find(x => /Abmelden/.test(x.textContent)); b && b.click(); }); await p.waitForTimeout(1500);
    console.log('nach Abmelden h1:', await p.evaluate(() => (document.querySelector('#app h1') || {}).textContent));
    await foto(p, 'x-nach-abmelden');
    await p.context().close(); }
  await b.close();
})();
