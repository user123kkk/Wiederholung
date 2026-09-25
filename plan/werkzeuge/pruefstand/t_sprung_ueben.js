/* Sprungmessung im Ueben (Ziel 0 px), inkl. erster Karte mit Kopfzeilen-Hinweis. */
const { start, neueSeite, aktion, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  for (const g of ['handy', 'klein', 'ipad']) {
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1800 });
    await aktion(p, 'tab-verwalten', null, 800); await aktion(p, 'open-drill', null, 700); await aktion(p, 'start-drill', null, 900);
    const top = () => p.evaluate(() => Math.round(document.querySelector('.study-flaeche').getBoundingClientRect().top + scrollY));
    const sp = []; let vorige = null; const zwischen = [];
    for (let i = 0; i < 8; i++) {
      const a = await top(); if (vorige !== null) zwischen.push(a - vorige);
      await p.click('.study-flaeche'); await p.waitForTimeout(650); sp.push((await top()) - a);
      vorige = a; await p.click('.btn-known'); await p.waitForTimeout(600);
    }
    /* 3.17.29: urteilt selbst (Abnahme) - mehr als 1 px (Rundung) ist ein Sprung. */
    const rot = sp.concat(zwischen).some(v => Math.abs(v) > 1) || p.fehler.length > 0;
    if (rot) process.exitCode = 1;
    console.log(rot ? 'FEHL' : 'OK  ', g, 'Aufdecken:', sp.join(' '), '| Karte zu Karte:', zwischen.join(' '), p.fehler.join('|') || 'ok');
    await p.context().close();
  }
  await b.close();
})();
