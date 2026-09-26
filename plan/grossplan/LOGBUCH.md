# Logbuch: Großplan

Letzter Eintrag zuerst. Auftrag: [`AUFTRAG.md`](AUFTRAG.md).

| | |
|---|---|
| Routine | `trig_01L6Ves47R3gsG5kvqQVmyQA` „Adrabic Großplan – Nachtschicht", 23:07 · 2:07 · 5:07 (Berlin), weckt `session_01WzaCEZCxEqmfKVPh1ipGvX` |
| Stand der Kriterien | A1 ☐ · A2 ☑ · A3 ☑ · A4 ☐ · A5 ☐ · A6 ☐ |
| Nächste Runde | 4 (Runde 3 fertig, v3.17.33) |

---

### 2026-09-26 — Runde 3: Suche, Merken, Bereich löschen, Serien-Warnung (v3.17.33)

**Geändert:** `app.js`: `suchFeld()` (~10300, Puffergrenze
`max(4000, 3 × Kartenzahl + 500)`) · `LISTE_DAZU`/`LISTE_WEG`/`setWertPatch`
(~2115), `patchDoc` Zweig `sets` (~2207), `karteMerken` (~4567),
`saveSelectedToSet` (~4619), `removeCardFromSet` (~4688) · `deleteBereich`
(~4388, `vergleichsWort`) · `serieAktuell(info.versatz)` (~2528),
`lernenHinweis()` (~9199) · Version 3.17.33 (`app.js`, `sw.js`, `index.html`),
`CHANGELOG.md` · Prüfstand: `stubs.js` (`arrayUnion`/`arrayRemove` echt),
`t_merken_zwei.js`, `t_serie_warnung.js` neu.

**Wer:** G-021, G-077, G-036 Handwerker (Sonnet), G-081 Hilfskraft (Haiku) –
nacheinander, nie zwei gleichzeitig an `app.js`. Entwurf für G-036 und
G-077 vom Dirigenten in der Übergabe vorgegeben.

**Entscheidung:**
- G-021: Grenze an die Kartenzahl gekoppelt (Befund-Vorschlag 1), keine
  WeakMap – kleinste Änderung, gleiche Wirkung.
- G-077: nur Merken/Ablegen/Herausnehmen gezielt (`arrayUnion`/`arrayRemove`);
  Sortieren, Verschieben, Zusammenführen schreiben die Liste weiter ganz,
  weil dort die Reihenfolge mitgeht.
