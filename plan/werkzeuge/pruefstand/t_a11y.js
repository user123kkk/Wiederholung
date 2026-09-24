/* Station 18: Hell & ruhig - reduzierte Bewegung, Screenreader-Grundlagen, helle Fassung. */
const { start, neueSeite, aktion, GERAETE } = require('./lib');
const { pruefeKontrast } = require('./kontrast');
(async () => {
  const b = await start();
  const g = process.argv[2] || 'handy';
  const zeilen = [];
  const { p, ctx } = await neueSeite(b, GERAETE[g], { warte: 1800, ruhig: true, thema: 'hell', ls: { 'adrabic-thema': 'hell' } });
  await p.evaluate(() => {
    window.__anim = [];
    document.addEventListener('animationstart', e => { const d = parseFloat(getComputedStyle(e.target).animationDuration) * 1000; if (d > 50) window.__anim.push(e.animationName + ' ' + Math.round(d) + 'ms'); }, true);
    document.addEventListener('transitionrun', e => { const cs = getComputedStyle(e.target); const d = parseFloat(cs.transitionDuration) * 1000; if (d > 50 && /transform|translate/.test(e.propertyName)) window.__anim.push('transition:' + e.propertyName + ' ' + Math.round(d) + 'ms ' + (e.target.className || e.target.tagName).toString().slice(0, 30)); }, true);
  });
  const a11y = async name => {
    const r = await p.evaluate(() => {
      const sichtbar = el => el.offsetParent !== null || getComputedStyle(el).position === 'fixed';
      const nameVon = el => (el.getAttribute('aria-label') || el.getAttribute('title') || (el.getAttribute('aria-labelledby') ? (document.getElementById(el.getAttribute('aria-labelledby')) || {}).innerText : '') || el.innerText || '').trim();
      const ohneName = [...document.querySelectorAll('button, [role=button], a[href]')].filter(el => sichtbar(el) && el.getAttribute('aria-hidden') !== 'true' && !el.closest('[aria-hidden=true]') && !nameVon(el)).map(el => (el.dataset.action || el.className || el.tagName).toString().slice(0, 40));
      const felder = [...document.querySelectorAll('input:not([type=hidden]):not([type=file]), textarea, select')].filter(el => sichtbar(el) && !el.classList.contains('error-modal__honeypot') && el.getAttribute('tabindex') !== '-1');
      const ohneLabel = felder.filter(el => !(el.id && document.querySelector('label[for="' + el.id + '"]')) && !el.closest('label') && !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')).map(el => el.id || el.name || el.className);
      const bilder = [...document.querySelectorAll('img')].filter(i => sichtbar(i) && !i.hasAttribute('alt')).length;
      const h1 = [...document.querySelectorAll('h1')].map(h => h.innerText.trim() || h.textContent.trim()).filter(Boolean).join('/') || 0;
      const dialoge = [...document.querySelectorAll('.dlg')].map(d => (d.getAttribute('role') || '-') + '/' + (d.getAttribute('aria-label') || d.getAttribute('aria-labelledby') ? 'benannt' : 'UNBENANNT'));
      return { ohneName, ohneLabel, bilder, h1, dialoge, lang: document.documentElement.lang };
    });
    const k = await pruefeKontrast(p, name);
    const anim = await p.evaluate(() => { const a = window.__anim; window.__anim = []; return [...new Set(a)]; });
    zeilen.push(name.padEnd(14) + ' ohne Namen ' + JSON.stringify(r.ohneName) + ' | Felder ohne Label ' + JSON.stringify(r.ohneLabel) + ' | img ohne alt ' + r.bilder + ' | h1 ' + r.h1 + (r.dialoge.length ? ' | Dialoge ' + r.dialoge.join(',') : '') + ' | Kontrast ' + (k.length ? JSON.stringify(k.map(f => f.text.slice(0, 18) + ' ' + f.kontrast)) : 0) + ' | Bewegung trotz "ruhig": ' + (anim.length ? JSON.stringify(anim) : 'keine'));
  };
  zeilen.push('lang="' + await p.evaluate(() => document.documentElement.lang) + '"');
  await a11y('lernen');
  await aktion(p, 'start-session', null, 900); await a11y('runde');
  await p.keyboard.press('Space'); await p.waitForTimeout(700); await a11y('runde-offen');
  await p.keyboard.press('3'); await p.waitForTimeout(700); await a11y('bewertet');
  await aktion(p, 'end-session', null, 800);
  await aktion(p, 'tab-fortschritt', null, 1200); await a11y('fortschritt');
  await aktion(p, 'tab-verwalten', null, 1000); await a11y('verwalten');
  await aktion(p, 'karte-neu', null, 800); await a11y('karte-blatt'); await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  await aktion(p, 'bereich-sheet-auf', null, 700); await a11y('bereich-blatt'); await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  await aktion(p, 'einstellungen', null, 900); await a11y('einstellungen');
  await aktion(p, 'wahl-sheet', 'arab', 700); await a11y('wahl-blatt'); await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  await aktion(p, 'open-error-modal', null, 600); await a11y('fehler-melden');
  console.log('== ' + g + '\n  ' + zeilen.join('\n  ') + '\n  ' + (p.fehler.join('|') || 'ok'));
  await ctx.close();
  // abgemeldet: Einstieg + Anmelden
  const s2 = await neueSeite(b, GERAETE[g], { warte: 1500, user: null, ruhig: true });
  const r2 = await s2.p.evaluate(() => [...document.querySelectorAll('button')].filter(el => el.offsetParent && !(el.getAttribute('aria-label') || el.innerText.trim() || el.title)).map(el => el.dataset.action || el.className));
  await aktion(s2.p, 'einstieg-konto', null, 900);
  const r3 = await s2.p.evaluate(() => ({ ohne: [...document.querySelectorAll('button')].filter(el => el.offsetParent && !(el.getAttribute('aria-label') || el.innerText.trim() || el.title)).map(el => el.dataset.action || el.className), felder: [...document.querySelectorAll('input')].filter(el => el.offsetParent && !(el.id && document.querySelector('label[for="' + el.id + '"]'))).map(el => el.id) }));
  console.log('  einstieg ohne Namen ' + JSON.stringify(r2) + ' | anmelden ohne Namen ' + JSON.stringify(r3.ohne) + ' Felder ohne Label ' + JSON.stringify(r3.felder));
  await b.close();
})();
