# E26 „Erst einmal 20“ nach langer Pause – Vorschlag, 05.10.2026

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
