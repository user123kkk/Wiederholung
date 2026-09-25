/* Frage 18 (Serie/Streak, Luecken-Regel): prueft serieAktuell() ueber die
   ECHTE app.js (kein Nachbau der Formel) - Verlauf frei zusammengesetzt,
   Anzeige auf dem Lernen-Tab (.serie-zahl strong) gelesen.

   Warum ueberhaupt ein eigener Test statt Code-Review: Die alte, verworfene
   Vorgaenger-Regel ("eine Luecke je sieben Tage", vor 2.14.0) wurde laut
   CHANGELOG genau deshalb aufgegeben, weil sie sich "beim Rueckwaertszaehlen
   nicht sauber pruefen liess". Diese neue Fassung ist eine reine Funktion
   (kein gespeicherter Zwischenstand), aber die Beweislast liegt trotzdem
   beim Test, nicht beim Vertrauen in die eigene Herleitung. */
const { start, neueSeite, vollerStore, tag, GERAETE } = require('./lib');

/* to = Zuordnung Tagesoffset -> gelernt ja/nein. offsets: 0 = heute,
   1 = gestern, usw. Nicht genannte Offsets bleiben ohne Eintrag (Luecke -
   auch "vor dem Beginn des Verlaufs" zaehlt als Luecke, siehe Kommentar in
   app.js). */
function verlaufAus(gelernteOffsets) {
  const v = {};
  for (const off of gelernteOffsets) v[tag(-off)] = { w: 1, n: 0 };
  return v;
}
function bereich(offsets) { const a = []; for (let i = offsets[0]; i <= offsets[1]; i++) a.push(i); return a; }

/* WICHTIG: streak MUSS ein gueltiges sockel/sockelBis-Paar mitbringen.
   serieSockelSichern() (app.js) stempelt sonst beim ersten Laden selbst
   sockel:0/sockelBis:heute hinein (fuer den echten Umstieg von vor 2.14.0
   gedacht) - das wuerde serieAktuell() sofort auf den Sockel kurzschliessen
   und jede hier konstruierte Verlaufs-Geschichte ignorieren. sockelBis weit
   in der Vergangenheit haelt den Kurzschluss aus dem Testbereich heraus. */
const KEIN_SOCKEL = { sockel: 0, sockelBis: tag(-999) };

const FAELLE = [
  {
    name: 'ohne Luecke, 10 Tage',
    verlauf: verlaufAus(bereich([0, 9])),
    streak: KEIN_SOCKEL,
    erwartet: 10
  },
  {
    name: 'eine alte Luecke (Tag 7), danach 7 Tage gelernt - voll erholt',
    verlauf: verlaufAus([...bereich([0, 6]), ...bereich([8, 14])]),
    streak: KEIN_SOCKEL,
    erwartet: 14
  },
  {
    name: 'zwei Luecken (Tag 7 und 15), je 7 Tage dazwischen - beide verziehen',
    verlauf: verlaufAus([...bereich([0, 6]), ...bereich([8, 14]), ...bereich([16, 22])]),
    streak: KEIN_SOCKEL,
    erwartet: 21
  },
  {
    name: 'zweite Luecke zu frueh (nur 3 Tage seit der ersten) - bricht ab',
    verlauf: verlaufAus([...bereich([0, 2]), ...bereich([4, 6]), ...bereich([8, 14])]),
    streak: KEIN_SOCKEL,
    erwartet: 6
  },
  {
    name: 'heute und gestern noch offen, Serie von davor bleibt stehen',
    verlauf: verlaufAus(bereich([2, 11])),
    streak: KEIN_SOCKEL,
    erwartet: 10
  },
  {
    /* 3.17.28: Konto seit 2.14.0 - der Sockel 0 entsteht heute beim ersten
       Laden. Vorher zeigte das 0, obwohl heute gelernt wurde. */
    name: 'Sockel 0 von heute (neues Konto), heute gelernt - zaehlt',
    verlauf: verlaufAus([0]),
    streak: { sockel: 0, sockelBis: tag(0) },
    erwartet: 1
  },
  {
    name: 'Sockel 0 vor 3 Tagen gesetzt, seitdem jeden Tag - Tag des Sockels zaehlt mit',
    verlauf: verlaufAus(bereich([0, 5])),
    streak: { sockel: 0, sockelBis: tag(-3) },
    erwartet: 4
  },
  {
    name: 'Sockel (Alt-Konto vor 2.14.0) traegt weiter, unveraendert',
    verlauf: verlaufAus(bereich([0, 4])),
    streak: { sockel: 42, sockelBis: tag(-5) },
    erwartet: 47
  }
];

(async () => {
  const b = await start();
  let fehler = 0;
  for (const f of FAELLE) {
    /* NICHT leer: true - ein Bereich ohne Karten zeigt die Start-Liste statt
       des Lernen-Bildschirms, ".serie-karte" faellt dann ganz weg. */
    const store = vollerStore();
    store['users/u1'].verlauf = f.verlauf;
    store['users/u1'].streak = f.streak;
    const { p } = await neueSeite(b, GERAETE.handy, { store, warte: 1200 });
    const text = await p.evaluate(() => {
      const el = document.querySelector('.serie-zahl strong');
      return el ? el.textContent.trim() : '0';
    });
    const zahl = Number(text);
    const ok = zahl === f.erwartet;
    if (!ok) fehler++;
    console.log((ok ? 'OK  ' : 'FEHL') + ' ' + f.name + ' | erwartet ' + f.erwartet + ' | gemessen ' + zahl +
      (p.fehler.length ? ' | Konsole: ' + p.fehler.join(' / ') : ''));
    await p.context().close();
  }
  await b.close();
  console.log(fehler === 0 ? 'Alle Faelle richtig.' : (fehler + ' von ' + FAELLE.length + ' falsch.'));
  process.exit(fehler === 0 ? 0 : 1);
})();
