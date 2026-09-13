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
