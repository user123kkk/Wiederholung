# Befunde EINST – Einstellungen, Konto, Anmeldung, Hilfe, Sicherung, Erinnerung, Board, Fehler melden, Rechtslinks

Prüfer: Agent EINST, 01.10.2026, Stand 3.18.10 (`436dc78`), nur gelesen und
gemessen. Prüfstand: `http://127.0.0.1:8099`, Chrome (Windows), Firebase-
Attrappe `stubs.js`. Eigene Skripte unter `<scratchpad>/audit/EINST/`
(`e1_…` bis `e7_…`), Fotos in `<scratchpad>/audit/EINST/bilder/`.
`<scratchpad>` =
`C:\Users\USER\AppData\Local\Temp\claude\C--Users-USER-Wiederholung\7adc4240-7294-4e09-8a22-981a8d3f67a8\scratchpad`.

Grenzen der Prüfung: kein echtes iPhone/Android, kein echtes Firebase, kein
WebKit. Was nur dort zu klären ist, steht als „Vermutung“ bzw. Gerätetest da.

Anzahl: 0 kritisch · 1 hoch · 5 mittel · 9 niedrig.

---

## Hoch

#### EINST-1: „Aufzeichnung zurücksetzen“ löscht die Serie, der Dialog verschweigt es
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
- Warum es stört: Die Serie ist der wichtigste Grund zum Zurückkommen. Wer
  „betrifft nur die Anzeige“ liest, rechnet nicht damit, dass seine Serie
  endgültig auf 0 fällt. Nicht rückgängig zu machen (LEHREN § 6.8, § 7.2).
- Vorschlag: (a) Dialog nennt die Folge mit Zahl: „Deine Serie von 21 Tagen
  fängt ebenfalls bei null an.“ (wie die Löschen-Seite, `app.js:9487`),
  Seitentext ohne „nur die Anzeige“ (`renderEinstellungenSeite`, Karte
  „Aufzeichnung“). (b) Prüfen, ob die Zeile überhaupt bleiben soll – 3.13.0
  schrieb selbst „braucht praktisch niemand“ (`app.js:9239`).
- Entscheidet: Agent für (a) (falscher Text); Betreiber für (b)
- Aufwand: klein
- Abnahme: `e2_aufzeichnung_serie.js`: Dialogtext enthält „Serie“ und die Zahl;
  Seitentext enthält nicht „nur die Anzeige“.
- Pro/Contra (b): Dafür Entfernen – eine Taste weniger, die man bereuen kann;
  der Zweck ist selten. Dagegen – der Kommentar bei `verlaufZuruecksetzen`
  nennt einen echten Grund (aus der Konsole verliert man gegen ein laufendes
  Gerät), und Entfernen ist eine Funktionsänderung. Empfehlung: Zeile
  behalten, nur den Text ehrlich machen (a).

## Mittel

#### EINST-2: Nach „Konto löschen“ trägt das nächste Konto die Kopfzeile „Konto löschen“
- Art: Fehler
- Schwere: mittel
- Beleg: `app.js:2329` setzt beim Kontowechsel nur `ui.einstellungen = false`,
  nicht `ui.seite`. Nach erfolgreichem Löschen steht `ui.seite` weiter auf
  `"konto-loeschen"`; `renderMain()` nimmt dann den Zweig `else if (ui.seite)`
  (`app.js:8585–8590`) und setzt `SEITEN_TITEL[ui.seite]` über den
  Lernen-Inhalt. Dieselbe Falle ist an vier anderen Stellen schon kommentiert
  und behoben (`app.js:4133`, `5539`, `5600`, `9120`: „sonst trägt die
  Kopfzeile den Titel der Seite, aus der man gerade kommt“).
  Messung `e1_seite_nach_loeschen.js` (Handy 390): Konto A löschen
  (Protokoll `reauth,commit,deleteDoc,deleteUser`), ohne Neuladen Konto B
  anmelden → Kopfzeile „Konto löschen“ mit Zurück-Pfeil über „12 fällig …
  Runde starten“, kein Zahnrad. Foto `einst-e1-kontoB-nach-loeschen.png`.
  **verifiziert**
- Warum es stört: Wer sein Konto löscht und gleich neu anfängt, sieht auf dem
  frischen Konto „Konto löschen“ als Überschrift. Das erschreckt und wirkt
  kaputt; das Zahnrad fehlt, bis man einen Reiter antippt.
- Vorschlag: im Auth-Reset (`onAuthStateChanged`, neben `ui.einstellungen =
  false`) auch `ui.seite = null`, `ui.wahlSheet = null`,
  `ui.erinnerungSheet = false`, `ui.feedbackForm = false`,
  `ui.kontoLoeschenEmail = ""` zurücksetzen (Entwürfe selbst sind G-108).
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `e1_seite_nach_loeschen.js` als Test: Kopfzeile von B ist der
  Bereichsname, kein `[data-action="seite-zu"]`; Gegenprobe mit 3.18.10 rot.

