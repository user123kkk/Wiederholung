# Befunde EINST – Einstellungen, Konto, Anmeldung, Hilfe, Sicherung, Erinnerung, Board, Fehler melden, Rechtslinks

Prüfer: Agent EINST, 01.10.2026, Stand 3.18.10 (`436dc78`), nur gelesen und
gemessen. Prüfstand: `http://127.0.0.1:8099`, Chrome 154 (Windows), Firebase-
Attrappe `stubs.js`. Eigene Skripte und Fotos unter
`<scratchpad>/audit/EINST/` (`e1_…`, `e2_…`, Fotos in `bilder/`).

**Zwischenstand – Datei wird laufend ergänzt.** Sortierung nach Schwere folgt
am Ende.

---

#### EINST-1: Nach „Konto löschen“ trägt das nächste Konto die Kopfzeile „Konto löschen“
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:2329` setzt beim Kontowechsel nur `ui.einstellungen = false`,
  nicht `ui.seite`. Nach erfolgreichem Löschen steht `ui.seite` weiter auf
  `"konto-loeschen"`; `renderMain()` nimmt dann den Zweig `else if (ui.seite)`
  (`app.js:8585–8590`) und setzt `appBar({ titel: SEITEN_TITEL[ui.seite] … })`
  über den Lernen-Inhalt. Dieselbe Falle ist an vier anderen Stellen schon
  kommentiert und behoben („sonst trägt die Kopfzeile den Titel der Seite, aus
  der man gerade kommt“, `app.js:4133`, `5539`, `5600`, `9120`).
  Messung `e1_seite_nach_loeschen.js` (Handy 390): Konto A löschen (Tastatur-
  Weg, Passwort-Abfrage, Protokoll `reauth,commit,deleteDoc,deleteUser`), dann
  ohne Neuladen Konto B anmelden → Kopfzeile `"Konto löschen"` mit Zurück-Pfeil
  über „Gute Nacht … 12 fällig … Runde starten“, kein Zahnrad.
  Foto `bilder/einst-e1-kontoB-nach-loeschen.png`. **verifiziert**
- Warum es stört: Wer sein Konto löscht und gleich neu anfängt (genau der Weg
  „noch einmal von vorn“), sieht auf seinem frischen Konto „Konto löschen“ als
  Überschrift – das erschreckt und wirkt kaputt. Der Pfeil führt nur auf die
  Lernen-Seite zurück, die schon da ist.
- Vorschlag: im Auth-Reset (`onAuthStateChanged`, neben `ui.einstellungen =
  false`) auch `ui.seite = null`, `ui.wahlSheet = null`, `ui.erinnerungSheet =
  false`, `ui.feedbackForm = false`, `ui.kontoLoeschenEmail = ""` zurücksetzen
  (alles kontogebundene UI-Zustände; Entwürfe sind G-108).
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `e1_seite_nach_loeschen.js` als Test: Kopfzeile von B ist der
  Bereichsname, kein `[data-action="seite-zu"]`; Gegenprobe mit 3.18.10 rot.

#### EINST-2: „Aufzeichnung zurücksetzen“ löscht die Serie, der Dialog verschweigt es
- Art: Fehler (Text verspricht etwas anderes als der Code) / riskante Handlung
- Schwere: hoch
- Beleg: Seite `app.js:9387–9389`: „Zurücksetzen betrifft nur die Anzeige:
  deine Karten und ihr Lernstand bleiben.“ Dialog `app.js:1094`: „… Balken,
  Kalender und Wochenzahlen fangen bei null an. Deine Karten und ihr Lernstand
  bleiben unberührt.“ Die Serie nennt der Dialog nicht. Der Code leert aber
  `verlauf` (`app.js:1098–1105`), und `serieAktuell()` rechnet die Serie aus
  genau diesem Protokoll (`app.js:3044–3064`). Messung
  `e2_aufzeichnung_serie.js` (21 lückenlose Tage, Sockel weit zurück):
  vorher „21 Tage am Stück“, nach „Löschen“ „Heute wird Tag 1 · Bester
  Lauf: 21“. **verifiziert**
- Warum es stört: Die Serie ist der wichtigste „Grund zum Zurückkommen“. Wer
  den Satz „betrifft nur die Anzeige“ liest, rechnet nicht damit, dass seine
  Serie von 21 Tagen endgültig auf 0 fällt. Nicht rückgängig zu machen
  (LEHREN § 6.8, § 7.2).
- Vorschlag: (a) Dialog nennt die Folge mit Zahl: „Deine Serie von 21 Tagen
  fängt ebenfalls bei null an.“ (wie die Löschen-Seite, `app.js:9487`),
  Seitentext ohne „nur die Anzeige“ (`renderEinstellungenSeite`, Karte
  „Aufzeichnung“). (b) Zusätzlich prüfen, ob die Zeile überhaupt bleiben soll –
  3.13.0 schrieb selbst „braucht praktisch niemand“ (`app.js:9239`).
- Entscheidet: Agent für (a) (falscher Text); Betreiber für (b)
- Aufwand: klein
- Abnahme: `e2_aufzeichnung_serie.js`: Dialogtext enthält „Serie“ und die Zahl;
  Seitentext enthält nicht „nur die Anzeige“.
- Pro/Contra (b, Betreiber): Dafür Entfernen – eine Taste weniger, die man
  bereuen kann; der Zweck („Kalender sauber machen“) ist selten. Dagegen – der
  Kommentar bei `verlaufZuruecksetzen` nennt einen echten Grund (Konsole
  verliert gegen ein laufendes Gerät), und Entfernen ist eine Funktionsänderung.
  Empfehlung: Zeile behalten, nur den Text ehrlich machen (a).

---

## Geprüft ohne Fund

(folgt)
