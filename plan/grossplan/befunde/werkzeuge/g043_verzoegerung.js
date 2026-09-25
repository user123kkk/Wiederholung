// Prüfskript G-043: nach dem Vorbild von einstieg_mess2.js Teil (c).
// Prüft mit reducedMotion 'reduce' auf Lernen und Fortschritt, ob 30ms nach
// dem Wechsel noch Animationen mit delay > 0 warten, die noch nicht begonnen
// haben (currentTime < delay). Erwartet: 0.
const { start, neueSeite, GERAETE } = require('/home/user/Wiederholung/plan/werkzeuge/pruefstand/lib.js');
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 2500, ruhig: true });
  const t = (a) => p.evaluate(a => { const el = document.querySelector('[data-action="' + a + '"]'); el && el.click(); }, a);
  const pruef = async (name) => {
    const r = await p.evaluate(() => {
      let treffer = 0; const details = [];
      for (const el of document.querySelectorAll('#app *')) {
        for (const a of el.getAnimations()) {
          const timing = a.effect.getTiming();
          const delay = timing.delay || 0;
          if (delay > 0 && (a.currentTime == null || a.currentTime < delay)) {
            treffer++;
            details.push((el.className.baseVal !== undefined ? el.className.baseVal : el.className) + ' delay=' + Math.round(delay) + ' currentTime=' + Math.round(a.currentTime || 0));
          }
        }
      }
      return { treffer, details: details.slice(0, 10) };
    });
    console.log('G043', name, 'wartende Verzoegerungen:', r.treffer, r.details.length ? r.details.join(' ; ') : '');
  };
  await t('tab-fortschritt'); await p.waitForTimeout(30); await pruef('Fortschritt');
  await t('tab-lernen'); await p.waitForTimeout(30); await pruef('Lernen');
  await p.context().close();
  await b.close();
})();
