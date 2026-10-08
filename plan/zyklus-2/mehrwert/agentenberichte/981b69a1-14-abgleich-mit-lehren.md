# Abgleich mit LEHREN

Wörtlich aus dem Chat 981b69a1, Agent 14, gestartet 2026-10-07 15:55 (Quelle: `agent-af8f16d85304ee36f.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 13 Agenten der ZWEITEN Runde für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server). Betreiber ist ein Einzelner (minderjährig), Nutzer bisher er und wenige Freunde; Ziel: öffentliche, ernsthafte Lern-Website für deutschsprachige Muslime, die Quran-/klassisches Arabisch lernen. Neu im Probelauf (nur Betreiber-Konto): "Texte auswendig lernen" mit Quran aus Tanzil-Daten (quran/).
Der Betreiber hat entschieden: Er will ALLES Nützliche aus Runde 1 bauen, egal wie schwer. Runde 2 soll tiefer und weiter schauen als Runde 1.
ERGEBNIS RUNDE 1 (nicht wiederholen, sondern darauf aufbauen): Bestätigte Fehler: (a) "Nicht" dann "Sicher" in derselben Runde gibt sofort wieder vollen Abstand (app.js gradeCard ~5985-6069); (b) Sitzungslimit schneidet erste N statt dringendste (startSession ~5893); (c) Backup ohne Verlauf/Serie/Einstellungen (exportBackup ~4191); (d) keine indexierbare Seite (index.html noindex, robots.txt). Geplante Ideen: Liste einfügen F-1 mit Vorschau/CSV/Lektionszeilen; ohne Harakat abfragen F-2 bzw. Harakat-Leiter; Regal mit Betreiber-Kartensätzen als statische Dateien (zuerst Medina Buch 1); Rückkehr nach Pause (Berg strecken); Ruhetag; Urlaubsmodus; öffentliche Startseite + Proberunde ohne Konto; Bearbeiten in der Abfrage; Rundenende zeigt verpatzte Karten; Kennzahl "sicher gekonnt"; Trefferquote reifer Karten; Problemkarten mit Diagnose/Verwechslungspaare; Wake Lock; Druckansicht; Text-/CSV-Export; Einladungslink für Lektions-Code; Nachliefern unter demselben Code; Wochentakt-Freigabe; Harakat-Eingabeleiste; Handschrift in normaler Runde; zweite Richtung Deutsch→Arabisch F-5; Texte: Bestand eintragen ohne Lawine, Kreis über mehrere Texte, Juz/Hizb/Seite, Hinweis auf ähnliche Ayat (rechnerisch), Übergangs-Abfrage, Einstiegsprobe, lokale Selbstaufnahme, Abhör-Modus auf einem Gerät, lange Ayat an Waqf-Zeichen teilen, Schwachstellen je Zeile; Wort in Aya antippen → Karte; Quran-Konkordanz zur Karte; Wurzel-Familien/Abdeckung (hängt an GPL-Morphologiedaten). Als "nicht bauen" eingestuft: TTS, Spracherkennung, KI-Karten, automatische Bedeutungen/Konjugationen, Web Push, öffentliche Nutzer-Bibliothek, Klassenraum mit Schülerfortschritt, Kinderkonten, .apkg-Import, OCR, Abzeichen/Bestenlisten, Rezitations-Audio ohne schriftliche Lizenz.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden, keine Tests, keine Server, keine Skripte starten, nichts installieren. app.js nie komplett lesen: Grep, dann Ausschnitte.
Projektregeln: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte; keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben. Keine Dark Patterns. DSGVO ernst. Lernlogik nur mit ausdrücklicher Betreiber-Entscheidung. Wichtige Dateien: plan/STAND.md, plan/LEHREN.md (116 KB, gezielt greppen), plan/grossplan/FUNKTIONEN.md und ENTSCHEIDUNGEN.md, plan/zyklus-2/AUFGABEN.md, ENTSCHEIDUNGEN.md und befunde/, plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/onboarding/, README.md, CHANGELOG.md, firestore.rules, firebase.json.
AUSGABEFORMAT (Deutsch, max. ca. 1000 Wörter, kein Vorgeplänkel): Teil 1 "Befunde/Ideen" (8–14 Punkte; je Punkt: Titel, was genau, Nutzen, Aufwand S/M/L, Abhängigkeiten, Risiko/Gegenargument, Beleg Datei:Zeile oder URL). Teil 2 "Fragen an den Betreiber" (3–8 Fragen; jede so formuliert, dass er sie OHNE Nachschlagen beantworten kann: 2–3 Sätze Hintergrund, die Auswahlmöglichkeiten, deine Empfehlung mit einem Satz Begründung). Ehrlich gewichten. Ungeprüftes als Vermutung kennzeichnen.

DEIN AUFTRAG: Gedächtnis des Projekts. Lies plan/LEHREN.md so vollständig wie möglich (in Abschnitten; vor allem § 1, § 2, § 3, § 5, § 14 Checkliste, § 15 Vorfall-Liste), dazu plan/onboarding/ENTSCHIEDEN.md und PSYCHOLOGIE.md (falls vorhanden) und in CHANGELOG.md die Stellen "wieder entfernt"/"entfernt" (Grep). Finde heraus, was der Betreiber früher bewusst ENTFERNT oder ABGELEHNT hat und WARUM – besonders: "Liste einfügen" (1.6.0, wieder entfernt; "Projektakte, Abschnitt 10" – suche diese Projektakte im Repo, auch in plan/phase-0-bestand, KONZEPT*.md), Tageslimit neue Karten, Wurzelfeld, Statistik/Analytics (3.17.23), landing.html (3.9.0), die gestrichene Zeile "Kostenlos. Keine Werbung …", Denkpause bei Karten, Agenten-Startkartensatz (13.09.). Prüfe dann jede Runde-1-Idee oben gegen diese Geschichte: Welche wiederholt einen alten Fehler oder verstößt gegen eine Regel in LEHREN.md (Paragraf nennen)? Welche ist nur in geänderter Form zulässig, und in welcher? Welche Regeln aus LEHREN.md müssen beim Bau der großen Vorhaben besonders beachtet werden (iOS, Motion/Eintrittsbewegungen, Firestore-Regeln, Versions-/Cache-Liste, Texte/Recht)? Ergebnis in Teil 1 als Liste "Idee → Befund aus der Geschichte → zulässige Form". Teil 2 wie beschrieben – hier besonders die Fragen, bei denen eine neue Idee einer alten Entscheidung widerspricht und er neu entscheiden muss (alte Begründung jeweils wörtlich kurz zitieren mit Fundstelle).

## Bericht des Agenten

## Teil 1 – Idee → Befund aus der Geschichte → zulässige Form

Vorab: Die „Projektakte" liegt **nicht im Repo** (Grep über alle .md/.js/.html: nur Verweise in `CHANGELOG.md:4878, 4884, 4916, 4944, 4953`; `plan/grossplan/befunde/PRODUKT.md:25` bestätigt das Fehlen). Die Gründe für „Liste einfügen entfernt" (1.6.0) und für die Ausschlussliste aus 1.8.0 sind damit nirgends nachlesbar. Nur der Betreiber kennt sie.

**1. Liste einfügen (F-1)** – Aufwand M
- Geschichte: 1.6.0 gebaut, „auf Wunsch des Betreibers … vollständig entfernt" (`CHANGELOG.md:4942-4944`), Grund unbekannt. Damals gab es zugleich das Tageslimit `neuProTag` als Lawinenbremse (`:4926-4928`). Seit 2.3.0 ist es weg: „Wer dort auf einmal viele Karten anlegt, hat sie auch alle am selben Tag fällig" (`:4549-4557`).
- Risiko: 200 eingefügte Zeilen sind heute 200 fällige Karten, verschärft durch Runde-1-Fehler (b).
- Zulässige Form: nur mit Bremse, die keine neue Zahl-Einstellung ist. Lektionszeilen erzeugen gesperrte Lektionen, also das vorhandene Schloss. Vorschau, Harakat byteweise unverändert (§ 2 Punkt 6), Duplikatprüfung, Konto-Bindung des ganzen Auftrags (§ 8.3, G-102/103). Nach § 3.5 braucht es ein neues „ja" (`plan/STAND.md:122`).

**2. Regal mit Betreiber-Kartensätzen** – Aufwand M
- Geschichte, drei Treffer: „Bibliothek"-Tab 1.7.0 entfernt, „dauerhaft, nicht nur für diese Version" (`CHANGELOG.md:4908-4910`); erfundener 50-Karten-Satz 3.0.21/22 (LEHREN § 1.6); `plan/onboarding/ENTSCHIEDEN.md:265` „kein mitgelieferter Kartensatz – er müsste aus einer Quelle abgeschrieben werden".
- Zulässige Form: kein Tab mit Nutzer-Inhalten; statische Dateien nur vom Betreiber, Freigabe vor dem Schreiben ins Repo, als geführter Satz mit Schloss.
- Vermutung, ungeprüft: Wortlisten und Reihenfolge von Medina Buch 1 sind fremdes Werk. `plan/grossplan/FUNKTIONEN.md:22` verlangt „erst, wenn ein eigener, rechtlich freier Satz existiert". Kein Agent tippt den Stoff.

**3. Fehler (a)/(b), Rückkehr nach Pause, Ruhetag, Urlaubsmodus** – Aufwand M–L
- Alles Lernlogik (§ 1.2, § 13), also je ein ausdrückliches „ja". Z7 steht auf „später", Z6b ist offen (`plan/zyklus-2/ENTSCHEIDUNGEN.md:17, 32-69`).
- Das Tageslimit fiel, weil es „eine Zahl, die niemand einstellen will" war (`CHANGELOG.md:4551`). Also keine Regler-Zahl.
- Beim Bau: neues `settings`-Feld braucht `normSettings` + `settingsOk` + Emulator, sonst scheitert jedes Speichern (§ 8.1, Vorfall 3.0.27). Zähler atomar (G-075). Regeln vor Hosting. Alle Serien-Texte mitziehen (§ 7.3). Keine Verlust-Sprache (`plan/onboarding/PSYCHOLOGIE.md:149`).
- Warnung: Vorfall 3.17.32/G-035, ein Agent änderte Lernlogik statt Rückgängig zu reparieren.

**4. Kennzahl „sicher gekonnt", Trefferquote reifer Karten** – Aufwand S–M
- Geschichte: 3.12.1 „Kein bock dass man mein system leicht herauskriegen kann" (`CHANGELOG.md:1289-1292`, § 6.9); „Tage gelernt" entfernt, weil falsch (`:1155-1160`); F-13 „mehr Statistik" abgelehnt; Z1/Z2 entschieden (Satz statt Zahl, Pille weg).
- Zulässige Form: in Worten, ohne Stufengrenzen oder Intervalle, im Rahmen von Z1(b).
- Vermutung: Für eine Trefferquote fehlt ein Bewertungsverlauf je Karte (`FUNKTIONEN.md:64`; „Offline-Zeitstempel je Bewertung" in E-17 abgelehnt). Ein neues Feld bräuchte Regeln.

**5. Problemkarten mit Diagnose, Verwechslungspaare** – Aufwand M
- Geschichte: 1.8.0 schloss „Filter nur schwierige Karten" aus (`CHANGELOG.md:4873-4878`), Grund in der Akte. Die Rückfall-Liste gibt es seit 1.7.0.
- Zulässige Form: Paare rein rechnerisch (gleicher Wortlaut ohne Harakat), Diagnose nur als Zählbefund. Kein vom Agenten formulierter Lern- oder Grammatikrat (§ 1.6).

**6. Wurzel-Familien, Konkordanz, Wort antippen → Karte** – Aufwand L
- Geschichte: eigenes Grammatik-Feld 3.9.7 nach Stunden entfernt, „0 von 136 realen Karten" (`CHANGELOG.md:1680`); F-20 „lieber nicht".
- Zulässige Form: kein Eingabefeld, nur aus Daten abgeleitet und lesend. Übersetzung tippt der Nutzer, keine automatische Bedeutung (§ 2 Punkt 1). Daten selbst ausliefern (§ 12), Lizenz belegt, Prüfsumme wie bei Tanzil.

**7. Ohne Harakat, Harakat-Leiter, Waqf-Teilung, ähnliche Ayat** – Aufwand S–M
- Regeln: § 2 Punkt 6 „Harakat werden nicht verändert"; Tanzil „CHANGING IT IS NOT ALLOWED" (`plan/texte-lernen/KONZEPT.md:308-321`).
- Zulässige Form: nur Anzeige, gespeicherter Text byteweise gleich. Bei Quran-Wortlaut entscheidet der Betreiber (`PRODUKT.md:62-65`). Teilung so, dass zusammengesetzt das Original entsteht (Vorbild 2:282, `KONZEPT.md:456`). „Ähnlich" nur als Wortlaut-Vergleich, ohne inhaltliche Aussage.
- Darstellung an echten Bildschirmfotos prüfen (Vorfälle 30.09., `LEHREN.md:1832-1833`).

**8. Öffentliche Startseite + Proberunde** – Aufwand L
- Geschichte: `landing.html` in 3.9.0 entfernt, „wird komplett neu gemacht" (`CHANGELOG.md:1720`) – also erwünscht.
- Nicht wiederholen: „Kostenlos. Keine Werbung, keine Cookies." (3.17.22, `:629-633`); „wissenschaftlich bewährt" (§ 7.2); Vertrauens-Text, Verse, Selbstverortung (`ENTSCHIEDEN.md:209-212, 288`).
- Technik: eigene Seite, `index.html` bleibt noindex (`index.html:17-18`). Jedes Inline-Skript mit CSP-Hash (§ 9.2, Vorfall 3.0.21), `csp-build` (§ 4.3), keine Fremdserver (§ 12).
- Proberunde: freigegeben ist nur كِتَابٌ (`ENTSCHIEDEN.md:264`). Vor Werbung App Check (E-15) und Rechtsprüfung J1.

**9. Einladungslink für Lektions-Code** – Aufwand S
- Geschichte: Link-Teilen 3.5.3 fiel wegen Größe (`CHANGELOG.md:1949-1953`). Dort steckte der Inhalt im Link; ein Link mit nur dem Code ist etwas anderes.
- Beachten: installierte iOS-App verliert URL-Parameter (§ 11); Code ins Fragment; muss Registrierung und E-Mail-Bestätigung überleben (neuer `localStorage`-Schlüssel → Datenschutzerklärung, § 6.2); die alte `#teilen=`-Meldung nicht stören.

**10. Nachliefern unter demselben Code, Wochentakt** – Aufwand M–L
- Heute: Inhalt unveränderlich, Update nur `freigabe.offenBis` nach oben (`firestore.rules:351-360`).
- Nachliefern: Regeländerung, Emulator, beide Schadensrichtungen prüfen (§ 8.1b). `satzId`/`satzVersion` nutzen (seit 2.3.0 vorgesehen). Warnung G-004: Karten doppelt, Lernstand weg (`LEHREN.md:1817`).
- Wochentakt: „einmal offen bleibt offen", `offeneLektionIds` ist Lernlogik (`plan/lehrer-modus/GERUEST.md:596-606`). Keine Schülerdaten (C5, § 12).

**11. Backup mit Verlauf/Serie, CSV-/Text-Export, Druck** – Aufwand M
- Datei „Zum Weitergeben" wurde 3.7.2 als Doppelung entfernt (`plan/PLAN.md:1672`). Export darf kein zweiter Weitergabe-Weg werden.
- Wiederherstellen: nie „alles neu schreiben" (§ 8.1a).
- Vermutung: `verlaufEpocheOk` (`firestore.rules:150-153`) blockiert das Einspielen eines Verlaufs. Vor dem Bau im Emulator prüfen.

**12. Bearbeiten in der Abfrage, Rundenende, Handschrift in der Runde, Wake Lock, Harakat-Leiste** – Aufwand je S–M
- Regeln: Runde nie höher als der Bildschirm (§ 4.x); nichts erscheint unter dem Finger (§ 6.1, Vorfall 3.17.25); neue Blätter in alle Overlay-Listen (§ 6.2); iOS-Tastatur über `--tastatur` (§ 11); `abnahme_runde.js` 13/13 (§ 14 Punkt 12).
- Geführte Bereiche sind schreibgeschützt, dort kein Bearbeiten.
- „Tippen statt Aufdecken" ist seit 1.8.0 ausgeschlossen: die Leiste nur fürs Anlegen.

**13. Texte: Selbstaufnahme, Bestand, Kreis über mehrere Texte** – Aufwand M–L
- F-11b „Eigene Tonaufnahmen: Blaze + Stimmdaten" abgelehnt (`FUNKTIONEN.md:71`). Rein lokal ist neu, aber Stimme mit Quran-Rezitation berührt Art. 9: Einwilligung und Datenschutzerklärung im selben Commit (§ 12).
- „Schon Gekonntes markieren" ist entschieden (T6), „neue Zeilen pro Tag: keine Einstellung" (T7, `KONZEPT.md:365-366`).
- Texte bleiben im Betreiber-Konto bis zu seinem „ja".

**14. Quer für alle großen Vorhaben**
- Nur ein Agent gleichzeitig an `app.js`; Diff lesen statt Zusammenfassung (3.17.32).
- Ganzer Prüfstand, nicht eine Auswahl (`LEHREN.md:1643-1652, 1830`).
- Version an vier Stellen, plus 31 Startbild-Links, falls Bilder geändert werden.
- Code mit Backslashes nie per Heredoc einfügen.
- WebKit-Eigenheiten als „am iPhone bestätigen" kennzeichnen (§ 5.6).

## Teil 2 – Fragen an den Betreiber

**1. Liste einfügen.** Du hast sie nach 1.6.0 ganz entfernen lassen; der Grund stand in einer Akte, die nicht im Repo liegt. Damals bremste ein Tageslimit, das es nicht mehr gibt. (a) Bauen, Lektionszeilen werden gesperrte Lektionen. (b) Bauen ohne Bremse. (c) Nicht bauen. Weißt Du noch, warum sie raus sollte? **Empfehlung: (a)**, weil sonst 200 eingefügte Wörter am selben Tag fällig sind.

**2. Regal.** 1.7.0: Bibliothek „dauerhaft" raus; 23.09.: „kein mitgelieferter Kartensatz". Das Regal wäre nur Dein Stoff als feste Datei, keine Nutzer-Inhalte. (a) Ja, mit einem Satz, den Du selbst geschrieben hast. (b) Ja, mit Medina Buch 1, nachdem die Rechte am Buch geklärt sind. (c) Nein. **Empfehlung: (a)**, weil ein abgeschriebenes Buch ein Rechtsrisiko für den im Impressum Genannten ist.

**3. Zahlen im Fortschritt.** 24.09.: „Kein bock dass man mein system leicht herauskriegen kann." Eine Trefferquote wäre wieder eine Zahl. (a) Nur ein Satz in Worten. (b) Eine Prozentzahl ohne Stufen und Tage. (c) Nichts Neues. **Empfehlung: (a)**, passt zu Deinem Z1-Beschluss.

**4. Quran-Text ohne Harakat anzeigen.** Gespeichert bleibt alles unverändert, es ginge nur um die Anzeige beim Abfragen. (a) Nur bei eigenen Karten. (b) Auch bei Quran-Texten. (c) Gar nicht. **Empfehlung: (a)**; (b) ist eine religiöse Frage, die nur Du beantwortest.

**5. Wurzeln.** Das Grammatik-Feld flog am 23.09. raus („0 von 136 Karten"). Wurzel-Familien kämen diesmal ohne Feld aus, brauchen aber fremde Daten mit eigener Lizenz. (a) Zurückstellen, bis Quelle und Lizenz belegt sind. (b) Jetzt planen. (c) Streichen. **Empfehlung: (a)**, ohne belegte Quelle wäre es erfundener Lehrstoff.

**6. Eigene Stimme aufnehmen (Texte).** „Eigene Tonaufnahmen" stand auf „lieber nicht" wegen Cloud und Stimmdaten. Neu wäre: nur auf dem Gerät, nie in der Cloud. (a) Ja, lokal mit Einwilligung. (b) Erst Abhör-Modus ohne Aufnahme. (c) Nein. **Empfehlung: (b)**, gleicher Lernnutzen ohne neue Datenart.

**7. Startseite: Satz zu Kosten.** Du hast „Kostenlos. Keine Werbung, keine Cookies." komplett gestrichen. Eine öffentliche Seite wird trotzdem gefragt, was es kostet. (a) Kein Wort dazu. (b) Ein nüchterner Satz in den Fragen unten. (c) Der alte Satz. **Empfehlung: (b)**, eine Antwort auf eine Frage ist kein Werbeton.

**8. Rückkehr nach langer Pause.** Am 01.10. hast Du „heute nur 20" auf „später" gesetzt. Runde 1 schlägt es wieder vor, zusammen mit dem Fehler, dass das Rundenlimit nicht die dringendsten Karten nimmt. (a) Erst nur den Fehler beheben. (b) Beides zusammen. (c) Später bleibt später. **Empfehlung: (a)**, der Fehler ist belegt, der Rest ist neue Lernlogik.
