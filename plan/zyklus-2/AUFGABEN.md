# Zyklus 2 – Aufgaben

Erzeugt am 01.10.2026 (ab jetzt von Hand pflegen) aus `befunde/*.md` (acht Prüfer, Stand 3.18.10). **Die Einzelheiten jeder Aufgabe stehen im Befundblock** (`befunde/<Datei>`, Überschrift `#### <Kennung>`): Beleg mit Datei:Zeile, Vorschlag, Abnahme. Diese Liste legt nur Reihenfolge, Modell und Status fest.

Wie gearbeitet wird: [`CODEX-START.md`](CODEX-START.md). Was der Betreiber entscheidet: [`ENTSCHEIDUNGEN.md`](ENTSCHEIDUNGEN.md).

**Status:** `offen` · `in Arbeit` · `erledigt (Version)` · `trifft nicht zu (Grund)` · `zurück (Grund)` · `später (Zn)` (Betreiber hat verschoben – nicht bauen). Die Antworten des Betreibers vom 01.10.2026 („alles wie empfohlen“) stehen in der Spalte „Hinweis“ und in `ENTSCHEIDUNGEN.md`.

**Modell** = Empfehlung für Codex (GPT-6 Luna / GPT-6.1 Sol / GPT-6 Astra,
Denkstufe), siehe `CODEX-START.md` § 2. Seit 01.10.2026 steht „Sol“ bei
offenen oder fortzusetzenden Aufgaben für GPT-6.1 Sol. Erledigte Einträge
und historische Prüfberichte behalten ihre damalige Bedeutung.


## Paket A – Daten sicher (zuerst, vor allem Neuen)

Zuerst die fünf alten Befunde aus `grossplan/AUFGABEN.md`. Arbeitsstand: Zweig `runde15` (Ordner `C:\Users\USER\Wiederholung-r15`, Commit `4462fac`), **nicht** der Patch (`befunde/DATEN.md`, Abschnitt zum Zweig). Übertragen, nicht neu erfinden; Abnahme auf dem aktuellen Stand neu laufen lassen.

| Nr | Kennung | Schwere | Aufgabe | Befund | Modell | Status | Hinweis |
|---|---|---|---|---|---|---|---|
| A1 | G-110 | kritisch | Bestätigter Dialog + Kontowechsel löscht das falsche Konto | `grossplan/AUFGABEN.md`, `befunde/DATEN.md` | Astra mittel | erledigt (3.18.11) | aus 4462fac übertragen; Dialog-/SDK-Wechsel-Proben grün |
| A2 | G-107 | hoch | Alte Auth-Antworten wirken auf das Folgekonto (4 Pfade) | `grossplan/AUFGABEN.md`, `befunde/DATEN.md` | Astra mittel | erledigt (3.18.11) | aus 4462fac übertragen; normale und verspätete Auth-Fortsetzungen grün |
| A3 | G-108 | hoch | Kartenentwurf von Konto A landet in Konto B | `grossplan/AUFGABEN.md`, `befunde/DATEN.md` | Astra mittel | erledigt (3.18.11) | aus 4462fac übertragen; private Entwürfe/Selektion nach Wechsel leer |
| A4 | G-111 | hoch | Registrierungs-Nachtrag ändert Profil des Folgekontos | `grossplan/AUFGABEN.md`, `befunde/DATEN.md` | Astra mittel | erledigt (3.18.11) | aus 4462fac übertragen; fremder Nachtrag, A→B→A und Neuversuch grün |
| A5 | G-109 | mittel | Prüfstand: `t_inventar2` meldet Exit 0 ohne vollständigen Rundgang | `grossplan/AUFGABEN.md`, `befunde/DATEN.md` | Astra mittel | erledigt (3.18.11) | vollständiger Rundgang und feste Gegenprobe c4b1c30 grün; Wrapper-Hash aus Zweig übernommen |
| A6 | DATEN-1 | mittel | Ideen-Board – ein Konto kann jede Idee beliebig hochzählen oder fremde auf 0 drehen (G-014-Schutz lässt sich in zwei Schritten umgehen) | `befunde/DATEN.md` | Astra mittel | erledigt (3.18.11) | 210/210 Regeln; echte SDK-Kontodatenlöschung zieht eigene Stimmen atomar ab; Regeln vor späterem Hosting |
| A7 | DATEN-3 | mittel | Nach einem abgebrochenen Update startet die App offline nicht mehr – sie bleibt für immer auf „Adrabic startet“ | `befunde/DATEN.md` | Astra mittel | erledigt (3.18.11) | Fortsetzung ausdrücklich beauftragt; echter Worker: Normal-/Abbruch-Update, Offline-Start unter / und index.html sowie gleiche HTML-Version grün; feste Gegenprobe c4b1c30 |
| A8 | DATEN-4 | mittel | Nach „Einwilligung widerrufen“ holt „Sicherung einspielen“ alle Texte ohne Einwilligung zurück in die Cloud | `befunde/DATEN.md` | Astra mittel | erledigt (3.18.11) | Widerruf, Abbruch, Zustimmung, normales Konto und geteilter Satz grün; Gegenprobe c4b1c30 |
| A9 | DATEN-5 | mittel | Funde aus dem Zweig `runde15` stehen nicht in `main`, und ihre Nummern kollidieren (G-118, G-119) | `befunde/DATEN.md` | Sol niedrig | erledigt (3.18.11) | 15 Original-Restzeilen mit R15-Präfix in RUNDE15-REST.md gesichert, aktueller Code nachgelesen |
| A10 | DATEN-2 | niedrig | Fehlermeldung „Die App versucht es weiter, sobald die Verbindung steht“ ist bei echten Ablehnungen falsch und widerspricht dem Banner | `befunde/DATEN.md` | Luna niedrig | erledigt (3.18.11) | Dialog/Banner für erneuerten Ausweis und dauerhafte Ablehnung gleich; feste Gegenprobe grün |
| A11 | DATEN-6 | niedrig | „Idee einreichen“ hat weder Zeitlimit noch Offline-Sperre – der Knopf kann endlos drehen | `befunde/DATEN.md` | Sol niedrig | erledigt (3.18.11) | Offline-Sperre und echte 12 s geprüft, Entwurf erhalten; 24 Formular-Konfigurationen grün |
| A12 | DATEN-7 | niedrig | Einstellungen gehen als ganzes Objekt in die Cloud – ein Gerät, das offline war, überschreibt die Wahl eines anderen | `befunde/DATEN.md` | Astra mittel | erledigt (3.18.11) | echtes SDK/zwei Offline-Caches, Altfeld-Transaktion und Kontowechsel grün |
| A13 | DATEN-8 | niedrig | Offline zeigt „Impressum“/„Datenschutz“ die App statt der Seite; online immer die Fassung vom letzten Besuch | `befunde/DATEN.md` | Sol niedrig | erledigt (3.18.11) | beide Rechtsseiten vor erstem Besuch offline lesbar, erste Online-Antwort frisch; kein App-Fallback für fremde Pfade; feste Gegenprobe c4b1c30 |
| A14 | DATEN-9 | hoch | Altes Rückgängig überschreibt neuere fremde Kartenbewertung | `befunde/DATEN.md`, `KARTEN-KONFLIKTE-2026-10-09.md` | Astra mittel | in Arbeit | Gebaut und gezielt geprüft, Entwurf 3.18.30 erhalten. Feste Quelle 7142b93; 16 SDK-Fälle grün. Große Gesamtabnahme auf Betreiberwunsch später gesammelt; kein Paketabschluss/Deploy |
| A15 | DATEN-10 | hoch | Offline-Nachholen überschreibt spätere Online-Bewertung derselben Karte | `befunde/DATEN.md`, `KARTEN-KONFLIKTE-2026-10-09.md` | Astra mittel | in Arbeit | Ausgangskennung/Konfliktkopien gebaut, Entwurf 3.18.30 erhalten; 16 SDK-Fälle grün. Fremde Löschung, Offline-/Neustart-Erhalt und alte Clients gezielt geprüft. Große Abnahme später gesammelt |
| A16 | DATEN-11 | mittel | Abgelehnte Tagesantwort verschwindet nach Neustart trotz bestätigter Kartenbewertung | `befunde/DATEN.md`, `VERLAUF-NEUSTART-2026-10-09.md` | Astra mittel | in Arbeit | Gebaut und gezielt geprüft, Entwurf 3.18.30. 17 A16-SDK-Fälle, 16 A14/A15-Regressionsfälle, 238 Regeln und betroffene Bestands-/Hinweisprüfungen grün. Feste Gegenprobe 591d03e erhalten. Keine neue Lernregel; große Abnahme/Paketabschluss später gesammelt |

