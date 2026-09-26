const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 2000 });
  await aktion(p, 'einstellungen', null, 900);
  await p.setViewportSize({ width: 390, height: 1400 });
  await p.waitForTimeout(300);
  await foto(p, 'ein-uebersicht');
  console.log(await p.evaluate(() => [...document.querySelectorAll('.eyebrow, .liste-zeile__text')].map(x => x.textContent)));
  await aktion(p, 'einst-seite', 'daten', 900);
  await foto(p, 'ein-daten');
  console.log(await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3')].map(x => x.textContent)));
  /* 3.17.41: history.back() ist kein Zurueck-Weg der App - ueber den Reiter Einstellungen zurueck (wie t_board_limit.js). */
  await p.evaluate(() => { const k = document.querySelector('[data-action="einstellungen"]'); if (k) k.click(); }); await p.waitForTimeout(800);
  await aktion(p, 'einst-seite', 'kartensaetze', 900);
  console.log(await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3')].map(x => x.textContent)));
  console.log(p.fehler.join('\n') || 'keine Fehler');
  await b.close();
})();
