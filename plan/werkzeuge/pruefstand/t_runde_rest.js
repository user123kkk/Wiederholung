/* Station 6 (Rest): Wischen, Rueckgaengig, Notiz, Merken, Tastatur. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
(async () => {
  const b = await start();
  for (const g of (process.argv[2] || 'handy,klein,ipad').split(',')) {
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1500 });
    const stand = () => p.evaluate(() => { const s = window.__dbg ? null : null; const m = document.querySelector('.modebar'); return m ? m.innerText.replace(/\s+/g, ' ').trim() : ''; });
    const lage = () => p.evaluate(() => { const r = sel => { const e = document.querySelector(sel); return e ? Math.round(e.getBoundingClientRect().top) : null; }; return { karte: r('#app .study-flaeche'), knoepfe: r('#app .grade-row'), neben: r('#app .study-nebenaktionen') }; });
    const diff = (a, c) => Object.keys(a).map(k => k + ' ' + ((c[k] ?? 0) - (a[k] ?? 0))).join(', ');
    const zeile = [];
    await aktion(p, 'start-session', null, 900);
    const erst = await stand();
    // Tastatur: Leertaste deckt auf, 3 bewertet
    await p.keyboard.press('Space'); await p.waitForTimeout(700);
    const offen1 = await p.evaluate(() => !!document.querySelector('#app .grade-row'));
    await p.keyboard.press('3'); await p.waitForTimeout(900);
    const nach3 = await stand();
    zeile.push('Tastatur: Leertaste deckt auf ' + offen1 + ', "3" -> ' + JSON.stringify(erst) + ' => ' + JSON.stringify(nach3));
    // Wischen rechts
    await p.keyboard.press('Space'); await p.waitForTimeout(700);
    const wisch = async (dx, dy) => { const k = await p.$('#app .study-flaeche'); const r = await k.boundingBox(); const x = r.x + r.width / 2, y = r.y + r.height / 2;
      await p.mouse.move(x, y); await p.mouse.down(); await p.mouse.move(x + dx, y + dy, { steps: 12 }); await p.mouse.up(); await p.waitForTimeout(900); };
    let v = await stand(); await wisch(160, 5); let n = await stand();
    zeile.push('Wisch rechts: ' + (v !== n ? 'bewertet' : 'NICHTS') + ' (' + v + ' -> ' + n + ')');
    await p.keyboard.press('Space'); await p.waitForTimeout(700);
    v = await stand(); await wisch(40, 0); n = await stand();
    const zurueck = await p.evaluate(() => getComputedStyle(document.querySelector('#app .study-flaeche')).transform);
    zeile.push('kurzer Wisch: ' + (v === n ? 'keine Bewertung' : 'BEWERTET') + ', Karte zurueck: ' + zurueck);
    v = await stand(); await wisch(5, 160); n = await stand();
    zeile.push('senkrecht: ' + (v === n ? 'nichts' : 'BEWERTET'));
    const offen = () => p.evaluate(() => !!document.querySelector('#app .grade-row'));
    v = await offen(); await wisch(-160, 0); n = await offen();
    zeile.push('Wisch links: ' + (v && !n ? 'bewertet (naechste Karte zugedeckt)' : 'NICHTS'));
    // Rueckgaengig
    const vorUndo = await stand();
    const l0 = await lage();
    await aktion(p, 'undo-grade', null, 900);
    const nachUndo = await stand(); const l1 = await lage();
    zeile.push('Rueckgaengig: ' + JSON.stringify(vorUndo) + ' -> ' + JSON.stringify(nachUndo) + ' | offen: ' + await p.evaluate(() => !!document.querySelector('#app .grade-row')));
    // Karte mit Notiz suchen
    let notiz = false;
    for (let i = 0; i < 14 && !notiz; i++) {
      if (!await p.evaluate(() => !!document.querySelector('#app .grade-row'))) { await p.keyboard.press('Space'); await p.waitForTimeout(700); }
      notiz = await p.evaluate(() => !!document.querySelector('#app [data-action="toggle-extra"]'));
      if (!notiz) { await p.keyboard.press('2'); await p.waitForTimeout(800); }
    }
    if (notiz) {
      const a = await lage(); const offenVor = await p.evaluate(() => !!document.querySelector('#app .study-extra'));
      await aktion(p, 'toggle-extra', null, 600); const b1 = await lage();
      await aktion(p, 'toggle-extra', null, 600); const c1 = await lage();
      zeile.push('Notiz: offen beim Aufdecken ' + offenVor + ' | verbergen: ' + diff(a, b1) + ' | zeigen: ' + diff(a, c1));
      if (g === 'handy') await foto(p, 'r6-' + g + '-notiz');
      // Notiz-Karte bewerten, dann rueckgaengig: ist die Notiz wieder offen?
      await p.keyboard.press('2'); await p.waitForTimeout(800);
      await aktion(p, 'undo-grade', null, 900);
      const offenNachUndo = await p.evaluate(() => !!document.querySelector('#app .study-extra'));
      const knopf = await p.evaluate(() => (document.querySelector('#app [data-action="toggle-extra"]') || {}).innerText);
      zeile.push('Notiz nach Rueckgaengig offen: ' + offenNachUndo + ' (Knopf "' + knopf + '")');
    } else zeile.push('Notiz: keine Karte mit Notiz gefunden');
    // Merken
    const m0 = await lage(); const bm0 = await p.evaluate(() => { const k = document.querySelector('#app [data-action="karte-merken"]'); return k ? Math.round(k.getBoundingClientRect().left) + '/' + Math.round(k.getBoundingClientRect().width) : null; });
    await aktion(p, 'karte-merken', await p.evaluate(() => document.querySelector('#app [data-action="karte-merken"]').dataset.id), 800);
    const m1 = await lage(); const bm1 = await p.evaluate(() => { const k = document.querySelector('#app [data-action="karte-merken"]'); return k ? Math.round(k.getBoundingClientRect().left) + '/' + Math.round(k.getBoundingClientRect().width) + ' ' + k.innerText.trim() : null; });
    const toast = await p.evaluate(() => [...document.querySelectorAll('.toast, [role="status"]')].map(e => e.innerText.trim()).filter(Boolean).join(' / '));
    zeile.push('Merken: ' + diff(m0, m1) + ' | Knopf links/breite ' + bm0 + ' -> ' + bm1 + ' | Meldung: ' + JSON.stringify(toast));
    if (g === 'handy') await foto(p, 'r6-' + g + '-gemerkt');
    // Tastatur-Bedienung: Fokus auf "Rueckgaengig"/Schliessen, Enter
    await p.keyboard.press('2'); await p.waitForTimeout(800);
    const vorEnter = await stand();
    await p.evaluate(() => { const k = document.querySelector('[data-action="undo-grade"]'); if (k) k.focus(); });
    const fokus = await p.evaluate(() => document.activeElement && document.activeElement.dataset.action);
    await p.keyboard.press('Enter'); await p.waitForTimeout(800);
    const nachEnter = await stand();
    zeile.push('Enter auf fokussiertem "' + fokus + '": ' + (vorEnter !== nachEnter ? 'wirkt' : 'WIRKT NICHT') + ' (' + vorEnter + ' -> ' + nachEnter + ')');
    // Taste bei offenem Dialog?
    if (!await p.evaluate(() => !!document.querySelector('#app .grade-row'))) { await p.keyboard.press('Space'); await p.waitForTimeout(700); }
    const vd = await stand();
    await p.evaluate(() => { const d = document.createElement('div'); d.className = 'dlg'; d.id = 'testdlg'; document.body.appendChild(d); });
    await p.keyboard.press('3'); await p.waitForTimeout(600);
    const nd = await stand();
    await p.evaluate(() => document.getElementById('testdlg').remove());
    zeile.push('"3" bei offenem Dialog: ' + (vd === nd ? 'nichts (richtig)' : 'BEWERTET DAHINTER'));
    const zuLabel = await p.evaluate(() => { const k = document.querySelector('.modebar [data-action="end-session"]'); return k ? k.getAttribute('aria-label') : null; });
    zeile.push('Schliessen-Knopf heisst: ' + JSON.stringify(zuLabel));
    const funde = await pruefeKontrast(p, 'runde');
    console.log('== ' + g + '\n  ' + zeile.join('\n  ') + '\n  Kontrast ' + (funde.length ? JSON.stringify(funde) : 0) + ' | ' + (p.fehler.join('|') || 'ok'));
    await p.context().close();
  }
  await b.close();
})();
