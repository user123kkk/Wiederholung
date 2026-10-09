# Gegenprüfung der Tagesdeckel-Vorlage, 09.10.2026

**Vorbeugung ergänzt auf Betreiberauftrag:** Modellversion 3 führt eine
unabhängige Eingangssperre, ihre Negativfälle und den Original-Codeaudit
automatisch vor dem langen Rechenlauf aus. 14 Eingangsprüfungen und neun
Auditfälle grün. Das absichtlich wieder falsch gebaute echte Kommando
bricht vor Erzeugung einer Ergebnisdatei ab. Modellzahlen unverändert;
Version-2-Daten zusätzlich unter den Testbelegen erhalten. Ergebnis nennt
den Hash der Eingangsprüfung und die nicht validierten Lernbehauptungen.
Allgemeine Regeln: `plan/EMPFEHLUNGEN-PRUEFEN.md`.

Auftrag: „überprüfe alles, es sll perfekt sein, selbst deine wertlose
empfehlung du ki.“ Prüfumfang: die gesamte Tagesdeckel-Rechnung und ihre
Empfehlung, tatsächliche Bewertungs-/Auswahlpfade, Gegenbeispiele,
Betreiberentscheidungen und Primärquellen. Keine vollständige neue
Abnahme der App, kein Veröffentlichen. Der Betreiber möchte den großen
Lauf später gesammelt mit „ladegerät“; Akku bei Beginn 34 %.

## Eigenes Ergebnis kritisch geprüft

Die vorige Vorlage war keine ausreichende Grundlage für den Bau eines
Tagesdeckels. Mehr Modellläufe allein hätten das nicht korrigiert.

| Befund | Warum er zählt | Korrektur |
|---|---|---|
| Stufe und Starttermin beide aus i abgeleitet | Bei Stufe 3 waren alle 50 Karten gleichzeitig fällig. „Gleichmäßig im Intervall“ war falsch; Alltagszahlen verzerrt. | Terminphasen innerhalb jeder Stufe separat verteilen. Feste Gegenprobe c78e986 rot: 66 statt 37 anfangs fällig. |
| Antworten unabhängig von Wartezeit | Eine wartende Karte vergisst im Modell nichts zusätzlich. Weniger Antworten oder weniger Wartetage beweisen keine bessere Lernwirkung. | Keine Gedächtnis-Rangfolge oder optimale Tageszahl aus der Lastrechnung ableiten. |
| Nach Nicht immer sofort Sicher angenommen | Mehrfaches Nicht und Fast nach Nicht fehlen in den Zahlen; reale Runden können länger dauern. | Günstige Annahme ausdrücklich beibehalten, echte Gegenfälle über gradeCard prüfen; Zahl gilt nicht als reale Obergrenze. |
| Nur eine tägliche Auswahl, kein Weiterlernen | Meine Empfehlung mit freiwilligem Weiterlernen wurde nicht getestet. | Empfehlung nicht als Ergebnis der Rechnung ausgeben. |
| Deckel alle 180 Tage statt nur bei Rückkehr/über einer Schwelle | Dauerhafter Deckel ist nicht identisch mit dem zurückgenommenen bedingten 60/30-Vorschlag oder einem zeitweiligen Rückkehrmodus. | Zahlen ausdrücklich auf den dauerhaften Modell-Deckel beschränken. Keine Aussage, ein bedingter oder vorübergehender Deckel hätte dieselben Zahlen. |
| Tagesziel an Rundengröße gekoppelt | Länge einer Runde und gewünschte Tagesarbeit sind verschiedene Dinge. Die vorhandene Rundengröße wurde als passende Tagesmenge umgedeutet. | Diese Kopplung zurücknehmen. |
| Globales Ranking empfohlen | Betreiber 06.10. wollte Bereich für Bereich, keine Mischung; im geöffneten Bereich sind auch neue Karten möglich, in weiteren nur zugelassene Wiederholungen. | Bereichsregel als Entscheidung erhalten. Ein anderes Ranking wäre ein eigener Lernlogik-Vorschlag. |
| Fünf Folgen, nur zusammengefasste Zahlen gespeichert | Fünf synthetische Folgen ergeben keine Sicherheit über alle Nutzer. Verteilungen und Ausreißer sind im Mittel verdeckt. | Jeder Durchlauf wird mitgespeichert. Keine statistische Zuverlässigkeit oder Repräsentativität behaupten. |
| Ergebnis nur mit App-Hash, zwei Befehle nötig | Werkzeugänderung nicht identifiziert; gewöhnlicher Lauf konnte den Zusatzvergleich wieder aus dem Ergebnis entfernen. | Ein Befehl erzeugt alle 90 Varianten, Modellversion sowie App- und Werkzeughash mit vereinheitlichten Zeilenenden. Eigene Audit-Ergebnisdatei; alte Daten erhalten. |

Das sind nachgewiesene eigene Modell-/Begründungsfehler. Sie bedeuten
nicht, dass ein freiwilliges Ziel grundsätzlich schlecht ist oder dass
der derzeitige Scheduler automatisch falsch ist.

## Tatsächlichen Code statt nur Rechenformel geprüft

