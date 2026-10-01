# Befunde VERW – Verwalten-Tab (Zyklus 2, 01.10.2026)

Prüfer: VERW (nur lesen/messen). Stand 3.18.10, Commit `436dc78`.
Prüfstand: Chromium 154 (`C:\Program Files\Google\Chrome\Application\chrome.exe`),
Firebase-Attrappe, Server 127.0.0.1:8099. Eigene Skripte und Fotos unter
`<scratchpad>/audit/VERW/`. Tempo nur als Hinweis (mehrere Agenten parallel).

Funde nach Schwere sortiert (mittel: VERW-1, -2, -3, -10, -6, -7; niedrig: VERW-8, -4, -5, -9, -11). Kein kritischer oder hoher Fund.

---

## G-118 – Ursache (bekannt, nicht neu gemeldet)

Befund des Betreibers: Verwalten → Karte erstellen, Tippen ins Feld „Wort“
(nicht „Übersetzung“) scrollt die Seite nach oben weg. Am echten iPhone nicht
prüfbar (LEHREN § 5.6); im Chromium nachgestellt mit simulierter Tastatur
(`audit/VERW/g118.js`: `visualViewport.height` verkleinert, `resize`/`scroll`
gefeuert, `scrollIntoView` und `focus` mitprotokolliert).

**Was das Wort-Feld von der Übersetzung unterscheidet (Code, verifiziert):**

1. **Nur das Wort-Feld wird von der App selbst fokussiert, und zwar mit
   Scrollen.** `fokusInsWortfeld()` (`app.js:5841-5844`) ruft `el.focus()`
   ohne `preventScroll` – beim Öffnen (`karte-neu`, `app.js:14925`), nach
   jedem „Hinzufügen“ (`submitCardForm`, `5811`), nach „Verwerfen? – Nein“
   (`5865`) und beim Bearbeiten (`5837`). Zu diesem Zeitpunkt ist das Blatt
   frisch eingefügt und läuft noch in seiner Eintrittsbewegung
   (`sheet-up`, `styles.css:3403`), die Tastatur ist noch nicht offen,
   `--tastatur` ist 0 – das Blatt sitzt unten am Layout, also dort, wo gleich
   die Tastatur liegt. Messung: `focus`-Protokoll beim Öffnen
   `["dlg (preventScroll)", "f-wort (MIT Scroll)"]`. Die Übersetzung wird nur
   durch den Finger fokussiert, wenn das Blatt schon über der Tastatur steht.
2. **Jedes Neuzeichnen fokussiert das Feld neu, wieder mit Scrollen**
   (`renderMain`, `app.js:8762-8766`, `again.focus()` ohne `preventScroll`).
   Nach „Hinzufügen“ per Enter gemessen: fünf Fokus-Aufrufe in einem Ablauf
   (`f-ueb` 2×, `f-wort` 2× mit Scroll), und das Wort-Feld ist danach ein
   **neues Element** (`render()` ersetzt das Blatt). Vermutung: Auf iOS heißt
   „fokussiertes Feld aus dem DOM entfernt“, dass die Tastatur zu schließen
   beginnt und sofort wieder aufgeht – mehrere `visualViewport`-Größenwechsel.
   (Der Kommentar bei `zeigeToast`, `app.js:1824-1826`, beschreibt genau
   diesen Effekt schon für 3.6.13: „auf iOS geht dabei die Tastatur zu“.)
3. **`syncTastatur()` ruft bei jedem Viewport-Ereignis erneut
   `scrollIntoView({ block: "center" })`** (`app.js:14054-14072`), nicht nur
   einmal und nicht nur, wenn das Feld verdeckt ist. Ausgelöst von jedem
   `visualViewport`-`resize` **und** `scroll` (`14078-14079`) und von jedem
   `render()` (`viewportSyncImBild`, `8755`). Gemessen: 4 Höhenwechsel der
   Tastatur → 4 Aufrufe, 3 `scroll`-Ereignisse → 3 Aufrufe, ein Neuzeichnen
   → 1 Aufruf. `scrollIntoView` scrollt **alle** Vorfahren, nicht nur das
   Blatt. Für das **oberste** Feld (Wort, im Blatt bei y≈100 px) ist „center“
   im Blatt nicht erreichbar (`scrollTop` schon 0) – der Rest des Weges geht
   an die Seite bzw. den sichtbaren Bereich weiter. Bei der Übersetzung reicht
   meist das Blatt selbst. Dazu ein Kreislauf: `scrollIntoView` verschiebt
   den sichtbaren Bereich → `visualViewport`-`scroll` → `syncTastatur` →
   wieder `scrollIntoView`.
