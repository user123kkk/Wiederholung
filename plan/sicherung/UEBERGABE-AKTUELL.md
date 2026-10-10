# Übergabe – Stand von 10.10.2026 16:05 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `b4851219 Sicherung 16:04 (automatisch, jede Minute)`
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
 M plan/ARBEITSPROTOKOLL.md
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
 M plan/werkzeuge/pruefstand/t_paket_c_weiter.js
 M plan/werkzeuge/pruefstand/t_rechtsplan.js
 A plan/werkzeuge/pruefstand/t_tagesantworten_sdk.js
 M plan/werkzeuge/pruefstand/t_verlauf_mehrgeraete.js
 A plan/werkzeuge/pruefstand/x_ab_bestand_tempo.js
 A plan/werkzeuge/pruefstand/x_ab_tempo_reihenfolge.js
 A plan/werkzeuge/pruefstand/x_abnahme_hash.js
 A plan/werkzeuge/pruefstand/x_nur_betreiber_aufbau.js
 A plan/werkzeuge/pruefstand/x_rechts_clip.js
 A plan/werkzeuge/pruefstand/x_spur_bestand.js
 A plan/werkzeuge/pruefstand/x_spur_rechtsplan.js
 A plan/werkzeuge/pruefstand/x_spur_text_tempo.js
 A plan/werkzeuge/pruefstand/x_stub_batch.js
 A plan/werkzeuge/pruefstand/x_verlauf_batch_ablehnung.js
 M plan/werkzeuge/regeln/regeln-pruefung.mjs
 M sw.js
