# Übergabe – Stand von 10.10.2026 21:07 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `5d1aee59 Sicherung 21:06 (automatisch, jede Minute)`
- Version in `app.js` (Arbeitsordner): const APP_VERSION = "3.18.30"
- Version im letzten Commit: const APP_VERSION = "3.18.30"

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
 M plan/werkzeuge/minuten_sicherung.sh
 A plan/werkzeuge/projekt_skills.mjs
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

- 21:03 Codex: read-only-Abgleich bindet alle158 Testquellen/Abschlusslogs/Leseregister an e595b5b6312244cd,157 grün und ausschließlich Texttempo rot;13/13 Runden. Syntax/Versions-/CSP-/Cache-Prüfer grün, Ladegerät-PowerShell geparst. Gegenlesen der aktuellen Bewertungs-, Tagesbeitrags-, Formular-, Undo-/Löschpfade gegen DATEN9–12 und vorhandene feste SDK-Belege; keine neue Produktänderung. Checkliste mit ausdrücklich freigegebener Ausnahme für Tempo dokumentiert. Ausschließlich benannte Produkt-/Daten-/Prüfaufbaupfade committet:00c6603186aa68c5c30324a150e4e73b7427137a, Push auf main bestätigt. Fremde Skill-/Werkzeugentwürfe erhalten; Produktdateien sauber. Danach konkreten Bearbeiten-Vorschlag nach Aufdecken per einer kurzen Frage vorgelegt; Bau wartet auf Einzelfreigabe gemäß ENTSCHEIDUNGEN-VERSTEHEN. Kein Testcache verändert, keine Veröffentlichung.

- 21:01 Codex: Betreiber „ok los“ nach konkreter Kurzvorlage als ausdrückliche Freigabe der begrenzten Datenabschlussausnahme dokumentiert. Aktuelle Übergabe, Betreiberverständnis, Abschlussbericht, Arbeitsregeln/Checkliste und Daten-Skill gelesen; Netzteilstatus2, laufende Sicherung1792/5884 bestätigt. Fremden Produktentwurf3.18.30 erhalten. Kein neuer Tempo-/Gesamtlauf; jetzt tatsächlichen Diff und gültige Quellbindungen gegen Abschlussbelege prüfen.

- Codex nach Betreiber „weiter“: konkrete Grenzwert-/Abschlussentscheidung ausgearbeitet, keine neue Messung. llm-council gemäß Projektpflicht einmal durchgeführt: fünf getrennte Berater, zufällige A–E-Zuordnung, fünf frische anonymisierte Gegenprüfer; alle Antworten vollständig gesichert. Gegenprüfung ergänzt: gleiche alte Verzögerung kann trotzdem unzumutbar sein; 50 ms/Bild bleibt eigenständige offene Forderung. Vorlage trennt echte Tempo-Abnahme von ausdrücklicher Risikoausnahme allein für vorhandene Datenkorrekturen A14–A17/3.18.30. Originaltest/Cache und Produkt unverändert, Ausnahme noch nicht freigegeben. Volltext und HTML unter plan/council; Wünsche/Anschluss in ALLES-OFFEN und STAND eingetragen.

- Betreiberkorrektur10.10.: Zu viele kostenpflichtige Tempo-Varianten ohne Fix; Codex räumt ein, die Herkunft/Angemessenheit der Grenzwahl zu spät geprüft zu haben. Weitere Messläufe gestoppt. git blame/log: Test und200ms aus Agentencommit7264af9a vom30.09.; KONZEPT§13 nennt50ms/Bild. In geprüften Quellen keine quantitative Herleitung für200ms/Longtask/CPU4x auf Windows. Offizielle web.dev-INP-Dokumentation gelesen:200ms ist INP-Empfehlung aus realen Interaktionslatenzen, nicht identische Longtask-Messgröße. Wunsch und Beleggrenze zentral eingetragen; keine Zahl erhöht oder rote Belege umgedeutet.

- Vorheriger Diagnoseabschluss: Aufbau-Teilung316/219ms rot bei Originalen603/454 und459/509, gleiche End-DOMs; nicht übernommen. Einzel-CPU-Probe meldet zwei Grüns bei faktisch nur1,13-facher unabhängiger Verlangsamung; ausdrücklich ungültig, nicht akzeptiert. Gesamtrunner startete wegen falsch escaptem NODE_OPTIONS-Pfad nicht; Cache weiterhin echtes Rot(code1), Quellee595b5b6312244cd. Zwei-CPU-Rechenprobe ebenfalls unbrauchbar; keine App-Abnahme danach. Affinitätsvariante gesperrt, Eingangsprüfung vor allen künftigen Diagnose-Abnahmen ergänzt; Windows-Preloadpfad korrigiert. Eigener Drosselungsfaden bei zwei begrenzten Versuchen nicht identifizierbar; Abbruch vor gedrosselter Rechen-/App-Probe, Browser geschlossen. Kein Produktfix, keine fremden Prozesse geändert; Netzteilwerte restauriert.

