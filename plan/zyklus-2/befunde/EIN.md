# EIN – Befunde Onboarding / Einstieg (Zyklus 2, B1)

Stand: 3.18.10 (`436dc78`), geprüft am 01.10.2026. **In Arbeit** – wird
laufend ergänzt.

Prüfstand: Chromium (Chrome 154, `C:\Program Files\Google\Chrome\Application\chrome.exe`),
Firebase-Attrappe (`stubs.js`), Server `127.0.0.1:8099`. Eigene Skripte und
Fotos unter `scratchpad/audit/EIN/` (`geo.js`, `bilder/`).
Geräte: Handy 390×844, klein 320×568, iPad 820×1180, hell/dunkel, reduzierte
Bewegung. Nicht prüfbar: echtes iOS (installierte App, Tastatur,
Zurück-Geste), echte Mails, Gefühl einer Bewegung am Gerät.

Bereits bekannt und nicht neu gemeldet: E-11 (Plan: Wege vor die Leiter),
E-12 (Zurück-Taste im Einstieg), E-13 (Einstieg ruhiger) – alle drei **noch
offen** beim Betreiber (`grossplan/ENTSCHEIDUNGEN.md`, Spalte „Entschieden"
leer). G-042 Restteil (Zeitgrenze Nachklang bei Abbruch) **noch offen**.

---

(Reihenfolge wird am Ende nach Schwere sortiert.)

#### EIN-A: Probekarte springt beim Antippen doch noch 25 px – wenn „Ich vergesse Wörter schnell wieder" gewählt ist (G-039 nur halb behoben)
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:7272–7277`: vor dem Aufdecken lautet der Untertitel bei Hürde „vergessen" `'So arbeitet Adrabic gegen das Vergessen. Tipp die Karte an, um sie umzudrehen.'` (zwei Zeilen), danach `'Wie sicher warst du?'` (eine Zeile). Gemessen (`gezielt.js karte`): Untertitel 49 → 25 px, `.einstieg-karte` top 230 → 205 (390×844), 229 → 205 (320×568 und 360×740) – **Sprung −25 px genau unter dem Finger**. Mit Hürde „Nichts davon" 0 px. iPad 0 px (Satz passt in eine Zeile). Der Abnahmetest `t_einstieg_g083_039_040_041_044.js` prüft die Probekarte nur mit „keine" (Zeile 76 ff.), deshalb blieb das unentdeckt. Verifiziert.
- Warum es stört: „Ich vergesse schnell" ist die naheliegendste Hürde – gerade diese Gruppe bekommt beim ersten Ausprobieren eine Karte, die beim Tippen wegspringt (LEHREN § 6.1, G-039).
- Vorschlag: Untertitel in beiden Zuständen gleich hoch halten: entweder den „vergessen"-Satz auch nach dem Aufdecken stehen lassen und „Wie sicher warst du?" an die Stelle des zweiten Satzes setzen (z. B. „So arbeitet Adrabic gegen das Vergessen. Wie sicher warst du?"), oder `.einstieg .subtitle` auf Schritt 3 eine Mindesthöhe von zwei Zeilen geben. Test `t_einstieg_g083…` um den Fall `vergessen` erweitern.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `.einstieg-karte` top vor/nach `einstieg-aufdecken` gleich (±1 px) für Hürde `keine` **und** `vergessen`, auf 320/360/390/820 px.

#### EIN-B: Auf dem iPad ändert der Weiter-Knopf Breite und Lage, sobald man etwas wählt (97 bis 246 px statt der gewollten 420 px)
- Art: Fehler
- Schwere: mittel
- Beleg: `styles.css:4893` `.einstieg-aktion { max-width: 420px; margin-left: auto; margin-right: auto; }` – mit `margin: auto` in der Flex-Spalte schrumpft der Block auf die Breite seines breitesten Kindes, der Knopf (`button.full`, 100 %) also auf die Breite des Sperr-Satzes. Gemessen 820×1180 (`gezielt.js ipadknopf`): Willkommen 204 px, Ziel ohne Wahl 155 px (links 333) → nach der ersten Wahl **97 px (links 361)**, Hürden ohne Wahl 246 px → 97 px, Anker 133 → 97 px, Plan 154 px. Fotos `bilder/ipad-knopf-1-ohne.png`, `ipad-knopf-1-mit.png`. Verifiziert.
- Warum es stört: Der Hauptknopf schnappt beim ersten Tipp auf eine Antwort sichtbar zusammen und springt seitlich – genau das Element, das man als Nächstes antippt. Ein 97-px-„Weiter" in einer 680-px-Spalte sieht nach Platzhalter aus, das wollte der Kommentar darüber verhindern.
- Vorschlag: `.einstieg-aktion` ab 720 px `width: 100%` dazu (bleibt durch `max-width: 420px` begrenzt), oder `align-self: center; width: min(420px, 100%)`. Nur `styles.css`, Abschnitt 720-px-Medienabfrage.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: iPad hoch/quer: `.einstieg-aktion button.full` ist auf allen Schritten 0–7 gleich breit (420 px) und gleich links, vor und nach der ersten Wahl (±1 px).

#### EIN-C: Der Weiter-Knopf springt bei jedem Schritt 26 px zur Seite und blendet ab – kein fester Rahmen wie im Vorbild
- Art: Bewegung
- Schwere: niedrig
- Beleg: `styles.css:3591` `.einstieg--vor { animation: enter-vor … }` liegt auf dem ganzen `.einstieg`-Block, und `einstiegFuss()` (`app.js:6991`) steckt **im** Block. `enter-vor` (`styles.css:505`) beginnt bei `translateX(26px)`, Deckkraft 0,6. Gemessen Bild für Bild nach dem Tipp auf „Weiter" (390 px): 10 ms x=38, 47 ms x=25, 100 ms x=16, 207 ms x=12 – der Knopf unter dem Finger springt im ersten Bild 26 px nach rechts und halbdurchsichtig, gleitet dann zurück. Zurück-Pfeil und Balken stehen dagegen fest (Kopf liegt außerhalb des Blocks, gemessen 0 px über Schritt 1–7). Verifiziert.
- Warum es stört: VORBILD-MARHABA Muster 1: Zurück, Balken, Überschrift **und unten der breite Knopf** stehen auf jedem Bildschirm still; nur der Inhalt wechselt. Hier „zuckt" das, was man gerade gedrückt hat. Auf dem Handy ist das jeder der sieben Schritte.
- Vorschlag: Die Eintrittsbewegung nur auf den Inhalt legen, nicht auf den Fuß: z. B. `.einstieg--vor > :not(.einstieg-aktion)` statt `.einstieg--vor`, ebenso `--zurueck`/`--start`. Der Fuß bleibt stehen, sein Text („Weiter" → „Plan speichern") wechselt ohne Bewegung.
- Entscheidet: Agent (Bewegung im bestehenden Stil)
- Aufwand: klein
- Abnahme: `getBoundingClientRect().left` des Weiter-Knopfs in jedem Bild der 300 ms nach „Weiter" gleich (±1 px), Deckkraft 1; Überschrift und Antworten gleiten weiter.
