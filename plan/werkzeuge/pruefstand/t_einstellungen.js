/* Station 14: Einstellungen - Uebersicht, Wahl-Blaetter, Unterseiten. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
(async () => {
  const b = await start();
  const nurText = process.argv[3] === 'text';
  for (const g of (process.argv[2] || 'handy,klein,ipad').split(',')) {
    for (const thema of (g === 'handy' ? ['dunkel', 'hell'] : ['dunkel'])) {
      const out = [];
      const { p } = await neueSeite(b, GERAETE[g], { warte: 1500, thema, ls: thema === 'hell' ? { 'adrabic-thema': 'hell' } : {} });
      const kon = async n => { const k = await pruefeKontrast(p, n); return k.length ? JSON.stringify(k.map(f => f.text + ' ' + f.kontrast + ' ' + f.klasse)) : 0; };
      const ansicht = () => p.evaluate(() => document.querySelector('#app .view').innerText.replace(/\s+/g, ' ').trim());
      const blatt = () => p.evaluate(() => { const d = [...document.querySelectorAll('.dlg')].pop(); return d ? d.innerText.replace(/\s+/g, ' ').slice(0, 260) : '–'; });
      await aktion(p, 'einstellungen', null, 1000);
      out.push('Uebersicht: ' + (await ansicht()).slice(0, nurText ? 2000 : 0) + ' | Kontrast ' + await kon('einst') + ' | quer ' + await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1));
      if (g === 'handy') await foto(p, 'e14-' + thema + '-uebersicht', true);
      // Wahl-Blaetter
      for (const id of ['limit', 'arab', 'thema']) {
        await aktion(p, 'wahl-sheet', id, 700);
        const t = await blatt(); const k = await kon('wahl-' + id);
        const zeilen = await p.evaluate(() => [...document.querySelectorAll('.dlg .liste-zeile')].map(z => z.getAttribute('data-id')));
        if (g === 'handy' && thema === 'dunkel') await foto(p, 'e14-wahl-' + id);
        // zweite Option waehlen
        await p.evaluate(() => { const z = [...document.querySelectorAll('.dlg .liste-zeile:not(.aktiv)')][0]; z && z.click(); }); await p.waitForTimeout(600);
        const offen = await p.evaluate(() => !!document.querySelector('.dlg'));
        const zeile = await p.evaluate(id => { const z = document.querySelector('[data-action="wahl-sheet"][data-id="' + id + '"]'); return z ? z.innerText.replace(/\s+/g, ' ') : null; }, id);
        out.push('Wahl ' + id + ': ' + (nurText ? t : t.slice(0, 60)) + ' | Kontrast ' + k + ' | nach Wahl Blatt offen ' + offen + ' | Zeile "' + zeile + '"');
        if (offen) { await p.keyboard.press('Escape'); await p.waitForTimeout(500); }
        const zeile2 = await p.evaluate(id => { const z = document.querySelector('[data-action="wahl-sheet"][data-id="' + id + '"]'); return z ? z.innerText.replace(/\s+/g, ' ') : null; }, id);
        if (zeile2 !== zeile) out.push('   Zeile nach Schliessen "' + zeile2 + '"');
      }
      // Erinnerung
      await aktion(p, 'erinnerung-auf', null, 700);
      out.push('Erinnerung: ' + (await blatt()).slice(0, 60) + ' | Kontrast ' + await kon('erinnerung'));
      const erinnerungSperre = await p.evaluate(() => document.documentElement.classList.contains('blatt-offen'));
      if (g === 'handy' && thema === 'dunkel') await foto(p, 'e14-erinnerung');
      await p.keyboard.press('Escape'); await p.waitForTimeout(600);
      out.push('  Escape schliesst Erinnerung: ' + await p.evaluate(() => !document.querySelector('.dlg')) + ' | blatt-offen vorher gemessen: ' + erinnerungSperre);
      // Unterseiten
      const seiten = await p.evaluate(() => [...document.querySelectorAll('[data-action="einst-seite"]')].map(z => z.dataset.id));
      for (const s of seiten) {
        await aktion(p, 'einst-seite', s, 900);
        const t = await ansicht(); const k = await kon('seite-' + s);
        out.push('Seite ' + s + ': ' + (nurText ? t.slice(0, 900) : t.slice(0, 50)) + ' | Kontrast ' + k + ' | quer ' + await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1));
        if (g === 'handy' && thema === 'dunkel') await foto(p, 'e14-seite-' + s, true);
        const zu = await p.evaluate(() => { const z = document.querySelector('[data-action="seite-zu"], [data-action="einst-zurueck"]'); return z ? z.dataset.action : null; });
        if (zu) await aktion(p, zu, null, 700); else { await p.keyboard.press('Escape'); await p.waitForTimeout(600); }
        if (!(await p.evaluate(() => !!document.querySelector('[data-action="einst-seite"]')))) { await aktion(p, 'einstellungen', null, 700); }
      }
      // Fehler melden
      await aktion(p, 'open-error-modal', null, 600);
      out.push('Fehler melden: ' + await p.evaluate(() => { const m = document.getElementById('errorModal'); return m.innerText.replace(/\s+/g, ' ') + ' | Felder: ' + [...m.querySelectorAll('input:not([name=website]), textarea')].map(e => e.id).join(','); }));
      out.push('  Kontrast ' + await kon('fehler'));
      if (g === 'handy' && thema === 'dunkel') await foto(p, 'e14-fehler-melden');
      await p.fill('#error-description', 'Beim Umdrehen flackert die Karte.');
      let mail = null; p.on('request', r => { if (r.url().startsWith('mailto:')) mail = r.url(); });
      await p.evaluate(() => { const orig = Object.getOwnPropertyDescriptor(Location.prototype, 'href'); window.__mail = null; });
      await p.click('#errorForm button[type=submit]'); await p.waitForTimeout(600);
      out.push('  nach Absenden: offen ' + await p.evaluate(() => document.getElementById('errorModal').getAttribute('aria-hidden') === 'false') + ' | Text behalten "' + await p.evaluate(() => document.getElementById('error-description').value) + '"');
      // Idee einreichen
      await aktion(p, 'einst-seite', 'feedback', 900);
      const ideeKnopf = await p.evaluate(() => { const k = [...document.querySelectorAll('#app button')].find(x => /Idee einreichen/.test(x.innerText)); if (k) { k.click(); return k.dataset.action; } return null; });
      await p.waitForTimeout(700);
      out.push('Idee einreichen (' + ideeKnopf + '): ' + await blatt());
      if (g === 'handy' && thema === 'dunkel') await foto(p, 'e14-idee');
      await p.keyboard.press('Escape'); await p.waitForTimeout(500);
      await aktion(p, 'einstellungen', null, 700);
      // weitere Knoepfe der Uebersicht (ohne Seiten)
      out.push('Andere Aktionen: ' + await p.evaluate(() => [...new Set([...document.querySelectorAll('#app .view [data-action]')].map(z => z.dataset.action))].join(',')));
      console.log('== ' + g + ' ' + thema + '\n  ' + out.join('\n  ') + '\n  ' + (p.fehler.join('|') || 'ok'));
      await p.context().close();
    }
  }
  await b.close();
})();
