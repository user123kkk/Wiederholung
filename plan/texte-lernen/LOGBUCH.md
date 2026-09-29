# Logbuch: Texte auswendig lernen

Letzter Eintrag zuerst. Plan: [`KONZEPT.md`](KONZEPT.md), [`WIEDERHOLEN.md`](WIEDERHOLEN.md).

### 2026-09-29 — Stufe 1: Daten, Regeln, Schalter, Ausschluss (3.18.0)

**Geändert:**
- `app.js`: `normCard` (+`textId`, Stufe von Zeilen ≤ 7, Zeilen bis
  `MAX_ZEILE` 1500), `normSet`/`normTextSet`/`normErgebnisse`/`normRegler`/
  `bereichAufteilen` (neu, nach `sternIcon`), `kartenFelder` (`textId` nur
  bei Zeilen), `setFelder`/`textSetFelder`, `bereichFelder` (Zeilen, Texte,
  Regler), `normBereiche`, `bereicheMapToArray`, `bereicheAusSammlungen`,
  Snapshot-Teilabgleich in `sammlungenStarten`, `persistAllAusfuehren`,
  `verarbeiteImportDaten` (neue Nummern für Zeilen/Texte, `textId` und
  `kreisPos` umgeschrieben), `deleteBereich` (Bereich nur mit Text gilt
  nicht als leer), `umzugStarten`; Konstanten `SET_ART_TEXT`,
  `TEXT_FEST_STUFE`, `TEXT_FEST_DATUM`, `KREIS_TAGE_*`, `MAX_ZEILE`;
  Schalter `texteFreigeschaltet()` (nach `istBetreiber`). Version 3.18.0
  (`app.js`, `sw.js`, `index.html` ×2), `CHANGELOG.md`.
- `firestore.rules`: `nutzerFelder` + `texteEinwilligung` (Datum/null,
  löschbar); `bereichFelder` + `abstandFaktor` (Zahl 0,5–1), `festErgebnisse`
  (≤ 50 aus 0/1); `kartenFelder` + `textId` (≤ 200, löschbar); `wort` bis
  1500 nur mit `textId`, Länge wird auch geprüft, wenn sich `textId` ändert.
- `plan/phase-1-datenzugriff/regeln-pruefung.mjs`: T01–T25.
- Prüfstand: `text_lib.js`, `t_text_felder.js`, `t_text_ausschluss.js` (neu);
  alle Tests lesen den Port aus `PRUEF_PORT` (Standard 8099, 23 Dateien,
  nur die URL) – nötig, weil eine parallele Session (Großplan-Runde 15,
  eigener Worktree) Port 8099 belegt.
- `plan/texte-lernen/KONZEPT.md` § 7.5 (Restrisiko Set-Art), § 7.6 (neu),
  `plan/LEHREN.md` § 15 (Backslash-Vorfall).
**Entscheidung:**
- *Getrennte Listen im Speicher* (§ 7.6) statt 35 einzelner
  `!c.textId`-Filter. Grund: robust auch für künftigen Karten-Code; weniger
  Stellen (nur die Lade- und Schreibwege) statt vieler. Speicherung in der
  Cloud wie im Plan.
- *Neue Felder nur, wenn gesetzt* (`textId`, Regler). So schreiben normale
  Karten und Bereiche auch vor dem Regel-Deploy fehlerfrei (LEHREN § 8.1).
- *Zeilen bis 1500 Zeichen* statt Aya 2:282 zu teilen (Abweichung von
  § 7.4 für Quran-Texte): Eine Aya bleibt ein Lernschritt (T2), die
  Aya-Nummern bleiben durchgehend. Eigene Texte über 1500: Stufe 2 bietet
  Teilen an.
- *`sure` im Text-Set* (nur bei `quelle: "tanzil"`), damit „weicht vom
  Original ab“ (§ 9.5) die Aya finden kann. Set-Inhalte prüfen die Regeln
  nicht, keine Regeländerung nötig.
