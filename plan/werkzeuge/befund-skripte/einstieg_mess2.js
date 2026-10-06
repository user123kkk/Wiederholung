/* Messungen: (a) Kartensprung S3, (b) CPU 4x Ruckler im Einstieg, (c) reduzierte Bewegung:
   Verzoegerungen ausserhalb des Einstiegs, (d) Nichts-davon-Zeile unter dem Knopf, (e) Tastatur. */
process.env.PRUEF_BILDER = __dirname + '/bilder';
const { start, neueSeite, foto, GERAETE, vollerStore } = require('/home/user/Wiederholung/plan/werkzeuge/pruefstand/lib.js');
const k = async (p, sel, w = 700) => { const el = await p.$(sel); if (!el) { console.log('FEHLT', sel); return; } await el.click(); await p.waitForTimeout(w); };
(async () => {
  const b = await start();
  // (a)+(d)
  for (const g of ['handy', 'klein']) {
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1500, user: null, store: {} });
    await p.waitForTimeout(500);
    await k(p, '[data-action="einstieg-weiter"]', 900);
    await k(p, '[data-action="einstieg-ziel"][data-id="kurs"]'); await k(p, '[data-action="einstieg-weiter"]', 900);
    const nd = await p.evaluate(() => { const o = document.querySelector('[data-action="einstieg-huerde"][data-id="keine"]').getBoundingClientRect(); const kn = document.querySelector('.einstieg-aktion').getBoundingClientRect(); return { keineTop: Math.round(o.top), keineBottom: Math.round(o.bottom), aktionTop: Math.round(kn.top), vh: innerHeight }; });
    console.log(g, 'S2 ohne Wahl: Nichts davon', JSON.stringify(nd));
    await k(p, '[data-action="einstieg-huerde"][data-id="keine"]'); await k(p, '[data-action="einstieg-weiter"]', 900);
    const vor = await p.evaluate(() => Math.round(document.querySelector('.einstieg-probe').getBoundingClientRect().top));
    await k(p, '[data-action="einstieg-aufdecken"]', 900);
    const nach = await p.evaluate(() => Math.round(document.querySelector('.einstieg-probe').getBoundingClientRect().top));
    console.log(g, 'S3 Karte top vor/nach Tipp', vor, nach, 'Sprung', nach - vor);
    await p.context().close();
  }
  // (b) CPU 4x
  {
    const { p } = await neueSeite(b, GERAETE.handy, { warte: 1500, user: null, store: {} });
    const cdp = await p.context().newCDPSession(p);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await p.evaluate(() => {
      window.__lt = []; new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push(Math.round(e.duration)))).observe({ type: 'longtask' });
      window.__fr = []; let last = performance.now(); const tick = t => { window.__fr.push(t - last); last = t; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
    });
    const miss = async (name, fn, w = 1200) => {
      await p.evaluate(() => { window.__lt = []; window.__fr = []; }); await fn(); await p.waitForTimeout(w);
      const r = await p.evaluate(() => ({ lt: window.__lt.slice(), fr: window.__fr.slice() }));
      const lang = r.fr.filter(x => x > 34).map(Math.round);
      console.log('CPU4x', name.padEnd(22), '| Blockade', r.lt.length ? Math.max(...r.lt) + 'ms' : '-', '| Ruckler', lang.length ? lang.length + ' max ' + Math.max(...lang) : 0);
    };
    const t = (a, id) => p.evaluate(([a, id]) => { const el = document.querySelector('[data-action="' + a + '"]' + (id ? '[data-id="' + id + '"]' : '')); el && el.click(); }, [a, id]);
    await miss('S0 Start (Leiste)', async () => {}, 3500);
    await miss('-> S1', () => t('einstieg-weiter'));
    await miss('Ziel waehlen', () => t('einstieg-ziel', 'quran'));
    await miss('-> S2', () => t('einstieg-weiter'));
    await miss('Huerde waehlen', () => t('einstieg-huerde', 'vergessen'));
    await miss('-> S3', () => t('einstieg-weiter'), 3000);
    await miss('Aufdecken', () => t('einstieg-aufdecken'));
    await miss('Sicher', () => t('einstieg-bewerten', 'Sicher'), 1500);
    await miss('-> S4', () => t('einstieg-weiter'));
    await miss('Schrift gross', () => t('einstieg-schrift', 'klein'));
    await miss('-> S5', () => t('einstieg-weiter'));
    await miss('-> S6', () => t('einstieg-weiter'));
    await miss('Anker', () => t('einstieg-anker', 'isha'));
    await miss('-> Bau', () => t('einstieg-weiter'), 6500);
    await miss('Plan (Eintritt)', async () => {}, 2500);
    console.log('fehler', p.fehler.join('|') || 'ok');
    await p.context().close();
  }
  // (c) reduzierte Bewegung ausserhalb des Einstiegs
  {
    const { p } = await neueSeite(b, GERAETE.handy, { warte: 2500, ruhig: true });
    const sicht = async (name) => {
      const r = await p.evaluate(() => [...document.querySelectorAll('#app *')].map(el => ({ el, a: el.getAnimations() }))
        .filter(x => x.a.some(a => (a.effect.getTiming().delay || 0) > 50)).slice(0, 8)
        .map(x => (x.el.className.baseVal !== undefined ? x.el.className.baseVal : x.el.className) + ' delay ' + x.a.map(a => Math.round(a.effect.getTiming().delay)).join('/')));
      console.log('RUHIG', name, r.length ? r.join(' ; ') : 'keine Verzoegerungen');
    };
    const t = (a) => p.evaluate(a => { const el = document.querySelector('[data-action="' + a + '"]'); el && el.click(); }, a);
    await t('tab-fortschritt'); await p.waitForTimeout(30); await sicht('Fortschritt');
    await t('tab-lernen'); await p.waitForTimeout(30); await sicht('Lernen');
    await p.context().close();
  }
  {
    const { p } = await neueSeite(b, GERAETE.handy, { warte: 2500, ruhig: true, store: vollerStore({ leer: true }) });
    await p.waitForTimeout(30);
    const r = await p.evaluate(() => [...document.querySelectorAll('#app *')].filter(el => el.getAnimations().some(a => a.effect.getTiming().delay > 50)).map(el => el.className + ':' + el.getAnimations().map(a => a.effect.getTiming().delay)).slice(0, 6));
    console.log('RUHIG leeres Konto', JSON.stringify(r));
    await p.context().close();
  }
  // (e) Tastatur: Einstieg nur mit Tab/Enter
  {
    const { p } = await neueSeite(b, GERAETE.desktop, { warte: 1500, user: null, store: {} });
    await p.waitForTimeout(500);
    const fokus = () => p.evaluate(() => { const a = document.activeElement; return a ? (a.dataset.action || a.tagName) + (a.dataset.id ? '/' + a.dataset.id : '') : '-'; });
    const tabs = [];
    for (let i = 0; i < 5; i++) { await p.keyboard.press('Tab'); tabs.push(await fokus()); }
    console.log('TAB S0', tabs.join(' > '));
    await p.keyboard.press('Shift+Tab'); await p.keyboard.press('Shift+Tab'); await p.keyboard.press('Shift+Tab');
    await p.focus('[data-action="einstieg-weiter"]'); await p.keyboard.press('Enter'); await p.waitForTimeout(900);
    console.log('nach Enter:', await p.evaluate(() => document.querySelector('#app h1').textContent), 'Fokus', await fokus());
    const t2 = []; for (let i = 0; i < 4; i++) { await p.keyboard.press('Tab'); t2.push(await fokus()); }
    console.log('TAB S1', t2.join(' > '));
    await p.keyboard.press('Escape'); await p.waitForTimeout(400);
    console.log('Escape S1 ->', await p.evaluate(() => document.querySelector('#app h1').textContent));
    await p.context().close();
  }
  await b.close();
})();
