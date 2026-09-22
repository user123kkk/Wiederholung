# Gerüst: Monetarisierung & Wachstum

Ein Platz für die Fragen, nicht für Antworten. Nichts hier ist entschieden oder
gebaut. Wenn der Betreiber einen Punkt starten will, wird daraus ein eigener Auftrag.

---

## A · Was überhaupt Geld bringen könnte (Entscheidungspunkte)

1. **Bezahlter Kartensatz** — z.B. Medina Buch 1 als kuratierter Satz. Hängt an offener
   Frage 4 im `KONZEPT.md` (öffentlich vs. privat unter Brüdern). Solange die nicht
   entschieden ist, ist alles Weitere hier blockiert.
2. **Abo für Zusatzfunktionen** — würde voraussetzen, dass es Funktionen gibt, die ein
   Abo rechtfertigen, ohne das Werkzeug für die jetzigen Nutzer zu verschlechtern. Offen.

   **Konkrete Kandidaten, vom Betreiber genannt (23.09.2026) — nur gesammelt, nichts
   entschieden, nichts gebaut:**

   - **Code-Teilen / Lehrer-Gerüst.** Heute kostenlos für alle offen (v3.5.2,
     Betreiber-Entscheidung), von Anfang an mit dem Gedanken versehen, dass ein
     Bezahl-Modell dafür später denkbar ist —
     [`lehrer-modus/GERUEST.md`](../lehrer-modus/GERUEST.md), Abschnitt G.
     Bliebe das kostenlose Kernstück bestehen und nur eine Ausbaustufe (Rollen,
     Mitgliederverwaltung, Chat — Abschnitte A0/E dort) hinter ein Abo? Nicht
     entschieden.
   - **Quran-Ayat in Reihenfolge lernen.** Eigene Lern-Betriebsart neben der
     heutigen Wiederholung nach Stufen, siehe
     [`../beobachtungen-lernwerkzeug.md`](../beobachtungen-lernwerkzeug.md),
     Punkt 20. Fasst die Lernlogik an — bräuchte bei Verfolgung ohnehin ein
     eigenes Konzept, unabhängig von der Bezahlfrage.
   - **Kosmetische Anpassung des Erscheinungsbilds** — vom Betreiber nur als
     Richtung benannt, ausdrücklich noch ohne eigenes Konzept: Farbvarianten
     oder Muster, mit denen man die Oberfläche für sich persönlich gestalten
     kann. Erster Anstoß kam aus einer Beobachtung bei „Arabily" (einer
     anderen App, siehe auch `phase-5-recht/LOGBUCH.md` zu Funktionen, die
     von dort NICHT übernommen wurden) und einem Vergleich mit Minecrafts
     Rüstungsverzierung (Netherit-Rüstung + verschiedene Erze/Muster ergeben
     unterschiedlich aussehende Verzierungen) — beides ausdrücklich nur als
     Ausgangspunkt, nicht als Vorlage: Betreiber will „sogar was anderes".
     Stünde im Spannungsfeld mit Satz 1 der Gestaltungsregeln
     (`styles.css`: „genau eine gefüllte Akzentfläche") — wie sich
     personalisierbare Farbigkeit damit verträgt, ist eine offene
     Gestaltungsfrage, kein Premium-Feature-Zuschnitt, der sich heute schon
     bauen ließe.
3. **Einmalkauf / „Pay what you want"** — leichter mit dem ruhigen Ton der App vereinbar
   als eine Abo-Schranke. Offen.
4. **Lehrer-Konzept** — steht in `plan/PLAN.md` unter „Später" (YouTube-Playlist,
   Bezahlmodell). Größtes eigenes Vorhaben, gehört strukturell hierher.

## B · Was gebaut sein müsste, BEVOR Geld fließt (nicht jetzt)

- Konto-Löschung: **schon da** (Phase 2). Voraussetzung für alles Rechtliche — erfüllt.
- Rechtstexte: Impressum + Datenschutz **schon da** (Phase 5). Bei Bezahlung müsste
  Datenschutz um Zahlungsdaten ergänzt und ein Widerrufs-/AGB-Text hinzukommen. Offen.
- Zahlungsanbindung: Stripe wäre der übliche Weg. **Achtung Stack:** Die App hat keinen
  Server; Stripe braucht entweder Stripe-gehostete Checkout-Seiten (kein eigener Server
  nötig) oder eine kleine Serverfunktion (z.B. Firebase Functions — neuer Baustein).
  Das ist eine echte Architekturfrage, keine Kleinigkeit. Offen.
- Steuer/Recht beim Geldempfang (Kleinunternehmer? Rechnungen?) — Betreiber-Sache, kein
  Agent-Thema.

## C · Wachstum / Distribution (aus Video 2, nur beschrieben)

- Trichter: **TikTok/Kurzvideo → Landing → App.** Die Landing-Seite dafür ist der Job
  von `landing-page-strategie` + `redesign-oberflaeche`, nicht von hier.
- Formate: eigene Kurzvideos (UGC), freigestellte Slideshows, ggf. Micro-Influencer.
  Es gibt schon einen Skill für Video-Karten (`adrabic-karte`) — Werkzeug ist da.
- Bezahltes Boosten erst, wenn organisch etwas zieht — und erst, wenn es überhaupt
  etwas zu verkaufen gibt (siehe A). Vorher verbrennt es nur Geld.
- **Reihenfolge, die Sinn ergibt:** erst A klären (womit Geld) → dann B (rechtlich/
  technisch tragfähig machen) → dann C (Reichweite). C zuerst ist der häufige Fehler.

## D · Offene Fragen (nur der Betreiber entscheidet)

