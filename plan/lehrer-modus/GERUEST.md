# Gerüst: Lehrer-/Schülermodus mit Klassenräumen

Ein Platz für die Fragen, nicht für Antworten. Nichts hier ist entschieden
oder gebaut. Betreiber-Wunsch (18.09.2026): „ein Gerüst, das immer weiter
ausgebreitet werden kann" — damit die Idee nicht jede Session neu durchdacht
werden muss, aber auch nicht vorschnell gebaut wird.

**Warum das noch nicht gebaut wird**, siehe `plan/PLAN.md`, Abschnitt „Später"
— vier Gründe, die weiter gelten: fasst das Lernwerkzeug an, ist keine
Antwort auf die akute Landing-Page-Frage, betrifft in aller Regel
Minderjährigen-Daten (Elterneinwilligung, Auftragsverarbeitung, im Impressum
haftet der Vater des Betreibers), und bricht die heutige Firestore-Grundannahme
„jedes Konto liest/schreibt nur bei sich selbst" auf.

---

## A · Grundidee (Stand 18.09.2026, Betreiber-Skizze)

- Ein Konto kann einen oder mehrere **Klassenräume** anlegen und wird damit
  automatisch dessen Besitzer — **keine geprüfte „ist wirklich Lehrer"-Instanz**.
  Technisch nicht verifizierbar ohne externe Institution (Schule) im
  Hintergrund; das ist bei Adrabic anders als bei Astra AI, wo eine Schule
  Zugänge vorab verteilt. Missbrauch wäre ein Melde-/Moderationsproblem,
  kein technisches.
- **Mehrere Klassenräume pro Besitzer**, mit eigenen Mitgliedern je Raum.
- **Rollen/Rechte konfigurierbar pro Raum**, nicht global — Betreiber-Idee:
  „ich kann Rollen vergeben oder whatever Einstellungen für verschiedene
  Räume, Admin für wen aus diesem Raum". Also: Besitzer kann eine oder
  mehrere Personen im Raum zu Mit-Admins machen, mit eigenen Rechten
  (z. B. Kartensätze hinzufügen, Mitglieder einladen/entfernen — welche
  Rechte genau, offen).
- **Chat/Nachrichtenfunktion**, bei der (mindestens) der Admin schreiben
  kann — Betreiber: „chat vielleicht wo admin was schreibt, IDK". Noch
  offen ob: reiner Broadcast vom Admin an alle Mitglieder, oder echter
  Chat mit Antwortmöglichkeit, oder beides je nach Rolle.
- **Weitergabe/Backup** von Kartensätzen an den Raum — teils schon heute
  ohne Klassenraum möglich (`data-action="export-weitergabe"`, Datei-Export).
  Offen: ob ein Klassenraum das ersetzt/ergänzt, oder ob Export als
  Datei ausreicht und kein „geteilter" Kartensatz in der Datenbank
  gebraucht wird.

## B · Bausteine, die das bräuchte (nur benannt, nicht geplant)

1. **Datenmodell** — z. B. `klassenraeume/{id}` mit Unter-Sammlungen für
   Mitglieder, Rollen, Nachrichten. Nicht entworfen, nur als Ort markiert.
2. **Firestore-Regeln neu** — heute: ein Konto liest/schreibt nur bei sich
   selbst. Ein Klassenraum bräuchte Regeln, die kontrolliert lesen (und je
   nach Rolle schreiben) über Kontogrenzen hinweg erlauben, ohne fremde
   Lernstände offenzulegen. Das ist inhaltlich Phase 1 noch einmal.
3. **Rollenverwaltung UI** — Besitzer/Admin/Mitglied unterscheiden, pro
   Raum konfigurierbar. Umfang unklar (feste drei Rollen? frei benennbare
   Rechte?).
4. **Chat/Nachrichten** — eigener Baustein, in der App bisher nicht
   vorhanden in irgendeiner Form.
5. **Rechtlicher Unterbau** — Elterneinwilligung bei Minderjährigen,
   Auftragsverarbeitungsvertrag-Frage, Löschkonzept für Rauminhalte,
   Ergänzung der Datenschutzerklärung. Das ist der Teil, der am längsten
   dauert und am wenigsten mit Code zu tun hat.

## C · Offene Fragen (nur der Betreiber entscheidet)

1. Wie wird „Lehrer" überhaupt definiert — reicht „legt einen Raum an" als
   Kriterium, oder braucht es eine Art Bestätigung/Einladungscode?
2. Wie weit dürfen Mit-Admins gehen — dürfen sie Mitglieder rauswerfen,
   Kartensätze löschen, andere zu Admin machen?
3. Chat: Broadcast, Vollchat, oder erstmal gar nichts (nur Kartensatz-
   Weitergabe ohne Kommunikationskanal)?
4. Reicht der bestehende Datei-Export als „Weitergabe", oder soll ein Raum
   Kartensätze live teilen (Änderungen kommen bei allen an)?
5. Wie wird mit Minderjährigen in Räumen umgegangen — Mindestalter für
   Mitgliedschaft, Eltern-Einwilligung, oder wird der Modus zunächst auf
   Erwachsene beschränkt, um die Rechtsfrage klein zu halten?
6. Zeitpunkt: bleibt es bei „später", oder gibt es einen konkreten Anlass
   (der Betreiber kennt Leute mit Schülern), der es vorzieht?

Solange Frage 1 (und in ihrer Konsequenz 5) offen ist, bleibt dieser Strang
`zurückgestellt` — wie bei `monetarisierung/GERUEST.md` gilt: kein Bau, bis
der Betreiber einen Punkt ausdrücklich startet.