#### EINST-3: „Fehler melden“ ist ohne Mail-Programm eine Sackgasse
- Art: Sackgasse
- Schwere: mittel
- Beleg: `app.js:14464–14469`: `window.location.href = "mailto:…"`, direkt
  danach `closeErrorModal()`. Kein Hinweis, kein zweiter Weg; die Adresse ist
  absichtlich nirgends sichtbar (`String.fromCharCode`). Messung
  `e5_board_ics_backup.js` (Chrome ohne Mail-Programm): nach „Weiter zur
  E-Mail“ Modal zu, kein Toast, URL unverändert – es passiert sichtbar nichts.
  3.17.14 hat das Problem gesehen („öffnet sich kein Mailprogramm (am PC
  häufig)“, `app.js:14467`) und nur den Text behalten. **verifiziert**
- Warum es stört: Am PC, am iPad ohne eingerichtete Mail-App oder mit Gmail
  nur im Browser sieht es so aus, als sei der Bericht verschickt. Er kommt nie
  an, und der Betreiber erfährt von dem Fehler nichts.
- Vorschlag: Modal nach dem Absenden offen lassen und unter dem Knopf einen
  festen Satz zeigen (Platz vorher reserviert, § 6.1): „Kein Mail-Programm
  aufgegangen? Text kopieren und an die Adresse im Impressum schicken.“ mit
  Knopf „Text kopieren“ (`navigator.clipboard`, Muster `code-copy-clipboard`)
  und Link aufs Impressum. Schließen dann über „Fertig“.
- Entscheidet: Agent (Bedienung im Rahmen); Betreiber, falls statt des
  Impressum-Verweises die Adresse `adrabic.de@…` sichtbar werden soll
- Aufwand: klein
- Abnahme: Test: nach Absenden ist der Hinweis sichtbar, „Text kopieren“ legt
  Beschreibung + Version in die Zwischenablage, kein Sprung der Knöpfe.

#### EINST-4: „← Zurück“ auf Datenschutz/Impressum lädt die App neu – Einstieg und Formular sind weg
- Art: Sackgasse / Gefühl
- Schwere: mittel
- Beleg: `impressum.html:41` und `datenschutzerklaerung.html:41`:
  `<a href="./index.html">← Zurück</a>` – ein neuer Seitenaufruf, kein Zurück
  im Verlauf. Die Links stehen auf dem Anmelde-/Registrier-Formular
  (`app.js:8048–8052`, ausdrücklich „müssen VOR dem Anlegen lesbar sein“), in
  den Einstellungen (`einstFuss`, `app.js:9332–9336`) und im Fehlerformular
  (`index.html:205`). Der Einstieg liegt nur im Arbeitsspeicher
  (`ui.einstieg`, LEHREN § 13), ebenso `ui.authEingabe` und der Fehler-Text.
  Messung `e7_rechtslink_zurueck.js` (Handy 390, Gast): Anmeldeformular mit
  getippter Adresse → „Datenschutz“ → „← Zurück“ → es steht der
  Willkommensbildschirm („Du hast es gelernt. Und es ist weg.“), das
  E-Mail-Feld gibt es nicht mehr. **verifiziert** (Gast-Weg; der Weg aus den
  Einstellungen folgt aus demselben Neuladen, dort nicht sauber gemessen).
- Warum es stört: Wer vor „Plan speichern“ den Datenschutz liest (genau dafür
  ist der Link da) und „Zurück“ tippt, landet wieder auf dem
  Willkommensbildschirm und muss alle Fragen noch einmal beantworten. In der
  installierten iPhone-App gibt es keinen anderen Rückweg. Aus den
  Einstellungen landet man auf Lernen statt in den Einstellungen.
- Vorschlag: Links aus der App mit `target="_blank" rel="noopener"` öffnen
  (im Browser neuer Tab, in der installierten App die eingebaute Ansicht mit
  „Fertig“); zusätzlich „← Zurück“ auf den Rechtsseiten zu
  `history.length > 1 ? history.back() : ./index.html` – das braucht ein
  Inline-Skript, also CSP-Hash (§ 9.2). Einfacher und ohne Skript: nur
  `target="_blank"`.
- Entscheidet: Agent; Gerätetest iPhone (Home-Bildschirm-App) beim Betreiber
- Aufwand: klein
- Abnahme: Test: Einstieg bis „Plan speichern“, Datenschutz öffnen, zurück →
  Formular mit getipptem Namen steht noch da.

