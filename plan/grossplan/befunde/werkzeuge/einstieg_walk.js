/* EINSTIEG-Audit: Einstieg komplett durchgehen, Fotos + Messungen je Schritt. */
process.env.PRUEF_BILDER = __dirname + '/bilder';
const L = require('/home/user/Wiederholung/plan/werkzeuge/pruefstand/lib.js');
const { start, neueSeite, foto, GERAETE } = L;

(async () => {
  const b = await start();
  const geraete = (process.argv[2] || 'handy,klein').split(',');
  const themen = (process.argv[3] || 'dunkel,hell').split(',');
  for (const g of geraete) for (const thema of themen) {
    const ls = thema === 'hell' ? { 'adrabic-thema': 'hell' } : {};
    const { p } = await neueSeite(b, GERAETE[g], { warte: 1500, user: null, store: {}, ls, hell: thema === 'hell' });
    await p.evaluate(() => { window.__AUTO_VERIFY = true; });
    const tag = g + '-' + thema;
    const mess = async (n) => {
      const r = await p.evaluate(() => {
        const k = document.querySelector('.einstieg-aktion button.full');
        const kr = k ? k.getBoundingClientRect() : null;
        const anims = document.getAnimations().map(a => {
          const t = a.effect && a.effect.getTiming ? a.effect.getTiming() : {};
          const el = a.effect && a.effect.target;
          return (a.animationName || a.transitionProperty || 'js') + '@' + (el ? (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || el.tagName).toString().split(' ')[0] : '?') +
            ' d' + Math.round(t.duration || 0) + ' dl' + Math.round(t.delay || 0) + (t.iterations === Infinity ? ' INF' : (t.iterations > 1 ? ' x' + t.iterations : ''));
        });
        return {
          h1: (document.querySelector('#app h1') || {}).textContent,
          docH: document.documentElement.scrollHeight, vh: innerHeight,
          quer: document.documentElement.scrollWidth > innerWidth + 1,
          knopfTop: kr ? Math.round(kr.top) : null, knopfBottom: kr ? Math.round(kr.bottom) : null,
          knopfText: k ? k.textContent : null, knopfAus: k ? k.disabled : null,
          anims
        };
      });
      console.log(tag, 'S' + n, JSON.stringify(r));
    };
    const k = async (sel, w = 700) => { const el = await p.$(sel); if (!el) { console.log('FEHLT', sel); return false; } await el.click(); await p.waitForTimeout(w); return true; };
    await p.waitForTimeout(300); await mess('0a');
    await p.waitForTimeout(3200); await mess('0'); await foto(p, tag + '-0');
    await k('[data-action="einstieg-weiter"]', 120); await mess('1-start'); await p.waitForTimeout(800);
    await foto(p, tag + '-1-leer');
    await k('[data-action="einstieg-ziel"][data-id="quran"]'); await k('[data-action="einstieg-ziel"][data-id="kurs"]');
    await mess(1); await foto(p, tag + '-1');
    await k('[data-action="einstieg-weiter"]', 900);
    await k('[data-action="einstieg-huerde"][data-id="schrift"]'); await k('[data-action="einstieg-huerde"][data-id="zeit"]'); await k('[data-action="einstieg-huerde"][data-id="vergessen"]');
    await mess(2); await foto(p, tag + '-2');
    await k('[data-action="einstieg-weiter"]', 900);
    await mess('3a'); await foto(p, tag + '-3a');
    await k('[data-action="einstieg-aufdecken"]', 900); await mess('3b'); await foto(p, tag + '-3b');
    await k('[data-action="einstieg-bewerten"][data-id="Sicher"]', 1400); await mess('3c'); await foto(p, tag + '-3c');
    await k('[data-action="einstieg-weiter"]', 900); await mess(4); await foto(p, tag + '-4');
    await k('[data-action="einstieg-weiter"]', 900); await mess(5); await foto(p, tag + '-5');
    await k('[data-action="einstieg-weiter"]', 900);
    await k('[data-action="einstieg-anker"][data-id="fajr"]'); await mess(6); await foto(p, tag + '-6');
    await k('[data-action="einstieg-weiter"]', 1500); await mess('7bau'); await foto(p, tag + '-7bau');
    await p.waitForTimeout(6500); await mess(7); await foto(p, tag + '-7'); await foto(p, tag + '-7voll', true);
    await k('[data-action="einstieg-fertig"]', 900); await mess('auth'); await foto(p, tag + '-8auth', true);
    await p.fill('#a-name', 'Ahmad'); await p.fill('#a-email', 'a@b.de'); await p.fill('#a-pass', 'geheim1');
    await k('[data-action="register"]', 2500); await mess('lernen'); await foto(p, tag + '-9lernen', true);
    console.log(tag, 'Fehler:', p.fehler.join('|') || 'ok');
    await p.context().close();
  }
  await b.close();
})();
