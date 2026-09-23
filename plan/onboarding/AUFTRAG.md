# Auftrag: Einstieg vor der Anmeldung

Angelegt: 19. September 2026 · Status: `Konzept neu aufgesetzt (23.09.2026),
Umfang entschieden — wartet auf F4 (Anker) und F5 (Rechtsprüfung)`

> **Der maßgebliche Stand steht seit 23.09.2026 in drei neuen Dateien:**
> [`VIDEO-BEFUND.md`](VIDEO-BEFUND.md) (die Betreiber-Quelle, zweimal
> ausgewertet), [`FRAGENKATALOG.md`](FRAGENKATALOG.md) (Prüfungen, neun
> Stationen, 139 Fragen, **Entscheidungen in Abschnitt 9**),
> [`PSYCHOLOGIE.md`](PSYCHOLOGIE.md) (was belegt ist und was nicht) und
> [`BESTAND.md`](BESTAND.md) (wo der Einstieg im Code einhakt).
> Die Abschnitte 1–8 unten sind der Stand vom 19.09. und bleiben als
> Vorgeschichte stehen; wo sie abweichen, gilt `FRAGENKATALOG.md`.
Gesamtplan: [`../PLAN.md`](../PLAN.md) · Nebenstrang, keine Phasennummer

---

## 0. Neustart des Konzepts (23.09.2026, spät nachts)

Betreiber-Einschätzung zum bisherigen Stand (Abschnitte 1–8 unten, Stand
19.09.): **Die bisher eingetragenen Fragen (E1–E4) und Kandidaten decken die
Effektivität nie ab.** Ausdrücklicher Wunsch: **von Grund auf neu anfangen**,
nicht an E1–E4 weiterbauen. Betreiber hat eigene, aus seiner Sicht gute
YouTube-Quellen zum Thema Onboarding, die noch nicht eingearbeitet sind —
`/watch`-Skill lief bei ihm nicht zuverlässig, Quellen liegen also noch nicht
als geprüfte Belege vor wie in Abschnitt 3.

**Animationen spielen laut Betreiber eine Rolle.** Genannte Stichworte:
„Higgsfield" (KI-Werkzeug für Video-/Animationsgenerierung) und „Flutter"
(Googles Mobile-App-Framework, das für performante native Animationen bekannt
ist). Beides sind **Referenz-/Inspirationsnennungen des Betreibers, keine
Technologie-Entscheidung** — diese App hat keinen Build-Schritt und bleibt
bei reinem HTML/CSS/JS (`../../CLAUDE.md`); Flutter würde einen kompletten
Neuaufbau bedeuten und ist damit nicht gemeint. Zu klären, sobald die
YouTube-Quellen da sind: was genau an Animation/Bewegung diese Quellen zeigen,
und was davon mit `@keyframes` (README.md-Vorgabe) umsetzbar ist.

**Betreiber kündigt an, wahrscheinlich in einer neuen Session/neuem Chat mit
den Quellen weiterzumachen.** Für die nächste Session, die diesen Strang
aufnimmt: Abschnitte 1–8 unten sind der **alte** Stand (19.09., E2 auf
Kandidat 2 „Wenn-dann-Satz" eingeengt) — nicht stillschweigend fortsetzen.
Erst prüfen, ob der Betreiber die angekündigten Quellen mitgebracht hat; wenn
ja, Konzept ab Abschnitt 3 (Belege) neu aufziehen, nicht nur ergänzen.

---

## 1. Wozu

Wer die App öffnet und noch kein Konto hat, sieht heute sofort das
Anmeldeformular. Der Betreiber will davor einen **kurzen, geführten Einstieg**,
der auf etwas hinarbeitet — nicht eine Folie mit allen Funktionen.

Das Ziel ist **eine einzige erste Handlung**: die erste eigene Karte
(`plan/redesign-oberflaeche/LOGBUCH.md`, v3.6.11: „Erste Karte anlegen" ist der
Hauptknopf des leeren Lernen-Bildschirms). Alles im Einstieg dient diesem Weg:
verstehen, was passiert → die App auf sich einstellen → anmelden → erste Karte.

**Korrektur an einem früheren Urteil.** Am 19.09. stand in
`phase-1-datenzugriff/LOGBUCH.md`, „Signup nach Onboarding" sei nicht relevant,
weil Firestore ein Konto voraussetzt. Das war zu kurz gedacht: Antworten lassen
sich bis zur Registrierung **auf dem Gerät** halten und danach anwenden. Der
Einstieg vor der Anmeldung ist machbar; das Urteil ist zurückgenommen.

## 2. Was die App mit Antworten überhaupt anfangen kann

Eine Frage, deren Antwort nirgends hinführt, ist Dekoration. Heute gibt es genau
drei Einstellungen (`app.js:936`, `normSettings`):

| Einstellung | Was sie tut | Passende Frage |
|---|---|---|
| `sitzungsLimit` | wie viele fällige Karten pro Runde (`app.js:4047`) | „Wie viel Zeit hast du pro Tag?" |
| `arabGroesse` | Größe der arabischen Schrift | keine Frage — **Auswahl an einer Probe** |
| `thema` | hell / dunkel / auto | Auswahl an einer Probe |

Ein Tageslimit für neue Karten gibt es **nicht mehr** (seit 2.3.0 entfallen,
`app.js:815`). Erinnerungen/Benachrichtigungen gibt es nicht (bewusst nicht
gebaut, PLAN.md 16.09.). Eine Frage nach „Wann lernst du?" hat deshalb keinen
Speicherort; sie wirkt nur als Handlung des Nutzers (siehe 3.2).

## 3. Belege — nur was nachgeprüft ist

`STRATEGIE.md` 1.1: keine Wirkungsbehauptung ohne Beleg. Geprüft am 19.09.2026
(WebSearch, Kurzfassung der Fundstellen):

| Aussage | Beleg | Was er **nicht** trägt |
|---|---|---|
| Abrufen schlägt Wiederlesen nach Verzögerung; Wiederlesen erhöht das Vertrauen, nicht das Behalten | Roediger & Karpicke 2006, *Psychological Science* 17(3), 249–255 | Prosa-Texte bei Studierenden, nicht arabische Vokabeln |
| Der beste Abstand hängt davon ab, wie lange man behalten will | Cepeda u. a. 2006, *Psychological Bulletin* 132, 354–380 (317 Experimente) | nicht den Faktor 1,8 dieser App — der ist selbstgebaut |
| Ein Wenn-dann-Plan („Wenn Situation, dann Handlung") hilft, ein Ziel zu erreichen, d = 0,65 | Gollwitzer & Sheeran 2006, *Adv. Exp. Soc. Psych.* 38, 69–119 (94 Tests) | gilt für Ziele allgemein, nicht gezielt für Sprachenlernen |

**Nicht belegt, deshalb nicht verwendet:** Onboarding-Zahlen aus dem Video
(„52 % → 93 %") und aus Anbieter-Blogs. Eine kontrollierte Studie zu
„Einstieg vor Anmeldung" ließ sich nicht finden; wer sie zitiert, zitiert
Marketing. Nicht geprüft (nur aus Erinnerung bekannt, daher **nicht** als
Grundlage): Selbstbestimmungstheorie (Deci & Ryan), Zielsetzungstheorie.

**Schreibregel für den Einstieg:** Er zeigt, was die App tut (Mechanik,
Zahlen aus dem Code), und sagt nichts über „wissenschaftlich bewährt". Die
Studien stehen in diesem Dokument, um Entscheidungen zu tragen — nicht als
Behauptung auf dem Bildschirm.

## 4. Kandidaten für den Inhalt

Vom Agenten vorgeschlagen, **vom Betreiber freizugeben**. Jeder Kandidat nennt,
wohin seine Antwort geht.

1. **Zeit pro Tag** → setzt `sitzungsLimit`. Reine Einstellung, keine Behauptung.
2. **Wenn-dann-Satz** („Wenn ich … dann öffne ich Adrabic") → Beleg Gollwitzer.
   Kein Speicherort; wird nur in der Zusammenfassung wiederholt. Nur sinnvoll,
   wenn der Nutzer ihn selbst formuliert oder aus Vorgaben wählt.
3. **Schriftprobe** → setzt `arabGroesse`; zeigt gleichzeitig das Handschrift-
   Feld als Bild (`STRATEGIE.md` 1.2 a, der stärkste Einzelbeleg).
4. **Zeigen statt erklären**: drei Bildschirme — Stufenleiter (Zahlen aus
   `app.js:89–99`), „Nicht / Fast / Sicher", Lektion für Lektion.

**Bewusst nicht dabei:** „Warum lernst du Arabisch?" und „Wie gut liest du
schon?" — die Antworten gingen nirgends hin. Sie kämen nur hinein, weil solche
Fragen üblich sind, und das ist der einfache Weg, den der Betreiber nicht will.

**Zum Muslim-Bezug.** Der Agent schreibt keine religiösen Inhalte, Zitate oder
Formeln. Tonfall und jedes Wort mit religiösem Bezug schreibt oder gibt der
Betreiber frei — dieselbe Lehre wie am 13.09. (erfundener Kartensatz,
`STRATEGIE.md` 2.1): Freigabe **vor** dem Schreiben ins Repo. Der Agent liefert
Struktur, Reihenfolge und Technik.

## 5. Grenzen und Kanten

- **Nur für neue Konten.** Antworten werden nur angewendet, wenn es noch kein
  Cloud-Dokument gibt. Wer sich auf einem neuen Handy in ein **bestehendes**
  Konto einloggt, darf keine Einstellung überschrieben bekommen.
- Überspringen ist auf jedem Bildschirm möglich; der Einstieg erscheint **einmal**
  (Merker auf dem Gerät), nicht bei jedem Öffnen.
- Die Lernlogik bleibt unberührt. `sitzungsLimit` ist eine Einstellung der
  Rundengröße, keine Änderung, was gelernt oder wie bewertet wird — trotzdem im
  Logbuch ausdrücklich vermerken.
- `datenschutzerklaerung.html` Punkte 6 und 9 nennen `localStorage` als „rein
  technisch notwendig" für Thema/Einstellungen. Antworten vor der Registrierung
  dort zwischenzuspeichern verlängert das. **Ob das den Text ändert, ist eine
  Rechtsfrage — nicht vom Agenten zu entscheiden**, ins Logbuch als offen.
- Barrierefreiheit wie Phase 9: Tastatur, Kontrast, `prefers-reduced-motion`.
- Optik nach `README.md`: Eintritt als `@keyframes`, ein delegierter Klick-Listener.
- Still und nicht drängend (PLAN.md 18.09., „nicht invasiv"): kein Zähler, kein
  Fortschrittsdruck, keine Serien-Sprache.

## 6. Offene Entscheidungen (Betreiber)

| Nr. | Frage | Empfehlung des Agenten |
|---|---|---|
| E1 | Umfang: **A** nur Einstellungen anwenden · **B** auch die erste Karte schon vor der Anmeldung anlegen | A. B berührt das Kartenformular und braucht eine Zwischenspeicherung samt Prüfung; das ist ein eigener, größerer Block und erst nach A sinnvoll |
| E2 | Welche Kandidaten aus 4 kommen hinein | **Entschieden 19.09.: nur Kandidat 2, der Wenn-dann-Satz.** **Erweitert am 23.09.2026 (F1, `FRAGENKATALOG.md` §9):** Kandidat 1 (Zeit/Rundengröße) und 3 (Schriftprobe) kommen dazu, ebenso Hell/Dunkel; Kandidat 4 (drei Mechanik-Bildschirme) bleibt draußen. Grund: Der Wenn-dann-Satz allein hat keinen Speicherort und löst sich nicht sichtbar ein. Der Strang ist damit Einstieg zum Dranbleiben **und** zur Einrichtung |
| E1 | (Antwort war „weiß nicht, ob stetigs in sowas behandelt werden oder persönliches") | **Lesart des Agenten, unbestätigt:** Frage war, ob ein solcher Einstieg Stetigkeit/Dranbleiben oder Persönliches behandelt. Gewählter Baustein spricht für Stetigkeit. E1 A/B bleibt offen; bei nur einem Wenn-dann-Satz stellt sich B (erste Karte vorher) ohnehin nicht |
| E3 | Wortlaut und Ton, besonders alles mit religiösem Bezug | **Freigegeben 23.09.2026:** „ich gebe frei, sachen die einem talab al ilm gehören eben", dazu Gebetszeiten als Anker ausdrücklich erlaubt. Wortlaut aller Bildschirme steht in [`WORTLAUT.md`](WORTLAUT.md); die Grenze bleibt: keine Zitate, keine Formeln, kein Satz über den religiösen Wert des Lernens. Offen nur: Schreibweise der Gebetsnamen und das Wort auf der Beispielkarte |
| E4 | Datenschutz: Rechtsprüfung der Zwischenspeicherung | vor dem Veröffentlichen, durch eine echte Person. **23.09.2026: Betreiber sagt zu, prüfen zu lassen.** Umfang laut `BESTAND.md` §5: neue Schlüssel für A1, A3 und den Merker; `adrabic-thema` (A2) ist **nicht** betroffen |

## 7. Blöcke

1. **Bestandsaufnahme** (kein Code): Werte von `SITZUNGS_LIMITS`/`ARAB_STUFEN`,
   wie `renderAuth()` entscheidet, wo der Einstieg vor dem Formular einhakt.
2. **Inhalt freigeben** (E2, E3) — Texte stehen im Logbuch, nicht im Code.
3. **Bauen**: Bildschirme, Merker, Anwendung nur bei neuem Konto.
4. **Prüfen**: Browser (Probelauf), bestehendes Konto, Überspringen, Tastatur,
   Flugmodus. Am echten Handy vom Betreiber bestätigen lassen.
5. **Später, getrennt:** Verweis von `landing.html` (der Betreiber will die
   Startseite später anfassen).

## 8. Woran der Strang fertig ist

- E1–E3 entschieden, E4 entweder geklärt oder als offen dokumentiert.
- Der Einstieg erscheint bei einem neuen Gerät genau einmal, ist überspringbar
  und ändert bei einem bestehenden Konto nichts.
- Jede Frage im Einstieg stellt etwas ein, das in der App danach sichtbar ist.
- Kein Satz auf dem Bildschirm behauptet eine Wirkung ohne Beleg aus Abschnitt 3.
- Betreiber hat es am echten Handy bestätigt.
