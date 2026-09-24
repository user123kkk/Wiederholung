const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  for (const g of ['ipad', 'desktop']) {
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1800 });
    await aktion(p, 'tab-fortschritt', null, 1500); await foto(p, 'g-fort-' + g);
    await aktion(p, 'tab-verwalten', null, 1000); await foto(p, 'g-verw-' + g);
    console.log(g, p.fehler.join('|') || 'ok');
    await p.context().close();
  }
  await b.close();
})();
