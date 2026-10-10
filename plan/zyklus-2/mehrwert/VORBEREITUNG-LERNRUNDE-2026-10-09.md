# Nächste entschiedene Lernrunden-Punkte: Vorbereitung, kein Bau

09.10.2026. Maßgeblich ist die aktuelle Reihenfolge in GESAMTLISTE.md
und ARBEITSSTAND.md. A14–A16 / 3.18.30 sind noch uncommittet; der Betreiber
verschiebt die große Datenabnahme. Deshalb beginnt kein neues Paket.
Diese Seite hält nur die bereits gelesenen Anschlussstellen fest.

## 1. Karte in der Abfrage bearbeiten

Entschieden in der Mehrwert-Arbeit, GESAMTLISTE Abschnitt 2. Vorhandenes
Muster: `editCard`, `karteEntwurfOffen`, `cancelEdit`, `submitCardForm` und
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
Vorhandene Tests: t_karten_blatt, t_karten_snapshot, t_neben_tippen, t_sprung
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

## Konkretisierung 10.10.2026: Rückwege und Speichergrenzen

Nur Vorbereitung; Produktquellen unverändert. Korrektur zum ersten Absatz:
Der tatsächliche Formular-Speicherweg heißt `submitCardForm`; eine Funktion
`addOrSaveCard` existiert im aktuellen app.js nicht. Gegen den Code gelesen.

### Bearbeiten in der Abfrage: vorhandenen Weg nutzen

- `editCard` (app.js 6858) öffnet das vorhandene Kartenblatt, setzt
  `formDraft` und erhält `ui.session`. `editCardInBereich` (4869) ist als
  allgemeiner Einstieg ungeeignet: außerhalb Fortschritt wechselt es nach
  Verwalten und setzt die Session auf null. Der spätere Abfrageknopf muss
  den Bereich der aktiven Karte behalten und direkt den Blattweg nutzen.
- `submitCardForm` (6740) liest die bestehenden Felder und ruft `patchDoc`.
  `cancelEdit` (6919) schließt nur das Blatt. Eingabehandler werden bei
  `ui.karteSheet` auch außerhalb Verwalten verbunden (10275); dieses Muster
  braucht keinen neuen Formularzustand. Escape/Wischen/Tippen daneben
  müssen durch die vorhandene Entwurfsprüfung laufen.
- Aktive Karte, Aufdeckzustand, Queue, weitere Bereiche und `lastAction`
  vorher/nachher vergleichen. Ein erneutes `renderSession` aktualisiert
  Anzeige-Marken: gleicher Inhalt allein belegt nicht dieselbe Runde.
  Nach Abbruch unveränderte Werte, nach Textkorrektur nur beabsichtigte
  Felder; keine Bewertung oder Tagesantwort durch das Bearbeiten.
- **Vor Bau prüfen:** Das Formular kann auch `stufe`, `nextReview` und
  `rueckfaelle` schreiben. A14/A15-Regeln verlangen bei Bewertungsfeldern
  eine neue Ausgangs-/Aktionskennung (`kartenBewertungsStandOk`, Rules 293).
  Den realen SDK-Speicherweg mit diesen Regeln prüfen, insbesondere
  geändertes Wort und gleichzeitig fremde Bewertung. Ein Stub-Erfolg genügt
  hier nicht. Dies ist ein Prüfauftrag, noch kein reproduzierter neuer Fund.
- Freigabe steht als offene Mehrwert-Zeile in GESAMTLISTE § 2. Im
  Zyklus-Aufgabenregister fehlt noch die konkrete H-Aufgabe mit Abnahme;
  vor Produktbau dort zuordnen. Paket H bleibt bis Datenabschluss gesperrt.

### Runde fortsetzen: technische Daten getrennt von Lernergebnissen

- `startSession` (7044) baut die Queue neu und verteilt das Rundenlimit über
  Bereiche. `startDrillWithCards` (6374) baut dagegen `isDrill`,
  `handwriting`, `drillIds` und `drillLabel`. `endSession` (7433) holt einen
  laufenden Wischzug nach, schreibt Tagesantworten und entfernt die Session.
  Reiterwechsel und Auth-Wechsel entfernen sie ebenfalls. Diese Ausgänge
  müssen vor dem späteren Speichern einzeln zugeordnet werden.
