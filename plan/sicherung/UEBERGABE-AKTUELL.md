# Übergabe – Stand von 09.10.2026 21:33 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `d2731fc Sicherung 21:33 (automatisch, jede Minute)`
- Version in `app.js` (Arbeitsordner): const APP_VERSION = "3.18.30"
- Version im letzten Commit: const APP_VERSION = "3.18.29"

## Uncommittete Dateien (stehen vollständig in `plan/sicherung/entwurf-aktuell.patch`)

```
 M CHANGELOG.md
 M app.js
 M datenschutzerklaerung.html
 M firestore.rules
 M index.html
 M plan/werkzeuge/pruefstand/diagnose_karten_konflikt.js
 A plan/werkzeuge/pruefstand/karten_konflikte_sdk.js
 M plan/werkzeuge/regeln/regeln-pruefung.mjs
 M sw.js
```

Auf einem sauberen Stand desselben Commits wiederherstellen:
`git apply --check plan/sicherung/entwurf-aktuell.patch`, dann `git apply plan/sicherung/entwurf-aktuell.patch`.

## Was gerade läuft

- Prozesse: node.exe 9, chrome.exe 19 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

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

## 09.10.2026

- 21:09 Codex: finaler SDK-Lauf am unveränderten App-Stand 7d0de10b... komplett grün: 14 Fälle plus UI-/Download-/Entfernkontrollen; andere Karte k6 jeweils unverändert. Retry prüft nun zusätzlich tatsächlichen Cloud-Tageszähler w:1 und unveränderte Cloud-Zählung nach wiederholtem Prüfen/Flush. Rundenabnahme 13/13 grün an Quelle 00aeb59220794b38..., sämtliche 13 Einzel-Logs gelesen, einschließlich aller beschreibenden Rundenende-/Üben-/Schreiben-Ausgaben. Keine Sprünge, Scroll-/Kontrastfehler; CPU-4x-Zeichenprobe mit höchstens einem 35-ms-Bild. Gesamtlauf 157 Tests läuft am selben Stand mit den frischen gleichstandsgebundenen Runden-Ergebnissen. Regel-Nachlauf traf alte Daten des wiederverwendeten Testprojekts; Testaufbau leert jetzt ausschließlich wiederholung-test auf lokalem Emulator. M06-M11 haben gültige Ausgangskennungen, damit Wertfehler nicht durch fehlende Kennung verdeckt werden. Frischer Regeltest erneut 222/222; gesamte Ausgabe gelesen, identische Warnungen gefaltet. Direkt ausgelieferte App-/HTML-/SW-/Datenschutz-Quellen identisch zum Arbeitsbaum. Eigene Logdateien und Konfliktbild ins Repo gesichert. Kein App-Commit/Deploy.

- 20:56 Codex Gegenprüfung: normale Bestätigung zeichnet nicht zusätzlich neu. Automatisches Retry markiert die Antwort vor dem Schreiben wieder dauerhaft als unterwegs; Entfernen blockiert offene/ungeprüfte/laufende Antworten auch nach Dialog-Wartezeit. Beschädigte JSON-Kopie wird einzeln erhalten und exportiert, statt das Laden weiterer gültiger Antworten abzubrechen. Zwei neue echte SDK-Kontrollen grün: Offline-Neustart verhindert Entfernen ungeprüfter Antwort, spätere Bestätigung/Prüfung räumt sie auf; beschädigte Kopie bleibt zusammen mit weiterer gültiger Antwort downloadbar. Erste neue Neustart-Erwartung las Server vor Ende des expliziten Retry; WaitForPendingWrites nach dem Prüfen ergänzt, keine Assertion gelockert. Neuer Endstand app.js normalisiert SHA256 7d0de10b37278842d43c9c5ca385b3309a9752487251f6f0c9694030fc659dd3. Zwei frühe Gesamtläufe wegen dieser Gegenprüfungsänderungen bewahrt und beendet. Frische Rundenabnahme Quelle 00aeb59220794b38a läuft; danach Gesamtlauf mit ausschließlich gleichstandsgebundenen Runden-Ergebnissen. Konflikthinweis visuell auf laufender Runde angesehen, kein Scrollen/abgeschnittener Antwortknopf bei 414x896. Vier weitere Breiten, zwei Themen, reduziertes Bewegen, vollständiger Download sowie Abbrechen/Bestätigen lokaler Entfernung grün.

