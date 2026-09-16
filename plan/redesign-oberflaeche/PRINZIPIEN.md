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

## Kurzfassung

- **Übernehmen:** ruhige mobile Gestalt, leere Zustände, Smart Defaults,
  sanftes Onboarding, Landing-Conversion (Reziprozität/Goal-Gradient),
  Bottom-Sheets/Bottom-Nav **wo sie helfen**.
- **Nicht übernehmen:** Stack-Wechsel, Dark-Patterns (Verlustaversion),
  erfundene Features, neue Gesten ohne Gewinn.
- **Als Gerüst weglegen (nicht bauen):** Bezahlmodell, Wachstums-/Marketing-Trichter
  → `../monetarisierung/`.
