# Neue Funktionen und Premium – was sich lohnt, was später, was lieber nicht

Stand 25.09.2026. Ausführlich mit Belegen, Aufwand und Quellen:
[`befunde/PRODUKT.md`](befunde/PRODUKT.md). Hier die Kurzfassung für die
Entscheidung. **Nichts davon wird gebaut, bevor der Betreiber „ja" sagt**
(`CLAUDE.md`: Vorschläge sind Fragen; `LEHREN.md` § 1.2: neue Funktionen
gehören dem Betreiber). Die Entscheidungen selbst stehen als Fragen in
[`ENTSCHEIDUNGEN.md`](ENTSCHEIDUNGEN.md) (Kennung `F-…`).

**Grundsatz für alles hier:** Kein Lernkern hinter eine Bezahlschranke
(Abfragen, Richtungen, Serie, Rundengröße). Wenn Geld, dann **Einmalkauf vor
Abo**. Lehrstoff, Ton und religiöser Wortlaut kommen nur vom Betreiber.

---

## Korb 1 – jetzt sinnvoll, kostenlos

| Kennung | Funktion | Warum | Aufwand | Hängt dran | Empfehlung |
|---|---|---|---|---|---|
| **F-1** | **Liste einfügen**: viele Karten auf einmal (Zeilen mit Tab/`;`, auch Text-Export aus Anki/Quizlet), mit Vorschau | Größter Hebel gegen das leere Werkzeug nach der Anmeldung; 30 Wörter kosten heute 30 Blatt-Durchgänge | 1–2 Sessions | nichts Neues an Regeln/Recht | **bauen** |
| **F-2** | **Ohne Harakat abfragen** (Schalter je Runde; nach dem Aufdecken mit Harakat) | Lesen ohne Vokalzeichen ist genau die Fähigkeit, die man für echte Texte braucht; Code halb vorhanden (`SUCH_WEG`) | 1 Session | als Runden-Schalter nichts; religiöse Seite (Quran-Text ohne Zeichen) entscheidet der Betreiber | **bauen, als Runden-Schalter, Vorgabe aus** |
| **F-3** | **Regal „Sätze zum Starten"**: vom Betreiber freigegebene Codes zum Einlösen | Wer über ein Video kommt, hat keinen Code und keinen Stoff | ½–1 Session | Inhalt und Urheberrecht beim Betreiber | **erst, wenn ein eigener, rechtlich freier Satz existiert** |
| **F-5** | **Zweite Richtung** Deutsch → Arabisch (mit Handschrift) | Produktives Abrufen ist schwerer und wird eigens gelernt; neu seit 1.8.0: das Handschrift-Feld ist genau die Brücke | 3–4 Sessions | **Lernlogik**, neue Kartenfelder, Regeln | **ja als nächstes großes Vorhaben mit eigenem Konzept – nicht sofort** |
| F-9 | Lückentext aus dem eigenen Beispielsatz (nur im Üben) | näher am echten Lesen | 1–2 | nichts | zurückstellen, bis Karten Beispielsätze tragen |
| F-10 | Fortschritt als Bild teilen (ohne Tracking) | Wachstum ohne Datenfluss | 1 | nichts | erst mit der neuen Startseite (Phase 6) |

## Korb 2 – später Premium (nur wenn „Geld fließt" beschlossen ist)

Vorher klären (Anwalt/Steuerberater, **keine Rechtsberatung durch den Agenten**):
Der Inhaber ist minderjährig – ein eigenes Erwerbsgeschäft braucht Eltern **und**
Familiengericht (§ 112 BGB); bei Stripe muss ein Erziehungsberechtigter Inhaber
sein. Button-Lösung, Widerruf bei digitalen Inhalten, Kleinunternehmer-Grenzen.

| Kennung | Premium | Warum fair | Empfehlung |
|---|---|---|---|
| **F-7** | **Unterstützen** – ein ruhiger Link, einmalig oder „zahl, was du willst", ohne Freischaltung | kleinster Test, ob überhaupt jemand zahlt; kein Eingriff ins Werkzeug | **bester erster Schritt**, nach Rücksprache Steuer |
| **F-6** | **Kuratierten Kartensatz einmal kaufen** | einmal zahlen, dauerhaft behalten; durch die Regeln wirklich schützbar (eigene Sammlung) | wenn Geld, dann das oder F-4 |
| **F-4** | **Lehrer-Paket** (zeitliche Freigabe, Live-Stand, mehrere Codes, Kurs-Seite) | zahlt, wer den Nutzen hat; keine Schülerdaten | erst, wenn eine Lehrperson „Lehrer gibt frei" regelmäßig nutzt |
| F-8 | Farbvarianten | berührt Lernen nicht | nur als Dankeschön zu F-7 (nicht schützbar) |
| F-11a | Ton vom Betreiber (statische Dateien über Hosting) | Aussprache | nur wenn Aufnahmen da sind |

**Bezahlweg ohne eigenen Server:** Stripe Payment Link mit Konto-Kennung, Freischalten
von Hand in der Konsole (kostenloser Tarif bleibt). Automatik („Run Payments with
Stripe") braucht den Blaze-Tarif und Cloud Functions. Merchant of Record (Lemon
Squeezy/Paddle) nimmt Steuer und Verbraucherrecht ab, kostet mehr. Tabelle in
`befunde/PRODUKT.md`.

**Premium-Fundament – jetzt nur festhalten, nicht bauen:**
1. Berechtigung nie in `users/{uid}` oder `settings` (dort schreibt das Konto
   selbst → jeder schaltet sich frei). Eigene Sammlung `berechtigungen/{uid}`:
   lesen und löschen nur das eigene Konto, anlegen/ändern nur die Konsole.
2. Schützbar ist nur, was auf dem Server liegt (Inhalte). Ein Schalter im Browser
   ist für jeden freischaltbar.
3. Bezahl-Sätze nie über `geteilteLektionen` (jedes bestätigte Konto liest dort
   per Code).
4. Die Konto-Kennung ist der Schlüssel des Kaufs – zwei Anmeldewege = zwei Konten;
   vor dem Verkauf klären.

## Korb 3 – lieber nicht

| Kennung | Idee | Warum nicht |
|---|---|---|
| F-13 | Mehr Statistik gegen Geld | widerspricht „System nicht verraten" (§ 3.5), nicht schützbar |
| F-14 | FSRS statt der Stufen | Lernlogik; ohne gespeicherten Bewertungsverlauf nicht anpassbar; ändert jede Fälligkeit und alle Stufen-Texte |
| F-15 | Vorlesen per Sprachsynthese | maschinell erzeugtes Arabisch (§ 1.6), bei Quran-Wörtern heikel |
| F-16 | Push- oder E-Mail-Erinnerung | braucht Server (Blaze), neuen Datenfluss, eigene Domain; `.ics` deckt den Kern |
| F-17 | Serien-Joker kaufen | macht aus der Serie einen Hebel über Verlustangst |
| F-18 | Freunde/Bestenlisten | Daten über Konten hinweg, Minderjährige, Moderation |
| F-19 | Karten per KI | harte Regel § 1.6 |
| F-20 | Wurzel-/Grammatik-Feld | 3.9.8 schon entfernt (0 von 136 Karten nutzten es) |
| F-11b | Eigene Tonaufnahmen | Blaze + Stimmdaten |
| F-12 | Reihenfolge-Modus (fortlaufende Texte) | eigenes Konzept, Religion und Lernlogik – **wenn, dann kostenlos**, nicht als Premium |
