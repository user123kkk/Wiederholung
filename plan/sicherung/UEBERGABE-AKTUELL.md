# Übergabe – Stand von 10.10.2026 03:14 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `39fd75a Sicherung 03:13 (automatisch, jede Minute)`
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

- Prozesse: node.exe 3, chrome.exe 0 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

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

- 03:09 Codex A17-Datenränder: Übergabe 03:07 und einzelner Sicherungsbaum 12532/16564 bestätigt. Daten-/Oberflächenwege im bestehenden Formular nachgelesen; zwei fehlende SDK-Einzelproben ergänzt: Notiz nach fremder Löschung (Server 404, Hinweis und Eingabe erhalten) und Offline-Notiz nach fremder Bewertung (SDK-Cache mit ausstehenden Writes vor Fremdbewertung bestätigt, Servernotiz und fremde Bewertungsfelder erhalten). Beide grün, andere Karte/JS-Fehler geprüft, vollständige Logs gelesen. Erster Löschlauf rot wegen mehrdeutigem .dlg-Testselektor, nur Selektor konkretisiert; sämtliche fachlichen Erwartungen erhalten. Unbekannte --fall-Eingabe liefert geprüft Exit 1 statt leeren grünen Lauf. Bericht/Grenzen erweitert: fünf vorherige plus zwei neue Einzelbelege, kein ganzer 7er-/Paketlauf, kein Neustart/Auth-/Tageszähler-Nachweis daraus. App-SHA 4a8ca5a1/Regeln 6a110898 unverändert, 3.18.30 weiter Entwurf; kein neuer Paketbau/Commit/Deploy. Nacht-Fortsetzung aktiv bis 09:00.

- 02:21 Codex Anschlussvorbereitung: Entscheidungen in GESAMTLISTE § 2/RUNDE-2 Frage 22 und tatsächliche Start-/End-/Undo-/Blattwege erneut abgeglichen. Konkrete Abnahmematrix für Bearbeiten in der Abfrage und taggleiche Fortsetzung ergänzt, getrennte Browser-/SDK-Nachweise und noch unentschiedenen Modus-/Undo-Umfang festgehalten. Veraltete Laufmeldung in Vorbereitung auf fünf grüne betroffene Browserprüfungen korrigiert. Kein neuer H-Bau, keine Lernwirkungsbehauptung, keine künstlichen Testwiederholungen. Ein rg-Aufruf mit Windows-Dateiglobbing abgewiesen; tatsächliche Datei über Inventar gefunden, keine Prüfung daraus behauptet. Protokoll-Patch wegen unvollständiger Kontextzeile zunächst abgewiesen, danach am eindeutigen Tageskopf eingefügt. Sicherung 02:19 enthält A17-Abschluss, Übergabe erhalten; einzelner Sicherungsbaum 12532/16564 bestätigt. App weiter 3.18.30 uncommittet, Nacht-Heartbeat aktiv.

- 02:18 Codex gezielter A17-Abschluss: fünf SDK-Fälle am App-SHA 4a8ca5a1 sowie t_karten_blatt, t_karten_snapshot, t_sprung (vier Breiten, kein Sprung), t_kontrast (0 Funde) und t_a11y-Grundchecks grün; sämtliche vollständigen Logs gelesen. Syntax/Stand/Diff und eigener App-Diff gegen festen Ausgang geprüft. A17 in Arbeit wegen großer Paketabnahme; 3.18.30-Entwurf samt A14–A16 behalten. Fester Verlustbeleg 97cbdcc und rote/ausgeschlossene Fixture-/Dateipfadlogs erhalten, Grenzen unverändert. Keine Tests mehr laufend, keine App-Version committet, kein neuer Paketbau/Deploy. Fortsetzung nach aktueller Anschlussvorbereitung: risikobezogene Datenprüfung oder konkrete Abnahmeplanung, keine künstlichen Testwiederholungen. Nacht-Heartbeat weiter aktiv bis 09:00, Minuten-Sicherung einzeln.

