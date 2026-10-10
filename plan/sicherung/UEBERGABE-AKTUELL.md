# Übergabe – Stand von 10.10.2026 10:59 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `19eed29 Sicherung 10:58 (automatisch, jede Minute)`
- Version in `app.js` (Arbeitsordner): const APP_VERSION = "3.18.30"
- Version im letzten Commit: const APP_VERSION = "3.18.29"

## Uncommittete Dateien (stehen vollständig in `plan/sicherung/entwurf-aktuell.patch`)

```
 A .agents/skills/adrabic-daten/SKILL.md
 A .agents/skills/adrabic-daten/agents/openai.yaml
 A .agents/skills/adrabic-lernbelege/SKILL.md
 A .agents/skills/adrabic-lernbelege/agents/openai.yaml
 A .agents/skills/adrabic-oberflaeche/SKILL.md
 A .agents/skills/adrabic-oberflaeche/agents/openai.yaml
 A .claude/skills/adrabic-daten/SKILL.md
 A .claude/skills/adrabic-lernbelege/SKILL.md
 A .claude/skills/adrabic-oberflaeche/SKILL.md
 M CHANGELOG.md
 M app.js
 M datenschutzerklaerung.html
 M firestore.rules
 M index.html
 M plan/werkzeuge/minuten_sicherung.sh
 A plan/werkzeuge/projekt_skills.mjs
 A plan/werkzeuge/pruefstand/diagnose_formular_konflikt.js
 M plan/werkzeuge/pruefstand/diagnose_karten_konflikt.js
 A plan/werkzeuge/pruefstand/diagnose_verlauf_neustart.js
 A plan/werkzeuge/pruefstand/karten_konflikte_sdk.js
 A plan/werkzeuge/pruefstand/t_tagesantworten_sdk.js
 M plan/werkzeuge/regeln/regeln-pruefung.mjs
 M sw.js
```

Auf einem sauberen Stand desselben Commits wiederherstellen:
`git apply --check plan/sicherung/entwurf-aktuell.patch`, dann `git apply plan/sicherung/entwurf-aktuell.patch`.

## Was gerade läuft

- Prozesse: node.exe 9, chrome.exe 0 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

## Letzte Testergebnisse (vollständige Ausgaben: `plan/sicherung/tests/`)

**entwurf-3.18.28**: 37 grün, 1 rot, zuletzt: EXIT 0 t_einst (2. Lauf)
```
EXIT 1 t_paket_e
```

**ladegeraet-nurpruefen-3.18.27.log**: 153 grün, 3 rot
```
ROT t_griff_scrollen.js (27s)
ROT t_konto_fortsetzungen.js (2s)
ROT t_paket_f_netz.js (1s)
153/156 Exit 0; 3 rot. Ausgaben noch lesen: C:\Users\USER\AppData\Local\Temp\adrabic-pruefstand-gesamt\7223038b21480566
ABGEBROCHEN: Pruefstand nicht komplett gruen (Liste oben). Nichts veroeffentlicht.
```

## Zuletzt getan (aus `plan/ARBEITSPROTOKOLL.md`)

## 10.10.2026

- 10:30 Codex sichtbare Fortschrittsmeldungen auf Betreiberwunsch in ALLES-OFFEN und vorhandener Automation verankert, ACTIVE bestätigt. Status zunächst ehrlich 14/34, keine Arbeit seit letzter Antwort; stündlichen Heartbeat von pausenloser Arbeit unterschieden. Danach erste Runde 07/08 vollständig ab Abschlussbericht gelesen, jeweils zwölf Hauptpositionen samt Nebenabschnitten zugeordnet. Jetzt 16/34 Berichte, 146 nummerierte Positionen plus Gegenprüfer; 18 Berichte und Rückwärtsprüfung offen. Auch Quelle 08 nennt anderen Repo-Pfad: nicht als bestätigten Desktop-Codebefund übernehmen. Kein Produktbau/keine Tests, neue Entscheidungsregel erhalten.

