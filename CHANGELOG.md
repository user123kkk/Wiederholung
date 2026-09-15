## 3.0.40 – 15. September 2026

### Verbessert

- **Ziehgriff: Doppeltipp-Fenster und visuelle Rückmeldung.**  Die Testrückmeldung zu v3.0.39 deutete darauf hin, dass das Doppeltipp-Verhalten weiterhin schwer zuverlässig zu aktivieren ist — vermutlich, weil der 400ms-Fenster beim Antippen eines 28px-breiten Ziels auf einem Touchscreen zu eng ist. Zwei kleine Verbesserungen: (1) DOPPELTIPP_FENSTER von 400ms auf 600ms erhöht — gibt dem Nutzer mehr Zeit für die zweite Tap ohne gefühltes Verzögern bei der Aktivierung. (2) Visuelle Rückmeldung auf den ersten Tap hinzugefügt: `.drag-handle:active` bekommt jetzt ein halbtransparentes Accent-Hintergrund (`rgba(var(--accent-rgb), 0.15)`), damit sofort sichtbar ist, dass die erste Tap registriert wurde — ermutigt zum zweiten Tap. Zusammen sollten diese beiden Änderungen die Zuverlässigkeit des Doppeltipp-Musters erhöhen, ohne die Mechanik selbst zu verändern.

---

## 3.0.39 – 15. September 2026

### Behoben

- **Ziehgriff markierte weiterhin kurz Text (Testrückmeldung 15.09.2026, v3.0.38 nachgebessert).** Ziehen funktionierte bereits, aber ein Finger deckt beim Halten mehr Fläche ab als der 28px breite Griff – reichte er auf den Wort-Text daneben, griff `user-select: none` dort nicht. Jetzt für die ganze Zeile (`.card-row`, `.set-row`) gesperrt, nicht nur den Griff selbst. Kompromiss: Text in der Verwalten-Liste lässt sich nicht mehr per Long-Press markieren, dafür zieht der Griff zuverlässig ohne Aufblitzen.

---

## 3.0.38 – 15. September 2026

### Behoben

- **Ziehgriff markierte Text statt zu ziehen (Testrückmeldung 15.09.2026, v3.0.35 nachgebessert).** `touch-action: manipulation` (v3.0.35) erlaubt zwar natives Scrollen, verhindert aber – anders als das vorherige `none` – nicht die native Textauswahl-Geste beim Halten. `-webkit-touch-callout: none` ergänzt, dasselbe Paar aus `user-select`+`touch-callout`, das jeder Button in der App bereits trägt. Noch nicht am Gerät bestätigt.

---

## 3.0.37 – 15. September 2026

### Behoben

- **Viewport-Verschiebung beim Scrollen und beim Registrieren (Beobachtung 15, 15.09.2026).** Zwei getrennte Ursachen für drei gemeldete Symptome: (1) Alle Text-Eingabefelder hatten `font-size: 0.9375rem` (15px) – unter der 16px-Schwelle, ab der iOS Safari beim Fokussieren automatisch ins Feld hineinzoomt und beim Verlassen nicht zuverlässig zurückzoomt. Erklärt „zoomt beim Fertig-Drücken rein" und „lässt sich rauszoomen". Jetzt `1rem` (16px) – hält iOS unter der Schwelle, ohne Zoom für den Nutzer selbst einzuschränken (kein `maximum-scale`, das wäre ein WCAG-1.4.4-Verstoß). (2) `html` reservierte keinen festen Platz für die Scrollbar – beim Scrollen in unterschiedlich langen Listen (Verwalten) blendete sie sich ein/aus und verschob die sichtbare Breite. Jetzt `scrollbar-gutter: stable`.

---

## 3.0.36 – 15. September 2026

### Behoben

