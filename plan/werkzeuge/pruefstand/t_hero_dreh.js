/* Echter Fund (Betreiber, 24.09.2026): "die karte dreht sich von kitaab um
   zu buch, dann wieder zu kitaab, und wenn man dann drauf drueckt steht da
   ploetzlich einfach trocken buch" - der ERSTE Tipp nach der Intro-Drehung
   sprang ohne sichtbare Drehung direkt zum Endzustand, erst der zweite Tipp
   drehte sich sichtbar. Prueft, dass beim ERSTEN Tipp tatsaechlich eine
   CSS-transition auf .einstieg-hero__dreh laeuft (transitionrun-Ereignis),
   nicht nur ein Klassenwechsel ohne sichtbaren Uebergang. */
const { start, neueSeite, aktion, GERAETE } = require('./lib');

(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { user: null, warte: 1800 });
  // Die Intro-Drehung (1000ms Verzoegerung + 1600ms Dauer) muss abgeschlossen sein.
  await p.waitForTimeout(1200);
  await p.evaluate(() => {
    window.__trans = [];
    document.querySelector('.einstieg-hero__dreh').addEventListener('transitionrun', e => {
      if (e.propertyName === 'transform') window.__trans.push(Math.round(performance.now()));
    });
  });
  const vorher = await p.evaluate(() => ({
    hinten: document.querySelector('.einstieg-hero__karte').classList.contains('einstieg-hero__karte--hinten'),
    intro: document.querySelector('.einstieg-hero__karte').classList.contains('einstieg-hero__karte--intro'),
    pressed: document.querySelector('.einstieg-hero__karte').getAttribute('aria-pressed')
  }));
  await aktion(p, 'einstieg-hero-dreh', null, 300);
  const nachErstemTipp = await p.evaluate(() => ({
    transitions: window.__trans.length,
    hinten: document.querySelector('.einstieg-hero__karte').classList.contains('einstieg-hero__karte--hinten'),
    pressed: document.querySelector('.einstieg-hero__karte').getAttribute('aria-pressed')
  }));
  await aktion(p, 'einstieg-hero-dreh', null, 300);
  const nachZweitemTipp = await p.evaluate(() => ({
    transitions: window.__trans.length,
    hinten: document.querySelector('.einstieg-hero__karte').classList.contains('einstieg-hero__karte--hinten')
  }));

  const funde = [];
  if (!vorher.intro) funde.push('Intro-Klasse war vor dem ersten Tipp schon weg (unerwartet)');
  if (nachErstemTipp.transitions < 1) funde.push('ERSTER Tipp hat KEINE transform-transition ausgeloest (der gemeldete Fehler)');
  if (!nachErstemTipp.hinten) funde.push('Nach dem ersten Tipp steht die Karte nicht auf "hinten"');
  if (nachErstemTipp.pressed !== 'true') funde.push('aria-pressed nach erstem Tipp nicht "true"');
  if (nachZweitemTipp.transitions < 2) funde.push('ZWEITER Tipp hat keine weitere transition ausgeloest');
  if (nachZweitemTipp.hinten) funde.push('Nach dem zweiten Tipp steht die Karte noch auf "hinten" (sollte zurueck sein)');

  console.log('vorher:', JSON.stringify(vorher));
  console.log('nach 1. Tipp:', JSON.stringify(nachErstemTipp));
  console.log('nach 2. Tipp:', JSON.stringify(nachZweitemTipp));
  console.log(p.fehler.length ? 'Konsole: ' + p.fehler.join(' | ') : 'Konsole: ok');
  console.log(funde.length ? ('FEHLER: ' + funde.join(' / ')) : 'Alles richtig.');
  await b.close();
  process.exit(funde.length ? 1 : 0);
})();
