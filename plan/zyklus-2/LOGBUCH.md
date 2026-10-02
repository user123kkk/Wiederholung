# Logbuch: Zyklus 2

Letzter Eintrag zuerst. Auftrag: [`AUFTRAG.md`](AUFTRAG.md).

### 2026-10-03 — Vorhandenen Paket-C-Stand abgeschlossen, 3.18.13

**Geändert:** Den gesamten vorhandenen Stand erhalten und als 3.18.13
abgeschlossen: `app.js:19`, `sw.js:10`, alle 33 `?v=`-Stellen in
`index.html` (einschließlich 31 Startbilder), `CHANGELOG.md`.
22 Aufgaben C1–C8, C11–C15, C17, C19–C21 und C23–C27 lokal abgenommen;
C22 nur b/c/d. Sechs vorhandene neue C-Abnahmedateien mit aufgenommen.
Beim Gegenlesen zusätzlich `app.js:9163`: Eingabe-Handler des vorhandenen
Kartenblatts auch über Fortschritt verbinden. `t_paket_c_weiter.js:149`
prüft Escape/Rückfrage, Abbruch und Neuzeichnen ohne Entwurfsverlust.
`alle_pruefen.js` erhält für die gebündelten C-Dateien ausreichende
Prozesszeit (weiter 60 Minuten, verw 20 Minuten); keine Assertion,
Messgrenze oder Wartebedingung gelockert. Dokumentation in LEHREN,
PLAN, STAND, beiden Aufgabenlisten und Changelog nachgezogen.

**Entscheidung:** Ausdrücklicher Betreiberauftrag: den uncommitteten C-Stand
abschließen, keine weitere Aufgabe bauen, Z1 auslassen, kein anderes Paket,
nicht veröffentlichen. Deshalb vorhandenen Stand weder gepullt noch
zurückgesetzt. Sicherung vor dem Abschluss:
`%TEMP%/paket-c-vor-abschluss-20261002-223602/`.
Gegen diese Sicherung sind CSS, vier geänderte Bestandstests und fünf der
sechs neuen C-Tests bytegleich; app.js unterscheidet sich nur durch Version
und die eine C12/C19-Handlerbedingung. Der sechste C-Test wurde um genau die
Entwurfsregression erweitert. Alle alten Logbuch-Einträge, Fehlversuche,
Patch und Gegenproben bleiben erhalten. `git fetch origin main` bestätigte
denselben Vorstand b60abf4. Commit/Push direkt auf main, kein Deploy.

**Gegenprüfung nach Großplan § 2a / § 3:** Vollständigen app.js-/styles.css-Diff
gegen G-118, FORT-1–7, FORT-10/12–15 und VERW-1–9/11 gelesen; alle vier
geänderten Bestandstests, alle sechs neuen C-Tests und Dokumentations-Diffs
geprüft. Je Aufgabe:
C1 dauerhaft verbundenes Wortfeld, Fokus ohne Scrollen, Nachführen nur im Blatt;
C2 Antwortenzahl klein ohne Erfolgswertung; C3 Quran-Zierziffer entfernt;
C4 globaler Kopf; C5 ehrliche Pause und bestehender Rundenweg;
C6 Null/Einzahl/Mehrzahl; C7 nur bestätigter Wortlaut, keine Lernregel;
C8 binäres Raster in voller Breite und beschriftet;
C11 realer Puffer für die Kartenzahl aller Bereiche;
C12 geänderte Entwürfe bei Escape/Wischen; C13 sichtbares Ablegeziel und Ansage;
C14 echte Leeransicht nach Bereichswechsel; C15 vorhandener Bereichsweg;
C17 ältester Kalendertag; C19 Rückweg und kontogebundenes Undo;
C20 vorhandene Inhalte auf großen Bildschirmen offen;
C21 tatsächliche Animationsenden; C22 ausschließlich b/c/d;
C23 Ansagen bei Verschieben/Löschen; C24 beide Rückwege gleich;
C25 Hinweise nur geführt; C26 gültiges letztes Ziel, Detailwege und verschwundene
Karte ohne Entwurfsverlust; C27 nur sichtbare bearbeitbare IDs.
Frühe Rückkehr beim verschwundenen Kartenziel erhält den Entwurf;
Undo überschreibt keine neueren Rückfälle. Asynchrone Dialogfortsetzungen
prüfen Konto/Bereich/Auswahl. Feste Gegenproben b60abf4 vollständig gelesen;
C2 nochmals frisch rot bestätigt, C15 als Textvergleich. C12/C19-
Zusammenspiel war tatsächlich fehlerhaft: UI-Probe vor Korrektur schloss die
geänderte Übersetzung mit Escape ohne Rückfrage. Nach der begrenzten
Handlerkorrektur gezielte C19-Matrix und vollständige C-Matrix grün.
Gerätebefund G1 bleibt ausdrücklich offen.

**Gesamtlauf:** Netzteil mehrfach BatteryStatus=2; Chrome 154.0.8037.93,
CHROMIUM in jedem Browseraufruf gesetzt, lokaler Server 8099.
Echte SDK-Prüfungen gegen lokalen Firestore-Emulator 8081, ausschließlich
Demo-Projekt. Endstand **137/137 grün**, einschließlich zweier gezielter
Nachläufe, alle vollständigen Einzel-Ausgaben gelesen.
Quellhash `dc1761b67cbaa64ba48440d114490d8f9e9ebf3a7446b506575dec9cf4b357f2`.
Logs `%TEMP%/adrabic-pruefstand-gesamt/dc1761b67cbaa64b/`.
Angefangenen Lauf vor der C19-Korrektur bewahrt; danach korrigierten
Produktstand vollständig geprüft. Nach Anpassung der Starterzeit nur exakt
passende grüne Quell-/Test-Hashes fortgesetzt.
C1 32 Zustände plus Duplikatabbruch/Write-Ablehnung/Offline-Rückkehr;
C2 zwölf Zustände; C12/C13/C14 zusammen 40; C17 84 Kalenderfälle;
`t_paket_c_weiter` 256 Aufgaben-Konfigurationen (1200 Sekunden), alles grün.
C11 zweite Suche 4.229 statt 72.026 normalize-Aufrufe.
Rasterkontrast hell 5,42/dunkel 5,17; volle verfügbare Breite.
Rundenabnahme **13/13 grün** aus identischen Produkt-/Test-Hashes;
auch Rundenende, Üben und Schreiben vollständig gelesen.
Affe mit Textfällen (AFFE_TEXTE=1), Startwert 7: **Handy 200/iPad 150,
jeweils 0 Befunde**, 106/126 Textaktionen; beide vollständigen Ausgaben gelesen.
Zusatzlogs `%TEMP%/paket-c-final-{rundenabnahme,affe-handy,affe-ipad}.log`
und `paket-c-final-C2-gegenprobe.log`.
Syntax, Version, alle 33 Dateiversionen, CSP/APP_SHELL und diff --check grün.

**Belegte Prüfaufbaufehler, keine Produktänderung:** Erster vollständiger
Lauf 135/137. `t_nur_betreiber` fror normale Bildschirme auf 3.17.56 ein
und meldete freigegebene C1/C4/C7-Änderungen rot. Historischen Bericht unter
`%TEMP%/paket-c-abschluss-nur-betreiber-historisch.log` bewahrt;
`--historisch` bleibt abrufbar. Aktuelle Abnahme isoliert den Textschalter
am selben Quellstand: erzwungen aus gegen reale Freigabe, unverändert
strenger HTML-/Pixelvergleich, sieben Stationen bei 390/1440 px.
Beide normal grün; Betreiber-Gegenprobe sechs Unterschiede, entsperrte
Schrift vier, erzwungene Normal-Konto-Freigabe sechs. Keine Station ausgelassen.
`t_serie_lang` verwendete vor 04:00 das Kalenderdatum statt des Lerntags.
Beleg 00:07: 2026-10-03 gegen 2026-10-02; T5=4 und T200=199.
Gemeinsame vorhandene lib.tag-Funktion benutzt, Erwartungswerte unverändert:
200/199/48 im Nachlauf exakt erreicht. Alten vollständigen Bericht
`%TEMP%/paket-c-abschluss-serie-lang-alte-testbasis.log` und Stand-JSON
`paket-c-abschluss-gesamt-vor-nachlauf.json` bewahrt.
Nur die beiden geänderten Tests frisch nachgelaufen; keine grünen Tests
desselben Stands wiederholt, keine Lernregel geändert.

**Tempo und Grenzen:** Texttempo CPU4×, 286 Ayat: längste Aufgabe 132 ms,
keine über 200 ms. Scrollen Verwalten/Fortschritt/Einstellungen:
keine Bilder über 34 ms, max. 19/19/18 ms. Schreiben CPU4×:
keine Bilder über 34 ms, Lage unverändert. Beschreibende Tempoausgaben
melden weiterhin kurze Blockaden: Rundenstart 125 ms, Fortschritt 183 ms,
Verwalten 194 ms, Rundenende 125 ms. Kein roter Tempo-Grenztest;
keine vollständige Ruckelfreiheit und keine echte iOS-Abnahme behauptet.

**LEHREN § 14, Punkt für Punkt:**

1. Codepfade selbst gelesen, einschließlich Dialog-/Snapshot-/Auth-Fortsetzungen;
   C12/C19-Regressionsursache gefunden und geprüft.
2. Muster im Repo gesucht: Fokus/Scrollen/Blattaufbau, Entwurfsbindung,
   Auswahlreset, Suchpuffer, Fortschrittsbegriffe, Kalender und alte Knopfhinweise.
3. Betroffene Texte/Kommentare und sichtbar falsche G-021-Meldung korrigiert;
   historische Meldungen erhalten.
4. Vorhandenes Kartenblatt wiederverwendet, neue C-Aktionen in Handlern und
   Auswahl-/Dialog-/Rasterlisten geprüft, keine neue Einstellung oder Speicherung.
5. Entwurf in formDraft, Auswahl und Ansichten in ui; C19 Neuzeichnen hält Eingabe.
6. Sprung/Kontrast/Breiten/hell/dunkel/reduzierte Bewegung/leer/voll geprüft;
   CPU4× und tatsächliche Animationsenden gelesen, Grenzen siehe oben.
7. Einzahl/Mehrzahl, Nutzertexte und Ansagen gelesen, keine neuen Systemcodes
   oder religiösen Texte.
8. Keine neuen Cloud-Felder oder Regeln; bestehende echte SDK-Regressionen grün.
9. Kein neuer Datenfluss/localStorage-Schlüssel; keine Datenschutzänderung nötig.
10. node --check app.js und sw.js grün; geänderte Prüfskripte syntaktisch grün.
11. APP_VERSION/CACHE_NAME/alle 33 URLs/CHANGELOG einheitlich 3.18.13;
    pruefe_stand einschließlich CSP und APP_SHELL grün.
12. Berührte Tests und vollständiger Prüfstand 137/137, Runde 13/13,
    beide Affenläufe; Originalfehlerberichte und Gegenproben gelesen.
13. Logbuch, PLAN „AKTUELL“, STAND und beide Aufgabenlisten aktualisiert.
14. G1 und künftiger Regeln-Deploy als bedingte Betreiber-Schritte
    dokumentiert; jetzt wird nichts veröffentlicht.

**Offen:** G1 bis zur echten iPhone-Bestätigung (Safari und installierte App)
nach einer späteren Veröffentlichung. C16/D1; C18 erst nach dem Text-Probelauf
am 29.10.; C22(a)/F3, Teil e ausgeschlossen. Z1 mit C9/C10/C28 ausgelassen.
Kein anderes Paket begonnen. Online bleibt 3.18.10. Die bereits in Paket A
geänderten Firestore-Regeln müssen vor späterem Hosting eingespielt werden
(`ladegeraet.ps1`); in diesem Abschluss keine Regeländerung.

**Nächster Schritt:** Keine weitere Aufgabe ohne neuen Auftrag beginnen.
G1 nach einer späteren Veröffentlichung am echten iPhone mit datierter Version
prüfen: Verwalten oben/gescrollt, Wortfeld, arabische Tastatur mit Vorschlägen,
zweimal Enter. Seite muss stehen, Blatt über der Tastatur bleiben.

### 2026-10-02 — Nur C1 wiederaufgenommen, lokale Abnahme grün

