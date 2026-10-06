const P='/home/user/Wiederholung/plan/werkzeuge/pruefstand/';
const { start, neueSeite, aktion, GERAETE } = require(P+'lib');
(async () => {
  const b = await start();
  const { p, ctx } = await neueSeite(b, GERAETE.desktop, { warte: 1800 });
  const wo = () => p.evaluate(() => { const a = document.activeElement; return a === document.body ? 'body' : (a.dataset.action || a.id || a.tagName) + (a.dataset.id ? '/' + a.dataset.id : ''); });
  const perTaste = async (act, id) => { await p.evaluate(([a, id]) => { const el = [...document.querySelectorAll('[data-action="' + a + '"]')].find(e => e.offsetParent && (id == null || e.dataset.id === id)); el.focus(); }, [act, id]); const vor = await wo(); await p.keyboard.press('Enter'); await p.waitForTimeout(800); const drin = await wo(); await p.keyboard.press('Escape'); await p.waitForTimeout(600); console.log(act, 'vorher', vor, '| offen', drin, '| nach Escape', await wo()); };
  await aktion(p, 'tab-verwalten', null, 900);
  await perTaste('karte-neu');
  await aktion(p, 'einstellungen', null, 900);
  await perTaste('wahl-sheet', 'arab');
  await perTaste('open-error-modal');
  await perTaste('logout');
  await ctx.close(); await b.close();
})();
