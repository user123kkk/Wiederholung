/* Station 13: Kartensaetze & Daten - Code teilen/einloesen, Sichern, Einspielen. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
const fs = require('fs'); const path = require('path');
(async () => {
  const b = await start();
  for (const g of (process.argv[2] || 'handy,klein,ipad').split(',')) {
    const out = [];
    const { p, ctx } = await neueSeite(b, GERAETE[g], { warte: 1500 });
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
    const blatt = () => p.evaluate(() => { const d = [...document.querySelectorAll('.dlg')].pop(); return d ? d.innerText.replace(/\s+/g, ' ').slice(0, 200) : '–'; });
    const knopf = t => p.evaluate(t => { const k = [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === t); if (k) { k.click(); return true; } return false; }, t);
    const bereiche = () => p.evaluate(() => [...window.__FB.store.keys()].filter(k => /^users\/u1\/bereiche\/[^/]+$/.test(k)).length);
    await aktion(p, 'einstellungen', null, 900);
    await aktion(p, 'einst-seite', 'kartensaetze', 900);
    out.push('Seite Kartensaetze: ' + await p.evaluate(() => document.querySelector('#app .view').innerText.replace(/\s+/g, ' ').slice(0, 260)));
    let k = await pruefeKontrast(p, 'ks'); out.push('  Kontrast ' + (k.length ? JSON.stringify(k.map(f => f.text + ' ' + f.kontrast)) : 0));
    if (g === 'handy') await foto(p, 'd13-kartensaetze');
    // Code erzeugen
    await aktion(p, 'teile-lektion-code-lehrer', null, 700);
    out.push('Erzeugen fragt: ' + await blatt());
    await knopf((await p.evaluate(() => [...document.querySelectorAll('.dlg button')].map(x => x.innerText.trim()).pop()))); await p.waitForTimeout(900);
    const code = await p.evaluate(() => ui_code = (window.__FB && [...window.__FB.store.keys()].find(k => k.startsWith('geteilteLektionen/')) || '').split('/')[1]);
    out.push('Code-Dialog: ' + await blatt() + ' | Code im Store ' + code);
    const groesse = await p.evaluate(() => { const c = document.querySelector('.teil-code'); return c ? getComputedStyle(c).fontSize : null; });
    k = await pruefeKontrast(p, 'code'); out.push('  Schrift ' + groesse + ' | Kontrast ' + (k.length ? JSON.stringify(k.map(f => f.text + ' ' + f.kontrast)) : 0));
    if (g === 'handy') await foto(p, 'd13-code');
    await knopf('Kopieren'); await p.waitForTimeout(300);
    out.push('  Kopieren: Knopf "' + await p.evaluate(() => (document.querySelector('[data-action="code-copy-clipboard"]') || {}).innerText) + '" | Zwischenablage "' + await p.evaluate(() => navigator.clipboard.readText().catch(() => '?')) + '"');
    await knopf('Fertig'); await p.waitForTimeout(600);
    // Einloesen: mit Leerzeichen, klein
    const n0 = await bereiche();
    await aktion(p, 'code-einloesen-start', null, 700);
    await p.fill('#dlg-input', code.slice(0, 5).toLowerCase() + ' ' + code.slice(5).toLowerCase()); await knopf((await p.evaluate(() => [...document.querySelectorAll('.dlg button')].map(x => x.innerText.trim()).pop()))); await p.waitForTimeout(900);
    out.push('Einloesen "' + code.slice(0, 5).toLowerCase() + ' ' + code.slice(5).toLowerCase() + '": ' + await blatt());
    await knopf((await p.evaluate(() => [...document.querySelectorAll('.dlg button')].map(x => x.innerText.trim()).pop()))); await p.waitForTimeout(1200);
    out.push('  Bereiche ' + n0 + ' -> ' + await bereiche() + ' | danach: ' + await p.evaluate(() => document.querySelector('#app .view').innerText.replace(/\s+/g, ' ').slice(0, 100)) + ' | Dialog: ' + await blatt());
    await p.keyboard.press('Escape'); await p.waitForTimeout(400);
    // falscher Code
    await aktion(p, 'einstellungen', null, 700); await aktion(p, 'einst-seite', 'kartensaetze', 700);
    await aktion(p, 'code-einloesen-start', null, 700); await p.fill('#dlg-input', 'ZZZZZ ZZZZZ'); await knopf((await p.evaluate(() => [...document.querySelectorAll('.dlg button')].map(x => x.innerText.trim()).pop()))); await p.waitForTimeout(900);
    out.push('Falscher Code: ' + await blatt()); await knopf('OK'); await p.waitForTimeout(400);
    // offline
    await p.evaluate(() => { window.__FB.failGet = true; });
    await aktion(p, 'code-einloesen-start', null, 700); await p.fill('#dlg-input', code); await knopf((await p.evaluate(() => [...document.querySelectorAll('.dlg button')].map(x => x.innerText.trim()).pop()))); await p.waitForTimeout(900);
    out.push('Offline: ' + await blatt()); await knopf('OK'); await p.waitForTimeout(400);
    await p.evaluate(() => { window.__FB.failGet = false; });
    // Sichern & einspielen
    await aktion(p, 'einstellungen', null, 700);
    out.push('Zeile Sichern vorher: ' + await p.evaluate(() => { const z = document.querySelector('[data-action="einst-seite"][data-id="daten"]'); return z ? z.innerText.replace(/\s+/g, ' ') : null; }));
    await aktion(p, 'einst-seite', 'daten', 800);
    out.push('Seite Daten: ' + await p.evaluate(() => document.querySelector('#app .view').innerText.replace(/\s+/g, ' ').slice(0, 300)));
    k = await pruefeKontrast(p, 'daten'); out.push('  Kontrast ' + (k.length ? JSON.stringify(k.map(f => f.text + ' ' + f.kontrast)) : 0));
    if (g === 'handy') await foto(p, 'd13-daten');
    const [dl] = await Promise.all([p.waitForEvent('download', { timeout: 5000 }).catch(() => null), aktion(p, 'export-backup', null, 800)]);
    let datei = null;
    if (dl) { datei = path.join(require('os').tmpdir(), 'adrabic-test-backup.json'); await dl.saveAs(datei); }
    out.push('Alles sichern: Download ' + (dl ? dl.suggestedFilename() + ' ' + fs.statSync(datei).size + ' B' : 'KEINER') + ' | Banner: ' + await p.evaluate(() => (document.querySelector('#app .banner-info .banner__text') || {}).innerText));
    // Einspielen derselben Datei
    if (datei) {
      await p.setInputFiles('#import-file-input', datei); await p.waitForTimeout(1200);
      out.push('Einspielen (eigenes Backup): ' + await blatt());
      await knopf((await p.evaluate(() => [...document.querySelectorAll('.dlg button')].map(x => x.innerText.trim()).pop()))); await p.waitForTimeout(1500);
      out.push('  danach: ' + await blatt() + ' | Bereiche ' + await bereiche());
      await p.keyboard.press('Escape'); await p.waitForTimeout(400);
    }
    // kaputte Datei
    const kaputt = path.join(require('os').tmpdir(), 'kaputt.json'); fs.writeFileSync(kaputt, '{nicht json');
    await p.setInputFiles('#import-file-input', kaputt); await p.waitForTimeout(900);
    out.push('Kaputte Datei: ' + await blatt());
    console.log('== ' + g + '\n  ' + out.join('\n  ') + '\n  ' + (p.fehler.join('|') || 'ok'));
    await p.context().close();
  }
  await b.close();
})();