- Denkbare lokale Fortsetzung enthält Konto, logischen Lerntag, Modus,
  Bereich, Queue/Rest mit Kartenkennungen und überprüfbare Zähler. Die
  Speicherform bleibt Entwurf; keine neue Cloud-Sammlung entschieden.
  Keine religiösen Einstiegantworten, kein kompletter UI-Zustand,
  keine Timer oder DOM-Marken in die Fortsetzung aufnehmen.
- `lastAction` enthält Ausgangswerte, Queue und weitere Bereiche (7167).
  Ein gespeichertes altes Undo darf keine fremde Bewertung zurückdrehen.
  Vor Übernahme entweder über die bestehende Aktionskennung validieren
  oder die historische Undo-Handlung nicht anbieten. Vor dem Bau festlegen
  und getrennt von Rundenfortsetzung prüfen; keinesfalls alte Bewertungen
  oder Tagesantworten erneut abspielen.
- Gelöschte Karte/Bereich und inzwischen geänderte Karte server-/snapshot-
  gebunden abgleichen. „Nicht“ kann eine Karte absichtlich erneut in die
  Queue hängen; einfaches Filtern nach Fälligkeit würde diese Runde ändern.
  `nichtMal`/`nichtKarten` und Betreiber-Probelauf ebenfalls berücksichtigen.
- Prüfmatrix: normal/Üben/Schreiben getrennt; Tag 03:59/04:00,
  Konto A/B/A, leer/voll, abgebrochene/abgeschlossene Runde,
  Bereichswechsel und fremde Löschung/Bewertung. Leere Restqueue bietet
  keine Fortsetzung. Tageszähler vor/nach Neustart und wiederholter
  Fortsetzung müssen identisch bleiben, bis eine neue Antwort erfolgt.
- RUNDE-2 Frage 22 ist entschieden; „alle Modi dauerhaft speichern“ folgt
  daraus nicht automatisch. Konkrete H-Aufgabe, Speicherform und Abnahme
  vor Bau festhalten. Datenschutzerklärung bei neuem Schlüssel mitziehen;
  gezielte SDK-Probe und spätere Runden-/Gesamtabnahme bleiben Pflicht.

### Nächster erlaubter Schritt

Im bestehenden Datenpaket den vorhandenen Formular-Speicherweg mit echten
Regeln auf Textkorrektur/manuelle Stufe/fremde Bewertung prüfen, ohne einen
neuen Abfrageknopf zu bauen. Danach Anschluss-Abnahme konkretisieren.
Keine Wiederholung bereits grüner unveränderter Gesamtprüfungen.

Erledigte Vorbereitung in der Nacht: tatsächlicher Formular-Speicherweg
mit SDK geprüft. `patchDoc` vergibt schon passende Bewertungskennungen;
das Formular ist bei Textkorrektur/manueller Stufe nicht durch neue Regeln
blockiert. Dabei A17/DATEN-12 gefunden: fremder Snapshot lässt unberührte
Standwahl auf 0 fallen, Notizspeichern ersetzt fremde Bewertung. Im selben
Datenpaket korrigiert; fünf SDK-Fälle und Kartenblatt, Snapshot, Sprung,
Kontrast sowie a11y-Grundchecks grün. Große Paketabnahme bleibt offen.
Beleg: `../FORMULAR-KONFLIKT-2026-10-10.md`. Der oben genannte Testname
`t_snapshot` war unzutreffend: tatsächliche Datei `t_karten_snapshot.js`.
Kein Produktfehler aus dem abgewiesenen falschen Testaufruf abgeleitet.

## Anschluss-Abnahme konkretisiert, 10.10.2026 02:21

Vorbereitung für spätere H-Aufgaben, kein Funktionsbau und keine neue
Freigabe. Quelle: GESAMTLISTE § 2 und RUNDE-2 Frage 22. Die dortige
Entscheidung lautet nur „Am selben Tag Runde fortsetzen anbieten“;
Modusumfang und Umgang mit historischem Rückgängig sind damit nicht entschieden.

### Karte während der Abfrage bearbeiten

