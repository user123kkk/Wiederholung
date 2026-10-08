# Arabisch-spezifische Mehrwert-Ideen

Wörtlich aus dem Chat 981b69a1, Agent 2, gestartet 2026-10-07 15:39 (Quelle: `agent-ab10bb9d0432bb738.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 12 parallelen Ideen-Agenten für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server; Hosting Firebase). Der Betreiber ist ein Einzelner, bisher Nutzer: er und wenige Freunde; Ziel ist eine öffentliche, ernsthafte Lern-Website. Zielgruppe: deutschsprachige Muslime, die Arabisch (Quran-/klassisches Arabisch) lernen. Neu im Probelauf: "Texte auswendig lernen" (u. a. Quran, Tanzil-Daten unter quran/).
Frage des Betreibers: Wie kann das Tool ECHTEN, UNBESTREITBAREN Mehrwert bieten – Features, Ausbau, Verbesserungen, Neues. Er will ein großes, gründliches Ergebnis.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Also: keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden (log, show, diff, grep), keine Tests, keine Server, keine Skripte aus plan/werkzeuge starten, nichts installieren. app.js nie komplett lesen, sondern mit Grep gezielt suchen und Ausschnitte lesen.
Nützliche Dateien: KONZEPT.md, README.md, CHANGELOG.md, plan/STAND.md, plan/grossplan/FUNKTIONEN.md (bereits bewertete Funktionen: Korb 1/2/3 – nichts davon einfach wiederholen, sondern darauf aufbauen oder begründet widersprechen), plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/monetarisierung/GERUEST.md, plan/landing-page-strategie/STRATEGIE.md, plan/beobachtungen-lernwerkzeug.md, plan/zyklus-2/AUFGABEN.md.
Rahmenbedingungen des Projekts: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte selbst (Wortlaut kommt vom Betreiber oder aus geprüften Quellen); keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben der Nutzer. Keine Dark Patterns. Datenschutz (DSGVO) ernst. Kein eigener Server (Cloud Functions wären eine bewusste Entscheidung – als Abhängigkeit kennzeichnen).
AUSGABEFORMAT (Deutsch, max. ca. 900 Wörter, kein Vorgeplänkel): 8–14 konkrete Ideen. Je Idee: Titel; was genau (2–3 Sätze); für wen und welcher belegbare Nutzen; Aufwand S/M/L; Abhängigkeiten (Server? Inhalte vom Betreiber? Lizenz? iOS-Grenzen?); Risiko/Gegenargument; Beleg (Datei:Zeile im Repo bzw. URL). Am Ende: deine Top 3 mit einem Satz Begründung und 1–2 Dinge, die man ausdrücklich NICHT bauen sollte. Ehrlich gewichten, nicht verkaufen. Nichts erfinden: Was du nicht geprüft hast, als Vermutung kennzeichnen.

DEIN BLICKWINKEL: Die arabische Sprache selbst. Was macht Arabischlernen für Deutschsprachige schwer (Schrift, Harakat/unvokalisiertes Lesen, Wurzeln und Wortmuster/Sarf, gebrochene Plurale, Verbstämme I–X, I'rab/Nahw, Hören/Aussprache, ähnlich aussehende Buchstaben, Verbformen-Konjugation), und was davon kann eine Karteikarten-App gezielt besser lösen als generische Tools wie Anki? Prüfe im Code, welche arabisch-spezifischen Dinge es schon gibt (Grep z. B. nach "harakat", "wurzel", "plural", "arab", "rtl", "tashkeel", Kartenfelder, Kartentypen, Eingabe/Tippen arabisch, Schriftarten unter fonts/). Denke an: Wurzel-Familien verknüpfen, Abfrage ohne Harakat, Mustererkennung (Awzan), Konjugations-/Deklinationstabellen als Abfrage, Quran-Worthäufigkeit (z. B. "80 % der Quran-Wörter"), Wort-im-Vers-Kontext aus den vorhandenen Tanzil-Daten, Audio/TTS (Web Speech API – Qualität für Arabisch ehrlich bewerten), arabische Tastatur-Hilfe, Schreibtraining. Recherchiere frei verfügbare, lizenzklare Datenquellen (z. B. Quranic Arabic Corpus, Tanzil, Lane's Lexicon digital, quran.com API) und nenne jeweils die Lizenzlage.

## Bericht des Agenten

## Blickwinkel „Arabische Sprache" – Befund und 11 Ideen

**Was es schon gibt (geprüft, nur gelesen):**
- Eine Karte hat genau drei Felder: Wort, Übersetzung, Notiz (`app.js:1855`, `8377–8386`). Das Wurzel-/Grammatikfeld wurde in 3.9.8 entfernt (`plan/grossplan/FUNKTIONEN.md:70`).
- Die Suche normalisiert Arabisch bereits gründlich: Harakat, Hamza-Formen, ة/ه, ى/ي und Umschrift (`app.js:11441–11469`).
- Handschrift-Canvas in der Abfrage (`app.js:11360–11373`), arabische Schriftgröße einstellbar, Schriften UthmanicHafs und AmiriQuran (`styles.css:3494–3514`).
- Der Quran liegt vollständig lokal: `quran/tanzil-uthmani.txt` (6236 Verse, 1,4 MB) plus Metadaten, geladen über `quranLaden`/`quranAya` (`app.js:11648–11729`).
- Anfangsbuchstaben-Hilfe für Texte (`app.js:12203–12212`).
- Es gibt kein Audio, kein TTS, keinen Harakat-Schalter, keine Wortverknüpfung und keine Tastaturhilfe (Grep ohne Treffer).

### Ideen

**1. Harakat-Leiter statt Schalter (baut auf F-2 auf)**
- Was: Drei Stufen je Karte: voll vokalisiert, nur Schadda und Endung weg, ganz ohne. Die Stufe steigt automatisch mit der Lernstufe; nach dem Aufdecken steht immer die Vollform.
- Nutzen: Unvokalisiertes Lesen ist die Hürde zwischen Lehrbuch und echtem Text. Anki kann das nur mit Zusatzfeldern von Hand.
- Aufwand: S–M. `SUCH_WEG` liefert die Regex schon (`app.js:11441`).
- Abhängigkeiten: nur für eigene Karten; für Quran-Zeilen entscheidet der Betreiber (FUNKTIONEN F-2).
- Risiko: Eine automatische Kopplung an die Stufe berührt die Lernlogik. Als reine Anzeige ist sie vertretbar.

**2. „Wo steht dieses Wort im Quran?" (Konkordanz aus den Tanzil-Daten)**
- Was: In der Kartenansicht ein Knopf „Im Quran: n Stellen". Er zeigt die Verse mit markiertem Wort (Sure:Ayah), unverändert aus der lokalen Datei.
- Nutzen: Ein Wort im echten Kontext ist für diese Zielgruppe die stärkste Motivation. Es braucht keinen Server und keinen selbst verfassten Inhalt.
- Aufwand: M. Die Normalisierung existiert; ein Wort-Index im Speicher kommt dazu.
- Abhängigkeiten: Ohne Morphologie trifft die Suche nur Oberflächenformen mit Präfix-Heuristik (و، ف، ب، ل، ال). Das ist fehleranfällig und müsste ehrlich als „gleiche Schreibung" beschriftet werden.
- Risiko: Falschtreffer bei Homographen; es gibt keine deutsche Übersetzung dazu.

**3. Morphologie-Daten des Quranic Arabic Corpus (Wurzel und Lemma je Wort)**
- Was: Die Morphologiedatei (Wurzel, Lemma, Wortart, Verbstamm je Quran-Wort) statisch mitliefern. Sie macht Idee 2 exakt und trägt die Ideen 4 und 5.
- Lizenz (geprüft, corpus.quran.com/download): GNU GPL, zugleich „CHANGING IT IS NOT ALLOWED", Quellenangabe und Link Pflicht, auch kommerziell erlaubt. Die GPL könnte auf die App abfärben; das muss vor dem Einbau rechtlich geklärt werden.
- Aufwand: M (Datei schätzungsweise mehrere MB, verzögert laden).
- Risiko: Der Corpus nutzt eine eigene Verszählung und Transliteration; der Abgleich mit Tanzil-Wortgrenzen ist nicht geprüft.

**4. Wurzel-Familien automatisch statt als Feld**
- Was: Die App zeigt zu einer Karte „verwandte Karten von dir" und die Quran-Wörter derselben Wurzel, ohne dass der Nutzer etwas eingibt.
- Nutzen: Das Feld scheiterte, weil niemand es ausfüllte (0 von 136). Automatisch entfällt genau dieser Grund; die Wurzelvernetzung ist der größte Hebel gegenüber Anki.
- Aufwand: M. Abhängigkeit: Idee 3. Außerhalb des Quran-Wortschatzes gibt es keine Zuordnung.
- Risiko: widerspricht formal F-20; die Begründung dafür ist oben genannt.

**5. Quran-Häufigkeit als ehrliche Deckungszahl**
- Was: „Deine gelernten Karten decken x % der Wörter in Sure Y." Je Text eine Liste „häufigste Wörter, die du noch nicht hast" zum Selbstanlegen.
- Nutzen: Es entsteht ein messbares Ziel. Das bekannte „80 %"-Versprechen wird damit überprüfbar statt Werbung.
- Aufwand: M. Abhängigkeit: Idee 3, sonst nur grob. Die Übersetzung tippt der Nutzer oder liefert der Betreiber (LEHREN § 1.6).
- Risiko: Prozentzahlen täuschen Verständnis vor; die Beschriftung muss „Wortformen wiedererkannt" lauten.

**6. Verwechslungs-Drill für ähnliche Buchstaben und Laute**
- Was: Wenn der Nutzer Karten mit „Nochmal" bewertet, die sich nur in einem Buchstaben ähneln (ح/خ/ج, ص/س, ض/د/ظ, ع/غ, ت/ط, ق/ك), stellt die App sie nebeneinander.
- Nutzen: Deutschsprachige scheitern genau an diesen Paaren. Es arbeitet nur mit den eigenen Karten des Nutzers.
- Aufwand: M (Editierdistanz über normalisierte Formen). Kein Server.
- Risiko: Eingriff in die Rundenzusammenstellung, also Lernlogik. Als eigener Übungsmodus wäre es sauberer.

**7. Formen-Tabellen als Kartentyp (Konjugation und Deklination)**
- Was: Eine Karte trägt ein Raster (14 Personen, oder Singular/Dual/Plural mal Kasus). Abgefragt wird je eine verdeckte Zelle.
- Nutzen: Sarf wird als Tabelle gelernt; Anki braucht dafür Cloze-Bastelei.
- Aufwand: L (neues Kartenformat, Firestore-Regeln, Editor).
- Abhängigkeiten: Der Inhalt kommt vom Nutzer oder Betreiber; maschinelles Konjugieren ist ausgeschlossen (LEHREN § 1.6, Zeile 246).
- Risiko: großer Bau für wenige Fortgeschrittene.

**8. Arabische Eingabehilfe im Kartenformular**
- Was: Eine Harakat-Leiste über dem Wortfeld (ـَ ـِ ـُ ـْ ـّ, Tanwin, ٱ, ء-Formen) und ein Hinweis, wie die arabische Tastatur aktiviert wird.
- Nutzen: Vokalisiertes Tippen ist auf iOS und Windows mühsam. Ohne Harakat angelegte Karten entwerten Idee 1.
- Aufwand: S. Keine Abhängigkeiten.
- Risiko: Die Leiste kann auf iOS mit der Bildschirmtastatur kollidieren (Vermutung, am Gerät prüfen).

**9. Plural und Verbform als strukturierte Notiz-Vorlage**
- Was: Kein neues Feld. Eine erkannte Kurzschreibweise in der Notiz („ج: …", „مضارع: …", „مصدر: …") wird beim Aufdecken hervorgehoben und optional separat abgefragt.
- Nutzen: Gebrochene Plurale und das Imperfekt muss man mitlernen.
- Aufwand: S–M. Risiko: Die Konvention muss erklärt werden; wenige werden sie nutzen (siehe F-20).

**10. Audio nur als geprüfte Aufnahme, kein TTS**
- Was: Ich stimme F-15 zu. Die arabischen Stimmen der Web Speech API unterscheiden sich je Gerät, lesen unvokalisierten Text oft falsch und kennen kein Tajwid (Erfahrungswissen, nicht im Repo gemessen).
- Alternative: Vers-Audio eines anerkannten Qari für „Texte lernen" als statische Dateien oder Link.
- Abhängigkeiten: Die Lizenz je Rezitation ist ungeklärt (everyayah.com und QUL/Tarteel habe ich nicht geprüft). Die Auswahl des Qari trifft der Betreiber. Für Speicher und Bandbreite reicht das Hosting-Kontingent möglicherweise nicht.
- Aufwand: M–L.

**11. Schreibtraining mit Vorlage**
- Was: Im Handschrift-Canvas liegt das Wort blass als Vorlage in UthmanicHafs und wird nach und nach ausgeblendet.
- Nutzen: Verbindungsformen der Buchstaben; das Canvas ist schon da.
- Aufwand: S–M. Risiko: Ohne Stricherkennung gibt es keine Rückmeldung, also bleibt es reine Selbstkontrolle (konsistent mit der App).

### Nicht geeignete Quellen
- **quran.com / Quran Foundation API:** fremder Server (widerspricht `plan/texte-lernen/KONZEPT.md:489`). Sie verlangt nach meinem Wissen OAuth-Client-Secret; der Abruf der Doku-Seite hat das nicht bestätigt.
- **Lane's Lexicon:** digital laut Suchtreffer CC BY-SA (Tufts/Perseus), aber englisch, riesig und für Lernende zu schwer. Allenfalls als Link nach außen.

### Top 3
1. **Idee 1 (Harakat-Leiter)** – kleinster Aufwand, trainiert direkt die Kernfähigkeit, keine Lizenz- oder Inhaltsfrage.
2. **Idee 2 (Quran-Konkordanz aus den lokalen Daten)** – ein Alleinstellungsmerkmal ohne Server und ohne selbst verfassten Inhalt; die Daten sind bereits ausgeliefert.
3. **Idee 8 (Eingabehilfe)** – unscheinbar, aber Voraussetzung dafür, dass Karten überhaupt sauber vokalisiert entstehen.

Die Ideen 3 bis 5 sind der größte Hebel, hängen aber an der GPL-Klärung.

### Nicht bauen
- **Arabisch-TTS oder Spracherkennung** für Aussprache und Rezitation: Die Qualität ist nicht verlässlich, und bei Quran-Text ist ein Fehler nicht hinnehmbar.
- **Automatisch erzeugte Konjugationen, Plurale oder Übersetzungen** (regelbasiert oder per KI): verstößt gegen LEHREN § 1.6, und ein einziger Fehler zerstört das Vertrauen.

Quellen:
- https://corpus.quran.com/download/
- https://tanzil.net/docs/text_license
- https://www.laneslexicon.com
- https://api-docs.quran.foundation/docs/category/content-apis
