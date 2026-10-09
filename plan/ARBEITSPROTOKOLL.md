# Arbeitsprotokoll – was gerade getan wird

Zwischenspeicher nach `LEHREN.md` § 1.9: spätestens nach jedem
Arbeitsschritt eine Zeile mit Uhrzeit (was gelesen, geprüft, geändert,
gemessen wurde), dann committen und pushen. Neueste Zeile oben. Ist der
Inhalt im Logbuch oder in `ALLES-OFFEN.md` angekommen, werden alte Zeilen
gelöscht; die letzte Zeile sagt dann, wohin sie gewandert sind.

## 09.10.2026

- Codex Fortsetzung A16: Übergabe, Betreiberregeln, Lehren, Zyklus-Auftrag/Entscheidungen und DATEN-11-Beleg gelesen. A14/A15-Entwurf 3.18.30 erhalten. Minuten-Sicherung läuft bereits (zwei vorhandene Bash-Prozesspaare); keine zusätzliche Schleife gestartet. Syntax und Standprüfung grün. Daten-Skill angewandt; Ursache am tatsächlichen Verlauf-/Auth-/Undo-Pfad gelesen: nur flüchtige abgelehnte Differenzen. Entwurf für dauerhafte Beiträge mit unveränderlichen Serverbelegen und ursprünglichem Konto/Tag/Epoche; kein Gesamtlauf/Deploy.

- 22:11 Codex: Skills-Auftrag abgeschlossen. Vollständige Git-Dateiliste mechanisch eingelesen (2171 Dateien/23,1 MB, keine Lesefehler), Hauptarchitektur, Arbeitsregeln und vorhandene Prüfwege inhaltlich abgeglichen; keine Behauptung, alle Logs semantisch auditiert zu haben. Offizielle Quellen zu Codex/Claude Skills, Firebase, Context7, Playwright, Superpowers, Anthropic, Serena, axe-core und Security verglichen. Drei kurze Projekt-Skills (Daten, Oberfläche, Lernbelege), gemeinsame Quelle .agents/skills und identische Claude-Spiegel eingerichtet; gezielte Auswahlregeln in AGENTS/CLAUDE. Projektprüfer fing falschen Gerätepfad ab, korrigiert; sechs offizielle YAML-Prüfungen, Pfad-/Spiegel-/Konfigurationsprüfung und Syntax/Diff grün. Beschreibungen insgesamt 635 Zeichen; keine gemessene Token-/Qualitätsersparnis oder Modell-Auswahlgarantie behauptet. Bericht plan/agenten/SKILLS-UND-PLUGINS.md enthält Empfehlungen, Gegenargumente und Grenzen. Keine externen Plugins installiert, keine App-Änderung oder Veröffentlichung. Neue Skill-/Werkzeugdateien per intent-to-add im Minuten-Patch; große App-Abnahme bleibt später, nächste App-Aufgabe A16.

- 21:39 Codex: weitere Speicher-Gegenprüfung korrigiert: vor dem Buchen abgebrochener Versuch wird aus Nachholmap entfernt, damit später keine ungezählte Bewertung entsteht. Prüfen erlaubt nach Erholung einen neuen Versuch; Hinweis ohne vorhandene Kopien zeigt nur Speicherprüfung. Fehlgeschlagene neue Gesehen-/Bewertungsversuche erhalten vorheriges Rückgängig. Feste Entwürfe 14517b3 (ungezählter Versuch bleibt) und 7818a54 (Undo verloren: 2 statt 1 bzw. Datum statt null) reproduzieren die Fehler; reparierter echter SDK-Lauf 16/16 plus UI/Download/Entfernen grün. Frühere lange Läufe wegen Quelländerungen bewahrt/beendet, keine Ergebnisse übernommen. Seit 21:26 frischer Gesamtlauf 157 an caf81d58f8c5f144; 25/157 bisher Exit 0. Danach Rundenabnahme, Affen, Abschlussdiff und Commit. Finaler normalisierter App-SHA256 44c05375c7511ba420fbabe5b52cea6599ecf7c1ea3e67e77b52428aa30347d9. Alle Gegenproben im Repo gesichert. Kein Deploy.

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
  `adrabic.web.app/sw.js` zeigt `adrabic-3.18.28`.
