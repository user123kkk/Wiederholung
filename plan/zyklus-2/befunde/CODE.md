# Befunde CODE – Code-Qualität, toter Code, Texte, Recht gegen Code, Repo-Ordnung

Prüfer: CODE (Zyklus 2, Bereiche B8/B9 und Rechtstexte gegen Code), Stand
`main` 3.18.10 (`436dc78`), geprüft am 01.10.2026. Nur gelesen und gemessen.
Skripte unter `scratchpad/audit/CODE/`: `tote2.js` (Funktionen ohne
Aufrufer), `ui_felder.js` (ui-Felder nur geschrieben), `aktionen.js`
(`data-action` gegen `case`), `css_tot.js` (CSS-Klassen ohne Erzeuger),
`kommentar_verweise.js` (Kommentare nennen Funktionen, die es nicht gibt),
`render_nebenwirkung.js`, `fremdserver.js` (echtes Firebase-SDK, Netzmitschnitt).
Für die Aufrufer-Suche wurden die Kommentare aus `app.js` entfernt, damit ein
Name im Kommentar nicht als Aufruf zählt.

13 Funde: 0 kritisch, 0 hoch, 5 mittel, 8 niedrig.

---

## Mittel

#### CODE-1: Datenschutzerklärung sagt „beim Start eine Sache von außen“ – auf Handys und in Safari sind es vier
- Art: Fehler
- Schwere: mittel
- Beleg: `datenschutzerklaerung.html:243–246` (Punkt 9): „Beim Start lädt die App eine Sache von außen: das Firebase-SDK von `gstatic.com`“. Gemessen mit `fremdserver.js` (echtes SDK, keine Attrappe, keine Anmeldung, kein Tipp, 9 s nach dem Laden): Desktop-Chrome lädt nur 3× `www.gstatic.com/firebasejs/10.14.1`. Mit iPhone-Kennung (mobil, Touch) zusätzlich, **ohne dass jemand „Mit Google“ antippt**: `apis.google.com/js/api.js`, `apis.google.com/_/scs/…`, ein unsichtbares `<iframe>` von `lernkarte-925c2.firebaseapp.com/__/auth/iframe` (2 Abrufe) und `www.googleapis.com/identitytoolkit/v3`. Ursache: `app.js:2223` `auth = fb.getAuth(fbApp)` – `getAuth` bringt den Popup-Baustein mit, und das SDK lädt ihn auf Mobilgeräten, iOS und Safari vorab. verifiziert (Messung); dass es auf einem echten iPhone genauso ist, folgt aus derselben SDK-Prüfung (Kennung), am Gerät nicht gemessen.
- Warum es stört: LEHREN § 12 („Die Datenschutzerklärung muss jeden Datenfluss nennen“). Der Text stimmt genau für die Geräte nicht, auf denen die App vor allem läuft. Empfänger ist jedes Mal Google, also kein neuer Dritter, aber der Satz „eine Sache“ ist falsch, und `apis.google.com` ist nicht das Firebase-SDK.
- Vorschlag: (a) Text Punkt 9 ergänzen: auf Handys und in Safari lädt die App beim Start zusätzlich den Google-Anmeldebaustein (`apis.google.com`, `…firebaseapp.com`), auch wenn man sich mit E-Mail anmeldet. Oder (b) Code: `initializeAuth()` ohne Popup-Baustein und ihn nur an `signInWithPopup`/`reauthenticateWithPopup` übergeben – dann lädt nichts davon, bis jemand „Mit Google“ tippt.
- Entscheidet: Betreiber (Recht; Weg b berührt die Google-Anmeldung am iPhone)
- Aufwand: klein (a) / mittel (b, mit Gerätetest)
- Abnahme: `node fremdserver.js` – entweder nennt Punkt 9 jeden gemessenen Host, oder der Lauf mit iPhone-Kennung zeigt nur noch `www.gstatic.com`.
- Pro/Contra: Für (a): eine Textänderung, kein Risiko für die Anmeldung; die Rechtsprüfung durch eine Person steht ohnehin aus (J1/F5). Gegen (a): der Abruf bleibt für alle, die Google nie benutzen. Für (b): weniger Datenfluss, Text bleibt wahr. Gegen (b): Das SDK lädt den Baustein auf iOS absichtlich vorab, weil Safari ein Fenster nur direkt im Tipp öffnet – lädt er erst beim Tipp, kann das Google-Fenster blockiert werden (3.4.8–3.4.11 waren genau solche Vorfälle, E-18 ist noch offen). **Empfehlung: (a) jetzt**, (b) nur zusammen mit dem Gerätetest E-18.

