# Neuaufbau des Einstiegs nach Video 3 (v3.10.0)

Angelegt: 23. September 2026. Ersetzt für den gebauten Ablauf
[`WORTLAUT.md`](WORTLAUT.md) (Stand v3.9.9–3.9.12). Die früheren Dateien bleiben
als Herleitung stehen.

**Quelle:** <https://youtu.be/efGUJtPzSZA>, Rok Bozic, „Build a $100m iOS
Mobile App Onboarding Flow – Duolingo & Cal AI Screens", 1:07:32,
veröffentlicht am 20.03.2026. Ausgewertet wurde das vollständige Transkript
(Untertitel der Plattform). Dazu kamen 300 Bilder über das ganze Video und
rund 190 Bilder in 1024 px für sechs Abschnitte: Duolingo, Cal AI, Ladder,
Zusammenfassung, das fertige Tan-AI-Ergebnis und die Figma-Auswertung.

**Anlass, wörtlich:** „onboarding ist schlechter als erwartet. wirklich. frag
mich jetzt nicht wieso weshalb warum. du hast die videos anscheinend nicht
verstanden." Danach kamen dieses Video und der Prompt des Videomachers. Der
Betreiber gab sie mit dem Hinweis „ja nicht blind übernehmen aber sehr
hilfreich" und „das übernehmen wo es geht".

---

## 1. Was das Video lehrt, knapp

**Der Rahmen.** Jeder Bildschirm erfüllt eine oder mehrere von sechs Aufgaben:
Marke, Einordnung, Vertrauen, Aktivierung, Monetarisierung und Bindung. Eine
Frage nach dem Ziel fragt selten nur nach dem Ziel. Sie erhöht die
Verbindlichkeit, macht das Ergebnis persönlich und liefert Sätze für später.
Außerdem rechtfertigt sie das, was am Ende kommt (Tafel bei 36:24).

