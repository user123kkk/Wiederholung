# Wiederholen neu gedacht – für Texte und Karten

**Status:** Entwurf, fertig zur Umsetzung nach dem laufenden Codex-Zyklus.
**Kein Bauauftrag vor Stufe 0** in `KONZEPT.md` § 11. Ändert die Lernlogik
– auf ausdrücklichen Wunsch des Betreibers (29.09.2026) und zuerst nur im
Probelauf in seinem Konto (§ 8).

Der Betreiber hat die Einzelentscheidungen dem Agenten überlassen („ich
vertrau dir, bessere alles aus, prüfe nach Lücken“). Er selbst prüft im
Probelauf.

## Grundsatz des Betreibers

> „Nicht basierend auf irgendeiner Studie … Ein Mehrwert, der Wert liefert
> und funktioniert.“ – „Soll einfach perfekt sein, was angehängte Sachen
> angeht wie Serie. Die Methode soll funktionieren, sicher.“

Drei Regeln:

1. **Bewährt in der Praxis** zählt: So wird der Quran seit Jahrhunderten
   auswendig gelernt – täglich Neues, täglich das Frische, im Kreis alles
   Alte.
2. **Die App prüft sich selbst:** Sie misst an den echten Antworten, ob
   Altes sitzt, und stellt sich nach.
3. **Erst beim Betreiber, dann für alle** (Probelauf § 8).

## In einfachen Worten

- Jede Zeile eines Textes ist entweder **neu**, **frisch** oder **fest**.
- **Frisch** = gerade gelernt oder gehakt. Kommt **jeden Tag**, bis sie
  7 Tage hintereinander sicher war. Dann ist sie fest.
- **Fest** = sitzt. Alle festen Zeilen kommen **im Kreis** dran: jeden Tag
  das nächste Stück, der Reihe nach, bis der ganze Text durch ist, dann von
  vorn. So wird nichts vergessen, auch wenn man woanders weiterlernt.
- **Hakt eine feste Zeile**, wird sie wieder frisch. Sie kommt dann täglich,
  aber **immer zusammen mit der Zeile davor und danach**. Die Reihenfolge
  bleibt also erhalten; man sagt nie eine Aya losgelöst auf.
- **Die App zählt mit**, wie viele feste Zeilen wirklich sitzen. Hakt es
  oft, kommt der Kreis schneller wieder vorbei. Sitzt fast alles, langsamer.
- **Tage verpasst?** Kein Berg an Rückstand. Der Kreis wartet einfach und
  macht dort weiter, wo du warst.
- **Zu viel für heute?** Dann schlägt die App vor, heute nichts Neues zu
  lernen, sondern das Alte zu halten.

---

## 1. Zustände einer Textzeile

| Zustand | Bedeutung | Gespeichert als (Karten-Dokument, `KONZEPT.md` § 6) |
|---|---|---|
| neu | nie gelernt | `ersteBewertung = null` |
| frisch (k) | gelernt oder gehakt; k = Tage hintereinander sicher, 0–6 | `stufe = k` (0–6), `nextReview` = heute bzw. morgen |
| fest | 7 Tage hintereinander sicher | `stufe = 7`, `nextReview = 2099-12-31` (Kreis entscheidet; schützt vor alten App-Versionen, `KONZEPT.md` § 7.5) |

`maxStufe` hält wie heute den Höchststand. In der Oberfläche nur drei
Wörter: **neu · frisch · fest** (keine Zahlen, Betreiber 24.09.2026).

## 2. Übergänge

| Von | Ereignis | Nach |
|---|---|---|
| neu | beim Neu-Lernen fließend aufgesagt (`KONZEPT.md` § 5.3) | frisch (0), `nextReview` = morgen |
| neu | beim Anlegen als „kann ich schon“ markiert | frisch (0), `nextReview` = heute |
| frisch (k) | heute sicher | frisch (k+1), morgen wieder; bei k+1 = 7 → fest |
| frisch (k) | heute gehakt | frisch (0), morgen wieder |
| fest | im Kreis sicher | bleibt fest |
| fest | im Kreis gehakt | frisch (0), morgen wieder |
| frisch/fest | Tag verpasst | nichts ändert sich; frische Zeilen bleiben fällig |

