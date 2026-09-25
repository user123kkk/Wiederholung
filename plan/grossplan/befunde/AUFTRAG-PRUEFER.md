# Gemeinsamer Auftrag für alle Prüf-Agenten (Grossprüfung 25.09.2026)

Repo: /home/user/Wiederholung — Karteikarten-PWA „Adrabic" (Arabisch lernen), kein Build,
Browser spricht direkt mit Firebase (Auth + Firestore). Dateien: app.js (~12 400 Zeilen),
styles.css, index.html, sw.js, firestore.rules, firebase.json, manifest.json,
impressum.html, datenschutzerklaerung.html. Planung unter plan/.

## Pflicht vor dem Prüfen
1. `plan/LEHREN.md` KOMPLETT lesen (Regeln aus echten Vorfällen). Besonders § 3.5
   (bewusst entfernt – NICHT wieder vorschlagen), § 1.6/§ 2 (keine Lehrinhalte, keine
   religiösen Inhalte selbst verfassen, keine Gruppen/Politik), § 13 (Stolperstellen).
2. `CLAUDE.md` lesen.
3. Bevor du etwas als „fehlt" meldest: in `CHANGELOG.md` und `plan/**/LOGBUCH.md`
   suchen (grep), ob es schon da war, entfernt wurde oder bewusst abgelehnt ist.
   Wenn ja: nicht melden oder nur mit neuem Argument.

## Du änderst NICHTS im Repo
Nur lesen und messen. Keine Datei im Repo schreiben, nicht committen.
Eigene Skripte/Fotos nur unter
/tmp/claude-0/-home-user-Wiederholung/1ea5d803-be3e-55d6-b5eb-7e16e415a180/scratchpad/audit/<dein-kürzel>/

## Prüfstand (optional, um Vermutungen zu beweisen)
Ein Server läuft schon: http://127.0.0.1:8099/index.html (Repo-Wurzel).
`plan/werkzeuge/pruefstand/` – lib.js, stubs.js (Firebase-Attrappe), viele t_*.js als Vorbild.
node_modules ist installiert. Start: `cd plan/werkzeuge/pruefstand &&
CHROMIUM=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node <skript>`.
Eigene Skripte in dein Scratchpad-Unterverzeichnis legen und mit
`require('/home/user/Wiederholung/plan/werkzeuge/pruefstand/lib.js')` arbeiten.
Keinen zweiten Server starten.

## Was gesucht wird
Alles in deinem Bereich: echte Fehler (auch unauffällige), Unvollständiges,
Verbesserungen, Fehlendes, sinnvolle neue Funktionen, Premium-Kandidaten.
Qualität vor Menge. Keine Floskeln. Jeder Fund mit Beleg aus dem CODE
(Zeile lesen, nicht Kommentar – § 3.2). Vermutung klar als Vermutung markieren.

## Ausgabeformat
Schreibe deine Befunde nach
/tmp/claude-0/-home-user-Wiederholung/1ea5d803-be3e-55d6-b5eb-7e16e415a180/scratchpad/audit/<dein-kürzel>.md
in genau diesem Format, ein Block je Fund, nach Schwere sortiert:

```
#### <KÜRZEL>-<Nr>: <Titel in einfachen Worten>
- Art: Fehler | Unvollständig | Verbesserung | Fehlt | Funktion | Premium
- Schwere: kritisch | hoch | mittel | niedrig
- Beleg: `datei:zeile` + kurzes Zitat; Messung falls gemacht; „verifiziert" oder „Vermutung"
- Warum es stört: ein bis zwei Sätze, aus Sicht der Nutzer:in oder des Betreibers
- Vorschlag: konkret, was geändert wird (Dateien, Funktionen)
- Entscheidet: Agent (mechanisch, im Rahmen) | Betreiber (Lernlogik, Recht, Religion,
  Marke, neue Funktion, Premium) | Konsole (Firebase/Google Cloud/Domain – Betreiber klickt)
- Umsetzung: Haiku (reine Textersetzung, eindeutig) | Sonnet (klar umrissene Code-Änderung
  mit Spezifikation) | Opus (Ursache unklar, mehrere Stellen, Architektur, Regeln, Sicherheit)
- Abnahme: messbares Kriterium, woran man sieht, dass es erledigt ist (Test, Messung, grep)
- Pro/Contra: nur wenn „Entscheidet: Betreiber" – ehrlich gewichtet, dann Empfehlung
```

Am Ende der Datei: „Geprüft ohne Fund:" – Liste, was du angesehen hast und in
Ordnung ist (damit es nicht doppelt geprüft wird).

Deine Schlussantwort an mich: nur Pfad der Datei, Anzahl Funde je Schwere, die 3 wichtigsten in je einer Zeile.