**Geändert:** `app.js:6033` entfernt den doppelten Aufbau nach der Meldung;
`6079/6087/9096/9174` fokussieren ohne Scrollen. `8648/8770/9025`
behalten das neue Kartenblatt durchgehend verbunden, begrenzt auf dasselbe
Konto und denselben Bereich. Werte, Fehler und Meldung werden im erhaltenen
Blatt aktualisiert; Eingabe-/Enter-Handler werden nicht doppelt gebunden.
`14308/14366` prüfen nur einmal je Fokus/Tastaturöffnung und scrollen nur
das Blatt, nur bei verdecktem Feld. Viewport-scroll löst kein Nachscrollen
aus. `14463` schließt nur den Bestätigungsdialog über dem erhaltenen Blatt.
`t_paket_c.js` prüft diese Ursachen und Randfälle; LEHREN nachgezogen.
**Entscheidung:** Auf ausdrücklichen Auftrag nur C1 nachholen. Die beiden
alten Fehlversuche im Logbuch und ihr Patch wurden vor dem Bau gelesen.
Alle vorhandenen uncommitteten Änderungen erhalten; deshalb kein Pull und
kein Zurücksetzen. Ausgang zusätzlich vollständig gesichert unter
`%TEMP%/c1-ausgang-20261002-194156/`. Kein Z1, kein anderes Paket, kein Deploy.
**Prüfung:** Feste Gegenprobe b60abf4 bestätigt Fokus ohne preventScroll,
ersetztes Wortfeld und acht scrollIntoView-Aufrufe. Neuer Stand **32 Zustände
grün**: 390/320/iPad820/Desktop1440, hell/dunkel, bewegt/ruhig, leer/voll.
Hinzufügen und Enter legen je eine Karte an; Pflichtfehler, fremdes Echo,
vier Größenwechsel, Viewport-scroll, Fokuswechsel und erneutes Öffnen der
Tastatur erhalten das Feld. MutationObserver bestätigt: auch keine kurze
DOM-Trennung. Duplikatabbruch, dauerhafte Schreibablehnung und Offline-
Rückkehr grün. Foto der sichtbaren Notiz im 320-px-Blatt gelesen.
Logs `%TEMP%/c1-final-abnahme-2.log`, `c1-final-altbefund.log` und
`c1-rand-gegenprobe.log`; Fehlversuche und Diagnosen ebenfalls bewahrt.
**Eigene Korrekturen:** Leertest maß Inhaltsverkürzung statt Tastaturbewegung
(Ausgang und Fix identisch 680→568 px, Scroll-Lage 112→0 bereits beim
Speichern). Messphasen getrennt. Die Attrappe liefert bei fail immer
permission-denied; dauerhaft abgelehnten Zweig korrekt vorbereitet.
Der neu erhaltene Knoten machte den falschen closeDialog-Zielknoten sichtbar:
Rand-Gegenprobe rot, begrenzter Zielselektor grün. Keine Schließdauer geändert.
**Gegenprüfung:** Eigenen vollständigen Diff gegen G-118 gelesen:
submitCardForm/zeigeToast/patchDoc/Sammlungs-Snapshots/renderMain,
Blatt-Markup und Handler, Viewport/Fokus-Timer sowie Dialog-Schließpfad.
Fallback bei fehlendem/anderem Blatt baut regulär neu; Auth-Wechsel entfernt
den privaten Entwurf. Abgelöste/anders fokussierte Felder werden vom Timer
nicht mehr gescrollt. Keine Lernregel, keine Cloud-Felder, keine lokalen
Speicherschlüssel und kein Umbau des Text-Probelaufs. Alle unberührten
vorhandenen Änderungen vor der Dokumentation bytegleich mit der Sicherung.
**Regression:** Dialog-Timer, Kartenblatt, Karten-Snapshots, Verwalten,
Kontrast, a11y und Kontowechsel-Entwürfe grün. Frische Rundenabnahme
**13/13 grün**, alle 13 Einzel-Ausgaben vollständig gelesen; einschließlich
Rundenende/Üben/Schreiben, sichtbarer Zeichenfläche und CPU4× ohne Bilder
über 34 ms beim Zeichnen. Geprüfter Quellstand:
`165fc6b7fe35caed1080aa950c4a3340d8138a5ab559996863c69a8403de3026`.
Affe Handy200/iPad150 mit Startwert 7 jeweils **0 Befunde**; vollständige
Ausgaben gelesen. Syntax, Versions-/CSP-Prüfung und `git diff --check` grün.
Logs `%TEMP%/c1-final-*.log`, Runden-Einzelprotokolle unter
`%TEMP%/adrabic-pruefstand-gesamt/165fc6b7fe35caed/`.
**Tempo:** Acht abwechselnde A/B-Paare mit je drei Speichervorgängen,
CPU4×, Netzteil (BatteryStatus=2), Chrome 154.0.8037.93. Vergleich mit dem
gesicherten lokalen Ausgang einschließlich der vorherigen Paket-C-Arbeit:
Klick-Median 129→62 ms, Maximum 206→135 ms; Longtask-Median 131→73 ms,
Maximum 208→139 ms, über 100 ms 17/24→3/24. Keine vollständige
Ruckelfreiheit behauptet. Vollständige Ausgabe `c1-final-tempo.log` gelesen.
**Offen:** C1 ist lokal einzeln abgenommen. Noch keine
Gesamtabnahme des Pakets, keine neue Version, kein Commit/Push. Version bleibt
3.18.12. G1 bleibt bis zur echten iPhone-Bestätigung offen. C16/D1,
C18/nach 29.10., C22(a)/F3 und Z1 bleiben wie im vorherigen Auftrag.
**Nächster Schritt:** Vorhandenen uncommitteten Paket-C-Stand behalten;
Paketabschluss braucht einen eigenen Auftrag. G1 nach einer späteren
Veröffentlichung am echten iPhone prüfen, in Safari und installierter App:
Verwalten oben/gescrollt, Wortfeld, arabische Tastatur samt Vorschlägen und
zweimal Enter. Seite muss stehen und das Blatt über der Tastatur bleiben.
Keine weitere Aufgabe begonnen; Z1 weiterhin ausgelassen.

### 2026-10-02 — Paket C lokal angehalten, C27 einzeln grün

**Geändert:** C27 Alle/Keine für die tatsächlich sichtbare Seite; fremde und
gesperrte Karten ausgeschlossen, andere Seiten behalten ihre Auswahl.
Ab 20 Karten verlangt Löschen das Wort „Löschen“. Leere Treffer deaktivieren
Alle, ohne eine bestehende Auswahl zu löschen; Leistenhöhe bleibt gleich.
21 Aufgaben einzeln grün: C2–C8, C11–C15, C17, C19–C21, C23–C27.
C22 b/c/d grün; a ausdrücklich F3, e ausgeschlossen.
**Prüfung:** C27 feste Gegenprobe b60abf4 rot; 16 Zustände inklusive 200
Karten/Seitenwechsel, falsche/richtige Löschbestätigung, Fremd-/Schloss- und
Leertreffer grün. Berührte Verwalten-Prüfung, Sprung, Kontrast und a11y grün,
Ausgaben vollständig gelesen; Foto der festen Auswahlleiste bei 320 px gelesen.
**Abschlussprüfung:** Frische Rundenabnahme **13/13 grün**, alle 13
Einzelausgaben vollständig gelesen, einschließlich der beschreibenden
Rundenende-/Üben-/Schreiben-Ausgaben. Schreiben CPU 4× bei Handy/klein/iPad:
0 Bilder über 34 ms, Lage unverändert; keine allgemeine Tempo-Abnahme des
gesamten Pakets behauptet. Quellhash
`21515fd15b6ef4e081b6c7b4b161f501973d3c1e7e15283d869ba2ed993472f7`;
Logs `%TEMP%/adrabic-pruefstand-gesamt/21515fd15b6ef4e0/` und
`%TEMP%/paket-c-abschluss-runde.log`. Affe **Handy 200/iPad 150, Seed 7,
je 0 Befunde** (normaler Kartenlauf, kein AFFE_TEXTE); beide vollständigen
Logs `%TEMP%/paket-c-abschluss-affe-{handy,ipad}.log` gelesen.
Netzteil BatteryStatus=2, Syntax/Stand/CSP/APP_SHELL und diff --check grün.
**Gegenprüfung:** Gesamten app.js-/styles.css-Diff gegen FORT-1–7,
FORT-10/12–15 und VERW-1–9/11 sowie G-118 gelesen, dazu alle Änderungen
der bestehenden Tests, historische G-021-Korrektur und Dokumentation.
C2 Antwortzahl ohne Erfolgsversprechen; C3 keine Quran-Zierziffer; C4 globaler
Kopf; C5 ehrliche Pause; C6 Null/Plural; C7 nur bestätigter Wortlaut, keine
Lernregel; C8 binäres Raster, Texte unverändert; C11 realer Suchpuffer;
C12 Entwurf/Abbruch; C13 Ziel/Ansage; C14 echte Leeransicht; C15 vorhandener
Bereichsweg; C17 Wochenrand; C19 Rückweg und kontogebundenes Undo;
C20 bestehende Inhalte offen; C21 tatsächliche Animationsenden;
C22 nur b/c/d; C23 Rückmeldung; C24 beide Rückwege; C25 eigene/geführte
Hinweise; C26 vorhandene Wege und verschwundene Karte; C27 sichtbare IDs.
Auch die sechs neuen Paket-C-Abnahmedateien vollständig gegen ihre Befunde
gelesen; C1 bleibt ausdrücklich rot, kein Test verschweigt diesen Befund.
Frühe Rückkehr beim verschwundenen Kartenziel erhält den Entwurf; Undo
überschreibt keine neueren Rückfälle. Asynchrone Bestätigungen prüfen Konto,
Bereich und Auswahl. Keine neuen Cloud-Felder/localStorage-Schlüssel oder
Regeln, kein Umbau des Text-Probelaufs. Keine weiteren Paketaufgaben gebaut.
**LEHREN § 14:** 1 Codepfade gelesen; 2 Muster gesucht; 3 Texte/Kommentare
nachgezogen; 4 neue Aktionen/rasterschlüssel in vorhandenen Listen; 5 Auswahl
und Entwurf in ui/formDraft; 6 Sprung/Kontrast/Breiten geprüft, Schreiben
CPU 4× grün, keine allgemeine Tempo- oder echte iOS-Abnahme behauptet;
7 Plural geprüft; 8 keine neuen
Cloud-Felder/Regeln; 9 kein neuer Datenfluss; 10 Syntax grün; 11 bestehende
3.18.12 samt CSP/APP_SHELL grün; 12 Einzelprüfungen grün außer bekanntem C1,
frische Runde/Affe siehe Abschlussprüfung, Gesamtlauf noch ausstehend;
13 Logbuch/STAND/Aufgaben nachgezogen; 14 nächster Auftrag unten. Dies ist
die Gegenprüfung des Zwischenstands, keine Commit-Freigabe.
**Offen:** C1 bleibt rot (erneuter Nachweis: `%TEMP%/paket-c-abschluss-C1.log`),
nach zwei Fehlversuchen kein dritter Anlauf (§ 6). C16/D1, C18/nach 29.10.,
C22(a)/F3 zurückgestellt. C9/C10/C28 als Z1 ausgelassen. Deshalb kein
Gesamtlauf/Versionsabschluss behauptet, kein Commit/Push/Deploy; Version
bleibt 3.18.12. Arbeitsstand vollständig uncommittet erhalten. Nächster
Auftrag: C1 in neuem Astra-Chat mit diesem vorhandenen Arbeitsstand nachholen.

### 2026-10-02 — C19–C26 einzeln abgenommen, C27 in Abnahme

**Geändert:** C19 Bearbeiten über Fortschritt und Zähler-Undo (6 Sekunden,
kontogebunden, neue Rückfallzählung bleibt erhalten). C20 vorhandene Inhalte
ab 720 px offen, keine erzwungene Kastenhöhe. C21 Kalender-Spalten 380 ms
gesamt, Band 350 ms; offene Detailbalken ebenfalls kurz. C22 b/c/d tote
Klassen/Kommentare bereinigt und Kalender-Symbol. C23 Erfolgsansagen für
Verschieben/Einzel-/Mehrfachlöschen und ehrlicher Verschiebehinweis. C24
gemeinsamer Such-/Auswahlreset für beide Rückwege. C25 Hinweise nur geführt.
C26 letztes gültiges Ablegeziel zuerst/vorausgewählt, Standpunkte/Detail aus
Speicherkarte, Griff-Tipp ignoriert, gelöschte Karte mit erhaltenem Entwurf,
lange Detailnotiz scrollt in sich, Knöpfe bleiben sichtbar.
**Prüfung:** Feste Gegenproben b60abf4 jeweils rot; je 16 Zustände grün,
Fortschritt/Verwalten/Kartenblatt/Snapshot passend zur Stelle und Sprung,
Kontrast (0 Funde), a11y grün. Vollständige C19–C26-Logs gelesen, Fotos
iPad sowie Detailnotiz 320/1440 gelesen. C19-Test irrtümlich auf ein nicht
vorhandenes Formular gezielt, dann mit echter submit-card-Aktion geprüft;
Fehllogs bewahrt. C20 alter Test klickte auf nun versteckte Navigationszeile:
zusätzliche Prüfung offener Inhalte, alle Unterseiten weiterhin geprüft.
C21 erster Fix ließ letzte Vorschau-Balken durch spätere CSS-Regeln laufen;
zweiter Fix ordnet den scoped Override danach, 600-ms-Abnahme grün.
**Entscheidung:** C22(a) bleibt gemäß Doppelt-gemeldet-Liste für F3, kein F
begonnen; Teil e ausdrücklich ausgeschlossen. C26 nimmt den im Befund
erlaubten Nutzungsweg für zuletztSetId, kein neuer Speicher.
**Offen:** C27 erster Fix Höhenwechsel, zweiter Fix feste schmale Zeilen.
Danach Testdatenfehler: 160 lokale Zusatzkarten fehlten im Attrappen-Store
und verschwanden beim Echo; vollständige Store-Fixture korrigiert, kein
dritter Produktfix. Alle/Page/20-Karten-Löschen in 16 Zuständen grün,
Fremd-/Schloss-/Leertreffer-Nachprüfung läuft. Kein Commit/Deploy.

### 2026-10-02 — C17 einzeln abgenommen

**Geändert:** Tage bis Sonntag in der Wochenzahl mitrechnen, Grenzen 4/12
unverändert. Gegenprobe b60abf4: am Montag fehlt tag(-25).
**Prüfung:** 84 Zustände (7 Wochentage, 390/320/iPad, Themen/ruhig) grün.
Fortschritt leer/eine/voll, Sprung, Kontrast (0 Funde), a11y grün;
vollständige `%TEMP%/paket-c-C17-*.log` gelesen.
**Offen:** C19/C20 Einzelabnahmen laufen; C21 feste Gegenprobe rot.
Kein Commit/Deploy.

### 2026-10-02 — C15 einzeln abgenommen, C16/C18 zurückgestellt

