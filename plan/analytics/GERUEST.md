# Gerüst: Messen, was ankommt (Analytics)

Stand 24.09.2026. **Kein Bauauftrag** – ein Gerüst mit Fragen, wie
`monetarisierung/GERUEST.md` und `lehrer-modus/GERUEST.md`.

Betreiber am 24.09.2026: „um zu wissen wie und was gut ankommt, sind
analytics nötig, das bitte notieren, ist ein riesen projekt meine ich."

Er hat recht, und das hier ist der Grund: Alles, was bisher „premium" gemacht
wurde, ist aus Mustern, Messungen am eigenen Bildschirm (Sprünge, Kontrast,
Bewegung) und seinem Urteil entstanden – nicht aus dem Verhalten echter
Nutzer:innen. Ob der Einstieg durchgespielt wird, wo Leute abbrechen, ob
jemand nach drei Tagen wiederkommt: Das weiß heute niemand.

## A. Was wir wissen wollen (Fragen vor Werkzeugen)

1. **Einstieg:** Wie viele beginnen ihn, an welchem Schritt steigen sie aus,
   wie viele legen danach ein Konto an? (Trichter pro Schritt)
2. **Erste Woche:** Kommt, wer ein Konto angelegt hat, am 1., 3., 7. Tag
   wieder? (Rückkehr-Kohorten D1/D3/D7/D30)
3. **Kern:** Wie viele Runden werden begonnen – wie viele zu Ende gebracht?
   Wo wird abgebrochen (Karte x von y)?
4. **Funktionen:** Wer nutzt Üben, Schreiben, Merken, Kartensatz per Code,
   Sichern? Was nutzt niemand (Kandidat zum Vereinfachen, Hick)?
5. **Reibung:** Wie oft Rückgängig, wie oft „Neu laden" beim Laden, wie oft
   Fehlermeldungen (Sync, Anmeldung)?

## B. Möglichkeiten

| | Was | Vorteil | Haken |
|---|---|---|---|
| 1 | **Firebase/Google Analytics** | fertig, Trichter & Kohorten eingebaut | Cookies/Gerätekennung → **Einwilligung** nötig (§ 25 TDDDG), Banner, Datenübermittlung an Google, CSP erweitern; widerspricht dem bisherigen „keine Tracking-Cookies" der Datenschutzerklärung |
| 2 | **Cookielose Zählung** (Plausible/Umami, EU-gehostet oder selbst betrieben) | ohne Gerätekennung, schlank, oft ohne Banner vertretbar | Kohorten nur grob; ob „ohne Einwilligung" hier gilt, ist **Rechtsfrage** (wie J1); Kosten/Betrieb; CSP + Datenschutzerklärung |
| 3 | **Eigene Zähler in Firestore** – nur Summen je Ereignis und Tag, ohne Nutzerkennung | keine dritte Firma, passt zur Architektur (Browser ↔ Firestore) | Regeln müssen Schreiben auf Zähler erlauben (Missbrauch begrenzen), keine Kohorten ohne Kennung, eigene Auswertung |
| 4 | **Qualitativ** – die vorhandene Liste „Ideen & Vorschläge", 5-Minuten-Tests mit 3–5 echten Nutzer:innen, einmalige Frage nach der 3. Runde | sofort möglich, zeigt das *Warum* | zeigt keine Mengen |

Aufzeichnen von Sitzungen (Hotjar & Co.) scheidet aus: widerspricht dem
„nicht invasiv"-Grundsatz (`PLAN.md`, 18.09.2026).

## C. Empfehlung des Agenten (Entscheidung beim Betreiber)

Zuerst **4** (kostet nichts, sofort), dann **3** für A1/A3/A4 als reine
Tagessummen ohne Kennung. **1** nur, wenn Kohorten (A2) unverzichtbar werden –
dann mit Einwilligung und angepasster Datenschutzerklärung. Vor 2 oder 3:
dieselbe rechtliche Prüfung wie J1 (Speichern/Lesen auf dem Gerät, § 25
TDDDG), keine Rechtsberatung durch den Agenten.

## D. Was es schon gibt

- `verlauf` im Nutzerdokument: je Tag Wiederholungen (w) und neue Karten (n)
  – das ist Nutzungsstatistik **pro Konto**, nicht über alle Konten.
- Das Board „Ideen & Vorschläge" (`plan/feedback-board/`).

## E. Offene Fragen an den Betreiber

1. Welche der Fragen in A sind die wichtigsten zwei?
2. Welche Möglichkeit aus B – und wird dafür rechtlicher Rat eingeholt?
3. Darf die Datenschutzerklärung dafür geändert werden (bisher: „keine
   Tracking-Cookies")?
