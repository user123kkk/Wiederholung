const P='/home/user/Wiederholung/plan/werkzeuge/pruefstand/';
const { start, neueSeite, aktion, GERAETE } = require(P+'lib');
(async () => {
  const b = await start();
  const { p, ctx } = await neueSeite(b, GERAETE.desktop, { warte: 1800 });
  const wo = () => p.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return 'body'; const d = a.closest('[role=dialog],[role=alertdialog],.dlg,.error-modal__dialog'); return (d ? 'IM-DIALOG ' : 'DRAUSSEN ') + (a.dataset.action || a.id || a.tagName) ; });
  const probe = async (name, oeffnen, dialogSel) => {
    await oeffnen();
    const offen = await p.evaluate(s => !!document.querySelector(s), dialogSel);
    const nachOeffnen = await wo();
    const spur = [];
    for (let i = 0; i < 25; i++) { await p.keyboard.press('Tab'); spur.push(await wo()); }
    const raus = spur.filter(s => !s.startsWith('IM-DIALOG')).length;
    const hinter = await p.evaluate(s => { const d = document.querySelector(s); if (!d) return '?'; const root = d.closest('.sheet-wrap,.overlay,.dlg-wrap') || d; const aussen = [...document.querySelectorAll('#app button, #app a[href]')].filter(e => !root.contains(e) && e.offsetParent); const inert = aussen.filter(e => e.closest('[inert],[aria-hidden=true]')).length; return aussen.length + ' Knoepfe dahinter, davon inert/aria-hidden ' + inert; }, dialogSel);
    await p.keyboard.press('Escape'); await p.waitForTimeout(500);
    const zu = await p.evaluate(s => !document.querySelector(s) || getComputedStyle(document.querySelector(s)).visibility === 'hidden' || document.querySelector(s).closest('[aria-hidden=true]') != null, dialogSel);
    console.log(name.padEnd(14), 'offen', offen, '| Fokus nach Oeffnen:', nachOeffnen, '| 25x Tab: ausserhalb', raus, '(' + [...new Set(spur)].slice(0, 6).join(', ') + ')', '|', hinter, '| Escape schliesst:', zu, '| Fokus danach:', await wo());
  };
  await aktion(p, 'tab-verwalten', null, 900);
  await probe('karte-blatt', () => aktion(p, 'karte-neu', null, 800), '.dlg');
  await probe('bereich-blatt', () => aktion(p, 'bereich-sheet-auf', null, 800), '.dlg');
  await aktion(p, 'einstellungen', null, 900);
  await probe('wahl-blatt', () => aktion(p, 'wahl-sheet', 'arab', 800), '.dlg');
  await probe('fehler-modal', () => aktion(p, 'open-error-modal', null, 800), '.error-modal__dialog');
  // Rueckfrage-Dialog (dlgConfirm) z.B. Abmelden
  try { await probe('abmelden', () => aktion(p, 'logout', null, 800), '.dlg'); } catch (e) { console.log('abmelden: ', e.message); }
  const live = await p.evaluate(() => [...document.querySelectorAll('[aria-live],[role=status],[role=alert]')].map(e => (e.className || e.tagName).toString().slice(0, 30) + ':' + (e.getAttribute('aria-live') || e.getAttribute('role'))));
  console.log('aria-live/status:', JSON.stringify(live));
  await ctx.close();
  // Zoom 200 %: 1280 breit -> 640 CSS px; Handy 320
  for (const [w, h] of [[640, 400], [320, 568]]) {
    const s = await neueSeite(b, { width: w, height: h, dpr: 2 }, { warte: 1600 });
    const r = [];
    for (const t of [null, 'tab-fortschritt', 'tab-verwalten', 'einstellungen']) { if (t) { try { await aktion(s.p, t, null, 900); } catch (e) {} } r.push((t || 'lernen') + ':' + await s.p.evaluate(() => document.documentElement.scrollWidth - innerWidth)); }
    console.log('Breite', w, 'x', h, 'waagerechter Ueberstand px', r.join(' '));
    await s.ctx.close();
  }
  await b.close();
})();