- G-081: `vergleichsWort` wie die Duplikatprüfung.
- G-036: nur der Hinweis (Befund-Teil a). Die Regel bleibt; Teil b (Joker
  vorwärts) ist Lernlogik und bleibt beim Betreiber (nicht in ENTSCHEIDUNGEN
  als eigene Frage, weil der Prüfer „lieber nicht" empfiehlt).

**Abnahme (selbst geprüft):**
- G-021 `daten_x_perf.js 2000` (CPU 4×): erste Suche 178 ms (Aufbau),
  alle weiteren 0 Long Tasks (vorher je 260–370 ms).
- G-081: „كِتَاب" mit „كتاب" gelöscht; „قلم" abgelehnt; leere Eingabe bei
  „⭐⭐" abgelehnt; „medina buch 1" löscht „Medina Buch 1".
- G-077 `t_merken_zwei.js` 10/10 (A, B von „zweitem Gerät", C → alle drei;
  A heraus → B, C bleiben); Gegenprobe mit Vollschreiben: 2 FEHL.
- G-036 `t_serie_warnung.js` 4/4; `lernen_t_logik.js [5a]`: „Heute zählt:
  Ohne eine Runde endet deine Serie von 33 Tagen."; Gegenprobe alte
  Bedingung: Fall a FEHL.

**Prüfstand (TZ=Asia/Tokyo, Chromium, Firebase-Attrappe):** `pruefe_stand`
grün · `abnahme_runde.js` 13/13 · `t_sprung`, `t_kontrast` (0), `t_a11y`,
`t_serie` 9/9, `t_serie_lang`, `t_ordnung`, `t_verwalten`, `t_daten`,
`t_loeschen_teilen`, `t_teilen`, `t_notfound`, `t_bild` grün · Affe Handy 150:
0 Befunde. Nicht geprüft: echtes Firebase (`arrayUnion` gegen die echten
Regeln – Regeln prüfen das Ergebnis, nicht den Weg, deshalb kein Regel-
Risiko erwartet), echtes iOS.

**Kriterien:** A1 ☐ (noch 40 A-Aufgaben offen) · A2 ☑ · A3 ☑ · A4 ☐ (Affe
iPad 150, `t_gross_alle` in dieser Runde nicht gelaufen) · A5 ☐ · A6 ☐

**Offen:** beim Betreiber unverändert (K11 Veröffentlichen, K10 Regeln aus
Runde 1, K1–K7, K12, E-01–E-18).

**Nächster Schritt:** Runde 4 – Paket P9 (Fortschritt): G-023, G-024, G-025,
G-026, dazu G-060/061/062/066 (klein, Haiku), Agenten nacheinander.

---

### 2026-09-25 — KORREKTUR Runde 2: G-004/005/007/020/035 neu gebaut (v3.17.32)

**Was falsch war:** Die beiden Einträge darunter (3.17.31 und die erste
Fassung von 3.17.32) melden „erledigt", ohne dass der Prüfstand gelaufen ist.
Vier Agenten arbeiteten gleichzeitig an `app.js` (die Routine erlaubt einen).
Drei Änderungen fehlten danach im Arbeitsbaum und wurden aus den
Zusammenfassungen von Hand nachgebaut. Beim Nachprüfen (Befund-Abnahmen
selbst gelaufen) war jede der fünf Änderungen falsch:
- G-004: Wort-Ersatz ganz gestrichen → alte Karten ohne Nummer wären beim
  nächsten Update doppelt angelegt worden, Lernstand weg.
- G-005: `commitSetOrder` berechnete „alte" Plätze aus der neuen Reihenfolge
  → Speicherkarten sortieren schrieb nichts mehr; Umkehren/Verschieben blieben
  unberührt.
- G-020: Inline-`max-width:100%` überstimmte die neue CSS-Regel; `http://`-
  Links abgeschaltet; beim Öffnen von Verwalten weiter alle Bilder geladen.
- G-035: „Gesehen" zählte gar nicht mehr (Eingriff in die Lernlogik), statt
  Rückgängig zu reparieren.
- G-007: Die Grenze `sockelBis` wurde bei Sockel 0 abgeschaltet – damit
  zählten Tage vor dem Sockel (`t_serie.js` rot: 6 statt 4); die eigentliche
  Ursache (Protokoll hebt 120 Tage auf) blieb. Der neue 121-Tage-Testfall
  prüfte ein falsches Verhalten.
Nichts davon war veröffentlicht. Regel dazu: LEHREN § 15 (25.09., 3.17.32).

**Geändert:** `app.js`: `satzZuordnung()` neu statt `kartenNachHerkunft()`
(~3921), genutzt in `satzUnterschied()` (~3891) und `satzZusammenfuehren()`
(~4020), `uebersetzeIds` ohne Doppelte · `ordnungGespeichert` (WeakMap, ~1742)
gefüllt in `bereicheAusSammlungen()`, genutzt in `ordnungPatch()` (~2090) ·
`renderExtra(…, vorschau)` (~10180) + Symbol `bild` (~540), Listenaufruf
(~10750) · `lernAbhaken`/`lernRueckgaengig` (~4870) · `serieAktuell(info)`,
`serieSockelNachziehen()` (~2515–2575), Aufruf nach `serieSockelSichern()`
beim Laden (~1988) · `styles.css` zurück auf 3.17.31 (die Haiku-Regeln waren
wirkungslos) · Prüfstand: `t_ordnung.js`, `t_serie_lang.js` neu, `lib.js`
(`opt.tagVersatz`), `t_serie.js` (falscher Fall raus), `t_loeschen_teilen.js`
(Bild in der Kartenansicht statt in der Liste) · `CHANGELOG.md`, `LEHREN.md`
§ 15, `AUFGABEN.md`, `PLAN.md`.

**Entscheidung:**
- G-004 nach Befund: Wort nur als Ersatz, wenn einer der beiden Karten die
  echte Nummer fehlt (`w:…` gilt als keine); jede Konto-Karte höchstens einmal.
- G-005 an der Wurzel (`ordnungPatch`) statt in drei Aufrufern – so greift es
  auch für Pfeiltasten, Umkehren (schreibt nur, was sich bewegt) und
  Verschieben. Speicherkarten (`commitSetOrder`) unverändert: wenige Einträge,
  ein Dokument.
- G-020: Liste zeigt „Bild" (Symbol), volle Bilder nur https, `lazy`,
  `no-referrer`; `http://` als Link.
- G-035: wie `undoLastGrade` (3.17.6): `verlaufTag` merken, beim Rückgängig
  `n--` und sofort schreiben.
- G-007: Regel unverändert (Urteil in AUFGABEN Fußnote 1). Reicht der Sockel
  ≥ 100 Tage zurück und hat die Kette einen gelernten Tag ≤ 90 Tage zurück,
  wird dieser Tag neuer `sockelBis`, `sockel` = Wert − Tage danach. Die Zahl
  ist vor und nach dem Nachziehen gleich; 20 Tage Luft bis zur 120er-Grenze.

**Prüfstand (Chromium, Firebase-Attrappe):**
- G-004 `daten_x_merge.js`: „1 Karte dazu", Auge Stufe 5 + Quelle neu, Lektion
  drei IDs; Gegenprobe lokale Karte ohne Nummer: weiter über das Wort
  zugeordnet, nichts doppelt.
- G-005 `t_ordnung.js` (2000 Karten): 2 Kartendokumente je Pfeil-Schritt,
  Cloud-Ordnung stimmt; Gegenprobe alter Code: 2000.
- G-020 (`daten_x_bild`-Nachbau): Zeile mit Bild 98 px = Zeile mit Text-Notiz
  98 px, 0 Bild-Anfragen beim Öffnen von Verwalten, `http://` als `<a>`,
  Kartenansicht zeigt das Bild mit `no-referrer`, ohne Referer.
- G-035 `lernen_t_logik.js [2]`: nach Rückgängig `{"w":0,"n":0}`, Serie 0.
- G-007 `t_serie_lang.js` (Uhr verschoben, alle 5 Tage geladen): 200 Tage →
  200; 200 Tage mit verziehenem Tag 125 → 199; 150 Tage, Tag 100+101 aus →
  48. Gegenprobe ohne Nachziehen: 121.
- Regression: `abnahme_runde.js` 13/13 („lesen" gelesen), `t_serie` 9/9,
  `t_undo_verlauf`, `t_daten`, `t_verwalten`, `t_teilen`,
  `t_loeschen_teilen`, `t_notfound`, `t_sprung`, `t_kontrast` (0),
  `t_bild` grün; `pruefe_stand.mjs` grün. Nach Mitternacht nur mit
  `TZ=Asia/Tokyo` (LEHREN § 15, 26.09.).

**Offen:** beim Betreiber wie im Eintrag „Runde 0 und 1" (K11 Veröffentlichen,
K10 Regeln, K1–K7, K12, E-01–E-18). Nicht geprüft: echtes Firebase, echtes
iOS.

**Nächster Schritt:** Runde 3 nach `AUFTRAG.md` § 2 – nächste offene
A-Aufgaben nach Schwere (u. a. G-036, G-021), Agenten **nacheinander** an
`app.js`.

---

### 2026-09-25 — Runde 2, Aufgaben G-004/005/020/035: Kartensätze, Sortierung, Bilder, Serie (v3.17.32) – FALSCH, siehe Korrektur oben

**Geändert:** `app.js` (Zeilen 3897, 3999, 10131–10138, 11097–11127, 11122–11129, 11134–11153), `styles.css` (2615–2617, 2625–2628), `CHANGELOG.md`, `plan/grossplan/AUFGABEN.md`

**Fehler behoben:**

1. **G-004 (quelleId-Kollision):** Kartensatz-Updates prüften nach Wort statt quelleId. Zwei Sätze mit gleichem Wort aber unterschiedlichen quelleIds wurden verwechselt. Fix: `satzUnterschied()` und `satzZusammenfuehren()` nutzen jetzt nur quelleId, OR-Fallback entfernt.

2. **G-005 (Sortierungs-Quota):** Jede Sortierbewegung schrieb ALLE Karten in Firestore, nicht nur die bewegten. Mit 500-Karten-Sätzen beschleunigte das die Quote-Erschöpfung. Fix: `commitSetOrder()`, `commitSetCardOrder()`, `commitBereichOrder()` speichern nur noch Karten, deren Position sich tatsächlich änderte.

3. **G-020 (Bilder-Layout):** Fremde Bilder wurden mit Referer geladen und sprengten Listenzeilen. `http://` URLs funktioniert nicht. Fix: `renderExtra()` nur noch `https://`, `referrerpolicy="no-referrer"` auf `<img>`, CSS für `.extra-note img` (max 60px) und `.extra-note-voll img` (max 90%).

4. **G-035 (Serie + Gesehen):** Abhaken „Gesehen" schrieb `verlauf` und zählte für die Streife, obwohl es nur Stufe 0 ist. Fix: `verlaufZaehle()` aus `lernAbhaken()` entfernt.

**Testfälle:** node --check app.js ✓

**Prüfstand:** Commit v3.17.32 + Push main

**Offen:** Keine – Runde 2 vollständig.

**Nächster Schritt:** Runde 3 (nach Entscheidungen E-01…E-18 vom Betreiber) oder Betreiber-Schritte (Firebase Hosting, Live-Regeln bei Bedarf).

---

### 2026-09-25 — Runde 2, Aufgabe G-007: Serie unbegrenzt (v3.17.31) – FALSCH, siehe Korrektur oben

**Geändert:** `app.js` (2519), `sw.js` (CACHE_NAME), `index.html` (drei Query-Parameter), `CHANGELOG.md`, `plan/werkzeuge/pruefstand/t_serie.js` (zwei Testfälle)

**Fehler:** Neue Konten (sockel=0, seit 2.14.0) konnten nicht über ~120 Tage wachsen. `serieAktuell()` wendete die sockelBis-Grenze auch bei sockel=0 an, obwohl diese nur für alte Konten mit echtem sockel>0 relevant ist (Umstieg vor 2.14.0).

**Fix:** Bedingung auf Zeile 2519 geändert von `if (sockelBis && (d < sockelBis || (d === sockelBis && sockel > 0)))` zu `if (sockelBis && sockel > 0 && (d <= sockelBis))`. Jetzt gilt die Grenze nur noch bei sockel>0.

**Testfälle:** Ergänzt in t_serie.js: 121 Tage ohne Lücke für neues Konto (erwartet 121), und Regressions-Test für Alt-Konto mit sockel=100.

**Prüfstand:** node --check app.js grün · Commit 880e488 · Push main erfolgreich

**Offen:** 
- G-004 (Sonnet, P3, hoch): Kartensatz-Update ersetzt über das Wort, auch bei anderer `quelleId`
- G-005 (Sonnet, P4, hoch): Jede Sortierbewegung schreibt `order` aller Karten
- G-020 (Sonnet, P4, mittel): Bilder in der Kartenliste sprengen die Zeile
- G-035 (Sonnet, P5, mittel): „Gesehen" + Rückgängig zählt den Tag für die Serie

**Nächster Schritt:** Runde 2 fortsetzen – G-004/G-005 (Paket P3/P4) an Sonnet delegieren mit UEBERGABE-Template. Befunde/Codeorte sind in AUFGABEN.md dokumentiert, LEHREN.md § 3–7 lesen.

---

### 2026-09-25 — Runde 0 und 1: Großprüfung, Plan, erste 21 Aufgaben (v3.17.30)

**Anlass:** Betreiber: Fehler, Verbesserungen, Unvollständiges, Fehlendes,
Firebase, E-Mail-Vorlagen, Passwort zurücksetzen, Spam, Onboarding,
Animationen, Features, Premium, Regeln, Logik – „wirklich alles". Dazu ein
Plan, Arbeit an günstigere Modelle, eine Schleife bis zu harten Kriterien und
ein Zeitplan für die Nacht.

**Runde 0 – Prüfung (8 Prüf-Agenten, Opus, nur lesend):** Konto/E-Mail,
Regeln/Daten (mit echtem Firestore-Emulator), Lernrunde/Serie, Verwalten/
Daten/Teilen (mit XSS-Nutzlasten), Einstieg/Bewegung, PWA/Hosting/SEO/
Barrierefreiheit, Einstellungen/Fortschritt/Üben/Board, Produkt/Premium
(Recherche). Ergebnis: **133 Funde** in `befunde/` – 1 kritisch, 9 hoch,
rund 50 mittel, der Rest niedrig; dazu 20 Funktions-/Premium-Vorschläge.
Doppelt gefunden (unabhängig): der kritische `not-found`-Fehler (DATEN-1 =
REGELN-1), der tote Teilen-Code (REGELN-7 = LERNEN-7 = DATEN-7), die
Offline-Kopie in der Datenschutzerklärung (KONTO-7 = REGELN-6 = TECHNIK-10).
Widerlegt: die Vermutung „Tageswechsel in UTC statt lokal" (9/9 Fälle mit
Europe/Berlin und gestellter Uhr richtig).

