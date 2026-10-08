# Zugänglichkeit Geräte Zielgruppen

Wörtlich aus dem Chat 981b69a1, Agent 22, gestartet 2026-10-07 15:55 (Quelle: `agent-a67c463577963ee2c.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 13 Agenten der ZWEITEN Runde für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css ~260 KB, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server). Betreiber ist ein Einzelner, Nutzer bisher er und wenige Freunde (überwiegend iPhone); Ziel: öffentliche, ernsthafte Lern-Website für deutschsprachige Muslime, die Quran-/klassisches Arabisch lernen.
Der Betreiber hat entschieden: Er will ALLES Nützliche aus Runde 1 bauen. Runde 2 soll tiefer und weiter schauen.
ERGEBNIS RUNDE 1 (nicht wiederholen): geplant u. a. Wake Lock, Druckansicht, Tastaturkürzel am Desktop ausbauen, Harakat-Eingabeleiste, Bearbeiten in der Abfrage, Filter in Verwalten, öffentliche Startseite. Nicht geprüft wurden bisher: Barrierefreiheit, große Bildschirme, ältere/schwächere Geräte, unterschiedliche Nutzergruppen.
HARTE REGELN: NUR LESEN im Repo. Keine Datei anlegen/ändern, keine git-Befehle außer lesenden, keine Tests/Server/Skripte. app.js und styles.css nie komplett lesen: Grep, dann Ausschnitte. Projektregeln: keine Dark Patterns; README.md enthält Gestaltungsregeln (Eintrittsbewegungen als @keyframes, ein delegierter Klick-Listener über data-action); UI-/Motion-Änderungen haben in diesem Projekt oft neue Fehler erzeugt (CLAUDE.md, plan/onboarding/CHATGPT-HANDOFF-2026-09-27.md) – Vorschläge deshalb klein und lokal halten.
AUSGABEFORMAT (Deutsch, max. ca. 1000 Wörter): Teil 1 "Befunde/Ideen" (8–14 Punkte; je Punkt: Titel, was genau, Nutzen/für wen, Aufwand S/M/L, Abhängigkeiten, Risiko/Gegenargument, Beleg Datei:Zeile oder URL). Teil 2 "Fragen an den Betreiber" (3–8 Fragen, jede mit 2–3 Sätzen Hintergrund, Auswahlmöglichkeiten und Empfehlung, sodass er ohne Nachschlagen antworten kann). Ungeprüftes als Vermutung kennzeichnen – du kannst die App nicht starten, also alles aus dem Code ableiten.

DEIN AUFTRAG: Für wen funktioniert die App heute NICHT gut, obwohl sie es könnte? Lies plan/phase-9-barrierefreiheit/ (alles), plan/zyklus-2/befunde/ (die Befunddatei zu Barrierefreiheit/Bedienung, falls vorhanden – Bekanntes nicht wiederholen), README.md Gestaltungsteil. Prüfe im Code: (1) Barrierefreiheit: Rollen/aria-Attribute der Karte und der Bewertungsknöpfe, lang="ar"/dir="rtl" an arabischem Text (Grep "schriftAttr", "lang=", "dir="), Fokusführung in Blättern/Dialogen, Screenreader-Ansage beim Aufdecken (aria-live), Tastaturbedienung aller data-action-Elemente (sind es echte button-Elemente?), Kontraste der Farbthemen (Farbwerte aus styles.css gegen WCAG rechnen, mindestens für Fließtext, Hinweistext und die drei Bewertungsfarben; Rot/Grün-Unterscheidung nur über Farbe?), prefers-reduced-motion, Schriftgrößen-Einstellung des Systems (rem vs. px, Zoom gesperrt? viewport user-scalable), Mindestgröße der Tippziele. (2) Arabische Lesbarkeit: Schriftgrößen und Zeilenhöhe für Arabisch mit Harakat, einstellbare Größe (Bereich?), Verhalten langer Wörter/Sätze auf der Karte, gemischter Text deutsch/arabisch (bidi) in Notizen. (3) Große Bildschirme: Gibt es ein Layout für Tablet quer/Desktop (Grep "@media (min-width"), oder ist es ein gestrecktes Handy? Was würde ein Lehrer am Laptop beim Anlegen von 50 Karten erleben? (4) Schwache/alte Geräte und schlechtes Netz: Startzeit mit 820 KB JS, Verhalten offline beim ersten Start, alte iOS-Versionen (welche JS/CSS-Features setzen die Untergrenze? Grep nach neueren Features wie ":has(", "dvh", "structuredClone", "at(", "container"), Android-Mittelklasse. (5) Nutzergruppen mit eigenen Bedürfnissen: ältere Lernende (große Schrift, einfache Wege), Kinder, die am Gerät der Eltern lernen (ohne eigenes Konto – was geht heute?), Menschen mit wenig Deutsch (Oberfläche nur Deutsch – wie aufwendig wäre eine zweite Oberflächensprache wie Englisch oder Türkisch, sind Texte zentral oder überall im Code verstreut? Grep-Stichprobe), Linkshänder beim Handschrift-Feld/Wischen. Bewerte, welche Verbesserungen den Kreis der Nutzer wirklich vergrößern und welche nur Pflichtübung sind.

## Bericht des Agenten

## Für wen funktioniert Adrabic heute nicht gut? (nur Code gelesen, nichts gestartet, nichts gerechnet per Skript)

Vorab, was in Ordnung ist und keine Arbeit braucht:
- Zoom ist nicht gesperrt (`index.html:14`), Wurzelschrift in Prozent, fast alles in rem (`styles.css:383`, `:216-223`).
- Alle `data-action`-Elemente sind echte `button`; Ausnahmen sind nur Dialog-Hüllen und die Auswahlzeile mit Checkbox (`app.js:13215`, in Phase 9 geprüft).
- Dialoge haben `role="dialog"`, Fokusfalle und Fokus-Rückgabe (`app.js:8724-8743`, `:14273-14280`).
- `prefers-reduced-motion` gilt global (`styles.css:577`), `:focus-visible` ist sichtbar (`:438`).
- Die drei Bewertungsknöpfe tragen Wörter ("Nicht/Fast/Sicher") und feste Plätze, also nicht nur Farbe (`app.js:11280-11282`).
- Kontraste, von mir überschlagen: Fließtext dunkel etwa 17:1, Hinweistext (`--text-3`) etwa 5–6:1, Rot und Grün auf ihren Flächen in beiden Themen etwa 5,2–5,5:1. Das deckt sich mit `t_kontrast.js` und Phase 9.
- Tablet und Desktop haben ein eigenes Layout: Seitenleiste ab 900 px, Zweispalter ab 720 px, Dialog mittig ab 600 px (`styles.css:4718`, `:4909`, `:3442`). Es ist kein gestrecktes Handy.

### Teil 1 – Befunde/Ideen

**1. Aufdecken wird dem Screenreader nicht angesagt, der Fokus fällt vermutlich ins Leere**
- Was: `revealAnswer()` ruft nur `render()` (`app.js:5930-5946`); `ansagen()` wird beim Aufdecken und Bewerten nie aufgerufen (Aufrufe nur `:1819`, `:2355`, `:5548`, `:9875` …). `render()` stellt den Fokus nur über `id` oder Ziehgriff wieder her (`:8758-8765`); die Lernknöpfe haben keine `id`. Vermutung: Nach "Antwort zeigen" steht VoiceOver auf `body`.
- Vorschlag: `ansagen(Antworttext)` beim Aufdecken, `ansagen("Nächste Karte: …")` nach dem Bewerten.
- Nutzen: Blinde und Sehbehinderte; für sie ist die Kernfunktion heute praktisch unbenutzbar. Aufwand S.
- Risiko: `#ansage` ist `lang="de"`, Arabisch würde deutsch vorgelesen; braucht einen zweiten Ansage-Knoten mit `lang="ar"`. Ohne echten VoiceOver-Test (Phase-9-Fußnote, weiter offen) ist das Raten.

**2. Arabisch-Größe hat nur drei Stufen, die größte ist 1,3**
- Was: `ARAB_STUFEN` 0,85 / 1 / 1,3 (`app.js:1175-1179`). Kartenwort `clamp(2rem, 9vw, 3.25rem) × Faktor` (`styles.css:3525`), Listen 1,2 rem × Faktor (`:3534`).
- Vorschlag: vierte Stufe "Sehr groß" (1,6).
- Nutzen: ältere Lernende und alle, die Harakat schwer trennen können. Das ist ein echter Nutzerkreis. Aufwand S.
- Risiko: Lange Wörter und Sätze brechen per `word-break: break-word` (`:1820`); bei 1,6 wird die Karte höher als der Bildschirm. Auf 320 px prüfen.

**3. Deutsche Oberfläche folgt nur der Browser-Schriftgröße, nicht der iOS-Einstellung**
- Was: `-webkit-text-size-adjust: 100%` (`styles.css:384`). iOS "Größerer Text" wirkt in der installierten PWA nicht (Vermutung, bekanntes Safari-Verhalten). Kleinster Lesetext 13,8 px, Mikrotext 11,7 px (`:216-217`).
- Vorschlag: Einstellung "Schrift der Oberfläche: Normal/Groß", die die Wurzel von 106,25 % auf etwa 120 % setzt.
- Aufwand M: Jeder Bildschirm muss bei 120 % auf Überlauf geprüft werden; genau solche Änderungen haben hier schon Layoutfehler erzeugt.

**4. Notizen mit gemischtem Deutsch/Arabisch haben keine Richtungsangabe**
- Was: `.study-extra` und `<textarea id="f-extra">` ohne `dir="auto"` (`app.js:11207`, `:8386`); Texte-Lernen hat es schon (`:12047`). Eine arabische Beispielzeile steht linksbündig, Satzzeichen landen auf der falschen Seite.
- Vorschlag: `dir="auto"` je Absatz. Aufwand S.
- Vermutung: Arabisch in der Notiz läuft außerdem in der Systemschrift statt der Quran-Schrift, weil die Klasse `.arabic` fehlt.

**5. Handschrift-Vollbild: Vorlage ohne `lang`/`.arabic`**
- Was: `hw-vorlage` gibt die Frage roh aus (`app.js:11368`); nur die Antwort bekommt `lang="ar" dir="rtl"`.
- Vorschlag: `schriftAttr()` verwenden. Aufwand S, kaum Risiko.

**6. Lehrer am Laptop: 50 Karten heißt 50-mal dasselbe Blatt**
- Was: Karten entstehen einzeln im Dialog mit drei Feldern, maximal 460 px breit (`app.js:8357-8409`, `styles.css:3393`). Import nimmt nur JSON (`app.js:8615`); es gibt kein CSV und kein Einfügen aus Tabellen.
- Vorschlag: "Mehrere einfügen": Textfeld, je Zeile `Wort ; Übersetzung ; Notiz` (Tab-getrennt aus Excel), mit Vorschau. Das Muster existiert schon bei Texten ("Jede Zeile wird ein Lernschritt", `:12047`).
- Nutzen: Lehrer und alle mit Vokabellisten. Das ist der größte Hebel für den Nutzerkreis. Aufwand M.
- Risiko: Spalten vertauscht, Dubletten; Vorschau ist Pflicht.

**7. Untergrenze iOS: praktisch 16.2**
- Was: `color-mix()` als Hintergrund von Kopfleiste, Navigation und Modusleiste (`styles.css:724`, `:820`, `:919`). Einen Ersatzwert davor habe ich nicht gesehen. Vermutung: Auf iOS unter 16.2 (iPhone 7, 6s) sind diese Leisten durchsichtig und Text läuft durcheinander.
- Dazu `:has()` und `svh`/`dvh` (ab 15.4); `:has()` steuert hier meist nur Animationen (`:2230`). Im JS fand ich nichts Neueres als `crypto.randomUUID` (15.4).
- Vorschlag: je eine Zeile `background: var(--bg);` vor den drei `color-mix`-Zeilen. Aufwand S, risikoarm.

**8. Erster Start bei schwachem Netz**
- Was: 817 KB `app.js` und 263 KB CSS (unkomprimiert), dazu drei Firebase-Module von gstatic. Quran-Schrift 242 KB als TTF mit `font-display: swap` (`styles.css:3494-3497`), also springt arabischer Text beim ersten Mal um.
- Offline-Erststart geht prinzipbedingt nicht (kein Service Worker, kein Konto). Ab dem zweiten Start kommt alles aus dem Cache (`sw.js:147-160`, `:208-211`).
- Vorschlag: Schrift als WOFF2 (rund 40–50 % kleiner, Lizenz prüfen) und `<link rel="preload">`. Aufwand S.
- Gegenargument zu mehr: Code-Splitting ohne Build wäre L und riskant; nicht empfohlen.

**9. Kinder am Gerät der Eltern: nicht möglich**
- Was: Es gibt kein anonymes Konto und keine Profile (`signInAnonymously` fehlt; ein Konto ist ein Nutzerdokument). Ein Kind lernt im Stand der Eltern oder braucht eine eigene E-Mail und ständiges Ab- und Anmelden.
- Lösung wäre "Lernprofile in einem Konto": Datenmodell, Regeln, Lernlogik-Nähe. Aufwand L.
- Vorschlag: nicht bauen; in die FAQ schreiben, dass eine zweite Adresse genügt.

**10. Zweite Oberflächensprache: sehr teuer**
- Was: Texte stehen als deutsche Literale direkt in den HTML-Strings, auch in `aria-label`, Toasts und Dialogen (Stichproben `app.js:8364-8408`, `:10135-10162`, `:11280`). Es gibt keine Textfunktion und kein `navigator.language`.
- Einschätzung: mehrere tausend Stellen; Aufwand L+ mit dauerhafter Doppelpflege und Layoutbrüchen durch andere Wortlängen. Dazu kämen Rechtstexte und religiöser Wortlaut, den nur der Betreiber liefern darf.
- Vorschlag: höchstens die öffentliche Startseite zweisprachig.

**11. Linkshänder**
- Was: Wischen ist fest belegt (rechts "Sicher", links "Nicht", `app.js:6242-6245`), Knopfreihe Nicht/Fast/Sicher. Zeichenleiste ist zentriert unter der Fläche (`styles.css:3474-3477`), verdeckt also nichts.
- Einschätzung: kein Problem beim Schreiben. Spiegeln der Knöpfe wäre S, aber eine weitere Einstellung für sehr wenige. Pflichtübung.

**12. Tippziele**
- Was: `--tap: 44px` ist durchgängig; rund 13 Stellen mit 24–39 px beziehungsweise `--ctrl-sm: 36px` (`styles.css:249`), teils schon in EINST-11 erfasst.
- Vorschlag: nur im Zuge von Zyklus 2 mitnehmen. Pflichtübung.

**Gewichtung:** Den Kreis vergrößern wirklich 6 (Lehrer und Listen), 2 und 3 (Ältere), 7 (alte iPhones, eine Zeile), 1 (Blinde, aber nur mit echtem Gerätetest). Sauberkeit ohne neue Nutzer sind 4, 5, 8, 12. Nicht bauen: 9, 10, 11.

### Teil 2 – Fragen an den Betreiber

**F1. Mehrere Karten auf einmal einfügen?**
Heute entsteht jede Karte einzeln im Blatt, Import geht nur als JSON-Datei. Ein Lehrer mit einer Vokabelliste in Excel oder Word hat keinen Weg hinein.
- (a) Einfügefeld "eine Zeile = eine Karte" mit Vorschau
- (b) zusätzlich CSV-Datei
- (c) nichts

Empfehlung: (a). Kopieren aus Excel liefert Tab-getrennte Zeilen, das deckt CSV praktisch mit ab.

**F2. Vierte Arabisch-Größe "Sehr groß"?**
Heute ist "Groß" Faktor 1,3. Für ältere Augen sind Fatha, Kasra und Sukun in Listen (dann etwa 26 px) weiter knapp.
- (a) vierte Stufe 1,6
- (b) "Groß" auf 1,45 anheben
- (c) lassen

Empfehlung: (a). Bestehende Nutzer merken nichts.

**F3. Größere Schrift auch für die deutsche Oberfläche?**
Die iOS-Einstellung "Größerer Text" wirkt in der installierten App vermutlich nicht. Ein eigener Schalter würde alles um etwa 15–20 % vergrößern, verlangt aber eine Prüfung jedes Bildschirms.
- (a) jetzt
- (b) erst wenn ein echter Nutzer danach fragt
- (c) nie

Empfehlung: (b). Das Risiko neuer Layoutfehler ist real; Arabisch-Größe (F2) hilft den meisten schon.

**F4. Alte iPhones (iOS 15, also iPhone 7/6s) unterstützen?**
Vermutlich sind dort Kopf- und Navigationsleiste durchsichtig. Die Reparatur sind drei Zeilen CSS als Ersatzfarbe.
- (a) reparieren, Untergrenze iOS 15.4 nennen
- (b) "ab iOS 16.4" festlegen (ohnehin Voraussetzung für Web-Push)

Empfehlung: (a), da fast kostenlos. Hast Du ein altes Gerät zum Gegenprüfen?

**F5. Screenreader ernsthaft unterstützen?**
Beschriftungen und Dialoge sind gut, aber die Lernrunde sagt die Antwort nicht an. Ohne Test mit VoiceOver auf Deinem iPhone (Einstellungen → Bedienungshilfen → VoiceOver, etwa 15 Minuten) wäre jede Änderung blind.
- (a) Du testest einmal und meldest, dann gezielt reparieren
- (b) Ansage ungeprüft einbauen
- (c) zurückstellen

Empfehlung: (a).

**F6. Kinder oder Geschwister auf einem Gerät?**
Mehrere Lernprofile in einem Konto wären ein großer Eingriff in Datenmodell und Regeln.
- (a) nicht bauen, Hinweis "eigene E-Mail-Adresse pro Person"
- (b) als spätere Phase vormerken
- (c) jetzt planen

Empfehlung: (a).

**F7. Zweite Oberflächensprache?**
Die Texte stehen an tausenden Stellen direkt im Code. Englisch oder Türkisch hieße alles herausziehen und dauerhaft doppelt pflegen, samt Rechtstexten.
- (a) nein, die Zielgruppe ist deutschsprachig
- (b) nur die öffentliche Startseite zusätzlich auf Englisch
- (c) ganze App

Empfehlung: (a), allenfalls (b).

Gelesen: `C:\Users\USER\Wiederholung\plan\phase-9-barrierefreiheit\AUFTRAG.md` und `LOGBUCH.md`, `plan\zyklus-2\befunde\*` (nur per Suche), `app.js`, `styles.css`, `index.html`, `sw.js`. README-Gestaltungsteil habe ich nicht eigens gelesen.
