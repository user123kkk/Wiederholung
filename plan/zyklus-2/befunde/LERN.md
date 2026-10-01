# LERN – Lernen-Tab und Lernrunde (Zyklus 2, Prüfer LERN)

Stand: app.js 3.18.10 (`436dc78`), Prüfstand 127.0.0.1:8099, Chrome 154
(Windows), Firebase-Attrappe. Eigene Skripte und Fotos:
`<scratchpad>/audit/LERN/` (`s1_start.js`, `s2_serie_leer.js`, …).
Prüfzeit 01.10.2026 ab 00:10 Uhr Ortszeit – also Lerntag 30.09. (App-Tag
beginnt 04:00, `lib.tag()` rechnet genauso).

**Arbeitsstand:** Datei wird laufend ergänzt. Reihenfolge nach Schwere
erst am Schluss endgültig.

---

#### LERN-1: Die Serie reißt ohne Warnung, wenn zwei Tage hintereinander nichts fällig ist
- Art: Fehler (Wirkung der Serie-Regel) / Gefühl
- Schwere: mittel
- Beleg: `app.js:965` `tagGelernt(e)` zählt nur `w + n + t`; Üben (`u`) zählt bewusst nicht (`app.js:953-961`, CHANGELOG 3.16.0 „Die Serie belohnt fällige Wiederholungen“). `app.js:3061-3062` verzeiht genau einen Tag. Die Warnung `app.js:10290` verlangt zusätzlich `dueCards().length > 0` – an einem Tag ohne Fällige erscheint sie also nie. Messung `s2_serie_leer.js` (40 Karten, alle Stufe ≥ 4, fällig erst in 3 Tagen, 10 gelernte Tage bis gestern): Tag +0 „Für heute durch“, Serie **10**, kein Warnhinweis (stattdessen Meilenstein); Tag +1 dasselbe, Serie **10**, kein Warnhinweis; Tag +2 **„Heute wird Tag 1 · Bester Lauf: 10“**. Verifiziert.
- Warum es stört: Wer alles erledigt hat, verliert die Serie, ohne etwas falsch gemacht zu haben und ohne Vorwarnung. Das trifft gerade Anfänger:innen mit kleinem Bestand (ab Stufe 4 liegen ≥ 6 Tage zwischen zwei Abfragen, `intervalForStufe`, `app.js:130`). „Trotzdem üben“ – der einzige Knopf auf diesem Bildschirm – rettet die Serie nicht. Das ist genau das „unberechenbar“, das 3.17.20 abschaffen wollte.
- Vorschlag: Die Regel selbst bleibt unberührt (Lernlogik). Mechanisch, im Rahmen der geltenden Regel: Wenn `serieAktuell({ versatz: 1 }) < serieAktuell()` und heute nichts fällig ist, nennt der Fertig-Stapel (`lernenStapel`, `app.js:10513-10536`) in einem Satz den einzigen Weg, der heute zählt (eine neue Karte anlegen und lernen, `verlaufZaehle("n")`), statt den Warnhinweis an `dueCards().length > 0` zu binden. Ob ein Tag ohne jede fällige Karte die Serie überhaupt kosten soll, ist eine Regelfrage an den Betreiber (hier ohne Empfehlung zur Regel).
- Entscheidet: Betreiber (ob überhaupt etwas geschieht; Text ist mechanisch, die Regelfrage gehört ihm)
- Aufwand: klein (Satz) / Regelfrage offen
- Abnahme: `s2_serie_leer.js`: an Tag +1 steht ein Satz, der sagt, dass ohne Lernen die Serie endet, und wie man sie hält; an Tag +0 (morgen noch verziehen) nicht.
- Pro/Contra: Pro: macht eine stille, unfaire Wirkung sichtbar; kostet keine Regeländerung. Contra: ein Satz mehr auf einem ruhigen Bildschirm, und er schickt Leute zum Anlegen neuer Karten nur wegen der Serie (Serie als Hebel über Verlustangst, vgl. F-17 „lieber nicht“). Empfehlung: Satz ja, aber nur an genau dem einen Tag, an dem es zählt; die Regelfrage dem Betreiber gesondert vorlegen.

#### LERN-2: „Trotzdem üben“ wirft einen in den Verwalten-Reiter, „Abbrechen“ lässt einen dort stehen
- Art: Sackgasse / Gefühl
- Schwere: niedrig
- Beleg: `app.js:14841-14845` `case "trotzdem-ueben"`: `ui.tab = "verwalten"; … openDrillPicker()`. `close-drill` (`app.js:14965`) setzt nur `ui.drillOpen = false`. Messung `s2_serie_leer.js`: nach „Trotzdem üben“ Titel „Verwalten“, Übenauswahl offen; nach „Abbrechen“ weiter „Verwalten“. Foto `s2-trotzdem-ueben.png`. Verifiziert. (Schon in `redesign-oberflaeche/LOGBUCH.md:1327` als „Beschriftung und Ziel passen nicht ganz“ vermerkt, 3.16.0 öffnet seither die Auswahl direkt – der Rückweg blieb.)
- Warum es stört: Man tippt auf dem Lernen-Bildschirm etwas an, landet in einem anderen Reiter und kommt mit „Abbrechen“ nicht dorthin zurück, wo man herkam. Der gleitende Reiter-Anzeiger springt dabei sichtbar nach rechts.
- Vorschlag: Merker `ui.drillVon = "lernen"` beim `trotzdem-ueben`; `close-drill` führt dann zurück auf `ui.tab = "lernen"`. (Größer, eigene Frage: die Übenauswahl als Blatt statt als Kasten im Verwalten-Reiter – dann gäbe es keinen Reiterwechsel.)
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Prüfstand: Lernen „Für heute durch“ → „Trotzdem üben“ → „Abbrechen“ → aktiver Reiter „Lernen“.

#### LERN-3: „Bester Lauf“ zieht nur am Rundenende nach
- Art: Fehler
- Schwere: niedrig
- Beleg: `streak.beste` wird nur in `checkStreakOnSessionComplete()` (`app.js:3102-3107`) hochgezogen; Aufrufer: `app.js:6078` (nur wenn `s.queue.length === 0`) und `lernAbhaken` (`app.js:5652`). Eine Runde, die per X beendet wird (`endSession`, `app.js:6201-6209`), und gelernte Textzeilen (`t`, zählen laut `tagGelernt` für die Serie) ziehen `beste` nicht nach. `lernenSerie` zeigt „Bester Lauf“ nur, wenn `streak.beste > serie` (`app.js:10581`). Codepfad gelesen; Messung folgt.
- Warum es stört: Wer seinen bisher längsten Lauf mit einem X am Ende des letzten Tages beendet, sieht nach dem Reißen einen zu kleinen „Bester Lauf“.
- Vorschlag: `checkStreakOnSessionComplete()` zusätzlich in `verlaufZaehle()` aufrufen, wenn `ersterHeute` (erste zählende Antwort des Tages) – dort steigt die Serie. Regel unverändert, nur der Rekord.
- Entscheidet: Agent (Rekord, keine Regel)
- Aufwand: klein
- Abnahme: Prüfstand: Serie 11, `beste` 10, eine Karte bewerten, X → `streak.beste === 11`.
