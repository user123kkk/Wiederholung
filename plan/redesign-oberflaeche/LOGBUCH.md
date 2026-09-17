# Logbuch: Oberfläche & Mobile-Gestalt

Letzter Eintrag zuerst.

---

### 2026-09-17 — Bühne mittig, Block 3 angefangen (v3.2.1)

**Geändert:** `styles.css` — `.view--modus` nimmt im 900px-Block den
Spalten-Einzug zurück (`padding-left/right`, `padding-bottom`, `max-width`).
`app.js` — Zähler der Modusleiste zählt die laufende Karte statt der
erledigten; Unterzeile von „Nicht" gekürzt. `probelauf.mjs` — zwei Bühnen-
Bildschirme, zwei iPad-breite Bildschirme, Mittigkeits-Messung.
`app.js:19`/`sw.js:10` auf 3.2.1. `CHANGELOG.md`.

**Entscheidung:** Der Betreiber hat die Vorschau auf dem iPad geöffnet und
gemeldet, die Lernansicht sitze nach rechts verschoben. Der Fund war
eindeutig: Ab 900px rückt `.view` den Inhalt um `--rail-w` (240px) nach
rechts, damit er neben der Spalte steht — aber **im Modus gibt es die Spalte
nicht**, der Modus verdeckt die ganze Shell. Dass in derselben Regelgruppe
schon `.modebar { left: 0 }` steht, zeigt, dass das beim Schreiben von 3.0.0
mitgedacht war; nur der Einzug des Inhalts wurde vergessen. Die Bühne saß
dadurch 120px rechts von der Mitte. **Am Handy greift die Regel nicht, also
konnte es kein Handy-Test finden** — und die Vorschau am iPad hat in der
ersten Stunde etwas gefunden, das drei Sessions am Schreibtisch nicht fanden.

Daraus zwei Konsequenzen für den Probelauf, beide eingebaut: Er läuft jetzt
zusätzlich in iPad-Breite, und er misst, ob der Inhalt im Modus mittig sitzt.
Beim Einbauen der Messung selbst noch eine Falle: Gegen `window.innerWidth`
gemessen meldete sie konstant 7px Versatz. Das war die Scrollbar-Reserve aus
`scrollbar-gutter: stable` — im Desktop-Chromium real, auf iPhone und iPad
nicht existent. Gemessen wird deshalb gegen den Body; das ist der Platz, der
wirklich zum Auslegen da ist. Hätte ich das nicht nachgerechnet, wäre die
Prüfung ab sofort dauerhaft rot gewesen und damit wertlos.

Zwei kleinere Funde von der Bühne selbst, beide aus dem Bild: Die Leiste sagte
auf der ersten Karte „0 von 11" — richtig gezählt, aber gelesen wie „Karte 0"
(Video 3: eine Null am Anfang liest sich wie Stillstand). Zählt jetzt die
Karte, auf der man steht. Und „kommt gleich wieder" war die einzige der drei
Unterzeilen unter den Bewertungsknöpfen, die umbrach — die drei standen
sichtbar ungleich da.

**Offen:**
- Block 3 ist damit **angefangen, nicht fertig**: geprüft sind Zähler,
  Knopfzeile und Mittigkeit. Nicht geprüft sind die Gesten (Wischen zum
  Bewerten, Long-Press) und die Übergänge zwischen zwei Karten — beides kann
  ein Standbild nicht zeigen und der Probelauf nicht auslösen.
- Die Vorschau als Artefakt hat keine Quran-Schrift (fremde Herkunft, von dort
  gesperrt). Arabische Typografie lässt sich dort **nicht** beurteilen.
- Blöcke 4 (`landing.html`) und 5 (Erststart) stehen noch.

**Nächster Schritt:** Block 3 zu Ende — die Übergänge zwischen zwei Karten und
das Verhalten nach dem Bewerten ansehen. Dafür muss der Probelauf mehrere
Bewertungen hintereinander klicken können; bisher hält er nach dem Aufdecken
an.

---

### 2026-09-17 — Block 2: Einstellungen und Fortschritt neu aufgebaut (v3.2.0)

