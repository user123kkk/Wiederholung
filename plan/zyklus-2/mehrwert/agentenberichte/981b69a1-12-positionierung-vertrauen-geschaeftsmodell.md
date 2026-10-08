# Positionierung Vertrauen Geschäftsmodell

Wörtlich aus dem Chat 981b69a1, Agent 12, gestartet 2026-10-07 15:39 (Quelle: `agent-ac65990aeeb4bbe13.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 12 parallelen Ideen-Agenten für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server; Hosting Firebase). Der Betreiber ist ein Einzelner, bisher Nutzer: er und wenige Freunde; Ziel ist eine öffentliche, ernsthafte Lern-Website. Zielgruppe: deutschsprachige Muslime, die Arabisch (Quran-/klassisches Arabisch) lernen. Neu im Probelauf: "Texte auswendig lernen" (u. a. Quran, Tanzil-Daten unter quran/).
Frage des Betreibers: Wie kann das Tool ECHTEN, UNBESTREITBAREN Mehrwert bieten – Features, Ausbau, Verbesserungen, Neues. Er will ein großes, gründliches Ergebnis.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Also: keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden (log, show, diff, grep), keine Tests, keine Server, keine Skripte aus plan/werkzeuge starten, nichts installieren. app.js nie komplett lesen, sondern mit Grep gezielt suchen und Ausschnitte lesen.
Nützliche Dateien: KONZEPT.md, README.md, CHANGELOG.md, plan/STAND.md, plan/grossplan/FUNKTIONEN.md (bereits bewertete Funktionen: Korb 1/2/3 – nichts davon einfach wiederholen, sondern darauf aufbauen oder begründet widersprechen), plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/monetarisierung/GERUEST.md, plan/landing-page-strategie/STRATEGIE.md, plan/beobachtungen-lernwerkzeug.md, plan/zyklus-2/AUFGABEN.md.
Rahmenbedingungen des Projekts: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte selbst (Wortlaut kommt vom Betreiber oder aus geprüften Quellen); keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben der Nutzer. Keine Dark Patterns. Datenschutz (DSGVO) ernst. Kein eigener Server (Cloud Functions wären eine bewusste Entscheidung – als Abhängigkeit kennzeichnen).
AUSGABEFORMAT (Deutsch, max. ca. 900 Wörter, kein Vorgeplänkel): 8–14 konkrete Ideen. Je Idee: Titel; was genau (2–3 Sätze); für wen und welcher belegbare Nutzen; Aufwand S/M/L; Abhängigkeiten (Server? Inhalte vom Betreiber? Lizenz? iOS-Grenzen?); Risiko/Gegenargument; Beleg (Datei:Zeile im Repo bzw. URL). Am Ende: deine Top 3 mit einem Satz Begründung und 1–2 Dinge, die man ausdrücklich NICHT bauen sollte. Ehrlich gewichten, nicht verkaufen. Nichts erfinden: Was du nicht geprüft hast, als Vermutung kennzeichnen.

DEIN BLICKWINKEL: Strategie – worin liegt der EINE unbestreitbare Mehrwert, und wie wird er für Fremde in 10 Sekunden glaubhaft? Lies plan/landing-page-strategie/STRATEGIE.md und BEFUND.md, plan/monetarisierung/GERUEST.md und AUFTRAG.md, plan/grossplan/FUNKTIONEN.md, plan/analytics/GERUEST.md, plan/feedback-board/AUFTRAG.md, datenschutzerklaerung.html (überfliegen) und index.html (was sieht ein nicht angemeldeter Besucher?). Arbeite heraus: (1) 3–4 mögliche Positionierungen (z. B. "das einfachste Werkzeug, um die Vokabeln deines Arabischkurses nie wieder zu vergessen", "Quran-Wortschatz gezielt", "Auswendiglernen mit System", "Werkzeug für Lehrer und ihre Klassen") mit ehrlichem Für und Wider und einer Empfehlung; (2) welche Vertrauens-Merkmale für diese Zielgruppe wirklich zählen und technisch belegbar sind (keine Werbung, kein Tracking, Datenexport, Konto löschen, offline, keine Musik/Bilder von Lebewesen/Spielerei, klare religiöse Zurückhaltung, Quelle des Quran-Textes mit Prüfsumme) und wie man sie sichtbar macht, ohne zu prahlen; (3) Ausprobieren ohne Konto (Demo-Runde auf der Startseite, lokaler Gastmodus mit späterer Übernahme – im Code prüfen, was es dafür schon gibt); (4) ein Geschäftsmodell, das den Mehrwert nicht beschädigt (kostenlos-für-immer-Kern, freiwillige Unterstützung, Lehrer-/Institutslizenz; Stripe ohne eigenen Server? Firebase-Erweiterung? rechtliche Folgen für einen Einzelbetreiber in Deutschland: Gewerbe, Impressum, Widerruf – nur einordnen, keine Rechtsberatung); (5) wie man misst, ob der Mehrwert ankommt, ohne Tracking-Sünden (welche 3 Kennzahlen, datensparsam). Recherchiere vergleichbare kleine Nischen-Lernprodukte, die das gut gelöst haben. Sei bereit zu sagen: "Der größte Mehrwert ist kein neues Feature, sondern X."

## Bericht des Agenten

## Strategie-Bericht (Blickwinkel: der eine Mehrwert, in 10 Sekunden glaubhaft)

**Kernbefund vorab:** Der größte Mehrwert ist kein neues Feature. Ein Fremder kann Adrabic heute weder finden noch ohne Hürde ausprobieren.
- `landing.html` ist seit 3.9.0 gelöscht (`CHANGELOG.md:1720`); "/" liefert `index.html` mit `noindex, nofollow` (`index.html:18`), `robots.txt` sperrt `/index.html`. `sitemap.xml` nennt "/" trotzdem. Es gibt also keine indexierbare Seite mit dem Wort "Arabisch".
- Vor der ersten echten Karte stehen acht Einstiegs-Bildschirme, Konto und E-Mail-Bestätigung (`app.js:7589`), danach ein leeres Werkzeug (`STRATEGIE.md:113–127`).

### (1) Positionierungen
| | Dafür | Dagegen |
|---|---|---|
| A "Vokabeln deines Arabischkurses nie wieder vergessen" | sofort wahr, kein Inhalt nötig, Handschrift und Lektionsfreigabe belegen es | leerer Start; konkurriert mit Anki/Quizlet |
| B "Quran-Wortschatz gezielt" | starke Suchbegriffe | braucht geprüften Inhalt vom Betreiber; der Agenten-Kartensatz wurde zu Recht verworfen (`STRATEGIE.md:189–197`) |
| C "Auswendiglernen mit System" (Texte/Quran) | einziges Feld mit mitgeliefertem, lizenzklarem Inhalt (Tanzil), löst den leeren Start | nur im Betreiber-Konto, Probelauf bis 29.10.; Tarteel ist stark (aber Abo und KI) |
| D "Werkzeug für Lehrer und ihre Schüler" | ein Lehrer bringt 10–30 Lernende samt Stoff; Code-Teilen existiert | Minderjährigen-Daten, kein belegter Lehrer-Nutzer |

**Empfehlung:** A als Satz, D als Vertriebsweg, C als zweite Säule erst nach der Auswertung. Ein Satz wie "Was du im Arabischunterricht lernst, bleibt. Dein Lehrer gibt dir die Lektion per Code." B nur, wenn der Betreiber den Inhalt selbst liefert.

### Ideen

**1. Öffentliche Startseite neu, statisch, indexierbar (M).** Stufenleiter, Bild des Handschrift-Felds, "Was Adrabic nicht ist"; der Aufbau steht fertig in `STRATEGIE.md:436–449`. Nutzen: überhaupt auffindbar. Abhängigkeit: Wortlaut vom Betreiber. Risiko: dritter Anlauf, also erst Text freigeben, dann bauen.

**2. Echte Proberunde ohne Konto (M).** Den Einstieg nach Bildschirm 0 in eine 5-Karten-Runde führen (Nicht/Fast/Sicher, Handschrift), rein im Arbeitsspeicher. Heute gibt es nur eine Beispielkarte (`app.js:1376`, Demo `6763ff`). Nutzen: Mechanik erlebt statt behauptet. Abhängigkeit: 5 Wörter vom Betreiber. Risiko: verlängert den Einstieg, also Fragen dafür kürzen.

**3. Lokaler Gastmodus mit späterer Übernahme (L).** Nicht vorhanden: kein `signInAnonymously`, lokal liegen nur Einstiegs-Antworten (`app.js:1345–1370`). Anonymes Firebase-Konto plus `linkWithCredential` wäre der Weg ohne Server. Gegenargument: verwaiste Daten, Regeln setzen bestätigte Konten voraus, Datenschutztext müsste sich ändern. Urteil: erst nach Idee 2, nur wenn der Abbruch am Konto belegt ist.

**4. Seite "Was wir nicht tun – und wo du es nachprüfst" (S).** Je Zeile ein Beleg: keine fremden Skripte (CSP in `firebase.json`), Sicherung als Datei (`app.js:9370`), Konto löschen (`app.js:9304`, Reihenfolge `3450ff`), offline, kein Ton, keine Bilder, Vorschläge ohne Kontobezug. Zählt für diese Zielgruppe mehr als Funktionslisten. Achtung: Der Betreiber hat die Zeile "Kostenlos. Keine Werbung, keine Cookies." gestrichen (`app.js:7429`). Also nüchterne Liste auf eigener Seite, kein Werbesatz im Einstieg.

**5. Quran-Text: Prüfsumme sichtbar (S).** Die SHA-256 der Tanzil-Datei steht nur im Plan (`plan/texte-lernen/KONZEPT.md:299–300`). Im Code fand ich keinen Aufruf von `crypto.subtle`, geprüft wird also nur im Test. Vorschlag: Quelle, Version und Prüfsumme auf der Quellenzeile (`app.js:11654`) anzeigen, optional beim Laden prüfen. Starkes, seltenes Vertrauensmerkmal. Risiko: Fehlalarm bei einer Abweichung, deshalb ruhig formulieren.

**6. "Religiöse Zurückhaltung" als ein Satz vom Betreiber (S).** Etwa: Die App lehrt nichts Religiöses, sie hält fest, was du anderswo lernst. Der Wortlaut kommt nur von ihm. Risiko: jede Formulierung lädt zur Einordnung ein, daher kurz und ohne Abgrenzung.

**7. Lehrer-Einstiegsseite `/lehrer` (S–M).** Drei Schritte: Lektion anlegen, Code erzeugen, Schüler lösen ein. Das Gerüst sagt selbst, das Teilen sei der Kern (`plan/lehrer-modus/GERUEST.md`, A0). Kein neuer Datenfluss. Risiko: ohne einen echten Lehrer als Pilot bleibt es Vermutung.

**8. Liste einfügen (F-1) vor allem anderen (M).** Ich widerspreche Korb 1 nicht. F-1 ist die Voraussetzung dafür, dass A und D tragen (`plan/grossplan/FUNKTIONEN.md:20`).

**9. Geschäftsmodell: Kern dauerhaft frei, freiwillige Unterstützung, später Lehrer-Paket (S, dann L).**
- Erster Schritt: Stripe Payment Link mit frei wählbarem Betrag, ohne Server und ohne Freischaltung ([Stripe](https://support.stripe.com/questions/how-to-accept-donations-through-stripe)). Die Zuordnung zu einem Konto ginge über `client_reference_id` ([Stripe-Doku](https://docs.stripe.com/payment-links/url-parameters)).
- Vorbild: Anki ist überall frei, nur die iOS-App kostet einmalig und trägt den Rest ([Anki](https://apps.ankiweb.net/support)).
- Einordnung, keine Rechtsberatung: Sobald Geld fließt, stimmt "privat und nicht-gewerblich" in der Datenschutzerklärung nicht mehr. Dann stehen Gewerbeanmeldung, Widerruf/AGB und Zahlungsdaten im Datenschutztext an. Der Inhaber ist minderjährig (`FUNKTIONEN.md:29–32`). Die Kleinunternehmergrenze liegt seit 2025 bei 25.000 € Vorjahresumsatz ([IHK München](https://www.ihk-muenchen.de/de/Service/Recht-und-Steuern/Steuerrecht/Umsatzsteuer/kleinunternehmerregelung/)).
- Automatische Freischaltung braucht Cloud Functions und den Blaze-Tarif.
- Risiko: "Spende" ohne Gemeinnützigkeit ist das falsche Wort; "Unterstützen" passt.

**10. Drei Kennzahlen ohne Tracking (S–M).**
- Aktivierung: Anteil neuer Konten mit beendeter erster Runde.
- Rückkehr: Lerntag in Woche 2 und Woche 4.
- Eingelöste Codes je erzeugtem Code.

Technisch als Tagessummen ohne Kennung in Firestore (`plan/analytics/GERUEST.md`, Möglichkeit 3, Zeilen 97–103); die Rückkehr als einmaliger Zähler aus dem lokalen `verlauf`. Bis dahin: Search Console, Zahl der Auth-Konten, fünf Gespräche. Abhängigkeit: neue Regel, Absatz im Datenschutztext, Rechtsprüfung durch eine Person. Gegenargument: PostHog wurde wegen "Kopfschmerzen" entfernt, also erst fragen.

**11. Texte/Quran nach dem Probelauf kontrolliert öffnen (M).** Als zweite Säule mit eigener Unterseite, kostenlos (F-12: "wenn, dann kostenlos"). Abhängigkeit: Auswertung am 29.10., ausdrückliches Ja des Betreibers, Art.-9-Einwilligung steht schon.

**12. Sitemap und SEO-Reste bereinigen (S).** Solange Idee 1 fehlt, verweist die Sitemap auf eine noindex-Seite. Mit der neuen Startseite `canonical`, Titel mit "Arabisch" und FAQ-JSON-LD wieder herstellen.

### Top 3
1. **Idee 1 mit 4 und 5:** Ohne öffentliche, belegte Seite sieht kein Fremder den Mehrwert.
2. **Idee 2 mit 8:** Der Bruch "Konto, dann leeres Werkzeug" ist laut eigener Strategie der größte Hebel.
3. **Idee 7:** Ein Lehrer löst Stoff, Vertrauen und Verbreitung zugleich, ohne neuen Code-Kern.

### Ausdrücklich nicht bauen
- Abo oder Bezahlschranke vor belegter Nutzung, ebenso Testimonials und Nutzerzahlen bei einer Handvoll Nutzern.
- Von Agenten erstellte Start-Kartensätze oder Quran-Wortlisten, auch nicht "nur als Platzhalter".

Nicht geprüft und daher Vermutung: tatsächliche Suchnachfrage, das Verhalten echter Lehrer, wie Tarteel bei deutschsprachigen Nutzern ankommt.
