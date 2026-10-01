# Befunde VERW – Verwalten-Tab (Zyklus 2, 01.10.2026)

Prüfer: VERW (nur lesen/messen). Stand 3.18.10, Commit `436dc78`.
Prüfstand: Chromium 154 (`C:\Program Files\Google\Chrome\Application\chrome.exe`),
Firebase-Attrappe, Server 127.0.0.1:8099. Eigene Skripte und Fotos unter
`<scratchpad>/audit/VERW/`. Tempo nur als Hinweis (mehrere Agenten parallel).

*Datei wird laufend ergänzt – Abschnitte unten sind Zwischenstand, bis „Ende“ steht.*

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

## Funde (vorläufig, Schwere-Sortierung folgt am Ende)

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

(weitere in Arbeit)
