# Aufgaben – die ganze Liste

Stand 25.09.2026, aus 133 Funden in [`befunde/`](befunde/) (8 Bereiche). Doppelte
Funde sind zusammengelegt: Mehrere Prüfer haben dasselbe unabhängig
gefunden, das spricht für den Fund. **Die Abnahme jeder Aufgabe steht im
Befund** (Zeile „Abnahme"). Der Dirigent prüft sie selbst (`AUFTRAG.md` § 3).

**Spalten:** *Entscheidet* A = Agent darf bauen · B = wartet auf Betreiber
(siehe `ENTSCHEIDUNGEN.md`) · K = Konsole (siehe `KONSOLE.md`).
*Modell*: H = Haiku · S = Sonnet · O = Opus (Dirigent selbst).
*Status*: `offen` · `läuft` · `erledigt (vX)` · `zurück: Grund` ·
`trifft nicht zu: Grund` · `wartet: E-…`.

**Pakete:** Aufgaben mit derselben Paket-Nummer berühren dieselbe Stelle und
werden in derselben Runde gemacht (eine Version, ein Test-Durchgang).

---

## A. Kritisch und hoch

| ID | Titel | Quelle | Schw. | Ent. | Mod. | Paket | Status |
|---|---|---|---|---|---|---|---|
| G-001 | Prüfskript `pruefe_stand.mjs` (Version, CHANGELOG, CSP-Hashes, APP_SHELL, csp-build) | TECHNIK-2 | hoch | A | S | – | erledigt (Plan, 25.09.) |
| G-002 | Rechtsseiten ignorieren helles Thema: CSP blockiert Kopfskript → Skript byte-gleich zu `index.html` machen (`#0e0e12`→`#111010`) | TECHNIK-1 | hoch | A | H | P1 | erledigt (3.17.30) |
| G-003 | „not-found" beim Speichern schreibt alle Bereiche ohne merge neu: Teilen/Lehrer/geführt weg, Gelöschtes kommt zurück | DATEN-1, REGELN-1 | **kritisch** | A | O | P2 | erledigt (3.17.30) |
| G-004 | Kartensatz-Update ersetzt über das Wort, auch bei anderer `quelleId` (عين Auge/Quelle) | DATEN-2 | hoch | A | S | P3 | erledigt (3.17.32) |
| G-005 | Jede Sortierbewegung schreibt `order` aller Karten (Kontingent) | DATEN-3 | hoch | A | S | P4 | erledigt (3.17.32) |
| G-006 | Geteilte Sätze verwaisen und überleben „Konto löschen" (Regel `list` nach Besitzer + Löschen über Besitzer + Reihenfolge) | REGELN-3 | hoch | A | O | P2 | erledigt (3.17.30) |
| G-007 | Serie bleibt bei 121 Tagen stehen (Protokoll 120 Tage, Sockel wird nicht nachgezogen) | LERNEN-1 | hoch | A¹ | O | P5 | erledigt (3.17.32; die Fassung aus 3.17.31 war falsch und ist zurückgenommen) |
| G-008 | Prüfskript in den Veröffentlichen-Knopf und die `.bat` einbauen (bricht vor dem Deploy ab) | TECHNIK-2, -14 | hoch | A | H | P1 | erledigt (3.17.30) |
¹ G-007: Der Prüfer hat „Betreiber" vorgeschlagen, weil `serieAktuell` Lernlogik ist. **Urteil des Dirigenten:** Die Regel der Serie (was zählt, wie viel verziehen wird) ändert sich nicht. Die Zahl hört nur durch einen Speicherfehler auf zu wachsen, nichts in der App verspricht eine Obergrenze. Das ist ein Fehler wie 3.17.28 (Sockel-Tag), und Fehler werden sofort behoben (`CLAUDE.md` Grundsatz 1). Mit Testfällen vorab, eigener Commit.

## B. Mittel

| ID | Titel | Quelle | Ent. | Mod. | Paket | Status |
|---|---|---|---|---|---|---|
| G-010 | Firebase-Sprache nicht gesetzt → englische Mails/Seiten: `auth.languageCode = "de"` | KONTO-1 | A | H | P6 | erledigt (3.17.30) |
| G-011 | Konto löschen: offline sperren, Zeitlimit für die Löschschritte | KONTO-2 | A | S | P7 | erledigt (3.17.38) |
| G-012 | „Passwort vergessen": vorsichtiger Erfolgstext (Enumeration) | KONTO-3 | A | H | P6 | erledigt (3.17.30) |
| G-013 | Fehlende Auth-Fehlercodes in Worten + Leerfeld-Prüfung bei „Link zusenden" | KONTO-4 | A | S | P6 | teilweise (3.17.30): Texte erledigt, Leerfeld-Prüfung offen |
| G-014 | Stimmen im Board ohne eigene Stimme ±1 manipulierbar → Regel mit `existsAfter` | REGELN-2 | A | O | P8 | erledigt (3.17.30) |
| G-015 | Moderation löscht Idee → Stimm-Merker mit Kennung bleiben: Status „entfernt" statt Löschen | REGELN-4 | A | S | P8 | offen |
| G-016 | Mengenbremse: Board nur `limit(100)`, Text nicht leer, geteilter Satz mit Größen-/Formprüfung | REGELN-5 (Regelteil) | A | O | P8 | erledigt (3.17.38): Regel (list nur limit ≤ 100, Text nicht leer, Form des geteilten Bereichs) + App (`limit(100)`, seitenweises Löschen der Merker); keine Kartenzahl-Grenze (1 MiB begrenzt ohnehin). **Regel-Deploy erst nach 3.17.38 live (K10)** |
| G-017 | Code erzeugen: Code steht am Bereich, bevor er gespeichert ist; keine 1-MiB-Prüfung; kein Zeitlimit | REGELN-7, LERNEN-7, DATEN-7 | A | S | P2 | erledigt (3.17.30) |
| G-018 | „Teilen beenden"/Bereich löschen scheitert still, Code bleibt lesbar → erst Cloud löschen, dann lokal | DATEN-6 | A | S | P2 | erledigt (3.17.30) |
| G-019 | Fremde Sätze können über `quelleId: null` doch Bilder vom Absender-Server laden | DATEN-4 | A | S | P3 | erledigt (3.17.30) |
| G-020 | Bilder in der Kartenliste sprengen die Zeile, laden alle mit Referer, `http://` bricht | DATEN-5 | A | S | P4 | erledigt (3.17.32) |
| G-021 | Suche ab ~1400 Karten langsam (Zwischenspeicher zu klein) | DATEN-9 | A | S | P4 | erledigt (3.17.33) |
| G-022 | Großer Import in Stapeln nacheinander – Abbruch hinterlässt halben Bereich | DATEN-10 | A | O | P3 | offen |
| G-023 | Ring und „Heute schon N Antworten" zählen fremde Bereiche mit | REST-1 | A | S | P9 | erledigt (3.17.34) |
| G-024 | Kalender ohne Wochen-Struktur (19 Spalten statt 7 Zeilen) | REST-2 | A | S | P9 | erledigt (3.17.34) |
| G-025 | Lektionen-Seite zeigt Schlösser in eigenen Bereichen | REST-3 | A | H | P9 | erledigt (3.17.34) |
| G-026 | „0 Antworten diese Woche ↓ 100 %" nach Pause; „diese Woche" sind 7 rollende Tage | REST-4 | A | S | P9 | erledigt (3.17.34) |
| G-027 | Kalender-Erinnerung: jede Neueinrichtung legt einen zweiten Termin an; „aus" fehlt | REST-5 | A | S | P10 | offen |
| G-028 | Offene App erfährt nie von neuer Version | TECHNIK-3 | B | S | – | wartet: E-06 |
| G-029 | Versionierte Dateien trotzdem „Netz zuerst" – langsamer Start bei schlechtem Netz | TECHNIK-4 | A | S | P11 | erledigt (3.17.36) |
| G-030 | Firebase-Bausteine laden nacheinander statt gleichzeitig | TECHNIK-5 | A | S | P11 | erledigt (3.17.36) |
| G-031 | Helles Thema Desktop/iPad quer: Navigation 4,31:1 < 4,5; `t_kontrast.js` nur Handy | TECHNIK-6 | A | H+S | P12 | erledigt (3.17.35) |
| G-032 | „Fehler melden": Tab verlässt den Dialog, Fokus kehrt nicht zurück | TECHNIK-7 | A | S | P12 | erledigt (3.17.35) |
| G-033 | Kurzmeldungen erreichen Bildschirmleser vermutlich nicht (Live-Region neu mit Text) | TECHNIK-8 | A | S | P12 | erledigt (3.17.35) |
| G-034 | Veröffentlichen lädt `*.zip` mit hoch; `.bat` deployt ungeprüften Arbeitsordner | TECHNIK-9 | A | H | P1 | erledigt (3.17.30) |
| G-035 | „Gesehen" + Rückgängig zählt den Tag für die Serie | LERNEN-3 | A | S | P5 | erledigt (3.17.32) |
| G-036 | Keine Warnung an dem Tag, an dem Aussetzen die halbe Serie kostet (Hinweis an die geltende Regel angleichen) | LERNEN-5 (a) | A | S | P5 | erledigt (3.17.33) |
| G-037 | Große Bestände: jede Bewertung 200–700 ms Rechenzeit (3000–6000 Karten) | LERNEN-6 | A | O | P13 | offen |
| G-038 | „Kostenlos." steht noch unter „Plan speichern" | EINSTIEG-2 | A | H | P14 | erledigt (3.17.30) |
| G-039 | Probekarte springt beim Antippen 40 px | EINSTIEG-3 | A | S | P14 | offen |
| G-040 | Probekarte übt eine andere Bedienung als die Runde; Einladen-Puls läuft noch | EINSTIEG-4 | A | S | P14 | offen |
| G-041 | „Nichts davon" auf 360 px hinter dem Weiter-Knopf | EINSTIEG-5 | A | S | P14 | offen |
| G-042 | Einstiegs-Antworten/Nachklang bleiben nach Anmeldung mit Bestandskonto oder Abbruch liegen | EINSTIEG-7 | A | S | P14 | offen |
| G-043 | „Bewegung reduzieren": Verzögerungen außerhalb des Einstiegs bleiben (Rundenende-Knöpfe 1,3 s unsichtbar) | EINSTIEG-8 | A | H | P12 | erledigt (3.17.30) |
| G-044 | Zeitpunkt steht auf dem Plan zweimal | EINSTIEG-6 | A | H | P14 | offen |

## C. Niedrig

| ID | Titel | Quelle | Ent. | Mod. | Paket | Status |
|---|---|---|---|---|---|---|
| G-050 | Registrieren mit Zeitlimit-Abbruch: keine Mail, kein Name → einmal nachholen | KONTO-11 | A | S | P6 | erledigt (3.17.38) |
| G-051 | Vor dem Löschen immer neu anmelden (nicht von der Geräte-Uhr abhängig) | KONTO-12 | A | S | P7 | erledigt (3.17.38) |
| G-052 | Fehlertexte mit Ausweg (Google-Konto? Passwort vergessen?) | KONTO-13 | A | H | P6 | erledigt (3.17.30) |
| G-053 | Enter im E-Mail-Feld; `<form>` für Passwortmanager | KONTO-14 | A | S | P6 | erledigt (3.17.38) |
| G-054 | Unbestätigtes Konto mit vertippter Adresse: „Adresse falsch? Neu anfangen" | KONTO-15 | A | S | P7 | erledigt (3.17.38) |
| G-055 | Regeltest um E01–E20/P1–P6 erweitern, Kopfzahl, Linux-Anleitung | REGELN-8 | A | S | P8 | erledigt (3.17.30) |
| G-056 | `normCard` deckelt `stufe` nicht nach oben → Import-Stapel scheitert | REGELN-9 | A | H | P3 | erledigt (3.17.30) |
| G-057 | Ideen mit erfundenem Datum/leerem Titel (Regel + `serverTimestamp`) | REGELN-10 | A | S | P8 | offen |
| G-058 | Abstimmen scheitert ohne ein Wort → Toast | REGELN-12 | A | H | P8 | offen |
| G-059 | COOP-Header `same-origin-allow-popups` | REGELN-13 | A | S | – | zurückgestellt: nur mit der nächsten Header-Änderung **und** Google-Gerätetest |
| G-060 | Leere Lektionen-Seite nach Bereichswechsel | REST-6 | A | H | P9 | erledigt (3.17.34) |
| G-061 | Meilenstein nennt die Marke statt der echten Zahl | REST-7 | A | H | P9 | offen |
| G-062 | Segment „neu" im Stoff-Band dunkel unsichtbar | REST-8 | A | H | P9 | offen |
| G-063 | Trefferflächen unter 44 px (Rückfall-Knöpfe, Hinweis-X, Fehler-Modal-X) | REST-9 | A | H | P12 | erledigt (3.17.35) |
| G-064 | Zwei `h1` auf Lernen; Kalender/Woche für Bildschirmleser leer | REST-10 | A | H | P12 | erledigt (3.17.35) |
| G-065 | Zeitfeld im Erinnerungs-Blatt geht beim Neuzeichnen verloren | REST-11 | A | H | P10 | offen |
| G-066 | Gruß-Datum folgt der Uhr, der Rest dem Lerntag (4 Uhr) | REST-12 | A | H | P9 | offen |
| G-067 | „Fehler melden": Leer-Fehler als Dialog; Esc löscht den Text | REST-13 | A | H | P12 | erledigt (3.17.37): Feldfehler statt Dialog; Text bleibt beim Schließen UND nach dem Absenden (3.17.14 bleibt – mailto meldet keinen Erfolg) |
| G-068 | Service Worker: fehlende Kerndatei löscht trotzdem den alten Cache | TECHNIK-11 | A | S | P11 | erledigt (3.17.36) |
| G-069 | Manifest: getrenntes `maskable`-Symbol, zweites `any` raus | TECHNIK-12 | A | H | P11 | erledigt (3.17.36): `icon-512.png` → `maskable`, `desktop-icon.png` bleibt einziges 512er `any` (rund, für Desktop). Gerätetest Android offen |
| G-070 | Dauerhaften Speicher anfragen (nur installierte App) | TECHNIK-13 | A | S | P11 | erledigt (3.17.37) |
| G-071 | Workflow: Werkzeugversion festlegen, `trap`, `permissions: read` | TECHNIK-14 | A | H | P1 | erledigt (3.17.30) |
| G-072 | Zwei tote CSP-Hashes (+ `csp-build` mitzählen) | TECHNIK-16 | A | H | P1 | erledigt (3.17.30) |
| G-073 | Rechtsseiten: Querverweis Datenschutz → Impressum | TECHNIK-18 | A | H | P1 | erledigt (3.17.30) |
| G-074 | Unnötige Bytes: 147-KB-Favicon, ungenutzte Dateien im Vorabspeicher | TECHNIK-19 | A | H | P11 | erledigt (3.17.36): Vorabspeicher ohne `icon.svg`/`flower-isolated.png`; Tab-Symbol bleibt `desktop-icon.png` – liegt wegen Manifest ohnehin im Vorabspeicher, Tausch spart nichts |
| G-075 | Tagesprotokoll zählt bei zwei Geräten/offline zu wenig (`increment`) | LERNEN-8 | A | O | P13 | offen |
| G-076 | Zweiter Tab ohne Offline-Speicher (Mehr-Tab-Manager) | LERNEN-9 | A | S | P13 | offen |
| G-077 | Speicherkarten-Liste überschreibt sich auf zwei Geräten (`arrayUnion`/`arrayRemove`) | LERNEN-10, DATEN-14 | A | S | P4 | erledigt (3.17.33) |
| G-078 | Kommentar zur Lektions-Schwelle nennt Stufe 2 statt 1 | LERNEN-12 | A | H | P5 | erledigt (3.17.30) |
| G-079 | Import verwirft zweiten Bereich mit gleichem Namen | DATEN-15 | A | H | P3 | offen |
| G-080 | Toter Link-Teilen-Code (~80 Zeilen) entfernen | DATEN-16 | A | H | P3 | offen |
| G-081 | Bereich löschen: Namensvergleich ohne Harakat | DATEN-19 | A | H | P4 | erledigt (3.17.33) |
| G-082 | Bestätigungsseite: zwei Endlos-Bewegungen | EINSTIEG-10 | A | H | P14 | offen |
| G-083 | Hauptknopf im Einstieg auf 0 und Plan 17–35 px versetzt | EINSTIEG-12 | A | S | P14 | offen |
| G-084 | Google-Knopf sagt „anmelden", wo ein Konto angelegt wird | EINSTIEG-13 | A | H | P14 | erledigt (3.17.30) |
| G-086 | `t_a11y.js` erkennt wartende Animations-Verzögerungen bei „ruhig" nicht (Messlücke, G-043 fiel nur mit eigenem Skript auf) → Prüfung aus `g043/t_g043.js` in `t_a11y.js` übernehmen | Runde 1 | A | S | P12 | erledigt (Prüfstand, dd81f95) |
| G-087 | Weitere Live-Regionen entstehen mit ihrem Text in `render()` (Einstieg-Echos, Sperre, Anmelde-Info, Ideen-Danke, Hinweis, Modus-Wechsel ~ app.js 6162–9966) – vermutlich nicht angesagt wie TECHNIK-8 | Runde 5 (G-033) | A | S | P12 | erledigt (3.17.37): `ansagen()`; Hinweis, Anmelde-Info, Ideen-Danke, Übung, Probekarte umgestellt; Einstieg-Echo/-Sperre bleiben (Text wird in ein bestehendes Element geschrieben) |
| G-088 | Meldung „Karte gespeichert" innen schief: links 20 px, rechts 12 px (Rest des Rückgängig-Knopfs bis 3.6.13); gemessen 20,8 vs. 12,8 px bis Häkchen bzw. Text | Betreiber 26.09.2026 | A | O | – | erledigt (3.17.36) |
| G-089 | Bei offenem Karten-Blatt verdeckt „Karte gespeichert" den Titel („Neue Kart…"): `.toast-wrap--oben` steht bei `--sat + 16 px`, das hohe Blatt beginnt direkt darunter. Vorschlag: Bestätigung im Blatt-Kopf neben dem Titel (Platz reserviert, kein Sprung), globale Meldung bei offenem Karten-Blatt nur als Ansage | Betreiber-Screenshot 26.09.2026 (iPhone) | A | O | P12 | erledigt (3.17.37) |
| G-090 | Beim Umdrehen springt das Wort 6 px nach unten: leerer Tag-Platzhalter vorn bekommt einen Flex-gap (gemessen Handy/320/iPad/Desktop) | Betreiber 26.09.2026 („beim Drehen glitcht es") | A | O | – | erledigt (3.17.38) |
| G-091 | „… wird fester" beim Drehen (Punkte/Schrift): Verdacht – `karte-hebt` skaliert die Karte auf 1,035, Safari zeigt währenddessen ein skaliertes Bild und rechnet am Ende scharf nach. Verdachts-Fix: Anheben ohne Skalieren, eigener Commit. Am iPhone nicht nachstellbar | Betreiber 26.09.2026 | A | O | – | offen |
| G-085 | Search Console: „/" in der Sitemap, aber `noindex` | TECHNIK-17 | B | H | – | wartet: mit Phase 6 (Empfehlung des Prüfers) |

## D. Wartet auf den Betreiber

Diese werden **nicht** gebaut, bis in `ENTSCHEIDUNGEN.md` „entschieden" steht.
Dann bekommen sie eine G-Nummer und laufen durch die Schleife.

| Frage | Worum | Quelle |
|---|---|---|
| E-01 | Passwort mindestens 8 Zeichen | KONTO-5 |
| E-02 | „Passwort ändern" in den Einstellungen (und später E-Mail ändern) | KONTO-6 |
| E-03 | Datenschutzerklärung: Offline-Kopie, Google-Profilbild, Zeitpunkte, Ausnahmen Teilen/Board, Entwurfs-Speicher | KONTO-7, REGELN-6, -11, TECHNIK-10, DATEN-13 |
| E-04 | Nach einem „Nicht" hebt „Sicher" in derselben Runde die Stufe nicht an (Rückfall reifer Karten) | LERNEN-2 |
| E-05 | Rundenlimit nimmt die am längsten fälligen zuerst | LERNEN-4 |
| E-06 | Neue Version: still neu laden beim Zurückkehren | TECHNIK-3 |
| E-07 | „Alles sichern" ehrlich benennen (oder Serie mitsichern) | DATEN-8 |
| E-08 | Import-Grenze 20 000 → 5 000 | DATEN-11 |
| E-09 | Gelöschte Karten per „Rückgängig" zurückholen | DATEN-12 |
| E-10 | Schriftprobe in den Einstellungen: Basmala oder freigegebenes Wort | REST-14 |
| E-11 | Plan-Bildschirm: Karten-Wege vor die Leiter | EINSTIEG-1 |
| E-12 | Zurück-Taste im Einstieg | EINSTIEG-9 |
| E-13 | Weniger Bewegungen je Tipp im Einstieg | EINSTIEG-11 |
| E-14 | Regeln per GitHub-Knopf veröffentlichen | TECHNIK-15 |
| E-15 | App Check (später) | REGELN-5 |
| E-16 | Funktionen und Premium (F-1 … F-20) | `FUNKTIONEN.md` |
| E-17 | Einzelfragen „lieber nicht" bestätigen (Minifizieren, Installations-Fotos, View Transitions, Schrift in Probekarte, Wochenziel, Push, Offline-Zeitstempel, Mehrfachbearbeitung) | TECHNIK-20, -21, EINSTIEG-14, -15, REST-15, -16, LERNEN-11, DATEN-18 |
| E-18 | Google-Anmeldung aus der Home-Bildschirm-App am iPhone testen | KONTO-9 (Gerätetest) |
