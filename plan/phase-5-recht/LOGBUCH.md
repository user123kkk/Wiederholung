# Logbuch Phase 5 — Recht

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `läuft`

---

## Format jedes Eintrags

Die Arbeit läuft über viele getrennte Sessions. Ein Eintrag muss allein
verständlich sein, ohne Rückfrage und ohne die vorige Session zu kennen:

```
### JJJJ-MM-TT — kurze Überschrift

**Geändert:** Dateien mit Pfad, bei Code mit Zeilennummer
**Entscheidung:** was festgelegt wurde — und warum, nicht nur was
**Offen:** was bewusst liegen bleibt und woran es hängt
**Nächster Schritt:** das eine, was als Nächstes zu tun ist
```

Auch „geprüft, nichts zu tun" ist ein Eintrag. Sonst prüft die nächste Session
dasselbe noch einmal.

---

## Einträge

### 2026-09-12 — Geprüft: weiterhin durch offene Fragen 3 und 4 gesperrt

**Geändert:** Keine Dateien. Reine Prüfung nach Phase-4-Abschluss.

**Entscheidung:** Nach `../PLAN.md`, „Wo eine neue Session anfängt" wäre
Phase 5 als Nächstes dran. `AUFTRAG.md:5–6` verlangt aber offene Fragen 3
und 4 als beantwortet — beide stehen in `../PLAN.md`, Abschnitt „Offene
Fragen" weiterhin offen. Auch Phase 6, 7, 8, 9 wurden geprüft: Phase 6
hängt zusätzlich an offener Frage 2 und 4, Phase 7/8/9 hängen an Phase 6
(`fertig` vorausgesetzt, ist sie nicht). **Es gibt aktuell keine
unblockierte Phase.** Diese Session hat deshalb nichts gebaut, sondern die
Fragen dem Betreiber vorgelegt (siehe Antwort dieser Session).

**Offen:** Fragen 2, 3, 4 aus `../PLAN.md` — ausschließlich vom Betreiber
zu entscheiden.

**Nächster Schritt:** Sobald Frage 3 (und 4, falls sie Phase 5 betrifft)
beantwortet ist, Phase 5 nach `AUFTRAG.md` beginnen.

### 2026-09-12 — Fragen 3 und 4 beantwortet, Phase 5 begonnen

**Geändert:** `app.js:4722` (Datenschutz-Hinweis, Abschnitt „Löschen") —
Version 3.0.8. `sw.js:10` `CACHE_NAME` nachgezogen. `CHANGELOG.md` Eintrag
3.0.8. `AUFTRAG.md:3–6` Status auf `läuft`, Voraussetzungen als erfüllt
vermerkt.

**Entscheidung:** Betreiber hat beide Fragen entschieden (Details:
`../PLAN.md`, Abschnitt „Offene Fragen"):

- **Frage 3:** Datenschutzerklärung wird selbst geschrieben, aber nach dem
  Pflicht-Aufbau eines Generators (Verantwortlicher, welche Daten,
  Auftragsverarbeiter, Rechte, Cookies) — zugeschnitten auf das, was die
  App tatsächlich tut.
- **Frage 4:** Medina-Kartensatz bleibt privat, kein Teil der öffentlichen
  Seite. Ändert an dieser Phase nichts, weil sie ohnehin nur die
  öffentlich sichtbaren Inhalte betrifft.

Als ersten konkreten Schritt aus Auftrag Punkt 4 („Auskunft und Löschung
beschreiben, gestützt auf das in Phase 2 Gebaute") wurde ein Fund
korrigiert: Der bestehende Datenschutz-Hinweis in den Einstellungen
(`renderDatenschutz()`, seit v3.0.3) beschrieb Kontolöschung noch als
„Sag dem Betreiber Bescheid ... einen Knopf dafür gibt es noch nicht" —
das war seit dem Bau von „Konto löschen" in Phase 2 (v3.0.5) veraltet und
verschwiegen den vorhandenen Weg. Text beschreibt jetzt den tatsächlichen
Ablauf: Einstellungen → Konto löschen, sofort und selbst.

**Offen — braucht den Betreiber, kann kein Agent liefern:**

1. **Impressum.** Braucht echte, ladungsfähige Angaben: Name (bzw.
   Firma), Postanschrift, eine Kontaktmöglichkeit (E-Mail reicht meist,
   je nach Rechtsform ggf. Telefon). Ohne diese Angaben vom Betreiber
   kann kein Impressum-Text entstehen — erfundene Angaben wären selbst
   ein Rechtsverstoß.
2. **Wo die Rechtstexte öffentlich liegen.** Die App ist heute eine
   Single-Page-App ohne eigene Routen für separate Seiten. Impressum und
   Datenschutzerklärung müssen aber ohne Login lesbar sein (Konzept 4.3,
   „Private Seiten hinter dem Login"). Naheliegend: zwei eigene,
   statische Dateien (`impressum.html`, `datenschutz.html`) neben
   `index.html`, verlinkt vom Login-Bildschirm — das fasst kein
   Lernwerkzeug-Feature an. Wird beim Bau dieser Seiten umgesetzt, sobald
   Punkt 1 vorliegt.
3. Der bestehende `renderDatenschutz()`-Hinweis in der App bleibt
   zusätzlich als nutzerfreundlicher Kurztext bestehen (Fließtext statt
   Paragraphen) — die neue Datenschutzerklärung ist der rechtlich
   vollständige Text daneben, ersetzt den Hinweis nicht.
4. Cookie-Prüfung (Auftrag Punkt 3) noch nicht durchgeführt — folgt
   zusammen mit dem Bau der Datenschutzerklärung, da beides denselben
   Rechercheschritt braucht (was die App tatsächlich auf dem Gerät
   ablegt).

**Nächster Schritt:** Vom Betreiber die Impressum-Angaben (Name,
Anschrift, Kontakt) einholen — steht am Ende dieser Antwort unter „Was Du
noch tun musst". Danach: `impressum.html` und `datenschutz.html` bauen,
Cookie-Prüfung dabei erledigen, vom Login-Bildschirm aus verlinken.
