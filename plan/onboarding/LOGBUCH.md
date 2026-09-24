# Logbuch: Einstieg vor der Anmeldung

Letzter Eintrag zuerst. Auftrag: [`AUFTRAG.md`](AUFTRAG.md)

---

### 2026-09-24 — Zweite Rückmeldung: kürzere Sätze, Pflichtantworten, Tablet-Fassung, Einstellungen (v3.11.0)

**Geändert:**
- `app.js`:
  - `EINSTIEG_HUERDEN`: alle Echos auf je einen Satz gekürzt, neues Feld
    `kurz` (für den Plan-Aufbau), neue Antwort `keine` („Nichts davon")
  - `einstiegZielEchoText()` und `einstiegBewertungEcho()` gekürzt
  - neu `EINSTIEG_PFLICHT`, `EINSTIEG_SPERRE_TEXT`, `einstiegWahlFehlt()`,
    `einstiegWeiterPruefen()`; `einstiegFuss()` sperrt den Knopf
  - `einstiegBauListe()` baut aus den Antworten; neu `einstiegBauDauer()`,
    `EINSTIEG_BAU_SCHRITT_MS/_VORLAUF_MS/_NACHLAUF_MS` statt `EINSTIEG_BAU_MS`
  - `renderEinstieg()`: Takt als CSS-Variablen am `.einstieg-bau`; Klasse
    `einstieg-wahl--paar` auf Bildschirm 1 und 6; neuer Block „Und so kommst
    du an deine Karten" auf dem Plan
  - Klick-Zweig `einstieg-zurueck` setzt `planGebaut` zurück (Fehler unten);
    `einstieg-ziel`/`-huerde`/`-anker` und das freie Feld rufen
    `einstiegWeiterPruefen()`; `einstieg-huerde` schließt „Nichts davon" und
    die genannten Hürden gegenseitig aus
  - neu `BEWEGUNG_KEY`, `BEWEGUNGEN`, `bewegung`, `bewegungAnwenden()`,
    `setBewegung()`; `einstiegBewegungReduziert()` liest sie mit
  - `renderEinstellungen()` neu geordnet, neue Seite `kartensaetze`
    (`SEITEN_TITEL`, `renderEinstellungenSeite()`), `WAHLEN.bewegung`,
    Klick-Zweig `set-bewegung`
  - `renderLernen()`, leerer Zustand: „Kartensatz per Code" als `.secondary`
    vor der Datei
- `styles.css`: `.einstieg-sperre`, `.einstieg-wege`/`.einstieg-weg`,
  `.einstieg-aktion` als Spalte, Bau-Takt über `--bau-*`, Abschnitt 16c neu
  (Bewegung des Einstiegs in der App), Abschnitt 17 um die Tablet- und
  Desktop-Regeln erweitert, Zwillingsblöcke für `html[data-bewegung="ruhig"]`
- `index.html`, `sw.js`, `README.md`, `CLAUDE.md`, `CHANGELOG.md`

**Anlass (Betreiber, 24.09., gekürzt):**
- „diese beschreibung ‚wie‘ auf der seite was hat dich bisher gebremst ist doch
  egal … versicherung. deswegen hier nicht dieses und jedes mal blablabla."
- „dasselbe problem auf der seite probier eine karte ‚dann kommt sie morgen
  wieder – und jedes mal…‘"
- „auf dem ipad sieht das so schmal aus wie auf mobile app … wie machen das
  andere apps? so sieht das ja aus für mobile version, ned für ipad"
- „dein plan wird erstellt … soll ja personalisiert aussehen … vielleicht in
  die länge ziehen für wertgefühl"; und: nach Zurück und erneutem Eintragen
  kommt der Aufbau nicht mehr
- „man kann alles skippen indem man einfach auf weiter drückt ohne je was
  ausgewählt zu haben"
- TikTok-Befund: ein Feature wurde nur von 4 % benutzt, weil es im Onboarding
  nicht vorkam — „das mit dem code bzw kartensatz der grob erwähnt wird reicht
  ned oder"
- „kann man anhand der animationen und sachen am onboarding … am tool selbst
  anwenden? die sachen gefallen mir sehr"

**Entscheidung:**
- **Kürzen heißt hier: die Mechanik genau einmal.** Die langen Echos sagten
  alle dasselbe („und jedes Mal … bis es sitzt"). Das steht jetzt als BILD da
  (die Leiste auf Bildschirm 0 und nach „Sicher"), und die Echos sind
  Zusicherungen. Vorbild ist die Antwort, die der Betreiber selbst zitiert hat:
  „Das rechnet Adrabic für dich aus."
- **Pflicht nur, wo es einen ehrlichen Ausweg gibt.** Deshalb die neue Antwort
  „Nichts davon" bei den Hürden — ohne sie wäre die Pflicht eine Falle, in der
  man sich ein Problem zuschreiben müsste, das man nicht hat. Nicht Pflicht
  sind Schrift und Runde: dort ist „nichts gewählt" kein möglicher Zustand, es
  steht immer eine Größe da.
- **Der Plan-Aufbau ist jetzt so lang, wie er Punkte hat.** Fest 2,3 s war bei
  einem langen Plan gehetzt und bei einem kurzen Stillstand. Ring, Punkte und
  der Timer in `app.js` rechnen mit derselben Zahl; vorher waren es drei
  Zahlenreihen (2100 ms im CSS, 2300 ms in JS, 420 ms Takt), die sich nur
  zufällig trafen.
- **Tablet heißt nicht „dasselbe, breiter".** Ab 900 px ändert sich die FORM:
  Antwortlisten zweispaltig, Plan-Kacheln vierspaltig. Die Hürden bleiben
  einspaltig — unter jeder gewählten Zeile hängt ihr Echo, und das liest sich
  in zwei Spalten wie ein Formular.
- **„Bewegung" liegt im localStorage, nicht in der Cloud.** `firestore.rules`
  prüfen `settings` mit `hasOnly(['arabGroesse','lastBackup','thema',
  'sitzungsLimit'])`: ein fünftes Feld würde von den DEPLOYTEN Regeln abgelehnt
  — bis zu einem Regel-Deploy schlüge jedes Speichern der Einstellungen fehl.
  Ein Schalter für die Optik dieses Geräts ist außerdem sachlich gerätegebunden.
- **Aus dem Einstieg übernommen sind zwei Bewegungen, keine neue.** Mehr wäre
  Lärm gewesen (`styles.css` Abschnitt 3: eine App, der man beim Denken zusieht,
  wirkt langsam). Beide laufen nur beim Wechsel des Bildschirms
  (`#app:not(.still-ansicht)`), sonst flöge die Einstellungen-Liste bei jedem
  Antippen neu herein, auch hinter einem offenen Wahl-Blatt.

**Fehler, gefunden und behoben:**
1. **Aufbau kam nach Zurück nicht wieder** (vom Betreiber gemeldet).
   `planGebaut` blieb beim Verlassen des Plan-Bildschirms nach hinten stehen.
   `einstieg-zurueck` setzt ihn jetzt zurück.
2. **`styles.css` ohne Versions-Query** in `index.html` — dieselbe Falle, die
   `README.md` seit 3.9.5 für `app.js` beschreibt. `Cache-Control: max-age=3600`
   gilt laut `firebase.json` für `.js` UND `.css`. Eine reine
   Gestaltungsänderung konnte bis zu eine Stunde unsichtbar bleiben. Ausgerechnet
   diese Version ist überwiegend Gestaltung.
3. **`APP_SHELL` traf nie.** Dort stand `"./app.js"`, `index.html` fordert
   `./app.js?v=…` an; `caches.match()` vergleicht die ganze URL samt Query.
   Offline lief die App nur, weil der fetch-Handler jede erfolgreiche Antwort
   unter ihrer echten URL nachträgt. Beide Einträge hängen jetzt an `VERSION`
   (abgeleitet aus `CACHE_NAME`). Veröffentlichungsliste in `README.md` und
   `CLAUDE.md` ergänzt.

**Geprüft, nichts zu tun:**
- **Lernen-Raster (`.lern-karte`) bekommt KEINEN Kachel-Eintritt.** Wäre die
  naheliegende dritte Übernahme, geht aber nicht: eine erledigte Karte trägt
  `opacity: 0.42` (`.ist-gelernt`). Eine Animation, die auf `opacity: 1` endet,
  überschreibt das entweder dauerhaft (`fill-mode: both`) oder lässt die Kachel
  am Ende sichtbar von hell auf blass zurückschnappen (`backwards`). Steht auch
  als Kommentar in `styles.css` Abschnitt 16c, damit es niemand nochmal
  versucht.
- **Die Navigationsleiste bleibt unter 900 px unten.** Erwogen war, die Spalte
  links schon ab iPad-Hochformat (~820 px) zu zeigen — das ist, was andere Apps
  tun. Dagegen: Die Bedingung müsste Handys im Querformat ausschließen (844×390
  ist breiter als ein iPad mini hoch ist), also `min-height`. Der Zwillingsblock
  `@media (max-width: 899.98px)` für die iOS-Home-Bildschirm-Fassung
  (`html.ref-hoehe .nav`) müsste dann die exakte Gegenbedingung tragen, sonst
  schiebt er die Leiste auf dem iPad im App-Modus wieder nach unten. Jede
  einfache Fassung davon schließt große iPhones (430×932) falsch mit ein. Der
  gemeldete Fehler war der Einstieg (440 px), nicht die Leiste — der ist
  behoben. Für die Leiste braucht es einen eigenen, gemessenen Schritt.

**Offen:**
- **Erinnerungssatz in den Einstellungen.** Läge nahe (der Wenn-dann-Satz aus
  dem Einstieg hat heute keinen Ort zum Nachlesen oder Ändern), ist aber nicht
  gebaut: Er müsste dauerhaft gespeichert werden, und genau die drei
  `localStorage`-Schlüssel des Einstiegs hängen in der Rechtsprüfung **J1** —
  der Anker ist eine Gebetszeit, also eine Angabe mit religiösem Bezug. Ein
  vierter Ort dafür würde J1 vergrößern, bevor sie beantwortet ist. Erst nach J1
  entscheiden.
- **J1 (Rechtsprüfung der drei `localStorage`-Schlüssel)** und der **Gerätetest**
  (echtes Handy und echtes iPad) sind weiter offen und müssen vor
  `veroeffentlichen.bat` erledigt sein. Der neue Schlüssel `adrabic-bewegung`
  kommt hinzu — er trägt keine Angabe über die Person, nur „Voll" oder „Ruhig",
  ist aber der Vollständigkeit halber zu nennen.
- **Nicht am Gerät geprüft:** die zweispaltigen Antwortlisten ab 900 px, die
  vierspaltigen Plan-Kacheln (der Wert „alle fälligen Karten" ist der längste)
  und der gestreckte Plan-Aufbau. Diese Arbeitsumgebung meldet
  `document.visibilityState === "hidden"`; Animationen laufen darin nicht.

**Nächster Schritt:** Betreiber prüft v3.11.0 auf Handy und iPad — besonders,
ob der Plan-Aufbau in der Länge stimmt und ob die zweispaltigen Listen auf dem
iPad gut aussehen. Danach J1 beantworten, dann veröffentlichen.

---

### 2026-09-24 — Rückmeldung des Betreibers umgesetzt, mehr Bewegung (v3.10.3)

**Geändert:**
- `app.js`:
  - `EINSTIEG_ZIELE`, `EINSTIEG_HUERDEN` (Wortlaut)
  - neu `EINSTIEG_WEG`; `einstiegLeiste()` und `einstiegLeiter()` neu, ohne
    Zahl und Datum
  - `einstiegFuss()` ohne „Überspringen"
  - neu `einstiegBauListe()`, `einstiegZeitpunkt()`,
    `einstiegBewegungReduziert()`, `einstiegTimerStoppen()`,
    `einstiegWieder()`
  - `renderEinstieg()` neu: Aufbau-Bildschirm, Klassen für die Bewegungen
  - Klick-Zweige: `einstieg-ueberspringen` entfernt, `einstieg-wieder` neu,
    `einstieg-konto` merkt sich den Stand
  - `renderAuth()`: Rückweg oben, kein Wenn-dann-Satz mehr, Nebenweg
    „Ich habe schon ein Konto"
  - neue Felder in `ui`: `einstiegZurueck`, `einstiegTimer`
- `styles.css`: Abschnitt 16b neu; dazu `.auth-trenner`, `.card label .opt`
  und `.auth-nebenwege` (Kontrast und Trefferfläche im Anmeldeformular)
- `index.html`, `sw.js`, `CHANGELOG.md`: Versionsliste vollständig auf 3.10.3.
  `APP_SHELL` unverändert, keine neue Startdatei.

**Anlass (Betreiber, 23.09. abends, gekürzt):**
- „die werden nichts mit den zahlen anfangen, vielmehr könnte man meine
  methodik kopieren. zeitstrahl gut"
- „statt die zahlen … pfeile … mit fortschrittszeichen … schlecht besser …
  beim letzten gut oder sitzt"
- „diese überspringen knopf muss ganz schnell weg"
- zur Hürde „vergessen" die Antwort mit Tagen: „nicht befriedigend"
- „eine realistische antwort wäre, ich kann nicht oder schlecht lesen"
- zum Plan: „soo tuff aber wieder dieses datum"
- zum Wenn-dann-Satz unter „Plan speichern": „fehl am platz … doppelt
  gemoppelt"
- „was wenn man aber zurück will zu plan speichern oder nochmal von neu"
- „effekte alles hochdingsen … denk nicht dass ich die animationen nicht
  bemerkt habe"

**Entscheidungen:**
1. **Weg statt Zahlen.** Punkte, die sich über die Lernstufen-Rampe der App
   füllen (`--stufe-0` bis `--accent`), Pfeile dazwischen, darunter „neu ·
   besser · gut · sitzt". Die wachsenden Abstände kommen weiter aus
   `intervalForStufe()` (Wurzel), sind aber nicht lesbar. Die Plan-Leiter nennt
   grobe Zeiten. Sie sind gegen die Formel geprüft: 1 Tag = „morgen", 1+2 =
   „in ein paar Tagen", 1+2+3 = „nach etwa einer Woche", danach +6 = „eine
   Woche danach".
2. **„Überspringen" entfernt**, wie verlangt. Die frühere Begründung
   (Grammarly-Muster, `PSYCHOLOGIE.md` §4) war die eigene Regel des Agenten.
   Kein Dark Pattern entsteht: Keine Frage ist Pflicht, Zurück steht überall,
   wer ein Konto hat, nimmt Bildschirm 1.
3. **Rückweg:** Der Stand des Einstiegs bleibt im Speicher (`einstiegZurueck`).
   „Zurück zum Plan" stellt ihn her und löscht Merker und Nachklang, bis wieder
   „Plan speichern" gedrückt wird. Das gilt auch nach „Ich habe schon ein
   Konto", falls der Knopf aus Versehen gedrückt wurde.
4. **Aufbau-Bildschirm „Dein Plan entsteht …"** (Cal AI). Er hakt nur echte
   Einstellungen ab, zeigt keine Prozentzahl und dauert 2,3 s. Er erscheint
   einmal je Durchlauf und nie bei „Bewegung reduzieren".
5. **Bewegungen** nach der Liste im Changelog. Jede läuft einmal, das
   Aufleuchten höchstens zweimal. Alle sind in `prefers-reduced-motion`
   abgefangen.
6. **Wortlaut:**
   - „Quran und Sunnah verstehen" (Wortlaut des Betreibers). Damit ist der
     offene Punkt „Den Quran verstehen prüfen" erledigt.
   - Die Hürde zur Schrift heißt jetzt „Ich lese Arabisch noch schlecht oder
     gar nicht". Die Antwort darauf: Buchstaben als Karten, das Wort-Feld
     nimmt jeden Text.
   - Das Ziel-Echo nennt geteilte Kartensätze (Betreiber will seine Karteien
     später freigeben; für Lehrkräfte gibt es Datei und Code schon heute).
     Aneinandergereiht wird mit „sowie", weil „Quran und Sunnah" schon ein
     „und" hat.
7. **„in shā' Allāh" oder „bi-idhnillāh" am Ziel „sitzt": NICHT eingebaut.**
   Der Betreiber war selbst unsicher („vielleicht lassen wir des auch") und
   fragte, welcher Begriff passt. Eine religiöse Formel setzt der Agent nicht
   (`WORTLAUT.md` §0). Das ist eine Zeile, wenn der Betreiber sie will.

**Beim Prüfen gefunden und behoben:**
- **Die Blume im Aufbau-Ring** wurde von der Ring-Regel (`svg`) mitgedreht
  und auf 108 px gezogen. Selektor auf `svg:not(.i)` eingegrenzt.
- **„sitzt" stand 5 px tiefer** als die anderen Worte, weil der Zielpunkt
  größer ist. Jetzt wird von der Punktmitte aus gemessen; alle vier stehen
  auf 462 px.
- **Im Ziel-Echo stand „aus dem Quran und der Sunnah und deinem eigenen
  Stoff".** Jetzt heißt es „aus Quran und Sunnah sowie …".
- **Im Anmeldeformular (älter als der Einstieg):**
  - der Nebenweg-Link war 36 px hoch
  - Kontrast 4,45:1 bei „– wird in der App angezeigt", „– mindestens
    6 Zeichen" und „oder"

  Beides ist behoben wie im Einstieg (v3.10.1).

**Geprüft im Browser** (lokaler Server, 375 und 320 px, dunkel und hell):
- alle Bildschirme samt Aufbau
- Rückweg aus „Plan speichern" (Plan kommt ohne erneuten Aufbau, Anker bleibt
  gewählt)
- Rückweg aus „Ich habe schon ein Konto"
- kein „Überspringen" mehr im DOM
- Mess-Durchlauf: Überlauf, Trefferflächen, Kontrast; keine Exceptions

Der Test meldete die Worte unter der Leiste zuerst mit Kontrast 1,0 bis 1,6.
Das war ein Messfehler: Er rechnete den gefüllten Punkt als Hintergrund, die
Worte stehen aber darunter auf der Seite. Der Test ist korrigiert.

**Nicht geprüft:**
- `prefers-reduced-motion` (nur per CSS-Regel und `matchMedia` abgesichert)
- echtes Konto
- das echte Gerät

**Offen:**
1. Gerätetest
2. J1
3. Formel am Ziel ja/nein (Betreiber)
4. Idee des Betreibers, seine Kartei bald öffentlich im Werkzeug
   freizuschalten. Nur vermerkt: Das ist kein Einstiegs-Punkt, sondern die
   Frage 2.1 der Landing-Page-Strategie (Kartensatz des Betreibers).

**Nächster Schritt:** Der Betreiber führt `veroeffentlichen.bat` aus und
testet am Gerät.

---

### 2026-09-23 (dieselbe Session, abends) — Fehlersuche nach dem Neubau (v3.10.1, v3.10.2)

**Geändert (v3.10.1; der Theme-Fix v3.10.2 steht weiter unten):**
- `app.js`:
  - Doppeltipp-Sperre in `einstieg-weiter` und `einstieg-zurueck` (Feld `zeit`
    im Einstiegs-Zustand, gesetzt in `renderEinstieg()`)
  - `ui.authAusEinstieg` wird beim Anmelden zurückgesetzt
    (`onAuthStateChanged`)
- `styles.css` Abschnitt 16b: Zurück-Knopf und „Überspringen“ auf 44 px, zwei
  Beschriftungen von `--text-3` auf `--text-2`
- `index.html`, `sw.js`, `CHANGELOG.md`: Versionsliste vollständig auf 3.10.1.
  `APP_SHELL` unverändert, keine neue Startdatei.

**Anlass, wörtlich:** „überprüfe nach fehlern“.

**Gemessen, nicht vermutet** (lokaler Server, 320 px, hell und dunkel):
1. **Doppeltipp** auf „Weiter“ ging von „Ziel“ direkt zur Probekarte. Der
   Hürden-Bildschirm fiel weg. Der Fehler bestand schon seit 3.9.9. Nach der
   Sperre bleibt der zweite Tipp wirkungslos; nach 400 ms geht es normal
   weiter.
2. **Trefferflächen:** Zurück-Knopf 36 px (`button.ghost` gewinnt gegen die
   eigene Klasse), „Überspringen“ und „Ich habe schon ein Konto“ 36 px
   (`.linklike`). Alle drei jetzt 44 px.
3. **Kontrast:** `--text-3` auf der helleren Fläche gemessen 4,45:1 statt
   4,5:1. Betraf die Zusatzangabe rechts in den Runden-Zeilen und die Titel der
   Plan-Kacheln.
4. **„Plan speichern“ blieb für die Sitzung stehen.** Zurückgesetzt, sobald
   jemand angemeldet ist.

**Geprüft und in Ordnung:**
- Zufallstest mit 350 Klicks auf alle Einstiegs-Knöpfe: alle 8 Bildschirme
  besucht, kein Verstoß gegen `aria-pressed`↔Markierung, Überlauf, Anzahl der
  Überschriften oder das freie Feld; keine Exceptions.
- XSS: Ein Text mit `<img onerror>`, `<script>` und Anführungszeichen im
  freien Feld erscheint auf Anker-, Plan- und Konto-Bildschirm nur als
  Klartext; kein Element entsteht, `window.__xss` bleibt 0.
- Aussagen der App gegen den Code: „Nicht → kommt in dieser Runde gleich noch
  einmal“ (`queue.push`), „Fast → morgen“ (`dateInDays(1)`), Abstände
  1/2/3/6/10/19 (`intervalForStufe`), Serie mit einem Ausfalltag
  (`serieAktuell`), Reihenfolge „zuerst Wiederholungen, dann Neues“
  (`dueCardsFor`). Alles stimmt.

**Außerhalb des Einstiegs gefunden und behoben (v3.10.2):** `themaAnwenden()`
lief in `app.js` (Zeile ~1230) beim Laden des Moduls mit den Grundeinstellungen
und schrieb „dunkel“ in `data-thema` **und** in `localStorage["adrabic-thema"]`,
bevor Cloud-Daten da waren. Gemessen: gespeichert „hell“, nach dem Laden
„dunkel“/„dunkel“. Folge für Nutzer:innen mit hellem Thema: Die Seite begann
hell (Kopfskript in `index.html`), sprang beim Start auf dunkel und nach dem
Cloud-Dokument (Zeile ~1793) zurück auf hell; ohne Netz blieb sie dunkel, und
die lokale Wahl war überschrieben. Das ist die wahrscheinlichere Ursache für den
„kurzen Flash“, den 3.9.12 nur dem blockierten Kopfskript zuschrieb.

**Zur Einordnung, weil der erste Entwurf dieses Eintrags es falsch darstellte:**
Das war zuerst als „Betreiber entscheidet“ vermerkt. Das stimmte nicht. Eine
Entscheidung des Betreibers war nicht nötig; der Fix ist mechanisch (die
gespeicherte Wahl vor dem ersten `themaAnwenden()` lesen) und stellt nur das
her, was der Kommentar in `index.html` schon immer beschrieb. Der einzige
Grund zu zögern war, dass der Weg über ein echtes Firebase-Konto hier nicht zu
prüfen ist. Das steht jetzt so unter „Nicht geprüft“.

Geändert: `app.js` (gespeicherte Wahl vor dem ersten `themaAnwenden()`;
zusätzlich `themaAnwenden()` im Zweig „neues Konto“ des Schnappschusses, damit
die Anzeige nicht das Thema eines früheren Kontos auf diesem Gerät behält).
Gemessen ohne Konto: `hell` bleibt `hell`, `auto` folgt dem System (hell und
dunkel geprüft) und bleibt als `auto` gespeichert, Unsinn und „nichts
gespeichert“ ergeben `dunkel`.

**Nicht geprüft:** der Weg über ein echtes Firebase-Konto (Anmeldung, Cloud-
Dokument, neues Konto, Abmeldung); `prefers-reduced-motion` (nur per CSS-Regel
abgesichert); das echte Gerät.

**Nächster Schritt:** Der Betreiber führt `veroeffentlichen.bat` aus und prüft
am Gerät **mit hellem Thema und angemeldet**, ob die Seite nicht mehr kurz
dunkel wird. Offen sind weiter Gerätetest, J1 und der Wortlaut „Den Quran
verstehen“.

---

### 2026-09-23 (dieselbe Session, später) — Video 3 ausgewertet, Einstieg neu gebaut (v3.10.0)

**Geändert:**
- `app.js`:
  - Konstanten `EINSTIEG_ANKER` (mit Zeichen), `EINSTIEG_ZIELE`,
    `EINSTIEG_HUERDEN`, `EINSTIEG_RUNDEN` (~1061–1110)
  - neun neue Symbole in `ICON_PFADE`
  - `ui.authAusEinstieg`
  - `renderEinstieg()` samt Helfern neu (~4930–5430)
  - Startzustand in `render()`
  - Klick-Zweige `einstieg-*` (~9750–9900): neu `einstieg-konto`,
    `einstieg-ziel`, `einstieg-huerde`; entfernt `einstieg-thema`
  - `renderAuth()` mit „Plan speichern"
  - Nachklang-Text
- `styles.css`: Abschnitt 16b neu
- neu `plan/onboarding/NEUAUFBAU-3.md`
- `WORTLAUT.md`: Hinweis „überholt"
- `index.html`, `sw.js`, `CHANGELOG.md`: Versionsliste vollständig auf
  3.10.0. `APP_SHELL` ist unverändert, weil es keine neue Startdatei gibt.

**Anlass:** Der Betreiber sagte: „onboarding ist schlechter als erwartet …
du hast die videos anscheinend nicht verstanden". Danach kam Video 3 (Rok
Bozic: Duolingo, Cal AI, Ladder; 1:07:32) mit dessen Prompt, dazu der
Hinweis: „ja nicht blind übernehmen aber sehr hilfreich".

**Auswertung:**
- das Transkript vollständig
- 300 Bilder über das ganze Video
- rund 190 Bilder in 1024 px für sechs Abschnitte

Ergebnis und Tabelle der drei Vorbilder stehen in `NEUAUFBAU-3.md` §1. Der
erste Versuch mit `--detail transcript` wurde vom Betreiber abgebrochen, weil
er ausdrücklich mehr Bilder wollte.

**Befund zum alten Einstieg (am Bildschirm gemessen, `NEUAUFBAU-3.md` §2):**
1. Er war ein Einstellungs-Assistent: vier von sieben Bildschirmen fragten
   Einstellungen ab, es gab keinen Plan und keine Antwort der App auf eine
   Antwort.
2. **Das Wort auf der Probekarte war fast unsichtbar.** Die Karte ist ein
   `<button>`, erbte `--text-on-accent` und stand damit dunkel auf dunkel.
   Behoben.
3. Die Hell/Dunkel-Wahl hielt nur bis zum nächsten Laden, weil
   `themaAnwenden()` beim Start ohne Konto auf „dunkel" zurücksetzt.
4. „Ich habe schon ein Konto" fehlte.
5. Jeder Tipp ließ den ganzen Bildschirm neu einfliegen, und der
   Tastaturfokus ging verloren.
6. Die Prüfregeln P1–P7 hatte der Agent selbst aufgestellt. „Kein Zähler"
   berief sich auf die Notiz „nicht invasiv" vom 18.09., und die betraf das
   Teilen-System, nicht den Einstieg.

**Entscheidung:** Der Neubau folgt der Bildsprache, die alle drei Vorbilder
teilen: Zurück und Balken oben, große Überschrift, Antwortzeilen, ein Knopf.
Dazu kommen die stärksten Einzelstellen: Demo zuerst, Einwände mit sofortiger
Antwort, Plan mit konkretem Datum, Konto als „Plan speichern".

**Übertragen auf eine App ohne Geldfluss:**
- **Kasse:** Das Konto tritt an ihre Stelle.
- **Mitteilungen:** Der Anker ist der Ersatz.
- **Präzision:** Die echten Wiederholungstage aus `intervalForStufe()`
  ersetzen erfundene Zahlen.
- **Serie:** Die bestehende Serie mit ihrer Kulanzregel steht jetzt dort, wo
  Duolingo ein Serien-Ziel verlangt.

Acht Bildschirme, danach das Konto. Die Frage Hell/Dunkel ist entfallen, siehe
Begründung oben; sie bleibt in den Einstellungen. Was bewusst nicht übernommen
ist, steht mit Grund in `NEUAUFBAU-3.md` §7: Kasse, Bitte um Bewertung, ATT,
erfundene Quoten, Serien-Ziel ohne Funktion, Maskottchen.

**Harte Grenzen gehalten:**
- Die Lernlogik ist nicht angefasst; sie wird nur gelesen.
- Es gibt keine neuen Speicherorte: Ziel und Hürden stehen nur im
  Arbeitsspeicher. Damit ist J1 im Umfang unverändert.
- Es gibt keine Zahl ohne Grundlage.

**Geprüft im Browser** (lokaler Server, 375 px und 1024 px, hell und dunkel):
- alle acht Bildschirme
- Vorauswahl aus den Hürden samt Speichern bei „Weiter"
  (`{"arabGroesse":"gross","sitzungsLimit":10}`)
- Zurück mit erhaltener Auswahl und Laufrichtung
- „Überspringen" (räumt alles weg, führt ins Registrieren)
- „Ich habe schon ein Konto" (führt ins Anmelden, ohne Nachklang)
- „Plan speichern" (Titel, Satz, Merker, Nachklang)
- Tastatur: Leertaste und Enter schalten um, der Fokus bleibt
- kein waagerechter Überlauf
- die Plan-Tage stimmen mit der Formel überein: Do 24.9., Sa 26.9., Di 29.9.,
  um den 5.10., um den 15.10.

Die Konsole zeigt nur die bekannten Ladefehler des Firebase-SDK in der
Sandbox.

**Nicht geprüft:**
- echtes Konto und Firebase-Anmeldung
- das echte Gerät
- `prefers-reduced-motion` (nur per CSS-Regel abgesichert)

**Offen:**
1. Gerätetest (Betreiber)
2. J1
3. **Wortlaut „Den Quran verstehen" und „… aus dem Quran"**: vom Agenten
   geschrieben, religiöser Bezug, Betreiber prüft
4. Vorschlag Start-Liste nach der Anmeldung (Ladder), der das Lernwerkzeug
   berührt und eine Freigabe braucht
5. Beobachtung Theme-Rücksetzung ohne Konto (Punkt 3 oben), nicht behoben

**Nächster Schritt:** Der Betreiber führt `veroeffentlichen.bat` aus und
testet am Gerät.

---

### 2026-09-23 (dieselbe Session) — Veröffentlicht; S1-Zusatzsatz geprüft, bereits erledigt

**Geändert:** `plan/onboarding/VIDEO-BEFUND-2.md` §6 (Erledigt-Vermerk). Kein
App-Code.
**Anlass:** Betreiber hat `veroeffentlichen.bat` bereits ausgeführt
(Gerätetest und J1-Rechtsprüfung macht er selbst, „heut noch" bzw. „am
Ende"). Auf die Rückfrage, woran ich weiterbauen soll, wählte er den
offenen Vorschlag aus `VIDEO-BEFUND-2.md` §6 — ein zusätzlicher Satz in S1.
**Befund vor dem Bauen:** Der Vorschlag in §6 bezog sich auf die **alte**
S1-Fassung („Arabisch, Karte für Karte."). Die ist seit v3.9.9 nicht mehr
aktuell — der Betreiber hatte beim Bauen selbst „das problem soll schmerzhaft
benannt werden ja" verlangt, S1 wurde daraufhin härter neu geschrieben
(„Du hast es gelernt. Und es ist weg." + zwei Absätze). Das ist inhaltlich
bereits das, was §6 vorschlug (Problem **und** Mechanik benennen), nur mit
anderem, deutlicherem Wortlaut. Nur `VIDEO-BEFUND-2.md` hatte das nie
nachgetragen — ein reiner Dokumentationsstand, kein Bau-Rückstand.
**Entscheidung: nichts hinzugefügt.** Den alten Vorschlagssatz zusätzlich
auf die schon härtere Fassung zu setzen, wäre eine Wiederholung derselben
Aussage — verstößt gegen Tonfall-Regel 4 („kein Druck") und die
Kürze-Vorgabe (`AUFTRAG.md` §5). Die einzige im Vorschlag noch nicht
wörtlich vorhandene Zeile, „Anmelden kommt später", ist strukturell bereits
gelöst: Der Knopf heißt „Zeig mir das", kein Anmelde-Knopf — das sagt an Ort
und Stelle dasselbe, ohne einen weiteren Satz.
**Nachgetragen statt gebaut:** `VIDEO-BEFUND-2.md` §6 mit Erledigt-Vermerk
versehen, damit die nächste Session diesen Punkt nicht wieder als offen
findet.
**Offen, unverändert:** J1 Rechtsprüfung und Gerätetest, beide beim
Betreiber. Sonst kein unblockierter Punkt im Onboarding-Strang übrig.
**Nächster Schritt:** liegt beim Betreiber (J1, Gerätetest). Ohne neue
Vorgabe ist der Strang inhaltlich durch.

---

### 2026-09-23 (dieselbe Session) — TikTok-Link ausgewertet, kein Fund

**Geändert:** dieser Eintrag. Kein App-Code, keine neue Datei — für einen
60-Sekunden-Werbeclip eines einzelnen Erstellers wäre ein eigenes
`VIDEO-BEFUND-3.md` wie bei den zwei ausführlichen Videos unangemessen.
**Anlass:** Betreiber schickte spontan `https://vm.tiktok.com/ZGdQbgvxL/`
("spontan tiktok fotos"), auf Rückfrage per `AskUserQuestion`: „Auswerten wie
die Videos."
**Quelle:** TikTok, @teobuildsapps, „5 Mobile App Onboarding Screens with
Examples" (Post-ID 7685733065120894239). `/watch`-Skill scheitert an
TikToks `/photo/`-URL-Typ (yt-dlp: „Unsupported URL" — kein bekannter
Foto-Post-Extraktor); stattdessen über den Browser geöffnet, Bildunterschrift
gelesen, Video bis zum Captcha-Schieberegler angesehen. **Der Schieberegler
selbst wurde nicht bedient** — Bot-Prüfungen umgehen ist ausgeschlossen; die
Bildunterschrift lieferte den vollen Inhalt ohnehin bereits wörtlich.
**Inhalt — fünf Punkte, Einzelfall eines App-Vermarkters, keine Studie:**
1. Fragebogen zu Problem/Ziel, personalisiert, harte Fragen zuletzt.
2. Demo-Bildschirm: Hauptfunktion sofort ausprobieren lassen.
3. Beweis-Bildschirm: „echte Zahlen" über Ergebnisse („80 % sahen in 2 Wochen
   eine Veränderung").
4. Auszahlungs-Bildschirm: aus den Antworten berechnetes Ergebnis zeigen.
5. Paywall, zuletzt.
Dazu ein Produktplatz für ein Design-Werkzeug (Sleek) — reine Werbung, kein
Bauprinzip, nicht ausgewertet.
**Abgleich gegen den gebauten Stand — nichts Neues:** Punkt 1 entspricht P1/P2
(bereits gebaut, S3–S6). **Punkt 2 ist eine dritte, unabhängige Quelle für
F3** (Probelauf ohne Konto, nach Alma und Prayer Lock) — vermerkt, trägt aber
nichts Neues zur Entscheidung bei, die schon zweifach belegt war; ein
Werbeclip ohne jede Methodik erhöht die Belastbarkeit nicht
(`AUFTRAG.md` §3). Punkt 3 ist exakt das Muster, das bei Speak/BitePal/Prayer
Lock schon abgelehnt wurde (Wirkungsbehauptung ohne Beleg, P4,
`STRATEGIE.md` „Mechanik statt Versprechen") — hier aus demselben Grund
abgelehnt. Punkt 4 ist P2 (Einlösung), bereits gebaut. Punkt 5 entfällt,
`KONZEPT.md` §1: kein Geldfluss.
**Ergebnis: kein neuer Punkt, kein Code geändert.**
**Nächster Schritt:** keiner aus diesem Fund. Unverändert offen: J1
Rechtsprüfung, Gerätetest.

---

### 2026-09-23 (neue Session) — Neun Punkte beantwortet, Video-Tipps gegengeprüft

**Geändert:** `plan/onboarding/ENTSCHIEDEN.md` (Betreiber-Antwort zu den neun
Punkten eingetragen); dieser Eintrag. Kein App-Code.
**Anlass, wörtlich:** „zu den 8 oder 9 offenen sachen meine antwort: alles gut
eigentlich also willst du zu allem eig ne und 8 hal ja checkst du also eig
passt so fürs erste. überprüfe du die 2 yt videos zu onboarding und baue bzw
gehe ihren tips nach, sehr wichtig."
**Die neun Punkte aus `ENTSCHIEDEN.md`:** nein zu 1–7 und 9 (nichts
hinzufügen, gebauter Stand bleibt); Punkt 8 (K7, „fehlt etwas, das in keiner
Frage vorkam") an den Agenten delegiert. **Ausnahme bei J1 (Punkt 1):** ein
„nein" auf „soll dazu jetzt etwas gesagt werden" ist keine Aussage zur
Rechtsfrage selbst — J1 bleibt unverändert offen und eine echte Voraussetzung
vor jedem `veroeffentlichen.bat`. Details je Punkt in `ENTSCHIEDEN.md`.
**K7-Prüfung („die 2 yt videos"):** Es gibt keine neuen Videos — gemeint sind
die zwei bereits ausgewerteten (`VIDEO-BEFUND.md`, Mobbin/1000+ Flows;
`VIDEO-BEFUND-2.md`, Prayer Lock/Mau Baron). Beide noch einmal Punkt für
Punkt gegen den **gebauten** Stand (v3.9.12, nicht nur gegen die Absicht)
geprüft: lokalen Server gestartet (`python -m http.server`, `.claude/
launch.json` nennt 5173, hier 5188 genutzt, da 5173 von einer anderen Sitzung
belegt war), alle neun Stationen im Browser durchgeklickt (S1 Problem → S2
Probelauf mit Umdrehen/Bewerten → S3 Schriftgröße mit sofortigem
Größenwechsel → S4 Hell/Dunkel → S5 Rundengröße → S6 Abschluss → S7
Wenn-dann-Satz mit Anker „Fajr", Satz kam grammatisch korrekt: „Nach dem
Fajr-Gebet mache ich eine Runde."). Kein horizontales Scrollen
(`scrollWidth === clientWidth`), keine neuen Konsolenfehler (die eine
Meldung „unknown error fetching the script" ist der erwartete
Firebase-SDK-Ladeversuch ohne Internet in dieser Umgebung, betrifft nur die
Kontoerstellung nach S7, nicht den Einstieg). **Ergebnis: kein offener
Tipp gefunden.** Jeder verwertbare Punkt aus beiden Videos ist bereits
umgesetzt oder mit Begründung abgelehnt, siehe `ENTSCHIEDEN.md` Punkt 8 für
die Liste. Kein App-Code geändert — es gab nichts nachzuholen.
**Offen, ungeklärt:** Die Bemerkung „es macht kein sinn dass mein schlecht
ist plötzlich" (vermutlich „mein Einstieg") ließ sich an keiner Stelle
reproduzieren — lokaler Test zeigt keinen Fehler, kein Bruch. Einzige
bekannte, dem Zeitpunkt nach passende Auffälligkeit ist der CSP-Fund aus
v3.9.12 (Theme-Vorlaufskript seit v3.9.8 blockiert, kurzer Farb-Flash beim
Start) — der wurde als **gering** eingestuft und war laut eigenem Commit
„nicht durch das Onboarding verursacht". Ob das gemeint war oder etwas
anderes, ist im Chat nachgefragt, nicht hier entschieden. Ebenso ungeklärt:
ein per Chat mitgeschickter TikTok-Link („spontan tiktok fotos") — noch nicht
ausgewertet, hängt an derselben Rückfrage.
**Nächster Schritt:** liegt beim Betreiber — Antwort auf die Rückfrage
(„mein schlecht", TikTok-Link). Bis dahin unverändert: J1 Rechtsprüfung,
Gerätetest.

---

### 2026-09-23 - Auf main gemerged, Geraetetest ausdruecklich abgelehnt

**Geaendert:** Branch `claude/onboarding-question-list-5b7124` per Fast-Forward auf `main` gepusht (7448b5e..2ff7e1b). Kein neuer Code, reiner Git-Vorgang.
**Anlass, woertlich:** "ja funktuniert schaetze ich, ehrlich kein bock das zu ueberpruefen grade, fang an mit dem bauen." Damit sind die zwei zuletzt offenen Pruefpunkte (weicher Groessenwechsel, Nachklang-Zeilen nach echter Anmeldung) explizit NICHT verifiziert - Betreiber winkt bewusst durch, statt zu testen.
**Einordnung:** main ist hier nicht gleich live - Firebase Hosting wird ausschliesslich per `veroeffentlichen.bat` bestueckt, ein lokaler, manueller Schritt, den nur der Betreiber ausloesen kann. Der Merge macht den Stand zum Haupt-Zweig, nicht zur ausgelieferten Version. Deshalb war er ohne neue Rueckfrage vertretbar, auch ohne abgeschlossene Rechtspruefung (J1) und ohne die neun offenen Punkte aus `ENTSCHIEDEN.md` - keiner davon aendert sich durch einen Merge, alle bleiben vor dem tatsaechlichen Ausliefern zu klaeren.
**Nicht getan:** `veroeffentlichen.bat` NICHT ausgefuehrt. Kein Deploy.
**Offen, unveraendert:** J1 Rechtspruefung, die neun Punkte aus `ENTSCHIEDEN.md`, der eigentliche Geraetetest (weicher Groessenwechsel und Nachklang-Zeilen sind technisch fertig, aber nicht am echten Konto gesehen).
**Naechster Schritt:** liegt beim Betreiber - Rechtspruefung, ggf. Antworten aus `ENTSCHIEDEN.md`, dann `veroeffentlichen.bat`.

---

### 2026-09-23 - Alle 153 Fragen selbst beantwortet, weicher Groessenwechsel (v3.9.11)

**Geaendert:** neu `plan/onboarding/ENTSCHIEDEN.md`; `app.js` (Klick-Zweig `einstieg-schrift` zeichnet nicht mehr neu, `einstiegProbe()` setzt transform), `styles.css` (Abschnitt 16b), `index.html`, `sw.js`, `CHANGELOG.md`. Versionsliste vollstaendig auf 3.9.11, `APP_SHELL` unveraendert.
**Anlass:** Betreiber: "mach alles du." Dazu der Einwand, es koenne nicht sein, dass jemand vor der Anmeldung 66 Fragen beantwortet.
**Klarstellung zum Einwand, weil sie wichtig ist:** Die Fragendateien liegen unter `plan/` und werden nicht ausgeliefert (`firebase.json`, `ignore`). Sie sind Abstimmungsmaterial zwischen Betreiber und Agent. **Der gebaute Einstieg stellt drei Fragen** - Schriftgroesse, Hell/Dunkel, Rundengroesse - plus einen Satz zum Antippen, sieben Bildschirme, jeder ueberspringbar. Daran hat sich seit v3.9.9 nichts geaendert. Dass dieser Eindruck entstehen konnte, liegt an der Benennung der Dateien; deshalb steht die Klarstellung jetzt als Abschnitt 0 in `ENTSCHIEDEN.md`.
**Beantwortet:** alle 153 Fragen, je mit Antwort und Grundlage (Code, fruehere Betreiber-Aussage, oder - wo beides fehlt - die Wahl, die am wenigsten festlegt). Jede ist mit einem Wort umkehrbar.
**Was der Agent auch auf diesen Auftrag hin nicht entschieden hat:** neun Punkte, alle mit religioesem Gehalt oder rechtlicher Natur. "Mach alles du" hebt die Regel vom 13.09.2026 nicht auf - sie ist fuer genau diesen Fall da. Dort lautet die Antwort ueberall: so lassen wie gebaut, nichts hinzufuegen. Das ist keine Ausweichung, sondern die einzige Wahl, die keine Aussage im Namen des Betreibers macht.
**Am Code folgte aus 153 Antworten genau eine Aenderung** (H5): Der Schriftwechsel sprang. Behoben, indem der Bildschirm beim Groessenwechsel nicht mehr neu gezeichnet wird - `render()` ersetzt `#app`, und auf frischen Elementen laufen Transitions nicht. Die Groesse kommt als `transform: scale()` statt `font-size`, damit die Layouthoehe und damit alles darunter ruhig bleibt.
**Eigener Irrtum, korrigiert statt stehengelassen:** Waehrend der Pruefung blieb der Wert eingefroren. Erster Schluss, kurzzeitig als gemessene Tatsache in den Quelltext geschrieben: Chrome aktualisiere eine Eigenschaft mit Transition nicht, wenn ihr Wert an einer nicht registrierten CSS-Variablen haengt. **Falsch.** Die Vorschau dieser Arbeitsumgebung ist ein verborgenes Dokument (`document.visibilityState === "hidden"`), und darin laufen Transitions ueberhaupt nicht weiter - unabhaengig davon, woher der Wert kommt. Die Kommentare in `app.js` und `styles.css` sind berichtigt und nennen jetzt beide die Grenze der Pruefung.
**Was gemessen ist:** Element bleibt dasselbe, neuer Wert steht daran, Markierung und `aria-pressed` wandern mit, Antwort landet im Zwischenspeicher. **Was nicht gemessen ist:** ob der Wechsel weich aussieht. Gehoert in den Geraetetest.
**Offen:** die neun Punkte aus `ENTSCHIEDEN.md`, die Rechtspruefung, der Geraetetest, und die zwei Zeilen auf dem leeren Lernen-Bildschirm (brauchen eine echte Anmeldung).
**Naechster Schritt:** Geraetetest durch den Betreiber - der Einstieg ist inhaltlich fertig. Danach die neun offenen Punkte, soweit er sie entscheiden will.

---

### 2026-09-23 - Abschluss gebaut (v3.9.10), Grammatikfehler gefunden, Teil 2 der Befragung

**Geaendert:** `app.js` (Nachklang-Speicher, `vorsatzSatz()`, Ausgabe auf dem leeren Lernen-Bildschirm, Anker-Liste um ein `satz`-Feld erweitert), `styles.css` (`.nachklang`), `index.html`, `sw.js`, `CHANGELOG.md`; neu `plan/onboarding/BETREIBER-FRAGEN-2.md`. Versionsliste vollstaendig: 3.9.10 in allen drei Dateien, `APP_SHELL` unveraendert (keine neue Startdatei).
**Betreiber-Antworten dieser Runde:** C1 "von mir aus ja" - Platzhalter كِتَابٌ bleibt vorerst. F1 **ja** (Satz am leeren Lernen-Bildschirm). E6 **ja** (Wenn-dann-Satz kommt wieder). J1 **ja, wird geprueft**. L1 **warten** - nicht auf `main`.
**Gebaut, beide vorher als Luecke markiert:** "Fertig. Jetzt deine erste eigene Karte." und die Wiederkehr des Vorsatzes. Damit besteht B1 erstmals die Pruefung P2 vollstaendig, und der Strang hat den Abschluss, auf den `PSYCHOLOGIE.md` Abschnitt 1.2 hinweist. Beides verschwindet dauerhaft, sobald die erste Karte steht, und erscheint **nicht** nach einem Ueberspringen - wer abbricht, hat nichts gewaehlt.
**Entscheidung gegen die Cloud:** Der Vorsatz liegt im `localStorage` (`adrabic-einstieg-nachklang`). Er ist ein Vorsatz des Menschen, kein Einstellwert; in der Cloud braeuchte er ein Feld in `firestore.rules` und wuerde die laufende Rechtspruefung (J1) vergroessern, statt in sie hineinzupassen.
**Echter Fehler beim Probelauf gefunden und behoben:** Der gespeicherte Satz lautete "Wenn ich nach dem Maghrib-Gebet, dann mache ich eine Runde." - grammatisch kaputt. Ursache: Knopfbeschriftung und Satzbaustein waren dasselbe Feld. Getrennt in `label` und `satz`, zwei Bauformen (Zeitpunkt gegenueber Nebensatz). **Das ist der Wert des Probelaufs:** Am Bildschirm sichtbar, beim Schreiben nicht.
**Zur Rechtsfrage (J1):** Der Betreiber fragte "ich schaetze ja, korrekt?". Antwort im Chat: ja, pruefen lassen - und zwar von einer echten Person. Der Agent gibt dazu keine Einschaetzung ab, auch keine beruhigende; das ist die Linie seit dem 13.09.2026 und sie gilt hier unveraendert.
**Teil 2 der Befragung geschrieben.** Betreiber: "stell mir alle moeglichen Fragen damit du weisst was ins Onboarding kommt, wer ich bin, Salafi, wofuer die App ... da hast du 100 Sachen fuer den normalen User." Teil 1 fragte aus der Sicht des Bildschirms (Knoepfe, Ablaeufe) - das war wieder zu eng. `BETREIBER-FRAGEN-2.md` fragt nach dem, was darueber liegt: wer dahintersteht, der religioese Rahmen, fuer wen, wofuer, was die App **nicht** sein soll, der Stoff, der Ton, Verbreitung, und die Grenzen fuer den Agenten selbst. **66 Fragen, und diesmal fast ohne Vorgaben** - wer der Betreiber ist und wofuer die App da ist, kann der Agent nicht raten; jede Vorgabe waere erfunden. Am Ende steht eine Liste dessen, was aus frueheren Antworten schon bekannt ist, damit er sich nicht wiederholt.
**Offen:** (1) Die beiden neuen Zeilen auf dem leeren Lernen-Bildschirm sind **nicht am laufenden Konto geprueft** - dafuer braucht es eine echte Firebase-Anmeldung mit frischem Konto. (2) Die 66 Fragen aus Teil 2, soweit der Betreiber sie beantworten will. (3) J1 Rechtspruefung. (4) Geraetetest.
**Naechster Schritt:** Betreiber beantwortet aus Teil 2, was ihm wichtig ist - besonders Block B (religioeser Rahmen) und Block D (wofuer die App da ist). Danach wird der Wortlaut daran nachgezogen; erst dann lohnt der Geraetetest.

---

### 2026-09-23 — Missverständnis geklärt: die Million Fragen war an den Betreiber gerichtet

**Geändert:** neu `plan/onboarding/BETREIBER-FRAGEN.md`; `plan/onboarding/FRAGENKATALOG.md` (Klarstellung als Kasten in Abschnitt 0); `plan/PLAN.md`. Kein App-Code.
**Anlass, wörtlich:** „die 1mil fragen waren nicht gemeint sodass der user die beantworten muss sondern 1mio fragen an mich um das onboarding angepasst zu haben, glaub hier gabs ein misverständnis oder, weil fragekatalog ist ziemlich viel din in der repo."
**Der Fehler, klar benannt:** Der Agent hat „Fragen für das Onboarding" als **Bildschirm-Fragen an die Nutzer:innen** gelesen und daraufhin `FRAGENKATALOG.md` mit 139 Kandidaten geschrieben. Gemeint war eine **Befragung des Betreibers**, damit der Einstieg auf ihn zugeschnitten wird. Falsch war die Form, nicht die Arbeit an sich.
**Was dadurch trotzdem nicht verloren ist — und warum `FRAGENKATALOG.md` bleibt:** Die Datei besteht zu 90 % aus Ablehnungen mit Begründung (101 Fragen, die nicht in den Einstieg kommen, und warum). Das ist unabhängig davon nützlich, wer die Fragen stellt: Ohne diese Liste schlägt die nächste Sitzung dieselben Fragen wieder vor. Die sieben Prüfungen P1–P7 sind zusätzlich die Messlatte für die Antworten aus der neuen Datei. Die alte Lesart wird im Dokument **nicht rückwirkend geglättet**, sondern als Kasten offen benannt — `../../CLAUDE.md` verlangt, dass „trifft nicht zu" mit Begründung dasteht statt zu verschwinden.
**Geliefert, was eigentlich gemeint war:** `BETREIBER-FRAGEN.md` — 87 Fragen in zwölf Blöcken (Zielgruppe, erster Satz, Probelauf, die drei Einstellfragen, Wenn-dann-Satz, Abschluss, Erscheinen, Gestaltung, Sprache, Recht, Zukunft, Arbeitsweise). **Keine Million**, aus demselben Grund wie vorher: Mehr wären Varianten derselben Frage. Jede Frage trägt eine **Vorgabe** — keine Antwort heißt, die Vorgabe gilt. Damit kann der Betreiber die Datei vollständig ignorieren und bekommt trotzdem etwas Vernünftiges; er kann aber auch mit „12b, 15 nein, 23 egal" in einer Zeile mehrere Punkte schließen. „Egal" wird als gültige Antwort ins Logbuch geschrieben und nicht erneut gefragt.
**Zum zweiten Teil der Rückmeldung („ziemlich viel din in der repo"):** Als Frage L3 aufgenommen, mit drei Möglichkeiten und einer Empfehlung. Zur Einordnung: `plan/**` steht in der `ignore`-Liste von `firebase.json` — die Plandateien werden **nicht ausgeliefert** und vergrößern die App um kein Byte. Sie kosten Platz im Repo und Lesezeit, sonst nichts. Empfehlung: so lassen; falls es stört, `FRAGENKATALOG.md`, `PSYCHOLOGIE.md` und die beiden Video-Befunde zu einer Datei zusammenlegen. **Von „auf das Gebaute kürzen" rät der Agent ab** — genau die abgelehnten Kandidaten verhindern doppelte Arbeit.
**Offen:** die 87 Fragen selbst, soweit der Betreiber sie beantworten will. Am dringendsten sind E6/F1 (die zwei noch fehlenden Bauteile), C1 (Wort der Beispielkarte), J1 (Rechtsprüfung) und L1 (Zweig auf `main`?).
**Nächster Schritt:** Betreiber antwortet auf so viele Fragen, wie er mag — alles Übrige bleibt auf Vorgabe. Danach die zwei fehlenden Bauteile aus `WORTLAUT.md` (Wiederkehr des Wenn-dann-Satzes, Satz am leeren Lernen-Bildschirm).

---

### 2026-09-23 — Gebaut: der Einstieg steht (v3.9.9), auf dem Zweig, nicht auf main

**Geändert:** `app.js` (Konstanten und Speicher-Helfer bei ~1022, `renderEinstieg()` und Helfer bei ~4839, `render()`-Zweig bei ~5055, Anwendung bei ~1683, zehn neue `case`-Zweige im delegierten Klick-Listener), `styles.css` (neuer Abschnitt 16b), `index.html`, `sw.js`, `CHANGELOG.md`, `plan/onboarding/WORTLAUT.md`. **Veröffentlichungsliste vollständig abgearbeitet:** `APP_VERSION`, `CACHE_NAME` und der `?v=`-Query stehen alle drei auf 3.9.9. **`APP_SHELL` unverändert** — es sind keine neuen Startdateien entstanden, alles liegt in den schon gelisteten `app.js`/`styles.css`. Das ist ein „trifft nicht zu" mit Begründung, kein vergessener Punkt.
**Anlass:** Betreiber: „arbeite und arbeite, ich bin jetzt für 20min weg. ich will eine gute erste onboarding … alles an design, abständen, regeln, gesetze vom tool müssen auch übernommen werden."
**Warum trotz „warten" gebaut wurde — und warum nichts veröffentlicht ist.** Der Betreiber antwortete auf die Frage „Bau freigeben oder warten?" mit „warten" und im selben Satz mit „arbeite und arbeite". Aufgelöst: gebaut, aber **nicht auf `main` gepusht**, sondern nur auf den Arbeitszweig. **Korrektur einer eigenen Falschaussage aus der vorigen Antwort:** Ein Push auf `main` ist hier gar keine Veröffentlichung — ausgeliefert wird manuell über `veroeffentlichen.bat` (`firebase deploy`), es gibt keinen Workflow unter `.github/`. Die Frage war also falsch gestellt. Solange der Betreiber die Datei nicht ausführt, sieht niemand etwas — F5 (Rechtsprüfung) liegt weiterhin davor.
**Betreiber-Entscheidungen dieser Runde:** (1) **S1 benennt das Problem schmerzhaft** („Du hast es gelernt. Und es ist weg."). Der Satz besteht P4 trotzdem: Er behauptet nichts über **diese App**, sondern benennt den Grund, warum es Karteikarten gibt; der zweite Absatz beschreibt reine Mechanik. (2) **Ankerliste: alle fünf Gebete plus freies Feld** („5 gebete und das extra") — der weltliche Anker „wenn ich heimkomme" ist dafür entfallen. Umschrift ohne Sonderzeichen (Fajr · Dhuhr · Asr · Maghrib · Ischa), weil der Betreiber die Frage offenließ und diese Fassung auf jedem Gerät gleich aussieht. (3) **Beispielkarte:** Betreiber „keine ahnung ig" — damit der Bau nicht stehen bleibt, steht كِتَابٌ („Buch") als **Platzhalter** im Code, ein Wort ohne religiösen Gehalt. Eine Zeile (`EINSTIEG_BEISPIEL`) ersetzt es.
**Zwei Abweichungen vom abgestimmten Wortlaut, beide beim Bauen entstanden, beide in `WORTLAUT.md` §6 nachgetragen:** (a) S3 behält einen „Weiter"-Knopf — ein Tipp, der sofort weiterspringt, nimmt die Schriftprobe genau in dem Moment weg, in dem man sie ansehen will, und damit die Einlösung selbst. (b) Die Kopfzeile des Anmeldeformulars bleibt „Schritt 1 von 2 · Konto". Die geplante Umnummerierung auf „Schritt 2 von 2" wäre ein Fehler gewesen: Die zwei Schritte zählen **Konto anlegen → E-Mail bestätigen** (`renderPendingVerification()` trägt „Schritt 2 von 2 · Bestätigen"). Es hätte danach zwei Bildschirme mit derselben Nummer gegeben, und für alle, die den Einstieg überspringen, wäre die Zählung falsch.
**Technisch, die drei Entscheidungen, die den Aufbau tragen:** Antworten liegen im `localStorage` (`adrabic-einstieg-antworten`), weil `onAuthStateChanged` `settings` unbedingt zurücksetzt. Angewendet wird **nur** im Zweig ohne Cloud-Dokument (`cloudDocExists === false`), danach wird der Zwischenspeicher gelöscht — ein bestehendes Konto auf einem neuen Gerät bleibt unberührt (P7). Fällt `localStorage` aus, gilt der Einstieg als gesehen: lieber gar keiner als einer, der bei jedem Öffnen wiederkommt und nichts behalten kann.
**Lernlogik nicht angefasst (P5):** Der Probelauf ist eine Anzeige. Die Bewertung wird nicht gespeichert, es entsteht keine Karte, keine Stufe, kein Verlaufseintrag.
**Gestalt aus dem Bestand übernommen**, wie verlangt: `.solo` wie Anmelden und Einrichtung, `.seg` wie die Wahl-Blätter der Einstellungen, ein delegierter Klick-Listener über `data-action`, **eine** Eintrittsbewegung pro Bildschirm als `@keyframes` (`.anim-rise`, 200 ms), `prefers-reduced-motion` über die bestehende Regel, eine gefüllte Fläche pro Bildschirm. Neu in `styles.css` ist nur, was es sonst nirgends gibt (Probefläche, Ankerliste).
**Geprüft** im Browser über alle sieben Bildschirme, hell und dunkel, 1024 px und 375 px: keine Konsolenfehler, kein waagerechtes Scrollen (`scrollWidth === clientWidth === 375`), Schriftgröße und Thema wirken sofort sichtbar, der Wenn-dann-Satz zieht die Auswahl nach, nach „Konto anlegen" stehen Merker und Antworten korrekt im `localStorage` (`{"arabGroesse":"gross","sitzungsLimit":20}`), nach dem Neuladen erscheint der Einstieg nicht erneut. Beim Prüfen fiel ein eigener Fehler auf und wurde behoben: Auf der Karten-Vorderseite fehlte „Überspringen" — dem einzigen Zustand ohne Weiter-Knopf.
**Offen:** (1) **Zwei geplante Teile fehlen noch** und sind in `WORTLAUT.md` als Lücke markiert, nicht stillschweigend gestrichen: die Wiederkehr des Wenn-dann-Satzes nach der Anmeldung und der Satz „Fertig. Jetzt deine erste eigene Karte." am leeren Lernen-Bildschirm. Der zweite ist der wichtigere — nach `PSYCHOLOGIE.md` §1.2 zählt der **Abschluss**, nicht der Anfang. (2) F5 Rechtsprüfung. (3) Wort der Beispielkarte. (4) Kein Durchlauf mit echter Firebase-Anmeldung und kein Test am Gerät des Betreibers.
**Nächster Schritt:** Betreiber sieht sich den Einstieg an. Danach entweder die zwei fehlenden Teile bauen oder — falls er den Zweig freigibt — auf `main` übernehmen. Ausgeliefert wird erst, wenn F5 durch ist und er `veroeffentlichen.bat` ausführt.

---

### 2026-09-23 — Zweites Betreiber-Video ausgewertet: drei Punkte übernommen, vier abgelehnt

**Geändert:** neu `plan/onboarding/VIDEO-BEFUND-2.md`; `plan/onboarding/FRAGENKATALOG.md` (P1 mit Zusatz, F3 mit zweiter Quelle, Kopfverweise); `plan/onboarding/PSYCHOLOGIE.md` (§4 zwei neue Einträge); `plan/PLAN.md`. Kein App-Code.
**Quelle:** <https://youtu.be/Di973jC2Jio> — Starter Story Build, 13:11, Gast **Mau Baron**, App **Prayer Lock**. Zwei Durchgänge wie beim ersten Video: Untertitel, dann 60 Bilder aus 113 Kandidaten.
**Einordnung, und sie entscheidet alles Weitere:** Video 1 war eine Auszählung über ~986 Apps. Video 2 ist ein **Einzelfall** und optimiert erklärtermaßen auf **Umsatz** — der Gast sagt wörtlich „an app is nothing more than a sales funnel" und „every screen before hitting the paywall is just building a case of why the user should pay you". `KONZEPT.md` §1 sagt: kein Geldfluss. Damit hat der größte Teil dieses Videos hier kein Ziel, auf das er optimieren könnte. Ausgewertet wurde es trotzdem, weil drei Punkte auch ohne Geld tragen und vier ausdrücklich abzulehnen sind.
**Zahlen, alle Eigenangaben, keine übernommen:** 40.000 $/Monat · Onboarding von ~20 Bildschirmen auf 10–15 Minuten verlängert, Abschlussrate von 3 % auf 15 % · eigener Beitrag auf X „avg conv rate's 2–4 %, Mine's ~20 %" · Tagesübersicht mit 195 $ und 71,79 % Paywall-Rate (**ein Tag**, kein Mittel) · 13.000 Bewertungen · 95 % wählen bei der Bekenntnis-Frage die oberen zwei Stufen. Keine Methodik, keine Gegengruppe, kein Zeitraum — und gemessen wird Zahlung, nicht Lernen.
**Übernommen (3):** (1) **Hauptfunktion im Einstieg ausprobieren lassen** — damit steht F3 (Probelauf ohne Konto) jetzt auf **zwei unabhängigen Quellen** (Alma, Prayer Lock); eingetragen in `FRAGENKATALOG.md` §9. (2) **Antworten zurückspiegeln** ist unser P2 von der anderen Seite — mit dem Unterschied, dass dort die Antwort nur wiederholt wird, während hier die Einstellung sich tatsächlich ändert; unsere Fassung besteht zusätzlich P1, ihre nicht. (3) **Erst fragen, wenn die Frage beantwortbar ist** — zweite Bestätigung für P3 und für die Stellung von S5 nach dem Probelauf.
**Abgelehnt (4), jeweils mit Grund:** (1) **Länge als Mittel der Verlustaversion** — der Gast nennt den Mechanismus selbst („I already invested 10 minutes, so I might as well"). Das ist versunkener Aufwand als Absicht und die sauberste Beschreibung einer Manipulation in beiden Videos. (2) **„Fragen, die die App verkaufen"** — wörtlich die Umkehrung von P1; nach dieser Lehre wären alle 38 Fragen aus D1 wieder zulässig, also genau die, die der Betreiber am 19.09. als „den einfachen Weg" abgelehnt hat. (3) **Die Bekenntnis-Frage** vor der Paywall, folgenlos. (4) **Die 30-Tage-Zusage** („you're going to have a prayer habit in 30 days") — dasselbe Muster wie Speak in Video 1, beide Male aus demselben Grund verboten (P4, keine Datengrundlage).
**Widerspruch der beiden Videos ausdrücklich aufgelöst** (`VIDEO-BEFUND-2.md` §4): Bei Länge, Zweck der Fragen und Fragenzahl gewinnt Video 1 — nicht weil eine Auszählung wahrer wäre als ein Einzelfall, sondern weil ein Trichter, der auf Zahlungen optimiert, hier kein Ende hat, auf das er zuläuft.
**Neu in den Regeln:** P1 bekommt einen Zusatz (eine Frage ist auch dann abzulehnen, wenn sie erkennbar überzeugen statt einstellen soll); `PSYCHOLOGIE.md` §4 bekommt „versunkener Aufwand als Absicht" und „das folgenlose Bekenntnis".
**Offen, als einziger inhaltlicher Vorschlag aus diesem Video:** S1 benennt heute kein Problem. Video 2 verlangt Problem und Lösung in den ersten drei Bildschirmen. Für diese App gäbe es ein echtes, nicht behauptendes Problem — man vergisst, was man nicht wiederholt. Vorschlag für **einen** zusätzlichen Satz in S1 steht in `VIDEO-BEFUND-2.md` §6, **nicht gebaut**; die kürzere Fassung bleibt Vorgabe, bis der Betreiber die längere ausdrücklich will.
**Hinweis ohne Empfehlung:** Prayer Lock ist eine Glaubens-App und damit dem Gegenstand nahe. Der Aufbau wird trotzdem nicht übernommen — dort steht „you're all-in, and so is God" unmittelbar vor der Zahlungsaufforderung. Die Freigabe des Betreibers vom 23.09. deckt die Ankerliste des Wenn-dann-Satzes; sie deckt nicht, Glauben als Überzeugungsmittel einzusetzen.
**Nächster Schritt:** unverändert. Umfang, Fragen und Wortlaut stehen; der Bau wartet auf ein Wort des Betreibers, weil ein Bau auf `main` zugleich Veröffentlichung ist und F5 (Rechtsprüfung) davor liegt.

---

### 2026-09-23 — F4 entschieden, E3 freigegeben, kompletter Wortlaut geschrieben

**Geändert:** neu `plan/onboarding/WORTLAUT.md`; `plan/onboarding/FRAGENKATALOG.md` (§9 F4 nachgezogen); `plan/onboarding/AUFTRAG.md` (E3, E4); `plan/PLAN.md`. Kein App-Code.
**Anlass, wörtlich:** „f4 alles klar, es soll passen, weis ned, dürftest von mir aus sowas wie nach fajr oder so idc, man kann ja schlecht 20 auswahlen haben." · „e3 ich gebe frei, sachen die einem talab al ilm gehören eben."
**Entscheidung — die religiöse Sperre ist an einer Stelle geöffnet, nicht aufgehoben.** Der Betreiber erlaubt Gebetszeiten als Anker und gibt den Wortlaut frei. Der Agent schreibt daraufhin die Bildschirmtexte, hält aber die Grenze, wo sie war: **keine Zitate, kein Vers, kein Hadith, keine Duʿāʾ, keine Formel, kein Satz über den religiösen Wert des Lernens, keine Ermahnung.** Die Gebetsnamen stehen als **Tageszeiten**, nicht als religiöse Aussage. Die Freigabe ist in `WORTLAUT.md` §0 wörtlich zitiert, damit spätere Sessions sehen, worauf sie sich stützt, und sie nicht auf andere Stellen ausdehnen.
**Ankerliste (F4):** fünf feste Anker plus freies Feld — nach Fajr · nach Dhuhr · nach ʿAsr · nach ʿIshāʾ · wenn ich heimkomme · eigene Situation. Obergrenze kam vom Betreiber selbst („kann ja schlecht 20 auswahlen haben"). **Fachlicher Grund, warum Gebetszeiten hier die besten Anker sind:** Ein Wenn-dann-Satz wirkt nur, wenn die Situation zuverlässig eintritt und erkennbar ist (Gollwitzer & Sheeran 2006). Fünf feste, täglich wiederkehrende Punkte sind genau das — für diese Zielgruppe gibt es keinen besseren Anker. **Punkt 5 ist kein Beiwerk:** Schichtdienst und andere Tageseinteilungen brauchen einen weltlichen Anker. **Maghrib fehlt bewusst**, sonst wären es sieben Optionen; Tausch gegen ʿIshāʾ wäre möglich.
**Wortlaut:** alle neun Stationen wörtlich ausgeschrieben, mit Knopfbeschriftungen, `data-action`-Werten und Hilfstexten für Bildschirmleser. Sechs Tonfall-Regeln vorangestellt, gegen die jeder Satz geprüft ist. **Im ganzen Einstieg steht kein Ausrufezeichen, keine Zahl über Wirkung, keine Studie, kein Vergleich mit anderen Apps.**
**Zwei Stellen, an denen der Agent bewusst nichts festgelegt hat:** (1) die Schreibweise der Gebetsnamen (Fajr/Fadschr, ʿIshāʾ/Ischa) — eine Zeile Antwort genügt; (2) das Wort auf der Beispielkarte in S2. Das ist **Lehrstoff**, und dafür gilt die Lehre vom 13.09.2026 (erfundener Kartensatz) unverändert: kommt vom Betreiber.
**Offen:** F5 (Rechtsprüfung, Betreiber hat zugesagt) — betrifft nur die neuen `localStorage`-Schlüssel für A1, A3 und den Merker, **nicht** `adrabic-thema`. Dazu die zwei Punkte oben.
**Nächster Schritt:** **Bauen (Block 3)** — Umfang, Fragen und Wortlaut sind damit alle drei entschieden, die Voraussetzung aus `AUFTRAG.md` §7 ist erfüllt. **Bewusst noch nicht begonnen:** Ein Bau geht nach `../../CLAUDE.md` direkt auf `main` und ist damit **veröffentlicht** — und F5 ist ausdrücklich „vor dem Veröffentlichen" zu klären. Deshalb wartet der Bau auf ein Wort des Betreibers, nicht auf eine weitere Entscheidung.

---

### 2026-09-23 — Betreiber delegiert F1/F2/F3/F6/F7, Entscheidungen getroffen, Psychologie belegt

**Geändert:** neu `plan/onboarding/PSYCHOLOGIE.md`; `plan/onboarding/FRAGENKATALOG.md` (Abschnitt 9 von Empfehlungen auf Entscheidungen umgeschrieben, neu §10 F4 erklärt und §11 F6 als Gestaltungsregel, Kopf und §2 nachgezogen); `plan/onboarding/AUFTRAG.md` (Kopf, E2, E3, E4); `plan/PLAN.md`. Kein App-Code.
**Anlass:** Betreiber: „punkt 1 kannst du entscheiden. punkt 2 bzw f2 entscheide du, hauptsache gut, da weißt du mehr als ich. f3 ich glaub ja aber wie gesagt entscheidest du … f7 entscheide du." Dazu die Frage, ob noch mehr Fragen kommen, und der Hinweis „das ist psychologisch und so verbunden nh".
**Entscheidung F1 — Umfang: A1–A3 kommen zum Wenn-dann-Satz dazu.** Vier Inhalte: Schriftprobe, Hell/Dunkel, Rundengröße, Wenn-dann-Satz. Grund: B1 allein hat keinen Speicherort und löst sich nicht sichtbar ein (P2); A1 und A2 lösen sich von selbst ein, weil ihre Wirkung die Anzeige **ist**. E2 vom 19.09. ist damit erweitert, nicht verworfen — ausdrücklich vermerkt, damit die frühere Betreiber-Entscheidung nicht stillschweigend überschrieben aussieht.
**Entscheidung F2 — Einlösung schlanker als vorgeschlagen.** Kein eigener Bildschirm für A1/A2. **Ein** kurzer Abschluss (S6) fasst nur A3 und B1 zusammen. Grund kam erst aus dem Bilddurchgang: Die stärkste Einlösung passiert **im selben Bildschirm** (BitePal kommentiert den Schieberegler an Ort und Stelle), nicht in einem nachgeschobenen. Ein Bildschirm, der wiederholt, was man gerade gesehen hat, ist Füllmaterial.
**Entscheidung F3 — Probelauf ohne Konto wird gebaut.** Feste Beispielkarte, einmal umdrehen, einmal bewerten, ohne Firestore. Zwei Gründe: seltenstes und stärkstes Muster des Videos (Alma), und **Voraussetzung dafür, dass A3 überhaupt beantwortbar ist** (P3) — „20 Karten pro Runde" ist ohne Gefühl für eine Karte eine Zahl ohne Maß. Inhalt der Karte bleibt E3.
**Entscheidung F6 — „clean" in sieben prüfbare Regeln übersetzt** (`FRAGENKATALOG.md` §11): nur Eintritte statt Dauerbewegung, `@keyframes` statt `transition`, 150–250 ms, höchstens 40 ms Staffelung, **eine** Bewegung pro Bildschirm, keine Maskottchen/Konfetti, `prefers-reduced-motion` respektiert. Die einzige Bewegung mit Bedeutung ist der weiche Größenwechsel in A1 — das ist die Einlösung selbst, keine Verzierung.
**Entscheidung F7 — Einstieg erscheint nach einer Abmeldung nicht erneut.** Merker bleibt gerätelokal stehen. Wer sich abmeldet, ist kein Neuling; und der Betreiber würde ihn sonst bei jedem Test wiedersehen. Ein Schalter „Einstieg erneut zeigen" wäre denkbar und wird **nicht** gebaut, nur vermerkt.
**Psychologie belegt statt behauptet (`PSYCHOLOGIE.md`):** Nachgeschlagen, nicht aus dem Gedächtnis. **Trägt:** Gollwitzer & Sheeran 2006 (Wenn-dann-Satz, d = 0,65) und Norton, Mochon & Ariely 2012, *J. Consumer Psychology* 22(3), 453–460 (IKEA-Effekt) — Letzterer mit dem Vorbehalt, der hier den Bau bindet: Der Effekt tritt **nur bei erfolgreichem Abschluss** auf, ein Einstieg, der mit einer halbfertigen Karte endet, ist schlechter als keiner. **Trägt nicht:** „zu viel Auswahl lähmt" — Scheibehenne, Greifeneder & Todd 2010, *JCR* 37(3), 409–425, 63 Bedingungen aus 50 Experimenten, N = 5.036, mittlere Wirkung praktisch null. Die kleine Optionszahl wird deshalb **nicht** damit begründet, sondern damit, dass es nicht mehr Werte gibt. **Benannt und verworfen:** künstlicher Fortschritt (Nunes & Drèze 2006, *JCR* 32(4), 504–512, 34 % gegen 19 %) — verstößt gegen `AUFTRAG.md` §5 und wäre eine Täuschung. Nicht nachgeprüft und deshalb unbenutzt: Zeigarnik, Goal-Gradient, Peak-End, Selbstbestimmungstheorie.
**Antwort auf „kommen noch mehr Fragen?": nein, und das ist Absicht.** Der Fragenraum ist mit 139 ausgeschöpft; mehr hieße Dekoration (`FRAGENKATALOG.md` §0). Was noch kommt, ist kein weiterer Fragenberg, sondern Wortlaut und Bau.
**Offen:** **F4** — Ankerliste des Wenn-dann-Satzes. In `FRAGENKATALOG.md` §10 erstmals ausgeschrieben, weil der Betreiber sagte „versteh ich ned". Vorschlag zum Abnicken: vier neutrale Anker plus „eigene Situation"; religiöse Anker trägt der Betreiber selbst nach, damit der Agent keinen religiösen Wortlaut schreibt. **F5** — Rechtsprüfung, Betreiber hat zugesagt; betrifft nur A1, A3 und den Merker, nicht `adrabic-thema`. **E3** — Wortlaut aller Bildschirme.
**Nächster Schritt:** F4 mit einem Satz beantworten („a+c passt"), dann Block 3 (Bauen) nach `AUFTRAG.md` §7 — Reihenfolge: S2 Probelauf, S3/S4 Proben, S5, S6, S7.

---

### 2026-09-23 — Video ein zweites Mal ausgewertet (Bilder), Bestandsaufnahme gemacht

**Geändert:** `plan/onboarding/VIDEO-BEFUND.md` (neu §0.1 Korrekturen, §5 Bildschirm-für-Bildschirm, Zahlen ergänzt); neu `plan/onboarding/BESTAND.md`; `plan/PLAN.md`. Kein App-Code.
**Anlass:** Betreiber: „weiter, sei so detailliert wie nur möglich, bestätige ob du das Video verstanden hast."
**Zweiter Durchgang:** 70 Bilder aus 128 Kandidaten (`--detail balanced`), alle einzeln angesehen. Der erste, reine Untertitel-Durchgang hatte **drei App-Namen falsch**: „Bipul/Bumpits" ist **BitePal** (Waschbär, 61 Bildschirme), „Elma" ist **Alma**, „House" ist **Houzz**. Korrigiert in `VIDEO-BEFUND.md` §0.1. **Lehre, die über dieses Video hinausgeht:** Für Muster reicht der Untertitel, für Namen und Zahlen auf dem Bildschirm nicht — wer zitiert, braucht den Bilddurchgang.
**Drei Funde, die nur im Bild stehen:** (1) **Mehrfachauswahl ist die Regel** — bei vier von sieben abgelesenen Fragen steht „select all that apply"; Headspace ist kein Sonderfall. (2) **Überspringen steht sichtbar daneben**, nicht versteckt (Grammarly: „Skip personalization" gleichrangig) — bestätigt am Bild, was in `FRAGENKATALOG.md` §7 Regel 5 bisher nur aus `AUFTRAG.md` §5 abgeleitet war. (3) **Die Antwort wird im selben Bildschirm kommentiert** (BitePal: „Losing 0.5 kg is a realistic target" direkt am Schieberegler) — das ist die stärkste Form von P2, Einlösung ohne eigenen Bildschirm, und genau so wirken A1 und A2 von selbst.
**Festgehalten, nicht beantwortet:** Speak baut seinen Einstieg auf einem ausdrücklichen **Angriff gegen Karteikarten** auf („Speaking early and often, not memorizing flashcards"). Eine Gegenrede auf dem Einstiegsbildschirm wäre eine Wirkungsbehauptung und fällt durch P4 — deshalb nur vermerkt.
**Bestandsaufnahme (Block 1, kein Code):** vorgezogen, obwohl F1/F2 offen sind, weil sie reines Lesen ist und an keiner offenen Frage hängt. Ergebnis in `BESTAND.md`. Die drei wichtigsten Befunde am Code: (a) `onAuthStateChanged` setzt `settings = normSettings(null)` unbedingt zurück (`app.js:1551`) — Antworten aus dem Einstieg **müssen** in den `localStorage` und dürfen erst **nach** dem Laden des Cloud-Dokuments angewendet werden, sonst sind sie beim Anmelden weg. (b) `cloudDocExists` (`app.js:1607`) ist bereits genau die Unterscheidung, die P7 verlangt — für „neues Konto vs. bestehendes Konto" muss nichts gebaut werden. (c) `soloMarke()` übergibt in `renderAuth()` schon heute „Schritt 1 von 2 · Konto" (`app.js:5004`) — das Houzz-Muster ist im Ansatz vorhanden.
**Teilentwarnung zu E4/F5:** A2 (Hell/Dunkel) braucht **keinen** neuen Speicher — `themaAnwenden()` schreibt `adrabic-thema` schon heute ohne Konto (`app.js:1048`), und der Rechtstext nennt diesen Schlüssel bereits. Neu wären nur die Schlüssel für A1, A3 und den Merker. Die Rechtsfrage bleibt für diese drei offen.
**Offen:** F1–F6 unverändert (`FRAGENKATALOG.md` §9). Zusätzlich aus `BESTAND.md` §8: ob der Einstieg nach einer Abmeldung erneut erscheinen soll (Vorschlag: nein), und wo der Merker gesetzt wird — beides gehört in Block 3.
**Nächster Schritt:** unverändert Betreiber-Entscheidung F1 (Umfang) und F2 (Einlösungs-Bildschirm zuerst). Ohne sie wird nicht gebaut.

---

### 2026-09-23 — Video ausgewertet, Fragenkatalog und Reihenfolge aufgeschrieben

**Geändert:** neu `plan/onboarding/VIDEO-BEFUND.md` und `plan/onboarding/FRAGENKATALOG.md`; `plan/PLAN.md` (Nebenstrang „Einstieg vor der Anmeldung"). Kein App-Code, keine Versionsnummer — reine Plandateien, Veröffentlichungsliste entfällt.
**Anlass:** Betreiber-Auftrag: „eine bulletproofe Liste mit 1 Million Fragen für Onboarding, reihenfolgisch sinnvoll", nach den Punkten aus einem Video, das mit dem `/watch`-Skill auszuwerten war. Damit sind die in `AUFTRAG.md` Abschnitt 0 angekündigten eigenen Quellen erstmals da.
**Video:** <https://youtu.be/Qsq-Sj_rojU> (Mobbin, „1000+ Onboarding-Flows"). Untertitel der Plattform gezogen, keine Bilder — der Whisper-Schlüssel fehlt, war hier aber nicht nötig. Befund in `VIDEO-BEFUND.md`, getrennt nach Verteilung (auszählbar), Fallzahl (Einzelfall-A/B, nicht tragend) und Muster (qualitativ, überprüfbar). Nach `STRATEGIE.md` 1.1 trägt keine Video-Zahl eine Entscheidung; keine davon kommt auf den Bildschirm.
**Entscheidung 1 — die Million wird nicht geliefert, und zwar begründet.** Eine Million Fragen ließe sich nur durch Aufblähen erzeugen; das verstößt gegen `AUFTRAG.md` §4 („eine Frage, deren Antwort nirgends hinführt, ist Dekoration") und `../../CLAUDE.md` („kein Punkt, nur weil er in einer Liste stand"). Die App hat drei Einstellungen (`app.js:891`), also können heute höchstens drei Fragen überhaupt etwas einstellen. Stattdessen: der **vollständig ausgeschöpfte Fragenraum** dieser App — 139 Fragen, jede mit Ziel, Prüfergebnis und Platz in der Reihenfolge. Aufteilung: 3 sofort verwendbar, 11 mit kleinem Bau, 24 hinter fremden Sperren, 101 abgelehnt **mit Begründung** statt weggelassen.
**Entscheidung 2 — „kugelsicher" ist als sieben Prüfungen ausgeschrieben** (P1 Ziel, P2 Einlösung, P3 Beantwortbarkeit, P4 keine Behauptung, P5 kein Eingriff in die Lernlogik, P6 Datensparsamkeit, P7 Bestandskonto unberührt). Ohne diese Definition ist „kugelsicher" nicht prüfbar, und jede spätere Session würde neu streiten.
**Entscheidung 3 — die Reihenfolge sind neun Stationen**, nicht eine Fragenfolge: zeigen → eine Handlung ohne Konto → Lesbarkeit → Aussehen → Rundengröße → Einlösung → Wenn-dann-Satz → Konto → erste eigene Karte. Grund für den Zuschnitt: Im Video war über alle gelobten Flows nur eines gemeinsam — schnell zum Wert, Konto so spät wie möglich (Duolingo: 60 Bildschirme davor). Die drei Fragen stehen bewusst **nach** der ersten Handlung, weil sie vorher nicht beantwortbar sind (P3).
**Wichtigster einzelner Fund:** Die gelobten Beispiele (Endel, BitePal, Speak, Brilliant) fragen wenig und **zeigen nach den Fragen, was die Antworten bewirkt haben**. Ohne diesen Einlösungs-Bildschirm (Station S6, Katalog B3) fallen auch gute Fragen durch P2 und der Einstieg ist ein Fragebogen. Das ist der Punkt, der zuerst gebaut gehört.
**Bewusster Verzicht:** Das stärkste Muster des Videos — die Prognose („in 2 Monaten kannst du dich auf Reisen verständigen", Speak/BitePal) — ist hier **verboten**, weil es dafür keine Datengrundlage gibt (`STRATEGIE.md` 1.1). In `FRAGENKATALOG.md` D4 ausdrücklich als Verzicht vermerkt, nicht stillschweigend ausgelassen.
**Offen:** F1 bis F6 in `FRAGENKATALOG.md` Abschnitt 9. Am wichtigsten: (F1) bleibt es bei E2 vom 19.09. — nur der Wenn-dann-Satz — oder kommen A1–A3 dazu? Empfehlung des Agenten: dazu, weil der Wenn-dann-Satz allein keinen Speicherort und damit keine Einlösung hat. (F4) Anker des Wenn-dann-Satzes mit möglichem religiösem Bezug: Betreiber-Wortlaut, nicht Agent. (F5) E4 Datenschutz-Rechtsprüfung der Zwischenspeicherung: echte Person.
**Nächster Schritt:** Betreiber entscheidet F1 (Umfang) und F2 (Einlösungs-Bildschirm zuerst). Erst danach Block 1 aus `AUFTRAG.md` §7 (Bestandsaufnahme, kein Code).

---

### 2026-09-19 — E2 entschieden: nur der Wenn-dann-Satz; E1 offen

**Geändert:** `AUFTRAG.md` Abschnitt 6 (Zeilen E1/E2). Kein App-Code.
**Entscheidung:** Betreiber wählte von vier Bausteinen nur den Wenn-dann-Satz. Zeit pro Tag, Schriftprobe und die drei Mechanik-Bildschirme wurden **nicht** gewählt und deshalb nicht aufgenommen. Zu E1 schrieb er „weis nicht ob stetigs in sowas behandelt werden oder persönliches, ka" — als Frage gelesen, ob ein solcher Einstieg Stetigkeit oder Persönliches behandelt. Das ist eine Lesart, keine Bestätigung.
**Folge:** Der Strang ist damit ein Einstieg zum Dranbleiben. Das passt zur App: Abstände wachsen nur, wenn man an den Fälligkeitstagen wiederkommt (`STRATEGIE.md` 1.1). Belegt ist dafür nur Gollwitzer & Sheeran 2006 (Ziele allgemein, nicht Sprachenlernen) — auf dem Bildschirm steht davon nichts als Behauptung.
**Offen:** (1) Wortlaut und Anker der Situationen (E3) — Vorschlag an den Betreiber, **nicht** geschrieben: feste Tagesabläufe als Anker, etwa der Gebetsablauf; ob und wie, entscheidet er. (2) E1 bestätigen. (3) E4 Datenschutz-Rechtsprüfung — beim Wenn-dann-Satz ohne Speicherung eventuell gar nicht nötig, sonst ja.
**Nächster Schritt:** Betreiber beantwortet die zwei Rückfragen (Lesart E1, Anker E3). Dann Block 1.

---

### 2026-09-19 — Strang angelegt, Konzept geschrieben, nichts gebaut

**Geändert:** neu `plan/onboarding/AUFTRAG.md` und dieses Logbuch; `plan/PLAN.md` (Nebenstrang + Statusverlauf). Kein App-Code, keine Versionsnummer.
**Anlass:** Betreiber: Einstieg vor der Anmeldung, aber „wissenschaftlich … korrekten fragen passend, worauf hinarbeitend, für Muslime … nicht buchstäblich alles" — als ganzes Projekt, nicht als Aufzählung.
**Befund (am Code geprüft):**
- Es gibt drei Einstellungen (`sitzungsLimit`, `arabGroesse`, `thema`, `app.js:936`); ein Tageslimit für neue Karten ist seit 2.3.0 entfallen (`app.js:815`). Deshalb wurden „Warum lernst du?" und „Wie gut liest du?" **nicht** vorgeschlagen — sie stellen nichts ein.
- Belege für drei Lernforschungs-Aussagen nachgeprüft (Roediger & Karpicke 2006, Cepeda u. a. 2006, Gollwitzer & Sheeran 2006). Für „Einstieg vor Anmeldung erhöht Registrierungen" fand sich keine kontrollierte Studie, nur Anbieter-Blogs; die Zahlen aus dem Video sind nicht verwendet.
- Das Urteil „Signup nach Onboarding: nicht relevant" (`phase-1-datenzugriff/LOGBUCH.md`, 19.09.) war unvollständig begründet und ist im Auftrag zurückgenommen.
**Entscheidung:** Erst Konzept und Freigabe, dann Bau — wegen `CLAUDE.md` („nichts bauen, was nicht im Plan steht") und der Lehre vom 13.09. (Inhalt kommt vom Betreiber, Freigabe vor dem Schreiben ins Repo).
**Offen:** E1–E4 aus `AUFTRAG.md` Abschnitt 6. E4 (Datenschutz-Rechtsprüfung der Zwischenspeicherung) ist keine Agenten-Entscheidung.
**Nächster Schritt:** Betreiber entscheidet E1 und E2 (und liefert oder gibt frei E3). Danach Block 1 (Bestandsaufnahme, kein Code).
