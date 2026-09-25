# PRODUKT – neue Funktionen und Premium (Grossprüfung 25.09.2026)

Kürzel: PRODUKT. Kein Code-Audit. Nichts im Repo geändert.

Gelesen: `CLAUDE.md`, `plan/LEHREN.md` (komplett), `KONZEPT.md`, `plan/PLAN.md` (Später, Offene Fragen,
Nebenstränge, AKTUELL), `plan/monetarisierung/` (AUFTRAG, GERUEST, LOGBUCH), `plan/lehrer-modus/GERUEST.md`
(A0–M), `plan/landing-page-strategie/STRATEGIE.md` (1.2–1.4, 2.6), `plan/beobachtungen-lernwerkzeug.md`
(20, 21), `plan/onboarding/PSYCHOLOGIE.md`, `firestore.rules`, `.github/workflows/veroeffentlichen.yml`.
Einen Überblick über `app.js` 3.17.29 habe ich mir über alle `data-action`-Namen, die `render*`-Funktionen,
das Kartenmodell und die Regeln verschafft.

**Vorab, damit nichts doppelt vorgeschlagen wird: Das gibt es schon** (verifiziert im Code):
Handschrift-Feld (`renderHandwritingCanvas`, app.js:9949), drei Bewertungsknöpfe mit Wischen, Serie mit
wieder aufladendem Joker (`SERIE_JOKER_TAGE = 7`, app.js:2454 – das ist schon Duolingos „Streak Freeze",
nur kostenlos), Rundengröße (`SITZUNGS_LIMITS`, app.js:1105), geführte Lektionen mit Freischalten
(`offeneLektionIds`, app.js:338), Teilen per Code, „Lehrer gibt frei" (`teileLektionCode`, app.js:3554;
`geteilteLektionen` in firestore.rules:287), Üben/Drill mit und ohne Schreiben, „Merken", Rückfall-Karten
(Leech), Suche ohne Harakat (`SUCH_WEG`, app.js:~10019), Fortschritt mit Kalender, Hinweise zur richtigen
Zeit (Meilenstein, Wochenrückblick, Erinnerung), Kalender-Erinnerung als `.ics` (app.js:8999), Thema
Hell/Dunkel/Automatisch (`THEMEN`, app.js:1096), JSON-Sicherung und Import (`accept="application/json"`,
app.js:7413), Ideen-Board, Konto löschen.

**Schon einmal bewusst ausgeschlossen:** `CHANGELOG.md:4381` (1.8.0) nennt „Audio pro Karte · zweite
Abfragerichtung · Vorlage zum Nachfahren · Zeichnung speichern · Tippen statt Aufdecken · Filter nur schwierige
Karten …". Die Begründungen stehen in einer „Projektakte", die nicht im Repo liegt. Drei Punkte derselben
Liste (Hell/Dunkel, Rundengröße, Quran-Schrift) sind inzwischen doch gebaut, die Liste ist also kein
Verbot. Wo ich unten einen dieser Punkte aufgreife, nenne ich ein **neues** Argument (BRIEF Punkt 3).
Außerdem nach § 3.5 nicht wieder vorgeschlagen: Intervall-Zahlen, Nutzungsstatistik, Grammatik-Feld
(3.9.8), Datei „Zum Weitergeben", „Bewegung"-Schalter.

**Rahmen für alles hier:** `KONZEPT.md` §1 und `monetarisierung/GERUEST.md` D1 sagen heute „kein
Geldfluss". Jeder Premium-Block ist deshalb eine **Frage an den Betreiber**, kein Bauauftrag. Keine
religiösen Inhalte sind hier verfasst. Wo Quran-Vokabular vorkommt, ist es nur als Lernziel genannt, den
Inhalt liefert der Betreiber (§ 1.6, § 2).

Die Blöcke folgen dem BRIEF-Format. Dazu kommen die drei Felder aus dem Auftrag: **Aufwand grob**,
**Hängt dran (Firebase/Regeln/Recht)** und **Korb**. „Schwere" heißt hier **Priorität** (Nutzen für
Lernerfolg und Rückkehr im Verhältnis zum Aufwand). Die besten stehen zuerst.

---

#### PRODUKT-1: Viele Karten auf einmal anlegen („Liste einfügen", auch aus Anki/Tabelle)
- Art: Funktion
- Schwere: hoch
- Beleg: Import nimmt nur JSON (`app.js:7413` `accept="application/json"`, `verarbeiteImportDaten` app.js:3944). Ein Mehrzeilen- oder Tabellen-Einfügen gibt es nicht (grep „einfügen|mehrzeil|csv|tsv": 0 Treffer in dieser Bedeutung). `STRATEGIE.md` 1.3 nennt als größte Bruchstelle, dass Neue vor einem **leeren Werkzeug** stehen. verifiziert
- Warum es stört: Wer einen Kurs oder ein Buch hat, tippt heute jede Vokabel einzeln in ein Blatt. 30 Wörter einer Lektion kosten so 30 Blatt-Durchgänge. Wer von Anki oder Quizlet kommt, kann nichts mitnehmen, denn beide exportieren Text mit Tab oder Semikolon, kein Adrabic-JSON.
- Vorschlag: In Verwalten ein Blatt „Liste einfügen" mit einem Textfeld. Jede Zeile ist `Wort ⇥ Übersetzung [⇥ Notiz]`, Trenner Tab, `;` oder ` - `. Darunter eine Vorschau („12 Karten erkannt, 1 Zeile unklar") und ein Knopf „Anlegen". Geschrieben wird über den vorhandenen Stapel-Weg (`writeBatch`, 400 je Stapel, app.js:2184). Dieselbe Zerlegung nimmt auch eine `.txt`/`.tsv`-Datei an („Notizen als Text" aus Anki). Duplikatprüfung wie beim Einzelanlegen.
- Entscheidet: Betreiber (neue Funktion)
- Umsetzung: Sonnet
- Abnahme: Prüfstand-Test: 50 Zeilen mit Arabisch und Harakat einfügen, danach 50 Karten im Bereich, Harakat byteweise unverändert (§ 2.6). Eine Zeile ohne Trenner erscheint als „unklar" und wird nicht angelegt. Offline-Verhalten wie beim Einzelanlegen.
- Pro/Contra: Pro: Das ist der größte Hebel gegen das leere Werkzeug, und dafür braucht es keinen Lehrstoff vom Agenten (der Stoff kommt vom Nutzer). Keine neue Datenstruktur, keine neue Regel. Anki und Quizlet haben das seit Jahren. Contra: ein Blatt mehr in Verwalten (Hick). Arabisch mit RTL in einem gemischten Textfeld ist schwierig zu bedienen: Die Reihenfolge wirkt vertauscht, deshalb braucht es eine sichtbare Vorschau. Anki-`.apkg` (SQLite) ginge nur mit einer eingebetteten Bibliothek und ist ausdrücklich **nicht** gemeint. **Empfehlung: bauen, nur Text/TSV.**
- Aufwand grob: 1–2 Sessions inklusive Test.
- Hängt dran: Firebase nichts Neues (die Karten-Felder sind unverändert). Regeln unverändert. Recht nichts, Datenschutzerklärung nur, falls ein neuer `localStorage`-Schlüssel für einen Entwurf dazukommt.
- Korb: jetzt sinnvoll, kostenlos

