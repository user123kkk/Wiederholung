/* 3.17.25: misst das Gefuehl einer Lernrunde (Animationen, Wortposition, Element unter dem Daumen, Fotos). node t_runde_gefuehl.js */
// Misst das "Gefuehl" einer Lernrunde: was bewegt sich, was ploppt auf, was liegt unter dem Daumen.
const L = './lib';
const { start, neueSeite, aktion, GERAETE } = require(L);
const DIR = require('path').join(require('os').tmpdir(), 'adrabic-runde') + '/';
require('fs').mkdirSync(DIR, { recursive: true });
const box = (p, sel) => p.evaluate(s => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { y: Math.round(r.top), h: Math.round(r.height), x: Math.round(r.left), w: Math.round(r.width) }; }, sel);
const anim = p => p.evaluate(() => document.getAnimations().map(a => {
  const t = a.effect && a.effect.target; const n = a.animationName || (a.transitionProperty ? 'transition:' + a.transitionProperty : '?');
  const d = a.effect && a.effect.getTiming ? a.effect.getTiming() : {};
  return n + ' @' + (t ? (t.className && t.className.baseVal === undefined ? String(t.className).split(' ')[0] : t.tagName) : '?') + ' ' + Math.round(d.duration || 0) + 'ms+' + Math.round(d.delay || 0);
}));
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800 });
  const H = (await p.viewportSize()).height;
  console.log('Fenster', JSON.stringify(await p.viewportSize()));
  await aktion(p, 'start-session', null, 1500);
  await p.screenshot({ path: DIR + '1-vorn.png' });
  const vorn = { karte: await box(p, '.study-flaeche'), knopf: await box(p, '.study-aufdecken'), scroll: await p.evaluate(() => scrollY) };
  console.log('VORN', JSON.stringify(vorn));
  // Tipp auf "Antwort zeigen" - dort, wo der Daumen liegt
  const kx = vorn.knopf.x + vorn.knopf.w / 2, ky = vorn.knopf.y + vorn.knopf.h / 2;
  await p.mouse.click(kx, ky);
  for (const t of [40, 150, 350, 700]) {
    await p.waitForTimeout(t === 40 ? 40 : t - [40, 150, 350, 700][[40, 150, 350, 700].indexOf(t) - 1]);
    await p.screenshot({ path: DIR + '2-aufdecken-' + t + 'ms.png' });
    if (t === 40) console.log('ANIMATIONEN nach Aufdecken (40ms):', JSON.stringify(await anim(p)));
  }
  await p.waitForTimeout(600);
  const hinten = { karte: await box(p, '.study-flaeche'), reihe: await box(p, '.grade-row'), neben: await box(p, '.study-nebenaktionen'), scroll: await p.evaluate(() => scrollY),
    unterDaumen: await p.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return e ? (e.closest('button') || e).innerText.trim().slice(0, 20) : '-'; }, [kx, ky]) };
  console.log('HINTEN', JSON.stringify(hinten));
  console.log('Karte verschoben um', hinten.karte.y - vorn.karte.y, 'px, Hoehe', vorn.karte.h, '->', hinten.karte.h, '| Seite gescrollt um', hinten.scroll - vorn.scroll);
  await p.screenshot({ path: DIR + '3-hinten.png' });
  // Bewerten "Sicher"
  const sk = await box(p, '.btn-known');
  await p.mouse.click(sk.x + sk.w / 2, sk.y + sk.h / 2);
  await p.waitForTimeout(40);
  console.log('ANIMATIONEN nach Bewerten (40ms):', JSON.stringify(await anim(p)));
  for (const [t, w] of [[150, 110], [400, 250], [900, 500]]) { await p.waitForTimeout(w); await p.screenshot({ path: DIR + '4-bewertet-' + t + 'ms.png' }); }
  await p.waitForTimeout(600);
  const naechste = { karte: await box(p, '.study-flaeche'), knopf: await box(p, '.study-aufdecken'), leiste: await p.evaluate(() => [...document.querySelectorAll('.mode-bar button, .modebar button, header button')].map(b => b.getAttribute('aria-label')).join(' | ')) };
  console.log('NAECHSTE', JSON.stringify(naechste));
  console.log('Karte naechste vs erste:', naechste.karte.y - vorn.karte.y, 'px');
  // Zeit von Tipp "Sicher" bis naechste Karte bedienbar
  console.log(p.fehler.join('\n') || 'keine Fehler');
  await b.close();
})();