**Geändert:**
- `app.js` — `renderEinstellungen()` komplett neu (Liste statt sechs Kästen),
  neu: `einstZeile()`, `labelVon()`, `einstFuss()`, `renderEinstellungenSeite()`,
  `WAHLEN`, `wahlSheet()`, `SEITEN_TITEL`. `renderFortschritt()` neu (vier
  Blöcke + „Genauer ansehen"), neu: `renderFortschrittSeite()`. `ui.seite` und
  `ui.wahlSheet` ergänzt; fünf Handlungen (`einst-seite`, `fort-seite`,
  `seite-zu`, `wahl-sheet`, `wahl-sheet-zu`); Gerüst in `renderMain()` um zwei
  Zweige für Unterseiten erweitert.
- `styles.css` — `.stat-block` ist eine Fläche; `.liste-zeile` 52px mit
  Winkel-Behandlung; `.stat-legend` einspaltig; `.gross-zahl` umbruchfähig;
  `.serie-karte` mit Fuge; `.sektion` 12→20px.
- Neu: `plan/redesign-oberflaeche/probelauf.mjs` (+ `.gitignore`-Eintrag für
  die erzeugten Bilder). `app.js:19`/`sw.js:10` auf 3.2.0. `CHANGELOG.md`.

**Entscheidung:** Der Betreiber hat beide Bildschirme als „chaotisch" bzw.
„Chaosladen" gemeldet und auf die Erklärungstexte gezeigt. Die Ursache war
nicht der Text, sondern die **Form**: beide Bildschirme waren Stapel — sechs
bzw. neun Blöcke untereinander, jeder mit Überschrift und Absatz, alles
gleichzeitig sichtbar, obwohl man immer nur wegen einer Sache herkommt. Video 1
kennt genau dieses Muster und die Antwort darauf: ein Bildschirm macht eine
Sache; wer etwas Zusätzliches zeigen will, nimmt eine neue **Seite**, keine
neue Zeile.

Also: Übersicht = Zeilen mit Stand rechts, kein erklärender Text. Der Text ist
**nicht gelöscht**, er steht jetzt dort, wo entschieden wird — im Blatt (zwei
bis vier Antworten) oder auf der Unterseite (Handlung). Das war die Bedingung,
unter der ich das gemacht habe: Was erklärt werden muss, wird nicht weggekürzt,
sondern verlegt. Beim Fortschritt dieselbe Trennung: Was ein **Stand** ist,
bleibt auf dem Reiter; was eine **Liste** ist, wird eine Seite.

`.stat-block` als Fläche war der Rest des alten Kästen-Verbots. Vier randlose
Überschriften mit Text darunter ergeben eine Textwand — nach dem Reset von
3.1.0 darf die Fläche gruppieren, und die Sperre aus Abschnitt 8 verhindert,
dass daraus Polsterung auf Polsterung wird.

**Geprüft — und das ist der eigentliche Fortschritt dieser Session:** Neu ist
`probelauf.mjs`. Bis jetzt war die App für einen Agenten unsichtbar: `index.html`
lädt Firebase von `gstatic.com`, und wo das gesperrt ist, kommt man nie über
„Start fehlgeschlagen" hinaus. Das Skript legt Attrappen für die drei
Firebase-Module unter und lichtet zehn Bildschirme der **echten** App ab —
dieselben `render()`-Funktionen, dieselben Handler. Es hat sich sofort
ausgezahlt: Der Kasten-im-Kasten auf der Leech-Seite (`.card--flush` um eine
`.liste`) war im Code nicht zu sehen, im Bild sofort. Ebenso, dass Serie und
„Heute" ohne Fuge aneinanderstießen und die Stufen-Legende als Fließband
umbrach.

Zusätzlich misst der Probelauf an jedem Bildschirm den Platz unter dem letzten
Element gegen die Höhe der Navigationsleiste (aktuell 104px gegen 65px). Der
Grund steht im Skript: Ein Vollseiten-Bild zeigt eine `position:fixed`-Leiste
an einer erfundenen Stelle — ich habe genau deshalb zwischendurch einen
Überlappungs-Fehler vermutet, den es nicht gab. Eine Zahl lügt da nicht.

**Offen:**
- **Am echten Handy weiterhin nicht angesehen** — geprüft ist Chromium bei
  390×844 mit erfundenen Daten. Gesten (Wischen, Long-Press) und Safe-Area
  kann nur der Betreiber beurteilen.
- Der Probelauf deckt **Gestalt** ab, nicht Verhalten: Er klickt sich durch
  und prüft auf Konsolenfehler, aber er ist kein Test der Lernlogik.
- Block 3 (Bühne/Bewertung), 4 (`landing.html`) und 5 (Erststart) stehen noch.
- `KONZEPT.md` §7 unverändert — die Lockerung gilt weiter nur für diesen Strang.

**Nächster Schritt:** Block 3 — die Bühne (Abfrage/Bewertung). Das ist der
Bildschirm, auf dem die meiste Zeit verbracht wird, und der einzige, den ich
noch nicht gegen Video 1 geprüft habe. Vorgehen wie hier: erst im Probelauf
ansehen (der Bildschirm fehlt dort noch, weil er eine laufende Sitzung
braucht), dann belegen, dann ändern.

---

### 2026-09-17 — Regel-Reset und Block 1: Fundament (v3.1.0)

**Geändert:**
- `styles.css` — Kopf komplett neu (vier Sätze statt drei); neue Token-Schicht
  `--fs-micro … --fs-2xl` in Abschnitt 1; `html { font-size: 106.25% }` und
  `body { font-size: var(--fs-base) }` in Abschnitt 2; 82 verstreute
  Schriftgrößen auf Token umgestellt; Überschriften-Leiter h1–h4 neu gesetzt;
  `--appbar-h` 52→56px, `--nav-h` 58→64px, `.bereich-pill` 36px→`var(--tap)`,
  `.nav__tab .i` 23→25px; Abschnitt 8 mit neuem Doktrin-Text und der
  Verschachtelungs-Sperre; Abschnitt 12 Kommentar umgeschrieben; fünf
  veraltete Gold-Kommentare korrigiert.
- Neu: `plan/redesign-oberflaeche/stilprobe.html` — Arbeitsmittel, nicht in `APP_SHELL`.
- `app.js:19` / `sw.js:10` auf 3.1.0. `CHANGELOG.md`. `README.md` (Abschnitt
  „Wenn du an der Gestaltung arbeitest" neu). `AUFTRAG.md` neu gefasst.
- Gelöscht: `CLAUDE-DESIGN-PROMPT.md`, `ANLEITUNG.md` — beschrieben den am
  16.09. verworfenen Weg über Claude Design. Die Design-Entscheidungen, um
  derentwillen sie stehenbleiben sollten, stehen jetzt in `styles.css` (vier
  Sätze, Token) und `README.md`. Wer sie doch braucht: `git show 307368c --
  plan/redesign-oberflaeche/`.

**Entscheidung:** Der Betreiber hat gemeldet, die Gestaltung werde „nicht
eingehalten" und vermutet ein Verbot, das er selbst eingeführt hat. Das stimmt,
und es ließ sich benennen: Der Kopf der `styles.css` führte drei Sätze, die der
Code an zwei von drei Stellen nicht mehr befolgte — Gold war seit 3.1.0 raus,
und das Kästen-Verbot stand gegen 19 `.card`-Stellen in `app.js` (gegen zweimal
`.panel`). **Der Eintrag vom 16.09. „kein Neubau nötig" ist genau daran
entstanden:** Wer an diesen Sätzen misst, misst an einer App, die es nicht gibt,
und kommt jedes Mal auf „passt schon". Der Betreiber hat den Reset freigegeben
(„Ich erlaube dir fürs erste alles"). Vier Sätze stehen jetzt, alle vier vom
Code gedeckt.

Der sichtbarste Teil ist Satz 3. Die Wurzel stand auf der Browser-Voreinstellung
16px, der `body` mit 15px sogar darunter — die Bedienung war also kleiner als
jeder Lesetext, den eine rem-Angabe erzeugt. Video 1 sagt das Gegenteil: iOS
basiert auf 17px, macOS auf 13px; am kleineren Bildschirm wird die Schrift
größer, nicht kleiner. Jetzt 17px Wurzel, alles über acht Token. In Prozent
gesetzt, nicht in px, damit eine im Browser eingestellte größere Schrift
durchschlägt. Die Abstände bleiben px — sie sollen sich **nicht** mitvergrößern,
sonst wird aus einer größeren Schrift nur eine leerere Seite.

Satz 2 steht als CSS, nicht nur als Satz: `.card` in `.card` verliert
automatisch Fläche, Rahmen und Polsterung. Der Grund ist messbar, nicht
ästhetisch — zwei Flächen ineinander kosten auf 390px Bildschirm 80px Inhalt.
Damit kann die Regel nicht mehr aus Versehen gebrochen werden, und man muss sie
auch nicht mehr glauben: die Stilprobe enthält eine absichtlich falsch
verschachtelte Karte als laufende Prüfung.

**Nebenbefund, mitgenommen:** Eingabefelder erben jetzt 17px. Ab 16px hört iOS
auf, beim Antippen eines Feldes hineinzuzoomen — das passierte bisher bei jedem
Formular der App und stand in keiner Beobachtungsliste.

**Geprüft:** Klammern-Bilanz der `styles.css` (504/504). Stilprobe in Chromium
bei 390×844 angesehen, alle Bausteine gerendert. Kontrast gemessen: alle
geprüften Textrollen ≥ 4,5:1, die schwächste Plakette (`zustand-wackelig`) bei
4,53:1 — Phase 9 bleibt gehalten, die Werte sind durch die größere Schrift
strikt besser als vorher. Zwei Nachbesserungen aus dem Augenschein: `h2` lag nach
dem Wechsel nur 1px über `h3` (Leiter neu gesetzt), und die erste entschärfte
Gruppe in einer Karte klebte am Absatz darüber (`margin-top`).

**Offen:**
- **Am echten Handy nicht angesehen.** Geprüft wurde in Chromium bei 390px —
  Safe-Area, iOS-Schriftglättung und die tatsächliche Wirkung der 17px-Basis
  in der Hand kann nur der Betreiber beurteilen. Steht als Punkt 1 unter
  „Was Du noch tun musst".
- `KONZEPT.md` §7 steht formal weiter auf „App-Funktionen nicht anfassen". Die
  Lockerung gilt nur für diesen Strang und ist eine Betreiber-Entscheidung;
  §7 wird **nicht** eigenmächtig umgeschrieben.
- Die Blöcke 2–5 (`AUFTRAG.md`) sind beschrieben, aber nicht angefangen.

**Nächster Schritt:** Block 2 — Startbildschirm. Konkret: die Ansicht `lernen`
in `app.js` gegen Video 1 prüfen und dabei **belegen statt behaupten** — an
welcher Stelle läuft ein Abschnitt in zwei Richtungen zugleich, wo steht mehr
als eine Sache auf einem Bildschirm, wo sitzt die Handlung außerhalb der
Daumenreichweite. Ergebnis in die Stilprobe, dann in den Code.

---

### 2026-09-16 — Ist-Zustand geprüft: Gerüst/Navigation und leere Zustände bereits weitgehend erledigt

**Geändert:** `styles.css:1386` — `.drag-handle` Breite 28px → `var(--tap)` (44px).
`app.js:19` und `sw.js:10` — `APP_VERSION`/`CACHE_NAME` auf 3.0.46. `CHANGELOG.md`.

**Entscheidung:** Wie in `AUFTRAG.md` vorgesehen erst der Ist-Zustand geprüft, bevor
gebaut wird — Ergebnis: **kein Neubau nötig**, der größte Teil des vorgesehenen
Schritts „Gerüst/Navigation" ist bereits seit 3.0.0/3.1.0 vorhanden und deckt
`PRINZIPIEN.md` (Video 1) schon ab:
- **Bottom-Navigation** (`navLeiste()`, `app.js:4162`): drei Tabs, schwebende
  Blur-Leiste mit Safe-Area, aktiver Tab als eigene Fläche (`.nav__tab.active`,
  seit 3.1.0) — entspricht „Bottom-Navigation (3–5, schwebend)".
- **Bottom-Sheet** (`bereichSheet()`, `app.js:4214`) ersetzt die frühere
  waagerechte Pill-Reihe — entspricht „Bottom-Sheets für Aktionen im Kontext".
- **Leere Zustände**: nicht ein Restfall, sondern durchgängig eigene Bildschirme
  mit Icon/Titel/Text/Aktion — „Noch nichts in …" (Bereich leer, `app.js:4898`),
  „Für heute durch" (nichts fällig, `app.js:4914`), „Keine Treffer"/„Noch keine
  Karten" (Suche, `app.js:5891`ff), Start-Fehler (`app.js:6984`). Das ist genau
  der „stärkste Einzelgewinn" aus `PRINZIPIEN.md` — schon umgesetzt.
- **`landing.html`** ist bereits mobil-first aufgebaut (Basis-Styles ohne
  Media Query, eine einzige `@media (min-width: 48rem)`-Erweiterung für
  Desktop) und folgt `STRATEGIE.md` seit dem Umbau in Phase 6/Strang A.

**Einziger echter Fund:** Der Ziehgriff zum Neuordnen (`.drag-handle`) war mit
28px unter dem 44px-Mindestziel aus Video 1 — in `beobachtungen-lernwerkzeug.md`
bereits als vermutliche Ursache der Doppeltipp-Unzuverlässigkeit (v3.0.35–40)
vermerkt, aber nie selbst behoben (nur das Zeitfenster verlängert, v3.0.40).
Geprüft, dass die Breite nirgends in `app.js` hart verdrahtet ist (Zieh-/
Long-Press-Logik arbeitet mit Pointer-Events, nicht mit dem 28px-Wert) — reine
CSS-Änderung auf `var(--tap)`, kein Eingriff in die Gesten-Logik selbst.

**Offen:** Kein weiterer Bau am Gerüst/an der Navigation vorgesehen — würde
gegen `PRINZIPIEN.md` verstoßen („nur wo es wirklich verbessert, nicht
reflexhaft ersetzen"). Die verbleibenden AUFTRAG.md-Blöcke „leere Zustände/
Onboarding" sind wie oben gezeigt im Kern schon abgedeckt; ein eigener
Onboarding-*Assistent* (über die vorhandenen leeren Zustände hinaus) wäre ein
erfundenes Feature ohne Beleg in den drei Videos und widerspricht der
„ruhig, minimal"-Philosophie — deshalb bewusst nicht gebaut.

**Nächster Schritt:** Kein zwingender nächster Block mehr in diesem Strang.
Falls weitergearbeitet wird: gezielt einzelne Stellen mit `PRINZIPIEN.md`
abgleichen statt ganze Bereiche neu zu bauen (z. B. Karten-Doppel-Verschachtelung
oder Typo-Skala am Handy stichprobenartig prüfen) — oder der Strang ruht, bis
der Betreiber eine konkrete Schwachstelle nennt.

---

### 2026-09-16 — Design-Tool übersprungen, direkt im Code weiter

**Geändert:** `AUFTRAG.md` — Abschnitt „Vorgehen" umgeschrieben: kein Handoff-Kreislauf
über Claude Design mehr, stattdessen direkte, phasenweise Umsetzung im Repo.
`CLAUDE-DESIGN-PROMPT.md`/`ANLEITUNG.md` bleiben als Referenz liegen (Design-
Entscheidungen sind dort sauber gebündelt), werden aber nicht mehr ausgeführt.

**Entscheidung:** Betreiber will den Design-Tool-Umweg nicht gehen („würd am
liebsten das unterlassen und direkt zum Plan gehen aus den 3 Videos"). Statt eines
Komplett-Handoffs (der beim Ladebildschirm schon zu ungefragten Zusatz-Features
führte) jetzt **kleinere, geprüfte Schritte direkt im Code** — Token/Basis →
Gerüst/Navigation → leere Zustände/Onboarding → `landing.html`, mit Zwischenstand
nach jedem Block statt einer Riesenänderung auf einmal.

**Offen:** Reihenfolge innerhalb der Schritte ist ein Vorschlag, kein Zwang — die
nächste Session darf begründet abweichen. `PRINZIPIEN.md` (was passt/was nicht)
gilt unverändert als Filter.

**Nächster Schritt:** Ist-Zustand von `styles.css`/`index.html`/App-Navigation
gegen die drei Gestaltungsregeln und `PRINZIPIEN.md` ansehen, dann mit dem ersten
sichtbaren Block beginnen (vermutlich Navigation/Gerüst, da dort laut Video 1 der
größte Sprung zwischen Desktop- und Mobile-Gestalt liegt).

---

### 2026-09-16 — Strang angelegt, Video-Ratschläge gefiltert, Design-Prompt fertig

**Geändert:**
- Neu: `plan/redesign-oberflaeche/` mit `AUFTRAG.md`, `PRINZIPIEN.md`,
  `CLAUDE-DESIGN-PROMPT.md`, `ANLEITUNG.md`, `LOGBUCH.md`.
- `plan/PLAN.md`: Strang C (dieser) + Strang D (`monetarisierung`) in Übersicht und
  „Wo eine neue Session anfängt" aufgenommen; offene Frage zur §7-Lockerung ergänzt.

**Entscheidung:**
- Betreiber liefert drei Videos (Mobile-UI, Geld verdienen, UX-Psychologie) und will
  einen strukturierten Redesign wie beim Ladebildschirm — plus ein **Gerüst** für die
  Punkte, die er jetzt nicht baut (Geld). Umfang per Rückfrage geklärt: Aussehen der
  App **und** Startseite, Bedienung/Navigation darf angefasst werden — **aber** nur im
  Rahmen der bestehenden ruhigen Gestalt, kein KI-Slop. Das lockert `KONZEPT.md` §7
  („App-Funktionen nicht anfassen") bewusst; als Betreiber-Entscheidung dokumentiert.
- Video-Ratschläge nicht sammeln, sondern **filtern** (`PRINZIPIEN.md`): übernommen
  werden ruhige mobile Gestalt, leere Zustände, Smart Defaults, sanftes Onboarding,
  Landing-Reziprozität. Verworfen: Stack-Wechsel (Supabase/Next.js — Rewrite ohne
  Anlass, `KONZEPT.md` §7), Dark-Patterns (Verlustaversion — markenfremd), erfundene
  Features, neue Gesten ohne Gewinn. Bezahlung/Wachstum → Gerüst in `monetarisierung/`.
- Wichtige Korrektur beim Token-Stand: **Gold ist als Aktionsfarbe raus** (seit
  Design-Stand 3.1.0), Akzent ist **Creme `#f5f3ec` auf Fast-Schwarz**. Der Prompt
  führt die echten aktuellen Token, damit Claude Design nicht goldlastig gegen den
  eigenen Code gestaltet.

**Offen:**
- `KONZEPT.md` §7 steht formal noch auf „App-Funktionen nicht anfassen". Es wird
  **nicht** eigenmächtig umgeschrieben — die Lockerung gilt nur für diesen Strang und
  steht als offene Frage in `plan/PLAN.md`. Falls der Betreiber sie dauerhaft will,
  muss er §7 selbst anpassen.
- Lehre aus dem ersten Handoff (Ladebildschirm, v3.0.44/45): ein Komplett-`app.js`
  hätte ungefragt Sprachumschalter + Benachrichtigungen eingebaut und den
  9-Sekunden-Lade-Hinweis stumm entfernt. Übernahme deshalb künftig **nur selektiv**,
  Block für Block, mit Diff. Steht als feste Regel in `ANLEITUNG.md` und im Prompt.

**Nächster Schritt:**
Betreiber gestaltet mit `CLAUDE-DESIGN-PROMPT.md` in Claude Design und gibt den
Handoff (ZIP) zurück. Dann: diffen, selektiv übernehmen, Altes ablösen,
Veröffentlichungsliste, committen, pushen.