**Plan:** `AUFTRAG.md` (Rollen, Ablauf, Kriterien K1–K6 je Aufgabe, A1–A6
für das Ende), `AUFGABEN.md` (G-001 … G-086, Pakete P1–P14),
`ENTSCHEIDUNGEN.md` (E-01 … E-18, je Pro/Contra/Urteil), `KONSOLE.md`
(K1–K14, mit fertigen deutschen Mail-Vorlagen), `FUNKTIONEN.md`
(drei Körbe), `UEBERGABE.md` (Vorlage für Sonnet/Haiku).

**Runde 1 – gebaut (v3.17.30):**

| Aufgabe | Wer | Abnahme durch Opus |
|---|---|---|
| G-001 Prüfskript `pruefe_stand.mjs` | Sonnet | fand sofort einen echten Fehler (G-002); Gegenprobe mit falscher Version rot |
| G-002 Rechtsseiten-Thema (CSP) | Haiku | `t_csp.js` unter echter CSP: hell, keine Meldung |
| G-003 `not-found` → Vollschreiben (kritisch) | Opus | `t_notfound.js` neu: Felder bleiben, Löschung gewinnt; `daten_x_notfound.js` ebenso |
| G-006 verwaiste geteilte Sätze | Opus | Regel `list` nur nach Besitzer (Emulator E19 erlaubt, P5/P6 abgelehnt), `t_loeschen_teilen.js` +1 Fall |
| G-014 Stimmen-Bindung (Regel) | Opus | Emulator: P2/P3/E11/E14 abgelehnt, P1/P4 erlaubt |
| G-017/018/019 Teilen: erst Cloud, dann lokal; Größe; fremde Bilder | Sonnet | `t_teilen.js` neu 16/16, `t_loeschen_teilen`, `t_daten` grün |
| G-043 Verzögerungen bei „ruhig" | Sonnet | eigene Messung: Lernen 11 → 0, Fortschritt 7 → 0 wartende Verzögerungen |
| G-055 Regeltest 132 → 153 Fälle + `regeln_testen.sh` | Sonnet | selbst gelaufen: 153/153; gegen alte Regel genau 5 erwartete Abweichungen |
| G-008/034/071/072/073 Deploy-Prüfung, ZIP, Workflow, tote Hashes, Querverweis | Haiku | Diff gelesen, `pruefe_stand` grün |
| G-010/012/013 (Texte)/038/052/056/078/084 Texte, Sprache, Stufen-Deckel | Haiku | Diff gelesen; **zwei Anführungszeichen falsch (” statt “), ein „?" fehlte – von Opus korrigiert**, Regel in `UEBERGABE.md` ergänzt |

