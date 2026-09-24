/* Lange Liste (3.17.6, content-visibility): Scrollen bis ans Ende, Zeilen
   haben Inhalt, Ziehen zum Sortieren wirkt. */
const { start, neueSeite, GERAETE, foto } = require('./lib');
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1500 });
  await p.evaluate(() => document.querySelector('[data-action="tab-verwalten"]').click()); await p.waitForTimeout(1500);
  const reihe = () => p.evaluate(() => [...document.querySelectorAll('#karten-liste > .card-row')].map(r => r.dataset.cardid).slice(0, 6).join(','));
  const vor = await reihe();
  const h = await p.$('#karten-liste > .card-row:nth-child(1) .drag-handle');
  if (h) { const r = await h.boundingBox(); await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2); await p.mouse.down(); await p.waitForTimeout(100);
    await p.mouse.move(r.x + r.width / 2, r.y + 170, { steps: 15 }); await p.mouse.up(); await p.waitForTimeout(900); }
  const nach = await reihe();
  console.log('Ziehen:', h ? (vor !== nach ? 'sortiert' : 'NICHTS') : 'kein Griff', '|', vor, '->', nach);
  await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(800);
  const ende = await p.evaluate(() => { const z = [...document.querySelectorAll('#karten-liste > .card-row')]; const l = z[z.length - 1]; const r = l.getBoundingClientRect(); return { text: l.innerText.replace(/\s+/g, ' ').trim().slice(0, 40), top: Math.round(r.top), hoehe: Math.round(r.height), fenster: innerHeight }; });
  console.log('Ende:', JSON.stringify(ende));
  await foto(p, 'liste-ende');
  await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2)); await p.waitForTimeout(500);
  await foto(p, 'liste-mitte');
  console.log(p.fehler.join('|') || 'ok');
  await b.close();
})();
