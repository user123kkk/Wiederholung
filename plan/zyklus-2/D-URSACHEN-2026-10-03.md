# Paket D – Beweislage nach Vergleich der instrumentierten Fehlerbilder

**D15-Erfassbarkeit 03.10., ohne Browserlauf:** Exaktes CDP-Protokoll
mit 52 Domains/580 Methoden geprüft; keine deklarierte Methode für Skias
interne Uniform-/Attributwerte. Passend gepinntes ANGLE kann Uniform-Payloads
mit Capture-Build erfassen; Standardoption false, Mock ohne Erfassung.
Installierte Capture-Unterstützung nicht belegt; vier Capture-Marker in
chrome.dll fehlen (begrenzter Beleg, keine vollständige Build-Analyse).
RenderDoc/apitrace in PATH, Standardpfaden und geprüften Installations-
registern nicht gefunden. Kein neuer Foto-/ENV-Versuch, keine Installation.
Konkreter Haltepunkt: zusätzliche Capture-fähige Messumgebung fehlt.
Details: [D15-ERFASSBARKEIT-2026-10-03.md](D15-ERFASSBARKEIT-2026-10-03.md).
D bleibt angehalten; D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen,
G1 offen. Alle Daten erhalten, Produkt unverändert, Server HTTP 200,
BatteryStatus 1. Keine Veröffentlichung.


Erfassbarkeitsprüfung, vollständige gepinnte Quellen/Protokolldomains,
begrenztes Binary-/Werkzeuginventar, feste Eingangsdaten und vollständiger
geänderter/unversionierter Arbeitsbaum zusätzlich dauerhaft unter
C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-D15-Erfassbarkeit-233845/
gesichert: 141 Dateien / 3.661.949 Bytes, sämtliche Quell-/Kopie-SHA256 gleich.
Originale und frühere Sicherungen erhalten. Abschlussdokumentation separat
unter sicherungsabschluss/ mit Hashmanifest. Aktuelle Python-Syntax,
Quellen-SHA256 und git diff --check grün; Produktbytehashes unverändert.
Kein neuer Produkt-/Gesamt-/Tempo-Test.

**D15-Zeichenwegprüfung 03.10., nur offline:** Einzelkontur bietet keine
Deckungsgleichheit; analytischer Differenzclip verwendet erneut GrRRectEffect;
getrennte Masken benötigen unbewiesene Parameter-/Rundungs-/Kompositionsgleichheit.
Rundrechtecke haben mehrere interne Zeichenwege, nicht pauschal einen einzigen.
Idealisierter Austausch der äußeren Ellipsenregel durch Radialregel:
88/88 vorhandene Modellwerte verschieden, keine GPU-/RGB-Abnahme daraus.
Kein belegter günstiger pixelgleicher Ersatz. D bleibt nach §6 angehalten;
keine nächste Blindprobe. Wiederaufnahme nur mit konkret steuerbarem Zeichenweg
samt Gleichheitsbeleg oder begründeter Erfassung fehlender GPU-Daten.
Details: [D15-ZEICHENWEG-2026-10-03.md](D15-ZEICHENWEG-2026-10-03.md).
D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen, G1 offen. Alles erhalten;
Produkt unverändert, Server HTTP 200, Akku BatteryStatus 1. Nicht veröffentlicht.

Stand: 03.10.2026. Keine Produktänderung, keine Abnahme, kein Paketabschluss.
Die ursprünglichen Fehlerbilder, Entwürfe und Quellen bleiben erhalten.


Neue Quellwegprüfung, feste Offline-Eingaben, frühere Dokumentstände und
vollständiger geänderter/unversionierter Arbeitsbaum zusätzlich dauerhaft
unter C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-D15-Zeichenweg-232324/
gesichert: 75 Dateien / 2.573.768 Bytes, sämtliche Quell-/Kopie-SHA256 gleich.
Originale und ältere Sicherungen bleiben erhalten. Endgültige Dokumentation
separat unter sicherungsabschluss/ mit eigenem Hashmanifest.

**D15-Deckungsprüfung 03.10., nur vorhandene Daten:** Paint-Filter jetzt
auch aus ursprünglicher binärer Picture gelesen: Inset-Paint Weiß,
SrcIn-Farbfilter 14/255, kein Blur. SVG-Paint exakt gleiche Alpha-Zahl.
Gepinnte Skia-Quelle und gespeicherter Shader belegen Produkt aus äußerer
Ellipse-/fwidth-Deckung und invertierter innerer Radialdeckung. SVG verliert
72 Originalpixel, fügt 14 hinzu und mischt 239 anders. Davon 22 Fehlerpunkte
sicher unterhalb seiner Fläche; ursprüngliche Deckungsregel dort positiv.
Kein neuer Browser, kein Foto, keine Alternative oder Produktänderung.
Paint-Lücke geschlossen; vollständige GPU-Parameter/Deckung und pixelgleicher
anderer Zeichenweg fehlen weiterhin. Keine neue Farb-/Pfadserie oder aus
Endbildern rückgerechnete Referenzmaske. Details:
[`D15-DECKUNG-2026-10-03.md`](D15-DECKUNG-2026-10-03.md).
D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen, G1 offen. Server 8099
HTTP 200, BatteryStatus 1. Keine Veröffentlichung.

Offline-Deckungsprüfung, gepinnte Primärquellen, feste Eingaben und
vollständiger Arbeitsbaum zusätzlich dauerhaft unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-D15-Deckung-223800/`
gesichert: 137 Dateien / 33.180.459 Bytes, alle Quell-/Kopie-SHA256 gleich.
Originale und ältere Sicherungen bleiben erhalten; endgültige
Abschlussdokumentation separat unter `sicherungsabschluss/` mit Hashmanifest.

**D15-Fortsetzung 03.10.: Zeichenblock belegt, Alternative abgelehnt.**
Kleine feste Navigation reproduziert Befehle 0–28 der gespeicherten
Picture und exakt den bekannten Shaderhash. Befehl 26 gehört zum Rahmen;
ohne ihn bleibt der Shader. Nur Inset-Block 19–25 entfernen, bei exakt
gleicher übriger Befehlsliste: Shader fehlt; Original davor/danach vorhanden.
Eigene und ältere Messfalle sichtbar korrigiert: `--kante:none` macht die
gesamte Schattenliste ungültig, entfernt damit auch Außenschatten. Saubere
Gegenprobe mit `box-shadow:var(--shadow-lg)` bestätigt den Inset-Block.
Ein geometrisch abgeleiteter SVG-Randpfad ohne diesen Shader verändert
325 Pixel bis sechs Kanalstufen; abgelehnt, ausschließlich TEMP, keine
weitere Variante. Nächster Schritt nur offline: ursprüngliche Deckungs-/
Mischregel samt fehlenden Paint-/Uniformdaten gegen diese Fehlerpunkte
klären. Details in [`D15-OPERATION-2026-10-03.md`](D15-OPERATION-2026-10-03.md).
Produktbytehashes gleich; D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen,
G1 offen. Server HTTP 200, BatteryStatus 1. Kein anderer Paketauftrag,
kein Gesamtlauf, keine Version, Commit/Push/Veröffentlichung.

Ältere Abschnitte unten bleiben als Verlauf erhalten; diese Korrektur
ersetzt ihre Zuordnung von Befehl 26 und ihrer `--kante:none`-Gegenprobe.

Neue D15-Diagnose, feste Eingaben, frühere Dokumentstände und vollständiger
Arbeitsbaum zusätzlich dauerhaft unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-D15-Operation-221300/`
gesichert: 503 Dateien / 151.843.659 Bytes, alle Quell-/Kopie-SHA256 gleich.
Originale und frühere Sicherungen bleiben erhalten. Nachgezogene
Abschlussdokumentation separat unter `sicherungsabschluss/` mit Hashmanifest.

