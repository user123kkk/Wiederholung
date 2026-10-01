# Befunde FORT – Fortschritt-Tab (Zyklus 2, Bereich B3)

Prüfer: FORT (nur gelesen und gemessen, kein Code geändert). Stand 3.18.10
(`436dc78`), 01.10.2026. Werkzeuge und Fotos:
`<scratchpad>/audit/FORT/` (`fotos.js`, `mess2.js`, `ziffer.js`,
`kontrast_rechnen.js`, `lauf-*.txt`, `bilder/`). Prüfstand mit
Firebase-Attrappe, Chrome 154. Nicht geprüft: echtes iPhone/WebKit.

## 1. Was der Tab zeigt (Fotos in allen Zuständen)

Handy 390×844, hell und dunkel; dazu iPad 820, Desktop 1440, Handy 360.

| Zustand | Wie erzeugt | Was auf dem Bildschirm steht |
|---|---|---|
| leer | keine Karte | „Noch nichts zu zeigen“ + Knopf „Karten anlegen“ |
| importiert | 40 Karten, nie abgefragt | leeres Raster, „Noch nichts aufgezeichnet …“, **„0 ٠ von 40 Karten saßen schon einmal“** |
| eine Karte, „Nicht“ | 1 Karte | „2 Antworten in den letzten 7 Tagen“, **„0 ٠ von 1 Karte saßen schon einmal“** |
| eine Karte, „Sicher“ | 1 Karte | „1 Antwort …“, „1 ١ von 1 Karte saß schon einmal“ |
| voll | `vollerStore()`, 40 Karten, 25 Tage | „52 Antworten in den letzten 7 Tagen“, rote Pille **„↓ 20 % zu den 7 Tagen davor“**, Raster 4 Spalten, „36 von 40 Karten saßen schon einmal“, Band + 5 Stände, drei Zeilen „Genauer ansehen“ |
| viele | 1600 Karten, 3 Bereiche, 30 Lektionen, 110 Tage | „555 Antworten … ↓ 16 %“, Raster 12 Spalten, „1444 von 1600“, „Lektionen 2 von 30 sitzen“, „Karten, die nicht klappen 29“, „Die nächsten 7 Tage 474 Karten“ |
| Pause 10 Tage | voll, Datum +10 | „In den letzten 7 Tagen noch keine Antwort – eine Runde reicht für den Anfang.“ (kein Knopf) |
| Pause 30 Tage | voll, Datum +30 | Überschrift „Die letzten 8 Wochen“, Raster, **kein einziger Satz** |
| Pause 100 Tage | voll, Datum +100 | **„Noch nichts aufgezeichnet – ab dem ersten gelernten Tag füllt sich das Raster.“** (falsch) |

Höhe am Handy: 1,0 bis 1,24 Bildschirme. Kein waagerechtes Scrollen, keine
Konsolenfehler in allen Läufen.

## 2. Diagnose: warum der Tab „dumm“ wirkt

Jedes Element gegen die drei Fragen eines Lernenden gehalten:

| Element | Wo stehe ich? | Was tue ich als Nächstes? | Werde ich besser? | Urteil |
|---|---|---|---|---|
| „N Antworten in den letzten 7 Tagen“ (größte Zahl oben) | nein | nein | **nein, eher das Gegenteil** | Zahl ohne Nutzen. Sie misst Arbeit, nicht Können. Wie viel fällig ist, bestimmt die App, nicht der Lernende (FORT-1) |
| Pille „↑/↓ x % zu den 7 Tagen davor“ | nein | nein | **falsches Signal** | Rot, wenn weniger fällig war (also wenn der Stoff sitzt). Grün, wenn viel vergessen wurde (FORT-1) |
| Kalender-Raster | kaum | nein | kaum | Ohne Wochentage, Monate, Legende. Am Handy 78 von 324 px breit. Leere Tage unsichtbar. Dasselbe sagen die sieben Punkte auf Lernen besser (FORT-7) |
| „X von Y Karten saßen schon einmal“ | halb | nein | halb | Die einzige Zahl, die wächst. „Saß“ heißt aber nur „einmal gewusst“ und ist nach der ersten Runde fast voll (FORT-6). Steht als Hinweis schon auf Lernen (FORT-9) |
| Band + Stände (neu … dauerhaft) | **ja** | nein | ja, wenn man es zweimal vergleicht | Das beste Element. Zeigt aber nur den Augenblick, keine Veränderung, und man kann nichts antippen |
| Zeile „Lektionen“ | ja | nein | – | Liste ohne Handlung, hängt als einziges am Bereich im Kopf (FORT-3, FORT-8) |
| Zeile „Karten, die nicht klappen“ | ja | **ja** (bearbeiten) | – | Das einzige Element mit Handlung. Versteckt in der dritten Ebene |
| Zeile „Die nächsten 7 Tage“ | – | halb (planen) | – | Nützlich, aber „morgen kommen N“ steht schon auf Lernen |

Zusammengefasst, in der Reihenfolge der Wirkung:

1. **Der Tab zählt Fleiß, nicht Können.** Oben und am größten steht die Zahl
   der Antworten. In einer App mit Wiederholungsabständen ist das die eine
   Zahl, die der Lernende nicht steuert, und sie sinkt, wenn er gut lernt.
   Wer sechs von sieben Tagen gelernt hat, bekommt eine rote Pille.
2. **Nichts führt irgendwohin.** Auf dem Hauptbildschirm gibt es keinen Knopf.
   Selbst der Satz „eine Runde reicht für den Anfang“ hat keinen. Der Tab ist
   eine Anzeige, die man ansieht und wieder verlässt.
3. **Er zeigt kein einziges Wort.** Eine App für arabische Wörter zeigt im
   Fortschritt nur Zähler. Kein „diese Wörter kannst du jetzt“, kein „diese
   sind seit letzter Woche fester geworden“.
4. **Es gibt keine Veränderung über die Zeit beim Stoff.** Das Band zeigt den
   Stand heute. Ob es gestern anders war, sieht niemand. Der Tab sieht an zwei
   Tagen hintereinander praktisch gleich aus, also gibt es keinen Grund, ihn
   noch einmal zu öffnen.
5. **Was er kann, steht schon auf Lernen** (Wochenpunkte, Meilenstein „36
   Karten saßen schon einmal“, Wochenrückblick Mo–Mi, „Morgen kommen N
   Karten“). Seit 3.16.0 sind Serie und „Heute“ zu Recht dort. Übrig blieb ein
   Rest, der allein keinen Tab trägt.
6. **Er widerspricht sich und dem Kopf darüber:** Die Bereichs-Pille oben
   wirkt nicht (FORT-3), „sitzt“ heißt drei verschiedene Dinge (FORT-6), nach
   einer langen Pause steht ein falscher Satz da (FORT-4).
7. **Er sieht leer aus.** Raster links oben in einer großen Karte, am iPad
   zwei halb leere Kästen und 40 % freier Bildschirm (FORT-13).

Was fehlt, das einen Grund zum Zurückkommen gibt (alles im Rahmen von LEHREN
§ 3.5/§ 6.9/§ 7.1: keine Abstände, keine Stufenzahlen, kein „Tage gelernt“,
keine Serie, keine Null als Stillstand):

- **Bewegung im Stoff seit dem letzten Besuch:** „Seit letzter Woche: 5
  Karten neu gelernt, 3 sind fester geworden.“ Wächst mit jeder Runde, ist nie
  null, wenn gelernt wurde, und fehlt einfach, wenn nicht.
- **Die Wörter selbst:** „Diese kannst du jetzt“ (die zuletzt gefestigten,
  als arabische Wörter). Das ist der Stolz-Moment, den eine Zahl nicht gibt.
- **Ein nahes Ziel:** „Noch 4 Karten, dann sitzt Lektion 1“ (gibt es als
  Rechnung schon in `fortschrittLektionen`, steht aber zwei Tipps tief).
- **Eine Handlung je Block:** Sorgenkinder ansehen, Lektion weiterlernen,
  Runde starten.

## 3. Funde (nach Schwere)

#### FORT-1: Die größte Zahl und die Pille belohnen Vergessen und bestrafen gutes Lernen
- Art: Gefühl
- Schwere: hoch
- Beleg: `app.js:10664–10691` (`diese = verlaufSumme(7)`, Pille `trend-up/trend-down` aus `delta` der Antworten). Jede Antwort zählt (`app.js:6049` `verlaufZaehle(warNeu ? "n" : "w")`), und „Nicht“ hängt die Karte wieder an (`app.js:6069` `s.queue.push(id)`), sie wird also in derselben Runde noch einmal gezählt. Foto `fort-voll-handy-dunkel`: 21 von 24 Tagen gelernt, trotzdem rote Pille „↓ 20 % zu den 7 Tagen davor“. Ebenso „viele“: „↓ 16 %“. **verifiziert**
- Warum es stört: Wer viel vergisst, bekommt mehr Antworten und einen grünen Pfeil. Wer gut lernt, hat weniger Fälliges und bekommt einen roten. Die Zahl sagt nichts darüber, ob man Arabisch besser kann, und sie ist das Erste, was man im Tab sieht.
- Vorschlag: Pille streichen. Die Antworten-Zahl von der Hauptzahl zu einer leisen Zeile machen oder ganz weglassen. An die Stelle kommt eine Zahl über den Stoff (siehe Weg b). `fortschrittWochen()`, `.trend-pill`, `tickCountups()` (nur noch nötig, wenn eine Zahl bleibt).
- Entscheidet: Betreiber (die Pille kam aus seinem Design-Handoff, 3.0.45)
- Aufwand: klein
- Abnahme: `grep -c "trend-pill" app.js` = 0; Foto „voll“ zeigt oben keine rote Fläche mehr; `t_fortschritt.js` grün.
- Pro/Contra: Dafür (streichen): falsches Signal, rote Farbe als erste Rückmeldung, „0 %“-Fall und Pausen-Fall mussten schon zweimal geflickt werden (3.17.34). Dagegen: Manche mögen eine Wochenzahl, und die Hochzähl-Bewegung war ausdrücklich gewünscht. Empfehlung: Pille weg, Zahl klein lassen. Die Bewegung kann auf eine Stoff-Zahl umziehen.