- *Schalter* `texteFreigeschaltet()` ist bewusst strenger als
  `istBetreiber()` (auch bei leerer Liste aus). Er steuert nur das Angebot;
  Laden und Schreiben funktionieren für jedes Konto.
- *Einwilligung:* In Stufe 1 nur Regel und Regeltest; Lesen/Schreiben kommt
  mit dem Einwilligungs-Dialog in Stufe 2.
- *`portion`* (WIEDERHOLEN.md § 10) wird nirgends sonst beschrieben – nicht
  angelegt. Bei Bedarf in Stufe 4.
**Tests:** Regeln 204/204 (Emulator); Gegenprobe mit Regeln aus `48002ad`:
7 abgelehnt (T01, T05, T08, T09, T12, T13, T21), wie erwartet.
`t_text_felder.js` OK in allen fünf Wegen (Neuladen, Vollschreiben, Import,
Umzug, Snapshot-Echo); `--gegenprobe` (app.js `48002ad`): alle fünf rot.
`t_text_ausschluss.js`: Konto mit Text zeigt Lernen/Verwalten/Fortschritt
Wort für Wort gleich wie ohne, Runde „Karte 1 von 12“ in beiden, Suche und
Duplikat-Warnung finden keine Zeile; `--gegenprobe`: 10 Unterschiede
(u. a. „Karte 1 von 18“, „50 Karten“). Regressionen (Chrome 154,
Windows, Port 8199, Quellstand `99601bb6…`): `abnahme_runde.js` 13/13 OK
(Ausgaben „(lesen)“ gelesen), `t_sprung`, `t_kontrast`, `t_a11y`,
`t_einstieg` (alle Geräte, 0 Sprünge, 0 Kontrastfunde), `t_quran_datei`,
`t_daten`, `t_persist`, `t_import_doppelt`, `t_import_stapel`,
`t_karten_snapshot`, `t_bereiche`, `t_konto_stapel` – alle Exit 0.
`pruefe_stand.mjs` grün, `node --check app.js` sauber.
**Gegenprüfung:** gelesen: kompletter `git diff app.js` (Stellen oben),
`firestore.rules`-Diff, alle Aufrufer von `kartenFelder`/`pfadKarte` mit
ganzem Wert (5594, 5013, 4607 … schreiben nur über `kartenFelder`;
`persistCardGrade` nur Einzelfelder), `kontoDatenLoeschen` und
`kartenEinesBereichsLoeschen` (löschen per Sammlung bzw. `bereichId` –
Zeilen gehen mit), `exportBackup` (serialisiert `bereiche` samt
`zeilen`/`texte`). Gefunden und behoben: (1) Regel ließ eine lange Zeile
durch, wenn nur `textId` gelöscht wurde (T25 rot → Prüfung auch bei
`textId`-Änderung); (2) zwei Regex ohne Backslash (LEHREN § 15);
(3) `deleteBereich` hielt einen Bereich nur mit Text für leer und löschte
ohne Sicherung. Nicht geprüft: echtes Firebase, echtes iPhone.
**Offen:**
- **Betreiber:** Regeln veröffentlichen, **vor** dem Hosting von 3.18.0
  (PLAN „Was Du noch tun musst“).
- Parallele Großplan-Runde 15 (3.17.57) in `C:/Users/USER/Wiederholung-r15`;
  wer zuerst pusht, auf den rebased der andere. Version springt nie zurück.
- Löschen-Dialog und Konto-Löschen nennen Texte noch nicht (Stufe 2).
**Nächster Schritt:** Regressionen auswerten, dann Commit 3.18.0 und
Stufe 2 (Anlegen selbst/Quran, Einwilligung, Bearbeiten, Löschen,
Sicherung, Datenschutzerklärung).

### 2026-09-29 — Stufe 0: Quran-Quelle, Datei, Prüfsumme, Code-Stellen, Fixtures

