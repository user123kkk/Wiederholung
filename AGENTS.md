# Hinweise für Codex und andere Agenten

Dieselben Regeln wie für Claude. Diese Datei verweist nur, sie ersetzt nichts.

**Seit 08.10.2026, vor allem anderen (Betreiber: „ohne mich erklären zu
müssen“):**

1. [`plan/sicherung/UEBERGABE-AKTUELL.md`](plan/sicherung/UEBERGABE-AKTUELL.md)
   lesen. Die Seite wird jede Minute automatisch neu geschrieben: Stand,
   uncommittete Dateien, laufende Tests, letzte Ergebnisse, zuletzt Getanes.
   Uncommittete Arbeit eines anderen Agenten liegt als
   `plan/sicherung/entwurf-aktuell.patch` daneben, alle Testausgaben unter
   `plan/sicherung/tests/`.
2. Die Minuten-Sicherung selbst starten und laufen lassen:
   `bash plan/werkzeuge/minuten_sicherung.sh` (im Hintergrund).
3. [`plan/BETREIBER-VERSTEHEN.md`](plan/BETREIBER-VERSTEHEN.md) und
   [`plan/ALLES-OFFEN.md`](plan/ALLES-OFFEN.md) lesen. Jeden Wunsch des
   Betreibers in derselben Antwort in `ALLES-OFFEN.md` eintragen; jeden
   Arbeitsschritt in `plan/ARBEITSPROTOKOLL.md`.
4. Den Betreiber nicht nach dem Stand fragen. Er steht in diesen Dateien.

**05.10.2026, zuerst lesen, falls `git status` uncommittete Dateien zeigt:**
[`plan/zyklus-2/CODEX-HANDOFF-2026-10-05-E7.md`](plan/zyklus-2/CODEX-HANDOFF-2026-10-05-E7.md).
E7 (Ruhetag, 3.18.16) ist gebaut und geprüft, aber noch nicht committet;
dort steht die genaue Stelle. Ist „3.18.16“ schon in `git log`, ist das
erledigt und dieser Absatz nur Verlauf.

**Aktueller Auftrag (seit 01.10.2026): Zyklus 2.** Genau so vorgehen, wie
[`plan/zyklus-2/CODEX-START.md`](plan/zyklus-2/CODEX-START.md) es vorschreibt.
Dort steht, was zuerst zu lesen ist, welches Paket dran ist, wie jede Aufgabe
abgenommen wird und wann angehalten wird. Nichts bauen, was nicht in
[`plan/zyklus-2/AUFGABEN.md`](plan/zyklus-2/AUFGABEN.md) als `offen` steht.

Lesereihenfolge:

**Simulationen und Empfehlungen (Betreiber 09.10.2026):** Vor Ergebnissen
die behauptete Eingangsverteilung unabhängig prüfen und falsche Eingaben
als Gegenprobe abweisen. Last ist kein Lernwirkungsnachweis. Empfehlungen
nur für das tatsächlich geprüfte Verhalten; fehlende Belege ausdrücklich
nennen. Pflicht: [`plan/EMPFEHLUNGEN-PRUEFEN.md`](plan/EMPFEHLUNGEN-PRUEFEN.md)
und `LEHREN.md` § 5.3. Beim Tagesdeckel blockiert die Eingangsprüfung
automatisch den Rechenlauf; ihre Negativfälle dürfen nicht entfernt werden.

1. **[`plan/STAND.md`](plan/STAND.md)**: aktueller Stand und Reihenfolge.
2. **[`CLAUDE.md`](CLAUDE.md)**: Grundsätze des Betreibers, Veröffentlichung,
   Dokumentationspflicht, Stichwort „ladegerät“. Gilt für jeden Agenten.
3. **[`plan/LEHREN.md`](plan/LEHREN.md)** vollständig, vor der ersten
   Änderung. Die Checkliste in § 14 vor jedem Commit.
4. **[`plan/zyklus-2/CODEX-START.md`](plan/zyklus-2/CODEX-START.md)**, dann
   `AUFGABEN.md`, `ENTSCHEIDUNGEN.md` und der Befundblock der Aufgabe unter
   `plan/zyklus-2/befunde/`.
5. Gegenprüfung jeder Aufgabe: `plan/grossplan/AUFTRAG.md` § 2a (Pflicht),
   § 2b (sparsam, nie an Prüfung sparen), § 3 (wann fertig).

**Stichworte des Betreibers.** Sie gelten sofort, ohne Rückfrage:

- **„A weiter“** (oder B, C, D, E, F): Dieses Paket fortsetzen. Einen
  vorhandenen uncommitteten Stand behalten, nie verwerfen. Zuerst die
  Zeilen mit Status `zurück`, dann die `offen`en, nach
  `plan/zyklus-2/CODEX-START.md` § 3 bis § 7. Nicht veröffentlichen. Läuft der
  Laptop auf Akku, nur bauen und Einzeltests, dann melden.
- **„Netzteil dran“:** Netzteil prüfen (`BatteryStatus` = 2), dann das Paket
  abschließen: Gesamtlauf, Gegenprüfung, Version, Commit, Push auf `main`.
  Nicht veröffentlichen.
- **„Was jetzt?“:** In höchstens fünf Zeilen: was fertig ist, was offen ist,
  was als Nächstes dran ist, welchen Text der Betreiber einfügen soll.
- **Nie ein neues Paket beginnen**, solange ein früheres uncommittet ist.

„Texte auswendig lernen“ läuft im Probelauf nur im Betreiber-Konto
(`plan/texte-lernen/`); dort nichts umbauen.

## Klein-Weg (Betreiber 07.10.2026, fest)

Kleinigkeiten dauern Minuten, nicht Stunden. Gilt für Aussehen, Abstand,
Wortlaut und für ein vorhandenes Muster, das an weitere Stellen kommt
(Beispiel: „Tippen daneben schließt“). Gilt **nicht** für Lernlogik,
Regeln, Daten, neue Bildschirme.

1. Sofort bauen, auch wenn gerade ein großer Lauf läuft – dann in einem
   eigenen Schritt danach committen, nicht den Betreiber warten lassen.
2. Nur die betroffenen Tests (die, die die Stelle nennen). Kein
   Gesamtlauf, kein Affe, keine Rundenabnahme.
3. Mehrere Kleinigkeiten = eine Version. Logbuch: wenige Zeilen.
4. Der volle Lauf bleibt für Lernlogik, Pakete und vor dem Veröffentlichen.

