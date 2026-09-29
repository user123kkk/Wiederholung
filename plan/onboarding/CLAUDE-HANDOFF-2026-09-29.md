# Übergabe an neuen Claude-Code-Chat — 29.09.2026

## Auftrag und Pause

Der Betreiber hält die Großplan-Arbeit ausdrücklich **vor Runde 14 an**.
Er prüft Runde 13 und beauftragt Claude mit einer gezielten unabhängigen
Prüfung, insbesondere des weiterhin fehlerhaften iPhone-Starts. Nicht den
Großplan automatisch weiterführen. Keine nächtliche Routine starten.
Keine abgeschlossenen Runden erneut abarbeiten, keine Quran-/Text-Lernfunktion
bauen. Q1 bleibt eine offene Idee, kein Bauauftrag.

Maßgebliches Repo: `C:\Users\USER\Desktop\Wiederholung`,
`user123kkk/Wiederholung`, direkt `main`, kein PR und kein neuer Branch.
Letzter **App-Commit**: `f550897`, Version **3.17.51**, auf `origin/main`.
Diese Übergabe wird als eigener reiner Dokumentationscommit nachgetragen.
Runde 14 hat noch **keine Produktänderung**. Bei Pause war der Arbeitsbaum
sauber; anschließend wurden ausschließlich Übergabe/Statusdateien geändert.

Der Betreiber meldet am 29.09.: Auf seinem Gerät steht jetzt **.51**,
der Start ist **immer noch falsch**. Das ist eine Gerätebeobachtung, keine
Bestätigung eines erfolgreichen Loading-Fixes. Codex hat nicht selbst
Hosting oder Produktionsregeln veröffentlicht. Den tatsächlichen Server-
und Regelstand bei Bedarf getrennt prüfen, nicht aus einer Versionsanzeige
den Zustand des iOS-Startbild-Caches ableiten.

## Zuerst lesen — begrenzte, konkrete Reihenfolge

1. `CLAUDE.md`, dann `plan/LEHREN.md` vor einer Änderung.
2. Diese Übergabe vollständig; danach die historische UI-Übergabe
   `plan/onboarding/CHATGPT-HANDOFF-2026-09-27.md` vollständig.
3. `plan/PLAN.md`, Abschnitt „Wo eine neue Session anfängt“, und den
   obersten Eintrag in `plan/grossplan/LOGBUCH.md`.
4. Nur für die unabhängige Prüfung von Runde 13: Änderungen in
   `git diff 5de6969..f550897`, insbesondere `app.js`, und
   `plan/grossplan/befunde/NACHLESE-2026-09-29.md` sowie
   `NACHPRUEFUNG-2026-09-29.md`. Nicht alle alten Befunddateien neu lesen.

## Was seit dem damaligen Stand 3.17.42 passiert ist

3.17.42 gehörte laut Changelog zu **Runde 11**, nicht Runde 12.
Für eine Gesamtsichtung ist `git diff <Commit von 3.17.42>..f550897` möglich;
den Ausgangscommit aus `git log` ermitteln, nicht raten. Gezielt prüfen:

| Version | Tatsächliche Änderung und Grenze |
|---|---|
| .43–.44 | Zunächst Onboarding-Layout/Probekarten-Clipping; anschließend den fehlerhaften sticky-Weiter-Fuß und künstlichen 11rem-Puffer entfernt. Kurze Screens halten den Fuß unten, lange wachsen/scrollen normal. Kein sticky-Overlay wieder einbauen. |
| .45–.46 | Drei redundante Texte entfernt; Plan-Takt/Leiter entschleunigt; mehrere konkurrierende Smooth-Scrolls durch eine kontrollierte RAF-Bewegung ersetzt. Probekarten-Bewertung aktualisiert nur den Bereich unter der vorhandenen Karte. Kritische Boot-Geometrie bereits inline im HTML, Zustand `data-stand="ruhig"`. Details/Fehlversuche in Übergabe 27.09. |
| .47 (`a5ea99c`) | Kartenindex/Render-Vermeidung bei unveränderten Bewertungs-Echos für große Bestände; 31 Splash-PNGs neu erzeugt mit **mobilem** Browserkontext. Desktop-Scrollleistenplatz hatte vorher ungefähr 7,5px horizontalen Versatz erzeugt. Kein Beweis für korrekten echten iOS-Kaltstart. |
| .48 (`6216e7c`) | Alle 31 `apple-touch-startup-image`-URLs versioniert; Generator liest `APP_VERSION`. Ziel: alte PNGs unter identischen URLs nicht weiterverwenden. Codex-Modellplan dokumentiert, kein automatischer Modellwechsel. |
| .49 (`c3a6aec`) | Nur `.boot` im `display-mode: standalone` von `100svh` auf `100vh` umgestellt, in Inline-CSS **und** `styles.css`. Browser bleibt `100svh`. Chromium-Test simuliert 48px kleinere svh-Höhe und erhält den erwarteten Unterschied von 24px bei der Zentrierung. Das ist eine Simulation, kein gemessener WebKit-Befund auf diesem iPhone. |
| .50 (`5de6969`), Runde 12 | Atomare Tageszähler/Mehrgeräte-Reset-Grenze, Bewertung an Ursprungskonto gebunden, aktive Karte/Canvas bei Zähler-Echos erhalten, sichtbare Reset-Fehler, fortlaufendes Wisch-Tempo. Neue `verlaufEpoche` in Regeln/Datenschutzerklärung berücksichtigt. Keine Änderung von Lernstufen, Intervallen oder Freischaltregeln. |
| .51 (`f550897`), Runde 13 | G-097 Nutzer-Fallback, G-098 Konto-Löschung, G-100 Bereich-Löschung/alte Dialoge, G-101 Vollschreiben an Ursprungskonto gebunden; G-013 leeres Passwort-Link-Feld. **Kein weiterer Loading-Layout-Fix** in .50/.51. |

