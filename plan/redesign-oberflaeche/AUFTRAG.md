# Auftrag: Oberfläche & Mobile-Gestalt

**Status:** alle sechs Blöcke `fertig` (v3.1.0–3.3.2). Strang ruht, bis der Betreiber eine konkrete Schwachstelle nennt.
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
| 2 | **Einstellungen & Fortschritt** | `fertig` (v3.2.0) | Beide waren Stapel aus sechs bzw. neun Blöcken. Jetzt Listen mit Stand rechts; Erklärungen im Blatt oder auf einer Unterseite. `.stat-block` ist eine Fläche. Neu: `probelauf.mjs` |
| 3 | **Bühne & Bewertung** | `fertig` (v3.2.1–3.2.2) | Mittigkeit ab 900px (war 120px versetzt) · Zähler „Karte 1 von 11" · gleiche Knopfzeile · eigener Übergang für Kartenwechsel statt Blende über allem. Gesten bewusst nicht angefasst (`PRINZIPIEN.md`) |
| 4 | **`landing.html`** | `fertig` (v3.2.3) | Schriftgrößen und Radien auf die Token der App · Schlagzeile und Titel in der Serifenschrift · Hauptknopf wie App-Knöpfe · Stufenleiter von Kachelraster auf eine Spalte mit Balken · fehlender Fokusrahmen im Kontaktformular behoben |
| 5 | **Erststart** | `fertig` (v3.3.2) | Registrierung und E-Mail-Bestätigung als „Schritt 1/2 von 2" gerahmt (`.eyebrow`, kein neues Bauteil) · Versprechen von `landing.html` auf der Bestätigungsseite eingelöst · `.empty__icon.gold` → `.betont` |
| 6 | **Video-1-Nachlese** | `fertig` (v3.3.0–3.3.1) | Zwei Punkte, die Video 1 wörtlich nennt und die auf jedem Bildschirm sichtbar sind: die Navigationsleiste schwebt · das Karten-Formular ist ein Blatt statt einer festen Abteilung auf dem Verwalten-Bildschirm |

## Wie geprüft wird

**Zwei Werkzeuge, beide unter `plan/`, beide nicht ausgeliefert.** Ohne sie ist
die App für einen Agenten unsichtbar: `index.html` lädt Firebase von
`gstatic.com`, und wo das gesperrt ist, kommt man nie über „Start
fehlgeschlagen" hinaus.

1. **`probelauf.mjs`** — das wichtigere. Legt Attrappen für die drei
   Firebase-Module unter und lichtet zehn Bildschirme der **echten** App ab.
   Misst zusätzlich an jedem Bildschirm den Platz unter dem letzten Element
   gegen die Höhe der Navigationsleiste. Aufruf im Wurzelverzeichnis:
   `python3 -m http.server 8099 &` und `node plan/redesign-oberflaeche/probelauf.mjs`.
   Bilder landen in `.probelauf/` (nicht eingecheckt). **Vor und nach jeder
   Gestaltungsänderung laufen lassen.**
2. **`stilprobe.html`** — die Bausteine einzeln nebeneinander, gut für
   Token, Schriftleiter und Knopf-Stufen. Öffnen über denselben Server unter
   `/plan/redesign-oberflaeche/stilprobe.html`.

Die Probe definiert **selbst keine Farben, Größen oder Abstände**. Was dort
hässlich aussieht, wird in `styles.css` geändert, nicht in der Probe — sonst
lügt sie. Neue Bausteine gehören dort ergänzt, sobald es sie gibt.

## Fertig, wenn

- Alle fünf Blöcke durch, jeder mit eigenem Logbuch-Eintrag und Begründung.
- App und `landing.html` teilen **eine** sichtbare Sprache, am Handy geprüft.
- Kein Bruch an der Lernlogik; keine unbelegte Funktionsänderung.
