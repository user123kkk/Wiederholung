# Adrabic

Karteikarten mit Wiederholung nach Stufen – für arabische Vokabeln und alles
andere, was sitzen soll. Läuft als PWA im Browser, funktioniert offline,
synchronisiert über Firebase.

Aktueller Arbeitsstand: [`plan/STAND.md`](plan/STAND.md). Dauerregeln: [`CLAUDE.md`](CLAUDE.md).

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Gerüst, Kopfdaten, und das eine Skript, das **vor** dem ersten Bild laufen muss (Hell/Dunkel) |
| `styles.css` | Die gesamte Gestaltung. Aufgebaut in 18 nummerierten Abschnitten, Tokens zuerst |
| `app.js` | Die gesamte Funktionalität: Lernlogik, Firebase, Anzeige |
| `sw.js` | Service Worker. Speichert die App-Hülle, damit sie offline startet |
| `manifest.json` | Installierbarkeit als App |
| `desktop-icon.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | Aktuelle App-Symbole |
| `firestore.rules` | Zugriffsregeln der Datenbank |
| `impressum.html`, `datenschutzerklaerung.html` | Rechtstexte, ohne Anmeldung erreichbar (Phase 5) |
| `veroeffentlichen.bat` | Für den Betreiber (Windows): Doppelklick holt `origin/main`, prüft und veröffentlicht dessen separate Kopie auf Firebase Hosting. Lokale Entwürfe bleiben erhalten. Wird selbst nicht ausgeliefert (siehe `firebase.json`) |
| `CHANGELOG.md` | Was sich wann geändert hat – und warum |

Kein Build-Schritt. Die Dateien werden so ausgeliefert, wie sie hier liegen.

**Veröffentlichen am PC:** `veroeffentlichen.bat` startet
`plan/werkzeuge/veroeffentlichen.ps1`. Git, Node.js und Firebase-CLI müssen
installiert sein. Der Knopf veröffentlicht ausschließlich den frisch geholten
Commit auf `origin/main`, zeigt Version/Commit und prüft vor dem Upload
Versionen, Syntax, CSP und Startdateien. Lokale Änderungen, untracked Dateien
und noch nicht gepushte Commits werden nicht hochgeladen; kein `pull`,
`checkout`, `stash` oder Reset im Arbeitsordner. Ein Fetch-/Prüffehler stoppt
vor dem Upload. Firestore-Regeln werden weiterhin separat veröffentlicht.
Mit `veroeffentlichen.bat -NurPruefen` lässt sich derselbe Ablauf ohne Deploy
prüfen. Regression ohne echten Deploy:
`node plan/werkzeuge/veroeffentlichen_test.cjs` (Windows).

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
siehe `plan/archiv/phase-4-domain-hosting/LOGBUCH.md` – dort auch ein
dokumentierter Fund vom 12.09.2026: der zunächst unbeschränkte Key wurde
tatsächlich von Dritten für fremde Maps-Anfragen missbraucht, seit der
Einschränkung nicht mehr). Ein echtes Geheimnis (z. B. ein Firebase-Admin-
Service-Account-Schlüssel) gehört **nicht** hierher – aber dieses Projekt
hat keinen Server, der so einen Schlüssel bräuchte.

## Bei jeder Veröffentlichung

1. `APP_VERSION` in `app.js` hochzählen.
2. **Denselben Wert** als `CACHE_NAME` in `sw.js` eintragen. Ohne das behalten
   Nutzer:innen die alten Dateien im Cache.
3. **Denselben Wert** auch in **beide** Versions-Querys in `index.html`
   eintragen: `<script src="./app.js?v=…">` **und**
   `<link rel="stylesheet" href="./styles.css?v=…">`. Ohne das bleibt die
   betroffene Datei bis zu eine Stunde lang im normalen HTTP-Cache des Browsers
   hängen (`Cache-Control: max-age=3600` in `firebase.json` – die Regel gilt
   für `.js` **und** `.css`) – selbst ein normaler Reload holt dann noch die
   alte Datei, weil nur `index.html` selbst immer frisch geladen wird, nicht
   das, was sie einbindet. Gefunden 18.09.2026: ein Syntaxfehler in `app.js`
   blieb dadurch bis zu einer Stunde lang live, obwohl der Server längst die
   reparierte Version auslieferte. Für `styles.css` fehlte die Query bis
   24.09.2026 (v3.11.0) ganz – dieselbe Falle, nur für die Gestaltung.
4. Neue Dateien, die zum Starten gebraucht werden, in `APP_SHELL` in `sw.js`
   aufnehmen. `app.js` und `styles.css` stehen dort seit 3.11.0 **mit**
   Versions-Query (`"./app.js?v=" + VERSION`), weil `caches.match()` die
   komplette URL samt Query vergleicht: ohne Query traf der vorab gespeicherte
   Eintrag nie die Anfrage, die `index.html` wirklich stellt. `VERSION` leitet
   sich in `sw.js` aus `CACHE_NAME` ab – dort ist also nichts extra zu ändern.
5. Eintrag in `CHANGELOG.md`.

### Startbilder (seit 3.13.0)

`/splash/*.png` sind Fotos des Ladebildschirms (`.boot` in `index.html`,
dunkel, erstes Bild) in jeder Pixelgröße, die iOS als
`apple-touch-startup-image` erwartet. Nur mit ihnen zeigt eine Web-App auf dem
iPhone-Home-Bildschirm beim Antippen **sofort** etwas – ohne sie bleibt der
Bildschirm bis zum ersten Zeichnen leer. **Wer `.boot` (Markup in `index.html`
und `bootBild()` in `app.js`, Stil in `styles.css`) ändert, erzeugt die Bilder
neu:** `plan/werkzeuge/startbilder.js` (Anleitung oben in der Datei). Sie
stehen bewusst nicht in `APP_SHELL`. Nach neuen Bildern auch die Version in
allen `apple-touch-startup-image`-URLs ändern: Hosting cacht PNGs sieben Tage;
der Generator schreibt die aktuelle `APP_VERSION` als Query in seine Linkliste.

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

**Historische Stilprobe:** plan/archiv/redesign-oberflaeche/stilprobe.html
bewahrt die damalige Bausteinübersicht mit erfundenem Inhalt. Sie verwendet
die aktuelle styles.css und wird nicht ausgeliefert; ihr älteres Markup
ersetzt keine Abnahme der aktuellen App im Prüfstand.

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