#### CODE-2: Neun Klick-Zweige ohne Knopf – darunter ein ganzer toter Funktionsweg („Serie fortsetzen“)
- Art: Aufräumen
- Schwere: mittel
- Beleg: `aktionen.js` vergleicht jedes erzeugte `data-action` (auch aus `action:`-Feldern und Variablen) mit den `case`-Zweigen; je Name grep über `app.js`/`index.html` = nur der `case` selbst:
  - `app.js:14819` `case "rename-bereich"`, `14820` `case "delete-bereich"` (ersetzt durch `bereich-mehr-umbenennen`/`-loeschen`, 14829/14830)
  - `app.js:14935` `case "edit-card"`, `14944` `case "cancel-edit"`, `14945` `case "delete-card"` (ersetzt durch `card-detail-bearbeiten`/`-loeschen`, 14773/14774)
  - `app.js:14946` `case "reverse-order"` (ersetzt durch `bereich-mehr-umkehren`, 14828)
  - `app.js:14840` `case "stats-scope"` → CODE-3
  - `app.js:14862` `case "grade-weiter": … gradeCard("weiter")`, Kommentar „nur im Übungsmodus sichtbar“ – kein Knopf erzeugt es; dazu die tote Regel `.karte-geist--weiter` (`styles.css:2199`) und der Halbsatz „im Ueben ("weiter") nach links oben“ (`app.js:6087`)
  - `app.js:15034` `case "streak-fortsetzen"` – einziger Aufrufer von `streakFortsetzen()` (`app.js:2862`) und damit von `streakRissZurueckliegtInTagen()` (`2858`). Der Knopf ist laut eigenem Kommentar weg (`app.js:10658–10661`: „Der Hinweis "Serie fortsetzen" … konnte nicht mehr erscheinen“); `streak.gerissenAm`/`vorher` setzt nur noch der stillgelegte Block (`2961`, `if (false && …)`).
  - verifiziert (Skript + grep)
- Warum es stört: LEHREN § 3.8 (beim Entfernen alle Aufrufer mitnehmen) und § 6.2. Wer Klick-Handlungen ändert, liest neun Zweige, die nie feuern; zwei davon täuschen eine Funktion vor, die es nicht gibt.
- Vorschlag: Die neun `case`-Zeilen, `streakFortsetzen`, `streakRissZurueckliegtInTagen`, `.karte-geist--weiter` und den Halbsatz in 6087 streichen. Die Felder `gerissenAm`/`vorher` in `normStreak`/`STREAK_FELDER` bleiben (stehen in den Regeln). `evaluateStreakForNewDay` nicht anfassen (LEHREN § 13).
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `node aktionen.js` meldet keinen `case` ohne erzeugtes `data-action`; `grep -c "streakFortsetzen" app.js` = 0; Affe Handy 200 und `abnahme_runde.js` grün.

#### CODE-3: Umschalter „alle Bereiche / dieser Bereich“ im Fortschritt ist tot, Rechenwege und Stil liegen noch da
- Art: Aufräumen
- Schwere: mittel
- Beleg: `ui.statsScope` wird nur in `app.js:10854` auf `"alle"` gesetzt und sonst nur vom toten `case "stats-scope"` (`14840`) geändert. Damit ist `ui.statsScope === "bereich"` in `app.js:3822` und `4107` nie wahr, `10935` prüft immer `"alle"`. Der Stil `.pills`/`.pill` (`styles.css:1238–1257`, dazu `.pill` in Sammelregeln 1118/1122, 2360, 2570, 5091, 5094) wird von keinem Markup erzeugt (grep `"pill"` in `app.js`: nur `bereich-pill`, `trend-pill`). Der Kommentar `styles.css:1238` „Pill-Reihe. Bleibt für den Fortschritts-Umschalter erhalten.“ lügt. verifiziert.
- Warum es stört: Betreiber findet den Fortschritt-Reiter „dumm“ (B3). Wer ihn umbaut, liest zwei Rechenwege, von denen einer nie läuft.
- Vorschlag: `statsScope` (Deklaration 1692, Reset 10854, `case` 14840, drei Verzweigungen) entfernen; `.pills`/`.pill` samt Kommentar streichen. Schlägt B3 einen Bereichsfilter vor, neu bauen statt diesen Rest beleben.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep -c "statsScope" app.js` = 0; `grep -c "\.pill\b" styles.css` = 0; Fortschritt-Fotos hell/dunkel vor/nach gleich.

#### CODE-4: Kommentare beschreiben Regeln, die es nicht mehr gibt (Tageslimit, Zwei-Tipp-Auswahl, startDrill, Link-Teilen)
- Art: Aufräumen
- Schwere: mittel
- Beleg (alle am Code nachgelesen):
  - Das Tageslimit für neue Karten ist seit 2.3.0 weg (`app.js:1164` sagt es selbst). Trotzdem: `app.js:223–229` „Damit ein Tageslimit fuer NEUE Karten ueberhaupt moeglich ist … laeuft einmalig durch das Tageslimit. Das ist gewollt“; `app.js:5765–5766` „darf dann nicht mehr als "neu" durch das Tageslimit laufen“; `app.js:6017` „zählt gegen das Tageslimit“. Wofür `ersteBewertung` heute dient (neu/im Lernen, Protokollart `n`/`w`, Lektions-Schloss), steht nirgends.
  - `app.js:1748–1751` „drillAnker ist der erste angetippte Wert des laufenden Zwei-Tipp-Vorgangs … Siehe waehleStufe()“ – `waehleStufe` ist seit 3.15.0 entfernt (`app.js:5463`).
  - `app.js:5443` „startDrill() filtert wie bisher nach c.stufe“ – es gibt nur `startDrillGruppen`.
  - `app.js:136–137` „beim manuellen Setzen einer Stufe im Formular gilt bewusst das glatte Intervall, damit die Beschriftung dort stimmt“ – das Formular zeigt nur noch Zustandswörter (`app.js:8397–8401`), keine Tage.
  - `app.js:8003` „siehe renderVerification()“ – heißt `renderPendingVerification` (`7804`).
  - `app.js:1299–1307`: sechs Zeilen zum Link-Teilen („siehe teilLinkPruefen in initFirebase“) plus auskommentierter Code `// let ausstehenderTeilLink = leseTeilLinkAusHash();`; `app.js:4785–4787` begründet eine Funktion mit `teilLinkPruefenUndVerarbeiten()`. G-080 (3.17.41) hat den Code entfernt, diese Reste nicht.
  - `app.js:9230–9242` (Einstellungen) „Jetzt 4 Abschnitte mit 8 Zeilen: Lernen – Karten pro Sitzung …“ – heißt „Karten pro Runde“ (9251), dazu gibt es inzwischen „Tägliche Erinnerung“, „Texte: Einwilligung widerrufen“ und den Probelauf-Abschnitt.
  - Bekannt (Zyklus-2-AUFTRAG § 4): `app.js:6616` „Ueberspringen auf jedem Fragebildschirm“ – **noch offen**.
