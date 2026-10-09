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

## Ergebnis und Empfehlung

Die vollständigen berechneten Werte und die abschließende Empfehlung
werden nach der erfolgreichen Selbstprüfung in diesen Abschnitt übernommen.
Bis dahin ist diese Datei ausdrücklich eine laufende Rechnung, keine
Abnahme und keine Freigabe einer Lernregel.