#### PRODUKT-2: Harakat beim Abfragen ausblenden (Lesen ohne Vokalzeichen üben)
- Art: Funktion
- Schwere: hoch
- Beleg: Die Entfernungsliste gibt es schon (`SUCH_WEG`, app.js:~10019: Harakat, Sukun, Dagger-Alif, Quran-Zeichen), sie wird aber nur für die Suche benutzt. Die Vorderseite zeigt immer den gespeicherten Wortlaut. verifiziert
- Warum es stört: Wer Arabisch lesen lernt, erkennt voll vokalisierte Wörter und scheitert an gewöhnlichem Text ohne Harakat. Diese Fähigkeit trainiert die App heute nicht. Große Vokabeltrainer bieten das für Arabisch nicht an. Die Funktion wäre ein Unterscheidungsmerkmal in der Art des Handschrift-Felds (`STRATEGIE.md` 1.2).
- Vorschlag: Schalter je Bereich oder je Runde „Ohne Harakat abfragen". Die Vorderseite zeigt dann die bereinigte Anzeigeform, nach dem Aufdecken erscheint das Wort **mit** Harakat. Gespeichert wird nichts Verändertes, denn die Daten bleiben byteweise gleich (§ 2.6: „Harakat werden nicht verändert"). Vorgabe: aus.
- Entscheidet: Betreiber (neue Funktion; religiöse Seite: Quran-Text ohne Zeichen anzeigen ist eine Frage an den Betreiber)
- Umsetzung: Sonnet
- Abnahme: Test: Eine Karte mit Harakat zeigt bei eingeschaltetem Schalter vorn keine Zeichen aus `U+064B–U+0652`, nach dem Aufdecken den Originalwortlaut. `normCard`-Ausgabe und Firestore-Schreibvorgänge sind unverändert (Attrappe zählt 0 zusätzliche Schreibvorgänge).
- Pro/Contra: Pro: echter Lerngewinn, der Code dafür ist schon da, kein neues Datenfeld, keine Lernlogik (Bewertung und Abstände bleiben gleich). Contra: Bei Quran-Wortlaut kann das Weglassen der Zeichen religiös heikel sein. Das darf der Agent nicht beurteilen, deshalb Vorgabe aus und Wortlaut des Schalters vom Betreiber. Wer „ohne" bei neuen Wörtern einschaltet, wird überfordert, deshalb eher als Schalter pro Bereich und nicht global. Speichern in `settings` bräuchte eine neue Regel (§ 8.1); pro Runde nur in `ui` braucht keine. **Empfehlung: bauen, zuerst nur als Runden-Schalter (ohne Cloud-Feld).**
- Aufwand grob: 1 Session.
- Hängt dran: als Runden-Schalter nichts. Als dauerhafte Einstellung `normSettings()` + `settingsOk()` + Emulator + Regel-Deploy.
- Korb: jetzt sinnvoll, kostenlos

#### PRODUKT-3: Kartensatz-Regal: vom Betreiber freigegebene Sätze zum Einlösen
- Art: Funktion (später teilweise Premium, siehe PRODUKT-6)
- Schwere: hoch
- Beleg: Teilen per Code gibt es (`codeEinloesen` app.js:3653). Es fehlt ein Ort, an dem ein Neuer ohne fremden Code einen Satz findet. `STRATEGIE.md` 1.3: „Keine Headline der Welt repariert das." Frage 4 (Medina) ist „privat unter Brüdern" (PLAN.md). verifiziert
- Warum es stört: Wer über ein Video kommt, hat keinen Code und keinen Stoff. Das ist der Abbruchpunkt nach der Registrierung.
- Vorschlag: Unter „Karten hinzufügen" eine kleine Liste „Sätze zum Starten". Jeder Eintrag ist ein vorhandener `geteilteLektionen`-Code, den der Betreiber einträgt (eine feste Liste im Code oder ein öffentlich lesbares Dokument `katalog/oeffentlich`). Einlösen über den vorhandenen Weg. **Inhalt ausschließlich vom Betreiber**, der Agent baut nur das Regal.
- Entscheidet: Betreiber (Inhalt, Urheberrecht, Marke)
- Umsetzung: Sonnet (feste Liste) / Opus (Katalog-Dokument mit Regel)
- Abnahme: Ein Neuer ohne Code kann in höchstens 3 Tipps einen Satz einlösen. Test mit Attrappe: der Bereich ist angelegt, Lektion 1 offen.
- Pro/Contra: Pro: schließt die größte Lücke im Trichter, nutzt die fertige Teilen-Technik, und daraus kann später ein Bezahl-Satz werden. Contra: Es steht und fällt mit Inhalt, den nur der Betreiber liefern kann. Einen Kartensatz nach einem Lehrbuch öffentlich zu machen, berührt das Urheberrecht (in `STRATEGIE.md` Fassung C ausdrücklich an „Urheberrecht geklärt" gebunden). Ohne Inhalt ist das Regal eine tote Fläche („nichts, was tot wirkt", § 1.5). **Empfehlung: erst bauen, wenn der Betreiber mindestens einen eigenen, rechtlich freien Satz hat. Bis dahin nicht.**
- Aufwand grob: feste Liste ½ Session. Katalog-Dokument 1 Session plus Regel.
- Hängt dran: bei feste Liste nichts. Katalog: neue Sammlung, Regel `allow get: if angemeldetBestaetigt(); allow write: if false` (nur Konsole schreibt), Regel-Deploy. Datenschutz: nichts Neues (dieselben Codes).
- Korb: jetzt sinnvoll, kostenlos, **sobald Inhalt da ist**

