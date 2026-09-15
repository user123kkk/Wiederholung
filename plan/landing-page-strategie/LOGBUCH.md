# Logbuch — Landing Page Strategie

Anleitung: [`ANLEITUNG.md`](ANLEITUNG.md) · Befund: [`BEFUND.md`](BEFUND.md)
Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `läuft` — wartet auf sechs Antworten des Betreibers

---

## Was dieser Ordner ist

Kein Phasen-Ordner. Die Startseite selbst ist in Phase 6 gebaut und `fertig`;
hier geht es darum, sie **inhaltlich** richtig zu machen, statt generisch.
Reihenfolge laut `ANLEITUNG.md`: Befund → Strategie → erst dann HTML.

---

## Format jedes Eintrags

```
### JJJJ-MM-TT — kurze Überschrift

**Geändert:** Dateien mit Pfad, bei Code mit Zeilennummer
**Entscheidung:** was festgelegt wurde — und warum, nicht nur was
**Offen:** was bewusst liegen bleibt und woran es hängt
**Nächster Schritt:** das eine, was als Nächstes zu tun ist
```

---

## Einträge

### 2026-09-13 — Befund aus Code und Plan vorausgefüllt, Satzfehler auf der Live-Seite behoben

**Geändert:**
- `plan/landing-page-strategie/BEFUND.md` — von einem leeren Fragebogen zu
  einem Dokument, in dem jede Frage einen von drei Zuständen trägt: ✅ belegt
  (mit Quelle im Code oder Plan), 🟡 Vermutung (zu bestätigen oder zu
  streichen), ❓ offen (nur der Betreiber kann es beantworten). Neuer
  Abschnitt „Zusammenfassung: was jetzt wirklich noch fehlt" am Ende.
- `plan/landing-page-strategie/LOGBUCH.md` — neu angelegt (fehlte).
- `landing.html:286` — „Nutzer kannst du von überall her weitermachen —
  synchronisiert" → „Auf jedem Gerät dort weitermachen, wo du aufgehört hast
  — alles wird synchronisiert".
- `app.js:19` `APP_VERSION` 3.0.18 → 3.0.19, `sw.js:10` `CACHE_NAME`
  `adrabic-3.0.18` → `adrabic-3.0.19`, `CHANGELOG.md` Eintrag 3.0.19.
  (Veröffentlichungsliste aus `README.md`; `APP_SHELL` unverändert, es kam
  keine neue Startdatei dazu.)

**Entscheidung:**

1. **Der Befund wird vorausgefüllt, nicht erfunden.** `ANLEITUNG.md` sagt:
   ohne Antworten keine Strategie. Der Befund war leer, also war die ganze
   Arbeit gesperrt. Ein Teil der Fragen war aber längst beantwortet — im
   Code, im Impressum, in `../PLAN.md`. Diese Antworten aus dem Gedächtnis
   neu schreiben zu lassen, hätte Fehler produziert (Beispiel: die
   Intervallstufen kennt niemand auswendig). Also: alles Belegbare mit
   Quellenangabe eintragen, alles Übrige ausdrücklich als Frage
   stehenlassen. Die Zielgruppe, die Message und der TikTok-Kanal sind
   **nicht** vorausgefüllt — das wäre genau die „AI-Slop", die
   `ANLEITUNG.md` ausschließt.

2. **Abschnitt 3.1 ist der eigentliche Gewinn.** Was die App kann, steht
   jetzt als Tabelle mit Zeilennummern da — inklusive der Zahlen, die eine
   Landing Page braucht (Intervallstufen 1/2/3/6/10/19/34/61/110/180 Tage,
   Deckel 180 Tage, ±15 % Streuung, drei Bewertungsstufen). Damit kann die
   spätere Seite werben, ohne etwas zu behaupten, was der Code nicht tut.

3. **Drei Widersprüche festgehalten statt umschifft** — sie gehören in die
   Strategie, nicht in eine Fußnote:
   - *„Wissenschaftlich bewährt" / „Forget-Curve"* steht auf der Seite, der
     Code hat aber ein selbstgebautes Stufensystem ohne Studienbeleg. Weil
     im Impressum der Vater haftet, ist eine unbelegte Wirkungsbehauptung
     nicht nur unsauber, sondern angreifbar.
   - *Medina Buch 1 bleibt privat* (entschieden 12.09.2026). Wer über TikTok
     kommt, findet also ein leeres Werkzeug. Der Inhalt, der die Seite
     verkaufen würde, ist bewusst nicht da.
   - *Außen „Adrabic", innen „Wiederholung"* (`sw.js:10` vs. `app.js:4648`).
     Nutzer sehen diesen Bruch beim ersten Klick.

