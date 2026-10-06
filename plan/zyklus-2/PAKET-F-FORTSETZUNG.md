# Paket F – Fortsetzung am Laptop, 05.10.2026

## Abschluss 06.10.2026

Paket F ist abgenommen und als 3.18.17 committet. Diese Datei ist ab hier
Verlauf; maßgeblich ist der oberste Eintrag im [Logbuch](LOGBUCH.md).
Gesamtlauf 146/146 (Quellstand cd7e88bcd1ba1daa), Runde 13/13, Affen 0
Befunde. Bilder und Rohläufe dauerhaft unter
`Desktop/Wiederholung-Belege/Paket-F-2026-10-06-Abschluss/` (204 MB,
1904 Dateien gleich gezählt), im Repo nur Logs.

## Laufender Stand (Claude-Sitzung ab 17:10, wird fortgeschrieben)

- 17:17 BatteryStatus=2 (Netzteil). Ordner `Desktop\Wiederholung`, HEAD 5af78a0,
  Entwurf unverändert seit 09:36, kein anderer Prozess schreibt. Nichts resettet.
- 17:22 Sicherung alle 30 s läuft wieder (`paket-f-sicherung.mjs`, `aktuell.json`).
  Server 127.0.0.1:8099 HTTP 200, Chrome 154.0.8037.93.
- 17:24 F12 wieder eingesetzt (`paket-f-css-wieder.mjs`; Vorstand dieses
  Laufs fest in `styles-vor-f12-lauf2.css`). `t_paket_f_css` grün, Gegenprobe
  am festen 5af78a0 rot, `paket-f-css-tot.mjs`: 0 Fundzeilen der 24 Klassen in
  app.js/sw.js/drei HTML-Seiten. Logs `f12-lauf2-*.log`.
- 17:26–17:35 Neues Messgerät `x_paket_f_sicht.js` (Fensterfotos je
  Scrollschritt, RGBA, 0 Toleranz, dazu berechnete Stile aller Elemente samt
  ::before/::after). Zwei eigene Aufbaufehler gefunden und behoben, ohne
  Grenze zu ändern: (1) Chrome zählt `--x`-Eigenschaften je Seite in anderer
  Reihenfolge auf, Einträge werden jetzt sortiert; (2) auch Fensterfotos
  schwanken mit GPU-Raster bei **gleicher** Quelle (Alt gegen Alt: Verlaufs-
  Rauschen ±1, bis 17 an Rundungen; Maske `f12-sicht/diag-maske-*.png`).
  Mit `--disable-gpu` (Software-Raster) zweimal Alt/Alt und Alt/Neu gleich.
  Gegenprobe des Messgeräts: lebende Regel um 1 px geändert → rot (Stil und
  103252 Pixel), `f12-sicht-gegenprobe-a.log`.
- 17:36 **Läuft:** voller Vergleich, 36 Konfigurationen, mit Kontrolle
  Alt/Alt, `--disable-gpu` → `paket-f-belege/f12-sicht-voll.log` (rund 75 min).
  Währenddessen kein zweiter Browserlauf, app.js/index/sw nicht anfassen.
  Parallel nur Lesen: Gegenprüfung F1–F13 gegen `befunde/CODE.md`.
- 17:40 erste zwei Konfigurationen gleich, Kontrolle Alt/Alt gleich.
- 17:41 **Gegenprüfung F13, zwei Funde, behoben (nur Texte):**
  (1) Das Umzugsskript hatte nackte Dateinamen ersetzt: Changelog und elf
  weitere Texte nannten `plan/archiv/bilder/icon.svg` als früher
  ausgelieferte Datei. 38 Stellen zurückgestellt, gegen 5af78a0 geprüft
  (0 abweichende Zeilen). `befunde/CODE.md` wörtlich wie 5af78a0.
  (2) Z14 sagt „drei überholte Dateien löschen“; zwei lagen stattdessen in
  `plan/archiv/ueberholt/`. Beide bytegleich mit 5af78a0, jetzt gelöscht.
  Die dritte (`plan/texte-lernen/entwurf-g119/`) bleibt unberührt, weil
  `plan/texte-lernen` in diesem Auftrag gesperrt ist → Offen für Betreiber.
