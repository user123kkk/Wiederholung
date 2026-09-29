# Auftrag: Großplan – alles prüfen, alles verbessern, bis es wirklich stimmt

Betreiber am 25.09.2026 (gekürzt): „ich habe viele Fehler gefunden in meinem
Tool, auch welche, die nie aufgefallen sind … Verbesserungen,
Unvollständigkeiten, Fehlendes … Firebase, E-Mail-Vorlagen, Passwort
zurücksetzen, nicht im Spam landen, seriös machen, Features, die sehr
sinnvoll sind, Onboarding umändern/hinzufügen/entfernen, Animationen, alles,
auch was zukünftig unter Premium laufen kann … Regeln, Logik des Tools …
einen krassen perfekten Plan … die Arbeit an ein günstigeres, schnelleres
Modell geben … die schwere Arbeit bleibt bei Opus … das System soll so lange
weiterlaufen, bis das Ergebnis wirklich die Kriterien erreicht; wenn es nicht
gut genug ist, geht es zurück in die Schleife … auf einen Zeitplan legen,
läuft nachts von allein, prüft sich selbst."

Dieser Ordner ist der Plan dafür. Er gilt zusätzlich zu `CLAUDE.md` und
`plan/LEHREN.md`, **nicht statt ihrer**. Beide werden vor jeder Runde gelesen.

Dateien:

| Datei | Inhalt |
|---|---|
| `AUFTRAG.md` | diese Datei: Rollen, Ablauf einer Runde, Kriterien, Routine |
| [`AUFGABEN.md`](AUFGABEN.md) | die Liste aller Aufgaben mit Status, Modell und Abnahme |
| [`ENTSCHEIDUNGEN.md`](ENTSCHEIDUNGEN.md) | was nur der Betreiber entscheidet – mit Pro, Contra, Empfehlung |
| [`KONSOLE.md`](KONSOLE.md) | was nur der Betreiber in Firebase/Google Cloud klicken kann – Schritt für Schritt |
| [`FUNKTIONEN.md`](FUNKTIONEN.md) | neue Funktionen und Premium: Körbe „jetzt", „später Premium", „lieber nicht" |
| [`UEBERGABE.md`](UEBERGABE.md) | Vorlage für eine ausdrücklich beauftragte Codex-Übergabe |
| [`LOGBUCH.md`](LOGBUCH.md) | jede Runde, letzter Eintrag zuerst |

Die Befunde, aus denen `AUFGABEN.md` entstanden ist, stehen in
[`befunde/`](befunde/): acht Prüfbereiche, jeder Fund mit Beleg aus dem Code.

---

## 1. Codex: Modell und Arbeit wählen

Die historischen Kürzel H/S/O in `AUFGABEN.md` beschreiben die damalige
Claude-Übergabe, **keine** heutige Modellpflicht. Für neue Codex-Arbeit zählt
die Schwierigkeit der konkreten Aufgabe. Die Modellwahl ist eine Empfehlung
für den Nutzer beim Start einer Session; ein laufender Chat schaltet sein
eigenes Modell nicht selbst um. Bei begrenztem Kontingent mit dem leichtesten
passenden Modell beginnen und bei einem nachgewiesenen Problem hochgehen.

| Aufgabe | Codex-Empfehlung | Wann höher gehen |
|---|---|---|
| feste Textersetzung, Log-Sichtung, klarer Einzeltest | GPT-6 Luna, niedrig | mehrere abhängige Dateien oder unklarer Befund → Sol |
| normale Codeänderung, UI-Fix, Regression, Plandateien | GPT-6 Sol, niedrig; bei mehreren Codepfaden mittel | wiederholte Fehlversuche oder Architekturfragen → Astra |
| mehrgerätefähige Datenlogik, Firestore-Regeln, schwer reproduzierbares iOS-Verhalten, abschließende Sicherheitsprüfung | GPT-6 Astra, niedrig oder mittel je nach Befund | höhere Denkstufe nur, wenn die konkrete Analyse sie braucht |

Für G-075 ist wegen konkurrierender Geräte und Rückgängig Astra sinnvoll;
für die achtteilige Nachprüfung zunächst Sol mittel, Astra für neue schwere
Befunde. Das ist keine Aussage über garantierte Tokenkosten oder Qualität.
Abnahme bleibt unabhängig vom Modell: Diff lesen, das Kriterium selbst prüfen,
Gegenprobe bei Fehlern und passende Regressionstests. Keine pauschalen
Testwiederholungen nach grünem Stand ohne neue Änderung.

