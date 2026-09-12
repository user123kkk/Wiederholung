# Phase 0 — Ist-Aufnahme

Status: `fertig` (12. September 2026)
Gehört zu: [`../PLAN.md`](../PLAN.md)

---

## Warum diese Phase

Ohne Befund ist jeder Plan geraten. Konzept-Abschnitt 4 ist ein **Rohmaterial-
Pool** aus fünf Videos, und die Spalte „Erst-Einschätzung" ist ausdrücklich
eine Vermutung des Autors — **vom Agenten am Code zu prüfen, nicht zu
übernehmen.**

Drei der fünf Videos zielen auf Server-Apps mit eigener Datenbank und eigenem
API. Dieses Projekt hat keinen eigenen Server: der Browser spricht direkt mit
Firestore. Ein Teil der Liste läuft deshalb ins Leere, anderes verschiebt sich
komplett in `firestore.rules`. **Diese Zuordnung vorzunehmen ist die Kernarbeit
dieser Phase** (Konzept-Abschnitt 3).

## Was getan wird

Jeder Punkt aus Konzept-Abschnitt 4.1 bis 4.10 bekommt genau einen Status,
belegt am Code mit Datei und Zeilennummer:

| Status | Bedeutung |
|---|---|
| `✅ schon erfüllt` | ist da und trägt — mit Fundstelle |
| `🔧 zu tun` | Lücke, gehört in eine spätere Phase — mit Zuordnung |
| `⏳ später` | trifft zu, ist aber jetzt nicht dran — mit Phase |
| `➖ trifft nicht zu` | **mit Begründung**, warum der Punkt auf diesen Aufbau nicht passt |

Zu prüfende Dateien: `app.js`, `index.html`, `firestore.rules`, `sw.js`,
`manifest.json`, `styles.css`, `README.md`, `.gitignore` sowie die Git-Historie.

## Was ausdrücklich **nicht** getan wird

- **Kein Produktivcode wird geändert.** Phase 0 stellt fest, sie repariert
  nicht. Jede gefundene Lücke wird notiert und einer späteren Phase zugeordnet.
- Keine Bewertung von Funktionen des Lernwerkzeugs. Es geht um Fundament,
  Recht und Außenseite.
- Kein Punkt wird künstlich erfüllt, damit die Liste voll aussieht.
- Kein Punkt wird weggelassen, weil er offensichtlich nicht zutrifft — auch
  „trifft nicht zu" wird aufgeschrieben, sonst prüft die nächste Session es
  erneut.

## Woran diese Phase fertig ist

1. `BEFUND.md` enthält **jeden** Punkt aus Konzept-Abschnitt 4.1–4.10 mit
   Status und Beleg. Kein Punkt ohne Status, kein `➖` ohne Begründung.
2. Jede Abweichung zwischen Erst-Einschätzung und Code ist als solche benannt
   — nicht stillschweigend übernommen und nicht stillschweigend korrigiert.
3. Jeder `🔧`- und `⏳`-Punkt ist einer Phase aus `../PLAN.md` zugeordnet.
4. Neue offene Fragen, die nur der Mensch entscheiden kann, stehen in
   `../PLAN.md` unter „Offene Fragen" — **nicht selbst beantwortet.**
5. `LOGBUCH.md` ist geführt, `../PLAN.md` auf `fertig` gesetzt.

## Ergebnis

→ [`BEFUND.md`](BEFUND.md)
