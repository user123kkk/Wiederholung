const { start, neueSeite, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 6000, user: null });
  console.log(await p.evaluate(() => [...document.querySelectorAll('.einstieg-leiste__wort')].map(w => {
    const cs = getComputedStyle(w); let o = 1; for (let e = w; e; e = e.parentElement) o *= +getComputedStyle(e).opacity;
    const anims = []; for (let e = w; e; e = e.parentElement) e.getAnimations().forEach(a => anims.push((a.animationName || 'x') + ':' + a.playState + ':' + (a.effect && a.effect.getComputedTiming().iterations)));
    return w.textContent + ' color=' + cs.color + ' opacity=' + o.toFixed(2) + ' anim=' + anims.join(',');
  }).join('\n')));
  await b.close();
})();