Codex arbeitet standardmäßig in **diesem** Chat. Weitere Agenten nur bei
ausdrücklichem Auftrag; niemals gleichzeitig an `app.js`/`styles.css`.

---

## 2. Ablauf einer Runde

Eine Runde beginnt nur nach einem ausdrücklichen „weiter" des Betreibers.
**Stand 28.09.2026: wieder aufgenommen.** Der Betreiber hat ausdrücklich
„mach weiter“ verlangt, einschließlich Fehlersuche außerhalb der bekannten
Liste. G-075 wird abgeschlossen, danach folgt die Nachprüfung A5/A6. Neue
Befunde mit Beleg und Abnahme aufnehmen; keine ungefragten Funktionen bauen.
Q1 bleibt offen: keine Text-Lernlogik und keinen religiösen Wortlaut bauen.

1. **Einlesen:** `AGENTS.md`/`CLAUDE.md` → `plan/LEHREN.md` → diese Datei →
   `LOGBUCH.md` (letzter Eintrag) → `AUFGABEN.md`. `git pull origin main`.
   Pausenstatus und parallele Arbeit zuerst prüfen.
2. **Prüfstand starten** (`plan/werkzeuge/pruefstand/LIESMICH.md`): Server auf
   8099, `node_modules` einrichten, falls die Session frisch ist.
3. **Auswählen:** bis zu **fünf** Aufgaben mit Status `offen`, deren
   „Entscheidet" = Agent ist oder deren Betreiber-Entscheidung in
   `ENTSCHEIDUNGEN.md` als „entschieden" steht. Reihenfolge: Schwere
   (kritisch → niedrig), dann Aufgaben, die dieselbe Stelle betreffen,
   zusammen. Nie etwas aus `ENTSCHEIDUNGEN.md`, das noch offen ist.
4. **Je Aufgabe:**
   - Codex liest die Codestelle selbst (Beleg noch aktuell?). Stimmt der
     Befund nicht mehr: Status `trifft nicht zu` mit Begründung.
   - Modell nach § 1 empfehlen. Im laufenden Chat mit dem gewählten Modell
     arbeiten; keine automatische Delegation. Bei ausdrücklich gewünschter
     Delegation `UEBERGABE.md` für genau eine Aufgabe verwenden.
   - **Abnahme** durch den verantwortlichen Codex-Chat (Abschnitt 3).
     Durchgefallen → Ursache prüfen und korrigieren, nicht schönreden.
   - Status in `AUFGABEN.md`: `erledigt (vX.Y.Z)` oder `zurück: <Grund>`.
5. **Veröffentlichungsliste** aus `CLAUDE.md` einmal für alle Aufgaben der
   Runde zusammen (eine Version je Runde), `LEHREN.md` § 14 durchgehen, dann
   `node plan/werkzeuge/pruefe_stand.mjs` (Abschnitt 3.2), committen, auf
   `main` pushen (`git push origin HEAD:main`). **Nie deployen** –
   Veröffentlichen bleibt ein Knopf des Betreibers.
6. **Logbuch:** Eintrag im Format aus `CLAUDE.md`, dazu die Zeile
   `Kriterien: A1 … A6` (welche erfüllt sind). `plan/PLAN.md` „AKTUELL"
   nachziehen.
7. **Neue Funde** aus der Runde: als neue Aufgabe in `AUFGABEN.md` (mit
   Beleg), neue Fehlerart zusätzlich in `LEHREN.md` (§ 15).
8. **Ende prüfen** (Abschnitt 4). Erfüllt → Abschlussbericht, Routine
   abschalten. Nicht erfüllt → nächste Runde.

---

## 3. Kriterien: wann eine Aufgabe fertig ist

### 3.1 Je Aufgabe (alle müssen stimmen)

- **K1 Abnahme:** das Kriterium in der Zeile „Abnahme" ist vom Dirigenten
  selbst geprüft – mit Test, Messung oder `grep`, nicht mit dem Bericht des
  Handwerkers.
- **K2 Rahmen:** keine Lernlogik ohne Freigabe, kein religiöser Text, nichts
  wieder eingebaut, was entfernt wurde (`LEHREN.md` § 1.6, § 2, § 3.5).
- **K3 Muster:** nach derselben Fehlerart im ganzen Repo gesucht (§ 3.3).
- **K4 Texte:** Texte, Hinweise, Kommentare, Datenschutzerklärung mitgezogen
  (§ 7.3, § 12).
