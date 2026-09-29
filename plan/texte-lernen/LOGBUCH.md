# Logbuch: Texte auswendig lernen

Letzter Eintrag zuerst. Plan: [`KONZEPT.md`](KONZEPT.md), [`WIEDERHOLEN.md`](WIEDERHOLEN.md).

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
`core.autocrlf=true` liefert dieselbe Prüfsumme – Ergebnis im nächsten
Eintrag. Gefunden: nichts Weiteres.
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
