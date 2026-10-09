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
