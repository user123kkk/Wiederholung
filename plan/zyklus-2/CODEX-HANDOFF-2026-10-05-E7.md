# E7 (Ruhetag) — Übergabe für Codex, falls Claude Code ausfällt

Angelegt 05.10.2026, 01:10 Uhr. Der Betreiber wird in Claude wiederholt
abgemeldet. Diese Datei beschreibt den genauen Stand, damit Codex ohne
Nachfragen abschließen kann. Solange Claude Code weiterarbeitet, ist sie nur
Sicherung. **Zuerst `git log --oneline -3` und `git status` lesen:** Steht
dort schon ein Commit „3.18.16“, ist alles erledigt und diese Datei nur
Verlauf.

## Auftrag und Stand

Arbeitsordner `C:\Users\USER\Desktop\Wiederholung`, PowerShell, `main`.
HEAD `bbb9b88` (Entscheidung Z6b), davor `1242368` = 3.18.15 Paket E,
beide gepusht. **Arbeitsbaum absichtlich uncommittet; nichts verwerfen.**

Betreiber 04.10.2026 im Chat: **„ruhetag ja“** (Z6b), **„5 nein“** (V8),
**„E weiter“**, zum Rückwärtsrechnen verpasster Tage **„egal dann“** (nicht
bauen). Danach will er selbst `ladegeraet.bat` starten. **Nicht
veröffentlichen.** D12–D15 bleiben zurück. E17 wartet auf G4, E26 später.

Uncommittet, alles E7 / 3.18.16:

- `app.js`: `VERLAUF_ARTEN` (neu mit `r`), `normVerlauf` behält `r`,
  neue Funktion `ruhetagPruefen()` (Aufruf in `datenZusammenbauen`, im
  Nutzer-Snapshot nach `evaluateStreakForNewDay()` und bei
  `visibilitychange` sichtbar), `serieAktuell()` überspringt Tage mit
  `r > 0`, Satz „Deine Serie bleibt.“ in `lernenStapel`, `APP_VERSION`.
- `sw.js` `CACHE_NAME`, `index.html` 33 Versionsstellen: 3.18.16.
- `datenschutzerklaerung.html` Punkt 5: ein Satz zum Ruhetag-Vermerk.
- `CHANGELOG.md`: Eintrag 3.18.16 oben.
- `plan/werkzeuge/pruefstand/t_paket_e.js`: neue Abnahme `E7`, Export
  `ruhetagPruefen`/`verlauf` in `__E`; E8-Fixture auf `tag(-1)` korrigiert
  (siehe unten).
- `plan/werkzeuge/pruefstand/t_serie.js`: fünf Ruhetag-Fälle.
- `plan/zyklus-2/ENTSCHEIDUNGEN.md`: V8 nein eingetragen.

`firestore.rules` unverändert: `verlauf` ist dort eine freie Map (nur Typ
und Größe geprüft), der Schlüssel `r` braucht keine Regel.

Bewusste Abweichung von der Bauanleitung in `ENTSCHEIDUNGEN.md` Z6b Punkt 1:
Der Marker wird nur bei `serieAktuell() >= 1` geschrieben. Bei Serie 0
ändert ein Ruhetag das Ergebnis nicht, und leere neue Konten schrieben sonst
täglich.

## Geprüft

- Gegenprobe `node plan/werkzeuge/pruefstand/t_paket_e.js E7 --alt` gegen
  festen `8762d38`: rot mit „E7 Serie reißt ohne fällige Karte am
  2026-10-07“ (0 statt 10). Das ist die Messung aus LERN-1.
- Neuer Stand: `E7` grün (LERN-1-Messung, sechs Regelfälle, vier
  Markerfälle), `t_serie.js` 14/14, `t_serie_warnung.js` 4/4, `E25` grün,
  `node --check`, `pruefe_stand.mjs` grün.

## Nachtrag 01:16 Uhr — zweites Rot, noch NICHT geklärt

`t_text_tempo.js` rot: „Aufgabe mit 204 ms (> 200 ms)“, Schritt Verwalten
150/204. Im abgenommenen E-Lauf 147/100, im D-Lauf 166/169; in Paket B gab
es an derselben Stelle schon einmal 203 ms (A/B damals ohne
Verschlechterung). Ob E7 beteiligt ist, ist offen: `ruhetagPruefen` läuft
bei jedem Snapshot, nicht beim Reiterwechsel. **Nicht als Messfehler
abhaken und keine Grenze ändern.** Pflicht vor dem Commit:
abwechselnd gegen den Vorstand `1242368` messen
(`plan/werkzeuge/pruefstand/x_ab_tempo.js`, mindestens 8 Paare, Median und
Zahl über der Grenze, LEHREN § 5.3), ohne anderen Browserlauf. Zeigt E7
eine Verschlechterung: Ursache per Spur belegen und beheben (zum Beispiel
die Prüfung nur einmal je Tag und Datenstand rechnen), dann frischer
Gesamtlauf. Zeigt sie keine: Einzeltest am Netzteil nachlaufen lassen,
Ergebnis und A/B-Zahlen ins Logbuch.

