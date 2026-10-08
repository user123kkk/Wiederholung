# Inhalte Decks Import Ideen

Wörtlich aus dem Chat 981b69a1, Agent 6, gestartet 2026-10-07 15:39 (Quelle: `agent-a83d324a59354a34f.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 12 parallelen Ideen-Agenten für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server; Hosting Firebase). Der Betreiber ist ein Einzelner, bisher Nutzer: er und wenige Freunde; Ziel ist eine öffentliche, ernsthafte Lern-Website. Zielgruppe: deutschsprachige Muslime, die Arabisch (Quran-/klassisches Arabisch) lernen. Neu im Probelauf: "Texte auswendig lernen" (u. a. Quran, Tanzil-Daten unter quran/).
Frage des Betreibers: Wie kann das Tool ECHTEN, UNBESTREITBAREN Mehrwert bieten – Features, Ausbau, Verbesserungen, Neues. Er will ein großes, gründliches Ergebnis.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Also: keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden (log, show, diff, grep), keine Tests, keine Server, keine Skripte aus plan/werkzeuge starten, nichts installieren. app.js nie komplett lesen, sondern mit Grep gezielt suchen und Ausschnitte lesen.
Nützliche Dateien: KONZEPT.md, README.md, CHANGELOG.md, plan/STAND.md, plan/grossplan/FUNKTIONEN.md (bereits bewertete Funktionen: Korb 1/2/3 – nichts davon einfach wiederholen, sondern darauf aufbauen oder begründet widersprechen), plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/monetarisierung/GERUEST.md, plan/landing-page-strategie/STRATEGIE.md, plan/beobachtungen-lernwerkzeug.md, plan/zyklus-2/AUFGABEN.md.
Rahmenbedingungen des Projekts: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte selbst (Wortlaut kommt vom Betreiber oder aus geprüften Quellen); keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben der Nutzer. Keine Dark Patterns. Datenschutz (DSGVO) ernst. Kein eigener Server (Cloud Functions wären eine bewusste Entscheidung – als Abhängigkeit kennzeichnen).
AUSGABEFORMAT (Deutsch, max. ca. 900 Wörter, kein Vorgeplänkel): 8–14 konkrete Ideen. Je Idee: Titel; was genau (2–3 Sätze); für wen und welcher belegbare Nutzen; Aufwand S/M/L; Abhängigkeiten (Server? Inhalte vom Betreiber? Lizenz? iOS-Grenzen?); Risiko/Gegenargument; Beleg (Datei:Zeile im Repo bzw. URL). Am Ende: deine Top 3 mit einem Satz Begründung und 1–2 Dinge, die man ausdrücklich NICHT bauen sollte. Ehrlich gewichten, nicht verkaufen. Nichts erfinden: Was du nicht geprüft hast, als Vermutung kennzeichnen.

DEIN BLICKWINKEL: Inhalte und der Weg der Karten in die App. Prüfe im Code, wie Karten heute entstehen und wohin sie können: manuell erstellen, JSON-Import/-Export, mitgelieferte/geführte Bereiche oder Bücher (Grep nach "import", "export", "gefuehrt", "buch", "lektion", "AUTOR", "vorlage", "bereich"), und was plan/grossplan/FUNKTIONEN.md zu "Liste einfügen (F-1)" und "weitere Bücher" sagt. Ideen-Feld: Einfügen aus Zwischenablage/Tabelle, CSV/TSV, Anki-.apkg-Import (im Browser machbar? sql.js/zip – Aufwand ehrlich), Foto einer Vokabelliste mit OCR (Tesseract.js für Arabisch – Qualität und Größe ehrlich bewerten), Web-Share-Target, fertige Kartensätze zu verbreiteten Lehrwerken (Madinah-Bücher von Dr. V. Abdur Rahim, Al-Arabiyyah bayna Yadayk, Qasas an-Nabiyyin, Ajrumiyyah-Begriffe, Quran-Häufigkeitslisten) – jeweils URHEBERRECHT/Lizenz recherchieren und klar sagen, was erlaubt ist (Vokabellisten als solche vs. Übernahme von Lehrbuchinhalten, Übersetzungen), Teilen von Kartensätzen per Link/Code zwischen Nutzern (Firestore-Regeln, Missbrauch, Moderation, DSGVO), Kartensatz-Bibliothek mit Qualitätsprüfung durch den Betreiber, Duplikat-Erkennung, Massenbearbeitung, Karten direkt aus einem Quran-Vers erzeugen (Wort antippen → Karte, Tanzil-Daten liegen vor). Bewerte: Was senkt die Hürde "leere App am ersten Tag" am stärksten?

## Bericht des Agenten

## Befund: Wie Karten heute in die App kommen (geprüft)

- Einzeln über das Karten-Blatt (`submitCardForm`, app.js:5707), mit Duplikat-Warnung nur dort (`findeDuplikat`, app.js:5703).
- Eigene JSON-Sicherung einspielen (`importBackupFile` app.js:4930, `accept="application/json"` app.js:8615; Grenzen 5 MB / 20 000 Karten, app.js:206–208).
- 10-stelliger Code aus `geteilteLektionen` (`teileLektionCode` app.js:4314; Regeln firestore.rules:316–346: nur `get`, kein freies `list`).
- Leerer erster Tag: „Erste Karte anlegen“, „Kartensatz per Code“, „Datei einspielen“ (app.js:10131–10160). Der Code-Kommentar sagt selbst: „eine Backup-Datei hat am ersten Tag niemand“ (app.js:10156). Einen Code hat ein Fremder auch nicht.
- F-1 „Liste einfügen“ ist beschlossen (plan/grossplan/ENTSCHEIDUNGEN.md:201), aber nicht gebaut: kein Treffer in app.js, in plan/STAND.md:122 als „später“ geführt.
- Ein vom Agenten erfundener Startsatz wurde am 13.09. vom Betreiber verworfen (plan/PLAN.md:748). Inhalte müssen vor dem Schreiben freigegeben sein.
- Kein CSV, kein Share-Target (manifest.json ohne `share_target`), kein WASM in der CSP (firebase.json:60).

## Ideen

**1. F-1 bauen, aber als „Einfügen aus Tabelle/Zwischenablage“ mit Spaltenzuordnung**
- Was: Ein Textfeld; Trenner (Tab, `;`, `,`, ` – `) wird automatisch erkannt. Vorschau-Tabelle; welche Spalte arabisch ist, erkennt der Unicode-Bereich; dritte Spalte geht nach `extra`.
- Nutzen: Jeder mit Excel-, Google-Sheets-, Quizlet- oder Anki-Textexport; 30 Wörter kosten heute 30 Blatt-Durchgänge (FUNKTIONEN.md:20).
- Aufwand: S–M. Abhängigkeiten: keine (Regeln unverändert, Karten sind normale Dokumente).
- Risiko: Schreiblast bei 500+ Karten (ein Dokument je Karte), also stapeln.

**2. Duplikat- und Qualitätsprüfung im Massenweg**
- Was: `vergleichsWort()` (app.js:5700) auf jede eingefügte Zeile anwenden: „12 gibt es schon – überspringen / trotzdem“. Dazu Warnung bei leerer Übersetzung, vertauschten Spalten, Zeilen über `MAX_WORT`.
- Nutzen: verhindert Müll, den man später einzeln löschen muss.
- Aufwand: S, als Teil von 1. Risiko: zu viele Warnungen (ى/ي-Lehre, app.js:5695).

**3. CSV/TSV-Datei im selben Dialog**
- Was: Die Dateiauswahl nimmt zusätzlich `.csv/.tsv/.txt` und leitet in die Vorschau aus 1.
- Aufwand: S. Risiko: Zeichensatz (Excel-CSV ist oft Windows-1252; UTF-8 mit BOM prüfen), Anführungszeichen-Felder.

**4. Lektionen beim Einfügen gleich mit anlegen**
- Was: Eine Zeile `# Lektion 3` im eingefügten Text erzeugt eine Speicherkarte der Art „Lektion“.
- Nutzen: Lehrer und der Betreiber bauen einen geführten Satz in Minuten statt Stunden. Das ist die Voraussetzung für 5 und 6.
- Aufwand: S–M. Risiko: verdeckte Syntax, deshalb nur als Hinweiszeile.

**5. Regal mit Betreiber-Sätzen (F-3), als statische Dateien statt Codes**
- Was: `saetze/index.json` plus je Satz eine JSON-Datei im Hosting; Einspielen über das vorhandene `verarbeiteImportDaten` (app.js:4792, führt Updates über `satzId` zusammen).
- Nutzen: stärkster Hebel gegen die leere App. Kein Firestore-Lesen, kein Missbrauch, versionierbar.
- Aufwand: Technik S–M, Inhalt L (Betreiber).
- Abhängigkeit: Inhalt und Freigabe vor dem Commit (PLAN.md:748).
- Risiko: Statische Dateien sind nicht verkaufbar (FUNKTIONEN.md:52–55), nur für Gratis-Sätze.

**6. Erster Regal-Inhalt: Medina Buch 1**
- Was: Der Betreiber baut den Satz ohnehin; laut PLAN.md:755 hat der Autor die Online-Nutzung freigegeben.
- Lizenz: Die Freigabe schriftlich ablegen und ihren Umfang klären (Vokabeln, deutsche Bedeutungen, kostenpflichtig?). Nur die Web-Suche, nicht die Seite selbst geprüft: archive.org nennt für die Kursunterlagen des Toronto-Instituts „no copyrights reserved“ (https://archive.org/details/ArabicLanguageCourseBooks). Das ersetzt keine Freigabe für das Buch.
- Vermutung, keine Rechtsberatung: Einzelne Wörter sind nicht schutzfähig, wohl aber Auswahl und Anordnung eines Lehrwerks, Beispielsätze und fremde Übersetzungen. Für Bayna Yadayk und Qasas an-Nabiyyin (Verlags- bzw. Erbenrechte, ungeprüft) nur eigene Wortlisten „passend zu Lektion X“, ohne Buchsätze, oder Erlaubnis einholen.

**7. Aus einer Aya eine Karte machen**
- Was: In der Text-Ansicht ein Wort antippen; die Karte ist mit dem Wort aus dem unveränderten Tanzil-Text vorbefüllt, `extra` trägt Sure:Aya. Die Bedeutung tippt die Person selbst.
- Nutzen: verbindet die beiden Produktteile; Vokabeln entstehen dort, wo man sie braucht.
- Aufwand: M.
- Abhängigkeiten: Texte sind noch nur für den Betreiber freigeschaltet; Art.-9-Einwilligung besteht (app.js:11659).
- Risiko: Tanzil verbietet Textänderung (Lizenzblock in quran/tanzil-uthmani.txt). Ein Einzelwort als Zitat halte ich für unkritisch (Vermutung). Automatische Wortbedeutungen bewusst nicht: Das Quranic Arabic Corpus ist GPL und englisch (https://en.wikipedia.org/wiki/Quranic_Arabic_Corpus), eine frei lizenzierte deutsche Wort-für-Wort-Quelle habe ich nicht gefunden, und es wäre religiöser Wortlaut.

**8. Quran-Häufigkeitsliste als Regal-Satz**
- Was: Die Häufigkeiten lassen sich aus dem Tanzil-Text selbst zählen (Fakten, kein fremdes Werk). Die deutschen Bedeutungen kommen vom Betreiber.
- Nutzen: „Diese 300 Wörter decken einen großen Teil des Quran“ ist ein starkes Versprechen. Den Prozentwert vor Veröffentlichung selbst nachrechnen.
- Aufwand: Technik S, Inhalt L. Risiko: Wortformen gegen Lemma; ohne Morphologiedaten nur Oberflächenformen.

**9. Massenbearbeitung**
- Was: Mehrfachauswahl gibt es schon (PLAN.md:752 erwähnt die Checkbox); ergänzen um „in Speicherkarte/Bereich verschieben“, „löschen“, „Spalten tauschen“.
- Nutzen: nach jedem Import nötig. Aufwand: M. Risiko: Geführte Bereiche bleiben gesperrt (`kartenBearbeitbar`, app.js:502).

**10. Export als CSV/Text**
- Was: Gegenstück zu 3. Nutzen: Vertrauen („meine Daten gehören mir“, Art. 20 DSGVO), Druck, Weitergabe an Anki.
- Aufwand: S. Risiko: keines Nennenswertes.

**11. Teilen per Link statt nur Code**
- Was: `…/#code=ABCDE-FGHIJ` öffnet nach der Anmeldung direkt den Einlöse-Dialog; ein Entwurf steht in lehrer-modus/GERUEST.md Abschnitt J (app.js:4787).
- Nutzen: Lehrer schicken einen Link per WhatsApp. Aufwand: S–M.
- Risiko: Der Code ist die einzige Schranke; die Regeln prüfen keinen Inhalt. Eine öffentliche, durchsuchbare Nutzer-Bibliothek deshalb nicht bauen (Moderation, Urheberrecht, religiöse Inhalte Dritter).

**12. Anki-.apkg-Import**
- Machbar im Browser, aber teuer: Zip, SQLite-WASM (rund 1 MB), und seit Anki 2.1.50 ist `collection.anki21b` zstd-komprimiert (https://eikowagenknecht.com/posts/understanding-the-anki-apkg-format/). Dazu Notiztypen mit beliebigen Feldern, HTML, Medien und eine CSP-Änderung (`wasm-unsafe-eval`).
- Aufwand: L. Urteil: nicht bauen; Ankis Textexport läuft über 1 und 3.

**13. Foto-OCR**
- Tesseract-Arabisch lässt Harakat laut einer aktuellen Studie meist einfach weg (https://arxiv.org/pdf/2608.22366). Für eine App, deren Kern vokalisierte Wörter sind, heißt das Nacharbeit je Karte.
- Dazu mehrere MB WASM und Modell, CSP, iOS-Speicher. Urteil: nicht bauen.

**14. Web-Share-Target**
- Vermutung, nicht frisch geprüft: iOS-Safari unterstützt `share_target` nicht, und die Zielgruppe ist stark iPhone-lastig (CLAUDE.md, iOS-Befunde). Urteil: zurückstellen.

## Top 3

1. **Idee 1 mit 2 und 4:** beschlossen, ohne Server, Regeln und Inhalte; hilft jedem, der schon eine Liste hat.
2. **Idee 5 und 6:** Nur das löst „leere App am ersten Tag“ für Leute ohne eigenen Stoff. Die Technik liegt fast fertig da, der Engpass ist ausschließlich Betreiber-Inhalt und die schriftliche Freigabe.
3. **Idee 7:** Das Alleinstellungsmerkmal gegenüber Anki und Quizlet, ohne dass die App religiösen Wortlaut verfasst.

**Was die Hürde am stärksten senkt:** das Regal (5/6). Einfügen (1) hilft nur dem, der schon Material hat.

## Ausdrücklich nicht bauen

- Öffentliche Nutzer-Bibliothek mit fremden Kartensätzen (Moderation, Urheberrecht und religiöse Inhalte Dritter, für eine Einzelperson nicht leistbar).
- OCR und .apkg-Import (hoher Aufwand und Größe, schwache Qualität bei Harakat; der Textweg deckt den Bedarf).
- Maschinell erzeugte oder ungeprüft übernommene Wortbedeutungen zu Quran-Wörtern (LEHREN § 1.6/§ 2, Vorfall PLAN.md:748).
