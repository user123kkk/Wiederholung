# Gesamtplan: von der Bastel-App zur echten Website

Grundlage: [`../KONZEPT.md`](../KONZEPT.md)
Angelegt: 12. September 2026
Zuletzt geändert: 18. September 2026 (Google-Login bestätigt, Umzug auf adrabic.web.app)

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
| **6** | Öffentliche Startseite: Problem → Lösung → Handlungsaufruf, getrennt von der App | `zurückgestellt` (23.09.: `landing.html` auf Betreiber-Wunsch gelöscht, wird neu gemacht) | [`phase-6-startseite/`](phase-6-startseite/) |
| **7** | SEO: Search Console, `robots.txt`, Sitemap, FAQ | `fertig` | [`phase-7-seo/`](phase-7-seo/) |
| **8** | Rückmeldung: Kontakt- und Fehlerformular | `fertig` | [`phase-8-rueckmeldung/`](phase-8-rueckmeldung/) |
| **9** | Barrierefreiheit als eigener Durchgang | `fertig` | [`phase-9-barrierefreiheit/`](phase-9-barrierefreiheit/) |

Die Folge entspricht dem Vorschlag aus Konzept-Abschnitt 5. Es gibt keinen
Grund, davon abzuweichen — die Begründung dort trägt, und sie ist unten je
Phase noch einmal ausgeschrieben.

### Nebenstrang: Landing-Page-Strategie

Kein Phasen-Ordner, keine Nummer — deshalb steht er nicht in der Tabelle
oben. Der Ordner [`landing-page-strategie/`](landing-page-strategie/) klärt,
was die Startseite **sagt**. Reihenfolge dort: Befund → Strategie → erst
dann HTML.

**23.09.2026 — `landing.html` auf Betreiber-Wunsch gelöscht, wird komplett
neu gemacht.** Betreiber: „die will ich neu machen daher kannst du die
vorhandene löschen?" — ausdrücklich ohne Begründung verlangt, keine
Rückfrage gewollt. Datei entfernt, alle Referenzen darauf bereinigt
(`firebase.json`-Rewrites entfernt — „/" liefert jetzt per Firebase-Hosting-
Standard direkt `index.html` aus, `sw.js` APP_SHELL bereinigt,
`datenschutzerklaerung.html` Abschnitt 11 auf das verbleibende
Fehlerformular reduziert, das Kontaktformular gab es nur auf der jetzt
gelöschten Seite). Details: `phase-6-startseite/LOGBUCH.md`,
`phase-8-rueckmeldung/LOGBUCH.md`. **`STRATEGIE.md` bleibt unverändert
stehen** — Kern-Message, Belege, Funnel, drei Headline-Fassungen sind
weiterhin gültige Vorarbeit, falls beim Neubau darauf zurückgegriffen werden
soll; ob das so ist, entscheidet der Betreiber, wenn er tatsächlich mit der
neuen Seite anfängt. Status daher `zurückgestellt`, nicht `läuft` — es gibt
aktuell keine Datei, die weitergebaut wird.

