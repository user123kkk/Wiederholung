# Anweisungen für jede KI in diesem Repo

Gilt für **jede** KI, die hier arbeitet: Claude (jede Session), Codex, ChatGPT
und andere. Angelegt am 29.09.2026 auf Wunsch des Betreibers („Anweisungen ins
Repo schreiben für alle KIs, die es mal lesen“).

Diese Datei ersetzt nichts. Maßgeblich bleiben in dieser Reihenfolge:

1. [`CLAUDE.md`](CLAUDE.md) – gilt für **alle** KIs, nicht nur für Claude.
   Dort stehen der aktuelle Auftrag, die Grundsätze des Betreibers und die
   Veröffentlichungsliste.
2. [`plan/LEHREN.md`](plan/LEHREN.md) – **vor der ersten Änderung lesen.**
   Jede Regel dort stammt aus einem echten Fehler.
3. [`plan/PLAN.md`](plan/PLAN.md), Abschnitt „Wo eine neue Session anfängt“,
   dann Auftrag und Logbuch der laufenden Phase (letzter Eintrag zuerst).

Hier steht nur, was darüber hinaus für die **Zusammenarbeit mehrerer KIs**
gilt, und was bei früheren Runden schiefging.

---

## 1. Mehrere KIs gleichzeitig

Der Betreiber lässt oft zwei oder drei Sessions parallel laufen (Beispiel
29.09.2026: eine Claude-Session baut „Texte lernen“, eine zweite macht die
Großplan-Runde 15).

- **Zuerst nachsehen, wer noch arbeitet:** `git log --oneline -10`,
  `git status`, `git worktree list`, `git stash list`. In Claude Code zusätzlich
  die laufenden Sessions auflisten und der anderen Session schreiben, woran man
  arbeitet.
- **Nie zwei KIs im selben Arbeitsordner an App-Dateien.** Wer parallel an
  `app.js`, `styles.css`, `sw.js`, `index.html` oder `firestore.rules`
  arbeitet, nimmt einen eigenen Git-Worktree:
  `git worktree add -b <thema> ../Wiederholung-<thema> main`.
  Am Ende auf den aktuellen `main` rebasen und per Fast-Forward nach `main`
  bringen. Der Branch bleibt lokal und ist kein Pull Request (`CLAUDE.md`:
  direkt auf `main`).
- **Versionsnummer vorher absprechen.** Wer zuerst veröffentlicht, behält
  seine Nummer. Der andere rebased und nimmt die nächste freie. Die Version
  springt nie zurück.
- **Prüfstand-Ports absprechen.** Der Prüfstand nutzt `127.0.0.1:8099`,
  der Emulator 8081. Eine zweite Session nimmt einen anderen Port
  (`PRUEF_PORT`), sonst prüft sie unbemerkt die Dateien der anderen.
- **Keine fremden Änderungen anfassen:** kein `git stash`, `git checkout .`,
  `git restore .`, `git reset --hard`, `git clean` in einem Ordner, in dem
  eine andere KI arbeiten könnte.
- **Unfertige Arbeit nicht im gemeinsamen Ordner liegen lassen.** Am Ende einer
  Session ist jede App-Änderung entweder committet oder als Patch unter
  `plan/` gesichert und im Logbuch beschrieben. *Vorfall 29.09.2026:* Die
  unfertige Runde 15 lag stundenlang uncommittet im Hauptordner; der
  Veröffentlichen-Knopf verweigerte deshalb auch den fertigen Stand (G-117).

## 2. Eine Runde fertig machen, nicht festfahren

*Vorfall Runde 14/15 (29.09.2026):* Die Runde war nach wenigen Stunden
umgesetzt, blieb aber viele Stunden offen. Die 106 Tests liefen mehrfach neu,
dazwischen wurden Akkustand, Netzteil und Prozessortakt des Laptops
untersucht. Die eigentliche Arbeit (Commit, Gegenprüfung) blieb liegen.

- **Erst gezielt, dann einmal gesamt.** Zuerst die Tests der geänderten Stelle
  und ihre Gegenprobe. Die Gesamtfolge (`alle_pruefen.js --fortsetzen`) läuft
  **einmal** am Ende, gegen den eingefrorenen Stand.
- **Ein roter Tempotest ist zuerst eine Frage an die Umgebung.** Prüfen, ob
  das Netzteil steckt und ob parallel etwas läuft. Dann **diesen einen** Test
  einmal isoliert wiederholen. Keine Grenze lockern. Bleibt er rot, gegen den
  festen Altstand messen (LEHREN § 5.3). Keine Hardware-Forschung über
  mehrere Stunden: Braucht es den Betreiber (z. B. „Ladegerät einstecken“),
  das in **einem** Satz sagen und derweil anderes erledigen.
- **Standby verhindern**, solange Tests laufen, oder Läufe so aufteilen, dass
  ein Abbruch wenig kostet. Ein abgebrochener Lauf zählt nie als grün.
- **Nach der Abnahme sofort committen und pushen.** Ein fertiger, geprüfter
  Stand, der nur lokal liegt, hilft niemandem.

## 3. So schreiben, dass der Betreiber es lesen kann

*Vorfall:* Logbuch-Einträge mit zusammengeklebten Zahlen und Wörtern
(„Handy200/iPad150 je0 Befunde“, „ACLineStatus0“, „3000 geführt57/0/0/0/0ms“).
Der Betreiber kann das nicht lesen. Die nächste KI auch kaum.

- Normale deutsche Sätze. Leerzeichen zwischen Zahl und Wort:
  „Handy 200 Schritte, iPad 150 Schritte, je 0 Befunde“.
- Ein Logbuch-Eintrag hat das Format aus `CLAUDE.md` und ist **kurz**:
  was geändert, warum, was offen, was als Nächstes. Messreihen und Rohdaten
  gehören in eine eigene Datei unter `plan/…/befunde/`, im Logbuch nur der
  Verweis.
- Antworten an den Betreiber: Deutsch, einfach, ohne Fachjargon
  (LEHREN § 1.5). Was er selbst tun muss, steht am Ende unter
  „Was Du noch tun musst“.
- Keine Modellnamen in Commits oder App-Code (LEHREN § 3.11).

## 4. Wer prüft wen

- Jede Runde hat ihre Gegenprüfung nach `plan/grossplan/AUFTRAG.md` § 2a:
  Diff gegen den Befund lesen, nicht gegen den eigenen Bericht. Gegenprobe
  gegen einen festen Commit, nie gegen `HEAD`.
- Eine Rückmeldung eines Unter-Agenten oder einer anderen KI ist **kein
  Beleg**. Selbst den Diff lesen und die Abnahme selbst laufen lassen
  (LEHREN § 15, Runde 2).
- Findet eine KI einen Fehler einer anderen: als Aufgabe in
  `plan/grossplan/AUFGABEN.md` mit Beleg (Datei:Zeile, Test) eintragen oder
  direkt beheben, wenn er klar mechanisch ist. Nicht still umschreiben.

## 5. Was keine KI selbst entscheidet

Steht ausführlich in `CLAUDE.md` und LEHREN § 1.2, hier nur als Erinnerung:
Lernlogik, religiöser Wortlaut und Lehrstoff, Recht, neue Datenflüsse, neue
Funktionen außerhalb des Plans, alles in fremden Konsolen und das
Veröffentlichen selbst. Ein Einwand oder eine Frage des Betreibers ist keine
Anweisung (LEHREN § 1.1).