4. **Die Sperre der Seite hält auf iOS das Fokus-Scrollen nicht auf.**
   `html.blatt-offen, html.blatt-offen body { overflow: hidden }`
   (`styles.css:434`) verhindert Fingerscrollen, nicht das Scrollen, das
   Safari beim Fokussieren eines Feldes selbst macht (Vermutung, WebKit-
   Verhalten bekannt, im Chromium nicht nachstellbar: dort blieb `scrollY`
   in allen Fällen 0 bzw. 700 und `dlg.scrollTop` 0).
5. Folgefehler: `syncTastatur` rechnet `innerHeight - vv.height - vv.offsetTop`
   (`14045`). Hat Safari den sichtbaren Bereich zum Wort-Feld verschoben
   (`offsetTop > 0`), wird die Tastatur um genau diesen Betrag zu klein
   geschätzt, das Blatt sitzt zu tief, das Feld liegt wieder halb unter der
   Tastatur – Safari schiebt erneut (Vermutung).

**Urteil:** Ursache sehr wahrscheinlich das Zusammenspiel aus (1)/(2)
programmatischem Fokus mit Scrollen im gerade neu gebauten, noch unten
sitzenden Blatt und (3) dem wiederholten `scrollIntoView({block:"center"})`
für das oberste Feld. (1)–(3) sind im Code belegt; dass iOS daraus das
Wegscrollen macht, ist Vermutung und muss am Gerät bestätigt werden.

**Vorschlag (für die Umsetzung, Paket C):**
- `fokusInsWortfeld()`, `fokusInsErstesFehlerfeld()` und das Wieder-Fokussieren
  in `renderMain` mit `focus({ preventScroll: true })`.
- `syncTastatur`: Feld nur einmal je Fokus/Tastatur-Öffnen in den Blick holen,
  nur wenn es tatsächlich unter `vv.height` liegt, und nur das Blatt selbst
  scrollen (`dlg.scrollTop` aus `getBoundingClientRect` berechnen) statt
  `scrollIntoView` über alle Vorfahren; nicht auf `visualViewport`-`scroll`
  reagieren.
- Nach „Hinzufügen“ das Blatt nicht komplett neu bauen, sondern Felder leeren
  (`value = ""`) – das Wort-Feld bleibt dasselbe Element, die Tastatur bleibt
  offen (dasselbe Muster wie `zeichneKartenListe` für die Suche).
- Gerätetest Betreiber: iPhone (Safari und Home-Bildschirm-App), Verwalten
  ganz oben und nach unten gescrollt → „Karte hinzufügen“ → Seite bleibt
  stehen; Wort tippen (arabische Tastatur, Vorschlagsleiste an) → nichts
  springt; Enter, Enter → nächste Karte, Blatt bleibt über der Tastatur.
- Abnahme im Prüfstand: `g118.js` – beim Öffnen kein `focus` ohne
  `preventScroll`; je Tastatur-Öffnen höchstens ein Scroll-Aufruf; 4
  Höhenwechsel → 0 weitere.

---

## Funde

#### VERW-1: G-021 „Suchpuffer wächst mit der Kartenzahl“ steht als erledigt da, ist aber nie in den Code gekommen
- Art: Fehler (Vorgabe nicht eingehalten)
- Schwere: mittel
- Beleg: `app.js:11493` `if (suchPuffer.size > 4000) suchPuffer.clear();` – feste Grenze.
  `git log -S "suchPuffer.size" -- app.js` findet nur den Baseline-Commit `44b486c`
  (3.0.0); der Commit `dbc8ef7` (3.17.33, „G-021: Suchpuffer wächst mit der
  Kartenzahl“) ändert die Zeile nicht (`git show dbc8ef7 -- app.js | grep -i puffer`
  leer). `CHANGELOG.md` 3.17.33, `grossplan/AUFGABEN.md` G-021 „erledigt“ und
  `grossplan/LOGBUCH.md` (Abnahme „0 Long Tasks“) behaupten das Gegenteil.
  Messung (`audit/VERW/gross.js`, Aufrufe von `String.prototype.normalize` je
  Suche = Neuberechnungen): 1200 Karten mit Notiz, Suche „alle Bereiche“: 4 285
  (nur Markieren, Puffer greift); **1500 Karten mit Notiz: 68 065 bei jeder
  Suche, auch bei Wiederholung derselben Suche**; 2500 Karten ohne Notiz: 53 435
  jedes Mal. verifiziert.
