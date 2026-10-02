# Stand – was läuft, was offen ist, in welcher Reihenfolge

**Diese Datei zuerst lesen** (Claude und Codex gleich). Sie ist die eine
Übersicht über den aktuellen Stand. Einzelheiten stehen in den verlinkten
Logbüchern. Wer eine Stufe oder Runde beendet, zieht diese Datei nach.
Ältere „AKTUELL“-Absätze in `CLAUDE.md` und `plan/PLAN.md` sind Geschichte.
Wo sie von dieser Datei abweichen, gilt diese Datei.

Stand: 03.10.2026, `main` = **3.18.13, vorhandener Paket-C-Stand abgenommen**;
**online bleibt 3.18.10** (veröffentlicht per `ladegeraet.bat`, 121/121 grün).
Probelauf Texte läuft ab 01.10. (Stufe 8). Betreiber tut
dabei nichts außer lernen; am 29.10. „Auswertung“ + Foto der Probelauf-Werte
aus den Einstellungen (`texte-lernen/WIEDERHOLEN.md` § 8).
Zyklus 2: Prüfung fertig (8 Prüfer, 103 neue Funde, keiner kritisch; dazu
G-107–G-111 und G-118). Plan steht: [`zyklus-2/AUFGABEN.md`](zyklus-2/AUFGABEN.md)
(Pakete A–F), [`zyklus-2/CODEX-START.md`](zyklus-2/CODEX-START.md) (so
arbeitet Codex), [`zyklus-2/ENTSCHEIDUNGEN.md`](zyklus-2/ENTSCHEIDUNGEN.md)
(beantwortet 01.10.: alles wie empfohlen; offen nur Z6b und V8).
**Vorhandener Paket-C-Stand abgeschlossen, 3.18.13 (03.10.):** Alle Änderungen
erhalten; 22 Aufgaben lokal abgenommen, C22 nur b/c/d. C1 mit 32 Zuständen
und Randfällen grün. Die beiden alten C1-Fehlversuche und ihr Patch bleiben
dokumentiert und bewahrt. Gegenprüfung fand zusätzlich den fehlenden
Entwurfs-Handler im Kartenblatt über Fortschritt (C12/C19); begrenzt korrigiert,
Escape/Abbruch/Neuzeichnen in 16 Zuständen grün.
C16 gehört zu D1, C18 wartet bis nach dem Probelauf am 29.10., C22(a) auf F3.
Z1 einschließlich C9/C10/C28 auf Betreiberauftrag ausgelassen. Kein anderes
Paket begonnen. Netzteil mehrfach bestätigt, Gesamtlauf mit gezielten
Nachläufen **137/137 grün**, Runde **13/13** mit identischen Hashes,
Affe mit Textfällen Handy200/iPad150 je **0 Befunde**, Startwert 7.
Alle vollständigen Ausgaben gelesen. Zwei Prüfaufbaufehler belegt und
korrigiert: eingefrorene normale Oberfläche vor Paket C und falsche
Test-Datumsbasis vor 04:00. Originalberichte bewahrt, keine Testgrenze
gelockert. Version/Syntax/CSP/APP_SHELL grün; Gegenprüfung und LEHREN § 14
Punkt für Punkt dokumentiert. Commit/Push direkt auf main; kein Deploy.
G1 am echten iPhone bleibt offen. Keine vollständige Ruckelfreiheit behauptet.
Einzelheiten und Prüfstand im
[`zyklus-2/LOGBUCH.md`](zyklus-2/LOGBUCH.md), oberster Eintrag.
**Paket B fertig, 3.18.12, nicht veröffentlicht:** B6 zuerst behoben und
abgenommen; alle 13 Zeilen erledigt. Vorhandenen Arbeitsstand vollständig
erhalten. Netzteil bestätigt (BatteryStatus=2). Gesamtlauf einschließlich
gezieltem Nachlauf **131/131 grün**, Rundenabnahme **13/13** mit identischen
Hashes; Affe mit Texten Handy200/iPad150 jeweils **0 Befunde**.
Ein Tempo-Ausreißer (Verwalten 203 ms) gesichert: acht A/B-Paare gegen
07c7568 ohne Verschlechterung, Nachlauf 170 ms. Einstieg CPU4× vollständig
erreicht, kurze Pausen bis 174 ms; keine vollständige Ruckelfreiheit oder
echte iOS-Abnahme behauptet. Gegenprüfung/LEHREN-Checkliste dokumentiert.
Commit/Push direkt auf main. Kein anderes Paket begonnen, kein Deploy.
Einzelheiten: Paket-B-Eintrag in [`zyklus-2/LOGBUCH.md`](zyklus-2/LOGBUCH.md).
**Paket A fertig, 3.18.11, nicht veröffentlicht:** alle 13 Zeilen erledigt.
Vorhandenen Zwischenstand nach Pull auf `90d7aaa` vollständig erhalten;
Netzteil danach gemessen (`BatteryStatus=2`). Gesamtlauf einschließlich
gezieltem Nachlauf **130/130 grün**, Rundenabnahme **13/13** am selben
Quellstand; Affe mit Texten Handy 200/iPad 150 jeweils **0 Befunde**;
Regeln **210/210**. Gegenprüfung und LEHREN-Checkliste dokumentiert.
A7/A13: Normal-/Abbruch-Update, Offline-Start und beide Rechtsseiten grün.
Bestehender Tempo-Ausreißer in Verwalten per A/B gegen `c4b1c30` belegt,
keine neue Paket-A-Regression; keine vollständige Ruckelfreiheit behauptet.
Commit/Push direkt auf main; kein Deploy; damals noch kein Paket B begonnen.
**Nächster Schritt:** Vorhandener Paket-C-Stand ist abgeschlossen.
Keine weitere Aufgabe ohne neuen
Auftrag beginnen. Z1 bleibt ein eigener, ausdrücklich beauftragter Chat.
Die neuen Firestore-Regeln müssen vor einer späteren Hosting-Veröffentlichung
eingespielt werden. Einzelheiten und vollständige Log-Pfade:
[`zyklus-2/LOGBUCH.md`](zyklus-2/LOGBUCH.md), oberster Eintrag.

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
- **Angefangene Arbeit:** Zweig `runde15` im
  Ordner `C:\Users\USER\Wiederholung-r15`, Commit `4462fac` „WIP Runde 15“
  (29.09., 29 Dateien, auf dem alten Stand 3.18.2). Seit 01.10. auch als
  `origin/runde15` gepusht. Nicht löschen. In Paket A zuerst lesen und auf
  den aktuellen `main` übertragen, statt neu anzufangen.

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

