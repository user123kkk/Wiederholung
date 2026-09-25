/* 3.17.29 - Betreiber: "man scrollt runter beim Wischen, Wischen resetet
   sich". Echte Touch-Ereignisse (CDP). Je Fall: bewertet? scrollt die
   Seite? Auf einer Karte mit langer Notiz (vorher war die Seite dort
   scrollbar) und einer normalen.
   node t_wischen_schraeg.js */
const { start, neueSeite, aktion, vollerStore } = require('./lib');
const FAELLE = [
  // name, dx, dy, dauer ms, schritte, soll bewertet
  ['waagerecht rechts', 150, 0, 300, 12, true],
  ['schraeg nach unten rechts (Daumen)', 140, 70, 300, 12, true],
  ['schraeg nach oben links', -140, -60, 300, 12, true],
  ['erst 10 px runter, dann seitlich', 150, 10, 300, 12, true, true],
  ['klar senkrecht (kein Wisch)', 20, 160, 300, 12, false],
];
(async () => {
  const b = await start();
  let fehler = 0;
  for (const lang of [false, true]) {
    for (const [name, dx, dy, dauer, schritte, soll, erstRunter] of FAELLE) {
      const s = vollerStore();
      for (const k of Object.keys(s)) if (k.includes('/karten/') && !k.endsWith('/k5') && !k.endsWith('/k6')) s[k].nextReview = '2099-01-01';
      if (lang) { s['users/u1/karten/k5'].extra = 'Lange Notiz. '.repeat(60); s['users/u1/karten/k6'].extra = 'Lange Notiz. '.repeat(60); }
      const { p } = await neueSeite(b, { width: 375, height: 667, touch: true, mobile: true }, { store: s, warte: 1500 });
      const cdp = await p.context().newCDPSession(p);
      await aktion(p, 'start-session', null, 1000);
      await p.click('.study-aufdecken'); await p.waitForTimeout(700);
      const r = await p.evaluate(() => { const b = document.querySelector('.study-flaeche').getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
      const pt = (x, y) => [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }];
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(r.x, r.y) });
      let x = r.x, y = r.y;
      if (erstRunter) for (let i = 1; i <= 3; i++) { y += 4; await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(x, y) }); await p.waitForTimeout(16); }
      for (let i = 1; i <= schritte; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(r.x + dx * i / schritte, y + dy * i / schritte) }); await p.waitForTimeout(dauer / schritte); }
      const scroll = await p.evaluate(() => Math.round(scrollY));
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await p.waitForTimeout(700);
      const bewertet = await p.evaluate(() => !!document.querySelector('[data-action="undo-grade"]'));
      const ok = bewertet === soll && scroll === 0 && !p.fehler.length;
      if (!ok) fehler++;
      console.log((ok ? 'OK  ' : 'FEHL') + ' ' + (lang ? 'lange Notiz ' : 'normal      ') + name.padEnd(36) + ' bewertet: ' + bewertet + ' (soll ' + soll + ') | Seite gescrollt: ' + scroll + ' px' + (p.fehler.length ? ' | ' + p.fehler.join('|') : ''));
      await p.context().close();
    }
  }
  await b.close();
  console.log(fehler ? fehler + ' Fehler' : 'alles ok');
  process.exit(fehler ? 1 : 0);
})();
