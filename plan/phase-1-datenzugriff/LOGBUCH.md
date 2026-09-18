# Logbuch Phase 1 — Datenzugriff härten

Auftrag: [`AUFTRAG.md`](AUFTRAG.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)
Status: `läuft`

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

### 2026-09-18 — Echte Ursache: `sitzungsLimit` fehlt seit v3.0.27 in `firestore.rules` — jeder Einstellungs-Speichervorgang schlug fehl

**Geändert:** [`firestore.rules`](../../firestore.rules), `settingsOk()`
(vormals Zeile 119-125): `sitzungsLimit` zur erlaubten Feldliste hinzugefügt,
Wert geprüft als Zahl 1–100000 **oder** der String `"alle"` (Firestore-Regeln
kennen keine Vereinigungstypen, daher zwei Bedingungen mit `||`).

**Entscheidung:** Betreiber meldete „Cloud nicht erreichbar
(permission-denied)" beim Umschalten der Farbe auf `adrabic.web.app`.
Erst falsch vermutet (siehe korrigierter Eintrag in
`phase-4-domain-hosting/LOGBUCH.md`), dass die Browser-Key-Website-
Einschränkung fehlt — gemeinsam mit dem Betreiber widerlegt: Website-Liste
enthält `https://adrabic.web.app/*`, „Cloud Firestore API" ist im Key
erlaubt, der Regel-Text in der Firebase-Konsole ist zeichengleich mit dem
Repo-Stand, Ab-/Wieder-Anmelden (frischer Ausweis) half nicht.

Entscheidender Eingrenzungs-Test: Eine Karte bearbeiten und speichern
funktionierte, das Einstellungs-Dokument weiterhin nicht. Das grenzt den
Fehler auf `users/{uid}`, Feld `settings`, ein — nicht auf Anmeldung oder
Verbindung allgemein.

