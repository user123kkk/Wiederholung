# Nutzerstimmen und Schmerzpunkte

Wörtlich aus dem Chat 981b69a1, Agent 5, gestartet 2026-10-07 15:39 (Quelle: `agent-a5f01f43ab49ef887.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 12 parallelen Ideen-Agenten für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server; Hosting Firebase). Der Betreiber ist ein Einzelner, bisher Nutzer: er und wenige Freunde; Ziel ist eine öffentliche, ernsthafte Lern-Website. Zielgruppe: deutschsprachige Muslime, die Arabisch (Quran-/klassisches Arabisch) lernen. Neu im Probelauf: "Texte auswendig lernen" (u. a. Quran, Tanzil-Daten unter quran/).
Frage des Betreibers: Wie kann das Tool ECHTEN, UNBESTREITBAREN Mehrwert bieten – Features, Ausbau, Verbesserungen, Neues. Er will ein großes, gründliches Ergebnis.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Also: keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden (log, show, diff, grep), keine Tests, keine Server, keine Skripte aus plan/werkzeuge starten, nichts installieren. app.js nie komplett lesen, sondern mit Grep gezielt suchen und Ausschnitte lesen.
Nützliche Dateien: KONZEPT.md, README.md, CHANGELOG.md, plan/STAND.md, plan/grossplan/FUNKTIONEN.md (bereits bewertete Funktionen: Korb 1/2/3 – nichts davon einfach wiederholen, sondern darauf aufbauen oder begründet widersprechen), plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/monetarisierung/GERUEST.md, plan/landing-page-strategie/STRATEGIE.md, plan/beobachtungen-lernwerkzeug.md, plan/zyklus-2/AUFGABEN.md.
Rahmenbedingungen des Projekts: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte selbst (Wortlaut kommt vom Betreiber oder aus geprüften Quellen); keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben der Nutzer. Keine Dark Patterns. Datenschutz (DSGVO) ernst. Kein eigener Server (Cloud Functions wären eine bewusste Entscheidung – als Abhängigkeit kennzeichnen).
AUSGABEFORMAT (Deutsch, max. ca. 900 Wörter, kein Vorgeplänkel): 8–14 konkrete Ideen. Je Idee: Titel; was genau (2–3 Sätze); für wen und welcher belegbare Nutzen; Aufwand S/M/L; Abhängigkeiten (Server? Inhalte vom Betreiber? Lizenz? iOS-Grenzen?); Risiko/Gegenargument; Beleg (Datei:Zeile im Repo bzw. URL). Am Ende: deine Top 3 mit einem Satz Begründung und 1–2 Dinge, die man ausdrücklich NICHT bauen sollte. Ehrlich gewichten, nicht verkaufen. Nichts erfinden: Was du nicht geprüft hast, als Vermutung kennzeichnen.

DEIN BLICKWINKEL: Echte Nutzerstimmen. Recherchiere im Web, was Arabisch-Lernende (besonders Muslime, die Quran-Arabisch lernen, Schüler von Madinah-Büchern/Arabisch-Instituten, Hifz-Schüler) über ihre Probleme schreiben: Reddit (r/learn_arabic, r/islam, r/Anki, r/Hifz, r/languagelearning), Anki-Forum, App-Store-/Play-Store-Rezensionen von Arabisch- und Quran-Lern-Apps, deutschsprachige Foren/Blogs/YouTube-Kommentare, Telegram-/Kurs-Umfelder soweit öffentlich. Sammle wiederkehrende Schmerzpunkte mit Quelle (URL): z. B. "Ich höre nach 3 Wochen auf", "Anki ist zu kompliziert einzurichten", "Karten selbst erstellen dauert ewig", "ich erkenne das Wort nur mit Harakat", "ich vergesse, was ich vor einem Jahr gelernt habe", "Kursvokabeln gibt es nicht als fertiges Deck", "zu viele fällige Karten nach Pause", "arabisch tippen am Handy". Ordne jedem Schmerzpunkt zu: Löst Adrabic das schon (kurz im Repo prüfen: README.md, plan/grossplan/FUNKTIONEN.md, Grep in app.js), teilweise, oder gar nicht? Leite daraus Ideen ab, sortiert danach, wie oft und wie heftig der Schmerz genannt wird. Zitate höchstens kurz und sinngemäß wiedergeben, keine langen wörtlichen Übernahmen.

## Bericht des Agenten

## Nutzerstimmen → Ideen (Blickwinkel: echte Schmerzpunkte)

**Vorbehalt zur Quellenlage:** Reddit-Threads (r/learn_arabic, r/Hifdh, r/Anki) und AnkiWeb-Deckrezensionen ließen sich nicht direkt abrufen (Abruf leer/verweigert). Auch deutschsprachige Stimmen (gutefrage, Foren) fand die Suche nicht. Belegt sind unten nur Anki-Forum, App-Store-Rezensionen, quran.com-Feedback, GitLab-Issue, eine Befragungsstudie und ein Hifz-Substack. Die Häufigkeits-Reihenfolge ist deshalb meine Einschätzung, keine Zählung.

### Schmerzpunkte und Stand in Adrabic

| Schmerz | Quelle | Adrabic |
|---|---|---|
| Kartenberg nach Pause (1 Monat weg → 1.700 fällig; Nutzerin entmutigt) | [Anki-Forum 34967](https://forums.ankiweb.net/t/anki-showing-too-many-cards-since-a-study-break/34967), [20516](https://forums.ankiweb.net/t/after-a-long-break-no-learning-possible/20516) | teilweise: Tageslimit neue Karten, Jitter, 14-Tage-Regel für die Serie (CHANGELOG.md:3743, 4926). Offen: „1100 fällig“ ohne Angebot (plan/zyklus-2/befunde/LERN.md:118, Z7 „später“) |
| Altes Gelerntes geht verloren, neu gegen alt nicht ausbalanciert, Berufstätige ohne Zeit | [qari.substack](https://qari.substack.com/p/hifz-q-and-a), [quran.com-Feedback](https://feedback.quran.com/feature-requests/p/hifdh-feature) | gelöst im Probelauf (Kreis, Tagesmenge; plan/texte-lernen/KONZEPT.md:73), aber nur im Betreiber-Konto (plan/STAND.md:45) |
| Ähnliche Verse verwechseln (41 % von 335 Befragten) | [HRMARS-Studie](https://hrmars.com/papers_submitted/5683/verse-of-mutasyabihat-pronouncement-in-tahfiz-al-quran-education-an-early-survey.pdf) | gar nicht |
| Wo genau hake ich? Fehler je Wort, Verlauf über mehrere Durchgänge; Lehrer/Eltern sehen mit | [quran-android #222](https://gitlab.com/greentech/quran/quran-android/-/issues/222) | teilweise („Hakt“ → Zeilen antippen, KONZEPT.md:126); kein Verlauf je Zeile sichtbar (Vermutung, nicht geprüft) |
| Fehlerverlauf und Verdeckt-Modus hinter Abo; Abstürze | [Tarteel-Rezensionen](https://justuseapp.com/en/app/1391009396/tarteel-recite-al-quran/reviews) | Chance: Texte sind kostenlos beschlossen (KONZEPT.md:368) |
| Anki-Einrichtung für Arabisch frisst Zeit (Schrift, RTL, Harakat verrutschen auf iOS) | [Anki-Forum 61599](https://forums.ankiweb.net/t/arabic-text-not-displaying-properly/61599), [15318](https://forums.ankiweb.net/t/anki-is-not-respecting-rtl-right-to-left-text/15318) | gelöst (Arabisch-Auszeichnung, eigene Schrift; CHANGELOG.md:4869) – wird aber nirgends als Vorteil gesagt (Vermutung zur Startseite) |
| Fertige Decks: Fehler, vermischte Felder, falscher Ton; selbst erstellen dauert | [AnkiWeb-Deck 2138698664](https://ankiweb.net/shared/info/2138698664) (nur Suchauszug) | gar nicht: „Liste einfügen“ wurde in 1.6.0 gebaut und wieder entfernt (CHANGELOG.md:4942); F-1 wartet |
| Nur Erkennen, kein Produzieren; Wörter ohne Kontext | [Kalimah Center](https://kalimah-center.com/?p=88605) (Anbieterblog, kein Nutzer) | teilweise: Handschrift; zweite Richtung F-5 offen |
| Lesen ohne Harakat | [fluentarabic.net](https://www.fluentarabic.net/arabic-books-with-harakat/) (schwacher Beleg) | nur Suche (CHANGELOG.md:4667); F-2 offen |
| Wunsch: Grammatik und Zusammenhang zur Vokabel | [Quranic, App Store](https://apps.apple.com/us/app/quranic-quran-arabic-learning/id1381145375) | gar nicht |

### Ideen (nach Schmerzstärke)

1. **Rückkehr nach Pause.** Bei Rückstand über dem größten Rundenlimit ein Angebot „Erst einmal 20“, dringendste zuerst, plus ehrlicher Satz. Nutzen: genau der Moment, in dem Anki-Nutzer aufgeben. Aufwand S. Abhängig von E-05 (Sortierung). Risiko: zweiter Knopf bricht „eine Handlung“. Beleg: LERN.md:118–127.
2. **Texte für alle freigeben, sobald Probelauf ausgewertet.** Kreis-Wiederholung ist die meistgewünschte Hifz-Funktion (quran.com-Wunsch nennt Sabaq/Sabqi/Manzil wörtlich). Aufwand S (Schalter), Rechtsprüfung Art. 9 vorher. Risiko: Methode erst an einer Person erprobt. Beleg: STAND.md:62–67.
3. **Stolperstellen-Verlauf je Zeile.** Zeilen, die in den letzten Durchgängen „hakten“, sichtbar markieren und vor dem Kreis gezielt anbieten. Nutzen: GitLab-Wunsch „letzte 5 Durchgänge“, bei Tarteel bezahlt. Aufwand M; neues Feld → Regeln, Datenschutzerklärung. Risiko: Statistik-Ausbau widerspricht „System nicht verraten“ (FUNKTIONEN.md:63).
4. **Hinweis auf ähnliche Verse.** Beim Aufdecken: „ähnlich: Sure X, Aya Y“ mit beiden Wortlauten nebeneinander. Aufwand M–L. Abhängigkeit: geprüfte Liste – kein Agent erzeugt sie; ein rein mechanischer Textvergleich über die Tanzil-Datei wäre denkbar, braucht aber Freigabe des Betreibers. Risiko: falsche Paare bei Quran-Text.
5. **Liste einfügen (F-1), mit Blick auf Anki-Umsteiger.** Tab-getrennte Zeilen samt Vorschau und Duplikatprüfung. Aufwand M. Gegenargument: Betreiber hat es schon einmal entfernt (CHANGELOG.md:4942) – Grund vorher klären (Projektakte Abschn. 10, nicht gelesen).
6. **Geprüfter Kurs-Kartensatz Medina Band 1.** Der stärkste Unterschied zu fehlerhaften Community-Decks wäre ein von Menschen geprüfter, deutscher Satz. Aufwand L (Inhalt). Abhängigkeit: Urheberrecht des Buchs, Inhalt vom Betreiber (KONZEPT.md:214, FUNKTIONEN.md:22). Risiko: Rechtslage ungeklärt.
7. **Ohne Harakat abfragen (F-2)** als Runden-Schalter. Aufwand S. Nicht für Quran-Texte ohne Betreiber-Entscheid. Beleg dünn, Nutzen fachlich plausibel.
8. **Deutsch → Arabisch (F-5).** Antwort auf „nur Erkennen“. Aufwand L, Lernlogik. Erst nach 1–5.
9. **Lehrer/Eltern sehen Stand bei Texten.** Wunsch aus GitLab-Issue; baut auf „Lehrer gibt frei“ (CHANGELOG.md:1859). Aufwand L. Risiko: Daten Minderjähriger über Konten hinweg, Art. 9; T11 „später“.
10. **Startseite sagt, was Anki nicht kann:** Arabisch korrekt ohne Einrichtung, Handschrift, Texte im Kreis. Aufwand S, nur Text (Wortlaut Betreiber).
11. **Beispielsatz/Fundstelle auf der Karte (F-9-Vorstufe).** Antwort auf „Wörter ohne Kontext“. Aufwand M; Inhalt von Nutzenden. Risiko: 0-von-136-Erfahrung beim Wurzelfeld (FUNKTIONEN.md:70) spricht dagegen.

### Top 3
1. **Rückkehr nach Pause (1)** – bestbelegter Abbruchgrund, kleinster Aufwand.
2. **Texte freigeben (2)** – größter Wunsch im Hifz-Umfeld, ist schon gebaut und kostenlos, wo andere Geld nehmen.
3. **Stolperstellen-Verlauf (3)** – konkret verlangt und bei der Konkurrenz Bezahlfunktion.

### Nicht bauen
- **Spracherkennung beim Aufsagen:** Tarteels Kern, dort Hauptquelle der Beschwerden (Hängenbleiben, Abstürze); braucht Server und Stimmdaten (KONZEPT.md:488).
- **Alles-in-einem (Tafsir, Gebetszeiten, Rezitatoren):** wird in Rezensionen gewünscht, liegt aber außerhalb von „kein Agent verfasst religiöse Inhalte“ und verwässert das Werkzeug.

Gelesene Repo-Dateien: C:\Users\USER\Wiederholung\plan\grossplan\FUNKTIONEN.md, plan\STAND.md, plan\texte-lernen\KONZEPT.md, plan\zyklus-2\befunde\LERN.md, plan\zyklus-2\ENTSCHEIDUNGEN.md, CHANGELOG.md, README.md, KONZEPT.md. Nichts geändert.
