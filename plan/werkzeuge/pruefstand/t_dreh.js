const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 2000 });
  await aktion(p, 'start-session', null, 700);
  const vor = await p.evaluate(() => { const r = document.querySelector('.study-flaeche').getBoundingClientRect(); return [r.top, r.height]; });
  await p.click('.study-flaeche');   // Tipp auf die Karte
  for (const t of [60, 160, 260, 380, 700]) { await p.waitForTimeout(t === 60 ? 60 : 100); await foto(p, 'dreh-' + t); }
  const nach = await p.evaluate(() => { const r = document.querySelector('.study-flaeche').getBoundingClientRect();
    return [r.top, r.height, !!document.querySelector('.grade-row'), document.querySelectorAll('.karte-seite').length]; });
  console.log('vor', vor, 'nach', nach);
  // Knopf "Sicher"
  await p.click('.btn-known');
  for (const t of [80, 200, 600]) { await p.waitForTimeout(t === 80 ? 80 : t - 80 - (t === 600 ? 120 : 0)); await foto(p, 'geist-' + t); }
  console.log('Geister danach:', await p.evaluate(() => document.querySelectorAll('.karte-geist').length));
  // Wischtest nach Drehen
  await p.click('.study-flaeche'); await p.waitForTimeout(800);
  const box = await p.evaluate(() => { const r = document.querySelector('.study-flaeche').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
  await p.mouse.move(box[0], box[1]); await p.mouse.down(); await p.mouse.move(box[0] + 60, box[1], { steps: 5 });
  console.log('Wisch-Transform:', await p.evaluate(() => getComputedStyle(document.querySelector('.study-flaeche')).transform));
  await p.mouse.move(box[0] + 200, box[1], { steps: 5 }); await p.mouse.up(); await p.waitForTimeout(700);
  console.log('Karte:', await p.evaluate(() => document.querySelector('.modebar') && document.querySelector('.modebar').textContent.trim().slice(0, 40)));
  // Doppeltipp
  await p.click('.study-flaeche'); await p.click('.study-flaeche').catch(() => {}); await p.waitForTimeout(700);
  console.log('nach Doppeltipp offen, Knoepfe:', await p.evaluate(() => !!document.querySelector('.grade-row')));
  console.log(p.fehler.join('\n') || 'keine Fehler');
  await b.close();
})();
