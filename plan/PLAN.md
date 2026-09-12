# Gesamtplan: von der Bastel-App zur echten Website

Grundlage: [`../KONZEPT.md`](../KONZEPT.md)
Angelegt: 12. September 2026
Zuletzt geändert: 12. September 2026

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
| **5** | Recht: Impressum, Datenschutzerklärung, Cookie-Frage | `offen` | [`phase-5-recht/`](phase-5-recht/) |
| **6** | Öffentliche Startseite: Problem → Lösung → Handlungsaufruf, getrennt von der App | `offen` | [`phase-6-startseite/`](phase-6-startseite/) |
| **7** | SEO: Search Console, `robots.txt`, Sitemap, FAQ | `offen` | [`phase-7-seo/`](phase-7-seo/) |
| **8** | Rückmeldung: Kontakt- und Fehlerformular | `offen` | [`phase-8-rueckmeldung/`](phase-8-rueckmeldung/) |
| **9** | Barrierefreiheit als eigener Durchgang | `offen` | [`phase-9-barrierefreiheit/`](phase-9-barrierefreiheit/) |

Die Folge entspricht dem Vorschlag aus Konzept-Abschnitt 5. Es gibt keinen
Grund, davon abzuweichen — die Begründung dort trägt, und sie ist unten je
Phase noch einmal ausgeschrieben.

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

Diese Punkte werden in keiner Phase gebaut. Sie stehen hier, damit keine
Entscheidung getroffen wird, die sie später unmöglich macht.

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
| 2 | Heißt die öffentliche Seite anders als das Tool, oder liegt beides auf einer Domain? | Phase 6 |
| 3 | Wird die Datenschutzerklärung selbst geschrieben oder über einen Generator erzeugt? | Phase 5 |
| 4 | Soll der Weitergabe-Kartensatz (Medina Buch 1) Teil der öffentlichen Seite werden oder privat unter Brüdern bleiben? (ändert Rechtslage und Startseite) | Phase 5, Phase 6 |
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

Die Phasen 0–4 hängen an keiner offenen Frage mehr und können durchgearbeitet
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

## Wo eine neue Session anfängt

**Weiter in Phase 5** —
[`phase-5-recht/AUFTRAG.md`](phase-5-recht/AUFTRAG.md), falls dort schon
angelegt, sonst zuerst dort ein `AUFTRAG.md`/`LOGBUCH.md` nach dem Muster
der vorigen Phasen anlegen.

Phase 5 hängt an **offener Frage 3** (`../PLAN.md`, Abschnitt „Offene
Fragen"): Wird die Datenschutzerklärung selbst geschrieben oder über einen
Generator erzeugt? Eine neue Session prüft zuerst, ob der Betreiber diese
Frage inzwischen entschieden hat. Ist sie weiterhin offen, wird Phase 5
**nicht** begonnen — stattdessen im Logbuch von Phase 5 vermerken, dass sie
an dieser Frage hängt, und keine andere unblockierte Phase vorziehen, ohne
das mit dem Betreiber abzustimmen (Phase 5 ist laut Reihenfolge als
Nächstes dran).
