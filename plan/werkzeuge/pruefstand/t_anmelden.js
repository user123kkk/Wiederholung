/* Station 3: Anmelden, Registrieren, Passwort vergessen. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
(async () => {
  const b = await start();
  for (const [g, thema] of [['handy', 'dunkel'], ['handy', 'hell'], ['klein', 'dunkel'], ['ipad', 'dunkel']]) {
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1500, user: null, ls: thema === 'hell' ? { 'adrabic-thema': 'hell' } : {} });
    const funde = [];
    const pr = async n => { await p.waitForTimeout(700); funde.push(...await pruefeKontrast(p, n)); if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) funde.push({ bild: n, text: 'quer' }); };
    const knopf = sel => p.evaluate(s => { const k = document.querySelector(s); return k ? Math.round(k.getBoundingClientRect().top) : null; }, sel);
    await aktion(p, 'einstieg-konto', null, 900);
    await pr('login'); if (g === 'handy') await foto(p, 'a-' + thema + '-login');
    // Passwort sichtbar machen behaelt Eingabe + Fokus?
    await p.fill('#a-email', 'x@y.de'); await p.fill('#a-pass', 'falsch');
    await aktion(p, 'passwort-zeigen', null, 300);
    const nachZeigen = await p.evaluate(() => [document.getElementById('a-pass').type, document.getElementById('a-pass').value, document.getElementById('a-email').value].join('/'));
    // falsches Passwort
    const vorher = await knopf('[data-action="login"]');
    await aktion(p, 'login', null, 1200);
    const fehler = await p.evaluate(() => (document.querySelector('.error-box') || {}).innerText);
    const nachher = await knopf('[data-action="login"]');
    await pr('login-fehler'); if (g === 'handy') await foto(p, 'a-' + thema + '-fehler');
    // Registrieren
    await aktion(p, 'mode-register', null, 900);
    const imEinstieg = await p.evaluate(() => !!document.querySelector('.einstieg'));
    const kl = async s2 => { const el = await p.$(s2); if (el) { await el.click(); await p.waitForTimeout(700); } };
    await kl('[data-action="einstieg-ziel"]'); await kl('[data-action="einstieg-weiter"]');
    await kl('[data-action="einstieg-huerde"]'); await kl('[data-action="einstieg-weiter"]');
    await kl('[data-action="einstieg-aufdecken"]'); await kl('[data-action="einstieg-bewerten"][data-id="Sicher"]'); await kl('[data-action="einstieg-weiter"]');
    await kl('[data-action="einstieg-weiter"]'); await kl('[data-action="einstieg-weiter"]');
    await kl('[data-action="einstieg-anker"]'); await kl('[data-action="einstieg-weiter"]');
    await p.waitForTimeout(7000);
    const speichern = await p.evaluate(() => { const k = [...document.querySelectorAll('.einstieg-aktion button')].pop(); if (k) { k.click(); return k.innerText; } return null; });
    await p.waitForTimeout(900);
    console.log('  Neues Konto -> Einstieg:', imEinstieg, '| Plan-Knopf:', speichern);
    await pr('register'); if (g === 'handy') await foto(p, 'a-' + thema + '-register');
    const nameVorher = await knopf('[data-action="register"]');
    await p.fill('#a-name', ''); await aktion(p, 'register', null, 700);
    const nameFehler = await p.evaluate(() => !!document.getElementById('a-name-fehler'));
    const nameNachher = await knopf('[data-action="register"]');
    // Zuruecksetzen
    await aktion(p, 'mode-login', null, 600); await aktion(p, 'mode-reset', null, 700); await pr('reset'); if (g === 'handy') await foto(p, 'a-' + thema + '-reset');
    await p.fill('#a-email', 'x@y.de'); await aktion(p, 'reset', null, 1200);
    const info = await p.evaluate(() => (document.querySelector('.info-box, .error-box') || {}).innerText);
    console.log(g, thema, '| Auge:', nachZeigen, '| Fehlertext:', JSON.stringify(fehler), '| Knopf-Sprung Fehler:', (nachher ?? 0) - (vorher ?? 0),
      '| Name-Fehler:', nameFehler, 'Sprung', (nameNachher ?? 0) - (nameVorher ?? 0), '| Reset:', JSON.stringify(info),
      '| Kontrast/Quer:', funde.length ? funde.map(f => f.bild + ' "' + f.text + '" ' + (f.kontrast || '') + ' ' + (f.klasse || '')).join('; ') : 0, '|', p.fehler.join('|') || 'ok');
    await p.context().close();
  }
  await b.close();
})();