- 02:16 Codex A17-Nachlauf: t_karten_blatt vollständig grün gelesen (390 dunkel/hell, 360, 820), t_karten_snapshot sechs Zustände und t_sprung vier Breiten grün. Früher falscher t_snapshot-Dateiname war MODULE_NOT_FOUND, keine Messung; tatsächliche Datei per rg-Inventar verwendet, Vorbereitung korrigiert. Kontrast/a11y laufen noch einzeln. Standprüfung 3.18.30/CSP/APP_SHELL und eigener App-Diff gegen 97cbdcc grün gelesen. Neue Diagnose per intent-to-add in Minuten-Patch aufgenommen; Patch enthält stufeGeaendert/Versandbarriere/Diagnose, Übergabe 02:15, Commit enthält weiterhin App 3.18.29. Neue LEHREN-Regel für unberührte Formularfelder plus Gegenproben-Grenzen nachgezogen. Keine weitere Sicherungsschleife, keine Veröffentlichung.

- 02:13 Codex A17/DATEN-12: vorhandenes Kartenformular mit echtem SDK geprüft. Manuelle Stufe und Textkorrektur/Rückfallreset bereits erlaubt; reines Notizspeichern nach fremdem Snapshot ersetzt dagegen bestätigte Stufe 2 durch 0. Fester Entwurf 97cbdcc samt Patch reproduziert exakt denselben Serververlust. Neue offene A17-Zeile/Befund im bestehenden Datenpaket aufgenommen, dann flüchtiges Kennzeichen für bewusst geänderte Stufenwahl gebaut. Fünf SDK-Fälle am neuen App-SHA 4a8ca5a1 grün, einschließlich bewusster Auswahl über Snapshot und Escape ohne eigenen Entwurf; vollständige Logs gelesen. Regeln unverändert, 3.18.30 bleibt Entwurf. Betroffene Browserprüfungen laufen einzeln; kein Gesamtpaket/Deploy. Bericht FORMULAR-KONFLIKT-2026-10-10.md. Daten-/Oberflächen-Skill angewandt.

- 02:08 Codex Nachtprüfung A16: zwei neue Einzelfälle am unveränderten App-/Regelhash grün (Kartenkopie aktiviert passende Reservierung genau einmal; falsche Epoche bleibt ungebookt). Absichtlich deaktivierter Wiederherstellungszweig in separater TEMP-App zeigt exakt 0 statt 1, Gegenprobe greift. Frühe rote Fixture-Läufe erhalten: fehlender SDK-Cache-Abschluss bzw. noch möglicher Tagesversand beim Snapshot; Cache-Kennung/ausstehende Writes ausdrücklich geprüft und Tagesversand nur im Fixture gesperrt. Keine Assertion gelockert. Vollständige finale Logs gelesen, Syntax/Diff grün. Bericht erweitert: 17 ursprüngliche Fälle plus zwei neue Einzelfälle, kein vollständiger 19er-Lauf behauptet. Anschlussvorbereitung konkretisiert und falschen Funktionsnamen addOrSaveCard sichtbar zu submitCardForm korrigiert. Produktdateien unverändert; nächste tatsächliche Lücke: Formularpatch vs neue Bewertungsregel mit echtem SDK prüfen.

- 02:04 Codex gezielte A16-Lücke: positiven Wiederherstellungszweig vorbereitet mit vorhandener echter Kartenkopie und noch vorbereiteter Tageskopie. Bestehende 17 Fälle und Grenzen unverändert. Neue Einzelprobe stellt kontrollierten früheren lokalen Speicherstand nach, keinen echten Prozesskill; SDK/Repo-Regeln, ursprünglicher Beitrag und andere Karte werden geprüft. App unverändert.

- 02:03 Codex Nacht-Fortsetzung nach Nutzungslimit: Heartbeat im selben Chat angelegt und ACTIVE in automation.toml bestätigt; regulärer Reset laut Kontoabfrage 01:37:19 Europe/Berlin, eingetroffene Heartbeats 00:02/01:01/02:03. Aktuelle Übergabe 02:02 und ein bestehender Sicherungsbaum 12532/16564 bestätigt, keine weitere Schleife. A14–A16-Entwurf unverändert erhalten. Vor Reset Betreiber-/Zyklusregeln, Daten-Skill und Anschlussvorbereitung gelesen, Syntax/Stand 3.18.30 grün. Kein App-Commit, keine große Abnahme, kein Deploy. Nächster Schritt: konkrete Rückweg-/Speicher-Inventur der beiden entschiedenen Lernrunden-Punkte und gezielte Lückenprüfung im bestehenden Datenpaket.

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
