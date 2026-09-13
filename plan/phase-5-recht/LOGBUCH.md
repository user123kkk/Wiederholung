# Logbuch Phase 5 — Recht

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `fertig`

---

## Format jedes Eintrags

Die Arbeit läuft über viele getrennte Sessions. Ein Eintrag muss allein
verständlich sein, ohne Rückfrage und ohne die vorige Session zu kennen:

```
### JJJJ-MM-TT — kurze Überschrift

**Geändert:** Dateien mit Pfad, bei Code mit Zeilennummer
**Entscheidung:** was festgelegt wurde — und warum, nicht nur was
**Offen:** was bewusst liegen bleibt und woran es hängt
**Nächster Schritt:** das eine, was als Nächstes zu tun ist
```

Auch „geprüft, nichts zu tun" ist ein Eintrag. Sonst prüft die nächste Session
dasselbe noch einmal.

---

## Einträge

### 2026-09-12 — Geprüft: weiterhin durch offene Fragen 3 und 4 gesperrt

**Geändert:** Keine Dateien. Reine Prüfung nach Phase-4-Abschluss.

**Entscheidung:** Nach `../PLAN.md`, „Wo eine neue Session anfängt" wäre
Phase 5 als Nächstes dran. `AUFTRAG.md:5–6` verlangt aber offene Fragen 3
und 4 als beantwortet — beide stehen in `../PLAN.md`, Abschnitt „Offene
Fragen" weiterhin offen. Auch Phase 6, 7, 8, 9 wurden geprüft: Phase 6
hängt zusätzlich an offener Frage 2 und 4, Phase 7/8/9 hängen an Phase 6
(`fertig` vorausgesetzt, ist sie nicht). **Es gibt aktuell keine
unblockierte Phase.** Diese Session hat deshalb nichts gebaut, sondern die
Fragen dem Betreiber vorgelegt (siehe Antwort dieser Session).

**Offen:** Fragen 2, 3, 4 aus `../PLAN.md` — ausschließlich vom Betreiber
zu entscheiden.

**Nächster Schritt:** Sobald Frage 3 (und 4, falls sie Phase 5 betrifft)
beantwortet ist, Phase 5 nach `AUFTRAG.md` beginnen.

### 2026-09-12 — Fragen 3 und 4 beantwortet, Phase 5 begonnen

