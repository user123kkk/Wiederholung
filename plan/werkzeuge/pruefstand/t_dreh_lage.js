/* 3.17.38: Das Wort steht vor und nach dem Umdrehen gleich hoch (Betreiber
   26.09.2026 "beim Drehen glitcht es"; vorher 6 px Sprung, weil ein LEERER
   Tag-Platzhalter vorn einen Flex-gap bekam). Misst die Mitte von
   .study-word auf Vorder- und Rueckseite, Handy/klein/iPad/Desktop.
   Gegenprobe fest gegen styles.css aus 1c8aaa1 (Stand vor 3.17.38), nie gegen
   HEAD (LEHREN § 15). Aufruf: node t_dreh_lage.js */
const { execFileSync } = require('child_process');
const path = require('path');
const { start, neueSeite, aktion, GERAETE } = require('./lib');
const CSS_ALT = execFileSync('git', ['show', '1c8aaa1:styles.css'], { cwd: path.join(__dirname, '../../..'), maxBuffer: 1 << 24 }).toString();

async function sprung(b, g, alt) {
  const { p, ctx } = await neueSeite(b, GERAETE[g], { warte: 1800 });
  if (alt) {
    /* ctx statt p: die Anfrage geht ueber den Service Worker, page.route sieht sie nicht */
    await ctx.route('**/styles.css?v=alt', r => r.fulfill({ status: 200, contentType: 'text/css', body: CSS_ALT }));
    await p.evaluate(() => { document.querySelector('link[rel=stylesheet][href*="styles.css"]').href = './styles.css?v=alt'; });
    await p.waitForTimeout(800);
  }
  await aktion(p, 'start-session', null, 1200);
  await p.click('#app .study-flaeche');
  /* 3.17.39 (G-092): Vorderseite sichtbar, solange sie zum Betrachter zeigt
     (< 90 Grad), danach hidden - dann kann Safari nichts gespiegelt zeigen. */
  const winkel = [];
  /* 3.17.40: gemessen an der Deckkraft (laeuft in Safari synchron mit der
     Drehung, visibility nicht), dazu: die Linie hinten ist WAEHREND der
     Drehung schon da (Betreiber: "es soll ja eine Vor- und Rueckseite sein"). */
  for (const t of [60, 90, 150]) {
    await p.evaluate(t => document.getAnimations().forEach(a => { a.pause(); a.currentTime = t; }), t);
    winkel.push(await p.evaluate(() => { const m = new DOMMatrix(getComputedStyle(document.querySelector('.karte-dreh')).transform);
      const tr = document.querySelector('.karte-seite--hinten .study-trenner');
      return { grad: (Math.round(Math.atan2(-m.m13, m.m11) * 180 / Math.PI) + 360) % 360,
        vorn: +getComputedStyle(document.querySelector('.karte-seite--vorn')).opacity,
        linie: Math.round(tr.getBoundingClientRect().width) }; }));
  }
  const winkelOk = winkel.every(w => (w.grad < 90) === (w.vorn === 1) && (w.grad < 90 || w.vorn === 0))
    && winkel.filter(w => w.grad > 90).every(w => w.linie > 10);
  await p.evaluate(() => document.getAnimations().forEach(a => { try { a.finish(); } catch (e) {} }));
  await p.waitForTimeout(100);
  const m = await p.evaluate(() => [...document.querySelectorAll('.karte-seite')].map(s => {
    const w = s.querySelector('.study-word').getBoundingClientRect(), k = s.getBoundingClientRect();
    return (w.top + w.bottom) / 2 - k.top;
  }));
  /* 3.17.39 (G-092): nach der Drehung ist die Vorderseite weg (in Safari
     schien sie sonst gespiegelt durch), die Linie hinten ist da. */
  const ende = await p.evaluate(() => { const v = document.querySelector('.karte-seite--vorn'), tr = document.querySelector('.karte-seite--hinten .study-trenner');
    return { vornWeg: !v || getComputedStyle(v).visibility === 'hidden', linie: tr ? Math.round(tr.getBoundingClientRect().width) : 0 }; });
  const fehler = p.fehler.slice();
  if (!alt && (!ende.vornWeg || ende.linie < 10)) fehler.push('Endzustand ' + JSON.stringify(ende));
  if (!alt && !winkelOk) fehler.push('Vorderseite waehrend der Drehung ' + JSON.stringify(winkel));
  await ctx.close();
  return { d: m.length === 2 ? Math.round((m[1] - m[0]) * 10) / 10 : null, fehler };
}

(async () => {
  const b = await start(); let funde = 0;
  for (const g of ['handy', 'klein', 'ipad', 'desktop']) {
    const r = await sprung(b, g, false);
    const ok = r.d !== null && Math.abs(r.d) <= 1 && !r.fehler.length;
    if (!ok) funde++;
    console.log((ok ? 'ok     ' : 'FEHLER ') + g + ' Wort-Sprung beim Umdrehen: ' + r.d + ' px' + (r.fehler.length ? ' | ' + r.fehler.join(' / ') : ''));
  }
  const alt = await sprung(b, 'handy', true);
  const rot = alt.d !== null && Math.abs(alt.d) > 1;
  if (!rot) funde++;
  console.log((rot ? 'ok     ' : 'FEHLER ') + 'Gegenprobe styles.css 1c8aaa1 (muss ROT sein): ' + alt.d + ' px');
  console.log('Funde: ' + funde); await b.close(); process.exit(funde ? 1 : 0);
})();
