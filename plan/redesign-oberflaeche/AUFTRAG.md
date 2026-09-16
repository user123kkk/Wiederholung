# Auftrag: Oberfläche & Mobile-Gestalt

**Status:** läuft (Design-Phase, noch kein Code)
**Angelegt:** 16. September 2026
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

## Vorgehen (Strategie vor Code, wie bei `landing-page-strategie`)

1. **`PRINZIPIEN.md`** hält fest, welcher Video-Ratschlag auf **diese** App passt und
   welcher nicht — mit Begründung. Das ist der Filter, kein Katalog zum Abarbeiten.
2. **`CLAUDE-DESIGN-PROMPT.md`** ist der fertige Prompt für Claude Design. Der
   Betreiber gestaltet damit im Design-Werkzeug (Ablauf: `ANLEITUNG.md`).
3. Der Betreiber schickt den Handoff (ZIP) zurück. Claude Code **übernimmt selektiv**
   — klar benannte Blöcke, keine stillen Zusatz-Features, keine entfernten Funktionen
   ohne Vermerk (Lehre aus dem ersten Handoff, siehe `LOGBUCH.md`).
4. Übernahme nach der Veröffentlichungsliste (`README.md`): `APP_VERSION` +
   `CACHE_NAME` hoch, neue Startdateien in `APP_SHELL`, `CHANGELOG.md`.

## Fertig, wenn

- App und `landing.html` teilen **eine** sichtbare Sprache (Token, Typo, Abstände,
  Übergänge), auf dem Handy geprüft.
- Erststart und Kein-Treffer haben bewusste leere Zustände.
- Kein Bruch an der Lernlogik; keine unbelegte Funktionsänderung.
- Jede übernommene Design-Entscheidung steht im `LOGBUCH.md` mit Grund.
