# Tippen in Blättern: Meldung des Betreibers, 08.10.2026

**Nichts gebaut.** Stand der Klärung, damit die nächste Sitzung nicht neu fragt.

## Wortlaut

> „an sich ist dieses Schreiben und so in solchen Bereichen sehr
> unzufriedigend.“ – Auf Nachfrage: „alles, wann Tastatur aufploppt,
> Buttons Sichtbarkeit in verschiedenen Positionen, alles glaub ich idk.“

Gemeint sind also Blätter mit Eingabefeldern am iPhone: der Moment, in dem
die Tastatur kommt, und wo die Knöpfe danach stehen. Sein Handy zeigte
dabei 3.18.23 (Flugmodus, deshalb kein Update auf 3.18.26).

## Was der Code heute tut (gelesen, nicht am Gerät gemessen)

- `syncTastatur()` (`app.js` 14720) misst die Tastaturhöhe und setzt
  `--tastatur`. `.dlg-backdrop` bekommt diese Höhe als Polster unten
  (`styles.css` 3321), das Blatt sitzt damit über der Tastatur und ist
  höchstens so hoch wie der Rest (`max-height: min(88dvh, 100%)`), es
  scrollt in sich.
- 80 ms nach dem ersten Tastatur-Ereignis wird das Feld einmal in Sicht
  gescrollt, nur das Feld, nicht die Knöpfe.

## Vermutung (nicht gemessen, LEHREN § 1.3)

- Im Blatt „Karte anlegen“ (drei Felder, zwei Knöpfe) bleibt über der
  Tastatur zu wenig Höhe. „Hinzufügen“ und „Fertig“ liegen dann im Blatt
  unter dem sichtbaren Rand und sind erst nach Scrollen im Blatt zu sehen.
- Das Blatt wird in zwei Schritten kleiner (erst Tastatur, 80 ms später
  Scrollen); das kann wie ein Ruck aussehen.
- Je Blatt stehen die Knöpfe an anderer Stelle (Karte: unten nebeneinander;
  Name ändern, Code, Fehler melden: eigene Anordnung).

Im Prüfstand (Chromium) gibt es keine iOS-Tastatur. Ohne Aufnahme vom
Gerät wäre jeder Umbau ein Verdachts-Fix; daran sind bei der Nav-Leiste
drei Anläufe gescheitert (LEHREN § 3.4).

## Was gebraucht wird

Eine **Bildschirmaufnahme** vom iPhone (Video, 20–30 Sekunden), App auf
3.18.26: Verwalten → „Karte hinzufügen“ → Wort tippen → Übersetzung tippen
→ Notiz tippen → „Hinzufügen“. Danach Einstellungen → „Name ändern“ →
tippen. Gerätetest G1 (`../../GERAETETESTS-ZETTEL.md`) ist damit zugleich
erledigt.

## Mögliche Richtung (erst nach der Aufnahme entscheiden)

- Knöpfe im Blatt oben in den Kopf (wie iOS: „Abbrechen“ links, „Sichern“
  rechts), dann sind sie nie hinter der Tastatur.
  Dafür: löst die Sichtbarkeit für alle Blätter gleich. Dagegen: größerer
  Umbau aller Blätter, ändert gewohnte Stellen.
- Oder: Knöpfe bleiben unten, kleben aber am unteren Rand des Blatts
  (im Blatt, nicht am Bildschirm). Dafür: kleiner. Dagegen: weniger Platz
  für die Felder auf kleinen Geräten.
