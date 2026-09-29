# Texte auswendig lernen – Plan

**Status:** **Bauauftrag** (Betreiber 29.09.2026 abends: „lass anfangen mit
dem neuen großen Bau“). Beginn mit Stufe 0 (§ 12). Der Bau kommt **vor**
weiteren Codex-Runden; Codex-Runde 15 ist gesichert (`plan/PLAN.md`). Nie
gleichzeitig mit Codex an `app.js`/`styles.css`. Offene Frage Q1 und Idee
F-12 sind damit beantwortet.

Zweite Datei: [`WIEDERHOLEN.md`](WIEDERHOLEN.md) – wie Texte (und Karten)
wiederholt werden. Beide gelten zusammen; bei Widerspruch gilt
`WIEDERHOLEN.md` für alles zum Wiederholen.

Grenzen (`plan/LEHREN.md` § 2): Den Wortlaut von Quran und Hadith schreibt
kein Agent. Er kommt von den Nutzenden oder unverändert aus einer geprüften
Quelle (§ 9). Karten-Lernlogik bleibt, außer dem Regler in
`WIEDERHOLEN.md` § 6.

Stand der Prüfung: 29.09.2026, Code-Stand `c4a2ccf`. Zeilennummern
verschieben sich durch Codex; beim Bau per Funktionsname suchen.

---

## 0. In einfachen Worten

- In einem eigenen Bereich kann man neben Karten einen **Text** anlegen:
  selbst einfügen oder **eine Sure aus dem mitgelieferten Quran wählen**.
  Jede Zeile bzw. Aya wird ein Lernschritt.
- **Neu lernen:** lesen → nur Anfangsbuchstaben → ohne Hilfe; nach jeder
  neuen Zeile alles heute Gelernte am Stück.
- Danach ist jede Zeile **neu, frisch oder fest**. Frisches kommt täglich,
  Festes **im Kreis**, damit auch die ersten Ayat nie verblassen
  (`WIEDERHOLEN.md`).
- Immer **der Reihe nach**, nie gemischt. Eine hakende Aya kommt mit ihren
  Nachbarn.
- Bei Texten eine kurze **Denkpause** vor dem Aufdecken und ab und zu die
  Frage „Wie geht es weiter?“.
- **Recht** ist geprüft und gelöst: einmal „Einverstanden“ beim ersten
  Text, ein Absatz in der Datenschutzerklärung, Quellenangabe für den
  Quran-Text.
- Erst 4 Wochen **Probelauf nur im Konto des Betreibers**, dann für alle.

---

## 1. Gedanken des Betreibers (29.09.2026)

Sinngemäß; ausdrücklich Gedanken, keine Beschlüsse.

- Ein Bereich mit allem aus dem Medina-Buch, Band 1.
- Quran-Verse auswendig lernen; auch Texte aus Büchern, z. B. Hadith-
  Sammlungen. Dialoge eher nicht.
- Beim Anlegen muss der Text sinnvoll „in eine Karte passen“.
- Unsicher: Zufall oder Reihenfolge; ob Stufen passen; wann etwas
  „gelernt“ ist (Gedanke: wenn man es fließend aufsagen kann).
- Gedanke: beim Anlegen eine Kategorie wählen; nicht zu kompliziert.
- Eine Methode, die er **kennt, aber nicht nutzt**: Zeile 1, dann 2, dann
  1+2, dann 3 dazu …
- Der Quran ist bewahrt und frei verfügbar – die App soll ihn mitbringen.
- Wiederholen für alles neu denken; kein abgehakter Punkt, nicht auf
  einzelne Studien gestützt, sondern ein Mehrwert, der funktioniert.
- Serie und alles Angehängte soll „einfach perfekt“ sein.
- App-Texte werden am Ende gemeinsam umformuliert.

---

## 2. Recherche – geprüft und eingeordnet

„Wie belastbar“: **Praxis** = seit langer Zeit von vielen erfolgreich
angewandt; **Studie** = einzelne Untersuchung, Übertragbarkeit begrenzt;
**Erfahrung** = Praxiswissen ohne Studie.

