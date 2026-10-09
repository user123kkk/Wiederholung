# Tagesdeckel: Rechnung und Entscheidungsvorlage, 09.10.2026

Auftrag: Tagesdeckel nach einer Pause, Fälligkeiten unverändert lassen;
vor einer Empfehlung rechnen. Der ungeprüfte Vorschlag „ab 60, dann 30“
vom 08.10. ist zurückgenommen. Betreiber 09.10.: weiterarbeiten und
„ladegerät“ später für ein größeres gemeinsames Stück verwenden.

## Was diese Rechnung beantworten kann

Sie vergleicht Arbeitslast und Warteschlangen unter ausdrücklich festen
Annahmen. Sie misst weder tatsächliches Behalten noch Motivation oder
Abbruchwahrscheinlichkeit. Eine wissenschaftlich optimale Zahl oder eine
Garantie „schadet niemandem“ lässt sich daraus nicht ableiten.

Werkzeug: `plan/werkzeuge/tagesdeckel_simulation.cjs`.
Aufruf: `node plan/werkzeuge/tagesdeckel_simulation.cjs`.
Zusätzlicher Reihenfolge-Vergleich am selben Produktquellstand:
`node plan/werkzeuge/tagesdeckel_simulation.cjs --reihenfolge`.
Ergebnis: `tagesdeckel-ergebnis-2026-10-09.json`, einschließlich Version,
SHA-256 der tatsächlich gerechneten `app.js` und aller Einzelvergleiche.
Der gleiche Quellstand liefert das gleiche Ergebnis.

## Modell und seine Grenzen

- Die Bewertungsregeln, Kalenderrechnung, Abstandsstreuung und
  `nachDringlichkeit` werden aus der tatsächlichen `app.js` geladen.
  Die Regeln werden nicht als zweite Formel nachgebaut.
- 180 Kalendertage ab 09.10.2026; fünf feste Zufallsfolgen je Vergleich.
  Kartenbezogene Antwortfolge und Streuung sind zwischen den Varianten
  gepaart. Ein späterer Besuch derselben Karte erhält dieselbe Antwort;
  zusätzliches Vergessen durch das Warten ist **nicht** modelliert.
- Sechs Szenarien: Alltag mit 300 Karten; 20 Tage Pause mit 300 Karten;
  60 Tage Pause mit 1100 Karten; 300 neue Karten gleichzeitig;
  20 Tage Pause mit danach täglich 5 bzw. 15 neuen Karten.
  Die Stufen und Termine sind synthetisch, keine privaten Nutzerdaten.
  Die Termine liegen gleichmäßig innerhalb des jeweiligen Stufenintervalls,
  verschoben um die Pause. Es wird keine Vorgeschichte des Nutzers behauptet.
- Erstantworten: entweder alle Sicher, 85 % Sicher / 10 % Fast / 5 % Nicht,
  oder 60 % / 20 % / 20 %. Das sind Belastungsfälle, keine gemessenen Quoten.
  Nach Nicht folgt in der Runde einmal Sicher. Tatsächlich kann Nicht
  mehrfach folgen; reale Runden können deshalb noch länger dauern.
- Betreiber-Vorabregeln sind eingeschaltet: Nicht dann Sicher kommt morgen,
  neue Karte nach erstem Sicher noch einmal. Ein eigener Gegenfall prüft
  den normalen Nutzer ohne die neue Doppelabfrage.
- Deckel 20, 30 und 60 werden als **Vergleichswerte**, nicht als Empfehlung
  gerechnet. „Alle“ lässt jede heute fällige Karte zu. Ein Deckel zählt
  verschiedene zugelassene Karten, neue eingeschlossen; Wiederholungen
  derselben Karte in der Runde werden immer abgeschlossen.
- Nur eine tägliche Auswahl, kein freiwilliges Weiterlernen. „Eine Runde
  20“ ist in diesem Modell dasselbe wie „Deckel 20“. Mehrere Runden sind
  im echten Produkt möglich; deshalb ist ein Rundenlimit kein Tagesdeckel.
- Ein zugänglicher Bereich, keine Schlösser, keine Bereichs-Regler,
  kein Rückgängig, keine manuellen Stufenänderungen, keine konkurrierenden
  Geräte. Bereichsübergreifende Auswahl wird unten separat am Code abgewogen.
- Wartende Karten behalten ihre Stufe und Fälligkeit. Das wird an jedem
  simulierten Tag geprüft. Gezählt werden Antworten, zugelassene Karten,
  wartende Kartentage, Rest am nächsten Tag nach 180 Tagen und der letzte
  Erstbesuch des ursprünglichen Rückstands. „Einmal angefasst“ bedeutet
  weder „dauerhaft gelernt“ noch „alles für immer abgetragen“.