1. Soll überhaupt Geld fließen — oder bleibt Adrabic ein Werkzeug für sich und Freunde?
   (`KONZEPT.md` §1 sagt heute: kein Geldfluss.)
2. Falls ja: welcher Weg aus A?
3. Medina-Kartensatz öffentlich oder privat? (blockiert A1, steht im `KONZEPT.md` §6)
4. Marke oder Person nach außen? (steht in `landing-page-strategie`, färbt jeden
   Bezahl-/Wachstumsauftritt)

Solange 1 „nein/unklar" ist, bleibt dieser ganze Strang `zurückgestellt`.

## E · Was einer „fertigen", wachstums-/geldreifen App noch fehlt (Sammlung, 23.09.2026)

Betreiber-Auftrag: „schauen was noch fehlt für eine App... wirklich alles
was gut ist bzw. profitabel, Paywalls auch wichtig so, aber noch nicht
einsetzbar." Reine Bestandsaufnahme — **nichts hier wird gebaut**, bis ein
Punkt ausdrücklich gestartet wird (wie überall in diesem Gerüst). Jeder
Punkt sagt auch, was schon da ist, damit nichts doppelt gebaut wird.

1. **Onboarding — existiert schon als eigener Strang, wartet auf Betreiber.**
   [`../onboarding/AUFTRAG.md`](../onboarding/AUFTRAG.md), Fragen E1/E3/E4
   offen. Kein neuer Punkt, nur die Erinnerung, dass er nicht vergessen ist.
2. **Nutzungsbedingungen (AGB) + Widerrufsbelehrung.** Fehlen komplett — heute
   nur Impressum + Datenschutz (Phase 5, `fertig` für eine **kostenlose**
   App). Sobald irgendein Weg aus Abschnitt A startet (auch „Pay what you
   want"), braucht es beides, dazu die Datenschutzerklärung um
   Zahlungsdaten ergänzt (steht schon unter B, hier nur verknüpft).
3. **Zahlungsanbindung — konkretisiert.** Drei Wege, die zum „kein eigener
   Server"-Grundsatz passen, mit wachsendem Aufwand:
   - **Spenden-/PWYW-Link** (z. B. Ko-fi, PayPal.me) — kein Code, kein
     neuer Baustein, sofort machbar, verkauft aber keine Funktion.
   - **Stripe Checkout (gehostete Seite)** — kein eigener Server nötig,
     Stripe übernimmt PCI-Pflichten; die App bräuchte nur einen Knopf, der
     zur Stripe-Seite verlinkt, und einen Weg zurück, der den Kauf
     freischaltet (das „Freischalten" selbst braucht wieder eine Instanz,
     die dem Konto vertrauenswürdig ein Merkmal setzt — siehe nächster
     Punkt).
   - **Freischalt-Problem, unabhängig vom Zahlungsweg:** Ohne eigenen
     Server kann `firestore.rules` nicht selbst prüfen, ob wirklich bezahlt
     wurde — das bräuchte entweder eine Firebase Cloud Function (Stripe-
     Webhook schreibt ein Feld, das die Regeln lesen) oder eine manuelle
     Pflege durch den Betreiber (kleine Nutzerzahl, macht das am Anfang
     vertretbar, skaliert aber nicht). Echte Architekturentscheidung, kein
     Detail.
4. **Weiterempfehlung/Referral — kein Konzept, nur die Beobachtung, dass es
   fehlt.** Bewusst OHNE Tracking-Zwang zu denken (Datenschutz-Grundsatz
   „kein Tracking" bleibt): z. B. ein einfacher Teilen-Link auf `landing.html`
   mit einer eigenen Ankunftsseite („von X eingeladen"), ohne
   Empfänger-Kennung zu speichern — ähnlich nicht-invasiv wie das
   Link-Teilen im Lehrer-Gerüst. Nichts entschieden.
5. **Offene Spannung: keine Nutzungszahlen, keine datengestützten
   Entscheidungen.** Die App verarbeitet bewusst keine Analyse-Daten
   (Datenschutz Punkt 2/10). Das ist eine bewusste, dokumentierte
   Entscheidung — hier nur als Spannung festgehalten, nicht als Empfehlung,
   sie zu kippen: Ohne jede Zahl lässt sich schwer sagen, welches Feature
   (z. B. Feedback-Board, Lehrer-Gerüst) tatsächlich genutzt wird. Eine
   privatsphärefreundliche Zwischenlösung (z. B. ein einzelner, aggregierter
   Zähler pro Bildschirm ohne Personenbezug, kein Cookie, keine IDs) wäre
   technisch denkbar, ist aber selbst eine Abwägung, die nur der Betreiber
   treffen kann.
6. **App-/Play-Store — bewusst weiterhin zurückgestellt**, siehe
   `../PLAN.md` Abschnitt „Später". Vorteil des heutigen PWA-Wegs: keine
   15–30 % Store-Gebühr auf einen späteren Verkauf — ein Grund, der für
   „vorerst web-only bleiben" spricht, nicht nur Trägheit.
7. **Erinnerungen/Push-Benachrichtigungen — bewusst NICHT erneut
   vorgeschlagen.** Bereits am 16.09.2026 geprüft und abgelehnt
   (`../PLAN.md`). Bliebe das auch für eine Bezahlversion so, oder wäre das
   ein denkbarer Bezahl-Anreiz („Serie-Erinnerung nur im Abo")? Nicht vom
   Agenten zu entscheiden — nur als Frage notiert, falls Abschnitt A jemals
   startet.

**Nächster Schritt:** Keiner. Wenn der Betreiber einen der sieben Punkte
vertiefen will, wird daraus wie überall in diesem Gerüst ein eigener
Auftrag.