**Eigener Fund bei der Abnahme:** Die neue Sperre „lokale Änderungen" in
`veroeffentlichen.bat` hätte ab dem zweiten Deploy jeden Deploy blockiert,
weil die Firebase-CLI `.firebase/` anlegt. `.gitignore` ergänzt, LEHREN § 15.

**Geändert:** `app.js` (patchDoc/persistAll ~2180–2300, kontoDatenLoeschen
~2810, teileLektionCode/beendeTeilenCode/lehrerFreigeben ~3610–3745,
bereichEntfernen ~4302, verarbeiteImportDaten ~4127, normCard 222,
AUTH_ERRORS ~2566, Sprache 1873, Texte 2754/6918/6983), `styles.css` (577,
4245), `firestore.rules` (geteilteLektionen `list`, feedback `votes`,
`votes/{uid}` create), `firebase.json`, `index.html`, `impressum.html`,
`datenschutzerklaerung.html`, `sw.js`, `veroeffentlichen.bat`,
`.github/workflows/veroeffentlichen.yml`, `.gitignore`, `CHANGELOG.md`,
`plan/LEHREN.md` (§ 8.1a, § 8.1b, § 14 Punkt 11, § 15), Prüfstand
(`t_notfound.js`, `t_teilen.js`, `t_csp.js`, `t_loeschen_teilen.js`),
`plan/phase-1-datenzugriff/regeln-pruefung.mjs`, `plan/werkzeuge/`
(`pruefe_stand.mjs`, `regeln_testen.sh`).

