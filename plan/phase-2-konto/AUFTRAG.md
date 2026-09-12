# Phase 2 — Konto-Lebenszyklus

Status: `offen`
Gehört zu: [`../PLAN.md`](../PLAN.md)
Setzt voraus: Phase 1 (`fertig`) — diese Phase schreibt und löscht Daten und
soll gegen bereits gehärtete Regeln laufen

---

## Warum an dieser Stelle

„Konto löschen" ist die technische Voraussetzung für alles Rechtliche aus
Phase 5. Ein Datenschutztext, der ein Löschrecht verspricht, das die App nicht
einlösen kann, ist schlimmer als gar keiner. Deshalb kommt diese Phase vor
Phase 5 — und nach Phase 1, weil Löschen ein Schreibvorgang ist.

## Was getan wird

Grundlage ist der Befund zu Konzept-Abschnitt 4.3.

1. **Durchklicken und dokumentieren:** Registrierung, E-Mail-Bestätigung,
   Anmeldung, Passwort zurücksetzen — als nachvollziehbarer Testlauf, nicht
   als Behauptung.
2. **Konto löschen einschließlich Daten.** Der eigentliche Bauauftrag dieser
   Phase. Das Konto in Firebase Auth **und** die Daten in Firestore müssen weg.
   Dazu gehört die Frage, was passiert, wenn der zweite Schritt fehlschlägt —
   ein halb gelöschtes Konto darf keinen verwaisten Datenbestand hinterlassen.
3. **Private Seiten hinter dem Login.** Prüfen und sicherstellen, dass ohne
   Anmeldung nichts sichtbar ist, was es nicht sein soll.

## Was ausdrücklich **nicht** getan wird

- Kein Bot-Schutz, kein Rate-Limit, kein App Check — `⏳ später`, erst wenn die
  Seite öffentlich ist.
- Kein eigenes Passwort-Handling. Hashing macht Firebase Auth; daran wird
  nichts gebaut.
- Keine Rechtstexte. Die gehören in Phase 5 und stützen sich auf das, was hier
  entsteht.

## Woran diese Phase fertig ist

1. Konto löschen ist gebaut, erreichbar und an einem Testkonto durchgeführt —
   danach ist in Auth **und** Firestore nachweislich nichts mehr übrig.
2. Der Weg ist gegen Versehen abgesichert (Rückfrage vor dem Löschen).
3. Registrierung, Bestätigung, Anmeldung und Passwort-Zurücksetzen sind mit
   Datum als geprüft dokumentiert.
4. `LOGBUCH.md` geführt, `../PLAN.md` auf `fertig` gesetzt.
