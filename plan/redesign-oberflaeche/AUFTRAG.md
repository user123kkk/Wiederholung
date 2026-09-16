# Auftrag: Oberfläche & Mobile-Gestalt

**Status:** läuft — Code direkt, **kein** Umweg über Claude Design
**Angelegt:** 16. September 2026 · **Entscheidung 16.09.2026:** Design-Tool
übersprungen, direkt in diesem Repo umgesetzt.
**Grundlage:** die drei Videos des Betreibers (Mobile-UI, Wachstum, UX-Psychologie),
gefiltert gegen `KONZEPT.md` §7 und die bestehende Gestalt der App.

## Worum es geht

Die App ist funktional fertig (Phasen 0–9 durch). Was fehlt, ist eine bewusste,
durchgehende **mobile Gestalt** — Aussehen und Bedienung aus einem Guss statt
gewachsen. Dieser Strang gestaltet die **Außenseite** neu:

- die **App-Oberfläche** (Farben, Typo, Abstände, Karten-Optik, Navigations-Look,
  leere Zustände, Übergänge)
- die **öffentliche Startseite** `landing.html`, mobil-first und geschärft nach den
  Conversion-Prinzipien aus Video 3 — aufbauend auf der schon vorhandenen
  [`../landing-page-strategie/STRATEGIE.md`](../landing-page-strategie/STRATEGIE.md),
  nicht daran vorbei.

## Umfang — was drin ist, was nicht (Betreiber-Entscheidung 16.09.2026)

`KONZEPT.md` §7 sagt: „Keine Funktionen des Tools anfassen." Der Betreiber hat
diese Grenze für diesen Strang **bewusst gelockert** (siehe offene Frage in
`plan/PLAN.md`): Aussehen der App **und** Startseite dürfen neu, und auch die
**Bedienung/Navigation** darf angefasst werden — **solange** es zur bestehenden,
ruhigen Gestalt passt und **kein generischer KI-Template-Look** entsteht.

**Drin:**
- Sichtbare Gestalt: Farbtoken, Typo-Skala, Abstände, Karten, Übergänge (`@keyframes`).
- Bedienung/Navigation: Bottom-Navigation, Bottom-Sheets, Gesten, Seitenaufteilung —
  aber nur, wo sie die App **besser** machen, nicht als Selbstzweck.
- Leere Zustände (Erststart, Kein-Treffer), Onboarding-Fluss.
- `landing.html` mobil-first.

**Nicht drin (harte Grenze, auch bei „vollem Umbau"):**
- Die **Lernlogik** bleibt unangetastet: Wiederholungs-Algorithmus, Fälligkeit,
  Serie/Streak, Kulanzregel, Datenmodell, Firestore-Zugriff. Wir gestalten die
  **Hülle**, nicht das Uhrwerk.
- Nichts wieder einbauen, was bewusst entfernt wurde (`KONZEPT.md` §3, Code ist
  maßgeblich).
- Keine erfundenen Features aus den Videos (Kalender, Aufgaben, Notiz-Vorlagen o.ä.).
  Die App ist ein Karteikarten-Werkzeug, kein Notion-Klon.

## Vorgehen — direkt im Code (Design-Tool übersprungen)

`CLAUDE-DESIGN-PROMPT.md` und `ANLEITUNG.md` beschreiben den ursprünglich
vorgesehenen Weg über Claude Design — der Betreiber hat sich dagegen entschieden
(„würd am liebsten das unterlassen und direkt zum Plan gehen"). **Beide Dateien
bleiben als Referenz stehen** (der Prompt-Text listet die Design-Entscheidungen
sauber auf, nützlich als Checkliste), werden aber **nicht mehr ausgeführt**.

Stattdessen:

1. **`PRINZIPIEN.md`** ist weiter der Filter — was aus den drei Videos passt und
   was nicht, mit Begründung. Gilt unverändert.
2. **Direkt am Code arbeiten**, phasenweise, mit Zwischenständen statt einer
   Riesenänderung:
   - Zuerst **Token/Basis** (`styles.css` Abschnitt 1–3), falls sich seit der
     letzten Prüfung etwas verschoben hat — sonst überspringen.
   - Dann **Gerüst/Navigation** (App-Bar, Bottom-Nav/-Sheets falls sinnvoll).
   - Dann **leere Zustände** (Erststart, Kein-Treffer) und **Onboarding**.
   - Dann **`landing.html`** mobil-first, aufbauend auf `STRATEGIE.md`.
   - Nach jedem Block: **im Browser/Handy-Ansicht angesehen**, bevor der nächste
     beginnt — nicht blind alles auf einmal umbauen.
3. Nach jedem sichtbaren Zwischenstand: Veröffentlichungsliste (`README.md`) —
   `APP_VERSION` + `CACHE_NAME` hoch, neue Startdateien in `APP_SHELL`,
   `CHANGELOG.md`, Logbuch-Eintrag.

## Fertig, wenn

- App und `landing.html` teilen **eine** sichtbare Sprache (Token, Typo, Abstände,
  Übergänge), auf dem Handy geprüft.
- Erststart und Kein-Treffer haben bewusste leere Zustände.
- Kein Bruch an der Lernlogik; keine unbelegte Funktionsänderung.
- Jede übernommene Design-Entscheidung steht im `LOGBUCH.md` mit Grund.
