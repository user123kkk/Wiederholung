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

## Eigene UX-Sichtung, 22.09.2026 (kein Video — Betreiber-Auftrag „verbessere Design, Animationen, UX-Methoden, wirklich alles, in jedem Tab")

Anders als bei den vier Videos oben gibt es hier keine Quelle zum Filtern —
der Betreiber hat ausdrücklich „mach was du willst … alles was online
besprochen wird über UI/UX" gesagt. Damit das trotzdem der Belegpflicht
dieses Strangs folgt (`AUFTRAG.md`: „ist schon da" muss an Datei/Zeile
belegt sein), wurde die App gegen eine Reihe bekannter UX-Gesetze geprüft
(Hick, Fitts, Jakob, Miller, Doherty-Schwelle, Peak-End,
Ästhetik-Usability-Effekt) statt gegen ein Video. Die App selbst wurde dabei
live angesehen (`stilprobe.html`) und der Code durchsucht (`styles.css`,
`app.js`), nicht nur die Prinzipien abstrakt abgehakt.

**Befund vorweg:** Die App ist nach elf Blöcken (17.–22.09.2026) ungewöhnlich
durchgearbeitet — die meisten Standard-Punkte, die eine erste Sichtung sonst
findet, sind hier schon gebaut. Eine Liste voller „passt, weil noch nicht
gemacht" wäre deshalb erfunden. Was folgt, ist die ehrliche Gegenprobe:
wenig neue Treffer, jeder davon belegt.

