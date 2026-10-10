# Große Datenabnahme 3.18.30

Auftrag 10.10.2026 11:42: „ok los aber neuer chtat ja, und was versteht man
unter paket“. Wiederaufnahme der zuvor konkret benannten Datenabnahme und
des Paketabschlusses. Veröffentlichung und neue Funktionen bleiben getrennt.

## Prüfaufbau, abgeschlossen 11:48

- Netzteil: BatteryStatus 2. Bestehende Minuten-Sicherung ein Prozessbaum.
- App SHA256 LF-normalisiert:
  `4a8ca5a1a73c7873275497c38f7368f542785a97f1712e21a20b60faed25fe97`.
  Rules: `6a110898ab00f682a3c1fc026881c87ec63f339c5dee5ebc0b94f04a8fdecfa3`.
  Beide unverändert gegenüber den 46 gezielten SDK-Abnahmen.
- Server 8097 liefert App nach LF-Normalisierung identisch zum Arbeitsbaum.
  Syntax, Version, CSP und APP_SHELL durch vorhandenen Standprüfer grün.
- `alle_pruefen.js` und `abnahme_runde.js` binden den gemeinsamen echten
  SDK-Helfer in denselben Quellstand ein. A16-Testhash bindet ihn zusätzlich.
  `x_abnahme_hash.js` verwendet die tatsächlichen Hashblöcke und virtuelle
  Dateiinhalte: Helfer-/Teständerung erkannt, keine Quelldatei verändert.
  Fester Wrapper-Vorstand `5afdb7cd70f8bc84e117a82fcf3b39838ff0398b`
  scheitert genau an „A16-Testhash ignoriert diagnose_karten_konflikt.js“.
- `ladegeraet.ps1`: zwei getrennte Demo-Projekte 8081/8082, getrennte
  Websocket 9150/9151, Hub 4410/4411, Logging 4510/4511; beide eigenen
  Prozesse werden beim Cleanup erfasst. Besetzter Port führt zum Abbruch.
  Genau den Startblock separat ausgeführt, ohne Git-/Deploy-Schritte:
  beide Emulatoren gestartet. Besetzter-Port-Gegenprobe startet keinen
  weiteren Prozess. Aktuelle Regelquelle für beide Demo-Projekte über die
  lokale Emulator-API geladen, jeweils HTTP 200.
- Regelprüfung: aktueller Repo-Prüfer in vorhandener Windows-Umgebung,
  eigener Prüfemulator 8085. 238/238 einschließlich erlaubter/verbotener
  Zugriffe. Vollständiger Log gelesen; erwartete PERMISSION_DENIED-Ausgaben
  sind Teil der Negativfälle. Kein Regel-Deploy.

Belege unter `../sicherung/tests/`: `abnahme-hash-3.18.30.log`,
`abnahme-hash-gegenprobe-3.18.30.log`,
`abnahme-emulator-start-3.18.30.json`,
`abnahme-emulator-besetzt-3.18.30.log`,
`abnahme-emulator-regeln-3.18.30.log`, `abnahme-regeln-3.18.30.log`.

## Gesamtlauf, um 11:57 angehalten

**12:06: Ursache belegt und Prüfattrappe korrigiert.** Acht A/B-Paare:
Vorstand 7/8 grün, einmal 138 ms; Entwurf 0/8, erste Bewertung 284–617 ms.
Trace einer Bewertung: 252 ms vollständig im Stub-Timer; CPU-Profil
hauptsächlich clone/listenerMelden/dsnap. Neuer Tagesantwort-Batch löste
globale Attrappenmeldung aus und las unberührte Karten erneut.
Nur `stubs.js` korrigiert: konkrete Batchpfade, passende Listener und
gemeinsame Meldung aller betroffenen Dokumente. `x_stub_batch.js` grün
für unberührte Karte, gemeinsame Änderung/Löschung und gefilterte Abfrage;
feste Gegenprobe 315bb0e rot genau beim unnötigen Lesen (2 statt 0).
Erste reine Fixturefehler separat erhalten; erfolgreiche Proben tragen `-2`.
Original-Tempotest vollständig unverändert frisch grün (alle fünf Größen,
zehn 3000-Karten-Bewertungen höchstens 71 ms, Grenze 100 ms, CPU4x).
Volle Ausgaben gelesen. Produkt, Rules und echte SDK-Quellen unverändert.
SDK-Helfer importiert aus stubs.js ausschließlich AUTH, dessen Quelltext
unverändert ist; Firestore vollständig echtes SDK. Daher gelten die
16 A14/A15- und acht A17-Fälle weiterhin, keine künstliche Wiederholung.