- Warum es stört: Ab etwa 1330 Karten mit Notiz (3 Felder je Karte) oder 2000
  ohne Notiz rechnet jede Suchänderung alle Karten neu – genau der Fall, den
  G-021 beheben sollte. Dazu ist die Dokumentation falsch, die nächste Session
  hält es für erledigt.
- Vorschlag: `suchFeld()` – Grenze an die Kartenzahl aller Bereiche koppeln
  (z. B. `Math.max(4000, 4 * gesamtKarten)`) oder Puffer als `WeakMap` an das
  Kartenobjekt; `grossplan/AUFGABEN.md` G-021 und `CHANGELOG` mit sichtbarer
  Korrektur (LEHREN § 1.3) nachziehen; Ursache „Änderung ging verloren“ in
  LEHREN § 15 (dieselbe Klasse wie 25.09., vier Agenten).
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `gross.js` 1500 Karten mit Notiz, „alle Bereiche“: zweite gleiche
  Suche < 6 000 normalize-Aufrufe; `git show <fix> -- app.js` enthält die Zeile.

#### VERW-2: Geänderte Karte geht beim Bearbeiten mit Escape oder Wischen still verloren
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:5857` `karteEntwurfOffen()` verlangt `!ui.editId` – beim
  Bearbeiten ist ein Entwurf nie „offen“. Deshalb `schliesseObersteEbene`
  (`app.js:14240-14242`) → `cancelEdit` ohne Rückfrage, ebenso `blattWischen`
  `ende()` (`app.js:14348`). Messung `audit/VERW/ablauf.js` H: Karte öffnen →
  Bearbeiten → Übersetzung und Notiz neu getippt → Escape: Blatt zu, Cloud
  weiter „Moschee“, keine Rückfrage. verifiziert (Escape); Wischen nach unten
  laut Code derselbe Weg.
- Warum es stört: Wer eine lange Notiz überarbeitet und das Blatt aus Versehen
  nach unten wischt, verliert alles. Station 11 (`audit/LOGBUCH.md`, 24.09.)
  hat als Regel festgelegt: „Rückfrage nur, wo wirklich etwas verloren ginge
  (halb getippt, oder Escape / Wischen)“ – beim Bearbeiten wurde nur der Knopf
  „Abbrechen“ ausgenommen; Escape und Wischen fallen hier mit darunter, ohne
  dass das begründet ist.
- Vorschlag: `karteEntwurfOffen()` um den Bearbeiten-Fall erweitern: offen,
  wenn `formDraft` von der gespeicherten Karte abweicht (Wort, Übersetzung,
  Notiz, gewählter Stand). Der Knopf „Abbrechen“ bleibt ohne Rückfrage
  (`karte-sheet-zu` ruft im Bearbeiten-Fall weiter direkt `cancelEdit`),
  Escape/Wischen fragen „Änderungen verwerfen?“.
- Entscheidet: Agent (folgt der Regel aus Station 11)
- Aufwand: klein
- Abnahme: `t_karten_blatt.js` erweitern: Bearbeiten, Text ändern, Escape →
  Dialog „verwerfen?“; ohne Änderung → schließt sofort; Wischen ebenso (CDP-Touch).

#### VERW-3: „Ablegen“ in eine Speicherkarte zeigt kein Ergebnis
- Art: Gefühl
- Schwere: mittel
- Beleg: `app.js:5315-5327` `saveSelectedToSet` setzt `ui.openSetId = set.id`,
  aber nicht `ui.setsOffen` – das Speicherkarten-Feld bleibt zu
  (`renderSetsPanel`, `app.js:13321` gibt bei `!ui.setsOffen` nur den Kopf aus);
  kein `zeigeToast`. Messung `ablauf.js` E: zwei Karten in „Schwierig“ abgelegt
  → `panelOffen:false`, Kopf unverändert „Speicherkarten 5“, kein Toast, keine
  Ansage, Auswahlmodus beendet. Foto `bilder/verw-ablegen-danach.png`. verifiziert.
- Warum es stört: Nach dem Tipp verschwinden nur die Haken; ob und wohin
  abgelegt wurde, sieht man nicht. Das „sichtbar öffnen“ (`openSetId`) war
  offensichtlich gewollt, wirkt aber nie, solange das Feld zu ist (Normalfall,
  `ui.setsOffen: false`).
- Vorschlag: in `saveSelectedToSet` zusätzlich `ui.setsOffen = true` und
  `springeZu("set-" + set.id)` (wie `merkSetOeffnen`, `app.js:9124-9126`),
  dazu `zeigeToast(mz(neuDazu.length, "Karte", "Karten") + " in „" + name + "“")`;
  bei 0 neuen Karten „War schon drin“.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `ablauf.js` E: `panelOffen:true`, Speicherkarte aufgeklappt im Bild,
  Ansage enthält den Namen.

#### VERW-10: Blätter und Dialoge schließen ohne Bewegung – 200 ms Stillstand, dann weg
- Art: Bewegung
- Schwere: mittel
- Beleg: `spielAustrittsAnimation` (`app.js:14116-14124`) setzt
  `dlg.style.transform = "translateY(105%)"` und `huelle.style.opacity = "0"`
  mit `transition`. Auf `.dlg` und `.dlg-backdrop` liegt aber noch die
  Eintrittsanimation mit `both` (`styles.css:3385`, `3403`: `enter-fade … both`,
  `sheet-up … both`) – eine Animation überstimmt den Inline-Stil (LEHREN § 6.4,
  § 4.x). Messung `audit/VERW/zu.js`, 100 ms nach dem Schließen: Mehr-Blatt,
  Karten-Blatt, Detail-Blatt (Escape) und Dialog jeweils
  `transform: matrix(1,0,0,1,0,0)`, Hülle Deckkraft 1, verschwunden nach
  201–215 ms. Nur wenn zufällig vorher neu gezeichnet wurde (`still-overlay`,
  `animation: none`) läuft sie: `matrix(…, 377.7)`, Deckkraft 0,16. verifiziert
  (Chromium, Handy). `blattWischen` setzt `animation = "none"` selbst
  (`app.js:14333`) – dort geht es.
- Warum es stört: Jeder Tipp auf „Schließen“, „Fertig“, Escape oder den
  Hintergrund wirkt 0,2 s lang tot, dann springt das Blatt weg – genau das
  „hakelig“, das der Betreiber meint. Betrifft alle Blätter der App, nicht nur
  Verwalten. Dazu: Ab 600 px öffnet das Blatt mittig mit `enter-pop`
  (`styles.css:3447`), soll aber nach unten wegfahren – Öffnen und Schließen
  passen dort nicht zusammen.
- Vorschlag: Austritt als eigene `@keyframes` (`sheet-down`, ab 600 px
  `exit-pop`/Ausblenden) über eine Klasse `.dlg--geht` / `.dlg-backdrop--geht`
  (README: Bewegung über Keyframes), `danach()` auf `animationend` mit
  Sicherheits-Timer. Mindestens: in `spielAustrittsAnimation`
  `dlg.style.animation = "none"; huelle.style.animation = "none"` vor der
  Transition.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `zu.js`: 100 ms nach dem Schließen `transform` ≠ Einheitsmatrix und
  Hülle-Deckkraft < 1 in allen fünf Fällen, Handy und Desktop; `t_a11y.js`
  (reduzierte Bewegung: sofort weg).

#### VERW-6: Leerer Bereich in Verwalten ist eine kahle Zeile – der gebaute Leerzustand wird fast nie gezeigt
- Art: Unfertig
- Schwere: mittel
- Beleg: `app.js:13058-13059` – bei 0 Karten gibt `renderVerwaltenListe` nur
  `<p class="hint">Noch keine Karten vorhanden.</p>` aus und ruft
  `kartenListeInhalt()` gar nicht auf. Der dort gebaute Leerzustand (Symbol,
  „Noch keine Karten“, „Erste Karte anlegen“, „Kartensatz einspielen“,
  `13132-13146`) ist nur erreichbar, wenn `ui.searchAll` noch von einer früheren
  Suche an ist (`selectBereich` setzt `searchQuery` zurück, `searchAll` nicht,
  `app.js:5002`). Foto `bilder/v-handy-leer.png`: Knopf „Karte hinzufügen“,
  rechts ein einzelnes „Mehr“, darunter grauer Satz, Rest schwarz. verifiziert.
- Warum es stört: Jeder neu angelegte Bereich sieht so aus – wirkt unfertig,
  und der Weg „Kartensatz per Code“ (3.11.0: der Weg für Leute ohne eigenen
  Stoff) fehlt in Verwalten ganz. Im Sonderfall mit `searchAll` steht
  „Karte anlegen“ dann zweimal untereinander, und „Kartensatz einspielen“ öffnet
  dort die Datei-Auswahl statt des Codes (Lernen: Code zuerst, `app.js:10158-10160`).
- Vorschlag: bei 0 Karten den `.empty`-Block zeigen (ein Symbol, ein Satz) mit
  „Kartensatz per Code“ (secondary) und „Datei einspielen“ (ghost) wie auf
  Lernen; der große Knopf oben bleibt die eine Hauptaktion, „Erste Karte
  anlegen“ im Leerzustand entfällt (nichts doppelt). Den toten Zweig in
  `kartenListeInhalt` entfernen. `selectBereich`: `ui.searchAll = false`.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Foto leerer Bereich Handy/Desktop; `grep -c 'data-action="karte-neu"'`
  im gerenderten Verwalten = 1; Code-Knopf vorhanden.

#### VERW-7: Hinweis im geführten Satz verweist auf einen Knopf „+ Bereich“ oben, den es nicht gibt
- Art: Sackgasse (Text)
- Schwere: mittel
- Beleg: `app.js:12909` „Eigene legst du in einem eigenen Bereich an (oben
  „+ Bereich")“ und `app.js:510` (`hinweisGefuehrt`): „leg dir über „+ Bereich"
  oben einen eigenen Bereich an“. `grep '+ Bereich' app.js` findet nur diese
  zwei Sätze, keinen Knopf. Der echte Weg: Bereichsname in der Kopfzeile →
  Blatt → „Bereich anlegen“ (`bereichSheet`, `app.js:8258`). Foto
  `bilder/v-handy-gefuehrt.png`. verifiziert.
- Warum es stört: Wer in einem geführten Satz eine eigene Karte anlegen will,
  bekommt eine Wegbeschreibung zu etwas, das seit 3.0.0 (Bereichs-Blatt statt
  Pill-Reihe) nicht mehr existiert. LEHREN § 7.3.
- Vorschlag: Text ändern in „… tippe oben auf den Bereichsnamen und dann auf
  „Bereich anlegen““ – oder besser den Satz-Banner mit einem Knopf
  `data-action="add-bereich"` („Eigenen Bereich anlegen“) versehen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep -c '+ Bereich' app.js` = 0.

