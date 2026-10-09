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

## Behebung im Entwurf 3.18.30, 09.10.2026

Jede Tagesantwort erhält eine eigene Kennung und wird vor dem Buchen lokal
unter `adrabic-tagesantwort-<uid>/<id>` gespeichert. Konto, ursprünglicher
Tag, Antwortart, Differenz und Reset-Epoche bleiben unverändert. Ein Batch
schreibt das Increment und einen unveränderlichen Beleg unter
`users/<uid>/tagesantworten/<id>`. Die Regel prüft beide Änderungen mit
`getAfter`; ein zweites Set derselben Kennung wird zusammen mit seinem
Increment abgewiesen. Nachholen wartet auf den SDK-Stapel und prüft den
Serverbeleg: bestätigt bedeutet lokale Kopie entfernen, fremde Epoche
bedeutet aufbewahren ohne Umbuchen. Abgelehnte Beiträge bleiben sichtbar
und exportierbar. Normale noch gebündelte Beiträge zeigen keinen
kurzzeitigen Fehlerhinweis; nach Neustart bleiben sie auch offline sichtbar.

Eine Kartenaktion trägt ihre reservierte Tagesantwort im bestehenden
Kartenjournal mit. Ein Speicherfehler vor erfolgreicher lokaler Sicherung
bricht normale Kartenbewertung/Gesehen/Undo ab. Eine ungebuchte Reservierung
ohne Kartenkopie wird nicht automatisch übertragen. Beschädigte Kopien
bleiben exportierbar und sperren neue normale Bewertungen. Datenschutz und
Kontolöschung berücksichtigen die neuen lokalen Kopien und Cloud-Belege.

Quellstand des Abschlusslaufs (normalisiertes LF, SHA256):

- App: `05269ebdb1d17a5a23e1ef8eeb048cc3745e866dbd8c4e94052e9789f1ccd0c8`.
- Regeln: `6a110898ab00f682a3c1fc026881c87ec63f339c5dee5ebc0b94f04a8fdecfa3`.

Gezielte Abschlussläufe laufen noch; maßgeblich werden deren vollständige
Ausgaben unter `plan/sicherung/tests/a16-abschluss-*.log`. Erster A16-Lauf:
12/12 SDK-Fälle grün. Regeln: 238/238 mit echten Repo-Regeln am Windows-
Emulator, `a16-regeln-windows-1.log`. Der Regelprüfer nutzt Firestore 12.19.0,
die App-Prüfung weiterhin den echten SDK 10.14.1; Auth ist dort eine
Attrappe. Feste Quelle 591d03e bleibt als Verlust-Gegenprobe erhalten.

Eigene Gegenprüfung fand im ersten Entwurf einen neuen Sprung von
76–114 px: der bestehende Hinweis erschien bei jeder noch regulär
gebündelten Antwort. `a16-t_sprung.log` bewahrt den roten Lauf. Ursache
behoben, frische Prüfung auf vier Breiten läuft. Frühere Ergebnisse werden
nicht als Abschluss des geänderten Quellstands übernommen.

### Grenzen und spätere gesammelte Abnahme

- Kein ganzer Prüfstand, keine neue Rundenabnahme/Affen und kein installierter
  iPhone-PWA-Kaltstart. Browser-SDK-Prüfungen blockieren den Service Worker.
- Ein zusätzlicher Cloud-Schreibvorgang und ein kleiner Beleg je Antwort;
  Belege bleiben bis zur Kontolöschung. Eine spätere Löschstrategie darf
  den Schutz gegen verlorene Bestätigungen nicht aushebeln.
- Kartenaktion und Tagesbeitrag sind weiterhin getrennte Cloud-Schreibwege.
  Das Journal erhält Fehler zum Nachholen; es macht daraus keine gemeinsame
  Cloud-Transaktion und definiert keine neue Lern-/Serienregel.
- Antwortarten n/u/t/r werden am gemeinsamen Zähler geprüft; das ist keine
  vollständige Abnahme aller Text-/Ruhetag-/Üben-Oberflächen. Texte-Probelauf
  bleibt unverändert. Ursprünglicher Tag wird kontrolliert verschoben;
  kein echter nächtlicher Gerätetest.
- Regeln müssen vor einem späteren Hosting-Deploy eingespielt werden.
  Vorher darf dieser Entwurf nicht veröffentlicht werden.

API-Grundlagen: [Firebase atomare Batches und getAfter](https://firebase.google.com/docs/firestore/manage-data/transactions),
[waitForPendingWrites](https://firebase.google.com/docs/reference/js/firestore),
[Unterkollektionen bei Kontodokument-Löschung](https://firebase.google.com/docs/firestore/manage-data/delete-data).

Status: A16/DATEN-11 in Arbeit, gebaut im uncommitteten Entwurf 3.18.30.
Gezielte Abschlussprüfung läuft; große Gesamtabnahme auf Betreiberwunsch
später gesammelt. A14/A15 und vorhandene Skill-Dateien bleiben erhalten.