#### EINST-5: Backup gilt als „heute gesichert“, auch wenn keine Datei ankam
- Art: Fehler (Vermutung für iOS) / Unfertig
- Schwere: mittel
- Beleg: `dateiSpeichern`, `app.js:4187–4189`: `a.click(); a.remove();
  URL.revokeObjectURL(url);` – die Adresse wird im selben Augenblick
  freigegeben. Die Erinnerungs-Datei wartet dafür 4 s (`app.js:10438`), das
  Backup nicht. Safari bricht einen Blob-Download ab, wenn die Adresse zu früh
  freigegeben wird (bekanntes WebKit-Verhalten, „WebKitBlobResource error 1“;
  FileSaver.js wartet deshalb 40 s). Danach setzt `exportBackup`
  bedingungslos `settings.lastBackup = todayStr()` (`app.js:4202–4204`).
  In Chrome geprüft: Datei kommt an (`e5`). Safari/iOS: **Vermutung**,
  Gerätetest.
  Dazu: `kontoLoeschenAusfuehren` ruft `exportBackup()` nach zwei `await`
  (Dialog, Neu-Anmeldung) auf (`app.js:3667`) – ohne Nutzergeste kann ein
  Browser den Download still unterdrücken; gelöscht wird trotzdem.
- Warum es stört: Das Backup ist „das Einzige, was bleibt“ (Seitentext). Eine
  Anzeige „Zuletzt gesichert: heute“ ohne Datei ist die gefährlichste Art von
  Fehler – man verlässt sich darauf.
- Vorschlag: `revokeObjectURL` wie bei der Erinnerung verzögern (z. B. 60 s).
  Auf der Löschen-Seite den Satz ergänzen: „Prüf, ob die Datei in deinen
  Downloads liegt.“ Gerätetest: iPhone Safari und Home-Bildschirm-App, „Alles
  sichern“ → Datei in „Dateien“?
- Entscheidet: Agent (Verzögerung, Text); Betreiber (Gerätetest)
- Aufwand: klein
- Abnahme: grep: kein `revokeObjectURL` ohne `setTimeout`; Gerätebericht.

#### EINST-6: Tägliche Erinnerung – auf Android und in der iPhone-App ungeprüft, drei kleine Fehler
- Art: Unfertig / Fehler
- Schwere: mittel
- Beleg: `erinnerungHerunterladen`, `app.js:10423–10446`.
  (1) Der Merker `erinnerung: hhmm` wird immer gesetzt, die Zeile in den
  Einstellungen zeigt danach „19:30 Uhr“ (`app.js:9262`) – auch wenn nie ein
  Termin entstanden ist. (2) iOS-Zweig: `location.href = "data:text/calendar…"`;
  der Toast sagt trotzdem „öffne die Datei“ (`app.js:10444`), eine Datei gibt
  es dort nicht. In der installierten App kann die Kalender-Vorschau ohne
  Rückweg stehen bleiben (LEHREN § 11: „iOS muss das am Gerät bestätigen“ –
  **noch offen**). (3) Android: Google Kalender öffnet heruntergeladene
  `.ics`-Dateien in der Regel nicht (**Vermutung**, Gerätetest) – dann
  verspricht das Blatt einen Kalendereintrag, den es nicht geben kann.
  (4) `DTSTART` ist immer morgen (`app.js:10403`), auch wenn die gewählte
  Zeit heute noch kommt; gemessen `DTSTART:20261002T193000` (`e5`).
- Warum es stört: Die Einstellung behauptet einen Zustand, den die App nicht
  kennt. Wer am Android-Handy „Abends“ wählt und nichts passiert, sieht
  trotzdem „19:30 Uhr“ und wartet auf eine Erinnerung, die nie kommt.
- Vorschlag: Toast je Gerät („bestätige den Termin im Kalender“ auf iOS);
  `DTSTART` heute, wenn die Zeit noch vor einem liegt; Zeile zeigt
  „eingerichtet für 19:30“ erst nach einer Rückfrage „Steht der Termin im
  Kalender?“ oder neutral „Datei für 19:30 erstellt“. Gerätetest Android
  (Google Kalender, Samsung Kalender) und iPhone-App.
- Entscheidet: Agent (Texte, DTSTART); Betreiber (Gerätetests; falls Android
  nicht geht: Zeile dort ausblenden oder anderen Weg wählen)
- Aufwand: klein (Code), Gerätetests
- Abnahme: `.ics` mit heutigem Datum, wenn Zeit > jetzt; Gerätebericht mit
  Kalender-App und Ergebnis.

## Niedrig

