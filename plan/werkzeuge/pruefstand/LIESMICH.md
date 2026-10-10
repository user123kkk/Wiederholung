# Prüfstand (Playwright, Firebase-Attrappen und lokaler Emulator)

Für die Prüfschleife (`plan/archiv/audit/AUFTRAG.md`). Liegt unter `plan/`, wird also
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

Auf diesem Windows-Rechner liegt der geprüfte Chrome unter
`C:\Program Files\Google\Chrome\Application\chrome.exe` (29.09.: 154.0.8037.58).
In **jedem neuen PowerShell-Prozess** vor Browserprüfungen setzen:

```powershell
$env:CHROMIUM = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
node plan/werkzeuge/pruefstand/alle_pruefen.js --fortsetzen
```

Die Umgebungsvariable eines vorherigen Tool-Aufrufs wird nicht automatisch
übernommen. Ein fehlgeschlagener Browserstart liefert keine Messung; die
vorherige echte Fehlerausgabe vor Wiederholung zusätzlich bewahren.

Gesamtlauf: `node alle_pruefen.js`, oder die 13 Lernrunden-Tests separat mit
`node abnahme_runde.js` und die übrigen mit `node alle_pruefen.js --ohne-runde`.
Der zweite Befehl behauptet ausdrücklich keine vollständige Gesamtabnahme.
`--fortsetzen` bewahrt nur Exit-0-Ergebnisse desselben Produkt-/Stub-/Lib-/
SDK-Helfer-Quellstands mit identischem Testtext; A16 bindet zusätzlich
`diagnose_karten_konflikt.js` in seinen Testhash. Rote/unvollständige Fälle laufen neu.
Ausgaben unter `<tmp>/adrabic-pruefstand-gesamt/<Quellstand>` lesen.
Exit 0 allein bewertet keine beschreibenden Messungen oder Gegenproben.
Auch `abnahme_runde.js --fortsetzen` nutzt denselben Quellstand und Test-Hash;
bereits gültige Fälle bleiben erhalten, fehlende/rote laufen neu. Vollständige
Ausgaben bleiben zusätzlich pro Quellstand erhalten; alte Daten ohne Hash
werden nicht übernommen. Standby-Abbrüche sind keine bestandenen Tests.
Ein Preload schließt nur die frisch vom fehlerhaften Test gestarteten Browser;
der Fehler bleibt im Log und der Prozess endet mit Exit 1.

Batchmeldungen der Firestore-Attrappe betreffen nur die geänderten Pfade;
alle Änderungen eines Batches erscheinen gemeinsam. `node x_stub_batch.js`
prüft unberührte Karten, mehrere Änderungen/Löschungen und gefilterte Abfragen.
`--gegenprobe` erwartet am festen Vorstand 315bb0e einen Fehler beim erneuten
Lesen einer unberührten Karte. `x_ab_bestand_tempo.js` und `x_spur_bestand.js`
sind reine Diagnosehilfen am unveränderten Original-Tempotest (3000 Karten,
CPU4x, aktive Assertions); sie ersetzen weder diesen Test noch die Abnahme.

## Mehrgeräte-Zähler und Kontowechsel (3.17.50)

Der gesamte Prüfstand braucht zusätzlich für `t_tagesantworten_sdk.js`
das getrennte Demo-Projekt `demo-adrabic-karten-audit` auf `127.0.0.1:8082`,
ebenfalls mit aktuellen Repo-Regeln. Beide Projekte nie gleichzeitig durch
mehrere Tests seeden. `ladegeraet.ps1` stellt beide Emulatoren mit getrennten
Websocket-/Hub-/Logging-Ports bereit und bricht bei bereits belegtem
Firestore-Port ab. Für den uncommitteten Entwurf die Prüfungen separat
ausführen; der Ladegerät-Weg verlangt vorher gesicherte Quellen.

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

Testkarten nach dem Start durch die Firestore-API anlegen und den Snapshot
abwarten. Direktes Schreiben in __FB.store plus App-Arrays umgeht den
Listenercache; beim nächsten strukturellen Snapshot verschwinden solche
nur im Test erfundenen Karten. C27 verwendet dafür einen echten Stub-Batch
und wartet auf 200 Karten, bevor Auswahl/Löschen geprüft wird.


Mehrgeräte-Tagesantworten (A16): Eine absichtliche SDK-Regelablehnung muss
auch batch.update erfassen, nicht nur updateDoc. Der eigenständige
t_verlauf_mehrgeraete prüft den tatsächlichen Batchpfad und wartet auf
bereits laufende App-Belegprüfung zusätzlich zur SDK-Schreibwarteschlange.
Nach frühem Neustart nutzt er den vorgesehenen ausdrücklichen Prüfweg für
noch lokal erhaltene Kopien; keine automatische Startübertragung behaupten.
x_verlauf_batch_ablehnung prüft den ausgesandten Wrapper und die feste
315bb0e-Gegenprobe. Testgrenzen/erwartete Summen bleiben unverändert.
