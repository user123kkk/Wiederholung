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
