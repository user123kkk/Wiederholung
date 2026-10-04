# Paket D – D15: Capture-Messweg kritisch geprüft, vor dem Build angehalten

04.10.2026, Claude Code im Ordner `C:\Users\USER\Desktop\Wiederholung`.
Auftrag des Betreibers: „D weiter“, am vorbereiteten Capture-Messweg
ansetzen, zuerst die beiden Sperren klären, bisherige Schlüsse kritisch
prüfen. Pflichtdateien vollständig gelesen (AGENTS, STAND, CLAUDE, LEHREN,
CODEX-START, AUFTRAG, AUFGABEN, ENTSCHEIDUNGEN, BEW-12–15, Übergabe,
D15-ERFASSBARKEIT, D15-CAPTURE-MESSWEG, dazu D15-OPERATION/-DECKUNG/
-ZEICHENWEG und D-URSACHEN oben).

**Kein Browser gestartet, nichts installiert, kein Build, kein Produkt-
entwurf, keine Abnahme geändert.** Nur gepinnte Quellen und vorhandene
Spuren gelesen. BatteryStatus 2 (66 Prozent), 138,4 GB frei auf C:.
D12/D13/D15 bleiben zurück, D14 geschützt, Z1 ausgelassen, G1 offen.
Nicht veröffentlicht.

## Ergebnis in vier Sätzen

1. Beide Sperren sind an der gepinnten Quelle bestätigt und nur mit
   **zwei Quellpatches** an ANGLE in einer eigenen Chromium-Build lösbar;
   im Startmodus des Prüfstands (headless) gibt es gar keinen Window-Swap.
2. Für diese Build fehlt hier die gesamte Toolchain; der Laptop liegt an
   der unteren Grenze der gepinnten Anforderungen.
3. **Die vorhandenen kalten Spuren zeigen, dass die gesuchten Capture-Daten
   die Abnahme von BEW-15 nicht entscheiden können:** Der Zielshader macht
   etwa ein Fünftel der späten Shaderkompilierung aus, und selbst ohne
   sämtliche Schatten an Navigation und Startliste bleibt eine Bildlücke
   von 72 ms.
4. Deshalb ist der Capture-Build nach meinem Urteil technisch nicht
   begründet. Er wurde nicht begonnen. Die nächste belegbare Ursachenfrage
   ist eine andere (unten, „Nächster Schritt“).

## 1. noperspective beim Capture (Frage 1 des Auftrags)

Quelle: `Context.cpp` der gepinnten ANGLE-Revision
`802a8704ca940b633b731493ee192e0661eb8cdd`, lokale Kopie SHA256
`a1ed8ba2e762391d973327a87fd26d690e45225b5b30a086de3ab57a29fe4d01`.

- Zeile 4584–4585: Der Limit-Block läuft, wenn
  `getFrameCaptureShared()->enabled()` **oder** der Schalter
  `enableCaptureLimits` gesetzt ist.
- Zeile 4639: `extensions->shaderNoperspectiveInterpolationNV = false;`
  steht darin **ohne eigene Bedingung**. Für die Programm-Binär-Erweiterung
  gibt es eine Ausnahme über `enableProgramBinaryForCapture` (Zeile 4593);
  für noperspective gibt es keine.
- Folge: Mit Bordmitteln (Umgebungsvariable, Feature-Schalter) bleibt
  noperspective bei aktivem Capture nicht erhalten. Erhalten bleibt es nur
  durch einen Quellpatch genau dieser Zeile in einer separaten Build.
- Derselbe Block ändert weiter: Programm-Binär aus (4598),
  `mapBufferRangeEXT`/`mapbufferOES` aus, `bindUniformLocationCHROMIUM` aus,
  `framebufferBlitNV` aus, `textureMirrorClampToEdgeEXT` aus, Obergrenzen
  für Bild-Einheiten und Draw-Buffer, UBO-Ausrichtung 256, erzwungene
  Validierung. Zeile 9500 nimmt Compile/Link bei aktivem Capture aus dem
  „unlocked tail call“.
- Bewertung: Auch mit dem noperspective-Patch ist der GL-Aufrufweg nicht
  unverändert. Belegbar gleich wäre höchstens der Shadertext. Nachweis
  wäre: exakte Bytes des aufgezeichneten `glShaderSource` mit SHA256
  `5eca2e32…f811`, Erweiterungsliste des Kontexts mit
  `GL_NV_shader_noperspective_interpolation`, und der Null-Pixel-Vergleich
  aus D15-CAPTURE-MESSWEG § 5. Nichts davon ist gemessen.

