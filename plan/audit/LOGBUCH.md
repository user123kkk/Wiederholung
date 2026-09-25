# Logbuch: Prüfschleife

Letzter Eintrag zuerst. Auftrag: [`AUFTRAG.md`](AUFTRAG.md).
Routine: `trig_016y2uuWtQZ4yrCzAhkZsLQn` – **am 24.09.2026 nach Station 18
gelöscht**, die Schleife ist abgeschlossen. Eine zweite Runde nur auf Wunsch
des Betreibers (AUFTRAG.md).

| Nr | Station | Stand |
|---|---|---|
| 1 | Start | erledigt (v3.16.1) |
| 2 | Einstieg | erledigt (v3.17.1) |
| 3 | Anmelden | erledigt (v3.17.2) |
| 4 | Bestätigung | erledigt (v3.17.3) |
| 5 | Lernen-Start | erledigt (v3.17.4) |
| 6 | Lernrunde | erledigt (v3.14.0/3.15.0 Umdrehen/Bewerten, v3.17.5 Rest) |
| 7 | Rundenende | erledigt (v3.17.7) |
| 8 | Üben | erledigt (v3.15.0 Auswahl/Bewertung/Ende, v3.17.8 Schreiben/Speicherkarten) |
| 9 | Fortschritt | erledigt (v3.17.9) |
| 10 | Verwalten | erledigt (v3.17.10) |
| 11 | Karten-Blätter | erledigt (v3.17.11) |
| 12 | Bereiche | erledigt (v3.17.12) |
| 13 | Kartensätze & Daten | erledigt (v3.17.13) |
| 14 | Einstellungen | erledigt (v3.17.14) |
| 15 | Konto | erledigt (v3.17.15) |
| 16 | Querschnitt | erledigt (v3.17.16) |
| 17 | Große Bildschirme | erledigt (v3.17.17) |
| 18 | Hell & ruhig | erledigt (v3.17.18) |

---

### 2026-09-25 — Lernrunde „fühlt sich komisch an": gemessen, ein Fehler behoben (v3.17.25), Rest als Gedanken

**Anlass:** Betreiber: „irgendwie gefällt mir das lernen tab ned, nicht das
design sondern die funktionalität mit verschiebungen usw. weiß nicht was es
ist, obs die knöpfe [...] das umdrehen nicht gezwungen, smooth nicht
abfuckend, realistisch wo nicht später alles irgendwie aufploppt [...] nur
gedanken". Keine Rückfragen gewünscht.

**Gemessen** (Handy 390×844, Prüfstand, Skript im Session-Scratchpad):
- M1 Karte verrutscht **nicht** (0 px vorn→hinten→nächste Karte), Seite
  scrollt nicht. Kein Layout-Sprung im engen Sinn.
- M2 Aufdecken startet **9 Animationen** gleichzeitig: Karte hebt sich,
  dreht (540 ms), 2× Schatten, Trennlinie (ab 120 ms), die drei Knöpfe
  **gestaffelt** (240/300/360 ms + 320 ms, letzter voll erst bei ≈ 680 ms),
  Fortschrittsbalken.
- M3 Das arabische Wort **springt in der Karte** beim Umdrehen nach oben
  (Rückseite zentriert Wort + Linie + Antwort als Block; Foto 1 vs. 3).
- M4 Unter dem Daumen wird aus „Antwort zeigen" (hell, volle Breite) „Fast"
  (dunkel) – der größte Helligkeitswechsel des Bildschirms genau unter dem
  Finger. **Dabei echter Fehler:** zweiter Tipp nach 80/150/250 ms traf
  „Fast" bei Deckkraft 0 und bewertete blind (Karte 1 → 2).
- M5 Zugedeckte Karte: `karte-einladen` – **Leuchtring ab 2,6 s, alle 7 s,
  endlos** (`styles.css` ≈ Z. 2090). Das ist Druck genau während des
  Erinnerns – vermutlich das „gezwungen".
- M6 Bewerten: alte Karte fliegt **mit Antwort und Farbring über die neue**,
  ≈ 400 ms zwei Wörter übereinander (Foto 4, 150 ms).
- M7 Nach der ersten Bewertung taucht ↺ oben rechts auf; nach dem Aufdecken
  taucht „Merken" auf (Platz reserviert, kein Sprung, aber es erscheint).

**Behoben (echter Fehler, `CLAUDE.md` Grundsatz 1):** `app.js` –
`ui.session.aufgedecktUm` in `revealAnswer()`, neu `BEWERTEN_SPERRE_MS = 400`
und `bewertenZuFrueh()` vor `gradeKnown`; die vier Klick-Fälle `grade-*`
prüfen die Sperre. Tastatur/Wischen unverändert (rufen `gradeKnown()` usw.
direkt). `APP_VERSION` 3.17.25, `sw.js`, `index.html`, `CHANGELOG.md`.
Neu `t_doppeltipp.js` (80/150/250 ms → bleibt Karte 1; 700 ms → Karte 2):
4/4. Regression: `t_runde_rest.js` ok (Wischen, Rückgängig, Notiz, Merken,
Tastatur, Kontrast 0), `t_ueben.js` ok, Affe Handy 150 Schritte 0 Befunde.
`LEHREN.md` § 6.1 Regel + § 15 Vorfall.

**Vorgelegt, NICHT gebaut** (Betreiber: „nur gedanken"; je Pro/Contra im
Chat vom 25.09.2026):
- V1 Leuchtring beim Warten entfernen (M5). Empfehlung: ja.
- V2 Drei Knöpfe ohne Staffel, mit der Drehung zusammen (M2). Empfehlung: ja.
- V3 Wort bleibt beim Umdrehen auf derselben Höhe, Antwort erscheint darunter
  (Platz vorn reserviert); die Drehung selbst bleibt (Betreiber-Wunsch
  3.14.0) (M3). Empfehlung: ja.
- V4 Aktionszone ohne Hell→Dunkel-Wechsel: „Antwort zeigen" in derselben
  Höhe und Tonalität wie die Bewertungsleiste (Duolingo-Muster: ein Platz,
  andere Beschriftung) (M4). Empfehlung: ja. Nicht empfohlen: Bewertung
  schon vorher gesperrt zeigen (wirkt tot).
- V5 Abflug ruhiger: kurzer Schub + Ausblenden (≤ 200 ms) statt Flug über die
  neue Karte (M6). Empfehlung: ja.
- V6 „Merken" immer sichtbar (auch vor dem Aufdecken sinnvoll); ↺ bleibt wie
  es ist (sonst toter Knopf) (M7).
- Nicht angefasst: **Anzahl der Knöpfe** (Lernlogik, tabu) – Einschätzung:
  drei ist nicht das Problem. **Aufdecken vor dem Bewerten** bleibt Pflicht
  (aktives Erinnern, Lernlogik) – nur Druck und Hürde weg.

**Offen:** Betreiber-Entscheidung zu V1–V6.

**Nächster Schritt:** Auf „ja" (ganz oder einzeln) V1–V6 bauen, mit
`t_runde_gefuehl`-Messung (Animationszahl, Wortposition, Daumen-Element)
vorher/nachher.

---

### 2026-09-24 — Korrektur: Agent hat sich in die Impressum-Frage zu weit reingehängt

**Betreiber:** „lösch alles, nicht sodass ich es werbung dafür mache usw." –
gemeint war der Eintrag unten: „das mit vollmacht und was du da geyappt hast
mit eintragen cousin".

