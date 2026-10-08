# Aktivierung Bindung Gewohnheit

Wörtlich aus dem Chat 981b69a1, Agent 7, gestartet 2026-10-07 15:39 (Quelle: `agent-a93cc9ea215d2dedf.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 12 parallelen Ideen-Agenten für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server; Hosting Firebase). Der Betreiber ist ein Einzelner, bisher Nutzer: er und wenige Freunde; Ziel ist eine öffentliche, ernsthafte Lern-Website. Zielgruppe: deutschsprachige Muslime, die Arabisch (Quran-/klassisches Arabisch) lernen. Neu im Probelauf: "Texte auswendig lernen" (u. a. Quran, Tanzil-Daten unter quran/).
Frage des Betreibers: Wie kann das Tool ECHTEN, UNBESTREITBAREN Mehrwert bieten – Features, Ausbau, Verbesserungen, Neues. Er will ein großes, gründliches Ergebnis.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Also: keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden (log, show, diff, grep), keine Tests, keine Server, keine Skripte aus plan/werkzeuge starten, nichts installieren. app.js nie komplett lesen, sondern mit Grep gezielt suchen und Ausschnitte lesen.
Nützliche Dateien: KONZEPT.md, README.md, CHANGELOG.md, plan/STAND.md, plan/grossplan/FUNKTIONEN.md (bereits bewertete Funktionen: Korb 1/2/3 – nichts davon einfach wiederholen, sondern darauf aufbauen oder begründet widersprechen), plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/monetarisierung/GERUEST.md, plan/landing-page-strategie/STRATEGIE.md, plan/beobachtungen-lernwerkzeug.md, plan/zyklus-2/AUFGABEN.md.
Rahmenbedingungen des Projekts: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte selbst (Wortlaut kommt vom Betreiber oder aus geprüften Quellen); keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben der Nutzer. Keine Dark Patterns. Datenschutz (DSGVO) ernst. Kein eigener Server (Cloud Functions wären eine bewusste Entscheidung – als Abhängigkeit kennzeichnen).
AUSGABEFORMAT (Deutsch, max. ca. 900 Wörter, kein Vorgeplänkel): 8–14 konkrete Ideen. Je Idee: Titel; was genau (2–3 Sätze); für wen und welcher belegbare Nutzen; Aufwand S/M/L; Abhängigkeiten (Server? Inhalte vom Betreiber? Lizenz? iOS-Grenzen?); Risiko/Gegenargument; Beleg (Datei:Zeile im Repo bzw. URL). Am Ende: deine Top 3 mit einem Satz Begründung und 1–2 Dinge, die man ausdrücklich NICHT bauen sollte. Ehrlich gewichten, nicht verkaufen. Nichts erfinden: Was du nicht geprüft hast, als Vermutung kennzeichnen.

DEIN BLICKWINKEL: Erster Tag bis Tag 90 – Aktivierung, Gewohnheit, Wiederkommen, ohne Dark Patterns. Sieh dir an, was ein neuer Nutzer heute erlebt (plan/onboarding/*, Grep in app.js nach "onboarding", "plan", "serie", "streak", "erinner", "notification", "ruhetag", "ziel", "tagesmenge") und was nach einer Pause passiert (Berg fälliger Karten?). Recherchiere belastbare Erkenntnisse zu Gewohnheitsbildung und Lern-App-Retention (Implementation Intentions, Anker an bestehende Routinen – hier naheliegend: feste Tageszeiten der Zielgruppe, aber OHNE dass die App religiöse Praxis erfasst oder bewertet –, variable Belohnung kritisch sehen, Streak-Freeze, "comeback"-Mechaniken, kleinste sinnvolle Einheit). Technik ehrlich prüfen: Web Push in installierter PWA auf iOS (ab 16.4) ohne eigenen Server – was geht mit FCM und was braucht doch einen Auslöser (Cloud Functions/Scheduler)? Lokale Alternativen (Kalender-Datei .ics mit Lernzeit, Badging API, Periodic Background Sync – Browserunterstützung nennen). Ideen-Feld: Rückkehr nach Pause sanft machen (Berg strecken), "2-Minuten-Runde", Wochenrückblick, ehrliche Prognose "in X Wochen kannst du Y", Lernvertrag mit einem Freund (ohne soziale Bloßstellung), Urlaubsmodus, Tagesziel-Anpassung, Fortschritts-Meilensteine, E-Mail-Erinnerung (Server nötig?). Was davon ist echter Nutzen und was nur Kosmetik?

## Bericht des Agenten

## Blickwinkel Tag 1–90: Aktivierung, Gewohnheit, Wiederkommen

**Ausgangslage (geprüft):** Der Einstieg fragt Ziel, Hürden, Rundengröße und einen Wenn-dann-Anker ab (`app.js:1390-1471`). Die Serie hat einen nachladenden Joker (`app.js:3022-3065`). Hinweise auf dem Lernen-Tab: Serie, Meilenstein, Wochenrückblick, .ics-Erinnerung (`app.js:10276-10323`). Push, Badging und Periodic Sync kommen im Code nicht vor (Grep: nur .ics, `app.js:10230-10233`). Vorentschieden: F-16 Push/E-Mail „lieber nicht", F-17 Joker kaufen nein, F-18 Bestenlisten nein (`plan/grossplan/FUNKTIONEN.md:66-68`); Z7 „heute nur 20" später, Z6b Ruhetag offen (`plan/zyklus-2/ENTSCHEIDUNGEN.md:17,32-47`).

### Ideen

**1. Rückkehr nach Pause: Berg strecken statt nur „Erst einmal 20"**
- Was: Ab einer Schwelle (z. B. mehr als 30 fällig oder mehr als 7 Tage weg) ein eigener Zustand: „Du warst weg. Heute 20, der Rest verteilt sich auf die nächsten Tage", ohne Zahl verpasster Tage. Die Runde zieht die dringendsten Karten.
- Nutzen: Rückkehrer. Gemessen: 60 Tage weg ergibt „40 fällig", 3000 Karten ergeben „Karte 1 von 1100" (`plan/zyklus-2/befunde/LERN.md:118-123`). Der Fortschritt-Tab sagt dann fälschlich „noch nichts aufgezeichnet" (`befunde/FORT.md:117-122`).
- Aufwand: S als reine Anzeige (Z7), M mit echter Verteilung.
- Abhängigkeiten: Verteilung über Tage ist Lernlogik und braucht ein Betreiber-Ja.
- Risiko: Karten bleiben länger überfällig, das ist aber besser als ein Abbruch.
- Beleg: Anki-Forum, „Backlog Recovery Planner" (forums.ankiweb.net/t/70487).

**2. Anker und Erinnerung verbinden**
- Was: Der Wenn-dann-Satz verschwindet mit der ersten Karte (`app.js:1515-1519`). Die .ics bietet davon losgelöst 7:30/12:30/19:30 an (`app.js:10361-10365`) und erscheint erst nach zwei Lerntagen. Besser: Am Ende des Einstiegs die Erinnerung direkt aus dem Anker anbieten, mit Uhrzeit vom Nutzer, und den Satz dauerhaft leise auf dem Lernen-Tab zeigen.
- Nutzen: alle Neuen. Implementation Intentions d = 0,65 (`plan/onboarding/PSYCHOLOGIE.md:33,181`).
- Aufwand: S.
- Abhängigkeiten: Die App darf keine Gebetszeiten berechnen, sonst erfasst sie Standort und Praxis. Der Anker bleibt gerätelokal.
- Risiko: Feste Uhrzeit und wandernde Gebetszeit passen nicht zusammen. Deshalb als „ungefähre Uhrzeit" formulieren.

**3. Stoff am ersten Tag**
- Was: Nach dem Plan landet man im leeren Werkzeug („Jetzt deine erste eigene Karte"). Das ist das größte Aktivierungsloch.
- Nutzen: jeder Neue ohne Lehrer-Code.
- Aufwand: S–M, baut auf F-1 und F-3 auf (`FUNKTIONEN.md:20,22`).
- Abhängigkeiten: rechtlich freier Kartensatz vom Betreiber.
- Risiko: Ohne diesen Satz ist die Idee nicht umsetzbar.

**4. Ruhetag (Z6b) bauen**
- Was: Tage ohne Fälliges reißen die Serie nicht mehr.
- Nutzen: Heute verliert man die Serie ohne eigenes Versäumnis; das bestraft gerade die Fleißigen.
- Aufwand: S–M, Tests sind schon beschrieben (`ENTSCHEIDUNGEN.md:63-69`).
- Risiko: Lernlogik, braucht „Z6b ja".

**5. Pausen-/Urlaubsmodus**
- Was: Vorab „weg von … bis …". Die Serie ruht, Fälligkeiten werden bei Rückkehr gestreckt (Idee 1).
- Nutzen: Reise, Krankheit, Prüfungszeit. Ein einzelner Joker pro 7 Tage deckt eine Woche nicht ab.
- Aufwand: M.
- Abhängigkeiten: Lernlogik, neues Feld im Nutzerdokument, Firestore-Regeln.
- Risiko: Kann zum Dauer-Ausweg werden. Deshalb eine Obergrenze (z. B. 30 Tage) und ein ehrlicher Satz zum Vergessen.

**6. Kleinste Runde (5 Karten, V8)**
- Was: Rundengröße „5", zusätzlich nach Pause oder spät am Tag als zweiter Knopf.
- Nutzen: Bei Lally u. a. 2010 hing Gewohnheit an Wiederholung im gleichen Kontext, und ein verpasster Tag schadete kaum (Sekundärquelle: spring.org.uk/2023/01/form-a-habit.php).
- Aufwand: S.
- Risiko: Bei viel Fälligem wächst der Rückstand. Als Tagesrettung anbieten, nicht als Standard empfehlen.

**7. Ehrliche Prognose aus eigenen Daten**
- Was: „Bei deinem Tempo der letzten 4 Wochen sitzt Lektion X in etwa N Wochen", nur aus dem Tagesprotokoll und nur ab genug Daten. Bei Texten: „3 Zeilen pro Tag, Sure in etwa N Tagen".
- Nutzen: beantwortet „lohnt sich das?" in der kritischen zweiten bis vierten Woche.
- Aufwand: M.
- Risiko: Falsche Zusagen. Die Regel „keine Wirkungszusage" (`app.js:1421-1423`) verlangt eine Spanne statt eines Datums. Passt in den beschlossenen Fortschritt-Umbau Z1.

**8. Wochenrückblick mit Können statt Fleiß**
- Was: Der Rückblick zeigt heute Tage, Antworten und neue Karten (`app.js:10302-10310`). Besser: „Diese 5 Wörter sind fester geworden", mit arabischem Wort, und eine vorgeschlagene Handlung.
- Nutzen: sichtbarer Kompetenzzuwachs, deckt sich mit Z1 (`ENTSCHEIDUNGEN.md:11`).
- Aufwand: S–M.
- Risiko: Kosmetik, wenn nur Zahlen getauscht werden.

**9. App-Badge und Installationshinweis im richtigen Moment**
- Was: `navigator.setAppBadge(fällig)` beim Öffnen und Schließen, Installationshinweis nach der zweiten Runde.
- Grenze: Ohne Push wird das Badge nur aktualisiert, solange die App offen ist. Morgens stimmt es also nicht. Auf iOS ab 16.4 nur installiert und mit Mitteilungs-Erlaubnis (webkit.org/blog/13878). Periodic Background Sync gibt es nur in Chromium/Android, nicht in Safari.
- Urteil: S, aber nur halber Nutzen. Allein nicht bauen.

**10. Echte Push-Erinnerung: bewusste Server-Entscheidung**
- Was technisch nötig ist: iOS liefert Web Push nur an installierte PWAs (ab 16.4), die Erlaubnis nur nach einem Tippen. FCM kann zustellen, aber das Senden braucht einen vertrauenswürdigen Auslöser: Cloud Functions plus Scheduler (Blaze-Tarif) oder einen externen Cron. Aus dem Browser geht es nicht.
- Vermutung, nicht geprüft: Wiederkehrende Kampagnen aus der Firebase-Konsole könnten ohne Code gehen, dann aber ohne persönliche Uhrzeit.
- Nutzen: der stärkste einzelne Hebel fürs Wiederkommen.
- Aufwand: L. Dazu kommen Token-Speicherung, Datenschutztext und Einwilligung.
- Urteil: F-16 bleibt vorerst richtig. Erst neu bewerten, wenn Idee 2 nachweislich nicht reicht. Dasselbe gilt für E-Mail (Server und Versanddomain).

**11. Lernpartner ohne Bloßstellung**
- Was: Zwei Konten sehen voneinander nur „hat heute gelernt: ja/nein", sonst nichts. Opt-in per Code, jederzeit kündbar.
- Nutzen: Verbindlichkeit; die Zielgruppe lernt oft zu zweit oder im Kurs.
- Aufwand: M–L.
- Abhängigkeiten: neue Sammlung und Regeln, Datenfluss zwischen Konten.
- Risiko: berührt F-18 (Minderjährige, Druck). Nur bauen, wenn der Lehrer-Modus ohnehin kommt.

**12. Erste Woche als sichtbarer Weg**
- Was: Tag 1 bis 7 je ein ehrlicher Satz dazu, was heute passiert (z. B. „Heute kommen die Karten von gestern zum ersten Mal zurück"). Danach verschwindet es.
- Nutzen: erklärt das zunächst unverständliche Auf und Ab der Fälligkeiten in der Phase mit der höchsten Abbruchgefahr.
- Aufwand: S.
- Abhängigkeiten: Wortlaut vom Betreiber.
- Risiko: noch eine Hinweis-Art. Der Meilenstein-Hinweis blockiert heute schon alle anderen (LERN-2, `plan/zyklus-2/AUFGABEN.md:114`).

### Was nur Kosmetik ist
Mehr Meilenstein-Marken, Abzeichen, Konfetti, variable Belohnungen. Sie widersprechen dem Ton der App (`plan/onboarding/ENTSCHIEDEN.md:256-258`) und haben keinen Lernnutzen.

### Top 3
1. **Idee 1, Berg strecken:** Der Rückkehr-Moment ist gemessen kaputt und entscheidet über das Bleiben.
2. **Idee 3, Stoff am ersten Tag:** Ohne Karten gibt es keinen zweiten Tag; alles andere optimiert ein leeres Werkzeug.
3. **Ideen 2 und 4, Anker-Erinnerung und Ruhetag:** kleiner Aufwand, belegte Wirkung, kein Server, und die Serie wird endlich fair.

### Ausdrücklich nicht bauen
- Serien-Mechanik über Verlustangst: kaufbare Joker, „Serie reparieren", Countdown-Warnungen. Die bestehende Warnung „Heute zählt: Ohne eine Runde endet deine Serie" (`app.js:10291`) liegt schon an der Grenze dessen, was `PSYCHOLOGIE.md:149-150` ausschließt.
- Gebetszeiten berechnen oder das Lernen daran messen: Das erfasst Standort und religiöse Praxis und bewertet sie indirekt.
