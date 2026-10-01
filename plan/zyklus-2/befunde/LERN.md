# LERN – Lernen-Tab und Lernrunde (Zyklus 2, Prüfer LERN)

Stand: app.js 3.18.10 (`436dc78`), Prüfstand 127.0.0.1:8099, Chrome 154
(Windows), Firebase-Attrappe. Eigene Skripte und Fotos:
`<scratchpad>/audit/LERN/` (`s1_start.js`, `s2_serie_leer.js`, …).
Prüfzeit 01.10.2026 ab 00:10 Uhr Ortszeit – also Lerntag 30.09. (App-Tag
beginnt 04:00, `lib.tag()` rechnet genauso).

14 Funde, nach Schwere sortiert (2 mittel, 12 niedrig; kein kritischer,
kein hoher). Bekanntes nicht neu gemeldet: E-04, E-05 (Lernlogik, wartet
auf den Betreiber), E-19 (Geste für „Fast“, entschieden: lassen), G-037.
Was nicht mehr geprüft wurde, steht am Ende.

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

#### LERN-2: Der Meilenstein-Hinweis bleibt für immer stehen und sperrt alle anderen Hinweise
- Art: Unfertig / Gefühl
- Schwere: mittel
- Beleg: `app.js:10294-10301` – der Hinweis erscheint, solange `erreicht > (sp.meilenstein || 0)`; gemerkt wird nur beim Tipp auf das X (`hinweisWeg`, `app.js:10353`). Kein Datum, kein Ablauf. `lernenHinweis` gibt beim ersten Treffer zurück, also verdrängt er Wochenrückblick (`10304`), „Erinnerung einrichten“ (`10314`) und „Idee einreichen“ (`10319`). Messung `s1_start.js`, Lerntag Mittwoch (Rückblick wäre dran): Konto mit 36 gesessenen Karten zeigt „36 Karten saßen schon einmal“, das Konto ohne gesessene Karten zeigt „Deine letzte Woche“. Der Text nennt seit G-061 die laufende Zahl – nach Tagen steht dort z. B. „31 Karten saßen schon einmal“, was kein Meilenstein mehr ist. Verifiziert.
- Warum es stört: Ein Glückwunsch, der wochenlang an derselben Stelle steht, wird zu einem toten Kasten (Betreiber: „nichts, was tot wirkt“). Wer das kleine X nie antippt, bekommt nie den Wochenrückblick und nie das Angebot der täglichen Erinnerung – also genau die Dinge, die zum Zurückkommen gedacht sind.
- Vorschlag: Der Meilenstein gilt nach dem Tag, an dem er zuerst gezeigt wurde, als gesehen (beim ersten Zeichnen `meilensteinTag: todayStr()` in `adrabic-hinweise` merken; an Folgetagen `meilenstein` nachziehen und nicht mehr zeigen). Kein neuer Speicher-Schlüssel. Besser noch: den Meilenstein dort feiern, wo er erreicht wird – als Zeile im Rundenende (`renderRundenEnde`), auf Lernen nur noch am selben Tag.
- Entscheidet: Agent (Ablauf nach einem Tag, mechanisch) | Betreiber (Verlegen ins Rundenende – neue Stelle)
- Aufwand: klein
- Abnahme: Prüfstand mit `tagVersatz: 1`: Meilenstein von gestern steht nicht mehr, an einem Mo–Mi erscheint der Rückblick.
- Pro/Contra (Verlegen): Pro: Belohnung im Moment des Erreichens (das Rundenende ist die Stelle mit der Feier), Lernen-Tab wird ruhiger. Contra: Das Rundenende hat schon Kacheln, Serie und „morgen“ – eine weitere Zeile ist an der Grenze. Empfehlung: Ablauf nach einem Tag jetzt; Verlegen nur, wenn der Betreiber das Rundenende ohnehin anfasst.

