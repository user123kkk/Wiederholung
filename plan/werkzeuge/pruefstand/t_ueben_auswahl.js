/* Station 8: Ueben-Auswahl - Speicherkarten-Liste, Schalter "Mit Schreiben" bleibt? */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
(async () => {
  const b = await start();
  for (const g of (process.argv[2] || 'handy,klein,ipad').split(',')) {
    const out = [];
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1800 });
    await aktion(p, 'tab-verwalten', null, 800); await aktion(p, 'open-drill', null, 700);
    const schalter = () => p.evaluate(() => document.getElementById('drill-handwriting').checked);
    const lage = () => p.evaluate(() => { const k = document.querySelector('[data-action="start-drill"]'); return Math.round(k.getBoundingClientRect().top); });
    await p.click('#drill-handwriting'); await p.waitForTimeout(300);
    out.push('Schalter an: ' + await schalter());
    await p.click('.stufe-chip'); await p.waitForTimeout(400);
    out.push('nach Chip: Schalter ' + await schalter());
    const l0 = await lage();
    await p.click('input[name="drill-mode"][value="sets"] + span'); await p.waitForTimeout(500);
    out.push('Reiter Speicherkarten: Schalter ' + await schalter() + ' | Liste: ' + await p.evaluate(() => [...document.querySelectorAll('.drill-set-liste .check-row')].map(e => e.innerText.trim()).join(' | ')) + ' | Zahl ' + await p.evaluate(() => document.querySelector('.drill-zahl').innerText));
    const l1 = await lage();
    await p.click('.drill-set-liste .check-row'); await p.waitForTimeout(400);
    out.push('Satz gewaehlt: Schalter ' + await schalter() + ' | Zahl ' + await p.evaluate(() => document.querySelector('.drill-zahl').innerText) + ' | Start-Knopf ' + l0 + ' -> ' + l1 + ' -> ' + await lage());
    const k = await pruefeKontrast(p, 'auswahl'); out.push('Kontrast ' + (k.length ? JSON.stringify(k) : 0));
    if (g === 'handy') { await p.evaluate(() => document.getElementById('drill-box').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300); await foto(p, 's8-' + g + '-auswahl'); }
    await aktion(p, 'start-drill', null, 1000);
    out.push('Start: Schreiben aktiv ' + await p.evaluate(() => !!document.getElementById('hw-canvas')) + ' | ' + await p.evaluate(() => document.querySelector('.modebar__mitte').innerText.replace(/\s+/g, ' ')));
    console.log('== ' + g + '\n  ' + out.join('\n  ') + '\n  ' + (p.fehler.join('|') || 'ok'));
    await p.context().close();
  }
  await b.close();
})();
