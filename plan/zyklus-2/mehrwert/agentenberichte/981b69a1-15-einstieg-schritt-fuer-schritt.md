# Einstieg Schritt für Schritt

Wörtlich aus dem Chat 981b69a1, Agent 15, gestartet 2026-10-07 15:55 (Quelle: `agent-a9edb1e64dfd99b6b.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 13 Agenten der ZWEITEN Runde für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server). Betreiber ist ein Einzelner (minderjährig), Nutzer bisher er und wenige Freunde; Ziel: öffentliche, ernsthafte Lern-Website für deutschsprachige Muslime, die Quran-/klassisches Arabisch lernen. Neu im Probelauf (nur Betreiber-Konto): "Texte auswendig lernen" mit Quran aus Tanzil-Daten (quran/).
Der Betreiber hat entschieden: Er will ALLES Nützliche aus Runde 1 bauen, egal wie schwer. Runde 2 soll tiefer und weiter schauen als Runde 1.
ERGEBNIS RUNDE 1 (nicht wiederholen, sondern darauf aufbauen): Bestätigte Fehler: (a) "Nicht" dann "Sicher" in derselben Runde gibt sofort wieder vollen Abstand (app.js gradeCard ~5985-6069); (b) Sitzungslimit schneidet erste N statt dringendste (startSession ~5893); (c) Backup ohne Verlauf/Serie/Einstellungen (exportBackup ~4191); (d) keine indexierbare Seite (index.html noindex, robots.txt). Geplante Ideen: Liste einfügen F-1 mit Vorschau/CSV/Lektionszeilen; ohne Harakat abfragen F-2 bzw. Harakat-Leiter; Regal mit Betreiber-Kartensätzen als statische Dateien (zuerst Medina Buch 1); Rückkehr nach Pause (Berg strecken); Ruhetag; Urlaubsmodus; öffentliche Startseite + Proberunde ohne Konto; Bearbeiten in der Abfrage; Rundenende zeigt verpatzte Karten; Kennzahl "sicher gekonnt"; Trefferquote reifer Karten; Problemkarten mit Diagnose/Verwechslungspaare; Wake Lock; Druckansicht; Text-/CSV-Export; Einladungslink für Lektions-Code; Nachliefern unter demselben Code; Wochentakt-Freigabe; Harakat-Eingabeleiste; Handschrift in normaler Runde; zweite Richtung Deutsch→Arabisch F-5; Texte: Bestand eintragen ohne Lawine, Kreis über mehrere Texte, Juz/Hizb/Seite, Hinweis auf ähnliche Ayat (rechnerisch), Übergangs-Abfrage, Einstiegsprobe, lokale Selbstaufnahme, Abhör-Modus auf einem Gerät, lange Ayat an Waqf-Zeichen teilen, Schwachstellen je Zeile; Wort in Aya antippen → Karte; Quran-Konkordanz zur Karte; Wurzel-Familien/Abdeckung (hängt an GPL-Morphologiedaten). Als "nicht bauen" eingestuft: TTS, Spracherkennung, KI-Karten, automatische Bedeutungen/Konjugationen, Web Push, öffentliche Nutzer-Bibliothek, Klassenraum mit Schülerfortschritt, Kinderkonten, .apkg-Import, OCR, Abzeichen/Bestenlisten, Rezitations-Audio ohne schriftliche Lizenz.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden, keine Tests, keine Server, keine Skripte starten, nichts installieren. app.js nie komplett lesen: Grep, dann Ausschnitte.
Projektregeln: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte; keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben. Keine Dark Patterns. DSGVO ernst. Lernlogik nur mit ausdrücklicher Betreiber-Entscheidung. Wichtige Dateien: plan/STAND.md, plan/LEHREN.md (116 KB, gezielt greppen), plan/grossplan/FUNKTIONEN.md und ENTSCHEIDUNGEN.md, plan/zyklus-2/AUFGABEN.md, ENTSCHEIDUNGEN.md und befunde/, plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/onboarding/, README.md, CHANGELOG.md, firestore.rules, firebase.json.
AUSGABEFORMAT (Deutsch, max. ca. 1000 Wörter, kein Vorgeplänkel): Teil 1 "Befunde/Ideen" (8–14 Punkte; je Punkt: Titel, was genau, Nutzen, Aufwand S/M/L, Abhängigkeiten, Risiko/Gegenargument, Beleg Datei:Zeile oder URL). Teil 2 "Fragen an den Betreiber" (3–8 Fragen; jede so formuliert, dass er sie OHNE Nachschlagen beantworten kann: 2–3 Sätze Hintergrund, die Auswahlmöglichkeiten, deine Empfehlung mit einem Satz Begründung). Ehrlich gewichten. Ungeprüftes als Vermutung kennzeichnen.

DEIN AUFTRAG: Die ersten zehn Minuten eines Fremden, Schritt für Schritt im Code nachvollzogen (das hat Runde 1 nicht geprüft). Gehe den Weg als Lesender durch: Aufruf der Adresse ohne Konto (index.html, was rendert app.js zuerst – Grep "onboarding", "einstieg", "renderEinstieg", "auth", "signIn", "createUser", "sendEmailVerification", "verif"), alle Einstiegs-Bildschirme in Reihenfolge mit ihrem tatsächlichen Wortlaut (kurz), Konto anlegen, E-Mail-Bestätigung (was passiert, wenn die Mail im Spam landet? erneut senden? anderes Gerät?), erster Bildschirm nach der Anmeldung, erste Karte anlegen (Karten-Blatt: Felder, Tastatur, arabisch tippen), erste Lernrunde, Rundenende, zweiter Tag (was sieht man, wenn nichts fällig ist?), Installieren als App (iOS-Hinweis vorhanden?), Passwort vergessen, Abmelden/Konto löschen. Lies dazu plan/onboarding/ (alle Dateien überfliegen, die Übergaben CLAUDE-HANDOFF/CHATGPT-HANDOFF nur für bekannte Probleme) und plan/zyklus-2/befunde/ (welche Befunde zum Einstieg gibt es schon – nicht wiederholen). Zähle Tipps/Eingaben bis zur ersten bewerteten Karte. Finde jede Stelle, an der ein Fremder abbricht, nicht weiterweiß oder etwas falsch versteht, und jede Stelle, an der Mehrwert versprochen, aber noch nicht erlebt wird. Entwirf darauf aufbauend konkret, wie die "Proberunde ohne Konto" und das "Regal mit Start-Kartensatz" in genau diesen Ablauf passen würden (an welcher Stelle, was fällt dafür weg), und welche technischen Hürden es gibt (Regeln verlangen bestätigte E-Mail? Daten vor dem Konto wohin?). Teil 2 wie beschrieben.

## Bericht des Agenten

## Der Weg eines Fremden heute (aus dem Code gelesen, nichts ausgeführt)

Adresse → Ladebild → `render()` zeigt Gästen immer den Einstieg (`app.js:7581-7586`).

- **Einstieg, 8 Bildschirme** (`app.js:7193-7435`):
  - S0 „Du hast es gelernt. Und es ist weg." → „Meinen Plan erstellen"
  - S1 „Wofür lernst du Arabisch?"
  - S2 „Was hat dich bisher gebremst?"
  - S3 „Probier eine Karte." (كِتَابٌ / Buch, nichts wird gespeichert)
  - S4 „Kannst du das gut lesen?"
  - S5 „Wie groß soll deine tägliche Runde sein?"
  - S6 „Wann machst du deine Runde?"
  - „Dein Plan entsteht …" (Zwangspause, laut EIN-4 etwa 5,7 s) → „Dein Plan steht." → „Plan speichern"
- **Konto:** Formular mit Name, E-Mail, Passwort (mind. 6 Zeichen) oder Google; Apple ist aus (`app.js:28`).
- **Bestätigung:** „Schritt 2 von 2 · Bestätigen", Spam-Hinweis, „Erneut senden", „Adresse falsch? Neu anfangen". Die Seite prüft alle 5 s selbst (`app.js:7777-7866`), also geht auch Bestätigen auf einem anderen Gerät.
- **Erster Bildschirm danach:** Liste „Dein Start 0 von 3" (Erste Karte anlegen / Erste Runde / Morgen wiederkommen), darunter „Kartensatz per Code" und „Datei einspielen" (`app.js:10131-10139`, `10607-10617`).
- **Erste Karte:** Blatt mit Wort (rtl), Übersetzung, Notiz; „Hinzufügen", dann „Fertig" (`app.js:8377-8408`).
- **Erste Runde:** „Antwort zeigen" → Nicht/Fast/Sicher → „Geschafft" (`app.js:11299-11353`).
- **Tag 2 ohne Fälliges:** „Für heute durch" und „Trotzdem üben" (`app.js:10513-10525`).

**Zählung bis zur ersten echten bewerteten Karte:** 13 Tipps im Einstieg, 1 Tipp plus 3 Textfelder im Formular, Wechsel in die Mail-App und Link, dann 6 Tipps plus 2 Textfelder (eines arabisch). Das sind rund 20 Tipps, 5 Texteingaben, ein App-Wechsel und eine Zwangspause. Mit Google etwa 21 Tipps und 2 Texteingaben.

## Teil 1 – Befunde/Ideen

1. **Der Wert kommt erst nach etwa 20 Tipps und fremder Hilfe.** Die Probekarte (S3) ist eine einzige Karte ohne Folgen. Die erste echte Runde besteht aus genau der einen selbst getippten Karte („Die Karte für heute ist durch.", `app.js:11327`). Den Kern der App, dass etwas wiederkommt, erlebt niemand am ersten Tag. Aufwand: siehe 9/10.

2. **„Dann fang bei den Buchstaben an" wird nicht eingelöst** (`app.js:1452-1454`; Aufbau-Liste „Eingerichtet: große Schrift, Buchstaben als Karten"). Wer nicht lesen kann, soll danach 28 Buchstaben selbst arabisch tippen. Buchstaben-Karten gibt es nicht (Grep „alphabet" ohne Treffer). Das ist der härteste Abbruchpunkt für Anfänger. Lösung: Buchstaben-Satz im Regal. Aufwand M, der Inhalt kommt vom Betreiber.

3. **„Kartensatz per Code" ist für Fremde ein totes Versprechen.** Auf dem Plan steht „Hat dir jemand einen Code gegeben …" (`app.js:7425-7427`), auf dem leeren Bildschirm ist es der zweite Knopf. Ein Fremder hat keinen Code; es öffnet sich nur ein Eingabefeld (`app.js:4474`). Genau diese Stelle wird das Regal. Aufwand M.

4. **Das Karten-Blatt hilft nicht beim arabischen Tippen.** Das Feld „Wort" hat `dir="rtl" lang="ar"`, aber keinen Platzhalter, kein Beispiel und keinen Hinweis, wie man die arabische Tastatur einschaltet (`app.js:8377-8379`; Grep „arabische Tastatur" ohne Treffer). Ohne installierte Tastatur ist hier Schluss. Vorschlag: eine Hinweiszeile, die nur erscheint, solange kein arabisches Zeichen im Feld steht (iPhone/Android je ein Satz). Aufwand S. Risiko: der Wortlaut muss am Gerät geprüft werden.

5. **Der Bestätigungslink führt aus der App heraus.** `sendEmailVerification(cred.user)` läuft ohne Rücksprung-Adresse (`app.js:3293`, `3341`). Der Link öffnet die Standardseite von Firebase auf `lernkarte-925c2.firebaseapp.com`, einer fremd aussehenden Adresse ohne „Zurück zu Adrabic". Das ist Firebase-Standardverhalten und nicht am Gerät geprüft. Die offene App fängt es per 5-s-Abfrage auf. Wer sie geschlossen hat, steht auf einer Seite ohne Weg zurück. Lösung: `actionCodeSettings.url` auf die App setzen. Aufwand S. Die Domain muss in der Firebase-Konsole freigegeben sein (Betreiber-Schritt).

6. **Spam bleibt die größte Einzelhürde.** Der Absender ist `noreply@…firebaseapp.com`, bekannt aus LEHREN § 10.1 (`plan/LEHREN.md:1241-1250`). „Erneut senden" hat keine Wartezeit-Anzeige; nach mehreren Tipps kommt „Zu viele Versuche" (`app.js:3136`). Neu ist die Folgerung: Solange es keine eigene Absender-Domain gibt, gehört Google über das Formular und nicht unter „oder" (`app.js:8013-8017`), weil der Weg ohne Bestätigungsmail auskommt (`app.js:3200`). Aufwand S. Gegenargument: Abhängigkeit von Google, minderjährige Nutzer.

7. **Vermutung: In-App-Browser (Instagram/TikTok/WhatsApp).** Google blockiert dort die Anmeldung per Popup (`signInWithPopup`, `app.js:3215`), und „Zum Home-Bildschirm" gibt es dort nicht. In LEHREN steht dazu nichts (Grep „WebView|In-App" ohne Treffer). Wer über einen geteilten Link kommt, ist genau dort. Vorschlag: erkennen und eine Zeile „In Safari/Chrome öffnen" zeigen. Aufwand S–M, braucht einen Gerätetest.

8. **Der Wenn-dann-Satz verschwindet.** Er liegt nur im Gerätespeicher und wird mit der ersten Karte gelöscht (`app.js:1515-1519`, `10110`); laut EIN-1 kommt er derzeit gar nicht an. Auf S6 heißt es „Ein fester Punkt am Tag hält besser", die Aufbau-Liste sagt „Eingerichtet: fester Zeitpunkt am Tag". Danach erinnert nichts mehr daran, auch nicht an Tag 2. Vorschlag: den Satz gerätelokal dauerhaft unter „Für heute durch" und am Stapel zeigen, änderbar in den Einstellungen. Aufwand S–M. Die Datenschutzerklärung Punkt 7 muss angepasst werden.

9. **Die Proberunde passt an S3.** Statt einer Karte gibt es 5–6 Karten aus dem Start-Satz, mit echtem Kartenbild (das Markup ist seit 3.17.42 schon dasselbe, `app.js:7286-7299`) und der echten Regel „Nicht kommt in dieser Runde wieder". Am Ende steht das echte Rundenende. Die Schritte S4 und S5 können wegfallen, weil ihre Vorgaben schon gesetzt sind. „Plan speichern" wird zu „Diese Karten behalten". Aufwand L.
   - Regeln: Jeder Zugriff verlangt `email_verified == true` (`firestore.rules:64-67`, `303-304`). Eine anonyme Anmeldung nützt deshalb nichts; die Proberunde muss rein lokal laufen.
   - Code: `renderSession`/`gradeCard` hängen an `bereiche`/`userDocRef`. Es braucht eine eigene kleine Schleife im Einstieg, nicht die echte Sitzung.
   - Übergabe: Den Weg gibt es schon. Im Zweig für frische Konten (`app.js:2391-2411`) läuft `einstiegAnwenden()`; dort den gemerkten Satz über `verarbeiteImportDaten` (`app.js:4514`) einspielen.
   - Datenschutz: mehr Daten im Gerätespeicher vor dem Konto. Die Zeitgrenze bei Abbruch (G-042-Rest) ist noch offen.

10. **Das Regal braucht keine Regeländerung.** Technisch sind es statische JSON-Dateien im Format der Code-Sätze, geladen wie die Quran-Dateien (`fetch` auf dieselbe Herkunft, `app.js:11648-11697`; die CSP erlaubt das mit `connect-src 'self'`, `firebase.json:60`). Drei Stellen:
    - Plan-Bildschirm: statt der Code-Zeile „Dein Start-Satz liegt bereit".
    - Leerer Lernen-Bildschirm: Regal als gefüllter erster Knopf, „Erste Karte anlegen" daneben.
    - Start-Liste: Schritt 1 heißt „Erste Karten holen".
    
    Aufwand M. Die Dateien müssen in den Cache von `sw.js`. Der Inhalt kommt vom Betreiber.

11. **Vermutung: Nach der iOS-Installation beginnt alles von vorn.** Die Home-Bildschirm-App hat einen eigenen Speicher, also ist man abgemeldet und sieht S0 „Du hast es gelernt. Und es ist weg." „Ich habe schon ein Konto" steht klein darunter und ist auf kleinen Geräten laut EIN-6 abgeschnitten. Vorschlag: bei `navigator.standalone` (`app.js:2253`) direkt das Anmeldeformular zeigen. Aufwand S, Gerätetest nötig.

12. **Die Suchmaschinen-Dateien widersprechen sich.** Die Sitemap meldet `/` (`sitemap.xml:4`), dieselbe Seite trägt `noindex` (`index.html:18`), und Kommentare verweisen auf eine `landing.html`, die es nicht gibt (`app.js:7823`, `10097`). Die öffentliche Startseite aus Runde 1 sollte eine eigene statische Datei sein, deren Knopf direkt in die Proberunde führt. Sonst folgen auf die Startseite noch einmal die acht Einstiegs-Bildschirme.

**Ohne Fund:** Passwort vergessen (neutrale Meldung, `app.js:3413`), Abmelden mit Rückfrage, Konto löschen (Backup-Angebot, Adresse eintippen, gedrückt halten, `app.js:9468-9516`) und die Sackgasse bei vertippter Adresse (`app.js:3365`) sind sauber gelöst. Der Installationshinweis fehlt noch, ist aber als Z10 entschieden (`plan/zyklus-2/ENTSCHEIDUNGEN.md:20`). Er steht dann nur in den Einstellungen; besser zusätzlich einmal nach der ersten Runde.

## Teil 2 – Fragen an den Betreiber

1. **Wo sitzt die Proberunde?** Heute probiert man im Einstieg genau eine Karte, die erste echte Runde kommt erst nach Konto und Mail.
   - (a) Sie ersetzt den Schritt „Probier eine Karte", die Fragen bleiben davor.
   - (b) Sie kommt direkt nach dem ersten Bildschirm, die Fragen danach.
   - (c) Sie steht nur auf der öffentlichen Startseite.
   
   Empfehlung: (b), weil der Fremde so nach zwei Tipps lernt statt nach sieben.

2. **Was nimmt man aus der Proberunde ins Konto mit?** Ohne Konto kann nichts in die Datenbank, alles läge bis zum Anlegen nur auf dem Gerät.
   - (a) Nur der Kartensatz, alle Karten als neu.
   - (b) Kartensatz und die abgegebenen Bewertungen.
   - (c) Nichts.
   
   Empfehlung: (a). Die Lernlogik bleibt unberührt, und „Diese Karten behalten" ist trotzdem ehrlich.

3. **Wie lang darf der Einstieg mit Proberunde sein?** Heute sind es 13 Tipps vor dem Formular; du wolltest ihn bewusst persönlich.
   - (a) Alles bleibt, die Proberunde kommt dazu.
   - (b) Schriftgröße und Rundengröße fallen weg (stehen in den Einstellungen).
   - (c) Nur Ziel und Zeitpunkt bleiben.
   
   Empfehlung: (b). Beide Schritte haben schon sinnvolle Vorgaben und liefern keinen Wertmoment.

4. **Welcher Start-Satz steht als erster im Regal?** Die Wortlisten musst du liefern.
   - (a) Die 28 Buchstaben.
   - (b) Medina Buch 1, Lektion 1.
   - (c) Beide, je nach Antwort auf „Ich lese noch schlecht".
   
   Empfehlung: (c), weil das Buchstaben-Versprechen im Einstieg sonst leer bleibt.

5. **Soll dein gewählter Satz („Nach dem Maghrib-Gebet mache ich eine Runde.") dauerhaft sichtbar bleiben?** Heute verschwindet er mit der ersten Karte. Er läge weiter nur auf dem Gerät, nicht im Konto.
   - (a) Dauerhaft auf dem Lernen-Bildschirm, änderbar in den Einstellungen.
   - (b) Nur in der ersten Woche.
   - (c) Wie bisher.
   
   Empfehlung: (a). Sonst ist es der einzige Einstiegsschritt ohne jede Wirkung.

6. **Soll Google über dem E-Mail-Formular stehen?** Bestätigungsmails landen oft im Spam, solange es keine eigene Absender-Domain gibt; mit Google entfällt die Mail.
   - (a) Google oben.
   - (b) Wie bisher unter „oder".
   - (c) Erst eine eigene Mail-Domain einrichten.
   
   Empfehlung: (a) jetzt und (c) später. Das ist die billigste Entschärfung der größten Hürde.

7. **Darf im Karten-Blatt eine Hilfszeile zur arabischen Tastatur stehen?** Wer keine installiert hat, kann heute nichts eintippen und erfährt nicht, warum. Die Zeile verschwände beim ersten arabischen Zeichen.
   - (a) Ja, je ein Satz für iPhone und Android.
   - (b) Nein, das Regal reicht.
   
   Empfehlung: (a). Eigene Karten bleiben der Kern der App, und der Hinweis kostet eine Zeile.