**Geändert:** Beide veralteten „+ Bereich“-Hinweise nennen Bereichsname →
„Bereich anlegen“. Keine zusätzliche Aktion.
**Prüfung:** Feste Textgegenprobe b60abf4 zwei Treffer, jetzt null; Syntax,
Verwalten, geführte Zustände (16), Sprung, Kontrast (0 Funde), a11y grün.
Vollständige `%TEMP%/paket-c-C15-*.log` gelesen.
**Entscheidung:** C16 ist laut Doppelt-gemeldet-Liste D1 zugeordnet; kein D
begonnen. C18 verlangt ausdrücklich Ende des Probelaufs; bis 29.10. kein
Text-Umbau. Beide als zurück mit Grund geführt.
**Offen:** C17-Abnahme läuft; C19-Gegenprobe b60abf4 rot (Rückweg Verwalten).
Kein Commit/Deploy.

### 2026-10-02 — C14 einzeln abgenommen, C15 Textgegenprobe

**Geändert:** Ein Leerzustand mit Code- und Dateiimport, eine Hauptaktion;
Bereichwechsel setzt die globale Suche zurück. Aktive globale Suche aus
einem leeren Bereich bleibt möglich, Leeren zeigt wieder den Leerzustand.
**Prüfung:** Gegenprobe b60abf4 rot. 16 Zustände einschließlich Desktop,
globale Suche und echte Code-Eingabe grün. Verwalten, Sprung, Kontrast
(0 Funde), a11y grün; vollständige C14-Logs und Fotos 320/1440 gelesen.
C15-Gegenprobe am festen b60abf4: zwei Verweise auf nicht vorhandenen
„+ Bereich“-Knopf. Beide durch den vorhandenen Weg über Bereichsnamen ersetzen.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C13 einzeln abgenommen, C14 Gegenprobe

**Geändert:** Ablegen öffnet und zeigt das Ziel, Kurzmeldung nennt Anzahl und
Speicherkarte; bei 0 neuen Karten „War schon drin“. Beim Sortieren bleibt der
Fokus in der betroffenen Liste, auch wenn dieselbe Karte zweimal sichtbar ist.
**Prüfung:** Gegenprobe b60abf4 rot. Erster Fix zeigte in der beschreibenden
Verwalten-Ausgabe eine abweichende zweite Sortierung: Fokus fand die Karte
zuerst in der nun offenen Speicherkarte. Zweiter Fix begrenzt den Selektor
auf Hauptliste bzw. konkrete Speicherkarte. Test um echte Sortierassertion
erweitert; offene Panel-Vorbedingung an genehmigtes Verhalten angepasst.
12 Zustände mit sichtbarem Ziel/Ansage/0-neu/zweimal Pfeiltaste grün;
Verwalten, Sprung, Kontrast (0 Funde), a11y grün. Vollständige Ausgaben
`%TEMP%/paket-c-C13-*.log` gelesen, erster Lauf bewahrt, zweiter `-2`.
C14-Gegenprobe rot: globale Suche bleibt nach Bereichwechsel aktiv.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C12 einzeln abgenommen, C13 Gegenprobe

**Geändert:** Bearbeiten-Entwurf mit gespeicherter Karte vergleichen, auch
Stand; Auswahlstand über Neuzeichnen bewahren. Escape/Wischen fragen bei
Änderung, unverändert schließen sie direkt. Knopf Abbrechen bleibt direkt.
Dialogfortsetzung an Konto, Edit-ID und konkreten Entwurf gebunden.
**Prüfung:** Gegenprobe b60abf4 rot. Erster Versuch zeigte auch am Abbrechen-
Knopf die Rückfrage; zweiten Versuch auf diesen Klickpfad begrenzt.
Jetzt **12 Zustände grün**: Escape/CDP-Touch, Dialog abbrechen/verwerfen,
Wort/Übersetzung/Notiz/Stand erhalten, Cloud unverändert ohne Speichern.
Erweiterter Kartenblatt-Test, Snapshot, Sprung, Kontrast (0 Funde), a11y grün.
Vollständige Ausgaben `%TEMP%/paket-c-C12-*.log` gelesen; erster Fehllauf
bewahrt, zweiter mit Suffix `-2`. C13-Gegenprobe rot: Speicherkartenpanel bleibt zu.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C11 einzeln abgenommen, C12 Gegenprobe

**Geändert:** Suchpuffergrenze mindestens 4000, sonst viermal Kartenzahl aller
Bereiche. G-021 und Changelog 3.17.33 sichtbar korrigiert; Vorfall in LEHREN.
**Prüfung:** Gegenprobe b60abf4 zweite Suche 72.026 normalize-Aufrufe, Fix
**4.229** (<6000), echte 1500 Karten mit Notiz und sichtbare Treffer.
Verwalten Suche/Auswahl/Speicherkarten, Sprung, Kontrast (0 Funde), a11y grün.
Vollständige Ausgaben `%TEMP%/paket-c-C11-*.log` gelesen. Batterie erneut 2.
C12-Gegenprobe rot: geänderter Entwurf über Escape ohne Rückfrage geschlossen.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C8 einzeln abgenommen, C11 Gegenprobe

**Geändert:** Kalender mit Mo/Mi/Fr, Monatskürzeln, Legende, zwei Zuständen,
feinem Rand für leere Tage und voller Breite. Keine Text-Lernlogik angefasst.
**Prüfung:** Gegenprobe b60abf4 rot (23,9 % Breite). Fix in 16 Zuständen mit
leerem/4-/12-Wochen-Raster grün; gelernt/leer 5,42:1 hell, 5,17:1 dunkel,
100 % Rasterbreite. 320px-Foto nach abgeschlossener Bewegung gelesen.
Fortschritt, Sprung, Kontrast (0 Funde), a11y grün. Vollständige Ausgaben
`%TEMP%/paket-c-C8-*.log` gelesen.
**Entscheidung:** C9/C10 als Bestandteile des ausgeschlossenen Z1-Umbaus
ausgelassen. Weiter nur Paket C. C11-Gegenprobe b60abf4 rot: 72.026
normalize-Aufrufe bei zweiter gleicher Suche über 1500 Karten mit Notiz.
Historischen Commit geprüft: feste Grenze tatsächlich unverändert.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C7 einzeln abgenommen, C8 Gegenprobe

**Geändert:** Karten „schon einmal gewusst“, Lektionen „einmal geschafft“;
derselbe Wortlaut in Meilenstein, geführten Speicherkarten, Freischalthinweis
und Kontolösch-Zusammenfassung. Stufe-1-Kommentar berichtigt, keine Regeländerung.
**Prüfung:** Gegenprobe b60abf4 rot; 16 Zustände einschließlich Meilenstein und
geführtem Satz grün. Lernen-Start leer/eine/erste Runde/voll/erledigt/Serie/
zwei Bereiche, Fortschritt, Sprung, Kontrast (0 Funde), a11y grün. Fotos
gelesen, `saß/saßen/Lektion.*sitzt` ohne Treffer. Vollständige Ausgaben
`%TEMP%/paket-c-C7-*.log` gelesen. Fehlaufruf eines nicht vorhandenen Tests
als eigene Logdatei bewahrt; vorhandener Test `t_lernen_start` danach grün.
C8-Gegenprobe rot: Raster nutzt nur 23,9 % seiner Breite.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C6 einzeln abgenommen, C7 Gegenprobe

**Geändert:** Keine große Null; vorhandener Stand-Satz und sekundärer Weg
zur Runde bei noch nicht gewussten Karten. Mehrzahl über `mz`.
**Prüfung:** Gegenprobe b60abf4 rot, Fix in 16 Zuständen mit 1/40 neuen Karten
und Einzelkarte nach Nicht grün. C5-Integration, Fortschritt leer/eine/voll,
Sprung, Kontrast (0 Funde), a11y grün; 320px-Foto gelesen, kein Überlauf.
Vollständige Ausgaben `%TEMP%/paket-c-C6-*.log` gelesen.
**Entscheidung:** C7-Wortlaut vorab im Chat gezeigt und Z4 freigegeben:
Karten „schon einmal gewusst“, Lektionen „einmal geschafft“. Nur Wörter,
Regeln unverändert; Gegenprobe C7 b60abf4 rot.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C5 einzeln abgenommen, C6 Gegenprobe

**Geändert:** Nie gelernt/Pause/aktiv anhand Protokoll und erster Bewertung
unterschieden. Pausensatz und Runde starten; vorhandene Lernregeln unverändert.
C6-Gegenprobe b60abf4 rot: große Null bei neuen Karten.
**Prüfung:** C5 in 16 Zuständen mit Pause30/100, bewerteten Karten ohne
Protokoll und echtem Anfang grün; Knopf startet Runde. Wochenkopf,
Fortschritt leer/eine/voll, Sprung, Kontrast (0 Funde), a11y grün.
Rundenabnahme **13/13 grün**, vollständige 13 Protokolle gelesen, Quellstand
`7e600022291915aa649c91827f1e92ecbafec125eb812b8de500f4f6c6447f55`.
Logs `%TEMP%/paket-c-C5-*.log` und gleichnamiger Quellstandordner unter
`%TEMP%/adrabic-pruefstand-gesamt/`.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C4 einzeln abgenommen, C5 Gegenprobe

**Geändert:** Hauptkopf „Fortschritt“, Lektionen-Zeile mit Bereichsnamen.
Globale Zahlen unverändert. Gegenprobe C5 rot: Pausensatz fehlt nach 30 Tagen.
**Prüfung:** C4 in 16 Zuständen und nach Bereichwechsel grün; Fortschritt
leer/eine/voll, Sprung, Kontrast (0 Funde), a11y grün. Vollständige Ausgaben
unter `%TEMP%/paket-c-C4-*.log` gelesen.
**Entscheidung:** C5-Wortlaut vor dem Bau im Chat gezeigt: „Dein bisheriger
Fortschritt bleibt. Starte mit einer Runde wieder ein.“ Knopf „Runde starten“.
Unterscheidung nie/Pause anhand gesamtem Protokoll und erster Bewertung.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C3 einzeln abgenommen, C4 Gegenprobe

**Geändert:** Quran-Zierziffer aus dem Stoffzähler entfernt, dazu die
unbenutzten Ziffern-CSS-Regeln. C4-Gegenprobe b60abf4 rot: Bereichspille im
Fortschritt sichtbar, obwohl die Zahlen alle Bereiche umfassen.
**Prüfung:** C3 in 16 Zuständen grün, 320px-Foto gelesen; Fortschritt
leer/eine/voll, Sprung, Kontrast (0 Funde), a11y grün. Vollständige Ausgaben
unter `%TEMP%/paket-c-C3-*.log` gelesen. Syntax grün.
**Offen:** Paketabschluss/C1 unverändert offen, kein Commit/Deploy.

### 2026-10-02 — C2 einzeln abgenommen, C3 Gegenprobe

**Geändert:** Antwortzahl als kleine sachliche Zeile; Vergleichspille entfernt.
Wochenkopf-Test prüft weiterhin alle Zustände, jetzt ohne Vergleich und mit
exakter Antwortsumme. C3-Gegenprobe gegen b60abf4 zeigt die Zierziffer rot.
**Prüfung:** C2 in 12 Zuständen grün; `t_wochen_kopf`, `t_fortschritt`,
`t_sprung`, `t_kontrast` (0 Funde) und `t_a11y` grün. Vollständige Ausgaben
gelesen, gesichert unter `%TEMP%/paket-c-C2-*.log`.
**Offen:** Paketabschluss bleibt offen; C1 zurück, kein Commit/Deploy.

### 2026-10-02 — Paket C begonnen, C1 zurück, C2 Gegenprobe

**Geändert:** Zwei neue Tests unter `plan/werkzeuge/pruefstand/`:
`t_paket_c.js` (C1) und `t_paket_c_fort.js` (C2), feste Gegenprobe b60abf4.
Produktdateien nach den C1-Versuchen wieder unverändert.
**Entscheidung:** Nur C ohne Z1-Umbau. Start sauber auf main, Pull aktuell,
Syntax/Stand grün, BatteryStatus=2. C1-Gegenprobe zeigt Fokus ohne
preventScroll. Zwei Versuche scheitern an der Identität des Wortfelds nach
Hinzufügen; gemäß §6 zurück. Eigene Änderungen vollständig als
`%TEMP%/paket-c-C1-versuch.patch` gesichert, dann nur diese zurückgenommen.
Kein fremder Arbeitsstand vorhanden oder verworfen. C2-Gegenprobe rot:
trend-pill weiterhin vorhanden. Unterbrechung durch Betreiber, danach
unveränderte Testdateien erhalten und fortgesetzt.
**Offen:** C1-Abnahme rot, kein Paketabschluss/Commit möglich. C9/C10 gehören
laut Hinweis zum ausgeschlossenen Umbau; C16 laut Dopplungsliste nach D;
C18 laut Befund erst nach dem Text-Probelauf. Keine anderen Pakete begonnen.
**Nächster Schritt:** C2 und weitere freigegebene C-Zeilen der Reihe nach.


### 2026-10-02 — Paket B fertig, 3.18.12; kein Deploy

**Geändert:** B6 zuerst behoben; B1–B13 des vorhandenen Arbeitsstands
vollständig erhalten und abgenommen. Aufgaben auf erledigt (3.18.12),
STAND/PLAN/Changelog nachgezogen. Eigene temporäre Prüfhilfen nach
%TEMP%/paket-b-pruefhilfen gesichert und aus scratchpad entfernt.
**Entscheidung:** Nur Paket B. Netzteil BatteryStatus=2 vor Fortsetzung,
Tempo und Abschluss; HEAD/origin/main vor Commit unverändert 07c7568.
Commit/Push direkt auf main, keine Veröffentlichung. Vorhandene Änderungen
an Modellhinweisen/Dokumentation mit erhalten; keine weiteren Pakete begonnen.