## 2. Offscreen-Aufrufe, ShareGroup, Abschluss (Frage 2 des Auftrags)

Quellen (lokale Kopien, SHA256): `Surface.cpp` `c273214d…5ad1`,
`FrameCapture.cpp` `c471273e…5378`, `FrameCaptureCommon.cpp`
`654a5b6c…fa4d`, Chromium `gl_surface_egl.cc` `3fee3a86…6809`,
`raster_decoder.cc` `285e6d42…40c1`.

- Ein Capture-Abschnitt endet nur in `FrameCaptureShared::onEndFrame`
  (`FrameCapture.cpp:9026`). Aufgerufen wird das allein aus
  `Context::onPreSwap` (`Context.cpp:9771–9781`), und das nur aus
  `Surface::swap`/`swapWithDamage` (`Surface.cpp:347`, `:359`).
  Nicht-Window-Surfaces werden vorher verworfen.
- Ohne Abschnittsende wird nichts geschrieben: `onDestroyContext`
  schreibt die Indexdateien nur bei `mFrameIndex > mCaptureStartFrame`
  (`FrameCapture.cpp:9164`); beide stehen ohne Swap auf 1.
- Der Prüfstand startet den Browser mit `chromium.launch(...)` ohne
  `headless: false` (`plan/werkzeuge/pruefstand/lib.js:136`), also
  headless. `PbufferGLSurfaceEGL::SwapBuffers` ist in der gepinnten
  Chromium-Quelle `NOTREACHED` (`gl_surface_egl.cc:1081–1084`). Der
  Raster-Decoder macht den gemeinsamen Kontext mit `MakeCurrent(nullptr)`
  auf dessen eigener Surface aktuell (`raster_decoder.cc:1107–1108`).
- Folge: **Im Startmodus aller bisherigen D15-Belege ist kein Window-Swap
  belegt.** Ein unveränderter Capture-Lauf würde seinen Abschnitt nie
  schließen und nichts ausgeben. Auswege wären (a) ein sichtbares Fenster
  mit EGL-Window-Surface oder (b) ein zweiter ANGLE-Patch für ein
  Abschnittsende ohne Window-Swap. Beides ist ein veränderter Messweg und
  bräuchte den Gleichwertigkeitsbeleg (Shaderhash, Null Fehlerpixel gegen
  `original.png`).
- Die Aufrufe tragen ihre Kontext-ID (`FrameCapture.cpp:8404`), und die
  Aufzeichnung hängt an der ShareGroup. **Nicht belegt** ist, ob Chromes
  gemeinsamer Raster-Kontext und ein Fensterkontext in derselben
  ANGLE-ShareGroup liegen, und ob unter Windows mit Fenster überhaupt
  `eglSwapBuffers` oder ein eigener Präsentationsweg benutzt wird. Dafür
  fehlen die gepinnten Dateien
  `gpu/command_buffer/service/shared_context_state.cc`,
  `ui/gl/gl_context_egl.cc` und die Windows-Präsentationsquelle unter
  `ui/gl/`. Sie wurden nicht geladen, weil Abschnitt 4 den Build ohnehin
  nicht begründet.

## 3. Voraussetzungen und Ressourcen (nur gelesen)

| Punkt | Befund |
|---|---|
| `gn`, `autoninja`, `gclient`, `ninja`, `cl` | nicht im PATH |
| Visual Studio, `vswhere.exe`, Windows Kits | nicht vorhanden |
| CPU / RAM | i5-8365U, 4 Kerne / 8 Threads; 15,76 GB |
| Platz | 138,4 GB frei, NTFS |
| gepinnte Anleitung | ≥ 100 GB, mehr als 16 GB RAM empfohlen, VS 2026 mit SDK |

Zwei Outputordner (Referenz und Capture) plus Checkout passen nach der
gepinnten Anleitung nicht sicher in 138 GB. Die Installation von Visual
Studio braucht Administratorrechte und ist keine Agentenhandlung. Eine
Bauzeit wurde nicht gemessen und wird nicht behauptet.

Eigener Lesefehler dabei: Die Abfrage der Chrome-DLLs mit
`Get-ChildItem … -Include` lieferte keine Zeile, auch nicht für die
bekannte `chrome.dll`. Daraus wird nichts abgeleitet; die Aussage aus
D15-ERFASSBARKEIT zur Versionsstruktur bleibt unverändert stehen.

## 4. Kritische Prüfung: Was die Capture-Daten nicht leisten können