#### LERN-3: „Trotzdem üben“ wirft einen in den Verwalten-Reiter, „Abbrechen“ lässt einen dort stehen
- Art: Sackgasse / Gefühl
- Schwere: niedrig
- Beleg: `app.js:14841-14845` `case "trotzdem-ueben"`: `ui.tab = "verwalten"; … openDrillPicker()`. `close-drill` (`app.js:14965`) setzt nur `ui.drillOpen = false`. Messung `s2_serie_leer.js`: nach „Trotzdem üben“ Titel „Verwalten“, Übenauswahl offen; nach „Abbrechen“ weiter „Verwalten“. Foto `s2-trotzdem-ueben.png`. Verifiziert. (Schon in `redesign-oberflaeche/LOGBUCH.md:1327` als „Beschriftung und Ziel passen nicht ganz“ vermerkt, 3.16.0 öffnet seither die Auswahl direkt – der Rückweg blieb.)
- Warum es stört: Man tippt auf dem Lernen-Bildschirm etwas an, landet in einem anderen Reiter und kommt mit „Abbrechen“ nicht dorthin zurück, wo man herkam. Der gleitende Reiter-Anzeiger springt dabei sichtbar nach rechts.
- Vorschlag: Merker `ui.drillVon = "lernen"` beim `trotzdem-ueben`; `close-drill` führt dann zurück auf `ui.tab = "lernen"`. (Größer, eigene Frage: die Übenauswahl als Blatt statt als Kasten im Verwalten-Reiter – dann gäbe es keinen Reiterwechsel.)
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Prüfstand: Lernen „Für heute durch“ → „Trotzdem üben“ → „Abbrechen“ → aktiver Reiter „Lernen“.

#### LERN-4: „Bester Lauf“ zieht nur am Rundenende nach
- Art: Fehler
- Schwere: niedrig
- Beleg: `streak.beste` wird nur in `checkStreakOnSessionComplete()` (`app.js:3102-3107`) hochgezogen; Aufrufer: `app.js:6078` (nur wenn `s.queue.length === 0`) und `lernAbhaken` (`app.js:5652`). Eine Runde, die per X beendet wird (`endSession`, `app.js:6201-6209`), und gelernte Textzeilen (`t`, zählen laut `tagGelernt` für die Serie) ziehen `beste` nicht nach. `lernenSerie` zeigt „Bester Lauf“ nur, wenn `streak.beste > serie` (`app.js:10581`). Messung `s6_beste.js` (11 Tage am Stück, `beste` 11): eine Karte bewerten, dann X → Serie **12**, gespeichert bleibt `beste: 11`; dieselbe Runde zu Ende gespielt → `beste: 12`. Verifiziert.
- Warum es stört: Wer seinen bisher längsten Lauf mit einem X am Ende des letzten Tages beendet, sieht nach dem Reißen einen zu kleinen „Bester Lauf“.
- Vorschlag: `checkStreakOnSessionComplete()` zusätzlich in `verlaufZaehle()` aufrufen, wenn `ersterHeute` (erste zählende Antwort des Tages) – dort steigt die Serie. Regel unverändert, nur der Rekord.
- Entscheidet: Agent (Rekord, keine Regel)
- Aufwand: klein
- Abnahme: Prüfstand: Serie 11, `beste` 10, eine Karte bewerten, X → `streak.beste === 11`.

#### LERN-5: „Merken“ springt zwischen Karten mit und ohne Notiz 68 px zur Seite
- Art: Gefühl
- Schwere: niedrig
- Beleg: `app.js:11219-11224` – hat die Karte eine Notiz, steht vor dem Aufdecken ein unsichtbarer Zwilling des Notiz-Knopfs (`platz-leer`) links neben „Merken“; ohne Notiz steht „Merken“ allein in der Mitte. Messung `s4_neben.js` (Handy 390): linke Kante von „Merken“ bei 143 px (ohne Notiz) bzw. 211 px (mit Notiz), 12 Karten, zweimal Wechsel hin und zurück. Foto `s3-handy-wechsel.png`: „Merken“ steht vor dem Aufdecken sichtbar außermittig, links daneben nichts. Verifiziert.
- Warum es stört: Der einzige Knopf dieser Zeile steht mal mittig, mal rechts daneben, ohne dass man sieht warum. In der Runde soll von Karte zu Karte alles an derselben Stelle stehen (3.15.0 und 3.17.26 haben genau das für Karte und Wort hergestellt).
- Vorschlag: `.study-nebenaktionen` als festes Raster mit zwei Plätzen (links Notiz, rechts Merken); der Notiz-Platz bleibt auch bei Karten ohne Notiz leer stehen – oder „Merken“ fest in die Mitte und der Notiz-Knopf absolut links daneben. Nur `styles.css` und die Zeilen in `renderSession`.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `s4_neben.js`: „Merken“ hat auf allen 12 Karten dieselbe linke Kante (±1 px), vor und nach dem Aufdecken.