- Warum es stört: Genau dieses Muster hat schon einen falschen Satz auf Lernen erzeugt (LEHREN § 3.2). Wer an `ersteBewertung` oder am Üben arbeitet, liest eine Regel, die nicht gilt.
- Vorschlag: Kommentare richtigstellen (je ein Satz, was heute gilt), Link-Reste und auskommentierten Code löschen. Keine Codeänderung.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep -n "Tageslimit" app.js` nur noch in Sätzen, die es als entfallen nennen; `node kommentar_verweise.js` meldet `waehleStufe`, `startDrill`, `renderVerification`, `teilLinkPruefen*`, `leseTeilLinkAusHash` nicht mehr; `node --check app.js`.

#### CODE-5: CLAUDE.md und PLAN.md widersprechen STAND.md – vier alte „AKTUELL“-Aufträge stehen vor den Dauerregeln
- Art: Aufräumen
- Schwere: mittel
- Beleg: `plan/STAND.md:9–10`: 3.18.10 online, Stufe 7 fertig, Runde 15 entfällt, jetzt Zyklus 2. Dagegen in `CLAUDE.md`: „AKTUELL (30.09.2026): Texte auswendig lernen — hier weitermachen … Er veröffentlicht Regeln und Hosting selbst“ (widerspricht dem Stichwort „ladegerät“ zwei Absätze darüber); „Aktueller Weiter-Auftrag — Runde 14 … Nächste Runde genau G-107–G-111“; „Aktuelle Claude-Übergabe und Pause vom 29.09.2026 … Runde 14 nicht automatisch beginnen“; „Historische ChatGPT-Übergabe vom 27.09.“; und „Wenn hier jemand „leg los" sagt“ schickt weiter zuerst nach `plan/PLAN.md`. `plan/PLAN.md` (162 KB) hat 6 „AKTUELL“-Absätze (Zeilen 870, 934, 946, 969, 992, 1457), `plan/STAND.md:57–70` selbst führt noch „Was Stufe 7 noch blockiert“ (t_text_tempo rot), obwohl die Tabelle darüber Stufe 7 als fertig nennt. `AGENTS.md` steht in `.gitignore:17` und ist nicht im Repo (`git ls-files AGENTS.md` leer), obwohl `CLAUDE.md` und Commit `123e88c` es als Einstieg für Codex nennen – ein Agent in der Cloud oder auf einem anderen Rechner bekommt die Datei nie. verifiziert.
- Warum es stört: Jede Session liest zuerst `CLAUDE.md`. Dort stehen vier überholte Arbeitsaufträge vor den Dauerregeln; der Satz „wo es abweicht, gilt STAND.md“ verlangt, dass der Agent die Abweichung selbst findet. Der Betreiber zahlt das mit jeder Session.
- Vorschlag: `CLAUDE.md` auf Dauerregeln kürzen (Grundsätze, Stichwort „ladegerät“, Veröffentlichen, Dokumentationspflicht, „leg los“ = `STAND.md` → Logbuch). Die vier AKTUELL/Übergabe-Absätze nach `plan/archiv/` oder ganz streichen (stehen in den Logbüchern). In `PLAN.md` die AKTUELL-Kette ab Zeile 870 in `plan/archiv/PLAN-verlauf.md` auslagern. In `STAND.md` den Block „Was Stufe 7 noch blockiert“ streichen. `AGENTS.md` einchecken (Hosting schließt `**/*.md` schon aus) oder den Verweis streichen.
- Entscheidet: Betreiber (CLAUDE.md ist seine Arbeitsanweisung; Umsortieren hat er in AUFTRAG § 1 Punkt 10 gewünscht)
- Aufwand: mittel
- Abnahme: `grep -c "AKTUELL" CLAUDE.md` = 0; `git ls-files AGENTS.md` nicht leer oder kein Verweis mehr; `STAND.md` nennt keinen Blocker für eine fertige Stufe.
- Pro/Contra: Dafür: kürzerer, widerspruchsfreier Einstieg; weniger Risiko, dass ein Agent einen alten Auftrag ausführt (LEHREN § 3.10). Dagegen: Die alten Absätze enthalten Warnungen (UI-Fixes erzeugen leicht neue Fehler), die nicht verloren gehen dürfen – die gehören dann als Regel nach LEHREN § 6, nicht gelöscht. **Empfehlung: machen, als erste Aufgabe von Paket F**, alte Absätze verschieben statt löschen.

## Niedrig

#### CODE-6: „Zuletzt benutzte Speicherkarte vorschlagen“ (3.5.0) ist seit 3.17.10 still verloren
- Art: Fehler
- Schwere: niedrig
- Beleg: `ui.zuletztSetId` wird in `app.js:5318` gesetzt und nirgends gelesen (`ui_felder.js`: „NUR GESCHRIEBEN“). Das Blatt „In Speicherkarte ablegen“ hat `wert: () => null` (`app.js:9988–9993`). CHANGELOG 3.5.0 (Zeile 1995): „Die Auswahlliste merkt sich jetzt innerhalb der Sitzung, welche Speicherkarte zuletzt benutzt wurde, und schlägt sie beim nächsten Mal direkt vor.“ Mit 3.17.10 (Auswahlfelder → Blatt, CHANGELOG 892 ff.) fiel das weg, ohne Erwähnung; der Kommentar `app.js:1756–1760` beschreibt es weiter. verifiziert (grep).
- Warum es stört: Wer mehrfach in dieselbe Speicherkarte ablegt, sucht sie jedes Mal neu.
- Vorschlag: `speicherkarte.wert: () => ui.zuletztSetId` in `WAHLEN` (markiert die Zeile wie bei Schriftgröße). Sonst Feld und Kommentar streichen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Prüfstand: zweimal ablegen → beim zweiten Mal hat die zuletzt benutzte Zeile `.aktiv`.

#### CODE-7: Texte beim Teilen und in Listen stimmen bei genau einer Lektion oder Karte nicht
- Art: Fehler
- Schwere: niedrig
- Beleg: `app.js:4260`: `b.karten.length + ' Karten, ' + lektionen.length + ' Lektionen. Nur „' + lektionen[0].name + '" ist offen, der Rest kommt gesperrt an.'` – `weitergabeMoeglich` (`app.js`, vor 4256) verlangt nur ≥ 1 Lektion. Bei einer Lektion steht da „12 Karten, 1 Lektionen. Nur „Lektion 1" ist offen, der Rest kommt gesperrt an.“ – falsche Mehrzahl und ein Rest, den es nicht gibt. Weitere Stellen ohne `mz()`: `app.js:9028` „1 Karten, noch keine davon gelernt.“ (Lektion mit einer Karte), `10757` Titel „neu: 1 Karten (…)“, `12908` „1 von 1 Lektionen frei“. verifiziert am Codepfad, nicht im Browser erzeugt.
- Warum es stört: LEHREN § 7.1 und § 7.4 (zusammengesetzte Sätze am Bildschirm lesen); der Teilen-Dialog ist der Moment, in dem jemand entscheidet, was er herausgibt.
- Vorschlag: `mz()` an den vier Stellen; in 4260 bei einer Lektion den Satz „… der Rest kommt gesperrt an“ durch „Sie ist offen.“ ersetzen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Prüfstand-Store mit einer Lektion à eine Karte: Dialogtext enthält weder „1 Karten“ noch „1 Lektionen“ noch „der Rest“.

#### CODE-8: Alter Produktname „Lernkarten“ und Wortmischung Backup / Sichern / Sicherung
- Art: Aufräumen
- Schwere: niedrig
- Beleg: `app.js:4954` „Diese Datei ist keine gültige Lernkarten-Backup-Datei.“, `app.js:4796` „Das ist kein gültiger Lernkarten-Bestand.“, Dateiname `app.js:4198` `"lernkarten-backup" + … + ".json"` (die Erinnerung heißt dagegen `adrabic-erinnerung.ics`, `10436`). Dasselbe Ding heißt in der Oberfläche „Backup“ (`4950`, `5070`, `8435`, `8558`, `9366`, `9497` „Backup herunterladen“), „Alles sichern“/„Jetzt sichern“/„Zuletzt gesichert“ (`8560`, `9367–9370`), Seitentitel „Sichern & einspielen“ (`9159`) und in der Datenschutzerklärung „Sicherung“ (`datenschutzerklaerung.html:161`) und „Backups“ (`:206`). verifiziert (grep).
- Warum es stört: LEHREN § 3.3 (Markenname überall mitziehen) und § 7.1 (einheitliche Wörter, kein Englisch).
- Vorschlag: „Lernkarten-“ aus beiden Meldungen streichen („keine gültige Sicherungsdatei“), Dateiname `adrabic-sicherung-…json` (Import liest den Inhalt, nicht den Namen – vorher an `importBackupFile` prüfen). Ein Wort festlegen und durchziehen.
- Entscheidet: Agent für „Lernkarten“ → Adrabic; Betreiber für das eine Wort (Backup oder Sicherung)
- Aufwand: klein
- Abnahme: `grep -ci "lernkarten" app.js` nur noch `OLD_STORAGE_KEY`; ein Wort in `app.js` und Datenschutzerklärung.
- Pro/Contra: „Sicherung“: deutsch, passt zu „Sichern & einspielen“. „Backup“: das Wort, das die meisten kennen, und steht heute an 7 Stellen. **Empfehlung: „Sicherung“** – die Knöpfe heißen schon „sichern“.

#### CODE-9: Datenschutzerklärung benutzt andere Namen als die App und widerspricht sich in zwei Sätzen
- Art: Aufräumen
- Schwere: niedrig
- Beleg: (1) Punkt 6 heißt „Feedback-Board“ (`datenschutzerklaerung.html:169–171`, auch 136, 292, 295, 311); in der App heißt die Zeile „Ideen & Vorschläge“ (`app.js:9296`) – wer in den Einstellungen „Feedback-Board“ sucht, findet es nicht. (2) Punkt 13 nennt „Einstellungen → Sichern“ (`:314–315`), die Zeile heißt „Sichern & einspielen“ (`app.js:9277`; „Kurz gesagt“ `:59` nennt es richtig). (3) Punkt 14 (`:332–333`) „jedes Konto ausschließlich an die eigenen Daten“ steht ohne die zwei Ausnahmen, die Punkt 5 (`:135–137`) nennt (geteilte Kartensätze, Ideen-Board). (4) „Kurz gesagt“ (`:55–56`) „Auf deinem Gerät bleiben nur ein paar Einstellungen und Merkzeichen … und die App-Dateien“ und Punkt 10 (`:262–264`) „Die einzige weitere Speicherung im Browser“ – tatsächlich liegt seit `persistentLocalCache` (`app.js:2232`) eine Kopie aller Lerninhalte in IndexedDB auf dem Gerät. Punkt (4) ist **bekannt: E-03, noch offen**. Geprüft und stimmig: jeder `localStorage`-Schlüssel (`adrabic-thema`, `-last-backup`, `-hinweise`, `-einstieg-antworten`, `-einstieg-nachklang`) steht in Punkt 7; `sessionStorage` (`adrabic-token-erneuert*`, `adrabic-selbstheilung`) ist genannt; Fehlerformular hängt genau Version, Anzeigename, User-Agent, Fenstergröße an (`app.js:14458–14462` = Punkt 11); geteilter Satz speichert `ownerUid`, `erstelltAm`, `inhalt`, `freigabe` (`firestore.rules:326–327` = Punkt 5); Texte: höchstens 50 Antworten (`FEST_ERGEBNISSE_MAX`, `app.js:707`), Einwilligungsdatum (`texteEinwilligung`). verifiziert.
- Warum es stört: LEHREN § 12; der Text soll zeigen, wo man etwas findet, und sich nicht selbst widersprechen.
- Vorschlag: „Ideen & Vorschläge“ als Name in Punkt 6 (mit „Feedback-Board“ höchstens in Klammern), Punkt 13 „Sichern & einspielen“, Punkt 14 um „außer den in Punkt 5 und 6 genannten Fällen“ ergänzen; (4) mit E-03.
- Entscheidet: Betreiber (Recht – Wortlaut der Erklärung), zusammen mit der ausstehenden Rechtsprüfung
- Aufwand: klein
- Abnahme: grep „Feedback-Board“ in `datenschutzerklaerung.html` nur noch als Klammerzusatz; Punkt 13 und `app.js:9277` gleich.
- Pro/Contra: Dafür: reine Angleichung, kein neuer Inhalt. Dagegen: jede Änderung am Rechtstext sollte in die eine Prüfung durch eine Person. **Empfehlung: sammeln und mit E-03 und CODE-1 in einem Zug ändern.**

#### CODE-10: Bildschirmwechsel räumt an fünf Stellen von Hand auf – jede Liste ist anders
- Art: Aufräumen
- Schwere: niedrig
- Beleg: `app.js:14836` (Reiter Lernen, 23 Zuweisungen in einer Zeile), `14839` (Fortschritt), `14850` (Verwalten), `14842–14843` (`trotzdem-ueben`), `5000–5012` (`selectBereich`). `trotzdem-ueben` setzt `setArtSheetId`, `neuWahl`, `textAnlegen`, `textAnsicht`, `zeileEdit`, `textLernen` nicht zurück, die drei Reiter schon; Lernen leert Suche/Auswahl, Fortschritt nicht. Als mit 3.18.x die Text-Felder dazukamen, mussten sie an drei Stellen eingetragen werden, die vierte wurde ausgelassen. Ein sichtbarer Fehler daraus ist **nicht** nachgewiesen (Vermutung: keiner, weil der Knopf nur auf dem leeren Lernen-Bildschirm steht).
- Warum es stört: LEHREN § 6.2 – jedes neue Blatt muss in alle Listen; diese fünf stehen in keiner Liste und sind je 300–700 Zeichen lange Einzeiler.
- Vorschlag: eine Funktion `ebenenSchliessen()` (alle Blätter/Unterseiten zu) plus kleine Zusätze je Reiter; `selectBereich`, die drei Reiter und `trotzdem-ueben` rufen sie.
- Entscheidet: Agent
- Aufwand: mittel (nur mit Affe und `t_sprung.js`)
- Abnahme: `grep -c "ui.textAnsicht = null" app.js` sinkt auf die eine Stelle in der neuen Funktion (plus echte Schließen-Handlungen); Affe Handy 200 / iPad 150 grün.

#### CODE-11: Tote Reste der alten Stufen-Auswahl beim Üben und weitere stillgelegte Zweige
- Art: Aufräumen
- Schwere: niedrig
- Beleg: `ui.drillVon`, `ui.drillBis`, `ui.drillAnker` werden nur geschrieben (`app.js:5009–5011`, `5432–5434`), nie gelesen (`ui_felder.js`). `setzeVollenStufenBereich()` (`5430`) setzt nur diese drei und wird in `5418` und `8874` gerufen. `stufenBereichName()` (`5455–5462`) hat keinen Aufrufer (`tote2.js`, einziger Fund unter 1 832 Top-Level-Namen). `app.js` (`einstFuss`): `if (BETREIBER_UIDS.length === 0 && currentUser)` zeigt die Konto-ID – `BETREIBER_UIDS` ist seit 3.17.0 gefüllt (`app.js:74`), der Zweig und `.einst-id` laufen nie. `SEITEN_TITEL` (`app.js:9160`, `9167`, `9168`) und `9357` kennen die Seiten `sichern`/`einspielen`/`verlauf` „falls ein alter Verweis sie noch öffnet“ – kein `data-id` erzeugt sie (grep). verifiziert.
- Warum es stört: toter Zustand im zentralen `ui`-Objekt und Verzweigungen, die niemand mehr auslöst.
- Vorschlag: streichen (drei Felder, zwei Funktionen samt Aufrufen, Konto-ID-Zweig, drei Seiten-Aliase und der Kommentar an `ui.seite` 1661).
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep -c "drillVon\|drillBis\|drillAnker\|setzeVollenStufenBereich\|stufenBereichName" app.js` = 0; `node ui_felder.js` meldet nichts; Üben-Tests und Affe grün.

#### CODE-12: Rund 30 CSS-Klassen, die app.js und die HTML-Seiten nie erzeugen
- Art: Aufräumen
- Schwere: niedrig
- Beleg: `css_tot.js` (Klassen aus den Selektoren von `styles.css`, gesucht in `app.js` ohne Kommentare und allen drei HTML-Seiten; dynamisch zusammengesetzte – `zustand-`, `einstieg--`, `hinweis--`, `kal-tag s…`, `karte-geist--known/almost/unknown`, `text-buehne__zeile--` – von Hand geprüft und ausgenommen). Übrig, je Name grep = 0 (Zeilen in `styles.css`): `.stack` 474, `.stack-tight` 475, `.rule` 477, `.done-box`/`.emoji` 559/1918–1927, `.anim-fade` 561/571, `.stat-kennzahl(en)` 963/2834–2846, `.on-surface` 1104, `.pill(s)` (CODE-3), `.wahl-reihe` 1390, `.card--raised/--accent/--flush` 1456–1490, `.positiv`/`.negativ` 1578/1579, `.progress-note` 1845, `.weiter-hinweis` 1848, `.sub` 1868/2236, `.drill-banner` 2319/2325, `.lern-kopf` 2454/2458, `.card-tags-inline` 2664, `.legende-erklaerung` 2934, `.serie-klein` 3053, `.skeleton-zeile` 3141/3146, `.topbar`/`.who`/`.sync-dot` 3315–3321, `.einstieg-frage-klein` 4092, `.karte-geist--weiter` 2199. verifiziert (Skript + grep).
- Warum es stört: 5 353 Zeilen Stil; jede Gestaltungsänderung (Paket D) liest tote Regeln mit, und die Stil-Berechnung zählt im Verwalten-Wechsel (G-119).
- Vorschlag: in Paket F streichen, danach `t_kontrast.js`, `t_sprung.js`, `t_gross_alle.js` und Fotovergleich hell/dunkel.
- Entscheidet: Agent
- Aufwand: mittel
- Abnahme: `node css_tot.js` meldet nur noch die dynamischen Klassen; Pixelvergleich aller Bildschirme vor/nach ohne Unterschied (wie `t_nur_betreiber.js`).

#### CODE-13: Veraltete und doppelte Dateien im Repo – Vorschlag für eine aufgeräumte Struktur
- Art: Aufräumen
- Schwere: niedrig
- Beleg (alle mit `git ls-files`/`diff`/grep geprüft):
  - `plan/issue-10-ui-patch.diff` (587 Bytes, 19.09.): Patch für den Knopf „Datei zum Weitergeben“ – diese Funktion ist bewusst entfernt (LEHREN § 3.5, 3.7.2). Kann nur schaden, wenn ihn jemand anwendet.
  - `KONZEPT-website-reife (gehört nicht zu den github dateien die ingesetzt werde).md` im Wurzelordner: bis auf einen Absatz (11 diff-Zeilen, die Ausnahme vom 18.09.) identisch mit `KONZEPT.md`, also die ältere Fassung – und entgegen ihrem Namen eingecheckt.
  - `plan/texte-lernen/entwurf-g119/schrift-vorwaermen.diff`: Entwurf, der mit 3.18.10 umgesetzt ist (`schriftVorwaermen`); `STAND.md:65–66` verweist noch darauf.
  - `flower-isolated.png`, `icon.svg` im Wurzelordner: kein Verweis in `index.html`, `manifest.json`, `sw.js`, `app.js` (nur zwei Kommentare in `styles.css:74/174`); seit 3.17.36 (G-074) nicht mehr im Vorabspeicher, werden aber weiter mit veröffentlicht (`firebase.json` schließt sie nicht aus).
  - `README.md` beginnt mit „# Wiederholung“ (LEHREN § 7.1: Name ist Adrabic) und kennt `plan/STAND.md` nicht.
  - `plan/grossplan/befunde/werkzeuge/` (40 Dateien) und `plan/werkzeuge/pruefstand/` sind zwei Orte für Prüfskripte; `plan/redesign-oberflaeche/probelauf.mjs`, `plan/lehrer-modus/probelauf-lehrer.mjs`, `plan/texte-lernen/mehrgeraete-pruefung.mjs`, `plan/phase-1-datenzugriff/regeln-pruefung.mjs` liegen jeweils im Phasenordner. `regeln_testen.sh` hängt an `phase-1-datenzugriff/regeln-pruefung.mjs` – beim Verschieben mitziehen.
  - Abgeschlossen und nur noch Geschichte: `plan/phase-0` bis `phase-9`, `audit/`, `redesign-oberflaeche/`, `landing-page-strategie/`, `feedback-board/`, `beobachtungen-lernwerkzeug.md` (77 KB), `onboarding/CHATGPT-HANDOFF-2026-09-27.md`, `onboarding/CLAUDE-HANDOFF-2026-09-29.md`.
  - Bleiben muss: `plan/grossplan/runde15-unfertig.patch` (Paket A).
- Warum es stört: Betreiber-Wunsch AUFTRAG § 1 Punkt 10; `plan/` hat 148 Dateien (ohne Prüfstand), die gültigen sind nicht von den erledigten zu unterscheiden.
- Vorschlag (nur Vorschlag):
  ```
  CLAUDE.md, AGENTS.md, README.md, KONZEPT.md, CHANGELOG.md   (Wurzel, sonst nur ausgelieferte Dateien)
  plan/STAND.md, LEHREN.md, PLAN.md (gekürzt: Phasen, offene Fragen)
  plan/zyklus-2/            laufend
  plan/texte-lernen/        laufend (Probelauf)
  plan/grossplan/           AUFGABEN, ENTSCHEIDUNGEN, KONSOLE, FUNKTIONEN, runde15-unfertig.patch
  plan/werkzeuge/           pruefstand/, regeln/ (regeln-pruefung.mjs, regeln_testen.sh), befund-skripte/ (aus grossplan/befunde/werkzeuge)
  plan/ideen/               lehrer-modus, monetarisierung, analytics, landing-page-strategie (nicht gebaut, aber noch Thema)
  plan/archiv/              phase-0…9, audit, redesign-oberflaeche, feedback-board, onboarding (bis auf WORTLAUT/ENTSCHIEDEN/NEUAUFBAU-3), beobachtungen, alte Handoffs, PLAN-verlauf
  ```
  Löschen: `plan/issue-10-ui-patch.diff`, `KONZEPT-website-reife (…).md`, `entwurf-g119/`. `flower-isolated.png` und `icon.svg` nach `plan/archiv/bilder/` oder in `firebase.json` unter `ignore`. Vor jedem Verschieben `grep -rn "<alter Pfad>"` über `*.md`, `*.js`, `*.mjs`, `*.sh`, `*.ps1`, `app.js`-Kommentare (z. B. `plan/onboarding/NEUAUFBAU-3.md` in `app.js:6602`, `plan/feedback-board/AUFTRAG.md` in `app.js`, `plan/lehrer-modus/GERUEST.md`).
- Entscheidet: Betreiber (was Geschichte ist und was Idee bleibt); das Verschieben selbst Agent
- Aufwand: mittel
- Abnahme: kein toter Verweis (`grep -rn "plan/" --include=*.md --include=*.js . | Pfade prüfen`), `node plan/werkzeuge/pruefe_stand.mjs` und `ladegeraet.ps1 -NurPruefen` grün.
- Pro/Contra: Dafür: weniger Lesezeit je Session, kein versehentlich angewandter alter Patch. Dagegen: Verschieben bricht Verweise in Logbüchern und Kommentaren, und `git log --follow` wird mühsamer. **Empfehlung: Löschen der drei überholten Dateien sofort; Archiv-Umzug einmal, als eigener Commit ohne Codeänderung.**

---

## Geprüft ohne Fund

- **Funktionen ohne Aufrufer:** alle 1 832 Top-Level-Namen in `app.js`; außer `stufenBereichName` (CODE-11) hat jede einen Aufrufer oder hängt an einem Listener.
- **`data-action` ohne Handler:** keiner. Jeder erzeugte Wert (auch aus `action:`-Feldern und Variablen) hat einen `case`.
- **Rendering mit Nebenwirkungen:** keine HTML-bauende Funktion schreibt in die Cloud oder in `localStorage` (`render_nebenwirkung.js`). `hinweisKarte()` ruft `ansagen()` beim ersten Erscheinen – bewusst (G-087), mit Merker in `ui`.
- **Systemsprache:** kein `e.code`/`e.message` in Dialogen außer dem Startfehler-Kasten (`zeigeStartfehler`, `app.js:15182`) – dort bewusst als Diagnose unter einem deutschen Satz. „Sitzung“ steht in keinem sichtbaren Text mehr; „Wiederholung“ nur als Lernbegriff, nicht als Name.
- **Intervallformel-Kommentar** (`app.js:124–129`, „Stufe 1→1 … ab 10→180“): nachgerechnet, stimmt.
- **Fremde Server im Code:** nur `www.gstatic.com` (SDK) und der Link `tanzil.net` im Text; keine Schrift, kein Bild, kein Skript von Dritten. Schriften liegen in `fonts/`, Lizenztext Amiri liegt bei und ist im Impressum verlinkt.
- **Impressum:** Angaben, Quran-Text- und Schrift-Hinweis passen zu den ausgelieferten Dateien (`quran/`, `fonts/`). Fehlerberichte gehen an eine eigene Adresse (`app.js:14465`), die Erklärung nennt nur „Postfach des Betreibers“ – kein Widerspruch.
- **`evaluateStreakForNewDay`:** stillgelegt wie in LEHREN § 13 beschrieben; nicht angefasst. Hinweis ohne Wertung: Die Funktion schreibt weiter einmal täglich `streak.lastEvaluatedDate` (`app.js:2977–2978`), das nur sie selbst liest.
- **Texte auswendig lernen:** nur auf echte Fehler in meinem Bereich angesehen (Texte, tote Zweige) – keiner gefunden.

## Nicht mehr geprüft (Zeit)

- Sichtbare Texte nicht Zeile für Zeile gelesen, sondern über Muster gesucht (Mehrzahl ohne `mz()`, Englisch, alte Namen, Systemcodes). Der Einstieg (Wortlaut gegen `plan/onboarding/WORTLAUT.md`) und alle Fehlermeldungen im Browser ausgelöst: nicht gemacht.
- Versprechen gegen Code (§ 7.2) nur für die Datenschutzerklärung und den Teilen-Dialog geprüft, nicht für jeden Hilfetext in den Einstellungen.
- `sw.js`, `firestore.rules`, `manifest.json` nicht auf toten Code geprüft.
- Altdaten-Import `lernkarten-app-v1` (`app.js:1873–1900`, `renderImport` 8094): **Vermutung**, dass er auf `adrabic.web.app` nie greifen kann (der Schlüssel gehört zur Offline-Fassung vor Firebase, `localStorage` gilt je Adresse) – nicht belegt, deshalb kein Fund.
- Doppelte Berechnungen im Fortschritt/Lernen (dieselbe Zahl an mehreren Stellen gerechnet) nur am Beispiel `statsScope` angesehen.
