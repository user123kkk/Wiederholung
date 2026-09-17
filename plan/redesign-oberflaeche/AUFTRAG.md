# Auftrag: Oberfläche & Mobile-Gestalt

**Status:** Blöcke 1–9 `fertig` (v3.1.0–3.4.2), Block 9 am echten Handy noch nicht bestätigt. **Nächster: Block 10.** Blöcke 8–10 kommen aus der Bildersammlung des Betreibers (17.09.2026), siehe [`BILDER-BEFUND.md`](BILDER-BEFUND.md).
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
| 7 | **Anmeldeformular** | `fertig` (v3.4.0) | Eingaben bleiben nach Fehlermeldung und Moduswechsel stehen (war kaputt) · Auge zum Anzeigen des Passworts. Bild 23, 24 |
| 8 | **Rückmeldung nach dem Speichern** | `fertig` (v3.4.1) | `zeigeToast()` wird jetzt aufgerufen. Am echten Handy verifiziert. Bild 37, 105, 106 |
| 9 | **Fehler am Feld statt im Dialog** | `fertig, ungeprüft am Handy` (v3.4.2) | Leeres Karten-Formular und fehlender Name melden sich direkt am Feld. Bild 44, 61, 93 |
| 10 | **Sichtbare Wahl statt Klappliste** | `offen` | Stufen „von/bis" beim Üben und „Art der Speicherkarte". Bild 9, 13, 14, 64, 72 |

## Blöcke 8–10 im Einzelnen

Grundlage für alle drei: [`BILDER-BEFUND.md`](BILDER-BEFUND.md). Dort steht zu
jedem Bild, warum es hierher gehört. Die Grenzen oben (Lernlogik unangetastet,
keine erfundenen Funktionen) gelten unverändert.

### Block 8 — Rückmeldung nach dem Speichern

**Das Problem, einfach gesagt:** Wer eine neue Karte anlegt und auf Speichern
tippt, sieht nur, dass das Formular leer wird. Ob gespeichert wurde oder ob
etwas schiefging, sagt die App nicht. Dabei gibt es die passende Kurzmeldung
schon fertig — `zeigeToast()` in `app.js:1063`, gezeichnet über
`renderToast()` (`app.js:4608`), gestaltet in `styles.css` (`.toast-wrap`). Sie
wird nur **nirgends aufgerufen** (geprüft mit `git log -S"zeigeToast("`: seit
3.0.0 nie ein Aufruf). Kein neues Bauteil nötig.

**Was zu tun ist:**
1. In der Speicher-Funktion für Karten (die mit `"Bitte Wort und Übersetzung
   ausfüllen."`, `app.js:3466`) nach `patchDoc(patch); render();`
   `zeigeToast(...)` aufrufen. Text beim Anlegen: „Karte gespeichert". Beim
   Bearbeiten: „Änderung gespeichert".
2. Sichtbarkeit über dem offenen Karten-Blatt: laut Token schon richtig
   (`--z-toast: 50` liegt über `--z-sheet: 40`, `styles.css:244–245`). Am
   Bildschirm trotzdem ansehen — die Meldung darf die Speichern-Knöpfe des
   Blatts nicht verdecken.
3. Weitere Stellen **nur**, wo eine Handlung sonst stumm bleibt. Kandidaten
   zum Prüfen (nicht blind einbauen): Karte gelöscht, Speicherkarte angelegt,
   Karten verschoben. Wo schon sichtbar etwas passiert (Karte verschwindet
   aus der Liste), braucht es keine Meldung — sonst nutzt sie sich ab.

**Nicht:** kein Ton, keine Animation mit Konfetti, kein „Super gemacht!"
(`PRINZIPIEN.md`: ruhiges Werkzeug).

**Prüfen:** braucht eine Anmeldung. `probelauf.mjs` kann das mit Attrappen,
braucht aber `npm install playwright` (auf dem Rechner des Betreibers am
17.09. nicht installiert). Ohne das: Betreiber prüft am Handy — Karte anlegen,
Meldung muss kurz unten erscheinen und nach ca. 2,5 s verschwinden.

**Fertig, wenn:** jede Speicher-Handlung, die sonst stumm bliebe, eine kurze
Bestätigung zeigt, und `zeigeToast` mindestens einen Aufrufer hat.

