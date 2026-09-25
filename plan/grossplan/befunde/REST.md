# REST – Befunde (Lernen-Start, Fortschritt, Üben, Einstellungen, Erinnerung, Ideen, Fehler melden, Hinweise, Navigation, Dialoge, Raster)

Messgrundlage: Prüfstand (Chromium, Firebase-Attrappe), `vollerStore()` plus drei Feedback-Einträge.
Rundgang `REST/tour.js` (Handy 390 hell/dunkel, Desktop 1440 dunkel, 20 Stationen je Variante),
Zusatzmessungen `REST/check2.js`, Fotos unter `REST/bilder/`. Affe `node affe.js handy 150 11`: **0 Befunde**.
Nicht geprüft: echtes iOS (Kalender-Import über `data:`-Adresse), echtes Firebase.

---

#### REST-1: Ring und „Heute schon N Antworten“ zählen fremde Bereiche mit
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:9102-9108` `heuteAnteil()`: `getan = heute.w + heute.n` aus `verlauf` (gilt für **alle** Bereiche), `offen` nur aus `cards` des aktuellen Bereichs. Der Kommentar darüber sagt „nur für den Bereich, den man gerade lernt“. `lernenStapel()` `app.js:9143-9150` zeigt damit „Heute schon 30 Antworten“ und „Weiterlernen“. Messung (check2.js): 30 Antworten in „Medina Buch 1“, Wechsel nach „Quran-Wörter“ mit 2 fälligen, dort noch nichts getan → Stapel „2 FÄLLIG · Heute schon 30 Antworten · Weiterlernen“, Ring zu 94 % gefüllt (`--ziel: 0.063`). Verifiziert.
- Warum es stört: Der Bildschirm behauptet für einen unberührten Bereich, er sei fast erledigt und man „lerne weiter“. Das ist eine falsche Zahl auf dem meistgesehenen Bildschirm.
- Vorschlag: Entweder (a) Ring und Zeile auf den Bereich beziehen: pro Bereich die heute bewerteten Karten zählen (z. B. Karten des Bereichs mit `ersteBewertung === heute` oder in der Runde gezählte Bewertungen je Bereich im Arbeitsspeicher `ui`), oder (b) einfacher: Ring-Anteil = erledigte fällige Karten des Bereichs; die Zeile „Heute schon N Antworten“ nur zeigen, wenn es nur einen Bereich mit Karten gibt, und Knopftext „Weiterlernen“ nur, wenn in diesem Bereich heute schon bewertet wurde. Kommentar in `heuteAnteil` mitziehen.
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Prüfstand-Szenario aus check2.js Teil 2: in b2 steht „Runde starten“, kein „Heute schon …“, Ring leer; in b1 unverändert.

#### REST-2: Kalender-Raster hat keine Wochen-Struktur (19 Spalten statt 7 Zeilen)
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:3226-3253` `renderKalender()` richtet ausdrücklich auf Sonntag aus, „sonst … stehen [die Zeilen] nicht mehr für Wochentage“. `styles.css:2906-2909` `.kal { grid-template-columns: repeat(auto-fill, minmax(13px, 1fr)); }` – Reihen fließen zeilenweise. Messung: `gridTemplateColumns` = **19 Spalten** am Handy 390 px; Foto `REST-handy-dunkel-fortschritt.png`: 19 Kästchen in Zeile 1, Rest in Zeile 2; Desktop ebenso (`REST-desktop-dunkel-fortschritt.png`). Zukünftige Tage (`sx`, transparent) erscheinen als Lücken am Ende. Verifiziert.
- Warum es stört: „Die letzten 4 Wochen“ lässt sich nicht lesen – weder Wochen noch Wochentage sind erkennbar; die JS-Ausrichtung auf Mo–So läuft ins Leere.
- Vorschlag: `.kal { grid-auto-flow: column; grid-template-rows: repeat(7, 1fr); grid-auto-columns: minmax(13px, 1fr); }` (Wochen = Spalten, Mo oben), Kästchengröße begrenzen (max. ~22 px), damit 4–12 Spalten ruhig stehen. Optional eine schmale Wochentagsspalte „Mo … So“ nicht nötig (Hick) – mindestens aber gleiche Richtung wie `lernenSerie` (heute rechts).
- Entscheidet: Agent (Gestaltung, Frage 6)
- Umsetzung: Sonnet
- Abnahme: `getComputedStyle(.kal).gridTemplateRows` hat 7 Spuren; bei 4 Wochen 4 Spalten; heute steht in der letzten Spalte in der Zeile seines Wochentags; `t_fortschritt.js`, `t_kontrast.js`, `t_sprung.js` grün.

