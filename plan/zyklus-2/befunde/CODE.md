# Befunde CODE – Code-Qualität, toter Code, Texte, Recht gegen Code, Repo-Ordnung

Prüfer: CODE (Zyklus 2, B8/B9 und Rechtstexte gegen Code), Stand `main` 3.18.10
(`436dc78`), geprüft am 01.10.2026. Nur gelesen und gemessen; Skripte unter
`scratchpad/audit/CODE/` (`tote2.js`, `ui_felder.js`, `aktionen.js`,
`css_tot.js`, `kommentar_verweise.js`). Kommentare wurden für die
Aufrufer-Suche aus `app.js` entfernt, damit ein Name im Kommentar nicht als
Aufruf zählt.

*(Datei wird laufend ergänzt – Zwischenstand.)*

---

## Mittel

#### CODE-1: Neun Klick-Zweige ohne Knopf – darunter ein ganzer toter Funktionsweg („Serie fortsetzen“)
- Art: Aufräumen
- Schwere: mittel
- Beleg: `aktionen.js` vergleicht jedes erzeugte `data-action` (auch aus `action:`-Feldern und Variablen) mit den `case`-Zweigen. Diese Zweige haben **keinen** erzeugenden Knopf mehr (grep über `app.js` und `index.html`, je 1 Treffer = nur der `case`):
  - `app.js:14819` `case "rename-bereich"` und `14820` `case "delete-bereich"` (ersetzt durch `bereich-mehr-umbenennen`/`-loeschen`, 14829/14830)
  - `app.js:14935` `case "edit-card"`, `14944` `case "cancel-edit"`, `14945` `case "delete-card"` (ersetzt durch `card-detail-bearbeiten`/`-loeschen`, 14773/14774)
  - `app.js:14946` `case "reverse-order"` (ersetzt durch `bereich-mehr-umkehren`, 14828)
  - `app.js:14840` `case "stats-scope"` → siehe CODE-2
  - `app.js:14862` `case "grade-weiter": … gradeCard("weiter")` mit Kommentar „nur im Übungsmodus sichtbar“ – kein Knopf erzeugt es; dazu tote Regel `.karte-geist--weiter` (`styles.css:2199`) und der Kommentar „im Ueben ("weiter") nach links oben“ (`app.js:6087`)
  - `app.js:15034` `case "streak-fortsetzen"` → einziger Aufrufer von `streakFortsetzen()` (`app.js:2862`) und damit von `streakRissZurueckliegtInTagen()` (`2858`). Der Knopf ist laut eigenem Kommentar seit dem Umbau von Fortschritt weg (`app.js:10658–10661`: „Der Hinweis "Serie fortsetzen" … ist mit weg … er konnte nicht mehr erscheinen“). `streak.gerissenAm`/`vorher` setzt nur noch der stillgelegte Block in `evaluateStreakForNewDay` (`if (false && …)`, `2961`).
  - verifiziert (grep, Skript `aktionen.js`)
- Warum es stört: Wer Klick-Handlungen ändert (LEHREN § 6.2), muss 9 Zweige mitdenken, die nie feuern; `grade-weiter` und `streak-fortsetzen` täuschen eine Funktion vor, die es in der Oberfläche nicht gibt (§ 3.2).
- Vorschlag: Die 9 `case`-Zeilen streichen; `streakFortsetzen` + `streakRissZurueckliegtInTagen` streichen (Felder `gerissenAm`/`vorher` in `normStreak`/`STREAK_FELDER` bleiben, sie stehen in den Regeln). `.karte-geist--weiter` und den „weiter“-Halbsatz in 6087 streichen. `evaluateStreakForNewDay` selbst nicht anfassen (LEHREN § 13).
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `node aktionen.js` meldet keinen `case` ohne erzeugtes `data-action`; `grep -c "streakFortsetzen" app.js` = 0; Affe Handy 200 grün.

