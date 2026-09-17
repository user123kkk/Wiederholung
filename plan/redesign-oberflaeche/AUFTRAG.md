# Auftrag: Oberfläche & Mobile-Gestalt

**Status:** läuft — Block 1 `fertig` (v3.1.0), Block 2 ist als Nächstes dran
**Angelegt:** 16. September 2026 · **Neu gefasst:** 17. September 2026
**Grundlage:** die drei Videos des Betreibers (Mobile-UI, Wachstum,
UX-Psychologie), gefiltert in [`PRINZIPIEN.md`](PRINZIPIEN.md).

---

## Warum dieser Auftrag am 17.09. neu gefasst wurde

Die Fassung vom 16.09. endete mit „kein Neubau nötig". Das war formal richtig
und praktisch falsch, und der Grund dafür steht in der `styles.css` selbst:

Ihr Kopf führte drei Sätze, die **der Code seit Langem nicht mehr befolgte**.
Satz 1 erklärte Gold zur Handlungsfarbe, obwohl Gold seit Design-Stand 3.1.0
raus ist. Satz 2 verbot Kästen, obwohl `.card` an 19 Stellen in `app.js` stand
und `.panel` an zweien. Wer diese Sätze als Maßstab nimmt, misst die App an
einer App, die es nicht gibt — und kommt jedes Mal zum Ergebnis „passt schon".
**Das war das Verbot, an dem der Strang hing.** Der Betreiber hat es am
17.09. aufgehoben („Ich erlaube dir fürs erste alles, sicherheitshalber machen
wir reset").

Daraus die Regel für alles Weitere: **Wenn ein Befund lautet „ist schon da",
muss er belegt sein — an der Datei, an der Zeile, am Messwert.** „Deckt
`PRINZIPIEN.md` ab" ohne Zahl ist kein Befund.

## Worum es geht

Die App ist funktional fertig (Phasen 0–9 durch). Was fehlt, ist eine bewusste,
durchgehende **mobile Gestalt** — Aussehen und Bedienung aus einem Guss statt
gewachsen. Dieser Strang gestaltet die **Außenseite** neu: die App-Oberfläche
und die öffentliche Startseite `landing.html`.

## Umfang — was drin ist, was nicht

Der Betreiber hat `KONZEPT.md` §7 („keine Funktionen anfassen") für diesen
Strang gelockert (16.09.) und am 17.09. zusätzlich den Regel-Reset freigegeben.

**Drin:** Farbtoken, Schriftskala, Abstände, Flächen, Navigation, Übergänge
(`@keyframes`), Bottom-Sheets, leere Zustände, Onboarding-Fluss, `landing.html`.
Auch: die Gestaltungsregeln selbst umschreiben, wenn sie nicht mehr stimmen.

**Nicht drin (harte Grenze, auch bei „vollem Umbau"):**
- Die **Lernlogik** bleibt unangetastet: Wiederholungs-Algorithmus, Fälligkeit,
  Serie/Streak, Kulanzregel, Datenmodell, Firestore-Zugriff. Wir gestalten die
  Hülle, nicht das Uhrwerk.
- Nichts wieder einbauen, was bewusst entfernt wurde (`KONZEPT.md` §3).
- Keine erfundenen Features aus den Videos (Kalender, Aufgaben, Vorlagen).
  Die App ist ein Karteikarten-Werkzeug, kein Notion-Klon.
- Keine Dark-Patterns (Verlustaversion, Countdown) — siehe `PRINZIPIEN.md`.

## Die Blöcke

Ein Block = ein sichtbarer Zwischenstand = eine Veröffentlichung. Nach jedem
Block: Veröffentlichungsliste (`README.md`), Logbuch-Eintrag, `PLAN.md`
nachziehen, committen, pushen. Nicht zwei Blöcke auf einmal.

| # | Block | Status | Was darin steckt |
|---|---|---|---|
| 1 | **Fundament** | `fertig` (v3.1.0) | Vier Sätze statt drei · Schriftskala `--fs-*`, Wurzel 17px · Satz 2 als CSS durchgesetzt · Trefferflächen · Stilprobe-Seite |
| 2 | **Startbildschirm** | `offen` — als Nächstes | Der Bildschirm, den man täglich sieht. Gegen Video 1 prüfen: eine Scroll-Richtung pro Abschnitt, ein Ding pro Bildschirm, wo läuft die App in zwei Richtungen zugleich |
| 3 | **Bühne & Bewertung** | `offen` | Abfrage-Ansicht: Daumenreichweite, Übergänge zwischen Karten, Rückmeldung nach dem Bewerten |
| 4 | **`landing.html`** | `offen` | Mobil-first schärfen auf Grundlage von [`../landing-page-strategie/STRATEGIE.md`](../landing-page-strategie/STRATEGIE.md); Reziprozität und Goal-Gradient aus Video 3 |
| 5 | **Erststart** | `offen` | Der Weg von „Konto angelegt" bis zur ersten eigenen Karte. Nie bei 0 % anfangen (Video 3), aber **kein** erfundener Assistent |

## Wie geprüft wird

`plan/redesign-oberflaeche/stilprobe.html` zeigt alle Bausteine aus
`styles.css` ohne Anmeldung — die echte App kommt ohne Firebase nicht über den
Ladebildschirm hinaus, ein Agent gestaltet sonst blind. Öffnen mit
`python3 -m http.server` im Wurzelverzeichnis, dann
`/plan/redesign-oberflaeche/stilprobe.html`.

Die Probe definiert **selbst keine Farben, Größen oder Abstände**. Was dort
hässlich aussieht, wird in `styles.css` geändert, nicht in der Probe — sonst
lügt sie. Neue Bausteine gehören dort ergänzt, sobald es sie gibt.

## Fertig, wenn

- Alle fünf Blöcke durch, jeder mit eigenem Logbuch-Eintrag und Begründung.
- App und `landing.html` teilen **eine** sichtbare Sprache, am Handy geprüft.
- Kein Bruch an der Lernlogik; keine unbelegte Funktionsänderung.
