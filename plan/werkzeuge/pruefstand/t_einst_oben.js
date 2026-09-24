const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800 });
  await aktion(p, 'einstellungen', null, 1200);
  console.log('scrollY', await p.evaluate(() => scrollY));
  await foto(p, 'h-einst-oben');
  await aktion(p, 'tab-verwalten', null, 900);
  await p.evaluate(() => scrollTo(0, 600)); await p.waitForTimeout(300);
  await aktion(p, 'einstellungen', null, 1200);
  console.log('scrollY nach Verwalten+scroll', await p.evaluate(() => scrollY));
  await b.close();
})();