**Die drei Vorbilder** (Tafel „Analysis & learnings", am Bild abgelesen):

| | Duolingo | Cal AI | Ladder |
|---|---|---|---|
| Vertrauen durch | Maskottchen, Verspieltheit | Präzision, Klarheit, Grafiken | Trainer, Autorität, edle Optik |
| Persönlich wird | Motivation und Einstiegsniveau | Körperwerte und Ziel | Trainings-Identität, passendes Programm |
| Bindung durch | Serie, Widget, Kontakte, Erinnerungen | Erinnerungen, Apple Health, Mitteilungen | Mitteilungen, Team, Checkliste, Serie, Widget |
| Bezahlung kommt | nach dem ersten echten Wert | nach dem gezeigten Plan | nach Vertrauen und Passung |

**Die Bildsprache ist bei allen dreien gleich.** Sie steht nicht im Ton,
sondern im Bild:
- oben ein Zurück-Pfeil und ein dünner Balken
- eine große Überschrift über zwei bis drei Zeilen
- eine kurze graue Unterzeile
- Antwortzeilen über die ganze Breite, mit Zeichen und Haken
- genau ein gefüllter Knopf unten, darunter ein Textknopf zum Aussteigen

**Die stärksten Einzelstellen:**
- **Tan AI**, das Ergebnis des Videos: „What's holding you back?". Die
  Antwort der App steht direkt unter der gewählten Zeile („Busy schedule →
  We will optimize short sessions …"). Der Videomacher nannte das den besten
  Einfall des Ablaufs.
- **Cal AI:** „Congratulations, your custom plan is ready. You should gain
  6.3 kg by April 14". Ein konkretes Ergebnis mit Datum, vor Anmeldung und
  Kasse.
- **Duolingo:** „That's 25 words in your first week". Aus einem vagen Ziel
  wird ein Tagesplan.
- **Ladder:** Die Einordnung kommt vor der Erklärung. Dort heißt es: „Die
  meisten Fitness-Apps sind Wiedergabelisten zufälliger Workouts."
- **Überall:** Die Frage nach Mitteilungen kommt erst, wenn schon Wert da war.

**Die Kritik des Videomachers am eigenen Ergebnis** (53:21–59:00):
- Der Bildschirm zum Hauttyp ist „langweilig, kein Wow-Moment".
- Der Plan ist „optisch schwach".
- Die Struktur stimmt, aber die Optik entscheidet.

## 2. Was am Einstieg v3.9.9–3.9.12 falsch war

Das ist der Befund zur Rückmeldung „schlechter als erwartet". Er ist am
Bildschirm gemessen, nicht vermutet.

1. **Er war ein Einstellungs-Assistent.** Vier von sieben Bildschirmen
   fragten Einstellungen ab: Schrift, Hell/Dunkel, Rundengröße, Anker. Nur
   einer zeigte die App in Aktion. Einen Plan am Ende gab es nicht, auch keine
   Antwort der App auf eine Antwort und keinen Grund, das Konto anzulegen.
2. **Das Wort auf der Probekarte war fast unsichtbar.** Die Karte ist ein
   `<button>` und erbte deshalb `--text-on-accent` (Fast-Schwarz). Das Wort
   stand dunkel auf der dunklen Fläche. Beim Nachtest im Browser entdeckt,
   behoben in `styles.css` 16b.
3. **Die Hell/Dunkel-Wahl ging verloren.** Beim Laden der Seite ruft
   `app.js` `themaAnwenden()` mit den Grundeinstellungen auf. Damit wird
   `adrabic-thema` ohne Konto wieder auf „dunkel" gesetzt, und
   `einstiegAnwenden()` übernimmt das Thema nicht ins Konto. Die Antwort hielt
   also nur bis zum nächsten Laden. Behoben ist es durch Weglassen der Frage;
   Abschnitt 7 nennt den Grund.
4. **„Ich habe schon ein Konto" fehlte.** Wer auf einem neuen Gerät sein
   Konto öffnen wollte, musste den Einstieg überspringen. Dann landete er im
   Formular zum Registrieren.
5. **Jedes Neuzeichnen ließ den ganzen Bildschirm neu einfliegen**, etwa bei
   jedem Tipp auf einen Anker. Außerdem ging dabei der Tastaturfokus verloren.
6. **Die Regeln, gegen die geprüft wurde (P1–P7), hat der Agent selbst
   geschrieben**, und sie filterten die Videos fast auf null. Ein Beispiel: Die
   Regel „kein Zähler, kein Fortschrittsdruck" (`AUFTRAG.md` §5) berief sich
   auf „nicht invasiv" vom 18.09. Dieser Satz galt aber dem Teilen-System
   (`PLAN.md`, Statusverlauf 18.09.), nicht dem Einstieg.

**Was von den Regeln bleibt:**
- **P4:** keine erfundene Wirkung
- **P5:** Lernlogik unberührt
- **P6:** Datensparsamkeit
- **P7:** Bestandskonto unberührt

Das sind die harten Grenzen, Abschnitt 8. P1 („jede Frage muss eine
Einstellung setzen") ist gelockert. Eine Frage darf den Ablauf persönlich
machen, wenn ihre Antwort sichtbar wieder auftaucht: als Echo, als
Vorauswahl oder im Plan.

## 3. Phase 1 — App und Kategorie

- **Was die App ist:** Karteikarten für arabische Wörter mit wachsenden
  Abständen. Die Karten legt man selbst an, und zwar aus dem, was man gerade
  lernt. Adrabic ist **kein Kurs**, sondern das System für diese Wörter.
- **Ziel des Einstiegs:** eine Mischung aus Glauben an das System (Ladder:
  „geführtes System statt Inhaltsbibliothek") und Gewohnheit (Duolingo: ein
  fester Punkt am Tag).
- **Geldlogik:** keine, siehe `KONZEPT.md` §1. **Die Anmeldung ersetzt die
  Kasse.** Ob der Ablauf funktioniert, zeigt sich also nicht an der Anmeldung
  allein, sondern an drei Schritten: angelegtes Konto, erste eigene Karte und
  Wiederkehr am nächsten Tag.
- **Erster Wert:** Man sieht, dass die App für einen rechnet. Zuerst mit der
  Probekarte (nach „Sicher" kommt sie morgen wieder), dann im Plan: echte
  Kalendertage, an denen ein Wort von heute wiederkommt. Das ist dieselbe
  Präzision wie bei Cal AI, aber gerechnet und nicht versprochen.
- **Größte Absprung-Risiken:**
  1. Eine leere App nach der Anmeldung. Dagegen steht das Echo auf
     Bildschirm 2: „kein fertiger Kurs – deine Wörter".
  2. Die Bestätigung per E-Mail, die im Spam landet. Das ist schon behandelt,
     `renderPendingVerification()`.
  3. Ein Ablauf, der sich wie ein Formular anfühlt. Dagegen stehen Echos,
     Karte und Plan.
  4. Bestandsnutzer, die im Einstieg festhängen. Dagegen steht „Ich habe
     schon ein Konto".

## 4. Phase 3 — Der Ablauf

Acht Bildschirme, danach das Konto. „Überspringen" steht auf jedem
Fragebildschirm; auf Bildschirm 1 steht stattdessen „Ich habe schon ein
Konto". Über allen Bildschirmen ab Nummer 2 stehen Zurück und ein dünner
Balken, ohne Zahl.

**Bildschirm 1 · Willkommen**
- **Aufgabe:** Marke, Glaube
- **Inhalt:** H „Du hast es gelernt. Und es ist weg." (Betreiber-Wortlaut) ·
  eine Karte dreht sich um (كِتَابٌ → Buch) · darunter wächst die Leiste der
  Abstände 1 · 2 · 3 · 6 · 10 · 19 Tage
- **Knöpfe:** „Meinen Plan erstellen" · „Ich habe schon ein Konto"
- **Nutzer denkt:** „So funktioniert das."
- **App tut:** zeigt die App in Aktion, bevor sie fragt (Cal AI: Demo zuerst)
- **Daten:** keine

**Bildschirm 2 · Ziel**
- **Aufgabe:** Einordnung, kleines Ja
- **Inhalt:** H „Wofür lernst du Arabisch?" · Mehrfachwahl:
  - Den Quran verstehen
  - Für meinen Kurs oder mein Buch
  - Hocharabisch lesen und sprechen
  - Etwas anderes
- **Echo:** „Adrabic ist kein fertiger Kurs. Du legst die Wörter an, die du
  gerade lernst – aus X. Adrabic sorgt dafür, dass sie wiederkommen."
- **Nutzer denkt:** „Das passt zu mir."
- **App tut:** ordnet die App ein (Ladder) und nimmt damit den Bruch mit der
  leeren App vorweg
- **Daten:** bleiben nur im Arbeitsspeicher

**Bildschirm 3 · Hürden**
- **Aufgabe:** Einwände, Vertrauen
- **Inhalt:** H „Was hat dich bisher gebremst?" · Mehrfachwahl, jede Antwort
  bekommt ihr Echo direkt darunter (Wortlaut in `EINSTIEG_HUERDEN`)
- **Nutzer denkt:** „Die verstehen mein Problem."
- **App tut:** sammelt Einwände ein, bevor abgebrochen wird. „Schrift" und
  „Zeit" stellen die Bildschirme 5 und 6 vor
- **Daten:** bleiben nur im Arbeitsspeicher

**Bildschirm 4 · Karte**
- **Aufgabe:** Aktivierung, erster Wert
- **Inhalt:** H „Probier eine Karte." · umdrehen, dann bewerten
  (Nicht/Fast/Sicher) · danach genau das, was die Lernlogik mit einer neuen
  Karte tut
- **Nutzer denkt:** „Die App rechnet mit."
- **App tut:** die Hauptfunktion vor dem Konto; dritte unabhängige Quelle
- **Daten:** nichts wird gespeichert

**Bildschirm 5 · Schrift**
- **Aufgabe:** persönliche Anpassung
- **Inhalt:** H „Kannst du das gut lesen?" · Klein/Normal/Groß, wirkt sofort
  an der Karte · Vorauswahl „Groß" mit Begründung, wenn „Schrift" gewählt
  wurde
- **Nutzer denkt:** „Die App passt sich an."
- **App tut:** Einlösung im selben Bildschirm
- **Daten:** `arabGroesse`

**Bildschirm 6 · Runde**
- **Aufgabe:** kleine Verpflichtung, Bindung
- **Inhalt:** H „Wie groß soll deine tägliche Runde sein?" · 10 kurz, 20
  normal, 30 gründlich, alle fälligen ohne Grenze · Vorauswahl 10, wenn
  „Zeit" gewählt wurde · darunter: „Jeder Tag mit einer Runde zählt für deine
  Serie. Ein ausgelassener Tag reißt sie nicht."
- **Nutzer denkt:** „Das schaffe ich."
- **App tut:** macht aus einem vagen Vorsatz einen Tagesplan (Duolingo). Die
  Serie gibt es wirklich (`serieAktuell`), und ihre Kulanzregel beantwortet
  die Angst vor dem ersten verpassten Tag
- **Daten:** `sitzungsLimit`

**Bildschirm 7 · Anker**
- **Aufgabe:** Bindung, Rückkehr vorbereiten
- **Inhalt:** H „Wann machst du deine Runde?" · der Satz steht über der Wahl ·
  fünf Gebetszeiten mit Tageszeit-Zeichen plus freies Feld
- **Nutzer denkt:** „Ich weiß, wann."
- **App tut:** bereitet die Rückkehr vor, bevor die erste Runde endet
  (Lehre 7). Mitteilungen gibt es in dieser App nicht, das hier ist der
  Ersatz mit Beleg
- **Daten:** Satz in `adrabic-einstieg-nachklang` (bestand schon)

**Bildschirm 8 · Plan**
- **Aufgabe:** erster Wertmoment, Glaube, rechtfertigt das Konto
- **Inhalt:** H „Dein Plan steht." · Satz · vier Kacheln (Runde, Zeitpunkt,
  Schrift, Ziel) · Leiter „So kommt ein Wort zurück, das du heute anlegst"
  mit echten Tagen · „Plan speichern" · „Kostenlos. Keine Werbung, kein
  Tracking."
- **Nutzer denkt:** „Das ist mein Plan."
- **App tut:** zeigt ein Ergebnis statt Fragen (Tan AI). Präzision ohne
  erfundene Zahl
- **Daten:** keine neuen

**Konto · renderAuth**
- **Aufgabe:** die Stelle, an der sonst die Kasse steht
- **Inhalt:** Titel „Plan speichern" · „Kostenlos. Einmal anlegen – dann ist
  dein Plan gespeichert." · der gewählte Satz · das bestehende Formular
- **Nutzer denkt:** „Damit der Plan bleibt."
- **App tut:** Konto wie „Save your progress" bei Cal AI
- **Daten:** Konto (bestand)

**Die Tage auf Bildschirm 8 sind gerechnet, nicht geschätzt.** Grundlage ist
`intervalForStufe()` (1, 2, 3, 6, 10, 19 … Tage). Bei 1, 2 und 3 Tagen rundet
die 15-Prozent-Streuung aus `nextReviewForStufe()` immer auf null. Diese Tage
stehen deshalb als genaues Datum da, alle späteren mit „um den". Die letzte
Sprosse heißt „spätestens alle sechs Monate", das ist `MAX_INTERVAL_DAYS` =
180.

**Tonfall:** sachlich, „du", kein Ausrufezeichen. Wirkung wird nicht
versprochen; die App sagt, was sie tut.

**Balken:** Er steht auf den Bildschirmen 2 bis 8 und wächst ehrlich von
seinem letzten Stand aus, ohne künstlichen Vorsprung und ohne Zahl.

**Abhängigkeiten zwischen den Bildschirmen:**
- Hürde „Schrift" → Bildschirm 5 steht auf Groß, mit Begründung.
- Hürde „Zeit" → Bildschirm 6 steht auf 10, mit Begründung.
- Hürde „dran" → Bildschirm 7 sagt, wofür er da ist.
- Hürde „vergessen" → Bildschirm 4 kündigt die Karte als Mittel dagegen an.
- Das Ziel erscheint im Echo und in der Kachel.

Eine Vorauswahl wird gespeichert, sobald man sie mit „Weiter" bestätigt
(`einstiegSchrittSichern`).

**Überspringen:**
- „Überspringen" räumt alles weg und führt ins Registrieren, ohne Nachklang.
- „Ich habe schon ein Konto" räumt ebenfalls alles weg und führt ins
  Anmelden.
- Beides setzt den Merker; der Einstieg kommt nicht wieder.

**Abbruch mitten im Ablauf:** Ziel und Hürden sind weg, weil sie nur im
Arbeitsspeicher stehen. Schrift und Runde bleiben im Zwischenspeicher. Der
Einstieg beginnt beim nächsten Öffnen wieder bei Bildschirm 1.

## 5. Phase 4 — Das Konto statt der Kasse

- **Wo:** nach dem Plan, nie vorher. So machen es Cal AI (Plan vor Anmeldung
  und Kasse) und Duolingo (Wert vor Profil).
- **Warum dort:** Erst mit dem Plan gibt es etwas, das man speichern will.
  Das Konto ist dann keine Hürde, sondern ein Abschluss.
- **Welcher Glaube vorher stehen muss:** Die App rechnet für mich, sie passt
  zu dem, was ich lerne, und ich weiß, wann ich wiederkomme.
- **Vertrauen:**
  - „Kostenlos. Keine Werbung, kein Tracking." Deckungsgleich mit
    `datenschutzerklaerung.html`: „Keine Werbung, kein Tracking, keine
    Analyse-Dienste …".
  - Die Datenschutzerklärung und das Impressum bleiben am Formular verlinkt.
- **Nicht tun:**
  - kein Rabatt-Rad, keine Frist, kein „Einmalangebot"
  - keine Bewertungsbitte
  - keine erfundene Nutzerzahl („90 % sehen …")
  - kein „2x schneller als ohne"
  - kein „für immer kostenlos"; das ist nicht zugesagt, `KONZEPT.md` §2

## 6. Phase 5 — Die ersten drei Minuten danach

Was geschieht, ist schon gebaut:
1. E-Mail bestätigen („Danach geht es gleich weiter zu deiner ersten Karte").
2. Leerer Lernen-Bildschirm mit dem Nachklang „Dein Plan steht. Jetzt deine
   erste eigene Karte." und dem gewählten Satz.
3. „Erste Karte anlegen". Eine neue Karte ist sofort fällig
   (`nextReview = heute`), die erste Runde geht also gleich.
4. Am nächsten Tag zur gewählten Zeit kommt sie wieder. Das ist genau die
   zweite Sprosse der Leiter.

**Vorschlag, nicht gebaut:** eine kleine Start-Liste wie bei Ladder („Get
Started Challenge"): erste Karte · erste Runde · morgen wiederkommen. Sie
müsste auf dem gefüllten Lernen-Bildschirm stehen und berührt damit das
Lernwerkzeug; das braucht eine Freigabe. Die Rückkehr am zweiten Tag sagt
voraus, ob jemand bleibt; die Start-Liste wäre der Hebel dafür.

## 7. Bewusst nicht übernommen

| Aus dem Video | Warum nicht |
|---|---|
| Kasse, Probezeitraum, Rabatt-Rad, Jahres-Anker | kein Geldfluss (`KONZEPT.md` §1) |
| Bitte um Mitteilungen oder Widget | gibt es in der App nicht. Der Anker ist der Ersatz. „Zum Home-Bildschirm" wäre das Widget-Gegenstück, ist aber ein eigener Punkt, weil iOS den Speicher trennt |
| ATT, Bitte um Bewertung, Empfehlungscode | kein App Store; auch im Video als „nicht kopieren" markiert |
| „90 % sehen eine Veränderung", „2x mehr als allein", Prognose in 30 Tagen | erfundene Zahlen. Der Vater haftet im Impressum |
| Serien-Ziel „7/14/30/50 Tage" | dahinter steht keine Funktion; ein folgenloses Bekenntnis (`PSYCHOLOGIE.md` §4) |
| Maskottchen, verspielter Ton | passt nicht zur ruhigen Gestalt |
| Trainer-Videos (Ladder) | es gibt keinen Trainer. Ein kurzes Wort des Betreibers wäre das Gegenstück; das entscheidet er |
| Reisedatum als Frist (Tan AI) | kein Gegenstück; eine Prüfung als Frist wäre denkbar, bleibt aber offen |
| Frage Hell/Dunkel | verdient ihren Platz nicht und ging ohnehin verloren (Abschnitt 2, Punkt 3); bleibt in den Einstellungen |
| Kontakte abgleichen | Daten Dritter; nicht invasiv (18.09.) |

## 8. Grenzen, die bleiben

- Keine Zahl ohne Grundlage. Jede Angabe über Abstände kommt aus
  `intervalForStufe()`, und die Serien-Regel kommt aus `serieAktuell()`.
- Die Lernlogik ist unberührt. Die Probekarte speichert nichts.
- **Keine neuen Speicherorte.**
  - Ziel und Hürden stehen nur im Arbeitsspeicher und nirgends dauerhaft.
    „Den Quran verstehen" ist eine Angabe mit religiösem Bezug.
  - Die drei `localStorage`-Schlüssel sind dieselben wie bei der laufenden
    Rechtsprüfung (J1). `adrabic-einstieg-antworten` enthält weiter nur
    `arabGroesse` und `sitzungsLimit`.
- Religiöser Wortlaut: Die Gebetszeiten sind freigegeben (`WORTLAUT.md` §0).
  **Neu und vom Betreiber zu prüfen** sind die Ziel-Zeile „Den Quran
  verstehen" und das Echo „… aus dem Quran". Beides ist Wortlaut mit
  religiösem Bezug, den der Agent geschrieben hat. Er ist keine Aussage über
  den Wert des Lernens und kein Zitat. Ändern lässt er sich in einer Zeile
  (`EINSTIEG_ZIELE`).

## 9. Offen

1. **Gerätetest** durch den Betreiber. Zu prüfen sind die umdrehende Karte
   auf Bildschirm 1, der weiche Größenwechsel und der Plan auf einem kleinen
   Handy.
2. **J1 Rechtsprüfung.** Der Umfang ist unverändert, siehe Abschnitt 8.
3. **Wortlaut der Ziel-Zeile „Den Quran verstehen"**, siehe Abschnitt 8.
4. **Das Wort auf der Probekarte** bleibt der Platzhalter كِتَابٌ.
5. **Vorschlag Start-Liste** nach der Anmeldung, siehe Abschnitt 6. Das
   braucht eine Freigabe, weil es das Lernwerkzeug berührt.
6. **Beobachtung, nicht behoben:** `themaAnwenden()` setzt beim Laden von
   `app.js` `data-thema` und `adrabic-thema` auf „dunkel", bevor Cloud-Daten da
   sind (Abschnitt 2, Punkt 3). Für den Einstieg gilt das nicht mehr, weil er
   nicht mehr nach dem Thema fragt. **Es betrifft aber angemeldete Nutzer:innen
   mit hellem Thema:** kurzer Sprung auf dunkel bei jedem Start, ohne Netz
   dauerhaft. Gemessen in v3.10.1, Einzelheiten im Logbuch. Der Betreiber
   entscheidet, ob es behoben wird.