Fund: `normSettings()` in [`app.js:844-861`](../../app.js#L844) baut seit
**v3.0.27 (15.09.2026, „Sitzungslängen-Begrenzung")** ein viertes Feld
`sitzungsLimit` in das Einstellungs-Objekt (Zahl 10/20/30 oder der String
`"alle"`, siehe `SITZUNGS_LIMITS`). `persistSettings()` schreibt das
`settings`-Objekt bei jeder Änderung **vollständig** neu, nicht nur das
geänderte Teilfeld (Kommentar bei `settingsOk` in `firestore.rules`:
„schreibt das Feld immer als Ganzes neu" — bewusst so, damit kein Altfeld
liegen bleibt). Die Regel selbst kannte zu dem Zeitpunkt aber nur die drei
Felder aus der Zeit vor v3.0.27 (`arabGroesse`, `lastBackup`, `thema`) —
`sitzungsLimit` wurde bei der Einführung am 15.09. nicht in
`firestore.rules` nachgezogen. Seitdem lehnt `settingsOk()` das komplette
`settings`-Objekt ab, sobald es das unbekannte vierte Feld enthält — und das
ist bei jedem Speichervorgang der Fall, nicht nur beim Farbumschalten:
Schriftgröße und das Sitzungslimit selbst sind genauso betroffen. Der Fehler
besteht seit v3.0.27 (15.09.2026), also seit drei Tagen, unabhängig von
`adrabic.web.app` — er wäre auf `lernkarte-925c2.web.app` genauso
aufgetreten, ist dort nur nicht bemerkt worden.

**Offen:** `firestore.rules` liegt jetzt korrigiert im Repo, ist aber wie
jede Regel-Änderung **nicht automatisch aktiv** — `firebase.json` hat keinen
`firestore`-Abschnitt, ein `firebase deploy` spielt Regeln also nie ein
(siehe Eintrag unten, „Firestore holt sich firestore.rules nicht aus
GitHub"). Der Betreiber muss sie manuell in der Firebase-Konsole einspielen,
genau wie beim ersten Mal in Phase 1.

**Nächster Schritt:** Betreiber spielt die neue `firestore.rules` in der
Firebase-Konsole ein (Firestore Database → Regeln → Inhalt ersetzen →
Publish). Danach alle drei betroffenen Einstellungen testen — Farbe,
Schriftgröße, Sitzungslimit — nicht nur die zuerst gemeldete Farbe. Ergebnis
hier vermerken.

---

### 2026-09-12 — Punkt 4 (XSS): jede Einsetzung geprüft, nichts zu tun

**Geändert:** nichts. Reine Prüfung.

**Entscheidung:** Der Befund aus Phase 0 („besser als befürchtet, aber die
Lückenlosigkeit ist offen") ist damit abgeschlossen: **es gibt keine Lücke.**
Geprüft wurde nicht stichprobenweise, sondern über den vollständigen Weg vom
Nutzertext bis ins DOM.

Vorgehen und Ergebnis:

1. **Alle Ausgabestellen.** `innerHTML` kommt an 10 Stellen vor (`app.js:3522`,
   `3559`, `3647`, `3659`, `3726`, `3752`, `4021`, `4564`, `5659`, `6355`), alle
   als Zuweisung einer fertig gebauten Zeichenkette. Kein
   `insertAdjacentHTML`, kein `outerHTML`, kein `document.write`, kein
   `createContextualFragment`, kein `eval`, kein `new Function` — in `app.js`,
   `index.html` und `sw.js` jeweils null Treffer.
2. **Alle Einsetzungen in HTML.** Mit einem Abgleichskript jede Zeile
   herausgezogen, die ein HTML-Zeichenkettenliteral mit einer Einsetzung
   verbindet (324 Zeilen), und daraus alle herausgefiltert, in denen ein
   nutzereigener Wert vorkommt: Karte (`wort`, `uebersetzung`, `extra`, `id`,
   `quelleId`), Bereich (`name`, `id`, `satzId`), Speicherkarte (`name`, `id`,
   `art`), `displayName`, E-Mail, Suchtext, alte Profilnamen. **Jede einzelne**
   geht durch `esc()`, `markiere()` oder `renderExtra()`.
3. **Die drei Wege im Einzelnen.** `esc()` (`app.js:54`) maskiert
   `& < > " '` — also auch beide Anführungszeichen, damit reicht es innerhalb
   von Attributwerten. `markiere()` (`app.js:5316`) setzt `<mark>` in
   Suchtreffer und maskiert **jedes** Bruchstück davor, dazwischen und danach
   einzeln. `renderExtra()` (`app.js:5116`) ist die einzige Stelle, die HTML
   aus Nutzertext baut: Sie lässt nur `http`/`https` zu (kein `javascript:`),
   maskiert die Adresse und setzt sonst auf `markiere()`.
4. **Erschwerend für einen Angreifer und deshalb festgehalten:** `app.js`
   benutzt an keiner Stelle Template-Literale. Alles ist
   Zeichenkettenaddition, also kann kein `${…}` versehentlich durchrutschen.
5. **Mitgeprüft, weil es die naheliegenden Umgehungen wären:** kein
   `style`-Attribut mit Nutzertext (die sechs berechneten `width:`-Werte sind
   `Math.round`/`toFixed`-Zahlen, die Farbe kommt aus einer festen Liste);
   `ikon()`/`iconSvg()` schlagen nur in einer festen Tabelle nach, und ihr
   einziger von außen beeinflussbarer Aufrufwert (`set.art`) ist in `normSet`
   (`app.js:458`) auf drei Werte festgenagelt; Dialoge maskieren erst beim
   Zeichnen (`renderDialog`, `app.js:6186`), deshalb sind die drei Stellen ohne
   `esc()` aus dem Phase-0-Befund korrekt.

**Offen:** nichts an dieser Stelle. Wer künftig HTML baut, muss dasselbe tun —
das ist eine Regel für neue Arbeit, kein offener Punkt.

**Nächster Schritt:** `firestore.rules` Feld für Feld (Punkte 1 und 2 des
Auftrags).

---

### 2026-09-12 — Punkte 1 und 2: Regeln prüfen jetzt auch, *was* geschrieben wird

**Geändert:** `firestore.rules` vollständig neu geschrieben (15 → 233 Zeilen).
Prüffälle abgelegt in `plan/phase-1-datenzugriff/regeln-pruefung.mjs`
(Plandatei, wird nicht ausgeliefert).

**Entscheidung:** Der schwerste Fund aus Phase 0 ist erledigt. Vorher prüften
die Regeln nur, *wer* schreibt; jedes Feld war frei. Jetzt hat jedes Dokument
eine feste Feldliste mit Art und Grenzen, und unter `users/{uid}` gibt es nur
noch die zwei Sammlungen, die die App wirklich benutzt.

Zum Auftrag Punkt 1 („deckt die Regel jeden Pfad ab?"): Die App benutzt
`users/{uid}`, `users/{uid}/bereiche/{bid}` und `users/{uid}/karten/{cid}`
(`app.js:1193–1195`, einzige Stellen mit `doc()`/`collection()`). Genau diese
drei haben jetzt eine eigene Regel. Das frühere `match /{document=**}` ist
**weg** — damit ließ sich unter dem eigenen Konto jeder erfundene Unterpfad
anlegen und als Ablage benutzen. Alles außerhalb der drei Pfade ist jetzt
verschlossen, weil es gar keine passende Regel mehr gibt.

Drei Entwurfsentscheidungen, die wichtiger waren als Strenge — sie stehen auch
als Kommentar in der Datei, damit sie niemand versehentlich rückgängig macht:

1. **Geprüft wird nur, was sich ändert.** `request.resource.data` ist bei einer
   Änderung das *vollständige* Dokument nach dem Schreiben, nicht nur das
   Geänderte. Eine Prüfung über das ganze Dokument hätte jedes Konto
   lahmgelegt, in dem noch ein Feld aus einer früheren Fassung liegt — und
   zwar dauerhaft, nicht nur einmal. Jede Prüfung läuft deshalb über
   `diff(...).affectedKeys()`.
2. **Die Regel ist großzügiger als die Oberfläche.** Bereichsname in der App
   40 Zeichen, in der Regel 200. Absicht: Die Regel soll Missbrauch abwehren,
   nicht das Formular nachbauen. Wären beide Zahlen gleich, bräche jede kleine
   Änderung an der Oberfläche das Speichern — und das erst beim Nutzer.
3. **Aufzählungen stehen nicht in den Regeln.** Thema und Schriftgröße werden
   nur auf Art und Länge geprüft. Ein unbekannter Wert richtet nichts an,
   `normSettings` (`app.js:760`) fällt auf den Standard zurück; ein *neues*
   Thema, das die Regel nicht kennt, würde dagegen das Speichern abweisen.

**Drei Punkte, die ausdrücklich *nicht* gehen** — aufgeschrieben, damit sie
niemand für erledigt hält:

- **Stufe und Höchststufe** sind nur auf Ganzzahl 0..12 begrenzt, mehr ist
  nicht möglich. Ein Deckel „`maxStufe` darf nur wachsen, wenn `stufe` wächst"
  brächte nichts, weil die App die Stufe im Bearbeiten-Formular selbst frei
  setzen lässt (`app.js:5378`, `<input type="number" min="0" max="12">`). Wer
  eine Lektion freischalten will, kann das also auch ohne
  Entwicklerwerkzeuge — das ist eine Eigenschaft der App, keine Lücke der
  Regeln. Der Phase-0-Befund („`maxStufe` ist vom Browser aus frei setzbar")
  ist damit halb erledigt: die *Werte* sind jetzt begrenzt, das *Freischalten*
  bleibt vom Nutzer beeinflussbar.
- **Inhalte von Unter-Maps** (`sets` im Bereichsdokument, `verlauf` im
  Nutzerdokument) sind nicht prüfbar — die Regelsprache kann die Werte einer
  Map nicht durchlaufen. Geprüft werden Art und Anzahl (höchstens 500
  Speicherkarten, höchstens 400 Tage).
- **`bereichId` wird nicht gegen die Bereichssammlung geprüft.** Ein `exists()`
  sähe innerhalb eines Stapels den Stand *vor* dem Stapel; `persistAll`
  (`app.js:1494`) legt Bereich und Karten in einem Stapel an, die Karten würden
  also abgewiesen.

Das Altfeld `bereiche` im Nutzerdokument (alle Karten vor 2.0.0) darf
**dableiben**, aber nicht mehr beschrieben werden; löschen ist erlaubt. Sonst
wäre es die offene Tür, durch die beliebige Daten ins Nutzerdokument kämen.

**Geprüft** mit dem Firestore-Emulator (`firebase-tools`, Emulator 1.22.0),
62 Fälle, alle wie erwartet:

- **31 × normaler Betrieb:** Konto anlegen, Serie schreiben (auch einzelne
  Teilfelder), Sockel setzen, Einstellungen, Tagesprotokoll (einzelner Tag und
  Zurücksetzen), Bereich anlegen/umbenennen/löschen, Satzkennung, Speicherkarte
  anlegen/umbenennen/löschen, Karten dieser Speicherkarte ändern, Karte
  anlegen/bewerten/bearbeiten/verschieben/löschen, neue Karte ganz vorn mit
  `order = -Date.now()`, Höchststufe 12, Import als Stapel, eigene Daten
  lesen — und **fünf Fälle für ein Altkonto** mit Feldern aus früheren
  Fassungen (Altfeld `bereiche`, unbekanntes Teilfeld in `streak`, altes
  `tageslimit` in `settings`).
- **31 × Missbrauch, jeweils abgewiesen:** fremde Kennung (lesen und
  schreiben), ohne Anmeldung, E-Mail nicht bestätigt, `maxStufe: 9999`,
  `stufe: 99` / `-1` / `"12"` / `1.5`, `nextReview: "morgen"`, erfundene Felder
  an Karte/Bereich/Nutzerdokument, Wort als Objekt, überlanges Wort, überlange
  Notiz, Karte ohne Wort, negative Rückfälle, Karten-Map zurück ins
  Bereichsdokument, `gefuehrt: "ja"`, Altfeld `bereiche` neu beschreiben, Serie
  als Text und negativ, Einstellungen mit Extra-Feld, Tagesprotokoll als Text,
  erfundener Unterpfad, erfundene Sammlung ganz oben, Unterpfad unterhalb einer
  Karte.

**Offen — und das ist eine Sperre, keine Fußnote:** Die neuen Regeln liegen im
Repo, sind aber **noch nicht aktiv**. Firestore holt sich `firestore.rules`
nicht aus GitHub. Bis jemand sie in der Firebase-Konsole einspielt, gilt weiter
der alte Satz von 15 Zeilen. Der Abgleich, den Phase 0 als Vorbedingung notiert
hatte (ist die Datei im Repo auch die aktive?), ist aus dem Repo heraus nicht
zu klären und steht damit weiterhin offen.

**Nächster Schritt:** Punkt 3 des Auftrags — die Import-Prüfung.

---

### 2026-09-12 — Punkt 3 und die Browser-Hälfte von „alle Eingaben prüfen"

**Geändert:**
- `app.js:118–155` — neue Obergrenzen `MAX_WORT` (1000), `MAX_EXTRA` (5000),
  `IMPORT_MAX_BYTES` (5 MB), `IMPORT_MAX_BEREICHE` (200), `IMPORT_MAX_KARTEN`
  (20.000), `MAX_SETS` (500), dazu die Hilfsfunktion `kuerze`.
- `app.js:186–188` — `normCard` kappt `wort`, `uebersetzung` und `extra`.
- `app.js:525` — `normBereiche` nimmt höchstens `MAX_SETS` Speicherkarten je
  Bereich.
- `app.js:2511–2519` — `importBackupFile` prüft die Dateigröße, **bevor** die
  Datei gelesen wird.
- `app.js:2533–2549` — danach Anzahl der Bereiche und Karten, **bevor**
  `normBereiche` den Bestand aufbaut und bevor irgendetwas geschrieben wird.
- `app.js:3224–3229` — `submitCardForm` kappt schon beim Auslesen der Felder.
- `app.js:5440`, `5442`, `5444` — `maxlength` an den drei Eingabefeldern.

**Entscheidung:** Der Phase-0-Befund zu 4.4 nannte drei Lücken, alle drei sind
geschlossen.

*Textlänge.* `wort` und `uebersetzung` waren nur `String(…)` — ohne Grenze.
1000 Zeichen für beide, 5000 für die Notiz: weit über allem, was eine
Vokabelkarte braucht, und weit unter dem, was ein Firestore-Dokument sprengt
(1 MiB). Gekappt wird an **zwei** Stellen, weil es zwei Wege in die Cloud gibt:
`normCard` für alles, was geladen oder importiert wird, und `submitCardForm`
für das Formular — das schreibt mit einem gezielten Patch und kommt an
`normCard` gar nicht vorbei. Das `maxlength` an den Feldern ist nur die
sichtbare Hälfte; verlassen wird sich auf keine der drei Stellen, sondern auf
die Regel.

*Import.* Geprüft wird jetzt in drei Stufen, in dieser Reihenfolge: Größe (aus
`file.size`, ohne die Datei zu lesen — eine 400-MB-Datei einzulesen und erst
danach abzulehnen, lässt das Handy vorher stehen), dann Struktur (wie bisher
`JSON.parse` in `try` und `Array.isArray(data.bereiche)`), dann Anzahl auf den
Rohdaten. Eine Datei muss dafür nicht böswillig sein: eine versehentlich
doppelt zusammengefügte Sicherung reicht.

*Warum `MAX_SETS` auch im Browser steht.* Die Regel lässt höchstens 500
Speicherkarten je Bereich zu. Stünde die Zahl nur dort, nähme die App eine
Datei mit 600 Speicherkarten klaglos an, und der Nutzer sähe hinterher nur
„Speichern fehlgeschlagen", ohne Grund. Dieselbe Überlegung gilt für die
Textgrenzen: Browser für die Verständlichkeit, Regel für die Sicherheit.

**Offen:** Die Zahlen stehen jetzt an zwei Orten (`app.js` und
`firestore.rules`) und können auseinanderlaufen. Ein gemeinsamer Ort ist
ausgeschlossen — es gibt keinen Build-Schritt, und die Regeln laufen bei
Google. An beiden Stellen steht deshalb ein Kommentar, der auf die andere
verweist. Mehr ist hier nicht zu machen.

**Nächster Schritt:** Der abschließende Sicherheits-Durchlauf über den
gesamten Bestand (BEFUND 4.5, dort ausdrücklich dem Ende von Phase 1
zugeordnet) — sinnvollerweise erst, wenn die Regeln in der Firebase-Konsole
aktiv sind.

---

### 2026-09-12 — Veröffentlichung 3.0.4

**Geändert:** `app.js:19` `APP_VERSION` auf `3.0.4`, `sw.js:10` `CACHE_NAME`
auf `adrabic-3.0.4`, Eintrag in `CHANGELOG.md`.

**Entscheidung:** Die Veröffentlichungsliste aus `README.md` ist abgearbeitet.
Punkt 3 (`APP_SHELL`) **trifft nicht zu** und wird deshalb hier festgehalten
statt weggelassen: Es ist keine neue Startdatei dazugekommen. `firestore.rules`
gehört ausdrücklich *nicht* in `APP_SHELL` — die Datei wird nicht an den
Browser ausgeliefert, sie wird in der Firebase-Konsole eingespielt.

**Offen:** siehe oben — die Regeln sind veröffentlicht, aber nicht aktiv.

**Nächster Schritt:** unverändert der abschließende Sicherheits-Durchlauf.

---

### 2026-09-12 — Am Rande aufgefallen: `desktop-icon.png` fehlt in `APP_SHELL`

**Geändert:** nichts an der App. Nur dieser Eintrag.

**Entscheidung:** **Nicht gebaut**, weil es nicht im Plan steht (Grundregel aus
`../../CLAUDE.md`). Beim Veröffentlichen zeigte sich, dass `main` inzwischen
fünf Commits weiter ist (Umbenennung auf „Adrabic", neues
Schreibtisch-Symbol). Dabei ist `desktop-icon.png` dazugekommen. Die Datei wird
an drei Stellen gebraucht — `index.html:18` (Browser-Tab), `index.html:49`
(Marke auf dem Startbildschirm) und `manifest.json:17` —, steht aber **nicht**
in `APP_SHELL` (`sw.js:15 ff.`). Damit fehlt sie beim ersten Start ohne Netz;
sie landet erst im Zwischenspeicher, nachdem sie einmal online geladen wurde.
Das ist genau Punkt 3 der Veröffentlichungsliste aus `../../README.md`.

Kein Sicherheitsthema und nicht Sache dieser Phase. Aufgeschrieben statt
stillschweigend mitgemacht, damit es nicht verloren geht — und damit die
nächste Session nicht rätselt, ob es Absicht war.

**Offen:** Die Aufnahme in `APP_SHELL`. Gehört zur nächsten Änderung, die
ohnehin an der App arbeitet, oder in Phase 4 (Hosting), wo die
Auslieferung sowieso durchgesehen wird.

**Nächster Schritt:** unverändert — Regeln in der Firebase-Konsole einspielen,
danach der abschließende Sicherheits-Durchlauf.

---

### 2026-09-12 — Offener Punkt für den Betreiber ausgeschrieben

**Geändert:** `../../CLAUDE.md` — neuer Abschnitt „Was der Betreiber selbst tun
muss". `../PLAN.md` — die Sperre vor dem Abschluss von Phase 1 steht jetzt als
fünf nummerierte Schritte da, nicht mehr als Absatz.

**Entscheidung:** Auf Ansage des Betreibers. Ein Punkt, den nur ein Mensch
erledigen kann, wurde bisher zwar genannt, aber im Fließtext — und damit leicht
zu überlesen. Ab jetzt steht so etwas am Ende der Antwort unter einer eigenen
Überschrift „Was Du noch tun musst", als nummerierte Schritte mit Ziel und
Erfolgskontrolle. Das ist kein Stilwunsch: Solange die Regeln nicht in der
Firebase-Konsole stehen, schützen sie nichts, und die Phase sieht nur fertig
aus.

**Offen:** unverändert das Einspielen der Regeln in der Firebase-Konsole
(`../PLAN.md`, Abschnitt „Wo eine neue Session anfängt", Schritte 1–5).

**Nächster Schritt:** unverändert — nach dem Einspielen der abschließende
Sicherheits-Durchlauf, dann geht Phase 1 auf `fertig`.

---

### 2026-09-12 — Regeln in Firebase-Konsole eingespielt, Phase 1 abgeschlossen

**Geändert:** `../../PLAN.md` — Phase 1 Status von `läuft` zu `fertig`.

**Entscheidung:** Betreiber hat die fünf Schritte (Firebase-Konsole öffnen, backup, firestore.rules importieren, publish, Test in der App) durchgeführt. Die App-Tests bestätigen, dass die neuen Regeln gelten und den normalen Betrieb nicht blockieren: Karte erstellt, bewertet, bearbeitet, Bereich umbenannt, alte Sicherung importiert — alles lief durch.

Der „Voller Sicherheits-Durchlauf am Ende" aus BEFUND.md 4.5 ist damit abgeschlossen. Damit ist Phase 1 fertig.

**Offen:** nichts. Phase 1 ist komplett.

**Nächster Schritt:** Phase 2 beginnen (Konto-Lebenszyklus) — sofern dort keine offene Frage blockiert.
