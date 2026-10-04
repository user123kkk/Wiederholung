# Paket D – D15: Erfassbarkeit fehlender GPU-Daten geprüft

03.10.2026. Konkreter Auftrag: mit vorhandenen Daten prüfen, ob fehlende
GPU-Parameter gezielt erfasst werden können. Kein Browser gestartet,
kein Foto, keine Produktänderung, kein Werkzeug installiert oder Browser
ersetzt. Server 8099 HTTP 200, BatteryStatus 1 (58 Prozent).

## Ergebnis

Mit dem vorhandenen Prüfstand und installierten Browser ist kein verfügbarer
Messweg für die fehlenden Uniform-/Attributwerte nachgewiesen. Mehr CDP-
Screenshots oder ein unveränderter Trace-Lauf schließen diese Lücke nicht.
Ein technisch konkreter zusätzlicher Weg existiert in der passenden ANGLE-
Quelle: Capture-fähige Build, die GL-Aufrufe und Uniform-Payloads aufzeichnet.
Eine solche Build ist hier nicht nachgewiesen und wurde nicht erstellt.
Externe native Capture-Werkzeuge sind in den geprüften Orten nicht vorhanden.
D bleibt nach CODEX-START §6 angehalten; keine erneute Blindprobe.

Das Ergebnis ist begrenzt: Nicht jede denkbare Debugger-/Trace-Schnittstelle
wurde untersucht. Das Fehlen von Binary-Strings allein beweist keine Build-
Konfiguration. Keine globale Unmöglichkeit und keine erfolgreiche Erfassung
behaupten. Die Messinfrastruktur ist die konkrete offene Voraussetzung.

## 1. Vorhandene Spur

Die unverändert gelesene spur-luecken.json beschreibt A3/trace.json mit
15.901 Ereignissen und SHA256
375a22015a151587c69dc0b58f81abc25d0749f530dd3fe5e4a5dcf7da009b67.
Keine strukturierten numerischen Parameterfelder für die gesuchten Werte;
25 GetVertexExecutableTask-Ereignisse enthalten keine entsprechenden Zahlen.
Shaderquelltext benennt Uniforms, erfasst aber nicht ihren damaligen Inhalt.
Diese frühere Auswertung wird nicht durch einen neuen Lauf überschrieben.

## 2. CDP der exakten Browserrevision

