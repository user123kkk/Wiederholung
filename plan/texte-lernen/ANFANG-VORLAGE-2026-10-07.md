# Vorlage: Hilfestufe 2 bei Texten – Anfangsbuchstaben, a oder b?

Stand 07.10.2026, nur gelesen und recherchiert, **nichts gebaut**.
Anlass: Betreiber 06.10.: „bei Quran, Fatiha, Bismillah, Aufdecken kommt
danach der Buchstabe ba und 3 alif, auch hier nach der Methode lieber besser
gucken ob’s Sinn macht“. Danach: „bei Wege, entweder a oder b natürlich“.

## Was heute passiert (nachgelesen)

`KONZEPT.md` § 5: Jede neue Zeile hat drei Hilfestufen: 1 lesen,
2 Anfangsbuchstaben, 3 ohne Hilfe. Stufe 2 baut `anfangsbuchstaben()`
(`app.js`): Wörter an Leerzeichen trennen, je Wort der erste Grundbuchstabe
ohne Harakat und Quran-Zeichen (`KONZEPT.md` § 8.3).

Bei „بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ“ ergibt das **ب ا ا ا**. Drei von
vier Wörtern beginnen mit dem Artikel, also mit Alif. Die Hilfe sagt dort
fast nichts. Das ist kein Sonderfall: Im Arabischen beginnen sehr viele
Wörter mit Artikel oder mit einem der kurzen Vorsilben-Buchstaben
(و ف ب ل ك).

Woher die Methode kommt: `KONZEPT.md` § 2 nennt als Quelle eine Seite zum
Auswendiglernen englischer Bibelverse und stuft sie selbst nur als
„Erfahrung“ ein. Sie wurde für eine Sprache ohne vorangestellten Artikel
beschrieben und nie am Arabischen geprüft.

## Recherche

- **Praxis in Programmen zum Quran-Auswendiglernen:** Tarteel zeigt beim
  Abfragen „the first few words of a passage“, den Rest sagt man auf; im
  Lernmodus gibt es „Peeking“: nur das erste Wort der nächsten Aya, „just
  enough to get you up and running again“. Andere blenden Wörter schrittweise
  aus. Anfangsbuchstaben als Hilfe habe ich bei keinem gefunden.
  https://support.tarteel.ai/en/articles/16557456-getting-started-with-testing
  https://tarteel.ai/blog/can-you-at-least-tell-me-the-first-word/
- **Anfangsbuchstaben in der Forschung:** gemischt. Sie wirken als
  Erinnerungsstütze für etwas, das man schon kann, vor allem für die
  Reihenfolge; eine Untersuchung fand keinen Vorteil beim Behalten.
  https://www.mempowered.memory-key.com/node/58
- **Im Repo:** `KONZEPT.md` § 2 stützt die ganze Methode ausdrücklich auf die
  Praxis des Quran-Auswendiglernens, Studien sind „nur Begleitung“.

Einordnung: Das ist Praxis und Erfahrung, keine Messung an dieser App. Die
Suche war kurz (zwei Abfragen); wer mehr Sicherheit will, fragt jemanden,
der selbst Quran lehrt.

## Die zwei Wege

### a) Artikel überspringen

Aus jedem Wort der erste Buchstabe **nach** dem Artikel. Bismillah: ب ل ر ر.

- Dafür: kleinste Änderung, die Stufe bleibt, wie sie ist. Mehr Auskunft je
  Wort als heute.
- Dagegen:
  - Die App müsste entscheiden, was ein Artikel ist. „ٱل“ am Wortanfang ist
    nicht immer einer (das Wort „ٱللَّه“ beginnt so; „ٱلَّذِي“ ebenfalls).
    Jede Regel dazu trifft manche Wörter falsch.
  - Die Vorsilben و ف ب ل ك bleiben. „وَٱلَّذِينَ“ gäbe weiter و.
  - Es zeigt Bruchstücke von Quran-Wörtern ohne Harakat, also etwas, das so
    nirgends steht. `LEHREN.md` § 2 verlangt, dass arabischer Text nicht
    verändert und nicht maschinell erzeugt wird. Schon die heutige Fassung
    liegt an dieser Grenze; a) geht weiter in dieselbe Richtung.
  - Bei kurzen Zeilen bleibt die Hilfe dünn.

### b) Erstes Wort der Zeile zeigen, Rest verdeckt

Bismillah: **بِسْمِ** … (das Wort unverändert, mit allen Zeichen).

