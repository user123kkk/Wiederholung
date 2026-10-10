# Übergabe – Stand von 10.10.2026 16:44 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `0e171510 Sicherung 16:43 (automatisch, jede Minute)`
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
 M plan/ALLES-OFFEN.md
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
 A plan/werkzeuge/pruefstand/x_cpu_referenz.js
 A plan/werkzeuge/pruefstand/x_nur_betreiber_aufbau.js
 A plan/werkzeuge/pruefstand/x_rechts_clip.js
 A plan/werkzeuge/pruefstand/x_spur_bestand.js
 A plan/werkzeuge/pruefstand/x_spur_rechtsplan.js
 A plan/werkzeuge/pruefstand/x_spur_text_tempo.js
 A plan/werkzeuge/pruefstand/x_stub_batch.js
 A plan/werkzeuge/pruefstand/x_text_layout_auswerten.js
 A plan/werkzeuge/pruefstand/x_text_layout_ursache.js
 A plan/werkzeuge/pruefstand/x_verlauf_batch_ablehnung.js
 M plan/werkzeuge/regeln/regeln-pruefung.mjs
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

- 16:45 Codex18.09.: sieben Originalchats gelesen, alle acht alten TikTok-Originale und Navigationskritik bestehenden Bereichen zugeordnet. Apple-Knopf verborgen belegt; aktuelle Bytegrenze, feste Navigation, Nutzerlistener und erhaltene Einstellungen-/Serienlogs geprüft. Historischer Cloud-Erfolg und reine Rechen-/Ansichtstests nicht als heutiger SDK-/iPhone-Nachweis ausgegeben. Zentralen historischen Abschnitt ehrlich auf Umsetzung/Beleggrenzen benannt; falsche pauschale Erledigung entfernt. Keine Produktänderung oder Messläufe. Nächste Quellen17.09.

- 16:43 Codex19.09.: vier lokale Chats gelesen, automatische Zusammenfassungen/Modellwechsel nicht als neue Wünsche behandelt. Debugkasten, Teilen-Ende und Betreiber-/Lehrer-Unterscheidung am aktuellen Code und vorhandenen Teilentest abgeglichen; begrenzte Belege zentral ergänzt. Gesamt-Onboarding/ruhige Oberfläche/TikTok und Lehrerideen bestehenden Bereichen zugeordnet; historisches Repo-„getan“ kein aktueller Statusbeleg. Keine Produktänderung, Veröffentlichung oder Messung. Nächste Quellen18.09.

- 16:41 Codex22.09.: fünf Originalchats vollständig auf Betreiberblöcke geprüft; aktuelle Anmeldung, Feedbackloader/-zeile, leere Ansichten, Farben und Stoff-/Listenhinweise sowie erhaltene Anmelde-/Feedbacklogs abgeglichen. Acht konkrete Wunschgruppen zentral mit Beleggrenzen ergänzt, breite Wünsche bestehenden Bereichen belassen. B4 ergänzt tatsächlichen Formular-Rückkehrbeleg mit erhaltenem Ziel; B11 bleibt begrenzt. Keine neuen Tests/Produktänderung, Tempo bleibt gestoppt. Bestehende Minuten-Sicherung1792/5884 läuft. Nächste Quellen19.09.

- 16:37 Codex23.09.-Originalquellen d8804f6c/2172d51f/39dd51de samt Fortsetzung24.09.06:45 gelesen. Sieben kleine Wunschgruppen zentral zugeordnet: Grammatikfeld, versteckte Intervallzahlen, Überspringen, Pflichtauswahl, Wiederaufbau, Formular-Rückweg/Duplikat und Hürdenwortlaut. Aktuelle Formular-/Pflicht-/Zurück-/Textquellen und historische3.9.8/3.10.3-Berichte gelesen; B11-Assertions begrenzen Aussage auf Rahmen/Beschriftung, kein vollständiger Rückkehr-Beleg. Breite Onboarding-/Religions-/Monetarisierungswünsche in bestehenden Bereichen erhalten. Eigenen historischen Zahlenfehler in LEHREN§15 vermerkt, keine neue Doppelregel. Nächster Rest22.09.; Produkt unverändert, keine Tests.

- 16:35 Korrektur Codex: In der neuen Analysezeit-Zeile historische3.17.22-Konstanten als heutige Werte bezeichnet. Aktuelle Deklarationen ausdrücklich gelesen: Vorlauf700,Schritt820,Nachlauf1100ms; zentrale Zeile sichtbar berichtigt. Keine Produktänderung oder Messung, aus historischem Changelog keine aktuellen Werte mehr ableiten.