---

## 6. Gesamtplan – was bis „fertig“ noch kommt

| Nr | Was | Wer | Wann |
|---|---|---|---|
| 1 | Zyklus 2, Pakete A–F (`zyklus-2/AUFGABEN.md`) nach `zyklus-2/CODEX-START.md`, je Paket per `ladegeraet.bat` veröffentlichen | Codex baut und prüft gegen, Betreiber veröffentlicht | jetzt |
| 2 | Entscheidungen (`zyklus-2/ENTSCHEIDUNGEN.md`): beantwortet 01.10., offen nur Z6b (Ruhetag) und V8 | Betreiber | vor Paket E |
| 3 | Gerätetests G1–G7 am iPhone (`zyklus-2/ENTSCHEIDUNGEN.md`) | Betreiber | je nach Paket |
| 4 | Nachprüfung Zyklus 2: frische Prüfung, zweimal ohne neuen kritischen/hohen Fund | Claude | nach Paket F |
| 5 | Probelauf Texte auswerten, Startwerte, Freigabe-Frage | Betreiber schickt Foto, Claude wertet aus | ab 29.10.2026 |
| 6 | Rechtsprüfung der Datenschutzerklärung durch eine Person (J1/F5, Texte, Z12) | Betreiber | offen |
| 7 | Später, nur auf Betreiber-„ja“ (`grossplan/FUNKTIONEN.md`): Liste einfügen (F-1), ohne Harakat abfragen (F-2), zweite Richtung (F-5), neue Startseite, eigene Domain mit Absender für E-Mails, Apple-Anmeldung, Texte teilen, weitere Bücher | Betreiber entscheidet | nach Zyklus 2 |
