/* Fotos der Runde: Karte mit Notiz (vorn/hinten), Schreiben, hell/dunkel. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  for (const thema of ['dunkel', 'hell']) {
    const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800, thema });
    await aktion(p, 'start-session', null, 800);
    for (let i = 0; i < 12; i++) {
      const hat = await p.evaluate(() => !!document.querySelector('.study-extra--platz'));
      if (hat) break;
      await p.click('.study-flaeche'); await p.waitForTimeout(600); await p.click('.btn-known'); await p.waitForTimeout(600);
    }
    await p.waitForTimeout(3000); await foto(p, 'rn-vorn-' + thema);
    await p.click('.study-flaeche'); await p.waitForTimeout(900); await foto(p, 'rn-hinten-' + thema);
    console.log(thema, p.fehler.join('|') || 'ok');
    await p.context().close();
  }
  await b.close();
})();