#### CODE-2: Umschalter „alle Bereiche / dieser Bereich“ im Fortschritt ist tot, Code und Stil liegen noch da
- Art: Aufräumen
- Schwere: mittel
- Beleg: `ui.statsScope` wird nur in `app.js:10854` auf `"alle"` gesetzt und sonst nur vom toten `case "stats-scope"` (`14840`) geändert. Damit sind die Zweige `ui.statsScope === "bereich"` in `app.js:3822` und `4107` nie wahr und in `10935` immer `"alle"`. Der zugehörige Stil `.pills`/`.pill` (`styles.css:1238–1257`, dazu `.pill` in den Sammelregeln 1118/1122 und 2360, 2570, 5091, 5094) wird von keinem Markup mehr erzeugt (grep `"pill"`/`'pill'` in `app.js`: 0; nur `bereich-pill`, `trend-pill`). Der Kommentar darüber lügt: `styles.css:1238` „Pill-Reihe. Bleibt für den Fortschritts-Umschalter erhalten.“ – verifiziert (grep).
- Warum es stört: Zwei Rechenwege im Fortschritt (`3822`, `4107`), von denen einer nie läuft; wer den Reiter umbaut (Betreiber: „Fortschritt ist dumm“, B3), liest Verzweigungen, die nichts bedeuten.
- Vorschlag: `statsScope` aus `ui` (1692), Reset (10854), `case` (14840) und die drei Verzweigungen entfernen (immer `bereiche`); `.pills`/`.pill` samt Kommentar aus `styles.css` streichen. Falls B3 einen Bereichsfilter wieder vorschlägt, neu bauen statt diesen Rest zu beleben.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep -c "statsScope" app.js` = 0, `grep -c "\.pill\b" styles.css` = 0; `t_gross_alle.js`, `t_kontrast.js` und Fortschritt-Fotos unverändert.

#### CODE-3: Kommentare, die eine längst entfernte Regel als gültig beschreiben (Tageslimit, Zwei-Tipp-Auswahl, startDrill)
- Art: Aufräumen
- Schwere: mittel
- Beleg (alle verifiziert, Code gelesen):
  - Tageslimit für neue Karten ist seit 2.3.0 weg (`app.js:1164` sagt das selbst). Trotzdem: `app.js:223–229` „Damit ein Tageslimit fuer NEUE Karten ueberhaupt moeglich ist … laeuft einmalig durch das Tageslimit. Das ist gewollt: sonst braechte das Limit beim ersten grossen Import nichts.“; `app.js:5765–5766` „Sie darf dann nicht mehr als "neu" durch das Tageslimit laufen.“; `app.js:6017` „ab jetzt gilt die Karte als eingeführt und zählt gegen das Tageslimit“. Was `ersteBewertung` heute tatsächlich steuert (neu/wackelig, Verlaufsart `n`/`w`, Lektions-Schloss), steht nirgends.
  - `app.js:1748–1751` (ui-Deklaration) „drillAnker ist der erste angetippte Wert des laufenden Zwei-Tipp-Vorgangs … Siehe waehleStufe()“ – `waehleStufe` ist seit 3.15.0 entfernt (`app.js:5463` sagt das).
  - `app.js:5443` „startDrill() filtert wie bisher nach c.stufe“ – `startDrill` gibt es nicht (nur `startDrillGruppen`).
  - `app.js:136–137` „beim manuellen Setzen einer Stufe im Formular gilt bewusst das glatte Intervall, damit die Beschriftung dort stimmt“ – das Formular zeigt seit 3.12.1/3.13.0 nur noch Zustandswörter (`app.js:8397–8401`), keine Beschriftung mit Tagen.
  - `app.js:8003` „siehe renderVerification()“ – heißt `renderPendingVerification` (`7804`).
  - `app.js:1299–1307`: sechs Zeilen Kommentar zum Link-Teilen („Verarbeitet wird er erst … siehe teilLinkPruefen in initFirebase“) plus auskommentierter Code `// let ausstehenderTeilLink = leseTeilLinkAusHash();` – G-080 (3.17.41) hat den Code entfernt, diesen Rest nicht. Ebenso `app.js:4785–4787` begründet eine Funktion mit `teilLinkPruefenUndVerarbeiten()` „Abschnitt J“, die es nicht mehr gibt.
  - Bekannt (Zyklus-2-AUFTRAG § 4): `app.js:6616` „Ueberspringen auf jedem Fragebildschirm“ – **noch offen**.
