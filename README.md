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
3. **Denselben Wert** auch im Versions-Query von `<script src="./app.js?v=…">`
   in `index.html` eintragen. Ohne das bleibt `app.js` bis zu eine Stunde lang
   im normalen HTTP-Cache des Browsers hängen (`Cache-Control: max-age=3600`
   in `firebase.json`) – selbst ein normaler Reload holt dann noch die alte
   Datei, weil nur `index.html` selbst immer frisch geladen wird, nicht die
   Skripte, die sie einbindet. Gefunden 18.09.2026: ein Syntaxfehler in
   `app.js` blieb dadurch bis zu einer Stunde lang live, obwohl der Server
   längst die reparierte Version auslieferte.
4. Neue Dateien, die zum Starten gebraucht werden, in `APP_SHELL` in `sw.js`
   aufnehmen.
5. Eintrag in `CHANGELOG.md`.

## Wenn du an der Gestaltung arbeitest

Seit 4.0.0 (22.09.2026) gilt ein neues Gerüst. Vorbild sind die Apple Human
Interface Guidelines, die Farbwelt kommt aus dem Symbol: **Elfenbein-Lotus auf
Schwarz**. Die Regeln stehen oben in `styles.css`, hier die Kurzfassung:

1. **Eine Schrift** – die Systemschrift (SF auf Apple, Segoe auf Windows).
   Arabisch hat seine eigene. Keine Serifen, keine Verlaufsschrift.
2. **Einfarbig wie das Symbol.** Dunkel (Voreinstellung) = Elfenbein auf
   Schwarz, hell = schwarze Tinte auf warmem Papier. Gefüllt heißt „die
   Handlung", halbfetter Text in voller Farbe heißt „antippbar". Grün/Rot/Orange
   nur für Zustände (gewusst, nicht gewusst, Warnung).
3. **Flächen statt Effekte.** Grauer Grund, Gruppen als Flächen, Zeilen darin
   mit eingerückter Haarlinie (iOS „inset grouped"). Kein Schein, kein Glanz,
   keine Schatten auf Karten.
4. **Radien:** 10px Bedienelemente, 12px Gruppen, 14px Blätter. Vollrund nur
   für kleine Plaketten und runde Symbolknöpfe.
5. **Größen nur aus den Tokens** (`--fs-*`, `--space-*`). Trefferfläche ≥ 44px.
6. **Bewegung** kurz und weich, ohne Hüpfen: `--ease-sheet` (die iOS-Blattkurve)
   für Seitenwechsel und Blätter, `--ease-spring` nur für kleine Bestätigungen.

Drei Dinge, die leicht zu übersehen sind:

- **Eintrittsbewegungen müssen `@keyframes` sein, keine Transitions.**
  `render()` ersetzt den kompletten Inhalt von `#app`; auf frisch eingefügten
  Elementen laufen Transitions nicht.
- **Ob die Navigation unten oder links steht, entscheidet allein der letzte
  Abschnitt der `styles.css`** (ab 900px Seitenleiste). Das Markup ist dasselbe.
- **Farben nur über die Tokens in Abschnitt 1.** Wer eine Farbe ändern will,
  ändert sie dort – einmal für hell (`:root`), einmal für dunkel
  (`:root[data-thema="dunkel"]`).

**Ansehen ohne Anmeldung:** `plan/redesign-oberflaeche/probelauf.mjs` startet die
echte App mit erfundenen Daten.

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
