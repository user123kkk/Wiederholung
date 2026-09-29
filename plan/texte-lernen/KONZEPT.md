# Texte auswendig lernen – Plan

**Status:** Plan, **kein Bauauftrag**. Offene Frage Q1 (`plan/PLAN.md`),
Idee F-12 (`plan/grossplan/FUNKTIONEN.md`). Gebaut wird erst nach den
Entscheidungen in § 10, und erst wenn der laufende Codex-Zyklus samt
Claude-Gesamtprüfung (`grossplan/AUFTRAG.md` § 2c) fertig ist – nie
gleichzeitig mit Codex an `app.js`/`styles.css`.

Grenzen, die immer gelten (`plan/LEHREN.md` § 2): Den Wortlaut von Quran
und Hadith schreibt kein Agent; er kommt von den Nutzenden. Die bestehende
Lernlogik für Karten (Stufen, Abstände, Freischalten) bleibt, wie sie ist.

---

## 0. In einfachen Worten

- In einem Bereich kann man neben Karten jetzt auch einen **Text** anlegen:
  einen Vers-Abschnitt, ein Gedicht, einen Hadith. Man fügt ihn ein, jede
  Zeile wird ein Lernschritt.
- **Neu lernen** geht Zeile für Zeile. Erst liest man die Zeile, dann sieht
  man nur noch die ersten Buchstaben jedes Wortes, dann gar nichts mehr und
  sagt sie auswendig. Nach jeder neuen Zeile sagt man alles bisher Gelernte
  am Stück auf.
- **Gelernt** ist eine Zeile, wenn man sie einmal ohne Hilfe fließend
  aufsagen kann. Ab dann kommt sie wieder – wie Karten, erst oft, dann
  seltener.
- Beim **Wiederholen** kommt der Text **der Reihe nach**, nie durcheinander.
  Hakt eine Zeile, tippt man nur diese an; nur sie kommt früher wieder.
- Kann man schon einen Teil (z. B. 15 von 30 Versen), markiert man ihn beim
  Anlegen. Er wird dann nur kurz geprüft, neu gelernt wird ab Zeile 16.
- Jeden Tag: erst das Wiederholen, dann ein paar neue Zeilen (Standard 3).
- Recht: Ein Quran-Text im Konto kann etwas über den Glauben verraten. Das
  ist geprüft (§ 9); gelöst mit einem kurzen Satz beim ersten Text und einem
  Absatz in der Datenschutzerklärung.
- Gebaut wird in sieben Stufen (§ 11), jede mit eigenem Test.

---

## 1. Gedanken des Betreibers (29.09.2026, frei gesprochen)

Sinngemäß festgehalten. Ausdrücklich **Gedanken, keine Vorschläge oder
Beschlüsse**, vermutlich unvollständig.

- Heute: ein Bereich mit allem aus dem Medina-Buch, Band 1.
- Wunsch: Quran-Verse auswendig lernen; auch Texte aus Büchern, z. B.
  Hadith-Sammlungen. Dialoge eher nicht.
- Beim Anlegen muss der Text sinnvoll „in eine Karte passen“.
- Abfragen: unsicher, ob Zufall oder feste Reihenfolge besser ist.
- Stufen/Wiederholung: unsicher, ob sie sich übertragen lassen. Für viele
  ist unklar, wann etwas „gelernt“ ist. Gedanke: wenn man es **fließend**
  aufsagen kann – ab dann ist Wiederholung sinnvoll.
- Gedanke (kein Vorschlag): beim Anlegen eine Kategorie wählen (Grammatik,
  Vokabeln, Verse/Gedichte …), je Kategorie andere Funktionen. Nicht zu
  kompliziert.
- Einheit: Zeile für Zeile. Offen: Wenn von 30 Versen 15 sitzen – bei 1
  anfangen oder an einer gewählten Stelle?
- Eine Methode, die er **kennt, aber selbst nicht nutzt**: Zeile 1 lernen,
  dann Zeile 2, dann 1+2 zusammen, dann Zeile 3 dazu usw. Methoden
  einzubauen wäre ein echter Mehrwert.
- Ziel: echter Mehrwert. Texte in der App werden am Ende noch einmal
  gemeinsam umformuliert, wie bei früheren Funktionen.

---

## 2. Recherche (für die bauenden Agenten)

