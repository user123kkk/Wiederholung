/* G-077 (3.17.33, LERNEN-10): "Merken" schrieb bereiche.<bid>.sets.<sid>.cardIds
   bisher als GANZE Liste. Merkt Geraet A eine Karte und kurz danach Geraet B
   (auf veraltetem Stand) eine andere, ueberschrieb B die Liste ohne A - A war
   still weg. Jetzt schreibt "Merken" nur die eine ID gezielt (arrayUnion /
   arrayRemove). Gegenprobe mit dem alten Vollschreiben: FEHL (siehe LOGBUCH).
   node t_merken_zwei.js */
const { start, neueSeite, aktion, GERAETE, vollerStore } = require('./lib.js');

// Sorgt dafuer, dass fuer eine data-action ein Knopf existiert, auch wenn die
// Lernoberflaeche gerade keinen zeigt - aktion() klickt ihn ueber den
// zentralen Klick-Listener, wie ein Mensch es taete.
async function knopfSicherstellen(p, action, id) {
  await p.evaluate(([a, id]) => {
    if (document.querySelector('[data-action="' + a + '"][data-id="' + id + '"]')) return;
    const k = document.createElement('button');
    k.dataset.action = a; k.dataset.id = id; k.textContent = 'Merken (Test)';
    document.body.appendChild(k);
  }, [action, id]);
}

function setDerBereich(p, bid) {
  return p.evaluate(bid => window.__FB.store.get('users/u1/bereiche/' + bid), bid);
}

(async () => {
  const b = await start();
  let fehler = 0;
  const pruefe = (name, ok) => { console.log((ok ? 'OK  ' : 'FEHL') + ' ' + name); if (!ok) fehler++; };

  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1500, store: vollerStore() });
  const A = 'k0', B = 'k1', C = 'k2';

  // (a) Karte A merken
  await knopfSicherstellen(p, 'karte-merken', A);
  await aktion(p, 'karte-merken', A, 900);
  let bereich = await setDerBereich(p, 'b1');
  const eintrag = Object.entries(bereich.sets || {}).find(([, s]) => s.name === 'Schwierige Wörter');
  pruefe('Speicherkarte "Schwierige Wörter" angelegt', !!eintrag);
  const sid = eintrag ? eintrag[0] : null;
  pruefe('Nach (a): A drin', sid && bereich.sets[sid].cardIds.includes(A));

  // (b) "zweites Geraet": B kommt direkt im Store dazu, ohne dass die Seite
  // (ihr geladener Zustand) davon erfaehrt.
  await p.evaluate(([sid, B]) => {
    const d = window.__FB.store.get('users/u1/bereiche/b1');
    d.sets[sid].cardIds.push(B);
  }, [sid, B]);
  bereich = await setDerBereich(p, 'b1');
  pruefe('Nach (b): B im Store, Seite weiss nichts davon', bereich.sets[sid].cardIds.includes(B));

  // (c) auf der Seite Karte C merken (mit dem veralteten lokalen Zustand)
  await knopfSicherstellen(p, 'karte-merken', C);
  await aktion(p, 'karte-merken', C, 900);

  // (d) A, B und C muessen alle drin sein
  bereich = await setDerBereich(p, 'b1');
  const nachC = bereich.sets[sid].cardIds;
  pruefe('Nach (c)/(d): A weiterhin drin', nachC.includes(A));
  pruefe('Nach (c)/(d): B weiterhin drin (nicht ueberschrieben)', nachC.includes(B));
  pruefe('Nach (c)/(d): C dazugekommen', nachC.includes(C));

  // (e) A wieder herausnehmen (zweiter Merken-Tipp)
  await aktion(p, 'karte-merken', A, 900);
  bereich = await setDerBereich(p, 'b1');
  const nachE = bereich.sets[sid].cardIds;
  pruefe('Nach (e): A draussen', !nachE.includes(A));
  pruefe('Nach (e): B weiterhin drin', nachE.includes(B));
  pruefe('Nach (e): C weiterhin drin', nachE.includes(C));

  pruefe('Keine Seitenfehler', !p.fehler.length);
  if (p.fehler.length) console.log(p.fehler.join('\n'));

  console.log(fehler ? fehler + ' Fehler' : 'alles ok');
  await p.context().close();
  await b.close();
  process.exit(fehler ? 1 : 0);
})();
