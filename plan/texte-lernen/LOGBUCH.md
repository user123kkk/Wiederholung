# Logbuch: Texte auswendig lernen

Letzter Eintrag zuerst. Plan: [`KONZEPT.md`](KONZEPT.md), [`WIEDERHOLEN.md`](WIEDERHOLEN.md).

### 2026-09-29 — Bauauftrag; Arbeitsbaum für den Bau freigemacht

**Geändert:** `plan/PLAN.md` (Wo eine neue Session anfängt),
`plan/texte-lernen/KONZEPT.md` (Status, nächster Schritt), dieses Logbuch
neu, `plan/grossplan/runde15-unfertig.patch` (Sicherung).
**Entscheidung:** Betreiber: erst dieser Bau, dann die Codex-Runden, dann
Gesamtprüfung und neue Runden; Bau in einem neuen Claude-Chat. Im
Arbeitsbaum lag Codex' unfertige Runde 15 (3.17.57, 25 Dateien). Sie ist
nicht verworfen: `git stash` („Codex Runde 15 unfertig …“) und als Patch im
Repo; `git apply --check` gegen `a4b5677` erfolgreich. Der Bau startet von
`main` = 3.17.56.
**Offen:** Quran-Quelle/Bedingungen (Stufe 0). Weißes Aufblitzen beim Start
ist ein eigener offener Punkt, nicht Teil des Baus. Runde 15 nach dem Bau
einspielen.
**Nächster Schritt:** Stufe 0 nach `KONZEPT.md` § 12: Quran-Quelle und
Bedingungen klären, Datei + SHA-256, Zählung 114/6236; Liste § 14 gegen den
aktuellen Code prüfen; Fixtures.
