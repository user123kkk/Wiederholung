/* G-089 (3.17.37): Bei offenem Karten-Blatt steht "Karte gespeichert" im
   Blatt-Kopf neben dem Titel statt als Meldung darueber (verdeckte "Neue
   Karte", Betreiber-Screenshot 26.09.2026). Prueft je Geraet/Thema: sichtbar,
   keine Ueberlappung, Titel nicht abgeschnitten, keine globale Meldung, kein
   Sprung der Felder, nach Ablauf wieder unsichtbar. Aufruf: node t_karte_kopf.js */
const L = require('./lib.js');
(async () => {
  const b = await L.start(); let funde = 0;
  for (const [g, vp] of [['handy', L.GERAETE.handy], ['klein', { width: 320, height: 640, dpr: 2 }], ['desktop', L.GERAETE.desktop]]) {
    for (const hell of [false, true]) {
      const { p } = await L.neueSeite(b, vp, { hell, thema: hell ? 'hell' : 'dunkel' });
      await L.aktion(p, 'tab-verwalten', null, 1200); await L.aktion(p, 'karte-neu', null, 900);
      const vor = await p.evaluate(() => [document.getElementById('f-wort').getBoundingClientRect().top, document.querySelector('.karte-kopf').getBoundingClientRect().height]);
      await p.fill('#f-wort', 'kitaab'); await p.fill('#f-ueb', 'Buch');
      await L.aktion(p, 'submit-card', null, 300);
      const r = await p.evaluate(() => {
        const h = document.getElementById('karte-sheet-titel').getBoundingClientRect(), ok = document.querySelector('.karte-kopf__ok'), o = ok.getBoundingClientRect();
        const h3 = document.getElementById('karte-sheet-titel');
        return { wortTop: document.getElementById('f-wort').getBoundingClientRect().top, kopfH: document.querySelector('.karte-kopf').getBoundingClientRect().height,
          sichtbar: getComputedStyle(ok).visibility, text: ok.innerText.trim(), ueberlapp: o.left < h.right, titelAbgeschnitten: h3.scrollWidth > h3.clientWidth + 1,
          globalToast: !!document.querySelector('.toast'), ansage: document.getElementById('ansage').textContent, fokus: document.activeElement.id,
          okRechts: Math.round(document.querySelector('.dlg').getBoundingClientRect().right - o.right) };
      });
      await p.screenshot({ path: require('path').join(L.OUT, 'g089_' + g + '_' + (hell ? 'hell' : 'dunkel') + '.png'), clip: { x: 0, y: 0, width: vp.width, height: 260 } });
      await p.waitForTimeout(2700);
      const nach = await p.evaluate(() => [getComputedStyle(document.querySelector('.karte-kopf__ok')).visibility, document.getElementById('f-wort').getBoundingClientRect().top]);
      const fehler = [];
      if (Math.abs(r.wortTop - vor[0]) > 1) fehler.push('Sprung ' + (r.wortTop - vor[0]));
      if (r.sichtbar !== 'visible' || r.text !== 'Karte gespeichert') fehler.push('nicht sichtbar');
      if (r.ueberlapp || r.titelAbgeschnitten) fehler.push('Ueberlappung/abgeschnitten');
      if (r.globalToast) fehler.push('globale Meldung noch da');
      if (nach[0] !== 'hidden' || Math.abs(nach[1] - vor[0]) > 1) fehler.push('nach Ablauf ' + nach);
      if (p.fehler.length) fehler.push(p.fehler.join('/'));
      if (fehler.length) funde++;
      console.log(g, hell ? 'hell' : 'dunkel', fehler.length ? 'FEHLER ' + fehler.join('; ') : 'ok', JSON.stringify(r));
      await p.context().close();
    }
  }
  console.log('Funde: ' + funde); await b.close(); process.exit(funde ? 1 : 0);
})();
