# Paket D – kritische Prüfung und begrenzte nächste Ursachenfrage

**Nachtrag aus der ausgeführten Fortsetzung:** Befehl 26 ist der Rahmen;
seine alleinige Entfernung lässt den Shader bestehen. Kausal isoliert ist
der Inset-Block 19–25 mit `drawDRRect` 23. Die frühere globale
`--kante:none`-Probe entfernt sämtliche Schatten und war nicht auf die
Innenkanten beschränkt. Eine einzelne geometrisch abgeleitete Alternative
ist mit 325 Fehlerpixeln abgelehnt. Vollständige Korrektur und Rohbelege:
[`D15-OPERATION-2026-10-03.md`](D15-OPERATION-2026-10-03.md).
Der ursprüngliche Prüfauftrag unten bleibt als Verlauf erhalten.

03.10.2026. Auftrag: vorhandene Belege kritisch prüfen, keine Blindproben,
Verdachtsfixes oder gelockerte Abnahme. Keine neue Browseraufnahme in diesem
Schritt. Server 8099 HTTP 200, BatteryStatus 1. Produktdateien behalten die
vollständigen Übergabehashes. Alle Entwürfe, Rohdaten und alten Berichte bleiben.

## Ergebnis und Reihenfolge

D12 wurde zuerst geprüft. Der Kachelunterschied ist durch echte Quads weiter
bestätigt; daraus folgt weiterhin keine Erklärung sämtlicher Fehlerpixel.
Die starken historischen Konto-/Korallfehler haben keine zeitgleichen Spuren
und die begrenzte instrumentierte Probe reproduziert sie nicht. Das lässt
sich durch wiederholte gleiche Rundgänge nicht sachlich auflösen. D12/D13
bleiben zurück. Insbesondere wird der bekannte einzelne Kanalwert nicht
wieder zum Ersatzauftrag gemacht.

Im selben Paket hat D15 eine enger begrenzte, prüfbare Frage: **Erzeugt
Zeichenbefehl 26 der erhaltenen Navigations-Picture, im ursprünglichen
Clip-/Transform-Kontext, den bekannten teuren Innenkanten-Shader?** Der Befehl
ist jetzt genau bestimmt. Das ist der nächste sinnvolle Diagnoseauftrag;
noch keine Aufforderung, die Kante zu ersetzen oder zu entfernen.

## D12: sichtbare Korrektur der Coverage-Aussage

Frühere Berichte bezeichneten `coverage_tiles` teilweise als tatsächlich
gezeichnete oder vollständige Kachelliste. **Diese Formulierung ist zu stark.**
Die bereits gespeicherte Quelle der installierten Browserrevision
`f89f3a4363808e117c592adedcf9947882ac3b79`, `picture_layer_impl.cc:1796`,
erzeugt das Debug-Feld in `PictureLayerImpl::AsValueInto` durch
`tilings_->Cover(gfx::Rect(bounds()), MaximumTilingContentsScale(),
GetIdealContentsScaleKey())`. Das ist eine separate Debug-Aufzählung.
Explizite Zeigerreferenzen identifizieren die darin genannten Tile-Objekte;
sie machen diese Aufzählung nicht automatisch zur vollständigen Zeichenliste.

Konkreter Gegenbeleg aus denselben vorhandenen Feedback-Spuren:

| Gespeicherte Spur | Debug-Coverage | Hintergrundquads im vollständigen Root-Pass |
|---|---:|---:|
| rot, `kacheln448-20261003-1515` | 4 | 16 |
| grün, `gpu-quads-20261003-1402` | 2 | 4 |

Der Root-Pass ist in beiden Fällen 780×1688. Seine Hintergrundgruppe hat
dieselbe Identitätstransformation, Deckkraft 1, `SrcOver` und denselben Clip.
Die Rechtecke der 16 beziehungsweise vier Quads decken jeweils die ganze
Fläche ohne überlappende Rechteckflächen ab. Rot hat innere senkrechte
Grenzen bei x=223,445,667; Grün hat keine innere senkrechte Grenze. Beide
haben waagerechte Grenzen bei y=447,893,1339. Ressourcennummern gehören zum
jeweiligen Lauf und beweisen keine gemeinsame Texturidentität zwischen Läufen.

