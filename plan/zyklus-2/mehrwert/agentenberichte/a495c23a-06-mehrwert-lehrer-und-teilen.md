# Mehrwert: Lehrer und Teilen

Wörtlich aus dem Chat a495c23a, Agent 6, gestartet 2026-10-07 16:06 (Quelle: `agent-a5fb05043a1304a5b.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

Du arbeitest an einer Ideen- und Prüfrunde für die Karteikarten-App "Adrabic" (Arabisch lernen, PWA ohne eigenen Server, Browser spricht direkt mit Firestore, ein einzelner Betreiber). Repo: C:\Users\USER\Desktop\Wiederholung (NICHT C:\Users\USER\Wiederholung). NUR LESEN: keine Datei ändern, keine Tests, keinen Browser, keinen Server starten, kein git commit. Websuche ist erlaubt.

Pflichtlektüre zuerst: plan/STAND.md, plan/LEHREN.md §1 und §2, KONZEPT.md Abschnitt 0 und 7, alles in plan/lehrer-modus/, plan/monetarisierung/ (Überblick), plan/zyklus-2/BETREIBER-2026-10-06.md (dort: wie der Betreiber Lektionen als Kartensatz per Code weitergibt und denselben Code erneut schickt), firestore.rules (Überblick). Feste Grenzen: religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; keine religiösen Inhalte verfassen; keine religiösen Angaben speichern; kein eigener Server; Datenschutz (DSGVO, Minderjährige) ernst nehmen.

Auftrag des Betreibers: "echten unbestreitbaren Mehrwert ... features, Sachen ausbauen, verbessern, hinzufügen".

DEIN BLICKWINKEL: Weitergeben und gemeinsames Lernen. Heute: Kartensätze per Code teilen (app.js: Suche "per Code", satzUnterschied, quelleId, gefuehrt/istGefuehrt, Schloss/Freischalten, Speicherkarten). Der Betreiber unterrichtet offenbar selbst (Medina-Bücher, Lektion für Lektion). Fragen: Was würde einem Lehrer und seinen Schülern den größten echten Nutzen bringen – z. B. fertige, geprüfte Kartensätze zu verbreiteten Lehrbüchern (wer liefert den Inhalt? Urheberrecht der Bücher benennen), Aktualisierung eines geteilten Satzes sauber beim Empfänger, Lehrer sieht (mit Einwilligung) wer wie weit ist, Klassen-Code, Hausaufgabe "bis Freitag Lektion 5". Was davon geht ohne Server und ohne Datenschutz-Minenfeld, was nicht? Was machen Quizlet/Anki/Memrise hier, und wo ist die Lücke für Arabisch-Unterricht in Moscheen/Online-Kursen auf Deutsch?

LIEFERE auf Deutsch, einfache Sprache, höchstens 700 Wörter: nach Nutzen geordnete Liste von höchstens 7 Vorschlägen. Je Vorschlag: was genau, wem es hilft und warum (Beleg/Quelle, ehrlich eingeordnet), was dagegen spricht (Recht, Datenschutz, Aufwand für einen Einzelnen, Firestore-Kosten/Regeln), Aufwand, Risiko, betroffene Stellen. Am Ende: 3 erste Schritte, 2 verlockende, aber schädliche Ideen. Nichts erfinden; Ungeprüftes kennzeichnen.

## Bericht des Agenten

## Weitergeben und gemeinsames Lernen: Vorschläge (nur gelesen, nichts geändert, nichts getestet)

Hinweis zur Pflichtlektüre: `plan/lehrer-modus/` und `plan/monetarisierung/` sind leer; die Inhalte liegen in `plan/ideen/lehrer-modus/` (GERUEST.md, LOGBUCH.md) und `plan/ideen/monetarisierung/`. Dazu gelesen: `plan/grossplan/FUNKTIONEN.md`, `firestore.rules`, `app.js` Zeilen 376–510 und 4540–5110.

**Wichtigster Fund vorab (aus dem Code gelesen, nicht getestet):** Ein geteilter Satz ist unveränderlich (`firestore.rules` 351–360: nur `freigabe` darf wachsen). Denselben Code erneut schicken bringt neuen Inhalt deshalb nicht zum Empfänger. Der Lehrer muss „Teilen beenden“ und einen neuen Code erzeugen. Bei „Lehrer gibt frei“ fällt der Empfänger dann auf Lektion 1 zurück (`app.js` 4989–4993: bei anderem Code zählt der Stand ab 1), obwohl der Dialog sagt „freigeschaltete Lektionen bleiben“ (5022). Das Logbuch nennt die Lücke selbst als offen (LOGBUCH.md 45–46).

### Vorschläge, nach Nutzen geordnet

**1. Satz unter demselben Code aktualisieren**
- Was: Der Ersteller darf `inhalt` überschreiben, der Code bleibt. Die Empfänger-App merkt beim ohnehin vorhandenen Abruf (`lehrerStandAktualisieren`), dass eine neuere Ausgabe da ist, und bietet das vorhandene Zusammenführen an (`satzZusammenfuehren`, der Lernstand bleibt).
- Wem: Jedem, der Lektion für Lektion unterrichtet, also genau dem Ablauf des Betreibers.
- Beleg: Anki kann das nicht automatisch; Nutzer müssen neu laden und importieren, mit bekannten Fortschrittsverlusten (AnkiWeb-Forum).
- Dagegen: Regeländerung (ein Fehler dort sperrt die App), ein Stück Lernlogik beim Freigabe-Stand. Fortschritts-Codes merken sich den Code heute nicht (`codeEinloesen` 4829), das wäre ein neues Feld.
- Kosten: 1 Lesevorgang je Abruf, unkritisch. Aufwand 2–3 Sessions. Risiko mittel.
- Stellen: `firestore.rules` 316–361, `app.js` `teileLektionCode`, `codeEinloesen`, `lehrerStandAktualisieren`, `satzZusammenfuehren`.

**2. Rückfall auf Lektion 1 beim Code-Wechsel beheben**
- Was: Der Fund oben. Wahrscheinlich ein echter Fehler, also erst nachstellen. Entfällt weitgehend, wenn 1 gebaut ist.
- Aufwand: ½ Session. Risiko gering.

**3. Hausaufgabe als Zeile am Satz**
- Was: Der Lehrer setzt „Lektion 5 bis Freitag“ (Lektionsnummer und Datum im selben Datensatz). Der Empfänger sieht eine ruhige Zeile. Keine Rückmeldung an den Lehrer.
- Wem: Kursgruppen; ersetzt die WhatsApp-Nachricht.
- Dagegen: Freitext wäre ein Nachrichtenkanal (Chat ist im Gerüst abgelehnt), deshalb nur Nummer und Datum. Gefahr von Druck; der Ton muss zu „ohne Nerven“ passen.
- Aufwand: 1–2 Sessions. Risiko gering. Stellen: Regel `freigabeOk`, Teilen-Karte (`app.js` ~10040), Banner im Lernen-Tab.

**4. Code als Link und QR**
- Was: Ein Link, der das Einlösen-Blatt mit vorausgefülltem Code öffnet, und ein QR-Bild für Beamer oder Aushang.
- Wem: Gruppen in der Moschee; zehn Zeichen abtippen entfällt.
- Dagegen: Der Code stünde in der URL. Er ist ein Zugangscode und kein Personendatum, gehört aber ins Fragment (`#`), wie früher beim Link-Modell. QR ohne Fremdbibliothek ist Arbeit.
- Aufwand: 1 Session. Risiko gering.

**5. Liste einfügen (F-1, schon empfohlen)**
- Was: Viele Karten auf einmal einfügen.
- Wem: Dem Lehrer, der eine Lektion anlegt. Größte Zeitersparnis beim Erstellen.
- Dagegen: Keine Regel- oder Rechtsfrage. Aufwand 1–2 Sessions.

**6. Fertige Sätze zu Lehrbüchern (F-3)**
- Was: Ein Regal mit freigegebenen Codes.
- Dagegen: Den Inhalt darf nur der Betreiber liefern (LEHREN § 1.6). Urheberrecht ungeklärt: Die Medina-Bücher stammen von Dr. V. Abdur Rahim (Islamische Universität Medina). Eine gefundene Angabe „no copyrights reserved“ bezieht sich auf Lehrvideos eines Instituts in Toronto, nicht belegt für das Buch selbst. Die deutschen Schlüssel haben eigene Übersetzer. Vor einer öffentlichen Verbreitung, erst recht vor einem Verkauf, ist eine schriftliche Erlaubnis oder Rechtsrat nötig. Keine Rechtsberatung.
- Aufwand: Technisch ½–1 Session, inhaltlich groß.

**7. Lehrer sieht, wer wie weit ist**
- Empfehlung: Vorerst nicht bauen.
- Technisch ginge es ohne Server (der Schüler schreibt freiwillig eine Zahl in eine Untersammlung). Es bricht aber die Betreiber-Vorgabe „Sender erfährt nichts“ (GERUEST H) und trifft die harte Sperre C5 (Minderjährige, Anwalt).
- Eine Altersabfrage habe ich in `app.js` und den HTML-Dateien nicht gefunden (Suche nach „16 Jahre“, „Eltern“, „minderj“).
- Quizlet bietet Klassenfortschritt nur im Bezahl-Abo für Lehrer und braucht dafür Kinderkonten mit Eltern-Mail.

### Die Lücke
- Quizlet: Fortschritt nur gegen Geld.
- Anki: Keine sauberen Aktualisierungen, für Anfänger sperrig.
- Memrise: Hat Nutzerkurse 2024 aus der App auf eine Nebenseite verschoben.
- Was ich bei keinem der drei gefunden habe: einen Lehrer, der den Takt vorgibt, ohne Schülerdaten zu sehen, auf Deutsch, mit sauberer arabischer Schrift. Adrabic hat das schon. Ungeprüft: ob es andere deutschsprachige Angebote dafür gibt.

### Drei erste Schritte
1. Fund 2 mit zwei Testkonten oder im Prüfstand nachstellen.
2. Den Betreiber fragen, wie er heute wirklich nachliefert (neuer Code oder alter?). Die Unterlagen und der Code widersprechen sich hier.
3. Für Vorschlag 1 eine Vorlage mit Regel-Entwurf und Emulator-Fällen schreiben, vor jedem Bau.

### Zwei verlockende, aber schädliche Ideen
- **Klassenraum mit Mitgliederliste, Rangliste oder Chat:** Daten Minderjähriger über Konten hinweg, Moderation, Haftung des Vaters im Impressum.
- **Öffentliche Bibliothek, in die jeder Sätze hochlädt:** Ungeprüfter religiöser Inhalt außerhalb des Rahmens, Urheberrecht, und Moderation durch eine einzelne Person.

### Quellen
- [AnkiWeb-Forum, Aktualisierung geteilter Decks](https://forums.ankiweb.net/t/users-get-a-message-notification-when-an-add-on-that-they-downloaded-updates-but-do-they-get-a-notification-when-a-shared-deck-they-downloaded-gets-updated/3319), [Anki-Handbuch, Teilen](https://docs.ankiweb.net/contrib.html)
- [Quizlet, Class Progress](https://help.quizlet.com/hc/en-us/articles/360030512432-Using-Class-Progress)
- [Memrise, Community Courses](https://explore.memrise.com/community-courses)
- [Kahoot Trust Center](https://trust.kahoot.com/teachers/) (aus GERUEST.md übernommen, nicht neu geprüft)
- [archive.org, Medina-Bücher](https://archive.org/details/ArabicLanguageCourseBooks/page/n11) (kein Rechtsnachweis)
