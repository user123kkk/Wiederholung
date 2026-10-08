# Gegenrede und Wartungslast

Wörtlich aus dem Chat 981b69a1, Agent 23, gestartet 2026-10-07 15:55 (Quelle: `agent-a2f4c0c356ed5f081.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 13 Agenten der ZWEITEN Runde für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB in EINER Datei, styles.css ~260 KB, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server). Betreiber ist ein Einzelner (minderjährig, programmiert nicht selbst, lässt KI-Agenten bauen und prüft am Gerät), Nutzer bisher er und wenige Freunde; Ziel: öffentliche, ernsthafte Lern-Website für deutschsprachige Muslime, die Quran-/klassisches Arabisch lernen.
Der Betreiber hat entschieden: Er will ALLES Nützliche aus Runde 1 bauen, "egal wie schwer". Deine Rolle ist die begründete GEGENREDE – nicht um zu bremsen, sondern damit das Richtige zuerst und nichts Schädliches gebaut wird. Sein eigener Grundsatz (CLAUDE.md): "nur weil ich ein Argument dafür bringen kann, heißt es nicht, dass es überwiegt."
RUNDE-1-LISTE (rund 45 Vorhaben): Fehlerkorrekturen (Rückfall-Regel nach "Nicht"→"Sicher", Sitzungslimit nach Dringlichkeit, vollständiges Backup); Liste einfügen mit Vorschau/CSV/Lektionszeilen; ohne Harakat abfragen/Harakat-Leiter; Regal mit Betreiber-Kartensätzen; Rückkehr nach Pause (Berg strecken); Ruhetag; Urlaubsmodus; kleinste Runde 5; öffentliche Startseite; Proberunde ohne Konto; Gastmodus; Seite "Was wir nicht tun"; Bearbeiten in der Abfrage; Rundenende zeigt verpatzte Karten; Kennzahl "sicher gekonnt"; Trefferquote reifer Karten; Lastprognose 30 Tage; Monatsstand; Problemkarten mit Diagnose; Verwechslungspaare; Filter in Verwalten; Duplikatprüfung über Bereiche; Löschen mit Rückgängig; Karte überspringen; alles Fällige in einer Runde; Wake Lock; Druckansicht; Text-/CSV-Export; Web Share; Einladungslink; Nachliefern unter demselben Code; Wochentakt-Freigabe; mehrere Codes je Satz; Harakat-Eingabeleiste; Handschrift in normaler Runde; Schreibtraining mit Vorlage; zweite Richtung Deutsch→Arabisch; Formen-Tabellen-Kartentyp; Texte: Bestand ohne Lawine, Kreis über mehrere Texte, Juz/Hizb/Seite, Hinweis ähnliche Ayat, Übergangs-Abfrage, Einstiegsprobe, lokale Selbstaufnahme, Abhör-Modus, Waqf-Teilung langer Ayat, Schwachstellen je Zeile, Kontrollfrage mit echten Verwechslern, Texte für alle freigeben; Wort in Aya → Karte; Quran-Konkordanz; Wurzel-Familien/Abdeckung; Anker-Erinnerung (.ics aus dem Wenn-dann-Satz); "erste Woche als Weg"; Lernpartner; Unterstützen-Link; drei datensparsame Kennzahlen.
HARTE REGELN: NUR LESEN im Repo. Keine Datei anlegen/ändern, keine git-Befehle außer lesenden (git log/shortlog/diff --stat sind erwünscht), keine Tests/Server/Skripte. app.js nie komplett lesen.
AUSGABEFORMAT (Deutsch, max. ca. 1100 Wörter): Teil 1 "Befunde" (8–14 Punkte mit Beleg Datei:Zeile, git-Zahlen oder URL). Teil 2 "Fragen an den Betreiber" (3–8 Fragen, jede mit 2–3 Sätzen Hintergrund, Auswahlmöglichkeiten und Empfehlung, sodass er ohne Nachschlagen antworten kann). Ungeprüftes als Vermutung kennzeichnen. Sei direkt, aber fair.

DEIN AUFTRAG: (1) Tragfähigkeit messen: Wie schnell ist das Projekt bisher gewachsen, und was hat das gekostet? Werte aus: git log (Commits je Woche, Anteil "Fix"/Regression im CHANGELOG.md – zähle grob, wie viele Versionen Korrekturen früherer Versionen sind), plan/LEHREN.md § 15 Vorfall-Liste (Anzahl, Häufungen: welche Art Änderung erzeugt hier die meisten Folgefehler?), Zahl der Testdateien unter plan/werkzeuge (t_*.js) und was sie abdecken, Größe und Struktur von app.js (wie viele Funktionen, wie viele globale Zustände – Stichprobe per Grep "^function ", "^let ", "^const "). Schlussfolgerung: Wie viele der 45 Vorhaben verträgt eine 820-KB-Ein-Datei-App, bevor jede Änderung drei andere bricht? Braucht es VOR dem Ausbau einen Umbau (Aufteilen in Module per <script type="module"> ohne Build? mehr automatische Tests? Feature-Schalter wie texteFreigeschaltet() als allgemeines Muster für stufenweise Freigabe?) – konkret und klein vorschlagen. (2) Jede Idee einmal angreifen: Welche 8–12 der 45 sind bei ehrlicher Betrachtung Ballast, weil sie wenige nutzen würden, das Werkzeug unübersichtlicher machen, Dauerpflege erzeugen (Inhalte, Lizenzen, Support) oder dem Charakter widersprechen ("eine Handlung pro Bildschirm", vier Einstellungen)? Welche sollten nur als verborgene Option existieren? (3) Reihenfolge-Risiko: Was passiert, wenn man viel baut, bevor ein einziger Fremder die App benutzt hat? Schlage vor, wie man mit minimalem Aufwand echte Rückmeldung von 5–10 Fremden bekommt, BEVOR die großen Vorhaben (zweite Richtung, Kreis über Texte, Lehrer-Ausbau) gebaut werden, und welche Beobachtung welche Idee bestätigen oder kippen würde. (4) Was könnte man ENTFERNEN oder vereinfachen, um Mehrwert zu schaffen (Grep nach wenig genutzten Pfaden, doppelten Wegen zum selben Ziel, acht Einstiegs-Bildschirme)? (5) Nenne die 10 Vorhaben, die du trotz aller Skepsis zuerst bauen würdest, in Reihenfolge.

## Bericht des Agenten

# Gegenrede Runde 2: Tragfähigkeit, Ballast, Reihenfolge

Nur gelesen, nichts geändert, keine Tests gestartet. Zählungen per Grep/git sind grob; Schätzungen sind als solche gekennzeichnet.

## Teil 1 – Befunde

1. **Tempo.** 449 Commits in drei Wochen (11.09.–01.10.; je Kalenderwoche 77 / 146 / 169 / 57). `CHANGELOG.md` hat 241 Versionen in 28 Tagen, Spitze 35 Versionen am 24.09. `app.js` wuchs von 320 KB (12.09.) auf 817 KB (01.10.), `styles.css` von 75 auf 258 KB.

2. **Korrekturanteil.** Rund 92 von 241 Versionen (38 %) enthalten Korrektur-Stichworte (behoben, Regression, zurückgenommen, „seit 3.x"). Bei den Commit-Betreffs sind es 83 von 449. Das ist eine Stichwort-Heuristik, keine Einzelprüfung.

3. **Vorfall-Liste** (`plan/LEHREN.md:1440–1833`, rund 120 Einträge, Häufungen von mir grob sortiert):
   - Prüfstand- und Messfehler: etwa 35. Der Test selbst war falsch, Standby, Zeitzone, Gegenprobe gegen HEAD.
   - Bewegung, Layout, iOS: etwa 25. Nav-Leiste sechs Meldungen (3.6.1–14), iPhone-Start über neun Versionen (.47–.55), Kartendrehung (.37–.39).
   - Späte Antworten nach Kontowechsel: etwa 16 (G-093 bis G-111). Darunter gelöschte Karten und gelöschtes Konto im falschen Konto (`LEHREN.md:1591–1603`).
   - Veröffentlichen, Cache, CSP, .bat: etwa 15.
   - Zustand nur im DOM oder zentrale Liste vergessen: etwa 9.

4. **Teuerste Änderungsarten.** (a) Jeder neue Schreibweg zu Firestore: neues Feld, Regel, Deploy-Schritt, Kontobindung. (b) Jede neue Geste oder Bewegung, weil der Prüfstand kein WebKit hat (`LEHREN.md:1826`). Reine Rechen- und Anzeigefunktionen tauchen in der Liste kaum auf.

5. **Tests.** 121 `t_*.js` in `plan/werkzeuge/pruefstand`, 8669 Zeilen, fast alle Playwright gegen Firebase-Attrappen. Der Gesamtlauf braucht den Laptop am Strom (`LEHREN.md:1454`, `1549`). Nur etwa 8 Tests laden Quelltext ohne Browser. Die Lernlogik (`intervalForStufe` `app.js:130`, `gradeCard` `app.js:5988`) hat keinen schnellen Rechentest.

6. **Struktur von `app.js`.** 15 255 Zeilen, 535 Funktionen auf oberster Ebene, 97 `let` und 125 `const` global, 149 verschiedene `data-action`, 291 `render()`-Aufrufe, 156 `await`. Geladen wird sie schon als `<script type="module">` (`index.html:218`), aber als eine Datei.

7. **Offener Rückstand.** Zyklus 2 hat 103 neue Funde plus G-107–G-111 (G-110 kritisch: fremdes Konto löschbar). Nächster Schritt laut `plan/STAND.md:9–18` ist Paket A. Die 45 Vorhaben kämen obendrauf.

8. **Der Schalter existiert, aber nur für einen Fall.** `texteFreigeschaltet()` (`app.js:83`) wird an rund 12 Stellen abgefragt, `t_nur_betreiber.js` sichert ihn ab. Das Muster hat ein ganzes Teilprodukt (3.18.0–.10) ohne Wirkung auf andere Konten ausgeliefert.

9. **Keine Nutzungsdaten.** Die Statistik wurde in 3.17.23 auf Betreiberwunsch entfernt (`LEHREN.md:1376`). Welcher Pfad wenig genutzt wird, weiß niemand. „Drei datensparsame Kennzahlen" widerspricht dieser Entscheidung und braucht ein neues ausdrückliches Ja.

10. **Kandidaten zum Entfernen oder Vereinfachen** (Nutzung ungeprüft):
    - Einstieg mit 8 Bildschirmen (`EINSTIEG_LETZTER = 7`, `app.js:6618`), etwa 35 `EINSTIEG_*`-Konstanten, dazu die Startliste (`app.js:10607`).
    - Drei Wege zum Üben: `start-session`, Drill (`open-drill`, `start-drill`, `drill-set`, `drill-nochmal`), `trotzdem-ueben`.
    - Ideen-Board (`feedback-*`), das fünf Vorfälle erzeugt hat (3.9.1, 3.9.2, G-014, G-015, G-105).
    - Toter Code: `APPLE_LOGIN_BEREIT = false` (`app.js:28`), stillgelegtes `evaluateStreakForNewDay` (`LEHREN.md:1371`), `import-old` und `umzug-start`.

11. **Tragfähigkeit (Schätzung).** Die Grenze ist nicht die Dateigröße. Sie liegt beim gemeinsamen Zustand, der Prüfzeit je Version und der Gerätezeit des Betreibers.
    - In der jetzigen Struktur gehen 10–15 kleine Vorhaben, je hinter Schalter und nacheinander.
    - Die großen (zweite Richtung, Gastmodus, Lernpartner, Lehrer-Ausbau, Kreis über Texte) treffen genau die Klassen aus Punkt 4. Ohne Vorarbeit sind drei Folgeversionen je Vorhaben realistisch.

12. **Kleiner Umbau vorher, kein großer.** Komplett in Module aufteilen rate ich ab: 97 globale `let` lassen sich über Modulgrenzen nicht neu zuweisen, und jede Importzeile bräuchte die Versions-Query. Stattdessen:
    - **`kern.js`:** reine Lernlogik (Intervalle, Bewertung, Fälligkeit, Serie) ohne DOM, mit Node-Tests in Sekunden. Voraussetzung für Rückfall-Regel, Sitzungslimit, Ruhetag, zweite Richtung.
    - **Allgemeiner Schalter:** `freigeschaltet("name")` mit den Stufen Betreiber, Tester-UIDs, alle. Ein Test wie `t_nur_betreiber.js` je Schalter.
    - **Neue Vorhaben als eigene Datei,** nachgeladen per `import()`. `pruefe_stand.mjs` und `APP_SHELL` müssten das lernen (ungeprüft).
    - **Schnelltest** unter zwei Minuten für jeden Commit; der Gesamtlauf nur vor dem Veröffentlichen.

13. **Ballast oder nur verborgen.**
    - **Ballast:** Lernpartner (neue Sammlung, Moderation); Gastmodus (dritter Kontozustand, siehe Punkt 3; Proberunde ohne Konto reicht); Wochentakt, mehrere Codes und Nachliefern, solange es keinen Lehrer gibt; Konkordanz, Wurzel-Familien und „ähnliche Ayat" (Datenquelle, Lizenz, wer prüft den Inhalt? `CLAUDE.md`: kein Agent verfasst Religiöses); Selbstaufnahme und Abhör-Modus (Mikrofon unter iOS); Handschrift in der normalen Runde (Geste gegen Wischen); Formen-Tabellen-Kartentyp; Unterstützen-Link (minderjährig, Steuer und Recht); Web Share; „erste Woche als Weg" (drittes Einstiegssystem); Anker-.ics (Erinnerung gibt es schon).
    - **Doppelt:** Ruhetag, Urlaubsmodus und Rückkehr nach Pause lösen dasselbe Problem; nur das Letzte bauen. Von vier neuen Zahlen (sicher gekonnt, Trefferquote, Lastprognose, Monatsstand) höchstens zwei.
    - **Nur verborgen** (unter „Mehr" oder je Kartensatz): alles Fällige in einer Runde, kleinste Runde 5, Karte überspringen, ohne Harakat, CSV-Export, Druck. Wake Lock ganz ohne Einstellung.

14. **Reihenfolge-Risiko.** Alle 241 Versionen sind an einem Nutzer geeicht, der die Methode kennt. Fremde scheitern erfahrungsgemäß früher: Konto, Einstieg, erste eigene Karte, Tag 2. Minimaler Test ohne neuen Code:
    - 5–10 Leute aus Moschee oder Arabischkurs, über Lehrer oder Eltern vermittelt.
    - Link plus ein geteilter Kartensatz-Code (Teilen gibt es schon).
    - Erste Sitzung still beobachten, nach 7 Tagen nachfragen.

    | Beobachtung | bestätigt oder kippt |
    |---|---|
    | Bricht im Einstieg ab | Einstieg kürzen, Proberunde ohne Konto |
    | Legt keine eigene Karte an, nutzt nur den Code | Regal und Liste einfügen vor allem anderen |
    | Kommt an Tag 2 oder 7 nicht wieder | Rückkehr nach Pause, Erinnerung; sonst Ruhetag und Urlaub streichen |
    | Fragt von sich aus nach Deutsch→Arabisch | zweite Richtung; sonst zurückstellen |
    | Fragt nach Auswendiglernen | Texte freigeben, Kreis über Texte |
    | Kein Lehrer dabei oder interessiert | Lehrer-Ausbau streichen |

**Meine ersten zehn.** Davor Zyklus-2-Paket A (G-110) und der kleine Umbau aus Punkt 12.

1. Vollständiges Backup
2. Rückfall-Regel und Sitzungslimit nach Dringlichkeit (Lernlogik, braucht Freigabe)
3. Löschen mit Rückgängig
4. Liste einfügen mit Vorschau/CSV
5. Regal mit ein bis zwei Betreiber-Kartensätzen
6. Der Fremdentest selbst, vor allem Weiteren
7. Rückkehr nach Pause
8. Rundenende zeigt verpatzte Karten, mit Bearbeiten in der Abfrage
9. Ohne Harakat, als Option je Kartensatz
10. Öffentliche Startseite mit „Was wir nicht tun" (statisches HTML, kein Risiko für `app.js`)

Danach Texte „Bestand ohne Lawine", aber erst nach der Probelauf-Auswertung am 29.10.

## Teil 2 – Fragen an den Betreiber

1. **Erst der Rückstand, dann Neues?** 103 Funde aus Zyklus 2 sind offen, einer kritisch. Jedes neue Vorhaben auf ungeprüftem Boden erzeugt Folgefehler, die sich mit alten mischen.
   - (a) Paket A komplett zuerst
   - (b) nur die kritischen und hohen, dann mischen
   - (c) Neues sofort

   Empfehlung: (b).

2. **Zwei bis drei Sitzungen ohne sichtbare Änderung für den kleinen Umbau?** Gemeint sind `kern.js` mit Schnelltests und der allgemeine Schalter. Du siehst am Gerät nichts Neues, aber Lernlogik-Änderungen werden in Sekunden prüfbar statt nur am Ladegerät.
   - (a) ja, vor dem ersten Vorhaben
   - (b) nebenbei beim ersten Lernlogik-Vorhaben
   - (c) nein

   Empfehlung: (a).

3. **Jedes neue Vorhaben zuerst nur in Deinem Konto, dann Tester, dann alle?** So liefen die Texte, ohne einen einzigen Fehler bei anderen Konten. Es kostet je Vorhaben eine Abfrage und einen Test.
   - (a) ja, als feste Regel
   - (b) nur bei großen Vorhaben
   - (c) nein

   Empfehlung: (a).

4. **Fremdentest vor den großen Vorhaben?** Bisher hat kein Fremder die App benutzt, und Nutzungsdaten gibt es bewusst keine. 5–10 Personen und eine Woche würden zeigen, ob zweite Richtung, Lehrer-Ausbau und Gastmodus überhaupt gefragt sind.
   - (a) ja, nach den Vorhaben 1–5 meiner Liste
   - (b) sofort mit dem jetzigen Stand
   - (c) erst nach allem

   Empfehlung: (a). Wen könntest Du fragen (Lehrer, Moschee), und wissen Deine Eltern davon?

5. **Dürfen wir entfernen?** Kandidaten: Einstieg von 8 auf 3–4 Bildschirme, Ideen-Board durch ein einfaches Formular ersetzen, die drei Übungswege zusammenlegen, toten Code löschen. Jedes Entfernte spart Prüfzeit bei jeder künftigen Version.
   - (a) ja, nach dem Fremdentest gezielt
   - (b) nur toten Code jetzt
   - (c) nichts

   Empfehlung: (b) jetzt, (a) danach.

6. **Pause: ein Mechanismus oder drei?** Ruhetag, Urlaubsmodus und „Berg strecken" lösen dasselbe. Drei Mechanismen bedeuten drei Erklärungen und drei Eingriffe in Serie und Fälligkeit.
   - (a) nur Rückkehr nach Pause, automatisch
   - (b) dazu Ruhetag
   - (c) alle drei

   Empfehlung: (a). Ruhetag ist ohnehin als Z6b offen.

7. **Kennzahlen: bleibt „jede Spur entfernt"?** Ohne Messung entscheidet nur Dein Eindruck und der Fremdentest.
   - (a) bleibt, wir fragen Menschen
   - (b) drei anonyme Zähler mit Datenschutztext
   - (c) später entscheiden

   Empfehlung: (a) bis nach dem Fremdentest.

8. **Inhalte mit Dauerpflege: wer liefert und prüft?** Konkordanz, Wurzeln, ähnliche Ayat und Regal brauchen eine Quelle, eine Lizenz und jemanden, der Fehler korrigiert. Kein Agent darf religiösen Inhalt verfassen.
   - (a) nur Regal mit Deinen eigenen Sätzen
   - (b) zusätzlich Quran-Daten aus einer benannten Quelle wie bei Tanzil
   - (c) alles

   Empfehlung: (a).
