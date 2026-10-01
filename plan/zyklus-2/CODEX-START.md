# Zyklus 2 – so arbeitet Codex (und jeder andere Agent) die Pakete ab

Angelegt am 01.10.2026. Betreiber: „stelle sicher, dass Codex 1 zu 1
hinkriegt, was hingekriegt werden soll … nicht so, wie Codex es will“.
Deshalb ist hier alles festgelegt. **Wo diese Datei etwas vorschreibt, wird
nicht anders entschieden.** Was unklar ist, wird nicht geraten, sondern als
`zurück (Grund)` eingetragen (§ 6).

---

## 1. Für den Betreiber: so startest Du Codex

1. Codex im Ordner `C:\Users\USER\Wiederholung` öffnen (oder das Repo
   `user123kkk/Wiederholung` anhängen). Der Laptop sollte am Netzteil sein.
2. Modell und Denkstufe wählen, wie in der Tabelle in § 2 für das Paket steht.
3. Genau diesen Text einfügen und nur den Buchstaben anpassen:

   > Lies `AGENTS.md` und danach `plan/zyklus-2/CODEX-START.md` vollständig.
   > Arbeite **Paket A** aus `plan/zyklus-2/AUFGABEN.md` ab, genau nach
   > CODEX-START § 3 bis § 7. Nichts anderes. Nicht veröffentlichen.

4. Ein Paket je Chat. Ist das Paket fertig, meldet Codex „Paket X fertig“
   mit Version. Dann neuen Chat für das nächste Paket.
5. Reihenfolge: **A, B, C, D, E, F.** Nicht überspringen. A zuerst, weil dort
   der kritische Fehler G-110 liegt.
6. Nach jedem Paket (oder spätestens nach A, C und F) einmal Claude öffnen
   und schreiben: „Prüf Paket X“. Claude liest den Diff gegen die Befunde
   (`plan/grossplan/AUFTRAG.md` § 2c). Danach „ladegerät“ zum Veröffentlichen.

## 2. Welches Modell, welcher Aufwand

Die Spalte „Modell“ in `AUFGABEN.md` nennt die Empfehlung je Aufgabe. Ein Chat
schaltet sein Modell nicht selbst um. Deshalb gilt je Paket **ein** Modell,
das für die schwerste Aufgabe darin reicht:

| Paket | Inhalt | Modell für den Chat | Denkstufe |
|---|---|---|---|
| A | Daten, Regeln, Kontowechsel | GPT-6 Astra | mittel |
| B | Onboarding | GPT-6 Sol (EIN-1 mit Astra, eigener Chat) | mittel |
| C | Verwalten, Fortschritt | GPT-6 Sol; Umbau Fortschritt (Entscheidung Z1, Weg b) mit Astra | mittel |
| D | Bewegung | GPT-6 Sol | mittel |
| E | Lernen, Einstellungen, Konto | GPT-6 Sol (EINST-2 mit Astra) | niedrig bis mittel |
| F | Aufräumen | GPT-6 Sol; reine Text- und Kommentar-Aufgaben reichen mit Luna | niedrig |

Faustregel, wenn Du unsicher bist: **Sol mittel**. Astra nur für A und die
drei genannten Aufgaben. Hochgehen, wenn Codex zweimal an derselben Aufgabe
scheitert (dann trägt es `zurück` ein und Du startest die Aufgabe mit Astra).
Das ist eine Empfehlung, keine Zusage über Kosten oder Qualität; die Abnahme
(§ 5) gilt für jedes Modell gleich.

## 3. Vor der ersten Änderung (jeder Chat)

1. `plan/STAND.md`, `CLAUDE.md`, `plan/LEHREN.md` **vollständig** lesen.
2. `plan/zyklus-2/AUFTRAG.md`, `AUFGABEN.md`, `ENTSCHEIDUNGEN.md` lesen.
3. `git status --porcelain` muss leer sein, `git pull` auf `main`. Sonst
   anhalten und melden.
4. `node --check app.js sw.js` und `node plan/werkzeuge/pruefe_stand.mjs`
   müssen grün sein, bevor etwas geändert wird.
5. Prüfstand startklar machen (`plan/werkzeuge/pruefstand/LIESMICH.md`,
   unter Windows `CHROMIUM` in jedem Aufruf setzen, Server auf Port 8099).

## 4. Je Aufgabe, in der Reihenfolge der Tabelle

Nur Aufgaben mit Status `offen`. `wartet Zn` wird übersprungen, außer
`ENTSCHEIDUNGEN.md` zeigt bei Zn eine Antwort des Betreibers.

1. **Befundblock lesen:** `plan/zyklus-2/befunde/<Datei>`, Überschrift
   `#### <Kennung>`. Er nennt Beleg, Vorschlag und Abnahme. Die Spalte
   „Hinweis“ in `AUFGABEN.md` schränkt ein, was davon gebaut wird.
2. **Beleg am aktuellen Code nachlesen** (Zeilen verschieben sich). Stimmt der
   Befund nicht mehr: `trifft nicht zu (Grund)`, nicht bauen.
