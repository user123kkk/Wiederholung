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

---

## Nachtrag: Bildschirmaufnahme des Betreibers ausgewertet (08.10., 11:38 Uhr, 26 s)

Datei `Downloads\ScreenRecording_10-08-2026 11-38-44_1.mp4`, iPhone 414×896,
installierte App. Bild für Bild angesehen (1 Bild/s, vier Stellen mit 5
bzw. 30 Bildern/s). Die Vermutung von oben („Knöpfe rutschen unter den
Rand“) **stimmt auf diesem Gerät nicht**: Im Blatt „Neue Karte“ sind
„Hinzufügen“ und „Fertig“ über der Tastatur zu sehen.

Was wirklich zu sehen ist:

**V-1 (mittel) – Beim Wechsel ins Feld „Notiz“ rutscht das Blatt hoch.**
Bei 11,0 s: Titel „Neue Karte“ verschwindet nach oben, das Feld „Wort“
liegt unter der Uhr, und zwischen Blatt und Tastatur klafft ein dunkler
Streifen (rund 75 px), durch den die Seite dahinter scheint.
Ursache, am Code gelesen: iOS verschiebt beim Fokus den sichtbaren
Ausschnitt (`visualViewport.offsetTop`). `syncViewportGap` (`app.js`
14674) rechnet `--tastatur` bei diesem Ereignis („scroll“) bewusst nicht
neu; der Wert bleibt der alte, das Blatt sitzt um den Versatz zu hoch.
Am Gerät nicht nachgemessen, aber Rechnung und Bild passen (Lücke =
Versatz).

**V-2 (mittel) – Das Blatt kommt unten an und springt dann über die
Tastatur.** „Name ändern“: von 20,6 s bis 21,4 s steht das Blatt am
unteren Rand, bei 21,6 s liegt es halb hinter der hochfahrenden Tastatur,
bei 21,8 s sitzt es darüber. Das Blatt erfährt die Tastaturhöhe erst,
wenn die Tastatur fertig oben ist, und springt dann in einem Bild.
Dasselbe beim Schließen der Tastatur (14,0 s): Sprung nach unten.

**V-3 (niedrig) –** Über der Tastatur steht bei „Name ändern“ die
iOS-Zeile „Kontakt autom. ausfüllen“. Das Feld ist für iOS ein Namensfeld.

**Kein Fund:** Schließen des Blatts per Wischen (15,15–15,45 s) gleitet am
iPhone sichtbar nach unten. Verwalten zeigt beim Tab-Wechsel 0,2 s eine
leere Liste; das ist der Beginn der gestaffelten Einblendung, kein Fehler.

### Plan (Verdachts-Fixes, am iPhone zu bestätigen; LEHREN § 1.3)

1. V-1: `--tastatur` auch beim Verschieben des sichtbaren Ausschnitts neu
   setzen (nur die Zahl, kein zusätzliches Scrollen – das Verbot aus G-118
   bleibt).
2. V-2: zuletzt gemessene Tastaturhöhe merken und beim Fokus in ein Feld
   eines Blatts sofort anwenden; die echte Messung korrigiert danach. Kommt
   keine Tastatur (z. B. iPad mit Tastatur), nach kurzer Zeit zurück auf 0.
   Dazu ein kurzer Übergang, damit das Blatt gleitet statt springt.
3. V-3: `autocomplete="off"` am Namensfeld.

Eigener Commit, eigene Version, damit es sich leicht zurücknehmen lässt.
