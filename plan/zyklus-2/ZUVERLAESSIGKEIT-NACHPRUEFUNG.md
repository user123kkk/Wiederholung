# Verlässlichkeit: konkrete Nachprüfung nach der Tagesdeckel-Sicherung

Betreiberauftrag 09.10.2026: ein System, auf das er sich verlassen kann;
auch unbekannte Fehler im übrigen Code suchen. Erst die laufenden
Tagesdeckel-Sicherungen abschließen, dann weiter. Ergänzt die bereits
offene Nachprüfung aus AUFTRAG § 3.6, ersetzt sie nicht.

## Ziel und ehrlicher Stand

Verlässlichkeit heißt hier: keine unbemerkten Datenverluste, keine fremden
Kontorückmeldungen, nachvollziehbare Lernregeln, sichtbare Fehler und
korrekter Wiederanlauf. Ein grüner Test beweist seinen Fall, keine
vollständige Fehlerfreiheit. Lernwirksamkeit ist eine eigene Frage und
wird nicht aus technisch korrektem Speichern abgeleitet.

Ausgangsstand App 3.18.29. Tagesdeckel nur Analyse, keine neue Lernregel.
Neu geprüft: Eingangssperre, Original-Bewertungs-/Bereichspfade und die
Bereichsrunde im Browser. Die ganze App ist dadurch noch nicht neu abgenommen.
Die folgenden vorhandenen Tests werden nicht als erneut bestanden geführt.

## Reihenfolge und erste tatsächlich gelesene Stellen

| Durchgang | Nachweis, der gebraucht wird | Anfangspunkt und vorhandene Prüfungen |
|---|---|---|
| 1. Speichern und Kontowechsel | Verspätete Antworten wirken nur auf ihr Ursprungskonto. Abgelehnte/offline gespeicherte Bewertungen werden korrekt angezeigt und nachgeholt, ohne alte Aktionen wiederzubeleben. | `app.js` persistCardGrade, persistAll, persistVerlauf, verlaufZusammen; `t_konto_schreibantwort`, `t_konto_fortsetzungen`, `t_settings_kontowechsel`, echte Mehrgeräte-Tests. persistCardGrade bereits gelesen: Kontoreferenz wird eingefroren, späte Rückmeldung geprüft, abgelehnte Felder separat gemerkt. Das ist ein Codebefund, noch keine neue Gesamtabnahme. |
| 2. Lernen und Rückgängig | Stufe, nächster Termin, Höchststand, Queue, Tageszähler und freigeschalteter Stoff bleiben auch bei Wiederholung/Abbruch/Rückgängig konsistent. | gradeCard, undo-Fortsetzung, Bewerten/Speichern; `t_lernlogik`, `t_runde_bereiche`, `t_runde_rest`, Serien-/Zeitgrenzen-Tests. Operator-Vorabregeln getrennt vom normalen Nutzer. |
| 3. Import, Löschen, Backup und Schlösser | Rundlauf Export→Import bewahrt die zugesicherten Daten. Rückgängig stellt vollständig wieder her. Gesperrte Lektionen erscheinen nie durch Nebenwege. | tatsächliche Import-/Export-/Löschpfade, firestore.rules und Emulator; bestehende Daten-/Backup-Prüfungen zuerst inventarisieren, nicht ihre Abdeckung vermuten. |
| 4. Asynchrone UI und reale Rückwege | Schließen, neuer Dialog, Reiter-/Kontowechsel oder verlorenes Netz lassen keine späte Antwort den neuen Zustand überschreiben. | Einstieg/Rechtsdialog als bekanntes Gegenbeispiel, Konto-/Dialog-Tests; reale Zurück-Handlung statt Fensterschließen. |
| 5. Geräte und Neustart | Nach Refresh, Service-Worker-Wechsel, kleiner Höhe, Tastatur und Offline-/Online-Wechsel bleibt die Handlung bedienbar und der gespeicherte Zustand korrekt. | vorhandene Geräte-/Layouttests plus offener G7/G4 am echten iPhone. Chromium und Attrappe nicht als iPhone oder echte Firebase-Prüfung ausgeben. |

## Wie ein Durchgang abgenommen wird

