# D12/D13 – Reihenfolge der Raster- und Viewportänderung

03.10.2026, Fortsetzung nach D-UEBERGABE-2026-10-03.md. Nur Diagnose;
keine Produktkorrektur, keine geänderte Fotoabnahme und kein Paketabschluss.

## Vorhandene Daten zuerst

Arbeitsbaum mit allen 43 übernommenen geänderten/unversionierten Dateien
und Hashmanifest gesichert unter
`C:/Users/USER/AppData/Local/Temp/paket-d-kachelbreite-20261003-175521/`.
Server 8099 bereits HTTP 200/19.539 Bytes; BatteryStatus 2.
app.js und styles.css behalten die vollständigen Übergabehashes.

Neue Belege zusätzlich dauerhaft unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-Kachelbreite-175521/`:
909 Dateien / 570.954.170 Bytes, alle Quell-/Kopie-SHA256 gleich.
Originale, abgebrochene Proben und frühere Auswerter erhalten.

`timeline.py` liest die vorhandenen grünen und roten Spuren, ohne sie
zu überschreiben. `timeline.json` enthält feste Trace-SHA256, beide
Fotomarken, Raster-/Viewportwerte und Ereignisse. Die betrachtete
Hintergrundebene gehört jeweils zum tatsächlichen Rendererprozess;
512×833-Snapshots anderer Prozesse gehören nicht zu dieser Ebene.

| Gespeicherte Aufnahme | erster erfasster 2×-Rasterzustand ab Vorher-Marke | tatsächliche Kacheln |
|---|---|---|
| Feedback, gpu-quads-20261003-1402 | 81,269 ms, Viewport 780×1688 | 800×448 |
| Feedback, kacheln448-20261003-1515 | 81,954 ms, Viewport noch 390×844 | 224×448; außerdem alte 416×448-Kacheln |
| Antwort, animationsebenen-20261003-weiter2 | 79,536 ms, Viewport noch 390×844 | 224×256; außerdem alte 416×256-Kacheln |

Im roten Feedbacklauf folgt der größere Viewport erst bei 95,206 ms;
die 224×448-Kacheln bleiben bei 110,786 ms erhalten. Auf Antwort folgt
780×1688 bei 96,196 ms, mit weiterhin 224×256-Kacheln. Die Rasteränderung
und die Viewportänderung gelangen also in unterschiedlicher Reihenfolge
in den erfassten Grafikzustand. DOM, Maßstab und Endanimationen der
bereits dokumentierten Paare bleiben gleich.

## Quellcode derselben installierten Revision

Die Quellen der Browserrevision `f89f3a4363808e117c592adedcf9947882ac3b79`
konnten diesmal über Gitiles als Base64-TEXT geladen werden; lokale
Originaldateien liegen im genannten Diagnoseordner. Der Quellen-Browser
lieferte für einige URLs weiterhin einen Zugriffsfehler.

- [tile_size_calculator.cc](https://chromium.googlesource.com/chromium/src/+/f89f3a4363808e117c592adedcf9947882ac3b79/cc/layers/tile_size_calculator.cc):
  Ausgangsgröße aus `gpu_raster_max_texture_size`, bei größerem Rasterinhalt
  halbe Breite, zwei Randpixel und Aufrunden auf 32. Bei Rasterinhalt
  780×1688 und Ausgangsviewport 390×844: erste Breite 416, deshalb erneut
  mit halber Breite 195; (195+2) aufgerundet ergibt 224. Höhe
  ceil(844/4)+2 aufgerundet ergibt 224, Mindesthöhe 256 bzw. 448 greift.
  Ausgangsviewport 780×1688 ergibt dagegen 800×448.
- [picture_layer.cc](https://chromium.googlesource.com/chromium/src/+/f89f3a4363808e117c592adedcf9947882ac3b79/cc/layers/picture_layer.cc):
  `gpu_raster_max_texture_size` wird im Zweig `kChangedGeneralProperty`
  aus dem Commit-Viewport gesetzt. Ein aktueller sichtbarer Viewport
  allein beweist daher keinen bereits erneuerten Rasterparameter.
- [page_handler.cc](https://chromium.googlesource.com/chromium/src/+/f89f3a4363808e117c592adedcf9947882ac3b79/content/browser/devtools/protocol/page_handler.cc):
  Aufnahme setzt Emulationsparameter und anschließend die physische
  Ansichtgröße. Ganze Dokumentaufnahme setzt zusätzlich vorübergehend
  eine 1×1-Emulationsgröße.

Die Rechnung erklärt die gemessenen Dimensionen und passt zur erfassten
Reihenfolge. Der konkrete interne Setter des Rasterparameters ist im
alten Trace nicht unmittelbar protokolliert. Die Quellcodezuordnung
ist deshalb eine begründete Erklärung, kein Nachweis sämtlicher
historischer Fehlerpixel oder der Korallressource.

## Daraus abgeleitete Einzelproben

`x_d12_kachelbreite.js` verwendet ausschließlich den gesicherten originalen
Hintergrundverlauf. Frischer Browserprozess je A/B/A, jeweils nur das
erste Foto. Keine Produktdatei, Animation oder Pixelskala geändert.

1. `--disable-threaded-compositing` scheitert an `Unable to capture screenshot`.
   Kein geeigneter Aufnahmeweg. Vorherige Teilbelege und Fehlerlog erhalten.
2. `captureBeyondViewport:false`: A und B pixelgleich, aber das zweite
   Original wieder 95.737 andere Pixel bei 224×256 statt 800×448. Damit
   kein belastbarer Stabilitätsnachweis. Ordner
   `paket-d-kachelbreite-probe-1791043271670/analysis.json`.
3. Nur die physische Fläche vorab mit `Emulation.setVisibleSize` auf
   780×1688 setzen und 200 ms warten. DOM einschließlich Viewport/DPR,
   Animationen und Verlauf gleich. A/B/A diesmal pixelgleich zur
   historischen 800×448-Verlaufreferenz; B zeichnet ebenfalls 800×448.
   Weil beide Originale ebenfalls gleich sind, beweist diese einzelne
   Probe noch keine zuverlässige Fehlerbehebung. Ordner
   `paket-d-kachelbreite-probe-1791043386842/analysis.json`.

## Gezielte App-Probe, unveränderte historische Referenz

`x_d12_flaeche_probe.js` setzt nur die physische Aufnahmefläche vorab,
verlangt unverändertes DOM und unveränderte gehaltene Animationen und
stellt die Fläche nach dem ersten strengen Foto zurück. Der ursprüngliche
Fotovergleich und seine Referenzen bleiben unverändert. Die ersten Fotos
werden nicht durch Folgefotos ersetzt.

390/hell/bewegt/voll: 16/16 Fotos pixelgleich. Alle 16 Vorab-DOM-/Animations-
Vergleiche gleich. Vollständige Bildmarken und gezeichnete Kacheln über
die expliziten `coverage_tiles.tile.id_ref` mit den aktiven Tile-Objekten
verbunden, nicht über numerisch gleiche Rasterzähler. Feedback, Antwort
und Rundenende zeichnen bei 2× jetzt 800×448. Andere Dokumenthöhen haben
entsprechend andere Kachelhöhen; keine pauschale Festhöhe behauptet.

Daten unter `paket-d-fotos/d12-20261003-stand1/flaeche-vorab-20261003-1810/`:
`analysis-coverage.json`, `flaechen/`, originale PNGs und `diagnose/0/trace.json`.
35 ausgefilterte Konfigurationen enthalten null Fotos und sind keine Abnahme.

Weitere gezielte Proben mit derselben historischen Referenz:

- `flaeche-korall-20261003-1816`: 390/dunkel/bewegt/leer, 9/9 erste
  Fotos gleich, Vorab-DOM und gehaltene Animationen gleich. Der historische
  starke Korallfehler tritt nicht auf; seine Ursache ist damit nicht bewiesen.
- `flaeche-konto-20261003-1818`: 320/dunkel/bewegt/voll, acht erste Fotos
  gleich, neuntes Foto Einstellungen rot. Ein Pixel (546,112) verändert
  sich von RGB (20,19,17) nach (20,18,17). Unveränderte Assertion stoppt
  sofort; Konto-Löschen und spätere Zustände nicht erreicht. Alle neun
  Vorab-DOM-/Animationsvergleiche gleich. Die Hintergrundebene zeichnet
  beim roten Foto bereits 640×576 bei 2×. Volle Breite allein garantiert
  daher keine Pixelgleichheit. Ursache dieses Pixels noch nicht belegt.

Insgesamt 34 erste Fotos: 33 gleich, eines rot; **keine Gesamtabnahme**.
`analysis-states.json` enthält vollständige Marken, explizit referenzierte
Kacheln, Pixelzahlen und Trace-SHA256. Für Rot zusätzlich
`erster-fehler-pixel.json`, Differenzbild, zeitgleiche DOM-/Animationsdaten,
Quads und Ebenen-Rasterbilder in `diagnose/12/`. Korall-Probe in `diagnose/5/`.
Diese beiden Proben aktivieren die vorhandene Ebenen-Ressourcendiagnose
nach dem jeweiligen ersten Foto; mögliche Auswirkungen auf spätere Fotos
sind nicht ausgeschlossen. Sie sind Ursachenproben, keine Tempoabnahme.
Am Ende der Korall-Probe und beim Beginn der 320-Probe überlappen die
Browser kurz. Aus Zeiten dieser Proben wird keine Leistungsbewertung abgeleitet.

## Eigene Prüfaufbaufehler und Erhaltung

Die erste Kommandozeilenabfrage brauchte `--enable-automation`; vor einer
Messung abgebrochen, Log erhalten. Danach derselbe Schalter in allen
Varianten. Die erfolglose Single-Thread-Aufnahme liefert keine Messung.
Ein erster Coverage-Auswerter verglich die nackte explizite Zeigerreferenz
mit `cc::Tile/Zeiger` und fand keine Kacheln. Sichtbar korrigiert auf den
Zeigeranteil desselben referenzierten Tile-Objekts. `analysis.json` und
alter Auswerter bleiben erhalten; korrigiertes Ergebnis separat in
`analysis-coverage.json`. Keine Schlussfolgerung aus den leeren Listen.

## Grenzen und nächster konkreter Schritt

D12/D13 bleiben zurück. Die neue Vorab-Fläche ist ein Diagnosekandidat;
sie ist nicht in den Abnahmestandard übernommen. Die ursprünglichen
32 Korallpixel und 70.880 Konto-Löschen-Pixel bleiben ungeklärt. Ein grüner
gezielter Rundgang ist kein Ursachenbeleg für diese historischen Fehler.

Als Nächstes: zuerst den neuen Ein-Pixel-Fehler mit seinen bereits
gesicherten Ressourcen und Quads lokalisieren; volle Breite ist bereits
erfasst und reicht nicht als Erklärung. Eine neue Gegenprobe muss diesen
konkreten Unterschied erklären, ohne Animationsebenen, Referenz, Skala
oder Grenzwerte zu ändern. Für einen starken Korallfehler beim ersten
Auftreten vollständige zeitgleiche Ressourcen/Quads erhalten. Erst nach
diesem Ursachenbeleg den Fotoaufbau ändern und alle Zustände streng
prüfen; danach D13. D14 geschützt, Z1 ausgelassen, G1 offen; D15 unverändert.
