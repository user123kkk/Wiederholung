# Logbuch: Einstieg vor der Anmeldung

Letzter Eintrag zuerst. Auftrag: [`AUFTRAG.md`](AUFTRAG.md)

---

### 2026-09-19 — E2 entschieden: nur der Wenn-dann-Satz; E1 offen

**Geändert:** `AUFTRAG.md` Abschnitt 6 (Zeilen E1/E2). Kein App-Code.
**Entscheidung:** Betreiber wählte von vier Bausteinen nur den Wenn-dann-Satz. Zeit pro Tag, Schriftprobe und die drei Mechanik-Bildschirme wurden **nicht** gewählt und deshalb nicht aufgenommen. Zu E1 schrieb er „weis nicht ob stetigs in sowas behandelt werden oder persönliches, ka" — als Frage gelesen, ob ein solcher Einstieg Stetigkeit oder Persönliches behandelt. Das ist eine Lesart, keine Bestätigung.
**Folge:** Der Strang ist damit ein Einstieg zum Dranbleiben. Das passt zur App: Abstände wachsen nur, wenn man an den Fälligkeitstagen wiederkommt (`STRATEGIE.md` 1.1). Belegt ist dafür nur Gollwitzer & Sheeran 2006 (Ziele allgemein, nicht Sprachenlernen) — auf dem Bildschirm steht davon nichts als Behauptung.
**Offen:** (1) Wortlaut und Anker der Situationen (E3) — Vorschlag an den Betreiber, **nicht** geschrieben: feste Tagesabläufe als Anker, etwa der Gebetsablauf; ob und wie, entscheidet er. (2) E1 bestätigen. (3) E4 Datenschutz-Rechtsprüfung — beim Wenn-dann-Satz ohne Speicherung eventuell gar nicht nötig, sonst ja.
**Nächster Schritt:** Betreiber beantwortet die zwei Rückfragen (Lesart E1, Anker E3). Dann Block 1.

---

### 2026-09-19 — Strang angelegt, Konzept geschrieben, nichts gebaut

**Geändert:** neu `plan/onboarding/AUFTRAG.md` und dieses Logbuch; `plan/PLAN.md` (Nebenstrang + Statusverlauf). Kein App-Code, keine Versionsnummer.
**Anlass:** Betreiber: Einstieg vor der Anmeldung, aber „wissenschaftlich … korrekten fragen passend, worauf hinarbeitend, für Muslime … nicht buchstäblich alles" — als ganzes Projekt, nicht als Aufzählung.
**Befund (am Code geprüft):**
- Es gibt drei Einstellungen (`sitzungsLimit`, `arabGroesse`, `thema`, `app.js:936`); ein Tageslimit für neue Karten ist seit 2.3.0 entfallen (`app.js:815`). Deshalb wurden „Warum lernst du?" und „Wie gut liest du?" **nicht** vorgeschlagen — sie stellen nichts ein.
- Belege für drei Lernforschungs-Aussagen nachgeprüft (Roediger & Karpicke 2006, Cepeda u. a. 2006, Gollwitzer & Sheeran 2006). Für „Einstieg vor Anmeldung erhöht Registrierungen" fand sich keine kontrollierte Studie, nur Anbieter-Blogs; die Zahlen aus dem Video sind nicht verwendet.
- Das Urteil „Signup nach Onboarding: nicht relevant" (`phase-1-datenzugriff/LOGBUCH.md`, 19.09.) war unvollständig begründet und ist im Auftrag zurückgenommen.
**Entscheidung:** Erst Konzept und Freigabe, dann Bau — wegen `CLAUDE.md` („nichts bauen, was nicht im Plan steht") und der Lehre vom 13.09. (Inhalt kommt vom Betreiber, Freigabe vor dem Schreiben ins Repo).
**Offen:** E1–E4 aus `AUFTRAG.md` Abschnitt 6. E4 (Datenschutz-Rechtsprüfung der Zwischenspeicherung) ist keine Agenten-Entscheidung.
**Nächster Schritt:** Betreiber entscheidet E1 und E2 (und liefert oder gibt frei E3). Danach Block 1 (Bestandsaufnahme, kein Code).