**Kritische Prüfung 03.10., ohne neue Browsermessung:** D12-Coverage ist
Debug-Aufzählung, keine vollständige Zeichenliste. Echter Root-Pass:
16 rote Hintergrundquads gegenüber vier grünen; Breitenunterschied bestätigt.
Viewport beim Copy-Zeichendurchgang bereits groß; 29.033/29.323 Fehlerpixel
abseits neuer senkrechter Kachelnähte. Starke historische Fehler bleiben
ohne zeitgleiche Spuren. Keine neue D12-Blindprobe. Im selben Paket D15:
inverse Innenkantenoperation in gespeicherter Picture genau bestimmt,
Befehl 26 (`drawPath`, `InverseWinding`, `#11FFFFFF`). Nächste prüfbare
Frage: erzeugt diese Operation im Original-Clipkontext den bekannten Shader?
Nur isolierte Diagnose, erst bei bestätigtem Shader eine pixelgleiche
Alternative untersuchen. Details und Stoppbedingungen in
[`D-KRITISCHE-PRUEFUNG-2026-10-03.md`](D-KRITISCHE-PRUEFUNG-2026-10-03.md).
Produkt unverändert, D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen,
G1 offen. Server HTTP 200, Akku BatteryStatus 1. Keine Veröffentlichung.

Kritische Prüfung, verwendete Eingaben und vollständiger Arbeitsbaum
zusätzlich dauerhaft unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-Kritische-Pruefung-204600/`
gesichert: 71 Dateien / 400.703.495 Bytes, alle Quell-/Kopie-SHA256 gleich.
Originale bleiben erhalten; Abschlussdokumentation separat unter
`sicherungsabschluss/` mit eigenem Hashmanifest.

## Begrenzte instrumentierte Probe: starke Fehler nicht reproduziert

Auf „machst du hier weiter“ genau zwei Zielwege mit der historischen
D12-Entwurfsquelle geprüft, je ein neuer Browserprozess. Quellenkombination
SHA256 `f2a79d62c155c8c44641521d958ca39d542a1fa7f7efbf3223d8fcf3cab86896`
entspricht beiden alten starken roten Läufen. Keine Produktänderung.
Server 8099 HTTP 200, BatteryStatus 1: ausschließlich Einzelproben.

Konto-Löschen 320/dunkel/bewegt/voll: 13 erste Fotos bis zum Ziel,
Zielbild genau ein Fehlerpixel (546,112), maximal eine Kanalstufe.
Keine der historischen starken Rundkanten-/Schriftabweichungen aufgetreten.
Einstellungen 390/dunkel/bewegt/leer: fünf erste Fotos bis zum Ziel,
Ziel vollständig referenzgleich, kein Korallblock. Vorher-/Nachher-Marken,
DOMSnapshots, gehaltene Animationen, Quads, Ebenen und rohe Spuren erhalten.
Keine weitere Ein-Pixel-Auswertung und keine neue Aufnahmevariante begonnen.

Der ausschließlich unter TEMP erzeugte Diagnosewrapper lässt frühere
Abweichungen protokolliert stehen und läuft bis zum benannten Ziel weiter.
Das dient nur der Ursachenfrage; die originale Abnahmehilfe und ihre
Assertion wurden nicht geändert. Alle Vergleichsergebnisse enthalten
`abnahme: false`. Drei Folgefotos beim roten Konto-Ziel bleiben Diagnose.
Die ausgelassenen Kontexte und zielbedingt fehlenden Folgezustände sind
keine Abnahme. Vollständige Roh-HTML-Daten sind nicht gleich: Playwright
hinterlässt am E-Mail-Feld `style=""` und normalisiert am versteckten
Dateifeld `display:none` zu `display: none;`. Erfasste Geometrie und
berechnete Stile sind gleich. Konto-Animationsziel-HTML enthält dieselbe
Attributänderung; Zeit, Zustand und Timing der Animation bleiben gleich.
Keine pauschale Behauptung identischer DOM-Daten.

Eigener Ablaufmangel: zweiten Browser gestartet, bevor der erste Aufruf
als abgeschlossen bestätigt war. Prozesslaufzeiten überlappen; diese
Probe belegt keine unabhängige kalte Zeitmessung oder Ursache. Originale
Logs bleiben erhalten, der Mangel steht in LEHREN. Es wird nicht noch
einmal gemessen, um diese Begrenzung nachträglich zu verdecken.

Ergebnisse, konkrete DOM-Abweichungen, Quellen-/Bild-/Trace-Hashes unter
TEMP `paket-d-starke-probe-20261003-202831/` (`auswertung.json`,
`grenzen.json`). Rohbilder im historischen Fotoordner unter
`starke-konto-20261003-202831/` und `starke-korall-20261003-202831/`.
Die historische Beleglücke bleibt: kein instrumentiertes starkes Rot.
Nach CODEX-START §6 angehalten. Keine nächste Blindprobe ohne neue
belegbare Ursachenfrage; fachliche Prüfung der erhaltenen Belege wäre
der nächste sinnvolle Schritt. D12/D13/D15 zurück, D14 geschützt,
Z1 ausgelassen, G1 offen. D1–D11 und alle Entwürfe bleiben erhalten.
Keine Version, kein Commit/Push/Veröffentlichung, keine Gesamtabnahme.

Die begrenzte Probe und der Arbeitsbaum sind zusätzlich dauerhaft unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-Starke-Probe-202831/`
gesichert: 262 Dateien / 158.800.888 Bytes, alle Quell-/Kopie-SHA256 gleich.
Originale erhalten; Abschlussdokumentation separat unter
`sicherungsabschluss/` mit eigenem Manifest.

