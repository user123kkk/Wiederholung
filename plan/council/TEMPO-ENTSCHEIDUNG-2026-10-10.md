# Tempo-Abnahme: konkrete Entscheidungsvorlage vom 10.10.2026

Status: ausgearbeitet, noch nicht freigegeben. Keine neuen Messläufe oder Produktänderungen.

## Was beim Benutzen gemeint ist

Beim Öffnen von „Verwalten“ und eines Textes mit 286 Zeilen kann die Anzeige stocken.
Die vorhandenen Datenkorrekturen betreffen dagegen korrektes Speichern, Kontowechsel
und Datenregeln. Ihre grünen Prüfungen beweisen keine flüssige Textanzeige.

Der aktuelle Test misst die längste einzelne Browseraufgabe bei künstlicher
vierfacher CPU-Drosselung. Er ist ab 200 ms rot. Diese Festlegung stammt aus
einem Agententest vom 30.09.; die geprüften Quellen liefern keine Herleitung
für genau diese Messgröße und diesen Laptop. Das Konzept verlangt dagegen
50 ms je Bild. Das sind unterschiedliche Anforderungen. Keine davon wird
durch eine andere Zahl automatisch erfüllt.

## Drei konkrete Möglichkeiten

1. **Sperre unverändert behalten.** Datenentwurf bleibt uncommittet. Keine
   weitere Diagnose ohne neue begründete Erkenntnisfrage. Nachteil: Die
   ursprüngliche Reihenfolge bleibt angehalten.
2. **Ein neues Tempo-Kriterium begründen.** Zunächst Bedienanspruch, passende
   Messgröße und relevante Geräte festlegen. Erst danach einen begrenzten
   Prüfauftrag vereinbaren. Aufwand und Ausgang derzeit offen; keine
   frei erfundene Ersatzgrenze.
3. **Für die vorhandenen Datenkorrekturen eine ausdrücklich begrenzte Ausnahme
   erlauben.** Die Datenkorrekturen dürfen nach Prüfung der übrigen
   Abschlussvoraussetzungen separat committet werden. Der Tempo-Test bleibt
   unverändert rot, seine Rohbelege bleiben erhalten, und Tempo bleibt als
   eigener offener Qualitätsbefund geführt. Keine Veröffentlichung,
   keine Behauptung „158/158 bestanden“ oder „Tempo behoben“.

## Empfehlung und genaue Ausnahme

Empfohlen ist Möglichkeit 3, wenn der Betreiber die verbleibende Unsicherheit
bewusst akzeptiert. Dies ist eine Entscheidung über den Arbeitsabschluss,
kein technischer Tempo-Fix und kein neuer allgemeiner Abnahmestandard.

Die Ausnahme gilt ausschließlich für die bereits gebauten Datenkorrekturen
A14–A17 im Entwurf 3.18.30. Sie setzt die dokumentierten 157 grünen Prüfungen,
13 Runden, 238 Rules-Prüfungen und zwei Zufallsläufe sowie die noch erforderliche
Gegenprüfung und Commit-Checkliste voraus. Der rote Tempo-Befund wird im
Abschluss und in den Listen genannt. Keine alten grünen Tests allein deshalb
wiederholen, um einen vollständigen grünen Lauf zu suggerieren.

Bekannte Unsicherheit: Die bisherigen Alt-/Neu-Vergleiche beweisen weder
eine Verschlechterung noch Gleichwertigkeit. Beide Versionen können ein
gemeinsames störendes Bedienungsproblem haben. Eine echte Tempo-Abnahme
einschließlich des 50-ms/Bild-Anspruchs bleibt ausstehend.

Nach einer ausdrücklichen Zustimmung: diese begrenzte Ausnahme dokumentieren,
die Datenkorrekturen gemäß bestehendem Abschlussweg abschließen und anschließend
am nächsten tatsächlich offenen Punkt der vorhandenen Reihenfolge ansetzen.
Dabei keine ungeklärte alte Sammelfreigabe als neue Funktionsfreigabe verwenden.

Ohne Zustimmung: bestehende Sperre bleibt unverändert. Keine weitere
Tempo-Messschleife und kein eigenmächtiger roter Produktabschluss.

## Spätere echte Tempo-Prüfung: vor dem ersten neuen Lauf festlegen

- Bedienablauf: „Verwalten“ öffnen, Text mit 286 Zeilen öffnen, bis zum Ende
  scrollen, Wiederholen starten, Antwort zeigen, beenden und „Lernen“ öffnen.
- Vergleich: gleiche Daten, gleiche Schritte, gleicher Browser und gleiche
  vorher begründete Gerätebedingungen für alte und neue Version.
- Getrennte Urteile: Verschlechterung gegenüber der alten Version,
  absolute Bedienbarkeit und die ursprüngliche Bildzeitforderung. Ein gutes
  Vergleichsergebnis ersetzt keine absolute Nutzbarkeit.
- Begrenzung: Anzahl und Erkenntnisfrage vorab vereinbaren. Bei unklarem
  Ergebnis „unklar“ dokumentieren und keine Wiederholung bis zum zufälligen Grün.
- Keine INP-Freigabe aus maximalen Longtasks ableiten. INP misst
  Interaktionslatenz bis zur nächsten Darstellung; die 200-ms-Empfehlung
  bezieht sich auf reale Nutzungsdaten und deren 75. Perzentil.

## Belege

- [Originaltest](../werkzeuge/pruefstand/t_text_tempo.js), Agentencommit 7264af9a.
- [Konzept § 13](../texte-lernen/KONZEPT.md): CPU 4×, 286 Zeilen, 50 ms je Bild.
- [Text-Logbuch](../texte-lernen/LOGBUCH.md): frühere Messschwankungen auf diesem Laptop.
- [Aktueller Tempo-Befund](../zyklus-2/TEXT-TEMPO-BEFUND-2026-10-10.md).
- [Daten-Abnahme](../zyklus-2/DATEN-ABNAHME-3.18.30-2026-10-10.md).
- [Offizielle INP-Erklärung](https://web.dev/articles/inp).
- Council berät über die Entscheidung; zehn Agentenantworten sind keine
  unabhängigen Gerätebelege und keine Betreiberfreigabe.