#### VERW-8: Erklärtexte der Speicherkarten-Gruppen stimmen im eigenen Bereich nicht
- Art: Fehler (Text)
- Schwere: niedrig
- Beleg: `SET_ART_ERKLAERUNG` (`app.js:565-569`) wird in `renderSetsPanel`
  (`13341`) für jeden gruppierten Bereich gezeigt, auch für eigene
  (`zeigtGruppen`, `app.js:492-500`). Gemessen im eigenen Bereich „Medina Buch 1“
  (`tour.js`): „Lektionen … Gelernt wird im Lernen-Tab – hier siehst du nur, wie
  weit du bist.“ – daneben steht aber an jeder Lektion „Üben“, Umbenennen,
  Löschen (`setBlock`, `nurAnzeige` nur bei `gefuehrt`). „Eigene … Aufnehmen
  lassen sich nur freigeschaltete Karten.“ – im eigenen Bereich gibt es kein
  Schloss (`freieIdsFor` → `null`). verifiziert.
- Warum es stört: Der Text widerspricht den Knöpfen direkt darunter (LEHREN § 7.2).
- Vorschlag: zwei Fassungen je Art (geführt / eigen) oder die Sätze im eigenen
  Bereich weglassen; die Zeile „Arten vergeben“ erklärt dann, wozu Arten da sind
  (Weitergabe per Code).
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Text im eigenen Bereich enthält weder „hier siehst du nur“ noch
  „freigeschaltete“.

