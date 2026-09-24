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
