# Bericht 2: Aussehen und Bewegung über alle Bildschirme (N2, N6)

08.10.2026, Stand 3.18.26. **Nur gelesen und gemessen, nichts gebaut.**
Auftrag: `../UEBERGABE-NEUER-CHAT-2026-10-08.md`, Schritt 2.

## Wie geprüft wurde

- 13 Rundgänge mit `tour.js` (341 Schritte), dazu `tour2.js` (Blätter,
  Menüs, Dialoge) und `austritt.js` (Bild für Bild). Größen: 390×844,
  390×664 (iPhone im Browser, Näherung), 320×568, iPad 820×1180, Desktop
  1440×900; dunkel und hell; volles Konto, leeres Konto, Gast.
- Je Schritt: Foto, Seitenhöhe, Querüberlauf, Fehler in der Konsole, alle
  laufenden Animationen mit Name, Verzögerung und Dauer. Daten: `daten/`.
- Fotos angesehen: Handy dunkel (alle Bildschirme), leeres Konto, 320 px,
  390×664 Einstieg. iPad, Desktop und hell nur über die Messwerte.
- Chromium auf dem Laptop, Firebase-Attrappe. **Nicht geprüft:** echtes
  iPhone, das Gefühl einer Bewegung, „Texte auswendig lernen“ (gesperrt
  bis 29.10.), D13/D15 (zurückgestellt).

Ergebnis vorweg: kein Querüberlauf, kein Konsolenfehler, keine Sackgasse in
341 Schritten. Die Funde unten sind Feinheiten, keiner ist kritisch.

---

## A. Bewegung

**A-1 (hoch) – Blätter gleiten beim Schließen nicht, sie springen weg.**
Bild für Bild gemessen (`daten/austritt.log`): Das Blatt „Karte anlegen“
steht bei 361 px, im nächsten Bild bei 868 px (außerhalb), 200 ms später
wird es entfernt. Dazwischen gibt es keine einzige Zwischenlage. Gleich bei
Bereichs-Blatt, Abmelden-Dialog, und bei allen drei Wegen (Knopf, Escape,
Tippen daneben). Das Öffnen gleitet sauber (280 ms).
- Das sollte seit 3.18.14 (D1) behoben sein. Der Test dazu
  (`t_paket_d.js`, D1) verlangt nur „irgendein Bild mit Verschiebung“; das
  erfüllt auch ein Sprung. Er kann den Fehler nicht finden.
- Vermutete Ursache (nicht gemessen): `spielAustrittsAnimation`
  (`app.js` 14802) setzt im selben Schritt `animation: none`, die
  Übergangsregel und das Ziel. Dieselbe Falle steht in LEHREN § 15 beim
  Toast (D11, 03.10.).
- Am iPhone ansehen, bevor gebaut wird: Blatt öffnen, „Fertig“ tippen.
  Gleitet es nach unten oder ist es einfach weg?

**A-2 (mittel) – „Üben“ und „Speicherkarten“ klappen ohne Bewegung auf.**
In Verwalten springt die Kartenliste in einem Bild um 496 px („Üben“) bzw.
778 px („Speicherkarten“) nach unten und beim Schließen zurück. Kein
Einblenden, kein Gleiten. Das sind die härtesten Wechsel in der App.

**A-3 (mittel) – Einstellungen spielen ihren Eintritt bei jeder Rückkehr.**
Wer aus einer Unterseite zurückkommt, sieht Profil und fünf Zeilen jedes
Mal neu einfliegen (7 Animationen, 475 ms). Fortschritt macht es richtig:
dort läuft bei der Rückkehr nur eine Bewegung (280 ms).

**A-4 (niedrig) – Hinweis wegtippen: kein Übergang.** Der Hinweis ist
sofort weg (0 Animationen). Die Karte darunter blieb in der Messung
stehen; es ruckt also nichts, es fehlt nur das Ausblenden.

**A-5 (niedrig) – Fortschritt startet 18 Animationen auf einmal**
(11 Einblendungen, dazu Kacheln und Zeilen, 590 ms). Unter
CPU-Drosselung nicht neu gemessen; am Gerät ansehen, ob es flimmert.

**A-6 (Ordnung) – Keine einheitlichen Zeiten.** `styles.css` hat 60
Bewegungen (`@keyframes`) und rund 45 verschiedene Zeitwerte direkt in den
Regeln (300 ms elfmal, 130 ms sechsmal, 420, 900, 380, 320 …). Die vier
dafür gedachten Zeit-Namen (`--dur-…`) kommen nur 53-mal vor. Bei den
Kurven dasselbe: 119-mal die eigene (`--ease-out`), 59-mal die eingebaute
(`ease-out`), 12-mal `ease`. Das Video (Punkt 5, „strenge Einheitlichkeit“)
meint genau das. Sichtbar ist es als: jede Stelle bewegt sich ein wenig
anders.
- Dafür, aufzuräumen: ein Tempo für klein, mittel, groß; neue Stellen
  passen von selbst.
- Dagegen: Viele Werte sind bewusst abgestimmt (Karte 540 ms, Aufbau
  820 ms). Ein Umbau aller Zeiten braucht den vollen Lauf und bringt für
  sich nichts Sichtbares.
- Urteil: nicht als eigenes Paket. Regel für Neues (nur die vier Zeiten und
  eine Kurve), Bestand nur dort angleichen, wo ohnehin gebaut wird.

**A-7 (Zahlen) – Wie lange was dauert** (Handy, bis die letzte Bewegung
endet):

| Stelle | Animationen | Ende nach |
|---|---|---|
| Lernen beim Start | 9 | 1010 ms |
| Tab Fortschritt | 18 | 590 ms |
| Tab Verwalten | 7 | 500 ms |
| Einstellungen auf | 7 | 475 ms |
| Unterseite auf/zu | 1 | 280 ms |
| Blatt auf | 2–8 | 280 ms |
| Runde: Start | 4 | 520 ms |
| Runde: Aufdecken | 9–10 | 540 ms |
| Runde: Bewerten | 7 | 520 ms |
| Rundenende | 11 | 2300 ms |
| Einstieg: Schrittwechsel | 5–14 | 1250–1900 ms |
| Einstieg: eine Wahl | 14–16 | 600 ms |
| Einstieg: Aufbau | 17 | 6620 ms |

Die Runde ist am ruhigsten und am einheitlichsten. Der Einstieg ist am
unruhigsten (Bericht 1, O-3). Endlos liefen in den Rundgängen nur das
Ladebild und das Zeichen beim Plan-Aufbau, nichts in der App selbst.

## B. Platzierung

**B-1 (mittel) – Fortschritt, „Genauer ansehen“:** Die Zeile „Lektionen ·
Medina Buch 1“ bricht auf zwei Zeilen um, rechts steht abgeschnitten
„2 von 3 einmal g…“ (390 px). Der Wert rechts ist das, was man wissen will.

**B-2 (mittel) – Lektionen bei 320 px:** „Lektion 2“ und „Lektion 3“
werden zu „Lektio…“ gekürzt, sobald der Haken davorsteht, obwohl der
Balken daneben Platz hätte. Bei echten, längeren Namen trifft das auch
390 px.

**B-3 (niedrig) – Lernrunde: Karte sitzt oben, darunter 225 px leer.**
Über der Karte sind 120 px, zwischen Karte und „Merken“ 225 px (844 hoch).
Der Platz ist für die Notiz reserviert, damit nichts springt. Bei Karten
ohne Notiz wirkt die Karte nach oben gerutscht.
- Dafür, es zu ändern: Die Karte ist der Mittelpunkt des Bildschirms.
- Dagegen: Jede Lösung, die die Karte je nach Notiz versetzt, bringt den
  Sprung zurück (3.17.29).
- Urteil: so lassen. Höchstens die Karte um 40–50 px tiefer setzen, für
  alle Karten gleich. Kein eigener Auftrag.

**B-4 (niedrig) – Rundenende und leere Zustände nutzen die obere Hälfte.**
„Geschafft“ endet bei 580 von 844 px, die untere Hälfte ist leer; ebenso
Lernen im leeren Konto. Das wirkt ruhig, nicht falsch. Kein Auftrag.

**B-5 (niedrig) – Suchfeld bei 320 px:** Platzhalter endet mit „Wort,
Übersetzung oder“. Kürzerer Platzhalter für schmale Geräte.

**B-6 (niedrig) – Verwalten, leeres Konto:** Oben der große Knopf „Karte
hinzufügen“, darunter der leere Zustand mit „Kartensatz per Code“ und
„Datei einspielen“. Drei Wege auf einem Bildschirm; in Ordnung, weil es
genau die drei Wege zu Karten sind.

**B-7 (kein Fund) –** „Leertaste“, „1“, „2“, „3“ auf den Knöpfen der Runde
erscheinen auf meinen Fotos, am Handy aber nicht (Regel nur für Geräte mit
Maus, `styles.css` 1856).

## C. Abgleich mit dem Video (acht Merkmale)

| Merkmal | Stand in Adrabic |
|---|---|
| 1 Reibung wegnehmen | Vorauswahl aus den Hürden; sonst wenig. Offen: Liste einfügen (Paket I) |
| 2 Übergänge mit bewusstem Tempo | Runde gut. Schwach: A-1, A-2 |
| 3 Momente der Freude | Rundenende, Meilensteine, Plan. Genug |
| 4 Wissen, wann nicht animiert wird | Runde ja; Einstieg zu viel (O-3), Einstellungen (A-3) |
| 5 Einheitlichkeit | Farben, Abstände, Symbole einheitlich; Zeiten nicht (A-6) |
| 6 Leere Zustände mit nächstem Schritt | überall vorhanden („Dein Start“, „Karten anlegen“, „Idee einreichen“) |
| 7 Entdeckungen belohnen | nicht vorhanden; bewusst nicht (ruhiges Werkzeug) |
| 8 Fehlermeldungen sagen, was zu tun ist | nicht Teil dieser Durchsicht (Zyklus 2 Paket A/E) |

Zu Deinem Wunsch „überall geile Animation“: Dafür spricht, dass die
schwachen Stellen (A-1, A-2) gerade die sind, an denen **gar nichts**
gleitet. Dagegen spricht Merkmal 4 und Deine eigene Rückmeldung vom 24.09.
(„Energie ein Ticken runter“). Urteil: nicht mehr Bewegung, sondern die
Lücken schließen (A-1, A-2, A-4) und die Doppelungen wegnehmen (A-3, O-3).
Dann fühlt sich alles gleich an.

## D. Vorschlag: zwei kleine Pakete (nicht entschieden)

**Paket „Bewegung 1“ (klein, keine Lernlogik):** A-1 samt schärferem Test
(Zwischenlagen verlangen), A-2, A-3, A-4. Braucht den vollen Lauf, weil
Blätter und Dialoge überall vorkommen, und einen Blick am iPhone.

**Paket „Platz 1“ (Klein-Weg):** B-1, B-2, B-5.

Beide passen nach Schritt 4 der Übergabe (Paket H). Der Einstieg
(Bericht 1) ist ein eigenes Paket.

## Nachtrag 08.10., Antwort des Betreibers

- **A-1 am iPhone bestätigt:** „es ist einfach weg“. Damit ist es ein
  belegter Fehler, kein Geschmack. Er wird behoben (mechanisch, LEHREN
  § 1.2), zusammen mit einem Test, der Zwischenlagen verlangt.
- Dazu wörtlich: „an sich ist dieses Schreiben und so in solchen Bereichen
  sehr unzufriedigend.“ **Noch unklar, was genau gemeint ist** (Tippen im
  Blatt „Karte anlegen“, die Tastatur über dem Blatt, oder das Schreiben
  von Hand beim Üben). Nachgefragt, nichts gebaut.
- Zur Frage, was gebaut wird: „keine Ahnung“. Also gilt die Empfehlung:
  erst „ladegerät“ (läuft am 08.10., Betreiber startet es selbst), dann
  „Bewegung 1“ (A-1 bis A-4), dann Paket I. „Platz 1“ nach dem Klein-Weg
  dazwischen. Der Einstieg wartet auf seine Karten (Paket O).
- **Während „ladegerät“ läuft, keine App-Datei und kein Prüfstand-Test
  anfassen:** Das Skript prüft den Arbeitsordner selbst (Server auf Port
  8199 im Repo-Ordner) und misst Zeiten.
