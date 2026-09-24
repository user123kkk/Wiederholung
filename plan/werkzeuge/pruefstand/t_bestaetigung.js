/* Station 4: E-Mail bestaetigen, automatische Weiterleitung. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
const NUTZER = { uid: 'neu1', email: 'neu@example.com', displayName: 'Neu', emailVerified: false, metadata: { creationTime: 'Thu, 24 Sep 2026 10:00:00 GMT' } };
(async () => {
  const b = await start();
  for (const [g, thema] of [['handy', 'dunkel'], ['handy', 'hell'], ['klein', 'dunkel'], ['ipad', 'dunkel']]) {
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1500, user: NUTZER, ls: thema === 'hell' ? { 'adrabic-thema': 'hell' } : {} });
    const funde = [];
    const pr = async n => { await p.waitForTimeout(700); funde.push(...await pruefeKontrast(p, n)); if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)) funde.push({ bild: n, text: 'quer' }); };
    const lage = () => p.evaluate(() => Object.fromEntries(['verification-check', 'resend-verification', 'logout'].map(a => { const k = document.querySelector('[data-action="' + a + '"]'); return [a, k ? Math.round(k.getBoundingClientRect().top) : null]; })));
    const text = () => p.evaluate(() => [...document.querySelectorAll('#app .error-box, #app .info-box')].map(e => e.innerText.trim()).join(' / '));
    const imFenster = () => p.evaluate(() => { const k = document.querySelector('[data-action="verification-check"]'); return k ? k.getBoundingClientRect().bottom <= innerHeight : null; });
    await pr('bestaetigen'); if (g === 'handy') await foto(p, 'b-' + thema + '-start');
    const l0 = await lage(); const sichtbar = await imFenster();
    // Knopf "Ich habe bestaetigt" ohne Bestaetigung: sofortiges Feedback?
    const tippFeedback = await p.evaluate(async () => { const k = document.querySelector('[data-action="verification-check"]'); k.click(); const n = document.querySelector('[data-action="verification-check"]'); return n ? (n.disabled || n.classList.contains('busy')) : 'weg'; });
    await p.waitForTimeout(900);
    const l1 = await lage(); const t1 = await text();
    await pr('noch-nicht'); if (g === 'handy') await foto(p, 'b-' + thema + '-nochnicht');
    // Erneut senden
    await aktion(p, 'resend-verification', null, 900);
    const l2 = await lage(); const t2 = await text();
    // Versand-Fehler
    await p.evaluate(() => { window.__FB.authFail = 'auth/too-many-requests'; });
    await aktion(p, 'resend-verification', null, 900);
    const t3 = await text();
    await p.evaluate(() => { window.__FB.authFail = 'auth/network-request-failed'; });
    await aktion(p, 'verification-check', null, 900);
    const t4 = await text(); const l4 = await lage();
    await pr('fehler'); if (g === 'handy') await foto(p, 'b-' + thema + '-fehler');
    await p.evaluate(() => { window.__FB.authFail = null; });
    // Automatische Weiterleitung: bestaetigt "in der Mail", nach <= 5 s neu geladen?
    let neu = false; p.on('framenavigated', f => { if (f === p.mainFrame()) neu = true; });
    await p.evaluate(() => { window.__FB.user.emailVerified = true; });
    const t0 = Date.now(); while (!neu && Date.now() - t0 < 7000) await p.waitForTimeout(100);
    const sp = (a, b2) => Object.keys(a).map(k => k + ' ' + ((b2[k] ?? 0) - (a[k] ?? 0))).join(', ');
    console.log(g, thema, '| im Fenster:', sichtbar, '| Tipp-Feedback:', tippFeedback,
      '\n  noch nicht:', JSON.stringify(t1), '| Sprung:', sp(l0, l1),
      '\n  erneut:', JSON.stringify(t2), '| Sprung:', sp(l0, l2),
      '\n  Versandfehler:', JSON.stringify(t3), '\n  Prueffehler:', JSON.stringify(t4), '| Sprung:', sp(l0, l4),
      '\n  Weiterleitung:', neu ? (Date.now() - t0) + ' ms' : 'NEIN',
      '| Kontrast/Quer:', funde.length ? funde.map(f => f.bild + ' "' + f.text + '" ' + (f.kontrast || '') + ' ' + (f.klasse || '')).join('; ') : 0, '|', p.fehler.join('|') || 'ok');
    await p.context().close();
  }
  await b.close();
})();