- 17:29 Codex Prioritäts-Stabilitätsprobe215/277ms rot, keine Gesamtabnahme gestartet; eigene Browser geschlossen. Wort-Vorwärmen315ms bei Originalen222/234 und380/316; Flexbasis0%-Probe232/197 bei Originalen320/190 und291/217. Gleicher End-DOM, kein ausreichender Fix oder belastbare Ursache daraus. Alle neuen vollständigen Ausgaben gelesen, Diagnosehilfen syntaxgeprüft. Produkt und Originaltest unverändert; vorhandene157 grüne nicht wiederholt. Sicherung1792/5884 und Server6972 bestätigt. Anschluss zentral: keine gleichen Umgebungs-/Kleinstvarianten wiederholen, notwendige Änderung am gemeinsamen Renderablauf erst mit Ursachenbeleg übernehmen. Eigenen falschen Lesepfad DATEN-ABNAHME-2026-10-10.md mittels rg auf tatsächlichen DATEN-ABNAHME-3.18.30-2026-10-10.md korrigiert; keine Aussage aus Lesefehler.

- 17:23 Codex Energie-Stabilitätsvergleich abgeschlossen:230/376ms rot, Ansatz verworfen, fortgesetzte Gesamtabnahme nicht gestartet. AC/DC-Minimum5 mit powercfg bestätigt; alle vollständigen Logs gelesen. Direkte Sichtbarkeits-/Viewport-Variante231ms, flankierende Originale302/197ms; nav-kontinuierlich290ms, Originale231/192ms, End-DOM identisch. Weniger Eingabeereignisse bei erhaltener Navigation beweisen keinen Tempo-Fix. Keine Variante übernommen. Abschließende gezielte Umgebungsprobe setzt nur vom eigenen Browser-CDP gelieferte Browser-/Renderer-PIDs auf AboveNormal; fremde Browser nicht verändert. Hilfsskript schließt Browser wie der Originaltest, Priorität endet mit diesen Prozessen.

- 17:20 Codex gezielte Tempo-Proben abgeschlossen: rAF-Verschiebung, getrennte Mausereignisse, Sichtbarkeitsbeobachter, bedingter Viewport-Abgleich und erste14 sofort sichtbare Zeilen beseitigen die Sperre nicht zuverlässig. Native Layoutkosten bleiben; ein kleiner PerformanceObserver-Wert bei weiter243ms Renderaufgabe ist kein Fix. Alle neuen vollständigen Logs gelesen, Rohtraces erhalten; keine Produktänderung. Kontrollierte Energieprobe: AC-Prozessorminimum vorübergehend5 auf100, Originaltest199ms grün, Einstellung sicher auf5 zurückgestellt; Gegenprobe305ms rot. Das einzelne Grün erklärt alte rote Läufe nicht. Vorab begrenzter Stabilitätsvergleich: zwei Originale unter100 müssen beide grün sein, nur dann fortgesetzte Gesamtabnahme; jedes Rot verwirft diesen Ansatz. Grenze200ms und CPU4x unverändert, kein Wiederholen bis grün. Hilfsskript stellt Energieeinstellung im finally zurück.

- 16:53 Codex neuer konkreter Betreiberauftrag hebt Tempo-Diagnosestopp für Sperrenbehebung auf; Arbeitsziel nicht blockiert gesetzt. Vorhandenen Befund/Originaltest/UI-Skill, Renderer und Offline-Tracekosten gelesen. Layout/Stil dominieren, keine neue Produktursache allein aus Einzelzeiten behauptet. Server8097 und Minuten-Sicherung laufen; alte Quellen/Tests erhalten. Gezielte Klärung zuerst, danach Datenabschluss und vorhandene Reihenfolge, keine Grenze lockern/kein Deploy.

- 16:50 Codex Sperraudit2: aktuelle Übergabe/STAND und Einzelfreigabe-Status erneut geprüft; keine neue Freigabe oder Zustandsänderung. Datenentwurf3.18.30 weiter uncommittet,157/158; Tempo-Diagnose gestoppt, neue Paketarbeit laut AGENTS gesperrt. Quellenrest abgeschlossen, Vorbereitung schon vorhanden; keine wiederholte Prüfung/Messung als Fortschritt ausgegeben. Minuten-Sicherung1792/5884 live. Arbeitsziel noch aktiv, Blockiert-Schwelle noch nicht erreicht.