```

Auf einem sauberen Stand desselben Commits wiederherstellen:
`git apply --check plan/sicherung/entwurf-aktuell.patch`, dann `git apply plan/sicherung/entwurf-aktuell.patch`.

## Was gerade läuft

- Prozesse: node.exe 12, chrome.exe 15 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

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

- Codex Anschluss der Datenabnahme: Übergabe, Tempo-Befund, Abnahmebericht und geltende Regeln gelesen; bestehende Minuten-Sicherung 12532/16564 bestätigt, keine zweite gestartet. Netzteilstatus 2. Vorhandene Rohtraces der beiden Quellen zeitlich zerlegt: erster Layoutdurchlauf liegt nach Ende des Klick-Handlers, zweiter nach dem Animationsbild; kein Beleg für einen erzwungenen großen Layoutdurchlauf innerhalb des Klick-Handlers. Aktuelle Kartenlisten-, Schriftvorlade- und content-visibility-Pfade gelesen. Produkt und ursprüngliche rote Belege unverändert; gezielte Zuordnung der beiden Layoutdurchläufe wird vorbereitet.

- Neuer lokaler Chat „Datenabnahme 3.18.30: Tempo klären“ gestartet: 01a12620-409a-7e33-8945-dcc4837f7a96. Konkreter Anschluss samt vorhandenen Diagnosen, Erhalt gültiger Prüfungen, unveränderter 200-ms-Grenze und Verbot neuer Pakete/Veröffentlichung übergeben; keine Modelländerung/zweite Sicherung veranlasst.

- Codex Anschluss auf Betreiberauftrag geprüft: aktuelle Übergabe, STAND-Einstieg und vollständigen TEXT-TEMPO-BEFUND gelesen; nächster Produktabschluss ist unverändert Datenabnahme 3.18.30, nicht neue Mehrwert-Funktion. Desktop-Projekt über App-Werkzeug identifiziert; neuer lokaler Chat wird mit gezielter Tempo-Klärung und Token-/Erhaltregeln gestartet. Kein Test/App-Code in diesem Chat geändert.

- 16:00 Codex Erledigungsprüfung zentral ergänzt: neun zusätzliche Prüfpositionen aus 05.–07.10. (sechs umgesetzte Wunschgruppen, zwei teilweise erledigte Gesamtwünsche, ein offener Listen-Sprung-Prüfrest); die zwei N1-Stellen gemeinsam gezählt. Historische und aktuelle erhaltene Listen-/Einwilligungslogs vollständig gelesen, Code/CSS und damaligen Umfang gegengeprüft. Textarten-Erklärung und N1-CSS nicht als neue Verständlichkeits-/Fotoabnahme ausgegeben. Unklare Schreibkritik zusätzlich ausdrücklich erhalten. Fehlende Unterideen/Varianten/Gegenreden aus R1/R2 in die elf vorhandenen Ideenbereiche eingefügt; TikTok-Bezüge mit vorhandenen Bereichen verbunden, keine neue Liste/Funktionsfreigabe. Alle 259 alten Tabellenpositionen thematisch erhalten, sieben schon vorher umbasierte Verweise sind keine verlorenen Aufgaben; lokale Linkziele vollständig vorhanden und gezieltes diff --check grün. Rest: ältere Originalchatwünsche vor 05.10. einzeln belegen. Datenabnahme weiter 157/158 mit offenem t_text_tempo; keine Produkttests neu gestartet, kein Produktcommit/Deploy, fremder Entwurf erhalten.

- Codex Fortsetzung der Erledigungsprüfung: aktuelle Übergabe, Betreiberregeln, zentrale Liste und Quellenabgleich gelesen; Minuten-Sicherung als bestehenden Prozessbaum 12532/16564 bestätigt, keine zweite gestartet. Originalchat a495c23a vom 05.–07.10. und damalige Wunschdateien mit Bauprotokollen zu 3.18.21/24/25 abgeglichen. Aktuellen Karten-Detailweg, Textarten-Erklärung, Widerruf-Erklärung und zwei CSS-Korrekturen gelesen; t_liste_zeigen und erhaltenen Klein-Log vollständig gelesen. Drei bereits zentral belegte Beispiele nicht neu abgenommen. Keine Produktänderung oder Datenabnahme; 3.18.30 und Fremdarbeit erhalten.

- Codex: Betreiberauftrag 10.10.: Reihenfolge passend halten, unnötige Dauer und Tokens vermeiden; neuen Chat mit zwingendem caveman gestartet: 01a12616-ac4c-7c31-b011-37917529c814. Frühere Wünsche auf Erledigung prüfen, vorhandene Belege wiederverwenden, keine neue große Ideensammlung. Produktreihenfolge und fremden Datenentwurf erhalten.

- Codex erste Erledigungskontrolle früherer Kleinigkeiten: Betreiberquellen 05.–07.10., CHANGELOG und gezielte Logbuchstellen gelesen. Handschrift/Vollbild 3.18.19, Tippen daneben 3.18.19/24 und Griff-Auslaufen 3.18.20 zentral mit Bau-/Prüfbelegen geführt. Rest Hintergrundscrollen und separaten schwankenden Griff-Test ausdrücklich offen belassen. Keine komplette historische Wunsch-Abnahme oder frischen Gerätebelege behauptet.

- 10.10. Codex: verstreute eigene TikTok-Ergänzungen bereinigt. Aktive Aufgabenbereiche der Mehrwert-GESAMTLISTE vollständig samt Status und umbasierter Verweise nach ALLES-OFFEN übernommen; ursprüngliche Tabellenzeilen maschinell auf Erhalt geprüft. Neue Ideen passenden Bereichen zugeordnet; alte Gesamtliste historisch, TikTok-Datei nur Originalquelle. Vier Fachpläne auf zentralen Eingang verwiesen, Betreiberpräferenz vereinheitlicht, alten Meldungsverlauf eingeklappt. Originalnachricht unverändert. Neuer Wunsch nach Erledigungsprüfung früherer Kleinigkeiten zentral offen erfasst; Herkunftsabgleich 34/34 Berichte ist kein Umsetzungsnachweis. Keine Produktänderung, kein neuer Agentenlauf, keine Datenprüfung/Veröffentlichung.

- 15:38 Codex Betreiberklarstellung aufgenommen: ausschließlich TikTok-Ideen passend mit Mehrwert/anderen offenen Punkten zusammenführen, Betreiber hat kein klares Gesamtbild. Aktuelle Übergabe/Arbeitsfolge/Quellenzuordnung gelesen, Minuten-Sicherung als ein Prozessbaum bestätigt. In GESAMTLISTE bei Reihenfolge sichtbare Zuordnung und Arbeitsweise je Bereich ergänzt: Bestand/neue Ideen zusammenführen, Recherche/Abhängigkeiten klären, konkreter gemeinsamer Arbeitsplan mit Prüfkriterien; keine zweite Warteschlange/Statusliste. ALLES-OFFEN/BETREIBER-VERSTEHEN/Quelle nachgezogen. Keine Produktänderung, keine Datenabnahme neu gestartet.

- 15:29 Codex iPad-Zufallstest AFFE_TEXTE=1/150/Seed7 abgeschlossen,104 Textaktionen/0 Befunde; ganze Ausgabe gelesen. Damit alle158 Abschlusslogs/Runde13 und beide vorgeschriebenen Zufallstests gelesen, Regeln238 gültig grün. Gesamt157/158, Tempo als echte offene Sperre erhalten; kein Paketcommit/Produkt-Push/Deploy. Eigene Demo-Emulatorwurzeln21112/12120 anhand exakter Projekt-Kommandos geprüft und nach Testende beendet; Minuten-Sicherung12532 läuft weiter, Fremdprozesse/Entwurf/Fremdarbeit erhalten. Endstand/Plan/Offenliste/Logbuch/Bericht nachgezogen; nächste Arbeit ist gezielte Tempo-Klärung, kein neues Paket. Vollständige TikTok-Quelle und Zusammenführung in vorhandene Pläne gesichert.

- 15:27 Codex Handy-Zufallstest AFFE_TEXTE=1/200/Seed7 abgeschlossen:104 Textaktionen,0 Befunde; vollständige Ausgabe gelesen. iPad AFFE_TEXTE=1/150/Seed7 läuft (100 Schritte). Gesamtlauf und Runde fertig, Tempo als echtes offenes Rot erhalten; Logbuch/Checkliste/Planstände aktualisiert. git diff --check korrekt mit Repo-Zeilenendkonfiguration grün (voriger temporärer core.autocrlf=false-Aufruf behandelte CRLF fälschlich als Leerraum, keine Dateien dafür geändert). Alle Diagnosen/Quellen bewahrt, kein Paketcommit/Deploy.

- 15:24 Codex alle158 vollständigen Abschlusslogs gelesen:157 grün, Texttempo rot252ms; keine weitere Grün-Wiederholung. Rundenabnahme --fortsetzen13/13 am exakt gleichen Stand ausgewertet, beschreibende Einzeloutputs vollständig bekannt. Stand-/CSP-/APP_SHELL-/Syntaxprüfung frisch grün. Bericht/Logbuch und LEHREN14-Zeilen konkret nachgezogen,6/12 ausdrücklich nicht erfüllt; keine Freigabe/Commit. AFFE_TEXTE=1 handy200 Seed7 aktiv (keine Befunde bisher), danach iPad150 Seed7. Mehrwert-Reihenfolge mit neuer Onboarding-Präferenz angeglichen, Quellen/Diagnosen im Minuten-Patch erfasst.

- 15:20 Codex korrigierter kompletter Mehrgeräte-Verlauf grün, erst gezielt und jetzt im Gesamtlauf14s (Hash6100003f); alle Ausgaben gelesen. Tatsächliche Regelablehnung/SDK-Rollback, genau einmal Nachholen, Offline-Neustart nach ausdrücklicher Kopienprüfung, beide Undo-/Tageswechselwege, Snapshot-Zeichenfläche und abgelehnter/erfolgreicher Reset erhalten. Testaufbau wartet auf bereits laufende App-Prüfung; Produkt unverändert. Gesamtlauf7 Runner8948/Sitzung23849:152 abgeschlossen,151 grün, ein Tempo-Rot252ms zusätzlich zu erhaltenen226/254ms; kein Grün-Wiederholungsziel. Verwalten-Ausgaben vollständig gelesen, echte Touch-Abnahme aktiv. Abschlusssperre Tempo bleibt.

- 15:17 Codex Gesamt150 abgeschlossen, zwei rot (Tempo/Verlauf). Runner14360 nach zweitem Rot beendet, vollständige Logs/stand gesichert. Timeout an t_verlauf_mehrgeraete171 ist Ablehnungsprobe, nicht Reset (vorige Kurzmeldung korrigiert). Alter eigenständiger SDK-Wrapper manipulierte nur updateDoc; A16 schreibt atomare Batch-Updates. Vorhandenes Helfermuster übernommen, tatsächlichen ausgesandten Wrapper per VM geprüft; grün und feste315bb0e-Probe rot beim fehlenden Batch, andere Writes/Commit erhalten. Erster korrigierter Kompletttest meldet früheren Offline-Neustartserver9 statt10; voller Log gelesen. A16-Kopien werden ausdrücklich geprüft, ältere SDK-only-Fertigbedingung wartet nicht auf App-Belegprüfung. Test wartet jetzt auch auf bereits laufende App-Prüfung und prüft Wiederherstellung ausdrücklich; Erwartung10/keine Duplikate bleibt. Zweiter Komplettlauf aktiv. Produkt/Rules unverändert, ursprüngliche Tempo-Sperre bleibt.

- 15:10 Codex zweiter A/B-Vergleich mit ausgeglichener Reihenfolge vollständig gelesen: achtmal identisches #app-DOM (Hash2f26be52), Verwalten alter Median286ms/6 rote Messungen, Entwurf212ms/4; Text162/150ms, keine Überschreitung. Erste pauschale Verlangsamungsdeutung dadurch nicht gehalten; Schwankung/Layoutkosten beider Quellen belegt, keine abschließende Ursache/Fehlerfreiheit. Rohtraces/CPU-Profile gesichert. Gesamtlauf einmal nach Diagnose am unveränderten Stand fortgesetzt (Runner14360/Sitzung53308),144 gültige grüne bewahrt, fehlende14 einschließlich Original-Tempo erneut; keine Wiederholungsschleife bis grün. Rest/Affe/Runde beenden, Tempo-Befund unabhängig vom nächsten Einzelwert offen behandeln.

- 15:08 Codex acht vorgeschriebene A/B-Paare gelesen: Verwalten alter Median188ms/2 Überschreitungen, Entwurf279ms/6; Text144/148ms. Daraus zunächst Entwurf langsamer gemeldet. Traces am unveränderten Originaltest beider Quellen vollständig gelesen: gleiche Layoutobjektzahlen156/397, Hauptkosten Browserlayout/HTML-Aufbau; alter Trace373ms, neuer178ms für Verwalten, Trace kostet selbst Laufzeit. Noch keine abschließende Ursache. Ausgleich der A/B-Reihenfolge und DOM-Gleichheit mit tatsächlicher Messhilfe begonnen. Eigener Diagnoseanker scheiterte an CRLF vor Browserstart; Log erhalten, Quellnormalisierung korrigiert, zweiter Diagnoseaufruf aktiv. Produkt/Assertions gleich, Abnahme weiter gesperrt.

- 15:04 Codex t_text_tempo rot226ms bei200ms/CPU4x; vollständigen Log gelesen, eigenen Runner14916 samt begonnenem Text-Zustandstest beendet.144 grüne/145 vollständige Abschlusslogs erhalten, rote Ausgabe/stand.json separat gesichert. Originaltest und vorgeschriebene x_ab_tempo-Messhilfe gelesen; acht feste Vergleichspaare mit315bb0e gestartet, kein weiterer Browserlauf. Keine Ursache vorweggenommen, keine Produkt-/Testgrenzenänderung; Paketabschluss gesperrt bis Klärung.

- 15:01 Codex143/158 gültig grün; alle143 vollständigen Abschlusslogs gelesen. A16 frisch22 SDK-Fälle am unveränderten4a8ca5a1/6a110898, Service-Worker-Offline/Update samt festen Gegenproben grün. Text-Neu-Test aktiv, Probelauf unverändert. Stand/Ideenzuordnung samt lokalen Links geprüft; Abschlussbericht nachgezogen. Netzteil2 bestätigt, keine Veröffentlichung.

- 14:55 Codex vollständige TikTok-Nachricht einschließlich Betreiberkommentaren als Quelle unter ideen/TIKTOK-SAMMLUNG-2026-10-10.md bewahrt. Wünsche in ALLES-OFFEN/BETREIBER-VERSTEHEN und vorhandene Onboarding-, Mehrwert-, Konsolen-, Geräte- und Monetarisierungspläne eingefügt; keine parallele Statusliste. Historische Onboarding-Zahlen nicht als Sperre; automatische Tests vor Betreiberaufwand. Primärrecherche/Architekturprüfung offen, Videoaussagen nicht als geprüfte Empfehlungen übernommen. Kein Produktbau/Deploy, bestehende3.18.30-Abnahme fortgesetzt.130/158 grün; alle130 Abschlusslogs vollständig gelesen, Sprung/Üben aktiv.

- 14:44 Codex119/158 grün, alle119 vollständigen Logs gelesen; Rundenlage vier Chromium-Handygrößen, Geometrie0px/Scroll0, Bereichsrunde/Undo/Weiterlernen geprüft. Beschreibender t_runde_rest meldet links per Maus NICHTS; tatsächlichen Messpfad gelesen (Maus, Offen-Zustand statt Kartenstand). Daraus keine Wischfreigabe abgeleitet; vorgeschriebene Touch-/Schrägwisch-Abnahmen folgen im selben Gesamtlauf. Rundenende aktiv, Quellen unverändert.

- 14:40 Codex korrigierte Rechts-Abnahme komplett grün40s:320/390/820 hell/dunkel, vollständiger Inhalt, sichtbarer Kontrast, alle Rückwege/Eingabenerhalt und Fehler/Neuversuch/späte Antwort. Neue Testkennung292d3e77; ganze Ausgabe gelesen. Verzögerte Registrierung samt echter12/13s-Grenze/fester Gegenprobe und vorhandene Regler-Regressionsausgaben gelesen. Gesamt112/158 gültig grün, alle112 Abschlusslogs gelesen; Reihenfolge-Limit aktiv. Quellen unverändert, keine Lernempfehlung.

- 14:38 Codex t_rechtsplan rot bei Tablet/hell: zwei A-Links1.89 statt4.5. Eigenen Runner19768/angefangene Registrierung beendet; vollständigen roten Log/stand.json gesichert,109 grüne und110 vollständige Logs gelesen. Unveränderten Test mit Messspur ausgeführt, Screenshot tatsächlich angesehen: Links bei y1057–1079 außerhalb Scrollclip256–905, unsichtbar. Kontrastleser benennt klassenlose Links als A, Sichtfilter suchte nur className und behielt sie als unbekannt. Testfilter verwendet nun denselben Klasse/Tag-Schlüssel und alle gleichnamigen Treffer; sichtbare/teilweise sichtbare/doppelte/unbekannte schlechte Kontraste bleiben erhalten. Originalfilter-VM-Proben grün, feste315bb0e-Gegenprobe rot genau beim abgeschnittenen Link; komplette Ausgaben gelesen. Nur Testzuordnung geändert, Grenze4.5/App/CSS/Rules gleich. Oberflächen-Skill geladen. Runner14916/Sitzung58908 fortgesetzt,109 gültige Ergebnisse bewahrt, Log abnahme-gesamt-5-3.18.30.log; aktiven Log nicht vorzeitig abhaken.
