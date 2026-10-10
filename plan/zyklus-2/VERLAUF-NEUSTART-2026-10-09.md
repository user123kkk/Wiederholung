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

Gezielter A16-Abschlusslauf: **17/17 SDK-Fälle grün**, vollständige Ausgabe
`plan/sicherung/tests/a16-frisch-sdk.log`. Geprüft: Ablehnung/Neustart und
mehrfaches Nachholen, Neustart vor Bestätigung, verlorene lokale Quittung,
ursprünglicher Lerntag, Reset eines zweiten SDK-Geräts, n/u/t/r am gemeinsamen
Zähler, Storage-Fehler vor Bewertung, Undo und Konto A/B/A, simulierter
Absturz vor dem Zwei-Sekunden-Versand, ungebuchte Reservierung, beschädigte
Tageskopie, Tageshinweis/Download/lokales Entfernen und Kontodatenlöschung
einschließlich Cloud-Belegen. Andere Karte k6 jeweils unverändert, außer
der ausdrücklich geprüften Kontolöschung; keine JavaScript-Fehler.

Regeln: **238/238** mit echten Repo-Regeln am Windows-Emulator,
`a16-regeln-windows-1.log`. Der Regelprüfer nutzt Firestore 12.19.0,
die App-Prüfung weiterhin den echten SDK 10.14.1; Auth ist dort eine
Attrappe. A14/A15-Nachlauf **16/16** plus Konflikthinweis/Download/Entfernen
grün: `a16-frisch-karten.log`. Feste Quelle 591d03e weiterhin erwartungsgemäß
rot auf den ursprünglichen Verlust; Wrapper erkennt genau diesen Befund
und endet Exit 0: `a16-frisch-gegenprobe.log`. Vollständige Ausgaben gelesen.

Eigene Gegenprüfung fand im ersten Entwurf einen neuen Sprung von
76–114 px: der bestehende Hinweis erschien bei jeder noch regulär
gebündelten Antwort. `a16-t_sprung.log` bewahrt den roten Lauf. Ursache
behoben, frische Prüfung auf vier Breiten ohne Sprung:
`a16-abschluss-t_sprung.log`. Kontrast, a11y-Grundchecks, Undo-Tageszähler
und drei verspätete Konto-/Abmeldeantworten ebenfalls grün; vollständige
Ausgaben `a16-final-t_*.log` gelesen. Tageshinweis in vier Breiten und zwei
Themen ohne horizontalen Überlauf/Kontrastfund; vertikale Nachprobe ebenfalls
grün: `a16-tageshinweis-geometrie-3.log`, Seite und Bewertungszeile innerhalb
der Bildschirmhöhe. Die erste Zusatzmessung traf noch nicht neu gezeichneten
Fixture-Zustand, die zweite alte svh-Einheiten direkt nach Resize. Explizit
neu zeichnen und 250 ms Resize-Beruhigung im Fixture ergänzt; Grenzen
unverändert, beide frühen Logs behalten. `a16-tageshinweis.png`
erneut visuell geprüft. Frühe Ergebnisse werden nicht als Abschluss des
geänderten Quellstands übernommen.

Ein späterer Nachlauf traf SDK-Zeitlimit und HTTP 500. Das tatsächliche
Emulator-Rootlog zeigt wiederholte Rückkanalabbrüche mit über 10.000
wartenden Nachrichten und NETWORK_ERROR; Ausschnitt unter
`a16-emulator-netzfehler-ausschnitt.log`, rote Läufe erhalten. Frischer
Demo-Emulator **1.22.0**, gleiche Port-/Projekt-/Regelquelle, INFO statt
FINE, anschließend vollständiger 17-Fälle-Lauf grün. Testzeitlimit bleibt
30 Sekunden; keine Erwartung wurde für den Emulatorfehler abgeschwächt.

### Grenzen und spätere gesammelte Abnahme

Zusatzprüfung in der Nacht 10.10.2026, **zwei neue einzelne SDK-Fälle grün**
am unveränderten App-/Regelhash oben. Keine Behauptung eines vollständigen
19-Fälle-Nachlaufs: Der ursprüngliche gezielte Abschluss bleibt 17/17.

- Positive Wiederherstellung: echte gespeicherte Kartenaktion, passende
  noch vorbereitete Tageskopie; nach Neustart/mehrfachem Prüfen Tageszähler
  genau 1 und Cloud-Kartenkennung bestätigt. Andere Karte k6 unverändert.
- Negative Eingangsprüfung: abweichende Reset-Epoche zwischen Kartenkopie
  und Tageskopie; Beitrag bleibt vorbereitet, Tageszähler 0, keine Umbuchung.
- Fixture stellt kontrolliert einen früheren lokalen Speicherstand nach.
  SDK-Cache bestätigt die ausstehende Kartenkennung vor Neustart;
  ausschließlich der Tagesversand wird im Testkontext gesperrt. Beim
  Neustart ist der normale Produktpfad wieder aktiv. Kein echter Prozesskill
  oder PWA-Kaltstart. Frühe Proben ohne diese vollständige Versandbarriere
  bewahren ihre roten Logs; kein Produktfehler aus ihnen abgeleitet.
- Absichtlich deaktivierte Wiederherstellung in separater TEMP-App erzeugt
  exakt 0 statt 1; Gegenprobe Exit 1, Wrapper akzeptiert nur diesen Befund.
  Mutantenhash `5f117d985fc83e47b95219edc5dbd980002854228cc3ecbdf80efd264f6fab78`;
  eindeutiger Quellanker `beitrag.status = "bereit"; verlaufAktionSpeichern(beitrag);`
  durch Kommentar ersetzt. Produktdatei bleibt unverändert.