#### FORT-2: Neben der Kartenzahl steht ein Versende-Zeichen aus dem Quran
- Art: Fehler
- Schwere: hoch
- Beleg: `app.js:10730` `'<span class="arab-ziffer" lang="ar" dir="rtl">' + arabZahl(gesessen)`; `styles.css:3059` `.arab-ziffer { font-family: var(--font-arabic); }`, `styles.css:62` beginnt mit `'UthmanicHafs'`. Gemessen (`ziffer.js`, CDP `getPlatformFontsForNode`): Schrift „KFGQPC HAFS Uthmanic Script“, zwei Ziffern werden **eine** Glyphe. Foto `bilder/ziffer-voll.png`: „36“ und daneben ٣٦ im verzierten Kreis, also das Zeichen, das im Mushaf das Ende einer Aya mit ihrer Nummer markiert. Bei 1444 entstehen zwei Kreise (Foto `fort-viele-desktop-hell`), bei 0 nur ein Punkt („0 .“, Foto `ziffer-null.png`). **verifiziert**
- Warum es stört: Ein Zeichen aus dem Quran schmückt eine Statistik über Karteikarten und liest sich wie „Aya 36“. LEHREN § 2 Punkt 6 sagt, die Quran-Schrift ist nur für arabischen Text da. Der Null-Fall sieht aus wie ein Tippfehler.
- Vorschlag: `.arab-ziffer` nicht in der Quran-Schrift setzen (eigene Regel mit einer Schrift ohne dieses Verhalten, keine fremden Server) **oder** die Zierziffer ganz weglassen. `styles.css:3059–3062`, `app.js:10730`. Tote Regel `.serie-zahl .arab-ziffer` mit entfernen.
- Entscheidet: Betreiber (religiöser Rahmen, § 2)
- Aufwand: klein
- Abnahme: `ziffer.js` zeigt für die Ziffer eine andere Schrift und `glyphCount` = Zahl der Ziffern; Foto ohne Kreis; oder `grep -c "arab-ziffer" app.js` = 0.
- Pro/Contra: Dafür (weglassen): keine Frage mehr, ob das Zeichen passt, eine Zier weniger. Dagegen: Die Ziffern waren als „Handschrift der App“ gedacht (2.9.0) und lehren nebenbei die Ziffern. Empfehlung: weglassen. Wenn er sie behalten will, dann in einer neutralen Schrift und nie bei 0.

#### FORT-3: Der Bereich oben im Kopf gilt für die Zahlen darunter nicht
- Art: Fehler
- Schwere: hoch
- Beleg: `app.js:10854` `ui.statsScope = "alle";` bei jedem Zeichnen, aber der Kopf zeigt die Bereichs-Pille (`app.js:8147`, `8602`), und „Fortschritt“ als Titel ist am Handy nicht zu sehen (Foto `fort-voll-handy-dunkel`). Messung `mess2.js`: Wechsel auf den leeren Bereich „Quran-Wörter“ → Pille „Quran-Wörter“, darunter unverändert „52 Antworten … 36 von 40 Karten saßen schon einmal“; nur die Zeile „Lektionen“ verschwindet (`app.js:10881`). Foto `fort-voll-nach-bereichwechsel`. **verifiziert**
- Warum es stört: Oben steht ein leerer Bereich, darunter stehen 40 Karten. Wer mehrere Bereiche hat, hält die Zahlen für die des gewählten Bereichs. Die Zeile „Lektionen“ gehört als einzige wirklich zum Bereich und sagt das nicht.
- Vorschlag: Eine Sache festlegen. Variante A: Im Fortschritt steht im Kopf „Fortschritt“ statt der Pille, und die Lektionen-Zeile nennt ihren Bereich („Lektionen · Medina Buch 1“). Variante B: „Dein Stoff“ zählt den gewählten Bereich und sagt das in der Überschrift. Kein zweiter Umschalter (in 3.16.0 bewusst entfernt, LEHREN § 3.5). `renderMain()`, `renderFortschritt()`.
- Entscheidet: Agent (mechanisch, Variante A ändert keine Zahl)
- Aufwand: klein
- Abnahme: Test: Bereich wechseln im Fortschritt, Kopf und Zahlen passen zusammen (Pille nicht sichtbar oder Zahlen ändern sich); bei 320–1440 px geprüft.

