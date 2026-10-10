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

Gezielter Abschluss 02:18: **fünf SDK-Fälle und fünf betroffene Browsertests
grün**, vollständige Ausgaben gelesen. `t_karten_blatt`,
`t_karten_snapshot`, `t_sprung` (vier Breiten ohne Sprung),
`t_kontrast` (0 Funde auf Handy/Desktop/iPad quer, hell/dunkel),
`t_a11y` (Handy/hell/ruhig, Namen/Labels/Verzögerungen ohne Fund).
Logs `plan/sicherung/tests/a17-t_*.log`; `a17-t_snapshot.log` ist der
ausdrücklich ausgeschlossene falsche Dateiaufruf. Syntax/Stand/Diff grün.
Keine neue Vollabnahme oder vollständige WCAG-Abnahme behauptet.

Weiter mit Anschlussvorbereitung in Repo-Reihenfolge und gezielter
risikobezogener Datenprüfung, ohne bereits grüne identische Tests zu
wiederholen. Paket H bleibt bis zur großen Datenabnahme und dem Commit
gesperrt. A17 bleibt wie A14–A16 „in Arbeit“, weil Paketabschluss offen ist.

## Zwei weitere gezielte Datenproben, 10.10.2026 03:09

App und Rules bleiben bei den oben genannten SHA256-Werten. Daten-Skill
weiter angewandt; kein Produktbau. Zwei bisher fehlende Einzelproben in
`diagnose_formular_konflikt.js` ergänzt und mit echtem SDK ausgeführt:

- `Notiz-nach-fremder-Loeschung`: B löscht k4 tatsächlich per SDK, A erhält
  den Snapshot bei offenem Notizentwurf. Speichern meldet „Karte gelöscht“;
  vor und nach dem Versuch liefert der Server 404. Nach Bestätigung bleibt
  der eingegebene Notiztext im Blatt. Keine gelöschte Karte wieder angelegt.
- `Offline-Notiz-nach-fremder-Bewertung`: A speichert nur eine Notiz offline.
  SDK-Cache bestätigt genau diesen Text mit `hasPendingWrites=true`, bevor B
  dieselbe Karte bewertet. Nach Wiederverbindung bestätigt der Server die
  Notiz und erhält sämtliche geprüften Bewertungsfelder samt fremder Kennung.

Andere Karte k6 und JavaScript-Fehler werden in beiden Fällen geprüft.
Vollständige grüne Logs gelesen:
`a17-formular-fremde-loeschung-2.log`, `a17-formular-offline-notiz.log`.
Es sind zwei zusätzliche Einzelbelege, kein vollständiger neuer 7er-Lauf.
Kein Neustart/PWA, echter Auth-Wechsel oder Tageszähler-Nachweis in diesen
beiden Proben. Die vorherigen fünf Fälle und große Abnahme bleiben wie oben.

Der erste Löschlauf `a17-formular-fremde-loeschung.log` war wegen zweier
`.dlg`-Elemente im Testselektor rot, bevor die Erhaltungsprüfung fertig war.
Nur den Selektor auf den tatsächlichen Meldungsdialog eingeschränkt;
404-/Entwurf-/Fremdkarten-Erwartungen unverändert. Roter Log erhalten.

Fallauswahl abgesichert: unbekannter `--fall` wird vor SDK-Start abgewiesen,
statt ohne ausgeführte Fälle Exit 0 zu melden. Negative Eingabe
`unbekannte-negative-Probe` ergibt erwartetes Exit 1 und die genaue Meldung;
Wrapper prüft beides. Vollständiger Log:
`a17-formular-fallauswahl-negativ.log`. Keine Testgrenze gelockert.

## Fortsetzung auf neuen Betreiberauftrag, 10.10.2026 09:33

Nachricht mit Beobachtungen zu 3.18.26 und Wunsch nach umfassenden späteren
Prüfroutinen zuerst wortgetreu samt Bild gesichert. Keine dieser neuen
Ideen gebaut; bestehende Datenprüfung mit Daten-Skill fortgesetzt.

Neue Einzelprobe `Textkorrektur-nach-fremder-Bewertung`: A bearbeitet die
Übersetzung von k5 mit vorhandenem Rückfallzähler. B bewertet dieselbe
Karte; A empfängt die bestätigte neuere Bewertung vor dem Speichern.
Der Übersetzungsentwurf bleibt erhalten. Server übernimmt korrigierten
Text und den bestehenden beabsichtigten Rückfallreset auf 0; Stufe,
nextReview, ersteBewertung und maxStufe bleiben wie die fremde Bewertung.
Die neue Bewertungsbasis entspricht exakt deren bestätigter Kennung;
Rules akzeptieren den gezielten Reset. Andere Karte/JS-Fehler kontrolliert.
Grüner Einzelbeleg am unveränderten App-SHA 4a8ca5a1/Rules 6a110898:
`a17-textkorrektur-fremde-bewertung.log`, vollständige Ausgabe gelesen.

Gleiche Probe gegen feste Ausgangsquelle 97cbdcc samt App-Patch, SHA
05269ebd: tatsächlich Stufe 0 statt fremd bestätigter 3. Exit 1 und genaue
Stufenverlustmeldung im Wrapper geprüft; vollständiger Log
`a17-textkorrektur-gegenprobe-97cbdcc.log` gelesen. Kein erneuter Produktfix
nötig; bestehender A17-Fix schützt auch diese Kombination.

Katalog jetzt acht Fälle, nur neue Einzelprobe ausgeführt; kein vollständiger
Achter-/Paketlauf. Echter SDK/Demo-Emulator, Auth-Attrappe, Worker blockiert;
kein Geräte-/PWA-/Lernwirkungsnachweis. Große Abnahme bleibt später.

## Gezielter Abschluss 10.10.2026, nach Weiter-Auftrag

Alle **acht A17-SDK-Fälle gemeinsam grün** am unveränderten App-SHA
4a8ca5a1 und Rules-SHA 6a110898. Vollständige Ausgabe gelesen:
`a17-formular-acht-finale-gezielte-abnahme.log`. Damit ist der begonnene
A17-Prüfschritt nach den drei Ergänzungen abgeschlossen; kein weiterer
Fallbau aus diesem Abschluss abgeleitet. Große Paket-/Rundenabnahme bleibt
wie beauftragt später, Status A17 deshalb weiterhin in Arbeit.