#### EINST-7: Lange Wörter ohne Leerzeichen laufen aus der Karte (Ideen-Board, Profilname)
- Art: Fehler (Darstellung)
- Schwere: niedrig
- Beleg: `styles.css:5157–5159` (`.ideen-text strong`, `.hint`) und
  `styles.css:4556` (`.profil__text strong`) haben kein `overflow-wrap`.
  Messung 320 px: Idee mit 100 Zeichen ohne Leerzeichen und Beschreibung
  laufen über den Kartenrand bis zum Bildschirmrand (`e5`, Foto
  `einst-e5-board-320.png`); Name mit 40 Zeichen (Höchstlänge des Feldes)
  läuft aus der Profilkarte (`e6`, Foto `einst-e6-langer-name.png`).
  **verifiziert**
- Warum es stört: Das Board ist öffentlich; eine eingefügte Adresse oder ein
  langes Wort zerschneidet die Seite für alle.
- Vorschlag: `overflow-wrap: anywhere` an `.ideen-text strong`,
  `.ideen-text .hint`, `.profil__text strong`, `.gefahr-liste li`.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `e5`/`e6`: kein Element ragt über `innerWidth`, `scrollWidth <=
  clientWidth`.

#### EINST-8: Leistenfarbe springt beim Start von #111010 auf #0e0e12
- Art: Fehler (Muster nur an einer Stelle behoben, LEHREN § 3.3)
- Schwere: niedrig
- Beleg: `app.js:1565`: `meta.setAttribute("content", t === "hell" ?
  "#f2ece0" : "#0e0e12")`. Überall sonst steht `#111010` (`index.html:24`,
  `:101`, `:143`, `manifest.json:10–11`, `styles.css:80`; `styles.css:76`
  nennt `#0e0e12` ausdrücklich als alten Wert). Messung auf allen acht
  Breiten: `theme-color #0e0e12`, Seitenhintergrund `rgb(17, 16, 16)` (`e3`).
  **verifiziert**
- Warum es stört: Die Browser-/Systemleiste (Android, Desktop-PWA) hat einen
  leicht bläulichen anderen Ton als die Seite.
- Vorschlag: `#0e0e12` → `#111010` in `themaAnwenden()`.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep -n "0e0e12" app.js` ohne Treffer außerhalb von Kommentaren.

#### EINST-9: Nach dem Löschen des Kontos sagt die App nichts
- Art: Gefühl
- Schwere: niedrig
- Beleg: `kontoLoeschenAusfuehren`, `app.js:3672–3676`: Erfolg endet ohne
  Meldung; `render()` zeigt den Einstieg. Gemessen (`e1`): direkt nach dem
  Löschen steht „Du hast es gelernt. Und es ist weg.“ – die Werbe-Überschrift
  des Einstiegs. **verifiziert**
- Warum es stört: Nach der riskantesten Handlung der App fehlt die
  Bestätigung, dass sie geklappt hat; der Einstiegssatz liest sich an dieser
  Stelle wie ein schlechter Witz.
- Vorschlag: einmalige ruhige Meldung auf dem ersten Bildschirm danach
  („Dein Konto ist gelöscht.“), über `ansagen()` + Toast.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Test: nach `deleteUser` ist der Satz sichtbar und in `#ansage`.

#### EINST-10: Neu-Anmelden vor dem Löschen hat kein Zeitlimit und keine Rückmeldung
- Art: Fehler (LEHREN § 6.7)
- Schwere: niedrig
- Beleg: `kontoNeuAnmelden`, `app.js:3589`:
  `await fb.reauthenticateWithCredential(…)` ohne `mitZeitlimit`;
  `ui.kontoLoeschenBusy` wird erst danach gesetzt (`app.js:3668`). Zwischen
  „Weiter“ im Passwort-Dialog und der Antwort des Servers zeigt die Seite
  nichts, der Halte-Knopf ist wieder frei. Code gelesen, hängendes Netz nicht
  nachgestellt (Attrappe kann es nicht).
- Warum es stört: Bei schlechtem Netz sieht es aus, als sei nichts passiert;
  man hält noch einmal und bekommt die Passwort-Frage doppelt.
- Vorschlag: `mitZeitlimit` um beide Reauth-Aufrufe mit Passwort (nicht ums
  Popup), `kontoLoeschenBusy` schon ab „Weiter“ setzen.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: Attrappe um hängendes `reauthenticateWithCredential` erweitern;
  nach 12 s Meldung „Keine Verbindung“, Knopf währenddessen gesperrt.

#### EINST-11: Drei Kleinigkeiten auf 320 px
- Art: Gefühl
- Schwere: niedrig
- Beleg: (a) Einstellungen 320 px: Wert der Zeile „Sichern & einspielen“
  steht als „vor 3 Ta…“ da (Foto `einst-e3-w320-uebersicht.png`) – 3.17.14
  hatte „vor 3 Tg.“ als einzige Abkürzung der App entfernt. (b)
  Bestätigungsseite 320×568: Antwort auf „Ich habe bestätigt“ steht bei
  666–755 px, der Bildschirm endet bei 568 (`e4`) – man tippt und sieht keine
  Antwort. (c) „Aufzeichnung zurücksetzen“ ist 36 px hoch (`e3`, alle
  Breiten), Ziel 44 px (§ 5.2). **verifiziert**
