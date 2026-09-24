/* 3.16.0: Hick-Umbau pruefen - Fotos aller Tabs, Profil, Formular, Rundenende,
   "Trotzdem ueben", Suchbereich, und: reines Ueben haelt keine Serie. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  const thema = process.argv[2] || 'dunkel';
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800, thema });
  const serie = () => p.evaluate(() => { const e = document.querySelector('.serie-karte .serie-zahl strong'); const d = [...document.querySelectorAll('.woche__tag')].map(x => x.classList.contains('da') ? 'x' : '.').join(''); return (e ? e.textContent : '-') + ' / Woche ' + d; });
  console.log('Serie vorher:', await serie());
  await foto(p, 'h-lernen-' + thema, true);
  // Ueben: 6 Antworten
  await aktion(p, 'tab-verwalten', null, 900); await aktion(p, 'open-drill', null, 700); await aktion(p, 'start-drill', null, 900);
  for (let i = 0; i < 6; i++) { await p.click('#app .study-flaeche'); await p.waitForTimeout(600); await p.click('#app .btn-known'); await p.waitForTimeout(500); }
  await aktion(p, 'end-session', null, 700);
  await aktion(p, 'tab-lernen', null, 900);
  console.log('Serie nach reinem Ueben:', await serie());
  await aktion(p, 'tab-fortschritt', null, 1500);
  await foto(p, 'h-fortschritt-' + thema, true);
  console.log('Fortschritt:', await p.evaluate(() => [...document.querySelectorAll('#app h3, #app .gross-zahl, #app .trend-pill, #app .wochen-ueben, #app .stat-legend > span, #app .liste-zeile__text, #app .pill')].map(x => x.innerText.replace(/\s+/g, ' ').trim()).join(' | ')));
  await aktion(p, 'tab-verwalten', null, 900);
  await foto(p, 'h-verwalten-' + thema);
  console.log('Suchbereich ohne Suche sichtbar?', await p.evaluate(() => !!document.querySelector('.liste-suchbereich, .seg-row')));
  await p.fill('#f-search', 'Buch'); await p.waitForTimeout(700);
  console.log('Suchbereich beim Suchen sichtbar?', await p.evaluate(() => !!document.querySelector('.liste-suchbereich')));
  await p.fill('#f-search', ''); await p.waitForTimeout(500);
  await aktion(p, 'karte-neu', null, 800); await foto(p, 'h-karte-neu-' + thema);
  console.log('Formular:', await p.evaluate(() => [...document.querySelectorAll('.dlg label')].map(x => x.innerText.trim()).join(' | ')));
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  await aktion(p, 'tab-lernen', null, 800);
  await aktion(p, 'einstellungen', null, 900); await foto(p, 'h-einst-' + thema);
  console.log('Profil:', await p.evaluate(() => document.querySelector('.profil').innerText.replace(/\s+/g, ' ')));
  await aktion(p, 'einstellungen-zu', null, 700).catch(() => {});
  // Runde komplett, dann Serie
  await aktion(p, 'tab-lernen', null, 800); await aktion(p, 'start-session', null, 800);
  for (let i = 0; i < 20 && await p.$('#app .study-flaeche'); i++) { await p.click('#app .study-flaeche'); await p.waitForTimeout(550); await p.click('#app .btn-known'); await p.waitForTimeout(500); }
  await p.waitForTimeout(1500); await foto(p, 'h-ende-' + thema);
  console.log('Ende Kopfzeile:', JSON.stringify(await p.evaluate(() => document.querySelector('.modebar__mitte').textContent)));
  await aktion(p, 'end-session', null, 900);
  console.log('Serie nach echter Runde:', await serie());
  await foto(p, 'h-lernen-fertig-' + thema);
  if (await p.$('[data-action="trotzdem-ueben"]')) { await aktion(p, 'trotzdem-ueben', null, 1000); console.log('Trotzdem ueben -> Auswahl offen?', await p.evaluate(() => !!document.getElementById('drill-box')), 'Tab:', await p.evaluate(() => document.querySelector('.nav__tab[aria-current="page"], .nav__tab.aktiv, .nav__tab.active') ? document.querySelector('.nav__tab[aria-current="page"], .nav__tab.aktiv, .nav__tab.active').innerText : '?')); }
  console.log(p.fehler.join('\n') || 'keine Fehler');
  await b.close();
})();
