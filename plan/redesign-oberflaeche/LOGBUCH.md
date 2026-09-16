# Logbuch: Oberfläche & Mobile-Gestalt

Letzter Eintrag zuerst.

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