#### VERW-4: Verschieben, Löschen mehrerer Karten und Löschen einer Karte ohne Rückmeldung
- Art: Gefühl
- Schwere: niedrig
- Beleg: `moveSelectedCardsTo` (`app.js:5184-5221`), `deleteSelectedCards`
  (`5155-5179`), `deleteCard` (`5873-5889`) – kein `zeigeToast`/`ansagen`.
  `ablauf.js` G: nach „Verschieben“ weder Toast noch Ansage. verifiziert.
  Beim Verschieben fallen die Karten außerdem still aus allen Speicherkarten
  des alten Bereichs (`purgeFromSets`, `5214`) – das sagt der Hilfetext im
  Blatt nicht (`WAHLEN.verschieben.hilfe`, `9987`: „wandern mit ihrem
  Lernstand“).
- Warum es stört: Die Zeilen verschwinden einfach; für Bildschirmleser passiert
  gar nichts. `zeigeToast` ist laut Kommentar (`app.js:1778`) genau für solche
  bisher stummen Erfolge da.
- Vorschlag: `zeigeToast("3 Karten nach „X“ verschoben")`, „Karte gelöscht“,
  „3 Karten gelöscht“; Hilfetext um „aus Speicherkarten dieses Bereichs
  genommen“ ergänzen. Kein Rückgängig (das ist E-09, wartet).
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Ansage-Text nach jeder der drei Handlungen gesetzt (`#ansage`).

