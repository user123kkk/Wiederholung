/* 3.17.6: Rueckgaengig nimmt die Antwort auch aus dem Tagesprotokoll. */
const { start, neueSeite, aktion, GERAETE, tag } = require('./lib');
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1500 });
  const heute = tag(0);
  const lies = () => p.evaluate(t => { const d = window.__FB.store.get('users/u1'); return JSON.stringify((d.verlauf || {})[t] || null); }, heute);
  const vorher = await lies();
  await aktion(p, 'start-session', null, 900);
  const ergebnis = [];
  for (let i = 0; i < 3; i++) {
    await p.keyboard.press('Space'); await p.waitForTimeout(600);
    await p.keyboard.press(String(1 + i)); await p.waitForTimeout(2600);
    const nachBewerten = await lies();
    await aktion(p, 'undo-grade', null, 900);
    await p.waitForTimeout(300);
    ergebnis.push(nachBewerten + ' -> Rueckgaengig ' + await lies());
    await p.keyboard.press(String(1 + i)); await p.waitForTimeout(2600);
  }
  console.log('vorher', vorher, '\n ' + ergebnis.join('\n ') + '\n danach', await lies(), '|', p.fehler.join('|') || 'ok');
  await b.close();
})();