- 10:23 Codex erste Runde 01–06 abgeschlossen: sechs vollständige Abschlussberichte, 70 Hauptpositionen einzeln mit Katalog zugeordnet; Nebenideen/Gegenrede/Beleggrenzen erhalten. Neuer Bericht QUELLENABGLEICH-RUNDE1-2026-10-10.md, Gesamtstand 14/34 Berichte, 122 nummerierte Positionen plus Gegenprüfer. Quelle 05 nennt anderen Repo-Pfad: Herkunft aktueller Codebefunde daher ungeklärt, nur Ideenwortlaut übernehmen. Kein wissenschaftlicher/rechtlicher Nachweis aus Suchtreffern, keine neue Funktion. Betreiberkorrektur auch in CLAUDE eingetragen; Automation per App-Werkzeug mit neuer Regel aktualisiert und ACTIVE bestätigt, keine zweite. Erster Versuch der Konfigurationsübernahme scheiterte vor Änderung an umgebrochener Select-String-Ausgabe; unveränderte Literalzeile anschließend korrekt gelesen. Zwei versehentliche Backslash-Anführungszeichen in Dokumentation korrigiert. Positionszählung 70 separat bestätigt; Quellenabgleich erste Runde 07–26 und Rückwärtsprüfung noch offen.

- 10:19 Codex Betreiberkorrektur wortgetreu gesichert: frühere Ja/Beschlüsse können ohne Verständnis erfolgt sein. Zentrale Regel ENTSCHEIDUNGEN-VERSTEHEN.md erstellt und in AGENTS, BETREIBER-VERSTEHEN, CODEX-START, Zyklus-ENTSCHEIDUNGEN und Mehrwert-GESAMTLISTE sichtbar vor historische Freigaben gestellt. Noch unklare offene Funktionsentscheidungen vorläufig behandeln, konkret erklären statt alte Sammelzustimmung voraussetzen; keine massenhafte Umetikettierung oder Rücknahme bereits gebauter Arbeit. Aktueller technischer Datenauftrag/Entwurf, Paket-/Abnahme-/Deploy-Grenzen erhalten. Quellenabgleich weiter, keine Funktion daraus bauen.

- 10:18 Codex auf „anfangen, woauch imer du grad bist“ begonnenen Quellenabgleich fortgesetzt. Aktuelle Übergabe 10:17, Entwurf 3.18.30 und einzelner Sicherungsbaum 12532/16564 bestätigt. Erste Runde Berichte 01–03 vollständig ab Berichtsbeginn gelesen, einschließlich Beleggrenzen/Gegenreden; Zuordnung begonnen. Keine wissenschaftliche Neubewertung oder Produktumsetzung, keine abgeschlossenen Tests wiederholt.

- Codex Betreiberklärung aufgenommen: jetzt offene App-Punkte und Ideen direkt im Chat zeigen. ALLES-OFFEN, aktuelle Gesamtliste, STAND, Zyklus-Aufgaben und vollständigen Themenindex der Zukunftsnachricht gelesen; abgeschlossene Funktionen/Entwürfe, beschlossene Restarbeit, unentschiedene Vorschläge und echte Geräte-/Rechtsabnahmen unterscheiden. Historische 77/72-Zählungen nicht als aktuellen Gesamtstand verwenden; Quellenabgleich noch unvollständig. Keine neue Produktarbeit oder Testausführung durch Übersichtsauftrag.

- 10:09 Codex Quellenabgleich zweite Runde abgeschlossen: acht Vollberichte einschließlich Nebenabschnitten/Gegenrede, zwei Limit-Abbrüche; 52 nummerierte Hauptpositionen und narrativer Gegenprüfer einzeln im QUELLENABGLEICH-2026-10-10.md zugeordnet. 187 Katalogdatenzeilen unabhängig gezählt, unvollständige Erinnerungseinleitung sichtbar korrigiert. Fehlende konkrete Unterideen/Varianten/Beleggrenzen gesichert, keine Produktentscheidungen daraus. Erste 26 Berichte und rückwärtige Prüfung offen. Auf Wunsch nach ununterbrochener Weiterarbeit vorhandene pausierte Heartbeat-Automation per App-Werkzeug aktualisiert, ACTIVE bestätigt und Konfigurationsdatei gegengelesen: stündlich im aktuellen Chat, keine doppelte Automation; stoppt bei nur verschobenen Schritten/Entscheidungen, meldet keine Routinezustände. OpenAI-Doku-Skill für Automation gelesen, lokale Werkzeugbeschreibung/Konfiguration benutzt. CODEX_HOME war leer; tatsächlicher Konfigurationspfad unter Benutzerprofil gefunden. Minuten-Sicherung weiterhin ein Prozessbaum 12532/16564. Keine App-/Test-/Originalbericht-Änderung, keine Tests wiederholt.

