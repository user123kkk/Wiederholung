/* Inventar Teil 2: sichtbares Rundenende und jeder echte Einstiegsschritt.
   Leere Texte oder ein unvollstaendiger Rundgang sind ein Fehler (G-109). */
const assert = require('node:assert/strict');
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const text = p => p.evaluate(() => {
  const sichtbar = e => {
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && !e.closest('[aria-hidden="true"]');
  };
  const root = [...document.querySelectorAll('.blatt.offen, .sheet.offen, [role="dialog"]')]
    .find(sichtbar) || document.getElementById('app');
  const out = [];
  root.querySelectorAll('h1,h2,h3,.eyebrow,p,button,.liste-zeile__text,.badge,strong,label,li').forEach(e => {
    if (!sichtbar(e)) return;
    const t = (e.innerText || '').replace(/\s+/g, ' ').trim();
    if (!t || t.length > 160) return;
    if (e.parentElement && e.parentElement.closest('p,button,li,label,h1,h2,h3')) return;
    out.push(e.tagName.toLowerCase() + ': ' + t);
  });
  return out;
});
(async () => {
  const b = await start();
  try {
    const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800 });
    const zeig = async (seite, n) => {
      await seite.waitForTimeout(700);
      const inventar = await text(seite);
      assert.ok(inventar.length > 0, 'Leeres sichtbares Inventar: ' + n);
      assert.deepEqual(seite.fehler, []);
      await foto(seite, 'inv2-' + n);
      console.log('\n=== ' + n + '\n' + inventar.join('\n'));
    };
    await aktion(p, 'tab-lernen', null, 800);
    await aktion(p, 'start-session', null, 800);
    for (let i = 0; i < 40 && !(await p.locator('#app .ende').count()); i++) {
      await p.keyboard.press('Space'); await p.waitForTimeout(350);
      await p.keyboard.press('3'); await p.waitForTimeout(450);
    }
    await p.waitForSelector('#app .ende');
    await zeig(p, 'rundenende');
    await p.context().close();
    const { p: q } = await neueSeite(b, GERAETE.handy, { warte: 1800, user: null });
    const klick = async (action, id = null) => {
      const sel = '[data-action="' + action + '"]' + (id === null ? '' : '[data-id="' + id + '"]');
      await q.locator(sel).first().click();
      await q.waitForTimeout(900);
    };
    await q.waitForTimeout(3500); await zeig(q, 'einstieg-0');
    await klick('einstieg-weiter'); await zeig(q, 'einstieg-1');
    await klick('einstieg-ziel'); await klick('einstieg-weiter'); await zeig(q, 'einstieg-2');
    await klick('einstieg-huerde'); await klick('einstieg-weiter'); await zeig(q, 'einstieg-3a');
    await klick('einstieg-aufdecken'); await zeig(q, 'einstieg-3b');
    await klick('einstieg-bewerten', 'Sicher'); await zeig(q, 'einstieg-3c');
    await klick('einstieg-weiter'); await zeig(q, 'einstieg-4');
    await klick('einstieg-schrift'); await klick('einstieg-weiter'); await zeig(q, 'einstieg-5');
    await klick('einstieg-runde'); await klick('einstieg-weiter'); await zeig(q, 'einstieg-6');
    await klick('einstieg-anker'); await klick('einstieg-weiter');
    await q.waitForTimeout(7000);
    await q.locator('[data-action="einstieg-fertig"]').waitFor({ state: 'visible' });
    await zeig(q, 'einstieg-7-fertiger-plan');
    await klick('einstieg-fertig');
    await q.locator('#a-name').waitFor({ state: 'visible' });
    await zeig(q, 'plan-speichern');
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
