/* Station 2 (Einstieg): jeden Schritt durchgehen - Kontrast, Sprung des
   Weiter-Knopfs bei einer Wahl, waagerechtes Scrollen, Fotos. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
(async () => {
  const b = await start();
  const geraete = (process.argv[2] || 'handy,klein,ipad').split(',');
  const themen = (process.argv[3] || 'dunkel,hell').split(',');
  for (const g of geraete) for (const thema of themen) {
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1500, user: null, ls: thema === 'hell' ? { 'adrabic-thema': 'hell' } : {} });
    const knopf = () => p.evaluate(() => { const k = document.querySelector('[data-action="einstieg-weiter"], [data-action="einstieg-plan-speichern"]'); return k ? Math.round(k.getBoundingClientRect().top + scrollY) : null; });
    const quer = () => p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    const funde = []; const spruenge = [];
    const pruef = async (n) => { funde.push(...await pruefeKontrast(p, g + '/' + thema + '/schritt-' + n)); if (await quer()) funde.push({ bild: n, text: 'waagerechtes Scrollen' }); };
    const klick = async (sel, w = 500) => { const el = await p.$(sel); if (!el) return false; await el.click(); await p.waitForTimeout(w); return true; };
    const wahlSprung = async (n, sel) => { await p.waitForTimeout(900); const a = await knopf(); if (await klick(sel, 700)) { const c = await knopf(); spruenge.push(n + ':' + (a !== null && c !== null ? c - a : '?')); } };
    // 0
    await p.waitForTimeout(3500); await pruef(0); if (g === 'handy') await foto(p, 'e2-' + thema + '-0');
    await klick('[data-action="einstieg-weiter"]', 900);
    // 1 Ziel
    await wahlSprung(1, '[data-action="einstieg-ziel"]'); await pruef(1); if (g === 'handy') await foto(p, 'e2-' + thema + '-1');
    await klick('[data-action="einstieg-weiter"]', 900);
    // 2 Huerden
    await wahlSprung(2, '[data-action="einstieg-huerde"]'); await pruef(2); if (g === 'handy') await foto(p, 'e2-' + thema + '-2');
    await klick('[data-action="einstieg-weiter"]', 900);
    // 3 Probekarte
    await p.waitForTimeout(800); await pruef('3a'); await klick('[data-action="einstieg-aufdecken"]', 900); await pruef('3b');
    await klick('[data-action="einstieg-bewerten"][data-id="Sicher"]', 900); await pruef('3c'); if (g === 'handy') await foto(p, 'e2-' + thema + '-3');
    await klick('[data-action="einstieg-weiter"]', 900);
    // 4 Schrift
    await wahlSprung(4, '[data-action="einstieg-schrift"]:last-child'); await pruef(4); if (g === 'handy') await foto(p, 'e2-' + thema + '-4');
    await klick('[data-action="einstieg-weiter"]', 900);
    // 5 Runde
    await wahlSprung(5, '[data-action="einstieg-runde"]'); await pruef(5); if (g === 'handy') await foto(p, 'e2-' + thema + '-5');
    await klick('[data-action="einstieg-weiter"]', 900);
    // 6 Zeitpunkt
    await wahlSprung(6, '[data-action="einstieg-anker"]'); await pruef(6); if (g === 'handy') await foto(p, 'e2-' + thema + '-6');
    await klick('[data-action="einstieg-weiter"]', 900);
    // 7 Plan
    await p.waitForTimeout(7000); await pruef(7); if (g === 'handy') await foto(p, 'e2-' + thema + '-7', true);
    console.log(g, thema, '| Spruenge Weiter-Knopf bei Wahl:', spruenge.join(' '), '| Kontrast/Quer-Funde:', funde.length ? funde.map(f => f.bild + ' "' + f.text + '" ' + (f.kontrast || '') + (f.klasse ? ' ' + f.klasse : '')).join(' ; ') : 0, '|', p.fehler.join('|') || 'ok');
    await p.context().close();
  }
  await b.close();
})();