- 04:30 „ladegerät“ an 3.18.28 endete 04:19 mit 155/156, nichts
  veröffentlicht. Rot: `t_serie_lang` Fall 3 (47 statt 48), lief 04:01.
  Einzeln 04:20 wieder rot. Ursache gerechnet und belegt: Der Test
  verschiebt die Uhr der Seite um Vielfache von 24 h; über das Ende der
  Sommerzeit (25.10.) zeigt sie dann 03:xx statt 04:xx und liegt vor der
  4-Uhr-Grenze, die Seite lebt einen Lerntag zurück. Tritt nur zwischen
  04:00 und 05:00 auf. Kein App-Fehler. Test auf Kalendertage umgestellt
  (Erwartungen unverändert): 04:24 grün, 3/3 Fälle. `ladegeraet.ps1` hat
  jetzt `-Fortsetzen`; damit läuft der Stichwort-Ablauf am selben
  Quellstand weiter (155 bestandene bleiben, `t_serie_lang` neu, dann
  Affen, Regeln, Hosting). Gleiche Falle möglich in `t_gruss_datum` und
  `t_paket_c_kalendertage` (nutzen denselben Versatz aus `lib.js`); `lib.js`
  selbst erst nach dem Veröffentlichen berichtigen, weil es zum Quellstand
  gehört.
- 02:07 Betreiber: Safari, Version .26. Ursache am Code gefunden: „← Zurück“
  auf den Rechtsseiten ist ein Link auf `./index.html` und lädt im neuen
  Reiter die App neu. In `ALLES-OFFEN.md` nachgetragen. Der Test zu E4
  prüft diesen Weg nicht (LEHREN § 5.3: Test muss den echten Weg gehen).
- 02:02 Betreiber meldet: Plan im Einstieg ist weg nach Datenschutz/
  Impressum und zurück. In `ALLES-OFFEN.md` § 3.2 eingetragen, mit Abgleich
  (E4, G7, `app.js` 8966). Nichts gebaut: `ladegerät` läuft, und die
  Ursache ist am Gerät noch nicht belegt.
- 01:58 `zyklus-2/mehrwert/agentenberichte/ALLE-IDEEN.md` erzeugt: 338
  nummerierte Ideen wörtlich (Titel) aus 23 Berichten; 9 Berichte haben
  eine andere Form und sind noch ganz zu lesen, 2 sind leer. Der Abgleich
  mit dem Katalog (187 Zeilen) steht noch aus.
- 01:50 Betreiber: „ladegeraet“ (Stichwort, Freigabe für Regeln und
  Hosting). `ladegeraet.ps1` gestartet an 3.18.28, Netzteil, Baum sauber.
  Ausgabe: `%TEMP%/ladegeraet-3.18.28.log`. Achtung: Der Lauf überquert
  04:00 (Wechsel des Lerntags); rote Datumstests danach einzeln prüfen
  (LEHREN § 5.4). Er fragte auch „34? ich dachte über 60“: 34 sind
  Berichte (einer je Agent), darin stecken die Ideen (Katalog: 187 Zeilen,
  68 Fragen).

## 08.10.2026

- 19:15 3.18.28 auf `main` (9f2990a) und gepusht. Zweiter Lauf `t_paket_e`,
  `t_einstellungen`, `t_einst` grün. Logbuch, STAND, ALLES-OFFEN
  nachgezogen. Patch `verstaendlichkeit/woerter-3.18.28-entwurf.patch` ist
  damit überholt (bleibt als Beleg).
- 18:56 Tests am Entwurf 3.18.28 fertig: 33 von 34 grün, `abnahme_runde.js`
  13/13. Rot: `t_paket_e` E6 („Zeile behauptet keinen eingerichteten
  Termin“). Echter Fehler im Entwurf, nicht im Test: „19:30 Uhr, im
  Kalender“ behauptet einen Termin, den die App nicht kennt; „Vorlage für
  19:30 Uhr“ war in Paket E bewusst so gewählt. Mein Vorschlag in der
  Tabelle „Niedrig“ war nicht mit dem Repo abgeglichen (LEHREN § 1.7).
  Zurückgenommen in `app.js` und CHANGELOG; `t_paket_e` läuft neu.