- Warum es stört: kleine Handys (iPhone SE) wirken unfertig.
- Vorschlag: (a) Zeilenwert nicht kürzen, sondern umbrechen bzw. „vor 3 T.“
  nie erzeugen: `.liste-zeile__wert` ohne Ellipse, wenn der Text umbricht;
  (b) nach der Meldung `scrollIntoView({block:"nearest"})` im nächsten Bild;
  (c) `min-height: 44px` für `.ghost` in `.form-actions`.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `e3`/`e4` ohne diese drei Einträge.

#### EINST-12: Der Abschnitt „Hilfe“ enthält keine Hilfe
- Art: Fehlt / Funktion
- Schwere: niedrig
- Beleg: `app.js:9284–9294`: unter „Hilfe“ stehen nur „Ideen & Vorschläge“
  und „Fehler melden“. Eine Erklärung der App gibt es seit dem Entfernen von
  `landing.html` (FAQ dort, LEHREN § 3.5) nirgends mehr; `grep` nach
  „Anleitung“, „So funktioniert“, „FAQ“ in `app.js` ohne Treffer.
- Warum es stört: Wer wissen will, was „saß schon einmal“, „Speicherkarte“,
  „Lektion“ oder das Schloss bedeuten, oder wie man die App auf den
  Home-Bildschirm legt, findet keine Stelle dafür.
- Vorschlag: eine Unterseite „So funktioniert Adrabic“ (5–7 kurze Absätze,
  ohne Zahlen der Methode, § 6.9), Wortlaut vom Betreiber. Mindestens: den
  Abschnitt ehrlich „Rückmeldung“ nennen.
- Entscheidet: Betreiber (neue Seite, Wortlaut)
- Aufwand: mittel (Seite), klein (Umbenennen)
- Abnahme: Seite erreichbar auf 320–1440 px, `h1`, Rückweg.
- Pro/Contra: Dafür – schließt die Lücke nach dem Wegfall der FAQ, senkt
  Rückfragen. Dagegen – Text muss gepflegt werden und darf die Methode nicht
  verraten; eine Zeile mehr in den Einstellungen (Hick). Empfehlung: ja, als
  eine Zeile unter „Hilfe“, Text vom Betreiber; bis dahin nichts umbenennen.

#### EINST-13: Der Name lässt sich nach der Anmeldung nicht mehr ändern
- Art: Fehlt
- Schwere: niedrig
- Beleg: `displayName` wird nur bei der Registrierung gesetzt
  (`app.js:3289–3290`) bzw. aus `data.name` gelesen (`app.js:2431`); `grep`
  nach einer Änderungs-Handlung ohne Treffer. Google-Konten bekommen den
  Google-Namen (`app.js:2337`), ohne Namen den Teil vor dem `@`.
- Warum es stört: Der Name steht im Gruß („Guten Morgen, …“), im Profil, im
  Backup und im Fehlerbericht. Ein Tippfehler bleibt für immer.
- Vorschlag: siehe Vorschlagsliste V1.
- Entscheidet: Betreiber (neue Einstellung)
- Aufwand: klein
- Abnahme: siehe V1.

#### EINST-14: Aufräumen im Einstellungs-Code
- Art: Aufräumen
- Schwere: niedrig
- Beleg: (a) Kommentar `app.js:9229–9245` sagt „BETREIBER_UIDS ist leer“ und
  „4 Abschnitte mit 8 Zeilen … Karten pro Sitzung“; `app.js:74` trägt seit
  langem eine Kennung, es sind 9–10 Zeilen und es heißt „Runde“. (b)
  `einstFuss`, `app.js:9342–9344` (Konto-ID) und `.einst-id`
  (`styles.css:3116`) sind damit toter Code. (c) `SEITEN_TITEL` und
  `renderEinstellungenSeite` tragen die alten Namen `sichern`, `einspielen`,
  `verlauf` (`app.js:9161–9170`, `9357`) „falls ein alter Verweis sie noch
  öffnet“ – `grep` findet keinen. (d) Backup heißt
  `lernkarten-backup-….json` (`app.js:4198`), die App heißt Adrabic (§ 3.3).
  (e) `setThema` schreibt auch bei unveränderter Wahl in die Cloud
  (`app.js:1567–1573`), die beiden Nachbarn brechen vorher ab (`:1576`,
  `:3803`).
