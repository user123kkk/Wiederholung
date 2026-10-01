# Stand – was läuft, was offen ist, in welcher Reihenfolge

**Diese Datei zuerst lesen** (Claude und Codex gleich). Sie ist die eine
Übersicht über den aktuellen Stand. Einzelheiten stehen in den verlinkten
Logbüchern. Wer eine Stufe oder Runde beendet, zieht diese Datei nach.
Ältere „AKTUELL“-Absätze in `CLAUDE.md` und `plan/PLAN.md` sind Geschichte.
Wo sie von dieser Datei abweichen, gilt diese Datei.

Stand: 01.10.2026, `main` = 3.18.10, **online** (veröffentlicht per `ladegeraet.bat`,
121/121 grün). Probelauf Texte läuft ab 01.10. (Stufe 8). Betreiber tut
dabei nichts außer lernen; am 29.10. „Auswertung“ + Foto der Probelauf-Werte
aus den Einstellungen (`texte-lernen/WIEDERHOLEN.md` § 8).
Zyklus 2 Phase 1 (Prüfung mit 8 Lese-Agenten) läuft seit 01.10., Befunde in
`zyklus-2/befunde/`.

---

## 1. Reihenfolge (Betreiber 30.09.2026, abends geändert)

1. **Texte auswendig lernen fertig machen** (Abschnitt 2), bis zur
   Veröffentlichung im Probelauf.
2. **Zyklus 2** ([`zyklus-2/AUFTRAG.md`](zyklus-2/AUFTRAG.md)): die ganze
   App von vorn bis hinten neu prüfen, Plan, Arbeit auf Agenten verteilt,
   dann in Paketen umsetzen. Gilt für Claude **und** Codex.

**Runde 15 und die weiteren Runden entfallen** (Betreiber: „runde 15 können
wir vergessen“). Ihre offenen Befunde (G-107–G-111, G-110 kritisch, G-118)
sind Paket A von Zyklus 2 und kommen dort vor allem Neuen. Abschnitt 3 unten
bleibt als Verweis auf die angefangene Arbeit.

Die Beispiele des Betreibers sind Hinweise, keine Vorschrift und nicht der
einzige Schwerpunkt. Kleine Ruckler und Kleinigkeiten werden in den Runden
mit erledigt, nicht vorgezogen. Ausnahme: Sie blockieren eine Freigabe.

---

## 2. Texte auswendig lernen

Plan: [`texte-lernen/KONZEPT.md`](texte-lernen/KONZEPT.md) § 12 (Stufen),
[`texte-lernen/WIEDERHOLEN.md`](texte-lernen/WIEDERHOLEN.md). Logbuch:
[`texte-lernen/LOGBUCH.md`](texte-lernen/LOGBUCH.md), oberster Eintrag.
Alles liegt hinter `texteFreigeschaltet()`, also **nur im Betreiber-Konto**.
Andere Konten sehen jeden Bildschirm wie in 3.17.56 (`t_nur_betreiber.js`).
Eine Freigabe für andere gibt es nur auf sein ausdrückliches „ja“.

| Stufe | Inhalt | Stand |
|---|---|---|
| 0 | Quran-Quelle (Tanzil), Datei, Prüfsumme, Code-Stellen | fertig |
| 1 | Daten, Regeln, Schalter, Ausschluss aus Karten | fertig (3.18.0), Regeln 204/204 im Emulator |
| 2 | Anlegen, Einwilligung, Bearbeiten, Löschen | fertig (3.18.2) |
| 3 | Neu lernen, Anfangsbuchstaben, Denkpause | fertig (3.18.3) |
| 4 | Wiederholen, Kreis, Nachbarn, Tagesmenge | fertig (3.18.4), Mehrgeräte im Emulator geprüft |
| 5 | Karten-Regler | fertig (3.18.5) |
| – | Quran-Schrift Amiri für Kreiszeichen | fertig (3.18.6) |
| 6 | Lernen-Tab, Fortschritt, Probelauf-Werte | fertig (3.18.7) |
| – | Nur Betreiber sichtbar, abgesichert | fertig (3.18.8) |
| – | Lange Texte laden nach (Tempo Sure 2) | fertig (3.18.9) |
| 7 | Gesamtprüfung am Laptop, dann Veröffentlichen | fertig (3.18.10 online, 01.10.) |
| 8 | Nach 4 Wochen Probelauf: Auswertung, Startwerte, Freigabe-Frage | läuft, Auswertung ab 29.10.2026 |

