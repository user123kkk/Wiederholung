# Zyklus 2 – Aufgaben

Erzeugt am 01.10.2026 (ab jetzt von Hand pflegen) aus `befunde/*.md` (acht Prüfer, Stand 3.18.10). **Die Einzelheiten jeder Aufgabe stehen im Befundblock** (`befunde/<Datei>`, Überschrift `#### <Kennung>`): Beleg mit Datei:Zeile, Vorschlag, Abnahme. Diese Liste legt nur Reihenfolge, Modell und Status fest.

Wie gearbeitet wird: [`CODEX-START.md`](CODEX-START.md). Was der Betreiber entscheidet: [`ENTSCHEIDUNGEN.md`](ENTSCHEIDUNGEN.md).

**Status:** `offen` · `in Arbeit` · `erledigt (Version)` · `trifft nicht zu (Grund)` · `zurück (Grund)` · `später (Zn)` (Betreiber hat verschoben – nicht bauen). Die Antworten des Betreibers vom 01.10.2026 („alles wie empfohlen“) stehen in der Spalte „Hinweis“ und in `ENTSCHEIDUNGEN.md`.

**Modell** = Empfehlung für Codex (GPT-6 Luna/Sol/Astra, Denkstufe), siehe `CODEX-START.md` § 2.


## Paket A – Daten sicher (zuerst, vor allem Neuen)

Zuerst die fünf alten Befunde aus `grossplan/AUFGABEN.md`. Arbeitsstand: Zweig `runde15` (Ordner `C:\Users\USER\Wiederholung-r15`, Commit `4462fac`), **nicht** der Patch (`befunde/DATEN.md`, Abschnitt zum Zweig). Übertragen, nicht neu erfinden; Abnahme auf dem aktuellen Stand neu laufen lassen.

| Nr | Kennung | Schwere | Aufgabe | Befund | Modell | Status | Hinweis |
|---|---|---|---|---|---|---|---|
| A1 | G-110 | kritisch | Bestätigter Dialog + Kontowechsel löscht das falsche Konto | `grossplan/AUFGABEN.md`, `befunde/DATEN.md` | Astra mittel | offen | aus Zweig `runde15` übertragen |
| A2 | G-107 | hoch | Alte Auth-Antworten wirken auf das Folgekonto (4 Pfade) | `grossplan/AUFGABEN.md`, `befunde/DATEN.md` | Astra mittel | offen | aus Zweig `runde15` übertragen |
| A3 | G-108 | hoch | Kartenentwurf von Konto A landet in Konto B | `grossplan/AUFGABEN.md`, `befunde/DATEN.md` | Astra mittel | offen | aus Zweig `runde15` übertragen |
| A4 | G-111 | hoch | Registrierungs-Nachtrag ändert Profil des Folgekontos | `grossplan/AUFGABEN.md`, `befunde/DATEN.md` | Astra mittel | offen | aus Zweig `runde15` übertragen |
| A5 | G-109 | mittel | Prüfstand: `t_inventar2` meldet Exit 0 ohne vollständigen Rundgang | `grossplan/AUFGABEN.md`, `befunde/DATEN.md` | Astra mittel | offen | aus Zweig `runde15` übertragen |
| A6 | DATEN-1 | mittel | Ideen-Board – ein Konto kann jede Idee beliebig hochzählen oder fremde auf 0 drehen (G-014-Schutz lässt sich in zwei Schritten umgehen) | `befunde/DATEN.md` | Astra mittel | offen |  |
| A7 | DATEN-3 | mittel | Nach einem abgebrochenen Update startet die App offline nicht mehr – sie bleibt für immer auf „Adrabic startet“ | `befunde/DATEN.md` | Astra mittel | offen |  |
| A8 | DATEN-4 | mittel | Nach „Einwilligung widerrufen“ holt „Sicherung einspielen“ alle Texte ohne Einwilligung zurück in die Cloud | `befunde/DATEN.md` | Astra mittel | offen |  |
| A9 | DATEN-5 | mittel | Funde aus dem Zweig `runde15` stehen nicht in `main`, und ihre Nummern kollidieren (G-118, G-119) | `befunde/DATEN.md` | Sol niedrig | offen |  |
| A10 | DATEN-2 | niedrig | Fehlermeldung „Die App versucht es weiter, sobald die Verbindung steht“ ist bei echten Ablehnungen falsch und widerspricht dem Banner | `befunde/DATEN.md` | Luna niedrig | offen |  |
| A11 | DATEN-6 | niedrig | „Idee einreichen“ hat weder Zeitlimit noch Offline-Sperre – der Knopf kann endlos drehen | `befunde/DATEN.md` | Sol niedrig | offen |  |
| A12 | DATEN-7 | niedrig | Einstellungen gehen als ganzes Objekt in die Cloud – ein Gerät, das offline war, überschreibt die Wahl eines anderen | `befunde/DATEN.md` | Astra mittel | offen |  |
| A13 | DATEN-8 | niedrig | Offline zeigt „Impressum“/„Datenschutz“ die App statt der Seite; online immer die Fassung vom letzten Besuch | `befunde/DATEN.md` | Sol niedrig | offen |  |