- Warum es stört: Kommentare lügen (§ 3.2), toter Code verwirrt die nächste
  Session.
- Vorschlag: Kommentare nachziehen, (b) und (c) entfernen, Dateiname
  `adrabic-backup-…` (Import liest den Namen nicht), `setThema` mit
  Früh-Abbruch.
- Entscheidet: Agent
- Aufwand: klein
- Abnahme: `grep -n "einst-id\|BETREIBER_UIDS ist leer" app.js styles.css`
  ohne Treffer; `t_einstellungen.js`, `t_daten.js` grün.

#### EINST-15: Google-Konto löschen am iPhone – Popup startet erst nach der Dialog-Bewegung
- Art: Vermutung, Gerätetest (Ergänzung zu E-18)
- Schwere: niedrig
- Beleg: `kontoNeuAnmelden`, `app.js:3594–3602`: erst `dlgConfirm`, dessen
  Antwort kommt über `closeDialog` → `spielAustrittsAnimation` →
  `setTimeout(…, 190)` (`app.js:14116–14140`), dann
  `reauthenticateWithPopup`. Das Fenster wird also nicht mehr im Tipp selbst
  geöffnet. `doGoogleLogin` öffnet es dagegen direkt im Tipp. Safari blockt
  Fenster außerhalb der Geste eher. **Vermutung**, nicht prüfbar ohne Gerät.
- Warum es stört: Wäre das Fenster blockiert, ließe sich ein Google-Konto am
  iPhone nicht löschen (wie der Vorfall Station 15, nur anders).
- Vorschlag: in den Gerätetest E-18 aufnehmen: Google-Konto → Konto löschen →
  „Weiter“ → öffnet sich Google? Falls nein: Dialog ohne Austrittsbewegung
  schließen und das Popup im selben Klick öffnen.
- Entscheidet: Betreiber (Gerätetest), dann Agent
- Aufwand: klein
- Abnahme: Gerätebericht mit iOS-Version.

---

## Schon bekannt, noch offen (nicht neu gemeldet)

- **G-110** (kritisch), **G-107**, **G-108**, **G-111**: Kontobindung bei
  Dialogen, Auth-Fortsetzungen, Entwürfen, Registrierungs-Nachtrag – im Code
  unverändert (`kontoVertipptNeuAnfangen` erfasst `currentUser` weiter erst
  nach dem Dialog, `app.js:3367–3371`). Paket A.
- **E-01** Passwort 6 Zeichen (`app.js:3134`, `7974`), **E-02** Passwort
  ändern fehlt, **E-03** Datenschutzerklärung/Offline-Kopie, **E-07** „Alles
  sichern“ ohne Serie und Einstellungen (Datei enthält nur `exportedAt,
  profil, bereiche`, gemessen `e5`), **E-10** Schriftprobe Basmala
  (`app.js:10015`), **E-18** Google-Anmeldung am iPhone: alle noch offen beim
  Betreiber.
- LEHREN § 11: `.ics` auf iOS am Gerät bestätigen – offen (siehe EINST-6).

---

## Vorschlagsliste neue Einstellungen

Für die Entscheidungsliste des Betreibers (`zyklus-2/AUFTRAG.md` § 2: erst
Liste, dann bauen). Heute: 4 Einstellungen (Karten pro Runde, Arabische
Schrift, Helligkeit, Tägliche Erinnerung). Cloud = `settings` im
Nutzerdokument: `normSettings()` (`app.js:1184`) + `firestore.rules`
`settingsOk()` (Positivliste `arabGroesse, lastBackup, thema, sitzungsLimit`)
+ Emulator-Test + Regel-Deploy **vor** Hosting + Datenschutzerklärung
(LEHREN § 6.2, § 8.1). Gerät = `localStorage`, neuer Schlüssel gehört in die
Datenschutzerklärung Punkt 7 (§ 12). Nicht vorgeschlagen, weil bewusst
entfernt (§ 3.5): „Bewegung“ Voll/Ruhig, Nutzungsstatistik, Intervall-Zahlen.