- 16:34 Codex beide24.09.-Originalchats gelesen, identische Nachricht nicht doppelt gezählt. Fünf Teilwünsche mit3.17.22/aktuellen renderEinstieg-, Hero-Timer-, Aufbauzeit- und Leisten-CSS-Stellen abgeglichen. Vollständigen erhaltenen t_hero_dreh-Log und tatsächliche Assertions gelesen, allgemeinen Einstieglog nicht als Beleg für Pfeilgefühl/Werbesatz ausgegeben. Kartendrehung passend geprüft, übrige Umsetzung mit Beleggrenzen zentral eingetragen. adrabic-oberflaeche angewandt. Ein rg-Aufruf mit Windows-Wildcard scheiterte, mit Suchwurzel/-g korrigiert; kein Ergebnis daraus behauptet. Nächster Rest23.09.; keine Tests/Produktänderung.

- 16:33 Codex historische Wunschprüfung fortgesetzt: Betreiberblöcke03./04.10. und29./30.09. gelesen, automatische task-notification nicht als Wunsch gezählt. Ruhetag-Speicherweg/SITZUNGS_LIMITS und erhaltenen E-Abnahmelog gelesen; E7 und ausdrückliches5-nein zentral belegt. Anmeldekritik29.09. durch eigene Betreiberkorrektur falsche Adresse eingeordnet, offene Geräte-/Start-/Methodikgrenzen erhalten. Caveman und adrabic-lernbelege genutzt. OpenAI Docs für dauerhafte Fortsetzung gelesen; ausdrücklich gewünschte ununterbrochene Arbeit als aktives Arbeitsziel eingerichtet. Fehlende CODEX_HOME-Variable bei optionaler Automationssuche führte vor jeder Änderung zu Lesefehler; keine Automation angelegt. Nächster Rest24.09. und ältere Chats; kein Produktbau/Testlauf/Deploy.

- 16:31 Codex Betreiber „arbeite ununterbrochen … caveman ständig“ aufgenommen. Caveman-Skill vollständig gelesen, dauerhaft für Antworten aktiviert; passende Fach-Skills weiterhin gezielt. Bestehende Minuten-Sicherung1792/5884 bestätigt. Veralteten Einstieg in Mehrwert-ARBEITSSTAND sichtbar korrigiert: Gesamtabnahme ausgeführt,157/158/Tempo-Sperre. Vorhandene Lernrunden-Vorbereitung nicht wiederholt; ausführbaren Rest der historischen Wunschprüfung vor05.10. aufgenommen. Kein neuer Messlauf/Produktbau, Entwurf erhalten.

- 16:28 Codex „weiter nach reihenfolger offener sacen“: aktuelle Übergabe/Reihenfolge und bestehende Sicherung1792/5884 bestätigt. Vorhandene Lernrunden-Vorbereitung vollständig gelesen; RUNDE-2/S1 und historischen Listenstatus gegen aktuelle Verständigungsregel geprüft. Nur Sammelfreigabe belegt, konkrete Einzelfreigabe unklar. Vorläufigen Stand und konkreten Vorschlag (Stift nach Aufdecken, vorhandenes Blatt, gleiche Karte/Runde) mit Nutzen/Nachteil dokumentiert. Keine neue Tempo-Diagnose, Tests, Produktänderung oder Paketfreigabe. Nächster Schritt konkrete Entscheidung, Bau weiter erst nach Datenabschluss.

- 16:24 Codex Fortsetzungsauftrag: AGENTS, aktuelle Übergabe, Betreiberregeln, STAND, LEHREN, CODEX-START, zentrale Offenliste und Tempo-Befund gelesen; A14–A17 und Paketabschluss-Sperre abgeglichen. Minuten-Sicherung1792/5884 vorhanden, nicht erneut gestartet. Entwurf erhalten, keine Diagnose/Messung oder Produktänderung. Innerhalb der beauftragten Grenzen kein weiterer Produktabschluss möglich; offene Entscheidung zur ausdrücklichen Wiederaufnahme der Tempo-Klärung in ALLES-OFFEN und PLAN festgehalten. Keine Abnahme/Commit/Veröffentlichung.

