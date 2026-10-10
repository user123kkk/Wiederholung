# Übergabe – Stand von 10.10.2026 21:24 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `1ce9dc15 Sicherung 21:23 (automatisch, jede Minute)`
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

## 10.10.2026 – bedingtes Ja zu Runde fortsetzen prüfen

Betreiber: „sei sicher es ist gut, wenn ja dann ja oder“. Bedingte Freigabe
für den einzeln erläuterten Umfang, keine Gewissheitsbehauptung. Daten-
und Lernbeleg-Skills angewandt. Wegen Speicher-/Doppelzählungsrisiken
gezielte Abwägung mit Council und Quellenprüfung; kein neuer Tempo-Lauf.

## 10.10.2026 – nächster konkreter Vorschlag angefragt

Nach H1-Abschluss „Runde fortsetzen“ einzeln erklärt: normale Abfrage,
dieses Gerät/Konto, gleicher Lerntag, Restfolge ohne erneutes Zählen alter
Antworten, neuer Start alternativ möglich. Vorteil: Pause ohne Verlust
der Restfolge. Nachteil: zusätzlicher Knopf und nach erneutem Öffnen kein
Undo für die Antwort vor der Pause. Empfehlung so bauen; konkrete Antwort
steht aus. ENTSCHEIDUNGEN-VERSTEHEN gilt; noch keine Produktänderung dafür.

## 10.10.2026 – H1 Commit/Push bestätigt

`cc16f0de` auf origin/main bestätigt; Produktdateien sauber. Fremde
gestagte Skill-/Werkzeugarbeit erhalten, kein Deploy. Anschlussvorbereitung
„Runde fortsetzen“ gelesen: alte Frage 22 deckt weder alle Modi noch einen
konkreten Speicherweg ab. Nächster Einzelvorschlag begrenzt auf normale
Abfragerunden, dieses Gerät/Konto und denselben logischen Lerntag.

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
