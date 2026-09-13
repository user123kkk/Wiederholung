# Logbuch Phase 8 — Rückmeldung

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `läuft` — Möglichkeiten vorgelegt, wartet auf Entscheidung des
Betreibers

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

### 2026-09-13 — Möglichkeiten aufgeschrieben und vorgelegt

**Geändert:**
- `plan/phase-8-rueckmeldung/MOEGLICHKEITEN.md` — neu. Vier Möglichkeiten,
  wie eine Nachricht ohne eigenen Server ankommen kann (Firestore-Sammlung ·
  `mailto:`-Link · Drittanbieter-Formular-Dienst · Firestore + Cloud
  Function), je mit dem, was sie im Repo ändern würden (Regeln, CSP,
  Datenschutzerklärung), Spam-Schutz-Bausteinen und einer als solche
  gekennzeichneten Empfehlung.

**Entscheidung:**

1. **Vorlegen, nicht entscheiden — wie `AUFTRAG.md` es verlangt.** Diese
   Phase durfte einen Schritt tun, ohne den Betreiber zu fragen: die
   Möglichkeiten aufschreiben. Welche davon umgesetzt wird, ist ausdrücklich
   seine Entscheidung, nicht meine.

2. **Kontakt- und Fehlerformular sind als getrennte Fragen behandelt.** Ein
   Kontaktformular muss ohne Konto erreichbar sein — die Startseite hat aber
   bewusst kein Login-Formular (Phase 6) —, ein Fehlerformular kann dagegen
   in der App liegen, wo schon ein Konto besteht. Eine Möglichkeit kann für
   beide unterschiedlich ausfallen (z. B. `mailto:` für Kontakt, Firestore
   für Fehlermeldungen).

3. **Die CSP aus Phase 4 ist die eigentliche Einschränkung, nicht das
   Fehlen eines Servers.** `connect-src` und `form-action` lassen heute nur
   Google/Firebase-Adressen zu; jede Lösung mit einem fremden Dienst
   (Formspree & Co.) bräuchte eine CSP-Erweiterung — das ist keine Nebensache,
   sondern vergrößert genau die Angriffsfläche, die Phase 4 bewusst eng
   gehalten hat. Firestore ist dagegen schon erlaubt.

4. **App Check aus der „Später"-Liste in `../PLAN.md` gehört inhaltlich
   hierher**, wird aber nicht hier mitentschieden. Die Liste vermerkt es
   „sobald die Seite öffentlich beworben wird" — das ist mit Phase 6/7 jetzt
   der Fall. Als Spam-Schutz-Baustein für ein offen beschreibbares Formular
   genannt, aber als eigene, größere Entscheidung ausgewiesen.

**Offen:**

- **Die eigentliche Wahl unter den vier Möglichkeiten** — Aufgabe des
  Betreibers. Ohne sie geht diese Phase nicht weiter.
- Ob App Check vorgezogen wird (siehe Punkt 4) — eigene Entscheidung,
  unabhängig von dieser Phase.

**Nächster Schritt:** `MOEGLICHKEITEN.md` dem Betreiber vorlegen. Antwortet
er mit einer Wahl, wird danach `firestore.rules` (bei A/D) bzw. `landing.html`
und/oder `app.js` (je nach Wahl) gebaut, die Datenschutzerklärung ergänzt, und
mit einer Testnachricht geprüft, dass sie ankommt (Fertig-Kriterium 1).