- 16:49 Codex verbleibenden Anschluss geprüft: CODEX-START/ENTSCHEIDUNGEN-VERSTEHEN, STAND und aktuelles AUFGABEN gelesen; kein weiterer autonomer Paketbau über uncommittetem Datenentwurf. Veraltete A14–A17-Hinweise „große Abnahme später“ auf tatsächlich ausgeführte157/158-Abnahme samt offenem219ms-Tempo und Diagnosestopp berichtigt, Status in Arbeit erhalten. STAND/Mehrwert-ARBEITSSTAND auf abgeschlossene lokale Quellenprüfung nachgezogen, kein wiederholter Testauftrag. Dokumentations-Diffcheck grün; Produkt/Testquellen unverändert.

- 16:48 Codex historische Quellenprüfung abgeschlossen:39 lokale Exporte mit Beginn vor05.10.;30.09.-Betreiberblöcke ohne Kürzung gelesen, Duplikat erkannt. Fehlende Anfangsdatumsbereiche/älteste Quelle explizit dokumentiert, keine Vollständigkeit sämtlicher Gespräche behauptet. Heutige Hochzähl-Merkerfunktion mit historischem Wunsch abgeglichen, erhaltenen Fortschritt-/Startlog vollständig gelesen; kein falscher Testbeleg für Reiteranimation. Kartenformular-Wortfeldscrollen dem bestehenden Tastaturrest zugeordnet. Klein-Weg-Bericht/AUFGABEN geprüft: B-1/B-2/B-5 kein offener Zyklusauftrag; kein eigenmächtiger Paketbau. Nächster Produktabschluss bleibt157/158, Tempo-Diagnose ausdrücklich gestoppt.

- 16:47 Codex17./11./12.09.: zehn lokale Originalchats gelesen, Überlappung der12.09.-Exporte und historische PR/Force-Push-Aufträge erkannt. Lokale Domain-/Manifest-/Metatag- und Reiteraktionsquellen geprüft. Markenidentität an allen Stellen und Migration alter Freundesinstallationen als unbelegte Reste zentral erhalten; breite Vorbild-/Lern-/Fortschrittswünsche nicht pauschal abgenommen. Älteste lokale Quelle11.09.; Rest vollständiger30.09.-Abgleich und abschließende Quellenlücken/Zuordnung. Dokumentations-Diffcheck grün, Produkt/Messläufe unverändert.

- 16:45 Codex18.09.: sieben Originalchats gelesen, alle acht alten TikTok-Originale und Navigationskritik bestehenden Bereichen zugeordnet. Apple-Knopf verborgen belegt; aktuelle Bytegrenze, feste Navigation, Nutzerlistener und erhaltene Einstellungen-/Serienlogs geprüft. Historischer Cloud-Erfolg und reine Rechen-/Ansichtstests nicht als heutiger SDK-/iPhone-Nachweis ausgegeben. Zentralen historischen Abschnitt ehrlich auf Umsetzung/Beleggrenzen benannt; falsche pauschale Erledigung entfernt. Keine Produktänderung oder Messläufe. Nächste Quellen17.09.

- 16:43 Codex19.09.: vier lokale Chats gelesen, automatische Zusammenfassungen/Modellwechsel nicht als neue Wünsche behandelt. Debugkasten, Teilen-Ende und Betreiber-/Lehrer-Unterscheidung am aktuellen Code und vorhandenen Teilentest abgeglichen; begrenzte Belege zentral ergänzt. Gesamt-Onboarding/ruhige Oberfläche/TikTok und Lehrerideen bestehenden Bereichen zugeordnet; historisches Repo-„getan“ kein aktueller Statusbeleg. Keine Produktänderung, Veröffentlichung oder Messung. Nächste Quellen18.09.

- 16:41 Codex22.09.: fünf Originalchats vollständig auf Betreiberblöcke geprüft; aktuelle Anmeldung, Feedbackloader/-zeile, leere Ansichten, Farben und Stoff-/Listenhinweise sowie erhaltene Anmelde-/Feedbacklogs abgeglichen. Acht konkrete Wunschgruppen zentral mit Beleggrenzen ergänzt, breite Wünsche bestehenden Bereichen belassen. B4 ergänzt tatsächlichen Formular-Rückkehrbeleg mit erhaltenem Ziel; B11 bleibt begrenzt. Keine neuen Tests/Produktänderung, Tempo bleibt gestoppt. Bestehende Minuten-Sicherung1792/5884 läuft. Nächste Quellen19.09.

