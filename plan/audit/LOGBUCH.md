# Logbuch: Prüfschleife

Letzter Eintrag zuerst. Auftrag: [`AUFTRAG.md`](AUFTRAG.md).
Routine: `trig_016y2uuWtQZ4yrCzAhkZsLQn`, stündlich zur Minute 50 (UTC), weckt
die Session `session_01AFmawb4fvtC6x7d1U1ExLT`.

| Nr | Station | Stand |
|---|---|---|
| 1 | Start | offen |
| 2 | Einstieg | offen |
| 3 | Anmelden | offen |
| 4 | Bestätigung | offen |
| 5 | Lernen-Start | offen |
| 6 | Lernrunde | teilweise (Umdrehen, Bewerten, Sprünge, Ring – v3.14.0/3.15.0); Rest offen |
| 7 | Rundenende | offen |
| 8 | Üben | weitgehend (v3.15.0: Auswahl, Bewertung, Ende, Schreiben-Tinte); Rest: Schreiben im Vollbild, Speicherkarten-Liste |
| 9–18 | … | offen |

---

### 2026-09-24 — Hick-Durchgang über das ganze Tool, „Tage gelernt" (v3.16.0)

**Anlass:** Betreiber (Vorrang vor der Schleife): „mach einfach, und achte
dabei auf hick's law" (= offene Fragen 14/15 selbst entscheiden), „bei profil
wie viele tage gelernt, muss da auf jeden überprüft werden weil hab das tool
locker über 30 tage genutzt", „deine karten [...] zu viel platz [...] stufen
und farbe erklärt", „sachen im doppelt gemoppelt raus", „gesamtes tool".

**Vorgehen:** Inventar jedes Bildschirms (`plan/werkzeuge/pruefstand/
t_inventar.js`, `t_inventar2.js`: Text-Gliederung + Ganzseitenfotos), dann
jede Information gegen die anderen Bildschirme gehalten.

**Befund „Tage gelernt":** `Object.keys(verlauf).length`. Das Protokoll gibt
es seit 2.8.0 (7.9.2026), es zählt nur Tage mit Bewertung, hält 120 Tage.
`ersteBewertung` existiert erst seit 1.6.0 (3.9.2026) und nur für Tage mit
neuen Karten. Die Tage des Betreibers vor dem 7.9. sind **nirgends
gespeichert** – nicht rekonstruierbar.