**Prüfung:** Gesamtlauf mit identischem Fingerprint
afc7570ffdcd75c0edfe8be7a08d7f67a09755d85bcf3b4308ff7eb3993d416d
einschließlich gezieltem Nachlauf **131/131 grün**, alle vollständigen
Ausgaben gelesen. Rundenabnahme --fortsetzen **13/13**, gespeicherte
Quell-/Test-Hashes passen; keine unnötige Wiederholung grüner Fälle.
Affe nacheinander, AFFE_TEXTE=1, Seed7: Handy200 **0 Befunde**
(143 Texte-Aktionen), iPad150 **0 Befunde** (126 Texte-Aktionen).
Syntax/Stand/CSP/Cache grün, alle 33 index.html-Querys auf 3.18.12.
B6: 375×667 kurze Schritte im Bild, Runde Unterkante 663,297;
390×844 Hürden ohne Wahl scrollHeight844. G-083 und 192 angrenzende
Zustände grün. Echos dürfen im Dokumentfluss wachsen; kein sticky-Fuß.

**Tempo-Ausreißer belegt:** t_text_tempo zunächst Verwalten203 ms >200.
Original erhalten in %TEMP%/paket-b-fort-text-tempo-rot.log.
x_ab_tempo.js 8 07c7568 am Netzteil, abwechselnd alt/neu:
Verwalten alt130/131/137/148/150/151/153/168 (Median150),
neu112/115/121/137/139/140/156/163 (Median139); jeweils0/8 >200.
Textöffnen alt Median135, neu126; jeweils0/8 >200.
Keine belegte Paket-B-Verschlechterung. Nachlauf unverändert maximal170 ms,
Exit0; Grenze200 unverändert. Kein Tempo-Code außerhalb B geändert.
Einstieg CPU4× vollständig bis „Dein Plan steht“ auf 375/390/820:
maximale Longtasks145/174/130 ms, maximale Bildabstände159,3/175,1/122 ms.
Das sind messbare Pausen; vollständige Ruckelfreiheit nicht behauptet.
Auch die beschreibenden übrigen Tempo-Ausgaben enthalten kurze Blockaden.

**Gegenprüfung (§ 2a):** Produktdiff vollständig gegen EIN-1–12 und Z18
gelesen, dazu t_paket_b.js und feste Alt-Gegenproben07c7568.
B1 Frischkonto-Merker am Auth-Wechsel zurückgesetzt, Bestand weiter leer;
B2 Untertitel hält Kartenlage; B3 Breite420 hoch/quer stabil;
B4 frühe Rückkehr behält fertigen Plan; B5 Abbruch entfernt RAF/Listener,
Normalfahrt bleibt, Formularrückweg ohne Fahrt; B6 echte Viewports,
Schriften/Bilddurchlauf abgewartet, strikte Grenze statt gelockerter Toleranz;
B7 Fuß von Eintrittsbewegung ausgenommen, echte Klick-Bildmessung;
B8 Timer prüft denselben Boot-Knoten und rendert aktuellen Zustand;
B9/Z15 Doppelung weg, Dauer6720 ms erhalten; B10/Z16 nur direktes Formular,
Bestätigung unverändert; B11 frischer Start löscht nur Antwortenschlüssel;
B12 Kommentare/Dauer passen; B13/Z18 wiederverwendete kleine Leiste,
Anfangsstand ohne Zielhaken, neue Zahl oder Speicherung.
Neue Rückkehr-/Timerpfade gegen Fehler/Kontowechsel/Abbruch gelesen,
Pflichtregressionen/Fehlerformulare grün. Keine neue Abweichung vom Auftrag.
Fotos375-Willkommen/Runde,390-Hürden,820-Runde sowie Formular/Plan
visuell gelesen: keine Überlagerung; lange Inhalte bleiben scrollbar.
Keine Lernlogik, religiösen Texte, Cloud-Felder, Regeln oder Rechtstexte geändert.
D10 ist derselbe Scrollbefund wie B5; Paket D bleibt hier unbearbeitet.

**LEHREN §14, Punkt für Punkt:**
1 Codepfade/Diff gelesen; 2 Muster im Repo gesucht; 3 Texte/Kommentare
nachgezogen; 4 vorhandene Bauteile/Handlungen, kein neuer persistenter Speicher;
5 Merker im bestehenden UI-Zustand bzw. Konto-Ladezustand;
6 Breiten/Themen/reduzierte Bewegung, Sprung/Kontrast und CPU4× gemessen,
Pausen ausdrücklich beziffert; 7 Wortlaut/Mehrzahl geprüft, keine Methoden-Zahl;
8 keine neuen Cloud-Felder oder Regeländerung; 9 kein neuer persistenter
Datenfluss, Datenschutzerklärung unverändert; 10 Syntax grün;
11 Version/Cache/33 Querys/Changelog/CSP grün; 12 Tests131/131,
Runde13/13 und Affe0/0; 13 Logbuch/STAND/PLAN/Aufgaben nachgezogen;
14 Gerätepunkt mit konkreten Schritten dokumentiert, kein Deploy beauftragt.

**Offen:** Kein weiterer Paket-B-Codepunkt. Echtes iOS/Gefühl/E-Mail-Zustellung
nicht durch Chromium bestätigt. Nach einer späteren Betreiber-Veröffentlichung:
Gaststart in installierter iPhone-App öffnen (weicher Boot-Übergang),
Einstieg bis „Runde“ durchgehen (auf SE Hauptknopf sichtbar), auf fertigem
Plan während der Fahrt nach oben wischen (Position bleibt beim Finger),
Formular → Anmeldung → Registrierung → Zurück (derselbe Plan erhalten).
Version/Bilder beim Gerätetest festhalten. Bekannte übrige Pakete und offene
Betreiberentscheidungen bleiben offen; nichts davon vorgezogen.
Regeln aus Paket A weiterhin vor einer späteren Hosting-Veröffentlichung
einspielen lassen (ladegeraet übernimmt das). Hier kein Deploy.
**Logs:** %TEMP%/adrabic-pruefstand-gesamt/afc7570ffdcd75c0;
%TEMP%/paket-b-fort-{gesamt-nachlauf,tempo-ab,einstieg-tempo,affe-handy,affe-ipad}.log;
Einzel-/Alt-/Umfeldlogs in den vorherigen Einträgen. Bilder unter
%TEMP%/adrabic-pruefbilder/paket-b-*.png.
**Nächster Schritt:** Paket B auf main committen/pushen, dann anhalten.
Ein neues Paket braucht einen neuen Auftrag. Nicht veröffentlichen.

### 2026-10-02 — Netzteil bestätigt, Paket-B-Abschluss fortgesetzt

**Geändert:** Produktstand unverändert, alle uncommittierten Änderungen behalten.
**Entscheidung:** Betreiber meldet „netzteil ist dran“; BatteryStatus=2.
Server8099 und Firestore-Emulator8081 wieder gestartet. Gesamtlauf
--fortsetzen bestätigt denselben Fingerprint afc7570ffdcd75c0 und bewahrt
73 grüne Tests; die restlichen 58 laufen frisch.
**Offen:** Restlauf, CPU-4×, Affe, Schlussprüfung und Commit/Push.
**Nächster Schritt:** Nur Paket B abschließen, keine Veröffentlichung.

### 2026-10-02 — Paket B gebaut, Abschluss wartet auf Netzteil

**Geändert:** Keine weitere Produktänderung. Uncommittierten Stand erhalten;
B6 behoben, alle 13 Einzelabnahmen grün, Version 3.18.12 vorbereitet.
**Entscheidung:** Nach Unterbrechung keine laufenden Prüfdienste mehr.
Netzteilprüfung liefert BatteryStatus=1, Ladestand 93 %. Deshalb nach
CODEX-START § 5.4 keinen weiteren Gesamtlauf/Tempo-Test/Commit auf Akku.
Betreiber hat GPT-6.1 gewählt und sparsames Vorgehen gewünscht.
**Prüfung:** 73/131 Gesamttests am identischen Fingerprint
afc7570ffdcd75c0edfe8be7a08d7f67a09755d85bcf3b4308ff7eb3993d416d
mit Exit 0 gespeichert, keine gespeicherten roten Tests. Alle 73 Ausgaben
vollständig gelesen, zuletzt t_leiste.js. Bereits grüne Fälle per
--fortsetzen behalten; kein vollständiger Gesamterfolg behauptet.
Produktdiff/Tests erneut gegen EIN-1–12 und Z15/Z16/Z18 gelesen:
Frischkonto-Merker beim Auth-Wechsel zurückgesetzt, Rückplan erhalten,
Boot-Timer an seinen Knoten gebunden, Scroll-Abbruch und Dauer passend,
B6 echte Viewports/Schriftbereitschaft, strikte Unterkante ohne Toleranz.
Keine zusätzlichen Paketänderungen nötig; Gerätegefühl bleibt ungeprüft.
**Offen:** Restliche 58 Tests, CPU-4×-Einstiegsmessung und Bilder
(scratchpad/b-tempo.cjs vorbereitet), Affe Handy200/iPad150 mit Texten,
Rundenabnahme --fortsetzen, abschließende LEHREN-Checkliste, Status/Commit/Push.
Logs: %TEMP%/adrabic-pruefstand-gesamt/afc7570ffdcd75c0.
Eigene scratchpad-Hilfen vor Commit entfernen; keine vorhandenen Dateien löschen.
**Nächster Schritt:** Betreiber schreibt „Netzteil dran“. Dann BatteryStatus=2
prüfen, Server8099/Firestore-Emulator8081 starten und denselben Lauf fortsetzen.
Kein anderes Paket, keine Veröffentlichung.

### 2026-10-02 — Paket-B-Prüflauf nach Nutzungslimit fortgesetzt

**Geändert:** Keine Produktänderung seit Fingerprint afc7570ffdcd75c0.
**Entscheidung:** Unterbrechung beendete Server, Emulator und Prüfprozess.
Lokale Dienste wieder gestartet, danach alle_pruefen.js --fortsetzen:
elf erfolgreiche Tests mit identischen Quell-/Test-Hashes bewahrt, die
fehlenden laufen frisch. BatteryStatus=2. Betreiber wünscht sparsames
Vorgehen; keine unnötigen Wiederholungen, vorgeschriebene Abnahmen bleiben.
**Offen:** Gesamtlauf, dessen Auswertung und Paketabschluss laufen noch.
**Nächster Schritt:** Paket B abschließen, kein anderes Paket, kein Deploy.

### 2026-10-01 — Paket B fortgesetzt, B6 abgenommen; Gesamtlauf läuft

**Geändert:** Vorhandenen uncommittierten Stand vollständig erhalten.
B6 in styles.css: Fußpadding 16 px, unter 761 px 12 px und leeren
Konto-Link-Platz einschließlich Flex-Abstand ausblenden. Der echte Link
auf Willkommen bleibt. t_paket_b.js wartet bei B6 auf Schrift/Bilddurchlauf,
Unterkante auf 375 px wird strikt <= Fensterhöhe geprüft. Paketversion
3.18.12 in app.js, sw.js, allen 33 index.html-Querys und CHANGELOG.
**Entscheidung:** Betreiber beauftragt ausdrücklich B6/Status zurück und
Abschluss des vorhandenen Pakets. Deshalb kein Verwerfen und kein Pull
über den Arbeitsstand; fetch bestätigt HEAD = origin/main = 07c7568.
Netzteil zweimal BatteryStatus=2. Keine Veröffentlichung.
**Abnahme B6:** Fester Vorstand 07c7568 mit zwei echten Befunden rot,
neuer Stand auf 320/360/375/390/820 grün. 375×667 Unterkanten für
Willkommen/Ziel/Karte/Schrift/Runde: 628,938/607,672/635,484/607,672/663,297.
390×844 Hürden: scrollHeight = innerHeight = 844; Knopflage wie die kurzen
Schritte (0,203 px Rundung). 192 angrenzende Zustände (390/320/iPad,
hell/dunkel, ruhig/bewegt, 0–7 leer/voll) ohne Überlagerung, Querscrollen
oder Seitenfehler. G-039/040/041/044/083 samt festen Gegenproben grün.
Logs: %TEMP%/paket-b-fort-{B6-alt,umfeld,g083}.log.
**Offen:** Gesamtlauf 131 Tests gestartet mit Fingerprint
afc7570ffdcd75c0edfe8be7a08d7f67a09755d85bcf3b4308ff7eb3993d416d
unter %TEMP%/adrabic-pruefstand-gesamt/afc7570ffdcd75c0.
Danach Ausgaben lesen, Affe Handy200/iPad150, Gegenprüfung und Commit/Push.
Kein anderes Paket beginnen. Gerätebestätigung bleibt von Chromium getrennt.
**Nächster Schritt:** Lauf vollständig auswerten und Paket B abschließen.

### 2026-10-01 — Modellhinweise um GPT-6.1 Sol aktualisiert