## Neueste Offline-Auswertung: starke Fehlerklassen und historische Beleglücke

Auf „weiter?“ die Ein-Pixel-Schleife ausdrücklich liegen gelassen.
Nur vorhandene starke Fehler und vorhandene Kontrollen ausgewertet;
keine Browsermessreihe, Produktänderung oder Abnahmeänderung.
Server 8099 HTTP 200, BatteryStatus 2. Neue unverändernde Auswerter und
Ergebnisse unter TEMP `paket-d-starke-pixel-20261003-200644/`.
Auswertung und verwendete Eingaben zusätzlich dauerhaft unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-03-Starke-Pixel-200644/`:
116 Dateien / 26.858.870 Bytes, sämtliche Quell-/Kopie-SHA256 gleich.
Originale und alte Sicherungen erhalten, Abschlussdokumentation separat
unter `sicherungsabschluss/` mit eigenem Manifest.

### Konto-Löschen: Rundkanten und Backup-Schrift getrennt

Alle 70.880 Pixel bleiben Abnahmefehler. Vollständiges Histogramm:
69.541 mit maximal einer Kanalstufe, 1.010 mit zwei, 323 mit drei,
drei mit vier, zwei mit fünf, einer mit sieben. Die sechs stärksten
Punkte liegen geometrisch an Navigation, Backup-Knopf und E-Mail-Feld.
Bei separater grüner Direktkontrolle liegt ihr Pixelmittelpunkt jeweils
nahe der inneren Rundkante: signed Abstand zur äußeren Rundkontur
−1,050/−1,007/−1,082/−0,983/−1,041/−0,781 CSS-Pixel.
Diese Geometrie stammt ausdrücklich nicht aus einem historischen roten
DOM-Snapshot. Keine konkrete GPU-Operation daraus behauptet.

Die sechs Punkte erklären den Rest nicht: Von 1.339 Pixeln über einer
Kanalstufe liegen nur 59 innerhalb zwei CSS-Pixeln der geprüften
Rundkonturen; von 329 über zwei nur 18. **1.196 der 1.339** liegen dagegen
im Rechteck des Backup-Knopfs. Davon sind 1.152 in sämtlichen Kanälen
heller, 44 dunkler. Achtfach verbundene Fehlerpixel bilden 63 Komponenten;
größte Komponenten liegen in der Schrift „Backup herunterladen“.
Damit fehlt neben Rundkanten eine Erklärung der Schrift-/Mischpixel.
Nav-Schatten, Schrift-Rasterung und Ebenen-Mischung sind mögliche
Untersuchungsfragen, keine belegte Ursache und kein Grund für einen Fix.
Rechteck-/Konturabstände dienen nur Diagnose; keine Abnahmemaske eingeführt.

Vorhandene Kontrollen erneut vollständig gegen die historische Referenz
ausgewertet: zwölf Direktkontroll-PNGs (sechs Vorstand, sechs Entwurf)
und beide Foto-Rundgangkontrollen sind vollständig pixelgleich zur
Referenz. Alle sechs stärksten Punkte stimmen ebenfalls exakt.
Das einzige vorhandene historische Konto-Rot bleibt 70.880 Pixel anders;
kein vorhandenes rotes Vorstandbild dieser starken Klasse gefunden.
Direktkontrollen ersetzen ausdrücklich nicht den vorgeschriebenen Rundgang.

`bestand.json` enthält Punktnachbarschaften und separate grüne Geometrie,
`konto-kontrollen.json` vollständige PNG-SHA256 und exakte Pixelzahlen,
`konturen.json`, `komponenten.json`, `zusammenfassung.json` die komplette
Zählung. Originale und alte Auswertungen nicht überschrieben.

### Korall: eigener 8×4-Farbblock am unteren Kontolistenrand

Bereich (520,1814)–(528,1818) umfasst weiterhin genau 32 Fehlerpixel.
Die zehn verschiedenen Korall-RGB-Werte kommen im gesamten roten Bild
ausschließlich in diesem Block vor. Unmittelbar links/rechts und oben/unten
bleiben die ursprünglichen dunklen Flächen-/Randfarben erhalten.
Im späteren pixelgleichen grünen DOM liegt die Stelle am unteren Rand
der Kontoliste/„Konto löschen“-Zeile, nicht an der Navigation.
Auch das ist keine Zuordnung einer historischen roten GPU-Ressource.
`korall.json` enthält sämtliche vier Pixelreihen und globale Farbzahlen.

### Was tatsächlich fehlt und wann weitergemessen werden darf

Die historischen roten Ordner `nach/` und `nach-fortsetzung/` enthalten
keine zeitgleichen DOM-/GPU-Diagnoseordner. Spätere grüne Spuren und
CPU-Ebenenwiedergaben können diese fehlenden Daten nicht nachträglich
liefern. Aus einem PNG allein ist der verantwortliche Raster-/Mischauftrag
nicht eindeutig rekonstruierbar. Diese Beleglücke wird nicht mit einer
weiteren allgemeinen Screenshotreihe oder einer neuen Referenz geschlossen.

Für eine konkrete weitere Ursachenprobe müsste erstmals ein **starker**
Fehler unter vollständiger Instrumentierung auftreten: festgehaltene
Quellen-/PNG-Hashes, beide Fotomarken, Vorher-/Nachher-DOM/Animationen,
explizite Quads/Kacheln und unverändertes erstes Foto. Die bereits
vorhandene Instrumentierung dafür verwenden; einen roten Einzelkanalwert
nicht wieder anstelle dieser starken Klasse untersuchen. Bei nicht
reproduzierbarem starken Befund nach CODEX-START §6 anhalten.
D12/D13/D15 zurück, D14 geschützt, Z1 ausgelassen, G1 offen. Produktdateien
bytegleich, keine Version, Commit/Push/Veröffentlichung oder Gesamtabnahme.

## Nachgezogene Quellenkontrolle: Ein-Pixel-Fehler ohne D12-Änderung

Vorhandene historische PNGs/Quellenhashes zusammengeführt, anschließend
gesicherten bytegleichen D12-Vorstand streng gegen seine eigene Referenz
geprüft: acht erste Fotos gleich, Einstellungen rot mit demselben einen
Kanalwert. Ganzes PNG bytegleich zum roten Entwurf, DOM/Animationen gleich.
Beide Quellen haben zuvor dasselbe grüne PNG geliefert. Damit tritt dieser
Fehler auch ohne D12-Quellenänderung auf; kein Verdachtsfix begründet.
Interner Kanalwertwechsel und starke historische Korall-/Konto-Fehler
weiter offen. [`D12-PIXEL-2026-10-03.md`](D12-PIXEL-2026-10-03.md), Abschnitt
Quellenkontrolle, enthält feste vollständige Hashes und Pfade. Abnahme rot,
D12/D13 zurück, keine Referenz- oder Grenzwertänderung.

## Neueste Fortsetzung: Ein-Pixel-Quelle, keine Ursachenbehebung

[`D12-PIXEL-2026-10-03.md`](D12-PIXEL-2026-10-03.md): am roten
Pixelmittelpunkt zeichnet die Hintergrundressource; Kopfleiste deckt ihn
nicht ab, Ansichts-Pass enthält dort kein Quad. Gespeicherte Raster-PNGs
sind nachträgliche Wiedergaben, keine echten GPU-Texturkopien. Sechs
isolierte A/B/A-Reihen behalten den roten Wert. Originaler App-Fotoaufbau
ohne Vorab-Fläche ebenfalls exakt ein Kanalwert rot, ebenso ohne frühere
Rasterwiedergaben. Historischer grüner Einstellungswert weiterhin ohne
zeitgleiche Spur; andere grüne Ansicht ist kein Ursachenbeweis. D12/D13
bleiben zurück, Produkt unverändert, keine gelockerte Abnahme.

## Neueste Fortsetzung: Rasterbreite erklärt, Vorab-Fläche dennoch rot

Vollständiger Bericht mit vorhandenen Trace-Zeitlinien, Quellcode derselben
Browserrevision und Einzelproben:
[`D12-KACHELBREITE-2026-10-03.md`](D12-KACHELBREITE-2026-10-03.md).
Rot rastert bei 2× bereits vor dem größeren physischen Viewport und behält
224 Pixel breite Kacheln; Grün beginnt mit dem größeren Viewport und
zeichnet 800. Interner Rasterparameter-Setter nicht direkt im Trace belegt.
Physische Fläche vorab setzen verändert gemessenes DOM und gehaltene
Animationen nicht; trotzdem 33/34 gezielte erste Fotos gleich, eines rot.
Einstellungen 320/dunkel/voll: Pixel (546,112), (20,19,17)→(20,18,17),
bereits volle Kachelbreite 640 bei 2×. Alle Daten, Quads und Rasterbilder
gesichert, Abbruch vor Konto-Löschen. Kein Ersatz durch Folgefotos.
Starke historische Korall-/Konto-Fehler bleiben ungeklärt. Prüfaufbau
unverändert, D12/D13 zurück, keine Produktänderung oder Gesamtabnahme.
Nächster Schritt zuerst Offline-Zuordnung des neuen roten Pixels zu den
bereits gesicherten Ressourcen; keine Vermutung als Produktfix übernehmen.

## Weitere Fortsetzung: historische Pixel und einzelne kalte Shaderoperation

**Erhaltung:** Sicherung des übernommenen Arbeitsbaums einschließlich
unversionierter Dateien unter
`C:/Users/USER/AppData/Local/Temp/paket-d-fortsetzung-20261003-150412/manifest.json`.
Server 8099 bereits HTTP 200; kein Neustart nötig. BatteryStatus 2.
Produktdateien weiterhin SHA256 F27C45E7… / 78C0B553….
Nur Diagnosehilfen und Dokumentation geändert. Kein dritter Produktversuch.

### D12/D13: vorhandene Fehler vollständig gezählt, Kachelhöhe reicht nicht

Offline-Auswertung `x_d_operationsbestand.py`, Ergebnis
`C:/Users/USER/AppData/Local/Temp/paket-d-operationen-1791032744384680200/bestand.json`:

- Alter Korallfehler: genau 32 Pixel, Bereich (520,1814)–(528,1818),
  Bild 780×2198. Vorher dunkle Pixel 26/25/23 bzw. 45/44/42; danach
  Koralltöne 241–245 / 162–169 / 147–155. Vollständige Suche nach exakt
  diesem 8×4-Ausschnitt in beiden Bildern: nur der Fehlerort selbst im
  Nachher-Bild passt. Keine identische verschobene Quelle im Vorher-Bild
  gefunden. Das beweist weder einen Produktfehler noch falsche GPU-Ressourcen.
- Historisches Konto-Löschen: 70.880 andere Pixel, maximal 7 Kanalstufen.
  1.339 Pixel über einer, 329 über zwei, sechs über drei Kanalstufen;
  keines über zehn. Sechs stärkste Punkte: (49,1098), (55,1102),
  (570,1155), (570,1208), (569,1209), (572,1500). Keine Toleranz eingeführt:
  alle 70.880 bleiben Fehlerpixel. Die gesamte Klasse ist nicht mit der
  isolierten ±1-Verlaufprobe erklärt.

Neue konkrete Diagnose: Ändert ausschließlich
`--min-height-for-gpu-raster-tile=448` den Aufnahmeweg zuverlässig in die
vorhandene grüne Aufteilung? Antwort: **nein**. Unveränderte Foto-Assertion
scheitert am Feedbackfoto nach elf gleichen Fotos. 29.323 andere Pixel,
maximal eine Kanalstufe; erfasste DOM-Elemente gegen grüne Detailkontrolle
gleich. Zeitmarken vollständig. Gemessene Kacheln jetzt 224×448 statt
grün 800×448. Höhe allein fixiert die Breite nicht. Drei Folgefotos gleich,
aber keine Abnahme. Diagnose nur für 390/hell/bewegt/voll, keine ausgelassenen
Zustände als erledigt gewertet. Bericht und rohe Fotos:
`C:/Users/USER/AppData/Local/Temp/paket-d-fotos/d12-20261003-stand1/kacheln448-20261003-1515/`.
`auswertung.json`, `konto-historische-pixel.json`, `konto-staerkste-pixel.json`.
Prüfaufbau unverändert; D12/D13 weiterhin zurück.

### D15: alte Raster-Zuordnung korrigiert, Shader statt DOM-Ebene belegt

**Sichtbare Korrektur früherer Aussagen:** Die berichteten LI-/`.view`-
Zuordnungen beruhen auf numerisch gleichem `raster_chromium_id` und
`raster_id`. Client und Decoder erhöhen eigene Zähler; gleiche Nummern
sind keine belastbare Auftragsverknüpfung. Auch der spätere DOMSnapshot
ist nicht die Zeichenliste zum kalten Flush. Alte Berichte bleiben als
historische Kandidaten erhalten. `x_d15_raster_zuordnung.py` kennzeichnet
neue Ergebnisse ausdrücklich unbestätigt und schreibt in eine neue Datei.
Primärquellen: [Raster-Client](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/gpu/command_buffer/client/raster_implementation.cc)
und [Raster-Decoder](https://chromium.googlesource.com/chromium/src/+/master/gpu/command_buffer/service/raster_decoder.cc).
Quellen erklären die Zähler; keine exakte Revisionsgleichheit mit lokalem
Chrome behauptet. Die alte DOM-Ursachenzuordnung wird zurückgenommen.

Zuerst vorhandene lange Rasterarbeiten verglichen: 88,298 und 95,788 ms
haben dieselbe geordnete SkCanvas-Folge (u.a. zwei drawRRect, ein saveLayer,
zwei drawRect, ein drawDRRect, sieben drawPath, ein drawSlug).
Neue kalte Einzelprobe ohne Startlisten-Verlauf lässt diese Folge und den
85,597-ms-Flush bestehen; Original davor/danach 86,454/86,904 ms.
Verlauf allein ist keine Ursache. Jeweils frischer Browserprozess.

Picture-Spur mit 128-MiB-Puffer und beiden Bildzeitmarken vollständig:
`paket-d-ursachen-messung-1791033304233/0/zeitgleiche-pictures/` unter TEMP.
Zeitnahe Roh-SkPictures und Befehle erhalten. Wiedergegebene 534×234-
Liste zeigt Navigation samt großem Schatten; Startlisten-Liste andere
Befehlsfolge. Replay ist Diagnose, keine kalte GPU-Abnahme. Entfernen
nur des 56-px-Navigationsschattens lässt 89,106-ms-Flush bestehen, zuvor
93,886 ms. Auch dieser Schatten allein erklärt den kalten Flush nicht.

Neue konkrete Frage: Welcher Ganesh-/ANGLE-Aufruf füllt den Flush?
Zusätzliche Kategorien `disabled-by-default-skia.gpu`,
`disabled-by-default-skia.shaders`, `gpu.angle` liefern erstmals einzelne
Operationen samt Shaderquelltext und Compilerzeiten. Beispiel
`paket-d-ursachen-messung-1791041444446/0/treiber-auswertung.json`:
91,043-ms-Flush, zehn serielle Shaderkompilierungen mit zusammen 80,905 ms.
Teuerster Aufruf `FillRRectOp`: 24,864 ms, davon `shader_compile` 24,467 ms,
`driver_link_program` 22,046 ms. Dies ist mehr als bloße Shadercache-Korrelation.
Fragmentshader kombiniert Rundungsdeckung mit inverser innerRect-Kante;
Quellhash `5eca2e32640eaf1e5d4ddaba6aabba71f6e8893512b84baeeb471b3cf8d5f811`.

Gezielte kalte Einzelprobe: Nur `.nav { box-shadow: var(--shadow-lg) }`
entfernt das dortige `inset 0 1px 0`. Shader entfällt im ersten langen
Flush, erscheint später mit **identischem** Fragment- und Vertexquellhash
wieder: 24,884 ms. Erste/zweite Arbeit nun 68,774/61,608 ms.
Original wiederhergestellt: 94,361/34,959 ms; derselbe Shader wieder im
ersten Flush mit 24,713 ms. Arbeit nur verschoben, nicht behoben.

Darauf feste kalte Diagnose A/B/A, gleiche ausführliche Instrumentierung,
jeweils eigener Browserprozess, gesicherter zweiter Produktentwurf:

| Kalte Quelle unter TEMP | einzige Diagnoseänderung | Shader in Startphase | lange Flushes 1000–1800 ms |
|---|---|---|---|
| `paket-d-ursachen-messung-1791041628637/0` | Original | vorhanden | 94,361 / 34,959 ms |
| `paket-d-ursachen-messung-1791041699853/0` | `.nav, .startliste { --kante: none; }` | fehlt | 24,059 ms |
| `paket-d-ursachen-messung-1791041758778/0` | Original wieder | vorhanden | 89,278 / 35,394 ms |

Alle beiden Zeitmarken vollständig. Gleiche einzelne Innenkantenoperation
an beiden späteren Zeichenzielen isoliert; nicht nur numerische Raster-ID.
Feste Offline-Gegenprobe enthält Trace-Hashes und Shaderquelltext:
`C:/Users/USER/AppData/Local/Temp/paket-d15-innenkante-feste-gegenprobe.json`.
Werkzeuge `x_d15_treiber_auswertung.py` und
`x_d15_innenkante_gegenprobe.py`. Die Entfernung ändert außerdem weitere
Clip-/Shaderkombinationen; nicht sämtliche Zeitersparnis dem einen Shader
zugeschrieben. Im B-Lauf weiterhin 72,019-ms-Bildpause beim Hauptstart,
zuvor/danach 178,404/171,124 ms. Ein früherer 35,892-ms-Flush in B bleibt.
Keine flüssige Bildfolge, Gerätewirkung oder Produktabnahme behauptet.
Sichtbare Innenkanten wurden nur in zugeliefertem Diagnose-CSS entfernt,
nie in Produktdateien. Das ist kein dritter Produktfix.

### Bewiesen, ungeklärt, nächster Schritt

**Bewiesen:** feste Mindestkachelhöhe reicht nicht; alte starke Fehler
vollständig lokalisiert; D15 kalte Kompilierzeiten konkret in einzelnen
Operationen gemessen; gemeinsame Innenkanten-Shaderoperation durch kaltes
A/B/A isoliert. Alte LI-/`.view`-Ursachenbehauptung korrigiert.

**Ungeklärt:** historische Korallressource, restliche Konto-Löschen-
Fehlerklasse, stabiler unveränderter Fotoaufbau und vollständige D12/D13-
Abnahme. D15 hat weitere kalte Compilerarbeiten; die Innenkantenentfernung
ändert sichtbare Gestaltung und ist keine akzeptable Abnahme.

**Konkreter nächster Schritt:** D12 tatsächliche Kachelbreite/-höhe vor
und während Aufnahme gegen gespeicherte Referenz festhalten; nur eine
Aufnahmeprobe mit unverändertem DOM, Maßstab und End-Animationsebenen
prüfen, die beide Rasterdimensionen tatsächlich hält. Beim ersten starken
Korallfehler vollständige zeitgleiche Quads/Ressourcen sichern, nicht nur
Folgefotos. D15 die gespeicherte Innenkanten-Picture als feste isolierte
Grafikprobe verwenden: dieselbe Kante pixelgleich ohne nachgewiesenen
inversen Rundungs-Shader zeichnen, kalten Original/Variante/Original-
Compilervergleich mit Bildfolge durchführen. Erst nach dieser belegten
Erhaltung der Darstellung einen Produktentwurf erwägen; dann feste
Vorher-Gegenprobe nach CODEX-START und komplette echte kalte Bildabnahme.
Kein pauschales Entfernen von Kanten oder Vorwärmen als Abnahme.

**Eigene Diagnosefehler:** Fehlende historische `boot-raster.json` zuerst
als vorhanden angenommen, Snapshot-Ereignis ohne `args.snapshot` nicht
abgefangen, Treiberauswertung zunächst alle Flushes innerhalb späterer
Bildmarken verlangt. Abgebrochene Logs/Teilbelege erhalten. Fehlende Datei
explizit vermerkt; Snapshot-Guard; Flushes außerhalb der Bildfolge separat
erhalten, nicht still gelöscht. Breite Konsolenausgabe der Shadertexte
abgeschnitten; komplette Trace-Datei danach gezielt offline ausgewertet.
Keine Produktentscheidung aus diesen Abbrüchen abgeleitet.

## Fortsetzung im selben Chat: Rasterkacheln eingegrenzt

**Neue detaillierte rote Spur:** `animationsebenen-20261003-weiter2`
endet auf Antwort, noch bevor die geplante Animations-Gegenprobe eingreift.
41.727 andere RGB-Pixel, Bereich (0,96)–(780,1630), maximal 1/3/2
Kanalstufen. Gegen die bereits gespeicherte pixelgleiche Detailkontrolle
`gpu-quads-20261003-1402` sind alle 86 erfassten DOM-Elemente gleich;
vier Animationen beendet, Fortschritt 1.

Die GPU-Snapshots nennen jetzt die konkrete Rasteraufteilung:

| Antwortfoto | rot | pixelgleiches Grün |
|---|---|---|
| Hintergrund-Rasterkacheln, Gerätepixel | 224×256 | 800×448 |
| Kachelursprünge | x=0/222/444/666; y=0/254/508/… | x=0; y=0/446/892/… |
| Rastermaßstab | 2×2 | 2×2 |
| Quads im abschließenden Pass während Aufnahme | 52 | 12 |

Eine Ortsauswertung der **vollständig gezählten** Fehlerpixel zeigt: Im
Hintergrundbereich x=0–222/y=96–254 kein Unterschied. Ab x=223 treten
6.581 Unterschiede bis x=444/y=254 auf. Im freien linken Rand x=0–20
beginnen die Unterschiede ab y=255, also nach der roten Kachelgrenze.
Diese Ortsauswertung ist Diagnose, keine Maske oder abgeschwächte Abnahme.

Zusätzlich wurde ausschließlich der originale helle Hintergrundverlauf
ohne App-Inhalte in zwei frischen Browserprozessen gezeichnet. DOM,
Verlauf, Geometrie und 780×1688 Bildgröße gleich. Einziger gesetzter
Browserparameter unterschiedlich: GPU-Mindestkachelhöhe 256/448.
Die tatsächliche Aufteilung variiert dabei auch in der Breite (800/224);
das ist keine isolierte Prüfung allein der Höhe. 40.809 unterschiedliche
Pixel, maximal eine Kanalstufe, erster Unterschied x=223. Damit ist die
Rasterabhängigkeit des Verlaufbildes unabhängig vom D12-Produktentwurf
belegt. Die Displayliste nennt `AntiAlias|Dither` für den Hintergrund.
Die Rasteraufteilung erklärt die kleine Verlauf-Fehlerklasse; eine
vollständige Zuordnung sämtlicher historischen Fehlerpixel fehlt weiter.

**Verworfene Aufnahme-Gegenprobe:** Ohne CDP-Clip entstehen nur 390×844
Pixel. Eine dauerhaft gesetzte Emulations-Viewport-Skala 2 liefert zwar
780×1688 und gleiches gemessenes DOM, aber 1.243.305 andere Pixel, bis
225 Kanalstufen. Nach Wiederherstellung ist Playwright wieder pixelgleich.
Diese Variante bleibt Diagnose, kein neuer Standard. DOM-Gleichheit
allein beweist also auch beim Aufnahmeweg keine gleiche Darstellung.

**Grenze der Instrumentierung:** Die zusätzlich aktivierten Picture-
Kategorien füllen den Trace-Puffer vor der Antwortaufnahme. Die PNGs und
Raster-Displaylisten dieses Laufs bleiben erhalten, seine GPU-Spur taugt
für die späten Fotos nicht. Der Rot/Grün-Vergleich benutzt deshalb die
bereits vorhandene vollständige grüne `gpu-quads`-Spur. Fehlversuche der
Auswertung (Windows-Zeichencodierung und fehlende Trace-Marken) sind
mit Logs bewahrt; UTF-8 und passende vollständige Spur korrigiert.

**Weiter offen:** Der alte 8×4-Bereich auf Einstellungen enthält starke
Korallfarben statt Hintergrund (bis 219 Kanalstufen). Er gehört nicht
zur hier belegten ±1-Verlaufklasse. Seine einzelne Zeichen-/Ressourcen-
Operation ist nicht nachträglich aus dem damaligen PNG ableitbar.
Konto-löschen ist ebenfalls noch nicht vollständig zugeordnet. Deshalb
kein pauschaler Aufnahme-Fix und noch kein neuer Gesamtvergleich.

**D15 weiter eingegrenzt, keine Ursache behauptet:** Die alte Raster-ID 15
verbindet den 88,298-ms-Flush über `RasterImplementation`/`RasterTask` mit
Layer 22 (`LayoutListItem LI`), einschließlich Skia-Zeichenbefehlen.
Ein zusätzlicher wirklich neuer Browserprozess mit derselben gesicherten
zweiten Quelle liefert 90 echte Bilder, 109,28-ms-Bildpause, danach
Titelschritt 105,33 in 12,63 ms. GPU-Flush 95,788 ms, jetzt Raster-ID 16
und Layer 19 (`DIV.view`). Der betroffene Auftrag ist also nicht konstant
dieselbe Startlisten-Zeile. Eine Änderung dieser Zeile wäre weiter ein
Verdachts-Fix. Die letzte 41,697-ms-Rasterarbeit lässt sich nicht eindeutig
über die vorliegenden IDs zuordnen. Keine warme Abnahme, kein dritter Fix.

**Animations-Gegenprobe durchgeführt:** Direkt am ersten Rot auf Feedback
`enter-vor` und `enter-rise` nach 280 ms mit `commitStyles()` freigegeben
und anschließend wieder gehalten. In allen drei Messungen gleiches
gemessenes DOM einschließlich Geometrie und Endstilen. Gehalten: null
Fehlerpixel. Freigegeben: 98 Fehlerpixel, maximal eine Kanalstufe,
Bereich (334,492)–(402,620). Wieder gehalten: null Fehlerpixel. GPU-Daten
zeigen dazu das Entfernen der getrennten `.view`-/`.ideen-leer`-
Animationsebenen, Zeichnen über `#app`, anschließend wieder getrennte
Animationsebenen. Das ist ein belegter Einfluss der Ebenenbildung auf
die Pixel. Es ist kein Beleg, dass Freigeben den ursprünglichen Fehler
behebt: Das Freigeben erzeugt selbst andere Pixel. Gegenprobe und Daten:
`paket-d-animationsebenen-1791031545857/`, insbesondere
`gegenprobe.json`, `pixel-auswertung.json`, `gpu-gegenprobe.json`.

