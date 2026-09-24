/* Station 10: Verwalten - Liste, Suche, Auswahl, Sortieren, Speicherkarten. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
(async () => {
  const b = await start();
  for (const g of (process.argv[2] || 'handy,klein,ipad').split(',')) {
    for (const thema of (g === 'handy' ? ['dunkel', 'hell'] : ['dunkel'])) {
      const out = [];
      const { p } = await neueSeite(b, GERAETE[g], { warte: 1500, ls: thema === 'hell' ? { 'adrabic-thema': 'hell' } : {}, thema });
      await aktion(p, 'tab-verwalten', null, 1600);
      const k0 = await pruefeKontrast(p, 'verwalten');
      out.push('Liste: Kontrast ' + (k0.length ? JSON.stringify(k0.map(f => f.text + ' ' + f.kontrast + ' ' + f.klasse)) : 0) + ' | quer ' + await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1));
      if (g === 'handy') await foto(p, 'v10-' + thema + '-liste');
      if (thema === 'hell') { console.log('== ' + g + ' ' + thema + '\n  ' + out.join('\n  ')); await p.context().close(); continue; }
      // Suche: Zeichen fuer Zeichen
      await p.click('#f-search');
      const tipp = [];
      for (const ch of 'Stu') {
        await p.keyboard.type(ch); await p.waitForTimeout(60);
        tipp.push(await p.evaluate(() => ({ anim: document.getAnimations().filter(a => a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest('#karten-liste')).length,
          fokus: document.activeElement && document.activeElement.id, wert: document.getElementById('f-search').value, treffer: document.querySelectorAll('#karten-liste > .card-row').length })));
      }
      out.push('Suche je Taste: ' + tipp.map(t => '"' + t.wert + '" ' + t.treffer + ' Zeilen, ' + t.anim + ' Animationen, Fokus ' + t.fokus).join(' | '));
      await p.waitForTimeout(500);
      out.push('  Hinweis: ' + await p.evaluate(() => (document.querySelector('#karten-liste .liste-hinweis') || {}).innerText));
      await p.fill('#f-search', 'xyzq'); await p.waitForTimeout(500);
      out.push('Keine Treffer: ' + await p.evaluate(() => (document.querySelector('#karten-liste .empty') || {}).innerText.replace(/\s+/g, ' ')));
      await aktion(p, 'search-clear', null, 600);
      out.push('Suche leeren -> ' + await p.evaluate(() => document.querySelectorAll('#karten-liste > .card-row').length + ' Zeilen, Feld "' + document.getElementById('f-search').value + '"'));
      // Auswahl
      await aktion(p, 'bereich-mehr-auf', null, 600); await aktion(p, 'bereich-mehr-auswaehlen', null, 900);
      const zeile = n => p.evaluate(n => { const z = document.querySelectorAll('#karten-liste > .card-row')[n]; return z ? Math.round(z.getBoundingClientRect().top) : null; }, n);
      const leer = await p.evaluate(() => { const l = document.querySelector('.select-actionbar'); return l ? l.innerText.replace(/\s+/g, ' ') + ' | gesperrt: ' + [...l.querySelectorAll('button')].every(k => k.disabled) : 'KEINE LEISTE'; });
      out.push('Auswahl gestartet: ' + leer + ' | Karte hinzufuegen sichtbar: ' + await p.evaluate(() => !!document.querySelector('#app [data-action="karte-neu"]')));
      const z0 = await zeile(2);
      await p.evaluate(() => document.querySelectorAll('#karten-liste > .card-row')[0].click()); await p.waitForTimeout(500);
      const z1 = await zeile(2);
      await p.evaluate(() => document.querySelectorAll('#karten-liste > .card-row')[1].click()); await p.waitForTimeout(500);
      const leiste = await p.evaluate(() => { const l = document.querySelector('.select-actionbar'); if (!l) return null; const r = l.getBoundingClientRect(); return { text: l.innerText.replace(/\s+/g, ' '), top: Math.round(r.top), bottom: Math.round(r.bottom), fenster: innerHeight, pos: getComputedStyle(l).position }; });
      out.push('Auswahl: 3. Zeile ' + z0 + ' -> nach 1. Tipp ' + z1 + ' (Sprung ' + ((z1 ?? 0) - (z0 ?? 0)) + ') | Leiste ' + JSON.stringify(leiste));
      if (g === 'handy') await foto(p, 'v10-auswahl');
      // Verschieben ueber das Blatt
      await aktion(p, 'auswahl-verschieben', null, 700);
      const blatt = await p.evaluate(() => { const d = document.querySelector('.dlg'); return d ? d.innerText.replace(/\s+/g, ' ') : null; });
      out.push('Blatt Verschieben: ' + blatt);
      if (g === 'handy') await foto(p, 'v10-verschieben');
      const vorAnz = await p.evaluate(() => document.querySelectorAll('#karten-liste > .card-row').length);
      await p.evaluate(() => document.querySelector('.dlg [data-action="auswahl-ziel-bereich"]').click()); await p.waitForTimeout(900);
      out.push('  verschoben: ' + vorAnz + ' -> ' + await p.evaluate(() => document.querySelectorAll('#karten-liste > .card-row').length) + ' Zeilen | Auswahlmodus noch: ' + await p.evaluate(() => !!document.querySelector('.select-actionbar')));
      // Ablegen in Speicherkarte
      await aktion(p, 'bereich-mehr-auf', null, 600); await aktion(p, 'bereich-mehr-auswaehlen', null, 900);
      await p.evaluate(() => document.querySelectorAll('#karten-liste > .card-row')[0].click()); await p.waitForTimeout(400);
      await aktion(p, 'auswahl-speicherkarte', null, 700);
      out.push('Blatt Ablegen: ' + await p.evaluate(() => { const d = document.querySelector('.dlg'); return d ? d.innerText.replace(/\s+/g, ' ') : null; }));
      const schwierig = () => p.evaluate(() => { const w = window.__FB.store.get('users/u1/bereiche/b1'); return w.sets.s5.cardIds.length; });
      const sv = await schwierig();
      await p.evaluate(() => [...document.querySelectorAll('.dlg [data-action="auswahl-ziel-set"]')].find(k => k.innerText.includes('Schwierig')).click()); await p.waitForTimeout(900);
      out.push('  abgelegt in "Schwierig": ' + sv + ' -> ' + await schwierig() + ' Karten');
      // Tastatur-Sortieren
      const vor = await p.evaluate(() => [...document.querySelectorAll('#karten-liste > .card-row')].slice(0, 3).map(r => r.dataset.cardid).join(','));
      await p.focus('#karten-liste > .card-row:nth-child(1) .drag-handle'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(700);
      const nach = await p.evaluate(() => [...document.querySelectorAll('#karten-liste > .card-row')].slice(0, 3).map(r => r.dataset.cardid).join(','));
      const fok = await p.evaluate(() => { const a = document.activeElement; return a && a.classList.contains('drag-handle') ? a.closest('.card-row').dataset.cardid : (a ? a.tagName + '.' + a.className : null); });
      await p.keyboard.press('ArrowDown'); await p.waitForTimeout(700);
      const nach2 = await p.evaluate(() => [...document.querySelectorAll('#karten-liste > .card-row')].slice(0, 3).map(r => r.dataset.cardid).join(','));
      out.push('Pfeil runter: ' + vor + ' -> ' + nach + ' -> zweimal ' + nach2 + ' | Fokus danach auf ' + fok);
      out.push('X in leerer Suche sichtbar: ' + await p.evaluate(() => { const x = document.getElementById('f-search-clear'); return !!x && x.offsetParent !== null; }));
      // Speicherkarten-Panel
      const sets = await p.evaluate(() => { const s = document.querySelector('.sets-kopf, [data-action="toggle-sets"]'); return s ? s.innerText.replace(/\s+/g, ' ') : null; });
      const vorSets = await zeile(0);
      await aktion(p, 'toggle-sets', null, 800);
      const offen = await p.evaluate(() => document.querySelectorAll('.set-row, .set-block').length);
      out.push('Speicherkarten-Kopf: ' + JSON.stringify(sets) + ' | aufgeklappt: ' + offen + ' Eintraege | erste Kartenzeile ' + vorSets + ' -> ' + await zeile(0));
      const k1 = await pruefeKontrast(p, 'sets'); out.push('  Kontrast offen ' + (k1.length ? JSON.stringify(k1.map(f => f.text + ' ' + f.kontrast + ' ' + f.klasse)) : 0));
      if (g === 'handy') await foto(p, 'v10-sets', true);
      console.log('== ' + g + ' ' + thema + '\n  ' + out.join('\n  ') + '\n  ' + (p.fehler.join('|') || 'ok'));
      await p.context().close();
    }
  }
  await b.close();
})();
