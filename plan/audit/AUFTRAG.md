# Auftrag: Prüfschleife „Premium, von 1 bis Ende"

Betreiber am 24.09.2026: „achte auf sachen die maybe ned auffallen aber
auffallen unbewusst wenn man die app verlässt und eine ähnliche nutzt und den
drang hat zurück zu kehren. premium [...] versuch selbst eine loop zu
erstellen wo du das unter anderem auch tust, das gesamte system, tool, von 1
bis ende."

Und: „bitte nimm kritik nicht akzeptant immer an." Jede Rückmeldung wird
geprüft, nicht blind umgesetzt – wo der Code oder eine Messung dagegen
spricht, steht das im Logbuch und in der Antwort.

## Ablauf einer Runde (eine Station pro Durchlauf)

1. [`LOGBUCH.md`](LOGBUCH.md) lesen, letzter Eintrag zuerst. „Nächste
   Station" nennt, wo es weitergeht.
2. Die Station im Browser durchgehen (Playwright/Chromium, Testaufbau wie in
   `plan/onboarding/LOGBUCH.md` beschrieben: gestubbtes Firebase, voller
   Beispiel-Bestand), auf **360 px, 390 px, iPad hoch, Desktop**, **dunkel und
   hell**. Fotos machen, Bewegungen per `document.getAnimations()` Bild für
   Bild anhalten, Sprünge messen (Lage von Elementen vor/nach einer Handlung).
3. Gegen die Prüfliste unten halten. Jeder Fund bekommt: was, wo, warum es
   stört, Messwert oder Foto.
4. Beheben, was klar ist und im Rahmen bleibt (Lernlogik bleibt tabu,
   `CLAUDE.md`). Was eine Entscheidung des Betreibers braucht: ins Logbuch
   unter „Offen", nicht bauen.
5. Prüfen (Regressionstests, Affentest), veröffentlichen nach der Liste in
   `README.md` (Version, `CACHE_NAME`, Querys, `CHANGELOG.md`), auf `main`
   pushen.
6. Logbuch-Eintrag, `plan/PLAN.md` nachziehen. Auch „geprüft, nichts zu tun"
   ist ein Eintrag.

## Prüfliste – was unbewusst auffällt

- **Kontrast gemessen, nicht geschätzt:** `t_kontrast.js` (Prüfstand) in
  jeder Runde, beide Fassungen – Ziel 0 Funde. Auch gezeichnete Dinge
  (Canvas, SVG) von Hand prüfen: das misst das Skript nicht. Anlass: dunkle
  Tinte auf dunkler Zeichenfläche (v3.15.0).
- **Nichts springt** – weder innerhalb einer Karte noch von einer Karte zur
  nächsten (`t_sprung.js`, `t_sprung_ueben.js`). Kein Element verschiebt
  sich, ohne dass man es bewegt hat (Aufdecken, Laden, Fehlermeldung,
  Tastatur, Bild lädt nach). Messen, nicht schätzen: 0 px ist das Ziel.
- **Jede Bewegung hat Herkunft und Ziel.** Was erscheint, kommt von dort, wo
  es hingehört; was geht, geht in die Richtung seiner Bedeutung. Eine
  Bewegung pro Ursache, keine zwei nacheinander. 150–450 ms, Federn bei
  Dingen, die man „anfasst".
- **Jeder Tipp antwortet sofort** (< 100 ms sichtbar: Druckzustand,
  Nachgeben). Haptik an Schlüsselstellen (Umdrehen, Bewerten, Abschluss),
  nicht überall.
- **Texte:** kein Satz, der sagt, was man sieht („wird geladen"). Keine
  Systemzahlen (Stufen, Tage, Schwellen – Betreiber 24.09.2026). Du-Form.
  Dasselbe Ding heißt überall gleich (`KARTEN_ZUSTAENDE`, `UEBEN_GRUPPEN`).
- **Zustände:** leer, erster Start, sehr viel Inhalt, langer Text, langes
  Arabisch, offline, Fehler, langsames Netz. Keiner darf „kaputt" aussehen.
- **Rückkehr-Drang:** Fortschritt spürbar machen (Abschluss, Serie, Ring),
  ein nächster Schritt ist immer sichtbar, das Ende einer Runde fühlt sich
  wie ein Ende an. Keine Dark Patterns, kein Nerven (das Teilen bleibt
  „nicht invasiv", `PLAN.md`).
- **Konsistenz:** gleiche Bauteile sehen überall gleich aus und verhalten
  sich gleich (Blätter, Knöpfe, Listenzeilen, Leerzustände).
- **Geräte & Zugänglichkeit:** keine waagerechte Scrollleiste, Daumenzone,
  Safe-Areas, Fokus sichtbar, `prefers-reduced-motion` respektiert,
  Screenreader-Beschriftungen stimmen.

## Stationen (Reihenfolge = Weg eines neuen Menschen durch die App)

| Nr | Station | Umfang |
|---|---|---|
| 1 | Start | iOS-Startbild, Ladebildschirm, Übergang in die App, langsames Netz |
| 2 | Einstieg | alle Schritte vor der Anmeldung, Zurück, Überspringen |
| 3 | Anmelden | Anmelden, Registrieren, Passwort vergessen, Fehler |
| 4 | Bestätigung | E-Mail bestätigen, automatische Weiterleitung |
| 5 | Lernen-Start | leer, Start-Liste, mit Karten, alles erledigt, Serie |
| 6 | Lernrunde | Karte, Umdrehen, Bewerten, Wischen, Rückgängig, Notiz, Merken, Tastatur |
| 7 | Rundenende | Bilanz, Serie, nächster Schritt |
| 8 | Üben | Auswahl, Runde, Handschrift |
| 9 | Fortschritt | Kennzahlen, Zustände, Kalender, Vorschau, schwierige Karten |
| 10 | Verwalten | Liste, Suche, Auswahl, Sortieren, Speicherkarten, Lektionen |
| 11 | Karten-Blätter | anlegen, bearbeiten, löschen, Detail |
| 12 | Bereiche | anlegen, wechseln, umbenennen, löschen |
| 13 | Kartensätze & Daten | Code teilen/einlösen, Sichern, Einspielen |
| 14 | Einstellungen | Übersicht, Wahl-Blätter, Unterseiten |
| 15 | Konto | Abmelden, Konto löschen |
| 16 | Querschnitt | Dialoge, Toasts, Fehler, offline |
| 17 | Große Bildschirme | Tablet hoch/quer, Desktop – alle Stationen im Schnelldurchgang |
| 18 | Hell & ruhig | helle Fassung, reduzierte Bewegung, Screenreader-Grundlagen |

Nach Station 18 endet die Schleife (Routine löschen) und die Antwort an den
Betreiber fasst alle Runden zusammen. Eine zweite Runde nur auf seinen Wunsch.

## Die Routine

Eine stündliche Routine weckt die Arbeits-Session mit dem Auftrag „nächste
Station der Prüfschleife". Ihre Kennung steht im Logbuch. Wer sie anhalten
will: in claude.ai unter „Routines" abschalten – oder der Session „Schleife
stoppen" schreiben.