- 16:22 Codex Betreiberkorrektur „halt dich nicht so lang daran auf, du verschwendest tokens“ aufgenommen; weitere Tempo-Diagnose beendet. Nach Neustart Originaltest einmal219ms bei200ms rot, ganzen Log gelesen. Zwei gezielte Klicktraces am gleichen Stand gelesen: Original196ms/getrennte Eingabe170ms, gleiche Layoutfolge und End-DOM; Eingabezeit verändert, daher keine Testkorrektur/Freigabe. Lokale Playwright-Quelle zeigt zusätzlichen Hit-Target-Interceptor, dessen Anteil am ursprünglichen Rot nicht bewiesen ist; keine weitere Probe gestartet. Quellee595b5b6312244cd gleich,157 grüne erhalten. Keine Produktänderung, kein Paketcommit/Deploy. Dokumentation und Belege gesichert; Minuten-Sicherung1792/5884 läuft einzeln.

- 16:14 Codex Betreiber „weiter“ nach Neustart: Boot10.10.16:11:51/Netzteil2 bestätigt, fehlende Minuten-Sicherung und Server8097 jeweils neu gestartet. Serverquelle und tatsächlicher Runnerhashe595b5b6312244cd gleich. Unabhängige Rechenprobe am selben Chrome154.0.8037.98 abgeschlossen und vollständigen Log gelesen: CPU4x36,2–54,3ms/Median41,9, ohne Drosselung Median8,2/8,55; kein Verbesserungsbeleg. Unveränderter Original-Tempotest einmal aktiv, eigene neue Lognamen erhalten alte Belege. Kein Gesamtlauf/Produktbau/Deploy.

- 16:09 Codex gezielte Tempo-Diagnose abgeschlossen: Original/Browservariante/Original mit bestehender Messhilfe, alle Schriften vorher geladen und End-DOM identisch. content-visibility:visible setzt sofort1021 statt159/532 Layoutobjekte, keine Korrektur. Offline-Auswerter ordnet die großen Layouts in alten und neuen Traces nach dem Klick-Handler ein. Unabhängige feste Rechenprobe ohne App: CPU4x24,3–46,7ms bei identischer Prüfsumme, ohne Drosselung deutlich geringere Schwankung; keine Rot-Umdeutung. Alle vollständigen neuen Logs gelesen, Rohtraces gesichert. Hashquellee595b5b6312244cd und Originaltest unverändert;157 gültige grüne erhalten. Kein Produktfix/Commit/Deploy. Zentraler Anschluss: Betreiber-Neustart des seit07.10. laufenden Laptops, danach nur Rechenprobe und Originaltempo einmal; ursprüngliche Ursache weiterhin nicht vollständig belegt.

- Codex Anschluss der Datenabnahme: Übergabe, Tempo-Befund, Abnahmebericht und geltende Regeln gelesen; bestehende Minuten-Sicherung 12532/16564 bestätigt, keine zweite gestartet. Netzteilstatus 2. Vorhandene Rohtraces der beiden Quellen zeitlich zerlegt: erster Layoutdurchlauf liegt nach Ende des Klick-Handlers, zweiter nach dem Animationsbild; kein Beleg für einen erzwungenen großen Layoutdurchlauf innerhalb des Klick-Handlers. Aktuelle Kartenlisten-, Schriftvorlade- und content-visibility-Pfade gelesen. Produkt und ursprüngliche rote Belege unverändert; gezielte Zuordnung der beiden Layoutdurchläufe wird vorbereitet.

- Neuer lokaler Chat „Datenabnahme 3.18.30: Tempo klären“ gestartet: 01a12620-409a-7e33-8945-dcc4837f7a96. Konkreter Anschluss samt vorhandenen Diagnosen, Erhalt gültiger Prüfungen, unveränderter 200-ms-Grenze und Verbot neuer Pakete/Veröffentlichung übergeben; keine Modelländerung/zweite Sicherung veranlasst.

- Codex Anschluss auf Betreiberauftrag geprüft: aktuelle Übergabe, STAND-Einstieg und vollständigen TEXT-TEMPO-BEFUND gelesen; nächster Produktabschluss ist unverändert Datenabnahme 3.18.30, nicht neue Mehrwert-Funktion. Desktop-Projekt über App-Werkzeug identifiziert; neuer lokaler Chat wird mit gezielter Tempo-Klärung und Token-/Erhaltregeln gestartet. Kein Test/App-Code in diesem Chat geändert.