**Betreiber-Ankündigung (23.09.2026):** Nächster großer Schritt ist wohl
eher `onboarding/` als die Landing-Page-Strategie („glaub onboarding") —
Betreiber sieht sich dafür zunächst selbst eine Anleitung an, bevor es
weitergeht. Keine Session-Aktion nötig, bis er sich meldet.

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
entschieden sind. **22.09.2026:** viertes Video (Bottom Navigation, uxpeak)
gegen den Stand geprüft — elf von zwölf Punkten schon umgesetzt (kam aus
demselben Thema wie Video 1). Zwei Fundstellen in
[`PRINZIPIEN.md`](redesign-oberflaeche/PRINZIPIEN.md) vermerkt: Gleit-
Indikator beim Tab-Wechsel vom Betreiber freigegeben und als **Block 11**
gebaut (v3.7.3); zentraler CTA-Knopf in der Leiste bewusst nicht übernommen
(erfundenes Bauteil ohne Bedarf). Betreiber-Test am Handy steht noch aus.
**Umfang lockert `KONZEPT.md` §7 bewusst** — siehe offene Frage 6 unten.
**Noch am 22.09.2026:** Betreiber-Auftrag „verbessere Design, Animationen,
UX-Methoden — wirklich alles, in jedem Tab", ohne Video-Quelle diesmal
(„mach was du willst"). Gegen anerkannte UX-Gesetze statt gegen ein Video
geprüft (`PRINZIPIEN.md`, „Eigene UX-Sichtung"): Die App erwies sich nach elf
Blöcken als bereits sehr durchgearbeitet — ein echter, belegter Fund (Hover-
Rückmeldung fehlte in der Verwalten-Liste), als **Block 12** gebaut (v3.7.4).
Eine größere, bewusst zurückgestellte Baustelle (Renderkosten der Verwalten-
Liste bei vielen Karten) als möglichen künftigen Block in `AUFTRAG.md`
vorgeschlagen, nicht begonnen. **Rückmeldung zu Block 12:** „sieht gleich
aus" — zu Recht, eine Hover-Korrektur ist kaum sichtbar. Betreiber-Auftrag
präzisiert: Schrift, Fortschritt, Einstellungen, Verwalten, Google-Knopf
sichtbar verbessern, „mach was du willst". Als **Block 13** gebaut (v3.7.5):
Lichtschein auf allen erhobenen Flächen (`--sheen`), Lichtkante+Schatten auf
dem einen gefüllten Knopf pro Bildschirm, Verlauf auf großen Kennzahlen und
dem Heute-Balken, Icon-Chips in Einstellungen, markenkonformer heller
Google-Knopf, kräftigere Überschriften — alles ohne neue Farbe, ohne zweite
Fläche in einer Fläche, ohne Eingriff in die Lernlogik. **Betreiber-Test am
Handy (Flugmodus)** fand drei echte Fehler, als **Block 14** behoben
(v3.7.6): endloses Laden bei Netzausfall (neue `mitZeitlimit()`-Funktion,
bewusst nicht bei Google/Apple-Anmeldung), zu kräftiger Knopf-Glanz aus
Block 13 gedämpft, Google-Knopf im gesperrten Zustand kein verwaschenes
Grau mehr. Zwei Punkte geklärt (E-Mail-Fehlermeldungen waren schon da;
„lernkarte" in der Google-URL ist die nicht änderbare Firebase-Projekt-ID)
und zwei offen (violetter Balken vermutlich Browser-Erweiterung; Spam-
Zustellung braucht einen Firebase-Konsolen-Schritt, siehe `LOGBUCH.md`).
**23.09.2026 (v3.9.3):** Betreiber-Freigabe „mach A" für Kategorie A aus
`beobachtungen-lernwerkzeug.md` (echte, noch offene Bugs). Umgesetzt: Blätter
(`.dlg`) schließen jetzt animiert statt abrupt, halten den Fokus per Tab
(Fokus-Fang) und geben ihn beim Schließen an den öffnenden Knopf zurück —
die zweite Hälfte von Punkt 19/9. **Rückfrage des Betreibers, ob Kategorie A
wirklich vollständig bearbeitet ist, dann „mach einfach":** Punkt 19/13
(Renderkosten der Verwalten-Liste) daraufhin nachgemessen statt ungeprüft als
„eigene Freigabe nötig" liegen zu lassen — Ergebnis: bereits durch die
Seitenteilung aus v3.6.9 erledigt (1445 DOM-Elemente unverändert bei 200 wie
bei 5000 Karten), **keine Virtualisierung gebaut**, kein Code geändert.
Details und Messwerte: `redesign-oberflaeche/AUFTRAG.md`,
`redesign-oberflaeche/LOGBUCH.md`. **Erneute Freigabe „ich gebe dir Erlaubnis
alles zu machen" für die letzten zwei Punkte, dann (v3.9.4):** Punkt 16
(Firebase-Fehler nach Browser-Zurück) hatte einen echten, mit Playwright
bewiesenen Defekt in `importMitVersuch()` — Chromium cacht einen
fehlgeschlagenen `import()` an die exakte URL, die „drei Versuche" waren
dadurch faktisch nie mehr als einer. Behoben (zählender URL-Anhang ab dem
zweiten Versuch), End-zu-Ende gegen die echte `initFirebase()` bestätigt.
Ob das die einzige Ursache der ursprünglichen Meldung war, bleibt ohne
Gerätetest offen. Punkt 13 (Über-Scrolling) noch einmal durchgesehen —
kein weiterer Fund, der bestehende `svh`-Fix deckt den Mechanismus bereits
vollständig ab, kein Code geändert. Details: `beobachtungen-lernwerkzeug.md`
Punkt 13/16, `CHANGELOG.md` 3.9.4. **Betreiber-Test am Gerät (23.09.2026):
„jo klappt"** — beide Fixes (Punkt 13 und 16) am echten Gerät bestätigt.
**Kategorie A ist damit vollständig durchgearbeitet und am Gerät bestätigt**
— jeder Punkt gebaut und bestätigt, geprüft-erledigt, oder mit Begründung als
ohne Gerätetest nicht weiter belegbar dokumentiert.
Details: `CHANGELOG.md` 3.9.3.

### Nebenstrang: Monetarisierung & Wachstum (Gerüst)

Kein Phasen-Ordner, keine Nummer. Ordner
[`monetarisierung/`](monetarisierung/). **Es wird nichts gebaut** — nur ein
Gerüst, damit Geld/Wachstum einen festen Platz haben und nicht jede Session neu
durchdacht werden (Betreiber-Wunsch). Struktur, Entscheidungspunkte und offene
Fragen in [`GERUEST.md`](monetarisierung/GERUEST.md). Deckt `KONZEPT.md` §2
(„Abo/Bezahlung — später, nicht verbauen"). Status: `zurückgestellt` — ruht,
bis der Betreiber ihn ausdrücklich startet; die Grundfrage „soll überhaupt Geld
fließen" ist heute im `KONZEPT.md` §1 mit „kein Geldfluss" beantwortet.

### Nebenstrang: Einstieg vor der Anmeldung

Kein Phasen-Ordner, keine Nummer. Ordner [`onboarding/`](onboarding/). Ein
kurzer, geführter Einstieg für Neue **vor** dem Anmeldeformular, der auf die
erste eigene Karte hinarbeitet. Betreiber-Wunsch vom 19.09.2026, ausdrücklich
als Gesamtprojekt und nicht als Funktionsliste. Konzept, Belege und offene
Entscheidungen E1–E4 in [`AUFTRAG.md`](onboarding/AUFTRAG.md) — Stand
19.09.2026. **23.09.2026: Betreiber benennt Onboarding als nächstes Ziel,
aber als Neustart** — bisheriges Konzept deckt laut Betreiber „die
Effektivität nie ab", eigene YouTube-Quellen sollen einfließen (noch nicht
ausgewertet), Animationen sollen eine Rolle spielen. Details:
`onboarding/AUFTRAG.md` Abschnitt 0. **23.09.2026, noch am selben Tag: erste
Betreiber-Quelle ausgewertet** (Mobbin, „1000+ Onboarding-Flows") — Befund in
[`onboarding/VIDEO-BEFUND.md`](onboarding/VIDEO-BEFUND.md), getrennt nach
Verteilung, Einzelfall-Zahl und Muster; keine Video-Zahl trägt eine
Entscheidung oder kommt auf den Bildschirm (`STRATEGIE.md` 1.1). Daraus
entstanden: [`onboarding/FRAGENKATALOG.md`](onboarding/FRAGENKATALOG.md) —
sieben Prüfungen, die eine Frage bestehen muss, **neun Stationen** als
Reihenfolge (zeigen → Handlung ohne Konto → Lesbarkeit → Aussehen →
Rundengröße → Einlösung → Wenn-dann-Satz → Konto → erste eigene Karte) und
139 Fragen mit Ziel und Prüfergebnis: 3 sofort verwendbar, 11 mit kleinem
Bau, 24 hinter fremden Sperren, 101 abgelehnt mit Begründung. Die vom
Betreiber erbetene „Million Fragen" wurde **nicht** geliefert und der Grund
aufgeschrieben (die App hat drei Einstellungen, `app.js:891`; mehr Fragen
hieße Dekoration). Wichtigster Fund: ohne einen Bildschirm, der zeigt, **was
die Antworten bewirkt haben**, ist jeder Einstieg ein Fragebogen. **Noch am 23.09.2026, zweiter Durchgang:** Video mit 70 Bildern
nachgeprüft — drei App-Namen aus den Untertiteln waren falsch (BitePal,
Alma, Houzz), korrigiert; drei Funde kamen erst im Bild dazu
(Mehrfachauswahl ist die Regel, „Überspringen" steht sichtbar daneben, die
Antwort wird im **selben** Bildschirm kommentiert). Dazu Block 1
(Bestandsaufnahme, kein Code) vorgezogen:
[`onboarding/BESTAND.md`](onboarding/BESTAND.md). Wichtigster Befund am
Code: `onAuthStateChanged` setzt `settings` unbedingt zurück
(`app.js:1551`), Antworten müssen also in den `localStorage` und dürfen
erst nach dem Cloud-Dokument angewendet werden; `cloudDocExists`
(`app.js:1607`) ist bereits die Unterscheidung „neues vs. bestehendes
Konto". **Noch am 23.09.2026, dritter Schritt:** Betreiber delegiert F1, F2, F3, F6
und F7 ausdrücklich an den Agenten („entscheide du, hauptsache gut").
Entschieden und in [`onboarding/FRAGENKATALOG.md`](onboarding/FRAGENKATALOG.md)
§9 festgehalten: **vier Inhalte** (Schriftprobe, Hell/Dunkel, Rundengröße,
Wenn-dann-Satz), **ein** schlanker Abschluss-Bildschirm statt eines eigenen
für jede Frage, **Probelauf ohne Konto wird gebaut**, „clean" als sieben
prüfbare Animationsregeln, und der Einstieg erscheint nach einer Abmeldung
**nicht** erneut. Dazu neu [`onboarding/PSYCHOLOGIE.md`](onboarding/PSYCHOLOGIE.md):
nachgeschlagen statt behauptet — es tragen **zwei** Belege (Gollwitzer &
Sheeran 2006 für den Wenn-dann-Satz, Norton u. a. 2012 für die erste eigene
Karte, samt Vorbehalt „nur bei Abschluss"); „zu viel Auswahl lähmt" trägt
**nicht** (Sammelauswertung 2010: Wirkung praktisch null) und künstlicher
Fortschritt wird benannt und verworfen. **Noch am 23.09.2026, vierter Schritt:** Betreiber erlaubt Gebetszeiten als
Anker ausdrücklich und gibt den Wortlaut frei („sachen die einem talab al
ilm gehören"). Daraufhin [`onboarding/WORTLAUT.md`](onboarding/WORTLAUT.md)
— alle neun Stationen wörtlich, mit Knöpfen, `data-action`-Werten und
Hilfstexten. Die religiöse Sperre aus `KONZEPT.md` §7 ist damit an **einer**
Stelle geöffnet, nicht aufgehoben: keine Zitate, keine Formeln, kein Satz
über den religiösen Wert des Lernens; die Gebetsnamen stehen als
Tageszeiten. Die Freigabe ist in `WORTLAUT.md` §0 wörtlich zitiert. **Zweites Betreiber-Video am 23.09.2026 ausgewertet**
([`onboarding/VIDEO-BEFUND-2.md`](onboarding/VIDEO-BEFUND-2.md), Starter
Story Build mit Mau Baron/Prayer Lock): ein **Einzelfall**, der
erklärtermaßen auf **Umsatz** optimiert („an app is nothing more than a
sales funnel"). Da `KONZEPT.md` §1 kein Geldfluss vorsieht, trägt der größte
Teil hier nicht. **Drei Punkte übernommen** — Hauptfunktion im Einstieg
ausprobieren (F3 steht damit auf zwei unabhängigen Quellen), Antworten
zurückspiegeln, erst fragen wenn beantwortbar. **Vier ausdrücklich
abgelehnt** — Länge als Mittel der Verlustaversion, „Fragen, die die App
verkaufen" (die Umkehrung von P1), die folgenlose Bekenntnis-Frage und die
30-Tage-Zusage. Wo beide Videos sich widersprechen, gewinnt Video 1; die
Auflösung steht in `VIDEO-BEFUND-2.md` §4. **Gebaut am 23.09.2026 (v3.9.9), auf dem Arbeitszweig, nicht auf `main`.**
Sieben Bildschirme vor dem Anmeldeformular: Problem benennen, Beispielkarte
umdrehen und bewerten, Schriftgröße an dieser Karte, hell/dunkel,
Rundengröße, kurzer Abschluss, Wenn-dann-Satz mit den fünf Gebetszeiten und
einem freien Feld. Antworten liegen bis zur Registrierung im `localStorage`
und werden **nur** auf ein Konto ohne Cloud-Dokument angewendet (P7); die
Lernlogik ist nicht angefasst. Im Browser über alle Bildschirme geprüft,
hell und dunkel, 1024 px und 375 px. **Zwei geplante Teile fehlen noch und
sind als Lücke markiert:** die Wiederkehr des Wenn-dann-Satzes nach der
Anmeldung und der Satz am leeren Lernen-Bildschirm („Fertig. Jetzt deine
erste eigene Karte."). **Korrektur einer früheren Annahme in dieser Datei:**
Ein Push auf `main` veröffentlicht hier nichts — ausgeliefert wird manuell
über `veroeffentlichen.bat`. **Missverständnis geklärt (23.09.2026):** Die „1 Million Fragen" waren
**Fragen an den Betreiber** gemeint, nicht an die Nutzer:innen. Daraufhin
[`onboarding/BETREIBER-FRAGEN.md`](onboarding/BETREIBER-FRAGEN.md) — 87
Fragen in zwölf Blöcken, jede mit Vorgabe, sodass Schweigen eine gültige
Antwort ist. `FRAGENKATALOG.md` bleibt stehen und trägt die Klarstellung als
Kasten: Es besteht zu 90 % aus begründeten Ablehnungen und verhindert
doppelte Arbeit. **v3.9.10 (23.09.2026):** Der Einstieg hat jetzt seinen Abschluss — „Fertig.
Jetzt deine erste eigene Karte." und die Wiederkehr des Wenn-dann-Satzes auf
dem leeren Lernen-Bildschirm, beide gerätelokal, beide verschwinden mit der
ersten Karte. Dabei ein echter Grammatikfehler gefunden und behoben (der
gespeicherte Satz war kein deutscher Satz). Dazu
[`onboarding/BETREIBER-FRAGEN-2.md`](onboarding/BETREIBER-FRAGEN-2.md) — 66
Fragen zu Person, religiösem Rahmen, Zielgruppe und Zweck, diesmal fast ohne
Vorgaben, weil der Agent das nicht raten kann. **v3.9.11 (23.09.2026):** Auf Betreiber-Auftrag „mach alles du" sind alle
153 Fragen aus beiden Fragendateien vom Agenten beantwortet —
[`onboarding/ENTSCHIEDEN.md`](onboarding/ENTSCHIEDEN.md), je mit Grundlage
und mit einem Wort umkehrbar. **152 davon bestätigen den gebauten Stand**;
die einzige Code-Folge war der weiche Wechsel der Schriftprobe. Neun Punkte
bleiben offen, weil sie religiösen oder rechtlichen Gehalt haben — dort
gilt unverändert: der Agent schreibt nichts. Wichtig für künftige
Sitzungen: Die Fragendateien liegen unter `plan/` und werden **nicht
ausgeliefert**; der gebaute Einstieg stellt **drei** Fragen. Status:
`inhaltlich fertig auf dem Zweig, wartet auf Gerätetest und
Rechtsprüfung; nichts ausgeliefert`.

**v3.10.0 (23.09.2026, abends): Neubau nach Video 3.** Der Betreiber
bewertete den Einstieg aus v3.9.9–3.9.12 als „schlechter als erwartet". Die
Diagnose steht in
[`onboarding/NEUAUFBAU-3.md`](onboarding/NEUAUFBAU-3.md) §2: Er war ein
Einstellungs-Assistent, und das Wort auf der Probekarte war fast unsichtbar.

Neu gebaut nach der Bildsprache von Duolingo, Cal AI und Ladder: acht
Bildschirme mit Ziel, Hürden samt Antwort, Probekarte, Schrift, Runde, Anker
und Plan mit echten Wiederholungstagen. Das Konto heißt danach „Plan
speichern".

Die Prüfregeln P1–P7 sind teils gelockert; die harten Grenzen bleiben:
- keine erfundene Zahl
- Lernlogik unberührt
- keine neuen Speicherorte

Status: `auf main, wartet auf veroeffentlichen.bat, Gerätetest, J1 und die
Prüfung des Wortlauts „Den Quran verstehen"`.

### Nebenstrang: Feedback-Board

Kein Phasen-Ordner, keine Nummer. Ordner
[`feedback-board/`](feedback-board/). Öffentliches Board mit Vorschlägen und
Voting, TikTok-Anstoß. Frühere Einschätzung vom 19.09.2026 („nicht relevant,
bräuchte neuen Server") war ungenau — korrigiert, siehe
[`AUFTRAG.md`](feedback-board/AUFTRAG.md). Am 22.09.2026 per
`AskUserQuestion` entschieden: **öffentliches Board mit Voting**, nicht nur
ein verbessertes privates Formular. **Status: gebaut (v3.8.4)** — steht neben
„Fehler melden" in Einstellungen, keine Konto-Kennung am Vorschlag,
Abstimmen per Zählfeld + eigener Stimm-Unterammlung, Moderation nur für die
Konto-ID in `istFeedbackModerator()` (Platzhalter, Betreiber muss die eigene
eintragen). Gegen den Firestore-Emulator geprüft (Java eigens installiert):
132/132, davon 26 neu. Details:
[`feedback-board/LOGBUCH.md`](feedback-board/LOGBUCH.md). Offen: Betreiber
muss Konto-ID eintragen + deployen + am Gerät testen; Datenschutzerklärung
und Missbrauchs-Vorprüfung bewusst vertagt (`AUFTRAG.md`, Punkte 3/4).

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

### Nebenstrang: Lehrer-/Schülermodus (Gerüst)

Kein Phasen-Ordner, keine Nummer. Ordner
[`lehrer-modus/`](lehrer-modus/). **Es wird nichts gebaut** — nur ein Gerüst,
Betreiber-Wunsch vom 18.09.2026: „ein Gerüst, das immer weiter ausgebreitet
werden kann." Erste Skizze (Rollen pro Klassenraum, Mit-Admins, evtl. Chat)
in [`GERUEST.md`](lehrer-modus/GERUEST.md). Status: `zurückgestellt` — die
vier Gründe aus „Später" unten gelten weiter, allen voran die Datenschutzfrage
bei Minderjährigen.

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

  **Erste Skizze als Gerüst festgehalten (18.09.2026):**
  [`lehrer-modus/GERUEST.md`](lehrer-modus/GERUEST.md) — Rollen pro
  Klassenraum, Mit-Admins mit konfigurierbaren Rechten, evtl. Chat vom
  Admin an den Raum. Reine Sammlung offener Fragen, kein Bauauftrag.
  **19.09.2026:** Abschnitt L im Gerüst — zwei Freischalt-Arten („Fortschritt"
  wie heute beim Betreiber, „Lehrer gibt frei" per Klick, ohne Empfängerdaten).
  Betreiber-Wunsch, nicht entschieden, nichts gebaut.

- **Erneuter, verschärfter Sicherheits-Durchlauf vor Phase 6 (Öffentlich-
  machung).** Grund, festgehalten am 13.09.2026: Im Impressum steht der
  Vater des tatsächlichen Betreibers (16) als Verantwortlicher — er trägt
  damit die formale Haftung für das, was auf der Seite passiert. Der
  Betreiber hat ausdrücklich gebeten, das vor der Öffentlichmachung noch
  einmal zu verschärfen, nicht nur den Stand aus Phase 1 (der deckte nur
  Firestore-Regeln, Feld-Manipulation, Import, XSS ab) fortzuschreiben.
  **Korrektur 22.09.2026:** Der Betreiber (die Person, mit der diese
  Sessions arbeiten) ist **18, nicht minderjährig** — die Altersangabe „16"
  oben war falsch bzw. veraltet. Das Tool läuft weiterhin unter dem Namen
  **einer anderen Person** im Impressum, die die formale Haftung trägt; wer
  das genau ist (weiterhin der Vater, oder jemand anderes), ist hier nicht
  neu bestätigt worden — nur die Minderjährigkeit des Betreibers selbst ist
  vom Tisch. Für Entscheidungen, die an „Betreiber ist minderjährig"
  hingen (z. B. Lehrer-Gerüst Frage 5/C5 unten), gilt trotzdem weiter
  Vorsicht, weil die im Impressum genannte Person unverändert haftet — nur
  die Begründung „das ist ein Kind, das da haftet" trifft so nicht mehr zu.
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
| ~~6~~ | ~~Gilt `KONZEPT.md` §7 („App-Funktionen nicht anfassen") weiter, oder darf der Redesign auch die Bedienung ändern?~~ | **erledigt 18.09.2026** — dauerhaft gelockert, mit Bedingung — siehe unten |
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
**Geklärt am 18.09.2026 (Frage 6, dauerhaft).** Betreiber: „solange das
dings nicht komplett was ändert und es dem design oder verbesserung echten
handelt dann ja." §7 gilt damit nicht mehr nur für den Strang
`redesign-oberflaeche`, sondern grundsätzlich und dauerhaft, mit zwei
Bedingungen: (1) es muss echte **Design- oder Verbesserungsarbeit** an
Bedienung/Optik sein, (2) es darf **nichts komplett verändern** — keine
Neuerfindung einer Funktion, kein Ersatz einer Mechanik durch eine andere,
sondern Verfeinerung im bestehenden Rahmen. Die **Lernlogik** (was gelernt,
geübt und wie bewertet wird) bleibt davon ausdrücklich ausgenommen — das war
schon vorher die harte Grenze und ändert sich durch diese Entscheidung
nicht. `KONZEPT.md` §7 und `../CLAUDE.md` sind entsprechend nachgezogen.

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

**AKTUELL (24.09.2026, abends): v3.12.1 auf `main` – Systemzahlen entfernt
(Tage, Stufen) und neuer Ladebildschirm; davor v3.12.0 (siehe unten). Der
Betreiber will als Nächstes auf Einstieg und 3.12.0 eingehen – auf seine
Rückmeldung warten, nicht vorgreifen.**

**Stand v3.12.0: die ganze App in der Formsprache des Einstiegs.**

Betreiber: „vom onboarding sieht man so design bzw animationen und so kaum
was im tool", dazu Abmelden/Löschen absichern, Einstellung „Bewegung" weg,
jedes Gerät, und: abgemeldet war der Einstieg nicht mehr zu sehen.

Gebaut: Lernrunde mit echter Karte (Stapel, Stufen-Punkte, Umklappen),
Abschluss mit Bilanz, neuer Lernen-Startbildschirm (Ring, Woche, Start-Liste),
Aufbau-Bewegungen in Fortschritt/Verwalten, Profil in den Einstellungen,
Konto löschen auf eigener Seite mit Gedrückthalten, Abmelden mit Rückfrage,
Bestätigungs-Bildschirm geht von selbst weiter, Tablet-Raster. Fünf echte
Fehler behoben (Einzelheiten und Begründungen: `onboarding/LOGBUCH.md`,
Eintrag „Die ganze App in der Formsprache des Einstiegs").

**Bei „leg los" zuerst prüfen:**
1. Hat der Betreiber v3.12.0 veröffentlicht und am Gerät geprüft (Handy UND
   iPad)? Offene Punkte dazu stehen im Logbuch unter „Offen".
2. Liegt J1 vor?

Die Start-Liste (NEUAUFBAU-3.md §6) ist damit gebaut – der Punkt „braucht
Freigabe" ist erledigt.

---

**Vorheriger Stand (24.09.2026): zweite Rückmeldung des Betreibers zum Einstieg
umgesetzt (v3.11.0), auf dem Arbeitsbranch, noch nicht ausgeliefert.**

Sieben Punkte, alle vom Betreiber benannt, alle umgesetzt:

1. **Kürzere Sätze.** Die Antworten auf „Was hat dich bisher gebremst?" und
   auf die Probekarte sind je EIN Satz. Die Mechanik („und jedes Mal ein Stück
   später, bis es sitzt") steht nur noch als Bild da, nicht mehr unter jeder
   Antwort als Text.
2. **„Weiter" geht nicht mehr ohne Auswahl** — auf Ziel, Hürden und Zeitpunkt.
   Dafür neu: die Antwort „Nichts davon" bei den Hürden, damit die Pflicht
   keine Falle ist.
3. **„Dein Plan entsteht …" ist persönlich und länger** (Ziel und Hürde aus den
   eigenen Antworten; Dauer folgt der Zahl der Punkte, rund 4 statt 2,3 s).
4. **Behoben:** Nach Zurück und erneutem Vorgehen lief der Aufbau nicht mehr
   (`planGebaut` blieb stehen).
5. **Tablet und Desktop.** `.solo` stand auf `max-width: 440px` — auf jedem
   Gerät. Ab 600 px wächst die Spalte, ab 900 px ändert sich die Form
   (Antwortlisten zweispaltig, Plan-Kacheln vierspaltig).
6. **Kartensätze werden im Einstieg benannt** (TikTok-Befund des Betreibers:
   was im Onboarding fehlt, benutzt fast niemand) und haben in den
   Einstellungen eine eigene Seite statt zwei versteckter Hälften.
7. **Zwei Bewegungen aus dem Einstieg in der App** (gestaffelte Listenzeilen,
   federnder Haken im Wahl-Blatt) und eine neue Einstellung „Bewegung"
   (Voll / Ruhig, gerätelokal).

Nebenher zwei echte Funde: `styles.css` hatte keinen Versions-Query, und
`APP_SHELL` in `sw.js` traf mit `"./app.js"` nie die Anfrage `./app.js?v=…`.
Beides behoben, Veröffentlichungsliste in `README.md` und `CLAUDE.md` ergänzt.

Einzelheiten, Begründungen und die abgelehnten Punkte (Navigationsleiste auf
dem iPad, Kachel-Eintritt im Lernen-Raster, Erinnerungssatz in den
Einstellungen) stehen im Logbuch von `onboarding/`, Eintrag vom 24.09.2026.

**Bei „leg los" zuerst prüfen:**
1. Hat der Betreiber v3.11.0 am Gerät geprüft — Handy UND iPad?
2. Liegt J1 vor? (Neu dazu: der Schlüssel `adrabic-bewegung`, ohne Angabe über
   die Person.)
3. Hat er `veroeffentlichen.bat` ausgeführt?

Offen und bewusst nicht gebaut: der Erinnerungssatz als Einstellung — er
bräuchte einen dauerhaften Speicherort, und genau diese Schlüssel hängen in
J1.

---

**Vorheriger Stand (23.09.2026, abends): Einstieg nach Video 3 neu gebaut (v3.10.0),
 Einstieg nach Video 3 neu gebaut (v3.10.0),
Fehlersuche danach (v3.10.1, v3.10.2), auf `main`, noch nicht ausgeliefert.**

Die Fehlersuche fand vier Fehler im Einstieg (Doppeltipp übersprang einen
Bildschirm, zu kleine Trefferflächen, Kontrast 4,45:1, „Plan speichern“ blieb
stehen) und einen außerhalb: Das helle Thema wurde beim Start kurz auf dunkel
gesetzt (`themaAnwenden()`, `app.js` ~1230), ohne Netz dauerhaft. Alle
behoben. **Nur eines ist ungeprüft:** der Weg über ein echtes Konto. Der
Betreiber prüft am Gerät mit hellem Thema und angemeldet. Einzelheiten im
Logbuch von `onboarding/`.

Der Betreiber sagte: „onboarding ist schlechter als erwartet … du hast die
videos anscheinend nicht verstanden". Darauf folgte Video 3 (Rok Bozic:
Duolingo, Cal AI, Ladder). Es ist vollständig ausgewertet: das ganze
Transkript und rund 490 Bilder.

Der Einstieg hat jetzt acht Bildschirme:
- Willkommen mit umdrehender Karte und „Ich habe schon ein Konto"
- Ziel, mit Echo
- Hürden, mit Antwort direkt unter der Wahl
- Probekarte
- Schrift und Runde, vorausgewählt aus den Hürden
- Anker
- Plan mit den echten Wiederholungstagen

Danach heißt das Konto „Plan speichern". Dabei behoben: Das Wort auf der
Probekarte war seit 3.9.9 fast unsichtbar.

Alles Weitere steht in
[`onboarding/NEUAUFBAU-3.md`](onboarding/NEUAUFBAU-3.md) und
`onboarding/LOGBUCH.md`.

**Bei „leg los" zuerst prüfen:**
1. Hat der Betreiber `veroeffentlichen.bat` ausgeführt und am Gerät getestet?
2. Hat er den Wortlaut „Den Quran verstehen" geprüft (`NEUAUFBAU-3.md` §8)?
3. Liegt J1 vor?

Ohne neue Vorgabe ist der nächste mögliche Schritt die Start-Liste nach der
Anmeldung (`NEUAUFBAU-3.md` §6). Sie braucht eine Freigabe, weil sie das
Lernwerkzeug berührt.

---

**Vorheriger Stand (23.09.2026, dieselbe Session, davor): veröffentlicht
(`veroeffentlichen.bat` durch den Betreiber ausgeführt).** Gerätetest und
J1-Rechtsprüfung macht der Betreiber selbst, „heut noch" bzw. „am Ende" —
keine Session-Aktion nötig, bis er sich meldet. Auf Rückfrage, woran
weitergebaut werden soll, kam der offene Vorschlag aus `VIDEO-BEFUND-2.md`
§6 (S1-Zusatzsatz) — geprüft und als **bereits erledigt** befunden (S1 wurde
beim Bau v3.9.9 ohnehin härter geschrieben, deckt den Vorschlag inhaltlich
ab), nur nachdokumentiert, kein neuer Code. Damit ist der Onboarding-Strang
**ohne unblockierten Punkt** — nächste Session prüft zuerst, ob der
Betreiber J1 und den Gerätetest inzwischen gemacht hat, bevor sie etwas
Neues sucht. Details: `onboarding/LOGBUCH.md`, Eintrag „Veröffentlicht;
S1-Zusatzsatz geprüft, bereits erledigt".

---

**Vorheriger Stand (23.09.2026, neue Session): neun offene Punkte
beantwortet, Video-Tipps gegengeprüft, kein Fund.** Betreiber-Antwort auf die
neun Punkte aus `onboarding/ENTSCHIEDEN.md`: nein zu 1–7 und 9 (gebauter Stand
bleibt, J1-Rechtsprüfung bleibt trotzdem offen), Punkt 8 (K7) an den Agenten
delegiert. Beide ausgewerteten YouTube-Videos noch einmal gegen den gebauten
Stand (v3.9.12) geprüft, nicht nur gegen die Absicht — lokaler Klick-Test
durch alle neun Stationen, kein offener Tipp gefunden. **Rückfrage „mein
schlecht ist plötzlich" geklärt:** Betreiber meinte nichts Bestimmtes
(„ka was du meinst ... alles gut"), kein Fehler gemeldet. **Spontan
geschickter TikTok-Link ausgewertet** (`@teobuildsapps`, „5 Mobile App
Onboarding Screens") — ebenfalls kein neuer Punkt, siehe
`onboarding/LOGBUCH.md`, Eintrag „TikTok-Link ausgewertet, kein Fund". Damit
ist dieser Strang für den Moment durch: **Reine Warteposition auf J1
(Rechtsprüfung) und den Gerätetest**, beides beim Betreiber. Details:
[`onboarding/LOGBUCH.md`](onboarding/LOGBUCH.md), Einträge „Neun Punkte
beantwortet, Video-Tipps gegengeprüft" und „TikTok-Link ausgewertet".

---

**Vorheriger Stand (23.09.2026, sehr spät): Grammatik-Feld wieder entfernt (v3.9.8).**
Wenige Stunden nach dem Bau (v3.9.7, siehe unten) fragte der Betreiber selbst
„fürs Erste entfernen? Hick's Law und so." Drei Optionen vorgelegt (Lassen/
Verstecken/Entfernen), Betreiber wählte **Entfernen**. Zurück auf Stand
v3.8.5 (Grammatik-Hinweis nur als Label-Wort im `extra`-Feld) — kein eigenes
`grammatik`-Feld mehr in `normCard`, Cloud, Formular, Weitergabe, Abgleich,
Suche, `firestore.rules`. `APP_VERSION`/`CACHE_NAME`/Versions-Query/
`CHANGELOG.md` → 3.9.8. Details: `beobachtungen-lernwerkzeug.md` Punkt 21.
**Falls das Thema wieder aufkommt** (z. B. sobald Konjugationsthemen wie
3. Person/Plural im Kartenbestand ankommen): neu aufrollen, nicht
stillschweigend wieder einbauen.

**Onboarding bleibt das von Betreiber benannte nächste Ziel** — daran ändert
diese Rücknahme nichts, siehe Eintrag darunter und
[`onboarding/AUFTRAG.md`](onboarding/AUFTRAG.md) Abschnitt 0.

---

**Vorheriger Stand (23.09.2026, sehr spät): Grammatik-Feld gebaut (v3.9.7),
Betreiber benennt Onboarding als nächstes Ziel.** Zwischen dem vorigen Eintrag unten
(v3.9.2) und jetzt liegen v3.9.3–v3.9.7 (Kategorie-A-Bugs am Gerät bestätigt,
`importMitVersuch()`-Cache-Defekt behoben, Versions-Query-Lücke geschlossen,
Ladekreis-Fix, eigenes Grammatik-Feld) — Details dazu stehen in den jeweiligen
Logbüchern und `CHANGELOG.md`, hier nicht einzeln nachgetragen.

Aus einer reinen Rückfrage-/Review-Runde (kein Code-Auftrag) kamen drei neue
Punkte:
- **Grammatik-Feld (v3.9.7) gegen echte Nutzerdaten geprüft** (Betreiber-
  Export, 136 Karten): Feld bei 0 von 136 Karten befüllt, also noch keine
  bestehenden Daten, die bei einer späteren Entscheidung „Freitext reicht
  nicht" umgestellt werden müssten. Betreiber-Gerätetest (`firestore.rules`
  gegen echtes Schreiben) steht weiter aus — siehe
  `beobachtungen-lernwerkzeug.md` Punkt 21.
- **Feedback-Board:** neue Beobachtung „Vorschlagsliste lädt sehr lange,
  funktioniert aber" — nicht gemessen, nicht behoben. Details:
  [`feedback-board/LOGBUCH.md`](feedback-board/LOGBUCH.md).
- **Reihenfolge-Modus (bisher „Quran-Ayat-Modus"):** Betreiber verallgemeinert
  selbst auf Gedichte/jeden fortlaufenden Text, Kern bleibt „chronologisch
  statt zufällig". Ausdrücklich weiter keine Entscheidung, kein Bau — Details:
  `beobachtungen-lernwerkzeug.md` Punkt 20.
- **Onboarding ist das von Betreiber benannte nächste Ziel**, aber als
  **Neustart**, nicht Fortsetzung der Fragen E1–E4: bisheriges Konzept deckt
  laut Betreiber „die Effektivität nie ab". Betreiber bringt eigene
  YouTube-Quellen mit (der `/watch`-Skill lief bei ihm nicht zuverlässig,
  Quellen liegen noch nicht ausgewertet vor), Animationen sollen eine Rolle
  spielen (Stichworte „Higgsfield", „Flutter" — Inspiration, keine
  Technologie-Entscheidung, diese App bleibt Build-frei). Ankündigung:
  vermutlich neue Session/neuer Chat dafür. Details:
  [`onboarding/AUFTRAG.md`](onboarding/AUFTRAG.md) Abschnitt 0.
- Eine Betreiber-Bemerkung („das Tool ist auch für andere, die denken sie
  missen was, glaub entfernen oder so") blieb inhaltlich unklar — nicht
  gedeutet, nicht dokumentiert als Entscheidung. Bei Gelegenheit nachfragen,
  was gemeint war.

**Bei „leg los" zuerst prüfen: Hat der Betreiber die angekündigten
YouTube-Quellen für Onboarding mitgebracht?** Wenn ja: `onboarding/AUFTRAG.md`
komplett neu aufziehen (Abschnitt 0 dort), nicht an E1–E4 weiterarbeiten.
Wenn nein: nächste unblockierte Sache nehmen (z. B. Betreiber-Gerätetest von
v3.9.7 abfragen, oder Feedback-Board-Ladezeit messen lassen).

---

**Vorheriger Stand (23.09.2026, sehr spät): zweiter Feedback-Board-Ladehänger
gefunden und behoben (v3.9.2).** Neue Betreiber-Meldung mit Screenshot,
direkt im Anschluss an den Endlosschleifen-Fix (v3.9.1, siehe unten): auf
einem Konto blieb „Ideen & Vorschläge" dauerhaft bei „Lädt…", obwohl auf
einem anderen Konto kurz zuvor erfolgreich ein Vorschlag eingereicht wurde
— also kein Regel-/Deploy-Fehler mehr (der hätte sofort die Fehlermeldung
aus 3.9.1 gezeigt), sondern ein echter Netz-Hänger: die Firestore-Antwort
kam nie an, weder als Erfolg noch als Fehler, ohne Zeitlimit wartete die
Seite ewig. Fix nach demselben, bereits bewährten Muster wie der
Start-Ladebildschirm seit 2.21.1: nach 9s ohne Antwort erscheint „Das
dauert länger als sonst" mit „Erneut versuchen" — ein spät doch noch
eintreffendes Ergebnis des aufgegebenen Versuchs wird über eine laufende
Nummer (`feedbackLadeToken`) erkannt und verworfen. Dabei auf Betreiber-
Auftrag („Ladefähigkeiten im gesamten Tool verbessern, gleich aufweisende
Mängel") das übrige Werkzeug durchgesehen: Feedback-Board war die einzige
Stelle mit einer unbegrenzt wartenden Lade-Anzeige ohne Zeitlimit, kein
weiterer Fund. Details: [`feedback-board/LOGBUCH.md`](feedback-board/LOGBUCH.md).

**Vorheriger Fund (v3.9.1):** Feedback-Formular flackerte und blieb
dauerhaft bei „Lädt…" hängen. Ursache: ein fehlgeschlagener Ladeversuch
löste sich selbst sofort wieder aus (Endlosschleife), zerstörte dabei bei
jedem Anlauf die fokussierten Eingabefelder — das war das Flackern.
Behoben: kein automatischer Wiederholungsversuch mehr nach einem
Fehlschlag, stattdessen ein „Erneut versuchen"-Knopf. Nebenfund: „Vorschlag
einreichen" ließ sich während des Speicherns doppelt antippen, jetzt
gesperrt. Dazu eine erste Sicherheitsdurchsicht auf Betreiber-Auftrag („wie
ein Hacker") — `firestore.rules`, Mailto-Formular (Injektion), Auth-E-Mails
(Open-Redirect), `esc()`-Abdeckung geprüft, keine Funde.

**Davor:** `landing.html` auf Betreiber-Wunsch gelöscht (v3.9.0, wird neu
gemacht), Referenzen bereinigt (`firebase.json`-Rewrite raus, `sw.js`-Cache,
Datenschutz Abschnitt 11 nur noch Fehlerformular). Nächster großer Schritt
laut Betreiber vermutlich `onboarding/` statt Landing-Page. Details:
[`phase-6-startseite/LOGBUCH.md`](phase-6-startseite/LOGBUCH.md).

**Bei „leg los" zuerst prüfen: hat der Betreiber getestet, ob „Erneut
versuchen" nach 9s tatsächlich erscheint und einen neuen Versuch auslöst,
und hat er sich zu Onboarding vs. Landing-Page geäußert?** Die
Sicherheitsdurchsicht ist nicht erschöpfend — bei Gelegenheit fortsetzen,
wenn der Betreiber das ausdrücklich will.

**Vorheriger Stand (23.09.2026, spätnachts): Schwebende Leisten farblich vereinheitlicht
(v3.8.7), App-Vollständigkeits-/Wachstums-Checkliste angelegt.** Betreiber-
Screenshots zeigten `.nav` über Karten sichtbar heller als über leerem
Hintergrund — mit Python/Pillow direkt aus den Screenshots vermessen
(RGB 48 vs. RGB 25, fast doppelt so dunkel für denselben Bauteil). Ursache:
`backdrop-filter: blur` auf halbtransparenten Leisten reagiert auf das, was
dahinter liegt. `.nav`/`.appbar`/`.modebar` von 82–86 % auf 95 % festen
Flächenanteil angehoben. **Nicht am Gerät geprüft**, nur rechnerisch/optisch
eindeutig — Betreiber-Test steht aus. Details:
[`redesign-oberflaeche/LOGBUCH.md`](redesign-oberflaeche/LOGBUCH.md).
Zusätzlich auf Betreiber-Wunsch („was fehlt noch für eine App, wirklich
alles was gut bzw. profitabel ist") eine Sammlung in
[`monetarisierung/GERUEST.md`](monetarisierung/GERUEST.md) Abschnitt E
angelegt: AGB/Widerrufsbelehrung, Zahlungsanbindung konkretisiert
(PWYW-Link/Stripe Checkout/Freischalt-Problem ohne Server), Referral ohne
Tracking, Spannung „keine Nutzungszahlen vs. datengestützte Entscheidungen",
Store-Frage und Push-Erinnerungen als bewusst zurückgestellt bestätigt.
**Nichts davon gebaut, reine Bestandsaufnahme.**

**Vorheriger Stand (23.09.2026, noch später): Feedback-Board-Löschtext entschärft
(v3.8.6) — Prinzip „nur versprechen, was rechtlich nötig ist" jetzt explizit.**
Betreiber wollte möglichst wenig persönliche Betriebspflicht: die Zusage,
Löschwünsche per Wortlaut-Abgleich per E-Mail zu bearbeiten, war eine
selbst erfundene Zusatzpflicht, keine rechtlich nötige — der allgemeine
Rechte-Abschnitt der Datenschutzerklärung deckt das ohnehin ab, und
§§ 8-10 DDG verlangen ausdrücklich keine laufende Überwachungspflicht für
nutzergenerierte Inhalte. Text entsprechend entschärft, kein Rechtsverlust.
Details: [`phase-5-recht/LOGBUCH.md`](phase-5-recht/LOGBUCH.md), Eintrag
„Feedback-Board-Löschtext entschärft". **Bei „leg los" prüfen: hat der
Betreiber weitere Stellen im Tool genannt, wo ähnliche unnötige
Zusatzversprechen stehen?**

**Vorheriger Stand (23.09.2026, später): Punkt 21 gebaut (v3.8.5), Premium-Feature-
Kandidaten gesammelt.** Betreiber wollte „erst an Feld 21 rangehen" — Label
von `f-extra` (`app.js`, `karteSheet()`) um „Grammatik" erweitert, kleinst-
möglicher Schritt, kein neues Datenfeld. Dazu auf Betreiber-Wunsch drei
konkrete Kandidaten für eine spätere Premium-/Zusatz-Stufe in
[`monetarisierung/GERUEST.md`](monetarisierung/GERUEST.md) Abschnitt A
gesammelt (Code-Teilen, Quran-Ayat in Reihenfolge, kosmetische Anpassung —
Letztere ausdrücklich ohne eigenes Konzept, nur als Richtung benannt).
**Nichts davon gebaut außer der Label-Änderung** — reine Sammlung, damit die
Ideen nicht verloren gehen. `APP_VERSION`/`CACHE_NAME`/`CHANGELOG.md` → 3.8.5.

**Vorheriger Stand (23.09.2026): Sicherheits-/Rechts-Durchsicht nach dem
Feedback-Board.** Betreiber-Anstoß (TikTok-Video zu `.env`-Dateien) genutzt, um
gezielt nachzuprüfen: `.env` passt nicht auf dieses Projekt (kein
Build-Schritt, Firebase-`apiKey` ist bei Web-Apps ohnehin öffentlich
vorgesehen, echter Schutz liegt in `firestore.rules` + Browser-Key-
Einschränkung, beides vorhanden) — jetzt in `README.md` dokumentiert, damit
die Frage nicht erneut aufkommt. Dabei eine echte Lücke gefunden und
geschlossen: `datenschutzerklaerung.html` behauptete noch pauschal, andere
Nutzer:innen könnten keine fremden Daten einsehen — stimmt seit dem
Feedback-Board nicht mehr uneingeschränkt, neuer Abschnitt 6 dort. Details:
[`phase-5-recht/LOGBUCH.md`](phase-5-recht/LOGBUCH.md), Eintrag „Sicherheits-
/Rechts-Durchsicht nach Feedback-Board". Zwei neue, ausdrücklich nicht
gebaute Ideen notiert:
[`beobachtungen-lernwerkzeug.md`](beobachtungen-lernwerkzeug.md) Punkte 20
(Quran-Ayat in Reihenfolge statt Zufallsprinzip) und 21 (Grammatik-Hinweise
im Notiz-Feld nicht erkennbar).

**Vorheriger Stand (22.09.2026, spätnachts): App bei v3.8.4 — Feedback-Board gebaut**
(Einstellungen → Hilfe → „Ideen & Vorschläge", neben „Fehler melden").
Öffentliche Liste mit Vorschlägen und Abstimmen, ohne gespeicherte
Konto-Kennung (Betreiber-Vorgabe: „niemand kann auf die Daten der anderen
zugreifen"). Neue `firestore.rules` gegen den echten Firestore-Emulator
geprüft — Java eigens für diese Sitzung installiert (vorher nicht vorhanden):
**132 von 132 Prüfungen**, davon 26 neu. Details, inklusive eines dabei
gefundenen und behobenen echten Regel-Fehlers (fehlende Klammern in einer
`&&`/`||`-Kette):
[`feedback-board/LOGBUCH.md`](feedback-board/LOGBUCH.md).
**Nicht fertig, solange der Betreiber diese Schritte offen hat:** (1) eigene
Konto-ID in `istFeedbackModerator()` (`firestore.rules`) eintragen — ohne das
kann niemand moderieren; (2) `firebase deploy --only "firestore:rules"` (gilt
weiterhin auch für die seit v3.7.0 offene Lehrer-Gerüst-Regel); (3)
`veroeffentlichen.bat`; (4) Gerätetest mit echtem Konto.
**Bei „leg los" zuerst prüfen, ob der Betreiber sich dazu gemeldet hat.**
Der Rest dieses Abschnitts ist älterer Stand.

**Vorheriger Stand (22.09.2026, noch später): App bei v3.8.3** — zwei Funde
aus der Rückmeldung zu v3.8.2 behoben (leerer Bereich nicht wischbar, heller
Modus zu weiß). Fünf weitere Punkte per `AskUserQuestion` geklärt: große
Zahl „Dein Stoff" bleibt (aber neuer, unentschiedener Fund: die
Aufschlüsselung darunter gefällt dem Betreiber nicht, ohne konkreten
Ansatzpunkt), Wisch-Übergang bleibt (kein Vorschau-Umbau ohne klaren
Nutzen), Ladebildschirm bleibt unangetastet (Betreiber will ihn künftig von
Grund auf neu bauen, nicht flicken), Feedback-Board-Umfang entschieden
(öffentlich, mit Voting — seither gebaut, siehe oben). Einzelheiten:
[`redesign-oberflaeche/LOGBUCH.md`](redesign-oberflaeche/LOGBUCH.md), Eintrag
„Block 17-Nachlese".

**Vorheriger Stand (22.09.2026, spät): App bei v3.8.2 — Block 17, das Wischen neu
gefasst.** Betreiber-Rückmeldung zu Block 15: „das wischen ist sehr
unangenehm und schwer, will wirklich was flüssiges". Ursache war eine zu
starke Dämpfung der Bewegung (Finger legt 100px zurück, Bildschirm bewegt
sich nur 42px) — jetzt 1:1-Verfolgung wie die beiden anderen, bereits
bewährten Wisch-Gesten der App (Karte bewerten, Blatt wegwischen), plus
Tempo-Kriterium für kurze, schnelle Wische. Einzelheiten im Logbuch,
Eintrag „Block 17". **Bei „leg los" zuerst prüfen, ob der Betreiber sich zu
v3.8.2 gemeldet hat**, insbesondere zum Wischgefühl selbst.

**Vorheriger Stand: v3.8.1 — Block 16 nachgeschoben.** Zwei
Rückfragen des Betreibers zu v3.8.0: (1) Screenshot vom iPhone 11, auf dem die
Bildschirmtastatur das Karten-Blatt verdeckt und die Speichern-Knöpfe
unerreichbar macht — behoben (`syncTastatur()`, `--tastatur`, gilt für alle
Blätter und Dialoge). (2) „wiederholt sich da ned was" bei „Dein Stoff" — ja,
zweimal; eine Zeile ist raus, für die zweite Stelle liegt eine **offene Frage
beim Betreiber** (Einzelheiten im Logbuch, Eintrag „Block 16"). Beides braucht
den Gerätetest.

**Vorheriger Stand: v3.8.0 — Block 15 „Ruhe und Fluss"
gebaut, Betreiber-Test am echten Handy steht aus.** Der Betreiber hat zu
v3.7.6 eine lange, zusammenhängende Rückmeldung mit Screenshot geschickt
(Verwalten „unübersichtlich", Tabwechsel „sieht billig aus", „jede Seite ist
gefühlt ein hard reset", „nicht jeder Button muss … einen Glanz tragen", „es
soll zu meinem Icon passen", „zwischen den Tabs wischen"). Alles davon ist in
v3.8.0 abgearbeitet, Einzelheiten und Begründungen in
[`redesign-oberflaeche/LOGBUCH.md`](redesign-oberflaeche/LOGBUCH.md), Eintrag
vom 22.09.2026 („Block 15"). **Bei „leg los" zuerst prüfen, ob der Betreiber
sich zu v3.8.0 am Gerät gemeldet hat** — besonders zum Wischen (Schwelle 64px)
und zum warmen Farbton auf OLED. Erst danach der nächste Block.

**Zwei Punkte aus derselben Rückmeldung sind bewusst noch offen** (eigener
Logbuch-Eintrag vom 22.09.2026, „Zwei Punkte der Rückmeldung geprüft"):
(1) **Aufräumen/toter Code** — eigener Block, erst NACH der Gerätemeldung,
weil ein Aufräum-Diff sonst mit dem Gestaltungs-Diff verschmilzt; braucht die
`data-action`-Tabelle als Liste erreichbarer Einstiegspunkte, ein reines
`grep` nach Funktionsnamen reicht bei dieser Datei nicht. (2) **„die deutschen
Schriften variieren"** — teils Absicht (`styles.css` Abschnitt 5: Stoff in
Serifen, Bedienung in Systemschrift); ob der Betreiber diese Regel selbst
ändern will, ist seine Entscheidung, nicht die eines Agenten.

**Ebenfalls unverändert offen: „Gestaltung 4.0 ist zurückgenommen.** Ein
Komplett-Neuaufbau der Optik ist NICHT gewollt (Betreiber am 22.09.2026: „das
davor war besser, zurücksetzen"). Weitergearbeitet wird ausschließlich in
kleinen Schritten innerhalb des bestehenden Stils.

**AKTUELL (19.09.2026): „Lehrer gibt frei" wartet auf den Betreiber; Datei-Weitergeben ist raus (v3.7.2).**
Bau-Freigabe des Betreibers („ja soll gehen", einschließlich der Änderung an
`offeneLektionIds()`) ist umgesetzt: App-Code, `firestore.rules` und
Regelprüfung (106/106 im Emulator) stehen, ein Durchlauf gegen die echte
`app.js` (34/34) ebenfalls. Einzelheiten und Entscheidungen:
[`lehrer-modus/LOGBUCH.md`](lehrer-modus/LOGBUCH.md), Auftrag:
[`lehrer-modus/GERUEST.md`](lehrer-modus/GERUEST.md) Abschnitt L und M.
**Nicht fertig, solange der Betreiber diese zwei Schritte offen hat:**
(1) `firebase deploy --only "firestore:rules"` — ohne die neue Regel schlägt
„Nächste Lektion freigeben" mit `permission-denied` fehl, und das Löschen von
`teilCode` (Teilen beenden) bleibt abgewiesen; (2) `veroeffentlichen.bat`;
danach ein Test mit **zwei Konten** (Lehrer teilt und gibt frei, Schüler löst
ein und sieht die Lektion nach Neustart). Kein weiterer Codepunkt daraus; bei
„leg los" zuerst prüfen, ob der Betreiber sich dazu gemeldet hat. Der Rest
dieses Abschnitts ist älterer Stand.

**Stand 18.09.2026, Nacht: App bei v3.6.8, alles Bekannte gelöst.** Zwei
unabhängige Stränge liefen heute:

**1. Code-basiertes Teilen** (Lehrer-Gerüst) fertig gebaut und deployed:
10-stelliger Code, Lektion in Firestore `geteilteLektionen/{code}`, Widerruf
möglich, skaliert bis 3000+ Karten. Firestore-Regeln vom Betreiber live
deployed. Details siehe Git-Historie ab Commit `51cb5a0`.

**2. Beobachtung 18 (Nav-Leiste springt auf dem Handy) — nach sechs
erfolglosen Meldungen endlich gelöst und am echten Handy bestätigt.**
Ursache: `window.innerHeight` liefert in der Home-Bildschirm-App
unterschiedliche Werte für denselben Bildschirm, je nachdem ob der aktuelle
Tab scrollbar ist. Fix in `app.js`/`styles.css` (`syncViewportGap`,
`--vv-gap`). Ein Debug-Overlay bleibt im Code (7× Tap auf die Versionsnummer
in Einstellungen) für künftige ähnliche Fälle. Nebenfund dabei behoben:
Hochzähl-Animation im Fortschritt-Tab lief bei jedem Tab-Besuch neu.
Details in `beobachtungen-lernwerkzeug.md` Punkt 18.

**Betreiber kündigt als Nächstes an:** ca. acht Produktideen aus TikTok-
Videos, die in einem **neuen Chat** besprochen werden sollen — manche davon
vermutlich am aktuellen Stand nicht umsetzbar. Eine neue Session liest diese
Ideen dort, prüft sie gegen `KONZEPT.md` §7 und die „Später"-Liste unten,
bevor irgendetwas gebaut wird.

Frühere Stände (Redesign-Strang, Google-Login, Umzug auf `adrabic.web.app`)
bleiben unverändert `fertig`, siehe „Frühere Lage" unten.

**19.09.2026 — Backlog-Ideen aus TikTok werden einzeln abgearbeitet**
(Reihenfolge nach Betreiber-Wahl; Backlog im Gedächtnis des Assistenten, nicht
im Repo). Erledigt: Hick's Law (Nr. 6, schon umgesetzt, nichts gebaut),
Offline-Zustand (Nr. 2, v3.6.9, Anzeige gebaut) und leere Startzustände
(Nr. 5, v3.6.10/3.6.11, kürzester Weg zur ersten Karte, Hauptknopf umgekehrt)
und Sicherheits-Checkliste (Nr. 7, Eintrag in `phase-1-datenzugriff/LOGBUCH.md`).
**Wichtig aus Nr. 7 — braucht den Betreiber, sonst wirkt nichts:** (1) `firestore.rules`
deployen (nicht Teil von `veroeffentlichen.bat`!): die Regel für `geteilteLektionen`
stand außerhalb des Dokumentbaums — im Emulator bewiesen: jede Teilen-Handlung wird
mit der alten Datei abgewiesen (für die Repo-Datei; die deployte ist nicht geprüft) —
und die Sammlung ließ sich auflisten; (2) Hosting deployen, damit `firestore.rules` und
eine interne Konzeptdatei nicht mehr öffentlich ausgeliefert werden; (3) Code-Teilen
mit zwei Konten testen; (4) das GitHub-Repo ist **öffentlich** — Sichtbarkeit
entscheiden (Alter des Betreibers steht in `plan/`), Billing-Alert und Backups in der
Konsole prüfen. Beide mit Begründung in
[`redesign-oberflaeche/LOGBUCH.md`](redesign-oberflaeche/LOGBUCH.md).
**Entschieden in v3.6.11:** Auf dem leeren Lernen-Bildschirm ist „Erste Karte
anlegen" der gefüllte Knopf (Begründung im Logbuch: Zusage-Kette Startseite →
Bestätigung → erster Bildschirm); Datei und Code stehen als leisere Knöpfe daneben.
Rücknahme wäre ein einzelner Revert.
**Offen aus v3.6.9:** Betreiber muss veröffentlichen (`veroeffentlichen.bat`) und
im Flugmodus am Handy prüfen; Entscheidung über eine Sperre „Teilen per Code"
offline (Nebenfund im Logbuch).

**Es gibt aktuell keinen aktiven, unblockierten Codepunkt mehr.** Was noch
offen ist, hängt an Betreiber-Entscheidungen, nicht an Bau-Arbeit:

- **Lehrer-Gerüst, Frage 5/C5 (Minderjährige) für eine künftige
  server-gestützte Komfortversion** — harte Sperre, braucht echten
  anwaltlichen Rat, keine Agenten-Einschätzung. Der heute live Link-
  Mechanismus (v3.5.3) umgeht das strukturell, löst die Grundfrage aber
  nicht für andere Varianten (z. B. mit Widerruf, siehe Gerüst Abschnitt J).
- Strang A, Punkt 2.4 (Marke oder Person) — Identitätsfrage.
- „Später"-Punkte: Lehrer-/Schülermodus mit Klassenräumen (Ausbaustufe A–D
  im Gerüst), eigene Domain-Erweiterung, Abo/Bezahlfunktion, App Check,
  App-/Play-Store.
- Alte Firebase-Hosting-Site `lernkarte-925c2.web.app` könnte irgendwann
  abgeschaltet werden, sobald `adrabic.web.app` sich etabliert hat — kein
  Blocker, reine Aufräumfrage für später.

Eine neue Session prüft zuerst, ob der Betreiber inzwischen eine dieser
Fragen beantwortet oder eine neue Schwachstelle genannt hat (z. B. über
`beobachtungen-lernwerkzeug.md`, dort stehen weiterhin unentschiedene Punkte
1, 3, 9, 10 sowie ungeteste Verdachts-Fixe 5, 13, 16) — **und prüft `git log`
gegen den hier dokumentierten Stand**, nicht nur diese Datei: Am 18.09.2026
lag zwischen dem zuletzt dokumentierten Stand und `HEAD` ein Commit, der
ohne den Veröffentlichungs-Schritt aus `README.md` eingecheckt war (siehe
Logbuch-Eintrag „„Leg los" geprüft" weiter unten) — genau die Sorte Lücke,
die eine neue Session zuerst schließt, bevor sie auf eine neue Vorgabe
wartet. Ohne neue Vorgabe UND ohne eine solche Lücke gibt es nichts zu
bauen — das ist kein übersehener Schritt, sondern der plangemäße
Ruhezustand nach Abschluss aller Phasen und des Redesign-Strangs.

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
| 2026-09-17/18 | **Offene Frage 13 umgesetzt und am Gerät bestätigt** (v3.4.6–3.4.11). Google-Anmeldung über Firebase-Auth-Popup ergänzt (v3.4.6), Apple-Knopf hinter Flag `APPLE_LOGIN_BEREIT` versteckt, da ein kostenpflichtiges Apple-Developer-Konto fehlt (v3.4.11). Drei CSP-Nachbesserungen bis der Google-Login wirklich durchlief: fehlendes `frame-src` (v3.4.8), fehlendes `apis.google.com` in `script-src`/`connect-src`/`frame-src` (v3.4.9), und die eigentliche Ursache für die anhaltende Fehlermeldung trotz korrigierter CSP — ein `304 Not Modified` aktualisiert beim Browser gespeicherte Antwort-Header nicht, weshalb bereits cachende Besucher:innen auf der alten CSP festsaßen; behoben mit einer Merkzeile (`csp-build`) in `index.html`/`landing.html`, die bei reinen `firebase.json`-Änderungen einen neuen Datei-Fingerabdruck erzwingt (v3.4.10). Seit 18.09.2026 am echten Gerät bestätigt funktionierend. Details in `phase-4-domain-hosting/LOGBUCH.md` und `redesign-oberflaeche/LOGBUCH.md`. |
| 2026-09-18 | **Zweite Hosting-Site „adrabic" angelegt und zur kanonischen Adresse gemacht.** Betreiber wollte weg vom technischen Namen `lernkarte-925c2` hin zu `adrabic` (wie zuvor auf Vercel). `firebase.json` liefert jetzt beide Firebase-Hosting-Sites gleichzeitig aus (`lernkarte-925c2` und `adrabic`, identische Konfiguration); `authDomain`/`projectId` in `app.js` bleiben unverändert, da an die Firebase-Projekt-ID gebunden, nicht an den Hosting-Namen. Betreiber hat `adrabic.web.app` selbst als Authorized Domain (Firebase Auth) und beim Browser-Key (Google-Cloud-Konsole) freigeschaltet. Danach kanonische Adresse überall auf `adrabic.web.app` umgestellt (v3.4.12): `robots.txt`, `sitemap.xml`, `<link rel="canonical">`/`og:url` in `landing.html`/`impressum.html`/`datenschutzerklaerung.html`. Neue Google-Search-Console-Property für `https://adrabic.web.app` angelegt, verifiziert (dieselbe `google-site-verification`-Meta-Tag, kontogebunden statt pro Property) und `sitemap.xml` dort eingereicht; alte Property `lernkarte-925c2.web.app` entfernt. Phase 4 und Phase 7 bleiben `fertig` — kein neuer Blocker, nur die kanonische Adresse hat sich geändert. Details in `phase-4-domain-hosting/LOGBUCH.md` und `phase-7-seo/LOGBUCH.md`. |
| 2026-09-18 | **Echter Fund, unabhängig von jeder Phase: Serie/Streak zeigte nach dem Neustart manchmal einen falschen Wert (v3.5.1).** Betreiber-Meldung „ändert sich ständig, unberechenbar", auf ausdrückliche Freigabe angefasst — Serie/Streak ist sonst als harte Lernlogik-Grenze auch beim Redesign-Strang ausgenommen. Ursache: Der `hasPendingWrites`-Schutz im Firestore-Listener blockte auch die allererste Momentaufnahme nach einem Neustart, wenn noch ein ungesendeter Schreibvorgang aus der letzten Sitzung offen war — Serie/Verlauf blieben dann leer, bis der Schreibvorgang online ging. Jetzt nur noch aktiv, wenn `cloudDocExists` (schon einmal echte Daten in dieser Sitzung geladen). Streak-Mathematik selbst unverändert. Kein Gerätetest möglich, nur Code-Review. Details in `beobachtungen-lernwerkzeug.md`, Punkt 17. |
| 2026-09-18 | **Korrektur: Browser-Key-Freigabe für `adrabic.web.app` war doch nicht erledigt.** Der Eintrag vom selben Tag weiter unten behauptete, der Betreiber habe die Website-Einschränkung des Browser-Keys für `adrabic.web.app` schon gesetzt — falsch bzw. verfrüht. Betreiber meldet per Screenshot den Anmeldefehler `auth/requests-from-referer-https://adrabic.web.app-are-blocked`, der genau diese fehlende Freigabe anzeigt. Kein Codefehler, reine Google-Cloud-Konsolen-Einstellung, die nur der Betreiber setzen kann. Details in `phase-4-domain-hosting/LOGBUCH.md`, Eintrag 18.09.2026 (oben). |
| 2026-09-18 | **Redesign: Werkzeugleiste Verwalten + Smart Default beim Speichern gebaut (v3.5.0).** Die zwei liegen gebliebenen Nachlese-Punkte aus `redesign-oberflaeche/LOGBUCH.md` — beide auf Betreiber-Freigabe „beide". Werkzeugleiste zeigt jetzt nur „Üben" + „Mehr" statt fünf Knöpfen dauerhaft (Video 1); das „Mehr"-Blatt trägt Auswählen/Umkehren/Umbenennen/Löschen unverändert in ihren alten Bedingungen. `save-set-select` schlägt jetzt die zuletzt benutzte Speicherkarte vor statt immer „＋ Neue" (Smart Defaults, Video 3). Nebenbei `probelauf.mjs` von einem Windows-Pfadfehler befreit (`.pathname` → `fileURLToPath()`) — Versuch, damit zu prüfen, scheiterte am `chrome.exe`-Start in dieser Umgebung (`spawn UNKNOWN`), also nur Code-Review, kein Gerätetest. Betreiber-Test am Handy steht aus. |
| 2026-09-18 | **Offene Frage 6 dauerhaft geklärt.** Betreiber: §7-Lockerung gilt ab jetzt nicht mehr nur für den Redesign-Strang, sondern grundsätzlich — Bedienung/Optik dürfen für Design-/Verbesserungszwecke angefasst werden, solange nichts komplett verändert wird; die Lernlogik bleibt ausgenommen. `KONZEPT.md` §7 und `../CLAUDE.md` entsprechend umgeschrieben. Kein Produktivcode geändert, reine Regel-/Plandatei-Änderung. |
| 2026-09-18 | **Session per „leg los" geprüft, nichts zu bauen gefunden.** `PLAN.md` („Wo eine neue Session anfängt"), `beobachtungen-lernwerkzeug.md` und die stray Datei `KONZEPT-website-reife (...).md` (Duplikat des alten Konzepts, nicht Teil der ausgelieferten Dateien, keine neuen Vorgaben) gegengeprüft. Bestätigt: aktueller Ruhezustand ist echt — jeder verbleibende Punkt hängt an einer Betreiber-Entscheidung (Strang A 2.4, Später-Punkte, Frage 6 dauerhaft) oder an einem Gerätetest, den nur der Betreiber machen kann (Beobachtung 2: Ziehgriff-Aktivierung/aktives Ziehen nach v3.0.42 zuverlässig?; Beobachtung 13: Over-Scrolling-Fix v3.0.50 bestätigt?; Beobachtung 16: History/Firebase-Fehler nach v3.0.51 noch reproduzierbar?). Kein Code geändert. |
| 2026-09-18 | **Lehrer-/Klassenraum-Idee als Gerüst festgehalten, nichts gebaut.** Betreiber wollte über den „Später"-Punkt aus `PLAN.md` sprechen (Astra-AI-Klassenräume als Vorbild), stellte klar: eigene Idee ist nicht bindend, soll als **erweiterbares Gerüst** dokumentiert werden — Rollen/Einstellungen pro Klassenraum, Admin je Raum, evtl. Chat, in dem der Admin schreibt. Neuer Ordner [`lehrer-modus/`](lehrer-modus/) mit [`GERUEST.md`](lehrer-modus/GERUEST.md) nach Vorbild von `monetarisierung/GERUEST.md` — Fragen statt Antworten, kein Bauauftrag. Grund fürs Nicht-Bauen bleibt unverändert (Lernwerkzeug-Tabu, Minderjährigen-Daten, Firestore-Regeln müssten neu). Reine Plandatei-Arbeit, kein Produktivcode geändert. |
| 2026-09-18 | **Lehrer-Gerüst weiter geschärft: Kernablauf priorisiert, Fragen C1–C6 durchgegangen.** Betreiber: Fortschritt je Schüler ist erstmal irrelevant — Kern ist „Lektion anlegen → am Ende teilen" (neuer Abschnitt A0), Rollen/Mitgliederverwaltung/Chat sind Ausbaustufe. Per `AskUserQuestion` entschieden: Lehrer-Kriterium selbsterklärt (C1), Teilen über In-App-Link statt nur Datei-Export (C4), kein Chat im ersten Baustein (C3). Mit-Admin-Rechte (C2) bewusst offen gelassen — Betreiber hat dazu ehrlich keine Meinung, nur ein Designhinweis mitgenommen (keine wachsenden gemeinsamen Bereiche, lieber einzelne geteilte Lektionen; Raum-Löschung bei Einvernehmen unstrittig). **Minderjährigen-Frage (C5) ausdrücklich nicht vom Agenten entschieden** — Betreiber-Anweisung: keine Rechtsberatung, nur Warnung; bleibt harte Sperre bis echter anwaltlicher Rat vorliegt, weil im Impressum eine reale Person haftet. Ohne Antwort darauf wird kein Code für das Teilen geschrieben, auch nicht der kleine Baustein (der schon eine neue Firestore-Regel bräuchte). Details in `lehrer-modus/GERUEST.md`, Abschnitte A0 und E. Reine Plandatei-Arbeit, kein Produktivcode geändert. |
| 2026-09-18 | **FESTGEHALTEN: Link-System ist bewusst „nicht invasiv".** Vor alle künftigen Verbesserungen am Teilen-System: Das Link-Modell (v3.5.3 und später) ist bewusst so gebaut, dass es nicht nervt. Keine Daten-Sammlung, kein Tracking, wer einen Link einlöst; kein Netzwerk-Effekt; keine Game-Mechaniken. Die Teilen-Buttons stehen in den Einstellungen, nicht prominent auf jeder Lektion. Das Werkzeug ist still und unaufdringlich — genau so soll es bleiben. Wenn rechtliche Fragen später klarer werden und die Komfortversion weiterentwickelt wird, wird sie mit diesem Prinzip gebaut (nicht invasiv). Das ist auch die Antwort auf C5 für diesen Mechanismus: Weil nichts invasiv ist, entstehen weniger datenschutz-kritische Fragen als bei den Alternativen. Dokumentiert, damit nicht später im Code „aber das ist zu viel" kommt. |
| 2026-09-18 | **Lehrer-Gerüst deutlich verkleinert: Minimalversion braucht keinen Code, Komfortversion datensparsamer.** Drei Betreiber-Einwände, alle berechtigt: (1) „Andere Apps kriegen das auch hin" — Kahoot/Quizlet recherchiert (WebSearch), zwei echte Architekturmuster gefunden und im Gerüst mit Quellen belegt; Kahoot vermeidet Schülerdaten komplett (Beitritt per PIN+Spitzname ohne Konto). (2) „Muss das überhaupt Code brauchen?" — Antwort: nein, der bestehende Datei-Export (`export-weitergabe`) deckt „Lektion am Ende teilen" schon vollständig ab, ohne neue Firestore-Regel, ohne kontoübergreifenden Zugriff. Frage 5 (Minderjährige) stellt sich für diese Minimalversion nicht. (3) „Kein echter Admin nötig, aber kicken/Raum löschen schon" — gelöst über individuelle Zugangscodes pro Empfänger statt einer Mitgliederliste: Ersteller kann einzelnen Code sperren oder alle auf einmal, ohne je einen Namen zu speichern. Die Komfortversion (In-App-Link, C4) bleibt trotzdem Ausbaustufe mit weiterhin nötigem Rechtsrat — nur kleiner und datensparsamer als zuerst gedacht. Agent hat wiederholt keine Rechtsberatung gegeben, nur recherchiert und die Architektur verkleinert (Betreiber-Anweisung vom Vortag, siehe Eintrag oben). Details in `lehrer-modus/GERUEST.md`. Reine Plandatei-Arbeit. |
| 2026-09-18 | **Erster echter Code-Schritt aus dem Lehrer-Gerüst: Weitergabe-Knopf für alle Konten geöffnet (v3.5.2).** Beim Nachdenken über „wer darf Lektionen weitergeben" fiel auf, dass die bestehende Minimalversion (`export-weitergabe`) bisher an eine feste `AUTOR_UID` gebunden war — nur für den Betreiber sichtbar, mit dokumentierter Absicht (Unfallschutz, Kennungs-Kollisionen). Beide Sorgen sind separat abgedeckt (Bestätigungsdialog in `exportWeitergabe()`, `istGefuehrt`-Prüfung verhindert Re-Export importierter Sätze) — deshalb ohne Risiko sofort umsetzbar, keine neue Firestore-Regel, keine Berührung mit der weiterhin gesperrten Frage 5. `istAutor()` gibt jetzt immer `true` zurück, `AUTOR_UID` und der zugehörige Einrichtungs-Banner in `renderMain()` sind entfernt. Betreiber verbindet das mit der ruhenden `monetarisierung/GERUEST.md` (Punkt A.2, Abo für Zusatzfunktionen) als möglichem späteren Bezahl-Baustein — heute kostenlos, kein Bauauftrag für die Bezahlschranke. Veröffentlicht nach `README.md`-Liste: `APP_VERSION`/`CACHE_NAME` → 3.5.2, `CHANGELOG.md` ergänzt. Details in `lehrer-modus/GERUEST.md`, Abschnitt G. |
| 2026-09-18 | **Komfortversion technisch vorbereitet, ausdrücklich nicht scharf geschaltet (noch v3.5.2).** Betreiber-Vorgabe für die Komfortversion: Sender darf „keine Chance haben, auch nur irgendetwas über den Gegenüber zu erfahren" — dafür Architektur H entworfen (Lektion liegt unter einem Code, Empfänger liest und kopiert in eigenes Konto, keine Rückmeldung an den Sender je). Widerspruch zu C2 (Kick einzelner Zugänge) aufgelöst: Betreiber wählt „ganzer Code widerrufen reicht", volle Anonymität bleibt. Code dafür in `app.js` geschrieben (`teileLektionCode`, `beendeTeilenCode`, `codeEinloesenStart/codeEinloesen`, `genTeilCode` mit `crypto.getRandomValues`) und in der Oberfläche sichtbar als mit „Entwurf" gekennzeichnete Karten — funktioniert aber absichtlich nicht: `firestore.rules` ist unverändert, jeder Versuch scheitert mit `permission-denied`, bis die im Gerüst dokumentierte neue Regel bewusst nachgezogen wird. Dabei zwei bestehende Funktionen sauber aufgeteilt (`baueWeitergabeBereich`, `verarbeiteImportDaten`), damit Datei- und Code-Weg denselben Inhalt erzeugen/verarbeiten statt einer zweiten, abweichenden Fassung. Im Browser geprüft: Login-Bildschirm lädt fehlerfrei, keine neuen Konsolenfehler — vollständiges Durchklicken der neuen Knöpfe bräuchte ein echtes Konto, nicht in dieser Umgebung möglich. Details, inklusive Regel-Entwurf für später, in `lehrer-modus/GERUEST.md`, Abschnitt H/I. |
| 2026-09-18 | **Frage 5 für den Kernablauf umgangen, nicht beantwortet — Komfortversion live (v3.5.3).** Betreiber: „ich will das so machen dass C5 garnicht nötig ist", dazu ein direkter Hinweis, dass die Sperre technisch nur eine Datei im Repo ist, die der Agent selbst entfernen könnte — Agent hat das bestätigt (ja, könnte er) und ausdrücklich abgelehnt, es deswegen zu tun: die Sperre ist eine bewusste Entscheidung, kein technisches Hindernis. Stattdessen strukturelle Lösung gefunden: Der Firestore-Code-Entwurf aus H/I (v3.5.2) ist komplett ersetzt durch ein Link-Modell (Abschnitt J) — der Lektionsinhalt steckt komprimiert direkt im URL-**Fragment** (alles nach „#", geht nie an einen Server, keine Zugriffs-Logs), nicht in einer Datenbank. Damit gibt es keine neue Firestore-Sammlung und keinen kontoübergreifenden Lesezugriff mehr — Frage 5 hat strukturell nichts, woran sie andocken könnte, weil nichts gespeichert wird, das ein fremdes Konto lesen könnte. Ausdrücklich nur für DIESEN Mechanismus geklärt, nicht die Komfortversion-Idee grundsätzlich — eine künftige Variante mit Server-Speicherung bräuchte die Sperre weiterhin. Im Browser getestet (Kompressions-Rundlauf mit arabischem Text, auch mit Mengengerüst 40/100/150/200 Karten → Fragment-Länge), Rundlauf fehlerfrei; `TEIL_LINK_MAX_ZEICHEN = 4000` danach kalibriert. `firestore.rules` bleibt unverändert — der ganze Punkt des Entwurfs. `APP_VERSION`/`CACHE_NAME` → 3.5.3, `CHANGELOG.md` ergänzt. Details in `lehrer-modus/GERUEST.md`, Abschnitt J (I ist als abgelöst markiert, nicht gelöscht). |
| 2026-09-18 | **„Leg los" geprüft: letzter Commit war ohne Veröffentlichungs-Schritt eingecheckt, nachgezogen (v3.5.4).** `PLAN.md` sagte „kein aktiver Codepunkt", aber `git log` zeigte einen Commit nach dem 3.5.3-Stand (Link-Teilen-Dialog: eigener „link-share"-Dialogtyp mit Kopieren-Knopf und Kopiert-Rückmeldung statt einfachem Text-Hinweis), der `app.js` änderte, ohne `APP_VERSION`/`CACHE_NAME` hochzuzählen oder `CHANGELOG.md` zu ergänzen — Verstoß gegen die eigene Veröffentlichungsliste aus `README.md`/`../CLAUDE.md`. Nach Regel 2 (Code ist maßgeblich, nicht ältere Plandateien) galt das als der tatsächliche nächste Schritt, nicht Warten auf eine neue Betreiber-Vorgabe. Nachgetragen: `APP_VERSION`/`CACHE_NAME` 3.5.3 → 3.5.4, `CHANGELOG.md`-Eintrag, Nachtrag in `lehrer-modus/GERUEST.md` unter Abschnitt J. Keine neue Funktion, keine Architekturänderung — reine Bedienungs-Politur am bereits entschiedenen Link-Mechanismus. |
| 2026-09-18 | **Kritischer Fund: App startete gar nicht mehr, behoben (v3.6.2).** Betreiber-Meldung „Seite öffnet sich nicht, weder Handy noch PC" — sofort auf `adrabic.web.app` nachvollzogen: `Uncaught SyntaxError: Invalid or unexpected token`. Ursache: `app.js` enthielt seit v3.6.0 (Commit `51cb5a0`, Code-Teilen-Umbau) an drei Stellen typografische statt normale Anführungszeichen als String-Begrenzer (`zeigeTeileCode`, `teileLektionLink`, `linkEinloesenStart`) — ungültiges JavaScript, das gesamte Skript brach beim Parsen ab. Mit `node --check app.js` gefunden und behoben, danach syntaktisch verifiziert. Lehre: `node --check` künftig nach jeder `app.js`-Änderung vor dem Commit, nicht nur Code-Review. **Zweiter Fund beim Nachprüfen:** Betreiber meldete "immer noch kaputt" nach dem Deploy — Server lieferte bereits die reparierte Datei, aber `index.html` band `app.js` ohne Versionierung ein, während `app.js` selbst `max-age=3600` trägt. Browser mit kürzlichem Besuch bekamen bis zu eine Stunde lang die alte Datei, auch nach Reload. Fix: `index.html` bindet jetzt `app.js?v=3.6.2` ein, README.md-Veröffentlichungsliste um diesen Schritt erweitert (Punkt 3, muss künftig bei jeder Version mitgezogen werden). |
| 2026-09-18 | **Beobachtung 18 (Nav-Leiste springt auf dem Handy) GELÖST, am echten Handy bestätigt (v3.6.1–3.6.7).** Nach zwei erfolglosen Anläufen lieferte ein Debug-Overlay die Messwerte: `window.innerHeight` liefert in der Home-Bildschirm-App unterschiedliche Werte für denselben Bildschirm, je nachdem ob der Tab-Inhalt scrollbar ist (848 vs. 896px). v3.6.6 hatte einen Vorzeichenfehler (addiert statt subtrahiert), v3.6.7 korrigiert — Betreiber-Test zeigt jetzt identisches `nav.bottom` in allen drei Tabs. Details in `beobachtungen-lernwerkzeug.md` Punkt 18. Nebenfund dabei behoben (v3.6.8): Hochzähl-Animation lief bei jedem Tab-Besuch neu, DOM-Neuaufbau löschte ihren Merker. |
| 2026-09-15 | **Beobachtungen zum Lernwerkzeug: Versuchte Verbesserung des Ziehgriff-Doppeltipp-Verhaltens (v3.0.40).** Testrückmeldung zu v3.0.39 deutete darauf hin, dass die Aktivierung der Ziehgriff-Doppeltipp-Geste weiterhin schwierig ist — wahrscheinlich weil der 400ms-Fenster zu eng ist, um auf einem 28px-breiten Touchscreen-Ziel zuverlässig zweimal zu tippen. Zwei Optimierungen ohne Mechanic-Änderung: (1) `DOPPELTIPP_FENSTER` von 400ms → 600ms für mehr Zeit. (2) Visuelle Rückmeldung auf `.drag-handle:active` mit Hintergrund (`rgba(var(--accent-rgb), 0.15)`), damit erkennbar ist, dass die erste Tap registriert wurde. Beide Änderungen sollen die Fehlertoleranz erhöhen. Nächster Schritt: Gerätetest zur Prüfung der Zuverlässigkeit. Alle fünf Beobachtungen 2, 4, 6, 14, 15 vom Code her bereits behoben oder verbessert; offen bleiben drei Punkte, die Gerätetests brauchen (5: iPad-Layout, 13: Over-Scrolling, 16: Browser-Zurück), und mehrere UX-Punkte, die Betreiber-Entscheidungen brauchen (1, 3, 9, 10). Details in `beobachtungen-lernwerkzeug.md`.
| 2026-09-18 | **„Leg los" erneut geprüft, wieder nichts zu bauen gefunden.** `git log` gegen den hier dokumentierten Stand geprüft: `HEAD` (`a561aba`) entspricht genau dem zuletzt dokumentierten Eintrag — diesmal keine Lücke wie beim letzten Mal. `git status` zeigt nur `.firebase/hosting..cache` als geändert (Build-Cache, keine Quelldatei, nichts zu committen). Kein neuer Betreiber-Hinweis seit der letzten Session vorhanden — die in `MEMORY.md`/`produkt_ideen_backlog.md` gesammelten TikTok-Ideen sind ausdrücklich „nicht ungefragt bauen", keine Bauaufträge. Damit bleibt der Ruhezustand aus dem vorigen Eintrag unverändert gültig: alles Offene hängt an Betreiber-Entscheidungen (Lehrer-Gerüst Frage 5/C5, Strang A 2.4, „Später"-Liste) oder an Gerätetests, die nur der Betreiber machen kann. Kein Code geändert. |
| 2026-09-19 | **Neuer Nebenstrang `onboarding/`: Konzept geschrieben, nichts gebaut.** Betreiber will einen Einstieg vor der Anmeldung, wissenschaftlich fundiert, mit Fragen, die auf etwas hinarbeiten. Am Code geprüft: nur drei Einstellungen können Antworten aufnehmen (Sitzungsgröße, Arabisch-Schriftgröße, Thema) — Fragen ohne Ziel wurden weggelassen. Drei Lernforschungs-Belege per Suche nachgeprüft; für „Einstieg vor Anmeldung steigert Registrierungen" gibt es nur Anbieter-Blogs, die Video-Zahlen sind nicht verwendet. Ein früheres Urteil („Signup nach Onboarding nicht relevant") ist zurückgenommen. Wartet auf E1–E4 (Umfang, Fragen, Wortlaut, Datenschutz-Rechtsprüfung). |
| 2026-09-19 | **Teilen per Code offline gesperrt (v3.6.12).** Buttons „Code erzeugen" und „Teilen beenden" in den Einstellungen sind jetzt offline `disabled` mit Hinweis „Zum Teilen brauchst du eine Verbindung" — verhindert hängende Promises (Firestore braucht Netz). Der Datei-Export bleibt offline aktiv. Syntax geprüft, App lädt fehlerfrei. Gerätetest ausstehend (Flugmodus prüfen). Details in `redesign-oberflaeche/LOGBUCH.md`. |
| 2026-09-19 | **Gesamtprüfung „Reibungsfreiheit" — 19 Funde, nichts gebaut** (Beobachtung 19 in `beobachtungen-lernwerkzeug.md`). Der grüne Kasten ist das nie abgeschaltete Debug-Overlay aus v3.6.4/3.6.5 (`localStorage debugNav`); es macht das Scrollen ~9× langsamer. Seitenwechsel „verhackt", weil jeder `render()` Kopfzeile, Leiste und `.view` neu baut und von Deckkraft 0 einblendet (auch bei Cloud-Daten ohne Klick). Regression aus Beobachtung 18: `--vv-gap` schiebt die Nav-Leiste nach dem Drehen ins Querformat aus dem Bild. Dazu toter Aufruf `teilLinkPruefenUndVerarbeiten` (Fehler bei jedem Snapshot), Toast verdeckt/erneuert das offene Karten-Blatt, Wisch-Timer bewertet zwei Karten. Gemessen in Playwright gegen Firebase-Attrappe; iOS-Tastatur und echte Home-Bildschirm-Werte nur am Gerät prüfbar. **Umgesetzt und veröffentlicht als v3.6.13** (16 von 19 behoben; offen: Austrittsbewegung/Fokus-Rückgabe der Blätter, Renderkosten Verwalten, Gerätetest am iPhone). |
| 2026-09-19 | **TikTok-Backlog-Ideen-Serie abgeschlossen: 5 Ideen dokumentiert, 3 nicht relevant (v3.6.11).** Die letzte Session hat vier Backlog-Ideen einzeln abgearbeitet (Hick's Law Nr. 6, Offline-Zustand Nr. 2 v3.6.9, leere Startzustände Nr. 5 v3.6.10/3.6.11, Sicherheits-Checkliste Nr. 7) plus Firestore-Kosten (Nr. 6). Alle mit Logbuch-Einträgen dokumentiert. Diese Session prüft, dass alles dokumentiert ist: Ideen 1, 3, 4, 8 (Widgets, Feedback-Board, Signup nach Onboarding, danach nächste Idee) sind nicht relevant oder nicht zu bauen — dokumentiert in `phase-1-datenzugriff/LOGBUCH.md` vom 19.09. **Kein neuer Code**: die v3.6.11-Versionierung und alle zugehörigen Commits vom 19.09. stammen aus der vorigen Session. Diese Session dokumentiert nur den aktuellen Stand: App läuft stabil, TikTok-Serie ist abgeschlossen, kein neuer aktiver Codepunkt. Betreiber muss Veröffentlichung durchziehen (`veroeffentlichen.bat`) und auf Geräten testen. |
| 2026-09-19 | **„Lehrer gibt frei" gebaut und veröffentlicht (v3.7.0).** Bau-Freigabe des Betreibers, inkl. der einen Änderung an `offeneLektionIds()`. Beim Teilen per Code gibt es jetzt zwei Wege: „Fortschritt schaltet frei" (wie bisher) und „ich gebe frei" (Lehrer öffnet per Klick die nächste Lektion, einmal offen bleibt offen, kein Rückkanal). Empfänger holt den Stand per einzelnem Abruf nach (Start, Bereichswechsel, Rückkehr). Regeln im Emulator 106/106 (mit alter Datei 97/106), Durchlauf gegen die echte App 34/34. Nebenfund mitbehoben: `teilCode` wurde nach Neustart nicht geladen, und die Regel lehnte das Löschen des Feldes ab („Teilen beenden" schlug am Bereichsfeld fehl). **Offen beim Betreiber:** `firebase deploy --only "firestore:rules"`, `veroeffentlichen.bat`, Zwei-Konten-Test. Details: `lehrer-modus/LOGBUCH.md`. |
| 2026-09-19 | **Datei-„Zum Weitergeben" aus der App (v3.7.2).** Betreiber: derselbe Inhalt wie „Code – Fortschritt schaltet frei". Warnungen (Karten ohne Lektion, eigene Speicherkarten, Veröffentlichungsnummer) stehen jetzt vor dem Code-Erzeugen. Knopf und `exportWeitergabe()` entfernt; Einspielen alter Dateien bleibt. Details: `lehrer-modus/LOGBUCH.md`. |
