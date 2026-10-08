# Wettbewerbsanalyse Lern-Apps

Wörtlich aus dem Chat 981b69a1, Agent 4, gestartet 2026-10-07 15:39 (Quelle: `agent-acf2772e27d656d8f.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 12 parallelen Ideen-Agenten für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server; Hosting Firebase). Der Betreiber ist ein Einzelner, bisher Nutzer: er und wenige Freunde; Ziel ist eine öffentliche, ernsthafte Lern-Website. Zielgruppe: deutschsprachige Muslime, die Arabisch (Quran-/klassisches Arabisch) lernen. Neu im Probelauf: "Texte auswendig lernen" (u. a. Quran, Tanzil-Daten unter quran/).
Frage des Betreibers: Wie kann das Tool ECHTEN, UNBESTREITBAREN Mehrwert bieten – Features, Ausbau, Verbesserungen, Neues. Er will ein großes, gründliches Ergebnis.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Also: keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden (log, show, diff, grep), keine Tests, keine Server, keine Skripte aus plan/werkzeuge starten, nichts installieren. app.js nie komplett lesen, sondern mit Grep gezielt suchen und Ausschnitte lesen.
Nützliche Dateien: KONZEPT.md, README.md, CHANGELOG.md, plan/STAND.md, plan/grossplan/FUNKTIONEN.md (bereits bewertete Funktionen: Korb 1/2/3 – nichts davon einfach wiederholen, sondern darauf aufbauen oder begründet widersprechen), plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/monetarisierung/GERUEST.md, plan/landing-page-strategie/STRATEGIE.md, plan/beobachtungen-lernwerkzeug.md, plan/zyklus-2/AUFGABEN.md.
Rahmenbedingungen des Projekts: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte selbst (Wortlaut kommt vom Betreiber oder aus geprüften Quellen); keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben der Nutzer. Keine Dark Patterns. Datenschutz (DSGVO) ernst. Kein eigener Server (Cloud Functions wären eine bewusste Entscheidung – als Abhängigkeit kennzeichnen).
AUSGABEFORMAT (Deutsch, max. ca. 900 Wörter, kein Vorgeplänkel): 8–14 konkrete Ideen. Je Idee: Titel; was genau (2–3 Sätze); für wen und welcher belegbare Nutzen; Aufwand S/M/L; Abhängigkeiten (Server? Inhalte vom Betreiber? Lizenz? iOS-Grenzen?); Risiko/Gegenargument; Beleg (Datei:Zeile im Repo bzw. URL). Am Ende: deine Top 3 mit einem Satz Begründung und 1–2 Dinge, die man ausdrücklich NICHT bauen sollte. Ehrlich gewichten, nicht verkaufen. Nichts erfinden: Was du nicht geprüft hast, als Vermutung kennzeichnen.

DEIN BLICKWINKEL: Wettbewerb. Verschaffe dir kurz einen Überblick, was Adrabic heute kann (README.md, CHANGELOG.md oben, plan/grossplan/FUNKTIONEN.md). Recherchiere dann im Web gründlich die Alternativen, die die Zielgruppe tatsächlich nutzt: Anki/AnkiWeb/AnkiMobile, Quizlet, Memrise, Mochi, RemNote, Brainscape, Duolingo Arabisch, Busuu, Drops, "Quranic" (App), Bayyinah TV, Madinah-Arabic-Apps/-Seiten, Arabic Unlocked, Quran.com (Wort-für-Wort, Lernpläne), Tarteel, Quran Companion, Qutor, deutsche Angebote (z. B. Arabisch-Kurse/Institute für Muslime, deren Vokabeltools). Für jede relevante: Was können sie, was kostet es, was wird in Rezensionen/Reddit/Foren am häufigsten bemängelt (Werbung, Paywall, Komplexität, keine deutsche Oberfläche, schlechte arabische Typografie, kein Quran-Bezug, Datenschutz, Offline)? Leite daraus ab: Wo ist eine LÜCKE, die Adrabic realistisch als Einzelprojekt schließen kann und die für die Zielgruppe unbestreitbar zählt – und wo wäre Nachbauen sinnlos, weil andere es kostenlos besser machen? Liefere zusätzlich eine kompakte Vergleichstabelle (max. 8 Zeilen) vor den Ideen; dafür darfst du bis ca. 1100 Wörter nutzen.

## Bericht des Agenten

## Wettbewerb: Vergleich und abgeleitete Ideen für Adrabic (Stand 07.10.2026)

Alle Preise und Mängel unten stammen aus Web-Suchergebnissen (Sekundärquellen wie Preis-/Review-Aggregatoren), nicht aus eigenen Tests der Apps. Qutor, Quran Companion, Drops, Busuu und Arabic Unlocked habe ich nicht belegt gefunden bzw. nicht geprüft; sie fehlen deshalb.

### Vergleichstabelle

| Angebot | Kann | Preis | Häufigste Kritik | Folgerung für Adrabic |
|---|---|---|---|---|
| Anki / AnkiMobile | Freies SRS, riesige Deck-Bibliothek, auch Quran-Vokabeln | Desktop/Android gratis, iOS einmalig 29,99 EUR | Sehr steile Lernkurve; RTL-/Arabisch-Darstellung braucht eigenes CSS; Quran-Decks fast nur Englisch | Nicht bei Flexibilität konkurrieren, sondern bei "funktioniert sofort, Arabisch richtig gesetzt, Deutsch" |
| Quizlet | Sets, Lernmodus, Tests | Plus 35,99 $/Jahr | Lernmodus gratis auf 5 Runden gedeckelt, Werbung, kein Offline gratis, Kündigungsärger | "Lernkern nie hinter Schranke" ist ein echter, sagbarer Unterschied |
| Memrise | Kurse, Audio | Abo | Community-Kurse 2024 aus der App entfernt, kehren 2026 nur als Wortlisten zurück | Nutzer haben Inhalte verloren: Export und Datenhoheit sind ein Argument |
| Duolingo Arabisch | Spielerisches MSA | Gratis mit Werbung / Abo | Kurz, flach, kein Quran-Bezug, wenig Grammatik | Nicht nachbauen; anderer Zweck |
| Quranic (BusyPeople) | Fertiger Kurs Quran-Arabisch, SRS, offline, laut Store auch Deutsch | 4,99–9,99 $/Monat, 54 $/Jahr | Abo; fester Lehrplan, keine eigenen Karten (Vermutung, nicht geprüft) | Fertigen Kurs nicht nachbauen; Adrabic ist Begleiter zum eigenen Unterricht/Buch |
| Arabily (neu, 07/2026) | Vokabeln Madinah-Bücher 1–3 und Bayna Yadayk, SRS, Tashkeel-Schreiben, Deutsch | Gratis + Pro-Abo (volles SRS, Statistik nur Pro) | Kaum Nutzer (<1000 Downloads, 14 Bewertungen), nur App Store (Android ungeprüft) | Direktester Konkurrent, löst genau das "leere Werkzeug" mit fertigen Buch-Sätzen |
| Tarteel | Hifz mit Spracherkennung, Fehlererkennung, Ziele | Premium 12,99 $/Monat bzw. 99 $/Jahr | Kernfunktionen (Fehlererkennung mit Verlauf, Verbergen, Planung) kostenpflichtig; Abstürze | Spracherkennung nicht nachbauen; Wiederholplan ohne Mikrofon und ohne Abo ist die Lücke |
| Quran.com | Lesen, Wort-für-Wort, Lernpläne, API | Gratis, werbefrei, gemeinnützig | Kein SRS, kein Vokabeltraining, kein Hifz-Plan | Leser/Übersetzung nicht nachbauen; dorthin verlinken |

### Ideen

1. **Fertige Buch-Kartensätze beim Start (Regal).** Nach der Anmeldung ein vom Betreiber freigegebener Satz zur Auswahl statt leerem Werkzeug. Nutzen: Arabily zeigt, dass genau das der Einstieg ist; die eigene Strategie nennt das leere Werkzeug den größten Bruch. Aufwand S–M (Code-Einlösen existiert). Abhängigkeit: Inhalte und Urheberrecht beim Betreiber (Medina-Vokabellisten). Risiko: Rechte an Buch-Wortlisten ungeklärt. Beleg: plan/landing-page-strategie/STRATEGIE.md:113–127; FUNKTIONEN.md:22 (F-3); app.js:4314.

2. **Liste einfügen / Import aus Anki und Quizlet (F-1), zusätzlich als "Umzug" bewerben.** Tab-/Semikolon-Text mit Vorschau. Nutzen: Quizlet-Deckelung und Memrise-Kursverlust erzeugen Wechselwillige. Aufwand S–M. Keine Abhängigkeit. Risiko: unsaubere Fremdformate, Supportfälle. Beleg: plan/grossplan/befunde/DATEN.md:168–177.

3. **Hifz-Wiederholplan ohne Mikrofon freigeben (Texte lernen).** Neu/frisch/fest mit Kreis ist gebaut, nur im Betreiber-Konto. Nutzen: Tarteel legt Planung und Verbergen hinter 99 $/Jahr; kostenlos, offline, ohne Stimmaufnahme ist klar abgrenzbar. Aufwand S (Freigabe) nach Probelauf-Auswertung 29.10. Abhängigkeit: Betreiber-"ja", Rechtsprüfung Art. 9. Risiko: ohne Fehlererkennung bleibt es Selbstbewertung. Beleg: plan/STAND.md:49–62; app.js:83.

4. **Vokabeln einer Sure vor dem Auswendiglernen.** Aus einer gewählten Sure eine Wortliste erzeugen, Bedeutungen trägt der Nutzer selbst ein oder sie kommen aus einem geprüften Satz. Nutzen: verbindet die zwei Hälften der App; kein Wettbewerber in der Tabelle verbindet eigenes SRS mit Hifz. Aufwand M. Abhängigkeit: deutsche Wort-für-Wort-Daten brauchen Lizenz und Freigabe des Betreibers (Quranic Arabic Corpus ist GPL; deutsche WBW-Quelle nicht geprüft). Risiko: religiöser Wortlaut, daher nur mit geprüfter Quelle. Beleg: app.js:11648; https://en.wikipedia.org/wiki/Quranic_Arabic_Corpus.

5. **Ohne Harakat abfragen (F-2).** Nutzen: klassisches Lesen ohne Vokalzeichen; in den Suchergebnissen bietet es kein Konkurrent als Schalter (nicht vollständig geprüft). Aufwand S. Risiko: bei Quran-Text Entscheidung des Betreibers. Beleg: FUNKTIONEN.md:21.

6. **Zweite Richtung Deutsch → Arabisch mit Handschrift (F-5).** Nutzen: Arabily verkauft Tashkeel-Schreiben als Pro; Adrabic hat das Handschriftfeld schon. Aufwand L (Lernlogik). Beleg: app.js:11363–11373; FUNKTIONEN.md:23.

7. **Lehrer teilt Lektion, einfacher Kernablauf.** Code am Ende der Unterrichtsstunde, ohne Klassenraum. Nutzen: deutsche Madinah-Kurse laufen in Gruppen (ca. 25 EUR/Sitzung laut Anbieterseite); Lehrkräfte bringen ganze Gruppen. Aufwand S–M (Teilen existiert). Risiko: Minderjährigen-Daten, sobald Fortschritt sichtbar wird; also ohne. Beleg: plan/lehrer-modus/GERUEST.md:17–36; https://kalimah-center.com/madinah-arabic-course-in-germany/.

8. **Offener Export als Zusage.** Karten jederzeit als Text/TSV herausgeben, auf der Startseite genannt. Nutzen: direkte Antwort auf Memrise- und Quizlet-Ärger. Aufwand S. Risiko: erleichtert Abwanderung; ich halte das für vertretbar. Beleg: https://memrise.com/blog/changes-to-the-memrise-app.

9. **Ehrliche Vergleichsseite "Adrabic oder Anki?"** Sagt offen, wann Anki besser ist (viele Medien, Add-ons). Nutzen: Such-Einstieg, Vertrauen. Aufwand S. Abhängigkeit: Text vom Betreiber. Risiko: Preisangaben veralten. Beleg: STRATEGIE.md:385.

10. **Arabische Typografie als geprüftes Versprechen.** Quran-Schrift, Amiri-Fallback, RTL ohne Zutun sind vorhanden; fehlende Zeichen systematisch testen und benennen. Nutzen: Anki-Foren sind voll mit RTL-Problemen. Aufwand S. Beleg: CHANGELOG.md:38–48; https://forums.ankiweb.net/t/anki-is-not-respecting-rtl-right-to-left-text/15318.

11. **Unterstützen-Link statt Abo (F-7).** Nutzen: jeder Wettbewerber außer Anki und Quran.com hat ein Abo; "kein Abo" ist für diese Zielgruppe ein Vertrauensargument. Aufwand S. Abhängigkeit: Steuer/Minderjährigkeit. Beleg: FUNKTIONEN.md:29–36.

### Top 3
1. **Idee 1 (Regal)**: ohne Inhalt beim Start gewinnt Arabily jeden Vergleich, egal wie gut das Werkzeug ist.
2. **Idee 3 (Hifz-Plan freigeben)**: fertig gebaut, und der einzige starke Konkurrent verlangt dafür ein teures Abo.
3. **Idee 2 (Import)**: kleinster Aufwand, holt Wechsler von Quizlet/Memrise/Anki ab.

### Nicht bauen
- **Spracherkennung beim Aufsagen**: Tarteel macht das mit eigenem Modell; braucht Server und Stimmdaten, steht zu Recht in plan/texte-lernen/KONZEPT.md:488.
- **Quran-Leser mit Übersetzung, Tafsir, Audio**: Quran.com ist gratis, werbefrei und besser; verlinken statt nachbauen. Ebenso kein Duolingo-artiger Fertigkurs.

### Unsicherheiten
- Ob Quranic wirklich eine vollständige deutsche Oberfläche hat und ob Quran.com Deutsch als Wort-für-Wort-Sprache führt, ist nur aus Store-/Suchtexten abgeleitet.
- Zeilenangaben aus STRATEGIE.md zu app.js (234–269, 3509–3516) sind alt und nicht nachgeprüft; die oben genannten app.js-Zeilen habe ich per Grep bestätigt.

Quellen: https://mwm.ai/apps/arabily/6774214049 · https://support.tarteel.ai/en/articles/12414387-what-s-tarteel-premium · https://apppricinglab.com/app/apple/1391009396 · https://nibble-app.com/blog/quizlet-cost · https://www.myengineeringbuddy.com/blog/quizlet-reviews-alternatives-pricing-offerings/ · https://mandarinmosaic.com/blog/is-anki-free · https://forums.ankiweb.net/t/learning-curve-for-anki/7574 · https://apps.apple.com/app/id1381145375 · https://quran.com/learning-plans · https://api-docs.quran.foundation/legal/developer-terms/ · https://kalimah-center.com/is-duolingo-good-to-learn-arabic/
