/* Station 7: Rundenende - Bilanz, Serie, naechster Schritt. */
const { start, neueSeite, aktion, foto, GERAETE, vollerStore, tag } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
async function runde(p, taste = '3', max = 40) {
  for (let i = 0; i < max; i++) {
    if (await p.evaluate(() => !!document.querySelector('#app .ende'))) return true;
    await p.keyboard.press('Space'); await p.waitForTimeout(350);
    await p.keyboard.press(taste); await p.waitForTimeout(450);
  }
  return p.evaluate(() => !!document.querySelector('#app .ende'));
}
const text = p => p.evaluate(() => { const e = document.querySelector('#app .ende'); return e ? e.innerText.replace(/\s+/g, ' ').trim() : null; });
(async () => {
  const b = await start();
  for (const g of (process.argv[2] || 'handy,klein,ipad').split(',')) {
    const out = [];
    // a) normale Runde
    let { p } = await neueSeite(b, GERAETE[g], { warte: 1500 });
    await p.evaluate(() => { window.__vib = 0; navigator.vibrate = () => { window.__vib++; return true; }; });
    await aktion(p, 'start-session', null, 900);
    await runde(p);
    await p.evaluate(() => { window.__cls = []; new PerformanceObserver(l => l.getEntries().forEach(e => window.__cls.push(e.value))).observe({ type: 'layout-shift', buffered: true }); });
    await p.waitForTimeout(1600);
    out.push('normal: ' + await text(p));
    const knopf = async () => p.evaluate(() => { const k = document.querySelector('#app .ende [data-action="end-session"]'); const r = k.getBoundingClientRect(); return Math.round(r.top) + '/' + Math.round(r.bottom) + ' von ' + innerHeight; });
    out.push('  Fertig-Knopf ' + await knopf() + ' | Kontrast ' + (await pruefeKontrast(p, 'ende')).length + ' | quer ' + await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1));
    if (g === 'handy') await foto(p, 'e7-' + g + '-normal');
    // Rueckgaengig vom Ende
    const vib1 = await p.evaluate(() => window.__vib);
    await aktion(p, 'undo-grade', null, 900);
    const zurueck = await p.evaluate(() => !!document.querySelector('#app .grade-row'));
    await p.keyboard.press('3'); await p.waitForTimeout(1000);
    out.push('  Rueckgaengig am Ende -> Karte offen: ' + zurueck + ' | wieder am Ende: ' + !!(await text(p)) + ' | Vibration neu: ' + ((await p.evaluate(() => window.__vib)) - vib1));
    await aktion(p, 'end-session', null, 900);
    out.push('  Fertig -> ' + await p.evaluate(() => (document.querySelector('#app .stapel__titel') || document.querySelector('#app h1, #app h2') || {}).innerText));
    await p.context().close();
    // b) Rundenlimit 5
    const st = vollerStore(); st['users/u1'].settings.sitzungsLimit = 10;
    ({ p } = await neueSeite(b, GERAETE[g], { warte: 1500, store: st }));
    await aktion(p, 'start-session', null, 900); await runde(p); await p.waitForTimeout(900);
    out.push('Limit 10: ' + await text(p) + ' | noch faellig laut Lernen: ' + await p.evaluate(() => { const k = document.querySelector('#app .ende [data-action="start-session"]'); return k ? 'Knopf "' + k.innerText.trim() + '"' : 'kein Weiter-Knopf'; }));
    if (g === 'handy') await foto(p, 'e7-' + g + '-limit');
    const xOben = await p.evaluate(() => !!document.querySelector('.modebar [data-action="end-session"]'));
    await aktion(p, 'start-session', null, 900);
    const zweite = await p.evaluate(() => (document.querySelector('.modebar__mitte') || {}).innerText);
    await runde(p); await p.waitForTimeout(900);
    out.push('  X oben am Ende: ' + xOben + ' | Weiterlernen -> ' + JSON.stringify(zweite) + ' -> Ende: ' + await text(p));
    await p.context().close();
    // c) Ueben
    ({ p } = await neueSeite(b, GERAETE[g], { warte: 1500 }));
    await aktion(p, 'tab-lernen', null, 300);
    const erledigt = vollerStore();
    await p.context().close();
    for (const [k, v] of Object.entries(erledigt)) if (k.includes('/karten/') && v.nextReview <= tag(0)) { v.nextReview = tag(2); if (v.ersteBewertung === null) v.ersteBewertung = tag(0); }
    erledigt['users/u1'].verlauf[tag(0)] = { w: 8, n: 4 };
    ({ p } = await neueSeite(b, GERAETE[g], { warte: 1500, store: erledigt }));
    await aktion(p, 'trotzdem-ueben', null, 900);
    const wahl = await p.$('#app [data-action^="drill-start"], #app [data-action="ueben-start"], #app .drill-start');
    const aktionen = await p.evaluate(() => [...document.querySelectorAll('#app [data-action]')].map(e => e.dataset.action).filter((x, i, a) => a.indexOf(x) === i).join(','));
    out.push('Ueben-Auswahl Aktionen: ' + aktionen);
    await p.context().close();
    console.log('== ' + g + '\n  ' + out.join('\n  '));
  }
  await b.close();
})();
