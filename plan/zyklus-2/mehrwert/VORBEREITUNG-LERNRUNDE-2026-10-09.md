# Nächste entschiedene Lernrunden-Punkte: Vorbereitung, kein Bau

09.10.2026. Maßgeblich ist die aktuelle Reihenfolge in GESAMTLISTE.md
und ARBEITSSTAND.md. A14–A16 / 3.18.30 sind noch uncommittet; der Betreiber
verschiebt die große Datenabnahme. Deshalb beginnt kein neues Paket.
Diese Seite hält nur die bereits gelesenen Anschlussstellen fest.

## 1. Karte in der Abfrage bearbeiten

Entschieden in der Mehrwert-Arbeit, GESAMTLISTE Abschnitt 2. Vorhandenes
Muster: `editCard`, `karteEntwurfOffen`, `cancelEdit`, `addOrSaveCard` und
`renderSession` in app.js. Das bestehende Blatt hat Entwurfsschutz und
Fokusführung; Speichern setzt einen gezielten Kartenpatch ab. Geführte
Karten bleiben an `kartenBearbeitbar` gebunden. Die Lernrunde steht in
`ui.session`; ein Rückweg darf sie nicht über Tabwechsel löschen.

Vor dem späteren Bau: offene Aufgabe im maßgeblichen Aufgabenregister
zuordnen; Daten-/Oberflächen-Skills laden. Prüfen: speichern/abbrechen/
Escape/Wischen, unverändert/geändert, Snapshot während der Eingabe,
gelöschte Karte und Kontowechsel, gemischter Text/Harakat, Fokus, schmale
Breite und Rückkehr zur selben Karte. Stufe und bereits angebotene
Rückgängig-Aktion bei gleichzeitiger fremder Bewertung mitprüfen.
Vorhandene Tests: t_karten_blatt, t_snapshot, t_neben_tippen, t_sprung
und die echten SDK-Konfliktkontrollen. Kein neuer Formularweg nötig.

## 2. Am selben Tag Runde fortsetzen

Entschieden: RUNDE-2 Frage 22. `endSession` schreibt den Tagesbeitrag
sofort, entfernt danach `ui.session`. `startSession` bildet eine neue
Runde aus Fälligkeiten, Limit und weiteren Bereichen. Das ist bisher
keine Wiederaufnahme der alten Queue. Keine zusätzliche Lernregel aus
dem Wort „fortsetzen“ ableiten und Rundengröße nicht zum Tagesdeckel machen.

Späteren Entwurf an Konto, logischen Lerntag und Kartenkennungen binden;
gelöschte oder inzwischen bewertete Karten abgleichen. Normal-, Üben-,
Schreiben- und Text-Probelauf nicht versehentlich gemeinsam speichern.
Prüfen: Teilrunde, mehrere Bereiche, Nicht-Karte wieder am Ende,
Neustart, Tageswechsel, Konto A/B/A, fremde Bewertung, vollständiger
Abschluss und erneut starten. Neue lokale Speicherung erfordert
Datenschutz, echten SDK-Test und die spätere gesammelte Rundenabnahme.

## Bedingungen bleiben offen

Erklärung der drei Knöpfe wartet auf Betreiber-Wortlaut. Freigabe der
zwei Lernregeln für alle wartet auf ausdrückliches Ja. Tagesdeckel E26
bleibt zurückgenommen; Texte/Regler warten bis 29.10. Nichts davon wird
durch diese technische Vorbereitung als beschlossen oder gebaut geführt.