| Geprüft | Urteil | Beleg |
|---|---|---|
| Fitts'sches Gesetz — Trefferflächen, Abstand benachbarter Knöpfe | **passt schon** | `--tap: 44px` durchgesetzt (`styles.css:219`), `.dlg-actions button { flex: 1 1 0 }` verhindert schmale Knöpfe (`styles.css:2259`) |
| Hick'sches Gesetz — Klapplisten durch sichtbare Wahl ersetzen | **passt schon** | Block 10 (Stufen-Chips, Speicherkarten-Art-Blatt); Einstellungen als Zeilen statt Kästen seit Block 2 |
| Hick'sches Gesetz — Verwalten-Zeile: Aktionen aus der Liste ins Detail-Blatt | **passt schon** | Block 6/„3.7.1-Nachlese": Stift/Mülleimer pro Zeile entfernt, liegen im Detail-Blatt |
| Jakob'sches Gesetz — Hover-Rückmeldung auf jeder klickbaren Zeile (Desktop-Spalte, `styles.css` Abschnitt 17) | **Lücke gefunden → behoben** | `.card-row[data-action="card-detail"]` hatte `cursor:pointer` (`app.js:7303`) und `:active`, aber kein `:hover` — jeder andere Zeilentyp (`.liste-zeile`, `.pill`, `.seg`, `.stufe-chip`, `.btn-unknown/almost/known`) hatte es schon. Nachgezogen, gleiche `@media (hover: hover) and (pointer: fine)`-Absicherung. **Block 12, v3.7.4.** |
| Jakob'sches Gesetz — dieselbe Prüfung für `.set-row`, `.lekt-kachel`, `.leech-row` | **trifft nicht zu** | `.set-row` und `.leech-row` sind selbst nicht klickbar — nur ihre `.ghost`-Knöpfe darin, die schon Hover haben (`styles.css:945`). `.lekt-kachel` hat gar keine `data-action`, reine Anzeige — ihr fehlt zu Recht kein Hover, ein Hover dort wäre eine erfundene Interaktion. |
| Doherty-Schwelle — Rückmeldung unter ~400ms nach einer Handlung | **passt schon** | Toast, Feld-Fehler, Skelett-artige Sofort-Reaktionen (`:active`-Zustände) überall vorhanden; kein Vorgang ohne sichtbare Reaktion offen (Block 8/9 haben genau das geschlossen) |
| Ästhetik-Usability-Effekt / „Glass"-Tiefe | **passt schon, anders benannt** | `backdrop-filter: blur()` liegt schon auf Kopfzeile, Navigationsleiste und jedem Sheet/Dialog (`styles.css:623,699,766,2226,2535`), dazu `--kante` als Oberkanten-Licht auf jeder erhobenen Fläche (`styles.css:165`). Eine zusätzliche, davon losgelöste „Liquid Glass"-Schicht (großflächige Transparenz/Sättigung auf Karten und Listen) wurde geprüft und verworfen: Sie widerspräche Satz 2 der Gestaltungsregeln (Flächen trennen Inhalt klar, keine durchscheinenden Ebenen übereinander) und der expliziten Linie „kein Kachel-Armaturenbrett". Die App hat die Wirkung von Glas (Licht, Tiefe, Unschärfe an der richtigen Stelle) bereits, ohne den Bruch mit der ruhigen Fläche. |
| Peak-End-Regel / Zählanimation bei großen Kennzahlen (Fortschritt, Startbildschirm) | **geprüft, nicht gebaut** | Wäre reine Zier ohne Funktionsgewinn und ginge gegen eine hart erarbeitete Regel dieses Strangs: `render()` ersetzt `#app` bei jedem Snapshot komplett, und `#app.still-ansicht` verhindert seit 3.6.13 ausdrücklich, dass unveränderte Ansichten erneut animieren (`styles.css:508–528`). Eine Zählanimation bräuchte eigene Zustandsverfolgung über Neuaufbauten hinweg, um nicht bei jedem Snapshot neu loszuzählen — genau die Fehlerklasse, die Block „Seitenwechsel ohne Blinken" (3.6.13) mühsam behoben hat. Kein belegter Nutzen rechtfertigt das Risiko. |
| Skelett-Ladezustände (`.skeleton`, `styles.css:2089`) | **totes CSS, bewusst nicht verdrahtet** | Vollständig gestaltet, aber `grep -i skeleton app.js` findet keinen einzigen Aufruf. Grund: Es gibt genau eine Ladelücke in der App — der Boot-Bildschirm, bevor der erste Firestore-Snapshot da ist (`app.js:4508–4542`) — und die hat schon einen eigenen, markenbewussten Ladezustand (`.boot`, Blüten-Symbol mit Orbit-Animation). Jede Ansicht danach zeichnet aus bereits geladenen Daten; ein Skelett dafür würde ein Problem lösen, das nicht existiert. Nicht entfernt (könnte für einen echten künftigen Anwendungsfall stehen bleiben), aber auch nicht künstlich verdrahtet, nur damit „es benutzt wird". |
| Renderkosten der Verwalten-Liste bei großen Kartenmengen | **bekannt, absichtlich nicht in Block 12** | Schon in 3.6.13 vermerkt: 2356 DOM-Elemente bei 200 Karten, seither nicht angefasst. Eine Virtualisierung wäre ein echter Beitrag zu „Animationen fühlen sich flüssiger an" (Scroll-Ruckeln bei großen Sätzen), ist aber ein Eingriff mit hohem Streuschaden — Ziehen-zum-Sortieren, Mehrfachauswahl und Suche hängen alle an der heutigen, vollständigen DOM-Liste. Das verdient einen eigenen, einzeln geprüften Block, nicht eine Zeile nebenbei in Block 12. Vorschlag für einen möglichen Block 13, siehe `AUFTRAG.md`. |

## Kurzfassung

- **Übernehmen:** ruhige mobile Gestalt, leere Zustände, Smart Defaults,
  sanftes Onboarding, Landing-Conversion (Reziprozität/Goal-Gradient),
  Bottom-Sheets/Bottom-Nav **wo sie helfen**.
- **Nicht übernehmen:** Stack-Wechsel, Dark-Patterns (Verlustaversion),
  erfundene Features, neue Gesten ohne Gewinn.
- **Als Gerüst weglegen (nicht bauen):** Bezahlmodell, Wachstums-/Marketing-Trichter
  → `../monetarisierung/`.