- 20:42 Codex: A14/A15 als Entwurf 3.18.30 gebaut: eindeutige Aktions-/Ausgangskennung, atomare Firestore-Regel, beide Undo-Wege prüfen die eigene Aktion; einzelne dauerhafte Antwortkopien pro Konto/Aktion mit Prüfen/Download/ausdrücklichem Entfernen. Speicherfehler bucht keine neue Antwort, erfolgreiche Kontolöschung entfernt lokale Antwortkopien. Datenschutz und Übergang alter Clients dokumentiert. Echter SDK: 12 Schutzfälle grün, einschließlich Neustart, zwei Offline-Geräte, gleiche Werte, Löschung und echte Regelablehnung ohne doppelte Zählung. 222/222 Regeltests grün, bestehender Undo-Zähler-Test und Kontowechsel 3/3 grün. Erstes pauschales Storage-Fehler-Fixture störte den SDK; korrigiertes Fixture betrifft ausschließlich Antwortschlüssel, alle Erwartungen erhalten. Netzteil seit 20:40 erkannt (BatteryStatus 2). Standprüfung grün; frischer Gesamtlauf 157 Tests an Quelle 526cb2e58f6b890b gestartet. Noch kein App-Commit oder Deploy. SDK-Probe separat, da sie den eigenen Demo-Emulator benötigt. Logs in sicherung/tests/karten-fix-2026-10-09.

- 20:24 Codex: Betreiber fragt nach Einordnung und fordert „mach“, danach ununterbrochen weiterarbeiten mit kurzen Antworten. Beide Wortlaute in ALLES-OFFEN gespeichert. Wechsel von Diagnose zu technischem Fix A14/A15: serverseitige Bindung an eindeutige letzte Kartenaktion, Offline-Schreiben bleibt möglich, Konflikte nicht zusammenrechnen. Ablehnungen müssen bis Bestätigung/ausdrücklicher Auflösung auf dem Gerät erhalten bleiben. Regel-/Import-/Undo-/Konto-Pfade gelesen. Akku 13 %, kein Gesamtlauf/Commit einer App-Version ohne Abnahme.

- 20:14 Codex Abschluss: Diagnose-Erweiterung als 373c4da auf main gepusht; Belege/Plan durch Minuten-Sicherung ebenfalls auf origin/main. Arbeitsbaum sauber und HEAD=origin/main bestätigt. App-/Regeldateien unverändert. 43 lokale Chats extern gesichert; nur eigene Emulator-/HTTP-Prozesse beendet, Minuten-Sicherung läuft weiter. Akku 15 %. Nächster Prüfpunkt bleibt Neustart abgelehnter Aktionen/Tageszähler.

- 20:13 Codex: Restdiagnose an fester Quelle 7142b93 abgeschlossen, echter Firestore-SDK/Repo-Regeln im eigenen Demo-Emulator 8082. Gesehen-Undo und Offline-Gesehen überschreiben fremdes Sicher; beide ohne Speicherfehler. Fremde Löschung gewinnt bei Offline-Bewertung und Offline-Gesehen auch nach explizitem Nachholen, lokale Karte verschwindet, Ablehnung sichtbar im Fehlerzustand. Andere Karte und JavaScript-Fehler in allen vier Fällen kontrolliert. Vollständiges Log gelesen; Schutzprüfung Exit 1 benennt beide Konflikte. Originaldiagnose nach Erweiterung ebenso erwartungsgemäß rot, vollständiges Log gelesen. Kein App-Fix, keine neue Lernregel; Befunde A14/A15 erweitert statt doppelt gezählt. Stand/Plan/Logbuch nachgezogen; Uhrzeit für diesen Protokolleintrag an Rechneruhr berichtigt.

- 20:13 Codex, Einleseschritt nachgetragen zu Auftrag „weiter“: Übergabe, Betreiberregeln, Lehren, Nachprüfungsauftrag und Kartenkonflikt-Belege gelesen; Minuten-Sicherung gestartet. Vier persistCardGrade-Aufrufer inventarisiert: Bewertung, Bewertungs-Undo, Gesehen, Gesehen-Undo. Gesehen-Undo prüft fremde Bewertung nicht. Akku 17 %, nur gezielte Prüfungen. Danach echter SDK gegen eigenen Demo-Emulator, Gesehen-Konflikt und fremde Löschung mit Offline-Nachholen.

- 19:56 Fortsetzung „weiter?“: zwei Kartenkonflikte mit echtem SDK/Repo-Regeln auf eigenem Demo-Emulator 8082 bestätigt, dann an fester Quelle 7142b93 wiederholt. Altes Undo und Offline-Nachholen verlieren neuere fremde Bewertung ohne Fehlermeldung; andere Karte unverändert. Schutzprüfung Exit 1 für beide, vollständiges Log gelesen. A14/DATEN-9 und A15/DATEN-10 in Aufgaben/Befunde/ALLES aufgenommen, konkreter Lösungs-/Abnahmeentwurf gesichert. Firebase-Primärquellen belegen letzte Schreibübertragung und Offline-Grenze von Transaktionen. Kein App-Fix oder Gesamturteil; Akku 22 %, nur Einzelprüfung. Nächste Inventur: übrige Aufrufer und gelöschte Karte.

