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
- **C2 (Mit-Admin-Rechte): weiter offen, aber Grundmodell jetzt geklärt
  (18.09.2026).** Kein Mit-Admin-Konzept mehr nötig — nur der Ersteller
  braucht zwei einfache Rechte: **einzelnen Zugang sperren** („kicken",
  z. B. weil jemand Ärger macht) und **ganzen Raum löschen** (z. B. weil
  die einmalige Aktion unter Freunden vorbei ist). Beides geht **ohne
  Namen oder sonstige Empfängerdaten**: statt eines einzigen geteilten
  Codes für alle bekommt **jeder Empfänger einen eigenen individuellen
  Code/Link**. Der Ersteller kann einen einzelnen Code sperren (kickt
  genau diese Person, ohne zu wissen, wer sie ist) oder alle Codes auf
  einmal ungültig machen (Raum löschen). Es gibt keine Mitgliederliste,
  keine sichtbaren Namen, keine Rollen — nur Codes mit Status
  gültig/gesperrt.
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

**Korrektur/Vereinfachung (18.09.2026):** Betreiber-Einwand zu Recht — der
In-App-Link (C4) ist **Komfort, nicht Voraussetzung**. Das eigentliche
Bedürfnis „am Ende der Lektion ein Backup/Kartensatz freigeben" deckt der
**bestehende Datei-Export** (`data-action="export-weitergabe"`) schon
vollständig ab: Lehrperson exportiert, verschickt die Datei auf beliebigem
Weg (WhatsApp, Mail, …), Empfänger importiert sie in sein eigenes Konto.
**Kein neuer Code, keine neue Firestore-Regel, kein geteilter Datensatz in
der Datenbank** — die App gewährt dabei zu keinem Zeitpunkt einem Konto
Zugriff auf ein anderes. Damit stellt sich Frage 5 in dieser Minimalform
**nicht**, weil kein Konto-übergreifender Zugriff entsteht — vergleichbar
mit dem Versenden einer PDF-Datei.

**Damit zerfällt A0 in zwei echt unterschiedliche Stufen:**
1. **Minimalversion — heute nutzbar, kein Bauauftrag nötig.** Datei-Export
   reicht für „Lehrer gibt Lektion am Ende weiter". Kein Code, keine
   Rechtsfrage in der bisher diskutierten Form.
2. **Komfortversion — der In-App-Link aus C4.** Bräuchte neuen Code, neue
   Firestore-Regel, und genau deshalb weiterhin echten Rechtsrat (Frage 5),
   *bevor* daran gebaut wird. Bleibt Ausbaustufe, kein akuter Blocker mehr
   für „irgendetwas freigeben können" — nur für die komfortablere Variante
   davon.

**Präzisierung (18.09.2026, nach dem Individualcode-Modell aus C2):** Die
Komfortversion ist mit dem Individualcode-Modell **datensparsamer als
zunächst gedacht** — kein Mitgliederverzeichnis, keine Namen, nur anonyme
Zugangscodes mit Status gültig/gesperrt. Das macht Frage 5 kleiner, aber
**löst sie nicht auf**: Es bräuchte weiterhin eine neue Firestore-Regel, die
jemand ohne Kontobesitz-Nachweis lesend auf einen fremden Datensatz
zugreifen lässt (nur eben ohne Personendaten zu speichern). Ob „kein
gespeicherter Name, aber technischer Zugriff über Kontogrenzen hinweg"
rechtlich unproblematisch genug ist, ist wieder die Sorte Frage, die nicht
der Agent, sondern echter Rechtsrat beantwortet — die Einschätzung wurde
nur leichter zu beantworten, nicht überflüssig.

## F · Vorschläge des Agenten (18.09.2026, auf Bitte des Betreibers)

Eigene Ideen, ausdrücklich als Vorschläge markiert — nichts davon ist
entschieden, nichts davon hebt die Sperre bei Frage 5 auf:

1. **Code-Format: kurz und mündlich teilbar, nicht nur ein Link.** Ähnlich
   Kahoots PIN — ein 6-8-stelliger Code, den man auch am Handy vorlesen
   oder abtippen kann, zusätzlich zu einem Link/QR-Code für Komfort. Passt
   zur „unter Freunden"-Situation besser als eine lange UUID.
2. **Codes laufen automatisch ab** (Vorschlag: 30 Tage, konfigurierbar).
   Reduziert die Angriffs-/Exposure-Fläche unabhängig von der Rechtsfrage
   — ein alter, vergessener Code liegt nicht auf unbestimmte Zeit offen.
   Guter Sicherheits-Default, unabhängig von C5.
3. **Einmal-Import statt Dauerzugriff.** Ein Code erzeugt beim Einlösen
   eine **Kopie** im Konto des Empfängers, keine laufende Verbindung zum
   Original. Kein Live-Sync, keine fortlaufende Leseberechtigung nach dem
   Import — der technische Zugriff endet mit dem einmaligen Kopiervorgang.
   Kleinere Angriffsfläche als ein dauerhaft gültiger Lesezugriff.
4. **Zähler statt Liste.** Falls der Ersteller irgendeine Rückmeldung will
   („wurde das überhaupt benutzt?"), reicht ein simpler Zähler
   („3× eingelöst") — keine Namen, keine Zeitstempel pro Person, kein
   Identitätsbezug. Deckt das Bedürfnis nach Feedback, ohne die
   Datensparsamkeit aus C2 aufzugeben.

Alle vier Punkte verkleinern nur die technische Angriffsfläche und passen
zum bisherigen Individualcode-Modell — sie ändern nichts an der Sperre bei
Frage 5, die weiterhin echten Rechtsrat braucht, bevor die Firestore-Regel
für den kontoübergreifenden Zugriff scharf geschaltet wird.

## G · Umgesetzt: Weitergabe-Knopf für alle geöffnet (v3.5.2, 18.09.2026)

Bei der Recherche kam auf, dass die bestehende Minimalversion
(`export-weitergabe`, Abschnitt A0.1) bisher an eine feste `AUTOR_UID`
gebunden war — sichtbar nur für den Betreiber selbst, mit dokumentierter
Absicht dahinter (Unfallschutz + Kennungs-Kollisionen, siehe `app.js`,
Kommentar über `istAutor()`). Betreiber-Entscheidung: **jetzt für alle
Konten öffnen, kostenlos**, mit dem Gedanken, dass ein späteres
Bezahl-Modell dafür denkbar ist ([`monetarisierung/GERUEST.md`](../monetarisierung/GERUEST.md),
Punkt A.2 — „Abo für Zusatzfunktionen").

**Warum das sicher genug war, um es sofort umzusetzen** (kein Bauauftrag,
keine neue Firestore-Regel, keine Berührung mit Frage 5):
- Die Sorge „aus Versehen geteilt" ist durch den bestehenden
  Bestätigungsdialog in `exportWeitergabe()` abgedeckt (zeigt Kartenzahl,
  Lektionen, gesperrte Karten, bevor die Datei entsteht).
- Die Sorge „Kennungs-Kollision bei satzId" ist durch die
  `istGefuehrt`-Prüfung dort separat abgedeckt: ein importierter Bereich
  lässt sich gar nicht weitergeben, nur ein frisch selbst angelegter mit
  neuer Kennung.
- Es bleibt reiner **Datei-Export** — kein neuer Firestore-Zugriff über
  Kontogrenzen hinweg, also nichts, was Frage 5 berührt.

`istAutor()` gibt jetzt immer `true` zurück, `AUTOR_UID` und der zugehörige
Einrichtungs-Hinweisbanner in `renderMain()` sind entfernt (waren nur für
den alten Zustand gedacht). Veröffentlicht als **v3.5.2** — `APP_VERSION`,
`CACHE_NAME`, `CHANGELOG.md` nach der Liste aus `README.md` nachgezogen.

**Wichtig, damit es nicht mit dem Rest dieses Dokuments verwechselt wird:**
Das ist die Minimalversion (Datei-Export), nicht der Individualcode-/
In-App-Link-Teil aus C4/C2/F. Die Komfortversion bleibt weiterhin gesperrt,
bis Frage 5 mit echtem Rechtsrat geklärt ist.

## H · Neuer Architekturvorschlag: Sender erfährt nichts über Empfänger
    (18.09.2026, Betreiber-Vorgabe)

Betreiber-Anforderung, wörtlich: die Komfortversion soll dem **Gebenden
jedes Recht nehmen, auch nur irgendetwas über den Gegenüber zu erfahren** —
keine Liste, kein Zähler mit Zeitbezug, keine Rückmeldung, wer wann
gelesen/importiert hat. Das ist eine strengere Vorgabe als der bisherige
Vorschlag F.4 (Zähler) und ersetzt ihn.

**Architektur, die das leistet:**
- Die Lektion liegt unter einem Code/Link in einem eigenen, dafür
  vorgesehenen Bereich der Datenbank (nicht im normalen Konto-Datensatz
  des Senders).
- Der Empfänger **liest** darüber — schreibt dabei **nichts** zurück, das
  beim Sender ankommt. Keine Bestätigung, kein Log, kein Zähler.
- Der Empfänger legt sich anschließend selbst eine **Kopie** in sein
  eigenes Konto an, über die ganz normalen, schon bestehenden
  Zugriffsrechte auf das eigene Konto — dafür ist keine neue Regel nötig,
  das kann jedes Konto heute schon mit sich selbst.
- Die einzige **neue** Firestore-Regel: irgendjemand mit dem richtigen
  (schwer erratbaren) Code darf den geteilten Lektion-Datensatz **lesen**.
  Mehr nicht — kein Schreibzugriff für Fremde, keine Identifizierung.

**Warum das die Einschätzung zu Frage 5 verändert, nicht nur verkleinert:**
Wenn der Sender nichts über den Empfänger erfährt — nicht mal anonymisiert
— dann verarbeitet diese Funktion an keiner Stelle personenbezogene Daten
eines Dritten gegenüber einer anderen Person. Es ist näher an „eine Datei
unter einem schwer erratbaren Link veröffentlichen" als an „ein Lehrer
sammelt Schülerdaten". Geteilt wird nur der **Lektionsinhalt** (Vokabeln,
Übersetzungen) — keine Personendaten von irgendjemandem. Das ist ein
strukturell anderer Fall als das, was Frage 5 ursprünglich befürchtete.

**Was trotzdem offen bleibt:**
- Es ist weiterhin eine **neue** Firestore-Regel nötig, die Lesezugriff
  über Kontogrenzen hinweg erlaubt (wenn auch nur auf reinen
  Lektionsinhalt, ohne Personenbezug). Das ist der Teil, den Phase 1
  (`plan/phase-1-datenzugriff/`) bisher ausdrücklich ausschließt — „jedes
  Konto liest nur bei sich selbst". Diese Annahme würde erstmals
  durchbrochen, auch wenn der Bruch selbst harmlos aussieht.
- Ob „kein Personenbezug beim Empfänger, aber technischer Fremdzugriff auf
  einen Datensatz" für Adrabics Fall tatsächlich unproblematisch ist,
  bleibt die Art Einschätzung, die der Agent nicht abschließend trifft —
  siehe Grenze bei Frage 5. Der Unterschied: diese Einschätzung dürfte für
  jeden mit Rechtskompetenz **deutlich schneller** zu treffen sein als die
  vorherige Variante, weil kein Personenbezug mehr im Spiel ist.
- Rate-Limiting/Erraten von Codes: ein Code muss lang/zufällig genug sein,
  dass er nicht einfach durchprobiert werden kann (technische Detailfrage,
  noch nicht entworfen).

**Damit ist H der aktuell bevorzugte Entwurf für die Komfortversion** —
ersetzt den Individualcode-Vorschlag aus C2/F dort, wo er einen Zähler
oder Kick-Mechanismus vorsah, die dem Sender irgendeine Rückmeldung geben
würden. Ein Kick/Sperren einzelner Zugänge (aus C2) ist mit „Sender erfährt
nichts" nur noch eingeschränkt vereinbar — allenfalls „ganzen Code
ungültig machen" (kompletter Widerruf), nicht „einzelne Person kicken",
weil Letzteres voraussetzen würde, einzelne Zugänge unterscheidbar zu
machen. Offen, ob das für den Betreiber wichtig genug ist, um diesen
Widerspruch aufzulösen.

**Entschieden (18.09.2026):** Betreiber „was auch immer am besten ist,
solange sicher und rechtlich nicht gefährlich" — gewählt: **ganzen Code
widerrufen reicht**, kein Kicken einzelner Personen. Volle Anonymität
bleibt erhalten, kein Widerspruch mehr offen.

## I · ABGELÖST (18.09.2026) — Firestore-Code-Entwurf, siehe Abschnitt J

**Dieser Abschnitt ist historisch, der beschriebene Code existiert nicht
mehr in `app.js`.** Betreiber-Einwand: „ich will das so machen dass C5
garnicht nötig ist" — das ließ sich lösen, siehe Abschnitt J unten. Der
Firestore-Ansatz hier (`geteilteLektionen`-Sammlung, `teilCode`-Feld) wurde
komplett durch das Link-Modell ersetzt, das ohne jede neue Firestore-Regel
auskommt. Stehen gelassen als Aufzeichnung, warum der ursprüngliche Weg
nicht der beste war — nicht als Anleitung zum Nachbauen.

## I (alt) · Umgesetzt (vorbereitet, nicht scharf geschaltet): Code-Entwurf in app.js

Auf Betreiber-Wunsch technisch vorbereitet, damit es startklar ist, sobald
Frage 5 geklärt ist — **funktioniert heute absichtlich nicht**, siehe
Kommentarblock „ENTWURF, NICHT SCHARF GESCHALTET" direkt über
`teileLektionCode()` in `app.js`.

- `baueWeitergabeBereich(b, version)` — Inhalt-Baustein aus
  `exportWeitergabe()` herausgezogen, damit Datei-Export und Code-Teilen
  exakt denselben Inhalt erzeugen (keine zweite, abweichende Fassung).
- `verarbeiteImportDaten(data)` — ebenso aus `importBackupFile()`
  herausgezogen, damit Datei-Import und Code-Einlösen dieselbe
  Zusammenführungs-Logik und dieselben Größengrenzen (`IMPORT_MAX_*`)
  benutzen.
- `genTeilCode()` — **kryptographisch zufälliger** Code (`crypto.getRandomValues`,
  nicht `genId()`/`Math.random()`), zehn Zeichen aus einem Alphabet ohne
  0/O/1/I, Format `XXXXX-XXXXX`. Der Code ist hier die einzige
  Zugriffsschranke, deshalb die höhere Sorgfalt als bei normalen
  Dokument-Nummern.
- `teileLektionCode()` — legt `geteilteLektionen/{code}` an (Felder:
  `ownerUid`, `erstelltAm`, `inhalt`) und trägt den Code am Bereich selbst
  ein (`teilCode`, neues Feld). Zeigt danach nur den Code — keine
  Rückmeldung wird je vom Server zum Sender zurückgeschickt.
- `beendeTeilenCode()` — löscht den `geteilteLektionen`-Datensatz und das
  `teilCode`-Feld. Das ist der einzige Widerruf: ganz oder gar nicht,
  passend zur obigen Entscheidung.
- `codeEinloesenStart()` / `codeEinloesen(code)` — liest den Datensatz,
  reicht ihn an `verarbeiteImportDaten()` weiter. Kein Schreibzugriff auf
  den geteilten Datensatz, also kein Signal an den Sender.
- Oberfläche: neue Karten „Per Code teilen" (Einstellungen → Sichern) und
  „Code einlösen" (Einstellungen → Einspielen), beide mit **Entwurf**-Plakette
  sichtbar markiert, damit niemand denkt, es sei fertig.

**Warum das heute nichts kaputt machen kann:** `firestore.rules` ist
**nicht** angefasst — weder das neue Feld `teilCode` in `bereichFelder()`
noch die Sammlung `geteilteLektionen` sind dort eingetragen. Jeder Versuch,
den Entwurf zu benutzen, scheitert serverseitig mit `permission-denied`.
Der exakte Regel-Entwurf, der das freischalten würde, folgt unten — bewusst
nur hier notiert, nicht in `firestore.rules` übernommen, damit ein
versehentliches `firebase deploy` nichts scharf schaltet, was noch nicht
freigegeben ist.

**Regel-Entwurf für später** (in `firestore.rules` einzutragen, sobald
Frage 5 geklärt ist):

```
// In bereichFelder(): 'teilCode' ergänzen
// In bereichWerte(): (!pruefen.hasAny(['teilCode']) || textOderNull(d.teilCode, 20))

match /geteilteLektionen/{code} {
  allow read: if request.auth != null;
  allow create: if request.auth != null
                && request.resource.data.keys().hasOnly(['ownerUid', 'erstelltAm', 'inhalt'])
                && request.resource.data.ownerUid == request.auth.uid
                && request.resource.data.inhalt is map;
  allow delete: if request.auth != null && resource.data.ownerUid == request.auth.uid;
  allow update: if false; // Inhalt ist unveränderlich - nur neu erstellen oder löschen
}
```

Veröffentlicht als Teil von **v3.5.2** zusammen mit der geöffneten
Weitergabe (Abschnitt G) — derselbe Versionssprung, weil der Entwurfscode
inert war und nichts an der Nutzung der bestehenden Funktionen änderte.
**Inzwischen durch Abschnitt J ersetzt, dieser Code ist aus `app.js`
entfernt.**

## J · Umgesetzt und LIVE (v3.5.3, 18.09.2026): Lektion per Link teilen

Betreiber-Vorgabe: „ich will das so machen dass C5 garnicht nötig ist" —
und hat recht behalten. Der Unterschied zu H/I: Statt eines Codes, der auf
einen Datenbank-Eintrag *verweist*, trägt der Link den **ganzen
Lektionsinhalt komprimiert in sich selbst** (im URL-Fragment, alles nach
`#`). Damit gibt es **keine neue Firestore-Sammlung, keinen Lesezugriff
über Kontogrenzen hinweg — strukturell derselbe Fall wie der längst
unbedenkliche Datei-Export**, nur per Link statt Datei. Frage 5 hat hier
buchstäblich nichts, woran sie andocken könnte: es wird nichts
gespeichert, das ein fremdes Konto lesen könnte.

**Wichtig, bevor das als „C5 endgültig erledigt" gelesen wird:** Das gilt
für **diesen konkreten Mechanismus** (Link mit eingebettetem Inhalt), nicht
für die Idee „Komfortversion" im Allgemeinen. Sollte je wieder eine Variante
mit serverseitiger Speicherung gebaut werden (z. B. weil Widerruf oder sehr
große Kartensätze gebraucht werden), gilt die Sperre aus Frage 5 dafür
unverändert.

**Technische Absicherung, damit die Kernaussage stimmt:**
- Das **Fragment**, nicht ein Query-Parameter — alles nach `#` wird vom
  Browser **nie an einen Server geschickt**, taucht also auch nicht in
  Firebase-Hosting-Zugriffs-Logs auf. Ein `?teilen=...` wäre hier der
  falsche, undichtere Ort gewesen.
- Komprimiert mit der eingebauten `CompressionStream`/`DecompressionStream`-
  Browser-API (kein neues Abhängigkeits-Paket — README.md verlangt „kein
  Build-Schritt"), base64url-codiert. Getestet im Browser (Round-Trip,
  auch mit arabischem Text): 40 Karten → 1041 Zeichen Fragment, 100 Karten
  → 2103, 150 Karten → 3097, 200 Karten → 4027. Deshalb
  `TEIL_LINK_MAX_ZEICHEN = 4000` — deckt bequem jede „unter Freunden"-Lektion,
  darüber kommt eine Meldung, die auf den Datei-Export verweist statt
  kaputtzugehen.

**Was das kostet, damit die Entscheidung mit offenen Augen getroffen ist:**
- **Kein Widerruf möglich.** Ohne Datenbank-Eintrag gibt's nichts zu
  löschen — ein einmal verschickter Link funktioniert für immer, genau wie
  eine einmal verschickte Datei heute schon (dieselbe Grenze gilt dort
  längst, niemand hat sie je als Problem gemeldet).
- **Größenbegrenzung** bei sehr großen Kartensätzen (siehe Zahlen oben) —
  mit klarer Meldung statt stillem Scheitern.

**Umgesetzt in `app.js`:**
- `teileLektionLink()` ersetzt `teileLektionCode()` — baut den Link,
  zeigt ihn in einem Dialog zum Kopieren.
- `leseTeilLinkAusHash()` liest `location.hash` **schon beim Laden der
  Seite** (Modul-Top-Level, vor jedem Login) und merkt sich einen Fund in
  `ausstehenderTeilLink`.
- `teilLinkPruefenUndVerarbeiten()` verarbeitet den Fund **erst**, sobald
  `bereiche` wirklich geladen ist (Aufruf am Ende von `datenZusammenbauen()`,
  nicht schon nach `sammlungenStarten()` — dort ist `bereiche` noch `null`).
  Fragt per Dialog nach, bevor irgendetwas importiert wird; räumt den Hash
  danach weg (`history.replaceState`), damit ein Neuladen nicht doppelt
  importiert.
- `linkEinloesenStart()` als Rückweg, falls ein Link nicht direkt angetippt
  wurde (z. B. manuell weitergegeben) — Einstellungen → Einspielen →
  „Link einlösen".
- `baueWeitergabeBereich()` und `verarbeiteImportDaten()` (aus G/I) werden
  unverändert weiterverwendet — Link-Weg und Datei-Weg erzeugen/verarbeiten
  exakt denselben Inhalt, inklusive der bestehenden Nachschub-Erkennung
  über `satzId` (derselbe Kartensatz, neue Version → aktualisiert den
  vorhandenen Bereich beim Empfänger, statt einen zweiten anzulegen).

**Keine Änderung an `firestore.rules` nötig oder vorgenommen** — der ganze
Punkt dieses Entwurfs.

**Nachgezogen (v3.5.4, 18.09.2026): Bedienungs-Politur am Kopieren-Schritt.**
Der Commit, der den Link-Teilen-Dialog auf einen eigenen Dialog-Typ mit
Kopieren-Knopf und Kopiert-Rückmeldung umgestellt hat, war ohne den
Veröffentlichungs-Schritt aus `README.md` eingecheckt (kein `APP_VERSION`-
Hochzählen, kein `CACHE_NAME`, kein `CHANGELOG.md`-Eintrag). Nachgetragen:
`APP_VERSION`/`CACHE_NAME` 3.5.3 → 3.5.4, `CHANGELOG.md` ergänzt. Reine
Politur an J, keine neue Entscheidung, keine Architekturänderung — deshalb
kein neuer Abschnitt, nur dieser Nachtrag.
