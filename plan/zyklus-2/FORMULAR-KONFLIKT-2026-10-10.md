# DATEN-12 / A17: Kartenblatt setzt fremde Bewertung zurück

10.10.2026, Nachtauftrag. Gefunden beim Abgleich der bereits entschiedenen
Anschlussarbeit „Karte in der Abfrage bearbeiten“ mit dem vorhandenen
Formular. Keine neue Abfragefunktion gebaut; technische Korrektur im
laufenden Datenpaket 3.18.30.

## Beleg vor Änderung

Echter Firestore-JS-SDK 10.14.1, aktuelle Repo-Regeln, eigener Demo-Emulator
8082 (`demo-adrabic-karten-audit`), zwei getrennte Browserprofile. Auth ist
eine Attrappe; Service Worker blockiert. Keine Produktivdaten.

1. Gerät A öffnet über Verwalten/Detail/Bearbeiten das vorhandene Kartenblatt
   von k4, Stand 1. A ändert ausschließlich das Notizfeld.
2. Gerät B bewertet dieselbe Karte mit Sicher, Server bestätigt Stand 2.
3. A erhält diesen Snapshot. Notizentwurf bleibt, Standfeld fällt auf 0.
4. A speichert die Notiz. Server übernimmt Stand 0 und die Notiz. Die
   fremde Bewertung ist tatsächlich ersetzt, keine bloße Anzeigeabweichung.

Feste Quelle **97cbdcc**: app.js plus `plan/sicherung/entwurf-aktuell.patch`
dieses Commits, ausschließlich App-Hunk in eigener TEMP-Kopie angewandt.
Normalisierter App-SHA256 vor Änderung:
`05269ebdb1d17a5a23e1ef8eeb048cc3745e866dbd8c4e94052e9789f1ccd0c8`.
Regel-SHA256 unverändert:
`6a110898ab00f682a3c1fc026881c87ec63f339c5dee5ebc0b94f04a8fdecfa3`.

`diagnose_formular_konflikt.js --fall=Notiz-nach-fremder-Bewertung` endet
Exit 1, erwartet 2 statt 0. Fester Lauf und aktuelle Wiederholung zeigen
denselben Befund; vollständige Logs unter `plan/sicherung/tests/`:
`a14-nacht-formular-sdk-2.log`, `a14-nacht-formular-gegenprobe-97cbdcc.log`.
Der Erstlauf stoppte früher an der zusätzlich erwarteten alten Feldwahl:
0 statt 1. Dies wurde als Diagnose der tatsächlichen UI behandelt; die
entscheidende Server-Erhaltungserwartung blieb unverändert.

## Ursache und Korrektur

`editCard` hält eine alte Stufe in `formDraft`. `karteSheet` bestimmt
Optionswerte aus der aktuellen Karte, aber den ausgewählten Wert aus dem
alten Entwurf. Kommt 2 statt 1 an, fehlt eine passende Option für 1; der
Browser wählt den ersten Eintrag 0. `submitCardForm` deutet jeden Unterschied
zum aktuellen Kartenstand als ausdrückliche Stufenänderung.

`patchDoc` besitzt den A14/A15-Schutz bereits: neue Ausgangskennung für
geänderte Bewertungsfelder. Er bindet die ungewollte Änderung hier an den
bereits angekommenen aktuellen Snapshot und kann Bedienabsicht nicht
erkennen. Die neuen Regeln blockieren das vorhandene Formular nicht:
manuelle Stufe und Textkorrektur/Rückfallreset sind schon vor dem Fix in
echten SDK-Kontrollen bestätigt.

Der Fix merkt nur im flüchtigen Formular, ob Stand ausdrücklich geändert
wurde. Unberührte Auswahl folgt der aktuellen Karte und wird beim Speichern
nicht als Bewertungsauftrag behandelt. Ausdrückliche Auswahl bleibt über
Neuzeichnen erhalten; unveränderter Entwurf zählt eine fremde Bewertung
nicht als eigene Änderung. Kein neuer Speicher, keine Cloud-Regel, keine
neue Stufen-/Zählregel. A14–A16 bleiben erhalten.

App-SHA256 nach Korrektur:
`4a8ca5a1a73c7873275497c38f7368f542785a97f1712e21a20b60faed25fe97`.

## Abnahme und Grenzen

Gezielte SDK-Abnahme: **fünf Fälle grün** im vollständigen finalen Lauf
`a17-formular-sdk-fix-2.log`, Ausgabe vollständig gelesen. Manuelle Stufe,
Textkorrektur/Rückfallreset, Notiz nach fremder Bewertung, bewusste Stufenwahl
über fremden Snapshot und unberührtes Blatt/Escape. Bei Notiz bleibt Server-
Stufe 2 und dieselbe fremde Bewertungskennung erhalten. Bewusste Auswahl 0
bleibt auch nach Snapshot als ausdrücklicher Auftrag möglich. Alle Fälle
kontrollieren andere Karte k6 und JS-Fehler. Produktdateien von Server 8097
gegen Arbeitsbaum app.js/index.html/styles.css/sw.js gleich bestätigt.

`t_karten_blatt` grün auf Handy 390/dunkel+hell, klein 360 und iPad 820;
vollständige Ausgabe gelesen. Keine neuen Kontrastfunde oder Sprünge im
Formular, Eingaben/Entwurfs-Abbruch/Speichern wie zuvor. Ein falsch aus der
Vorbereitung übernommener Aufruf `t_snapshot.js` wurde mit MODULE_NOT_FOUND
abgewiesen: kein Produktbefund, kein grüner Test. Tatsächliche Datei per
Inventar gefunden: `t_karten_snapshot.js`, gezielter Nachlauf gestartet.

Geplante betroffene Regression: Kartenblatt, Snapshot sowie Sprung/Kontrast/
a11y-Grundchecks. Große Gesamtabnahme, Rundenabnahme/Affen und echter
installierter iPhone-Test bleiben ausdrücklich später; kein App-Commit,
kein Hosting-/Regel-Deploy. Frühere A16-Belege gelten weiterhin für ihren
jeweiligen festgehaltenen Hash, nicht als neue Gesamtabnahme dieses App-Stands.

## Nächster Schritt

Erweiterte SDK- und betroffene Browserprüfungen abschließen und vollständige
Logs lesen. Danach weitere Anschlussvorbereitung in Repo-Reihenfolge;
kein Paket H über dem uncommitteten Datenentwurf.