- **Notiz-Formatierung ging beim Anzeigen verloren (Beobachtung 6, 15.09.2026).** `.study-extra` (Popup beim Anzeigen/Lernen einer Karte) hatte kein `white-space` gesetzt – der Browser kollabierte jeden Zeilenumbruch aus der `<textarea>`-Eingabe zu einem Leerzeichen. Jetzt `white-space: pre-wrap`. Zusätzlich gefunden: Die aufklappbare Notiz im Lernen-Tab (Chevron-Knopf bei „Gesehen"-Karten) nutzte dieselbe `.extra-note`-Klasse wie die einzeilige Listenvorschau in Verwalten (dort korrekt mit `nowrap`+`ellipsis`) – für den aufgeklappten Volltext war das falsch. Eigene Klasse `.extra-note-voll` mit `pre-wrap` eingeführt, nur die Listenvorschau behält `nowrap`.
- **Scroll-Position blieb beim Bereichs- oder Tab-Wechsel stehen (Beobachtung 14, 15.09.2026).** `selectBereich()` sowie die drei Tab-Wechsel (`tab-lernen`, `tab-fortschritt`, `tab-verwalten`) setzten viele UI-Zustände zurück, aber nie die Scroll-Position – anders als `einstellungen`/`einstellungen-zu`, die das schon taten. Wer unten in einem Bereich war und wechselte, landete im neuen Bereich ebenfalls unten. `window.scrollTo(0, 0)` an allen vier Stellen ergänzt, konsistent mit dem bestehenden Einstellungen-Muster (bewusst kein `springeNachOben()` – das ist für sanfte Sprünge zu einem Element gedacht, nicht für harte Tab-Wechsel).

### Geprüft, nicht behoben

- **Over-Scrolling (Beobachtung 13).** Ursache nicht zuverlässig lokalisierbar ohne echten Browser – hängt von tatsächlich gerenderten Höhen mehrerer verschachtelter Container (`min-height: 100dvh` an mehreren Stellen) ab, die sich nicht durch Code-Lesen berechnen lassen. Bewusst nicht geraten.

---

## 3.0.35 – 15. September 2026

### Behoben

- **Versehentliches Verschieben beim Scrollen (Beobachtung 2, 15.09.2026).** Ursache gefunden: Der Ziehgriff hatte `touch-action: none` in `styles.css`, das native Scrollen schon bei der bloßen Berührung unterband – unabhängig davon, ob eine Karte tatsächlich gezogen werden sollte. Beim Scrollen mit dem Daumen über die Kartenliste reichte ein zufälliges Streifen über den Griff, um sofort eine Karte zu verschieben. Fix (auf Vorschlag des Betreibers): Ein Finger zieht jetzt erst beim **zweiten** Antippen desselben Griffs innerhalb von 400ms – der erste Antipper löst nichts aus, die Seite scrollt normal weiter. `touch-action` auf `manipulation` geändert, damit der erste Kontakt nicht mehr blockiert wird; beim aktivierten Ziehen übernimmt `setPointerCapture()` die Kontrolle über den Kontakt. Maus ist unverändert – dort scrollt man mit dem Rad, ein Klick auf den Griff zieht weiterhin sofort. Kernlogik isoliert mit fünf Szenarien durchgerechnet (einzelnes Streifen, bewusster Doppeltipp, zwei verschiedene Griffe, zu langsamer Doppeltipp, Maus).

---

## 3.0.34 – 15. September 2026

### Behoben

- **Ungewollter Autofokus nach dem Bearbeiten einer Karte (Beobachtung 4, 15.09.2026).** `submitCardForm()` fokussiert nach dem Speichern das Wort-Feld, damit man beim Neuanlegen mehrere Vokabeln hintereinander eintippen kann – dieser Fokus-Rücksprung lief aber auch nach dem Bearbeiten einer bestehenden Karte, wo er nur die Tastatur ungewollt öffnete. Fokus läuft jetzt nur noch beim Neuanlegen.

Freigegeben vom Betreiber für diesen einen Durchgang (drei markierte Punkte aus `plan/beobachtungen-lernwerkzeug.md`) – die übrigen Beobachtungen bleiben unangetastet, bis eine weitere Freigabe kommt.

---

## 3.0.33 – 15. September 2026

### Behoben

- **Kritisch: Das Kontaktformular auf `landing.html` wurde von der eigenen CSP blockiert.** Das Inline-Skript des Kontaktformulars (Phase 8, v3.0.28) hatte nie einen passenden Eintrag in der `script-src`-Direktive der Content-Security-Policy (`firebase.json`) – die Policy wurde beim Hinzufügen des Formulars nicht erweitert. Ohne `'unsafe-inline'` blockiert der Browser jedes Inline-Skript ohne passenden Hash; da das `<form>` kein `action`-Attribut hat, passierte beim Klick auf „Senden" nichts (nur ein Seiten-Reload) – kein Mailto, kein Honeypot, keine Validierung. Fund bei eigener, detaillierter Überprüfung der Arbeit: Hash mit zwei unabhängigen Methoden (Python `hashlib` und `openssl dgst`) nachgerechnet, Git-Historie bestätigt, dass die CSP zuletzt vor dem Kontaktformular geändert wurde. Fehlt in der `script-src` jetzt der zweite Hash (`sha256-68CssCcg1qYn8qNvv9rmLETZEvxAlnPhDuObep5Bv+E=`) ergänzt. Das Fehlerformular in den Einstellungen war nicht betroffen, weil sein Code in der externen `app.js` liegt (`script-src 'self'` deckt das bereits ab).

---

## 3.0.32 – 15. September 2026

### Behoben

- **Namensabgleich (v3.0.31) hatte eine Stelle übersehen.** Eigene Überprüfung der Arbeit fand: `impressum.html` nennt sich überall „Adrabic" (Titel, Meta-Description, OG-Tags), aber die Fußzeile zeigte weiterhin „Wiederholung" (`rechtsseite__fuss`). Jetzt auf „Adrabic" angeglichen. Geprüft und bestätigt unverändert korrekt: alle übrigen Vorkommen von „Wiederholung" im Repo sind das Fachwort für wiederkehrende Karten, kein Markenname (`manifest.json`, `landing.html` Meta-Beschreibung und Merkmalsliste, `sw.js`-Kommentar).

---

## 3.0.31 – 15. September 2026

### Geändert

- **Namensabgleich innen/außen (Landing-Page-Strategie, Entscheidung 2.5).** Die App zeigte innen an drei Stellen „Wiederholung" (Kopfzeile der Solo-Bildschirme, Kopfzeile der App selbst, Fußzeile mit Versionsnummer), obwohl außen überall „Adrabic" steht (`index.html`, `manifest.json`, Startseite). Alle drei jetzt auf „Adrabic" gezogen – reine Zeichenketten, keine Funktion des Lernwerkzeugs.
- **Kostenfrage-Wortlaut entschärft (Entscheidung 2.6).** FAQ auf `landing.html`: „Nein, die Nutzung ist komplett kostenlos." → „Die Nutzung ist kostenlos. Es gibt keine Werbung und keine Bezahlfunktion." Kein „derzeit"/„noch", keine Ankündigung – aber auch kein „komplett", das sich bei einem künftigen Angebot (z. B. für Klassenräume) als Dauerzusage erweisen könnte. JSON-LD FAQPage entsprechend nachgezogen, damit sichtbarer Text und strukturierte Daten übereinstimmen.

---

## 3.0.30 – 15. September 2026

### Behoben

- **Fehlerformular (v3.0.29) war beim Ausliefern faktisch kaputt, trotz „fertig" gemeldet.** Eigene Überprüfung nach der Umsetzung fand vier echte Fehler:
  - Die Knöpfe „×" und „Abbrechen" im Modal reagierten nicht: Das Modal liegt bewusst außerhalb von `#app` (das wird bei jedem `render()` komplett neu geschrieben), der eine delegierte Klick-Listener aus `app.js` hing aber an `#app` selbst – ein Klick außerhalb davon erreichte ihn nie. Jetzt hängt der Listener an `<body>`, das bleibt der einzige delegierte Klick-Listener über `data-action` (README.md), erreicht jetzt aber auch Elemente außerhalb von `#app`.
  - Die Eintrittsbewegung lief ins Leere: `animation: slideUp var(--dur-normal) ...` und `fadeIn` referenzierten ein nie definiertes Duration-Token und zwei nie definierte `@keyframes` – das Modal erschien ohne jede Bewegung. Jetzt dieselben, echten `@keyframes` wie beim bestehenden `.dlg`-System (`enter-fade`, `sheet-up`, `enter-pop`).
  - Der Fokus-Ring der Eingabefelder war unsichtbar: `rgba(var(--accent-rgb), 0.1)` griff auf ein nie definiertes Token zu. Die eigens gebauten Feld- und Knopf-Stile waren zudem komplett redundant – `input[type=...]`, `textarea` und `button`/`button.secondary` sind längst global gestylt (Abschnitt 7 der `styles.css`) und wurden schlechter neu erfunden statt wiederverwendet.
  - Die Fehlermeldung bei leerem Pflichtfeld nutzte den nackten Browser-`alert()` – genau das, wofür die App seit 1.8.0 ein eigenes Dialog-System (`dlgAlert`/`ui.dialog`) baut (Systemkästen zeigen auf dem Handy die Seitenadresse statt eines Titels). Jetzt `dlgAlert(...)`.
  
  CSS von ca. 170 auf ca. 80 Zeilen reduziert, indem nur noch die Modal-Hülle eigene Regeln bekommt und Felder/Knöpfe/Label die vorhandenen globalen Stile erben. Kein Klick auf den Hintergrund zum Schließen – dieselbe bewusste Entscheidung wie beim bestehenden `.dlg-backdrop` (auf dem Handy zu leicht versehentlich getroffen).

---

## 3.0.29 – 15. September 2026

### Hinzugefügt

- **Fehlerformular in den Einstellungen (Phase 8).** Neue Sektion „Hilfe" in Einstellungen mit Button „Fehler melden". Modal-Dialog mit sicherer Mailto-Implementierung analog zum Kontaktformular: Honeypot-Feld gegen Spam, verschlüsselte E-Mail-Adresse, Feldvalidierung. Name und E-Mail optional, Fehlerbeschreibung erforderlich. Öffnet beim Submit das Mail-Programm mit vorausgefülltem Betreff und Text.

---

## 3.0.28 – 15. September 2026

### Hinzugefügt

- **Kontaktformular auf der Startseite (Phase 8).** Sichere Mailto-Implementierung mit Honeypot-Feld gegen Spam und verschlüsselter E-Mail-Adresse. Feldvalidierung, Nachrichtentext erforderlich, Name und E-Mail optional. Öffnet beim Submit das Mail-Programm mit vorausgefülltem Betreff und Text.

---

## 3.0.27 – 15. September 2026

### Hinzugefügt

- **Sitzungslängen-Begrenzung: „Karten pro Sitzung" in Einstellungen →
  Lernen.** Bei „Alle" zeigt eine Sitzung jede fällige Karte auf einmal
  (bisheriges Verhalten); bei 10/20/30 stoppt sie danach – die restlichen
  bleiben fällig und stehen in der nächsten Sitzung wieder oben, Wiederholungen
  zuerst. Bremst NUR die einzelne Sitzung, nicht den Stoff selbst (das macht
  seit 2.3.0 das Schloss in `dueCardsFor`). Nötig, weil Nutzer ohne Zeit-Limit
  mittendrin abbrechen mussten; jetzt können sie vorher festlegen, wie viel
  reinpasst.

### Behoben

- **Alle „Löschen"-Knöpfe wurden im Hover unsichtbar.** Das Bereich-/Karten-/
  Speicherkarten-Löschen und das neue „Konto löschen" zeigten weiße Buttons
  mit weißem Text bei Hover – seitdem `--accent-hover` reines Weiß ist (beim
  Design-Redesign 3.0.0, vorher Goldton). `button:hover` und `button.danger`
  haben dieselbe Spezifität, `button:hover` steht später und gewinnt – es setzte
  nur `filter: brightness(1.08)` ohne `background` erneut, wodurch das weiße
  `--accent-hover` des übergeordneten `button:hover` einfach stehen blieb.
  Jetzt `button.danger:hover` mit explizitem `background: var(--negative)`
  wieder sichtbar.

## 3.0.26 – 13. September 2026

### Hinzugefügt

- **Tastatur-Alternative zum Ziehen: Karten, Karten innerhalb einer
  Speicherkarte und Speicherkarten selbst lassen sich jetzt auch ohne Maus
  oder Touch neu ordnen** (WCAG 2.1.1). Der Ziehgriff ist jetzt fokussierbar
  (`tabindex="0"`, `role="button"`, sprechender `aria-label` mit Wort/Name
  und Position, z. B. „Position 3 von 10"); Pfeil hoch/runter am Griff
  vertauscht die Zeile mit ihrem Nachbarn. Alle drei Code-Pfade, die beim
  Ziehen per Zeigegerät bereits existierten (Bereich, innerhalb einer
  Speicherkarte, Speicherkarten einer Gruppe), sind dafür in eigene
  Funktionen gefasst und werden von der Maus- UND der Tastatur-Bedienung
  gemeinsam genutzt, damit nicht zwei Wege dieselbe Ordnungszahl schreiben.
  Nach jedem Verschieben behält der Griff der bewegten Zeile den Fokus,
  über die Karten-/Speicherkarten-ID nach dem Neuzeichnen wiedergefunden –
  sonst würde der Fokus bei jeder Verschiebung auf den Seitenanfang
  zurückspringen. In einem eigenständigen Browser-Test (Playwright) mit
  nachgebauter Listenstruktur verifiziert: Reihenfolge ändert sich korrekt,
  Fokus bleibt über einen vollständigen DOM-Neuaufbau hinweg erhalten, an
  den Rändern der Liste passiert nichts.

## 3.0.25 – 13. September 2026

### Behoben

- **Zwei echte Kontrastverstöße gegen WCAG AA.** `--text-3` (Hinweise,
  Formularhilfe, kleine Beschriftungen) erreichte auf der jeweils
  schwächeren Fläche nur 3,51:1 (dunkel, gegen `--surface`) bzw. 3,22:1 (hell,
  gegen `--bg`) – die Norm verlangt 4,5:1 für normal großen Text. Beide Male
  denselben Farbton beibehalten, nur die Helligkeit angepasst: dunkel
  `#706e69` → `#82807a` (jetzt 4,53–5,07:1), hell `#8b8273` → `#6f685c`
  (jetzt 4,68–5,33:1). Dieselbe Lücke bei `--verdigris-400` (positive
  Zustände) in der hellen Fassung: 4,31:1 → mit `#3d7a5c` → `#3a7357` jetzt
  4,73:1. Alle Werte gegen beide Flächen (`--bg` und `--surface`)
  nachgerechnet, nicht nur behauptet.
- **Bereichs-Sheet ließ sich nicht mit Escape schließen**, anders als jeder
  andere Dialog in der App – nur der „Fertig"-Knopf ging. Jetzt schließt
  Escape auch dieses Sheet.
- **Eingabefeld im Dialog (`dlg-input`, z. B. beim Umbenennen) hatte keine
  eigene Beschriftung** – nur der Dialogtitel war für Screenreader verbunden,
  der eigentliche Hinweistext („Neuer Name für …") nicht. Jetzt per
  `aria-labelledby` mit diesem Text verbunden.
- **Checkbox beim Mehrfachauswählen von Karten** (`toggle-card-select`) hatte
  keine eigene Beschriftung – für Screenreader war nur „Kontrollkästchen"
  ohne Bezug zu erkennen, welche Karte gemeint ist. Jetzt `aria-label` mit dem
  Wort der Karte.

Alle vier Funde und Korrekturen sind Teil von Phase 9 (Barrierefreiheit,
`plan/phase-9-barrierefreiheit/`) – siehe dort für den vollständigen Befund,
auch zu dem, was diese Version **nicht** löst.

## 3.0.24 – 13. September 2026

### Neu

- **Selbstheilung bei Startfehler.** Der zuvor gemeldete Ladefehler
  („Start fehlgeschlagen") lag am Ende an einem lokal feststeckenden Service
  Worker/Cache – geholfen hat nur ein manuelles „Websitedaten löschen" in den
  Entwicklertools. Das kann man niemandem zumuten, der die App nur benutzen
  will.

  Ab jetzt versucht `app.js` das selbst, **einmal pro Sitzung und nur, wenn
  der Browser online zu sein glaubt**: Startet Firebase nicht, meldet
  `navigator.serviceWorker` alle Registrierungen ab, löscht alle eigenen
  Caches und lädt die Seite neu – bevor überhaupt ein Fehlerbildschirm
  erscheint. Kommt der Fehler danach immer noch, zeigt die App wie bisher
  „Start fehlgeschlagen", diesmal mit einem Knopf, der bei jedem Klick erneut
  aufräumt (nicht nur einmal pro Sitzung).

  Bewusst nur bei erkanntem Online-Zustand: Der eigene Cache ist genau das,
  was echtes Offline-Nutzen erst möglich macht – ihn während einer legitimen
  Offline-Phase zu löschen, würde den Fall verschlimmern, für den er gedacht
  ist.

## 3.0.23 – 13. September 2026

### Behoben

- **`sw.js` – Firebase-SDK-Ladefehler, der die App dauerhaft mit „Start
  fehlgeschlagen" hängen ließ.** Gemeldet vom Betreiber: Die App startete
  nicht, in der Konsole stand „Failed to fetch dynamically imported module:
  https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js" – und half sich
  nur mit einem Hard-Reload (Strg+Umschalt+R), ein normaler Reload blieb
  dauerhaft dabei.

  Ursache: Der Service Worker fragt bei Firebase-SDK und Quran-Schrift
  „zuerst Netz, dann eigenen Cache". Schlug das Netz einmal fehl (kurzer
  Aussetzer beim CDN, Firmen-Proxy o.ä.), konnte der **Browser selbst** diese
  Fehlantwort in seinem eigenen HTTP-Cache ablegen – unabhängig vom
  Service-Worker-Cache. Jeder weitere normale Reload fragte dann wieder genau
  diesen Browser-Cache ab, statt das Netz erneut zu versuchen, und bekam
  denselben alten Fehler zurück. Nur ein Hard-Reload umgeht diesen
  Browser-Cache von sich aus – daher half er, und nur er.

  Behoben: Die Netz-Anfrage für Firebase-SDK, Quran-Schrift und die eigenen
  Dateien läuft jetzt mit `cache: "no-store"`, fragt also wirklich das Netz
  und nie eine im Browser hinterlegte alte Antwort. Zusätzlich landet nur
  noch eine echte (`res.ok`) Antwort im eigenen Cache – eine Fehlerantwort
  dort abzulegen hätte denselben Fehler nur eine Ebene tiefer eingebaut.

  Diese Ursache lag **nicht** im Umbau der Startseite – `sw.js` trug diese
  Logik seit ihrer Einführung (vor Phase 5) unverändert.

## 3.0.22 – 13. September 2026

### Zurückgenommen

- **`start-kartensatz.json` (v3.0.21) ist wieder raus.** Der Betreiber hat den
  Inhalt zurückgemeldet: erfundene arabische Vokabeln – teils mit
  Quran-Bezug – ungeprüft von einem Agenten geschrieben und auf die
  Startseite gestellt, war zu schnell und nicht seine Entscheidung. Zu Recht:
  Welcher Wortschatz auf einer öffentlichen Seite unter seinem Namen steht,
  entscheidet er, nicht ein Agent, und gerade bei religiös bezogenen Wörtern
  ist die Genauigkeit nicht verhandelbar.
- `landing.html`, Abschnitt „Was passiert, wenn du anfängst" – der
  Download-Knopf und die Bezugnahme auf die 50 Karten sind raus. Der Text
  sagt wieder ehrlich, was heute stimmt: „Dein Stoff, nicht unserer" – man
  legt die erste Karte selbst an.
- FAQ-Frage „Ich habe noch keine Karten – wie fange ich an?" umformuliert:
  keine Verweis mehr auf eine Datei, die es nicht mehr gibt.

Damit ist die Entscheidung „womit fängt ein Neuer an" wieder offen (siehe
`plan/landing-page-strategie/STRATEGIE.md`, 2.1) – diesmal mit der Vorgabe,
dass ein eigener Kartensatz, falls gewünscht, vom Betreiber selbst geschrieben
oder mindestens freigegeben wird, nicht vom Agenten.

## 3.0.21 – 13. September 2026

### Neu

- **Startkartensatz „Arabisch — die ersten 50 Wörter"** (`start-kartensatz.json`)
  – 50 Karten in fünf Lektionen zu je zehn Wörtern: Pronomen, Menschen, Dinge
  und Orte, Wörter aus dem Quran, erste Verben. Jede Karte trägt die Aussprache
  als Notiz. Herunterzuladen auf der Startseite, einzuspielen über
  „Einstellungen → Kartensatz einspielen".

  Grund: Wer sich bisher registrierte, stand vor einem **leeren** Werkzeug – der
  einzige vorhandene Kartensatz (Medina Buch 1) ist bewusst privat. Der Satz ist
  eigens dafür geschrieben, enthält keinen Buchinhalt und löst damit auch keine
  Urheberrechtsfrage aus.

- **Startseite neu aufgebaut** (`landing.html`) – aus einem Aufmacher mit drei
  Kästchen wird eine Seite, die zeigt statt behauptet: Handschrift-Feld, die
  Stufenleiter mit echten Zahlen, „Nicht/Fast/Sicher", Lektionen, ein Abschnitt
  „Was passiert, wenn du anfängst" mit den drei Schritten und dem Download, ein
  Abschnitt „Was Adrabic nicht ist", die übrigen Funktionen als Liste, FAQ mit
  einer neuen Frage („Ich habe noch keine Karten – wie fange ich an?") und ein
  zweiter Handlungsaufruf am Ende.

### Behoben

- **Das Hell/Dunkel-Skript der Startseite wurde von der eigenen CSP blockiert.**
  `landing.html` trug eine Fassung des Skripts **ohne** den Kommentarblock, den
  `index.html`, `impressum.html` und `datenschutzerklaerung.html` haben – und die
  CSP in `firebase.json` erlaubt genau einen Hash, nämlich deren. Das Skript lief
  auf der Startseite also nie: Wer hell eingestellt hatte, sah die Startseite
  trotzdem dunkel und beim Klick auf die App einen Farbsprung. Das Skript ist
  jetzt Zeichen für Zeichen dasselbe wie in `index.html`, der Hash stimmt wieder.
  `firebase.json` bleibt unverändert.

### Geändert

- `landing.html` – Seitentitel und Beschreibung tragen jetzt „arabische
  Vokabeln"; vorher zielten beide auf generische Vokabel-Suchen, und das Wort
  „Arabisch" kam im ganzen Seitenkopf nicht vor.
- `FAQPage`-JSON-LD auf die sechs sichtbaren Fragen nachgezogen.

`start-kartensatz.json` steht bewusst **nicht** in `APP_SHELL`: Die Datei wird
zum Starten der App nicht gebraucht, sie wird einmal heruntergeladen und
eingespielt.

## 3.0.20 – 13. September 2026

### Geändert

- **`landing.html` – die unbelegte Wirkungsbehauptung ist raus.** Die Seite
  sagte „Wissenschaftlich bewährte Wiederholungen", „Basiert auf der
  Forget-Curve" und „funktioniert wirklich". Dahinter steht aber ein
  selbstgebautes Stufensystem (Faktor 1,8, Deckel bei 180 Tagen,
  `app.js:89-99`) – kein SM-2, kein Anki, keine Studie. Auf einer
  öffentlich erreichbaren, bei Google eingereichten Seite ist das
  angreifbar, und im Impressum steht eine dafür verantwortliche Person.
  Entscheidung des Betreibers: ersetzen, nicht belegen.
  - Lösungskasten sagt jetzt die Mechanik statt der Wirkung: „Stufe 1 heißt
    morgen, Stufe 4 in sechs Tagen, Stufe 7 in 34 Tagen … nie weiter als
    180 Tage." Das ist überprüfbar und sagt dasselbe, ohne etwas zu
    behaupten.
  - Das Kästchen „Wissenschaftlich" ist ersetzt durch „Mitschreiben" – das
    Handschrift-Feld (`app.js:1006ff`, `5189ff`) ist der stärkste Punkt, den
    die App wirklich hat, und stand bisher nirgends auf der Seite.
  - Meta- und Open-Graph-Beschreibung ohne „wissenschaftlich bewährt", dafür
    mit dem Wort „arabische" – das kam im gesamten Seitenkopf bisher nicht
    vor, obwohl die Suche danach geht.

### Behoben

- `landing.html` – `<meta name="color-scheme">` stand fest auf `dark`, obwohl
  das Skript darüber auch auf hell schaltet. Bei heller Einstellung hat der
  Browser Formular- und Systemfarben trotzdem dunkel gezeichnet. Jetzt
  `light dark`.

Headline, Handlungsaufruf und Aufbau der Seite bleiben unverändert: Der
Umbau wartet auf eine offene Entscheidung (`plan/landing-page-strategie/STRATEGIE.md`,
Abschnitt 2.1).

## 3.0.19 – 13. September 2026

### Behoben

- `landing.html` – ein Satz in der Kachel „Überall verfügbar" war
  grammatisch kaputt („Nutzer kannst du von überall her weitermachen —
  synchronisiert") und stand so auf der öffentlichen Startseite. Ersetzt
  durch „Auf jedem Gerät dort weitermachen, wo du aufgehört hast — alles
  wird synchronisiert". Reine Textkorrektur, keine Änderung an der
  Gestaltung oder am Aufbau der Seite: Der Umbau der Startseite wartet
  bewusst auf die Strategie (`plan/landing-page-strategie/`).

## 3.0.18 – 13. September 2026

### Neu

- **`robots.txt` und `sitemap.xml`** – schließen den angemeldeten Bereich
  (`/index.html`, Login/App) von der Suchmaschinen-Indexierung aus, listen
  die öffentlichen Seiten (`/`, `impressum.html`,
  `datenschutzerklaerung.html`) für Google auf.
- **FAQ-Bereich** auf der Startseite (`landing.html`) – fünf echte Fragen zu
  Kosten, Sprache, Account, Offline-Nutzung und Konto löschen, dazu
  strukturierte Daten (`FAQPage`-JSON-LD) für die Suche.

### Geändert

- `landing.html`, `impressum.html`, `datenschutzerklaerung.html` – Meta-
  Beschreibung, Open-Graph-Angaben und kanonische URL je Seite ergänzt.
- `index.html` – `<meta name="robots" content="noindex, nofollow">`, damit
  der Login-/App-Bereich zusätzlich zur `robots.txt` nicht indexiert wird.

## 3.0.17 – 13. September 2026

### Neu

- **Öffentliche Startseite** (`landing.html`) – erste Seite, die Besucher
  sehen (unter `/`). Zeigt das Problem spürbar (Vokabeln vergessen), dann
  die Lösung (wissenschaftliche Wiederholungen), danach Handlungsaufruf
  (Jetzt anfangen). Von der App getrennt – Login erst nach dem Klick auf
  den Button.

### Geändert

- `firebase.json` – Rewrite-Regel für die öffentliche Startseite: `/`
  serviert jetzt `landing.html` statt `index.html`.
- `sw.js` – `landing.html` zur `APP_SHELL` hinzugefügt, damit die
  Startseite auch offline verfügbar ist.

## 3.0.16 – 13. September 2026

### Geändert

- **Datenschutzerklärung präzisiert** – im Vergleich mit einer fremden,
  deutlich detaillierteren Vorlage nachgezogen:
  - Vollständige Anschriften der eingesetzten Auftragsverarbeiter (Google
    Ireland Limited, Google LLC) statt bloßer Namensnennung.
  - Konkrete Rechtsgrundlage für die Datenübertragung in die USA benannt
    (Art. 46 Abs. 2 lit. c DSGVO, EU-Standardvertragsklauseln) statt der
    vagen Formulierung „geeignete Garantien".
  - Die zuständige Aufsichtsbehörde für Beschwerden ist jetzt namentlich
    und mit Anschrift genannt (Unabhängiges Landeszentrum für
    Datenschutz Schleswig-Holstein, Holstenstraße 98, 24103 Kiel – am
    Sitz des Verantwortlichen in Leck zuständig), nicht mehr nur als
    Beispiel.
  - Hosting-Logdaten und Fremdserver-Abschnitt nennen jetzt konkret, was
    verarbeitet wird, und je eine eigene Rechtsgrundlage.

## 3.0.15 – 13. September 2026

### Geändert

- **Zwei Datenschutz-Texte unter zwei Namen zusammengelegt.** Seit v3.0.3
  gab es einen eigenen, alltagssprachlichen Bildschirm „Datenschutz" in
  der App; seit v3.0.9 zusätzlich die vollständige rechtliche
  „Datenschutzerklärung" als eigene Seite. Beide sagten im Kern dasselbe.
  Der alltagssprachliche Bildschirm (`renderDatenschutz()`) ist entfernt,
  sein Inhalt steht jetzt als Abschnitt „Kurz gesagt" oben in
  `datenschutzerklaerung.html`, vor dem vollständigen Rechtstext. Es gibt
  jetzt nur noch **einen** Weg dorthin, überall „Datenschutz" genannt.
- Die Fußzeile auf Anmeldebildschirm und in den Einstellungen zeigt jetzt
  „Datenschutz · Impressum" statt vorher drei bzw. zwei unterschiedlich
  benannter Einträge.

## 3.0.14 – 13. September 2026

### Geändert

- **Impressum, Datenschutz und Datenschutzerklärung sahen aus wie
  Bedienschritte, nicht wie Fußnoten.** Sie standen in derselben Größe
  und Akzentfarbe wie „Passwort vergessen?" oder „Abmelden" – dabei sind
  es Pflichtangaben, keine Handlungen. Neue Klasse `.rechtsfuss`: klein
  (0.75rem statt 0.8125rem), gedämpft (`--text-3` statt `--accent`), zu
  einer Zeile zusammengefasst statt einzeln gestapelt. Bewusst **keine**
  sechste Knopf-Stufe (`styles.css` Abschnitt 6 legt genau fünf fest) –
  das hier ist Fließtext mit Link, kein Knopf.
- Auf dem Anmeldebildschirm stehen „Datenschutz", „Impressum" und
  „Datenschutzerklärung" jetzt in einer Zeile mit Punkt-Trennzeichen
  statt in drei einzelnen Blöcken.

## 3.0.13 – 13. September 2026

### Behoben

- `desktop-icon.png` fehlte in `APP_SHELL` (`sw.js`) – seit Phase 1
  bekannt, aber nie mitgenommen. Die Datei wird für Browser-Tab,
  Ladebildschirm und `manifest.json` gebraucht und ist jetzt auch beim
  allerersten Start ohne Internet da.

## 3.0.12 – 13. September 2026

### Behoben

- **Impressum und Datenschutzerklärung waren nach der Anmeldung nicht
  mehr erreichbar** – beide Links standen nur auf dem Anmeldebildschirm.
  Ein angemeldeter Nutzer hätte sich erst abmelden müssen, um sie zu
  sehen. §5 DDG verlangt, dass das Impressum jederzeit leicht erreichbar
  ist. Beide Links stehen jetzt zusätzlich in den Einstellungen, direkt
  unter „Konto".

## 3.0.11 – 13. September 2026

### Behoben

- **Datenschutz-Text verschwieg den Namen.** Bei der Registrierung ist ein
  Name Pflichtfeld (`app.js:1791`), gespeichert in Firebase Auth und als
  Feld `name` in Firestore. Weder der Hinweis in der App noch die neue
  Datenschutzerklärung führten ihn auf – in einem Text, der aufzählt, was
  gespeichert wird, ist das eine Lücke. Beide nennen ihn jetzt, samt der
  Angabe, dass er frei wählbar ist.
- Impressum und Datenschutzerklärung sprachen als „wir", obwohl dort eine
  einzelne Privatperson steht. Jetzt durchgehend „der Betreiber".
- Die Links „Impressum" und „Datenschutzerklärung" auf dem
  Anmeldebildschirm standen dünner als der „Datenschutz"-Knopf daneben:
  `a.linklike` setzte per `font: inherit` die Schriftstärke 600 wieder
  zurück. Alle drei sind jetzt gleich.
- Auf der Impressum-Seite klebte die erste Abschnittsmarke an der
  Überschrift – dort fehlt der Einleitungssatz, der auf der anderen Seite
  den Abstand hält.

## 3.0.10 – 13. September 2026

### Behoben

- **Die CSP aus 3.0.7 hat stillschweigend Teile der App lahmgelegt.** Die
  Regel `style-src 'self'` blockiert nicht nur `<style>`-Blöcke, sondern
  auch jedes `style="…"`-Attribut – davon hat `app.js` 81 Stück, darunter
  **funktionale**: die Füllbreite sämtlicher Fortschrittsbalken
  (`heute-bar`, `lern-balken`, `lekt-bar`, `modebar__fortschritt`), die
  Breiten und Farben der Statistik-Segmente und die Balkenhöhen im
  Verlaufsraster. Die Prüfung in 3.0.7 hatte behauptet, es gebe keine
  solchen Attribute; das war falsch. `style-src` erlaubt jetzt
  zusätzlich `'unsafe-inline'`.
- **Bilder auf Karten wurden blockiert.** Das Extra-Feld einer Karte zeigt
  eine eingetragene Bild-Adresse als Bild an (`renderExtra`), aber
  `img-src 'self' data:` ließ nur eigene Bilder zu. `img-src` erlaubt
  jetzt zusätzlich `https:`.
- Impressum und Datenschutzerklärung (3.0.9) hatten ihr Layout in einem
  `<style>`-Block stehen und wären von derselben Regel getroffen worden.
  Die Regeln liegen jetzt in `styles.css`, Abschnitt 18.

## 3.0.9 – 13. September 2026

### Neu

- **Impressum und Datenschutzerklärung** als eigene, statische Seiten
  (`impressum.html`, `datenschutzerklaerung.html`) – ohne Anmeldung
  lesbar, verlinkt vom Anmeldebildschirm. Ergänzt den bisherigen
  Datenschutz-Hinweis in der App (bleibt als alltagssprachliche
  Kurzfassung bestehen) um den rechtlich vollständigen Text.
- `a.linklike` in `styles.css` – damit ein `<a>`-Link genauso aussieht
  wie die bestehenden Link-Buttons.

## 3.0.8 – 12. September 2026

### Behoben

- Datenschutz-Hinweis (Einstellungen → Datenschutz) beschrieb „Konto
  löschen" noch als Bitte an den Betreiber ohne eigenen Knopf – der Text
  war seit Phase 2 (v3.0.5) veraltet. Beschreibt jetzt den tatsächlich
  vorhandenen Weg: selbst löschen unter Einstellungen → Konto löschen.

## 3.0.7 – 12. September 2026

### Sonstiges

- Firebase-SDK von 10.12.2 auf 10.14.1 gehoben (letzter Patch-Stand innerhalb
  derselben Hauptversion, ohne API-Änderungen).
- `final_icon_glow_v3.png` aus dem Repo entfernt – eine Quelldatei der
  Icon-Herleitung, die nie ausgeliefert wurde (nur in einem Kommentar in
  `icon.svg` erwähnt), aber bislang ungeschützt mitveröffentlicht war.
- `firebase.json` und `.firebaserc` hinzugefügt – Hosting-Konfiguration für
  den geplanten Umzug von GitHub Pages auf Firebase Hosting (Phase 4).
  Wirkungslos, bis tatsächlich deployt wird.

## 3.0.6 – 12. September 2026

### Behoben

- **„Konto löschen" hat sich selbst ausgehebelt.** Die Firestore-Daten waren
  nach dem Löschen kurz weg, tauchten aber gleich wieder auf. Ursache: Ein
  fehlendes Nutzerdokument bedeutet für die App normalerweise „frisches
  Konto, erster Start" – an drei Stellen (Live-Abgleich, `persistVerlauf`,
  `schreibeInsNutzerdokument`) wird dann automatisch ein neues, leeres
  Dokument angelegt. Genau diese Stellen sprangen auch an, wenn *die
  Löschung selbst* das Dokument entfernt hat, und schrieben es umgehend
  wieder hin. Jetzt merkt sich die App während der Löschung, dass sie
  gerade läuft, meldet zuerst ihre Live-Abgleiche ab und überspringt an den
  drei Stellen das automatische Neuanlegen.
- Schlägt die Löschung unterwegs fehl, lädt die Seite jetzt automatisch neu,
  statt mit abgemeldeten Live-Abgleichen weiterzulaufen.

## 3.0.5 – 12. September 2026

### Neu

- **Konto endgültig löschen.** In den Einstellungen unter „Konto" gibt es
  jetzt einen Weg, das eigene Konto vollständig zu entfernen – Karten,
  Bereiche und das Nutzerdokument in Firestore ebenso wie das Konto selbst
  in Firebase Auth. Bisher gab es dafür keinen Weg in der App.

  Zur Sicherheit: Vor der Rückfrage wird automatisch ein Voll-Backup zum
  Herunterladen angeboten. Bestätigt wird durch Eintippen der eigenen
  E-Mail-Adresse, nicht durch einen Klick, der sich versehentlich
  wegtippen ließe. Verlangt Firebase aus Sicherheitsgründen eine frische
  Anmeldung, wird einmalig nach dem Passwort gefragt.

  Die Reihenfolge beim Löschen ist bewusst: zuerst die Daten in Firestore,
  danach das Konto in Firebase Auth. Schlägt der zweite Schritt fehl,
  bleibt ein Konto ohne Daten übrig – anmeldbar und wiederholbar. In der
  umgekehrten Reihenfolge wäre ein Fehlschlag beim zweiten Schritt ein
  Datenbestand ohne Konto, das ihn je hätte löschen können – endgültig
  verwaist.

## 3.0.4 – 12. September 2026

### Geändert

- **Die Firestore-Regeln prüfen jetzt auch, *was* geschrieben wird – nicht
  mehr nur, *wer* schreibt.** Bisher stand dort ein einziger Satz: eigenes
  Konto, angemeldet, E-Mail bestätigt – und danach war jedes Feld frei. Wer
  die Entwicklerwerkzeuge öffnete, konnte `maxStufe` auf 9999 setzen und
  damit das Freischalten der nächsten Lektion aushebeln, beliebige neue
  Felder anlegen, Zahlen als Text schreiben oder unter dem eigenen Konto
  erfundene Unterpfade als Ablage benutzen. Jetzt hat jedes Dokument eine
  feste Feldliste mit Art und Grenzen, und es gibt nur noch die zwei
  Sammlungen, die die App wirklich benutzt (`bereiche`, `karten`).

  Zwei Dinge waren dabei wichtiger als Strenge. Erstens wird nur geprüft,
  was sich auch ändert: `request.resource.data` ist bei einer Änderung das
  vollständige Dokument, ein altes Feld aus einer früheren Fassung hätte
  sonst jeden weiteren Schreibvorgang dieses Kontos blockiert. Zweitens
  sind die Grenzen großzügiger als die Oberfläche – die Regel soll
  Missbrauch abwehren, nicht das Formular nachbauen, sonst bricht die
  nächste kleine Änderung das Speichern beim Nutzer.

  Geprüft mit dem Firestore-Emulator: 62 Fälle, 31-mal normaler Betrieb
  (anlegen, lernen, bearbeiten, verschieben, löschen, importieren,
  synchronisieren – auch für ein Konto mit Feldern aus alten Fassungen) und
  31-mal Missbrauch (fremde Kennung, fehlende E-Mail-Bestätigung, erfundene
  Felder, falsche Datentypen, erfundene Unterpfade). Alle 62 wie erwartet.

- **Wort, Übersetzung und Notiz haben eine Länge.** Vorher keine: aus dem
  Eingabefeld kam, was hineinpasste, und aus einer Backup-Datei kam, was
  darin stand. 1000 Zeichen für Wort und Übersetzung, 5000 für die Notiz –
  weit über allem, was eine Vokabelkarte braucht, aber weit unter dem, was
  ein Firestore-Dokument sprengt. Dieselben Zahlen stehen in den Regeln;
  der Browser prüft für die Bequemlichkeit, die Regel für die Sicherheit.

- **Der Import prüft die Datei, bevor er sie einspielt.** Erst die Größe
  (höchstens 5 MB, ohne die Datei überhaupt zu lesen), dann die Struktur,
  dann die Anzahl: bis zu 200 Bereiche und 20.000 Karten auf einmal. Vorher
  las `readAsText` jede Datei in beliebiger Größe ein, und was danach an
  Bereichen und Karten herauskam, ging ungezählt in die Cloud. Eine Datei
  musste dafür nicht böswillig sein – eine versehentlich doppelt
  zusammengefügte Sicherung reicht.

## 3.0.3 – 12. September 2026

### Neu

- **Ein Datenschutz-Bildschirm.** Erreichbar aus den Einstellungen unter
  „Konto" – und, absichtlich, auch vom Anmeldebildschirm aus: wer noch
  überlegt, ob er ein Konto anlegt, muss vorher lesen können, was dabei
  gespeichert wird, nicht erst danach. Deshalb steht die Abfrage in
  `render()` vor dem Anmeldezweig; der Zustand darunter bleibt stehen, man
  landet beim Schließen wieder dort, wo man herkam.

  Der Text ist bewusst Fließtext in derselben Sprache wie der Rest der App
  und kein Baustein-Rechtstext: was gespeichert wird (Konto, Lernstoff,
  Gerät), wer es sehen kann, was *nicht* passiert (keine Werbung, kein
  Tracking, keine Analyse), welche zwei fremden Server beim Start die
  IP-Adresse sehen (`gstatic.com` fürs Firebase-SDK,
  `verses.quran.foundation` für die Koranschrift), und wie man seine Daten
  mitnimmt oder löschen lässt. Er ist keine anwaltlich geprüfte Erklärung –
  das steht auch so darunter. Ein Impressum gibt es bewusst nicht: solange
  die App privat und unentgeltlich von einem kleinen Kreis genutzt wird,
  greift §5 DDG nicht, und ein Impressum würde die Wohnanschrift öffentlich
  ins Netz stellen, ohne dass jemand etwas davon hätte.

## 3.0.2 – 12. September 2026

### Behoben

- **Symbol blieb leer, wenn man die App zum Homescreen hinzufügte.** Safari
  kann kein SVG als `apple-touch-icon` darstellen – ohne PNG bekam iOS beim
  "Zum Home-Bildschirm" entweder gar kein Symbol oder einen Screenshot der
  Seite statt der Marke. Jetzt gibt es `apple-touch-icon.png` (180×180,
  Apples eigene Empfehlung) sowie `icon-192.png` und `icon-512.png` fürs
  Manifest, alle drei direkt aus `icon.svg` gerendert, damit sie exakt
  gleich aussehen. Die SVG-Fassung bleibt für Browser-Tab und `purpose:
  "any maskable"` bestehen, sie kann nur nicht überall verlässlich als
  Homescreen-Symbol dienen. Alle drei PNGs stehen jetzt auch in `APP_SHELL`
  (sw.js), sonst würden sie offline fehlen.

## 3.0.1 – 12. September 2026

### Geändert

- **Die Marke ist jetzt die echte Blüte, nicht mehr das Blatt-Symbol – und
  nicht mehr von Hand nachgezeichnet.** Bisher zeichnete `ikon("marke")`
  ein offenes, dünnes Blatt-Icon – frei erfunden, ohne Bezug zum
  tatsächlichen Zeichen auf TikTok & Co. Der erste Versuch, das zu
  ersetzen, war ebenfalls von Hand geschätzt und kam der Vorlage nur
  ungefähr nahe (spitze statt runde Blütenblätter). Die jetzige Kontur
  stammt stattdessen aus einer Kantenverfolgung über das tatsächliche
  Markenbild (`final_icon_glow_v3.png`, Moore-Neighbor-Tracing, danach nur
  leicht vereinfacht) – keine Schätzung mehr, sondern abgepaust. Per
  Pixel-Vergleich mit der Vorlage nachgemessen: 0,29 % abweichende Pixel
  bei 512×512, der Rest liegt im Antialiasing-Saum der Vorlage selbst.
  Betroffen:
  Boot-Bildschirm, die Marke über den Solo-Bildschirmen (Anmelden,
  Registrieren, Einrichtung) und `icon.svg` (Browser-Tab, Startbildschirm,
  installierte App). Einzige bewusste Abweichung vom Original: der im
  Vorbild nur 1–3 px dünne Stiel ist auf 7 px (icon.svg) bzw. sichtbare
  Strichstärke (App-Icon) verstärkt, sonst würde er bei App-Icon-Größen
  wegkippen.
- **In der App bleibt die Blüte `currentColor`, in `icon.svg` wird sie fest
  Creme.** Im Vorbild ist die Blüte cremeweiß auf Schwarz – für die
  App-Instanzen würde das im hellen Thema aber auf fast demselben
  Papierton verschwinden. Dort trägt die Blüte weiterhin die Akzentfarbe
  (Gold im Dunkeln, Bronze im Hellen), wie das Blatt-Symbol vorher auch.
  `icon.svg` kennt kein Thema und bleibt darum bei Creme auf
  Fast-Schwarz, wie im Original.
- **Neu: `--mark-glow`.** Ein weicher Schein hinter der Marke auf dem
  Boot-Bildschirm und über den Solo-Bildschirmen – nur im Dunkeln, wo
  Licht auf Fast-Schwarz Sinn ergibt. Im hellen Thema `none`.
- `icon.svg` hat jetzt zusätzlich einen zentrierten Schein-Verlauf statt
  reiner Fläche. Die Bildkomposition (Größe/Rand der Blüte im 512er
  Feld) ist unverändert vom Original übernommen – sie lag von sich aus
  bereits sicher innerhalb des maskierbaren Kreises (40 % Radius), eine
  künstliche Vergrößerung dafür hätte nur vom Original abweichen lassen.

---

## 3.0.0 – 12. September 2026 — „Codex"

Eine neue Oberfläche. Der Stoff, die Stufen, die Cloud und die Konten sind
unverändert geblieben – nachweislich: `initFirebase`, `patchDoc`, `persistAll`,
`persistCardGrade`, `persistStreak`, `persistSettings`, `gradeCard`,
`intervalForStufe`, `nextReviewForStufe`, `evaluateStreakForNewDay`, `normCard`,
`normSet` und `normBereiche` sind Zeichen für Zeichen dieselben wie in 2.21.6.

### Wie es gebaut ist

- **Drei Dateien statt einer.** Gestaltung liegt jetzt in `styles.css`, Ablauf in
  `app.js`, und in der `index.html` steht nur noch, was vor dem ersten Bild
  laufen muss. Beide neuen Dateien stehen in der App-Hülle des Service Workers –
  ohne das startet die App offline zwar, aber ohne Aussehen und ohne Funktion.
- **Ein Designsystem statt verstreuter Werte.** Farben laufen in drei Schichten:
  Primitive → Semantik → Komponente. Wer die Palette ändern will, ändert die
  erste; wer die Bedeutung ändern will, die zweite. Dazu eine Schriftleiter,
  eine Abstandsleiter, sechs Radien und fünf Elevationsstufen.
- **Tiefe kommt aus Fläche und Haarlinie, nicht aus Schatten.** Auf warmem
  Fast-Schwarz ist ein Schatten fast unsichtbar; wer Tiefe nur darüber baut,
  bekommt flache Kästen mit Aufkleber-Rand. Schatten kommt erst ab Stufe 2 dazu.
- **Eintrittsbewegungen sind `@keyframes`, keine Transitions.** `render()`
  ersetzt den kompletten Inhalt von `#app`; auf frisch eingefügten Elementen
  laufen Transitions nicht. Wer das vergisst, wundert sich, warum nichts
  passiert.

### Neu

- **Navigation unten am Handy, links am Desktop.** Ein einziger `<nav>`-Block mit
  drei Knöpfen; welche Form er annimmt, entscheidet allein die `styles.css`.
  Auf „Lernen" sitzt ein Punkt, wenn heute etwas fällig ist.
- **Bereichs-Sheet statt Pill-Reihe.** Die waagerecht scrollende Reihe kostete
  eine volle Zeile auf dem Bildschirm, den man täglich sieht, und hörte ab vier
  Bereichen auf, bedienbar zu sein. Im Sheet steht zusätzlich, wie viel in jedem
  Bereich offen ist – das war vorher nirgends zu sehen. Am Desktop steht die
  Liste offen in der Spalte links.
- **Die Abfrage ist eine Bühne.** Vollbild, das Wort in der Mitte, die Bewertung
  unten verankert, wo der Daumen ohnehin liegt, und ein Fortschrittsstrich über
  allem. Statt Kopfzeile, Bereichsreihe und Reitern eine einzige Zeile.
  Die Durchsicht bekommt dieselbe Leiste.
- **Eine Lernstufen-Rampe für alles.** Kalender, Stufenband, Lektionsbalken und
  Plaketten sprachen bisher drei verschiedene Farbsprachen – Rot hieß im
  Stufenband „wackelig" und auf dem Bewertungsknopf „falsch". Jetzt heißt mehr
  Gold überall dasselbe: sitzt besser.
- **Echte Leerzustände** mit Symbol, Satz und genau einer Handlung – getrennt
  nach „noch gar nichts da", „heute nichts mehr fällig" und „keine Treffer".
- **Ladezustand mit Wortmarke** statt eines Textkastens; der 9-Sekunden-Hinweis
  aus 2.21.1 bleibt unverändert darin.
- **Fehler in drei Tiefen:** blockierend (eigener Bildschirm mit einem Weg
  weiter), Banner (bleibt stehen, solange das Problem besteht) und Feld. Was
  anhält, gehört nie in eine Meldung, die von selbst verschwindet.
- **Kurze Rückmeldung** für Handlungen, die bisher stumm waren.
- **Ein App-Symbol.** `manifest.json` hatte bis hierher ein leeres Icons-Feld –
  installiert wurde die App also ohne eigenes Bild.

### Geändert

- **Emoji vollständig durch SVG ersetzt.** Das Zeichenvorrat-System gibt es seit
  2.21.5, benutzt hat es nur drei Symbole; der Rest der App stand weiter auf
  Emoji, die je nach Gerät unterschiedlich fett, bunt oder schlicht fremd
  aussahen und sich weder färben noch an die Akzentfarbe binden ließen. Jetzt
  sind es rund dreißig Symbole auf einem Raster, in `currentColor`. Einzige
  bewusste Ausnahme bleibt die native Art-Auswahl im Autorenmodus: ein
  `<option>` kann kein SVG zeichnen.
- **`.panel` ist kein Kasten mehr, sondern Rhythmus.** Vorher war jeder
  Abschnitt ein Kasten – wenn alles ein Kasten ist, ordnet keiner mehr etwas.
  Einen Rahmen gibt es nur noch, wenn der Inhalt ein Ding ist.
- **Einstellungen als gruppierte Liste** statt fünf gestapelter Kästen. Die
  Versionsnummer steht jetzt dort statt klein unter jedem Bildschirm.
- **Arabische Wörter in Listen stehen linksbündig** über ihrer Übersetzung. Die
  Schrift läuft weiter von rechts nach links; nur der Block sitzt an derselben
  Kante wie alles andere in der Zeile – sonst entsteht ein Zickzack.
- **Die Handschrift-Wahl im Übungsmodus steht vor dem Start-Knopf**, nicht
  darunter. Ein Haken, den man erst unter dem Knopf sieht, ist einer, den man
  nicht mehr setzt.
- Der Backup-Hinweis erscheint auf dem Einstellungs-Bildschirm nur noch einmal.

### Behoben

- **„Gesehen" in der Durchsicht lief über den Knopfrand hinaus.** Der Knopf war
  als rundes Symbolfeld gesetzt, trägt aber Text.
- **Ein Tipp auf die Modusleiste galt im Übungsmodus als „weiter".** Sie steht
  jetzt auf derselben Ausnahmeliste wie die Zeichenleiste.

---

## 2.21.6 – 11. September 2026

### Behoben

- **Tippen außerhalb des Kastens im Übungsmodus wirkte immer noch nicht.**
  Die Korrektur in 2.21.1 hat innerhalb von `#app` zu wenig verlangt, aber
  `#app` selbst ist nur so hoch wie sein Inhalt – auf einem hohen
  Handy-Bildschirm blieb darunter ein Streifen nacktes `<body>` übrig, der
  gar nicht mehr zu `#app` gehört. Ein Tipp dort erreichte den Listener nie.
  Der Listener hängt jetzt an `<body>` (das immer die volle
  Bildschirmhöhe trägt), nicht mehr an `#app`.

- **Bildschirm falsch positioniert nach Vollbild → Verkleinern im
  Handschriftmodus.** Die Korrektur in 2.21.1 griff nur beim Aufdecken
  über „Fertig". Verließ man das Vollbild stattdessen über den
  Verkleinern-Knopf selbst (z. B. nach dem Aufdecken, um die eigene
  Schrift noch mal neben der Lösung zu vergleichen), blieb die Seite an
  der alten Scrollposition von vor dem Vollbild stehen – die passte nicht
  mehr zum Inhalt darunter. Beide Wege räumen jetzt über dieselbe Stelle
  auf.

---

## 2.21.5 – 11. September 2026

### Neu

- **Eigenes SVG-Icon-System statt Emoji.** Der Merken-Stern (bisher ☆/⭐)
  und die Speicherkarten-Art-Symbole (bisher 📖/📚) wirkten je nach
  Gerät unterschiedlich fett, bunt oder gar nicht passend zum sonstigen
  Design. Jetzt zeichnet die App Umriss-Buch, Tag-Symbol und Stern selbst,
  in `currentColor` bzw. `var(--accent)` – zieht Hell/Dunkel-Thema und
  Akzentfarbe automatisch mit.
- **Der Merken-Stern füllt sich sichtbar**, statt zwischen zwei Emoji zu
  wechseln, inklusive kurzer Pop-Animation beim Hinzufügen zu „Schwierige
  Wörter" (`prefers-reduced-motion` wird respektiert).
- Einzige bewusste Ausnahme: die native Art-Auswahl im Autorenmodus
  (`<select><option>`) kann kein SVG rendern und behält deshalb das Emoji.

---

## 2.21.4 – 11. September 2026

### Geändert

- **Herkunft/Kategorien-Anzeige nur noch bei Karten aus „Schwierige
  Wörter".** In 2.21.3 stand die Zeile unter jeder Karte, die irgendwo
  mehr als eine Speicherkarte hatte – das war mehr, als gebraucht wird.
  Jetzt erscheint sie nur noch bei Karten, die auch in „Schwierige Wörter"
  liegen: genau dort, wo die Herkunft interessiert.

---

## 2.21.3 – 11. September 2026

### Neu

- **Herkunft und Kategorien einer Karte sichtbar.** Eine Karte kann schon
  immer in beliebig vielen Speicherkarten gleichzeitig stehen – in ihrer
  Lektion UND in mehreren Kategorien (z. B. „Nomen" und „Weiblich")
  gleichzeitig. Bisher stand davon nirgends etwas, man musste sich durch
  die Speicherkarten klicken, um es herauszufinden. Jetzt steht unter jeder
  Karte klein „📖 Lektion 2 · 📚 Nomen · 📚 Weiblich" – in der Kartenliste im
  Verwalten-Tab, beim Aufklappen einer Speicherkarte (dort ohne die
  Speicherkarte, in der man ohnehin schon steht) und beim Wiederholen
  selbst, direkt nach dem Aufdecken.

---

## 2.21.2 – 11. September 2026

### Geändert

- **Kartenzahl aus der Speicherkarten-Mehrfachauswahl entfernt.** Zeilen wie
  „Verben (2)" oder „Lektion 1–3 Wiederholung (16)" wurden bei längeren
  Namen unnötig breit. Die Zahl steht ohnehin schon an der Speicherkarte
  selbst weiter unten im Verwalten-Tab; die Gesamtzahl der ausgewählten
  Karten steht weiterhin unter der Liste.

---

## 2.21.1 – 11. September 2026

### Behoben

- **Tippen im Übungsmodus wirkungslos, wenn man unterhalb der Karte tippt.**
  Auf dem Handy ist die Karte oft nicht bildschirmfüllend – darunter blieb
  ein leerer Streifen, in dem ein Tipp nichts auslöste, obwohl während der
  Übungsrunde ohnehin nur die Karte zu sehen ist (Kopfzeile und Reiter sind
  ausgeblendet). Jetzt zählt der ganze sichtbare Bereich, nicht nur das
  Kartenpanel selbst.

- **„Katapult"-Gefühl beim Aufdecken aus dem Vollbild im Handschriftmodus.**
  Der Sprung von der fixierten Zeichenfläche zurück in den normalen
  Textfluss und die anschließende sanfte Scroll-Bewegung liefen bisher im
  selben Moment ab und wirkten wie ein Ruck. Der Sprung bekommt jetzt einen
  kurzen Moment, fertig zu werden, bevor die sanfte Bewegung anfängt.

- **„Daten werden geladen…" ohne jede Handhabe bei langsamer Verbindung.**
  Steht der Bildschirm länger als 9 Sekunden, erscheint jetzt ein Hinweis
  auf die Internetverbindung samt „Neu laden"-Knopf, statt nur zu warten.

---

## 2.21.0 – 11. September 2026

### Neu

- **„Merken" jetzt auch im Übungsmodus.** Der Knopf gab es bisher nur beim
  normalen Abfragen – im Übungsmodus fehlte er, weil es dort „nicht um
  Fortschritt geht". Genau dort fällt aber oft erst auf, welche Wörter
  hängen bleiben, etwa beim Durchgehen aller Stufen 1–7 auf einmal. „Merken"
  ändert ohnehin nur die Speicherkarte „Schwierige Wörter", nie Stufe oder
  Fälligkeit – der Ausschluss hatte also keinen Grund mehr.

- **Mehrere Speicherkarten zusammen üben.** Bei „🔁 Üben" lässt sich jetzt
  zwischen *Nach Stufen* und *Speicherkarten* wählen; im zweiten Fall stehen
  alle Speicherkarten als Kästchen da, mehrere lassen sich gleichzeitig
  anhaken (z. B. „Nomen" und „Weiblich"). Die Übungsrunde enthält dann alle
  Karten aus beiden zusammen – eine Karte, die in mehreren angehakten
  Speicherkarten liegt, taucht dabei nur einmal auf.

### Wie es gebaut ist

- Das bisherige `startDrillFromSet` (eine Speicherkarte) ist durch
  `startDrillFromSets` (mehrere) ersetzt; die Karten aller angehakten
  Speicherkarten laufen durch ein `Map` nach Karten-ID, damit Dopplungen
  herausfallen.
- Das `<select id="drill-source">` ist einem Radiopaar (*Nach Stufen* /
  *Speicherkarten*) plus Checkboxen pro Speicherkarte gewichen – ein
  einzelnes Dropdown konnte nicht mehr sowohl den Modus als auch eine
  Mehrfachauswahl abbilden.

---

## 2.20.0 – 11. September 2026

### Neu

- **Hell und dunkel.** Unter Einstellungen → Darstellung: *Dunkel*, *Hell*,
  *Automatisch*. Automatisch folgt dem Gerät und zeigt daneben an, was gerade
  gilt. Die Wahl liegt im Konto und gilt damit auf jedem Gerät.

  Die helle Fassung ist **keine Umkehrung** der dunklen. Gold auf Weiß ist
  blass und schlecht lesbar – dasselbe Gold, das auf Schwarz wertvoll wirkt,
  sieht auf Papier nach vergilbtem Ausdruck aus. Deshalb dreht sich nicht die
  Helligkeit, sondern das Bild: Aus Tinte auf dunklem Grund wird Tinte auf
  Papier, und der Akzent wird von Blattgold zu Bronze. Dieselbe Farbfamilie,
  aber so dunkel, dass sie auf hellem Grund trägt. Grünspan und Zinnober
  wandern mit.

  Voreinstellung bleibt **dunkel**, nicht „automatisch". Wer die App seit
  Monaten dunkel kennt, soll sie nach einem Update nicht plötzlich weiß
  vorfinden, nur weil das Handy gerade hell steht.

### Wie es gebaut ist

- **„Automatisch" wird im JavaScript aufgelöst, nicht im Stil-Block.** Sonst
  stünden dieselben zwanzig Farben zweimal da – einmal für die helle Fassung,
  einmal in einer Medienabfrage für „automatisch" – und die zweite wäre die,
  die man beim nächsten Mal vergisst. So gibt es die Farben genau einmal.

- **Die Leiste um die App wechselt mit.** Auf dem Handy richtet sich der
  Rand außerhalb der App nach `theme-color` im Kopf der Seite. Bliebe der
  schwarz, während die App hell ist, sähe die helle Fassung aus wie ein
  Fehler.

- **Kein dunkles Aufblitzen beim Start.** Die Wahl liegt im Konto und kommt
  erst mit den Daten aus der Cloud. Ohne Gegenmaßnahme sähe man bei heller
  Fassung erst einen schwarzen Bildschirm, der dann umspringt. Die Wahl liegt
  deshalb zusätzlich auf dem Gerät und wird von ein paar Zeilen im Kopf der
  Seite gelesen, bevor das erste Bild steht. Maßgeblich bleibt die Cloud.

---

## 2.19.0 – 11. September 2026

### Neu

- **Ein Bildschirm für Einstellungen.** Über dem Lernstoff standen fünf Knöpfe
  nebeneinander: Abmelden, drei Backups, Import. Fünf Handlungen, die man im
  Monat vielleicht einmal braucht, auf dem Bildschirm, den man täglich sieht.
  An ihrer Stelle steht jetzt ein Zahnrad.

  Dahinter liegt ein eigener Bildschirm – kein vierter Reiter, denn ein Reiter
  ist ein Ort, an den man oft geht. Die Ordnung folgt der Frage, woran man
  dreht: erst **Darstellung**, dann **Sichern**, **Einspielen** und
  **Aufzeichnung**, zuletzt **Konto**. Jeder Abschnitt sagt in einem Satz, was
  er bewirkt – gerade Backup und Import sind Handlungen, die man nicht
  rückgängig macht.

  Der Hinweis „Dein letztes Backup ist X Tage her" bleibt vorn stehen. Er ist
  die einzige dieser Sachen, die man sehen muss, ohne sie zu suchen.

### Geändert

- **Die arabische Schriftgröße steht nicht mehr im Lernen-Tab.** Sie stand dort
  unter dem Knopf „Lernsession starten" – aber sie ist nichts, was man beim
  Lernen tut: Man stellt sie einmal ein und danach nie wieder. Sie steht jetzt
  unter „Darstellung", mit der Leseprobe daneben wie bisher.

- **„Verlauf zurücksetzen" steht nicht mehr mitten in der Anzeige, die es
  löscht.** Es lag im Fortschritt-Tab direkt unter dem Kalender. Jetzt steht es
  unter „Aufzeichnung", zusammen mit der Angabe, wie viele Tage aufgezeichnet
  sind – und ist ausgegraut, solange es nichts zu löschen gibt.

### Behoben

- **Das versteckte Dateifeld für den Import gehört keinem Bildschirm mehr.** Es
  lag in der Kopfzeile. Der zweite Import-Knopf – der auf dem leeren
  Startbildschirm, für alle, die gerade eine Kartensatz-Datei bekommen haben –
  griff damit auf ein Feld zu, das in diesem Moment existierte, aber nach dem
  Umzug in die Einstellungen nicht mehr existiert hätte. Das Feld steht jetzt
  außerhalb aller Bildschirme, genau einmal.

---

## 2.18.0 – 11. September 2026

### Geändert

- **Zwei Schriftebenen statt einer.** Eine Oberfläche und ein Inhalt sind nicht
  dasselbe. Knöpfe, Reiter, Plaketten und Hinweise sind Werkzeug – sie sollen
  aussehen wie das Gerät, auf dem sie laufen, und dafür ist die Systemschrift
  gemacht. Was gelesen und gelernt wird, ist Inhalt: Überschriften, das Wort auf
  der Karte, die Übersetzung, der Name einer Lektion. Das steht jetzt in einer
  Serifenschrift, so wie es in einem Buch stünde.

  Beides kommt vom Gerät selbst, keine Datei wird nachgeladen. Und es hängt an
  einer einzigen Zeile: Wer wieder eine Schrift für alles will, setzt oben im
  Stil-Block `--font-lesen` auf `var(--font-ui)` – mehr ist nicht nötig.

  Arabisch ist davon ausgenommen und bleibt in jeder Lage bei der Quran-Schrift.

- **Grünspan und Zinnober statt Signalfarben.** Die beiden Nebenfarben waren ein
  Neon-Grün und ein Korallrot – Farben aus einer Messanzeige. Was hier gemessen
  wird, ist etwas anderes. Jetzt stehen daneben die Farben, mit denen in
  Handschriften neben Gold gearbeitet wurde: gedeckt, warm, und sie streiten
  nicht mit dem Gold. Betroffen sind „Sicher" und „Nicht" in der Abfrage, der
  Haken beim Durchgehen, der Fortschrittsbalken der Lektionen und die Plaketten.

- **Die Abfragekarte bekommt einen Textspiegel.** Eine Haarlinie in Gold, ein
  Stück innerhalb der Kante. So wurde in Handschriften der Text vom Rand
  abgesetzt – nicht als Verzierung, sondern damit klar ist, wo der Text steht.
  Es ist der einzige Rahmen dieser Art in der App; er gehört der Karte, die man
  gerade ansieht, sonst nichts.

- **Abschnittsköpfe als Rubrik.** Über den drei Arten von Speicherkarten
  (Kategorien, Lektionen, Eigene) stand eine graue Zeile. Jetzt steht sie klein,
  gesperrt und in gedämpftem Gold – so wie der Abschnittstitel in einer
  Handschrift in anderer Tinte stand, damit das Auge die Gliederung findet, ohne
  zu lesen.

- **Ein Stern nach der letzten Karte.** Der Bildschirm am Ende einer Runde ist
  der einzige Moment, in dem die App etwas feiert. Darüber steht jetzt der
  achtstrahlige Stern: zwei gekreuzte Balken, einmal gerade und einmal um 45
  Grad gedreht. Kein Bild, keine Datei – zwei Vierecke im Stil-Block. Wo der
  Browser die Technik dafür nicht kennt, wird schlicht nichts gezeichnet.

---

## 2.17.0 – 11. September 2026

### Geändert

- **Die App sieht aus wie eine App.** Bisher war das eine Webseite, die im
  App-Modus lief. Der Unterschied steckte in lauter Kleinigkeiten, die einzeln
  niemand benennt und die zusammen den Eindruck machen. Drei Regeln, aus denen
  sich der Rest ergibt:

  **1. Gold ist selten.** Knöpfe, aktive Bereiche, aktive Tabs, Plaketten,
  Balken und Kalender trugen dieselbe Goldfläche – damit zeigte nichts mehr
  auf etwas. Jetzt gibt es pro Bildschirm genau eine gefüllte Goldfläche: die
  Handlung, die gerade dran ist. Alles andere trägt Gold nur als Schrift, Rand
  oder Schleier. Betroffen sind vor allem die Tabs (jetzt ein Umschalter wie in
  iOS, mit einem erhabenen Feld statt einer Goldfüllung), die Bereichsreihe und
  die drei Bewertungsknöpfe: gleiche Fläche, unterschieden nur durch Randfarbe
  und Schriftfarbe. Drei volle Farbflächen nebeneinander sahen aus wie eine
  Ampel und waren der unruhigste Fleck der App.

  **2. Alles Anfassbare ist mindestens 44 Pixel hoch.** Das ist das Maß, das
  Apple und Google für einen Fingertipp ansetzen. Vier winzige Textlinks
  nebeneinander in der Kopfzeile waren der deutlichste Hinweis darauf, dass hier
  keine App läuft – aus ihnen sind ruhige Chips geworden: keine Fläche, keine
  Farbe, aber groß genug, dass man sie trifft, statt auf sie zu zielen.

  **3. Schweben gibt es auf dem Handy nicht.** Alle Hover-Regeln stehen jetzt
  hinter einer Abfrage nach einer echten Maus. Vorher blieb ein Knopf nach dem
  Tippen hell, bis man woanders hintippte. Stattdessen gibt es beim Drücken eine
  kurze Rückmeldung.

  Dazu kommen: eine feste Abstandsleiter (Vielfache von 4 statt 4/6/7/10/12/14/
  16/18/20/22 nebeneinander), eine zweite Flächenebene für Kästen im Kasten
  (vorher hatten die dieselbe Farbe wie der Hintergrund und verschwanden),
  ruhigere Schatten mit Haarlinie statt Leuchten, Zahlen mit fester Breite in
  Statistik und Serie, und mehr Zeilenhöhe für arabische Schrift – deren Ober-
  und Unterlängen schnitten sich vorher zwischen zwei Zeilen.

- **Der Bildschirm entscheidet mit.** Die App lief auf jedem Gerät in derselben
  640-Pixel-Spalte: auf dem iPad stand sie als schmaler Streifen in einer leeren
  Fläche. Jetzt gibt es drei Stufen – schmales Handy, Tablet ab 768 Pixel
  (breiter, größere Schrift, deutlich größere Abfragekarte, höheres Zeichenfeld
  für die Handschrift), großes iPad und Rechner ab 1100 Pixel.

### Behoben

- **Im App-Modus klebte der Inhalt unter der Uhr.** Die Seite lief mit
  durchsichtiger Statusleiste, hielt sich dafür aber keinen Platz frei – oben
  lag die Kopfzeile unter Uhr und Kerbe, unten unter dem Streifen zum
  Schließen. Der Kopf der Seite trägt jetzt `viewport-fit=cover`, und die
  Ränder, die das Gerät für sich beansprucht, werden ausgerechnet und
  freigehalten. Dasselbe gilt für Dialoge und das Vollbild der Handschrift.

- **Beim Tippen in ein Eingabefeld zoomte iOS hinein.** Das passiert immer,
  wenn ein Feld kleiner als 16 Pixel gesetzt ist – danach steht die ganze Seite
  vergrößert und muss von Hand zurückgeschoben werden. Alle Felder stehen jetzt
  auf 16 Pixel.

- **Am oberen und unteren Rand schaute der nackte Hintergrund hervor.** Beim
  Überziehen zog die ganze Seite mit (Gummiband-Effekt) – der sicherste Hinweis
  darauf, dass unter der App ein Browser sitzt. Ist abgestellt.

- **Zwischen Tippen und Reaktion lag eine Verzögerung.** Browser warten auf
  Berührungsflächen rund 300 Millisekunden, ob ein Doppeltipp zum Zoomen folgt.
  Bei Knöpfen ist das jetzt abgeschaltet; außerdem ist der graue Kasten weg, den
  Android beim Tippen über den Knopf legt.

- **Auswahlfelder waren an manchen Stellen hell.** Sie hatten keine eigene
  Farbe und fielen auf die Voreinstellung des Browsers zurück. Jetzt trägt die
  Seite `color-scheme: dark`, und jedes Auswahlfeld hat einen eigenen Pfeil in
  der Farbe der App.

---

## 2.16.0 – 11. September 2026

### Geändert

- **Im Modus verschwindet die Navigation.** Über der Karte standen bisher drei
  Reihen: die Kopfzeile mit den vier Backup-Knöpfen, die Bereichsreihe und die
  Tabs. Auf dem Handy ist das der halbe erste Bildschirm – Platz, der der Karte
  fehlt, und drei Gelegenheiten, eine laufende Runde aus Versehen abzubrechen.

  Während Üben, Abfrage und Durchsicht ist all das jetzt weg. Sichtbar bleibt
  eine einzige Ausnahme: die Warnung, dass gerade nicht gespeichert wird – die
  darf kein Modus verstecken. Zurück geht es über den Knopf im Modus selbst
  („Übung beenden", „Session abbrechen", „Fertig"); den gibt es in jedem von
  ihnen.

- **Im Übungsmodus deckt dieselbe Bewegung auf, die danach weiterträgt.** Seit
  2.15.0 trägt Leertaste bzw. ein Tipp auf die Karte durch die Runde – nur zum
  Aufdecken musste man vorher trotzdem einen Knopf treffen. Ein Knopf
  dazwischen heißt: erst zielen, dann tippen, und bei der nächsten Karte wieder
  zielen. Der Knopf ist weg, unter der Karte steht stattdessen „Leertaste oder
  tippen – Antwort zeigen".

  Im echten Lernen bleibt er. Dort folgt nach dem Aufdecken eine echte
  Entscheidung (Nicht / Fast / Sicher), und wer dafür ohnehin zielen muss, soll
  nicht aus Versehen aufdecken. Beim handschriftlichen Üben bleibt „Fertig" –
  sonst verrät ein Fehlgriff neben das Zeichenfeld die Lösung, bevor man sie
  geschrieben hat.

### Behoben

- **Beim Start eines Modus wird zuverlässig nach oben gesprungen.** Bisher galt
  die Regel „nur springen, wenn das Ziel gerade nicht im Bild steht" – gedacht
  für Sprünge innerhalb einer Seite. Bei einem Moduswechsel ist diese Frage
  sinnlos: Der ganze Bildschirm wird ausgetauscht, an derselben Stelle steht
  danach etwas anderes. Genau daher kam „mal werde ich hochkatapultiert, mal
  nicht".

  Üben, Abfrage und Durchsicht springen jetzt immer an den Seitenanfang, egal
  wo man vorher stand.

- **„🔁 Üben" in einer Speicherkarte sah aus, als täte es nichts.** Der
  Auswahlkasten („Was üben?") öffnet sich ganz oben in der Werkzeugleiste, der
  Knopf dafür steht aber in der Speicherkarte – oft mehrere Bildschirme weiter
  unten. Der Kasten ging also auf, nur eben außerhalb des Bildes. Jetzt springt
  die Seite mit.

- **Das Aufleuchten war praktisch unsichtbar.** Die Animation ging von hell auf
  „transparent" – auf einem Kasten, der selbst einen Hintergrund hat, löschte
  sie ihn für einen Moment, statt aufzufallen. Jetzt leuchtet ein Rahmen auf.

- **Beim Durchgehen wurde man nach unten hin nach oben geworfen.** Der Blick
  wandert nach dem Abhaken zur nächsten offenen Karte. Stand dahinter nichts
  Offenes mehr, hieß die Regel bisher „dann nimm die erste offene Karte
  überhaupt" – und wer unten die letzten Karten abhakte, landete wieder ganz
  am Anfang.

  Jetzt bleibt der Blick in diesem Fall stehen. Nach oben geht es nur noch,
  wenn alles abgehakt ist – dort steht dann „Durchgearbeitet" mit dem Knopf zur
  Abfrage.

- **Die Serie konnte um genau eins fallen, ohne dass etwas passiert war.** Seit
  2.14.0 wird sie aus dem Tagesprotokoll gerechnet; ein Import kann sie deshalb
  gar nicht anfassen. Eine Ebene tiefer konnte er es doch: Jeder Datenabgleich
  mit der Cloud **ersetzte das Protokoll vollständig**. Der heutige Eintrag
  ging aber gebündelt erst zwei Sekunden später hinaus – kam in diesem Fenster
  ein Abgleich, und ein Import löst einen aus, war der heutige Tag weg. Ein Tag
  weniger im Protokoll ist ein Tag weniger in der Serie.

  Das Protokoll stammt aus einer Zeit, in der nichts daran hing; der Kommentar
  im Code sagte wörtlich, ein verlorener Eintrag sei kein Schaden. Seit 2.14.0
  stimmt das nicht mehr. Drei Änderungen:

  - Der **erste Eintrag eines Tages** geht sofort hinaus. Er entscheidet, ob
    der Tag für die Serie zählt; alles Weitere ändert nur noch Balken und wird
    wie bisher gebündelt geschrieben.
  - Cloudstand und eigenes Protokoll werden **zusammengelegt statt ersetzt** –
    je Tag die größere Zahl, und nur für Tage, die dieses Gerät selbst gezählt
    hat. Was nur hier steht, wird danach hochgeschickt. „Verlauf zurücksetzen"
    bleibt dadurch trotzdem ein echtes Löschen.
  - **Schreibfehler werden nicht mehr verschluckt.** Fehlt das Nutzerdokument
    noch, wird es angelegt und der Tag erneut geschrieben – wie bei Serie und
    Einstellungen. Sonst wäre der erste Lerntag eines neuen Kontos still
    verloren, und mit ihm der Anfang der Serie.

- **Ein ausgelassener Tag zeigte den ganzen nächsten Tag eine 0.** Die Kulanz
  („ein einzelner ausgelassener Tag unterbricht die Serie nicht") hing daran,
  dass schon mindestens ein Tag gezählt war. Wer gestern ausließ und heute noch
  nicht gelernt hatte, sah deshalb eine 0 – und nach der ersten Karte stand die
  alte Zahl wieder da. Die Kulanz gilt jetzt auch für den ersten geprüften Tag.
  Zwei ausgelassene Tage beenden die Serie nach wie vor.

---

## 2.15.1 – 9. September 2026

### Behoben

- **Nicht jeder Bereich ist arabisch.** Die Vorderseite einer Karte wurde
  immer in der Quran-Schrift und von rechts nach links gesetzt. Für arabische
  Vokabeln ist das richtig – in einem Bereich wie „Biologie 11" oder mit einem
  französischen Satz rutschte dadurch der Punkt ans falsche Ende und die
  Schrift passte nicht.

  Statt einer Einstellung, die jemand pflegen müsste, entscheidet der Text
  selbst: Steht ein arabischer Buchstabe darin, wird arabisch gesetzt, sonst
  normal. Das wirkt rückwirkend für jeden vorhandenen Bereich, ohne dass
  irgendwo etwas eingetragen werden muss.

---

## 2.15.0 – 9. September 2026

### Geändert

- **Der Übungsmodus hat keine Bewertungsknöpfe mehr.** Dort ändert sich nichts
  am Fortschritt – übrig blieb nur die Wahl, ob die Karte in derselben Runde
  gleich noch einmal drankommt. Das ist keine Entscheidung, die eine Auswahl
  verdient: Wer die Runde nochmal will, startet sie nochmal.

  Übrig bleibt eine einzige Bewegung, und die braucht keinen Knopf:

  - **Leertaste** deckt auf und trägt danach weiter – zweimal dieselbe Taste,
    kein Zielen.
  - **Auf dem Handy ein Tipp irgendwo auf die Karte.** Ausgenommen ist alles,
    was selbst etwas tut: Knöpfe, Eingabefelder, das Zeichenfeld der
    Handschrift.

  Unter der Karte steht der Hinweis „Leertaste oder tippen – weiter", damit
  niemand raten muss.

  Im echten Lernen bleiben die drei Knöpfe unverändert – dort bedeutet jeder
  etwas anderes.

---

## 2.14.2 – 9. September 2026

### Behoben

- **Sprünge katapultierten quer über die Seite.** Das Ziel wurde an die obere
  Bildschirmkante geschoben. Bei einer Speicherkarte weit unten in einer
  langen Liste rauschte damit die halbe Seite durch, und man stand dort ohne
  alles, was darüber gehört – man wusste nicht mehr, wo man ist.

  Das Muster gilt für **alle** Sprünge im Tool und ist jetzt:

  - Steht das Ziel ohnehin schon im Bild, wird **gar nicht gescrollt** – dann
    genügt das Aufleuchten.
  - Sonst kommt es in die **Mitte**, damit ringsherum sichtbar bleibt, wo man
    gelandet ist.
  - Nur wenn es zu groß für den Bildschirm ist, fängt es oben an – sonst sähe
    man von einem hohen Kasten nur dessen Mitte.

---

## 2.14.1 – 9. September 2026

### Geändert

- **„Merken" ist jetzt ein Schalter.** Ein zweiter Tipp nimmt die Karte wieder
  heraus. Vorher kam an dieser Stelle ein Hinweis „liegt schon drin" – eine
  Sackgasse: Er sagte einem, was man ohnehin sah, und ließ einen nichts tun.
  Wer sich vertippt, kann es jetzt zurücknehmen, ohne den Tab zu wechseln.

- **Der Knopf sagt, wohin die Karte gelegt wurde.** Statt „⭐ gemerkt" steht
  dort „⭐ in „Schwierige Wörter"" – man weiß danach, wo sie liegt.

### Neu

- **Ein Hinweis auf die gemerkten Karten der Runde**, mit einem Knopf, der
  direkt zur Speicherkarte führt: Verwalten-Tab, aufgeklappt, kurz
  aufleuchtend – dasselbe Muster wie überall sonst im Tool.

  Gezählt wird, was man in **dieser Runde** gemerkt hat, nicht der ganze
  Bestand der Speicherkarte.

  Der Hinweis hängt ausdrücklich **nicht** am Abschluss-Bildschirm: Wer mitten
  im Lernen den Tab wechselt, beendet damit die Sitzung und hätte ihn nie
  gesehen. Er wartet stattdessen im Lernen-Tab, bis er benutzt wurde – egal ob
  die Sitzung durchgezogen, abgebrochen oder verlassen wurde.

---

## 2.14.0 – 9. September 2026 — „Die Serie gehört dir"

### Geändert

- **Die Serie wird aus dem Tagesprotokoll gerechnet, nicht mehr gespeichert.**

  Bis 2.13.1 war sie ein Zähler im Nutzerdokument, und ob er weiterlief oder
  auf null sprang, entschied der Zustand der **Karten**: Lag irgendwo etwas
  Überfälliges, war sie weg. Damit hing eine Zahl, die man sich über Wochen
  erarbeitet, an Daten, die sich jederzeit unter ihr verändern können – ein
  Import, ein zweites Gerät, ein alter Bereich, der wieder auftaucht. Sie ist
  mehrfach aus genau diesem Grund verschwunden, ohne dass jemand etwas falsch
  gemacht hätte.

  Jede Absicherung davor – Joker, „Serie fortsetzen", liegengebliebene Karten –
  war eine Reaktion auf einen Verlust, der schon passiert war. Das war die
  falsche Reihenfolge.

  Jetzt kommt die Serie aus dem Tagesprotokoll: Es hält fest, an welchen Tagen
  gelernt wurde. Das ist Geschichte und ändert sich nie rückwirkend. **Kein
  Import, kein zweites Gerät und kein alter Bereich kann sie mehr anfassen.**

- **Die Regel in einem Satz:** Ein Tag zählt, wenn an ihm gelernt wurde. Ein
  einzelner ausgelassener Tag unterbricht nicht – Krankheit, Reise, ein voller
  Tag. Der zweite beendet sie.

  Die alte Regel („eine Lücke je sieben Tage") ließ sich beim Rückwärtszählen
  gar nicht sauber prüfen und stimmte deshalb nicht immer mit sich selbst
  überein.

- **Die Serie verschwindet nicht mehr mitten am Tag.** Solange heute noch
  nichts gelernt wurde, zählt die Kette ab gestern – der Stand von gestern
  bleibt also den ganzen Tag stehen, statt morgens auf null zu springen und
  abends wiederzukommen.

- **Beim Umstieg verliert niemand etwas.** Die bisherige Zahl wird zum
  „Sockel": dem Stand, der galt, bevor das Protokoll ihn tragen konnte. Alles
  danach kommt aus dem Protokoll.

- Der Zustand der Karten spielt für die Serie keine Rolle mehr. Überfälliges
  wird weiterhin im Lernen-Tab angezeigt – es kann nur nichts mehr zerreißen.

---

## 2.13.1 – 9. September 2026

### Behoben

- **Ein alter Bereich konnte die Serie zerreißen, ohne dass jemand etwas
  falsch gemacht hat.** Die Serie zählt über alle Bereiche. Es genügte
  deshalb, ein älteres „Backup · alles" einzuspielen: Dessen Karten sind alle
  seit Wochen überfällig, und die Serie war sofort auf null – für eine
  Handlung, die mit dem Lernen nichts zu tun hatte.

  Ab jetzt gilt: Was **länger als 14 Tage überfällig** ist, ist
  liegengeblieben. Es bricht die Serie nicht und blockiert sie nicht. Wer
  einen Bereich seit Wochen nicht angefasst hat, wird davon nicht länger in
  Geiselhaft genommen. Sobald er ihn wieder anfasst, zählt er ganz normal mit,
  denn dann sind seine Karten nicht mehr so lange überfällig.

  Eine Karte, die drei Tage liegen blieb, reißt die Serie weiterhin – daran
  ändert sich nichts.

---

## 2.13.0 – 8. September 2026 — „Anfang statt Null"

### Geändert

Der Fortschritts-Tab sah bei einem frisch eingespielten Kartensatz aus wie ein
Fehler: fünf Nullen untereinander, ein grauer Balken, zwölf leere Wochen und
sieben leere Balken. Alles rechnerisch richtig – und trotzdem der falsche
erste Eindruck. Ein Anfang soll nicht aussehen wie ein Ausfall.

- **Keine große Null mehr als erste Zahl.** Wer noch keine Serie hat, sieht
  statt „0 Tage am Stück" die nächste Handlung: *Heute wird Tag 1 – Wiederholungen
  erledigen, dann zählt der Tag.* Ist der Tag schon erledigt, steht dort ein
  Haken und *morgen beginnt die Serie*.

- **„beste Serie" erscheint erst, wenn es eine gibt.** Eine zweite Null
  daneben machte es nur schlimmer.

- **„Heute" hat einen Knopf.** Solange etwas offen ist, führt *Weiter lernen*
  direkt dorthin. Ein Tab, der nur zusieht, fühlt sich tot an – die
  Feststellung, dass 21 Karten offen sind, gehört mit dem Weg dorthin
  zusammen.

- **Das Kalenderraster wächst mit.** Gezeigt wird ab der ersten Woche mit
  einem Eintrag, mindestens vier und höchstens zwölf Wochen. Zwölf leere
  Wochen am ersten Tag sahen aus wie ein Fehler; vier Wochen mit einem hellen
  Kästchen sehen aus wie ein Anfang. Ist noch gar nichts aufgezeichnet, steht
  das auch dort.

- **Kein Balken aus einer einzigen Farbe.** Solange alle Karten im selben
  Zustand sind, verteilt der Balken nichts – er sah nur aus, als wäre er
  kaputt. Stattdessen steht dort ein Satz: *Alle 21 Karten sind gerade neu.*

- **Die 7-Tage-Vorschau bleibt weg, wenn in der ganzen Woche nichts ansteht.**
  Sieben leere Balken sagen nichts.

---

## 2.12.1 – 7. September 2026 — Aufräumen

Keine neuen Funktionen. Diese Fassung räumt auf, was sich über die letzten
Veröffentlichungen angesammelt hat.

### Geändert

- **Der Fortschritts-Tab war eine Funktion von 188 Zeilen**, in die vier
  Veröffentlichungen nacheinander etwas hineingeschrieben hatten. Er besteht
  jetzt aus vier Bausteinen – Heute, Wochen, Stoff, Lektionen –, die jeder für
  sich lesbar und änderbar sind. Am Bildschirm ändert sich dadurch nichts.

- **Das Feld „gesperrt" ist aus allen Schreibwegen verschwunden.** Seit 2.7.0
  wird das Schloss berechnet statt gespeichert; das Feld wurde seither an
  fünf Stellen geschrieben und an keiner einzigen gelesen. Genau die Art
  Altlast, die später jemanden auf eine falsche Fährte führt.

  Auch die Weitergabe-Datei trägt es nicht mehr: Welche Lektion offen ist,
  rechnet der Empfänger selbst aus – ein mitgeschicktes Schloss hätte nur so
  ausgesehen, als würde es etwas entscheiden.

- **Zwei tote Funktionen entfernt** (`karteFrei`, `zeigtSchloss`) – Überbleibsel
  aus 2.3.0 und 2.5.0, die durch spätere Fassungen ersetzt worden waren.

---

## 2.12.0 – 7. September 2026 — „Ein Wortschatz"

### Geändert

- **Es gibt jetzt genau eine Stelle, an der die Zustände einer Karte
  definiert sind.** Vorher dachte sich jede Ansicht ihre eigenen Wörter aus:
  Dieselbe Karte hieß im Fortschritt „neu", in der Durchsicht „gesehen" und im
  Lernen-Tab „in der ersten Abfrage". Wer eine Karte gerade durchgesehen
  hatte, fand sie im Fortschritt trotzdem unter „neu" – obwohl er sie eben
  erst gelesen hatte.

  Fünf Zustände, jede Karte in genau einem:

  | | |
  |---|---|
  | **neu** | nie angesehen |
  | **gesehen** | durchgesehen, aber noch nie gewusst |
  | **wackelig** | einmal gewusst, fällt noch leicht wieder raus (Stufe 1–2) |
  | **solide** | hält sich (Stufe 3–5) |
  | **fest** | sitzt (Stufe 6+) |

  Die Grenze zwischen „neu" und „gesehen" ist das Erstbewertungsdatum, alle
  weiteren sind die Stufe. Weil eine Karte nie unter Stufe 1 zurückfällt,
  sobald sie einmal gewusst wurde, bedeutet Stufe 0 immer entweder neu oder
  gesehen – die Einteilung ist damit überschneidungsfrei und lückenlos.

- **Alle Ansichten lesen daraus.** Der Balken im Fortschritt, die Plaketten in
  der Kartenliste und in den Speicherkarten, die Durchsicht, der Faden im
  Lernen-Tab. Statt „Stufe 3" steht an einer Karte jetzt „solide 3", statt
  „✓ gesehen" schlicht „gesehen" – überall derselbe Wortlaut.

- **Die Farben bedeuten überall dasselbe.** Eine Plakette trägt die Farbe
  ihres Zustands, dieselbe wie im Balken des Fortschritts. Der neue Zustand
  „gesehen" bekommt den gedämpften Markenton, weil er zwischen „noch nichts"
  und „wackelig" liegt.

- Die frühere Gruppe „im Aufbau" heißt jetzt **solide**, und die Grenzen sind
  angepasst: „wackelig" beginnt bei Stufe 1 statt bei 0, weil Stufe 0 seit
  2.11.0 „gesehen" bedeutet.

---

## 2.11.5 – 7. September 2026

### Behoben

- **„Abfrage starten" tat nichts.** Der Knopf am Ende des Durchgehens startete
  die Sitzung tatsächlich – sie war nur nirgends zu sehen, weil die Durchsicht
  angezeigt wird, solange sie geöffnet ist. Sie wird jetzt beendet, wenn eine
  Sitzung beginnt.

- **Ein gewöhnliches Backup konnte in einen geführten Kartensatz
  hineinverschmelzen.** Es trägt zwar dieselbe Kennung, ist aber der
  Arbeitsstand des Autors samt seiner eigenen Speicherkarten – und die haben
  im Satz eines anderen nichts verloren. Zusammengeführt wird jetzt nur noch,
  was ausdrücklich als Kartensatz erzeugt wurde; aus allem anderen entsteht
  wie gewohnt ein eigener Bereich.

- **„Übernehmen" für einen Vorgang ohne Wirkung.** Wer dieselbe Ausgabe ein
  zweites Mal einspielte, bekam eine Rückfrage mit dem Inhalt „Am Inhalt
  ändert sich nichts". Jetzt steht dort ein Hinweis und sonst nichts.

### Geändert

- **Der Fortschritt zählt Antworten, nicht Karten.** Dort stand „44 Karten
  bearbeitet", obwohl der Stapel nur 21 Karten hat – das las sich wie ein
  Fehler. Gezählt werden aber Antworten: Eine Karte kann an einem Tag mehrfach
  drankommen, denn „Nicht" hängt sie wieder hinten an. Und wer 21 Karten
  durchsieht und anschließend abfragt, hat zwangsläufig 42 Antworten gegeben.

  Jetzt steht dort „44 Antworten · 23 Karten zum ersten Mal gesehen".

---

## 2.11.4 – 7. September 2026

### Behoben

- **„Zugriff verweigert" nach dem Bestätigen der E-Mail.** Die
  Sicherheitsregeln verlangen eine bestätigte Adresse. Firestore prüft das
  aber nicht am Konto, sondern an dem Ausweis (ID-Token), den der Browser
  mitschickt – und darin steht `email_verified` so, wie es beim *Anmelden*
  war.

  Wer sich anmeldet und erst danach den Link in der Mail anklickt, hat
  deshalb ein Zeitfenster, in dem die App ihn hereinlässt (sie sieht die
  Bestätigung sofort), die Datenbank ihn aber abweist – bis zu einer Stunde
  lang. Für den Betroffenen sieht das aus wie ein kaputtes Konto.

  Die App holt jetzt in dem Fall selbstständig einen frischen Ausweis und lädt
  neu. Das passiert genau einmal pro Sitzung: Liegt es doch an den Regeln,
  entsteht keine Endlosschleife, sondern die Meldung bleibt stehen.

- **Die Fehlermeldung sagt jetzt, was zu tun ist.** Vorher stand dort nur
  „bitte Sicherheitsregeln in Firebase prüfen" – ein Satz, mit dem niemand
  etwas anfangen kann, der die Konsole nie gesehen hat. Jetzt steht dort, dass
  man sich einmal ab- und wieder anmelden soll, und die Regeln erst danach in
  Frage kommen.

### Neu

- **„Ich habe bestätigt – weiter"** auf dem Bestätigungs-Bildschirm. Wer den
  Link angeklickt hatte, saß dort sonst fest, bis er die Seite von sich aus
  neu lud. Der Knopf holt den Kontostand vom Server, dazu einen frischen
  Ausweis – ohne den zweiten Schritt käme er zwar in die App, würde dort aber
  von der Datenbank abgewiesen.

---

## 2.11.3 – 7. September 2026 — Härtung gegen Datenverlust

### Behoben

- **Fehlgeschlagene Speichervorgänge waren nach der ersten Meldung stumm.** Wer
  den einen Hinweis wegtippte, lernte weiter im guten Glauben, alles werde
  gespeichert – während nichts mehr ankam. Jetzt bleibt oben eine Zeile
  stehen, solange es klemmt, mit der Aufforderung, ein Backup zu ziehen.

  Offline ist ausdrücklich **kein** Fehlerfall: Firestore nimmt Änderungen
  entgegen und schickt sie los, sobald die Verbindung wieder steht. Die
  Warnung erscheint nur bei echten Ablehnungen.

- **Serie und Einstellungen konnten still verschwinden.** Sie gingen mit einem
  stummen `.catch()` raus. Existierte das Nutzerdokument noch nicht – frisch
  angelegtes Konto, das Anlegen läuft noch –, scheiterte der Schreibvorgang
  mit „not-found", und die erste Serie war weg, ohne dass es jemand merkte.
  Jetzt wird das Dokument in dem Fall angelegt und danach neu geschrieben.

- **„Rückgängig" hob den Höchststand einer Karte nicht auf.** Ein Fehltipp auf
  „Sicher" blieb damit für immer stehen – und bei der letzten Karte einer
  Lektion hätte ein einziger Fehlgriff die nächste Lektion dauerhaft
  aufgeschlossen.

### Geändert

- **Beim Löschen eines Bereichs wird nichts mehr behauptet, was sich nicht
  prüfen lässt.** Statt „Ein Backup wurde heruntergeladen" steht dort jetzt,
  dass es zum Herunterladen angeboten wurde und man in den Downloads
  nachsehen soll. Auf manchen Geräten kann ein automatischer Download
  stillschweigend blockiert werden – dann wäre die Zusage eine Lüge gewesen.

---

## 2.11.2 – 7. September 2026

### Behoben

- **Der allererste Bildschirm schickte neue Nutzer in die falsche Richtung.**
  Wer sich gerade angemeldet hatte, las im leeren Bereich nur: „leg welche
  unter Verwalten an". Wer stattdessen eine Kartensatz-Datei bekommen hatte –
  also der Regelfall für alle, die einen Satz geschickt bekommen – las
  ausgerechnet die Aufforderung, alles selbst zu tippen. Vom Import stand dort
  kein Wort; der versteckte sich als kleiner Link oben rechts zwischen zwei
  Backup-Knöpfen.

  Jetzt steht der Import dort zuerst und als richtiger Knopf, das eigene
  Anlegen darunter als Alternative.

---

## 2.11.1 – 7. September 2026

### Behoben

- **Eine freigeschaltete Lektion konnte nach dem Neuladen wieder zugehen.**
  Der höchste je erreichte Stand einer Karte wurde beim Bewerten zwar im
  Speicher nachgezogen, aber **nie in die Cloud geschrieben**. Beim nächsten
  Laden errechnete die App ihn ersatzweise aus der *aktuellen* Stufe. Für eine
  Karte, die einmal auf Stufe 2 stand und später zurückfiel, hieß das:
  Höchststand wieder 1 – und die Lektion dahinter war wieder gesperrt.

  Genau der Fall, den „einmal erreicht" verhindern sollte. Auf demselben Gerät
  fiel es nicht auf, weil der Wert dort im Speicher stand; erst nach einem
  Neuladen oder auf einem zweiten Gerät.

- **Die erste Abfrage konnte Karten „verbrennen".** Seit 2.11.0 stellt
  „Gesehen" eine Karte in die Abfrage, ohne ihr eine Stufe zu geben – damit
  galt sie sofort als „nicht mehr neu". Wer sie in der ersten Abfrage nicht
  wusste, sammelte Rückfälle für etwas, das er gerade zum ersten Mal gelesen
  hatte; nach fünf Malen wäre die Karte als verbrannt markiert worden.

  Ein Rückfall zählt jetzt erst, wenn die Karte **schon einmal gesessen hat** –
  gemessen am Höchststand, nicht daran, ob sie schon angefasst wurde.

### Geändert

- **Frisch durchgesehene Karten heißen nicht mehr „Wiederholungen".** Im
  Lernen-Tab steht jetzt „21 Karten in der ersten Abfrage" statt „21
  Wiederholungen" – man hat sie ja noch nie gewusst.

---

## 2.11.0 – 7. September 2026 — „Ansehen, prüfen, wiederholen"

### Geändert

- **Der Haken beim Durchgehen heißt „Gesehen" und gibt keine Stufe mehr.**

  Vorher setzte er die Karte direkt auf Stufe 1. Damit war er eine
  Selbstauskunft ohne Gegenprobe: Wer 21-mal blind tippt, hätte 21 Karten auf
  Stufe 1 gehabt, ohne eine einzige gelernt zu haben. Aufgefallen wäre es erst
  am nächsten Tag – und dann ist der erste Eindruck verschenkt, gerade der
  zählt beim ersten Kontakt am meisten.

  Jetzt stellt der Haken die Karte für **heute** in die Abfrage: Sie gilt als
  begonnen, bleibt aber auf Stufe 0 und ist sofort fällig. Die Stufe 1
  verdient man sich in der Abfrage, nicht durch Tippen. Am Ende der
  Durchsicht steht deshalb ein Knopf, der direkt dorthin führt.

  Ablauf: **ansehen → gleich prüfen → morgen wieder.** Statt: tippen → morgen.

- **An einer Lektion stehen keine Knöpfe mehr.** Vorher stand dieselbe Lektion
  an zwei Orten und wollte an beiden etwas: Der Lernen-Tab führte einen
  hindurch, und im Verwalten-Tab lag ein zweiter Weg daneben. Man wusste
  nicht, welcher der richtige ist. Jetzt gilt: **gelernt wird im Lernen-Tab,
  im Verwalten-Tab wird nachgeschaut.** Die Lektion zeigt dort nur noch, wie
  viele ihrer Karten sitzen.

- **Lektionen stehen jetzt über den Kategorien.** Sie sind der Weg;
  Kategorien sind zum Nachschlagen, eigene Speicherkarten wachsen erst mit
  der Zeit. Reihenfolge der Abschnitte: Lektionen, Kategorien, Eigene.

### Behoben

- **Auf dem Handy wurde der Name einer Speicherkarte zu einer
  Buchstabensäule.** Name, Plakette und zwei Knöpfe kämpften in einer Zeile um
  den Platz. Ab schmalen Bildschirmen bekommt der Name jetzt eine eigene Zeile
  über den Knöpfen. Auf breiten Bildschirmen bleibt alles wie es war.

### Neu

- **„☆ Merken" mitten in der Abfrage.** Eigene Speicherkarten gab es längst,
  aber der Weg dorthin führte über Verwalten, Auswahlmodus und einen Stern –
  das findet niemand. Gemerkt wird eine Karte aber genau in dem Moment, in dem
  auffällt, dass sie schwer ist: mitten im Abfragen. Der Knopf legt die
  Sammelkarte „Schwierige Wörter" beim ersten Mal selbst an.

  Damit haben auch die Empfänger eines geführten Kartensatzes wieder das,
  wofür die Speicherkarten ursprünglich erfunden wurden.

- **Bereich löschen ist abgesichert.** Zwei Sicherungen statt einer Nachfrage,
  die man wegtippt:

  1. Die App lädt vorher **ohne zu fragen ein Backup dieses Bereichs**
     herunter. Es kostet nichts und ist im Ernstfall alles.
  2. Zum Bestätigen muss der **Name des Bereichs getippt** werden. Ein
     „Ja"-Knopf lässt sich blind drücken, ein Name nicht – dafür muss man
     hinsehen. Dreimal nachfragen hätte nichts gebracht, das klickt man
     genauso weg.

---

## 2.10.2 – 7. September 2026

### Behoben

- **Die App überschrieb fremde Änderungen mit ihrem eigenen, alten Stand.**
  Bisher schrieb jeder Anlass den *kompletten* Serien-Stand aus dem Speicher
  zurück – auch die bloße Tagesprüfung, die nur ein Datum setzt. War die App
  dabei offline oder im Hintergrund und der Wert in der Cloud hatte sich
  inzwischen geändert, überbügelte sie ihn. Genau so verschwand ein von Hand
  gesetzter Zähler wieder.

  Jetzt geht nur noch an den Server, was der Auslöser wirklich angefasst hat.
  Die Tagesprüfung schreibt ihr Datum, sonst nichts.

- **Dasselbe beim Tagesprotokoll.** Es schrieb bei jeder Karte alle 120 Tage
  zurück; wer aufräumte, hatte Sekunden später alles wieder da. Jetzt geht nur
  der heutige Eintrag raus.

  Alte Tage werden beim Laden einmal aus der Cloud entfernt, statt bei jedem
  Schreibvorgang mitgeschleppt zu werden.

### Neu

- **„Verlauf zurücksetzen"** unter dem Kalender. Löscht das Tagesprotokoll –
  Balken, Kalender und Wochenzahlen fangen bei null an. Karten, Stufen und
  Fälligkeiten bleiben unberührt.

  Der Knopf steht in der App, damit niemand dafür in die Firebase-Konsole muss:
  Von dort aus verliert man gegen ein laufendes Gerät, das seinen Speicherstand
  zurückschreibt.

---

## 2.10.1 – 7. September 2026

### Behoben

- **„Heute" meldete „fertig ✓", obwohl noch nichts gelernt war.** In den
  Tagesbalken zählten nur Wiederholungen als offen. Wer einen frisch
  eingespielten Kartensatz vor sich hatte, sah einen vollen Balken – dabei war
  die erste Lektion noch komplett ungelernt. Neue Karten zählen jetzt mit.

  Für die Streak gilt das ausdrücklich **nicht**: dort zählen weiterhin nur
  Wiederholungen, damit das Freischalten einer Lektion niemandem die Flamme
  kostet.

- **Am ersten Tag gab es keine Flamme.** Sie sprang nur am Ende einer
  Lernsession an – an einem Tag mit einem neuen Kartensatz gibt es aber gar
  keine Wiederholungen. Wer 21 Karten durchgegangen war, stand trotzdem bei 0.
  Das Durchgehen zählt jetzt auch für den Tag.

---

## 2.10.0 – 7. September 2026 — „Mitgenommen werden"

### Neu

- **Sprung und Aufleuchten**, übernommen aus dem Adrabic-Trainer. Dort führt
  ein Tipp auf ein Kategorie-Zeichen in der Checkliste sanft zum passenden
  Modul, und das Modul leuchtet kurz auf – so sieht man, *was* sich geändert
  hat.

  Dasselbe gilt jetzt hier für jede Aktion, deren Wirkung nicht dort steht, wo
  man getippt hat: 🔁 Üben und ▶ Durchgehen aus einer Speicherkarte heraus
  starten oben eine Sitzung, während man unten in der Kartenliste steht. Ohne
  den Sprung sah es aus, als sei nichts passiert. Gleiches Aufleuchten,
  gleiche 1,4 Sekunden, gleicher Creme-Ton – und wie im Trainer wird
  `prefers-reduced-motion` beachtet.

### Geändert

- **„▶ Lernen" heißt an der Speicherkarte jetzt „▶ Durchgehen".** Es stand
  direkt neben „🔁 Üben", und beides klang nach demselben – dabei ist das eine
  Ansehen und das andere Abfragen. „Durchgehen" ist außerdem das Wort, das im
  Lernen-Tab schon auf dem Knopf steht.

  Die Erklärzeile über den Lektionen sagt den Unterschied jetzt ausdrücklich:
  Durchgehen heißt ansehen und abhaken, Üben heißt abfragen und ändert nichts
  am Fortschritt.

### Behoben

- **Ein Update konnte den Lernstand aller Karten austauschen.** Beim
  Zusammenführen wurden Karten nur über ihre Herkunfts-Nummer zugeordnet.
  Traf eine Datei ohne solche Nummern – etwa ein gewöhnliches Backup – auf
  einen geführten Kartensatz, passte keine einzige Karte: alle galten als neu,
  alle vorhandenen als weggefallen. Aus 133 Karten wurden 133 andere, der
  Lernstand war weg.

  Jetzt dient das arabische Wort als Rückfallebene, wenn die Nummer fehlt, und
  eine fehlende Nummer wird beim Zusammenführen nachgetragen.

- **Notbremse beim Zusammenführen.** Fiele mehr als die Hälfte der Karten weg,
  steht das jetzt als Warnung im Dialog. Das passt fast nie und heißt
  meistens, dass die Datei nicht aus derselben Reihe stammt.

---

## 2.9.0 – 7. September 2026 — „Beste Serie"

### Neu

- **Die beste Serie geht nie verloren.** Neben der laufenden Serie steht jetzt
  der eigene Rekord. Ein gerissener Zähler fühlt sich sonst an, als wäre alles
  weg – und genau dann hört man auf. Derselbe Begriff wie im
  Adrabic-Trainer.

- **Ein Riss wird gesagt, nicht verschwiegen.** Vorher sprang die Zahl still
  auf 0 und man rätselte. Jetzt steht da, auf welchem Stand die Serie war und
  wann sie gerissen ist.

- **„Serie fortsetzen".** Zwei Tage lang lässt sich ein Riss zurücknehmen.
  Gedacht für den Fall, dass die Serie an etwas gerissen ist, das mit dem
  Lernen nichts zu tun hatte: ein zweiter Bereich, der nach einem Import noch
  herumstand, oder ein zweites Gerät. Ohne diesen Knopf bleibt nur der Weg
  über die Firebase-Konsole.

### Geändert

- **Der Fortschritts-Tab trägt jetzt die Handschrift von Adrabic.** Dieselbe
  Palette wie der Adrabic-Trainer war schon da – neu sind:

  - Die Serie steht oben in einer eigenen Karte mit Creme-Verlauf und der
    großen Zahl im Markenton, statt als Zeile unter einem Balken.
  - **Arabisch-indische Ziffern** als stille Zierde neben den großen Zahlen
    (٤ neben 4, ١٣٣ neben 133), gesetzt in derselben Quran-Schrift wie die
    Karten. Ein Zeichen statt eines beliebigen Symbols – und man lernt die
    Ziffern nebenbei mit.
  - Der Kalender und der Tagesbalken laufen in der Markenfarbe statt in Grün.
    Der Kalender ist das größte Element im Tab, deshalb trägt er den Akzent.

---

## 2.8.0 – 7. September 2026 — „Fortschritt"

### Neu

- **Ein Tagesprotokoll.** Bis 2.7.0 speicherte die App nur den *aktuellen*
  Zustand jeder Karte. Damit ließ sich kein Verlauf zeigen: kein „diese
  Woche", kein Vergleich mit gestern, kein Kalender. Der Fortschritts-Tab
  konnte gar nicht lebendig sein – er hatte nichts, woraus sich eine Bewegung
  ergibt.

  Jetzt werden pro Tag zwei Zahlen mitgeschrieben: wie viele Wiederholungen
  bewertet und wie viele Karten zum ersten Mal gelernt wurden. 120 Tage
  werden aufgehoben, das sind ein paar Kilobyte. Geschrieben wird gebündelt,
  nicht bei jeder Karte – das Protokoll ist Anzeige, es hängt nichts daran.

- **Der Fortschritts-Tab ist neu aufgebaut**, in vier Ebenen von schnell nach
  langsam:

  - **Heute** – ein Balken, der voll wird, und morgen wieder bei null steht.
    Das Einzige im Tab, das täglich abschließbar ist.
  - **Die letzten 12 Wochen** – ein Kalenderraster, sieben Zeilen für die
    Wochentage. Man sieht in einer Sekunde, ob man dranbleibt.
  - **Dein Stoff** – „84 von 133 Karten saßen schon mindestens einmal". Diese
    Zahl kann nie zurückgehen, weil sie an der höchsten je erreichten Stufe
    hängt und nicht an der aktuellen. Der bisherige Stapelbalken steht als
    Detail darunter – der schwankt, sobald man etwas vergisst, und taugt
    deshalb nicht als Hauptzahl.
  - **Lektionen** – eine Kachel je Lektion mit eigenem Balken. Ein Ziel wirkt,
    wenn es nah ist; 21 Karten sind eines, 133 nicht. Der Block erscheint nur,
    wenn es Lektionen gibt.

- **Ein Ausfalltag reißt die Serie nicht mehr sofort.** Serien wirken, weil man
  ungern verliert – genau deshalb hören viele nach dem ersten gerissenen Tag
  ganz auf. Höchstens einmal pro Woche wird ein Ausfall überbrückt; das fängt
  Krankheit und Reisen ab, ohne die Serie wertlos zu machen. Der Tab sagt
  dazu, wenn ein Tag überbrückt wurde.

### Geändert

- **„Karten insgesamt" ist raus.** Eine Zahl, die nichts über den Lernstand
  sagt und nur größer wird, weil man fleißig anlegt.

- Bewusst **nicht** eingebaut: Punkte, Ligen, Abzeichen. Äußere Belohnungen
  können die innere Motivation verdrängen – bei diesem Stoff besonders
  schade. Alle Zahlen im Tab beschreiben den Stoff, nicht den Fleiß.

- Der Hinweis bei einem vollen Wiederholungstag verweist nicht mehr auf das
  Tageslimit, das es seit 2.3.0 nicht mehr gibt.

---

## 2.7.0 – 7. September 2026 — „Der Faden"

### Neu

- **Lektionen schalten sich von selbst frei.** Eine Lektion ist offen, sobald
  jede Karte der Lektion davor **schon einmal** Stufe 2 erreicht hat.

  Das Wort „einmal" ist der ganze Trick. Die Bedingung hängt nicht an der
  aktuellen Stufe, sondern an der höchsten je erreichten – deshalb kann sie
  nie wieder falsch werden. Wer bei einer alten Karte ehrlich „Nicht" drückt
  und sie zurückfallen lässt, sperrt damit keine Lektion wieder zu. Ohne diese
  Unterscheidung wäre jede ehrliche Antwort bestraft worden.

  Dafür trägt jede Karte jetzt ihre höchste je erreichte Stufe mit. Bei
  vorhandenen Karten gilt die aktuelle Stufe als Höchststand.

- **Eine verbrannte Karte hält nichts auf.** Wer ein Wort fünfmal verhauen hat,
  soll deswegen nicht wochenlang feststecken – das ist der Moment, in dem man
  eine App zumacht. Karten mit fünf Rückfällen zählen für die Bedingung nicht
  mit.

- **Der Faden im Lernen-Tab.** In einem geführten Kartensatz steht dort jetzt
  immer genau ein Schritt: ein Satz, ein Knopf.

  - Neuer Stoff da → *Lektion 1 · 21 Karten, noch keine davon gelernt* →
    **Durchgehen**
  - Mittendrin → *Noch 8 von 21 Karten* → **Weiter durchgehen**
  - Nur Wiederholungen → *21 Wiederholungen aus „Lektion 1"* → **Los**
  - Fertig für heute → *✓ Für heute erledigt* und darunter, was die nächste
    Lektion noch braucht, samt Datum der nächsten fälligen Karte

### Geändert

- **Das Schloss wird berechnet statt gespeichert, und lässt sich nicht mehr
  von Hand bedienen.** Vorher gab es einen gespeicherten Zustand, der mit der
  Wirklichkeit auseinanderlaufen konnte, und eine Entscheidung, die niemand
  treffen will. Jetzt gilt schlicht: Lektion 1 ist offen, Lektion N ist offen,
  sobald Lektion N−1 sitzt. Das Symbol in der Zeile ist nur noch Anzeige.

  Das gespeicherte Feld bleibt in den Daten, damit ältere Dateien und ältere
  Fassungen der App weiter funktionieren – gelesen wird es nicht mehr.

- **Die Notiz ist nach dem Aufdecken offen.** Vorher klappte sie nach *jeder*
  Karte wieder zu – bei 21 Karten also 21 Extra-Tipps für etwas, das man
  eigentlich immer sehen will. Rückmeldung aus der Praxis war, dass Leute
  deswegen anfangen, den Notiztext in die Übersetzung zu schreiben. Das macht
  zwei Dinge kaputt: Die Übersetzung ist das, was abgefragt wird, und im
  Handschrift-Modus wird sie zur Vorderseite – dann steht der ganze
  Beispielsatz als Frage da.

- **Die Wegbeschreibung im Lernen-Tab ist weg.** Statt „schalte die nächste
  Lektion unter Verwalten bei den Speicherkarten mit dem 🔓 frei" passiert das
  Weiterkommen jetzt dort, wo man steht. Auch das Banner im Verwalten-Tab ist
  von fünf Zeilen auf zwei geschrumpft.

- **Der Modus „Lernen" hat einen Abschluss.** Ist alles abgehakt, stand vorher
  nur eine Liste abgeblendeter Karten da und man wusste nicht, ob man fertig
  ist. Jetzt steht es dort.

---

## 2.6.0 – 6. September 2026 — „Eigene Reihenfolge"

### Geändert

- **Die Karten in einer Speicherkarte stehen in der Reihenfolge, die man
  selbst gewählt hat** – also so, wie sie beim Auswählen angehakt oder danach
  am ⠿-Griff zurechtgeschoben wurden.

  Bis 2.5.0 wurden sie nach der Reihenfolge des Bereichs sortiert. Das war
  eine *gerechnete* Reihenfolge, keine *gewählte*: Die Karten einer Lektion
  ließen sich nicht in die Abfolge des Videos bringen, ohne den ganzen
  Bereich umzusortieren. Jetzt gehört jeder Speicherkarte ihre eigene Ordnung.

### Neu

- **Sortieren innerhalb einer Speicherkarte.** In der aufgeklappten
  Speicherkarte hat jede Kartenzeile einen ⠿-Griff. Er ändert nur die
  Reihenfolge in dieser einen Speicherkarte – die Reihenfolge im Bereich und
  damit die Nummern der Karten bleiben unberührt. Dieselbe Karte kann also in
  „Lektion 1" an dritter und in „Nomen" an zwölfter Stelle stehen.

### Behoben

- **Der Griff an einer Karte innerhalb einer Speicherkarte hätte die ganze
  Speicherkarte gezogen.** Beim Suchen nach der gezogenen Zeile wurde zuerst
  nach dem Kasten der Speicherkarte gesucht und erst danach nach der
  Kartenzeile – eine Kartenzeile liegt aber *innerhalb* dieses Kastens, also
  gewann immer der Kasten. Die Reihenfolge der Prüfung ist umgedreht.

---

## 2.5.0 – 6. September 2026 — „Nachschub"

### Neu

- **Eine zweite Ausgabe eines Kartensatzes ergänzt den vorhandenen, statt ihn
  doppelt anzulegen.**

  Bis 2.4.0 legte jeder Import einen neuen Bereich an. Für ein normales Backup
  ist das richtig – es schützt davor, dass eine alte Datei einen neueren Stand
  überbügelt. Für die zweite Ausgabe eines weitergegebenen Kartensatzes wäre es
  fatal: Wer Lektion 6–10 nachbekommt, hätte danach zweimal „Medina 1", die
  ersten 125 Karten doppelt, und seinen Lernstand von vier Wochen im falschen
  der beiden Bereiche.

  Möglich macht das die Kennung am Bereich und die Herkunfts-Nummer an jeder
  Karte, beide seit 2.3.0 in jeder Weitergabe-Datei. Die Karten-Nummern ändern
  sich beim Import – die Herkunfts-Nummer bleibt, sie ist das Einzige, was über
  zwei Veröffentlichungen hinweg hält.

- **Wer was bestimmt, ist klar getrennt.**

  - Der **Autor** bestimmt den Inhalt: Text, Notiz, Reihenfolge, welche Karten
    es gibt, welche Lektionen es gibt. Berichtigte Texte kommen an, weggefallene
    Karten verschwinden, neue Lektionen kommen gesperrt dazu.
  - Der **Lernende** behält seinen Fortschritt: Stufe, Fälligkeit, Rückfälle –
    und welche Lektionen er freigeschaltet hat. Eine Lektion, die er offen hat,
    wird nicht wieder zugesperrt, nur weil sie in der Datei gesperrt steht.
  - **Eigene Speicherkarten** des Lernenden bleiben unangetastet; sie verlieren
    nur Verweise auf Karten, die es nicht mehr gibt.

- **Vor dem Übernehmen steht, was passiert.** Der Dialog zählt auf, wie viele
  Karten dazukommen, wie viele im Text berichtigt werden und wie viele
  wegfallen – und sagt zu, dass Lernstand und freigeschaltete Lektionen
  bleiben. Dieselbe Ausgabe ein zweites Mal eingespielt ändert nichts und sagt
  das auch.

- **Zusammengeführt wird nur in einen geführten Bereich.** Der eigene Bereich,
  aus dem der Satz stammt, trägt dieselbe Kennung – ohne diese Bedingung würde
  ein Testimport der eigenen Datei den eigenen Meisterbereich umbauen. So
  entsteht stattdessen eine geführte Kopie zum Ausprobieren, genau wie bei
  einem Bruder.

### Geändert

- **Schloss, Gruppen und der Modus „Lernen" erscheinen nur noch in einem
  weitergegebenen Kartensatz.** In 2.3.0 und 2.4.0 standen sie in jedem
  Bereich – auch im eigenen, wo sie nichts zu suchen haben: Dort gibt es
  niemanden, der etwas freischalten müsste, und ein Schloss hätte dort nicht
  einmal eine Wirkung. Es wäre ein Knopf, der lügt.

  Ein eigener Bereich sieht damit wieder aus wie vor 2.3.0: eine schlichte
  Liste von Speicherkarten, ohne Abschnitte, ohne Schlösser, ohne ▶ Lernen.

- **Die Art einer Speicherkarte vergibt man über einen Schalter.** Über der
  Liste steht „🛠 Arten vergeben"; erst danach erscheinen die Auswahlfelder in
  den Zeilen. Ein Auswahlfeld in jeder Zeile machte das Feld unruhig, obwohl
  die Art einmal pro Speicherkarte vergeben und dann nie wieder angefasst
  wird. Der Schalter erscheint nur im Autorenmodus.

  Gruppiert wird trotzdem, sobald wirklich eine Art vergeben ist – sonst
  stünden 20 Lektionen und 6 Kategorien wieder als flache Liste da.

---

## 2.4.0 – 6. September 2026 — „Lernen"

### Neu

- **Ein dritter Modus: „Lernen".** Neben dem ▶-Knopf steht bei jeder
  Speicherkarte im Verwalten-Tab jetzt ein zweiter Weg hinein – und der ist
  ausdrücklich **keine Abfrage**.

  „Üben" deckt ab und fragt ab, der Lernen-Tab bewertet. Für die erste
  Begegnung mit neuem Stoff taugt beides nicht: Wer ein Video schaut und das
  Buch danebenliegen hat, will die Karten *sehen*. Genau das ist dieser Modus –
  Wort, Übersetzung und die Notiz hinter dem ▸, nichts verdeckt.

  Drei Entscheidungen machen ihn aus:

  - **Reihenfolge statt Zufall.** Die Karten stehen in der Reihenfolge, in der
    sie im Bereich liegen – also so, wie sie zurechtgeschoben wurden. Solange
    alle auf derselben Stufe stehen, wäre Mischen sinnlos. Erst wenn die
    Stufen auseinanderlaufen, ist Zufall richtig, und das ist der Lernen-Tab.
  - **Ein Haken statt Bewertungsknöpfen.** Es gibt nichts zu bewerten, was man
    gerade zum ersten Mal liest. „Gelernt" setzt die Karte auf Stufe 1; ab
    morgen kommt sie im Lernen-Tab als Wiederholung.
  - **Kein eigener Zwischenstand.** Wer 25 Karten offen hat, 17 abhakt und
    rausgeht, findet beim nächsten Öffnen genau die 8 übrigen vor. „Abgehakt"
    heißt schlicht „hat eine Stufe" – es gibt nichts zu speichern, was mit dem
    Rest der App auseinanderlaufen könnte.

- **Nummern an den Karten.** Jede Karte trägt ihre Position im Bereich, nicht
  in der gerade geöffneten Auswahl. Damit lässt sich außerhalb der App sagen
  „Video 3 = Karten 41–63", und die Zahl bleibt dieselbe, egal über welche
  Speicherkarte man hereinkommt.

- **Eine Liste statt einer Karte pro Bildschirm.** Wer mit einem Video mitgeht,
  will blättern können und nicht 25-mal weitertippen. Auf dem Handy steht eine
  Karte pro Zeile, auf einem breiten Bildschirm zwei nebeneinander – das macht
  das Raster von selbst, ohne zweite Ansicht und ohne Zoomstufen.

- **Der Blick wandert mit.** Nach jedem Haken rutscht die nächste noch offene
  Karte in die Mitte. Gesucht wird dabei ab der gerade abgehakten Karte nach
  vorn: Wer Karte 10 zuerst abhakt, wird nicht an den Anfang zurückgeworfen.
  Und gescrollt wird nur, wenn die Zielkarte gerade nicht zu sehen ist – sonst
  ruckelte die Seite bei jedem Tipp.

- **Freischalten passiert dort, wo man ohnehin hinwill.** Ein Tipp auf ▶ Lernen
  bei einer gesperrten Lektion fragt einmal nach und macht sie auf. Ein eigenes
  Freischalt-Ritual müsste man erst finden; das Schloss in der Zeile bleibt
  daneben als zweiter Weg.

- **↩ Rückgängig.** Ein Fehltipp auf „Gelernt" lässt sich sofort zurücknehmen.
  Ohne das wäre er nur über das Formular im Verwalten-Tab zu heilen.

### Geändert

- **„Backup · zum Weitergeben" ist nur noch für den Autor sichtbar.** Wäre der
  Knopf für alle da, kämen früher oder später halbfertige Kartensätze mit
  fremden Kennungen in Umlauf – und die Update-Erkennung hätte zwei
  verschiedene Sätze mit derselben Kennung vor sich.

  Eingerichtet wird das über die Konstante `AUTOR_UID` ganz oben in der
  index.html. Dort kommt die eigene Nutzernummer hinein; solange sie leer ist,
  zeigt die App oben eine rote Zeile mit der Nummer zum Abschreiben.

  Bewusst die Nutzernummer und nicht die E-Mail-Adresse: Die Nummer ist eine
  zufällige Zeichenfolge und verrät nichts über die Person, während eine
  Adresse in einem öffentlichen Repo von Spam-Sammlern gelesen würde.

  Was das leistet und was nicht: Wer nur in der App klickt, findet nichts. Wer
  ein zweites Konto anlegt, kommt nicht weiter, weil die Nummer nicht stimmt.
  Wer aber die index.html selbst öffnet und liest, sieht die Stelle – daran
  kann keine Seite etwas ändern, die im Browser des Lesers läuft. Der Zweck
  ist, dass niemand *versehentlich* etwas in Umlauf bringt.

- **Eine schon gelernte Karte lässt sich im neuen Modus nicht zurückwerfen.**
  Sie zeigt statt des Hakens ihre Stufe. Sonst könnte eine Durchsicht eine
  Karte, die auf Stufe 5 sitzt, auf 1 zurücksetzen.

---

## 2.3.0 – 6. September 2026 — „Gruppen und Schlösser"

### Neu

- **Speicherkarten haben jetzt eine Art.** Im Verwalten-Tab stehen sie in drei
  Abschnitten untereinander, jeder mit einer Zeile, die erklärt, was er tut:

  - **📚 Kategorien** – die großen Sammelmappen quer durch den Stoff (Nomen,
    Verben, Grammatik …). Immer offen, nie sperrbar.
  - **📖 Lektionen** – eine Einheit des Buchs bzw. ein Video. Nur Lektionen
    lassen sich sperren, und nur sie geben Karten frei.
  - **⭐ Eigene** – selbst zusammengestellt, zum gezielten Üben. Genau dafür
    waren die Speicherkarten ursprünglich gedacht.

  Umgestellt wird die Art über das kleine Auswahlfeld rechts in der Zeile.
  Alle vorhandenen Speicherkarten gelten zunächst als „Eigene" und verhalten
  sich damit exakt wie bisher.

- **Das Schloss an den Lektionen.** Ein Tipp auf das 🔓 in der Zeile schaltet
  eine Lektion frei, ein Tipp auf das 🔒 sperrt sie wieder. Gesperrt heißt
  wirklich zu: die Karten sind nicht fällig, lassen sich nicht üben, nicht
  aufklappen, nicht auswählen und zählen nicht im Fortschritt.

  Die Regel dahinter in einem Satz: **Eine Karte ist frei, wenn sie in
  mindestens einer nicht gesperrten Lektion liegt.** Kategorien und eigene
  Speicherkarten geben nie frei – sie zeigen nur an. Deshalb darf dieselbe
  Karte in beliebig vielen Kategorien liegen, ohne dass es die Freigabe stört.

- **Geführte Kartensätze.** Ein Bereich, der aus einem weitergegebenen Satz
  entstanden ist, ist schreibgeschützt: keine neuen Karten, kein Bearbeiten,
  kein Löschen, kein Umsortieren. Nur so steht der Stoff bei allen in
  derselben Reihenfolge – und nur so kann eine spätere Ausgabe des Satzes
  sauber nachziehen, ohne etwas durcheinanderzubringen. Eigene Speicherkarten
  darf sich trotzdem jede:r anlegen; aufnehmen lassen sich darin allerdings
  nur freigeschaltete Karten.

  Im eigenen Bereich ändert sich davon nichts. Dort ist weiterhin alles frei
  und alles bearbeitbar.

- **In den Kategorien ist zu sehen, was schon dran ist.** Freigeschaltete
  Karten sind hervorgehoben – dieselbe Farbe wie bei den Suchtreffern –,
  gesperrte stehen ausgegraut mit 🔒 daneben. Wer „Nomen" mit seinen 96 Karten
  öffnet, sieht auf einen Blick, welche davon er anfassen darf.

- **Ein dritter Backup-Knopf: „zum Weitergeben".** Er erzeugt aus dem offenen
  Bereich eine Datei für andere: alle Karten auf Stufe 0 ohne Lernverlauf,
  alle Lektionen gesperrt bis auf die erste, Schreibschutz gesetzt.

  Der Unterschied fällt damit beim **Erzeugen** der Datei, nicht beim
  Einspielen. Das ist Absicht: So gibt es keinen Import-Knopf, mit dem sich
  aus Versehen der eigene Lernstand auf Null setzen ließe. Der Import liest
  schlicht, was in der Datei steht, und bleibt ein einziger Knopf.

  Die Datei trägt außerdem eine Kennung des Satzes, eine laufende Nummer und
  eine Herkunfts-Nummer an jeder Karte. Das tut heute noch nichts – es muss
  aber schon in der allerersten Datei stehen, weil sich Dateien, die einmal
  draußen sind, nicht nachrüsten lassen. Ohne diese Angaben könnte eine
  spätere Ausgabe den vorhandenen Satz nicht wiedererkennen und würde einen
  zweiten Bereich mit allem doppelt anlegen.

### Geändert

- **Das Tageslimit für neue Karten ist entfallen.** Es war die Notbremse gegen
  500 fällige Karten am ersten Tag. Diese Aufgabe übernimmt jetzt das Schloss,
  und zwar besser: Es bremst am Stoff statt an einer Zahl, die niemand
  einstellen will – und man sieht, *warum* heute nicht mehr kommt, statt nur,
  dass etwas fehlt.

  In einem eigenen Bereich ohne Lektionen gibt es damit keine Bremse mehr.
  Wer dort auf einmal viele Karten anlegt, hat sie auch alle am selben Tag
  fällig.

- **Für die Streak zählen nur noch Wiederholungen.** Neuer Stoff ist
  freiwillig, Wiederholungen sind die Pflicht.

  Ohne diese Trennung könnte das Freischalten einer Lektion die Flamme kosten:
  Wer abends Lektion 3 aufschließt und sie nicht mehr durcharbeitet, hätte
  plötzlich 25 offene Karten, obwohl er alles Fällige erledigt hatte. Vorher
  hielt das Tageslimit neue Karten zurück und das Problem fiel nicht auf; ohne
  Limit fällt es sofort auf.

- **Die vier Knöpfe oben rechts heißen nach dem, was sie tun.** „Backup" und
  „exportieren" bezeichneten vorher dasselbe und sahen nach zwei verschiedenen
  Funktionen aus. Jetzt: 💾 Backup · alles, 💾 Backup · nur „X",
  💾 Backup · zum Weitergeben, 📥 Import.

- **Der Fortschritts-Tab lässt gesperrte Karten weg.** Sonst stünden bei einem
  frisch eingespielten Satz 500 Karten in der Gruppe „neu" und der Fortschritt
  sähe aus, als wäre nichts geschafft – obwohl die erste Lektion sitzt.

- **Speicherkarten werden innerhalb ihrer Gruppe sortiert.** Der ⠿-Griff zieht
  weiterhin, aber nur zwischen Speicherkarten derselben Art. Die Art wechselt
  man über das Auswahlfeld, nicht durchs Ziehen.

---

## 2.2.0 – 6. September 2026 — „Speicherkarten"

### Neu

- **Speicherkarten sind zugeklappt, bis man sie braucht.** Über der Kartenliste
  steht jetzt nur noch eine Zeile: „▸ ⭐ Speicherkarten (6)". Ein Tipp darauf
  klappt sie auf. Beim nächsten Start ist sie wieder zu.

  Grund: Das Feld wuchs mit jeder neuen Speicherkarte weiter nach unten und
  schob Suchfeld und Kartenliste aus dem Bild. Wer Speicherkarten pro Lektion
  anlegt, hätte nach einem halben Buch ein Dutzend Zeilen vor sich, bevor die
  erste Vokabel kommt.

- **Speicherkarten lassen sich sortieren.** Derselbe ⠰-Griff wie bei den
  Karten, gezogen wird der ganze Block samt aufgeklappter Kartenliste. Damit
  ordnest du selbst, was oben steht – zum Beispiel die festen Gruppen oben und
  die Lektionen darunter. Eine eigene Gruppierungsfunktion braucht es dafür
  nicht: Die Reihenfolge ist die Gruppierung.

### Behoben

- **Import konnte bestehende Karten überschreiben.** Er behielt die
  Karten-Nummern aus der Datei bei. Seit dem Umbau in 2.0.0 liegt jede Karte
  als eigener Datensatz unter ihrer Nummer – gab es diese Karten im Konto
  noch, zog der Import sie in den neuen Bereich hinüber und ließ den alten
  leer zurück. Betroffen war vor allem der zweite Import derselben Datei.

  Jede importierte Karte bekommt jetzt eine neue Nummer; die Verweise in den
  Speicherkarten werden mit umgeschrieben.

---

## 2.1.0 – 6. September 2026 — „Suchen und Finden"

### Behoben

- **Tippen im Suchfeld auf dem Handy.** Wer „sonne" eintippte, sah plötzlich
  „snn" im Feld stehen.

  Grund: Jedes Zeichen löste 150 ms später einen kompletten Neuaufbau der
  Seite aus – einschließlich des Suchfelds, in dem gerade getippt wurde. Die
  Handy-Tastatur hängt aber mit ihrem halbfertigen Wort (Autokorrektur,
  Wortvorschlag, Wischen) an genau diesem Feld. War es weg, schob sie beim
  nächsten Zeichen ihre Reste verdreht in das neue Feld hinein. Am PC fiel
  das nicht auf, weil es dort kein „Wort in Arbeit" gibt.

  Jetzt steckt die Kartenliste in einem eigenen Kasten und wird beim Tippen
  allein neu gezeichnet; das Suchfeld wird dabei nie angefasst. Zusätzlich
  wartet die App, solange die Tastatur an einem Wort baut, und Autokorrektur
  sowie Rechtschreibprüfung sind für das Suchfeld abgeschaltet.

- **Schriftgröße wirkte im Fortschritts-Tab nicht.** Die Einstellung
  klein / normal / groß gilt laut 1.8.0 überall, wo Arabisch steht. Die Zeilen
  unter „🔥 Karten, die nicht klappen" waren davon ausgenommen – sie heißen im
  Aufbau anders als die Zeilen der Kartenliste und wurden von der Regel nicht
  erfasst. Dort blieb das arabische Wort auf Normalgröße.

- **„Noch offen für die Streak" versprach zu viel.** Das Tageslimit für neue
  Karten gilt über alle Bereiche zusammen. Die Zeile fragte aber jeden Bereich
  einzeln, und jeder rechnete mit dem vollen Restbudget – bei Limit 10 und drei
  Bereichen voller neuer Karten stand dort 30, obwohl heute 10 eingeführt
  werden. Der Streak-Zähler selbst war davon nicht betroffen, und nach zehn
  gelernten Karten sprang die Anzeige von selbst auf 0. Jetzt wird das Budget
  der Reihe nach verteilt; der geöffnete Bereich kommt zuerst dran, weil dort
  als Nächstes gelernt wird.

- **Duplikatprüfung war schwächer als die Suche.** Sie entfernte nur Harakat
  und Tatweel. „أحمد" und „احمد" galten damit als zwei verschiedene Wörter und
  liessen sich doppelt anlegen – beim Abtippen ohne Hamza der häufigste Fall
  überhaupt. Sie benutzt jetzt dieselbe Vergleichsform wie die Suche.

  Mit **einer** Ausnahme: ى und ي bleiben in der Duplikatprüfung getrennt.
  على (auf) und علي (Ali) stehen beide in fast jedem Anfänger-Wortschatz. Die
  Suche darf sie zusammenwerfen – ein Treffer zu viel kostet nichts. Eine
  Warnung zu viel kostet dagegen Vertrauen, und eine Warnung, die man
  gewohnheitsmäßig wegklickt, warnt nicht mehr.

### Die Suche findet, was gemeint ist

Bisher verglich die Suche rohen Text mit rohem Text. Gefunden wurde nur, was
Zeichen für Zeichen gleich geschrieben war. Jetzt läuft jeder Vergleich über
eine Vergleichsform – gespeichert und angezeigt wird selbstverständlich
weiterhin der Originaltext.

- **Ohne Harakat suchen.** Harakat, Sukun, Dagger-Alif und Tatweel fallen beim
  Vergleich weg, أ إ آ ٱ gelten als ا, ى als ي und ة als ه. „شمس" findet
  „الشَّمْس".
- **Deutsch und Umschrift.** ä/ö/ü/ß und Umschrift-Striche (ā ī ū š ṣ ḥ ṭ)
  zählen wie ihre Grundbuchstaben: „grosses" findet „großes", „kitab" findet
  „kitāb", „schlussel" findet „Schlüssel".
- **Artikel egal.** „alshams", „al-shams" und „shams" finden dasselbe, ebenso
  „الشمس" und „شمس". Der Artikel wird nur am **Wortanfang** abgeschnitten und
  nur, wenn danach noch mindestens drei Zeichen stehen – sonst würde „alle" zu
  „le" und fände jedes zweite Wort.
- **Mehrere Wörter gelten UND.** „sonne licht" findet die Karte, auf der beides
  steht – in beliebiger Reihenfolge und in beliebigen Feldern.
- **Reihenfolge der Treffer.** Wortanfänge stehen oben, „irgendwo drin" darunter.
  Vorher stand der beste Treffer gelegentlich auf Platz 40.
- **Ähnliche Treffer als Notfall.** Erst wenn es gar nichts Genaues gibt, wird
  ein Buchstabe Abweichung erlaubt – auch das Vertauschen zweier Zeichen, der
  häufigste Vertipper. „sonen" findet dann „Sonne", mit dem Hinweis, dass es
  kein genauer Treffer ist. Immer an hieße: drei getippte Zeichen passen auf
  fast alles, und man sucht in den Suchergebnissen weiter.
- **Fundstellen sind markiert.** Der Teil, der gepasst hat, ist in der Zeile
  hervorgehoben – beantwortet die Frage „warum ist das hier drin?" von allein.
- **Trefferzahl** über der Liste und ein **✕** im Suchfeld zum Leeren.
- Gesucht wird weiterhin in Wort, Übersetzung **und** Notiz. Der Platzhalter
  sagt das jetzt auch.

### Listen lesbarer

- Übersetzung und Notiz hatten dieselbe Farbe und keinen Abstand – die drei
  Zeilen lasen sich als ein Block. Die Übersetzung steht jetzt in voller
  Textfarbe, die Notiz bleibt gedämpft und bekommt einen Strich am Rand wie
  ein Zitat.
- Dieselbe Verbesserung gilt jetzt auch für die Zeilen im Fortschritts-Tab.
  Dort standen Wort und Übersetzung in gleicher Größe direkt übereinander.

### Nicht enthalten, bewusst

- **Latein zu Arabisch** („shams" findet شمس, ohne dass „shams" irgendwo auf der
  Karte steht). Das bräuchte eine Umschrifttabelle, und Arabisch lässt sich auf
  zehn Arten umschreiben – das rät mehr als es findet. Steht die Umschrift in
  der Notiz, wird sie ohnehin gefunden.

---

## 2.0.0 – 5. September 2026 — „Umbau"

### Karten als eigene Datensätze (C1)

- Bisher lagen alle Bereiche und alle Karten zusammen in **einem** Datensatz.
  Der darf höchstens 1 MiB groß werden – bei etwa 5.000 bis 7.000 Karten wäre
  Schluss gewesen, und zwar hart: Ab da ließe sich keine Karte mehr anlegen.
  Jetzt hat jede Karte ihren eigenen Datensatz und diese Grenze fällt weg.

  Neuer Aufbau: `users/{uid}` (Name, Streak, Einstellungen),
  `users/{uid}/bereiche/{bid}` (Name, Reihenfolge, Speicherkarten),
  `users/{uid}/karten/{cid}` (Feld `bereichId` plus die Felder der Karte).

  Die Karten liegen flach, mit dem Bereich als Feld – nicht unterhalb des
  Bereichs. Dadurch bleibt die Suche über alle Bereiche eine einzige Abfrage,
  und das Verschieben einer Karte ändert nur ein Feld statt Kopieren und
  Löschen.

- **Einmaliger Umzug beim ersten Start.** Vorher muss ein Backup
  heruntergeladen werden – erst danach lässt sich der Umzug starten. Der alte
  Datensatz bleibt als Sicherheitsnetz stehen und wird nicht gelöscht.
  Bricht der Umzug ab, bleibt der alte Stand maßgeblich und der Versuch
  beginnt beim nächsten Start von vorn.

- Karten-IDs waren bisher nur innerhalb eines Bereichs eindeutig. Bei einer
  Dopplung bekommt die zweite Karte während des Umzugs eine neue ID;
  Speicherkarten, die auf die alte zeigten, werden mitgezogen.

- Geladen werden weiterhin **alle** Karten des Nutzers. Nur die fälligen zu
  laden wäre erst bei Zehntausenden Karten ein Gewinn und müsste Fortschritt,
  Suche, Duplikatprüfung und Export mit umbauen. Die neue Struktur lässt das
  jederzeit nachträglich zu, ohne die Daten noch einmal umzuziehen.

- Beim Löschen eines Bereichs werden seine Karten jetzt einzeln mitgelöscht.
  Firestore räumt Unter-Sammlungen nicht von selbst auf – sie blieben sonst
  für immer liegen.

### Lange Kartenlisten (C2)

- **Suche** zeichnet die Liste erst neu, wenn 150 ms lang nichts mehr getippt
  wurde. Vorher rechnete jeder Tastendruck die Treffer aus und baute alle
  Zeilen neu.
- **Ein Haken im Auswahlmodus** ändert nur noch seine eigene Zeile und die
  Zahl in der Aktionsleiste, statt die ganze Liste neu zu bauen.
- **Seitenweise ab 150 Karten**, 100 pro Seite, mit Blätter-Leiste oben und
  unten. Darunter bleibt alles wie bisher – keine Seitenleiste, kein
  Unterschied. Ziehen zum Sortieren wirkt innerhalb der sichtbaren Seite;
  über die Seitengrenze hinaus geht „↪ Verschieben" im Auswahlmodus.

### Hinweis für mehrere Geräte

Der Umzug gehört auf ein Gerät. Ist die App auf einem anderen Gerät während
des Umzugs noch offen, schreibt sie dort weiter ins alte Format – diese
Änderungen wären verloren. Alle anderen Geräte danach einmal neu laden.

---

## 1.9.0 – 4. September 2026
- A4: Änderungen werden gezielt gespeichert statt das ganze Dokument
  zu überschreiben. Zwei Geräte können sich nicht mehr gegenseitig
  Karten löschen.
- A3: Der offene Bereich hängt an seiner ID statt an einer
  Positionsnummer. Karten landen nicht mehr im falschen Bereich, wenn
  auf einem anderen Gerät ein Bereich gelöscht oder umsortiert wurde.
- firestore.rules liegt jetzt im Repo; die Regeln verlangen zusätzlich
  eine bestätigte E-Mail-Adresse.

## 1.8.1 – 4. September 2026

### Entfernt

- Die Grafik **„Neu eingeführt (letzte 30 Tage)"** im Fortschritts-Tab ist raus.

  Sie zählte, wie viele Karten an einem Tag zum ersten Mal bewertet wurden.
  Für bestehende Sammlungen konnte sie nie etwas anzeigen: Karten aus der Zeit
  vor 1.6.0 haben kein bekanntes Datum der ersten Bewertung und fallen aus dem
  Zeitfenster. Wer gerade keine neuen Karten anlegt, sah dauerhaft eine leere
  Grafik – das sieht wie ein Fehler aus, obwohl nichts kaputt war. Und was man
  täglich wirklich tut, nämlich wiederholen, konnte sie prinzipiell nicht
  zeigen.

  Mitentfernt: die Rechenfunktion `neuVerlauf()` und die nur dort benutzten
  Stile. Die 7-Tage-Vorschau ist davon nicht berührt.

### Korrigiert

- **„Strich zurück" im Übungsmodus** erschien bisher erst, nachdem man einmal
  ins Vollbild gewechselt hatte. Grund: Nur dieser Wechsel löste ein
  Neuzeichnen der Werkzeugleiste aus; das Schreiben selbst malt nur roh aufs
  Zeichenfeld. Der Knopf erscheint jetzt direkt nach dem ersten Strich.
- **Übungsmodus zeigt nur noch zwei Bewertungsknöpfe** statt drei. „Fast" und
  „Sicher" taten dort bisher exakt dasselbe, weil es im Übungsmodus keine
  Wiederholungsstufe gibt, die sich ändern könnte. Jetzt: **Nochmal** (Karte
  kommt in derselben Runde gleich wieder) und **Weiter** (nächste Karte). Im
  normalen Lernen-Tab bleiben es weiterhin drei – dort wirken sie wirklich
  unterschiedlich.
- **Scrollen nach dem Aufdecken oder Aufklappen der Beispielsätze** zielt jetzt
  auf die Bewertungszeile statt nur auf die Lösung, mit etwas Luft zum unteren
  Bildschirmrand. Vorher musste man nach dem Vergleichen oft nochmal von Hand
  weiterscrollen, um überhaupt bewerten zu können.

### Vereinfacht

- Das Feld „Wiederholungsstufe" beim Bearbeiten einer Karte zeigt nur noch
  seinen Namen, nicht mehr die komplette Intervall-Tabelle in Klammern.

### Neu

- **Rand-Scrollen mit der Maus (nur PC).** Die Seite scrollt jetzt von selbst,
  wenn die Maus ganz ohne Klick oben oder unten an den Bildschirmrand kommt –
  je näher am Rand, desto schneller, dieselbe Beschleunigung wie beim
  Sortieren der Karten per Ziehen. Reagiert nicht, während eine Karte gezogen
  wird, während im Übungsmodus geschrieben wird, bei offenem Dialog oder in
  einem Textfeld. Auf dem Handy unverändert: normales Wischen mit dem Finger.

---

## 1.8.0 – 4. September 2026

### Schreiben (E5)

- Das Zeichenfeld im Handschrift-Übungsmodus hat jetzt eine Grundlinie wie im
  Schreibheft. Sie sitzt bei zwei Dritteln der Höhe, damit die Buchstaben, die
  unter die Linie hängen, noch Platz haben.
- „Fertig" schließt das Vollbild automatisch. Vorher lag die Zeichenfläche als
  eigenes Fenster über der Lösung – man musste erst „Verkleinern" drücken, um
  überhaupt zu sehen, was richtig gewesen wäre.
- Nach dem Aufdecken rutscht die Seite nur so weit, dass die Lösung sichtbar
  wird. Die eigene Zeichnung bleibt dabei im Bild.

### Einzelnen Strich zurücknehmen (D9)

- Neuer Knopf **↶ Strich zurück** neben „Löschen". Er erscheint ab dem ersten
  Strich und verschwindet nach dem Aufdecken.

### Schriftgröße für Arabisch (E7)

- Auf dem Lernen-Tab drei Knöpfe: klein / normal / groß. Die Einstellung gilt
  überall, wo Arabisch steht, und liegt in der Cloud – also auf jedem Gerät
  gleich.

### Suche über alle Bereiche (D7)

- Im Verwalten-Tab schaltet ein Umschalter zwischen „nur dieser Bereich" und
  „alle Bereiche". Treffer aus einem anderen Bereich tragen dessen Namen; der
  ✏️-Knopf springt dorthin und öffnet die Karte.

### Eigene Dialoge (D2)

- Alle 22 System-Kästen (`alert`, `confirm`, `prompt`) sind durch eigene
  Dialoge im Stil der App ersetzt. Sie zeigen einen echten Titel statt der
  Seiten-Adresse, Löschen-Knöpfe sind rot, und Enter beziehungsweise Escape
  funktionieren. `prompt()` wurde von manchen Browsern schlicht ignoriert –
  dann passierte gar nichts und niemand wusste, warum.

### Kleinigkeiten

- Das Datum des letzten Backups liegt jetzt in der Cloud statt nur im Gerät
  (D5). Auf einem neuen Handy hieß es vorher immer „noch nie gesichert".
- Arabischer Text ist in Listen, Lernkarte und Fortschritts-Tab als Arabisch
  ausgezeichnet (D4). Der Browser wählt danach Schrift und Leserichtung.
- Die Emoji-Knöpfe haben Beschriftungen für Vorlesefunktionen bekommen (D3).

### Nicht enthalten, bewusst

Audio pro Karte · zweite Abfragerichtung · Vorlage zum Nachfahren ·
Zeichnung speichern · Tippen statt Aufdecken · Filter „nur schwierige Karten" ·
Hell/Dunkel · Tastatur-Kürzel anzeigen · Session-Länge wählbar ·
Quran-Schrift ins Repo. Begründungen stehen in der Projektakte.

---

## 1.7.0 – 4. September 2026 — „Für die Brüder"

*(rekonstruiert aus der Projektakte, Abschnitte 10 und 11 – nicht wortgleich mit dem Original)*

### Neu

- **Fortschritt sichtbar (E4/D10).** Ein neuer Tab zeigt Kennzahlen, wie fest
  der Stoff sitzt (Verteilung über die Wiederholungsstufen), die nächsten
  7 Tage an Wiederholungen und eine Liste der Karten, die immer wieder
  entfallen.
- **Verbrannte Karten (E6).** Karten, die wiederholt nicht klappen, bekommen
  ab 5 Rückfällen eine 🔥-Markierung – ein Hinweis, sie umzuformulieren oder
  in zwei Karten aufzuteilen, statt weiter Lernzeit zu kosten. Neues Feld
  `karten.*.rueckfaelle`; alte Karten starten bei 0.
- **E-Mail-Bestätigung (C4).** Nach der Registrierung muss die E-Mail-Adresse
  bestätigt werden, bevor die App nutzbar ist – verhindert Registrierungen mit
  erfundenen Adressen.

### Aufgeräumt

- Reste der in 1.6.0 kurzzeitig vorhandenen Funktion „Liste einfügen" (E1)
  entfernt: verwaiste Kommentare, leere Zeilen im Aktions-Verteiler, eine
  Lücke im CSS.

### Kurzzeitig enthalten, wieder entfernt

- Ein „Bibliothek"-Tab mit öffentlichen, kopierbaren Kartensätzen (E2) wurde
  eingebaut und auf Wunsch des Betreibers vollständig wieder herausgenommen –
  dauerhaft, nicht nur für diese Version.

---

## 1.6.0 – 3. September 2026 — „Lernlogik"

*(rekonstruiert aus der Projektakte, Abschnitte 6, 7 und 9 – nicht wortgleich mit dem Original)*

### Behoben

- **Intervall ohne Deckel (B1).** Wiederholungsabstände verdoppelten sich ohne
  Obergrenze und wurden nach einigen Monaten unrealistisch lang. Jetzt bei
  180 Tagen gedeckelt.
- **„Wusste ich nicht" warf zu hart zurück (B2).** Eine dritte Bewertungstaste
  unterscheidet jetzt „nicht gewusst" von „fast gewusst" statt beides gleich
  zu behandeln.
- **Kein Tageslimit für neue Karten – Lawineneffekt (B3).** Neue Karten kamen
  unbegrenzt dazu und rissen bestehende Wiederholungen mit sich. Jetzt ein
  einstellbares Tageslimit (`settings.neuProTag`).
- **Kein Jitter (B4).** Karten aus derselben Sitzung kamen exakt am selben
  Tag wieder zurück und stauten sich. Ein kleiner Zufallswert verteilt sie
  jetzt leicht.
- **Der Tag begann um Mitternacht (B5).** Für jemanden, der nach Mitternacht
  noch lernt, fühlte sich das falsch an; die Tagesgrenze liegt jetzt bei 4 Uhr.
- **Streak riss bei mehreren Bereichen (A7).** Der Streak-Zähler prüfte nur
  einen Bereich statt alle zusammen.
- **Keine Duplikatprüfung (D6).** Dasselbe Wort ließ sich zweimal im selben
  Bereich anlegen. Jetzt eine Warnung beim Speichern und beim Import, Vergleich
  ohne Harakat und Tatweel.

### Neu, später wieder entfernt

- **Massen-Import („Liste einfügen", E1).** Mehrere Vokabeln auf einmal per
  Textfeld einfügen. Auf Wunsch des Betreibers nach dieser Version wieder
  vollständig entfernt – siehe Projektakte, Abschnitt 10.

Neue Felder: `karten.*.ersteBewertung`, `settings.neuProTag`. Bestehende
Fälligkeitsdaten blieben unangetastet.

---

## 1.5.0 – Datum nicht in der Akte vermerkt — „Reparieren und Grundlagen"

*(rekonstruiert aus der Projektakte, Abschnitt 6 und 9 – nicht wortgleich mit dem Original; siehe Hinweis ganz oben zur verlorenen Originalfassung)*

### Behoben

- **Absturz beim Bewerten (A1).** Wurde eine Karte auf einem anderen Gerät
  gelöscht, während die Session hier offen war, stürzte die Bewertung mit
  einem TypeError ab.
- **Handschrift wurde verzerrt gezeichnet (A2).** Die Zeichenfläche war intern
  700×260 Pixel groß, wurde aber verzerrt angezeigt – auf dem Handy waagerecht
  um fast das Doppelte gestaucht. Runde Bögen wurden zu Ellipsen.
- **Wiederholungsstufe war nach oben offen (A5).**
- **Getippter Text ging verloren (A6).** Kam während der Eingabe ein
  Cloud-Snapshot herein oder wurde ein anderer Knopf gedrückt, war die halb
  getippte Vokabel weg. Ein Zwischenspeicher (`formDraft`) hält den Entwurf
  jetzt bei jedem Tastendruck fest.
- **Veraltetes Meta-Tag (D8).** `apple-mobile-web-app-capable` durch das
  aktuelle `mobile-web-app-capable` ergänzt.

### Neu

- Versionsnummer sichtbar in der App.
- `sw.js` überarbeitet.
- `CHANGELOG.md` angelegt.
- Fokus bleibt nach „Karte hinzufügen" im Eingabefeld, statt bei jeder
  weiteren Karte neu hineinklicken zu müssen (D1).
