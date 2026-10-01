# Gemeinsamer Auftrag für alle Prüf-Agenten (Zyklus 2, 01.10.2026)

Repo: `C:\Users\USER\Wiederholung` (Windows, Git-Bash und PowerShell) –
Karteikarten-PWA „Adrabic“ (Arabisch lernen), kein Build, Browser spricht
direkt mit Firebase (Auth + Firestore). Dateien: `app.js` (~15 200 Zeilen),
`styles.css` (~5 400), `index.html`, `sw.js`, `firestore.rules`,
`firebase.json`, `manifest.json`, `impressum.html`,
`datenschutzerklaerung.html`. Planung unter `plan/`. Stand 3.18.10, online.

Warum: Der Betreiber will die ganze App noch einmal von vorn bis hinten
prüfen lassen. Seine Wünsche stehen in `plan/zyklus-2/AUFTRAG.md` § 1 –
**lesen**. Er sagt es so: Vorgaben nicht eingehalten, Sackgassen, Fehler,
Bugs, „unsatisfying“, fehlende Grafik/Animation, Flüssigkeit, App-Logik
richtig verteilt, Regeln, Unsinniges, toter Code, Unnützes, Nützliches
hinzufügen (auch Größeres wie Einstellungen).

## Pflicht vor dem Prüfen
1. `plan/LEHREN.md` KOMPLETT lesen. Besonders § 3.5 (bewusst entfernt –
   NICHT wieder vorschlagen), § 1.6 und § 2 (keine Lehrinhalte, keine
   religiösen Inhalte selbst verfassen, keine Gruppen/Politik), § 6 (Regeln
   aus Funden), § 13 (Stolperstellen).
2. `CLAUDE.md` und `plan/zyklus-2/AUFTRAG.md` lesen.
3. Bekannte Befunde nicht neu melden: `plan/grossplan/AUFGABEN.md`
   (G-001–G-119; offen sind u. a. G-107–G-111, G-118, G-119) und
   `plan/zyklus-2/AUFTRAG.md` § 4. Ist ein alter Befund noch da, nur mit
   Kennung und „noch offen“ nennen.
4. Bevor du etwas als „fehlt“ meldest: in `CHANGELOG.md` und
   `plan/**/LOGBUCH.md` suchen (grep), ob es schon da war, entfernt wurde oder
   bewusst abgelehnt ist. Wenn ja: nicht melden oder nur mit neuem Argument.
5. „Texte auswendig lernen“ ist nur im Betreiber-Konto sichtbar
   (`texteFreigeschaltet()`); es läuft gerade ein Probelauf. Dort nur echte
   Fehler melden, keine Umbauten vorschlagen.

## Du änderst NICHTS am Code
Nur lesen und messen. Keine Datei im Repo ändern, nicht committen. **Einzige
Ausnahme:** deine eigene Befunddatei
`plan/zyklus-2/befunde/<KÜRZEL>.md` anlegen und schreiben.
Eigene Skripte und Fotos nur unter
`C:\Users\USER\AppData\Local\Temp\claude\C--Users-USER-Wiederholung\7adc4240-7294-4e09-8a22-981a8d3f67a8\scratchpad\audit\<KÜRZEL>\`.
Code mit Backslashes/Escapes nie per Shell-Heredoc schreiben, sondern mit dem
Write-Werkzeug (LEHREN § 15).

## Prüfstand (um Vermutungen zu beweisen)
Ein Server läuft: `http://127.0.0.1:8099/index.html` (Repo-Wurzel). Keinen
zweiten auf 8099 starten; falls er nicht antwortet, eigenen auf einem freien
Port 81xx starten und `PRUEF_PORT` setzen.
`plan/werkzeuge/pruefstand/` – `lib.js` (`start`, `neueSeite`, `aktion`,
`foto`, `vollerStore`), `stubs.js` (Firebase-Attrappe), `text_lib.js`,
viele `t_*.js` als Vorbild, `LIESMICH.md`. `node_modules` ist installiert.
Browser: in jedem Aufruf `CHROMIUM='C:\Program Files\Google\Chrome\Application\chrome.exe'`
setzen. Eigene Skripte mit
`require('C:/Users/USER/Wiederholung/plan/werkzeuge/pruefstand/lib.js')`.
Browser immer in `finally` schließen.
**Tempo-Messungen sind unzuverlässig**, weil mehrere Agenten gleichzeitig
laufen. Tempo nur als Hinweis melden, nie als Beleg.

## Was gesucht wird
Alles in deinem Bereich: echte Fehler (auch unauffällige), Sackgassen,
Unfertiges, was sich billig oder hakelig anfühlt, fehlende oder schlechte
Bewegung, Unnützes, Fehlendes, sinnvolle neue Funktionen. Qualität vor
Menge, keine Floskeln. Jeder Fund mit Beleg aus dem CODE (Zeile lesen, nicht
Kommentar – LEHREN § 3.2). Vermutung klar als Vermutung markieren. Wo
möglich im Browser nachweisen (Foto, Messung).

## Ausgabeformat
Datei `plan/zyklus-2/befunde/<KÜRZEL>.md`, ein Block je Fund, nach Schwere
sortiert:

```
#### <KÜRZEL>-<Nr>: <Titel in einfachen Worten>
- Art: Fehler | Sackgasse | Unfertig | Gefühl | Bewegung | Aufräumen | Fehlt | Funktion
- Schwere: kritisch | hoch | mittel | niedrig
- Beleg: `datei:zeile` + kurzes Zitat; Messung/Foto falls gemacht; „verifiziert“ oder „Vermutung“
- Warum es stört: ein bis zwei Sätze, aus Sicht der Nutzer:in oder des Betreibers
- Vorschlag: konkret, was geändert wird (Dateien, Funktionen)
- Entscheidet: Agent (mechanisch, im Rahmen) | Betreiber (Lernlogik, Recht, Religion,
  Marke, neue Funktion, Einstellung) | Konsole (Firebase/Google Cloud – Betreiber klickt)
- Aufwand: klein (< 1 h) | mittel | groß
- Abnahme: messbares Kriterium (Test, Messung, grep)
- Pro/Contra: nur wenn „Entscheidet: Betreiber“ – ehrlich gewichtet, dann Empfehlung
```

Am Ende der Datei: „Geprüft ohne Fund:“ – Liste, was du angesehen hast und in
Ordnung ist.

Deine Schlussantwort: nur Pfad der Datei, Anzahl Funde je Schwere, die 3
wichtigsten in je einer Zeile.
