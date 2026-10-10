# Übergabe – Stand von 10.10.2026 12:55 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `07d25a6 Sicherung 12:54 (automatisch, jede Minute)`
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
 A .agents/skills/llm-council/.gitignore
 A .agents/skills/llm-council/README.md
 A .agents/skills/llm-council/SKILL.md
 A .agents/skills/llm-council/agents/openai.yaml
 A .agents/skills/llm-council/references/upstream-SKILL.md
 A .claude/skills/adrabic-daten/SKILL.md
 A .claude/skills/adrabic-lernbelege/SKILL.md
 A .claude/skills/adrabic-oberflaeche/SKILL.md
 A .claude/skills/llm-council/README.md
 A .claude/skills/llm-council/SKILL.md
 A .claude/skills/llm-council/references/upstream-SKILL.md
 M CHANGELOG.md
 M app.js
 M datenschutzerklaerung.html
 M firestore.rules
 M index.html
 M plan/werkzeuge/ladegeraet.ps1
 M plan/werkzeuge/minuten_sicherung.sh
 A plan/werkzeuge/projekt_skills.mjs
 M plan/werkzeuge/pruefstand/LIESMICH.md
 M plan/werkzeuge/pruefstand/abnahme_runde.js
 M plan/werkzeuge/pruefstand/alle_pruefen.js
 A plan/werkzeuge/pruefstand/diagnose_formular_konflikt.js
 M plan/werkzeuge/pruefstand/diagnose_karten_konflikt.js
 A plan/werkzeuge/pruefstand/diagnose_verlauf_neustart.js
 A plan/werkzeuge/pruefstand/karten_konflikte_sdk.js
 M plan/werkzeuge/pruefstand/stubs.js
 M plan/werkzeuge/pruefstand/t_nur_betreiber.js
 A plan/werkzeuge/pruefstand/t_tagesantworten_sdk.js
 A plan/werkzeuge/pruefstand/x_ab_bestand_tempo.js
 A plan/werkzeuge/pruefstand/x_abnahme_hash.js
 A plan/werkzeuge/pruefstand/x_nur_betreiber_aufbau.js
 A plan/werkzeuge/pruefstand/x_spur_bestand.js
 A plan/werkzeuge/pruefstand/x_stub_batch.js
 M plan/werkzeuge/regeln/regeln-pruefung.mjs
 M sw.js
