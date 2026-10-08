# Mehrwert: Wettbewerb und Lücke

Wörtlich aus dem Chat a495c23a, Agent 7, gestartet 2026-10-07 16:06 (Quelle: `agent-a368c7b60dd3668a1.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

Du arbeitest an einer Ideen- und Prüfrunde für die Karteikarten-App "Adrabic" (Arabisch lernen mit Karteikarten und Texte auswendig lernen; PWA ohne eigenen Server; deutschsprachig; ein einzelner Betreiber). Repo: C:\Users\USER\Desktop\Wiederholung (NICHT C:\Users\USER\Wiederholung). NUR LESEN: keine Datei ändern, keine Tests, keinen Browser, keinen Server starten, kein git commit. Websuche/WebFetch ausdrücklich erwünscht.

Pflichtlektüre zuerst (kurz): plan/STAND.md, plan/LEHREN.md §1 und §2, KONZEPT.md Abschnitt 0 und 7, README.md, plan/landing-page-strategie/ (Überblick), plan/ideen/ (Überblick). Feste Grenzen: religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf, keine Sekten/Organisationen/Bewegungen nennen oder empfehlen; keine religiösen Inhalte verfassen; kein eigener Server.

Auftrag des Betreibers: "echten unbestreitbaren Mehrwert bieten ... das soll ein riesen Ding sein".

DEIN BLICKWINKEL: Markt und Lücke. Recherchiere aktuell (Web): Anki/AnkiMobile, Quizlet, Memrise, Duolingo Arabisch, Mochi, RemNote, Brainscape; für Arabisch/Quran: Tarteel, Quran-Lern-Apps, Arabisch-Kurs-Apps, Apps zu den Medina-Büchern, "Marhaba!" (https://apps.apple.com/app/id6762067156), Bayyinah o. ä. nur als Produktmuster (keine Empfehlung von Personen/Organisationen). Für jede relevante: Was können sie, was kostet es, worüber klagen Nutzer (Rezensionen, Reddit) – besonders deutschsprachige Arabisch-Lernende und Leute, die mit einem Lehrbuch/Lehrer lernen. Dann: Wo ist eine echte Lücke, die Adrabic mit seinen Mitteln füllen kann (eigene Karten zum eigenen Unterricht, RTL und Harakat sauber, Handschrift, Texte Zeile für Zeile, deutsch, kostenlos/ohne Werbung, offline)? Was ist nur "auch dabei" und kein Grund zu wechseln?

LIEFERE auf Deutsch, einfache Sprache, höchstens 800 Wörter: (a) Tabelle der 6–8 wichtigsten Alternativen mit Stärke/Schwäche in je einer Zeile und Quelle; (b) die 3 klarsten Lücken; (c) höchstens 7 Vorschläge, nach Nutzen geordnet, je mit Beleg (Link), Gegenargument, Aufwand, Risiko; (d) ein Satz "Wofür Adrabic das beste Werkzeug sein kann – und wofür nicht". Nichts erfinden; Ungeprüftes und Schätzungen kennzeichnen.

## Bericht des Agenten

# Markt und Lücke – Befund (nur gelesen, nichts geändert)

Grundlage: STAND.md, LEHREN §1–2, KONZEPT §0/§7, README, `plan/ideen/*`, `plan/grossplan/FUNKTIONEN.md`; Websuche 07.10.2026. Preise stammen meist aus Zweitquellen, nicht aus den Stores selbst: **ungeprüft**. Reddit-Stimmen konnte ich nicht direkt lesen, nur Zusammenfassungen und Foren.

## (a) Alternativen

| App | Stärke | Schwäche | Quelle |
|---|---|---|---|
| Anki / AnkiMobile | Eigene Karten, kostenlos (PC, Android), sehr mächtig | Einrichtung schwer; Arabisch-Schrift und RTL muss man selbst per CSS richten; iOS ca. 25 $ / 29,99 € einmalig; fertige Stapel passen nicht zum eigenen Unterricht | [Kalimah](https://kalimah-center.com/?p=88605), [Anki-Forum RTL](https://forums.ankiweb.net/t/anki-is-not-respecting-rtl-right-to-left-text/15318), [Schriftfehler](https://forums.ankiweb.net/t/anki-arabic-custom-fonts-rendering-incorrectly/27643), [Preis](https://mandarinmosaic.com/blog/is-anki-free) |
| Quizlet | Schnell Karten anlegen, teilen | Lernmodus gratis nur 5 Runden; Abo 35,99–44,99 $/Jahr; Trustpilot 1,4/5 | [myengineeringbuddy](https://www.myengineeringbuddy.com/blog/quizlet-reviews-alternatives-pricing-offerings/) |
| Memrise | Fertige Kurse mit Ton | Nutzer-Kurse 2024 ausgelagert, viel Ärger; Vertrauen in eigene Inhalte beschädigt | [Wikipedia](https://en.wikipedia.org/wiki/Memrise), [Kimola](https://kimola.com/reports/uncover-the-impact-memrise-apps-user-feedback-report-app-store-us-147885) |
| Duolingo Arabisch | Einstieg, Gewohnheit | Kaum Grammatik, wenig Tiefe, eigener Stoff unmöglich | [Clozemaster-Blog](https://www.clozemaster.com/blog/?p=7865) |
| Tarteel | Hört Rezitation mit, zeigt Fehler | Nur Quran; Kernfunktion im Abo (12,99 $/Monat, 99 $/Jahr); Klagen über Preis, Einfrieren, Fehlerkennung | [Tarteel-Hilfe](https://support.tarteel.ai/en/articles/12414387-what-s-tarteel-premium), [Kimola](https://kimola.com/reports/unlock-insights-tarteel-quran-memorization-app-feedback-report-google-play-en-gb-156338) |
| **Arabily** (neu, 19.07.2026) | **Deutsch und Englisch, Vokabeln der Medina-Bücher Lektion für Lektion, eigene Sammlungen, Listen-Import, Tashkeel-Tippübung** | Nur iPhone (laut Eintrag), Statistik im Pro-Abo, keine Handschrift erwähnt, sehr jung (14 Bewertungen) | [mwm.ai](https://mwm.ai/apps/arabily/6774214049) (Drittseite, ungeprüft) |
| Marhaba! | Fertiger Kurs für Quran-Lernende | Nur Englisch, 14,99 $/Monat oder 99 $/Jahr, noch keine Bewertungen | [App Store](https://apps.apple.com/app/id6762067156) |
| Mochi / RemNote / Brainscape | Saubere Karten-Werkzeuge | Sync bzw. Kernfunktionen im Abo (5–8 $/Monat), nichts für Arabisch | [haznos](https://haznos.org/best-flashcard-apps-2026/) |

Wichtigster Fund: **Arabily** greift genau die deutsche Medina-Zielgruppe an und hat den Stoff schon drin. Das war bisher nicht im Plan.

## (b) Die 3 klarsten Lücken

1. **Eigener Stoff aus dem eigenen Unterricht, ohne Basteln.** Anki kann es, ist aber schwer; fertige Stapel „passen nicht zu Level oder Lektion“ (Kalimah). Alle Kurs-Apps können es gar nicht.
2. **Arabisch mit der Hand schreiben, auf der Karte.** Skritter macht das nur für Chinesisch/Japanisch ([Mezzoguild](https://www.mezzoguild.com/skritter-review/)). Arabily tippt. Anki hat nur ein einfaches Kritzelfeld (mein Wissen, ungeprüft).
3. **Eigene Texte Zeile für Zeile auswendig lernen.** Alle gefundenen Apps können nur den Quran, meist im Abo. Eine App für eigene Texte habe ich nicht gefunden (kein Beweis, dass es keine gibt).

Nur „auch dabei“, kein Wechselgrund: offline, Sync, Hell/Dunkel, Serie, Statistik, Wiederholung nach Abständen an sich.

## (c) Vorschläge, nach Nutzen

1. **Liste einfügen (F-1).** Beleg: Arabily und Anki haben Import; Karten einzeln tippen frisst Zeit (Kalimah). Dagegen: Ist Aufholen, kein Alleinstellungsmerkmal. Aufwand 1–2 Sitzungen. Risiko gering.
2. **Lehrer teilt Lektion nach jeder Stunde per Code/Link, als Hauptweg herausstellen** (vorhandenes Teilen, `ideen/lehrer-modus` A0). Beleg: Lücke 1; kein Wettbewerber verbindet Lehrer und Schüler so einfach. Dagegen: braucht echte Lehrpersonen, die es nutzen. Aufwand mittel. Risiko: Daten Minderjähriger, sobald Fortschritt sichtbar würde – also ohne Fortschritts-Einsicht.
3. **Texte lernen für eigene Texte freigeben** (nach Auswertung 29.10., nur auf „ja“). Beleg: Lücke 3, Tarteel-Preis. Dagegen: Tarteel hört zu, Adrabic nicht; Probelauf noch offen. Aufwand klein (ist gebaut). Risiko: Recht, religiöser Rahmen bei Quran-Text.
4. **Zweite Richtung Deutsch → Arabisch mit Handschrift (F-5).** Beleg: Lücke 2. Dagegen: greift in die Lernlogik ein, 3–4 Sitzungen. Risiko mittel.
5. **Ohne Harakat abfragen (F-2).** Beleg: Lesen ohne Zeichen ist das Ziel von Lehrbuch-Lernenden; kein Wettbewerber wirbt damit (ungeprüft). Dagegen: kleine Zielgruppe am Anfang. Aufwand 1 Sitzung. Risiko: Quran-Wörter ohne Zeichen entscheidet der Betreiber.
6. **Startseite zeigt die drei Lücken als Bild** (Handschrift, eigene Lektion, Text Zeile für Zeile), dazu „kein Abo nötig zum Lernen“ ohne Dauerversprechen. Beleg: Quizlet-/Tarteel-Ärger über Bezahlschranken. Dagegen: bringt nichts, solange das Werkzeug nach der Anmeldung leer ist (erst 1 und 2). Aufwand klein.
7. **Nicht bauen:** eigener Kurs, fertiger Medina-Wortschatz, Ton, KI-Zuhören. Dort sind Arabily, Marhaba und Tarteel schon; Urheberrecht am Buchstoff ist ungeklärt, und Inhalte verfasst kein Agent.

Eigenes Urteil: „Riesen Ding“ wird Adrabic nicht über Funktionen, die andere schon haben, sondern über 2 + 3 + Handschrift zusammen. 1 ist die Eintrittskarte.

## (d) Ein Satz

Adrabic kann das beste Werkzeug sein für Menschen, die Arabisch mit Lehrer oder Buch lernen und ihren eigenen Stoff und eigene Texte auf Deutsch, handschriftlich und ohne Abo festigen wollen – nicht für Leute, die einen fertigen Kurs, Aussprache-Kontrolle oder Lernen ohne eigenes Material suchen.

Dateien: `C:\Users\USER\Desktop\Wiederholung\plan\grossplan\FUNKTIONEN.md`, `C:\Users\USER\Desktop\Wiederholung\plan\ideen\lehrer-modus\GERUEST.md`, `C:\Users\USER\Desktop\Wiederholung\plan\ideen\landing-page-strategie\STRATEGIE.md`.