Eine frische Zeile wird höchstens einmal pro Tag gezählt (mehrfach üben
ist erlaubt, zählt aber nicht doppelt).

## 3. Der Kreis (feste Zeilen)

Gespeichert je Text in seinem Set (`sets.<id>` im Bereichsdokument,
`KONZEPT.md` § 6.2):

| Feld | Inhalt | Start |
|---|---|---|
| `kreisTage` | in wie vielen Tagen der Kreis einmal durch alle festen Zeilen geht | 7 |
| `kreisPos` | Id der nächsten festen Zeile im Kreis | erste feste Zeile |
| `kreisTag` | Datum, an dem das heutige Stück zuletzt erledigt wurde | – |
| `festErgebnisse` | letzte 50 Kreis-Antworten als Zeichenkette aus `1`/`0` | leer |

- **Heutiges Stück:** ab `kreisPos` die nächsten
  `ceil(anzahlFest / kreisTage)` festen Zeilen in Textreihenfolge,
  aufgerundet auf ganze Abschnitte (§ 4), am Textende weiter am Anfang.
- **Erledigt** ist ein Abschnitt, sobald er bewertet ist: `kreisPos` rückt
  weiter. Aufhören ist jederzeit möglich; der Rest kommt morgen zuerst.
- **Verpasste Tage:** `kreisPos` bleibt stehen. Kein Rückstand wird
  aufgehäuft.
- **Nachstellen**, jedes Mal wenn `kreisPos` über das Textende läuft:
  Anteil `1` in `festErgebnisse` (mindestens 20 Antworten nötig)
  - unter 85 % → `kreisTage` × 0,75 (abgerundet, mindestens 3);
  - über 95 % → `kreisTage` × 1,25 (aufgerundet, höchstens 30);
  - sonst gleich.
- **Rückgängig** nach einem Kreis-Abschnitt stellt die Zeilen **und**
  `kreisPos`, `kreisTag`, `festErgebnisse` zurück (alles in einem
  `lastAction`).
- **Zeile gelöscht**, auf die `kreisPos` zeigt: `kreisPos` rückt auf die
  nächste vorhandene feste Zeile (am Ende: erste feste Zeile).
- **Noch keine festen Zeilen:** kein Kreis-Stück; `kreisPos` wird gesetzt,
  sobald die erste Zeile fest wird.
- **Mehrere Geräte:** Die Kreisfelder schreibt `patchDoc` gezielt
  (`sets.<id>.kreisPos` usw.). Gleichzeitiges Wiederholen auf zwei Geräten
  kann ein Stück doppelt oder `festErgebnisse` um einen Eintrag kürzer
  machen – beides harmlos, nichts geht verloren. Test § 9.

## 4. Abschnitte und Reihenfolge

- Ein **Abschnitt** sind bis zu 5 aufeinander folgende Zeilen (Startwert;
  kürzer, wenn eine Zeile länger als 200 Zeichen ist).
- Über jedem Abschnitt stehen grau die **2 Zeilen davor** als Einstieg.
  Die Zeile danach ist nie sichtbar.
- **Frische Zeilen mitten im festen Text** (gehakte Aya 12 von 30): Sie
  werden aufgesagt als Block **11–13**, mit 9–10 grau darüber. Bewertet wird
  nur die frische Zeile; die Nachbarn zählen nicht und ändern sich nicht.
  Liegen frische Zeilen nah beieinander (Abstand ≤ 2), werden ihre Blöcke
  zu einem zusammengelegt.
- **Tagesreihenfolge je Text:** zuerst das Kreis-Stück (fest), dann die
  frischen Blöcke, dann Neues. Texte nie gemischt: ein Text nach dem anderen
  (T4), der mit der ältesten fälligen Arbeit zuerst.

## 5. Tagesmenge