| Nr | Was | Warum (Problem) | Wo gespeichert | Aufwand | Empfehlung |
|---|---|---|---|---|---|
| V1 | **Name ändern** (Zeile im Profil oder unter Konto) | Tippfehler im Namen bleibt für immer; Google-Konten haben den Google-Namen (EINST-13) | Cloud, Feld `name` – gibt es schon, Regel erlaubt es (`nutzerWerte`: `text(d.name, 200)`); dazu `updateProfile`. Keine neue Regel, kein neuer Datenfluss | klein | **ja** |
| V2 | **Passwort ändern** (nur E-Mail-Konten) | heute nur über Abmelden + „vergessen“ | nichts Neues (Firebase-Mail) | klein | **ja** – ist E-02, noch offen |
| V3 | **Arabische Schrift: vierte Stufe „Sehr groß“** | „Groß“ ist 1,3-fach; für schwache Augen und kleine Harakat am Handy reicht das manchem nicht | Cloud, `arabGroesse` – vorhandenes Feld, Regel prüft nur Text bis 20 Zeichen, also keine Regeländerung; `ARAB_STUFEN` + Einstieg-Auswahl | klein, aber jede Karte/Liste bei der neuen Größe auf 320 px prüfen | **ja**, wenn die Messung auf 320 px hält |
| V4 | **Zuletzt geöffneten Bereich merken** (kein Schalter, Verhalten) | Start zeigt immer den ersten Bereich (`currentBereich()`, `app.js:3709–3714`); wer zwei Bereiche hat, wechselt jeden Tag | Gerät, neuer Schlüssel (nur Bereichs-ID) → Datenschutz Punkt 7 | klein | **ja** – keine Zeile in den Einstellungen nötig |
| V5 | **Sicherungs-Hinweis: Abstand wählen oder abschalten** | Banner „Dein letztes Backup ist 14 Tage her“ kommt bei jedem, der ≥ 10 Karten hat, auf jeder Seite (`app.js:8555`); die Daten liegen ohnehin im Konto | Gerät oder fester neuer Wert; als Cloud-Feld: `settingsOk` | klein | **keine Einstellung** – stattdessen fester Abstand 30 Tage und wegtippbar; Betreiber entscheidet |
| V6 | **Hinweise auf „Lernen“ ein/aus** (Meilenstein, Wochenrückblick, Erinnerung, Ideen) | manche wollen nur die Zahl und den Knopf | Gerät, im vorhandenen Schlüssel `adrabic-hinweise` – kein neuer Schlüssel | klein | **lieber nicht** – jeder Hinweis ist schon einzeln wegtippbar, ein Schalter mehr (Hick) |
| V7 | **Vibration aus** (nur Android) | `fuehlbar()` vibriert bei Bewerten, Abstimmen, Halten; nicht abstellbar | Gerät, neuer Schlüssel | klein | **lieber nicht** – gleiche Art Geschmacksschalter wie das entfernte „Bewegung“; erst, wenn sich jemand beschwert |
| V8 | **Karten pro Runde: weitere Werte (5, 50)** | 10 ist für „zwei Minuten an der Haltestelle“ viel, 30 für Vielnutzer wenig | Cloud, `sitzungsLimit` – Regel erlaubt 1–100000, keine Regeländerung; Einstieg-Auswahl mitziehen | klein | **Betreiber-Entscheidung (Lernlogik-nah)**: Dafür: passt zu „gern kurze Runden“. Dagegen: mehr Wahl (Hick), Texte im Einstieg nennen die Zahlen. Empfehlung: nur „5“ ergänzen |
| V9 | **Tagesbeginn wählen** (heute fest 4 Uhr) | Wer nach Fajr oder in der Nachtschicht lernt, bekommt den Tag evtl. falsch gezählt | Cloud (muss auf allen Geräten gleich sein) → `settingsOk`, Emulator, Datenschutz | groß – greift in Serie, Fälligkeit, Protokoll | **Betreiber-Entscheidung (Lernlogik)**. Empfehlung: **nicht** – hohes Risiko für die Serie, kein belegter Bedarf |
| V10 | **„Auf diesem Gerät vergessen“** beim Abmelden (Offline-Kopie löschen) | Geteiltes Gerät: nach dem Abmelden bleibt die Kopie aller Karten im Browser (E-03) | nichts Neues; `clearIndexedDbPersistence` nach `signOut` | mittel – nur online und ohne ungesendete Antworten, sonst Datenverlust | **später, zusammen mit E-03**; Recht beim Betreiber |
| V11 | **„App installieren“** (Zeile, die auf Android den Installations-Dialog öffnet, auf dem iPhone drei Sätze zeigt) | Die installierte App bekommt dauerhaften Speicher (G-070) und Startbild; niemand erfährt, dass das geht | nichts | klein–mittel, Gerätetest | **Betreiber**: E-17 hat „Installations-Fotos“ auf Phase 6 gelegt; das hier ist nur Text. Empfehlung: ja, mit der Hilfe-Seite (EINST-12) |
| V12 | **Wischen zum Bewerten aus** | Wer versehentlich wischt, bewertet falsch; Knöpfe gibt es ohnehin | Gerät, neuer Schlüssel | klein | **lieber nicht** jetzt – „Rückgängig“ fängt den Fall; nur bei echter Rückmeldung |

Reihenfolge, falls gebaut wird: V1, V2, V4 (kein Regel-Deploy nötig), dann
V3 nach Messung. V8/V9 nur mit ausdrücklichem „ja“ (Lernlogik).