## Nachtrag 01:20 Uhr — Tempo-Rot per A/B geklärt, Lauf muss fortgesetzt werden

`node x_ab_tempo.js 8 1242368` (acht Paare abwechselnd, CPU 4×, kein anderer
Browserlauf, Netzteil):

- alt (3.18.15): Verwalten 141/143/158/173/176/217/220/241, Median 176,
  **3 über 200**; Text Median 142.
- neu (3.18.16): Verwalten 145/145/145/148/157/166/180/185, Median 157,
  **0 über 200**; Text Median 111.

Der Vorstand überschreitet die Grenze im selben Wechsel selbst, der neue
Stand nicht. E7 verschlechtert das Tempo also nicht; die 204 ms waren
Schwankung des Rechners. Grenze unverändert. `t_text_tempo.js` muss trotzdem
im Nachlauf grün werden, sonst kein Commit.

Der Gesamtlauf wurde um 01:16 Uhr am Zwei-Stunden-Limit des Werkzeugs
beendet (kein Testfehler): 128 von 139 fertig, davon 126 grün, 2 rot
(`t_paket_e.js` Datumsfixture, `t_text_tempo.js` 204 ms), 11 fehlen. Kein
Prüfprozess mehr aktiv. Fortsetzung mit `--fortsetzen` (Befehl unten).

## Nachtrag 01:40 Uhr — Gesamtlauf fertig: 139/139 Exit 0

Die Fortsetzung ist beendet (PID 24336 existiert nicht mehr), **kein
Prüfprozess läuft**. Ausgabe: „139/139 Exit 0; 0 rot“ am Quellstand
bdfec355e529485d. Codex muss nicht warten und den Gesamtlauf nicht noch
einmal starten, solange keine Produkt-, Attrappen- oder Testquelle geändert
wird. Offen bleibt: die 13 Logs der Fortsetzung vollständig lesen
(`t_paket_e`, `t_text_tempo`, `t_ueben`, `t_ueben_auswahl`,
`t_undo_verlauf`, `t_verlauf_mehrgeraete`, `t_verwalten`, `t_wisch_tempo`,
`t_wischen`, `t_wischen_schraeg`, `t_wochen_kopf`, `t_x_mitten`,
`t_zahlen`), dann Schritte 1 bis 8 unten. Claude Code hat danach nichts
mehr gestartet und nichts committet.

## Nachtrag 01:37 Uhr — Betreiber übergibt an Codex; MASSGEBLICHER STAND

Der Betreiber will, dass Codex übernimmt. Claude Code startet nach dem
laufenden Prozess **nichts mehr** (keinen Affen, keine Rundenabnahme, keinen
Commit). Dieser Abschnitt ersetzt die älteren Zeitangaben weiter unten.

- Fortsetzung `alle_pruefen.js --fortsetzen` läuft als PID 24336 (gestartet
  01:18:44). Bereits nachgelaufen und **grün**: `t_paket_e.js` (914 s, mit
  korrigierter E8-Fixture und E7), `t_text_tempo.js` (20 s),
  `t_ueben.js`, `t_ueben_auswahl.js`, `t_undo_verlauf.js`,
  `t_verlauf_mehrgeraete.js`. Es fehlen noch etwa sieben kurze Tests
  (`t_verwalten` bis `t_zahlen`), wenige Minuten.
- **Erster Schritt für Codex:** mit dem Prozessbefehl unten prüfen, ob PID
  24336 noch läuft; wenn ja, warten. Danach `stand.json` im Logordner lesen:
  139 Einträge, alle `code: 0`, kein `zeitlimit`. Fehlt etwas oder ist etwas
  rot: `--fortsetzen` noch einmal (Befehl unten) und das Rot einzeln klären.
- Bereits von Claude gelesen: 126 Logs des ersten Abschnitts, zeilenweise
  gegen den abgenommenen E-Lauf verglichen (108 wortgleich; übrige nur
  Datum, Versionsnummer, Zufallsreihenfolge, Tempozahlen, fünf neue
  Ruhetag-Zeilen in `t_serie`). **Noch nicht gelesen:** die Logs der
  Fortsetzung ab 01:18 (`t_paket_e`, `t_text_tempo`, `t_ueben` und alle
  danach). Diese vollständig lesen. `t_fluessig` nennt beschreibend
  „Tab Verwalten längste Blockade 221 ms“; das passt zur A/B-Messung oben
  (Vorstand selbst über 200), keine Aussage „ruckelfrei“ daraus.
- Danach die Schritte 1 bis 8 unter „Danach, in dieser Reihenfolge“.

## Exakte Stelle im Prüfstand

Frischer Gesamtlauf am neuen Quellstand
`bdfec355e529485d7cf4304414e65913fa4554c34f977268e1fa1a335e8e8a69`, Logs:
`%TEMP%\adrabic-pruefstand-gesamt\bdfec355e529485d`. Gestartet 04.10. ca.
22:55, um 01:07 Uhr 112 Exit 0, **1 rot: `t_paket_e.js`**, Rest lief noch.

