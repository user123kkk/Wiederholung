# E26 „Erst einmal 20“ nach langer Pause – Vorschlag, 05.10.2026

**Korrektur nach Gegenprüfung 09.10.2026:** Maßgeblich
[`mehrwert/TAGESDECKEL-AUDIT-2026-10-09.md`](mehrwert/TAGESDECKEL-AUDIT-2026-10-09.md).
Die erste Rechnung hatte verzerrte Starttermine; die Tagesziel-Kopplung ist
zurückgenommen. Neuen dauerhaften Deckel derzeit nicht empfohlen.
Auch das Urteil im damaligen Nachtrag, diese Reihenfolge verschlechtere
bei wenig Rückstand nichts und rette am meisten, ist nicht nachgewiesen:
Die App misst keine Erinnerungswahrscheinlichkeit. Der folgende Vorschlag
bleibt vollständig als historische Abwägung erhalten; aktuelle Lernregeln
werden ohne Freigabe nicht umgebaut.

**Aktueller Stand 09.10.2026:** Der einzelne Knopf ist durch Frage 10
(Tagesdeckel) aus der Mehrwert-Runde ersetzt. Tagesdeckel-Rechnung mit
90 Vergleichen und Empfehlung fertig:
[`mehrwert/TAGESDECKEL-RECHNUNG-2026-10-09.md`](mehrwert/TAGESDECKEL-RECHNUNG-2026-10-09.md).
Die Sortierung aus dem Nachtrag ist seit 3.18.22 gebaut. Unter dauerhaft
kleinem Deckel kann sie alte Karten sehr lange warten lassen. Der
ursprüngliche Vorschlag unten ist Verlauf, keine neue Bauanweisung.

Nur gelesen und aufgeschrieben, nichts gebaut. Betreiber 01.10.: „später“ (Z7).
Diese Datei ist die Entscheidungsvorlage für später.

## Was der Code heute tut (nachgelesen)

- `dueCardsFor()` (`app.js:4055`): fällig ist, was `nextReview <= heute` hat.
  Sortiert wird nur grob: erst Wiederholungen, dann neue Karten. Innerhalb
  davon gilt die Reihenfolge der Karten im Bereich, **nicht** wie lange eine
  Karte schon fällig ist.
- `startSession()` (`app.js:6240`): Steht „Karten pro Runde“ auf 10, 20 oder
  30, nimmt die Runde die ersten so vielen aus dieser Liste und mischt sie.
- **Der Kommentar dort stimmt nicht** (`app.js:6243`): „Wer 80 fällige hat
  und 10 wählt, sieht die 10 dringendsten, nicht 10 zufällige.“ Es sind die
  ersten 10 nach Kartenreihenfolge. Das ist derselbe Punkt wie die offene
  Aufgabe E-05 im Großplan („Rundenlimit nimmt die am längsten fälligen
  zuerst“). Nicht gebaut, weil Reihenfolge Lernlogik ist (LEHREN § 1.2).

## Die zwei Entscheidungen

**1. Welche Karten kommen bei einem Limit zuerst (E-05)?**

| Weg | Dafür | Dagegen |
|---|---|---|
| a) wie heute: Reihenfolge im Bereich | nichts ändert sich; wer Lektion für Lektion lernt, bekommt die frühen Lektionen zuerst | nach langer Pause kommen immer dieselben vorderen Karten, hintere bleiben wochenlang liegen |
| b) am längsten fällig zuerst | was am meisten zu verfallen droht, kommt zuerst; passt zum Satz im Kommentar | nach langer Pause sind das genau die Karten, die man am sichersten vergessen hat: die erste Runde wird die härteste |
| c) kürzester Abstand zuerst (niedrige Stufe vor hoher) | frisch Gelerntes verfällt am schnellsten und ist am leichtesten zu retten; die erste Runde fühlt sich machbar an | alte, feste Karten warten noch länger |

