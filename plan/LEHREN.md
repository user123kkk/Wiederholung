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
- **Ein Einwand, eine Frage oder Kritik ist keine Anweisung** (Betreiber
  29.09.2026, ausdrücklich „fest notieren“: „ich habe es satt, das Gefühl zu
  haben, dass wenn ich frage, es sofort übernommen wird“). Deshalb:
  - Nichts sofort einbauen, ändern oder streichen, nur weil er etwas
    anmerkt oder fragt. Erst Dafür/Dagegen, dann ein eigenes Urteil.
  - Bleibt das eigene Urteil beim Gegenteil, das sagen und dabei bleiben,
    bis er ausdrücklich entscheidet („mach so“, „streich das“, „ja“).
  - Versteht er etwas nicht („check ich nicht“), ist das keine Ablehnung:
    einfacher erklären, nicht die Sache fallen lassen.
  - *Vorfall 29.09.2026:* Die Denkpause vor dem Aufdecken wurde gestrichen,
    nur weil er fragte „man kann doch umdrehen, wann man will?“. Er: „wieso
    hast du das gestrichen, nur weil ich Kritik hatte?“ Richtig war: für
    Texte behalten, für Karten weglassen (`plan/texte-lernen/WIEDERHOLEN.md`).

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
  `plan/archiv/phase-5-recht/PRUEFUNG-2026-09-24.md` Frage 1.
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

### 1.7 Jede Empfehlung zuerst mit dem ganzen Repo abgleichen

Betreiber 08.10.2026: „von nun an will ich, dass du deine Empfehlungen mit
dem GESAMTEN REPO ABGLEICHST UND ZUSAMMENHANG MIT DEM, WAS ICH WILL“. Dazu:
„ich zweifle sehr immer wieder an der Methodik“.

**Regel:** Bevor eine Empfehlung an den Betreiber geht:

- im Repo suchen (`grep` über `plan/`, `CHANGELOG.md`, Kommentare an der
  Codestelle), was dazu schon entschieden, gemessen, gebaut oder bewusst
  entfernt wurde, und die Fundstellen nennen;
- prüfen, ob es etwas doppelt, was es schon gibt (zweiter Mechanismus,
  zweites Wort, zweiter Knopf);
- gegen seine Grundwünsche halten (§ 1.5: ruhig, ein Bildschirm eine
  Aufgabe, nichts doppelt, keine Methoden-Zahlen, Gründe zum Zurückkommen
  ohne Nerven);
- bei Lernlogik: Zahlen nicht aus dem Bauch. Entweder gemessen oder
  gerechnet (Schnelltest, Simulation mit genannten Annahmen) oder
  ausdrücklich als ungeprüft gekennzeichnet.

*Vorfälle 08.10.2026:* (1) Tagesdeckel „ab 60 fällig, 30 am Tag“ vorgelegt,
übernommen aus einer Notiz der Vorsitzung, ohne Abgleich: Es gibt schon
„Karten pro Runde“, `nachDringlichkeit` und `E26-VORSCHLAG.md`; ein zweiter
Deckel mit eigenen Zahlen wäre ein zweiter Mechanismus für dieselbe Sache,
und die Zahlen waren nicht gerechnet. Zurückgenommen. (2) „Fang bei den
Buchstaben an“ als falsch gemeldet (O-2); der Kommentar von 3.10.3 an der
Stelle sagt, was gemeint war: Buchstaben lassen sich selbst als Karten
anlegen.

### 1.8 Jeder Wunsch kommt sofort in die eine Liste

Betreiber 08.10.2026: „es gibt so viele Sachen, die ich mal angesprochen
habe … ich dachte, ich kann mich darauf verlassen, wenn ich so eine Sache
erwähne, dass das gespeichert wird“.

**Regel:** Erwähnt der Betreiber einen Wunsch, eine Beschwerde, eine Idee
oder eine Kleinigkeit, kommt sie **in derselben Antwort** in
`plan/ALLES-OFFEN.md` (Datum, sein Wortlaut gekürzt, Stand), auch wenn
nichts gebaut wird und auch wenn sie nur nebenbei fällt. Entscheidungen
und Erledigtes werden dort nachgezogen, nichts wird gelöscht. Andere
Dateien (Gesamtliste, Berichte, Logbuch) dürfen Einzelheiten tragen; ob
etwas offen ist, steht dort.

*Vorfall 08.10.2026:* Seine Wünsche standen fast alle im Repo, aber auf
rund zehn Dateien verteilt; die „Gesamtliste“ enthielt nur das
Entschiedene aus den Mehrwert-Runden. Auf die Frage „wie viel von allem“
bekam er deshalb zuerst eine Zahl über 96 Punkte, während 30 weitere
offene Punkte und 72 unentschiedene Ideen fehlten. Dazu: Die Berichte der
Mehrwert-Agenten wurden nie wörtlich gesichert. **Auch daraus:** Ergebnisse
von Agenten-Runden als Datei ins Repo, bevor zusammengefasst wird.

### 1.9 Wörtlich sichern, nichts auslassen, laufend festhalten

Betreiber 08.10.2026: „es sollte auch eine Regel sein, etwas nicht
auszulassen bzw. komplett so umzuschreiben, dass du nicht weißt, wovon ich
rede … ich hasse Lücken … alle 60 Sekunden, egal was überprüft, gelesen,
bearbeitet, geprüft oder sonstiges wird, es wird festgehalten … nichts
soll verloren gehen und strukturiert soll es sein“.

**Regeln:**

1. **Erst wörtlich, dann zusammenfassen.** Berichte von Agenten, lange
   Nachrichten des Betreibers und Messausgaben kommen ungekürzt als Datei
   ins Repo (oder, wenn persönliche Angaben darin stehen, nach
   `Desktop\Wiederholung-Belege\`), **bevor** eine Zusammenfassung
   geschrieben wird. Jede Zusammenfassung nennt ihre wörtliche Quelle.
2. **Seinen Wortlaut zitieren.** Wünsche werden mit seinen Worten
   eingetragen (gekürzt ist erlaubt, umgedeutet nicht). Die Deutung steht
   daneben und ist als Deutung erkennbar. Hilfe: `plan/BETREIBER-VERSTEHEN.md`.
3. **Nichts auslassen.** Vor dem Absenden jeder Antwort: Ist jeder Satz
   seiner Nachricht beantwortet oder in `plan/ALLES-OFFEN.md` eingetragen?
4. **Laufend festhalten.** Während der Arbeit steht in
   `plan/ARBEITSPROTOKOLL.md` spätestens nach jedem Arbeitsschritt (Ziel:
   höchstens eine Minute Abstand), was gerade gelesen, geprüft, geändert
   oder gemessen wurde, mit Uhrzeit; danach committen und pushen. Das
   Protokoll ist ein Zwischenspeicher: Ist der Inhalt im Logbuch oder in
   `ALLES-OFFEN.md` angekommen, werden alte Einträge gelöscht, mit einer
   Zeile, wohin sie gewandert sind.
5. **Chats sichern.** `py -3 plan\werkzeuge\chats_sichern.py` schreibt alle
   lokalen Chats wörtlich nach `Desktop\Wiederholung-Belege\chats\`. Am
   Ende jeder größeren Session ausführen. Nicht ins Repo: Es ist
   öffentlich, und in den Chats stehen persönliche Angaben.
6. **„Geht nicht“ erst nach dem Versuch.** *Vorfall 08.10.2026:* Dem
   Betreiber gemeldet, die Agentenberichte der Mehrwert-Runden ließen sich
   nicht nachholen. Sie lagen vollständig in den lokalen Chat-Dateien
   (`~\.claude\projects\…\subagents\`); 34 von 36 sind jetzt wörtlich
   unter `zyklus-2/mehrwert/agentenberichte/` (zwei Agenten waren am Limit
   abgebrochen). Vor „verloren“ oder „unmöglich“: nachsehen, wo es noch
   liegen könnte.

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

Auch SDK-Attrappen zählen: vor einer neuen exportierten Funktion den ganzen
Template-String in `stubs.js` durchsuchen. `node --check stubs.js` prüft nur
den umgebenden String, nicht das darin stehende Modul. Dessen Inhalt zusätzlich
mit `node --input-type=module --check` parsen (01.10.2026, Paket A).

### 3.7a Beim Verschieben nur echte Pfadverweise umschreiben

*05.10.2026, F13:* Das Umzugsskript ersetzte jeden Treffer eines alten
Namens, auch nackte Dateinamen. Aus „`sw.js` speichert `icon.svg` vorab“
wurde im Changelog „… speichert `plan/archiv/bilder/icon.svg` vorab“ (38
Stellen in 12 Dateien); im Befund CODE-13 stand danach der neue Pfad als
alter Fundort. **Regeln:** Umgeschrieben werden Markdown-Links und
Verzeichnispfade, keine nackten Dateinamen. Befund-Dateien bleiben wörtlich,
sie beschreiben den Zustand vor der Änderung. Nach dem Lauf den Diff der
Texte lesen, nicht nur das Verweis-Inventar. Und: Lautet die Entscheidung
des Betreibers „löschen“, wird gelöscht, nicht archiviert (Z14).

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
- Nach maschinellen Statusänderungen die tatsächlich geänderten Tabellenzeilen
  und den Diff lesen; die Zahl der Treffer muss stimmen. Ein Regex mit `$`
  und ausgeschlossenem `\r` trifft CRLF-Zeilen nicht (01.10.2026, Paket A).
- „AKTUELL" in `PLAN.md` ist der erste Satz, den die nächste Session liest. Er
  muss den **jetzigen** Stand nennen und sagen, was beim Betreiber offen ist.
- Jede offene Betreiber-Entscheidung kommt in die Tabelle „Offene Fragen" in
  `PLAN.md`, mit Empfehlung.

### 3.11 Git

- Vor der Aufforderung, `veroeffentlichen.bat` zu starten, muss auch
  `git status --porcelain` leer sein. Lokale Agenten-Dateien und erzeugte
  Hilfsdateien erhalten gezielte Ignore-Einträge, nachdem ihre Hosting-
  Ausschlüsse geprüft sind; nicht die Schutzprüfung abschalten.

- Direkt auf `main`, kein PR (`CLAUDE.md`).
- Danach denselben Stand auf den Sitzungs-Branch:
  `git push origin HEAD:main && git push origin HEAD`.
- Commit-Nachricht: Version, dann was und warum in Worten des Betreibers.
- Keine Modellnamen in Commits oder App-Code. Ausnahme: die vom Betreiber
  ausdrücklich gewünschte Codex-Modellwahl in `plan/grossplan/AUFTRAG.md`.
- Nie `--force` auf `main`.
- Beim Ausschneiden eines Patches nur echte Hunk-Zeilen (`^@@ `) als Grenzen
  nehmen; `@@` kommt auch innerhalb derselben Kopfzeile vor. Erst
  `git apply --check`, dann anwenden (01.10.2026, Paket A).
- JavaScript fuer `node -e` in PowerShell mit echten Shell-Regeln quotieren:
  innerhalb eines einfach quotierten Arguments jedes `'` verdoppeln. Ein
  JSON-String ist keine Shell-Quotierung. Patch-Anker vorher woertlich lesen,
  auch wenn nur eine Dokumentationsregel ergaenzt wird.

---

## 4. Veröffentlichen, Versionen, Caches

### 4.1 Die Liste – jede Zeile hat einen Vorfall

- Versionswerte gezielt in ihren Deklarationen/Asset-URLs ersetzen, nicht
  jede alte Versionsnummer in der Datei. Historische Ursachen-Kommentare
  behalten ihre Version. 29.09., Runde 14: globale Ersetzung änderte den
  .55-Cache-Kommentar versehentlich auf .56; vor Abnahme zurückgenommen.

- Changelog-Einträge mit Kontext **vor** der ersten Versionsüberschrift
  einfügen. Ein Patch ohne Kontext kann sie ans Dateiende hängen; vor Commit
  muss `pruefe_stand.mjs` die oberste Version bestätigen.

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
| App-Dateien (Hosting) | `veroeffentlichen.bat` holt `origin/main`, exportiert dessen Commit in eine eigene TEMP-Kopie, prüft dort den Stand und veröffentlicht nur Hosting. Lokale Entwürfe bleiben erhalten. **Oder:** GitHub → Actions → „Veroeffentlichen" → „Run workflow" (`.github/workflows/veroeffentlichen.yml`, deployt `main`, braucht Secret `FIREBASE_SERVICE_ACCOUNT`). Nur auf Knopfdruck – ein Push auf `main` veröffentlicht nichts. | Betreiber (Agent löst den Knopf nur auf ausdrücklichen Wunsch aus) |
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
- Windows: `CHROMIUM` in jedem neuen PowerShell-Prozess vor dem Test setzen;
  Variablen früherer Tool-Aufrufe gelten dort nicht. Tatsächlich verwendeten
  Browserpfad/Version prüfen, fehlender Browserstart ist keine Messung (§15,
  29.09., Runde 14; aktueller Aufruf in `LIESMICH.md`).
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

- **Vorbeugung fest, Betreiber 09.10.2026:**
  [`EMPFEHLUNGEN-PRUEFEN.md`](EMPFEHLUNGEN-PRUEFEN.md) vor jeder Empfehlung
  anwenden: Aussage, Beleg, Gegenargument und Geltungsgrenze zuordnen.
  Beim Tagesdeckel läuft die unabhängige Eingangsprüfung einschließlich
  falscher Stufen-/Terminverteilung und Negativfällen automatisch vor dem
  langen Lauf; Original-Codepfade müssen davor ebenfalls grün sein.
  Scheitert eine Voraussetzung, keine neue gültige Rechnung ausgeben.
  Bloße Dokumentation ersetzt diese technische Sperre nicht. Sprachliche
  Aussagen bleiben separat zu prüfen; Automatik garantiert keine Fehlerfreiheit.

- **09.10.2026, Tagesdeckel-Modell:** Ein gemeinsamer Index für Stufe und
  Fälligkeitsphase kann ungewollte Tagesberge erzeugen. Jede behauptete
  Eingangsverteilung je Gruppe prüfen, mit fester alter Gegenprobe. Eine
  Lastsimulation ohne Vergessensmodell beweist keine Lernwirkung. Eine
  Empfehlung für freiwilliges oder zeitweiliges Verhalten darf nicht als
  geprüft gelten, wenn nur dauerhafte harte Grenzen simuliert wurden.
  Werkzeughash, Modellversion und Einzelwerte sichern; ursprüngliche Zahlen
  erhalten und Korrektur sichtbar verknüpfen, nicht still ersetzen.

- **Rechtslinks mit dem wirklichen Rückweg prüfen**, nicht den neuen Reiter
  im Test schließen. E4 war seit 3.18.15 grün, obwohl der Link „← Zurück“
  die App neu lud. Der Test muss genau diesen Link bzw. den sichtbaren
  Rückweg betätigen und den vollständigen Plan sowie die Eingaben prüfen.
- **Scroll-Clips bei Kontrastmessungen beachten.** Ein Text kann innerhalb
  des Viewports liegen und trotzdem vollständig außerhalb des sichtbaren
  Inhaltsfensters sein. Am 09.10. meldete der allgemeine Leser auf iPad
  1,89:1 für eine Überschrift bei y=1058, obwohl das Inhaltsfenster bei
  y=905 endete. Alle Abschnitte durchscrollen, geometrisch sichtbare Texte
  prüfen; die Kontrastgrenze bleibt unverändert.

- **Ein Bewegungstest verlangt Zwischenlagen, nicht „irgendein Bild weicht
  ab“** (08.10.2026, Durchsicht Bewegung). D1 („Blätter fahren beim
  Schließen weg“) galt seit 3.18.14 als behoben. Der Test prüft, ob in
  irgendeinem Bild eine Verschiebung steht; das erfüllt auch ein Blatt, das
  in einem Bild von 361 auf 868 px springt und dann 200 ms wartet. Bild für
  Bild gemessen gibt es keine Zwischenlage. Regel: Bei jeder Bewegung, die
  gleiten soll, mindestens drei verschiedene Lagen zwischen Start und Ziel
  verlangen, und die Gegenprobe muss ein Sprung sein, nicht nur „keine
  Änderung“.
- **Vor jedem Prüfstand-Lauf fragen: Welchen Ordner liefert der Server auf
  Port 8099?** (08.10.2026, 3.18.26). Auf dem Laptop gibt es zwei Checkouts
  (der Ordner im Benutzerverzeichnis und der auf dem Desktop). Der Server
  eines anderen Chats lief noch und lieferte dessen Ordner; fünf Tests
  waren grün, hatten aber den alten Stand geprüft. Vor dem Lauf:
  `curl -s http://127.0.0.1:8099/app.js | grep APP_VERSION` gegen die
  eigene Version halten. Stimmt sie nicht: eigenen Server auf anderem Port
  starten und `PRUEF_PORT` setzen, den fremden nicht beenden.
- **Rotes Vergleichsfoto zuerst gegen die Bilder des Vorstands halten**
  (05.10.2026, F12). Zwei volle Fotovergleiche galten als Beleg gegen eine
  CSS-Bereinigung. Die Dateihashes zeigten: Das „falsche“ Bild mit neuem
  CSS war bytegleich zu einem Bild mit altem CSS aus demselben Aufnahmelauf
  (bewegt/ruhig desselben Bildschirms). Das Foto hat bei gleicher Quelle
  zwei Fassungen. Vor „die Änderung verändert Pixel“ deshalb: Hash des roten
  Bildes in allen Vorstand-Bildern suchen und den Vorstand zweimal aufnehmen
  (Alt gegen Alt). Schwankt Alt gegen Alt, misst das Gerät nichts.
- **Vergleichsfotos mit Software-Raster aufnehmen** (`--disable-gpu`). Mit
  GPU-Raster schwanken hier auch Fensterfotos derselben Quelle (Rauschen im
  Hintergrundverlauf ±1, an Rundungen bis 17 Stufen; in einer leeren
  Konfiguration 1–2 von 12 Fotos). Mit Software-Raster waren Alt gegen Alt
  in 30 von 36 Konfigurationen gleich. Die sechs Gast-Konfigurationen mit
  Bewegung (Einstieg) schwanken weiter, in jeder Wiederholung an denselben
  Stellen: Ebenen behalten das Raster aus der laufenden Bewegung. Solche
  Fotos sind nicht messbar; dort tragen die berechneten Stile und die
  ruhigen Konfigurationen. Die Toleranz bleibt 0; das Gerät muss mit einer
  absichtlich geänderten Regel rot werden (Gegenprobe).
- **Ein neuer Schritt im Messgerät wird an allen Arten von Konfigurationen
  erprobt, bevor ein langer Lauf startet** (05.10.2026). „Einmal unsichtbar
  und wieder sichtbar zeichnen“ half in der einen erprobten Konfiguration
  und machte alle ruhigen Alt gegen Alt rot (Fokus weg, bis 753134 Pixel).
  Kosten: ein verworfener 55-Minuten-Lauf.
- **Totes CSS zusätzlich über berechnete Stile abnehmen:** je Zustand alle
  Elemente samt `::before`/`::after`, alt gegen neu. Das hängt nicht am
  Raster. Die Einträge vor dem Vergleich sortieren: Chrome zählt eigene
  Eigenschaften (`--x`) je Seite in anderer Reihenfolge auf, sonst ist jedes
  Element „anders“ (`x_paket_f_sicht.js`).

- Vor aufwendiger Messinfrastruktur den Anteil der Zielgröße am ganzen
  Fehler gegen die Abnahmegrenze rechnen. D15: vier Schritte verfolgten
  einen einzelnen Shader, der 21–22 Prozent der späten Kompilierzeit trägt
  (rund 24 von 112–117 ms); ohne alle Schatten an Navigation/Startliste
  bleibt eine Bildlücke von 72 ms, erlaubt wären bei 280 ms linear
  höchstens 56 ms. Eine isolierte Einzeloperation ist noch keine
  abnahmeentscheidende Ursache. Vorhandene Gegenproben als Stoppkriterium
  lesen, nicht nur als Beleg der Zuordnung (04.10.2026,
  `zyklus-2/D15-CAPTURE-KRITIK-2026-10-04.md`).
- Zwei `requestAnimationFrame` nach `render()` warten nicht auf das erste
  Zeichnen im GPU-Prozess. Belegt: rAF-Abstand 156 ms und Bildlücke 178 ms
  direkt nach `render()`, während die Ansicht noch Deckkraft 0 hat.
- Headless-Start hat keinen Window-Swap: Der Prüfstand startet ohne
  `headless: false`, die gepinnte Chromium-Quelle lässt
  `PbufferGLSurfaceEGL::SwapBuffers` nicht zu. ANGLE-Capture schlösse dort
  keinen Abschnitt und schriebe nichts.
- Native Capture-Unterstützung belegt noch keinen unveränderten Zeichenweg.
  In gepinntem ANGLE schaltet Capture u.a. noperspective aus und verändert
  Compile/Link; Window-Swaps schließen Abschnitte ab, nicht-Window-Swaps
  werden ignoriert. Shader/Caps, tatsächliche ShareGroup und Abschluss
  vor Übernahme beweisen. Framezahl nicht mit Browserbild gleichsetzen;
  Capture-Zeiten keine kalte Tempoabnahme. Datei-SHA256 und exakte Shader-
  Tracebytes getrennt halten: CRLF-Datei kann anderen Bytehash haben.

- Ein verkürztes Paint-JSON kann Farbfilter und Mask-/Bildfilter weglassen.
  Opakes Weiß im CommandLog beweist keine opake Zeichenfarbe. Im D15-Beleg
  liefert erst die binäre Picture den SrcIn-Farbfilter mit 14/255 und den
  fehlenden Blur. Readerformat nach der exakt gepinnten Skia-Revision prüfen:
  Effektflag 0x2, Pfadtabelle optional, Dateioffsets keine Paint-Semantik.
  Gleiche Alpha und ideale Fläche garantieren keine gleiche Kombination
  von geglätteten Deckungen. Aus gemischten 8-Bit-Endbildern keine originale
  Alpha-Maske behaupten; geometrisch abgeleitete Shaderparameter als Modell
  kennzeichnen, solange direkte GPU-Werte/Präzision fehlen.

- Eine Diagnose mit CSS-Variablen wird am tatsächlich berechneten Stil
  und an der vollständigen Zeichenliste geprüft. `none` ist kein einzelner
  Eintrag einer Schatten-Kommaliste: `--kante:none` macht
  `box-shadow:var(--kante),var(--shadow-lg)` insgesamt ungültig. Damit
  werden auch Außenschatten entfernt. Zum Isolieren des Inset-Schattenblocks
  ausdrücklich die verbleibende gültige Schattenliste setzen und erhaltene
  Operationen nachweisen. Ein Shaderquellhash benennt noch keine einzelne
  CSS-Operation; im D15-Beleg Rahmenbefehl 26 ausgeschlossen, Block 19–25
  über exakte vollständige Listendifferenzen zugeordnet. Gleiche analytische
  Fläche ist keine Pixelgleichheit bei unterschiedlichen AA-/Mischregeln.

- `coverage_tiles` aus `PictureLayerImpl::AsValueInto` ist eine separate
  Debug-Aufzählung, keine vollständige Liste tatsächlich gezeichneter
  Quads. Im D12-Gegenbeleg vier/zwei Coverage-Einträge, aber 16/vier echte
  Hintergrundquads. Vollständige Abdeckung aus dem zugehörigen Renderpass
  samt SharedQuadState prüfen. Nähe zu einem Copy-Ereignis ohne Pass-ID
  bleibt eine zeitliche Zuordnung und liefert keine Rohtexturpixel.
- Große JSON-Dateien mit eingebetteten Bildern vor der Ausgabe strukturiert
  lesen und nur benötigte Felder ausgeben. `Get-Content -Raw` gefolgt von
  `Select-Object -First 1` kürzt einen einzelnen großen String nicht.
  Shell-Parameter wie `-ErrorAction` gehören nicht an native Programme
  wie `rg`; bei Lesefehlern keine Aussage aus fehlendem Ergebnis ableiten.

- `LayerTree.replaySnapshot` liefert eine neue Wiedergabe, keine Rohkopie
  der im ersten Foto gezeichneten GPU-Textur. Ressourcen-ID, Maßstab und
  Pixelmittelpunkt getrennt belegen. Ein DOM-Rechteck oder transparenter
  Renderpass über dem Pixel beweist kein dort zeichnendes Quad. Grüne
  Pixel aus einer anderen Ansicht ersetzen keine zeitgleiche grüne Spur.
- GPU-Kacheln über die explizite `coverage_tiles.tile.id_ref` mit dem
  Zeigeranteil des zugehörigen `cc::Tile/Zeiger` verbinden; ein fehlendes
  Präfix darf keine scheinbar leeren Kachellisten erzeugen. Rastermaßstab
  und physische Viewportänderung zeitlich getrennt prüfen. Volle Breite
  beweist keine Pixelgleichheit: D12-Vorab-Fläche bleibt bei 320 Pixeln
  mit einem Kanalwert rot. Auch ein einzelner Wert bleibt Abnahmefehler.
- Numerisch gleiche Client-/Decoder-Raster-IDs verbinden keine Aufträge:
  getrennte Zähler, mögliche vorzeitige Rückgaben und Aufteilung prüfen.
  Zeitnahe Picture-Befehle und Compileroperationen sind von späteren
  DOMSnapshots zu unterscheiden. Eine kalte CSS-Einzelprobe, die denselben
  Shader nur auf ein späteres Zeichenziel verschiebt, ist keine Behebung.
  Shaderquellhash, Einzelzeiten und echte Bilder im Original/Variante/
  Original vergleichen. Entfernte sichtbare Kanten sind Diagnose, keine
  Produktabnahme (03.10.2026, D15-Innenkanten-Gegenprobe).
- Ausführliche Grafikspuren auf die Vorher-/Nachher-Marken des betroffenen
  Fotos prüfen: Picture-Kategorien können den Trace-Puffer vor diesem
  Foto füllen; eine gültige JSON-Datei garantiert keine vollständige Spur.
  Python-JSON unter Windows ausdrücklich als UTF-8 lesen. Beendete
  Animationen nicht pauschal für Fotos canceln: D12-Gegenprobe bei gleichem
  DOM/Stilen 0→98→0 Fehlerpixel beim Freigeben/Wiederhalten, mit geänderten
  GPU-Ebenen. Emulationsskala kann trotz gleicher DOM-Messung andere Bilder
  liefern. Die früher berichteten D15-Zuordnungen zu unterschiedlichen
  DOM-Ebenen sind unbestätigte Zahlenkandidaten, kein Ursachenbeleg
  (03.10.2026, weitere Fortsetzung; getrennte Zähler erkannt).
- Ein rAF-Verlauf ohne Deckkraftschritt über der Grenze kann trotz echter
  kalter Bildpause rot sein. Die gelieferten Browserbilder auswerten;
  rAF-Grün nicht als Bildabnahme ausgeben. GPU-Flush plus Shader-Cache-
  Ereignisse benennt noch keinen teuren Shader oder eine CSS-Ursache.
  Auch eine Aufnahme-Umskalierung, die bei roten **und** grünen Bildern
  vorkommt, erklärt allein keine Fehlerpixel (03.10.2026, D12/D15-Detailspur).
- Beendete DOM-Animationen und identische berechnete Stile belegen noch
  keinen pixelgleichen Screenshot. Das erste abweichende Bild samt
  zeitgleichen DOM-/Animations-/GPU-Daten erhalten; Folgefotos dienen nur
  der Diagnose und ersetzen die fehlgeschlagene Abnahme nicht. Ein
  transienter Fehler auch mit unveränderter Quelle erklärt ohne weiteren
  Nachweis keine früheren Fehlerpixel (03.10.2026, D12).
- Eine rAF-Deckkraftliste ist keine vollständige Bildfolge. Bei Lücken die
  tatsächlich gelieferten Browserbilder mit Zeitstempeln und einer Spur von
  Hauptthread, GPU und Compositor zusammen prüfen. Den kalten Grafikstart
  gegen denselben unveränderten Quellstand im selben Browser nach dem ersten
  Zeichnen vergleichen. Eine grüne warme Kontrolle ersetzt keine kalte
  Startabnahme und keine Geräteabnahme (03.10.2026, D15).
- Scroll-Lage vor Tastaturereignissen erst nach abgeschlossenen
  Inhaltsänderungen erfassen. Verschwindet beim ersten Speichern ein hoher
  Leerzustand, begrenzt der Browser die bisherige Scroll-Lage auf die neue
  Dokumenthöhe. Öffnen, Speichern und Tastaturbewegung getrennt messen und
  dieselbe Folge am gesicherten Ausgangsstand prüfen (02.10.2026, C1).
- Laufzeitprüfungen ohne konkurrierende Browser-Tests ausführen; feste
  Grenzen nicht wegen eines langsamen Parallel-Laufs lockern.
- Bei einem Rechnerwechsel Browser, Netz-/Akkubetrieb und unabhängige
  CPU-Benchmarkwerte mit festhalten. Feste 4×-Drosselung ist relativ zur
  jeweiligen Hardware. Ein ebenfalls roter Altstand beweist allein keinen
  Messfehler; auch eine unstabile Kalibrierung ersetzt keine Abnahme.
  Bereits grüne identische Funktionsprüfungen nicht deswegen wiederholen.
- Zeitlimits eines Teststarters müssen zum gesamten Ablauf passen.
  Bereits bestandene Einzeltests dürfen aus ihren vollständigen Logs
  ausgewertet werden; dies ausdrücklich von einem erneuten Lauf unterscheiden.
- Neue Browser-Tests schließen den Browser in `finally`, auch bei Assertions.
- Geometrie nach einem Neuzeichnen erst nach geladenen Schriften und einem
  abgeschlossenen Stil-/Bilddurchlauf messen. Auch reduzierte Bewegung mit
  0,01 ms kann beim ersten Lesen noch den Start-Transform zeigen (01.10., B6).
  Die feste Alt-Gegenprobe muss danach weiterhin den echten Fehler zeigen.
- Neue SW-/Offline-Prüfstände zuerst an einem erfolgreichen Update mit
  anschließendem Offline-Start bestätigen. Lokale App-Dateien über einen echten
  HTTP-Server liefern: Playwright-Routen können den Offline-Schalter umgehen
  oder vor dem Worker abbrechen. Cache vorhanden heißt noch nicht aktiver
  Controller. Ein roter Normalfall sperrt die Abnahme, auch wenn die alte
  Fehler-Gegenprobe anschlägt (01.10.2026, Paket A).
- SW-Pruefungen warten auf `activated` und darauf, dass Controller und
  aktive Registrierung derselbe Worker sind. Bei dieser Playwright-Fassung
  wertet `waitForFunction(async ...)` die Promise als wahr aus, statt bei
  einem falschen Ergebnis weiter zu pollen. Asynchrone Cache-/SDK-Bedingungen
  deshalb mit wiederholtem, jeweils abgewartetem `page.evaluate` pruefen.
  SDK-Cache-Eintraege an ihren Request-URLs nachweisen; ein nackter Request
  kann wegen `Vary` nicht passen. Die Nutzbarkeit beweist erst der echte
  Offline-Neustart, nicht die blosse Existenz des Eintrags.
- Flüchtige Boot-Knoten taugen nicht zur Unterscheidung von App-Fallback und
  eigenständiger HTML-Seite; einen bleibenden App-Knoten prüfen. Browser-Fixtures
  wählen die echten UI-Schalter aus dem Code, keine erfundenen View-Namen.
- Nach einer Zugriffssperre auch bestehende Import-Regressionen auf passende
  Berechtigung und Einwilligung pruefen. Ein Feld-Erhalt-Test braucht ein
  berechtigtes Konto; Sperrfaelle separat pruefen. Keine Feld-, Mengen- oder
  Verweis-Erwartung lockern (01.10.2026, Paket A).
- Fehlermeldungen nach einer Ausweis-Erneuerung und nach dauerhafter Ablehnung
  getrennt prüfen. Geometriemessungen mit der festen Gegenprobe vergleichen:
  ein bestehender Offline-Banner verschiebt das ganze Formular, ohne dass ein
  neuer Hinweis den Knopf innerhalb des Formulars verschiebt.
- `waitForPendingWrites` umfasst keine erst nach Ablehnung begonnene
  Reparatur-Transaktion. Deren bestätigten Serverstand abwarten, nicht einen
  zunächst noch leeren Fehlermarker als Abschluss werten (01.10.2026, Paket A).
- Bei geänderter Oberfläche Verhalten prüfen (Überlappung, Antippbarkeit),
  keine überholten Layout-Puffer verlangen (Runde 12).

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
- Inventare wählen nur tatsächlich sichtbare Wurzeln, einschließlich
  `aria-hidden` der Vorfahren. Vollständige Rundgänge müssen ihre
  Endzustände prüfen; ein stilles Ende bei fehlendem Weiter-Knopf ist keine
  Abnahme. G-109 (29.09.): verborgenes Fehlerformular lieferte leere Texte,
  Einstieg-Heuristik stoppte vor der Probekarte, trotzdem Exit 0.
- Ein Test, der dauerhaft rot ist, ist wertlos, weil ihn niemand mehr ansieht.
- **Tempo erst zerlegen, dann bauen** (30.09.2026, G-119). Drei Anläufe
  mit Vermutungen brachten nichts; erst Chrome-Trace (`x_tempo_spur.js`)
  und CPU-Profil zeigten die Ursachen. Am Laptop (i5-8365U, „Ausbalanciert“)
  misst derselbe Ablauf unter CPU 4× mal 97, mal 259 ms. Wirkung einer
  Änderung deshalb **abwechselnd gegen den Vorstand** messen
  (`x_ab_tempo.js`, mindestens 8 Paare, Median und Zahl über der Grenze),
  nie mit einzelnen Läufen vorher/nachher.
- **Bilderzähl-Test rot: zuerst der Vorstand** (07.10.2026, 3.18.23).
  `t_paket_d` D11 („fünf Austrittsbilder“) war an einem Tag zehnmal rot,
  in einem frischen Browser (69 Seiten) nie. Derselbe lange Test am festen
  Vorstand b45a13b: ebenfalls rot an D11. Damit ist belegt, dass es nicht
  an der Änderung liegt – mehr nicht. Die Ursache ist **nicht gefunden**:
  Hauptfaden frei (keine lange Aufgabe, kein langes Bild, Zeitgeber
  pünktlich), nach vier Ausblendbildern kommen rund 90 ms keine Bilder;
  nur in einem Browser, der schon rund 15 Minuten und 200 Seiten alt ist.
  Zwei eigene Vermutungen waren falsch und wurden gemessen widerlegt: das
  Spiel auf dem Laptop (Grafiklast 0 %) und die Minuten-Sicherung (ohne
  sie ebenfalls rot). Regel: Wird ein Test rot, der Bilder oder
  Millisekunden zählt, denselben Test unter denselben Bedingungen am
  Vorstand laufen lassen. Eine Ursache erst nennen, wenn sie gemessen ist.
  Die Grenze bleibt; der offene Test steht im Logbuch unter „Offen“.
  Nachtrag 15:15: Nach einem Neustart des Laptops (er lief sechs Tage)
  war derselbe Test sofort grün, 152/152. Bei unerklärlich roten
  Bilderzähl-Tests, die auch am Vorstand rot sind, zuerst den Rechner neu
  starten lassen, bevor Stunden in die Suche gehen.

### 5.4 Die Attrappe muss so streng sein wie die Wirklichkeit

- Gastseiten lesen ihr Thema aus localStorage, Kontoseiten aus settings.
  Bei Themenprüfungen die passende Quelle setzen und html[data-thema]
  ausdrücklich prüfen; eine Fallbeschriftung belegt keine Themenwahl.

- **29.09.2026, G-096:** Testkarten müssen denselben Lerntag ab 04:00 Uhr
  wie die App verwenden, einschließlich Tages-Offsets und lokaler Zeitzone.
  Ein Kalenderdatum vor 04:00 macht heute fällige Testkarten erst morgen
  fällig. Zeitpunkte 00:00, 03:59, 04:00 und 23:59 gezielt prüfen.
  Ein Dialog-Test darf dessen bestätigungsabhängige Promise nicht abwarten,
  bevor er den Bestätigungsknopf betätigt; die eigentliche Wirkung danach prüfen.

- **3.17.50:** Mehrgeräte-Increments mit dem echten SDK und lokalen
  Firestore-Regeln prüfen. Ein Stub beweist weder persistente Offline-Writes
  noch deren lokales Echo oder Rollback nach einer Regel-Ablehnung.
  SDK-Tests mit umgeleiteten Modulen müssen beim Neustart dieselbe
  Instrumentierung behalten: Service Worker gezielt blockieren und separat
  prüfen. Datenbereitheit allein bedeutet nicht, dass der Boot-Screen weg ist.
- **3.17.50, G-096:** Der erste Style-Abgleich kann in Headless-Chromium erst
  bei der Messung eine 0,01-ms-Animation starten. Im Modus „ruhig“ ist deren
  Startdeckkraft kein belegter absichtlicher Wartezustand. Nur Animationen
  ohne Delay mit Enddeckkraft 1 und noch nicht beendetem Sofort-Start dürfen
  aus dieser Deckkraftmessung ausgenommen werden. Gegenprobe: echte
  CSS-Verzögerungen wieder einschalten; der Test muss weiterhin rot werden.

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
  - Der Weiter-Knopf steht auf kurzen Einstiegsscreens unten. Seit 3.17.44
    wachsen lange Screens samt Weiter-Fuß im normalen Dokumentfluss;
    keinen sticky/festen Fuß zurückbauen, der Auswahl oder Echo überlagert.
    Ein zusätzlicher Echo-Satz kann dort die Dokumenthöhe ändern. Entscheidend
    sind erreichbare Inhalte und keine Überlagerung, nicht identische
    Dokumentkoordinaten bei unterschiedlich hohem Inhalt (Übergabe 27.09.).
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

- **10.10.2026, A17/DATEN-12:** Ein altes Formularfeld ist kein neuer
  Auftrag. Bei fremden Snapshots bewusst bearbeitete Felder von unberührten
  Feldern unterscheiden. Für die Standwahl gilt: unberührt dem aktuellen
  Kartenstand folgen, nur ausdrückliche Auswahl als Stufenänderung schreiben.
  Auch Optionswerte/ausgewählten Wert nach Neuzeichnen prüfen: fehlt die
  alte Auswahl im neuen Optionssatz, nimmt der Browser still den ersten
  Eintrag. Serverseitige Ausgangskennungen erkennen diese unbeabsichtigte
  lokale Auswahl nicht. Prüfen: nur Notiz geändert + fremde Bewertung,
  bewusste Stufe + Snapshot, unberührtes Blatt + Escape.

- Ein globales Formular braucht seine Eingabe- und Entwurf-Handler in jeder
  Ansicht, die es öffnet. Wird ein Blatt aus Fortschritt geöffnet, dürfen
  diese Handler nicht nur an `ui.tab === "verwalten"` hängen. Abnahme auch
  dort mit geändertem Text, Escape/Abbruch und Neuzeichnen (02.10., C12/C19).

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

Bleibt ein Blatt erstmals im DOM erhalten, alle Schließpfade mit einem
Dialog darüber prüfen. Ein allgemeines `.dlg` trifft das Blatt darunter;
dessen Austrittsstil bleibt dann erhalten, statt beim Neuaufbau zu
verschwinden. Der Bestätigungsdialog wird über seinen eigenen
`aria-labelledby`-Wert gewählt (02.10.2026, C1-Fortsetzung).

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
- **Nach `innerHTML` keine Maße lesen** (`scrollY`, `innerHeight`,
  `visualViewport`, `getBoundingClientRect`, `offset*`). Jedes Lesen zwingt
  den Browser, die ganze neue Seite sofort im Klick zu setzen. 3.18.10:
  `syncAppbarKante` (86 ms) und `syncTastatur` (58 ms) im Verwalten-Wechsel,
  CPU 4×. Werte aus Ereignissen merken oder im nächsten
  `requestAnimationFrame` lesen (läuft vor dem Malen desselben Bildes).
- **Web-Schriften vor dem ersten Zeigen laden** (`document.fonts.load` im
  Leerlauf), sonst setzt der Browser mit `font-display: swap` erst eine
  Ersatzschrift und dann alles ein zweites Mal – sichtbar als Umspringen
  (3.18.10, `schriftVorwaermen`).
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
  `plan/werkzeuge/regeln/regeln-pruefung.mjs` erweitern → im Emulator
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

- **Runde 14, G-111:** Nachholen einer verspäteten Registrierung an den
  konkreten eigenen Versuch und die angeforderte Adresse binden. Ein
  allgemeiner „Zeitlimit“-Merker darf weder Mail noch Profiländerung für
  das nächste fremde Konto auslösen. Normale eigene verspätete Ankunft
  bleibt erhalten; neuer Anmeldeversuch muss alte Herkunft verwerfen.

- **Runde 14, G-110:** Auch nach einem bereits bestätigten Dialog kann
  dessen Microtask erst nach dem Kontowechsel laufen. Nutzer/Referenz vor
  dem Dialog erfassen und nach seiner Antwort prüfen; Auflösen mit `false`
  im Auth-Reset kann ein schon aufgelöstes Promise nicht mehr abbrechen.
  Eigene erfolgreiche Löschung mit anschließender Abmeldung separat prüfen.

- **Runde 14, G-108:** Kontowechsel leert private Entwürfe und die zugehörigen
  offenen Blätter gemeinsam. Nur die Bearbeitungs-ID zu löschen ist falsch:
  ein altes Bearbeitungsblatt wird sonst zur Neuanlage im Folge-Konto.
  Normale Cloud-Echos/Render desselben Kontos erhalten den Entwurf weiter.
  Bei Ideen nach Auth-Wechsel das Board erneut öffnen, statt sofortige
  Sichtbarkeit im geschlossenen Einstellungsbereich vorauszusetzen.

- **Runde 14, G-107:** Dieselbe Konto-Prüfung gilt für Lese-Token-Refresh,
  Registrierung/Profil-/Mail-Folge, Reset-Rückmeldung und „Adresse falsch“.
  Alte Antworten dürfen weder eine B-Seite neu laden noch neue B-Sperren
  freigeben oder Reauth für B beginnen. Bei Auth-Aufträgen absichtliche
  Übergänge (Gast→eigenes neues Konto, eigenes Löschen→Gast) getrennt von
  fremdem Kontowechsel prüfen, nicht jede Auth-Änderung blind abbrechen.

- **29.09.2026, G-106:** Bestätigungsprüfung/erneutes Senden und ihre
  Timer-Sperre an den ursprünglichen User binden. Alte reload-Antworten
  dürfen weder den Token eines Folgekontos erneuern noch dessen Seite neu
  laden; alte Versandmeldungen gehören nicht in dessen UI.

- **29.09.2026, G-105:** Auch Rückmeldungen zu öffentlichen Board-Writes
  gehören zu ihrem Ursprungskonto. Alte Erfolge dürfen keinen neuen Entwurf
  leeren/Formular schließen; alte Fehler keine neue Stimm-Anzeige korrigieren.
  Kontext vor erstem Write binden und sowohl Erfolg als auch Fehler prüfen.

- **29.09.2026, G-104:** Datenmigrationen binden Konto und Umzugszustand
  vor dem ersten Stapel. Nach jedem Await prüfen, auch vor der abschließenden
  Schema-Markierung: ein A-Stapel darf niemals den B-Umzug als fertig markieren
  oder dessen Zustand verwerfen. Wechsel zu fertigem und migrierendem B prüfen.
- **29.09.2026, G-102/G-103:** Ein geschützter SDK-Helper reicht nicht,
  wenn der äußere Auftrag erst nach einer alten Antwort neu hineinläuft.
  Herkunft am Beginn des gesamten Teilen-/Import-Auftrags erfassen, auch
  beim Start des FileReader. Jede Fortsetzung vor weiteren Writes,
  Bestätigungen, Token-Retry und UI-Mutation daran binden. Dialog-Abbruch
  schützt bereits laufende Netzantworten oder dialoglose Imports nicht.

- **3.17.51, G-100 UI-Abnahme:** Konto-Bindung beginnt vor dem Dialog,
  nicht erst im SDK-Helper. Ein alter Bereich-Löschdialog blieb auf B
  bedienbar und löschte dort 40 Karten. Beim Auth-Wechsel Dialog-Promises
  als Abbruch auflösen und gehaltene Aktionen abbrechen; nach jeder
  Bestätigung das Ursprungskonto prüfen. Verzögerte Schließ-Callbacks
  dürfen nur ihren eigenen noch aktiven Dialog entfernen. Im UI-Test
  ausdrücklich das Ende des Boot-Overlays prüfen: geladene Daten allein
  bedeuten noch keine bedienbare Oberfläche.

- **3.17.51, G-098:** Die Löschsperre beim Auth-Wechsel freigeben, aber
  erst den gesamten Löschauftrag konto-gebunden machen. Eine alte Abfrage
  setzte sonst mit `currentUser.uid`/`userDocRef` von B fort und löschte
  Nutzer-Dokument und Auth von B. Reauth-Prompts, geteilte Sätze, Stimmen,
  Stapel, Nutzerdokument und Auth tragen denselben ursprünglichen Kontext.
  Nach jedem Await prüfen; Zeitlimit markiert den Auftrag als abgebrochen,
  damit eine spätere SDK-Antwort keine weiteren Schritte startet.

- **29.09.2026, G-100/G-101:** Auch Bereich-Löschung und Vollschreiben sind
  mehrstufig. Eine alte Stapel-Bestätigung darf keine neue globale Sammlung
  auswählen: Gegenprobe löschte nach Wechsel 40 Karten des neuen Kontos.
  Ursprungsreferenz vor erstem Await erfassen, nach jedem Await Gültigkeit
  prüfen, auch vor Unter-Sammlungs-Löschungen, Fallbacks und Rückmeldungen.

- **29.09.2026, G-075/Reset-Nachprüfung:** Atomare negative Differenzen
  allein reichen nicht: fremder Reset plus altes Offline-Undo erzeugte im
  unveröffentlichten Fix −1 und hätte eine neue Antwort verschluckt.
  Jeden Reset mit neuer Kennung atomar schreiben, diese an jede Differenz
  binden und alte Kennungen serverseitig ablehnen. Alte Undo-Aktionen dürfen
  auch nach neuen Antworten den neuen Verlauf nicht korrigieren. Nach einer
  Ablehnung zuerst die Server-Kennung prüfen, bevor ein Retry gemerkt wird.
  Neues Feld benötigt Regeln, echte SDK-/Emulator-Abnahme und ausdrücklich
  **Regeln vor Hosting**. Ein grüner Test zählt nur, wenn die vorbereitende
  Bewertung tatsächlich bestätigt wurde; abgewiesene Klicks sind kein Beleg.

- **3.17.50, G-075:** Gemeinsame Zähler über atomare positive/negative
  Differenzen ändern, niemals über ganze Tageswerte oder `Math.max`.
  Gesendete Differenzen stehen bereits im SDK-Snapshot, auch offline;
  zusätzlich addiert werden nur ungesendete oder tatsächlich abgelehnte.
  Metadata-Bestätigungen berücksichtigen; ausstehende Offline-Promises sind
  kein Fehler. Rückgängig korrigiert den ursprünglichen Lerntag.
- **3.17.50, G-093:** Rückmeldungen und Wiederholungslisten gehören zum
  ursprünglichen Konto. Vor Erfolg, Fehler und Token-Nachholen dieselbe
  Konto-Referenz prüfen, beim Auth-Wechsel die Wiederholungsliste leeren.
  Späte Ablehnungen dürfen niemals Karten des nächsten Kontos verändern.
  Dokument-/Sammlungsreferenzen beim Auth-Wechsel vor dem Neuaufbau leeren;
  auch Abmelden ohne Folgekonto ist ein eigener Testfall.
  **G-097 (noch offen bei 3.17.50):** Bei `not-found` nicht nach einem
  `await` erneut die globale Nutzer-Referenz lesen. Ziel und Name vor Beginn
  erfassen, jeden weiteren Schritt an dieselbe Referenz binden.
  **G-098 (noch offen bei 3.17.50):** Die Löschsperre ebenfalls an ein
  Konto binden. Erfolg darf die nächste Anmeldung nicht dauerhaft sperren;
  Freigabe eines Folgekontos darf alte Lösch-Fortsetzungen nicht fortsetzen.
- **3.17.50, G-094/G-095:** Ein reines Zähler-Update darf die aktive Karte
  oder Zeichenfläche nicht ersetzen. Identität der DOM-Knoten mit echtem
  SDK prüfen. Ablehnungen beim Verlauf-Reset sichtbar melden; nicht mit
  leerem `catch` verschlucken. Reset und Kontowechsel entwerten alte
  Zähler-Rückmeldungen über eine Generation.

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
  - Werden PNGs neu erzeugt, brauchen alle `apple-touch-startup-image`-Links
    eine neue Versions-Query. Hosting cacht PNGs eine Woche; dieselbe URL
    kann trotz neuer Datei das alte Bild liefern (28.09.2026).
  - Der Generator muss einen mobilen Kontext (`isMobile`, `hasTouch`) verwenden.
    Desktop-Scrollleistenplatz (`scrollbar-gutter`) verschob die PNG-Zeichen
    etwa 7,5 CSS-Pixel gegenüber dem mobilen HTML (27.09.2026).
  - PNG und HTML im selben mobilen Kontext pixelweise vergleichen; eine
    Chromium-Messung ersetzt keine Bestätigung der installierten iOS-App.
  - Installierten iOS-Modus getrennt von Browser-Viewports prüfen: WebKit
    254868 kann `100svh` trotz `viewport-fit=cover` verkürzen. Nicht
    pauschal die Höhen anderer Ansichten ändern oder Geräte-Offsets addieren.
  - **Korrektur 3.17.53:** Auch `100vh` ist im ersten Bild der installierten
    App um die Statusleiste zu kurz (848 statt 896); der Wechsel von svh auf
    vh in .49 half deshalb nicht. Belegt durch Bildschirmaufnahme 29.09.:
    HTML zuerst 45 Gerätepixel höher, dann richtig. Boot nimmt jetzt
    `screen.*` (nur bei `navigator.standalone`), wie schon die Leiste 3.6.14.
    Simulationen müssen den **Viewport** verkürzen, nicht nur eine Einheit.
  - **Weißer Schleier beim Start = leere Web-Ansicht** (3.17.55). Hebt ein
    Gerätebild den ganzen Hintergrund an, das Weiß aber kaum, ist es eine
    Überblendung mit Weiß: Die Seite war noch nicht da. Hilft keine Farbe im
    HTML; die Seite muss sofort kommen (Service Worker: Navigation aus dem
    Cache, Netz im Hintergrund).
  - **Keine Systemschrift auf dem Startbild** (3.17.52). `ui-serif`,
    `system-ui`, `-apple-system` lösen auf iOS und auf dem Windows-Generator
    zu verschiedenen Schriften auf (New York vs. Palatino). Jeder Text im
    `.boot` braucht eine Schrift, die auf beiden Systemen dieselbe ist
    (Georgia). `t_boot_geometrie.js` prüft die benutzte Schrift per CDP.
  - **Ein Gerätefoto zuerst datieren und jede Ebene einzeln vermessen**
    (29.09.2026). IMG_4397 stammte vom 28.09. 07:37, also vor .49. Die
    schwache Ebene passte pixelgenau zum PNG aus 3.13.1, die helle zum HTML.
    Erst diese Zuordnung trennt natives Startbild, HTML-Paint und Schrift.
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
| `offeneWiederholungen(b)` / `bereicheMitOffenem()` | seit 3.18.23 **eine** Menge für drei Stellen: Hinweis auf Lernen („Mit dabei“ bzw. im geführten Satz „Heute auch fällig“), Zahl im Stapel, Abschnitte der Runde aus anderen Bereichen | kein Serien-Bezug; wer die Menge ändert, ändert alle drei |
| `SITZUNGS_LIMITS` | Limit gilt **je Runde**, danach „Weiterlernen". Seit 3.18.22 wählt `nachDringlichkeit()`, wer hineinkommt; seit 3.18.23 läuft die Runde über alle Bereiche (`rundeWeitereBereiche`), das Limit zählt über alle zusammen | die Serie hängt nicht am Limit |
| Runde über mehrere Bereiche (3.18.23) | es ist immer genau ein Bereich offen, `ui.bereichId` wandert mit (`rundeNaechsterBereich`); `lastAction` merkt Bereich und Rest für Rückgängig | nie über Bereiche mischen: Schloss, Lehrer-Freigabe, Merken, Regler, Speichern rechnen je Bereich |
| `EINSTIEG_ZIELE` / `ui.einstieg` | Antworten nur im Arbeitsspeicher | nie speichern (§ 2) |
| Nutzungsstatistik | **entfernt in 3.17.23** (Betreiber: „jede Spur“), Code, Schalter, CSP und Datenschutz-Abschnitt | nicht wieder einbauen ohne neue Betreiber-Entscheidung (§ 3.5) |
| `APPLE_LOGIN_BEREIT` | `false` | erst mit Konsole |
| Debug-Overlay | entfernt in 3.6.13; `localStorage` `debugNav` wird beim Start gelöscht | nicht wieder einbauen (§ 3.9) |
| `mitZeitlimit` | 12 s für Auth-Aufrufe | nicht für Popups |

---

## 14. Checkliste vor jedem Commit

**Bei Rechnungen oder Empfehlungen zusätzlich vor dem Bericht:**
[`EMPFEHLUNGEN-PRUEFEN.md`](EMPFEHLUNGEN-PRUEFEN.md) angewandt, jede zentrale
Aussage an passenden Beleg/Gegenargument/Geltungsgrenze gebunden?
Keine Ersatz-Aussage aus einer nicht geprüften Variante ableiten.

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
- **3.17.50, G-099:** Tempo über ein fortlaufendes Zeitfenster messen, nicht
  den Ausgangspunkt periodisch auf die letzte Bewegung springen lassen.
  Ein verspätetes Einzelereignis entschied sonst trotz schneller Geste
  allein. Aufgezeichnete Pointer-Zeiten im echten Listener erneut abspielen;
  Stillhalten nach kurzem Wischen und Systemabbruch als Gegenfälle prüfen.

## 15. Vorfall-Liste

10.10.2026, eigene Tempo-Diagnose: Zu lange kleine Varianten geprüft,
bevor die Herkunft und Angemessenheit der200ms-Abnahmegrenze geklärt war.
Betreiber kritisiert verbrauchten Nutzungsrahmen ohne Fix. Die Grenze
stammt aus einem Agententest, nicht aus einem in diesen Quellen belegten
Geräte-/Nutzungsmaßstab. Bestehende §3.2/§5.3 gelten auch für Testregeln:
erst Messgröße, Herkunft und Geltungsbereich lesen, dann Aufwand einsetzen.
Eine unabhängige Rechenprobe war außerdem nur auf Exit0 statt auf wirksame
CPU4x geprüft: Einzel-CPU-Affinität zeigte1,13-fache Verlangsamung trotz
gesetztem Rate4. Zwei App-Grüns damit ungültig; keine Abnahme akzeptiert,
Runnercache weiterhin rot. Affinität gesperrt und semantische Eingangs-
prüfung vor weiteren App-Läufen ergänzt. Rohbelege bleiben erhalten.

10.10.2026, historische Wunschprüfung: Alte Aufbauzeiten aus dem Changelog
3.17.22 kurz als heutige Werte dokumentiert. Tatsächliche Deklarationen
danach gelesen: Vorlauf700,Schritt820,Nachlauf1100ms, historische Werte
620/700/900ms. Zentralen Eintrag sichtbar korrigiert. Bestehende §3.2-Regel
gilt auch für reine Planpflege: aktuellen Wert vor der Änderung am Code
lesen; parallel gelesene Quellen nicht vor ihrer Auswertung für einen
abhängigen Dokumentationspatch verwenden. Kein Produkt-/Teständerung.

10.10.2026, Nachtprüfung A17: Karte auf Stufe 1 im Formular, ausschließlich
Notiz geändert; fremdes Sicher bestätigt Stufe 2. Snapshot behält alte
Entwurfsstufe 1, deren Optionswert jetzt fehlt: Feld fällt auf 0, Speichern
ersetzt Serverstufe 2 durch 0. Feste Gegenprobe 97cbdcc/05269ebd bestätigt.
Bewusste Stufenwahl flüchtig kennzeichnen, unberührte aktuelle Auswahl
erhalten und nicht als Bewertungsauftrag schreiben (§ 6.3). Fünf echte
SDK-Kontrollen des Fixes grün; große Abnahme weiter offen.

10.10.2026, eigener A16-Zusatzprüfaufbau: kontrollierter Speicherstand
„Kartenkopie vorhanden, Tageskopie vorbereitet“ zunächst ohne gesicherten
SDK-Cache-Abschluss und ohne vollständige Tages-Versandbarriere geprüft.
Ein Lauf verlor vor dem Schließen die noch nicht dauerhaft nachgewiesene
SDK-Kartenkennung; ein anderer versendete durch ein Snapshot-Echo trotzdem
den Tagesbeitrag. Rote Originale erhalten, kein Produktfehler daraus
abgeleitet. Cache-Kennung/hasPendingWrites ausdrücklich prüfen und im
Fixture den Tagesversand selbst sperren; nach Neustart normaler Produktweg.
Gegenprobe mit deaktivierter Aktivierung weiterhin 0 statt 1 rot (§ 5.3).

09.10.2026, Tagesdeckel-Gegenprüfung auf Betreiberauftrag: Die eigene
Simulation verwendete i zugleich für Stufe und Termin; Stufe 3 war dadurch
vollständig synchron statt gleichmäßig verteilt. Feste Gegenprobe c78e986
rot (66 statt 37 anfangs fällig). Modell korrigiert; 450 Läufe neu gerechnet,
Originaldaten erhalten. Empfehlung Rundengröße als Tagesziel zurückgenommen:
dieses Verhalten wurde nicht simuliert und Bereichsmischung widerspräche
der Freigabe vom 06.10. Neun Auditfälle und tatsächliche Browser-Bereichsrunde
grün; keine Aussage über optimale Tageszahl/Behalten. Siehe § 5.3 und
`zyklus-2/mehrwert/TAGESDECKEL-AUDIT-2026-10-09.md`.

09.10.2026, E4 wieder geöffnet: Der Betreiber meldete verlorenen Plan in
Safari .26 nach Datenschutz/Impressum und „← Zurück“. Der grüne Test aus
3.18.15 schloss stattdessen den neuen Reiter. Gegenprobe am festen d64380a
verliert tatsächlich das Formular (0 statt 1). Vorhandenen Dialog nutzen,
vollständigen Plan und alle drei Formularwerte nach dem sichtbaren Rückweg
prüfen (§ 5.3). Eigene Umfeldprüfung meldete außerdem 1,89:1 für eine
vollständig abgeschnittene Überschrift auf iPad; Geometrie belegt
y=1058 außerhalb des Inhaltsfensters bis y=905. Durchscrollen und nur
tatsächlich sichtbare Befunde übernehmen, keine Kontrastgrenze lockern.

03.10.2026, D12 feste Quellenkontrolle: historischen Foto-Quellenhash mit
beiden gesicherten Quellen verbunden. Vorstand und Entwurf lieferten zuvor
dasselbe grüne PNG; unveränderter Vorstand jetzt exakt dasselbe rote PNG
wie Entwurf, bei gleichem DOM/Animationen. Ein-Pixel-Abweichung tritt ohne
D12-Änderung auf, kein Produktfix daraus begründet. Interner Kanalwertwechsel
und starke historische Fehler bleiben ungeklärt, Assertion unverändert rot.
Eigener Offline-Auswerter las stand.json zunächst ohne UTF-8 und brach ab;
alte Datei/Fehlerlog erhalten, korrigierte Auswertung separat gespeichert.
Bestehende §5.3-Regel zum UTF-8-Lesen befolgen; keine neue Doppelregel.

03.10.2026, D12-Ein-Pixel-Fortsetzung: tatsächliche Quad-Abdeckung grenzt
den Fehler auf die Hintergrundtextur ein; Ebenen-Wiedergaben ausdrücklich
als Wiedergaben, nicht echte 2×-GPU-Texturpixel eingeordnet. Isolierte
A/B/A-Proben und zwei App-Gegenproben erhalten; Original ohne Vorab-Fläche
und ohne frühere Rasterwiedergaben beide mit genau einem Kanalwert rot.
Eigene Ad-hoc-Ausgaben scheiterten an fehlendem args.snapshot, vermutetem
Browsercachepfad und PowerShell-Quoting; keine Messung daraus, tatsächlichen
Browserpfad aus Beleg gelesen und strukturierten Auswerter verwendet.
Andere Vorab-Höhe veränderte die echten Kacheln nicht; fehlende Wirkung
explizit markiert. Kein Produktfix, keine Prüfaufbaukorrektur (§5.3).

03.10.2026, D12-Kachelbreiten-Diagnose: Kommandozeilenabfrage ohne
`--enable-automation` vor Messung abgebrochen; korrigiert in allen Varianten.
`--disable-threaded-compositing` liefert keine Aufnahme; Teilbelege erhalten.
Eigener Coverage-Auswerter verglich nackte Zeigerreferenz mit präfixierter
Tile-ID und fand keine Kacheln; auf denselben referenzierten Zeiger
korrigiert, altes Ergebnis erhalten, neues Ergebnis separat gespeichert.
Keine Schlussfolgerung aus den leeren Listen. Vorab-Fläche erklärt und
verändert die Kachelbreite, bleibt aber im strengen ersten Foto rot
(ein Kanalwert, volle Breite bereits erfasst). 33/34 gezielte Fotos gleich
sind keine Gesamtabnahme. Keine Produktänderung, keine Toleranz (§5.3).

03.10.2026, D12/D15 weitere Ursachenprüfung: Das eigene Rasterwerkzeug
verband getrennte CPU-/GPU-Zähler allein über gleiche Zahlen. Frühere
LI-/`.view`-Behauptung sichtbar korrigiert; historische Berichte erhalten,
Werkzeug liefert ausdrücklich unbestätigte Kandidaten in neue Dateien.
Neue vollständige kalte Ganesh-/ANGLE-Spur zerlegt 91,043-ms-Flush in zehn
Shaderkompilierungen (80,905 ms). Innenkanten-Shader an Navigation und
Startliste durch gezieltes kaltes A/B/A isoliert, aber Entfernung verändert
Gestaltung und lässt weitere Pausen bestehen; keine Produktkorrektur.
Eigene Diagnoseabbrüche: fehlende historische boot-raster.json, Snapshot
ohne args.snapshot, Flush vor späterer Bildmarke; Ausgaben/Teilbelege
bewahrt, fehlende Daten explizit markiert und Zeitphasen getrennt (§5.3).
D12 feste Mindestkachelhöhe bleibt rot, tatsächliche Breite weiterhin
224 statt 800. Starke historische Fehler nicht durch ±1-Verlauf erklärt.
Keine Toleranz, keine Abnahme durch Folgefotos, keine Produktänderung.

03.10.2026, D12/D15-Detailauswertung: Rote/grüne DOMSnapshots mit
Malreihenfolge sind identisch; Screenshot ändert Rasterbereich und GPU-
Renderpässe. Ursache der Fehlerpixel damit nicht vollständig belegt.
Native Pixelskala 2 als reine Diagnose verändert selbst SVG-/Textpixel,
daher keine Prüfaufbau-Korrektur übernommen. D15 neue kalte Detailspur
zeigt 158,42 ms Bildpause und sichtbaren Aufholsprung, obwohl rAF keinen
Schritt >0,2 liefert. GPU-Flush belegt, Shader-/CSS-Zuordnung fehlt (§5.3).
Zwei Leseversuche erwarteten Playwright-Einzeldateien; tatsächliche
gebündelte coreBundle.js danach per rg-Dateiliste gefunden (§3.2).
Keine Produktänderung, alte und neue Belege bewahrt.

03.10.2026, instrumentierte D12-/D15-Fortsetzung: Der ungefilterte
Fotovergleich scheitert auf Rundenende 390/hell/voll, obwohl alle
erfassten Animationen beendet sind. Die unveränderte Ausgangsquelle
zeigt auf Kartensätze ebenfalls ein transientes Fehlerfoto; drei
Folgefotos sind pixelgleich zum historischen Vorher-Bild. Erfasste
Geometrien/Stile vor/nach Screenshot identisch, nur HTML-Serialisierung
eines verborgenen Felds ändert sich. Gleicher D12-Entwurf im gezielten
Nachlauf 16/16 pixelgleich, DOM am Rundenende identisch zur roten Probe.
Ursache der historischen Fehler nicht damit bewiesen; §5.3, keine
Toleranz und kein grünes Gesamtfoto-Ergebnis behaupten. D15-Auswertung
der gesicherten kalten Bilder bestätigt sichtbaren Aufholsprung des
Titels nach langen GPU-Aufgaben; zusammengesetzte Helligkeit nicht
mit isolierter Deckkraft verwechseln, warme Kontrollen keine kalte Abnahme.

03.10.2026, Paket-D-Ursachenprüfung: Die bisherige D15-Abnahme setzte
rAF-Abtastungen mit gezeichneten Bildern gleich. Neue Browserbilder zeigen
auch echte Bildpausen; deshalb erklärt eine Abtastlücke allein das Rot nicht.
Die vollständige Spur zeigt beim kalten Start desselben gesicherten zweiten
Entwurfs GPU-Rasterarbeit von 86,5 ms und einen Renderdurchgang von 45,6 ms.
Zwei anschließende Starts mit identischen Quellen im selben Browser haben
weder diese langen GPU-Aufgaben noch rAF-Lücken über 50 ms beim Fade.
Eine unabhängige lineare Fläche läuft viermal mit höchstens 20,5 ms
Bildabstand. Das grenzt den kalten Grafikaufbau als Ursache ein; keine
warme Kontrolle als erfolgreiche kalte Abnahme werten (§5.3/§5.6).
Die D12-Fehlerbilder bleiben erhalten. 28 neue Kontrollbilder und der
unveränderte 390/dunkel/leer-Rundgang sind pixelgleich mit dem alten
Vorstand, erklären die damaligen abweichenden Pixel aber nicht.
Ohne zeitgleiche DOM-/GPU-Daten des Fehlerbilds keine Ursache behaupten.

03.10.2026, Paket-D-Fortsetzung: Zweiter D15-Fix pausierte die neue
Fade-Animation bis nach dem ersten Stil-Durchlauf. Trotzdem Bildfolge rot:
0,237793→0,832793 über 166,6 ms; weder Ursache noch Gerätewirkung belegt.
Grenze 0,2 unverändert, Entwurf gesichert, nach zwei Produktversuchen
zurückgenommen (CODEX-START §6, bestehende Regeln §5.3/§5.6).
D12-Direktkontrollen und Rundgang 320/dunkel bestanden, ganzer Vergleich
scheiterte anschließend auf Einstellungen 390/dunkel/leer an einem
8×4-Pixel-Bereich. RGBA-/RGB-Daten und Bildausschnitt statt nur PNG-Bytes
prüfen; ohne Ursache keinen Messfehler behaupten (§5.3). Frühere Bilder
bewahrt. D13-Entwurf mit 15 Rohzeiten bleibt wegen fehlender belastbarer
Foto-Abnahme gesichert, nicht als fertig im Produkt.

03.10.2026, Paket D11, eigener erster Fix: `animation:none` und neue
opacity-Transition im selben Stil-Durchlauf blendeten den Toast weiter
hart aus. Die echte Bildfolge zeigte 1→0 ohne Zwischenwert; kein grünes
Ergebnis behauptet. Zweiter Anlauf beendet zuerst den gehaltenen Eintritt
durch Lesen der berechneten Deckkraft am schon 2,6 s bestehenden Toast,
dann beginnt die Transition (§6.4). Kein Maßlesen nach neuem `innerHTML`,
keine gelockerte Grenze: weiterhin mindestens fünf Austrittsbilder.

03.10.2026, Paket D, eigener Prüfaufbau: Die erste D3-CSSOM-Probe suchte
nur den Selektor für „Sicher“; derselbe Selektor existierte noch als reine
Rahmenfarbe und verdeckte die fehlende Animationsregel. Probe auf die
konkrete `animation`-Deklaration präzisiert (bei `var()` im Shorthand ist
`style.animationName` leer): fester Altstand 50d15ce
jetzt rot mit „CSSOM-Ring fehlt known“. Keine Produktänderung aus dem
ersten grünen Ergebnis abgeleitet (§5.3: Test muss anschlagen können).
Ein Status-Patch mit rückwärts angeordneten Hunks wurde vor jeder Änderung
abgelehnt; Hunks in Dateireihenfolge angewendet (§3.10/3.11).

03.10.2026, Paket-C-Gesamtlauf über Mitternacht: `t_serie_lang` erzeugte
Kalenderdaten um Mittag, die simulierte App verwendete vor 04:00 aber den
vorherigen Lerntag. Beleg 00:07: alte Testbasis 2026-10-03, lib.tag(0)
2026-10-02; schon T5 war 4 statt 5, T200 199 statt 200. Daten des Tests
an die vorhandene gemeinsame Lerntagsfunktion gebunden. Erwartungswerte
200/199/48 und Produktlogik unverändert; ursprüngliche Ausgabe bewahren
und nur diesen geänderten Test am identischen Produktstand nachlaufen lassen.

02.10.2026, Paket-C-Abschluss, Prüfaufbau: `t_nur_betreiber` fror sämtliche
normalen Bildschirme auf 3.17.56 ein und meldete die freigegebenen C1/C4/C7-
Änderungen rot. Historischen Fehlerbericht bewahrt. Die aktuelle Abnahme
isoliert die Textfreigabe: derselbe Quellstand mit erzwungen ausgeschaltetem
Schalter gegen die echte Freigabe, alle sieben Stationen bei 390/1440 px,
HTML und Pixel unverändert streng. Betreiber-, Schrift- und erzwungene
Normal-Konto-Freigabe müssen Unterschiede erkennen. Historischer Vergleich
bleibt mit `--historisch` erhalten; keine Produktänderung am Text-Probelauf.

02.10.2026, Paket-C-Abschluss, Gegenprüfung C12/C19: Das Kartenblatt über
Fortschritt hielt den Rückweg, aber seine Eingabe-Handler wurden nur in
Verwalten verbunden. Geänderte Übersetzung plus Escape schloss ohne Rückfrage;
auch ein Neuzeichnen hätte den Text verloren. Reale UI-Probe bestätigte den
Fehler vor der Korrektur. Bestehende Handler auch bei ui.karteSheet verbinden,
C19-Abnahme um Escape/Abbruch und Neuzeichnen erweitert (§6.3). Begonnenen
Gesamtlauf bewahrt und beendet; korrigierten Quellstand vollständig neu prüfen.

02.10.2026, C1-Fortsetzung, eigener Folgefehler: Das dauerhaft verbundene
Kartenblatt behielt nach Duplikat-Abbruch die Austrittsstile. `closeDialog`
wählte mit `.dlg` das Kartenblatt darunter; bisher verdeckte der Neuaufbau
den falschen Zielknoten. Neue Sichtbarkeitsprobe rot, Schließen auf den
eigenen `aria-labelledby="dlg-title"`-Dialog begrenzt (§6.3). Die Dauer und
der Bewegungsweg bleiben unverändert; kein Paket D begonnen.
Vorheriger Fehler-Test erwartete außerdem einen frei gewählten Fehlercode
in `__FB.fail`; die Attrappe liefert dort immer permission-denied. Den
echten erneuerten und den dauerhaft abgelehnten Zweig unterscheiden (§5.4).

02.10.2026, C1-Fortsetzung, eigener Prüfaufbau: Der erweiterte Leertest
verglich die Scroll-Lage vor dem ersten Speichern (112 px) mit der Lage
nach Tastaturereignissen (0 px). Diagnose am gesicherten Paket-C-Ausgang
und am Fix: beide wechseln bereits beim Speichern von 680 auf 568 px
Dokumenthöhe; das Öffnen und die Tastatur verändern die Lage nicht.
Messphasen getrennt (§5.3), keine Produktänderung aus dem Messfehler.
Der zwischenzeitlich beendete lokale Server lieferte zuvor
ERR_CONNECTION_REFUSED; dieser Lauf ist kein Befund. Server neu gestartet.
Einige Lesebefehle nannten nicht vorhandene Tests beziehungsweise nutzten
einen Windows-Glob als rg-Pfad. Tatsächliche Dateiliste gelesen; daraus
keine Produktänderung und keine erfolgreiche Prüfung abgeleitet (§3.2).

02.10.2026, Paket C, C11 / G-021: Der Bericht von 3.17.33 behauptete einen
mitwachsenden Suchpuffer, aber `dbc8ef7:app.js` enthält weiter `size > 4000`.
Die behauptete Änderung war nicht im gespeicherten Produktcode angekommen.
1500 Karten mit Notiz: zweite gleiche Suche weiterhin 72.026 normalize-Aufrufe.
Bestehende Regeln §1.3/§3.2/§5.3: tatsächlichen Diff und Abnahme lesen, nie
einen Bericht als Beleg übernehmen. Falsche Erledigt-Meldung und Changelog
sichtbar korrigieren; neue Probe gegen festen Vorstand b60abf4.

02.10.2026, Paket C, C1: Zwei lokale Versuche verhinderten den Neuaufbau
des Wortfelds nach Hinzufügen nicht. Erst render in submitCardForm,
dann render in zeigeToast unterdrückt, Identitätsprobe blieb rot.
Bestehende Regeln §3.4/§5.3: vollständigen Render-/Snapshot-Pfad verfolgen,
DOM-Identität messen. Nach zwei Versuchen gemäß CODEX-START §6 zurück;
Patch gesichert und ausschließlich eigene Produktänderungen zurückgenommen.

01.10.2026, Paket-B-Version: Cache-Präfix beim Ersetzen als adrabic-v statt
adrabic angenommen; Standprüfung rot, weil sw.js unverändert blieb.
Exakte Deklaration gelesen und gezielt korrigiert, vor jedem Gesamtlauf.
Bestehende Regel § 4.1: tatsächliche Versionsdeklarationen lesen und prüfen.

01.10.2026, Paket B fortgesetzt: B6 maß direkt nach render() teilweise noch
den 8-px-Startversatz der 0,01-ms-Bewegung. Schriften und Bilddurchlauf
abgewartet; feste Gegenprobe 07c7568 bleibt mit zwei echten Fehlern rot.
Abnahme für 375 px sogar auf exakt Unterkante <= Fensterhöhe verschärft.
Ursache des verbleibenden Produktfehlers: 760-px-Regel erreicht 844-px-Fall
nicht; 16 px Fußpadding lassen auf 667 px noch 0,297 px Überstand.
Gemessen statt erneut blind justiert (§ 5.3).

01.10.2026, Paket B, eigener Umfeld-Test: Thema nur an fullerStore gegeben,
obwohl Gastseiten ihre Farbe aus localStorage lesen; hell war tatsächlich
dunkel. Lokale Themenwahl setzen und am echten html[data-thema] verlangen
(§ 5.3/5.4). Frühere Umfeld-Angaben sichtbar im Logbuch korrigiert;
betroffene Messungen neu, keine Produktänderung aus dem Prüfaufbau.

01.10.2026, Paket B, eigener Prüfaufbau: zunächst eine nicht vorhandene
Anker-ID und einen erfundenen Neu-Knopf verwendet. Keine Produktänderung
daraus abgeleitet; tatsächliche Aktionen/Feld-IDs gelesen und korrigiert
(§ 1.3/5.3). Danach feste B1-Gegenprobe mit fehlendem Nachklang rot,
Neu-/Bestandskonto und erste Karte nach Korrektur grün.

01.10.2026, Paket B, eigener Prüfaufbau B4/B10: nach unmittelbar gesetztem
Plan blockierte die echte 400-ms-Doppeltippsperre Plan speichern. Fixture
wartet jetzt 450 ms wie die Bedienung; beide festen Gegenproben treffen
danach den tatsächlichen Befund (§ 5.3), kein Produktfix aus dem Messfehler.

29.09.2026, G-117: Der Betreiber wollte weiter den Batch-Knopf verwenden;
mehrfache GitHub-Umleitungen lösten seinen lokalen Abbruch nicht. Batch
veröffentlicht jetzt nur eine geprüfte Kopie von origin/main, statt lokale
Entwürfe zu löschen/verschieben oder ungeprüft zu committen (§4.5). Fetch-
Fehler darf keinen alten Ersatzstand nutzen. Git/Node sind Pflicht; temporäre
Verzeichnisse vor rekursiver Entfernung absolut prüfen. PowerShell kann
mehrere exe-Treffer liefern: genau einen verwenden. Eigene Vorabfehler wurden
rot korrigiert: doppelter Datei-Patch abgelehnt (keine Änderung), Tool-Treffer
als Array, Mock-Zeilenumbruch und cmd-Argumentquotierung. Keine echte
Veröffentlichung durch diese Tests und keine rote Probe als bestanden melden.


29.09.2026, Runde14 am Ladegerät: unveränderter Original-Tempotest grün,
zehn Bewertungen3000 Karten geführt/eigen maximal57ms (Grenze100ms,
CPU4×). Keine der vermuteten Layoutkorrekturen übernommen und keine Grenze
gelockert. Gleicher Produktfingerprint; die rote Messung war kein Beleg
für einen App-Rückschritt. WMI meldet weiter798MHz, eignet sich allein
also ebenfalls nicht als Nachweis realer Browserleistung. §5.3.

29.09.2026, eigene Gewichtung G-110: fremder deleteUser-Aufruf zunächst
als hoch dokumentiert. Derselbe unautorisierte Auth-Löschauftrag wie G-098
ist kritisch; nach vollständiger App-/Alt-Gegenprobe korrigiert.

29.09.2026, Runde-14-Tempodiagnose: Fix .56, Ausgang .55 und ursprünglich
grüner Stand .47 auf Windows/Chrome154 rot; unabhängige DevTools-Werte
schwanken stark, CPU4× weit unter Low-Ziel. Akkubetrieb17%, WMI798MHz.
Weder .56-Regressionsursache noch Messfehler allein damit bewiesen;
kein Grenzwert geändert, keine Freigabe. Netzbetrieb als nächste kontrollierte
Bedingung, Regel §5.3. Eigene Diagnosefehler vor Browser-/Messstart:
mehrdeutige Quellstelle ausdrücklich abgebrochen und präzisiert; Benchmark-
Funktionsdeklaration für Playwright in eindeutigen IIFE-Ausdruck geklammert.

29.09.2026, Runde-14-Mustersuche G-111: allgemeiner Registrierungsnachtrag
nach Netzwerkfehler ändert das SDK-Profil von B auf den Testnamen von A
und startet dessen Mail. Vollständige App belegt beide Aufrufe, keine
Produktionskonten. Regel §8.3, hohe Aufgabe für Folgerunde.

29.09.2026, eigene Messkorrekturen: Entwurfs-Ausgabe wurde erst nach dem
Speichern gelesen (Felder dann leer), jetzt vorher sichern. Ein neues
Registrierungs-Probeformular wurde vom noch aktiven Gast-Onboarding
verdrängt; jetzt echten Formularzustand/ID vor SDK-Start prüfen. Die
Schreibfehler-Hypothese bestätigt sich im Probeaufbau nicht: B-eigener
Start-Write räumt die Meldung auf. Kein neuer Produktfehler daraus behauptet.

29.09.2026, Runde 14, eigener Prüfstartfehler: isolierte Wiederholung ohne
CHROMIUM in neuem PowerShell-Prozess. Playwright fand sein nicht installiertes
Headless-Shell nicht; keine Messung. Originales 150ms-Protokoll vorher
bewahrt, Browserpfad gesetzt. Regel §5.1, Windows-Aufruf in LIESMICH ergänzt.

29.09.2026, Runde-14-Mustersuche G-110: Bereits bestätigter Dialog, danach
Auth-Wechsel vor seiner Microtask. `kontoVertipptNeuAnfangen` erfasst B
erst nach dem Dialog und ruft deleteUser(B); doLogout meldet B ab.
Kontokontext vor dem Dialog erfassen und danach prüfen (§8.3); Dialog-
Abbruch im Auth-Reset schützt nur noch nicht aufgelöste Dialoge.

29.09.2026, Runde-14-Logsichtung G-109: `t_inventar2` wählt das verborgene
Fehlerdialog-Markup und liefert leere Inventare; sein heuristischer Einstieg
stoppt vor Aufdecken/Bewerten. Exit 0 ist kein vollständiger Rundgang.
Prüfstand-Aufgabe für Folgerunde, Regel §5.3; kein Produktfehler behauptet.

29.09.2026, Runde-14-Mustersuche G-108: Zwei vollständige App-Fälle belegen
private A-Kartentexte im B-Formular und deren tatsächliche Speicherung in B;
Bearbeitungs-ID leer, Blatt/Entwurf bleiben. Neue hohe Aufgabe, §8.3.
Eigener Messfehler im angrenzenden Ideenfall: Einstellungen waren nach Auth
geschlossen, deshalb nicht sofort sichtbar. Test blieb rot, korrigierte
Probe braucht echtes Wiederöffnen des Boards; nicht als grün zählen (§5.3).

29.09.2026, Runde-14-Mustersuche G-107: Vier echte Auth-Funktionspfade
lassen nach alter Antwort die neue Sitzung neu laden, ersetzen Info/Busy
oder fragen B zur Reauth auf. `konto_authrest.js --befund` belegt jeweils
die konkrete Wirkung; keine Datenlöschung von B behauptet. Folgerunde,
Regel §8.3, da G-102–G-106 die fünf Aufgaben dieser Runde sind.

29.09.2026, Runde 14, eigener Dokumentationsfehler beim Hochzählen: globale
Ersetzung änderte zusätzlich den historischen .55-Kommentar in `sw.js`.
Diff-Gegenprüfung fand es, Kommentar wiederhergestellt. Der bereits gestartete
Lauf wurde beendet und für den korrigierten Quellstand frisch gestartet;
keine alten Ergebnisse übernommen. Regel §4.1: nur Versionswerte/URLs ändern.

29.09.2026, 3.17.53/.54: Weißes Aufblitzen am iPhone zweimal falsch
eingeordnet (erst iOS-Animation, dann fehlende HTML-Farbe). Erst die
Rechnung am Vollbild (12 % Weiß) zeigte die leere Web-Ansicht; Ursache war
„Netz zuerst“ für die Seite. Regel § 11: Gerätebilder rechnerisch zerlegen,
bevor gebaut wird.

29.09.2026, Claude-Prüfung 3.17.52: (1) Der Name auf dem Ladebildschirm stand
in `ui-serif`: auf dem iPhone New York, im PNG Palatino. `t_boot_geometrie`
schloss Schrift ausdrücklich aus und konnte das nicht finden. Regel § 11.
(2) Runde 13 (`closeDialog`) verwarf beim Schutz vor alten Timern auch das
Auflösen des eigenen Promise, und der Test schrieb `antworten===0` fest.
Regel: Ein Schutz vor fremder Wirkung darf die eigene Fortsetzung nicht
abschneiden; Tests prüfen beides.

29.09.2026, Betreiber-Rückmeldung zu 3.17.51: iPhone-Start weiterhin falsch.
Neu erzeugte/versionierte PNGs (.47/.48) und simulierte svh-Korrektur (.49)
sind keine erfolgreiche Geräteabnahme. Ursache weiterhin offen; bestehende
Regel §1.3 ausdrücklich anwenden: Chromium/Simulation und echtes installiertes
iPhone trennen. Großplan auf Betreiberwunsch pausiert; neue gezielte
Claude-Übergabe `onboarding/CLAUDE-HANDOFF-2026-09-29.md`, kein weiterer
Verdachts-Fix und keine Produktänderung in der pausierten Runde 14.

29.09.2026, eigener Berichtsfehler: CPU-4×-Zeichnen voreilig pauschal ohne
Bildpausen beschrieben, weil der Abnahme-Runner nur Handy-Zeilen zeigte.
Vollständiges Log: kleines Handy 1×83ms, iPad 124 Pausen bis 217ms.
Aussage sofort berichtigt; jede beschreibende Ausgabe vollständig lesen,
auch alle Geräte, bevor Flüssigkeit behauptet wird (§ 5.3/5.4).

29.09.2026, Prüfstand durch Windows-Standby unterbrochen: X ohne Ausgabe
im Zeitlimit, später Schreiben nach fast 2h40. Systemereignisse belegen
Energiesparen während der Läufe. Keine App-Korrektur daraus ableiten;
Abbruch bleibt rot. Fortsetzen nur mit identischem Produkt-/Helper- und
Test-Hash, gültigen vollständigen Ausgaben; fehlende/rote erneut (§ 5.3).

29.09.2026, neuer Musterfund G-106: Alte A-Bestätigungsprüfung erneuerte
B-Token und lud B-Seite neu, alter Versand ersetzte B-Info. Echter
Funktionscode mit kontrollierten Antworten. User bis zum Ende binden (§ 8.3).
Eigener Messfehler zuerst: Endkommentar existierte schon vor dem gewünschten
Funktionsbeginn; `slice` war leer. Endmarkierung erst ab Start suchen und
Funktionsvorhandensein verlangen; Test brach rot ab, kein falscher Erfolg (§ 5.4).

29.09.2026, neuer Musterfund G-105: Alter Board-Erfolg leerte den ungesendeten
B-Entwurf und schloss dessen Formular; alte Ablehnung entfernte dessen
Stimm-Anzeige. Kontrollierter echter Funktionscode, keine Server-Stimme
verändert behauptet. Konto-Kontext auch bei UI-Rückmeldungen prüfen (§ 8.3).

29.09.2026, neuer Musterfund G-104: `umzugStarten` schrieb nach altem
A-Stapel `schemaVersion: 2` in B und verwarf dessen wartenden Umzug.
Kontrollierter echter Funktionscode belegt Write und Zustandsverlust;
Ursprungskonto und ursprünglichen Umzugszustand bis zum Ende binden (§ 8.3).

29.09.2026, Prüfstand-Sichtung G-039-Gegenprobe: Alter Ablauf wählte keine
Hürde, blieb deshalb auf dem gesperrten Schritt und meldete `null → null`
fälschlich als Kartensprung. Hürde auswählen, echte Kartenpositionen
verlangen; fehlende Elemente sind Messfehler, kein positiver Fehlernachweis
(§ 5.3/5.4). Geänderter Einzeltest muss erneut laufen, App unverändert.

29.09.2026, Dokumentations-Widerspruch erkannt: §6.1 verlangte weiter
pauschal einen festen Weiter-Knopf, obwohl 3.17.44 den sticky-Fuß wegen
Überlagerungen bewusst entfernte. Lange Hürden-Screens wachsen jetzt
normal; kurze halten den Fuß unten. Lehre an Code/Übergabe angeglichen,
kein alter Overlay-Fix zurückgebaut (§ 3.5/6.1).

29.09.2026, neue Musterfunde G-102/G-103: Späte Antworten beim Erzeugen,
Freigeben und Beenden änderten jeweils Teil-Felder von B. Angehaltenes
FileReader-Lesen importierte nach Wechsel Datei-Inhalt von A in B (42→44
Unterdokumente). Äußere Aufträge waren nicht konto-gebunden; der inzwischen
geschützte Helper erfasste B als scheinbar neuen Auftrag. Herkunft am
Beginn und nach jedem Await prüfen (§ 8.3); Fixes folgen in Runde 14.

29.09.2026, G-100 UI-Nachprüfung: Löschdialog von A überlebte den Wechsel
zu B; Bestätigung löschte Bereich und 40 Karten von B. Ein alter
Austritts-Callback konnte außerdem den neuen Dialog entfernen.
Auth-Wechsel löst alte Dialoge als Abbruch auf und beendet Halten;
Fortsetzungen prüfen das Ursprungskonto, Timer ihre Dialog-Identität (§ 8.3).
Eigener erster Dialogtest wartete nur 500ms: Boot war noch aktiv, der Klick
erreichte den Dialog nicht. Boot-Ende und Eingabefeld jetzt explizit geprüft;
dieser erste Versuch zählt nicht als Gegenprobe.

29.09.2026, G-098 ergänzt: Kontrolliert angehaltene Konto-Abfrage von A,
Auth-Wechsel zu B und anschließende Freigabe löschten im Stand 5de6969
Nutzer-Dokument und Auth von B. Mit ursprünglichem Löschkontext bleiben
B-Dokument/Auth/40 Karten erhalten; alte Fortsetzung bricht ab (§ 8.3).

29.09.2026, Gesamt-Prüfstand: `t_317.js` erwartete einen dynamischen
Erinnerungshinweis an fester Position und fand deshalb keinen Knopf.
Erinnerung über feste Einstellungszeile prüfen, Hinweis-Reihenfolge nicht
als feste Navigation voraussetzen. Alte Skripte ohne finally ließen bei
unbehandeltem Testfehler Browser offen; gemeinsamer Preload schließt nur
die vom jeweiligen Test gestarteten Browser und erhält Exit 1 (§ 5.3).

29.09.2026, neue Funde G-100/G-101 im Stand 3.17.50: Nach verspäteter
Bereich-Stapelbestätigung wurden Karten im inzwischen angemeldeten Konto B
gelöscht (40 → 0); Vollschreiben erzeugte Stapel mit Referenzen von B.
`t_konto_stapel.js --gegenprobe` reproduziert beide Fälle im festen Commit
`5de6969`. § 8.3 verlangt Bindung jeder Fortsetzung an den Ursprung.

29.09.2026, eigener Fehler im unveröffentlichten G-075-Fix: Atomare Zähler
ohne Reset-Kennung ließen ein altes Offline-Undo nach fremdem Reset zu.
Echter SDK-/Emulator-Test: Server `w:-1`; nächste Antwort wäre verloren.
Mit verbindlicher Reset-Kennung und Regel-Ablehnung bleibt `w:0`, nächste
Antwort `w:1`. Der erste Testversuch wartete auf den Dialog vor dessen
Bestätigung, der zweite hatte eine noch nicht übergebene Bewertung; beide
Messfehler korrigiert und vorbereitenden Serverstand explizit geprüft (§ 5.4/8.3).

29.09.2026, eigener Prüfstand-Fehler, G-096: Abnahme über Nacht unterbrochen;
zwei Prozesse ohne vollständige Ausgabe liefen in Zeitüberschreitungen.
Vor 04:00 zeigten die kalendertäglichen Fixture-Daten zusätzlich keine
fälligen Karten. Kein solcher Lauf gilt als grün. Fixtures folgen jetzt
dem bestehenden Lerntag; `t_pruefdatum.js` prüft dessen Grenze (§ 5.4).

29.09.2026, Texte Stufe 1, eigener Fehler vor dem Commit: Zwei per Skript
eingefügte reguläre Ausdrücke verloren ihren Backslash (`/^\d{4}…/` wurde zu
`/^d{4}…/`, `/\s+/` zu `/s+/`). Die Shell bzw. ein zusätzliches Escaping in
Heredoc/`node -e` schluckte `\\`. `node --check` findet das nicht – der
Ausdruck ist gültig, nur falsch. Gefunden hat es erst der Test
(`kreisTag fehlt`). Regel: Code mit Backslashes über das Write-Werkzeug in
eine Datei schreiben, nicht über Shell-Heredoc oder `node -e`; danach die
eingefügten Regex per `git diff | grep '\\'` gegenlesen (§ 3.3, § 5.3).
Außerdem wandelte `sed -i` unter Git-Bash CRLF-Dateien in LF um – für Git
harmlos (autocrlf), aber Werkzeuge, die Bytes vergleichen, sehen es.

30.09.2026, Texte Stufe 1/2, eigene Fehler: (1) 3.18.0 zählte die 31
Startbild-Links nicht mit; `t_boot_geometrie.js` verlangt sie, lief aber
nicht, weil nur eine Auswahl der Tests lief. Regel wie § 15 (27.09.):
vor jeder Version den **ganzen** Prüfstand (`alle_pruefen.js`), nicht eine
Liste. (2) Eine offene Ansicht rief bei jedem Neuzeichnen ein Laden auf,
das nach einem Fehler nicht gesperrt war – 484 Versuche in Sekunden. Vor dem
Commit in der Gegenprüfung gefunden. Regel § 6.7 gilt auch für Aufrufe aus
`render()`: ein Fehlerzustand muss den nächsten Versuch sperren. (3) Die
Backslash-Regel von oben galt auch für `bash`-Heredocs mit Testcode – beim
selben Arbeitsgang zweimal wieder passiert; Write-Werkzeug benutzen.

30.09.2026, G-119 (3.18.10): `t_text_tempo` blieb nach drei vermuteten
Fixes rot. Ursachen erst per Trace/Profil belegt: Schrift-Wechsel setzte die
Seite doppelt, `render()` las nach `innerHTML` Fenstermaße (erzwungenes
Setzen im Klick), die Text-Ansicht setzte 40 Ayat in einem Bild. Regel § 5.3
(zerlegen, A/B) und § 6.4 (keine Maße nach `innerHTML`, Schrift vorladen).
Eigener Fehler dabei: eine per Python-Heredoc eingefügte Zeile mit `'\n'`
wurde zu einem echten Zeilenumbruch im JS-String (Syntaxfehler in einer
Messhilfe). Gleiche Klasse wie die Backslash-Regel oben: Code mit Escapes
nur über Write/Edit.

Kurzform: *was – Ursache – Regel*. Neue Vorfälle unten anhängen.

28.09.2026, bis 3.17.49, G-099: Schneller kurzer Wisch links wechselnd ohne
Bewertung; Touch-Spur zeigt abrupten Tempo-Neustart nach 80ms und Entscheidung
über letzte 13,75px. Derselbe Listener bewertet außerdem nach Stillhalten
eine kurze Geste. Fortlaufendes Fenster samt Loslass-Punkt; Altstand-Gegenprobe
und echte CDP-Gesten prüfen (§ 4.x). Keine Wischgrenze verändert.

28.09.2026, G-098, offen bei 3.17.50: Nach Konto-Löschen bleibt die alte
Löschsperre gesetzt. Nächste Anmeldung lädt ohne Reload keine Daten.
Laufzeit-Gegenprobe bestätigt. Sperren gehören zum ursprünglichen Konto;
alte asynchrone Löschschritte vor Freigabe eines Folgekontos binden (§ 8.3).

28.09.2026, bis 3.17.49, G-075: Zwei Geräte mit 5 Offline- und 3 Online-
Antworten ergaben nur 5 statt 8. Ganze Tageswerte/Max-Merge verloren fremde
Beiträge. Atomare Differenzen mit echtem SDK prüfen (§ 8.3).

28.09.2026, bis 3.17.49, G-093: Eine abgelehnte Kartenbewertung vor oder
nach Kontowechsel konnte beim Nachholen das nächste Konto verändern.
Beide Fälle im alten Commit reproduziert. Konto-Referenz und Listenbindung
prüfen, Auth-Wechsel leert alte Ablehnungen (§ 8.3).

28.09.2026, bis 3.17.49, G-094/G-095: Bestätigte Zähler-Snapshots ersetzten
die Zeichenfläche einer laufenden Runde; abgelehnter Verlauf-Reset blieb
ohne Meldung. Mit echtem SDK, DOM-Identität und Regel-Ablehnung nachgewiesen.
Nur Zähler ändern ohne Neuaufbau; Reset-Fehler sichtbar melden (§ 8.3).

28.09.2026, neuer Fund G-097, noch offen bei 3.17.50: Nutzer-Dokument-
Fallback verwendet nach abgewarteter `not-found`-Antwort die inzwischen
gewechselte globale Referenz. Kontrollierter Test mit echtem
Funktionsquelltext schreibt Neuanlage und alten Einstellungs-Patch in B.
Jeden asynchronen Folgeschritt an sein Ursprungskonto binden (§ 8.3).

28.09.2026, eigener Prüfstand-Fehler, G-096: „ruhig“ meldete im aktuellen
und alten Code die Deckkraft des noch ausstehenden 0,01-ms-Startbilds als
Verzögerung. Messung präzisiert; echte wieder eingeschaltete Delays ergeben
weiterhin vier Befunde. Eigene Testaufbaufehler: Neustart bekam wegen des
Service Workers uninstrumentierten Code; Daten waren vor Boot-Ende bereit.
SDK-Test blockiert SW und wartet zusätzlich auf Boot-Ende (§ 5.4).
Die Abmelde-Gegenprobe suchte zunächst einen sichtbaren Dialog; auf dem
Einstieg wird dieser DOM-Knoten nicht aufgebaut. Korrigiert: tatsächlichen
Speicherfehler-Zustand prüfen, statt sein Rendern vorauszusetzen (§ 5.3).
Der X-Test behandelte ein fehlendes Nullfeld zunächst als NaN. Erwartete
Antwortzahl mit denselben optionalen Arten wie `normVerlauf` prüfen (§ 5.4).

28.09.2026, eigener Arbeitsfehler vor Commit 3.17.49: Ein Patch ohne
Kontext fügte den neuen Changelog-Eintrag unten statt oben ein. Die
Standprüfung wurde rot; Eintrag vor Veröffentlichung nach oben verschoben.
Neue Versionsüberschriften nur mit Kontext einfügen und Standprüfung bestehen
lassen (§ 4.1).

28.09.2026, 3.17.48 weiterhin am Gerät fehlerhaft: Screenshot IMG_4397 zeigt
das Startbild und das helle HTML-Zeichen vertikal versetzt übereinander.
Die vorherigen Chromium-Tests hatten keine unterschiedliche svh/vh-Höhe
simuliert. Standalone-Boot auf volle vh-Höhe begrenzen; Gegenprobe reproduziert
bei 48px verkürztem svh den 24px-Versatz. WebKit-Befund:
https://bugs.webkit.org/show_bug.cgi?id=254868 (§ 11). Gerätebestätigung offen.

28.09.2026, eigener Fehler bei 3.17.47: Nach Änderung aller Startbilder
blieben ihre HTML-URLs gleich. Wegen `Cache-Control: max-age=604800` konnte
die installierte App weiterhin alte PNGs laden; ob dies der einzige iPhone-
Befund ist, muss am Gerät geprüft werden. Bei jedem neuen Startbild die
Versions-Query der 31 Links hochzählen und die tatsächlich angefragten URLs
testen (§ 11, `t_boot_geometrie.js`).

27.09.2026, Runde 12: Startbilder wurden mit Desktop-Kontext erzeugt; das
Zeichen lag etwa 7,5 CSS-Pixel links vom mobilen HTML. Generator auf mobilen
Kontext umgestellt und vier Geometrien geprüft (§ 11). Der Einstiegstest
forderte nach Entfernung des Sticky-Fußes noch alte Scroll-Puffer; Abnahme
prüft jetzt Überlappung und tatsächliche Antippbarkeit statt alter Maße (§ 5.3).

27.09.2026, eigener Prüfablauf: Der Volltest-Starter setzte auch für die
gesamte Lernrunden-Abnahme nur fünf Minuten an; diese wiederholt 13 bereits
gelaufene Tests und braucht länger. Abnahme stattdessen aus den erfolgreichen
Einzeltest-Logs ausgewertet. Leistungsprüfungen liefen zunächst gleichzeitig
mit anderen Browser-Tests (137 ms Ausreißer); Laufzeiten immer ohne
konkurrierende Browser-Tests messen. Fehlerpfade neuer Browser-Tests brauchen
`finally`, damit nach einer Assertion kein Browser offen bleibt (§ 5.3).

| Wann | Was | Ursache | Regel |
|---|---|---|---|
| 27.09. (eigener Fehler nach 3.17.47) | Veröffentlichung blockiert durch AGENTS.md und erzeugte splash-links.txt | Unversionierte Dateien beim Abschluss gesehen, aber Deploy-Sperre nicht berücksichtigt | § 3.11: vor Deploy-Aufforderung leeren Git-Status prüfen; nur Hosting-ausgeschlossene Hilfsdateien gezielt ignorieren |
| 27.09. (Runde 12) | Startbild-Zeichen etwa 7,5 Pixel links vom mobilen HTML | Desktop-Kontext reserviert Scrollleistenplatz | § 11: mobile Bilder im mobilen Kontext erzeugen und vergleichen |
| 27.09. (Runde 12, Prüfstand) | Einstiegstest verlangte alte Sticky-Puffer; Leistungstest lief parallel; Abnahme-Starter hatte zu kurzes Zeitlimit | Testablauf passte nicht zum geprüften Verhalten | § 5.3: Verhalten prüfen, Leistung isoliert messen, Gesamtzeitlimit passend wählen, Browser auch im Fehlerfall schließen |
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
| 30.09. (Texte Stufe 4, eigener Fund zu Stufe 2) | Quran-Text (Tanzil) zeigt in 2240 von 6236 Ayat einen gestrichelten Kreis ◌ statt der kleinen runden Null (U+06DF, dazu U+06E3, U+06EB) | Stufe 2 prüfte nur, **welche Schrift** jedes Zeichen zeichnet (CDP `getPlatformFontsForNode`: UthmanicHafs für alle 68) – nicht, **was** sie zeichnet. Die King-Fahd-Schrift hat für diese Codepunkte als Glyphe einen Platzhalterkreis | Schriftabdeckung heißt nicht richtige Darstellung: jede Glyphe, die ein Text braucht, einmal **einzeln sehen** (Bildschirmfoto) und auffällige Glyphen maschinell suchen (fontTools: gleiche Umrisse/Größe wie der Platzhalter). Bildschirmfotos echter Stellen gehören zur Abnahme jeder Stufe, die Text zeigt |
| 30.09. (Texte, eigener Fehler seit Stufe 2) | Textzeilen standen nie in der Quran-Schrift, sondern in einer Ersatzschrift | `'<span class="x"' + schriftAttr(t)` – `schriftAttr` liefert selbst `class="arabic"`; das **zweite** `class`-Attribut verwirft der Browser still. Tests prüften Wortlaut und Lage, nie die gezeichnete Schrift | Eine Hilfsfunktion, die Attribute zurückgibt, bekommt die eigenen Klassen als Parameter (`schriftAttr(text, klassen)`). Bei Schrift-/Darstellungsfragen `CSS.getPlatformFontsForNode` am **echten** Element messen, nachdem die Schriften geladen sind (`t_quran_schrift.js`) |
| 01.10. (Paket A, eigener Vorabfehler) | Ausgeschnittener Auth-Patch war ungueltig; git apply --check lehnte ihn vor jeder Aenderung ab | Zweites Vorkommen von @@ innerhalb einer Hunk-Kopfzeile als Grenze genommen | Nur ^@@ -Zeilen als Hunk-Grenzen; Vorpruefung vor Anwendung (§ 3.11) |
| 01.10. (Paket A, eigener SW-Pruefaufbau) | Rechtsseiten-Fallback mit fluechtigem Boot-Knoten gemessen; Routen lieferten trotz Offline oder brachen vor dem Worker ab; echte Normal-Update-Kontrolle weiter rot | DOM-Marker und Netzsimulation bildeten den echten Worker nicht verlässlich ab; Normal-Kontrolle nicht zuerst abgesichert | Bleibender App-Knoten, echter lokaler HTTP-Server, erfolgreicher Update-/Offline-Normalfall zuerst (§ 5.3). A7/A13 zuerst zurueck; ausdruecklich beauftragte Fortsetzung nimmt sie nach korrigiertem Aufbau ab |
| 01.10. (Paket A, eigene SW-Fortsetzung) | Async-Wartebedingungen liefen vor Aktivierung weiter; SDK-Cache-Abfrage trotz vorhandener URL falsch; Datenschutz-Titel falsch erwartet; Diagnose-Ausdruck/PowerShell-Quote vor Lauf abgelehnt | Promise im lokalen Playwright-Poller wahr, nackter Request trifft Vary nicht; h1 und Shell-Syntax nicht exakt gelesen | Abgewartetes evaluate-Polling und Controller-Identitaet, Cache-Keys plus echter Offline-Start, echter h1 Datenschutz, strukturierter Patch (§ 5.3). Beide festen Gegenproben und neue Normal-/Abbruch-/Rechtsseiten-Proben danach gruen |
| 01.10. (Paket A, eigene Abschluss-Diagnose) | Erstes Log-Leseskript mit fehlerhafter PowerShell-Quote abgelehnt; anschliessend ungenauen Dokumentationsanker verwendet | Innere einfache Quotes nicht verdoppelt; Abschnittsname geraten | Echte PowerShell-Quotierung und vorher gelesener exakter Patch-Anker (§ 3.11); beides korrigiert, keine Produkt-/Testquelle geaendert und kein Ergebnis verloren |
| 01.10. (Paket A, eigener Feedback-Pruefaufbau) | Erster Dialogtest wartete nach der Ausweis-Erneuerung auf den falschen Banner; Formular ueber erfundenes ui.view gewaehlt; Geometrietest verlangte global 0 px trotz bestehendem Offline-Banner | Reale Auth-/UI-Zweige und Vorstand nicht vor Erwartungswert gelesen | Echte UI-Schalter, beide Auth-Fehlerzweige, Lage innerhalb des Formulars und feste Alt-Gegenprobe (§ 5.3). Vorstand und neuer Stand zeigen bei 320 px denselben globalen Versatz 104.15625 px |
| 01.10. (Paket A, eigener Attrappen-/SDK-Messfehler) | runTransaction doppelt in den SDK-String eingefuegt: neue Browser-Tests konnten nicht starten; Altfeld-Reparatur vor ihrem Serverabschluss gelesen | Vorhandene exportierte Funktion uebersehen; waitForPendingWrites fuer spaeter beginnende Transaktion gehalten | Bestehende Attrappe verwenden, eingebettete Module separat parsen (§ 3.7), bestaetigten Reparatur-Serverstand abwarten (§ 5.3). Doppeldefinition sofort entfernt, Funktions- und SDK-Proben danach gruen |
| 01.10. (Paket A, eigener Doku-Vorabfehler) | Erste maschinelle Statusänderung traf keine der elf CRLF-Tabellenzeilen; vor Abschluss im Diff bemerkt | Regex-Zeilenende schloss CR aus | Statuszeilen strukturiert ändern, genau elf Treffer verlangen und Ergebnis/Diff lesen (§ 3.10); Tabelle danach korrekt in Arbeit |
| 01.10. (Paket A, eigene Abnahme-Luecke) | Gesamtlauf: t_text_felder erwartet Textimport im normalen Konto u1 und wird nach A8 rot | Bestehenden Feld-Erhalt-Test nicht auf die neue Betreiber-/Einwilligungs-Sperre abgestimmt; erster Fixture-Nachlauf uebersah, dass Store-Leeren die Einwilligung entfernt, und wartete im Dialog | Berechtigtes Betreiber-Fixture, echte erneute Zustimmung nach Store-Leeren, alle bisherigen Mengen/Felder/Verweise erhalten; normale/abgelehnte/geteilte Importe bleiben separat gesperrt (§ 5.3) |
| 01.10. (Paket A, eigener K10-Doku-Vorabfehler) | Zwei nicht vorhandene Regel-Funktionsnamen als Erfolgskontrolle genannt; rg vor Abschluss ohne Treffer | Namen vor dem konkreten Regel-Diff geraten | Erfolg am tatsaechlichen feedback/votes-Regelblock mit get/getAfter und +1/-1 nachweisen (§ 3.2); vor Commit korrigiert |

| 03.10. (Paket D, eigener Diagnose-Ablaufmangel) | Zweite Grafikprobe gestartet, obwohl erster Prozess noch nicht als beendet bestätigt war; Laufzeiten überlappen | Rückgabe mit session_id als Abschluss behandelt | Vor nächster GPU-Probe vollständigen Prozessabschluss abwarten; überlappende Läufe nicht als unabhängige kalte Messung verwenden. Rohdaten behalten und Begrenzung dokumentieren (§ 5.3) |

| 03.10. (Paket D, kritische Prüfung und eigene Lesefehler) | Coverage-Debugdaten zu stark als vollständige Zeichenliste bezeichnet; rg mit PowerShell-Parameter abgelehnt; große Picture-JSON unnötig als Base64 ausgegeben | Debug-Inventar und echte Quads verwechselt, native Parameter und Ein-String-Ausgabe nicht getrennt | Echten Renderpass prüfen, Korrektur sichtbar dokumentieren; JSON strukturiert und mit begrenzten Feldern lesen (§ 5.3). Originale erhalten, keine Produktänderung aus diesen Fehlern |

| 03.10. (Paket D, eigene Schattenisolierung und Pfadzuordnung) | Befehl 26 zu eng als Inset-Innenkante bezeichnet; --kante:none für bloßes Entfernen einer Innenkante gehalten; TEMP zunächst relativ im Repo gesucht | CSS-Farbe/Geometrie nicht bis zur Einzeloperation geprüft, Variablenersetzung machte ganze Kommaliste ungültig, tatsächlichen TEMP-Stamm nicht aufgelöst | Berechneten Stil und vollständige Befehlsdifferenz prüfen: 26 ist Rahmen, Block 19–25 ist Inset; gültige verbleibende Schattenliste verwenden. Frühere Interpretation sichtbar korrigieren, rote alternative Pixel nicht angleichen; tatsächliches $env:TEMP verwenden (§ 5.3) |

| 03.10. (Paket D, eigener Offline-Leser) | rg-Optionen hinter --, Wildcardpfad nicht aufgelöst; Reader zuerst falsches Effektbit, Pflichtpfad und identische Dateioffsets erwartet | Einzelne Formatannahmen vor vollständiger Quellenprüfung eingesetzt | Optionen vor -- und konkrete Suchwurzeln; gepinnte Formatdefinition lesen, Assertions für echte Fälle; nur Dateioffsets aus semantischem Vergleich trennen. Fehler vor Ergebnisausgabe korrigiert, frühere Fassungen erhalten, keine Pixelprüfung gelockert (§ 5.3) |

| 03.10. (D15-Capture-Vorbereitung, eigener Kopierfehler) | CRLF-Shaderdatei mit LF-Tracehash verglichen, Assertion stoppt | Dateiform und exakte Eventbytes verwechselt | Beide unverändert erhalten, Tracequelle separat extrahieren und Hashidentitäten trennen; 37 CRLF belegt (§5.3). Ein fehlender bestand.json-Pfad lieferte keinen Befund; vorhandenes auswertung.json gelesen |

| 04.10. (D15-Abschluss, eigener Ausgabefehler) | Diffdruck bricht an Pfeilzeichen mit UnicodeEncodeError ab | Python-stdout war cp1252 | PYTHONIOENCODING=utf-8 setzen, vollständigen Diff erneut lesen; keine Dateibeschädigung oder erfolgreiche Prüfung aus dem Abbruch behaupten (§5.3) |

| 04.10. (D15, kritische Prüfung des Capture-Messwegs) | Vier Arbeitsschritte und eine Build-Vorbereitung galten einem Shader, dessen Vermeidung die Abnahme nicht erreichen kann | Kausale Zuordnung (Block 19–25) mit Abnahmerelevanz verwechselt; Anteil 21–22 Prozent und die 72-ms-Lücke der Variante nie gegen die Grenze 0,2 gerechnet | Anteil am Gesamtfehler zuerst rechnen, Gegenprobe als Stoppkriterium lesen (§5.3). Capture-Build nicht begonnen; Vorbereitung erhalten. Eigener Lesefehler: `Get-ChildItem -Include` lieferte auch für die bekannte chrome.dll nichts; keine Aussage daraus |

| 04.10. (D15, eigener Zuordnungsfehler) | Fremde Änderung von 00:27 als „während dieser Sitzung“ und „wohl Codex“ gemeldet; Betreiber fragte Codex deshalb unnötig | Eigenen Sitzungsbeginn (00:30:53) nicht nachgesehen, laufende Codex-Prozesse für einen Beleg gehalten | Vor „wer war das“: eigene erste Zeitmarke, Änderungszeiten und gelöschte/andere Sitzungen prüfen; Verdacht als Verdacht kennzeichnen (§1.3). Sichtbar korrigiert in D15-CAPTURE-KRITIK § 7 |

| 04.10. (Paket E, eigene Prüfaufbau- und Patchfehler) | E4 nannte eine nicht vorhandene Einstieg-Handlung; E8-Fixture löste vorrangige Serienwarnung aus; E14 innerText las CSS-Großbuchstaben; Patch-Hunks zweimal in falscher Quellreihenfolge; E22 zählte auch fertige fill-Animationen | Vorhandene Handlungen/Zustände und DOM-Eigenschaften zu früh angenommen | Reale Handlungen und Vorrang prüfen; textContent für Text unabhängig von CSS; Hunks nach Quellzeile ordnen. E22-Nachweis: fortschritt-waechst/enter-rise waren finished, 0,01 ms. Rückkehr selbst bei reduce ausdrücklich animation:none; nur fertige 0,01-ms-Reste zulassen, keine laufende Bewegung. Keine bestehenden Testgrenzen gelockert. E27 erster CSS-Selektor verlor gegen button.tiny-link; berechnete Höhe geprüft und gleich spezifisch korrigiert (§5.3) |

| 04.10. (E21, eigene Regression) | t_sprung Desktop neu −5 px; Einzeltestfolge sofort angehalten | Tastenmarken in der flex-column-Bewertungszeile erhöhten deren Höhe von 60 auf 75,75 px | Ursache durch live CSS-Ausblendung belegt: Zeile wieder 60 px, Kartenoberkante 174,75→180. Marken absolut im vorhandenen Knopf anordnen, gleiche Inhalte/Höhe behalten; t_sprung vollständig frisch prüfen. Ersten roten Lauf erhalten, keine Grenze gelockert (§5.3) |

| 04.10. (E21, eigene Belegpflege) | Frischer Sprungtest schrieb denselben Logpfad wie der erste rote Lauf | Original vor Folgelauf nicht kopiert | Vollständig bereits gelesene vier Ergebniszeilen als ausdrücklich gekennzeichnete Abschrift erhalten; nicht Original nennen. Diagnosequelle erhalten; künftig Läufe getrennt benennen (§5.3) |

| 04.10. (Paket E, weitere eigene Aufbau-/Lesefehler) | E31-Locator traf Blatt und Seite; E32-Probe stand zunächst vor der Schriftwahl; PLAN zunächst im falschen Verzeichnis gesucht; rg-Wildcard unter Windows nicht aufgelöst | Sichtbarkeit, tatsächlichen Einstiegsschritt und Pfad vor der Abfrage nicht abgesichert | Sichtbaren Bereichsknopf verwenden, Einstieg bis zur echten Schriftwahl durchgehen; vorhandene Pfade/Suchwurzel lesen. Danach gezielte Proben grün; keine Produktänderung aus diesen Aufbaufehlern (§5.3) |

| 04.10. (E5, eigene Regression im Gesamtlauf) | t_gross_alle meldet auf iPad quer/Desktop eine zu lange Textzeile auf Konto löschen, D-Ausgang hatte null | Downloads-Prüfsatz verlängerte einen unbeschränkten Absatz; lokale Abnahme maß nur Download und Wortlaut | Auch beschreibende Ausgaben gegen den Ausgang lesen. Gesamtlauf angehalten, ursprüngliche Logs/Diff erhalten, nur diesen Hinweis auf 48 Schriftbreiten begrenzt; E5-Abnahme um fünf Bildschirmbreiten erweitert. Anschließend frische Gesamtabnahme, keine Prüfgrenze gelockert (§5.3) |

| 04.10. (Paket E, eigene Attrappen-Anbindungslücke) | t_konto_fortsetzungen scheitert vor seinen Browserfällen an SDK-Haltepunkten | konto_adressdialog_app suchte deleteUser() ohne Parameter; E11-Attrappe verwendet deleteUser(u) | Testfunktion am Exportnamen umbenennen und Nutzer an Original weitergeben, statt dessen Signatur festzuschreiben. Alle bisherigen aktuellen/alten Dialog-, Kontowechsel- und Fortsetzungsfälle unverändert prüfen; angehaltenen Gesamtlauf erhalten und frisch prüfen (§5.3) |

| 05.10. (E7-Gesamtlauf über Mitternacht, Prüfaufbau E8) | t_paket_e rot: „E8 gestriger Hinweis verdrängt andere“, am Vorabend grün | Fixture setzte „gestern“ nach dem Kalender; vor 04:00 ist das der Lerntag heute der App, der Meilenstein also noch nicht abgelaufen | Bestehende Regel § 5.4 (G-096): Testdaten folgen dem Lerntag (lib.tag). Fixture auf tag(-1), keine Erwartung geändert, nur dieser Test am gleichen Produktstand nachgelaufen. Nachlauf t_paket_e Exit 0 (914 s), Gesamtlauf 139/139 Exit 0; alle Logs gelesen und gegen den abgenommenen E-Stand verglichen. Kein Produktfehler, nicht E7 |

| 05.10. (E7-Abschluss, eigene Prüfdiagnose) | Ad-hoc-Hashprüfung meldete fälschlich eine geänderte Konto-Testquelle; Logbuch/PLAN zunächst am falschen Stamm gesucht | Hash nur über Testdatei statt über die zusätzlichen Wrapper-Hilfsquellen gebildet; Pfade angenommen | Bestehende §3.2/§3.11: tatsächlichen Runner/Pfad lesen. Hashbildung aus alle_pruefen.js einschließlich Konto-Hilfsproben und css_struktur.mjs übernommen, alle 139 Testhashes und Produkt-/Attrappenhash unverändert; Pfade mit rg --files gefunden. Keine Quelle geändert, keine grüne Prüfung neu gestartet |

| 05.10. (Paket F, eigene Bau-/Prüfaufbaufehler) | Patch-Hunks/Anker zunächst falsch; Windows-rg-Glob mehrfach nicht aufgelöst; F7-Fixture schnitt dieselbe Kartenliste mehrfach; Wortersetzung Backup→Sicherung ließ falsche Artikel; F13 normalisierte relative URL-Literale und übersah extensionlose Module | Text-/Pfadähnlichkeit zu breit als Semantik behandelt | Vorhandene Anker und Suchwurzeln lesen; unveränderte Fixture-Basis benutzen; Wortlaut mit Artikeln/Pronomen lesen. Verzeichnisumzug nur echte Pfade umbasieren, Slash/Modulauflösung erhalten. Beim vollständigen Difflesen entdeckt, unbeabsichtigte sw/pruefe_stand/Tempotest-Änderungen vollständig zurückgenommen, verschobene Werkzeuge aus festem Original mit gezielten Pfadänderungen hergestellt; 42 Syntaxprüfungen und Verweisinventar neu grün. Frühere rote Logs erhalten; keine Testgrenze gelockert (§3.2/§3.3/§5.3). |

| 05.10. (F12, nicht bestandene Aufräum-Abnahme) | 48 Hauptfotos exakt gleich, vollständiger Fotovergleich aber zweimal rot: zuerst 30551 Pixel im Lernen-Foto, zweiter Lauf zwei Konfigurationen grün und dritter Fall rot | Ursache des Rasterunterschieds nicht belegt; unbenutzte Selektoren garantieren keine grünen Browserbilder | Nach CODEX-START §6 nur F12 zurückgenommen, Quellen/Bilder/Logs beider Versuche erhalten. Keine Pixeltoleranz, kein Weglassen des roten Tests, kein D12–D15-Diagnoseauftrag daraus. Paketabschluss bleibt gesperrt (§5.3/§11). |

| 05.10. (F-Zusatzprüfung, eigener Aufbaufehler) | t_paket_f_umfeld verlangte auf Daten die Knopfbeschriftung der Konto-Löschseite | Zwei Seiten haben bewusst unterschiedliche Handlungen: Alles sichern / Sicherung herunterladen | Tatsächliche Daten-Erklärung und Löschseiten-Knopf getrennt prüfen; keine Produktänderung und keine Testgrenze geändert. Roter Erstlauf separat erhalten (§5.3). |

| 05.10. (F12, zweiter Durchgang) | Zwei rote Fotovergleiche waren ein Messfehler: rotes Bild mit neuem CSS bytegleich zu einem Vorstand-Bild (117F870B/CD32F2E9 in `fotos/f12-voll-1`) | Vollseitenfoto mit GPU-Raster hat bei gleicher Quelle zwei Fassungen; Hashes der roten Bilder wurden nicht mit dem Vorstand verglichen | § 5.3: Hash im Vorstand suchen, Alt gegen Alt, Software-Raster, berechnete Stile. F12 wieder eingesetzt und mit `x_paket_f_sicht.js` abgenommen; die roten Läufe bleiben als Beleg erhalten, keine Toleranz |

| 05.10. (F12, eigene Aufbaufehler am neuen Messgerät) | Stilvergleich meldete jedes Element als anders; Fensterfotos schwankten Alt gegen Alt | Reihenfolge der `--x`-Eigenschaften je Seite verschieden; GPU-Raster | Einträge sortiert, `--disable-gpu`; Gegenprobe mit 1 px geänderter Regel rot. Kein Ergebnis aus den fehlerhaften Probeläufen übernommen (§ 5.3) |

| 05.10. (F13, Gegenprüfung) | Changelog und elf weitere Texte nannten `plan/archiv/bilder/icon.svg` als früher ausgelieferte Datei; Befund CODE-13 umgeschrieben; zwei überholte Dateien archiviert statt gelöscht | Umzugsskript ersetzte nackte Dateinamen; Entscheidung Z14 nicht wörtlich gelesen | § 3.7a. 38 Stellen zurückgestellt und gegen 5af78a0 geprüft, CODE.md wörtlich wiederhergestellt, beide Dateien gelöscht (Inhalt bleibt in 5af78a0) |

| 07.10. (3.18.23, D11 im Gesamtlauf) | `t_paket_d` D11 zehnmal rot, im frischen Browser nie; drei eigene Deutungen nacheinander falsch („Meldung zu früh entfernt“, „Spiel auf dem Laptop“, „Minuten-Sicherung“) und zwei davon dem Betreiber als wahrscheinlich gemeldet | Vermutung vor Messung genannt. Ursache bis heute offen | § 5.3 (Bilderzähl-Test rot). Vergleichslauf am Vorstand b45a13b ebenfalls rot, also nicht von 3.18.23. Grenze unverändert. Nach Neustart des Laptops grün (152/152) |
| 08.10. (3.18.26, Klein-Weg) | Fünf betroffene Tests grün gemeldet, sie liefen aber gegen den Server eines anderen Chats mit dessen Ordner (3.18.25); aufgefallen erst, als eine eigene Messung die neue CSS-Regel nicht fand | Port 8099 war belegt und antwortete mit 200; nicht geprüft, welchen Stand er liefert | § 5.3 (Server-Ordner vor dem Lauf prüfen). Eigener Server auf 8097 mit `PRUEF_PORT`, alle fünf wiederholt, grün |
| 08.10. (Online-Stand) | Dem Betreiber gemeldet „online ist 3.18.25, vermutlich falscher Ordner“; tatsächlich war 3.18.26 schon veröffentlicht | `app.js` vom Hosting abgerufen, das eine Stunde zwischengespeichert wird; Ursache geraten statt das Skript gelesen (es nimmt immer `origin/main`) | § 1.3. Online-Stand an `sw.js` prüfen (`no-cache`) und `Last-Modified` lesen; vor einer Vermutung das Skript lesen |
| 08.10. (Durchsicht Bewegung, nur gelesen) | Blätter und Dialoge springen beim Schließen in einem Bild aus dem Bildschirm, obwohl D1 (3.18.14) als behoben abgenommen war | Der D1-Test verlangte nur „irgendein Bild mit Verschiebung“; ein Sprung erfüllt das. Ursache im Produkt vermutet, nicht gemessen: `animation: none`, Übergang und Ziel im selben Schritt (wie D11) | § 5.3 (Zwischenlagen verlangen). Nicht behoben, Fund A-1 in `zyklus-2/mehrwert/schritt-2/BERICHT-AUSSEHEN-BEWEGUNG.md`; vor dem Bau am iPhone ansehen |
| 08.10. (Empfehlungen ohne Abgleich) | Tagesdeckel 60/30 und „Buchstaben-Satz stimmt nicht“ dem Betreiber vorgelegt, ohne das Repo dazu gelesen zu haben | Notiz der Vorsitzung bzw. eigener Bericht für den Stand gehalten | § 1.7. Beide zurückgenommen; Tagesdeckel wird erst gerechnet, dann empfohlen |