- Geschätzte Zeit je Zeile: 10 Sekunden plus 1 Sekunde je 10 Zeichen.
- Liegt die Zeit für Kreis-Stück + frische Zeilen über **20 Minuten**,
  zeigt die App beim Neu-Lernen: „Heute lieber das Gelernte halten“ –
  Neues bleibt möglich, wird aber nicht angeboten.
- Nach 3 neuen Zeilen eines Textes am Tag: ruhiger Satz „Für heute ist das
  gut“; weiterlernen möglich (T7).

## 6. Karten (Weg A: Regler, kein Umbau)

Karten behalten ihre Stufen und Abstände (`intervalForStufe`,
`app.js:122`). Neu nur ein **Regler je Bereich**:

- Gezählt werden Antworten auf Karten, die vor der Antwort Stufe ≥ 7 hatten
  (gefestigt/dauerhaft). Letzte 50 als `1`/`0` im Bereichsdokument
  (`festErgebnisse`).
- `abstandFaktor` im Bereichsdokument, Start 1,0, Bereich 0,5–1,0:
  - Anteil sicher unter 85 % (mind. 20 Antworten) → Faktor − 0,1;
  - über 95 % → Faktor + 0,1 (höchstens 1,0);
  - geprüft nach jeweils 20 neuen Antworten.
- Neue Abstände = `intervalForStufe(stufe) × abstandFaktor`, gerundet,
  mindestens 1 Tag. Bestehende `nextReview` bleiben; der Faktor gilt ab der
  nächsten Bewertung. Nichts wird entwertet.
- Warum nur nach unten: Längere Abstände als heute (bis 180 Tage) sind nicht
  nötig; es geht darum, Vergessen früh aufzufangen.
- Karten in die drei Zustände zu nehmen (Weg B) wird nur geprüft, wenn der
  Probelauf zeigt, dass es bei Texten deutlich besser trägt.

## 7. Serie und Ehrlichkeit

- **Serie:** Regel bleibt, wie sie ist: Ein Tag zählt, wenn wiederholt
  oder neu gelernt wurde. Jede bewertete Textzeile schreibt ins
  Tagesprotokoll die eigene Art **„t“**; `tagGelernt` zählt `w + n + t`.
  Eigene Art, damit der Fortschrittsring der Karten (`heuteAnteil`, nutzt
  nur `w`/`n`) nicht durch Textantworten verfälscht wird. Keine
  Regeländerung (`verlauf` wird nur als Map geprüft).
- **Denkpause nur bei Texten** (E-W4): „Aufdecken“ erscheint erst nach
  einer Zeit, die zum Aufsagen ohnehin nötig ist – 0,4 Sekunden je Wort der
  verdeckten Zeilen, mindestens 1, höchstens 6 Sekunden. Der Knopf ist in
  dieser Zeit sichtbar, aber gedimmt, und wird ohne Sprung aktiv (LEHREN
  § 6.1: nichts taucht unter dem Finger auf). Wer ehrlich aufsagt, ist
  in dieser Zeit sowieso noch beim Sprechen und wartet nie. Bei **Karten
  keine** Denkpause: viele Karten weiß man in unter einer Sekunde.
- **Ehrlich wird es durch das System selbst:** Wer beim Kreis „sicher“
  drückt, obwohl es hakt, macht nur seinen eigenen Kreis länger und
  vergisst mehr – und sieht das in der eigenen Zahl.
- **Eigene Zahl sichtbar** je Text: „Von deinen festen Zeilen sitzen 9 von
  10.“ (aus `festErgebnisse`; erst ab 20 Antworten).
- **Kurze Kontrollfrage bei Texten:** etwa bei jedem zehnten Kreis-
  Abschnitt statt „Aufdecken“ zuerst: „Wie geht es weiter?“ mit drei
  Wörtern aus demselben Text zur Auswahl (das richtige ist das erste Wort
  der verdeckten Zeile). Falsch → diese Zeile zählt als gehakt. Danach
  normal aufdecken. Kein Timer, kein Punktestand.