- 10:03 Codex ausdrücklichen Weiterauftrag aufgenommen. Offenen Quellenabgleich Ideen-Katalog/34 vollständige Berichte begonnen: Katalog und Quellenverzeichnis gelesen, 36 Dateien davon zwei Abbrüche unterschieden. Historischer Katalog stammt aus Erinnerung; Originale inzwischen gesichert. Nur Dokumentationsprüfung, keine Umsetzung aus Ideen, kein neues Paket/Produkttest; Entwurf 3.18.30 und einzelne Minuten-Sicherung erhalten.

- 09:55 Codex Gegenlesen abgeschlossen: vollständiger App-/Rules-/Datenschutz-Diff, Befunde DATEN-9 bis DATEN-12 und drei SDK-Testdateien mit bestehenden Abschlusslogs gelesen. Keine Testausführung/-änderung, App-SHA 4a8ca5a1/Rules 6a110898 unverändert. Keine zusätzliche Produktlücke belegt; technische Beitragsprüfung nicht als Text-Probelauf-/PWA-/Gesamtabnahme ausgegeben. Bericht DATEN-GEGENLESEN-2026-10-10.md erstellt; sichtbaren aktuellen Korrekturblock in Mehrwert-ARBEITSSTAND, PLAN/STAND/Logbuch nachgezogen. Nachtarbeit dort zuvor noch aktiv/alte Fallzahlen, historische Angaben erhalten. Nächste entschiedene Lernrundenfolge bereits vorbereitet, kein neuer Paketbau. Entwurf/Fremdarbeit erhalten; große Abnahme/ladegeraet/Deploy später.

- 09:53 Codex neuer Fortsetzungschat: aktuelle Übergabe, Betreiber-/Zyklusvorgaben und LEHREN gelesen, Caveman-/Daten-Skill angewandt. Ein Sicherungsbaum 12532/16564 bestätigt; keine zweite Schleife, kein Pull/Reset über fremdem Entwurf. Betreiberauftrag wortgetreu gekürzt in ALLES-OFFEN eingetragen. 46 gezielte Fälle bleiben abgeschlossen; keine Tests gestartet. Befunde A14–A17 und aktueller App-Diff begonnen zu lesen, Anschlussvorbereitung/Mehrwert-Reihenfolge gelesen. Nächster Baupunkt Bearbeiten in der Abfrage bleibt bis Datenpaketabschluss gesperrt; große Abnahme/ladegeraet/Deploy später, Zukunftsideen nur vorgemerkt.

- 09:42 Codex Abschluss des begonnenen Datenprüfschritts: A14/A15 16, A16 22 und A17 acht SDK-Fälle gemeinsam am gleichen App-SHA 4a8ca5a1/Rules 6a110898 grün, alle vollständigen Ausgaben gelesen. Hinweise/Export/Entfernen/Offline-/Neustart-/Regelkonflikte und neue Fälle enthalten; Zusatzmeldungen nicht als zusätzliche Fälle gezählt. Bericht/Abnahmeplan/STAND/Logbuch abgeschlossen, insgesamt 46 gezielte Fälle. Keine weitere App-Änderung oder neue Testidee; Syntax/Standprüfung grün (Standausgabe wegen gemeinsamer Tool-Ausgabe nochmals separat als vollständiger Log gesichert). Ein leerer Dokumentationshunk zuvor abgewiesen, ohne Änderung; anschließend konkreten Berichtshunk angewandt. Große Paket-/Runden-/Zufallsabnahme bleibt verschoben, A14–A17 wegen Paketabschluss in Arbeit; kein App-Commit/Deploy/neues Paket. Repo-Folge und vorhandene Anschlussvorbereitung erhalten; neue Beobachtungen zu 3.18.26 weiter nur vorgemerkt.

- 09:38 Codex gezielter Datenabschluss: A17 alle acht aktuellen SDK-Fälle gemeinsam grün, gesamte Ausgabe gelesen, Bericht ergänzt. A14/A15-Nachlauf am selben App-SHA 4a8ca5a1/Rules 6a110898 gestartet, danach A16-Kataloglauf; nach A17-Produktfix und neuen Fällen bestand noch Quellstandlücke, keine unveränderten abgeschlossenen Gesamtprüfungen wiederholt. BatteryStatus 2 bestätigt. Keine großen Browser-/Runden-/Affenläufe, keine neuen Prüfideen oder App-Änderung. Große Paketabnahme/Commit/Deploy weiter später, Quellen während Prüfung erhalten.