#### FORT-4: Nach einer langen Pause sagt der Tab etwas Falsches oder gar nichts
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:10711–10713`: `zeitraum.gesamt === 0` → „Noch nichts aufgezeichnet – ab dem ersten gelernten Tag füllt sich das Raster.“ `zeitraum` reicht höchstens 12 Wochen, das Protokoll 120 Tage. Foto `fort-pause100-handy-dunkel`: 36 gelernte Karten, 20 gelernte Tage im Protokoll, trotzdem dieser Satz. `app.js:10679–10703`: sind die letzten 14 Tage leer, steht nur die Überschrift und das Raster da, Foto `fort-pause30-handy-hell`. **verifiziert**
- Warum es stört: Wer nach Wochen zurückkommt, ist der Mensch, den der Tab halten soll. Er liest „noch nichts aufgezeichnet“, obwohl er gelernt hat, oder er liest nichts.
- Vorschlag: Drei Fälle sauber trennen: nie gelernt (heutiger Satz), Pause (ein freundlicher Satz mit Knopf „Runde starten“, ohne Zahl der verpassten Tage), aktiv. Unterscheiden über `Object.keys(verlauf).length` und Karten mit `ersteBewertung`, nicht über das 12-Wochen-Fenster. `fortschrittWochen()`.
- Entscheidet: Agent (falscher Text, § 1.2); Wortlaut des Pausensatzes kurz dem Betreiber zeigen
- Aufwand: klein
- Abnahme: `fotos.js pause30,pause100`: in beiden Fällen ein Satz, der stimmt, und ein Knopf; „Noch nichts aufgezeichnet“ nur bei leerem Protokoll und ohne bewertete Karte.

#### FORT-5: Große Null im Stoff und falsche Mehrzahl
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:10729–10732`: `'<strong>' + gesessen + '</strong>'` ohne Sonderfall 0; Verb richtet sich nach `gesessen`, das Hauptwort nach `gesamt`. Fotos `fort-importiert-handy-hell` („0 . von 40 Karten saßen schon einmal“) und `fort-eineNicht-handy-dunkel` („0 von 1 Karte saßen schon einmal“). **verifiziert**
- Warum es stört: Wer einen Kartensatz eingespielt hat, sieht als Erstes eine große 0. Genau das wurde für die Serie in 2.13.0 abgeschafft, und LEHREN § 7.1 verbietet Zahlen, die Stillstand lesen.
- Vorschlag: Bei `gesessen === 0` keine große Zahl, nur der Satz, der schon darunter steht („Alle 40 Karten sind gerade neu.“), plus der nächste Schritt. Mehrzahl über `mz()`.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `fotos.js importiert,eineNicht`: kein `.gross-zahl strong` mit Text „0“; kein „1 Karte saßen“.

#### FORT-6: „sitzt“ heißt drei verschiedene Dinge, und das schwächste steht am größten da
- Art: Gefühl
- Schwere: mittel
- Beleg: `app.js:548` `LEKTION_STUFE = 1` (einmal „Sicher“). Daraus: „X von Y Karten **saßen** schon einmal“ (`10732`), „2 von 3 **sitzen**“ für Lektionen (`10803`, `10893`, `lektionSitzt` `407`). Dagegen der Stand „dauerhaft“: „**sitzt** – kommt nur noch selten“ (`3914`). Foto „voll“: Lektion 2 mit Haken „sitzt“, ihre Karten stehen im Band unter „frisch gelernt“. Dazu ein Kommentar, der noch „Stufe 2“ sagt (`app.js:393`, G-078 hat nur die Stelle bei `548` berichtigt). **verifiziert**
- Warum es stört: Der Betreiber wollte am 24.09. genaue Wörter („würde niemals Stufe 6 als fest dingsen“, Kommentar `app.js:3869`). Die Hauptzahl nennt eine Karte nach einer einzigen richtigen Antwort „saß“. Die Zahl ist dadurch nach der ersten Runde fast voll und bewegt sich nie wieder.
- Vorschlag: Nur Wortlaut, keine Logik: „schon einmal gewusst“ statt „saßen schon einmal“ (auch im Meilenstein-Hinweis `10300`), Lektionen „durch“/„einmal geschafft“ statt „sitzt“. Als Hauptzahl taugt eher „gefestigt oder dauerhaft“ (ab `gefestigt`), siehe Weg b. Kommentar `393` berichtigen.
- Entscheidet: Betreiber (Wörter der Lernstände, 3.13.0 war seine Vorgabe); Kommentar: Agent
- Aufwand: klein
- Abnahme: `grep -n "saß\|sitz" app.js` zeigt je Bedeutung ein Wort; Fotos gelesen.
- Pro/Contra: Dafür: ehrlicher, passt zu seinen eigenen Stand-Wörtern, die Hauptzahl bekommt wieder Weg nach oben. Dagegen: „saßen schon einmal“ steht seit 2.8.0 und in Meilenstein-Hinweisen; die Freischalt-Regel selbst (einmal gewusst) bleibt und muss weiter ein Wort haben. Empfehlung: umbenennen, Regel nicht anfassen.

