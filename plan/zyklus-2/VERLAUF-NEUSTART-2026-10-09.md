# DATEN-11: abgelehnte Tagesantwort nach Neustart verloren

## Nachweis und Grenze

09.10.2026, echter Firestore-SDK 10.14.1 und aktuelle Repo-Regeln auf
lokalem Demo-Emulator 8082. Auth ist eine Attrappe. Keine Produktivdaten.
Feste Quelle: automatisch gesicherter Commit `591d03e`, dessen `app.js`
plus dessen `plan/sicherung/entwurf-aktuell.patch`, ausschließlich die
App-Datei in einem eigenen TEMP-Ordner wiederhergestellt. Tatsächlicher
normalisierter App-SHA256:
`44c05375c7511ba420fbabe5b52cea6599ecf7c1ea3e67e77b52428aa30347d9`.
Regel-SHA256:
`216bdb9edf7a434e82c1c474749e17b9fbace0fbadf79bf79f6a850fc70ea825`.

Das Fixture ergänzt ausschließlich beim Tageszähler-Schreiben ein von
den echten Regeln verbotenes Feld. Damit entsteht eine echte serverseitige
`permission-denied`-Ablehnung. Es stellt keinen echten Ausweisablauf nach
und behauptet keine Häufigkeit dieses Ereignisses. Die Kartenbewertung
selbst wird bestätigt. Kein fremder Verlauf-Reset oder Epochenwechsel.

## Ergebnis

1. Ohne Ablehnung bleiben Karte und Tagesantwort nach Neustart erhalten.
2. Mit Ablehnung und Nachholen ohne Neustart wird die Tagesantwort genau
   einmal übertragen; der Tageszähler ist anschließend 1.
3. Mit Ablehnung und Neustart im selben Browserprofil bleibt die bestätigte
   Karte erhalten. Zuvor lokale Tagesantwort 1 und offene Differenz 1;
   anschließend beides leer, Cloud-Zähler 0 und Speicherfehler null.
   Erneutes Nachholen stellt die Antwort nicht wieder her.

`diagnose_verlauf_neustart.js --schutz` endet deshalb absichtlich Exit 1.
Original- und fester Wiederholungslauf sowie erweiterter Kontrolllauf
liegen unter `plan/sicherung/tests/karten-fix-2026-10-09/`.
Die vollständigen Ausgaben wurden gelesen. Kein JavaScript-Fehler.

## Ursache und Vorschlag

`persistVerlauf` gibt atomare Differenzen an den SDK. Nach echter
Ablehnung trägt es sie wieder in `verlaufOffen` ein. Diese Map und
`verlaufAbgelehnt` liegen ausschließlich im Arbeitsspeicher; Auth-Aufbau
und Neustart verlieren sie. Das neue Kartenjournal betrifft nur
Kartenfelder und ist kein dauerhafter Erhalt des Tagesprotokolls.

Erhalt und genau einmal Nachholen müssen gemeinsam gelöst werden.
Ein bloßes Speichern und erneutes Senden von increments genügt nicht:
Verlorene Bestätigung könnte sonst doppelt zählen. Quelle/Konto/Tag/Art
und Verlauf-Epoche müssen zum ursprünglichen Beitrag gehören. Fremder
Reset darf nicht durch automatisches Umbuchen ausgehebelt werden.
Dies ist technische Speicherung, keine neue Definition eines Lerntags.

## Abnahme vor einer Behebung

- Die feste Gegenprobe oben muss rot bleiben; reparierter Stand bewahrt
  bestätigte Karte, nachholbare Tagesantwort und sichtbare Ablehnung.
- Neustart vor Bestätigung, nach Bestätigung und nach Ablehnung prüfen.
  Wiederholtes Nachholen zählt jeden Beitrag genau einmal.
- Offline, Kontowechsel/Abmeldung, Undo und Mitternacht prüfen; Beiträge
  wirken nur auf Ursprungskonto und ursprünglichen Tag.
- Fremder Reset invalidiert alte Epochen weiterhin. Keine neue
  Serien-/Umbuchungsregel aus R15-127 ableiten.
- Speicherfehler, Datenschutz, echte Regeln sowie andere Antwortarten
  prüfen. Keine ungezählte Bewertung durch einen abgebrochenen Versuch.

Status: A16/DATEN-11 offen, mittel. Noch kein Produkt-Fix. A14/A15 bleiben
separat gezielt geprüft; deren Gesamtabnahme ist vom Betreiber verschoben.