**Nächster Schritt, der die verbleibende Lücke schließt:** D12 einen
Aufnahmeweg mit unveränderten End-Animationsebenen und stabiler
Rasteraufteilung gezielt gegen die gesicherte rote Kachelaufteilung prüfen.
Weder pauschales Freigeben noch die getestete Emulationsskala erfüllen das.
Für den Korallbereich beim ersten Auftreten die zugehörigen Raster-
Ressourcen/Quads sichern, bevor eine Aufnahmekorrektur vereinheitlicht wird.
D15 die im langen Flush gemeinsame einzelne Skia-/Treiberoperation
isolieren; die bloße DOM-Ebenenzuordnung taugt nicht als Ursachennachweis. Erst danach
feste Alt-Gegenprobe, minimale Korrektur und echte kalte Bildabnahme.

Neue Belege unter `C:/Users/USER/AppData/Local/Temp/`:

- `paket-d-weiter-erhaltung-20261003-142449/manifest.json`.
- `paket-d-fotos/d12-20261003-stand1/raster-displaylisten-20261003-weiter1/`;
  zugehöriges `paket-d-raster-displaylisten-20261003-weiter1.log`.
- `paket-d-fotos/d12-20261003-stand1/animationsebenen-20261003-weiter2/`;
  `paket-d-raster-paar-20261003-143014/rot.json` und `gruen.json`.