**Was Stufe 7 noch blockiert:**
- `t_text_tempo.js` ist rot, nur noch im Schritt **Verwalten** (172–353 ms,
  Grenze 200 ms). Mit einem normalen Konto sind es 201–252 ms, das Stocken
  ist also älter und betrifft alle Konten. **Betreiber 30.09.: jetzt beheben
  (Weg A)**, obwohl es den Verwalten-Reiter aller Konten berührt. Danach
  `t_nur_betreiber.js` erneut prüfen: Er vergleicht Pixel mit 3.17.56, eine
  gewollte Tempo-Änderung ohne sichtbare Änderung muss dort gleich bleiben.
- Stand 30.09. abends: Die Ursache ist belegt (einmalige Einrichtung der
  Schrift beim ersten Wort). Ein Entwurf liegt in
  `texte-lernen/entwurf-g119/`. Die Messung schwankt am Laptop aber
  ±60–80 ms, die Grenze liegt im Rauschen. Der Betreiber entscheidet, wie
  weiter (Logbuch).
- Danach das Stichwort „ladegerät“ (`CLAUDE.md`): alle Tests, Affe mit
  Texten, dann Regeln und Hosting.

**Bleibt offen, blockiert nicht:**
- Echtes iPhone: Eindruck der Quran-Schrift, Tastatur über großem Textfeld.
- Datenschutzerklärung Abschnitt Texte: Rechtsprüfung durch eine echte
  Person (wie J1/F5).

---

## 3. Großplan, Runde 15 (entfällt, Arbeitsstand für Zyklus 2 Paket A)

Ablauf jeder Runde: [`grossplan/AUFTRAG.md`](grossplan/AUFTRAG.md) § 2
(Ablauf), § 2a (Gegenprüfung, Pflicht), § 2b (sparsam, ohne an Prüfung zu
sparen), § 3 (wann fertig). Aufgaben: [`grossplan/AUFGABEN.md`](grossplan/AUFGABEN.md).
Logbuch: [`grossplan/LOGBUCH.md`](grossplan/LOGBUCH.md).

- Runde 15 = G-107–G-111, zuerst **G-110 (kritisch)**. Dazu kommt der neue
  Befund **G-118**: Verwalten → Karte erstellen, Tippen ins Feld „Wort“
  scrollt die Seite nach oben weg.
- **Angefangene Arbeit liegt nur auf dem Laptop:** Zweig `runde15` im
  Ordner `C:\Users\USER\Wiederholung-r15`, Commit `4462fac` „WIP Runde 15“
  (29.09., 29 Dateien, auf dem alten Stand 3.18.2). Nie gepusht. Nicht
  löschen. Zu Beginn von Runde 15 zuerst lesen und auf den aktuellen `main`
  übertragen, statt neu anzufangen.

---

## 4. Veröffentlichen

- Agenten committen und pushen auf `main` (`CLAUDE.md`, „Wie hier
  veröffentlicht wird“).
- Regeln und Hosting spielt nur `plan\werkzeuge\ladegeraet.ps1` ein. Das
  Skript läuft am Laptop, das Netzteil muss stecken, und es veröffentlicht
  nur, wenn alles grün ist. Das Stichwort „ladegerät“ bzw. „mach weiter,
  bin auf dem laptop“ ist die Freigabe des Betreibers.
- Rote Tests werden einzeln nachgesehen (`LEHREN.md` § 5.3). Grenzen werden
  nicht gelockert.

---

## 5. Lokale Sicherungen auf dem Laptop (nicht löschen)

- Tag `sicherung-laptop-3.18.4-a20e1fe`: alter, nie gepushter Stufe-3-Commit.
  Er ist durch `691adca` überholt.
- `git stash` „Laptop-Entwurf 3.18.5 vor Pull 2026-09-30“: alter Entwurf
  von Stufe 4/5, durch `60c383b`/`15413f3` überholt.
- Zweig `runde15` (siehe Abschnitt 3).