**Begonnen, 09.10.2026 nach Abschluss der Eingangssperre:**
persistCardGrade, karteRef, abgelehntesNachholen und Auth-Rücksetzung gelesen.
Kontoreferenz bei Bewertung eingefroren, späte Antwort an dieses Konto
gebunden; beim Kontowechsel wird die Liste abgelehnter Bewertungen geleert.
`t_konto_schreibantwort.js` aktuell grün für Fehler vor dem Wechsel,
nach dem Wechsel und nach Abmeldung. Feste Gegenprobe c3a6aec reproduziert
den alten Fehler in allen drei Fällen; Prüfung kann den Fehler erkennen.
Browser/Firebase-Attrappe, kein echter SDK-Offline-Nachweis.
Logs unter `plan/sicherung/tests/tagesdeckel-audit-2026-10-09/`,
`konto-schreibantwort-aktuell.log` und `konto-schreibantwort-gegenprobe.log`.

**09.10.2026, Prüfpunkt bestätigt:** Echter Firestore-SDK, eigener Demo-
Emulator 8082, zwei getrennte Gerätecaches und Repo-Regeln. Altes Undo
und früheres Offline-Sicher überschreiben jeweils fremdes späteres Nicht
einschließlich Rückfall. Beide ohne Speicherfehlermeldung. Andere Karte
unverändert. Feste Quelle 7142b93, Schutzprüfung Exit 1 für beide Fehler.
Neue hohe Funde DATEN-9/10; Belege und konkreter Lösungs-/Abnahmeentwurf
in `KARTEN-KONFLIKTE-2026-10-09.md`. Noch keine Behebung/volle Abnahme.
Nächste Inventur: die übrigen Gesehen-/Rückgängig-Aufrufer und gelöschte
Karte beim Offline-Nachholen; neue Konfliktregel nicht still erfinden.

**Erledigte Inventur 09.10.2026 auf „weiter“:** Alle vier Aufrufer gelesen.
Gesehen-Undo und Offline-Gesehen an fester Quelle 7142b93 ebenfalls
stille fremde Bewertungsverluste; erweitert DATEN-9/10, kein Doppelfund.
Fremde SDK-Löschung bleibt bei Offline-Bewertung und Offline-Gesehen
auch nach ausdrücklichem Nachholen erhalten, lokale Karte verschwindet;
Repo-Regeln lehnen ab, schreibFehler gesetzt. Tagesantwort w:1/n:1 bleibt;
keine falsche Zählregel daraus behauptet. Vollständige Daten und Grenzen
in KARTEN-KONFLIKTE-2026-10-09, Log karten-rest-7142b93.log. Schutzprüfung
Exit 1 wegen beider Konflikte; kein Fix/volle Abnahme. Nächster Prüfpunkt:
abgelehnte Aktionen über Neustart, gemeinsam mit ihren Tageszählern.

**Voriger Prüfauftrag, jetzt durchgeführt:** Zwei Geräte bewerten dieselbe Karte
mit unterschiedlichen Ständen, ein Gerät ist offline; außerdem ein altes
Rückgängig. Der Kommentar vor persistCardGrade verspricht weitreichenden
Mehrgeräteschutz. Tatsächlich werden absolute Bewertungsfelder dieser
Karte geschrieben, keine Transaktion in diesem Pfad. Der Schutz anderer
Karten darf nicht als Beleg für Konfliktfreiheit derselben Karte gelten.
Den wirklichen SDK-Ablauf, bestehende Entscheidung und Tests erst prüfen;
hier noch keinen neuen Produktfehler oder passende Konfliktregel behaupten.
G-075 betrifft atomare Tageszähler und ist kein automatischer Nachweis
für konfliktfreie Bewertung derselben Karte.

1. Original-Code lesen, Datenweg vom Auslöser bis zu Speicherung und
   Rückmeldung verfolgen. Invarianten und mögliche Unterbrechungen nennen.
2. Vorhandene Tests lesen: prüfen sie genau diese Handlung, den richtigen
   Quellstand und das echte Fehlerbild? Veraltete Kommentare/Behauptungen
   als solche kennzeichnen; nicht einfach Testnamen abhaken.
3. Gezielt Gegenfälle bauen: verspätet, abgelehnt, doppelter Tipp,
   Abbruch, Rückgängig, neuer Tag, anderes Konto/Gerät, gelöschte Karte.
   Geeignete echte SDK-/Emulatorfälle behalten; Attrappen an Regeln messen.