- `paket-d-capture-probe-1791030809557/gegenprobe.json` und alle fünf Bilder.
- `paket-d-gradient-kacheln-1791031038184/auswertung.json`, beide Bilder/Spuren.
- `paket-d-ursachen-messung-1791028258361/0/raster-dom-zuordnung.json`.
- `paket-d-ursachen-messung-1791031283179/0/`: Bilder, Trace, DOMSnapshot,
  Displaylisten, `raster-dom-zuordnung.json`, `bild-auswertung.json`.
- `paket-d-fotos/d12-20261003-stand1/animationsebenen-antwort-20261003-weiter8/`:
  erster Fehler auf Lektionen, vor der Gegenprobe; unverändert bewahrt.

Alle Paketstatus bleiben unverändert zurück; D14-Probelauf geschützt,
Z1 ausgelassen, G1 offen. Kein Produktcode geändert, nichts veröffentlicht.

## D12/D13: Was bewiesen ist

Die gesicherten roten Aufnahmen wurden gegen die **bereits vorhandene**
pixelgleiche Kontrolle `instrumentiert-entwurf-kontrolle-20261003-1331`
ausgewertet. Keine neue einfache Direktkontrolle als Ersatz.

| Vergleich | DOM/Stile/Geometrie/Pseudoelemente | DOMSnapshot inklusive Malreihenfolge | Animationen |
|---|---|---|---|
| Rundenende 390/hell/bewegt/voll | alle 60 Elemente gleich | Knoten und Layout gleich, Browser-IDs normalisiert | alle sieben beendet, Fortschritt 1 |
| Kartensätze 390/hell/bewegt/voll | alle erfassten Elemente gleich | Knoten und Layout gleich, Browser-IDs normalisiert | enter-vor beendet, Fortschritt 1 |