- Codex Folgearbeit nach 1472584 (Vorbeugung auf main gepusht): Kontoschreibpfad einschließlich Karte-Referenz, Nachholqueue und Auth-Rücksetzung gelesen. t_konto_schreibantwort aktuell 3/3 Fälle grün; feste Gegenprobe c3a6aec erkennt den alten Fehler 3/3. Logs gelesen, Quelle und Testbedingungen in ZUVERLAESSIGKEIT-NACHPRUEFUNG ergänzt. Grenze Browser/Firestore-Attrappe genannt. Nächster tatsächlicher Prüfpunkt: zwei Geräte/dieselbe Karte/offline/altes Undo; absolut geschriebene Bewertungsfelder sind kein Konfliktfreiheitsnachweis. Noch kein unbewiesener neuer Produktfehler oder neue Lernregel daraus abgeleitet.

- Codex Vorbeugung geprüft: 14 Eingangsfälle und neun Ergebnis-/Codeauditfälle grün. Absichtlich falsches echtes Rechenkommando in eigener Testkopie endet Exit 1 mit „Ungleichmäßige Terminphasen innerhalb Stufe 3“, keine Ergebnisdatei. Modellversion 3 nach Pflicht-Vorprüfungen neu gerechnet; Zahlen identisch mit Version 2, diese separat erhalten. Regeln dauerhaft in AGENTS/LEHREN/EMPFEHLUNGEN. Weiteren Betreiberauftrag wörtlich gesichert; fünf Durchgänge für unbekannte Codefehler/Nachprüfung konkret vorbereitet, sieben bisher ungeprüfte Befundabschnitte erfasst. Erste Originalstelle persistCardGrade gelesen (Kontoreferenz/späte Antwort/Nachholen); keine neue umfassende Abnahme behauptet. App unverändert, kein Gesamtlauf/Deploy.

- Codex Auftrag „stelle sicher dass solche Fehler nicht wieder passieren“ wörtlich in ALLES-OFFEN gespeichert. Vorbeugung gebaut: unabhängige Eingangs-Sperre vor Tagesdeckel-Lauf, Tests mit ursprünglicher Index-Kopplung und weiteren absichtlichen Fehlern, Modellversion/Hash der Eingangsprüfung und ausdrückliche Erkenntnisgrenzen im Ergebnis. Allgemeine Regeln vor Empfehlungen in EMPFEHLUNGEN-PRUEFEN und AGENTS; Textempfehlungen bleiben menschlich/agentisch gegenzuprüfen, kein automatisches Wahrheitsversprechen. Einzeltests und neue Ergebnis-Provenienz noch zu prüfen.

- Codex Audit abgeschlossen: alte Gegenprobe c78e986 rot, korrigierte 450 Modellläufe, neun Auditfälle einschließlich aller Ergebnis-Hashes/Einzelwerte grün. Browser t_runde_bereiche grün, vollständige Ausgaben gelesen (Rückgängig, Weiterlernen, persistierte Zuordnung, w=9 bei acht Karten). Standprüfung grün. Im korrigierten großen Modell bleiben bei Deckel 20 im Mittel 165,8 ursprüngliche Karten unbesucht; kein Lernwirkungsbeweis. Eigene Rundengröße-Tagesziel-Kopplung zurückgenommen; dauerhaften neuen Deckel vorerst nicht bauen, klar begrenzten Rückkehr-Probelauf mit Pensum/Zusatznutzen/Lernkriterium vorbereiten. Alle aktuellen Planzeiger korrigiert, Originalzahlen erhalten, Fehlerart in LEHREN aufgenommen. Keine App-/Versions-/Cloud-Änderung, kein Gesamtlauf oder Deploy.

- Codex Audit auf ausdrücklichen Auftrag: Modell, Empfehlung, Originalcode und Betreiberentscheidungen kritisch gelesen. Fehler: i bestimmt zugleich Stufe und Terminphase; bei Stufe 3 sind alle ursprünglichen Termine auf derselben Phase statt gleichmäßig. Empfehlung „Tagesziel entlastet“ wurde nicht modelliert, Ziel an Rundengröße koppeln ist unbegründet, globale Mischung würde früherem Betreiberauftrag widersprechen. Historische Ergebnisse bleiben erhalten, korrigierter Lauf bekommt eigene Datei. Primärquellen Anki-Handbuch und Fachartikel geprüft; Quelle für konkrete optimale App-Zahl fehlt. Akku 34 %, nur Einzelprüfungen/Analyse, kein Gesamtlauf.

