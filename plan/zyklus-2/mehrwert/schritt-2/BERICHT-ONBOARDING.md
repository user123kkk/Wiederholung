# Bericht 1: Onboarding (N3, N5) – Stand, Marhaba, Funde

08.10.2026, Stand 3.18.26. **Nur gelesen und gemessen, nichts gebaut.**
Auftrag: `../UEBERGABE-NEUER-CHAT-2026-10-08.md`, Schritt 2.

Geprüft in Chromium (Chrome auf dem Laptop, Firebase-Attrappe, eigener
Server auf Port 8097): 390×844, 390×664, 320×568, iPad 820×1180, Desktop
1440×900; dunkel und hell. Messdaten: `daten/*-gast.log`, Werkzeug
`tour.js`. **Nicht geprüft:** echtes iPhone, echte Mails, wie sich eine
Bewegung anfühlt.

---

## 1. Was am Onboarding gemacht wurde (Antwort auf N3)

1. Seit 3.10.0 (23.09.) ist der Einstieg kein Einstellungs-Assistent mehr,
   sondern acht Bildschirme vor dem Konto: Willkommen, Ziel, Hürden,
   Probekarte, Schrift, Runde, Zeitpunkt, Plan (mit 6,6 s „Dein Plan
   entsteht“). Plan: `plan/onboarding/NEUAUFBAU-3.md`.
2. Bis 3.17.46 kamen Deine Rückmeldungen hinein: kürzere Sätze, kein
   „Überspringen“, keine Zahlen, Karte dreht einmal, ruhigere Bewegung.
3. Zyklus 2, Paket B (3.18.12) hat zwölf Fehler behoben (`befunde/EIN.md`,
   EIN-1 bis EIN-12): unter anderem kam der Wenn-dann-Satz nach dem Konto
   nie an, der Knopf sprang, der fertige Plan ging auf einem Umweg verloren.
4. Aus den Marhaba-Fotos wurde übernommen: fester Kopf (Zurück, Balken,
   Überschrift an derselben Stelle), gesperrter Knopf statt Fehlermeldung,
   Aufbau Stück für Stück, die Leiste am Ende noch einmal als „Dein Stand“.
   Nicht übernommen, von Dir so entschieden (Z17): dunkle Auswahl-Karten.
5. Am 08.10. hast Du zu weiteren Punkten „wie empfohlen“ gesagt. **Davon
   ist noch nichts gebaut** (Abschnitt 3).

## 2. Marhaba im Vergleich (N5)

Die 45 Fotos liegen in `Downloads\bilder einer app (beispiel app)`, nicht
im Repo. Die Auswertung steht in `../../VORBILD-MARHABA.md`; zehn Fotos
habe ich heute noch einmal neben die Adrabic-Fotos gelegt.

| Marhaba | Adrabic heute | Urteil |
|---|---|---|
| Knopf unten steht auf jedem Bildschirm an derselben Stelle | Knopf hängt am Inhalt: 717 px, auf „Zeitpunkt“ 759, auf „Hürden“ je nach Wahl bis 857 (390×844) | größter sichtbarer Unterschied, siehe Fund O-1 |
| ein Gedanke je Bildschirm, viel freie Fläche | Plan-Bildschirm ist 1253 px hoch mit acht Blöcken | Fund O-4 |
| Auswahl kippt auf Schwarz mit Haken | Rand und Haken, ruhiger | bleibt (Z17) |
| Antippen statt erklären (Wort, Karte, Test) | Karte drehen und bewerten | gleichwertig; eine echte Proberunde ist entschieden (Frage 45), nicht gebaut |
| Einstufungstest, Statistik-Beispiele, Bezahlseite | – | passt nicht zu Adrabic (Lehrstoff, erfundene Zahlen, Geld) |
| kein Schimmer, kein Hüpfen; nur Inhalt wechselt | je Tipp vier Bewegungen, Balken schimmert bei jedem Schritt | Fund O-3 |

## 3. Entschieden, aber noch nicht gebaut

| Nr. | Was | Beleg, dass es fehlt |
|---|---|---|
| E-11 | Plan: die zwei Wege zu Karten vor die Leiter, doppelter Satz weg | Wege stehen nach der Leiter (`app.js` 7957–7975) |
| E-12 | Zurück-Taste/-Geste im Einstieg, mit Gerätetest | kein `popstate`/`pushState` in `app.js` |
| E-13 | Einstieg ruhiger: Balken-Schimmer und Doppelungen weg | `einstieg-schimmer` läuft bei jedem Schritt (gemessen) |
| 45 | Proberunde direkt nach dem ersten Bildschirm | braucht Karten von Dir (freigegeben ist ein Wort) |
| 47 | Schriftgröße und Rundengröße raus aus dem Einstieg | beide Bildschirme sind da |
| 49 | Google über dem E-Mail-Formular | Google steht unter „oder“ |
| 19 | Buchstaben-Satz | fehlt; siehe Fund O-2 |