#### FORT-7: Das Raster ist kaum zu lesen
- Art: Gefühl
- Schwere: mittel
- Beleg: `app.js:4041–4068` (`renderKalender`): keine Wochentage, keine Monate, keine Legende; Auskunft nur im `title` (am Handy nicht erreichbar). `styles.css:2968–2985`. Gemessen (`mess2.js`, `kontrast_rechnen.js`): Raster 324 px breit, Kästchen enden bei 78 px (4 Wochen). Kontrast leerer Tag gegen Fläche 1,11:1 dunkel, 1,02:1 hell; gelernter Tag (unter 10 Antworten) gegen leeren Tag 2,17:1 dunkel, 1,75:1 hell (WCAG 1.4.11 verlangt 3:1 für Grafik, die etwas bedeutet). Im hellen Thema sind starke Tage schwarze Blöcke (Foto `fort-viele-desktop-hell`), das leere Raster ist unsichtbar bis auf den Rahmen von heute (Foto `fort-importiert-handy-hell`). **verifiziert**
- Warum es stört: Man erkennt nicht, welcher Tag welches Kästchen ist, und ein ausgelassener Tag sieht fast aus wie ein schwacher. Drei Viertel der Karte sind leer.
- Vorschlag: Wenn das Raster bleibt: Mo/Mi/Fr links, Monatskürzel oben, zwei Zustände reichen (gelernt/nicht), leere Tage mit feinem Rand, Kästchen füllen die Breite. Oder ersetzen (Weg b).
- Entscheidet: Agent (Gestaltung im Rahmen)
- Aufwand: mittel
- Abnahme: Kontrast gelernt/leer ≥ 3:1 in beiden Themen (Messung wie oben); Raster nutzt ≥ 80 % der Breite bei 4 Wochen; Foto 320 px ohne Überlauf.

#### FORT-8: Auf dem ganzen Tab gibt es keine Handlung
- Art: Sackgasse
- Schwere: mittel
- Beleg: `renderFortschritt()` `app.js:10871–10905`: zwei Blöcke ohne `data-action`, danach nur Zeilen zu Unterseiten. Der Satz „eine Runde reicht für den Anfang“ (`10702`) hat keinen Knopf. Lektions-Kacheln sind `div` ohne Handlung (`10813`). Im Zustand „importiert“ steht „0 von 3 sitzen“ und kein Weg zur ersten Runde. **verifiziert** (Fotos, Code)
- Warum es stört: Der Tab beantwortet „was tue ich als Nächstes“ nie. Man sieht „8 / 12“ bei Lektion 1 und kann die vier fehlenden Karten nicht lernen oder ansehen.
- Vorschlag: Je Block höchstens eine Handlung: Pausensatz mit „Runde starten“ (`start-session` gibt es), Lektions-Kachel öffnet die Lektion in Verwalten, Stand im Band antippbar → gefilterte Kartenliste.
- Entscheidet: Betreiber (hängt an der Wahl unter „Drei Wege“)
- Aufwand: mittel
- Abnahme: Jeder Zustand aus Abschnitt 1 hat mindestens ein antippbares Ziel im ersten Bildschirm; Trefferfläche ≥ 44 px.
- Pro/Contra: Dafür: aus Anzeige wird Werkzeug. Dagegen: mehr Knöpfe gegen Hick's Law, ein gefüllter Knopf pro Bildschirm (Gestaltungssatz) muss gewahrt bleiben. Empfehlung: ja, aber als antippbare Zeilen, nicht als gefüllte Knöpfe.

#### FORT-9: Was der Tab sagt, steht zum Teil schon auf Lernen
- Art: Aufräumen
- Schwere: mittel
- Beleg: Lernen im Zustand „voll“ (`mess2.js`): „36 Karten saßen schon einmal. So viel hast du schon geschafft.“ (`app.js:10300`) = Hauptzahl von „Dein Stoff“ (`10732`). Wochenrückblick Mo–Mi „N von 7 Tagen · N Antworten · N neue Karten“ (`10304–10309`) = Antworten-Zahl und Raster. Sieben Wochenpunkte (`lernenSerie`, `10562`) = letzte Spalte des Rasters. „Morgen kommen N Karten wieder“ (`10519`) = erster Balken von „Die nächsten 7 Tage“. **verifiziert**
- Warum es stört: „Nichts doppelt“ (LEHREN § 6.9). Nach 3.16.0 blieb im Fortschritt wenig Eigenes. Das ist ein Grund, warum er sich leer anfühlt.
- Vorschlag: Mit Weg b oder c lösen: Der Tab bekommt Inhalte, die Lernen nicht hat (Veränderung, Wörter), oder er geht ganz in Lernen/Verwalten auf.
- Entscheidet: Betreiber
- Aufwand: mittel
- Abnahme: Liste „steht auf Lernen / steht im Fortschritt“ ohne Überschneidung.
- Pro/Contra: siehe Abschnitt 4.

