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
  await p.evaluate(() => document.getAnimations().forEach(a => { try { a.finish(); } catch (e) {} }));
  await p.waitForTimeout(100);
  const m = await p.evaluate(() => [...document.querySelectorAll('.karte-seite')].map(s => {
    const w = s.querySelector('.study-word').getBoundingClientRect(), k = s.getBoundingClientRect();
    return (w.top + w.bottom) / 2 - k.top;
  }));
  const fehler = p.fehler.slice();
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
