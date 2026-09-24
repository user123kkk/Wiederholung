const { start, neueSeite, aktion, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  for (const g of ['handy', 'klein', 'ipad', 'desktop']) {
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1800 });
    await aktion(p, 'start-session', null, 700);
    const top = () => p.evaluate(() => Math.round(document.querySelector('.study-flaeche').getBoundingClientRect().top + scrollY));
    const spr = [];
    for (let i = 0; i < 12; i++) {
      if (!await p.$('.study-flaeche')) break;
      const a = await top(); await p.click('.study-flaeche'); await p.waitForTimeout(700); const c = await top();
      spr.push(c - a);
      await p.click(i % 3 === 0 ? '.btn-almost' : '.btn-known'); await p.waitForTimeout(600);
    }
    console.log(g, 'Spruenge:', spr.join(' '), p.fehler.join('|') || 'ok');
  }
  await b.close();
})();
