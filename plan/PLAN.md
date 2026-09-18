# Gesamtplan: von der Bastel-App zur echten Website

Grundlage: [`../KONZEPT.md`](../KONZEPT.md)
Angelegt: 12. September 2026
Zuletzt geändert: 17. September 2026 (Block 10 verifiziert)

---

## Wie diese Datei zu lesen ist

Die Arbeit läuft über viele getrennte Sessions. Wer neu dazukommt, liest
**diese Datei** und danach **das Logbuch der laufenden Phase** — und weiß dann
ohne Nachfragen, wo aufgehört wurde.

- Die Phasenübersicht unten sagt, **was** wann dran ist und **warum** in dieser
  Reihenfolge.
- Jede Phase hat einen eigenen Ordner mit `AUFTRAG.md` (was getan wird, woran
  die Phase fertig ist) und `LOGBUCH.md` (fortlaufend, was tatsächlich getan
  wurde).
- Phase 0 hat zusätzlich `BEFUND.md` — die Ist-Aufnahme, auf die sich alle
  späteren Phasen berufen.

**Statuswerte einer Phase:** `offen` · `läuft` · `fertig` · `zurückgestellt`

---

## Wo der Code liegt (wichtig für jede neue Session)

Das Konzept nennt in seiner Kopfzeile `Repo user123kkk/adrabic, Ordner
wiederholung/`. Das ist überholt. **Maßgeblich ist `user123kkk/Wiederholung`**
— ein eigenständiges Repo, in dem der Code flach im Wurzelverzeichnis liegt.

Für die Arbeit gilt deshalb: **Repo-Wurzel = der im Konzept gemeinte Ordner
`wiederholung/`.** Alle Pfadangaben in diesen Plandateien sind relativ zur
Repo-Wurzel.

**Geklärt am 12.09.2026 (vormals offene Frage 5).** Beide Repos wurden
verglichen:

| | `user123kkk/Wiederholung` | `user123kkk/adrabic` → `wiederholung/` |
|---|---|---|
| Version | **3.0.3** | 2.21.4 |
| Aufbau | `index.html` + `app.js` + `styles.css` getrennt | alles in einer `index.html` (4645+ Zeilen) |
| Dateien | vollständig inkl. Icons | nur `index.html`, `sw.js`, `manifest.json`, `firestore.rules`, `CHANGELOG.md` |
| Stand | aktuell | Vorgängerfassung |

