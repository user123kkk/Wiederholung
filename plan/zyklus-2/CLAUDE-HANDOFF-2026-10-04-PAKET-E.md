# Paket E — genau an der Betreiberpause fortsetzen

Pause ausdrücklich vom Betreiber am 04.10.2026, 20:00 Uhr: nur noch 5 %
Codex-Nutzung, Claude Code soll genau hier übernehmen. Prüfstandprozess samt
seinen Browsern gezielt beendet; kein E-Prüfprozess läuft weiter.

## Auftrag und erhaltene Arbeit

Arbeitsordner `C:\Users\USER\Desktop\Wiederholung`, PowerShell.
`main`, HEAD `8762d38478132d86abe05f4d605abd075fb7ed4b` (3.18.14).
Anfangs sauberer Stand, Pull unverändert; beim Netzteilabschluss Fetch,
origin/main identisch. **Arbeitsbaum absichtlich uncommittet erhalten.**
Nicht zurücksetzen, nicht stashen/verwerfen, keinen neuen Zweig/Paket bauen.
Der ausdrückliche Fortsetzungsauftrag ist die Ausnahme vom sauberen Start.

Betreiberauftrag: **E weiter**, D als 3.18.14 abgeschlossen/gepusht/online;
**D12–D15 bleiben zurück. Nicht veröffentlichen.** Danach „netzteil an“:
Paketabschluss einschließlich Commit/Push auf main autorisiert.
BatteryStatus beim Anhalten **2**. Vor Fortsetzung erneut prüfen; bei Akku
keinen Gesamtlauf/Tempoabschluss/Commit erzwingen.

Pflichtdateien nach AGENTS.md lesen, insbesondere LEHREN vollständig und
CODEX-START §3–7. Keine neuen Agenten beauftragen. Befunde EINST/LERN,
ENTSCHEIDUNGEN Z9/Z10, AUFGABEN und die obersten beiden bisherigen
E-Logbuch-Einträge enthalten Umsetzung und Abnahme jeder einzelnen Aufgabe.

28 freigegebene Aufgaben lokal gebaut: E1, E3–E6, E8–E16, E18–E25,
E27–E32. E2 bereits A3/3.18.11, sechs echte Gegenfälle am festen Ausgang grün.
E7 wartet weiter auf ausdrücklich „Z6b ja“, E17 auf Gerätetest G4,
E26 später Z7; V8 unfreigegeben, G5/G6/G7 Geräteabnahmen offen.
Keine Änderung der geschützten Text-Probelauf-Implementierung oder Regeln.
Version **3.18.15 nur vorbereitet**, noch kein Commit/Push/Veröffentlichen.
Aufgabenstatus enthält deshalb noch „lokal; Paketabschluss E offen“.

## Exakte Stelle im Prüfstand

Der **dritte**, ursprünglich frisch gestartete Gesamtlauf wurde auf
Betreiberwunsch angehalten. **83/139 fertig, Exit 0, sämtliche 83 endgültigen
Ausgaben vollständig gelesen.** Zuletzt `t_paket_c.js` grün (208 s), davor
vollständiges Paket B (188 s). **`t_paket_c_fort.js` wurde unterbrochen**,
nur Teil-Ausgabe, nicht abgenommen. Alle restlichen Tests fehlen noch.

Quellkennung:
`f53f4c89e4421ee34b97574ca6b1da1cad6d08930eba5256dd333329a6b55b7f`.
Arbeitslogs/stand.json:
`C:\Users\USER\AppData\Local\Temp\adrabic-pruefstand-gesamt\f53f4c89e4421ee3`.
**Unveränderter Quell-/Teststand: mit `--fortsetzen` weiterlaufen lassen**
(AUFTRAG §2b). Das überspringt die 83 bereits geprüften Läufe anhand ihrer
Hashes und führt den unterbrochenen sowie die verbleibenden Tests aus.
Nach Produkt-, Attrappen- oder Teständerung hingegen frisch starten.
Nicht alte Ergebnisse aus den beiden angehaltenen Vorläufen zurückkopieren.

```powershell
Set-Location -LiteralPath 'C:\Users\USER\Desktop\Wiederholung'
(Get-CimInstance Win32_Battery).BatteryStatus
$env:CHROMIUM='C:\Program Files\Google\Chrome\Application\chrome.exe'
node plan/werkzeuge/pruefstand/alle_pruefen.js --fortsetzen
```

Server 8099 zuletzt HTTP 200, vorhandenen Server prüfen. **CHROMIUM bei
jedem weiteren Shell-Prüfaufruf setzen.** Kein paralleler Browser-/Tempolauf.
Exit 0 reicht nicht: alle neuen vollständigen Logs einschließlich Zahlen
lesen, gegen bekannte Befunde prüfen. Vor erneutem Start ist die gesamte
Pause einschließlich angefangener C-fort-Ausgabe separat gesichert:
`C:\Users\USER\Desktop\Wiederholung-Belege\Paket-E-2026-10-04-Abschluss\dritter-Gesamtlauf-bei-Betreiberpause`.

