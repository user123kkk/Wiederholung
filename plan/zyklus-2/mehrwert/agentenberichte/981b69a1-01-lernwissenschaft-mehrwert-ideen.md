# Lernwissenschaft Mehrwert-Ideen

Wörtlich aus dem Chat 981b69a1, Agent 1, gestartet 2026-10-07 15:39 (Quelle: `agent-a38e639f26b91fc4b.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 12 parallelen Ideen-Agenten für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server; Hosting Firebase). Der Betreiber ist ein Einzelner, bisher Nutzer: er und wenige Freunde; Ziel ist eine öffentliche, ernsthafte Lern-Website. Zielgruppe: deutschsprachige Muslime, die Arabisch (Quran-/klassisches Arabisch) lernen. Neu im Probelauf: "Texte auswendig lernen" (u. a. Quran, Tanzil-Daten unter quran/).
Frage des Betreibers: Wie kann das Tool ECHTEN, UNBESTREITBAREN Mehrwert bieten – Features, Ausbau, Verbesserungen, Neues. Er will ein großes, gründliches Ergebnis.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Also: keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden (log, show, diff, grep), keine Tests, keine Server, keine Skripte aus plan/werkzeuge starten, nichts installieren. app.js nie komplett lesen, sondern mit Grep gezielt suchen und Ausschnitte lesen.
Nützliche Dateien: KONZEPT.md, README.md, CHANGELOG.md, plan/STAND.md, plan/grossplan/FUNKTIONEN.md (bereits bewertete Funktionen: Korb 1/2/3 – nichts davon einfach wiederholen, sondern darauf aufbauen oder begründet widersprechen), plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/monetarisierung/GERUEST.md, plan/landing-page-strategie/STRATEGIE.md, plan/beobachtungen-lernwerkzeug.md, plan/zyklus-2/AUFGABEN.md.
Rahmenbedingungen des Projekts: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte selbst (Wortlaut kommt vom Betreiber oder aus geprüften Quellen); keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben der Nutzer. Keine Dark Patterns. Datenschutz (DSGVO) ernst. Kein eigener Server (Cloud Functions wären eine bewusste Entscheidung – als Abhängigkeit kennzeichnen).
AUSGABEFORMAT (Deutsch, max. ca. 900 Wörter, kein Vorgeplänkel): 8–14 konkrete Ideen. Je Idee: Titel; was genau (2–3 Sätze); für wen und welcher belegbare Nutzen; Aufwand S/M/L; Abhängigkeiten (Server? Inhalte vom Betreiber? Lizenz? iOS-Grenzen?); Risiko/Gegenargument; Beleg (Datei:Zeile im Repo bzw. URL). Am Ende: deine Top 3 mit einem Satz Begründung und 1–2 Dinge, die man ausdrücklich NICHT bauen sollte. Ehrlich gewichten, nicht verkaufen. Nichts erfinden: Was du nicht geprüft hast, als Vermutung kennzeichnen.

DEIN BLICKWINKEL: Lernwissenschaft. Finde zuerst heraus, wie die App heute tatsächlich abfragt und plant (Stufen/Intervalle, Bewertung, Tagesmenge, Reihenfolge, Umgang mit vergessenen Karten, neue Karten; im Code per Grep nach z. B. "stufe", "maxStufe", "faellig", "intervall", "bewert"). Vergleiche das mit dem Stand der Forschung (Retrieval Practice, Spacing, FSRS/SM-2, Interleaving, Desirable Difficulties, Leeches, Generation Effect, Schreiben vs. Erkennen, Überlernen, Metakognition/Selbsteinschätzung) – recherchiere im Web nach belastbaren Quellen. Wo liefert die App nachweisbar weniger Lernerfolg pro Minute als möglich, und welche Änderungen/Ergänzungen brächten messbar mehr? Beachte: die Lernlogik gilt im Projekt als "tabu" ohne ausdrückliche Betreiber-Entscheidung – deine Vorschläge sind also Entscheidungsvorlagen; kennzeichne, was die Lernlogik berührt und was nur ergänzt.

## Bericht des Agenten

## Lernwissenschaft: Ist-Stand und 11 Entscheidungsvorlagen

Nur gelesen, nichts geändert. Die Quellen stammen aus einer kurzen Websuche (Trefferzusammenfassungen, keine Volltexte); was ich nur aus dem Gedächtnis kenne, ist als „ungeprüft" markiert.

### Wie die App heute abfragt (aus dem Code)
- **Stufen und Abstände:** 12 Stufen, Abstand `1,8^(Stufe−1)`, Deckel 180 Tage, ±15 % Streuung. Das ergibt 1, 2, 3, 6, 10, 19, 34, 61, 110, 180 Tage (`app.js:122-148`).
- **Bewertung:** drei Selbsturteile. „Sicher" +1 Stufe; „Fast" −1 Stufe und morgen wieder; „Nicht" −2 Stufen, heute fällig und ans Ende der Runde (`app.js:5985-6069`).
- **Reihenfolge:** Wiederholungen vor Neuem, dann gemischt (`app.js:3790-3798`, `5908`).
- **Menge:** kein Tageslimit für Neues in eigenen Bereichen; in geführten Sätzen bremst das Lektionsschloss. Sitzungslimit 10/20/30/alle (`app.js:1331`).
- **Vergessene Karten:** ab 5 Rückfällen nur ein Hinweis „umformulieren oder teilen" (`app.js:235`, `10988`).
- **Richtung:** die geplante Abfrage läuft nur Arabisch → Deutsch. Deutsch → Arabisch mit Handschrift gibt es nur im Üben, ohne Wirkung auf die Planung (`app.js:5995`, `11020-11022`).
- **Verlauf:** gespeichert werden nur Tageszähler, kein Verlauf je Karte (`app.js:912-918`).

### Ideen

**1. Rückfall-Regel reparieren** (berührt Lernlogik)
- Was: Eine Karte auf Stufe 8 (61 Tage) fällt bei „Nicht" auf 6, kommt in derselben Runde wieder und steht nach „Sicher" auf 7, also 34 Tage Pause nach einem echten Vergessen. Vorschlag: „Sicher" auf eine in dieser Runde verfehlte Karte hebt die Stufe nicht, die Karte kommt morgen.
- Nutzen: Ein Abruf Minuten nach der Rückmeldung belegt kein Langzeitbehalten. Anki und FSRS setzen nach einem Fehler deutlich kürzer an.
- Aufwand S. Abhängigkeit: Betreiber-Ja, sonst nichts.
- Risiko: etwas mehr Karten am Folgetag.
- Beleg: `app.js:6023-6032`, `6069`.

**2. Sitzungslimit nach Dringlichkeit sortieren** (berührt nur die Auswahl)
- Was: Der Kommentar verspricht „die 10 dringendsten", der Code schneidet aber die ersten N in Kartenreihenfolge ab. Vorschlag: nach Überfälligkeit relativ zum Abstand sortieren, dann kappen.
- Nutzen: Wer täglich nur 10 macht, sieht hintere Karten sonst womöglich wochenlang nicht.
- Aufwand S. Risiko gering.
- Beleg: `app.js:5895-5899` gegen `3794-3797`.

**3. Bewertungsverlauf je Karte speichern** (Ergänzung, Voraussetzung für 4)
- Was: je Karte eine kompakte Zeichenkette der letzten rund 30 Antworten (Datum-Abstand plus Note).
- Nutzen: F-14 (FSRS) wurde genau wegen des fehlenden Verlaufs abgelehnt. Ohne Daten bleibt jede spätere Verbesserung Raterei.
- Aufwand M. Abhängigkeit: `firestore.rules`, Datenschutzerklärung, 1-MiB-Grenze je Dokument prüfen.
- Risiko: Dokumentgröße bei großen Bereichen (Vermutung, nicht gemessen).
- Beleg: `plan/grossplan/FUNKTIONEN.md:64`.

**4. Regler in beide Richtungen und je Stufe** (berührt Lernlogik, baut auf dem Probelauf auf)
- Was: Der Probelauf-Regler kürzt nur (Faktor 0,5–1,0) und zählt nur Karten ab Stufe 7. Vorschlag: auch frühe Stufen messen und bei über 95 % die Stufen 2/3 überspringen lassen.
- Nutzen: Die Folge 1-2-3-6-10 ist für leichte Karten sehr eng. Der FSRS-Benchmark nennt 20–30 % weniger Wiederholungen bei gleichem Behalten; das ist eine Simulation, keine Feldstudie.
- Aufwand M. Abhängigkeit: Idee 3 und das Ergebnis des Probelaufs am 29.10.
- Risiko: Stufen-Texte und Erwartungen ändern sich.
- Beleg: `plan/texte-lernen/WIEDERHOLEN.md:133-151`; https://github.com/open-spaced-repetition/srs-benchmark (URL aus dem Gedächtnis, Zahlen aus Sekundärquellen).

**5. Zweite Richtung in die Planung (F-5), als Stufen-Tor statt Doppelkarte** (berührt Lernlogik)
- Was: Ab etwa Stufe 4 wird dieselbe Karte abwechselnd Deutsch → Arabisch mit Handschrift abgefragt, ohne zweiten Kartensatz.
- Nutzen: Produktives Abrufen wird separat gelernt und ist für Schrift und Form wirksamer (Nakata; Webb). Heute bleibt die Schreibübung folgenlos.
- Aufwand L. Risiko: längere Runden, Handschrift auf iOS, Selbstbewertung der eigenen Schrift.
- Beleg: `FUNKTIONEN.md:23`; `app.js:11020`.

**6. Neue Karten in der ersten Runde zweimal richtig** (berührt Lernlogik leicht)
- Was: Eine neue Karte verlässt die Runde erst nach zwei richtigen Abrufen mit Abstand von einigen Karten.
- Nutzen: Rawson und Dunlosky empfehlen ein Anfangskriterium und danach verteiltes Wiederlernen. Nakata 2017 zeigt mehr Behalten durch mehrere Abrufe in der Sitzung, aber mit sinkendem Ertrag pro Minute.
- Aufwand S–M. Risiko: Überlernen, deshalb höchstens zwei.
- Beleg: https://link.springer.com/article/10.1007/s10648-023-09809-2

**7. Verbrannte Karten behandeln statt nur melden** (Ergänzung)
- Was: Bei 5 Rückfällen aus der Abfrage nehmen und einen geführten Schritt anbieten: Verwechslungspartner daneben zeigen (ähnliche Wörter im Bereich), eigene Merkhilfe in die Notiz, teilen oder umformulieren.
- Nutzen: Der Code nennt die Ursache selbst („liegt an der Karte"), gibt aber kein Werkzeug. Verwechslung ähnlicher Wörter als Hauptursache ist ungeprüft (Tinkham/Waring aus dem Gedächtnis).
- Aufwand M. Abhängigkeit: Merkhilfen schreibt der Nutzer, nie die App.
- Beleg: `app.js:231-235`, `10988-10991`.

**8. Erst antworten, dann aufdecken; Tippen als Option** (Ergänzung)
- Was: je Runde wählbar, die deutsche Bedeutung zu tippen, mit toleranter Prüfung und Selbstkorrektur.
- Nutzen: Reine Selbsteinschätzung überschätzt. Erzeugen wirkt besser als Wiedererkennen (Karpicke und Roediger 2008).
- Aufwand M. Risiko: langsamer, Synonyme falsch gewertet, darum nie Pflicht. Der Betreiber hat die Denkpause bei Karten schon abgelehnt (`WIEDERHOLEN.md:231`).

**9. Ehrliche Behaltensquote zeigen** (Ergänzung)
- Was: „Von Karten, die über 30 Tage ruhten, wusstest du 9 von 10", je Bereich.
- Nutzen: Kalibrierung, und ein belegbarer Wirknachweis für die öffentliche Seite. Die Daten liefert der Regler bereits.
- Aufwand S.
- Gegenargument: F-13 „System nicht verraten"; eine einzelne Zahl ist aber kein Statistik-Ausbau.

**10. Neues nach Last dosieren** (berührt die Tagesmenge)
- Was: In eigenen Bereichen gibt es keine Bremse. Vorschlag: Hinweis „heute lieber halten", wenn die geschätzte Wiederholzeit eine Grenze übersteigt, analog zu Texten.
- Nutzen: Der Code nennt Überlast selbst den häufigsten Abbruchgrund.
- Aufwand S.
- Beleg: `app.js:3776-3789`; `WIEDERHOLEN.md:124-131`.

**11. Kontext-Abruf (F-9 und F-2 zusammen)** (Ergänzung)
- Was: Gefestigte Karten gelegentlich im Beispielsatz und ohne Harakat abfragen.
- Nutzen: Übertragung auf echtes Lesen, variierter Abruf.
- Aufwand M. Abhängigkeit: Beispielsätze vom Betreiber; Quran-Text ohne Zeichen entscheidet er.

### Top 3
1. **Idee 1:** ein belegbarer Fehler in der Kernlogik, klein, sofort wirksam.
2. **Idee 3:** ohne Verlauf lässt sich keine Planung je messen oder verbessern.
3. **Idee 5:** größter Lerngewinn für das Ziel, Arabisch aktiv zu können, aber teuer.

Idee 2 ist ein günstiger Mitnahmefix.

### Nicht bauen
- **FSRS komplett jetzt:** ohne Verlauf nicht anpassbar; F-14 bleibt richtig, bis Idee 3 einige Monate Daten geliefert hat.
- **Multiple-Choice oder Wiedererkennen als Standardabfrage:** schwächerer Abruf, nur gefühlter Fortschritt.
- **Pflicht-Timer oder Denkpause bei Karten:** vom Betreiber begründet abgelehnt.

### Quellen
- Dunlosky u. a. 2013: https://www.psychologicalscience.org/news/releases/which-study-strategies-make-the-grade.html
- Karpicke und Roediger 2008: https://profiles.wustl.edu/en/publications/the-critical-importance-of-retrieval-for-learning/
- Nakata 2017: https://resolve.cambridge.org/core/journals/studies-in-second-language-acquisition/article/does-repeated-practice-make-perfect-the-effects-of-withinsession-repeated-retrieval-on-second-language-vocabulary-learning/F14BA8A576CD2563D14CEA46E35D842E
- Anki zum Algorithmus: https://faqs.ankiweb.net/what-spaced-repetition-algorithm
