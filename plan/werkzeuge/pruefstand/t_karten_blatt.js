/* Station 11: Karten-Blaetter - anlegen, bearbeiten, loeschen, Detail. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
(async () => {
  const b = await start();
  for (const g of (process.argv[2] || 'handy,klein,ipad').split(',')) {
    for (const thema of (g === 'handy' ? ['dunkel', 'hell'] : ['dunkel'])) {
      const out = [];
      const { p } = await neueSeite(b, GERAETE[g], { warte: 1500, thema, ls: thema === 'hell' ? { 'adrabic-thema': 'hell' } : {} });
      await aktion(p, 'tab-verwalten', null, 1400);
      const anzahl = () => p.evaluate(() => [...window.__FB.store.keys()].filter(k => k.startsWith('users/u1/karten/')).length);
      const knopf = () => p.evaluate(() => { const k = document.querySelector('.dlg [data-action="submit-card"]'); return k ? Math.round(k.getBoundingClientRect().top) : null; });
      await aktion(p, 'karte-neu', null, 800);
      out.push('Blatt auf: Fokus ' + await p.evaluate(() => document.activeElement.id) + ' | enterkeyhint ' + await p.evaluate(() => ['f-wort', 'f-ueb'].map(i => document.getElementById(i).getAttribute('enterkeyhint')).join('/')));
      const k0 = await pruefeKontrast(p, 'blatt'); out.push('Kontrast Blatt ' + (k0.length ? JSON.stringify(k0.map(f => f.text + ' ' + f.kontrast)) : 0));
      if (g === 'handy') await foto(p, 'k11-' + thema + '-neu');
      if (thema === 'hell') { console.log('== ' + g + ' ' + thema + '\n  ' + out.join('\n  ')); await p.context().close(); continue; }
      // leer abschicken
      const b0 = await knopf();
      await aktion(p, 'submit-card', null, 500);
      const b1 = await knopf();
      out.push('Leer: Fehler ' + await p.evaluate(() => [...document.querySelectorAll('.dlg [aria-invalid="true"]')].map(e => e.id).join(',')) + ' | Knopf ' + b0 + ' -> ' + b1 + ' (Sprung ' + ((b1 ?? 0) - (b0 ?? 0)) + ') | Fokus ' + await p.evaluate(() => document.activeElement.id));
      if (g === 'handy') await foto(p, 'k11-fehler');
      // Tippen nimmt Fehler weg -> rutscht das Feld?
      const feld = () => p.evaluate(() => Math.round(document.getElementById('f-wort').getBoundingClientRect().top));
      const f0 = await feld();
      await p.type('#f-wort', 'بَحْرٌ'); await p.waitForTimeout(200);
      out.push('  nach Tippen: Knopf ' + await knopf() + ' | Wort-Feld ' + f0 + ' -> ' + await feld() + ' | Abstand Label-Feld ' + await p.evaluate(() => Math.round(document.getElementById('f-wort').getBoundingClientRect().top - document.querySelector('label[for="f-wort"]').getBoundingClientRect().bottom) + '/' + Math.round(document.getElementById('f-extra').getBoundingClientRect().top - document.querySelector('label[for="f-extra"]').getBoundingClientRect().bottom)));
      // Enter im Wort-Feld
      await p.keyboard.press('Enter'); await p.waitForTimeout(500);
      out.push('Enter im Wort: Fokus ' + await p.evaluate(() => document.activeElement.id) + ' | Fehler ' + await p.evaluate(() => [...document.querySelectorAll('.dlg [aria-invalid="true"]')].map(e => e.id).join(',') || '–') + ' | Knopf ' + await knopf());
      const n0 = await anzahl();
      await p.fill('#f-ueb', 'Meer'); await p.keyboard.press('Enter'); await p.waitForTimeout(800);
      const toast = await p.evaluate(() => { const t = document.querySelector('.toast'); if (!t) return null; const r = t.getBoundingClientRect(); const d = document.querySelector('.dlg').getBoundingClientRect(); return t.innerText.trim() + ' @' + Math.round(r.top) + '-' + Math.round(r.bottom) + ' Blatt ab ' + Math.round(d.top) + (r.bottom > d.top && r.top < d.bottom ? ' UEBERDECKT' : ''); });
      out.push('Hinzufuegen (Enter): Karten ' + n0 + ' -> ' + await anzahl() + ' | Blatt offen ' + await p.evaluate(() => !!document.querySelector('.dlg #f-wort')) + ' | Felder leer ' + await p.evaluate(() => !document.getElementById('f-wort').value && !document.getElementById('f-ueb').value) + ' | Fokus ' + await p.evaluate(() => document.activeElement.id) + ' | Toast ' + toast);
      if (g === 'handy') await foto(p, 'k11-nach-hinzu');
      // Duplikat
      await p.fill('#f-wort', 'بَحْرٌ'); await p.fill('#f-ueb', 'See'); await aktion(p, 'submit-card', null, 600);
      out.push('Duplikat: ' + await p.evaluate(() => { const d = [...document.querySelectorAll('.dlg')].pop(); return d.innerText.replace(/\s+/g, ' ').slice(0, 120); }));
      await p.evaluate(() => { const k = [...document.querySelectorAll('.dlg button')].find(x => /Abbrechen|Nein/.test(x.innerText)); k && k.click(); }); await p.waitForTimeout(500);
      // Getippt, dann Fertig
      const n1 = await anzahl();
      await p.fill('#f-wort', 'نَهْرٌ'); await p.fill('#f-ueb', 'Fluss');
      await aktion(p, 'karte-sheet-zu', null, 700);
      const nachFertig = await p.evaluate(() => { const d = [...document.querySelectorAll('.dlg')].pop(); return d ? d.innerText.replace(/\s+/g, ' ').slice(0, 140) : 'kein Dialog'; });
      out.push('Vollstaendig + Fertig: ' + nachFertig + ' | Karten ' + n1 + ' -> ' + await anzahl() + ' | Blatt zu ' + await p.evaluate(() => !document.querySelector('#f-wort')));
      // halb getippt + Escape
      await aktion(p, 'karte-neu', null, 800);
      await p.fill('#f-wort', 'جَبَلٌ'); await p.keyboard.press('Escape'); await p.waitForTimeout(700);
      out.push('Halb + Escape: ' + await p.evaluate(() => { const d = [...document.querySelectorAll('.dlg')].pop(); return d.innerText.replace(/\s+/g, ' ').slice(0, 140); }));
      await p.evaluate(() => { const k = [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Abbrechen'); k && k.click(); }); await p.waitForTimeout(700);
      out.push('  Abbrechen -> Blatt noch da ' + await p.evaluate(() => !!document.querySelector('#f-wort')) + ', Wort "' + await p.evaluate(() => (document.getElementById('f-wort') || {}).value) + '"');
      await aktion(p, 'karte-sheet-zu', null, 700);
      await p.evaluate(() => { const k = [...document.querySelectorAll('.dlg button')].find(x => x.innerText.trim() === 'Verwerfen'); k && k.click(); }); await p.waitForTimeout(900);
      out.push('  Fertig (halb) -> Verwerfen -> Blatt zu ' + await p.evaluate(() => !document.querySelector('#f-wort')) + ' | Karten ' + await anzahl());
      // Detail + Bearbeiten
      await p.evaluate(() => document.querySelectorAll('#karten-liste > .card-row')[3].click()); await p.waitForTimeout(800);
      out.push('Detail: ' + await p.evaluate(() => document.querySelector('.dlg').innerText.replace(/\s+/g, ' ')));
      const k1 = await pruefeKontrast(p, 'detail'); out.push('  Kontrast ' + (k1.length ? JSON.stringify(k1.map(f => f.text + ' ' + f.kontrast)) : 0));
      if (g === 'handy') await foto(p, 'k11-detail');
      await aktion(p, 'card-detail-bearbeiten', await p.evaluate(() => document.querySelector('[data-action="card-detail-bearbeiten"]').dataset.id), 800);
      out.push('Bearbeiten: ' + await p.evaluate(() => ['f-wort', 'f-ueb', 'f-extra', 'f-stufe'].map(i => { const e = document.getElementById(i); return e ? (e.tagName === 'SELECT' ? e.options[e.selectedIndex].text : e.value) : '-'; }).join(' / ')));
      await p.fill('#f-ueb', 'Moschee (Gebetshaus)'); await aktion(p, 'submit-card', null, 800);
      out.push('  gespeichert: Blatt zu ' + await p.evaluate(() => !document.querySelector('.dlg #f-wort')) + ' | Liste zeigt ' + await p.evaluate(() => document.querySelectorAll('#karten-liste > .card-row')[3].innerText.replace(/\s+/g, ' ')));
      // Loeschen aus dem Detail
      const n2 = await anzahl();
      await p.evaluate(() => document.querySelectorAll('#karten-liste > .card-row')[3].click()); await p.waitForTimeout(700);
      await aktion(p, 'card-detail-loeschen', await p.evaluate(() => document.querySelector('[data-action="card-detail-loeschen"]').dataset.id), 700);
      out.push('Loeschen fragt: ' + await p.evaluate(() => { const d = document.querySelector('.dlg'); return d ? d.innerText.replace(/\s+/g, ' ') : 'NICHTS'; }));
      await p.evaluate(() => { const k = [...document.querySelectorAll('.dlg button')].find(x => /Löschen/.test(x.innerText)); k && k.click(); }); await p.waitForTimeout(800);
      out.push('  Karten ' + n2 + ' -> ' + await anzahl());
      console.log('== ' + g + ' ' + thema + '\n  ' + out.join('\n  ') + '\n  ' + (p.fehler.join('|') || 'ok'));
      await p.context().close();
    }
  }
  await b.close();
})();