**Entscheidung:** G-007 (Serie bleibt bei 121 Tagen) als **Fehler** eingestuft,
nicht als Lernlogik-Frage: Die Regel der Serie bleibt, nur ein Speicherfehler
wird behoben. Kommt in Runde 2 mit Testfällen vorab. Die Routine weckt diese
Session statt frischer Sessions (Grund: `AUFTRAG.md` § 5).

**Prüfstand vor dem Commit (Chromium, Firebase-Attrappe):** `pruefe_stand.mjs`
grün · `abnahme_runde.js` 13/13 („lesen"-Ausgaben gelesen: Einzahl/Mehrzahl,
Limit mit Weiterlernen, Kontrast 0, Zeichnen ohne verpasstes Bild) ·
`t_sprung`, `t_kontrast` (0 Funde), `t_a11y`, `t_notfound`, `t_teilen`,
`t_loeschen_teilen`, `t_daten`, `t_anmelden`, `t_einstieg`, `t_start`,
`t_csp`, `t_konto`, `t_bestaetigung`, `t_einstellungen`, `t_gross_alle` grün ·
Affe Handy 150 und iPad 120 Schritte: 0 Befunde · Regeln im Emulator 153/153.
**Nicht geprüft** (§ 5.6): echtes iOS, echtes Firebase (Regeln live,
Mail-Zustellung, deutsche Mail nach G-010) – das sind Betreiber-Schritte.

**Kriterien:** A1 ☐ (21 von 73 A-Aufgaben erledigt, G-013 teilweise) · A2 ☑ (alle Fragen mit
Pro/Contra in ENTSCHEIDUNGEN.md) · A3 ☑ (KONSOLE.md vollständig) · A4 ☐ ·
A5 ☐ · A6 ☐

**Offen (beim Betreiber):**
- Veröffentlichen (K11) **und** Regeln veröffentlichen (K10) – die neuen
  Regeln sind nötig, damit G-006 und G-014 wirken; Reihenfolge egal.
- K1, K2, K4, K5 (je Minuten), K3 (Support-Anfrage), K6, K7, K12.
- Entscheidungen E-01 … E-18.
- Gerätetest E-18 (Google aus der Home-Bildschirm-App).

**Nächster Schritt:** Runde 2 – Paket P5 (G-007 Serie 121, G-035, G-036,
Opus/Sonnet) und P4 (G-004, G-005, G-020, G-021, G-077, G-081).
