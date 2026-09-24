/* Die Beispielkarte auf Bildschirm 0 des Einstiegs.

   Vorgeschichte: 3.17.21 prueft hier, dass der ERSTE Tipp nach der
   Intro-Drehung wirklich eine sichtbare Drehung ausloest (Betreiber-Fund
   24.09.2026: "die karte dreht sich von kitaab um zu buch, dann wieder zu
   kitaab, und wenn man dann drauf drueckt steht da ploetzlich einfach trocken
   buch").

   3.17.22 aendert das Verhalten selbst (Betreiber 24.09.2026: "soll kitaab
   nicht einmal ins deutsche nur damit es direkt wieder in arabische umgedreht
   wird. einfach kitaab lang genug angezeigt lassen, dann ins deutsche, es
   soll ja alles vom user verfolgt werden koennen"). Geprueft wird jetzt:
     1. Nach dem Ankommen steht die Karte eine Weile auf Arabisch.
     2. Danach dreht sie sich EINMAL und bleibt auf der Uebersetzung stehen
        (Klasse --hinten, aria-pressed="true").
     3. Der erste Tipp danach dreht sichtbar zurueck (transitionrun auf
        transform), der zweite wieder vor. */
const { start, neueSeite, aktion, GERAETE } = require('./lib');

const HALTEN = 2400;   // EINSTIEG_HERO_HALTEN_MS in app.js

(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { user: null, warte: 1200 });
  const zustand = () => p.evaluate(() => {
    const k = document.querySelector('.einstieg-hero__karte');
    return { hinten: k.classList.contains('einstieg-hero__karte--hinten'),
      pressed: k.getAttribute('aria-pressed'),
      transitions: window.__trans ? window.__trans.length : 0 };
  });
  await p.evaluate(() => {
    window.__trans = [];
    document.querySelector('.einstieg-hero__dreh').addEventListener('transitionrun', e => {
      if (e.propertyName === 'transform') window.__trans.push(Math.round(performance.now()));
    });
  });
  const frueh = await zustand();                       // deutlich vor Ablauf der Haltezeit
  await p.waitForTimeout(HALTEN + 900);
  const nachHalten = await zustand();
  await aktion(p, 'einstieg-hero-dreh', null, 900);
  const nachErstemTipp = await zustand();
  await aktion(p, 'einstieg-hero-dreh', null, 900);
  const nachZweitemTipp = await zustand();

  const funde = [];
  if (frueh.hinten) funde.push('Karte war schon vor Ablauf der Haltezeit gedreht (zu frueh)');
  if (!nachHalten.hinten) funde.push('Karte hat sich nach der Haltezeit NICHT von selbst gedreht');
  if (nachHalten.pressed !== 'true') funde.push('aria-pressed nach der Drehung nicht "true"');
  if (nachHalten.transitions < 1) funde.push('Die Drehung war keine sichtbare transition');
  if (nachErstemTipp.hinten) funde.push('Erster Tipp hat die Karte nicht auf Arabisch zurueckgedreht');
  if (nachErstemTipp.transitions < 2) funde.push('ERSTER Tipp hat KEINE transform-transition ausgeloest');
  if (nachErstemTipp.pressed !== 'false') funde.push('aria-pressed nach erstem Tipp nicht "false"');
  if (!nachZweitemTipp.hinten) funde.push('Zweiter Tipp hat nicht wieder auf die Uebersetzung gedreht');
  if (nachZweitemTipp.transitions < 3) funde.push('ZWEITER Tipp hat keine weitere transition ausgeloest');

  console.log('frueh:', JSON.stringify(frueh));
  console.log('nach Haltezeit:', JSON.stringify(nachHalten));
  console.log('nach 1. Tipp:', JSON.stringify(nachErstemTipp));
  console.log('nach 2. Tipp:', JSON.stringify(nachZweitemTipp));
  console.log(p.fehler.length ? 'Konsole: ' + p.fehler.join(' | ') : 'Konsole: ok');
  console.log(funde.length ? ('FEHLER: ' + funde.join(' / ')) : 'Alles richtig.');
  await b.close();
  process.exit(funde.length ? 1 : 0);
})();
