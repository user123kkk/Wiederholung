# Auftrag: Öffentliches Feedback-Board mit Voting

Neuer Nebenstrang, angelegt 22.09.2026. Betreiber-Wunsch, ausgelöst durch ein
TikTok-Video (Erfahrungsbericht: ein öffentliches Board mit Abstimmen
brachte mehr echte Rückmeldung als E-Mails, ein hochgevotetes Feature —
Foto-Tracking — wurde daraufhin gebaut und von 70 % der Nutzer verwendet).

## Vorgeschichte — eine frühere Einschätzung war ungenau

Am 19.09.2026 wurde dieselbe Idee (damals TikTok-Idee 3 von 8) als „nicht
relevant" eingestuft, Begründung: „würde einen neuen Server/Datenbankmodell
brauchen" (`phase-1-datenzugriff/LOGBUCH.md`). Das stimmt nicht: Firestore
ist längst da. Ein Board braucht eine neue Sammlung + Regeln + Oberfläche,
keinen neuen Server. Die frühere Einschätzung war einer Verwechslung mit den
anderen TikTok-Ideen (die für Amy/Ellie/Luna gedacht waren, nicht für
Wiederholung) geschuldet, nicht einer echten technischen Grenze.

**Am 22.09.2026 per `AskUserQuestion` entschieden: „Öffentliches Board mit
Voting"** — nicht nur ein verbessertes privates Formular. Damit ist der
Umfang gesetzt; offen sind nur noch die Bauentscheidungen unten.

## Was sich dadurch ändert — der Grund für einen eigenen Auftrag statt eines Direkt-Baus

Das heutige „Fehler melden" (Phase 8, `mailto:`) ist **privat**: der Text
geht als E-Mail an den Betreiber, niemand sonst sieht ihn. Ein öffentliches
Board ist eine andere Kategorie — **von Nutzer:innen geschriebener Text, für
alle sichtbar**, dazu neu: eine Firestore-Sammlung, die nicht mehr „jedes
Konto liest/schreibt nur bei sich selbst" ist (dieselbe Grundannahme, die
beim Lehrer-Gerüst zur Sperre führte — hier aber harmloser: es geht um
Produktideen, nicht um Daten von Minderjährigen). Wer im Impressum haftet,
haftet auch für das, was auf einem öffentlichen Board steht (der Betreiber
selbst ist volljährig, siehe Korrektur vom 22.09.2026 in `../PLAN.md`; das
Tool läuft trotzdem unter dem Namen einer anderen Person im Impressum).
Deshalb ein eigener, kurzer Auftrag statt eines Direkt-Baus mitten in einer
Session mit fünf anderen Themen.

## Status: gebaut (v3.8.4, 22.09.2026)

Gebaut und gegen den echten Firestore-Emulator geprüft — 132 von 132
Prüfungen, davon 26 neu für dieses Board (`plan/phase-1-datenzugriff/
regeln-pruefung.mjs`, F01–F26). Details, inklusive eines dabei gefundenen und
behobenen echten Regel-Fehlers, im Logbuch: `redesign-oberflaeche/LOGBUCH.md`.
Die vier „Offen"-Punkte unten sind damit beantwortet (1, 2) bzw. bewusst
vertagt (3, 4) — siehe dort für die Begründung je Punkt.

**23.09.2026: Konto-ID eingetragen, `istFeedbackModerator()` fertig.**
Gegen den Emulator erneut geprüft (132/132). **Nicht fertig, solange der
Betreiber diesen Schritt offen hat:** `firebase deploy --only
"firestore:rules"` — ohne den Deploy gilt weiterhin die alte, live
deployte Regel ohne die `feedback`-Sammlung, das Board lädt dann mit
`permission-denied`.

## Modell (wie gebaut)

