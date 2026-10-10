# Datenentwurf 3.18.30: Gegenlesen vor späterem Paketabschluss

10.10.2026 09:55. Neuer Fortsetzungsauftrag, Daten-Skill angewandt.
Nur Quellen und vorhandene Belege gelesen; kein Test gestartet oder geändert.
Keine große Abnahme, kein Paketabschluss, kein neuer Funktionsbau.

## Quellen und Umfang

Vollständiger App-/Rules-/Datenschutz-Diff gegen den festen Ausgang
`315bb0e` (App im Commit 3.18.29), Befundblöcke DATEN-9 bis DATEN-12,
alle drei SDK-Testdateien samt Erwartungen und die vollständigen
Abschlusslogs gelesen. Die Befundblöcke beschreiben die alten Fehler;
ihre historischen „nicht behoben“-Sätze bleiben unverändert.

Aktueller App-SHA256, LF-normalisiert:
`4a8ca5a1a73c7873275497c38f7368f542785a97f1712e21a20b60faed25fe97`.
Rules: `6a110898ab00f682a3c1fc026881c87ec63f339c5dee5ebc0b94f04a8fdecfa3`.
Beide entsprechen den vorhandenen drei Abschlusslogs unter `../sicherung/tests/`:

- `a14-a15-aktueller-entwurf-gezielter-abschluss.log`: 16 Fälle;
  zusätzliche Hinweis-/Entfernen-Meldungen sind keine weiteren Fälle.
- `a16-22-aktueller-entwurf-gezielter-abschluss.log`: 22 Fälle.
- `a17-formular-acht-finale-gezielte-abnahme.log`: acht Fälle.

## Befund gegen Änderung und Erwartungen

| Befund | Tatsächliche Änderung / gelesene Erwartung | Ergebnis des Gegenlesens |
|---|---|---|
| A14: altes Undo ersetzt fremde Bewertung | `undoLastGrade` und `lernRueckgaengig` prüfen die Aktionskennung vor Kartenänderung und negativem Tagesbeitrag. Rules prüfen die Ausgangskennung auch beim Server-Write. Test verlangt vollständigen Erhalt der fremden Serverkarte; normaler und eigener Offline-Undo bleiben erlaubt. | Schutz entspricht dem Befund; gleiche Endwerte mit anderer Kennung sind ebenfalls geprüft. |
| A15: Offline-Nachholen ersetzt neuere Antwort | Jede Kartenaktion behält ihre ursprüngliche Basis und eine lokale Kopie. Nachholen liest den Server; nur unveränderte Basis erlaubt Versand, Konflikt/Löschung erhält die Kopie. Tests prüfen Kennung vor/nach Neustart, fremden Serverstand, Export und ausdrückliches Entfernen. | Kein blindes Umbinden an den fremden Stand; Löschung wird nicht neu angelegt. |
| A16: bestätigte Karte, abgelehnte Tagesantwort nach Neustart weg | Tageskopie wird vor der Bewertung gespeichert; Kartenkopie legitimiert vorbereiteten Beitrag. Beleg und Increment liegen in einem Batch; vorhandener Beleg ist unveränderlich. Tests verlangen ursprünglichen Tag/Epoche/Art/Differenz, genau einmal Nachholen, Minusbeitrag, fremdes Konto und unveränderte andere Karte. | Technischer Erhalt passt zum Befund. Alters-/Belegabweichungsfälle erhalten ungültige Kopien statt Umbuchen. |
| A17: alte unberührte Standwahl wird manueller Auftrag | `stufeGeaendert` entsteht nur beim Change-Ereignis. Optionswerte folgen sonst dem aktuellen Snapshot; Entwurfsschutz berücksichtigt nur bewusst geänderte Stufe. Test verlangt Notizerhalt plus vollständigen fremden Bewertungsstand, getrennt von bewusster Stufe/Textkorrektur. | Ursache statt bloßes Optionssymptom korrigiert; bewusste Änderung bleibt möglich. |

Frühe Rückkehr bei fehlender Karte, fremder Kennung oder Speicherfehler
liegt vor neuer Zählung; misslungene lokale Speicherung stellt die eigene
vorherige Bewertung/Undo-Aktion wieder her. Nach Await prüfen die gelesenen
Nachhol-/Entfernen-/Löschpfade ihren Kontokontext. Datenschutz nennt beide
lokalen Kopien und die Cloud-Belege; Kontodatenlöschung nimmt die neue
Unter-Sammlung mit. Keine neue Lernregel aus diesen technischen Wegen ableiten.

Kein zusätzlicher Produktfehler in diesem Gegenlesen belegt. Das ist keine
vollständige Nachprüfung der App und kein Ersatz für Paket-/Runden-/Zufalls-
oder Geräteabnahme. A16-Antwortart `t` prüft den technischen Beitrag, keinen
Umbau oder vollständigen Lernablauf des geschützten Text-Probelaufs.
Testinstrumentierung/SDK-Helfer und tatsächliche Regeltests wurden hier
nicht erneut vollständig auditiert; frühere Gegenproben bleiben maßgeblich.

## Konkreter Anschluss

Die nächste entschiedene Mehrwert-Zeile ist „Karte direkt in der Abfrage
bearbeiten“, danach „Am selben Tag Runde fortsetzen“ (GESAMTLISTE § 2).
Vorbereitung und spätere Kriterien stehen bereits in
`mehrwert/VORBEREITUNG-LERNRUNDE-2026-10-09.md`; keine weitere Variante nötig.
A17 ist der aktuelle Datenbeleg des vorhandenen Formularwegs, kein Nachweis
des noch fehlenden Abfrageknopfs. Neues Paket bleibt bis Datenabschluss gesperrt.

Vor späterer großer Abnahme bleiben die zwei belegten Aufbau-Lücken offen:
8082 im Ladegerät-Weg und SDK-Helfer im Fortsetzungs-Hash. Details/Ablauf:
`ABNAHME-VORBEREITUNG-3.18.30.md`. Keine davon heute repariert oder ausgeführt.

Übergabefund: `mehrwert/ARBEITSSTAND.md` nannte im aktuellen Einstieg noch
aktive Nachtarbeit und fünf/17 Fälle. Sichtbaren Korrekturblock vorangestellt;
historische Angaben erhalten. Auch PLAN erhält den aktuellen Einstieg.
Minuten-Sicherung bleibt ein Baum 12532/16564; Entwurf/Fremdarbeit erhalten.
