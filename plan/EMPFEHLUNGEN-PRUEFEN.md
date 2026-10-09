# Empfehlungen und Modellrechnungen vor dem Bericht prüfen

Betreiber 09.10.2026: „stelle sicher dass "solche Fehler" nicht wieder
passieren“. Anlass: gekoppelte Starttermine, unbegründete Kopplung von
Runden- und Tagesmenge, Empfehlung für ein gar nicht simuliertes Verhalten.

Diese Regeln gelten vor einer Empfehlung, nicht erst vor dem Produktbau.
Sie ergänzen LEHREN § 1.7, § 5.3 und die Gegenprüfung; keine zweite Bauliste.

## Vor jeder Zahlenrechnung

1. Fragestellung und Varianten benennen: Was wird verändert, was bleibt
   gleich, welche Aussage kann das Modell überhaupt prüfen?
2. Annahmen getrennt von Nutzerbeobachtungen notieren. Synthetische
   Bestände, Antwortquoten und Verhalten niemals als gemessenen Alltag ausgeben.
3. Behauptete Eingangsverteilungen unabhängig von ihrer Erzeugungsformel
   prüfen: pro Gruppe statt nur über die gesamte Menge, gültige Daten,
   eindeutige IDs und unveränderte nicht ausgewählte Daten.
4. Mindestens die konkret bekannte falsche Eingabe als Negativfall behalten.
   Die Prüfung muss sie abweisen, bevor ein Ergebnis als gültig gespeichert wird.
5. Tatsächlichen Codepfad prüfen, nicht nur eine herausgelöste Formel.
   Zähler, Auswahl, Wiederholung, Abbruch, Voraussetzungen und Freigaben
   gehören zum Verhalten. Isolierte Prüfung und echter Browser bleiben getrennt.
6. Einzelläufe und Annahmen sichern, Quell-/Werkzeug-/Hilfsmodulhash und
   Modellversion angeben. Ein grüner Exit und eine große Laufzahl belegen
   nur die tatsächlich kontrollierten Kriterien.

## Vor jeder Empfehlung

Für jede wesentliche Empfehlung schriftlich diese Zuordnung nennen:

| Aussage | Beleg oder Annahme | Gegenargument/Alternative | Geltungsgrenze |
|---|---|---|---|
| Was wird konkret empfohlen? | Codebefund, Messung, Primärquelle oder ausdrücklich Produkturteil | Welcher Nachteil oder welches Gegenbeispiel bleibt? | Für welche Nutzer, Bedingungen und welches Verhalten gilt der Beleg? |

Pflichten:

- Gegen Betreiberentscheidungen und bereits vorhandene Funktionen prüfen.
  Eine vorhandene Funktion umbenennen oder einen früheren Wunsch verletzen
  ist keine belegte Verbesserung.
- Das empfohlene Verhalten muss zum geprüften Verhalten passen. Dauerhafter
  harter Deckel belegt weder freiwilliges Weiterlernen noch einen temporären
  Rückkehrmodus. Eine Rundengröße bestimmt keine passende Tagesmenge.
- Last, Wartezeit, Motivation und Erinnerungsleistung getrennt behandeln.
  Ohne Gedächtnismodell oder Abrufmessung kein Lernwirkungsurteil. Ohne
  Nutzerbeobachtung keine behauptete Motivationsverbesserung.
- Alternativen mit vergleichbaren Voraussetzungen beurteilen. Unbegrenzte
  Zeit für eine Variante und ein Arbeitslimit für eine andere ergeben
  keinen fairen Vergleich ihrer Lernwirksamkeit.
- Unsicherheit darf zu „noch nicht empfehlen“ führen. Fehlende Erkenntnisse
  sind zuerst eine Recherche-/Prüfaufgabe, keine automatisch an den Betreiber
  weitergereichte technische Entscheidung.
- Ergebnis nicht „perfekt“, „optimal“, „schadet nicht“ oder „fertig geprüft“
  nennen, wenn diese Aussage nicht selbst nachgewiesen ist.

## Automatische Sicherung für den konkreten Vorfall

`node plan/werkzeuge/t_simulations_eingaben.cjs` prüft alle sechs
Tagesdeckel-Szenarien und weist absichtliche Fehler ab, einschließlich
der ursprünglichen Index-Kopplung. `tagesdeckel_simulation.cjs` führt
die unabhängige Eingangsprüfung, ihre Negativfälle und den Audit der
Original-Codepfade selbst vor dem langen Lauf aus.
Fehler verhindert die Erzeugung einer neuen Ergebnisdatei.

`node plan/werkzeuge/tagesdeckel_audit.cjs --ergebnis` prüft danach
Original-Codepfade, Verteilung, Zähler, alle Einzelwerte und Hashes.
Ergebnisdatei nennt ausdrücklich, dass Gedächtniswirkung, freiwilliges
Weiterlernen, temporäre Begrenzung und optimale Menge nicht validiert sind.

Automatik kann Datenfehler und fehlende Prüfschritte blockieren. Sie kann
die Qualität einer sprachlichen Empfehlung nicht vollständig erzwingen.
Die Zuordnung Aussage–Beleg bleibt Pflicht des berichtenden Agenten.