#### FORT-10: Die ältesten Tage fallen aus dem Raster
- Art: Fehler
- Schwere: niedrig
- Beleg: `app.js:10675` `wochen = … Math.ceil((tageTief + 1) / 7)` rechnet ab heute, `renderKalender` (`4049–4050`) aber ab dem Sonntag dieser Woche. Messung: Eintrag vor 25 Tagen (5.9.) vorhanden, Raster beginnt am 7.9. („Tag −25: NICHT IM RASTER“). **verifiziert**
- Warum es stört: Die Überschrift sagt „Die letzten 4 Wochen“, die ersten gelernten Tage fehlen aber je nach Wochentag.
- Vorschlag: Die Tage bis Sonntag mitrechnen: `Math.ceil((tageTief + 1 + (7 - dow)) / 7)`.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Test mit Eintrag an `tag(-25)` an jedem Wochentag (`tagVersatz` 0–6): Datum steht im Raster.

#### FORT-11: Tage, an denen nur Texte gelernt wurden, sind im Raster leer (nur Betreiber-Konto)
- Art: Fehler
- Schwere: niedrig
- Beleg: `app.js:4056` `menge = (e.w||0) + (e.n||0)` (ohne `t`), aber `kalenderText` (`4033`) und die Wochenpunkte nehmen `tagGelernt` (`966`, mit `t`). Messung mit `verlauf[tag(-6)] = {w:0,n:0,t:12}`: Raster `kal-tag s0 | 24.9.: 0 Antworten`, Lernen-Woche zeigt den Tag als gelernt, `aria-label` zählt ihn mit. **verifiziert**. Dazu **Vermutung** (nur gelesen): Ein Konto nur mit Texten sieht „Noch nichts zu zeigen … Sobald du Karten anlegst“ (`10858`, `statsCards` zählt nur `b.karten`).
- Warum es stört: Serie und Wochenpunkte sagen „gelernt“, der Fortschritt sagt „0 Antworten“.
- Vorschlag: Im Raster `tagGelernt` für „gelernt ja/nein“ nehmen; Tooltip „Antworten“ nur für Karten. Erst nach dem Probelauf, kein Umbau.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: obige Messung zeigt für den Text-Tag ein gefülltes Kästchen.

#### FORT-12: Aus „Karten, die nicht klappen“ führt Bearbeiten weg und nicht zurück; Zähler löschen ohne Rückweg
- Art: Sackgasse
- Schwere: niedrig
- Beleg: `editCardInBereich` (`app.js:4130–4150`) setzt `ui.tab = "verwalten"`, `ui.seite = null`. Messung: nach dem Schließen des Blatts steht man in der Verwalten-Liste (Foto `fort-voll-leech-nach-schliessen`). `resetRueckfaelle` (`4120–4127`) setzt den Zähler sofort auf 0, ohne Rückfrage und ohne „Rückgängig“; die Karte verschwindet aus der Liste. **verifiziert**
- Warum es stört: Der Hinweis sagt „Fang oben an“. Nach der ersten Karte ist man woanders und muss drei Tipps zurück. Ein Fehltipp auf das Pfeil-Symbol ist nicht zurückzunehmen.
- Vorschlag: Karten-Blatt über der Liste öffnen (Blatt ist global), nach dem Schließen auf der Seite bleiben. Für das Zurücksetzen eine Kurzmeldung mit „Rückgängig“ (`zeigeToast`).
- Entscheidet: Agent
- Aufwand: mittel
- Abnahme: Test: `fort-seite leeches` → `edit-leech` → schließen → Kopfzeile „Karten, die nicht klappen“.

#### FORT-13: Auf iPad und Computer sieht der Tab leer aus
- Art: Gefühl
- Schwere: niedrig
- Beleg: `styles.css:4914–4923` (`.view--raster`, `height: calc(100% - var(--stack))`). Foto `fort-voll-ipad-dunkel`: zwei gleich hohe Kästen, „Dein Stoff“ zur Hälfte leer, Raster klein in der Ecke, unter „Genauer ansehen“ 40 % freier Bildschirm. **verifiziert**
- Warum es stört: „Premium, ruhig“ ist gewollt, das hier wirkt unfertig.
- Vorschlag: Mit Weg b lösen (mehr Inhalt je Block). Sonst mindestens die Unterseiten-Inhalte ab 720 px offen zeigen statt hinter Zeilen.
- Entscheidet: Agent
- Aufwand: mittel
- Abnahme: Foto iPad hoch: kein Block mit mehr als einem Drittel leerer Fläche.

#### FORT-14: Das Aufdecken des Rasters sieht man nicht, das Band kommt spät
- Art: Bewegung
- Schwere: niedrig
- Beleg: `styles.css:4482–4483` `kal-aufdecken 1100ms … 300ms` schneidet über die ganze Elementbreite (324 px), die Kästchen liegen in den ersten 78 px; mit `ease-out` sind sie nach einem Bruchteil der Zeit da. `styles.css:4481`: Band wächst 1000 ms nach 450 ms Wartezeit, also fertig nach 1,45 s. **Vermutung** zum Eindruck (gerechnet, nicht Bild für Bild gemessen; Thema für Bereich B6).
- Warum es stört: Eine Bewegung, die man nicht sieht, ist nur Wartezeit; 1,45 s bis zum fertigen Bildschirm ist lang für einen Tab, den man oft wechselt.
- Vorschlag: Raster spaltenweise einblenden (höchstens 400 ms gesamt), Band 150–450 ms (LEHREN § 6.4).
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `t_bild.js`-Art: 600 ms nach dem Tab-Wechsel läuft keine Animation mehr.