- 17:58 Minuten-Sicherung sichert jetzt auch den laufenden Chat wörtlich
  (jede Minute, nach `Desktop\Wiederholung-Belege\chats\`, außerhalb des
  Repos, weil es öffentlich ist). Betreiber 17:57: „auch laufende
  Aufgaben, ihren Stand, ihre Wege?“ Neu gestartet, läuft.
- 17:55 Minuten-Sicherung erweitert und neu gestartet (Betreiber 17:52:
  „wirklich alles … selbst Tests … ich will ein klares: ist eingebaut“):
  sichert jetzt jede Minute auch alle Testausgaben (`plan/sicherung/tests/`,
  26 Läufe der letzten zwei Tage) und schreibt
  `plan/sicherung/UEBERGABE-AKTUELL.md`. Erster vollständiger Durchgang
  17:54 committet und gepusht (4fefe03). Patch enthält jetzt auch die
  geänderten Testdateien (geprüft). `AGENTS.md` und `CLAUDE.md` verweisen
  darauf.
- 17:50 Minuten-Sicherung läuft (`plan/werkzeuge/minuten_sicherung.sh`, im
  Hintergrund dieses Chats): jede Minute `plan/` und `CLAUDE.md` committen
  und pushen, uncommitteter App-Entwurf als
  `plan/sicherung/entwurf-aktuell.patch`. Erster Lauf 17:47 gesichert und
  gepusht (758e1c5). Bekannte Lücke: geänderte Testdateien unter
  `plan/werkzeuge` fehlen in diesem Patch (stehen im Patch unter
  `verstaendlichkeit/`); beim nächsten Neustart des Skripts beheben.
  Betreiber 17:49: „ich hab Zweifel, ob du wirklich Sachen alle 60 Sek.
  speicherst“ – deshalb Automatik statt Versprechen.
- 17:47 Regel § 1.9, `BETREIBER-VERSTEHEN.md`, dieses Protokoll und die
  Wünsche zur Arbeitsweise in `ALLES-OFFEN.md` § 3.2a eingetragen.
- 17:45 Alle 43 lokalen Chats wörtlich gesichert nach
  `Desktop\Wiederholung-Belege\chats\` (Werkzeug `chats_sichern.py`).
- 17:43 Agentenberichte der Mehrwert-Runden gefunden (lokale Chat-Dateien,
  Ordner `subagents`), 34 von 36 wörtlich nach
  `zyklus-2/mehrwert/agentenberichte/`; zwei Agenten hatten keinen Bericht
  (am Limit abgebrochen).
- 17:39 `ALLES-OFFEN.md` angelegt: 450 Betreiber-Nachrichten gelesen und
  gegen das Repo geprüft.
- 17:27 Tests am Entwurf 3.18.28 gestartet (34 Tests, danach
  `abnahme_runde.js`); Ergebnis: `%TEMP%\entwurf-3.18.28\_ergebnis.txt`.
  Entwurf liegt uncommittet im Hauptordner, Patch unter
  `zyklus-2/mehrwert/verstaendlichkeit/woerter-3.18.28-entwurf.patch`.
- 17:26 Voller Lauf an 3.18.27 ausgewertet: 153/156, drei Nachläufe grün,
  Affen 0 Befunde. Zehn Hilfsskripte auf `PRUEF_PORT` umgestellt.
- 14:52 Voller Lauf `ladegeraet.ps1 -NurPruefen` an 3.18.27 gestartet;
  währenddessen Bericht „Verständlichkeit“ geschrieben.

**Gerade offen:** nichts läuft. Als Nächstes: Katalog gegen die 34
Agentenberichte abgleichen, Tagesdeckel rechnen, Schritt (b) der
Verständlichkeit. Wartet auf den Betreiber: „ladegerät“.

- 21:44 Codex: Betreiber verschiebt große Gesamtabnahme auf später/Ende. Nur eigenen Runner 2352 samt Testkindern gestoppt, sämtliche Ergebnisse erhalten. A14/A15 bleiben gebaut und gezielt geprüft, Abschluss ausstehend. Tagesziel-Frage anhand aktueller E26/Audit-Korrektur eingeordnet; keine neue Tagesziel-Funktion bauen. Als Nächstes weitere offene Zuverlässigkeitsprüfung lesend vorbereiten, ohne neues Paket über uncommittetem Entwurf zu bauen. Ein Plan-Schreibbefehl wurde vor Ausführung wegen PowerShell-Quotierung abgewiesen und korrigiert.
- 21:48 Codex: weitere offene Zuverlässigkeitsprüfung statt großer Abnahme. DATEN-11/A16 mittel bestätigt: echte SDK-Tageszähler-Ablehnung, Karte bestätigt, Neustart verliert Differenz und Fehlermeldung. Arbeitsbaum und feste Quelle 591d03e samt App-Patch gleiches Fehlerbild; erweiterte Kontrollen ohne Ablehnung und ohne Neustart jeweils korrekt w:1, Verlustfall w:0. Schutzprobe absichtlich Exit 1, ganze Ausgaben gelesen und im Repo gesichert. Fixture erzwingt echte Regelablehnung, kein echter Ausweisablauf behauptet. Kein Reset im Fall. Neue offene Aufgabe mit Abnahme und Grenzen; noch nicht gebaut. Großer gestoppter Lauf hatte 29/157 abgeschlossene Tests, alle Exit 0; kein Gesamturteil.
- 21:50 Codex: Import-/Zusammenführungs-/FileReader-/Löschwege und bestehende R15-Restpfade gelesen. Aktuellen t_daten-Log aller drei Geräte vollständig gelesen: normale Bedienwege, Download/Einspielen/kaputtes JSON ohne gemeldeten Fehler; keine Behauptung vollständiger Felder-/Fehlerabdeckung. Kein unnötiger Test-Neulauf, keine App-Änderung. A16-Belege und nächste Abnahme in eigenem Bericht gesichert. Große Abnahme bleibt verschoben.
- 21:51 Betreiber: „sorry will ned anhalten, kannst weitermachen, ich will für mein bildliches blos verstehen ob momenta an offenen punkten, ideen,plänen gearbeitetwird wie die über 30 punkte über mehrwert und andere sachen, will nr wissen das genau das hier gemacht wird“. Keine Arbeitspause gewünscht. Gesamtes App-Projekt und dessen offene Liste bleiben Auftrag; aktuell Schutz/Zuverlässigkeit, nicht parallel alle Mehrwert-Funktionen. Große Abnahme und Veröffentlichung weiterhin später gesammelt. Veraltete Mehrwert-Übersichten an aktuellen belegten Stand angleichen; bestehende Ideen und Entscheidungen erhalten.
- 21:51 Codex: Mehrwert-Arbeitsstand und Überblick mit aktuellen Belegen ergänzt, alte Laufmeldungen ausdrücklich Verlauf. Gesamtliste: 15 Punkte aus 3.18.27 anhand CHANGELOG/Stand als fertig geführt, iPhone-Nachweis offen belassen; arabische Notiz aus 3.18.26 abgehakt. Aktuelle Zuverlässigkeitsarbeit und anschließende Mehrwert-Reihenfolge sichtbar. Keine neue Funktionsfreigabe oder App-Änderung daraus abgeleitet.

- 21:53 Betreiber: „also was weiter? passt das wenn ich ineinem neuen chat afange? sichrst du alles jede minute?“ Übergabe in denselben Desktop-Ordner vorbereiten. Nächste konkrete offene Aufgabe A16/DATEN-11: Tagesantwort nach echter Ablehnung und Neustart erhalten, genau einmal Nachholen, Konto/Tag/Epoche beachten. A14/A15-Entwurf nicht verwerfen; große Abnahme weiter später gesammelt. Danach entschiedene Mehrwert-Reihenfolge. Minuten-Sicherung läuft geprüft; App-/Teständerungen als Patch, Pläne/Belege und lokale Chats gesichert. Keine parallelen App-Änderungen durch zwei Chats.
- 21:57 Betreiber: „bevor ich das tuhe, lies den gesammten repo, und daraus schliesend gib mir die besten skills bzw plugins oder wie man alles nennt, einige sagen ja das gute modelle heute nicht wirklich skills brauchen aber es kann doch helfen. will nichts dass unnötig tokens verbraucht, aber jetzt nicht sachn auslassen die hilfreich ist. based on repo, wha is REALLY BENEFICAL welche sachen sind bekannt usw und so fort, würde dann gerne sowohl von claude und codex dass sie automatisch die passenden dings einsetzen. ich will dieser planung blind vertrauen, daher beste arbeit gebracht. diese nachricht ist nur ein wunsch von mir, nichts detailiertes, rbeit und denken liegt bei dir“. Neuer konkreter Arbeitsauftrag vor Chatwechsel: Repo-weiter Abgleich, Nutzen/Tokenkosten/Kompatibilität bestehender und verfügbarer Skills/Plugins, automatische passende Auswahl für Claude und Codex konkret vorbereiten. Bestehenden App-Entwurf erhalten; keine Veröffentlichung oder pauschale Plugin-Installation. Empfehlungen mit Primärquellen und tatsächlichen Repo-Bedürfnissen prüfen; Grenzen belegen.
