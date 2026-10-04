# Paket D – D15: Ersatzzeichenwege anhand gepinnter Quellen geprüft

03.10.2026. Nur vorhandene Daten und exakt zum gesicherten Browser passende
Skia-Quellen geprüft. Kein Browser gestartet, keine neue Bildprobe, kein
Produktentwurf. Server 8099 HTTP 200, BatteryStatus 1 (60 Prozent).
D12/D13/D15 bleiben zurück; D14 geschützt, Z1 ausgelassen, G1 offen.

## Ergebnis und Grenze

Für die geprüften internen Zeichenwege ist kein pixelgleicher günstiger
Ersatz belegt. Das ist keine Behauptung, dass jeder denkbare Ersatz unmöglich
ist. Die Übertragung einer CSS-/SVG-Konstruktion auf genau einen internen
GPU-Pfad ist ebenfalls nicht belegt. Deshalb keine weitere Browservariante
und keine Produktkorrektur nach Verdacht. D bleibt nach CODEX-START §6 angehalten.

Die ursprüngliche Regel bleibt äußere Ellipsen-/fwidth-Deckung mal invertierte
innere Radialdeckung, mit dem bereits belegten Paint und Mischkontext.
Geometrisch gleiche Konturen oder derselbe Farbwert garantieren diese
Regel nicht. Die bisherige SVG-Alternative bleibt mit 325 Fehlerpixeln abgelehnt.

## Drei abgegrenzte Wege

1. **Einzelne Kontur / EvenOdd-Pfad:** Device::drawDRRect hat einen
   EvenOdd-Fallback. Er wird benutzt, wenn der ursprüngliche analytische
   Zeichenweg nicht verfügbar ist. Die Quelle garantiert damit keine gleiche
   Deckung. Der vorhandene einzelne SVG-Pfad ist bereits bildlich widerlegt.
   Keine weitere Konturvariation.
2. **Analytischer Differenzclip:** ClipStack bildet einen geglätteten
   Differenzclip auf kInverseFillAA und für Rundrechtecke auf GrRRectEffect
   ab. FillRRectOp kann passende Intersect-Clips geometrisch übernehmen;
   einen Difference-Clip übernimmt diese Funktion nicht geometrisch.
   Damit kann der innere Prozessor wieder in derselben Zeichenoperation
   landen. Die Quelle begründet keine Beseitigung des teuren Compilerpfads.
   Ein gleicher Quellhash für jede denkbare Clipkonstruktion wird nicht behauptet.
3. **Zwei getrennte Rundrechteckmasken:** SurfaceDrawContext::drawRRect
   wählt abhängig von Form, AA und Caps zunächst CircularRRectOp, danach
   gegebenenfalls FillRRectOp und weitere Fallbacks. Normale Rundrechtecke
   haben also nicht pauschal nur eine einzige Glättungsregel. Im Chat war die
   erste Formulierung dazu zu weit; hier ist sie präzisiert. Zwei radiale
   Deckungen ersetzen die ursprüngliche äußere Ellipsenregel nicht exakt.
   Äußere Ellipsenregel und innere Radialregel getrennt zu zeichnen könnte
   im idealen Rechenmodell das Produkt erhalten. Ein realer Maskenweg muss
   zusätzlich Parameter, Interpolation, Zwischenspeicherung, Komposition
   und Rundung erhalten. Diese Gleichheit ist bisher nicht belegt. Aus der
   Quelle folgt weder eine sichere Pixelgleichheit noch eine sichere Verbesserung.

Ein eigener WebGL-/Rasterrenderer wird daraus nicht gebaut: Er wäre kein
belegter kleiner Austausch des bestehenden Zeichenwegs. Das vorhandene
Float64-Modell und gemischte Acht-Bit-Endbilder ersetzen keine GPU-Maske.

## Begrenzte Offline-Gegenprüfung

Das bereits gesicherte Deckungsmodell wird unverändert gelesen. Für seine
22 Punkte und vier Ableitungsphasen wird nur die äußere Ellipsenregel durch
die idealisierte Radialregel ersetzt. Alle 88 Werte unterscheiden sich.
Beispiel (26,1608), Phase (0,0): ursprüngliches Modell 0,04358915748,
beide Deckungen radial 0,04477134301. Maximale absolute Differenz der
Deckungsprodukte 0,04408549165. Kein Radius/Farbwert an Bilder angepasst.