3. **Gegenprobe zuerst:** einen Test schreiben oder erweitern
   (`plan/werkzeuge/pruefstand/t_*.js`), der den Fehler am Stand **vor** der
   Änderung rot zeigt. Gegenprobe gegen einen festen Commit, nie gegen `HEAD`
   (LEHREN § 15, 26.09.). Bei reinen Texten reicht `grep`.
4. **Ändern:** nur, was der Vorschlag nennt. Kleinste Änderung an der Ursache
   (LEHREN § 3.4). Vorhandene Bauteile nutzen (§ 3.7). Nach demselben Muster
   im ganzen Repo suchen (§ 3.3).
5. **Abnahme aus dem Befundblock selbst prüfen**, dazu die Tests der berührten
   Stelle, `t_sprung.js`, `t_kontrast.js`, `t_a11y.js`. Berührt es die
   Lernrunde: `node abnahme_runde.js` 13/13.
6. **Angrenzende Zustände** nach jeder Änderung an Oberfläche oder Bewegung:
   Handy 390 und 320, iPad, hell und dunkel, reduzierte Bewegung, leer und
   voll (`CLAUDE.md`, Übergabe 27.09.). Erzeugt der Fix einen neuen Sprung
   oder Ruckler: zurücknehmen, `zurück (Grund)`.
7. Status in `AUFGABEN.md` setzen, eine Zeile ins `LOGBUCH.md` dieses Ordners.

## 5. Je Paket, vor dem Commit

1. Gegenprüfung nach `plan/grossplan/AUFTRAG.md` § 2a (Diff jeder Aufgabe
   gegen ihren Befund lesen, Ergebnis ins Logbuch).
2. `plan/LEHREN.md` § 14 Checkliste, Punkt für Punkt.
3. Eine Version für das ganze Paket: `APP_VERSION` (`app.js`), `CACHE_NAME`
   (`sw.js`), **alle** `?v=`-Stellen in `index.html` (auch die 31
   Startbild-Links), `CHANGELOG.md` oben. `node plan/werkzeuge/pruefe_stand.mjs`.
4. **Ganzer Prüfstand:** `node plan/werkzeuge/pruefstand/alle_pruefen.js`,
   dann Affe (`node affe.js handy 200 7`, `node affe.js ipad 150 7`). Ausgaben
   vollständig lesen (LEHREN § 5.3). Rot heißt: beheben oder als Messfehler
   belegen, sonst kein Commit. Tempo-Tests am Netzteil, Vergleich nur mit
   `x_ab_tempo.js` gegen den Vorstand.
5. Geänderte `firestore.rules`: `bash plan/werkzeuge/regeln_testen.sh` grün,
   und im Logbuch unter **Offen** vermerken, dass die Regeln vor dem Hosting
   eingespielt werden müssen (das macht `ladegeraet.ps1`).
6. Neuer `localStorage`-Schlüssel, neues Cloud-Feld, neuer Datenfluss:
   Datenschutzerklärung im selben Commit (LEHREN § 12), Regeln und
   Emulator-Test (§ 8.1).
7. Commit direkt auf `main`, pushen. Logbuch-Eintrag im Format aus
   `CLAUDE.md`. `plan/STAND.md` nachziehen.

## 6. Anhalten statt raten

Codex hält an, trägt `zurück (Grund)` ein und macht mit der nächsten Aufgabe
weiter, wenn:

- der Befund nicht reproduzierbar ist oder der Vorschlag nicht zum Code passt;
- die Aufgabe Lernlogik berührt (Stufen, Abstände, Bewertung, Serie-Regel,
  Freischalten), religiösen Wortlaut, Rechtstexte oder eine neue Funktion,
  und in `ENTSCHEIDUNGEN.md` keine Antwort des Betreibers steht;
- zwei Anläufe an derselben Aufgabe gescheitert sind;
- ein Test rot wird, der vorher grün war, und die Ursache nicht belegt ist.

Codex hält **das ganze Paket** an und meldet sich, wenn `git status` nicht
sauber ist, der Prüfstand nicht startet oder Daten verloren gehen könnten.

## 7. Was Codex nie tut

- Veröffentlichen (`ladegeraet`, `veroeffentlichen`, `firebase deploy`). Das
  löst nur der Betreiber aus.
- Mehrere Agenten gleichzeitig an `app.js` oder `styles.css`.
- Etwas bauen, das nicht als `offen` in `AUFGABEN.md` steht. Fällt etwas auf:
  ins Logbuch, nicht bauen.
- Grenzen von Tests lockern, Tests löschen oder überspringen.
- Wieder einbauen, was bewusst entfernt wurde (LEHREN § 3.5).
- Arabische Wörter, Übersetzungen oder religiöse Texte selbst schreiben.
- An „Texte auswendig lernen“ etwas umbauen (Probelauf läuft bis 29.10.).
- `--force` auf `main`, Branches, Pull Requests.

## 8. Fertig ist Zyklus 2, wenn

- jede Zeile in `AUFGABEN.md` `erledigt`, `trifft nicht zu` oder `wartet Zn`
  (mit Vermerk „Betreiber hat abgelehnt/verschoben“) ist;
- Claude jedes Paket gegengelesen hat;
- eine frische Nachprüfung aller Bereiche zweimal hintereinander keinen neuen
  kritischen oder hohen Fund bringt (`AUFTRAG.md` § 3.6).
