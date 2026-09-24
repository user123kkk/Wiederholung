/* Inventar Teil 2: Blaetter, Rundenende, Einstieg. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const text = p => p.evaluate(() => {
  const out = [];
  const root = document.querySelector('.blatt.offen, .sheet.offen, [role="dialog"]:not([aria-hidden="true"])') || document.getElementById('app');
  root.querySelectorAll('h1,h2,h3,.eyebrow,p,button,.liste-zeile__text,.badge,strong,label,li').forEach(e => {
    const r = e.getBoundingClientRect(); if (!r.width || !r.height) return;
    if (e.closest('[aria-hidden="true"]')) return;
    const t = (e.innerText || '').replace(/\s+/g, ' ').trim(); if (!t || t.length > 160) return;
    if (e.parentElement && e.parentElement.closest('p,button,li,label,h1,h2,h3')) return;
    out.push(e.tagName.toLowerCase() + ': ' + t);
  });
  return out;
});
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800 });
  const zeig = async (n) => { await p.waitForTimeout(700); await foto(p, 'inv2-' + n); console.log('\n=== ' + n); console.log((await text(p)).join('\n')); };
  await aktion(p, 'tab-lernen', null, 800); await aktion(p, 'start-session', null, 800);
  for (let i = 0; i < 14 && await p.$('#app .study-flaeche'); i++) { await p.click('#app .study-flaeche'); await p.waitForTimeout(500); await p.click('#app .btn-known'); await p.waitForTimeout(450); }
  await p.waitForTimeout(1500); await zeig('rundenende');
  await p.context().close();
  const { p: q } = await neueSeite(b, GERAETE.handy, { warte: 1800, user: null });
  for (let s = 0; s < 12; s++) {
    await q.waitForTimeout(2500);
    console.log('\n=== einstieg ' + s); console.log((await text(q)).join('\n'));
    await foto(q, 'inv2-einstieg-' + s);
    const weiter = await q.evaluate(() => {
      const kand = [...document.querySelectorAll('button')].filter(x => x.offsetParent && !x.disabled);
      const w = kand.find(x => /weiter|los|starten|fertig|speichern|verstanden|plan/i.test(x.innerText)) || null;
      if (!w) { const opt = kand.find(x => x.closest('.einstieg-wahl, .einstieg-optionen, [role="radiogroup"], ul')); if (opt) { opt.click(); return 'wahl:' + opt.innerText.trim().slice(0, 30); } return null; }
      w.click(); return w.innerText.trim().slice(0, 30);
    });
    console.log('-> ' + weiter);
    if (!weiter) break;
  }
  await b.close();
})();