Empfehlung: **c für die Rückkehr nach langer Pause, sonst a lassen.** Im
Alltag sind selten mehr Karten fällig als das Limit, da ändert die
Reihenfolge nichts Spürbares. Nach 60 Tagen Pause entscheidet die erste
Runde, ob jemand bleibt, und da sollte sie schaffbar sein.

**2. Der Knopf selbst (E26)**

Vorschlag aus dem Befund LERN-11: Sind mehr Karten fällig als das größte
Rundenlimit (30) und steht die Einstellung auf „Alle“, erscheint unter dem
Hauptknopf ein leiser zweiter: „Erst einmal 20“. Er startet eine Runde mit
20 und ändert die Einstellung nicht.

- Dafür: nimmt die Hürde im kritischen Moment, keine Regel ändert sich.
- Dagegen: zweiter Knopf auf dem Bildschirm mit der einen Handlung
  (Hick's Law). Wer ein Limit will, hat die Einstellung.

Empfehlung: **bauen, aber erst nach Entscheidung 1.** Ohne sie sind die 20
einfach die vordersten Karten des Bereichs.

Alternative ohne zweiten Knopf: Bei sehr vielen fälligen Karten sagt der
Hauptknopf selbst „20 von 1100 starten“, und „Alle“ steht klein darunter.
Das ist ruhiger, ändert aber, was der Hauptknopf tut. Das wäre eine
Betreiber-Entscheidung, keine Kleinigkeit.

## Was es nicht berührt

Stufen, Abstände, Bewertung, Serie, Freischalten. Die Serie zählt ab der
ersten gelernten Karte, auch nach einer 20er-Runde.

## Abnahme (wenn gebaut wird)

Prüfstand mit 1100 fälligen Karten, Einstellung „Alle“: zweiter Knopf da,
Runde zeigt „Karte 1 von 20“, `settings.sitzungsLimit` unverändert,
`abnahme_runde.js` 13/13. Bei 25 fälligen: kein zweiter Knopf.

---

## Nachtrag 06.10.2026 abends: Welche Karten zuerst? Recherche und Empfehlung

Betreiber: „ich hab keinen Plan … finde einen Kompromiss, der nicht schadet
und sinnvoll ist“. Das ersetzt die Empfehlung „c“ oben; sie war aus dem Bauch.

### Was im Repo schon dazu steht

- `grossplan/befunde/LERNEN.md` LERNEN-4 (gemessen): Limit 10, oben 10 heute
  fällige, darunter 20 seit 20–58 Tagen überfällige. Dran kamen nur die
  oberen. Der Prüfer empfahl „am längsten überfällig zuerst“.
- `grossplan/ENTSCHEIDUNGEN.md` E-05: dieselbe Frage, Empfehlung „ja“,
  Spalte „Entschieden“ leer. Sie ist also nie entschieden worden.
- `befunde/LERN.md` LERN-11: Nach langer Pause wären das die am längsten
  vergessenen Karten, die erste Runde würde die härteste.
- Code: Abstand je Stufe wächst mit Faktor 1,8, höchstens 180 Tage. „Sicher“
  +1 Stufe, „Fast“ −1, „Nicht“ −2. Was länger als 14 Tage überfällig ist,
  gilt für die Serie schon als „liegengeblieben“ (`LIEGENGEBLIEBEN_TAGE`).

### Was die Quellen sagen

- Anki-Handbuch, „Review sort order“: Standard ist „am längsten wartend
  zuerst“, empfohlen, wenn man aktuell ist oder nur wenig Rückstand hat. Für
  großen Rückstand nennt es „Relative overdueness“: zuerst, was man am
  wahrscheinlichsten schon vergessen hat.
  https://docs.ankiweb.net/deck-options.html
- Anki-Forum, Simulationen von L. M. Sherlock (FSRS), zitiert von Expertium:
  Bei begrenzter Zahl an Wiederholungen pro Tag schneidet „am längsten
  fällig zuerst“ mit am schlechtesten ab. Besser ist die umgekehrte
  Richtung: zuerst, was man gerade noch weiß und als Nächstes verlieren
  würde. Begründung dort: Wer immer das am tiefsten Vergessene zuerst nimmt,
  lässt die frisch fälligen Karten liegen, und die verfallen währenddessen.
  https://forums.ankiweb.net/t/ordering-request-reverse-relative-overdueness/50051

Einordnung: Das Handbuch und die Simulationen widersprechen sich für großen
Rückstand. Die Simulationen sind keine begutachtete Studie und im Forum ohne
Zahlen wiedergegeben. Sie passen aber zur Vergessenskurve: Eine Karte, die
schon vergessen ist, verliert durch einen weiteren Tag nichts mehr. Eine
Karte, die gerade fällig wurde, verliert jeden Tag etwas.

### Empfehlung: „zuerst, was heute am meisten zu verlieren hat“

Wiederholungen werden vor dem Abschneiden auf die Rundengröße so sortiert:

1. nach dem Anteil, um den eine Karte überfällig ist, gemessen an ihrem
   eigenen Abstand (Tage überfällig geteilt durch Abstand der Stufe),
   **kleinster Anteil zuerst**;
2. bei Gleichstand die Karte mit dem **kürzeren Abstand** zuerst;
3. neue Karten wie heute danach.

Danach wird wie bisher gemischt. Es ändert sich also nur, **welche** Karten
in eine begrenzte Runde kommen, nicht ihre Reihenfolge in der Runde. Stufen,
Abstände und Bewertung bleiben unberührt. Ohne Limit („Alle“) ändert sich
gar nichts.

Was das in den zwei Fällen bedeutet:

- **Alltag, etwas mehr fällig als die Rundengröße:** Alle sind heute fällig
  geworden, Anteil 0. Dann kommen die mit kurzem Abstand zuerst, also das
  frisch Gelernte. Das ist richtig: Eine Karte mit einem Tag Abstand
  verdoppelt ihre Wartezeit, wenn sie einen Tag liegen bleibt; eine Karte mit
  60 Tagen Abstand merkt einen Tag kaum.
- **Nach 60 Tagen Pause:** Eine Karte mit 60 Tagen Abstand ist um das
  Einfache überfällig und oft noch zu retten; an ihr hängen Monate Arbeit.
  Eine Karte mit 2 Tagen Abstand ist um das Dreißigfache überfällig und so
  gut wie sicher weg; sie fällt heute wie morgen auf Stufe 0 zurück. Zuerst
  kommen also die festen Karten. Die erste Runde nach der Pause ist damit
  die mit den besten Aussichten, nicht die härteste (Einwand LERN-11).

Was dagegen spricht, und was davon bleibt:

- LERNEN-4 („alte Karten kommen nie dran“): Wer dauerhaft nur eine begrenzte
  Runde macht und täglich mehr fällig bekommt, als hineinpasst, lässt die
  lange vergessenen hinten liegen. Das trifft aber Karten, die ohnehin wie
  neu gelernt werden müssen, und sie stehen weiter vor den wirklich neuen.
  Mit „Weiterlernen“ oder „Alle“ kommen sie am selben Tag dran.
- Es beruht auf einem Modell (Vergessenskurve, Abstand als Maß für die
  Festigkeit), nicht auf Messungen dieser App.
- Der Kommentar „die 10 dringendsten“ in `startSession` stimmt dann
  inhaltlich und wird in diesem Sinn umgeschrieben.

**Urteil:** Das ist die Wahl, die bei wenig Rückstand nichts verschlechtert
und bei viel Rückstand am meisten rettet. „Am längsten überfällig zuerst“
(alte Empfehlung E-05) rate ich nach der Recherche ab.

Entscheiden muss der Betreiber (Lernlogik). Sagt er „Reihenfolge ja“, wird
es mit eigenem Test gebaut (Fall aus LERNEN-4 und Fall „60 Tage Pause“),
dazu Runden-Abnahme und Gesamtlauf. Der Knopf „Erst einmal 20“ (E26) baut
darauf auf und bleibt eine eigene Entscheidung.