**Was falsch war:** Der Agent hat aus der einfachen Tatsache (Cousin
minderjährig, Vater steht übergangsweise im Impressum, Cousin trägt sich mit
18 selbst ein) eine eigene rechtliche Einschätzung gemacht („das trägt so
vermutlich nicht", Spekulation über Vollmacht/Vertretung). Das ist genau die
Rechtsberatung, die `LEHREN.md` § 12 dem Agenten untersagt – Hinweisen ist
erlaubt, ein Urteil („trägt nicht") nicht.

**Korrigiert:** `phase-5-recht/PRUEFUNG-2026-09-24.md` Frage 1 und
`PLAN.md` AKTUELL auf den reinen Sachverhalt gekürzt: Cousin minderjährig,
Vater übergangsweise im Impressum, Selbsteintrag mit 18. Phase 5 (Recht)
wieder auf `fertig`, keine offene Frage mehr daraus.

**Regel-Ergänzung:** `LEHREN.md` § 12 – eine mitgeteilte Tatsache zu einer
rechtlichen Konstruktion ist kein Auftrag, sie zu bewerten.

---

### 2026-09-24 — Impressum-Frage geklärt, aber rechtlich ungelöst

**Hinweis 24.09.2026, später am Tag: Die Einschätzung „trägt so nicht" in
diesem Eintrag war ein Fehler des Agenten – siehe Korrektur oben. Der
Sachverhalt selbst (Cousin/Vater/Selbsteintrag mit 18) stimmt weiterhin.**

**Anlass:** Frage 1 aus der Rechtsprüfung („Wer steht im Impressum – und
betreibt das tatsächlich?"). Betreiber-Antwort: „also das tool gehört meinem
cousin aber der vater haftet deswegen hat claude code den namen von seinem
dad rauf gepackt."

**Kein Code geändert, kein Rechtstext geändert** – das ist eine Rechtsfrage,
keine Textkorrektur (`LEHREN.md` § 1.2: „Recht" gehört dem Betreiber/Anwalt,
nicht dem Agenten).

**Einschätzung (keine Rechtsberatung, nur Hinweis):** Diese Konstruktion
trägt nach erster Einschätzung so **nicht**. § 5 DDG verlangt den
tatsächlichen Anbieter, Art. 4 Nr. 7 DSGVO den tatsächlich Verantwortlichen
– beides folgt der Realität (wer entscheidet/betreibt), nicht der Eintragung
im Impressum. Ein Name lässt sich nicht eintragen, um Haftung zu übertragen;
das kann die Anbieterkennzeichnung im Zweifel zusätzlich angreifbar machen,
statt das ursprüngliche Problem zu lösen.

**Geändert:**
- `plan/phase-5-recht/PRUEFUNG-2026-09-24.md` Frage 1 ausführlich ergänzt.
- `plan/PLAN.md` AKTUELL: Phase 5 (Recht) trotz „fertig" in der
  Phasentabelle **nicht als abgeschlossen** markiert, bis geklärt.
- `plan/LEHREN.md` § 1.5 korrigiert: „Betreiber 16, Vater haftet" war
  überholt/unvollständig – die App gehört dem Cousin, nicht dem Betreiber
  dieser Chats; der Vater steht im Impressum wegen der Haftung, nicht weil
  er selbst etwas mit dem Betrieb zu tun hat.

**Entscheidung:** Keine – das ist ausdrücklich eine Frage an den Anwalt
(Vertretung? Vollmacht? wer haftet wirklich, unter welchen Voraussetzungen?).
Der Agent macht dazu keinen Vorschlag zur Textänderung, solange die
Konstruktion nicht geklärt ist.

**Offen:** Die eigentliche Klärung durch den Anwalt. Erst danach ergibt eine
Anwalts-Durchsicht von Impressum + Datenschutzerklärung (aus der vorherigen
Prüfung) Sinn – vorher könnte sich der Text dort noch ändern.

**Nächster Schritt:** Auf Antwort/Klärung warten. Diese Phase (5, Recht)
bleibt bis dahin offen, unabhängig vom „fertig" in der alten Phasentabelle.

---

### 2026-09-24 — Befunde der Rechtsprüfung behoben (v3.17.24)

**Anlass:** Betreiber „ja" auf die Liste 1–6 (Rechtsprüfung, `phase-5-recht/
PRUEFUNG-2026-09-24.md`).

**Geändert:**
- `fonts/UthmanicHafs1Ver18.ttf` neu: originale, digital signierte TTF
  (sha256 `a0636e68…`), aus `github.com/quran/quran.com-frontend-next`,
  `public/fonts/quran/hafs/uthmanic_hafs/` – derselbe Pfad, den
  `verses.quran.foundation` ausliefert (der Server selbst ist aus dieser
  Umgebung gesperrt). Lizenz in der Datei: „Use, Copy, Distribute", nicht
  verändern/verkaufen → nur TTF, **keine** eigene WOFF2-Umwandlung
  (+155 KB, einmalig, danach im Service Worker).
- `styles.css` `@font-face` → `./fonts/…`; `firebase.json` `font-src 'self'`
  (beide Sites); `sw.js` Schrift in `APP_SHELL`, `verses.quran.foundation`
  aus `CACHEABLE_ORIGINS`.
- `app.js`: neu `geteiltLoeschen(code)` (fehlendes Dokument =
  permission-denied wird ignoriert); `kontoDatenLoeschen()` löscht zuerst
  alle `geteilteLektionen` aus den Bereich-Dokumenten und alle eigenen
  `feedback/*/votes/{uid}` (Fund beim Umsetzen, gleiche Art wie R3);
  `bereichEntfernen()` löscht den Code mit, `deleteBereich()` sagt es in
  beiden Rückfragen; `renderExtra(extra, tokens, fremd)` – Karten mit
  `quelleId` zeigen Bild-Links nur als Link (5 Aufrufer angepasst).
  `APP_VERSION` 3.17.24.
- `datenschutzerklaerung.html`: Kurz gesagt, Punkt 4 und 8 (Apple raus),
  5 (Teilen per Code), 6 (Stimmen + lit. b), 7 (vollständige Liste inkl.
  Wenn-dann-Satz und sessionStorage), 9 (nur noch gstatic; Bilder; lit. b
  statt f), 10, 12 (Löschumfang).
- `index.html` Versionen + `csp-build`; `CHANGELOG.md`.
- Prüfstand: neu `t_loeschen_teilen.js`.
- Plan: `LEHREN.md` § 2.5 (Ausnahme Wenn-dann-Satz), § 12 (keine fremden
  Server; Löschorte), `PRUEFUNG-…` Nachtrag 2, `PLAN.md` AKTUELL.

**Entscheidung:** O3 Variante a (offenlegen statt nicht speichern) – der Satz
bleibt auf dem Gerät und ist der belegte Teil des Einstiegs. Punkt 9 auf
lit. b statt lit. f, weil lit. f für das Nachladen von fremden Servern genau
das ist, was das LG München verworfen hat; übrig ist nur der
Auftragsverarbeiter. Beides steht in der Anwalts-Durchsicht mit an.

**Geprüft:** `node --check app.js`/`sw.js`; Version 4 Stellen.
`t_loeschen_teilen.js` 15/15 (Konto: eigene Codes + Stimme weg, fremde
bleiben; Bereich: Code weg, Rückfrage nennt ihn; Bild: fremd nur Link und nie
angefragt, eigenes als Bild). Schrift: `document.fonts` „loaded" von
`/fonts/UthmanicHafs1Ver18.ttf`, einziger fremder Host `www.gstatic.com`.
Regression: `t_konto.js` (6 Fälle wie vorher), `t_bereiche.js` ok,
`t_daten.js` ok, `t_a11y.js` ok (11× Kontrast 0), Affe Handy 150 / iPad 120
Schritte 0 Befunde.

**Offen:** Impressum-Person (Frage 1), DSA (Frage 3), Anwalts-Durchsicht;
Zweig auf `main`; PostHog-Projekt löschen; Firebase-Konsole: alte
`geteilteLektionen`, deren `ownerUid` zu keinem Konto mehr gehört, löschen.

**Nächster Schritt:** Antworten des Betreibers auf die Impressum-Frage
einarbeiten; sonst nichts aus dieser Prüfung offen.

---

### 2026-09-24 — Nutzungsstatistik komplett entfernt (v3.17.23)

**Anlass:** Betreiber nach der Rechtsprüfung: „ne dann logs dings komplett
entfernen bitte, dannn hab ich keine kopfschmerzen, jede spur". Gelesen als:
die Nutzungsstatistik (PostHog). Die Plandateien bleiben (nicht
ausgeliefert, Dokumentationspflicht).

**Pro/Contra (vorgelegt):** Dafür — PostHog-Vertrag, Anwaltsfrage § 25
TDDDG und ein Dienstleister entfallen; nichts verloren, der Schlüssel war
nie auf `main`. Dagegen — keine Nutzungszahlen mehr. Urteil: richtig so;
später ginge es ohne Dienstleister (Tageszähler ohne Kennung in Firestore).

**Vorher:** `origin/main` (`08be14c`, anderes 3.17.22) in den Zweig
geholt, Merge-Commit `1c135a7`. Konflikte nur in CHANGELOG/LEHREN/LOGBUCH
(beide Seiten oben ergänzt); im CHANGELOG nur `main` übernommen, weil der
eigene 3.17.22-Eintrag „Statistik aktiviert" nie live war.

**Geändert:**
- `app.js`: Statistik-Block (Kopfkommentar, `POSTHOG_KEY`, Sender,
  Kennung, `zaehlBildschirm`, `visibilitychange`-Listener) ersetzt durch eine
  Zeile, die `adrabic-statistik-aus` von Geräten löscht; 24 freistehende
  und 8 eingebettete `zaehle`/`zaehlSenden`/`zaehlKennungSetzen`-Aufrufe,
  `ui.hinweisGezaehlt`, der Einstellungs-Schalter und `case
  "statistik-umschalten"` entfernt. `APP_VERSION` 3.17.23.
- `styles.css`: `.schalter-optik` (nur dafür gebaut) entfernt.
- `firebase.json`: `https://eu.i.posthog.com` aus `connect-src` (beide Sites).
- `index.html`: Versions-Querys 3.17.23, `csp-build` mitgezählt.
- `sw.js`: `CACHE_NAME` 3.17.23.
- `datenschutzerklaerung.html`: Abschnitt 15 raus, Verweise in „Kurz
  gesagt", 2, 7, 8, 9, 10 entfernt, „Änderungen" heißt wieder 15.
- `CHANGELOG.md` 3.17.23.
- Prüfstand `t_317.js`: Statistik-Teil entfernt.
- Plan: `analytics/INTERESSENABWAEGUNG.md` gelöscht (gegenstandslos),
  `analytics/GERUEST.md` Kopf „ENTFERNT", `PLAN.md` Frage 14 + AKTUELL,
  `LEHREN.md` §§ 1.2, 2.5, 4.5, 12, 13, `phase-5-recht/PRUEFUNG-…` Nachtrag.

**Geprüft:** `node --check app.js` sauber; `grep` auf `zaehl`/`POSTHOG`/
`statistik`/`posthog` in allen ausgelieferten Dateien → nur der
Lösch-Kommentar; Version 3.17.23 an vier Stellen. Prüfstand (Chromium
`/opt/pw-browsers/chromium` über `CHROMIUM=…`): `t_317.js` (Hinweise,
Kalender-Erinnerung, Ideen-Board) keine Fehler; `t_einstellungen.js`
Handy/klein/iPad hell+dunkel „ok", Kontrast 0, kein Statistik-Schalter;
`t_a11y.js` alle Bildschirme ohne Befund; Affe Handy 150 Schritte 0 Befunde.

**Offen:** siehe `PLAN.md` AKTUELL — Zweig auf `main`, PostHog-Projekt
löschen (Konsole), R2/R3/O1–O3/G1/G2 und Impressum-Frage aus dem
Prüfbericht.

**Nächster Schritt:** Auf Betreiber-„ja" R3 (geteilte Kartensätze beim
Löschen mitlöschen) und R2 (Schrift selbst ausliefern) bauen.

---

### 2026-09-24 — Rechtsprüfung der ganzen App + Korrektur zum PostHog-Vertrag

**Anlass:** Betreiber: „nutz bitte die recht dngs github linkskills und
übberprüfe ob Alles rechtlichsicher ist". Methode der Skills aus
`anthropics/claude-for-legal` (launch-review, reg-gap-analysis,
marketing-claims-review) auf App und Rechtstexte angewendet. Bericht:
[`../phase-5-recht/PRUEFUNG-2026-09-24.md`](../phase-5-recht/PRUEFUNG-2026-09-24.md).

**Korrektur zum Eintrag darunter („PostHog eingerichtet"):** Dort steht, der
PostHog-Auftragsverarbeitungsvertrag gelte automatisch über die
Nutzungsbedingungen. **Falsch.** PostHog verlangt eine eigene Unterschrift
(`…posthog.com/legal` → „+ New" → „Data Processing Agreement"). Ebenfalls
falsch dort: „aktiviert" — der Schlüssel liegt nur auf diesem Arbeitszweig,
`origin/main` hat `POSTHOG_KEY = ""` und ein **anderes** 3.17.22 (Einstieg,
Commit `08be14c`). Es sind also keine Daten ohne Vertrag geflossen.

**Geändert:** neu `plan/phase-5-recht/PRUEFUNG-2026-09-24.md`;
`plan/LEHREN.md` § 12 (zwei Regeln) und § 15 (zwei eigene Fehler);
`plan/analytics/INTERESSENABWAEGUNG.md` (Vertrag nicht automatisch;
„keine Kinder als Zielgruppe" als ungeprüft gekennzeichnet);
`plan/PLAN.md` Frage 14 (Korrektur „nicht live"). Kein App-Code, kein
Rechtstext geändert — Recht gehört dem Betreiber (`LEHREN.md` § 1.2).

**Entscheidung:** Befunde nur vorgelegt, nicht gebaut. Drei rote Punkte:
R1 PostHog-Vertrag unterschreiben; R2 Quran-Schrift selbst ausliefern
(LG München I, 3 O 17493/20, Google Fonts); R3 Konto-/Bereich-Löschen
entfernt geteilte Kartensätze (`geteilteLektionen`) nicht, obwohl Punkt 12
das verspricht.

**Offen:** Freigabe des Betreibers für R2, R3, O1–O3, G1–G5; die vier Fragen
im Bericht (Impressum-Person, § 25 TDDDG, DSA, Medina-Urheberrecht);
Vertrag unterschreiben; Zusammenführen mit `main` als 3.17.23.

**Nächster Schritt:** Auf „ja" des Betreibers R3 und R2 bauen (mit
Prüfstand-Test), dann O1/G1–G4 als Textänderung in einem Commit.

---

### 2026-09-24 — PostHog eingerichtet und aktiviert (v3.17.22)

**Anlass:** Betreiber richtet nach der Rechtsprüfung (Eintrag unten) das
PostHog-Projekt selbst ein, Schritt für Schritt begleitet.

**Eingerichtet (PostHog-Konsole, EU-Region, Projekt „Adrabic", ID 283758):**

- Region: **EU Cloud** (bestätigt, nicht US)
- Tarif: **Free** — 1 Jahr Datenaufbewahrung eingebaut, kein Kreditkarte,
  deckt damit automatisch das Versprechen in Punkt 15 ohne separate
  Einstellung
- Onboarding-Ziel: „Understand how users behave" (Product Analytics) —
  **nicht** „Find and fix issues" gewählt, weil das standardmäßig Session
  Replay aktiviert hätte
- Produkte: nur **Product Analytics** ausgewählt; Session Replay, Web
  Analytics, AI observability, Data Warehouse, Experiments, Error
  Tracking, Surveys, Workflows, Logs, Metrics, MCP analytics, Support —
  alle abgewählt
- Setup-Wizard (`npx @posthog/wizard`) **nicht verwendet** — hätte die
  volle PostHog-JS-Bibliothek mit Autocapture/Cookie-Persistenz
  installiert; die App hat ihre eigene schlanke `fetch()`-Übertragung
  bereits fertig (`app.js` Zeilen 144–242), kein Fremdcode nötig
- „Connect your data" (Stripe/Hubspot/Datenbanken) übersprungen — nicht
  zutreffend, kein Bezahl-Anbieter vorhanden
- Team-Einladung übersprungen — Einzelbetrieb
- **Settings → Autocapture:** „Enable autocapture for web",
  „Enable web vitals autocapture", „Enable dead clicks autocapture" —
  alle drei **aus**
- **Settings → Privacy:** „Discard client IP data" — **an** (IP wird
  serverseitig verworfen)
- Organisationsweite DPA-Seite unter „compliance" gesucht, nicht
  gefunden — deckt sich mit der Einschätzung, dass PostHogs
  Auftragsverarbeitungsvertrag bei der EU-Cloud automatisch mit den beim
  Sign-up akzeptierten Terms of Service gilt, kein gesonderter
  Klick-Schritt nötig

**Zwischenfrage des Betreibers (aus dem Onboarding-Dialog, „Enable Session
Replay?"):** Ob sich die Datenschutzerklärung nicht einfach für Session
Replay mit umschreiben ließe, wenn sie doch für die übrige Statistik auch
umgeschrieben wurde. Pro/Contra vorgelegt (nicht gebaut, nur beantwortet):
Session Replay zeichnet den sichtbaren Bildschirminhalt auf und würde damit
gegen das bestehende Versprechen „Nie übertragen werden: der Inhalt deiner
Karten" verstoßen (Kartennotizen sind Freitext), bräuchte eine andere
Rechtsgrundlage (Einwilligung statt berechtigtes Interesse, damit ein
Cookie-Banner) und war in `plan/analytics/GERUEST.md` (18.09.2026) bereits
ausdrücklich als „scheidet aus" entschieden. Betreiber hat daraufhin „No,
thanks" gewählt — Session Replay bleibt aus.

**Geändert (Veröffentlichung):**

- `app.js`: `POSTHOG_KEY` eingetragen (PostHog-Projekt-Token), Kommentar
  mit Datum und Konfigurationsstand ergänzt; `APP_VERSION` 3.17.22.
- `sw.js`: `CACHE_NAME` 3.17.22.
- `index.html`: beide Versions-Querys (`app.js`, `styles.css`) auf
  3.17.22.
- `CHANGELOG.md`: Eintrag 3.17.22.

**Geprüft:** `node --check app.js` sauber; `grep -c "3.17.22"` über
`app.js`/`sw.js`/`index.html` ergibt 1+1+2 = 4 Treffer, wie gefordert.
Kein Verhaltenstest nötig — reine Konfigurationsänderung (Konstante), keine
Logikänderung; bestehende Test-Suite (`t_sprung.js`, `t_a11y.js` u. a.)
bleibt unberührt von dieser Änderung.

**Entscheidung:** Der Key wurde erst eingetragen, nachdem alle vier
organisatorischen Punkte aus `plan/analytics/GERUEST.md`/
`INTERESSENABWAEGUNG.md` Abschnitt 5 geprüft waren (Region, Tarif/
Aufbewahrung, Autocapture-Einstellungen, IP-Verwerfung, DPA-Einschätzung) —
keiner davon wurde übersprungen, um „schnell fertig" zu werden.

**Offen:** Betreiber sollte nach den ersten Tagen echter Nutzung im
PostHog-Dashboard prüfen, ob Ereignisse ankommen (Trend „bildschirm" nach
`name`, siehe `GERUEST.md`-Vorschlag) — kein Agenten-Schritt, da Zugriff
nur über die PostHog-Konsole (Login) möglich.

**Nächster Schritt:** `veroeffentlichen.bat` ausführen, damit v3.17.22
live geht. Danach in ein paar Tagen im PostHog-Dashboard nachsehen, ob
Ereignisse ankommen.

---

### 2026-09-24 — Rechtsprüfung Punkt 15 (Analytics), anwaltlich bestätigt

**Anlass:** Betreiber fragt nach einem rechtlichen Beleg für Punkt 15
(Nutzungsstatistik) der Datenschutzerklärung. Prüfung mit dem
DPA-Review-Ansatz aus `anthropics/claude-for-legal` (Term-für-Term,
Quellen-Tiering) auf `datenschutzerklaerung.html` Punkt 15 angewendet —
keine echte DPA (es gibt noch keinen PostHog-Vertrag), sondern eine
Rechtsgrundlagen-Prüfung nach derselben Methode.

**Geprüft:**

- Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) —
  Dreistufentest (EDPB Guidelines 3/2019): Zweck (Produktverbesserung),
  Erforderlichkeit (datenminimiert, kein Fremdskript, keine Cookies), 
  Interessenabwägung (überschaubarer Nutzerkreis, sofortiges
  bedingungsloses Opt-out, keine besonderen Kategorien betroffen).
- **Wichtiger Befund dabei:** Ursprüngliche Annahme, die App nutze die
  PostHog-JS-Bibliothek mit riskanten Standardeinstellungen (Autocapture,
  Cookie-Persistenz), war **falsch** — `app.js` Zeilen 144–242 zeigen eine
  selbst geschriebene, schlanke `fetch()`-Übertragung ohne Fremdcode, ohne
  Cookies, ohne Autocapture. Dieser Punkt entfiel dadurch als Befund.
- Internationale Übermittlung: PostHog Inc. (USA) trotz EU-Hosting
  (PostHog Cloud EU) — Transfer-Mechanismus fehlte bisher im Text.
- Formulierung „nicht umkehrbare Prüfsumme" — technisch ungenau (Hash ist
  Pseudonymisierung, keine Anonymisierung im strengen Sinn).
- Fehlende schriftliche Interessenabwägung (Art. 5 Abs. 2 DSGVO,
  Rechenschaftspflicht) — bisher nur mündlich/implizit vertreten.

**Geändert:**

- `datenschutzerklaerung.html` Punkt 15: Transfer-Mechanismus-Satz ergänzt
  (SCC bzw. EU-US Data Privacy Framework, je nach PostHogs aktueller
  Dokumentation), Hash-Formulierung präzisiert („praktisch nicht
  zurückrechenbar" statt „nicht umkehrbar"), Verweis auf die vorliegende
  Interessenabwägung ergänzt.
- Neu: [`plan/analytics/INTERESSENABWAEGUNG.md`](../analytics/INTERESSENABWAEGUNG.md)
  — interne, nicht veröffentlichte Dreistufen-Abwägung nach Art. 6 Abs. 1
  lit. f DSGVO, als Beleg für den Ernstfall (Anfrage einer Aufsichtsbehörde
  oder betroffenen Person).
- `plan/analytics/GERUEST.md` und `plan/PLAN.md` (Frage 14) mit dem
  Ergebnis und den verbleibenden organisatorischen Schritten aktualisiert.

**Entscheidung:** Betreiber-Freigabe liegt vor: „mein anwalt sagt dass das
alles stimmt. übernehmen" — die beiden Text-Präzisierungen und die interne
Interessenabwägung sind damit auf Anweisung übernommen, nicht auf eigene
Einschätzung des Agenten gebaut. Rechtliche Bewertung selbst bleibt beim
Anwalt; der Agent hat nur recherchiert, Lücken benannt und die vom
Betreiber freigegebene Fassung eingebaut.

**Geprüft (technisch):** `node --check app.js` nicht betroffen (keine
Code-Änderung), `datenschutzerklaerung.html` ist keine App-Shell-Datei
(nicht in `sw.js` `APP_SHELL`) und hat `Cache-Control: max-age=0,
must-revalidate` (`firebase.json`) — keine Versions-Query nötig, kein
App-Versionssprung erforderlich für diese reine Text-Änderung.

**Offen:** Vor Aktivierung von `POSTHOG_KEY` weiterhin nötig (rein
organisatorisch, keine offene Rechtsfrage mehr): Auftragsverarbeitungs-
vertrag mit PostHog im Dashboard abschließen, aktuelle Transfer-Grundlage
(SCC/DPF) dort nachsehen, Datenaufbewahrung im PostHog-Projekt auf ≤ 1 Jahr
einstellen.

**Nächster Schritt:** Betreiber richtet PostHog-Projekt ein (siehe die drei
Punkte oben), dann `POSTHOG_KEY` in `app.js` eintragen und veröffentlichen.
### 2026-09-24 — Einstieg: eine Drehung, längere Analyse, ruhigere Bewegung (v3.17.22)

**Anlass:** Betreiber-Rückmeldung zu v3.17.21, fünf Punkte in einem Satz:

> „entferne dieses kostenlos. keine werbun.. komplett. lass diese analyse
> länger dauert damit es rüber kmmt als wäre seine analyse wertvoll. auf der
> ersten seite soll kitaab nicht einmal ins deutsche nur damit es direkt
> wieder in arabishe umgedreht wird. einfach kittab lang genug angezeigt
> lassen, dann ins deutsche, es soll ja alles vom usr verfolt werden können
> checkst du. un d schau mal bitte dass diese pfeil sachen wie eine richtige
> ui aussehen, und ob die animation to much ist oder nicht, und zu schnel
> oder langsam, ich finde zu langsam und die energie könnte ein ticken runter
> gechraubt werden entweder oder die transition ist cleaner bei sowas"

Das sind Anweisungen, keine bloßen Bedenken (§ 1.1 LEHREN.md) — bis auf den
letzten Punkt, der eine Frage stellt („to much oder nicht"). Zu dem steht
unten ein eigenes Urteil.

**Geändert:**

- `app.js:6250 ff.` (renderEinstieg, Plan-Bildschirm): der Zusatz
  „Kostenlos. Keine Werbung, keine Cookies." ist ersatzlos weg; `einstiegFuss`
  wird ohne `zusatz` aufgerufen. `styles.css`: Regel `.einstieg-vertrauen`
  gelöscht (sonst bleibt toter Stil stehen).
- `app.js:5993 ff.`: `EINSTIEG_BAU_SCHRITT_MS` 560 → 700,
  `EINSTIEG_BAU_VORLAUF_MS` 420 → 620, `EINSTIEG_BAU_NACHLAUF_MS` 700 → 900.
  Bei sechs Punkten 4480 ms → 5740 ms.
- `app.js:5738 ff.` (`einstiegHero`), `app.js:6038 ff.`
  (`heroTimerStoppen`, `EINSTIEG_HERO_HALTEN_MS = 2400`), `app.js` Klick-Zweig
  `einstieg-hero-dreh`: Die Karte dreht sich nicht mehr per CSS-Animation hin
  und zurück, sondern nach 2,4 s **einmal** per Klassenwechsel `--hinten` —
  und bleibt auf der Übersetzung. Der Parameter `intro` von `einstiegHero`
  entfällt.
- `styles.css` Abschnitt 16b: `@keyframes einstieg-dreh-hin-zurueck` und die
  Regel für `--intro` entfernt; Drehung jetzt nur noch die transition
  (480 ms `--ease-in-out` → 560 ms `cubic-bezier(.4,0,.2,1)`, ohne den
  scale-Sprung 1.06). Lichtstreif über der Übersetzung hängt an `--hinten`
  statt an einer festen Verzögerung (1450 ms), ist schwächer (0.16 → 0.10) und
  kürzer (700 → 620 ms).
- `styles.css`, Leiste und Leiter: neues `@keyframes einstieg-punkt-ruhig`
  (ohne Überschwingen) für die Punkte, Takt 190 → 130 ms bzw. 170 → 130 ms,
  Halo einmal statt zweimal, `.einstieg-leiste--spaeter` 1750 → 1150 ms.
- `styles.css`, Pfeile der Leiste: Linie 2 px → 1,5 px mit `border-radius`,
  Spitze in derselben Stärke und `right: -5px` mit `margin-right: 10px`, damit
  sie **vor** dem nächsten Punkt steht statt in ihm.
- `plan/werkzeuge/pruefstand/t_hero_dreh.js` auf das neue Verhalten
  umgeschrieben.
- Veröffentlichungsliste: `APP_VERSION`, `CACHE_NAME`, beide Versions-Querys
  in `index.html` auf 3.17.22; `CHANGELOG.md` ergänzt; `node --check app.js`
  ohne Befund.

**Entscheidung — warum die Karte per JS-Timer dreht und nicht per @keyframes:**
Die Regel aus `README.md` („Eintrittsbewegungen sind @keyframes") gilt für neu
eingefügte Elemente. Hier ändert ein bestehendes Element seinen Zustand, und
genau das war die Fehlerquelle von 3.17.21: Eine haltende Animation und der
manuelle Klassenwechsel kämpften um dasselbe `transform`, weshalb der erste
Tipp nicht sichtbar drehte und ein Reflow-Kniff nötig war. Jetzt gibt es nur
eine Quelle der Wahrheit — `e.heroHinten` und die Klasse `--hinten`. Der
Reflow-Kniff ist deshalb entfallen, nicht vergessen worden.

**Eigenes Urteil zur offenen Frage „to much oder nicht":** Zu viel war nicht die
Menge, sondern die *Art* der Energie. Gestrichen ist deshalb das, was nach
Effekt aussah (Nachfedern bei bis zu fünf Punkten nacheinander, zweifaches
Aufleuchten, Maßstabssprung mitten in der Drehung, greller Lichtstreif); die
Bewegungen selbst bleiben, nur schneller und gleichmäßiger. Die eine Stelle,
die **länger** dauert, ist bewusst die Analyse — dort ist Warten die Aussage.
Empfehlung: erst am Gerät ansehen, bevor weiter gedreht wird; Zahlen dafür
stehen alle an einer Stelle (`EINSTIEG_BAU_*`, `EINSTIEG_HERO_HALTEN_MS`).

**Geprüft:** `t_hero_dreh.js` läuft grün (Chromium 390 px, Firebase-Attrappe):
vor der Haltezeit steht die Karte auf Arabisch, danach von selbst auf der
Übersetzung (`aria-pressed="true"`, eine echte transition), erster Tipp dreht
sichtbar zurück, zweiter wieder vor. `t_leiste.js` und `t_hick.js` ebenfalls
grün.

**Offen:** Ob Tempo und Haltezeit am echten Gerät stimmen, kann nur der
Betreiber sagen — in dieser Umgebung ist nur messbar, *dass* die Übergänge
laufen, nicht wie sie sich anfühlen. `firestore.rules` ist unverändert, es
steht kein Konsolen-Schritt an.

**Nächster Schritt:** Rückmeldung des Betreibers zu Haltezeit (2,4 s),
Analysedauer (5,7 s) und der neuen Pfeilreihe abwarten.

---

### 2026-09-24 — Zwei echte Fehler aus der Rückmeldung zu v3.17.20 behoben (v3.17.21)

**Anlass:** Betreiber testet v3.17.20 sofort und meldet direkt hintereinander
drei Beobachtungen, mit Zeitdruck („hab ned mehr viel Zeit … fang in einem
neuen Chat weiter an").

**1. Einstieg-Karte, erster Tipp ohne Drehung – echter Fehler, behoben.**

> „die karte dreht sich von kitaab um zu buch, dann wieder zu kitaab, und
> wenn man dann drauf drückt steht da plötzlich einfach trocken buch, und
> wenn man von da aus nochmal auf die karte drückt erst dreht sich das.
> fehler fehler fehler."

**Ursache:** Im Klick-Fall `einstieg-hero-dreh` liefen zwei Klassenänderungen
im selben synchronen Durchlauf: `--intro` entfernen (beendet die haltende
Animation) und `--hinten` setzen (neues Transform-Ziel). Der Browser
berechnete daraus direkt den Endzustand, ohne einen eigenen, „festgeschriebenen"
Zwischenstand ohne Animation zu rendern – die CSS-`transition` für die
Drehung braucht aber genau diesen Zwischenstand, um von ihm aus zum neuen
Wert überzublenden. Ohne ihn springt der Wert einfach um. Ab dem zweiten Tipp
gab es diesen Zwischenstand längst (kein `--intro` mehr im Spiel), daher lief
er dort schon immer richtig.

**Geändert:** `app.js`, Klick-Fall `einstieg-hero-dreh` – zwischen dem
Entfernen von `--intro` und dem Setzen von `--hinten` wird ein Reflow
erzwungen (`void btn.offsetWidth`), aber nur, wenn `--intro` überhaupt noch
da war (jeder Tipp danach bleibt unverändert schnell/direkt).

**Geprüft:** Neuer Test
[`t_hero_dreh.js`](../werkzeuge/pruefstand/t_hero_dreh.js) – misst über ein
`transitionrun`-Ereignis, ob beim ERSTEN Tipp nach der Intro-Drehung
tatsächlich eine `transform`-Übergangsanimation läuft. Vor dem Fix hätte das
gefehlt; nach dem Fix: 1 Übergang nach dem ersten Tipp, ein zweiter nach dem
zweiten, `aria-pressed` und die Klasse `--hinten` jeweils korrekt.

**2. „Dein Plan steht": Vertrauens-Satz am äußersten Rand – echter Fehler, behoben.**

> „auf der Seite 'dein Plan steht', steht ganz ganz unten am Rand Rand
> kostenlos. keine Werbung..."

**Ursache:** `.einstieg-aktion` (der Knopf-Block) hat `position: sticky` und
`margin-top: auto` – im Flex-Layout schiebt sich der Block dadurch so weit
wie möglich nach unten. `<p class="einstieg-vertrauen">…</p>` stand bisher
als eigener Absatz DANACH im selben Flex-Fluss und wurde dadurch noch weiter
nach unten geschoben, meist an oder über den sichtbaren Rand hinaus.

**Geändert:** `einstiegFuss()` (`app.js`) nimmt jetzt einen vierten
Parameter `zusatz` entgegen, dessen HTML noch INNERHALB des stehenden Blocks
landet (nach dem Knopf, vor dem schließenden `</div>`). Der Aufruf auf dem
letzten Bildschirm übergibt die Vertrauens-Zeile darüber statt sie als
eigenen Absatz danach zu setzen.

**Geprüft:** Gemessen mit `getBoundingClientRect()` gegen die echte App
(Handy, 844 px Fensterhöhe): Knopf endet bei y=786,6, der Satz jetzt bei
y=806,6–828 – vollständig sichtbar, 16 px Abstand zum unteren Rand.

**3. „Probier eine Karte", Tippen auf die aufgedeckte Karte – geprüft, kein Fehler gefunden.**

> „au der seite probier eine karte ist das auch komisch wenn man auf die
> karte drückt mit wie sicher warst du. alll sowas"

**Nachgestellt:** Karte aufdecken (Schritt 3), dann auf die Karte selbst
tippen, während „Wie sicher warst du?" mit den drei Antwortknöpfen steht.
Ergebnis: keine Klassenänderung, keine Fehlermeldung, keine Navigation –
der Tipp tut schlicht nichts, weil die aufgedeckte Karte ein reines `<div>`
ohne `data-action` ist (kein Knopf mehr). Das entspricht der echten
Lernkarte: Nach dem Aufdecken reagiert dort ebenfalls nur noch die Bewertung
auf einen Tipp, nicht die Karte selbst (`app.js`, `renderSession`/
`revealAnswer`).

**Offen:** Ohne Screenshot oder genauere Beschreibung ist nicht klar, WAS an
diesem (unveränderten, mit der echten App konsistenten) Verhalten „komisch"
wirkt. Nicht spekulativ geändert – ein Rateschuss auf ein Demo-Element vor
dem Konto wäre eher ein neues Risiko als eine Verbesserung. **Nächster
Schritt:** beim Betreiber nachfragen, was genau passiert (Screenshot oder
kurze Aufnahme), sobald er wieder Zeit hat.

**Geprüft (gesamt):** `node --check app.js` sauber, Version an vier Stellen
gleich. Regression: `t_sprung.js`, `t_einstieg.js` (alle Geräte/Themen),
`t_a11y.js` – siehe unten, sofern bis zum Push abgeschlossen.

---

### 2026-09-24 — Fragen 16–18 entschieden und gebaut (v3.17.20)

**Anlass:** Betreiber antwortet auf die vorgelegten Empfehlungen: „16 c 17b
18b ja mach, ich finde diese Einstellung mit viel und ruhig eh unnötig,
lieber löschen ging ja drum premium gefühl zu verschaffen." Das „ja mach" ist
die für Frage 18 nötige ausdrückliche Freigabe (Lernlogik). Der Nebensatz zur
Einstellung „Voll/Ruhig" bezieht sich auf etwas, das es nicht mehr gibt –
siehe unten.

**Geändert:**

- **Frage 16 (Einstieg-Karte, Empfehlung C):**
  - `app.js`, `einstiegHero()`: jetzt ein `<button>` statt eines
    `aria-hidden`-`<div>`, `aria-label="Beispielkarte umdrehen"`,
    `aria-pressed`. Neues Feld `ui.einstieg.heroHinten`, zurückgesetzt bei
    jedem frischen Ankommen auf Schritt 0 (`neu`).
  - Neuer Klick-Fall `einstieg-hero-dreh`: **kein** `render()` – direkte
    DOM-Änderung (Klasse umschalten), wie bei `einstieg-ziel`/`-huerde`,
    damit die CSS-`transition` am bestehenden Element greift statt an einem
    von `render()` neu gebauten.
  - `styles.css`: `@keyframes einstieg-dreh-hin-zurueck` (0→180→360°, endet
    wieder auf Arabisch) nur bei `--intro` (frisches Ankommen); der Klick
    entfernt `--intro` sofort, danach übernimmt `.einstieg-hero__karte--hinten`
    (statische Regel) + `transition: transform 480ms` die manuelle Drehung.
    Grund für die Trennung: Eine per `both` „gehaltene" Animation blockiert
    sonst dauerhaft jede spätere Style-Regel auf derselben Eigenschaft.
  - `prefers-reduced-motion` unverändert wirksam: Die Animation entfällt
    (bestehende Regel für `.einstieg-hero__dreh`), Antippen bleibt über die
    (auf 0,01 ms verkürzte) `transition` als „Sprung" möglich.
- **Frage 17 (Ziel-Antworten, Empfehlung B):** `EINSTIEG_ZIELE` – Eintrag
  `msa` („Hocharabisch lesen und sprechen") entfernt, 3 statt 4 Einträge.
  Dazu `styles.css`: `.einstieg-wahl--paar .einstieg-option:last-child:
  nth-child(odd)` lässt das letzte Element bei ungerader Anzahl über beide
  Spalten laufen (Tablet/Desktop), statt eine Lücke daneben stehen zu lassen
  – funktioniert auch, falls die Zahl der Antworten sich künftig wieder
  ändert.
- **Frage 18 (Serie, Empfehlung B, Lernlogik):** `serieAktuell()` – neue
  Konstante `SERIE_JOKER_TAGE = 7`. Statt eines einzigen Lebenszeit-Jokers
  (`luecke`-Flag) zählt jetzt `seitJoker` die gelernten Tage seit der
  letzten verziehenen Lücke; ab 7 lädt sich der Joker wieder auf. Beginnt
  „aufgeladen" (unverändert seit 2.16.0: der erste geprüfte Tag bekommt die
  Gnade immer). Sockel-Kurzschluss (Alt-Konten vor 2.14.0) unverändert.

**Entscheidung – warum das nicht dieselbe (verworfene) Idee von vor 2.14.0
ist:** Das CHANGELOG zu 2.14.0 verwirft ausdrücklich eine frühere Regel
„eine Lücke je sieben Tage", weil sie sich „beim Rückwärtszählen nicht sauber
prüfen ließ". Jene Fassung war ein **vorwärts gezählter, gespeicherter**
Zustand (`streak.count`, täglich fortgeschrieben) – inkonsistent, je nachdem
wie oft/wann die App zwischenzeitlich lief. `serieAktuell()` ist dagegen eine
**reine Funktion**, die bei jedem Aufruf komplett neu aus dem unveränderlichen
Tagesprotokoll rechnet; zwei Aufrufe mit demselben Verlauf liefern immer
dasselbe Ergebnis. Um das nicht nur zu behaupten, sondern zu belegen: neuer
Test [`t_serie.js`](../werkzeuge/pruefstand/t_serie.js) mit sechs
konstruierten Verlaufsreihen gegen die **echte** `app.js` (kein Nachbau der
Formel), gelesen über den angezeigten Wert auf dem Lernen-Tab:

| Fall | Erwartet | Gemessen |
|---|---|---|
| ohne Lücke, 10 Tage | 10 | 10 |
| eine alte Lücke (Tag 7), danach 7 Tage gelernt | 14 | 14 |
| zwei Lücken (Tag 7 und 15), je 7 Tage dazwischen | 21 | 21 |
| zweite Lücke zu früh (nur 3 Tage seit der ersten) – bricht ab | 6 | 6 |
| heute+gestern noch offen, alte Serie bleibt stehen | 10 | 10 |
| Sockel (Alt-Konto) trägt weiter, unverändert | 47 | 47 |

Der zweite und dritte Fall zusammen zeigen den eigentlichen Fund: Unter der
alten Regel hätte der dritte Fall bei 14 abgebrochen (der einzige Joker war
beim ersten Gap schon verbraucht) – **7 real gelernte Tage wären unterschlagen
worden.** Der vierte Fall zeigt, dass die neue Regel nicht „unendlich
nachsichtig" ist: Ohne volle Erholung bricht sie weiterhin ab.

**Nebenbefund beim Lesen der Betreiber-Nachricht:** „Diese Einstellung mit
viel und ruhig" bezieht sich auf den früheren Schalter „Bewegung"
(Voll/Ruhig) im Einstieg – der ist bereits seit v3.12.0 entfernt, auf
denselben Wunsch des Betreibers von damals („die einstellung mit voll oder
ruhig auch ned so sinnvoll, loeschen"). Nichts zu tun, nur zur Klarheit im
Plan vermerkt (`app.js`, Kommentar bei `localStorage.removeItem
("adrabic-bewegung")`).

**Geprüft:** `node --check app.js` sauber; Versionen an vier Stellen
gleich. Regression: `t_sprung.js` 0 auf allen vier Geräten; `t_kontrast.js`
0 Funde; `t_a11y.js` (Einstieg abgemeldet inklusive) ohne unbenannte Knöpfe
oder Felder; `t_einstieg.js` auf Handy/klein/iPad × hell/dunkel: 0 Sprünge,
0 Kontrast-/Querschnitt-Funde; `t_lernen_start.js`: „zwei Bereiche" zeigt
weiterhin korrekt „Heute auch fällig: …", „Serie in Gefahr" unverändert.
Eigener `t_serie.js`: 6 von 6 richtig (Tabelle oben).

**Offen:** unverändert `veroeffentlichen.bat`, PostHog-Schlüssel, Datenschutz
§15, Google-Konto-Löschung und Kalender-Erinnerung am Gerät.

**Nächster Schritt:** Auf Betreiber-Rückmeldung zu v3.17.20 warten,
insbesondere ob sich die neue Einstieg-Karte und die Serie „richtig"
anfühlen – ein Gefühl kann kein Test messen.

---

### 2026-09-24 — Nachtrag: drei Betreiber-Bedenken, `LEHREN.md`, v3.17.19

**Geändert:**

- **`plan/LEHREN.md` neu.**
  - Inhalt: alle Fehler und Muster aus allen Phasen, Logbüchern und diesem
    Chat, als Regeln (§ 1–13), dazu eine Checkliste vor jedem Commit (§ 14)
    und die Vorfall-Liste (§ 15).
  - Quellen: `PLAN.md` Statusverlauf, alle `LOGBUCH.md`,
    `beobachtungen-lernwerkzeug.md`, `regeln-pruefung.mjs`, alle
    Betreiber-Nachrichten dieses Chats.
- **`CLAUDE.md`:**
  - neuer Abschnitt ganz oben „Vor allem anderen: `plan/LEHREN.md` lesen";
  - die zwei Grundsätze des Betreibers: Pro/Contra statt Übernahme, und der
    religiöse Rahmen „Quran und Sunnah nach dem Verständnis der Salaf
    as-Salih";
  - Veröffentlichungsliste um `node --check`, `csp-build` und den getrennten
    Regel-Deploy ergänzt;
  - veraltete „Version 3.0.3" ersetzt.
- **`app.js`:**
  - Hinweis auf Lernen „Noch offen für die Serie: …" → „Heute auch fällig: …"
    (in `renderLernen`, beim Kommentar „Wiederholungen, die heute in ANDEREN
    Bereichen");
  - Kommentar über `serieAktuell()` berichtigt;
  - Kommentar über `bereicheMitOffenem()` berichtigt;
  - `APP_VERSION` 3.17.19.
- `sw.js` `CACHE_NAME`, `index.html` beide `?v=` auf 3.17.19, `CHANGELOG.md`.
- **`plan/PLAN.md`:** offene Fragen 16, 17, 18 mit Pro/Contra und Empfehlung;
  „AKTUELL".

**Entscheidung:**

- **Bedenken 2 (Serie mit Rundenlimit) – geprüft, schon so.**
  - Ein Tag zählt, sobald die **erste** Karte des Tages gelernt ist, in
    irgendeinem Bereich (`tagGelernt`: w+n>0).
  - Das Limit (10/20/30/alle) gilt je Runde. Danach bietet das Rundenende
    „Weiterlernen" an.
  - Mit Limit 10 und 11 fälligen Karten steigt die Serie also schon mit der
    ersten Karte. Die elfte bleibt für „Weiterlernen" oder morgen.
- **Dabei gefunden und behoben:** Der Hinweis „Noch offen für die Serie"
  stammte aus der Zeit vor 2.14.0 (A7), als die Serie an allen Bereichen hing.
  Er war falsch und ist jetzt richtiggestellt; `LEHREN.md` § 3.2, § 7.3.
- **Dabei gefunden, nicht gebaut (Lernlogik):** Die Lücken-Regel der Serie
  überbrückt nur **eine** Lücke. An der zweiten endet die Zählung, auch Wochen
  später. Das ergibt „krumme" Abstürze, und der Einstieg-Satz „Ein
  ausgelassener Tag reißt sie nicht" stimmt nur halb. Daraus wurde offene
  Frage 18.
- **Bedenken 1 und 3** sind Fragen *vor* einer Anweisung. Deshalb wurde nichts
  gebaut, sondern Pro/Contra vorgelegt: offene Fragen 16 und 17 in `PLAN.md`.
- **Eigener Fehler, im Chat richtiggestellt:** Die erste Analyse zu Frage 17
  nahm an, gespeicherte Antworten „msa" müssten gefiltert werden. Die
  Ziel-Antworten werden aber nirgends gespeichert. Es fehlte ein Blick in den
  Code; dazu `LEHREN.md` § 1.3.

**Geprüft:**

- `t_lernen_start.js` (Handy dunkel und hell, iPad), Zustand „zwei Bereiche":
  Text „Heute auch fällig: Quran-Wörter (1)", CLS 0, Kontrast 0, kein
  Seitenfehler.
- `node --check app.js` sauber.
- Versionen an vier Stellen gleich (`grep -F`).
- Regression `t_sprung.js`: 0 auf Handy, klein, iPad und Desktop (klein ±1
  Rundung).
- Regression `t_kontrast.js`: 0 Funde.

**Offen (Betreiber):**

- Fragen 16, 17, 18;
- `veroeffentlichen.bat`;
- PostHog-Schlüssel;
- Datenschutz §15 prüfen lassen;
- am Gerät: Konto-Löschen mit Google, Kalender-Erinnerung iOS.

**Nächster Schritt:** Auf die Antworten zu 16–18 warten. Bei „ja" die
jeweilige Empfehlung bauen. Vorher `LEHREN.md` § 14 durchgehen; für 18 zuerst
einen Test schreiben, der die heutigen Serienwerte festhält.

---

### 2026-09-24 — Abschluss: alle 18 Stationen durch (v3.16.1 → v3.17.18)

**Station 18: Hell & ruhig (v3.17.18).** Geprüft mit `t_a11y.js` (helle
Fassung + `prefers-reduced-motion: reduce`, 11 Bildschirme plus Einstieg/
Anmelden): Knöpfe ohne Namen 0, Bilder ohne alt 0, Blätter als Dialog
benannt, `lang="de"`, Bewegung über 50 ms trotz „reduziert" 0, Kontrast 0.
- **Fund 1: Überschriften** – nur „Guten Tag" (Lernen) war ein h1.
  `.appbar__title` ist jetzt `h1` (Aussehen unverändert: `margin:0;
  line-height:inherit`), der Ansichtstitel am Handy statt `display:none`
  nur für Bildschirmleser; in der Runde `h1.sr-only` „Runde"/„Üben".
- **Fund 2: Suchfeld ohne Namen** – `aria-label="Karten durchsuchen"`
  (`type="text"` bleibt: `search` brächte ein zweites, natives X).
- Regression: `t_sprung.js` 0 (klein ±1 Rundung), Affe Handy 150 / Desktop
  120 0 Befunde, `t_kontrast.js` dunkel+hell 0, `t_gross_alle.js` Desktop
  14/14.

**Routine gelöscht** (`trig_016y2uuWtQZ4yrCzAhkZsLQn`, per `delete_trigger`).

#### Zusammenfassung aller Runden

| Nr | Station | Version | Wichtigste Funde |
|---|---|---|---|
| 1 | Start | 3.16.1 | endloser Ladebildschirm bei hängendem Netz |
| 2 | Einstieg | 3.17.1 | Weiter-Knopf sprang bis 105 px; „kein Tracking" nicht mehr wahr |
| 3 | Anmelden | 3.17.2 | Fehlermeldung schob Knopf 63 px; Name-Fehler 30 px |
| 4 | Bestätigung | 3.17.3 | Meldungen schoben Knöpfe 63–105 px; kein Tipp-Feedback; Systemcodes |
| 5 | Lernen-Start | 3.17.4 | „Morgen kommen 1 Karte" u. 3 weitere Einzahlfehler; „alles erledigt" doppelt |
| 6 | Lernrunde | 3.17.5 (+3.17.6) | Rückgängig verlor Notiz und zählte weiter; Tastatur bediente keine Knöpfe; Tasten durch Dialoge; Liste 400 Animationen, Verwalten 200 → 80 ms |
| 7 | Rundenende | 3.17.7 | Rundenlimit log „alle durch", kein Weiterlernen; zwei Ausgänge |
| 8 | Üben | 3.17.8 | Zeichenfläche unter dem Rand; Vollbild verdeckte das Wort; Knöpfe sprangen; Schreib-Schalter ging still aus |
| 9 | Fortschritt | 3.17.9 | gesperrte Lektionen 2:1; Einzahl; Kalender mit Systemdatum; doppelte Überschrift |
| 10 | Verwalten | 3.17.10 | Auswahl sprang 214 px, Leiste 203 px → eine Zeile; Suche flackerte; Sortieren per Tastatur nur 1 Schritt |
| 11 | Karten-Blätter | 3.17.11 | angefangene Karte ging still verloren; Enter speicherte zu früh; Fehler verschoben Felder |
| 12 | Bereiche | 3.17.12 | neuer Bereich erbte Auswahl/Suche; leerer Bereich mit Backup+Name; toter Löschen-Knopf |
| 13 | Kartensätze & Daten | 3.17.13 | Code nur in exakter Schreibweise; englische Systemfehler an 7 Stellen; „(n)" an 9 Stellen |
| 14 | Einstellungen | 3.17.14 | Erinnerungs-Blatt schloss nicht; Fehlerformular mit überflüssigen Feldern und Textverlust; „Sitzung" statt „Runde" |
| 15 | Konto | 3.17.15 | **Google/Apple-Konten nicht löschbar**; Neu-Anmeldung erst nach dem Datenlöschen |
| 16 | Querschnitt | 3.17.16 | Offline-Banner 130 px; Systemcodes in Speicherfehlern; Startfehler ohne Ausweg |
| 17 | Große Bildschirme | 3.17.17 | Lernen-Raster am Desktop zerrissen; gesperrter Knopf knapp unter Kontrastgrenze |
| 18 | Hell & ruhig | 3.17.18 | keine Überschriften für Bildschirmleser; Suchfeld ohne Namen |

**Muster, die sich wiederholt haben** (für künftige Arbeit):
1. *Etwas erscheint nachträglich über dem Finger* (Meldungen, Leisten,
   Fehlerzeilen) – Lösung jedes Mal: Platz vorher da, oder unter/neben die
   Handlung.
2. *Neue Teile wurden an zentralen Listen vergessen* – Hinweise (3.17.0) im
   Desktop-Raster, Erinnerungs-Blatt in `schliesseObersteEbene`/
   `overlayIstOffen`/`renderToast`. Wer ein Blatt baut: alle vier Stellen.
3. *Systemsprache im Text* – `e.code`/`e.message`, „(n)", Abkürzungen,
   ISO-Datum. Jetzt gibt es `fehlerKlartext()` und `mz()`.
4. *Zustand nur im DOM* (Schalter, Fokus am Griff) – geht beim nächsten
   `render()` verloren; in `ui` halten.
5. *Halbdurchsichtige Farben* für Schrift-Hintergründe kippen je nach
   Untergrund unter 4,5:1 – `--stufe-1-fest`/`--stufe-2-fest`.

**Prüfstand für die nächste Runde:** 30+ Tests unter
`plan/werkzeuge/pruefstand/` (je Station `t_*.js`, dazu `t_fluessig*.js`,
`t_gross_alle.js`, `t_a11y.js`, `affe.js`); Stub kann Schreib-, Lese-,
Live- und Anmeldefehler nachstellen.

**Offen (Betreiber):** siehe PLAN.md „AKTUELL" – veroeffentlichen.bat,
PostHog-Schlüssel, Datenschutz §15 prüfen lassen, und am Gerät: Konto mit
Google löschen, Kalender-Erinnerung iOS.
**Nächster Schritt:** keiner aus der Schleife. Auf Betreiber-Rückmeldung
warten (zweite Runde nur auf Wunsch).

---

### 2026-09-24 — Station 17: Große Bildschirme (v3.17.17)

**Geprüft (`t_gross_alle.js`: iPad hoch, iPad quer, Desktop 1440×900 – 14
Bildschirme je Gerät):** Kontrast, waagerechtes Scrollen, Elemente unter der
Seitenleiste, Zeilen über 48 Zeichen Breite bei langem Text, Blattbreite
(460 px), Fotos.
- **Fund 1: Lernen-Raster (≥ 900 px)** – `.hinweis` (3.17.0) fehlte in der
  Liste der rechten Spalte (`.view--lernen > …`), spannte über beide
  Spalten; rechts neben dem Stapel leer, Serie versetzt darunter.
- **Fund 2: „Strich zurück" gesperrt 4,03:1** – selbst eingeführt in
  3.17.8 (immer da, gesperrt ohne Strich); `t_schreiben.js` maß erst nach dem
  ersten Strich.
- Ohne Befund: alle 14 Bildschirme × 3 Geräte (42 Messungen) nach der
  Behebung Kontrast 0, nicht quer, nichts unter der Leiste, keine
  überlangen Zeilen.

**Geändert (styles.css):** `.view--lernen > .hinweis` in Spalte 2;
`.hw-toolbar button:disabled { opacity: .62 }`. Version 3.17.17.
**Neu (Prüfstand):** `t_gross_alle.js`.

**Offen:** –
**Nächste Station:** 18 (Hell & ruhig – helle Fassung, reduzierte Bewegung,
Screenreader-Grundlagen) – danach Routine löschen und Zusammenfassung

---

### 2026-09-24 — Station 16: Querschnitt (v3.17.16)

**Geprüft (`t_querschnitt.js`, Handy/klein/iPad; Stub: `window.__SNAP_FAIL`
lässt die Live-Listener mit einem Code scheitern):** offline/online,
Schreibfehler, Toast bei offenem Blatt, Eingabe-Dialog (Fokus, Enter),
Rückfrage + Escape, Start mit `unavailable` und `permission-denied`
(syncError – aus Station 16 des Auftrags ausdrücklich verlangt).
- **Fund 1: Offline-Banner 130 px, Inhalt springt 142 px.** Jetzt ein Satz
  (67 px, Sprung 80/100 px). Rest bleibt bewusst: der Banner steht seit 3.6.9
  leise im Fluss; ein schwebender Hinweis läge über dem Inhalt. Der Wechsel
  kommt vom Netz, nicht von einem Tipp.
- **Fund 2: Systemcodes** – `saveFehler`-Dialog und Schreib-Banner
  „(permission-denied)", Umzugsfehler zeigte `e.code`.
- **Fund 3: Startfehler `permission-denied`** – Text „… stimmen die
  Sicherheitsregeln in Firebase nicht" und „melde dich ab" ohne Knopf
  (Dialoge erscheinen auf dem Startbildschirm nicht → direkter
  `boot-abmelden`).
- Fund 4: `renderToast` kannte `erinnerungSheet` nicht (gleiches Versäumnis
  wie Station 14).
- Ohne Befund: Online-Rückkehr, Prompt mit Enter, Escape bricht Rückfrage ab,
  Schreibfehler mit `permission-denied` → Ausweis-Erneuerung + Banner.

**Geändert (app.js):** `schreibFehlerText` (neu), `saveFehler`,
`bannerSchreibfehler`, `snapFehler`-Text, Startbildschirm mit Abmelden,
Handler `boot-abmelden`, Offline-Banner, `renderToast`, Umzugsfehler →
`fehlerKlartext`. Version 3.17.16.
**Prüfstand:** `t_querschnitt.js` neu; `stubs.js` `__SNAP_FAIL`.

**Offen:** –
**Nächste Station:** 17 (Große Bildschirme – Tablet hoch/quer, Desktop)

---

### 2026-09-24 — Station 15: Konto (v3.17.15)

**Geprüft (`t_konto.js`: Passwort abbrechen/falsch/richtig, Google Fenster
zu/angemeldet, frisch angemeldet, Abmelden; `t_sicher.js`):**
- **Fund 1 (ernst): Google/Apple-Konten nicht löschbar**, sobald Firebase
  `auth/requires-recent-login` meldet – `kontoAuthLoeschen` fragte immer
  ein Passwort ab (`EmailAuthProvider`), das es dort nicht gibt.
- **Fund 2: Neu-Anmeldung erst nach dem Datenlöschen** – Abbruch oder
  falsches Passwort hinterließ ein Konto ohne Daten. Die Reihenfolge Daten →
  Konto bleibt (Kommentar Phase 2: verwaiste Daten wären schlimmer), aber
  die Anmeldung wird jetzt VORHER geprüft (`kontoAnmeldungFrisch`, 4 Min.).
- Fund 3: gesperrter Halte-Knopf 2,7:1 (dunkel) / 3,9:1 (hell) – `button:disabled
  { opacity: .45 }` auf Rot.
- Fund 4: „Abmelden?" sagte „mit E-Mail und Passwort" auch für Google/Apple.
- Fund 5: Rückfall in `kontoLoeschenFehlerText` und `authErrorText` mit
  Systemcode; `auth/invalid-credential` (Firebase 10 bei falschem Passwort)
  fehlte.
- Ohne Befund: Halten-Hürden (kurz/halb lösen nichts aus), E-Mail-Hürde,
  Backup, Einstieg nach dem Löschen und Abmelden.

**Geändert (app.js):** `kontoNeuAnmelden` (neu: Passwort oder
`reauthenticateWithPopup` Google/Apple, false bei Abbruch),
`kontoAnmeldungFrisch` (neu), `kontoLoeschenAusfuehren` meldet vorher neu an,
`kontoAuthLoeschen` nutzt `kontoNeuAnmelden` als Rückfall;
`kontoLoeschenFehlerText`/`authErrorText` → `fehlerKlartext`; `doLogout`
Text je Anmeldeart. **styles.css:** `button.halten:disabled` neutral.
Version 3.17.15.
**Prüfstand:** `t_konto.js` neu; `stubs.js` `reauthenticateWithPopup`,
`reauthFail`, `popupZu`; `t_sicher.js` beantwortet die neue Passwort-Frage.

**Offen (Betreiber, am Gerät):** Löschen mit einem Google-Konto einmal echt
durchspielen – das Anmeldefenster kommt von Google, im Prüfstand ist es
nachgebaut.
**Nächste Station:** 16 (Querschnitt – Dialoge, Toasts, Fehler, offline;
auch syncError)

---

### 2026-09-24 — Station 14: Einstellungen (v3.17.14)

**Geprüft (`t_einstellungen.js`, Handy hell/dunkel, klein, iPad):**
Übersicht, Wahl-Blätter limit/arab/thema (Wahl → Zeile), Erinnerung,
alle Unterseiten, Fehler melden (inkl. Absenden), Idee einreichen.
- **Fund 1: Erinnerungs-Blatt (3.17.0) nicht in `schliesseObersteEbene`,
  `overlayIstOffen`, `overlaySchluessel`, `tabSchonAktiv`** – Escape/Wischen
  schlossen es nicht, `blatt-offen` fehlte (Seite dahinter scrollbar,
  Reiter-Wischen aktiv).
- **Fund 2: „Fehler melden"** – Name- und E-Mail-Feld trotz Anmeldung,
  Sternchen-Pflichtfeld (App markiert sonst nur Optionales), Knopf
  „Fehler melden" öffnet tatsächlich das Mail-Programm, Formular wurde nach
  `mailto:` geleert (ohne Mail-Programm war der Text weg).
- Fund 3: „Karten pro Sitzung" (einzige Stelle mit „Sitzung").
- Fund 4: „vor 3 Tg." (einzige Abkürzung); „Tägliche Erinnerung" ohne Wert.
- Weitergereicht an Station 15: „Zum Löschen gedrückt halten" (gesperrt)
  2,7:1 auf der Seite „Konto löschen".
- Ohne Befund: Wahl-Blätter bleiben nach der Wahl offen (so gewollt, „Fertig"
  schließt), Wert steht danach in der Zeile; Unterseiten Kontrast 0.

**Geändert:** index.html – Fehler-Formular nur Beschreibung, „Weiter zur
E-Mail", neuer Hinweissatz. app.js – Absenden hängt `APP_VERSION`, Name,
Gerät an; `closeErrorModal(textBehalten)`; `erinnerungSheet` an vier
Stellen; „Karten pro Runde" (Zeile + `WAHLEN.limit`); Sicherungs-Alter
ausgeschrieben; Erinnerung „aus". Version 3.17.14.
**Neu (Prüfstand):** `t_einstellungen.js` (Modus `text` gibt alle Texte aus).

**Offen:** –
**Nächste Station:** 15 (Konto – Abmelden, Konto löschen)

---

### 2026-09-24 — Station 13: Kartensätze & Daten (v3.17.13)

**Geprüft (`t_daten.js`, Handy, klein, iPad; Stub `getDoc` kann jetzt über
`__FB.failGet` offline scheitern):** Seite „Kartensatz per Code", Code
erzeugen, Code-Dialog, Kopieren, Einlösen (klein + Leerzeichen), falscher
Code, offline, Sichern, eigenes Backup einspielen, kaputte Datei.
- **Fund 1: Einlösen nur in exakter Schreibweise** – `code.trim().toUpperCase()`;
  „abcde fghjk" oder ohne Strich → „gibt es nicht".
- **Fund 2: Systemtext in Fehlern** – `e.message` an 7 Stellen
  (Teilen, Freigeben, Einlösen, Ideen-Board laden/speichern/Status/löschen),
  englisch.
- **Fund 3: Code-Dialog** – Code in 0.9em, „Klick …" am Handy.
- **Fund 4: „(n)/(e)/(en)"** an 9 Stellen (Teilen, Aktualisieren,
  Import-Ergebnis, Lektionen-Plakette, Aufzeichnung löschen).
- Selbst eingebaut und vor dem Veröffentlichen gefunden: meine erste
  Normalisierung entfernte auch den Strich, der zum Code gehört
  (`XXXXX-XXXXX`) – `t_daten.js` zeigte „Code ungültig". Jetzt: nur A–Z/0–9,
  bei zehn Zeichen Strich an Stelle 6.
- Kein Fund: eigenes Backup erneut einspielen legt Kopien „(2)" an bzw.
  meldet „Nichts zu tun" für geführte Sätze – so gewollt (2.2.0: ein Import
  überschreibt nie).

**Geändert (app.js):** `mz()` und `fehlerKlartext()` (neu, vor
`genTeilCode`); alle `e.message`-Meldungen außer dem Start-Fehlerbildschirm
(dort bleibt die technische Meldung für die Fehlersuche);
`codeEinloesenStart` normalisiert; Code-Dialog `.teil-code`; Mehrzahl an 9
Stellen. **styles.css:** `.teil-code`. Version 3.17.13.
**Neu (Prüfstand):** `t_daten.js`; `stubs.js` `failGet`.

**Offen:** –
**Nächste Station:** 14 (Einstellungen – Übersicht, Wahl-Blätter,
Unterseiten)

---

### 2026-09-24 — Station 12: Bereiche (v3.17.12)

**Anlass:** Betreiber „weiter, bitte so früh wie möglich fertig werden ohne
qualität liegen zu lassen" – Stationen ab jetzt direkt hintereinander, nicht
mehr stündlich.

**Geprüft (`t_bereiche.js`, Handy, klein, iPad; Löschen mit Karten
gesondert):**
- **Fund 1: `addBereich` setzte nur `bereichId`** – Auswahlmodus, Suche,
  Übungswahl blieben vom alten Bereich (gemessen: „0 ausgewählt" im neuen,
  leeren Bereich). Dasselbe nach dem Löschen.
- **Fund 2: leerer Bereich löschen** = Backup-Download + Name abtippen,
  Text „Es werden 0 Karte(n) …".
- **Fund 3: „Bereich löschen" beim letzten Bereich** → nur „Nicht möglich".
- **Fund 4: leerer Bereich „fertig"** im Bereichs-Blatt.
- Fund 5: vorhandenen Namen anlegen wechselte still.
- Fund 6: Plakette „12 fällig" (`zustand-lernen`, halbdurchsichtig) 4,41:1.
- Ohne Befund: Wechseln, Umbenennen inkl. vergebener Name, Löschen mit
  Karten (Backup, falscher Name wird abgelehnt).

**Geändert (app.js):** `addBereich` → `selectBereich` + Hinweis bei
vorhandenem Namen; `deleteBereich` – leerer Bereich: einfache Rückfrage;
Text Einzahl/Mehrzahl; neues `bereichEntfernen` (→ `selectBereich`);
`bereichMehrSheet` ohne Löschen beim letzten Bereich; `bereichSheet`
„leer"/„fertig". **styles.css:** `--stufe-1-fest` (dunkel #5e5d5a, hell
#c6c3bd) für `.badge.zustand-lernen`. Version 3.17.12.
**Neu (Prüfstand):** `t_bereiche.js`.

**Entscheidung:** Die doppelte Sicherung (Backup + Name) bleibt für Bereiche
mit Karten unverändert (2.11.0, Betreiber „risiko nicht so einfach"). Leer
heißt: keine Karte und keine Speicherkarte.

**Geprüft danach:** alles wie gewollt auf drei Geräten; `t_kontrast.js`
dunkel+hell 0; Affe Handy/klein 150 Schritte 0 Befunde.

**Offen:** –
**Nächste Station:** 13 (Kartensätze & Daten – Code teilen/einlösen,
Sichern, Einspielen)

---

### 2026-09-24 — Station 11: Karten-Blätter (v3.17.11)

**Anlass:** Routine, 15:50 UTC. Keine neue Betreiber-Nachricht.

**Geprüft (`t_karten_blatt.js`, Handy hell/dunkel, klein, iPad):** Blatt
öffnen, leer abschicken, Tippen nach Fehler, Enter im Wort-Feld,
Hinzufügen per Enter, Duplikat, Fertig mit vollständiger/halber Karte,
Escape, Detail, Bearbeiten, Löschen, Kontrast.
- **Fund 1 (Datenverlust): „Fertig"/Escape/Wegwischen verwarf eine
  angefangene Karte still.** `schliesseObersteEbene` → `cancelEdit` →
  `resetFormDraft`. Die Kommentare (D6 in `submitCardForm`, `blattWischen`)
  behaupteten, der Entwurf bleibe erhalten – stimmte nicht.
- **Fund 2: Enter im Wort-Feld speicherte sofort** → Fehler „bitte
  ausfüllen" an der Übersetzung, obwohl man nur weiter wollte.
- **Fund 3: Fehlerzeilen als eigene `.field__fehler`-Zeile** – beim Tippen
  verschwand sie, das unten verankerte Blatt schrumpfte, das Feld unter dem
  Finger rutschte nach unten.
- **Fund 4: Abstand Beschriftung–Feld 24 px vs. 8 px** – `.dlg input
  { margin-top }` (für das Feld unter einem Dialog-Text gedacht) traf auch
  die Formularfelder im Blatt.
- Ohne Befund: Knopf springt nicht (Blatt unten verankert), Toast oben
  sichtbar, Duplikat-Rückfrage, Bearbeiten mit Stand, Speichern schließt,
  Löschen fragt, Detail-Blatt Kontrast 0.

**Geändert (app.js):** `karteSheet` – Fehler als `.opt--fehler` in der
Beschriftung, `enterkeyhint="next"` am Wort-Feld; Eingabe-Listener leert die
Marke; Enter-Listener (Wort → Übersetzung, `isComposing` ausgenommen);
`karteEntwurfOffen` / `karteEntwurfVerwerfenFragen` (neu, vor `cancelEdit`);
`schliesseObersteEbene` fragt bei Entwurf; `karte-sheet-zu` fügt eine
vollständige Karte hinzu und schließt; `blattWischen` federt bei Entwurf
zurück und fragt. **styles.css:** `.dlg .field input { margin-top: 0 }`.
Version 3.17.11.
**Neu (Prüfstand):** `t_karten_blatt.js`.

**Entscheidung:** „Fertig" mit vollständiger Karte = hinzufügen, nicht
fragen – „fertig" heißt nicht „wegwerfen", und ein Dialog mehr wäre Reibung
für den häufigsten Fall (letzte Karte getippt, Fertig statt Hinzufügen).
Rückfrage nur, wo wirklich etwas verloren ginge (halb getippt, oder Escape /
Wischen). Beim Bearbeiten heißt der Knopf „Abbrechen" – dort bleibt
Verwerfen ohne Rückfrage.

**Geprüft danach:** alle Fälle wie gewollt auf drei Geräten; Feld rutscht
0 px, Abstand 8/8; Regression `t_anmelden.js` (gleiche Fehler-Marke) 0 px,
`t_kontrast.js` 0, Affe Handy/iPad 150 Schritte 0 Befunde.

**Offen:** –
**Nächste Station:** 12 (Bereiche – anlegen, wechseln, umbenennen, löschen)

---

### 2026-09-24 — Station 10: Verwalten (v3.17.10)

**Anlass:** Betreiber „alles klar, mach weiter" (Modellfrage beantwortet:
Opus bleibt, Sonnet ginge auch).

**Geprüft (`t_verwalten.js`, Handy hell/dunkel, klein, iPad; `t_liste_lang.js`):**
- **Fund 1: Auswahl – 214 px Sprung beim ersten Haken.** `.select-actionbar`
  erschien erst bei `selectedIds.size > 0`, oberhalb von Speicherkarten und
  Liste.
- **Fund 2 (Hick): Aktionsleiste 203 px** – zwei `<select>` (Zielbereich,
  Ziel-Speicherkarte) plus vier Knöpfe, umgebrochen; „Karte hinzufügen"
  blieb im Auswahlmodus als lauteste Fläche stehen.
- **Fund 3: Suche flackert** – `zeichneKartenListe` ersetzt nur
  `#karten-liste`, `still-ansicht` blieb aus → die ersten 14 Trefferzeilen
  liefen nach jedem Tastendruck neu ein (`einstieg-zeile`, bis 452 ms).
- **Fund 4: X der Suche bei leerem Feld sichtbar** – `button { display:
  inline-flex }` schlug das `hidden`-Attribut.
- **Fund 5: Tastatur-Sortieren nur ein Schritt** – der Handler fokussiert
  den Griff, 11 ms später zeichnet die Datenbank-Rückmeldung neu, Fokus auf
  `<body>`.
- Fund 6: „frisch gelernt"-Plakette 4,47:1 in der aufgeklappten
  Speicherkarten-Liste (iPad) – `--stufe-2` ist halbdurchsichtig.
- Fund 7: „Karte(n)" in zwei Meldungen.
- Ohne Befund: Kontrast Liste, Suche ohne Treffer / alle Bereiche, Leeren,
  Speicherkarten-Panel, Ziehen mit Maus, lange Liste bis ans Ende.

**Geändert (app.js):** `renderVerwalten` (kein „Karte hinzufügen" im
Auswahlmodus); `renderVerwaltenListe` – Leiste immer im Auswahlmodus, eine
Zeile, Knöpfe `auswahl-verschieben` / `auswahl-speicherkarte` /
`delete-selected`, gesperrt bei 0; `toggleCardSelected` setzt nur
Zahl/Kästchen/Sperre; `WAHLEN.verschieben` + `WAHLEN.speicherkarte`
(Blatt), Handler `auswahl-ziel-bereich` / `auswahl-ziel-set`; alte
`move-selected`, `save-to-set`, `save-to-new-set` samt `<select>` entfernt;
`zeichneKartenListe` setzt `still-ansicht`; `render()` merkt sich einen
fokussierten Ziehgriff (`prevGriff`) und stellt ihn wieder her;
Löschen-/Ablegen-Meldungen Einzahl. **styles.css:** Leiste einzeilig,
Knöpfe Symbol über Wort, Zahl gestapelt; `.search-clear[hidden]`;
`--stufe-2-fest` (dunkel #888682, hell #9a978f) für
`.badge.zustand-frisch`. Version 3.17.10.
**Neu (Prüfstand):** `t_verwalten.js` (inkl. Verschieben, Ablegen,
Pfeiltasten zweimal, X-Sichtbarkeit).

**Entscheidung:** Ziele über ein Blatt (vorhandenes `wahlSheet`-Muster)
statt `<select>` in der Leiste – ein Muster weniger, und die Leiste passt in
eine Zeile auch am kleinen Handy (360 px). Ohne ablegbare Speicherkarte fragt
„Ablegen" direkt nach dem Namen der neuen (ein Blatt mit einer einzigen
Zeile wäre ein Tipp zu viel).

**Geprüft danach:** Sprung 0 px, Leiste 66 px und innerhalb der Breite auf
klein/Handy/iPad, Verschieben 40 → 38, Ablegen 2 → 3, Pfeil zweimal mit
Fokus, X nur bei Text, Kontrast 0 (auch `t_kontrast.js` dunkel+hell),
Affe Handy/klein/iPad 0 Befunde.

**Offen:** –
**Nächste Station:** 11 (Karten-Blätter – anlegen, bearbeiten, löschen,
Detail)

---

### 2026-09-24 — Station 9: Fortschritt (v3.17.9)

**Anlass:** Routine, 14:50 UTC. Keine neue Betreiber-Nachricht seit „Gehts
weiter?".

**Geprüft (`t_fortschritt.js`: leer / eine Karte / gefüllt × Handy hell+dunkel,
klein, iPad; Unterseiten Lektionen, Karten die nicht klappen, 7 Tage;
`t_fluessig_gross.js 400 fort`):**
- **Fund 1: Kontrast Lektionen-Seite** – gesperrte Kachel `opacity: 0.42`:
  „13 Karten" 2,05:1, Name 3,79:1; `.lekt-zahl` (--text-3) auf der Kachel
  4,36:1.
- **Fund 2: Einzahl** – „1 Antworten diese Woche", „1 von 1 Karten saßen",
  „1 Karten" (7 Tage), „1 von 3 sitzen", Wochenrückblick „1 Antworten / 1 neue
  Karten", gesperrte Kachel „1 Karten".
- **Fund 3: Kalender-Tooltip** „2026-09-20: 5 Karten" – Systemdatum, und die
  Zahl ist w+n (Antworten), nicht Karten.
- Fund 4 (Hick): Überschrift „Lektionen" doppelt (Kopfzeile + h3).
- Fund 5: Schloss-Symbol auf eigener Zeile (`.i` ist block).
- Ohne Befund: Layout-Shift 0 in allen Zuständen, Kontrast Hauptseite und
  andere Unterseiten 0, nicht quer, Rückweg `seite-zu`.
- Gemessen, nicht behoben: erstes Öffnen mit 400 Karten ≈100 ms bei CPU 4×
  (JS davon ≈11 ms, Rest Layout). Versuch, `syncAppbarKante` ins nächste
  Bild zu schieben: kein Gewinn (Layout wird dann an anderer Stelle
  erzwungen) – zurückgenommen. Real ≈25 ms, bleibt.
- Bemerkt, kein App-Fund: Test-Store hat gelernte Karten in gesperrten
  Lektionen → „2 von 3 sitzen" neben zwei Schlössern. Mit echten Daten kaum
  möglich (Freischalten = Lernlogik, nicht angefasst).

**Geändert (app.js):** `fortschrittWochen` (Antwort/Antworten),
`fortschrittStoff` (Karte/saß), `renderFortschritt` (7 Tage, Lektionen-Zeile),
`fortschrittLektionen` (ohne h3, sitzt/sitzen, Karte/Karten), `renderKalender`
(Tooltip `tagKurz` + Antworten), Wochenrückblick-Hinweis. **styles.css:**
`.lekt-kachel.zu` ohne opacity, `.lekt-zahl` --text-2, `.lekt-name .i`
inline. Version 3.17.9.
**Neu (Prüfstand):** `t_fortschritt.js`; `t_fluessig_gross.js` mit Modus
`fort` (Profil erstes Öffnen).

**Offen:** –
**Nächste Station:** 10 (Verwalten – Liste, Suche, Auswahl, Sortieren,
Speicherkarten, Lektionen)

---

### 2026-09-24 — Station 8: Üben, Rest (v3.17.8)

**Anlass:** Betreiber „Gehts weiter?" – Station direkt im Anschluss.

**Geprüft (`t_schreiben.js`, `t_ueben_auswahl.js`, Handy, klein, iPad):**
- **Fund 1: Zeichenfläche unter dem Bildschirmrand** – Handy Oberkante
  806 von 844 px, Seite scrollbar. Ursache: das 3.15.0-Raster
  (1fr | Karte | 1fr) plus Mindesthöhe der Karte (40svh) ist für Lernen
  gemacht; beim Schreiben kommt die Fläche darunter.
- **Fund 2: Vollbild verdeckt die Abfrage** – `elementFromPoint` auf das
  Wort traf die Vollbild-Fläche. Man schrieb, ohne das Wort zu sehen.
- **Fund 3: Knöpfe springen nach dem ersten Strich** – „Strich zurück"
  kam erst dann ins Markup: „Löschen" 159 px nach rechts, „Vollbild" in die
  zweite Zeile (iPad alle 91 px nach rechts).
- **Fund 4: Schalter „Mit Schreiben" geht still aus** – nur im DOM, jeder
  Chip-/Speicherkarten-Tipp zeichnet neu; die Übung startete ohne Schreiben.
- Ohne Befund: Striche bleiben im Vollbild (Tinte gezählt), Strich zurück,
  „Fertig" verlässt das Vollbild, Bewertung im Bild, Kontrast 0, Zeichnen
  mit 25 Strichen bei CPU 4× 0 verpasste Bilder (der Verdacht
  `getComputedStyle` je Bewegung war unbegründet – nicht angefasst).
  Speicherkarten-Liste: alle nicht gesperrten, Zahl stimmt.

**Geändert (app.js):** `renderSession` Klasse `study-card--schreiben`;
`renderHandwritingCanvas(revealed, frage, antwort, antwortArabisch)` –
Vorlage `.hw-vorlage` im Vollbild, „Strich zurück" immer (disabled ohne
Strich); `endStroke` gibt den Knopf frei statt `render()`; `hw-undo` ohne
Strich nichts; Schalter `ui.drillSchreiben` + change-Listener (~Z. 7348).
**styles.css (Ende):** `.study-card--schreiben …`, `.hw-vorlage…`.
Version 3.17.8.
**Neu (Prüfstand):** `t_schreiben.js`, `t_ueben_auswahl.js`.

**Entscheidung:** Eigene Anordnung nur für Schreiben statt das Lern-Raster
zu ändern – Lernen bleibt, wie es gemessen 0 px springt. Der Schalter
behält seinen Stand für die Sitzung (eine Vorliebe, keine einmalige Wahl).

**Geprüft danach:** alles im Bild ohne Scrollen (Handy Leiste unten bei
544/844), 0 px Sprung nach dem ersten Strich, Vorlage im Vollbild, Schalter
bleibt; Regression `t_sprung.js` 0 (klein ±1 Rundung), `t_ueben.js` ok,
Affe Handy 150 / iPad 120 0 Befunde.

**Offen:** –
**Nächste Station:** 9 (Fortschritt – dort auch das erste Öffnen mit 400
Karten, ≈90 ms)

---

### 2026-09-24 — Station 7: Rundenende (v3.17.7)

**Anlass:** Routine, 13:50 UTC. Keine neue Betreiber-Nachricht seit v3.17.6.

**Geprüft (`t_rundenende.js`, Handy, klein, iPad; `t_fluessig_ende.js`):**
normale Runde, Rundenlimit 10, Rückgängig vom Abschluss, Fertig → Lernen,
Weiterlernen, Üben-Abschluss (Regression `t_ueben.js`), Kontrast, quer,
Übergang ins Feiern bei CPU 4×.
- **Fund 1: Rundenlimit – „Alle 10 Karten für heute durch"** bei 2 weiteren
  fälligen, und kein Weg weiter (nur über Fertig → Lernen-Tab → Runde
  starten). `renderRundenEnde` kannte das Limit nicht.
- **Fund 2 (Hick): zwei Ausgänge** – X oben (`modeBar zu: "end-session"`,
  aria „Zurück") und „Fertig" unten, gleiche Handlung.
- Ohne Befund: Rückgängig vom Ende führt zurück zur offenen Karte, erneutes
  Bewerten zeigt das Ende ohne zweite Feier-Vibration/Zählung
  (`s.endeGezeigt`); Kontrast 0; Übergang ins Feiern: eine Blockade 57–66 ms,
  ein Bild 50–67 ms (Ziel < 100).
- Kein App-Fund: Serie „4" im Test kommt vom Sockel (`serieSockelSichern`
  setzt `sockelBis` = heute, weil der Test-Store keinen Sockel hat).

**Geändert (app.js):** `modeBar` – `zu: null` zeichnet einen gleich breiten
Platzhalter statt des X; `renderSession` Endzweig ohne X;
`renderRundenEnde` – `offenHeute` (= `dueCards().length`, nicht im Üben),
Satz „N Karten geschafft." + „Heute sind noch N Karten offen." statt
„Morgen …", Knopf `start-session` „Weiterlernen" (.secondary). Version 3.17.7.
**Neu (Prüfstand):** `t_rundenende.js`, `t_fluessig_ende.js`.

**Entscheidung:** „Fertig" bleibt gefüllt, „Weiterlernen" zweitrangig – wer
ein Limit setzt, will kurze Runden (Hürde „Zeit" im Einstieg); die Einladung
steht da, drängt aber nicht. „Morgen kommen …" entfällt, solange heute noch
etwas offen ist – eine Aussage statt zwei.

**Geprüft danach:** alles wie oben auf drei Geräten; Affe Handy 150 / klein
120 Schritte 0 Befunde; `t_runde_rest.js` ohne Fund.

**Offen:** –
**Nächste Station:** 8 (Üben – Rest: Schreiben im Vollbild,
Speicherkarten-Liste)

---

### 2026-09-24 — Betreiber: Rückgängig zählt zurück, „soll flüssig sein" (v3.17.6)

**Anlass (Vorrang vor der Schleife):** Antwort auf die offene Frage aus
Station 6: „ja natürlich [...] man hat es ja nicht gewollt, nichts zum
überlegen". Dazu: „Meinst du du findest mehr? Soll flüssig sein."

**Geändert (app.js):** `gradeCard` (~Z. 4936) merkt sich in `lastAction`
`verlaufTag`/`verlaufArt` ("n" bei neuer Karte, sonst "w");
`undoLastGrade` (~Z. 5060) zählt genau diesen Zähler herunter und schreibt
sofort (`persistVerlauf`) – gebündelt wäre riskant, weil
`verlaufZusammen` je Tag die größere Zahl nimmt. Üben hat kein Rückgängig
(`lastAction` nur im Lernen), dort nichts zu tun.
**Geändert (styles.css):** Einblend-Bewegung der Kartenliste nur noch
`:nth-child(-n+14)` (die Regel traf jede Zeile, Rest nur verzögert);
`.card-row { content-visibility: auto; contain-intrinsic-size: auto 75px }`
(gemessene Zeilenhöhe 75 px, 98 bei zwei Zeilen).
**Neu (Prüfstand):** `t_undo_verlauf.js` (3× bewerten/rückgängig → Zähler
stimmt, auch im Store), `t_fluessig.js` (CPU 4×, longtask + Bilder > 34 ms je
Handlung), `t_fluessig_gross.js` (400 Karten, mit CPU-Profil),
`t_liste_lang.js` (Scrollen ans Ende, Ziehen sortiert).
**AUFTRAG.md:** Prüfliste um „Flüssig" ergänzt – ab Station 7 mitmessen.

**Gemessen (CPU 4×, 400 Karten, erstes Bild nach Tipp):** Verwalten 206 →
79 ms (zweites Mal 33), Fortschritt 137 → 89 ms. Profil vorher:
`syncAppbarKante` 93 ms – nicht die Funktion selbst, sondern ihr
`scrollY`-Lesen erzwingt das Layout der ganzen neuen Liste.
Mit 40 Karten: alle Handlungen < 100 ms, Umdrehen/Bewerten 0 verpasste
Bilder.
**Regression:** `t_runde_rest.js` ohne Fund, Affe Handy 150 / iPad 120
Schritte 0 Befunde, Liste lang: sortiert, Ende sichtbar.

**Entscheidung:** `content-visibility` statt eine eigene „virtuelle Liste"
zu bauen – eine CSS-Zeile, kein neuer Code, der Browser rechnet die
Zeilen weiter selbst (Suchen mit Strg+F, Ziehen, Tastatur bleiben).

**Offen:** Fortschritt beim ersten Öffnen noch ≈90 ms bei 400 Karten –
bei Station 9 (Fortschritt) genauer ansehen.
**Nächste Station:** 7 (Rundenende)

---

### 2026-09-24 — Station 6: Lernrunde, Rest (v3.17.5)

**Anlass:** Routine, 12:50 UTC. Keine neue Betreiber-Nachricht.

**Geprüft (`t_runde_rest.js`, Handy, klein, iPad):** Wischen rechts/links,
kurzer und senkrechter Wisch, Rückgängig, Notiz verbergen/zeigen, Merken,
Leertaste/1/2/3, Enter auf fokussiertem Knopf, Taste bei offenem Dialog,
Kontrast.
- **Fund 1: Rückgängig schließt die Notiz** – `undoLastGrade` setzte
  `extraOpen = false`, überall sonst gilt „offen" (2.7.0).
- **Fund 2: Enter/Leertaste auf fokussiertem Knopf wirkungslos** – der
  Runden-Listener fing beide Tasten immer ab (`preventDefault`), Rückgängig
  und Schließen waren per Tastatur nicht bedienbar.
- **Fund 3: Tasten wirken durch offene Dialoge** – kein Test auf `.dlg`.
- Fund 4: „Merken" → „Gemerkt" macht den Knopf 8 px breiter, der Nachbar
  „Notiz" rückt 4 px.
- Fund 5: `aria-label` „Session abbrechen" – sonst heißt es überall „Runde".
- Ohne Befund: Wischen (beide Richtungen bewerten, kurz federt zurück,
  senkrecht nichts), Notiz ein/aus 0 px, Kontrast 0. Messfehler im ersten
  Lauf: „Nicht" lässt „Karte x von y" gleich (Karte kommt wieder) – der Test
  prüft jetzt, ob die nächste Karte zugedeckt ist.
- Bemerkt, nicht gebaut (Lernlogik): Rückgängig setzt die Karte zurück, zählt
  den Tagesverlauf (`verlauf[heute].w/n`) aber nicht herunter – Fortschritt
  zeigt nach einem Rückgängig eine Antwort zu viel. Gehört zur Lernlogik/
  Statistik, deshalb nur notiert.

**Geändert (app.js):** Tastatur-Listener (~Z. 5080–5100): Dialog-Sperre,
Enter/Leertaste bei Fokus auf BUTTON/A/SELECT durchlassen; `undoLastGrade`
(~Z. 5065) `extraOpen = true`; `renderSession` zuLabel „Runde beenden",
Merken-Knopf mit beiden Wörtern (`.merk-btn__wort`). **styles.css (Ende):**
`.merk-btn__wort`. Version 3.17.5.
**Neu (Prüfstand):** `t_runde_rest.js`.

**Geprüft danach:** alle Funde behoben auf allen drei Geräten; Regression
`t_sprung.js` 0 px (klein ±1 Rundung, wie vorher), Affe Handy 150 Schritte
0 Befunde.

**Offen:** Verlauf nach Rückgängig (s. o.) – vom Betreiber freigegeben und in
v3.17.6 gebaut.
**Nächste Station:** 7 (Rundenende – Einzahl-Grammatik dort schon in
3.17.4 behoben)

---

### 2026-09-24 — Station 5: Lernen-Start (v3.17.4)

**Geprüft (`t_lernen_start.js`, sieben Zustände × Handy hell/dunkel, klein,
iPad):** leer (Start-Liste), eine Karte, erste Runde, gefüllt, alles
erledigt, Serie in Gefahr, zweiter Bereich offen. Gemessen: Layout-Shift ab
dem Laden (PerformanceObserver `layout-shift`) 0,0000 überall, Kontrast 0,
nicht quer, keine Konsolenfehler.
- **Fund 1 (Grammatik): „Morgen kommen 1 Karte wieder."** – Lernen-Tab
  (`lernenStapel`) und Rundenende (gleicher Satz). Beim Suchen nach derselben
  Sorte: „Alle 1 Karte für heute durch" (Rundenende), „Alle 1 Karten sind
  gerade neu" (Fortschritt, Zustände), „aufgezeichnet sind 1 Tag"
  (Einstellungen). Alle vier gleich mit behoben – gehören zu Station 7/9/14,
  sind aber derselbe Fehler; dort nicht noch einmal suchen.
- **Fund 2 (doppelt): „Für heute durch" + „Heute ist in allen Bereichen
  alles erledigt"** bei nur einem Bereich mit Karten. Die 3.16.0-Sperre
  zählte `bereiche.length`, ein leerer zweiter Bereich hob sie auf.
- Ohne Befund: Plaketten „8 Wiederholungen · 4 neu" sind reine Anzeige (kein
  toter Knopf), Serie-Hinweis erscheint nur bei Gefahr, höchstens ein
  Hinweis, Start-Liste ersetzt den Hinweis.
- Bemerkt, kein App-Fehler: im Testzustand „erste Runde" zeigt die Serie
  „Heute wird Tag 1", weil der Test-Store kein `streak` setzt – echte Runden
  schreiben ihn.

**Geändert (app.js):** `lernenStapel` (~Z. 8768, 8778), Rundenende (~Z. 9523,
9532), Fortschritt-Zustände (~Z. 8979), Aufzeichnung (~Z. 7827). Version 3.17.4.
**Neu (Prüfstand):** `t_lernen_start.js`.

**Entscheidung:** Einzahl ausgeschrieben („Die Karte für heute ist durch.",
„Deine Karte ist gerade …") statt „1 Karte" – liest sich wie ein Satz, nicht
wie eine Zählung.

**Offen:** –
**Nächste Station:** 6 (Lernrunde – Rest: Wischen, Rückgängig, Notiz,
Merken, Tastatur)

---

### 2026-09-24 — Station 4: Bestätigung (v3.17.3)

**Anlass:** Schleife direkt nach Station 3 („Arbeite weiter an stellen wo du
es für nötig hälst").

**Geprüft (`t_bestaetigung.js`, Handy hell/dunkel, klein, iPad):**
- **Fund 1: Meldungen schieben alle drei Knöpfe** um 83 (Handy), 84–105
  (klein), 63–84 px (iPad) – „Noch nicht bestätigt", „erneut gesendet",
  Fehler.
- **Fund 2: kein Tipp-Feedback** – „Ich habe bestätigt"/„Erneut senden"
  wurden während der Anfrage weder gesperrt noch drehten sie (Checkliste:
  sofortige Rückmeldung).
- **Fund 3: Systemcodes im Text** – „Konnte nicht prüfen:
  auth/network-request-failed", „Fehler beim Versand: auth/too-many-requests".
- Fund 4: Text-Reste – „versuch es dann noch einmal" (seit 3.12.0 prüft der
  Bildschirm selbst), „Verifikations-E-Mail" neben „Bestätigungs-E-Mail",
  Spam-Hinweis doppelt (fest auf der Seite + in jeder Meldung).
- Ohne Befund: automatische Weiterleitung nach Bestätigung 2,2–2,8 s,
  Kontrast 0, Knöpfe im Fenster, nicht quer.
- Kein App-Fund, aber Prüfstand: `stubs.js` erlaubte unbestätigten Nutzern
  das Lesen – die App lief deshalb im Test in den „neues Konto"-Zweig und
  setzte das Thema auf dunkel. Echte Regeln (`firestore.rules` Z. 67/275)
  verweigern das; der Stub tut es jetzt auch (`permission-denied`).
  `reload()`/`sendEmailVerification()` im Stub können über
  `__FB.authFail` scheitern.

**Geändert (app.js):** `renderPendingVerification` (~Z. 6360–6400): Schütteln
wie in `renderAuth`, Spam-Satz kürzer, Knöpfe mit `disabled`/`busy`
(`ui.authBusyWas` = "pruefen"/"senden", neu in `ui`), Meldungen
(`auth-meldung`, `role`) unter die Knöpfe. `pruefeBestaetigung` /
`doResendVerification` (~Z. 2665–2700): `authErrorText(e)` statt Code, neue
Texte. `doRegister`: Info nur noch „Konto angelegt.". Version 3.17.3.
**Neu (Prüfstand):** `t_bestaetigung.js`; `stubs.js` s. o.

**Entscheidung:** Dieselben Bausteine wie Station 3 (Meldung unten,
Schütteln), damit beide Anmelde-Bildschirme gleich antworten (Checkliste
Konsistenz). „Ich habe bestätigt" bleibt trotz Selbst-Prüfung – er ist der
Weg bei hakendem Netz (Begründung 3.12.0).

**Geprüft danach:** Sprünge 0 px in allen Fällen und Geräten, Tipp-Feedback
ja, Texte ohne Codes, Kontrast 0; Regression `t_anmelden.js` unverändert 0.

**Offen:** –
**Nächste Station:** 5 (Lernen-Start)

---

### 2026-09-24 — Station 3: Anmelden (v3.17.2)

**Anlass:** Schleife nach Station 2, keine neue Betreiber-Nachricht außer
„Arbeite weiter an stellen wo du es für nötig hälst" (PostHog-Schlüssel
kommt später mit „von vorhin:").

**Geprüft (`t_anmelden.js`, Handy hell/dunkel, klein, iPad):**
- **Fund 1: Fehlermeldung schiebt den Knopf** – „E-Mail oder Passwort stimmt
  nicht" stand über dem Formular, Anmelde-Knopf 63 px tiefer. Ein zweiter
  Tipp landete daneben.
- **Fund 2: Name-Fehler verlängert das Formular** um 30 px (eigene Zeile
  `.field__fehler` unter dem Feld), Knopf rutschte.
- Fund 3: Kein Tast-/Sichtsignal bei wiederholtem Fehlversuch – die Meldung
  steht schon da, ein zweiter Fehlschlag sieht aus wie „nichts passiert".
- Ohne Befund: Passwort vergessen (Bestätigung erscheint), Passwort-Auge
  behält Eingaben, Kontrast 0, keine waagerechte Scrollleiste.
- „Neues Konto" führt über den Einstieg (Plan speichern) – so gewollt
  (`mode-register`), kein Fund.

**Geändert (app.js, `renderAuth` ~Z. 6460–6520):** `ui.authError`/`ui.authInfo`
nach den Formular-Aktionen, Klasse `auth-meldung`, `role="alert"`/`"status"`;
Schütteln nur bei neuer Meldung (`ui.authFehlerGezeigt`); Name-Fehler als
`.opt--fehler` in der Beschriftung (`#a-name-fehler`), der input-Listener
setzt Text/Klasse zurück statt ein Element zu entfernen. Version 3.17.2.
**Geändert (styles.css, Ende):** `.auth-meldung` (enter-rise),
`.auth-wackeln` + `@keyframes auth-wackeln`, `.opt--fehler`.
**Neu (Prüfstand):** `t_anmelden.js`.

**Entscheidung:** Meldung unter den Knopf statt Platz oben freihalten – ein
leerer Platz wäre ohne Fehler ein Loch; unter dem Knopf verschiebt sie nichts,
was man noch antippen will. Schütteln nur einmal pro neuer Meldung, damit es
nicht bei jedem Neuzeichnen (z. B. Passwort-Auge) wackelt.

**Geprüft danach:** Sprünge 0 px (Fehler, Name), Kontrast 0 in allen
Varianten, keine Konsolenfehler.

**Offen:** –
**Nächste Station:** 4 (Bestätigung)

---

### 2026-09-24 — Station 2: Einstieg (v3.17.1)

**Anlass:** Routine, 11:50 UTC. Keine neue Betreiber-Nachricht seit v3.17.0.
Der Betreiber will den Einstieg inhaltlich selbst durchgehen – geprüft und
behoben wurde nur Handwerk (Sprünge, Kontrast, Lage), Inhalt und Ablauf
unverändert.

**Geprüft (`t_einstieg.js`, `t_einstieg_lage.js`, Handy/klein/iPad, hell+dunkel):**
- **Fund: Weiter-Knopf springt bei jeder Wahl** – Ziel 81/105/31 px
  (Handy/klein/iPad), Hürden 39/39/22, Zeitpunkt 0/25/2. Ursache: Knopf im
  Fluss direkt unter Echo-Satz bzw. Hürden-Echo; auf dem iPad zusätzlich die
  senkrechte Zentrierung (Echo verschob alles um die halbe Höhe).
- Fund 2: Knopf-Lage zwischen den Schritten verschieden (±30 px), weil nur
  Pflicht-Bildschirme die Hinweiszeile darunter haben.
- Fund 3: „kein Tracking" im Einstieg (Plan-Bildschirm) – seit 3.17.0 nicht
  mehr wörtlich wahr.
- Kontrast: Die Meldungen zu den Leiter-Wörtern waren ein Fehler des
  Prüfskripts (absolut gesetztes Kind außerhalb des Eltern-Kastens → Punkt als
  Hintergrund gewertet). `kontrast.js` wertet jetzt nur Flächen unter dem
  Text und überspringt laufende Animationen.

**Geändert (styles.css):** `.solo.einstieg-solo` volle Höhe als Spalte,
`.einstieg` wächst, `.einstieg > .einstieg-aktion` unten (`margin-top: auto`,
`position: sticky`, Verlauf, unterer Abstand hier statt an `.solo`), iPad:
oben mit Luft statt zentriert; `.einstieg-sperre` Zeilenhöhe = Mindesthöhe.
**Geändert (app.js):** `einstiegFuss` – leere Hinweiszeile auf Schritt 1–6;
Vertrauenssatz „Keine Werbung, keine Cookies."; Version 3.17.1.
**Neu (Prüfstand):** `t_einstieg.js`, `t_einstieg_lage.js`, `t_leiste.js`;
`kontrast.js` verbessert.

**Entscheidung:** Knopf unten fest statt Platz für das Echo freizuhalten – ein
freigehaltener Platz wäre vor der Wahl ein Loch; unten fest ist das Muster
der Vorbilder (Duolingo, Cal AI) und die Daumenzone.

**Geprüft danach:** Sprünge 0 px überall; Knopf auf Schritt 1–6 an derselben
Stelle (741/637/1077 px), Schritt 0 17 px höher (Link darunter); Kontrast 0;
Regression (Kontrast App, Sprünge Runde, Konto löschen), Affe klein 150, 0.

**Offen:** –
**Nächste Station:** 3 (Anmelden)

---

### 2026-09-24 — Betreiber: Analytics ja, Board, Hinweise, Runde (v3.17.0)

**Anlass (Vorrang vor der Schleife):** Datenschutz/Impressum „sollen mit der
Zeit gehen" → Analytics ja (PostHog, TikTok-Hinweis), Ideen-Board „cleane
dings statt plötzliches verspätetes pop up" und ausbauen, Übersetzung früher?,
Unterzeilen der Bewertung weg, Hinweise/Erinnerung „passend in bestimmten
Situationen", Video: Fortschritt sichtbar machen, vor dem Gehen zeigen, was
verloren geht, Rückblick. „viele regeln wurden von claude früher
geschrieben [...] kannst umgehen" (u. a. J1: keine neuen localStorage-Schlüssel).

**Geändert (app.js):** Statistik-Modul (Z. ~150–250: `POSTHOG_KEY` leer =
aus, `zaehle`, `zaehlSenden`, `zaehlKennungSetzen`, `zaehlBildschirm`) und
Ereignisse an Runde/Üben/Karten/Codes/Dateien/Sicherung/Konto/Einstellungen/
Ideen/Fehlerformular/Start; `BETREIBER_UIDS` = Betreiber-Kennung aus
`firestore.rules`; Ideen-Board neu (`renderFeedbackSeite`, `feedbackInhalt`,
`zeichneIdeen`, `feedbackZeile`, Entwurf per input-Listener, Vorladen in
`case "einstellungen"`, Einreichen ohne Neuladen); Hinweise
(`lernenHinweis`, `hinweisKarte`, `hinweisWeg`, `letzteWoche`,
`gesesseneKarten`, localStorage `adrabic-hinweise`); Erinnerung
(`erinnerungSheet`, `erinnerungIcs`, `erinnerungHerunterladen`, Zeile in den
Einstellungen); Bewertung ohne Unterzeilen; Löschen-Seite mit Fortschritt;
Version 3.17.0.
**Geändert (styles.css):** Antwort ohne Verzögerung (Linie 120 ms),
Knopfhöhe `--ctrl-lg`, `.schalter-optik`, Abschnitt „3.17.0 · Hinweise,
Ideen-Board, Erinnerung".
**Geändert (sonst):** `firebase.json` (CSP connect-src + eu.i.posthog.com, beide
Seiten), `datenschutzerklaerung.html` (Kurz gesagt, 2, 7, 8, 9, 10, neu 15,
Stand 24.9.), `plan/analytics/GERUEST.md`, `plan/PLAN.md` (Frage 14).
**Neu:** `plan/werkzeuge/pruefstand/t_317.js`.

**Entscheidung:**
- **PostHog ohne Bibliothek:** eigener schlanker Sender an `/batch/`. Kein
  fremdes Skript (Sicherheit, CSP nur connect-src), keine Cookies/kein
  Speicher auf dem Gerät, keine Autocapture/Aufnahmen. Kennung angemeldet =
  SHA-256("adrabic|"+uid) gekürzt (Wiederkehr messbar, nicht umkehrbar);
  abgemeldet = Zufall je Seitenaufruf ohne Personenprofil
  (`$process_person_profile: false`). Einstieg-Trichter über
  `bildschirm` = „einstieg-N".
- **Bis zum Schlüssel aus:** Ohne PostHog-Konto des Betreibers gibt es keinen
  Schlüssel; der Schalter in den Einstellungen erscheint erst mit Schlüssel.
- **Push-Mitteilungen nicht gebaut:** bräuchten einen Server (FCM + Cloud
  Functions, Blaze-Tarif) – stattdessen Kalendereintrag (.ics, täglich).
- **Übersetzung früher: ja** – die Rückseite war beim Umdrehen kurz leer.
- **Rabatt beim Kündigen (Video):** trifft nicht zu – es gibt kein Abo.
  Übernommen ist der Kern: vor dem Löschen den Fortschritt zeigen.
- **Moderation:** Anzeige jetzt nur für die Betreiber-Kennung; Sicherheit
  lag schon immer in den Regeln (`istFeedbackModerator`).

**Geprüft:** `t_317.js` dunkel+hell (Hinweis-Kette Meilenstein → Erinnerung
→ Ideen, .ics mit RRULE und DTSTART, Toast, Einstellungszeile, Board ohne
Platzhalter nach Vorladen, Stimme 3→4, Einreichen mit Dank, keine
Moderation für Nicht-Betreiber, Statistik: 13 Ereignisse, Kennung „k-…",
keine uid/E-Mail/Inhalte im Versand); Kontrast 0; Sprünge 0 (±1 px am
360-px-Handy); `t_hick`, `t_ueben`, `t_start`, `t_sicher`; Affe 200, 0.

**Offen:** PostHog-Schlüssel und IP-Einstellung (Betreiber, siehe PLAN
Frage 14); Datenschutz-Punkt 15 rechtlich gegenlesen lassen; Kalender-Datei
am iPhone prüfen.
**Nächste Station:** 2 (Einstieg)

---

### 2026-09-24 — Station 1: Start (v3.16.1)

**Anlass:** Routine `trig_016y2uuWtQZ4yrCzAhkZsLQn`, 10:50 UTC. Keine neue
Betreiber-Nachricht seit v3.16.0.

**Geprüft (`plan/werkzeuge/pruefstand/t_start.js`, `t_klein_boot.js`):**
- **Hänger beim Start – Fund.** `initFirebase()` → `importMitVersuch()`;
  `render()` läuft erst nach `onAuthStateChanged`. Antwortet gstatic.com
  nie (weder Daten noch Fehler), gab es keinen Ausweg: nach 11 s nur das
  Zeichen. Der 9-s-Hinweis (`ladeTimer`) sitzt im Lade-Zweig von `render()`
  und greift erst bei langsamen DATEN.
- Startbild vs. erstes Bild (1170×2532): mittlere Abweichung 0,01 je Kanal,
  eine Stelle >24 (Quantisierung) – Startbilder müssen nicht neu.
- Übergang: 0,15/0,45 s Ladebild, 0,7/0,85 s Ausblenden, ab 1,0 s App.
  Kein leeres Bild dazwischen gemessen.
- Bewegung reduziert: Hof/Linie aus (Regel in 3.13.0), Linie erscheint ohne
  Einblendung nach 0,9 s.

**Geändert (app.js):** `let ersterRender` (Z. ~1033), in `render()` gesetzt;
`startWaechter()` + `START_WAECHTER_MS = 9000` im Startblock;
`bootLangsamHinweis()`; Lade-Zweig in `render()` über `data-stand`
(ruhig/langsam/fehler) statt Klassenprüfung – der Hinweis wird nicht bei
jedem Neuzeichnen neu eingeblendet. Version 3.16.1.
**Geändert (styles.css):** `.boot__hinweis` (absolut unter der Linie).

**Entscheidung:** Hinweis und Wartezeit wie beim langsamen Datenladen (ein
Satz, „Neu laden", 9 s) – eine Regel, nicht zwei. „Neu laden" statt
„Selbstheilung" (Caches löschen): bei einem Hänger ist das Netz das
Problem, nicht der Zwischenspeicher. Der Fehlerfall (`syncError`) behält
den Fluss-Aufbau (`.boot--hinweis`), weil er mehr Text trägt.

**Geprüft danach:** Zeichen/Name vor und nach dem Hinweis 374/486 px (0
Sprung); normaler Start ohne Hinweis; 320×568: Knopf endet bei 503 px;
Kontrast 0; Sprünge 0 (bekannte 4 px); `t_hick.js`; Affe 150 Schritte, 0.

**Offen:** Fehlerfall `syncError` am Bildschirm nicht nachgestellt (der
Prüfstand kann Firestore-Fehler noch nicht auslösen) – gehört zu Station 16.
**Nächste Station:** 2 (Einstieg)

---

### 2026-09-24 — Hick-Durchgang über das ganze Tool, „Tage gelernt" (v3.16.0)

**Anlass:** Betreiber (Vorrang vor der Schleife): „mach einfach, und achte
dabei auf hick's law" (= offene Fragen 14/15 selbst entscheiden), „bei profil
wie viele tage gelernt, muss da auf jeden überprüft werden weil hab das tool
locker über 30 tage genutzt", „deine karten [...] zu viel platz [...] stufen
und farbe erklärt", „sachen im doppelt gemoppelt raus", „gesamtes tool".

**Vorgehen:** Inventar jedes Bildschirms (`plan/werkzeuge/pruefstand/
t_inventar.js`, `t_inventar2.js`: Text-Gliederung + Ganzseitenfotos), dann
jede Information gegen die anderen Bildschirme gehalten.

**Befund „Tage gelernt":** `Object.keys(verlauf).length`. Das Protokoll gibt
es seit 2.8.0 (7.9.2026), es zählt nur Tage mit Bewertung, hält 120 Tage.
`ersteBewertung` existiert erst seit 1.6.0 (3.9.2026) und nur für Tage mit
neuen Karten. Die Tage des Betreibers vor dem 7.9. sind **nirgends
gespeichert** – nicht rekonstruierbar.

**Geändert (app.js):** Profil (`renderEinstellungen`) ohne Zahlenreihe, neu
`kontoSeit()` („Dabei seit …" aus `currentUser.metadata.creationTime`);
Einstellungen-Kopf ohne „Fertig"; `tagGelernt()` + Feld `u` im Protokoll
(`normVerlauf`, `verlaufZaehle`, `verlaufZusammen`, `verlaufNachschicken`,
`verlaufSumme`), alle Serien-/Tagesprüfungen über `tagGelernt`
(`serieAktuell`, `lernenSerie`, `lernenStapel`, `renderRundenEnde`,
`startListe`), `gradeCard` zählt Übungsantworten (`u`); Fortschritt:
`fortschrittHeute`/`fortschrittTrend` entfernt, `fortschrittWochen` =
Zahl + Vergleich + Kalender + Übungszeile, Legende kompakt ohne Nullen,
Umschalter weg (`ui.statsScope` fest „alle"), Lektionen-Zeile für den offenen
Bereich; Lernen ohne doppelte „fällig"-Zeile, `trotzdem-ueben` öffnet Üben,
Alles-erledigt-Banner nur bei mehreren Bereichen; Verwalten: Stand-Punkte
statt Plakette, Zieh-Hinweis nur bei mehreren Seiten, Suchbereich nur beim
Suchen; Kartenblatt ohne „– Pflicht", Notiz mit Platzhalter; Rundenende ohne
„Fertig" in der Kopfzeile; zwei Einleitungstexte gekürzt. Version 3.16.0.
**Geändert (styles.css):** `.profil__seit` (statt `.profil__zahlen`),
`.stat-legend--kompakt`, `.wochen-kopf`, `.wochen-ueben`,
`.card-row__stand`, `.liste-suchbereich`.

**Entscheidung:**
- **Frage 15 (Üben im Fortschritt): gebaut, ohne Serie.** Ein reiner
  Übungstag füllt keinen Wochenpunkt, kein Kalenderkästchen, hält keine
  Serie. Geprüft: 6 Übungsantworten → Serie und Woche unverändert; danach
  eine echte Runde → heutiger Punkt gefüllt.
- **Frage 14 (Analytics): nicht gebaut.** Die Datenschutzerklärung verspricht
  wörtlich „Keine Werbung, kein Tracking, keine Analyse-Dienste" und „keine
  Analyse des Nutzungsverhaltens". Jede Zählung bräche das öffentliche
  Versprechen an die Nutzer:innen oder müsste es ändern – das ist keine
  Gestaltungsfrage, die „mach einfach" abdeckt. Dem Betreiber als Ja/Nein
  vorgelegt („Zählen ja?"); bei Ja: anonyme Tageszähler ohne Kennung +
  neuer Absatz in der Datenschutzerklärung + Firestore-Regel (die
  `veroeffentlichen.bat` NICHT mitspielt – sie deployt nur Hosting).
- **Serie nur noch auf Lernen**, nicht im Fortschritt: Lernen ist der Ort,
  an den man täglich kommt (Rückkehr-Drang), Fortschritt der Ort für „wie
  stehe ich da".
- **„Serie fortsetzen" entfällt** mit `fortschrittHeute`: hing an
  `streak.gerissenAm`, das seit 2.14.0 nie gesetzt wird (toter Hinweis).
- **Einstieg nicht umgebaut:** Der Betreiber will ihn selbst durchgehen;
  im Inventar keine Doppelung gefunden, die nicht bewusst ist (Echo-Sätze).

**Geprüft:** Kontrast 0; Sprünge Lernen/Üben 0 px (Ausnahme bekannt: 4 px am
360-px-Handy bei Rückfall + Notiz); `t_hick.js` hell und dunkel (Profil,
Fortschritt, Suchbereich an/aus, Formular, Rundenende, Trotzdem üben, Serie
bei reinem Üben); `t_ueben.js`, `t_sicher.js`; iPad + Desktop; Affentest
200 (Handy) + 150 (iPad) Schritte, 0 Befunde.

**Offen:** Frage 14 (Ja/Nein des Betreibers). J1.
**Nächste Station:** 1 (Start)

---

### 2026-09-24 — Betreiber-Rückmeldung zu Üben, Tinte, Ring (v3.15.0)

**Anlass:** Betreiber (hat Vorrang vor der Schleife): Üben überladen, Banner
auf jeder Karte unnötig, Schreiben dunkel auf dunkel, Bewertungsknöpfe ins
Üben zurück, Üben evtl. im Fortschritt zählen, Umrandungs-Animation aus dem
Einstieg durchgängig, Analytics notieren, „alles durchdenken".

**Geändert (app.js):** `drawStrokes()` Farben aus `--text-1`/`--border-strong`;
`renderSession()` – Kopfzeilen-Hinweis erste Übungskarte (`.mitte-wechsel`),
Üben mit Knopf + antippbarer Karte + Bewertungszeile (eigene Unterzeilen),
Raster-Mitte (`.study-card__oben/__unten`), `study-flaeche--wartet`, Tipp-Satz
nur bei `!s.zug`; `leechHinweis()` gekürzt; `gradeCard()` zählt auch im Üben,
kein Neumischen; Tastatur/Tipp-irgendwo decken nur noch auf; Wischen auch im
Üben; `renderRundenEnde()` mit Übungsfassung + `drill-nochmal`;
Übungsauswahl neu (`ui.drillGruppen`, `gruppenName`, `drillGruppenKarten`,
`startDrillGruppen`, `case "stufe-chip"` an/aus); `waehleStufe()` und
`startDrill(min,max)` entfernt (unbenutzt); Version 3.15.0.
**Geändert (styles.css):** `--paper-500` (dunkel), `--cinnabar-400`,
`--verdigris-400` (hell/dunkel), `.grade-row .sub` ohne Deckkraft,
`.badge.zustand-frisch` hell; `karte-einladen`, `geist-glanz-*`,
`karte-schatten` über `::before`-Deckkraft; `.segment`, `input.schalter`,
`.drill-*`, `.mitte-wechsel`, `.study-card__mitte` als Raster,
`.leech-banner` mit Zeichen daneben.
**Neu:** `plan/werkzeuge/pruefstand/kontrast.js` + `t_kontrast.js`,
`t_ueben.js`, `t_sprung_ueben.js`, `t_ring.js`, `t_fotos_runde.js`;
`plan/analytics/GERUEST.md`; offene Fragen 14 (Analytics) und 15 (Üben im
Fortschritt) in `plan/PLAN.md`.

**Entscheidung:**
- **Schreiben bleibt**, aber als Schalter mit Unterzeile statt Haken mit
  Klammertext. Ob es ganz wegfällt, kann erst Nutzung zeigen (Frage 14) –
  Entfernen wäre nicht rückgängig zu machen für die, die es benutzen.
- **Bewertung im Üben wirkt nur auf die Runde.** Alles andere hieße, die
  Lernlogik zu ändern (tabu). Deshalb eigene Unterzeilen („passt", „sitzt")
  statt „morgen/später wieder".
- **Üben zählt (noch) nicht im Fortschritt:** Die Anzeige wäre leicht, aber
  ob ein Übungstag die Serie hält, ist eine Entscheidung des Betreibers
  (Frage 15, Empfehlung: nein).
- **Analytics nicht gebaut:** braucht Rechtsprüfung und eine Wahl (Frage 14).
- **Kontrast wird jetzt gemessen, nicht angeschaut** – die dunkle Tinte war
  genau die Sorte Fehler, die man auf Fotos übersieht. `t_kontrast.js` gehört
  ab jetzt zu jeder Runde der Schleife.

**Geprüft:** Kontrast 0 Funde (vorher 48); Sprünge: Aufdecken 0 px, Karte zu
Karte 0 px (Ausnahme 4 px am 360-px-Handy, wenn Rückfall-Hinweis und Notiz
zusammenkommen); Üben komplett (Auswahl, 12 Bewertungen, Ende, Nochmal,
Schreiben hell/dunkel); Ring und Aufleuchten Bild für Bild; Regressionstests;
Affentest 200 + 150 Schritte, 0 Befunde.

**Offen:** Fragen 14 und 15 (`plan/PLAN.md`).
**Nächste Station:** 1 (Start)

---

### 2026-09-24 — Schleife eingerichtet; Karte dreht sich wirklich (v3.14.0)

**Anlass:** Betreiber: „lern modus zumindest kann man karte nur umdrehen wenn
man auf antwort anzeigen drückt, soll das? bitte nimm kritik nicht akzeptant
immer an. sonst ist karten umdrehen [...] sehr unsatisfying. knöpfe garnicht
[...] versuch selbst eine loop zu erstellen [...] von 1 bis ende".

**Geändert (app.js):** `renderSession()` – Karte aus zwei Seiten
(`.karte-dreh`, `.karte-seite--vorn/--hinten`), Karte trägt im Lernen
`data-action="reveal"`, Platzhalter für „Merken", Notiz und Rückfall-Hinweis
vor dem Aufdecken; neu `leechHinweis()`, `kartenAbflug()` (aus `gradeCard()`
gerufen); `revealAnswer()` mit Doppeltipp-Sperre und `fuehlbar(8)`;
`stufenBereichName()` → „alle Karten"; Üben-Hinweis mit Abstand wie die
Bewertungszeile; Version 3.14.0.
**Geändert (styles.css):** `.study-flaeche` nur noch Griff, Aussehen auf
`.karte-seite`; `karte-wende`, `karte-hebt`, `karte-schatten`;
`.karte-geist--*` + `geist-*`; `.study-aufdecken`/`.grade-row button` 58 px;
`karte-kommt` ohne Füllmodus `both`.
**Neu:** `plan/audit/AUFTRAG.md`, dieses Logbuch,
`plan/werkzeuge/pruefstand/` (Prüfstand aus dem Scratchpad ins Repo geholt,
sonst stünde die Schleife nach einem Container-Neustart ohne Werkzeug da).

**Entscheidung:**
- **Antippen deckt auf – die Kritik stimmt, die alte Begründung nicht mehr.**
  2.16.0 hatte bewusst nur den Knopf zugelassen („wer zielen muss, soll nicht
  aus Versehen aufdecken"). Das galt einem Tipp *irgendwo*. Die Karte selbst
  anzutippen ist Absicht, Aufdecken bewertet nichts, und Anki/Quizlet machen
  es genauso. Der Knopf bleibt (Zugänglichkeit, Gewohnheit).
- **„Fast"/„Sicher" bleiben.** Geprüft: Die Zahl der Knöpfe ist Lernlogik
  (tabu); die Wörter sind kurz und eindeutig, die Unterzeilen verraten kein
  System. Was
  fehlte, war das Gefühl, nicht die Beschriftung – deshalb Abflug + Druck.
- **Wegflug statt Verschwinden** mit einer Kopie außerhalb von `#app`, weil
  `render()` das Markup ersetzt. Nach einem Wisch wird nichts kopiert (die
  Karte fliegt dort schon selbst).
- **Nebenfund behoben:** `karte-kommt`/`karte-dreht` liefen mit
  `animation-fill-mode: both` auf `.study-flaeche`; die Endlage einer
  gefüllten Animation überschreibt Inline-Styles – das Wischen hätte die
  Karte danach nicht mehr sichtbar bewegt.

**Geprüft:** Sprungmessung über 12 Karten × 4 Geräte = 0 px (vorher −3 bis
−120 px), Üben 0 px; Drehung und Abflug Bild für Bild (dunkel und hell);
Wischen nach dem Drehen bewegt die Karte; Doppeltipp deckt einmal auf;
Regressionstests; Affentest 200 Schritte, 0 Befunde.

**Offen:** –
**Nächste Station:** 1 (Start)
