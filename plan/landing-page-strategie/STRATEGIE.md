# Strategie — was die Startseite sagt

Anleitung: [`ANLEITUNG.md`](ANLEITUNG.md) · Befund: [`BEFUND.md`](BEFUND.md)
Logbuch: [`LOGBUCH.md`](LOGBUCH.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Angelegt: 13. September 2026
Status: **Teil 1 steht. 2.2 und 2.3 sind am 13.09.2026 entschieden,
2.1 ist weiterhin offen — der Umbau hängt allein daran.**

---

## 0. Wie dieses Dokument zu lesen ist — und was noch fehlt

Am 13.09.2026 kam der Befund mit dem Satz zurück: „Hier ist mein Befund
ausgefüllt, bau mir die Strategie." Der übergebene Text ist aber **derselbe**
wie der im Repo: 29 Stellen tragen weiterhin ❓, und **keine** der sechs
Antworten aus dem Abschnitt „Zusammenfassung: was jetzt wirklich noch fehlt"
steht darin. Vermutlich ist das Dokument geöffnet, gelesen und ungeändert
wieder kopiert worden.

Das wird hier nicht stillschweigend übergangen, denn genau davor warnt
`ANLEITUNG.md`: eine Headline ohne Zielgruppe ist geraten, und geraten ist
AI-Slop. Also ist dieses Dokument **zweigeteilt**:

- **Teil 1 (Abschnitte 1–2)** — was feststeht, **egal** wie die sechs Fragen
  ausgehen. Das ist keine Lückenfüllung: Es folgt aus dem Code, aus dem
  Impressum und aus den bereits getroffenen Entscheidungen, und es ist der
  größere Teil der Arbeit. Diese Abschnitte sind fertig und werden durch die
  sechs Antworten nicht mehr umgeworfen.
- **Teil 2 (Abschnitte 3–4)** — Headline und Keywords. Sie **hängen** an den
  Entscheidungen. Deshalb stehen sie hier als **drei fertig ausformulierte
  Fassungen**, je eine pro möglicher Ausrichtung, mit der Bedingung davor.
  Du wählst, und die Fassung ist sofort einsetzbar — ohne dass eine neue
  Session noch einmal von vorn denkt.

Abschnitt 2 legt die sechs Entscheidungen als **Vorlagen** vor: Möglichkeiten,
Folgen, und jeweils eine Empfehlung, die ausdrücklich als Empfehlung
gekennzeichnet ist. Eine Empfehlung ist keine Antwort. Sie ersetzt deine
Entscheidung nicht, sie macht sie nur schneller.

---

# TEIL 1 — was feststeht

## 1. Der feste Teil der Strategie

### 1.1 Der Kern: die Seite hört auf zu behaupten und fängt an zu zeigen

Die heutige Seite arbeitet mit **Behauptungen**: „wissenschaftlich bewährt",
„bewährte Lernmethoden", „funktioniert wirklich". Behauptungen dieser Art sind
austauschbar — jede Vokabel-App der Welt schreibt dasselbe — und im Fall von
„wissenschaftlich" sind sie durch den Code nicht gedeckt (siehe Befund 3.1 und
5.4).

Der Ausweg ist nicht eine bessere Behauptung, sondern der Verzicht auf die
Gattung. **Was die App tut, ist konkret genug, um für sich zu sprechen** — und
zwar mit Zahlen, die im Code stehen:

> Stufe 1 → morgen. Stufe 4 → in 6 Tagen. Stufe 7 → in 34 Tagen.
> Ab Stufe 10 → alle 180 Tage. **Keine Karte verschwindet länger als ein
> halbes Jahr aus deinem Leben.**

Das ist überprüfbar (`app.js:89–99`), es ist ungewöhnlich (die meisten
Karteikarten-Programme lassen Intervalle ins Jahrelange laufen), und es sagt
dasselbe wie „wissenschaftlich bewährt", nur ohne Behauptung. **Das ist der
strategische Kern dieser Seite: Mechanik statt Versprechen.**

Als durchgehende Schreibregel für jeden Text auf der Seite:

1. **Keine Wirkungsbehauptung ohne Beleg.** Kein „wissenschaftlich", kein
   „bewährt", kein „funktioniert wirklich", kein „Forget-Curve", solange keine
   Quelle danebensteht. Rechtlich relevant, weil im Impressum dein Vater als
   Verantwortlicher steht (`impressum.html:47`).
2. **Keine Zusage, die die App nicht einlöst.** Besonders: nichts über
   Inhalte, die es nicht gibt (siehe 1.3).
3. **Keine Dauerzusage.** „komplett kostenlos" ist heute wahr und morgen eine
   Fessel (siehe Entscheidung 2.6).
4. **Zahlen statt Adjektive**, wo immer der Code eine Zahl hergibt.

### 1.2 Was tatsächlich verkauft — drei Belege, die kein Wettbewerber hat

Aus der Tabelle in Befund 3.1 lassen sich viele Merkmale ziehen. Die meisten
sind austauschbar (Offline, Sync, Hell/Dunkel, Statistik — hat jeder). Drei
sind es nicht, und **sie tragen die ganze Seite**:

**a) Das Handschrift-Feld.** Man schreibt das arabische Wort mit dem Finger
mit, auf der Karte selbst, auch im Vollbild (`app.js:1006ff`, `5189ff`). Kein
großer Vokabeltrainer macht das — dort tippt man lateinische Buchstaben in ein
Feld. Für arabische Schrift ist Mitschreiben aber nicht Deko, sondern die
halbe Miete. **Das ist der stärkste einzelne Punkt auf der ganzen Seite**,
weil er sofort verständlich ist und weil ein Bildschirmfoto davon in einer
Sekunde erklärt, was sonst drei Sätze bräuchte.

**b) Lektion für Lektion, nicht Haufen.** Geführte Bereiche geben Lektion N
erst frei, wenn N−1 sitzt (`app.js:234–269`). Das ist die Struktur eines
**Buches**, nicht einer Vokabelliste. Wer mit einem Lehrbuch arbeitet, erkennt
sich darin sofort wieder; wer nur Wörter sammeln will, braucht es nicht.

**c) Drei Knöpfe statt zwei.** „Nicht / Fast / Sicher" — und „Nicht" heißt:
zwei Stufen zurück **und dieselbe Karte kommt in derselben Runde noch einmal**
(`app.js:3509–3516`). Das ist der Unterschied zwischen „ich habe es falsch
angeklickt" und „ich habe es gerade gelernt". Konkret, erklärbar, in einem
Satz zu zeigen.

Alles andere (Offline, Sync, Weitergabe, Drill, Leech-Anzeige, Notizen,
Rückgängig, Serie) gehört auf die Seite — aber **unter** diese drei, als Liste,
nicht als Aufmacher.

### 1.3 Die Bruchstelle im Funnel — und warum sie kein Textproblem ist

Der Weg ist: **TikTok → Startseite → Registrieren → App**. Der Bruch sitzt
hinter der Registrierung:

> Ein Mensch sieht ein Video, kommt auf die Seite, liest „Jetzt anfangen",
> registriert sich, bestätigt die E-Mail — und steht vor einem **leeren
> Werkzeug**. Karten muss er selbst anlegen. Der Kartensatz, der ihm helfen
> würde (Medina Buch 1), ist am 12.09.2026 bewusst privat gestellt worden.