## Paket B – Onboarding

| Nr | Kennung | Schwere | Aufgabe | Befund | Modell | Status | Hinweis |
|---|---|---|---|---|---|---|---|
| B1 | EIN-1 | hoch | Der Nachklang („Dein Plan steht. Jetzt deine erste eigene Karte." + Wenn-dann-Satz) erscheint nach der Kontoerstellung nie | `befunde/EIN.md` | Astra mittel | erledigt (3.18.12) | Neu-/Bestandskonto und erste Karte grün; Paketabschluss grün |
| B2 | EIN-2 | mittel | Probekarte springt beim Antippen doch noch 25 px – wenn „Ich vergesse Wörter schnell wieder" gewählt ist (G-039 nur halb behoben) | `befunde/EIN.md` | Sol niedrig | erledigt (3.18.12) | Karte vor/nach gleich auf 320/360/390/820; Umfeld und Pflichtregressionen grün |
| B3 | EIN-3 | mittel | Auf dem iPad ändert der Weiter-Knopf Breite und Lage, sobald man etwas wählt (97 bis 246 px statt der gewollten 420 px) | `befunde/EIN.md` | Sol niedrig | erledigt (3.18.12) | iPad hoch/quer 420 px stabil vor/nach Wahl; Umfeld und Pflichtregressionen grün |
| B4 | EIN-4 | mittel | „Plan speichern" → „Ich habe schon ein Konto" → „Neues Konto anlegen" wirft den fertigen Plan weg | `befunde/EIN.md` | Sol niedrig | erledigt (3.18.12) | Formular/Rückweg mit denselben Antworten grün; Umfeld und Pflichtregressionen grün |
| B5 | EIN-5 | mittel | Das automatische Scrollen auf dem fertigen Plan lässt sich 3,6 s lang nicht anhalten | `befunde/EIN.md` | Sol niedrig | erledigt (3.18.12) | wheel/touchstart/keydown, Normalfahrt, Rückweg grün; Umfeld und Pflichtregressionen grün |
| B6 | EIN-6 | mittel | Auf kleinen Handys liegt der Hauptknopf auf den meisten Einstiegs-Bildschirmen unter dem Rand – wegen 60 px reserviertem Leerraum darunter | `befunde/EIN.md` | Sol mittel | erledigt (3.18.12) | Fortsetzung: 375-Runde Unterkante 663,297 <= 667; 390-Hürden scrollHeight 844; feste Alt-Gegenprobe rot; Paketabschluss grün |
| B7 | EIN-7 | niedrig | Der Weiter-Knopf springt bei jedem Schritt 26 px zur Seite und blendet ab | `befunde/EIN.md` | Sol niedrig | erledigt (3.18.12) | Bildmessung, 192 angrenzende Zustände und Pflichtregressionen grün; Paketabschluss grün |
| B8 | EIN-8 | niedrig | Gast-Start: Ladebild wird ohne Übergang hart durch „Willkommen" ersetzt | `befunde/EIN.md` | Sol niedrig | erledigt (3.18.12) | Boot-Ausblendung, Einstieg, Startbilder, Umfeld und Pflichtregressionen grün; Paketabschluss grün |
| B9 | EIN-9 | niedrig | „Dein Plan entsteht …" hakt dieselbe Sache zweimal ab | `befunde/EIN.md` | Sol niedrig | erledigt (3.18.12) | Z15: Liste ohne Doppelung, bisherige 6720 ms erhalten; Umfeld und Pflichtregressionen grün |
| B10 | EIN-10 | niedrig | Am Übergang zum Konto wechselt der Rahmen (anderer Zurück-Knopf, neue Zählung „Schritt 1 von 2") | `befunde/EIN.md` | Sol mittel | erledigt (3.18.12) | Z16: nur direktes Formular; 12 Rahmen-/Fehler-Konfigurationen, Umfeld und Pflichtregressionen grün |
| B11 | EIN-11 | niedrig | Antworten eines abgebrochenen Einstiegs füllen den nächsten Durchgang vor | `befunde/EIN.md` | Sol niedrig | erledigt (3.18.12) | nur Antworten beim frischen Start gelöscht; Neuladen-Abnahme, Umfeld und Pflichtregressionen grün |
| B12 | EIN-12 | niedrig | Kommentare beschreiben einen Stand, den es nicht mehr gibt; ein Scroll-Zweig ohne Wirkung | `befunde/EIN.md` | Luna niedrig | erledigt (3.18.12) | Kommentare/Dauer korrigiert; Textabnahme, Scrollregression, Umfeld und Pflichtregressionen grün |
| B13 | Z18 | niedrig | Am Ende des Einstiegs dieselbe Leiste klein noch einmal als „Dein Stand“ zeigen | `VORBILD-MARHABA.md` § 3 Muster 11, `ENTSCHEIDUNGEN.md` Z18 | Sol mittel | erledigt (3.18.12) | Z18: klein, Anfangsstand neu, keine Zahl/neue Speicherung; 12 Konfigurationen, Umfeld und Pflichtregressionen grün |

## Paket C – Verwalten und Fortschritt

| Nr | Kennung | Schwere | Aufgabe | Befund | Modell | Status | Hinweis |
|---|---|---|---|---|---|---|---|
| C1 | G-118 | mittel | Tippen ins Feld „Wort“ scrollt die Seite weg (Ursache in `befunde/VERW.md`, Abschnitt G-118) | `befunde/VERW.md` | Sol mittel | erledigt (3.18.13) | ausdrücklich wiederaufgenommen; 32 Zustände und Randfälle grün, verbundenes Wortfeld auch bei Echo/Fehler/Dialogabbruch, Fokus ohne Scrollen, Scrollen nur im Blatt; Gegenprobe b60abf4; berührte Regression und Runde 13/13 grün; Gerätetest G1 bleibt offen; Paketabschluss grün |
| C2 | FORT-1 | hoch | Die größte Zahl und die Pille belohnen Vergessen und bestrafen gutes Lernen | `befunde/FORT.md` | Sol niedrig | erledigt (3.18.13) | Z2: wie empfohlen; Gegenprobe b60abf4 rot, 12 angrenzende Zustände und Wochenkopf/Fortschritt/Sprung/Kontrast/a11y grün; Paketabschluss grün |
| C3 | FORT-2 | hoch | Neben der Kartenzahl steht ein Versende-Zeichen aus dem Quran | `befunde/FORT.md` | Sol niedrig | erledigt (3.18.13) | Z3: wie empfohlen; Zierziffer und CSS entfernt; Gegenprobe rot, 16 Zustände sowie Fortschritt/Sprung/Kontrast/a11y grün; Paketabschluss grün |
| C4 | FORT-3 | hoch | Der Bereich oben im Kopf gilt für die Zahlen darunter nicht | `befunde/FORT.md` | Sol niedrig | erledigt (3.18.13) | Variante A; Gegenprobe rot, 16 Zustände/Bereichwechsel sowie Fortschritt/Sprung/Kontrast/a11y grün; Paketabschluss grün |
| C5 | FORT-4 | mittel | Nach einer langen Pause sagt der Tab etwas Falsches oder gar nichts | `befunde/FORT.md` | Sol niedrig | erledigt (3.18.13) | Pausensatz im Logbuch; Gegenprobe rot, 16 Zustände, Wochenkopf/Fortschritt/Sprung/Kontrast/a11y und Runde 13/13 grün; Paketabschluss grün |
| C6 | FORT-5 | mittel | Große Null im Stoff und falsche Mehrzahl | `befunde/FORT.md` | Luna niedrig | erledigt (3.18.13) | Gegenprobe rot; 16 Zustände neue 1/40 und einmal Nicht, C5-Integration, Fortschritt/Sprung/Kontrast/a11y grün; Paketabschluss grün |
| C7 | FORT-6 | mittel | „sitzt“ heißt drei verschiedene Dinge, und das schwächste steht am größten da | `befunde/FORT.md` | Sol niedrig | erledigt (3.18.13) | Z4: wie empfohlen; Wörter und Stufe-1-Kommentar, keine Regeländerung; 16 Zustände inkl. geführt/Meilenstein, Lernen-Start/Fortschritt/Sprung/Kontrast/a11y grün |
| C8 | FORT-7 | mittel | Das Raster ist kaum zu lesen | `befunde/FORT.md` | Sol mittel | erledigt (3.18.13) | Gegenprobe rot; Raster volle Breite, Kontrast hell 5,42/dunkel 5,17; 16 Zustände leer/4/12 Wochen, Fortschritt/Sprung/Kontrast/a11y grün |
| C9 | FORT-8 | mittel | Auf dem ganzen Tab gibt es keine Handlung | `befunde/FORT.md` | Sol mittel | offen | Z1: Weg b – gehört zum Umbau (C-Umbau), nach den Fehlern |
| C10 | FORT-9 | mittel | Was der Tab sagt, steht zum Teil schon auf Lernen | `befunde/FORT.md` | Sol mittel | offen | Z1: Weg b – gehört zum Umbau (C-Umbau), nach den Fehlern |
| C11 | VERW-1 | mittel | G-021 „Suchpuffer wächst mit der Kartenzahl“ steht als erledigt da, ist aber nie in den Code gekommen | `befunde/VERW.md` | Astra mittel | erledigt (3.18.13) | Gegenprobe 72.026, Fix zweite Suche 4.229 normalize-Aufrufe; Verwalten/Sprung/Kontrast/a11y grün; historische Meldung sichtbar korrigiert |
| C12 | VERW-2 | mittel | Geänderte Karte geht beim Bearbeiten mit Escape oder Wischen still verloren | `befunde/VERW.md` | Sol niedrig | erledigt (3.18.13) | Gegenprobe rot; 12 Zustände Escape/CDP-Wischen, unverändert/geändert, Stand und direkte Abbrechen-Handlung grün; Kartenblatt/Snapshot/Sprung/Kontrast/a11y grün |
| C13 | VERW-3 | mittel | „Ablegen“ in eine Speicherkarte zeigt kein Ergebnis | `befunde/VERW.md` | Sol niedrig | erledigt (3.18.13) | Gegenprobe rot; 12 Zustände Ziel offen/im Bild, Ansage, War schon drin, zwei Pfeiltasten mit Doppelanzeige grün; Verwalten/Sprung/Kontrast/a11y grün |
| C14 | VERW-6 | mittel | Leerer Bereich in Verwalten ist eine kahle Zeile – der gebaute Leerzustand wird fast nie gezeigt | `befunde/VERW.md` | Sol niedrig | erledigt (3.18.13) | Bereichswechsel leert Suche; Leerzustand in 16 Konfigurationen grün |
| C15 | VERW-7 | mittel | Hinweis im geführten Satz verweist auf einen Knopf „+ Bereich“ oben, den es nicht gibt | `befunde/VERW.md` | Luna niedrig | erledigt (3.18.13) | zwei falsche Knopfhinweise ersetzt; feste Text-Gegenprobe geprüft |
| C16 | VERW-10 | mittel | Blätter und Dialoge schließen ohne Bewegung – 200 ms Stillstand, dann weg | `befunde/VERW.md` | Sol niedrig | erledigt (lokal; Paketabschluss D offen) | D1 behebt Dopplung; berechneter Austritt und Pflichtregression grün |
| C17 | FORT-10 | niedrig | Die ältesten Tage fallen aus dem Raster | `befunde/FORT.md` | Sol niedrig | erledigt (3.18.13) | 84 Kalenderfälle und 16 weitere Zustände grün, ältester Tag erhalten |
| C18 | FORT-11 | niedrig | Tage, an denen nur Texte gelernt wurden, sind im Raster leer (nur Betreiber-Konto) | `befunde/FORT.md` | Sol niedrig | zurück (nach Probelauf 29.10.) | Texte unverändert |
| C19 | FORT-12 | niedrig | Aus „Karten, die nicht klappen“ führt Bearbeiten weg und nicht zurück; Zähler löschen ohne Rückweg | `befunde/FORT.md` | Sol mittel | erledigt (3.18.13) | Rückweg und kontogebundenes Undo; Entwurf auch bei Escape/Abbruch/Neuzeichnen erhalten; 16 Zustände grün |
| C20 | FORT-13 | niedrig | Auf iPad und Computer sieht der Tab leer aus | `befunde/FORT.md` | Sol mittel | erledigt (3.18.13) | vorhandene Details ab 720 px offen; 16 Zustände grün |
| C21 | FORT-14 | niedrig | Das Aufdecken des Rasters sieht man nicht, das Band kommt spät | `befunde/FORT.md` | Sol niedrig | erledigt (3.18.13) | tatsächliche Raster-/Band-/Balkenenden in 16 Zuständen grün |
| C22 | FORT-15 | niedrig | Kleinigkeiten und toter Code rund um den Tab | `befunde/FORT.md` | Sol niedrig | zurück (Teil a gehört F3; b/c/d abgenommen 3.18.13) | ohne Teil (e) |
| C23 | VERW-4 | niedrig | Verschieben, Löschen mehrerer Karten und Löschen einer Karte ohne Rückmeldung | `befunde/VERW.md` | Sol niedrig | erledigt (3.18.13) | Verschieben und Einzel-/Mehrfachlöschen mit Rückmeldung; 16 Zustände grün |
| C24 | VERW-5 | niedrig | Auswahlmodus und Suche überleben den Weg über „Fortschritt“, nicht über „Lernen“ | `befunde/VERW.md` | Sol niedrig | erledigt (3.18.13) | Suche und Auswahl über Lernen/Fortschritt gleich zurückgesetzt; 16 Zustände grün |
| C25 | VERW-8 | niedrig | Erklärtexte der Speicherkarten-Gruppen stimmen im eigenen Bereich nicht | `befunde/VERW.md` | Luna niedrig | erledigt (3.18.13) | Hinweise nur im geführten Bereich; 16 Zustände grün |
| C26 | VERW-9 | niedrig | Kleinere Uneinheitlichkeiten und Reste | `befunde/VERW.md` | Sol niedrig | erledigt (3.18.13) | gültiges letztes Ziel, Detailwege, gelöschte Karte/erhaltener Entwurf; 16 Zustände grün |
| C27 | VERW-11 | niedrig | Im Auswahlmodus fehlt „Alle auswählen“ | `befunde/VERW.md` | Sol niedrig | erledigt (3.18.13) | Z11: sichtbare Seite, Keine, Fremd-/Schloss-/Leertreffer und 20-Karten-Löschbestätigung in 16 Zuständen grün; Paketabschluss grün |
| C28 | Z1-Umbau | mittel | Fortschritt-Tab umbauen zu „Was du schon kannst“ (Weg b) | `befunde/FORT.md` § 4 (b) | Astra mittel | offen | erst nach allen FORT-Fehlern; eigener Commit; Wortlaut (Z4) und Aufbau dem Betreiber als Fotos zeigen, bevor veröffentlicht wird |

## Paket D – Bewegung und Flüssigkeit

| Nr | Kennung | Schwere | Aufgabe | Befund | Modell | Status | Hinweis |
|---|---|---|---|---|---|---|---|
| D1 | BEW-1 | hoch | Blätter „fahren" beim Schließen nicht weg – sie frieren 190 ms ein und verschwinden dann hart | `befunde/BEW.md` | Sol niedrig | erledigt (3.18.14) | Gegenprobe 50d15ce rot; 32 Zustände × 4 Schließwege grün; Dialogtimer/Kartenblatt/Kontowechsel/Sprung/Kontrast/a11y grün |
| D2 | BEW-2 | mittel | Eine Dauerschleife läuft auf jedem Gerät 60-mal pro Sekunde, auch am Handy | `befunde/BEW.md` | Sol niedrig | erledigt (3.18.14) | Altstand 61/s, Fix Leerlauf 0; Maus-Randscrollen und Abbruch grün; Sprung/Kontrast/a11y grün |
| D3 | BEW-3 | mittel | „Sicher" hat keinen Lichtring – eine verwaiste Zeile löscht die Regel | `befunde/BEW.md` | Sol niedrig | erledigt (3.18.14) | Altstand rot; Strukturprüfung/CSSOM/24 Zustände und Ringfoto grün; Pflichtregression und Runde 13/13 grün |
| D4 | BEW-4 | mittel | Übungs-Chips: jeder Tipp lässt alle Haken neu aufploppen und schiebt die Nachbarn 20 px | `befunde/BEW.md` | Sol niedrig | erledigt (3.18.14) | Altstand Chip-Sprung rot; 24 Zustände stabil; Üben/Sprung/Kontrast/a11y grün |
| D5 | BEW-5 | mittel | Beim Start jeder Runde leuchtet die ganze Bühne als heller Kasten auf, und die Seite schiebt zusätzlich seitlich | `befunde/BEW.md` | Sol niedrig | erledigt (3.18.14) | Altstand rot; 24 Zustände mit Runde/Üben/Durchsicht grün; Kontrast/a11y und Runde 13/13 grün |
| D6 | BEW-6 | mittel | Am Rundenende ist „Fertig" 1,3 Sekunden unsichtbar | `befunde/BEW.md` | Sol niedrig | erledigt (3.18.14) | Altstand Deckkraft 0; 24 Zustände ≥0,9 nach 400 ms; Flüssig-Ende/Kontrast/a11y und Runde 13/13 grün |
| D7 | BEW-7 | mittel | Lernen und Fortschritt spielen bei jedem Besuch die volle Eintritts-Choreografie | `befunde/BEW.md` | Sol mittel | erledigt (3.18.14) | Z5 umgesetzt; Altstand doppelte Feier rot; 24 Zustände ≤1200/300 ms grün; Lernen/Fortschritt/Kontrast/a11y und Runde 13/13 grün |
| D8 | BEW-8 | mittel | Sanftes Scrollen läuft trotz „Bewegung reduzieren" | `befunde/BEW.md` | Sol niedrig | erledigt (3.18.14) | vier Scrollwege berücksichtigen reduzierte Bewegung; 24 Zustände und Runde 13/13 grün |
| D9 | BEW-9 | mittel | Wischen zwischen Reitern: alte Seite fliegt ganz hinaus, die neue ploppt aus 26 px herein | `befunde/BEW.md` | Sol mittel | erledigt (3.18.14) | Altstand 26 px/0,6 rot; 24 Zustände mit kurzen/weiten Touchzügen, Rand und Abbruch grün; Pflichtregression grün; Gerätegefühl offen |
| D10 | BEW-10 | mittel | Einstieg, Plan: das automatische Mitscrollen lässt sich nicht anhalten | `befunde/BEW.md` | Sol niedrig | trifft nicht zu (bereits B5/3.18.12) | Abbruch-Listener und RAF-Abbau nachgelesen; B5 und sämtliche t_einstieg*.js erneut grün |
| D11 | BEW-11 | niedrig | Meldung („Toast") verschwindet mit einem Schnitt | `befunde/BEW.md` | Sol niedrig | erledigt (3.18.14) | Altstand ohne Austrittsbilder rot; zweiter Fix 160 ms/≥5 Bilder, 24 Zustände und Timer-/Blatt-/Pflichtregression grün |
| D12 | BEW-12 | niedrig | Übergänge und Regeln, die nie laufen (totes CSS rund um Bewegung) | `befunde/BEW.md` | Sol niedrig | erledigt (3.18.18; Abnahme mit Software-Raster und Kontrolle, Logbuch 06.10.) | DOM gleich, Rasterkacheln verschieden; isolierter Verlauf rasterabhängig; End-Animationsebenen freigeben/wieder halten 0→98→0 Pixel; Emulationsskala verworfen; Mindestkachelhöhe 448 weiterhin rot: 29.323 Pixel, Breite 224 statt 800; alter 8×4-Korallfehler lokalisiert, keine identische verschobene Quelle gefunden; Konto-Löschen 70.880 Pixel bis 7 Kanalstufen, nicht vollständig durch ±1-Verlauf erklärt; Gesamtfoto-Abnahme fehlt, alle Belege erhalten, D-URSACHEN-2026-10-03.md |
| D13 | BEW-13 | niedrig | Für Bewegung gibt es Token, aber die Praxis benutzt sie kaum | `befunde/BEW.md` | Sol mittel | zurück (Foto-Prüfaufbau ungeklärt) | Gegenprobe 50d15ce: 111 Rohwerte; Entwurf 15 Rohwerte/24 Zustände grün; wartet auf isolierte D12-Aufnahme-Ursache und gesamten Fotovergleich; Entwurf erhalten, nicht im Produkt |
| D14 | BEW-14 | niedrig | Einzelne Größen und Abstände am Token-Satz vorbei | `befunde/BEW.md` | Sol niedrig | zurück (Befund nennt geschützten Text-Probelauf) | als Rechtsseiten bezeichnete CSS-Zeilen gehören zum Textlernen; bis 29.10. unverändert |
| D15 | BEW-15 | niedrig | Ladebildschirm: Ausblenden wird 40 ms vor seinem Ende abgeschnitten | `befunde/BEW.md` | Sol niedrig | zurück (kalter Grafikaufbau; Startabnahme offen) | zwei Produktversuche erhalten; ursprüngliche LI-/view-Zuordnung unbestätigt; 91,043-ms-Flush enthält 80,905 ms Shaderkompilierung; neue feste Nav-Picture: Block 19–25 mit drawDRRect 23 kausal isoliert, Rahmenbefehl 26 nicht notwendig; frühere --kante:none-Probe entfernt alle Schatten, Interpretation korrigiert; SVG-Randpfad nur als isolierte Diagnose, 325 Pixel bis 6 Stufen rot und abgelehnt; Deckungsprodukt aus Quelle/SKP belegt, kein Blur und Alpha exakt gleich; direkte GPU-Deckung/Parameter und pixelgleicher anderer Zeichenweg fehlen, echte kalte/Geräte-Abnahme offen; D15-DECKUNG-2026-10-03.md; Quellwege geprüft, kein belegter pixelgleicher günstiger Ersatz; §6 angehalten, keine Blindprobe; D15-ZEICHENWEG-2026-10-03.md; CDP-/ANGLE-Erfassbarkeit geprüft, zusätzliche Capture-fähige Umgebung fehlt; D15-ERFASSBARKEIT-2026-10-03.md; Capture vorbereitet, Caps-/Offscreen-Sperren belegt; D15-CAPTURE-MESSWEG-2026-10-03.md; 04.10. kritisch geprüft: Zielshader nur 21–22 Prozent der späten Kompilierzeit, 72 ms Bildlücke auch ohne alle Nav-/Listen-Schatten, Capture-Build nicht begründet und nicht begonnen; nächste Messfrage erstes Zeichnen der Ansicht ohne laufende Deckkraft-Bewegung; D15-CAPTURE-KRITIK-2026-10-04.md |

## Paket E – Lernen, Einstellungen, Konto

| Nr | Kennung | Schwere | Aufgabe | Befund | Modell | Status | Hinweis |
|---|---|---|---|---|---|---|---|
| E1 | EINST-1 | hoch | „Aufzeichnung zurücksetzen“ löscht die Serie, der Dialog verschweigt es | `befunde/EINST.md` | Sol niedrig | erledigt (3.18.15) | Serie samt Zahl genannt; zwölf Zustände/Abbruch grün; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E2 | EINST-2 | mittel | Nach „Konto löschen“ trägt das nächste Konto die Kopfzeile „Konto löschen“ | `befunde/EINST.md` | Astra mittel | trifft nicht zu (bereits A3/3.18.11) | Auth-Reset leert sämtliche genannten Felder; echte Löschung A → Anmeldung B in sechs Zuständen am festen 8762d38 grün |
| E3 | EINST-3 | mittel | „Fehler melden“ ist ohne Mail-Programm eine Sackgasse | `befunde/EINST.md` | Sol niedrig | erledigt (3.18.15) | zwölf Zustände: offen, Knopf stabil, Clipboard und manueller Kopierweg grün; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E4 | EINST-4 | mittel | „← Zurück“ auf Datenschutz/Impressum lädt die App neu – Einstieg und Formular sind weg | `befunde/EINST.md` | Sol niedrig | erledigt (3.18.29) | Korrektur zur Abnahme 3.18.15: echter Zurück-Weg nun im vorhandenen Dialog; voller Plan, Name/Adresse/Passwort erhalten. Gegenprobe d64380a rot, E4 und Umfeld grün; G7 am iPhone bleibt offen |
| E5 | EINST-5 | mittel | Backup gilt als „heute gesichert“, auch wenn keine Datei ankam | `befunde/EINST.md` | Sol niedrig | erledigt (3.18.15) | Blob 60 s erhalten, Download angeboten, Prüfsatz sichtbar; G5 offen; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E6 | EINST-6 | mittel | Tägliche Erinnerung – auf Android und in der iPhone-App ungeprüft, drei kleine Fehler | `befunde/EINST.md` | Sol niedrig | erledigt (3.18.15) | ICS heute/morgen, neutraler Vorlagenstatus grün; G6 offen; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E7 | LERN-1 | mittel | Die Serie reißt ohne Warnung, wenn zwei Tage hintereinander nichts fällig ist | `befunde/LERN.md` | Sol niedrig | erledigt (3.18.16) | Z6b ja: Ruhetag hält die Serie, zählt nicht hoch und verbraucht keinen Joker; drei Tage Serie 10, sechs Regelfälle und vier Markerfälle grün; Gegenprobe 8762d38 rot, Gesamtlauf 139/139, Runde 13/13, Affen 0; Logbuch 05.10. |
| E8 | LERN-2 | mittel | Der Meilenstein-Hinweis bleibt für immer stehen und sperrt alle anderen Hinweise | `befunde/LERN.md` | Sol niedrig | erledigt (3.18.15) | Meilenstein endet am Folgetag; Dienstag/Mittwoch Rückblick in sechs Zuständen grün; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E9 | EINST-7 | niedrig | Lange Wörter ohne Leerzeichen laufen aus der Karte (Ideen-Board, Profilname) | `befunde/EINST.md` | Sol niedrig | erledigt (3.18.15) | 40/100 Zeichen ohne Leerzeichen passen auf 320/390/iPad, hell/dunkel; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E10 | EINST-8 | niedrig | Leistenfarbe springt beim Start von #111010 auf #0e0e12 | `befunde/EINST.md` | Sol niedrig | erledigt (3.18.15) | dunkle theme-color durchgehend #111010; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E11 | EINST-9 | niedrig | Nach dem Löschen des Kontos sagt die App nichts | `befunde/EINST.md` | Sol niedrig | erledigt (3.18.15) | Toast/Ansage bei beiden Callback-Reihenfolgen; spätes A nach B ohne fremden Erfolg; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E12 | EINST-10 | niedrig | Neu-Anmelden vor dem Löschen hat kein Zeitlimit und keine Rückmeldung | `befunde/EINST.md` | Sol niedrig | erledigt (3.18.15) | echter 12-s-Abbruch, Busy, keine Löschung; späte Antwort wirkungslos; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E13 | EINST-11 | niedrig | Drei Kleinigkeiten auf 320 px | `befunde/EINST.md` | Sol niedrig | erledigt (3.18.15) | voller Wert, Reset mindestens 44 px, Bestätigungsantwort im Bild; sechs Zustände; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E14 | EINST-12 | niedrig | Der Abschnitt „Hilfe“ enthält keine Hilfe | `befunde/EINST.md` | Sol mittel | erledigt (3.18.15) | Z10 hat Vorrang: Rückmeldung und Installationszeile, keine Hilfe-Seite; zwölf Zustände grün, Herstellerquellen im Log; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E15 | EINST-13 | niedrig | Der Name lässt sich nach der Anmeldung nicht mehr ändern | `befunde/EINST.md` | Sol niedrig | erledigt (3.18.15) | Z9: Name in Cloud/Profil, Abbruch/offline/Teilfehler/Kontowechsel geprüft; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E16 | EINST-14 | niedrig | Aufräumen im Einstellungs-Code | `befunde/EINST.md` | Sol niedrig | erledigt (3.18.15) | Kommentare/Aliasse/tote ID-Regeln bereinigt; gleicher Themenwert ohne Schreibaufruf; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E17 | EINST-15 | niedrig | Google-Konto löschen am iPhone – Popup startet erst nach der Dialog-Bewegung | `befunde/EINST.md` | Sol niedrig | zurück (wartet auf Gerätetest G4) | erst nach Gerätetest G4 |
| E18 | LERN-3 | niedrig | „Trotzdem üben“ wirft einen in den Verwalten-Reiter, „Abbrechen“ lässt einen dort stehen | `befunde/LERN.md` | Sol niedrig | erledigt (3.18.15) | Abbrechen kehrt zum Ausgangsreiter zurück; sechs Zustände; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E19 | LERN-4 | niedrig | „Bester Lauf“ zieht nur am Rundenende nach | `befunde/LERN.md` | Sol niedrig | erledigt (3.18.15) | erste Bewertung mit anschließendem X: Rekord 12 lokal und gespeichert; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E20 | LERN-5 | niedrig | „Merken“ springt zwischen Karten mit und ohne Notiz 68 px zur Seite | `befunde/LERN.md` | Sol niedrig | erledigt (3.18.15) | Merken auf zwölf Karten mit/ohne Notiz stabil, zwölf Zustände; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E21 | LERN-6 | niedrig | Tastatur in der Runde: Escape tut nichts, Rückgängig hat keine Taste, zwei Kommentare beschreiben altes Verhalten | `befunde/LERN.md` | Sol niedrig | erledigt (3.18.15) | Space/3/Backspace/3/Escape und Verlauf grün; verursachter Sprung belegt behoben; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E22 | LERN-7 | niedrig | Nach „Rückgängig“ steigt die Karte vom Stapel auf, statt von dort zurückzukommen, wohin sie flog | `befunde/LERN.md` | Sol niedrig | erledigt (3.18.15) | drei Rückkehrrichtungen reverse; reduzierte Bewegung ohne Rückkehranimation; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E23 | LERN-8 | niedrig | Rundenende mit Rundenlimit sagt „Geschafft“ und darunter „10 Karten geschafft.“ | `befunde/LERN.md` | Luna niedrig | erledigt (3.18.15) | Limittext ohne doppeltes geschafft, Rundenende grün; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E24 | LERN-9 | niedrig | Im Üben deckt ein Tipp irgendwo auf, im Lernen nur die Karte oder der Knopf | `befunde/LERN.md` | Sol niedrig | erledigt (3.18.15) | Üben: Hintergrund deckt nicht auf, Karte deckt auf; Lernrunden-Regression grün; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E25 | LERN-10 | niedrig | „Für heute durch“ mit vollem Ring und Haken, auch wenn heute gar nichts gelernt wurde | `befunde/LERN.md` | Sol niedrig | erledigt (3.18.15) | Ruhetag leerer Ring, nach Lernen voller Ring; zwölf Zustände; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E26 | LERN-11 | niedrig | Nach langer Pause steht nur eine große Zahl da | `befunde/LERN.md` | Sol niedrig | zurück (wartet auf Betreiber) | Frage 10: kritische Gegenprüfung 09.10. fertig; Starttermine korrigiert, neun Auditfälle grün. Dauerhafter Deckel derzeit nicht empfohlen; Rückkehr-Probelauf braucht Pensum/Zusatznutzen/Lernkriterium. Siehe `mehrwert/TAGESDECKEL-AUDIT-2026-10-09.md` |
| E27 | LERN-12 | niedrig | „Heute auch fällig: Bereich X (3)“ lässt sich nicht antippen | `befunde/LERN.md` | Sol niedrig | erledigt (3.18.15) | direkter Bereichswechsel und mindestens 44 px; zwölf Zustände; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E28 | LERN-13 | niedrig | Nachts begrüßt die App mit „Gute Nacht“ | `befunde/LERN.md` | Luna niedrig | erledigt (3.18.15) | Nachtgruß Hallo; Text-/Datumsprobe grün; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E29 | LERN-14 | niedrig | Die Flamme steht für die Serie und für „oft vergessen“ | `befunde/LERN.md` | Sol niedrig | erledigt (3.18.15) | Warnsymbol statt Serienflamme; Quelltextprobe grün; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E30 | V2 | niedrig | Passwort ändern (nur E-Mail-Konten) | `befunde/EINST.md` Vorschlagsliste V2 | Sol mittel | erledigt (3.18.15) | Z9: nur Passwort-Konten; Abbruch/Mail/Fehler/späte A-Antwort geprüft; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E31 | V4 | niedrig | Zuletzt geöffneten Bereich merken (nur Gerät) | `befunde/EINST.md` Vorschlagsliste V4 | Sol niedrig | erledigt (3.18.15) | Z9: Gerätekennung pro Konto; Neustart/entfernte ID/Kontowechsel grün; Datenschutz Punkt 7 ergänzt; Gegenprüfung/25 Einzeltests siehe Logbuch |
| E32 | V3 | niedrig | Arabische Schrift: Stufe „Sehr groß“ | `befunde/EINST.md` Vorschlagsliste V3 | Sol mittel | erledigt (3.18.15) | Z9: 1,6-fach; 40 Karten je Thema, Listen/Einstieg auf 320 px ohne Überlauf, acht angrenzende Zustände grün; Gegenprüfung/25 Einzeltests siehe Logbuch |

## Paket F – Aufräumen (Code, Texte, Repo)

| Nr | Kennung | Schwere | Aufgabe | Befund | Modell | Status | Hinweis |
|---|---|---|---|---|---|---|---|
| F1 | CODE-1 | mittel | Datenschutzerklärung sagt „beim Start eine Sache von außen“ – auf Handys und in Safari sind es vier | `befunde/CODE.md` | Sol mittel | erledigt (3.18.17) | Z12: nur Text der Datenschutzerklärung (Weg a) |
| F2 | CODE-2 | mittel | Neun Klick-Zweige ohne Knopf – darunter ein ganzer toter Funktionsweg („Serie fortsetzen“) | `befunde/CODE.md` | Sol niedrig | erledigt (3.18.17) |  |
| F3 | CODE-3 | mittel | Umschalter „alle Bereiche / dieser Bereich“ im Fortschritt ist tot, Rechenwege und Stil liegen noch da | `befunde/CODE.md` | Sol niedrig | erledigt (3.18.17) |  |
| F4 | CODE-4 | mittel | Kommentare beschreiben Regeln, die es nicht mehr gibt (Tageslimit, Zwei-Tipp-Auswahl, startDrill, Link-Teilen) | `befunde/CODE.md` | Luna niedrig | erledigt (3.18.17) |  |
| F5 | CODE-5 | mittel | CLAUDE.md und PLAN.md widersprechen STAND.md – vier alte „AKTUELL“-Aufträge stehen vor den Dauerregeln | `befunde/CODE.md` | Sol mittel | erledigt (3.18.17) | Z14: wie empfohlen |
| F6 | CODE-6 | niedrig | „Zuletzt benutzte Speicherkarte vorschlagen“ (3.5.0) ist seit 3.17.10 still verloren | `befunde/CODE.md` | Sol niedrig | trifft nicht zu (bereits C26, 3.18.13; 16 Nachprüfungen grün) |  |
| F7 | CODE-7 | niedrig | Texte beim Teilen und in Listen stimmen bei genau einer Lektion oder Karte nicht | `befunde/CODE.md` | Luna niedrig | erledigt (3.18.17) |  |
| F8 | CODE-8 | niedrig | Alter Produktname „Lernkarten“ und Wortmischung Backup / Sichern / Sicherung | `befunde/CODE.md` | Sol niedrig | erledigt (3.18.17) | Z13 entschieden: Sicherung; interne Schlüssel/Format erhalten |
| F9 | CODE-9 | niedrig | Datenschutzerklärung benutzt andere Namen als die App und widerspricht sich in zwei Sätzen | `befunde/CODE.md` | Sol niedrig | erledigt (3.18.17) | Z12: mit CODE-1 in einem Zug |
| F10 | CODE-10 | niedrig | Bildschirmwechsel räumt an fünf Stellen von Hand auf – jede Liste ist anders | `befunde/CODE.md` | Sol mittel | erledigt (3.18.17) |  |
| F11 | CODE-11 | niedrig | Tote Reste der alten Stufen-Auswahl beim Üben und weitere stillgelegte Zweige | `befunde/CODE.md` | Sol niedrig | erledigt (3.18.17) |  |
| F12 | CODE-12 | niedrig | Rund 30 CSS-Klassen, die app.js und die HTML-Seiten nie erzeugen | `befunde/CODE.md` | Sol mittel | erledigt (3.18.17) | rote Vollseitenfotos als Messfehler belegt; Stile 36/36 gleich, Fotos 30/36 gleich mit Kontrolle, 6 Gast-Konfigurationen mit Bewegung nicht messbar; siehe Logbuch 06.10. |
| F13 | CODE-13 | niedrig | Veraltete und doppelte Dateien im Repo – Vorschlag für eine aufgeräumte Struktur | `befunde/CODE.md` | Sol mittel | erledigt (3.18.17) | Z14: wie empfohlen |

## Doppelt gemeldet (einmal beheben)

**A9-Sicherung:** Die 15 Restbefunde des Zweigs `4462fac` sind unter eindeutigen
Kennungen R15-112, R15-116 und R15-118–R15-130 in
[`RUNDE15-REST.md`](RUNDE15-REST.md) gesichert und am aktuellen Code nachgelesen.
Das sind Folgeaufträge nach eigener Zuordnung, keine zusätzlichen Arbeiten
dieses Paket-A-Chats. Die beiden Bedeutungen der bisherigen Nummern 118/119
bleiben dadurch getrennt. B5/D10 und B12 mit den dort genannten Dopplungen
abgleichen; nicht zweimal beheben.

- BEW-1 und VERW-10: Blätter schließen ohne Bewegung. Behoben wird in D (BEW-1); VERW-10 danach auf `erledigt` setzen.
- BEW-10 und EIN-5: Mitscrollen im Plan lässt sich nicht anhalten. Behoben wird in B (EIN-5).
- CODE-3 und FORT-15: toter Umschalter im Fortschritt. Behoben wird in F (CODE-3).


Zahl der neuen Funde: 103 (hoch 6, mittel 42, niedrig 55). Dazu 5 alte (G-107–G-111) und G-118.