- 17:42 Gegenprüfung F1–F11 am Diff gegen `befunde/CODE.md` gelesen. Zwei
  kleine Nacharbeiten **nach** dem Fotolauf (app.js bleibt bis dahin
  unberührt): F4 Kommentar `app.js:15490` nennt noch `waehleStufe`;
  F10 `tab-verwalten` schloss vor F10 die Übungsauswahl nicht
  (`drillOpen`), jetzt schon → altes Verhalten wiederherstellen und im
  Ebenen-Test prüfen.
- `t_paket_f_bilder.js` nimmt jetzt ebenfalls mit Software-Raster auf
  (Grund oben, Toleranz 0 unverändert). LEHREN § 3.7a, § 5.3, § 15 ergänzt.
- 17:43 Ersten vollen Lauf nach drei Konfigurationen selbst gestoppt
  (`f12-sicht-voll.log`, kein Ergebnis daraus): In der Gast-Konfiguration
  mit Bewegung schwankten 1–34 Pixel auch Alt gegen Alt, an den Linien der
  Einstiegs-Leiste. Ursache: Ebenen behalten das Raster aus der laufenden
  Bewegung. Das Messgerät zeichnet jetzt vor jedem Foto einmal unsichtbar
  und wieder sichtbar; damit zweimal Alt/Alt und Alt/Neu gleich
  (`f12-sicht/probe-neuraster-*`). Toleranz unverändert 0.
- 17:50 F10 nachgearbeitet: `ui.drillOpen` aus `ebenenSchliessen()` heraus,
  dafür wieder an genau den acht Stellen wie in 5af78a0. `t_paket_f_ebenen`
  12/12 grün mit echter Klickfolge; Gegenprobe „Schließen in der Liste“ rot,
  Gegenprobe 5af78a0 rot (`f10-lauf2-*.log`). F4: Kommentar ohne `waehleStufe`.
  Vorstand der Nacharbeit: `app-vor-f10-nacharbeit.js`.
- 17:53 **Version 3.18.17** in app.js, sw.js, 33 Stellen index.html, CHANGELOG
  oben. `node --check` und `pruefe_stand.mjs` grün, `git diff --check` grün.
- 17:54 **Läuft:** voller F12-Vergleich am Endstand 3.18.17 mit Kontrolle →
  `paket-f-belege/f12-sicht-voll-2.log` (rund 100 min). Bis er endet, kein
  zweiter Browserlauf und keine Änderung an app.js/styles.css/index/sw.
- 17:51 **Achtung: BatteryStatus=1, PowerOnline=False, 98 %.** Um 17:17 war
  es 2. Netzteil ist ab. Der F12-Vergleich ist ein Einzeltest und läuft
  weiter. **Gesamtlauf, Tempo, Commit und Push erst wieder bei
  BatteryStatus=2** (CODEX-START § 5.4). Betreiber benachrichtigt.
  Version 3.18.17 steht im Arbeitsbaum, ist aber nicht committet.
- 18:49 Betreiber: Netzteil dran. Gemessen BatteryStatus=2, 81 %.
- 18:50 **Eigener Aufbaufehler:** Lauf `f12-sicht-voll-2.log` nach 27
  Konfigurationen gestoppt, kein Ergebnis daraus. Der neue Schritt
  „unsichtbar/sichtbar zeichnen“ war nur an einer Konfiguration erprobt. Er
  nimmt Eingabefeldern den Fokus und machte die ruhigen Konfigurationen schon
  Alt gegen Alt rot (bis 753134 Pixel). Schritt abgeschaltet. Neue feste
  Regel im Messgerät: Stile immer streng; ein Foto zählt streng, wenn die
  Kontrolle Alt/Alt dort gleich ist; schwankt es schon Alt gegen Alt, wird es
  als „nicht messbar“ ausgewiesen. Keine Pixeltoleranz.
- 18:52 **Läuft:** `f12-sicht-voll-3.log`, 36 Konfigurationen mit Kontrolle,
  rund 100 min. Kein zweiter Browserlauf bis dahin.
