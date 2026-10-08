# Schritt 2 – Zwischenstand (wird laufend überschrieben)

Auftrag: `../UEBERGABE-NEUER-CHAT-2026-10-08.md`, Schritt 2. Zwei Berichte,
**nur lesen, nichts bauen**: (a) Onboarding samt Marhaba, (b) Durchsicht
Aussehen/Bewegung über alle Bildschirme (N2, N3, N5, N6).
Schritt 1 („ladegerät“) holt der Betreiber später nach.

Betreiber 08.10.: „speicher alles jede 60 sek“. Deshalb liegt alles hier im
Repo; eine Schleife committet und pusht diesen Ordner jede Minute auf `main`.
Wer übernimmt (Claude oder Codex): diese Datei lesen, dann bei „Nächster
Schritt“ weitermachen.

## Wo was liegt

- `tour.js` – Rundgang mit Fotos und Bewegungsinventar. Aufruf im Ordner
  `plan/zyklus-2/mehrwert/schritt-2/`:
  `node tour.js <handy|mini|ipad|desktop> <dunkel|hell> <voll|leer|gast>`
  Vorher: `CHROMIUM` setzen, eigenen Server starten und `PRUEF_PORT` setzen
  (Port 8099 liefert auf dem Laptop den **anderen** Ordner mit 3.18.25,
  LEHREN § 5.3). Hier benutzt: `python -m http.server 8097 --bind 127.0.0.1`
  im Repo-Wurzelordner, `PRUEF_PORT=8097`, `PRUEF_BILDER=<Ordner>`.
- `daten/*.log` – eine JSON-Zeile je Schritt (Überschrift, Seitenhöhe,
  Animationen: Anzahl, Ziele, Ende in ms, Namen).
- Fotos liegen **nicht** im Repo (zu groß), sie entstehen mit `tour.js` neu.
- Berichte (entstehen): `BERICHT-ONBOARDING.md`, `BERICHT-AUSSEHEN-BEWEGUNG.md`.

## Erledigt

- Gelesen: STAND, LEHREN ganz, RUNDE-2, ERGEBNIS, BETREIBER-2026-10-07-NEU,
  VORBILD-MARHABA, `onboarding/` (ENTSCHIEDEN, NEUAUFBAU-3, Logbuch oben),
  `befunde/EIN.md`, `renderEinstieg` in `app.js` (7718–8033), Konstanten
  (1395–1500).
- Stand geprüft: `main` = 3.18.26, Arbeitsbaum sauber. Server 8099 liefert
  3.18.25 (fremder Ordner), eigener Server 8097 liefert 3.18.26.
- Rundgang Handy 390×844, dunkel, volles Konto: 33 Schritte, keine
  Seitenfehler, kein Querüberlauf (`daten/handy-dunkel-voll.log`).

## Fakten bisher (für die Berichte)

Onboarding:
- Heute acht Bildschirme (0 Willkommen, 1 Ziel, 2 Hürden, 3 Probekarte,
  4 Schrift, 5 Runde, 6 Zeitpunkt, 7 Aufbau + Plan), danach Konto.
- Zyklus 2, Paket B (3.18.12) hat alle zwölf Befunde EIN-1 bis EIN-12 und
  B13 („Dein Stand“) erledigt. Aus Marhaba übernommen: fester Rahmen,
  gesperrter Knopf, Aufbau Stück für Stück, Leiste am Ende noch einmal.
  Nicht übernommen (Z17): dunkle Auswahl-Karte mit Haken.
- Entschieden, aber nicht gebaut (RUNDE-2, Fragen 45–49): Proberunde direkt
  nach dem ersten Bildschirm, Schrift und Rundengröße raus aus dem Einstieg,
  Google über dem E-Mail-Formular. Karten für die Proberunde fehlen noch
  (freigegeben ist ein Wort).
- Zu prüfen: Echo der Hürde „schrift“ sagt „Dann fang bei den Buchstaben
  an“ und der Aufbau „große Schrift, Buchstaben als Karten“ – einen
  Buchstaben-Satz gibt es nicht (RUNDE-2 § 2.4, Frage 19).
- Großplan E-11, E-12, E-13: Betreiber hat „ja“ / „ja, mit Gerätetest“ /
  „teilweise“ gesagt; ob gebaut, noch gegen den Code prüfen.

Bewegung, aus `styles.css` gezählt:
- 60 `@keyframes`, rund 45 verschiedene Zeitwerte direkt in den Regeln.
  Die vier Zeit-Token (`--dur-instant/fast/base/slow`) kommen nur 53-mal
  vor; die Kurve `--ease-out` 119-mal, daneben 59-mal das eingebaute
  `ease-out` und 12-mal `ease`. Federkurve (`--ease-spring`) 23-mal.
- Fünf Endlos-Bewegungen: Lade-Kreisel, Schimmer, zwei im Ladebild,
  `einstieg-atmen`.

Bewegung, gemessen (Handy dunkel voll, Ende der letzten Animation):
- Start Lernen 1010 ms (13 Animationen), Fortschritt 590 ms (18),
  Verwalten 500 ms, Einstellungen 475 ms (7, **läuft bei jeder Rückkehr
  von einer Unterseite neu**), Unterseiten 280 ms (eine Bewegung),
  Seite „Lektionen“ 950 ms, „Die nächsten 7 Tage“ 900 ms.
- Runde: Start 520 ms, Aufdecken 540 ms (9–10 Animationen), Bewerten
  520 ms (7), Rundenende 2300 ms (12).
- Karte anlegen: Blatt auf 280 ms; **Schließen und Üben auf/zu: 0
  Animationen** (harter Wechsel, noch am Bild prüfen).

## Nächster Schritt

1. Fotos des ersten Rundgangs ansehen, Funde zur Platzierung notieren.
2. Rundgang `gast` (Einstieg), `leer`, dazu `hell`, `mini` (320×568), `ipad`.
3. Marhaba-Bilder stichprobenweise ansehen
   (`Downloads\bilder einer app (beispiel app)`, 45 Stück; Auswertung
   steht schon in `../../VORBILD-MARHABA.md`).
4. Beide Berichte schreiben, Logbuch Zyklus 2, STAND, Übergabe nachziehen.
