# Übergabe – Stand von 09.10.2026 04:27 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `36a375b Pruefstand: t_serie_lang verschiebt die Uhr um Kalendertage (rot zwischen 04 und 05 Uhr ueber das Ende`
- Version in `app.js` (Arbeitsordner): const APP_VERSION = "3.18.28"
- Version im letzten Commit: const APP_VERSION = "3.18.28"

## Uncommittete Dateien (stehen vollständig in `plan/sicherung/entwurf-aktuell.patch`)

```
 M plan/ARBEITSPROTOKOLL.md
```

Auf einem sauberen Stand desselben Commits wiederherstellen:
`git apply --check plan/sicherung/entwurf-aktuell.patch`, dann `git apply plan/sicherung/entwurf-aktuell.patch`.

## Was gerade läuft

- Prozesse: node.exe 1, chrome.exe 11 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

## Letzte Testergebnisse (vollständige Ausgaben: `plan/sicherung/tests/`)

**entwurf-3.18.28**: 37 grün, 1 rot, zuletzt: EXIT 0 t_einst (2. Lauf)
```
EXIT 1 t_paket_e
```

**ladegeraet-3.18.28-fortsetzen.log**: 0 grün, 0 rot
```
```

## Zuletzt getan (aus `plan/ARBEITSPROTOKOLL.md`)

## 09.10.2026

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
  Berichte (einer je Agent), darin stecken die Ideen (Katalog: 187 Zeilen,
  68 Fragen).

## 08.10.2026

- 19:15 3.18.28 auf `main` (9f2990a) und gepusht. Zweiter Lauf `t_paket_e`,
  `t_einstellungen`, `t_einst` grün. Logbuch, STAND, ALLES-OFFEN
  nachgezogen. Patch `verstaendlichkeit/woerter-3.18.28-entwurf.patch` ist
  damit überholt (bleibt als Beleg).
- 18:56 Tests am Entwurf 3.18.28 fertig: 33 von 34 grün, `abnahme_runde.js`
  13/13. Rot: `t_paket_e` E6 („Zeile behauptet keinen eingerichteten
  Termin“). Echter Fehler im Entwurf, nicht im Test: „19:30 Uhr, im