| Ausgang / Aktion | Später nachzuweisendes Ergebnis | Prüfebene |
|---|---|---|
| Laufende Runde, Karte offen/verdeckt; Blatt öffnen, unverändert abbrechen | Session, Queue, Bereich, Rest und Aufdeckzustand erhalten; keine Bewertung/Tagesantwort | Browser mit Zustandsvergleich, nicht nur Bild |
| Notiz ändern und speichern, fremde Bewertung trifft davor ein | Notiz gespeichert; fremder Bewertungsstand bleibt erhalten, keine zweite Tagesantwort | Echtes SDK mit zwei Profilen; A17-Fälle als Ausgang |
| Wort/Harakat korrigieren | Textänderung und bestehender Rückfallreset korrekt; keine zusätzliche Antwort; Rückkehr zur selben Karte | Browser plus echtes SDK |
| Escape/Wischen/Tippen daneben bei geändertem Entwurf | Verwerfen bestätigen/ablehnen; Ablehnen erhält Eingabe und Runde | Kartenblatt-/Neben-Tippen-Muster, schmale Breite |
| Karte/Bereich inzwischen gelöscht, Konto A→B während Blatt/Dialog | Kein Wiederanlegen durch verspätetes Speichern; keine Daten von A in B | Echtes SDK und Auth-Wechsel-Probe |
| Vorherige Antwort hat Rückgängig; Text-/Stufenänderung oder fremder Snapshot | Bestehenden Schutz anhand Bewertungskennung erhalten; fremde Bewertung wird nicht zurückgedreht | A14-Kontrollen plus Zustand der aktiven Runde |

Vorhandene Tests sind Ausgangspunkte, kein Nachweis des noch fehlenden
Abfrageknopfs: `t_karten_blatt.js`, `t_karten_snapshot.js`,
`t_neben_tippen.js`, `t_runde_rest.js`, `t_runde_bereiche.js`,
`t_undo_verlauf.js`. Nach späterem Bau passende Fälle ergänzen und die
vorgeschriebene Rundenabnahme ausführen. Keine neuen Tests nur für diese
Planpflege und keine vorhandenen Tests vorsorglich wiederholen.

### Runde am selben Tag fortsetzen

| Ausgang / Aktion | Später nachzuweisendes Ergebnis |
|---|---|
| Teilrunde beenden, App neu öffnen, fortsetzen | Restfolge/Kartenkennungen und Bereiche nachvollziehbar erhalten; bereits gespeicherte Antworten bleiben unverändert |
| Noch laufender Wischzug beim Beenden | Vor Sicherung den bestehenden Abschluss nachholen; Wiederaufnahme bucht ihn nicht erneut |
| „Nicht“ hat eine Karte wieder angehängt | Gewollte Wiederholung erhalten; keine neue Fälligkeitsrunde durch bloßes Filtern erzeugen |
| Fremde Bewertung oder Löschung im gespeicherten Rest | Karte mit aktuellem Datenstand abgleichen; keine alte Bewertung zurückschreiben, keine gelöschte Karte anlegen |
| Konto A→B→A; logischer Tageswechsel | Keine fremde Fortsetzung in B; Vortagsrunde nicht als heutige Fortsetzung anbieten |
| Leere Restqueue oder vollständig beendete Runde | Kein leeres Fortsetzungsangebot; normaler neuer Start bleibt möglich |
| Wiederholte Wiederaufnahme ohne neue Antwort | Tageswerte und Beitragskennungen identisch; kein Replay bereits bestätigter Beiträge |
| Üben/Schreiben/Text-Probelauf | Getrennte Zustände; Fortsetzung nur für zuvor ausdrücklich festgelegte Modi, Texte-Probelauf nicht umbauen |

Ausgangswege am aktuellen Code erneut gelesen: `startSession` stellt Queue
und Rest neu zusammen; `startDrillWithCards` hat eigene Modusfelder;
`endSession` holt Wischen/Tagesversand nach und entfernt die Session.
`undoLastGrade` prüft die Kartenkennung vor negativen Tagesbeiträgen.
Eine Fortsetzung darf weder `gradeCard` noch `undoLastGrade` zur
Rekonstruktion vergangener Antworten ausführen. Neues Speicherformat,
Zeit-/Kontobindung, beschädigte/alte Speicherstände und Datenschutz müssen
in der späteren H-Aufgabe festgelegt und geprüft werden. Diese Tabelle
belegt keinen bereits implementierten Fortsetzungsweg oder Lernnutzen.