---

## Geprüft ohne Fund

- **Erreichbarkeit der Einstellungen** auf 320, 360, 390, 820, 899, 900,
  1180, 1440 px: unter 900 px Zahnrad 44×44 in der Kopfzeile, ab 900 px
  Zeile in der Seitenleiste 214×52; nie beides, nie keins (`e3`).
- **Kein waagerechtes Scrollen** auf Übersicht, „Sichern & einspielen“,
  „Kartensatz per Code“, „Ideen & Vorschläge“, „Konto löschen“, allen
  Wahl-Blättern, Erinnerungs-Blatt, Fehlerformular, auf allen acht Breiten.
- **Trefferflächen**: alle Zeilen, Knöpfe, Stimm-Knöpfe (48×52), „Idee
  einreichen“ (44 hoch) ≥ 44 px; Ausnahmen nur EINST-11 c und die
  Rechtslinks (21 px hoch, Text-Links mit Abstand).
- **Wahl-Blätter** (Limit, Schrift, Helligkeit) und Erinnerungs-Blatt passen
  auf 320×568, scrollen bei Bedarf, schließen mit Escape.
- **Anmelden**: falsches Passwort → Text in Worten mit Ausweg, Meldung unter
  dem Knopf, Eingaben bleiben; „Passwort vergessen“ übernimmt die Adresse,
  Leerfeld meldet am Feld, Erfolgstext vorsichtig (G-012); Zeitlimit 12 s an
  allen E-Mail/Passwort-Aufrufen, nicht am Popup (`app.js:3190`, `3280`,
  `3290`, `3293`, `3317`, `3341`, `3412`).
- **Fehlertexte**: `AUTH_ERRORS`, `fehlerKlartext`, `kontoLoeschenFehlerText`
  – kein `e.code`/`e.message` im sichtbaren Text, alles Deutsch.
- **Bestätigungsseite**: Spam-Hinweis fest, „Erneut senden“, „Abmelden“ ohne
  Rückfrage (Absicht), „Adresse falsch?“ mit Rückfrage; Rest G-110.
- **Abmelden**: Rückfrage mit Anmeldeweg, Offline-Zusatz gemessen (`e6`).
- **Konto löschen**: Reihenfolge Neu-Anmeldung → Sicherung → Daten → Konto
  (Protokoll `reauth,commit,deleteDoc,deleteUser`, `e1`); offline Feld und
  Knopf gesperrt mit Satz (`e6`); Tastaturweg mit eigener Rückfrage;
  Zeitlimit 30 s für das Löschen selbst.
- **Kartensatz per Code** offline: „Code erzeugen“ gesperrt, „Code eingeben“
  meldet „Keine Verbindung“ (Code gelesen).
- **Ideen-Board**: Laden mit Platzhalter, 9-s-Hinweis und „Erneut versuchen“,
  kein automatischer Neuversuch, Doppeltipp-Sperre, Leerfeld am Feld, Entwurf
  überlebt Neuzeichnen, Dank + Ansage, Moderation nur Betreiber (Code und
  `e5`).
- **Backup** in Chrome: Datei kommt, „Zuletzt gesichert: heute“.
- **Rechtslinks**: in den Einstellungen, auf dem Anmeldeformular und im
  Fehlerformular vorhanden; beide Seiten verweisen aufeinander.
- **Thema**: Wahl wirkt sofort, „Automatisch“ zeigt „Gerade hell/dunkel“,
  Gerätewahl wird vor der Cloud gelesen (`app.js:1590–1594`).

## Nicht mehr geprüft (Zeit)

- EINST-4 mit dem ganzen Einstieg bis „Plan speichern“ (gemessen ist der
  kürzere Weg über „Ich habe schon ein Konto“) und aus den Einstellungen
  (Messung dort lieferte keine Kopfzeile, vermutlich noch Ladebildschirm).
- Hinweis zum Prüfstand: Der Server auf 8099 antwortete gegen Ende nicht
  mehr; `e7` lief über einen eigenen Server auf Port 8137 (`PRUEF_PORT`),
  danach beendet.
- Helles Thema der Unterseiten im Foto (Kontrast prüft `t_einstellungen.js`).
- Ideen-Board mit Lesefehler (Attrappe kann `getDocs` nicht scheitern lassen).
- Registrieren-Formular („Plan speichern“) auf 320 px; Tastatur über den
  Feldern am echten Gerät.
- Texte-Zeilen der Einstellungen („Einwilligung widerrufen“, Probelauf-Werte)
  – nur Betreiber-Konto, Probelauf läuft.
- Bildschirmleser-Namen der Einstellungen (macht `t_a11y.js`).
