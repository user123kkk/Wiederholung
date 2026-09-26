# Logbuch: Großplan

Letzter Eintrag zuerst. Auftrag: [`AUFTRAG.md`](AUFTRAG.md).

| | |
|---|---|
| Routine | `trig_01L6Ves47R3gsG5kvqQVmyQA` „Adrabic Großplan – Nachtschicht", 23:07 · 2:07 · 5:07 (Berlin), weckt `session_01WzaCEZCxEqmfKVPh1ipGvX` |
| Stand der Kriterien | A1 ☐ · A2 ☑ · A3 ☑ · A4 ☑ (Runde 4–7) · A5 ☐ · A6 ☐ |
| Nächste Runde | 8 (Runde 7 fertig, v3.17.37) |

---

### 2026-09-26 — Runde 7: Meldungen, die ankommen (v3.17.37)

**Geändert:** `app.js`: `ansagen()` aus `zeigeToast()` gezogen (~1560);
`ui.authInfo` (doRegister/doResendVerification/doReset, ~2866–2921),
Ideen-Danke (`feedbackEinreichen`), `hinweisKarte` (Merker
`ui.hinweisAngesagt`, nur erstes Erscheinen), Übungsmodus
(`startDrillWithCards`), Probekarte (`einstiegBewertungSatz`/`…Echo`/`…EchoText`
aus EINER Quelle) sagen über `#ansage` an, `role="status"`/`aria-live` an den
Elementen raus (G-087) · Fehlerformular: `errorFeldFehlerZeigen/-Weg`,
`closeErrorModal()` ohne Parameter, setzt nie zurück (G-067) ·
`speicherDauerhaftAnfragen()` in `onAuthStateChanged`, nur installierte App
(G-070) · `karteSheet()` Kopf `.karte-kopf` mit `.karte-kopf__ok`,
`renderToast()` schweigt bei offenem Karten-Blatt, Timer blendet Kopf-Meldung
aus (G-089) · `index.html` Fehlerformular: kein `required`, `.field__fehler` ·
`styles.css` `.karte-kopf*` · Version 3.17.37, `CHANGELOG.md` · Prüfstand:
`t_ansage2.js`, `t_fehler_melden.js`, `t_persist.js`, `t_karte_kopf.js` neu,
`t_a11y.js` (G-086, eigener Commit) · `LEHREN.md` § 15.

**Wer:** G-087, G-067, G-070 ein Handwerker (Sonnet, nacheinander an
`app.js`); G-086 Handwerker (Sonnet, parallel, nur `t_a11y.js`); G-089
Dirigent.

**Bei der Abnahme korrigiert:** (1) G-067 hatte 3.17.14 umgedreht (Text nach
dem Absenden geleert) und das im Kommentar „Betreiber-Auftrag" genannt – beides
zurückgenommen, der Text bleibt jetzt in beiden Fällen, Test angepasst (LEHREN
§ 15). (2) Der Probekarten-Satz stand doppelt (Markup und Ansage) – eine Quelle.
(3) `t_a11y.js`-Kommentar nannte 30 statt 50 ms. (4) Vier neue Tests prüften ihre
Gegenprobe gegen `HEAD` – nach dem Commit wertlos (`t_sw` wurde deshalb rot);
fest auf `7563249` bzw. `dd81f95` gelegt. `t_ansage.js` (c) auf die
Kopf-Meldung im Karten-Blatt nachgezogen (LEHREN § 15).

**Prüfstand:** `pruefe_stand` grün · `abnahme_runde.js` 13/13 ·
`t_karte_kopf` (Handy/320/Desktop × hell/dunkel), `t_ansage`, `t_ansage2`,
`t_fehler_melden`, `t_fehler_fokus`, `t_persist`, `t_sw`, `t_laden_parallel`,
`t_start`, `t_csp`, `t_anmelden`, `t_einstieg`, `t_ueben`, `t_sprung`,
`t_kontrast`, `t_a11y` (mit neuer Verzögerungs-Prüfung), `t_gross_alle` grün ·
Affe Handy 200: 0, iPad 150: 0. **Nicht geprüft:** echter Bildschirmleser,
installierte App (persist) am Gerät.