`plan/werkzeuge/tagesdeckel_audit.cjs` lädt die unveränderten Funktionen
`gradeCard`, `startSession`, `dueCardsFor`, `offeneWiederholungen` und die
Bereichswechsel aus `app.js`. UI-Ausgabe und Cloud-Schreibzugriffe werden
hier ersetzt; die Auswahl, Bewertungsqueue und Zähler werden echt ausgeführt.
Das ist eine isolierte Prüfung der Datenpfade, keine Browser-/Cloud-Abnahme.

Acht Auditfälle:

1. Terminphasen jeder Stufe unterscheiden sich in der Häufigkeit höchstens
   um eins. Feste Gegenprobe gegen c78e986 verletzt diese Behauptung.
2. Neue Karte im Betreiber-Konto: erstes Sicher bleibt auf 0 und in der
   Queue, zweites Sicher bringt Stufe 1. Zähler n=1, w=1.
3. Stufe 8: zweimal Nicht, dann Fast endet mit Stufe 3 und morgen;
   w=3. Eine Karte ist deshalb weder eine Antwort noch eine feste Zeitspanne.
4. Nicht dann Sicher: Betreiber Stufe 6/morgen, normaler Nutzer Stufe 7/
   34 Tage bei neutraler Streuung. Die Vorabregel gilt nicht für alle.
5. Eine neue Karte im geöffneten Bereich füllt ein Limit 1, obwohl ein
   anderer Bereich eine Wiederholung hat. Die heutige Auswahl ist kein
   globales Ranking „alle Wiederholungen zuerst“.
6. Andere Bereiche: heute und 14 Tage liegende Karten zugelassen;
   15 Tage liegende, neue und gesperrte Karten nicht zugelassen.
7. Deckel 1 bei zwei neuen Karten: eine Zulassung, zwei Antworten,
   eine wartende Karte unverändert. Zulassung ist keine Antwortzahl.
8. Modell und echtes gradeCard erzeugen bei einem kleinen ersten Tag mit
   neuen Karten/allgemeinem Sicher dieselben Stufen, Termine und Antwortzahlen,
   jeweils mit und ohne Betreiber-Vorabregel. Dieser Abgleich beweist nur
   den geprüften Fall, nicht Gleichheit aller möglichen Runden.

Das Browser-Umfeld `t_runde_bereiche.js` ist zusätzlich am aktuellen
3.18.29 grün: Auswahl, Bereichswechsel, Rückgängig, persistierte
Bewertungen und Zähler; tatsächlicher Desktop-Checkout auf Port 8096,
Chrome/Playwright mit Firebase-Attrappe. Keine echten Cloud-Daten benutzt.
Die acht Auditfälle sind grün. Der zusätzliche Ergebnischeck kontrolliert
Hashes, alle 90 eindeutigen Gruppen, sämtliche 450 Einzelläufe und
Zähl-/Zusammenfassungs-Invarianten.

## Primärquellen statt Übertragung aus einem Forum