| Befund | Quelle | Folgerung |
|---|---|---|
| Kumulatives Wiederholen (1, dann 1–2, dann 1–3 …) sichert die Reihenfolge; jede Zeile wird Hinweis für die nächste. | [PubMed 37768613](https://pubmed.ncbi.nlm.nih.gov/37768613/), [PMC4416471](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4416471/) | Kern des Neu-Lernens (§ 5.3). |
| Selbst abrufen schlägt Wiederlesen: Prosa nach einer Woche 61 % gegen 40 %. Wiederleser schätzen sich am besten ein und behalten am wenigsten. | [Roediger & Karpicke 2006](https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x) | Lesen nur als erste Hilfestufe; „gelernt“ nur nach Aufsagen ohne Hilfe. |
| Nachlassende Hilfen (voll → weniger → nichts); Belege gemischt. | [Glisky u. a. 1986](https://link.springer.com/rwe/10.1007/978-0-387-79948-3_1101) | Drei Hilfestufen (§ 5.3). |
| Anfangsbuchstaben: Hinweis ohne Lösung, erzwingt Abruf (Praxiswissen). | [Bible Memory Goal](https://www.biblememorygoal.com/memory-methods/first-letter-bible-memory-method-explained/) | Mittlere Hilfestufe. |
| Tagesablauf beim Quran-Auswendiglernen: neu, kürzlich Gelerntes, Älteres; Wiederholen vor Neuem; Anfänger 3–5 Zeilen am Tag. | [The Hifz Project](https://thehifzproject.com/articles/sabaq-sabqi-manzil), [MaktabPro](https://www.maktabpro.com/blog/sabaq-sabqi-manzil) | Nur die Methodik: „erst wiederholen, dann neu“, Standard 3 Zeilen. |
| Texte in fester Reihenfolge üben; beim Abfragen vorherige Zeilen als Hinweis, nie die folgende (Praxiswissen). | [SuperMemo-Blog](https://thesupermemoblog.wordpress.com/2010/02/28/memorizing-poems-with-spaced-repetition/), [Borretti](https://borretti.me/article/effective-spaced-repetition) | Reihenfolge innerhalb eines Textes fest (§ 5.5). |
| Auch indirekt sensible Daten fallen unter Art. 9 DSGVO. | [EuGH C-184/20](https://www.activemind.legal/de/guides/urteil-eugh-sensible-daten/) | § 9. |

---

## 3. Grundentscheidung und warum

Ein **Text** ist in einem Bereich die zweite Art Inhalt neben der Karte.
Er besteht aus **Zeilen**. Jede Zeile hat ihren eigenen Lernstand, gesteuert
von denselben Stufen und Abständen wie Karten (`intervalForStufe`,
`app.js:122`). Neu gelernt wird kumulativ mit nachlassenden Hilfen;
wiederholt wird in Reihenfolge und im Zusammenhang.

Warum nicht viele Kategorien (Grammatik, Vokabeln, Verse …): Grammatik und
Vokabeln lernen sich heute gleich (Frage → Antwort). Nur Texte brauchen
einen anderen Ablauf. Zwei Arten halten das Anlegen einfach (LEHREN § 6.9).
Kategorien bleiben als Möglichkeit für später (T1).

Warum Zeilen als Karten-Dokumente (§ 6): Speicherung, Mehrgeräte-Abgleich,
Offline, Rückgängig, Sicherung und Löschen sind für Karten schon gebaut und
in den Runden 12/13 gehärtet. Ein zweites, eigenes Speichersystem würde all
diese Fehler neu ermöglichen.

---

## 4. Begriffe

| Begriff | Bedeutung |
|---|---|
| Text | Titel + geordnete Liste von Zeilen, gehört zu genau einem Bereich |
| Zeile | kleinste Lerneinheit; ein Karten-Dokument mit `textId` |
| Portion | die neuen Zeilen eines Tages (Standard 3) |
| Abschnitt | beim Wiederholen: zusammenhängende fällige Zeilen eines Textes |
| Hinweiszeilen | bis zu 2 Zeilen **vor** einem Abschnitt, grau, nur zur Orientierung |
| Hilfestufe | 1 Lesen · 2 Anfangsbuchstaben · 3 ohne Hilfe |

---

## 5. Regeln des Systems

### 5.1 Zustände einer Zeile

**Für Texte gilt `WIEDERHOLEN.md` § 1** (neu · frisch · fest). Der Absatz
unten beschreibt nur die Karten.

Dieselben sechs Zustände wie Karten (`KARTEN_ZUSTAENDE`, `app.js:3723`):
neu (nie bewertet) → im Lernen (Stufe 0) → frisch (1–3) → wird fester (4–6)
→ gefestigt (7–9) → dauerhaft (10+). Keine Stufenzahlen sichtbar
(Betreiber 24.09.2026).

### 5.2 Tagesplan eines Textes

1. **Wiederholen zuerst:** alle Zeilen mit `nextReview <= heute` und
   `ersteBewertung` gesetzt, in Textreihenfolge, zu Abschnitten gruppiert
   (§ 5.5).
2. **Dann neu:** die nächsten nie bewerteten Zeilen in Textreihenfolge, bis
   die Tagesportion erreicht ist. Gezählt wird, wie viele Zeilen dieses Textes
   heute `ersteBewertung == heute` bekommen haben.
3. Neue Zeilen erst, wenn alle fälligen Wiederholungen dieses Textes erledigt
   sind (Hifz-Praxis). Überspringen: ein Knopf „Trotzdem neu lernen“ – nicht
   versteckt, aber nachrangig.
4. Ein Text ohne fällige und ohne neue Zeilen zeigt „Heute fertig“.

### 5.3 Neu lernen (Portion)

Für jede neue Zeile i der Portion:
1. Hilfestufe 1: Zeile voll sichtbar, Knopf „Weiter“.
2. Hilfestufe 2: Anfangsbuchstaben (§ 8.3); Knopf „Aufdecken“, danach
   „Konnte ich“ / „Noch nicht“. „Noch nicht“ → zurück zu Stufe 1 dieser Zeile.
3. Hilfestufe 3: Zeile verdeckt, Hinweiszeile i−1 sichtbar; „Aufdecken“,
   dann „Konnte ich“ / „Noch nicht“ (→ zurück zu Stufe 2).
4. **Kumulativ:** Die bisherigen Zeilen der Portion (1..i) ohne Hilfe am
   Stück aufsagen, dann aufdecken und bewerten: „Fließend“ / „Hakt“. Bei
   „Hakt“ tippt man die hakende(n) Zeile(n) an → diese wieder ab Stufe 2,
   danach erneut kumulativ.
5. Nach der letzten Zeile und „Fließend“: **gelernt**. Jede Zeile der Portion
   bekommt `ersteBewertung = heute`, `stufe = 1`, `maxStufe = max(…,1)`,
   `nextReview = nextReviewForStufe(1)` (`app.js:130`). Verlauf: je Zeile
   einmal „n“ (§ 5.7).
6. Abbruch mitten in der Portion: nichts wird gespeichert, die Zeilen bleiben
   neu. (Keine halben Zustände in der Cloud.)

### 5.4 Teilwissen beim Anlegen

„Diese Zeilen kann ich schon“ – Bereich von Zeilen markieren. Diese Zeilen
werden sofort **fällig zur Kontrolle**: `ersteBewertung = heute`,
`stufe = 0`, `nextReview = heute`. Die erste Wiederholung zeigt dann, ob sie
wirklich sitzen („Sicher“ → Stufe 1 usw.). Neu gelernt wird ab der ersten
nicht markierten Zeile. (T6)

### 5.5 Wiederholen

**Ersetzt durch [`WIEDERHOLEN.md`](WIEDERHOLEN.md)** (neu/frisch/fest, Kreis,
Nachbarn). Die Punkte unten gelten nur, wo `WIEDERHOLEN.md` nichts sagt.

- **Abschnitte bilden:** fällige Zeilen in Textreihenfolge; aufeinander
  folgende Zeilen bilden einen Abschnitt (Größe: T12, offen bis § 16). Vor
  jedem Abschnitt bis zu 2 Hinweiszeilen (die direkt vorhergehenden, auch
  wenn nicht fällig). Nie die folgende Zeile zeigen.
- **Ablauf je Abschnitt:** Hinweiszeilen sichtbar, Abschnitt verdeckt →
  auswendig aufsagen → „Aufdecken“ → bewerten.
- **Bewertung:** „Sicher“ gilt für alle Zeilen. Oder hakende Zeilen antippen
  und je Zeile „Fast“ oder „Nicht“ wählen; nicht angetippte Zeilen gelten
  als „Sicher“. Wirkung je Zeile genau wie bei Karten
  (`app.js:5808–5832`): Sicher +1 Stufe, Fast −1 und morgen wieder, Nicht −2
  und heute noch einmal.
- „Nicht“-Zeilen kommen am Ende derselben Sitzung noch einmal (als eigener
  Abschnitt mit Hinweiszeilen), wie Karten mit `nextReview = heute`.
- **Reihenfolge der Texte** (T4): ein Text nach dem anderen, jeder als
  geschlossener Block in Textreihenfolge; nie gemischt. Welcher Text zuerst
  kommt: der mit dem ältesten `nextReview`.

### 5.6 Tageslimit und Sitzungsgröße

- Neue Zeilen (T7): keine Einstellung, kein hartes Limit. Nach 3 neuen
  Zeilen eines Textes an einem Tag ein ruhiger Satz, dass es für heute gut
  ist; weiterlernen bleibt möglich. Zählt nicht gegen das Kartenlimit.
- Wiederholen: kein Limit; bei sehr vielen fälligen Zeilen gilt
  `settings.sitzungsLimit` sinngemäß als Zahl der **Abschnitte**.

### 5.7 Serie, Tagesprotokoll, Fortschritt

- Jede bewertete Zeile zählt wie eine Karte ins Tagesprotokoll
  (`verlaufZaehle`, `app.js:801`): neu gelernt = „n“, wiederholt = „w“.
  Damit hält Textlernen die Serie (T8) ohne neue Logik.
- Fortschritt: pro Text ein Balken aus Zeilen in den sechs Zuständen;
  Kartenstatistik ohne Textzeilen (sonst verzerrt ein 286-Vers-Text die
  Vokabelzahlen). Kalender und Woche nutzen das Protokoll und zählen beides.

### 5.8 Rückgängig

Wie bei Karten (`undoLastGrade`, `app.js:5914`), aber für einen ganzen
Abschnitt bzw. eine ganze Portion: `lastAction` speichert den Vorzustand
**aller** betroffenen Zeilen und nimmt die Protokollzähler je Zeile zurück.

### 5.9 Bearbeiten und Löschen

- Zeile ändern: Lernstand bleibt, außer der Text wird stark verändert
  (T13: bei Änderung Lernstand behalten oder zurücksetzen – Empfehlung
  behalten; man merkt es beim nächsten Wiederholen).
- Zeile einfügen: neu. Zeilen zusammenfügen: niedrigster Lernstand gewinnt.
  Zeile teilen: beide Teile behalten den Lernstand.
- Text löschen: alle Zeilen-Dokumente und der Text weg, mit derselben
  Sicherung wie Bereich löschen (Backup anbieten, Titel eintippen;
  `deleteBereich`, `app.js:~4771`).

---

## 6. Speicherung und Datenmodell

### 6.1 Zeile = Karten-Dokument

`users/{uid}/karten/{cid}` wie heute, dazu ein Feld:

| Feld | Inhalt |
|---|---|
| `wort` | die Zeile (bis 1000 Zeichen, wie heute) |
| `uebersetzung` | Übersetzung/Notiz, darf leer sein |
| `extra` | optional, wie heute |
| `textId` | **neu**: Id des Textes; fehlt bei normalen Karten |
| übrige | `stufe`, `nextReview`, `ersteBewertung`, `maxStufe`, `rueckfaelle`, `order`, `bereichId` wie heute |

`kartenFelder()` (`app.js:677`) nimmt `textId` auf; alle Wege, die Karten
schreiben, laufen darüber.

### 6.2 Text = Speicherkarte der Art „text“

Im Bereichsdokument unter `sets` (Map, heute bis 500 Einträge):
`{ name: Titel, order, art: "text", cardIds: [Zeilen-Ids in Reihenfolge],
portion: 3 }`. Die Reihenfolge der Zeilen ist allein `cardIds`.
`SET_ARTEN` (`app.js:447`) bekommt „text“; Anzeige- und Erklärungslisten
(`SET_ARTEN_ANZEIGE`, `SET_ART_TITEL`, `SET_ART_ERKLAERUNG`) ebenso.

### 6.3 Firestore-Regeln

- `kartenFelder()` in `firestore.rules:~224`: `textId` ergänzen,
  `kartenWerte`: `textOderNull(d.textId, 200)`.
- `sets` wird heute nur als Map mit Größe geprüft – keine Änderung nötig.
  `portion` im Set: prüfen, ob Set-Inhalte irgendwo validiert werden
  (`grep setFelder`), sonst keine Regel nötig.
- Emulator-Test: neue Karte mit/ohne `textId`, zu langes `textId`, fremdes
  Konto. Gegenprobe gegen die alten Regeln (muss `textId` ablehnen).
- **Reihenfolge beim Veröffentlichen:** erst Regeln, dann Hosting.

### 6.4 Grenzen

- Bereichsdokument 1 MiB: 286 Zeilen-Ids (Al-Baqara) ≈ 6 KB – unkritisch.
  Obergrenze je Text: 1000 Zeilen (Prüfung beim Anlegen).
- Eine Zeile über 1000 Zeichen: beim Anlegen ablehnen und anbieten zu teilen.

### 6.5 Keine Migration

Bestehende Karten haben kein `textId` und bleiben unverändert. Ältere
App-Versionen auf anderen Geräten sehen Textzeilen als normale Karten – bis
zum nächsten Start mit neuer Version (Service Worker, zweiter Start). Das ist
harmlos, weil nichts verloren geht; im Changelog nennen.

---

## 7. Stellen im bestehenden Code (alle anfassen)

Jede Stelle, die `b.karten` durchläuft, muss entscheiden, ob Textzeilen
dazugehören. Helfer: `istTextZeile(c) = !!c.textId`. Liste (vor dem Bau per
`grep -n "\.karten"` vervollständigen, LEHREN § 6.2):

| Stelle | Heute | Mit Texten |
|---|---|---|
| `dueCardsFor` (`app.js:3605`) | fällige Karten | Textzeilen **ausschließen** |
| `freieIdsFor` / Lektionen (`app.js:338–386`) | Freischalten in geführten Bereichen | Textzeilen nie Teil von Lektionen; unberührt |
| `startSession`, `renderSession` | Kartenabfrage | unverändert; Texte eigene Sitzung |
| Üben/Drill (`UEBEN_GRUPPEN`, `drillGruppenKarten` `app.js:5237–5260`) | alle Karten | Textzeilen ausschließen |
| Fortschritt, `stufenVerteilung` (`app.js:3885`) | alle Karten | ohne Textzeilen; Texte eigener Block |
| Verwalten-Liste (`renderVerwaltenListe` `app.js:11376`) | alle Karten | Textzeilen nicht als Karten; Texte eigener Abschnitt |
| Suche | alle Karten | Treffer in Textzeilen zeigen den Text |
| Duplikat-Warnung (`findeDuplikat` `app.js:5492`) | über alle Karten | Textzeilen ausnehmen |
| Speicherkarten-Panel (`renderSetsPanel` `app.js:11733`) | drei Arten | „text“ nicht als normale Speicherkarte zeigen |
| Sicherung `exportBackup` (`app.js:4006`) | ganzer Bereich | enthält Texte automatisch (Felder prüfen) |
| Einspielen `verarbeiteImportDaten` (`app.js:4607`) | Karten/Sets | `textId` und Set-Art „text“ annehmen; Ids beim Einspielen neu vergeben und `cardIds` mitziehen |
| Weitergabe/Code-Teilen `baueWeitergabeBereich` (`app.js:4045`) | Lektionen ohne Lernstand | Texte vorerst **nicht** weitergeben (T11) |
| Bereich löschen, Konto löschen | Karten einzeln löschen | Textzeilen sind Karten → schon abgedeckt; testen |
| Karte verschieben zwischen Bereichen | `patchDoc` | Textzeilen nicht einzeln verschiebbar; ganzer Text nur als Ganzes (später) |
| Tageszähler je Bereich (`bereichHeuteZaehle`) | Karten | Zeilen zählen mit |

---

## 8. Oberfläche

### 8.1 Bildschirme

1. **Anlegen-Auswahl** (Blatt): „Karte“ / „Text“. Nur zwei Knöpfe.
2. **Text anlegen:** Titel, großes Eingabefeld (Einfügen), darunter
   Vorschau der Zeilen nummeriert; je Zeile: zusammenfügen mit nächster,
   teilen; Bereich „kann ich schon“ markieren; Knopf „Anlegen“.
3. **Lernen-Tab:** unter den Karten ein Block „Texte“: je Text Titel,
   Fortschrittsbalken, „Heute: X wiederholen, Y neu“ oder „Heute fertig“.
4. **Text-Sitzung:** eine Zeile bzw. ein Abschnitt groß, Hinweiszeilen grau
   darüber; unten die Knöpfe des jeweiligen Schritts (§ 5.3/5.5).
5. **Text-Ansicht** (Verwalten): alle Zeilen mit Zustand-Punkt; Bearbeiten,
   Löschen.

### 8.2 Zustände, die jeder Bildschirm können muss (LEHREN § 5.5)

leer · 1 Zeile · 286 Zeilen · sehr lange Zeile · Arabisch mit Harakat ·
offline · Speicherfehler · hell/dunkel · reduzierte Bewegung · kleines Handy
320 px · iPad hoch/quer · Tastatur offen beim Einfügen.

### 8.3 Arabisch

- Richtung je Zeile mit `istArabisch` (`app.js:269`); Quran-Schrift wie bei
  Karten nach Einstellung.
- Anfangsbuchstaben: Wort = Trennung an Leerzeichen; vom ersten Buchstaben
  alle Harakat und Quran-Zeichen entfernen (U+0610–061A, U+064B–065F, U+0670,
  U+06D6–06ED); Waqf-Zeichen als eigenes „Wort“ weglassen. Gegenprobe mit
  echtem Vers-Text aus einem Test-Fixture, das die Nutzerin/der Betreiber
  liefert – der Agent erzeugt keinen.
- Nicht-arabische Texte: erster Buchstabe + Satzzeichen bleiben.

### 8.4 Regeln aus dem README/LEHREN

Ein delegierter Klick-Listener über `data-action` (neue Aktionen z. B.
`text-anlegen`, `text-lernen`, `text-weiter`, `text-aufdecken`,
`text-bewerten`, `text-zeile-hakt`); Eintrittsbewegungen nur `@keyframes`;
nichts erscheint nachträglich unter dem Finger (§ 6.1); Zustand in `ui`,
nicht nur im DOM (§ 6.3); eine Aufgabe pro Bildschirm.

---

## 9. Rechtliche Prüfung (durch den Agenten, 29.09.2026)

**Frage:** Wird mit einem Quran- oder Hadith-Text im Konto eine besondere
Kategorie personenbezogener Daten (Religion, Art. 9 DSGVO) verarbeitet?

**Bewertung:** Ja, möglicherweise. Der EuGH (C-184/20, 01.08.2022) zählt
auch Daten dazu, aus denen sich eine sensible Information **indirekt**
ergibt. Ein gespeicherter Quran-Text kann auf den Glauben schließen lassen,
auch wenn die App nichts dazu fragt. Dasselbe gilt schon heute für Karten
aus dem Medina-Buch; mit Texten wird es deutlicher.

**Lösung (in den Bau eingeplant):**
1. **Einwilligung** (Art. 9 Abs. 2 lit. a): beim ersten Text einmalig ein
   kurzer Satz mit Knopf, sinngemäß: „Deine Texte speichern wir in deinem
   Konto, nur für dich. Aus ihnen kann man auf deine Überzeugungen schließen.
   Einverstanden?“ Wortlaut stimmt der Betreiber ab. Zustimmung als
   Zeitstempel im Nutzerdokument (neues Feld → Regel).
2. **Datenschutzerklärung:** Absatz zu Texten, Einwilligung, Widerruf
   (= Texte löschen), gleiche Speicherorte wie Karten.
3. **Datensparsam:** kein Feld „Quran“ o. ä., keine Auswertung von Inhalten,
   kein Teilen von Texten in Stufe 1, keine Statistik über Inhalte.

**Restrisiko:** Eine KI-Prüfung ersetzt keine Prüfung durch einen Anwalt.
Nach Betreiber-Entscheidung vom 29.09.2026 wird trotzdem gebaut.

---

## 10. Entscheidungen des Betreibers (29.09.2026)

Antworten des Betreibers, wo er „check ich nicht“ oder „entscheide du“
sagte, hat der Agent nach Empfehlung entschieden (markiert mit *).

| Nr | Frage | Entschieden |
|---|---|---|
| T1 | Anlegen: nur „Karte“ oder „Text“? | Karte/Text |
| T2 | Jede Zeile ein Lernschritt? | ja* |
| T3 | Neu lernen: lesen → Anfangsbuchstaben → ohne Hilfe, Bisheriges am Stück | ja, später am Gerät nachschärfen |
| T4 | Reihenfolge | **nur Reihenfolge, nirgends gemischt** – auch nicht zwischen Texten in einer Sitzung: ein Text nach dem anderen, jeder als Block. Kein Mischen im Üben-Modus. |
| T5 | Gelernt = einmal fließend ohne Hilfe | ja |
| T6 | Schon Gekonntes markieren | ja* |
| T7 | Neue Zeilen pro Tag | **keine Einstellung.** Man lernt, so viel man will; nach 3 neuen Zeilen ein ruhiger Satz „Für heute ist das gut – weiter geht es trotzdem“.* |
| T8 | Serie | ja; Regel bleibt wie heute, Texte zählen gleich; Ehrlichkeit über Kreis und eigene Zahl (`WIEDERHOLEN.md` § 7) |
| T9 | Preis | kostenlos |
| T10 | Einverständnis beim ersten Text (§ 9) | ja* |
| T11 | Teilen/Lehrer-Code | später |
| T12 | Abschnittsgröße beim Wiederholen | bis 5 Zeilen, jederzeit aufhören (`WIEDERHOLEN.md` § 4) |
| T13 | Lernstand bei geänderter Zeile | bleibt |
| T14 | Texte in vom Lehrer vorgegebenen Bereichen | nein, nur eigene Bereiche* |
| T15 | Quran in der App mitliefern (Sure wählen und lernen) | **ja, gewünscht** → § 15 |
| T16 | Wiederholen für alles neu denken | **ja, gewünscht** → § 16, vor dem Bau |

Außerdem (Betreiber): Im Projekt steckt viel mehr – Namen, Gestaltung,
Methoden –, alles nach den Regeln des Repos und mit der Zeit mehr.

## 15. Quran in der App mitliefern (T15)

**Wunsch des Betreibers:** Den Quran nicht selbst eintippen müssen, sondern
eine Sure wählen und lernen. Der Quran ist unverfälscht bewahrt und überall
frei verfügbar; auch viele Bücher werden von ihren Autoren frei gegeben.

**Einordnung:** Das ist kein Verfassen religiöser Inhalte durch einen Agenten
(LEHREN § 2 Punkt 1), sondern das unveränderte Übernehmen eines geprüften
Textes. Bedingungen:

1. **Quelle** passend zum Rahmen (Quran und Sunnah nach dem Verständnis der
   Salaf): Kandidat ist der Text des King-Fahd-Komplexes (Mushaf al-Madinah,
   Hafs), dessen Schrift die App schon nutzt (`fonts/UthmanicHafs1Ver18.ttf`).
   Die Quelle bestätigt der Betreiber vor dem Bau.
2. **Lizenz** vor dem Bau nachlesen und ins Logbuch (darf man den Text in
   einer App ausliefern, unverändert?).
3. **Unverändert:** Datei so übernehmen, wie sie kommt; Prüfsumme festhalten;
   ein Test vergleicht Stichproben (Anzahl Suren 114, Verse 6236).
4. **Selbst ausliefern**, nicht von einem fremden Server laden (LEHREN § 12:
   fremde Server bekommen die IP-Adresse). Als Datei im Repo, erst beim
   Öffnen der Sure-Auswahl geladen, danach offline verfügbar.
5. **Anlegen aus dem Quran:** Sure wählen, optional Versbereich → wird ein
   Text wie in § 5; jeder Vers eine Zeile, Versnummer sichtbar. Der Text ist
   danach eine normale Kopie im Konto (Datenschutz § 9 gilt).
6. **Hadith- und andere Bücher:** später, einzeln je Buch, nur mit klarer
   Freigabe des Autors bzw. Verlags.

## 16. Neu denken: eine Wiederholungs-Methode für alles (T16)

**Wunsch des Betreibers:** Das Wiederholen komplett neu durchdenken – eine
Methode, die Karten, Texte und alles, was dazugehört, verbindet. Seine Frage:
Wie hat man am Ende wirklich **alle** Ayat ohne Probleme im Kopf? Wer ein
paar Ayat kann und woanders weitermacht, wird bei den ersten schwächer.
Außerdem: Die Serie soll ehrlich bleiben – niemand soll sie mit Drücken ohne
echtes Können halten, bei Texten wie bei Karten.

**Das ist eine Änderung der Lernlogik** (heute tabu, LEHREN § 1/Konzept § 7).
Der Betreiber verlangt sie ausdrücklich; gebaut wird trotzdem erst nach
einem fertigen Konzept und seinem „ja“ dazu.

**Grundsatz (Betreiber):** kein abgehakter Punkt und nicht auf einzelne
Studien gestützt, sondern ein Mehrwert, der funktioniert – bewährt in der
Praxis und von der App an echten Ergebnissen selbst geprüft.
**Erster Entwurf:** [`WIEDERHOLEN.md`](WIEDERHOLEN.md) (drei Töpfe, Kreis,
Selbstregelung, Probelauf im Betreiberkonto).

Fragen, die der Entwurf beantworten muss:

1. **Alles behalten:** Wie sorgen bewährte Methoden dafür, dass ältere
   Teile nicht verblassen? (Beim Quran-Auswendiglernen: tägliche Rotation
   durch alles Gelernte; in der Forschung: verteiltes Wiederholen.) Wie
   verbindet man beides – feste Rotation für Texte, Abstände für Karten, oder
   eines für alles?
2. **Wo anfangen, wo weitermachen:** feste Reihenfolge durch eine Sure,
   Stelle merken, Rückkehr nach Pausen.
3. **Wie viel am Stück:** Abschnittsgröße (T12), jederzeit aufhören können
   ohne Nachteil.
4. **Ehrlichkeit:** Wege gegen „drücken ohne können“ – z. B. Aufdecken erst
   nach kurzer Denkzeit, Stichprobe „sag das nächste Wort“, oder nur ein
   Hinweis. Abwägen gegen Nerven (Betreiber-Grundsatz „ohne Nerven“).
5. **Karten mit einbeziehen:** Was davon verbessert auch das Karten-
   Wiederholen, ohne bestehende Lernstände zu entwerten?

Ergebnis: zwei bis drei Varianten, einfach erklärt, mit Empfehlung; dann
entscheidet der Betreiber. Erst danach werden § 5 und der Bauplan § 11
angepasst.

## 11. Bauplan

Jede Stufe ist eine Runde nach `grossplan/AUFTRAG.md` § 2 mit Gegenprüfung
§ 2a; eine Version je Stufe. Nach Stufe 6 Claude-Gesamtprüfung (§ 2c).

### Stufe 0 – Vorbereitung
- Entscheidungen T1–T14 in `grossplan/ENTSCHEIDUNGEN.md` übernehmen.
- `grep -n "\.karten" app.js` → Tabelle § 7 vervollständigen, fehlende
  Stellen als Aufgaben `TX-…` in `grossplan/AUFGABEN.md`.
- Fixture: kurzer arabischer Text mit Harakat, vom Betreiber geliefert;
  zusätzlich ein nichtreligiöser deutscher Gedichttext (gemeinfrei).
- **Abnahme:** Tabelle vollständig mit Zeilennummern; Fixtures liegen in
  `plan/werkzeuge/pruefstand/fixtures/`.

### Stufe 1 – Daten und Regeln (Modell: Astra)
- `textId` in `kartenFelder()`, Regeln § 6.3, Einwilligungsfeld § 9.
- Set-Art „text“ in allen Listen (§ 6.2).
- `istTextZeile` und Ausschluss an allen Stellen aus § 7 (nur Ausschluss,
  noch keine Oberfläche).
- **Tests:** Regeln-Emulator (neu: `textId` ok, zu lang, fremdes Konto;
  Gegenprobe alte Regeln lehnen ab); `t_text_ausschluss.js`: Bereich mit
  Karten + Textzeilen → Kartenabfrage, Üben, Statistik, Duplikat zählen nur
  Karten (Gegenprobe gegen Stand vor Stufe 1 zählt Textzeilen mit);
  Mehrgeräte/Offline mit echtem SDK gegen Emulator (wie Runde 12).
- **Abnahme:** alle grün; `abnahme_runde.js` 13/13 (Kartenrunde unverändert).

### Stufe 2 – Anlegen, Bearbeiten, Löschen, Sicherung (Modell: Sol mittel)
- Bildschirme 8.1 Nr. 1, 2, 5; Einwilligung beim ersten Text.
- Einfügen → Zeilen; zusammenfügen/teilen; „kann ich schon“ (§ 5.4).
- Löschen mit Sicherung; Export/Import (§ 7).
- **Tests:** `t_text_anlegen.js`: 30 Zeilen Arabisch mit Harakat anlegen,
  Zeilen 1–15 markieren → 15 fällig heute, 15 neu; bearbeiten; löschen
  entfernt alle Zeilen-Dokumente; Export → Import ergibt identischen Text
  mit neuen Ids und richtiger Reihenfolge; Zeile > 1000 Zeichen abgelehnt;
  Einwilligung genau einmal. Alle Bildschirmzustände § 8.2.
- **Abnahme:** grün; Datenschutzerklärung im selben Commit.

### Stufe 3 – Neu lernen (Modell: Sol mittel)
- Text-Sitzung Neu-Lernen § 5.3, Anfangsbuchstaben § 8.3.
- **Tests:** `t_text_neu.js`: Portion 3 Zeilen komplett; „Noch nicht“ führt
  eine Stufe zurück; „Hakt“ bei Zeile 2 nur diese wiederholen; Abbruch
  speichert nichts; nach Abschluss je Zeile Stufe 1 und Protokoll „n“ +3;
  Rückgängig nimmt alles zurück. Anfangsbuchstaben-Test mit Fixture:
  Harakat entfernt, Wortzahl gleich. Reduzierte Bewegung, 320 px, iPad.
- **Abnahme:** grün; Gerätetest durch Betreiber (Aufsagen fühlt sich
  richtig an).

### Stufe 4 – Wiederholen (Modell: Astra)
- Nach `WIEDERHOLEN.md` §§ 1–5 und 7: Zustände, Kreis, Nachbarn, Tagesmenge,
  Kontrollfrage; Tests `WIEDERHOLEN.md` § 9.
- Abschnitte § 5.5, Bewertung je Zeile, „Nicht“ am Ende erneut.
- Tagesplan § 5.2 inkl. „erst wiederholen“.
- **Tests:** `t_text_wiederholen.js`: fällige Zeilen 3,4,5,9 → Abschnitte
  [3–5] mit Hinweis 1–2 und [9] mit Hinweis 7–8; nie Zeile 6 bzw. 10
  sichtbar; nur angetippte Zeilen verlieren Stufen; Abstände wie Karten
  (`intervalForStufe`); Texte nach Dringlichkeit; 286-Zeilen-Text
  Leistung (CPU 4×, kein Bild > 50 ms beim Aufbau); zwei Geräte bewerten
  denselben Text.
- **Abnahme:** grün, Affe mit Texten 0 Befunde.

### Stufe 4b – Regler für Karten (Modell: Astra)
- `WIEDERHOLEN.md` § 6, nur hinter dem Probelauf-Schalter (§ 8).
- **Abnahme:** `t_regler_karten.js` grün inkl. Gegenprobe; `abnahme_runde.js`
  13/13 für Konten ohne Schalter.

### Stufe 5 – Fortschritt und Lernen-Tab (Modell: Sol niedrig)
- Block „Texte“ im Lernen-Tab, Balken je Text, Kartenstatistik ohne Zeilen,
  Serie über Protokoll.
- **Tests:** Zahlen stimmen mit gespeicherten Zeilen; keine Stufenzahlen im
  DOM; Serie hält an einem Tag nur mit Textwiederholung.

### Stufe 6 – Gesamtprüfung
- Voller Prüfstand, `abnahme_runde.js`, Affe Handy 200 / iPad 150 mit
  Texten, Kontrast/A11y, Gerätetest iPhone durch den Betreiber.
- Texte in der App gemeinsam mit dem Betreiber umformulieren.
- Claude-Gesamtprüfung nach `AUFTRAG.md` § 2c.

---

## 12. Was nicht gebaut wird

- Spracherkennung beim Aufsagen.
- Automatisches Laden von Quran- oder Hadith-Text aus dem Netz.
- Religiöse Beispieltexte durch Agenten.
- Teilen von Texten (bis T11 anders entschieden).
- Viele Kategorien beim Anlegen (bis T1 anders entschieden).

---

## 13. Offen / Risiken

- Die Tabelle § 7 ist aus einer ersten Code-Durchsicht; Stufe 0 muss sie
  mit `grep` vervollständigen. Stellen, die dort fehlen, sind das größte
  Risiko (Textzeilen tauchen als Karten auf).
- Ältere App-Versionen auf anderen Geräten (§ 6.5).
- Das Gefühl beim Aufsagen lässt sich nur am Gerät prüfen.

## 14. Nächster Schritt

1. Recherche § 16 (Wiederholen neu denken) und § 15 (Quran-Quelle,
   Lizenz) – nur Plandateien, geht parallel zu Codex.
2. Betreiber entscheidet die Varianten aus § 16 und bestätigt die Quelle.
3. § 5 und Bauplan § 11 anpassen; Stufe 0, sobald der Codex-Zyklus und
   die Claude-Prüfung abgeschlossen sind.
