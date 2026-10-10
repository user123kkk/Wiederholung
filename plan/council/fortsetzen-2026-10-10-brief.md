# Neutrale Frage und anonymisierte Antworten

Soll die normale Abfragerunde optional auf demselben Gerät/Konto am selben logischen Lerntag fortsetzbar sein? Nach Karte 7 schließen/später Karte 8. Alternativ Neustart. Keine alten Antworten wieder abspielen oder zählen; nach erneutem Öffnen kein altes Undo. Nicht Üben/Schreiben/Textprobelauf. Alternativen: heutiges Neuzusammenstellen belassen, begrenzte lokale Fortsetzung, zurückstellen. Betreiber: „sei sicher es ist gut, wenn ja dann ja oder“, bedingtes Ja bei begründet positiver Prüfung. Keine Nutzerstudie oder Lernwirkungsbelege. Risiken Konto/04:00/Löschen/fremde Bewertung/offline/Zähler.

Quellen: app.js startSession/endSession/gradeCard/undoLastGrade; plan/zyklus-2/mehrwert/VORBEREITUNG-LERNRUNDE-2026-10-09.md; plan/ENTSCHEIDUNGEN-VERSTEHEN.md.

## A

Empfehlung: begrenzte lokale Fortsetzung befürworten. Nach Karte 7 später bei Karte 8 weiterzumachen erhält die selbst begonnene Aufgabe und senkt die Einstiegshürde nach Unterbrechungen. Neustart bleibt eine verständliche Alternative.

Stärkstes Gegenargument: Die gespeicherte Restfolge kann nach fremden Bewertungen, Löschungen oder Tageswechsel veraltet sein. Ein scheinbar bequemes Angebot wäre schlechter, wenn es falsche Wiederholungen oder Zähler erzeugt.

Notwendige Schutzbedingung: Nur Restfolge und erforderliche Rundeninformationen für dasselbe Konto und denselben logischen Lerntag übernehmen, mit aktuellem Kartenstand abgleichen; bei unklarem Stand verständlich zum Neustart führen. Kein altes Undo, kein erneutes Buchen vorhandener Antworten. Auch absichtlich angehängte „Nicht“-Karten korrekt erhalten.

Beleggrenze: startSession stellt heute neu zusammen, endSession entfernt die Sitzung. Der Nutzen ist eine plausible Bedienungsverbesserung, kein nachgewiesener Lernvorteil. Eine positive technische Prüfung steht für die neue Fortsetzung noch aus.

## B

Ich empfehle begrenzte lokale Fortsetzung als optionale Funktion: Nach Karte 7 kann der Betreiber später mit dem verbliebenen Rest weiterarbeiten oder eine neue Runde starten.

Stärkstes Argument: startSession stellt heute neu zusammen; eine gesicherte Restfolge würde Unterbrechungen nachvollziehbarer machen, besonders bei mehreren Bereichen und angehängten „Nicht“-Karten.

Stärkstes Gegenargument: Ein alter Rest kann nach fremder Bewertung, Löschung oder Tageswechsel überholt sein. Die Wiederaufnahme fügt deshalb eine zusätzliche Fehlerquelle neben die bereits komplexe Bewertungssicherung.

Notwendige Schutzbedingung: Nur Restkennungen und überprüfbare Rundenzähler speichern, an Konto und logischen Lerntag binden, Kartenstände vor Wiederaufnahme abgleichen; keine Bewertung rekonstruieren, keine Tagesantwort erneut buchen, lastAction verwerfen. Bei ungültigem oder nicht zuverlässig abgleichbarem Stand normal neu starten.

Beleggrenze: Der Code belegt die technische Anschlussmöglichkeit und Risiken. Bessere Lernwirkung oder tatsächlicher Bediennutzen sind nicht nachgewiesen; mein Ja gilt dem begrenzten Entwurf unter diesen prüfbaren Bedingungen.

## C