#### LERN-6: Tastatur in der Runde: Escape tut nichts, Rückgängig hat keine Taste, zwei Kommentare beschreiben altes Verhalten
- Art: Fehlt / Aufräumen
- Schwere: niedrig
- Beleg: `app.js:6212-6240` kennt Leertaste/Enter (aufdecken), 1/2/3 und Pfeile. Escape läuft nur über `schliesseObersteEbene()` (`app.js:14252-14257`), die eine Runde nicht kennt – Messung `s4_neben.js`: „Escape beendet Runde? false“. Für `undoLastGrade` gibt es keine Taste. Kommentar `app.js:6228-6229` „Im Uebungsmodus traegt die Leertaste durch: aufdecken, dann weiter“ stimmt seit 3.15.0 nicht mehr (der Code deckt nur auf, `6230`); `app.js:11146-11147` „im Ueben deckt ohnehin ein Tipp irgendwo auf“ steht gegen `11250-11251` „ein Tipp irgendwo darf nicht mehr weiterschalten“. Nirgends erfährt man am Desktop, dass es die Tasten gibt (`grep "Leertaste\|kbd\|aria-keyshortcuts" app.js`: nur Kommentare). Verifiziert.
- Warum es stört: Am Laptop lernt man mit den Tasten – ein Fehlgriff auf „3“ verlangt dann doch die Maus oder mehrere Tab-Schritte. Und niemand erfährt, dass die Tasten existieren.
- Vorschlag: `Backspace` oder `z` → `undoLastGrade()`, `Escape` → `endSession()` (nur wenn kein Blatt/Dialog offen; die Prüfung steht schon in `6218`). `aria-keyshortcuts` an den drei Bewertungsknöpfen und am Aufdecken-Knopf; sichtbare kleine Tastenmarke nur bei `(hover: hover) and (pointer: fine)`. Die Kommentare berichtigen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Prüfstand Desktop: `3`, dann `Backspace` → Karte wieder offen; `Escape` → Lernen-Start, Tagesprotokoll geschrieben (`t_x_mitten.js` grün).

#### LERN-7: Nach „Rückgängig“ steigt die Karte vom Stapel auf, statt von dort zurückzukommen, wohin sie flog
- Art: Bewegung
- Schwere: niedrig
- Beleg: `undoLastGrade` zählt `s.zug` hoch (`app.js:6191`), `renderSession` hält die Karte deshalb für neu (`11030-11031`) und setzt `study-flaeche--kommt`. Messung `s4_neben.js` direkt nach Rückgängig: laufende Animationen `karte-kommt@study-flaeche--offen`, `stapel-rueckt` (2×), `fortschritt-waechst`. Verifiziert; wie es sich anfühlt, kann nur ein Gerät zeigen (LEHREN § 5.6).
- Warum es stört: Die Karte ist eben nach links (Nicht) oder rechts (Sicher) weggeflogen. Beim Zurückholen kommt sie von unten aus dem Stapel – die Bewegung erzählt „nächste Karte“, nicht „zurück“.
- Vorschlag: In `undoLastGrade` die zurückgenommene Art merken (`s.zurueckVon = letzteArt`, vor dem Leeren in `6190`); `renderSession` setzt dann einmalig eine Klasse `study-flaeche--zurueck-<art>` (Keyframes = die `geist-*` rückwärts, 260 ms). Bei reduzierter Bewegung nichts.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `document.getAnimations()` direkt nach Rückgängig zeigt die Rückkehr-Animation statt `karte-kommt`; `t_sprung.js` weiter 0 px.