## Paket B – Onboarding

| Nr | Kennung | Schwere | Aufgabe | Befund | Modell | Status | Hinweis |
|---|---|---|---|---|---|---|---|
| B1 | EIN-1 | hoch | Der Nachklang („Dein Plan steht. Jetzt deine erste eigene Karte." + Wenn-dann-Satz) erscheint nach der Kontoerstellung nie | `befunde/EIN.md` | Astra mittel | offen |  |
| B2 | EIN-2 | mittel | Probekarte springt beim Antippen doch noch 25 px – wenn „Ich vergesse Wörter schnell wieder" gewählt ist (G-039 nur halb behoben) | `befunde/EIN.md` | Sol niedrig | offen |  |
| B3 | EIN-3 | mittel | Auf dem iPad ändert der Weiter-Knopf Breite und Lage, sobald man etwas wählt (97 bis 246 px statt der gewollten 420 px) | `befunde/EIN.md` | Sol niedrig | offen |  |
| B4 | EIN-4 | mittel | „Plan speichern" → „Ich habe schon ein Konto" → „Neues Konto anlegen" wirft den fertigen Plan weg | `befunde/EIN.md` | Sol niedrig | offen |  |
| B5 | EIN-5 | mittel | Das automatische Scrollen auf dem fertigen Plan lässt sich 3,6 s lang nicht anhalten | `befunde/EIN.md` | Sol niedrig | offen |  |
| B6 | EIN-6 | mittel | Auf kleinen Handys liegt der Hauptknopf auf den meisten Einstiegs-Bildschirmen unter dem Rand – wegen 60 px reserviertem Leerraum darunter | `befunde/EIN.md` | Sol mittel | offen |  |
| B7 | EIN-7 | niedrig | Der Weiter-Knopf springt bei jedem Schritt 26 px zur Seite und blendet ab | `befunde/EIN.md` | Sol niedrig | offen |  |
| B8 | EIN-8 | niedrig | Gast-Start: Ladebild wird ohne Übergang hart durch „Willkommen" ersetzt | `befunde/EIN.md` | Sol niedrig | offen |  |
| B9 | EIN-9 | niedrig | „Dein Plan entsteht …" hakt dieselbe Sache zweimal ab | `befunde/EIN.md` | Sol niedrig | offen | Z15: wie empfohlen |
| B10 | EIN-10 | niedrig | Am Übergang zum Konto wechselt der Rahmen (anderer Zurück-Knopf, neue Zählung „Schritt 1 von 2") | `befunde/EIN.md` | Sol mittel | offen | Z16: nur das Formular direkt aus dem Einstieg |
| B11 | EIN-11 | niedrig | Antworten eines abgebrochenen Einstiegs füllen den nächsten Durchgang vor | `befunde/EIN.md` | Sol niedrig | offen | nur Antworten; Nachklang-Zeitgrenze nicht |
| B12 | EIN-12 | niedrig | Kommentare beschreiben einen Stand, den es nicht mehr gibt; ein Scroll-Zweig ohne Wirkung | `befunde/EIN.md` | Luna niedrig | offen |  |
| B13 | Z18 | niedrig | Am Ende des Einstiegs dieselbe Leiste klein noch einmal als „Dein Stand“ zeigen | `VORBILD-MARHABA.md` § 3 Muster 11, `ENTSCHEIDUNGEN.md` Z18 | Sol mittel | offen | Z18: ja, klein; keine Zahl, keine neue Speicherung |

## Paket C – Verwalten und Fortschritt

| Nr | Kennung | Schwere | Aufgabe | Befund | Modell | Status | Hinweis |
|---|---|---|---|---|---|---|---|
| C1 | G-118 | mittel | Tippen ins Feld „Wort“ scrollt die Seite weg (Ursache in `befunde/VERW.md`, Abschnitt G-118) | `befunde/VERW.md` | Sol mittel | offen | Gerätetest G1 nach dem Fix |
| C2 | FORT-1 | hoch | Die größte Zahl und die Pille belohnen Vergessen und bestrafen gutes Lernen | `befunde/FORT.md` | Sol niedrig | offen | Z2: wie empfohlen |
| C3 | FORT-2 | hoch | Neben der Kartenzahl steht ein Versende-Zeichen aus dem Quran | `befunde/FORT.md` | Sol niedrig | offen | Z3: wie empfohlen |
| C4 | FORT-3 | hoch | Der Bereich oben im Kopf gilt für die Zahlen darunter nicht | `befunde/FORT.md` | Sol niedrig | offen |  |
| C5 | FORT-4 | mittel | Nach einer langen Pause sagt der Tab etwas Falsches oder gar nichts | `befunde/FORT.md` | Sol niedrig | offen | Pausensatz im Logbuch zitieren |
| C6 | FORT-5 | mittel | Große Null im Stoff und falsche Mehrzahl | `befunde/FORT.md` | Luna niedrig | offen |  |
| C7 | FORT-6 | mittel | „sitzt“ heißt drei verschiedene Dinge, und das schwächste steht am größten da | `befunde/FORT.md` | Sol niedrig | offen | Z4: wie empfohlen |
| C8 | FORT-7 | mittel | Das Raster ist kaum zu lesen | `befunde/FORT.md` | Sol mittel | offen |  |
| C9 | FORT-8 | mittel | Auf dem ganzen Tab gibt es keine Handlung | `befunde/FORT.md` | Sol mittel | offen | Z1: Weg b – gehört zum Umbau (C-Umbau), nach den Fehlern |
| C10 | FORT-9 | mittel | Was der Tab sagt, steht zum Teil schon auf Lernen | `befunde/FORT.md` | Sol mittel | offen | Z1: Weg b – gehört zum Umbau (C-Umbau), nach den Fehlern |
| C11 | VERW-1 | mittel | G-021 „Suchpuffer wächst mit der Kartenzahl“ steht als erledigt da, ist aber nie in den Code gekommen | `befunde/VERW.md` | Astra mittel | offen |  |
| C12 | VERW-2 | mittel | Geänderte Karte geht beim Bearbeiten mit Escape oder Wischen still verloren | `befunde/VERW.md` | Sol niedrig | offen |  |
| C13 | VERW-3 | mittel | „Ablegen“ in eine Speicherkarte zeigt kein Ergebnis | `befunde/VERW.md` | Sol niedrig | offen |  |
| C14 | VERW-6 | mittel | Leerer Bereich in Verwalten ist eine kahle Zeile – der gebaute Leerzustand wird fast nie gezeigt | `befunde/VERW.md` | Sol niedrig | offen |  |
| C15 | VERW-7 | mittel | Hinweis im geführten Satz verweist auf einen Knopf „+ Bereich“ oben, den es nicht gibt | `befunde/VERW.md` | Luna niedrig | offen |  |
| C16 | VERW-10 | mittel | Blätter und Dialoge schließen ohne Bewegung – 200 ms Stillstand, dann weg | `befunde/VERW.md` | Sol niedrig | offen |  |
| C17 | FORT-10 | niedrig | Die ältesten Tage fallen aus dem Raster | `befunde/FORT.md` | Sol niedrig | offen |  |
| C18 | FORT-11 | niedrig | Tage, an denen nur Texte gelernt wurden, sind im Raster leer (nur Betreiber-Konto) | `befunde/FORT.md` | Sol niedrig | offen |  |
| C19 | FORT-12 | niedrig | Aus „Karten, die nicht klappen“ führt Bearbeiten weg und nicht zurück; Zähler löschen ohne Rückweg | `befunde/FORT.md` | Sol mittel | offen |  |
| C20 | FORT-13 | niedrig | Auf iPad und Computer sieht der Tab leer aus | `befunde/FORT.md` | Sol mittel | offen |  |
| C21 | FORT-14 | niedrig | Das Aufdecken des Rasters sieht man nicht, das Band kommt spät | `befunde/FORT.md` | Sol niedrig | offen |  |
| C22 | FORT-15 | niedrig | Kleinigkeiten und toter Code rund um den Tab | `befunde/FORT.md` | Sol niedrig | offen | ohne Teil (e) |
| C23 | VERW-4 | niedrig | Verschieben, Löschen mehrerer Karten und Löschen einer Karte ohne Rückmeldung | `befunde/VERW.md` | Sol niedrig | offen |  |
| C24 | VERW-5 | niedrig | Auswahlmodus und Suche überleben den Weg über „Fortschritt“, nicht über „Lernen“ | `befunde/VERW.md` | Sol niedrig | offen |  |
| C25 | VERW-8 | niedrig | Erklärtexte der Speicherkarten-Gruppen stimmen im eigenen Bereich nicht | `befunde/VERW.md` | Luna niedrig | offen |  |
| C26 | VERW-9 | niedrig | Kleinere Uneinheitlichkeiten und Reste | `befunde/VERW.md` | Sol niedrig | offen |  |
| C27 | VERW-11 | niedrig | Im Auswahlmodus fehlt „Alle auswählen“ | `befunde/VERW.md` | Sol niedrig | offen | Z11: wie empfohlen |
| C28 | Z1-Umbau | mittel | Fortschritt-Tab umbauen zu „Was du schon kannst“ (Weg b) | `befunde/FORT.md` § 4 (b) | Astra mittel | offen | erst nach allen FORT-Fehlern; eigener Commit; Wortlaut (Z4) und Aufbau dem Betreiber als Fotos zeigen, bevor veröffentlicht wird |

## Paket D – Bewegung und Flüssigkeit

| Nr | Kennung | Schwere | Aufgabe | Befund | Modell | Status | Hinweis |
|---|---|---|---|---|---|---|---|
| D1 | BEW-1 | hoch | Blätter „fahren" beim Schließen nicht weg – sie frieren 190 ms ein und verschwinden dann hart | `befunde/BEW.md` | Sol niedrig | offen |  |
| D2 | BEW-2 | mittel | Eine Dauerschleife läuft auf jedem Gerät 60-mal pro Sekunde, auch am Handy | `befunde/BEW.md` | Sol niedrig | offen |  |
| D3 | BEW-3 | mittel | „Sicher" hat keinen Lichtring – eine verwaiste Zeile löscht die Regel | `befunde/BEW.md` | Sol niedrig | offen |  |
| D4 | BEW-4 | mittel | Übungs-Chips: jeder Tipp lässt alle Haken neu aufploppen und schiebt die Nachbarn 20 px | `befunde/BEW.md` | Sol niedrig | offen |  |
| D5 | BEW-5 | mittel | Beim Start jeder Runde leuchtet die ganze Bühne als heller Kasten auf, und die Seite schiebt zusätzlich seitlich | `befunde/BEW.md` | Sol niedrig | offen |  |
| D6 | BEW-6 | mittel | Am Rundenende ist „Fertig" 1,3 Sekunden unsichtbar | `befunde/BEW.md` | Sol niedrig | offen |  |
| D7 | BEW-7 | mittel | Lernen und Fortschritt spielen bei jedem Besuch die volle Eintritts-Choreografie | `befunde/BEW.md` | Sol mittel | offen | Z5: wie empfohlen |
| D8 | BEW-8 | mittel | Sanftes Scrollen läuft trotz „Bewegung reduzieren" | `befunde/BEW.md` | Sol niedrig | offen |  |
| D9 | BEW-9 | mittel | Wischen zwischen Reitern: alte Seite fliegt ganz hinaus, die neue ploppt aus 26 px herein | `befunde/BEW.md` | Sol mittel | offen |  |
| D10 | BEW-10 | mittel | Einstieg, Plan: das automatische Mitscrollen lässt sich nicht anhalten | `befunde/BEW.md` | Sol niedrig | offen |  |
| D11 | BEW-11 | niedrig | Meldung („Toast") verschwindet mit einem Schnitt | `befunde/BEW.md` | Sol niedrig | offen |  |
| D12 | BEW-12 | niedrig | Übergänge und Regeln, die nie laufen (totes CSS rund um Bewegung) | `befunde/BEW.md` | Sol niedrig | offen |  |
| D13 | BEW-13 | niedrig | Für Bewegung gibt es Token, aber die Praxis benutzt sie kaum | `befunde/BEW.md` | Sol mittel | offen |  |
| D14 | BEW-14 | niedrig | Einzelne Größen und Abstände am Token-Satz vorbei | `befunde/BEW.md` | Sol niedrig | offen |  |
| D15 | BEW-15 | niedrig | Ladebildschirm: Ausblenden wird 40 ms vor seinem Ende abgeschnitten | `befunde/BEW.md` | Sol niedrig | offen |  |

## Paket E – Lernen, Einstellungen, Konto

| Nr | Kennung | Schwere | Aufgabe | Befund | Modell | Status | Hinweis |
|---|---|---|---|---|---|---|---|
| E1 | EINST-1 | hoch | „Aufzeichnung zurücksetzen“ löscht die Serie, der Dialog verschweigt es | `befunde/EINST.md` | Sol niedrig | offen | Text ehrlich machen (a) jetzt; Zeile behalten |
| E2 | EINST-2 | mittel | Nach „Konto löschen“ trägt das nächste Konto die Kopfzeile „Konto löschen“ | `befunde/EINST.md` | Astra mittel | offen |  |
| E3 | EINST-3 | mittel | „Fehler melden“ ist ohne Mail-Programm eine Sackgasse | `befunde/EINST.md` | Sol niedrig | offen | zweiter Weg: Text zum Kopieren anzeigen |
| E4 | EINST-4 | mittel | „← Zurück“ auf Datenschutz/Impressum lädt die App neu – Einstieg und Formular sind weg | `befunde/EINST.md` | Sol niedrig | offen | Code jetzt; Gerätetest G7 |
| E5 | EINST-5 | mittel | Backup gilt als „heute gesichert“, auch wenn keine Datei ankam | `befunde/EINST.md` | Sol niedrig | offen | Code jetzt; Gerätetest G5 |
| E6 | EINST-6 | mittel | Tägliche Erinnerung – auf Android und in der iPhone-App ungeprüft, drei kleine Fehler | `befunde/EINST.md` | Sol niedrig | offen | Code jetzt; Gerätetest G6 |
| E7 | LERN-1 | mittel | Die Serie reißt ohne Warnung, wenn zwei Tage hintereinander nichts fällig ist | `befunde/LERN.md` | Sol niedrig | offen | Z6: Regel wird geändert, sobald Betreiber Z6b bestätigt (ENTSCHEIDUNGEN); bis dahin nicht bauen |
| E8 | LERN-2 | mittel | Der Meilenstein-Hinweis bleibt für immer stehen und sperrt alle anderen Hinweise | `befunde/LERN.md` | Sol niedrig | offen | Ablauf nach einem Tag jetzt; Verlegen nicht |
| E9 | EINST-7 | niedrig | Lange Wörter ohne Leerzeichen laufen aus der Karte (Ideen-Board, Profilname) | `befunde/EINST.md` | Sol niedrig | offen |  |
| E10 | EINST-8 | niedrig | Leistenfarbe springt beim Start von #111010 auf #0e0e12 | `befunde/EINST.md` | Sol niedrig | offen |  |
| E11 | EINST-9 | niedrig | Nach dem Löschen des Kontos sagt die App nichts | `befunde/EINST.md` | Sol niedrig | offen |  |
| E12 | EINST-10 | niedrig | Neu-Anmelden vor dem Löschen hat kein Zeitlimit und keine Rückmeldung | `befunde/EINST.md` | Sol niedrig | offen |  |
| E13 | EINST-11 | niedrig | Drei Kleinigkeiten auf 320 px | `befunde/EINST.md` | Sol niedrig | offen |  |
| E14 | EINST-12 | niedrig | Der Abschnitt „Hilfe“ enthält keine Hilfe | `befunde/EINST.md` | Sol mittel | offen | Z10: ja, „soll perfekt sein“ – Entwurf (Aufbau + Wortlaut) dem Betreiber zeigen, erst nach seinem Ja einbauen |
| E15 | EINST-13 | niedrig | Der Name lässt sich nach der Anmeldung nicht mehr ändern | `befunde/EINST.md` | Sol niedrig | offen | Z9: V1 Name ändern – ja |
| E16 | EINST-14 | niedrig | Aufräumen im Einstellungs-Code | `befunde/EINST.md` | Sol niedrig | offen |  |
| E17 | EINST-15 | niedrig | Google-Konto löschen am iPhone – Popup startet erst nach der Dialog-Bewegung | `befunde/EINST.md` | Sol niedrig | offen | erst nach Gerätetest G4 |
| E18 | LERN-3 | niedrig | „Trotzdem üben“ wirft einen in den Verwalten-Reiter, „Abbrechen“ lässt einen dort stehen | `befunde/LERN.md` | Sol niedrig | offen |  |
| E19 | LERN-4 | niedrig | „Bester Lauf“ zieht nur am Rundenende nach | `befunde/LERN.md` | Sol niedrig | offen |  |
| E20 | LERN-5 | niedrig | „Merken“ springt zwischen Karten mit und ohne Notiz 68 px zur Seite | `befunde/LERN.md` | Sol niedrig | offen |  |
| E21 | LERN-6 | niedrig | Tastatur in der Runde: Escape tut nichts, Rückgängig hat keine Taste, zwei Kommentare beschreiben altes Verhalten | `befunde/LERN.md` | Sol niedrig | offen |  |
| E22 | LERN-7 | niedrig | Nach „Rückgängig“ steigt die Karte vom Stapel auf, statt von dort zurückzukommen, wohin sie flog | `befunde/LERN.md` | Sol niedrig | offen |  |
| E23 | LERN-8 | niedrig | Rundenende mit Rundenlimit sagt „Geschafft“ und darunter „10 Karten geschafft.“ | `befunde/LERN.md` | Luna niedrig | offen |  |
| E24 | LERN-9 | niedrig | Im Üben deckt ein Tipp irgendwo auf, im Lernen nur die Karte oder der Knopf | `befunde/LERN.md` | Sol niedrig | offen |  |
| E25 | LERN-10 | niedrig | „Für heute durch“ mit vollem Ring und Haken, auch wenn heute gar nichts gelernt wurde | `befunde/LERN.md` | Sol niedrig | offen |  |
| E26 | LERN-11 | niedrig | Nach langer Pause steht nur eine große Zahl da | `befunde/LERN.md` | Sol niedrig | später (Z7) | Z7: wie empfohlen |
| E27 | LERN-12 | niedrig | „Heute auch fällig: Bereich X (3)“ lässt sich nicht antippen | `befunde/LERN.md` | Sol niedrig | offen |  |
| E28 | LERN-13 | niedrig | Nachts begrüßt die App mit „Gute Nacht“ | `befunde/LERN.md` | Luna niedrig | offen |  |
| E29 | LERN-14 | niedrig | Die Flamme steht für die Serie und für „oft vergessen“ | `befunde/LERN.md` | Sol niedrig | offen |  |
| E30 | V2 | niedrig | Passwort ändern (nur E-Mail-Konten) | `befunde/EINST.md` Vorschlagsliste V2 | Sol mittel | offen | Z9: ja |
| E31 | V4 | niedrig | Zuletzt geöffneten Bereich merken (nur Gerät) | `befunde/EINST.md` Vorschlagsliste V4 | Sol niedrig | offen | Z9: ja; neuer localStorage-Schlüssel → Datenschutzerklärung Punkt 7 |
| E32 | V3 | niedrig | Arabische Schrift: Stufe „Sehr groß“ | `befunde/EINST.md` Vorschlagsliste V3 | Sol mittel | offen | Z9: nur bauen, wenn jede Karte/Liste auf 320 px ohne Überlauf bleibt (messen); sonst `trifft nicht zu` |

## Paket F – Aufräumen (Code, Texte, Repo)

| Nr | Kennung | Schwere | Aufgabe | Befund | Modell | Status | Hinweis |
|---|---|---|---|---|---|---|---|
| F1 | CODE-1 | mittel | Datenschutzerklärung sagt „beim Start eine Sache von außen“ – auf Handys und in Safari sind es vier | `befunde/CODE.md` | Sol mittel | offen | Z12: nur Text der Datenschutzerklärung (Weg a) |
| F2 | CODE-2 | mittel | Neun Klick-Zweige ohne Knopf – darunter ein ganzer toter Funktionsweg („Serie fortsetzen“) | `befunde/CODE.md` | Sol niedrig | offen |  |
| F3 | CODE-3 | mittel | Umschalter „alle Bereiche / dieser Bereich“ im Fortschritt ist tot, Rechenwege und Stil liegen noch da | `befunde/CODE.md` | Sol niedrig | offen |  |
| F4 | CODE-4 | mittel | Kommentare beschreiben Regeln, die es nicht mehr gibt (Tageslimit, Zwei-Tipp-Auswahl, startDrill, Link-Teilen) | `befunde/CODE.md` | Luna niedrig | offen |  |
| F5 | CODE-5 | mittel | CLAUDE.md und PLAN.md widersprechen STAND.md – vier alte „AKTUELL“-Aufträge stehen vor den Dauerregeln | `befunde/CODE.md` | Sol mittel | offen | Z14: wie empfohlen |
| F6 | CODE-6 | niedrig | „Zuletzt benutzte Speicherkarte vorschlagen“ (3.5.0) ist seit 3.17.10 still verloren | `befunde/CODE.md` | Sol niedrig | offen |  |
| F7 | CODE-7 | niedrig | Texte beim Teilen und in Listen stimmen bei genau einer Lektion oder Karte nicht | `befunde/CODE.md` | Luna niedrig | offen |  |
| F8 | CODE-8 | niedrig | Alter Produktname „Lernkarten“ und Wortmischung Backup / Sichern / Sicherung | `befunde/CODE.md` | Sol niedrig | offen | „Lernkarten“ → Adrabic jetzt; Wort „Sicherung“ wartet auf Z13 |
| F9 | CODE-9 | niedrig | Datenschutzerklärung benutzt andere Namen als die App und widerspricht sich in zwei Sätzen | `befunde/CODE.md` | Sol niedrig | offen | Z12: mit CODE-1 in einem Zug |
| F10 | CODE-10 | niedrig | Bildschirmwechsel räumt an fünf Stellen von Hand auf – jede Liste ist anders | `befunde/CODE.md` | Sol mittel | offen |  |
| F11 | CODE-11 | niedrig | Tote Reste der alten Stufen-Auswahl beim Üben und weitere stillgelegte Zweige | `befunde/CODE.md` | Sol niedrig | offen |  |
| F12 | CODE-12 | niedrig | Rund 30 CSS-Klassen, die app.js und die HTML-Seiten nie erzeugen | `befunde/CODE.md` | Sol mittel | offen |  |
| F13 | CODE-13 | niedrig | Veraltete und doppelte Dateien im Repo – Vorschlag für eine aufgeräumte Struktur | `befunde/CODE.md` | Sol mittel | offen | Z14: wie empfohlen |

## Doppelt gemeldet (einmal beheben)

- BEW-1 und VERW-10: Blätter schließen ohne Bewegung. Behoben wird in D (BEW-1); VERW-10 danach auf `erledigt` setzen.
- BEW-10 und EIN-5: Mitscrollen im Plan lässt sich nicht anhalten. Behoben wird in B (EIN-5).
- CODE-3 und FORT-15: toter Umschalter im Fortschritt. Behoben wird in F (CODE-3).


Zahl der neuen Funde: 103 (hoch 6, mittel 42, niedrig 55). Dazu 5 alte (G-107–G-111) und G-118.
