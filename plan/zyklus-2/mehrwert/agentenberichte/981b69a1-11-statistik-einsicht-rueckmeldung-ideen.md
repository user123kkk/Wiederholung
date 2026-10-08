# Statistik Einsicht Rückmeldung Ideen

Wörtlich aus dem Chat 981b69a1, Agent 11, gestartet 2026-10-07 15:39 (Quelle: `agent-aea77a3ff34571629.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 12 parallelen Ideen-Agenten für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server; Hosting Firebase). Der Betreiber ist ein Einzelner, bisher Nutzer: er und wenige Freunde; Ziel ist eine öffentliche, ernsthafte Lern-Website. Zielgruppe: deutschsprachige Muslime, die Arabisch (Quran-/klassisches Arabisch) lernen. Neu im Probelauf: "Texte auswendig lernen" (u. a. Quran, Tanzil-Daten unter quran/).
Frage des Betreibers: Wie kann das Tool ECHTEN, UNBESTREITBAREN Mehrwert bieten – Features, Ausbau, Verbesserungen, Neues. Er will ein großes, gründliches Ergebnis.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Also: keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden (log, show, diff, grep), keine Tests, keine Server, keine Skripte aus plan/werkzeuge starten, nichts installieren. app.js nie komplett lesen, sondern mit Grep gezielt suchen und Ausschnitte lesen.
Nützliche Dateien: KONZEPT.md, README.md, CHANGELOG.md, plan/STAND.md, plan/grossplan/FUNKTIONEN.md (bereits bewertete Funktionen: Korb 1/2/3 – nichts davon einfach wiederholen, sondern darauf aufbauen oder begründet widersprechen), plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/monetarisierung/GERUEST.md, plan/landing-page-strategie/STRATEGIE.md, plan/beobachtungen-lernwerkzeug.md, plan/zyklus-2/AUFGABEN.md.
Rahmenbedingungen des Projekts: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte selbst (Wortlaut kommt vom Betreiber oder aus geprüften Quellen); keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben der Nutzer. Keine Dark Patterns. Datenschutz (DSGVO) ernst. Kein eigener Server (Cloud Functions wären eine bewusste Entscheidung – als Abhängigkeit kennzeichnen).
AUSGABEFORMAT (Deutsch, max. ca. 900 Wörter, kein Vorgeplänkel): 8–14 konkrete Ideen. Je Idee: Titel; was genau (2–3 Sätze); für wen und welcher belegbare Nutzen; Aufwand S/M/L; Abhängigkeiten (Server? Inhalte vom Betreiber? Lizenz? iOS-Grenzen?); Risiko/Gegenargument; Beleg (Datei:Zeile im Repo bzw. URL). Am Ende: deine Top 3 mit einem Satz Begründung und 1–2 Dinge, die man ausdrücklich NICHT bauen sollte. Ehrlich gewichten, nicht verkaufen. Nichts erfinden: Was du nicht geprüft hast, als Vermutung kennzeichnen.

DEIN BLICKWINKEL: Fortschritt sichtbar und nutzbar machen. Finde heraus, welche Daten die App pro Karte und pro Tag heute speichert (firestore.rules: erlaubte Felder; Grep in app.js nach "statistik", "fortschritt", "verlauf", "heatmap", "tage", "richtig", "falsch", "letzte", "historie") und was davon dem Nutzer gezeigt wird. Was ließe sich aus den VORHANDENEN Daten ohne neue Speicherung ableiten, und wofür bräuchte es zusätzliche Felder (dann Datenschutz/Speicherumfang/Firestore-Kosten nennen)? Ideen-Feld: ehrliche Kennzahl "sicher gekonnte Wörter" statt bloßer Kartenzahl; Abdeckung "du verstehst jetzt X % der Wörter in Sure Y / im Quran" (rechnerisch aus Tanzil-Text + eigener Kartenliste – Machbarkeit des Wortabgleichs ohne Morphologie-Daten ehrlich bewerten, Alternativen nennen); Vergessenskurve und Prognose der täglichen Last; Problemkarten ("Leeches") mit konkretem Handlungsvorschlag; Verwechslungspaare; Lernzeit und Karten pro Minute; Meilensteine, die echtes Können abbilden; Rückblick "vor 6 Monaten vs. heute"; Export der eigenen Lerndaten (DSGVO Art. 20 und Vertrauen); Zeugnis/Nachweis für Lehrer. Recherchiere, welche Statistik-Ansichten in Anki/Duolingo/anderen nachweislich motivieren und welche nur Zahlenfriedhof sind. Unterscheide klar: Einsicht, die das Verhalten des Lernenden verbessert, vs. Dekoration.

## Bericht des Agenten

## Befund: Was heute gespeichert und gezeigt wird (geprüft)

- **Je Karte** (`firestore.rules:229-232`): `stufe`, `maxStufe`, `nextReview`, `ersteBewertung`, `rueckfaelle`, plus Inhalt. Kein Datum der letzten Antwort, kein Antwortverlauf, keine Antwortzeit.
- **Je Tag** (`app.js:905-918`, `946-949`): nur die Zähler `w`/`n`/`u`/`t` (Wiederholt, Neu, Geübt, Textzeilen), 120 Tage (`VERLAUF_TAGE`). Die Regel erlaubt bis 400 Einträge (`firestore.rules:140`). Richtig/Falsch wird je Tag **nicht** gespeichert.
- **Sicher/Fast/Nicht** je Runde existiert nur im Arbeitsspeicher (`app.js:6054-6058`) und wird am Rundenende gezeigt (`app.js:11331-11333`), danach verworfen.
- **Je Bereich**: `festErgebnisse` (letzte ≤50 Antworten als 1/0) und `abstandFaktor`, nur im Probelauf (`firestore.rules:203-209`, `app.js:6135`).
- **Gezeigt**: Antworten in 7 Tagen mit Trend-Pille, Kalender, „saßen schon einmal“, Stufenband, Lektionen, Leeches, 7-Tage-Vorschau (`app.js:10662-10971`).
- Die eigene Prüfung nennt den Tab „zählt Fleiß, nicht Können“ und empfiehlt Weg b „Was du schon kannst“ (`plan/zyklus-2/befunde/FORT.md:28-81`, `254-292`; Aufgabe C28). Meine Ideen bauen darauf auf.
- **Rahmen**: Abstände und Stufenzahlen werden Nutzern nicht gezeigt (`FORT.md:69-71`). „Mehr Statistik gegen Geld“ ist Korb 3 (`plan/grossplan/FUNKTIONEN.md:63`). Nutzungsstatistik wurde in 3.17.23 entfernt (`plan/LEHREN.md:1376`).

## Ideen

**1. Ehrliche Hauptzahl „sicher gekonnt“**
- Was: Die Hauptzahl zählt Karten mit `stufe ≥ 7` (Abstand ≥ 34 Tage; die Schwelle lehnt sich laut Code-Kommentar an Ankis „mature ≥ 21 Tage“ an), daneben „auf dem Weg“. Sie ersetzt „saßen schon einmal“ (`LEKTION_STUFE = 1`, also einmal gewusst).
- Nutzen: Alle Lernenden sehen eine Zahl, die Können misst. Sie darf sinken, und das ist ehrlich.
- Aufwand: S. Abhängigkeiten: keine, kein neues Feld.
- Risiko: Am Anfang wochenlang 0, deshalb nie als nackte Null zeigen (`FORT.md:261-264`).
- Beleg: `app.js:3908-3915`, `10722`.

**2. Trefferquote bei reifen Karten (zwei neue Tageszähler)**
- Was: Die einzige Kennzahl, die sagt, ob das System für mich funktioniert. Ankis „True Retention“ zählt dafür nur die erste Antwort je Karte und Tag und rät zu Monatswerten. Braucht `r`/`f` je Tag, nur für Karten ab Stufe 7 bei der ersten Antwort.
- Nutzen: Fortgeschrittene bekommen einen konkreten Rat („unter 80 %: weniger Neue“).
- Aufwand: M. Abhängigkeiten: zwei Ganzzahlen je Tag im vorhandenen `verlauf`-Map, keine Regeländerung nötig (Map wird nur auf Größe geprüft), keine zusätzlichen Schreibvorgänge, weil gebündelt. Ein Satz in der Datenschutzerklärung.
- Risiko: Bei wenigen Karten rauscht die Zahl, erst ab etwa 50 Antworten zeigen.
- Beleg: `app.js:1028-1036`; https://docs.ankiweb.net/stats.html.

**3. Verständnis-Abdeckung „Sure X: Y % der Wörter“**
- Was: Der Abgleich Kartenliste gegen Tanzil-Text.
- Machbarkeit: Mit exakten Wortformen nach Normalisierung (`suchNorm` gibt es, `app.js:11472`) trifft er nur gleiche Formen. Präfixe und Suffixe (و، ب، ل، ال، Pronomen) verfehlt er, die Zahl wäre systematisch zu niedrig und damit irreführend. Der Quran hat rund 77.430 Wörter bei rund 14.870 Wortformen (Sekundärquelle, nicht nachgerechnet).
- Belastbar wird es nur mit Lemma-Daten. Das Quranic Arabic Corpus liefert Lemma und Wurzel je Wort unter GNU GPL mit Quellenpflicht.
- Alternative ohne Morphologie: ein vom Betreiber geprüfter Häufigkeits-Kartensatz, bei dem jede Karte ihre Vorkommenszahl trägt. Dann ist „deine sicheren Karten decken N Wortvorkommen“ exakt.
- Nutzen: Das stärkste Argument für die Zielgruppe überhaupt.
- Aufwand: L. Abhängigkeiten: GPL-Prüfung, statische Datei von mehreren MB (lazy laden), Übersetzungen als Inhalt vom Betreiber.
- Risiko: „Verstehen“ ist mehr als Vokabeln, daher als „Wörter erkannt“ benennen. Tanzil verbietet Textänderung: nur intern normalisieren, verbatim anzeigen (`quran/tanzil-uthmani.txt`, Lizenzfuß).
- Beleg: https://corpus.quran.com/faq.jsp.

**4. Leeches mit Diagnose statt Liste**
- Was: Heute steht dort ein Stift und „umformulieren oder teilen“. Besser ist ein Vorschlag je Karte: lange Übersetzung führt zu „teilen“, eine ähnliche Karte im Bestand zu „nebeneinander ansehen“, sonst „Notiz/Merkhilfe ergänzen“.
- Nutzen: Das einzige Fortschrittselement mit Handlung (`FORT.md:40`), es spart nachweislich Lernzeit.
- Aufwand: M. Abhängigkeiten: keine.
- Risiko: Die Heuristik kann danebenliegen, deshalb als Vorschlag formulieren.
- Beleg: `app.js:10916-10942`, `LEECH_SCHWELLE = 5` (`app.js:235`).

**5. Verwechslungspaare**
- Was: Aus dem Bestand ableitbar: Karten mit gleichem Konsonantengerüst (gleich ohne Harakat) oder kleinem Editierabstand, von denen mindestens eine Rückfälle hat. Dazu „Paar gezielt üben“.
- Nutzen: Im Arabischen (Harakat, ähnliche Wurzeln) eine echte Fehlerquelle.
- Aufwand: M. Abhängigkeiten: keine.
- Risiko: Echte Verwechslung („mit welcher Karte“) wird nicht gespeichert. Es bleibt eine Ähnlichkeitsvermutung und muss so heißen.

**6. Lastprognose über 30 Tage mit Stellschraube**
- Was: Die Vorschau reicht 7 Tage und warnt erst ab 60. Aus `nextReview` und `stufe` lässt sich 30 Tage simulieren, samt „bei 10 neuen pro Tag sind es in 3 Wochen etwa N täglich“.
- Nutzen: Verhindert den Abbruch durch Überlast und ändert Verhalten direkt.
- Aufwand: M. Abhängigkeiten: keine.
- Risiko: Ohne persönliche Trefferquote (Idee 2) ist die Simulation grob.
- Beleg: `app.js:4088`, `10964`.

**7. Monatsstand für „damals und heute“**
- Was: Ein Halbjahresrückblick ist heute unmöglich, weil nur 120 Tage Zähler und kein Stufenstand von früher vorliegen. Lösung: einmal im Monat sechs Zahlen (Karten je Zustand) ablegen.
- Nutzen: Zeigt Fortschritt über Monate, was der Tab heute nicht kann (`FORT.md:55-58`).
- Aufwand: M. Abhängigkeiten: neues Feld mit Regeländerung, 12 kleine Einträge pro Jahr, ein Schreibvorgang im Monat.
- Risiko: Der Nutzen kommt erst nach Monaten, also früh anfangen.

**8. Vollständiger, lesbarer Datenexport**
- Was: Das JSON-Backup enthält die Bereiche, aber nicht `verlauf`, `streak`, Einstellungen. Die Datenschutzerklärung verweist für Art. 20 auf den Export. Ergänzen und zusätzlich CSV (Wort; Übersetzung; Zustand; Rückfälle).
- Nutzen: Vertrauen, und die Art.-20-Zusage wird vollständig. Ob die heutige Lücke rechtlich relevant ist, habe ich nicht geprüft.
- Aufwand: S. Abhängigkeiten: keine.
- Beleg: `app.js:4191-4196`, `datenschutzerklaerung.html:314`.

**9. Lernstand als Seite zum Vorzeigen**
- Was: Eine lokal erzeugte Druck- oder Bildseite: Lektionen fertig, sichere Wörter, Lerntage, Datum.
- Nutzen: Deckt den Nachweis für Lehrende ohne Datenfluss über Konten. Die Lehrer-Einsicht ist bewusst nicht gebaut (`plan/lehrer-modus/GERUEST.md:19`, `33`).
- Aufwand: S bis M. Abhängigkeiten: keine.
- Risiko: Nicht fälschungssicher, also „Selbstauskunft“ nennen und nicht „Zeugnis“.

**10. Meilensteine an Können binden**
- Was: `MEILENSTEINE` (`app.js:10244`) zählt Karten. Stattdessen „50 Wörter gefestigt“, „Lektion sitzt nach 30 Tagen noch“, bei Texten „Sure einmal vollständig im Kreis“.
- Aufwand: S. Abhängigkeiten: Wortlaut vom Betreiber.

**11. Rundenende mit einer Folgerung**
- Was: Nach den drei Kacheln eine Zeile mit Handlung, etwa „4 von 20 nicht gewusst, 2 davon zum wiederholten Mal: ansehen“.
- Aufwand: S. Abhängigkeiten: keine, die Daten sind in der Runde vorhanden.
- Beleg: `app.js:11331`.

**12. Lernzeit und Karten pro Minute**
- Was: Bräuchte neue Zeitmessung und neue Speicherung.
- Urteil: Belohnt Tempo statt ehrliches Erinnern, bei Karten gibt es bewusst keine Denkpause (`plan/texte-lernen/WIEDERHOLEN.md`, § 7). Höchstens „etwa N Minuten“ als Schätzung vor der Runde, ohne Speicherung.

## Top 3

1. **Idee 1 mit 4 und 11 als Paket**: kein neues Feld, behebt den Kernbefund „Fleiß statt Können“ und gibt jedem Block eine Handlung.
2. **Idee 3 in der Kartensatz-Variante**: der einzige wirklich unbestreitbare, zielgruppenspezifische Mehrwert, aber nur mit geprüften Daten ehrlich.
3. **Idee 2 mit 6**: kleinste Datenerweiterung mit dem größten Einsichtsgewinn (läuft mein Lernen, wie viel kommt auf mich zu).

## Nicht bauen

- Abdeckungs-Prozente aus reinem Wortform-Abgleich ohne Lemma-Daten: Die Zahl wäre falsch und bei Quran-Bezug besonders heikel.
- Lernzeit, Karten pro Minute, die Trend-Pille und jede Antworten-Mengenzahl als Hauptkennzahl: Dekoration, die Vergessen belohnt (`FORT.md:85-94`). Ebenso einen vollständigen Antwortverlauf je Karte: ein Vielfaches an Schreibvorgängen und Speicher für wenig Mehrwert ohne FSRS, das Korb 3 ist.

Nicht geprüft: Duolingo-Belege (keine Quelle recherchiert), die Trefferrate des Wortform-Abgleichs (nicht gemessen, da nur gelesen), die GPL-Folgen für die App (Rechtsfrage).

Quellen: [Anki-Handbuch, Statistik](https://docs.ankiweb.net/stats.html) · [Quranic Arabic Corpus, FAQ und Lizenz](https://corpus.quran.com/faq.jsp) · [Lemma-Liste des Corpus](https://corpus.quran.com/lemmas.jsp) · [Häufigkeitsangaben, Sekundärquelle](https://earabiclearning.com/blog/?p=16295)
