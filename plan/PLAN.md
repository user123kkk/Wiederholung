# Gesamtplan: von der Bastel-App zur echten Website

Grundlage: [`../KONZEPT.md`](../KONZEPT.md)
Angelegt: 12. September 2026
Zuletzt geändert: 13. September 2026

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
| **8** | Rückmeldung: Kontakt- und Fehlerformular | `offen` | [`phase-8-rueckmeldung/`](phase-8-rueckmeldung/) |
| **9** | Barrierefreiheit als eigener Durchgang | `offen` | [`phase-9-barrierefreiheit/`](phase-9-barrierefreiheit/) |

Die Folge entspricht dem Vorschlag aus Konzept-Abschnitt 5. Es gibt keinen
Grund, davon abzuweichen — die Begründung dort trägt, und sie ist unten je
Phase noch einmal ausgeschrieben.

### Nebenstrang: Landing-Page-Strategie

Kein Phasen-Ordner, keine Nummer — deshalb steht er nicht in der Tabelle
oben. Die Startseite selbst ist in Phase 6 **gebaut** und `fertig`; der
Ordner [`landing-page-strategie/`](landing-page-strategie/) klärt, was sie
**sagt**. Reihenfolge dort: Befund → Strategie → erst dann HTML.

Status: `läuft` — der Befund ist am 13.09.2026 mit allem vorausgefüllt
worden, was Code und Plan belegen; es fehlen noch **sechs Antworten des
Betreibers** (Ende von [`BEFUND.md`](landing-page-strategie/BEFUND.md)).
Solange die fehlen, wird `landing.html` nicht umgebaut.

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

## Wo eine neue Session anfängt

**Beide offenen Stränge hängen an einer Entscheidung des Betreibers.** Das ist
kein Versehen und keine Ausrede — es steht hier, damit die nächste Session
nicht dieselbe Sperre noch einmal aufdeckt.

**Strang A — Landing-Page-Strategie** (`läuft`, siehe
[`landing-page-strategie/LOGBUCH.md`](landing-page-strategie/LOGBUCH.md)).
Der Befund ist so weit vorausgefüllt, wie Code und Plan es hergeben. Es
fehlen noch **sechs Antworten**, ausgeschrieben am Ende von
[`BEFUND.md`](landing-page-strategie/BEFUND.md): TikTok-Kanal · Zielgruppe ·
womit ein Neuer ohne Kartensatz anfängt · Vokabeltrainer oder
Talab-al-Ilm-Begleiter · „wissenschaftlich" belegen oder ersetzen · Marke
oder Person. Liegen sie vor → `STRATEGIE.md` bauen, danach `landing.html`
umbauen. Liegen sie **nicht** vor → nicht raten, nicht umbauen.

**Strang B — Phase 8** (Rückmeldung: Kontakt- und Fehlerformular, `offen`).
Braucht die Klärung: Formulare **in** die App oder als eigene Seite? Und vor
allem — wie kommt eine Nachricht an, wo die App keinen eigenen Server hat?
Laut [`phase-8-rueckmeldung/AUFTRAG.md`](phase-8-rueckmeldung/AUFTRAG.md)
sind die Möglichkeiten **zu Beginn der Phase aufzuschreiben und vorzulegen**,
nicht selbst zu entscheiden. Das ist die eine Sache, die eine nächste Session
ohne Rückfrage tun kann: die Möglichkeiten aufschreiben und ins Logbuch von
Phase 8 legen.

**Phase 9** (Barrierefreiheit) ist an nichts gesperrt, steht aber bewusst
zuletzt: Sie soll über den **endgültigen** Bestand laufen, und der Umbau der
Startseite steht noch aus.