#### LERN-8: Rundenende mit Rundenlimit sagt „Geschafft“ und darunter „10 Karten geschafft.“
- Art: Gefühl (Text doppelt)
- Schwere: niedrig
- Beleg: `app.js:11322` Überschrift „Geschafft“, `app.js:11326` Satz `gesamt + ' Karten geschafft.'`. Foto `s3-handy-ende.png` (Limit 10). Verifiziert.
- Warum es stört: Dasselbe Wort zweimal untereinander (LEHREN § 6.9). Ohne Limit steht dort „Alle 12 Karten für heute durch.“ – das liest sich gut.
- Vorschlag: Satz im Limit-Fall: „10 Karten in dieser Runde.“
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `t_rundenende.js` (lesen): im Limit-Fall kommt „geschafft“ nur einmal vor.

#### LERN-9: Im Üben deckt ein Tipp irgendwo auf, im Lernen nur die Karte oder der Knopf
- Art: Aufräumen
- Schwere: niedrig
- Beleg: `app.js:13524-13535` – der `body`-Klick-Listener deckt im Üben (`s.isDrill`) bei jedem Tipp außerhalb von Knöpfen auf. Für die Lernrunde gibt es das nicht (`data-action="reveal"` nur an `.study-flaeche` und am Knopf, `app.js:11152`, `11255`). Der Kommentar `11247-11251` sagt, Üben und Lernen verhielten sich seit 3.15.0 gleich. Messung `s5_rest.js` (Handy): Tipp 60 px unter der Karte in die leere Fläche deckt im Üben auf. Verifiziert.
- Warum es stört: Zwei Runden, die gleich aussehen, verhalten sich verschieden; im Üben deckt ein Fehlgriff neben die Karte auf.
- Vorschlag: Den `body`-Listener entfernen (Karte und Knopf reichen seit 3.15.0), samt Kommentarblock `13508-13523`. Vorher `t_ueben.js` und `t_hick.js` lesen, ob sie sich darauf stützen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Prüfstand Üben: Tipp in die leere Fläche unter der Karte deckt nicht auf; `t_ueben.js`, `t_sprung_ueben.js` grün.

#### LERN-10: „Für heute durch“ mit vollem Ring und Haken, auch wenn heute gar nichts gelernt wurde
- Art: Gefühl
- Schwere: niedrig
- Beleg: `app.js:10513-10521` – der Fertig-Stapel hängt nur an `due.length === 0`, nicht daran, ob heute etwas getan wurde; Text „ist nichts mehr fällig“. Foto `s1-handy-nichtsFaellig.png`: voller Ring, Haken, „Für heute durch“, darunter die Woche mit leerem Heute-Punkt. Verifiziert.
- Warum es stört: Lob für nichts – und direkt darunter zeigt die Woche, dass heute nicht zählt. Zusammen mit LERN-1 ist das der Bildschirm, auf dem die Serie still verloren geht.
- Vorschlag: Zwei Fassungen: heute gelernt (`tagGelernt(verlauf[todayStr()])`) → wie jetzt; heute nichts gelernt → Titel „Heute ist nichts fällig“, Text „Die nächsten Karten kommen am <Wochentag>.“ (`vorschau7` kennt den Tag), Ring ohne Füllung.
- Entscheidet: Agent (Text und Zustand, keine Logik)
- Aufwand: klein
- Abnahme: `s1_start.js nichtsFaellig`: Titel ohne „durch“; Zustand `erledigt` unverändert.