| Befund | Quelle | Wie belastbar | Folgerung |
|---|---|---|---|
| Quran-Auswendiglernen: täglich neu, täglich kürzlich Gelerntes, im Kreis alles Ältere; Wiederholen vor Neuem; Anfänger 3–5 Zeilen | [The Hifz Project](https://thehifzproject.com/articles/sabaq-sabqi-manzil), [MaktabPro](https://www.maktabpro.com/blog/sabaq-sabqi-manzil) | Praxis | Grundlage von `WIEDERHOLEN.md` |
| Der Kreis läuft traditionell in 7 Tagen (Einteilung in 7 Teile) | [Manzil (Wikipedia)](https://en.wikipedia.org/wiki/Manzil) | Praxis | Startwert Kreis 7 Tage |
| Selbst abrufen schlägt Wiederlesen (Prosa, nach 1 Woche 61 % gegen 40 %) | [Roediger & Karpicke 2006](https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x) | Studie, oft wiederholt | Lesen nur als erste Hilfestufe |
| Kumulatives Wiederholen hilft beim Behalten der Reihenfolge | [PubMed 37768613](https://pubmed.ncbi.nlm.nih.gov/37768613/) | Studie zum **Kurzzeit**gedächtnis bei Kindern – nur Hinweis | Neu-Lernen am Stück; getragen von der Praxis |
| Nachlassende Hilfen | [Glisky u. a. 1986](https://link.springer.com/rwe/10.1007/978-0-387-79948-3_1101) | Studie, Ergebnisse gemischt | Hilfestufen; im Probelauf beobachten |
| Anfangsbuchstaben als Hinweis | [Bible Memory Goal](https://www.biblememorygoal.com/memory-methods/first-letter-bible-memory-method-explained/) | Erfahrung | mittlere Hilfestufe |
| Texte in fester Reihenfolge, vorherige Zeilen als Hinweis, nie die folgende | [SuperMemo-Blog](https://thesupermemoblog.wordpress.com/2010/02/28/memorizing-poems-with-spaced-repetition/) | Erfahrung | T4, `WIEDERHOLEN.md` § 4 |
| Tanzil-Quran-Text: in Apps nutzbar, **unverändert**, mit Quellenangabe und Link (CC BY 3.0) | [Tanzil Text License](https://tanzil.net/docs/text_license) | Lizenztext | Ersatzquelle (§ 9) |
| King-Fahd-Komplex bietet den Text für Entwickler an (CSV, JSON …) | [qurancomplex.gov.sa/techquran/dev](https://qurancomplex.gov.sa/en/techquran/dev/) | Bedingungen **nicht einsehbar** (Seite am 29.09. vom Prüfsystem nicht erreichbar; Spiegel ohne Lizenzangabe) | § 9: in Stufe 0 klären |
| Auch indirekt sensible Daten fallen unter Art. 9 DSGVO | [EuGH C-184/20](https://www.activemind.legal/de/guides/urteil-eugh-sensible-daten/) | Urteil | § 10 |

Schluss: Die Methode stützt sich auf die **Praxis** des Quran-Auswendig-
lernens und wird von der App an echten Antworten **selbst überprüft**
(`WIEDERHOLEN.md` § 3). Studien sind nur Begleitung.

---

## 3. Grundentscheidung

- Ein **Text** ist die zweite Art Inhalt neben der Karte, nur in eigenen
  (nicht geführten) Bereichen.
- **Zeilen sind Karten-Dokumente** mit einem zusätzlichen Feld `textId`.
  Grund: Speichern, Mehrgeräte-Abgleich, Offline, Löschen, Sicherung und
  Kontowechsel-Schutz sind für Karten gebaut und in Runde 12–14 gehärtet.
- **Der Text selbst ist eine Speicherkarte der Art „text“** im Bereich; die
  Reihenfolge der Zeilen ist ihre `cardIds`-Liste.

---

## 4. Begriffe

| Begriff | Bedeutung |
|---|---|
| Text | Titel + geordnete Zeilen, gehört zu genau einem Bereich |
| Zeile | Lerneinheit; ein Karten-Dokument mit `textId` |
| neu / frisch / fest | Zustände einer Zeile (`WIEDERHOLEN.md` § 1) |
| Kreis | wie feste Zeilen der Reihe nach wiederkommen (`WIEDERHOLEN.md` § 3) |
| Abschnitt | bis 5 zusammenhängende Zeilen, am Stück aufgesagt |
| Hinweiszeilen | bis 2 Zeilen davor, grau |
| Hilfestufe | 1 lesen · 2 Anfangsbuchstaben · 3 ohne Hilfe |

---

## 5. Neu lernen

Für jede neue Zeile i (in Textreihenfolge):

1. **Hilfestufe 1 – lesen:** Zeile voll sichtbar. Knopf „Weiter“.
2. **Hilfestufe 2 – Anfangsbuchstaben** (§ 8.3). Aufsagen, „Aufdecken“
   (mit Denkpause, `WIEDERHOLEN.md` § 7), dann „Konnte ich“ / „Noch nicht“.
   „Noch nicht“ → zurück zu Stufe 1.
3. **Hilfestufe 3 – ohne Hilfe:** Zeile verdeckt, Hinweiszeile i−1 grau.
   Aufsagen, „Aufdecken“, „Konnte ich“ / „Noch nicht“ (→ Stufe 2).
4. **Am Stück:** alle heute neuen Zeilen dieses Textes bis i ohne Hilfe
   aufsagen, aufdecken: „Fließend“ / „Hakt“. Bei „Hakt“ die hakenden Zeilen
   antippen → diese ab Stufe 2, danach wieder am Stück.
5. **Gelernt** nach „Fließend“: Jede heute neue Zeile wird **frisch (0)**,
   `ersteBewertung = heute`, `nextReview = morgen`. Tagesprotokoll je Zeile
   einmal Art „t“ (`WIEDERHOLEN.md` § 7).
6. „Weiter mit der nächsten Zeile“ oder „Für heute aufhören“. Nach 3 neuen
   Zeilen am Tag ruhiger Satz „Für heute ist das gut“ (T7); bei zu viel
   Wiederholarbeit Hinweis nach `WIEDERHOLEN.md` § 5.
7. **Abbruch** vor Schritt 5: nichts gespeichert, Zeilen bleiben neu.
8. **Rückgängig** nach Schritt 5: alle Zeilen des Schritts zurück auf neu,
   Protokoll „t“ je Zeile zurück.

Zeilen früherer Tage gehören nicht zum Am-Stück-Aufsagen – die kommen als
frische Zeilen beim Wiederholen.

---

## 6. Wiederholen

Vollständig in [`WIEDERHOLEN.md`](WIEDERHOLEN.md): Zustände und Übergänge
(§ 1–2), Kreis (§ 3), Abschnitte und Nachbarn (§ 4), Tagesmenge (§ 5),
Karten-Regler (§ 6), Serie, Denkpause, Kontrollfrage (§ 7), Probelauf (§ 8),
Tests (§ 9), Felder (§ 10).

---

## 7. Speicherung

### 7.1 Zeile = Karten-Dokument

`users/{uid}/karten/{cid}`, Felder wie heute plus `textId`:

| Feld | Bei Textzeilen |
|---|---|
| `wort` | Zeilentext, ≤ 1000 Zeichen |
| `uebersetzung` | Übersetzung/Notiz, darf leer sein |
| `extra` | `null` |
| `textId` | Id des Textes (**neu**) |
| `stufe` | 0–6 frisch (Tage am Stück sicher), 7 fest |
| `nextReview` | frisch: nächster Tag; fest: `2099-12-31` (§ 7.5) |
| `ersteBewertung` | Datum des Lernens, `null` = neu |
| `maxStufe`, `rueckfaelle`, `order`, `bereichId` | wie heute; `rueckfaelle` +1, wenn eine feste Zeile hakt |

`kartenFelder()` nimmt `textId` auf – ebenso jede Stelle, die Karten
normalisiert oder lädt (`normBereiche`, `bereicheMapToArray`,
`sammlungenStarten`, Import, Umzug). Sonst geht `textId` beim nächsten
Vollschreiben verloren und die Zeilen werden zu Karten. Test § 13.

### 7.2 Text = Set der Art „text“

`sets.<id>` im Bereichsdokument (Map, bis 500 Einträge):

| Feld | Inhalt |
|---|---|
| `name`, `order`, `art: "text"`, `cardIds` | wie andere Sets; `cardIds` = Reihenfolge |
| `nummerAb` | Nummer der ersten Zeile (bei Suren die erste Aya), sonst 1 |
| `quelle` | nur bei mitgeliefertem Text: `"tanzil"` oder `"kfgqpc"` (Quellenangabe) |
| Kreisfelder | `WIEDERHOLEN.md` § 3 |

`setFelder()` schreibt heute nur `name, order, art, quelleId, cardIds` –
für Texte erweitern, sonst löscht ein Vollschreiben die Kreisfelder.
`SET_ARTEN`, `SET_ARTEN_ANZEIGE`, `SET_ART_TITEL`, `SET_ART_ERKLAERUNG` um
„text“ ergänzen; das Speicherkarten-Panel zeigt „text“ nicht als normale
Speicherkarte.

### 7.3 Firestore-Regeln

- `kartenFelder()`: `textId`; `kartenWerte`: `textOderNull(d.textId, 200)`.
- Nutzerdokument: `texteEinwilligung` (Datum oder `null`, § 10).
- Bereichsdokument: `abstandFaktor`, `festErgebnisse`
  (`WIEDERHOLEN.md` § 10).
- Set-Inhalte prüfen die Regeln nicht (Kopf von `firestore.rules`: Werte
  einer Map sind nicht durchlaufbar) – keine Änderung, `sets.size() <= 500`
  bleibt.
- Emulator-Tests mit Gegenprobe; **erst Regeln, dann Hosting**.

### 7.4 Grenzen

- Höchstens 1000 Zeilen je Text (Al-Baqara: 286).
- Zeile > 1000 Zeichen: beim Anlegen anbieten zu teilen.

### 7.5 Ältere App-Version auf einem zweiten Gerät

Nach dem Veröffentlichen läuft ein zweites Gerät einen Start lang mit alter
Version (Service Worker, seit 3.17.55). Die kennt `textId` nicht und würde
fällige Zeilen als Karten abfragen. Schutz:
- feste Zeilen: `nextReview = 2099-12-31` → für alte Versionen nie fällig;
- frische Zeilen entstehen erst mit neuer Version, im Probelauf nur beim
  Betreiber;
- Changelog: „Nach dem Update jedes Gerät einmal öffnen.“
Restrisiko: eine frische Zeile wird einmal als Karte bewertet; die neue
Version setzt `stufe > 7` auf 7. Nichts wird gelöscht.

---

## 8. Oberfläche

### 8.1 Bildschirme

1. **Anlegen** (Knopf „Neu“ im Bereich): Blatt mit „Karte“ / „Text“.
2. **Text anlegen**, zwei Wege:
   - „Selbst einfügen“: Titel, großes Feld, Vorschau nummeriert; je Zeile
     zusammenfügen / teilen; „Diese kann ich schon“ (Bereich markieren).
   - „Aus dem Quran“: Sure wählen (Nummer und arabischer Name aus der
     Quelldatei), Ayat von–bis (Standard: ganze Sure), „kann ich schon bis
     Aya …“.
   Beim ersten Text: Einverständnis (§ 10).
3. **Lernen-Tab:** Block „Texte“ unter den Karten: je Text Titel, Balken
   neu/frisch/fest, „Heute: … Minuten“ oder „Heute fertig“, eigene Zahl
   „sitzen 9 von 10“ (ab 20 Antworten).
4. **Text-Sitzung:** Zeile/Abschnitt groß; Hinweiszeilen grau darüber;
   Knöpfe unten an festem Platz (kein Springen); schmale Fortschrittsleiste.
5. **Text-Ansicht** (Verwalten): Zeilen mit Zustand-Punkt; bearbeiten,
   einfügen, löschen; Text löschen.

### 8.2 Zustände (LEHREN § 5.5)

leer · 1 Zeile · 286 Zeilen · sehr lange Zeile · Arabisch mit Harakat ·
offline (Quran-Datei schon/noch nicht geladen) · Speicherfehler · hell/
dunkel · reduzierte Bewegung · 320 px · iPad hoch/quer · Tastatur offen ·
Bildschirmleser.

### 8.3 Arabisch

- Richtung je Zeile über `istArabisch`; Quran-Schrift nach Einstellung.
  Mitgelieferter Text mit passender Schrift (King-Fahd-Text ↔
  `fonts/UthmanicHafs1Ver18.ttf`; bei Tanzil-Text Darstellung prüfen).
- **Anfangsbuchstaben:** Wörter = Trennung an Leerzeichen. Aus jedem Wort
  der erste Grundbuchstabe, ohne Harakat und Quran-Zeichen
  (U+0610–061A, U+064B–065F, U+0670, U+06D6–06ED) und ohne Tatweel
  (U+0640). Wörter nur aus solchen Zeichen (Waqf-, Aya-Endzeichen) fallen
  weg.
- Andere Sprachen: erster Buchstabe, Satzzeichen bleiben.
- Test mit Fixture aus der Quelldatei (kein vom Agenten geschriebener
  Text).

### 8.4 Regeln aus README/LEHREN

Ein delegierter Klick-Listener über `data-action`; neue Aktionen
`text-neu`, `text-quran-waehlen`, `text-anlegen`, `text-lernen`,
`text-weiter`, `text-aufdecken`, `text-bewerten`, `text-zeile-hakt`,
`text-kontrolle`, `text-loeschen`. Eintrittsbewegungen nur `@keyframes`;
nichts erscheint unter dem Finger (Denkpause: Knopf steht von Anfang an da,
nur gedimmt); Zustand in `ui`; ein Bildschirm, eine Aufgabe.

---

## 9. Quran mitliefern

1. **Quelle:** bevorzugt der Text des King-Fahd-Komplexes (Mushaf
   al-Madinah, Hafs) – passt zur Schrift der App. **Voraussetzung:**
   Nutzungsbedingungen belegt (Stufe 0 legt Bedingungen und Prüfsumme ins
   Logbuch). Nicht belegbar → **Tanzil „Uthmani“**, CC BY 3.0: unverändert,
   Quellenangabe, Link (belegt, § 2).
2. **Unverändert:** Datei so übernehmen, SHA-256 im Logbuch; Test: 114
   Suren, 6236 Ayat, Stichproben gegen die Originaldatei. Nichts hinzufügen
   oder weglassen, auch nicht an der Basmala.
3. **Selbst ausliefern:** `quran/<quelle>.json` im Repo, geladen erst beim
   Öffnen von „Aus dem Quran“; URL mit `?v=APP_VERSION`, damit der Service
   Worker sie dauerhaft speichert (offline). Nicht in `APP_SHELL`. Kein
   fremder Server (LEHREN § 12).
4. **Quellenangabe** im Impressum und unter der Sure-Auswahl.
5. **Nach dem Anlegen** ist der Text eine Kopie im Konto. Eine geänderte
   Aya zeigt „weicht vom Original ab“ und bietet „Original
   wiederherstellen“.
6. **Hadith- und andere Bücher:** später, je Buch, nur mit belegter
   Freigabe; gleiche Regeln.

---

## 10. Recht (vom Agenten geprüft)

- **Art. 9 DSGVO:** Ein gespeicherter Quran-/Hadith-Text kann auf den
  Glauben schließen lassen (EuGH C-184/20). → **Einwilligung** beim ersten
  Text: kurzer Satz + „Einverstanden“; `texteEinwilligung` (Datum) im
  Nutzerdokument. Ohne Einwilligung kein Text. **Widerruf** in den
  Einstellungen = alle Texte löschen (Bestätigung, Backup-Angebot), Feld
  `null`.
- **Datenschutzerklärung** im selben Commit wie Stufe 2: Texte, Zweck,
  Speicherort, Einwilligung, Widerruf, Lernstatistik (`festErgebnisse`,
  `abstandFaktor`), keine Auswertung.
- **Urheberrecht:** Quran-Text nach Lizenz der Quelle (§ 9). Eigene Texte:
  Sache der Nutzenden wie bei Karten; kein Teilen (T11).
- **Datensparsam:** keine Inhaltsauswertung, kein Feld mit Religion.
- Restrisiko: Prüfung durch KI, nicht durch Anwalt; nach Betreiber-
  Entscheidung vom 29.09.2026 wird gebaut.

---

## 11. Entscheidungen (29.09.2026)

(*) = vom Agenten entschieden, weil der Betreiber es überlassen hat.

| Nr | Frage | Entschieden |
|---|---|---|
| T1 | Anlegen: Karte oder Text | Karte/Text |
| T2 | Jede Zeile ein Lernschritt | ja* |
| T3 | Neu lernen in drei Hilfestufen + am Stück | ja, am Gerät nachschärfen |
| T4 | Reihenfolge | nur Reihenfolge, nirgends gemischt |
| T5 | Gelernt = einmal fließend ohne Hilfe | ja |
| T6 | Schon Gekonntes markieren | ja* |
| T7 | Neue Zeilen pro Tag | keine Einstellung; Hinweis nach 3* |
| T8 | Serie | Regel wie heute, Texte zählen (`WIEDERHOLEN.md` § 7) |
| T9 | Preis | kostenlos |
| T10 | Einwilligung beim ersten Text | ja* |
| T11 | Teilen/Lehrer-Code | später |
| T12 | Abschnitt | bis 5 Zeilen, jederzeit aufhören* |
| T13 | Lernstand bei geänderter Zeile | bleibt |
| T14 | Texte in geführten Bereichen | nein* |
| T15 | Quran mitliefern | ja (§ 9) |
| T16 | Wiederholen neu denken | ja (`WIEDERHOLEN.md`) |

---

## 12. Bauplan

Jede Stufe eine Runde nach `grossplan/AUFTRAG.md` § 2 mit Gegenprüfung
§ 2a, eine Version je Stufe. Alles hinter dem Probelauf-Schalter
(`WIEDERHOLEN.md` § 8) bis zur Freigabe.

| Stufe | Inhalt | Abnahme (Tests § 13) | Modell |
|---|---|---|---|
| 0 | Quran-Quelle und Bedingungen, Datei + Prüfsumme; § 14 gegen aktuellen Code prüfen; Fixtures | Bedingungen im Logbuch, Zählung 114/6236 | Sol mittel |
| 1 | Daten, Regeln, Schalter, Ausschluss an allen Stellen § 14 | Regeln-Emulator mit Gegenprobe; `t_text_ausschluss`, `t_text_felder`; `abnahme_runde` 13/13 | Astra |
| 2 | Anlegen (selbst/Quran), Einwilligung, Bearbeiten, Löschen, Sicherung, Datenschutzerklärung | `t_text_anlegen`, `t_quran_datei`, `t_text_einwilligung` | Sol mittel |
| 3 | Neu lernen § 5, Anfangsbuchstaben, Denkpause | `t_text_neu`, `t_anfangsbuchstaben` | Sol mittel |
| 4 | Wiederholen: Zustände, Kreis, Nachbarn, Tagesmenge, Kontrollfrage | `WIEDERHOLEN.md` § 9 | Astra |
| 5 | Karten-Regler | `t_regler_karten` | Astra |
| 6 | Lernen-Tab, Fortschritt, Serie, Probelauf-Anzeige | `t_text_fortschritt` | Sol niedrig |
| 7 | Gesamtprüfung, Probelauf starten | voller Prüfstand, Affe mit Texten, Claude-Prüfung § 2c | Astra + Claude |
| 8 | nach 4 Wochen: Auswertung, Startwerte, Freigabe nur auf Betreiber-„ja“ | Logbuch mit Wochenwerten | Sol mittel |

---

## 13. Tests

| Test | Prüft | Gegenprobe |
|---|---|---|
| `t_text_ausschluss.js` | Textzeilen nicht in Kartenabfrage, Üben, Statistik, Ring, Kartensuche, Duplikat-Warnung, „offen“-Zählung | Stand vor Stufe 1 zählt sie mit |
| `t_text_felder.js` | `textId` und Set-Kreisfelder überstehen Vollschreiben, Neuladen, Import, Umzug | ohne Erweiterung von `kartenFelder`/`setFelder` gehen sie verloren |
| Regeln-Emulator | `textId` ok/zu lang/fremdes Konto; `texteEinwilligung`; `abstandFaktor` außerhalb 0,5–1,0 abgelehnt | alte Regeln lehnen `textId` ab |
| `t_text_anlegen.js` | 30 Zeilen Arabisch mit Harakat; zusammenfügen/teilen; „kann ich schon 1–15“ → 15 frisch fällig heute, 15 neu; Löschen entfernt alle Dokumente; Export → Import identisch mit neuen Ids | – |
| `t_quran_datei.js` | 114 Suren, 6236 Ayat, Prüfsumme, Stichproben; Sure 1 und 2 anlegen; offline nach erstem Laden | geänderte Datei → rot |
| `t_text_einwilligung.js` | ohne Einwilligung kein Text; genau einmal gefragt; Widerruf löscht alle Texte | – |
| `t_text_neu.js` | § 5 Schritte 1–8; Protokoll „t“ | Abbruch speichert nichts |
| `t_anfangsbuchstaben.js` | Harakat/Waqf/Tatweel entfernt, Wortzahl stimmt, deutsch unverändert | – |
| `WIEDERHOLEN.md` § 9 | Zustände, Kreis, Nachbarn, Regler, Mehrgeräte | je Test |
| `t_text_fortschritt.js` | Balken = gespeicherte Zustände; Kartenring zählt keine Textantworten; Serie hält mit nur Textwiederholung | – |
| `t_text_alte_version.js` | alte `app.js` (fester Commit) mit Textzeilen im Konto: feste Zeilen nie fällig | – |

Nach jeder Stufe dazu: `t_sprung`, `t_kontrast`, `t_a11y`, Einstieg-
Regressionen. Stufe 4 und 7: Affe Handy 200 / iPad 150 mit Texten; CPU 4×
bei 286 Zeilen kein Bild > 50 ms.

---

## 14. Stellen im Code (vollständig nach `grep`, 29.09.2026)

51 Funktionen lesen `b.karten` bzw. `currentCards()`. Behandlung:
**A** Textzeilen ausschließen (`!c.textId`), **F** Felder durchreichen,
**U** nachweislich unberührt, **T** eigener Textweg.

| Funktion | Behandlung |
|---|---|
| `lektionOffeneKarten`, `offeneLektionIds`, `freieIdsFor` | U (nur Lektions-Sets; Texte nie in Lektionen) |
| `normBereiche`, `bereichFelder`, `bereicheMapToArray`, `sammlungenStarten`, `persistAllAusfuehren`, `pfadKarte`, `umzugStarten`, `verarbeiteImportDaten` | F |
| `ordnungPatch`, `ordnungVorn`, `commitBereichOrder`, `reverseOrder` | A (Kartenreihenfolge; Textreihenfolge = `cardIds`) |
| `schreibErfolg` | U (beim Bau bestätigen) |
| `evaluateStreakForNewDay`, `bereicheMitOffenem`, `heuteAnteil`, `dueCardsFor`, `statsCards`, `verbrannteKarten`, `resetRueckfaelle`, `gesesseneKarten`, `lernenStapel`, `startListe`, `uebbareKarten`, `karteMerken`, `findeDuplikat`, `submitCardForm`, `setCards`, `renderRundenEnde`, `renderDurchsicht` | A |
| `renderMain`, `renderLernen`, `renderVerwalten`, `kartenListeInhalt`, `bereichSheet`, `bereichMehrSheet` | A + T (Texte eigener Block) |
| `deleteSelectedCards`, `moveSelectedCardsTo`, `deleteCard` | A (Zeilen nur über die Text-Ansicht) |
| `baueWeitergabeBereich`, `weitergabeBestaetigung`, `satzUnterschied`, `satzZuordnung`, `satzZusammenfuehren` | A (kein Teilen, keine geführten Bereiche) |
| `deleteBereich`, `kontoDatenLoeschen` | U (löschen alle Karten-Dokumente, Zeilen mit) – testen |
| `renderKontoLoeschen` | A in der Kartenzahl, Texte eigens nennen |
| `currentCards`, `findCard` | U (liefern alles; Aufrufer entscheiden) |

Stufe 0 prüft die Liste erneut (`grep -n "\.karten\b\|currentCards()"
app.js`); Stellen aus späteren Runden kommen dazu.

---

## 15. Geprüfte Fragen und Lösungen

| Frage | Lösung |
|---|---|
| Zählen Textantworten im Karten-Fortschrittsring? | Nein: Protokollart „t“; `heuteAnteil` nutzt nur `w`/`n`; `tagGelernt` nimmt „t“ dazu |
| Braucht „t“ eine Regeländerung? | Nein, `verlauf` wird nur als Map geprüft |
| `textId` fehlt nach Vollschreiben? | `kartenFelder` erweitern; `t_text_felder` mit Gegenprobe |
| Kreisfelder und Vollschreiben? | `setFelder` erweitern; gleicher Test |
| Alte App-Version auf zweitem Gerät | § 7.5 |
| Feste Zeilen und `nextReview` | `2099-12-31`; der Kreis entscheidet |
| Rückgängig im Kreis | stellt auch `kreisPos`, `kreisTag`, `festErgebnisse` zurück (`WIEDERHOLEN.md` § 3) |
| Zeile löschen, auf die `kreisPos` zeigt | `kreisPos` auf die nächste vorhandene feste Zeile |
| Zeilen mitten in einen Text eingefügt | neu; Kreis läuft über die festen weiter |
| Quran-Datei offline | nach erstem Laden im Service-Worker-Speicher (`?v=`) |
| Quran-Datei-Größe | nicht in `APP_SHELL`, nur bei Bedarf |
| Basmala | so wie in der Quelldatei |
| Schrift passt nicht zum Text | Quelle und Schrift aus einem Haus bevorzugen; Tanzil-Darstellung testen |
| Kontrollfrage: woher die falschen Wörter? | 2 andere Wörter aus demselben Text, ähnliche Länge, nach `vergleichsWort` verschieden; < 3 verschiedene Wörter → keine Kontrollfrage |
| Mehrere Geräte gleichzeitig im Kreis | `WIEDERHOLEN.md` § 3, Test § 9 |
| Probelauf nur beim Betreiber | Schalter an `BETREIBER_UIDS` |
| Nach der Freigabe | Schalter entfernen, Changelog, Datenschutzerklärung aktuell |
| Einwilligung widerrufen | alle Texte löschen, Backup anbieten |
| Bildschirmleser | verdeckte Zeile als „verdeckt, Zeile 12“; Aufdecken per Knopf; Anfangsbuchstaben vorlesbar |

---

## 16. Was nicht gebaut wird

- Spracherkennung beim Aufsagen.
- Quran-Text von einem fremden Server.
- Religiöse Beispieltexte durch Agenten.
- Teilen von Texten (T11), Texte in geführten Bereichen (T14).
- Viele Kategorien beim Anlegen (T1).

---

## 17. Nächster Schritt

Stufe 0 (§ 12). Logbuch: [`LOGBUCH.md`](LOGBUCH.md), Format wie in
`CLAUDE.md`. Nach jeder Stufe: Version, Changelog, Tests, Commit auf
`main`; der Betreiber veröffentlicht.