#### FORT-15: Kleinigkeiten und toter Code rund um den Tab
- Art: Aufräumen
- Schwere: niedrig
- Beleg: (a) `ui.statsScope` wird immer auf „alle“ gesetzt (`app.js:10854`), der Zweig „bereich“ in `statsCards`/`verbrannteKarten` (`3822`, `4107`) und der Klick-Fall `stats-scope` (`14840`) sind unerreichbar (kein Knopf sendet ihn). (b) `styles.css`: `.stat-kennzahlen`/`.stat-kennzahl` (2834–2848), `.serie-klein`, `.legende-erklaerung`, `.serie-zahl .arab-ziffer` haben keinen Treffer in `app.js`; `trend-flat` wird gesetzt, hat aber keine eigene Regel. (c) Die Zeile „Die nächsten 7 Tage“ trägt das Flammen-Symbol der Serie (`10901` `icon: "serie"`). (d) Kommentare über `fortschrittWochen` nennen noch „Serie, heute“ als Inhalt des Tabs (`10838–10839`) und einen „300er-Tag“ (`10644`). (e) Sorgenkinder zeigen „6×“ (`10936`); die kleinste Zahl der Liste ist immer die Schwelle, die 3.12.1 aus dem Text genommen hat. **verifiziert** (grep)
- Warum es stört: Toter Code verleitet zum „Reparieren“; das Flammen-Symbol heißt sonst „Serie“.
- Vorschlag: (a), (b), (d) entfernen bzw. berichtigen (LEHREN § 3.8 mit grep); (c) Kalender-Symbol; (e) Betreiber fragen, ob die Zahl bleiben soll.
- Entscheidet: Agent; (e) Betreiber
- Aufwand: klein
- Abnahme: `grep -c "statsScope\|stats-scope" app.js` = 0; die genannten Klassen fehlen in `styles.css`; Prüfstand grün.
- Pro/Contra zu (e): Dafür (Zahl weg): verrät die Schwelle. Dagegen: Die Zahl sortiert die Liste sichtbar und hilft zu entscheiden, welche Karte man zuerst umschreibt. Empfehlung: behalten, die Schwelle ist keine Abstandszahl.

## 4. Drei Wege für den Fortschritt-Tab

### (a) Klein verbessern

Der Tab bleibt, wie er ist. Behoben werden FORT-2 bis FORT-5, FORT-10,
FORT-15; die Pille fällt weg (FORT-1), Wörter werden ehrlich (FORT-6), das
Raster bekommt Beschriftung (FORT-7), der Pausensatz einen Knopf.

- Dafür: wenig Aufwand (etwa ein Paket), kein Risiko, alle Fehler sind weg.
- Dagegen: Die Diagnose bleibt. Der Tab zählt weiter, zeigt kein Wort, hat
  wenig Eigenes neben Lernen und gibt keinen Grund, ihn morgen wieder zu
  öffnen. Der Betreiber würde ihn vermutlich weiter „dumm“ nennen.

### (b) Neu denken: „Was du schon kannst“

Der Tab beantwortet eine Frage: **Was kann ich jetzt, was ich vorher nicht
konnte?** Skizze von oben nach unten, alles aus vorhandenen Feldern
(`stufe`, `maxStufe`, `ersteBewertung`, `rueckfaelle`, `verlauf`), kein
neues Cloud-Feld:

1. **Kopf: ein Satz statt einer Zahl.** „Du kannst 12 Wörter sicher, 24
   sind auf dem Weg.“ („sicher“ = Stand gefestigt oder dauerhaft; „auf dem
   Weg“ = frisch gelernt und wird fester.) Bei null sicheren Wörtern steht
   nur der zweite Halbsatz, nie eine 0.
2. **Das Band**, wie heute, aber jedes Stück antippbar → Liste der Karten in
   diesem Stand (die Wörter selbst, arabisch groß).
3. **„Zuletzt fester geworden“:** drei bis fünf arabische Wörter als kleine
   Karten, die zuletzt in „gefestigt“ aufgestiegen sind. Das ist der Teil,
   der sich nach jeder Runde ändert und einen Grund zum Nachsehen gibt.
   Fehlt, solange es keine gibt.
4. **„Dein nächstes Ziel“:** ein nahes Ziel, eine Zeile, antippbar: „Noch 4
   Karten, dann ist Lektion 1 durch“ oder, ohne Lektionen, der nächste
   Meilenstein („noch 3 bis 50 Wörter“). Die Meilenstein-Marken gibt es
   schon (`MEILENSTEINE`).
5. **„Brauchen Hilfe“:** die Sorgenkinder direkt als zwei, drei Zeilen mit
   Stift, statt als Zahl hinter einer Zeile.