- 19:20 Sicherungsschleife nach 2 h vom Werkzeug-Zeitlimit beendet; ab jetzt
  Einzelsicherung je Schritt (`paket-f-sicherung.mjs --einmal`).
- 19:22 Prüfstand-Server ebenfalls vom Zeitlimit beendet, 19:23 losgelöst neu
  gestartet (PowerShell `Start-Process`, HTTP 200). Der F12-Lauf lief weiter;
  die Konfiguration, die in dieser Minute lief, im Log gezielt nachsehen.
- 19:23 F12-Lauf 16/36: 13 gleich mit gleicher Kontrolle; die drei
  Gast-Konfigurationen mit Bewegung schwanken bei Fotos Alt gegen Alt
  (1–45 Pixel), Stile gleich. Offen: 320-hell-bewegt-gast einstieg-0 y=213,
  11763 Pixel bei gleicher Kontrolle → nach dem Lauf mehrfach Alt/Alt prüfen.
- 20:01 **F12-Vergleich fertig** (`f12-sicht-voll-3.log`, Endstand 3.18.17):
  berechnete Stile in **36/36** Konfigurationen gleich (0 Stilbefunde).
  Fotos in **30/36** gleich, jeweils auch Kontrolle Alt/Alt gleich; darunter
  alle 18 ruhigen (Methode des Befunds, „wie t_nur_betreiber“) und alle 12
  Konto-Konfigurationen mit Bewegung. Die 6 Gast-Konfigurationen mit Bewegung
  sind per Foto nicht messbar: Vier Wiederholungen von 320-hell-bewegt-gast
  (`f12-sicht-gast-bewegt-wiederholung.log`) zeigen jede dort gemeldete
  Stelle auch Alt gegen Alt (einstieg-0 y=213 in 4 von 4 Läufen mit
  11947–14387 Pixel, einstieg-1/2 je 1 Pixel, 3c und 7 bis 86 Pixel). Das
  Messgerät endet deshalb mit Exit 1 (5 Zufallstreffer); das wird nicht
  umgedeutet, sondern so berichtet. F12 gilt als abgenommen über Stile 36/36,
  Fotos 30/36 und `t_paket_f_bilder` (12 + 48 Fotos, 0 Pixel).
- 20:13 `t_paket_f_bilder` F3 12/12 und `--alle` 48/48 mit 0 Fehlerpixel,
  `t_paket_f_css` grün, Verweis-Inventar ohne Fund (`f13-lauf2-verweise.log`).