- Das [offizielle Anki-Handbuch](https://docs.ankiweb.net/manual/deck-options#maximum-reviewsday)
  beschreibt einen täglichen Review-Grenzwert und weist bei verborgenem
  Rest auf die Möglichkeit hin, den Grenzwert zu erhöhen. Es nennt damit
  ein bestehendes Produktmuster; es beweist keine passende Zahl für Adrabic.
- Im Abschnitt [Review Sort Order](https://docs.ankiweb.net/manual/deck-options#review-sort-order)
  priorisiert Relative overdueness die eher vergessenen Karten.
  `nachDringlichkeit` in Adrabic priorisiert dagegen den kleineren relativen
  Rückstand. Die frühere Übertragung aus FSRS-Forumsaussagen ist keine
  unabhängige Bestätigung dieser App-Reihenfolge.
- [Tabibian et al., Optimizing Human Learning](https://arxiv.org/abs/1712.01856)
  leiten optimale Wiederholungszeiten für bestimmte Gedächtnismodelle aus
  Erinnerungswahrscheinlichkeiten ab und untersuchen synthetische sowie
  Duolingo-Daten. Das stützt modellabhängige Planung, keine universelle
  Anzahl und keine Überlegenheit eines unkalibrierten Adrabic-Deckels.

Die konkrete Schlussfolgerung für diese App ist meine Ableitung:
Ohne ein validiertes Gedächtnismodell und passendes Nutzerziel darf die
Rechnung keine lernwissenschaftlich optimale Auswahl oder Tagesmenge behaupten.

## Korrigierte Rechnung

Werkzeug: `node plan/werkzeuge/tagesdeckel_simulation.cjs`.
Datei: `tagesdeckel-audit-ergebnis-2026-10-09.json`.
90 Vergleichsgruppen, je fünf Folgen, je 180 Tage erfolgreich abgeschlossen.
Gleiche explizite Antwortannahmen wie zuvor. 85/10/5 und 60/20/20 bezeichnen
Wahrscheinlichkeiten, keine exakt festgelegten Anteile in jeder kleinen Runde.
Startphasen korrigiert, alle Einzelläufe mit App-/Werkzeughash gesichert.
Kein privater Datenbestand verwendet.

Für 1100 synthetische Karten nach 60 Tagen Pause sind jetzt 1051 anfangs
fällig. Bei nominal 85/10/5:

| Dauerhafte tägliche Auswahl | Letzter Erstbesuch des ursprünglichen Rückstands | Nach 180 Tagen noch nie besuchte ursprüngliche Karten, Mittel | Beobachteter größter Tageswert an Antworten | Wartende Kartentage insgesamt, Mittel |
|---|---|---|---|---|
| Alle | Tag 1 | 0 | 1107 | 0 |
| 20, aktuelle Priorität | nicht innerhalb 180 Tagen | 165,8 | 25 | 71688,4 |
| 30, aktuelle Priorität | Tag 151–166 | 0 | 35 | 41388 |
| 60, aktuelle Priorität | Tag 42–49 | 0 | 68 | 13045,8 |
| 30, älteste zuerst | Tag 36 | 0 | 36 | 60261,8 |

Diese Werte sind Beobachtungen **innerhalb des Modells**, keine garantierten
Obergrenzen für reale Runden. „Letzter Erstbesuch“ und wartende Kartentage
bewerten verschiedene Dinge; keine dieser Größen allein entscheidet über
Lernwirkung. Der korrigierte Aufbau behält das Rückstandsrisiko bei, aber
die früheren exakten Zahlen gelten nicht für den korrigierten Aufbau.

Zusätzliche Grenzen bleiben: synthetischer Anfangsbestand statt zuvor
simuliertem Alltag; keine Gedächtnisabnahme während des Wartens; kein
zeitliches Arbeitsbudget für Alle; kein mehrfaches Nicht im Rechenmodell;
kein freiwilliges Weiterlernen; keine Prüfung tatsächlicher Nutzerreaktion;
keine zwei Geräte. Somit ist kein Lernverfahren als „perfekt“ abgenommen.

Belege unter `plan/sicherung/tests/tagesdeckel-audit-2026-10-09/`:
ursprüngliche Gegenprobe rot, neuer Audit, korrigierter Rechenlauf,
Browser-Bereichsrunde und Standprüfung. Originale alte Ergebnisdatei
bleibt unverändert als Verlauf erhalten.

## Empfehlung nach der Gegenprüfung

**Den vorgeschlagenen neuen dauerhaften Tagesdeckel vorerst nicht bauen.**
Meine vorige Kopplung an die Rundengröße ist zurückgenommen. Ein
freiwilliges Tagesziel bleibt eine mögliche Produktidee; die Rechnung
belegt nicht, dass es Lernen, Motivation oder Rückkehr verbessert.

Für ein freiwilliges Ziel sprechen ein überschaubarer Einstieg und ein
sichtbarer Haltepunkt. Dagegen sprechen die bereits vorhandenen begrenzten
Runden mit Weiterlernen, ein zusätzlicher Zähler samt Geräte-/Rückgängig-
Logik und die Gefahr, trotz wachsendem Rückstand „genug“ zu suggerieren.
Der Zusatznutzen gegenüber vorhandenen Runden ist noch nicht nachgewiesen.
Deshalb reicht „Weiterlernen bleibt da“ nicht als Empfehlung für den Umbau.

Begründeter nächster Schritt ist ein **abgegrenzter Rückkehr-Probelauf**,
der das vorhandene Rundenlimit mit einer zeitweiligen Tagesauswahl vergleicht.
Vorher müssen gewünschtes Tagespensum und Erfolgskriterium feststehen.
Kein automatisches Tagesziel aus 10/20/30 und keine neue Schwelle 60.
Ein Erfolgskriterium muss sowohl Belastung als auch bearbeiteten Rückstand
und den Abruf nach einer Wartezeit betrachten. Ein abgeschnittener Stapel
oder ein voller Ring allein sind kein Erfolg.

Für einen späteren Versuch gelten überprüfbare technische Bedingungen:

- Fälligkeit wartender Karten bleibt unverändert; keine Massenverschiebung.
- Gesperrter Stoff bleibt gesperrt. Bereichsfolge bleibt gemäß Freigabe.
- Rest bleibt sichtbar; begrenzter Umfang wird nicht als „alles erledigt“ ausgegeben.
- Begonnene Karte kann wiederholt werden; Nutzer kann eine Runde abbrechen.
- Zählerdefinition vor dem Bau festlegen; Mehrfachantworten, Abbruch,
  Wiederaufnahme, Rückgängig, Neuladen und zwei Geräte dürfen sie nicht verfälschen.
- Auswahlverfahren mit Gegenbeispielen für lange wartende und frisch
  fällige Karten prüfen. Keine neue Vorrangregel aus nur einem Lastmaß ableiten.
- Varianten gegenüber gleichem tatsächlichem Arbeitsaufwand vergleichen;
  „Alle“ ohne Zeitgrenze ist keine faire Lernwirksamkeits-Kontrolle.

Ein sinnvoller Versuch ist eine mögliche Umsetzungsvorlage, noch keine
Freigabe zum Einbauen neuer Lernregeln. Die App bleibt unverändert.