- Codex Abschluss Tagesdeckel: Werkzeug/Aufgaben/Logbuch als c78e986 auf main gepusht; Bericht und JSON durch Minuten-Sicherung bereits auf main. Arbeitsbaum sauber, origin/main gleich. Tagesdeckel-Rechnung und Empfehlung fertig, Bau wartet auf die ausdrücklich offenen Ziel-/Auswahl-/Zählentscheidungen; Veröffentlichung weiterhin gesammelt später. Kein App-Versionswechsel, .29 lokal und .28 laut letztem Online-Beleg.

- Codex Rechnung fertig: 90 Vergleiche, je fünf feste Folgen/180 Tage. 1100 Karten/60 Tage Pause, 85/10/5: Deckel 20 lässt nach 180 Tagen im Mittel 175,6 ursprüngliche Karten unbesucht; Deckel 30 letzter Erstbesuch Tag 158–177. Älteste zuerst/30 erreicht Tag 35, verursacht aber mehr gesamte Wartezeit (60263,2 statt 41143,2 Kartentage). Keine Aussage über echtes Behalten. Empfehlung und offene Bauentscheidungen im Rechnungsbericht, alle aktuellen Planzeiger nachgezogen; App unverändert. Selbstprüfung und Kern 12/12 grün. Nur neue Reihenfolge-Varianten zusätzlich gerechnet, erfolgreiche Tagesmengen nicht wiederholt.

- Codex Tagesdeckel-Rechnung: sechs synthetische Szenarien, vier Tagesmengen, drei Antwortmuster, je fünf Folgen über 180 Tage. Nur Analysewerkzeug; App unverändert. Originaler Lernlogik-Schnelltest 12/12 grün. Zwei eigene langsame Rechenstarts ohne Ergebnis beendet und Laufzeit verbessert (Kern einmal kompilieren, keine Funktionserzeugung je Kartenbewertung); keine Ergebnisse aus abgebrochenen Läufen übernommen. Modellgrenzen und falsche Annahme „w = verschiedene Karten“ im neuen Rechnungsbericht dokumentiert. Abschließender Lauf läuft.

- Codex Fortsetzung: Betreiber möchte weiterarbeiten und „ladegerät“ für das größere gemeinsame Stück aufheben. Auftrag wörtlich in ALLES-OFFEN gespeichert. Tagesdeckel: tatsächliche Auswahl, Bewertungsregel, Wiederholungsqueue und Tageszähler gelesen. Wichtig: verlauf.w zählt Antworten, nicht verschiedene Karten; eine neue Karte kann beim zweiten Sicher bereits w erhöhen. Simulation nutzt den vorhandenen Lernlogik-Block und die tatsächliche Dringlichkeitssortierung, ohne Produktänderung und ohne erfundene Gedächtnisleistung.

- Codex Abschluss: 3.18.29 als 2bdf83c auf main committet und gepusht. Fünf betroffene Testläufe grün (E4, Rechtsplan-Umfeld, Anmeldung-Enter, Einstellungen, Dialog-Timer); vollständige Logs gelesen und gesichert. Klein-Weg, kein Gesamtlauf, nicht veröffentlicht. Online bleibt laut letztem Veröffentlichungsbeleg 3.18.28. G7 am echten iPhone nach Veröffentlichung offen; nächste Arbeit Tagesdeckel-Rechnung. Details im Zyklus-Logbuch, Eintrag 3.18.29. Ein Plan-Schreibbefehl wurde wegen PowerShell-Quotierung vor Ausführung abgelehnt und korrigiert, ohne Dateiänderung aus dem Fehlversuch.

- 15:50 Codex: E4 am festen d64380a rot (echter Zurück-Link, Formular fehlt). Neuer Weg: bestehender Dialog, unveränderte Rechtsseiten lokal laden, Rückweg bleibt sichtbar. E4 390/320/820 grün; Umfeld sechs Geräte-/Farbkombinationen grün, Fehler/Neuversuch und verspätete Antwort geprüft. iPad-Kontrastmeldung als Scroll-Clip belegt und alle sichtbaren Abschnitte durchgescrollt geprüft. 3.18.29 vorbereitet; Standprüfung grün. Betroffene Regressionen laufen; Akku BatteryStatus 1, Klein-Weg, kein Gesamtlauf/Deploy.

- Codex, Auftrag „weiter“: Desktop-Checkout sauber auf d64380a / 3.18.28 aktualisiert. Übergabe, Betreiber-Verstehen, offene Liste, Grundregeln und E4-Befund gelesen. Minuten-Sicherung gestartet (Git Bash). E4 wieder offen: tatsächlichen Zurück-Weg prüfen, vorhandenen Dialog für Rechtsinhalt verwenden. Nicht veröffentlichen.

- 04:38 **3.18.28 ist online.** `ladegeraet.ps1 -Fortsetzen`: 155 bewahrt,
  `t_serie_lang` Exit 0, zusammen 156/156; Affen Handy 200 und iPad 150 je
  0 Befunde; Regeln eingespielt; Hosting veröffentlicht. Abgerufen:
