# Landing Page Befund — Fragen zur Strategie

Füll dieses Dokument aus. Nicht kurz, nicht oberflächlich — so ausführlich, dass jemand Fremdes dich danach versteht.

---

## Stand 13.09.2026 — wie dieses Dokument jetzt zu lesen ist

Der Befund war leer und damit eine Sperre: ohne Antworten keine Strategie, ohne
Strategie keine Landing Page. Ein Teil der Fragen war aber **schon beantwortet**
— im Code, im Impressum und in `../PLAN.md`. Diese Antworten stehen jetzt hier,
damit sie nicht aus dem Gedächtnis neu (und falsch) geschrieben werden.

Drei Kennzeichen:

- ✅ **Belegt** — steht so im Code oder im Plan. Quelle ist jeweils genannt.
  Lies es durch; wenn etwas nicht stimmt, korrigier es hier.
- 🟡 **Vermutung** — aus dem Repo abgeleitet, aber nicht belegt. **Bestätigen
  oder streichen**, nicht stehenlassen.
- ❓ **Offen** — kann nur der Betreiber beantworten. Kein Agent kann das raten,
  und geraten wäre genau die „AI-Slop", die `ANLEITUNG.md` ausschließen will.

**Zum Ausfüllen reichen die ❓ und die 🟡.** Der Rest ist erledigt.

---

## 1. Deine Person / Marke

**1.1 Wer bist du? (Für die Landing Page)**
- Name, Alter, Hintergrund?
- Was ist dein islamischer Hintergrund / Manhaj?
- Warum machst **du** das, nicht jemand anderes?
- Was unterscheidet dich von anderen Qur'an/Arabisch-Learning-Channels?

✅ **Belegt, soweit es das Repo hergibt:** Der tatsächliche Betreiber ist 16
Jahre alt. Im Impressum steht bewusst **nicht** er, sondern sein Vater
**Nauroz Masjeedi** (`impressum.html:47`), Kontakt `masjeedikk@gmail.com`
(`impressum.html:57`). Grund steht in `../PLAN.md`, Statusverlauf 13.09.2026:
Geschäftsfähigkeit und Adress-Sichtbarkeit in einem Schritt gelöst.

⚠️ **Folge für die Landing Page, bevor irgendein Text geschrieben wird:** Eine
Seite, die stark auf „ich, der Betreiber" setzt (Gesicht, Name, Geschichte,
„mein Weg"), passt nicht zu einem Impressum, das eine **andere** Person nennt.
Entweder die Seite bleibt sachlich beim Werkzeug, oder die Person wird auf der
Seite genannt und das Impressum muss dazu passen. Das ist keine Geschmacks-,
sondern eine Rechtsfrage — siehe ❓ unten.

❓ **Offen:** Manhaj/Hintergrund, eigene Lerngeschichte, Abgrenzung zu anderen
Kanälen. Und: **Soll dein Name überhaupt auf die Seite?** (Siehe Warnung oben.)

**1.2 Adrabic — was ist der Name?**
- Bedeutung?
- Warum dieser Name?
- Soll er auf der Landing Page prominent sein, oder eher dein Name?

✅ **Belegt:** Der Name ist bereits überall verdrahtet — Seitentitel
(`landing.html:6`), Cache-Name `adrabic-3.0.18` (`sw.js:10`), der
localStorage-Schlüssel `adrabic-thema` (`landing.html`, `app.js`), und das
ältere Repo heißt `user123kkk/adrabic`. In der App selbst heißt das Werkzeug
dagegen **„Wiederholung"** (`app.js:4648`).

🟡 **Vermutung:** „Adrabic" ist die Marke nach außen, „Wiederholung" der
Arbeitsname innen. Das ist **eine Unstimmigkeit, die Nutzer sehen**: Sie kommen
über „Adrabic" auf die Seite und landen in etwas, das „Wiederholung" heißt.
Bestätigen oder auflösen.

❓ **Offen:** Bedeutung des Namens, warum dieser Name, und was auf der Seite
groß steht — Marke oder Person.

**1.3 Dein TikTok-Channel**
- Wie heißt er?
- Wie viele Follower?
- Was postest du? (Arabisch-Tipps? Aqeedah? Motivation? Kombination?)
- Engagement-Rate? (ungefähr, was läuft gut?)
- Wie viele Personen klicken auf deinen Link (Tracking möglich)?