```

Auf einem sauberen Stand desselben Commits wiederherstellen:
`git apply --check plan/sicherung/entwurf-aktuell.patch`, dann `git apply plan/sicherung/entwurf-aktuell.patch`.

## Was gerade läuft

- Prozesse: node.exe 16, chrome.exe 18 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

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

- 12:52 Codex korrigierter t_nur_betreiber vollständig grün: sieben Bildschirme je Handy/Desktop HTML und Pixel identisch für normales Konto; drei Gegenproben erkennen Betreiberfreigabe, Schriftentsperrung und unzulässige Textfreigabe. Ganze Ausgabe gelesen, neuer Testhash d4acf692, kein historischer Checkout/Server benutzt. Fortgesetzter Gesamtstand87/158 grün, alle87 gültigen Abschlusslogs gelesen; Original-Aufbaufehler bleibt separat. Runner15139/Node19272 jetzt PaketB, Quellen e595b5b6312244cd unverändert. Keine Wiederholung86 gültiger Tests/kein Deploy.

- 12:50 Codex zweite Aufbaulücke im Gesamtlauf:86 grün, t_nur_betreiber vor Browserstart rot bei unnötigem historischem Worktree-Aufbau. Eigenen Runnerbaum18936/gerade gestartetes PaketB beendet, alle87 fertigen Logs gelesen und roten Einzellog/stand.json zusätzlich gesichert. Normaler Vergleich arbeitet seit PaketC ausschließlich am aktuellen Stand; historischen Checkout/Server deshalb nur in bestehendem --historisch-Zweig anfordern, Browser-/HTML-/Pixel-/Gegenproben unverändert. Reine VM-Aufbauprobe ohne Git-/Servermutation grün, fester Vorstand315bb0e rot genau beim unnötigen Checkout (2 Aufrufe); ganze Ausgaben gelesen. Kein neuer Worktree angelegt, keine vorhandenen Ordner bereinigt; Produkt/Rules/Stubhash e595b5b6312244cd gleich. Fortsetzung mit tatsächlichen Quellen-/Testhashes bewahrt86 gültige Tests, nur geänderten/roten und unvollständige neu. Mainlog abnahme-gesamt-3-3.18.30.log; Leserregister für geänderten Test zurückgesetzt, alte rote Ausgabe erhalten.

- 12:45 Codex75/158 grün, alle75 vollständigen Abschlusslogs gelesen. Kontrast0, paralleles SDK-Laden mit alter Wasserfall-Gegenprobe, Lernstart28 Zustände und zwölf bestehende Lernregelregressionen grün. Keine neue Lernregel/Empfehlung/Lernwirkungsbehauptung; keine zusätzlichen Simulationen. Eine Minuten-Sicherung12532/16564 weiterhin aktiv, Übergabe/automatische Sicherungen fortgeschritten. Report/STAND und Leserregister aktualisiert, Gesamtlauf87583 allein weiter.

- 12:42 Codex70/158 grün, alle70 vollständigen Abschlusslogs gelesen. Kontofortsetzungen samt zahlreichen festen Gegenproben, Lösch-Zeitlimit/Offline-Sperre, Wechsel während Löschung und alte Speicher-/Stapelantworten isoliert. Aktuell Kontrastprüfung, einziger Browserlauf87583 bleibt aktiv. Keine Produktionsdaten/Authentifizierungsbelege, App/Regeln unverändert, kein Paketcommit/Deploy.

- 12:38 Codex62/158 abgeschlossene Prüfungen grün, alle62 vollständigen Ausgaben gelesen und im Leserregister gesichert. Kartenblatt vier Konfigurationen, fremde Karten-/Feldechos, kleine Bootlage, Konto-Lösch-/Abbruch-/Google-Attrappenfälle und alter Dialog/Bestätigung nach Kontowechsel grün. Keine echte Google-/iPhone-Authentifizierung daraus behauptet. Gesamtlauf läuft jetzt Kontofortsetzungen allein; Produkt/Rules weiterhin gleicher Entwurf, keine Tests ausgelassen/Grenzen verändert.

- 12:32 Codex50/158 grün, vollständige Abschlusslogs1–50 gelesen. Üben/Serie und echte Wiederholung getrennt erhalten, alte/neue Ideenzeitstempel richtig sortiert, Import gleichnamiger Bereiche erhält alle fünf Karten. Gelesene Testnamen samt Quellstand jetzt explizit abnahme-gelesen-3.18.30.json für nahtlosen Anschluss; keine automatisch ungelesene Ausgabe abhaken. Lauf87583 aktiv, Prüfgrenzen und Produkt unverändert.

- 12:31 Codex Gesamtlauf47/158 grün, alle47 vollständigen Logs gelesen. Rückmeldung24 Varianten, Fehlerfokus/-Entwurferhalt, Fortschritt12 Varianten, Scrollen im Gesamtlauf, große Ansichten28 Zustände, Datum/Bereichszähler grün. Vier aktuelle Rundenbilder tatsächlich angesehen und gesichert (plan/sicherung/tests/abnahme-rundenfotos-3.18.30), Knöpfe/Antwort im Bild; keine iPhone-Abnahme daraus. Beschreibende Tempoausgaben erhalten: Bewerten max53ms, Fortschrittwechsel209ms/max233ms Bildlücke; große Erstansicht445ms. Keine allgemeine Flüssigkeitszusage oder ungeprüfte Ursache. Zwischenmeldung zum aktiven Test war zu früh geraten (Verwalten statt Fotos); tatsächliche Prozesszeile gelesen, fortan im Standleser mitgeführt. Kein App-/Regelwechsel, Lauf87583 weiter allein aktiv.

- 12:24 Codex frischer Gesamtlauf32/158 grün, alle32 Abschlusslogs vollständig gelesen: Einstellungs-/Einstiegsvarianten, Bestandskonto, Probekarte, Scroll-/Lagenmessung, Kalender-UID/Uhrzeit einschließlich Gegenproben. Beschreibende mobile Einstiegsverschiebung39px in älteren gesicherten Logs identisch; kein neuer Produktfehler daraus behauptet. Ein voriger Zwischenlog-Pfad t_einstieg war vor dessen Start angenommen, tatsächlichen Prozess/Dateien nachgelesen; keine Testquelle/Ergebnisse verändert. Lauf87583 weiter allein aktiv am e595b5b6312244cd. Rest Gesamtlauf/Affe/Runden-Auswertung/Abschluss bleibt.

- 12:17 Codex Gesamtlauf25/158 grün, alle25 vollständigen Abschlusslogs gelesen. Bestands-Tempo erneut im Gesamtlauf grün,3000er-Bewertungen max61ms; Teilen/Import/Sicherung drei Breiten ohne Kontrast-/Seitenfehler, Timergegenprobe/Doppeltipp/Drehlage (vier Breiten0px) grün. Beschreibende Einstellungs-/Geometrieausgaben ebenfalls gelesen, keine neuen Produktbefunde daraus. Läuft allein weiter, keine Abnahme vor vollständigem Lauf/Affe/Runde.

- 12:12 Codex frische Abschlusslogs1–9 vollständig gelesen: Erinnerungs-/Ideenhinweise, a11y, abgelehnte Bewertung, Abstimmfehler, Anmeldung/Enter, Ansagen und Bereiche alle grün; historische Gegenproben erwartbar rot. Shared-Stub-Diff vollständig gegengelesen, Syntax grün; Diagnosewerkzeuge für Minutenpatch erfasst, Trace/CPU-Profil zusätzlich ins Repo kopiert. SDK-Gültigkeit anhand tatsächlicher Route geprüft: nur unverändertes AUTH aus stubs.js, echtes Firestore; 16/8-Fälle nicht wiederholt. Vorbereitungsseite um aktuellen Lauf berichtigt, frühere Historie erhalten. Gesamtlauf87583 weiterhin allein aktiv, kein neuer Produktbau/Deploy.

- 12:06 Codex korrigierte Attrappe am unveränderten Original-Tempotest vollständig grün: fünf Bestandsgrößen, zehn Bewertungen bei3000 Karten max71ms (100ms-Grenze, CPU4x), komplette Ausgabe gelesen. Hashprobe beide Runner identisch e595b5b6312244cd; frischen Gesamtlauf158 ohne Fortsetzen begonnen, abnahme-gesamt-2-3.18.30.log. Rote Erstläufe erhalten. Produkt/Rules unverändert, erneute Daten-Einzeltests daraus nicht abgeleitet; Attrappenabhängigkeiten werden frisch insgesamt geprüft.

- 12:05 Codex Tempo-Ursache gemessen: acht A/B-Paare vollständig gelesen, Vorstand 7/8 grün (einmal138ms), Entwurf 0/8 (erste Bewertung284–617ms). Trace252ms vollständig im Firebase-Attrappen-Timer, CPU-Profil hauptsächlich clone/listenerMelden/dsnap. Batch meldete global, Einzelwrites schon gezielt; unberührte Karten wurden deshalb vollständig kopiert. Nur stubs.js korrigiert: Batchpfade sammeln, unberührte Listener auslassen, betroffene Änderungen eines Batches gemeinsam liefern. Neue funktionale x_stub_batch-Probe prüft null Zugriffe auf unberührte Karte, gemeinsame Änderungen/Entfernung und gefilterte Abfrage; grün. Fester Vorstand rot genau beim unnötigen Kartenlesen (2 statt0); volle Logs gelesen. Erste Fixture fehlte Auth-Protokollinitialisierung und scheiterte daran, korrigiert, Fehlversuche separat erhalten. Original-Tempotest unverändert läuft jetzt vollständig, App/Rules/echter SDK-Helfer unverändert. Neuer Attrappenhash verlangt danach frischen Gesamtlauf.

- 12:02 Codex Diagnosewerkzeug für Chrome-Trace/CPU-Profil am Original-Tempotest vorbereitet, Grenzen/Assertions unverändert. Erste fünf abgeschlossene A/B-Paare: Vorstand jeweils grün, Entwurf jeweils rot (617/491/284/407/475 ms). Noch keine Ursache/Freigabe daraus. Attrappenquelle Batch-Meldung gegenüber gezielter Einzelmeldung gelesen; Messung folgt nach Vergleichslauf, kein Browser parallel. Voriger String-Einfügeversuch traf wegen CRLF keinen Anker, jetzt mit geprüftem Patch ergänzt; Produkt unberührt.

- 11:58 Codex große Abnahme angehalten: 13 vollständige Tests grün, t_bestand_tempo rot (3000 Karten, erste Bewertung 207 ms bei unveränderter 100-ms-Grenze, gradeCard 24 ms). Alle 14 Abschlusslogs vollständig gelesen; gerade laufenden Browser samt eigenem Runnerbaum 21508 beendet, rote Ausgabe erhalten. Keine Ursache behauptet/keine Produkt- oder Grenzänderung. Eigene Diagnose x_ab_bestand_tempo führt acht abwechselnde Paare desselben Originaltests am festen vorherigen Produktcommit 315bb0e9fb4ae9da74882fb35400ee90213437db (3.18.29) und Entwurf aus; nur Eingabe 3000 Karten und Altquelle gewählt, CPU4x/Assertions unverändert. Sitzung 37871, eigener Log abnahme-bestand-ab-3.18.30.log. Kein paralleler Browserlauf; Paketabschluss gesperrt.

- 11:50 Codex Gegenprüfung: DATEN-9 bis DATEN-12, vollständigen aktuellen App-/Rules-/Datenschutz-Diff sowie SDK-Helfer und 16-/22-/8-Fallquellen gegen fachliche Kriterien gelesen. Unveränderte A14/A15-/A17-Abschlusslogs erneut gelesen, keine Tests daraus wiederholt. Unberührte Karte, tatsächliche Serverbestätigung, Kontobindung, Herkunft von Tag/Epoche und explizite Formularänderung tragen die Belege; Auth bleibt Attrappe, Worker blockiert. Kein zusätzlicher Produktfehler belegt. Erste vier allgemeine Logs vollständig gelesen, darunter Abgelehnt-Nachholen/Barrierefreiheit/Gegenprobe. Besetzter Emulator-Port 8081 korrekt abgewiesen ohne neuen Prozess. Gesamtlauf weiter allein aktiv; kein weiterer Browserlauf parallel.

- 11:48 Codex Abnahmeaufbau korrigiert: alle_pruefen/abnahme_runde nehmen SDK-Helfer in gemeinsamen Stand auf, A16-Testhash bindet Helfer zusätzlich. Virtuelle Helfer-/Teständerungen erkannt, Runnerstand identisch 3795bfc5fa122e28. Ladegerät-Startblock baut zwei getrennte Demo-Emulatoren samt Ports/Websocket/Hub/Logging, verwirft besetzte Ports und hält beide Prozessbäume für Cleanup. Genau diesen Block separat ohne Stand-/Deploy-Schritte ausgeführt: 8081/8082 beide gestartet, aktuelle Rules je per Emulator-API HTTP 200 geladen. Früheren eindeutig zugeordneten lokalen 8082-Java-Prozess ersetzt; keine laufenden Tests dort. Rules separat am 8085-Prüfemulator 238/238, ganze Ausgabe gelesen. Syntax/Version/Server-8097-Quellgleichheit grün. Frischer gesamter Browserlauf jetzt gestartet, Sitzung 15211, Log abnahme-gesamt-3.18.30.log, Quelle 3795bfc5fa122e28. App/Rules und 46 gezielte Vorbelege unverändert; keine Veröffentlichung.

- 11:44 Codex neuer ausdrücklich beauftragter Abnahmechat: Übergabe/AGENTS, Betreiberregeln, ALLES-OFFEN, STAND, CLAUDE, LEHREN, Zyklusregeln und Abnahmevorbereitung gelesen; Daten-Skill und kurze deutsche Meldungen angewandt. Ein Minuten-Sicherungsbaum bestätigt, BatteryStatus 2. Entwurf 3.18.30/Fremdarbeit erhalten, kein Pull/Reset/Worktree. Große Datenabnahme jetzt wieder aufgenommen; 46 unveränderte gezielte Fälle nicht erneut ausführen. Zwei konkrete Aufbauprobleme werden vor frischem Browserlauf behoben und getrennt geprüft; kein Deploy/neuer Funktionsbau.

- 11:42 Codex Betreiber „ok los aber neuer chtat ja ... paket“: Paket als zusammengehörige Änderungen/Prüfung/Sicherung konkret erklärt. Expliziten neuen Chat für zuvor benannte große Datenabnahme/Paketabschluss vorbereiten. Aktuelle Übergabe 11:41, Desktop-Projekt-ID aus App-Liste gewählt (nicht gleichnamige Kopie unter USER). Kein Worktree, damit uncommitteter Stand 3.18.30 erhalten bleibt. Wunsch und Umfang in ALLES-OFFEN gesichert, keine Veröffentlichung/neue Funktionsfreigabe abgeleitet. Alter Chat führt keine parallele Produktarbeit aus.

- 11:40 Codex nach abgeschlossenem Quellenabgleich den ausdrücklich gespeicherten Heartbeat-Abschlussauftrag angewandt: vorhandene Automation adrabic-nachtarbeit-fortsetzen über App-Werkzeug PAUSED bestätigt, volle übrige Felder erhalten; lokale Konfiguration ebenfalls PAUSED. Keine zweite Automation/Sicherung. Nicht pausenlos weiterarbeiten behaupten: aktuell nur verschobene große Datenabnahme/Paketabschluss, Gerätebelege und nötige verstandene Funktionsentscheidungen; kein neues Paket über Entwurf. Minuten-Sicherung weiter aktiv, Übergabe 11:39/automatischer Commit 11:38 gesehen. Konkreten Rest einmal gemeldet.

- 11:38 Codex auf „weiter arbeiten ... kommen nicht voran“ Quellenabgleich tatsächlich abgeschlossen: zuerst 15–18 vier Vollberichte (49 Hauptpositionen/3 Konzepte/29 historische Fragen), danach 19–22 (39 nummerierte Positionen plus Lizenz-Dossier/29 Fragen), 23–26 (56 ursprüngliche Positionen, 24 bündelt 8/9; 33 Fragen). Zwölf restliche Vollberichte mit Gegenrede/Beleggrenzen gelesen; anfangs gekürzte Toolausgaben gezielt nachgelesen, keine ungelesenen Teile als vollständig behauptet. Nun 34/34 inhaltliche Berichte; zwei Limit-Abbrüche bleiben ohne erfundene Ergebnisse. Jede der 187 alten Katalogzeilen rückwärts mit konkreter Berichtsstelle oder gekennzeichnetem Betreiberverlauf versehen; 184 Berichtzuordnungen, Playlist/Tafsir/Abo drei Sekundärbelege, keine Originalchat-Vollständigkeit behauptet. Tabellenregister 402 Positionen mechanisch zusammengeführt, Dopplungen/Fragen/Methodik keine Funktionszahl; Nebenabschnitte über Teilabgleiche erhalten. Zählung/relative Quellenlinks geprüft. Originale und historische Status erhalten, keine alten Ja als heutige Freigabe. Keine neue rechtliche Beratung/Kosten-/Plattform-/Lernwirkungsprüfung; Simulation aus Bericht 24 nicht gerechnet oder Eingang bestätigt. App-/Rules-Hashes erneut unverändert 4a8ca5a1/6a110898, keine Tests gestartet. Minuten-Sicherung ein Baum. Abschluss und konkreten verschobenen Rest in ALLES-OFFEN/STAND/ARBEITSSTAND gesichert, Fortschritt nach abgeschlossenen Blöcken sichtbar gemeldet. Abnahmeaufbau ausdrücklich verschoben laut Vorbereitungsseite, nicht still repariert; große Abnahme/neues Paket/Commit/Deploy bleiben später. Ein rg-Aufruf mit Windows-Glob als Dateipfad scheiterte, korrekt mit -g wiederholt.

- 11:28 Codex Betreiberauftrag Council-Skill umgesetzt: genaue GitHub-Quelle tenfoldmarc/llm-council-skill und komplette Originalanleitung gelesen; offizieller Installer, festgehaltener Commit 0dc03275b0ddf542545da3a9684510fff31df353, lokale Projektfassung mit unverändertem Original/README. Skill-Installer und Skill-Creator genutzt, Plugin-Management zunächst zur Einordnung gelesen; nach konkretem Skill-Link kein Plugin nötig. Codex-/Claude-Skill und AGENTS/CLAUDE-Zuordnung eingerichtet. Fünf echte getrennte Berater plus anonymisierte Gegenprüfung, Slotgrenzen, Beleggrenzen, kurze deutsche Erklärung und nötige verstandene Einzelfreigabe ausdrücklich; kein Parallel-/Laufzeit-/Wahrheitsversprechen. Pflegewerkzeug auf vier Skills samt Quellenspiegel erweitert. Erste Prüfung fing Ausgabe-Platzhalter als fehlenden Dateiverweis; Formulierung korrigiert, danach alle vier Skills einschließlich Metadaten/Verweisen/identischer Spiegel grün, Diff ohne Whitespace-Fehler. Offizieller Python-YAML-Prüfer nicht verfügbar wegen fehlendem PyYAML; keine Zusatzabhängigkeit installiert, stattdessen vorhandener Projektprüfer. Kein Council durchgeführt oder Qualitätsgewinn behauptet. Bestehender Sicherungsbaum 12532/16564 bestätigt; keine zweite Schleife. Neue Skilldateien für Entwurfspatch erfasst, keine App-/Rules-/Teständerung, kein App-Commit/Deploy oder Abnahme. Wunsch/Ergebnis in ALLES-OFFEN und Skills-Bericht gesichert; Fortschritt gemeldet.

- 11:10 Codex Quellenabgleich 13/14 abgeschlossen: beide Vollberichte einschließlich zweiter Teile gelesen, 27 Abgleich-/Regelpositionen und 16 historische Fragen einzeln zugeordnet. Jetzt 22/34 Berichte, noch 12 (15–26) und Zusammenführung/Rückwärtsprüfung. Kategorien nicht als neue Funktionszahl addiert; alte Paket-/Parallelvorschläge, fehlende Freigaben und heutige Baugeschichte getrennt, kein neuer Fragenkatalog/Sammel-Ja. Zentrale Verständniskorrektur gilt weiter. Ein Patch mit unvollständiger Protokoll-Zeile wurde atomar abgewiesen, nach Prüfung ohne Änderungen korrekt neu angewandt; vorausgegangenen Uhrzeit-Tippfehler 11:08 zu tatsächlichem 11:07 berichtigt. Keine App-/Rules-/Test-/Originaländerung, abgeschlossene Tests nicht wiederholt. Stand und Anschluss aktualisiert, sichtbaren Fortschritt gemeldet.
