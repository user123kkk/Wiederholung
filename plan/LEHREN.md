# Lehren – was hier schon schiefging und wie es nicht wieder passiert

**Pflichtlektüre für jede Session, vor der ersten Änderung.** `CLAUDE.md`
verweist hierher. Angelegt am 24.09.2026 auf ausdrücklichen Wunsch des Betreibers:

> „Alles was du in diesen ganzen Phasen und chat und darüber hinaus gemacht
> hast, soll zukünftig direkt korrekt sein. Logik, Muster, Fehler … soll für
> diesen Zweck notiert werden. … hauptsache das kommt nicht mehr vor, das kann
> ich mir einfach nicht leisten. … du bist wie ein Recherche-Team,
> professionell, detaillierte Arbeit … für alles: Tool, Firebase, Rules,
> E-Mails, alles."

Jede Regel hier ist aus einem **echten Vorfall** entstanden. Die Version bzw. das
Datum steht dabei, damit man den Vorfall im `CHANGELOG.md` oder im Logbuch
nachlesen kann. Wer eine Regel für falsch hält, schreibt das mit Begründung ins
Logbuch. Stillschweigend ignoriert wird keine.

**Pflege:** Jeder neue Fehler, der einem Agenten unterläuft oder den der
Betreiber findet, kommt hierher: in den passenden Abschnitt als Regel und
zusätzlich in die Vorfall-Liste (§ 15). Ob Hinzufügen, Ändern oder Streichen:
eine Regel ändert sich nur mit Logbuch-Eintrag.

Inhalt:

1. Haltung gegenüber dem Betreiber
2. Religiöser Rahmen
3. Arbeitsweise im Repo
4. Veröffentlichen, Versionen, Caches
5. Prüfen und Messen
6. Oberfläche: Regeln aus Funden
7. Texte
8. Firebase: Regeln, Anmeldung, Daten
9. Hosting, Domains, CSP
10. E-Mails
11. iOS und Geräte
12. Recht und Datenschutz
13. Bekannte Stolperstellen im Code
14. Checkliste vor jedem Commit
15. Vorfall-Liste

---

## 1. Haltung gegenüber dem Betreiber

### 1.1 Ein Vorschlag des Betreibers ist kein Beschluss, sondern eine Frage

Der Betreiber hat das am 24.09.2026 ausdrücklich so festgelegt:

> „ich bin ein noob und äußere mich und du übernimmst oft das beantworten …
> nur weil ich ein Argument dafür bringen kann, heißt es nicht, dass es
> überwiegt (Argumente dagegen). Dieser Punkt sehr wichtig."

Schon früher, am 24.09.2026: „bitte nimm Kritik nicht akzeptant immer an."

**Regel:**

- Zu jedem Vorschlag oder jeder Kritik des Betreibers **Argumente dafür und
  dagegen** aufschreiben, ehrlich gewichtet. Dann folgt ein **eigenes Urteil**
  mit Empfehlung, und zwar auch dann, wenn das Urteil „lieber nicht" lautet.
- Hat der Vorschlag einen wahren Kern, aber die Lösung passt nicht, dann das so
  sagen und eine bessere Lösung für denselben Kern vorschlagen.
  - Beispiel 13.09.2026: Lehrer-/Schülermodus war die Antwort auf „womit fängt
    ein Neuer an?". Das war keine Antwort auf die gestellte Frage, sondern eine
    Produktidee. Sie wurde unter „Später" festgehalten und nicht gebaut.
  - Beispiel 18.09.2026: „Sperre ist ja nur eine Datei, die du entfernen
    könntest". Der Agent hat bestätigt, dass er es technisch könnte, und
    trotzdem abgelehnt. Stattdessen hat er eine Lösung gefunden, die die
    Sperre gar nicht erst berührt (Link-Modell).
- Stimmt eine Beobachtung des Betreibers nicht, dann das mit Beleg sagen (Messung,
  Zeile im Code). Weder nachgeben noch einfach widersprechen.
- **Umgekehrt gilt dasselbe:** Auch die eigene frühere Empfehlung kann falsch
  sein. Beispiel 19.09.2026: das eigene Urteil „Signup nach Onboarding nicht
  relevant" wurde nach Recherche zurückgenommen.

### 1.2 Nicht unnötig fragen – aber wissen, was dem Betreiber gehört

Betreiber: „ich will nicht gefragt werden unnötig", „du hast Berechtigung zu
allem", „mach einfach".

| Selbst entscheiden und machen | Dem Betreiber vorlegen (mit Empfehlung) |
|---|---|
| mechanische Fehler: Absturz, Sprung, Kontrast, falscher Text, Cache | **Lernlogik** (Stufen, Abstände, Bewertung, Serie, Freischalten) |
| Gestaltung und Bedienung im bestehenden Stil (`KONZEPT.md` §7, Frage 6) | **Lehrstoff und religiöser Wortlaut** (§ 2) |
| Aufräumen, Messen, Tests, Logbuch | **Recht** (was versprochen, gespeichert, weitergegeben wird) |
| Texte, die nachweislich falsch sind, richtigstellen | **Marke**, kompletter Umbau, etwas Neues, das nicht im Plan steht |
| | alles in einer fremden Konsole (Firebase, Google Cloud, Search Console) |

**Vorfall 3.10.2:** Das Thema sprang beim Start auf „dunkel" und überschrieb
die lokale Wahl. Der erste Logbuch-Entwurf vermerkte das als „Betreiber
entscheidet". Das war falsch: Der Fix war mechanisch. Nicht aus Vorsicht
Entscheidungen an den Betreiber abgeben, die keine sind.

**Vorfall 24.09.2026:** Der Betreiber äußerte drei Bedenken *„bevor ich eine
Anweisung gebe"*. Das heißt: Er will ein Urteil, nicht die sofortige Umsetzung.
Ein Bedenken ist kein Bauauftrag. Ein **Fehler**, der beim Prüfen gefunden
wird, wird aber sofort behoben (hier: falscher Serien-Hinweis, 3.17.19).

### 1.3 Nichts behaupten, was nicht geprüft ist