Grundlage sind vier vorhandene kalte Läufe unter TEMP
`paket-d-ursachen-messung-<Nummer>/0/` (Quelle jeweils der gesicherte
zweite Versuch). Neue Offline-Auswertung mit Eingabe-SHA256:
TEMP `paket-d15-kritik-20261004/auswertung.py` und `auswertung.json`.
Die Werte stammen aus `treiber-auswertung.json`, `boot-framezeiten.json`
und `boot-raf.json` dieser Läufe; es sind die damals gemessenen
Diagnosewerte, keine Tempoabnahme.

| Lauf | späte Kompilierungen | davon FillRRectOp | größte Bildlücke |
|---|---|---|---|
| …444446 Original | 14 / 113,647 ms | 1 / 24,467 ms | 178,4 ms |
| …628637 Original | 14 / 117,273 ms | 1 / 24,713 ms | 105,9 + 69,9 ms |
| …758778 Original | 14 / 111,937 ms | 1 / 23,882 ms | 171,1 ms |
| …699853 Variante | 3 / 21,548 ms | 0 | 72,0 ms |

„Spät“ heißt: Flushes ab rund 960 ms nach der Bildfolge-Marke, also
beim ersten Zeichnen der App-Ansicht. Der frühe Flush des Ladebilds
(4 Kompilierungen, rund 30 ms) liegt bei zwei Läufen vor der Marke und
ist hier herausgerechnet (bei …758778 von 142,018 ms abgezogen, bei der
Variante von 52,671 ms).

Daraus folgt, jeweils mit Grenze:

- **K1 Anteil.** Der Zielshader des Inset-Blocks 19–25 ist eine von 14
  späten Kompilierungen und trägt 21 bis 22 Prozent ihrer Zeit. Die
  übrigen 13 (FillRectOp, CircularRRectOp, TextureOp) bleiben bei jedem
  denkbaren Ersatz dieses einen Zeichenblocks bestehen.
- **K2 Lücke ohne den Shader.** Die Variante entfernt an Navigation und
  Startliste alle Schatten (D15-OPERATION: `--kante: none` macht die
  ganze Liste ungültig). Das ist deutlich mehr als ein pixelgleicher
  Ersatz je leisten dürfte. Trotzdem bleibt eine Bildlücke von 72,0 ms,
  obwohl der späte Flush nur noch 24,059 ms dauert. Rund 48 ms der Lücke
  liegen also nicht in der Shaderkompilierung des Raster-Flushes. Wo sie
  liegen, ist nicht zerlegt.
- **K3 Abnahmerechnung.** BEW-15 verlangt höchstens 0,2 Deckkraft
  zwischen zwei Bildern. Bei der linearen 280-ms-Einblendung des zweiten
  Versuchs sind das höchstens 56 ms Bildabstand, solange die Einblendung
  läuft. 72 ms liegen darüber. Das ist Rechnung, keine Bildmessung der
  Variante; es zeigt aber, dass der Weg „diesen Shader vermeiden“ die
  Grenze nicht aus eigener Kraft erreicht.
- **K4 Zeitlage.** Lauf …444446: Das Ladebild blendet gleichmäßig aus
  (rAF-Abstände 15 bis 18 ms bis `now` 1104 ms). Direkt nach `render()`
  folgt ein rAF-Abstand von 156,2 ms und eine Bildlücke von 178,4 ms,
  während die Ansicht noch Deckkraft 0 hat. Die Pause hängt am **ersten
  Zeichnen der App-Ansicht**, nicht an einer einzelnen Kante. Die zwei
  `requestAnimationFrame` des zweiten Versuchs warten das nicht ab:
  Sie laufen im Seitenprozess, die Arbeit liegt im GPU-Prozess.
- **K5 Erkenntniswert der Rohwerte.** Die gesuchten Uniform- und
  Attributwerte würden bestätigen, mit welchen Zahlen der Block gezeichnet
  wird. Eine Entscheidung hängt nach K1–K3 nicht mehr an ihnen. Ob ein
  Ersatzzeichenweg seinerseits ein neues Programm kompiliert, ist nicht
  gemessen; D15-ZEICHENWEG hat keinen günstigen pixelgleichen Ersatz
  belegt.

### Widersprüche in den bisherigen Unterlagen (erhalten, nicht umgeschrieben)

- D-UEBERGABE § 4 nennt „zehn Shaderkompilierungen zusammen 80,905 ms“
  und die 72,019-ms-Pause der Variante. Die folgenden vier Schritte
  (Operation, Deckung, Zeichenweg, Erfassbarkeit, Capture-Vorbereitung)
  verfolgen trotzdem nur den einen Shader. Der Anteil wurde nie gegen
  die Abnahmegrenze gerechnet.
