# Gerüst: Messen, was ankommt (Analytics)

> **ENTFERNT am 24.09.2026 (v3.17.23), auf Wunsch des Betreibers:** „ne dann
> logs dings komplett entfernen bitte, dannn hab ich keine kopfschmerzen, jede
> spur". Grund: Der PostHog-Auftragsverarbeitungsvertrag hätte eigens
> unterschrieben werden müssen, dazu eine offene Anwaltsfrage (§ 25 TDDDG).
> Code, Einstellungs-Schalter, CSP-Eintrag und Datenschutz-Abschnitt sind
> weg; der Schlüssel war nie auf `main`, es wurden nie Daten gesendet. Alles
> darunter ist Vorgeschichte. Falls je wieder gewünscht: Möglichkeit 3
> (Tageszähler ohne Kennung in Firestore) kommt ohne Dienstleister aus.

> **Stand 24.09.2026 (v3.17.0): gebaut, aus bis zum Schlüssel.** Betreiber
> hat Ja gesagt (Datenschutzerklärung darf sich ändern). Werkzeug: PostHog
> (EU), eigener schlanker Sender in `app.js` (Abschnitt „Nutzungsstatistik"),
> Ereignisliste dort im Kopfkommentar. Einschalten: `POSTHOG_KEY` in
> `app.js` setzen. In PostHog danach einrichten (Vorschlag): Trend
> „bildschirm" nach `name`; Trichter `bildschirm` einstieg-0 → einstieg-… →
> `konto_erstellt`; Retention auf `app_start`; Trends `runde_ende`,
> `ueben_start`, `code_einloesen`, `idee_eingereicht`, `hinweis`.
> Die Abschnitte unten sind die Vorgeschichte.
>
> **Rechtsprüfung abgeschlossen (24.09.2026).** `datenschutzerklaerung.html`
> Punkt 15 auf Rechtsgrundlage (Art. 6 Abs. 1 lit. f DSGVO), internationale
> Übermittlung und Formulierungsgenauigkeit geprüft; zwei Textstellen
> präzisiert (Transfer-Mechanismus PostHog Inc. USA, Hash-Formulierung).
> Interne Interessenabwägung geschrieben:
> `INTERESSENABWAEGUNG.md` (mit der Entfernung gelöscht).
> Anwaltliche Bestätigung liegt vor (Betreiber: „mein anwalt sagt dass das
> alles stimmt"). **Verbleibend vor `POSTHOG_KEY`-Aktivierung** (rein
> organisatorisch, keine offene Rechtsfrage mehr): Auftragsverarbeitungs-
> vertrag mit PostHog im Dashboard abschließen, aktuelle Transfer-Grundlage
> (SCC/DPF) dort nachsehen, Datenaufbewahrung im PostHog-Projekt auf ≤ 1 Jahr
> einstellen. Details: `INTERESSENABWAEGUNG.md` Abschnitt 5.

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

## D2. Befund 24.09.2026 (v3.16.0) – warum nichts gebaut ist

`datenschutzerklaerung.html` verspricht wörtlich: „Keine Werbung, kein
Tracking, keine Analyse-Dienste" und „Es findet keine Werbung, kein Tracking
und keine Analyse des Nutzungsverhaltens statt." Jede der Möglichkeiten 1–3
bricht dieses Versprechen, solange der Text so steht. Auf „mach einfach" hat
der Agent deshalb nicht gezählt, sondern die Frage auf ein Ja/Nein
verkürzt (`plan/PLAN.md`, Frage 14). Außerdem: `veroeffentlichen.bat`
deployt nur Hosting – eine neue Firestore-Regel für Zähler müsste einmal
von Hand eingespielt werden.

Bei **Ja** ist der kleinste Bau: Möglichkeit 3 (Tagessummen je Ereignis in
`/statistik/{JJJJ-MM-TT}`, nur Erhöhen um 1, nur angemeldet, niemand liest
per App), dazu ein Absatz in der Datenschutzerklärung (was gezählt wird,
dass nichts einer Person zugeordnet wird) – vorher von jemandem mit
Rechtskenntnis lesen lassen. Der Einstiegs-Trichter (A1) fehlt dann, weil
vor der Anmeldung nicht geschrieben werden kann, ohne die Datenbank für
alle zu öffnen.

## E. Offene Fragen an den Betreiber

1. Welche der Fragen in A sind die wichtigsten zwei?
2. Welche Möglichkeit aus B – und wird dafür rechtlicher Rat eingeholt?
3. Darf die Datenschutzerklärung dafür geändert werden (bisher: „keine
   Tracking-Cookies")?