❓ **Vollständig offen.** Im Repo steht dazu nichts — kein Link, kein Handle,
keine Erwähnung. Das ist laut `ANLEITUNG.md` der **Hauptkanal**, also die
wichtigste unbeantwortete Frage überhaupt.

Zur Teilfrage „Tracking möglich?" — ✅ **belegt, und die Antwort ist heute
Nein:** Die Seite hat keinerlei Analyse-Werkzeug. `datenschutzerklaerung.html`
sagt ausdrücklich, dass keine nicht-notwendigen Cookies gesetzt werden, und die
CSP aus Phase 4 (`firebase.json`) lässt fremde Skripte gar nicht erst zu. Wer
Klicks zählen will, ändert damit Rechtstext **und** Sicherheits-Header. Das ist
eine eigene Entscheidung, keine Nebensache.

---

## 2. Zielgruppe

**2.1 Wer sind deine idealen Nutzer?**
- Alter (range)?
- Geschlecht?
- Geografisch (Deutschland, DACH, global)?
- Bildung / Herkunft?
- Religiöser Hintergrund (Muslim? Neu konvertiert? Arabisch-Lerner?)
- Was verbindet sie?

🟡 **Vermutung aus dem Repo:** Deutschsprachig (die gesamte App ist auf Deutsch,
`lang="de"`), muslimisch, Arabisch-Lernende mit Buchbezug — der
Weitergabe-Kartensatz ist **Medina Buch 1** (`../PLAN.md`, geklärte Frage 4).
Der Code nennt als Zweck ausdrücklich „Grammatik und Quran-Inhalte, die man
BEHALTEN will" (`app.js:91-93`).

✅ **Belegt:** Heute sind es **drei Nutzer:innen**, davon zwei Freunde, die per
Direktnachricht Rückmeldung geben (`plan/phase-8-rueckmeldung/AUFTRAG.md`).

❓ **Offen:** Alter, Geschlecht, geografische Reichweite, Bildungshintergrund —
und vor allem: **was sie verbindet**, in deinen Worten.

**2.2 Was ist ihr Problem?**