Dies sind Float64-Formelwerte, keine GPU-/RGB-Messwerte. Das Ergebnis
widerlegt lediglich die Behauptung, beide Formeln seien identisch. Es
beweist keine Fehlerzahl einer ungebauten Browsermaske und entscheidet
keine Abnahme. Original-SKP, Shader, Bilder und frühere Modelle bleiben erhalten.

## Quellen und Erhaltung

Browserrevision und Skia-Pin stammen aus D15-DECKUNG. Verwendete Revision:
2466dcf3937437e217e7f284afe0e1aae15891ce.

- [Device::drawDRRect](https://skia.googlesource.com/skia/+/2466dcf3937437e217e7f284afe0e1aae15891ce/src/gpu/ganesh/Device.cpp), ab Zeile 651.
- [SurfaceDrawContext::drawRRect](https://skia.googlesource.com/skia/+/2466dcf3937437e217e7f284afe0e1aae15891ce/src/gpu/ganesh/SurfaceDrawContext.cpp), ab Zeile 1022.
- [ClipStack](https://skia.googlesource.com/skia/+/2466dcf3937437e217e7f284afe0e1aae15891ce/src/gpu/ganesh/ClipStack.cpp), Zeilen 221–265 und ab 1450.
- [GrOvalOpFactory](https://skia.googlesource.com/skia/+/2466dcf3937437e217e7f284afe0e1aae15891ce/src/gpu/ganesh/ops/GrOvalOpFactory.cpp), Zeilen 240–247, 2608–2628 und ab 3218.
- [FillRRectOp::clipToShape](https://skia.googlesource.com/skia/+/2466dcf3937437e217e7f284afe0e1aae15891ce/src/gpu/ganesh/ops/FillRRectOp.cpp), ab Zeile 304.

Die zwei zusätzlichen offiziellen Quellen liegen mit URL/SHA256-Manifest
unter TEMP paket-d15-zeichenweg-20261003-232324/. Der Web-Leser konnte
GrOvalOpFactory nicht öffnen; die exakt gepinnte offizielle TEXT-Quelle
wurde deshalb direkt abgerufen. Nur erfolgreich geladene Quellen verwendet.
radialvergleich.py/json erhalten den unveränderten Eingabehash und sämtliche
88 Vergleiche. Keine Ausgabe des früheren Modells überschrieben.

## Haltepunkt und Wiederaufnahme

Die vorhandenen Daten begründen derzeit keine nächste Produkt- oder
Browserprobe. Nicht erneut eine allgemeine Schatten-/Maskenserie beginnen.
Wiederaufnahme erst mit einem konkreten steuerbaren Zeichenweg und einem
prüfbaren Gleichheitsbeleg für ursprüngliche Deckung und Komposition; alternativ
mit einer gezielten Instrumentierung, die die fehlenden tatsächlichen
GPU-Parameter bzw. Deckung erfasst. Eine solche Erfassung ist noch nicht
implementiert oder als verfügbar belegt. Keine neue Aufnahme allein, um
denselben ungeklärten Zustand noch einmal zu sehen.

D12: starke historische Fehler weiter ohne zeitgleiche GPU-Ressourcen;
D13 wartet auf D12. Keine Ursache von D15 darauf übertragen. D14 bleibt
wegen Text-Probelauf geschützt. Keine Version, Commit, Push oder Veröffentlichung.

Gegenprüfung §2a/§2b/§3: ursprüngliche Regeln erhalten, internen Quellweg
von Browserzuordnung getrennt, keine Gleichheit aus idealer Algebra abgenommen,
keine Aufgabe erledigt. app.js/sw.js-Syntax und pruefe_stand.mjs grün.
Produkt-SHA256 unverändert gegenüber Übergabe; kein Gesamt-/Tempo-Test auf Akku.

Neue Quellwegprüfung, feste Offline-Eingaben, frühere Dokumentstände und
vollständiger geänderter/unversionierter Arbeitsbaum zusätzlich dauerhaft
unter C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-D15-Zeichenweg-232324/
gesichert: 75 Dateien / 2.573.768 Bytes, sämtliche Quell-/Kopie-SHA256 gleich.
Originale und ältere Sicherungen bleiben erhalten. Endgültige Dokumentation
separat unter sicherungsabschluss/ mit eigenem Hashmanifest.
