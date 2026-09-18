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

## A0 · Kernablauf zuerst, Rest später (Präzisierung 18.09.2026)

Betreiber-Klarstellung: **wer welchen Fortschritt hat, ist erstmal
irrelevant.** Kern ist nicht Klassenraum-Verwaltung, sondern ein einfacherer
Ablauf: Jemand, der Freunde/Bekannte unterrichtet, will ihnen das Werkzeug
zum Wiederholen anbieten können — gibt beim Lehren die Inhalte ein (eine
Lektion) und **teilt sie am Ende** (der Lektion, einer Einheit — offen wie
genau). Das Gerüst unten (Rollen, Mit-Admins, Mitgliederverwaltung, Chat)
ist die **Ausbaustufe**, nicht der Einstieg. Der Einstieg wäre eher:

- Lehrperson legt einen Kartensatz/eine Lektion an (kann sie heute schon —
  normale Kartenpflege).
- Am Ende ein Teilen-Schritt, der über den bestehenden Datei-Export
  hinausgeht — z. B. ein Link/Code, über den die Empfänger die Lektion in
  ihr eigenes Konto übernehmen, ohne dass dafür schon ein vollwertiger
  „Klassenraum" mit Mitgliederliste existieren muss.
- Fortschritts-Einsicht des Lehrers je Schüler, Rollen, Chat — **bewusst
  zurückgestellt**, kein Teil des ersten Wurfs. Kann später aus demselben
  Grundgerüst wachsen, ist aber nicht Voraussetzung dafür, dass „das System
  erstmal steht" (Betreiber-Formulierung).

Der Rest dieses Dokuments (A–D) bleibt als **Ausbau-Horizont** stehen, nur
jetzt erkennbar als zweiter Schritt, nicht als das, was zuerst gebaut würde,
sobald der Betreiber den Strang startet.

## A · Grundidee, Ausbaustufe (Stand 18.09.2026, Betreiber-Skizze)

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

## D · Wie vergleichbare Apps Frage 5 lösen (Quizlet, Kahoot, Google
    Classroom) — Betreiber-Einwand vom 18.09.2026: „viele Apps kriegen das
    hin", zu Recht. Kein Sonderfall, den Adrabic allein lösen müsste:

1. **Alterserklärung statt Alterskontrolle.** Bei Registrierung eine
   Selbstauskunft („Ich bin mindestens 16" bzw. das jeweils geltende
   Mindestalter für Einwilligung ohne Eltern, DSGVO Art. 8 in DE = 16). Die
   App muss das nicht überprüfen, nur einholen — anerkannte Praxis, kein
   Graubereich.
2. **Verantwortung geht vertraglich an den Raumbesitzer.** Nutzungsbedingungen
   sagen sinngemäß: „Wer minderjährige Mitglieder in einen Raum aufnimmt,
   ist selbst für eine gültige Einwilligung verantwortlich." Adrabic holt
   sie nicht ein, dokumentiert aber in der Datenschutzerklärung, dass die
   Funktion existiert und was sie speichert.
3. **Datensparsamkeit statt breiter Zugriff.** Ein Raum speichert nur
   Mitgliedschaft + geteilte Kartensätze — nicht automatisch den privaten
   Lernfortschritt jedes Mitglieds. Das verkleinert auch B.2
   (Firestore-Regeln) spürbar gegenüber der ersten Einschätzung.

Damit verschiebt sich Frage 5 von „ob überhaupt lösbar" zu einer konkreten,
kleineren Entscheidung: ob dieser Drei-Punkte-Weg für Adrabic reicht, oder
ob der Betreiber mehr will (z. B. echte Eltern-Einwilligung statt
Selbstauskunft). Ändert nichts an B.5 (Datenschutzerklärung muss ergänzt
werden) — macht den Umfang davon nur kleiner.

**Nachrecherchiert (18.09.2026):** zwei tatsächlich unterschiedliche Muster,
keine reine AGB-Formulierungsfrage:

- **Kahoot vermeidet das Problem architektonisch.** Schüler brauchen **kein
  Konto**, keine E-Mail — Beitritt nur über Spiel-PIN + freien Spitznamen.
  Nur die Lehrperson hat ein echtes Konto, personenbezogene Schülerdaten
  fallen praktisch nicht an ([Kahoot Trust Center](https://trust.kahoot.com/teachers/),
  [Player identifier](https://support.kahoot.com/hc/en-us/articles/360036178314-Player-identifier)).
- **Quizlet baut die volle Compliance-Maschinerie**, weil Schüler dort
  echte, dauerhafte Konten mit eigenem Lernfortschritt haben: unter 13
  (länderabhängig unter 16) ein „Child Account" mit Eltern-E-Mail, Eltern
  müssen per Bestätigungsmail zustimmen, bevor Kinder Kartensätze
  bearbeiten dürfen, und können jederzeit reinschauen/löschen
  ([Quizlet ToS](https://quizlet.com/tos), [Quizlet Privacy Policy](https://quizlet.com/privacy)).

Für A0 relevant: Wenn der Empfänger einer geteilten Lektion **kein neues
Konto** braucht, sondern sie in sein **bestehendes** Adrabic-Konto übernimmt
(dort schon bei der eigenen Registrierung eine Altersangabe gemacht hat),
entfällt ein Teil der Frage „neue Einwilligung fürs Teilen" — die Altersfrage
wäre dann schon durch die normale Registrierung abgedeckt, nicht neu beim
Teilen gestellt. **Das ist ein Architektur-Hinweis, keine Freigabe** — ob
das für Adrabics konkrete Haftungslage reicht, ist weiterhin nicht vom
Agenten zu entscheiden, siehe Grenze unten.

**Ausdrückliche Grenze (18.09.2026, Betreiber-Anweisung):** Der Agent gibt
zu Frage 5 **keine Rechtsberatung** und entscheidet sie nicht — nur
Beobachtung, was vergleichbare Apps tun, kein „das reicht bei euch auch".
Der Betreiber will hier „rechtlich sicher sein, dass nichts geschieht" und
hat den Agenten ausdrücklich gebeten, nur zu warnen, nicht zu empfehlen.
**Frage 5 bleibt deshalb eine harte Sperre**, bis echter anwaltlicher Rat
(Fachanwalt Datenschutz/Jugendschutz) eingeholt wurde — nicht, weil der
Weg aus D falsch wäre, sondern weil das niemand ohne Anwalt final
entscheiden sollte, solange im Impressum eine reale Person (der Vater des
Betreibers) dafür haftet.

## E · Entscheidungen aus der Session vom 18.09.2026

Fragen aus C, durchgegangen — einige entschieden, einige bewusst weiter
offen (kein erzwungenes „irgendwas eintragen"):

- **C1 (Lehrer-Kriterium): entschieden.** Selbsterklärt reicht — wer eine
  Lektion anlegt und teilt, ist damit „Lehrer" dieser Lektion. Kein
  Einladungscode, keine Prüfung.
- **C4 (Teilen-Mechanismus): entschieden, für den Kernablauf A0.** Ein
  In-App-Link/Code statt nur Datei-Export — Empfänger übernimmt die
  Lektion direkt ins eigene Konto. Braucht neuen Code und eine neue
  Firestore-Regel für den geteilten Datensatz (noch nicht entworfen).
  **Präzisiert (18.09.2026): Empfänger braucht dafür sein bestehendes
  Adrabic-Konto** — kein separates „Klassenraum-Konto", keine neue
  Registrierung nur fürs Teilen. Betreiber hat dieser Richtung
  ausdrücklich zugestimmt („ok dann machen wir das"). Grund: die
  Altersangabe ist dann schon durch die normale Registrierung erledigt
  (siehe Kahoot/Quizlet-Vergleich unten), statt neu beim Teilen gestellt
  zu werden.
- **C3 (Chat): entschieden.** Im ersten Baustein **nichts** — kein Chat,
  keine Nachrichten. Bleibt, falls überhaupt, Teil der späteren
  Ausbaustufe.
- **C2 (Mit-Admin-Rechte): bewusst weiter offen.** Betreiber hat ehrlich
  gesagt, dazu noch keine Meinung zu haben — wird nicht erzwungen.
  Mitgenommener Designhinweis: nicht nach jeder Lektion einen „ganzen
  Bereich" an Mit-Admins übergeben (Sorge um Übersichtlichkeit/Kapazität)
  — spricht für einzelne, klar abgegrenzte geteilte Lektionen statt eines
  wachsenden gemeinsamen Bereichs. Einen Raum löschen, wenn alle
  einverstanden sind und er nicht mehr gebraucht wird: unstrittig, „geht".
- **C5 (Minderjährige): nicht entschieden, harte Sperre.** Siehe Kasten
  oben — braucht echten Rechtsrat, keine Agenten-Empfehlung.
- **C6 (Zeitpunkt): entschieden.** Fragen jetzt weiter klären (auch über
  mehrere Sessions), der eigentliche Bau wartet weiter — kein konkreter
  Starttermin.

**Damit ist der Kernablauf (A0) inhaltlich fast entscheidungsreif** — bis
auf Frage 5. Ohne eine Antwort darauf (bzw. eine Einschätzung von einer
tatsächlichen Rechtsquelle) wird **kein** Code für das Teilen von Lektionen
geschrieben, auch nicht für den kleinen ersten Baustein, weil der laut C4
schon eine neue Firestore-Regel bräuchte, die fremden Zugriff auf eigene
Daten ermöglicht — genau der Kern von Frage 5.