**Geändert:** Auf Betreiberhinweis die Sol-Empfehlungen in CODEX-START
(Starttexte, Pakettabelle, Faustregel) und grossplan/AUFTRAG auf GPT-6.1 Sol
umgestellt; Kürzel in AUFGABEN für offene/fortzusetzende Aufgaben definiert.
**Entscheidung:** Neue Sol-Arbeit mit GPT-6.1 Sol; Astra/Luna und Denkstufen
beibehalten. Historische Berichte nicht umgeschrieben. Quelle geprüft:
[OpenAI-Modellbeschreibung](https://developers.openai.com/api/docs/models/gpt-6.1-sol).
**Offen:** Paket B weiterhin uncommittiert bei B6 angehalten, siehe unten.
Keine Produktänderung, keine neue Paketabnahme, kein Commit/Push/Deploy.
**Nächster Schritt:** B6 wie im folgenden Eintrag nachholen.
**Prüfung:** Modellverweise und Dokumentdiff gelesen, git diff --check grün;
für diese reine Planänderung keine Produktprüfungen wiederholt.

### 2026-10-01 — Paket B angehalten bei B6, uncommittiert; Ausgang 07c7568 / 3.18.11

**Geändert:** Nur Paket B: Nachklang, Probekartenhöhe, iPad-Fußbreite,
Plan-Rückweg, Scroll-Abbruch, Knopfbewegung, Gast-Boot, doppelte Aufbauzeilen,
direkter Formularrahmen, frischer Antwortenspeicher, Kommentare/Scroll-Dauer,
kleine Stand-Leiste. t_paket_b.js mit festen Gegenproben gegen 07c7568.
**Entscheidung:** Sauberer main, Pull aktuell, Syntax/Stand grün; lokaler
Server 8099 und geprüfter Chrome starten. BatteryStatus=2.
B1-Gegenprobe rot: Nachklang fehlt nach neuer Registrierung.
Neue Abnahme grün: Satz nach 3,5 s sichtbar, erste Karte löscht ihn;
Bestandskonto löscht beide Schlüssel. G-042-Bestandsregression grün.
**Offen:** B6 nach zwei gescheiterten Änderungen zurück. B1–B5/B7–B13
haben grüne Einzelabnahmen und bleiben wegen fehlendem Paketabschluss
`in Arbeit`, nicht als veröffentlichte/committierte Version erledigt.
Gesamtlauf 131 Tests, Affe Handy 200/iPad 150, CPU-4×-Prüfung und neue
Paketversion vor Commit/Push ausstehend. Diese Schritte wurden wegen der
weiter roten B6-Abnahme nicht als grüne Paketabnahme ausgegeben.
Keine Veröffentlichung, kein Commit/Push, Version weiterhin 3.18.11.
**Nächster Schritt:** In neuem Chat (Astra mittel empfohlen) B6/Status
zurück nachholen, alle vorhandenen Änderungen behalten. Danach Paket B
gemäß CODEX-START § 5 abschließen. Kein anderes Paket beginnen.

B13/Z18: einstiegLeiste wiederverwendet, klein auf dem fertigen Plan;
Anfangsstand neu, spätere Punkte ungefüllt, kein erreichter Zielhaken.
Keine Zahl und keine neue Speicherung (localStorage vor/nach identisch).
Zwölf Konfigurationen 390/320/iPad, tatsächlich hell/dunkel, ruhig/bewegt,
einschließlich sichtbarer Leiste/Kontrast/Seitenfehler grün. Fotos von
Formular und Plan hell/dunkel visuell gelesen (keine Überlagerung).
Umfeld/Pflichtregressionen grün (B13-*.log).

**Gegenprüfung:** Gesamten Produktdiff gegen EIN-1 bis EIN-12 und Z18 gelesen.
Neue frühe Rückkehr in mode-register erhält den Rückplan; Boot-Timer prüft
denselben Knoten und rendert den dann aktuellen Zustand. Frischkonto-Merker
wird beim Auth-Wechsel gelöscht; Bestandskonto-Caches werden weiter geleert.
Scroll-Abbruch entfernt Listener/RAF, Rückweg startet keine neue Fahrt.
Z15 erhält Dauer trotz kürzerer Liste; Z16 betrifft nur das direkte Formular.
Z18 zeigt Anfang statt gelernter Karten. Keine Änderung an Lernlogik,
religiösem Wortlaut, Cloud-Feldern, Regeln oder Rechtstexten.
Tests gegen den Befund gelesen: Themenquelle korrigiert; B7 zusätzlich mit
echtem Weiter-Klick statt neuem Fixture. Fester Vorstand zeigt x=38→12,
Deckkraft 0,6→1; die neue Abnahme verlangt jedes Bild x=12/Deckkraft 1.
B6-Abnahme bleibt ausdrücklich rot; keine Testgrenze gelockert.

**LEHREN § 14, Punkt für Punkt (kein Commit):**
1 Codepfade gelesen; 2 Muster im Repo gesucht; 3 betroffene Kommentare
korrigiert; 4 vorhandene Handlungen/Bauteile, kein neuer persistenter Speicher;
5 UI-Merker im bestehenden Zustand; 6 Breiten/Themen/reduzierte Bewegung,
Sprung/Kontrast gemessen, CPU 4× noch vor Paketabschluss nötig;
7 vorhandener Wortlaut, keine neue Methoden-Zahl; 8 keine neuen Cloud-Felder;
9 kein neuer persistenter Datenfluss; 10 Syntax grün; 11 bisherige Version
konsistent, neue Paketversion ausstehend; 12 Einzel-/Pflichttests grün außer
B6, Paketgesamtlauf/Affe ausstehend; 13 Logbuch/Stand/Plan nachgezogen;
14 Betreiber bekommt den nächsten Starttext und den Anhaltegrund.

**Endstand-Prüfungen:** Alle 13 festen Gegenproben rot wie erwartet.
Aktuelle B-Abnahmen: zwölf grün, nur B6 rot (375-Runde 675,297 >667,
390-Hürden scrollHeight 852 >844). G-039/040/041/044/083 und G-042
mit ihren festen Gegenproben erneut grün; Syntax/Versions-/CSP-Prüfung grün.
Logs: %TEMP%/paket-b-final-{abnahmen,gegenproben,g083,bestand}.log;
nach B7-Testschärfung zusätzlich paket-b-end-{abnahmen,B7-alt}.log.

B12/EIN-12: Veraltete Aussagen zu Überspringen, Hero-Drehung, sticky-Fuß,
Kartenbauteil, Ringdauer und zweimaligem Haken korrigiert. Aufbau-Scroll
nutzt einstiegBauDauerFuer statt fest sechs Punkten; scrollY erst im RAF,
alter ui.einstiegBauScrollStartTop vollständig entfernt. Text-Gegenprobe
rot; Textabnahme, B5-Scrollregression, Umfeld und Pflichtregressionen grün
(B12-*.log). Übriges position:sticky betrifft Verwalten, nicht den Einstieg.

B11/EIN-11: Beim frischen render()-Start auf Bildschirm 0 nur den
Antwortenschlüssel entfernen. Keine Nachklang-Zeitgrenze eingebaut.
Feste Gegenprobe rot, Schriftwahl und Neuladen mit anschließendem null
grün; Umfeld und Pflichtregressionen grün (B11-*.log).

B10/EIN-10/Z16: einstiegKopf mit Rückaktion/Name wiederverwendet, direktes
Registrierungsformular in derselben solo/einstieg-Struktur; separate Zählung
entfällt nur dort. Bestätigung nicht angefasst. Feste erweiterte Gegenprobe
07c7568 rot (Formularkopf fehlt). Aktuell alle zwölf Konfigurationen:
390/320 Kopf x=12 y=28, iPad x=70 y=28 vor/nach, auch nach leeren
Pflichtfeldern und Rückweg. Umfeld/Pflichtregressionen/t_konto grün
(B10-*.log). Rahmen bleibt auch bei Neuzeichnen nach Feldfehler erhalten.

B9/EIN-9/Z15: Je erster Hürde schrift/zeit/dran die doppelte feste Zeile
weggelassen, übrige Hürden behalten alle festen Zeilen. Keine neuen Texte.
Z15-Dauer explizit erhalten: 6720 ms vor/nach Wegfall, Ring/Timer verwenden
dieselbe Dauerfunktion. Gegenprobe rot, Abnahme/192 Zustände/Pflichtregressionen
grün (B9-*.log). B12 zieht den noch fest auf sechs gerechneten Scroll-Zweig nach.

B7/EIN-7: Eintritt auf direkte Inhaltskinder begrenzt, Fuß ausgeschlossen.
Gegenprobe 07c7568 rot; 20 Bilder nach Schrittwechsel x=12 und Deckkraft=1.
192 Zustände mit tatsächlich geprüftem Thema, Pflichtregressionen grün.
B8/EIN-8: vorhandenes Boot auch beim Gast ausblenden, 300 ms ohne Mindesthalt;
Timer prüft denselben DOM-Knoten und zeichnet den aktuellen Zustand.
Feste Gegenprobe rot, aktuelle Folge boot/boot--exit/Einstieg grün.
Umfeld, t_sprung/t_kontrast/t_a11y, t_boot_geometrie und t_einstieg grün
(B7-/B8-*.log). t_einstieg beschreibt bestehende Echo-Verschiebungen:
Hürden Handy 39 px, kleines Handy Ziel 4 px; kein Kontrast-/Quer-/Seitenfund.

B6/EIN-6 zurück nach zwei Änderungsversuchen (§ 6). Versuch 1:
Leerplatz unter 760 px entfernt, Fußpadding space-4; auf 375×667 Runde
675,297 px, auf 390×844 Hürden scrollHeight 852. Diagnose belegt:
Leerplatz tatsächlich 0, Padding 16; die Abnahme bleibt rot.
Versuch 2: derselbe Padding-Weg mit space-2 (8 px): Runde 667,297 px,
Hürden weiter 852 statt 844. Kein dritter Versuch; nur die beiden
B6-Änderungen zurückgenommen, B2/B3 vollständig erhalten. Neuer
scharfer B6-Test bleibt bestehen, keine Grenze gelockert oder übersprungen.
Logs: %TEMP%/paket-b-B6-B6.log, B6-diagnose.log, B6-neu-B6.log.
Paket wird mit B7 fortgesetzt; wegen offener roter B6-Abnahme kein Commit.

**Korrektur Umfeld-Messung B2–B5:** Der neue Gast-Test übergab thema wie
ein Kontotest an fullerStore; Gäste lesen jedoch die lokale Wahl. Die mit
hell beschrifteten Fälle waren deshalb ebenfalls dunkel. Die Zahlen
192 Zustände waren richtig, die Themenabdeckung war nicht belegt. Test
setzt nun adrabic-thema und verlangt data-thema === thema. Betroffene
Umfeld-Abnahmen werden frisch wiederholt; vorhandene t_kontrast-Läufe
prüften reale Kontothemen und bleiben davon getrennt. Keine alte
hell/dunkel-Behauptung als aktuelle Abnahme verwenden.

B5/EIN-5/R15-119 (D10-Dopplung): Eingabe-Abbruch für beide Scroll-Schleifen,
Listener bei Ende/Abbruch entfernt; Formular-Rückweg startet die Fahrt nicht
erneut. Gegenprobe 07c7568: wheel lässt Aufbau-RAF weiterlaufen, fertiger
Plan zieht nach Eingabe auf 259 px. Neue Abnahme wheel/touchstart/keydown,
echtes Mausrad, Normalfahrt bis unten und Rückweg oben grün. 192 angrenzende
Zustände und t_sprung/t_kontrast/t_a11y grün. Keine Dauer/Kurve verändert.

B4/EIN-4: mode-register erhält den fertigen EinstiegZurueck-Plan und
wechselt nur zum Registrierungsformular. Feste Gegenprobe 07c7568 zeigt
Ziel-Neustart statt Plan speichern; neue Abnahme Formular/Rückweg/Antworten
grün. 192 angrenzende Zustände und t_sprung/t_kontrast/t_a11y grün.
Neuer Paket-Test unterbindet Worker-Registrierung, damit feste Quellen
auch nach Neuladen gelten; echte Worker bleiben separat geprüft.

B3/EIN-3: CSS-Fußbreite 100%, weiterhin max. 420 px. Feste Gegenprobe:
97–246 px auf iPad; aktuelle Abnahme 0–7 auf 820/1180 px jeweils 420 px,
links 200/380 px, Auswahl ändert Breite/Lage nicht. 192 angrenzende
Zustände und t_sprung/t_kontrast/t_a11y grün (B3-*.log).

B2/EIN-2: feste Gegenprobe 07c7568 zeigt bei vergessen auf 320/360/390
jeweils -24,703125 px, keine/iPad unverändert. Untertitel reserviert jetzt
zwei Zeilen nur für vergessen; Abnahme auf 320/360/390/820 jeweils 0 px.
Bestehende G-039/040/041/044/083-Abnahme samt 5ad0a11-Gegenprobe grün;
t_sprung (alle vier Geräte), t_kontrast (0 Funde), t_a11y grün.
Angrenzende 390/320/iPad, hell/dunkel, ruhig/bewegt, leer/voll laufen.
Nachlauf: alle 12 Konfigurationen, jeweils 0–7 leer/voll (192 Zustände),
ohne Querscrollen, Überlagerung oder Seitenfehler grün (B2-umfeld.log).
Eigener Prüfaufbau B4/B10: Fixture zeichnete den Plan unmittelbar vor
Plan speichern; echte 400-ms-Sperre ignorierte den Tipp. Jetzt 450 ms
abgewartet. Korrigierte feste Gegenprobe B4 endet tatsächlich bei Ziel,
B10 zeigt das fehlende Kopf-Markup auf dem Formular, beide rot.

### 2026-10-01 — Paket A fertig am Netzteil, 3.18.11, nicht veröffentlicht

**Geändert:** Vorhandenen uncommitteten Paket-A-Stand vollständig fortgesetzt,
A7/A13 bereits zuerst nachgeholt. Paket-Version 3.18.11 aus dem Zwischenstand
beibehalten: app.js:19, sw.js:10, alle 33 index.html-Querys einschließlich
31 Startbildern, CHANGELOG oben. In dieser Netzteil-Fortsetzung keine weitere
Produktionsänderung; t_text_felder.js auf berechtigtes Betreiber-Fixture und
erneute echte Einwilligung nach dem absichtlichen Leeren des Stores angepasst.
Alle bisherigen Feld-/Mengen-/Verweisprüfungen und fünf Wege erhalten.
AUFGABEN A1–A13 erledigt, STAND/PLAN/KONSOLE K10 nachgezogen; eigene
Prüfaufbau- und Diagnosefehler in LEHREN. Nur Paket A, kein neues Paket.

**Entscheidung:** Betreiber hat Netzteil angeschlossen und damit gemäß neuer
AGENTS-Anweisung den Abschluss einschließlich Commit/Push auf main beauftragt.
BatteryStatus 2 vor Gesamtlauf, währenddessen und vor Abschluss gemessen.
Kein Auftrag zum Veröffentlichen; kein ladegeraet-/veroeffentlichen-/Deploy-Aufruf.
Der vorausgegangene Pull auf 90d7aaa betraf nur AGENTS.md und erhielt den
Zwischenstand per Autostash b2dea40; Produktstand seitdem identisch.
Vor dem Commit nochmals Remote geprüft: 76d10d3 enthält ausschließlich
die neue Z10-Entscheidung für ein späteres Paket. Diff gelesen, per
git pull --ff-only --autostash übernommen; Autostash 37580c1 erfolgreich
angewendet. Vergleich gegen 37580c1 ohne ENTSCHEIDUNGEN.md leer, alle elf
neuen Dateien erhalten. AGENTS.md danach neu gelesen; Prüfquellstand unverändert.

**Abnahme, alle vollständigen Ausgaben gelesen:**

- Frischer Gesamtlauf alle_pruefen.js: zunächst 128/130; t_text_felder rot,
  weil u1 als normales Konto seit A8 keine Texte importieren darf.
  Das absichtliche Store-Leeren entfernt auch die Einwilligung. Erster
  Betreiber-Fixture-Nachlauf wartete deshalb im echten Einwilligungsdialog;
  abgebrochen, bevor er ein Ergebnis speichern konnte. Jetzt Dialog wirklich
  bestätigt und Importabschluss abgewartet. Fünf Wege grün; Gegenprobe
  --gegenprobe gegen festen 48002ad bleibt auf allen fünf Wegen rot.
  Kein Erwartungswert gelockert, keine Prüfung gelöscht oder übersprungen.
- t_text_tempo zunächst Verwalten 325 ms > 200; unverändert im gezielten
  Nachlauf maximal 158 ms und Exit 0. x_ab_tempo.js 6 c4b1c30 am Netzteil,
  abwechselnd Vorstand/Arbeitsstand: Verwalten alt
  154/220/225/237/301/314 (Median 237), neu 66/214/220/222/244/278
  (Median 222), jeweils 5/6 > 200; Text alt Median 139, neu 143,
  Überschreitungen 1/6 bzw. 0/6. Bestehende Render-Verzögerung bzw.
  Rechnerschwankung belegt, keine neue Paket-A-Regression; keine pauschale
  Ruckelfreiheit behauptet. Kein Tempo-Code außerhalb A geändert.
- alle_pruefen.js --fortsetzen danach **130/130 Exit 0, 0 rot**.
  128 unveränderte grüne Tests nach Quell-/Test-Hash bewahrt, nur die beiden
  auffälligen Tests frisch. Fingerprint
  9899bd6d5bb78fd3e3dc2e04c79f392b4ed185dcc48e036ea9df4bbeb75636b9.
  Alle 130 vollständigen Einzel-Logs gelesen, auch die beschreibenden Ausgaben.
- abnahme_runde.js --fortsetzen: **13/13 grün**, identische Quell-/Test-Hashes
  aus Gesamtlauf. Vollständige Rundenende-/Üben-/Schreiben-Ausgaben gelesen.
  Sprung Lernen/Üben jeweils 0 px auf geprüften Formaten, Kontrast 0 Funde,
  a11y ohne Funde. t_bestand_tempo: sämtliche Bewertungen CPU 4× < 100 ms,
  größter Wert 83 ms; Zeichnen CPU 4× und Scrollen ohne Bilder > 34 ms.
  Beschreibende alte Onboarding-/Tabwechsel-Befunde bleiben anderen Paketen
  zugeordnet; keine vollständige UI-Fehlerfreiheit oder echtes iOS behauptet.
- Affe, AFFE_TEXTE=1, Seed 7, nacheinander: handy 200 Schritte,
  156 Texte-Aktionen, **0 Befunde**; ipad 150 Schritte,
  126 Texte-Aktionen, **0 Befunde**.
- bash plan/werkzeuge/regeln_testen.sh: **210/210 wie erwartet**, Exit 0.
  Komplette 235 Ausgabezeilen gelesen. Git-Bash meldet beim Start den
  POSIX-Pfad /c/... in der Emulator-Konfiguration als nicht existent;
  der Test lädt aber RULES_FILE vollständig mit readFileSync und übergibt
  RULES_TEXT an initializeTestEnvironment (regeln-pruefung.mjs:82–86).
  Die Tests prüfen damit die tatsächlichen Repo-Regeln; erwartete
  Ablehnungen einschließlich einzelner Marker-/Zähler-Manipulationen
  belegt, kein Erfolg gegen erlaubende Ersatzregeln behauptet.
  Emulator danach beendet; keine produktiven Konten/Regeln angefasst.
- node --check app.js / sw.js / t_text_felder.js, pruefe_stand.mjs und
  git diff --check grün; CSP aller HTML-Seiten und APP_SHELL geprüft.

**Gegenprüfung § 2a (Diff und Befunde, nicht nur Bericht):**

- A1/G-110: Dialog bindet ursprünglichen Auth-Auftrag vor dem Await;
  App- und SDK-Kontowechsel blockieren fremdes Löschen/Abmelden.
- A2/G-107: sämtliche Auth-Fortsetzungen, Fehlerpfade und frühe Rückkehr
  gegen Auftrag geprüft; Normalfälle, eigene Löschung 0/25 ms und A→B→A grün.
- A3/G-108: private Karten-/Feedback-Entwürfe, Auswahl und Zeichnung
  beim Wechsel geleert; keine Daten von A in B.
- A4/G-111: Nachtrag nur für eigene Registrierung; neuer Versuch kann normal
  Profil/Mail abschließen. A→B→A schützt fremde Antworten.
- A5/G-109: Inventar fordert nichtleere sichtbare Zustände, echtes Rundenende
  und vollständiges Onboarding bis Plan speichern; Gegenprobe c4b1c30 zeigt
  den alten falschen Exit 0. Wrapper-Hash umfasst verwendete Hilfsproben.
- A6/DATEN-1: Marker create/delete nur mit passender atomarer Zähleränderung,
  eigener Marker unter fehlendem Eltern-Dokument löschbar. Kontolöschung
  zieht eigene Stimmen auch von entfernten Ideen ab, fremde Marker bleiben;
  echte SDK-Probe plus sechs neue Regel-Angriffs-/Normalfälle.
- A7/DATEN-3: laufender HTML-Cache nur bei gleicher exakter App-Version;
  Quote verhindert Versionspräfix-Verwechslung. Echte HTTP-/Worker-Probe:
  Normal-/Abbruch-Update, Offline-Start unter / und index.html grün.
  Gleichversionige HTML-Korrektur weiterhin cachebar.
- A8/DATEN-4: Textimport nur Betreiber mit vorhandener/erneuter Zustimmung;
  Zustimmung vor Write, Ursprung nach Await geprüft, geteilte Sätze
  ausgeschlossen. Kartenimport bleibt möglich. Aktueller Sperrtest und
  feste c4b1c30-Gegenprobe sowie unveränderte Feldprüfung grün.
- A9/DATEN-5: genau 15 Original-Restzeilen aus 4462fac gesichert, R15-Präfix
  verhindert Kollision; aktueller Codepfad nachgelesen, kein neuer
  Laufzeitnachweis oder zusätzlicher Bauauftrag daraus behauptet.
- A10/DATEN-2: Dialog und Banner nennen dieselbe Handlung für erneuerte
  Anmeldung bzw. dauerhafte Ablehnung; kein falsches automatisches Retry.
- A11/DATEN-6: Offline-Sperre in UI und Funktion, bestehendes Zeitlimit 12 s,
  Entwurf erhalten, verspäteter Erfolg ohne alte UI-Wirkung. 24 angrenzende
  Formular-Konfigurationen grün. Backend-Write selbst bleibt unabbrüchlich.
- A12/DATEN-7: alle vier Settings-Aufrufer als Einzelpatch; nach
  permission-denied nur bei bekannten Settings-Keys und tatsächlichem Altfeld
  einmal serverbasierte bereinigende Transaktion, Ursprung geprüft.
  Zwei Offline-Geräte bewahren aktuelle Fremdwerte; ohne Altfeld kein
  Ganz-Schreiben. Echte SDK- und Kontowechsel-Abnahmen grün.
- A13/DATEN-8: beide Rechtsseiten im Zusatzcache, online Netz zuerst,
  App-Index-Rückfall ausschließlich root/index relativ zum Worker.
  Beide Seiten vor erstem Besuch offline, beim ersten Online-Aufruf frisch;
  unbekannte Pfade ohne App-Fallback. Wortlaut unverändert.

**LEHREN § 14, Punkt für Punkt:**

1. Vollständiger Produktions-Diff, relevante Codepfade und Testquellen gelesen;
   zusätzliche Fixture-Änderung samt Erwartungswerten separat gelesen.
2. Auth-/Settings-/Import-/Stimm-Marker-/SW-Muster im ganzen Repo gesucht.
3. Betroffene Speicher-/Regel-Kommentare, Handlungstexte und CHANGELOG passend.
4. Kein neues Blatt/Cloud-Feld/Storage-Key; Rechtsseiten in zentralem Cache.
5. Bestehende ui-/Draft-Zustände genutzt, keine neue DOM-Zustandsquelle.
6. Angrenzende Formate 320/390/iPad, hell/dunkel, normal/reduziert, leer/voll
   gezielt grün; Sprung/Kontrast/CPU-Messungen wie oben, bekannte Verzögerung
   explizit eingeordnet. Echtes iPhone bleibt Geräteprüfung.
7. Meldungen in Worten mit Handlung, kein Systemcode/Methodenwert ergänzt.
8. Keine neuen Cloud-Felder; geänderte Regeln 210/210; K10 enthält
   Veröffentlichungsschritt mit Wo/Was/Woran, bleibt offen.
9. Bestehende Datenflüsse eingeschränkt, keine neue Datenart; DSE weiterhin
   zutreffend, Rechts-/religiöse Texte nicht verändert.
10. Syntax App und SW grün.
11. Eine Version 3.18.11 an vier Stellen, alle 33 Querys und CHANGELOG;
    pruefe_stand.mjs einschließlich CSP/APP_SHELL grün.
12. Betroffene Abnahmen, alle 130 Tests, 13 Runde und beide Affenläufe grün;
    vollständige Ausgaben/Gegenproben gelesen, keine Grenze gelockert.
13. AUFGABEN, LOGBUCH, STAND, PLAN/KONSOLE aktualisiert; eigene Fehler
    samt Ursache/Regel in LEHREN dokumentiert.
14. Betreiber-Schritt nur für späteres Veröffentlichen benennen:
    Regeln vor Hosting über ladegeraet.bat, aktuell kein Deploy-Auftrag.

**Kriterien:** K1–K6 aus grossplan/AUFTRAG § 3.1 für Paket A erfüllt;
A1 auf dieses Paket begrenzt erfüllt, A2 unverändert (keine offene
Entscheidung gebaut), A3 Regel-Schritt dokumentiert, A4 Paket-Prüfungen grün.
A5/A6 Gesamt-Nachprüfung gehören erst nach allen Paketen, hier nicht behauptet.

**Logs:** %TEMP%/adrabic-pruefstand-gesamt/9899bd6d5bb78fd3/*.log und stand.json;
%TEMP%/paket-a-gesamt-fortsetzung.log, paket-a-rundenabnahme.log,
paket-a-textfelder-gegenprobe.log, paket-a-tempo-ab.log,
paket-a-affe-handy.log, paket-a-affe-ipad.log, paket-a-regeln-abschluss.log.
Frühere feste A-Gegenproben und Bilder stehen in den beiden vorigen Bau-Einträgen.

**Offen:** Neue Firestore-Regeln müssen **vor späterem Hosting** eingespielt
werden (CODEX-START § 5.5, KONSOLE K10; macht ladegeraet.ps1 auf Betreiber-Auftrag).
Online bleibt 3.18.10. Bekannte Onboarding-/Tempo-/Gerätebefunde verbleiben bei
ihren Aufgaben; kein Bau außerhalb Paket A. Texte-Probelauf läuft unverändert.

**Abschluss:** Paket A direkt auf main committen und pushen, nicht veröffentlichen.
**Nächster Schritt:** Paket B nur im neuen ausdrücklich beauftragten Chat
mit dem Paket-B-Starttext aus CODEX-START; hier keine weitere Bauaufgabe.

### 2026-10-01 — A weiter: Pull mit erhaltenem Zwischenstand, weiterhin Akku

**Geändert:** Zuerst wie beauftragt `git pull --autostash`: main von
`c4b1c30` auf `90d7aaa` vorgespult, ausschließlich `AGENTS.md` aktualisiert.
Git hat Autostash `b2dea40` erfolgreich angewendet. Vergleich
`git diff b2dea40 -- . ':!AGENTS.md'` danach leer; alle elf neuen
Paket-A-Dateien weiterhin untracked vorhanden. Keine Produktionsänderung.
Dieser Logeintrag und `plan/STAND.md` halten die Fortsetzung fest.

**Entscheidung:** `AGENTS.md` vollständig neu gelesen, anschließend STAND,
CLAUDE und Prüfstand-LIESMICH sowie den letzten Abnahme-Eintrag gelesen.
Die neue Regel zu „A weiter“ erhält den uncommitteten Stand und verbietet
auf Akku den Paketabschluss. Alle 13 A-Zeilen bereits gezielt geprüft,
keine offene/zurückgegebene Bauaufgabe. Keine gültige Einzelprüfung ohne
Quelländerung wiederholt. Syntax App/SW und vollständige Standprüfung für
3.18.11 nach Pull erneut grün; Ausgabe vollständig gelesen.

**Offen:** BatteryStatus **1**, 35 %; daher weiterhin kein Gesamtlauf,
kein Affe, kein Commit/Push und keine Veröffentlichung. Lokale Version
3.18.11 erhalten, alle A-Zeilen `in Arbeit`. Regel-Veröffentlichung bleibt
für eine spätere, vom Betreiber ausgelöste Veröffentlichung offen.

**Nächster Schritt:** Netzteil anschließen und „Netzteil dran“ schreiben.
Bei gemessenem BatteryStatus **2** Paket A nach dem vorigen Eintrag
abschließen: Gesamtlauf, Affe, Gegenprüfung/Checkliste und erst bei Grün
Commit/Push auf main. Nicht veröffentlichen, kein Paket B beginnen.

### 2026-10-01 — Paket A gebaut: A7/A13 nachgeholt, Gesamtlauf braucht Netzteil

**Geändert:** `sw.js:49` (Rechtsseiten vorabspeichern), `sw.js:135`
(App-Startpfade), `sw.js:197` (nur passende HTML-Version im laufenden Cache),
`sw.js:220` / `sw.js:237` (sofortiger Cache/Index-Rückfall nur beim App-Start);
`plan/werkzeuge/pruefstand/t_sw_paket_a.js:18` (abgewartetes Async-Polling),
`t_sw.js:129` (neue Ressourcen-URL samt Antwort/Cache-Nachweis),
`app.js:19`, `sw.js:10`, `index.html:64` / `index.html:126` / `index.html:218`
(Version 3.18.11, alle 33 Querys einschließlich 31 Startbild-Links),
`CHANGELOG.md:1`, `LEHREN.md` §§ 5.3/15, Aufgabenliste, STAND und PLAN.
Vorhandene uncommittete A1–A6/A8–A12-Änderungen erhalten, keine anderen Pakete.

**Entscheidung:** Betreiber hat die Fortsetzung dieses Zwischenstands und
das Nachholen von A7/A13 ausdrücklich beauftragt. Der korrigierte echte
HTTP-/Worker-Test bestätigt zuerst den erfolgreichen Online-Update-/Offline-
Normalfall. Ursache der früheren Prüfaufbau-Fehler belegt: Offline wurde vor
Aktivierungsabschluss geschaltet; `waitForFunction(async ...)` behandelt
in dieser lokalen Playwright-Fassung die Promise als wahr (Quellcode:
`const success = predicate(); if (success) ...`). Jetzt wird jede Cache-/
Registrierungsabfrage per `page.evaluate` abgewartet und gepollt; Controller
muss mit dem aktivierten Worker übereinstimmen. SDK-Dateien werden an ihren
gespeicherten Request-URLs nachgewiesen; eine nackte Match-Abfrage passte
hier trotz vorhandener URL nicht. Entscheidend ist der anschließend
tatsächlich erfolgreiche Offline-Neustart. Automatische Registrierung und
Update-Prüfung erhalten getrennte Serverzustände; reales `reg.update()`,
keine lokal gerouteten Navigationsantworten und keine künstlichen Cache-Puts.
Eigene Diagnose-/Titel-/Quotierungsfehler in LEHREN festgehalten.

A7: Neue HTML mit anderer App-Version überschreibt den alten Cache nicht;
die neue Installation bringt ihre eigene Startseite. Korrekturen derselben
Version bleiben cachebar; Versionspräfixe werden durch die schließende
Quote unterschieden. A13: eigene Rechtsseiten im Zusatzcache, online Netz
zuerst, Index-Rückfall nur für `/` und `index.html`, jeweils relativ zu sw.js.
Rechtstexte und Lernlogik bleiben unverändert. Die alte Station B verlangte
das Vergiften des alten HTML-Caches und widersprach damit A7. Sie fordert
jetzt direkt eine neue Versions-URL an und prüft zusätzlich identische
Antwortbytes und genau einen Netzabruf für zwei Anforderungen; kein Test
gelöscht, keine Grenze gelockert. Echte Versionswechsel separat vollständig.

**Gezielte Abnahme, vollständige Ausgaben gelesen:**

- `t_sw_paket_a.js --gegenprobe`: fester c4b1c30 bestätigt Offline-Boot-
  Blockade nach Abbruch, App-Fallback statt Rechtsseiten und alte Online-
  Rechtsfassung; Normal-Update und gleichversionige HTML-Korrektur grün.
- `t_sw_paket_a.js`: erfolgreicher und gescheiterter Update-Versuch;
  Offline-Starts unter `/` und `/index.html`; HTML gleicher Version;
  beide Rechtsseiten offline vor erstem Besuch, beide beim ersten Online-
  Aufruf frisch; unbekannter Pfad ohne App-Fallback. Grün, auch mit 3.18.11.
- `t_sw.js`: alle Stationen A–D und festen Gegenproben grün, Funde 0;
  Cache-HTML bei 3 s Netzverzögerung nach 73 ms, alter Stand 3094 ms.
  Erster Lauf brach wegen nicht antwortendem Prüfserver 8099 ab, per HTTP-
  Abruf belegt; Server neu gestartet, HTTP 200 und vollständiger Lauf grün.
- `t_boot_geometrie.js`: fünf Geräteformate, pixelgleiche Zeichen/Namen,
  Georgia sowie simuliertes iOS-Erstbild/Standalone grün. Kein echtes
  iPhone-Ergebnis behauptet.
- `t_sprung.js`: alle vier Breiten ohne Sprung; `t_kontrast.js`: Funde 0;
  `t_a11y.js`: keine Funde, ruhige Bewegung und benannte Dialoge grün.
- Syntax App/SW/Test und `pruefe_stand.mjs` grün: Version 3.18.11,
  CSP unverändert passend und erweiterte APP_SHELL vollständig.
  Die übrigen gezielten A-Abnahmen/210 Regeltests wurden nicht erneut
  ausgeführt: ihre vollständigen grünen Ausgaben stehen im vorigen Eintrag.

**Gegenprüfung § 2a:** gesamten Produktions-Diff erneut gegen die Befunde
gelesen: A1–A4 ursprünglicher Auth-Auftrag/privater Reset, A5 echter
Inventar-Endzustand, A6 atomare Marker/Zähler-Paarung und eigener Löschfall,
A8 Zustimmung vor Import-Write, A9 genau 15 gesicherte Original-Restzeilen,
A10 passende Fehlerhandlung, A11 Offline/Zeitlimit, A12 Einzelsettings und
serverbasierte Altfeld-Transaktion. A7/A13 erfüllen jetzt die jeweilige
Abnahme; Schutz und Rückfall nur am vorgeschlagenen Pfad. Neue SW-Testquelle
und geänderte Station B vollständig gelesen. Keine neuen Datenfelder,
keine Funktion außerhalb Paket A und kein Release ausgelöst.

**LEHREN § 14, Punkt für Punkt (keine Commit-Freigabe):**

1. Produktions-Codepfade und Diff gelesen, siehe Gegenprüfung.
2. App-Navigation/Cache-Put/Fallback sowie übrige A-Muster geprüft.
3. SW-Kommentare, Changelog und Speicher-/Regeltexte nachgezogen.
4. Rechtsseiten in APP_SHELL; kein neues Blatt oder Speicherfeld.
5. Bestehende UI-Zustände, keine neue DOM-Zustandsquelle.
6. Sprung/Kontrast/Startbild grün; CPU-Tempo/Gesamtlauf/Affe am Netzteil offen.
7. Bestehende Texte, keine Systemcodes oder religiöser Wortlaut ergänzt.
8. Keine neuen Cloud-Felder; geänderte Regeln 210/210 aus vorigem Eintrag.
9. Keine neue Datenart; bestehende DSE unverändert zutreffend.
10. Syntax App und SW grün.
11. Version 3.18.11 an allen 33 Querys, APP_VERSION/CACHE_NAME und CHANGELOG; Standprüfung grün.
12. Einzeltests grün; Gesamtlauf und Affe ausdrücklich fehlen.
13. Aufgaben, Logbuch, STAND und PLAN aktualisiert; eigene Fehler in LEHREN.
14. Netzteil als konkreten Betreiber-Schritt am Antwortende nennen.

**Offen:** BatteryStatus weiterhin **1** (zuletzt 42 %), daher Halt nach
CODEX-START § 5.4: kein Gesamtlauf, kein Affe, kein Commit/Push. Alle 13
Zeilen bleiben `in Arbeit`, lokale Version 3.18.11, online 3.18.10.
Geänderte Firestore-Regeln müssen vor einer späteren Hosting-Veröffentlichung
eingespielt werden; jetzt keine Veröffentlichung beauftragt und kein
`ladegeraet`/`veroeffentlichen`/`firebase deploy` ausgeführt.

**Nächster Schritt:** Netzteil anschließen; erst bei BatteryStatus **2**
Prüfserver/SDK-Emulator gemäß Prüfstand-LIESMICH starten, ganzen Prüfstand
und danach Affe Handy 200/7 und iPad 150/7 ausführen, alle Ausgaben lesen;
§ 2a/§ 14 erneut prüfen, Status/Logbuch nachziehen und erst bei Grün
direkt auf main committen/pushen. Nicht veröffentlichen.

### 2026-10-01 — Paket A angehalten: elf Zeilen gezielt geprüft, SW und Gesamtabnahme offen

**Geändert:** `app.js:2556` (Speicherfehler-Handlung), `app.js:2949`
(Settings-Einzelfelder), `app.js:2973` (nur Altfeld-Reparatur am Serverstand),
`app.js:9798` / `app.js:10002` (Feedback offline / Zeitlimit);
`firestore.rules:117` (Settings-Kommentar), `plan/werkzeuge/pruefstand/`
(`t_feedback_speichern.js`, `t_feedback_ansichten.js`,
`t_settings_mehrgeraete.js`, `t_settings_kontowechsel.js`, `stubs.js`,
`alle_pruefen.js` – Wrapper-Hilfsquellen mit hashen);
`plan/grossplan/befunde/werkzeuge/runde14_fortsetzungen.js:13`
(Fixture kennt offline), `LEHREN.md` §§ 3.7/3.11/5.3/15,
`AUFGABEN.md`, `plan/STAND.md`, `plan/PLAN.md`.

Eigene Statuskorrektur: Erstes Regex traf wegen CRLF keine Zeile; im Diff
bemerkt, strukturiert mit genau elf geprüften Treffern korrigiert und in
LEHREN §§ 3.10/15 festgehalten.

**Entscheidung:** A10 übernimmt jeweils dieselbe nächste Handlung wie der
vorhandene Banner: nach Ausweis-Erneuerung erneut speichern, bei dauerhafter
Ablehnung Backup. A11 nutzt bestehendes `mitZeitlimit` (echte 12 s), sperrt
Knopf und Funktion offline und erhält den Entwurf. Eine nach dem Zeitlimit
doch serverseitig gespeicherte Idee kann die UI weiterhin nicht bestätigen;
eine Abbruch-/Deduplizierungsfunktion war nicht vorgeschlagen und wurde nicht
ergänzt. A12 schreibt alle vier Aufrufer einzeln. Nur wenn die Ablehnung
tatsächlich mit unbekannten Server-Settings zusammenfällt, wird einmal die
Map aus dem aktuellen Serverstand bereinigt, in einer Transaktion; keine
generelle Wiederholung eines Ganz-Schreibens. Kein neuer Datenschlüssel,
keine neue Datenart, keine Lernlogik oder religiöser Wortlaut geändert.

**Gegenprüfung nach § 2a:** Produktions-Diff und alle übertragenen Test-Diffs
gegen Befunde gelesen; neue Testquellen auf Erwartungswerte/Abbruch geprüft.
A1: Ursprung vor Dialog, Fremdkonto bleibt; A2: alte Fortsetzungen stumm,
eigene normale Abschlüsse laufen; A3: private Drafts/Selektion zurückgesetzt;
A4: eigener Registrierungs-Nachtrag von fremdem getrennt, A→B→A/Neuversuch
geprüft; A5: sichtbares Inventar plus echte Endzustände, fester Alt-Test
c4b1c30 reproduziert Exit 0 mit leerem Inventar; A6: Gegenbindung am Merker,
Batch-Abzug nur bei eigenem vorhandenen Merker, Kontoprüfungen nach Await;
A7/A13: keine SW-Behebung übernommen, Normal-Prüfaufbau rot und ausdrücklich
nicht abgenommen; A8: Einwilligung vor jedem Import-Schreibweg, geteilte
Texte ausgeschlossen, Konto nach Dialog geprüft; A9: genau 15 Originalzeilen
gesichert, nur Kennungen umbenannt, Laufzeit-Hypothesen nicht als bewiesen
bezeichnet; A10: beide Fehlerzweige; A11: Offline-/Doppeltipp-Sperre und
Zeitlimit-Fortsetzung; A12: Einzelpatch sowie Transaktions-Ursprung und
Serverstand geprüft. Keine fremden Paketaufgaben gebaut.

**Gezielte Abnahme:**

- `t_konto_fortsetzungen.js` inklusive aller festen Alt-Gegenproben c4a2ccf,
  normale Auth-Abschlüsse, SDK-vor-Callback, A→B→A, eigene Adresslöschung
  (0/25 ms): grün; `t_konto_registrierung_neuversuch.js` grün.
- `t_inventar2.js` vollständig bis Rundenende und Plan-speichern: grün;
  `t_inventar2_gegenprobe.js` c4b1c30: alter Fehler bestätigt.
- Regeln 210/210 erwartungsgemäß; sechs DATEN-1-Fälle zuvor vier unerwartete
  Freigaben. Vollständige 233 Ausgabezeilen des grünen Regellaufs gelesen.
  Echter SDK-/Emulator-Fall `t_settings_mehrgeraete.js`: auch Kontodaten-
  Löschung zieht Stimme von offener und entfernter Idee ab, fremder Merker bleibt.
- `t_import_einwilligung.js` aktueller Stand und c4b1c30: echter Widerruf,
  Zustimmung/Abbruch, normales Konto, manipulierter geteilter Satz grün.
- `t_feedback_speichern.js`: Modul-Strings separat geparst, beide Meldungen,
  Offline-Sperre auch in Funktion, nach 12 s bedienbar, Entwurf erhalten,
  späte Antwort ohne UI-Wirkung; feste Gegenprobe c4b1c30 zeigt alte Fehler.
- `t_feedback_ansichten.js`: 24 Kombinationen aus 320/390/810 px, hell/dunkel,
  Bewegung normal/reduziert, leer/voll, jeweils online→offline→online grün.
  Bilder 320 dunkel und 810 hell angesehen. Kein interner Formular-Sprung,
  kein horizontaler Überlauf. Vorhandener Offline-Banner verschiebt die ganze
  Karte auch im Vorstand (320 px: identische 104.15625 px); bei aktuellem
  Scrollstand liegt der gesperrte Knopf am kleinen Handy unter der festen
  Navigation. Bestehender Zustand, hier nicht außerhalb des Plans geändert.
- `t_settings_mehrgeraete.js`: echte SDKs, zwei getrennte Offline-Caches,
  Thema/Rundengröße/Backupdatum erhalten; c4b1c30 überschreibt Thema/Datum;
  Altfeld-Reparatur bewahrt den Serverstand. `t_settings_kontowechsel.js`:
  Wechsel während Reparatur ohne Write/Fehlermeldung, ohne Altfeld kein
  Ganz-Schreiben, aktuelle Fremdwerte erhalten – grün.
- Abschluss-Regressionsauswahl (kein Gesamtlauf): `t_konto_nutzerfallback`,
  `t_konto`, `t_board_moderation`, `t_board_limit`, `t_konto_dialog`,
  `t_konto_bestaetigungswechsel`, `t_daten`, `t_text_einwilligung`,
  `t_text_zustaende`, `t_sprung`, `t_kontrast`, `t_a11y`: alle grün.
  Alle vollständigen Ausgaben gelesen. Logs:
  `%TEMP%/paket-a-abschluss-t_*.log`; frühere Lösch-/Teilen-Abnahmen
  `%TEMP%/paket-a-t_*.log`, Regeln `%TEMP%/paket-a-regeln-vorher.log` und
  `%TEMP%/paket-a-regeln-nachher.log`. Neue Einzelproben ohne Umleitung
  stehen vollständig in den Tool-Ausgaben. Bilder:
  `%TEMP%/adrabic-pruefbilder/paket-a-feedback-{320-dunkel,810-hell}.png`.

**LEHREN § 14, Punkt für Punkt (keine Commit-Freigabe):**

1. Codepfade und Diff selbst gelesen, siehe Gegenprüfung.
2. Alle Settings-Aufrufer/Auth-/Import-/Merker-Muster gesucht.
3. Speichertext, Lösch-/Regel-Kommentare nachgezogen.
4. Kein neues Blatt, keine Handlung, kein Cloud-/Geräteschlüssel.
5. Bestehende UI-/Draft-Speicher weiter genutzt.
6. Sprung/Geometrie/Kontrast/ruhige Bewegung gezielt grün; CPU-Tempo/Affe am Netzteil offen, echtes iOS nicht behauptet.
7. Fehlermeldungen nennen Handlung und Verbindung, keine Systemcodes.
8. Keine neuen Cloud-Felder; geänderte Regeln 210/210 und echter SDK-Löschfall grün; Regel-Veröffentlichung bleibt offen.
9. Vorhandene Datenflüsse eingeschränkt, keine neue Datenart; DSE nachgelesen, kein Änderungserfordernis.
10. `node --check app.js` und `sw.js` grün.
11. `pruefe_stand.mjs` grün auf 3.18.10; eine neue Paket-Version/CHANGELOG erst nach Erledigung der zurückgegebenen Zeilen, noch kein Release vorbereitet.
12. Betroffene Tests/Regressionen grün; Gesamtlauf und Affe fehlen. Keine Commit-Freigabe.
13. Aufgaben, Logbuch, STAND und PLAN nachgezogen; eigene Prüffehler in LEHREN notiert.
14. Betreiber-Schritt Netzteil am Antwortende benennen; kein Deploy-Auftrag.

**Offen:** A7/A13 `zurück (SW-Prüfaufbau)` nach § 6. Der neue
`t_sw_paket_a.js` ist ein ausdrücklich nicht abgenommener Entwurf, bleibt
sichtbar rot; keine Grenze gelockert, nichts gelöscht/übersprungen. Kein
Commit/Push/Deploy; bekannte eigene Änderungen bleiben im Arbeitsbaum.
Version weiterhin 3.18.10. BatteryStatus am Abschluss weiterhin **1**, daher
kein `alle_pruefen.js` und keine Affenläufe. Netzteilfrage gestellt, noch
keine positive Gerätemessung. Neue Regeln müssen **vor** einer späteren
Hosting-Veröffentlichung eingespielt werden (Betreiber/ladegeraet), jetzt
ausdrücklich nicht veröffentlichen. Elf Zeilen `in Arbeit`, weil die
Paket-Abnahme/Version/Commit noch fehlen; nicht fälschlich `erledigt`.

**Nächster Schritt:** A7/A13 in einer ausdrücklich auf den erhaltenen
Zwischenstand aufbauenden Fortsetzung abnehmen. Dann eine Paket-Version,
Gesamtlauf/Affe am Netzteil (BatteryStatus 2), § 2a/§ 14 erneut und erst
bei Grün direkt auf main committen/pushen; nicht veröffentlichen.

### 2026-10-01 — A6–A9: Regeln und Import geprüft, SW-Aufgaben zurück

**Geändert:** `firestore.rules:483` (Stimm-Merker bindet Zähler),
`regeln-pruefung.mjs` (sechs neue Fälle, M14 gepaarter Abzug),
`app.js:3630` (eigene Stimmen beim Konto-Löschen atomar zurückziehen),
`app.js:4915` (Import-Einwilligung, Ausschluss in geteilten Sätzen),
`t_import_einwilligung.js`, `t_sw_paket_a.js`, `RUNDE15-REST.md`, Aufgabenliste.
**Entscheidung:** A6: vor Änderung vier Umgehungsschritte im Emulator
unerwartet erlaubt, danach 210/210 erwartungsgemäß. Alte/fremde/entfernte
Ideen und verwaiste Merker enthalten; DSE sagt nicht, dass die eigene
Stimmenzahl beim Konto-Löschen erhalten bleibt, keine neue Datenart.
A8: echter Widerruf und vier vollständige App-Fälle (abgelehnt, bestätigt,
normales Konto, manipulierter Code) grün; Gegenprobe c4b1c30 speichert
jeweils zehn Zeilen/einen Text ohne neue Einwilligung. Importdialog benennt
ausgelassene Texte; religiöser Wortlaut unverändert. A9: alle 15
Zweig-Restzeilen mit eigenem R15-Präfix gesichert, aktuelle Codepfade
nachgelesen; keine zusätzlichen Befunde gebaut.
**Gegenprüfung:** Auth-/Import-/Stimmen-Diff am Befund gelesen; eigene
Adresslöschung/Registrierung bleiben erhalten. Kontoprüfung nach jedem
zusätzlichen Await, Stimmen-Abzug nur mit tatsächlich vorhandenem eigenem
Merker. Gezielte Konto-Lösch-, Teilen-, Auth-, Sprung-, Kontrast-, A11y-Tests
grün (acht Logs `%TEMP%/paket-a-t_*.log`).
**Offen:** A7 und A13 zurück: Abbruch-Gegenprobe c4b1c30 bestätigt, aber
Normal-Update/offline-Kontrolle des neuen SW-Tests scheitert. Route-Variante
umging `setOffline` bzw. brach vor dem Worker ab; nach Korrektur auf echten
lokalen HTTP-Server bleibt Normal-Update bei `ERR_INTERNET_DISCONNECTED`.
Keine Abnahme behauptet, SW-Schutzentwurf vollständig zurückgenommen.
Zusätzliche eigene Prüfkorrektur: boot-Knoten ist flüchtig; App-Fallback
am bleibenden `#app` unterscheiden. § 6: nicht weiter am selben Prüfaufbau
probieren. Neue Regeln müssen vor Hosting eingespielt werden, ausschließlich
durch Betreiber/ladegeraet. Weiterhin Akku, kein Gesamtlauf/Commit/Deploy.
**Nächster Schritt:** A10–A12 abarbeiten; SW-Prüfaufbau danach als eigener
offener Punkt für die Fortsetzung belassen.

### 2026-10-01 — Paket A begonnen: Kontowechsel-Schutz aus runde15 übertragen

**Geändert:** `app.js` (Auth-Auftrag, Auth-Reset, Auth-Fortsetzungen); acht
Prüfdateien aus `4462fac`, `t_inventar2.js` und neue feste Gegenprobe
`t_inventar2_gegenprobe.js`; `regeln-pruefung.mjs` (DATEN-1-Gegenprobe).
**Entscheidung:** Ausgang `c4b1c30` / 3.18.10 per sauberem Fast-forward
geholt; Syntax und Standprüfung grün. Übertragen wird ausschließlich der
Auth-/Inventar-Diff des gesicherten Zweigs, keine alten Versionen oder
Textlern-Änderungen. A1–A4 am Vorstand als Fehler reproduziert und nach
Übertragung mit `t_konto_fortsetzungen.js` grün (Normalfälle, vollständige
App, A→B→A, SDK-Wechsel vor Callback, Gegenproben fest `c4a2ccf`).
Registrierungs-Neuversuch ebenfalls grün, ohne Übernahme-Zeile B ohne Mail.
A5-Vorstand: leere Inventare, Abbruch bei `-> null`, trotzdem Exit 0.
Neuer Inventartest erzwingt den vollständigen Weg bis zum Kontoformular.
**Offen:** Einzelabnahmen und Paket-Gegenprüfung laufen. BatteryStatus 1,
67 %: kein Gesamtlauf/Commit auf Akku (CODEX-START § 5.4). Keine Version
hochgezählt, kein Push, kein Deploy. Ein erster erzeugter Übertragungs-Patch
war syntaktisch ungültig; `git apply --check` lehnte ihn ohne Änderung ab.
Hunk-Anfänge anschließend zeilenweise erkannt und Übertragung geprüft.
**Nächster Schritt:** Paket A der Tabelle nach weiterbearbeiten; A6
Stimmen-Regeln nach roter Emulator-Gegenprobe korrigieren.

### 2026-10-01 — Phase 1 fertig: 8 Prüfer, Plan für Codex geschrieben

**Geändert:** `befunde/` (AUFTRAG-PRUEFER, BEW, CODE, DATEN, EIN, EINST,
FORT, LERN, VERW), `AUFGABEN.md`, `CODEX-START.md`, `ENTSCHEIDUNGEN.md`
(alle neu); `AGENTS.md` neu gefasst und aus `.gitignore` genommen (war nie
im Repo, Codex bekam sie beim Anhängen des Repos nicht; Hosting schließt
`**/*.md` aus); `plan/STAND.md` (Stufe-7-Blocker entfernt, Gesamtplan § 6);
Zweig `runde15` nach `origin` gepusht.
**Ergebnis:** 103 neue Funde (hoch 6, mittel 42, niedrig 55, kritisch 0).
G-107–G-111 im Stand 3.18.10 alle noch offen (DATEN). Zweimal vom
Nutzungslimit unterbrochen; jeder Prüfer nennt am Dateiende, was er nicht
mehr geprüft hat.
**Entscheidung:** Aufgaben in sechs Paketen A–F, je Paket ein Codex-Chat,
eine Version, voller Prüfstand, Claude-Gegenlesen. Betreiber-Wunsch „Codex
soll es 1 zu 1 hinkriegen“: `CODEX-START.md` legt Lesen, Reihenfolge,
Gegenprobe, Abnahme, Anhalten und Verbote fest; Modell je Paket in § 2.
**Von mir am Code nachgelesen (Stichprobe):** BEW-1, BEW-2, BEW-3, VERW-1,
EINST-1, EINST-2, DATEN-1 (Regeltext), EIN-Kommentar. Alle stimmen. Die
übrigen Funde sind **nicht** einzeln nachgelesen; deshalb ist Schritt 4.2 in
`CODEX-START.md` Pflicht (Beleg am aktuellen Code prüfen, sonst
`trifft nicht zu`).
**Offen:** 18 Entscheidungen des Betreibers (`ENTSCHEIDUNGEN.md`), Gerätetests
G1–G7. Nicht geprüfte Stellen der Prüfer (Wischen mit Touch, Schreiben-Runde,
iPad quer, Einspielen per Code/Datei, voller Regeltest) gehören in die
Nachprüfung (Phase 4).
**Nächster Schritt:** Paket A (`AUFGABEN.md`), zuerst G-110.

### 2026-09-30 — Zyklus angelegt, Vorbild-Bilder ausgewertet

**Betreiber:** Runde 15 entfällt; nach „Texte auswendig lernen“ die ganze
App noch einmal komplett prüfen, mit Plan und Agenten. Vollständige Liste
seiner Punkte in `AUFTRAG.md` § 1. Dazu 45 Bildschirmfotos des Onboardings
von „marhaba!“ als Anregung.
**Geändert:** `plan/zyklus-2/AUFTRAG.md`, `VORBILD-MARHABA.md`, dieses
Logbuch (neu); `plan/STAND.md` Reihenfolge.
**Entscheidung:** Runde 15 als Runde entfällt, ihre Befunde G-107–G-111
(G-110 kritisch) und G-118 kommen als Paket A an den Anfang der Umsetzung,
vor allem Neuen (Begründung `AUFTRAG.md` § 2). Prüfung parallel mit
Lese-Agenten, Umsetzung weiter nacheinander (LEHREN § 15, 25.09.).
Bilder: 13 Muster notiert, je mit Einschätzung für Adrabic; Bezahlseite,
Beispiel-Statistik, religiöse Zielliste und Lehrstoff ausdrücklich nicht.
**Offen:** Beginn erst nach Veröffentlichung von Texte (Stufe 7).
Zwei Gestaltungsfragen an den Betreiber stehen in `VORBILD-MARHABA.md` § 5
und kommen gesammelt in Phase 2.
**Nächster Schritt:** Nach Texte-Veröffentlichung Phase 0 (`AUFTRAG.md` § 3.1).
