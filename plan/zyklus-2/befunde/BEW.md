# BEW – Bewegung, Animation, Flüssigkeit, Formate, Abstände (Zyklus 2)

Prüf-Agent BEW, 01.10.2026, Stand 3.18.10 (`436dc78`). Nur gelesen und
gemessen, kein Code geändert. Skripte und Fotos:
`<scratchpad>/audit/BEW/`.

**Arbeitsstand:** Datei wird laufend ergänzt (Abbruchschutz).

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

---

## Geprüft ohne Fund

(werden ergänzt)