Finale vollständige Logs gelesen: `plan/sicherung/tests/a16-nacht-kartenkopie-aktivierung-4.log`,
`a16-nacht-kartenkopie-epoche-3.log`, `a16-nacht-aktivierung-gegenprobe.log`.
Testquelle `t_tagesantworten_sdk.js` enthält jetzt 19 Fälle; neue Prüfungen
einzeln über `--fall=`. Große Abnahme bleibt verschoben.

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

### Prüfer-Fallauswahl abgesichert, 10.10.2026 04:06

Bei der gezielten Gegenprüfung fiel eine echte Prüferlücke auf:
`t_tagesantworten_sdk.js --fall=ungueltige-a16-eingabe` führte keinen Fall
aus und endete trotzdem mit Exit 0 / „0 A16 SDK-Faelle gruen“.
Vollständiger Vorbefund: `a16-fallauswahl-vor-schutz.log`. Dieser Lauf ist
ausdrücklich kein grüner Produktnachweis. Ausgangsdatei im Minuten-Patch
des festen Commits `78281409af90473701956858c19b12b346a4cdb2`; vor Änderung
direkt ausgeführt. SHA256 der damaligen Werkzeugdatei mit ihren tatsächlichen
Dateibytes: `d7e64e0ae38f67679f8395b0e713d1c41f5032e12a8b79afa448de026bc61a0d`.

Nur der Prüfer wurde geändert: Katalog der vorhandenen 19 Fälle,
Eingangsprüfung unbekannter/leerer Auswahl vor SDK-Start, eindeutige und
vollständige Fallnamen sowie zwingend ein erfolgreicher ausgewählter Fall
bzw. alle Katalogfälle vor einem grünen Schluss. Keine Testfälle entfernt,
keine fachliche Erwartung oder Zeitgrenze gelockert; App/Rules unverändert.

Unbekannter und leerer `--fall` ergeben jeweils Exit 1 mit genauer
Eingangsablehnung, durch Wrapper geprüft. Positive Auswahlkontrolle führt
`Speicherfehler-keine-Bewertung` erfolgreich aus und meldet genau einen
Fall; dabei wurden auch sämtliche 19 Definitionen gegen den Katalog
abgeglichen. Nur dieser eine Produktfall lief erneut, gezielt wegen des
geänderten Prüfers. Keine neue vollständige 19er-/Paketabnahme behauptet.

Vollständige Logs gelesen: `a16-fallauswahl-negativ.log`,
`a16-fallauswahl-leer-negativ.log`, `a16-fallauswahl-positive-kontrolle.log`.
App-SHA im positiven Lauf `4a8ca5a1a73c7873275497c38f7368f542785a97f1712e21a20b60faed25fe97`,
Rules-SHA weiterhin `6a110898ab00f682a3c1fc026881c87ec63f339c5dee5ebc0b94f04a8fdecfa3`.
Syntax/Diff grün. Die älteren 17 plus zwei Einzelbelege behalten ihre
jeweiligen Quellstände und Grenzen; neue Prüfung ersetzt sie nicht.

### Weiterprüfen im selben Windows-Ordner

- HTTP-Server 8097 liefert app.js/index.html/styles.css identisch zum
  Arbeitsbaum. `CHROMIUM=C:/Program Files/Google/Chrome/Application/chrome.exe`,
  `PRUEF_PORT=8097`. SDK-Werkzeuge benutzen Demo-Projekt
  `demo-adrabic-karten-audit` auf 8082; niemals parallel seeden.
- Frischer Emulator läuft direkt als Java-Prozess 6828, Version 1.22.0,
  INFO und aktuelle absolute Repo-Regelquelle. Vor einer Regeländerung
  diesen Prüfemulator passend neu laden/starten; nicht annehmen, dass ein
  Firebase-CLI-Dateiwächter läuft. Ausgaben im TEMP-Ordner
  `adrabic-karten-audit-emu/a16-frisch.{out,err}.log`.
- Regelnachweis 238 nutzt separat Windows-konfigurierten Emulator 8085
  und `C:/Users/USER/.cache/adrabic-regeln-emu/firebase-a16.json`,
  `regeln-pruefung-a16.mjs` mit absolutem RULES_FILE. Git-Bash-/c-Pfadlauf
  war ungültig und wird nicht als grüner Regelnachweis verwendet.
- Eine Minuten-Sicherung läuft verborgen: PID 12532 (Kind 16564),
  `plan/werkzeuge/minuten_sicherung.sh`. Ausgabe/Fehler unter TEMP
  `adrabic-minutensicherung-a16.{out,err}.log`. Gebündeltes Kopieren hält
  gleiche Dateien/Filter. Übergabe 22:56, Patch 22:57:45 geprüft; Patch
  enthält den endgültigen App-/Teststand und den Sicherungsaufruf.

Status: A16/DATEN-11 in Arbeit, gebaut und gezielt geprüft im uncommitteten
Entwurf 3.18.30. Große Gesamtabnahme auf Betreiberwunsch später gesammelt.
A14/A15 und vorhandene Skill-Dateien bleiben erhalten. Kein neues Paket
begonnen; entschiedene Anschlussarbeit nur lesend vorbereitet unter
mehrwert/VORBEREITUNG-LERNRUNDE-2026-10-09.md.
