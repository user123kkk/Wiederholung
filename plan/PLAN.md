# Gesamtplan: von der Bastel-App zur echten Website

Grundlage: [`../KONZEPT.md`](../KONZEPT.md)
Angelegt: 12. September 2026
Zuletzt geändert: 15. September 2026

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
Code**, phasenweise mit Zwischenstand nach jedem Block (Token/Basis → Gerüst/
Navigation → leere Zustände/Onboarding → `landing.html`) — der ursprünglich
vorgesehene Umweg über Claude Design (Prompt + Handoff-ZIP) ist auf
Betreiber-Entscheidung übersprungen; `CLAUDE-DESIGN-PROMPT.md`/`ANLEITUNG.md`
bleiben nur als Referenz liegen. Status: `läuft`, Code hat begonnen.
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

## Wo eine neue Session anfängt

**Aktivster Punkt gerade: der Redesign-Strang.** Direkt im Code, kein
Design-Tool-Umweg mehr.

**Strang C — Oberfläche & Mobile-Gestalt — `läuft`, Code direkt.**
[`redesign-oberflaeche/`](redesign-oberflaeche/) ist angelegt: Video-Ratschläge
gefiltert ([`PRINZIPIEN.md`](redesign-oberflaeche/PRINZIPIEN.md)),
`AUFTRAG.md` beschreibt die Schrittfolge. **Nächster Schritt:** Ist-Zustand von
`styles.css`/`index.html`/Navigation gegen die drei Gestaltungsregeln und
`PRINZIPIEN.md` ansehen, dann mit dem ersten Block beginnen (Vorschlag:
Gerüst/Navigation, siehe `LOGBUCH.md`). Nach jedem sichtbaren Zwischenstand:
Veröffentlichungsliste, committen, pushen. Umfang lockert `KONZEPT.md` §7 (Frage 6),
Lernlogik bleibt tabu.

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
| 2026-09-15 | **Beobachtungen zum Lernwerkzeug: Versuchte Verbesserung des Ziehgriff-Doppeltipp-Verhaltens (v3.0.40).** Testrückmeldung zu v3.0.39 deutete darauf hin, dass die Aktivierung der Ziehgriff-Doppeltipp-Geste weiterhin schwierig ist — wahrscheinlich weil der 400ms-Fenster zu eng ist, um auf einem 28px-breiten Touchscreen-Ziel zuverlässig zweimal zu tippen. Zwei Optimierungen ohne Mechanic-Änderung: (1) `DOPPELTIPP_FENSTER` von 400ms → 600ms für mehr Zeit. (2) Visuelle Rückmeldung auf `.drag-handle:active` mit Hintergrund (`rgba(var(--accent-rgb), 0.15)`), damit erkennbar ist, dass die erste Tap registriert wurde. Beide Änderungen sollen die Fehlertoleranz erhöhen. Nächster Schritt: Gerätetest zur Prüfung der Zuverlässigkeit. Alle fünf Beobachtungen 2, 4, 6, 14, 15 vom Code her bereits behoben oder verbessert; offen bleiben drei Punkte, die Gerätetests brauchen (5: iPad-Layout, 13: Over-Scrolling, 16: Browser-Zurück), und mehrere UX-Punkte, die Betreiber-Entscheidungen brauchen (1, 3, 9, 10). Details in `beobachtungen-lernwerkzeug.md`.