- 09:36 Codex Betreiber-Fortsetzung: ausdrücklichen Wunsch „weiter nach reihenfolge ... ktirgs fertig“ in ALLES-OFFEN eingetragen. Übergabe 09:35 und bisherigen Abnahmeplan gelesen. Begonnenen A17-Prüfschritt mit vollständigem gezieltem Achter-SDK-Lauf am erhaltenen Entwurf gestartet, weil seit letztem Fünferlauf drei konkrete Fälle ergänzt wurden. Keine neuen Prüfideen oder Produktfunktionen bauen. Große Gesamt-/Rundenabnahme und neuer Paketbau bleiben wie zuvor verschoben/gesperrt; kein App-Commit/Deploy. Daten-Skill-Prüfebene unverändert.

- 09:33 Codex bisherigen Datenauftrag fortgesetzt: neue SDK-Einzelprobe Textkorrektur-nach-fremder-Bewertung grün, echte bestätigte Fremdstufe erhalten, korrigierter Text/Rückfallreset und passende Bewertungsbasis serverseitig geprüft, andere Karte/JS-Fehler kontrolliert. Feste A17-Ausgangsquelle 97cbdcc/05269ebd zeigt exakt 0 statt 3; Wrapper prüft Exit 1 und konkrete Stufenverlustmeldung. Ganze Ausgaben gelesen; App-SHA 4a8ca5a1/Rules 6a110898 unverändert, kein neuer Produktfix. A17-Bericht/Abnahmeplan/STAND aktualisiert, Katalog acht, nur neuer Einzelfall; keine Gesamt-/PWA-/Auth-/Lernwirkungsbehauptung. Keine neue Idee aus der Betreibernachricht gebaut. Daten-Skill weiter angewandt; Sicherung einzeln, Nacht-Automation pausiert, kein App-Commit/Deploy/neues Paket.

- 09:30 Codex neuer Betreiberauftrag: Nachricht vollständig wortgetreu als Original.txt gesichert, inklusive Schreibfehlern; Verfasszeit laut Betreiber gegen 01:00, beobachtete Version 3.18.26, Empfang gegen 09:29 getrennt von aktuellem Entwurf 3.18.30. Bild Speicherkarte umbenennen bytegleich in plan/betreiber-nachrichten/belege kopiert und SHA geprüft. Vollständiger Themenindex mit Fragen/Beobachtungen/Zukunftsvorhaben erstellt, keine Sofortfixes/Modi oder religiösen/lernbezogenen Entscheidungen daraus abgeleitet. ALLES-OFFEN verlinkt Wortlaut und jeden Themenbereich; bestehende verwandte Einträge/Skills nicht als Erfüllung des umfassenderen Wunsches ausgegeben. Übergabe 09:28 und einzelner Sicherungsbaum 12532/16564 gelesen/geprüft. Neuer Weiter-Auftrag im Chat; Nacht-Automation bleibt pausiert, Abnahme/Paketgrenzen erhalten. Weiter im bisherigen Datenentwurf, keine der genannten Ideen bauen.

- 09:06 Codex Nachtabschluss: reale Zeit 09:06 Europe/Berlin und Übergabe 09:06 bestätigt. Nachtfrist 09:00 erreicht; beim ersten nachfolgenden Heartbeat Automation adrabic-nachtarbeit-fortsetzen über App-Werkzeug mit unveränderten Feldern auf PAUSED gesetzt, ausdrückliche Werkzeugbestätigung erhalten. Keine Produktarbeit/Tests nach Frist, kein neuer Auftrag. Einzelner Minuten-Sicherungsbaum 12532/16564 samt transientem Kind weiter erhalten, keine zweite Schleife. App im Arbeitsbaum 3.18.30, im Commit 3.18.29; A14–A17/fremder Entwurf behalten. NACHTSTAND/STAND/ALLES-OFFEN/Logbuch um tatsächlichen Abschluss ergänzt; große Abnahme/Ladegerät/Veröffentlichung bleiben später. Keine App-Version committet, kein Deploy.