#### REST-3: Lektionen-Seite im Fortschritt zeigt Schlösser in eigenen Bereichen – und widerspricht sich
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:9383-9395` `fortschrittLektionen()` nimmt `offeneLektionIds(bF)` ohne `istGefuehrt(bF)`-Prüfung; `offeneLektionIds` (`app.js:338-351`) sperrt jede Lektion nach einer, die nicht sitzt. Für eigene Bereiche gibt es aber gar kein Schloss (`freieIdsFor` → `null`, `setGesperrt` → `false`, `app.js:352-356, 371-383`). Messung (`vollerStore`, Bereich nicht geführt): Kopf „2 von 3 sitzen“, darunter Lektion 2 und 3 mit Schloss, leerem Balken und „13 Karten“/„15 Karten“ – genau die beiden, die laut Kopf sitzen. Foto `REST-handy-dunkel-fort-lektionen.png`. Verifiziert.
- Warum es stört: Die Seite lügt zweimal: Schloss, das nicht existiert, und 0 % bei Lektionen, die fertig sind. Der Code-Kommentar in `app.js:384ff` nennt genau das „einen Knopf, der lügt“.
- Vorschlag: In `fortschrittLektionen` `zu = istGefuehrt(bF) && !offenIds.has(st.id)`; `dran` ebenso nur im geführten Bereich (sonst weglassen).
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: vollerStore → Lektionen-Seite: kein `.lekt-kachel.zu`, Lektion 2/3 mit Haken und 13/13, 15/15; geführter Bereich (t_fortschritt „eine“/geführt) unverändert.

#### REST-4: „0 Antworten diese Woche ↓ 100 % zur Vorwoche“ nach einer Pause; „diese Woche“ sind in Wahrheit 7 rollende Tage
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:9282-9297` `fortschrittWochen()`: Kopf erscheint, sobald `letzte.gesamt > 0`, auch wenn `diese.gesamt === 0`. Messung (check2.js Teil 3, Verlauf nur vor 8–13 Tagen): „Die letzten 4 Wochen · **0** Antworten diese Woche · **↓ 100 % zur Vorwoche**“. Außerdem `verlaufSumme(7)` (`app.js:896-905`) = heute und 6 Tage davor, nicht Mo–So, während der Wochenrückblick-Hinweis (`letzteWoche`, `app.js:8926`) und das Raster (REST-2) Kalenderwochen meinen. Verifiziert.
- Warum es stört: LEHREN § 7.1 „Nichts, was eine Zahl als Stillstand liest (‚0 Tage‘)“ – genau wer nach einer Pause zurückkommt, sieht eine große 0 und einen roten 100-%-Pfeil. Das ist das Gegenteil von „Gründe zum Zurückkommen, ohne Nerven“. „Diese Woche“ am Montag mit 52 Antworten aus der Vorwoche ist zudem sachlich falsch.
- Vorschlag: (1) Bei `diese.gesamt === 0` keine große Zahl und keine Pille, stattdessen ein ruhiger Satz ohne Zahl (Wortlaut Betreiber/Agent, z. B. „Diese Woche noch nichts – eine Runde reicht für den Anfang.“). (2) Beschriftung ehrlich machen: „in den letzten 7 Tagen“ / „zu den 7 Tagen davor“ – oder die Rechnung auf Mo–So umstellen (dann Vergleich nur mit gleich vielen Tagen der Vorwoche, sonst ist Montag immer „↓“).
- Entscheidet: Agent (Text/Anzeige, keine Lernlogik)
- Umsetzung: Sonnet
- Abnahme: Szenario check2.js Teil 3 zeigt keine „0“ und keine Trend-Pille; `grep -n "diese Woche" app.js` passt zur Rechnung.

