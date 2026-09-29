# Texte auswendig lernen (Quran-Verse, Hadithe, Gedichte) – Plan

**Status:** Plan, **kein Bauauftrag**. Gehört zur offenen Frage Q1
(`plan/PLAN.md`) und zu F-12 (`plan/grossplan/FUNKTIONEN.md`). Gebaut wird
erst nach den Betreiber-Entscheidungen in § 6, und erst wenn der laufende
Codex-Zyklus samt Claude-Gesamtprüfung (`grossplan/AUFTRAG.md` § 2c)
abgeschlossen ist – nie parallel zu Codex an `app.js`/`styles.css`.

Rahmen (`plan/LEHREN.md` § 2): Wortlaut von Quran und Hadith verfasst kein
Agent; er kommt von den Nutzenden bzw. vom Betreiber. Religiöse Angaben über
Nutzende werden nicht gespeichert. Die bestehende Lernlogik für Karten
(Stufen, Intervalle, Freischalten) bleibt unverändert.

---

## 1. Gedanken des Betreibers (29.09.2026, frei gesprochen)

Sinngemäß festgehalten. Der Betreiber betont: **das sind Gedanken, keine
Vorschläge oder Beschlüsse**, und vermutlich nicht vollständig.

- Heute: ein Bereich mit allem aus dem Medina-Buch, Band 1.
- Wunsch: Quran-Verse auswendig lernen; ebenso Texte aus Büchern, z. B.
  Hadith-Sammlungen. Dialoge eher nicht.
- Beim Anlegen muss der Text sinnvoll „in eine Karte passen“.
- Abfragen: unsicher, ob Zufall oder feste Reihenfolge besser ist.
- Stufen/Wiederholung: unsicher, ob sie sich übertragen lassen. Für viele
  ist unklar, wann etwas „gelernt“ ist. Gedanke: gelernt ist es, wenn man es
  **fließend** aufsagen kann – ab dann ist Wiederholung sinnvoll.
- Gedanke (ausdrücklich kein Vorschlag): beim Anlegen eine Kategorie wählen
  (Grammatik, Vokabeln, Verse/Gedichte …), je Kategorie andere Funktionen
  bzw. Muster. Aber nicht zu kompliziert.
- Einheit: Zeile für Zeile. Offen: Wenn von 30 Versen 15 sitzen – wieder bei
  1 anfangen oder an einem gewählten Abschnitt?
- Methode, die er kennt: Zeile 1 lesen bis sie sitzt, dann Zeile 2, dann
  1+2 zusammen, dann Zeile 3 dazu usw. Weitere Methoden einbinden wäre ein
  echter Mehrwert.
- Ziel: echten Mehrwert liefern.

---

## 2. Was die Recherche sagt (29.09.2026)