- **K5 Listen:** neue Blätter/Handlungen/Einstellungen/Felder in allen
  zentralen Listen, bei Cloud-Feldern Regel + Emulator-Test (§ 6.2, § 8.1).
- **K6 Kein Rückschritt:** Tests nach Abschnitt 3.2 grün.

### 3.2 Je Runde (vor dem Commit)

- `node --check app.js sw.js`
- `node plan/werkzeuge/pruefe_stand.mjs` – Version an vier Stellen,
  `CHANGELOG.md`-Kopf, CSP-Hashes der Inline-Skripte, `APP_SHELL`-Dateien
  vorhanden (wird in Runde 1 gebaut; bis dahin von Hand nach § 4.1).
- Prüfstand: die Tests der berührten Stellen; immer `t_sprung.js`,
  `t_kontrast.js`, `t_a11y.js`; berührt die Runde die Lernrunde:
  `abnahme_runde.js` komplett grün; bei mehr als drei Aufgaben der Affe
  (`node affe.js handy 150 <runde>`), 0 Befunde oder jeder begründet.
- Geänderte `firestore.rules`: Emulator-Test
  (`plan/phase-1-datenzugriff/regeln-pruefung.mjs`) grün, Schritt in
  `KONSOLE.md` und unter „Was Du noch tun musst".

Ist ein Test rot, der vorher grün war: Runde wird nicht veröffentlicht, bis
er grün ist oder die Ursache als Messfehler belegt ist (§ 5.3).

---

## 4. Kriterien: wann die ganze Schleife fertig ist

Die Schleife endet erst, wenn **alle sechs** stimmen:

| Nr | Kriterium | Woran man es sieht |
|---|---|---|
| **A1** | Jede Aufgabe mit „Entscheidet: Agent" ist `erledigt` oder `trifft nicht zu` (mit Begründung) | `AUFGABEN.md`, keine `offen`/`zurück` mehr in diesen Zeilen |
| **A2** | Jede Betreiber-Frage steht mit Pro, Contra, Empfehlung in `ENTSCHEIDUNGEN.md`; entschiedene sind gebaut | `ENTSCHEIDUNGEN.md` |
| **A3** | Jeder Konsolen-Schritt steht in `KONSOLE.md` mit Wo/Was/Woran | `KONSOLE.md` |
| **A4** | Prüfstand komplett grün: `abnahme_runde.js`, `t_sprung`, `t_kontrast`, `t_a11y`, `t_gross_alle`, Affe Handy 200 + iPad 150 | Ausgabe im letzten Logbuch-Eintrag |
| **A5** | **Nachprüfung:** eine frische Prüfung aller acht Bereiche (wie `befunde/`) findet **keinen neuen** Fund der Schwere kritisch oder hoch | Logbuch-Eintrag „Nachprüfung" |
| **A6** | A5 hält **zweimal hintereinander** (zwei Runden mit Nachprüfung ohne neuen kritischen/hohen Fund) | zwei Logbuch-Einträge |

Warum A5/A6: Eine abgearbeitete Liste beweist nur, dass die **bekannten**
Fehler weg sind. Der Betreiber hat ausdrücklich „auch welche, die nie
aufgefallen sind" verlangt. Deshalb prüft sich das System am Ende selbst neu
– und erst, wenn dabei zweimal nichts Ernstes mehr auftaucht, ist es fertig.
Findet die Nachprüfung etwas: neue Aufgaben, zurück in die Schleife.

Was die Schleife **nicht** fertig machen kann (und deshalb nicht Teil der
Kriterien ist, sondern Betreiber-Liste): Entscheidungen, Konsolen-Klicks,
Gerätetest am echten iPhone, Veröffentlichen, Rechtsprüfung durch einen
Menschen. Diese stehen im Abschlussbericht unter „Was Du noch tun musst".

---

## 5. Zeitplan: angehalten

Die frühere Claude-Routine „Adrabic Großplan – Nachtschicht"
(`trig_01L6Ves47R3gsG5kvqQVmyQA`, 23:07/2:07/5:07 Berlin) ist ein
**historischer externer Zeitplan**, kein Codex-Auftrag. Ihr tatsächlicher
Schalterzustand ist hier nicht einsehbar. Sie darf aus dieser Planfassung
keine neue Runde ableiten. Der Betreiber muss sie in claude.ai → Routines
anhalten, falls sie dort noch aktiv ist. In Codex wird kein Ersatz-Zeitplan
angelegt. Der Betreiber hat G-075 und A5/A6 am 28.09.2026 wieder freigegeben.