Der ursprüngliche Veröffentlichungsskript-Abbruch durch lokale `AGENTS.md`
und `plan/werkzeuge/splash-links.txt` wurde mit gezielten Ignore-Einträgen
behoben (`b6319f5`). Die Schutzprüfung blieb erhalten; Hosting schließt
Agenten-/Plandateien aus. Diese beiden Dateien nicht als App-Dateien hochladen.

## Startscreen: gezielt an dieser Stelle ansetzen

Das Betreiberfoto zeigt in einem Übergangsbild zwei vertikal versetzte
Logos und zweimal „Adrabic“. Die Ursache ist **noch nicht nachgewiesen**:
Übergang des nativen iOS-Startbildes zum HTML oder Bewegung innerhalb HTML.
Auch eine alte native Aufnahme ist nicht durch .51 in der App ausgeschlossen.
Nicht einfach „Cache“ behaupten, zusätzliche Offsets bauen oder alle PNGs
ohne vorherigen geometrischen Befund erneut erzeugen.

Lokales Foto, soweit noch vorhanden:
`C:\Users\USER\Downloads\IMG_4397.PNG` (828×1792, Statusleiste sichtbar).
Älteres Veröffentlichungsfoto:
`C:\Users\USER\AppData\Local\Temp\codex-clipboard-a3712db2-853f-4019-abfa-ecbcc32fd07d.png`.
Diese Anhänge sind nicht ins Repo kopiert. Für den neuen Chat zuerst den
vorhandenen lokalen Pfad versuchen; fehlende Bilder nicht erfinden.

Relevante Stellen/Werkzeuge:

- `index.html`: 31 Startup-Links, kritisches Inline-CSS, statisches `.boot`.
- `styles.css`: `.boot` und seine Bestandteile, Standalone-Regel, Bewegung.
- `app.js`: `bootBild()` und der Austausch/Abbau des Boot-Screens.
- `plan/werkzeuge/startbilder.js`: bestehender Generator, kein Neuentwurf.
- `plan/werkzeuge/pruefstand/t_boot_geometrie.js`: Icon-Pixelvergleich für
  Handy/iPad-Hoch-/Querformat, Versions-Links, Inline-/CSS-Geometrie,
  simulierte svh-Abweichung. **Schriftvergleich und native iOS-Überblendung
  sind dadurch nicht abgenommen.**
- `t_klein_boot.js` und aktuelle gezielte Onboarding-Regressionen.

Empfohlenes Vorgehen: Originalfoto ansehen; die drei Ebenen native PNG,
HTML ohne geladenes styles.css und HTML nach CSS/app.js vergleichen.
Prüfen, ob dieselbe Geometrie, Schrift, Safe Areas und Bewegung gelten.
Ein mobiler Chromium-Viewport ist kein installiertes iOS-WebKit.
Erst eine belegte Ursache minimal beheben. Falls hier kein echter iPhone-
Zugriff besteht, dessen Bestätigung ausdrücklich offen lassen und einen
konkreten Geräteprüfschritt formulieren; nicht „fertig“ melden.

Nach einer Boot-/Motion-Änderung angrenzend prüfen: kurze/lange Viewports,
Hürden-Auswahl inklusive „Nichts davon“, Scrollposition, Probekarte →
Bewertung, Plan-Aufbau, fertiger Plan, reduzierte Bewegung und Drehen.
Keine Lernlogik anfassen, keine neue UI-Architektur einführen.

## Was für .51 bereits geprüft wurde — nicht grundlos doppeln

Produkt-/Stub-/Lib-Fingerabdruck:
`e9bfc140b1c5b853ae53eea110907c92faf3dc62bc41c4496fc264ef77fae48a`.

- **104 `t_*.js` insgesamt**: 91 übrige Skripte ausgeführt, alle Exit 0,
  vollständige Ausgaben gelesen; separat frische Pflichtabnahme **13/13**.
  Skriptanzahl ist keine Behauptung von 104 scharfen Verhaltensprüfungen:
  alte beschreibende Diagnosen enthalten leere/überholte Ausgaben.
