# Paket D – vorbereiteter Capture-Messweg

03.10.2026. Auftrag: Capture konkret vorbereiten, alles erhalten. Pflichtdateien,
D-Übergabe, BEW-12–15 und D15-ERFASSBARKEIT gelesen. **Vorbereitung fertig;
Capture noch nicht einsatzbereit und D15 nicht abgenommen.** Kein Browserlauf,
keine Installation, kein Chromium-Build, kein Produktentwurf. D12/D13/D15
bleiben zurück; D14 geschützt, Z1 ausgelassen, G1 offen. Nicht veröffentlichen.

## 1. Feste Eingabe steht bereit

Arbeitsordner außerhalb des Repos:
`C:/Users/USER/AppData/Local/Temp/paket-d15-capture-vorbereitung-20261003/`.
Die dauerhafte Kopie wird im Sicherungsabschnitt unten genannt.

`eingaben/` enthält die **unveränderte A3-Navigation**, nicht den abgelehnten
SVG-Ersatz: original.html, original.png, DOM, Eingabe-/Shaderinventar,
historische Picture samt Befehlen und beide Shaderdateiformen. Neun Dateien,
1.631.860 Bytes; Herkunft und SHA256 in eingaben.json. Zehn zusätzliche
gepinnt heruntergeladene Primärquellen mit SHA256 in quellen.json.
Vorbereitungsskript und seine abgebrochene frühere Fassung bleiben erhalten.

Feste Identitäten:

| Gegenstand | SHA256 / Revision |
|---|---|
| Chromium | f89f3a4363808e117c592adedcf9947882ac3b79 |
| ANGLE aus Chromium-DEPS | 802a8704ca940b633b731493ee192e0661eb8cdd |
| Skia aus Chromium-DEPS | 2466dcf3937437e217e7f284afe0e1aae15891ce |
| original.html | 12559d08ee5ea08dbf48902e0102b3bc98b16fc1e571ddbaac74bc2461db1ea5 |
| original.png | 0f32967fce20d8a15245aa58cfa21db7513c45259552b548c96112a85dfd8f6f |
| Fragmentquelle, **exakte UTF-8-Trace-Bytes** | 5eca2e32640eaf1e5d4ddaba6aabba71f6e8893512b84baeeb471b3cf8d5f811 |

390×844 CSS-Pixel, Geräteskala 2, mobil/Touch, dunkel, Bewegung normal,
keine aktiven Animationen im gespeicherten Endzustand. Original-PNG:
780×1688. Nav-Rechteck (12,766), 366×66 CSS-Pixel. Inset-Block 19–25,
drawDRRect 23; Rahmen 26 bleibt erhalten. Eine spätere Capture-Aufnahme
muss diese Eingabe verwenden und ihre tatsächlichen Stile/Geometrie belegen.

**Eigene Vorbereitungskorrektur:** Der erste Kopierlauf verlangte für die
CRLF-Shaderdatei versehentlich den Hash der LF-Tracequelle und brach vor
einer Ergebnisbehauptung ab. Datei 1.320 Bytes, Tracequelle 1.283 Bytes;
die 37 CRLF erklären den Unterschied vollständig. Originaldatei unverändert
kopiert, exakte Quelle zusätzlich direkt aus A3/shader.json extrahiert.
Beide Hashes getrennt dokumentiert; keine Hashnormalisierung als Ersatz
für die exakte Programmidentität. Ein anfänglicher Leseaufruf auf
Operation/bestand.json fand keine Datei; vorhandenes auswertung.json gelesen.

## 2. Zwei zusätzliche Sperren vor einem ANGLE-Capture-Lauf

### Capture verändert die gemeldeten Fähigkeiten