4. **Der Satzfehler wird sofort behoben, der Rest der Seite nicht angefasst.**
   `ANLEITUNG.md` sagt „erst dann wird die HTML umgebaut" — das gilt für den
   Umbau. Ein grammatisch kaputter Satz auf einer öffentlich erreichbaren,
   bei Google eingereichten Seite ist kein Umbau, sondern ein Defekt, und
   drei Wochen darauf zu warten wäre falsch. Headline, „Wissenschaftlich",
   Call-to-Action und Aufbau bleiben unverändert, bis die Strategie steht.

**Offen:**

- **Sechs Antworten des Betreibers** (ausgeschrieben am Ende von
  `BEFUND.md`): TikTok-Kanal · Zielgruppe in einem Absatz · womit ein Neuer
  ohne Kartensatz anfängt · Vokabeltrainer oder Talab-al-Ilm-Begleiter ·
  „wissenschaftlich" belegen oder ersetzen · Marke oder Person (und ob das
  zum Impressum passt). Ohne diese gibt es keine `STRATEGIE.md`.
- Die Frage „womit fängt ein Neuer an" steht **nicht** im ursprünglichen
  Fragebogen. Sie kam bei dieser Durchsicht dazu und hat von allen sechs die
  größten Folgen — sie kann die Entscheidung vom 12.09.2026 (Medina Buch 1
  privat) wieder aufmachen und bringt dann eine Urheberrechtsfrage mit.
- Klick-Zählung vom TikTok-Link ist heute **nicht** möglich und auch nicht
  nebenbei nachrüstbar: Die CSP aus Phase 4 lässt keine fremden Skripte zu,
  und die Datenschutzerklärung schließt nicht-notwendige Cookies aus. Wer
  messen will, ändert beides — eigene Entscheidung, eigene Arbeit.

**Nächster Schritt:** Die sechs Antworten aus `BEFUND.md` einholen. Liegen
sie vor, wird daraus `STRATEGIE.md` gebaut (Message, Keywords, Funnel,
Headlines); erst danach der Umbau von `landing.html`.

### 2026-09-13 — `STRATEGIE.md` gebaut, soweit sie ohne die sechs Antworten trägt

**Geändert:**
- `plan/landing-page-strategie/STRATEGIE.md` — neu angelegt, 8 Abschnitte.
- `plan/PLAN.md` — Nebenstrang und Abschnitt „Wo eine neue Session anfängt"
  auf den neuen Stand gezogen, Statusverlauf ergänzt.
- Kein Produktivcode. `landing.html` unverändert, deshalb entfällt die
  Veröffentlichungsliste aus `README.md` (reine Plandateien).

**Entscheidung:**

1. **Der Befund kam unausgefüllt zurück — das wird benannt, nicht
   überspielt.** Der übergebene Text ist derselbe wie der im Repo: 29 ❓,
   keine der sechs Antworten. Die Strategie trotzdem zu schreiben, als wären
   sie da, hätte genau die erfundene Zielgruppe und die geratene Headline
   produziert, die `ANLEITUNG.md` ausschließt. Sie gar nicht zu schreiben,
   hätte dagegen den größeren Teil der Arbeit liegen lassen, der von den
   sechs Antworten gar nicht abhängt.

2. **Also zweigeteilt.** Teil 1 (Abschnitte 1–2) ist fertig und wird durch
   die Antworten nicht mehr umgeworfen: Kern-Message, die drei tragenden
   Belege, der Funnel mit seiner Bruchstelle, was messbar ist. Teil 2
   (Abschnitte 3–4) hängt an den Entscheidungen und steht deshalb als **drei
   vollständig ausformulierte Fassungen** da, je eine pro Ausrichtung, mit
   der Bedingung davor. Der Betreiber wählt, die Fassung ist sofort
   einsetzbar, keine neue Session denkt das noch einmal von vorn.

