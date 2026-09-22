# Logbuch: Oberfläche & Mobile-Gestalt

Letzter Eintrag zuerst.

---

### 2026-09-22 — Sichtbarer Tiefe-Durchgang, Block 13 gebaut (v3.7.5)

**Anlass:** Rückmeldung des Betreibers auf Block 12: „sieht kam anders aus
matter of fact es sieht gleich aus irgendwie. schau mal was du alles tun
kann. sei es de schrift, fortschritt einstellung, verwalten, google
anmelden knopf alles." Zu Recht — Block 12 war eine reine Hover-Konsistenz-
Korrektur, am Bildschirm kaum zu sehen. Der Auftrag war damit nicht „mehr
vom selben", sondern: echte, sichtbare Veränderung liefern, an den konkret
genannten Stellen.

**Geändert (alles `styles.css`, außer wo vermerkt):**
- Neuer Token `--sheen` / `--sheen-strong`: weicher Lichtschein von oben,
  liegt zusätzlich zur Flächenfarbe (`background: var(--sheen), var(--surface)`)
  auf `.card`, `.liste`, `#karten-liste`, `.stat-block`, `.serie-karte`,
  `.lekt-kachel`. Dieselbe Tiefe, die Kopfzeile/Navigation/Sheets schon durch
  `backdrop-filter` haben, jetzt auch auf Flächen, die selbst im Hintergrund
  liegen (kein Weichzeichner ohne etwas dahinter Durchscheinendes).
- Der eine gefüllte Knopf pro Bildschirm (`button`, ohne `.secondary`/
  `.ghost`/`.linklike`/`.danger`) bekommt `box-shadow: inset 0 1px 0
  rgba(255,255,255,.5), 0 3px 10px rgba(0,0,0,.22)` — Lichtkante plus
  Schatten in der Akzentfarbe selbst. Beim Drücken abgeflacht. Die stillen
  Stufen bleiben bewusst flach (Satz 1: nur eine Handlung sticht hervor).
- Fortschritt: `.gross-zahl strong`, `.serie-zahl strong` (die großen
  Kennzahlen) mit `linear-gradient` + `background-clip:text` statt
  Flachfarbe — `color` bleibt als echter Rückfallwert stehen. `.heute-bar
  span` mit Verlauf statt Flachfarbe. Bewusst NICHT angefasst: `.stat-
  kennzahl .zahl` (kleinere Nebenzahlen, Gradient dort hätte den Effekt an
  den großen Zahlen verwässert) und `.lekt-bar`/`.stat-seg` (echte
  Zustandsfarben, keine Zier).
- Einstellungen: `.liste-zeile > .icon:first-child` bekommt eine eigene,
  gedämpfte Fläche (30×30px, `--surface-raised`, gerundet) statt nur eine
  Strichfarbe zu sein — ein Icon-Chip innerhalb der bestehenden Zeile, keine
  zweite Fläche im Sinne von Satz 2 (die Zeile selbst bleibt eine Zeile).
  `.aktiv`/`.gefahr` färben den Chip statt nur das Symbol.
- Google-Anmeldeknopf: lief bisher als `.secondary` mit, dieselbe Fläche wie
  „Abbrechen"/„Zurück". Jetzt `button[data-action="google-login"]` mit
  Googles eigenen Branding-Farben (weiße Fläche, `#3c4043`-Text,
  `#dadce0`-Rand — https://developers.google.com/identity/branding-guidelines,
  nicht selbst erfunden) — dadurch auch von selbst am dunklen Grund
  erkennbar. Selektor über `data-action`, kein Markup-Umbau. In `stilprobe.
  html` einen Baustein dafür ergänzt (gab es dort bisher nicht).
- Überschriften (`h1`–`h4`): Schriftschnitt 600 → 700. Bei der dünneren
  Serifenschrift wirkte 600 auf Handy-Größen eher hell als betont, kaum
  Abstand zum Fließtext.

**Geprüft:** `stilprobe.html` Zeile für Zeile durchgesehen, hell UND dunkel
(Umschalter oben rechts), Screenshots aller Abschnitte. Konsole ohne Fehler.
`button[data-action="google-login"]` per injiziertem Testelement plus echtem
Maus-Hover geprüft (Fläche bleibt weiß, Hover dunkelt nur minimal ab —
Googles eigene Vorgabe, kein Fehler).

**Entscheidung:** Alle Änderungen bleiben innerhalb der vier Sätze der
Gestaltung (keine neue Farbe außer Googles eigener Markenfarbe an genau
einer, fremdmarkierten Stelle; keine Fläche in einer Fläche; ein gefüllter
Knopf pro Bildschirm bleibt der einzige mit Lichtkante). Kein Eingriff in
Lernlogik — reine `styles.css`-Änderungen plus ein Selektor-Hook über
`data-action`, kein `app.js`-Umbau.

**Offen:** Betreiber-Test steht noch aus — reicht am Bildschirm (hell/dunkel
durchschalten, Fortschritt/Einstellungen/Verwalten ansehen, den Google-Knopf
im echten Anmeldebildschirm prüfen), kein Handytest nötig für diesen Block.
Der zurückgestellte Punkt aus Block 12 (Verwalten-Liste-Performance bei
vielen Karten) bleibt unverändert offen.

**Nächster Schritt:** Betreiber-Rückmeldung zu Block 13 abwarten. Trifft sie
den Ton, den der Betreiber wollte? Wenn nicht: genauer benennen, was noch
fehlt, statt erneut zu raten.

---

### 2026-09-22 — Eigene UX-Sichtung (kein Video) + Block 12 gebaut (v3.7.4)

**Anlass:** Betreiber-Auftrag im Chat: „verbessere mein adrabic bzw
wiederholungstool. design, animationen, liquid glass/andere coole sachen,
methoden wie hicks law und so, wirklich alles, in jedem tab, einstellung
unterteilung alles." Auf Nachfrage (Vorgehen einzeln in Blöcken wie bisher
vs. ein großer Durchlauf; wie weit „Liquid Glass" gehen soll) antwortete der
Betreiber: „mach was du willst, bitte nicht nur sachen die ich erwähnt habe,
alles was online besprochen wird über UI/UX, alles" — Vorgehen in Blöcken
bestätigt, Design-Entscheidung an den Agenten delegiert.

**Geprüft:** Da keine Video-Quelle vorlag, wurde die App stattdessen gegen
anerkannte UX-Gesetze (Hick, Fitts, Jakob, Miller, Doherty-Schwelle,
Peak-End-Regel, Ästhetik-Usability-Effekt) durchgesehen — live in
`stilprobe.html` (Bausteine, Farben, Bewegung) und im Code (`styles.css`
2611 Zeilen in 18 Abschnitten, `app.js` 8682 Zeilen). Einzelurteile mit
Beleg an Datei/Zeile in `PRINZIPIEN.md`, neuer Abschnitt „Eigene
UX-Sichtung 22.09.2026".

**Geändert:**
- `styles.css:1683 ff.` — `.card-row[data-action="card-detail"]` (Verwalten-
  Liste) bekommt einen `:hover`-Zustand, geschützt mit derselben
  `@media (hover: hover) and (pointer: fine)`-Absicherung wie jede andere
  klickbare Zeile der App.
- `index.html:116` — Versions-Abfrage von `app.js` war noch auf 3.7.2 stehen
  geblieben, obwohl `app.js`/`sw.js` schon bei 3.7.3 waren (Lücke aus der
  letzten Veröffentlichung, 2df2d22). Mitkorrigiert.
- `app.js:19`, `sw.js:10`, `index.html:116` → 3.7.4. `CHANGELOG.md` ergänzt.

**Entscheidung:** Die App ist nach elf vorherigen Blöcken bereits
ungewöhnlich durchgearbeitet — Hover-Absicherung, direktionale
Übergänge, Weichzeichner/Transparenz an Kopfzeile/Navigation/Sheets,
Feder-Einschwingen, reduzierte Bewegung, Gesten-Verlässlichkeit sind
längst vorhanden. Statt eine Liste künstlich aufzufüllen, wurde nur
gebaut, was durch einen echten Fund belegt war (Hover-Lücke in Verwalten).
Zwei weitere Punkte wurden geprüft und **bewusst nicht gebaut**, mit
Begründung in `PRINZIPIEN.md`: eine Zählanimation für große Kennzahlen
(reine Zier, hohes Risiko gegen die hart erarbeitete
„keine Animation auf unveränderten Ansichten"-Regel aus 3.6.13) und eine
flächendeckende „Liquid Glass"-Schicht auf Karten/Listen (widerspricht
Satz 2 der Gestaltungsregeln und der Linie „kein Kachel-Armaturenbrett" —
die App hat die Glas-Wirkung an Kopfzeile/Navigation/Sheets bereits, ohne
den Bruch mit der ruhigen Fläche).

**Offen:** Ein größerer, echter Fund (Renderkosten der Verwalten-Liste bei
vielen Karten, seit 3.6.13 bekannt) wurde bewusst **nicht** in Block 12
gepackt — zu hoher Streuschaden (Sortieren, Mehrfachauswahl, Suche hängen
an der heutigen DOM-Liste) für einen Nebenpunkt. Als möglicher Block 13 in
`AUFTRAG.md` vorgeschlagen, nicht begonnen, nicht freigegeben.
Betreiber-Test am Desktop (Maus-Hover in der Verwalten-Liste, Spalten-
Ansicht ab 900px) steht noch aus.

**Nächster Schritt:** Betreiber-Rückmeldung zu Block 12 abwarten (reicht am
Rechner, kein Handytest nötig). Danach entscheiden: weiter mit einem
selbst gefundenen Block 13/14 (siehe Vorschlag oben) oder auf neue
Beobachtungen/Wünsche warten.

---

### 2026-09-22 — Viertes Video geprüft (Bottom Navigation, uxpeak) + Block 11 gebaut (v3.7.3)