Die gepinnte [Context.cpp](https://chromium.googlesource.com/angle/angle/+/802a8704ca940b633b731493ee192e0661eb8cdd/src/libANGLE/Context.cpp)
aktiviert ab Zeile 4584 bei enabled() die Capture-Limits. Zeile 4639 setzt
shaderNoperspectiveInterpolationNV=false. Der historische Shader verlangt
GL_NV_shader_noperspective_interpolation und hat zwei noperspective-Varyings.
Außerdem ändert der Block Programmbinär-/Buffer-Erweiterungen, Validierung
und Obergrenzen. Ab Zeile 9500 beeinflusst enabled() den Compile/Link-Pfad.

**Folge:** Standard-Capture ist kein belegter unveränderter Messweg für
diesen Shader. Ein anderes Programm oder andere Interpolation sperrt die
Übernahme. Das Abschalten des Feature-Schalters enableCaptureLimits alleine
genügt nicht: die Bedingung lautet enabled() **oder** Feature-Schalter.
Eine separate Diagnose-Build müsste diese Änderungen gezielt vermeiden
oder ihre Wirkung vollständig ausschließen. Eine solche Quellanpassung
ist hier nur als Voraussetzung benannt, weder gebaut noch als korrekt
getestet. Nicht einfach die ganze Limitprüfung löschen.

### Frame-Ende ist an einen Window-Swap gebunden

Context::onPreSwap, Zeilen 9771–9781, verwirft Swaps mit vorhandener
nicht-Window-Surface. Die gepinnte [Surface.cpp](https://chromium.googlesource.com/angle/angle/+/802a8704ca940b633b731493ee192e0661eb8cdd/src/libANGLE/Surface.cpp)
ruft diese Funktion vor swap/swapWithDamage auf. Erst
[FrameCaptureShared::onEndFrame](https://chromium.googlesource.com/angle/angle/+/802a8704ca940b633b731493ee192e0661eb8cdd/src/libANGLE/capture/FrameCapture.cpp)
schreibt Frame-Aufrufe und am Ende Indexdateien. Die anfängliche Framezahl
ist 1; START=0 wird auf 1 begrenzt (FrameCaptureCommon.cpp:429,458–461).

Skias Offscreen-Draw darf deshalb nicht mit einem sichtbaren Browserframe
gleichgesetzt werden. Vor einer Aufnahme muss belegt sein, ob sein Kontext
zur erfassten ShareGroup gehört und deren Window-Swap die Aufrufe abschließt.
Ein bloßes Browserende ist kein Ersatz: onDestroyContext schreibt einen
Index nur, wenn zuvor mindestens ein Frame fortgeschritten ist.
Fehlt der Abschluss, bleibt der Versuch unvollständig; nicht durch mehr
Screenshots, andere END-Zahlen oder einen Backendwechsel weiterraten.

## 3. Umgebung konkret bereitstellen – noch nicht ausgeführt

Gewählter vorbereiteter Quellweg: **eigener Chromium-Checkout derselben
Revision außerhalb dieses Repos**, mit passend gepinntem ANGLE. Eine
standalone ANGLE-DLL wird nicht in installiertes Chrome kopiert. Die
[Chromium-GL-Builddatei](https://chromium.googlesource.com/chromium/src/+/f89f3a4363808e117c592adedcf9947882ac3b79/ui/gl/BUILD.gn)
unterscheidet statisches ANGLE und echte/dummy Shared Libraries. Die bloße
Anwesenheit einer libGLESv2.dll wäre somit kein Capture-Nachweis.

Lokale begrenzte Read-only-Prüfung: rund 148,6 GB frei auf C:, 16,92 GB RAM,
gn/autoninja/gclient/cl nicht in PATH, vswhere.exe nicht am üblichen
Installerpfad. Keine globale Aussage über portable Toolchains.
BatteryStatus 1, 54 Prozent: kein Gesamtlauf oder Build gestartet.

Die [Windows-Bauanleitung dieser Chromium-Revision](https://chromium.googlesource.com/chromium/src/+/f89f3a4363808e117c592adedcf9947882ac3b79/docs/windows_build_instructions.md)
fordert mindestens 100 GB freien NTFS-Platz/8 GB RAM, empfiehlt mehr als
16 GB und nennt VS 2026 ≥18.0, Desktop C++/MFC/ATL, SDK 10.0.28000.2270
sowie Debugging Tools ≥10.0.26100.3323. Das sind die gepinnten Anforderungen,
nicht die abweichende standalone ANGLE-Anleitung (VS 2022).
Freier Platz belegt noch keinen ausreichenden Platz für zwei Builds.

Vorgesehene Folge bei erfüllten Voraussetzungen, in der separaten
Chromium-Wurzel; **diese Befehle sind noch nicht gelaufen**:

1. depot_tools/Toolchain gemäß gepinnter Anleitung einrichten, auf Netzteil
   prüfen. Checkout exakt auf Chromium-Revision setzen, DEPS-Sync; danach
   git rev-parse HEAD in src, third_party/angle und third_party/skia festhalten.
   Keine Änderung am Wiederholung-Arbeitsbaum und kein Austausch von Chrome.
2. Zwei getrennte Outputordner, gleiche übrige GN-Argumente:
   is_debug=false, target_cpu="x64", is_component_build=false. Referenz mit
   angle_with_capture_by_default=false, Diagnose mit true. Vollständige
   args.gn/GN-Werte/Ninja-Abhängigkeiten und Binary-Hashes sichern.
   GN-Argumente sind ein Grundgerüst, keine nachgewiesene Herstellerkonfiguration.
3. Nach Klärung **beider** Sperren aus §2:
   `gn gen out/D15Reference`, `autoninja -C out/D15Reference chrome`;
   analog out/D15Capture. Compiledefinition ANGLE_CAPTURE_ENABLED=1 in
   der tatsächlich vom Browser benutzten ANGLE-Zielkette nachweisen.
   Buildänderungen separat als Patch sichern, nie im Produkt übernehmen.
4. Nur danach Capture-Variablen lokal im gestarteten Diagnoseprozess setzen:
   ENABLED=1, FRAME_START=1, FRAME_END=1, COMPRESSION=0,
   LABEL=d15_original, OUT_DIR als **neuer leerer absoluter Ordner**.
   Gemeint sind jeweils ANGLE_CAPTURE_-Variablen. Endzahl 1 ist ein einzelner
   belegter Window-Swap-Abschnitt, kein Versprechen, dass er den Ziel-Draw
   enthält. Fehlt die Zieloperation: anhalten und die Kontextgrenze klären.
5. Den bestehenden A3-Ablauf aus Operation/probe.js zunächst nur als
   Ablaufvorlage lesen. Browserpfad und Ausgabeziel explizit auf die
   separate Build/neuen Ordner setzen; ausschließlich Originalvariante,
   keine C/D/E-Probe. Keine routinemäßigen Sandboxing-/Backend-/DPR-Schalter.
   Erst den gesamten Prozessabschluss bestätigen, dann die nächste Kontrolle.

RenderDoc/apitrace bleibt ein anderer, hier nicht verfügbar belegter Weg.
Weder Injection-Erfolg noch GPU-Prozess-/Offscreen-Erfassung ist nachgewiesen;
keine Installation oder ungeprüfte Ersatzaufnahme als Ergebnis dieser Vorbereitung.

## 4. Genau diese Daten am Ziel-Draw erfassen

Der Auftrag ist **GL-Aufrufpayload mit vollständigem Zeichenkontext**.
Die drei bekannten Fragmentuniforms heißen u_skRTFlip (vec2),
uinnerRect_S1 (vec4), uradiusPlusHalf_S1 (vec2). Nicht als Werte einsetzen,
was das frühere Geometriemodell ausgerechnet hat. Die vollständige
Vertexquelle und alle dortigen Uniforms kommen aus demselben Programm.

Pro tatsächlich zugeordnetem Draw sichern:

- GPU-PID/Thread, Kontext und ShareGroup, monotone Aufrufnummer, Capture-
  Abschnitt, Programm-/Shader-IDs, Linkgeneration und exakte Shaderquellen.
  Shaderhash allein reicht nicht: ein Programm kann mehrere Nav-/Listen-
  oder Kacheldraws ausführen. Shader-Compile-Zeit ist keine Draw-Zeit.
- UseProgram, Uniformlocations/Name/Typ/Arraylänge, vollständige relevante
  glUniform*-Writes **bis zu diesem Draw**, einschließlich früherer Frames/
  Setup, Relinks, Defaultwerten und gegebenenfalls UBO-Bindings/Inhalten.
  Ort/Anzahl plus Rohbytes, nicht nur die letzte zufällig gefundene Zahl.
- Vollständige Vertexquelle; VAO, Attributbindings, Datentyp/Normalisierung,
  Stride/Offset/Divisor, Vertex-/Indexpufferbytes und aktive Bereiche;
  Drawmodus/Indexart/First/Count/BaseVertex/Instanzen. Varyings vcolor_S0 und
  varccoord_S0 sind interpolierte Ergebnisse, keine direkt auszulesenden
  Vertexattribute. Keine Kandidaten aus getrennten Raster-ID-Zählern verbinden.
- FBO/RenderTarget/Attachment-IDs, Abmessungen, Format, Samplezahl,
  Viewport, Scissor, Clip-/Stencilzustand, Blendgleichungen/-faktoren,
  Write-Masken, Premultiplikation/Farbraum und zugehörige Layer-Komposition.
- Beziehung von Ziel-Draw zu drawDRRect 23 und erhaltenem Block 19–25,
  Rastertile/Skala/Transformation. Mehrere passende Draws getrennt auflisten.
  Die bisherige kausale Blockprüfung trägt zur Zuordnung bei, ersetzt aber
  keinen konkreten Capture-Aufrufbeleg.

Replay-CPP, Header, Index, alle angledata-Blobs und Rohlogs bleiben zusammen.
Ein fehlender Blob oder unsupported-Aufruf sperrt den betroffenen Beleg.
Der neue Offline-Leser `plan/werkzeuge/pruefstand/x_d15_capture_payload.py`
liest unkomprimierte Float32-Payloads mit verpflichtendem Datei-SHA256,
Grenzprüfung und exakten 32-Bit-Wörtern. Beispiel nach echter Erfassung:

```text
python x_d15_capture_payload.py --data <blob.angledata> --sha256 <Dateihash> --offset <GetBinaryData-Offset> --components 4 --count <Uniform-Anzahl>
```

Offset/Count werden aus dem konkreten zugeordneten CPP-Aufruf übernommen;
der Leser ermittelt weder Programm noch Draw selbst. Vertices mit gemischten
Typen benötigen ihren tatsächlichen Layoutleser. Nicht als Float32 ausgeben,
was Integer/normalisierte Bytes sind. Leserprüfung ist keine GPU-Messung.

## 5. Kontrollen und strenge Abbruchregeln

Vor Nutzbarkeit: gespeichertes A3-Original gegen separate Referenz-Build,
dieselbe Referenz gegen Capture-Build mit ENABLED=0, dann Capture aktiv
gegen deren deaktivierten Stand. Ganze 780×1688 RGB/RGBA-Bilder mit
identischer Geometrie/Stilen vergleichen, **null Fehlerpixel**; PNG-Dateihash
alleine ersetzt keinen dekodierten Pixelvergleich. Alle Rohbilder behalten.
Verschiedene Quellrevision, Shader/Interpolation, Backend/GPU/Treiber,
Bildgröße, Farb-/Blendkontext oder ein einziger abweichender Kanal sperrt
die Übernahme als ursprüngliche Pixelreferenz. Keine Masken oder Toleranz.

Dies ist eine gezielte Validierung der neuen Messinfrastruktur, keine neue
Foto-Blindserie. Bei erster ungeklärter Abweichung anhalten. Zeitlich früher
erzeugte Grünbilder ersetzen kein Rot; kein warmer Start als kalte Abnahme.
Captured GL-Bytes sind weder direkt gemessene D3D-Konstanten noch Hardware-
Ableitungen/fwidth oder eine originale Deckungstextur. Wenn diese Größen
weiter benötigt werden, bleibt deren Ebene ausdrücklich offen.

ANGLE onEndFrame ruft finishAllContexts auf; Capture verändert zudem den
Compile/Link-Ablauf. Deshalb **keine Capture-Zeit als kalte Tempoabnahme**.
Erst ein daraus begründeter pixelgleicher Produktentwurf dürfte wieder
BEW-15s echte kalte Bildfolge (Sprung ≤0,2), Boot-Regressionsprüfungen,
angrenzende Zustände und spätere Geräteprüfung durchlaufen. D12/D13s starke
historische Fehler brauchen weiterhin ihre eigenen zeitgleichen Ressourcen.

## 6. Gegenprüfung und Haltepunkt

§2a/§2b/§3 gegengeprüft: fester Originalblock statt SVG-Ersatz, Rohpayload
statt Modell, vollständiger Drawkontext statt Shaderhash allein. Zwei
Capture-Sperren durch gepinnte Quellen belegt. Keine bestehende Abnahme
geändert, keine Aufgabe als erledigt gesetzt. Produktdateien bytegleich
zum übernommenen Stand; Syntax/Standprüfung grün, HTTP 200/19.539 Bytes.
Kein Gesamtlauf/Tempo-Test auf Akku. Kein Commit, Push oder Deploy.

**Nächster Schritt:** Separate Build-Umgebung bereitstellen und zuerst die
Caps-Erhaltung sowie Offscreen-ShareGroup-/Abschlussfrage nach §2 belegen.
Erst danach ein gezielter Original-Capture mit den Kontrollen aus §5.
Ein unmodifiziertes angle_with_capture_by_default=true ist ausdrücklich
noch kein freigegebener Startpunkt für eine gleichwertige D15-Messung.

Abschluss nach Datumswechsel am 04.10.2026: Vorbereitung samt vollständigem
geändertem/unversioniertem Arbeitsbaum dauerhaft unter
C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-D15-Capture-Vorbereitung/
gesichert: 98 Dateien / 5.222.564 Bytes, alle Quell-/Kopie-SHA256 gleich.
Originale und frühere Sicherungen erhalten. Diese Abschlussdokumentation
liegt zusätzlich separat unter sicherungsabschluss/ mit eigenem Hashmanifest.
Fünf Produktbytehashes gleich; neue Python-Syntax/Offline-Leserprüfungen und
git diff --check grün. Kein Browser-/Gesamt-/Tempo-Test, keine Veröffentlichung.
Beim ersten Diffdruck brach Python-cp1252 am Pfeilzeichen ab; anschließend
mit PYTHONIOENCODING=utf-8 vollständigen eigenen Dokumentdiff gelesen.
Die Dateien waren unverändert gültig; kein Ergebnis aus dem Abbruch abgeleitet.