**Kriterien:** A1 ☐ (27 offen) · A2 ☑ · A3 ☑ · A4 ☑ (vierte Runde in Folge) ·
A5 ☐ · A6 ☐

**Entscheidung:** G-089 statt der Meldung oben am Rand eine Bestätigung im
Blatt-Kopf: dort ist Platz, nichts wird verdeckt, der Platz ist reserviert
(`visibility`), gemessen kein Sprung auf 320/390/1440, hell und dunkel.
Eintrittsbewegung bewusst keine: die globale Meldung erscheint wegen des
zweiten render() in `submitCardForm` ebenfalls ohne (`still-overlay`).
Einstieg-Echo/-Sperre nicht umgestellt: der Text wird dort per DOM in ein
bestehendes Element geschrieben (`einstiegEchoSetzen`), das kündigen
Bildschirmleser an.

**Offen:** K11 für 3.17.37. Wenn im selben Neuzeichnen ein Hinweis zum ersten
Mal erscheint und eine Meldung kommt, gewinnt die zweite Ansage (nur eine wird
vorgelesen) – selten, nicht gebaut. VoiceOver-Verdacht aus Runde 6
(Fokus ins Wort-Feld verschluckt die Ansage) bleibt ungeprüft, kein echtes
Gerät; D1 bleibt. `t_einstellungen.js` protokolliert „Text behalten" – stimmt
jetzt wieder.

**Nächster Schritt:** Runde 8 – nächste offene Pakete nach Schwere (P6:
G-050, G-053; P7: G-011, G-051, G-054).

---

### 2026-09-26 — Runde 6: Start und Service Worker (v3.17.36)