**Anlass:** Betreiber brachte ein YouTube-Video (uxpeak, „How to Design a Great
Bottom Mobile Navigation Bar", 23:45 Min.) mit dem Wunsch, die Ideen ins Tool
zu übernehmen. Transkript per Untertitel geladen, ~40 Bildschirmfotos aus dem
Video gegen den heutigen Stand von `navLeiste()` (`app.js:4942`) und der
`.nav`-Gestaltung (`styles.css:670` ff.) geprüft — Einzelurteile in
`PRINZIPIEN.md`, Abschnitt „Video 4".

**Geändert:** Nur `PRINZIPIEN.md` (neuer Abschnitt „Video 4 — Bottom
Navigation"). Kein Produktivcode angefasst.

**Entscheidung:** Von zwölf geprüften Punkten sind **elf schon umgesetzt** —
die heutige Navigationsleiste entstand aus **Video 1** desselben Strangs
(gleiches Thema, andere Quelle) und deckt sich fast eins zu eins: 3 Tabs,
schwebend über der sicheren Zone, ≥44px Trefferfläche, Aktiv-Zustand mit drei
statt geforderten zwei visuellen Änderungen, ein Icon-Stil außer im aktiven
Tab, kurze einzeilige Labels, Icon/Label-Größen im empfohlenen Bereich, ruhige
Ein-Akzent-Farbe, sichtbare Trennung per Rand/Schatten, Tipp-Rückmeldung per
Skalierung. Ein Punkt (Benachrichtigungspunkt ohne Zahl) ist eine **bewusste**
Abweichung von der Video-Empfehlung, keine Lücke — passt zur bestehenden
Linie gegen Zahlen-Dringlichkeit (Video 3, Verlustaversion).

**Zwei echte Fundstellen, eine davon zur Entscheidung vorgelegt:**
1. Kein gleitender Übergang der Pillenfläche beim Tab-Wechsel (bis dahin:
   Hart-Umschalten beim Neuaufbau). Betreiber-Entscheidung noch am selben
   Tag: **bauen** (Block 11).
2. Kein zentraler CTA-Knopf in der Leiste — bewusst **nicht** übernommen:
   die App hat schon einen Anlegen-Weg, ein vierter Nav-Knopf wäre ein
   erfundenes Bauteil ohne belegten Bedarf. Bleibt liegen.

**Block 11 — Gleit-Indikator beim Tab-Wechsel (v3.7.3):**

**Geändert:** `app.js`: `navLeiste()` (`app.js:4942` ff.) berechnet
`reiterIndex` aus `ui.tab` und vergleicht mit dem modul-weiten `letzterReiter`
— der Wert ist an dieser Stelle noch der VORHERIGE, weil `render()` ihn erst
nach dem Aufbau von `html` (der `navLeiste()` einschließt) aktualisiert; kein
neuer Zustand nötig. Ergebnis ist `data-glide="vor"`/`"zurueck"` am aktiven
`.nav__tab`. `styles.css`: zwei neue `@keyframes` (`nav-glide-vor`,
`nav-glide-zurueck`, 10px Versatz + Skalierung, analog zu `enter-vor`/
`enter-zurueck` aus 3.7.1, nur kleiner) plus zwei Regeln, die sie an
`.nav__tab.active[data-glide=…]` hängen. `APP_VERSION`/`CACHE_NAME` → 3.7.3,
`CHANGELOG.md`.

**Entscheidung:** Reine `@keyframes`-Lösung, keine `transition` — Abschnitt 3
in `styles.css` hält ausdrücklich fest, dass `render()` bei jedem Zeichnen
den kompletten Leisten-Inhalt neu einsetzt (`huelleBehalten()` behält nur die
äußere `.nav`-Hülle, nicht ihre Kinder) und Transitions auf frisch
eingefügten Elementen deshalb nicht laufen. Der bestehende `letzterReiter`
aus der Seitenwechsel-Logik wird nur *gelesen*, nicht verändert — kein
Duplikat-Zustand, keine Kollision mit der `data-richtung`-Logik am `#app`.

**Geprüft:** `node --check app.js` fehlerfrei. Der projekteigene
`probelauf.mjs` (Playwright) ließ sich in dieser Umgebung nicht starten
(„spawn UNKNOWN" beim Chromium-Start unter Git Bash/Windows — Infrastruktur-
Problem, nicht am Code) trotz frisch installiertem Chromium
(`npx playwright install chromium`) und korrektem `PROBE_CHROMIUM`-Pfad.
Ersatzweise über den eingebauten Browser gegen `python -m http.server 8099`
geprüft: Seite lädt, Anmeldeformular erscheint fehlerfrei, keine Konsolenfehler
aus `app.js`/`styles.css`. Die Leiste selbst (hinter der Anmeldung) **nicht**
am Bildschirm gesehen — dafür fehlt ein Firebase-Zugang in dieser Umgebung.

**Offen:** Gerätetest durch den Betreiber — Tab wechseln (alle drei
Richtungen: Lernen↔Fortschritt↔Verwalten) und sehen, dass die aktive Fläche
kurz aus der Wechselrichtung einschwingt statt hart umzuschalten; mit
„Bewegung reduzieren" (Systemeinstellung) darf nichts mehr gleiten.

**Nächster Schritt:** Betreiber prüft v3.7.3 am Handy, dann committen/pushen
(direkt auf `main`, ohne PR, wie in `CLAUDE.md` festgelegt).

---

### 2026-09-19 — „Cleaner fühlen": Verwalten, Wegwischen, Seitenwechsel (v3.7.1)

**Anlass:** Betreiber-Wunsch, die App ruhiger wirken zu lassen — Icons und Animationen, ausdrücklich auch Seitenwechsel und „wie bei iOS Fenster runterwischen". Nachgelesen: `BILDER-BEFUND.md` (Icons Bild 79–86 schon ✅, zu Animationen steht in den 108 Bildern und im Ideen-Backlog nichts) — die Änderungen kommen aus dem Ist-Zustand, nicht aus einem Video.

**Geändert:** `app.js`: Kartenzeile in `kartenListeInhalt()` ohne Stift/Mülleimer; `cardDetailSheet()` + Aktion `card-detail-loeschen`; Escape-Logik zu `schliesseObersteEbene()` herausgezogen, `blattWischen()` (Touch, ~115 Zeilen inkl. Kommentar); Richtung des Seitenwechsels in `render()` (`data-richtung` am `#app`, `letzteTiefe`/`letzterReiter`). `styles.css`: `enter-vor`/`enter-zurueck`, `#app[data-richtung]`, `#app{overflow-x:clip}`, `.dlg{overscroll-behavior:contain}`, `.dlg-nebenweg`, `button:active` 0,975, `.arab-ziffer` in Serie/„Dein Stoff" 1,5 rem gedämpft. Version 3.7.1.

**Entscheidung:**
- Stift/Mülleimer raus, Antippen der Zeile bleibt der Weg (gab es schon, Beobachtung 1). Löschen bekommt im Detail-Blatt einen leisen Knopf (kein `danger`: das ist laut Gestaltungsregel Bestätigungsdialogen vorbehalten). Bei Karten aus einem anderen Bereich (Suche „alle Bereiche") bleibt der Stift, weil dort kein Detail-Blatt öffnet.
- Wegwischen ist die eine neue Geste, die `PRINZIPIEN.md` sonst meidet: hier vom Betreiber ausdrücklich verlangt; deshalb eng gefasst (ein Finger, Blatt oben, nicht über Eingabefeldern, 10 px senkrecht, 90 px oder 0,55 px/ms). Kein Rand-Wischen zum Zurückgehen — das kollidiert mit dem Zurück-Wischen des Browsers.
- Seitenwechsel bewusst klein (20 px, halbe Deckkraft): größere Bewegung würde die Ruhe wieder zerstören.
- Die arabische Ziffer bleibt (Markenzeichen aus dem Trainer), nur in sinnvoller Größe. Im Probelauf zeigt die Schrift sie als Ziffer im Kreis (Vers-Zeichen der Schrift) — am Gerät gegenprüfen.

**Geprüft:** Playwright + CDP-Touch gegen die echte App: Richtung bei Reiter/Einstellungen/Unterseite hin und zurück, keine Querleiste, Blatt: 25 px federt zurück, 220 px und schnelle 70 px schließen, Wischen nach oben nichts, Detail-Blatt wegwischbar, Löschen fragt nach und löscht; 19 von 19. Lehrer-Durchlauf weiter 34 von 34. Probelauf ohne Konsolenfehler. **Nicht geprüft:** echtes iPhone (Gefühl des Wegwischens, iOS-Gummiband), Home-Bildschirm-App.

**Offen:** Betreiber-Test am Handy. Nicht gebaut: Dropdown-Sheets im Fehlermeldungs-Modal (`#errorModal`) wischen noch nicht weg (eigene Hülle); Austrittsbewegung beim normalen Schließen (Knopf/Escape) — Blätter verschwinden dort weiterhin ohne Ausfahren (Beobachtung 19).

**Nächster Schritt:** Rückmeldung des Betreibers vom Handy abwarten; danach ggf. Austrittsbewegung für Knopf/Escape.

### 2026-09-19 — Nav-Leiste: beim Öffnen zu hoch, beim Tabwechsel Springen (v3.6.14)

**Geändert:** `app.js` `syncViewportGap` (Zweig für `navigator.standalone` + Hochformat: `--ref-h` aus `screen.*`, Klasse `ref-hoehe`, `orientationchange`), `styles.css` (`html.ref-hoehe .nav { top: … }` unter 900 px), Version 3.6.14 in `app.js`/`sw.js`/`index.html`, `CHANGELOG.md`, Beobachtung 18 nachgetragen.

**Entscheidung:** Der „größter gemessener Wert"-Ansatz aus 3.6.6/3.6.7 war nur nach dem Besuch eines scrollbaren Tabs richtig und hinkte dem Neuzeichnen hinterher. Statt weiter aus `innerHeight` zu rechnen, wird in der iOS-App eine feste Größe benutzt und die Leiste von oben verankert – dann ist es egal, was `innerHeight` gerade meldet. Nicht angewandt außerhalb iOS-Standalone (Android meldet in `screen.height` Leisten mit, das wäre falsch) und nicht im Querformat.

**Offen:** Gerätetest am iPhone: Leiste beim Öffnen und in allen Tabs gleich, kein Springen beim Wechsel, Querformat. Im Probelauf nur mit Attrappe (`navigator.standalone`, `screen` 414×896) belegt.

**Nächster Schritt:** Betreiber prüft v3.6.14 in der Home-Bildschirm-App.

---

### 2026-09-19 — Gesamtprüfung „Reibungsfreiheit", Fixes (v3.6.13)

**Geändert:** `app.js` — Debug-Overlay und `debug-version-tap` entfernt, `localStorage debugNav` wird gelöscht; `syncViewportGap` (Breitenwechsel setzt zurück, Abweichung >100 px = echter Wechsel); toter Aufruf `teilLinkPruefenUndVerarbeiten` aus `datenZusammenbauen` entfernt, dort Vergleich vorher/nachher (kein `render()` bei unverändertem Stand); `renderMain` mit Ansicht-/Overlay-Schlüssel (Klassen `still-ansicht`/`still-overlay` auf `#app`), `huelleBehalten()` für `.appbar`/`.nav`, `syncAppbarKante()`, Klasse `blatt-offen` auf `<html>`, Fokus in neues Blatt; Toast ohne `render()` beim Ablauf, oben bei offenem Blatt; Escape schließt alle Blätter; `wischBewertung`-Sperre; `tabSchonAktiv()`; Auslaufen nach Griff-Scrollen (`scrollAuslaufen`); Randscrollen ignoriert Nav/Kopfzeile. `styles.css` — `enter-view`, Still-Regeln, `.toast-wrap--oben`, `html.blatt-offen`, neuer Abschnitt 19 (Trefferflächen). `sw.js` — 4-s-Zeitlimit für Netz zuerst, `CACHE_NAME` 3.6.13. `index.html` (`?v=`), `manifest.json`, alle vier HTML-Seiten (`theme-color`), `CHANGELOG.md`.

**Entscheidung:** Ursachen behoben statt Symptome: das Blinken kam nicht vom Nav-Fix, sondern von Eintrittsanimationen, die bei jedem Neuzeichnen liefen; der Nav-Fix machte es durch die erzwungene Höhenmessung nur auffälliger. Kopfzeile/Leiste bleiben als DOM-Element (Weichzeichner blitzt sonst auf iOS neu auf). Trefferflächen per unsichtbarem `::after`, damit sich kein Bild verschiebt. Der Seitenwechsel blendet aus 0,45 statt 0 Deckkraft ein (bewusst: alter Inhalt ist sofort weg).

**Offen:** Austrittsbewegung der Blätter und Fokus-Rückgabe; Renderkosten Verwalten (2356 Elemente bei 200 Karten); **Gerätetest am iPhone** (Tastatur bei Toast-Ablauf, Nav-Höhe 850 in allen Tabs, Ssheet + Tastatur). Im Probelauf (Playwright/Chromium mit Firebase-Attrappe) nachgemessen, siehe Beobachtung 19.

**Nächster Schritt:** Betreiber prüft v3.6.13 am Handy (Home-Bildschirm-App, einmal Querformat), meldet, was noch hakt.

---

### 2026-09-19 — Teilen per Code offline gesperrt (v3.6.12)

**Geändert:** `app.js` (Zeile ~5640–5655) zwei Buttons: `disabled` + `title="Zum Teilen brauchst du eine Verbindung"` wenn `offline`. `sw.js` `CACHE_NAME`, `index.html` `app.js?v=`, `CHANGELOG.md`, `APP_VERSION` → 3.6.12.

**Entscheidung:** Offline-Warnung aus v3.6.9 ist sichtbar, aber die Buttons „Code erzeugen" und „Teilen beenden" waren trotzdem aktiv und führten zu hängenden Promises (Firestore-Zugriff braucht Netz). Jetzt beide Buttons `disabled` mit Hinweis — verhindert verwirrende States. Der Datei-Export („Kartensatz zum Weitergeben") bleibt aktiv, der braucht kein Netz.

**Offen:** Gerätetest — Flugmodus aktivieren und prüfen, dass die Buttons grau sind.

**Nächster Schritt:** Onboarding vor Anmeldung (`index.html` zeigt Intro vor Login, nur beim allerersten Besuch).

---

### 2026-09-19 — Session: Stand dokumentiert, Ruhezustand bestätigt

**Geändert:** Dokumentation in `plan/PLAN.md` Statusverlauf aktualisiert. Kein Produktivcode geändert.

**Befund:** `git log` gegen den hier dokumentierten Stand geprüft. Alle Commits vom 19.09. (v3.6.9–v3.6.11) stammen aus der vorigen Session und sind bereits dokumentiert:
- v3.6.9: Offline-Zustand sichtbar gemacht
- v3.6.10: Leere Startzustände (Anlegen-Knopf direkt öffnen)
- v3.6.11: Leerer Lernen-Bildschirm (Hauptknopf umgekehrt — „Erste Karte anlegen" gefüllt)

Zusätzlich dokumentiert in `phase-1-datenzugriff/LOGBUCH.md` (19.09.): TikTok-Ideen 1, 3, 4, 8 sind nicht relevant; Serie damit abgeschlossen (5 Ideen gebaut/dokumentiert: Hick's Law, Offline, Empty State, Sicherheits-Checkliste, Firestore-Kosten; 3 nicht relevant).

**Entscheidung:** Kein neuer Codepunkt aktiv. Alles Offene hängt an Betreiber-Entscheidungen/Tests (Veröffentlichung, Flugmodus-Test für Offline, Teilen-Code-Sperre offline). Ruhezustand bleibt gültig.

**Offen:** Betreiber muss `veroeffentlichen.bat` durchziehen und am echten Handy prüfen (leerer Bereich mit drei Knöpfen).

**Nächster Schritt:** Betreiber: veröffentlichen und testen, danach neue Vorgaben oder Geräte-Befunde.

---

### 2026-09-19 — Leerer Lernen-Bildschirm: Hauptknopf umgekehrt, Code ergänzt (v3.6.11)

**Anlass:** Betreiber auf meine offene Frage im v3.6.10-Eintrag unten („welche Handlung ist die gefüllte?"): „denk hier gut nach". Ich hatte die Frage zurückgereicht, obwohl sich aus den Plandateien eine Antwort ableiten ließ.
**Geändert:** `app.js` `renderLernen()`, Zweig `cards.length === 0` (~5813–5848): kein gefüllter „Kartensatz einspielen" mehr, sondern gefüllt „Erste Karte anlegen" (`karte-neu`), `secondary` „Datei einspielen" (`import-trigger`), `ghost` „Code eingeben" (`code-einloesen-start`, bisher nur in Einstellungen → Einspielen, `~5670`). Text und Symbol angepasst. Version/Cache/`?v=` → 3.6.11, `CHANGELOG.md`.
**Herleitung (Belege, nicht Bauchgefühl):**
1. Die Zusage-Kette an einen Neuen: `landing.html:511–514` („Danach legst du direkt deine erste Karte an"), `landing.html:591ff` („erst mal leer … Dein Stoff, nicht unserer" = Fassung A), Bestätigungsseite `app.js` `renderPendingVerification` (v3.3.2, „Danach geht es gleich weiter zu deiner ersten Karte"). Der erste Bildschirm brach sie.
2. Der Import-vor-Anlegen-Entscheid (2.11.2) ist **älter** als Startseite (v3.0.20, 13.09.) und Code-Teilen (v3.6.x). Seine eigentliche Beschwerde — ein Datei-Empfänger las nur „tipp alles selbst" — bleibt behoben, weil Datei **und** Code als echte Knöpfe auf demselben Bildschirm stehen. Geändert ist nur, welcher gefüllt ist.
3. Wer einen **Code** bekam, fand vom ersten Bildschirm keinen Weg: der Text fragte nur nach einer Datei. Das war eine echte Lücke, unabhängig von der Hierarchiefrage.
4. Hick: drei Knöpfe sind kein Problem (1 gefüllt, 1 secondary, 1 ghost, Regel 2 erfüllt); das Problem war die **falsche** Gewichtung plus Sackgasse, nicht die Zahl.
**Gegenargument, bewusst abgewogen:** Es gibt keine Nutzungszahlen, welche Gruppe häufiger ankommt. Für die Neuen aus Videos/Startseite spricht die dokumentierte Zusage; für Datei-Empfänger spricht nur die alte, vor der Startseite getroffene Annahme. Bei einem Irrtum kostet es die Datei-/Code-Empfänger einen Tipp mehr auf einem ohnehin sichtbaren Knopf — der umgekehrte Irrtum kostete Neue eine Sackgasse. Rücknahme: eine Zeile, `git revert` dieses Commits.
**Nicht geändert:** Verwalten (leer), Fortschritt (leer), „Für heute durch" — siehe Tabelle im Eintrag unten. `landing.html` nicht angefasst (sie sagt bereits das Richtige).
**Offen:** Die alte Landingzeile 583 („eine Datei, ein Import, fertig") spricht vom Weitergeben per Datei; das Teilen läuft inzwischen auch per Code. Textfrage für die Startseite, nicht gebaut (Landing-Umbau ist laut `PLAN.md` an Betreiber-Entscheidungen gebunden). Echtgerät-Test und Veröffentlichung stehen aus.
**Nächster Schritt:** Betreiber: veröffentlichen, mit einem neuen leeren Bereich am Handy prüfen — drei Knöpfe sichtbar, „Erste Karte anlegen" gefüllt, „Code eingeben" öffnet die Eingabe. Danach nächste Idee.

---

### 2026-09-19 — Leere Startzustände (TikTok-Idee 5 von 8, v3.6.10)

**Geändert:** `app.js` — `renderLernen()` (leerer Bereich, Zeile ~5826) und `renderFortschritt()` (leer, ~6151): der Anlegen-Knopf trägt `data-action="karte-neu"` statt `tab-verwalten` (bei `istGefuehrt` bleibt der alte Weg). `APP_VERSION`/`CACHE_NAME`/`index.html`-`?v=` → 3.6.10, `CHANGELOG.md`.
**Bestand der leeren Zustände (geprüft, nicht angenommen):**
| Ort | Stand | Urteil |
|---|---|---|
| Lernen, Bereich ohne Karten (`5813`) | „Kartensatz einspielen" gefüllt, „Eigene Karten anlegen" ghost → schickte nach Verwalten | **geändert**: öffnet jetzt das Blatt, 1 Tipp statt 2 |
| Fortschritt ohne Karten (`6138`) | ein Knopf „Karten anlegen" → Verwalten | **geändert**, gleicher Grund |
| Verwalten, Bereich ohne Karten | ein gefüllter Knopf „Karte hinzufügen" + Hinweis „Noch keine Karten vorhanden." | passt — **Verdacht am Anfang war falsch:** die Box mit „Erste Karte anlegen" (`6916ff`) erscheint nur bei „alle Bereiche" ohne Treffer, nicht im leeren Bereich; es gibt keine doppelten Knöpfe |
| Verwalten, Suche ohne Treffer | „Suche leeren" + „In allen Bereichen suchen" | passt |
| „Für heute durch" (`5830`) | „Trotzdem üben" → Verwalten | nicht angefasst: Beschriftung und Ziel passen nicht ganz zusammen (man landet in Verwalten und muss dort „Üben" tippen), aber das berührt den Üben-Ablauf → nur vermerkt |
**Entscheidung:** Die Kernidee des Videos („Not sure where to start? → Vorschläge") entspricht hier einem **Einsteigersatz**. Der ist per `landing-page-strategie/STRATEGIE.md` 2.1 entschieden: Stand **A** (Neue legen selbst an); ein vom Agenten geschriebener Satz wurde am 13.09. vom Betreiber verworfen (v3.0.22), **Inhalt kommt nur vom Betreiber**. Deshalb nicht gebaut und nicht wieder aufgemacht. Gebaut wurde nur, was ohne Inhalt geht: der kürzeste Weg zur ersten eigenen Karte.
**Offen (nachträglich erledigt in v3.6.11, siehe Eintrag darüber):** Welche Handlung ist auf dem leeren Lernen-Bildschirm die **eine** gefüllte? Heute „Kartensatz einspielen" (Entscheidung 2.11.2, gedacht für Leute, die eine Datei bekommen haben). Wer aus einem Video kommt, hat keine Datei — `landing.html` verspricht ihm „Danach legst du direkt deine erste Karte an", und der gefüllte Knopf öffnet für ihn eine Dateiauswahl. Wechsel wäre eine Umkehr der zwei Knöpfe (eine Zeile), aber eine Produktentscheidung.
**Nicht geprüft:** Die Oberfläche selbst (Firebase-Anmeldung nötig), nur `node --check`. Veröffentlichung steht aus (`veroeffentlichen.bat`).
**Nächster Schritt:** Betreiber: veröffentlichen, mit einem **neuen leeren Bereich** am Handy prüfen (Lernen → „Eigene Karten anlegen" → Blatt geht auf → eine Karte → „Fertig" → Stapel zeigt „1 Karte"). Danach nächste Idee.

---

### 2026-09-19 — Offline-Zustand sichtbar gemacht (TikTok-Idee 2 von 8, v3.6.9)

**Geändert:**
- `app.js`: neue Zustände `offline`, `offlineCacheAktiv` (Zeile ~890); `offlineCacheAktiv = true` nach erfolgreichem `persistentLocalCache()` in `initFirebase`; in `renderMain()` leise Meldungszeile per `bannerInfo(…, true)`, wenn `offline`; neue `verbindungGewechselt()` mit `online`/`offline`-Listenern vor dem Service-Worker-Block; `zeigeStartfehler()` sagt offline „lädt von selbst neu" und lädt einmalig bei `online` neu.
- `sw.js` `CACHE_NAME` → `adrabic-3.6.9`; `index.html` `app.js?v=3.6.9`; `CHANGELOG.md`.
**Befund (vor dem Bauen):** Die App *kann* offline (Service Worker cached die Hülle inkl. Firebase-SDK von gstatic; Firestore mit `persistentLocalCache`; Schreiben offline ist laut Kommentar `app.js:1520` ausdrücklich kein Fehlerfall). Sie *zeigte* es aber nirgends. `bannerInfo(text, leise)` mit Offline-Symbol war seit 3.0.0 definiert und wurde nie aufgerufen — wie `zeigeToast()` (Bild 105) ein fertiger, nie angeschlossener Baustein.
**Entscheidung — was vom Video übernommen wurde und was nicht:**
- übernommen: (a) sagen, was weiter geht, (b) sagen, dass nichts verloren geht, (d) sagen, was eingeschränkt ist (Teilen per Code).
- **trifft nicht zu:** (c) Auto-Retry mit Countdown („Rechecking in 18s") — Firestore verbindet sich selbst wieder, und die App hat keinen eigenen Server, dessen Ausfall man abwarten müsste. Ein Countdown wäre erfunden. Stattdessen nur beim Start-Fehler-Bildschirm ein Auto-Neuladen bei `online`.
- Kein Sheet, sondern eine Zeile: leise wie die Backup-Erinnerung; ein Blatt wäre für einen Nicht-Fehler zu laut (Hick: nichts Zusätzliches, was keine Entscheidung braucht).
- Nur der Offline-Fall wird behauptet: `navigator.onLine` ist bei „true" unzuverlässig (Captive-Portal), bei „false" nicht.
- Kein Neuzeichnen mitten in einer Runde (Handschrift-Canvas würde geleert), und nicht vor dem Laden der Daten.
**Nebenfund, NICHT gebaut (Datenweg, kein Bedienungs-Thema):** `teileLektionCode` (`app.js:2856`) `await`et `fb.setDoc(...)`. Offline löst dieses Promise erst bei Server-Bestätigung auf — „Code erzeugen" bleibt offline ohne Rückmeldung hängen, `b.teilCode` ist aber schon lokal gesetzt. `codeEinloesen` (`~2882`) zeigt offline die rohe Firestore-Fehlermeldung. Der Banner warnt jetzt davor; die Sperre („Zum Teilen brauchst du eine Verbindung", bevor etwas geschrieben wird) wäre eine eigene, kleine Änderung — Betreiber entscheidet.
**Offen:** Echtgerät-Test steht aus. Es ließ sich hier nur `node --check` ausführen; die Oberfläche hängt an der Firebase-Anmeldung, ohne die man nicht zu `renderMain()` kommt. Und: der Push allein bringt 3.6.9 **nicht** auf die Live-Seite (siehe `README.md`, `veroeffentlichen.bat`).
**Nächster Schritt:** Betreiber: veröffentlichen, am Handy Flugmodus testen; danach entscheidet er über die Teilen-Sperre. Dann nächste Idee aus dem Backlog.

---

### 2026-09-19 — Hick's Law (TikTok-Idee 6 von 8) gegen alle Bildschirme geprüft, nichts zu bauen

**Geändert:** nichts am Code, keine Versionsnummer. (Zeilennummern unten am 19.09. nach v3.6.9 nachgeführt, Stand `31dbae6`.) Nur dieses Logbuch und der
Backlog-Eintrag im Gedächtnis des Assistenten.
**Geprüft** (Betreiber: „Hick's Law recherchieren und implementieren"), die fünf
Regeln aus dem Video gegen den Code, Stand v3.6.8:

| Regel | Ergebnis | Beleg |
|---|---|---|
| 1. Unpassende Optionen nicht zeigen | erfüllt | Karten-Formular: „Wiederholungsstufe" nur beim Bearbeiten (`app.js:4960`); „Notiz anzeigen" nur wenn die Karte eine hat (`6373`); „Rückgängig" nur wenn es etwas rückgängig zu machen gibt (`6280`, `6315`); „Üben" nur bei mind. einer Karte (`6733`) |
| 2. Keine gleich wichtigen Knöpfe nebeneinander | erfüllt | jeder Bildschirm hat genau einen gefüllten Knopf, der Rest `secondary`/`ghost`: Lernen `5845`, Durchgelaufen `5836`, Verwalten `6714`, Karten-Blatt `4968`, Anmeldung (Bild 4 in `BILDER-BEFUND.md`) |
| 3. Erweitertes ausblenden | erfüllt | „Mehr" statt vier Dauerknöpfen (v3.5.0, `4876`); Üben-Auswahl klappt erst auf Antippen auf (`6741`); Einstellungen in drei Gruppen (Block 2) |
| 4. Hauptknopf optisch stärker | erfüllt | `class="lg full"` an `5845`, `6405`, `6714` |
| 5. Eine Hauptaktion je Bildschirm | erfüllt | Lernen → „Lernsession starten"; Session → „Antwort zeigen", danach die drei Bewertungen (eine echte Dreifach-Entscheidung, erst nach dem Aufdecken); Verwalten → „Karte hinzufügen"; Fortschritt → „Weiter lernen" nur wenn etwas offen ist (`5954`) |

**Entscheidung:** Es wird nichts gebaut. Die Regeln sind seit dem Redesign
(v3.1–3.5) Gestaltungsgrundlage (`PRINZIPIEN.md`, `BILDER-BEFUND.md` Bild 2 und
98), nicht erst jetzt entdeckt. Etwas trotzdem umzubauen, nur damit es als
„umgesetzt" dasteht, verstieße gegen „Kein Punkt wird abgearbeitet, nur weil er
in einer Liste stand" (`CLAUDE.md`).
**Zur Recherche (aus Fachwissen, keine Quellen in dieser Session abgerufen):**
Hick–Hyman (1952): Entscheidungszeit wächst mit dem *Logarithmus* der Zahl
*gleich wahrscheinlicher* Alternativen. Zwei Einschränkungen, die das Video
weglässt: (a) es geht um Reaktionszeit, ein direkter Beleg für „schlechtere
Retention" folgt daraus nicht; (b) gruppierte oder vertraute Listen flachen die
Kurve ab, und zu tiefes Verstecken kostet Auffindbarkeit. Letzteres ist das
Risiko bei „Mehr" (v3.5.0) — die Handlungen dahinter (Auswählen, Umkehren,
Umbenennen, Löschen) sind selten genug, dass es passt.
**Am ehesten noch angreifbar (bewusst NICHT gebaut, kein Beschwerdepunkt):**
(1) Verwalten zeigt „nur dieser Bereich / alle Bereiche" (`6860`) dauerhaft,
sobald es mehr als einen Bereich gibt — könnte erst bei Suchtext erscheinen.
Hängt aber daran, dass Tippen nur `#karten-liste` neu zeichnet (`6845ff`, die
Kommentare dort erklären warum) — ein Umbau berührt die Suche und ist damit
Lernwerkzeug-nah. (2) Die Auswahl-Leiste bei Mehrfachauswahl (`6816ff`) zeigt bis
zu fünf Bedienelemente. Beides erst angehen, wenn der Betreiber am Handy eine
konkrete Stelle nennt, an der er zögert.
**Offen:** nichts.
**Nächster Schritt:** Nächste Idee aus dem Backlog aufgreifen (Betreiber wählt);
Backlog liegt im Gedächtnis `produkt-ideen-backlog`, nicht im Repo.

---

### 2026-09-18 — Werkzeugleiste Verwalten aufgeräumt + Smart Default beim Speichern (v3.5.0)

**Geändert:**
- `app.js`: neues `mehr`-Icon (`ICON_PFADE`, drei Punkte). `ui.bereichMehr`
  (neuer UI-Zustand, nicht gespeichert) und `ui.zuletztSetId` (neuer
  UI-Zustand, nicht gespeichert) ergänzt.
- `renderVerwaltenListe()`: Werkzeugleiste zeigt jetzt nur noch „Üben" +
  „Mehr" (bzw. „Fertig" während der Mehrfachauswahl) statt bis zu fünf
  Knöpfen dauerhaft.
- Neue Funktion `bereichMehrSheet()` (gleiche `.dlg`-Hülle wie
  `bereichSheet()`) mit den vier verlegten Handlungen: Auswählen, Umkehren,
  Umbenennen, Löschen ("gefahr"-Zeile) — Bedingungen je Zeile 1:1 aus der
  alten Werkzeugleiste übernommen, nichts entfernt.
- Neue `data-action`-Fälle `bereich-mehr-auf/-zu/-auswaehlen/-umkehren/
  -umbenennen/-loeschen`; Escape und alle drei Tab-Wechsel setzen
  `ui.bereichMehr` jetzt mit zurück (gleiches Muster wie `bereichSheet`).
- `saveSelectedToSet()`: merkt sich beim Ablegen in eine bestehende
  Speicherkarte `ui.zuletztSetId`. Das `save-set-select`-Dropdown wählt diese
  Speicherkarte jetzt vor (statt immer „＋ Neue Speicherkarte"), sofern sie
  im aktuellen Bereich noch existiert und bearbeitbar ist.
- `plan/redesign-oberflaeche/probelauf.mjs:37`: `.pathname` durch
  `fileURLToPath()` ersetzt — der am 17.09. gefundene, damals nicht
  behobene Windows-Pfadfehler (`mkdir 'C:\C:\...'`). Kein ausgeliefertes
  Werkzeug, aber ein echter, unabhängiger Fund beim Versuch, diese Änderung
  zu prüfen.
- `app.js` `APP_VERSION`, `sw.js` `CACHE_NAME` → `3.5.0`, `CHANGELOG.md`.

**Entscheidung:** Beide Punkte kamen aus der Video-1-Nachlese
(Werkzeugleiste) und `PRINZIPIEN.md` (Smart Defaults) — als „ansteht" auf
Nachfrage genannt, vom Betreiber mit „beide" freigegeben. Bewusst zusammen
in einem Durchgang statt zwei Blöcken: beide Änderungen sind klein,
unabhängig voneinander und berühren dieselbe Datei/denselben Bildschirm
(Verwalten). Bei „Mehr" wurde bewusst keine der fünf Handlungen entfernt,
nur "Üben" (die haeufigste, warum man den Bildschirm aufruft) sichtbar
gelassen — das ist die durch Video 1 verlangte Kontext-Abhaengigkeit, keine
Funktionsaenderung, und faellt damit unter die am 18.09. dauerhaft
gelockerte Grenze aus `KONZEPT.md` §7 (offene Frage 6).

**Offen:** **Kein Gerätetest möglich.** Ein Versuch, `probelauf.mjs` in
dieser Umgebung laufen zu lassen (Playwright + Chromium lokal installiert,
lokaler Server gestartet), scheiterte nach dem Pfadfix an `spawn UNKNOWN`
beim Start von `chrome.exe` — dieselbe Grundschranke wie am 17.09.
(„Permission denied"), nur mit anderer Fehlermeldung. Beide Änderungen sind
deshalb nur per Code-Review geprüft (Syntax mit `node --check`, Bedingungen
Zeile für Zeile mit der alten Werkzeugleiste abgeglichen, bestehende
`.dlg`/`.liste-zeile`/`gefahr`-Klassen wiederverwendet statt neuer CSS).
Betreiber-Test am echten Handy steht noch aus: „Mehr" öffnen/schließen
(auch per Escape), jede der vier Zeilen einmal antippen, danach beim
Ablegen einer Auswahl in eine zuvor benutzte Speicherkarte prüfen, ob sie
vorausgewählt ist.

**Nächster Schritt:** Betreiber-Test am Handy (siehe „Offen"). Ohne
Rückmeldung kein weiterer Schritt an diesem Punkt.

---

### 2026-09-18 — Apple-Login ausdrücklich auf „way later" gestellt, kein Code geändert

**Geändert:** Nichts am Code — `APPLE_LOGIN_BEREIT = false` (`app.js:28`)
bleibt unverändert, Knopf bleibt hinter dem Flag versteckt.

**Entscheidung:** Betreiber auf Nachfrage („warum ist Apple-Anmeldung
überhaupt da"): **„apple für way later"** — also nicht zurückziehen/löschen,
aber auch keine Eile, das Apple-Developer-Konto einzurichten. Der fertige,
aber inaktive Code (`doAppleLogin()`, Icon, Knopf-Markup hinter dem Flag)
bleibt deshalb bewusst liegen statt entfernt zu werden — genau das
Bereitschafts-Muster, das beim Bauen in v3.4.11 schon vorgesehen war.

**Offen:** Apple-Developer-Konto (99$/Jahr) und Provider-Einrichtung in der
Firebase-Konsole bleiben Betreiber-Aufgabe, ohne Zeitdruck. Siehe
`../PLAN.md`, offene Frage 13.

**Nächster Schritt:** Keiner an diesem Punkt. Erst wenn der Betreiber das
Apple-Developer-Konto anlegt und den Provider in Firebase aktiviert, reicht
`APPLE_LOGIN_BEREIT = true` in `app.js:28` — kein weiterer Code nötig.

---

### 2026-09-18 — Nach erfolgreichem Login: hängende Ladekreise behoben, Apple-Knopf ausgeblendet (v3.4.11)

**Geändert:**
- `app.js` (nach `doGoogleLogin`/`doAppleLogin`) neuer `pageshow`-Listener,
  setzt `ui.authBusy` zurück, wenn `event.persisted` true ist.
- `app.js:21` neue Konstante `APPLE_LOGIN_BEREIT = false`.
- `app.js` (`renderAuth`) Apple-Knopf nur noch gerendert, wenn
  `APPLE_LOGIN_BEREIT` true ist.
- `app.js:19` `APP_VERSION` auf `3.4.11`, `sw.js` `CACHE_NAME` auf
  `adrabic-3.4.11`, `CHANGELOG.md` neuer Eintrag.

**Entscheidung:** Der Google-Login lief nach dem CSP-Fix von gestern
(v3.4.10) erfolgreich durch — vom Betreiber am eigenen Handy bestätigt
(Screenshot). Zwei Rückmeldungen dabei:

1. Klickt man Google, dann per Zurück-Knopf ohne fertige Anmeldung zur App
   zurück, drehen sich **alle** Anmelde-Knöpfe endlos weiter. Ursache: Auf
   manchen Geräten (u. a. iOS/Safari, laut Screenshot vermutlich hier der
   Fall) kann Firebase keinen echten Popup öffnen und weicht auf eine
   Vollbild-Weiterleitung aus; ein Zurück von dort stellt die App oft aus
   dem bfcache wieder her — dem eingefrorenen Stand von vor der
   Weiterleitung, `ui.authBusy` weiterhin `true`, weil das Promise aus
   `signInWithPopup` nie zu Ende lief (die Seite wurde verlassen, nicht nur
   in den Hintergrund gelegt). `pageshow`/`event.persisted` ist der
   Standard-Weg, genau diesen Fall zu erkennen.
2. Betreiber fragte, warum der Apple-Knopf überhaupt sichtbar ist, wenn er
   nur zu einer Fehlermeldung führt — Apple braucht zusätzlich ein
   kostenpflichtiges Apple-Developer-Konto (99$/Jahr), das noch nicht
   eingerichtet ist. Statt den Code zu entfernen (der frühere
   Betreiber-Wunsch „google und ja" bezog sich auf beide Anbieter im
   Prinzip, nur die Apple-Einrichtung selbst steht noch aus): ein Flag
   blendet den Knopf aus, bis Apple tatsächlich aktiv ist — kein Verlust,
   kein Nacharbeiten nötig, sobald es so weit ist.

**Offen:** Apple-Anmeldung bleibt vollständig zurückgestellt, bis der
Betreiber das Apple-Developer-Konto einrichtet (siehe Eintrag vom
17.09.2026 weiter unten für die genauen Schritte). `APPLE_LOGIN_BEREIT`
dann auf `true` setzen — Firebase-Konsolen-Einrichtung UND dieses Flag
gehören zusammen, sonst bleibt der Knopf trotz aktivem Anbieter unsichtbar.

**Nächster Schritt:** Google-Login gilt als abgeschlossen getestet. Kein
weiterer Schritt hier offen, bis der Betreiber Apple aktiv einrichten will.

### 2026-09-17 — Google-/Apple-Knöpfe: Logo-Größe fest statt nur per CSS (v3.4.7)

**Geändert:** `app.js:19` `APP_VERSION` auf `3.4.7`; `app.js` (`OAUTH_LOGOS`)
beide `<svg>` bekommen `width="20" height="20"` und `style="width:20px;
height:20px;flex:0 0 auto;display:block"` direkt am Element; `sw.js`
`CACHE_NAME` auf `adrabic-3.4.7`; `CHANGELOG.md` neuer Eintrag.

**Entscheidung:** Nach dem `firebase deploy` von v3.4.6 zeigte der Betreiber
einen Screenshot vom echten Gerät: Beide Logos riesig, Text auf zwei Zeilen
gesprengt. Ursache war nicht die Bedienung, sondern die reine
CSS-Klassen-Lösung aus v3.4.6 (`.oauth-logo { width:18px; height:18px }`
nur in `styles.css`) — ein `<svg viewBox="0 0 24 24">` ohne eigene
`width`/`height` rendert ohne dieses CSS in der Browser-Standardgröße
(deutlich größer als 20px), und genau dieses Zusammenspiel aus Cache
(Service Worker, Browser-HTTP-Cache) und getrennt ausgelieferten Dateien
(`app.js` vs. `styles.css`) hatte in dieser Sitzung bereits zweimal zu
"neue Version geladen, aber CSS noch alt" geführt. Fix: Größe direkt am
Element, unabhängig vom CSS-Ladezustand — robuster als ein zweiter
Cache-Fix-Versuch.

**Offen:** keins — am lokalen Server (`http://localhost:8099`) geprüft,
Icons zeigen sich in der vorgesehenen kompakten Größe.

**Nächster Schritt:** Betreiber muss `veröffentlichen.bat` erneut laufen
lassen (bzw. `firebase deploy` aus dem Projektordner), damit v3.4.7 live
geht. Danach am echten Gerät erneut prüfen, ob die Knöpfe jetzt kompakt
sind.

---

### 2026-09-17 — Frage 13 umgesetzt: Anmeldung mit Google und Apple (v3.4.6)

**Geändert:**
- `app.js:19` `APP_VERSION` auf `3.4.6`.
- `app.js` (`OAUTH_LOGOS`, direkt nach `ikon()`) neue Marken-Logos für die
  beiden Knöpfe.
- `app.js` (`AUTH_ERRORS`) neue Fehlertexte für abgebrochenes
  Anmeldefenster, doppeltes Popup, Konto mit anderer Anmeldeart,
  nicht freigeschaltete Domain.
- `app.js` (`doGoogleLogin`, `doAppleLogin`, direkt nach `doLogin`) neue
  Funktionen über `fb.signInWithPopup` / `fb.GoogleAuthProvider` /
  `fb.OAuthProvider("apple.com")`.
- `app.js` (`renderAuth`) zwei neue Knöpfe unter einer Trennlinie „oder“,
  nur bei `m !== "reset"` (Anmelden/Konto anlegen, nicht beim
  Passwort-Zurücksetzen).
- `app.js` (Klick-Delegation) zwei neue `data-action`-Fälle:
  `google-login`, `apple-login`.
- `styles.css` (nach `.form-actions`) `.auth-trenner`, `.auth-anbieter`,
  `.oauth-logo` — eigene Klasse für die Logos statt `.i`, weil deren
  `fill:none`/`stroke:currentColor` das mehrfarbige Google-Zeichen
  unkenntlich und das einfarbige Apple-Zeichen unsichtbar gemacht hätte.
- `sw.js` `CACHE_NAME` auf `adrabic-3.4.6`.
- `CHANGELOG.md` neuer Eintrag 3.4.6.
- `datenschutzerklaerung.html` Abschnitt 4 (neuer Absatz zu Google/Apple),
  Abschnitt 7 (Empfänger, ergänzt um die beiden Anbieter), Datum am Fuß auf
  17.09.2026.
- `plan/PLAN.md` Frage 13 als erledigt markiert.

**Entscheidung:** Betreiber-Antwort auf die Rückfrage zu Frage 13: „google
und ja“ — beide Anbieter, nicht nur Google. Beide laufen über
`signInWithPopup`, nicht über einen Redirect: Popup lässt die App-Seite im
Hintergrund unverändert bestehen (kein Neuladen, kein Verlust eines
unfertigen Formularfelds), Redirect wäre nur nötig, wenn Popups technisch
blockiert würden (z. B. eingebettete Webview) — dafür gibt es hier keinen
Hinweis. Ein abgebrochenes Popup (`auth/popup-closed-by-user`) zeigt bewusst
keinen Fehler, da ein Zurückweichen keine Störung ist. E-Mail-Bestätigung
entfällt für beide Anbieter, weil Firebase deren eigene Bestätigung bereits
in `email_verified` überträgt — dieselbe Firestore-Regel
(`firestore.rules:67`) prüft das anbieterunabhängig, keine Regeländerung
nötig. Kein neues Firestore-Feld, kein neuer Rechtstext-Abschnitt, dieselbe
`users/{uid}`-Struktur wie bei E-Mail/Passwort.

**Offen:** Ohne die Firebase-Konsolen-Einstellung (siehe unten, Betreiber-
Aufgabe) zeigen beide Knöpfe nur eine Fehlermeldung — das ist kein Bug,
sondern der erwartete Zustand, bis der Betreiber den jeweiligen Anbieter
einschaltet. Apple zusätzlich: ohne Apple-Developer-Konto lässt sich der
Anbieter in der Firebase-Konsole gar nicht erst konfigurieren.

**Was der Betreiber noch tun muss:**
1. **Google:** In der [Firebase-Konsole](https://console.firebase.google.com/)
   → Projekt „lernkarte-925c2“ → *Authentication* → Reiter *Sign-in method*
   → *Google* anklicken → *Aktivieren* umlegen → Projekt-Support-E-Mail
   auswählen (steht meist schon da) → *Speichern*. Kein weiterer Account
   nötig, das ist derselbe Google-Account wie die Firebase-Konsole selbst.
   Woran man merkt, dass es geklappt hat: Der Google-Knopf auf der
   Anmeldeseite öffnet ein echtes Google-Auswahlfenster statt der Meldung
   „Das hat nicht geklappt (auth/operation-not-allowed)“.
2. **Apple (nur falls gewünscht — deutlich aufwendiger als Google):**
   Braucht ein [Apple-Developer-Konto](https://developer.apple.com/) (99 $/Jahr).
   Darin: *Certificates, Identifiers & Profiles* → *Identifiers* → eine
   *Services ID* anlegen (z. B. `com.adrabic.wiederholung.signin`), darin
   *Sign in with Apple* aktivieren und als Rückkehr-Adresse die von der
   Firebase-Konsole angezeigte URL eintragen (Format
   `https://lernkarte-925c2.firebaseapp.com/__/auth/handler`). Dazu einen
   *Key* mit aktiviertem „Sign in with Apple“ erzeugen und herunterladen
   (nur einmal möglich). In der Firebase-Konsole → *Authentication* →
   *Sign-in method* → *Apple* → *Aktivieren* → Services-ID, Team-ID,
   Key-ID und den Inhalt der heruntergeladenen Schlüsseldatei eintragen →
   *Speichern*. Woran man merkt, dass es geklappt hat: Der Apple-Knopf
   öffnet ein echtes Apple-Anmeldefenster statt derselben Fehlermeldung wie
   oben.
3. Nach jedem der beiden Schritte einmal in einem privaten
   Browserfenster `https://lernkarte-925c2.web.app/` öffnen und den
   jeweiligen Knopf ausprobieren, bevor die Änderung als abgeschlossen
   gilt.

**Nächster Schritt:** keiner hier, solange der Betreiber die Konsolen-
Schritte nicht zurückmeldet. Danach: einmal am echten Gerät mit einem
frischen Google- bzw. Apple-Konto durchklicken (Bild 22 der Sammlung
betraf nur Google — Apple war Betreiber-Zusatzwunsch aus diesem Gespräch,
in `BILDER-BEFUND.md` nicht referenziert, deshalb hier gesondert
vermerkt).

---

### 2026-09-17 — TikTok-Hinweis zur Onboarding-Reihenfolge nachgeprüft: Reihenfolge bleibt

**Geändert:** keine Code-Datei — reine Prüfung, ergänzt den Eintrag darunter.

**Entscheidung:** Der Eintrag darunter beruhte nur auf dem transkribierten
Text und war unvollständig. Der Betreiber hat danach die Bildschirmfotos aus
demselben Video nachgereicht: gezeigt werden Beispiele aus fremden Apps
(u. a. Fahrdienst, Ernährungs-Tracker, Diktier-Tastatur), die alle erst eine
Frage stellen oder etwas Konkretes abfragen, bevor der Konto-Anlegen-Bildschirm
kommt — nie umgekehrt, plus eine (nicht nachprüfbare) Funnel-Grafik des
Video-Autors zur eigenen App.

Damit war klar: der Mechanismus dahinter deckt sich mit einer bereits
bestehenden, aber bisher nicht umgesetzten Linie aus diesem Strang selbst —
`PRINZIPIEN.md:46` (IKEA-/Endowment-Effekt: „Erste eigene Karte vor dem Konto
anlegen lassen") und der Landingpage-Text „Dein Stoff, nicht unserer"
(Fassung A, `landing-page-strategie/STRATEGIE.md`). Nachgesehen im Code: Die
App hält dieses Versprechen technisch nicht ein. „Konto anlegen" ist Schritt 1
von 2 (`app.js:4245-4247`), die erste Karte kommt laut Text erst danach
(`app.js:4182`: „Danach geht es gleich weiter zu deiner ersten Karte."), als
leerer Zustand mit eigenem Knopf (`app.js:6505`).

Vorschlag war, die erste Karte (Wort + Übersetzung, bestehendes
`formDraft`-Feld) vor „Konto anlegen" zu stellen — ohne neue Firestore-Regeln,
da geschrieben weiterhin erst nach der Anmeldung wird, der Entwurf davor rein
lokal bliebe. **Betreiber-Entscheidung: nein, aktuelle Reihenfolge bleibt.**
Kein Bau.

**Offen:** Der Widerspruch zwischen Landingpage-Versprechen („Dein Stoff,
nicht unserer") und tatsächlichem Ablauf (Konto vor erster Karte) bleibt
damit bestehen — bewusst, auf Betreiber-Entscheidung, nicht übersehen.
**Nächster Schritt:** keiner hier. Käme dieselbe Frage später wieder auf, gilt
diese Entscheidung als bereits getroffen, nicht erneut zu prüfen.

---

### 2026-09-17 — TikTok-Hinweis zur Onboarding-Reihenfolge geprüft: trifft nicht zu

**Geändert:** keine Code-Datei — reine Prüfung.
**Entscheidung:** Betreiber hat ein TikTok-Video eingebracht (Transkript,
Reihe „Mistakes from building 4 apps", Punkt 5/10). Kernaussage: den
Anmeldebildschirm hinter das Onboarding stellen statt davor — im Video hat
das Vertauschen die Sign-up-Konversion um 40 % erhöht, weil ein Konto nach
bereits investierter Zeit im Onboarding klein wirkt.

Geprüft gegen den bestehenden Flow: `landing.html` (Problem → Lösung,
Konzept-Abschnitt 4.7) steht bereits **vor** der Registrierung — Entscheidung
vom 12.09.2026 (`PLAN.md`, vormals offene Frage 2). Der Knopf „Konto anlegen
und anfangen" (`landing.html:508`, `landing.html:681`) führt von dort zu
`index.html`/Registrierung, nicht umgekehrt. Der im Video beschriebene Fehler
(Sign-up-Bildschirm vor dem Onboarding) liegt hier also nicht vor.

Eine interaktive In-App-Tour vor der Kontoanlage gibt es nicht, nur die
statische Landingpage — das nachzubauen wäre keine Umstellung der
Reihenfolge, sondern eine neue Funktion (Demo-/Gastmodus ohne Konto). Das
liefe gegen die in Phase 1 gehärteten Firestore-Regeln (jedes Konto liest und
schreibt ausschließlich unter sich selbst) und damit über das hinaus, was
dieser Strang an der Hülle ändern darf (`AUFTRAG.md`: keine erfundenen
Features aus Videos).
**Offen:** nichts — der Punkt trifft nicht zu, kein Bau nötig.
**Nächster Schritt:** keiner hier — der Strang bleibt im Ruhezustand wie im
Eintrag darunter festgehalten.

---

### 2026-09-17 — Block 10 am echten Handy verifiziert

**Geändert:** keine Code-Datei — reine Verifikation.
**Entscheidung:** Betreiber hat beide offenen Prüfpunkte aus dem vorigen
Eintrag am echten Handy, angemeldet, durchgeführt: Stufenbereich beim Üben
(zwei Tipps markieren den Bereich, „Start" übt die richtigen Karten) und Art
der Speicherkarte (Blatt öffnet, neue Art erscheint in der Zeile, Gruppierung
stimmt). Rückmeldung: „passt". Damit ist Block 10 fertig — als letzte
Position aus `BILDER-BEFUND.md` und aus `AUFTRAG.md`.
**Offen:** nichts an Block 10. Offene Fragen 12 (Farben) und 13
(Google-/Apple-Anmeldung) bleiben unverändert Betreiber-Entscheidungen, die
nichts blockieren.
**Nächster Schritt:** keiner hier — der Redesign-Strang ruht, bis der
Betreiber eine neue Schwachstelle nennt oder Frage 12/13 entscheidet.

---

### 2026-09-17 — Block 10 gebaut: Sichtbare Wahl statt Klappliste (v3.4.3)

**Geändert:**
- **Stufenbereich beim Üben** (`app.js`):
  - `ui` neue Felder `drillVon`, `drillBis`, `drillAnker` (bei `drillSetIds`) —
    der Bereich steht jetzt direkt im Zustand statt in zwei `<select>`.
  - `setzeVollenStufenBereich()` (neu, bei `openDrillPicker()`): setzt von/bis
    auf den vollen verfügbaren Bereich — dieselbe Vorbelegung, die die zwei
    `<select>` vorher automatisch hatten (kein "selected" auf "von", "selected"
    auf die letzte Option bei "bis").
  - `waehleStufe(s)` (neu): erster Tipp wählt eine einzelne Stufe, zweiter
    spannt den Bereich zum ersten auf (Reihenfolge egal, `Math.min`/`max`).
    Danach beginnt der nächste Tipp wieder neu (`drillAnker` zurück auf `null`).
  - `renderVerwaltenListe()`: die zwei `<select id="drill-min/max">` sind durch
    `<div class="stufe-chips">` mit einem `<button data-action="stufe-chip">`
    je verfügbarer Stufe ersetzt, plus eine Zeile "Anfang antippen, dann Ende"
    und eine Zeile mit dem aktuell gewählten Bereich.
  - `case "start-drill"`: liest jetzt `ui.drillVon`/`ui.drillBis` statt
    `document.getElementById("drill-min/max").value`.
  - Radio "Nach Stufen" (`input[name="drill-mode"]` change-Listener): ruft
    `setzeVollenStufenBereich()`, wenn in den Stufen-Modus gewechselt wird —
    dieselbe "immer wieder voller Bereich"-Vorbelegung wie früher bei jedem
    Neuzeichnen der `<select>`.
  - `selectBereich()`: `drillVon`/`drillBis`/`drillAnker` mit zurückgesetzt
    (wie die übrigen `drill*`-Felder), sonst könnte ein Bereichswechsel einen
    Stufenbereich stehen lassen, den es im neuen Bereich gar nicht gibt.
  - `styles.css`: `.drill-picker select { … }` (tot, keine `<select>` mehr in
    diesem Kasten) entfernt, `.stufe-chips`/`.stufe-chip`/`.stufe-chip.aktiv`
    neu — eigene Klasse statt `.pill`, weil `.pill` bei `--ctrl-sm` (36px)
    bleibt (seltene Handlung, Fortschritts-Umschalter) und hier Satz 3
    (Trefferfläche mindestens `--tap`, 44px) gilt, weil öfter und gezielter
    angetippt wird.
- **Art der Speicherkarte** (`app.js`):
  - `ui` neues Feld `setArtSheetId` (bei `wahlSheet`) — die ID der
    Speicherkarte, deren Art gerade gewählt wird, oder `null` = zu. Eigenes
    Feld statt Wiederverwendung von `wahlSheet`: die Art hängt an einer
    bestimmten Zeile, nicht an einer app-weiten Einstellung wie Helligkeit.
  - `setArtSheet()` (neu, neben `wahlSheet()`): dasselbe Blatt-Muster — Titel,
    Zeilen mit Haken bei der aktiven Art, Erklärungstext, "Fertig". In
    `renderMain()` neben `wahlSheet()` eingehängt.
  - `setBlock()`: `<select class="set-art-wahl">` mit drei `<option>` ersetzt
    durch einen `<button class="ghost" data-action="set-art-sheet-auf">`, der
    nur die aktuelle Art zeigt und das Blatt öffnet — drei Chips in jeder
    Zeile hätten die Liste voll gemacht (Satz "weniger Inhalt am Handy").
  - Drei neue Fälle im Klick-Schalter: `set-art-sheet-auf` (öffnen),
    `set-art-sheet-zu` (schließen), `set-art-waehlen` (wählt sofort, Blatt
    bleibt offen bis "Fertig" — wie bei Helligkeit/Schriftgröße/Sitzungslimit).
  - Der globale `app.addEventListener("change", …)`-Listener für
    `select[data-action="set-art"]` ist komplett entfernt (keine `<select>`
    mehr, die er bedienen müsste).
  - `SET_ART_ZEICHEN` (Emoji nur fürs `<option>`) entfernt, dazugehöriger
    Kommentar bei `ICON_PFADE` angepasst — die Grenze "`<option>` kann kein
    SVG" galt nur für die alte native Auswahl und fällt mit ihr weg. Jetzt
    steht überall dasselbe SVG-Symbol wie an den anderen Art-Stellen
    (`set-gruppe-kopf`).
  - `styles.css`: `.set-art-wahl` (tot) entfernt.
- `app.js:19` / `sw.js:10` → 3.4.3. `CHANGELOG.md` neue Sektion.

**Entscheidung:** Beide Stellen aus dem Auftrag folgen demselben Prinzip –
bei wenigen Möglichkeiten sieht man lieber gleich alle. Beim Stufenbereich
wurden bewusst **Chips mit Zwei-Tipp-Bereich** gebaut, kein Schieberegler mit
zwei Griffen (Bild 14 der Sammlung) – der Auftrag warnt ausdrücklich davor
("am Handy fummelig, und die App hatte mit Ziehgesten schon Ärger"). Bis zu
13 Chips (`MAX_STUFE = 12` + Stufe 0) dürfen umbrechen, keine erzwungene
Einzelzeile – tatsächlich zeigen `availableStufen()` aber nur die Stufen, die
im geübten Bereich wirklich vorkommen, meist deutlich weniger als 13. Bei der
Speicherkarten-Art wurde bewusst **kein** Chip-Trio pro Zeile gebaut (der
Auftrag warnt davor: "drei Chips pro Zeile machen die Liste voll"), sondern
das vorhandene Auswahl-Blatt-Muster wiederverwendet.

**Geprüft:** `node --check app.js` (Syntax), Seite im Browser neu geladen
(`http://localhost:8099/index.html`) – keine Konsolenfehler. **Beide
Bildschirme selbst sind ungeprüft** – beide liegen im Verwalten-Tab und
brauchen ein angemeldetes Konto. Versucht wurde diesmal zusätzlich, das
Prüf-Werkzeug `probelauf.mjs` (Firebase-Attrappen) lauffähig zu machen:
`npm install playwright` und `npx playwright install chromium` liefen in
dieser Umgebung durch (anders als noch bei Block 9 vermutet), aber der
eigentliche Browser-Start scheitert an der Umgebung selbst – `chrome.exe`
lässt sich hier nicht ausführen (`Permission denied`, auch mit versuchtem
Sandbox-Bypass). **Für künftige Sessions festgehalten:** `probelauf.mjs`
selbst hat nebenbei einen Windows-Bug gefunden (nicht behoben, nur lokal in
einer Kopie umgangen) – `new URL(...).pathname` liefert unter Windows einen
Pfad mit führendem Schrägstrich vor dem Laufwerksbuchstaben
(`/C:/Users/...`), `mkdirSync` scheitert daran. Fix wäre `fileURLToPath()`
statt `.pathname`, nicht eingecheckt, da es nichts genutzt hätte (der
Browser-Start scheitert ohnehin an der Umgebung, nicht am Pfad-Bug). Alle
Testartefakte (`node_modules/`, Testkopie des Skripts) wieder entfernt.

**Offen:** Betreiber-Test am echten Handy, angemeldet: (1) Verwalten → Üben
öffnen, eine Stufe antippen, eine zweite antippen, prüfen dass der Bereich
dazwischen markiert ist und "Start" die richtigen Karten übt. (2) Bei
"Arten vergeben" eine Speicherkarte antippen, im Blatt eine andere Art wählen,
prüfen dass die Zeile draußen die neue Art zeigt und die Karten wie erwartet
gruppiert werden.

**Nächster Schritt:** Betreiber-Test von Block 10 abwarten. Danach ist Block
10 die letzte offene Position aus `BILDER-BEFUND.md`; der Redesign-Strang
ruht wieder, bis der Betreiber eine neue Schwachstelle nennt oder die offenen
Fragen 12/13 (Farben, Google-Anmeldung) entscheidet.

---

### 2026-09-17 — Block 9 gebaut: Fehler am Feld statt im Dialog (v3.4.2)

**Geändert:**
- `app.js` neuer Zustand `ui.karteFeldFehler` (bei `karteSheet: false,`) und
  `ui.authFeldFehler` (bei `authEingabe`) — welches Pflichtfeld gerade leer ist.
- `submitCardForm()`: statt `await dlgAlert("Bitte Wort und Übersetzung
  ausfüllen.", …)` jetzt `ui.karteFeldFehler = { wort: !wort, ueb: !ueb };
  render(); fokusInsErstesFehlerfeld();` — neue Funktion `fokusInsErstesFehlerfeld()`
  neben `fokusInsWortfeld()`.
- `karteSheet()`: `f-wort`/`f-ueb` bekommen bei Fehler `aria-invalid="true"`
  und `aria-describedby`, darunter `<div class="field__fehler">Bitte
  ausfüllen</div>` — beides existierte in `styles.css` seit Block 1
  (`input[aria-invalid="true"]:985`, `.field__fehler:1020`), wurde aber nie
  benutzt.
- Der bestehende `input`-Listener auf `f-wort`/`f-ueb` (in `renderMain()`)
  löscht den Fehler jetzt direkt im DOM (Attribut weg, Fehlertext-Element
  entfernt), sobald man tippt — ohne `render()`, damit Fokus und
  Schreibfluss nicht unterbrochen werden.
- `resetFormDraft()` setzt `ui.karteFeldFehler = null` mit; `editCard()`
  setzt es zusätzlich explizit, weil es `formDraft` direkt zuweist statt
  über `resetFormDraft()`.
- `doRegister()`: statt `ui.authError = "Bitte einen Namen eingeben."` jetzt
  `ui.authFeldFehler = { name: true }` plus Fokus auf `#a-name`.
- `renderAuth()`: `a-name` bekommt bei Fehler dieselbe `aria-invalid`/
  `field__fehler`-Behandlung, plus ein `input`-Listener am Ende der Funktion,
  der den Fehler beim Tippen entfernt (gleiches Muster wie beim Kartenformular).
- `ui.authFeldFehler = null` an jeder Stelle, die schon `ui.authError = null`
  setzt (`mode-login`/`mode-register`/`mode-reset`, `onAuthStateChanged`) —
  sonst würde ein alter Namens-Fehler nach einem Moduswechsel wieder auftauchen.
- `app.js:19` / `sw.js:10` → 3.4.2. `CHANGELOG.md` neue Sektion.

**Entscheidung:** Auftrag verlangt zwei getrennte Stellen (Karten-Formular,
Registrierung) mit derselben Idee — Fehler gehört ans Feld, nicht in einen
Dialog oder einen allgemeinen Kasten. Serverfehler (z. B. „E-Mail oder
Passwort ist falsch") bleiben bewusst im Kasten unter den Feldern, wie
Punkt 4 des Auftrags verlangt — sie betreffen kein einzelnes Feld. Fürs
Löschen des Fehlers beim Tippen bewusst **kein** `render()` verwendet,
sondern direkte DOM-Änderung: ein volles Neuzeichnen bei jedem Tastenanschlag
hätte den Cursor/Fokus riskiert, und das bestehende Muster (`input`-Listener
spiegelt in `formDraft`/liest über `authEingabenMerken()`) zeigt, dass render()
hier ohnehin nicht bei jedem Zeichen läuft.

**Geprüft:** Die Registrierungs-Seite ist ohne Anmeldung erreichbar und wurde
im Browser durchgeklickt: E-Mail und Passwort ausgefüllt, Name leer gelassen,
„Konto anlegen" getippt — kein Dialog, Namensfeld rot mit „Bitte ausfüllen"
darunter, Fokus nachweislich auf `#a-name` (`document.activeElement.id`),
E-Mail/Passwort blieben stehen. Danach in dasselbe Feld getippt — Fehler und
rote Färbung verschwanden sofort. **Das Karten-Formular selbst konnte hier
nicht durchgeklickt werden** — braucht ein angemeldetes Konto, und
`probelauf.mjs` (Firebase-Attrappen) braucht `playwright`, das in dieser
Umgebung nicht installiert ist (`node -e "require.resolve('playwright')"`
schlägt fehl, kein `node_modules/`). Der Code-Pfad ist aber identisch zum
geprüften Namensfeld (dieselbe Render-Logik, dieselben CSS-Klassen, derselbe
Lösch-Mechanismus beim Tippen) — nur eben nicht am echten Formular gesehen.

**Verifikation am echten Handy:** Betreiber hat das Karten-Formular angemeldet
getestet ("passt. weiter") — rotes Feld, „Bitte ausfüllen", Fokus-Sprung und
Verschwinden beim Tippen funktionieren wie vorgesehen. **Block 9 ist damit
✅ fertig und verifiziert**, nicht nur „im Code fertig".

**Nächster Schritt:** Block 10 (Sichtbare Wahl statt Klappliste).

---

### 2026-09-17 — Block 8 fertig: Rückmeldung nach dem Speichern (v3.4.1)

**Geändert:**
- `app.js:3540–3543` — nach `patchDoc(patch);` zwei Zeilen hinzugefügt: die Variable `toastText` enthält „Karte gespeichert" oder „Änderung gespeichert" (je nachdem, ob `warEdit`); `zeigeToast(toastText)` wird unmittelbar danach aufgerufen.
- `app.js:19` / `sw.js:10` → 3.4.1
- `CHANGELOG.md` — neue Sektion 3.4.1

**Entscheidung:** Die Toast-Funktion war längst vorhanden (`zeigeToast()` ab 3.0.0, gerendert über `renderToast()`, gestaltet in `styles.css`). Sie wurde nur nie aufgerufen. Block 8 des Auftrags verlangt, sie bei **Speichern-Handlungen** einzusetzen, die sonst stumm bleiben — das trifft genau auf das Karten-Speichern zu (da die Karte sonst keine sichtbare Reaktion gibt). Orts-Änderungen und Speicherkarten-Aktionen bleiben offen wie im Auftrag, weil dort schon sichtbar etwas passiert (Karte verschwindet, Karte wechselt Bereich).

**Textangabe:** Im Auftrag: „Karte gespeichert" beim Anlegen, „Änderung gespeichert" beim Bearbeiten. Umgesetzt genau so, über die vorhandene `warEdit`-Unterscheidung (siehe `app.js:3481`).

**Verifikation am echten Handy (iPhone):**
Die Toast-Meldung „Karte gespeichert" wurde live getestet (Screenshot vom Betreiber):
- Position: Meldung mit Checkmark-Icon sitzt mittig über den Speicher-Knöpfen, nicht am Rand
- Sichtbarkeit: Weiße Pill auf Beige, deutlich lesbar, blockiert weder die Felder noch die Knöpfe
- Timing: Meldung erscheint unmittelbar nach dem Speichern und verschwindet nach ca. 2,5 s von selbst
- Nur eine Meldung getestet (Neuerstellung); die Unterscheidung „Änderung gespeichert" läuft über denselben Code

**Block 8 ist damit ✅ fertig und verifiziert.**

**Nächster Schritt:** Block 9 (Fehler direkt am Feld statt Dialog) — braucht einen Login zum Testen und kann hier nicht ohne echte Firebase-Umgebung gebaut werden.

---

### 2026-09-17 — Bildersammlung (108 Bilder) ausgewertet, Block 7 fertig: Anmeldeformular (v3.4.0)

**Geändert:**
- Neu: `plan/redesign-oberflaeche/BILDER-BEFUND.md` — eine Zeile pro Bild, mit
  Urteil und Beleg.
- `app.js:956–962` — `ui.authEingabe` und `ui.authPassSichtbar`.
- `app.js:1347` (`onAuthStateChanged`) — beide werden bei jeder
  Anmeldeänderung geleert.
- `app.js:4132` — neue Funktion `authEingabenMerken()`, am Anfang von
  `renderAuth()` aufgerufen.
- `app.js:4166–4172` — Passwortfeld in `.feld-mit-knopf` mit Auge-Knopf
  (`data-action="passwort-zeigen"`, `aria-pressed`, `aria-label`).
- `app.js:4221` — Werte nach `app.innerHTML = html` per `.value`
  zurückgesetzt (nicht als Attribut, damit das Passwort nicht im Markup steht).
- `app.js:7228` — `case "passwort-zeigen"` im einen delegierten Listener.
- `app.js:474–475` — Symbole `auge`, `augeZu` im vorhandenen Linienstil.
- `styles.css:1011–1018` — `.feld-mit-knopf`.
- `app.js:19` / `sw.js:10` → 3.4.0. `CHANGELOG.md`.
- `AUFTRAG.md` — Blöcke 7–10 in die Tabelle, 8–10 ausführlich beschrieben.
- `plan/PLAN.md` — Strang-Status, offene Fragen 12 und 13, Statusverlauf,
  „Wo eine neue Session anfängt".
- `.claude/launch.json` (neu, nicht ausgeliefert) — lokaler Server
  `python -m http.server 8099` für die Browser-Vorschau.

**Entscheidung:** Der Betreiber hat 108 Bilder aus TikTok geliefert
(„hauptsache alle 108 bilder … abgehakt"). Alle wurden einzeln angesehen. 11
davon sind byte-gleich dieselbe Werbeseite (per `md5sum` geprüft), bleiben
aber in der Liste, damit die Zählung mit dem Ordner übereinstimmt.
Ergebnis: 59 ✅ belegt schon da · 12 ➖ passen nicht · 24 ▫️ kein Tipp ·
3 🟡 Betreiberfrage · 8 📋 in neue Blöcke · 2 🔨 sofort gebaut. Summe 108.

**Warum gerade Block 7 sofort gebaut wurde und nicht Block 8:** Block 7 ließ
sich **ohne Anmeldung** im Browser prüfen — der Anmeldebildschirm ist das
Einzige, was ohne Konto erreichbar ist, und `probelauf.mjs` läuft auf diesem
Rechner nicht (`playwright` nicht installiert). Block 8 braucht eine
Anmeldung zum Prüfen; blind bauen widerspricht der Regel „nach jeder
Gestaltungsänderung prüfen". Außerdem war Block 7 ein **echter Fehler**,
kein Geschmack: Beim Lesen von `doLogin()` fiel auf, dass `render()` während
des Wartens aufgerufen wird und `renderAuth()` die Felder leer neu zeichnet.

**Nachweis vorher (live, v3.3.2, lokaler Server, ohne Serveranfrage):**
E-Mail getippt → „Neues Konto anlegen" → Feld leer. E-Mail + Passwort
getippt, ohne Namen „Konto anlegen" → Meldung „Bitte einen Namen eingeben."
und **beide Felder leer**. (Bewusst über den Namens-Fehler getestet, der
lokal geprüft wird — kein Anmeldeversuch mit erfundenen Daten gegen das
echte Firebase.)

**Nachweis nachher (v3.4.0, Service-Worker und Cache vorher gelöscht):**
- Wechsel zu Registrieren: E-Mail und Passwort stehen noch da.
- Namens-Fehler: beide stehen noch da, Meldung erscheint.
- Auge: Feld wird `type="text"`, Beschriftung „Passwort verbergen", Wert bleibt.
- Zurück zu Anmelden: E-Mail steht, Passwort bleibt sichtbar (Zustand bleibt,
  das ist gewollt — wer es gerade sehen wollte, will es weiter sehen).
- `#app.innerHTML` enthält das Passwort **nicht**.
- Auge-Knopf 44 × 44 px, sitzt im 48 px hohen Feld rechts (gemessen bei
  375 px Breite). Keine Fehler in der Konsole.

**Weshalb das Passwort überhaupt im Speicher gehalten wird:** Sonst wäre es
nach jeder Fehlermeldung weg — genau der Fehler. Es liegt nur in `ui` (nie in
`localStorage`), und `onAuthStateChanged` leert es bei jedem An- und Abmelden.
Ohne das Leeren stünde nach dem Abmelden das alte Passwort wieder im Feld.

**Bewusst nicht gebaut, obwohl auf den Bildern:**
- „Passwort vergessen?" direkt ans Feld (Bild 21): Die Stelle unter der Karte
  ist eine dokumentierte Entscheidung (`app.js:4192`). Nicht umgeworfen.
- Google-/Apple-Anmeldung (Bild 22): braucht Konsole + Datenschutztext →
  offene Frage 13.
- Kein reines Schwarz/Weiß (Bild 27, 68): Markenfrage → offene Frage 12.
- Platzhalter-Gerüst beim Laden (Bild 63): siehe Befund, passt nicht.
- Portfolio-Karussell (Bild 48–56): richtet sich an Jobsuchende.

**Nebenfunde, nur vermerkt:**
- `--skeleton` (`styles.css:160`) ist definiert, aber nirgends benutzt.
- Der Rückfall-Knopftext „Ja, weiter" in `dlgConfirm` (`app.js:7097`) wird von
  keinem Aufruf mehr erreicht — alle geben `okLabel` mit.
- `input[aria-invalid]` und `.field__fehler` (`styles.css:985, 1020`) sind
  gestaltet, aber nie gesetzt → wird in Block 9 benutzt.

**Offen:**
- **Am echten Handy nicht angesehen.** Geprüft nur im eingebauten Browser mit
  Handy-Breite. Betreiber: Anmeldeseite öffnen, Auge antippen.
- **Veröffentlichung auf Firebase Hosting** macht der Betreiber
  (`veroeffentlichen.bat`) — der Push auf `main` allein bringt 3.4.0 nicht auf
  die Live-Seite.
- Offene Fragen 12 (Farben) und 13 (Google-Anmeldung) in `plan/PLAN.md`.
- Werkzeugleiste Verwalten und Smart Defaults — unverändert offen (siehe
  Eintrag Block 6), durch Bild 2, 98, 104 nur bestätigt.

**Nächster Schritt:** Block 8 laut `AUFTRAG.md` — in der Speicherfunktion für
Karten (`app.js:3466` ff.) nach `patchDoc(patch); render();` die vorhandene
`zeigeToast()` aufrufen („Karte gespeichert" / „Änderung gespeichert"), dann
prüfen. Vorher klären, womit geprüft wird: `npm install playwright` +
`probelauf.mjs`, oder Betreiber schaut am Handy.

---

### 2026-09-17 — Block 5 fertig: Erststart als Fortschritt gerahmt (v3.3.2)

**Geändert:** `app.js` — `soloMarke()` nimmt einen optionalen `schritt`-Text
für ein `.eyebrow` über der Überschrift; Registrierung zeigt „Schritt 1 von 2
· Konto", die Bestätigungsseite „Schritt 2 von 2 · Bestätigen" plus einen
Satz, der das Versprechen von `landing.html` aufgreift. `.empty__icon.gold`
→ `.empty__icon.betont` (styles.css + zwei Fundstellen in app.js).
`probelauf.mjs` — Firebase-Auth-Stub simuliert drei Anmeldezustände über
`?probe=`, zwei neue Bildschirme (Registrierung, Bestätigung).
`app.js:19`/`sw.js:10` auf 3.3.2. `CHANGELOG.md`.

**Entscheidung:** `AUFTRAG.md` verlangt für Block 5 „nie bei 0 % anfangen
(Video 3), aber **kein** erfundener Assistent". Das ist eine enge Vorgabe —
sie schließt eine Fortschrittsleiste, einen Einrichtungs-Wizard oder
zusätzliche Bildschirme aus. Was bleibt, ist **Rahmung mit vorhandenen
Mitteln**: `.eyebrow` gibt es seit 3.0.0 über jeder Sektion, dieselbe Rolle
funktioniert über einer `<h1>` auf einem Solo-Bildschirm genauso. Kein neues
Bauteil, keine neue Logik — zwei Wörter mehr Text auf zwei Bildschirmen, die
es ohnehin schon gibt.

Der zweite Fund war kein Gestaltungsproblem, sondern eine **gebrochene
Zusage**: `landing.html` verspricht „Danach legst du direkt deine erste Karte
an" — aber der erste Bildschirm nach der Registrierung ist eine
E-Mail-Bestätigung ohne jeden Bezug zu diesem Versprechen. Wer dort wartet,
hat keinen Grund mehr zu glauben, dass die Zusage noch gilt. Ein Satz genügt,
um sie am Leben zu halten.

**Bewusst nicht angefasst:** die E-Mail-Bestätigung selbst (Sicherheits-/
Rechtsentscheidung aus Phase 1/2, außerhalb dessen, was dieser Strang
lockert — `KONZEPT.md` §7) und der leere Erststart-Bildschirm („Noch nichts
in „Bereich""). Letzterer lief kurz als Kandidat mit, weil er wie eine
0-%-Situation aussieht — aber derselbe Code zeigt sich auch, wenn eine
erfahrene Nutzerin einen weiteren leeren Bereich anlegt. Eine
Erststart-Formulierung dort wäre für den zweiten, viel häufigeren Fall
falsch. **Konkreter Beleg statt Bauchgefühl:** Der Code-Pfad ist identisch
für beide Fälle (`cards.length === 0` in `renderLernen()`), es gibt kein
Signal, das „erstes Konto" von „n-ter leerer Bereich" unterscheidet.

**Geprüft:** Probelauf zeigt jetzt auch die beiden Bildschirme vor der
Anmeldung. Der Firebase-Auth-Stub liest `?probe=register` (kein Konto) bzw.
`?probe=bestaetigen` (Konto ohne verifizierte E-Mail) aus der URL — eine
Datei für drei Zustände statt drei Dateien.

**Offen:**
- Damit sind alle sechs Blöcke aus `AUFTRAG.md` durch. Der Strang
  „Oberfläche & Mobile-Gestalt" ruht, bis der Betreiber eine konkrete
  Schwachstelle nennt oder Feld 4 (`landing.html`, Marke: Serifen-Schlagzeile)
  bestätigt.
- Die Werkzeugleiste auf Verwalten (fünf Handlungen gleichzeitig) und Smart
  Defaults (Video 3) stehen weiter auf der Nachlese-Liste aus dem 2026-09-17-
  Eintrag zu Block 6 — nicht angefangen.
- `KONZEPT.md` §7 unverändert; die Lockerung gilt weiter nur für diesen
  Strang.

**Nächster Schritt:** Keiner zwingend. Falls weitergearbeitet wird: die
Werkzeugleiste auf Verwalten gegen Video 1 prüfen („Aktionen kommen und gehen
mit dem Zusammenhang") oder Smart Defaults für die Einstellungen/Formulare
umsetzen (Video 3, als „passt" eingestuft, noch nicht gebaut).

---

### 2026-09-17 — Block 6: die zwei sichtbarsten Video-1-Punkte (v3.3.0, v3.3.1)

**Geändert:** `styles.css` — `.nav` schwebt (Abschnitt 4), Rücknahme in
Abschnitt 17, `.view` und `.toast-wrap` ziehen nach. `app.js` — `tickCountups`
achtet auf `prefers-reduced-motion`; `karteSheet()` neu, `renderVerwalten()`
ohne Formular, `ui.karteSheet`, Handlungen `karte-neu`/`karte-sheet-zu`, leerer
Zustand mit Handlung, Zieh-Hinweis gekürzt. `probelauf.mjs` — läuft mit
abbestellter Bewegung, klickt direkt im DOM, ein Bildschirm mehr.
`app.js:19`/`sw.js:10` auf 3.3.1. `CHANGELOG.md`.

**Entscheidung:** Der Betreiber hat die Vorschau gesehen und gesagt, es gebe
„so viel, das ich in den Videos gesehen habe, hier nicht sehe". Statt breit zu
raten habe ich die beiden Punkte genommen, die Video 1 **wörtlich** nennt und
die auf jedem Bildschirm sichtbar sind:

1. **Die Leiste schwebt** („nowadays typically floating"). Der Unterschied ist
   nicht Schmuck: Eine Leiste an der Unterkante gehört optisch zum *Gerät*,
   eine schwebende zur *App*, und der Inhalt läuft sichtbar darunter durch.
2. **Das Karten-Formular ist ein Blatt** („the notes editor is just a notes
   editor — we don't throw in clutter"). Es stand fest oben auf dem
   Bildschirm, den man zum *Ansehen* aufruft, und füllte am Handy die erste
   Seite komplett. Von Liste und Suchfeld war beim Ankommen nichts zu sehen.

Beim zweiten Punkt war die Versuchung, gleich einen schwebenden Plus-Knopf
dazuzubauen, wie ihn das Video zeigt. **Nicht gemacht:** Die Handlung steht
schon als einziger gefüllter Knopf oben auf dem Bildschirm; ein zweiter Ort
für dieselbe Sache wäre ein erfundenes Feature und bräche Satz 1.

**Zwei Funde nebenbei, beide echt:**
- `tickCountups` ignorierte `prefers-reduced-motion`. Die `styles.css` setzt
  für abbestellte Bewegung jede Animation auf 0,01 ms — das greift nur bei
  CSS. Diese Zahl zählt in JavaScript hoch und lief als **einzige** Bewegung
  der App weiter. Gefunden, weil der Probelauf dort hängenblieb: Die wachsende
  Zahl ändert die Seitenhöhe, und der Browser hielt kein Element mehr für
  „stabil".
- Der leere Verwalten-Bildschirm sagte „Leg **oben** deine erste Karte an" —
  eine Anweisung, die ab 3.3.1 ins Leere zeigte. Solche Sätze veralten
  unbemerkt; jetzt steht dort ein Knopf statt einer Ortsangabe.

**Offen — und das ist die ehrliche Liste dessen, was aus den Videos NICHT
gebaut ist:**
- **Wischen zum Zurückgehen** und **Long-Press mit Vorschau** (Video 1).
  `PRINZIPIEN.md` sagt „keine neuen Gesten ohne echten Gewinn", und genau
  Wischen und Long-Press waren in v3.0.35–42 die wackeligen Stellen.
- **Smart Defaults** (Video 3) — als „passt" eingestuft, aber nirgends
  umgesetzt. Kandidat für den nächsten Durchgang.
- **Verlustaversion, Countdown, Anker-Preise** (Video 3) — bewusst verworfen,
  siehe `PRINZIPIEN.md`. Markenfremd.
- **Stack-Wechsel und Bezahlung** (Video 2) — verworfen bzw. Gerüst.
- Die Werkzeugleiste auf dem Verwalten-Bildschirm zeigt fünf Handlungen
  gleichzeitig (Üben, Umkehren, Auswählen, Umbenennen, Löschen). Video 1:
  Handlungen kommen und gehen mit dem Zusammenhang. Noch nicht angefasst.
- Block 5 (Erststart) steht weiter aus.

**Nächster Schritt:** Block 5 — Erststart. Dafür braucht der Probelauf eine
Attrappe **ohne** Karten; bisher startet er immer mit fertigen Daten.

---

### 2026-09-17 — Block 4 fertig: landing.html spricht dieselbe Sprache (v3.2.3)

**Geändert:** `landing.html` — fünfzehn eigene Schriftgrößen auf `--fs-*`,
Radien auf `--r-*`, Schlagzeile und Abschnittstitel in die Serifenschrift mit
`clamp()`, Hauptknopf vollrund mit `--ctrl-lg`, `100vh` → `100svh`,
Stufenleiter von Kachelraster auf eine Spalte mit Balken, Knopf-Erklärung als
Raster, Zeilenhöhe des Vorspanns, Fokusrahmen im Kontaktformular repariert,
Geräteränder am Kontaktblock. `app.js:19`/`sw.js:10` auf 3.2.3. `CHANGELOG.md`.

**Entscheidung:** `AUFTRAG.md` verlangt für „fertig", dass App und Startseite
**eine** sichtbare Sprache teilen. Seit 3.1.0 taten sie das nicht mehr — die
Seite führte ihre eigene Skala und ihre eigene Knopfform. Der Kommentar oben
in ihrem `<style>` behauptete sogar das Gegenteil („bringt keine eigenen
Farben und keine eigenen Abstände mit"); für Schriftgrößen, Radien und
Knopfform stimmte das nie.

Die einzige Entscheidung, die über bloßes Angleichen hinausgeht, ist die
**Serifenschrift für die Schlagzeile**. Begründung: Satz 4 trennt Bedienung
von Stoff, eine Schlagzeile ist Stoff, und in der App stehen h1–h4 in der
Serifenschrift. Die Startseite las sich vorher wie eine fremde Seite *vor*
der App statt wie ihre Vorderseite. **Das ist eine sichtbare Markenentscheidung
— der Betreiber kann sie zurücknehmen, dann steht hier, warum.**

**Der beste Fund war ein Fehler, kein Geschmack:** Das Kontaktformular hatte
gar keinen sichtbaren Fokusrahmen. `rgba(var(--accent-rgb), 0.1)` — die
Variable gibt es nicht, der ganze `box-shadow` war ungültig, und darüber stand
`outline: none`. Wer mit der Tastatur durch das Formular geht, sah nicht, wo
er steht. Genau dieser Fehler war in `styles.css` schon einmal gefunden und
behoben worden (Kommentar bei `.drag-handle`); die zweite Stelle blieb stehen.
**Lehre: Wenn ein Fund ein Muster ist, im ganzen Repo danach suchen, nicht nur
an der Fundstelle.**

Die Stufenleiter ist der Fall, in dem Video 1 wirklich etwas beiträgt: Sie war
ein Kachelraster, also ein Abschnitt in zwei Richtungen. Sie ist aber eine
**Reihenfolge** — im Zickzack gelesen sieht man nicht, dass die Abstände
wachsen. Eine Spalte plus Balken zeigt es. Der Balken ist kein Schmuck: er
stellt dieselbe Zahl dar, die daneben steht.

**Offen:**
- **Nicht am Gerät geprüft** — geprüft ist Chromium bei 390px und 1194px,
  ohne waagerechtes Scrollen, ohne Seitenfehler.
- Die **Serifen-Schlagzeile** ist eine Markenentscheidung, keine Korrektur.
- Block 5 (Erststart) steht noch.

**Nächster Schritt:** Block 5 — der Weg von „Konto angelegt" bis zur ersten
eigenen Karte. Zuerst ansehen, was heute passiert: Der Probelauf startet immer
mit fertigen Daten, für diesen Block braucht er eine Attrappe **ohne** Karten.

---

### 2026-09-17 — Block 3 fertig: Übergänge auf der Bühne (v3.2.2)

**Geändert:** `styles.css` Abschnitt 9 — `.view--modus { animation: none }`
und `.study-card.zugedeckt .study-word` mit `enter-rise`. `app.js` — die
Bühne trägt `zugedeckt`, solange die Antwort verborgen ist.
`probelauf.mjs` — klickt drei Bewertungen durch und liest danach den Zustand
der Bühne aus. `app.js:19`/`sw.js:10` auf 3.2.2. `CHANGELOG.md`.

**Entscheidung:** Der letzte offene Punkt von Block 3 waren die Übergänge.
Befund: Es gab gar keinen eigenen — `.view` blendete bei **jeder** Handlung
den ganzen Bildschirm auf, weil `render()` das Markup jedes Mal ersetzt. Beim
Aufdecken der Antwort hieß das: Das Wort blendete mit auf, obwohl es sich
nicht geändert hatte. Video 1 sagt zu Übergängen, sie sollen die Richtung der
Handlung tragen; eine Blende über allem trägt gar nichts.

Die Trennung braucht eine Markierung im Markup, sonst geht sie nicht: Weil
`render()` alles neu baut, kann CSS nicht wissen, ob dieselbe Karte nur
aufgedeckt wurde oder eine neue gekommen ist. `zugedeckt` sagt es — und es
fällt mit „neue Karte" zusammen, weil eine frische Karte immer verdeckt
beginnt. Kein neuer Zustand, nur ein sichtbar gemachter.

**Bewusst nicht gebaut:** eine Rückmeldung nach dem Bewerten (Haken, Farbblitz,
Zähl-Animation). Der Fortschrittsstrich in der Modusleiste rückt bereits vor,
und die nächste Karte kommt — das ist die Rückmeldung. Etwas Zusätzliches
wäre gegen die ruhige Gestalt und steht in keinem der drei Videos.
**Ebenfalls nicht angefasst: die Gesten.** `PRINZIPIEN.md` sagt „keine neuen
Gesten ohne echten Gewinn", und genau Wischen und Long-Press waren in
v3.0.35–42 die wackeligen Stellen.

**Geprüft:** Probelauf über drei Bewertungen (Sicher → Fast → Nicht). Danach
steht „Karte 3 von 11" und die Bühne ist wieder zugedeckt — richtig, denn
„Nicht" hängt die Karte wieder an und zählt nicht als erledigt. Keine
Seitenfehler.

**Offen:**
- **Die Bewegung selbst ist nicht am Gerät geprüft.** Ein Standbild zeigt
  keine Animation; der Probelauf kann nur den Zustand davor und danach lesen.
  Ob der Wechsel sich gut anfühlt, kann nur der Betreiber sagen.
- Gesten (Wischen, Long-Press) bleiben ungeprüft — siehe oben, bewusst.
- Blöcke 4 (`landing.html`) und 5 (Erststart) stehen noch.

**Nächster Schritt:** Block 4 — `landing.html` mobil-first, auf Grundlage von
`../landing-page-strategie/STRATEGIE.md`. Die Seite hat eigene Stile neben den
Token aus `styles.css`; erster Schritt ist zu prüfen, wo sie seit dem
Schriftwechsel in 3.1.0 nicht mehr mitgezogen ist.

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
