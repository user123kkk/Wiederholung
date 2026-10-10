# Übergabe – Stand von 10.10.2026 10:10 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `0e75840 Sicherung 10:09 (automatisch, jede Minute)`
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
 M plan/ALLES-OFFEN.md
 M plan/ARBEITSPROTOKOLL.md
 M plan/werkzeuge/minuten_sicherung.sh
 A plan/werkzeuge/projekt_skills.mjs
 A plan/werkzeuge/pruefstand/diagnose_formular_konflikt.js
 M plan/werkzeuge/pruefstand/diagnose_karten_konflikt.js
 A plan/werkzeuge/pruefstand/diagnose_verlauf_neustart.js
 A plan/werkzeuge/pruefstand/karten_konflikte_sdk.js
 A plan/werkzeuge/pruefstand/t_tagesantworten_sdk.js
 M plan/werkzeuge/regeln/regeln-pruefung.mjs
 M plan/zyklus-2/mehrwert/ARBEITSSTAND.md
 M plan/zyklus-2/mehrwert/QUELLENABGLEICH-2026-10-10.md
 M sw.js
```

Auf einem sauberen Stand desselben Commits wiederherstellen:
`git apply --check plan/sicherung/entwurf-aktuell.patch`, dann `git apply plan/sicherung/entwurf-aktuell.patch`.

## Was gerade läuft

- Prozesse: node.exe 6, chrome.exe 0 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

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

- 02:18 Codex gezielter A17-Abschluss: fünf SDK-Fälle am App-SHA 4a8ca5a1 sowie t_karten_blatt, t_karten_snapshot, t_sprung (vier Breiten, kein Sprung), t_kontrast (0 Funde) und t_a11y-Grundchecks grün; sämtliche vollständigen Logs gelesen. Syntax/Stand/Diff und eigener App-Diff gegen festen Ausgang geprüft. A17 in Arbeit wegen großer Paketabnahme; 3.18.30-Entwurf samt A14–A16 behalten. Fester Verlustbeleg 97cbdcc und rote/ausgeschlossene Fixture-/Dateipfadlogs erhalten, Grenzen unverändert. Keine Tests mehr laufend, keine App-Version committet, kein neuer Paketbau/Deploy. Fortsetzung nach aktueller Anschlussvorbereitung: risikobezogene Datenprüfung oder konkrete Abnahmeplanung, keine künstlichen Testwiederholungen. Nacht-Heartbeat weiter aktiv bis 09:00, Minuten-Sicherung einzeln.

- 02:16 Codex A17-Nachlauf: t_karten_blatt vollständig grün gelesen (390 dunkel/hell, 360, 820), t_karten_snapshot sechs Zustände und t_sprung vier Breiten grün. Früher falscher t_snapshot-Dateiname war MODULE_NOT_FOUND, keine Messung; tatsächliche Datei per rg-Inventar verwendet, Vorbereitung korrigiert. Kontrast/a11y laufen noch einzeln. Standprüfung 3.18.30/CSP/APP_SHELL und eigener App-Diff gegen 97cbdcc grün gelesen. Neue Diagnose per intent-to-add in Minuten-Patch aufgenommen; Patch enthält stufeGeaendert/Versandbarriere/Diagnose, Übergabe 02:15, Commit enthält weiterhin App 3.18.29. Neue LEHREN-Regel für unberührte Formularfelder plus Gegenproben-Grenzen nachgezogen. Keine weitere Sicherungsschleife, keine Veröffentlichung.

- 02:13 Codex A17/DATEN-12: vorhandenes Kartenformular mit echtem SDK geprüft. Manuelle Stufe und Textkorrektur/Rückfallreset bereits erlaubt; reines Notizspeichern nach fremdem Snapshot ersetzt dagegen bestätigte Stufe 2 durch 0. Fester Entwurf 97cbdcc samt Patch reproduziert exakt denselben Serververlust. Neue offene A17-Zeile/Befund im bestehenden Datenpaket aufgenommen, dann flüchtiges Kennzeichen für bewusst geänderte Stufenwahl gebaut. Fünf SDK-Fälle am neuen App-SHA 4a8ca5a1 grün, einschließlich bewusster Auswahl über Snapshot und Escape ohne eigenen Entwurf; vollständige Logs gelesen. Regeln unverändert, 3.18.30 bleibt Entwurf. Betroffene Browserprüfungen laufen einzeln; kein Gesamtpaket/Deploy. Bericht FORMULAR-KONFLIKT-2026-10-10.md. Daten-/Oberflächen-Skill angewandt.

- 02:08 Codex Nachtprüfung A16: zwei neue Einzelfälle am unveränderten App-/Regelhash grün (Kartenkopie aktiviert passende Reservierung genau einmal; falsche Epoche bleibt ungebookt). Absichtlich deaktivierter Wiederherstellungszweig in separater TEMP-App zeigt exakt 0 statt 1, Gegenprobe greift. Frühe rote Fixture-Läufe erhalten: fehlender SDK-Cache-Abschluss bzw. noch möglicher Tagesversand beim Snapshot; Cache-Kennung/ausstehende Writes ausdrücklich geprüft und Tagesversand nur im Fixture gesperrt. Keine Assertion gelockert. Vollständige finale Logs gelesen, Syntax/Diff grün. Bericht erweitert: 17 ursprüngliche Fälle plus zwei neue Einzelfälle, kein vollständiger 19er-Lauf behauptet. Anschlussvorbereitung konkretisiert und falschen Funktionsnamen addOrSaveCard sichtbar zu submitCardForm korrigiert. Produktdateien unverändert; nächste tatsächliche Lücke: Formularpatch vs neue Bewertungsregel mit echtem SDK prüfen.

- 02:04 Codex gezielte A16-Lücke: positiven Wiederherstellungszweig vorbereitet mit vorhandener echter Kartenkopie und noch vorbereiteter Tageskopie. Bestehende 17 Fälle und Grenzen unverändert. Neue Einzelprobe stellt kontrollierten früheren lokalen Speicherstand nach, keinen echten Prozesskill; SDK/Repo-Regeln, ursprünglicher Beitrag und andere Karte werden geprüft. App unverändert.