#### PRODUKT-4: Lehrer-Paket (Ausbau von „Lehrer gibt frei")
- Art: Premium
- Schwere: hoch
- Beleg: „Lehrer gibt frei" ist live (GERUEST M, v3.7.0; firestore.rules `freigabeOk` :283). `monetarisierung/GERUEST.md` A2 nennt es als Kandidaten: „Bliebe das kostenlose Kernstück bestehen und nur eine Ausbaustufe … hinter ein Abo?" verifiziert
- Warum es stört: Lehrpersonen haben den größten Nutzen und am ehesten Zahlungsbereitschaft (Quizlet Teacher, Brainscape Enterprise). Heute hat das kostenlose Werkzeug keine Stelle, an der sich ein Aufpreis fair anfühlen würde.
- Vorschlag: Kostenlos bleibt, was heute da ist: Code teilen, freigeben. Premium wäre eine **Ausbaustufe, die nichts über Schüler:innen erfährt** (Modell H bleibt): mehrere Lektionen im Voraus zeitlich freigeben („jeden Montag eine"), Änderungen am Satz kommen bei allen Empfängern an (Live-Stand statt einmaligem Import), mehrere gleichzeitige Codes pro Bereich, eine Kurs-Seite mit Titel.
- Entscheidet: Betreiber (Premium, Lernlogik bei Zeitfreigabe)
- Umsetzung: Opus (Regeln, dauerhafte Verbindung, Berechtigung)
- Abnahme: Ein Konto ohne Berechtigung bekommt `permission-denied` beim Anlegen des zweiten Codes (Emulator-Test). Ein Konto mit Berechtigung schafft es. Empfänger-Seite braucht weiterhin kein Premium.
- Pro/Contra: Pro: Hier stimmt die Wertlogik: Wer zahlt (Lehrer), hat Nutzen, wer lernt, zahlt nicht. Die Regeln können das tatsächlich schützen, weil es Serverdaten sind (siehe Fundament). Keine Daten über Minderjährige nötig. Contra: Zeitfreigabe und Live-Stand fassen `offeneLektionIds` und den Import an (Lernlogik, eigene Freigabe nötig). Das Publikum ist heute nur „Leute, die der Betreiber kennt", der Aufwand übersteigt womöglich den Erlös. Ein Lehrer wird schnell Ansprechpartner für Support. **Empfehlung: gutes erstes Premium, aber erst, wenn es mindestens eine Lehrperson gibt, die das kostenlose „Lehrer gibt frei" regelmäßig nutzt.**
- Aufwand grob: 3–5 Sessions plus Rechtsweg.
- Hängt dran: neue Regeln für `geteilteLektionen` (Update nur mit Berechtigung), Berechtigungs-Sammlung (Fundament), Zahlungsweg, AGB/Widerruf, Datenschutz (Zahlungsdienst).
- Korb: später Premium

#### PRODUKT-5: Zweite Abfragerichtung (Deutsch → Arabisch, gern mit Handschrift)
- Art: Funktion
- Schwere: mittel
- Beleg: Die Karte fragt immer Wort → Übersetzung, eine Richtungswahl gibt es nicht (grep „richtung" nur Animation/Einstieg). In 1.8.0 ausdrücklich ausgeschlossen (`CHANGELOG.md:4381`). Karten haben nur **eine** `stufe` (firestore.rules `kartenFelder()`:206). verifiziert
- Warum es stört: Wer ein Wort erkennt, kann es noch lange nicht selbst schreiben oder sagen. Das produktive Abrufen ist schwerer und wird eigens geübt (Retrieval-Practice-Metaanalyse Adesope u. a. 2017: g = 0,51 gegenüber Wiederlesen; die Wirkung hängt am *abgefragten* Format).
- **Neues Argument gegenüber 1.8.0:** Seit 1.8.0 gibt es das Handschrift-Feld. Für Deutsch → Arabisch ist das Mitschreiben genau die produktive Aufgabe. Damals fehlte diese Brücke.
- Vorschlag: pro Bereich „Auch rückwärts abfragen". Zweiter Stand je Karte (`stufeRueck`, `nextReviewRueck`), eigene Runde oder gemischt.
- Entscheidet: Betreiber (**Lernlogik**, Datenmodell)
- Umsetzung: Opus
- Abnahme: `abnahme_runde.js` 13/13 grün. Ein Bereich ohne Schalter verhält sich byteweise wie vorher. Regel-Emulator-Test für die neuen Felder.
- Pro/Contra: Pro: Anki (Reverse-Karten), Memrise und Quizlet haben das als Grundfunktion, und es nutzt das stärkste Merkmal der App. Contra: verdoppelt die tägliche Menge, wenn man es einschaltet, und damit das Risiko von Überlastung und Abbruch. Neue Kartenfelder bedeuten Regeln, Migration, Export-Format und Abgleich (`satzUnterschied`), und die Serie muss mitgedacht werden. Es war schon einmal bewusst abgelehnt. **Empfehlung: ja als Richtung, aber erst nach PRODUKT-1/2, mit eigenem Konzept; nicht Premium (Kernlernen gehört nicht hinter die Schranke, siehe Quizlet-Gegenbeispiel).**
- Aufwand grob: 3–4 Sessions.
- Hängt dran: `kartenFelder()`/`kartenWerte()`, Regel-Deploy, Weitergabe-Format, Datenschutz nichts.
- Korb: jetzt sinnvoll, kostenlos (als nächstes großes Vorhaben, nicht sofort)

#### PRODUKT-6: Kuratierten Kartensatz einmal kaufen
- Art: Premium
- Schwere: mittel
- Beleg: `monetarisierung/GERUEST.md` A1. Kommentar app.js:57–63: „die Weitergabe des Betreibers – später vielleicht verkaufbar (Medina Buch 1)". `geteilteLektionen` erlaubt `get` für **jedes** bestätigte Konto (firestore.rules:288). verifiziert
- Warum es stört: Ohne diese Stelle hat das Werkzeug keinen Gegenstand, den man kaufen könnte, ohne das Werkzeug selbst zu beschneiden.
- Vorschlag: Einmalkauf pro Satz statt Abo. Wichtig: Ein Bezahl-Satz darf **nicht** über `geteilteLektionen` laufen, denn wer den Code kennt, kann ihn lesen. Er braucht eine eigene Sammlung `kaufsaetze/{id}` mit `allow get: if hatBerechtigung('satz_'+id)` (siehe Fundament).
- Entscheidet: Betreiber (Premium, Inhalt, Urheberrecht, Religion)
- Umsetzung: Opus
- Abnahme: Emulator: Ein Konto ohne Berechtigung erhält `permission-denied` auf `kaufsaetze/x`, ein Konto mit Berechtigung liest ihn. Nach dem Import sind die Karten normale eigene Karten.
- Pro/Contra: Pro: das fairste Modell für eine kleine App (einmal zahlen, dauerhaft behalten, das Werkzeug bleibt frei). Durch die Regeln wirklich schützbar. Contra: Der Satz braucht Inhalt, der dem Betreiber gehört oder für den er die Rechte hat. Ein Satz nach einem fremden Lehrbuch ist rechtlich offen. Für Quran-Vokabular gibt es kostenlose Konkurrenz (Quran Progress; Quran Flow wirbt mit „no paywalls on knowledge"), deshalb ist Geld für Quran-Wortschatz auch eine Frage des Selbstverständnisses. Die beantwortet der Betreiber, nicht der Agent. Nach dem Kauf liegen die Karten beim Käufer und lassen sich weiterteilen, weil der eigene Code-Weg auch für importierte Sätze offen ist; das müsste gesperrt werden (`app.js:4276` sperrt schon „in beide Richtungen" bei geführten Sätzen, das prüfen). **Empfehlung: wenn überhaupt Geld, dann zuerst dieses Modell oder PRODUKT-4, nicht ein Abo.**
- Aufwand grob: 2–3 Sessions plus Rechtsweg.
- Hängt dran: neue Sammlung mit Regel, Berechtigung, Zahlungsweg, AGB, Widerrufsbelehrung mit Verzicht nach § 356 Abs. 5 BGB, Datenschutz, Steuer.
- Korb: später Premium

#### PRODUKT-7: Unterstützen: einmalig oder „Zahl, was du willst", ohne Freischaltung
- Art: Premium (leicht)
- Schwere: mittel
- Beleg: `monetarisierung/GERUEST.md` A3 und E3 („Spenden-/PWYW-Link … kein Code"). Der Satz „Kostenlos. Keine Werbung, keine Cookies." ist auf Betreiber-Wunsch gestrichen (PLAN AKTUELL 3.17.22). verifiziert
- Warum es stört: Wer die App mag, hat heute keinen Weg, etwas zurückzugeben. Kostet den Betreiber nichts an Bau.
- Vorschlag: eine ruhige Zeile in Einstellungen → „Über Adrabic": „Adrabic unterstützen" als externer Link (Stripe Payment Link oder Ko-fi). Keine Funktion schaltet frei, kein Abzeichen, kein Nachfragen.
- Entscheidet: Betreiber (Geldfluss, Recht, Steuer)
- Umsetzung: Haiku (ein Link), sobald die Konsole eingerichtet ist
- Abnahme: Der Link öffnet den externen Anbieter in einem neuen Tab, die CSP ist unverändert (eine Navigation ist keine Ressource), kein neuer `localStorage`-Schlüssel.
- Pro/Contra: Pro: kleinster Schritt, kein Eingriff in das Werkzeug, keine Berechtigung, keine Regel. Passt zum ruhigen Ton. Contra: bringt erfahrungsgemäß wenig Geld. Es bleibt trotzdem Geldfluss an eine Person, die im Impressum steht (der Vater) bzw. an den minderjährigen Inhaber. Ob das eine „Spende" oder ein Entgelt ist und wie es zu versteuern ist, klärt ein Steuerberater, nicht der Agent. Ein „Spende"-Wort kann nach Gemeinnützigkeit klingen, die es nicht gibt. **Empfehlung: bester erster Test, ob überhaupt jemand zahlt, aber erst nach Rücksprache mit dem Steuerberater.**
- Aufwand grob: Minuten im Code; der Aufwand liegt in Konsole und Recht.
- Hängt dran: Datenschutzerklärung (Link zu einem Zahlungsdienst: Hinweis, dass dort dessen Datenschutz gilt), Impressum unverändert, Steuer.
- Korb: später Premium (als Einstieg in das Thema Geld)

#### PRODUKT-8: Eigene Gestaltung (Farbvarianten) als Premium
- Art: Premium
- Schwere: mittel
- Beleg: `monetarisierung/GERUEST.md` A2 dritter Kandidat, dort schon der Konflikt mit „genau eine gefüllte Akzentfläche" (`styles.css`). `settingsOk()` prüft `thema` nur auf Länge (`text(s.thema, 20)`, firestore.rules:~123). verifiziert
- Warum es stört: Das ist das einzige Premium, das den Lernerfolg nicht berührt, und deshalb das fairste im Sinn „nichts wegnehmen".
- Vorschlag: zwei oder drei zusätzliche Themen-Varianten, jede im bestehenden Token-System (nur `:root`-Tokens, § 6.5).
- Entscheidet: Betreiber (Marke, Premium)
- Umsetzung: Sonnet
- Abnahme: `t_kontrast.js` 0 Befunde in jeder neuen Variante, hell und dunkel.
- Pro/Contra: Pro: fair, klein, beliebt (in Spielen üblich). Contra: **nicht wirklich schützbar.** Die Anzeige läuft im Browser, und jeder kann `settings.thema` selbst schreiben, weil die Regel nur die Länge prüft. Wer die Konsole bedienen kann, schaltet es also frei. Das ist hinnehmbar („Ehrlichkeits-Premium"), muss aber bewusst entschieden werden. Es kostet Kontrast-Arbeit je Variante und verwässert die Marke. **Empfehlung: nur als Dankeschön zu PRODUKT-7 (wer unterstützt, bekommt die Varianten), nicht als eigenes Produkt.**
- Aufwand grob: 1–2 Sessions je Variante inklusive Kontrastmessung.
- Hängt dran: Wert für `thema` ist schon erlaubt (kein Regel-Deploy, solange der Name ≤ 20 Zeichen). Berechtigung nur als Anzeige-Prüfung.
- Korb: später Premium

#### PRODUKT-9: Lückentext aus dem eigenen Beispielsatz
- Art: Funktion
- Schwere: mittel
- Beleg: Das Feld `extra` („Beispielsatz, Grammatik, Bild-Link oder Notiz", app.js:176) trägt schon Beispielsätze, wird aber erst nach dem Aufdecken gezeigt (`renderExtra` app.js:9985). Clozemaster baut das ganze Produkt auf Lückentexten. verifiziert (Bestand), Nutzen: Vermutung
- Warum es stört: Ein Wort im Satz zu erkennen, ist näher am echten Lesen als ein Wort allein.
- Vorschlag: im Üben (nicht in der bewerteten Runde) eine Art „Im Satz": Kommt das Wort im Beispielsatz vor (Vergleich über die vorhandene Vergleichsform ohne Harakat), wird es darin durch „…" ersetzt.
- Entscheidet: Betreiber (neue Funktion)
- Umsetzung: Sonnet
- Abnahme: Karten ohne passenden Satz erscheinen in dieser Art nicht. Die bewertete Runde ist unverändert (`abnahme_runde.js` grün).
- Pro/Contra: Pro: kein neues Feld, kein neuer Inhalt vom Agenten, bleibt im Üben und damit außerhalb der Lernlogik. Contra: Es trifft nur Karten mit Beispielsatz, von denen es wenige gibt (0 von 136 nutzten das Grammatik-Feld, die Nutzung der Notiz ist unbekannt). Die arabische Wortform im Satz weicht oft ab (Artikel, Endungen), und dann greift die Lücke nicht. **Empfehlung: zurückstellen, bis der Betreiber sagt, dass seine Karten Beispielsätze tragen.**
- Aufwand grob: 1–2 Sessions.
- Hängt dran: nichts.
- Korb: jetzt sinnvoll, kostenlos, *mit Vorbehalt*

#### PRODUKT-10: Fortschritt als Bild teilen (ohne Tracking)
- Art: Funktion
- Schwere: niedrig
- Beleg: Trichter TikTok → Seite → App (`GERUEST.md` C). E4 „Weiterempfehlung … ohne Tracking" ist offen. Es gibt keinen Teilen-Weg außer Kartensatz-Codes. verifiziert
- Warum es stört: Wachstum läuft heute nur über den Betreiber selbst.
- Vorschlag: Auf dem Rundenende oder in Fortschritt „Als Bild teilen": ein lokal erzeugtes Canvas-PNG (Anzahl „sitzen schon", Serie) über `navigator.share`, keine Kennung, kein Link mit ID.
- Entscheidet: Betreiber (Marke, Wachstum)
- Umsetzung: Sonnet
- Abnahme: kein Netzaufruf beim Erzeugen (Prüfstand zählt Anfragen = 0), keine Methoden-Zahlen im Bild (§ 6.9).
- Pro/Contra: Pro: nutzt die vorhandene Serie, kostet keinen Datenfluss. Contra: Das kann als Druck oder Angeberei wirken und widerspricht dem ruhigen Ton. Serien-Sprache ist im Einstieg bewusst ausgeschlossen (PSYCHOLOGIE §4). Bei drei Nutzern ohne Wirkung. **Empfehlung: erst mit der neuen Startseite (Phase 6), sonst nicht.**
- Aufwand grob: 1 Session.
- Hängt dran: nichts.
- Korb: jetzt sinnvoll, kostenlos, *aber erst mit Phase 6*

#### PRODUKT-11: Ton zu Karten: Aufnahmen des Betreibers in seinen Sätzen; eigene Aufnahmen
- Art: Funktion (Betreiber-Aufnahmen) / Premium (eigene Aufnahmen)
- Schwere: niedrig
- Beleg: kein Audio im Code (grep `Audio|audio|speechSynthesis` = 0). In 1.8.0 bewusst ausgeschlossen (`CHANGELOG.md:4381`). **Cloud Storage for Firebase verlangt seit 03.02.2026 den Blaze-Tarif** ([Firebase-FAQ](https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024)). verifiziert
- Warum es stört: Aussprache fehlt komplett. Memrise, Quran-Vokabel-Apps (Quran Flow: „audio pronunciation for every single word") und Clozemaster (Pro: „unlimited listening") haben sie als Kernmerkmal.
- **Neues Argument gegenüber 1.8.0:** keins, das die Hürde senkt. Der Bau ist durch die Blaze-Pflicht für Storage sogar teurer geworden. Einziger neuer Weg: Aufnahmen des Betreibers als **statische Dateien auf Firebase Hosting** (liegt im Spark-Tarif, kein Storage).
- Vorschlag: (a) Betreiber-Sätze mit Tondatei je Karte, ausgeliefert über Hosting, eingebunden über ein neues optionales Kartenfeld mit Dateinamen. (b) Eigene Aufnahmen per `MediaRecorder`, nur als Premium und nur mit Blaze.
- Entscheidet: Betreiber (Inhalt, Religion: Rezitation/Aussprache ist Inhalt, § 2)
- Umsetzung: Opus
- Abnahme: (a) Die Tondatei spielt offline nach einmaligem Laden (Service Worker), die CSP lässt `media-src 'self'` zu.
- Pro/Contra: Pro: großer Lernwert für Aussprache. Contra: Ton ist Inhalt, den nur der Betreiber liefern darf, bei Quran-Wörtern mit besonderer Sorgfalt. Das Hosting wächst mit jeder Datei. Eigene Aufnahmen bedeuten Blaze-Tarif (Kreditkarte, Kostenrisiko), Speicher-Regeln, Löschen beim Konto-Löschen und einen Datenschutz-Abschnitt (Stimme ist ein personenbezogenes Datum). **Empfehlung: (a) nur, wenn der Betreiber Aufnahmen hat; (b) lieber nicht.**
- Aufwand grob: (a) 2 Sessions, (b) 4+ Sessions plus Blaze.
- Hängt dran: (a) `kartenFelder()`, CSP `media-src`, `csp-build`, APP_SHELL-Frage. (b) Blaze, Storage-Regeln, Datenschutz, Konto-Löschen.
- Korb: (a) später, kostenlos; (b) lieber nicht

#### PRODUKT-12: Reihenfolge-Modus (Ayat, Gedichte, fortlaufende Texte)
- Art: Funktion (vom Betreiber als Premium-Kandidat notiert)
- Schwere: niedrig (für jetzt)
- Beleg: `beobachtungen-lernwerkzeug.md` 20 mit Nachtrag. Betreiber: „ist wichtiges Thema, daher will ich nicht voreilig sein." `GERUEST.md` A2. verifiziert
- Warum es stört: Stufen-Wiederholung mischt fällige Karten, ein Text braucht die Reihenfolge.
- Vorschlag: nicht bauen, sondern ein eigenes Konzept anlegen, wenn der Betreiber es startet. Sachlich braucht es zwei verschiedene Abrufarten (der Reihe nach; beliebiger Vers → Nachbarvers).
- Entscheidet: Betreiber (Lernlogik, Religion)
- Umsetzung: Opus
- Abnahme: entfällt (nur Konzept).
- Pro/Contra: Pro: echte Lücke, kaum eine Karteikarten-App kann es. Contra: Es ist eine zweite Lern-Betriebsart. Der Inhalt ist religiöser Wortlaut (§ 2), wie man Hifz richtig übt, darf der Agent nicht festlegen. **Empfehlung zur Premium-Frage: den Quran-bezogenen Lernweg nicht hinter eine Bezahlschranke; wenn schon, dann kostenlos. Die Abwägung liegt beim Betreiber.**
- Aufwand grob: Konzept 1 Session, Bau offen.
- Hängt dran: Lernlogik-Freigabe, evtl. Kartenfeld für Reihenfolge (es gibt `order` schon).
- Korb: später (eigener Strang); **nicht** Premium empfohlen

#### PRODUKT-13: Ausführlichere Auswertung als Premium
- Art: Premium
- Schwere: niedrig
- Beleg: Fortschritt hat Kalender, Stufenverteilung und Wochenvergleich (`renderFortschritt` app.js:9435). Clozemaster Pro verkauft „more stats". verifiziert
- Warum es stört: Zahlungsbereitschaft für Statistik gibt es bei „Power-Usern".
- Vorschlag: keiner, siehe Empfehlung.
- Entscheidet: Betreiber
- Umsetzung: –
- Abnahme: –
- Pro/Contra: Pro: rein im Browser machbar. Contra: Mehr Zahlen widersprechen § 3.5/§ 6.9 („kein Bock, dass man mein System leicht herauskriegen kann", keine Methoden-Zahlen). Nicht schützbar (Browser). Hick. **Empfehlung: lieber nicht.**
- Aufwand grob: –
- Hängt dran: –
- Korb: lieber nicht

#### PRODUKT-14: FSRS statt der heutigen Stufen
- Art: Funktion
- Schwere: niedrig (für jetzt)
- Beleg: Die Abstände kommen aus `intervalForStufe()` (app.js:122, 1,8^(Stufe−1) mit Deckel und Streuung). Karten speichern nur `stufe`, `maxStufe`, `nextReview`, `rueckfaelle`, `ersteBewertung` (firestore.rules:206–224). **Ein Bewertungsverlauf je Karte wird nicht gespeichert.** Laut [open-spaced-repetition-Benchmark](https://expertium.github.io/Benchmark.html) braucht FSRS bei gleicher Behaltensrate etwa 20–30 % weniger Wiederholungen als SM-2 (Anki-Daten, Hunderte Millionen Bewertungen). verifiziert (Code); Benchmark-Zahl: Fremdangabe
- Warum es stört: nachweislich effizientere Planung.
- Vorschlag: nicht umbauen.
- Entscheidet: Betreiber (Lernlogik)
- Umsetzung: Opus
- Abnahme: –
- Pro/Contra: Pro: bestbelegter Planer, und Konkurrenz wirbt damit (QuranRoots nutzt FSRS). Contra: Der Vergleich misst gegen SM-2, nicht gegen dieses Stufensystem. Ohne gespeicherten Verlauf lässt sich FSRS nicht auf den Nutzer anpassen (nur Standardwerte). Die Umstellung aller Karten ändert jede Fälligkeit, die Stufen-Wörter („wird fester", „gefestigt"), die Serie-nahen Texte und das Freischalten der Lektionen (`LEKTION_STUFE`). Der Betreiber will sein System bewusst nicht offenlegen. **Empfehlung: lieber nicht. Wenn überhaupt, zuerst einen Bewertungsverlauf je Karte speichern (Datenmodell), dann in einem Jahr neu prüfen.**
- Aufwand grob: 5+ Sessions plus Migration.
- Hängt dran: Regeln, Migration, alle Texte.
- Korb: lieber nicht

#### PRODUKT-15: Vorlesen per Sprachsynthese (Browser-TTS)
- Art: Funktion
- Schwere: niedrig
- Beleg: kein `speechSynthesis` im Code. Die Web-Speech-Stimmen hängen vom Gerät ab. Vermutung (nicht gemessen): Arabische Stimmen fehlen auf manchen Android- und Desktop-Geräten und sprechen Harakat unzuverlässig.
- Warum es stört: bequemer Ersatz für PRODUKT-11.
- Vorschlag: nicht bauen.
- Entscheidet: Betreiber
- Umsetzung: –
- Abnahme: –
- Pro/Contra: Pro: keine Dateien, kein Server, sofort. Contra: Eine maschinell erzeugte Aussprache ist faktisch maschinell erzeugtes Arabisch (§ 1.6, § 2.6), bei Quran-Wörtern mit falscher Vokalisierung religiös problematisch. Die Qualität ist je Gerät verschieden, und das sieht der Agent nicht. **Empfehlung: lieber nicht.**
- Aufwand grob: –
- Hängt dran: –
- Korb: lieber nicht

#### PRODUKT-16: Echte Push- oder E-Mail-Erinnerung
- Art: Funktion (oft Premium bei anderen)
- Schwere: niedrig
- Beleg: bewusst nicht gebaut, Kalender-`.ics` stattdessen (app.js:8903: „Eine echte Push-Mitteilung braeuchte einen Server … den gibt es bewusst nicht"). `GERUEST.md` E7 fragt, ob das ein Bezahl-Anreiz wäre. verifiziert
- Warum es stört: Duolingo nennt Erinnerungen und Serie seine stärksten Hebel für die Rückkehr. Das sind Firmenangaben, keine unabhängigen Studien.
- Vorschlag: nicht bauen.
- Entscheidet: Betreiber
- Umsetzung: –
- Abnahme: –
- Pro/Contra: Pro: wirksam für die Rückkehr. Contra: braucht Cloud Functions, also Blaze, einen gespeicherten Push-Token oder eine E-Mail-Adresse zum Versand (neuer Datenfluss) und bei E-Mail einen Absender mit eigener Domain (§ 10.1). Als Bezahl-Anreiz wäre es „Erinnerung gegen Geld", und das passt nicht zu „ohne Nerven" (§ 1.5). Die `.ics`-Lösung deckt den Kern ab. **Empfehlung: lieber nicht, weder kostenlos noch Premium.**
- Aufwand grob: –
- Hängt dran: –
- Korb: lieber nicht

#### PRODUKT-17: Serien-Schutz oder Joker kaufen
- Art: Premium
- Schwere: niedrig
- Beleg: Joker lädt kostenlos wieder auf (`SERIE_JOKER_TAGE`, app.js:2454; Frage 18). Duolingo verkauft „Streak Freezes". Laut Firmenangaben senkten sie die Abwanderung bei gefährdeten Serien um 21 % (Blog-Zitate, nicht unabhängig geprüft). verifiziert (Code)
- Pro/Contra: Pro: hat bei Duolingo nachweislich Umsatz gebracht. Contra: Es macht aus einer Lernhilfe einen Hebel über Verlustangst, und genau das schließt `PSYCHOLOGIE.md` §4 aus („Schuld oder Verlustangst"). Die Serie würde zur Ware. **Empfehlung: lieber nicht.**
- Entscheidet: Betreiber · Umsetzung: – · Abnahme: – · Aufwand: – · Hängt dran: Lernlogik
- Korb: lieber nicht

#### PRODUKT-18: Freunde, Bestenlisten, Klassen-Ranglisten
- Art: Funktion
- Schwere: niedrig
- Beleg: Die Regeln lassen jedes Konto nur bei sich lesen (firestore.rules:141ff.). Minderjährige gelten als harte Sperre für kontenübergreifende Daten (§ 12, C5). verifiziert
- Pro/Contra: Pro: Sozialvergleich hält manche Leute bei der Stange. Contra: Kontenübergreifende Sichtbarkeit bedeutet neue Regeln, Daten über Minderjährige und Moderation. Das passt nicht zu „ruhig". **Empfehlung: lieber nicht.**
- Entscheidet: Betreiber · Umsetzung: – · Abnahme: – · Aufwand: – · Hängt dran: Phase 1 neu, Recht
- Korb: lieber nicht

#### PRODUKT-19: Karten oder Übersetzungen per KI erzeugen
- Art: Premium (bei Brainscape und Quizlet üblich)
- Schwere: niedrig
- Beleg: § 1.6 (erfundener Kartensatz 3.0.21), § 2.1 und § 2.6: kein maschinell erzeugtes Arabisch. Brainscape Pro wirbt mit „unlimited AI flashcard generation". verifiziert (Regel)
- Pro/Contra: Pro: großes Verkaufsargument bei der Konkurrenz. Contra: widerspricht einer harten Regel des Projekts, braucht einen Server mit API-Schlüssel und Kosten je Aufruf, und bei religiösen Wörtern ist die Fehlerquote nicht hinnehmbar. **Empfehlung: lieber nicht.**
- Entscheidet: Betreiber · Umsetzung: – · Abnahme: – · Aufwand: – · Hängt dran: Server, Recht, Religion
- Korb: lieber nicht

#### PRODUKT-20: Wurzel-Feld oder Grammatik-Feld (Gruppierung nach Wortwurzel)
- Art: Funktion
- Schwere: niedrig
- Beleg: Das Grammatik-Feld wurde in 3.9.8 wieder entfernt (0 von 136 Karten nutzten es; `beobachtungen-lernwerkzeug.md` 21). Quran-Apps (Quran Flow, QuranRoots, Iqra) werben mit Wurzeln. verifiziert
- Pro/Contra: Pro: Arabisch ist wurzelbasiert. Contra: Es bräuchte Inhalt (Wurzeln), den der Nutzer oder Betreiber eintragen muss, und dasselbe Feld-Problem wie 3.9.8. Nach § 3.5 nur mit neuem Anlass. **Empfehlung: lieber nicht, außer der Betreiber liefert Sätze mit Wurzeln.**
- Entscheidet: Betreiber · Umsetzung: – · Abnahme: – · Aufwand: – · Hängt dran: Regeln (neues Feld)
- Korb: lieber nicht

---

## Drei Körbe

**Jetzt sinnvoll, kostenlos** (in dieser Reihenfolge)
1. PRODUKT-1 Liste einfügen: löst das leere Werkzeug mit Stoff des Nutzers selbst, ohne Regel.
2. PRODUKT-2 Harakat ausblenden: echter Arabisch-Lerngewinn, Code halb vorhanden, keine Lernlogik.
3. PRODUKT-3 Kartensatz-Regal, **sobald** der Betreiber einen eigenen, rechtlich freien Satz hat.
4. PRODUKT-5 Zweite Richtung: nächstes großes Vorhaben mit eigenem Konzept (Lernlogik-Freigabe), nicht sofort.
5. PRODUKT-9 Lückentext und PRODUKT-10 Teilbild: nur mit Vorbehalt (Beispielsätze vorhanden / Phase 6).

Begründung: Das stärkste Argument für eine Rückkehr ist nach Belegen die Wiederholung selbst (Abrufen:
Adesope 2017, g = 0,51; verteilt Üben: Cepeda 2006, 317 Experimente). Die App hat das schon, ihr fehlt der
**Stoff am Anfang** (STRATEGIE 1.3). Deshalb stehen die Stoff-Zugänge vorn, nicht neue Lernmechanik.

**Später Premium** (nur, wenn der Betreiber „Geld fließt" beschließt)
1. PRODUKT-7 Unterstützen (einmalig, ohne Freischaltung): kleinster Test, ob überhaupt jemand zahlt.
2. PRODUKT-6 Kartensatz einmal kaufen: fair, durch Regeln wirklich schützbar.
3. PRODUKT-4 Lehrer-Paket: zahlt, wer den Nutzen hat, und es gibt keine Schülerdaten.
4. PRODUKT-8 Gestaltung, nur als Dankeschön zu 7.
- Grundsatz: **Kein Lernkern hinter die Schranke** (Abfragen, Richtungen, Serie, Rundenzahl). Quizlet hat
  genau das getan und steht deshalb laut mehreren Vergleichsseiten bei 1,4/5 auf Trustpilot (Fremdangabe).
- **Einmalkauf vor Abo.** Ein Abo verlangt einen Kündigungsknopf (§ 312k BGB), laufende Abrechnung,
  Mahnwesen und im Stripe-Weg eine Cloud Function für den Ablauf. Ein Einmalkauf braucht nur „einmal
  freischalten". Vergleich: Anki ist gratis, AnkiMobile ein Einmalkauf; Brainscape und Clozemaster bieten
  neben dem Abo eine „Lifetime"-Stufe (Brainscape 199,99 $, Clozemaster 199 $, Fremdangaben 2026).

**Lieber nicht**: PRODUKT-13 (Statistik gegen Geld: widerspricht § 3.5), 14 (FSRS: kein Verlauf, Lernlogik,
Nutzen gegen SM-2 statt gegen diese App gemessen), 15 (TTS: maschinelles Arabisch), 16 (Push/E-Mail:
Server, Datenfluss, „ohne Nerven"), 17 (Joker kaufen: Verlustangst), 18 (Bestenlisten: Minderjährige,
Regeln), 19 (KI-Karten: § 1.6), 20 (Wurzel-Feld: § 3.5), 11b (eigene Aufnahmen: Blaze + Stimmdaten).

---

## Bezahlen ohne eigenen Server: was welcher Weg braucht

| Weg | Braucht | Kosten (Fremdangaben 2026) | Freischalten | Passt? |
|---|---|---|---|---|
| **Stripe Payment Link** + Freischalten von Hand | Stripe-Konto, kein Code außer dem Link. `?client_reference_id=<uid>` hängt die Konto-ID an ([Stripe-Doku](https://docs.stripe.com/payment-links/url-parameters)) | EWR-Karten ca. 1,5 % + 0,25 € | Betreiber sieht die Zahlung samt uid im Stripe-Dashboard und legt in der Firestore-Konsole `berechtigungen/{uid}` an (Konsole umgeht die Regeln) | **ja, für kleine Zahlen.** Spark-Tarif bleibt. Skaliert nicht; Betreiber ist dann Verkäufer (Umsatzsteuer, Rechnung, Widerruf selbst) |
| **Firebase-Erweiterung „Run Payments with Stripe"** | **Blaze-Tarif** (Cloud Functions) ([extensions.dev](https://extensions.dev/extensions/stripe/firestore-stripe-payments)) | Stripe-Gebühr plus Functions/Secret Manager (bei kleinen Mengen meist Cent-Beträge, aber Kreditkarte und Kostenrisiko) | automatisch: schreibt `customers/{uid}/…` und setzt ein Custom Claim `stripeRole`, das die Regeln über `request.auth.token` lesen | technisch sauber, aber neuer Baustein (Blaze, Functions, CSP für Stripe.js falls eingebettet). Erst ab echtem Bedarf |
| **Lemon Squeezy / Paddle** (Merchant of Record) | Konto beim Anbieter; der Anbieter ist rechtlich Verkäufer und führt Umsatzsteuer EU-weit ab | ca. 5 % + 0,50 $ zzgl. Aufschläge ([Vergleich](https://dodopayments.com/blogs/paddle-vs-lemon-squeezy)) | Lemon Squeezy hat eine öffentliche Lizenz-API ohne Geheimschlüssel ([Doku](https://docs.lemonsqueezy.com/api/license-api)). Die Prüfung im Browser können aber **die Regeln nicht glauben**, also wieder Freischalten von Hand oder Function | gut, wenn man Steuer und Verbraucherrecht beim Verkauf möglichst abgeben will. Lemon Squeezy gehört seit 2024 zu Stripe; Stripe „Managed Payments" (eigener MoR) ist seit Feb. 2026 in öffentlicher Vorschau ([LS-Blog](https://www.lemonsqueezy.com/blog/2026-update)). Zukunft von LS ungewiss |
| Ko-fi / PayPal.me | nur Link | je Anbieter | keins | nur für PRODUKT-7 |

**Rechtliche Hinweise, keine Rechtsberatung (§ 1.5, § 12).** Jeder Punkt ist mit Anwalt oder Steuerberater zu klären:
- **Minderjähriger Inhaber:** Ein selbständiges Erwerbsgeschäft eines Minderjährigen braucht die Ermächtigung der Eltern **und die Genehmigung des Familiengerichts** (§ 112 BGB, [IHK](https://www.ihk.de/schleswig-holstein/starthilfe/existenzgruendung/unternehmensgruendung-minderjaehrige-4647750)). Ein Gericht hat das für einen Online-Handel schon versagt. Stripe verlangt bei unter 18-Jährigen, dass ein Erziehungsberechtigter Inhaber des Kontos wird ([Stripe](https://support.stripe.com/questions/age-requirement-to-create-a-stripe-account)). Wer verkauft (Vater, Cousin ab 18, Anbieter als MoR), ist die erste Frage an den Anwalt.
- **Kleinunternehmer (§ 19 UStG, seit 2025):** Vorjahr ≤ 25.000 €, laufendes Jahr ≤ 100.000 € netto ([IHK München](https://www.ihk-muenchen.de/ratgeber/steuern/umsatzsteuer/kleinunternehmerregelung/)). Digitale Leistungen an EU-Verbraucher außerhalb Deutschlands haben eigene Regeln (OSS/10.000 €). Ein Merchant of Record nimmt das ab.
- **Button-Lösung (§ 312j BGB):** Der Bestellknopf muss „zahlungspflichtig bestellen" o. ä. heißen. Bei Stripe/MoR liegt der Knopf auf deren Seite; das prüfen, nicht annehmen (§ 12 „nie als automatisch annehmen").
- **Widerruf bei digitalen Inhalten (§ 356 Abs. 5 BGB):** Das Widerrufsrecht erlischt nur mit ausdrücklicher Zustimmung, Kenntnis-Bestätigung **und** Bestätigung nach § 312f. Fehlt eins, kann 14 Tage lang widerrufen werden, auch nach der Nutzung.
- **Abo:** Kündigungsknopf auf der Seite (§ 312k BGB). Ein Grund mehr für den Einmalkauf.
- **Neu nötig:** AGB/Nutzungsbedingungen, Widerrufsbelehrung, Datenschutz-Abschnitt Zahlungsdienst (bei `client_reference_id` geht die uid an Stripe), Impressum prüfen.
- **Religiöse Angaben** bleiben ungespeichert (§ 2.5). Ein Kauf eines Quran-Vokabelsatzes könnte als Hinweis auf die Religion gelesen werden (Art. 9 DSGVO). **Vermutung**, gehört zur Anwaltsfrage.

---

## Premium-Fundament: was man jetzt vorbereiten sollte und was bewusst nicht

**Befund zuerst: Die heutige Architektur verbaut Premium nicht.** Die Regeln sind eine Positivliste mit
„alles andere: kein Zugriff" (firestore.rules:~412). Eine neue Sammlung lässt sich jederzeit dazunehmen,
ohne Migration bestehender Daten. Es gibt also **keinen Code, der jetzt gebaut werden muss.** Vorzubereiten
sind Entscheidungen, damit der spätere Bau nicht falsch anfängt.

**Jetzt festhalten (in `plan/monetarisierung/GERUEST.md`, kein Code):**
1. **Die Berechtigung liegt nie in einem Dokument, das das Konto selbst schreiben darf.** Also **nicht**
   in `users/{uid}` (`nutzerFelder()`, firestore.rules:99) und nicht in `settings`: Ein Feld `premium` dort
   in die Positivliste aufzunehmen, hieße, dass sich jeder selbst freischaltet. Stattdessen eine eigene
   Sammlung `berechtigungen/{uid}`:
   ```
   match /berechtigungen/{uid} {
     allow get:    if eigenesKonto(uid);
     allow delete: if eigenesKonto(uid);   // Konto-Löschen muss sie mitnehmen (§ 12, Punkt 12)
     allow create, update: if false;       // nur Konsole / Admin-SDK
   }
   ```
   Form z. B. `{ arten: ["unterstuetzer", "satz_medina1", "lehrer"], quelle: "hand"|"stripe", seit: "JJJJ-MM-TT" }`.
   **Stolperstelle:** Wer nur `write: if false` setzt, kann die Berechtigung beim Konto-Löschen nicht
   entfernen, und das Löschversprechen der Datenschutzerklärung wäre gebrochen (§ 12, Vorfall 24.09.2026).
   Das Löschen der eigenen Berechtigung schadet nur einem selbst.
2. **Schützbar ist nur, was auf dem Server liegt.** Inhalte in Firestore (Kaufsätze, Lehrer-Codes) können
   die Regeln hinter `get(/…/berechtigungen/$(request.auth.uid))` sperren. Alles, was nur im Browser
   entschieden wird (Themen, Statistik, Schalter), kann jeder freischalten, der `app.js` liest. Daraus folgt:
   Premium-Wert gehört in **Inhalt oder Dienst**, nicht in einen Schalter im Browser. Die Anzeige im Browser
   (`hatBerechtigung()`) ist nur Bequemlichkeit, wie heute `istBetreiber()` (app.js:74, „KEIN
   Sicherheitsmerkmal").
3. **Bezahl-Sätze nie über `geteilteLektionen`.** Dort darf jedes bestätigte Konto per `get` lesen
   (firestore.rules:288). Wer den Code weitergibt, verschenkt den Satz.
4. **Die uid ist der Schlüssel des Kaufs.** Wer sich mit E-Mail und später mit Google anmeldet, hat zwei
   Konten, und der Kauf hängt an einem davon. Zu klären vor dem Verkauf: Zusammenführen von Konten (Firebase
   „link credential") oder ein Hinweis beim Kauf.
5. **Namen früh wählen, falls später die Stripe-Erweiterung kommt:** Sie schreibt standardmäßig nach
   `customers/{uid}` und setzt ein Custom Claim `stripeRole`. Wer die Regeln heute an
   `berechtigungen` bindet, kann später beides zulassen
   (`request.auth.token.stripeRole == 'premium' || get(...berechtigungen...)`). Das nur festhalten, nicht bauen.
6. **Das vorhandene Dienstkonto nicht erweitern.** Die GitHub-Action hat nur „Firebase Hosting Admin"
   (`.github/workflows/veroeffentlichen.yml`, Kopf). Ein „Freischalten per Knopf" darüber hieße
   Firestore-Schreibrechte für einen Schlüssel, der in GitHub liegt. Für die ersten Käufe reicht die
   Firebase-Konsole.

**Bewusst NICHT jetzt bauen:** Bezahlschranke oder Preis-Seite in der App, Stripe-Einbindung, Blaze-Umstieg,
Cloud Functions, Custom Claims, `hatBerechtigung()` im Code, AGB/Widerruf-Texte, Kündigungsknopf,
Lizenzschlüssel-Prüfung im Browser. Alles davon ist erst sinnvoll, wenn D1 in `GERUEST.md` („soll überhaupt
Geld fließen") mit Ja beantwortet ist und der Anwalt die Verkäufer-Frage (Minderjähriger) geklärt hat.
Bis dahin wäre jede Zeile toter Code (§ 3.9-Geist) und ein Versprechen, das der Code nicht hält (§ 7.2).

---

## Geprüft ohne Fund
- Serien-Joker: schon kostenlos da und entspricht dem, was Duolingo verkauft. Kein Vorschlag nötig.
- Rundengröße, Hell/Dunkel, Quran-Schrift: aus der 1.8.0-Ausschlussliste inzwischen gebaut, nicht erneut vorgeschlagen.
- Kalender-Erinnerung (`.ics`) deckt die Erinnerungsfunktion ohne Server ab. Push bleibt abgelehnt (PRODUKT-16).
- Lehrer-Modus-Kernablauf (A0) ist mit Code-Teilen und „Lehrer gibt frei" erfüllt. Rollen, Chat und Mitgliederlisten nicht vorgeschlagen (C5, Minderjährige).
- Nutzungsstatistik, Intervall-Zahlen, Grammatik-Feld, Datei-Weitergabe, „Bewegung": nach § 3.5 nicht wieder vorgeschlagen.
- Firestore-Regeln: Die Positivliste mit „kein match = kein Zugriff" lässt eine spätere Berechtigungs-Sammlung ohne Umbau zu. Nichts verbaut.
- PWA statt Store: bleibt richtig für Einnahmen (keine 15–30 % Store-Gebühr, `GERUEST.md` E6). Kein neuer Punkt.
