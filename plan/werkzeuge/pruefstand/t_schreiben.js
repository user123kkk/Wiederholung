/* Station 8 (Rest): Schreiben, Vollbild, Striche, Fertig; fluessig beim Zeichnen. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
(async () => {
  const b = await start();
  for (const g of (process.argv[2] || 'handy,klein,ipad').split(',')) {
    const out = [];
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1800 });
    await aktion(p, 'tab-verwalten', null, 800); await aktion(p, 'open-drill', null, 700);
    await p.evaluate(() => { document.getElementById('drill-handwriting').checked = true; }); await aktion(p, 'start-drill', null, 1000);
    const lage = () => p.evaluate(() => { const r = s => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().top) + ':' + Math.round(e.getBoundingClientRect().left) : null; }; return { canvas: r('#hw-canvas'), loeschen: r('[data-action="hw-clear"]'), vollbild: r('[data-action="hw-fullscreen"]'), fertig: r('.hw-toolbar [data-action="reveal"]'), wort: r('#app .study-word') }; });
    const tinte = () => p.evaluate(() => { const c = document.getElementById('hw-canvas'); const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4 * 7) if (d[i] > 200) n++; return n; });
    const strich = async (dx0 = 40, dy0 = 60, n = 20) => { const r = await (await p.$('#hw-canvas')).boundingBox(); await p.mouse.move(r.x + dx0, r.y + dy0); await p.mouse.down();
      for (let i = 0; i < n; i++) await p.mouse.move(r.x + dx0 + i * 10, r.y + dy0 + Math.sin(i / 2) * 25); await p.mouse.up(); await p.waitForTimeout(400); };
    await p.waitForTimeout(1500);
    const l0 = await lage(); const t0 = await tinte();
    out.push('Start: ' + JSON.stringify(await p.evaluate(() => { const c = document.getElementById('hw-canvas').getBoundingClientRect(); const t = document.querySelector('.hw-toolbar').getBoundingClientRect(); const w = document.querySelector('#app .study-word').getBoundingClientRect();
      return { wortOben: Math.round(w.top), flaeche: Math.round(c.top) + '-' + Math.round(c.bottom), leisteUnten: Math.round(t.bottom), fenster: innerHeight, allesImBild: t.bottom <= innerHeight, scrollbar: document.documentElement.scrollHeight > innerHeight + 1 }; })));
    await strich();
    const l1 = await lage(); const t1 = await tinte();
    out.push('erster Strich: Tinte ' + t0 + ' -> ' + t1 + ' | Lage vorher ' + JSON.stringify(l0) + '\n    nachher ' + JSON.stringify(l1));
    // Vollbild
    await aktion(p, 'hw-fullscreen', null, 700);
    const vb = await p.evaluate(() => { const w = document.querySelector('.hw-canvas-wrap.fullscreen'); const wort = document.querySelector('#app .study-word'); const sichtbar = el => { if (!el) return 'fehlt'; const r = el.getBoundingClientRect(); const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return top && (el.contains(top) || top.contains(el)) ? 'sichtbar' : 'VERDECKT'; };
      const tb = document.querySelector('.hw-toolbar').getBoundingClientRect(); return { vollbild: !!w, vorlage: (document.querySelector('.hw-vorlage') || {}).innerText || 'FEHLT', leisteImBild: tb.bottom <= innerHeight && tb.top >= 0 }; });
    const tv = await tinte();
    out.push('Vollbild: ' + JSON.stringify(vb) + ' | Tinte erhalten: ' + tv);
    if (g === 'handy') await foto(p, 's8-' + g + '-vollbild');
    await strich(80, 200);
    out.push('Strich im Vollbild: Tinte ' + tv + ' -> ' + await tinte());
    await aktion(p, 'hw-undo', null, 500); out.push('Strich zurueck: Tinte ' + await tinte());
    // Fertig im Vollbild
    await p.evaluate(() => document.querySelector('.hw-toolbar [data-action="reveal"]').click()); await p.waitForTimeout(900);
    await aktion(p, 'hw-fullscreen', null, 600);
    out.push('Vollbild nach Aufdecken: ' + JSON.stringify(await p.evaluate(() => (document.querySelector('.hw-vorlage') || {}).innerText)));
    if (g === 'handy') await foto(p, 's8-' + g + '-vergleich');
    await aktion(p, 'hw-fullscreen', null, 600);
    const nach = await p.evaluate(() => { const gr = document.querySelector('#app .grade-row'); const r = gr && gr.getBoundingClientRect(); return { vollbild: !!document.querySelector('.hw-canvas-wrap.fullscreen'), knoepfeImBild: !!r && r.bottom <= innerHeight && r.top >= 0, antwort: (document.querySelector('#app .study-answer') || {}).innerText }; });
    out.push('Fertig: ' + JSON.stringify(nach));
    const k = await pruefeKontrast(p, 'schreiben'); out.push('Kontrast ' + (k.length ? JSON.stringify(k) : 0));
    if (g === 'handy') await foto(p, 's8-' + g + '-fertig');
    // fluessig beim Zeichnen, CPU 4x, mit 25 vorhandenen Strichen
    await p.keyboard.press('3'); await p.waitForTimeout(800);
    const cdp = await p.context().newCDPSession(p);
    for (let i = 0; i < 25; i++) await strich(20 + (i % 5) * 50, 40 + Math.floor(i / 5) * 25, 8);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await p.evaluate(() => { window.__fr = []; let last = performance.now(); const t = x => { window.__fr.push(x - last); last = x; if (window.__fr.length < 400) requestAnimationFrame(t); }; requestAnimationFrame(t); });
    const r = await (await p.$('#hw-canvas')).boundingBox();
    const t = Date.now(); await p.mouse.move(r.x + 30, r.y + 120); await p.mouse.down();
    for (let i = 0; i < 60; i++) { await p.mouse.move(r.x + 30 + i * 4, r.y + 120 + Math.sin(i / 4) * 30); }
    await p.mouse.up(); const dauer = Date.now() - t;
    const fr = await p.evaluate(() => window.__fr.filter(x => x > 34).map(Math.round));
    out.push('Zeichnen (25 Striche da, CPU 4x): 60 Bewegungen in ' + dauer + ' ms | Bilder > 34 ms: ' + fr.length + (fr.length ? ' max ' + Math.max(...fr) : ''));
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    console.log('== ' + g + '\n  ' + out.join('\n  ') + '\n  ' + (p.fehler.join('|') || 'ok'));
    await p.context().close();
  }
  await b.close();
})();
