# Mehrwert: Gegenprüfer

Wörtlich aus dem Chat a495c23a, Agent 10, gestartet 2026-10-07 16:06 (Quelle: `agent-aa23afe8062260b33.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

Du bist der Gegenprüfer einer Ideenrunde für die Karteikarten-App "Adrabic" (Arabisch lernen mit Karteikarten und Texte auswendig lernen; deutschsprachig; PWA ohne eigenen Server, Browser spricht direkt mit Firestore; ein einzelner Betreiber ohne Team, der sich Fehler "nicht leisten" kann). Repo: C:\Users\USER\Desktop\Wiederholung (NICHT C:\Users\USER\Wiederholung). NUR LESEN: keine Datei ändern, keine Tests, keinen Browser, keinen Server starten, kein git commit. Websuche ist erlaubt.

Pflichtlektüre zuerst: plan/STAND.md, plan/PLAN.md (auch "Offene Fragen"), plan/LEHREN.md §1, §2, §12 (Recht) und die Vorfall-Liste §15 überfliegen (wie oft welche Art Fehler passiert ist), KONZEPT.md Abschnitt 0 und 7, plan/zyklus-2/AUFGABEN.md (was noch offen ist), plan/zyklus-2/GERAETETESTS-ZETTEL.md, plan/monetarisierung/ (Überblick), plan/zyklus-2/BETREIBER-2026-10-07-NEU.md.

Der Betreiber will "viele Agenten, die sich überlegen, wie ich echten unbestreitbaren Mehrwert bieten kann ... features, ausbauen, verbessern, hinzufügen ... ein riesen Ding". Neun andere Agenten sammeln gerade Ideen zu: Lernwirksamkeit, Übungsmodus/Schreiben, Texte auswendig, Onboarding, Dranbleiben, Lehrer/Teilen, Wettbewerb, Aussehen/Bewegung, Arabisch-Spezifisches.

DEIN BLICKWINKEL: Was spricht dagegen? Deine Aufgabe ist nicht, Ideen zu liefern, sondern den Rahmen, an dem jede Idee gemessen werden muss:
1) Zustand heute: Wie viel ist gebaut, aber noch nicht veröffentlicht oder auf einem echten Gerät geprüft? Wie groß ist app.js (Zeilen), wie lange dauert ein voller Prüflauf, wie viele offene Punkte gibt es? Was heißt das für "viel Neues bauen"?
2) Die häufigsten Fehlerarten laut LEHREN §15 – welche Art von neuem Feature würde genau diese wieder auslösen?
3) Harte Grenzen: kein Server (was geht deshalb grundsätzlich nicht: Push, Abgleich mit Dritten, Audio-Hosting, KI-Funktionen ohne Schlüssel im Browser), Firestore-Kosten und -Regeln, DSGVO (Gesundheits-/Glaubensdaten, Minderjährige, Einwilligung), Urheberrecht (Lehrbuch-Inhalte, Quran-Schriften/-Texte/Audio-Lizenzen), iOS-PWA-Einschränkungen (Speicher, Benachrichtigungen, Audio), religiöser Rahmen (kein Agent verfasst Inhalte).
4) Woran erkennt man "unbestreitbaren Mehrwert"? Schlage 4–6 nüchterne Prüffragen vor (z. B.: Löst es ein Problem, das der Betreiber oder ein echter Nutzer selbst gemeldet hat? Hilft es messbar beim Behalten? Macht es etwas einfacher statt mehr? Kann ein Einzelner es dauerhaft pflegen?). Und: Wie kann der Betreiber ohne Analytics-Überwachung überhaupt erfahren, ob etwas hilft (plan/analytics/, plan/feedback-board/ ansehen)?
5) Nenne die 5 Dinge, die VOR jedem neuen Feature erledigt sein sollten, und die 5 typischen "großen" Ideen, die hier am wahrscheinlichsten schaden (mit Begründung).

LIEFERE auf Deutsch, einfache Sprache, höchstens 800 Wörter, mit Datei-Verweisen. Sei unbequem, aber konkret und belegt. Nichts erfinden; Ungeprüftes kennzeichnen.

## Bericht des Agenten

# Gegenprüfung: Woran jede Idee gemessen werden muss

Nur gelesen, nichts geändert. Alle Pfade unter `C:\Users\USER\Desktop\Wiederholung\`.

## 1. Zustand heute

- **Online ist 3.18.14.** Auf `main` liegt 3.18.23, also neun Versionen unveröffentlicht (`plan/STAND.md` Z. 3–5). 3.18.24 liegt uncommittet im Arbeitsordner (laut `git status`).
- **Kein Gerätetest ist abgehakt.** G1–G7, „Sicherung einspielen", D9-Gefühl und D15-Start sind offen. Das kann kein Agent (`plan/zyklus-2/GERAETETESTS-ZETTEL.md`).
- **Größe:** `app.js` 16.009 Zeilen in einer Datei, `styles.css` 5.305, `firestore.rules` 505, `plan/LEHREN.md` 2.328.
- **Prüflauf:** 152 Tests. Die Logs des letzten Laufs reichen von 15:50 bis 18:07, also gut zwei Stunden (aus Zeitstempeln geschlossen, nicht gestoppt). Er läuft nur am Laptop mit Netzteil.
- **Der Prüfstand irrt selbst.** Am 07.10. war D11 zehnmal rot, nach einem Neustart grün, Ursache „nicht gemessen" (`plan/zyklus-2/LOGBUCH.md`, oberster Eintrag).
- **Offen aus Zyklus 2:** C9, C10, C28 (Fortschritt-Umbau), D13, D15, D14 und C18 (bis 29.10. gesperrt), E17, E26, 15 Restbefunde in `plan/zyklus-2/RUNDE15-REST.md`, die Nachprüfung und die Rechtsprüfung (`plan/PLAN.md`, „Offen").
- **Neu vom 07.10.:** N1–N8, nichts davon gebaut (`plan/zyklus-2/BETREIBER-2026-10-07-NEU.md`).
- **Texte auswendig:** nur im Betreiber-Konto, Probelauf bis 29.10.

**Folge:** Jedes neue Feature kostet mindestens einen Zwei-Stunden-Lauf, neue Tests und einen weiteren Gerätetest. Es landet auf einem Stapel, den noch kein echtes iPhone gesehen hat. Fehler im Stapel lassen sich dann keiner Version mehr zuordnen.

## 2. Häufigste Fehlerarten (`plan/LEHREN.md` § 15)

Die Tabelle hat 121 Zeilen. Die Zahlen sind eine grobe Stichwortzählung und überschneiden sich.

| Fehlerart | Zeilen | Was sie wieder auslöst |
|---|---|---|
| Eigene Fehler der Agenten | ca. 44 | jedes große Paket, mehrere Agenten zugleich an `app.js` (25.09.: drei Änderungen verloren) |
| Prüfstand misst falsch | ca. 21 | alles mit Datum, Zeit, Bewegung oder Fotovergleich |
| Version, Cache, Service Worker | ca. 12 | neue Dateien wie Audio, Schriften, Daten |
| Texte stimmen nicht mit der Funktion | ca. 12 | jede Änderung der Lernlogik |
| Firestore-Regeln, Echos, zwei Geräte | ca. 11 | jedes neue Feld, jede neue Sammlung (3.0.27: drei Tage nichts gespeichert) |
| Zustand nur im DOM, Sprünge, Bewegung | je ca. 8 | neue Bildschirme, „überall Animation" |
| iOS-Eigenheiten | wenige Zeilen, viele Versuche | Nav-Leiste sechs Meldungen, Startbild über Tage |

## 3. Harte Grenzen

- **Kein Server.** Push- und E-Mail-Erinnerung gehen nicht (F-16). KI-Funktionen gehen nicht, weil ein Schlüssel im Browser öffentlich wäre und KI-Karten ohnehin verboten sind (F-19, § 1.6). Bezahlen geht nur von Hand. Was im Browser geschaltet wird, ist nicht schützbar (`plan/grossplan/FUNKTIONEN.md`).
- **Firestore.** Der Tarif ist nicht bestätigt; `plan/grossplan/KONSOLE.md` Z. 83–89 bittet den Betreiber erst nachzusehen. Jedes neue Feld braucht Regel, Emulator-Test und einen eigenen Deploy.
- **Daten über Konten hinweg.** Bestenliste, Freunde und Lehrer-Einsicht bedeuten Minderjährigen-Daten. Das ist eine „harte Sperre" (§ 12, C5). Der Inhaber ist selbst minderjährig, der Vater haftet (§ 1.5).
- **Glaubensdaten.** Religiöse Angaben werden nicht gespeichert (§ 2 Nr. 5). Das Analytics wurde am 24.09. vollständig entfernt (`plan/ideen/analytics/GERUEST.md`).
- **Urheberrecht.** Tanzil-Text nur unverändert und mit Quellenangabe (`plan/texte-lernen/KONZEPT.md` Z. 81). Die KFGQPC-Bedingungen waren nicht einsehbar (Z. 82). Lehrbuch-Sätze wie Medina gibt es erst mit einem rechtlich freien Satz (F-3). Fremde Dateien werden nicht eingebunden (§ 12).
- **Audio.** Sprachsynthese ist abgelehnt (F-15). Eigene Aufnahmen bräuchten Blaze und wären Stimmdaten (F-11b).
- **iOS.** Die Kalender-Erinnerung per `.ics` ist am Gerät unbestätigt (§ 11, G6). Speicherlöschung und Audio-Sperren in Safari habe ich nicht im Repo geprüft.
- **Religion und Lehrstoff.** Kein Agent schreibt Ayat, Übersetzungen, Vokabeln oder Erklärungen (§ 1.6, § 2). Das trifft fast jede „Arabisch-spezifische" Inhaltsidee.
- **Lernlogik.** Sie ist tabu ohne Vorlage und ein Ja je Änderung (`KONZEPT.md` § 7, N8).

## 4. Prüffragen für „unbestreitbar"

1. Hat der Betreiber oder ein echter Nutzer das Problem selbst gemeldet? Die Quelle muss genannt sein.
2. Gibt es Belege, dass es beim Behalten hilft, und einen Weg, das hier zu prüfen (wie der Text-Probelauf)?
3. Macht es einen Bildschirm einfacher statt voller (Hick, § 1.5)?
4. Kommt es ohne neues Cloud-Feld, neue Sammlung, neuen Datenfluss und fremden Inhalt aus?
5. Kann ein Einzelner es pflegen, mit Test, Gerätetest und Rechtstext?
6. Wurde es schon einmal bewusst entfernt (§ 3.5, etwa das Wurzelfeld F-20)?

**Wie erfahren, ob es hilft:** Zahlen über alle Nutzer gibt es nicht. Es bleiben vier Wege:
- das Ideen-Board in der App,
- Fünf-Minuten-Tests mit drei bis fünf echten Leuten,
- der eigene Probelauf mit Foto,
- Tageszähler ohne Kennung in Firestore (Möglichkeit 3 im Analytics-Gerüst, nicht gebaut, braucht Regeln und Rechtstext).

Die Ordner `plan/analytics/`, `plan/feedback-board/` und `plan/monetarisierung/` sind leer. Der Inhalt liegt unter `plan/ideen/`. Wie viele echte Nutzer es gibt, steht nirgends im Repo.

## 5a. Fünf Dinge vor jedem neuen Feature

1. 3.18.15–3.18.24 mit „ladegerät" veröffentlichen.
2. Gerätetests G1–G7 und die Sicherungs-Rückspielung am iPhone abhaken.
3. Die Datenschutzerklärung von einer Person prüfen lassen (offen seit J1/F5).
4. Den Text-Probelauf bis 29.10. unverändert lassen und auswerten, erst dann an der Lernlogik drehen.
5. Die Nachprüfung von Zyklus 2 machen und den Rest (Z1-Umbau, R15-Rest, N1) schließen oder ausdrücklich streichen.

## 5b. Fünf große Ideen, die hier am ehesten schaden

1. **Wettbewerb, Bestenliste, Freunde.** Daten über Konten, Minderjährige, Moderation (F-18). Die Regeln müssten ihr Grundprinzip aufgeben.
2. **Lehrer-Klassenraum mit Schüler-Fortschritt.** Dieselben Sperren. Der Betreiber nannte den Fortschritt je Schüler selbst „erstmal irrelevant" (`plan/ideen/lehrer-modus/GERUEST.md`, A0).
3. **KI- oder fertige Inhalte:** Karten, Vorlesen, Erklärungen, Lehrbuch-Sätze. Das bricht § 1.6 und § 2 und wirft Urheberrechtsfragen auf. Der Vorfall 3.0.21 war genau das.
4. **Neue Lernmethode in einem Zug** (FSRS, neue Stufen). Sie ändert jede Fälligkeit und alle Stufen-Texte (F-14) und entwertet den laufenden Probelauf.
5. **„Überall Animation" und mehr Dranbleib-Mechanik** (Push, Serien-Druck). Bewegung ist hier die teuerste Fehlerquelle: D12 und D15 haben Tage gekostet und sind offen. Das Video des Betreibers sagt selbst, man müsse wissen, wann nicht animiert wird. Serien-Druck widerspricht „ohne Nerven" (F-17).

**Urteil:** Vier der neun Themen stoßen an harte Sperren: Wettbewerb, Lehrer, Arabisch-Inhalte und Dranbleiben per Push. Den größten sicheren Nutzen haben kleine, schon vorgeprüfte Punkte: F-1 Liste einfügen und F-2 ohne Harakat (`plan/grossplan/FUNKTIONEN.md`, Korb 1). Auch sie kommen erst nach 5a.
