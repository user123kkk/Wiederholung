# Kosten Sicherheit Skalierung

Wörtlich aus dem Chat 981b69a1, Agent 18, gestartet 2026-10-07 15:55 (Quelle: `agent-a1a4ee87a0f69a53b.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 13 Agenten der ZWEITEN Runde für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server). Betreiber ist ein Einzelner (minderjährig), Nutzer bisher er und wenige Freunde; Ziel: öffentliche, ernsthafte Lern-Website für deutschsprachige Muslime, die Quran-/klassisches Arabisch lernen. Neu im Probelauf (nur Betreiber-Konto): "Texte auswendig lernen" mit Quran aus Tanzil-Daten (quran/).
Der Betreiber hat entschieden: Er will ALLES Nützliche aus Runde 1 bauen, egal wie schwer. Runde 2 soll tiefer und weiter schauen als Runde 1.
ERGEBNIS RUNDE 1 (nicht wiederholen, sondern darauf aufbauen): Bestätigte Fehler: (a) "Nicht" dann "Sicher" in derselben Runde gibt sofort wieder vollen Abstand (app.js gradeCard ~5985-6069); (b) Sitzungslimit schneidet erste N statt dringendste (startSession ~5893); (c) Backup ohne Verlauf/Serie/Einstellungen (exportBackup ~4191); (d) keine indexierbare Seite (index.html noindex, robots.txt). Geplante Ideen: Liste einfügen F-1 mit Vorschau/CSV/Lektionszeilen; ohne Harakat abfragen F-2 bzw. Harakat-Leiter; Regal mit Betreiber-Kartensätzen als statische Dateien (zuerst Medina Buch 1); Rückkehr nach Pause (Berg strecken); Ruhetag; Urlaubsmodus; öffentliche Startseite + Proberunde ohne Konto; Bearbeiten in der Abfrage; Rundenende zeigt verpatzte Karten; Kennzahl "sicher gekonnt"; Trefferquote reifer Karten; Problemkarten mit Diagnose/Verwechslungspaare; Wake Lock; Druckansicht; Text-/CSV-Export; Einladungslink für Lektions-Code; Nachliefern unter demselben Code; Wochentakt-Freigabe; Harakat-Eingabeleiste; Handschrift in normaler Runde; zweite Richtung Deutsch→Arabisch F-5; Texte: Bestand eintragen ohne Lawine, Kreis über mehrere Texte, Juz/Hizb/Seite, Hinweis auf ähnliche Ayat (rechnerisch), Übergangs-Abfrage, Einstiegsprobe, lokale Selbstaufnahme, Abhör-Modus auf einem Gerät, lange Ayat an Waqf-Zeichen teilen, Schwachstellen je Zeile; Wort in Aya antippen → Karte; Quran-Konkordanz zur Karte; Wurzel-Familien/Abdeckung (hängt an GPL-Morphologiedaten). Als "nicht bauen" eingestuft: TTS, Spracherkennung, KI-Karten, automatische Bedeutungen/Konjugationen, Web Push, öffentliche Nutzer-Bibliothek, Klassenraum mit Schülerfortschritt, Kinderkonten, .apkg-Import, OCR, Abzeichen/Bestenlisten, Rezitations-Audio ohne schriftliche Lizenz.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden, keine Tests, keine Server, keine Skripte starten, nichts installieren. app.js nie komplett lesen: Grep, dann Ausschnitte.
Projektregeln: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte; keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben. Keine Dark Patterns. DSGVO ernst. Lernlogik nur mit ausdrücklicher Betreiber-Entscheidung. Wichtige Dateien: plan/STAND.md, plan/LEHREN.md (116 KB, gezielt greppen), plan/grossplan/FUNKTIONEN.md und ENTSCHEIDUNGEN.md, plan/zyklus-2/AUFGABEN.md, ENTSCHEIDUNGEN.md und befunde/, plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/onboarding/, README.md, CHANGELOG.md, firestore.rules, firebase.json.
AUSGABEFORMAT (Deutsch, max. ca. 1000 Wörter, kein Vorgeplänkel): Teil 1 "Befunde/Ideen" (8–14 Punkte; je Punkt: Titel, was genau, Nutzen, Aufwand S/M/L, Abhängigkeiten, Risiko/Gegenargument, Beleg Datei:Zeile oder URL). Teil 2 "Fragen an den Betreiber" (3–8 Fragen; jede so formuliert, dass er sie OHNE Nachschlagen beantworten kann: 2–3 Sätze Hintergrund, die Auswahlmöglichkeiten, deine Empfehlung mit einem Satz Begründung). Ehrlich gewichten. Ungeprüftes als Vermutung kennzeichnen.

DEIN AUFTRAG: Was passiert, wenn 1.000 oder 10.000 Fremde kommen? Kosten, Kontingente, Missbrauch, Betriebssicherheit – das ist Voraussetzung dafür, dass Mehrwert überhaupt ankommt. Lies firestore.rules vollständig, firebase.json, sw.js, und in app.js das Datenmodell und die Schreibwege (Grep "patchDoc", "setDoc", "updateDoc", "writeBatch", "onSnapshot", "getDoc", "collection(", "geteilteLektionen", "enableIndexedDbPersistence", "persistentLocalCache", "appCheck", "AppCheck"). Kläre: Wie viele Lese-/Schreibvorgänge erzeugt ein typischer Lerntag (Runde mit 20 Karten, App-Start, Mehrgeräte)? Wie sind Daten geschnitten (ein Dokument je Nutzer? je Bereich? je Karte?) und wo liegt die 1-MiB-Grenze gefährlich nah (Bereich mit 3.000 Karten, Texte mit Sure 2)? Rechne gegen das kostenlose Spark-Kontingent von Firestore, Auth und Hosting (aktuelle Zahlen im Web recherchieren und Quelle nennen: Lesen/Schreiben/Tag, Speicher, Hosting-Transfer pro Monat; E-Mail-Versandgrenzen von Firebase Auth für Bestätigungsmails!) – ab wie vielen aktiven Nutzern reißt welches Limit, und was passiert dann (App tot bis Mitternacht Pazifik-Zeit?). Missbrauch: Was kann ein böswilliges bestätigtes Konto anrichten (geteilteLektionen fluten, riesige Dokumente, Massen-Kontoerstellung, E-Mail-Bombing über Bestätigungsmails)? Gibt es App Check, reCAPTCHA, Mengenbremse in den Regeln (G-016)? Wie wirken sich die Runde-1-Ideen aus (Liste einfügen mit 500 Karten, zusätzliche Tageszähler, Schwachstellen-Feld je Zeile, Regal als statische Dateien, Quran-Morphologiedatei mehrere MB im Hosting-Transfer, Audio)? Was fehlt für den Betrieb: Fehlermeldungen an den Betreiber ohne Tracking, Statusseite, Notfall-Schalter, Sicherung der Firestore-Daten (Export ohne Blaze möglich?), was wenn der Betreiber ausfällt? Schlage konkrete, kleine Schutzmaßnahmen vor und sage ehrlich, ab welcher Größe Blaze (bezahlt, mit Budget-Alarm) unvermeidlich ist. Teil 2 wie beschrieben.

## Bericht des Agenten

## Teil 1 – Befunde/Ideen (Betrieb bei 1.000–10.000 Fremden)

Kontingente (Spark, abgerufen 07.10.2026): Firestore 50.000 Lesen / 20.000 Schreiben / 20.000 Löschen je Tag, 1 GiB Speicher, 10 GiB Transfer/Monat, Rücksetzung gegen Mitternacht Pazifik-Zeit (= ca. 9 Uhr deutscher Zeit); Dokument max. 1 MiB (https://firebase.google.com/docs/firestore/quotas). Auth: 1.000 Bestätigungsmails/Tag, 150 Passwort-Mails/Tag, 100 neue Konten/Stunde je IP (https://firebase.google.com/docs/auth/limits). Hosting: 10 GB Transfer/Monat, danach „kurze Schonfrist", dann Seite abgeschaltet bis Monatsende (https://firebase.google.com/docs/hosting/usage-quotas-pricing).

**1. Lesekontingent reißt zuerst – bei etwa 50–150 täglich Aktiven**
- Was: Die App hört dauerhaft auf die GANZE Kartensammlung (app.js:2110). Nach mehr als 30 Minuten Pause rechnet Firestore jeden Start wie eine neue Abfrage ab, also 1 Lesen je Karte (https://firebase.google.com/docs/firestore/pricing).
- Rechnung je Lerntag: Start = 1 + Bereiche + K Karten; Runde mit 20 Karten = ca. 20–40 Echo-Lesungen (Vermutung); jedes weitere Gerät noch einmal K. Bei K=500: ca. 550 Lesen, also rund 90 Aktive/Tag. Bei K=1.000: rund 47. Bei K=200: rund 200.
- Folge: 1.000 Aktive gehen auf Spark nicht. Ein Regal-Satz mit 600 Karten oder Sure 2 (286 Zeilen als Kartendokumente) macht es schlimmer.
- Abhilfe (L, berührt Datenweg, nicht Lernlogik): Start aus lokalem Cache, vom Server nur Geändertes holen (Feld `geaendertAm` + Abfrage „neuer als letzter Abgleich"). Senkt den Start von K auf wenige Lesungen. Risiko: Löschungen brauchen dann Grabsteine; größter Umbau seit 2.0.0.
- Bereits als Nebenbefund notiert, nie gerechnet: plan/grossplan/befunde/LERNEN.md:69.

**2. Schreibkontingent: rund 450 Lernende/Tag, oder ein einziger Import**
- Was: Je Bewertung 1 Kartenschreiben (app.js:2827) plus Tageszähler mit 2-Sekunden-Bündelung (app.js:1011) = 20–40 Schreiben je Runde.
- `IMPORT_MAX_KARTEN` steht weiter auf 20.000 (app.js:208), obwohl 5.000 beschlossen ist (plan/grossplan/ENTSCHEIDUNGEN.md:133). Ein Import verbraucht das Tageskontingent aller.
- Runde-1-Wirkung: „Liste einfügen" mit 500 Karten = 500 Schreiben; 40 neue Nutzer mit einem 500er-Regal-Satz am selben Tag = Kontingent weg.
- Abhilfe (S): Import auf 2.000–5.000 senken; Zähler erst beim Rundenende/Verlassen schreiben. Zusätzliche Tageszähler und Schwachstellen je Zeile ins selbe Schreiben legen, nie als Extra-Schreiben.

**3. Was bei erschöpftem Kontingent passiert (teils Vermutung)**
- Bestehende Geräte laufen aus dem lokalen Cache weiter (app.js:2233); Schreibvorgänge bleiben in der Warteschlange und gehen später raus (nach SDK-Verhalten, nicht getestet).
- Neue Nutzer, neue Geräte und Code-Einlösen sind tot bis ca. 9 Uhr. Die App sagt nur „gerade zu viele Anfragen" (app.js:2491, 4294).
- Abhilfe (S): ehrliche Meldung „Tageskontingent erschöpft, Dein Fortschritt ist lokal gesichert".

**4. geteilteLektionen fluten = Speicher voll, Schreiben für alle gesperrt**
- Was: Jedes bestätigte Konto darf beliebig viele Dokumente bis 1 MiB anlegen; die Regel begrenzt weder Anzahl noch Kartenzahl (firestore.rules:327–347, bewusst so laut Kommentar 337–342). Rund 1.100 Dokumente füllen 1 GiB, bleiben unter dem Tageslimit und müssen dann von Hand gelöscht werden.
- Abhilfe (M): Zähler im Nutzerdokument, der im selben Stapel um genau 1 steigt (Regel mit `getAfter`), Deckel z. B. 20 Codes je Konto; dazu `karten.size() <= 5000`. Geht ohne Server.
- Risiko: Regel und App müssen gleichzeitig live gehen (wie K10).

**5. Kartenflut und Feedback-Spam ohne Bremse**
- Was: Karten unbegrenzt, `extra` bis 5.000 Zeichen (firestore.rules:244). Ein Skript mit Wegwerf-Mail verbraucht täglich 20.000 Schreiben. Feedback-Anlegen hat keine Mengenbremse (firestore.rules:442).
- Kein App Check, kein reCAPTCHA im Code (Grep: 0 Treffer); als E-15/K14 „später" geführt (plan/grossplan/KONSOLE.md:26).
- Ehrlich: Regeln allein können das nicht verhindern. App Check ist kostenlos und auf Spark möglich, braucht aber reCAPTCHA (Fremddienst, CSP, Datenschutztext) und sperrt bei Fehlkonfiguration alle aus.

**6. Bestätigungsmails: 1.000/Tag fürs ganze Projekt**
- Was: Registrierung mit fremder Adresse schickt dem Opfer eine Mail (app.js:3293). Ein Angreifer kann das Tageslimit leeren; dann erhält kein echter Neuer seine Mail, und der Absender-Ruf leidet (Mails landen laut K7 schon im Spam).
- Ein guter TikTok-Tag reicht ebenfalls. Google-Anmeldung (app.js:3215) braucht keine Mail und entlastet.
- Abhilfe: App Check auf Auth; Notfall: Registrierung in der Auth-Konsole abschaltbar (Vermutung: Schalter „Enable create (sign-up)").

**7. Hosting-Transfer: jedes Release lädt alles neu**
- Was: Neuer `CACHE_NAME` löscht den alten Cache samt Schriften (sw.js:97–104). Je Gerät und Release geschätzt 0,5 MB komprimiert (app.js 817 KB, styles 263 KB, Schriften 288 KB roh); beim Erstbesuch doppelt (Seite + Vorabspeichern).
- Rechnung: 10 GB ≈ 20.000 Volldownloads/Monat. 2.000 Geräte × 10 Releases = Limit. Dann ist die Seite bis Monatsende aus – härter als das Firestore-Limit.
- Abhilfe (S–M): Schriften und Quran-Text in einen versionsunabhängigen Cache; Releases bündeln; für Schriften fehlt eine Cache-Regel (firebase.json:27–36 kennt kein ttf/woff2).
- Runde 1: Morphologiedatei (mehrere MB) und Regal-Dateien nur auf Abruf laden, nie ins Vorabspeichern. Audio über Hosting ist auf Spark nicht tragbar.

**8. 1-MiB-Grenze: eigener Bestand unkritisch, Teilen kritisch**
- Karten sind Einzeldokumente; Texte auf 1.000 Zeilen begrenzt (app.js:11647). Bereichsdokument trägt nur IDs (`sets` ≤ 500 Einträge, firestore.rules:190) – auch bei 3.000 Karten im zweistelligen KB-Bereich.
- Gefährlich nah: der geteilte Satz als EIN Dokument (900-KB-Prüfung app.js:4350), geschätzt ab 4.000–6.000 Karten. „Nachliefern unter demselben Code" verschärft das.
- Schwachstellen je Zeile gehören ins Zeilendokument, nicht ins Bereichsdokument.

**9. Kein Fehlerkanal zum Betreiber**
- Was: Kein globaler Fehlerfänger (Grep `addEventListener("error")`/`unhandledrejection`: 0 Treffer). Ein Startfehler wie 3.6.2 bliebe bei Fremden unbemerkt.
- Abhilfe (S): Fehlerbildschirm mit „Fehlerbericht kopieren" (Version, Fehlercode, kein Karteninhalt) und Mail-Link. Kein Tracking, nichts automatisch.

**10. Notfall-Schalter als statische Datei**
- Was: `status.json` im Hosting, beim Start ohne Cache geholt: Banner, „Import pausiert", „Registrierung pausiert". Kostet 0 Firestore-Lesungen, ändert sich per Hosting-Veröffentlichung.
- Aufwand S. Gegenargument: wirkt nur bei ehrlichen Clients; echte Sperre bleibt Regel-Deploy.

**11. Keine Sicherung der Datenbank ohne Blaze**
- Backups, Wiederherstellung und Zeitpunkt-Rücksprung verlangen Abrechnung (Quelle wie oben). Ein fehlerhafter Regel-/App-Stand, der Daten zerstört, ist auf Spark nicht rückholbar.
- Einziger Schutz heute: das Nutzer-Backup – Runde-1-Fehler (c) wird damit betriebskritisch. Ein lokales Admin-Skript wäre möglich, legt aber alle Nutzerdaten auf einen Privatlaptop (DSGVO-Risiko): lieber nicht.

**12. Ausfall des Betreibers**
- Ein Google-Konto ist alleiniger Eigentümer; Moderation hängt an einer festen uid (firestore.rules:404). Blaze verlangt ein Rechnungskonto eines Volljährigen (Vermutung nach Google-Bedingungen).
- Abhilfe (S, Konsole): ein Elternteil als zweiter Eigentümer; Notfallzettel (wie abschalten, wie Nutzer informieren).

**Ehrliche Schwelle:** Mit heutigem Datenweg ist Spark bei ca. 50–150 täglich Aktiven am Ende; mit Umbau aus Punkt 1 bei grob 400 (dann begrenzt das Schreiben). Für 1.000 täglich Aktive ist Blaze unvermeidlich. Kosten wären klein (grob geschätzt wenige Euro/Monat bei 1.000 Aktiven), aber Blaze hat keinen harten Kostendeckel – nur Budget-Alarm. Deshalb zuerst Punkte 4/5 und App Check, dann Blaze.

## Teil 2 – Fragen an den Betreiber

**F1. Tarif: Blaze vor dem öffentlichen Start?**
Der Gratis-Tarif reicht nur für etwa 50–150 Lernende am Tag; danach ist die App für Neue bis ca. 9 Uhr tot. Blaze braucht eine Kreditkarte eines Erwachsenen und hat keinen festen Kostendeckel.
Optionen: (a) Blaze mit Budget-Alarm 5 €, vor der Werbung; (b) auf Spark bleiben, erst bei Engpass wechseln; (c) nie.
Empfehlung: (a), aber erst nach Mengenbremsen und App Check – sonst kann ein Angreifer Kosten erzeugen.

**F2. Darf ein Elternteil zweiter Eigentümer des Firebase-Projekts werden?**
Heute hängt alles an Deinem einen Google-Konto; fällt es aus, kann niemand abschalten oder Nutzern antworten. Für Blaze wird ohnehin ein Erwachsener gebraucht.
Optionen: ja / nein / später.
Empfehlung: ja, weil es zehn Minuten kostet und den größten Einzelausfall abdeckt.

**F3. App Check (reCAPTCHA von Google) einschalten?**
Es ist der einzige Schutz gegen Skripte, die Konten, Karten oder Mails in Massen erzeugen. Es bedeutet einen Google-Dienst mehr, einen Absatz in der Datenschutzerklärung und das Risiko, bei falscher Einrichtung alle auszusperren.
Optionen: (a) vor öffentlicher Werbung, zuerst nur im Beobachtungsmodus; (b) erst nach einem Vorfall; (c) nie.
Empfehlung: (a), weil ein einziger Angriff sonst täglich alle aussperrt.

**F4. Deckel für geteilte Codes und Import?**
Heute darf ein Konto unbegrenzt Codes mit je bis zu 1 MB anlegen und 20.000 Karten auf einmal importieren. Beides kann den Dienst für alle lahmlegen.
Optionen: 20 Codes je Konto und Import 2.000 / 50 Codes und 5.000 / unbegrenzt lassen.
Empfehlung: 20 Codes und 5.000 (wie in E-08 beschlossen), weil echte Lehrer selten mehr brauchen.

**F5. Großer Umbau „nur Geändertes laden"?**
Jeder App-Start liest alle Karten neu vom Server; das ist der Hauptgrund für das frühe Limit. Der Umbau spart rund 90 % der Lesungen, ist aber der größte Eingriff in die Datensynchronisation seit Version 2.0.0 und kann neue Fehler bei mehreren Geräten erzeugen.
Optionen: (a) vor dem öffentlichen Start; (b) stattdessen Blaze bezahlen und später umbauen; (c) nicht.
Empfehlung: (b), weil Lesungen auf Blaze billig sind und Mehrgeräte-Fehler Dich mehr kosten als ein paar Euro.

**F6. Seltener veröffentlichen?**
Jede neue Version lässt jedes Gerät die ganze App neu laden; bei 2.000 Geräten und 10 Versionen im Monat schaltet Google die Seite bis Monatsende ab.
Optionen: (a) ab öffentlichem Start höchstens eine Version pro Woche, Notfälle ausgenommen; (b) wie bisher, dafür Schriften getrennt cachen; (c) beides.
Empfehlung: (c), weil es fast nichts kostet.

**F7. Fehlerbericht per Knopf?**
Stürzt die App bei Fremden ab, erfährst Du es heute nicht. Ein Knopf „Fehlerbericht kopieren" würde Version und Fehlertext (keine Karten, keine Mail-Adresse) in die Zwischenablage legen, zum Schicken an Dich.
Optionen: Knopf mit Kopieren / zusätzlich Mail-Link / nichts.
Empfehlung: Knopf mit Mail-Link, weil nichts automatisch gesendet wird und es trotzdem hilft.

Relevante Dateien: C:\Users\USER\Wiederholung\firestore.rules, C:\Users\USER\Wiederholung\firebase.json, C:\Users\USER\Wiederholung\sw.js, C:\Users\USER\Wiederholung\app.js, C:\Users\USER\Wiederholung\plan\grossplan\KONSOLE.md, C:\Users\USER\Wiederholung\plan\grossplan\ENTSCHEIDUNGEN.md, C:\Users\USER\Wiederholung\plan\grossplan\befunde\LERNEN.md. Nichts im Repo geändert.
