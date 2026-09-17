# Wiederholung

Karteikarten mit Wiederholung nach Stufen – für arabische Vokabeln und alles
andere, was sitzen soll. Läuft als PWA im Browser, funktioniert offline,
synchronisiert über Firebase.

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Gerüst, Kopfdaten, und das eine Skript, das **vor** dem ersten Bild laufen muss (Hell/Dunkel) |
| `styles.css` | Die gesamte Gestaltung. Aufgebaut in 18 nummerierten Abschnitten, Tokens zuerst |
| `app.js` | Die gesamte Funktionalität: Lernlogik, Firebase, Anzeige |
| `sw.js` | Service Worker. Speichert die App-Hülle, damit sie offline startet |
| `manifest.json` | Installierbarkeit als App |
| `icon.svg` | App-Symbol (Browser-Tab, Startbildschirm) |
| `firestore.rules` | Zugriffsregeln der Datenbank |
| `impressum.html`, `datenschutzerklaerung.html` | Rechtstexte, ohne Anmeldung erreichbar (Phase 5) |
| `veroeffentlichen.bat` | Für den Betreiber (Windows): Doppelklick zieht `main`, deployt auf Firebase Hosting. Wird selbst nicht mit ausgeliefert (siehe `firebase.json`) |
| `CHANGELOG.md` | Was sich wann geändert hat – und warum |

Kein Build-Schritt. Die Dateien werden so ausgeliefert, wie sie hier liegen.

## Bei jeder Veröffentlichung

1. `APP_VERSION` in `app.js` hochzählen.
2. **Denselben Wert** als `CACHE_NAME` in `sw.js` eintragen. Ohne das behalten
   Nutzer:innen die alten Dateien im Cache.
3. Neue Dateien, die zum Starten gebraucht werden, in `APP_SHELL` in `sw.js`
   aufnehmen.
4. Eintrag in `CHANGELOG.md`.

## Wenn du an der Gestaltung arbeitest

Die `styles.css` beginnt mit vier Sätzen, aus denen sich alles Weitere ergibt
(neu gesetzt am 17.09.2026 — die alten drei stimmten nicht mehr mit dem Code
überein):

1. **Eine Handlung pro Bildschirm.** Genau eine gefüllte Akzentfläche (Creme
   auf Fast-Schwarz). Alles andere trägt den Akzent nur als Schrift, Rand oder
   Schleier.
2. **Eine Fläche darf gruppieren – aber nie eine Fläche in einer Fläche.**
   Am Handy ist die Fläche das Gruppierungsmittel; Weißraum gibt es dort nicht
   genug. Die Grenze ist Polsterung auf Polsterung. `styles.css` setzt das
   selbst durch: eine `.card` in einer `.card` verliert automatisch Fläche,
   Rahmen und Polsterung.
3. **Die Schrift schrumpft am Handy nicht.** Wurzel 17px, Größen kommen aus
   `--fs-micro … --fs-2xl`, nichts Lesbares unter `--fs-xs`, Trefferflächen
   mindestens `--tap`. Keine neue Größe erfinden – wer eine braucht, die es
   nicht gibt, hat meist die falsche Rolle gewählt.
4. **Bedienung ist Systemschrift, Stoff ist Serifenschrift.**

Drei Dinge, die leicht zu übersehen sind:

- **Eintrittsbewegungen müssen `@keyframes` sein, keine Transitions.**
  `render()` ersetzt den kompletten Inhalt von `#app`; auf frisch eingefügten
  Elementen laufen Transitions nicht.
- **Ob die Navigation unten oder links steht, entscheidet allein Abschnitt 17
  der `styles.css`.** Das Markup ist in beiden Fällen dasselbe.
- **Die Abstände (`--space-*`) sind absichtlich px, nicht rem.** Sie sollen
  sich nicht mitvergrößern, wenn jemand die Schrift größer stellt – sonst wird
  aus einer größeren Schrift eine leerere Seite.

**Ansehen, ohne sich anzumelden:** `plan/redesign-oberflaeche/stilprobe.html`
zeigt alle Bausteine aus `styles.css` nebeneinander mit erfundenem Inhalt.
Die Datei wird nicht ausgeliefert (steht nicht in `APP_SHELL`) und definiert
selbst keine Farben oder Größen – was dort hässlich aussieht, wird in
`styles.css` geändert, nicht dort.

## Wenn du am Markup arbeitest

`app.js` hat **einen** delegierten Klick-Listener über `data-action`. Markup und
Klassen sind frei austauschbar, solange erhalten bleibt:

- die `data-action`-Werte und ihre `data-*`-Nutzlast am selben Element
- die Kennungen, die JavaScript direkt liest (`f-wort`, `f-search`,
  `karten-liste`, `hw-canvas`, `dlg-input` …)
- die Klassen, die als Haken dienen und nicht nur der Gestaltung:
  `.card-row` `.set-block` `.set-cards` `.drag-handle` `.lern-karte`
  `.ist-gelernt` `.drill-set-check` `.grade-row` `.study-answer` `.hw-toolbar`
- die Ausschlussliste im Body-Klick (Übungsmodus): Ein neues anklickbares
  Element auf der Bühne muss `button`, `a`, `input`, `select`, `textarea`,
  `canvas` sein oder in `.hw-toolbar` / `.modebar` liegen – sonst löst ein Tipp
  darauf versehentlich „weiter" aus.
