/* Station 16: Querschnitt - offline, Sync-Fehler, Schreibfehler, Meldungen, Dialoge. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
(async () => {
  const b = await start();
  const g = process.argv[2] || 'handy';
  const out = [];
  let { p, ctx } = await neueSeite(b, GERAETE[g], { warte: 1500 });
  const oben = () => p.evaluate(() => { const s = document.querySelector('#app .stapel, #app .card, #app h1'); return s ? Math.round(s.getBoundingClientRect().top) : null; });
  // offline
  const o0 = await oben();
  await ctx.setOffline(true); await p.evaluate(() => window.dispatchEvent(new Event('offline'))); await p.waitForTimeout(700);
  const banner = await p.evaluate(() => { const b = document.querySelector('.banner-info, .banner-leise'); return b ? b.innerText.replace(/\s+/g, ' ') + ' | h ' + Math.round(b.getBoundingClientRect().height) : 'KEIN BANNER'; });
  const o1 = await oben();
  out.push('Offline: ' + banner + ' | Inhalt ' + o0 + ' -> ' + o1 + ' (Sprung ' + (o1 - o0) + ')');
  out.push('  Kontrast ' + (await pruefeKontrast(p, 'offline')).length);
  if (g === 'handy') await foto(p, 'q16-offline');
  await ctx.setOffline(false); await p.evaluate(() => window.dispatchEvent(new Event('online'))); await p.waitForTimeout(700);
  out.push('Wieder online: Banner weg ' + await p.evaluate(() => !document.querySelector('.banner-leise')) + ' | Inhalt ' + await oben());
  // Schreibfehler
  await p.evaluate(() => { window.__FB.fail = true; });
  await aktion(p, 'tab-verwalten', null, 800); await aktion(p, 'karte-neu', null, 700);
  await p.fill('#f-wort', 'تَجْرِبَةٌ'); await p.fill('#f-ueb', 'Test'); await aktion(p, 'submit-card', null, 1200);
  out.push('Schreibfehler Dialog: ' + await p.evaluate(() => { const d = [...document.querySelectorAll('.dlg')].pop(); return d ? d.innerText.replace(/\s+/g, ' ').slice(0, 200) : '–'; }));
  await p.evaluate(() => { const k = [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'OK'); k && k.click(); }); await p.waitForTimeout(500);
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  out.push('  Banner: ' + await p.evaluate(() => { const b = document.querySelector('.banner-fehler'); return b ? b.innerText.replace(/\s+/g, ' ') : '–'; }));
  await p.evaluate(() => { window.__FB.fail = false; });
  // Toast bei offenem Erinnerungsblatt
  await aktion(p, 'einstellungen', null, 700); await aktion(p, 'erinnerung-auf', null, 700);
  await p.evaluate(() => { const k = [...document.querySelectorAll('.dlg button')].find(x => /Übernehmen/.test(x.innerText)); k && k.click(); }); await p.waitForTimeout(600);
  out.push('Toast nach Erinnerung: ' + await p.evaluate(() => { const t = document.querySelector('.toast'); if (!t) return 'kein Toast'; const r = t.getBoundingClientRect(); const d = document.querySelector('.dlg'); const dr = d && d.getBoundingClientRect(); return t.innerText + ' @' + Math.round(r.top) + (dr && r.bottom > dr.top && r.top < dr.bottom ? ' UEBER DEM BLATT' : ''); }));
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  // Dialog-Tastatur: Prompt mit Enter, Fokus zurueck
  await aktion(p, 'tab-verwalten', null, 700); await aktion(p, 'bereich-sheet-auf', null, 600); await aktion(p, 'add-bereich', null, 700);
  const fokus1 = await p.evaluate(() => document.activeElement && document.activeElement.id);
  await p.keyboard.type('Tastatur'); await p.keyboard.press('Enter'); await p.waitForTimeout(800);
  out.push('Prompt: Fokus im Feld ' + fokus1 + ' | Enter legt an: ' + await p.evaluate(() => (document.querySelector('[data-action="bereich-sheet-auf"]') || {}).innerText.trim()));
  // Confirm: Escape = Abbrechen
  await aktion(p, 'bereich-mehr-auf', null, 500); await aktion(p, 'bereich-mehr-umkehren', null, 700).catch(() => {});
  await aktion(p, 'bereich-mehr-auf', null, 500); await aktion(p, 'bereich-mehr-loeschen', null, 700);
  const vorEsc = await p.evaluate(() => !!document.querySelector('.dlg'));
  await p.keyboard.press('Escape'); await p.waitForTimeout(600);
  out.push('Confirm + Escape: war offen ' + vorEsc + ' | zu ' + await p.evaluate(() => !document.querySelector('.dlg')) + ' | Bereich noch da: ' + await p.evaluate(() => (document.querySelector('[data-action="bereich-sheet-auf"]') || {}).innerText.trim()));
  console.log(p.fehler.join('|') || 'ok');
  await ctx.close();
  // Sync-Fehler beim Start (blockierend) und permission-denied
  for (const code of ['unavailable', 'permission-denied']) {
    ({ p, ctx } = await neueSeite(b, GERAETE[g], { warte: 100 }));
    await p.addInitScript(c => { window.__SNAP_FAIL = c; }, code);
    await p.reload(); await p.waitForTimeout(2500);
    out.push('Start mit ' + code + ': ' + await p.evaluate(() => document.getElementById('app').innerText.replace(/\s+/g, ' ').slice(0, 260)) + ' | Knoepfe ' + await p.evaluate(() => [...document.querySelectorAll('#app button')].map(x => x.innerText.trim()).join(', ')));
    if (g === 'handy') await foto(p, 'q16-sync-' + code);
    await ctx.close();
  }
  console.log('== ' + g + '\n  ' + out.join('\n  '));
  await b.close();
})();
