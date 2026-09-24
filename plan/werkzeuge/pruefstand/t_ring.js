/* Einladungs-Ring (3.15.0): Bild bei 0 / 2,9 s / 3,4 s auf derselben Karte; Glanz beim Wegfliegen. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const setze = (p, t) => p.evaluate(t => { document.getAnimations().forEach(a => { a.pause(); a.currentTime = t; }); }, t);
(async () => {
  const b = await start();
  for (const thema of ['dunkel', 'hell']) {
    const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800, thema });
    await aktion(p, 'start-session', null, 900);
    for (const t of [1000, 2750, 3300]) { await setze(p, t); await foto(p, 'ring-' + thema + '-' + t); }
    await p.evaluate(() => document.getAnimations().forEach(a => { try { a.finish(); } catch (e) { a.cancel(); } }));
    await p.click('.study-flaeche'); await p.evaluate(() => document.getAnimations().forEach(a => { try { a.finish(); } catch (e) { a.cancel(); } })); await p.waitForTimeout(150);
    await p.click('.btn-known'); await setze(p, 110); await foto(p, 'glanz-' + thema);
    console.log(thema, p.fehler.join('|') || 'ok');
    await p.context().close();
  }
  await b.close();
})();