4. Kritische Tests mit bewusst falscher Variante oder festem fehlerhaftem
   Vorstand gegenprüfen. Erkennt ein Test seinen Fehler nicht, ist zuerst
   die Prüfung zu korrigieren. Keine Testgrenze lockern, um Grün zu erzeugen.
5. Neue bestätigte Funde in AUFGABEN aufnehmen: Schwere, Codebeleg,
   reproduzierbare Gegenprobe und konkrete Abnahme. Ein Verdacht bleibt
   Verdacht. Mechanische Fehler innerhalb des Auftrags beheben;
   neue Lernregeln/Recht/Lehrstoff gemäß vorhandenen Betreiberregeln.
6. Ergebnisse und offene Grenzen protokollieren. Erst bei passendem Beleg
   „behoben“ nennen; alte Fehlerlogs und Zahlen nicht überschreiben.

Alle sieben „Nicht mehr geprüft“-Abschnitte unter befunde sind Teil der
Inventur: DATEN, VERW, BEW, EIN, CODE, EINST, LERN. Sie dürfen nicht hinter
den neu aufgefallenen Themen verschwinden.

## Abschluss und Voraussetzungen

Die risiko-orientierte Code-/Testinventur kann nach dem aktuellen Abschluss
beginnen. Keine neue Produktfunktion und kein Texte-Umbau daraus ableiten;
Texte-Probelauf bleibt bis zur vorgesehenen Auswertung geschützt.
Auf Akku nur Codeprüfung und betroffene Einzeltests. Gesamtlauf/Affe und
Veröffentlichung später gemeinsam über „ladegerät“, gemäß Betreiberwunsch.

Die vollständige Nachprüfung nach den großen Paketen bleibt bestehen:
zweimal frisch über alle Bereiche ohne neuen kritischen oder hohen Fund.
Materiale offene Funde/Gerätenachweise werden ausdrücklich genannt; zwei
grüne Runden sind keine Garantie, dass nie wieder ein Fehler auftaucht.
Wissenschaftliche Quellen werden für Aussagen über Lernwirkung benötigt;
technische Zuverlässigkeit braucht vor allem reproduzierbare Code- und
Datenbelege. Beides bleibt getrennt.

## Betreibersteuerung 09.10.2026: große Abnahme später

Der Betreiber verschiebt Gesamtlauf/Affen/Veröffentlichung ausdrücklich auf
später oder das Ende. Lauf an caf81d58f8c5f144 beendet, alle Ausgaben erhalten.
16 SDK-Schutzfälle und 222 Regeln bleiben gezielte Belege des Entwurfs;
die App-Version ist nicht vollständig abgenommen und wird nicht committet.
A14/A15 bleiben offen. Weitere Nachprüfung ist erlaubt, kein neues Paket
über dem bestehenden App-Entwurf. Das freiwillige Tagesziel ist E26 und
bleibt nach Audit zurückgestellt; dies ist keine Tagesziel-Implementierung.
## Nachprüfung Tageszähler, 09.10.2026

A16/DATEN-11 mittel ist jetzt offen: bestätigte Karte bleibt erhalten,
abgelehnte Tagesantwort verschwindet nach Neustart. Feste Gegenprobe
591d03e mit dessen App-Patch und zwei erfolgreiche Kontrollen. Nachweis
in VERLAUF-NEUSTART-2026-10-09.md; noch kein Produkt-Fix. Erhalt braucht
Schutz vor doppeltem Nachholen und vor Wiederbeleben alter Reset-Epochen.
Große Abnahme auf Betreiberwunsch verschoben, 29/157 abgeschlossen mit
Exit 0; restliche Tests nicht geprüft, abgebrochener Test nicht bestanden.

Import-/Lösch-/Rückwege im Originalcode nachgelesen: neue Import-IDs,
Speicherkarten-Verweise, geführtes Zusammenführen, kontogebundener
FileReader, explizite Löschungen. Aktueller t_daten-Log vollständig gelesen:
Code/ungültiger Code/Lesefehler/Download/Einspielen/kaputtes JSON auf drei
Geräten ohne JavaScript- oder gemeldeten Kontrastfehler. Dieser Test ist
beschreibend und prüft nicht alle exportierten Felder oder Verlustfälle;
kein umfassender Rundlauf-Nachweis daraus. Verbliebene R15-112/123/124/126
Codepfade erneut gefunden, historische Belege behalten. Keine zusätzlichen
Befunde allein aus Codeansicht als neu bestätigt gezählt. Kein neuer Bau.