❓ **Offen und nicht ersetzbar.** Die jetzige Seite behauptet ein Problem
(„Du lernst Wörter … drei Wochen später vergessen", `landing.html`), aber das
ist der allgemeine Lehrbuchsatz über Vergessen, nicht das Problem **deiner**
Leute. Genau davor warnt die Frage im Original.

**2.3 Warum sollten sie dich wählen?**

🟡 **Vermutung, prüfbar am Code — das kann Duolingo nicht:**
- Arabische Schrift ist erstklassig behandelt, nicht nachträglich angeflanscht:
  eigene Schriftgrößen-Einstellung (`data-action="set-arab-groesse"`) und ein
  **Handschrift-Feld zum Mitschreiben** (`app.js:1006ff`, `5189ff`).
- **Geführte Bereiche mit Lektionen**, die erst aufgehen, wenn die vorige sitzt
  (`app.js:234-269`) — also ein Buch, Lektion für Lektion, nicht ein Haufen
  Vokabeln.
- Kartensätze lassen sich **weitergeben** (`data-action="export-weitergabe"`) —
  einer baut, alle anderen lernen mit.
- Eigener Lernstoff statt fertigem Kurs: Du entscheidest, was drinsteht.

❓ **Offen:** Welcher dieser Punkte ist **dein** Argument? Und was ist dein
Argument gegenüber anderen Muslim-Creatorn, nicht gegenüber Duolingo?

---

## 3. Die App: Was ist das Kernversprechen?

**3.1 Was macht die App?**

✅ **Vollständig belegt am Code (Stand 3.0.18) — das ist der Faktenteil, den
die Strategie braucht, damit die Seite nichts verspricht, was die App nicht
kann:**

| Was | Wie genau | Beleg |
|---|---|---|
| Wiederholung in wachsenden Abständen | Stufe 1→1, 2→2, 3→3, 4→6, 5→10, 6→19, 7→34, 8→61, 9→110, ab 10→180 Tage (Faktor 1,8, Deckel 180) | `app.js:89-99` |
| Jede Karte kommt **mindestens zweimal im Jahr** wieder | harter Deckel bei 180 Tagen, auch mit Streuung | `app.js:95`, `app.js:108-112` |
| Streuung ±15 %, damit keine Stapel-Tage entstehen | `nextReviewForStufe` | `app.js:100-112` |
| Drei Bewertungen statt zwei: „Nicht" / „Fast" / „Sicher" | Nicht = zwei Stufen zurück und **in derselben Runde** wieder; Fast = eine zurück, morgen; Sicher = eine hoch | `app.js:3509-3516` |
| Bewertung rückgängig machen | `undo-grade` | `app.js` |
| Geführte Bereiche mit Lektionen, die nacheinander aufgehen | Lektion N geht auf, sobald N−1 sitzt; einmal offen bleibt offen | `app.js:234-269` |
| Karten, die dauerhaft nicht klappen, werden benannt | „Karten, die nicht klappen" (Leeches) | `app.js:4975-4980` |
| Üben ohne Auswirkung auf den Plan | Drill-Modus | `data-action="open-drill"`, `"drill-set"` |
| Arabische Handschrift mitschreiben, auch im Vollbild | Zeichenfeld pro Karte | `app.js:1006ff`, `5189ff` |
| Arabische Schriftgröße getrennt einstellbar | `set-arab-groesse` | `app.js` |
| Notiz pro Karte, Karte merken/markieren | `lern-notiz`, `karte-merken` | `app.js:6430ff` |
| Lernserie (Streak) — nur echte Sessions zählen, Üben nicht | `normStreak` | `app.js:755`, `854` |
| Statistik und Stufenverteilung | vier Gruppen entlang der Intervalle | `app.js:2061` |
| Suche über Karten, Mehrfachauswahl, Verschieben, Löschen | `search-scope`, `move-selected`, `delete-selected` | `app.js` |
| Sicherung herunterladen, Kartensatz weitergeben, Import | `export-backup`, `export-weitergabe`, `import-trigger` | `app.js:6430` |
| Hell/Dunkel | `set-thema` | `app.js` |
| **Offline** — echte Offline-Fähigkeit, nicht nur „App-Hülle" | Firestore mit `persistentLocalCache()` **plus** Service Worker mit App-Shell | `app.js:1212`, `sw.js:10-27` |
| Synchronisiert über Geräte | Firestore je Konto | `app.js:1052` |
| Konto vollständig löschbar, Karten mit | `delete-account`, Phase 2 | `app.js` |
| Kostenlos, keine Tracking-Cookies | Phase 5 geprüft | `datenschutzerklaerung.html` |

**Wichtig für die Textarbeit:** Der Algorithmus ist **kein** SM-2/Anki-Klon und
auch nichts, was mit einer Studie belegt wäre. Es ist ein selbstgebautes
Stufensystem mit exponentiell wachsenden Abständen. Die jetzige Seite sagt
„Wissenschaftlich bewährt" und „Basiert auf der Forget-Curve"
(`landing.html`) — das ist **großzügiger formuliert, als der Code hergibt**.
Für die Strategie gilt: Das ist eine Behauptung, die entweder belegt oder
ersetzt werden muss. Siehe 5.4.

❓ **Offen:** Was ist der **Sinn** dahinter für deine Nutzer? Warum zählt
„nie wieder vergessen" für sie?

**3.2 Welche Lernbücher/Inhalte?**

✅ **Belegt:** Es gibt **einen** Weitergabe-Kartensatz: **Medina Buch 1**. Er
bleibt laut Entscheidung des Betreibers vom 12.09.2026 **privat unter Brüdern**
und wird **nicht** Teil der öffentlichen Seite (`../PLAN.md`, geklärte Frage 4).

⚠️ **Das ist der wunde Punkt der ganzen Landing Page.** Wer über TikTok kommt,
sieht ein leeres Werkzeug: Karten muss er selbst anlegen. Genau der Inhalt, der
die Seite verkaufen würde, ist bewusst privat. Das ist kein Widerspruch, den
ein Text wegschreiben kann — das ist eine Entscheidung, die vor der Seite
getroffen werden muss. Siehe ❓ unten.

❓ **Offen und neu (nicht im ursprünglichen Fragebogen, aber unvermeidlich):**
Womit fängt jemand an, der neu von TikTok kommt und keinen Kartensatz hat?
Drei Möglichkeiten, eine ist zu wählen:
1. Er legt selbst an — dann muss die Seite das ehrlich sagen und es als
   Stärke erzählen („dein Stoff, nicht unserer").
2. Es gibt einen **öffentlichen** Einsteiger-Kartensatz (nicht Medina Buch 1,
   sondern etwas eigens dafür Gemachtes).
3. Medina Buch 1 wird doch öffentlich — dann ist die Entscheidung vom
   12.09.2026 zu widerrufen, **und** die Urheberrechtsfrage am Buchinhalt ist
   vorher zu klären. (Der Vater haftet, siehe 1.1.)

❓ **Offen:** Ajurumiyyah, Aqeedah, Gelehrten-Fatwas — geplant oder nicht?

**3.3 Das längerfristige Bild**

❓ **Offen.** „Vokabeltrainer" oder „Begleiter auf dem Weg zum Talab al Ilm" —
das entscheidet die Headline und damit die ganze Seite. Der Code stützt beides:
die Intervall-Begründung nennt ausdrücklich „Grammatik und Quran-Inhalte, die
man BEHALTEN will" (`app.js:91-93`), also mehr als Vokabeln.

---

## 4. Acquisition: Wie kommen Leute zur Landing Page?

**4.1 Hauptkanal: TikTok** — ❓ vollständig offen, siehe 1.3.

**4.2 Nebenkanäle (später)?**

✅ **Belegt, was schon steht:** Google ist technisch vorbereitet — Search
Console verifiziert, `sitemap.xml` eingereicht und akzeptiert, `robots.txt`
hält die App (`/index.html`) bewusst aus dem Index heraus, nur die öffentlichen
Seiten sind indexierbar (Phase 7, `../phase-7-seo/LOGBUCH.md`).

❓ **Offen:** YouTube, Instagram, Mundpropaganda — ja/nein/später.

**4.3 Conversion-Ziel auf der Landing Page**

✅ **Teilweise entschieden (12.09.2026, vormals offene Frage 2):** Wer über
Google kommt, sieht **erst** die Erklärseite und geht **von dort** zum
Login/Registrieren. Beides auf **einer** Domain, kein Login-Formular auf der
Startseite. Heutiger Stand entspricht dem: ein einziger Knopf „Jetzt anfangen"
→ `index.html`.

❓ **Offen:** Reicht der eine Knopf, oder braucht es eine Zwischenstufe
(„Benachrichtige mich", Newsletter)? **Achtung:** Newsletter hieße
personenbezogene Daten erheben — das berührt Phase 5 (Datenschutzerklärung)
und Phase 8 (Rückmeldung) und ist nicht nebenbei zu machen.

---

## 5. Message: Was sagt die Seite?

Diese Antworten **folgen** aus 1–4. Sie lassen sich nicht vorziehen: Ohne
Zielgruppe (2.1) und ohne Kanal (1.3) ist jede Headline geraten.

**5.1 Der Kern-Satz (Headline)** — aktuell: „Vokabeln, die hängenbleiben". ❓
**5.2 Das Problem** — ❓, hängt an 2.2.
**5.3 Die Lösung** — ❓, hängt an 3.3.

**5.4 Beweis / Vertrauen**

⚠️ **Dringend, unabhängig von der Strategie.** Die Seite sagt heute
„Wissenschaftlich bewährte Wiederholungen" und „Basiert auf der Forget-Curve".
Dahinter steht (siehe 3.1) ein selbstgebautes Stufensystem ohne Studienbeleg.
Das ist keine Kleinigkeit: Im Impressum haftet der Vater, und eine
Wirkungsbehauptung ohne Beleg ist angreifbar.

❓ **Offen, zu entscheiden:** Belegen (dann: welche Quelle?) oder ersetzen
(dann: durch was — Testimonials der drei Nutzer? Empfehlung eines Shaykh?
Oder gar keinen Beweis, sondern nur eine ehrliche Beschreibung?).

**5.5 Call-to-Action** — aktuell „Jetzt anfangen". ❓ Hängt an 3.2: Wenn jemand
mit leerem Konto ankommt, ist „Jetzt anfangen" ein Versprechen, das die App
nicht einlöst.

---

## 6. Keywords & SEO

**6.1 Wie findet man dich?**

✅ **Belegt, was heute hinterlegt ist:** Titel „Adrabic – Vokabeln lernen, die
hängenbleiben", Beschreibung „Lerne Vokabeln dauerhaft. Mit wissenschaftlich
bewährten Wiederholungsintervallen" (`landing.html:6,9`). Das zielt auf
**generische Vokabel-Suchen** — nicht auf „Medina Buch", nicht auf
„Arabisch lernen", nicht auf „Talab al Ilm". Wer heute nach dem sucht, was die
App eigentlich kann, findet sie nicht.

❓ **Offen:** Welche Wörter sucht deine Zielgruppe wirklich?

**6.2 Negative Keywords** — ❓ offen. Hängt an 2.1: Ohne Zielgruppe gibt es
keine Abgrenzung.

---

## 7. Die App selbst: Woran sieht man das Konzept?

**7.1 Branding in der App**

✅ **Belegt:** Die App heißt innen „Wiederholung", außen „Adrabic" (siehe 1.2).

❓ **Offen:** Soll die Message auch in die App? **Grenze beachten:**
`../CLAUDE.md` und Konzept-Abschnitt 7 verbieten, Funktionen des Lernwerkzeugs
anzufassen. Ein Splashscreen wäre eine neue Funktion — das bräuchte eine eigene
Entscheidung und eine eigene Phase, es passiert nicht nebenbei in Phase „Landing
Page".

**7.2 Gamification / Motivation**

✅ **Belegt, was es schon gibt:** Lernserie (Streak), Stufenverteilung in vier
Gruppen, Statistik, Lektionen, die nacheinander aufgehen, Benennung der Karten,
die nicht klappen. Das ist mehr, als die Frage unterstellt.

❓ **Offen:** Reicht das, oder fehlt etwas?

---

## 8. Monetarisierung

✅ **Belegt:** Abo/Bezahlfunktion steht in `../PLAN.md` unter „Später — vermerkt,
damit nichts verbaut wird". Es wird in **keiner** Phase gebaut. Die Notiz dort
existiert genau deshalb, damit heute keine Entscheidung fällt, die ein Abo
später unmöglich macht.

❓ **Offen (Input jetzt, Bau später):** Was wäre der echte Mehrwert? Und
**für die Seite jetzt entscheidend:** Soll die Startseite andeuten, dass es
später etwas Kostenpflichtiges gibt — oder „immer kostenlos" versprechen? Das
zweite ist ein Versprechen, das man später schwer zurücknimmt. Die FAQ sagt
heute „Nein, die Nutzung ist komplett kostenlos" (`landing.html`) — ohne
„derzeit", ohne Einschränkung.

---

## 9. Deine Zweifel / Fragen

❓ **Offen — und ausdrücklich kein Pflichtfeld für die Seite.** Hilft beim
Tonfall.

---

## 10. Dein Fazit

❓ **Offen.** Ein Absatz, für dich selbst: Warum machst du das wirklich?

---

## Zusammenfassung: was jetzt wirklich noch fehlt

Der Fragebogen hatte 10 Abschnitte. Beantwortet werden müssen noch **sechs
Dinge** — alles andere steht oben belegt oder folgt daraus:

1. **Der TikTok-Kanal** (1.3): Name, Größe, was du postest, wie der Aufruf am
   Ende eines Videos lautet. Ohne das gibt es keinen Funnel.
2. **Deine Zielgruppe in einem Absatz** (2.1/2.2): wer sie sind und was sie
   konkret frustriert — nicht „sie wollen Arabisch lernen".
3. **Womit ein Neuer anfängt** (3.2): eigener Kartensatz, öffentlicher
   Einsteigersatz, oder Medina Buch 1 doch öffentlich. Das ist die Frage mit
   den größten Folgen.
4. **Vokabeltrainer oder Talab-al-Ilm-Begleiter** (3.3): entscheidet die
   Headline.
5. **„Wissenschaftlich bewährt" — belegen oder ersetzen** (5.4): rechtlich
   relevant, weil dein Vater im Impressum haftet.
6. **Marke oder Person, und wie das zum Impressum passt** (1.1/1.2): darf dein
   Name auf die Seite, und heißt es innen wie außen?

Sind diese sechs beantwortet, kann `STRATEGIE.md` gebaut werden — und danach
erst die HTML.

---

## Nächster Schritt

Speichern, und im nächsten Chat öffnen: "Hier ist mein Befund ausgefüllt, bau mir die Strategie."
