# EIN – Befunde Onboarding / Einstieg (Zyklus 2, B1)

Stand: 3.18.10 (`436dc78`), geprüft am 01.10.2026.

Prüfstand: Chrome 154 (`C:\Program Files\Google\Chrome\Application\chrome.exe`),
Firebase-Attrappe (`stubs.js`). Server `127.0.0.1:8099` fiel während der
Prüfung aus, danach eigener Server auf `8131` (`PRUEF_PORT`). Eigene Skripte,
Messprotokolle und Fotos unter `scratchpad/audit/EIN/` (`geo.js`,
`gezielt.js`, `nachklang.js`, `geo_*.txt`, `g1.txt`, `g2.txt`, `bilder/`).
Gemessen: Handy 390×844 (dunkel, hell + reduzierte Bewegung), klein 320×568
(hell und dunkel), 375×667, 360×740, iPad 820×1180 (hell).
Nicht prüfbar: echtes iOS (installierte App, Tastatur, Zurück-Geste), echte
Mails, Gefühl einer Bewegung am Gerät.

Bereits bekannt, nicht neu gemeldet: E-11 (Plan: Wege vor die Leiter), E-12
(Zurück-Taste/-Geste im Einstieg), E-13 (Einstieg ruhiger: vier Bewegungen je
Tipp, Balken-Schimmer bei jedem Schritt) – alle drei **noch offen** beim
Betreiber (`grossplan/ENTSCHEIDUNGEN.md`, Spalte „Entschieden" leer). G-042
Restteil (Zeitgrenze für den Nachklang bei Abbruch ohne Konto) **noch offen**:
gemessen, nach Neuladen auf dem Konto-Formular liegt
`adrabic-einstieg-nachklang` weiter auf dem Gerät. Kopfkommentar
„Ueberspringen auf jedem Fragebildschirm" (`app.js:6616`): bekannt aus
`AUFTRAG.md` § 4.

---

#### EIN-1: Der Nachklang („Dein Plan steht. Jetzt deine erste eigene Karte." + Wenn-dann-Satz) erscheint nach der Kontoerstellung nie
- Art: Fehler
- Schwere: hoch
- Beleg: `app.js:2413–2426` (G-042, 3.17.42): `if (!cloudDocExists) { … localStorage.removeItem(EINSTIEG_ANTWORT_KEY); nachklangLoeschen(); }`. Bei einem **neuen** Konto läuft zuerst der Zweig `if (!data)` (`app.js:2391–2411`: `cloudDocExists = false`, `persistAll()`); der nächste Schnappschuss bringt das eben angelegte Dokument, `cloudDocExists` ist dann noch `false`, also wird der Nachklang gelöscht, bevor `renderLernen` ihn liest (`app.js:10119`). Gemessen (`nachklang.js`, ganzer Einstieg mit „nach dem Maghrib-Gebet" → Plan speichern → Konto anlegen): vor dem Anlegen steht `{"satz":"Nach dem Maghrib-Gebet mache ich eine Runde."}`, danach Zustandsfolge `form → boot → liste-ohne-NK`; der mitgeschnittene `removeItem` kommt aus `nachklangLoeschen (app.js:1518) < app.js:2425`. Foto `bilder/erste-karte-handy.png` (nur „Dein Start"). Verifiziert in der Attrappe. Im echten Firestore kommt das Echo des eigenen `persistAll()` ebenso an (Zeile 2386 lässt es durch, solange `cloudDocExists` falsch ist) – aus dem Code gelesen, am echten Projekt nicht geprüft.
- Warum es stört: Der gewählte Satz ist laut eigenem Kommentar (`app.js:1488–1504`) der einzige belegte Teil des Einstiegs, und „Jetzt deine erste eigene Karte" ist der zugesagte Abschluss. Beides kommt bei keinem neuen Nutzer mehr an – seit 3.17.42, also genau durch die Behebung von G-042. Die Datenschutzerklärung Punkt 7 beschreibt den Satz weiter.
- Vorschlag: Im Zweig `if (!data)` merken, dass das Konto gerade frisch ist (Variable neben `cloudDocExists`, beim Auth-Wechsel zurücksetzen), und die Löschung in Zeile 2424/2425 nur ausführen, wenn es **kein** frisches Konto ist. `t_einstieg_bestandskonto_g042.js` um den Fall „neues Konto behält den Nachklang bis zur ersten Karte" ergänzen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Neuer Nutzer, Einstieg mit Zeitpunkt → Konto: `.nachklang` mit dem gewählten Satz steht auf dem leeren Lernen-Bildschirm, auch 3 s später; nach der ersten Karte ist der Schlüssel weg. Bestandskonto: beide Schlüssel weiter `null` (G-042 bleibt grün).

#### EIN-2: Probekarte springt beim Antippen doch noch 25 px – wenn „Ich vergesse Wörter schnell wieder" gewählt ist (G-039 nur halb behoben)
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:7272–7277`: Untertitel vor dem Aufdecken bei Hürde „vergessen" `'So arbeitet Adrabic gegen das Vergessen. Tipp die Karte an, um sie umzudrehen.'` (zwei Zeilen), danach `'Wie sicher warst du?'` (eine Zeile). Gemessen (`gezielt.js karte`): Untertitel 49 → 25 px, `.einstieg-karte` top 230 → 205 (390×844), 229 → 205 (320×568, 360×740) – **−25 px genau unter dem Finger**. Mit „Nichts davon" 0 px; iPad 0 px. Der Abnahmetest `t_einstieg_g083_039_040_041_044.js` prüft die Probekarte nur mit `keine`. Verifiziert.
- Warum es stört: „Ich vergesse schnell" ist die naheliegendste Hürde. Genau diese Menschen bekommen beim ersten Ausprobieren eine Karte, die beim Tippen wegspringt (LEHREN § 6.1).
- Vorschlag: Untertitel in beiden Zuständen gleich hoch: `min-height` von zwei Zeilen auf Schritt 3, oder der erste Satz bleibt stehen und nur der zweite wechselt („… Wie sicher warst du?"). Test um `vergessen` erweitern.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `.einstieg-karte` top vor/nach `einstieg-aufdecken` gleich (±1 px) für `keine` **und** `vergessen`, auf 320/360/390/820 px.

#### EIN-3: Auf dem iPad ändert der Weiter-Knopf Breite und Lage, sobald man etwas wählt (97 bis 246 px statt der gewollten 420 px)
- Art: Fehler
- Schwere: mittel
- Beleg: `styles.css:4893` `.einstieg-aktion { max-width: 420px; margin-left: auto; margin-right: auto; }` – mit `margin: auto` in der Flex-Spalte schrumpft der Block auf sein breitestes Kind; der Knopf (`button.full`) ist damit so breit wie der Sperr-Satz darunter. Gemessen 820×1180 (`gezielt.js ipadknopf`): Willkommen 204 px, Ziel ohne Wahl 155 px (links 333) → nach der ersten Wahl **97 px (links 361)**, Hürden 246 → 97 px, Zeitpunkt 133 → 97 px, Plan 154 px. Fotos `bilder/ipad-knopf-1-ohne.png`, `ipad-knopf-1-mit.png`. Verifiziert.
- Warum es stört: Der Hauptknopf schnappt beim ersten Tipp auf eine Antwort sichtbar zusammen und rückt seitlich – das Element, das man als Nächstes antippt. Ein 97-px-„Weiter" in einer 680-px-Spalte sieht nach Platzhalter aus; der Kommentar darüber wollte das Gegenteil.
- Vorschlag: In der 720-px-Abfrage `.einstieg-aktion { width: 100%; }` ergänzen (bleibt durch `max-width` bei 420 px). Nur `styles.css`.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: iPad hoch/quer: `.einstieg-aktion button.full` auf Schritt 0–7 gleich breit und gleich links, vor und nach der ersten Wahl (±1 px).

#### EIN-4: „Plan speichern" → „Ich habe schon ein Konto" → „Neues Konto anlegen" wirft den fertigen Plan weg
- Art: Sackgasse
- Schwere: mittel
- Beleg: `app.js:14515–14523` (`mode-register`): `ui.einstiegZurueck = null; ui.einstieg = einstiegNeu(1);`. Gemessen (`gezielt.js konto`, E1): Plan fertig → „Plan speichern" → „Ich habe schon ein Konto" (Anmelden, oben „Zurück zum Plan") → „Neues Konto anlegen" → „Wofür lernst du Arabisch?" mit 0 gewählten Zielen. Verifiziert.
- Warum es stört: Wer nur kurz nachsieht, ob er schon ein Konto hat, muss alle sieben Schritte samt 5,7 s Aufbau wiederholen. Der Knopf heißt „Neues Konto anlegen" – erwartet wird das Formular, nicht der Neustart.
- Vorschlag: In `mode-register`: steht `ui.einstiegZurueck` auf dem Plan (`schritt === EINSTIEG_LETZTER`), nur `ui.authMode = "register"` setzen (Formular „Plan speichern", Stand bleibt). Neustart bei Schritt 1 nur ohne Plan.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Obiger Weg endet auf dem Formular „Plan speichern" mit „Zurück zum Plan"; der Plan zeigt danach dieselben Antworten.

#### EIN-5: Das automatische Scrollen auf dem fertigen Plan lässt sich 3,6 s lang nicht anhalten
- Art: Bewegung
- Schwere: mittel
- Beleg: `app.js:7133–7158` (`einstiegPlanAutoScroll`): `requestAnimationFrame`-Schleife setzt 3600 ms lang `window.scrollTo(…)`, ohne Abbruch bei `touchstart`/`wheel`/`keydown` (`einstiegBauScrollStoppen` läuft nur beim Schrittwechsel). Gemessen (`gezielt.js autoscroll`): 1,2 s nach Planbeginn 600 px nach oben gescrollt → 60 ms später steht die Seite bei 98 statt oben und fährt weiter bis ganz unten (390×844: 314 px; 320×568: 658 px in 3,6 s). Verifiziert mit Mausrad; am iPhone vermutlich als Ruckeln, weil Finger und `scrollTo` sich abwechseln (Vermutung, Gerätetest).
- Warum es stört: Der Plan ist der Wertmoment. Wer den eigenen Satz oder die Kacheln oben lesen will, wird nach unten gezogen, während Kacheln und Leiter noch einblenden. Nach „Zurück zum Plan" aus dem Formular startet die Fahrt noch einmal (`app.js:7442`, `einstiegWieder` setzt `gezeigt = -2`).
- Vorschlag: Bei der ersten Nutzereingabe aufhören (einmalige passive Listener `touchstart`, `wheel`, `keydown` → `einstiegBauScrollStoppen()`); bei der Rückkehr aus dem Formular gar nicht starten. Dauer und Kurve bleiben.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Mausrad/Touch während der Fahrt → `scrollY` 500 ms später dort, wo der Nutzer es hingelegt hat; ohne Eingabe wie bisher bis unten; nach „Zurück zum Plan" `scrollY === 0`.

#### EIN-6: Auf kleinen Handys liegt der Hauptknopf auf den meisten Einstiegs-Bildschirmen unter dem Rand – wegen 60 px reserviertem Leerraum darunter
- Art: Gefühl
- Schwere: mittel
- Beleg: `app.js:7019` + `styles.css:3620`: `.einstieg-neben-platz { margin-top: var(--space-4); min-height: var(--tap); }` steht seit G-083 auf **jedem** Bildschirm, gefüllt ist er nur auf Bildschirm 0. Von der Knopf-Unterkante bis zum Seitenende sind es gemessen 127 px (390×844: Knopf 673–717, Seite 844; Foto `bilder/handy-dunkel-7b.png`). Folge, gemessen (`geo_klein_dunkel.txt`, `geo_se.txt`, Unterkante Knopf / Fensterhöhe): **320×568** Willkommen 666/568 („Meinen Plan erstellen" nicht sichtbar, Foto `bilder/klein-dunkel-0.png`), Ziel nach Wahl 671, Hürden ohne Wahl 756, Karte bewertet 637, Schrift 594, Runde 745, Zeitpunkt 835 – nur „Ziel ohne Wahl" passt. **375×667** (iPhone SE/8): Hürden 724, Runde 722, Zeitpunkt 791; auf Willkommen ist der Knopf sichtbar, „Ich habe schon ein Konto" darunter abgeschnitten (Seite 768). **390×844**: Hürden ohne Wahl ist die Seite 852 statt 844 hoch, der Knopf steht 8 px tiefer als auf allen anderen Schritten (681 statt 673) und die Seite wackelt um 8 px. Verifiziert. Kein Überlagern, kein Querscrollen – der Knopf ist erreichbar, aber erst nach Scrollen, ohne Hinweis darauf.
- Warum es stört: Der erste Bildschirm zeigt auf dem kleinsten iPhone keinen Knopf. Auf dem SE muss man auf vier von acht Schritten scrollen, um weiterzukommen; der Platz dafür wäre da, er ist nur leer reserviert.
- Vorschlag: Kein sticky Fuß (LEHREN § 6.1). Stattdessen den Leerraum sparen: `.einstieg-neben-platz` nur dort reservieren, wo es die Höhe hergibt (`@media (max-height: 760px)` → `min-height: 0; margin-top: 0` auf Schritt 1–7, Bildschirm 0 behält seinen Link), dazu dort `padding-top` des Fußes von `--space-6` auf `--space-4`. Danach G-083-Messung wiederholen (Knopf auf 1–7 untereinander gleich; Bildschirm 0 darf auf niedrigen Fenstern abweichen).
- Entscheidet: Agent
- Aufwand: klein bis mittel (Nachmessen auf fünf Größen)
- Abnahme: 375×667: Knopf-Unterkante ≤ Fensterhöhe auf Willkommen, Ziel, Karte, Schrift, Runde (ohne Echo); 390×844 Hürden ohne Wahl `scrollHeight === innerHeight`; `t_einstieg_g083…` grün.

#### EIN-7: Der Weiter-Knopf springt bei jedem Schritt 26 px zur Seite und blendet ab
- Art: Bewegung
- Schwere: niedrig
- Beleg: `styles.css:3591` `.einstieg--vor { animation: enter-vor … }` liegt auf dem ganzen `.einstieg`-Block, der Fuß (`einstiegFuss`, `app.js:6991`) steckt darin. `enter-vor` (`styles.css:505`) beginnt bei `translateX(26px)`, Deckkraft 0,6. Bild für Bild nach „Weiter" (`gezielt.js gleiten`, 390 px): 10 ms x=38, 47 ms x=25, 100 ms x=16, 207 ms x=12 (Ruhelage 12). Verifiziert.
- Warum es stört: Das gerade gedrückte Element zuckt bei jedem der sieben Schritte. Im Vorbild (VORBILD-MARHABA Muster 1) steht der Knopf still, nur der Inhalt wechselt.
- Vorschlag: Eintrittsbewegung nur auf den Inhalt: `.einstieg--vor > :not(.einstieg-aktion)` (ebenso `--zurueck`, `--start`). Der Fuß bleibt stehen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `left` des Weiter-Knopfs in jedem Bild der 300 ms nach „Weiter" gleich (±1 px), Deckkraft 1.

#### EIN-8: Gast-Start: Ladebild wird ohne Übergang hart durch „Willkommen" ersetzt
- Art: Bewegung
- Schwere: niedrig
- Beleg: `app.js:7581–7586`: bei `currentUser === null` ruft `render()` sofort `renderEinstieg()`; der Ausblend-Zweig (`boot--exit`, `app.js:7646–7655`) gilt nur für angemeldete Konten. Gemessen (`gezielt.js boot`, Bausteine 600 ms verzögert): bis 500 ms Ladebild, Zeichen 76 px bei (195, 422); bei 700 ms „Willkommen", Zeichen 24 px bei (24, 63), kein `boot--exit` dazwischen. Angemeldet: 700–900 ms „boot geht", dann App. Fotos `bilder/boot-gast-500.png`, `boot-gast-900.png`. Verifiziert (Chromium).
- Warum es stört: Das ist das erste Bild für jeden neuen Menschen. Den weichen Übergang gibt es, nur der Erstbesucher bekommt ihn nicht.
- Vorschlag: Steht `.boot` noch im DOM, auch für Gäste `boot--exit` setzen und `renderEinstieg()` nach ~300 ms. Keine Mindestwartezeit.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Gast-Start Bild für Bild: zwischen „boot" und „willkommen" liegt „boot-geht".

#### EIN-9: „Dein Plan entsteht …" hakt dieselbe Sache zweimal ab
- Art: Gefühl
- Schwere: niedrig
- Beleg: `app.js:7072–7077` (`einstiegBauListe`): `"Eingerichtet: " + huerde.kurz` und danach die festen Punkte. Mit Hürde „dran" stehen untereinander „Eingerichtet: fester Zeitpunkt am Tag" und „Zeitpunkt: nach dem …"; mit „zeit": „Eingerichtet: kurze Runden" und „Runde: bis zu 10 Karten"; mit „schrift": „Eingerichtet: große Schrift, Buchstaben als Karten" und „Schrift: Groß". Aus dem Code gelesen (`EINSTIEG_HUERDEN[].kurz`, `app.js:1436–1462`), im Browser nicht einzeln fotografiert.
- Warum es stört: „Nichts doppelt" (LEHREN § 6.9). Der Aufbau soll persönlich wirken; zwei Haken für dasselbe wirken wie Füllmaterial.
- Vorschlag: Die Hürden-Zeile nur zeigen, wenn sie etwas sagt, das die festen Punkte nicht sagen („vergessen", „wann"); bei „dran"/„zeit"/„schrift" stattdessen die passende feste Zeile als Antwort kennzeichnen. Wortlaut legt der Betreiber fest.
- Entscheidet: Betreiber (Wortlaut im Einstieg)
- Aufwand: klein
- Abnahme: Für jede einzelne Hürde kommt kein Begriff (Zeitpunkt, Runde, Schrift) in zwei Zeilen der Aufbau-Liste vor.
- Pro/Contra: Dafür: kürzer, ehrlicher, „nichts doppelt". Dagegen: Der Betreiber wollte den Aufbau länger und persönlich (3.17.22); eine Zeile weniger verkürzt ihn um 0,8 s, und „Eingerichtet: …" ist die einzige Zeile, die die Hürde wörtlich aufgreift. Empfehlung: Zeile behalten, aber die doppelte feste Zeile dann weglassen (Länge bleibt gleich).

#### EIN-10: Am Übergang zum Konto wechselt der Rahmen (anderer Zurück-Knopf, neue Zählung „Schritt 1 von 2")
- Art: Gefühl
- Schwere: niedrig
- Beleg: Einstieg 1–7: runder Zurück-Pfeil bei (0, 28) und Balken bei y=48, Überschrift bei y=96 – gemessen auf allen Schritten gleich. Formular danach (`app.js:7925–7933`): Textknopf „Zurück zum Plan" an anderer Stelle, Marke bei y=92, Zeile „Schritt 1 von 2 · Konto", Überschrift bei y=180 (`geo_handy.txt`, Zeile „8"). Der Balken war auf dem Plan schon voll (`e.schritt / EINSTIEG_LETZTER = 1`). Verifiziert.
- Warum es stört: Der Balken sagt „fertig", dann beginnt eine neue Zählung. Im Vorbild läuft ein Rahmen bis zum Schluss durch.
- Vorschlag: Kommt man aus dem Einstieg (`ui.authAusEinstieg`), das Formular mit `einstiegKopf` zeichnen (derselbe Pfeil → `einstieg-wieder`, Balken), Konto und Bestätigung als die letzten zwei Abschnitte des Balkens; „Schritt 1 von 2" entfällt dort.
- Entscheidet: Betreiber (Ablauf/Anmutung des Einstiegs)
- Aufwand: mittel
- Abnahme: Zurück-Pfeil und Balken stehen auf Plan, Formular und Bestätigungsseite an derselben Stelle (±1 px); der Balken ist erst nach der Bestätigung voll.
- Pro/Contra: Dafür: ein durchgehender Rahmen, das Konto wirkt wie der Abschluss des Plans statt wie eine Hürde danach. Dagegen: Die Bestätigungsseite wird auch ohne Einstieg erreicht (späteres Öffnen), braucht also beide Fassungen; „Schritt 1 von 2" ist bewusst gesetzt (3.3.2) und funktioniert. Empfehlung: nur das Formular direkt aus dem Einstieg angleichen, Bestätigungsseite lassen.

#### EIN-11: Antworten eines abgebrochenen Einstiegs füllen den nächsten Durchgang vor
- Art: Unfertig
- Schwere: niedrig
- Beleg: `einstiegAntwortenSichern` (`app.js:1481`) schreibt Schrift/Runde sofort nach `localStorage`; gelöscht wird nur bei „Ich habe schon ein Konto", bei Bestandskonto und beim Anwenden. `einstiegNeu()` (`app.js:1476`, Aufruf `app.js:7582`) räumt nicht auf. Gemessen (`gezielt.js neuladen`): Einstieg bis Schritt 5, neu laden → Willkommen, `adrabic-einstieg-antworten = {"arabGroesse":"gross"}` bleibt; im zweiten Durchgang steht Schritt 4 auf „Groß", der Hinweis „Weil du noch nicht sicher liest: schon auf Groß gestellt." fehlt (`einstiegGroesse` liest den Altwert, `vorausgewaehlt` ist falsch). Verifiziert.
- Warum es stört: Ein zweiter Mensch am selben Gerät (oder derselbe nach Abbruch) bekommt eine Voreinstellung ohne Erklärung. Gehört zum offenen Rest von G-042 (was bei Abbruch liegen bleibt).
- Vorschlag: Beim Anlegen eines frischen Einstiegs auf Bildschirm 0 (`app.js:7582`) den Schlüssel `adrabic-einstieg-antworten` löschen – der Arbeitsspeicher-Stand ist dann ohnehin leer. Zusammen mit der G-042-Entscheidung zum Nachklang erledigen.
- Entscheidet: Agent (Antworten) / Betreiber nur für die Nachklang-Zeitgrenze (G-042)
- Aufwand: klein
- Abnahme: Einstieg bis Schritt 5, neu laden: `localStorage.getItem('adrabic-einstieg-antworten') === null`.

#### EIN-12: Kommentare beschreiben einen Stand, den es nicht mehr gibt; ein Scroll-Zweig ohne Wirkung
- Art: Aufräumen
- Schwere: niedrig
- Beleg: `app.js:6982–6990` Kommentar zu `einstiegFuss`: „unten fest stehenden (position: sticky) Bereichs" – sticky ist seit 3.17.44 entfernt (`styles.css:3578–3586`). `app.js:6761–6763` „sie dreht sich hin und zurueck" – seit 3.17.22 einmal. `styles.css:4137–4138` „EINSTIEG_BAU_MS = 2300 ms" – die Konstante gibt es nicht mehr. `styles.css:3918`, `4253` „Haken, der zweimal aufleuchtet" – läuft einmal (`… 1 both`). `app.js:7108–7132` `einstiegBauAutoScroll`: rechnet fest mit 6 Punkten (`app.js:7115`), die Liste hat 5 oder 6 (`einstiegBauListe`); gemessen scrollt der Aufbau auf 320×568, 375×667 und 390×844 gar nicht (scrollY 0 bzw. 1), der Zweig ist dort ohne Wirkung und liest `scrollY` direkt nach `innerHTML` (LEHREN § 6.4).
- Warum es stört: LEHREN § 3.2 – Kommentare, die lügen, führen die nächste Sitzung in die falsche Richtung (genau hier schon geschehen: sticky).
- Vorschlag: Kommentare richtigstellen; `einstiegBauAutoScroll` entweder entfernen oder Dauer aus `einstiegBauDauer(punkte.length)` nehmen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep -n "position: sticky\|EINSTIEG_BAU_MS\|hin und zurueck\|zweimal aufleuchtet" app.js styles.css` im Einstiegs-Abschnitt nur noch in Verlaufs-Kommentaren mit Versionsangabe.

---

## Vergleich mit VORBILD-MARHABA § 3 (nur was passt; nichts aus § 4)

| Muster | Stand gemessen | Fehlt / zu tun |
|---|---|---|
| 1 fester Rahmen | **Zurück, Balken, Überschrift: 0 px Sprung** über Schritt 1–6 (Zurück y=28, Balken y=48, h1 y=96 auf 320/375/390, hell, dunkel, ruhig; iPad 28/48/167). Aufbau und Plan haben bewusst Ring/Haken über der Überschrift | Der **Knopf** steht nicht fest: EIN-7 (gleitet), EIN-3 (iPad-Breite), EIN-6 (kleine Handys, 8 px auf Hürden). Rahmen endet am Konto: EIN-10 |
| 2 gesperrter Knopf | vorhanden und einheitlich: Schritt 1, 2, 6 gesperrt mit einem Satz darunter (`EINSTIEG_PFLICHT`), 3 zeigt „Weiter" erst nach dem Bewerten, 4/5 haben immer einen gesetzten Stand | nichts |
| 3 Auswahl-Karte | eigene, ruhigere Form (Rand + gefüllter Haken) | Frage an den Betreiber steht schon in VORBILD § 5 |
| 5 Aufbau Stück für Stück | Aufbau-Liste 820 ms je Punkt (bewusst länger, Betreiber 3.17.22), Leiste 130 ms, Leiter 190 ms je Sprosse; bei reduzierter Bewegung sofort alles (gemessen: Plan steht ohne Aufbau, kein Auto-Scroll) | Auto-Scroll nicht unterbrechbar: EIN-5 |
| 6 Ausprobieren | Karte auf Bildschirm 0 antippbar, Probekarte umdrehen + bewerten (ein Tipp, Karte bleibt nach dem Bewerten stehen: 0 px), Schrift ändert sich sofort | Sprung beim Umdrehen: EIN-2 |
| 9 Satz der eigenen Wahl | live: „Wenn ich mein Frühstück fertig habe, mache ich eine Runde." folgt jedem Buchstaben | Der Satz kommt nach dem Konto nicht mehr an: EIN-1 |
| 11 Bild wiederholen | Leiste auf 0 und nach „Sicher", Leiter auf dem Plan | „dein Stand" am Ende fehlt – Frage steht in VORBILD § 5 |
| 7, 10, 13 | Bestand, passt | nichts |
| 12 Etiketten | Kachel-Titel klein, nicht in Großbuchstaben | erst nach der Formatregel (Zyklus § 3.2) |

## Geprüft ohne Fund

- Alle Schritte 0–7, Aufbau, Konto-Formular auf 320×568 (hell, dunkel), 375×667, 360×740, 390×844 (dunkel; hell mit reduzierter Bewegung), iPad 820×1180 hell: kein waagerechtes Scrollen, keine Überlagerung bedienbarer Elemente oder Texte (einzig das Auge im Passwortfeld, gewollt), keine Seitenfehler in der Konsole.
- Hürden mit vier Antworten und Echos, „Nichts davon": nichts verdeckt, Weiter im Fluss erreichbar (3.17.44 hält).
- Probekarte: nach dem Bewerten bleibt die Karte stehen (0 px); „Weiter" erscheint nicht an der Stelle des gedrückten Bewertungsknopfs (Sicher y=470, Weiter y=673).
- Eigene Situation: Feld erscheint, Satz und Sperre folgen dem Tippen, Knopf entsperrt.
- Reduzierte Bewegung: Aufbau übersprungen, Plan sofort vollständig, kein Auto-Scroll.
- Neues Konto: Schrift „Groß" aus der Hürde landet in `settings.arabGroesse`, Zwischenspeicher danach leer. Bestandskonto nach vollem Einstieg: beide Schlüssel gelöscht, Einstellungen des Kontos unverändert (G-042 mechanischer Teil hält).
- Bestätigungsseite 320×568: Hauptknopf sichtbar (506–550), Punkt pulst 6-mal, keine Endlosbewegung (G-082 hält).
- Trefferflächen: Schrift-Umschalter 34 px hoch, aber mit `::after`-Erweiterung (`styles.css:5092–5097`) auf 42 px; Rechtslinks 21 px + 24 px Erweiterung. Kein Fund.
- Texte am Bildschirm gelesen (Ziel-Echo mit „sowie", Vorauswahl-Sätze, Bewertungs-Echos, Plan): keine Einzahl/Mehrzahl-Fehler, keine Systemsprache.
- Zurück je Schritt (aus dem Code gelesen, `app.js:14548–14567`): Stand bleibt in `ui.einstieg`, Plan-Aufbau läuft nach Zurück erneut.

## Nicht mehr geprüft (Zeit)

- iPad quer und Desktop, iPad dunkel.
- Kontrast je Schritt (`t_einstieg.js` nicht neu gelaufen), Flüssigkeit unter CPU 4×.
- Tastatur-Durchlauf und Bildschirmleser-Namen im Einstieg.
- Google-Weg, Fehlerfälle auf Formular und Bestätigungsseite (falsches Passwort, Zeitlimit, „Adresse falsch?").
- Zurück auf jedem Schritt einzeln im Browser (nur Code gelesen); Bewertungen „Nicht"/„Fast" nur als Text geprüft.
- Echtes iPhone: Start der installierten App, Tastatur über dem Feld „Deine Situation", Zurück-Geste (E-12).
