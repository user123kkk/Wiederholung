/* G-032 (TECHNIK-7): Fokusfalle und Fokus-Rueckgabe am Fehler-Modal.
   Das Modal liegt bewusst ausserhalb von #app (index.html) und wurde von der
   allgemeinen .dlg-Fokusfalle deshalb nicht erfasst - siehe app.js
   openErrorModal()/closeErrorModal() und den Tab-Keydown-Listener direkt
   davor. Prueft eigenstaendig, nicht ueber t_fokus.js/t_fokus2.js (die decken
   das Modal nur unter mehreren anderen Bloettern ab, siehe deren "fehler-
   modal"/"open-error-modal"-Zeilen). Exit 1 bei jeder Abweichung. */
const { start, neueSeite, aktion, GERAETE } = require('./lib');

let fehler = 0;
function pruefe(bedingung, text) {
  if (bedingung) { console.log('OK   ', text); }
  else { console.log('FEHL ', text); fehler++; }
}

(async () => {
  const b = await start();

  // (a) 25x Tab nach dem Oeffnen: 0 Mal ausserhalb des Modals.
  {
    const { p, ctx } = await neueSeite(b, GERAETE.desktop, { warte: 1800 });
    await aktion(p, 'einstellungen', null, 900);
    await aktion(p, 'open-error-modal', null, 800);
    const spur = [];
    for (let i = 0; i < 25; i++) {
      await p.keyboard.press('Tab');
      spur.push(await p.evaluate(() => {
        const a = document.activeElement;
        if (!a || a === document.body) return 'body';
        const imDialog = !!a.closest('.error-modal__dialog');
        return (imDialog ? 'IM-DIALOG ' : 'DRAUSSEN ') + (a.dataset.action || a.id || a.tagName);
      }));
    }
    const draussen = spur.filter(s => !s.startsWith('IM-DIALOG')).length;
    console.log('(a) 25x Tab: ausserhalb', draussen, '(' + [...new Set(spur)].slice(0, 6).join(', ') + ')');
    pruefe(draussen === 0, '(a) kein Tab verlaesst das offene Fehler-Modal');
    await ctx.close();
  }

  // (b) Ueber den Oeffner geoeffnet, Escape -> Fokus zurueck auf den Oeffner.
  {
    const { p, ctx } = await neueSeite(b, GERAETE.desktop, { warte: 1800 });
    await aktion(p, 'einstellungen', null, 900);
    await p.evaluate(() => document.querySelector('[data-action="open-error-modal"]').focus());
    const vorher = await p.evaluate(() => document.activeElement.dataset.action);
    await aktion(p, 'open-error-modal', null, 800);
    await p.keyboard.press('Escape');
    await p.waitForTimeout(500);
    const nachher = await p.evaluate(() => document.activeElement.dataset.action || document.activeElement.tagName);
    const appInert = await p.evaluate(() => document.getElementById('app').hasAttribute('inert'));
    console.log('(b) vorher', vorher, '| nach Escape', nachher, '| #app inert danach', appInert);
    pruefe(nachher === 'open-error-modal', '(b) Escape gibt den Fokus an den Oeffner zurueck');
    pruefe(!appInert, '(d) #app ist nach dem Schliessen nicht mehr inert (Escape)');
    await ctx.close();
  }

  // (c) Ueber den X-Knopf geschlossen -> derselbe Rueckweg.
  /* aktion() klickt per el.click() (synthetisch) - anders als ein echter
     Klick fokussiert das den Knopf nicht von selbst. Der Oeffner wird daher
     wie bei einer echten Bedienung vorher explizit fokussiert, sonst wuerde
     dieser Test nur pruefen, was app.js schon vorfand (body), nicht was es
     zurueckgibt. */
  {
    const { p, ctx } = await neueSeite(b, GERAETE.desktop, { warte: 1800 });
    await aktion(p, 'einstellungen', null, 900);
    await p.evaluate(() => document.querySelector('[data-action="open-error-modal"]').focus());
    await aktion(p, 'open-error-modal', null, 800);
    await aktion(p, 'close-error-modal', null, 500);
    const nachher = await p.evaluate(() => document.activeElement.dataset.action || document.activeElement.tagName);
    const appInert = await p.evaluate(() => document.getElementById('app').hasAttribute('inert'));
    console.log('(c) nach X-Knopf', nachher, '| #app inert danach', appInert);
    pruefe(nachher === 'open-error-modal', '(c) X-Knopf gibt den Fokus an den Oeffner zurueck');
    pruefe(!appInert, '(d) #app ist nach dem Schliessen nicht mehr inert (X-Knopf)');
    await ctx.close();
  }

  await b.close();
  if (fehler > 0) { console.log(fehler, 'Pruefung(en) fehlgeschlagen'); process.exit(1); }
  console.log('alle Pruefungen bestanden');
})();