### Block 9 — Fehler am Feld statt im Dialog

**Das Problem, einfach gesagt:** Wer ein Karten-Formular ohne Wort abschickt,
bekommt ein **Dialogfenster**, das man erst wegtippen muss
(`app.js:3466`). Danach muss man selbst suchen, welches Feld fehlt. Beim
Registrieren ohne Namen steht „Bitte einen Namen eingeben." unten in einem
Kasten, nicht am Namensfeld (`app.js:1906`). Die Bilder 44, 61 und 93 zeigen:
Fehler gehören **rot direkt unter das Feld**, und das Feld selbst färbt sich.

Die Gestaltung dafür **existiert schon und wird nicht benutzt**:
`input[aria-invalid="true"]` (`styles.css:985`) und `.field__fehler`
(`styles.css:1020`). Kein neues CSS nötig.

**Was zu tun ist:**
1. Karten-Formular: statt `dlgAlert` am leeren Feld `aria-invalid="true"`
   setzen und darunter `<div class="field__fehler" id="…-fehler">Bitte
   ausfüllen</div>`; Feld mit `aria-describedby` darauf verweisen; Fokus
   ins erste leere Feld.
2. Fehler verschwindet, sobald man in das Feld tippt.
3. Registrieren: fehlender Name genauso am Namensfeld.
4. Fehler vom Server (z. B. „E-Mail oder Passwort ist falsch") **bleiben** im
   Kasten unter den Feldern — sie betreffen nicht ein einzelnes Feld.
5. Achtung Block 7: `renderAuth()` baut neu auf. Fehlerzustand muss in `ui`
   liegen (wie `authEingabe`), sonst ist er nach dem Neuaufbau weg.

**Fertig, wenn:** kein „Bitte … ausfüllen" mehr als Dialog kommt und der
Bildschirmleser den Fehler beim Feld vorliest (`aria-describedby`).

### Block 10 — Sichtbare Wahl statt Klappliste

**Das Problem, einfach gesagt:** Zwei Stellen verstecken eine kleine Auswahl in
einer Klappliste. Bei 2–5 Möglichkeiten sieht man besser alle auf einmal
(Bild 9, 72) — ein Tipp statt zwei.

1. **Üben: Stufe von … bis …** (`app.js:6193–6194`): zwei Klapplisten mit den
   Stufen. Vorschlag: eine Reihe Chips (runde Knöpfe) mit den Stufen, Antippen
   von Anfang und Ende markiert den Bereich. **Kein** Schieberegler mit zwei
   Griffen (Bild 14): am Handy fummelig, und die App hatte mit Ziehgesten
   schon Ärger (`PRINZIPIEN.md`, Gesten). Geprüft 17.09.: `MAX_STUFE = 12`
   (`app.js:88`), angezeigt werden aber nur die Stufen, die im Bereich
   tatsächlich vorkommen (`availableStufen()`, `app.js:6149`). Bis zu 13 Chips
   passen am Handy nicht in eine Reihe — sie dürfen umbrechen (zwei Zeilen
   sind in Ordnung). Wirkt es trotzdem überladen: Urteil neu fällen und ins
   Logbuch, nicht mit Gewalt bauen.
2. **Art der Speicherkarte** (`app.js:6535`): Klappliste mit 3 Möglichkeiten
   in **jeder** Zeile der Speicherkarten. Hier vorsichtig: drei Chips pro
   Zeile machen die Liste voll (Satz „weniger Inhalt am Handy"). Besserer
   Weg: die Wahl ins vorhandene Auswahl-Blatt (`wahl-sheet`, wie bei
   Helligkeit) verlegen, die Zeile zeigt nur die aktuelle Art. Die Grenze
   „Emoji nur im `<option>`" (`app.js:424`) fällt dabei weg — dann dort auch
   den Kommentar anpassen.

**Nicht anfassen:** die Ziel-Auswahl „Verschieben nach …" und „In
Speicherkarte …" (`app.js` bei `move-target-select`, `save-set-select`) — das
sind echte, beliebig lange Listen, dort ist die Klappliste richtig (Bild 12).

**Fertig, wenn:** beide Stellen ohne Klappliste gehen und die Lernlogik
(welche Karten geübt werden) nachweislich dieselbe ist wie vorher.

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