6. **Ganz unten, leise:** das Raster der letzten Wochen (mit Beschriftung,
   zwei Zustände) und „Die nächsten 7 Tage“. Keine Antworten-Zahl, keine
   Pille.

Nicht dabei, mit Absicht: Abstände, Stufenzahlen, „Tage gelernt“, die Serie,
Prozent-Vergleiche, Nutzungsstatistik.

- Dafür: beantwortet alle drei Fragen; zeigt Arabisch statt Zähler; ändert
  sich sichtbar nach jeder Runde; nutzt nur vorhandene Daten; passt zu „Gründe
  zum Zurückkommen, aber ohne Nerven“.
- Dagegen: Aufwand mittel bis groß (neue Blöcke, Zustände leer/1/viele,
  Tests, alle Breiten). „Zuletzt fester geworden“ braucht eine saubere
  Ableitung ohne neues Feld (z. B. Karten im Stand „gefestigt“ mit der
  jüngsten Fälligkeit; das muss an echten Daten geprüft werden, sonst zeigt
  es das Falsche). Ein Umbau erzeugt hier leicht neue Fehler (CLAUDE.md,
  Übergabe 27.09.).

### (c) Tab abschaffen, Inhalte verlegen

Zwei Reiter: Lernen und Verwalten. Wohin die Inhalte gingen:

| Inhalt | Neuer Ort |
|---|---|
| Stand-Band + Zahlen | Verwalten, über „Deine Karten“ (dort stehen die Stand-Punkte schon je Karte), antippbar als Filter |
| Lektionen | Verwalten, bei den Lektions-Speicherkarten (dort stehen sie schon) |
| Karten, die nicht klappen | Verwalten als Filter; in der Runde gibt es den Hinweis schon (`leech-banner`) |
| Raster, nächste 7 Tage | Lernen, hinter der Serien-Karte als Unterseite („Verlauf“) |
| Antworten-Zahl, Pille | entfallen |

- Dafür: nichts mehr doppelt; zwei Reiter sind einfacher als drei (Hick);
  kein Bildschirm mehr, der nur Anzeige ist; wenig neuer Code.
- Dagegen: Es gibt dann keinen Ort mehr, der „du kommst voran“ sagt. Genau
  das wollte der Betreiber am 24.09. („nicht dass es so wirkt, als bringe sie
  nichts, die App“, Kommentar `app.js:10212`). Verwalten wird voller, und der
  Tempo-Fund G-119 liegt gerade dort. Drei Reiter sind bei Lern-Apps üblich;
  das Wischen zwischen den Reitern (3.8.0) und die Leiste müssten angepasst
  werden.

### Empfehlung

**Weg b, in zwei Schritten.** Zuerst die Fehler aus Weg a (FORT-2, -3, -4,
-5, -10: klein, sicher, sofort). Dann der Umbau nach Skizze b, wobei der
Betreiber vorher drei Dinge entscheidet: die Pille (FORT-1), die Wörter
(FORT-6) und die Zierziffer (FORT-2). Weg c lohnt nur, wenn er sagt, dass er
den Tab gar nicht will; dann geht dabei aber der Ort für „du kommst voran“
verloren, und der fehlt der App eher, als dass er zu viel wäre.

## 5. Geprüft ohne Fund

- Kein waagerechtes Scrollen, keine Konsolenfehler: alle neun Zustände,
  Handy 390 hell/dunkel; voll/viele/importiert/Pause 30 auf iPad 820 und
  Desktop 1440 hell/dunkel; voll auf 360 px.
- Hochzählen der Antworten-Zahl läuft nur beim ersten Besuch (30 ms nach dem
  zweiten Besuch steht sofort „52“); LEHREN § 6.3 eingehalten.
- Einzahl/Mehrzahl sonst richtig: „1 Antwort“, „1 Karte“, „1 von 1 Karte
  saß“.
- Zeilen unter „Genauer ansehen“ erscheinen nur, wenn es dahinter etwas gibt
  (leer, importiert, eine Karte geprüft); Rückweg von jeder Unterseite über
  `seite-zu` vorhanden.
- Unterseiten mit vielen Daten: 30 Lektionen (2037 px) und 29 Sorgenkinder
  (2421 px) scrollen ohne Überlauf; „Die nächsten 7 Tage“ mit 294/474 Karten
  lesbar.
- Bewusst Entferntes steht nicht wieder da: keine Abstände, keine
  Stufenzahlen, kein „Tage gelernt“, keine Serie im Tab, kein
  Bereichs-Umschalter, kein „Verlauf zurücksetzen“ im Tab.
- Legende der Stände: Wörter ohne Zahlen der Methode; „neu“ als hohles
  Stück sichtbar (G-062 hält).
- Bekannte Punkte nicht neu gemeldet: G-023–G-026, G-060–G-062 sind erledigt
  und halten in den Fotos.
- Nicht geprüft: echtes iPhone (Schrift der Zierziffer in WebKit), Gefühl
  der Bewegungen (Standbilder), Texte-Ansichten.
