const { chromium } = require('playwright'); const { OUT } = require('./lib');
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  const p = await (await b.newContext({ viewport: { width: 320, height: 568 }, deviceScaleFactor: 2 })).newPage();
  await p.route('**/www.gstatic.com/**', () => {});
  await p.goto('http://127.0.0.1:8099/index.html'); await p.waitForTimeout(10000);
  const r = await p.evaluate(() => { const k = document.querySelector('.boot__hinweis button').getBoundingClientRect(); return [Math.round(k.bottom), innerHeight]; });
  console.log('kleinstes iPhone: Knopf-Unterkante / Hoehe', r.join(' / '));
  await p.screenshot({ path: OUT + '/start-haenger-klein.png' }); await b.close();
})();