- 20:15 BatteryStatus=2. Emulator 8081 bereit, Server 200.
  **Gesamtlauf gestartet**, losgelöst (PID 6968), 146 Tests, Quellstand
  cd7e88bcd1ba1daa. Fortschritt: `paket-f-belege/gesamtlauf-1.log`, Einzellogs
  `%TEMP%\adrabic-pruefstand-gesamt\cd7e88bcd1ba1daa\`. Rund 2,5 h.
  Bricht die Sitzung ab: `alle_pruefen.js --fortsetzen` am selben Quellstand.
- 21:24 Gesamtlauf 86/146, **ein Rot: `t_feedback_speichern.js`.** Gelesen:
  Der Test verlangte den alten Wortlaut „Lade ein Backup herunter“; F8/Z13
  hat ihn auf „Lade eine Sicherung herunter“ geändert. Kein Produktfehler,
  die Erwartung war nicht mitgezogen. Im E-Lauf bdfec355 war derselbe Test
  grün. Erwartung auf den neuen Wortlaut gesetzt, die Gegenprobe am festen
  c4b1c30 verlangt weiter „Backup“. Rotes Original:
  `gesamtlauf-1-rot-t_feedback_speichern.log`. Nachlauf nach dem Gesamtlauf
  mit `alle_pruefen.js --fortsetzen` (läuft dann nur dieser Test neu).
  Andere Tests mit altem Wortlaut gesucht: keiner.
- Betreiber 20:4x: „mach“ zu: heute F fertig, danach D12; Veröffentlichen
  morgen auf sein Stichwort; Z1 morgen im eigenen Chat.
  Vorbereitet: `D12-D13-NACHHOLEN.md`, `E26-VORSCHLAG.md`,
  `GERAETETESTS-ZETTEL.md`.
- Danach: Runde 13, Affen Handy 200 / iPad 150 (Seed 7, AFFE_TEXTE=1),
  Logs lesen, LEHREN § 14, Doku, zwei Commits, Push.
- Danach: Status F1–F13, `pruefe_stand`, Gesamtlauf
  `alle_pruefen.js`, Runde 13, Affen, LEHREN § 14, Commit/Push. Kein Deploy.
- 17:20 **F12, Ursache der beiden roten Fotovergleiche belegt (Messfehler):**
  `fotos/f12-voll-1`, Foto `390-hell-…-voll-lernen.png`, SHA256-Anfang:
  vor/bewegt 117F870B, vor/ruhig CD32F2E9 (beide **altes** CSS);
  nach/bewegt CD32F2E9 (rot), nach-2/bewegt 117F870B (grün),
  nach-2/ruhig 117F870B (rot). Das Lernen-Foto hat also zwei Bildfassungen,
  und beide kommen mit altem **und** neuem CSS vor. Das „falsche“ Bild des
  F12-Entwurfs ist bytegleich zu einem Bild des unveränderten Vorstands.
  Das Vollseitenfoto (`fullPage`) ist bistabil, wie bei D12; der Befund
  verlangt den Vergleich „wie `t_nur_betreiber.js`“ (Fensterfoto, RGBA).
- Nächster Schritt: F12-Entwurf (`styles-f12-versuch.css`, Spezifität über
  `.card.card` erhalten) wieder einsetzen; Abnahme mit neuem
  `x_paket_f_sicht.js`: alle Bildschirme des Rundgangs, Fensterfotos je
  Scrollschritt, 0 Pixel Toleranz, dazu berechnete Stile aller Elemente
  alt/neu gleich. Danach Version, Gesamtlauf, Affen, Gegenprüfung, Commit/Push.

## Übergabe vom Vormittag (unverändert)

Ausgang main 5af78a0 / 3.18.16, sauber gestartet. Arbeitsbaum erhalten;
kein Reset, kein erneutes Ausführen der einmaligen Umzugs-/Ersetzungsskripte.
Keine Version, kein Commit/Push und keine Veröffentlichung in diesem Lauf.
Nur Paket F. D12–D15, Fortschritt-Umbau und plan/texte-lernen nicht bearbeiten.

## Ergebnis und genaue Fortsetzung

F1–F5, F7–F11 und F13 gebaut und einzeln geprüft, endgültige Laptop-Abnahme
offen. Status zurück mit diesem Grund; Änderungen ausdrücklich behalten.
F6 trifft nicht zu: schon C26/3.18.13 umgesetzt, 16 Nachprüfungen grün.
F12 zurück nach CODEX-START §6: zwei volle Fotovergleiche rot, nur F12
zurückgenommen. 48 Hauptfotos waren gleich, genügten aber nicht. Erster
voller Vergleich 30551 Fehlerpixel, zweiter zwei Konfigurationen grün und
Dritter rot. Keine Toleranz gelockert. t_paket_f_css bleibt absichtlich rot;
das Paket darf so nicht als fertig committet werden. F2/F3-CSS bleibt gebaut.
Versuchsquelle styles-f12-versuch.css, Vorstand styles-vor-f12.css und beide
Fotovergleiche unter paket-f-belege erhalten. Keine weitere F12-Diagnose hier.

1. STAND, CLAUDE, LEHREN, CODEX-START und diese Übergabe vollständig lesen.
   [Gegenprüfung](PAKET-F-GEGENPRUEFUNG.md) und die echten Logs lesen;
   vorhandenen Entwurf übernehmen. Keine andere Paketarbeit beginnen.
2. Am Laptop Netzteil prüfen: BatteryStatus=2. Zuerst F12 als zurück-Zeile
   nach CODEX-START lösen/abnehmen; nach zwei Fehlversuchen ist eine frische
   Prüfung gemäß dessen Empfehlung sinnvoll. Übrige gebaute Zeilen nicht
   blind neu bauen. Alle roten Originale behalten, keine Grenzen ändern.
3. Vollständiger Prüfstand alle_pruefen.js am finalen Produkt-/Teststand,
   Ausgaben vollständig lesen; Affen, Tempo-A/B gegen festen Vorstand,
   erforderliche echte Geräte/Safari und menschliche Rechtsprüfung.
   Browseremulation ersetzt diese nicht. LEHREN §14 und Gegenprüfung fertig.
4. Erst nach vollständiger Abnahme eine Paketversion, Commit/Push auf main.
   Nicht veröffentlichen. Kein Paketabschluss solange F12 rot ist.

## Hier tatsächlich geprüfter Stand

Tatsächlich Windows/PowerShell, BatteryStatus=1. Deshalb Einzeltests;
kein Akku-Gesamtlauf/Tempo-Abnahme. Chrome unter
C:\Program Files\Google\Chrome\Application\chrome.exe; vor Browseraufrufen
CHROMIUM darauf setzen. Server 127.0.0.1:8099 und vorhandener Emulator.
Keinen zweiten Browserprüflauf gleichzeitig starten.

Frische Folge einzel-2/status.json: 15 Aufrufe Exit0, alle Outputs gelesen:
Texte/Download, Ebenenwechsel, echte SDK-Startnetzwerke, Kontrast, a11y,
Großansicht, Üben/Auswahl, drei Importwege, Konto-Fortsetzungen, Runde13/13,
Handy-Affe200/Seed7 und iPad-Affe150/Seed7 mit Textaktionen, jeweils0Befunde.
Zusätzlich f-umfeld.log 24/24: 320/390/820, hell/dunkel, bewegt/reduce,
leer/voll; tatsächliche Daten-/Löschseite und Einzahlbanner, kein Querüberlauf.
Erstlauf dieses Zusatztests hatte eine falsche seitenspezifische Erwartung;
separat als f-umfeld-erstlauf-rot.log erhalten, nur Testaufbau korrigiert.
F3 zwölf Fotos null Fehlerpixel, F6 16 Fälle, feste Struktur-Gegenproben rot
und neu grün. F13 43 Syntaxchecks und finale Verweise ohne offene Funde.
pruefe_stand bei 3.18.16 grün; git diff --check grün.
-NurPruefen stoppt erwartbar an uncommittiertem Entwurf; kein Deploy.

Produktquellhash der Einzeltests:
53c72d8202efec7a81f18d5a8ffcad0649a5c80acd49492ce0e7e18605398bf0.
Rundenhash (andere definierte Quellenliste):
c8b33251cf8295378b643b043f28ee7066f6f21430a5a6c1382127e92591a95e.
Quellenmanifeste in einzel-1/quellen und einzel-2/quellen; Exportmanifest
enthält auch den später ergänzten Umfeldtest. Logs/Fotos direkt in paket-f-belege.
Schutzordner, sw/index/rules/firebase-Konfiguration ohne inhaltlichen Diff.
Keine internen Datenfelder/Importformate geändert. F13 alter geschützter
Regeltestpfad bleibt durch Kompatibilitätswrapper erreichbar.

## Notfallsicherung und Übertragung

Während der Arbeit alle30Sekunden Git-Diff gegen5af78a0, HEAD, Status und
geänderte/unversionierte Dateien im Repo gesichert. aktuell.json nennt den
letzten erfolgreichen Snapshot; Rohsicherungen liegen in sicherungen/ und
sind gezielt ignoriert. Logs/Fotos werden unmittelbar ins Repo geschrieben.
Sicherung in neuer Session starten: node plan/zyklus-2/paket-f-sicherung.mjs.

Export: paket-f-belege/PAKET-F-FORTSETZUNG-2026-10-05.zip.
Enthält binären Diff, geänderte/neue Dateien, Löschliste, Logs/Fotos und
SHA256-Manifest. Rohsicherungen sind wegen Redundanz nur lokal enthalten.
ZIP zuerst in separates Verzeichnis entpacken und Manifest prüfen; am Laptop
gegen5af78a0 und dortige Änderungen vergleichen, niemals ungeprüft überschreiben.
Der Arbeitsbaum ist maßgeblich, ZIP ein Übertragungsstand. Keine node_modules,
Zugangsdaten oder laufenden Dienste werden exportiert. Exportskript ist wiederholbar.