## 8. Probelauf

- Alles aus diesem Dokument hinter einem Schalter, nur für
  `BETREIBER_UIDS` (`app.js:74`). Andere Konten sehen weder Texte noch
  Regler.
- Mindestens 4 Wochen mit echtem Stoff (eine Sure und der Medina-Bereich).
- Einstellungen → nur für den Betreiber: eine Zeile je Text/Bereich mit
  Quote, `kreisTage`, `abstandFaktor`, geschätzter Tageszeit. Wöchentlich
  ins Logbuch übertragen.
- **Erfolg:** nach 4 Wochen Quote fest ≥ 90 % bei den ältesten Zeilen, Zeit
  pro Tag für den Betreiber tragbar. Sonst Startwerte ändern, weiter prüfen,
  nicht veröffentlichen.
- Freigabe für alle: nur auf ausdrückliches „ja“ des Betreibers.

## 9. Tests (zusätzlich zu `KONZEPT.md` § 11)

- `t_text_zustaende.js`: jede Zeile der Tabelle § 2 einzeln, Gegenprobe
  „ohne Umsetzung rot“.
- `t_text_kreis.js`: 30 feste Zeilen, `kreisTage` 7 → 5 Zeilen pro Tag,
  nach 6 Tagen einmal durch; verpasste Tage verschieben nichts; Nachstellen
  bei 80 % → 5, bei 97 % → 9; Grenzen 3/30.
- `t_text_nachbarn.js`: gehakte Zeile 12 → Block 11–13 mit 9–10 grau, nie
  14 sichtbar; nur 12 ändert den Zustand; Zeilen 12 und 14 gehakt → ein
  Block 11–15.
- `t_regler_karten.js`: 20 Antworten auf Stufe-≥7-Karten, 70 % sicher →
  Faktor 0,9, neue Abstände verkürzt; bestehende `nextReview` unverändert;
  Konto ohne Schalter: keine Änderung (Gegenprobe).
- Mehrgeräte: zwei Kontexte, derselbe Text, gleichzeitig Kreis → keine
  verlorene Zeile, Test mit echtem SDK gegen den Emulator.

## 10. Neue gespeicherte Felder (Regeln, Datenschutz)

| Wo | Feld | Regel |
|---|---|---|
| Set eines Textes (`sets.<id>`) | `kreisTage`, `kreisPos`, `kreisTag`, `festErgebnisse`, `portion` | `sets` wird nur als Map geprüft – vor dem Bau `firestore.rules` lesen und bestätigen |
| Bereichsdokument | `abstandFaktor` (Zahl 0,5–1,0), `festErgebnisse` (Text ≤ 50) | `bereichFelder()` und `bereichWerte()` ergänzen, Emulator-Test |
| Karten-Dokument | `textId` | `KONZEPT.md` § 6.3 |

Datenschutzerklärung: Lernstatistik je Bereich/Text, nur im eigenen Konto,
keine Auswertung durch den Betreiber.

## 11. Entscheidungen (29.09.2026)

| Nr | Frage | Entschieden |
|---|---|---|
| E-W1 | Neu/frisch/fest mit Kreis für Texte | ja (Agent, Betreiber vertraut) |
| E-W2 | Karten: nur Regler (Weg A) | ja (Agent) |
| E-W3 | Probelauf 4 Wochen nur im Betreiberkonto | **ja (Betreiber)** |
| E-W4 | Denkpause vor dem Aufdecken | **nur bei Texten** (Betreiber: „die Idee ist doch gut für Quran; bei Karten weiß ich viele in unter 1 Sekunde“), dazu seltene Kontrollfrage (§ 7). Erst zu schnell gestrichen – Einwand war eine Frage, kein Beschluss (CLAUDE.md, Grundsatz 1). |
| E-W5 | Serie | Regel bleibt wie heute, Texte zählen gleich (§ 7) |
| E-W6 | Hakende Zeile im Zusammenhang wiederholen | ja – Betreiber-Einwand „stört das nicht die Reihenfolge?“ (§ 4) |
