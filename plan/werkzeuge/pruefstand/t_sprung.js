const { start, neueSeite, aktion, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  for (const g of ['handy', 'klein', 'ipad', 'desktop']) {
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1800 });
    await aktion(p, 'start-session', null, 700);
    const top = () => p.evaluate(() => Math.round(document.querySelector('.study-flaeche').getBoundingClientRect().top + scrollY));
    const spr = []; const zw = []; let vor = null;
    for (let i = 0; i < 12; i++) {
      if (!await p.$('.study-flaeche')) break;
      const a = await top(); if (vor !== null) zw.push(a - vor); vor = a; await p.click('.study-flaeche'); await p.waitForTimeout(700); const c = await top();
      spr.push(c - a);
      await p.click(i % 3 === 0 ? '.btn-almost' : '.btn-known'); await p.waitForTimeout(600);
    }
    /* 3.17.29: urteilt selbst (Abnahme) - mehr als 1 px (Rundung) ist ein Sprung. */
    const rot = spr.concat(zw).some(v => Math.abs(v) > 1) || p.fehler.length > 0;
    if (rot) process.exitCode = 1;
    console.log(rot ? 'FEHL' : 'OK  ', g, 'Spruenge:', spr.join(' '), '| Karte zu Karte:', zw.join(' '), p.fehler.join('|') || 'ok');
  }
  await b.close();
})();
