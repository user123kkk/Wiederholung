/* Station 12: Bereiche - anlegen, wechseln, umbenennen, loeschen. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
async function dialog(p, text, knopf) {
  await p.waitForTimeout(400);
  if (text !== null) { const i = await p.$('#dlg-input'); if (i) await i.fill(text); }
  await p.evaluate(k => { const b = [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === k); if (b) b.click(); }, knopf);
  await p.waitForTimeout(700);
}
(async () => {
  const b = await start();
  for (const g of (process.argv[2] || 'handy,klein,ipad').split(',')) {
    const out = [];
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1500 });
    let downloads = 0; p.on('download', () => downloads++);
    const kopf = () => p.evaluate(() => (document.querySelector('[data-action="bereich-sheet-auf"]') || {}).innerText.trim());
    const blatt = () => p.evaluate(() => { const d = [...document.querySelectorAll('.dlg')].pop(); return d ? d.innerText.replace(/\s+/g, ' ').slice(0, 220) : '–'; });
    await aktion(p, 'tab-verwalten', null, 1200);
    await aktion(p, 'bereich-sheet-auf', null, 700);
    out.push('Blatt: ' + await blatt());
    const k = await pruefeKontrast(p, 'bereiche'); out.push('  Kontrast ' + (k.length ? JSON.stringify(k.map(f => f.text + ' ' + f.kontrast)) : 0));
    if (g === 'handy') await foto(p, 'b12-blatt');
    await p.keyboard.press('Escape'); await p.waitForTimeout(500);
    // Zustand vor dem Anlegen: Suche + Auswahl
    await p.fill('#f-search', 'Bu'); await p.waitForTimeout(500);
    await aktion(p, 'bereich-mehr-auf', null, 500); await aktion(p, 'bereich-mehr-auswaehlen', null, 700);
    await aktion(p, 'bereich-sheet-auf', null, 600); await aktion(p, 'add-bereich', null, 600);
    await dialog(p, 'Test-Bereich', 'Anlegen');
    out.push('Anlegen: Kopf "' + await kopf() + '" | Blatt zu ' + await p.evaluate(() => !document.querySelector('.dlg')) + ' | Suche "' + await p.evaluate(() => (document.getElementById('f-search') || {}).value) + '" | Auswahlmodus ' + await p.evaluate(() => !!document.querySelector('.select-actionbar')) + ' | Inhalt: ' + await p.evaluate(() => document.querySelector('#app .view').innerText.replace(/\s+/g, ' ').slice(0, 120)));
    // gleichen Namen nochmal anlegen
    await aktion(p, 'bereich-sheet-auf', null, 600); await aktion(p, 'add-bereich', null, 600);
    await dialog(p, 'Medina Buch 1', 'Anlegen');
    out.push('Name existiert: Kopf "' + await kopf() + '" | Rueckmeldung: ' + await p.evaluate(() => { const t = document.querySelector('.toast'); return t ? t.innerText : 'keine'; }));
    // Bereichsliste: leerer Bereich
    await aktion(p, 'bereich-sheet-auf', null, 600);
    out.push('Blatt mit leerem Bereich: ' + await blatt());
    await p.evaluate(() => [...document.querySelectorAll('[data-action="select-bereich"]')].find(x => x.innerText.includes('Test-Bereich')).click()); await p.waitForTimeout(700);
    // Umbenennen auf vorhandenen Namen, dann richtig
    await aktion(p, 'bereich-mehr-auf', null, 500); out.push('Mehr (leerer Bereich): ' + await blatt());
    await aktion(p, 'bereich-mehr-umbenennen', null, 500); await dialog(p, 'Quran-Wörter', 'Speichern');
    out.push('Umbenennen auf vorhandenen: ' + await blatt()); await dialog(p, null, 'OK'); await p.keyboard.press('Escape'); await p.waitForTimeout(400);
    await aktion(p, 'bereich-mehr-auf', null, 500); await aktion(p, 'bereich-mehr-umbenennen', null, 500); await dialog(p, 'Neuer Name', 'Speichern');
    out.push('Umbenannt: Kopf "' + await kopf() + '"');
    // leeren Bereich loeschen
    const d0 = downloads;
    await aktion(p, 'bereich-mehr-auf', null, 500); await aktion(p, 'bereich-mehr-loeschen', null, 700);
    out.push('Loeschen (leer): Downloads +' + (downloads - d0) + ' | ' + await blatt());
    if (g === 'handy') await foto(p, 'b12-loeschen-leer');
    const hatFeld = await p.$('#dlg-input');
    await dialog(p, hatFeld ? 'Neuer Name' : null, hatFeld ? 'Endgültig löschen' : 'Löschen');
    out.push('  danach Kopf "' + await kopf() + '" | Bereiche: ' + await p.evaluate(() => [...window.__FB.store.keys()].filter(k => /^users\/u1\/bereiche\/[^/]+$/.test(k)).length));
    // letzter Bereich: vorher zwei loeschen (Quran-Woerter leer)
    await aktion(p, 'bereich-sheet-auf', null, 600);
    await p.evaluate(() => [...document.querySelectorAll('[data-action="select-bereich"]')].find(x => x.innerText.includes('Quran')).click()); await p.waitForTimeout(700);
    await aktion(p, 'bereich-mehr-auf', null, 500); await aktion(p, 'bereich-mehr-loeschen', null, 700);
    const hf2 = await p.$('#dlg-input'); await dialog(p, hf2 ? 'Quran-Wörter' : null, hf2 ? 'Endgültig löschen' : 'Löschen');
    await aktion(p, 'bereich-mehr-auf', null, 600);
    out.push('Letzter Bereich, Mehr: ' + await blatt());
    await aktion(p, 'bereich-mehr-loeschen', null, 700).catch(() => {});
    out.push('  Tipp auf Loeschen: ' + await blatt());
    console.log('== ' + g + '\n  ' + out.join('\n  ') + '\n  ' + (p.fehler.join('|') || 'ok'));
    await p.context().close();
  }
  await b.close();
})();
