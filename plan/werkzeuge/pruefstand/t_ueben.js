/* Ueben 3.15.0: Auswahl, Runde mit Bewertung, Abschluss, Schreiben. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  const thema = process.argv[2] || 'dunkel';
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800, thema });
  await aktion(p, 'tab-verwalten', null, 800); await aktion(p, 'open-drill', null, 700);
  await p.evaluate(() => document.getElementById('drill-box').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
  await foto(p, 'ue-auswahl-' + thema);
  const chips = () => p.evaluate(() => [...document.querySelectorAll('.stufe-chip')].map(c => c.textContent + (c.classList.contains('aktiv') ? '*' : '')).join(' | ') + ' => ' + document.querySelector('.drill-zahl').textContent);
  console.log('Start:', await chips());
  // alle bis auf "gefestigt" abwaehlen
  for (const t of ['frisch gelernt', 'wird fester', 'dauerhaft', 'neu & im Lernen']) { const c = await p.$('.stufe-chip:has-text("' + t + '")'); if (c) { await c.click(); await p.waitForTimeout(250); } }
  console.log('Nur gefestigt:', await chips());
  await aktion(p, 'start-drill', null, 900);
  console.log('Modebar:', await p.evaluate(() => document.querySelector('.modebar').textContent.trim()), '| Hinweis:', await p.evaluate(() => (document.querySelector('.ueben-hinweis') || {}).textContent));
  await p.waitForTimeout(400); await foto(p, 'ue-karte1-' + thema);
  let n = 0;
  while (await p.$('.study-flaeche') && n < 40) {
    await p.click('.study-flaeche'); await p.waitForTimeout(650);
    await p.click(n % 4 === 0 ? '.btn-unknown' : '.btn-known'); await p.waitForTimeout(550); n++;
  }
  await p.waitForTimeout(1500);
  console.log('Bewertungen:', n, '| Ende:', await p.evaluate(() => (document.querySelector('.ende') || {}).innerText));
  await foto(p, 'ue-ende-' + thema);
  await aktion(p, 'drill-nochmal', null, 900);
  console.log('Nochmal:', await p.evaluate(() => document.querySelector('.modebar').textContent.trim()));
  await aktion(p, 'end-session', null, 700);
  // Schreiben
  await aktion(p, 'tab-verwalten', null, 800).catch(() => {}); await aktion(p, 'open-drill', null, 700);
  await p.evaluate(() => { document.getElementById('drill-handwriting').checked = true; }); await aktion(p, 'start-drill', null, 1000);
  const c = await p.$('#hw-canvas'); const r = await c.boundingBox();
  await p.mouse.move(r.x + 40, r.y + 60); await p.mouse.down();
  for (let i = 0; i < 20; i++) await p.mouse.move(r.x + 40 + i * 12, r.y + 60 + Math.sin(i / 2) * 30);
  await p.mouse.up(); await p.waitForTimeout(300);
  await foto(p, 'ue-schreiben-' + thema);
  console.log(p.fehler.join('\n') || 'keine Fehler');
  await b.close();
})();