**Geändert:** `quran/tanzil-uthmani.txt`, `quran/tanzil-quran-data.xml`
(neu, unverändert von tanzil.net), `.gitattributes` (`quran/** -text`),
`plan/werkzeuge/pruefstand/t_quran_datei.js` (neu),
`plan/werkzeuge/pruefstand/fixtures/quran_stellen_erzeugen.js` und
`fixtures/quran-stellen.json` (neu), `plan/texte-lernen/KONZEPT.md` § 9,
§ 14, § 17.
**Entscheidung:**
- *Quelle:* King-Fahd-Entwicklerseite (`qurancomplex.gov.sa/en/techquran/dev/`)
  wieder nicht erreichbar (WebFetch: `ECONNREFUSED`, curl: Zeitüberschreitung
  nach 20 s). Bedingungen damit nicht belegbar → nach § 9 **Tanzil
  Uthmani 1.1**. Bedingungen wörtlich aus dem Lizenzblock der Datei:
  verbatim kopieren und verbreiten erlaubt, Ändern nicht; in Apps nutzbar,
  wenn die Quelle (Tanzil Project) deutlich genannt und auf tanzil.net
  verlinkt wird; der Copyright-Hinweis gehört in jede Kopie. Lizenz
  CC BY 3.0 (https://tanzil.net/docs/text_license). Der Download verlangt
  „I agree with Terms of Use“ – Betreiber hat im Chat zugestimmt.
- *Download:* `https://tanzil.net/pub/download/index.php?marks=true&sajdah=true&tatweel=true&quranType=uthmani&outType=txt-2&agree=true`
  = Standard-Häkchen der Seite (Pausen- und Sajda-Zeichen, Tatweel an;
  Rub-Zeichen aus). Metadaten: `https://tanzil.net/res/text/metadata/quran-data.xml`.
- *SHA-256:* Text `6933e133dd56db778c801bf738848454e43648105a151e8d84d86a7cae39ec5f`
  (1 396 087 Byte), Metadaten `8867c1d88191472adec9db694b3cd9f135b1a2ef580574d32cf888dcb22c5c7a`
  (77 234 Byte). UTF-8 ohne BOM, LF.
- *Zählung:* 114 Suren, 6236 Ayat, lückenlos in Reihenfolge, Aya-Zahl je
  Sure = Metadaten (Summe 6236).
- *Kein JSON:* Die App soll die Originaldatei selbst lesen, statt eine
  umgewandelte Kopie. Grund: Lizenz verbietet Ändern; die Prüfsumme gilt
  dann für genau die ausgelieferte Datei. Abweichung in § 9 vermerkt.
- *Basmala:* in der Quelldatei ist sie bei Sure 1 eigene Aya 1, bei den
  anderen Suren (außer 9) den ersten Wörtern von Aya 1 vorangestellt. Bleibt
  so (§ 15 „so wie in der Quelldatei“).
- *Lange Aya:* nur 2:282 (1208 Zeichen) liegt über `MAX_WORT`/Regel 1000.
  Nächstlängste 24:31 (766). Lösung nach § 7.4 in Stufe 2: an Wortgrenze
  teilen, Text unverändert.
- *Code-Stellen § 14:* Skript ordnet jede Zeile mit `.karten`/`currentCards()`
  ihrer Funktion zu → dieselben 51 Funktionen wie im Plan. Zusätzlich fünf
  Stellen, die Felder still verwerfen (`normCard`, `normSet` mit „text“ →
  „eigen“, `bereicheAusSammlungen`/`bereicheMapToArray` mit fester
  Set-Feldliste, `SET_ARTEN` in `setArtSheet`/`setArtAendern`) – in § 14
  ergänzt.
- *Fixtures:* nur Fundstellen + SHA-256 je Zeile, kein Wortlaut
  (LEHREN § 2). Tests lesen den Text aus der Quelldatei. 13 Stellen: Sure 1
  ganz, 2:1 (Basmala vorangestellt), 2:2 (Wort nur aus Waqf-Zeichen),
  2:282, 7:206 (Sajda), 9:1, 114:6. Für die späteren Tests gezählt: 3698
  Ayat mit Tatweel, 2652 mit Wort nur aus Waqf-Zeichen, 15 mit Sajda-Zeichen.
- *Keine Version:* Stufe 0 ändert kein Verhalten der App (`app.js`,
  `index.html`, `sw.js` unverändert; die Dateien unter `quran/` werden
  erst ab Stufe 2 geladen). Deshalb keine neue `APP_VERSION`; die erste
  Version des Baus kommt mit Stufe 1.
**Tests:** `node t_quran_datei.js` → 114 Suren, 6236 Ayat, 13 Stichproben
grün. Gegenproben (ein Shadda entfernt, eine Zeile entfernt, CRLF) jeweils
rot. `pruefe_stand.mjs` grün.
**Gegenprüfung:** gelesen: `git diff` (nur `.gitattributes` + neue Dateien),
Testcode gegen Befund (prüft Byte-Gleichheit, nicht nur Zeilenzahl – eine
geänderte Harakat fällt auf), Quelldatei-Kopf/Lizenzblock, `firebase.json`
(`quran/` wird ausgeliefert, nicht in `ignore`; Standard-Cache-Header). Nach
dem Commit: `git archive` (so exportiert `veroeffentlichen.ps1`) mit
`core.autocrlf=true` liefert dieselbe Prüfsumme (`e3438d3`: `6933e133…`,
Metadaten `8867c1d8…`). Gegenprobe: frischer Klon, Zeile `quran/** -text`
entfernt, gleiches `git archive` → `9e1a1336…` (Windows-Zeilenenden, rot).
Die Zeile in `.gitattributes` ist also nötig. Gefunden: nichts Weiteres.
**Offen:** (1) Darstellung des Tanzil-Textes mit der vorhandenen Schrift
`UthmanicHafs1Ver18.ttf` (King-Fahd-Kodierung) – in Stufe 2 am Bildschirm
prüfen (§ 8.3). (2) Quellenangabe + Link im Impressum und unter der
Sure-Auswahl – Stufe 2. (3) King-Fahd-Bedingungen bleiben unbelegt; ein
Wechsel später nur mit neuer Datei, neuer Prüfsumme und Test.
**Nächster Schritt:** Stufe 1 (§ 12): Daten (`textId`, Set-Art „text“,
Kreis- und Bereichsfelder durch alle F-Stellen), Firestore-Regeln mit
Emulator-Gegenprobe, Probelauf-Schalter, Ausschluss an allen A-Stellen;
Tests `t_text_ausschluss.js`, `t_text_felder.js`, `abnahme_runde.js` 13/13.

### 2026-09-29 — Bauauftrag; Arbeitsbaum für den Bau freigemacht

**Geändert:** `plan/PLAN.md` (Wo eine neue Session anfängt),
`plan/texte-lernen/KONZEPT.md` (Status, nächster Schritt), dieses Logbuch
neu, `plan/grossplan/runde15-unfertig.patch` (Sicherung).
**Entscheidung:** Betreiber: erst dieser Bau, dann die Codex-Runden, dann
Gesamtprüfung und neue Runden; Bau in einem neuen Claude-Chat. Im
Arbeitsbaum lag Codex' unfertige Runde 15 (3.17.57, 25 Dateien). Sie ist
nicht verworfen: `git stash` („Codex Runde 15 unfertig …“) und als Patch im
Repo; `git apply --check` gegen `a4b5677` erfolgreich. Der Bau startet von
`main` = 3.17.56.
**Offen:** Quran-Quelle/Bedingungen (Stufe 0). Weißes Aufblitzen beim Start
ist ein eigener offener Punkt, nicht Teil des Baus. Runde 15 nach dem Bau
einspielen.
**Nächster Schritt:** Stufe 0 nach `KONZEPT.md` § 12: Quran-Quelle und
Bedingungen klären, Datei + SHA-256, Zählung 114/6236; Liste § 14 gegen den
aktuellen Code prüfen; Fixtures.
