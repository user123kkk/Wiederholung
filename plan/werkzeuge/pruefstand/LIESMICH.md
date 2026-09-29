# Prüfstand (Playwright, Firebase-Attrappen und lokaler Emulator)

Für die Prüfschleife (`plan/audit/AUFTRAG.md`). Liegt unter `plan/`, wird also
nicht ausgeliefert.

- `stubs.js` – zustandsbehafteter Nachbau von Firebase App/Auth/Firestore; wird
  per `page.route` statt `www.gstatic.com` ausgeliefert.
- `lib.js` – `start()`, `neueSeite(browser, GERAETE.x, {user, store, ls, leer,
  thema, warte})`, `aktion(p, data-action, data-id, warte)`, `foto(p, name)`,
  `vollerStore()` (40 Karten über alle Stufen, 25 Tage Verlauf).
- `affe.js` – Zufallstest: `node affe.js handy 200 7` (Gerät, Schritte, Seed).
- `t_sprung.js` – misst, ob die Karte beim Aufdecken springt (Ziel: 0 px).
- `t_bild.js` – hält Animationen Bild für Bild an (`document.getAnimations()`).
- `bogen.py` – Kontaktbogen: `python3 bogen.py aus.png 800 a.png b.png …`.

Einrichten (einmal):

```
cd plan/werkzeuge/pruefstand
npm init -y && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm i playwright
# im Repo-Wurzelordner, eigener Prozess:
python3 -m http.server 8099 --bind 127.0.0.1
# dann z. B.:
CHROMIUM=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node t_sprung.js
```

Fotos landen in `$PRUEF_BILDER` (Standard: `<tmp>/adrabic-pruefbilder`).
`node_modules/` und `package*.json` nicht einchecken.

## Mehrgeräte-Zähler und Kontowechsel (3.17.50)

`t_verlauf_mehrgeraete.js` verwendet das echte Firebase-JS-SDK 10.14.1
gegen den lokalen Firestore-Emulator mit den Regeln dieses Repos. Nur Auth
ist eine Attrappe. Zwei getrennte Browser-Kontexte haben getrennte echte
Offline-Caches. Keine Produktivdaten: Projekt fest `demo-adrabic-pruefung`,
Firestore fest `127.0.0.1:8081`. Der Test leert ausschließlich dieses
Emulator-Projekt. Die offiziellen SDK-Dateien werden beim Start geladen.

Emulator mit `firebase emulators:start --only firestore --project
demo-adrabic-pruefung --config <lokale-config.json>` starten. Die lokale
Konfiguration muss `firestore.rules` dieses Repos verwenden und
`emulators.firestore` auf Host `127.0.0.1`, Port `8081` setzen. Dann bei
laufendem Prüfstand-Server und gesetztem `CHROMIUM`:

```
node plan/werkzeuge/pruefstand/t_verlauf_mehrgeraete.js
node plan/werkzeuge/pruefstand/t_verlauf_mehrgeraete.js --reset-undo
node plan/werkzeuge/pruefstand/t_pruefdatum.js
node plan/werkzeuge/pruefstand/t_wisch_tempo.js
node plan/werkzeuge/pruefstand/t_konto_schreibantwort.js
node plan/werkzeuge/pruefstand/t_konto_schreibantwort.js --gegenprobe
```

Der letzte Befehl weist den Kontowechsel-Fehler im alten Commit `c3a6aec`
nach: Er ist erfolgreich, wenn beide kontoübergreifenden Fehler und die
verspätete Fehlermeldung nach Abmeldung reproduziert sind.
Die neuen Tests blockieren Service Worker, damit SDK-Umleitung und
Testinstrumentierung auch beim Offline-Cache-Neustart gelten. Das ersetzt
keinen Service-Worker-Test und keinen echten iPhone-Kaltstart.

`--reset-undo` bestätigt die Bewertung zunächst am Server, trennt Gerät A,
setzt auf B zurück und überträgt anschließend das alte Undo von A.
Erwartet: Server null, nächste neue Antwort eins. Die Repo-Regeln müssen
das neue Feld `verlaufEpoche` samt Reset-Grenze enthalten.
`t_pruefdatum.js` prüft die Fixture-Lerntage vor/nach 04:00; `t_wisch_tempo.js`
führt aufgezeichnete Zeiten im echten Wisch-Listener aus, mit Altstand als Gegenprobe.