3. **Die Kern-Message ist „Mechanik statt Versprechen".** Die heutige Seite
   arbeitet mit Behauptungen („wissenschaftlich bewährt", „funktioniert
   wirklich"), die austauschbar und im Fall von „wissenschaftlich" durch den
   Code nicht gedeckt sind. Ersatz ist nicht eine bessere Behauptung, sondern
   die Stufenleiter selbst: 1 · 2 · 3 · 6 · 10 · 19 · 34 · 61 · 110 · 180
   Tage, Deckel bei 180 (`app.js:89–99`). Überprüfbar, ungewöhnlich, sagt
   dasselbe ohne Behauptung.

4. **Drei Belege tragen die Seite, nicht neun Merkmale.** Handschrift-Feld
   (`app.js:1006ff`, `5189ff`), Lektionen, die nacheinander aufgehen
   (`app.js:234–269`), und die drei Bewertungen mit „Nicht" = zurück in
   derselben Runde (`app.js:3509–3516`). Offline, Sync, Statistik, Hell/Dunkel
   sind austauschbar und gehören in eine Liste weiter unten, nicht in den
   Aufmacher.

5. **Der größte Hebel ist nicht die Headline, sondern der leere Anfang.**
   Wer sich registriert, steht vor einem leeren Werkzeug — Medina Buch 1 ist
   seit 12.09.2026 privat. Das ist kein Textproblem; deshalb steht die Frage
   „womit fängt ein Neuer an" in Abschnitt 2 an **erster** Stelle, vor
   Headline und Keywords. Empfehlung dort (ausdrücklich als Empfehlung
   gekennzeichnet): ein eigens gemachter öffentlicher Einsteiger-Kartensatz
   aus dem Inhalt der eigenen TikTok-Videos — löst Funnel-Bruch und
   Urheberrechtsfrage in einem, und Marketing und Produkt sind dabei dasselbe
   Ding.

6. **Die HTML wird nicht angefasst, auch nicht die „wissenschaftlich"-Stelle.**
   `ANLEITUNG.md` sagt: erst Strategie, dann HTML. Der Austausch für alle drei
   Fundstellen steht fertig in Abschnitt 6.1 und ist ein Handgriff — aber
   „belegen oder ersetzen" ist ausdrücklich eine der sechs Fragen des
   Betreibers (Befund 5.4), und die trifft kein Agent. Anders als der
   Satzfehler vom Vormittag ist das keine reine Fehlerbehebung, sondern eine
   inhaltliche Entscheidung.

7. **Keywords sind als Hypothesen gekennzeichnet, nicht als Wissen.** Es gibt
   keine Suchdaten. Der Prüfweg steht dabei: Search-Console-Leistungsbericht
   vier Wochen nach dem Umbau, dann Abschnitt 4 gegen die echten Begriffe
   austauschen. Festgehalten ist auch die Kernkorrektur: Titel und
   Beschreibung zielen heute auf generische Vokabel-Suchen, und das Wort
   „Arabisch" kommt im sichtbaren Seitenkopf überhaupt nicht vor.

**Offen:**

- **Drei Antworten reichen zum Weiterarbeiten**, nicht sechs: 2.1 (womit ein
  Neuer anfängt), 2.2 (eng oder weit) und 2.3 („wissenschaftlich" ersetzen).
  Damit steht die Fassung und der Umbau kann beginnen. 2.4–2.6 (Marke oder
  Person · Namensabgleich innen/außen · Kostenfrage-Wortlaut) blockieren
  nicht, sie ändern Details.
- **Die unbelegte Wirkungsbehauptung steht weiterhin live** an drei Stellen
  in `landing.html` (Lösungskasten, erstes Kästchen, Meta-Beschreibung).
  Haftungsrelevant, weil der Vater im Impressum steht. Wartet auf ein Ja zu
  2.3.
- **Zwei Kleinigkeiten, bei der Durchsicht gefunden, bewusst nicht jetzt
  gemacht:** `landing.html:8` setzt `color-scheme` fest auf `dark`, obwohl das
  Skript darüber auch auf hell schalten kann — gehört in denselben Handgriff
  wie der Umbau. Und die Kopfzeile **in** der App zeigt „Wiederholung"
  (`app.js:3810`, `3996`, `4648`), während außen „Adrabic" steht; das sind
  drei Zeichenketten und keine Funktion, aber es fasst App-Dateien an und
  braucht deshalb einen eigenen Schritt mit eigenem Logbuch-Eintrag.
- **Der Befund selbst bleibt unverändert.** Er wird erst fortgeschrieben, wenn
  echte Antworten da sind — ein vom Agenten ausgefüllter Befund wäre wertlos.

**Nächster Schritt:** Die drei Entscheidungen aus `STRATEGIE.md` Abschnitt 2.1,
2.2 und 2.3 einholen. Liegen sie vor, wird die passende Fassung aus Abschnitt 3
genommen und `landing.html` nach der Struktur aus Abschnitt 5 umgebaut —
inklusive der Sofort-Änderungen aus 6.1 und der Veröffentlichungsliste aus
`README.md`.

### 2026-09-13 — Zwei Entscheidungen getroffen, unbelegte Behauptung entfernt (v3.0.20)

**Geändert:**
- `landing.html:9` und `:13` — Meta- und Open-Graph-Beschreibung ohne
  „wissenschaftlich bewährt", dafür mit „arabische Vokabeln, Grammatik und
  Quran-Inhalte".
- `landing.html:8` — `color-scheme` von `dark` auf `light dark`.
- `landing.html`, Lösungskasten — „Die Lösung: Wissenschaftlich bewährte
  Wiederholungen … funktioniert wirklich" → „So funktioniert es" plus die
  Stufenleiter (Stufe 1 morgen, Stufe 4 in sechs Tagen, Stufe 7 in 34 Tagen,
  nie weiter als 180 Tage).
- `landing.html`, erstes Kästchen — „Wissenschaftlich / Basiert auf der
  Forget-Curve" → „Mitschreiben / Das arabische Wort mit dem Finger auf der
  Karte selbst nachschreiben".
- `app.js:19` `APP_VERSION` 3.0.19 → 3.0.20, `sw.js:10` `CACHE_NAME`
  `adrabic-3.0.20`, `CHANGELOG.md` Eintrag 3.0.20. `APP_SHELL` unverändert,
  es kam keine neue Startdatei dazu.
- `STRATEGIE.md` — 2.2 und 2.3 als entschieden vermerkt, 2.1 um die Antwort
  des Betreibers ergänzt, Abschnitt 6.1 und 8 nachgezogen.
- `../PLAN.md` — Lehrer-/Schülermodus unter „Später" aufgenommen,
  Statusverlauf und „Wo eine neue Session anfängt" nachgezogen.

**Entscheidung:**

1. **2.2 entschieden: eng anfangen, weit anlegen.** Damit gehört „Arabisch"
   sichtbar nach oben — in Headline, Seitentitel und Beschreibung. Die
   Beschreibung trägt es seit v3.0.20; Headline und Seitentitel warten auf
   2.1, weil sie Teil der Fassung sind.

2. **2.3 entschieden: ersetzen. Am selben Tag ausgeführt.** Die Antwort des
   Betreibers kam zögernd („ja weg machen anscheinend, weiß nicht"). Sie
   wurde trotzdem ausgeführt, weil sie **in eine Richtung sicher** ist: Eine
   Behauptung zu entfernen kann niemandem schaden und ist rückgängig zu
   machen, falls je eine Quelle auftaucht; sie stehen zu lassen, während die
   Seite bei Google eingereicht ist und der Vater dafür haftet, kann es sehr
   wohl. Der Ersatz ist nicht eine schwächere Behauptung, sondern gar keine:
   die Stufenleiter aus `app.js:89-99`, überprüfbar und ungewöhnlich.

3. **Nur ersetzt, was durch 2.3 gedeckt ist — nicht mehr.** Die
   Kostenfrage-Formulierung („komplett kostenlos", 6.1 Nr. 4) hängt an
   Entscheidung 2.6 und ist **nicht** angefasst worden, obwohl sie in
   derselben Liste steht und obwohl es nur ein Wort ist. Eine Empfehlung des
   Agenten ist keine Entscheidung des Betreibers. Ebenso unverändert:
   Headline, Handlungsaufruf, Aufbau, Seitentitel — der Titel trägt keine
   Behauptung, musste also nicht sofort geändert werden und wird beim Umbau
   mit der Fassung zusammen nachgezogen.

4. **2.1 ist nicht beantwortet.** Der Betreiber hat mit einer Produktidee
   geantwortet — Lehrer- und Schülermodus mit Klassenräumen, damit ein Lehrer
   Kartensätze an seine Schüler weitergeben kann. Die Idee ist ernst zu
   nehmen und steht jetzt vollständig in `../PLAN.md` unter „Später", mit
   vier Gründen, warum sie jetzt nicht gebaut wird: sie fasst das
   Lernwerkzeug an (Konzept-Abschnitt 7), sie beantwortet die
   Landing-Page-Frage nicht (die fragt nach **heute**, der Lehrermodus
   braucht Monate), Klassenräume verarbeiten Daten Minderjähriger sichtbar
   für Dritte (andere Größenordnung als Phase 5, Vater haftet), und sie
   brechen die Grundannahme der Firestore-Regeln auf, dass jedes Konto nur
   unter sich selbst liest und schreibt (das ist Phase 1 noch einmal).

5. **Was an der Idee heute schon stimmt, ist festgehalten statt verworfen:**
   Weitergeben kann die App bereits (`data-action="export-weitergabe"`), als
   Datei, ohne Klassenraum und ohne neuen Code. Ein Lehrer kann damit heute
   einen Satz bauen und herumgeben — das ist der Weg, die Idee zu prüfen,
   bevor irgendetwas gebaut wird. Für die Startseite trägt es trotzdem nicht:
   Der Schüler bekommt die Datei vom Lehrer, nicht von der Seite.

**Offen:**

- **Entscheidung 2.1 — die einzige, an der der Umbau noch hängt.** A (Neue
  legen selbst an), B (öffentlicher Einsteiger-Kartensatz), C (Medina Buch 1
  doch öffentlich).
- **Entscheidungen 2.4, 2.5, 2.6** (Marke oder Person · Namensabgleich
  innen/außen · Wortlaut der Kostenfrage) — blockieren nichts, ändern
  Details. 2.6 hält Nr. 4 aus `STRATEGIE.md` 6.1 auf.
- **Der Seitentitel trägt weiterhin kein „Arabisch"** („Adrabic – Vokabeln
  lernen, die hängenbleiben"). Bewusst nicht einzeln geändert: Er gehört zur
  Fassung und soll einmal gewechselt werden, nicht zweimal — Google zeigt
  Titeländerungen träge an.
- **Die Idee Lehrer-/Schülermodus** liegt unter „Später" in `../PLAN.md`. Sie
  ist damit vermerkt, nicht eingeplant. Wenn sie kommen soll, braucht sie
  eine eigene Phase und vorher eine Klärung der Datenschutzfrage.

**Nächster Schritt:** Entscheidung 2.1 einholen (A, B oder C). Liegt sie vor,
wird die passende Fassung aus `STRATEGIE.md` Abschnitt 3 genommen und
`landing.html` nach Abschnitt 5 umgebaut.

### 2026-09-13 — Entscheidung 2.1 = B, Startseite umgebaut, CSP-Fehler gefunden (v3.0.21)

**Geändert:**
- `start-kartensatz.json` — **neu**. 50 Karten, fünf Lektionen zu je zehn
  Wörtern, Format wie `exportWeitergabe()` es erzeugt (`app.js:2362ff`):
  `weitergabe: true`, `gefuehrt: true`, stabile `satzId`
  („arabisch-erste-50-adrabic"), `satzVersion: 1`, jede Karte mit `quelleId`
  und `stufe: 0`.
- `landing.html` — vollständig neu aufgebaut nach `STRATEGIE.md` Abschnitt 5,
  Fassung B aus Abschnitt 3.
- `app.js:19` 3.0.20 → 3.0.21, `sw.js:10` `CACHE_NAME` nachgezogen,
  `CHANGELOG.md` Eintrag 3.0.21.
- `STRATEGIE.md` — 2.1 als entschieden vermerkt, Kopfstatus auf „umgesetzt".

**Entscheidung:**

1. **2.1 = B.** Ein eigens geschriebener Einsteiger-Kartensatz, kein
   Buchinhalt. Damit ist die Entscheidung vom 12.09.2026 (Medina Buch 1 bleibt
   privat) **nicht** berührt und es entsteht keine Urheberrechtsfrage.

2. **Der Satz ist vor der Seite gebaut worden, nicht danach.** Eine Seite, die
   „50 Karten warten auf dich" sagt, während es die Karten nicht gibt, wäre
   genau die Zusage ohne Deckung, die Abschnitt 1.1 der Strategie verbietet.
   Deshalb zuerst die Datei, geprüft gegen den Importpfad
   (`importBackupFile`, `normBereiche`, `normCard`, `normSet`), dann der Text.

3. **Zwei Lektionsnamen mussten gekürzt werden.** `normSet` schneidet Namen bei
   40 Zeichen ab (`app.js:500`). „Lektion 4 — Wörter, die im Quran oft
   vorkommen" (46) wäre beim Empfänger als „…oft vor" angekommen. Jetzt heißen
   sie „Lektion 4 — Wörter aus dem Quran" und „Lektion 5 — Erste Verben". Beim
   Prüfen ebenfalls bestätigt: alle 50 Karten liegen in einer Lektion — Karten
   ohne Lektion blieben beim Empfänger für immer gesperrt (`app.js:2378`).

4. **Der Handlungsaufruf lautet nicht wie in Fassung B hinterlegt.** Dort stand
   „Mit den ersten 50 Karten anfangen". Der Klick führt aber zur Registrierung,
   und die Karten kommen erst danach über Herunterladen und Einspielen. Der
   Knopf heißt deshalb „Konto anlegen und anfangen", mit einer Zeile darunter:
   „Danach lädst du die 50 Startkarten und spielst sie ein. Dauert eine
   Minute." Das ist die Regel aus 1.1 — keine Zusage, die der nächste
   Bildschirm nicht einlöst — angewandt auf die eigene Fassung.

5. **Kein Bildschirmfoto, sondern eine Andeutung.** Block 3 der Struktur
   verlangt eine Aufnahme des Handschrift-Felds; ein Agent kann keine machen.
   Statt eines leeren Platzes steht dort eine nachgebaute Karte (arabisches
   Wort in `--font-arabic`, darunter eine gestrichelte Fläche mit „hier
   schreibst du mit", `aria-hidden`). Sie gibt sich nicht als Bildschirmfoto
   aus. Ein echtes Foto ist trotzdem besser und steht als Aufgabe beim
   Betreiber.

6. **Ein Fehler gefunden, der seit Phase 6 live war: Das Hell/Dunkel-Skript der
   Startseite wurde von der eigenen CSP blockiert.** Beim Nachrechnen des
   Skript-Hashes für den Umbau kam heraus, dass `landing.html` eine Fassung
   **ohne** den Kommentarblock trug, den `index.html`, `impressum.html` und
   `datenschutzerklaerung.html` haben. Die CSP in `firebase.json` erlaubt genau
   einen Hash — deren. Folge: Wer hell eingestellt hatte, sah die Startseite
   trotzdem dunkel und beim Klick in die App einen Farbsprung. Das erklärt
   rückwirkend, warum dort `color-scheme` fest auf `dark` stand: Das war die
   Behandlung des Symptoms. Behoben, indem das Skript wieder Zeichen für
   Zeichen dem aus `index.html` entspricht; `firebase.json` bleibt
   unangetastet. Geprüft: Hash stimmt wieder mit der CSP überein.

7. **Die Kostenfrage bleibt im alten Wortlaut.** „Nein, die Nutzung ist
   komplett kostenlos" steht unverändert in der FAQ, obwohl die ganze Seite
   neu geschrieben wurde und die Änderung ein Wort gekostet hätte. Grund
   unverändert: Sie hängt an Entscheidung 2.6, und die ist nicht getroffen.

8. **Geprüft vor dem Commit:** JSON-LD und sichtbare FAQ stimmen wörtlich
   überein (sechs Fragen), Überschriftenfolge h1 → 8 × h2 ohne Sprung, kein
   `img` ohne `alt`, alle Verweise zeigen auf vorhandene Dateien,
   `start-kartensatz.json` wird von Firebase Hosting ausgeliefert (steht nicht
   in der `ignore`-Liste), kein neues JavaScript, keine Bewegung.

**Offen:**

- **Ein echtes Bildschirmfoto des Handschrift-Felds** ersetzt die nachgebaute
  Karte. Aufgabe des Betreibers, weil nur er die App auf einem Gerät hat.
- **Die 50 Karten sind ungeprüft von einem Agenten geschrieben.** Sie gehen
  erst live, wenn der Betreiber deployt — das ist der Prüfschritt. Vokabeln,
  Übersetzungen und Aussprache gehören durchgelesen, bevor `veroeffentlichen.bat`
  läuft.
- **Entscheidungen 2.4, 2.5, 2.6** weiterhin offen, blockieren nichts.
- **`start-kartensatz.json` steht nicht in `APP_SHELL`.** Bewusst: Die Datei
  wird zum Starten der App nicht gebraucht. Folge, die jemand kennen sollte:
  Wer die Startseite offline aufruft, kann den Satz nicht herunterladen.
- **Der Lehrer-/Schülermodus** bleibt unter „Später" in `../PLAN.md`. B
  überbrückt die Zeit bis dahin, schließt ihn aber nicht aus.

**Nächster Schritt:** Betreiber liest die 50 Karten gegen, macht ein
Bildschirmfoto des Handschrift-Felds und deployt. Danach ist der Nebenstrang
Landing-Page-Strategie abgeschlossen; offen bleiben nur 2.4–2.6.

### 2026-09-13 — Erfundener Kartensatz zurückgenommen, Fehler beim Namen genannt (v3.0.22)

**Geändert:**
- `start-kartensatz.json` — **gelöscht.** War in v3.0.21 hinzugekommen.
- `landing.html`, Block „Was passiert, wenn du anfängst" — Download-Knopf
  und Bezugnahme auf 50 Karten entfernt, Text auf Fassung A zurückgestellt:
  „Dein Stoff, nicht unserer" — eigene erste Karte anlegen, optional als
  Lektion 1 markieren.
- `landing.html`, FAQ-Frage „Ich habe noch keine Karten" — Antwort umformuliert,
  kein Verweis mehr auf eine Datei, die es nicht mehr gibt. JSON-LD danach
  automatisiert aus der sichtbaren FAQ neu erzeugt (garantiert Übereinstimmung).
- `app.js:19` 3.0.21 → 3.0.22, `sw.js:10` `CACHE_NAME` nachgezogen,
  `CHANGELOG.md` Eintrag 3.0.22.
- `STRATEGIE.md` — 2.1 in „Grundsatz" (B) und „Inhalt" (offen) aufgeteilt,
  Abschnitt 8 korrigiert.

**Entscheidung:**

1. **Der Betreiber hat den Kartensatz zurückgewiesen, und das war richtig,
   nicht nur sein gutes Recht.** Wörtlich: „die 50 karten sin bullshit. würde
   wenn schon selbst entscheiden was man haben kann, das ging mir bisl zu
   schnell." Das ist kein Geschmacksurteil, das man aussitzen könnte —
   **welcher Wortschatz unter seinem Namen auf einer öffentlichen, bei Google
   eingereichten Seite steht, ist seine Entscheidung.** Der Fehler der
   letzten Session war nicht die Wahl von B als Prinzip, sondern dass sie
   B mit **erfundenem** Inhalt gefüllt hat, ohne dass der Betreiber ihn vor
   der Veröffentlichung gesehen hatte — und ein Teil davon war Vokabular mit
   Quran-Bezug, wo Genauigkeit erst recht nicht verhandelbar ist. Der letzte
   Bericht hatte zwar „Betreiber liest die 50 Karten gegen" als Aufgabe
   benannt, aber die Karten standen zu diesem Zeitpunkt schon im
   Git-Repository und in der veröffentlichbaren Fassung — der richtige
   Zeitpunkt für die Freigabe ist **vor** dem Schreiben, nicht danach.

2. **Zurückgebaut auf Fassung A, nicht auf einen Zwischenzustand.** Die
   Struktur aus Abschnitt 5 der Strategie (Handschrift-Feld, Stufenleiter,
   drei Bewertungen, Lektionen, „was nicht ist", Rest-Liste, FAQ) bleibt
   unverändert — das waren Beschreibungen dessen, was die App **tut**, keine
   erfundenen Inhalte. Nur der eine Block, der auf den erfundenen Kartensatz
   verwies, ist ausgetauscht.

3. **B bleibt als Grundsatz bestehen, mit einer Einschränkung, die vorher
   fehlte:** Ein Einsteiger-Kartensatz ist weiterhin die richtige Idee gegen
   den leeren Anfang — aber der Inhalt kommt vom Betreiber, nicht vom
   Agenten. Diese Regel steht jetzt ausdrücklich in `STRATEGIE.md` 2.1, damit
   sie nicht in einer nächsten Session wieder unterlaufen wird.

4. **Der zweite Punkt der Nachricht — die App startet nicht** (Screenshot,
   „Failed to fetch dynamically imported module … firebase-app.js") — wurde
   geprüft und ist **keine Folge dieser Änderungen.** `index.html`, `app.js`
   (abgesehen von `APP_VERSION`) und die CSP in `firebase.json` sind seit
   v3.0.19 unverändert; `firebase-app.js` wird zur Laufzeit per dynamischem
   Import von `gstatic.com` geladen, das schlägt bei einem Netzwerkproblem
   auf dem Gerät des Betreibers fehl. Keine Code-Änderung vorgenommen, weil
   keine gefunden wurde, die dafür ursächlich wäre.

**Offen:**

- **Der Inhalt eines Einsteiger-Kartensatzes**, falls gewünscht — vom
  Betreiber selbst zu schreiben oder mindestens wortweise freizugeben, bevor
  er ins Repo kommt.
- **Entscheidungen 2.4, 2.5, 2.6** unverändert offen, blockieren nichts.
- **Der Start-Fehler beim Betreiber** — vermutlich ein lokales
  Netzwerkproblem (CDN nicht erreichbar), nicht im Repo zu beheben; siehe
  Chat-Antwort für Prüfschritte.

**Nächster Schritt:** Nichts Offenes von Agenten-Seite in diesem Strang außer
2.4–2.6. Ein Startkartensatz entsteht erst wieder, wenn der Betreiber Inhalt
liefert oder ausdrücklich freigibt.

### 2026-09-15 — Medina-Rechtefrage geklärt, 2.1 bleibt trotzdem offen

**Geändert:** Nur dieses Logbuch. Kein Produktivcode, kein `landing.html`.

**Entscheidung:**

1. **Die Urheberrechtsfrage zu Fassung C ist geklärt.** Der Betreiber: Der
   Autor von Medina Buch 1 hat die Nutzung für Online-Zwecke ausdrücklich
   freigegeben, das Werk wird bereits auf YouTube dafür genutzt, vollständige
   PDFs sind öffentlich verfügbar. Der Rechtegrund, der Fassung C in
   `STRATEGIE.md` 2.1 bislang blockierte („die Urheberrechtsfrage am
   Buchinhalt muss vorher geklärt sein"), besteht damit nicht mehr.

2. **Trotzdem keine Fassung gewählt — der eigene Kartensatz ist nicht fertig.**
   Der Betreiber baut selbst an einem Kartensatz zu Medina Buch 1, der aber an
   eine eigene YouTube-Playlist gebunden werden soll und möglicherweise Teil
   eines künftigen Bezahlmodells wird („Premium" für alleine Lernende). Diese
   Struktur ist nicht zu Ende gedacht — er selbst: „ich weiß jetzt nicht, ob
   wirklich eine dieser Fassungen mäßig 100 %." Ein Kartensatz ins Repo zu
   nehmen, dessen Zugriffslogik der Betreiber selbst noch offen hat, wäre
   dieselbe Reihenfolge-Umkehrung wie am 13.09.2026 (v3.0.21) — nur diesmal
   nicht erfunden, sondern verfrüht.

3. **Im Gespräch kam eine Lehrer-/Schüler-/Bezahl-Idee erneut auf** — diesmal
   konkreter: ein Lehrer weist per E-Mail nach, dass er Schüler hat, bekommt
   dafür das Programm angeboten; ein eigener Kartensatz (an die Playlist
   gebunden) würde für Alleinlernende ggf. kostenpflichtig. Das ist dieselbe
   Idee, die bereits am 13.09.2026 unter „Später" in `../PLAN.md` geparkt
   wurde, jetzt nur weiter ausgesponnen. Nichts davon ist hier geändert oder
   neu aufgenommen worden — sie bleibt dort geparkt, aus denselben vier
   Gründen (Lernwerkzeug, Daten Minderjähriger, neue Firestore-Regeln, keine
   Antwort auf die heutige Frage „womit fängt ein Neuer an").

4. **Fassung A bleibt damit der einzig stimmige Stand — nicht als Notlösung,
   sondern weil sie heute die einzige ist, die zutrifft.** B scheitert daran,
   dass kein Wortmaterial geliefert wurde; C daran, dass der vorgesehene
   Kartensatz strukturell nicht fertig ist. `landing.html` bleibt unverändert.

**Offen:**

- **2.1 — Inhalt** bleibt offen, jetzt mit einer vierten faktischen Option
  (C ist rechtlich nicht mehr blockiert, aber inhaltlich nicht einsatzbereit).
  Wird erst wieder relevant, wenn der Betreiber seinen eigenen
  Medina-Kartensatz fertig hat **und** entschieden hat, wie er ihn anbietet
  (frei, gebunden an die Playlist, Premium — das entscheidet auch, ob er
  überhaupt öffentlich auf der Landing Page landet oder nur hinter der
  Playlist).
- **Lehrer-/Schüler-/Bezahlmodus** bleibt unter „Später" in `../PLAN.md`,
  jetzt mit der E-Mail-Nachweis-Idee als zusätzlicher Notiz dort nachzuziehen,
  falls die Idee weiterverfolgt wird — nicht Teil dieses Strangs.
- **2.4, 2.5, 2.6** weiterhin offen, blockieren nichts.

**Nächster Schritt:** Kein Schritt von Agenten-Seite an diesem Strang, bis der
Betreiber entweder (a) Wortmaterial für einen eigenen, einfachen
Einsteigersatz liefert (→ B) oder (b) seinen Medina-Kartensatz fertig hat und
sagt, ob/wie er auf der Landing Page erscheinen soll (→ C). Weiter mit Strang
B (Phase 8, Rückmeldeweg).