- „Gelöst", „erledigt", „funktioniert" nur nach Messung, Test oder Bestätigung
  am Gerät. Sonst gehört genau dazugeschrieben, **was** geprüft ist (z. B.
  „Chromium 390 px, Firebase-Attrappe") und **was nicht** (z. B. „echtes iPhone,
  Home-Bildschirm-App").
  - *Vorfall Beobachtung 18:* Die Nav-Leiste sprang. Das wurde als „gelöst"
    gemeldet, der Nachtrag 3.6.14 zeigte: zu früh.
  - *Vorfall 18.09.2026:* Die Browser-Key-Freigabe für `adrabic.web.app` wurde
    als „erledigt" eingetragen, war es aber nicht. Der Betreiber bekam
    `auth/requests-from-referer-…-are-blocked`.
  - *Vorfall 3.0.29:* „Implementiert" gemeldet, ohne gegen den Bestand zu
    prüfen. Die Knöpfe im Fehlerformular waren tot.
- **Vermutung und Befund trennen.** Ein Verdachts-Fix ist als Verdachts-Fix zu
  kennzeichnen, als eigener Commit, damit er leicht zurückzunehmen ist (so
  gemacht bei Beobachtung 13 in 3.0.50 und bei Beobachtung 16 in 3.0.51).
- Falsche Logbuch-Einträge nicht still umschreiben. Einen sichtbaren
  **„Korrektur"**-Eintrag setzen, der sagt, was falsch war (Beispiel:
  `phase-4-domain-hosting/LOGBUCH.md`, „permission-denied war NICHT der
  Browser-Key").
- **Vor einer Aussage über den Code die Stelle lesen, nicht aus der Erinnerung
  antworten.** *Vorfall 24.09.2026:* In der eigenen Analyse stand zuerst,
  gespeicherte Antworten „msa" müssten beim Streichen der Option gefiltert
  werden. Tatsächlich speichert der Einstieg die Ziel-Antworten **nirgends**
  (`EINSTIEG_ZIELE`, nur `ui.einstieg`). Die Zeile war vorher nicht gelesen
  worden.

### 1.4 „Was Du noch tun musst"

Alles, was nur der Betreiber tun kann, steht am Ende jeder Antwort unter dieser
Überschrift, als **nummerierte Schritte**. Jeder Schritt sagt drei Dinge: wo man
klickt, was man einfügt, woran man merkt, dass es geklappt hat. Derselbe Punkt
gehört ins Logbuch unter **Offen** und in `plan/PLAN.md`. Mehr dazu in
`CLAUDE.md`.

Solange ein solcher Schritt offen ist, ist die Arbeit nicht fertig. Beispiele
aus der Geschichte:

- Regeln, die nicht in der Konsole standen → „Cloud nicht erreichbar",
  Feedback-Board in einer Endlosschleife.
- Die Browser-Key-Freigabe fehlte.
- `veroeffentlichen.bat` wurde nicht ausgeführt → die Änderung war nie live.

### 1.5 Wer der Betreiber ist, wie er schreibt

- **Korrektur 24.09.2026:** Die App gehört **seinem Cousin**, nicht ihm
  selbst – der Betreiber dieser Chats trifft die Entscheidungen über die App.
  Der Cousin ist noch nicht volljährig; im Impressum steht deshalb
  übergangsweise **der Vater**. Der Cousin trägt sich selbst ein, sobald er
  18 wird. (Frühere Angabe hier, „Betreiber 16, Vater haftet", war
  unvollständig – das Alter des Betreibers selbst war schon am 22.09.2026 auf
  18 korrigiert worden, siehe `PLAN.md`.) Details:
  `plan/phase-5-recht/PRUEFUNG-2026-09-24.md` Frage 1.
- Der Agent gibt keine Rechtsberatung, sondern nur Hinweise, und bewertet
  eine mitgeteilte rechtliche Konstruktion nicht von sich aus (§ 12,
  Vorfall 24.09.2026 – ein Agent hatte die Eintragung des Vaters ungefragt
  in Frage gestellt).
- Er schreibt locker, mit Tippfehlern und aus dem Bauch („mach was starkes
  daraus", „checkst du").
  - Den gemeinten Kern herauslesen, nicht den Wortlaut.
  - Im Zweifel an seinen Screenshots messen, statt zu raten, welches Element
    er meint. Vorfall 3.6.1: Die falsche Leiste wurde repariert (Pille oben
    statt Nav unten).
- Antworten auf Deutsch, einfach, ohne Fachjargon. Fachbegriffe nur mit einem
  Halbsatz Erklärung. Kein „KI-Slop": keine Floskeln, keine Aufzählungen um
  ihrer selbst willen, keine Superlative ohne Beleg.
- Seine Grundwünsche, die für alles gelten:
  - premium, ruhig, sauber, flüssig;
  - Hick's Law: ein Bildschirm, eine Aufgabe; nichts doppelt;
  - nichts, was „tot" wirkt;
  - Gründe zum Zurückkommen, aber ohne Nerven.

### 1.6 Lehrstoff wird nie erfunden

**Vorfall 3.0.21 → 3.0.22 (13.09.2026):**

- Was passiert ist: Der Agent erfand einen Einsteiger-Kartensatz mit 50
  arabischen Vokabeln, teils mit Quran-Bezug, und veröffentlichte ihn ungeprüft.
- Der Betreiber: „die 50 Karten sind bullshit … würde wenn schon selbst
  entscheiden".

**Regeln daraus:**

- Arabische Wörter, Übersetzungen, Beispiele und Kartensätze kommen **vom
  Betreiber**.
- Die Freigabe steht **vor** dem Schreiben ins Repo, nicht danach.
- Ausnahme: Testdaten unter `plan/werkzeuge/` (werden nicht ausgeliefert).

---

## 2. Religiöser Rahmen

Festgelegt vom Betreiber am 24.09.2026, wörtlich sinngemäß:

> Für den religiösen Kontext gilt **nur Quran und Sunnah nach dem Verständnis
> der Salaf as-Salih**. Gemeint sind die drei ersten Generationen nach dem
> Propheten Muhammad ﷺ (Sahaba, Tabi'un, Atba' at-Tabi'in). Dazu gehören die
> Fatawa der Gelehrten auf dem Manhaj der Salaf, die Hadithe und der Quran.
> **Kein** Terror, **keine** Organisation, wie es sie heute leider gibt, **keine**
> Sekte.

**Was das für einen Agenten praktisch heißt:**

1. **Keine religiösen Inhalte selbst verfassen.** Das betrifft Ayat,
   Übersetzungen von Ayat, Hadithe, Du'a, Erklärungen (Tafsir), Urteile und
   religiöse Begründungen. Der Agent schreibt so etwas nicht, auch nicht „nur
   als Beispiel". Das ist dieselbe Linie wie § 1.6, nur strenger.
2. **Kein Bezug auf Gruppen, Bewegungen, Organisationen, Parteien oder
   politische Themen.**
   - Das gilt in Texten, Beispielen, Werbung, Ideen und Recherchen.
   - Auch nicht als Abgrenzung („nicht wie Gruppe X"): Das schafft selbst
     Assoziation.
3. **Wo die App religiöse Begriffe braucht, wird der Wortlaut des Betreibers
   übernommen.**
   - „Quran und Sunnah" ist sein Wortlaut (Kommentar bei `EINSTIEG_ZIELE`).
   - Die Gebetsnamen der Erinnerungs-Anker sind ebenso gesetzt (`app.js`,
     Anker-Liste bei „Fünf Gebete plus ein freies Feld").
   - Soll sich an Schreibweise oder Wortwahl etwas ändern, ist das eine Frage
     an den Betreiber. Beispiel: Fajr (englische Umschrift) neben Ischa
     (deutsche Umschrift).
4. **Recherche mit religiösem Bezug:** nur Quellen, die zu diesem Rahmen passen.
   Ist unklar, ob eine Quelle passt, wird sie nicht verwendet und der Betreiber
   gefragt. Keine Aussage „der Islam sagt …" aus allgemeinen Webquellen.
5. **Religiöse Angaben von Nutzer:innen werden nicht gespeichert.** Religion ist
   nach Art. 9 DSGVO eine besondere Datenkategorie. Deshalb bleibt z. B. das Ziel
   „Quran und Sunnah verstehen" im Einstieg **nur im Arbeitsspeicher**. Es kommt
   nicht in `localStorage`, nicht in Firestore. Das bleibt so. (Eine Statistik
   gibt es seit 3.17.23 nicht mehr.) **Eine bewusste Ausnahme:** der
   Wenn-dann-Satz (`adrabic-einstieg-nachklang`, z. B. „Nach dem Fajr-Gebet …")
   liegt nur im `localStorage` des Geräts, nie in der Cloud, steht in der
   Datenschutzerklärung Punkt 7 und wird mit der ersten eigenen Karte
   gelöscht (Betreiber-„ja" zu Empfehlung O3a, 24.09.2026).
6. Arabische Schrift sauber:
   - Harakat werden nicht verändert.
   - Die Quran-Schrift wird nur für arabischen Text verwendet.
   - Arabisches wird nie maschinell erzeugt (§ 1.6).

---

## 3. Arbeitsweise im Repo

### 3.1 Einstieg in eine Session

`CLAUDE.md` → **diese Datei** → `plan/PLAN.md` („Wo eine neue Session
anfängt", Offene Fragen) → `AUFTRAG.md` der Phase → `LOGBUCH.md`, letzter
Eintrag zuerst. Dazu `git log --oneline -15` gegen den zuletzt dokumentierten
Stand halten.

**Vorfall 3.5.4:** Ein Commit hatte `app.js` geändert, ohne Version und
Changelog. Aufgefallen ist das nur, weil `git log` mit `PLAN.md` verglichen
wurde.

### 3.2 Der Code ist maßgeblich – Kommentare und alte Dokumente können lügen

Kommentare und Plandateien beschreiben den Stand **zum Zeitpunkt, als sie
geschrieben wurden**. Später geänderte Logik lässt sie oft stehen.

Belegte Fälle:

- `bereicheMitOffenem()` – der Kommentar sagte „Grundlage für die
  Streak-Prüfung".
  - Seit 2.14.0 ergibt sich die Serie aus dem Tagesprotokoll; die Bereiche
    spielen keine Rolle mehr.
  - Darauf baute der Hinweis „Noch offen für die Serie: …" auf dem
    Lernen-Bildschirm. Der war damit **falsch** und wurde in 3.17.19
    richtiggestellt.
- Der Kopfkommentar über `serieAktuell()` sagte „Eine Lücke wird überbrückt,
  wenn seit der letzten mindestens sieben gezählte Tage liegen". Der Code
  darunter macht etwas anderes: **ein** ausgelassener Tag wird überbrückt, der
  zweite beendet die Serie. In 3.17.19 wurde der Kommentar korrigiert.
- `streak.lastCompletedDate` ist seit 2.14.0 tot, wurde aber noch abgefragt:
  - Das Rundenende zeigte deshalb nie die Serie.
  - Der Banner „alles erledigt" auf Lernen prüfte ins Leere.
  - Beides behoben in 3.12.0.
- `evaluateStreakForNewDay()` ist absichtlich stillgelegt (`if (false && …)`).
  Dort nichts „reparieren".
- `KONZEPT.md` spricht vom Ordner `wiederholung/`. Gemeint ist die Wurzel dieses
  Repos (`CLAUDE.md`).

**Regeln:**

- Vor jeder Aussage über ein Verhalten den **Codepfad** lesen, nicht den
  Kommentar.
- Wer Verhalten ändert:
  - `grep` nach allen Texten, Kommentaren und Hinweisen, die das alte
    Verhalten beschreiben, und sie mitziehen;
  - dazu die Texte in der Oberfläche (§ 7.3).

### 3.3 Ein Fund ist ein Muster → im ganzen Repo suchen

- *Fokusrahmen:* `rgba(var(--accent-rgb), …)`. Die Variable gab es nie, die
  Regel war ungültig. Zuerst in `styles.css` behoben, dieselbe Stelle blieb im
  Kontaktformular stehen (3.2.3). In 3.0.40 hatte `.drag-handle:active` dieselbe
  tote Variable.
- *Markenname:* „Wiederholung" → „Adrabic" in `app.js` geändert. Die Fußzeile
  von `impressum.html` blieb stehen (3.0.32).
- *Systemcodes im Text:* 7 Stellen in Station 13, weitere in Station 16.
- *„Karte(n)":* 9 Stellen in Station 13.

**Regel:** Nach jedem Fund `grep` über **alle** ausgelieferten Dateien
(`*.js`, `*.html`, `*.css`, `*.json`), nicht nur über die Fundstelle.

### 3.4 Ursache beheben, nicht Symptom

- *3.0.30:* Die Knöpfe im Fehler-Modal waren tot, weil das Modal außerhalb von
  `#app` lag.
  - Naheliegend wäre gewesen, eigene Listener an die Knöpfe zu hängen.
  - Richtig war, die **eine** Klick-Delegation auf `<body>` zu verlegen.
- *Beobachtung 2 (Ziehgriff):* Vier Feinjustierungen am Doppeltipp brachten
  nichts. Die Geste selbst war das Problem, Long-Press löste es (3.0.41).
  **Regel:** Nach dem zweiten erfolglosen Anlauf am selben Symptom die Annahme
  hinterfragen, nicht weiter justieren.
- *Beobachtung 18:* sechs Meldungen, drei falsche Anläufe. Erst ein
  Mess-Overlay am echten Gerät zeigte die Ursache (`innerHeight` 848 vs.
  896 px). **Regel:** Wenn die Ursache nicht aus dem Code beweisbar ist, zuerst
  ein Messwerkzeug bauen, dann reparieren.

### 3.5 Nichts wieder einbauen, was bewusst entfernt wurde

Bewusst entfernt (Auswahl):

- Intervall-Zahlen („in x Tagen"), Grund: „kein Bock, dass man mein System
  leicht herauskriegen kann";
- Einstellung „Bewegung" (Voll/Ruhig);
- „Überspringen" im Einstieg;
- „Tage gelernt" (ersetzt durch „Dabei seit");
- Datei-„Zum Weitergeben";
- `landing.html` (wird neu gemacht);
- Unterzeilen unter den Bewertungsknöpfen;
- „Gestaltung 4.0" (Komplett-Umbau, zurückgenommen: „das davor war besser");
- der erfundene Kartensatz.

Vor jedem „fehlt doch noch" erst in `CHANGELOG.md` und den Logbüchern suchen,
ob es schon einmal da war.

### 3.6 Fremde Vorlagen nie komplett übernehmen

*3.0.44:* Ein Design-Handoff brachte eine komplette `app.js`. Hätte man sie
übernommen, wäre der 9-Sekunden-Hinweis beim Laden stumm verschwunden. Aus
Vorlagen wird **selektiv** übernommen, mit Diff gegen den Bestand.

### 3.7 Vorhandenes nutzen, bevor Neues gebaut wird

- `zeigeToast()` existierte seit 3.0.0 und wurde nie aufgerufen (Fund 3.4.0).
- `.field__fehler` und `aria-invalid` gab es seit Block 1 und sie waren
  ungenutzt (3.4.2).
- Eigene CSS-Klassen im Fehlerformular waren schlechter als die globalen Stile
  (3.0.30).

**Regel:** Vor einem neuen Bauteil in `styles.css` und `app.js` nach einem
vorhandenen suchen.

### 3.8 Beim Entfernen alle Aufrufer mitnehmen

*3.6.13:* Der tote Aufruf `teilLinkPruefenUndVerarbeiten` warf bei jedem
Snapshot einen Fehler. Nach dem Entfernen einer Funktion: `grep` nach dem
Namen, nach ihrem `data-action` und nach den CSS-Klassen, die nur sie benutzte.

### 3.9 Debug-Werkzeuge sind aus und bleiben aus

*3.6.13:* Das Debug-Overlay aus 3.6.4/3.6.5 war nie abgeschaltet. Es stand
als grüner Kasten da und machte das Scrollen etwa 9× langsamer. Messhilfen
gehören hinter einen bewussten Schalter oder werden nach der Messung entfernt.

### 3.10 Logbuch und Plan

Das Format steht in `CLAUDE.md`. Dazu:

- Auch „geprüft, nichts zu tun" ist ein Eintrag.
- „AKTUELL" in `PLAN.md` ist der erste Satz, den die nächste Session liest. Er
  muss den **jetzigen** Stand nennen und sagen, was beim Betreiber offen ist.
- Jede offene Betreiber-Entscheidung kommt in die Tabelle „Offene Fragen" in
  `PLAN.md`, mit Empfehlung.

### 3.11 Git

- Direkt auf `main`, kein PR (`CLAUDE.md`).
- Danach denselben Stand auf den Sitzungs-Branch:
  `git push origin HEAD:main && git push origin HEAD`.
- Commit-Nachricht: Version, dann was und warum in Worten des Betreibers.
- Keine Modellnamen in Commits, Code oder Dateien.
- Nie `--force` auf `main`.

---

## 4. Veröffentlichen, Versionen, Caches

### 4.1 Die Liste – jede Zeile hat einen Vorfall

Bei **jeder** Änderung an ausgelieferten Dateien:

| Schritt | Warum (Vorfall) |
|---|---|
| `APP_VERSION` in `app.js` hochzählen | Anzeige, Fehlerberichte, Cache-Name |
| gleicher Wert als `CACHE_NAME` in `sw.js` | sonst behält der Service Worker die alten Dateien |
| gleicher Wert in `index.html`: `app.js?v=…` **und** `styles.css?v=…` | `Cache-Control: max-age=3600` für `.js` und `.css`. 3.6.2: „immer noch kaputt" trotz Deploy. 3.11.0: CSS ohne Query – eine reine Gestaltungsversion war bis zu 1 h unsichtbar |
| neue Startdateien in `APP_SHELL`, `app.js`/`styles.css` **mit** Query | `caches.match()` vergleicht die ganze URL. Ohne Query traf der vorab gespeicherte Eintrag nie (3.11.0) |
| `CHANGELOG.md` | die nächste Session und der Betreiber lesen dort nach |

**Konsistenz prüfen**, festen Text suchen statt Regex: Punkte sind in Regex
Joker. `grep -c '3.17.12'` zählte einmal 3 statt 2.

```
V=3.17.19; grep -F -n "\"$V\"" app.js; grep -F -n "$V" sw.js index.html
```

Erwartet werden vier Treffer:

- `APP_VERSION` in `app.js`;
- `CACHE_NAME` in `sw.js`;
- `styles.css?v=` in `index.html`;
- `app.js?v=` in `index.html`.

Dazu kommt der Kopf in `CHANGELOG.md`. Kommentare mit der Versionsnummer in
`app.js` zählen nicht; deshalb wird dort mit Anführungszeichen gesucht.

### 4.2 `node --check app.js` vor jedem Commit

*Vorfall 3.6.2:* Typografische Anführungszeichen („ ") standen als
String-Begrenzer im Code. Das Skript brach beim Parsen ab, und die App startete
auf keinem Gerät. Deutsche Anführungszeichen gehören **nur in Strings**, nie als
Begrenzer.

### 4.3 Reine `firebase.json`-Änderung → `csp-build`-Zeile mitzählen

*Vorfall 3.4.10:*

- Was passiert ist: Die CSP wurde korrigiert, trotzdem saßen alle bisherigen
  Besucher:innen auf der alten fest.
- Warum: `index.html` war unverändert, also blieb der ETag gleich. Der Server
  antwortete 304, und ein 304 aktualisiert gespeicherte Antwort-Header wie die
  CSP nicht.
- Unsichtbar für jeden Test mit frischem Browser oder `curl`.

**Regel:** Bei jeder Änderung nur an Headern die Merkzeile `csp-build` in
`index.html` mitzählen.

### 4.4 Service Worker

- Netzanfragen gehen mit `cache: "no-store"` raus. In den eigenen Cache kommen
  nur echte Antworten (`res.ok`). Sonst bleibt eine einmal fehlgeschlagene
  Antwort im HTTP-Cache hängen (3.0.23).
- Selbstheilung bei Startfehler (3.0.24): SW abmelden, Caches löschen,
  neu laden – **nur online**. Offline würde das die Offline-Fähigkeit zerstören.
- Navigationen lassen sich nicht auf `no-store` umbauen. Deshalb gelten für
  HTML die Header aus `firebase.json` (`max-age=0`) und § 4.3.

### 4.5 Deploy – was wovon abhängt

| Was | Wie | Wer |
|---|---|---|
| App-Dateien (Hosting) | `veroeffentlichen.bat` = `git pull` + `firebase deploy --only hosting` **oder** (seit 25.09.2026, von jedem Gerät) GitHub → Actions → „Veroeffentlichen" → „Run workflow" (`.github/workflows/veroeffentlichen.yml`, deployt `main`, braucht Secret `FIREBASE_SERVICE_ACCOUNT`). Nur auf Knopfdruck – ein Push auf `main` veröffentlicht nichts. | Betreiber (Agent löst den Knopf nur auf ausdrücklichen Wunsch aus) |
| `firestore.rules` | `firebase deploy --only firestore:rules` (seit `firebase.json` einen `firestore`-Abschnitt hat) **oder** in der Firebase-Konsole einfügen und „Veröffentlichen" | Betreiber |
| Konsolen-Einstellungen (Auth-Domains, Browser-Key, E-Mail-Vorlagen, Search Console) | nur in der jeweiligen Konsole | Betreiber |

Aus der Agenten-Umgebung selbst geht `firebase login` nicht: `auth.firebase.tools`
ist dort gesperrt (25.09.2026) – deshalb der GitHub-Knopf.

`veroeffentlichen.bat` (und der GitHub-Knopf) spielen **keine Regeln** ein. Eine Funktion, die neue
Regeln braucht, ist bis zum Regel-Deploy kaputt. Deshalb gilt:

- Sie muss dann **sauber scheitern**, mit einer Meldung in Worten, ohne
  Schleife (§ 8.4).
- Der Regel-Deploy steht unter „Was Du noch tun musst".

---

## 5. Prüfen und Messen

### 5.1 Der Prüfstand

`plan/werkzeuge/pruefstand/` (Anleitung in `LIESMICH.md`): Playwright gegen die
echte `app.js`, Firebase durch `stubs.js` ersetzt.

- Server: `python3 -m http.server 8099 --bind 127.0.0.1` im Repo-Wurzelordner.
- Chromium: `CHROMIUM=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
- Zwischen 0 und 4 Uhr (Container-Uhr, UTC): `TZ=Asia/Tokyo` davor setzen –
  die App beginnt den Tag erst um 4 Uhr, sonst sind alle Datumstests um
  einen Tag daneben (§ 15, 26.09.).
- Fotos: `PRUEF_BILDER=<scratchpad>/bilder`.
- Fehler nachstellen:
  - `__FB.fail` (Schreiben),
  - `failGet` (Lesen),
  - `authFail`,
  - `reauthFail`,
  - `popupZu`,
  - `window.__SNAP_FAIL` (Live-Daten).
- Unbestätigte Konten bekommen `permission-denied`, wie bei den echten Regeln.
- Je Station ein `t_*.js`. Dazu:
  - `t_sprung.js` (Sprünge),
  - `t_kontrast.js` (Kontrast),
  - `t_fluessig*.js` (Flüssigkeit, CPU 4×),
  - `t_gross_alle.js` (iPad, Desktop),
  - `t_a11y.js` (Namen, Überschriften, reduzierte Bewegung),
  - `affe.js` (Zufallstest: `node affe.js handy 200 7`).

**Vor jedem Veröffentlichen:**

1. den Test der betroffenen Stelle laufen lassen;
2. `t_sprung.js` und `t_kontrast.js` als Regression;
3. bei größeren Änderungen den Affen mit ≥150 Schritten laufen lassen.

Ergebnis: 0 Befunde oder jeder Befund begründet.

### 5.2 Messen statt schätzen

Was gemessen wird:

| Was | Wie |
|---|---|
| Sprung | Lage eines Elements vor und nach der Handlung (`getBoundingClientRect`), Ziel 0 px (±1 Rundung) |
| Kontrast | gegen den Hintergrund, der **wirklich unter dem Text** liegt, ≥ 4,5:1, auch gesperrte Knöpfe, die Information tragen |
| Flüssig | Animationen und Renderzeit mit CPU-Drosselung 4×. Beispiel: Verwalten 200 → 80 ms, Liste von 400 Animationen auf 14 |
| Überlauf | kein waagerechtes Scrollen, 320 px bis 1440 px |
| Trefferfläche | ≥ 44 px |
| Farben aus Screenshots | Pixel auslesen (Pillow): 3.8.7 Leiste RGB 48 vs. 25 |

### 5.3 Messfehler – der Test kann selbst falsch sein

Belegte Fälle:

- *Kontrast-Test (Einstieg):* Er meldete 1,0–1,6:1, weil er den gefüllten Punkt
  als Hintergrund nahm. Der Text stand aber darunter auf der Seite.
- *Mittigkeit (3.2.1):* Gegen `window.innerWidth` gemessen, kam konstant 7 px
  Versatz heraus. Das war `scrollbar-gutter`, das es auf iPhone und iPad nicht
  gibt. Seitdem wird gegen den Body gemessen.
- *„Strich zurück" (Station 8 → 17):* Gesperrt hatte der Knopf 4,03:1. Der Test
  maß erst nach dem ersten Strich und übersah das.
- *Wischen nach links (Station 6):* Der Test prüfte den Zähler. Aber „Nicht"
  lässt den Zähler absichtlich stehen. Richtig ist, die Bewertungszeile zu
  prüfen.

**Regeln:**

- Meldet ein Test etwas Überraschendes: erst die Messung prüfen, dann den Code.
- Meldet ein Test **nichts**: kurz prüfen, ob er überhaupt hätte anschlagen
  können. Er muss **alle Zustände** abdecken (vorher/nachher, gesperrt/aktiv,
  leer/voll).
- Ein Test, der dauerhaft rot ist, ist wertlos, weil ihn niemand mehr ansieht.

### 5.4 Die Attrappe muss so streng sein wie die Wirklichkeit

- *Station 1:* Die Attrappe ließ unbestätigte Konten lesen, die echten Regeln
  nicht. Der Test schaltete deshalb das Thema falsch um. Korrigiert: Der Stub
  spiegelt die Regeln.
- *Station 15:* Dem Test-Speicher fehlte `lastSignInTime`. Die neue
  Frische-Prüfung (`kontoAnmeldungFrisch()`) lief deshalb in einen anderen
  Zweig.

**Regel:** Wer eine neue Firebase-Eigenschaft benutzt (Feld, Fehlercode,
Metadaten), baut sie zuerst in `stubs.js` nach. Und zwar mit dem Verhalten der
echten Regeln, nicht großzügiger.

### 5.5 Jeder Zustand, jedes Gerät

- Daten: leer · 1 · viele (300+ Karten) · sehr langer Text · Arabisch mit
  Harakat · arabische Namen für Bereiche und Lektionen (Beobachtung 7).
- Netz: offline · Fehler · langsames/hängendes Netz (nie ewig „Lädt…", § 6.7).
- Darstellung:
  - hell und dunkel;
  - `prefers-reduced-motion`;
  - Tastatur;
  - Bildschirmleser-Namen.
- Geräte: Handy 390 · klein 320/360 · iPad hoch und quer · Desktop 1440 ·
  Querformat.
  - *3.2.1:* Die Bühne saß am iPad 120 px daneben. Am Handy greift die
    900-px-Regel nicht, also fand kein Handy-Test das.
  - *3.0.52:* Die Einstellungen waren am Handy **unerreichbar**. Ihr einziger
    Knopf lag in einer Leiste, die unter 900 px ausgeblendet ist.
  - **Jede Funktion muss auf jeder Breite erreichbar sein.**

### 5.6 Was der Agent nicht prüfen kann – und dann ausdrücklich sagt

- echtes iOS: Home-Bildschirm-App, `innerHeight`, Tastatur, Gummiband,
  bfcache nach OAuth-Weiterleitung;
- echtes Firebase: Regeln live, E-Mail-Zustellung, Google-Konto löschen;
- Gefühl einer Bewegung (ein Standbild zeigt keine Animation).

Solche Punkte gehen als konkreter Gerätetest an den Betreiber: was er antippt
und was er sehen muss.

### 5.7 Videos und Bilder auswerten

- Untertitel reichen für Muster, **nicht** für Namen und Zahlen auf dem
  Bildschirm. Im ersten Durchgang waren drei App-Namen falsch
  (`onboarding/VIDEO-BEFUND.md` §0.1). Wer zitiert, schaut die Bilder an.
- Kontaktbogen (`bogen.py`) bei vielen Bildern klein halten, sonst werden die
  Dateien riesig. Lieber einzelne Bilder ansehen.

---

## 6. Oberfläche: Regeln aus Funden

Die fünf Muster der Prüfschleife (Stationen 1–18, `audit/LOGBUCH.md`) stehen
zuerst: Sie sind am häufigsten aufgetreten.

### 6.1 Nichts erscheint nachträglich über dem Finger

- Was aufgetreten ist:
  - Meldungen, Fehlerzeilen und Leisten, die erst nach dem Tippen erscheinen,
    schoben Knöpfe weg. Gemessen: 30 bis 214 px in den Stationen 2, 3, 4, 10,
    11 und 16.
  - Nach einer ähnlichen Rückmeldung ergänzt: *„Merken" → „Gemerkt"* machte
    den Knopf 8 px breiter.
- **Regel:**
  - Platz für Meldungen ist **vorher** reserviert, oder die Meldung steht
    **unter bzw. neben** der Handlung.
  - Wechselnde Beschriftungen haben feste Breite: beide Wörter übereinander,
    `.merk-btn__wort`.
  - Der Weiter-Knopf im Einstieg steht unten fest.
  - **Ein Knopf, der an der Stelle eines gerade gedrückten erscheint, nimmt
    nicht sofort Tipps an** – schon gar nicht, solange er noch unsichtbar
    einblendet. *Vorfall 3.17.25:* „Antwort zeigen" → an derselben Stelle
    „Fast" (Deckkraft 0 bis 240 ms); ein zweiter Tipp bewertete blind.
    Sperre `BEWERTEN_SPERRE_MS`, Test `t_doppeltipp.js`.

### 6.2 Neue Teile in **alle** zentralen Listen eintragen

| Neu gebaut | Muss eingetragen werden in |
|---|---|
| Blatt oder Overlay | `schliesseObersteEbene`, `overlayIstOffen`, `overlaySchluessel`, `blattOffen` in `renderToast`, `tabSchonAktiv` |
| Klick-Handlung | der **eine** delegierte Listener über `data-action` (auf `body`, § 3.4) |
| Kind im Lernen-Raster (≥ 900 px) | Liste der rechten Spalte `.view--lernen > …` (Station 17) |
| Einstellung, die in die Cloud geht | `normSettings()` **und** `firestore.rules` `settingsOk()` **und** Emulator-Test **und** Regel-Deploy (§ 8.1) |
| neuer `localStorage`-Schlüssel oder Fremddienst | Datenschutzerklärung (§ 12) |
| neue Datei zum Start | `APP_SHELL` (§ 4.1) |

**Vorfälle:**

- In 3.17.0 fehlten die Hinweise im Desktop-Raster.
- Das Erinnerungs-Blatt schloss nicht, weil es in den Overlay-Listen fehlte
  (Station 14).

### 6.3 Zustand gehört in `ui`, nie nur ins DOM

`render()` ersetzt `#app` komplett. Alles, was nur im DOM steht, ist danach
weg.

- 3.6.8: Die Hochzähl-Animation lief bei jedem Besuch neu.
- 3.4.0: Anmelde-Eingaben wurden nach jeder Fehlermeldung gelöscht. Behoben mit
  `authEingabenMerken`.
- Station 8: Der Schalter „Mit Schreiben" ging still aus.
- Station 10: Der Fokus am Ziehgriff war nach einem Schritt weg.
- Station 11: Eine angefangene Karte ging still verloren. Behoben mit
  `karteEntwurfOffen`.

Getippte Eingaben, Schalter, Fokus, Scroll-Lage und „schon gezeigt"-Merker
halten.

### 6.4 Bewegung

- Eintrittsbewegungen sind `@keyframes` (README), nicht `transition` auf einem
  frisch eingefügten Element.
- Sie laufen nur beim Bildschirmwechsel. `#app.still-ansicht` unterdrückt sie
  bei jedem anderen Neuzeichnen. Sonst „flackert" die Liste bei jedem Tippen:
  - 3.6.13: Blinken nach dem Nav-Fix;
  - Einstellungen hinter einem offenen Blatt.
- Nur das Neue bewegt sich:
  - 3.2.2: Beim Aufdecken blendete früher das Wort mit auf; heute markiert die
    Klasse `zugedeckt` den Unterschied.
  - Eine Bewegung pro Ursache, 150–450 ms.
- Lange Listen: höchstens die ersten ~14 Zeilen animieren, dazu
  `content-visibility` (3.17.6).
- `prefers-reduced-motion`:
  - Bewegung aus, **Inhalt trotzdem erreichbar**. Was nur durch eine
    Animation sichtbar wird (z. B. die Rückseite einer drehenden Karte),
    braucht einen zweiten Weg, etwa Antippen.
  - Auch JavaScript-Bewegung muss die Einstellung respektieren. `tickCountups`
    tat das vor 3.3.0 nicht.
- Kein Endlos-Loop, der Aufmerksamkeit zieht. Automatische Bewegung über 5 s
  braucht nach WCAG 2.2.2 einen Stopp.
- **Eine Bewegung, die etwas zeigen soll, endet bei dem, was sie zeigt.**
  3.17.20 ließ die Beispielkarte im Einstieg hin *und zurück* drehen, damit
  man das arabische Wort am Ende wieder sieht. Ergebnis: Die Übersetzung war
  nur ein Aufblitzen, und der Betreiber (24.09.2026) meldete: „soll kitaab
  nicht einmal ins deutsche nur damit es direkt wieder in arabische umgedreht
  wird … es soll ja alles vom user verfolgt werden können". Seit 3.17.22 hält
  die Karte das Wort 2,4 s, dreht **einmal** und bleibt auf der Übersetzung.
  Wer beides sehen will, tippt.
- **Automatische Zustandswechsel an einem bestehenden Element laufen über den
  Zustand, nicht über eine haltende Animation.** Eine Animation mit
  `both`/`forwards` hält einen Wert fest, den die spätere `transition` nicht
  mehr überschreiben kann, ohne dass ein eigener Stil-Durchlauf dazwischen
  liegt — genau daran scheiterte der erste Tipp in 3.17.20 (Reflow-Kniff in
  3.17.21, ganz weg in 3.17.22). Besser: ein Timer setzt dieselbe Klasse, die
  auch das Antippen setzt. Dann ist der sichtbare Zustand immer der
  gespeicherte. Bei `prefers-reduced-motion` wird der Timer gar nicht gesetzt.
- **Energie sparsam, gerade bei Wiederholung.** Nachfedern
  (`--ease-spring`, Überschwingen im Keyframe) wirkt bei *einem* Element
  lebendig und bei fünf nacheinander unruhig; zweifaches Aufleuchten wirkt wie
  Werbung. 3.17.22 hat deshalb für Reihen ein eigenes, ruhiges Keyframe
  (`einstieg-punkt-ruhig`) und lässt das Aufleuchten einmal laufen.
  Betreiber: „die energie könnte ein ticken runter geschraubt werden entweder
  oder die transition ist cleaner bei sowas."
- **Zusammengesetzte Zeichen (Pfeile, Verbinder) brauchen dieselbe
  Strichstärke wie ihre Linie und Abstand zum nächsten Element.** Die
  Pfeilspitze der Einstiegs-Leiste war doppelt so dick wie die Linie wirkte
  und saß mit ihrer Ecke auf dem nächsten Punkt — Betreiber: „schau mal bitte
  dass diese pfeil sachen wie eine richtige ui aussehen" (3.17.22).

### 6.5 Farben und Kontrast

- Nur Token verwenden. Eine nicht definierte Variable macht die ganze
  Deklaration ungültig, **ohne Fehlermeldung** (`--accent-rgb`, § 3.3).
- Halbdurchsichtige Farbe unter Text kippt je nach Untergrund unter 4,5:1. Dann
  feste Token nehmen (`--stufe-1-fest`, `--stufe-2-fest`, Station 9).
- Halbdurchsichtige Leisten mit `backdrop-filter` wirken je nach Inhalt dahinter
  verschieden hell: Messung RGB 48 vs. 25. Deshalb 95 % Deckkraft (3.8.7).
- Schreib-Tinte im Dunkelmodus: nie dunkel auf dunkel (3.15.0).
- Betreiber: „so etwas Kleines wie dass nicht mit braun oder dunkler Tinte auf
  schwarz geschrieben wird, erwarte ich."
- Hover-Farbe nicht fest `#fff`. Im hellen Thema sprang der dunkle Knopf sonst
  auf Weiß (3.4.4).

### 6.6 CSS-Fallen, die hier schon zugeschlagen haben

| Falle | Vorfall | Richtig |
|---|---|---|
| `font: inherit` setzt auch `font-weight` zurück | Rechtslinks zu dünn (Phase 5) | `font-family: inherit; font-size: inherit` einzeln |
| `<svg>` ohne `width`/`height` | Logos riesig, solange CSS alt war (3.4.7) | Größe am Element |
| `dvh` wächst mit der Browserleiste | Scrollraum „aus dem Nichts" (3.0.50) | `svh` für Mindesthöhen |
| `position: fixed` + iOS-Tastatur | Blatt hinter der Tastatur (3.8.1) | `visualViewport` messen → `--tastatur` |
| `touch-action: manipulation` beim Ziehen | Seite scrollte mit (3.0.42) | `touch-action: none` am Griff |
| `user-select: none` nur am Griff | Text daneben wurde markiert (3.0.39) | ganze Zeile + `-webkit-touch-callout: none` |
| `color-scheme` fest auf `dark` | helles Thema falsch dargestellt (3.0.20) | aus dem Thema ableiten |
| Eingabefeld unter 16 px | iOS zoomt hinein (3.1.0) | 17 px Wurzel |
| `type="search"` | zweites, natives X | `type="text"` + `aria-label` (Station 18) |
| `.view` ohne `min-height` | Wischen in der leeren Fläche eines leeren Bereichs tat nichts, weil `#app` dort schon zu Ende war (3.8.3) | `min-height`; Listener hängen an `#app` |

### 6.7 Rückmeldung, Warten, Fehler

- Jedes Tippen hat **sofort** sichtbare Rückmeldung (Station 4).
- Während gespeichert wird, ist der Knopf gesperrt. Sonst entstehen doppelte
  Einträge: Das Feedback-Board ließ sich in 3.9.1 doppelt einreichen.
- **Jedes Warten auf das Netz hat ein Zeitlimit:**
  - Anmelden: `mitZeitlimit`, 12 s.
  - Laden: 9 s bis „dauert länger als sonst" + „Erneut versuchen".
  - Station 1: der Startbildschirm hing endlos.
  - 3.9.2: das Ideen-Board hing ewig bei „Lädt…".
- Ein spät eintreffendes Ergebnis eines aufgegebenen Versuchs wird verworfen
  (laufende Nummer, `feedbackLadeToken`).
- **Popups haben kein Zeitlimit.** Dort wartet ein Mensch (Kommentar bei
  `signInWithPopup`).
- **Nie automatisch neu versuchen nach einem Fehlschlag.** *3.9.1:* Die
  Lade-Bedingung wurde nach dem Fehler wieder wahr, das ergab eine
  Endlosschleife. Die zerstörte die fokussierten Felder (Flackern), der Nutzer
  kam nie über „Lädt…" hinaus. Nach einem Fehler: Knopf „Erneut versuchen".
- Fehler stehen am Feld, nicht im Dialog (3.4.2). Nie ein nackter `alert()`,
  immer `dlgAlert` (3.0.30).
- Der Startfehler braucht einen Ausweg: Abmelden, neu laden (Station 16).

### 6.8 Riskante Handlungen

Betreiber: „wenn man sich abmelden will oder löschen … Risiko bitte nicht so
einfach zulassen."

- Abmelden: mit Rückfrage.
- Konto löschen:
  - eigene Seite, Gedrückthalten;
  - **zuerst neu anmelden**, dann Sicherung, dann löschen.
- Neu anmelden **je nach Anbieter**:
  - Passwort-Abfrage bei E-Mail-Konten;
  - Popup bei Google und Apple (`kontoNeuAnmelden`).
- **Vorfall Station 15:** Google-Konten ließen sich **gar nicht** löschen, weil
  eine Passwortabfrage verlangt wurde. Außerdem kam die Neu-Anmeldung erst
  **nach** dem Löschen der Daten. Scheitert sie dann, sind die Daten weg und das
  Konto bleibt.
- **Regel:** Alles, was scheitern kann, kommt **vor** dem ersten Schritt, der
  sich nicht zurücknehmen lässt.
- Nach dem Löschen darf die App das Nutzerdokument nicht neu anlegen
  (3.0.6: das tat sie). Listener und Schreibvorgänge vorher stoppen.

### 6.9 Hick's Law und „nichts doppelt"

- Ein Bildschirm, eine Aufgabe. Wer mehr zeigen will, baut eine **Seite**,
  keine weitere Zeile (Block 2).
- Erklärungen werden **verlegt, nicht gelöscht**: ins Wahl-Blatt oder auf die
  Unterseite, dorthin, wo entschieden wird.
- Nichts doppelt:
  - die Serie nur auf Lernen;
  - „alles erledigt" nur einmal (Station 5);
  - ein Ausgang statt zwei am Rundenende (Station 7).
- Keine Systemzahlen, die die Methode verraten (Intervalle, Stufengrenzen).
  Stufen heißen in Worten, die Grenzen stehen nur im Code (3.12.1, 3.13.0).
- Eine Funktion, die im Einstieg nur angedeutet wird, benutzt fast niemand.
  Der Kartensatz wird dort deshalb konkret benannt: „per Code" (3.11.0).

### 6.10 Barrierefreiheit

- Jeder Bildschirm hat eine Überschrift (`h1`). Bis 3.17.18 hatte nur „Guten
  Tag" eine.
- Icon-Knöpfe und Suchfelder haben einen Namen.
- Blätter sind als Dialog benannt.
- Meldungen haben `aria-live`.
- Der Fokus ist sichtbar (nie `outline: none` ohne Ersatz).
- Alles, was man ziehen kann, geht auch mit Pfeiltasten (3.0.26). Der Fokus
  bleibt dabei auf der bewegten Zeile.
- Die Tastatur bedient die Knöpfe der Runde, aber nicht durch offene Dialoge
  hindurch (Station 6).
- Dekoratives bekommt `aria-hidden="true"`. Ist es aber bedienbar (z. B. eine
  antippbare Karte), braucht es Rolle und Namen.

---

## 7. Texte

### 7.1 Sprache

- Du-Form, kurze Sätze, **ein** Satz statt drei. Betreiber: „nicht dieses und
  jedes Mal blablabla".
- Einzahl und Mehrzahl über `mz(n, "Karte", "Karten")`. Nie „Karte(n)", nie
  „1 Karten":
  - Station 5: „Morgen kommen 1 Karte";
  - Station 13: „(n)" an 9 Stellen.
- **Keine Systemsprache:**
  - kein `e.code` oder `e.message` im Text, stattdessen `fehlerKlartext(e)`;
  - kein ISO-Datum;
  - keine Abkürzungen;
  - kein Englisch.
- Einheitliche Wörter: „Runde", nicht „Sitzung" (Station 14). „Adrabic", nicht
  „Wiederholung" als Name.
- Zähler zählen, wo man steht: „Karte 1 von 11", nicht „0 von 11" (3.2.1).
- Nichts, was eine Zahl als Stillstand liest („0 Tage").

### 7.2 Nur versprechen, was der Code tut

- „Wissenschaftlich bewährt" war unbelegt und wurde ersetzt durch die sichtbare
  Mechanik (3.0.20). Im Impressum steht eine haftende Person.
- „Kein Tracking" stimmte nach dem Einbau der Statistik nicht mehr
  (Station 2).
- „Danach legst du direkt deine erste Karte an": Das Versprechen verschwand
  genau auf der Bestätigungsseite (3.3.2).
- Löschwünsche per Wortlaut-Abgleich waren eine selbst erfundene Zusatzpflicht
  und wurden entschärft (3.8.6).

**Regel:** Es wird nur versprochen, was rechtlich nötig ist oder was der Code
nachweislich tut.

### 7.3 Texte, die Logik beschreiben, ändern sich mit der Logik

- **Vorfall 24.09.2026:** „Noch offen für die Serie: Bereich X (3)" auf Lernen.
  - Seit 2.14.0 zählt ein Tag, sobald **irgendeine** Karte gelernt wurde.
  - Andere Bereiche sind für die Serie egal. Der Satz behauptete das Gegenteil.
  - Behoben in 3.17.19: „Heute auch fällig: …".
- Wer an Serie, Runde, Limit oder Freischalten etwas ändert, sucht per `grep`
  nach **allen** Sätzen darüber: Einstieg, Hinweise, Rundenende, Fortschritt,
  Einstellungen, Hilfe.

### 7.4 Texte, die aus Bausteinen zusammengesetzt werden, am Bildschirm lesen

- *Einstieg:* Der Satz lautete „Wenn ich nach dem Maghrib-Gebet, dann mache ich
  eine Runde." Knopfbeschriftung und Satzbaustein waren dasselbe Feld; getrennt
  in `label` und `satz`.
- *Echo:* „aus Quran und Sunnah und deinem Kurs" wurde „sowie".
- *Echo:* „aus dem, was du gerade lernst – die du gerade lernst" (3.10.3).

**Regel:** Jede Kombination einmal im Browser erzeugen und lesen.

---

## 8. Firebase: Regeln, Anmeldung, Daten

### 8.1 Firestore-Regeln sind eine Positivliste

- `settingsOk()` erlaubt genau die Felder `arabGroesse`, `lastBackup`, `thema`
  und `sitzungsLimit`.
- `persistSettings()` schreibt das **ganze** `settings`-Objekt.
- **Ein** unbekanntes Feld lässt deshalb **jeden** Einstellungs-Speichervorgang
  scheitern.
  - *Vorfall:* `sitzungsLimit` kam in 3.0.27 dazu, ohne Regel.
  - Drei Tage lang schlug jedes Speichern fehl.
  - Zuerst wurde fälschlich der Browser-Key verdächtigt. Der entscheidende
    Test war: Karten speichern ging, Einstellungen nicht.
- Dasselbe gilt für `nutzerFelder()`, `bereichFelder()` und jede Sammlung.

**Regeln:**

- Neues Feld in einem Dokument → Regel anpassen →
  `plan/phase-1-datenzugriff/regeln-pruefung.mjs` erweitern → im Emulator
  laufen lassen (Java nötig) → Betreiber deployt (§ 4.5).
- Beim Suchen der Ursache eingrenzen: Was geht, was geht nicht? Dann das
  kleinste scheiternde Dokument und Feld finden.
- **Klammern in gemischten `&&`/`||`-Ketten** sind Korrektheit, nicht Stil. Im
  Feedback-Board ließ eine Kette zu lange Texte durch (`regeln-pruefung.mjs`,
  Kommentar „Lehre").
- Nur auf dem Gerät (`localStorage`) liegen:
  - `adrabic-einstieg-antworten` – nur Schriftgröße und Rundengröße aus dem
    Einstieg, **keine** Ziele oder Hürden;
  - `adrabic-einstieg-nachklang`, `adrabic-hinweise`,
    `adrabic-statistik-aus`, `adrabic-selbstheilung`, `adrabic-last-backup`,
    `adrabic-token-erneuert*`;
  - `adrabic-thema`, zusätzlich zu `settings.thema` in der Cloud, damit das
    Kopfskript vor dem Laden die richtige Farbe setzt.

  Wer etwas in die Cloud verlegen will, beginnt bei den Regeln. Jeder neue
  Schlüssel gehört in die Datenschutzerklärung (§ 12).

### 8.1a Nie „alles neu schreiben" als Antwort auf einen Fehler

*Vorfall bis 3.17.29 (Großplan G-003, kritisch):* `patchDoc` antwortete auf
`not-found` mit `persistAll()`. Gedacht war das für das frische Konto. Es
griff aber bei **jedem** fehlenden Dokument, also immer dann, wenn ein anderes
Gerät eine Karte oder einen Bereich gelöscht hatte. `persistAll()` schrieb
alle Bereiche ohne merge und nur mit `name/order/sets` neu. Damit waren
Teilen-Code, Lehrer-Freigabe und „geführt" weg, und Gelöschtes stand wieder
auf.

**Regeln:**
- Ein Fehler-Fallback schreibt nie mehr als das, was gerade scheiterte.
- „Dokument fehlt" heißt bei mehreren Geräten meistens „anderswo gelöscht".
  Die Löschung gewinnt.
- Ein Vollschreiben nimmt **alle** Felder der Positivliste mit
  (`bereichFelder()` ohne `karten`), nie eine Auswahl von Hand.

### 8.1b Regel-Risiko heißt auch: Schaden an Fremdem

*Vorfall 25.09.2026 (G-014):* Der Regelkommentar zum Board nahm nur das
**Aufblähen** eigener Stimmen in Kauf. Übersehen war das **Sabotieren**: Ein
fremdes Konto drehte jede Idee per −1 auf 0 (Emulator E11). Behoben mit
`exists`/`existsAfter`.
**Regel:** Wer ein Risiko in den Regeln „bewusst in Kauf nimmt", prüft beide
Richtungen: Was kann jemand an **eigenen** Daten verbiegen, und was an denen
**anderer**?

### 8.2 Bestätigte E-Mail und veralteter Ausweis

- Die Regeln prüfen `email_verified` **am ID-Token**.
- Bis zu 1 h nach dem Bestätigen ist der Ausweis im Browser veraltet: Das
  Konto ist bestätigt, der Token sagt nein.
- **Regel:** Bei `permission-denied` einmal je Sitzung den Ausweis erneuern.
  - Beim Lesen gibt es das seit 2.11.4.
  - Beim Schreiben seit 3.4.5 (`ausweisErneuernFuerSchreiben`), ohne Reload,
    damit ein offenes Formular bleibt.
  - **Erneuern allein reicht nicht:** Der abgelehnte Schreibvorgang ist weg,
    Firestore nimmt ihn auch lokal zurück (die bewertete Karte war wieder
    fällig). Was automatisch geschrieben wird (Bewertung, Tagesprotokoll),
    schickt die App nach dem Erneuern selbst nach (`abgelehntesNachholen`,
    3.17.28).

### 8.3 Snapshot-Echos

- `hasPendingWrites` soll das Echo **eigener** Schreibvorgänge ignorieren.
- Es blockte aber die **erste** Momentaufnahme nach einem Neustart, wenn noch
  ein ungesendeter Schreibvorgang aus der letzten Sitzung lag.
- Folge: Serie und Verlauf blieben leer, die Serie „änderte sich
  unberechenbar" (Beobachtung 17).
- Heute greift der Schutz nur, wenn schon echte Daten geladen sind
  (`cloudDocExists`, 3.5.1).

### 8.4 Wenn Regeln (noch) fehlen

Eine Funktion, deren Regel nicht deployt ist, bekommt `permission-denied`. Sie
muss:

1. eine Meldung in Worten zeigen (`fehlerKlartext`);
2. **nicht** automatisch neu versuchen (§ 6.7);
3. den Rest der App nicht mitreißen.

### 8.5 Anmeldung

- **Neu anmelden je Anbieter:**
  - `reauthenticateWithCredential` mit Passwort bei E-Mail-Konten;
  - `reauthenticateWithPopup` bei Google und Apple.
  - `requires-recent-login` tritt beim Löschen und bei Passwort- oder
    E-Mail-Wechsel auf.
- **Popup → Weiterleitung auf iOS:** Kommt man von dort mit Zurück, stellt der
  bfcache die App mit `authBusy = true` wieder her, und alle Knöpfe drehen sich
  endlos. `pageshow` mit `event.persisted` setzt den Zustand zurück (3.4.11).
- `popup-closed-by-user` ist kein Fehler, sondern ein Abbruch: keine
  Fehlermeldung.
- Apple ist fertig gebaut, aber ausgeblendet (`APPLE_LOGIN_BEREIT`). Es braucht
  das kostenpflichtige Apple-Developer-Konto. Konsole und Schalter gehören
  zusammen.

### 8.6 Sparsam lesen

- Kein Dauer-Listener, wo ein `getDoc` reicht. Beispiel Lehrer-Stand: beim
  Start, beim Bereichswechsel, bei der Rückkehr, höchstens 1×/min.
- Offline sind Funktionen, die das Netz brauchen, gesperrt, mit Hinweis: Code
  erzeugen oder beenden (3.6.12). Datei-Export geht offline weiter.

### 8.7 Erst lokal lesen, dann anwenden

*3.10.2:* `themaAnwenden()` lief beim Laden mit der Grundeinstellung „dunkel".
Das überschrieb `localStorage` **bevor** die Cloud-Daten da waren. Folge:

- helles Thema, dann dunkel, dann wieder hell;
- offline blieb es dunkel.

**Regel:** Gespeicherte Wahl zuerst lesen, dann anwenden. Nie mit
Voreinstellungen etwas Gespeichertes überschreiben.

### 8.8 Der API-Schlüssel ist öffentlich – und das ist richtig so

- Web-Apps liefern den Firebase-`apiKey` aus. `.env` passt nicht (kein
  Build-Schritt, steht in `README.md`).
- Der Schutz liegt an drei Stellen:
  - `firestore.rules`;
  - Website-Einschränkung des Browser-Keys (Google Cloud);
  - „Authorized domains" (Firebase Auth).
- Phase 4 fand einen **unbeschränkten** Key mit Missbrauchsspuren.

---

## 9. Hosting, Domains, CSP

### 9.1 Neue Adresse (Domain oder Hosting-Site)

Sonst schlägt die Anmeldung fehl. Diese Schritte muss der Betreiber in der
Konsole machen:

1. Firebase → Authentication → Settings → **Authorized domains**: Domain
   hinzufügen.
2. Google Cloud → APIs & Services → Credentials → Browser-Key → **Website
   restrictions**: `https://<domain>/*` hinzufügen.
   - Woran man merkt, dass es fehlt: Die Anmeldung meldet
     `auth/requests-from-referer-https://<domain>-are-blocked`.
3. Search Console: Property anlegen, `sitemap.xml` einreichen.
4. Im Repo:
   - `canonical`, `og:url`, `robots.txt`, `sitemap.xml`;
   - `firebase.json` (Site-Eintrag).

### 9.2 CSP

- Jede neue fremde Ressource (Skript, Iframe, Verbindung, Schrift, Bild) muss in
  die CSP in `firebase.json`.
- Das Google-Popup braucht beides:
  - `frame-src` für die `authDomain` (3.4.8);
  - `apis.google.com` in `script-src`, `connect-src` und `frame-src` (3.4.9).
- Inline-Skripte sind per **Hash** erlaubt. Jedes geänderte Byte (auch ein
  Kommentar) macht den Hash ungültig, und das Skript läuft still nicht.
  *3.0.21:* Das Thema-Skript der Startseite lief seit Phase 6 nie.
- Bei CSP-Fehlern **die Browser-Konsole lesen** statt zu raten. Die Meldung
  nennt die Quelle.
- Danach § 4.3 (`csp-build`).

### 9.3 Cache-Header

HTML hat `max-age=0`, `.js` und `.css` haben `max-age=3600`. Deshalb die
Versions-Queries (§ 4.1). Phase 7 hat das HTML-Caching mit `max-age=0` gelöst.

---

## 10. E-Mails

### 10.1 Bestätigungs- und Passwort-Mails landen im Spam

- **Ursache**: nicht der Code. Firebase verschickt standardmäßig von
  `noreply@<projekt>.firebaseapp.com`, ohne eigene Domain-Reputation.
- **In der App** (erledigt): Der Spam-Hinweis steht fest auf der
  Bestätigungsseite (`renderPendingVerification`), nicht nur in einer
  flüchtigen Meldung.
- **In der Konsole** (Betreiber): Firebase → Authentication → Templates →
  Absendername („Adrabic"), Antwortadresse. Wirksam gegen Spam ist erst eine
  **eigene Absender-Domain** mit SPF/DKIM. Das braucht eine eigene Domain, die
  es noch nicht gibt.

### 10.2 Formulare ohne Server

- Kontakt und Fehler gehen per `mailto:`:
  - Honeypot gegen Spam;
  - die Adresse steht verschlüsselt im Code (`String.fromCharCode`);
  - der Fehlertext bleibt erhalten, wenn man zurückkommt (Station 14).
- Fertig ist so ein Formular erst, wenn eine **Testnachricht angekommen** ist
  (Phase 8).
- Links in Auth-Mails auf offene Weiterleitungen prüfen (`continueUrl`). Das
  ist geprüft, ohne Fund.

---

## 11. iOS und Geräte

- **Home-Bildschirm-App:** `innerHeight` schwankt je nach Scrollbarkeit
  (848/896 px); `visualViewport` zeigt denselben falschen Wert.
  - Lösung (3.6.14): feste Höhe aus `screen.*`, die Leiste von oben
    verankert.
  - Vorsicht, Vorzeichen: 3.6.6 addierte statt zu subtrahieren.
- **Tastatur:** Sie verkleinert nur den sichtbaren Bereich. Deshalb misst
  `syncTastatur()` und setzt `--tastatur` für Blätter und Dialoge. `dvh` hilft
  dabei **nicht**.
- **Start-URL:** Die installierte App verliert URL-Parameter (`start_url`).
  Schalter per URL funktionieren dort nicht. Das Mess-Overlay aus 3.6.4/3.6.5
  ließ sich deshalb per 7× Tippen auf die Version einschalten. Seit 3.6.13 ist
  es entfernt (§ 3.9).
- **Startbilder** (`splash/`) müssen pro Gerätegröße passen. Geprüft wird das
  am echten Gerät.
- **Kalender-Erinnerung** läuft über `.ics` (`text/calendar`). iOS muss das am
  Gerät bestätigen (offen beim Betreiber).

---

## 12. Recht und Datenschutz

- **Keine Rechtsberatung durch den Agenten.** Er recherchiert, weist hin und
  verkleinert die Architektur, damit weniger Rechtsfragen entstehen. Entscheiden
  und prüfen lassen muss eine echte Person, denn der Vater haftet.
- **Die Datenschutzerklärung muss jeden Datenfluss nennen.** Wer einen Fluss
  hinzufügt oder ändert, ändert im selben Commit den Text.
  - *Phase 5:* Der Name (Pflichtfeld) fehlte in der Aufzählung.
  - *3.8.x:* Nach dem Feedback-Board stimmte „niemand sieht fremde Daten"
    nicht mehr (neuer Abschnitt 6).
  - *3.17.0:* Die Statistik brauchte einen neuen Abschnitt (§ 15).
  - Der Abschnitt 11 wurde angepasst, als das Fehlerformular kleiner wurde.
- Betroffen sind:
  - neuer `localStorage`-Schlüssel;
  - Fremdserver (Schrift, Statistik);
  - neue Sammlung;
  - neue Sichtbarkeit.
  Das gehört in die Datenschutzerklärung, und der Betreiber lässt es prüfen
  (offen: J1/F5).
- **Minderjährige (C5):** Das ist eine harte Sperre für alles, was Daten über
  Konten hinweg speichert. Sie wurde für das Teilen durch Architektur umgangen,
  nicht beantwortet.
- **Religiöse Angaben** werden nicht gespeichert (§ 2 Punkt 5).
- **Verträge mit Dienstleistern nie als „automatisch" annehmen.** Ob ein
  Auftragsverarbeitungsvertrag gilt, steht in der Doku des Anbieters — nachlesen
  und die Quelle ins Logbuch. *Vorfall 24.09.2026:* PostHog verlangt eine eigene
  Unterschrift.
- **Keine Dateien von fremden Servern einbinden** (Schriften, Bilder, Skripte),
  außer vom Auftragsverarbeiter selbst (Firebase/gstatic). Der fremde Server
  bekommt sonst die IP-Adresse (LG München I, 3 O 17493/20). Selbst ausliefern
  – Lizenz prüfen, Datei unverändert lassen. Bilder aus fremden Kartensätzen
  nur als Link (`renderExtra(…, fremd)`). *Vorfall 3.17.24:* Quran-Schrift.
- **Beim Löschen alle Orte mitnehmen,** auch Sammlungen außerhalb von
  `users/{uid}` (`geteilteLektionen`, `feedback/*/votes/{uid}`). Das Versprechen in Punkt 12 gilt für
  alles, was ein Konto irgendwo hinterlässt. *Vorfall 24.09.2026.*
- **Nur versprechen, was rechtlich nötig ist** (§ 7.2). Keine selbst erfundenen
  Zusatzpflichten für den Betreiber.
- Rechtstexte sprechen von „der Betreiber", nicht „wir": Dort steht eine
  Privatperson.
- Rechtslinks haben eine eigene, ruhige Form (`.rechtsfuss`), nicht die Form
  einer Bedienhandlung.

---

## 13. Bekannte Stolperstellen im Code

| Stelle | Stand | Achtung |
|---|---|---|
| `render()` | ersetzt `#app` komplett | § 6.3, § 6.4 |
| Klick-Delegation | **ein** Listener auf `body`, `data-action` | nie eigene Listener an Knöpfe |
| `serieAktuell()` | Serie aus `verlauf`; ein Tag zählt ab der ersten gelernten Karte in **irgendeinem** Bereich (`tagGelernt`: w+n>0, Üben `u` zählt nicht). Seit 3.17.20: Ein ausgelassener Tag wird verziehen, der Joker lädt nach `SERIE_JOKER_TAGE` (7) gelernten Tagen wieder auf – **keine** einmalige Lebenszeit-Gnade mehr (Frage 18) | Lernlogik – nur mit Freigabe anfassen |
| `serieSockelSichern()` | stempelt bei **jedem** Laden `sockel`/`sockelBis`, sobald `streak.sockel` fehlt (`null`) – auch in Tests! Seit 3.17.28 zählt bei Sockel 0 der Sockel-Tag selbst mit (`serieAktuell`) | Prüfstand-Store für Serientests braucht ein gültiges `{sockel, sockelBis: <weit zurück>}`, sonst kurzschließt der Sockel jede Rechnung auf 0 (§ 15, 24.09.2026) |
| Speichern beim Lernen | jede Bewertung sofort (`persistCardGrade`); Wisch-Bewertung 150 ms verzögert → vor jedem Ende der Runde `wischNachholen()`; abgelehnte (`permission-denied`) Bewertungen werden nach Ausweis-Erneuerung nachgeschickt (3.17.28) | Firestore wiederholt eine **Ablehnung** nie selbst und nimmt sie lokal zurück – wer schreibt, muss selbst nachholen (§ 8.2) |
| `evaluateStreakForNewDay()` | absichtlich stillgelegt (`if (false && …)`) | nicht „reparieren" |
| `streak.lastCompletedDate` | tot seit 2.14.0 | nie wieder darauf bauen |
| `bereicheMitOffenem()` | nur noch für den Hinweis „Heute auch fällig" | kein Serien-Bezug |
| `SITZUNGS_LIMITS` | Limit gilt **je Runde**, danach „Weiterlernen" | die Serie hängt nicht am Limit |
| `EINSTIEG_ZIELE` / `ui.einstieg` | Antworten nur im Arbeitsspeicher | nie speichern (§ 2) |
| Nutzungsstatistik | **entfernt in 3.17.23** (Betreiber: „jede Spur“), Code, Schalter, CSP und Datenschutz-Abschnitt | nicht wieder einbauen ohne neue Betreiber-Entscheidung (§ 3.5) |
| `APPLE_LOGIN_BEREIT` | `false` | erst mit Konsole |
| Debug-Overlay | entfernt in 3.6.13; `localStorage` `debugNav` wird beim Start gelöscht | nicht wieder einbauen (§ 3.9) |
| `mitZeitlimit` | 12 s für Auth-Aufrufe | nicht für Popups |

---

## 14. Checkliste vor jedem Commit

Nicht als Ritual abhaken. Jede Zeile hat einen Vorfall (siehe oben).

1. Habe ich den Codepfad gelesen, nicht nur Kommentar oder Doku? (§ 3.2)
2. Wurde nach dem Muster im ganzen Repo gesucht? (§ 3.3)
3. Sind Texte, Hinweise und Kommentare, die die geänderte Logik beschreiben,
   nachgezogen? (§ 7.3)
4. Sind neue Blätter, Handlungen, Rasterkinder, Einstellungen und Speicher in
   allen zentralen Listen? (§ 6.2)
5. Liegt der Zustand in `ui`, nicht nur im DOM? (§ 6.3)
6. Springt nichts, ist der Kontrast gemessen, ist es flüssig mit CPU 4×, geht
   es auf allen Breiten? (§ 5.2, § 5.5)
7. Einzahl/Mehrzahl, keine Systemcodes, keine Methoden-Zahlen, ein Satz? (§ 7.1)
8. Neue Cloud-Felder: Regel, Emulator-Test, Deploy-Schritt für den Betreiber?
   (§ 8.1)
9. Neuer Datenfluss: Datenschutzerklärung im selben Commit? (§ 12)
10. `node --check app.js` ist sauber. (§ 4.2)
11. Die Version steht an vier Stellen gleich (`grep -F`), dazu `CHANGELOG.md`.
    Bei reiner `firebase.json`-Änderung zusätzlich `csp-build`. (§ 4.1, § 4.3)
    **Seit 3.17.30 prüft das `node plan/werkzeuge/pruefe_stand.mjs` in einem
    Schritt**, dazu die CSP-Hashes **aller** HTML-Seiten und `APP_SHELL`. Der
    Veröffentlichen-Knopf bricht ab, wenn es rot ist. Geänderte
    `firestore.rules`: `bash plan/werkzeuge/regeln_testen.sh` (Emulator, § 8.1).
12. Prüfstand: betroffener Test, Regression, bei Größerem der Affe. (§ 5.1)
    **Berührt die Änderung die Lernrunde** (Karte, Knöpfe, Wischen,
    Speichern, Serie): `node abnahme_runde.js` – alle 13 grün, die „(lesen)"-
    Ausgaben gelesen. Sonst wird nicht veröffentlicht (3.17.29).
13. Logbuch-Eintrag, `PLAN.md` „AKTUELL", offene Fragen. (§ 3.10)
14. Antwort mit „Was Du noch tun musst", wenn der Betreiber etwas tun muss.
    (§ 1.4)

---

### 4.x Gefühl auf Touch-Geräten (3.17.27)

- **Eine Fläche, die gewischt wird, darf nicht zugleich scrollen können**
  (3.17.29). `touch-action: pan-y` gibt jeden leicht schrägen Zug dem
  Browser: Seite rutscht, `pointercancel`, Karte springt zurück. Die Runde
  hat deshalb feste Bildschirmhöhe, die aufgedeckte Karte `touch-action:
  none`, Langes scrollt in einem eigenen Feld.
- **Ein Bildschirm im Modus ist nie höher als der Bildschirm.** Platzhalter
  für später Erscheinendes (Notiz) zählen mit – gemessen wird über eine
  ganze Runde mit langen Inhalten (`t_runde_lage.js`), nicht an einer Karte.
- **Kein Drück-Effekt auf etwas, das danach selbst eine Bewegung macht**
  (Karte: 0.97 → Drehung mit 1.035 = zwei Bewegungen gegeneinander).

- iOS-Safari zeigt `:active` nur, wenn die Seite einen `touchstart`-Listener hat — ohne ihn fühlt sich jedes Tippen verzögert an.
- Wischgesten werten den zuletzt selbst gemessenen Weg aus, nie die Koordinaten von `pointercancel` (die sind 0). Abbruch = zurückfedern, nie bewerten.
- Eine laufende CSS-Animation überschreibt ein Inline-`transform`: beim Greifen `animation: none` setzen.
- Gesten mit echten Touch-Ereignissen (CDP) testen, nicht mit Maus: `t_wischen.js`.

## 15. Vorfall-Liste

Kurzform: *was – Ursache – Regel*. Neue Vorfälle unten anhängen.

| Wann | Was | Ursache | Regel |
|---|---|---|---|
| 3.0.6 | gelöschtes Konto legte sich selbst wieder an | Listener schrieb nach dem Löschen weiter | § 6.8 |
| 3.0.21/22 | erfundener Kartensatz veröffentlicht | Inhalt ohne Freigabe | § 1.6 |
| 3.0.21 | Startseite ignorierte helles Thema | Inline-Skript wich vom CSP-Hash ab | § 9.2 |
| 3.0.23/24 | „Start fehlgeschlagen" blieb hängen | SW cachte Fehlantwort; festsitzender SW | § 4.4 |
| 3.0.27 → 18.09. | Einstellungen speicherten 3 Tage lang nicht | neues Feld ohne Regel | § 8.1 |
| 3.0.29/30 | Knöpfe im Fehler-Modal tot | Modal außerhalb der Klick-Delegation; nicht gegen Bestand geprüft | § 1.3, § 3.4 |
| 3.0.35–42 | Ziehen unzuverlässig, Seite scrollte mit | falsche Geste; `touch-action`; `user-select` nur am Griff | § 3.4, § 6.6 |
| 3.0.40 | Rückmeldung am Griff unsichtbar | nicht definierte Variable `--accent-rgb` | § 6.5 |
| 3.0.52 | Einstellungen am Handy unerreichbar | einziger Knopf in ausgeblendeter Leiste | § 5.5 |
| 3.2.1 | Lernbühne am iPad 120 px daneben | 900-px-Einzug im Modus vergessen | § 5.5 |
| 3.2.3 | Kontaktformular ohne Fokusrahmen | Muster nur an einer Stelle behoben | § 3.3 |
| 3.4.0 | Anmeldefelder nach Fehler leer | Zustand nur im DOM | § 6.3 |
| 3.4.5 | `permission-denied` beim Schreiben nach Bestätigung | veralteter ID-Token | § 8.2 |
| 3.4.7 | Google-/Apple-Logos riesig | SVG ohne Größe, CSS noch alt | § 6.6 |
| 3.4.8–10 | Google-Login scheiterte dreimal | CSP zu eng; 304 hielt alte CSP | § 9.2, § 4.3 |
| 3.4.11 | Anmelde-Knöpfe drehten endlos | bfcache nach Weiterleitung | § 8.5 |
| 18.09. | `adrabic.web.app`: Anmeldung blockiert | Browser-Key-Freigabe fehlte, war fälschlich „erledigt" | § 9.1, § 1.3 |
| 3.5.1 | Serie „unberechenbar" | `hasPendingWrites` blockte ersten Snapshot | § 8.3 |
| 3.5.4 | App-Änderung ohne Version | Liste nicht abgearbeitet | § 3.1, § 4.1 |
| 3.6.2 | App startete nirgends | typografische Anführungszeichen im Code | § 4.2 |
| 3.6.2 | „immer noch kaputt" nach Deploy | `app.js` ohne Versions-Query | § 4.1 |
| 3.6.1–14 | Nav-Leiste sprang (6 Meldungen) | falsches Element, dann `innerHeight`-Eigenheit, Vorzeichenfehler, „gelöst" zu früh | § 3.4, § 11, § 1.3 |
| 3.6.8 | Hochzählen lief bei jedem Besuch | Merker im DOM | § 6.3 |
| 3.6.13 | Scrollen 9× langsamer, grüner Kasten | Debug-Overlay nie abgeschaltet | § 3.9 |
| 3.6.13 | Fehler bei jedem Snapshot | toter Aufruf nach Entfernen | § 3.8 |
| 3.8.1 | Blatt hinter der iOS-Tastatur | `fixed` hängt am Layout, nicht am sichtbaren Bereich | § 11 |
| 3.8.7 | Leisten je nach Inhalt verschieden hell | halbdurchsichtig + Weichzeichner | § 6.5 |
| 3.9.1 | Ideen-Board flackerte, hing | automatischer Neuversuch als Schleife; Regel nicht deployt | § 6.7, § 8.4 |
| 3.9.2 | Ideen-Board hing ewig | kein Zeitlimit | § 6.7 |
| 3.10.2 | Thema sprang dunkel/hell | Voreinstellung überschrieb gespeicherte Wahl | § 8.7 |
| 3.10.3 | Echo-Satz doppelt/holprig | Bausteine nie zusammen gelesen | § 7.4 |
| 3.11.0 | Gestaltung bis 1 h unsichtbar; SW-Vorabcache traf nie | `styles.css` ohne Query; `APP_SHELL` ohne Query | § 4.1 |
| 3.11.0 | Plan-Aufbau kam nach Zurück nicht | Merker `planGebaut` nicht zurückgesetzt | § 6.3 |
| Einstieg | „Wenn ich nach dem Maghrib-Gebet, dann …" | Beschriftung = Satzbaustein | § 7.4 |
| Station 1 | endloser Startbildschirm | kein Zeitlimit | § 6.7 |
| Station 2–4, 10, 11, 16 | Knöpfe sprangen 30–214 px | Meldung ohne reservierten Platz | § 6.1 |
| Station 2 | „kein Tracking" falsch | Text nicht mit Funktion mitgezogen | § 7.2 |
| Station 5, 9, 13 | „1 Karten", „(n)" | keine Einzahl-Hilfe | § 7.1 |
| Station 6 | Rückgängig verlor Notiz, Tastatur durch Dialoge | Zustand/Ebenen nicht bedacht | § 6.3, § 6.10 |
| Station 7 | mit Rundenlimit „alle durch", kein Weiterlernen | Limit nicht im Rundenende bedacht | § 7.3 |
| Station 8 | Schreib-Schalter ging still aus | Zustand im DOM | § 6.3 |
| Station 12 | neuer Bereich erbte Auswahl und Suche | Zustand beim Wechsel nicht zurückgesetzt | § 6.3 |
| Station 13 | Code nur in exakter Schreibweise; englische Fehler | Eingabe nicht normalisiert; `e.message` im Text | § 7.1 |
| Station 13 (eigener Fehler) | normalisierter Code ohne Bindestrich | Format `XXXXX-XXXXX` nicht nachgelesen; `t_daten.js` fing es vor dem Veröffentlichen | § 1.3, § 5.3 |
| Station 14 | Erinnerungs-Blatt schloss nicht | fehlte in Overlay-Listen | § 6.2 |
| Station 15 | Google-Konten nicht löschbar; Neu-Anmeldung nach Datenlöschung | nur Passwort bedacht; Reihenfolge | § 6.8 |
| Station 17 | Raster am Desktop zerrissen; gesperrter Knopf 4,03:1 | Rasterliste vergessen; Test maß nur einen Zustand | § 6.2, § 5.3 |
| Station 18 | keine Überschriften für Bildschirmleser | nie geprüft | § 6.10 |
| Prüfstand | Thema falsch umgeschaltet im Test | Attrappe großzügiger als Regeln | § 5.4 |
| Prüfstand | Kontrast 1,0 gemeldet | falscher Hintergrund gemessen | § 5.3 |
| Prüfstand | `grep -c '3.17.12'` = 3 | Punkte als Regex-Joker | § 4.1 |
| 24.09. | „Noch offen für die Serie" falsch | Text aus der Zeit vor 2.14.0, Kommentar veraltet | § 3.2, § 7.3 |
| 24.09. | Kommentar über `serieAktuell()` beschrieb alte Regel | Kommentar nicht mitgezogen | § 3.2 |
| 24.09. (eigener Fehler) | Behauptung „gespeicherte Ziel-Antworten filtern" | Stelle nicht gelesen | § 1.3 |
| 24.09. (eigener Fehler, beim Bau von t_serie.js) | neuer Serien-Test maß erst durchgehend 0 | `streak: {}` ohne `sockel` löst `serieSockelSichern()` aus, die `sockelBis` auf heute stempelt und jede Rechnung kurzschließt; dazu zuerst `vollerStore({leer:true})` verwendet, dessen leerer Bereich `.serie-karte` gar nicht erst rendert | § 5.4, § 13 |
| 24.09. (eigener Fehler) | Logbuch behauptete, PostHogs Auftragsverarbeitungsvertrag gelte automatisch über die Nutzungsbedingungen | Annahme statt Nachsehen; PostHog verlangt eigene Unterschrift unter `…posthog.com/legal` | § 1.3, § 12 |
| 24.09. (eigener Fehler) | Rechtsprüfung nur von Punkt 15 wurde wie eine Prüfung „der App" behandelt; Konto-Löschen ließ geteilte Kartensätze stehen, „Kartensatz per Code" fehlte ganz in der Datenschutzerklärung | nur der gefragte Abschnitt gelesen, nicht jeder Datenfluss gegen den Text | § 12 |
| 3.17.20 → 3.17.22 | Beispielkarte drehte hin und zurück, Übersetzung nur ein Aufblitzen | Bewegung endete nicht bei dem, was sie zeigen sollte; dazu haltende Animation gegen `transition` | § 6.4 |
| 3.17.22 | Pfeilspitze der Einstiegs-Leiste sah aufgesetzt aus | andere Strichstärke als die Linie, Spitze saß im nächsten Punkt | § 6.4 |
| 3.17.25 | Schneller Doppeltipp auf „Antwort zeigen" bewertete die Karte blind mit „Fast" | an derselben Stelle erscheinender Knopf nahm Tipps an, obwohl noch unsichtbar | § 6.1 |
| 2026-09-25 | Wischen unzuverlässig: Karte folgte nach dem Aufdecken nicht (Animation überschrieb transform), Fling zählte nicht, `pointercancel` konnte „Nicht" werten; iOS ohne `:active`. Behoben 3.17.27, Regel § 4.x. |
| 3.17.28 | „Bewertete Karten kamen wieder nach X, Serie ging nicht hoch" | Wisch-Bewertung 150 ms verzögert, X dazwischen verwarf sie; abgelehnte Bewertungen nie nachgeschickt; Sockel-Tag zählte nicht (`d <= sockelBis`) | § 8.2, § 13 |
| 3.17.28 (Prüfstand) | Test „Protokoll sofort nach X" schlug auch mit altem Code nicht an | Attrappe meldet eigene Schreibvorgänge ohne `hasPendingWrites`, `verlaufNachschicken` glich es aus | § 5.3, § 5.4 |
| 3.17.29 | „Antwort zeigen“ unter dem Rand; Wischen scrollte mit und sprang zurück; Karte drückte sich vor dem Drehen ein | Notiz-Platzhalter machte die Seite höher als den Bildschirm + `pan-y` auf der Wischfläche; `:active` seit touchstart-Listener | § 4.x, § 14 |
| bis 3.17.29 (mindestens seit 3.10.3) | Impressum und Datenschutz ignorierten das helle Thema | Kopfskript wich in einer Farbe von `index.html` ab, sein Hash stand nie in der CSP; getestet wurde nur `index.html` | § 9.2, § 14 Punkt 11 (`pruefe_stand.mjs` rechnet alle Seiten nach) |
| bis 3.17.29 (G-003) | Zwei Geräte: Teilen/Lehrer/„geführt" weg, Gelöschtes kam zurück | `not-found` → `persistAll()` ohne merge | § 8.1a |
| bis 3.17.29 (G-014) | Board-Stimmen fremder Ideen auf 0 drehbar | Risiko nur in eine Richtung bedacht | § 8.1b |
| 25.09. (eigener Fund vor dem Commit) | Neue Sperre „lokale Änderungen" in `veroeffentlichen.bat` hätte jeden zweiten Deploy blockiert | Firebase-CLI legt `.firebase/` an, das stand nicht in `.gitignore` | Wer eine Sperre einbaut, prüft, welche Dateien die Werkzeuge selbst erzeugen |
| 25.09. (Prüfstand) | `t_a11y.js` meldete „keine Bewegung trotz ruhig", obwohl Inhalte 60–1300 ms verzögert erschienen | Test prüft laufende Animationen, nicht wartende Verzögerungen | § 5.3 – Aufgabe G-086 |
| 25.09. (3.17.32, eigener Fehler der Runde 2) | Vier Agenten gleichzeitig an `app.js` – drei Änderungen waren danach nicht im Arbeitsbaum. Die Rückmeldungen wurden dann aus den Zusammenfassungen von Hand nachgebaut und ohne Prüfstand committet: G-004 strich den Wort-Ersatz ganz (alte Karten ohne Nummer wären doppelt angelegt worden, Lernstand weg), G-005 schrieb beim Sortieren der Speicherkarten gar nichts mehr, G-020 wurde vom Inline-`max-width` überstimmt, G-035 änderte Lernlogik statt Rückgängig zu reparieren. Vor dem Veröffentlichen bemerkt, neu gebaut | Routine-Regel „nur EIN Agent gleichzeitig an app.js/styles.css" nicht befolgt; Agenten-Zusammenfassung für den Diff gehalten; Abnahme aus dem Befund nicht gelaufen | Agenten, die dieselbe Datei ändern, nacheinander. Eine Rückmeldung ist kein Beleg: `git diff` lesen, die **Abnahme aus dem Befund** selbst laufen lassen, dazu eine Gegenprobe mit altem Code (rot?). Fehlt eine Änderung im Diff: Aufgabe neu vergeben oder selbst bauen – nie aus der Zusammenfassung abschreiben. Commit erst nach grünem Prüfstand (§ 14 Punkt 12) |
| 26.09. 00:12 (Prüfstand, Nachtschicht) | `abnahme_runde.js` 10/13 rot, `t_serie` überall um einen Tag daneben – ohne Codefehler | Die App beginnt den Tag erst um `DAY_START_HOUR` (4 Uhr, `logicalToday`), `tag()` im Prüfstand um Mitternacht. Zwischen 0 und 4 Uhr Ortszeit des Containers (UTC) zeigen alle Datumstests einen Tag Versatz | Prüfstand nachts mit `TZ=Asia/Tokyo` (oder einer anderen Zone, in der es gerade nach 4 Uhr ist) laufen lassen; bei „überall genau ±1 Tag" zuerst die Uhrzeit prüfen (§ 5.3) |
| 26.09. (Betreiber: „veroeffentlichen.bat funktioniert ned") | Seit Runde 1 brach die `.bat` am Windows-PC ab | (1) Git für Windows checkt mit `\r\n` aus, `pruefe_stand.mjs` hashte die Inline-Skripte samt `\r` → drei falsche CSP-Fehler; geprüft wurde nur unter Linux. (2) `firebase` ist unter Windows eine `.cmd` – ohne `call` kehrt eine Batch-Datei nie zurück, kein „Fertig", keine Fehlermeldung | Werkzeuge für den Betreiber-PC mit Windows-Zeilenenden testen (Kopie mit `\r\n`, `PRUEF_WURZEL`); Text wie der Browser normalisieren; in `.bat` jedes `.cmd`-Programm mit `call` |
| 26.09. (Betreiber-Screenshot, zweiter Anlauf) | `.bat` meldete wieder die ALTE Meldung „lokale Änderungen" | (1) Windows liest eine `.bat` während sie läuft – `git pull` darin tauschte die Datei unterwegs aus. (2) Die `.bat` lag mit CRLF im Repo (einzige Datei), Git für Windows meldet so eine Datei als geändert | Eine `.bat`, die sich selbst aktualisieren kann, läuft aus einer Kopie in `%TEMP%`; Windows-Dateien per `.gitattributes` (`*.bat text eol=crlf`) mit LF im Repo |
| 26.09. (Betreiber-Screenshot, dritter Anlauf) | Sperre „lokale Änderungen" meldete `M .firebase/hosting..cache` | Der Deploy-Cache der Firebase-CLI steht seit dem ersten Commit im Repo; `.gitignore` wirkt nur auf nicht verfolgte Dateien. Beim Nachtrag in `.gitignore` (Runde 1) nicht mit `git ls-files` geprüft | Wer etwas in `.gitignore` einträgt, prüft mit `git ls-files`, ob es schon verfolgt wird. Eine verfolgte Datei nie einfach löschen, solange sie beim Betreiber geändert ist – sonst bricht sein `git pull` ab: erst das Werkzeug die Änderung verwerfen lassen, dann aus dem Repo nehmen |
| 26.09. (eigener Fehler, Chat) | Betreiber fragte „wo ist die Bedienungshilfe … sehe Lernen, Daten, Hilfe, Konto" – beantwortet als Frage nach einer App-Funktion. Gemeint war der eigene Gerätetest-Schritt „iPhone → Einstellungen → **Bedienungshilfen** → VoiceOver" (Logbuch Runde 5, Offen) | Aus der Erinnerung geantwortet, ohne nachzusehen, woher das Wort stammt | Fragt der Betreiber nach einem Begriff, zuerst in der eigenen letzten Antwort und im Logbuch suchen (`grep`), ob er von dort kommt. Gerätetest-Schritte immer mit dem Ort sagen: „in den **iPhone**-Einstellungen, nicht in der App" (§ 1.3, § 1.4) |
| 26.09. (Runde 7, bei der Abnahme gefangen) | G-067: Handwerker leerte das Fehlerformular nach dem Absenden – und drehte damit 3.17.14 um („Text nicht leeren, falls kein Mailprogramm aufgeht"); der neue Kommentar nannte das „Betreiber-Auftrag" | Der Befund REST-13 schlug „nur nach erfolgreichem Absenden zurücksetzen" vor, ohne die Begründung von 3.17.14 an derselben Stelle zu kennen; die Übergabe gab den Vorschlag ungeprüft weiter | Vor dem Umsetzen eines Befund-Vorschlags die Kommentare und den `CHANGELOG` **an dieser Stelle** lesen: Widerspricht er einer früheren Entscheidung, gilt die frühere, bis der Betreiber anders entscheidet (§ 3.5). In Kommentaren nie „Betreiber" schreiben, wo ein Befund oder Agent gemeint ist |
| 26.09. (Runde 7, eigener Fund) | `t_sw.js` meldete nach dem Commit von 3.17.36 plötzlich „Gegenprobe C" rot – ohne Codefehler | Die Gegenprobe lief gegen `git show HEAD:sw.js`; nach dem Commit IST HEAD die Behebung, die Gegenprobe kann nicht mehr anschlagen. Dieselbe Falle in `t_laden_parallel`, `t_ansage2`, `t_fehler_melden` | Gegenproben gegen einen **festen Commit vor der Behebung** (`git show <hash>:datei`), nie gegen `HEAD`; den Hash mit „Stand vor X.Y.Z" im Kopf des Tests nennen (§ 5.3) |
| 26.09. (Runde 8, eigener Fund) | Gegenproben mit „umleiten, dann neu laden" griffen nicht mehr (`t_board_limit`, `t_dreh_lage` erst grün statt rot) | Seit 3.17.36 (G-029) beantwortet der Service Worker `app.js?v=`/`styles.css?v=` aus seinem Cache, ohne Netz – eine Umleitung nach dem ersten Laden erreicht er nie; `page.route` sieht Anfragen des Workers ohnehin nicht | Umleitungen für Gegenproben **vor** dem ersten Laden und am Kontext setzen (`neueSeite(…, { vorher: ctx => ctx.route(…) })`), oder die Datei in der laufenden Seite unter neuer URL nachladen. Meldet eine Gegenprobe „grün", erst prüfen, ob die alte Datei überhaupt geladen wurde (§ 5.3) |
| 26.09. (Betreiber-Screenshots, 3.17.37) | Nach dem Umdrehen stand „Tippen zum Umdrehen" spiegelverkehrt auf der Rückseite; die Linie drehte nicht mit | Safari/WebKit legt absolut positionierte oder animierte Kinder einer 3D-gedrehten Fläche auf eigene Ebenen – `backface-visibility` und die Drehung der Elternseite gelten für sie nicht. Chromium (Prüfstand) zeigt das nicht, kein Test konnte es finden | Bei 3D-Drehungen: `backface-visibility: hidden` an **jedem** Kind, die abgewandte Seite nach der Drehung zusätzlich ausblenden, keine eigene Animation an Kindern **während** der Drehung. Was nur WebKit betrifft, als „am iPhone bestätigen" kennzeichnen (§ 5.6) – der Prüfstand hat kein WebKit |
| 26.09. (Runde 9, bei der Abnahme) | Befund-Weg „Status entfernt statt löschen" (G-015) hätte entfernte Ideen – etwa Beleidigungen oder persönliche Angaben – für jedes Konto über die Schnittstelle lesbar gelassen; die App blendete sie nur aus | Der Befund dachte nur an die Stimm-Merker (Datenschutz), nicht daran, dass „ausblenden" in einer öffentlich lesbaren Sammlung kein Entfernen ist | In einer Sammlung, die andere lesen dürfen, heißt „entfernen" immer: der **Inhalt** ist weg, nicht nur die Anzeige. Wer Löschen durch einen Status ersetzt, leert die Inhaltsfelder im selben Schritt (§ 8.1b, § 12) |
| 26.09. (Betreiber, eigener Fehler) | „diese tippen zum umdrehen und oooooo wird fester" als „Schrift wird kräftiger" gelesen, Verdachts-Fix G-091 (ohne Skalieren) gebaut | „wird fester" ist der Name eines Lernstands in der Kopfzeile – gemeint war die gespiegelt durchscheinende Kopfzeile „○○○○○○ WIRD FESTER" | Wörter aus einer Betreiber-Meldung zuerst in der App suchen (`grep` in `app.js`), bevor sie als Beschreibung gedeutet werden (§ 1.5: an seinen Screenshots messen, statt zu raten) |
| 26.09. (Betreiber am iPhone, 3.17.39) | Vorderseite ab 90° per `visibility` ausgeblendet – trotzdem „steht kurz immer noch rückwärts" | Safari rechnet `visibility` auf dem Hauptthread, die Drehung (transform) auf der Grafikkarte; das Ausblenden kam Bilder zu spät | Was synchron mit einer transform-Animation passieren muss, läuft über `opacity` (ebenfalls auf der Grafikkarte), nicht über `visibility`/`display` |
| 27.09. (Runde 10, eigener Fehler) | `t_teilen.js` (4) und `t_loeschen_teilen.js` (5) waren seit 3.17.38 rot, niemand hatte sie laufen lassen | (1) `stubs.js` bekam ein Protokoll, `t_teilen` ersetzte eine Zeile daraus wörtlich – die Ersetzung ging still ins Leere. (2) G-051 fragt vor dem Löschen immer nach dem Passwort, der Test beantwortete die Abfrage nie. Die Regression lief nur über eine Auswahl von Tests | Ändert sich ein Ablauf oder die Attrappe, **alle** `t_*.js` laufen lassen (Schleife über den Ordner, Auffälligkeiten greppen), nicht nur eine Liste. Tests, die Quelltext per `replace` verändern, prüfen, dass die Stelle gefunden wurde, und brechen sonst ab |
| 27.09. (Runde 10, Handwerker) | `t_a11y.js` rot („keine Aktion start-session") | Die Übergabe sagte pauschal „0–4 Uhr UTC → `TZ=Asia/Tokyo`"; der Handwerker setzte es um 17:37 UTC – in Tokio war es dann 2:37, also genau in der Lücke | Die Zone nur setzen, wenn es **im Container** gerade 0–4 Uhr ist, und dann eine Zone wählen, in der es nach 4 Uhr ist (`date -u` vorher). In Übergaben die Bedingung ausschreiben |