#### LERN-11: Nach langer Pause steht nur eine große Zahl da
- Art: Funktion
- Schwere: niedrig
- Beleg: Messung `s1_start.js`: 60 Tage weg → „40 fällig · 40 Wiederholungen · Runde starten · Heute wird Tag 1 · Bester Lauf: 30“; 3000 Karten → „1100 fällig“. `startSession` (`app.js:5892-5899`) nimmt bei Limit „alle“ alles in eine Runde („Karte 1 von 1100“). Kein Unterschied zum normalen Tag. Verifiziert.
- Warum es stört: Der Moment des Zurückkommens entscheidet, ob jemand bleibt. Eine vierstellige Zahl ohne Angebot ist ein bekannter Grund, eine Karteikarten-App wieder zu schließen.
- Vorschlag: Nur Anzeige, keine Lernlogik: Ist `due.length` größer als das größte Rundenlimit (30) und steht das Limit auf „alle“, bietet der Stapel unter dem Hauptknopf einen leisen zweiten an: „Erst einmal 20“ (startet eine Runde mit 20, ändert die Einstellung nicht). Hängt an E-05 (welche 20 – heute die obersten der Liste).
- Entscheidet: Betreiber (neue Funktion; E-05 zuerst)
- Aufwand: klein
- Abnahme: Prüfstand 1100 fällig, Limit „alle“: zweiter Knopf vorhanden, Runde zeigt „Karte 1 von 20“, `settings.sitzungsLimit` unverändert.
- Pro/Contra: Pro: nimmt die Hürde genau im kritischen Moment, ohne eine Regel zu ändern. Contra: ein zweiter Knopf auf dem Bildschirm mit der einen Handlung (Hick); wer ein Limit will, hat die Einstellung. Empfehlung: erst nach E-05 entscheiden; ohne „dringendste zuerst“ wären die 20 die falschen.

#### LERN-12: „Heute auch fällig: Bereich X (3)“ lässt sich nicht antippen
- Art: Sackgasse
- Schwere: niedrig
- Beleg: `app.js:10198-10204` – der Hinweis ist ein `div.banner-info` mit Text, ohne `data-action`. Den Bereich wechselt man am Handy nur über die Pille in der Kopfzeile (`bereich-sheet-auf`), `select-bereich` (`app.js:14817`) gibt es als Handlung schon. Codepfad gelesen.
- Warum es stört: Der Hinweis nennt, wo noch etwas wartet, führt aber nicht hin. Man muss den Namen merken, nach oben greifen, das Blatt öffnen und ihn dort wiederfinden.
- Vorschlag: Jeden genannten Bereich als Knopf ausgeben (`data-action="select-bereich" data-bid=…`), Form wie `.tiny-link` im Backup-Banner (`app.js:8560`). Trefferfläche ≥ 44 px beachten (G-063).
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Prüfstand Zustand „zweiBereiche“ (`t_lernen_start.js`): Tipp auf den Namen → Kopfzeile zeigt den anderen Bereich, Stapel zeigt dessen Fällige.

#### LERN-13: Nachts begrüßt die App mit „Gute Nacht“
- Art: Gefühl (Text)
- Schwere: niedrig
- Beleg: `app.js:10469` `std < 5 ? "Gute Nacht"`. Fotos `s1-handy-*.png` (00:11 Uhr): „Gute Nacht, Test“ als Überschrift über „12 fällig · Runde starten“. Verifiziert.
- Warum es stört: „Gute Nacht“ ist im Deutschen ein Abschied, keine Begrüßung – als Überschrift über dem Startknopf liest es sich wie „geh schlafen“.
- Vorschlag: Bis 5 Uhr „Guten Abend“ (oder ohne Tageszeit: „Hallo, Name“).
- Entscheidet: Agent (nachweislich schiefer Text)
- Aufwand: klein
- Abnahme: `t_gruss_datum.js` um 01:00 Uhr: Überschrift enthält nicht „Gute Nacht“.

