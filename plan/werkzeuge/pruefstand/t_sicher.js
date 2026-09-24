const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  const { ctx, p } = await neueSeite(b, GERAETE.handy);
  await aktion(p, 'einstellungen', null, 800);
  await aktion(p, 'logout', null, 600);
  console.log('Dialog nach Abmelden:', await p.evaluate(() => (document.querySelector('.dlg h3') || {}).textContent));
  await foto(p, 's1-abmelden-frage');
  await aktion(p, 'dlg-cancel', null, 500);
  console.log('noch angemeldet:', await p.evaluate(() => !!document.querySelector('.view')));
  await aktion(p, 'einst-seite', 'konto-loeschen', 800);
  await foto(p, 's2-loeschen-seite', true);
  console.log('Knopf gesperrt:', await p.evaluate(() => document.querySelector('[data-halten]').disabled));
  await p.fill('#konto-loeschen-email', 'test@example.com');
  await p.waitForTimeout(200);
  console.log('Knopf frei nach E-Mail:', await p.evaluate(() => !document.querySelector('[data-halten]').disabled));
  // kurzer Tipp darf nichts tun
  await p.click('[data-halten]'); await p.waitForTimeout(400);
  console.log('nach kurzem Tipp geloescht?', await p.evaluate(() => !!window.__FB.geloescht));
  // halten
  const box = await (await p.$('[data-halten]')).boundingBox();
  await p.mouse.move(box.x + 20, box.y + 10); await p.mouse.down();
  await p.waitForTimeout(900); await foto(p, 's3-halten-mitte');
  await p.mouse.up(); await p.waitForTimeout(300);
  console.log('nach halbem Halten geloescht?', await p.evaluate(() => !!window.__FB.geloescht));
  await p.mouse.move(box.x + 20, box.y + 10); await p.mouse.down();
  await p.waitForTimeout(2100); await p.mouse.up(); await p.waitForTimeout(700);
  // 3.17.15: ohne frische Anmeldung kommt erst die Passwort-Frage
  if (await p.$('#dlg-input')) { await p.fill('#dlg-input', 'geheim'); await p.evaluate(() => [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Weiter').click()); }
  await p.waitForTimeout(1200);
  console.log('nach vollem Halten geloescht?', await p.evaluate(() => !!window.__FB.geloescht));
  await foto(p, 's4-nach-loeschen');
  console.log('danach Einstieg?', await p.evaluate(() => !!document.querySelector('.einstieg')));
  console.log(p.fehler.join('\n'));
  await b.close();
})();