Empfehlung: begrenzte lokale Fortsetzung ist vertretbar, wenn die Schutzbedingungen nachgewiesen werden. Nach Karte 7 später bei Karte 8 weiterzumachen erhält eine unterbrochene Runde; der heutige Code stellt beim Start die Karten neu zusammen.

Stärkstes Gegenargument: Eine gespeicherte Restfolge kann veralten. Fremde Bewertungen, Löschungen oder der Tageswechsel um 04:00 können aus einer praktischen Fortsetzung eine widersprüchliche Runde machen. „Nicht“-Wiederholungen dürfen beim Abgleich nicht versehentlich verschwinden.

Notwendige Schutzbedingung: Konto und logischen Lerntag strikt prüfen, Karten samt Bewertungsstand abgleichen und bei ungeklärten Änderungen die Fortsetzung verwerfen. Offline darf ein ungeprüfter Rest keine fremde Änderung überschreiben. Kein altes Undo, kein Wiederabspielen von Antworten; wiederholtes Öffnen ohne neue Antwort muss Tageszähler unverändert lassen. Neustart bleibt wählbar.

Beleggrenze: Der Code belegt den heutigen Neustart und die Konfliktrisiken. Weniger Bedienaufwand ist plausibel; bessere Lernwirkung oder tatsächliche Nutzerzufriedenheit sind nicht nachgewiesen.

## D

Ich empfehle eine begrenzte lokale Fortsetzung als optionale Funktion, sofern die Schutzprüfungen bestehen. Für Außenstehende ist „nach Karte 7 schließen, später mit Karte 8 weiter“ leicht verständlich und passt zu alltäglichen Unterbrechungen. Der heutige Neustart stellt die Runde neu zusammen und erhält diese Erwartung nicht zuverlässig.

Das stärkste Gegenargument ist versteckter Aufwand: Eine gespeicherte Reihenfolge kann durch fremde Bewertungen, Löschungen oder den Tageswechsel veralten. Eine bequem wirkende Funktion wäre schlecht, wenn sie falsche Karten zeigt oder Antworten doppelt zählt.

Notwendige Schutzbedingung: Fortsetzung nur für dasselbe Konto, Gerät und denselben logischen Lerntag; Restkarten mit aktuellem Stand abgleichen, bei unsicherem Abgleich vorerst keine Fortsetzung anbieten. Alte Antworten und altes Rückgängig dürfen nicht rekonstruiert werden. Wiederholtes Öffnen ohne Antwort muss alle Tageszähler unverändert lassen.

Belegt sind das bisherige Neustartverhalten und die technischen Risiken. Besseres Lernen oder tatsächliche Nutzung sind damit nicht nachgewiesen.

## E

Empfehlung: begrenzte lokale Fortsetzung optional anbieten, sofern die Schutzbedingungen nachgewiesen werden. Der konkrete Nutzen ist nachvollziehbar: Wer nach Karte 7 unterbricht, kann die geplante Restfolge einschließlich vorgesehener „Nicht“-Wiederholungen fortführen. Das bestehende Neuzusammenstellen erhält diese Reihenfolge nicht.

Das stärkste Gegenargument ist der zusätzliche gespeicherte Zustand: Nach Löschung, fremder Bewertung oder Tageswechsel kann eine alte Runde fachlich überholt sein. Ein bequemer Wiedereinstieg darf dadurch keine falschen Antworten oder Zähler erzeugen.

Notwendige Schutzbedingung: Vor jeder Wiederaufnahme Konto, logischen Lerntag und Bewertungskennungen der übrigen Karten prüfen; ungültige Fortsetzung verwerfen beziehungsweise betroffene Karten sicher abgleichen. Historische Bewertungen niemals erneut ausführen, altes Undo entfernen, vollständige Runden löschen. Bewusst vorgesehene „Nicht“-Wiederholungen erhalten.

Beleggrenze: Der Code belegt den Verlust des Rundenzustands und die technischen Konfliktrisiken. Er belegt weder häufige Unterbrechungen noch besseren Lernerfolg. Daher begründetes Ja zur Komfortfunktion unter diesen Bedingungen; keine Gewissheit über Lernnutzen.