Damit bleibt die Aussage über unterschiedliche Kachelbreiten bestehen.
Die Anzahl beziehungsweise vollständige Abdeckung muss aus `quad_list`
und ihren `shared_quad_state`-Daten gelesen werden. Frühere Coverage-
Auswertungen bleiben erhalten; diese Korrektur ersetzt keine alten Rohdaten.

## D12: zwei einfache Erklärungen halten der Prüfung nicht stand

In jeder betrachteten Foto-Zeitspanne gibt es genau einen
`SkiaRenderer::CopyDrawnRenderPass`. Er liegt innerhalb eines
`DirectRenderer::DrawFrame` desselben Prozesses und Threads:

| Spur | letzter Hintergrund-Snapshot | DrawFrame | CopyDrawnRenderPass |
|---|---:|---:|---:|
| rot | 110,786 ms | 111,425 ms | 112,651 ms |
| grün | 94,665 ms | 95,131 ms | 96,157 ms |

Zeiten relativ zur jeweiligen Vorher-Fotomarke. Beide letzten Snapshots
melden bereits den physischen Viewport 780×1688, idealen und tatsächlichen
Rastermaßstab 2 und Rastertranslation (0,0). Die unterschiedlichen
Kacheln bleiben im roten Frame nach der Viewportänderung bestehen.
**„Das Foto wurde einfach noch vor der großen Viewportänderung kopiert“**
wird durch diese Daten nicht gestützt. Ebenso ist kein gemischter
Rastermaßstab durch diese Snapshots belegt.

Die Zuordnung des letzten Renderer-Snapshots zum kopierten GPU-Pass bleibt
eine zeitliche Zuordnung: das Copy-Ereignis hat keine Renderpass-ID in seinen
Argumenten. Daraus werden keine Rohtexturpixel oder vollständige
GPU-Ressourcenidentität abgeleitet.

Das rote Feedbackfoto enthält 29.323 Fehlerpixel, alle maximal eine
Kanalstufe. Nur 290 liegen höchstens einen Bildpixel von den drei neuen
senkrechten Quadgrenzen entfernt; 29.033 liegen weiter weg. Eine Erklärung
allein durch schmale senkrechte Kachelnähte ist damit unzureichend.
Diese Zählung dient der Diagnose; alle 29.323 Pixel bleiben Abnahmefehler.

Die weiterhin sinnvolle D12-Frage wäre: **Entstehen die Farbabweichungen
bereits beim Rastern desselben Verlaufs in verschieden große Texturen,
oder erst beim Abtasten/Mischen/Kopieren dieser Texturen?** Die vorliegenden
PNG-Endbilder und Metadaten trennen diese Alternativen nicht eindeutig.
Auch `LayerTree.replaySnapshot` liefert keine Rohkopie der damaligen GPU-
Textur. Eine neue D12-Messung wäre erst sinnvoll, wenn sie genau diese
Trennung messen kann: eindeutig zugeordneter kopierter Pass und betreffende
Texturpixel vor dem Mischen, bei identischen Paint-Parametern, Animationen,
Skala und Quelle. Ein erneuter Screenshot mit einer anderen Wartezeit oder
einer weiteren Browserflag beantwortet diese Frage nicht.

Für historische starke Konto-/Korallpixel gelten die Grenzen separat.
Das helle Feedback-Paar erklärt weder deren Schriftabweichungen noch den
Korallblock. Keine Übertragung einer Ursache auf alle Fehlerklassen.

## D15: genaue Operation und entscheidbare Diagnose

Quelle: TEMP `paket-d-ursachen-messung-1791033304233/0/zeitgleiche-pictures/
193342472641-befehle.json`, 79 Befehle. Gezählt ab Index 0:

- Befehl 20 setzt den inneren Rundclip (1,1)–(365,65), Radius 29.
- Befehl 23 zeichnet einen `drawDRRect` mit weißer Farbe nach einer
  Translation um y=1; dieser Kontext wird anschließend wiederhergestellt.
- Befehl 26 zeichnet `drawPath` mit `fillType: InverseWinding`, innerem
  Rundrechteck (1,1)–(365,65), Radius 29 und Farbe `#11FFFFFF`.