| Befund | Quelle | Folgerung für die App |
|---|---|---|
| **Kumulatives Wiederholen** (Zeile 1, dann 1–2, dann 1–3 …) hält die Reihenfolge; jede Zeile wird Hinweis für die nächste. Belegt für Reihenfolge-Gedächtnis, auch bei Kindern. | [PubMed 37768613](https://pubmed.ncbi.nlm.nih.gov/37768613/), [PMC4416471](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4416471/) | Die Methode des Betreibers ist gut belegt → Kern des Neu-Lernens. |
| **Selbst abrufen schlägt Wiederlesen**: Prosa nach einer Woche 61 % (dreimal abgerufen) gegen 40 % (viermal gelesen). Wiederleser schätzen sich am besten ein und behalten am wenigsten. | [Roediger & Karpicke 2006](https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x) | Üben heißt aufsagen, nicht lesen. Lesen nur als erster Schritt. „Fließend gelesen“ ist kein „gelernt“. |
| **Nachlassende Hilfen** (erst voller Text, dann weniger, bis nichts): Methode der schwindenden Hinweise; Belege gemischt, aber für wortgetreues Lernen verbreitet. | [Glisky u. a. 1986](https://link.springer.com/rwe/10.1007/978-0-387-79948-3_1101) | Hilfestufen: voller Text → Anfangsbuchstaben → nichts. |
| **Anfangsbuchstaben-Methode**: nur erster Buchstabe jedes Wortes; Hinweis ohne Lösung, erzwingt Abruf. | [Bible Memory Goal](https://www.biblememorygoal.com/memory-methods/first-letter-bible-memory-method-explained/) (Praxis, keine Studie) | Mittlere Hilfestufe. Für Arabisch: erster Buchstabe je Wort, Harakat weg. |
| **Sabaq, Sabqi, Manzil**: jeden Tag neu (3–5 Zeilen zu Beginn), kürzlich Gelerntes (1–4 Wochen), alles Ältere; Wiederholen **vor** Neuem. | [The Hifz Project](https://thehifzproject.com/articles/sabaq-sabqi-manzil), [MaktabPro](https://www.maktabpro.com/blog/sabaq-sabqi-manzil) | Nur die Methodik übernehmen: Tagesablauf „erst wiederholen, dann neu“. Passt zu den Stufen: frisch = Sabqi, gefestigt = Manzil. |
| **Texte nicht zufällig mischen**: Gedichte in fester Reihenfolge üben; beim Abfragen einer Zeile die vorherigen Zeilen als Hinweis zeigen, nie die folgende. | [SuperMemo-Blog](https://thesupermemoblog.wordpress.com/2010/02/28/memorizing-poems-with-spaced-repetition/), [Borretti](https://borretti.me/article/effective-spaced-repetition) (Praxis) | Beantwortet die Frage „Zufall oder Reihenfolge“: **innerhalb eines Textes Reihenfolge**. Mischen nur zwischen verschiedenen Texten. |

Grenze: Die Belege zur Anfangsbuchstaben-Methode und zum Mischen sind
Praxiswissen, keine kontrollierten Studien. Kumulatives Wiederholen und
Abrufen statt Lesen sind gut belegt.

---

## 3. Empfehlung in einem Satz

Ein **Text** ist neben der Karte eine zweite Art Inhalt in einem Bereich. Er
besteht aus **Zeilen**. Neu gelernt wird **kumulativ mit nachlassenden
Hilfen**. Wiederholt wird **in Reihenfolge und im Zusammenhang**, gesteuert
von denselben Stufen wie bei Karten.

Warum nicht die Kategorie-Idee mit vielen Typen (Grammatik, Vokabeln …):
Grammatik und Vokabeln lernen sich heute schon gleich (Frage → Antwort); nur
Texte brauchen etwas anderes. Zwei Arten („Karte“, „Text“) statt vieler hält
das Anlegen einfach (Hick's Law, LEHREN § 6.9). Die Kategorie-Idee bleibt als
Variante in § 6 zur Entscheidung.

---

## 4. So würde es sich anfühlen (Ablauf)

### 4.1 Anlegen
1. Im Bereich „Neu“ → Auswahl **Karte** oder **Text**.
2. Text: Titel (z. B. „Gedicht X“, frei), Text einfügen. **Jede Zeile wird
   eine Zeile im Text** (Zeilenumbruch = Grenze). Vorschau zeigt die Zeilen
   nummeriert; zwei Zeilen zusammenfügen oder eine teilen per Tippen.
3. Optional je Zeile eine Übersetzung/Notiz (zweites Feld, wie bei Karten).
4. **Teilwissen**: „Diese Zeilen kann ich schon“ – Zeilen markieren (z. B.
   1–15). Sie starten direkt in der Wiederholung (Stufe 1), neu gelernt wird
   ab der ersten nicht markierten Zeile. Beantwortet „15 von 30“: nicht bei 1
   neu anfangen, aber die 15 bekannten kommen sofort zur Kontrolle.

### 4.2 Neu lernen (Tagesportion, „Sabaq“)
- Tagesportion: Standard 3 neue Zeilen, einstellbar (1–10).
- Je neue Zeile drei Hilfestufen:
  1. **Lesen**: Zeile voll sichtbar, laut lesen.
  2. **Anfangsbuchstaben**: nur erster Buchstabe je Wort; aufsagen, dann
     aufdecken, selbst prüfen.
  3. **Ohne Hilfe**: Zeile verdeckt; aufsagen, aufdecken, selbst bewerten.
- **Kumulativ**: Nach jeder neuen Zeile die ganze bisherige Portion am Stück
  ohne Hilfe aufsagen (1, 1–2, 1–3). Die vorherige Zeile steht dabei als
  Hinweis darüber (grau), nie die nächste.
- **„Gelernt“** heißt (Gedanke des Betreibers, belegt durch Abruf-Forschung):
  die Portion **einmal fließend ohne Hilfe** aufgesagt, selbst bewertet mit
  „Sicher“. Erst dann gehen die Zeilen in die Wiederholung (Stufe 1). Bei
  „Nicht“/„Fast“ zurück auf Hilfestufe 2 für die hakenden Zeilen.

### 4.3 Wiederholen („Sabqi“ und „Manzil“)
- Fällig ist eine **Zeile** (eigene Stufe, eigenes Datum – dieselben
  Intervalle wie Karten: 1, 2, 3, 6, 10 … bis 180 Tage).
- Abgefragt wird ein **Abschnitt**: zusammenhängende fällige Zeilen eines
  Textes, davor bis zu 2 Zeilen als Hinweis. Innerhalb eines Textes immer in
  Reihenfolge; verschiedene Texte dürfen gemischt werden.
- Bewertung pro Abschnitt: „Sicher“ → alle Zeilen +1 Stufe. Hakt es, tippt
  man die hakenden Zeilen an: nur diese „Nicht“ (−2) bzw. „Fast“ (−1), die
  übrigen +1. So bleibt eine einzige schwache Zeile nicht in einem langen
  Abschnitt versteckt.
- Tagesreihenfolge: **erst wiederholen, dann neu** (Hifz-Praxis).

### 4.4 Fortschritt
- Pro Text: Balken aus Zeilen (neu / im Lernen / frisch / fester /
  gefestigt / dauerhaft) – dieselben sechs Zustände wie Karten, keine Zahlen
  zur Stufe (Betreiber 24.09.: System nicht offenlegen).
- „Heute: 12 Zeilen wiederholen, 3 neue“.

---

## 5. Technik und Risiken

| Thema | Plan | Risiko / offen |
|---|---|---|
| Datenmodell | Text = Dokument unter `users/{uid}/…` mit Titel und Zeilenliste; Zeile mit `id`, `text`, `notiz`, `stufe`, `maxStufe`, `nextReview`, `ersteBewertung`. Große Texte (Al-Baqara 286 Verse) in Teildokumente, Firestore 1 MB je Dokument. | Muss mit dem Vorgehen bei Karten (eigene Dokumente, `patchDoc`) zusammenpassen; Codex liest das erst beim Bau. |
| Firestore-Regeln | neue Sammlung/Felder in der Positivliste (LEHREN § 8.1), Emulator-Test, Regel-Deploy **vor** Hosting. | Betreiber-Schritt. |
| **Datenschutz** | Quran-Text im Konto kann als Angabe zur Religion gelesen werden (DSGVO Art. 9, besondere Kategorie). Minderung: kein Feld „Quran“, keine Quellen-Kennzeichnung, Text ist Inhalt wie jede Karte; Datenschutzerklärung ergänzen. | **Rechtsprüfung durch einen Menschen nötig**, bevor gebaut wird (LEHREN § 12). |
| Arabisch | RTL, Harakat erhalten, Quran-Schrift (`fonts/UthmanicHafs1Ver18.ttf`) wählbar, Anfangsbuchstabe ohne Harakat. | Ein Wort = Leerzeichen-Grenze; Sonderzeichen (Waqf-Zeichen) prüfen. |
| Mehrere Geräte, offline, Rückgängig | wie bei Karten (Runden 12/13): atomare Änderungen, Kontowechsel-Schutz. | Aufwendigster Teil; Astra. |
| Sicherung/Export, Teilen, Lehrer-Code | Texte in Backup/Export aufnehmen; Teilen/Lehrer erst in späterer Stufe. | Entscheidung, ob in Stufe 1. |
| Serie/Tageszähler | Zählt eine Textwiederholung zur Serie? | Entscheidung. |
| Nicht bauen | Spracherkennung beim Aufsagen, automatisches Laden von Quran-Text aus dem Netz, religiöse Beispieltexte durch Agenten. | – |

---

## 6. Entscheidungen des Betreibers (vor dem Bau)

Jede mit Empfehlung; entscheidet allein der Betreiber.

| Nr | Frage | Möglichkeiten | Empfehlung |
|---|---|---|---|
| T1 | Wie wählt man beim Anlegen? | a) zwei Arten „Karte“/„Text“; b) Kategorien (Grammatik, Vokabeln, Verse …) mit eigenen Mustern | a – nur Texte lernen sich anders; b später möglich |
| T2 | Einheit | Zeile (Umbruch beim Einfügen) mit Zusammenfügen/Teilen | so |
| T3 | Neu lernen | kumulativ mit drei Hilfestufen (§ 4.2) | so |
| T4 | Reihenfolge | innerhalb eines Textes fest, zwischen Texten gemischt | so (Recherche § 2) |
| T5 | Wann „gelernt“ | Portion einmal fließend ohne Hilfe, „Sicher“ | so |
| T6 | Teilwissen | bekannte Zeilen markieren → direkt Wiederholung | so |
| T7 | Tagesportion neu | 3 Zeilen, einstellbar 1–10 | 3 |
| T8 | Serie | Textwiederholung zählt zur Serie | ja |
| T9 | Premium | kostenlos oder Premium | kostenlos (F-12); religiöses Lernen nicht hinter Bezahlung |
| T10 | Rechtsprüfung Art. 9 | vor dem Bau durch Anwalt/Datenschutz | Pflicht |
| T11 | Teilen/Lehrer-Code für Texte | Stufe 1 oder später | später |

---

## 7. Bauplan (nach Entscheidung, als eigener Zyklus)

Jede Stufe eine Runde nach `grossplan/AUFTRAG.md` § 2 mit Gegenprüfung § 2a.

| Stufe | Inhalt | Abnahme | Modell |
|---|---|---|---|
| 0 | Entscheidungen T1–T11, Rechtsprüfung | alle beantwortet, in `ENTSCHEIDUNGEN.md` | – |
| 1 | Datenmodell, Regeln, Emulator-Tests, Datenschutzerklärung | Regeln-Test grün inkl. Gegenprobe; Kontowechsel/offline/zwei Geräte mit echtem SDK gegen Emulator | Astra |
| 2 | Anlegen/Bearbeiten, Zeilen teilen/zusammenfügen, Teilwissen, Backup/Export | 30-Zeilen-Text arabisch mit Harakat anlegen, bearbeiten, exportieren, wieder einlesen: identisch | Sol mittel |
| 3 | Neu lernen (§ 4.2) | Durchlauf 3 Zeilen mit allen Hilfestufen; „Nicht“ führt zurück; Ergebnisse gespeichert; reduzierte Bewegung, kleine/große Bildschirme | Sol mittel |
| 4 | Wiederholen (§ 4.3) | Abschnitte in Reihenfolge, Hinweiszeilen davor, nie danach; Einzelzeilen-Bewertung verändert nur diese Zeilen; Intervalle wie Karten | Astra |
| 5 | Fortschritt, Serie, Tageszähler | Zahlen stimmen mit gespeicherten Zeilen überein; keine Stufenzahlen sichtbar | Sol niedrig |
| 6 | Gesamtprüfung | Prüfstand grün, Affe mit Texten, Claude-Gesamtprüfung (§ 2c), iPhone-Test durch Betreiber | Astra + Claude |

---

## 8. Nächster Schritt

Betreiber beantwortet T1–T11 (einfach „alles wie empfohlen“ oder einzelne
Abweichungen) und veranlasst die Rechtsprüfung T10. Bis dahin wird nichts
gebaut.