- **Neue Sammlung `feedback/{id}`:** `text` (Titel, kurz), `beschreibung`
  (optional, länger), `erstelltAm`, `votes` (Zahl), `status` (`offen`/
  `geplant`/`umgesetzt`/`abgelehnt` — vom Betreiber gepflegt, macht das Board
  zu einer Konversation statt einer toten Liste, genau der Punkt aus dem Video).
  **Keine `erstelltVon`-uid gespeichert.** Damit entsteht gar keine Datenspur,
  wer welchen Vorschlag eingereicht hat — niemand kann auf Nutzerdaten der
  anderen zugreifen, keine rechtlichen Fragen entstehen („wer hat das gepostet,
  dürfen wir ihn kontaktieren?"). Strukturelle Lösung statt Trick.
- **Sammlung `feedback/{id}/votes/{uid}`:** ein Dokument pro Konto und
  Eintrag, verhindert Mehrfach-Voten über die Regeln selbst (Existenzprüfung),
  nicht über Anwendungslogik. Wird nicht sichtbar gemacht.
- **Sichtbar ist nur `text`/`beschreibung`/`votes`/`status`/`erstelltAm`.**
  Keine uid, kein Name, keine E-Mail. Löst dieselbe Linie wie das Lehrer-Gerüst
  konsequent um: „nicht invasiv", keine Daten-Sammlung über Nutzer:innen,
  ohne den Kern (öffentliche Liste, Voting) zu verlieren.
- **Anlegen erfordert ein bestätigtes Konto** (`request.auth != null &&
  request.auth.token.email_verified == true`, wie überall sonst in
  `firestore.rules`) — kein anonymes Posten, damit Spam/Missbrauch dieselbe
  Hürde hat wie der Rest der App.
- **Moderation:** NUR der Betreiber kann Status ändern und Einträge löschen
  (`istFeedbackModerator()` in `firestore.rules`, feste Konto-ID-Liste —
  `AUTOR_UID`-Muster gibt es nicht mehr seit v3.5.2, das ist eine neue,
  eigene Liste). **Kein „eigenen Eintrag löschen"** — ohne gespeicherte uid
  lässt sich „eigen" nicht nachweisen, das ist der Preis für die echte
  Anonymität oben, keine vergessene Funktion.

## Offen — inzwischen entschieden bzw. bewusst vertagt

1. **Wo im Tab-Aufbau? Entschieden: Einstellungen, wie „Fehler melden".**
   Kein vierter Reiter — das hätte `REITER_FOLGE` (app.js) und das
   Drei-Reiter-Wischen aus Block 17 angefasst, für eine Funktion, die nicht
   zum täglichen Lernablauf gehört.
2. **Ersetzt das Board „Fehler melden"? Entschieden: nein, beide stehen
   nebeneinander** (Einstellungen → Hilfe). Ein Fehlerbericht mit Kontaktweg
   passt schlecht in eine öffentliche, hochvotbare Liste — unterschiedliche
   Zwecke, unterschiedliche Bauteile.
3. **Datenschutzerklärung — erledigt am 23.09.2026.** Neuer Abschnitt 6
   „Feedback-Board", siehe `phase-5-recht/LOGBUCH.md`. **23.09.2026,
   Nachtrag:** Betreiber wollte ausdrücklich möglichst wenig persönliche
   Betriebspflicht („wie große Firmen, wo die oberen nichts erreicht") —
   der ursprüngliche Text versprach eine bespoke „kontaktier uns mit dem
   genauen Wortlaut"-Löschhilfe, die es rechtlich gar nicht braucht: der
   allgemeine Rechte-Abschnitt (Punkt 13) deckt jede echte DSGVO-Anfrage
   ohnehin ab, und §§ 8–10 DDG (Host-Provider-Privileg, siehe Impressum)
   verlangen ausdrücklich KEINE laufende Überwachungspflicht — nur Tätigwerden
   bei konkretem Hinweis. Text entsprechend entschärft, kein Rechtsverlust.
4. **Missbrauchs-Vorprüfung — bewusst vertagt.** Heute: nur „Betreiber kann
   löschen" (reaktiv). Bei drei Nutzer:innen kein akutes Problem; wird erst
   relevant, wenn das Board öffentlich beworben wird — dann gemeinsam mit
   Punkt 3 klären, nicht vorher spekulativ bauen.

**Nächster Schritt:** Betreiber trägt die eigene Konto-ID in
`istFeedbackModerator()` ein und deployt (siehe „Was Du noch tun musst" in
der Session-Antwort), testet am echten Gerät. Danach, vor einer echten
Bewerbung des Boards: Punkt 3 und 4 oben klären.