- 08:08 Codex Sicherungs-Gegenprüfung/Nachtstand: Übergabe 08:07 und einzelner Sicherungsbaum 12532/16564 mit transientem Kind erhalten. Aktuellen Minuten-Patch auf festem Commit dfd44eb in eigenem leeren TEMP-Ordner erst geprüft, dann tatsächlich angewandt. Alle 23 enthaltenen Dateien gegen vorher erfassten Arbeitsbaum LF-normalisiert gleich; App-SHA 4a8ca5a1 sowie Syntax App/A16-/A17-Prüfer grün. Vollständiger Wiederherstellungslog mit Patchhash gelesen; keine App-/Repo-Datei durch Wiederherstellung verändert, kein Produkttest wiederholt. Grenzen ausdrücklich: dieser Patch-Snapshot, keine ignorierten Dateien/PWA-/Vollabnahme. NACHTSTAND-2026-10-10.md fasst Ergebnis und offene Abnahme samt Quellgrenzen zusammen; STAND/Logbuch verlinkt. Entwurf/Fremdarbeit erhalten, kein App-Commit/Deploy/neues Paket. Nacht-Heartbeat noch ACTIVE; um/nach 09:00 wie beauftragt pausieren, kein neuer Nachtauftrag. Minuten-Sicherung weiter laufen lassen.

- 07:04 Codex A16-Beleggegenprobe: Übergabe 07:02 und einzelner Sicherungsbaum 12532/16564 bestätigt. Noch fehlende Inhaltsabweichung zwischen Cloud-Beleg und gültig geformter lokaler Kopie geprüft: regulären n-Beitrag bestätigen, Entfernung nur im Fixture blockieren, lokale Antwortart kontrolliert u setzen. Kennung/Tag/Epoche/Differenz unabhängig gegen echten Serverbeleg geprüft; nach Neustart/zweifachem Nachholen gleiche Kopie veraltet erhalten, Server n=1/u=0 und Beleg unverändert, Fremdkarte/JS-Fehler grün. TEMP-Mutant ohne Antwortartvergleich verliert Kopie, exakt Exit 1/0 statt 1 erkannt. Vollständige Logs gelesen, Quellen/Fixture-Grenzen im A16-Bericht, Abnahmeplan auf 22 Fälle aktualisiert; nur neuer Einzelbeleg, kein ganzer Lauf oder spontan auftretender Produktfehler behauptet. App-SHA 4a8ca5a1/Rules 6a110898 unverändert, keine Lern-/Auth-/PWA-Aussage, kein neuer Paketbau/Commit/Deploy. Daten-Skill wie zuvor gezielt angewandt. Nacht-Fortsetzung bis 09:00 weiter aktiv.

- 06:07 Codex konkrete Abnahmevorbereitung: Übergabe 06:05 und einzelner Sicherungsbaum 12532/16564 bestätigt. Belegstände A14–A17 gegen Testinventar/Runner/Ladegerät-Voraussetzungen abgeglichen, keine künstlichen Wiederholungen. Zwei Anschlusslücken festgehalten: Ladegerät stellt nur 8081 bereit, A16 benötigt zusätzlich 8082; Fortsetzungs-Hash berücksichtigt den direkt geladenen SDK-Helfer nicht. Tatsächliche Hashfunktion isoliert mit virtueller Helferänderung und positiver Testtextkontrolle geprüft, voller Log gelesen; keine Produkt-/Helferdatei für diese Gegenprobe verändert, kein Gesamt-/Ladegerät-Fehllauf behauptet. ABNAHME-VORBEREITUNG-3.18.30.md enthält Quellen, Hashgrenzen, SDK-Zusatzaufrufe und konkreten späteren Ablauf. Wrapper/App unverändert, große Abnahme/Ladegerät weiterhin verschoben; beide Anschlusslücken dafür offen. Daten-Skill-Prüfebenen beachtet, kein neuer H-Bau/App-Commit/Deploy. Nacht-Fortsetzung bis 09:00 aktiv.

- 05:04 Codex A16-Altersgrenze: Übergabe 05:02 und einzelner Sicherungsbaum 12532/16564 bestätigt. Daten-Skill weiter angewandt, bestehende 120-Tage-Grenze im Nachholpfad gelesen. Zwei neue SDK-Einzelproben mit unabhängig berechneten/gegengeprüften Kalenderdaten und geprüfter Beitragsverteilung: 120 Tage einmal nachgeholt, 121 Tage unverändert als veraltet aufbewahrt, heute kein Zuschlag, andere Karte/JS-Fehler kontrolliert. Separater TEMP-Mutant mit <= statt < scheitert genau 0 statt 1 an Grenzerwartung; Wrapper prüft Exit 1/Meldung. Alle vollständigen Logs gelesen, Syntax/Diff grün. Kontrollierte lokale Datierung, keine echte Wartezeit/Auth-/PWA- oder Lernwirkungsaussage; Katalog 21, nur zwei neue Einzelfälle, kein ganzer 21er-Lauf. App-SHA 4a8ca5a1 und Rules 6a110898 unverändert, 3.18.30 samt fremdem Entwurf behalten. Bericht/Grenzen erweitert, keine App-Version committet, kein neuer Paketbau/Deploy. Nachtauftrag weiter bis 09:00.

