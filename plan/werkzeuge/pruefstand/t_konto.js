/* Station 15: Konto - Abmelden, Konto loeschen (Passwort / Google, frisch / alt). */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
const alt = 'Mon, 21 Sep 2026 10:00:00 GMT';
function nutzer(anbieter, frisch) { return { uid: 'u1', email: 'test@example.com', displayName: 'Test', emailVerified: true,
  providerData: [{ providerId: anbieter }], metadata: { creationTime: 'Mon, 03 Aug 2026 10:00:00 GMT', lastSignInTime: frisch ? new Date().toUTCString() : alt } }; }
async function halten(p) {
  const k = await p.$('[data-action="delete-account"]'); const r = await k.boundingBox();
  await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2); await p.mouse.down(); await p.waitForTimeout(2300); await p.mouse.up(); await p.waitForTimeout(900);
}
(async () => {
  const b = await start();
  const g = process.argv[2] || 'handy';
  const faelle = [
    ['Passwort, alt, abbrechen', 'password', false, async p => { await p.evaluate(() => [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Abbrechen').click()); }],
    ['Passwort, alt, falsch', 'password', false, async p => { await p.evaluate(() => { window.__FB.reauthFail = true; }); await p.fill('#dlg-input', 'falsch'); await p.evaluate(() => [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Weiter').click()); }],
    ['Passwort, alt, richtig', 'password', false, async p => { await p.fill('#dlg-input', 'geheim'); await p.evaluate(() => [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Weiter').click()); }],
    ['Google, alt, Fenster zu', 'google.com', false, async p => { await p.evaluate(() => { window.__FB.popupZu = true; }); await p.evaluate(() => [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Weiter').click()); }],
    ['Google, alt, angemeldet', 'google.com', false, async p => { await p.evaluate(() => [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Weiter').click()); }],
    ['Passwort, frisch', 'password', true, null]
  ];
  for (const [name, anbieter, frisch, schritt] of faelle) {
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1500, user: nutzer(anbieter, frisch) });
    await aktion(p, 'einstellungen', null, 800); await aktion(p, 'einst-seite', 'konto-loeschen', 900);
    const k = await pruefeKontrast(p, 'konto');
    if (name.startsWith('Passwort, alt, abbrechen') && g === 'handy') await foto(p, 'k15-gesperrt');
    await p.fill('#konto-loeschen-email', 'test@example.com'); await p.waitForTimeout(300);
    await halten(p);
    const frage = await p.evaluate(() => { const d = [...document.querySelectorAll('.dlg')].pop(); return d ? d.innerText.replace(/\s+/g, ' ').slice(0, 150) : 'keine Frage'; });
    if (schritt) { await schritt(p); await p.waitForTimeout(1500); }
    else await p.waitForTimeout(1500);
    const danach = await p.evaluate(() => { const d = [...document.querySelectorAll('.dlg')].pop(); return d ? d.innerText.replace(/\s+/g, ' ').slice(0, 120) : '–'; });
    const st = await p.evaluate(() => ({ daten: [...window.__FB.store.keys()].filter(k => k.startsWith('users/u1')).length, geloescht: !!window.__FB.geloescht }));
    console.log(name.padEnd(26), '| Kontrast', k.length ? JSON.stringify(k.map(f => f.text + ' ' + f.kontrast)) : 0, '| Frage:', frage, '| danach:', danach, '| Daten', st.daten, 'Konto geloescht', st.geloescht, '|', p.fehler.join('|') || 'ok');
    await p.context().close();
  }
  // Abmelden
  const { p } = await neueSeite(b, GERAETE[g], { warte: 1500 });
  await aktion(p, 'einstellungen', null, 800); await aktion(p, 'logout', null, 700);
  const frage = await p.evaluate(() => [...document.querySelectorAll('.dlg')].pop().innerText.replace(/\s+/g, ' '));
  await p.evaluate(() => [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Abmelden').click()); await p.waitForTimeout(1500);
  console.log('Abmelden:', frage, '| danach Einstieg', await p.evaluate(() => !!document.querySelector('.einstieg')), '|', p.fehler.join('|') || 'ok');
  await b.close();
})();
