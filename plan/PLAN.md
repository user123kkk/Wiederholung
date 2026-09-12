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
wiederholung/`. Dieses Arbeitsverzeichnis ist ein **eigenständiges Repo**
`user123kkk/Wiederholung`, in dem der Code flach im Wurzelverzeichnis liegt —
es gibt keinen Unterordner `wiederholung/`.

Für die Arbeit gilt deshalb: **Repo-Wurzel = der im Konzept gemeinte Ordner
`wiederholung/`.** Alle Pfadangaben in diesen Plandateien sind relativ zur
Repo-Wurzel. Ob `adrabic` eine zweite, ältere Kopie enthält, ist hier nicht
feststellbar und in den offenen Fragen vermerkt (Frage 5).

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
| **1** | Datenzugriff härten: `firestore.rules` Feld für Feld, Feld-Manipulation, Import-Prüfung, XSS | `offen` — **als Nächstes** | [`phase-1-datenzugriff/`](phase-1-datenzugriff/) |
| **2** | Konto-Lebenszyklus: Registrierung, Bestätigung, Passwort zurücksetzen, Konto löschen | `offen` | [`phase-2-konto/`](phase-2-konto/) |
| **3** | Hygiene: Git-Historie, Key-Einschränkung, Debug-Reste, Abhängigkeiten | `offen` | [`phase-3-hygiene/`](phase-3-hygiene/) |
| **4** | Domain und Hosting, danach Security-Header und HTTPS-Feinheiten | `offen` | [`phase-4-domain-hosting/`](phase-4-domain-hosting/) |
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
| 1 | Domainname und Hosting — bleibt es GitHub Pages oder wird es Firebase Hosting / Netlify / Vercel? (entscheidet über die Security-Header) | Phase 4, dadurch 5–7 |
| 2 | Heißt die öffentliche Seite anders als das Tool, oder liegt beides auf einer Domain? | Phase 6 |
| 3 | Wird die Datenschutzerklärung selbst geschrieben oder über einen Generator erzeugt? | Phase 5 |
| 4 | Soll der Weitergabe-Kartensatz (Medina Buch 1) Teil der öffentlichen Seite werden oder privat unter Brüdern bleiben? (ändert Rechtslage und Startseite) | Phase 5, Phase 6 |
| 5 | Ist `user123kkk/Wiederholung` das maßgebliche Repo, oder gibt es in `user123kkk/adrabic` unter `wiederholung/` eine zweite, abweichende Kopie? | nichts akut — aber zu klären, bevor Änderungen an zwei Stellen auseinanderlaufen |

Die Phasen 0–3 hängen an keiner offenen Frage und können durchgearbeitet
werden.

---

## Statusverlauf

| Datum | Ereignis |
|---|---|
| 2026-09-12 | Plan und Ordnerstruktur für alle Phasen angelegt, Plan selbst gegengeprüft. |
| 2026-09-12 | **Phase 0 fertig.** Alle 50 Punkte aus Konzept-Abschnitt 4 mit Status und Beleg am Code: 10 × `✅`, 13 × `🔧`, 16 × `⏳`, 11 × `➖`. Kein Produktivcode geändert. |

## Wo eine neue Session anfängt

**Als Nächstes: Phase 1** — [`phase-1-datenzugriff/AUFTRAG.md`](phase-1-datenzugriff/AUFTRAG.md).

Vorher zu klären (steht in [`phase-0-bestand/BEFUND.md`](phase-0-bestand/BEFUND.md),
Abschnitt 4.2): Die Datei `firestore.rules` im Repo ist die *versionierte*
Fassung. Ob sie auch die *aktive* ist, zeigt nur die Firebase-Konsole — vor der
ersten Regeländerung abgleichen.

Der schwerste Fund von Phase 0 und damit der erste Schritt in Phase 1: Die
Regeln prüfen heute, *wer* schreibt, aber nie *was*. `maxStufe` steuert das
Freischalten der nächsten Lektion und ist vom Browser aus frei setzbar.
