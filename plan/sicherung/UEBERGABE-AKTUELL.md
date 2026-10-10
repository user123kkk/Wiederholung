# Übergabe – Stand von 10.10.2026 08:37 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `9334812 Sicherung 08:36 (automatisch, jede Minute)`
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