Die normalisierten Ebenen haben gleiche Abmessungen und Transformationen.
Am Rundenende unterscheidet sich der Malzähler der 84×84-Ebene (20/22).
Das ist kein Beweis, dass diese Ebene die abweichenden Pixel erzeugt.

Im roten Rundenende-Bild weichen 77.992 RGB-Pixel ab; maximal 1/2/1
Kanalstufen. Positive und negative Unterschiede sind beinahe ausgeglichen.
Ein verstärktes Differenzbild zeigt strukturierte Muster in Farbverläufen.
Die grüne Aufnahme ist exakt gleich zum historischen Vorher-Bild.

**Der Aufnahmeweg verändert den Grafikaufbau:** Zwischen Vorher-/Nachher-
DOM-Marke wird der Rasterbereich von 390×844 auf 780×1688 und zurück
gestellt. Währenddessen werden neue Rasterflächen und Renderpässe erstellt.
Am roten Rundenende enthält der interne Renderpass 49 Zeichenflächen
(Quads), an der grünen Kontrolle 14; der abschließende Root-Pass jeweils 14.
Auf Kartensätze entstehen rot zusätzliche Pässe mit 4/4/47 Quads;
grün hat der interne Pass 9. Die umfangreichere GPU-Arbeit liegt **während
der Fotoaufnahme**, nicht in einer noch laufenden DOM-Animation.

