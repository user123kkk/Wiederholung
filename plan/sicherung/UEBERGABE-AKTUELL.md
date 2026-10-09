# Übergabe – Stand von 09.10.2026 03:47 (wird jede Minute neu geschrieben)

Für Claude und Codex: Wer hier weitermacht, braucht keine Erklärung vom
Betreiber. Erst diese Seite, dann `plan/BETREIBER-VERSTEHEN.md`,
`plan/ALLES-OFFEN.md`, `plan/STAND.md`, `plan/ARBEITSPROTOKOLL.md`.

## Stand

- Zweig und letzter Commit: `main`, `2def028 Sicherung 03:46 (automatisch, jede Minute)`
- Version in `app.js` (Arbeitsordner): const APP_VERSION = "3.18.28"
- Version im letzten Commit: const APP_VERSION = "3.18.28"

## Uncommittete Dateien (stehen vollständig in `plan/sicherung/entwurf-aktuell.patch`)

Keine. Alles ist committet.

## Was gerade läuft

- Prozesse: node.exe 3, chrome.exe 19 (mehrere node.exe mit chrome.exe heißt meist: Tests laufen).

## Letzte Testergebnisse (vollständige Ausgaben: `plan/sicherung/tests/`)

**entwurf-3.18.28**: 37 grün, 1 rot, zuletzt: EXIT 0 t_einst (2. Lauf)
```
EXIT 1 t_paket_e
```

**ladegeraet-3.18.28.log**: 103 grün, 0 rot
```
```

## Zuletzt getan (aus `plan/ARBEITSPROTOKOLL.md`)

## 09.10.2026

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
  Kalender“ behauptet einen Termin, den die App nicht kennt; „Vorlage für
  19:30 Uhr“ war in Paket E bewusst so gewählt. Mein Vorschlag in der
  Tabelle „Niedrig“ war nicht mit dem Repo abgeglichen (LEHREN § 1.7).
  Zurückgenommen in `app.js` und CHANGELOG; `t_paket_e` läuft neu.
- 17:58 Minuten-Sicherung sichert jetzt auch den laufenden Chat wörtlich
  (jede Minute, nach `Desktop\Wiederholung-Belege\chats\`, außerhalb des
  Repos, weil es öffentlich ist). Betreiber 17:57: „auch laufende
  Aufgaben, ihren Stand, ihre Wege?“ Neu gestartet, läuft.
- 17:55 Minuten-Sicherung erweitert und neu gestartet (Betreiber 17:52:
  „wirklich alles … selbst Tests … ich will ein klares: ist eingebaut“):
  sichert jetzt jede Minute auch alle Testausgaben (`plan/sicherung/tests/`,
  26 Läufe der letzten zwei Tage) und schreibt
  `plan/sicherung/UEBERGABE-AKTUELL.md`. Erster vollständiger Durchgang
  17:54 committet und gepusht (4fefe03). Patch enthält jetzt auch die
