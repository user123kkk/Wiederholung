/* G-023 (REST-1): Ring und "Heute schon N Antworten" duerfen nicht die
   Antworten eines FREMDEN Bereichs zeigen. a) mehrere Bereiche: nach ein
   paar Bewertungen in b1 muss b1 seine eigene Zahl zeigen, b2 (noch
   unberuehrt) muss "Runde starten" mit leerem Ring zeigen, kein "Heute
   schon". b) genau ein Bereich mit Karten: die alte, exakte Rechnung aus
   dem Tagesprotokoll bleibt bestehen (auch direkt nach dem Laden, ohne
   eigene Bewertung in dieser Sitzung). */
const { start, neueSeite, aktion, GERAETE, vollerStore, tag } = require('./lib');

let fehler = 0;
function pruef(txt, ok) {
  console.log((ok ? 'OK  ' : 'FEHL') + ' ' + txt);
  if (!ok) fehler++;
}

async function leseStapel(p) {
  return p.evaluate(() => {
    const st = document.querySelector('.stapel');
    if (!st) return null;
    const ring = document.querySelector('.ring__fuellung');
    return {
      text: st.innerText.replace(/\s+/g, ' '),
      heuteSchon: /Heute schon/.test(st.innerText),
      knopf: (st.querySelector('.stapel__start') || {}).textContent || '',
      ziel: ring ? getComputedStyle(ring).getPropertyValue('--ziel').trim() : null
    };
  });
}

(async () => {
  const b = await start();

  // a) zwei Bereiche: b1 mit Runde bewertet, b2 unberuehrt mit 2 faelligen Karten
  {
    const st = vollerStore();
    st['users/u1/karten/x1'] = { wort: 'سَمَاءٌ', uebersetzung: 'Himmel', extra: '', stufe: 2, nextReview: tag(0), ersteBewertung: tag(-5), rueckfaelle: 0, quelleId: null, maxStufe: 2, order: 0, bereichId: 'b2' };
    st['users/u1/karten/x2'] = { wort: 'أَرْضٌ', uebersetzung: 'Erde', extra: '', stufe: 2, nextReview: tag(0), ersteBewertung: tag(-5), rueckfaelle: 0, quelleId: null, maxStufe: 2, order: 1, bereichId: 'b2' };
    const { p } = await neueSeite(b, GERAETE.handy, { store: st, warte: 1200 });

    const N = 3;
    await aktion(p, 'start-session', null, 900);
    for (let i = 0; i < N; i++) {
      await p.keyboard.press('Space'); await p.waitForTimeout(500);
      await p.keyboard.press('1'); await p.waitForTimeout(2600);
    }
    await aktion(p, 'end-session', null, 700);

    const b1 = await leseStapel(p);
    pruef('b1 zeigt "Heute schon ' + N + ' Antworten"', b1 && b1.text.includes('Heute schon ' + N + ' Antwort'));
    pruef('b1 zeigt "Weiterlernen"', b1 && b1.knopf.trim() === 'Weiterlernen');

    await aktion(p, 'bereich-sheet-auf', null, 600);
    await p.evaluate(() => { const x = [...document.querySelectorAll('[data-action="select-bereich"]')].find(e => e.dataset.bid === 'b2'); x && x.click(); });
    await p.waitForTimeout(900);

    const b2 = await leseStapel(p);
    pruef('b2 zeigt KEIN "Heute schon"', b2 && b2.heuteSchon === false);
    pruef('b2 zeigt "Runde starten"', b2 && b2.knopf.trim() === 'Runde starten');
    pruef('b2 Ring leer (--ziel 1.000)', b2 && b2.ziel === '1.000');

    console.log('   b1:', b1 && b1.text);
    console.log('   b2:', b2 && b2.text, '| ziel', b2 && b2.ziel);
    console.log('   Fehler:', p.fehler.join('|') || 'ok');
    await p.context().close();
  }

  // b) genau ein Bereich mit Karten, Verlauf schon vor dem Laden gefuellt
  {
    const st = vollerStore();
    st['users/u1'].verlauf[tag(0)] = { w: 5, n: 0 };
    const { p } = await neueSeite(b, GERAETE.handy, { store: st, warte: 1200 });
    const nachLaden = await leseStapel(p);
    pruef('nur ein Bereich: "Heute schon 5 Antworten" direkt nach dem Laden', nachLaden && nachLaden.text.includes('Heute schon 5 Antwort'));
    console.log('   ', nachLaden && nachLaden.text, '|', p.fehler.join('|') || 'ok');
    await p.context().close();
  }

  await b.close();
  process.exit(fehler ? 1 : 0);
})();