Playwrights lokal gelesene Implementierung (`node_modules/playwright-core/
lib/coreBundle.js:37419`) ruft `Page.captureScreenshot` mit `clip` auf.
Auch die aktuelle [Chromium-Implementierung](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/content/browser/devtools/protocol/page_handler.cc)
ändert bei emulierten Geräten für die Aufnahme die Emulationsparameter
und stellt sie danach wieder her. Das ist zusätzliche Erklärung des
Aufnahmewegs, keine verifizierte Zuordnung der historischen Fehlerpixel.
Die exakte installierte Revision war über den Quellen-Browser nicht abrufbar.

### Gezielte neue Fragestellungen und ihre Grenzen

1. **Verhindert native Pixelskala 2 die Aufnahme-Umskalierung, ohne die
   Referenzdarstellung zu verändern?** Ein ausschließlich im Diagnose-
   Browser gesetztes `--force-device-scale-factor=2` scheitert bereits auf
   Lernen: 24.535 andere Pixel, maximal 217/220/222 Kanalstufen; alle drei
   Folgefotos gleich zum neuen Fehlerbild. Damit ist diese Variante kein
   geeigneter Prüfaufbau-Fix. Wrapper gesichert, nicht zum Standard gemacht.
2. **Welche konkreten Quads/Skia-Zeichenoperationen enthält ein Fehlerbild?**
   Trace um GPU-service/device, Skia, viz.quads und cc.debug erweitert.
   Der unveränderte D12-Entwurf liefert auf dem gezielten alten Fehlerweg
   diesmal 16/16 exakt gleiche Fotos. Interne Pässe Kartensätze 9 und
   Rundenende 14 Quads. Es gibt damit eine ausführliche grüne Spur,
   aber noch **keine gleich ausführliche rote Spur**. Die 35 ausgeschlossenen
   Zustände haben null Fotos und zählen ausdrücklich nicht als Abnahme.

