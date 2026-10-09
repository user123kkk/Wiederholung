# Übergabe – Stand von 09.10.2026 23:39 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `f8cafcb Sicherung 23:37 (automatisch, jede Minute)`
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

- Prozesse: node.exe 12, chrome.exe 10 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

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

- Codex: Betreiber fragt nach Text für den nächsten Chat. Aktuelle automatische Übergabe erneut gelesen; Fortsetzungstext mit erhaltenem A14–A16-Entwurf, gezielten Belegen, Sicherungsprüfung und weiterhin verschobener großer Abnahme bereitgestellt. Keine App-Änderung.

- 22:58 Codex Sicherungsabschluss: automatische Commits 22:55/22:56 und frische Übergabe 22:56 bestätigt; Minuten-Patch 22:57:45 enthält endgültige Testhooks, strenge Geometriegrenzen und gebündelten Kopieraufruf. App bleibt im Commit 3.18.29, Arbeitsbaum 3.18.30; kein App-Commit/Deploy. Prüfserver/Emulator-/Sicherungs-PIDs und Wiederholungswege im A16-Bericht für Anschlusschat festgehalten. Große Abnahme bleibt offen; kein neues Paket begonnen.

- 22:57 Codex gezielter Abschluss A16: 17/17 SDK-Fälle am unveränderten App-SHA 05269ebdb1d17a5a23e1ef8eeb048cc3745e866dbd8c4e94052e9789f1ccd0c8, 16/16 A14/A15-Nachlauf und feste Verlust-Gegenprobe grün; Regeln 238/238. Alle vollständigen finalen SDK-/Bestandsausgaben gelesen; Regelwarnungen vollständig mit identischen Meldungen gefaltet. Zusatzmessung Tageshinweis zunächst mit noch nicht gezeichnetem Fixture bzw. direkt nach Resize alten svh-Einheiten; explizites Fixture-Neuzeichnen und 250 ms Resize-Beruhigung ergänzt, Grenzen gleich. Vier Breiten/zwei Themen jetzt horizontal und vertikal innerhalb Bildschirm, Kontrast ohne Fund; finales Bild erneut angesehen. Undo/Kontowechsel/Sprung/Kontrast/a11y-Grundchecks, Syntax/Stand/Diff grün. Dokumente/Status A14–A16 bleiben „in Arbeit“, weil große Abnahme/Paketabschluss später; Anschlussarbeit nur vorbereitet. Keine Veröffentlichung, kein App-Commit, keine Text-Lernregel geändert. Eine Minuten-Sicherung läuft mit gebündelten Log-Kopien; Übergabe 22:55, Patch 22:54 zuletzt geprüft, Abschluss wird vom nächsten Durchgang erfasst.

- 22:52 Codex Prüfumgebung: gezielter Endstandlauf und Offline-Einzelprobe treffen SDK-Stapel-Zeitlimit 30 s. Tatsächliches Emulator-Rootlog (fast 800 MB) zeigt massenhaft „too many pending messagings in the back channel (10001)“, Kanalabbruch und NETWORK_ERROR; Ausschnitt in sicherung/tests/a16-emulator-netzfehler-ausschnitt.log gesichert, Ursprung nicht gelöscht. Nur lokalen Demo-Emulator 7936/10004 für demo-adrabic-karten-audit/8082 beendet und dieselbe Emulator-Version 1.22.0 mit INFO statt FINE neu gestartet; identische endgültige Repo-Regeln, keine Produktivdaten. Rote Läufe erhalten, keine Testgrenze gelockert. Frischer Nachlauf erforderlich; frühe grüne Fälle bleiben Einzelbelege, keine pauschale Gesamtaussage.

- 22:47 Codex: alle vier ergänzten A16-Randfälle grün, einschließlich tatsächlicher Cloud-Beleglöschung. Unveränderter App-SHA 05269ebd; frischer vollständiger gezielter Lauf mit 17 SDK-Fällen (einschließlich Tageshinweis/Download/Entfernen), danach 16 A14/A15-Regressionsfälle und feste Gegenprobe gestartet. Vier Breiten im erneuten Sprungtest ohne Sprung. Minuten-Sicherung lief nachweislich, aber Log-Kopie mit einem cp-Prozess je Datei verzögerte Durchgänge mehrere Minuten. Nur Kopieraufruf auf find/-exec cp mit mehreren Dateien gebündelt, gleiche Filter/Ziele; bash -n grün. Alten einzelnen Sicherungsbaum außerhalb Git-Schreibschritt beendet, genau eine Schleife verborgen neu gestartet. Keine Sicherungsdateien gelöscht und kein neuer Paketbau.

- 22:40 Codex: doppelte Minuten-Sicherung anhand vollständiger Prozessbäume erkannt; nur zweiten Baum 19952/17292 beendet, erster 13152/8128 läuft weiter. Zwölf A16-Kernfälle am finalen App-SHA 05269ebd erneut grün. Neue Vor-Versand-Probe war zuerst unpassend: reguläres Page.close löst visibilitychange/Flush aus und testet bereits die SDK-Übergabe. Fixture stellt jetzt ausdrücklich harte Beendigung ohne Timer/Flush nach; Assertions erhalten, vier Randfälle laufen separat. Kein Produktfehler aus dieser Fixture-Verwechslung behauptet. Sprungtest vier Breiten, Kontrast und a11y-Grundchecks grün. Nächste entschiedene Lernrunden-Punkte am tatsächlichen Code gelesen; Vorbereitung in mehrwert/VORBEREITUNG-LERNRUNDE-2026-10-09.md, kein neuer Paketbau.

- 22:36 Codex Gegenprüfung A16: erster vollständiger A16-SDK-Lauf 12/12, feste Verlust-Gegenprobe erkennt weiterhin den Fehler, Windows-Regelprüfung 238/238. Git-Bash-Regelstart verwendete einen ungültigen /c/-Pfad; dessen Lauf nicht als Nachweis übernommen. A14/A15-Regressionslauf 16 Fälle samt Oberfläche/Download/Entfernen grün am Zwischenstand. Bestandstest t_sprung findet neuen kurzzeitigen Hinweis bei regulären noch gebündelten Tagesbeiträgen (90–114 px); Banner auf tatsächlich ungeprüfte/abgelehnte/veraltete Beiträge begrenzt, geladene bereit-Kopie wird ungeprüft. Frische SDK-/Bestandsläufe am korrigierten Stand gestartet. Drei A16-Randfälle ergänzt: ungebuchte Reservierung, beschädigte Tageskopie, wirkliche Kontodaten-/Beleglöschung. Große Gesamtabnahme bleibt später, keine Veröffentlichung oder neues Paket.

- Codex A16 gebaut, erste gezielte SDK-Prüfung läuft: dauerhafte Einzelbeiträge mit atomarem unveränderlichem Cloud-Beleg; Nachholen prüft zuerst SDK-Abschluss, Beleg und Server-Epoche. Kartenversuche reservieren den Tagesbeitrag vor dem Buchen; Kartenkopie trägt ihn für einen Zwischenabsturz mit. Aufbewahrungs-Hinweis/Download erweitert, Datenschutz und Kontolöschung mitgezogen. Oberflächen-Skill wegen bestehendem Hinweis angewandt. Keine Text-Lernregel oder Paketwechsel; 3.18.30 bleibt Entwurf. Eigener Patch zunächst wegen rückwärts angeordneter Hunks abgewiesen, in Quellreihenfolge angewandt; keine Prüfgrenze geändert.

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
