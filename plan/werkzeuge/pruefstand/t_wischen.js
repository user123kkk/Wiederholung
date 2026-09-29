/* 3.17.27: Wischen zum Bewerten mit ECHTEN Touch-Ereignissen (CDP), nicht Maus.
   Faelle: langsam weit, schnell kurz (Fling), direkt nach dem Aufdecken,
   zu kurz (muss zurueckfedern). Misst: bewertet? folgt die Karte dem Finger?
   node t_wischen.js */
const { start, neueSeite, aktion, GERAETE } = require('./lib');
/* bewertet = oben erscheint "Rueckgaengig" (nach "Nicht" bleibt der Zaehler stehen) */
const karteNr = p => p.evaluate(() => document.querySelector('[data-action="undo-grade"]') ? 2 : 1);
async function wisch(p, cdp, dx, dauer, schritte, messen, abbruch) {
  const r = await p.evaluate(() => { const b = document.querySelector('.study-flaeche').getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
  const pt = (x, y) => [{ x, y, id: 1, radiusX: 4, radiusY: 4, force: 1 }];
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(r.x, r.y) });
  let mitte = null;
  if (!messen) {
    /* Im echten Takt eines Handys (16 ms), ohne auf die Antwort zu warten -
       sonst macht die Umlaufzeit (~40 ms je Ereignis) jeden Fling langsam. */
    const warten = [];
    for (let i = 1; i <= schritte; i++) warten.push(new Promise((ok, nein) => setTimeout(() =>
      cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(r.x + dx * i / schritte, r.y + i * 0.5) }).then(ok, nein), i * dauer / schritte)));
    await Promise.all(warten);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    return { mitte: null };
  }
  for (let i = 1; i <= schritte; i++) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(r.x + dx * i / schritte, r.y + i * 0.5) });
    await p.waitForTimeout(dauer / schritte);
    if (messen && i === Math.ceil(schritte / 2)) mitte = await p.evaluate(() => { const k = document.querySelector('.study-flaeche'); return Math.round(k.getBoundingClientRect().left); });
  }
  await cdp.send('Input.dispatchTouchEvent', { type: abbruch ? 'touchCancel' : 'touchEnd', touchPoints: [] });
  return { x0: Math.round(r.x - (await p.evaluate(() => document.querySelector('.study-flaeche') ? document.querySelector('.study-flaeche').getBoundingClientRect().width / 2 : 0))), mitte };
}
(async () => {
  const b = await start();
  try {
  let fehler = 0;
  const faelle = [
    ['langsam weit rechts', 150, 400, 12, 2, 0],
    ['langsam weit links', -150, 400, 12, 2, 0],
    ['schnell kurz rechts (Fling)', 55, 70, 4, 2, 0],
    ['schnell kurz links (Fling)', -55, 70, 4, 2, 0],
    ['direkt nach Aufdecken (80 ms)', 150, 250, 8, 2, 80],
    ['zu kurz und langsam', 30, 400, 8, 1, 0],
    ['System bricht ab (touchCancel)', 150, 400, 12, 1, 0, true]
  ];
  const auswahl=process.argv.includes('--fling')?faelle.filter(f=>f[0].includes('Fling')):faelle;
  for (const [name, dx, dauer, schritte, soll, nachAufdecken, abbruch] of auswahl) {
    const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800, vorher: async ctx => {
      await ctx.route('**/app.js?*', async r => {
        const source = await (await r.fetch()).text();
        await r.fulfill({contentType:'text/javascript',body:source+'\nwindow.__PRUEF_WISCH=()=>wischStart&&({dx:wischStart.dx,tempo:wischStart.tempo,zeit:wischStart.zeit,spur:wischStart.spur});'});
      });
    } });
    const cdp = await p.context().newCDPSession(p);
    await aktion(p, 'start-session', null, 1200);
    await p.click('.study-aufdecken');
    await p.waitForTimeout(nachAufdecken || 700);
    const vorher = await p.evaluate(() => Math.round(document.querySelector('.study-flaeche').getBoundingClientRect().left));
    await p.evaluate(() => {
      window.__PRUEF_TOUCH=[];
      for(const type of ['pointerdown','pointermove','pointerup','pointercancel']) document.addEventListener(type,e=>{
        window.__PRUEF_TOUCH.push({type,x:e.clientX,t:performance.now(),stamp:e.timeStamp,w:window.__PRUEF_WISCH?.()});
      },true);
    });
    const w = await wisch(p, cdp, dx, dauer, schritte, schritte > 4, abbruch);
    await p.waitForTimeout(700);
    const nr = await karteNr(p);
    const folgt = w.mitte !== null && Math.abs(w.mitte - vorher) > Math.abs(dx) / 4;
    const ok = nr === soll && (soll === 1 || folgt || schritte <= 4) && !p.fehler.length;
    const zurueck = await p.evaluate(() => { const k = document.querySelector('.study-flaeche'); return !k.style.transform || k.style.transform === 'none'; });
    if (!ok) fehler++;
    console.log((ok ? 'OK  ' : 'FEHL') + ' ' + name.padEnd(30) + ' -> Karte ' + nr + ' (soll ' + soll + ') | Karte folgt dem Finger: ' + (w.mitte === null ? '-' : (w.mitte - vorher) + ' px') + (p.fehler.length ? ' | ' + p.fehler.join('|') : ''));
    if(!ok||process.argv.includes('--spur'))console.log('Touch-Spur: '+JSON.stringify(await p.evaluate(()=>window.__PRUEF_TOUCH)));
    await p.context().close();
  }
  console.log(fehler ? fehler + ' Fehler' : 'alles ok');
  process.exitCode = fehler ? 1 : 0;
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
