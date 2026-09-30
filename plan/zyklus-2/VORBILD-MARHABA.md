# Vorbild: Onboarding der App „marhaba!“ (45 Bildschirmfotos)

Vom Betreiber am 30.09.2026 als Ordner geschickt
(`Downloads\bilder einer app (beispiel app)`, IMG_4510–IMG_4554, iPhone,
10:09–10:13 Uhr). Alle 45 Bilder einzeln angesehen. Auftrag: Muster und
Anregungen notieren, übernehmen, was passt, Pläne daraus machen. **Anregung,
keine Kopie** (LEHREN § 3.6: Vorlagen nie komplett übernehmen). Gebaut wird
im Zyklus 2, Paket B, nach Abgleich mit dem Bestand und Betreiber-Entscheid.

Adrabic hat heute acht Einstiegs-Bildschirme (`app.js`, Kommentar vor
`EINSTIEG_LETZTER`; Plan `onboarding/NEUAUFBAU-3.md`): Willkommen, Ziel,
Hürden, Karte, Schrift, Runde, Anker, Plan, danach Konto.

---

## 1. Ablauf bei marhaba! (Reihenfolge nach Uhrzeit und Fortschrittsbalken)

| Nr | Bildschirm | Was passiert |
|---|---|---|
| 1 | Willkommen | Zeichen, Name, ein Satz, ein schwarzer Knopf „Get started →“. Sonst nur Weißraum |
| 2 | „Where are you starting?“ | zwei Karten (Anfänger / kann lesen), je Titel und Unterzeile; Weiter grau bis gewählt |
| 3 | „Why are you learning Arabic?“ | sieben Ziele, „Choose at least 2“, gewählte Karte wird schwarz mit weißem Haken |
| 4 | Aussage | eine Überschrift und ein Absatz, senkrecht mittig – ein Gedanke pro Bildschirm |
| 5 | „Your path through Arabic“ | Zeitstrahl baut sich Punkt für Punkt auf (6 Bilder: 1 bis 6 Einträge), links Punkte mit Linie, kleine Großbuchstaben „DAY 1“, „1 MONTH“ |
| 6 | „Tap any word to see its meaning“ | echter Text zum Antippen; Blatt von unten mit Wort, Umschrift, Übersetzung; zweites großes Blatt mit Regel, Baum, Beispielen, häufigen Fehlern |
| 7 | „Go deeper than the translation“ | Wurzel und Wörter daraus, als Karten |
| 8 | „Know what you know“ | Beispiel-Kacheln mit Zahlen und Trendpfeilen, Aktivitäts-Raster |
| 9 | „Every word, tracked“ | Ring mit Anteilen, je Wort ein Balken mit Prozent |
| 10 | „Practice with flashcards“ | drei Karten zum Umdrehen, „tap to reveal“ / „tap to flip back“, Punkte darunter |
| 11 | „Real progress, not a fake fluency prediction“ | Fähigkeiten-Leiter mit Symbolen und Balken |
| 12 | Einstufung | 10 Fragen, „~3 minutes“, „Question 2 of 10“, vier Antworten, immer mit „I'm not sure“; kein Zurück-Knopf im Test |
| 13 | Ergebnis | „Your starting level: Level 2“, zwei Sätze Begründung |
| 14 | Leiter persönlich | dieselbe Leiter wie 11, jetzt mit echtem Stand (2 fertig, 14 %, Rest grau) |
| 15 | „Stay on track“ | Erinnerung: Schalter, Stunde, Minute, AM/PM, darunter „Reminder set for 8:00 PM“ |
| 16 | Mitteilungen | System-Abfrage erst **nach** der eigenen Wahl |
| 17 | Bezahlseite | Liste der Leistungen, Stufe, zwei Preise, Erinnerung vor Probeende, Wiederherstellen, Rechtslinks |

## 2. Muster, die tragen

1. **Ein fester Rahmen auf jedem Bildschirm:** runder Zurück-Knopf oben
   links, dünner Fortschrittsbalken über die ganze Breite, große fette
   Überschrift linksbündig, graue Unterzeile, Inhalt, unten ein breiter
   Knopf in Pillenform. Nichts springt zwischen den Bildschirmen.
2. **Knopf gesperrt, bis die Wahl gültig ist** (grau), dann schwarz. Keine
   Fehlermeldung nötig.
3. **Auswahl als Karte mit Umkehrung:** gewählt = dunkle Fläche, heller
   Text, Haken rechts. Sehr klarer Zustand, auch aus dem Augenwinkel.
4. **Ein Gedanke pro Bildschirm.** Aussage-Bildschirme haben nur Überschrift
   und Absatz, senkrecht mittig.
5. **Aufbau Stück für Stück:** Der Zeitstrahl kommt Eintrag für Eintrag,
   nicht auf einmal. Die Bewegung erzählt die Reihenfolge.
6. **Ausprobieren statt erklären:** Wort antippen, Karte umdrehen, Frage
   beantworten, alles schon im Einstieg.
7. **Ehrlicher Ton als Verkaufsargument:** „Real progress, not a fake
   fluency prediction.“
8. **Immer ein Ausweg aus Unsicherheit:** „I'm not sure“ bei jeder Frage.
9. **Zusammenfassung der eigenen Wahl in einem Satz** („Reminder set for
   8:00 PM“), live beim Tippen.