**Keine Headline der Welt repariert das.** Wer nach dem Registrieren vor einem
leeren Bildschirm steht, ist weg — und zwar der beste Teil des Publikums,
nämlich der, der es wirklich versucht hat. Deshalb ist Entscheidung 2.1
(„womit fängt ein Neuer an") die Frage mit dem größten Hebel auf dieser Seite,
größer als Headline, Keywords und Gestaltung zusammen.

Solange sie offen ist, gilt für den Text die Notbremse: **„Jetzt anfangen" ist
als Handlungsaufruf falsch**, weil es etwas zusagt, was hinter dem Klick nicht
wartet. Ehrlich wäre heute „Erste Karte anlegen" — das sagt genau, was
passiert.

### 1.4 Was die Seite messen kann — und was nicht

Festgehalten, damit es nicht in jeder Session neu geprüft wird:

| Frage | Antwort heute | Quelle |
|---|---|---|
| Wie viele kommen über Google? | messbar, **ohne** Code-Änderung | Search Console, seit Phase 7 eingerichtet — Leistungsbericht zeigt sogar die echten Suchbegriffe |
| Wie viele klicken den TikTok-Link? | **nicht** auf der Seite messbar; möglicherweise in TikTok selbst (Profilaufrufe/Linkklicks bei einem Business-Konto) — dort nachsehen, nicht hier einbauen | `firebase.json` (CSP), `datenschutzerklaerung.html` |
| Wie viele registrieren sich? | messbar in der Firebase-Konsole (Anzahl Auth-Nutzer), grob, aber ehrlich | — |
| Wo auf der Seite springen Leute ab? | **nicht messbar** | CSP lässt keine fremden Skripte zu |

Der Schluss daraus ist strategisch, nicht technisch: **Diese Seite wird nicht
durch A/B-Tests optimiert, sondern muss beim ersten Mal richtig sein.** Das
rechtfertigt den Aufwand, den dieses Dokument treibt. Und es heißt umgekehrt:
Ein Analyse-Werkzeug einzubauen wäre eine eigene Entscheidung mit Folgen für
CSP **und** Datenschutzerklärung — nicht nebenbei, nicht in dieser Phase.

---

## 2. Die sechs Entscheidungen, als Vorlagen

Nach Hebelwirkung geordnet, **nicht** in der Reihenfolge des Befunds. Wenn du
nur Zeit für eine hast, nimm 2.1.

### 2.1 Womit fängt ein Neuer an? *(Befund 3.2 — größter Hebel)*

| | Möglichkeit | Folge |
|---|---|---|
| **A** | Er legt selbst an | Ehrlich, sofort machbar, kostet nichts. Aber: Der Funnel-Bruch aus 1.3 bleibt. Die Seite muss das dann offensiv erzählen („dein Stoff, nicht unserer") statt es zu verstecken. |
| **B** | Ein **eigens gemachter** öffentlicher Einsteiger-Kartensatz | Schließt den Bruch. Kostet Arbeit (Karten schreiben). Kein Urheberrechtsproblem, wenn der Inhalt von dir stammt. |
| **C** | Medina Buch 1 doch öffentlich | Stärkster Inhalt, stärkste Headline (Fassung C unten). Aber: Entscheidung vom 12.09.2026 wird widerrufen **und** die Urheberrechtsfrage am Buchinhalt muss **vorher** geklärt sein — dein Vater haftet. |

> **Stand 13.09.2026 — beantwortet ist sie noch nicht.** Der Betreiber hat auf
> diese Frage mit einer **Produktidee** geantwortet, nicht mit A/B/C: die App
> in einen **Schüler-** und einen **Lehrermodus** aufteilen, mit Klassenräumen,
> damit ein Lehrer seinen Schülern Kartensätze weitergeben kann.
>
> Die Idee ist festgehalten in `../PLAN.md`, Abschnitt „Später" — mit ihren
> Folgen (sie fasst das Lernwerkzeug an, sie verarbeitet Daten Minderjähriger,
> sie braucht neue Firestore-Regeln). Sie ist **keine Antwort auf diese
> Frage**, denn sie beantwortet nicht, was ein Mensch vorfindet, der **heute**
> über ein Video auf die Seite kommt und sich registriert. Bis zum Lehrermodus
> vergehen Monate; die Seite ist seit dem 13.09.2026 bei Google eingereicht.
>
> **Teilweise wahr ist die Idee heute schon:** Kartensätze weitergeben kann die
> App bereits (`data-action="export-weitergabe"`), als Datei, ohne Klassenraum
> und ohne neuen Code. Ein Lehrer kann also heute einen Satz bauen und ihn
> herumgeben. Das reicht für eine **Zeile auf der Seite**, aber nicht für den
> Block 7 aus Abschnitt 5 — denn der Schüler bekommt die Datei vom Lehrer, nicht
> von der Startseite.
>
> **Die Frage bleibt also offen und lautet unverändert: A, B oder C?**

**Empfehlung (Empfehlung, keine Antwort): B, mit dem Inhalt aus deinen eigenen
TikTok-Videos.** Die Begründung ist, dass B drei Probleme auf einmal löst, die
sonst einzeln Arbeit machen: Der Neue landet nicht im Leeren; der Inhalt ist
unstrittig deiner, also kein Urheberrecht; und der Kartensatz ist die
natürliche Fortsetzung des Videos, aus dem der Mensch gerade kommt („die Wörter
aus dem Video — hier sind sie als Karten"). Das ist der einzige Vorschlag in
diesem Dokument, bei dem Marketing und Produkt dasselbe Ding sind. Umfang:
30–60 Karten reichen; es geht um den ersten Tag, nicht um ein Lehrwerk.

### 2.2 Vokabeltrainer oder Begleiter für Talab al Ilm? *(Befund 3.3)*

Entscheidet die Headline und den Titel bei Google. Der Code stützt **beides** —
die Intervall-Begründung nennt ausdrücklich „Grammatik und Quran-Inhalte, die
man BEHALTEN will" (`app.js:91–93`).

- **Eng (Vokabeltrainer):** leichter zu verstehen, leichter zu finden, leichter
  einzulösen. Schwächer als Geschichte.
- **Weit (Begleiter):** trägt weiter, passt zu deinem Kanal, spricht die Leute
  an, die wirklich bleiben. Aber: Ein weites Versprechen bei leerem Werkzeug
  (2.1 A) fällt am härtesten auf die Nase.

**Empfehlung: eng anfangen, weit anlegen.** Also: Headline nennt das
Konkrete (Arabisch, Wörter, Buch), ein Abschnitt weiter unten öffnet das Feld
(„nicht nur Vokabeln — Grammatikregeln, Quran-Verse, alles, was bleiben soll").
Kostet nichts und nimmt dir später nichts weg.

> **Entschieden am 13.09.2026: eng anfangen, weit anlegen.** Damit steht:
> „Arabisch" gehört sichtbar in Headline, Seitentitel und Beschreibung; das
> weitere Feld (Grammatik, Quran-Inhalte) wird weiter unten geöffnet, nicht
> oben versprochen. Erste Folge bereits umgesetzt (v3.0.20): Die
> Meta-Beschreibung nennt jetzt „arabische Vokabeln, Grammatik und
> Quran-Inhalte". Der Seitentitel wird beim Umbau nachgezogen — er trägt
> keine Behauptung und musste deshalb nicht sofort geändert werden.

### 2.3 „Wissenschaftlich bewährt" — belegen oder ersetzen? *(Befund 5.4)*

**Das ist die einzige der sechs Fragen, die auch rechtlich drängt.** Auf einer
öffentlich erreichbaren, bei Google eingereichten Seite steht eine
Wirkungsbehauptung ohne Beleg, und im Impressum steht dein Vater.

- **Belegen:** Dann braucht es eine Quelle, die neben dem Satz steht — und sie
  müsste sich auf **dieses** Verfahren beziehen, nicht allgemein auf verteiltes
  Lernen. Der Algorithmus ist selbstgebaut (Faktor 1,8, Deckel 180), kein
  SM-2, kein Anki. Ein Verweis auf Ebbinghaus wäre streng genommen die zweite
  unbelegte Behauptung, nicht die Rettung der ersten.
- **Ersetzen:** Der Satz aus 1.1 sagt dasselbe stärker und ist wahr.

**Empfehlung: ersetzen, und zwar unabhängig von allen anderen fünf Fragen.**
Der fertige Austausch steht in Abschnitt 6.1 — drei Stellen in `landing.html`,
keine Strukturänderung. Das ist der eine Punkt, den ich für dringend halte.

> **Entschieden am 13.09.2026: ersetzen. Am selben Tag ausgeführt (v3.0.20).**
> Die Entscheidung fiel zögernd („weiß nicht"); ausgeführt wurde sie trotzdem,
> weil sie in **eine** Richtung sicher ist: Eine Behauptung zu entfernen kann
> niemandem schaden und ist jederzeit rückgängig zu machen, falls je eine
> Quelle auftaucht. Sie stehen zu lassen, während die Seite bei Google
> eingereicht ist und eine Person dafür haftet, kann es sehr wohl.
> `landing.html` enthält seitdem an keiner Stelle mehr „wissenschaftlich",
> „Forget-Curve" oder „funktioniert wirklich".

### 2.4 Marke oder Person? *(Befund 1.1/1.2)*

Aktenkundig: Du bist 16, im Impressum steht dein Vater (`impressum.html:47`).

- **Marke (Adrabic, ohne Person):** passt zum Impressum, keine weitere Frage.
- **Person (dein Name, dein Gesicht, deine Geschichte):** stärker auf TikTok,
  aber eine Seite, die „ich" sagt, und ein Impressum, das jemand anderen nennt,
  passen nicht zusammen. Das ist keine Geschmacksfrage.

**Empfehlung: Marke.** Die Geschichte erzählst du auf TikTok, wo du ohnehin
sichtbar bist; die Seite bleibt beim Werkzeug. Falls du die Person doch auf der
Seite willst, ist die saubere Form „Gemacht von … · Verantwortlich im Sinne des
DDG: …" — und das gehört dann **vorher** mit deinem Vater besprochen.

### 2.5 Außen „Adrabic", innen „Wiederholung" *(Befund 1.2/7.1)*

Genauer, als der Befund es hatte: Der Titel der App ist „Adrabic"
(`index.html`, `manifest.json`), aber die Kopfzeile **in** der App zeigt
„Wiederholung" (`app.js:3810`, `app.js:3996`), ebenso die Fußzeile mit der
Versionsnummer (`app.js:4648`). Der Mensch kommt also über „Adrabic" und sieht
im ersten Bildschirm „Wiederholung".

**Empfehlung: Kopfzeile auf „Adrabic" ziehen, Versionszeile ebenfalls.** Das
sind drei Zeichenketten und **keine** Funktion des Lernwerkzeugs — es fällt
damit nicht unter das Verbot aus Konzept-Abschnitt 7. Trotzdem gehört es
**nicht** in den Umbau der Startseite, sondern in einen eigenen kleinen
Schritt mit eigenem Logbuch-Eintrag, weil es die App-Dateien anfasst.

### 2.6 Wird später etwas kosten? *(Befund 8)*

Die FAQ sagt heute „Nein, die Nutzung ist **komplett** kostenlos" — ohne
„derzeit". Ein Abo ist im Plan unter „Später" vermerkt, wird in keiner Phase
gebaut, ist also nicht ausgeschlossen.

**Empfehlung: Wortlaut entschärfen, ohne etwas anzukündigen.** „Die Nutzung ist
kostenlos. Es gibt keine Werbung und keine Bezahlfunktion." — wahr, ohne
Dauerzusage, ohne einen Preis anzudeuten, den es nicht gibt. Kein
„derzeit"/„noch": Das weckt genau die Frage, die niemand gestellt hat.

**Nicht empfehlenswert:** eine Zwischenstufe wie Newsletter oder
„Benachrichtige mich" (Befund 4.3). Das wäre Erhebung personenbezogener Daten
und berührt Phase 5 und Phase 8 — eigener Aufwand, für drei Nutzer:innen ohne
Gegenwert.

---

# TEIL 2 — hängt an den Entscheidungen

## 3. Message: drei fertige Fassungen

Jede Fassung ist vollständig und einsetzbar. Gewählt wird **eine**, abhängig
von 2.1 und 2.2.

### Fassung A — „Dein Stoff" *(wenn 2.1 = A: Neue legen selbst an)*

| Element | Text |
|---|---|
| **H1** | Dein Arabisch bleibt. Auch in drei Wochen. |
| **Unterzeile** | Du bringst den Stoff aus deinem Buch. Adrabic sorgt dafür, dass er nicht wieder verschwindet. |
| **Beweiszeile** | Jede Karte kommt wieder — spätestens nach einem halben Jahr. |
| **Handlungsaufruf** | Erste Karte anlegen |
| **Seitentitel (Google)** | Adrabic — arabische Vokabeln, die bleiben |
| **Beschreibung** | Karteikarten für arabische Vokabeln, Grammatik und Quran-Inhalte. Mit Handschrift-Feld zum Mitschreiben. Kostenlos, offline, ohne Werbung. |

Diese Fassung muss den leeren Anfang **aussprechen**, nicht verstecken — siehe
Struktur-Abschnitt 5, Block 7. Genau das macht sie glaubwürdig.

### Fassung B — „Was du gelernt hast, sollst du nicht verlieren" *(wenn 2.1 = B: eigener Einsteigersatz)*

| Element | Text |
|---|---|
| **H1** | Was du einmal gelernt hast, sollst du nicht wieder verlieren. |
| **Unterzeile** | Arabische Vokabeln, Grammatik, Quran-Inhalte — in wachsenden Abständen wiederholt, bis sie sitzen. |
| **Beweiszeile** | Jede Karte kommt wieder — spätestens nach einem halben Jahr. |
| **Handlungsaufruf** | Mit den ersten 50 Karten anfangen |
| **Seitentitel (Google)** | Adrabic — arabische Vokabeln lernen und behalten |
| **Beschreibung** | Karteikarten für Arabisch: 50 Karten zum Anfangen, Handschrift-Feld zum Mitschreiben, Wiederholung in wachsenden Abständen. Kostenlos und offline. |

Der Handlungsaufruf nennt die Zahl. Das ist der ganze Unterschied zwischen
„Jetzt anfangen" und einem Versprechen, das hinter dem Klick eingelöst wird.

### Fassung C — „Medina Buch 1" *(nur wenn 2.1 = C **und** Urheberrecht geklärt)*

| Element | Text |
|---|---|
| **H1** | Medina Buch 1 — Lektion für Lektion, und es bleibt. |
| **Unterzeile** | Der Wortschatz als Karteikarten. Lektion 2 geht auf, wenn Lektion 1 sitzt. |
| **Beweiszeile** | Jede Karte kommt wieder — spätestens nach einem halben Jahr. |
| **Handlungsaufruf** | Kartensatz holen |
| **Seitentitel (Google)** | Medina Buch 1 Vokabeln lernen — Adrabic |
| **Beschreibung** | Der Wortschatz aus Medina Buch 1 als Karteikarten, Lektion für Lektion. Mit Handschrift-Feld und Wiederholung in wachsenden Abständen. |

Stärkste Fassung bei Google, weil sie einen Begriff besetzt, den Menschen
wirklich eingeben — und die schwächste rechtlich, solange die Frage am
Buchinhalt nicht geklärt ist. **In dieser Reihenfolge: erst Klärung, dann
Text.**

### Zu allen drei Fassungen gilt

- Kein „wissenschaftlich", kein „Forget-Curve", kein „funktioniert wirklich".
- Das Wort **„Arabisch" gehört in H1 oder Unterzeile.** Heute kommt es im
  ganzen sichtbaren Seitenkopf nicht vor — das ist der größte einzelne Fehler
  der aktuellen Seite (siehe 4).
- Der Handlungsaufruf sagt, **was hinter dem Klick passiert**, nicht „jetzt".

---

## 4. Keywords

**Ausdrücklich Hypothesen, keine Daten.** Es gibt keine Suchdaten für diese
Seite — und es gibt genau einen Weg, das ohne Code-Änderung zu ändern:
**Search Console, Leistungsbericht.** Er zeigt die echten Suchbegriffe, mit
denen Menschen auf der Seite landen. Nach dem Umbau in vier Wochen dort
nachsehen und diesen Abschnitt gegen die echten Begriffe austauschen.

### Was heute hinterlegt ist — und warum es danebenliegt

Titel „Adrabic – Vokabeln lernen, die hängenbleiben", Beschreibung „Lerne
Vokabeln dauerhaft. Mit wissenschaftlich bewährten Wiederholungsintervallen"
(`landing.html:6,9`).

Das zielt auf **generische Vokabel-Suchen** — ein Feld, in dem Quizlet, Anki
und Duolingo stehen und in dem eine Seite mit drei Nutzer:innen chancenlos ist.
Gleichzeitig steht **kein** Wort auf der Seite, mit dem man sie tatsächlich
finden könnte: nicht „Arabisch", nicht „Medina", nicht „Quran". Wer heute
genau das sucht, was die App kann, findet sie nicht. Das ist kein Feinschliff,
das ist die Kernkorrektur.

### Vorschlag (zu prüfen, nicht zu glauben)

**Erste Reihe** — danach wird der Titel gebaut:

- arabisch vokabeln lernen app
- arabisch karteikarten app
- arabische vokabeln üben
- medina buch 1 vokabeln *(nur bei Fassung C)*

**Zweite Reihe** — gehören in Zwischenüberschriften und FAQ, nicht in den Titel:

- arabisch schreiben üben app
- vokabeltrainer arabisch deutsch
- quran wörter lernen
- karteikarten app kostenlos ohne werbung
- arabisch lernen offline app

**Negative Keywords** — Suchen, für die die Seite **nicht** gefunden werden
will, weil die App sie nicht bedient und der Besuch nur abspringt:

| Nicht gesucht werden für | Weil |
|---|---|
| arabisch übersetzer | Die App übersetzt nichts. |
| arabisch lernen kurs / mit Lehrer | Es gibt keinen Kurs und keinen Lehrer. |
| arabisch sprechen lernen | Kein Aussprache- oder Sprechteil. |
| arabisch alphabet lernen | Kein Alphabet-Lehrgang; setzt Lesen voraus. |
| arabisch lernen für kinder | Weder Gestaltung noch Inhalt sind darauf ausgelegt. |

Der Weg, das umzusetzen, ist **nicht** eine Meta-Angabe (die es dafür nicht
gibt), sondern ein sichtbarer Abschnitt auf der Seite: „Was Adrabic nicht ist"
(Struktur-Block 8). Der filtert die falschen Besucher, bevor sie sich
registrieren — und er baut bei den richtigen Vertrauen auf, weil eine Seite,
die ihre Grenzen nennt, beim Rest geglaubt wird.

---

## 5. Struktur: wie `landing.html` aufgebaut wird

Heute: ein Aufmacher, drei Kästchen, FAQ, Fußzeile. **Kein einziges Bild aus
der App.** Wer nicht klickt, hat nie gesehen, worüber die Seite spricht.

Vorgeschlagener Aufbau, von oben nach unten. Jeder Block mit einem Grund —
Blöcke ohne Grund gehören nicht auf die Seite.

| # | Block | Inhalt | Warum |
|---|---|---|---|
| 1 | **Kopf** | Symbol + Wortmarke „Adrabic" | Der Name, unter dem er die Seite gesucht oder im Video gehört hat. Sonst nichts — keine Navigation, die von unten wegführt. |
| 2 | **Aufmacher** | H1 + Unterzeile + Beweiszeile + Handlungsaufruf (aus Abschnitt 3) | Die einzige Stelle, die fast alle lesen. |
| 3 | **Bildschirmfoto: Handschrift-Feld** | Ein Bild, eine Bildunterschrift: „Das Wort mit dem Finger mitschreiben — auf der Karte selbst." | Stärkster Beleg (1.2a), und ein Bild erklärt ihn schneller als jeder Satz. **Ohne dieses Bild bleibt die Seite Behauptung.** |
| 4 | **Wann eine Karte wiederkommt** | Die Stufenleiter als kleine Tabelle oder Balkenreihe: 1 · 2 · 3 · 6 · 10 · 19 · 34 · 61 · 110 · 180 Tage, darunter: „Danach nie mehr als 180 Tage Pause." | **Der Ersatz für „wissenschaftlich bewährt".** Zeigt die Mechanik, statt Wirkung zu behaupten (1.1). |
| 5 | **Drei Knöpfe statt zwei** | „Nicht / Fast / Sicher" erklärt: „Nicht" bringt die Karte **in derselben Runde** zurück. | Konkret, ungewöhnlich, in zwei Sätzen erzählbar (1.2c). |
| 6 | **Lektion für Lektion** | Geführte Bereiche: Lektion 2 geht auf, wenn Lektion 1 sitzt. | Spricht genau die an, die mit einem Buch arbeiten (1.2b). |
| 7 | **Was passiert, wenn du anfängst** | **Hängt an Entscheidung 2.1.** A: „Du legst deine erste Karte an — dein Stoff, nicht unserer." B: „50 Karten zum Anfangen liegen bereit." C: „Der Kartensatz zu Medina Buch 1 wartet auf dich." | Die Bruchstelle aus 1.3, offen angesprochen. Der Block, der über Abbruch oder Bleiben entscheidet. |
| 8 | **Was Adrabic nicht ist** | Kein Kurs. Kein Lehrer. Kein Übersetzer. Keine Aussprache. — „Es ist das Werkzeug, das behält, was du anderswo lernst." | Filtert falsche Besucher (Abschnitt 4), erzeugt Vertrauen beim Rest. |
| 9 | **Der Rest, kurz** | Offline · auf allen Geräten · Karteisätze weitergeben · Üben ohne Auswirkung auf den Plan · Karten, die nicht klappen, werden benannt · Notizen · Rückgängig · Lernserie · kostenlos, ohne Werbung | Vollständigkeit für die, die weiterlesen. Als Liste, nicht als Kästchen — es sind zu viele für Kästchen. |
| 10 | **FAQ** | Die fünf heutigen, überarbeitet (siehe 6.2), **plus eine neue**: „Ich habe noch keine Karten — wie fange ich an?" | Steht schon und funktioniert; das JSON-LD dazu ist eingerichtet. |
| 11 | **Handlungsaufruf, zweites Mal** | Derselbe Text wie in Block 2 | Wer bis hierher gelesen hat, ist überzeugt — und muss dann nicht zurückscrollen. |
| 12 | **Fußzeile** | Impressum · Datenschutz | Pflicht, bleibt wie sie ist. |

**Was bewusst nicht dazukommt:**

- **Keine Testimonials.** Es gibt drei Nutzer:innen, davon zwei Freunde.
  Erfundene oder geschönte Stimmen wären genau die Art Behauptung, die
  Abschnitt 1.1 abschafft. Echte Zitate deiner beiden Freunde wären in Ordnung
  — **mit Namen und mit ihrem Einverständnis**, sonst nicht.
- **Keine Nutzerzahlen.** „Über 3 Lernende" ist keine Werbung.
- **Kein Newsletter, keine Anmelde-Zwischenstufe** (Begründung in 2.6).
- **Kein Analyse-Werkzeug** (Begründung in 1.4).
- **Kein Login-Formular auf der Startseite** — das ist am 12.09.2026
  entschieden worden und bleibt so.

---

## 6. Was sich konkret ändert — gegenüber dem heutigen Stand

### 6.1 Sofort, unabhängig von allen sechs Entscheidungen

Diese vier Änderungen sind in **jeder** Fassung richtig.

> **Stand 13.09.2026 (v3.0.20): Nummer 1, 2 und 3 sind ausgeführt**, nachdem
> der Betreiber Entscheidung 2.3 getroffen hat — dazu der Darstellungsfehler
> mit `color-scheme` unten. **Nummer 4 ist nicht ausgeführt**: Sie hängt an
> Entscheidung 2.6 (Kostenfrage), und die ist offen. Eine Empfehlung ersetzt
> keine Entscheidung, auch wenn es nur um ein Wort geht.

| # | Wo | Heute | Neu |
|---|---|---|---|
| 1 | `landing.html`, Kasten „Die Lösung" | „Die Lösung: **Wissenschaftlich bewährte** Wiederholungen … Das spart Zeit und **funktioniert wirklich**." | „So funktioniert es: Jede Karte bekommt eine Stufe. Stufe 1 heißt morgen, Stufe 7 heißt in 34 Tagen, ab Stufe 10 alle 180 Tage. Keine Karte verschwindet länger als ein halbes Jahr." |
| 2 | `landing.html`, Kästchen 1 | „**Wissenschaftlich** — Basiert auf der **Forget-Curve** und bewährten Lernmethoden" | „Mitschreiben — Das arabische Wort mit dem Finger auf der Karte nachschreiben" |
| 3 | `landing.html:9` + og:description | „Lerne Vokabeln dauerhaft. Mit **wissenschaftlich bewährten** Wiederholungsintervallen" | Beschreibung aus der gewählten Fassung (Abschnitt 3) — mit dem Wort „Arabisch" darin |
| 4 | `landing.html`, FAQ „Kostet Adrabic etwas?" | „Nein, die Nutzung ist **komplett** kostenlos." | „Die Nutzung ist kostenlos. Es gibt keine Werbung und keine Bezahlfunktion." (Begründung 2.6) |

Nummer 1 bis 3 entfernen dieselbe Sache: die **unbelegte Wirkungsbehauptung**,
die laut Befund 5.4 haftungsrelevant ist. Dass sie an drei Stellen steht
(Fließtext, Kästchen, Meta-Beschreibung), ist der Grund, warum sie hier
einzeln aufgeführt sind — eine davon zu vergessen, hieße, sie stehen zu lassen.

**Zusätzlich beim Umbau mit zu erledigen, in der Durchsicht gefunden:**
`landing.html:8` setzt `<meta name="color-scheme" content="dark">` fest, obwohl
das Skript darüber auch auf „hell" schalten kann. Die Angabe muss dann
`light dark` lauten, sonst rendert der Browser Formular- und Systemfarben
dunkel, während die Seite hell ist. Kleiner Darstellungsfehler, kein Umbau —
gehört aber in denselben Handgriff.

### 6.2 Nach der Entscheidung — der eigentliche Umbau

| Was | Heute | Nachher |
|---|---|---|
| **H1** | „Vokabeln, die hängenbleiben" — generisch, ohne „Arabisch" | Fassung A, B oder C aus Abschnitt 3 |
| **Handlungsaufruf** | „Jetzt anfangen" — sagt nicht, was passiert | Fassungstext; nennt die konkrete erste Handlung |
| **Bilder aus der App** | keine | mindestens eins (Handschrift-Feld), Block 3 |
| **Beleg für die Wirkung** | Behauptung „wissenschaftlich" | Stufenleiter mit echten Zahlen, Block 4 |
| **Arabisch als Thema** | kommt im Seitenkopf nicht vor, nur versteckt in einer FAQ-Antwort | in H1 oder Unterzeile, in Titel und Beschreibung |
| **Drei Kästchen** | „Wissenschaftlich / Automatisch / Überall verfügbar" — zwei davon austauschbar, eines unbelegt | ersetzt durch die Blöcke 3–6 (die drei echten Belege) plus Liste in Block 9 |
| **Leerer Anfang** | wird nicht erwähnt | eigener Block 7, offen angesprochen |
| **Abgrenzung** | keine | Block 8 „Was Adrabic nicht ist" |
| **FAQ** | fünf Fragen | dieselben fünf (Kostenfrage neu formuliert) + „Ich habe noch keine Karten — wie fange ich an?" |
| **Zweiter Handlungsaufruf** | keiner | Block 11 |

### 6.3 Was ausdrücklich **nicht** angefasst wird

- **Die App selbst.** Konzept-Abschnitt 7 und `CLAUDE.md`: keine Funktion des
  Lernwerkzeugs. Der Namensabgleich aus 2.5 ist ein eigener Schritt, kein Teil
  dieses Umbaus.
- **`impressum.html`, `datenschutzerklaerung.html`** — außer die Entscheidung
  2.4 fällt auf „Person", dann ist das Impressum **vorher** zu klären.
- **`firebase.json`, CSP, `robots.txt`, `sitemap.xml`** — die Startseite
  bleibt dieselbe Datei unter derselben Adresse. Nur wenn Block 7 (Fassung B/C)
  auf eine **eigene Seite** für den Kartensatz hinausläuft, kommt ein Eintrag
  in `sitemap.xml` dazu.
- **Der Aufbau der Gestaltung.** `landing.html` benutzt die Tokens aus
  `styles.css`; das bleibt so. Neue Blöcke erben Farben, Abstände und
  Schriften, sie bringen keine eigenen mit.

---

## 7. Randbedingungen für die Ausführung

Wer den Umbau macht, hat sich an Folgendes zu halten — sonst entsteht Arbeit,
die hinterher zurückgebaut wird:

1. **Veröffentlichungsliste aus `README.md`** gilt, weil `landing.html` eine
   ausgelieferte Datei ist: `APP_VERSION` in `app.js` hoch, **derselbe Wert**
   als `CACHE_NAME` in `sw.js`, Eintrag in `CHANGELOG.md`. `APP_SHELL` muss
   **nicht** geändert werden — `landing.html` steht schon darin (`sw.js:17`).
   Kommt ein Bildschirmfoto dazu, gehört die Bilddatei **nicht** zwingend in
   `APP_SHELL`: Sie wird zum Starten der App nicht gebraucht.
2. **Eintrittsbewegungen wären `@keyframes`, keine Transitions** — die Regel
   aus `README.md`. Für diese Seite gilt aber: **gar keine Bewegung** ist die
   bessere Wahl. Die Seite hat kein `render()`, kein JavaScript außer dem
   Hell/Dunkel-Schalter, und das soll so bleiben.
3. **Kein neues JavaScript, keine fremden Skripte.** Die CSP aus Phase 4 lässt
   sie nicht zu, und die Datenschutzerklärung sagt zu, dass es sie nicht gibt.
   Blöcke 3–9 sind reines Markup.
4. **Das FAQ-JSON-LD muss wörtlich zur sichtbaren FAQ passen.** Wird eine
   Antwort geändert (6.1 Nr. 4) oder eine Frage ergänzt, ist das JSON-LD am
   Seitenende **mitzuziehen** — sonst wertet Google es als irreführend.
5. **Barrierefreiheit gleich richtig**, nicht später: Überschriftenhierarchie
   ohne Sprünge, Bildschirmfotos mit `alt`, Kontraste wie in Phase 6 geprüft.
   Phase 9 läuft über den Endstand — was hier ordentlich gebaut wird, muss
   dort nicht noch einmal angefasst werden.

---

## 8. Woran diese Strategie fertig ist

- [x] Fester Teil: Kern-Message, die drei tragenden Belege, Funnel und seine
      Bruchstelle, Messbarkeit — **steht** (Abschnitt 1)
- [x] Sechs Entscheidungen als Vorlagen mit Folgen und Empfehlung — **steht**
      (Abschnitt 2)
- [x] Drei vollständige Message-Fassungen, je eine pro Ausrichtung — **steht**
      (Abschnitt 3)
- [x] Keywords als geordnete Hypothese samt Negativliste und Prüfweg —
      **steht** (Abschnitt 4)
- [x] Struktur der Seite, Block für Block mit Begründung — **steht**
      (Abschnitt 5)
- [x] Änderungsliste gegen den heutigen Stand, getrennt nach „sofort" und
      „nach Entscheidung" — **steht** (Abschnitt 6)
- [x] **Entscheidung 2.2** (eng oder weit) — *eng anfangen, weit anlegen*,
      13.09.2026
- [x] **Entscheidung 2.3** („wissenschaftlich" belegen oder ersetzen) —
      *ersetzen*, 13.09.2026, am selben Tag ausgeführt (v3.0.20)
- [ ] **Entscheidung 2.1** (womit ein Neuer anfängt: A, B oder C) — **offen.
      Der Umbau hängt allein daran.** Die Antwort vom 13.09.2026 war eine
      Produktidee (Lehrer-/Schülermodus), keine Wahl zwischen A, B und C.
- [ ] Entscheidungen 2.4, 2.5, 2.6 — offen, blockieren den Umbau aber nicht
- [ ] Umbau von `landing.html` — beginnt, sobald 2.1 beantwortet ist

**Es fehlt genau eine Antwort: 2.1.** Mit ihr steht die Fassung aus Abschnitt 3
fest, und die Seite kann nach Abschnitt 5 gebaut werden.