**Geändert:** `app.js:4722` (Datenschutz-Hinweis, Abschnitt „Löschen") —
Version 3.0.8. `sw.js:10` `CACHE_NAME` nachgezogen. `CHANGELOG.md` Eintrag
3.0.8. `AUFTRAG.md:3–6` Status auf `läuft`, Voraussetzungen als erfüllt
vermerkt.

**Entscheidung:** Betreiber hat beide Fragen entschieden (Details:
`../PLAN.md`, Abschnitt „Offene Fragen"):

- **Frage 3:** Datenschutzerklärung wird selbst geschrieben, aber nach dem
  Pflicht-Aufbau eines Generators (Verantwortlicher, welche Daten,
  Auftragsverarbeiter, Rechte, Cookies) — zugeschnitten auf das, was die
  App tatsächlich tut.
- **Frage 4:** Medina-Kartensatz bleibt privat, kein Teil der öffentlichen
  Seite. Ändert an dieser Phase nichts, weil sie ohnehin nur die
  öffentlich sichtbaren Inhalte betrifft.

Als ersten konkreten Schritt aus Auftrag Punkt 4 („Auskunft und Löschung
beschreiben, gestützt auf das in Phase 2 Gebaute") wurde ein Fund
korrigiert: Der bestehende Datenschutz-Hinweis in den Einstellungen
(`renderDatenschutz()`, seit v3.0.3) beschrieb Kontolöschung noch als
„Sag dem Betreiber Bescheid ... einen Knopf dafür gibt es noch nicht" —
das war seit dem Bau von „Konto löschen" in Phase 2 (v3.0.5) veraltet und
verschwiegen den vorhandenen Weg. Text beschreibt jetzt den tatsächlichen
Ablauf: Einstellungen → Konto löschen, sofort und selbst.

**Offen — braucht den Betreiber, kann kein Agent liefern:**

1. **Impressum.** Braucht echte, ladungsfähige Angaben: Name (bzw.
   Firma), Postanschrift, eine Kontaktmöglichkeit (E-Mail reicht meist,
   je nach Rechtsform ggf. Telefon). Ohne diese Angaben vom Betreiber
   kann kein Impressum-Text entstehen — erfundene Angaben wären selbst
   ein Rechtsverstoß.
2. **Wo die Rechtstexte öffentlich liegen.** Die App ist heute eine
   Single-Page-App ohne eigene Routen für separate Seiten. Impressum und
   Datenschutzerklärung müssen aber ohne Login lesbar sein (Konzept 4.3,
   „Private Seiten hinter dem Login"). Naheliegend: zwei eigene,
   statische Dateien (`impressum.html`, `datenschutz.html`) neben
   `index.html`, verlinkt vom Login-Bildschirm — das fasst kein
   Lernwerkzeug-Feature an. Wird beim Bau dieser Seiten umgesetzt, sobald
   Punkt 1 vorliegt.
3. Der bestehende `renderDatenschutz()`-Hinweis in der App bleibt
   zusätzlich als nutzerfreundlicher Kurztext bestehen (Fließtext statt
   Paragraphen) — die neue Datenschutzerklärung ist der rechtlich
   vollständige Text daneben, ersetzt den Hinweis nicht.
4. Cookie-Prüfung (Auftrag Punkt 3) noch nicht durchgeführt — folgt
   zusammen mit dem Bau der Datenschutzerklärung, da beides denselben
   Rechercheschritt braucht (was die App tatsächlich auf dem Gerät
   ablegt).

**Nächster Schritt:** Vom Betreiber die Impressum-Angaben (Name,
Anschrift, Kontakt) einholen — steht am Ende dieser Antwort unter „Was Du
noch tun musst". Danach: `impressum.html` und `datenschutz.html` bauen,
Cookie-Prüfung dabei erledigen, vom Login-Bildschirm aus verlinken.

### 2026-09-12 — Neuer Sperrpunkt: möglicherweise minderjährige Betreiberperson

**Geändert:** Keine Dateien. Reine Klärung im Gespräch, bevor Impressum-
Angaben eingesammelt werden.

**Entscheidung/Sachstand:** Im Gespräch kam heraus, dass das Tool
„für jemand anderes" gebaut werden soll, und auf Nachfrage wurde als
Beispiel eine **16-jährige** Person genannt. Ob das die tatsächliche
Betreiberperson ist, ist noch nicht abschließend geklärt (Formulierung im
Gespräch war „sagen wir jemand der 16 ist" — als Szenario, nicht
zwingend als bestätigte Tatsache).

**Warum das ein echter Sperrpunkt ist, nicht nur ein Hinweis:** Ein
16-Jähriger ist nach §106 BGB nur beschränkt geschäftsfähig. Die im
Impressum genannte Person ist die rechtlich greifbare Stelle (Abmahnungen,
DSGVO-Verantwortlicher, im Zweifel Klagen) — diese Rolle setzt praktisch
volle Geschäftsfähigkeit voraus. Es wurde dem Betreiber mitgeteilt, dass
hierfür üblicherweise ein Erziehungsberechtigter mit im Impressum stehen
oder formal als Betreiber auftreten muss. **Diese Session gibt dazu
ausdrücklich keine Rechtssicherheit** (siehe `AUFTRAG.md`, „Was
ausdrücklich nicht getan wird") — das muss der Betreiber selbst absichern,
z. B. mit den Eltern oder einer echten Beratungsstelle.

**Offen:**

1. Ist die tatsächliche Betreiberperson minderjährig — ja oder nein?
2. Falls ja: Wer steht im Impressum — ein Elternteil (allein oder
   zusätzlich), oder eine andere volljährige Person, die formal als
   Betreiber auftritt?
3. Erst danach: die eigentlichen Impressum-Angaben (Name, Anschrift,
   Kontakt) der dann feststehenden Person(en) einholen.

**Nächster Schritt:** Diese drei Punkte mit dem Betreiber klären, bevor
irgendein Name in `impressum.html` landet. Eine neue Session, die diesen
Eintrag liest, fragt zuerst nach, statt mit unklaren Angaben
weiterzubauen.

### 2026-09-12 — Minderjährigkeit bestätigt, Betreiberperson weiterhin offen; Cookie-Prüfung erledigt

**Geändert:** Keine Code-Dateien. Reine Recherche für die Cookie-Prüfung
aus `AUFTRAG.md` Punkt 3.

**Entscheidung/Sachstand Impressum:** Betreiber hat bestätigt: Die
tatsächliche Betreiberperson ist minderjährig (16). Wer stattdessen oder
zusätzlich im Impressum steht, ist **weiterhin offen** („vielleicht jemand
anderes" — noch nicht entschieden, wer). Diese Session fragt nicht weiter
nach, bis der Betreiber das mit den Beteiligten geklärt hat — das ist
keine Entscheidung, die sich hier herbeireden lässt. Weiterhin keine
Impressum-Angaben eingesammelt, kein Name irgendwo eingetragen.

**Cookie-Prüfung (unabhängig vom Impressum-Punkt, deshalb jetzt erledigt):**
Code durchsucht (`app.js`, `index.html`, `firebase.json`) nach
`document.cookie`, `Set-Cookie` und Drittanbieter-Einbettungen (iframes,
Fremd-Skripte):

- **Kein einziges `document.cookie` im Code.** Die App setzt keine
  eigenen Cookies.
- **Firebase Auth** nutzt ohne eigene `setPersistence()`-Konfiguration
  (im Code nicht gesetzt, also Standardverhalten) im Web IndexedDB, keine
  Cookies.
- **`localStorage`** wird genutzt (Thema/Helligkeit `app.js:890`,
  altes Backup-Datum `app.js:1020,1032,2301,2341`) — das ist technisch
  kein Cookie und fällt ohnehin unter „unbedingt technisch erforderlich"
  (§25 Abs. 2 Nr. 2 TDDDG): die App merkt sich nur, was der Nutzer selbst
  ausgelöst hat (Helligkeit, Offline-Fähigkeit), nichts zum
  Wiedererkennen über Sitzungen hinweg zu Tracking-Zwecken.
- **Keine Drittanbieter-Einbettungen**, die Cookies setzen könnten — kein
  `<iframe>`, keine Google Fonts, kein Analytics/Werbe-Skript. Die zwei
  externen Ressourcen (`gstatic.com` fürs SDK, `verses.quran.foundation`
  für die Schrift, beide bereits im Datenschutz-Hinweis und in der CSP
  dokumentiert) sind reine Datei-Downloads ohne Cookie-Mechanismus.
- `firebase.json` setzt selbst keine `Set-Cookie`-Header.

**Ergebnis: Keine nicht-notwendigen Cookies. Kein Cookie-Banner nötig.**
Auftrag Punkt 3 aus `AUFTRAG.md` damit erfüllt, unabhängig vom noch
offenen Impressum-Punkt.

**Offen:** Weiterhin: wer im Impressum steht (siehe voriger Eintrag).
Erst danach `impressum.html`/`datenschutz.html` bauen — die
Datenschutzerklärung kann das Cookie-Ergebnis aber schon jetzt
mit-formulieren.

**Nächster Schritt:** Warten, bis der Betreiber die Betreiberperson für
das Impressum geklärt hat. Keine proaktive Nachfrage mehr in dieser
Session dazu — der Betreiber meldet sich, wenn geklärt.

### 2026-09-13 — Betreiberperson entschieden, neuer Sperrpunkt: Adresse

**Geändert:** Keine Dateien. Reine Klärung.

**Entscheidung:** Betreiber hat sich bewusst für das Restrisiko
entschieden: Der 16-Jährige steht unter eigenem Namen im Impressum, kein
Elternteil zusätzlich. Damit ist der Sperrpunkt aus dem Eintrag vom
12.09. beantwortet — diese Session hat die rechtliche Unsicherheit
erklärt (siehe voriger Eintrag), trifft aber keine Wertung über die
Entscheidung selbst.

Klargestellt: Für ein **privates, nicht-gewerbliches** Impressum sind
Steuernummer/USt-IdNr/Handelsregister **nicht** nötig — das gilt nur für
Gewerbebetriebe (Beispiel Shopify kam vom Betreiber, ist aber ein
kommerzieller Kontext und hier nicht einschlägig).

**Neuer, vom Betreiber selbst als relevant bestätigter Sperrpunkt:** Die
im Impressum stehende Anschrift ist öffentlich sichtbar. Die private
Wohnadresse eines 16-Jährigen öffentlich zu zeigen, ist ein
Sicherheitsthema, nicht nur eine Formalie — Betreiber hat das bestätigt
(„das ist relevant, ja"). Drei Wege genannt, wie eine ladungsfähige (also
nicht: Postfach) Anschrift ohne die private Wohnadresse aussehen kann:
kommerzieller Geschäftsadress-/Mailbox-Dienst, c/o bei einer
zustimmenden Institution aus dem Umfeld, oder die Adresse eines
Elternteils/anderen Erwachsenen. Einrichtung eines solchen Dienstes kann
kein Agent übernehmen (externe Anmeldung, ggf. Ausweisprüfung).

**Offen:**

1. Welcher der drei Wege (oder ein anderer) wird für die Anschrift
   gewählt?
2. Die daraus resultierende ladungsfähige Anschrift.
3. E-Mail-Adresse für den Kontakt (Pflichtangabe), optional Telefon.

**Nächster Schritt:** Warten auf die konkrete Anschrift und
Kontaktdaten. Erst mit vollständigen Angaben `impressum.html` bauen —
kein Teil-Impressum mit Platzhalter-Adresse veröffentlichen, das wäre
nutzlos bis irreführend.

### 2026-09-13 — Entscheidung geändert: Vater als Betreiberperson

**Geändert:** Keine Dateien.

**Entscheidung:** Betreiber ist von „16-Jähriger unter eigenem Namen"
abgerückt und hat sich für **den Vater** als im Impressum genannte
Person entschieden — löst sowohl den Geschäftsfähigkeits-Sperrpunkt als
auch den Adress-Sperrpunkt in einem Schritt (ein Erwachsener mit eigener
Wohnadresse). Beide vorigen Einträge zu diesem Thema bleiben als
Verlauf stehen, gelten aber als überholt.

**Offen:** Konkrete Angaben des Vaters — vollständiger Name, ladungs-
fähige Anschrift, Kontakt-E-Mail (Pflicht), optional Telefon.

**Nächster Schritt:** Sobald diese Angaben vorliegen, `impressum.html`
und `datenschutz.html` bauen, vom Login-Bildschirm verlinken.

### 2026-09-13 — Impressum und Datenschutzerklärung gebaut, Phase 5 fertig

**Geändert:** `impressum.html` (neu), `datenschutzerklaerung.html` (neu),
`app.js` (Version 3.0.9; Links zu beiden Seiten im Anmeldebildschirm
ergänzt), `styles.css` (`a.linklike` ergänzt, damit `<a>`-Links wie die
bestehenden Link-Buttons aussehen), `sw.js` (`CACHE_NAME` nachgezogen),
`CHANGELOG.md`.

**Entscheidung:** Angaben des Vaters erhalten: Nauroz Masjeedi,
Industriestraße 8, 25917 Leck, `masjeedikk@gmail.com`. Beide Seiten als
eigene, statische Dateien gebaut (keine SPA-Route) — ohne Anmeldung
lesbar, wie es §5 DDG verlangt, verlinkt vom Anmeldebildschirm neben dem
bestehenden „Datenschutz"-Kurzhinweis.

Impressum enthält nur, was für ein **privates, nicht-gewerbliches**
Angebot zutrifft (Name, Anschrift, Kontakt, Haftungs-/Urheberrechts-
Hinweise) — bewusst **ohne** Steuernummer, Handelsregister, redaktionelle
Verantwortlichkeit nach §18 Abs.2 MStV oder OS-Streitschlichtungs-Hinweis,
weil diese Punkte nur für Gewerbebetriebe bzw. redaktionelle/kommerzielle
Angebote gelten (Konzept-Grundsatz „kein Punkt wird abgearbeitet, nur
weil er in einer Liste stand").

Datenschutzerklärung ist nach dem Aufbau strukturiert, den ein Generator
auch verlangen würde (Verantwortlicher, Zwecke, Rechtsgrundlagen,
Empfänger/Auftragsverarbeitung, Speicherdauer, Betroffenenrechte), aber
zugeschnitten auf die tatsächlichen Fakten aus dem Code: Firebase
Hosting/Auth/Firestore, keine Cookies (Ergebnis aus dem vorigen Eintrag),
Selbstlöschung (Phase 2) und Sicherungs-Export als Umsetzung von Löschung
und Datenübertragbarkeit.

Inline-Skript (Thema vor dem ersten Bild) in beiden neuen Seiten
byte-identisch zu dem bereits per CSP-Hash freigegebenen Skript aus
`index.html` übernommen — geprüft mit einem Python-Hash-Vergleich, exakt
derselbe `sha256-uMYZgplEG1pNykFnYiO85iPRMRQOOE38Fk8UwfWoP8w=`. Keine
CSP-Änderung in `firebase.json` nötig.

**Woran diese Phase fertig ist (`AUFTRAG.md`):**

1. Impressum und Datenschutzerklärung erreichbar und inhaltlich
   deckungsgleich mit dem, was die App tatsächlich tut — erfüllt.
2. Cookie-Prüfung dokumentiert (voriger Eintrag) — Ergebnis „keine
   nicht-notwendigen Cookies, kein Banner" — erfüllt.
3. Entscheidung zu offener Frage 4 (Medina-Kartensatz bleibt privat) im
   Text abgebildet — die Startseite existiert noch nicht (Phase 6), aber
   nichts in den Rechtstexten widerspricht dem; erfüllt für den Umfang
   dieser Phase.
4. Dieses Logbuch geführt, `../PLAN.md` wird im selben Schritt auf
   `fertig` gesetzt.

**Offen:** Nichts mehr in Phase 5 selbst. Für später vorgemerkt: Sollte
sich die Betreiberperson, Anschrift oder E-Mail je ändern, müssen beide
Seiten von Hand nachgezogen werden — kein automatischer Mechanismus,
absichtlich, da so selten.

**Nächster Schritt:** Weiter mit Phase 6 (Öffentliche Startseite) — dort
steht laut `AUFTRAG.md` als Allererstes der verschärfte
Sicherheits-Durchlauf an, bevor irgendein Startseiten-Inhalt gebaut wird.

### 2026-09-13 — Eigene Arbeit geprüft: ein selbstgemachter und zwei ältere Fehler

**Geändert:** `styles.css` (neuer Abschnitt 18 „Statische Rechtsseiten"),
`impressum.html` und `datenschutzerklaerung.html` (Inline-Stile entfernt,
nutzen jetzt Klassen), `firebase.json` (CSP), `app.js` + `sw.js` +
`CHANGELOG.md` (Version 3.0.10).

**Anlass:** Betreiber hat vor dem Weitermachen eine Prüfung der eigenen
Arbeit verlangt. Richtig so — es waren drei echte Fehler da, zwei davon
älter als diese Phase.

**Fehler 1 (selbst verursacht, 3.0.9):** Beide neuen Rechtsseiten hatten
ihr Layout in einem `<style>`-Block im Kopf, dazu einzelne
`style="…"`-Attribute. Die scharfe CSP (`style-src 'self'`) blockiert
beides. Die Seiten wären auf der Live-Adresse ohne Layout erschienen —
lesbar, aber randlos über die volle Bildschirmbreite. Behoben: Die
Regeln liegen jetzt in `styles.css` (Abschnitt 18) und werden als
ausgelieferte Datei von `'self'` gedeckt. Gegengeprüft: `grep -c
"style="` auf beiden Seiten ergibt jetzt 0.

**Fehler 2 (aus Phase 4, gravierend):** Die Behauptung dort, es gebe
keine `style="…"`-Attribute im Code, ist falsch — es sind 81, und
darunter sind funktionale (alle Fortschrittsbalken, Statistik-Segmente,
Verlaufsraster). Seit dem Scharfschalten der CSP waren sie blockiert.
Ausführlich belegt im Nachtrag vom 13.09. in
`../phase-4-domain-hosting/LOGBUCH.md`.

**Fehler 3 (aus Phase 4):** `img-src 'self' data:` blockiert Bilder, die
über das Extra-Feld einer Karte eingebunden werden (`renderExtra`,
`app.js:5292`) — eine bestehende Funktion des Lernwerkzeugs, die die CSP
stillschweigend abgeschaltet hat.

**Gegengeprüft, in Ordnung:** Der Service Worker holt zuerst aus dem Netz
und weicht nur bei einer **fehlgeschlagenen Navigation ohne Cache-Treffer**
auf `index.html` aus (`sw.js:87`) — die neuen Seiten werden also normal
ausgeliefert und nicht von der App überlagert. Sie stehen bewusst nicht
in `APP_SHELL`: Sie werden zum Starten der App nicht gebraucht und landen
beim ersten Aufruf ohnehin im Cache. Weiter geprüft: `node --check` auf
`app.js` und `sw.js` fehlerfrei, Tag-Struktur beider neuer Seiten
ausgeglichen, `firebase.json` weiterhin gültiges JSON, die neuen Links
sind `<a>`-Elemente und damit konform zur Ausschlussliste aus
`../../README.md`.

**Offen:** `'unsafe-inline'` in `style-src` wieder loszuwerden ginge nur
über einen Umbau der Render-Funktionen des Lernwerkzeugs — ausgeschlossen
durch die Grundregel, vermerkt statt gebaut.

**Nächster Schritt:** Unverändert Phase 6, beginnend mit dem verschärften
Sicherheits-Durchlauf. Dieser prüft als Erstes, ob die CSP nach den zwei
Lockerungen noch trägt.

### 2026-09-13 — Zweite Prüfung, diesmal im echten Browser (v3.0.11)

**Geändert:** `datenschutzerklaerung.html` (§4 um den Namen ergänzt),
`app.js` (`renderDatenschutz`, Abschnitt „Dein Konto" um den Namen
ergänzt), `impressum.html` (Haftungs- und Urheberrechtstexte),
`styles.css` (`a.linklike` ohne `font: inherit`, `h1`-Abstand),
`sw.js`/`CHANGELOG.md` (Version 3.0.11).

**Wie geprüft wurde — das ist der eigentliche Punkt dieses Eintrags:** Die
erste Prüfung bestand aus Lesen, und Lesen hat die CSP-Fehler nicht
gefunden. Diesmal wurde das Repo lokal über einen kleinen Python-Server
ausgeliefert, der **die Header aus `firebase.json` wörtlich mitschickt**,
und die Seiten in einem echten Chromium (Playwright) geladen — inklusive
Anmeldebildschirm, für den die drei Firebase-SDK-Dateien durch Attrappen
ersetzt wurden, die „niemand angemeldet" melden. Verstöße gegen die CSP
erscheinen dann als Konsolenfehler, statt erst beim Nutzer aufzufallen.
Geprüft wurde in beiden Themen (hell/dunkel) und beiden Breiten (375 px,
1280 px). Ergebnis am Ende: **0 CSP-Verstöße, kein waagerechter Überlauf,
keine Skriptfehler.** Die Skripte liegen im Scratchpad dieser Session und
sind bewusst **nicht** ins Repo gewandert — sie gehören nicht zur
ausgelieferten App; wer sie wieder braucht, baut sie in zehn Minuten neu.

**Gefunden und behoben:**

1. **Inhaltliche Lücke, die schwerste der vier:** Bei der Registrierung
   ist ein **Name** Pflichtfeld (`app.js:1791`, gespeichert als
   `displayName` in Auth und als Feld `name` in Firestore, siehe
   `firestore.rules:100`). Weder der App-Hinweis noch die neue
   Datenschutzerklärung führten ihn auf. Eine Erklärung, die aufzählt,
   was gespeichert wird, darf ausgerechnet den Namen nicht auslassen.
   Beide Texte nennen ihn jetzt — mit dem Zusatz, dass er frei wählbar
   ist und nicht der echte sein muss, was ja auch stimmt: geprüft wird er
   nirgends.
2. **Schriftstärke:** Die neuen Links standen dünner da als der
   „Datenschutz"-Knopf direkt daneben. Ursache war mein eigenes
   `font: inherit` in `a.linklike` — die Kurzform setzt `font-weight`
   mit zurück und nahm der Regel darüber die 600 wieder weg. Im Browser
   sofort sichtbar, beim Lesen des CSS nicht.
3. **Sprache:** Beide Rechtstexte sagten „wir", obwohl dort eine einzelne
   Privatperson steht. Jetzt durchgehend „der Betreiber". Dazu im
   Urheberrecht ergänzt, dass selbst angelegte Lerninhalte bei den
   Nutzer:innen bleiben — das war vorher nicht gesagt und ist die Frage,
   die sich beim Teilen von Karten zuerst stellt.
4. **Abstand:** Auf der Impressum-Seite klebte die erste Abschnittsmarke
   an der Überschrift (8 px), weil dort der Einleitungssatz fehlt, der
   auf der anderen Seite den Abstand hält. Jetzt 24 px auf beiden.

**Geprüft und in Ordnung:** Löschung entfernt tatsächlich erst Firestore,
dann das Auth-Konto (`app.js:1926–1927`) — die Aussage „sofort und
unwiderruflich" stimmt. Die Aufzählung des Lernstoffs deckt sich mit den
Feldern aus `firestore.rules`. Zuständige Aufsichtsbehörde ist das
Unabhängige Landeszentrum für Datenschutz Schleswig-Holstein — passt zum
Wohnsitz in Leck. Der Tastatur-Fokusring (`styles.css:313`) gilt
universell und damit auch für die neuen Links.

**Offen — bewusst nicht selbst entschieden:** Auf dem Anmeldebildschirm
stehen jetzt drei Links untereinander, zwei davon fast gleich benannt:
„Datenschutz" (der alltagssprachliche Hinweis aus 3.0.3) und
„Datenschutzerklärung" (der Rechtstext). Das ist für Fremde verwirrend.
Eine Umbenennung wäre eine Produktentscheidung des Betreibers, keine
Fehlerbehebung — deshalb hier vermerkt statt eigenmächtig geändert. Ein
Vorschlag läge nahe: den Hinweis in „Was wird gespeichert?" umbenennen,
dann sagt jeder der beiden Namen, was dahintersteckt.

**Nächster Schritt:** Unverändert Phase 6 mit dem verschärften
Sicherheits-Durchlauf. Die Browser-Prüfung von heute ist dafür die
Vorlage: erst die echten Header nachstellen, dann messen, nicht lesen.

### 2026-09-13 — Fünfter Fund: nach der Anmeldung unerreichbar (v3.0.12)

**Geändert:** `app.js` (`renderEinstellungen`, Abschnitt „Konto" um die
beiden Links ergänzt), `sw.js`/`CHANGELOG.md` (Version 3.0.12).

**Anlass:** Betreiber hat zum Vergleich zwei Bildschirmfotos einer
fremden App (arabily.app) geschickt – dort liegen Datenschutz und
Impressum im Profilbereich, jederzeit erreichbar. Die Personendaten aus
diesen Fotos (Name, Anschrift, USt-ID einer fremden Person) sind für
dieses Projekt irrelevant und wurden nicht übernommen, nur die Beobachtung
dahinter zählt.

**Der Fund:** Beide neuen Links standen ausschließlich auf dem
Anmeldebildschirm (`renderAuth`). Ein bereits angemeldeter Nutzer hätte
sich erst abmelden müssen, um ans Impressum zu kommen – das verstößt
gegen §5 DDG, der ständige, unmittelbare Erreichbarkeit verlangt, nicht
nur „irgendwo erreichbar vor der Anmeldung". Behoben: dieselben zwei
Links stehen jetzt zusätzlich in `renderEinstellungen()`, direkt unter
„Konto", neben dem bestehenden „Datenschutz"-Hinweis.

**Geprüft, diesmal mit angemeldetem Zustand:** Der Playwright-Testaufbau
wurde um einen echten Login-Fluss erweitert – der Auth-Stub liefert einen
bestätigten Nutzer, der Firestore-Stub beantwortet den
Nutzerdokument-Listener mit „kein Dokument" (führt zu einem frischen,
leeren Konto) und die Sammlungs-Listener mit leeren Listen. So lässt sich
der Einstellungsbildschirm ohne echtes Firebase erreichen und
fotografieren. Ergebnis: beide Links erscheinen, keine Konsolenfehler,
kein CSP-Verstoß.

**Weiterhin unverändert offen:** Die Namensnähe „Datenschutz" /
„Datenschutzerklärung" fällt in den Einstellungen jetzt noch mehr auf,
weil beide Zeilen näher beieinanderstehen als vorher auf dem
Anmeldebildschirm. Der Vorschlag von vorhin (Hinweis in „Was wird
gespeichert?" umbenennen) steht unverändert zur Entscheidung durch den
Betreiber.

**Nächster Schritt:** Unverändert Phase 6, beginnend mit dem verschärften
Sicherheits-Durchlauf.

### 2026-09-13 — Auf Bitte des Betreibers: das ganze Repo geprüft, nicht nur diese Session

**Geändert:** `sw.js` (`APP_SHELL` um `./desktop-icon.png` ergänzt),
Version 3.0.13.

**Anlass:** Betreiber wollte nach den wiederholten Funden nicht nur die
Änderungen dieser Session, sondern das ganze Repo noch einmal
durchgesehen haben. Geprüft wurde breiter als sonst in dieser Phase
üblich — mit der Einschränkung, dass am Lernwerkzeug selbst laut
`../../CLAUDE.md` nichts geändert wird, nur dokumentiert.

**Gefunden und behoben:**

1. **`desktop-icon.png` fehlte in `APP_SHELL`** — seit Phase 1
   (`phase-1-datenzugriff/LOGBUCH.md`, Eintrag „Am Rande aufgefallen")
   bekannt und dort ausdrücklich der „nächsten Änderung, die ohnehin an
   der App arbeitet" übergeben. Diese Session hat fünfmal an der App
   gearbeitet (v3.0.8–3.0.12), ohne das mitzunehmen. Jetzt ergänzt: Die
   Datei wird für den Browser-Tab, die Marke auf dem Ladebildschirm und
   für `manifest.json` gebraucht und ist jetzt auch beim allerersten
   Start ohne Internet da, nicht erst nach dem ersten Online-Besuch.

**Geprüft, bewusst nichts geändert:**

2. **`icon.svg`** wird nirgends außer in `APP_SHELL` referenziert (kein
   `<link>`, kein `manifest.json`-Eintrag). Anders als das in Phase 3
   entfernte `final_icon_glow_v3.png` ist das hier aber kein Zufallsfund,
   sondern die dokumentierte, per Kantenverfolgung aus dem echten
   Marken-Bild nachgebaute Vektor-Vorlage des Icons (Kommentar im File
   selbst: Moore-Neighbor-Tracing, Ramer-Douglas-Peucker, Pixel-Vergleich
   gegengeprüft). Das Löschen einer Design-Quelldatei, nur weil sie
   gerade nicht verlinkt ist, wäre kein Aufräumen mehr, sondern ein
   Eingriff, der nicht verlangt wurde. Bleibt unangetastet.
3. **CSP-Restrisiken durchsucht:** keine `on*="…"`-Attribute, keine
   `javascript:`-Links, keine `<style>`-Blöcke außerhalb der bereits
   behobenen, keine `<form>`-Elemente (also `form-action` wirkungslos,
   aber auch harmlos), keine `fetch()`/`XMLHttpRequest`/`WebSocket`-Aufrufe
   außerhalb dessen, was das Firebase-SDK selbst macht (durch
   `connect-src` bereits abgedeckt), die einzige externe Schrift
   (`verses.quran.foundation`) steckt bereits in `font-src`. Der einzige
   `Blob`/`createObjectURL`-Aufruf (`app.js:2318`, der Sicherungs-Export)
   löst einen Datei-Download über einen synthetischen Klick aus – das
   ist keine von der CSP erfasste Netzanfrage.
4. **`firestore.rules` gegen die tatsächlichen Schreibvorgänge in
   `app.js` gegengelesen:** Die Feldlisten (`nutzerFelder`,
   `bereichFelder`, `kartenFelder`) decken sich mit dem, was `app.js`
   tatsächlich schreibt (`persistAll()`, `patchDoc()`,
   `persistCardGrade()`). Keine Lücke gefunden.
5. **Manifest/Icons gegengeprüft:** `desktop-icon.png` ist tatsächlich
   512×512 wie in `manifest.json` behauptet (per `PIL` nachgemessen) —
   kein Widerspruch. `firebase.json`, `.firebaserc`, `manifest.json`
   syntaktisch gültiges JSON.

**Außerhalb des Auftrags gefunden, nicht behoben — reine Beobachtung am
Lernwerkzeug, das diese Phase nicht anfasst:** In `persistAll()`
(`app.js:1509–1524`, läuft laut eigenem Kommentar nur beim ersten Anlegen
des Nutzerdokuments und bei der einmaligen Datenumzugs-Migration) schreibt
`bereichFelder(b, bi)` zwar auch `gefuehrt`, `satzId` und `satzVersion`
(`app.js:573–575`), aber die Zeile, die tatsächlich in die Datenbank
schreibt (`app.js:1518`), nimmt gezielt nur `{name, order, sets}` heraus –
und `stapel.set(...)` ohne `{merge: true}` ersetzt das ganze
Bereichsdokument. Träfe dieser Pfad einen **bereits bestehenden**
geführten Bereich (`gefuehrt: true`, mit `satzId`/`satzVersion`) statt
eines frischen, würden diese drei Felder in der Datenbank verschwinden.
Nach Lesen der Aufrufstellen (`app.js:1044, 1256, 1486, 6436`) betrifft
das nur Erstanlage und den Fall, dass `updateDoc` ein „not-found" meldet,
also ein zwischenzeitlich verschwundenes Dokument – ein seltener, aber
nicht unmöglicher Pfad (z. B. wenn zwischen zwei Aktionen etwas am
Dokument manipuliert wurde). **Nicht geprüft:** ob das in der Praxis je
aufgetreten ist, und was `normBereiche()` macht, wenn diese Felder beim
nächsten Laden fehlen. Das zu vertiefen wäre bereits ein Eingriff in die
Lernlogik selbst – das bleibt hier stehen, für eine Phase, die das
Lernwerkzeug ausdrücklich anfassen darf, falls es je eine gibt.

**Nächster Schritt:** Unverändert Phase 6, beginnend mit dem verschärften
Sicherheits-Durchlauf.

### 2026-09-13 — Optische Hierarchie korrigiert: Fußnote statt Knopf (v3.0.14)

**Geändert:** `styles.css` (neue Klasse `.rechtsfuss` direkt nach
`.empty__aktionen`), `app.js` (`renderAuth`: „Datenschutz", „Impressum",
„Datenschutzerklärung" zu einer `.rechtsfuss`-Zeile mit
Punkt-Trennzeichen zusammengefasst statt drei einzelne
`.empty__aktionen`-Blöcke; `renderEinstellungen`: die zwei Links am Ende
ebenfalls `.rechtsfuss` statt `.linklike`), `sw.js`/`CHANGELOG.md`
(Version 3.0.14).

**Anlass:** Betreiber wollte nicht nur wissen, *dass* die Links da sind,
sondern *wie* sie wirken — mit dem Vergleich zu professionellen Apps im
Hinterkopf. Berechtigt: `.linklike` gab den drei Rechtstexten dieselbe
Größe (0.8125rem) und Akzentfarbe (`--text-1`/Creme) wie „Passwort
vergessen?" — eine Pflichtangabe stand damit optisch gleichrangig neben
einer echten Bedienhandlung.

**Entscheidung:** Neue Klasse `.rechtsfuss` (in `styles.css` direkt bei
`.empty__aktionen` platziert, mit Kommentar, warum das bewusst **keine**
sechste Knopf-Stufe ist — Abschnitt 6 der Datei legt ausdrücklich fest:
„Fünf Stufen, mehr gibt es nicht"). Merkmale: kleiner (0.75rem, dieselbe
Größe wie andere gedämpfte Nebenangaben im Code, z. B. `.lekt-zahl`),
gedämpfte Farbe (`--text-3` statt Akzent), keine Knopf-Fläche und kein
Hover-Schleier, stattdessen Unterstreichung bei Hover/Fokus als
Klickbarkeits-Hinweis. Auf dem Anmeldebildschirm alle drei Fußnoten
(„Datenschutz", „Impressum", „Datenschutzerklärung") zu einer Zeile mit
`·`-Trennzeichen zusammengefasst, statt sie wie drei einzelne
Bedienschritte untereinanderzustapeln — das entspricht dem Muster, das
der Betreiber am Beispiel einer fremden App gezeigt hatte.

In den Einstellungen bleibt „Datenschutz" als eigene `.liste-zeile` mit
Symbol und Pfeil stehen (nicht Teil dieser Änderung) — das ist dort ein
regulärer Listeneintrag wie „Abmelden", passt also in die dortige
Hierarchie und ist kein Fußnoten-Fall.

**Geprüft im Browser:** CSP weiterhin ohne Verstoß auf allen vier
Seiten/Breiten. Fokuszustand geprüft (`Tab` auf den ersten Fußnoten-Link):
Fokusring erscheint, Unterstreichung greift — Bedienung per Tastatur
bleibt sichtbar.

**Offen:** Nichts Neues. Die schon vorher offene Frage (Umbenennung von
„Datenschutz" in „Was wird gespeichert?") bleibt unverändert beim
Betreiber.

**Nächster Schritt:** Unverändert Phase 6, beginnend mit dem verschärften
Sicherheits-Durchlauf.

### 2026-09-13 — Zwei Datenschutz-Texte zusammengelegt (v3.0.15)

**Geändert:** `datenschutzerklaerung.html` (neuer Abschnitt „Kurz gesagt"
vor den nummerierten Abschnitten, Titel von „Datenschutzerklärung" auf
„Datenschutz" verkürzt), `impressum.html` (Linktext angepasst),
`app.js` (`renderDatenschutz()` und die zugehörigen `ui.datenschutz`-
Zustände, `data-action`-Fälle und Aufrufstellen vollständig entfernt;
`renderAuth()` und `renderEinstellungen()` verweisen jetzt beide mit dem
Wort „Datenschutz" auf `datenschutzerklaerung.html`, statt zusätzlich
einen eigenen In-App-Bildschirm und ein zweites, anders benanntes Ziel
„Datenschutzerklärung" zu zeigen), `styles.css` unverändert (`.rechtsfuss`
bleibt), `sw.js`/`CHANGELOG.md` (Version 3.0.15).

**Anlass:** Betreiber fragte, wofür die Datenschutzerklärung überhaupt
gebraucht wird, wenn er sie „kaum bei anderen bzw. eigentlich arabily"
sieht — verwies auf `arabily.app/datenschutz`, wo es nur einen einzigen
„Datenschutz"-Link gibt, keine zwei verschieden benannten. Berechtigter
Punkt: Diese App hatte tatsächlich zwei Texte mit fast demselben Inhalt
unter zwei verschiedenen Namen — „Datenschutz" (seit v3.0.3, alltags-
sprachlich, nur in der App) und „Datenschutzerklärung" (seit v3.0.9,
vollständiger Rechtstext, als eigene Seite). Das ist reine Verwirrung,
keine Rechtsanforderung — nirgends verlangt die DSGVO oder das DDG zwei
getrennte Texte.

**Entscheidung:** Zusammengelegt, nicht nur umbenannt (Option „nur
umbenennen" wäre die halbe Lösung gewesen, siehe die Frage, die dem
Betreiber vorher gestellt wurde). Der alltagssprachliche Inhalt aus
`renderDatenschutz()` steht jetzt als eigener Abschnitt „Kurz gesagt" am
Anfang von `datenschutzerklaerung.html`, **vor** den förmlichen,
nummerierten Abschnitten — wer nur schnell wissen will, was gespeichert
wird, muss nicht durch 13 Abschnitte scrollen, aber der vollständige
Rechtstext bleibt direkt darunter in derselben Seite. Ergebnis: **ein**
Ziel, überall „Datenschutz" genannt, matcht das Muster von arabily
(„Datenschutz · Impressum" in einer Fußzeile), behält aber zusätzlich die
Verständlichkeit, die der alte In-App-Bildschirm hatte — arabily hat
vermutlich nur den Rechtstext, ohne die alltagssprachliche Fassung davor.

`renderDatenschutz()` komplett entfernt (nicht nur die Aufrufe): der
zugehörige `ui.datenschutz`-Zustand, die render()-Weiche dafür, die
`data-action="datenschutz"`/`"datenschutz-zu"`-Fälle. Kein totes
JavaScript zurückgelassen.

**Geprüft im Browser:** Anmeldebildschirm zeigt jetzt „Datenschutz ·
Impressum" (zwei statt vorher drei Einträge). Einstellungen: die
„Datenschutz"-Listenzeile aus der Konto-Sektion ist weg (dort stehen nur
noch echte Kontoaktionen: Testperson-Zeile, Abmelden, Konto endgültig
löschen), stattdessen dieselbe „Datenschutz · Impressum"-Fußzeile wie auf
dem Anmeldebildschirm, direkt über der Versionsnummer. Beide Links
zeigen auf dieselbe Datei. CSP weiterhin ohne Verstoß (14 statt 13
`.card`-Elemente auf der Datenschutz-Seite, ein neues für „Kurz gesagt").

**Offen:** Nichts Neues.

**Nächster Schritt:** Unverändert Phase 6, beginnend mit dem verschärften
Sicherheits-Durchlauf.