10. **Erst selbst wählen, dann die Systemabfrage** (Mitteilungen). Wer die
    Abfrage vorbereitet bekommt, sagt eher ja.
11. **Wiederholung eines Bildes mit neuem Inhalt:** Die Leiter erscheint
    erst als Versprechen (alles grün), später als eigener Stand. Man
    erkennt sie wieder.
12. **Kleine Großbuchstaben als Etikett** über Werten und Abschnitten
    („TOTAL WORDS“, „ROOT“, „EXAMPLES“) – ruhige Ordnung ohne Linien.
13. **Einheitliche Flächen:** hellgraue Karten mit feinem Rand und großem
    Radius, auf weißem Grund; Schwarz nur für Handlung und Auswahl.

## 3. Was für Adrabic passt – Vorschläge für Paket B

Jede Zeile wird im Zyklus gegen den Code und `onboarding/`-Entscheidungen
geprüft. Was eine frühere Entscheidung berührt, geht als Frage an den
Betreiber (LEHREN § 3.5).

| Muster | Heute in Adrabic (zu prüfen) | Vorschlag | Einschätzung |
|---|---|---|---|
| 1 fester Rahmen | Weiter-Fuß wächst seit 3.17.44 im Fluss mit (LEHREN § 6.1) | Zurück, Balken, Überschrift an **exakt** derselben Stelle auf allen 8 Bildschirmen messen (0 px Sprung) | übernehmen, messen |
| 2 gesperrter Knopf | teils Pflichtwahl (`EINSTIEG_PFLICHT`) | überall gleich: gesperrt statt Meldung | übernehmen, wo es Pflicht gibt |
| 3 Auswahl-Karte | eigene Auswahlform | Kontrast gewählt/ungewählt am Gerät vergleichen; ob Umkehrung zum ruhigen Stil passt, entscheidet der Betreiber | prüfen |
| 5 Aufbau Stück für Stück | Plan-Aufbau auf Bildschirm 7, Leiste auf 1 | Takt und Kurve an marhaba messen (etwa ein Eintrag je 300–400 ms), reduzierte Bewegung: sofort alles | übernehmen als Maßstab |
| 6 Ausprobieren | Beispielkarte umdrehen und bewerten (Bildschirm 3) | vorhanden; prüfen, ob es sich so leicht anfühlt wie dort (ein Tipp, sofortige Wirkung) | Bestand schärfen |
| 7 ehrlicher Ton | „keine erfundene Zahl, keine Wirkungszusage“ steht schon als Regel | passt; kein Übernehmen von Werbesätzen | Bestand |
| 8 „Weiß ich nicht“ | – | nur falls es je Fragen mit richtig/falsch gibt (Einstufung) | später |
| 9 Satz der eigenen Wahl | Wenn-dann-Satz im Anker-Schritt | vorhanden; live beim Tippen prüfen | Bestand prüfen |
| 10 erst wählen, dann System | Erinnerung über `.ics` | passt schon; kein Mitteilungs-Dienst (Datenschutz, Aufwand) | Bestand |
| 11 Bild wiederholen | Weg eines Wortes (Leiste) kommt mehrfach | prüfen, ob die Leiste am Ende „dein Stand“ zeigt | prüfen |
| 12 Etiketten | teils | Regel in der Formatliste (Zyklus § 3.2) festlegen, dann einheitlich | übernehmen nach Regel |
| 13 Flächen | eigene Token | nicht umfärben; nur Einheitlichkeit prüfen | Bestand |

## 4. Was **nicht** passt

- **Bezahlseite, Probeabo, Preise.** Grundsatz `grossplan/FUNKTIONEN.md`:
  kein Lernkern hinter Bezahlschranke, wenn Geld dann Einmalkauf. Außerdem
  Rechtsfragen (Minderjähriger Inhaber).
- **Ziele mit religiösem Inhalt als eigene Liste** („Understand the Qur'an“,
  „Islamic studies“). In Adrabic steht das Ziel im Wortlaut des Betreibers
  und wird **nicht gespeichert** (LEHREN § 2 Punkt 5). Keine neuen Ziele
  ohne ihn.
- **Beispiel-Statistik mit Zahlen, Prozent, Trendpfeilen** (Bild 8, 9).
  Widerspricht „keine Systemzahlen, die die Methode verraten“ und „nichts,
  was eine Zahl als Stillstand liest“ (LEHREN § 6.9, § 7.1). Außerdem sind es
  erfundene Werte.
- **Einstufungstest, Grammatik-Bäume, Wurzeln, Regeln mit Beispielen.**
  Das ist Lehrstoff. Er kommt nur vom Betreiber (LEHREN § 1.6). Als Idee
  nach `grossplan/FUNKTIONEN.md` („später“), nicht bauen.
- **Englisch, „!“ im Namen, Emojis als Symbole.** Adrabic spricht Deutsch,
  ohne Ausrufezeichen im Einstieg, mit eigenen Symbolen.

## 5. Offene Frage an den Betreiber (gesammelt in Phase 2)

- Auswahl-Karten als dunkle Fläche mit Haken (Muster 3) – gefällt Dir das
  für Adrabic, oder soll die ruhigere heutige Form bleiben?
- Soll der Einstieg am Ende einmal **Deinen** Stand in derselben Leiste
  zeigen, die er am Anfang als Weg gezeigt hat (Muster 11)?
