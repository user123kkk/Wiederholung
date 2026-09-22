# Was aus den drei Videos passt — und was nicht

Der Filter für diesen Strang. `KONZEPT.md` §7 warnt ausdrücklich davor,
Video-Ratschläge ungeprüft zu übernehmen. Jeder Punkt bekommt ein Urteil:
**passt** · **passt teilweise** · **passt nicht (jetzt)**. „Passt nicht" wird
begründet abgelegt, nicht weggelassen (`KONZEPT.md` §7).

Diese App ist: ein Karteikarten-Werkzeug (arabischer Wortschatz, Quran-Bezug),
Vanilla JS/CSS ohne Server, dunkel-zuerst, Marken-Gold `#e3c88a`, bewusst ruhig
und minimal (kein „Kachel-Armaturenbrett", siehe `styles.css` Abschnitt 12),
für den Betreiber und zwei Freunde — **kein Geldfluss, kein Publikum, kein
Zeitdruck** (`KONZEPT.md` §1).

---

## Video 1 — Mobile UI

| Prinzip | Urteil | Für diese App |
|---|---|---|
| Ein Screen macht eine Sache | **passt** | Ist schon die Philosophie der App. Beim Redesign halten, nicht verwässern. |
| Karten als Grundbaustein, keine Doppel-Verschachtelung | **passt** | Wird schon genutzt; „padding auf padding" aktiv vermeiden. |
| Pro Abschnitt eine Scroll-Richtung | **passt** | Gute Leitlinie fürs mobile Layout. |
| 44px-Ziele, Typo auf Mobil nicht schrumpfen | **passt** | Prüfen und angleichen; Ziehgriff war mit 28px zu schmal (siehe `beobachtungen-lernwerkzeug.md`). |
| Bewusste leere Zustände (Erststart, Kein-Treffer) | **passt** | Stärkster Einzelgewinn. Erster Eindruck + Suche ohne Treffer. |
| Bottom-Navigation (3–5, schwebend) | **passt teilweise** | Nur wenn es die heutige Navigation wirklich verbessert — erst Ist-Zustand ansehen, nicht reflexhaft ersetzen. |
| Bottom-Sheets für Aktionen im Kontext | **passt teilweise** | Gut für „Karte anlegen"/„Satz wählen"; nicht überall erzwingen. |
| Gesten (Wischen, Long-Press) | **passt teilweise, VORSICHT** | App hat schon Wisch-Bewerten + Long-Press-Ziehgriff. Genau diese Gesten waren wackelig (v3.0.35–42). **Keine neuen Gesten ohne echten Gewinn** — sonst neue Zuverlässigkeitsprobleme. |

## Video 2 — Vibe Coding / Geld verdienen

| Prinzip | Urteil | Für diese App |
|---|---|---|
| Idee validieren, „Originalität ist tot", Pain-Point wählen | **passt nicht (jetzt)** | Das Produkt existiert und trifft einen echten Bedarf. Rat gilt für **neue** Produkte. Nur als Kontext. |
| Stack: Next.js / React Native / Supabase / Clerk / Stripe | **passt nicht** | App ist Vanilla + Firebase — läuft. `KONZEPT.md` §7 warnt genau vor Server-App-Rat. **Supabase-Wechsel wäre ein Rewrite ohne Anlass.** Stripe nur relevant fürs spätere Bezahl-Gerüst. |
| Rate-Limits, Row-Level-Security, Keys nicht im Frontend, Secrets serverseitig | **passt teilweise (erledigt)** | Datenzugriff wurde in Phase 1/3 über `firestore.rules` gehärtet. Kein neuer Bau, nur Verweis. |
| Distribution: UGC/TikTok, faceless Slideshows, Micro-Influencer, bezahltes Boosten | **passt als Gerüst** | Gehört zum Trichter TikTok → Landing → App, den `landing-page-strategie` schon kennt. Sammelplatz: `../monetarisierung/GERUEST.md`. |
| Monetarisierung / „5.000 €/Monat" | **Gerüst** | `KONZEPT.md` §2: Abo/Bezahlung **später, nicht verbauen**. Kein Bau jetzt — nur Struktur in `../monetarisierung/`. |

## Video 3 — UX-Psychologie

| Prinzip | Urteil | Für diese App |
|---|---|---|
| Smart Defaults (häufigste Wahl vorausfüllen) | **passt** | Für Formulare/Einstellungen (Oberfläche, nicht Lernlogik). |
| Goal-Gradient / nie bei 0 % starten | **passt (Onboarding/Landing)** | Erststart und erster-Karte-Fluss als Fortschritt rahmen. |
| Reziprozität / Wert vor Anmeldung geben | **passt (Landing)** | Deckt sich mit der schon getroffenen Entscheidung „Dein Stoff, nicht unserer — Neue legen ihre erste Karte selbst an" (Strategie 2.1). |
| IKEA-/Endowment-Effekt (selbst gebaut = wertvoller) | **passt teilweise** | Erste eigene Karte vor dem Konto anlegen lassen. Fügt sich in obige Landing-Entscheidung. |
| Verlustaversion („du verlierst X", Countdown, „I'll risk it") | **passt nicht / VORSICHT** | Dark-Pattern-Ton. Für ein ruhiges Lernwerkzeug unter Freunden manipulativ und markenfremd. Die App hat schon eine sanfte Serie/Streak — das reicht. |
| Kontrast-Effekt (Anker-Preis) | **passt nicht (jetzt)** | Es gibt keine Preise. Nur fürs spätere Bezahl-Gerüst vormerken. |

---

## Video 4 — Bottom Navigation (uxpeak, „Top UI/UX Design Tips — How to Design a
Great Bottom Mobile Navigation Bar", 22.09.2026 vom Betreiber gebracht)

Geprüft gegen den heutigen Stand der Navigationsleiste (`app.js:4942`
`navLeiste()`, `styles.css` ab Zeile 670) — die schon aus **Video 1** dieses
Strangs entstand (v3.1.0, v3.3.0/3.3.1). Deckt sich deshalb an vielen Stellen
mit dem, was schon gebaut ist.

| Prinzip | Urteil | Für diese App |
|---|---|---|
| 3–5 Tabs, max. 6 | **schon umgesetzt** | 3 Tabs (Lernen, Fortschritt, Verwalten), `app.js:4943–4947`. |
| Schlechte Kandidaten (Hilfe, Abmelden, Rechtliches) draußen halten | **schon umgesetzt** | Keiner davon steht in der Leiste; Einstellungen/Abmelden liegen woanders. |
| Kein Logo/Zurück-Knopf aus der Kopfzeile in der Bottom-Nav | **schon umgesetzt** | `.nav__brand` (Logo) ist unter 900px per CSS ausgeblendet (`styles.css:740`), nur am Handy relevant. |
| Sichere Zone/Home-Indicator respektieren, Leiste schwebt darüber | **schon umgesetzt** | `bottom: calc(var(--space-3) + var(--sab) - var(--vv-gap,0px))`, eigene Kommentarspur zu iOS-Messfehlern (`styles.css:670–702`). War genau der Punkt aus Video 1 („Navigationsleiste schwebt", Block 6). |
| Trefferfläche ≥ 44×44px | **schon umgesetzt** | `--nav-h: 64px` (`styles.css:214`) über drei gleich breite Spalten — deutlich über 44px. |
| Aktiv/Inaktiv mit mind. zwei visuellen Änderungen | **schon umgesetzt, übertroffen** | Aktiver Tab: gefülltes statt umrissenes Icon + Akzentfarbe + eigene Pillenfläche (`app.js:4973`, `styles.css:722–727`) — drei Änderungen statt der geforderten zwei. |
| Ein Icon-Stil außer im aktiven Zustand | **schon umgesetzt** | `ikon(t.icon, aktiv ? "voll" : "")` — Umriss normal, gefüllt nur aktiv (`app.js:4973`), exakt der Video-Tipp. |
| Kurze einzeilige Beschriftung | **schon umgesetzt** | „Lernen", „Fortschritt", „Verwalten" — je ein Wort. |
| Icon 24px, Beschriftung 10–12px | **schon umgesetzt** | Icon 25px (`styles.css:718`), Label `--fs-micro` = 11,7px (`styles.css:187`) — beides im empfohlenen Bereich. |
| Wenige, ruhige Farben statt bunter Tabs | **schon umgesetzt** | Nur `--text-3` (inaktiv) und `--accent` (aktiv) — kein Tab hat eine eigene Farbe. |
| Sichtbare Trennung zur Fläche darunter (Rand/Schatten) | **schon umgesetzt** | `border: 1px solid var(--border)` + `box-shadow: var(--kante), var(--shadow-lg)` + Weichzeichner-Hintergrund (`styles.css:683–689`). |
| Tipp-Rückmeldung (Micro-Interaction beim Antippen) | **schon umgesetzt** | `.nav__tab:active .i { transform: scale(0.9) }` (`styles.css:728–729`). |
| Benachrichtigungspunkt für Fälliges | **schon umgesetzt, bewusst ruhiger** | Ein reiner Punkt ohne Zahl (`.nav__dot`, `app.js:4975`) statt Zähler — passt zur Linie „keine Countdown-/Zahlen-Dringlichkeit" oben (Video 3, Verlustaversion). Nicht ändern. |
| Gleitender Indikator beim Tab-Wechsel (statt Hart-Umschalten) | **passt, gebaut (Block 11, v3.7.3)** | Betreiber-Entscheidung 22.09.2026: bauen. Aktive Fläche bekommt beim Tab-Wechsel `data-glide="vor"`/`"zurueck"` (`app.js:4942` ff., Richtung aus dem noch nicht aktualisierten `letzterReiter`) und eine kleine `@keyframes`-Eintrittsbewegung (`styles.css`, `nav-glide-vor`/`nav-glide-zurueck`, 10px) — folgt demselben Muster wie `enter-vor`/`enter-zurueck` für den Seitenwechsel. |
| Zentraler CTA-Knopf in der Leiste (z. B. „Anlegen") | **passt nicht (bewusst)** | Die App hat schon einen Weg zum Anlegen (Knopf „Karte anlegen" auf Verwalten, `app.js:7003`), erreichbar in einem Tipp. Ein vierter, hervorgehobener Nav-Knopf wäre ein **erfundenes Bauteil** ohne echten Bedarf — widerspricht der Drei-Tab-Ruhe dieser App (`PRINZIPIEN.md` Kopf: „bewusst ruhig und minimal"). |

**Fazit:** Diese Video-Ideen sind zum größten Teil schon am 17.–19.09.2026
umgesetzt, weil Video 1 im selben Strang dieselbe Quelle (Bottom-Nav-Design)
schon einmal abgedeckt hat. Der gleitende Wechsel-Indikator war die einzige
echte Lücke — als Block 11 gebaut, siehe oben und `LOGBUCH.md` (22.09.2026,
v3.7.3).

## Kurzfassung

- **Übernehmen:** ruhige mobile Gestalt, leere Zustände, Smart Defaults,
  sanftes Onboarding, Landing-Conversion (Reziprozität/Goal-Gradient),
  Bottom-Sheets/Bottom-Nav **wo sie helfen**.
- **Nicht übernehmen:** Stack-Wechsel, Dark-Patterns (Verlustaversion),
  erfundene Features, neue Gesten ohne Gewinn.
- **Als Gerüst weglegen (nicht bauen):** Bezahlmodell, Wachstums-/Marketing-Trichter
  → `../monetarisierung/`.