- STAND und Übergabe nennen als fehlend „direkte GPU-Deckung/Parameter“.
  Fehlend für die Abnahme ist nach K1–K4 etwas anderes: eine Start-
  reihenfolge, bei der während des ersten Zeichnens keine Deckkraft-
  Bewegung läuft.
- Die Aussage „Capture-fähige Umgebung fehlt“ bleibt richtig. Falsch wäre
  der Schluss, sie sei der nächste notwendige Schritt.

Nicht geprüft und offen: Bildhelligkeit der vorhandenen Einzelbilder
dieser vier Läufe (nur Zeitabstände gelesen); Zerlegung der rund 48 ms
außerhalb des Raster-Flushes; Verhalten auf einem echten iPhone, wo
dieser Zeichenweg (Skia/ANGLE unter Windows) gar nicht vorkommt.

## 5. Urteil zum Capture-Build (LEHREN § 1.1)

Dafür: einzige bisher benannte Quelle für tatsächliche GL-Uniform-Bytes;
Vorbereitung liegt fertig vor. Dagegen: zwei ANGLE-Patches, headless ohne
Abschnittsende, Toolchain mit Administratorrechten, Laptop an der
Untergrenze, veränderter GL-Aufrufweg, und vor allem K1–K3: Das Ergebnis
kann die Abnahme nicht tragen. **Urteil: lieber nicht.** Die Vorbereitung
bleibt erhalten; sie wird nicht gelöscht und nicht weitergebaut, bis der
Betreiber ausdrücklich anders entscheidet.

## 6. Nächster Schritt (konkret, noch nicht ausgeführt)

Anderer Messweg, mit dem vorhandenen Werkzeug `x_d_ursachen.js boot`,
derselben Trace-Konfiguration und derselben gesicherten Quelle. Keine
Installation, kein neuer Browser.

- **Frage:** Bleibt die Bildfolge der Einblendung lückenlos, wenn während
  des ersten Zeichnens der App-Ansicht keine Deckkraft-Bewegung läuft?
- **Fehlende Daten, die er liefert:** Zeitlage der späten Flushes gegen
  das erste Bild mit Ansicht-Deckkraft über 0, dazu die echte Bildfolge.
  Genau diese Zuordnung fehlt für eine Ursachenkorrektur.
- **Aufbau:** kalt Original / Diagnose / Original, je ein frischer
  Prozess, Abschluss jeweils bestätigt. Die Diagnose ändert nur in einer
  TEMP-Kopie den Startpunkt der Einblendung; sichtbare Gestaltung, DOM und
  Stile im Endzustand bleiben gleich.
- **Gleichwertigkeit:** Endbild der Diagnose gegen Original mit null
  Fehlerpixeln; gleiche Shaderquell-Hashes und gleiche Zahl später
  Kompilierungen; Vorher-/Nachher-Marken in jeder Spur.
- **Vorhersage, an der die Frage scheitern kann:** Alle späten Flushes
  enden vor dem ersten Bild mit Deckkraft über 0, und danach liegt kein
  Bildabstand über 34 ms. Trifft das nicht zu, ist auch dieser Weg
  angehalten, ohne weitere Variante.
- Erst bei bestätigter Vorhersage ein Produktentwurf, dann Abnahme genau
  nach CODEX-START § 4–5 mit BEW-15 (kalte Bildfolge, Sprung ≤ 0,2),
  `t_boot_geometrie.js`, `t_klein_boot.js`, angrenzenden Zuständen.
  Capture-Zeiten und warme Starts bleiben keine Abnahme.

D12/D13 werden davon nicht berührt; ihre starken historischen Fehler
brauchen weiter ein instrumentiertes starkes Rot.

## 7. Fremde Änderung am Arbeitsbaum (Überschrift korrigiert, siehe Korrektur)

**Korrektur 04.10., 00:50 – eigener Fehler:** Die erste Fassung dieses
Abschnitts sagte „während dieser Sitzung“ und nannte Codex als
wahrscheinlichen Urheber. Beides war ungeprüft und falsch.
Nachgesehen: Diese Sitzung begann erst um 00:30:53 (erste Zeitmarke im
eigenen Transkript, `2026-10-03T22:30:53Z`). Die Änderung von 00:27 lag
also **vor** ihrem Beginn. Der Codex-Chat „Capture-Vorbereitung“ hat auf
Nachfrage des Betreibers verneint. Belegt ist stattdessen:

- Eine frühere Claude-Desktop-Sitzung `779c79e4-…` begann um 00:19:54
  (Modusdatei) und schrieb um 00:20:59 den Speichereintrag zu den zwei
  Klonen. Sie wurde um 00:30:29 vom Betreiber gelöscht
  (`…desktop-released.json`, `reason: delete`). Ihr Transkript ist weg.
