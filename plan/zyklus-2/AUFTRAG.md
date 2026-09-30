# Zyklus 2 – die ganze App noch einmal von vorn bis hinten

Angelegt am 30.09.2026 auf Wunsch des Betreibers. **Beginnt erst, wenn
„Texte auswendig lernen“ veröffentlicht ist** (Stufe 7, `STAND.md`).
Ersetzt Runde 15 und die weiteren Runden des Großplans. Die Befunde von
dort gehen nicht verloren, sie kommen hier hinein (Abschnitt 4).

Logbuch: [`LOGBUCH.md`](LOGBUCH.md). Vorbild-Bilder:
[`VORBILD-MARHABA.md`](VORBILD-MARHABA.md).

---

## 1. Was der Betreiber verlangt hat (30.09.2026, nichts davon vergessen)

Sinngemäß, in seiner Reihenfolge. Jeder Punkt wird im Zyklus ausdrücklich
abgehakt oder mit Begründung als „trifft nicht zu“ vermerkt.

1. **Runde 15 entfällt als eigene Runde.** Erst Texte fertig, dann dieser
   Zyklus. Grund des Betreibers: Runde 15 und folgende fertig machen, nur um
   danach von vorn anzufangen, bringt Unruhe.
2. **Komplett alles durchsuchen**, von Anfang bis Ende der App:
   - Vorgaben, die nicht eingehalten werden;
   - Sackgassen (Bildschirme ohne Weg zurück oder weiter);
   - Fehler und Bugs;
   - „unsatisfying“: was sich billig, hakelig oder unfertig anfühlt;
   - Grafik und Animation hinzufügen, wo sie fehlt;
   - Flüssigkeit („smoothness“), und dass alles funktioniert;
   - App-Logik richtig verteilt (was wo steht, was doppelt ist);
   - Firestore-Regeln;
   - Unsinniges, toter Code, Unnützes;
   - Nützliches hinzufügen, gern auch Größeres, **zum Beispiel Einstellungen**.
3. **Onboarding ist wichtig.** Dort waren Fehler entstanden, sie sind
   „angeblich gefixt“. Also am echten Stand neu prüfen, nicht glauben.
4. **Verwalten** prüfen.
5. **Fortschritt-Tab ist „dumm“.** Der Betreiber hat keinen Grund genannt
   („frag ned wieso“). Also selbst herausfinden, was daran nicht trägt
   (Abschnitt 3.3), nicht nachfragen.
6. **Jede Animation** prüfen: Sie soll sich „perfekt“ anfühlen, nicht
   „unsatisfying“.
7. **Bilder einer anderen App** (Onboarding von „marhaba!“, 45 Bilder,
   nicht in Reihenfolge): Muster und Anregungen notieren, übernehmen, was
   passt, Pläne daraus machen. Wichtig laut Betreiber: nicht falsch deuten,
   also Anregung, keine Kopie. Ergebnis: `VORBILD-MARHABA.md`.
8. **Plan mit Agenten**, effizient, nicht unnötig, aber vollständig. Die
   Runden haben teils lange gedauert. Das ist ein Gedanke des Betreibers,
   **kein Befehl zu kürzen**, wo dadurch Risiken entstehen.
9. **Regeln für Formate und Abstände** selbst recherchieren und anwenden
   (Abschnitt 3.2).
10. **Repo aufräumen, wenn nötig**, auch umsortieren.
11. **Selbst mitdenken:** Was er nicht aufgezählt hat, aber dazugehört,
    ebenfalls finden und vorschlagen („sei hilfreich und mehrwertanbietend“).

## 2. Gewichtung (LEHREN § 1.1: dafür, dagegen, Urteil)

**Runde 15 streichen, Befunde in den Zyklus.**
Dafür: Ein frischer Blick auf den ganzen Stand findet mehr als eine Runde
mit einer alten Liste; keine Arbeit doppelt. Dagegen: G-110 ist
**kritisch** (ein alter Dialog kann das falsche Konto löschen) und liegt
dann länger offen; die angefangene Arbeit (`runde15`, Patch) veraltet.
Urteil: Runde 15 als Runde entfällt, aber **G-107–G-111 kommen als erste
Aufgaben in Paket A** (Abschnitt 4), bevor irgendetwas Neues gebaut wird.
Auslösen lässt sich G-110 nur mit einem Kontowechsel mitten in einem
bestätigten Dialog. Das ist selten, aber Datenverlust.

