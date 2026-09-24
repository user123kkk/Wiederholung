const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const setze = (p, t) => p.evaluate(t => { document.getAnimations().forEach(a => { a.pause(); a.currentTime = t; }); }, t);
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800, thema: process.argv[2] || 'dunkel' });
  await aktion(p, 'start-session', null, 900);
  await p.click('.study-flaeche');
  for (const t of [0, 110, 200, 300, 420, 620]) { await setze(p, t); await foto(p, 'f-' + t); }
  await p.evaluate(() => document.getAnimations().forEach(a => a.finish()));
  await p.click('.btn-known');
  for (const t of [60, 180, 300]) { await setze(p, t); await foto(p, 'g-' + t); }
  await p.evaluate(() => document.getAnimations().forEach(a => a.finish())); await p.waitForTimeout(700);
  await p.click('.study-flaeche'); await p.evaluate(() => document.getAnimations().forEach(a => a.finish())); await p.waitForTimeout(100);
  await p.click('.btn-unknown'); await setze(p, 180); await foto(p, 'g-nicht');
  await p.evaluate(() => document.getAnimations().forEach(a => a.finish())); await p.waitForTimeout(700);
  await p.click('.study-flaeche'); await p.evaluate(() => document.getAnimations().forEach(a => a.finish())); await p.waitForTimeout(100);
  await p.click('.btn-almost'); await setze(p, 180); await foto(p, 'g-fast');
  console.log(p.fehler.join('|') || 'ok'); await b.close();
})();
