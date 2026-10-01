# BEW – Bewegung, Animation, Flüssigkeit, Formate, Abstände (Zyklus 2)

Prüf-Agent BEW, 01.10.2026, Stand 3.18.10 (`436dc78`). Nur gelesen und
gemessen, kein Code geändert. Skripte und Fotos:
`<scratchpad>/audit/BEW/`.

**Stand:** abgeschlossen. 15 Funde (1 hoch, 9 mittel, 5 niedrig). Messskripte:
`m1.js` (Inventar, Blatt-Austritt, Leerlauf, Chips), `m2_css.js` (CSSOM mit
Gegenprobe), `m3.js` (Runde, Rundenende, Wisch, reduzierte Bewegung), `m4.js`
(Standbilder Rundenstart), `tokens.js` (Token-Zählung). Chrome 154 headless,
Handy-Profil 390×844, Firebase-Attrappe; kein WebKit, kein echtes Gerät.

---

## 0. Regeltabelle (recherchiert 01.10.2026)

Quellen (alle abgerufen am 01.10.2026):

- [A1] Apple HIG Motion – https://developer.apple.com/design/human-interface-guidelines/motion
- [A2] Apple HIG Buttons – https://developer.apple.com/design/human-interface-guidelines/buttons
- [A3] Apple HIG Typography – https://developer.apple.com/design/human-interface-guidelines/typography
- [A4] Apple HIG Layout – https://developer.apple.com/design/human-interface-guidelines/layout
- [M1] Material 3 Easing and duration – https://m3.material.io/styles/motion/easing-and-duration
  (Seite ist eine App; Zahlenwerte gegengelesen in Flutters Umsetzung der
  M3-Tokens: https://codebrowser.dev/flutter/flutter/packages/flutter/lib/src/material/motion.dart.html)
- [M2] Material 3 Spacing – https://m3.material.io/styles/spacing/overview
- [M3] Material 3 Typografie in Compose – https://developer.android.com/develop/ui/compose/designsystems/material3
- [W1] WCAG 2.2 SC 2.5.8 – https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- [W2] WCAG 2.2 SC 2.3.3 – https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- [W3] WCAG 2.2 SC 2.2.2 – https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- [D1] web.dev INP – https://web.dev/articles/inp
- [D2] web.dev CLS – https://web.dev/articles/cls
- [D3] web.dev Animations guide (Stand 06.10.2020) – https://web.dev/articles/animations-guide

### 0.1 Abstände, Trefferflächen, Schrift

| Thema | Regel | Quelle | App heute |
|---|---|---|---|
| Abstandsraster | Grundeinheit 8 dp, kleine Teile und Schriftlinien auf 4 dp | M2 | `--space-1…10` = 4/8/12/16/20/24/32/40/48/64 px – passt |
| Gleichmäßige Abstände | „Use consistent spacing" – sonst kein Raster mehr erkennbar | A4 | Tokens vorhanden, Nutzung siehe Funde |
| Gruppieren | über Leerraum, Fläche oder Trennlinie | A4 | Satz 2 der `styles.css` – passt |
| Trefferfläche | mind. 44×44 pt (Apple), 48×48 dp (Material), WCAG AA 24×24 px | A2, M3, W1 | `--tap: 44px` – passt, wo genutzt |
| Druckzustand | „Always include a press state for a custom button" | A2 | `button:active scale(.975)` global |
| Lesetext | Body 17 pt, absolutes Minimum 11 pt | A3 | Wurzel 17 px, `--fs-micro` 11,7 px – passt |
| Schriftstufen | iOS: 34/28/22/20/17/16/15/13/12/11; M3: 22/16/14/12/11 | A3, M3 | `--fs-micro…2xl` = 11,7/13,8/14,9/15,9/17/19,1/22,3/27,6 px – deckt beide Leitern ab |

### 0.2 Bewegung

| Art | Dauer | Kurve | Quelle |
|---|---|---|---|
| Rückmeldung (Druck, Zustandsschicht, Schalter) | 50–200 ms (short1–short4) | standard `cubic-bezier(.2,0,0,1)` | M1 |
| Eintritt (Element/Seite kommt) | 250–400 ms, große Flächen bis 500 ms | emphasized decelerate `cubic-bezier(.05,.7,.1,1)` | M1 |
| Austritt (geht) | **kürzer als der Eintritt**, ~150–250 ms | emphasized accelerate `cubic-bezier(.3,0,.8,.15)` | M1 |
| Blatt/Dialog | wie Eintritt rein, wie Austritt raus; Wischgeste folgt dem Finger | M1, A1 | |
| Bleibt auf dem Schirm (Zustand ändert sich) | 250–500 ms | emphasized/standard | M1 |
| Häufige Handlungen | möglichst keine eigene Bewegung („avoid adding motion to UI interactions that occur frequently") | A1 | |
| Abbrechen | „Don't make people wait for an animation to complete" | A1 | |
| Reduzierte Bewegung | Bewegung aus Interaktion muss abschaltbar sein (AAA), Inhalt bleibt erreichbar | W2, A1 | |
| Automatische Bewegung > 5 s parallel zu Inhalt | braucht Stopp; Ladeanzeige allein ist ausgenommen | W3 | |
| Was animiert wird | nur `transform` und `opacity`; Layout-/Paint-Eigenschaften meiden | D3 | |
| Antwortzeit | nächstes Bild nach Eingabe ≤ 200 ms (INP „gut", 75. Perzentil) | D1 | |
| Sprünge | CLS ≤ 0,1; Verschiebung bis 500 ms nach Eingabe zählt nicht, `transform` zählt nie | D2 | |

**Zusammen mit LEHREN § 6.4** gilt für diese Prüfung: eine Bewegung pro
Ursache, 150–450 ms, endet bei dem, was sie zeigt, nur Neues bewegt sich,
Eintritte als `@keyframes`, Nachfedern sparsam, kein zweifaches Aufleuchten.

---

## 1. Funde

#### BEW-1: Blätter „fahren" beim Schließen nicht weg – sie frieren 190 ms ein und verschwinden dann hart
- Art: Fehler
- Schwere: hoch
- Beleg: `app.js:14116–14124` `spielAustrittsAnimation` setzt nur Inline-Stil
  `dlg.style.transform = "translateY(105%)"` und `huelle.style.opacity = "0"`.
  Das Blatt trägt aber `styles.css:3403` `animation: sheet-up … both`
  (Desktop `:3447` `enter-pop … both`), die Hülle `:3385` `enter-fade … both`.
  Eine beendete Animation mit Füllmodus `both` hält `transform: none` /
  `opacity: 1` fest und überstimmt jeden Inline-Stil (genau LEHREN § 6.4
  „haltende Animation" und § 4.x „beim Greifen `animation: none`").
  `blattWischen` macht es richtig (`:14333` `g.dlg.style.animation = "none"`),
  Knopf/Escape/Hintergrund nicht. **Verifiziert** (`m1.js`, je Bild gemessen):
  Bereich-Blatt per „Fertig", per Escape, Karten-Blatt per Schließen, Desktop
  per Escape – in allen vier Fällen bleibt der berechnete `transform`
  `matrix(1,0,0,1,0,0)`, die Hülle Deckkraft 1, Oberkante unverändert
  (520 px bzw. 361/294 px) bis 177–194 ms, danach ist das Blatt weg. Der Test
  von 3.9.3 (Logbuch `redesign-oberflaeche` 23.09.) hatte nur den Inline-Stil
  geprüft, nicht den berechneten Wert. Ausnahme: Hat zwischendurch ein
  `render()` mit gleichem Overlay-Schlüssel stattgefunden (`still-overlay`
  setzt `animation: none`), läuft die Bewegung – dasselbe Blatt schließt also
  mal weich, mal hart.
- Warum es stört: Jeder Tipp auf „Fertig"/„Schließen", jedes Escape und jeder
  Tipp daneben zeigt fast eine Fünftelsekunde lang keine Reaktion und dann
  einen Schnitt. Das ist das „hakelig"-Gefühl an der häufigsten
  Overlay-Handlung der App; dazu kommt die Wartezeit ohne Gegenwert.
- Vorschlag: In `spielAustrittsAnimation` vor dem Setzen
  `dlg.style.animation = "none"` und `huelle.style.animation = "none"`
  (wie `blattWischen`). Austritt nach Material kürzer und beschleunigend:
  ~200 ms, Kurve `cubic-bezier(.3,0,.8,.15)`; am Desktop (`min-width:600px`,
  mittiger Dialog) statt `translateY(105%)` Ausblenden + `scale(.96)` –
  sonst rutscht ein mittiger Dialog um seine eigene Höhe nach unten.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `m1.js`-Messung „Blatt-Austritt": berechneter `transform` ändert
  sich ab dem 2. Bild, Hüllen-Deckkraft fällt; bei `reducedMotion: reduce`
  sofort weg; `t_a11y.js` und `t_sprung.js` grün.

#### BEW-2: Eine Dauerschleife läuft auf jedem Gerät 60-mal pro Sekunde, auch am Handy
- Art: Fehler (Energie)
- Schwere: mittel
- Beleg: `app.js:13804–13834` `edgeScrollTick()` ruft am Ende immer
  `requestAnimationFrame(edgeScrollTick)` auf und wird beim Laden gestartet
  (`:13834`) – ohne Bedingung. Das Rand-Scrollen ist laut Kommentar nur für
  die Maus (`pointerType === "mouse"`), die Schleife läuft aber überall.
  **Verifiziert** (`m1.js`, Handy-Profil mit Touch, Lernen-Bildschirm, nichts
  angetippt, keine laufende CSS-Animation): 57 Bild-Rückrufe pro Sekunde.
- Warum es stört: Der Browser darf nie in den Leerlauf; auf dem Handy kostet
  das dauerhaft Akku und Takt, und jede andere Bewegung teilt sich den
  Hauptthread mit einer sinnlosen Schleife (Tempo-Messung nur Hinweis).
- Vorschlag: Schleife nur starten, wenn `pointermove` mit Maus eine Randzone
  meldet (`edgeScrollMouseY` innerhalb 70 px), und beenden, sobald die Maus
  die Zone verlässt oder `pointerleave` kommt. Ohne Maus läuft nichts.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `m1.js` „rAF im Leerlauf" am Handy 0/s; Desktop mit Maus am Rand
  scrollt wie bisher (Gegenprobe: Maus 30 px vom unteren Rand → `scrollY`
  wächst).

#### BEW-3: „Sicher" hat keinen Lichtring – eine verwaiste Zeile löscht die Regel
- Art: Fehler
- Schwere: mittel
- Beleg: `styles.css:2183–2184` stehen nach dem Kommentar zum entfernten
  Einladen-Puls noch `100% { box-shadow: … }` und eine einzelne `}` (Rest
  eines gelöschten `@keyframes`). Der Parser hängt die `}` an den Selektor
  der nächsten Regel, die damit ungültig wird: `styles.css:2185`
  `.karte-geist--known .karte-seite { animation: geist-glanz-gut … }`.
  **Verifiziert** (`m2_css.js`, CSSOM): Regel 369 ist im Original
  `.karte-geist--unknown`, die `--known`-Regel fehlt; Gegenprobe mit
  entfernten zwei Zeilen: alle drei Regeln 369–371 vorhanden.
- Warum es stört: Gerade die gute Antwort („Sicher") bekommt beim Wegfliegen
  keinen Ring in ihrer Farbe, „Nicht" und „Fast" schon. Die Rückmeldung ist
  ausgerechnet beim Erfolg schwächer. Außerdem ist es ein stiller Parserfehler,
  der jede künftige Regel an dieser Stelle verschlucken würde.
- Vorschlag: Zeilen `styles.css:2183–2184` löschen. Mustersuche: die
  Datei einmal durch einen CSS-Parser schicken (z. B. Anzahl Regeln
  Quelltext vs. CSSOM) und das als Prüfung in `pruefe_stand.mjs` aufnehmen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `m2_css.js` meldet alle drei `karte-geist--…​ .karte-seite`-Regeln;
  `t_bild.js`-Foto `g-60` zeigt den grünen Ring.

#### BEW-4: Übungs-Chips: jeder Tipp lässt alle Haken neu aufploppen und schiebt die Nachbarn 20 px
- Art: Bewegung
- Schwere: mittel
- Beleg: `styles.css:2403` `.stufe-chip .i { animation: enter-pop 220ms
  var(--ease-spring) both; }` steht nicht unter `#app:not(.still-ansicht)` und
  nicht in der Liste `styles.css:555–568`. `app.js:13007–13009` setzt den Haken
  nur bei aktivem Chip ins Markup → der Chip wird 20 px breiter/schmaler.
  **Verifiziert** (`m1.js`, Verwalten → Üben): Tipp auf Chip 1 → alle vier
  noch aktiven Haken starten `enter-pop` bei t = 0; Chip 1 schrumpft von 156
  auf 136 px, „frisch gelernt" rutscht von x 193 auf 173. Zweiter Tipp: die
  drei übrigen Haken poppen erneut, wieder 20 px Versatz.
- Warum es stört: Nur das, was sich ändert, soll sich bewegen (LEHREN § 6.4);
  hier federt die ganze Reihe bei jedem Tipp, und die Nachbarn springen unter
  dem Finger weg (LEHREN § 6.1 „wechselnde Beschriftungen feste Breite").
  Bei langen Gruppennamen kann ein Chip in die nächste Zeile umbrechen.
- Vorschlag: Haken-Platz immer reservieren (Icon immer im Markup, ohne Haken
  `visibility: hidden` oder `opacity: 0`), Pop nur am gerade getippten Chip
  (Klasse `stufe-chip--frisch` aus dem Klick, eine Bewegung) oder die Regel
  unter `#app:not(.still-ansicht)` stellen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Chip-Positionen vor/nach Tipp gleich (±1 px), nach Tipp läuft
  `enter-pop` höchstens an einem Element.

#### BEW-5: Beim Start jeder Runde leuchtet die ganze Bühne als heller Kasten auf, und die Seite schiebt zusätzlich seitlich
- Art: Bewegung
- Schwere: mittel
- Beleg: `app.js:5900` / `:5522` / `:5593` `springeNachOben("sitzung")` →
  `sprungAusfuehren` (`app.js:4004–4008`) setzt `.aufleuchten` auf
  `#sitzung` = die ganze `.study-card` (`app.js:11084`); `styles.css:572`
  `aufleuchten 1.1s`. Rest aus 2.16.0, als die Runde noch ein Kasten in einer
  Liste war. Dazu `styles.css:1807` `.view--modus { animation: none; }` –
  wird von `styles.css:648` `#app[data-richtung="vor"] .view` überstimmt
  (höhere Spezifität). **Verifiziert** (`m3.js`, `m4.js`): beim Start laufen
  gleichzeitig `enter-vor@view--modus 280ms`, `aufleuchten@study-card 1100ms`,
  `karte-kommt 420ms`, `stapel-rueckt 420ms` ×2, `fortschritt-waechst 520ms`;
  Hintergrund von `#sitzung` bei 60 ms `rgba(245,243,236,.133)` (hell
  `rgba(138,106,36,.14)`), `view` um 7,6 px verschoben. Foto
  `bilder/rundenstart-hell-60.png`: getönter Kasten mit runden Ecken über die
  ganze Höhe.
- Warum es stört: Eine Ursache (Runde beginnt), drei Bewegungen in drei
  Richtungen: Seite von rechts, Karte von unten, Kasten blendet aus. Der
  Kasten sieht aus wie ein Darstellungsfehler, nicht wie Absicht – und er
  kommt bei jeder Runde, jeder Übung und jeder Durchsicht.
- Vorschlag: `springeNachOben` in den drei Modus-Starts nur noch scrollen
  lassen (kein `aufleuchten`); `.view--modus`-Regel so schreiben, dass sie
  gewinnt (`#app[data-richtung] .view--modus { animation: none; }`) – oder
  bewusst entscheiden, dass der Seitenschub bleibt und dafür `karte-kommt`
  beim ersten Bild entfällt. Eine Bewegung pro Ursache.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `m3.js` „Runde Start" zeigt kein `aufleuchten` und höchstens eine
  Eintrittsbewegung der Karte; `abnahme_runde.js` 13/13.

#### BEW-6: Am Rundenende ist „Fertig" 1,3 Sekunden unsichtbar
- Art: Gefühl
- Schwere: mittel
- Beleg: `styles.css:2317` `.ende--neu .ende__aktionen { animation: enter-rise
  360ms var(--ease-out) 1300ms backwards; }`. **Verifiziert** (`m3.js`):
  direkt nach der letzten Bewertung Deckkraft `0` am Knopf „Fertig";
  insgesamt 13 Bewegungen, die letzte endet nach 2,8 s
  (`einstieg-flamme 700ms+1400 ×2`). G-043 hat das nur für „Bewegung
  reduzieren" behoben.
- Warum es stört: Der einzige Ausgang des Bildschirms ist nach jeder Runde
  1,3 s nicht zu sehen (aber schon antippbar – ein Tipp trifft blind). Apple:
  „Don't make people wait for an animation to complete". Wer drei Runden am
  Tag macht, wartet dreimal.
- Vorschlag: Knopf sofort sichtbar (höchstens `enter-rise` ohne Verzögerung),
  die Feier läuft darüber weiter. Ob die Feier selbst kürzer wird, siehe
  BEW-7.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Deckkraft von `.ende__aktionen` ≥ 0,9 spätestens 400 ms nach dem
  Erscheinen; `t_rundenende.js`, `t_fluessig_ende.js` grün.

#### BEW-7: Lernen und Fortschritt spielen bei jedem Besuch die volle Eintritts-Choreografie
- Art: Bewegung
- Schwere: mittel
- Beleg: `styles.css:1634–1776` (Lernen), `:4468–4493` (Fortschritt), alle
  unter `#app:not(.still-ansicht)` – also bei **jedem** Reiterwechsel, nicht
  nur beim ersten. **Verifiziert** (`m1.js`): Lernen 15 Bewegungen, Ende nach
  2400 ms (`ring-fuellen 1100ms`, `einstieg-schimmer 1100ms` ab 1300 ms über
  dem Startknopf, `einstieg-flamme 700ms ×2`, 7 Wochenpunkte mit Nachfedern);
  Fortschritt bis 1450 ms (`kal-aufdecken 1100ms`, `einstieg-wachsen 1000ms`,
  Blöcke mit `--ease-spring`); dazu jeweils `enter-vor/-zurueck` der ganzen
  Seite. Rundenende: Flamme ebenfalls zweimal (`styles.css:2316`).
  LEHREN § 6.4 sagt dazu wörtlich: Nachfedern „bei fünf nacheinander unruhig",
  „zweifaches Aufleuchten wirkt wie Werbung", 150–450 ms, eine Bewegung pro
  Ursache.
- Warum es stört: Nach jeder Runde und jedem Blick in Verwalten baut sich
  Lernen 2,4 s lang neu auf, der Startknopf blitzt nach 1,3 s. Beim ersten
  Mal ist das schön, beim zehnten Mal wirkt die App langsam („der man beim
  Denken zusieht", Kommentar `styles.css:574`).
- Vorschlag: Volle Choreografie nur beim ersten Zeigen je App-Start (Merker
  in `ui`, wie `countupLetzterWert` – LEHREN § 6.3), danach nur der
  Seitenwechsel (280 ms). Flamme einmal statt zweimal. Reihen (Wochenpunkte,
  Blöcke) mit `einstieg-punkt-ruhig`/`--ease-out` statt Feder. Lange Läufe
  (Ring, Kalender, Balken) auf ≤ 600 ms.
- Entscheidet: Betreiber
- Aufwand: klein bis mittel
- Abnahme: `m1.js`-Inventar: zweiter Besuch von Lernen ≤ 2 Bewegungen, Ende
  ≤ 300 ms; erster Besuch Ende ≤ 1200 ms; keine Bewegung mit `iterations 2`.
- Pro/Contra: **Dafür:** eigene Regeln des Betreibers (LEHREN § 6.4,
  „Energie ein Ticken runter"), Apple-Regel zu häufigen Handlungen, die App
  fühlt sich schneller an. **Dagegen:** Er hat am 24.09. ausdrücklich
  gewünscht, dass die Einstiegs-Bewegungen im Werkzeug vorkommen („gefallen
  mir sehr"); wer selten kommt, sieht sie gern. **Empfehlung:** behalten,
  aber nur einmal je App-Start und ohne Doppel-Aufleuchten – der Wunsch
  bleibt erfüllt, die Wiederholung fällt weg.

#### BEW-8: Sanftes Scrollen läuft trotz „Bewegung reduzieren"
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:14492` `window.scrollTo({ top: 0, behavior: "smooth" })`
  (Tipp auf den aktiven Reiter), `app.js:5971` `scrollGradeRowIntoView`,
  `app.js:8814` und `:8821` (Durchsicht) – alle ohne Abfrage von
  `prefers-reduced-motion`; nur `sprungAusfuehren` (`app.js:3992`) fragt.
  Die CSS-Regel `scroll-behavior: auto !important` (`styles.css:583`) wirkt
  nicht auf ein ausdrücklich übergebenes `behavior: "smooth"`.
  **Verifiziert** (`m3.js`, Kontext `reducedMotion: reduce`): Tipp auf den
  aktiven Reiter scrollt 900 → 0 px über rund 500 ms (29 Zwischenbilder).
- Warum es stört: Wer Bewegung abbestellt hat (Schwindel), bekommt eine
  durchlaufende Seite. LEHREN § 6.4: „Auch JavaScript-Bewegung muss die
  Einstellung respektieren"; WCAG 2.3.3.
- Vorschlag: eine Hilfsfunktion `scrollArt()` → `"smooth"`/`"auto"` und an
  allen vier Stellen benutzen; `t_a11y.js` um eine scrollY-Probe erweitern.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `m3.js` „ruhig: Tipp auf aktiven Reiter": scrollY im ersten Bild 0.

#### BEW-9: Wischen zwischen Reitern: alte Seite fliegt ganz hinaus, die neue ploppt aus 26 px herein
- Art: Gefühl
- Schwere: mittel
- Beleg: `app.js:6508–6514` Ausflug `translateX(±100%)` 200 ms, danach
  `knopf.click()` → `render()` → `styles.css:505–512` `enter-vor/-zurueck`
  (26 px, Deckkraft 0,6). **Verifiziert** (`m3.js`, je Bild): alte Seite bei
  262–279 ms auf −390 px (Bild leer), bei 297 ms steht die neue bei +26 px mit
  Deckkraft 0,60 und läuft bis 525 ms aus.
- Warum es stört: Der Finger schiebt eine ganze Seite weg, die nächste kommt
  aber nicht hinterher, sondern erscheint fast an Ort und Stelle. Dazwischen
  ein leeres Bild. Der Betreiber wollte hier ausdrücklich „was Flüssiges".
- Vorschlag: Nach einem Wisch die neue Seite aus der Gegenrichtung von weit
  herein (eigene Keyframes `enter-wisch-vor/-zurueck`, Start bei ±60–100 %
  Breite, Deckkraft 1), gesteuert über `data-richtung="wisch-vor"`; der
  Tipp auf die Leiste behält die kurzen 26 px.
- Entscheidet: Agent
- Aufwand: klein bis mittel
- Abnahme: Messung wie `m3.js`: kein Bild ohne sichtbare Seite, neue Seite
  startet bei |left| ≥ 200 px; `t_scrollen.js`/`t_leiste.js` grün. Gefühl am
  iPhone bestätigen (LEHREN § 5.6).

#### BEW-10: Einstieg, Plan: das automatische Mitscrollen lässt sich nicht anhalten
- Art: Gefühl
- Schwere: mittel
- Beleg: `app.js:7107–7131` `einstiegBauAutoScroll` und `:7133–7157`
  `einstiegPlanAutoScroll` (3600 ms) rufen in jedem Bild `window.scrollTo`
  auf; abgebrochen wird nur beim Bildschirmwechsel, nicht bei
  Berührung/Rad/Taste. **Vermutung** (aus dem Code, nicht im Browser
  gemessen): Wer während der 3,6 s selbst scrollt, wird im nächsten Bild
  zurückgesetzt. Die Übergabe vom 27.09. nennt „Abbruchlogik" selbst als
  offenen Stellhebel.
- Warum es stört: Apple: „Let people cancel motion". Wer schneller liest als
  die Bewegung, kämpft mit der Seite.
- Vorschlag: Beim ersten `touchstart`/`wheel`/`keydown` die Schleife beenden
  (`einstiegBauScrollStoppen`), Listener einmalig und passiv.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Test: während des Laufs `wheel`-Ereignis → `scrollY` bleibt
  danach, wo der Nutzer es hinstellt; `t_einstieg*.js` grün.

#### BEW-11: Meldung („Toast") verschwindet mit einem Schnitt
- Art: Bewegung (fehlt)
- Schwere: niedrig
- Beleg: `app.js:1827–1828` `const el = app.querySelector(".toast-wrap");
  if (el) el.remove();` nach 2600 ms; Eintritt dagegen `styles.css:3346`
  `enter-rise`. Aus dem Code verifiziert (kein Austritts-Stil vorhanden).
- Warum es stört: Sie kommt weich und ist dann plötzlich weg – das einzige
  Overlay ohne Austritt (sobald BEW-1 behoben ist).
- Vorschlag: vor `remove()` 160 ms Deckkraft auf 0 (`transition` am
  bestehenden Element ist hier richtig), bei reduzierter Bewegung sofort.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Deckkraft der `.toast` fällt über ≥ 5 Bilder, dann entfernt.

#### BEW-12: Übergänge und Regeln, die nie laufen (totes CSS rund um Bewegung)
- Art: Aufräumen
- Schwere: niedrig
- Beleg (alle gelesen; `render()` ersetzt die Elemente, `transition` auf
  frischem Element läuft nicht – `styles.css:483`):
  - `styles.css:2481` `.lern-karte { transition: opacity…, background… }` und
    `:2468` `.lern-balken span { transition: width }` – „Gesehen" schaltet
    hart um (Vermutung zur Wirkung, nicht gemessen);
  - `styles.css:2897` `.heute-bar span`, `:2906` `.stat-seg`
    `transition: width`;
  - `styles.css:930` `.modebar__fortschritt { transition: width }`,
    aufgehoben durch `:2249 transition: none`;
  - `styles.css:2236` `.grade-row button .sub` – die Unterzeilen sind
    entfernt (LEHREN § 3.5);
  - `styles.css:3151–3166` erste `.boot`-Fassung samt `@keyframes bootIn`
    und erstem `.boot--exit` (`ease`, kein Token) – überschrieben durch
    `:3178–3182` und `:3271`;
  - `styles.css:1596–1603`/`:1636–1644` `.stapel` zweimal, `:1856–1861`/
    `:2226` `.grade-row`-Animation gesetzt und wieder genommen, `:1808` und
    `:1944` `.study-word`;
  - `m3.js`: `enter-rise@study-answer.platz-leer` läuft unsichtbar bei jeder
    Karte;
  - `m1.js`: Verwalten am Handy – 7 der 14 gestaffelten Zeilen liegen
    außerhalb des Bildes, die Staffelung läuft trotzdem bis 724 ms.
- Warum es stört: Die nächste Sitzung liest diese Regeln als wirksam
  (LEHREN § 3.2). Zwei der Fälle führen zu BEW-3-artigen Fehlern, wenn
  jemand daran weiterbaut.
- Vorschlag: löschen bzw. zusammenlegen; für „Gesehen" entweder echte
  Keyframes am neu gezeichneten Element oder beim Antippen die Klasse am
  bestehenden Element setzen (kein `render()`).
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep` findet die genannten Zeilen nicht mehr; Fotovergleich
  aller Bildschirme vor/nach ohne Unterschied; `t_boot_geometrie.js` grün.

#### BEW-13: Für Bewegung gibt es Token, aber die Praxis benutzt sie kaum
- Art: Aufräumen
- Schwere: niedrig
- Beleg: `styles.css:267–273` kennt vier Dauern (90/140/200/280 ms) und drei
  Kurven. `tokens.js` (eigene Zählung, Abschnitt 1 ausgenommen): **76 von
  123** `transition`/`animation`-Angaben tragen rohe Zeiten, über 25
  verschiedene Werte (300 ×8, 320, 340, 360, 380, 420, 440, 460, 480, 540,
  560, 620, 700, 900, 1000, 1100 …). Eine Kurve für Austritte
  (beschleunigend) fehlt; alle Austritte benutzen `--ease-out`
  (`app.js:6362`, `:6508`, `:14120`, `styles.css:2196–2199`).
  `--ease-spring` hängt an Reihen (`styles.css:1705`, `:4470`, `:4485`,
  `:2313`).
- Warum es stört: Ohne Leiter entscheidet jede Stelle neu; so entstehen 300,
  320, 340 und 360 ms für dieselbe Sache (Zeile kommt herein).
- Vorschlag: Token-Leiter nach Material: `--dur-feedback 100`,
  `--dur-kurz 200`, `--dur-eintritt 300`, `--dur-gross 400`,
  `--dur-austritt 200`; Kurven `--ease-eintritt: cubic-bezier(.05,.7,.1,1)`,
  `--ease-austritt: cubic-bezier(.3,0,.8,.15)`; bestehende Werte darauf
  abbilden (mechanisch, mit Fotovergleich). In LEHREN § 6.4 als Tabelle.
- Entscheidet: Agent
- Aufwand: mittel
- Abnahme: `tokens.js` „dauer": Rohwerte ≤ 15 (nur begründete Sonderfälle:
  Kartendrehung, Halte-Knopf, Ladeschleife).

#### BEW-14: Einzelne Größen und Abstände am Token-Satz vorbei
- Art: Aufräumen
- Schwere: niedrig
- Beleg: `tokens.js`: Abstände 88 von 586 mit Rohwert (meist 2–4 px, in
  Ordnung), Radien 10 von 131, Schrift 19 von 123. Auffällig:
  `app.js:13341` `style="padding:4px 0 2px; font-size:0.84rem"` (Größe, die
  es in der Leiter nicht gibt); `app.js:9032` `margin-top:14px`,
  `app.js:9025` `padding:0 0 12px`, `app.js:9066/9068/9081/9086/13329`
  `padding:6px 0…`; `app.js:11407` `border-radius:8px` (Token wären 6 oder
  10); `styles.css:5227` `font-size: var(--text-lg, 1.125rem)` – `--text-lg`
  gibt es nicht, es greift nur der Rückfallwert; `styles.css:3045`
  `2.25rem`, `:3061`/`:3226`/`:5244` `1.5rem`, `:4550` `1.6rem`;
  Rechtsseiten `:5275` `1.15rem`, `:5314` `1.35rem`, `:5328` `1.1rem`,
  `:5351` `0.85rem`; `styles.css:2426` Radius `14px`.
- Warum es stört: README Satz 3: „Keine neue Größe erfinden". 0,84 rem
  (14,3 px) neben `--fs-xs` (13,8) und `--fs-sm` (14,9) ist genau das.
- Vorschlag: auf den nächsten Token setzen (`--fs-xs`, `--space-3`,
  `--space-2`, `--r-sm`), `--text-lg` → `--fs-lg`; für große Zahlen einen
  Token `--fs-3xl` einführen statt vier verschiedener rem-Werte.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `tokens.js` „schrift": nur noch `clamp()`-Titel und die Wurzel;
  `grep -n 'font-size:0\.' app.js` leer; `t_sprung.js`, `t_kontrast.js` grün.

#### BEW-15: Ladebildschirm: Ausblenden wird 40 ms vor seinem Ende abgeschnitten
- Art: Bewegung
- Schwere: niedrig
- Beleg: `styles.css:3271` `.boot--exit { … transition: opacity .32s }`,
  `app.js:7652–7653` `bootEl.classList.add("boot--exit"); setTimeout(render,
  280);`. Danach kommt die App mit `enter-view` ab Deckkraft 0,45
  (`styles.css:493`, `:631`). Aus dem Code; Wirkung am Bild **Vermutung**.
- Warum es stört: kleiner Helligkeitssprung (fast 0 → 0,45) im ersten
  Eindruck der App.
- Vorschlag: eine Zahl für beide (JS liest die Dauer oder beide 280 ms);
  nach dem Boot `enter-fade` ab 0 statt `enter-view` ab 0,45.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Bildfolge des Starts ohne Deckkraft-Sprung > 0,2 zwischen zwei
  Bildern; `t_boot_geometrie.js`, `t_klein_boot.js` grün.

---

## 2. Inventar der Bewegungen (Stand 3.18.10)

„§" = entspricht Regeltabelle und LEHREN § 6.4. Reduzierte Bewegung: alle
CSS-Animationen/-Übergänge laufen über `styles.css:577–585` auf 0,01 ms
(Ausnahme Halte-Knopf, bewusst).

### 2.1 CSS – Eintritt und Seitenwechsel

| Bewegung | Anlass | Dauer / Kurve | von → bis | § |
|---|---|---|---|---|
| `enter-view` `.view` (`:631`) | Neuzeichnen ohne Richtung | 140 ms ease-out | Deckkraft .45 → 1 | ja |
| `enter-vor`/`-zurueck` (`:648`) | Reiter-/Tiefenwechsel | 280 ms ease-out | ±26 px, .6 → 1 | ja; nach Wisch BEW-9 |
| `enter-rise` `.solo`, `.empty`, `.lernen-gruss`, `.hinweis` | Bildschirm kommt | 200–420 ms ease-out | 8 px, 0 → 1 | ja |
| `sheet-up` `.dlg` / `enter-pop` ab 600 px | Blatt öffnet | 280 / 200 ms ease-out | 16 px bzw. Maßstab .96 | Eintritt ja, **Austritt BEW-1** |
| `enter-fade` `.dlg-backdrop` | Blatt öffnet | 140 ms | 0 → 1 | ja |
| `enter-rise` `.toast` | Meldung | 200 ms | 8 px | Eintritt ja, Austritt BEW-11 |
| `einstieg-zeile` Listen (`:4422`, `:4501`, `:1758`) | Bildschirm kommt | 300–320 ms, gestaffelt 28–70 ms | 10 px, Maßstab .985 | ja (max. 14) |
| `einstieg-kachel` `.stapel`, `.serie-karte`, `.stat-block`, `.profil`, `.ende__kachel` | Bildschirm kommt | 400–460 ms **Feder** | 10 px, .94 | Reihen mit Feder: BEW-7 |
| `ring-fuellen` (`:1659`) | Lernen kommt | **1100 ms** +250 | Strich 0 → Ziel | > 450 ms, BEW-7 |
| `einstieg-schimmer` Startknopf (`:1683`) | Lernen kommt | **1100 ms** +1300 | Lichtstreif | BEW-7 |
| `einstieg-flamme` (`:1690`, `:2316`, `:4109`) | Serie sichtbar | 700 ms **×2** Feder | Maßstab 1,3, Drehung | zweimal: BEW-7 |
| `einstieg-punkt` Wochenpunkte (`:1705`) | Lernen kommt | 380 ms Feder ×7 | Maßstab 0 → 1,25 → 1 | Feder in Reihe: BEW-7 |
| `einstieg-wachsen` Balken (`:4479`, `:4481`) | Fortschritt kommt | **900–1000 ms** | scaleX 0 → 1 | > 450 ms |
| `kal-aufdecken` (`:4482`) | Fortschritt kommt | **1100 ms** | clip-path | > 450 ms, kein transform/opacity |
| `spark-wachsen` (`:4485`) | Fortschritt kommt | 700 ms Feder ×7 | scaleY | Feder in Reihe |

### 2.2 CSS – Runde

| Bewegung | Anlass | Dauer / Kurve | § |
|---|---|---|---|
| `karte-kommt` (`:2073`) | neue Karte | 420 ms Feder | ja |
| `stapel-rueckt` (`:2074`) | neue Karte | 420 ms | ja |
| `karte-wende` + `karte-hebt` + `karte-schatten` + `vorn-weg` (`:2093–2145`) | Aufdecken | 540 ms, Feder-Kurve | bewusst (3.15.0), über 450 ms |
| `bewertung-da` (`:2231`) | Aufdecken | 200 ms +140 | ja |
| `geist-rechts/-links/-sinkt/-weiter` (`:2196–2199`) | Bewertung | 260 ms ease-out | ja |
| `geist-glanz*` (`:2185–2190`) | Bewertung | 260 ms, `box-shadow` | „Sicher" fehlt: **BEW-3** |
| `fortschritt-waechst` (`:2247`) | jede Karte | 520 ms | knapp über 450 ms |
| `aufleuchten` auf `#sitzung` | Rundenstart | 1100 ms | **BEW-5** |
| `.ende--neu …` (`:2276–2317`) | Rundenende | 13 Bewegungen bis 2,8 s | BEW-6, BEW-7 |
| `mitte-weg/-her` (`:2412`) | erste Übungskarte | 3,8 s, einmal | ja (einmal, < 5 s) |
| `stern-pop` (`:1907`) | Merken | 420 ms Feder | ja |

### 2.3 CSS – Rückmeldung und Zustand (Übergänge)

| Bewegung | Dauer | § |
|---|---|---|
| `button:active` Maßstab .975 (`:1056`), Bewertung .95 (`:2235`) | 60 ms | ja |
| `.nav::before` Reiter-Anzeiger (`:856`) | 280 ms | ja |
| `input.schalter::after` (`:2437`) | 220 ms Feder | ja |
| `.segment__teil span`, `.stufe-chip`, `.bereich-pill` | 140 ms | ja |
| `.stufe-chip .i` `enter-pop` (`:2403`) | 220 ms Feder | **BEW-4** |
| `.einstieg-hero__dreh` (`:3872`) | 560 ms | bewusst (3.17.22) |
| `griff-halten` (`:2643`), `halten-fuellen` (`:4635`) | 350 ms / 1800 ms | ja (Anzeige einer Haltezeit) |
| tote Übergänge | – | BEW-12 |

### 2.4 CSS – Dauerläufer

| Bewegung | Lauf | § |
|---|---|---|
| `dreh` Ladekreis (`:1154`), `schimmer` Skelett (`:3138`) | endlos, nur während des Ladens | ja (W3: Ladeanzeige) |
| `boot-hof` (`:3203`), `boot-linie` (`:3244`) | endlos, nur Ladebildschirm | ja |
| `einstieg-atmen` (`:4171`) | endlos, nur während des Plan-Aufbaus | ja |
| `brief-schweben` ×2, `puls` ×6 (`:4577`, `:4591`) | begrenzt (G-082) | ja |

### 2.5 JavaScript

| Bewegung | Stelle | Dauer | reduzierte Bewegung | § |
|---|---|---|---|---|
| `tickCountups` | `app.js:6571` | 480 ms, einmal je Wert | ja | ja |
| Karte wischen / zurückfedern | `app.js:6292–6376` | 180 / 260 ms | folgt dem Finger | ja |
| Reiter wischen | `app.js:6437–6537` | 200 / 260 ms | folgt dem Finger | BEW-9 |
| Blatt wegwischen | `app.js:14297–14359` | 200 / 220 ms | ja | ja |
| Blatt schließen per Knopf/Escape | `app.js:14116` | 190 ms Wartezeit | ja | **BEW-1** |
| `kartenAbflug` | `app.js:6094` | 260 ms (CSS), Kopie 340 ms | ja | ja |
| Sanftes Scrollen | `app.js:4005`, `:4015` (mit Abfrage); `:5971`, `:8814`, `:8821`, `:14492` (ohne) | Browser | **BEW-8** | |
| Einstieg: Mitscrollen | `app.js:7107–7157` | Aufbau / 3600 ms | ja | BEW-10 |
| Einstieg: Karte dreht nach 2,4 s | `app.js:7452–7462` | Timer setzt Klasse | ja | ja |
| Ladebildschirm aus | `app.js:7652` | 280 ms | CSS | BEW-15 |
| Halte-Knopf | `app.js:9549–9563` | 1800 ms | bewusst echt | ja |
| Ziehen: Rand-Scrollen, Auslauf | `app.js:13502`, `:13693` | solange gezogen wird | – | ja |
| `edgeScrollTick` | `app.js:13804–13834` | **endlos** | – | **BEW-2** |
| `fuehlbar` (Vibration) | `app.js:154` | 4–10 ms | ja | ja |

---

## Geprüft ohne Fund

- Reduzierte Bewegung in CSS: `styles.css:577–585` setzt Dauer, Verzögerung
  und Wiederholung global zurück; Halte-Knopf bewusst ausgenommen
  (`:4643`); Einstieg schaltet Zier-Animationen ab (`:4376–4384`).
- `still-ansicht`/`still-overlay` (`app.js:8659–8675`): Karte speichern bei
  offenem Karten-Blatt lässt Blatt und Hülle **nicht** neu einfahren
  (`m3.js`, zweimal „Hinzufügen": keine `sheet-up`/`enter-fade`-Animation).
- Einstellungen-Eintritt: 12 Bewegungen, Ende nach 475 ms (`m1.js`) – im
  Rahmen.
- Verwalten-Eintritt: höchstens 14 Zeilen animiert (`m1.js`), wie LEHREN
  § 6.4 verlangt.
- Runde, Karte zu Karte: `geist-*` 260 ms + `karte-kommt` 420 ms – eine
  Ursache, ein Wechsel; Karte drehen 540 ms ist dokumentierte
  Betreiber-Abstimmung (3.15.0/3.17.40), nicht neu gemeldet.
- Kein Endlos-Lauf außerhalb von Ladezuständen (`m1.js`: `endlos: []` auf
  Lernen, Fortschritt, Verwalten, Einstellungen).
- Abstands-Token: 498 von 586 Abstands-Deklarationen und 121 von 131 Radien
  nutzen Token; die rohen Werte sind fast alle 1–4 px (Haarlinien, Punkte).
- Trefferflächen: `--tap` 44 px durchgehend für Knöpfe (G-063 erledigt);
  nicht neu vermessen.
- Tippen-Rückmeldung: globaler Druckzustand `button:active`
  (`styles.css:1056`), Kartenzeile (`:2566`), Reiter (`:895`),
  Bereichs-Pille (`:773`) vorhanden.
- Einstieg-Bewegungen: nach E-13 (teilweise entschieden) nicht neu bewertet.

## Nicht mehr geprüft (Zeit)

- CPU-4×-Läufe (`t_fluessig*.js`) – wegen paralleler Agenten ohnehin nur
  Hinweis.
- Texte auswendig lernen (Probelauf): Bewegungen dort nicht inventarisiert.
- Abschnitt 17 (breite Bildschirme) und 18 (Rechtsseiten) nur in der
  Token-Zählung, nicht am Bild.
- Dunkel/Hell-Fotos jeder Bewegung; echtes iPhone (WebKit) gar nicht.
- Ob beim Löschen/Verschieben einer Karte in Verwalten eine Bewegung fehlt
  (harter Wechsel) – nicht gemessen.
- BEW-10 und BEW-15 sind nur aus dem Code belegt (als Vermutung markiert).