Der Umbau in 3.0.0 („Codex"-Redesign) hat Gestaltung und Ablauf in eigene
Dateien gezogen und das Projekt in dieses Repo verlegt. **In `adrabic` wird
nicht mehr gearbeitet**; die Kopie dort ist ein Überbleibsel. Damit erklären
sich auch die Abweichungen, die Phase 0 gefunden hat: Das Konzept wurde gegen
2.21.4 geschrieben, geprüft wurde 3.0.3.

Ein Punkt bleibt aus dieser Verlegung offen und ist **Phase 4 zugeordnet, nicht
jetzt zu ändern**: `manifest.json` trägt weiterhin `"id": "/adrabic/wiederholung/"`.
Das ist kein Fehler — die `id` muss nur eine dauerhaft gleiche Zeichenkette
sein, kein echter Pfad, und genau deshalb hält sie die Identität bereits
installierter Apps zusammen. Wer sie ändert, für den gilt die App als **neue**
App: Installationen auf den Geräten der drei Nutzer würden doppelt erscheinen.
Die Entscheidung gehört zur Hosting-Frage und damit in Phase 4.

Ebenfalls abweichend: Das Konzept spricht von Version 2.21.x, im Repo steht
`APP_VERSION = "3.0.3"` (`app.js:19`). Nach Abschnitt 3 des Konzepts ist **der
Code maßgeblich**, nicht das ältere Dokument. Wo die Erst-Einschätzungen des
Konzepts vom Code abweichen, gewinnt der Code; die Abweichung wird in
`phase-0-bestand/BEFUND.md` festgehalten statt stillschweigend korrigiert.

---

## Phasenübersicht

| Phase | Inhalt | Status | Ordner |
|---|---|---|---|
| **0** | Ist-Aufnahme: jeder Punkt aus Konzept-Abschnitt 4 bekommt einen Status am Code | `fertig` → [`BEFUND.md`](phase-0-bestand/BEFUND.md) | [`phase-0-bestand/`](phase-0-bestand/) |
| **1** | Datenzugriff härten: `firestore.rules` Feld für Feld, Feld-Manipulation, Import-Prüfung, XSS | `fertig` | [`phase-1-datenzugriff/`](phase-1-datenzugriff/) |
| **2** | Konto-Lebenszyklus: Registrierung, Bestätigung, Passwort zurücksetzen, Konto löschen | `fertig` | [`phase-2-konto/`](phase-2-konto/) |
| **3** | Hygiene: Git-Historie, Key-Einschränkung, Debug-Reste, Abhängigkeiten | `fertig` | [`phase-3-hygiene/`](phase-3-hygiene/) |
| **4** | Domain und Hosting, danach Security-Header und HTTPS-Feinheiten | `fertig` | [`phase-4-domain-hosting/`](phase-4-domain-hosting/) |
| **5** | Recht: Impressum, Datenschutzerklärung, Cookie-Frage | `fertig` | [`phase-5-recht/`](phase-5-recht/) |
| **6** | Öffentliche Startseite: Problem → Lösung → Handlungsaufruf, getrennt von der App | `fertig` | [`phase-6-startseite/`](phase-6-startseite/) |
| **7** | SEO: Search Console, `robots.txt`, Sitemap, FAQ | `fertig` | [`phase-7-seo/`](phase-7-seo/) |
| **8** | Rückmeldung: Kontakt- und Fehlerformular | `fertig` | [`phase-8-rueckmeldung/`](phase-8-rueckmeldung/) |
| **9** | Barrierefreiheit als eigener Durchgang | `fertig` | [`phase-9-barrierefreiheit/`](phase-9-barrierefreiheit/) |

Die Folge entspricht dem Vorschlag aus Konzept-Abschnitt 5. Es gibt keinen
Grund, davon abzuweichen — die Begründung dort trägt, und sie ist unten je
Phase noch einmal ausgeschrieben.

### Nebenstrang: Landing-Page-Strategie

Kein Phasen-Ordner, keine Nummer — deshalb steht er nicht in der Tabelle
oben. Die Startseite selbst ist in Phase 6 **gebaut** und `fertig`; der
Ordner [`landing-page-strategie/`](landing-page-strategie/) klärt, was sie
**sagt**. Reihenfolge dort: Befund → Strategie → erst dann HTML.

Status: `läuft` — [`STRATEGIE.md`](landing-page-strategie/STRATEGIE.md)
steht seit dem 13.09.2026, aber **zweigeteilt**: Kern-Message, tragende
Belege, Funnel und Seitenstruktur sind fertig und hängen an keiner Antwort
mehr; Headline und Keywords liegen als **drei fertige Fassungen** vor, je
eine pro möglicher Ausrichtung. Zum Weiterarbeiten fehlen **drei
Entscheidungen** des Betreibers (`STRATEGIE.md` 2.1, 2.2, 2.3): womit ein
Neuer ohne Kartensatz anfängt · eng oder weit ausgerichtet · die unbelegte
Behauptung „wissenschaftlich bewährt" ersetzen. Solange die fehlen, wird
`landing.html` nicht umgebaut.

### Nebenstrang: Oberfläche & Mobile-Gestalt

Kein Phasen-Ordner, keine Nummer. Ordner
[`redesign-oberflaeche/`](redesign-oberflaeche/). Gestaltet die **Außenseite**
neu — App-Optik **und** `landing.html`, mobil-first — aus einem Guss statt
gewachsen. Aufgekommen aus drei Videos des Betreibers (Mobile-UI, Wachstum,
UX-Psychologie); die Ratschläge sind in
[`PRINZIPIEN.md`](redesign-oberflaeche/PRINZIPIEN.md) gegen `KONZEPT.md` §7 und
die bestehende Gestalt **gefiltert**, nicht gesammelt. **Umgesetzt wird direkt im
Code**, in fünf Blöcken mit Zwischenstand nach jedem — Fundament → Startbildschirm
→ Bühne/Bewertung → `landing.html` → Erststart; die Liste mit Status steht in
[`AUFTRAG.md`](redesign-oberflaeche/AUFTRAG.md). Der ursprünglich vorgesehene
Umweg über Claude Design ist auf Betreiber-Entscheidung übersprungen (16.09.);
die beiden Dateien dazu sind am 17.09. entfernt worden, nachdem die
Design-Entscheidungen in `styles.css` und `README.md` stehen. Geprüft wird an
[`stilprobe.html`](redesign-oberflaeche/stilprobe.html) — ohne sie kommt niemand
ohne Firebase-Anmeldung an der Oberfläche vorbei.
Status: **Blöcke 1–10 fertig** (v3.1.0–3.4.3), alle am echten Handy
verifiziert. Blöcke 8–10 kamen am 17.09.2026 aus der Bildersammlung des
Betreibers (108 Bilder, alle einzeln geprüft in
[`BILDER-BEFUND.md`](redesign-oberflaeche/BILDER-BEFUND.md)). Der Strang
ruht, bis eine neue Schwachstelle genannt wird oder offene Fragen 12/13
entschieden sind.
**Umfang lockert `KONZEPT.md` §7 bewusst** — siehe offene Frage 6 unten.

### Nebenstrang: Monetarisierung & Wachstum (Gerüst)

Kein Phasen-Ordner, keine Nummer. Ordner
[`monetarisierung/`](monetarisierung/). **Es wird nichts gebaut** — nur ein
Gerüst, damit Geld/Wachstum einen festen Platz haben und nicht jede Session neu
durchdacht werden (Betreiber-Wunsch). Struktur, Entscheidungspunkte und offene
Fragen in [`GERUEST.md`](monetarisierung/GERUEST.md). Deckt `KONZEPT.md` §2
(„Abo/Bezahlung — später, nicht verbauen"). Status: `zurückgestellt` — ruht,
bis der Betreiber ihn ausdrücklich startet; die Grundfrage „soll überhaupt Geld
fließen" ist heute im `KONZEPT.md` §1 mit „kein Geldfluss" beantwortet.

### Warum diese Reihenfolge

Der Leitsatz aus Konzept-Abschnitt 5: **erst dichtmachen, was schon Daten hält
— dann öffnen.**

- **0 vor allem anderen.** Ohne Befund ist jeder Plan geraten. Die
  Erst-Einschätzungen im Konzept sind ausdrücklich Vermutungen; sie am Code zu
  prüfen ist die Voraussetzung dafür, dass die Phasen 1–3 überhaupt den
  richtigen Umfang haben. Phase 0 ändert deshalb **keinen Produktivcode**.
- **1 vor 2.** Die Firestore-Regeln sind das Einzige, was heute wirklich Daten
  schützt. Phase 2 schreibt und löscht Daten — das sollte gegen bereits
  gehärtete Regeln laufen, nicht umgekehrt.
- **2 vor 5.** „Konto löschen" ist die technische Voraussetzung für die
  Auskunfts- und Löschpflicht in der Datenschutzerklärung. Ein Rechtstext, der
  etwas verspricht, was die App nicht kann, ist schlimmer als keiner.
- **3 vor 4.** Die Einschränkung des API-Keys in der Google-Cloud-Konsole
  braucht die Domain aus Phase 4 als Wert — aber die Git-Historie und die
  Debug-Reste sind davon unabhängig und vorher erledigt. Der Teil von Phase 3,
  der die Domain braucht, wird ausdrücklich an Phase 4 übergeben.
- **4 vor 5, 6, 7.** Security-Header hängen am Hosting, der Rechtstext hängt an
  der öffentlichen Adresse, die Startseite und SEO hängen an der Domain.
  Vorher gebaut, wird alles davon zweimal gebaut.
- **6 vor 7.** SEO ohne Seite, die gefunden werden kann, ist sinnlos.
- **8 nach 6.** Ein Formular wird erst nötig, wenn Fremde die Seite nutzen —
  und Fremde kommen erst über die öffentliche Startseite.
- **9 zuletzt, aber nicht „irgendwann".** Barrierefreiheit ist ein eigener
  Durchgang über den dann endgültigen Bestand. Was in den Phasen davor ohnehin
  angefasst wird (Icon-Umbau, neue Startseite), wird dort schon richtig
  gemacht, statt es hier nachzuziehen.

### Später — vermerkt, damit nichts verbaut wird

Kein eigener Ordner, keine Phase. Aus Konzept-Abschnitt 2 und 5:

- eigene Domain-Erweiterung über Phase 4 hinaus, Datenbank-Upgrade
- Abo / Bezahlfunktion
- App Check (Bot-Schutz) — relevant, sobald die Seite öffentlich beworben wird
- App Store und Play Store
- **Lehrer- und Schülermodus mit Klassenräumen.** Idee des Betreibers vom
  13.09.2026, aufgekommen bei der Frage „womit fängt ein Neuer an": Die App
  in zwei Rollen aufteilen — ein Lehrer legt Kartensätze an und gibt sie
  seinen Schülern in einem Klassenraum weiter. Der Betreiber kennt Leute mit
  Schülern, für die das passen würde.

  **Wird jetzt nicht gebaut, und zwar aus vier Gründen, die zusammengehören:**
  1. Es fasst das **Lernwerkzeug** an — Konzept-Abschnitt 7 und `../CLAUDE.md`
     schließen das für alle laufenden Phasen aus.
  2. Es ist **keine Antwort auf die Landing-Page-Frage**. Die lautet: Was
     findet jemand vor, der **heute** über ein Video kommt und sich
     registriert? Bis zu einem Lehrermodus vergehen Monate.
  3. **Klassenräume heißen: Daten von Schülern**, also in aller Regel von
     Minderjährigen, und zwar über den eigenen Kontostand hinaus sichtbar für
     eine dritte Person (den Lehrer). Das ist eine andere Größenordnung als
     alles, was Phase 5 abgedeckt hat — Einwilligung der Eltern,
     Auftragsverarbeitung, Löschkonzept. Im Impressum haftet der Vater.
  4. Es braucht **neue Firestore-Regeln**: Heute liest und schreibt jedes
     Konto ausschließlich unter sich selbst. Geteilte Klassenräume brechen
     genau diese Annahme auf — das ist Phase 1 noch einmal, nicht ein
     Zusatzfeld.

  **Was davon heute schon geht, ohne eine Zeile Code:** Kartensätze weitergeben
  kann die App bereits (`data-action="export-weitergabe"`) — als Datei, ohne
  Klassenraum. Ein Lehrer kann damit heute einen Satz bauen und ihn
  herumgeben. Wer die Idee ausprobieren will, probiert sie so aus, bevor
  irgendetwas gebaut wird.

- **Erneuter, verschärfter Sicherheits-Durchlauf vor Phase 6 (Öffentlich-
  machung).** Grund, festgehalten am 13.09.2026: Im Impressum steht der
  Vater des tatsächlichen Betreibers (16) als Verantwortlicher — er trägt
  damit die formale Haftung für das, was auf der Seite passiert. Der
  Betreiber hat ausdrücklich gebeten, das vor der Öffentlichmachung noch
  einmal zu verschärfen, nicht nur den Stand aus Phase 1 (der deckte nur
  Firestore-Regeln, Feld-Manipulation, Import, XSS ab) fortzuschreiben.
  Bevor Phase 6 beginnt: Bestand seit Phase 1 erneut prüfen (Abhängigkeiten
  aktuell? neue Firebase-Advisories? Rate-Limits auf Auth-Endpunkte
  sinnvoll, jetzt wo Fremde registrieren können? App Check aus dieser
  Liste hier gehört in denselben Schritt), Ergebnis im Logbuch von Phase 6
  vor dem eigentlichen Bau der Startseite festhalten.

Diese Punkte werden in keiner Phase gebaut — außer dem neuen Sicherheits-
Punkt, der ausdrücklich vor Phase 6 einzuplanen ist. Die übrigen stehen
hier, damit keine Entscheidung getroffen wird, die sie später unmöglich
macht.

- **Sechzehn Beobachtungen am Lernwerkzeug aus einer Nutzungssitzung des
  Betreibers (15.09.2026)** — festgehalten in
  [`beobachtungen-lernwerkzeug.md`](beobachtungen-lernwerkzeug.md): u. a.
  Detailansicht für Karten in der Verwalten-Liste, versehentliches
  Verschieben beim Scrollen, verlorene Scroll-Position nach dem Bearbeiten,
  ungewollter Autofokus auf die Tastatur, ein iPad-Layout-Fehler bei
  Lernen/Üben, verlorene Notiz-Formatierung beim Anzeigen, Over-Scrolling,
  Bildschirm-Verschiebungen beim Scrollen und Speichern, Browser-Zurück-Fehler
  zwischen App und statischen Seiten, und weitere. Jeder Punkt trägt eine
  fachliche Einschätzung, aber **keine Entscheidung** — das betrifft
  ausschließlich das Lernwerkzeug selbst, das laut Abschnitt „Was in keiner
  Phase passiert" (Punkt 1) in keiner laufenden Phase angefasst wird. Ob und
  wie viel davon gebaut wird, entscheidet der Betreiber; erst danach wird
  ggf. eine eigene Phase dafür angelegt.

---

## Was in keiner Phase passiert

Aus Konzept-Abschnitt 7, gilt durchgehend:

1. **Keine Funktion des Lernwerkzeugs anfassen.** Es geht um Fundament, Recht
   und Außenseite, nicht um die App selbst.
2. **Nichts wieder einbauen, was bewusst entfernt wurde.** Der Code ist
   maßgeblich, nicht ältere Dokumente.
3. **Kein Punkt wird abgearbeitet, nur weil er in einer Liste stand.** Trifft
   ein Punkt nicht zu, wird das mit Begründung aufgeschrieben — nicht künstlich
   erfüllt und nicht weggelassen.
4. **Keine Phase wird übersprungen, weil sie klein aussieht.** Auch „trifft
   nicht zu" kommt ins Logbuch, sonst prüft die nächste Session es erneut.

---

## Offene Fragen — vom Menschen zu entscheiden, nicht vom Agenten

Die Fragen 1–4 stehen wörtlich in Konzept-Abschnitt 6. Frage 5 kam bei der
Ist-Aufnahme dazu. Solange eine Frage offen ist, wird die Phase, die daran
hängt, nicht begonnen.

| Nr. | Frage | Blockiert |
|---|---|---|
| ~~1~~ | ~~Domainname und Hosting — bleibt es GitHub Pages oder wird es Firebase Hosting / Netlify / Vercel?~~ | **erledigt 12.09.2026** — siehe unten |
| ~~2~~ | ~~Heißt die öffentliche Seite anders als das Tool, oder liegt beides auf einer Domain?~~ | **erledigt 12.09.2026** — siehe unten |
| ~~3~~ | ~~Wird die Datenschutzerklärung selbst geschrieben oder über einen Generator erzeugt?~~ | **erledigt 12.09.2026** — siehe unten |
| ~~4~~ | ~~Soll der Weitergabe-Kartensatz (Medina Buch 1) Teil der öffentlichen Seite werden oder privat unter Brüdern bleiben?~~ | **erledigt 12.09.2026** — siehe unten |
| ~~5~~ | ~~Welches Repo ist maßgeblich?~~ | **erledigt 12.09.2026** — siehe „Wo der Code liegt" oben |
| 6 | Gilt `KONZEPT.md` §7 („App-Funktionen nicht anfassen") weiter, oder darf der Redesign auch die Bedienung ändern? | für Strang `redesign-oberflaeche` **gelockert** (16.09.2026); §7 dauerhaft anpassen bleibt offen — siehe unten |
| ~~12~~ | ~~Farben: Hintergrund heller, Knopf-Hover kein reines Weiß mehr?~~ | **erledigt 17.09.2026 (v3.4.4)** — siehe unten |
| ~~13~~ | ~~Anmelden mit Google (oder Apple)?~~ | **erledigt 17.09.2026** — siehe unten |

**Geklärt am 12.09.2026 (vormals offene Frage 1).** Entscheidung des
Betreibers: **Firebase Hosting**, nicht GitHub Pages, nicht Netlify/Vercel —
naheliegend, da Firebase für Auth und Datenbank ohnehin schon läuft. **Noch
keine eigene Domain** — läuft vorerst auf der von Firebase vergebenen Adresse
(`lernkarte-925c2.web.app` bzw. `.firebaseapp.com`), eine eigene Domain ist
für später vorgemerkt, kein Blocker. Damit ist Phase 4 unblockiert; Details
und offene Ausführungsschritte stehen in
[`phase-4-domain-hosting/LOGBUCH.md`](phase-4-domain-hosting/LOGBUCH.md).

**Korrektur 12.09.2026:** Die Formulierung „nicht GitHub Pages" beruhte auf
einer falschen Annahme — die drei Nutzer:innen liefen tatsächlich auf
**Vercel** (`adrabic-wiederholung.vercel.app`), nicht auf GitHub Pages. Die
Entscheidung selbst (Firebase Hosting statt Vercel/Netlify/GitHub Pages)
bleibt unverändert gültig, nur die bisherige Live-Adresse war eine andere
als angenommen. Siehe `phase-4-domain-hosting/LOGBUCH.md` für Details.

**Geklärt am 12.09.2026 (vormals offene Frage 2).** Frage war zu abstrakt
gestellt und musste dem Betreiber konkret vorgelegt werden: Wer über
Google auf die Seite kommt, sieht **erst eine Werbe-/Erklärseite**
(Problem → Lösung → Handlungsaufruf, siehe Konzept-Abschnitt 4.7), und
erst von dort aus geht es zum Login/Registrieren des Tools. Beides liegt
auf **einer** Domain (`lernkarte-925c2.web.app` bzw. später die eigene
Domain) — keine zweite, eigens benannte Marketing-Domain. Damit ist Phase
6 in diesem Punkt unblockiert.

**Geklärt am 12.09.2026 (vormals offene Frage 3).** Weder reiner
Generator-Text noch komplett freier eigener Text: Die Datenschutzerklärung
wird **selbst geschrieben, aber nach dem Aufbau, den ein Generator auch
verlangen würde** (Verantwortlicher, welche Daten, Firebase als
Auftragsverarbeiter, Rechte der Nutzer:innen, keine Tracking-Cookies) —
zugeschnitten auf das, was die App tatsächlich tut, statt generischer
Textbausteine. Damit ist Phase 5 in diesem Punkt unblockiert.

**Geklärt am 12.09.2026 (vormals offene Frage 4).** Der
Weitergabe-Kartensatz (Medina Buch 1) bleibt **privat unter Brüdern** —
kein Teil der öffentlichen Seite. Ändert weder die Startseite (Phase 6)
noch die Rechtstexte (Phase 5) — beide behandeln nur das, was öffentlich
zugänglich ist.

**Teil-geklärt am 16.09.2026 (Frage 6).** `KONZEPT.md` §7 sagt: „Keine
Funktionen des Tools anfassen." Für den Redesign-Strang
(`redesign-oberflaeche`) hat der Betreiber diese Grenze **bewusst gelockert**:
Aussehen der App **und** Startseite dürfen neu, und auch Bedienung/Navigation
darf angefasst werden — **Bedingung:** es bleibt im Rahmen der bestehenden
ruhigen Gestalt, kein generischer KI-Template-Look. Die **Lernlogik** bleibt
trotzdem unangetastet (harte Grenze, siehe `redesign-oberflaeche/AUFTRAG.md`).
Was **nicht** entschieden ist: ob §7 dauerhaft so bleibt oder umgeschrieben
wird. `KONZEPT.md` wird **nicht** eigenmächtig geändert — das ist Betreiber-Sache.
Bis dahin gilt die Lockerung nur für diesen einen Strang.

**Neu am 17.09.2026 (Fragen 12 und 13).** Beide kommen aus der Bildersammlung
(`redesign-oberflaeche/BILDER-BEFUND.md`, Bild 22, 27, 68). Hinweis zu den
Nummern: 7–11 sind in dieser Tabelle nicht vergeben; die Nummern 12 und 13 sind
gewählt, damit sie mit keiner Frage aus anderen Plandateien verwechselt werden.
Zu 12 aus dem Befund: Die Schrift ist schon gedämpft (`#f5f3ec`, nicht reines
Weiß). Betroffen wären nur `--ink-900` (`styles.css:71`) und `--accent-hover`
(`styles.css:120`). Das ändert das Markenbild — deshalb Betreiber-Sache.

**Geklärt am 17.09.2026 (Frage 12, v3.4.4).** Betreiber: „ja fürs erste."
`--ink-900` (dunkler Hintergrund) von `#08080a` auf `#0e0e12` aufgehellt —
ein spürbarer, aber bewusst kleiner Schritt, „Creme auf Fast-Schwarz" bleibt
als Marke erkennbar. `--accent-hover` ist kein fester Hex-Wert `#ffffff`
mehr, sondern `color-mix(in srgb, var(--accent) 85%, white 15%)` — eine
leichte Aufhellung des jeweils geltenden Akzents statt eines Sprungs auf
reines Weiß, und dadurch automatisch auch im hellen Thema richtig (dort
sprang der Knopf-Hover vorher unbemerkt auf reines Weiß, obwohl der Knopf
dort dunkel ist — ein Nebenbefund, kein eigener Auftrag). Im Browser mit
`getComputedStyle` geprüft: Hover-Hintergrund liegt bei ca. `rgb(246,245,239)`,
nicht bei `rgb(255,255,255)`.

**Geklärt am 17.09.2026 (Frage 13, v3.4.6).** Betreiber: „google und ja"
(Google und Apple, umsetzen). Anmeldebildschirm hat jetzt zusätzlich zu
E-Mail/Passwort einen Knopf „Mit Google anmelden" über
Firebase-Authentication-Popup, dieselbe Datenbank und dieselben
Zugriffsregeln wie bisher. Details siehe
[`redesign-oberflaeche/LOGBUCH.md`](redesign-oberflaeche/LOGBUCH.md),
Einträge vom 17. und 18.09.2026, und `CHANGELOG.md` ab 3.4.6.

**Google-Login seit 18.09.2026 (v3.4.10/3.4.11) am echten Gerät bestätigt
funktionierend.** Bis dahin brauchte es drei Nachbesserungen, alle in der
Content-Security-Policy aus Phase 4 (`firebase.json`), die vor dem
Popup-Login gebaut wurde und dafür zu eng war: fehlendes `frame-src` fürs
Firebase-Auth-Iframe, fehlendes `apis.google.com` fürs Google-API-Skript,
und — die eigentliche Ursache für die anhaltende Fehlermeldung trotz
korrigierter Regel — bereits cachende Browser aktualisierten die
gespeicherte CSP wegen unveränderter Datei-Fingerabdrücke (ETags) nicht,
siehe `phase-4-domain-hosting/LOGBUCH.md`, Eintrag 18.09.2026.

**Apple bleibt zurückgestellt, Knopf seit v3.4.11 ausgeblendet** (Flag
`APPLE_LOGIN_BEREIT` in `app.js`) – Apple braucht zusätzlich ein
kostenpflichtiges Apple-Developer-Konto (99$/Jahr), das der Betreiber noch
nicht eingerichtet hat. Code ist fertig, nur nicht sichtbar/aktiv.

Die Phasen 0–6 hängen an keiner offenen Frage mehr und können durchgearbeitet
werden.

---

## Wie hier gearbeitet und veröffentlicht wird

Festgelegt vom Betreiber am 12.09.2026:

- **Direkt auf `main`, ohne Pull Request.** Committen, pushen, fertig. Kein
  Branch, kein PR, keine Rückfrage vor dem Veröffentlichen.
- Bei Änderungen **an der App** zusätzlich die Veröffentlichungsliste aus
  `../README.md` abarbeiten (`APP_VERSION`, `CACHE_NAME`, `APP_SHELL`,
  `CHANGELOG.md`). Für reine Plandateien entfällt sie.
- Eine neue Session findet den Einstieg über `../CLAUDE.md`, das auf diese
  Datei verweist.

---

## Statusverlauf

| Datum | Ereignis |
|---|---|
| 2026-09-12 | Plan und Ordnerstruktur für alle Phasen angelegt, Plan selbst gegengeprüft. |
| 2026-09-12 | **Phase 0 fertig.** Alle 50 Punkte aus Konzept-Abschnitt 4 mit Status und Beleg am Code: 10 × `✅`, 13 × `🔧`, 16 × `⏳`, 11 × `➖`. Kein Produktivcode geändert. |
| 2026-09-12 | **Phase 1 begonnen, drei von vier Punkten erledigt** (Version 3.0.4). `firestore.rules` prüft jetzt auch, *was* geschrieben wird — Feldliste, Art und Grenzen je Dokument, nur noch die zwei Sammlungen, die die App benutzt. Mit dem Firestore-Emulator geprüft: 62 Fälle (31 × normaler Betrieb, 31 × Missbrauch), alle wie erwartet. Dazu Textgrenzen für Wort/Übersetzung/Notiz und eine Vorprüfung des Imports (Größe, Struktur, Anzahl). XSS lückenlos durchgeprüft: **keine Lücke**, nichts zu ändern. |
| 2026-09-12 | **Phase 1 fertig.** Regeln in Firebase-Konsole eingespielt, Tests erfolgreich (Karte erstellen/bewerten/bearbeiten, Bereich umbenennen, Import). Abschließender Sicherheits-Durchlauf bestätigt. Weiter mit Phase 2. |
| 2026-09-12 | **Phase 2 fertig.** Konto löschen gebaut (v3.0.5), ein Fehler im ersten Testlauf gefunden und behoben (v3.0.6 — die App legte das gerade gelöschte Nutzerdokument automatisch wieder an), am zweiten Testlauf bestätigt: Auth und Firestore beide nachweislich leer. Durchklick-Test (Registrieren, Bestätigung, Anmelden, Passwort zurücksetzen) ebenfalls durchgeführt. Weiter mit Phase 3. |
| 2026-09-12 | **Phase 3 fertig** (v3.0.7). Git-Historie und Debug-Reste waren bereits in Phase 0 sauber (kein Fund, hier nicht erneut gesucht). `final_icon_glow_v3.png` (147 KB, nie zur Laufzeit geladen) aus dem Repo entfernt. Firebase-SDK von 10.12.2 auf 10.14.1 gehoben — den letzten Patch-Stand innerhalb derselben Hauptversion; der Sprung auf Hauptversion 12 wird bewusst nicht gemacht (eigenes Migrationsprojekt, sprengt den Rahmen „klein, einmalig"). Key-Einschränkung bleibt wie vorgesehen an Phase 4 übergeben. Weiter mit Phase 4 — dort blockiert offene Frage 1. |
| 2026-09-12 | **Offene Frage 1 geklärt:** Firebase Hosting, keine eigene Domain vorerst. Phase 4 damit unblockiert; **Phase 4 begonnen** — Hosting-Konfiguration (`firebase.json`, `.firebaserc`) im Repo vorbereitet, das eigentliche Einrichten und Deployen braucht Zugang zur Firebase-Konsole und ist an den Betreiber übergeben. Siehe `phase-4-domain-hosting/LOGBUCH.md`. |
| 2026-09-12 | **Phase 4 fertig.** Firebase Hosting eingerichtet und live (`lernkarte-925c2.web.app`), API-Key auf die genutzten Domains eingeschränkt (dabei ein Missbrauchsfund mit unbeschränktem Key entdeckt und behoben), Security-Header inklusive scharf geschalteter CSP gesetzt und vom Betreiber im Testlauf bestätigt (Login, Karten, Import, Hell/Dunkel — keine Auffälligkeiten). Eigene Domain bleibt wie entschieden „später". Weiter mit Phase 5 — dort blockiert offene Frage 3. |
| 2026-09-12 | **Offene Fragen 2, 3, 4 geklärt** (Betreiber): eine Domain für Werbeseite und Tool, Datenschutzerklärung selbst geschrieben nach Generator-Aufbau, Medina-Kartensatz bleibt privat. Phasen 5 und 6 damit formal unblockiert. **Phase 5 begonnen** (v3.0.8): veralteten Datenschutz-Hinweis korrigiert (Konto-Löschung beschrieb noch den alten Weg vor Phase 2). Offen: Impressum-Angaben (Name, Anschrift, Kontakt) vom Betreiber, danach `impressum.html`/`datenschutz.html` bauen. Phase 6 bewusst noch nicht begonnen, da Reihenfolge 5 vor 6 gilt. |
| 2026-09-13 | Klärung der Impressum-Person: tatsächlicher Betreiber ist 16, im Gespräch zunächst unter eigenem Namen geplant, dann auf **den Vater (Nauroz Masjeedi)** als im Impressum genannte Person geändert — löst Geschäftsfähigkeits- und Adress-Sichtbarkeits-Thema in einem Schritt. Deshalb zusätzlich als „Später"-Punkt festgehalten: ein erneuter, verschärfter Sicherheits-Durchlauf vor Phase 6, weil der Vater jetzt die formale Haftung trägt (siehe Abschnitt „Später" und `phase-6-startseite/AUFTRAG.md`). |
| 2026-09-13 | **Phase 5 fertig** (v3.0.9). `impressum.html` und `datenschutzerklaerung.html` gebaut mit den Angaben des Vaters, vom Login-Bildschirm verlinkt. Cookie-Prüfung: keine nicht-notwendigen Cookies, kein Banner nötig. Impressum bewusst ohne Steuernummer/Handelsregister (nicht-gewerblich). Weiter mit Phase 6 — dort steht laut Auftrag zuerst der verschärfte Sicherheits-Durchlauf an. |
| 2026-09-13 | **Verschärfter Sicherheits-Durchlauf vor Phase 6 durchgeführt.** Überprüft: Firebase SDK 10.14.1 (aktuell, keine kritischen Advisories), CSP scharf gesetzt (Phase 4), Firestore-Regeln gehärtet (Phase 1), XSS durchgeprüft (Phase 1), HTTPS mit HSTS (Phase 4). Rate-Limiting und App Check bewusst nicht aktiviert — gehören zu späteren Entscheidungen. Alles, was die App kontrolliert, ist sicher. Ergebnis ins `phase-6-startseite/LOGBUCH.md` eingetragen. |
| 2026-09-13 | **Phase 6 begonnen und fertig** (v3.0.17). `landing.html` gebaut — öffentliche Startseite zeigt Problem (Vokabeln vergessen) → Lösung (wissenschaftliche Wiederholungen) → Handlungsaufruf (Jetzt anfangen) → Login/App. Sauber getrennt: kein Login-Formular auf der Startseite, nur Link zur App. `firebase.json` rewrite-Regel für `/` → `landing.html`, `sw.js` und `APP_VERSION` gehoben auf 3.0.17. Barrierefreiheit: semantisches HTML, Fokus-Styles, Contrast-Ratios geprüft (text-1: 18:1, text-2: 7.65:1, alle über WCAG AA). Tastatur-Navigation funktioniert. Alle Prüfpunkte aus `AUFTRAG.md` erfüllt. |
| 2026-09-13 | **Phase 7 begonnen, Code-Teil fertig** (v3.0.18). `robots.txt`/`sitemap.xml` schließen `/index.html` (Login/App) von der Indexierung aus, zusätzlich `<meta name="robots" content="noindex, nofollow">` dort gesetzt. Kanonische URL, Open-Graph-Angaben je öffentlicher Seite (`landing.html`, `impressum.html`, `datenschutzerklaerung.html`). FAQ-Bereich mit fünf echten Fragen auf der Startseite plus `FAQPage`-JSON-LD. Search Console kann kein Agent einrichten — Phase bleibt auf `läuft`, bis der Betreiber das erledigt hat. Details in `phase-7-seo/LOGBUCH.md`. |
| 2026-09-13 | **Phase 7 fertig.** Firebase-Caching-Problem mit HTML-Dateien identifiziert und gelöst (Cache-Control-Header mit `max-age=0` in `firebase.json`). Google Search Console Verifikation erfolgreich durchgeführt (HTML-Tag erkannt, Inhaberschaft bestätigt). `sitemap.xml` eingereicht und akzeptiert. Alle Punkte aus `phase-7-seo/AUFTRAG.md` abgehakt. Weiter mit Phase 8. |
| 2026-09-13 | **Landing-Page-Strategie: Befund vorausgefüllt** (v3.0.19). `landing-page-strategie/BEFUND.md` war leer und sperrte damit die gesamte Strategiearbeit. Jede Frage trägt jetzt einen Zustand: belegt (mit Quelle im Code/Plan), Vermutung, oder offen. Abschnitt 3.1 listet vollständig, was die App wirklich kann — mit Zeilennummern, damit die spätere Seite nichts verspricht, was der Code nicht tut. Drei Widersprüche festgehalten: „wissenschaftlich bewährt" ist unbelegt (haftungsrelevant, weil der Vater im Impressum steht), Medina Buch 1 ist privat (Neue finden also ein leeres Werkzeug), außen „Adrabic" vs. innen „Wiederholung". Es fehlen noch sechs Antworten des Betreibers. Zusätzlich ein grammatisch kaputter Satz auf der Live-Startseite behoben (`landing.html:286`) — nur der Satz, kein Umbau. |
| 2026-09-13 | **Landing-Page-Strategie: `STRATEGIE.md` gebaut**, zweigeteilt. Fest und unabhängig von offenen Fragen: Kern-Message „Mechanik statt Versprechen" (die Stufenleiter aus dem Code ersetzt die unbelegte Behauptung „wissenschaftlich bewährt"), die drei tragenden Belege (Handschrift-Feld, Lektionen, die nacheinander aufgehen, drei Bewertungen statt zwei), der Funnel und seine Bruchstelle (wer sich registriert, steht vor einem leeren Werkzeug — größter Hebel der ganzen Seite, kein Textproblem), die Seitenstruktur in zwölf Blöcken und die Änderungsliste gegen den heutigen Stand. Abhängig von Entscheidungen und deshalb als **drei fertige Fassungen** hinterlegt: Headline, Handlungsaufruf, Seitentitel, Beschreibung. Keywords als gekennzeichnete Hypothese mit Negativliste und Prüfweg über die Search Console. Kein Produktivcode geändert; der Befund kam unausgefüllt zurück und wurde bewusst nicht vom Agenten ausgefüllt. |
| 2026-09-13 | **Zwei der drei Entscheidungen getroffen** (v3.0.20). *Eng anfangen, weit anlegen* — „Arabisch" gehört sichtbar nach oben. *„Wissenschaftlich bewährt" ersetzen statt belegen* — am selben Tag ausgeführt: Lösungskasten zeigt jetzt die Stufenleiter statt einer Wirkungsbehauptung, das Kästchen „Wissenschaftlich" ist durch „Mitschreiben" (Handschrift-Feld) ersetzt, Meta- und OG-Beschreibung ohne „wissenschaftlich bewährt" und erstmals mit dem Wort „arabische". Dazu ein Darstellungsfehler behoben (`color-scheme` stand fest auf `dark`). Headline, Handlungsaufruf und Aufbau **unverändert** — sie hängen an der einen noch offenen Entscheidung. Die Antwort auf „womit fängt ein Neuer an" war eine Produktidee (Lehrer-/Schülermodus mit Klassenräumen); sie steht jetzt unter „Später" mit ihren vier Gründen gegen ein Bauen jetzt und ist ausdrücklich **keine** Antwort auf die Landing-Page-Frage. |
| 2026-09-13 | **Entscheidung 2.1 = B, Startseite umgebaut** (v3.0.21). `start-kartensatz.json` neu: 50 Karten in fünf Lektionen (Pronomen · Menschen · Dinge und Orte · Wörter aus dem Quran · erste Verben), eigens geschrieben, kein Buchinhalt — die Entscheidung „Medina Buch 1 bleibt privat" ist damit nicht berührt. Der Satz wurde **vor** der Seite gebaut und gegen den Importpfad geprüft; zwei Lektionsnamen mussten unter 40 Zeichen, sonst hätte `normSet` sie abgeschnitten. `landing.html` danach vollständig nach `STRATEGIE.md` Abschnitt 5 neu aufgebaut. **Dabei ein Fehler gefunden, der seit Phase 6 live war:** Das Hell/Dunkel-Skript der Startseite wich um einen Kommentarblock von dem der anderen Seiten ab, und die CSP erlaubt nur deren Hash — das Skript lief auf der Startseite nie, hell eingestellte Nutzer sahen sie trotzdem dunkel. Behoben ohne Änderung an `firebase.json`. |
| 2026-09-13 | **Erfundener Kartensatz zurückgenommen** (v3.0.22). Der Betreiber hat den Inhalt aus v3.0.21 zurückgewiesen — erfundene arabische Vokabeln, teils mit Quran-Bezug, ungeprüft veröffentlicht: „die 50 karten sin bullshit … würde wenn schon selbst entscheiden was man haben kann“. `start-kartensatz.json` entfernt, `landing.html` auf Fassung A zurückgestellt (Neue legen selbst an). Festgehalten als Lehre in `STRATEGIE.md` 2.1: Ein Einsteiger-Kartensatz bleibt die richtige Idee, aber der Inhalt kommt vom Betreiber, nicht vom Agenten — und die Freigabe muss **vor** dem Schreiben ins Repo stehen, nicht danach. Zusätzlich geprüft und verneint: ein vom Betreiber gemeldeter Start-Fehler der App (Firebase-Laden von gstatic.com schlägt fehl) hängt an keiner Änderung in diesem Strang — `index.html`, `app.js`-Ladepfad und CSP sind seit v3.0.19 unverändert. |
| 2026-09-13 | **Ladefehler in `sw.js` behoben** (v3.0.23), außerhalb der Landing-Page-Strategie: Der Betreiber meldete, die App bleibe dauerhaft bei „Start fehlgeschlagen“ hängen (Firebase-SDK-Import von gstatic.com schlägt fehl), nur ein Hard-Reload half. Ursache gefunden: Der Service Worker fragte „zuerst Netz, dann eigenen Cache“, aber ohne den Browser-eigenen HTTP-Cache zu umgehen – schlug das Netz einmal fehl, konnte der Browser die Fehlantwort selbst zwischenspeichern, und jeder normale Reload bekam sie erneut, während ein Hard-Reload genau diesen Cache umgeht. Netz-Anfragen laufen jetzt mit `cache: "no-store"`; nur noch echte (`res.ok`) Antworten landen im eigenen Cache. Diese Logik in `sw.js` bestand unverändert seit vor Phase 5 – keine Folge des Landing-Page-Umbaus. |
| 2026-09-13 | **Selbstheilung bei Startfehler ergänzt** (v3.0.24). Der sw.js-Fix (v3.0.23) allein reichte nicht: Der Betreiber meldete, der Fehler bestehe weiter, obwohl gstatic.com von diesem Geraet aus normal erreichbar war. Manuelles „Websitedaten löschen“ in den Entwicklertools behob es sofort – Ursache war ein lokal feststeckender Service Worker/Cache, den weder Reload noch Neustart der App loeste. Das kann man Nutzer:innen nicht zumuten, also macht `app.js` es jetzt selbst: Schlaegt `initFirebase()` fehl, meldet die App bei erkanntem Online-Zustand einmal pro Sitzung alle Service-Worker-Registrierungen ab, loescht alle eigenen Caches und laedt neu, bevor der Fehlerbildschirm ueberhaupt erscheint. Bewusst nur online: Waehrend einer echten Offline-Phase wuerde das Loeschen des eigenen Caches genau die Offline-Faehigkeit zerstoeren, die er ermoeglichen soll. |
| 2026-09-13 | **Phase 8 begonnen: Möglichkeiten vorgelegt.** `phase-8-rueckmeldung/MOEGLICHKEITEN.md` neu — vier Wege, wie eine Nachricht ohne eigenen Server ankommt (Firestore-Sammlung · `mailto:`-Link · Drittanbieter-Dienst · Firestore + Cloud Function), mit den Auswirkungen auf CSP, `firestore.rules` und Datenschutzerklärung, Spam-Schutz-Bausteinen (inkl. Bezug auf App Check aus der „Später“-Liste) und einer gekennzeichneten Empfehlung (eigene Firestore-Sammlung). Wie in `AUFTRAG.md` verlangt: vorgelegt, nicht entschieden. Phase 8 damit `läuft`, wartet auf die Wahl des Betreibers. |
| 2026-09-13 | **Phase 9 begonnen: erster Durchgang** (v3.0.25). Systematisch geprüft statt geraten: Kontrastwerte der App selbst (vorher nie durchgerechnet, nur `landing.html` in Phase 6) gegen die WCAG-Formel, alle `<img>`/Formularfelder/Icon-Buttons auf fehlende Beschriftung durchsucht. Vier echte Funde behoben: zwei Kontrastverstöße (`--text-3` beide Themen, `--verdigris-400` hell), Escape schließt jetzt auch das Bereichs-Sheet, `dlg-input` und die Mehrfachauswahl-Checkbox haben jetzt eine Beschriftung. **Ein Fund bleibt offen:** Karten/Speicherkarten lassen sich nur per Maus/Touch neu ordnen, keine Tastatur-Alternative (WCAG 2.1.1) – nicht spekulativ gebaut, weil drei verschiedene Code-Pfade betroffen sind und ein echter Browser-Test noetig ist, damit der Fokus beim Verschieben nicht verlorengeht. Phase 9 bleibt `läuft`. |
| 2026-09-13 | **Phase 9 fertig** (v3.0.26). Der letzte offene Fund aus dem ersten Durchgang ist behoben: Karten, Karten innerhalb einer Speicherkarte und Speicherkarten selbst lassen sich jetzt auch mit Pfeiltasten am (jetzt fokussierbaren) Ziehgriff neu ordnen. Die drei Commit-Zweige aus `endDrag()` sind in eigene Funktionen gezogen und werden von Maus- und Tastatur-Bedienung gemeinsam genutzt, damit keine zwei Wege dieselbe Ordnungszahl schreiben. Fokus bleibt nach jedem Neuzeichnen über die Karten-/Speicherkarten-ID auf der bewegten Zeile. Ohne echtes Firebase-Konto geprüft, aber mit einem echten Browser: dieselbe Reorder-/Fokus-Logik in einer eigenständigen Playwright-Testseite nachgebaut – Reihenfolge, Fokus-Erhalt über einen vollständigen DOM-Neuaufbau und Randverhalten bestätigt. Offen bleibt nur ein Test mit echtem Screenreader (kein Blocker, siehe `phase-9-barrierefreiheit/LOGBUCH.md`). Damit sind alle vier Fertig-Kriterien aus `AUFTRAG.md` erfüllt. |
| 2026-09-15 | **Phase 8 fertig.** Testnachrichten aus beiden Formularen (Kontakt auf `landing.html`, Fehler in den Einstellungen) sind bekommen und bei adrabic.de@gmail.com angekommen. Kein weiterer Produktivcode nötig — beide Formulare funktionieren zuverlässig, rechtlich ausreichend und mit Spam-Schutz (Honeypot, verschlüsselte E-Mail). Alle Fertig-Kriterien erfüllt. Weiter mit Strang A (Landing-Page-Strategie) — Entscheidung 2.1 steht noch aus. |
| 2026-09-15 | **Strang A geklärt, aber nicht entschieden.** Die Urheberrechtsfrage zu Medina Buch 1 (Fassung C) ist weg — der Autor hat die Online-Nutzung freigegeben. Trotzdem bleibt 2.1 offen: Der Betreiber baut selbst an einem Medina-Kartensatz, der aber an eine eigene YouTube-Playlist gebunden werden und teils kostenpflichtig sein soll — Struktur ist beim Betreiber selbst noch nicht fertig gedacht. `landing.html` bleibt auf Fassung A, bis entweder eigenes Wortmaterial (→ B) oder der fertige, entscheidungsklare Medina-Kartensatz (→ C) vorliegt. Details in `landing-page-strategie/LOGBUCH.md`. Weiter mit Strang B (Phase 8). |
| 2026-09-16 | **Ladebildschirm neu + Fortschritt-Wochenvergleich** (v3.0.44/45, Design-Handoff des Betreibers). Ladebildschirm: Satelliten-Animation statt Opacity-Blink, freigestelltes Icon (`flower-isolated.png`), Mindestanzeige 650ms, sauberes Ausblenden. Fortschritt-Tab: Wochenvergleich mit Hochzähl-Animation. **Selektiv** aus dem Handoff übernommen — Sprachumschalter, Benachrichtigungen und Settings-Umbau bewusst **nicht** (kein Handler/keine Persistenz bzw. Betreiber-Entscheidung „Sprache zu riskant"); der bestehende 9-Sekunden-Lade-Hinweis wurde bewahrt, den ein Komplett-`app.js` stumm entfernt hätte. |
| 2026-09-16 | **Zwei Nebenstränge angelegt** aus drei neuen Videos des Betreibers: `redesign-oberflaeche` (Oberfläche & Mobile-Gestalt, `läuft` — Design-Prompt fertig, wartet auf Handoff) und `monetarisierung` (Geld/Wachstum, `zurückgestellt` — nur Gerüst). Video-Ratschläge gegen `KONZEPT.md` §7 gefiltert (`redesign-oberflaeche/PRINZIPIEN.md`). §7 für den Redesign gelockert (offene Frage 6). |
| 2026-09-16 | **Redesign: Design-Tool-Umweg übersprungen.** Betreiber will nicht über Claude Design gehen, sondern direkt im Repo umsetzen lassen. `redesign-oberflaeche/AUFTRAG.md` entsprechend umgeschrieben: phasenweise direkt am Code (Token/Basis → Gerüst/Navigation → leere Zustände/Onboarding → `landing.html`), Zwischenstand nach jedem Block statt einer Riesenänderung. `CLAUDE-DESIGN-PROMPT.md`/`ANLEITUNG.md` bleiben nur als Referenz. `PRINZIPIEN.md` (Filter) gilt unverändert. |
| 2026-09-16 | **Redesign: Ist-Zustand geprüft** (v3.0.46). Gerüst/Navigation (Bottom-Nav, Bottom-Sheet) und leere Zustände entsprechen bereits `PRINZIPIEN.md` — seit 3.0.0/3.1.0 vorhanden, kein Neubau nötig. `landing.html` ist bereits mobil-first. Einziger Fund: Ziehgriff-Tastziel 28px → 44px (`var(--tap)`), reine CSS-Breitenänderung ohne Eingriff in die Zieh-Logik. Details in `redesign-oberflaeche/LOGBUCH.md`. Kein zwingender nächster Block mehr — Strang ruht, bis der Betreiber eine konkrete Schwachstelle nennt. |
| 2026-09-16 | **Beobachtung 1 gebaut, auf ausdrückliche Freigabe** (v3.0.47): „nimm einen Punkt [aus `beobachtungen-lernwerkzeug.md`] und mach" — damit als Betreiber-Entscheidung gewertet, die `CLAUDE.md`s Sperre für Lernwerkzeug-Funktionen für genau diesen einen Punkt aufhebt (keine dauerhafte Freigabe der ganzen Liste). Tippen auf eine Kartenzeile in Verwalten öffnet jetzt eine Detailansicht (volle Notiz statt abgeschnittener Vorschau), reine Lesehülle nach bestehendem `.dlg`-Muster. Details, inklusive Prüfung auf Konflikt mit dem Ziehgriff, in `beobachtungen-lernwerkzeug.md` Punkt 1. |
| 2026-09-16 | **Beobachtung 3 gebaut** (v3.0.48), auf „weiter arbeiten" nach demselben Freigabe-Verständnis fortgesetzt. Scroll-Position bleibt nach dem Bearbeiten einer Karte erhalten, statt am Seitenanfang stehen zu bleiben — kleinerer, unabhängiger Fix (`editRueckkehrY`) statt des ursprünglich vermuteten Modal-Umbaus, der an Punkt 1 gehangen hätte. Details in `beobachtungen-lernwerkzeug.md` Punkt 3. Ab jetzt: nach jedem Push zusätzlich zu `main` auch der Sitzungs-Branch (`claude/nifty-planck-ng4keq`) synchron gehalten, wie vom Stop-Hook verlangt. |
| 2026-09-16 | **Beobachtungen 9 und 10 geprüft, kein Code geändert.** Punkt 9 (Verwechslungsgefahr Übersetzung/Notiz in der Liste): dreistufige Hierarchie aus Schriftgröße, -farbe und -familie in `styles.css` bestätigt, kein Fund. Punkt 10 (Formatierung auch in der Liste): durch Punkt 1 (Detailansicht, v3.0.47) und Punkt 6 (Notiz-Formatierung respektiert, v3.0.36) bereits abgedeckt — die einzeilige Listenvorschau bleibt bewusst gekürzt. Details in `beobachtungen-lernwerkzeug.md`. |
| 2026-09-16 | **Beobachtung 7 gefunden und behoben** (v3.0.49), beim Prüfen von Punkt 9 entdeckt: Kategorie-/Lektions-/Speicherkarten-**Namen** bekamen anders als Wort/Übersetzung/Notiz nie automatisch arabische Schrift + `dir="rtl"`, wenn sie arabisch benannt waren. Zwei konkrete Stellen ergänzt (`kartenTagsHtml()`, `setBlock()`), bewusst nicht alle zehn Fundstellen auf einmal — Details inklusive Liste der bewusst ausgelassenen Stellen in `beobachtungen-lernwerkzeug.md` Punkt 7. |
| 2026-09-16 | **Beobachtung 13: Verdachts-Fix versucht, ausdrücklich unbestätigt** (v3.0.50), auf Wunsch des Betreibers trotz fehlender Geräte-Verifikation umgesetzt. `min-height: 100dvh` → `100svh` an fünf Stellen (`body`, `.view--modus`, `.study-card` × 2, `.boot`) — Theorie: `dvh` wächst live, wenn die Browser-Werkzeugleiste beim Scrollen einklappt, und erzeugt dadurch scheinbar aus dem Nichts auftauchenden Scrollraum; `svh` bleibt konstant. Kein Test in dieser Umgebung möglich (kein mobiles Safari mit dynamischer Toolbar), daher als einzelner, leicht rückgängig zu machender Commit umgesetzt. Details in `beobachtungen-lernwerkzeug.md` Punkt 13. |
| 2026-09-16 | **Beobachtung 16: dritter Verdachts-Fix, ausdrücklich unbestätigt** (v3.0.51). Bei der Prüfung zuerst eine bfcache-Erklärung endgültig ausgeschlossen (nicht nur vermutet): Der Fehlerbildschirm wird bei jedem gemeldeten Fall neu aufgebaut, was ein echtes Neu-Ausführen des Modul-Skripts voraussetzt — bei einer bfcache-Wiederherstellung liefe das Skript gar nicht erneut. Stattdessen `<link rel="preconnect"/dns-prefetch">` zu `gstatic.com` in `index.html` ergänzt, damit die Verbindung schon beim HTML-Parsen aufgebaut wird statt erst beim dynamischen Import mitten im Skript. Keine Logik geändert, trivial rückgängig zu machen. Details in `beobachtungen-lernwerkzeug.md` Punkt 16. |
| 2026-09-16 | **Echter Regressions-Fund per Testrückmeldung: Einstellungen auf dem Handy unerreichbar, behoben** (v3.0.52). Anders als 5/13/16 hier klar am Code beweisbar, kein Verdacht: Der einzige `data-action="einstellungen"`-Knopf im ganzen Repo steckte in `.nav__foot`, das `styles.css` unter 900px vollständig ausblendet — auf dem Handy gab es also nachweislich keinen Weg dorthin. Zahnrad-Symbol in der Kopfzeile ergänzt, nur mobil sichtbar (`.appbar__einstellungen`, am Desktop per Media Query wieder ausgeblendet, damit es dort nicht doppelt zur Rail-Zeile steht). Die zweite gemeldete Beobachtung („Tabs verschoben, Lernen oben gesetzt") bleibt offen — zu vage, um sie vom Code her sicher zuzuordnen, siehe Rückfrage an den Betreiber. |
| 2026-09-17 | **Redesign: Regel-Reset und Block 1** (v3.1.0). Die drei Gestaltungssätze im Kopf der `styles.css` stimmten nicht mehr mit dem Code überein und ließen jede Prüfung auf »passt schon« hinauslaufen — der Betreiber hat den Reset freigegeben. Vier Sätze statt drei; Schriftskala als Token mit 17px-Wurzel (vorher `body` 15px unter einer 16px-Wurzel); Verschachtelungs-Verbot als CSS statt als Satz; Trefferflächen (`.bereich-pill` 36→44px). Neu: `redesign-oberflaeche/stilprobe.html` (Arbeitsmittel, nicht ausgeliefert). Gelöscht: `CLAUDE-DESIGN-PROMPT.md`, `ANLEITUNG.md` (beschrieben den verworfenen Design-Tool-Weg). Nebenbefund: Eingabefelder erben jetzt 17px, damit zoomt iOS beim Antippen nicht mehr hinein. **Am echten Handy noch nicht angesehen.** |
| 2026-09-17 | **Redesign Block 2: Einstellungen und Fortschritt** (v3.2.0). Betreiber-Rückmeldung: „unter jedem Bereich ist 10 Zeilen Erklärung", „Fortschritttab ist auch ein Chaosladen". Beide Bildschirme waren Stapel (sechs bzw. neun Blöcke untereinander). Jetzt Listen mit Stand rechts; die Erklärungen sind nicht gekürzt, sondern verlegt — ins Wahl-Blatt oder auf eine eigene Unterseite. Fortschritt: vier Blöcke auf dem Reiter, Listen (Lektionen, Leeches, 7 Tage) als Seiten dahinter. `.stat-block` ist jetzt eine Fläche. Neu: `probelauf.mjs` — lichtet mit Firebase-Attrappen zehn Bildschirme der echten App ab und misst den Platz unter der Navigationsleiste; fand sofort einen Kasten-im-Kasten, der im Code nicht zu sehen war. **Am echten Handy weiterhin nicht angesehen.** |
| 2026-09-17 | **Bühne mittig, Block 3 angefangen** (v3.2.1). Betreiber hat die Vorschau am iPad geöffnet: Lernansicht saß 120px rechts von der Mitte. Ab 900px rückt `.view` den Inhalt um die Spaltenbreite ein — im Modus gibt es die Spalte aber nicht (`.modebar { left: 0 }` stand schon da, der Einzug wurde vergessen). Am Handy greift die Regel nicht, also konnte kein Handy-Test das finden. Dazu: Zähler sagt „Karte 1 von 11" statt „0 von 11", Unterzeile von „Nicht" bricht nicht mehr um. Probelauf läuft jetzt auch in iPad-Breite und misst Mittigkeit (gegen den Body, nicht das Fenster — `scrollbar-gutter` täuschte sonst 7px vor). |
| 2026-09-17 | **Block 3 fertig: Übergänge auf der Bühne** (v3.2.2). Befund: Es gab gar keinen eigenen Übergang — `.view` blendete bei jeder Handlung den ganzen Bildschirm auf, also auch beim bloßen Aufdecken der Antwort, das Wort eingeschlossen. Jetzt bewegt sich nur das Neue: neue Karte → Wort wandert ein; Aufdecken → nur Antwort und Bewertungszeile. Möglich durch eine Klasse `zugedeckt`, weil `render()` sonst nicht unterscheidbar macht, ob dieselbe Karte aufgedeckt oder eine neue gekommen ist. Rückmeldung nach dem Bewerten und Gesten bewusst nicht angefasst. |
| 2026-09-17 | **Block 4 fertig: `landing.html`** (v3.2.3). Die Seite führte seit 3.1.0 eine eigene Schriftskala, eigene Radien und eine eigene Knopfform — damit war die AUFTRAG-Bedingung „App und Startseite teilen EINE Sprache" nicht erfüllt. Jetzt alles über die Token; Schlagzeile und Titel in der Serifenschrift (Satz 4, Markenentscheidung, rücknehmbar); Hauptknopf vollrund wie in der App; `100vh` → `100svh`. Stufenleiter von Kachelraster auf eine Spalte mit Balken — sie ist eine Reihenfolge, im Zickzack sah man das Wachsen der Abstände nicht. **Echter Fehler gefunden:** Das Kontaktformular hatte keinen sichtbaren Fokusrahmen (`rgba(var(--accent-rgb), …)` — die Variable gibt es nicht, der `box-shadow` war ungültig, darüber stand `outline: none`). Derselbe Fehler war in `styles.css` schon behoben, diese Stelle blieb stehen. |
| 2026-09-17 | **Video-1-Nachlese** (v3.3.0, v3.3.1). Betreiber: „es gibt so viel, das ich in den Videos gesehen habe, hier nicht sehe." Genommen wurden die zwei Punkte, die Video 1 wörtlich nennt und die auf jedem Bildschirm sichtbar sind: **die Navigationsleiste schwebt** („nowadays typically floating") und **das Karten-Formular ist ein Blatt** statt einer festen Abteilung auf dem Verwalten-Bildschirm, den man zum Ansehen aufruft. Einen schwebenden Plus-Knopf bewusst NICHT dazugebaut — die Handlung steht schon als einziger gefüllter Knopf da. Nebenbei: `tickCountups` ignorierte `prefers-reduced-motion` (CSS respektierte es, dieses JavaScript nicht). Im Logbuch steht jetzt die ehrliche Liste dessen, was aus den Videos bewusst NICHT gebaut ist. |
| 2026-09-17 | **Block 5 fertig, Strang C komplett** (v3.3.2). Registrierung und E-Mail-Bestätigung tragen „Schritt 1/2 von 2" (`.eyebrow`, kein neues Bauteil — Video 3: nie bei 0% anfangen, aber kein erfundener Assistent). Echter Fund: `landing.html` verspricht „Danach legst du direkt deine erste Karte an", aber die Bestätigungsseite nahm darauf keinen Bezug — das Versprechen verschwand genau dort. Ein Satz haelt es jetzt fest. Bewusst nicht angefasst: die E-Mail-Bestätigung selbst (Sicherheit/Recht, außerhalb der Lockerung) und der leere Erststart-Bildschirm (derselbe Code läuft auch für einen n-ten leeren Bereich, eine Erststart-Formulierung wäre dort falsch). Alle sechs Blöcke aus `redesign-oberflaeche/AUFTRAG.md` sind jetzt durch; der Strang ruht. |
| 2026-09-17 | **Bildersammlung ausgewertet, Block 7 fertig** (v3.4.0). Betreiber lieferte 108 Bilder (11 Karussells, davon 11-mal dieselbe Werbeseite). Jedes Bild einzeln gegen den Code geprüft → `redesign-oberflaeche/BILDER-BEFUND.md`: 59 schon umgesetzt (mit Zeile belegt), 12 passen nicht (mit Grund), 24 ohne Tipp, 3 Betreiberfragen (neu: offene Fragen 12, 13), 8 in neue Blöcke 8–10. **Echter Fehler gefunden und behoben:** Im Anmeldeformular wurden E-Mail und Passwort nach jeder Fehlermeldung und bei jedem Wechsel Anmelden/Registrieren gelöscht — live im Browser nachgewiesen. Dazu das Passwort-Auge. **Zweiter Fund, noch nicht gebaut:** die fertige Kurzmeldung `zeigeToast()` wird seit 3.0.0 nirgends aufgerufen → Block 8. |

## Wo eine neue Session anfängt

**Stand 17.09.2026: Redesign-Strang komplett durch.** Block 10 (Sichtbare
Wahl statt Klappliste, v3.4.3) ist am echten Handy bestätigt („passt") —
Stufenbereich beim Üben (Chip-Reihe, zwei Tipps markieren den Bereich) und
Art der Speicherkarte (Auswahl-Blatt statt Klappliste je Zeile) funktionieren
wie vorgesehen. Damit sind **alle zehn Blöcke** aus
[`redesign-oberflaeche/AUFTRAG.md`](redesign-oberflaeche/AUFTRAG.md) `fertig`
und am echten Handy verifiziert; der Strang **ruht**.

**Es gibt aktuell keinen aktiven, unblockierten Codepunkt mehr.** Was noch
offen ist, hängt an Betreiber-Entscheidungen, nicht an Bau-Arbeit:

- Offene Frage 12 (Farben: Hintergrund heller, Knopf-Hover nicht mehr reines
  Weiß?) und Frage 13 (Anmelden mit Google/Apple?) — siehe Tabelle oben.
- Strang A, Punkt 2.4 (Marke oder Person) — Identitätsfrage.
- „Später"-Punkte: Lehrer-/Schülermodus mit Klassenräumen, eigene
  Domain-Erweiterung, Abo/Bezahlfunktion, App Check, App-/Play-Store.

Eine neue Session prüft zuerst, ob der Betreiber inzwischen eine dieser
Fragen beantwortet oder eine neue Schwachstelle genannt hat (z. B. über
`beobachtungen-lernwerkzeug.md`, dort stehen weiterhin unentschiedene Punkte
1, 3, 9, 10 sowie ungeteste Verdachts-Fixe 5, 13, 16). Ohne neue Vorgabe gibt
es nichts zu bauen — das ist kein übersehener Schritt, sondern der
plangemäße Ruhezustand nach Abschluss aller Phasen und des Redesign-Strangs.

**Frühere Lage (vor den Bildern):**

**Strang C — Oberfläche & Mobile-Gestalt — alle sechs Blöcke `fertig`
(v3.1.0–3.3.2). Ruht.**
[`redesign-oberflaeche/`](redesign-oberflaeche/) hat mit Block 5 (Erststart,
v3.3.2) den letzten offenen Punkt aus `AUFTRAG.md` geschlossen: Registrierung
und E-Mail-Bestätigung tragen jetzt „Schritt 1/2 von 2" (Video 3,
Ziel-Gradient — kein neues Bauteil, `.eyebrow` gab es schon), und die
Bestätigungsseite löst das Versprechen von `landing.html` ein („Danach legst
du direkt deine erste Karte an"), das dort vorher spurlos verschwand.

**Der Strang ist damit nicht abgeschlossen, sondern ruht** — im Logbuch
stehen bewusst offene Punkte, die kein Block-Ziel waren, sondern beim Bauen
auffielen: die Werkzeugleiste auf Verwalten zeigt fünf Handlungen
gleichzeitig (Video 1: Aktionen sollen mit dem Zusammenhang kommen und
gehen), und Smart Defaults aus Video 3 sind als „passt" eingestuft, aber
nirgends umgesetzt. Eine neue Session kann hier weitermachen oder warten, bis
der Betreiber eine konkrete Schwachstelle nennt.

**Strang D — Monetarisierung & Wachstum — `zurückgestellt`, nur Gerüst.**
[`monetarisierung/`](monetarisierung/) steht als Struktur da; es wird nichts
gebaut, bis der Betreiber ihn startet. Grundfrage „soll Geld fließen" heute im
`KONZEPT.md` §1 mit „nein" beantwortet.

**Phasen 0–9 und Strang A/B stabil — keine Blockaden.**
Phase 9 (Barrierefreiheit) ist seit v3.0.26 `fertig`. Phase 8 (Rückmeldung)
ist seit 15.09.2026 (v3.0.30) `fertig` — beide Formulare funktionieren und
sind rechtskonform. Die Phasen 0–9 sind damit alle durch. Strang A
(Landing-Page-Strategie): 2.1 auf Fassung A gesetzt (15.09.2026), damit
stabil. Strang B (Phase 8) erledigt. **Die restlichen offenen Punkte liegen
unter „Später" in diesem Dokument** — Lehrer-Konzept + Medina-Kartensatz mit
Bezahlmodell, die Namensfrage innen/außen, Marke oder Person (2.4/2.5/2.6
der Strategie). Eine neue Session kann wählen, welcher dieser Punkte als
nächster drankommt — keine Reihenfolge verbaut, keine Frage blockiert etwas
anderes mehr.

**Strang A — Landing-Page-Strategie — 2.1 gesetzt, alles stabil.**
[`STRATEGIE.md`](landing-page-strategie/STRATEGIE.md) steht vollständig,
alle Fassungen A/B/C sind formuliert. Entschieden und umgesetzt: 2.2 *eng
anfangen, weit anlegen* · 2.3 *„wissenschaftlich bewährt" ersetzen* (beide
seit v3.0.20 live). 2.1 (womit ein Neuer anfängt): **Fassung A wird
beibehalten.** Ein erster Versuch mit einem vom Agenten erfundenen Kartensatz
(v3.0.21) wurde vom Betreiber zu Recht zurückgewiesen (v3.0.22): welcher
Wortschatz öffentlich steht, ist seine Entscheidung. `landing.html` zeigt
seit v3.0.22 „Dein Stoff, nicht unserer" — Neue legen ihre erste Karte
selbst an. Fassung C (Medina Buch 1) kommt später **zusammen mit dem
Lehrer-Konzept**, wenn die strukturellen Fragen geklärt sind (YouTube-Playlist,
Bezahlmodell). **2.5 (Namensabgleich) und 2.6 (Kostenfrage-Wortlaut) sind
seit 15.09.2026 (v3.0.31) umgesetzt.** Offen bleibt nur noch 2.4 (Marke oder
Person) — eine Identitätsfrage, keine, die ein Agent entscheidet, blockiert
aber nichts.

Am selben Tag zusätzlich zwei fundamentale Bugs gefunden und behoben, beide
**unabhängig von der Landing-Page-Strategie** (schon vor Phase 5 im Code):
`sw.js` fragte den Browser-eigenen HTTP-Cache statt immer das Netz (v3.0.23),
und ein feststeckender alter Service Worker/Cache ließ die App dauerhaft bei
„Start fehlgeschlagen" hängen — dagegen jetzt eine automatische Selbstheilung
in `app.js` (v3.0.24). Beide Male von einer Nutzermeldung ausgegangen, beide
Male am selben Tag verifiziert. Kein weiterer Schritt hier offen.

**Strang B — Phase 8** (Rückmeldung: Kontakt- und Fehlerformular, **`fertig`**).
Entscheidung gefallen: **Wahl B (`mailto:`-Implementierung)** für beide Formulare (15.09.2026, v3.0.28–30).
- **Kontaktformular** (v3.0.28): auf `landing.html`, sichere Mailto-Implementierung mit
  Honeypot und String.fromCharCode-verschlüsselter E-Mail. ✓ Implementiert.
- **Fehlerformular** (v3.0.29, korrigiert v3.0.30): in Einstellungen → Hilfe, Modal-Dialog,
  dieselbe Sicherheitsimplementierung wie Kontaktformular. Eigene Überprüfung nach v3.0.29 fand
  vier echte Fehler (Modal-Knöpfe tot, weil außerhalb der Klick-Delegation; Eintrittsanimation lief
  ins Leere, da erfundene Keyframes/Token; kaputter Fokus-Ring; nackter `alert()` statt `dlgAlert`)
  — mit v3.0.30 behoben, Details in `phase-8-rueckmeldung/LOGBUCH.md`. ✓ Implementiert.
- **Datenschutzerklärung** (v3.0.29): Neue Sektion 10 dokumentiert beide Formulare, gesammelte
  Felder (Name, E-Mail, Nachricht/Fehlerbeschreibung), Honeypot-Mechanism, Mailto-Ablauf. ✓ Erweitert.

**Fertig-Kriterium 1 erfüllt** (15.09.2026): Testnachrichten aus beiden Formularen sind bei
adrabic.de@gmail.com angekommen. Beide Formulare funktionieren zuverlässig und sind rechtlich
ausreichend — Phase 8 auf `fertig` gesetzt.

**Phase 9** (Barrierefreiheit) ist `fertig` (13.09.2026, v3.0.26). Erster
Durchgang: Fokus, Beschriftung und Kontrast systematisch geprüft (Kontrast
der App selbst war vorher nie durchgerechnet, nur der von `landing.html` in
Phase 6), vier echte Funde behoben. Letzter offener Fund seitdem gelöst:
Karten, Karten innerhalb einer Speicherkarte und Speicherkarten selbst lassen
sich jetzt auch per Pfeiltasten am (jetzt fokussierbaren) Ziehgriff neu
ordnen, mit einem eigenständigen Playwright-Test gegen Reihenfolge und
Fokus-Erhalt geprüft. Details in
[`phase-9-barrierefreiheit/LOGBUCH.md`](phase-9-barrierefreiheit/LOGBUCH.md).
Einzig offen, aber kein Blocker: ein Test mit echtem Screenreader stand
mangels Gerät nicht zur Verfügung.
| 2026-09-17 | **Redesign Block 8 fertig: Toast nach dem Speichern** (v3.4.1). Die vorhandene `zeigeToast()`-Funktion wird jetzt aufgerufen, sobald eine Karte gespeichert wird — „Karte gespeichert" beim Anlegen, „Änderung gespeichert" beim Bearbeiten. Die Meldung mit Checkmark-Icon steht unten rechts ca. 2,6 Sekunden lang sichtbar (`aria-live="polite"` für Bildschirmleser). Toast-Infrastruktur existierte seit 3.0.0, wurde aber nie aufgerufen; Block 8 ist der erste echte Use-Case. Nächster Schritt: Betreiber-Test am echten Handy zur Verifikation von Position und Sichtbarkeit. |
| 2026-09-17 | **Block 8 am echten Handy verifiziert.** Position, Sichtbarkeit und Timing bestätigt (Screenshot). Weiter mit Block 9. |
| 2026-09-17 | **Redesign Block 9 gebaut: Fehler am Feld statt im Dialog** (v3.4.2). Leeres Wort/Übersetzung im Karten-Formular und fehlender Name bei der Registrierung färben jetzt das betroffene Feld rot, zeigen „Bitte ausfüllen" darunter und holen den Fokus dorthin — kein Dialogfenster mehr zum Wegtippen. Die Gestaltung (`aria-invalid`, `.field__fehler`) gab es seit Block 1, wurde aber nirgends benutzt. Fehler verschwindet beim Tippen ohne vollen Re-Render (direkte DOM-Änderung, damit Fokus/Cursor nicht springen). Server-Fehler (falsches Passwort etc.) bleiben bewusst im allgemeinen Kasten. Im Browser geprüft: Registrierung ohne Namen — Fehler am Feld, Fokus dort, verschwindet beim Tippen, E-Mail/Passwort blieben stehen. Karten-Formular zunächst nur per Code-Review geprüft, nicht im Browser (braucht ein angemeldetes Konto). |
| 2026-09-17 | **Block 9 am echten Handy verifiziert.** Betreiber hat das Karten-Formular angemeldet getestet ("passt. weiter") — rotes Feld, Fokus-Sprung und Verschwinden beim Tippen bestätigt. Block 9 damit fertig. Weiter mit Block 10. |
| 2026-09-17 | **Redesign Block 10 gebaut: Sichtbare Wahl statt Klappliste** (v3.4.3). Stufenbereich beim Üben: zwei `<select>` "von"/"bis" ersetzt durch eine Chip-Reihe je verfügbarer Stufe — erster Tipp wählt eine Stufe, zweiter spannt den Bereich dazwischen auf. Art der Speicherkarte: `<select>` mit drei `<option>` in jeder Zeile ersetzt durch einen Knopf, der nur die aktuelle Art zeigt und ein Auswahl-Blatt öffnet (dasselbe Muster wie bei „Helligkeit"). Kein Schieberegler mit zwei Griffen (Auftrag warnt davor, Ziehgesten-Ärger) und kein Chip-Trio pro Zeile (hätte die Liste voll gemacht). Syntax geprüft, im Browser ohne Konsolenfehler geladen. Versucht, `probelauf.mjs` (Firebase-Attrappen) lauffähig zu machen, um die login-pflichtigen Bildschirme selbst zu sehen — `playwright`/Chromium ließen sich diesmal installieren, aber der Browser-Start scheitert an dieser Umgebung selbst (`chrome.exe: Permission denied`). Dabei nebenbei einen Windows-Pfadfehler in `probelauf.mjs` gefunden (nicht behoben, nur notiert: `.pathname` statt `fileURLToPath()`). Betreiber-Test am echten Handy steht noch aus.
| 2026-09-17 | **Echter Fund, unabhängig von jeder Phase: Schreibfehler nach veraltetem Anmelde-Ausweis behoben** (v3.4.5). Betreiber meldete "Nicht gespeichert: … (permission-denied)". Ursache: Die Sicherheitsregeln prüfen die bestätigte E-Mail am ID-Token, nicht direkt am Konto — bis zu eine Stunde nach dem Bestätigen kann der Ausweis im Browser veraltet sein. Fürs Laden gab es dafür seit 2.11.4 schon eine automatische Erneuerung, fürs Schreiben fehlte dieselbe Behandlung. Jetzt erneuert `saveFehler()` bei `permission-denied` einmal je Sitzung den Ausweis (ohne Reload, um ein offenes Formular nicht zu verlieren) und zeigt eine ruhigere Meldung statt der Backup-Warnung. Betrifft Datenzugriff/Auth (Phase-1-Themenkreis), keine Lernwerkzeug-Funktion im engeren Sinn. |
| 2026-09-17 | **Offene Frage 12 geklärt und umgesetzt** (v3.4.4). Betreiber: „ja fürs erste" für die Farbänderung, Frage 13 (Google/Apple) bleibt zurückgestellt. `--ink-900` (dunkler Hintergrund) `#08080a` → `#0e0e12`; `--accent-hover` von festem `#ffffff` auf `color-mix(in srgb, var(--accent) 85%, white 15%)` — dabei einen Nebenbefund korrigiert (heller Thema sprang beim Knopf-Hover unbemerkt auf reines Weiß). Im Browser geprüft (`getComputedStyle`, Screenshot). |
| 2026-09-17 | **Block 10 am echten Handy verifiziert.** Beide Prüfpunkte (Stufenbereich beim Üben, Art der Speicherkarte) vom Betreiber bestätigt („passt"). Damit sind alle zehn Blöcke des Redesign-Strangs `fertig`; der Strang ruht, bis eine neue Schwachstelle genannt wird oder offene Fragen 12/13 entschieden sind. |
| 2026-09-15 | **Beobachtungen zum Lernwerkzeug: Versuchte Verbesserung des Ziehgriff-Doppeltipp-Verhaltens (v3.0.40).** Testrückmeldung zu v3.0.39 deutete darauf hin, dass die Aktivierung der Ziehgriff-Doppeltipp-Geste weiterhin schwierig ist — wahrscheinlich weil der 400ms-Fenster zu eng ist, um auf einem 28px-breiten Touchscreen-Ziel zuverlässig zweimal zu tippen. Zwei Optimierungen ohne Mechanic-Änderung: (1) `DOPPELTIPP_FENSTER` von 400ms → 600ms für mehr Zeit. (2) Visuelle Rückmeldung auf `.drag-handle:active` mit Hintergrund (`rgba(var(--accent-rgb), 0.15)`), damit erkennbar ist, dass die erste Tap registriert wurde. Beide Änderungen sollen die Fehlertoleranz erhöhen. Nächster Schritt: Gerätetest zur Prüfung der Zuverlässigkeit. Alle fünf Beobachtungen 2, 4, 6, 14, 15 vom Code her bereits behoben oder verbessert; offen bleiben drei Punkte, die Gerätetests brauchen (5: iPad-Layout, 13: Over-Scrolling, 16: Browser-Zurück), und mehrere UX-Punkte, die Betreiber-Entscheidungen brauchen (1, 3, 9, 10). Details in `beobachtungen-lernwerkzeug.md`.
