/* 3.17.25: Ein zweiter Tipp kurz nach "Antwort zeigen" darf nicht blind
   bewerten ("Fast" erscheint genau unter dem Daumen). Normales Bewerten muss
   weiter gehen. node t_doppeltipp.js */
const { start, neueSeite, aktion, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  let fehler = 0;
  for (const [abstand, soll] of [[80, 1], [150, 1], [250, 1], [700, 2]]) {
    const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800 });
    await aktion(p, 'start-session', null, 1200);
    const k = await p.evaluate(() => { const r = document.querySelector('.study-aufdecken').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
    await p.mouse.click(k[0], k[1]);
    await p.waitForTimeout(abstand);
    await p.mouse.click(k[0], k[1]);
    await p.waitForTimeout(800);
    const karte = await p.evaluate(() => { const m = document.body.innerText.match(/Karte (\d+) von/); return m ? Number(m[1]) : 0; });
    const ok = karte === soll && !p.fehler.length;
    if (!ok) fehler++;
    console.log((ok ? 'OK  ' : 'FEHL') + ' zweiter Tipp nach ' + abstand + ' ms -> Karte ' + karte + ' (soll ' + soll + ')' + (p.fehler.length ? ' ' + p.fehler.join('|') : ''));
    await p.context().close();
  }
  console.log(fehler ? fehler + ' Fehler' : 'alles ok');
  await b.close();
})();