#### REST-5: Tägliche Erinnerung: jedes erneute Einrichten legt einen zweiten Kalendereintrag an; „aus“ kommt nie wieder
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:9036` `"UID:adrabic-erinnerung-" + Date.now() + "@adrabic"` – jede Datei hat eine neue UID, Kalender legen also einen weiteren Serientermin an statt den alten zu ersetzen. Die Einstellungszeile (`app.js:8022-8027`) liest `hinweisSpeicher().erinnerung` (nur dieses Gerät) und lädt zum Neu-Einrichten ein; es gibt keinen Weg zurück auf „aus“, auch wenn der Termin im Kalender längst gelöscht ist. Verifiziert (Code); Kalenderverhalten bei gleicher UID = Aktualisierung ist Vermutung (bei Apple/Google-Import üblich, am Gerät zu prüfen).
- Warum es stört: Wer die Zeit von 7:30 auf 19:30 ändert, bekommt zwei Erinnerungen am Tag – nervt, und genau das will der Betreiber nicht.
- Vorschlag: Feste UID (`adrabic-erinnerung@adrabic`) plus `SEQUENCE` hochzählen, damit ein erneuter Import ersetzt; im Blatt, wenn schon eingerichtet, der Satz „Eine neue Zeit ersetzt die alte, wenn dein Kalender sie übernimmt – sonst lösch den alten Eintrag.“ und eine Zeile „Als aus markieren“ (nur Merker auf dem Gerät löschen).
- Entscheidet: Agent
- Umsetzung: Sonnet
- Abnahme: Zwei Downloads nacheinander → identische `UID:`-Zeile, `SEQUENCE` steigt; Einstellungszeile lässt sich auf „aus“ setzen; Gerätetest beim Betreiber (iPhone + Google Kalender: nach Zeitwechsel nur ein Termin).

#### REST-6: Nach Bereichswechsel auf der Lektionen-Seite steht eine leere Seite
- Art: Fehler
- Schwere: niedrig
- Beleg: `app.js:9504` `if (id === "lektionen") return fortschrittLektionen(true);` liefert `""`, wenn der neue Bereich keine Lektionen hat; `ui.seite` bleibt beim Bereichswechsel stehen. Messung Desktop 1440: Fortschritt → Lektionen → links „Quran-Wörter“ → Inhalt nur „Lektionen“-Kopf, sonst leer (Foto `C-lektionen-nach-wechsel.png`). Am Handy nicht erreichbar (Unterseite hat keinen Bereichsknopf). Verifiziert.
- Warum es stört: Toter Bildschirm („nichts, was tot wirkt“).
- Vorschlag: In `renderFortschrittSeite` bei `lektionen` ohne Lektionen `ui.seite = null` und Übersicht zeigen – oder in `selectBereich` eine Fortschritts-Unterseite schließen.
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: gleiches Szenario zeigt die Fortschritts-Übersicht des neuen Bereichs.

#### REST-7: Meilenstein nennt die Marke, nicht die echte Zahl
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `app.js:8950-8954`: Text „<strong>25 Karten</strong> saßen schon einmal“ mit `erreicht` (Marke), nicht `gesessen`. Messung: Lernen zeigt „25 Karten saßen schon einmal“, Fortschritt im selben Konto „36 von 40 Karten saßen schon einmal“. Zusätzlich zählt `gesesseneKarten()` (`app.js:8918`) gesperrte Karten mit, `fortschrittStoff` (`statsCards`) nicht. Verifiziert.
- Warum es stört: Zwei verschiedene Zahlen für denselben Satz auf zwei Tabs wirken wie ein Rechenfehler.
- Vorschlag: „Über 25 Karten saßen schon einmal“ oder „Marke 25 geschafft – 36 Karten saßen schon einmal“; beide Stellen dieselbe Zählung (statsCards-Filter) verwenden.
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: vollerStore: Hinweis und Fortschritt zeigen dieselbe Zahl oder erkennbar eine Schwelle („über“).

#### REST-8: Segment „neu“ im Stoff-Band ist im Dunkelmodus unsichtbar
- Art: Verbesserung
- Schwere: niedrig
- Beleg: Messung dunkel: `.stat-bar` Hintergrund `rgb(7,6,6)`, erstes Segment (`--stufe-0`) `rgba(255,255,255,0.08)` – Kontrast ≈ 1,2:1; Foto `REST-handy-dunkel-fortschritt.png`: Band beginnt scheinbar erst bei 1/10 der Breite. Hell sichtbar. Verifiziert.
- Warum es stört: Band wirkt eingerückt/kaputt; Information „4 neu“ nur über die Legende.
- Vorschlag: Für das Band im Dunkelmodus ein festes Token für neu (≥ 3:1 gegen Band-Hintergrund, WCAG 1.4.11), z. B. `--stufe-0-fest`, wie bei `--stufe-1-fest`.
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: Kontrast Segment/Band ≥ 3:1 dunkel und hell (Pixel oder berechnet).

#### REST-9: Trefferflächen unter 44 px
- Art: Verbesserung
- Schwere: niedrig
- Beleg: Messung 390 px: `edit-leech` und `reset-leech` je 42×36 px (Seite „Karten, die nicht klappen“), `hinweis-weg` (X am Hinweis) 42×36, `close-error-modal` 40×40. LEHREN § 5.2: ≥ 44. Verifiziert.
- Warum es stört: Kleine Ziele nebeneinander (Stift/Zurücksetzen) → Fehltipp setzt den Rückfallzähler zurück.
- Vorschlag: `min-width/min-height: var(--tap)` für diese drei Knopf-Klassen (vorhandenes Token, vgl. Ziehgriff 3.0.46).
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: Rundgang meldet keine Knöpfe < 44×44 in diesen Ansichten; keine Sprünge (`t_sprung.js`).

#### REST-10: Zwei h1 auf Lernen; Kalender und Wochenpunkte für Bildschirmleser leer
- Art: Verbesserung
- Schwere: niedrig
- Beleg: Messung: Lernen hat `h1.appbar__title--ansicht` („Medina Buch 1“) **und** `h1.lernen-gruss__titel` (`app.js:6969`, `9098`). `renderKalender` (`app.js:3235`) ohne Rolle/Name, Tage nur als `title`. `lernenSerie` `role="img" aria-label="Die letzten sieben Tage"` (`app.js:9203`) sagt nicht, welche Tage gelernt sind. Verifiziert.
- Warum es stört: § 6.10 – Bildschirmleser bekommen auf Fortschritt nur die Zahl, nicht das Raster; zwei gleichrangige Überschriften.
- Vorschlag: Gruß als `h1`, Ansichtsname auf Lernen als `p`/`div` (Aussehen gleich) – oder umgekehrt; `aria-label` der Woche z. B. „5 von 7 Tagen gelernt, heute noch nicht“; `.kal` `role="img"` mit Summe („an 18 von 28 Tagen gelernt“).
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: `document.querySelectorAll('h1').length === 1` auf allen Bildschirmen; `t_a11y.js` grün.

#### REST-11: Zeitfeld im Erinnerungs-Blatt geht beim Neuzeichnen verloren
- Art: Fehler
- Schwere: niedrig
- Beleg: `app.js:9019` `<input type="time" id="erinnerung-zeit" value="20:00">`, Wert nicht in `ui`; `app.js:12237` liest das DOM. Messung: 06:15 eingetragen, fremdes Neuzeichnen (Snapshot) → Feld steht wieder auf 20:00; „Übernehmen“ legt dann 20:00 an. Verifiziert (§ 6.3).
- Warum es stört: Stiller falscher Termin.
- Vorschlag: `ui.erinnerungZeit` bei `input` setzen und im Markup verwenden (wie `feedbackEntwurf`).
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: Szenario check2.js Teil 5 liefert „06:15“.

#### REST-12: Gruß und Datum folgen der Uhr, der Rest der App dem Lerntag (4 Uhr)
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `lernenGruss()` `app.js:9088-9096` nutzt `new Date()`, alles andere `todayStr()` mit `DAY_START_HOUR = 4` (`app.js:98-104`). Zwischen 0 und 4 Uhr steht oben „Samstag, 26. September“, darunter ist in der Woche noch Freitag „heute“, und die Serie/Hinweis „Heute zählt“ meint Freitag. Verifiziert (Code), nicht gemessen.
- Warum es stört: Nachteulen sehen zwei verschiedene „heute“.
- Vorschlag: Datum aus `todayStr()` bilden (Gruß nach Uhrzeit darf bleiben).
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: mit gefälschter Uhr 01:30 (Playwright `clock`) zeigen Datum und Woche denselben Tag.

#### REST-13: „Fehler melden“: Leer-Fehler im Dialog, Esc/X löscht den Text
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `app.js:11697-11700` `dlgAlert("Bitte beschreib den Fehler.")` statt Fehler am Feld (§ 6.7, `.field__fehler`/`aria-invalid` gibt es). `app.js:11557` (Esc/Zurück) und `close-error-modal` rufen `closeErrorModal()` ohne `textBehalten` → `form.reset()`. Verifiziert (Code).
- Warum es stört: Wer versehentlich Esc/Zurück-Geste macht, verliert eine lange Fehlerbeschreibung.
- Vorschlag: Fehler am Feld anzeigen; beim Schließen Text behalten (nur nach erfolgreichem Absenden zurücksetzen – das ist heute umgekehrt).
- Entscheidet: Agent
- Umsetzung: Haiku
- Abnahme: leer absenden → Fehlerzeile am Feld, kein Dialog; Text tippen, Esc, wieder öffnen → Text da.

#### REST-14: Schriftprobe zeigt die Basmala – Wortlaut nicht vom Betreiber belegt
- Art: Verbesserung
- Schwere: niedrig
- Beleg: `app.js:8690-8691` Wahl-Blatt „Arabische Schrift“: `بِسْمِ ٱللّٰهِ` als Probe. Im Repo (CHANGELOG, plan/**/*.md) keine Freigabe dieses Wortlauts gefunden (grep nach dem Text, „Basmala“, „Schriftprobe“); Git-Verlauf ist flach, Herkunft unklar. Vermutung: von einem Agenten gewählt.
- Warum es stört: LEHREN § 2.1/2.3: religiöse Inhalte verfasst/wählt kein Agent, „auch nicht als Beispiel“; dazu wird hier ein heiliger Text als Größen-Testmuster verwendet – das kann man als unangemessen empfinden.
- Vorschlag: Betreiber fragen. Alternativen: (a) Basmala bleibt (Betreiber bestätigt Wortlaut), (b) das Einstiegs-Beispiel `EINSTIEG_BEISPIEL.arab` („كِتَابٌ“, schon freigegeben) als Probe, (c) ein Wort aus den eigenen Karten.
- Entscheidet: Betreiber (Religion)
- Umsetzung: Haiku
- Abnahme: Entscheidung im Logbuch; Probe entspricht ihr.
- Pro/Contra: Für Basmala: vertraut, zeigt Harakat, Schadda und Alif Wasla in zwei Wörtern – ideal zum Lesen-Prüfen. Dagegen: Regel § 2 verlangt Betreiber-Wortlaut; Verwendung als Testmuster kann respektlos wirken; `كِتَابٌ` ist schon freigegeben und zeigt ebenfalls Harakat. Empfehlung: (b) `كِتَابٌ` oder – besser zum Zweck – das erste Wort der eigenen Karten, sonst `كِتَابٌ`.

#### REST-15: Wochenziel statt nur Serie (freiwillig, ohne Strafe)
- Art: Funktion
- Schwere: niedrig
- Beleg: Heute gibt es nur Serie + Joker (`serieAktuell`) und den Wochenrückblick-Hinweis (`app.js:8956-8962`). Keine Ziel-Einstellung; nicht in CHANGELOG/Logbüchern abgelehnt (grep „Wochenziel|Tagesziel“: 0 Treffer).
- Warum es stört: Die Serie belohnt nur „jeden Tag“; wer bewusst 4 Tage/Woche lernt, verliert sie immer und sieht keinen Erfolg.
- Vorschlag: Einstellung „Lerntage pro Woche: 3 · 5 · 7 · aus“ (Wahl-Blatt), Anzeige in `lernenSerie` als „3 von 5 Tagen diese Woche“, ohne Rot und ohne Verlust-Sprache. Gerätelokal (`localStorage`, dann Datenschutzerklärung) oder Cloud-Feld (dann `normSettings` + `settingsOk()` + Regel-Deploy, § 8.1).
- Entscheidet: Betreiber (neue Funktion, berührt Serien-Darstellung)
- Umsetzung: Sonnet
- Abnahme: Wahl-Blatt in allen zentralen Listen (§ 6.2), Anzeige stimmt mit `verlauf` (Prüfstand), keine neuen Methoden-Zahlen.
- Pro/Contra: Pro: eigener Maßstab, Erfolg auch für Nicht-Täglich-Lerner, passt zu „ohne Nerven“; kleines Bauteil (Wahl-Blatt existiert). Contra: zweite Kennzahl neben der Serie (Hick; „nichts doppelt“), zusätzliche Einstellung, bei Cloud-Feld Regeländerung. Empfehlung: nur als **Ersatz der Anzeige** innerhalb der Serien-Karte bauen (eine Karte, eine Zahl), gerätelokal, oder gar nicht – nicht als zweiter Block.

#### REST-16: Echte Push-Erinnerung (Web Push) als Premium-Kandidat
- Art: Premium
- Schwere: niedrig
- Beleg: `app.js:8931-8935` und `plan/audit/LOGBUCH.md:1661`: Push abgelehnt, weil Server (FCM + Cloud Functions, Blaze) nötig. Neues Argument: iOS unterstützt Web Push seit 16.4 für Home-Bildschirm-Apps; eine Push-Erinnerung kann **klug** sein (nur wenn heute noch nichts gelernt und etwas fällig ist), was ein .ics nie kann.
- Warum es stört: Der Kalendereintrag erinnert auch an Tagen, an denen schon gelernt wurde – nach wenigen Tagen wird er weggeklickt (Gewöhnung).
- Vorschlag: Später, zusammen mit Premium: Cloud Function (geplant, stündlich) liest nur „heute gelernt?“ + Push-Abo; Opt-in-Schalter in Einstellungen „Tägliche Erinnerung“.
- Entscheidet: Betreiber (neue Funktion, Recht, Konsole/Blaze)
- Umsetzung: Opus
- Abnahme: Datenschutz-Abschnitt, Regel für Push-Abo, Opt-in, Gerätetest iOS/Android.
- Pro/Contra: Pro: wirkt nur, wenn nötig (weniger Nerven als tägliches .ics), klarer Premium-Mehrwert, Serie wird seltener unverschuldet verloren. Contra: erster eigener Server-Code (Kosten, Wartung, Sicherheit), Push-Token = personenbezogene Daten bei Google/Apple-Push-Diensten, Minderjährigen-Frage (C5) berührt, iOS nur installiert. Empfehlung: jetzt nicht; erst REST-5 beheben (.ics ohne Duplikate). Neu bewerten, wenn Premium und Cloud Functions ohnehin kommen.

---

## Geprüft ohne Fund

- Affe `handy 150 11`: 0 Befunde (keine Fehler, kein Überlauf).
- Kein waagerechter Überlauf auf allen 20 Stationen × 3 Varianten; keine Konsolen-/Seitenfehler.
- Zahlen mit `vollerStore()` nachgerechnet und richtig: 12 fällig = 8 Wiederholungen + 4 neu; Stoff 36/40 und Verteilung 4/12/12/9/3; „52 Antworten“ und „↓ 20 %“ (65 in der Vorwoche); „4 Wochen“; Leeches 2 (6×); Vorschau 8/3/3/3/3/2/2 = 24; „2 von 3 sitzen“ (Zählung selbst richtig, nur Schlossanzeige falsch, REST-3); Aufzeichnung 21 Tage; „vor 3 Tagen“.
- Serie/Hinweis „Heute zählt: … Serie von 7 Tagen“ bei verziehenem gestrigen Tag korrekt; Einzahl/Mehrzahl in Stapel, Rundenende, Wochenrückblick, Konto-Löschen-Liste, Daten-Seite.
- Wahl-Blätter (Rundengröße, Schrift, Helligkeit), Erinnerungs-Blatt: in `schliesseObersteEbene`, `overlayIstOffen`, `overlaySchluessel`, `blattOffen`, `tabSchonAktiv` eingetragen (§ 6.2).
- Ideen-Board: Laden mit Zeitlimit/Token, kein Auto-Neuversuch, Doppel-Einreichen gesperrt, Entwurf überlebt Neuzeichnen, optimistische Stimme mit Rücknahme, Moderation nur Betreiber.
- Üben-Auswahl: Chips an/aus, Schreiben-Schalter in `ui` (Station 8 hält), Zahl „40 Karten“; Schreib-Canvas: helle Tinte im Dunkelmodus, „Strich zurück“ gesperrt statt nachträglich erscheinend.
- Einstellungen-Übersicht, Profil „Dabei seit“, Rechtslinks, Version; Daten- und Kartensatz-Seite Texte; Offline-Sperre der Teilen-Knöpfe (Code).
- ICS-Aufbau (RRULE, DTSTART lokal, VALARM, CRLF) formal in Ordnung (außer UID, REST-5); iOS-Import über `data:`-Adresse bleibt Gerätetest beim Betreiber (LEHREN § 11).
- Desktop 1440: Seitenleiste mit Bereichen und Einstellungen, Fortschritt zweispaltig ohne Überlauf.
