# Möglichkeiten für Rückmeldung (Kontakt + Fehlerformular)

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Logbuch: [`LOGBUCH.md`](LOGBUCH.md)
Angelegt: 13. September 2026
Status: **vorgelegt — wartet auf Entscheidung des Betreibers**

`AUFTRAG.md` sagt ausdrücklich: Die Möglichkeiten werden aufgeschrieben und
vorgelegt, **nicht** vom Agenten entschieden. Dieses Dokument tut genau das.
Eine Empfehlung steht am Ende, gekennzeichnet als Empfehlung — sie ersetzt die
Entscheidung nicht.

---

## 1. Die Ausgangslage — was die Wahl einschränkt

**Kein eigener Server.** Das Repo ist reine statische Dateien auf Firebase
Hosting; jede Lösung muss ohne Backend-Code auskommen, den `AUFTRAG.md`
ausdrücklich ausschließt.

**Die CSP lässt heute nur Google/Firebase-Adressen durch.**
`firebase.json:57`:

```
connect-src 'self' https://firestore.googleapis.com
  https://identitytoolkit.googleapis.com https://securetoken.googleapis.com
  https://www.googleapis.com;
form-action 'self';
```

Jede Lösung, die Daten an einen **anderen** Dienst schickt (auch per
JavaScript-`fetch`, nicht nur per HTML-Formular), braucht eine neue
`connect-src`-Adresse — und `form-action 'self'` verbietet zusätzlich ein
klassisches `<form action="https://fremder-dienst">`. Eine CSP-Änderung ist
kein Nebeneffekt: Sie vergrößert die Angriffsfläche, die Phase 4 bewusst eng
gehalten hat.

**Firebase ist bereits da.** Firestore und Firebase Auth laufen längst; sie
sind schon in der CSP erlaubt und brauchen keine neue Abhängigkeit.

**Kontaktformular und Fehlerformular sind nicht dieselbe Frage.** Ein
Kontaktformular muss auch **ohne** Konto erreichbar sein (jemand mit einer
Frage, bevor er sich registriert) — die Startseite hat aber bewusst kein
Login-Formular (Phase 6). Ein Fehlerformular kann dagegen **innerhalb** der
App liegen, wo schon ein angemeldetes Konto besteht.

---

## 2. Die vier Möglichkeiten

### A — Eigene Firestore-Sammlung

Ein Formular schreibt direkt per Firebase-SDK (das die Seite ohnehin lädt)
ein Dokument in eine neue Sammlung, z. B. `rueckmeldungen/`. Der Betreiber
liest neue Einträge in der Firebase-Konsole.

- **Braucht:** ein paar neue Zeilen `firestore.rules` (nur `create`, kein
  `read`/`update`/`delete` für den Absender — wie die App es bei Karten schon
  macht), ein Formular in `landing.html` bzw. `app.js`. **Keine** CSP-Änderung,
  **kein** neuer Dienst.
- **Kontaktformular ohne Konto:** möglich, wenn die Regel anonymes Schreiben
  in genau diese eine Sammlung erlaubt (Firebase Anonymous Auth oder eine
  Regel ohne `request.auth`-Prüfung, dafür mit engen Feld- und Längengrenzen
  wie beim Kartenimport in Phase 1).
- **Nachteil:** Der Betreiber muss aktiv in der Konsole nachschauen — keine
  Benachrichtigung, keine E-Mail. Bei zwei, drei Nachrichten im Monat kein
  Problem; bei mehr Publikum eine Lücke, durch die etwas übersehen wird.
- **Spam:** eine öffentlich beschreibbare Sammlung ohne Login ist ein
  bekanntes Ziel für automatisierten Missbrauch. Nur mit Feldgrenzen zu
  arbeiten reicht nicht; siehe Abschnitt 3.

### B — `mailto:`-Link statt Formular

Kein Formular, sondern ein Link `Schreib uns: kontakt@…`, der das
Mailprogramm des Nutzers öffnet.

- **Braucht:** eine Zeile HTML. Kein Code, keine Regel, keine CSP-Änderung,
  kein Speicherort für die Nachricht (sie geht direkt per E-Mail raus).
- **Nachteil:** Auf vielen Handys ist kein Mailprogramm eingerichtet, der
  Link tut dann nichts. Kein Feld lässt sich erzwingen (Betreff, welche
  Angaben nötig sind) — die Nachricht kommt in der Form, die der Absender
  wählt. Für ein **Fehlerformular** ungeeignet, wenn man strukturierte Angaben
  braucht (welcher Bildschirm, welches Gerät); für ein einfaches
  **Kontaktformular** ausreichend.
- **Spam:** praktisch keiner (kein offener Schreibzugriff auf irgendetwas).

### C — Formular-Dienst eines Drittanbieters (z. B. Formspree, Getform)

Das Formular sendet per `fetch` oder klassischem POST an einen externen
Dienst, der die Nachricht per E-Mail weiterleitet.

- **Braucht:** eine neue Adresse in `connect-src` (und ggf. `form-action`),
  ein Konto beim Anbieter, und einen Blick in die Datenschutzerklärung des
  Anbieters — er wird Auftragsverarbeiter für diese Daten. Sitzt der Anbieter
  außerhalb der EU, kommt eine zusätzliche Prüfung dazu (Standardvertrags-
  klauseln o. ä.), die diese Phase nicht leichtfertig nebenbei erledigen
  sollte.
