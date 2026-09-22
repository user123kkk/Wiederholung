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

**Deshalb auch bewusst kein `.env`.** `firebaseConfig` (u. a. `apiKey`) steht
offen in `app.js` – das ist bei Firebase-Web-Apps so vorgesehen, kein
übersehenes Geheimnis: Ohne Build-Schritt landet jeder Wert aus einer
`.env`-Datei ohnehin unverändert im an den Browser ausgelieferten `app.js`
(view-source zeigt ihn genauso). Eine `.env` würde hier also nichts
verstecken, nur eine zweite Datei erfinden, die genauso öffentlich wirkt.
Der eigentliche Schutz liegt an zwei anderen Stellen: `firestore.rules`
(wer welche Daten lesen/schreiben darf – s. u.) und die
Website-Einschränkung des Browser-Keys in der Google-Cloud-Konsole
(nur `adrabic.web.app`/`lernkarte-925c2.web.app` dürfen den Key benutzen,
siehe `plan/phase-4-domain-hosting/LOGBUCH.md` – dort auch ein
dokumentierter Fund vom 12.09.2026: der zunächst unbeschränkte Key wurde
tatsächlich von Dritten für fremde Maps-Anfragen missbraucht, seit der
Einschränkung nicht mehr). Ein echtes Geheimnis (z. B. ein Firebase-Admin-
Service-Account-Schlüssel) gehört **nicht** hierher – aber dieses Projekt
hat keinen Server, der so einen Schlüssel bräuchte.

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
