# Abfrage-Erlebnis im Detail

Wörtlich aus dem Chat 981b69a1, Agent 26, gestartet 2026-10-07 15:55 (Quelle: `agent-a9f70b50c1097f7a5.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 13 Agenten der ZWEITEN Runde für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css ~260 KB; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server). Betreiber ist ein Einzelner, Nutzer bisher er und wenige Freunde (überwiegend iPhone); Ziel: öffentliche, ernsthafte Lern-Website für deutschsprachige Muslime, die Quran-/klassisches Arabisch lernen.
Der Betreiber hat entschieden: Er will ALLES Nützliche aus Runde 1 bauen. Runde 2 soll tiefer schauen.
RUNDE 1 hat für die Lernrunde bereits vorgeschlagen (nicht wiederholen): Bearbeiten direkt in der Abfrage; Rundenende zeigt die verpatzten Karten mit "noch einmal üben"; Karte überspringen; mehrstufiges Rückgängig; Handschrift auch in der normalen Runde; ohne Harakat abfragen; Wake Lock; Problemkarten mit Diagnose; Verwechslungspaare nebeneinander; optional Antwort tippen. Vorhanden laut Runde 1: Aufdecken, drei Bewertungen (Nicht/Fast/Sicher) per Knopf, Wischen und Tasten 1/2/3, Rückgängig der letzten Bewertung, "Merken" in Speicherkarte "Schwierige Wörter", Notiz beim Aufdecken offen, Handschrift-Canvas im Üben, Haptik nur Android, Rundenlimit 10/20/30/alle, Abschluss mit drei Zahlen.
HARTE REGELN: NUR LESEN im Repo. Keine Datei anlegen/ändern, keine git-Befehle außer lesenden, keine Tests/Server/Skripte. app.js/styles.css nie komplett lesen: Grep, dann Ausschnitte. WICHTIG: UI-/Motion-Änderungen haben hier oft neue Fehler erzeugt (lies plan/onboarding/CHATGPT-HANDOFF-2026-09-27.md und CLAUDE-HANDOFF-2026-09-29.md kurz, sowie in plan/LEHREN.md die Abschnitte zu iOS/Bewegung per Grep "iOS", "keyframes", "Ruckler", "Scroll"). Vorschläge deshalb mit Risiko-Einschätzung und so lokal wie möglich. Bedienung/Optik darf für Design- und Verbesserungszwecke angefasst werden, die Lernlogik nicht ohne Betreiber-Entscheidung. Keine Dark Patterns, keine Spielerei (kein Konfetti, keine Abzeichen).
AUSGABEFORMAT (Deutsch, max. ca. 1000 Wörter): Teil 1 "Befunde/Ideen" (8–14 Punkte; je Punkt: Titel, was genau, Nutzen, Aufwand S/M/L, Abhängigkeiten, Risiko (auch Regressionsrisiko niedrig/mittel/hoch), Beleg Datei:Zeile). Teil 2 "Fragen an den Betreiber" (3–8 Fragen, jede mit 2–3 Sätzen Hintergrund, Auswahlmöglichkeiten und Empfehlung, sodass er ohne Nachschlagen antworten kann). Du kannst die App nicht starten – alles aus dem Code ableiten und Ungeprüftes als Vermutung kennzeichnen.

DEIN AUFTRAG: Die eine Sache, die ein Nutzer tausendfach tut – eine Karte ansehen, sich erinnern, aufdecken, bewerten – unter die Lupe nehmen. Lies renderSession und Umgebung in app.js (ungefähr 10980–11400; Grep "renderSession", "reveal", "grade-", "kartenAbflug", "wisch", "fuehlbar", "extraOpen", "toggle-extra", "karte-merken") und die zugehörigen Stile (Grep in styles.css nach den Klassen der Karte). Kläre: Was steht vor und nach dem Aufdecken auf der Karte (Wort, Übersetzung, Notiz, Lektion/Speicherkarte, Stufe? neu-Hinweis?) – ist die Hierarchie für arabischen Text mit Harakat optimal (Größe, Zeilenhöhe, Zentrierung, lange Einträge, mehrzeilige Übersetzung, Notiz mit gemischter Schriftrichtung)? Wie viel Weg legt der Daumen pro Karte zurück (Position Aufdecken-Knopf vs. Bewertungsknöpfe; Einhandbedienung; Linkshänder)? Sind die drei Bewertungen sprachlich eindeutig ("Fast" – was genau soll ich da drücken? gibt es eine Erklärung beim ersten Mal?), und sieht der Nutzer die Folge seiner Wahl (wann kommt die Karte wieder?) – das Projekt will "System nicht verraten" (plan/grossplan/FUNKTIONEN.md F-13), aber wo liegt die Grenze zwischen Verraten und Verstehen? Fortschritt in der Runde (x von y, was passiert mit "Nicht"-Karten in der Zählung)? Unterbrechung: Was passiert bei App-Wechsel/Anruf/Neuladen mitten in der Runde (Zustand nur im Speicher? bereits bewertete Karten sicher gespeichert? Wiedereinstieg?) Tempo: Wie lange dauert die Abflug-/Eintrittsanimation pro Karte und summiert über 100 Karten; lässt sie sich überspringen (schnelles Tippen)? Fehlbedienung: versehentliches Wischen, Doppeltipp, zu naher Knopf. Stille Rückmeldung ohne Spielerei: Was könnte dem Nutzer am Ende einer Karte ehrlich helfen (z. B. die eigene Handschrift neben der Lösung, Hervorheben des Unterschieds bei Verwechslung)? Runden-Start und -Ende: Wie viele Tipps vom Öffnen der App bis zur ersten Karte; was ist der letzte Eindruck (Abschlussbild) und führt er sinnvoll weiter (zu Neuem, zu Texten, zum Schließen)? Desktop: Tastenkürzel sichtbar erklärt? Suche zusätzlich nach kleinen, belegbaren Unstimmigkeiten im Code der Runde (tote Zweige, widersprüchliche Kommentare wie beim Sitzungslimit), die auf echte Fehler hindeuten.

## Bericht des Agenten

# Lernrunde unter der Lupe (eine Karte: ansehen, aufdecken, bewerten)

Alles aus dem Code abgeleitet, nichts gestartet. Ungeprüftes steht als „Vermutung". Pfade: `C:\Users\USER\Wiederholung\app.js`, `...\styles.css`, `...\plan\LEHREN.md`.

Vorab: Die Unterzeilen unter den Bewertungsknöpfen und der Wisch-Hinweis hat der Betreiber bewusst entfernt (app.js:11273, 11114; LEHREN.md:339). Ich schlage sie nicht wieder vor.

## Teil 1 – Befunde/Ideen

**1. Arabisches Wort wird künstlich fett und enger gesetzt**
- Was: `.study-word` hat `font-weight: 600` und `letter-spacing: -0.02em`. `.arabic` setzt nur Schrift, Richtung und Zeilenhöhe 1.9 zurück. `UthmanicHafs` ist eine einzelne TTF, also vermutlich nur ein Schnitt.
- Vermutung: Der Browser erzeugt die Fettung selbst, Harakat verschmieren, und die negative Laufweite stört die Buchstabenverbindungen.
- Vorschlag: `.study-word.arabic { font-weight: 400; letter-spacing: 0 }`.
- Nutzen: saubere Harakat auf der meistgesehenen Stelle der App.
- Aufwand S. Abhängigkeiten keine. Risiko niedrig; die Wortbreite ändert sich leicht, deshalb mit `t_runde_lage.js` prüfen.
- Beleg: styles.css:1817–1820, 3494–3500, 3515–3525.

**2. Notiz mit gemischter Schriftrichtung**
- Was: `.study-extra` ist fest `text-align: left`, ohne `dir="auto"` oder `unicode-bidi: plaintext`, und nutzt nicht die arabische Schrift.
- Vermutung: Arabische Beispielsätze stehen linksbündig mit Satzzeichen auf der falschen Seite und kleinen Harakat.
- Vorschlag: `unicode-bidi: plaintext; text-align: start` (wirkt je Absatz, weil `pre-wrap`).
- Nutzen: lesbare Beispielsätze. Aufwand S. Abhängigkeiten keine. Risiko niedrig.
- Beleg: styles.css:1828–1837; app.js:11207, 11403–11414.

**3. Sehr lange Karte hat keinen Ausweg (Vermutung)**
- Was: Die Runde hat feste Höhe mit `overflow: hidden`; nur die Notiz scrollt. Die Karte selbst liegt in einer `auto`-Zeile ohne eigenes Scrollen. Ein langer Satz bei großer Arabisch-Stufe plus lange Übersetzung könnte abgeschnitten werden.
- Vorschlag: zuerst nur messen (`t_runde_lage.js` um einen langen Worttext erweitern), dann entscheiden.
- Nutzen: wichtig, sobald Sätze oder Ayat als Karten vorkommen. Aufwand S fürs Messen, M für eine Lösung. Risiko einer Lösung mittel (Kartenhöhe und Drehung).
- Beleg: styles.css:669–685, 1986–1992.

**4. Notizfeld auf kleinen iPhones sehr niedrig (Vermutung)**
- Was: Die Karte ist mindestens 40svh hoch, die Notiz bekommt den Rest. Überschlagen bleiben auf 667 px Höhe etwa 100 px, also rund drei Zeilen mit Scrollen im Feld.
- Vorschlag: messen; falls bestätigt, die Mindesthöhe der Karte auf niedrigen Bildschirmen senken, vor und nach dem Aufdecken gleich (sonst springt sie).
- Aufwand S–M. Risiko mittel.
- Beleg: styles.css:685–691, 1989.

**5. „Fast" wird in der Runde nie erklärt**
- Was: Die Bedeutung steht nur im Einstieg vor der Anmeldung und im `aria-label`. Im Code heißt „Fast": eine Stufe zurück, morgen wieder – also eher „nicht ganz" als „fast gut".
- Vorschlag: einmaliger Satz auf der ersten aufgedeckten Karte, der das Kriterium der Selbsteinschätzung nennt und keine Folge. Beispiel: „Sicher: sofort und richtig. Fast: mit Zögern oder kleinem Fehler. Nicht: nicht gewusst." Als absolut gesetzte Zeile wie `.study-flaeche__tipp`, damit sich nichts verschiebt; Merker über `HINWEISE_KEY`.
- Nutzen: einheitliche Bewertung, ohne Abstände zu verraten. Aufwand S. Abhängigkeit: Wortlaut vom Betreiber. Risiko niedrig.
- Beleg: app.js:5985–5987, 6027–6029, 6891–6894, 11167–11168, 11280–11282.

**6. Zählung und „Nicht"-Karten**
- Was: Nach „Nicht" bleiben „Karte x von y" und der Strich stehen. Am Ende steht mehrfach „Karte 10 von 10". Ist nur noch eine Karte offen, kommt sie sofort wieder.
- Was außerdem: Die Abschlusskachel „nicht" zählt Drücke, nicht Karten. Die drei Zahlen ergeben nicht die Kartenzahl. Die Kacheln stehen als sicher/fast/nicht, die Knöpfe als Nicht/Fast/Sicher.
- Vorschlag: Kacheln in Knopf-Reihenfolge; „nicht" als Anzahl Karten, die mindestens einmal verpatzt wurden; in der Kopfzeile bei Rückkehrern „noch N offen".
- Nutzen: ehrliche, lesbare Zahlen. Aufwand S. Risiko niedrig (reine Anzeige).
- Beleg: app.js:6059–6069, 11024, 11063, 11329–11331.

**7. Unterbrechung: Bewertungen sicher, Runde nicht**
- Was: Jede Bewertung wird sofort geschrieben, mit Offline-Cache; das Tagesprotokoll geht beim Wechsel in den Hintergrund sofort raus. Die Runde selbst (Warteschlange, Zähler, Limit-Stand) liegt nur im Speicher.
- Folge: Beendet iOS die App, startet man neu bei „Karte 1 von N", die Abschlusszahlen sind weg, ein 10er-Limit beginnt von vorn. „Nicht"-Karten bleiben richtig fällig.
- Vorschlag: Rundenstand (Warteschlange, total, Zähler, Bereich, Datum) in `sessionStorage`/`localStorage` ablegen und beim Start am selben Tag „Runde fortsetzen" anbieten.
- Aufwand M. Risiko niedrig bis mittel (gelöschte Karten, Kontowechsel, Tageswechsel); die Lernlogik bleibt unberührt.
- Beleg: app.js:5908, 2233, 2823, 1021–1023, 6201–6209.

**8. Tempo: Bewegung blockiert kaum**
- Aufdecken: Drehung 540 ms; Knöpfe sichtbar ab 140–340 ms; Tipps auf Knöpfe zählen erst nach 400 ms.
- Bewerten: Abflug 260 ms, neue Karte 420 ms; Aufdecken ist sofort möglich.
- Summe auf 100 Karten: rund 95 s sichtbare Bewegung, aber nur etwa 40 s echte Sperre bei Knopf-Nutzern (Wischen 15 s, Tasten 0).
- Schwachstelle: Ein Tipp zwischen etwa 340 und 400 ms wird stumm verworfen, obwohl die Knöpfe schon sichtbar sind.
- Vorschlag: Sperre auf etwa 300 ms senken oder die Knöpfe bis zum Ende der Sperre sichtbar gedimmt lassen.
- Aufwand S. Risiko mittel: 3.17.25 hat genau hier Blindbewertungen gemessen. Nur mit Messung ändern.
- Beleg: app.js:6113–6125; styles.css:2073, 2093, 2196, 2230–2231.

**9. Daumenweg und Fehlgriff**
- Was: „Antwort zeigen" und die Bewertungszeile liegen an derselben Stelle, der Daumen bleibt also liegen. „Sicher" liegt rechts, für Linkshänder liegt „Nicht" am nächsten. Rückgängig sitzt oben rechts, am weitesten vom Daumen entfernt.
- Was: Ein kurzer Schnipp (40 px bei 0,45 px/ms) bewertet bereits.
- Vorschlag: Rückgängig zusätzlich in die `.study-nebenaktionen` unten, als Platzhalter immer vorhanden, damit nichts springt.
- Aufwand S. Risiko niedrig bis mittel (Zeilenbreite bei 320 px).
- Beleg: app.js:11065–11068, 11219–11243, 6278–6280, 6359.

**10. Üben hat kein Rückgängig**
- Was: `lastAction` wird nur außerhalb des Übens gesetzt. Ein Fehltipp auf „Sicher" nimmt die Karte aus der Übungsrunde.
- Vorschlag: im Üben nur die Warteschlange und den Zähler merken und zurückstellen.
- Aufwand S. Risiko niedrig.
- Beleg: app.js:5995–5999, 6162–6164.

**11. „Fast" hat keine Wischrichtung**
- Was: Tastatur nutzt Pfeil runter, die Karte sinkt dabei auch nach unten. Wischen nach unten für „Fast" wäre folgerichtig.
- Aufwand M. Risiko hoch: Gestenachsen, iOS-Systemgesten, die ganze Wisch-Historie (LEHREN.md:1417–1438). Ich rate ab.
- Beleg: app.js:6235, 6245, 6314–6315.

**12. Tastenkürzel nirgends sichtbar**
- Was: 1/2/3, Pfeile, Leertaste und Enter funktionieren, stehen aber in keinem Text und keinem `title`.
- Vorschlag: nur bei `(hover: hover) and (pointer: fine)` kleine Tastenzeichen in den Knöpfen.
- Aufwand S. Risiko niedrig; am Handy unsichtbar.
- Beleg: app.js:6212–6240, 11255, 11280–11282.

**13. Kleine Unstimmigkeiten im Code**
- Toter Zweig `grade-weiter` samt `gradeCard("weiter")` und `geist-weiter`; kein Knopf erzeugt ihn mehr (app.js:14862; styles.css:2199, 2218).
- Veralteter Kommentar „Leertaste trägt durch: aufdecken, dann weiter" – sie deckt nur auf (app.js:6228–6231).
- Kommentar „fünf Punkte", es sind sechs Zustände (app.js:3908–3915, 3930). Die Punktzahl zeigt damit auch die Zahl der Phasen; ob das zu „System nicht verraten" passt, ist eine Betreiberfrage.
- Rückgängig der letzten Karte nimmt einen gerade erhöhten Serien-Rekord nicht zurück (app.js:6078, 3102–3107, 6162 ff.). Randfall.
- Fehlt eine Karte (auf anderem Gerät gelöscht), sinkt `total` nicht; die Zählung springt um eins (app.js:11014–11016).
- Aufwand je S. Risiko niedrig.

**14. Start und Ende**
- Was: Ein Tipp bis zur ersten Karte („Runde starten" bzw. „Weiterlernen"). Der Abschluss zeigt Haken, drei Zahlen, Serie, „Morgen kommen N" und „Fertig", bei Limit zusätzlich „Weiterlernen". Das ist ruhig und ehrlich.
- Was fehlt: ein Weiter, wenn heute alles durch ist. „Trotzdem üben" gibt es nur auf dem Lernen-Tab.
- Vorschlag: höchstens ein leiser Zweitknopf, der sich mit Runde 1 („verpatzte noch einmal üben") deckt.
- Aufwand S. Risiko niedrig.
- Beleg: app.js:10555–10556, 11343–11352, 10524.

## Teil 2 – Fragen an den Betreiber

**1. Arabisches Wort normal statt fett?**
Die Karte setzt das Wort halbfett und leicht enger. Die Koranschrift hat vermutlich nur einen Schnitt, der Browser fettet dann selbst, was Harakat verdickt.
- a) normal, Laufweite 0
- b) so lassen
- c) erst am iPhone vergleichen

Empfehlung: c, dann a.

**2. Einmalige Erklärung der drei Knöpfe?**
In der Runde steht nirgends, wann „Fast" gemeint ist. Die Zeile würde nur das Kriterium nennen, keine Tage und keine Stufen.
- a) ja, einmal auf der ersten aufgedeckten Karte, Wortlaut von Dir
- b) dauerhaft unter „Hilfe"
- c) nein

Empfehlung: a.

**3. Angefangene Runde nach App-Abbruch fortsetzen?**
Bewertungen gehen nie verloren. Zählung, Limit-Stand und Abschlusszahlen beginnen aber neu, wenn iOS die App beendet.
- a) am selben Tag „Runde fortsetzen" anbieten
- b) still fortsetzen
- c) so lassen

Empfehlung: a.

**4. Was soll die Kachel „nicht" zählen?**
Heute zählt sie Drücke: eine Karte, dreimal verpatzt, ergibt 3. Sicher plus Fast ergibt die Kartenzahl, „nicht" kommt obendrauf.
- a) Karten, die mindestens einmal verpatzt wurden
- b) Drücke, aber beschriftet als „mal nicht"
- c) lassen

Empfehlung: a, dazu die Reihenfolge wie die Knöpfe.

**5. Rückgängig zusätzlich unten beim Daumen?**
Es sitzt oben rechts; ein versehentlicher Schnipp bewertet schon ab 40 px.
- a) zusätzlich unten neben „Merken"
- b) nur unten
- c) lassen

Empfehlung: a, mit festem Platzhalter.

**6. Linkshänder-Schalter (Knopfreihe spiegeln)?**
„Sicher" liegt rechts, für links Haltende liegt „Nicht" am nächsten.
- a) Schalter in den Einstellungen
- b) nein, eine Einstellung weniger

Empfehlung: b, bis jemand danach fragt. Wischen und Pfeiltasten müssten sonst mitspiegeln.

**7. Zustandspunkte auf der Kartenvorderseite?**
Vor dem Aufdecken stehen sechs Punkte und ein Wort wie „gefestigt". Das zeigt die Zahl der Phasen und kann die Selbsteinschätzung färben.
- a) lassen
- b) erst nach dem Aufdecken zeigen
- c) nur das Wort, ohne Punkte

Empfehlung: b, nur wenn ein Platzhalter die Höhe hält; sonst a.

**8. Tastenzeichen am Desktop einblenden?**
- a) kleine „1/2/3" und „Leertaste" nur bei Maus-Geräten
- b) nur auf der Hilfe-Seite
- c) nein

Empfehlung: a.
