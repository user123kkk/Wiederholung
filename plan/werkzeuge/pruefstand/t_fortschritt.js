/* Station 9: Fortschritt - Kennzahlen, Zustaende, Kalender, Vorschau, schwierige Karten. */
const { start, neueSeite, aktion, foto, GERAETE, vollerStore, tag } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
(async () => {
  const b = await start();
  const eine = vollerStore({ leer: true });
  eine['users/u1/karten/k0'] = { wort: 'كِتَابٌ', uebersetzung: 'Buch', extra: '', stufe: 1, nextReview: tag(1), ersteBewertung: tag(0), rueckfaelle: 0, quelleId: null, maxStufe: 1, order: 0, bereichId: 'b1' };
  eine['users/u1'].verlauf = { [tag(0)]: { w: 0, n: 1 } };
  const faelle = { voll: vollerStore(), leer: vollerStore({ leer: true }), eine };
  for (const g of (process.argv[2] || 'handy,klein,ipad').split(',')) {
    for (const thema of (g === 'handy' ? ['dunkel', 'hell'] : ['dunkel'])) {
      for (const [name, store] of Object.entries(faelle)) {
        const st = JSON.parse(JSON.stringify(store)); st['users/u1'].settings.thema = thema;
        const { p } = await neueSeite(b, GERAETE[g], { warte: 1500, store: st, ls: thema === 'hell' ? { 'adrabic-thema': 'hell' } : {} });
        await p.evaluate(() => { window.__cls = []; new PerformanceObserver(l => l.getEntries().forEach(e => { if (!e.hadRecentInput) window.__cls.push([e.value, (e.sources || []).map(s => s.node && s.node.className).join('/')]); })).observe({ type: 'layout-shift' }); });
        await aktion(p, 'tab-fortschritt', null, 2200);
        const cls = await p.evaluate(() => window.__cls);
        const inhalt = await p.evaluate(() => document.querySelector('#app .view').innerText.replace(/\s+/g, ' ').trim().slice(0, 700));
        const k = await pruefeKontrast(p, name); const quer = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
        await foto(p, 'f9-' + g + '-' + thema + '-' + name, true);
        console.log(g, thema, name, '| CLS', cls.reduce((a, x) => a + x[0], 0).toFixed(4), cls.length ? JSON.stringify(cls.slice(0, 3)) : '', '| Kontrast', k.length ? JSON.stringify(k.map(f => f.text + ' ' + f.kontrast)) : 0, '| quer', quer, '|', p.fehler.join('|') || 'ok');
        if (g === 'handy' && thema === 'dunkel') console.log('   ', inhalt);
        if (name === 'voll') {
          for (const seite of ['lektionen', 'leeches', 'vorschau']) {
            const da = await p.$('[data-action="fort-seite"][data-id="' + seite + '"]');
            if (!da) { console.log('    Seite', seite, 'FEHLT'); continue; }
            await da.click(); await p.waitForTimeout(900);
            const t = await p.evaluate(() => document.querySelector('#app .view').innerText.replace(/\s+/g, ' ').trim().slice(0, 300));
            const k2 = await pruefeKontrast(p, seite);
            const zurueck = await p.evaluate(() => { const z = document.querySelector('[data-action="seite-zu"], [data-action="fort-zurueck"], .seitenkopf button, .appbar [data-action*="zurueck"]'); return z ? z.dataset.action : null; });
            if (g === 'handy' && thema === 'dunkel') { console.log('    Seite', seite, '| zurueck:', zurueck, '| Kontrast', k2.length ? JSON.stringify(k2.map(f => f.text + ' ' + f.kontrast + ' ' + f.klasse)) : 0, '|', t); await foto(p, 'f9-' + g + '-seite-' + seite, true); }
            if (zurueck) { await aktion(p, zurueck, null, 700); } else { await p.keyboard.press('Escape'); await p.waitForTimeout(700); }
          }
        }
        await p.context().close();
      }
    }
  }
  await b.close();
})();