**Schneller werden.**
Dafür: Runden mit 5 Aufgaben und vollem Prüfstand je Runde dauerten Stunden.
Dagegen: Genau diese Prüfungen haben G-098, G-100 und andere Datenverluste
gefunden. Urteil: Sparen an Wiederholung, nie an Prüfung (`grossplan/AUFTRAG.md`
§ 2b). Konkret: (a) Prüfung parallel mit Lese-Agenten, (b) Umsetzung in
größeren, thematisch geschlossenen Paketen statt Runden à 5 Aufgaben,
(c) voller Prüfstand einmal je Paket statt je Aufgabe, betroffene Tests je
Aufgabe, (d) Messungen der Flüssigkeit am Ladegerät mit A/B gegen den
Vorstand (`x_ab_tempo.js`), nicht mit Einzelläufen.

**Größeres wie Einstellungen hinzufügen.**
Dafür: Er wünscht es ausdrücklich; manches ist heute versteckt oder fehlt.
Dagegen: Jede neue Einstellung ist ein Feld in `normSettings()`, in den Regeln,
im Emulator-Test und in der Datenschutzerklärung (LEHREN § 6.2, § 8.1), und
Hick's Law gilt weiter. Urteil: Einstellungen erst als **Liste mit
Vorschlag** (was, warum, wo gespeichert) in `ENTSCHIEDEN`-Form vorlegen,
dann bauen, was er bestätigt.

## 3. Ablauf

### 3.1 Phase 0 – Bestand und Grundlagen (Claude, vor jeder Prüfung)

- `LEHREN.md`, `STAND.md`, dieser Auftrag, `grossplan/AUFTRAG.md` § 2a/2b.
- Stand festhalten: Version, Commit, Online-Fassung, grüner Prüfstand.
- `git worktree` des Stands, den der Freund sieht (Online-Fassung), für
  Vergleiche.
- Bildschirmfotos aller Bildschirme in hell und dunkel, Handy 390 und 320,
  iPad, Desktop (vorhandene Werkzeuge: `t_inventar2.js`, `foto()`).

### 3.2 Regeln für Formate, Abstände, Bewegung recherchieren

Selbst nachlesen, Quelle und Datum ins Logbuch, dann gegen die App messen:

- Apple Human Interface Guidelines: Layout, Typografie, Trefferflächen
  (44 pt), Bewegung, Onboarding.
- Material 3: Abstandsraster (4/8 dp), Schriftstufen, Dauer und Kurven von
  Bewegungen.
- WCAG 2.2: Kontrast, Zielgröße (2.5.8), Bewegung bei Interaktion (2.3.3),
  Fokus sichtbar (2.4.11).
- web.dev: Reaktionszeit auf Eingaben (INP), Layout-Sprünge (CLS).

Ergebnis: eine kurze Regeltabelle in `LEHREN.md` § 6 (Abstände,
Schriftstufen, Bewegungsdauer), jede Zeile mit Quelle. Die App hat schon
Token (`--space-*`, `--stack`); geprüft wird, ob sie überall benutzt werden.

### 3.3 Phase 1 – frische Prüfung mit Agenten (nur lesen, parallel)

Je Bereich ein Lese-Agent, gleichzeitig. Keiner ändert Code (LEHREN § 15,
25.09.: nie mehrere Agenten an `app.js`). Jeder Fund mit Datei:Zeile oder
Messung, Schwere und Vorschlag.

| Bereich | Inhalt |
|---|---|
| B1 Onboarding | ganzer Einstieg bis erste Karte, alle Wege (neu, Bestandskonto, Gast), kurze und lange Bildschirme, iOS-Start. Gegen `onboarding/`-Übergaben und `VORBILD-MARHABA.md` |
| B2 Lernen | Runde, Karte, Wischen, Rundenende, Serie, Hinweise |
| B3 Fortschritt | Was zeigt der Reiter, was davon hilft beim Lernen, was ist Zahl ohne Nutzen, was fehlt. Eigene Diagnose zu „dumm“ |
| B4 Verwalten | Liste, Suche, Anlegen, Blatt, Speicherkarten, Ziehen, Tempo (G-119), G-118 |
| B5 Einstellungen und Konto | was fehlt, was versteckt ist, Vorschlagsliste neue Einstellungen |
| B6 Bewegung | jede Animation einzeln: Dauer, Kurve, Anfang und Ende, reduzierte Bewegung, CPU 4× |
| B7 Daten und Regeln | Firestore-Regeln, Konto-Bindung (G-107–G-111), Offline, Mehrgeräte |
| B8 Code | toter Code, doppelte Logik, Kommentare, die lügen, Aufräumen im Repo |
| B9 Texte | Wortlaut, Einzahl/Mehrzahl, Systemsprache, Versprechen gegen Code |
| B10 Gegenprüfung | Diffs seit dem letzten geprüften Stand nach `grossplan/AUFTRAG.md` § 2a |

