/* Station 17: grosse Bildschirme - alle Stationen im Schnelldurchgang. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
(async () => {
  const b = await start();
  for (const g of (process.argv[2] || 'ipadquer,desktop').split(',')) {
    const zeilen = [];
    const pruef = async (p, name) => {
      await p.waitForTimeout(500);
      const k = await pruefeKontrast(p, name);
      const m = await p.evaluate(() => {
        const quer = document.documentElement.scrollWidth > innerWidth + 1;
        // Ueberlappung: Inhalt unter der Seitenleiste?
        const nav = document.querySelector('#app > .nav'); const nr = nav && getComputedStyle(nav).display !== 'none' ? nav.getBoundingClientRect() : null;
        let unter = 0;
        if (nr && nr.height > innerHeight * 0.5) for (const el of document.querySelectorAll('#app .view button, #app .view h1, #app .view h2, #app .view p')) { const r = el.getBoundingClientRect(); if (r.width && r.left < nr.right - 2 && r.right > nr.left && r.top < nr.bottom && r.bottom > nr.top) unter++; }
        // sehr lange Zeilen
        let lang = 0; for (const el of document.querySelectorAll('#app p, #app .hint')) { const r = el.getBoundingClientRect(); const fs = parseFloat(getComputedStyle(el).fontSize); if (r.width / fs > 48 && el.innerText.length > 120) lang++; }
        const dlg = document.querySelector('.dlg'); const dw = dlg ? Math.round(dlg.getBoundingClientRect().width) : null;
        return { quer, unter, lang, dw };
      });
      zeilen.push(name.padEnd(16) + ' Kontrast ' + (k.length ? JSON.stringify(k.map(f => f.text.slice(0, 20) + ' ' + f.kontrast)) : 0) + ' | quer ' + m.quer + ' | unter Leiste ' + m.unter + ' | lange Zeilen ' + m.lang + (m.dw ? ' | Blatt ' + m.dw + ' px' : ''));
      await foto(p, 'g17-' + g + '-' + name);
    };
    // Einstieg + Anmelden
    let { p, ctx } = await neueSeite(b, GERAETE[g], { warte: 1500, user: null });
    await pruef(p, 'einstieg');
    await aktion(p, 'einstieg-konto', null, 900); await pruef(p, 'anmelden');
    await ctx.close();
    ({ p, ctx } = await neueSeite(b, GERAETE[g], { warte: 1800 }));
    await pruef(p, 'lernen');
    await aktion(p, 'start-session', null, 900); await pruef(p, 'runde');
    await p.keyboard.press('Space'); await p.waitForTimeout(700); await pruef(p, 'runde-offen');
    for (let i = 0; i < 14; i++) { if (await p.$('#app .ende')) break; await p.keyboard.press('Space'); await p.waitForTimeout(300); await p.keyboard.press('3'); await p.waitForTimeout(350); }
    await p.waitForTimeout(1200); await pruef(p, 'rundenende');
    await aktion(p, 'end-session', null, 800);
    await aktion(p, 'tab-fortschritt', null, 1500); await pruef(p, 'fortschritt');
    await aktion(p, 'tab-verwalten', null, 1200); await pruef(p, 'verwalten');
    await aktion(p, 'bereich-mehr-auf', null, 500); await aktion(p, 'bereich-mehr-auswaehlen', null, 700);
    await p.evaluate(() => document.querySelectorAll('#karten-liste > .card-row')[0].click()); await p.waitForTimeout(400); await pruef(p, 'auswahl');
    await aktion(p, 'toggle-select-mode', null, 600);
    await aktion(p, 'karte-neu', null, 800); await pruef(p, 'karte-neu'); await p.keyboard.press('Escape'); await p.waitForTimeout(500);
    await aktion(p, 'open-drill', null, 700); await p.evaluate(() => { document.getElementById('drill-handwriting').click(); }); await aktion(p, 'start-drill', null, 1200); await pruef(p, 'schreiben');
    await aktion(p, 'end-session', null, 800);
    await aktion(p, 'einstellungen', null, 900); await pruef(p, 'einstellungen');
    await aktion(p, 'wahl-sheet', 'thema', 700); await pruef(p, 'wahlblatt'); await p.keyboard.press('Escape'); await p.waitForTimeout(500);
    await aktion(p, 'einst-seite', 'konto-loeschen', 900); await pruef(p, 'konto-loeschen');
    console.log('== ' + g + '\n  ' + zeilen.join('\n  ') + '\n  ' + (p.fehler.join('|') || 'ok'));
    await ctx.close();
  }
  await b.close();
})();
