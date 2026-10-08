# Lehrer Gruppen Moschee Ideen

Wörtlich aus dem Chat 981b69a1, Agent 8, gestartet 2026-10-07 15:39 (Quelle: `agent-abf0aaf6fa413184a.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 12 parallelen Ideen-Agenten für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server; Hosting Firebase). Der Betreiber ist ein Einzelner, bisher Nutzer: er und wenige Freunde; Ziel ist eine öffentliche, ernsthafte Lern-Website. Zielgruppe: deutschsprachige Muslime, die Arabisch (Quran-/klassisches Arabisch) lernen. Neu im Probelauf: "Texte auswendig lernen" (u. a. Quran, Tanzil-Daten unter quran/).
Frage des Betreibers: Wie kann das Tool ECHTEN, UNBESTREITBAREN Mehrwert bieten – Features, Ausbau, Verbesserungen, Neues. Er will ein großes, gründliches Ergebnis.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Also: keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden (log, show, diff, grep), keine Tests, keine Server, keine Skripte aus plan/werkzeuge starten, nichts installieren. app.js nie komplett lesen, sondern mit Grep gezielt suchen und Ausschnitte lesen.
Nützliche Dateien: KONZEPT.md, README.md, CHANGELOG.md, plan/STAND.md, plan/grossplan/FUNKTIONEN.md (bereits bewertete Funktionen: Korb 1/2/3 – nichts davon einfach wiederholen, sondern darauf aufbauen oder begründet widersprechen), plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/monetarisierung/GERUEST.md, plan/landing-page-strategie/STRATEGIE.md, plan/beobachtungen-lernwerkzeug.md, plan/zyklus-2/AUFGABEN.md.
Rahmenbedingungen des Projekts: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte selbst (Wortlaut kommt vom Betreiber oder aus geprüften Quellen); keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben der Nutzer. Keine Dark Patterns. Datenschutz (DSGVO) ernst. Kein eigener Server (Cloud Functions wären eine bewusste Entscheidung – als Abhängigkeit kennzeichnen).
AUSGABEFORMAT (Deutsch, max. ca. 900 Wörter, kein Vorgeplänkel): 8–14 konkrete Ideen. Je Idee: Titel; was genau (2–3 Sätze); für wen und welcher belegbare Nutzen; Aufwand S/M/L; Abhängigkeiten (Server? Inhalte vom Betreiber? Lizenz? iOS-Grenzen?); Risiko/Gegenargument; Beleg (Datei:Zeile im Repo bzw. URL). Am Ende: deine Top 3 mit einem Satz Begründung und 1–2 Dinge, die man ausdrücklich NICHT bauen sollte. Ehrlich gewichten, nicht verkaufen. Nichts erfinden: Was du nicht geprüft hast, als Vermutung kennzeichnen.

DEIN BLICKWINKEL: Lehrer, Kurse, Lerngruppen, Familien. Lies plan/lehrer-modus/GERUEST.md und LOGBUCH.md gründlich sowie firestore.rules (wie sind Daten heute getrennt? gibt es schon geteilte/geführte Bereiche? Grep in app.js nach "lehrer", "gefuehrt", "schreibgeschuetzt", "teilen", "gruppe", "AUTOR"). Überlege, wie Arabisch-Unterricht in der Zielgruppe real stattfindet (Moschee-Kurse, Online-Institute, private Lehrer, Lernkreise, Eltern mit Kindern, Selbstlerner mit Lehrbuch) und was Lehrende heute mühsam von Hand machen (Vokabellisten verteilen, Hausaufgabe kontrollieren, wissen, wer wo hängt, Abhören von Auswendiggelerntem). Ideen-Feld: Kartensatz einer Klasse per Code verteilen und nachträglich aktualisieren, Lektions-Freischaltung im Wochentakt, anonyme oder einwilligungsbasierte Fortschrittsübersicht für die Lehrkraft (welche Wörter sind für die Klasse schwer), Abhör-Protokoll für Texte, Familienkonto/Kinderprofile (DSGVO Art. 8, Einwilligung der Eltern – ehrlich bewerten), Lernpartner. Für jede Idee das Datenmodell in Firestore-Regeln skizzieren (2–3 Zeilen: wer liest/schreibt was), Missbrauchs- und Datenschutzrisiken nennen und sagen, ob sie OHNE Cloud Functions sicher baubar ist. Bewerte außerdem ehrlich: Ist der Lehrer-Kanal der stärkste Hebel für Verbreitung (ein Lehrer bringt 20 Schüler) oder ein Ablenkungsrisiko für ein Einzelprojekt?

## Bericht des Agenten

## Blickwinkel Lehrer, Kurse, Lerngruppen, Familien

**Ausgangslage (geprüft):** Daten sind strikt je Konto getrennt (`firestore.rules:156-271`). Einzige kontoübergreifende Stelle ist `geteilteLektionen/{code}`: `get` für jedes bestätigte Konto, `list` nur auf eigene Sätze, Inhalt unveränderlich, nur `freigabe.offenBis` darf der Ersteller erhöhen (`firestore.rules:316-361`). Der Lehrer erfährt per Betreiber-Vorgabe nichts über Empfänger (`plan/lehrer-modus/GERUEST.md:308-370`). Minderjährige (C5) sind harte Sperre bis Anwaltsrat (`GERUEST.md:154-163`). Nicht geprüft: ob die Regeln von 3.7.0 live sind und der Zwei-Konten-Test je lief (`plan/lehrer-modus/LOGBUCH.md:43-44` nennt beides offen).

### Ideen

**1. Satz unter demselben Code nachliefern** (S–M)
- Was: Der Lehrer veröffentlicht eine neue Ausgabe unter dem bestehenden Code. Die Empfänger-App liest den Code ohnehin regelmäßig (`app.js:4524`) und bietet dann „Neue Ausgabe übernehmen" an; das Zusammenführen existiert schon (`app.js:4656`).
- Nutzen: Kurse entstehen Woche für Woche. Heute erreicht eine später angelegte Lektion die Klasse nicht, der Lehrer muss neu teilen und alle müssen neu einlösen (`LOGBUCH.md:45-46`).
- Regel: `update` nur Ersteller, nur `inhalt` und `freigabe`, `satzVersion` muss steigen. Ohne Functions sicher.
- Risiko: Ein Lehrer kann Inhalte nachträglich austauschen; der vorhandene Bestätigungsdialog und die Notbremse (`app.js:4707`) mildern das. Fortschritts-Codes merken den Code beim Empfänger bisher nicht (nur `lehrerCode`).

**2. Einladungslink zum Code** (S)
- Was: `…/#code=XXXXX-XXXXX`, nach Anmeldung direkt der Einlösen-Dialog. Im Fragment, nicht in der Query. Ein QR-Code bräuchte einen eingebetteten Generator.
- Nutzen: 20 Schüler tippen heute zehn Zeichen in ein Eingabefeld unter Einstellungen (`app.js:4471-4483`).
- Regel: keine Änderung.
- Risiko: Link in WhatsApp-Gruppen heißt, der Code ist faktisch öffentlich. Das ist beim Code heute schon so.

**3. Freigabe im Wochentakt** (M)
- Was: Der Lehrer hinterlegt je Lektion ein Datum; die App öffnet selbst.
- Nutzen: Lehrer vergessen den Klick; ein Kurs läuft auch in den Ferien weiter. In `plan/grossplan/FUNKTIONEN.md:38` (F-4) ist das als Premium vorgesehen.
- Regel: `freigabe: {offenBis, termine: list}`, nur Ersteller schreibt.
- Risiko: Greift in `offeneLektionIds` ein (`app.js:421`), braucht also eine Lernlogik-Freigabe. Die Geräteuhr ist manipulierbar; das ist unkritisch, weil Freischalten laut `firestore.rules:42-47` ohnehin nicht schützbar ist.

**4. Prüfung und Vorschau vor dem Teilen** (S)
- Was: „So kommt es beim Schüler an" plus harte Warnung mit Sprung zur Korrektur.
- Nutzen: Karten ohne Lektion bleiben beim Empfänger für immer gesperrt; heute steht das nur als Dialogtext da (`app.js:4262`).
- Regel: keine.

**5. Mehrere Codes je Satz** (M)
- Was: Derselbe Stoff für zwei Klassen mit unterschiedlichem Takt. Heute ist es ein Code je Bereich (`app.js:4321`).
- Regel: Bereichsfeld `teilCodes` (Map, höchstens 10), Datensätze unverändert.
- Risiko: Erst sinnvoll, wenn ein echter Lehrer zwei Gruppen hat (Bedingung aus F-4).

**6. Abhör-Modus auf einem Gerät** (S–M)
- Was: Eine zweite Person (Lehrer, Elternteil, Lernpartner) hält das Gerät, sieht den Text und tippt hakende Zeilen an. Das Ergebnis geht in den bestehenden Weg „Fließend / Hakt" (`plan/texte-lernen/KONZEPT.md:127-129`).
- Nutzen: Selbstbewertung beim Aufsagen ist unzuverlässig. Dass Abhören der Kern realen Hifz-Unterrichts ist, ist meine Annahme, im Repo nicht belegt.
- Regel: keine, kein Datenfluss zwischen Konten, C5 wird nicht berührt.
- Risiko: Bewertungsweg der Texte ist Lernlogik. Texte sind derzeit nur im Betreiber-Konto frei (`app.js:83`).

**7. Abhör- und Lernblatt zum Drucken** (S)
- Was: Über `window.print` den Abschnitt, das Datum, Hakstellen und ein Unterschriftsfeld ausgeben; ebenso eine Vokabelliste je Lektion mit Code.
- Nutzen: Moschee-Kurse arbeiten mit Papier (Annahme). Kein Druckweg in `app.js` gefunden.
- Regel: keine.
- Risiko: Quran-Druckbild (Schrift, Umbruch) muss der Betreiber abnehmen.

**8. Texte als Aufgabe per Code (T11)** (M)
- Was: Der Lehrer teilt bei Quran nur den Verweis (Sure, Aya von–bis), nicht den Wortlaut; der Text kommt lokal aus `quran/`.
- Nutzen: „Bis nächste Woche diese Ayat" ist die typische Hausaufgabe. Kein Verfälschungsrisiko, kleine Dokumente.
- Regel: `inhalt` um `texte: list` erweitern, sonst wie heute.
- Risiko: T11 ist bewusst „später" (`KONZEPT.md:370`). Eigene Texte des Lehrers wären frei eingegebener religiöser Wortlaut auf Betreiber-Infrastruktur, also ein Moderationsthema.

**9. „Meine schweren Wörter" vom Schüler selbst teilen** (S)
- Was: Der Lernende erzeugt aus `rueckfaelle` (Feld vorhanden, `firestore.rules:249`) eine Liste und schickt sie über das Share-Sheet an wen er will.
- Nutzen: Der Lehrer sieht, wo es hängt, ohne dass Adrabic Daten zwischen Konten bewegt.
- Regel: keine.
- Risiko: Reibt sich an „System nicht verraten" (F-13, `FUNKTIONEN.md:63`).

**10. Anonyme Klassenübersicht „schwere Wörter"** (L, nicht empfohlen)
- Was: Empfänger schreiben mit Einwilligung Rückfälle je Karte nach `geteilteLektionen/{code}/rueck/{id}`.
- Regel: `create` für Empfänger, `list` nur für den Ersteller.
- Ohne Functions nicht sauber baubar: Ohne Kontokennung ist es spam- und manipulierbar; mit Kennung als Dokument-ID sieht der Lehrer ein Pseudonym. Eine Mindestgruppengröße lässt sich in Regeln nicht erzwingen. Widerspricht zudem der Vorgabe aus `GERUEST.md:311-315` und fällt unter C5.

**11. Familienkonto und Kinderprofile** (L, nicht empfohlen)
- Unterprofile unter `users/{uid}/profile/{pid}/…` würden Serie, Verlauf, Bereiche und alle Regeln umbauen. Es bleiben Kinderdaten, auch wenn das Elternkonto sie hält; der Inhaber ist selbst minderjährig (`FUNKTIONEN.md:29-32`). Den realen Bedarf (Eltern hören ab) deckt Idee 6.

**12. Lernkreis ohne Datenverbindung** (S, nach 1 und 3)
- Gemeinsamer Code plus Wochentakt ergibt denselben Stoff und Rhythmus für alle. Bewusst ohne Bestenliste (F-18, Korb 3).

### Ist der Lehrer-Kanal der stärkste Hebel?
Ja, aber nur in der datenlosen Form (Ideen 1–4). Dort fehlt wenig, und die Positionierung „Werkzeug, das behält, was du anderswo lernst" (`plan/landing-page-strategie/STRATEGIE.md:445`) passt genau auf Kurse. Als Klassenraum mit Mitgliedern, Rollen und Fortschritt ist er ein Ablenkungsrisiko: Regeln, Recht und Moderation für ein Einzelprojekt, ohne dass bisher ein Lehrer die Grundfunktion nachweislich nutzt. Vor jedem Ausbau sollte ein echter Lehrer mit einer echten Gruppe vier Wochen durchlaufen.

Nebenbefund: Jedes bestätigte Konto kann beliebig viele Dokumente bis 1 MiB in `geteilteLektionen` ablegen, ohne Ablaufdatum (`firestore.rules:327-347`). Bei öffentlicher Verbreitung braucht das eine Aufräumregel; ob Firestore-TTL ohne Functions reicht, habe ich nicht geprüft.

### Top 3
1. **Nachliefern unter demselben Code (1):** behebt die im Logbuch dokumentierte Lücke, ohne die ein laufender Kurs nicht funktioniert.
2. **Abhör-Modus auf einem Gerät (6):** bedient Lehrer, Eltern und Lernpartner zugleich, ganz ohne kontoübergreifende Daten.
3. **Einladungslink plus Vorschau (2 und 4):** kleinster Aufwand, senkt die Hürde genau dort, wo ein Lehrer 20 Leute mitbringt.

### Ausdrücklich nicht bauen
- Klassenraum mit Mitgliederliste, Chat und Fortschritt je Schüler (auch nicht „anonym", Idee 10).
- Kinderkonten und Familienprofile, solange C5 nicht anwaltlich geklärt ist.

### Relevante Dateien
- `C:\Users\USER\Wiederholung\firestore.rules`
- `C:\Users\USER\Wiederholung\plan\lehrer-modus\GERUEST.md`
- `C:\Users\USER\Wiederholung\plan\lehrer-modus\LOGBUCH.md`
- `C:\Users\USER\Wiederholung\app.js` (Zeilen 417-437, 4211-4275, 4314-4550, 4656-4710)
- `C:\Users\USER\Wiederholung\plan\grossplan\FUNKTIONEN.md`
- `C:\Users\USER\Wiederholung\plan\texte-lernen\KONZEPT.md`