#### LERN-14: Die Flamme steht für die Serie und für „oft vergessen“
- Art: Gefühl
- Schwere: niedrig
- Beleg: `app.js:10990` `leechHinweis` benutzt `ikon("serie", …)`; dieselbe Flamme trägt die Serie (`app.js:10577`, `11334`) und den Serie-Warnhinweis (`10291`). Foto `s5-hell-offen.png`: rote Flamme vor „Schon 6-mal vergessen“. Verifiziert.
- Warum es stört: Ein Zeichen, zwei gegensätzliche Bedeutungen (Belohnung und Sorgenkind) – in der Runde direkt unter der Karte.
- Vorschlag: Im Rückfall-Hinweis `ikon("warnung")` (gibt es schon, `app.js:10966`).
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep -n 'leech-banner' app.js` zeigt kein `ikon("serie"`.

---

## Geprüft ohne Fund

- **Rundenende unter dem Finger** (`s3_runde.js`, Handy 390, 360, iPad, Desktop): Die Knöpfe „Fertig / Weiterlernen / Rückgängig“ blenden 1,3 s unsichtbar ein, liegen aber nirgends dort, wo zuletzt „Sicher“ getippt wurde (Sicher y 764 / 660 / 1100 / 820, Knöpfe y 483–587). Ein Doppeltipp auf die letzte Karte trifft nichts.
- **Rundenlimit und Weiterlernen:** Limit 10 → „10 Karten geschafft. Heute sind noch 2 Karten offen.“, „Weiterlernen“ startet die nächste Runde; ohne Limit „Alle 12 Karten für heute durch.“ Rückgängig vom Rundenende vorhanden.
- **Modus dicht:** In der Runde sind Navigation und Bereichsliste auf allen vier Breiten nicht erreichbar (kein Bereichswechsel mitten in der Runde, auch am Desktop nicht).
- **Reduzierte Bewegung** (`s5_rest.js`): Antwort 150 ms nach dem Aufdecken voll sichtbar, keine laufende Animation, kein fliegender Geist, Knöpfe am Rundenende sofort mit Deckkraft 1.
- **Raster ab 720 px** (`s1_start.js`, iPad 820 und Desktop 1440; Zustände voll, erledigt, nur neu): Stapel links, Hinweis und Serie rechts, kein waagerechtes Scrollen, Seite nicht höher als der Bildschirm.
- **Große Zahlen:** „1100 fällig“, „900 Wiederholungen“, „2800 Karten saßen“ passen am Handy in Ring, Plaketten und Hinweis (Foto `s1-handy-gross3000.png`). Tempo bei 3000 Karten nicht neu gemessen (G-037, mehrere Agenten gleichzeitig).
- **Helles Thema:** Startseite und offene Karte gelesen (Fotos `s5-hell-*.png`), nichts Auffälliges; Kontrast nicht neu gemessen (`t_kontrast.js` deckt es).
- **Tab-Reihenfolge in der Runde:** X → Rückgängig → Merken → Antwort zeigen; Enter/Leertaste auf einem fokussierten Knopf lösen den Knopf aus.
- **Hinweise:** höchstens einer zugleich; Serie-Warnung vor Meilenstein vor Rückblick (Reihenfolge wie im Kopfkommentar `app.js:10220-10227`).
- **Serie-Anzeige im Prüfstand:** Dass die Serie im Standard-Testkonto nach der ersten Runde bei 4 bleibt, ist der Sockel der Attrappe (LEHREN § 13), kein App-Fehler.
- **Leerer Bereich / neues Konto:** Codepfad `app.js:10113-10167` gelesen (Start-Liste, drei Wege zu Karten, geführter Satz ohne Anlegen-Knopf) – keine Sackgasse gefunden; nicht neu fotografiert (`t_lernen_start.js` deckt die Zustände).

## Nicht mehr geprüft (Zeit/Limit)

- Wischen mit echten Touch-Ereignissen (nur Code `app.js:6292-6378` gelesen; `t_wischen*.js` nicht neu gelaufen).
- Schreiben-Modus über eine ganze Runde (nur ein Foto der ersten Karte, `s5-schreiben.png`: Zeichenfläche und „Fertig“ im Bild, untere 40 % leer).
- Durchsicht geführter Sätze (`renderDurchsicht`, `renderFaden`) und „Gesehen“.
- `gemerktHinweis`, Notiz mit langem Text oder Bild, Rückfall-Hinweis auf kleinem Handy.
- Texte im Lernen-Tab (`lernenTexte`, nur Betreiber-Konto).
- iPad quer, 320 px, Querformat am Handy.
- Die 13 Tests aus `abnahme_runde.js` wurden nicht neu gestartet; Server 8099 fiel während der Prüfung aus, die letzten Messungen liefen über einen eigenen Server auf 8141.
- Vermutung, nicht belegt: Bei 0 % Tagesanteil zeichnet der Ring einen einzelnen hellen Punkt oben (`stroke-linecap: round` auf einer Strecke der Länge 0, `styles.css:1654-1657`; in Chromium sichtbar, Foto `s1-handy-voll.png`). Ob das gewollt ist und wie WebKit es zeichnet, ist offen.