#### VERW-5: Auswahlmodus und Suche überleben den Weg über „Fortschritt“, nicht über „Lernen“
- Art: Fehler (uneinheitlich)
- Schwere: niedrig
- Beleg: `app.js:14836` (`tab-lernen`) setzt `searchQuery`, `selectMode`,
  `selectedIds`, `kartenSeite`, `searchAll` zurück; `14839` (`tab-fortschritt`)
  und `14850` (`tab-verwalten`) nicht. `ablauf.js` F: Auswahl „1 ausgewählt“ +
  Suche „Stu“ → Fortschritt → Verwalten: beides noch da; über Lernen: beides weg.
  verifiziert.
- Warum es stört: Derselbe Rückweg verhält sich je nach Umweg anders; man kommt
  in einen Auswahlmodus mit Haken zurück, den man vergessen hat.
- Vorschlag: Eine Regel für alle Reiterwechsel weg von Verwalten (Empfehlung:
  Auswahl beenden, Suche behalten – oder beides wie bei Lernen zurücksetzen),
  in einer gemeinsamen Hilfsfunktion statt drei langen Zeilen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `ablauf.js` F liefert für beide Wege dasselbe.

#### VERW-9: Kleinere Uneinheitlichkeiten und Reste
- Art: Aufräumen
- Schwere: niedrig
- Beleg / Vorschlag (je Punkt):
  1. `ui.zuletztSetId` wird nur geschrieben (`app.js:5318`), nie gelesen; der
     Kommentar (`1756-1761`) verspricht eine Vorauswahl im Ablegen-Blatt, die
     `WAHLEN.speicherkarte` (`9989-9995`, `wert: () => null`) nicht hat.
     → entweder `wert: () => ui.zuletztSetId` und die zuletzt benutzte
     Speicherkarte nach oben, oder Feld und Kommentar entfernen.
  2. Kartenzeilen in einer aufgeklappten Speicherkarte zeigen den Stand als
     Wort-Plakette (`zustandBadge`, `app.js:13423`), die Hauptliste seit 3.16.0
     als Punkte (`zustandPunkte`, `13247`) – genau die Plakette, die der
     Betreiber am 24.09. als zu breit gemeldet hat. Die Zeilen dort lassen
     sich auch nicht antippen (kein `card-detail`). → Punkte + `card-detail`.
  3. Tipp mit dem Finger auf den Ziehgriff öffnet das Karten-Blatt, Klick mit
     der Maus nicht (`ablauf.js` A/C) – der Griff hat keine eigene Handlung,
     der Klick fällt auf die Zeile durch. → Klick auf `.drag-handle` im
     Verteiler ignorieren.
  4. Bearbeiten einer Karte, die inzwischen anderswo gelöscht wurde:
     `submitCardForm` (`app.js:5739-5773`) überspringt den Patch, meldet aber
     „Änderung gespeichert“ (`5797`). Vermutung (nur Code gelesen). → Meldung
     „Karte gibt es nicht mehr“.
  5. Karten-Detailblatt mit langer Notiz: Die Notiz steht in voller Länge über
     den Knöpfen; gemessen (`audit/VERW/rest.js`, Notiz ~2000 Zeichen) liegt
     „Bearbeiten“ am Handy bei y = 1251 von 844, am Desktop bei 1020 von 900 –
     man scrollt im Blatt bis ans Ende, um zu bearbeiten oder zu schließen.
     verifiziert. → Notiz im Blatt mit eigener Höhe (`max-height`, scrollt in
     sich, weicher Auslauf wie `.study-card__unten`), Knöpfe bleiben im Bild.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep -c zuletztSetId app.js` = 0 oder ≥ 3; Foto Speicherkarte offen
  zeigt Punkte.

#### VERW-11: Im Auswahlmodus fehlt „Alle auswählen“
- Art: Funktion
- Schwere: niedrig
- Beleg: `renderVerwaltenListe` (`app.js:13036-13048`) – die Leiste kennt nur
  „Verschieben“, „Ablegen“, „Löschen“; jede Karte wird einzeln angetippt
  (`toggleCardSelected`, `5132`). `grep -i "alle ausw" app.js CHANGELOG.md` leer
  – war nie da, wurde nie abgelehnt. Bei Seiten (ab 150 Karten) bleibt die
  Auswahl über Seiten hinweg bestehen, ohne dass man es sieht. verifiziert (Code).
- Warum es stört: Einen Bereich mit 200 Karten zusammenlegen oder eine
  Suchtreffer-Liste in eine Speicherkarte legen heißt 200 Tipps.
- Vorschlag: In der Leiste links neben der Zahl ein Tipp-Ziel „Alle“ bzw.
  „Keine“: wählt alle gerade **gezeigten** Karten (Suchtreffer bzw. Seite), nicht
  den ganzen Bereich. Kein neuer Speicher, keine Regel.
- Entscheidet: Betreiber (neue Funktion)
- Aufwand: klein
- Abnahme: Suche „Stu“ → Auswählen → „Alle“ → Zahl = Trefferzahl; „Löschen“
  nennt dieselbe Zahl.
- Pro/Contra: Dafür – macht Verschieben/Ablegen bei größeren Beständen erst
  brauchbar, passt in die bestehende Leiste. Dagegen – ein viertes Element in
  der Leiste (bei 320 px wird es eng: heute 85+62+60 px Knöpfe auf 290 px);
  „Alle“ + „Löschen“ ist ein kurzer Weg zu großem Verlust (heute nur eine
  Rückfrage, kein Rückgängig – E-09 wartet). Empfehlung: ja, aber „Alle“ nur
  für die gezeigten Karten, und „Löschen“ ab 20 Karten mit getipptem Wort
  bestätigen (wie Bereich löschen) – oder erst zusammen mit E-09.

---

## Geprüft ohne Fund

- Ziehen: Maus (sofort), Touch (Halten 350 ms, CDP), danach kein Fehl-Öffnen
  des Karten-Blatts; Maus-Klick auf Griff schreibt nichts (0 Schreibvorgänge),
  Ziehen um einen Platz schreibt 1 Stapel (`ablauf.js` A–D). Pfeiltasten:
  Code gelesen (`app.js:13746-13778`), Fokus wird wiedergefunden; nicht neu
  gemessen (`t_ordnung.js` deckt es ab).
- Auswahlleiste: 320–1440 px einzeilig, Knöpfe 60–85 × 48 px, kein
  Querscrollen (Handy hell, klein, iPad, Desktop hell/dunkel; `tour.js`).
- Seiten: 500–1250 Karten, „Seite 1 von N · X Karten“ stimmt (`gross.js`);
  Sortieren nur innerhalb der Seite ist im Hinweis erklärt.
- Suche: Harakat/Artikel/ungefähre Treffer – Logik gelesen
  (`app.js:11441-11636`), Hinweis „ähnlich geschrieben“ nur ohne genaue Treffer;
  „alle Bereiche“ zeigt fremde Treffer mit Bereichsplakette und nur dem Stift.
- Karte anlegen: Fokus, Enter Wort → Übersetzung, Entwurf bleibt, Rückfrage bei
  halb getippter Karte, Duplikat-Rückfrage (Code + `t_karten_blatt.js` als
  Vorbild); Blatt bei 320 × 568 mit 260 px Tastatur: Titel, Wort, Übersetzung
  im Bild, Blatt scrollt in sich (`rest.js`).
- Bild-Link in der Notiz: Vorschau in der Liste nur als „Bild“, im Blatt
  `<img referrerpolicy="no-referrer" loading="lazy">`.
- Arabischer und sehr langer Bereichsname: Kopfzeile kürzt mit „…“, kein
  Überlauf (`bilder/v-handy-leer.png`, `v-handy-langername.png`).
- Geführter Satz: kein Anlegen-Knopf, Mehr-Blatt nur „Auswählen“ und
  „Bereich löschen“, gesperrte Karten gedimmt mit Schloss, Lektionen ohne
  Knöpfe, arabischer Lektionsname gesetzt.
- Bereiche: Anlegen/Umbenennen/Löschen (Code `app.js:4963-5111`): doppelter
  Name wird gemeldet, leerer Bereich ohne Backup-Zwang, letzter Bereich nicht
  löschbar (Knopf fehlt dann), `selectBereich` setzt Auswahl/Suche/Üben zurück.
- Üben-Auswahl: Chips nur für vorhandene Stände, Zahl stimmt (40), Schalter
  „Mit Schreiben“ bleibt (`ui.drillSchreiben`).
- Dunkel und hell: Start, Auswahl, Karten-Blatt auf Handy/Desktop
  fotografiert, keine Auffälligkeit; Kontrast nicht neu gemessen
  (`t_verwalten.js`/`t_kontrast.js` decken es ab).
- Konsole: in allen Läufen keine Seitenfehler.

## Nicht mehr geprüft (Zeit; zwei Unterbrechungen)

- Kartensatz per Code und Datei einspielen (`codeEinloesenStart`,
  `verarbeiteImportDaten`, `importBackupFile`), Update eines geführten Satzes –
  nur die Einstiegspunkte gesehen (VERW-6), Abläufe und Fehlertexte nicht.
- Speicherkarten: Umbenennen/Löschen/Art-Blatt/Sortieren in der Speicherkarte im
  Browser; „Arten vergeben“ für alle sichtbar (`istAutor()` immer `true`) – ob
  das für normale Nutzer zu viel ist, nicht bewertet.
- Texte-Block in Verwalten (Probelauf, nur Betreiber-Konto).
- Mehrgeräte-Fälle (Karte anderswo gelöscht, während das Blatt offen ist) –
  nur VERW-9 Punkt 4 aus dem Code.
- Flüssigkeit/Tempo der Liste (G-119 bekannt), reduzierte Bewegung,
  Bildschirmleser-Namen im Detail, Querformat.
- Echtes iPhone: G-118, Halten-und-Ziehen, Wegwischen der Blätter.
- Rand-Scrollen mit der Maus (`edgeScrollTick`, Betreiber-Entscheidung
  04.09.) im Zusammenspiel mit der Liste am Desktop.

Hinweis Prüfstand: Der gemeinsame Server auf 8099 antwortete ab der zweiten
Hälfte nicht mehr; die Läufe `rest.js` und `zu.js` liefen gegen einen eigenen
Server auf 8137 (`PRUEF_PORT=8137`, `python -m http.server`, Repo-Wurzel).
