# Gesammelte Datenabnahme 3.18.30: vorbereitet, nicht ausgeführt

10.10.2026, 06:07. Betreiber verschiebt große Gesamtabnahme/ladegeraet und
Veröffentlichung. Diese Seite hält die tatsächlichen Anschlussbedingungen
fest; keine Abnahmefreigabe, kein neuer Paketbau, kein App-Commit.

## Belege auseinanderhalten

| Aufgabe / Quellstand | Tatsächlich geprüft | Noch kein Nachweis |
|---|---|---|
| A14/A15, App 05269ebd | 16 SDK-Regressionsfälle am früheren A16-Abschluss | Neuer vollständiger Nachlauf am A17-App-Stand |
| A16, App 05269ebd | 17er-Lauf plus zwei spätere Kartenkopie-Einzelproben | Ganzer aktueller 21er-Lauf |
| A16, App 4a8ca5a1 | Einzelne positive Fallauswahlkontrolle sowie Altersgrenze 120/121 und gezielte Gegenprobe | Alle 21 Produktfälle gemeinsam |
| A17, App 4a8ca5a1 | Fünfer-SDK-Lauf, zwei spätere Einzelproben und fünf betroffene Browserprüfungen | Gesamtes Paket, Runden-/Zufallsabnahme und echter iPhone-PWA-Test |
| Rules 6a110898 | 238 Fälle am festgehaltenen Regelnachweis; Regeldatei seitdem unverändert | Kein Nachweis einer veröffentlichten Regelversion |

Vollständige Hashes und Logs stehen in KARTEN-KONFLIKTE-2026-10-09.md,
VERLAUF-NEUSTART-2026-10-09.md und FORMULAR-KONFLIKT-2026-10-10.md.
Nicht aus verschiedenen Hashes eine neue Gesamtabnahme zusammensetzen.

## Zwei Anschlusslücken im Abnahmeaufbau

1. `alle_pruefen.js` findet alle `t_*.js`, somit auch
   `t_tagesantworten_sdk.js`. Dessen gemeinsamer Helfer benutzt Demo-Projekt
   `demo-adrabic-karten-audit` auf 8082. `ladegeraet.ps1` startet dagegen
   nur `demo-adrabic-pruefung` auf 8081. Der derzeit manuell laufende
   8082-Emulator verdeckt diese fehlende Voraussetzung. Quellenbefund,
   kein ausgeführter Ladegerät-Fehllauf. Vor späterer Abnahme den zweiten
   Demo-Emulator ausdrücklich bereitstellen und die endgültigen Rules laden;
   vor einem eigenständig zuverlässigen Ladegerät-Weg dort integrieren.
   Kein Produktionsprojekt, kein gleichzeitiges Seeden desselben Projekts.
2. Der Wiederaufnahme-Hash von `alle_pruefen.js` enthält für A16 den Testtext,
   aber nicht `diagnose_karten_konflikt.js`, obwohl der Test den Helfer direkt
   lädt. Der gemeinsame Quellstand enthält diesen Helfer ebenfalls nicht.
   Isolierte Probe der tatsächlichen `quellHash`-Funktion: virtuelle Änderung
   nur am SDK-Helfer lässt den Hash gleich, virtuelle Testtextänderung ändert
   ihn. Vollständiger Log `sicherung/tests/abnahme-sdk-helfer-hash-vorbefund.log`.
   Keine Dateien für die virtuelle Änderung verändert, kein Gesamtlauf oder
   tatsächlich bewahrtes falsches Testergebnis behauptet. Vor späterer
   Fortsetzung die Abhängigkeit im Hash berücksichtigen oder einen frischen
   Gesamtlauf ohne `--fortsetzen` verwenden. Auf den aktuellen Helferhash
   allein darf kein alter grüner Lauf übertragen werden.

Quellenstand der Untersuchung: `5afdb7cd70f8bc84e117a82fcf3b39838ff0398b`
für die committeten Wrapper; A16/Helfer zusätzlich aus erhaltenem Entwurf.
Wrapper heute nur gelesen, nicht geändert. Beide Lücken bleiben vor dem
späteren Ladegerät-Abschluss zu bearbeiten; Betreiberauftrag hierzu bleibt
verschoben. Die Prüfer-Eingangsfixes von 04:06 lösen diese anderen Lücken nicht.

## Späterer Ablauf nach ausdrücklicher Wiederaufnahme der großen Abnahme

1. Endgültige Produkt-, Regel- und Testquellen festhalten. Arbeitsbaum samt
   fremdem Entwurf erhalten; Syntax/Versionsstand und Minutensicherung prüfen.
   Die App-Version bleibt bis Paketabschluss 3.18.30.
2. Regeln separat am lokalen Prüfemulator prüfen (Windows-Konfiguration aus
   A16-Bericht; früher ungültigen Git-Bash-Pfad nicht übernehmen). Aktuelle
   Rules sowohl für 8081 als auch 8082 bestätigen; laufender Java-Prozess
   allein garantiert kein Neuladen einer geänderten Regeldatei.
3. Zusätzliche SDK-Abnahmen auf 8082 nacheinander ausführen:
   `karten_konflikte_sdk.js` und `diagnose_formular_konflikt.js` ohne
   Fallfilter. A16 wird im anschließenden allgemeinen Lauf bereits über
   `t_tagesantworten_sdk.js` ausgeführt; keinen unnötigen Doppellauf planen.
   Erforderlich: alle aktuellen Definitionen und fachlichen Kriterien;
   bisherige Zielzahlen A14/A15 16, A16 21, A17 7, nach späterer Änderung
   neu zählen. Der allgemeine Runner führt `diagnose_formular_konflikt.js` und
   `karten_konflikte_sdk.js` wegen ihrer Namen nicht automatisch aus.
4. Großen Browserlauf nach LIESMICH ausführen. `alle_pruefen.js` enthält die
   13 Rundentests; `--ohne-runde` genügt nur zusammen mit separat belegter
   Rundenabnahme. Erst alle vollständigen Logs/Messungen und Gegenproben
   lesen, danach Zufallstests nach geltender Paketregel. Keine Grenzlockerung.
5. Diff jeder Aufgabe gegen Befund und LEHREN § 14 prüfen. Paketstatus und
   Version erst nach erforderlicher Abnahme abschließen; H davor gesperrt.
   Ladegerät-Weg verlangt bereits saubere/committete Quellen und ist deshalb
   kein Ersatz für die Abnahme des jetzigen uncommitteten App-Entwurfs.

In jedem neuen PowerShell-Prüfprozess `CHROMIUM` setzen; aktueller
Arbeitsserver ist 8097, SDK-Projekt 8082. Nur bei tatsächlich unveränderten
Quellen einen gültigen fortsetzbaren Lauf übernehmen. Keine Befehle dieser
Liste wurden als große Abnahme gestartet. Veröffentlichung bleibt gesondert
ausdrücklich verschoben; Gerätebelege bleiben offen, solange sie fehlen.