- 16:00 Codex Erledigungsprüfung zentral ergänzt: neun zusätzliche Prüfpositionen aus 05.–07.10. (sechs umgesetzte Wunschgruppen, zwei teilweise erledigte Gesamtwünsche, ein offener Listen-Sprung-Prüfrest); die zwei N1-Stellen gemeinsam gezählt. Historische und aktuelle erhaltene Listen-/Einwilligungslogs vollständig gelesen, Code/CSS und damaligen Umfang gegengeprüft. Textarten-Erklärung und N1-CSS nicht als neue Verständlichkeits-/Fotoabnahme ausgegeben. Unklare Schreibkritik zusätzlich ausdrücklich erhalten. Fehlende Unterideen/Varianten/Gegenreden aus R1/R2 in die elf vorhandenen Ideenbereiche eingefügt; TikTok-Bezüge mit vorhandenen Bereichen verbunden, keine neue Liste/Funktionsfreigabe. Alle 259 alten Tabellenpositionen thematisch erhalten, sieben schon vorher umbasierte Verweise sind keine verlorenen Aufgaben; lokale Linkziele vollständig vorhanden und gezieltes diff --check grün. Rest: ältere Originalchatwünsche vor 05.10. einzeln belegen. Datenabnahme weiter 157/158 mit offenem t_text_tempo; keine Produkttests neu gestartet, kein Produktcommit/Deploy, fremder Entwurf erhalten.

- Codex Fortsetzung der Erledigungsprüfung: aktuelle Übergabe, Betreiberregeln, zentrale Liste und Quellenabgleich gelesen; Minuten-Sicherung als bestehenden Prozessbaum 12532/16564 bestätigt, keine zweite gestartet. Originalchat a495c23a vom 05.–07.10. und damalige Wunschdateien mit Bauprotokollen zu 3.18.21/24/25 abgeglichen. Aktuellen Karten-Detailweg, Textarten-Erklärung, Widerruf-Erklärung und zwei CSS-Korrekturen gelesen; t_liste_zeigen und erhaltenen Klein-Log vollständig gelesen. Drei bereits zentral belegte Beispiele nicht neu abgenommen. Keine Produktänderung oder Datenabnahme; 3.18.30 und Fremdarbeit erhalten.

- Codex: Betreiberauftrag 10.10.: Reihenfolge passend halten, unnötige Dauer und Tokens vermeiden; neuen Chat mit zwingendem caveman gestartet: 01a12616-ac4c-7c31-b011-37917529c814. Frühere Wünsche auf Erledigung prüfen, vorhandene Belege wiederverwenden, keine neue große Ideensammlung. Produktreihenfolge und fremden Datenentwurf erhalten.

- Codex erste Erledigungskontrolle früherer Kleinigkeiten: Betreiberquellen 05.–07.10., CHANGELOG und gezielte Logbuchstellen gelesen. Handschrift/Vollbild 3.18.19, Tippen daneben 3.18.19/24 und Griff-Auslaufen 3.18.20 zentral mit Bau-/Prüfbelegen geführt. Rest Hintergrundscrollen und separaten schwankenden Griff-Test ausdrücklich offen belassen. Keine komplette historische Wunsch-Abnahme oder frischen Gerätebelege behauptet.

- 10.10. Codex: verstreute eigene TikTok-Ergänzungen bereinigt. Aktive Aufgabenbereiche der Mehrwert-GESAMTLISTE vollständig samt Status und umbasierter Verweise nach ALLES-OFFEN übernommen; ursprüngliche Tabellenzeilen maschinell auf Erhalt geprüft. Neue Ideen passenden Bereichen zugeordnet; alte Gesamtliste historisch, TikTok-Datei nur Originalquelle. Vier Fachpläne auf zentralen Eingang verwiesen, Betreiberpräferenz vereinheitlicht, alten Meldungsverlauf eingeklappt. Originalnachricht unverändert. Neuer Wunsch nach Erledigungsprüfung früherer Kleinigkeiten zentral offen erfasst; Herkunftsabgleich 34/34 Berichte ist kein Umsetzungsnachweis. Keine Produktänderung, kein neuer Agentenlauf, keine Datenprüfung/Veröffentlichung.

- 15:38 Codex Betreiberklarstellung aufgenommen: ausschließlich TikTok-Ideen passend mit Mehrwert/anderen offenen Punkten zusammenführen, Betreiber hat kein klares Gesamtbild. Aktuelle Übergabe/Arbeitsfolge/Quellenzuordnung gelesen, Minuten-Sicherung als ein Prozessbaum bestätigt. In GESAMTLISTE bei Reihenfolge sichtbare Zuordnung und Arbeitsweise je Bereich ergänzt: Bestand/neue Ideen zusammenführen, Recherche/Abhängigkeiten klären, konkreter gemeinsamer Arbeitsplan mit Prüfkriterien; keine zweite Warteschlange/Statusliste. ALLES-OFFEN/BETREIBER-VERSTEHEN/Quelle nachgezogen. Keine Produktänderung, keine Datenabnahme neu gestartet.