Befehl 26 ist der ausdrücklich inverse, schwach weiße Innenkantenpfad.
Die vorausgehenden Clip-/SaveLayer-Zustände gehören zur Operation. Die
Picture enthält daneben Außenschatten, Grundfläche und weitere Navigation;
die ganze Picture pauschal als „nur die Innenkante“ zu bezeichnen wäre falsch.

Die frühere kalte CSS-A/B/A-Gegenprobe beweist, dass das Entfernen von
`--kante` an Navigation und Startliste den bekannten Shader entfallen lässt.
Sie entfernt aber mehrere Zeichen-/Clipkombinationen. Das belegt noch
nicht, dass Befehl 26 allein den Shader auslöst. Auch Befehl 23 und die
Clipkombination bleiben bei der nächsten Zuordnung zu berücksichtigen.
Bekannter Fragmentshader-SHA256:
`5eca2e32640eaf1e5d4ddaba6aabba71f6e8893512b84baeeb471b3cf8d5f811`.

Der begrenzte nächste Auftrag ist eine isolierte Grafikdiagnose aus der
gespeicherten Picture, ohne Produktänderung:

1. Originalen Clip-/Transform-Kontext und Befehl 26 zusammen isolieren.
   Die volle gespeicherte Befehlsliste bleibt feste Eingabe.
2. Kontrollieren, ob die isolierte Operation denselben Shaderquellhash
   erzeugt. Bei abweichendem Hash die Zuordnung als nicht bestätigt
   beenden; keine Zeitersparnis aus einem anderen Zeichenweg behaupten.
3. Zur kausalen Zuordnung Original / diagnostisch ausgelassener Befehl 26 /
   Original verwenden, jeweils abgeschlossener frischer Browserprozess,
   gleiche Instrumentierung und feste Quelle. Das Weglassen ist nur
   Diagnose und ausdrücklich keine zulässige Gestaltungskorrektur.
4. Erst nach bestätigter Operation einen alternativen Zeichenweg gegen
   exakt dieselben ursprünglichen Pixel prüfen. Ohne Pixelgleichheit
   kein Produktentwurf. Kalte Startbildfolge und Gerätewirkung bleiben
   danach eigene Abnahmebedingungen.

Dieser Auftrag wurde hier konkretisiert, nicht ausgeführt. Kein neuer
Browser, kein warmer Erfolg, keine dritte Produktkorrektur.

## Nachweise und Abschluss

Neue reine Offline-Auswerter und Ergebnisse unter TEMP
`paket-d-kritische-pruefung-20261003-204600/`:
`spur-inventar.json`, `frame-pruefung.json`, `renderpass-pruefung.json`,
`quad-kurz.json`, `kanten-und-operation.json`. Sie enthalten feste Trace-,
Bild- und Befehlslistenhashes. Verwendete Browserquellen waren bereits
gesichert; keine Recherche oder neue Browsermessung nötig.

Gegenprüfung §2a/§2b/§3: Befund und Rohdaten selbst gelesen, falsche
Vollständigkeitsannahme sichtbar korrigiert, keine abgeschlossene Aufgabe
behauptet und keine Referenz, Toleranz oder Maske eingeführt. Syntax von
app.js/sw.js und `pruefe_stand.mjs` grün; kein erneuter Gesamtlauf.
Ein eigener `rg`-Leseaufruf enthielt versehentlich den PowerShell-Parameter
`-ErrorAction`; er wurde abgelehnt und lieferte keine Befunde. Die tatsächlich
vorhandenen Quelldateien wurden anschließend direkt gelesen.

D12/D13/D15 bleiben zurück, D14 geschützt, Z1 ausgelassen, G1 offen.
Kein anderes Paket, keine Version, kein Commit/Push/Veröffentlichung.

Kritische Prüfung, verwendete Eingaben und vollständiger Arbeitsbaum
zusätzlich dauerhaft unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-Kritische-Pruefung-204600/`
gesichert: 71 Dateien / 400.703.495 Bytes, alle Quell-/Kopie-SHA256 gleich.
Originale bleiben erhalten; Abschlussdokumentation separat unter
`sicherungsabschluss/` mit eigenem Hashmanifest.