Claude liest danach **jeden** Fund gegen den Code nach (eine Rückmeldung ist
kein Beleg), sortiert und schreibt sie in `AUFGABEN.md` dieses Ordners.

### 3.4 Phase 2 – Entscheidungen

Alles, was dem Betreiber gehört (Lernlogik, neue Funktionen, Einstellungen,
Wortlaut, Recht), kommt gesammelt in **eine** Entscheidungsliste mit
Dafür/Dagegen/Empfehlung. Er antwortet einmal, nicht je Punkt.

### 3.5 Phase 3 – Umsetzung in Paketen

Ein Agent zur Zeit an `app.js`/`styles.css`. Reihenfolge:

- **Paket A – Daten sicher:** G-110 (kritisch), G-107, G-108, G-109, G-111
  (Arbeitsstand: Zweig `runde15` im Ordner `Wiederholung-r15`,
  `grossplan/runde15-unfertig.patch`, auf den aktuellen Stand übertragen).
- **Paket B – Onboarding.**
- **Paket C – Verwalten und Fortschritt.**
- **Paket D – Bewegung und Flüssigkeit** über alle Bildschirme.
- **Paket E – Einstellungen und Neues**, nur was bestätigt ist.
- **Paket F – Aufräumen** (Code, Repo, Pläne umsortieren).

Je Paket: Gegenprüfung nach `grossplan/AUFTRAG.md` § 2a, voller Prüfstand,
Affe, eine Version, ein Changelog-Eintrag.

### 3.6 Phase 4 – Nachprüfung

Wie A5/A6 im Großplan: eine frische Prüfung aller Bereiche findet keinen neuen
kritischen oder hohen Fund, zweimal hintereinander.

## 4. Schon bekannt, nicht neu entdecken

- G-107–G-111 (`grossplan/AUFGABEN.md`), G-110 kritisch.
- G-118: Verwalten → Karte erstellen, Tippen ins Feld „Wort“ scrollt die
  Seite nach oben weg.
- G-119 Rest: Wechsel nach Verwalten kostet auf dem Laptop unter CPU 4×
  110–260 ms je nach Takt (3.18.10, Logbuch Texte). Ursache ist das Setzen
  der sichtbaren Kartenzeilen; Stil-Berechnung breit verteilt, kein einzelner
  teurer Selektor.
- Echtes iPhone: Quran-Schrift, Tastatur über großem Textfeld (Texte).
- Beispiel für B8, beim Planen gesehen: Der Kopfkommentar zum Einstieg
  (`app.js`, vor `EINSTIEG_LETZTER`) sagt noch „Ueberspringen auf jedem
  Fragebildschirm“. Das wurde in 3.10.3 entfernt (Kommentar vor
  `EINSTIEG_PFLICHT`, LEHREN § 3.5). Kommentar lügt (LEHREN § 3.2).
- Datenschutzerklärung Abschnitt Texte: Rechtsprüfung durch eine Person.

## 5. Was ich (Claude) zusätzlich vorschlage zu prüfen

Nicht vom Betreiber genannt, gehört aber dazu:

- **Leere und seltene Zustände:** 0 Karten, 1 Karte, 3000 Karten, alles
  gelernt, lange nicht da gewesen, offline beim Start.
- **Rückweg überall:** Zurück-Geste und Zurück-Knopf auf jedem Bildschirm,
  auch in Blättern und Unterseiten (Sackgassen).
- **Erste Woche eines neuen Nutzers** als Geschichte durchspielen: Tag 1,
  Tag 2, Tag 7 mit simuliertem Datum.
- **Dunkelmodus** jedes Bildschirms, nicht nur der Hauptseiten.
- **Ladezeit beim ersten Besuch** (ohne Cache) und nach Update.
- **Fehlertexte**: jede Meldung einmal auslösen und lesen.
- **Rechtstexte gegen den Code** (jeder Datenfluss steht drin).