- Auth-/Lösch-Gegenproben mit angehaltener Antwort und Wechsel A→B;
  richtige Reauth-Reihenfolge, Passwort/Google-Abbruch und Erfolg,
  offline kein Write, Timeout, Folgeanmeldung ohne Reload.
- G-039-Gegenprobe korrigiert: fehlende Hürden-Auswahl war ein Messfehler.
  Altkarte bewegt sich tatsächlich 205→165, aktuelle Abnahme grün.
- Kontrast/A11y/große Ansichten grün; Touch-Swipe-Fälle und Lernen-Abnahme
  mit vollständigen Ausgaben gelesen.
- Zufallstest Handy **200 Schritte, Seed 1302**, iPad **150, Seed 1303**,
  beide 0 Befunde. Das widerlegt keinen echten iOS-Startfehler.
- .50: echtes Firebase-JS-SDK gegen lokalen Firestore-Emulator für
  Mehrgeräte/Offline/Reset-Undo, Regeln **179/179**. .51 änderte die Regeln
  nicht. SDK- und Attrappenprüfungen im Logbuch ausdrücklich getrennt.
- `node --check app.js`, Versions-/CSP-/APP_SHELL-Prüfung und Diff grün.

Logs lokal unter `%TEMP%\adrabic-pruefstand-gesamt\e9bfc140b1c5b853`,
zusätzlich vollständige letzte Lernrunden-Ausgaben unter
`%TEMP%\adrabic-rundenabnahme`. Für zielgerichtete Prüfungen siehe
`plan/werkzeuge/pruefstand/LIESMICH.md`.
`alle_pruefen.js --fortsetzen` bzw. `abnahme_runde.js --fortsetzen` verwenden
nur bestandene Fälle desselben Quellstands **und** Einzeltest-Hashes.
Keine alten Ergebnisse nach App-/Stub-/Lib-Änderungen weiter als aktuell
ausgeben. Veränderten Test ebenfalls frisch ausführen. Volle Pflichtfolgen
bei einer entsprechenden Produktänderung nach LEHREN, nicht für reines Lesen.

Windows-Standby unterbrach mehrere Nachtläufe; diese zählen nicht als grün.
Nur die anschließend abgeschlossene Folge ist oben genannt. Der eigene
Wachhalte-Prozess, Server :8099 und Emulator :8081 wurden zur Pause beendet;
globale Energieeinstellungen blieben unverändert. Chrome lokal:
`C:\Program Files\Google\Chrome\Application\chrome.exe`, Playwright-
node_modules bereits im ignorierten Prüfstand-Ordner vorhanden.

## Grenzen und bekannte offene Funde

Keine Gesamtfreigabe, **A1/A5/A6 nicht erfüllt**. Runde 14 wäre genau:
G-102 Weitergabe/Lehrer-Stand, G-103 Datei-/Code-/Mehrfachimport,
G-104 Migration, G-105 Board-Rückmeldungen, G-106 Bestätigungs-Rückmeldungen
nach Kontowechsel. Bereits dokumentiert, **nicht neu entdecken oder als
gelöst melden**, nicht in dieser pausierten Runde bauen.

Reproduktionswerkzeuge unter `plan/grossplan/befunde/werkzeuge/`.
`--gegenprobe` verwendet den festen Altstand `5de6969` und erwartet den
Fehler; ein solcher Exit 0 beweist keine aktuelle Korrektur. Die frisch
erweiterten Dreifälle in `konto_import.js` und der vollständige App-Test
`konto_umzug_app.js` sind **noch nicht ausgeführt**. Die dokumentierten
bisherigen FileReader-/Funktions-Gegenproben bleiben davon getrennt.

Leistungsgrenzen: CPU 4× ergab beim ersten Runden-/Verwalten-Aufbau längere
Pausen (u.a. 450ms). iPad-Schreiben schwankte: Gesamtlauf 124 Bilder >34ms,
isolierter aktueller Lauf 0; Altstand .50 isoliert 59 bis 217ms. Daher
keine pauschale Flüssigkeitsaussage und keine bewiesene .51-Regression;
nicht wegen einer Einzelmessung Zeichnen oder Wischen umbauen.

## Veröffentlichung und Abschluss dieser gezielten Prüfung

Keine neue App-Version für diese reine Übergabe. Bei einer späteren
App-Korrektur alle Versionsstellen/Startup-URLs, Changelog und Pflichtprüfungen
mitziehen; direkt main committen/pushen. Keine Produktionsveröffentlichung
als bloßen Review-Nebenschritt. Seit .50 müssen die aktuellen Regeln
**vor Hosting** veröffentlicht werden (K10/K11); eine .51-Anzeige beweist
nicht den Regel-Deploy. Betreiberhinweise wie üblich konkret nummerieren.

Am Ende der Claude-Prüfung: Befunde mit Codebeleg, bereits bekannte vs.
neue Funde, tatsächliche Änderungen/Tests und verbleibende Geräteprüfung
berichten; Plan/Logbuch entsprechend aktualisieren. Großplan bleibt
pausiert, bis der Betreiber ihn ausdrücklich wieder aufnimmt.