**Geändert (app.js):** Profil (`renderEinstellungen`) ohne Zahlenreihe, neu
`kontoSeit()` („Dabei seit …" aus `currentUser.metadata.creationTime`);
Einstellungen-Kopf ohne „Fertig"; `tagGelernt()` + Feld `u` im Protokoll
(`normVerlauf`, `verlaufZaehle`, `verlaufZusammen`, `verlaufNachschicken`,
`verlaufSumme`), alle Serien-/Tagesprüfungen über `tagGelernt`
(`serieAktuell`, `lernenSerie`, `lernenStapel`, `renderRundenEnde`,
`startListe`), `gradeCard` zählt Übungsantworten (`u`); Fortschritt:
`fortschrittHeute`/`fortschrittTrend` entfernt, `fortschrittWochen` =
Zahl + Vergleich + Kalender + Übungszeile, Legende kompakt ohne Nullen,
Umschalter weg (`ui.statsScope` fest „alle"), Lektionen-Zeile für den offenen
Bereich; Lernen ohne doppelte „fällig"-Zeile, `trotzdem-ueben` öffnet Üben,
Alles-erledigt-Banner nur bei mehreren Bereichen; Verwalten: Stand-Punkte
statt Plakette, Zieh-Hinweis nur bei mehreren Seiten, Suchbereich nur beim
Suchen; Kartenblatt ohne „– Pflicht", Notiz mit Platzhalter; Rundenende ohne
„Fertig" in der Kopfzeile; zwei Einleitungstexte gekürzt. Version 3.16.0.
**Geändert (styles.css):** `.profil__seit` (statt `.profil__zahlen`),
`.stat-legend--kompakt`, `.wochen-kopf`, `.wochen-ueben`,
`.card-row__stand`, `.liste-suchbereich`.

**Entscheidung:**
- **Frage 15 (Üben im Fortschritt): gebaut, ohne Serie.** Ein reiner
  Übungstag füllt keinen Wochenpunkt, kein Kalenderkästchen, hält keine
  Serie. Geprüft: 6 Übungsantworten → Serie und Woche unverändert; danach
  eine echte Runde → heutiger Punkt gefüllt.
- **Frage 14 (Analytics): nicht gebaut.** Die Datenschutzerklärung verspricht
  wörtlich „Keine Werbung, kein Tracking, keine Analyse-Dienste" und „keine
  Analyse des Nutzungsverhaltens". Jede Zählung bräche das öffentliche
  Versprechen an die Nutzer:innen oder müsste es ändern – das ist keine
  Gestaltungsfrage, die „mach einfach" abdeckt. Dem Betreiber als Ja/Nein
  vorgelegt („Zählen ja?"); bei Ja: anonyme Tageszähler ohne Kennung +
  neuer Absatz in der Datenschutzerklärung + Firestore-Regel (die
  `veroeffentlichen.bat` NICHT mitspielt – sie deployt nur Hosting).
- **Serie nur noch auf Lernen**, nicht im Fortschritt: Lernen ist der Ort,
  an den man täglich kommt (Rückkehr-Drang), Fortschritt der Ort für „wie
  stehe ich da".
- **„Serie fortsetzen" entfällt** mit `fortschrittHeute`: hing an
  `streak.gerissenAm`, das seit 2.14.0 nie gesetzt wird (toter Hinweis).
- **Einstieg nicht umgebaut:** Der Betreiber will ihn selbst durchgehen;
  im Inventar keine Doppelung gefunden, die nicht bewusst ist (Echo-Sätze).

**Geprüft:** Kontrast 0; Sprünge Lernen/Üben 0 px (Ausnahme bekannt: 4 px am
360-px-Handy bei Rückfall + Notiz); `t_hick.js` hell und dunkel (Profil,
Fortschritt, Suchbereich an/aus, Formular, Rundenende, Trotzdem üben, Serie
bei reinem Üben); `t_ueben.js`, `t_sicher.js`; iPad + Desktop; Affentest
200 (Handy) + 150 (iPad) Schritte, 0 Befunde.

**Offen:** Frage 14 (Ja/Nein des Betreibers). J1.
**Nächste Station:** 1 (Start)

---

### 2026-09-24 — Betreiber-Rückmeldung zu Üben, Tinte, Ring (v3.15.0)

**Anlass:** Betreiber (hat Vorrang vor der Schleife): Üben überladen, Banner
auf jeder Karte unnötig, Schreiben dunkel auf dunkel, Bewertungsknöpfe ins
Üben zurück, Üben evtl. im Fortschritt zählen, Umrandungs-Animation aus dem
Einstieg durchgängig, Analytics notieren, „alles durchdenken".

**Geändert (app.js):** `drawStrokes()` Farben aus `--text-1`/`--border-strong`;
`renderSession()` – Kopfzeilen-Hinweis erste Übungskarte (`.mitte-wechsel`),
Üben mit Knopf + antippbarer Karte + Bewertungszeile (eigene Unterzeilen),
Raster-Mitte (`.study-card__oben/__unten`), `study-flaeche--wartet`, Tipp-Satz
nur bei `!s.zug`; `leechHinweis()` gekürzt; `gradeCard()` zählt auch im Üben,
kein Neumischen; Tastatur/Tipp-irgendwo decken nur noch auf; Wischen auch im
Üben; `renderRundenEnde()` mit Übungsfassung + `drill-nochmal`;
Übungsauswahl neu (`ui.drillGruppen`, `gruppenName`, `drillGruppenKarten`,
`startDrillGruppen`, `case "stufe-chip"` an/aus); `waehleStufe()` und
`startDrill(min,max)` entfernt (unbenutzt); Version 3.15.0.
**Geändert (styles.css):** `--paper-500` (dunkel), `--cinnabar-400`,
`--verdigris-400` (hell/dunkel), `.grade-row .sub` ohne Deckkraft,
`.badge.zustand-frisch` hell; `karte-einladen`, `geist-glanz-*`,
`karte-schatten` über `::before`-Deckkraft; `.segment`, `input.schalter`,
`.drill-*`, `.mitte-wechsel`, `.study-card__mitte` als Raster,
`.leech-banner` mit Zeichen daneben.
**Neu:** `plan/werkzeuge/pruefstand/kontrast.js` + `t_kontrast.js`,
`t_ueben.js`, `t_sprung_ueben.js`, `t_ring.js`, `t_fotos_runde.js`;
`plan/analytics/GERUEST.md`; offene Fragen 14 (Analytics) und 15 (Üben im
Fortschritt) in `plan/PLAN.md`.

**Entscheidung:**
- **Schreiben bleibt**, aber als Schalter mit Unterzeile statt Haken mit
  Klammertext. Ob es ganz wegfällt, kann erst Nutzung zeigen (Frage 14) –
  Entfernen wäre nicht rückgängig zu machen für die, die es benutzen.
- **Bewertung im Üben wirkt nur auf die Runde.** Alles andere hieße, die
  Lernlogik zu ändern (tabu). Deshalb eigene Unterzeilen („passt", „sitzt")
  statt „morgen/später wieder".
- **Üben zählt (noch) nicht im Fortschritt:** Die Anzeige wäre leicht, aber
  ob ein Übungstag die Serie hält, ist eine Entscheidung des Betreibers
  (Frage 15, Empfehlung: nein).
- **Analytics nicht gebaut:** braucht Rechtsprüfung und eine Wahl (Frage 14).
- **Kontrast wird jetzt gemessen, nicht angeschaut** – die dunkle Tinte war
  genau die Sorte Fehler, die man auf Fotos übersieht. `t_kontrast.js` gehört
  ab jetzt zu jeder Runde der Schleife.

**Geprüft:** Kontrast 0 Funde (vorher 48); Sprünge: Aufdecken 0 px, Karte zu
Karte 0 px (Ausnahme 4 px am 360-px-Handy, wenn Rückfall-Hinweis und Notiz
zusammenkommen); Üben komplett (Auswahl, 12 Bewertungen, Ende, Nochmal,
Schreiben hell/dunkel); Ring und Aufleuchten Bild für Bild; Regressionstests;
Affentest 200 + 150 Schritte, 0 Befunde.

**Offen:** Fragen 14 und 15 (`plan/PLAN.md`).
**Nächste Station:** 1 (Start)

---

### 2026-09-24 — Schleife eingerichtet; Karte dreht sich wirklich (v3.14.0)

**Anlass:** Betreiber: „lern modus zumindest kann man karte nur umdrehen wenn
man auf antwort anzeigen drückt, soll das? bitte nimm kritik nicht akzeptant
immer an. sonst ist karten umdrehen [...] sehr unsatisfying. knöpfe garnicht
[...] versuch selbst eine loop zu erstellen [...] von 1 bis ende".

**Geändert (app.js):** `renderSession()` – Karte aus zwei Seiten
(`.karte-dreh`, `.karte-seite--vorn/--hinten`), Karte trägt im Lernen
`data-action="reveal"`, Platzhalter für „Merken", Notiz und Rückfall-Hinweis
vor dem Aufdecken; neu `leechHinweis()`, `kartenAbflug()` (aus `gradeCard()`
gerufen); `revealAnswer()` mit Doppeltipp-Sperre und `fuehlbar(8)`;
`stufenBereichName()` → „alle Karten"; Üben-Hinweis mit Abstand wie die
Bewertungszeile; Version 3.14.0.
**Geändert (styles.css):** `.study-flaeche` nur noch Griff, Aussehen auf
`.karte-seite`; `karte-wende`, `karte-hebt`, `karte-schatten`;
`.karte-geist--*` + `geist-*`; `.study-aufdecken`/`.grade-row button` 58 px;
`karte-kommt` ohne Füllmodus `both`.
**Neu:** `plan/audit/AUFTRAG.md`, dieses Logbuch,
`plan/werkzeuge/pruefstand/` (Prüfstand aus dem Scratchpad ins Repo geholt,
sonst stünde die Schleife nach einem Container-Neustart ohne Werkzeug da).

**Entscheidung:**
- **Antippen deckt auf – die Kritik stimmt, die alte Begründung nicht mehr.**
  2.16.0 hatte bewusst nur den Knopf zugelassen („wer zielen muss, soll nicht
  aus Versehen aufdecken"). Das galt einem Tipp *irgendwo*. Die Karte selbst
  anzutippen ist Absicht, Aufdecken bewertet nichts, und Anki/Quizlet machen
  es genauso. Der Knopf bleibt (Zugänglichkeit, Gewohnheit).
- **„Fast"/„Sicher" bleiben.** Geprüft: Die Zahl der Knöpfe ist Lernlogik
  (tabu); die Wörter sind kurz und eindeutig, die Unterzeilen verraten kein
  System. Was
  fehlte, war das Gefühl, nicht die Beschriftung – deshalb Abflug + Druck.
- **Wegflug statt Verschwinden** mit einer Kopie außerhalb von `#app`, weil
  `render()` das Markup ersetzt. Nach einem Wisch wird nichts kopiert (die
  Karte fliegt dort schon selbst).
- **Nebenfund behoben:** `karte-kommt`/`karte-dreht` liefen mit
  `animation-fill-mode: both` auf `.study-flaeche`; die Endlage einer
  gefüllten Animation überschreibt Inline-Styles – das Wischen hätte die
  Karte danach nicht mehr sichtbar bewegt.

**Geprüft:** Sprungmessung über 12 Karten × 4 Geräte = 0 px (vorher −3 bis
−120 px), Üben 0 px; Drehung und Abflug Bild für Bild (dunkel und hell);
Wischen nach dem Drehen bewegt die Karte; Doppeltipp deckt einmal auf;
Regressionstests; Affentest 200 Schritte, 0 Befunde.

**Offen:** –
**Nächste Station:** 1 (Start)