Das Rot ist ein Prüfaufbaufehler, kein Produktfehler und nicht E7: `E8`
setzte „gestern“ nach dem Kalender. Der Lauf erreichte den Test nach
Mitternacht; vor 04:00 ist Kalender-gestern der Lerntag heute der App, der
Hinweis war also noch nicht abgelaufen („E8 gestriger Hinweis verdrängt
andere“). Am 04.10. um 20:xx war derselbe Test grün. Korrektur: Fixture
nimmt `tag(-1)` aus `lib.js` (folgt dem Lerntag). Keine Erwartung geändert.
Vorfall steht schon in `plan/LEHREN.md` § 15 (letzte Zeile); die Regel
besteht in § 5.4 (G-096). Offen ist nur der Nachlauf dieses Tests.

**Vor allem anderen prüfen, ob der Lauf von Claude noch läuft** (um 01:09
Uhr PID 19924, 114 fertig). Solange ein Treffer kommt: warten, nichts
starten, keine Quelle ändern. Kommt keiner, ist er beendet oder abgebrochen;
`stand.json` im Logordner zeigt, welche Tests fertig sind.

```powershell
Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object { $_.CommandLine -match 'alle_pruefen|abnahme_runde|affe' } | Select-Object ProcessId, CommandLine
```

Dann weiter so, Netzteil prüfen (`BatteryStatus` = 2), kein paralleler Browserlauf:

```powershell
Set-Location -LiteralPath 'C:\Users\USER\Desktop\Wiederholung'
(Get-CimInstance Win32_Battery).BatteryStatus
$env:CHROMIUM='C:\Program Files\Google\Chrome\Application\chrome.exe'
node plan/werkzeuge/pruefstand/alle_pruefen.js --fortsetzen
```

`--fortsetzen` übernimmt die grünen Läufe mit gleichem Quell- und Testhash
und wiederholt `t_paket_e.js` (geänderter Test) sowie alles Fehlende. Läuft
ein Test über 04:00 Uhr, einzelne rote Datumstests zuerst gegen die Uhrzeit
prüfen (LEHREN § 5.3).

## Danach, in dieser Reihenfolge

1. Alle 139 Logs vollständig lesen, beschreibende Ausgaben gegen den
   abgenommenen E-Stand vergleichen:
   `C:\Users\USER\Desktop\Wiederholung-Belege\Paket-E-2026-10-04-Abschluss\dritter-Gesamtlauf-fortgesetzt-139-von-139`.
   Erwartete Unterschiede: nur E7-Zeilen in `t_paket_e`, fünf neue Zeilen in
   `t_serie`, Zufallsreihenfolge, Tempozahlen. Logs in einen neuen
   Belegordner `Paket-E-2026-10-05-E7` kopieren.
2. `node plan/werkzeuge/pruefstand/affe.js handy 200 7`, dann
   `node plan/werkzeuge/pruefstand/affe.js ipad 150 7`, je 0 Befunde.
3. Frisch `node plan/werkzeuge/pruefstand/abnahme_runde.js`, 13/13, alle
   Einzelausgaben lesen (`%TEMP%\adrabic-rundenabnahme`).
4. Gegenprobe E7 noch einmal gegen `8762d38` (Befehl oben), Ausgabe sichern.
5. Gegenprüfung nach `plan/grossplan/AUFTRAG.md` § 2a am Diff, besonders:
   `ruhetagPruefen` schreibt nie ohne geladene Sammlungen (`rohBereiche`,
   `rohKarten`, `cloudDocExists`), nie bei fälligen Karten in irgendeinem
   Bereich, nie doppelt; Tempo-Tests (`t_bestand_tempo`, `t_text_tempo`)
   gegen den Vorstand lesen, weil die Prüfung bei jedem Snapshot läuft.
   LEHREN § 14 Punkt für Punkt ins Logbuch.
6. `AUFGABEN.md` Zeile E7 auf `erledigt (3.18.16)`. Logbuch-Eintrag oben,
   `STAND.md`, `PLAN.md` AKTUELL, LEHREN § 15 (E8-Fixture) nachziehen.
   Im Logbuch unter **Offen**: Ruhetag greift nur an Tagen, an denen die App
   geöffnet wird; Rückwärtsrechnen vom Betreiber abgelehnt („egal dann“).
   Der neue Datenschutz-Satz gehört in die offene Rechtsprüfung.
7. `node --check app.js sw.js`, `pruefe_stand.mjs`, `git diff --check`.
   Eigene Dateien gezielt stagen, Commit direkt auf main
   („3.18.16: E7 Ruhetag …“, ohne Modellnamen), `git push origin HEAD:main`,
   Remote-Hash und sauberen Arbeitsbaum bestätigen. **Nicht deployen.**
8. Dem Betreiber melden: „fertig, gepusht“; er startet `ladegeraet.bat`
   selbst. Paket F erst auf sein Stichwort „F weiter“.
