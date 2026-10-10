# Übergabe – Stand von 10.10.2026 21:19 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `cc16f0de 3.18.31: Eigene Karte direkt in der Runde bearbeiten`
- Version in `app.js` (Arbeitsordner): const APP_VERSION = "3.18.31"
- Version im letzten Commit: const APP_VERSION = "3.18.31"

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

- Prozesse: node.exe 4, chrome.exe 0 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

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

## 10.10.2026 – H1 gezielt abgeschlossen

Stift und Aktionsschutz gebaut; vorhandenen Editor ohne Sitzungswechsel
wiederverwendet. Sechs Konfigurationen und acht echte SDK-Formularfälle
grün. Blatt, Snapshot, Neben-Tippen und Sprung grün; Bilder geprüft.
Gegenprüfung des vollständigen Produktdiffs und LEHREN §14 abgeschlossen.
Version 3.18.31 konsistent; eigener Server liefert identische Quellen.
Gezielter Commit/Push folgt, fremde gestagte Arbeit bleibt erhalten.
Abnahme nach Klein-Weg, kein Gesamtlauf und kein Deploy. Tempo bleibt offen.

## 10.10.2026 – H1 konkret beauftragt

Betreiber: „ic glaub ja, was sagst du“ auf den erläuterten Stift-Vorschlag.
Empfehlung ja. H1 als zusätzlicher Einstieg in das vorhandene Kartenblatt
zugeordnet; Grenzen im Befund festgehalten. Caveman dauerhaft,
Oberflächen-Skill angewandt. Klein-Weg: vorhandenes Muster, keine neue
Lernregel oder neuer Bildschirm; Gegenprobe und betroffene Tests.

Zwischenspeicher nach `LEHREN.md` § 1.9: spätestens nach jedem
Arbeitsschritt eine Zeile mit Uhrzeit (was gelesen, geprüft, geändert,
gemessen wurde), dann committen und pushen. Neueste Zeile oben. Ist der
Inhalt im Logbuch oder in `ALLES-OFFEN.md` angekommen, werden alte Zeilen
gelöscht; die letzte Zeile sagt dann, wohin sie gewandert sind.

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