- 04:06 Codex A16-Prüfergegenprobe: Übergabe 04:04, Entwurf und einzelner Sicherungsbaum 12532/16564 erhalten. Konkrete Lücke nachgewiesen: unbekannter --fall liefert ohne Fallausführung Exit 0/0 grün. Vorbefundlog und feste Quelle 7828140 samt Werkzeug-Dateihash festgehalten. Nur Fallkatalog/Eingangs-/Eindeutigkeits-/Vollständigkeits-/Erfolgszahlprüfung im bestehenden A16-Prüfer ergänzt; unbekannte und leere Auswahl mit erwarteter genauer Exit-1-Ablehnung geprüft. Positive Auswahl Speicherfehler-keine-Bewertung einmal grün, alle 19 Definitionen kataloggebunden; komplette Logs gelesen. Keine fachliche Assertion, Zeitgrenze oder Produktdatei geändert, kein ganzer 19er-Lauf behauptet. Daten-Skill-Prüfebene wie zuvor echter SDK, Auth-Attrappe, Worker blockiert. Bericht erweitert, Syntax/Diff grün; App-SHA 4a8ca5a1, Regeln 6a110898, 3.18.30 weiter uncommittet. Große Abnahme/Veröffentlichung später, Nacht-Fortsetzung weiter aktiv bis 09:00.

- 03:09 Codex A17-Datenränder: Übergabe 03:07 und einzelner Sicherungsbaum 12532/16564 bestätigt. Daten-/Oberflächenwege im bestehenden Formular nachgelesen; zwei fehlende SDK-Einzelproben ergänzt: Notiz nach fremder Löschung (Server 404, Hinweis und Eingabe erhalten) und Offline-Notiz nach fremder Bewertung (SDK-Cache mit ausstehenden Writes vor Fremdbewertung bestätigt, Servernotiz und fremde Bewertungsfelder erhalten). Beide grün, andere Karte/JS-Fehler geprüft, vollständige Logs gelesen. Erster Löschlauf rot wegen mehrdeutigem .dlg-Testselektor, nur Selektor konkretisiert; sämtliche fachlichen Erwartungen erhalten. Unbekannte --fall-Eingabe liefert geprüft Exit 1 statt leeren grünen Lauf. Bericht/Grenzen erweitert: fünf vorherige plus zwei neue Einzelbelege, kein ganzer 7er-/Paketlauf, kein Neustart/Auth-/Tageszähler-Nachweis daraus. App-SHA 4a8ca5a1/Regeln 6a110898 unverändert, 3.18.30 weiter Entwurf; kein neuer Paketbau/Commit/Deploy. Nacht-Fortsetzung aktiv bis 09:00.

- 02:21 Codex Anschlussvorbereitung: Entscheidungen in GESAMTLISTE § 2/RUNDE-2 Frage 22 und tatsächliche Start-/End-/Undo-/Blattwege erneut abgeglichen. Konkrete Abnahmematrix für Bearbeiten in der Abfrage und taggleiche Fortsetzung ergänzt, getrennte Browser-/SDK-Nachweise und noch unentschiedenen Modus-/Undo-Umfang festgehalten. Veraltete Laufmeldung in Vorbereitung auf fünf grüne betroffene Browserprüfungen korrigiert. Kein neuer H-Bau, keine Lernwirkungsbehauptung, keine künstlichen Testwiederholungen. Ein rg-Aufruf mit Windows-Dateiglobbing abgewiesen; tatsächliche Datei über Inventar gefunden, keine Prüfung daraus behauptet. Protokoll-Patch wegen unvollständiger Kontextzeile zunächst abgewiesen, danach am eindeutigen Tageskopf eingefügt. Sicherung 02:19 enthält A17-Abschluss, Übergabe erhalten; einzelner Sicherungsbaum 12532/16564 bestätigt. App weiter 3.18.30 uncommittet, Nacht-Heartbeat aktiv.
