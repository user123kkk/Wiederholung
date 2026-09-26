/* G-033 / TECHNIK-8: Kurzmeldungen (zeigeToast) erreichen Bildschirmleser
   nicht zuverlaessig, weil die Live-Region bisher als Teil von render() mit
   ihrem Text zusammen entstand - viele Bildschirmleser (VoiceOver, NVDA)
   kuendigen nur Aenderungen an einer schon vorhandenen Region an.

   Prueft (siehe 3.17.35):
   (a) #ansage traegt nach zeigeToast() den Meldungstext.
   (b) #ansage bleibt ueber mehrere render()-Durchlaeufe (Tab-Wechsel) hinweg
       dasselbe Element (Identitaet per ===) - anders als die sichtbare
       .toast, die render() jedes Mal neu baut.
   (c) Die sichtbare Meldung hat aria-hidden="true" und kein aria-live/role
       (seit 3.17.37, G-089, bei offenem Karten-Blatt .karte-kopf__ok statt .toast),
       damit nichts doppelt angesagt wird.
   (d) keine Seitenfehler. */
const { start, neueSeite, aktion, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1500 });

  // Referenz auf #ansage merken, dann eine Karte anlegen (loest zeigeToast aus).
  await p.evaluate(() => { window.__ansage = document.getElementById('ansage'); });

  await aktion(p, 'tab-verwalten', null, 1200);
  await aktion(p, 'karte-neu', null, 800);
  await p.fill('#f-wort', 'بَحْرٌ');
  await p.fill('#f-ueb', 'Meer');
  await aktion(p, 'submit-card', null, 800);

  const nachSpeichern = await p.evaluate(() => {
    const ansage = document.getElementById('ansage');
    const toast = document.querySelector('.toast') || document.querySelector('.karte-kopf__ok--an');
    return {
      ansageText: ansage ? ansage.textContent.trim() : null,
      ansageRolle: ansage ? ansage.getAttribute('role') : null,
      ansageLive: ansage ? ansage.getAttribute('aria-live') : null,
      toastAriaHidden: toast ? toast.getAttribute('aria-hidden') : null,
      toastRolle: toast ? toast.getAttribute('role') : null,
      toastLive: toast ? toast.getAttribute('aria-live') : null,
      toastText: toast ? toast.innerText.trim() : null,
    };
  });

  let fehler = 0;
  const pruef = (bez, ok, info) => {
    if (!ok) fehler++;
    console.log((ok ? 'OK  ' : 'FEHL') + ' ' + bez + (info ? ' | ' + info : ''));
  };

  // (a) #ansage hat den Text der Meldung.
  pruef('(a) #ansage traegt Meldungstext', !!nachSpeichern.ansageText,
    'Text="' + nachSpeichern.ansageText + '" | Toast="' + nachSpeichern.toastText + '"');
  pruef('(a) #ansage hat role=status/aria-live=polite', nachSpeichern.ansageRolle === 'status' && nachSpeichern.ansageLive === 'polite',
    'role=' + nachSpeichern.ansageRolle + ' aria-live=' + nachSpeichern.ansageLive);

  // (c) sichtbare .toast: aria-hidden, kein aria-live/role.
  pruef('(c) sichtbare Meldung hat aria-hidden=true', nachSpeichern.toastAriaHidden === 'true', 'aria-hidden=' + nachSpeichern.toastAriaHidden);
  pruef('(c) sichtbare Meldung ohne role/aria-live', !nachSpeichern.toastRolle && !nachSpeichern.toastLive,
    'role=' + nachSpeichern.toastRolle + ' aria-live=' + nachSpeichern.toastLive);

  // (b) #ansage bleibt dasselbe Element ueber mehrere render() (Tab-Wechsel).
  await aktion(p, 'tab-fortschritt', null, 900);
  await aktion(p, 'tab-lernen', null, 900);
  await aktion(p, 'tab-verwalten', null, 900);
  const identisch = await p.evaluate(() => document.getElementById('ansage') === window.__ansage);
  pruef('(b) #ansage bleibt dasselbe Element nach mehreren render()', identisch);

  // (d) keine Seitenfehler.
  pruef('(d) keine Seitenfehler', p.fehler.length === 0, p.fehler.join(' / '));

  await p.context().close();
  await b.close();
  console.log(fehler === 0 ? 'Alle Faelle richtig.' : (fehler + ' Fehlschlaege.'));
  process.exit(fehler === 0 ? 0 : 1);
})();