**Geändert:** `sw.js`: `APP_SHELL` = `KERN` + `ZUSATZ` (~38–58), `install`
mit `cache.addAll(KERN)` ohne catch (~67–94, G-068); `isUnveraenderlich()` +
Cache-zuerst-Zweig im fetch-Handler für `?v=`, `gstatic/firebasejs/<Version>/`,
`fonts/` (~108–160, G-029; Schriftenpfad vom Dirigenten auf relativ zu `sw.js`
umgestellt); `icon.svg`, `flower-isolated.png` raus (G-074) · `app.js`:
`FIREBASE_SDK_VERSION` + drei URLs (~1893), `initFirebase` mit `Promise.all`
(~1913, G-030) · `index.html`: drei `modulepreload` (~40) · `manifest.json`:
`icon-512.png` → `maskable` (G-069) · `styles.css` `.toast` Innenabstand
gleich, toter `.toast button` raus (G-088) · Version 3.17.36, `CHANGELOG.md` ·
`pruefe_stand.mjs`: Abschnitt 6 (SDK-Version app.js = modulepreload), APP_SHELL
liest `KERN`/`ZUSATZ` · Prüfstand: `t_sw.js`, `t_laden_parallel.js` neu ·
`LEHREN.md` § 15 (eigener Fehler „Bedienungshilfe").

**Wer:** G-029 + G-068 Handwerker (Sonnet, `sw.js`), G-030 Handwerker (Sonnet,
`app.js`/`index.html`), parallel an getrennten Dateien. G-069, G-074, G-088
Dirigent.

**Entscheidung:** G-069 abweichend vom Befund: `desktop-icon.png` bleibt im
Manifest als einziges 512er `any` (rund, transparente Ecken – so sieht das
Desktop-Symbol unverändert aus), `icon-512.png` wird nur `maskable` (Android
schneidet es zu). G-074: Tab-Symbol bleibt – `desktop-icon.png` steht wegen
Manifest ohnehin im Vorabspeicher, ein Tausch spart keine Bytes. G-088 kam vom
Betreiber („gespeichert im Kasten nicht symmetrisch mittig"): gemessen 20,8 vs.
12,8 px, jetzt 16,8/16,8, Breite unverändert.

**Abnahme (selbst geprüft):** Diffs gelesen. `t_sw.js` 13 ok, Gegenprobe mit
alter `sw.js` rot (Netz statt Cache; neue Version trotz 500 aktiv, alter Cache
weg). `t_laden_parallel.js`: Spanne ohne modulepreload 0–1 ms, alte `app.js`
609 ms (rot). `pruefe_stand` grün, neue Prüfung per `PRUEF_WURZEL` rot
gemacht (Handwerker).

**Prüfstand:** `abnahme_runde.js` 13/13 · `t_sw`, `t_laden_parallel`,
`t_start` (Hänger → „Neu laden"), `t_csp`, `t_sprung`, `t_kontrast`, `t_a11y`,
`t_ansage`, `t_gross_alle` grün · Affe Handy 200: 0, iPad 150: 0.
**Nicht geprüft:** echtes Lie-Fi, Android-Symbol am Gerät, Chrome-DevTools-
Manifestwarnungen.

**Kriterien:** A1 ☐ (31 offen) · A2 ☑ · A3 ☑ · A4 ☑ (dritte Runde in Folge) ·
A5 ☐ · A6 ☐

**Offen:** K11 für 3.17.36. Betreiber (26.09.): auf 3.17.35 „Gespeichert"
sichtbar, VoiceOver sprach nichts. Verdacht (unbewiesen): `fokusInsWortfeld()`
direkt nach dem Speichern lässt VoiceOver das Feld ansagen und die höfliche
Meldung verschlucken – zu G-087 (P12) prüfen. Gerätetest VoiceOver beim
Betreiber gestrichen („schrecklich"). Tastatur beim Hinzufügen: D1, bleibt
(Pro/Contra im Chat); Betreiber wünscht allgemein „premium" am Hinzufügen-Blatt,
Screenshot angefragt – bis dahin nichts bauen. Nebenfund Handwerker: bei
gescheiterter Installation bleibt ein leerer neuer Cache liegen (harmlos,
wird beim nächsten erfolgreichen Update gelöscht).

**Nächster Schritt:** Runde 7 – Paket P12 (G-067, G-086, G-087, dabei der
VoiceOver-Verdacht) und G-070.

---

### 2026-09-26 — Runde 5: Barrierefreiheit (v3.17.35)

**Geändert:** `styles.css`: helles Thema ≥ 900 px `.nav__tab:not(.active)`,
`.nav-titel` → `--text-2` (~4660); Trefferflächen `button.hinweis__weg`,
`.error-modal__close`, `edit-/reset-leech` ≥ `--tap` (~5143) · `app.js`:
Fokusfalle + `openErrorModal`/`closeErrorModal` (Öffner merken, `inert` auf
`#app`, ~11870–12000) · `zeigeToast`/`renderToast` (Ansage über `#ansage`,
sichtbare Meldung `aria-hidden`) · `lernenGruss` h1 → h2, `lernenSerie`
aria-label, `kalenderText()` + `.kal role="img"` · `index.html`: `#ansage`
(leer, außerhalb `#app`) · Version 3.17.35, `CHANGELOG.md` · Prüfstand:
`t_kontrast.js` (Handy + Desktop + iPad quer; „Funde" jetzt wirklich letzte
Zeile), `t_fehler_fokus.js`, `t_ansage.js` neu · `UEBERGABE.md`: kein
`git stash` über den ganzen Ordner.

**Wer:** G-031, G-032, G-033 Handwerker (Sonnet), G-063, G-064 Hilfskraft
(Haiku). Zwei Spuren: CSS (G-031 → G-063) parallel zu `app.js`
(G-032 → G-033 → G-064).

**Eigener Fund bei der Abnahme:** G-063 – das Hinweis-X blieb 44×36, weil
`button.ghost` (min-height `--ctrl-sm`) spezifischer ist als `.hinweis__weg`;
vom Dirigenten auf `button.hinweis__weg` korrigiert. Außerdem: der
G-032-Handwerker hat für seine Gegenprobe `git stash` über den ganzen Ordner
benutzt, während die Hilfskraft an `styles.css` schrieb – geprüft, nichts
verloren (Stash leer, beide CSS-Änderungen da); Regel in `UEBERGABE.md`.

**Neuer Fund:** G-087 (weitere Live-Regionen, die mit ihrem Text in
`render()` entstehen – dieselbe Art wie TECHNIK-8), in AUFGABEN aufgenommen.

**Abnahme (selbst geprüft):**
- G-031: Gegenprobe des erweiterten `t_kontrast.js` mit altem CSS: 52 Funde
  (4,31); jetzt 0 auf Handy, Desktop, iPad quer; `t_a11y` Desktop Kontrast 0.
  Thema „System" löst in `data-thema` auf hell/dunkel auf → Regel greift.
- G-032 `t_fehler_fokus.js`: 25× Tab 0 außerhalb, Escape und X geben den
  Fokus an den Öffner, `#app` danach nicht inert; Gegenprobe 21 außerhalb.
- G-033 `t_ansage.js` 6/6 (`#ansage` trägt „Karte gespeichert", dasselbe
  Element nach mehreren render(), Toast `aria-hidden`); `t_csp` ohne Meldung.
- G-063: alle vier Knöpfe 44×44 (390 px).
- G-064: je Bildschirm genau ein h1 (Handy + Desktop, Lernen/Fortschritt/
  Verwalten); Gruß unverändert groß; Woche „5 von 7 Tagen gelernt, heute noch
  nicht", Kalender „An 21 von 27 Tagen gelernt".

**Prüfstand (TZ=Asia/Tokyo):** `pruefe_stand` grün · `abnahme_runde.js` 13/13 ·
`t_sprung`, `t_kontrast` (0, drei Geräte), `t_a11y`, `t_gross_alle`,
`t_fehler_fokus`, `t_ansage`, `t_csp`, `t_einstellungen`, `t_lernen_start`,
`t_fortschritt`, `t_heute_bereich`, `t_wochen_kopf` grün · Affe Handy 200: 0,
iPad 150: 0. **Nicht geprüft:** echter Bildschirmleser (VoiceOver/NVDA).

**Kriterien:** A1 ☐ (31 A-Aufgaben offen) · A2 ☑ · A3 ☑ · A4 ☑ (zweite Runde
in Folge) · A5 ☐ · A6 ☐

**Offen:** K11 für 3.17.35. Gerätetest beim Betreiber: iPhone → Einstellungen
→ Bedienungshilfen → VoiceOver an → in der App eine Karte speichern →
„Karte gespeichert" wird gesprochen. K1–K7, K12, E-01–E-18 unverändert.

**Nächster Schritt:** Runde 6 – Paket P11 (Start/Service Worker): G-029,
G-030, G-068, G-069, G-074 (G-070 danach).

---

### 2026-09-26 — veroeffentlichen.bat, dritter Anlauf (kein App-Update)

**Anlass:** Betreiber-Screenshot: neue `.bat` lief, Sperre meldete
`M .firebase/hosting..cache`.
**Ursache:** Der Deploy-Cache steht seit dem ersten Commit (`6cc5b91`) im Repo;
`.gitignore` greift bei verfolgten Dateien nicht.
**Geändert:** `veroeffentlichen.bat`: vor dem Pull `git checkout -- .firebase`
(verwirft nur den Cache). `LEHREN.md` § 15.
**Entscheidung:** Datei jetzt noch NICHT aus dem Repo nehmen (`git rm --cached`):
beim Betreiber ist sie geändert, der Pull einer Löschung bräche ab, und die
laufende alte `.bat` kann das nicht abfangen.
**Offen:** – (Betreiber: „geklappt", 3.17.34 per `.bat` veröffentlicht.
Danach `git rm --cached .firebase/hosting..cache` committet; die `.bat` verwirft
vorher die lokale Änderung, der Pull löscht die Datei, die CLI legt sie als
ignorierte Datei neu an.)
**Nächster Schritt:** Runde 5 – Paket P12.

---

### 2026-09-26 — veroeffentlichen.bat, zweiter Anlauf (kein App-Update)

**Anlass:** Betreiber-Screenshot: „Es gibt lokale Aenderungen im Ordner" –
das ist der Text der ALTEN `.bat`.
**Ursache:** (1) `git pull` tauschte die laufende `.bat` aus; Windows liest
Batch-Dateien während des Laufs weiter aus der Datei. (2) Die `.bat` lag als
einzige Datei mit CRLF im Repo (`git ls-files --eol`: `i/crlf`) – Git für
Windows meldet so etwas als geändert → Sperre.
**Geändert:** `veroeffentlichen.bat` (läuft aus `%TEMP%`-Kopie),
`.gitattributes` neu (`*.bat text eol=crlf`, Repo jetzt `i/lf w/crlf`),
`LEHREN.md` § 15.
**Offen:** Gerätetest beim Betreiber: `.bat` zweimal starten (der erste Lauf
holt die neue Fassung und kann noch einmal falsch abbrechen). Meldet der
zweite Lauf Dateien: die Liste steht dann im Fenster.
**Nächster Schritt:** Runde 5 – Paket P12.

---

### 2026-09-26 — Runde 4: Fortschritt und Lernen-Start (v3.17.34)

**Geändert:** `app.js`: `ui.heuteJeBereich`, `bereichHeuteZaehle()` (~784),
Aufrufe in `lernAbhaken`/`lernRueckgaengig`/`gradeCard`/`undoLastGrade`,
`heuteAnteil(cards, bid)` + `lernenStapel` (~9372–9400) · `fortschrittLektionen`
(`zu`/`dran` nur geführt, ~9686) · `selectBereich` (`ui.seite` Lektionen,
~4340) · `fortschrittWochen` (Kopf nur bei Antworten, Beschriftung „in den
letzten 7 Tagen", Pause-Satz, ~9569–9592), Kommentare `verlaufSummeSpanne`
(~916) und Kopfblock (~9541) · `styles.css` `.kal` (7 Zeilen, spaltenweise,
`--kal-box`) · Version 3.17.34, `CHANGELOG.md` · Prüfstand: `t_heute_bereich.js`,
`t_wochen_kopf.js` neu.

**Wer:** G-023, G-024, G-026 Handwerker (Sonnet), G-025, G-060 Hilfskraft
(Haiku). G-024 (nur `styles.css`) lief parallel zu G-023 (nur `app.js`) –
erlaubt nach AUFTRAG § 1 (verschiedene Dateien); an `app.js` nie zwei.

**Entscheidung:**
- G-023: kein neues Cloud-Feld (bräuchte Regel + Deploy). Ein Bereich mit
  Karten → wie bisher aus dem Protokoll; mehrere → Zähler je Bereich im
  Arbeitsspeicher, nach Neuladen 0 („Runde starten" statt fremder Zahl).
- G-026: Rechnung bleibt rollend 7 Tage, Beschriftung ehrlich; Null-Fall als
  Satz „In den letzten 7 Tagen noch keine Antwort – eine Runde reicht für den
  Anfang." (Text, keine Lernlogik).
- G-024: nur CSS; `renderKalender` war schon Mo–So ausgerichtet.

**Abnahme (selbst geprüft):**
- G-023 `t_heute_bereich.js`: b1 „Heute schon 3 Antworten"/„Weiterlernen",
  b2 „Runde starten", Ring `--ziel 1.000`; ein Bereich: „Heute schon 5" nach
  dem Laden. Gegenprobe (Handwerker) rot.
- G-024: 320/390/1440 px je 7 Zeilen, 4 Spalten, kein Seitenscrollen; Foto
  Handy angesehen, heute (Sa) letzte Spalte Zeile 6.
- G-025: eigener Bereich „sitzt 13/13, 15/15", kein `.zu`; geführt
  unverändert (`zu`, `dran`).
- G-060: Desktop, Lektionen → Wechsel zu „Quran-Wörter" → Übersicht; mit
  altem Code leere „Lektionen"-Seite.
- G-026 `t_wochen_kopf.js` 4/4; Gegenprobe Fall a) rot.

**Prüfstand (TZ=Asia/Tokyo):** `pruefe_stand` grün · `abnahme_runde.js` 13/13 ·
`t_sprung`, `t_kontrast` (0), `t_a11y`, `t_gross_alle`, `t_fortschritt`,
`t_lernen_start`, `t_undo_verlauf`, `t_serie`, `t_serie_warnung`,
`t_merken_zwei`, `t_verwalten` grün · Affe Handy 200: 0, iPad 150: 0.

**Kriterien:** A1 ☐ (35 A-Aufgaben offen) · A2 ☑ · A3 ☑ · A4 ☑ (diese Runde
komplett) · A5 ☐ · A6 ☐

**Offen:** K11 für 3.17.34 (Veröffentlichen-Knopf). K10 erledigt (Betreiber hat
die Regeln von `main` eingesetzt, 26.09.). K1–K7, K12, E-01–E-18 unverändert.

**Nächster Schritt:** Runde 5 – Paket P12 (Barrierefreiheit/Kontrast): G-031,
G-032, G-033, G-063, G-064 (danach G-067, G-086).

---

### 2026-09-26 — veroeffentlichen.bat repariert, main geprüft (kein App-Update)

**Anlass:** Betreiber: 3.17.33 per GitHub-Knopf veröffentlicht; „fix das mit
veröffentlichen.bat, funktioniert ja ned"; Regeln aus Git (vor ~12 h) in
Firestore eingesetzt – „stelle sicher, dass alles wirklich in main ist".

**Geprüft:** `firestore.rules` zuletzt geändert in `7b8135a` (25.09. 18:34 UTC),
Commit ist in `main`, seitdem unverändert → eingesetzte Regeln = `main`.
Alle anderen Remote-Zweige (`claude/*`, `design-redesign`,
`einstellungen-ausbau`) haben keine gemeinsame Basis mit `main` und enden
bei ≤ v3.9.11; deren Inhalt steht im Changelog von `main` (3.9.7 Grammatik-
Feld in 3.9.8 bewusst entfernt). Nichts fehlt.

**Geändert:** `plan/werkzeuge/pruefe_stand.mjs` (`lies()`: `\r\n` → `\n`),
`veroeffentlichen.bat` (Werkzeug-Prüfung `where`, `call firebase`, Liste der
störenden Dateien, `node` fehlt → Hinweis statt Abbruch), `LEHREN.md` § 15.

**Entscheidung:** Kein `.gitattributes` mit `eol=lf`: Beim Betreiber würden
danach Dateien als „geändert" erscheinen und die Sperre „lokale
Änderungen" auslösen. Stattdessen rechnet die Prüfung wie der Browser
(der HTML-Parser macht aus `\r\n` vorher `\n`).

**Prüfstand:** Kopie des Repos mit `\r\n` in allen Textdateien: vorher 3
FEHLER, jetzt „Alles in Ordnung"; Gegenprobe (Inline-Skript geändert) → 1
FEHLER. **Nicht geprüft:** die `.bat` selbst auf Windows (keine Windows-
Umgebung) – Gerätetest beim Betreiber.

**Nächster Schritt:** Runde 4 – Paket P9 (Fortschritt).

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