- Warum es stört: Genau dieses Muster hat schon einen falschen Hinweis auf Lernen erzeugt (LEHREN § 3.2, „Noch offen für die Serie“). Wer an `ersteBewertung` oder am Üben arbeitet, liest eine Regel, die es nicht gibt.
- Vorschlag: Die genannten Kommentare kürzen oder richtigstellen (je ein Satz, was heute gilt); auskommentierten Code und Teil-Link-Kommentar löschen. Keine Codeänderung.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep -n "Tageslimit" app.js` nur noch in historischen Sätzen („2.3.0: … entfallen“); `node kommentar_verweise.js` meldet `waehleStufe`, `startDrill`, `renderVerification`, `teilLinkPruefen*`, `leseTeilLinkAusHash` nicht mehr; `node --check app.js`.

## Niedrig

#### CODE-4: „Zuletzt benutzte Speicherkarte vorschlagen“ (3.5.0) ist seit 3.17.10 still verloren
- Art: Fehler
- Schwere: niedrig
- Beleg: `ui.zuletztSetId` wird in `app.js:5318` gesetzt und **nirgends gelesen** (`ui_felder.js`: „NUR GESCHRIEBEN“). Das Wahl-Blatt „In Speicherkarte ablegen“ hat `wert: () => null` (`app.js:9988–9993`). CHANGELOG 3.5.0 (Zeile 1991–1995) verspricht: „Die Auswahlliste merkt sich jetzt innerhalb der Sitzung, welche Speicherkarte zuletzt benutzt wurde, und schlägt sie beim nächsten Mal direkt vor.“ Mit 3.17.10 (Auswahlfelder → Blatt) fiel das weg; der Kommentar an `ui.zuletztSetId` (`app.js:1756–1760`) beschreibt es weiter. verifiziert (grep).
- Warum es stört: Wer mehrfach Karten in dieselbe Speicherkarte legt, sucht sie jedes Mal neu; Kommentar und Changelog versprechen das Gegenteil.
- Vorschlag: `speicherkarte.wert: () => ui.zuletztSetId` in `WAHLEN` (markiert die zuletzt benutzte Zeile wie bei Schriftgröße), sonst Feld und Kommentar streichen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Prüfstand: Auswahl → „Ablegen“ → Speicherkarte A → neue Auswahl → Blatt zeigt A als aktiv (`.liste-zeile.aktiv`).

#### CODE-5: Tote Reste der alten Stufen-Auswahl beim Üben
- Art: Aufräumen
- Schwere: niedrig
- Beleg: `ui.drillVon`, `ui.drillBis`, `ui.drillAnker` werden nur geschrieben (`app.js:5009–5011`, `5432–5434`), nie gelesen (`ui_felder.js`). `setzeVollenStufenBereich()` (`5430`) tut nichts anderes, als diese drei zu setzen, und wird an zwei Stellen gerufen (`5418`, `8874`). `stufenBereichName()` (`5455–5462`) hat keinen einzigen Aufrufer (`tote2.js`, grep: 1 Treffer). verifiziert.
- Warum es stört: Toter Zustand im zentralen `ui`-Objekt; jede Session, die das Üben anfasst, muss ihn verstehen.
- Vorschlag: Drei Felder, `setzeVollenStufenBereich` (samt beiden Aufrufen) und `stufenBereichName` entfernen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep -c "drillVon\|drillBis\|drillAnker\|setzeVollenStufenBereich\|stufenBereichName" app.js` = 0; Üben-Tests (`t_ueben*`/Affe) grün.

#### CODE-6: Rund 30 CSS-Klassen, die app.js und die HTML-Seiten nie erzeugen
- Art: Aufräumen
- Schwere: niedrig
- Beleg: `css_tot.js` (Klassen aus Selektoren in `styles.css`, gesucht in `app.js` ohne Kommentare und allen drei HTML-Seiten; dynamisch zusammengesetzte wie `zustand-`, `einstieg--`, `hinweis--`, `kal-tag s…`, `karte-geist--known/almost/unknown`, `text-buehne__zeile--` von Hand ausgeschlossen). Übrig, jeweils grep in `app.js`/`index.html` = 0: `.stack` 474, `.stack-tight` 475, `.rule` 477, `.done-box`/`.emoji` 559/1918–1927, `.anim-fade` 561/571, `.stat-kennzahl(en)` 963/2834–2846, `.on-surface` 1104, `.pill(s)` (CODE-2), `.wahl-reihe` 1390, `.card--raised/--accent/--flush` 1456–1490, `.positiv`/`.negativ` 1578/1579, `.progress-note` 1845, `.weiter-hinweis` 1848, `.sub` 1868/2236, `.drill-banner` 2319/2325, `.lern-kopf` 2454/2458, `.card-tags-inline` 2664, `.legende-erklaerung` 2934, `.serie-klein` 3053, `.skeleton-zeile` 3141/3146, `.topbar`/`.who`/`.sync-dot` 3315–3321, `.einstieg-frage-klein` 4092, `.karte-geist--weiter` 2199. verifiziert (Skript + grep je Name).
- Warum es stört: `styles.css` hat 5 353 Zeilen; tote Regeln kosten beim Stil-Berechnen wenig, aber jede Gestaltungsänderung (Paket D) muss sie mitprüfen, und G-119 hat gezeigt, dass Stil-Berechnung im Verwalten-Wechsel zählt.
- Vorschlag: Liste in Paket F streichen, nach jeder Streichung `t_kontrast.js`, `t_sprung.js`, `t_gross_alle.js` und Fotovergleich hell/dunkel.
- Entscheidet: Agent
- Aufwand: mittel
- Abnahme: `node css_tot.js` meldet nur noch die bekannten dynamischen Klassen; Pixelvergleich aller Bildschirme vor/nach ohne Unterschied.

---

Geprüft ohne Fund: *(folgt)*
