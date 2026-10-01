# Hinweise für Codex und andere Agenten

Dieselben Regeln wie für Claude. Diese Datei verweist nur, sie ersetzt nichts.

**Aktueller Auftrag (seit 01.10.2026): Zyklus 2.** Genau so vorgehen, wie
[`plan/zyklus-2/CODEX-START.md`](plan/zyklus-2/CODEX-START.md) es vorschreibt.
Dort steht, was zuerst zu lesen ist, welches Paket dran ist, wie jede Aufgabe
abgenommen wird und wann angehalten wird. Nichts bauen, was nicht in
[`plan/zyklus-2/AUFGABEN.md`](plan/zyklus-2/AUFGABEN.md) als `offen` steht.

Lesereihenfolge:

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