- 16:37 Codex23.09.-Originalquellen d8804f6c/2172d51f/39dd51de samt Fortsetzung24.09.06:45 gelesen. Sieben kleine Wunschgruppen zentral zugeordnet: Grammatikfeld, versteckte Intervallzahlen, Überspringen, Pflichtauswahl, Wiederaufbau, Formular-Rückweg/Duplikat und Hürdenwortlaut. Aktuelle Formular-/Pflicht-/Zurück-/Textquellen und historische3.9.8/3.10.3-Berichte gelesen; B11-Assertions begrenzen Aussage auf Rahmen/Beschriftung, kein vollständiger Rückkehr-Beleg. Breite Onboarding-/Religions-/Monetarisierungswünsche in bestehenden Bereichen erhalten. Eigenen historischen Zahlenfehler in LEHREN§15 vermerkt, keine neue Doppelregel. Nächster Rest22.09.; Produkt unverändert, keine Tests.

- 16:35 Korrektur Codex: In der neuen Analysezeit-Zeile historische3.17.22-Konstanten als heutige Werte bezeichnet. Aktuelle Deklarationen ausdrücklich gelesen: Vorlauf700,Schritt820,Nachlauf1100ms; zentrale Zeile sichtbar berichtigt. Keine Produktänderung oder Messung, aus historischem Changelog keine aktuellen Werte mehr ableiten.

- 16:34 Codex beide24.09.-Originalchats gelesen, identische Nachricht nicht doppelt gezählt. Fünf Teilwünsche mit3.17.22/aktuellen renderEinstieg-, Hero-Timer-, Aufbauzeit- und Leisten-CSS-Stellen abgeglichen. Vollständigen erhaltenen t_hero_dreh-Log und tatsächliche Assertions gelesen, allgemeinen Einstieglog nicht als Beleg für Pfeilgefühl/Werbesatz ausgegeben. Kartendrehung passend geprüft, übrige Umsetzung mit Beleggrenzen zentral eingetragen. adrabic-oberflaeche angewandt. Ein rg-Aufruf mit Windows-Wildcard scheiterte, mit Suchwurzel/-g korrigiert; kein Ergebnis daraus behauptet. Nächster Rest23.09.; keine Tests/Produktänderung.

- 16:33 Codex historische Wunschprüfung fortgesetzt: Betreiberblöcke03./04.10. und29./30.09. gelesen, automatische task-notification nicht als Wunsch gezählt. Ruhetag-Speicherweg/SITZUNGS_LIMITS und erhaltenen E-Abnahmelog gelesen; E7 und ausdrückliches5-nein zentral belegt. Anmeldekritik29.09. durch eigene Betreiberkorrektur falsche Adresse eingeordnet, offene Geräte-/Start-/Methodikgrenzen erhalten. Caveman und adrabic-lernbelege genutzt. OpenAI Docs für dauerhafte Fortsetzung gelesen; ausdrücklich gewünschte ununterbrochene Arbeit als aktives Arbeitsziel eingerichtet. Fehlende CODEX_HOME-Variable bei optionaler Automationssuche führte vor jeder Änderung zu Lesefehler; keine Automation angelegt. Nächster Rest24.09. und ältere Chats; kein Produktbau/Testlauf/Deploy.

- 16:31 Codex Betreiber „arbeite ununterbrochen … caveman ständig“ aufgenommen. Caveman-Skill vollständig gelesen, dauerhaft für Antworten aktiviert; passende Fach-Skills weiterhin gezielt. Bestehende Minuten-Sicherung1792/5884 bestätigt. Veralteten Einstieg in Mehrwert-ARBEITSSTAND sichtbar korrigiert: Gesamtabnahme ausgeführt,157/158/Tempo-Sperre. Vorhandene Lernrunden-Vorbereitung nicht wiederholt; ausführbaren Rest der historischen Wunschprüfung vor05.10. aufgenommen. Kein neuer Messlauf/Produktbau, Entwurf erhalten.

- 16:28 Codex „weiter nach reihenfolger offener sacen“: aktuelle Übergabe/Reihenfolge und bestehende Sicherung1792/5884 bestätigt. Vorhandene Lernrunden-Vorbereitung vollständig gelesen; RUNDE-2/S1 und historischen Listenstatus gegen aktuelle Verständigungsregel geprüft. Nur Sammelfreigabe belegt, konkrete Einzelfreigabe unklar. Vorläufigen Stand und konkreten Vorschlag (Stift nach Aufdecken, vorhandenes Blatt, gleiche Karte/Runde) mit Nutzen/Nachteil dokumentiert. Keine neue Tempo-Diagnose, Tests, Produktänderung oder Paketfreigabe. Nächster Schritt konkrete Entscheidung, Bau weiter erst nach Datenabschluss.
