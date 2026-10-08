# Mehrwert: Lernwirksamkeit Karten

Wörtlich aus dem Chat a495c23a, Agent 1, gestartet 2026-10-07 16:06 (Quelle: `agent-aa4df648c9a094f6f.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

Du arbeitest an einer Ideen- und Prüfrunde für die Karteikarten-App "Adrabic" (Arabisch lernen, PWA ohne eigenen Server, ein einzelner Betreiber). Repo: C:\Users\USER\Desktop\Wiederholung (NICHT C:\Users\USER\Wiederholung). NUR LESEN: keine Datei ändern, keine Tests, keinen Browser, keinen Server starten, kein git commit. Websuche ist erlaubt.

Pflichtlektüre zuerst (kurz): plan/STAND.md, plan/LEHREN.md §1 und §2, KONZEPT.md Abschnitt 0 und 7. Feste Grenzen: religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte oder arabischen Text; keine Sekten/Organisationen/Politik; keine religiösen Angaben speichern; kein eigener Server; keine manipulativen Muster (kein Druck, keine Schuld).

Auftrag des Betreibers (wörtlich): "ich will dass das Lernen auf dieser Seite wirklich hilft, egal ob Methoden geändert werden müssen oder mehr, dass es buchstäblich so krass hilft wie nur möglich" und "echten unbestreitbaren Mehrwert".

DEIN BLICKWINKEL: Lernwirksamkeit der Karten-Wiederholung. Lies in app.js die Lernlogik (Suche: startSession, gradeCard, nachDringlichkeit, Stufen/Abstände/INTERVALLE, "fast"/"sicher"/"nicht", neue Karten, Rundenlimit, Leech/"verbrannt", abstandFaktor) und plan/zyklus-2/E26-VORSCHLAG.md, plan/zyklus-2/befunde/ (falls vorhanden LERNEN*.md). Vergleiche mit dem Stand der Forschung (Abrufübung, verteiltes Lernen, FSRS/SM-2, Abrufrichtung Deutsch→Arabisch vs. Arabisch→Deutsch, Erfolgsquote-Ziel, neue Karten pro Tag, Interleaving). Der Betreiber hat das Gefühl, Wörter aktiv nicht wiederzufinden ("ich finde das Wort nicht") – prüfe, in welche Richtung die App abfragt und was das bedeutet.

LIEFERE auf Deutsch, einfache Sprache, höchstens 700 Wörter: eine nach Nutzen geordnete Liste von höchstens 8 Vorschlägen. Je Vorschlag: was genau, warum es dem Lernenden nachweislich hilft (Quelle mit Link, und ehrlich: Studie, Praxis oder Meinung), was dagegen spricht, Aufwand (klein/mittel/groß), Risiko, und welche Stelle im Code betroffen wäre (Datei:Zeile). Am Ende: die 3 Dinge, die Du als Erstes tun würdest, und 2 Dinge, die verlockend klingen, aber schaden würden. Keine Schmeichelei, nichts erfinden; was Du nicht nachgelesen hast, als ungeprüft kennzeichnen.

## Bericht des Agenten

## Lernwirksamkeit der Karten-Wiederholung: Befund und Vorschläge

Nur gelesen, nichts ausgeführt oder geändert. Alle Code-Aussagen stammen aus `C:\Users\USER\Desktop\Wiederholung\app.js` und sind nicht im Lauf geprüft.

**Kernbefund zu „ich finde das Wort nicht":** Die bewertete Runde fragt nur Arabisch → Deutsch ab (`app.js:11660-11662`). Deutsch → Arabisch gibt es nur im Üben mit Handschrift, und das zählt nicht für Stufen (`isDrill`, `app.js:5879-5895`). Das aktive Finden wird also nie verteilt geübt. Das Gefühl des Betreibers ist damit die erwartbare Folge.

### Vorschläge, nach Nutzen geordnet

**1. Zweite Richtung Deutsch → Arabisch als bewertete Wiederholung (F-5)**
- **Was:** Eigene Stufe und Fälligkeit je Richtung. Die Rückrichtung startet erst, wenn die Karte in der Hinrichtung etwa Stufe 3 erreicht hat.
- **Warum:** Man kann, was man abruft. Produktives Lernen baut produktives Wissen auf, rezeptives baut rezeptives auf (Studie: Webb 2009, RELC Journal, nur Zusammenfassung gelesen: https://ir.wgtn.ac.nz/handle/123456789/23701). Welche Richtung insgesamt „besser" ist, ist in der Forschung uneinheitlich.
- **Dagegen:** Bis zu doppelte Tagesmenge; neue Felder, Regeln, Migration.
- **Aufwand:** groß. **Risiko:** hoch (Lernlogik, Daten).
- **Stelle:** `app.js:236` (normCard), `4058`, `6453`, `11660`, dazu `firestore.rules`.

**2. Nach „Nicht" kein voller Stufengewinn in derselben Runde**
- **Was:** Heute fällt eine Karte von Stufe 10 bei „Nicht" auf 8, kommt in derselben Runde wieder und steigt bei „Sicher" auf 9. Das sind etwa 110 Tage Abstand für ein eben vergessenes Wort (`app.js:6494-6503`, `6540`). Vorschlag: Das zweite „Sicher" in derselben Runde setzt nur „morgen", ohne Stufe hoch.
- **Warum:** Abruf nach Sekunden zeigt Kurzzeitgedächtnis, keine Festigkeit. Anki setzt den Abstand nach einem Fehler standardmäßig auf einen Tag zurück (Praxis: https://docs.ankiweb.net/deck-options.html).
- **Dagegen:** Mehr Wiederholungen nach Fehlern; Stufen-Texte und Tests müssen mit.
- **Aufwand:** klein bis mittel. **Risiko:** mittel.

**3. Neue Karten in der ersten Runde mehrfach abrufen**
- **Was:** Heute reicht ein „Sicher" beim ersten Anblick für Stufe 1, und die Karte ist für heute weg. Vorschlag: Neue Karten kommen in der Runde noch ein- bis zweimal mit Abstand wieder.
- **Warum:** Wiederholter Abruf wirkt stark, einmal Gewusstes fallen zu lassen schadet (Studie: Karpicke & Roediger 2008, https://pubmed.ncbi.nlm.nih.gov/18276894/). Nakata nennt etwa fünf Abrufe (Studie, nur Suchzusammenfassung gelesen, ungeprüft: https://resolve.cambridge.org/core/journals/studies-in-second-language-acquisition/article/does-repeated-practice-make-perfect-the-effects-of-withinsession-repeated-retrieval-on-second-language-vocabulary-learning/F14BA8A576CD2563D14CEA46E35D842E).
- **Dagegen:** Runden werden länger.
- **Aufwand:** mittel. **Risiko:** mittel.
- **Stelle:** `app.js:6537-6540`.

**4. Abstands-Regler für alle Konten öffnen**
- **Was:** Der Regler (Ziel 85–95 % „Sicher" ab Stufe 7) läuft nur im Betreiber-Konto (`app.js:6492`, `6608-6622`).
- **Warum:** Der feste Faktor 1,8 passt nicht jedem. Als Zielbereich nennt Anki 90 % als Standard (Praxis, selbe Anki-Seite).
- **Dagegen:** Der Probelauf läuft bis 29.10., erst dessen Werte abwarten. Die Selbstbewertung ist ungenau.
- **Aufwand:** klein. **Risiko:** mittel.

**5. Schreib-Üben sichtbarer machen (Zwischenschritt zu 1)**
- **Was:** Am Rundenende ein leiser Vorschlag „Diese Wörter auf Arabisch schreiben".
- **Warum:** Wie bei 1, aber ohne Eingriff in die Lernlogik.
- **Dagegen:** Unverteilt, also schwächer; ein weiterer Knopf.
- **Aufwand:** klein. **Risiko:** niedrig.
- **Stelle:** `app.js:11949` (renderRundenEnde).

**6. Neue Karten pro Tag in eigenen Bereichen begrenzen**
- **Was:** Bei „Alle" kommen heute sämtliche neuen Karten auf einmal (`app.js:4058-4065`; die Bremse wurde in 2.3.0 bewusst entfernt). Vorschlag: Vorgabe etwa 10–20 pro Tag, abschaltbar.
- **Warum:** Verhindert die Wiederholungslawine (Praxis und Meinung, keine Studie nachgelesen).
- **Dagegen:** Wurde bewusst entfernt, widerspricht „nichts wieder einbauen". Nur auf ausdrückliches Ja des Betreibers.
- **Aufwand:** mittel. **Risiko:** mittel.

**7. Verbrannte Karten kurz aus der Runde nehmen**
- **Was:** Sie laufen heute weiter mit, nur mit Hinweis (`app.js:235`, `11840`). Vorschlag: Pausieren, bis sie umformuliert sind.
- **Warum:** Praxis (Anki-Leeches).
- **Dagegen:** Ein Wort verschwindet still.
- **Aufwand:** klein. **Risiko:** niedrig bis mittel.

**8. Ohne Harakat abfragen (F-2)**
- **Was:** Schalter je Runde.
- **Warum:** Nutzen fürs echte Lesen ist plausibel, eine Quelle habe ich nicht nachgelesen (ungeprüft).
- **Dagegen:** Bei Quran-Text entscheidet der Betreiber.
- **Aufwand:** mittel. **Risiko:** niedrig bis mittel.

### Bewusst nicht vorgeschlagen
- **FSRS:** Ohne gespeicherten Bewertungsverlauf ist es nicht anpassbar (F-14); Punkt 4 holt den Kern.
- **Mischen über Bereiche:** Innerhalb eines Bereichs wird schon gemischt.
- **Dringlichkeits-Reihenfolge (3.18.22):** Passt zur recherchierten Lage, keine Änderung nötig.

### Die 3 ersten Schritte
1. Punkt 2: kleinster Eingriff, behebt einen echten Fehler der Abstände.
2. Punkt 5 sofort, parallel ein Konzept für Punkt 1. Das ist die eigentliche Antwort auf „ich finde das Wort nicht".
3. Punkt 3.

Alle drei sind Lernlogik und brauchen nach LEHREN § 1.2 das Ja des Betreibers.

### Verlockend, aber schädlich
1. **Antwort zum Antippen (Multiple Choice) oder mehr „Durchsehen":** Fühlt sich leichter an, ist aber Wiedererkennen statt Abruf und verschärft genau das Problem des Betreibers.
2. **Ziel-Erfolgsquote über 95 % oder Abstände pauschal kürzen:** Die Arbeit steigt steil, der Gewinn ist gering (Anki-Handbuch: über 90 % wächst der Aufwand sehr schnell). Dasselbe gilt für „Fast" als bequemen Ausweg mit Stufengewinn.
