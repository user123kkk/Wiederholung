# Logbuch Phase 6 — Öffentliche Startseite

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `offen` — noch nicht begonnen

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

### 2026-09-12 — Fragen 2 und 4 beantwortet, Phase bewusst noch nicht begonnen

**Geändert:** `AUFTRAG.md:3–4` — Vermerk, dass Fragen 2 und 4 beantwortet
sind.

**Entscheidung:** Betreiber hat entschieden (Details: `../PLAN.md`,
Abschnitt „Offene Fragen"):

- **Frage 2:** Eine Domain für beides. Wer die Seite ohne Login aufruft,
  sieht zuerst die Werbe-/Erklärseite (Problem → Lösung →
  Handlungsaufruf, Konzept 4.7); von dort geht es zum Login/Registrieren
  des Tools. Keine zweite, eigens benannte Marketing-Domain.
- **Frage 4:** Medina-Kartensatz bleibt privat — auf der Startseite kommt
  er nicht vor.

Damit ist Phase 6 formal unblockiert. **Trotzdem noch nicht begonnen** —
die Reihenfolge in `../PLAN.md` sieht Phase 5 vor Phase 6 vor (Recht
bevor die Seite öffentlich beworben wird), und Phase 5 läuft gerade erst
an. Kein Grund, davon abzuweichen.

**Offen:** Alles aus `AUFTRAG.md`, „Was getan wird" — unverändert, noch
nichts gebaut.

**Nächster Schritt:** Erst Phase 5 abschließen (Impressum, Datenschutz-
erklärung, Cookie-Prüfung), dann Phase 6 nach `AUFTRAG.md` beginnen.

### 2026-09-13 — Verschärfter Sicherheits-Durchlauf jetzt Vorbedingung dieser Phase

**Geändert:** `AUFTRAG.md` — neuer Abschnitt „Bevor diese Phase inhaltlich
beginnt".

**Entscheidung:** Betreiber hat ausdrücklich darum gebeten, die
Sicherheit noch einmal zu verschärfen, bevor die Seite öffentlich wird —
Hintergrund: Im Impressum (Phase 5) steht der Vater des tatsächlichen
Betreibers als Verantwortlicher und trägt damit die formale Haftung.
Der bisherige Sicherheits-Durchlauf (Abschluss Phase 1) deckte nur
Firestore-Regeln/XSS/Import ab, nicht was mit einem öffentlichen,
unbekannten Nutzerkreis neu dazukommt (z. B. Rate-Limits auf
Registrierung, App Check). Festgehalten auch in `../PLAN.md`, Abschnitt
„Später".

**Offen:** Der eigentliche Durchlauf — folgt, sobald diese Phase
beginnt, als allererster Schritt vor dem Bau der Startseite selbst.

**Nächster Schritt:** Unverändert — erst Phase 5 fertig, dann hier mit
dem Sicherheits-Durchlauf einsteigen, bevor irgendein Startseiten-Inhalt
gebaut wird.