## Am aktuellen Code zusätzlich nachgewiesen

1. `verlauf[heute].w` zählt **Bewertungen**, nicht verschiedene Karten.
   Ein Nicht und das spätere Sicher erhöhen w zweimal. Bei einer neuen
   Karte erhöht das erste Sicher n, das zweite Sicher bereits w. Der Satz
   „ohne neue Felder, das Erledigte steht in w“ aus dem alten Agentenbericht
   ist deshalb für einen Deckel verschiedener Wiederholungskarten falsch.
   Auch n+w ist eine Antwortzahl, keine Zahl verschiedener Karten.
2. `ui.heuteJeBereich` zählt ebenfalls Antworten und lebt nur im
   Arbeitsspeicher. Nach Neuladen ist er kein verlässlicher Tagesverbrauch.
3. `startSession` priorisiert den geöffneten Bereich. Andere Bereiche folgen
   erst, wenn in der Runde Platz bleibt; `offeneWiederholungen` schließt dort
   neue und mehr als 14 Tage liegengebliebene Karten aus. Ein Deckel „über
   alle Bereiche, die dringendsten zuerst“ braucht daher eine bewusste neue
   Auswahl; nur `slice(0, 30)` im geöffneten Bereich erfüllt das nicht.
4. „Mehr als 60 fällig“ beweist keine Pause: Auch ein frischer Import kann
   groß sein. Tage ohne Karten-Antworten beweisen ebenfalls keine Lernpause,
   etwa beim Texte-Probelauf. Ein allgemeiner Schutz vor einer großen
   Tagesmenge ist ehrlicher als eine unbelegte Pausenerkennung.

## Berechnete Ergebnisse

90 Vergleiche mit jeweils fünf Durchläufen erfolgreich abgeschlossen
(72 Tagesmengen-Vergleiche plus 18 Reihenfolge-Vergleiche).
Die Selbstprüfung kontrolliert echte Stufenregeln, Kalenderwechsel,
Betreiber-/Normalnutzer-Unterschied, reproduzierbare Folgen, neutrale Wirkung
eines zu großen Deckels und unveränderte wartende Karten. Der vorhandene
Produkt-Schnelltest `t_lernlogik.js` ist zusätzlich mit 12/12 grün.

Die folgende Tabelle verwendet ausschließlich den Modellfall 85/10/5.
„Letzter Erstbesuch“ zählt ab dem ersten Rückkehrtag. Der Spitzenwert ist
die größte Antwortzahl eines Tages aus den fünf Durchläufen.

| Synthetischer Rückstand | Tagesauswahl | Letzter Erstbesuch des ursprünglichen Rückstands | Höchstens Antworten an einem Tag | Nach 180 Tagen noch nie besuchte ursprüngliche Karten, Mittel |
|---|---|---|---|---|
| 300 Karten, 20 Tage Pause; 250 anfangs fällig | Alle | Tag 1 | 265 | 0 |
| derselbe | 20 | Tag 17–18 | 28 | 0 |
| derselbe | 30 | Tag 11–12 | 38 | 0 |
| derselbe | 60 | Tag 5–6 | 67 | 0 |
| 1100 Karten, 60 Tage Pause; 1038 anfangs fällig | Alle | Tag 1 | 1092 | 0 |
| derselbe | 20 | in keinem Durchlauf innerhalb von 180 Tagen | 25 | 175,6 |
| derselbe | 30 | Tag 158–177 | 36 | 0 |
| derselbe | 60 | Tag 42–49 | 68 | 0 |

Das liegt auch an der heutigen Sortierung: frisch fällige Karten kommen
vor lange liegenden. Wiederkehrende Karten verbrauchen Plätze, bevor der
alte Rückstand vollständig besucht wird. Die naive Rechnung 1038/30 ≈ 35
Tage trifft deshalb nicht zu. Im ungünstigeren Antwortmuster 60/20/20 bleiben
mit Deckel 30 im Mittel 513,4 ursprüngliche Karten nach 180 Tagen unbesucht;
selbst Deckel 60 lässt 267,2 unbesucht. Auch wenn alle Antworten Sicher
sind, lässt Deckel 20 in vier von fünf Durchläufen ursprüngliche Karten
bis zum Ende liegen. Die Nummer allein löst die Auswahlfrage nicht.

Weitere Belastungsfälle:

- 300 neue Karten mit Betreiber-Doppelabfrage, alle Sicher: Deckel 20
  braucht 98–100 Tage, bis die letzte neue Karte zum ersten Mal drankommt;
  vorhandene Wiederholungen haben Vorrang. 20 Karten am ersten Tag ergeben
  dabei 40 Antworten. Für einen Normalnutzer ohne Vorabregel sind es 20.
- Bei 5 neuen Karten pro Tag und Deckel 30 werden im 85/10/5-Modell von
  895 hinzugekommenen Karten im Mittel nur 369,4 eingeführt; 525,6 warten
  noch. Das ist keine gemessene Auslastung der Nutzer, sondern zeigt eine
  mögliche dauerhaft zu große Stoffzufuhr.
- „Alle“ trägt den Rückstand sofort ab, verlangt im großen Fall aber
  mehr als 1000 Antworten an einem Tag. Das Modell nimmt an, dass der
  Nutzer das durchhält; es ist deshalb keine Empfehlung für „Alle“.

Zusätzlicher Vergleich „Älteste zuerst, 30“: Im großen 85/10/5-Fall
kommt die letzte ursprüngliche Karte in allen fünf Durchläufen an Tag 35
zum ersten Mal dran, statt an Tag 158–177. Dafür steigt die Summe aller
wartenden Kartentage von 41143,2 auf 60263,2: Während der alte Rückstand
vorne drankommt, müssen andere Wiederholungen länger warten. Der
ursprüngliche Rückstand allein wäre deshalb ein irreführendes Erfolgskriterium.
Ohne gemessene Gedächtniswirkung kann aus diesem Modell weder die alte
noch die neue Sortierung als überlegen freigegeben werden. Ein fairer
Kompromiss benötigt beide Kriterien, nicht nur den letzten Erstbesuch.

## Empfehlung für die Umsetzung

**Ein freiwilliges Tagesziel statt einer festen Sperre. Keine Fälligkeit
umschreiben und keine wissenschaftlich optimale Deckelzahl behaupten.**
Das Ziel entlastet die erste Rückkehr; „Weiterlernen“ bleibt erreichbar.
Ein Ziel darf nie „alles erledigt“ oder „morgen ist alles gut“ behaupten,
wenn weiterhin Karten fällig sind. Die bisher vorgeschlagene Formulierung
„Für heute genug. Morgen geht es weiter.“ ist dafür zu absolut.

Vorschlag für einen ehrlichen Abschluss: „Dein Tagesziel ist erreicht.
Weitere Karten warten noch.“ Dazu sichtbares „Weiterlernen“ und die echte
Restzahl. Dieser Wortlaut ist ein Vorschlag, keine Betreiber-Freigabe.

Vor einem Bau sind drei Punkte konkret zu entscheiden:

1. Zielgröße: an die vorhandene gewählte Rundengröße 10/20/30 koppeln;
   bei „Alle“ eine begrenzte erste Runde anbieten. **Kein stiller neuer
   Standard 30 ab Schwelle 60.** Wer mehr schafft, kann weiterlernen.
   Ein gemessener persönlicher Bedarf und ein gewünschtes Tagespensum sind
   verschieden; die App darf einen großen Rückstand nicht durch ein
   steigendes Pflichtziel beantworten.
2. Auswahl über alle freigegebenen Bereiche, einschließlich bisher
   liegender Karten. Alte Karten dürfen nicht unbemerkt monatelang
   ausgeschlossen bleiben. Ein fairer Anteil für den Rückstand oder eine
   andere Reihenfolge muss eigens gegen aktuelle Fälligkeiten geprüft werden.
   Die Lastrechnung kann deren Gedächtniswirkung nicht entscheiden.
3. Zählen: Tagesziel zählt verschiedene bearbeitete Karten, alle Antworten
   einer begonnenen Karte dürfen die Runde abschließen. Ein dauerhaftes
   Tagesziel braucht dafür eine absichtlich entworfene Zählung mit
   Neuladen, Rückgängig und zwei Geräten. Bestehende w/n-Zähler umdeuten
   würde Kalender, Statistik und Synchronisierung beschädigen.

**Bauzustand:** keine App- oder Datenänderung. Zahl, Wortlaut und Auswahl
sind noch nicht freigegeben. Erst nach dieser Entscheidung ein kleiner
Betreiber-Probelauf; Lernregeln und Datenänderungen brauchen ihre
Gegenproben, Rundentest und abschließenden Gesamtlauf. „ladegerät“ darf
mehrere fertig geprüfte Änderungen zusammen veröffentlichen.