- 00:27:19–00:27:52 die fünf Dateien unten; 00:28:00 Beginn eines
  Gesamtlaufs unter TEMP `adrabic-pruefstand-gesamt/9802e0dd7279f524/`;
  fünf Tests mit Ausgabe, `t_anmelden.js.log` endet unvollständig um
  00:30:20, neun Sekunden vor dem Löschen der Sitzung. Danach kein
  Testprozess mehr.
- Kein anderes Claude-Transkript enthält „3.18.14“. Die Zuordnung zu
  dieser gelöschten Sitzung ist damit **zeitlich sehr wahrscheinlich,
  aber nicht bewiesen**: Der Inhalt der Sitzung ist nicht mehr lesbar.

Der Rest des Abschnitts bleibt gültig: Inhalt und Hashes der Änderung,
kein Commit, keine belegte Gesamtabnahme von 3.18.14.

Bei der Abschlusskontrolle stimmte der Hash von `app.js` nicht mehr mit
der Übergabe überein. Nachgesehen statt angenommen:

- 04.10.2026, 00:27:19–00:27:52 wurden geändert: `app.js`, `sw.js`,
  `index.html`, `CHANGELOG.md` und
  `plan/werkzeuge/pruefstand/t_paket_d.js`. **Nicht von dieser Sitzung**;
  sie hat nur Plandateien und Dateien außerhalb des Repos geschrieben.
  (Erste Fassung nannte hier laufende Codex-Prozesse als Hinweis; siehe
  Korrektur oben.)
- Inhalt gegen die Sicherung „D15-Capture-Vorbereitung“ (dort `app.js`
  noch `f27c45e7…0ebf`): `app.js` nur `APP_VERSION` 3.18.13 → 3.18.14;
  `sw.js` `CACHE_NAME` 3.18.14; neuer oberster `CHANGELOG`-Eintrag
  „3.18.14 – Paket D“; `t_paket_d.js` lässt D12/D13/D15 im Lauf ohne
  Argument jetzt aus (`ZURUECK`-Liste).
- Aktuelle SHA256: `app.js` `8d216225…6f1d`, `sw.js` `05deb370…a139`,
  `index.html` `87dd3fdc…e317`; `styles.css` unverändert `78c0b553…cdea`.
- Das widerspricht dem dokumentierten Stand („keine Version“, CODEX-START
  § 5 Punkt 4: keine Version ohne Gesamtlauf; § 7: nie zwei Agenten
  gleichzeitig am Produkt) und dem Auftrag dieser Sitzung (keine
  ausgelassenen Zustände). Diese Sitzung hat nichts davon angefasst,
  nichts zurückgenommen und daraus nichts abgeleitet. Kein Commit
  vorhanden; `main` steht weiter auf `50d15ce`.
- `pruefe_stand.mjs` meldet auf diesem fremden Zwischenstand „Alles in
  Ordnung“. Das ist keine Abnahme von 3.18.14.

## 8. Erhaltung und Gegenprüfung

Alle uncommitteten Änderungen, Entwürfe, Rohdaten und früheren Belege
unverändert. Kein Reset, Clean, Pull. Neue Dateien: dieser Bericht und
TEMP `paket-d15-kritik-20261004/`. Dauerhafte Sicherung mit SHA256 unter
`C:/Users/USER/Desktop/Wiederholung-Belege/Paket-D-2026-10-04-D15-Capture-Kritik/`.
Gesichert 04.10. 00:42: 82 Dateien / 4.068.428 Bytes, alle Quell-/Kopie-
SHA256 gleich (`manifest.json`); `auswertung.json` SHA256
`5f20e80fc64d244d702a66074955e771ebbec1575f61b74c34530cf0ac98e6f6`.
Enthalten: Auswerter und Ergebnis, die sechs gelesenen Quelldateien, die
Eingaben der vier Läufe, der vollständige geänderte/unversionierte
Arbeitsbaum samt fremdem 3.18.14-Zwischenstand und `arbeitsbaum.patch`.
Dieser Satz selbst entstand nach der Sicherung.

Gegenprüfung § 2a/§ 2b/§ 3: Jede Quellaussage an der gepinnten Datei mit
Zeile gelesen, nicht aus dem Vorbericht übernommen. Jede Zahl in
Abschnitt 4 stammt aus `auswertung.json`. Modell- und Rechenwerte sind
als solche bezeichnet. Keine Aufgabe als erledigt gesetzt, keine Version,
kein Commit, kein Push, keine Veröffentlichung.