### Was ungeklärt bleibt und welcher Schritt die Lücke schließt

Raster-Umskalierung und unterschiedliche Renderpässe sind belegt.
**Nicht belegt** ist die einzelne Zeichen-/Mischoperation, die die roten
Pixel erzeugt. Die Raster-Umskalierung findet auch bei grünen Fotos statt;
sie allein erklärt das Rot nicht. Die alten Konto-löschen- und
8×4-Einstellungen-Pixel sind dadurch ebenfalls nicht erklärt.

Nächster Schritt: Beim betroffenen Aufnahmeweg die jetzt aktivierten
`viz.quads`-/Skia-/cc.debug-Daten **am ersten roten Bild** sichern und den
internen Pass samt Mischzustand/Rasterressourcen gegen die vorhandene grüne
Detailspur vergleichen. Erst die abweichende Operation mit einer festen
Aufnahme-Gegenprobe isolieren; kein weiteres unverändertes Kontrollfoto
ohne diese Frage. Falls Ressourcendaten fehlen, gezielt Paint-/Raster-
Snapshots dieser Operation hinzufügen. Erst danach den Aufnahmeweg
korrigieren und **alle** Fotozustände unverändert streng vor/nach prüfen.
Der Gesamtvergleich wurde in dieser Session wegen dieser unerfüllten
Voraussetzung weder erneut gestartet noch als bestanden eingetragen.

## D15: Was bewiesen ist

Die vorhandenen kalten/warmen Bilder und Traces derselben gesicherten
zweiten Entwurfsquelle wurden zunächst offline zerlegt:

- Von 85,678 ms Raster-Endarbeit entfallen 85,666 ms auf den GPU-Flush.
- Im selben Intervall liegen zehn Shader-Cache-load/store-Paare und
  ANGLE-Workerarbeiten bis 21,899 ms; der 45,603-ms-Renderpass hat weitere
  Cache-Paare und Workerarbeiten bis 21,727 ms.
- Die Cache-Aufrufe selbst brauchen Mikrosekunden. Es wäre falsch,
  sie als 86-ms-Ursache zu benennen. Zwischen ihnen fehlen direkt benannte
  Compile-/Treiberoperationen. Die warmen Quellen haben diese Ereignisse nicht.

**Neue Frage:** Benennt eine ausführlichere Grafikspur den teuren Shader
oder die einzelne Treiberoperation? Derselbe zweite Entwurf, neuer Browser,
kalter erster Kontext, danach zwei warme Kontexte. Keine Produktdatei geändert.

| Messung | kalt | warm 1 | warm 2 |
|---|---:|---:|---:|
| echte Browserbilder | 92 | 104 | 104 |
| Raster-Endarbeit >20 ms beim Folgeseitenstart | 88,298 und 35,563 ms | keine | keine |
| Renderpass >20 ms | 43,185 ms | keine | keine |
| Bildpause >50 ms | 158,42 ms | keine | keine |
| größter gemittelter Titelschritt | 91,62 Helligkeitsstufen | 13,97 | 14,04 |
| rAF-Deckkraftschritt >0,2 | keiner | keiner | keiner |

Die kalte Bildfolge bleibt sichtbar rot, obwohl die rAF-Liste diesmal
keinen Schritt >0,2 meldet. Das bestätigt die Abnahme-Lücke eines alleinigen
rAF-Tests. Titelhelligkeit ist weiterhin **keine isolierte Deckkraft** und
kein Ersatz für eine vollständige kalte Bildabnahme.

Auch die Detailspur benennt innerhalb des 88,298-ms-Endvorgangs nur den
88,289-ms-Flush. Kein direkt benanntes Shader-Kompilieren und keine
Zuordnung zu einer einzelnen CSS-Eigenschaft. **Shader-Kompilierung ist
weiter eine Hypothese; kalte GPU-Arbeit und der sichtbare Aufholsprung sind
Befunde.** Keine dritte Produktänderung und keine kalte Abnahme behauptet.

Nächster Schritt: Raster-/Paint-Ressource des teuren ersten Folgeseiten-
Flushs mit DOM-Ziel und Zeichenoperation verbinden. Dann eine begrenzte
**Diagnose-Gegenprobe** für genau diese Operation an der unveränderten
gesicherten Quelle, je Variante ein wirklich neuer Browserprozess.
Gleiche kalte Startfolge, Bilder und GPU-Spur; keine bloßen warmen Starts.
Erst bei isolierter Ursache eine minimale Korrektur mit fester Alt-Gegenprobe
und vollständiger kalter Bildabnahme. Gerätewirkung bleibt separat offen.

## Belege und Erhaltung

Alle folgenden Pfade liegen unter `C:/Users/USER/AppData/Local/Temp/`:

- Anfangssicherung aller 20 geänderten/unversionierten Dateien:
  `paket-d-analyse-20261003-134349/manifest.json`.
- Offline-DOM-/Snapshot-/Ebenen-/Trace-Vergleich:
  `paket-d-belegvergleich-20261003-1345/` (vollständige JSON-Auswertungen).
- D12 neue Detailspur: `paket-d-fotos/d12-20261003-stand1/
  gpu-quads-20261003-1402/`; vollständiges Log
  `paket-d-foto-gpu-quads-20261003-1402.log`.
- Pixelskalen-Gegenprobe: im selben Fotoordner
  `native-dpr-vorstand-20261003-1352/`, Log
  `paket-d-native-dpr-vorstand-20261003-1352.log`.
- D15 Offline-Zerlegung: `paket-d15-gpu-zerlegung-20261003-1356/`,
  gleichnamiges `.log`.
- D15 Detailspuren/Bilder: `paket-d-ursachen-messung-1791028258361/0/`,
  `/1/`, `/2/`, darin `shader-auswertung.json`; Bildauswertung
  `bilder-auswertung.json` in der gemeinsamen Wurzel.
- Vollständige Logs: `paket-d15-gpu-detail-20261003-1400.log`,
  `paket-d15-gpu-detail-auswertung-20261003-1403.log`,
  `paket-d15-gpu-detail-auswertung-20261003-1406.log`,
  `paket-d-detail-ergebnis-20261003-1409.log`.

app.js und styles.css behalten die bisherigen SHA256-Werte
`f27c45e7c7f34959dbc5a205daab1a3996801899c6ee21128e32195001d60ebf`
und `78c0b553cf62855e0edc07b2b15746198432d9ea52708647e8546171ce40cdea`.
D1–D11 erhalten; D12/D13/D15 zurück, D14 wegen Text-Probelauf zurück.
Z1 ausgelassen, G1 offen. Keine Version, kein Commit/Push/Deploy.