- **Nachteil:** Neue externe Abhängigkeit, neue Zeile in der
  Datenschutzerklärung, laufende Kosten möglich (die meisten dieser Dienste
  sind ab einer gewissen Menge kostenpflichtig), CSP wird für einen fremden
  Dienst geöffnet — genau das, was Phase 4 bewusst eng gehalten hat.
- **Vorteil:** Landet als E-Mail im ohnehin täglich gelesenen Postfach, kein
  Blick in eine Konsole nötig.
- **Spam:** die meisten dieser Dienste bringen eigenen Spam-Schutz mit
  (Honeypot, manchmal CAPTCHA) — das müsste man dann nicht selbst bauen.

### D — Firestore-Sammlung + Cloud Function, die eine E-Mail verschickt

Wie A, aber zusätzlich eine Firebase Cloud Function, die bei einem neuen
Eintrag automatisch eine E-Mail an den Betreiber schickt.

- **Braucht:** Firebase-Funktionen — und die laufen nur auf dem
  kostenpflichtigen **Blaze-Tarif**, nicht auf dem heutigen kostenlosen
  Spark-Tarif (ausgehende Netzwerkaufrufe sind auf Spark nicht erlaubt).
  Das ist eine Kostenentscheidung, keine rein technische.
- **Grenzfall zu „kein eigener Server":** Eine Cloud Function ist kein Server,
  den man selbst betreibt, aber es ist eigener Backend-Code mit eigener
  Wartung (Abhängigkeiten, Node-Version, Fehlerbehandlung) — das, was
  `AUFTRAG.md` mit „kein eigener Server nur für ein Formular" eigentlich
  vermeiden wollte, kommt hier durch die Hintertür wieder.
- **Vorteil:** Kombiniert die Vorteile von A (kein Drittanbieter,
  Rechtslage einfach) und C (E-Mail statt Konsole).

---

## 3. Spam-Schutz — für jede Möglichkeit mit offenem Schreibzugriff (A, D)

`AUFTRAG.md` verlangt eine **begründete** Entscheidung, nicht nur eine
Umsetzung. Drei Bausteine, die sich kombinieren lassen:

1. **Firestore-Regeln so eng wie beim Kartenimport** (Phase 1) — Feldliste,
   Längen, keine Massenanfragen. Wehrt keinen gezielten Missbrauch ab, aber
   sinnlos große oder falsch geformte Schreibversuche.
2. **Honeypot-Feld** — ein für Menschen unsichtbares Formularfeld; füllt ein
   automatisiertes Skript es aus, wird der Eintrag verworfen. Kein neuer
   Dienst, kein Nutzer-Ärgernis, hält aber nur einfache Bots ab.
3. **Firebase App Check** — steht bereits unter „Später" in `../PLAN.md`,
   vorgemerkt für den Moment, „sobald die Seite öffentlich beworben wird".
   Genau das ist mit Phase 6/7 jetzt der Fall. App Check wehrt automatisierten
   Zugriff auf Firebase-Dienste insgesamt ab — nicht nur für ein Formular,
   sondern grundsätzlich. Diese Phase wäre ein plausibler Anlass, App Check
   vorzuziehen, statt es weiter aufzuschieben; das ist aber eine eigene
   Entscheidung mit eigenem Aufwand, keine, die diese Phase nebenbei mit
   erledigt.

Ein CAPTCHA ist bewusst nicht aufgeführt: Es bräuchte einen fremden Dienst
(z. B. reCAPTCHA von Google) und damit wieder eine CSP-Erweiterung sowie eine
neue Datenschutzerklärung-Position — für ein Formular mit erwartungsgemäß
sehr geringem Aufkommen unverhältnismäßig.

---

## 4. Was in jedem Fall in die Datenschutzerklärung muss

Unabhängig von der gewählten Möglichkeit (Vorgabe aus `AUFTRAG.md`, Punkt 3
der Fertig-Kriterien): welche Felder erhoben werden (z. B. Name, E-Mail,
Nachricht), wozu, wie lange sie aufbewahrt werden, und — nur bei C oder D,
falls ein externer Dienst beteiligt ist — wer sie noch zu sehen bekommt.

---

## 5. Empfehlung (keine Entscheidung)

**A für beide Formulare, mit Honeypot-Feld, ohne App Check vorzuziehen.**
Begründung: Bei zwei bis drei Rückmeldungen im Monat ist der einzige echte
Nachteil von A — kein E-Mail-Posteingang, sondern ein Blick in die
Firebase-Konsole — kein Problem, das eine neue Abhängigkeit (C) oder
Mehrkosten (D) rechtfertigt. `mailto:` (B) wäre für ein Fehlerformular zu
unstrukturiert, für ein reines Kontaktformular aber eine ernsthafte, noch
einfachere Alternative zu A — falls der Betreiber lieber direkt eine E-Mail
bekommt als in die Konsole zu schauen, ist B dafür der richtige Weg, nicht C
oder D.

**Die eigentliche Entscheidung liegt beim Betreiber:** Reicht ein Blick in
die Firebase-Konsole gelegentlich (→ A), oder soll jede Rückmeldung wie eine
E-Mail ankommen (→ B für Kontakt, ggf. D für beides, falls das die Mehrkosten
wert ist)?
