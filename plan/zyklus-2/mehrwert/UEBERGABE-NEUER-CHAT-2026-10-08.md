# Übergabe an den nächsten Chat (Mehrwert-Arbeit), 08.10.2026

Der Betreiber will in einem neuen Chat weitermachen. Sein Auftrag,
wörtlich: „ich will das und alles in diesem chat machen, weis nicht in
welcher reihenfolge, ohne fehler, schnell, einfach.“

## Zuerst lesen

1. `plan/STAND.md` (oberste Absätze)
2. `plan/LEHREN.md`, vor der ersten Änderung; § 14 vor jedem Commit
3. [`RUNDE-2-2026-10-08.md`](RUNDE-2-2026-10-08.md): 68 Fragen mit seinen
   Antworten (Abschnitt 3), offene Punkte (4, 5a), Erinnerungsliste (5b),
   Pakete (6)
4. [`IDEEN-KATALOG-2026-10-08.md`](IDEEN-KATALOG-2026-10-08.md): alle 175
   Ideen mit Stand; 72 sind „offen“
5. [`ERGEBNIS-2026-10-07.md`](ERGEBNIS-2026-10-07.md) und
   `../BETREIBER-2026-10-07-NEU.md` (N1–N8) aus dem ersten Chat
6. `CLAUDE.md`, Abschnitt „Klein-Weg“

## Stand

- `main` = 3.18.26, **online ist 3.18.26** (08.10., vom Betreiber mit
  `veroeffentlichen.bat`). Davor lief kein Gesamtlauf: 3.18.24–3.18.26 sind
  nur mit betroffenen Tests geprüft. „ladegerät“ holt den vollen Lauf nach.
  Das Skript veröffentlicht immer den neuesten `origin/main`, egal aus
  welchem Ordner. Eine erste Abfrage zeigte noch 3.18.25: Zwischenspeicher
  des Hostings (`app.js` bis zu eine Stunde), kein Fehler.
- Auf dem Laptop gibt es zwei Checkouts. Vor jedem Prüfstand-Lauf prüfen,
  welchen Ordner der Server auf Port 8099 liefert (`LEHREN.md` § 5.3,
  neuester Eintrag).
- An „Texte auswendig lernen“ wird bis zur Auswertung am 29.10. nichts
  umgebaut.

## Reihenfolge (Vorschlag von Claude, vom Betreiber nicht bestätigt)

Ein Paket nach dem anderen. Jedes Paket: bauen, voller Lauf, Logbuch,
Commit auf `main`, dann erst das nächste. Kleinigkeiten nach dem Klein-Weg
dazwischen.

| Schritt | Was | Hinweis |
|---|---|---|
| 1 | „ladegerät“: voller Lauf am Stand 3.18.26 (ist schon online) | Betreiber gibt das Stichwort |
| 2 | Zwei Berichte, nur lesen: Onboarding (samt `../VORBILD-MARHABA.md` und App „Marhaba!“) und Durchsicht Aussehen/Bewegung über alle Bildschirme (N2, N3, N5, N6) | Funde als Liste, nichts bauen |
| 3 | Paket I: Liste einfügen, Export, Druck, Backup, Löschen mit Rückgängig | sichtbar, keine Lernlogik |
| 4 | Paket H: Bearbeiten in der Abfrage, verpatzte Karten am Rundenende, Runde fortsetzen, Bildschirm wach | Wortlaut zu Frage 21 vom Betreiber |
| 5 | Paket G0: Lernlogik in eigene Datei, Schnelltests, allgemeiner Schalter | ohne sichtbare Änderung |
| 6 | Paket G: Kern-Umbau Lernen (Fragen 7, 9, 10) | voller Lauf, Rundenabnahme |
| 7 | Paket J: Mengenbremsen, Meldungen, App Check | Regeln, Deploy durch den Betreiber |
| 8 | Paket K: gemischte Karten, Schrift in der Notiz, Wort normal | iPhone-Foto des Betreibers |
| 9 | Paket L: E-Mail ändern, Bestätigungslink zurück, Google oben | Schritt in der Firebase-Konsole |
| 10 | Ab 29.10.: Paket M (Texte), danach N, O, P, Q | Auswertung des Probelaufs zuerst |

Aus Schritt 2 entstehen eigene kleine Pakete für Animationen und Einstieg;
sie werden nach Schritt 4 eingeordnet. Die 72 „offen“-Zeilen des Katalogs
werden paketweise mit dem Betreiber durchgegangen, nicht auf einmal.

## Neu vom Betreiber (08.10., zuletzt)

- Medina-Satz: Die Lektionen brauchen noch Monate. Er will jeweils seinen
  neuesten Stand geben können, möglichst so, dass es sich **automatisch
  aktualisiert** („oder maybe auch not“ – nicht entschieden). Technisch
  zwei Wege, beide schon im Plan: Regal-Datei mit `satzId`/`satzVersion`
  (jede Veröffentlichung bringt den neuen Stand, die App bietet „neue
  Ausgabe übernehmen“ an) oder Nachliefern unter demselben Code (Paket Q).
  Vor dem Bau dafür, dagegen und Urteil vorlegen.
- VoiceOver-Test: interessiert ihn gerade nicht. Zurückgestellt.
- Abo später: für ihn in Ordnung, kein Widerspruch gewünscht.

## Erinnern (am Ende jeder Antwort, bis erledigt)

1. „ladegerät“ am Netzteil (voller Prüflauf; 3.18.26 ist schon online).
2. Elternteil als zweiten Eigentümer eintragen – er wollte es „gleich“
   machen und **ausdrücklich erinnert werden**.
3. iPhone-Foto: Ist das arabische Wort auf der Karte zu fett?
4. Freunde für den Test ansprechen, sobald die Pakete I und K fertig sind.
5. Vor dem ersten Abo: Institut der Medina-Bücher schriftlich fragen.