Frischer Gesamtlauf jetzt neu am gemeinsamen Stand
`e595b5b6312244cdc5ecc07ba0b0b7c287207a6f909bf2a41b4e61d1b00e1923`,
158 Tests, ohne Fortsetzen. Log `abnahme-gesamt-2-3.18.30.log`,
TEMP `adrabic-pruefstand-gesamt/e595b5b6312244cd/`.
Frühere rote Protokolle bleiben erhalten. Affe/Runden-Auswertung/Abschluss offen.

Zwischenstand 12:24: 32/158 abgeschlossene Tests grün, alle32 vollständigen
Logs gelesen (auch beschreibende Geometrie-/Lageausgaben). Kein weiterer
Fehler belegt. Original-Tempotest im Gesamtlauf erneut grün, max61ms für
die zehn 3000er-Bewertungen. Lauf87583/Node18936 bleibt aktiv; dies ist
keine fertige Gesamtabnahme. Bereits gelesene Logs: t_317 bis
t_erinnerung_zeit in der alphabetischen Runnerliste.

Zwischenstand12:31: 47/158 grün, alle47 vollständigen Ausgaben gelesen.
Auch Scrolltest im Gesamtlauf grün; vier aktuelle Rundenfotos tatsächlich
angesehen und unter `../sicherung/tests/abnahme-rundenfotos-3.18.30/`
gesichert. Beschreibende Tempoausgaben enthalten längere Tabwechsel:
Fortschritt209ms/max233ms Bildlücke, große Erstansicht445ms. Das sind keine
automatisch durch Exit0 verschwundenen Messungen/keine Flüssigkeitszusage.
Keine neue Ursache oder Produktregression daraus behauptet. Abnahme läuft.

Belege: `abnahme-bestand-ab-3.18.30.log`, `abnahme-bestand-spur-3.18.30.log`,
`abnahme-stub-batch-2-3.18.30.log`,
`abnahme-stub-batch-gegenprobe-2-3.18.30.log`,
`abnahme-bestand-nachlauf-3.18.30.log`; Trace/Profil TEMP
`adrabic-bestand-spur/` (Diagnose, kein eigener App-Leistungsbeleg).

13 abgeschlossene Prüfungen grün. `t_bestand_tempo.js` rot: beim ersten
Bewerten mit 3000 Karten 207 ms lange Aufgaben, Grenze 100 ms (CPU 4x).
App-Messung dabei gradeCard 24 ms; daraus allein folgt keine Ursache.
Alle 14 Abschlusslogs vollständig gelesen. Runner samt gerade laufendem
Browser beendet, Originalprotokolle erhalten. Keine Abnahme/kein Commit.

Diagnose ab 11:58: acht abwechselnde Paare des Originaltests (nur 3000
Karten), gleicher Browser/CPU4x und aktive unveränderte Assertions.
Vorstand fest `315bb0e9fb4ae9da74882fb35400ee90213437db` (3.18.29),
gegen aktuellen Entwurf. Ausgabe `abnahme-bestand-ab-3.18.30.log`.
`x_ab_bestand_tempo.js` ist Messhilfe, keine Abnahme; ein roter Lauf bleibt rot.

Quelle `3795bfc5fa122e28403fa33a30eaf51ea82251725a0e891779211b4bf3fb8aeb`.
158 Tests einschließlich 13 Rundentests. Start ohne `--fortsetzen`,
Chrome unter `C:/Program Files/Google/Chrome/Application/chrome.exe`,
PRUEF_PORT 8097. Hauptlog `abnahme-gesamt-3.18.30.log`; Einzelquellen und
Ausgaben unter TEMP `adrabic-pruefstand-gesamt/3795bfc5fa122e28/`.
Diese müssen vollständig gelesen werden, Exit 0 allein genügt nicht.

A14/A15 16 und A17 acht am identischen Produkt-/Rules-/Helferstand bleiben
als abgeschlossene Vorbelege erhalten. Kein bloßer erneuter SDK-Lauf.
A16 ist Bestandteil des nun erforderlichen allgemeinen Runnerlaufs.
Zufallstests, Runden-Auswertung und abschließende Gegenprüfung stehen aus.
Echte iPhone-/PWA-/Auth-/Rechtsbelege bleiben in den bestehenden Listen offen.