## Bereits geklärte Abschlussfunde — nicht neu anfangen

1. Erster Gesamtlauf: E5-Downloads-Satz erzeugte auf großen Bildschirmen
   eine lange Zeile. Ursache belegt, nur Absatz `konto-sicherhinweis` auf
   48em begrenzt. E5 prüft jetzt fünf Breiten. Frischer t_gross_alle im
   dritten Lauf auf beiden großen Breiten überall 0 Befunde.
2. Zweiter Lauf: t_konto_fortsetzungen suchte den alten `deleteUser()`-
   Testanker; E11-Attrappe nimmt den Nutzer entgegen. Hilfsprobe
   `plan/grossplan/befunde/werkzeuge/konto_adressdialog_app.js` am Exportnamen
   umbenannt und Nutzer ans Original weitergereicht. Keine Schutzassertion
   gelockert. Vollständiger Wrapper samt alten Gegenproben im dritten Lauf
   grün, Log vollständig gelesen.
3. Zweiter Lauf: Doppeltipp 80 ms hatte richtige Karte 1, aber native
   „An unknown error occurred when fetching the script.“-Meldung trotz
   Exit 0. Diagnose am separaten Port: SW-Abrufabbruch erzeugt exakt diese
   Meldung sowohl mit festem 8762d38 als auch aktuell; normale Abrufe auf
   beiden ohne Fehler. Ursprüngliche Transportursache bleibt ungeklärt.
   Unveränderter Einzeltest **und dritter Gesamtlauf** viermal OK, keine
   Seitenfehler. SW/Konsolenfilter nicht verändert. Diagnosequelle und
   ausdrücklich gekennzeichnete Ergebnisabschrift im Belegordner.

Beide früheren angehaltenen Gesamtläufe und damaliger Produktdiff erhalten.
Eigene E21-Sprungregression vorher belegt korrigiert (absolute Tastenmarken
statt höherer Bewertungszeile); Akku-Einzeltest danach viermal 0.
Der bestehende 39-px-Auswahlwert in t_einstieg stimmt mit D überein.
Beschreibende Tempoausgaben enthalten positive Werte: nicht „ruckelfrei“
oder „schneller“ behaupten; Tempovergleiche nur x_ab_tempo gegen Vorstand.

## Nach dem verbleibenden Gesamtlauf

1. Endgültige 139 Ergebnisse prüfen und neue Logs vollständig lesen/sichern.
2. Nacheinander `node plan/werkzeuge/pruefstand/affe.js handy 200 7`
   und `node plan/werkzeuge/pruefstand/affe.js ipad 150 7`, ganze Ausgaben lesen.
3. **Separat frisch** `node plan/werkzeuge/pruefstand/abnahme_runde.js`
   ohne --fortsetzen, 13/13; alle 13 Einzel-Ausgaben vollständig lesen.
   Vorher die 139-Gesamtlogs sichern, der Rundenwrapper überschreibt 13 davon.
4. Feste E-Gegenproben waren beim Bau am Befund rot. Abschließender Runner
   vorbereitet, **noch nicht ausgeführt**:
   `node C:\Users\USER\Desktop\Wiederholung-Belege\Paket-E-2026-10-04-Abschluss\gegenproben.js`.
   28 Aufgaben gegen **8762d38, nie HEAD**; verlangt AssertionError und
   jeweilige Befundmeldung, nicht beliebigen Exit 1. Alle Ausgaben lesen.
5. Endgültige Gegenprüfung nach grossplan/AUFTRAG §2a/§3, LEHREN §14
   **Punkt für Punkt** ins Log. Produktdiff und alle Abnahmen wurden schon
   gelesen; detaillierte 29-Zeilen-Gegenprüfung im E-Logbuch. Finale Checks
   nach vollständiger Prüfung: Syntax, pruefe_stand.mjs, diff --check.
6. Erst dann 28 lokale Aufgaben auf `erledigt (3.18.15)`, STAND/PLAN/LOGBUCH
   Abschluss, Changelog-Vorbereitungszusatz/pending Absatz ersetzen.
   Kein Paket F automatisch beginnen. Keine Geräteabnahme als erledigt melden.
7. Eigene Dateien gezielt stage/Commit direkt main, `git push origin HEAD:main`,
   sauberen Arbeitsbaum/Remote-Hash bestätigen. **Nicht deployen.**

Belege: Akku-Einzeltests/PNGs und Quellen in
`C:\Users\USER\Desktop\Wiederholung-Belege\Paket-E-2026-10-04-Akku`;
Abschlussbelege im danebenliegenden `Paket-E-2026-10-04-Abschluss`.
`quellen-finaler-lauf-start.json` enthält Produkt-/Testdateihashes.
Seit diesem Start nur Plandokumentation geändert, keine Prüfquelle.
Es gibt keinen fertigen Paketabschluss und keinen grünen 139/139-Bericht.
