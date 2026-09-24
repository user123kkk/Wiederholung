const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 2000 });
  await aktion(p, 'start-session', null, 600); await aktion(p, 'reveal', null, 800);
  console.log('Knoepfe:', await p.evaluate(() => [...document.querySelectorAll('.grade-row .sub')].map(x => x.textContent)));
  await aktion(p, 'end-session', null, 500);
  await aktion(p, 'tab-verwalten', null, 800);
  console.log('Plaketten:', await p.evaluate(() => [...new Set([...document.querySelectorAll('.badge[class*=zustand]')].map(x => x.textContent))]));
  await aktion(p, 'open-drill', null, 700);
  const r = await p.evaluate(() => { const r = document.querySelector('[value="stufe"], input[name="drill-source"][value="stufen"]'); if (r) r.click(); return !!r; });
  await p.waitForTimeout(500);
  console.log('Ueben-Chips:', await p.evaluate(() => [...document.querySelectorAll('.stufe-chip')].map(x => x.textContent + (x.classList.contains('aktiv') ? '*' : ''))), await p.evaluate(() => (document.querySelector('.stufe-chips + .hint') || {}).textContent));
  const chips = await p.$$('.stufe-chip');
  if (chips.length > 1) { await chips[1].click(); await p.waitForTimeout(400);
    console.log('nach Tipp auf 2. Chip:', await p.evaluate(() => [...document.querySelectorAll('.stufe-chip')].map(x => x.textContent + (x.classList.contains('aktiv') ? '*' : '')))); }
  await aktion(p, 'close-drill', null, 400).catch(() => {});
  await aktion(p, 'card-detail', null, 600); await aktion(p, 'card-detail-bearbeiten', null, 700);
  console.log('Stand-Auswahl:', await p.evaluate(() => { const s = document.getElementById('f-stufe'); return s ? [...s.options].map(o => o.textContent + '=' + o.value + (o.selected ? '*' : '')) : null; }));
  await foto(p, 'z-bearbeiten');
  console.log(p.fehler.join('\n') || 'keine Fehler');
  await b.close();
})();