- Dafür:
  - So wird beim Auswendiglernen des Quran tatsächlich abgefragt und
    geholfen (Anfang nennen, der Lernende setzt fort).
  - Kein Eingriff in den Text: Es steht ein ganzes Wort da, wie in der
    Quelle. Keine Regel über Artikel oder Vorsilben nötig.
  - Gleich für jede Sprache. Ein Gedicht oder ein Hadith auf Deutsch bekommt
    ebenfalls sein erstes Wort.
  - Klare Stufen: 1 alles sichtbar, 2 der Einstieg, 3 nichts.
- Dagegen:
  - Bei sehr langen Zeilen ist ein Wort wenig. Der Sprung von Stufe 1 zu
    Stufe 2 wird größer als heute bei deutschen Texten.
  - Stufe 2 und 3 liegen näher beieinander als bisher gedacht. Stufe 3 zeigt
    die vorige Zeile grau, Stufe 2 dann das erste Wort der neuen.
  - Der Auftragstext „Mit den Anfangsbuchstaben aufsagen“ und `KONZEPT.md`
    § 5/§ 8.3 müssen mitgezogen werden.

## Empfehlung: b

Begründung in einem Satz: b folgt der Praxis, auf die das ganze Text-Konzept
sich beruft, lässt jedes Wort, wie es geschrieben steht, und braucht keine
Regel, die bei manchen Wörtern falsch liegt.

Vorschlag für die Ausgestaltung, damit lange Zeilen nicht zu dünn werden:

- Zeile mit bis zu 6 Wörtern: das erste Wort.
- Längere Zeile: die ersten zwei Wörter.
- Auftragstext: „Mit dem Anfang aufsagen.“
- Wörter, die nur aus Lesezeichen bestehen (Waqf, Sajda), zählen wie heute
  nicht als Wort.

Die Grenze „6“ ist eine Setzung, kein Messwert. Im Probelauf zeigt sich, ob
sie passt.

## Was es für den Probelauf heißt

Der Probelauf (bis 29.10., nur Betreiber-Konto) misst, wie gut feste Zeilen
gehalten werden und stellt daran die Abstände ein (`WIEDERHOLEN.md` § 8).
Die Hilfestufe 2 kommt nur beim **Neu-Lernen** vor. Sie zu ändern verändert
nicht, was beim Wiederholen gemessen wird. Der Betreiber hat zur Sperre
gesagt: „ned so wild“. Mein Urteil: Das lässt sich während des Probelaufs
ändern, ohne die Auswertung zu entwerten; es gehört aber ins Logbuch der
Texte, damit die Auswertung am 29.10. weiß, ab wann anders gelernt wurde.

## Was zum Bauen gehört (wenn der Betreiber „b“ sagt)

- `anfangsbuchstaben()` ersetzen durch eine Funktion, die den Anfang der
  Zeile liefert; Aufrufer und Auftragstext; `KONZEPT.md` § 0, § 4, § 5, § 8.3.
- `t_anfangsbuchstaben.js` umschreiben: Fixture weiter aus der Quelldatei
  (kein vom Agenten geschriebener arabischer Text), Fälle Bismillah, eine
  lange Aya, eine Zeile mit Waqf-Zeichen am Anfang, eine deutsche Zeile.
- Schrift prüfen (`t_quran_schrift.js`): Das sichtbare Wort steht in der
  Quran-Schrift, mit allen Zeichen.
- Die Denkpause zählt weiter die verdeckten Wörter (`denkpauseMs`).
- Runden-Tests der Texte, Kontrast, Sprung; Bildschirmfoto der Bismillah-
  Zeile in Stufe 2 zum Ansehen.

## „Texte top“: was ich dafür als Nächstes durchsehe

Der Betreiber will den Text-Teil insgesamt „perfekt“. Das ist mehr als diese
eine Stufe. Reihenfolge, je Punkt lesen, am Bildschirm ansehen, Fund
aufschreiben, dann erst bauen:

1. Anlegen: Text einfügen, Sure wählen, Zeilen trennen, lange Texte.
2. Neu lernen: alle drei Stufen, „Am Stück“, „Hakt“, Abbruch, Rückgängig.
3. Wiederholen: Kreis, Nachbarn, Tagesmenge, Denkpause, Kontrollfrage.
4. Wortlaut jeder Meldung und jedes Knopfes (er wollte die App-Texte „am
   Ende gemeinsam umformulieren“, `KONZEPT.md` § 1).
5. Darstellung: Quran-Schrift, Kreiszeichen, 320 px, iPad.
6. Was nur am iPhone zu sehen ist (G2, G3).