## 4. Funde

**O-1 (mittel) – Im iPhone-Browser liegt „Weiter“ oft unter dem Rand.**
Ein Fremder öffnet den Link in Safari; dort sind rund 664 px sichtbar, nicht
844 (das gilt nur für die installierte App). Gemessen bei 390×664,
Unterkante des Knopfs: Hürden 713 (schon ohne Wahl, kein Knopf zu sehen),
Runde 687, Zeitpunkt 755. Bei 320×568 passt nur ein Bildschirm.
- Dafür, es zu ändern: Der Knopf ist das Einzige, was man auf jedem
  Bildschirm braucht. Marhaba hält ihn fest.
- Dagegen: Der feste Fuß wurde in 3.17.44 mit Grund entfernt (er lag über
  Auswahl und Echo). 664 px ist meine Näherung, kein Gerätewert.
- Urteil: nicht zum festen Fuß zurück. Stattdessen die Bildschirme kürzen:
  Hürden hat sechs Zeilen, davon drei zweizeilig; mit Frage 47 fallen zwei
  Bildschirme ganz weg. Vorher am iPhone in Safari nachsehen, ob es stört.

**O-2 (mittel) – Der Einstieg verspricht Buchstaben, die es nicht gibt.**
Wer „Ich lese Arabisch noch schlecht oder gar nicht“ wählt, liest „Dann
fang bei den Buchstaben an.“ und später „große Schrift, Buchstaben als
Karten“ (`app.js` 1477–1479). Nach dem Konto ist die App leer. Bis der
Buchstaben-Satz (Frage 19) da ist, stimmt der Satz nicht (LEHREN § 7.2).
Den Wortlaut legst Du fest; mein Vorschlag wäre, nur die große Schrift zu
nennen, bis es den Satz gibt.

**O-3 (niedrig) – Viel Bewegung je Tipp.** Jede Wahl startet gleichzeitig
Blitz (600 ms), Hüpfer am Zeichen (480 ms), Haken (200 ms) und Echo
(460 ms). Jeder Schrittwechsel: Inhalt gleitet (280 ms), Zeilen kommen
einzeln (bis 675 ms), der Balken schimmert bis 1250 ms. Das ist E-13,
entschieden, nicht gebaut.

**O-4 (niedrig) – Der Plan zeigt denselben Weg zweimal untereinander.**
„Dein Stand“ (Leiste mit fünf leeren Punkten) steht direkt über der
Leiter, die denselben Weg mit Worten zeigt.
- Dafür, eines zu streichen: „nichts doppelt“; der Plan wird kürzer, der
  Knopf rückt näher.
- Dagegen: „Dein Stand“ hast Du am 01.10. so entschieden (Z18).
- Urteil: Leiter behalten, „Dein Stand“ dort weglassen. Deine Entscheidung.

**O-5 (niedrig) – Die Leiste hat fünf Punkte und vier Wörter.** Unter dem
zweiten Punkt steht nichts; in der Leiter heißt er „im Lernen“.

**O-6 (niedrig) – 6,6 Sekunden Zwangspause.** „Dein Plan entsteht …“ lässt
sich nicht abkürzen; danach laufen bis 3,4 s Bewegung, „Plan speichern“
blendet erst nach 1,1 s ein. Du wolltest den Aufbau bewusst lang (3.17.22).
Urteil: lassen, aber ein Tipp auf den Bildschirm könnte ihn überspringen.

**O-7 (Zahl) – Weg bis zur ersten eigenen Karte.** 13 Tipps und die
Pause bis zum Formular, dann drei Felder, eine Mail, dann „Erste Karte
anlegen“ mit zwei Feldern. Mit Frage 47 fallen zwei Bildschirme weg.

## 5. Ohne Fund

- Alle acht Schritte, Konto, Anmelden, Passwort: kein Querscrollen, keine
  Fehler in der Konsole, auf allen fünf Größen.
- Zurück, Balken und Überschrift stehen auf den Fotos (390 px) auf jedem
  Schritt gleich.
- iPad 820×1180: Knopf auf allen Schritten an derselben Stelle (Unterkante
  1053). Desktop 1440×900: wandert auf „Hürden“ je nach Wahl von 773 bis 873.
- Texte am Bild gelesen: keine Einzahl-/Mehrzahl-Fehler, kein Englisch.

## 6. Vorschlag für die Reihenfolge (nicht entschieden)

1. Klein, sofort: O-2 (ein Satz, Wortlaut von Dir), O-5.
2. Ein Paket „Einstieg ruhiger“: E-13, E-11, O-4.
3. Mit Paket O (braucht Deine Karten): Fragen 45, 47, 49. Erst danach O-1
   neu messen, weil zwei Bildschirme wegfallen.
4. E-12 allein, mit Gerätetest.
