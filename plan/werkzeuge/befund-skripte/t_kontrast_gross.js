const P='/home/user/Wiederholung/plan/werkzeuge/pruefstand/';
const { start, neueSeite, aktion, GERAETE } = require(P+'lib');
const { pruefeKontrast } = require(P+'kontrast');
(async () => {
  const b = await start();
  for (const g of ['desktop','ipadquer','ipad']) for (const thema of ['dunkel','hell']) {
    const { p, ctx } = await neueSeite(b, GERAETE[g], { warte: 1800, thema, ls: { 'adrabic-thema': thema } });
    const f = [];
    const tu = async (a, id, w) => { try { await aktion(p, a, id, w || 800); return true; } catch (e) { return false; } };
    f.push(...await pruefeKontrast(p, g+'/'+thema+'/lernen'));
    await tu('tab-fortschritt'); f.push(...await pruefeKontrast(p, g+'/'+thema+'/fortschritt'));
    await tu('tab-verwalten'); f.push(...await pruefeKontrast(p, g+'/'+thema+'/verwalten'));
    await tu('einstellungen'); f.push(...await pruefeKontrast(p, g+'/'+thema+'/einst'));
    const seen = new Set();
    for (const x of f.filter(x=>!x.disabled)) { const k = x.klasse+x.kontrast; if (seen.has(k)) continue; seen.add(k); console.log(x.bild.padEnd(28), x.kontrast, '<', x.soll, '|', x.klasse, '|', x.text.slice(0,30)); }
    if (thema==='hell' && g==='desktop') {
      const d = await p.evaluate(() => { const el=[...document.querySelectorAll('[data-action=tab-verwalten]')].find(e=>e.offsetParent); if(!el) return null; const cs=getComputedStyle(el); return {cls: el.className, color: cs.color, bg: cs.backgroundColor, par: getComputedStyle(el.parentElement).backgroundColor, fs: cs.fontSize, fw: cs.fontWeight}; });
      console.log('Detail', JSON.stringify(d));
    }
    await ctx.close();
  }
  await b.close();
})();
