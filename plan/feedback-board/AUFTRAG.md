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
Produktideen, nicht um Daten von Minderjährigen). Trotzdem: Wer im Impressum
haftet (der Vater des Betreibers, 16), haftet auch für das, was auf einem
öffentlichen Board steht. Deshalb ein eigener, kurzer Auftrag statt eines
Direkt-Baus mitten in einer Session mit fünf anderen Themen.

## Vorgeschlagenes Modell (Vorschlag, keine Entscheidung — siehe „Offen")

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
- **Moderation:** Löschen eigener Einträge für jedes Konto; Status ändern
  und fremde Einträge löschen nur für den Betreiber (`AUTOR_UID`-Muster gibt
  es nicht mehr seit v3.5.2 — braucht eine neue, einfache Lösung, z. B. eine
  feste UID-Liste in den Regeln, wie an anderer Stelle im Lehrer-Gerüst
  diskutiert).

## Offen — Bauentscheidungen, noch nicht getroffen

1. **Wo im Tab-Aufbau?** Eigener vierter Reiter (bricht die Drei-Reiter-Logik
   von `REITER_FOLGE`, `app.js`) oder ein Unterpunkt in Einstellungen (wie
   heute „Fehler melden")?
2. **Ersetzt das Board „Fehler melden", oder stehen beide nebeneinander?**
   Ein Fehlerbericht („Login geht nicht") passt schlecht in eine öffentliche,
   hochvotbare Liste — beides parallel wäre naheliegend, aber das ist eine
   Gestaltungsentscheidung.
3. **Datenschutzerklärung:** Abschnitt 10 (Kontakt-/Fehlerformular) müsste um
   das Board erweitert werden, sobald es Text von Nutzer:innen dauerhaft und
   öffentlich speichert statt einer einmaligen E-Mail.
4. **Text-Länge/Moderation gegen Missbrauch** (Beleidigungen, Spam-Links) —
   reicht „Betreiber kann löschen", oder braucht es eine Vorprüfung?

**Nächster Schritt:** Eine der vier Fragen oben mit dem Betreiber klären
(oder alle vier auf einmal), danach `firestore.rules` + Oberfläche in einem
eigenen, testbaren Block bauen — nicht nebenbei in einer Session mit anderen
Themen.
