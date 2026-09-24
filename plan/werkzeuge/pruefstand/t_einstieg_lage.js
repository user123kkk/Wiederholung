/* Lage des Weiter-Knopfs je Schritt (soll ueberall gleich sein). */
const { start, neueSeite, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  for (const g of ['handy', 'klein', 'ipad']) {
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1500, user: null });
    const lage = () => p.evaluate(() => { const k = document.querySelector('[data-action="einstieg-weiter"]'); return k ? Math.round(k.getBoundingClientRect().top) : '-'; });
    const kl = async s => { const el = await p.$(s); if (el) { await el.click(); await p.waitForTimeout(900); } };
    const l = [];
    await p.waitForTimeout(1500); l.push(await lage()); await kl('[data-action="einstieg-weiter"]');
    await kl('[data-action="einstieg-ziel"]'); l.push(await lage()); await kl('[data-action="einstieg-weiter"]');
    await kl('[data-action="einstieg-huerde"]'); l.push(await lage()); await kl('[data-action="einstieg-weiter"]');
    await kl('[data-action="einstieg-aufdecken"]'); await kl('[data-action="einstieg-bewerten"][data-id="Sicher"]'); l.push(await lage()); await kl('[data-action="einstieg-weiter"]');
    l.push(await lage()); await kl('[data-action="einstieg-weiter"]');
    l.push(await lage()); await kl('[data-action="einstieg-weiter"]');
    await kl('[data-action="einstieg-anker"]'); l.push(await lage());
    console.log(g, 'Knopf-Lage Schritt 0-6:', l.join(' '), p.fehler.join('|') || 'ok');
    await p.context().close();
  }
  await b.close();
})();
