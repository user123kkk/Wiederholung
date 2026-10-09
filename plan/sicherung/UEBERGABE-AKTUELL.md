# Übergabe – Stand von 09.10.2026 19:07 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `022e775 Sicherung 19:06 (automatisch, jede Minute)`
- Version in `app.js` (Arbeitsordner): const APP_VERSION = "3.18.29"
- Version im letzten Commit: const APP_VERSION = "3.18.29"

## Uncommittete Dateien (stehen vollständig in `plan/sicherung/entwurf-aktuell.patch`)

Keine. Alles ist committet.

## Was gerade läuft

- Prozesse: node.exe 4, chrome.exe 9 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

## Letzte Testergebnisse (vollständige Ausgaben: `plan/sicherung/tests/`)

**entwurf-3.18.28**: 37 grün, 1 rot, zuletzt: EXIT 0 t_einst (2. Lauf)
```
EXIT 1 t_paket_e
```

**ladegeraet-nurpruefen-3.18.27.log**: 153 grün, 3 rot
```
ROT t_griff_scrollen.js (27s)
ROT t_konto_fortsetzungen.js (2s)
ROT t_paket_f_netz.js (1s)
153/156 Exit 0; 3 rot. Ausgaben noch lesen: C:\Users\USER\AppData\Local\Temp\adrabic-pruefstand-gesamt\7223038b21480566
ABGEBROCHEN: Pruefstand nicht komplett gruen (Liste oben). Nichts veroeffentlicht.
```

## Zuletzt getan (aus `plan/ARBEITSPROTOKOLL.md`)

## 09.10.2026

- Codex Fortsetzung: Betreiber möchte weiterarbeiten und „ladegerät“ für das größere gemeinsame Stück aufheben. Auftrag wörtlich in ALLES-OFFEN gespeichert. Tagesdeckel: tatsächliche Auswahl, Bewertungsregel, Wiederholungsqueue und Tageszähler gelesen. Wichtig: verlauf.w zählt Antworten, nicht verschiedene Karten; eine neue Karte kann beim zweiten Sicher bereits w erhöhen. Simulation nutzt den vorhandenen Lernlogik-Block und die tatsächliche Dringlichkeitssortierung, ohne Produktänderung und ohne erfundene Gedächtnisleistung.

- Codex Abschluss: 3.18.29 als 2bdf83c auf main committet und gepusht. Fünf betroffene Testläufe grün (E4, Rechtsplan-Umfeld, Anmeldung-Enter, Einstellungen, Dialog-Timer); vollständige Logs gelesen und gesichert. Klein-Weg, kein Gesamtlauf, nicht veröffentlicht. Online bleibt laut letztem Veröffentlichungsbeleg 3.18.28. G7 am echten iPhone nach Veröffentlichung offen; nächste Arbeit Tagesdeckel-Rechnung. Details im Zyklus-Logbuch, Eintrag 3.18.29. Ein Plan-Schreibbefehl wurde wegen PowerShell-Quotierung vor Ausführung abgelehnt und korrigiert, ohne Dateiänderung aus dem Fehlversuch.

- 15:50 Codex: E4 am festen d64380a rot (echter Zurück-Link, Formular fehlt). Neuer Weg: bestehender Dialog, unveränderte Rechtsseiten lokal laden, Rückweg bleibt sichtbar. E4 390/320/820 grün; Umfeld sechs Geräte-/Farbkombinationen grün, Fehler/Neuversuch und verspätete Antwort geprüft. iPad-Kontrastmeldung als Scroll-Clip belegt und alle sichtbaren Abschnitte durchgescrollt geprüft. 3.18.29 vorbereitet; Standprüfung grün. Betroffene Regressionen laufen; Akku BatteryStatus 1, Klein-Weg, kein Gesamtlauf/Deploy.

- Codex, Auftrag „weiter“: Desktop-Checkout sauber auf d64380a / 3.18.28 aktualisiert. Übergabe, Betreiber-Verstehen, offene Liste, Grundregeln und E4-Befund gelesen. Minuten-Sicherung gestartet (Git Bash). E4 wieder offen: tatsächlichen Zurück-Weg prüfen, vorhandenen Dialog für Rechtsinhalt verwenden. Nicht veröffentlichen.

- 04:38 **3.18.28 ist online.** `ladegeraet.ps1 -Fortsetzen`: 155 bewahrt,
  `t_serie_lang` Exit 0, zusammen 156/156; Affen Handy 200 und iPad 150 je
  0 Befunde; Regeln eingespielt; Hosting veröffentlicht. Abgerufen:
  `adrabic.web.app/sw.js` zeigt `adrabic-3.18.28`.
- 04:30 „ladegerät“ an 3.18.28 endete 04:19 mit 155/156, nichts
  veröffentlicht. Rot: `t_serie_lang` Fall 3 (47 statt 48), lief 04:01.
  Einzeln 04:20 wieder rot. Ursache gerechnet und belegt: Der Test
  verschiebt die Uhr der Seite um Vielfache von 24 h; über das Ende der
  Sommerzeit (25.10.) zeigt sie dann 03:xx statt 04:xx und liegt vor der
  4-Uhr-Grenze, die Seite lebt einen Lerntag zurück. Tritt nur zwischen
  04:00 und 05:00 auf. Kein App-Fehler. Test auf Kalendertage umgestellt
  (Erwartungen unverändert): 04:24 grün, 3/3 Fälle. `ladegeraet.ps1` hat
  jetzt `-Fortsetzen`; damit läuft der Stichwort-Ablauf am selben
  Quellstand weiter (155 bestandene bleiben, `t_serie_lang` neu, dann
  Affen, Regeln, Hosting). Gleiche Falle möglich in `t_gruss_datum` und
  `t_paket_c_kalendertage` (nutzen denselben Versatz aus `lib.js`); `lib.js`
  selbst erst nach dem Veröffentlichen berichtigen, weil es zum Quellstand
  gehört.
- 02:07 Betreiber: Safari, Version .26. Ursache am Code gefunden: „← Zurück“
  auf den Rechtsseiten ist ein Link auf `./index.html` und lädt im neuen
  Reiter die App neu. In `ALLES-OFFEN.md` nachgetragen. Der Test zu E4
  prüft diesen Weg nicht (LEHREN § 5.3: Test muss den echten Weg gehen).
- 02:02 Betreiber meldet: Plan im Einstieg ist weg nach Datenschutz/
  Impressum und zurück. In `ALLES-OFFEN.md` § 3.2 eingetragen, mit Abgleich
  (E4, G7, `app.js` 8966). Nichts gebaut: `ladegerät` läuft, und die
  Ursache ist am Gerät noch nicht belegt.
- 01:58 `zyklus-2/mehrwert/agentenberichte/ALLE-IDEEN.md` erzeugt: 338
  nummerierte Ideen wörtlich (Titel) aus 23 Berichten; 9 Berichte haben
  eine andere Form und sind noch ganz zu lesen, 2 sind leer. Der Abgleich
  mit dem Katalog (187 Zeilen) steht noch aus.
- 01:50 Betreiber: „ladegeraet“ (Stichwort, Freigabe für Regeln und
  Hosting). `ladegeraet.ps1` gestartet an 3.18.28, Netzteil, Baum sauber.
  Ausgabe: `%TEMP%/ladegeraet-3.18.28.log`. Achtung: Der Lauf überquert
  04:00 (Wechsel des Lerntags); rote Datumstests danach einzeln prüfen
  (LEHREN § 5.4). Er fragte auch „34? ich dachte über 60“: 34 sind
