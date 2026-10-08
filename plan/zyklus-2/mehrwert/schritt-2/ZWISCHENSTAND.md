# Schritt 2 – abgeschlossen (08.10.2026)

Auftrag: `../UEBERGABE-NEUER-CHAT-2026-10-08.md`, Schritt 2. Zwei Berichte,
nur gelesen, nichts gebaut. **Fertig.**

## Ergebnis

- [`BERICHT-ONBOARDING.md`](BERICHT-ONBOARDING.md) – Stand, Marhaba, Funde
  O-1 bis O-7, was entschieden und noch nicht gebaut ist.
- [`BERICHT-AUSSEHEN-BEWEGUNG.md`](BERICHT-AUSSEHEN-BEWEGUNG.md) – Funde
  A-1 bis A-7 (Bewegung), B-1 bis B-7 (Platzierung), Abgleich mit dem
  Video, Vorschlag für zwei kleine Pakete.
- Logbuch Zyklus 2 (oberster Eintrag), `STAND.md`, Übergabe und `LEHREN.md`
  (§ 5.3, § 15) sind nachgezogen.

## Wer hier weitermacht

1. Der Betreiber liest die Berichte und sagt, welche Funde gebaut werden.
   Nichts davon ist ein Bauauftrag.
2. Danach Schritt 3 der Übergabe (Paket I), wenn er es sagt.
3. „ladegerät“ (Schritt 1) steht weiter aus.

## Werkzeuge (zum Nachmessen)

Im Ordner `plan/zyklus-2/mehrwert/schritt-2/`, mit gesetztem `CHROMIUM`,
eigenem Server im Repo-Wurzelordner (`python -m http.server 8097 --bind
127.0.0.1`) und `PRUEF_PORT=8097` (Port 8099 liefert auf dem Laptop den
anderen Ordner, LEHREN § 5.3):

- `node tour.js <handy|safari|mini|ipad|desktop> <dunkel|hell> <voll|leer|gast>`
  – Rundgang mit Fotos (nach `PRUEF_BILDER`) und Bewegungsinventar.
- `node tour2.js handy dunkel` – Blätter, Menüs, Dialoge auf und zu.
- `node austritt.js` – Bild für Bild: gleitet ein Blatt beim Schließen?
- `python auswerten.py [Filter] [-v]` – Kurzfassung der Dateien in `daten/`.

Fotos liegen nicht im Repo (zu groß); sie entstehen mit `tour.js` neu.
Die Speicher-Schleife (jede Minute Commit und Push dieses Ordners) lief nur
während der Arbeit und ist beendet.

## Nachtrag 08.10., später: „Bewegung 1“ als Entwurf (ungeprüft)

- Der Betreiber hat `ladegeraet.bat` aus `Desktop\Wiederholung` gestartet
  (Stand c65fe6d, App 3.18.26). Solange der Lauf läuft: keine
  Browser-Tests starten (er misst Zeiten).
- Entwurf liegt im getrennten Ordner `C:\Users\USER\Wiederholung-bew1`
  (git worktree, losgelöst) und als
  [`bewegung-1-entwurf.patch`](bewegung-1-entwurf.patch) hier im Repo.
  Inhalt: A-1 (Blatt gleitet beim Schließen, `element.animate` statt
  Übergang im selben Schritt), A-2 (Üben-Auswahl und Speicherkarten blenden
  beim Aufklappen kurz ein; die Liste darunter springt weiter), A-3
  (Einstellungen: Eintritt nur beim ersten Besuch), D1-Test verlangt jetzt
  mindestens vier Lagen. Nur `node --check`, **kein Browser-Test**.
- Danach: Patch auf `main` anwenden, messen (`austritt.js` muss
  Zwischenlagen zeigen; alter Stand muss im neuen D1-Test rot sein),
  betroffene Tests, dann Version 3.18.27 mit voller Liste aus `CLAUDE.md`.
  Weil Blätter überall vorkommen: vor dem Veröffentlichen der volle Lauf.
- Hinweis: `netstat` ist auf diesem Laptop deutsch („ABHÖREN“, nicht
  „LISTEN“); Abfragen danach anpassen.