Browserrevision f89f3a4363808e117c592adedcf9947882ac3b79.
[Browser-Protokoll](https://chromium.googlesource.com/chromium/src/+/f89f3a4363808e117c592adedcf9947882ac3b79/third_party/blink/public/devtools_protocol/browser_protocol.pdl)
und alle 52 darin eingeschlossenen Domain-Dateien vollständig heruntergeladen,
mit Hashes erhalten. Inventar: 580 deklarierte Methoden. Einzige Fundzeile
für Shader-/Uniform-Wörter: Storage-Aufzählungswert shader_cache; keine
Methode zum Auslesen der internen Skia-Uniform-/Attributpuffer deklariert.
Diese Suche entscheidet keine beliebigen externen oder privaten Schnittstellen.

[LayerTree](https://chromium.googlesource.com/chromium/src/+/f89f3a4363808e117c592adedcf9947882ac3b79/third_party/blink/public/devtools_protocol/domains/LayerTree.pdl)
liest bzw. wiederholt Paint-Snapshots und liefert CommandLogs/Bilder.
Das ist keine Zugriffsmethode auf den ursprünglich ausgeführten GPU-Aufruf.
SystemInfo liefert Geräte-/Treiberinformationen. Runtime evaluiert Seiten-
JavaScript; ein eigener WebGL-Kontext der Seite gibt keinen Handle auf
Skias internen Kontext. Kein Replay-Bild als Originaltextur deklarieren.

## 3. ANGLE-Capture: konkreter Quellweg, fehlende Build-Voraussetzung

Die bereits gesicherte Chromium-DEPS pinnt ANGLE auf
802a8704ca940b633b731493ee192e0661eb8cdd. Nur diese Revision verwendet.

[CaptureAndReplay](https://chromium.googlesource.com/angle/angle/+/802a8704ca940b633b731493ee192e0661eb8cdd/doc/CaptureAndReplay.md)
beschreibt eine Capture-fähige Build mit angle_with_capture_by_default=true.
Danach setzen ANGLE_CAPTURE_FRAME_START/END und ANGLE_CAPTURE_OUT_DIR
Aufnahmebereich und Ausgabe. Die Dokumentation benennt unvollständige
GLES-/EGL-Abdeckung; keine pauschale Zusage für jeden Chrome-Kontext.

[gni/angle.gni](https://chromium.googlesource.com/angle/angle/+/802a8704ca940b633b731493ee192e0661eb8cdd/gni/angle.gni)
setzt angle_with_capture_by_default standardmäßig auf false.
[BUILD.gn](https://chromium.googlesource.com/angle/angle/+/802a8704ca940b633b731493ee192e0661eb8cdd/BUILD.gn)
unterscheidet libANGLE und libANGLE_with_capture, mit separaten Compile-
Definitionen und gegebenenfalls libGLESv2_with_capture. Die
[Mock-Implementierung](https://chromium.googlesource.com/angle/angle/+/802a8704ca940b633b731493ee192e0661eb8cdd/src/libANGLE/capture/FrameCapture_mock.cpp)
setzt mEnabled=false und führt onEndFrame leer aus. Umgebungsvariablen
allein machen aus dieser Implementierung keine Capture-Build.

Der echte [CaptureUniform4fv](https://chromium.googlesource.com/angle/angle/+/802a8704ca940b633b731493ee192e0661eb8cdd/src/libANGLE/capture/capture_gles_2_0_autogen.cpp)
erfasst Location, Count und Value. Der passende
[Parameterleser](https://chromium.googlesource.com/angle/angle/+/802a8704ca940b633b731493ee192e0661eb8cdd/src/libANGLE/capture/capture_gles_2_0_params.cpp)
kopiert count * sizeof(GLfloat) * 4 Bytes. Das wäre ein tatsächlicher
GL-Uniform-Payload statt einer aus PNG-Farben geratenen Zahl.

Die installierte Chrome-Version 154.0.8037.93 enthält in der geprüften
Versionsstruktur keine libGLESv2-/Capture-Komplement-DLL; gefunden wurde
chrome.dll, 302.709.400 Bytes, SHA256
3a4c451878fc9fef50a84463d06724ad09e54b6bce03d74285c3544eb1947fd3.
Vier in FrameCapture.h vollständig belegte Capture-Variablennamen fehlen
in dieser Datei sowohl als ASCII als auch UTF-16LE. Das zusammen mit den
Quellvorgaben stützt die Einschätzung, dass eine bloße ENV-Änderung kein
belegter Messweg für diese Installation ist. Es beweist nicht endgültig,
wie der Hersteller jede Build-Option gesetzt hat. Kein nutzloser ENV-
Browserlauf und kein DLL-Austausch als vermeintliche Gegenprobe.

ANGLE-GL-Payloads wären noch keine direkte Messung aller finalen D3D-
Konstanten, Hardware-Ableitungen oder Deckungspixel. Genau diese Ebenen
müssen im Ergebnis auseinandergehalten werden; reine Capture-Verfügbarkeit
wäre noch keine Pixelgleichheits- oder kalte Tempoabnahme.

## 4. Vorhandene native Werkzeuge

Read-only geprüft: PATH für renderdoccmd/qrenderdoc/apitrace, vier konkrete
Standardpfade unter Program Files und die drei üblichen Uninstall-
Registrierungszweige auf RenderDoc/apitrace/Nsight/PIX. Kein Treffer.
werkzeug-inventar.json enthält die begrenzten Ergebnisse. Keine Aussage
über jedes beliebige portable Werkzeug irgendwo auf der Festplatte.
Keine Installation, Injection oder Änderung von GPU-Sandbox/Backend.

## Wiederaufnahme: ein klarer technischer Haltepunkt

Zunächst müsste eine passende Capture-fähige Umgebung bereitstehen:
ANGLE-Capture-Build oder geeignetes natives Capture-Werkzeug. Mit diesen
vorhandenen Mitteln ist sie nicht verfügbar belegt. Ein Chromium-Neubau
oder Austausch des Prüf-Browsers ist kein kleiner nächster Fotoaufbau-Fix.
Er wurde im Rahmen dieser Erfassbarkeitsprüfung nicht begonnen.

Eine spätere gezielte Erfassung muss den bekannten Shaderhash/Programm,
den konkreten Draw-Aufruf, Uniformwerte, Vertex-/Attributdaten und Render-
Target/Clip-/Mischkontext gemeinsam verbinden. Aufzeichnungen müssen ihre
Ebene benennen. Originalbilder dürfen sich durch Instrumentierung nicht
ändern; sonst keine Übernahme als gleichwertige Pixelreferenz. Instrumentierte
Zeiten sind keine unveränderte kalte Tempoabnahme. Kein Gesamtscreenshot-
Testlauf nur zur Suche nach einem schon bekannten Fehler.

Die vorhandenen acht Bit gemischten PNGs bleiben kein direkter Ersatz für
eine Alpha-/Deckungstextur. Kein Maskenentwurf, keine Toleranzänderung,
kein Modellwert als gemessener GPU-Wert. D12/D13 brauchen weiter ihre
zeitgleichen starken Ressourcenbelege; die D15-Infrastrukturfrage löst
sie nicht. D14 geschützt, Z1 ausgelassen, G1 offen. Nicht veröffentlicht.

## Erhaltung und Gegenprüfung

Alle Quellen/Manifeste, vollständige Protokolldomains, Binary-Metadaten,
Inventare und Auswerter unter TEMP paket-d15-erfassbarkeit-20261003-233845/.
Zwei zunächst angenommene Dateinamen lieferten 404; danach offizielles
Verzeichnis gelesen und tatsächliche FrameCaptureCommon-/Parameterquellen
verwendet. 404-Ergebnisse erhalten; daraus keine Quellaussage abgeleitet.
Die Suchaufrufe auf diese nicht vorhandenen Namen waren ungültig und wurden
durch erfolgreich geladene Quellen ersetzt. Keine früheren Daten überschrieben.

Gegenprüfung §2a/§2b/§3: Messweg und fehlende Build-Voraussetzung konkret
belegt, eingeschränkte Binär-/Werkzeugprüfung sichtbar, keine Erfassung oder
Abnahme behauptet. Produktdateien unverändert. Nur Dokumentation/Offline-
Helfer ergänzt; keine Version, Commit, Push oder Veröffentlichung.

Erfassbarkeitsprüfung, vollständige gepinnte Quellen/Protokolldomains,
begrenztes Binary-/Werkzeuginventar, feste Eingangsdaten und vollständiger
geänderter/unversionierter Arbeitsbaum zusätzlich dauerhaft unter
C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-D15-Erfassbarkeit-233845/
gesichert: 141 Dateien / 3.661.949 Bytes, sämtliche Quell-/Kopie-SHA256 gleich.
Originale und frühere Sicherungen erhalten. Abschlussdokumentation separat
unter sicherungsabschluss/ mit Hashmanifest. Aktuelle Python-Syntax,
Quellen-SHA256 und git diff --check grün; Produktbytehashes unverändert.
Kein neuer Produkt-/Gesamt-/Tempo-Test.
