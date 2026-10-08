# Lizenzen an Primärquellen prüfen

Wörtlich aus dem Chat 981b69a1, Agent 19, gestartet 2026-10-07 15:55 (Quelle: `agent-acd8775e798c20454.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 13 Agenten der ZWEITEN Runde für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server). Betreiber ist ein Einzelner (minderjährig), Nutzer bisher er und wenige Freunde; Ziel: öffentliche, ernsthafte Lern-Website für deutschsprachige Muslime, die Quran-/klassisches Arabisch lernen. Neu im Probelauf: "Texte auswendig lernen" mit Quran aus Tanzil-Daten (quran/tanzil-uthmani.txt, quran/tanzil-quran-data.xml).
Der Betreiber hat entschieden: Er will ALLES Nützliche aus Runde 1 bauen, egal wie schwer. Runde 2 soll tiefer und weiter schauen.
RUNDE 1 hat mehrere Ideen an ungeklärten Lizenzen aufgehängt: Quranic Arabic Corpus Morphologie (Wurzel/Lemma je Wort; angeblich GPL plus "changing it is not allowed"), Rezitations-Audio (everyayah.com "UNKNOWN", Quran Foundation API braucht client_secret), QUL/Tarteel-Datensätze (Mutashabihat-Phrasen, Mushaf-Layout, Wort-für-Wort), deutsche Quran-Übersetzungen und deutsche Wort-für-Wort-Daten, Lehrwerk-Vokabeln (Madinah-Bücher von Dr. V. Abdur Rahim – laut Plan hat "der Autor die Online-Nutzung freigegeben"; Al-Arabiyyah bayna Yadayk; Qasas an-Nabiyyin), Lane's Lexicon, Schriften (UthmanicHafs, Amiri).
HARTE REGELN: NUR LESEN im Repo. Keine Datei anlegen/ändern, keine git-Befehle außer lesenden, nichts ausführen/installieren. Projektregeln: Religiöser Rahmen Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte; Quran-Text nur unverändert aus geprüfter Quelle. Dies ist eine Einordnung, KEINE Rechtsberatung – so kennzeichnen.
AUSGABEFORMAT (Deutsch, max. ca. 1100 Wörter): Teil 1 Tabelle/Liste je Quelle: was genau angeboten wird (Format, Größe, Inhalt), WÖRTLICHE Kernaussage der Lizenz kurz zitiert (unter 15 Wörter) mit URL der Primärquelle, was das für eine öffentliche, evtl. später durch freiwillige Zahlungen unterstützte Web-App praktisch erlaubt/verlangt (Namensnennung, Unverändertheit, Weitergabe unter gleichen Bedingungen, kommerziell), ob Selbst-Hosten erlaubt ist, wen man für eine schriftliche Erlaubnis anschreiben müsste (Kontaktweg), und dein Urteil: nutzbar / nur mit Erlaubnis / nicht nutzbar. Teil 2 "Fragen an den Betreiber" (3–8 Fragen, jede mit 2–3 Sätzen Hintergrund, Auswahlmöglichkeiten und Empfehlung, sodass er ohne Nachschlagen antworten kann).

DEIN AUFTRAG: Kläre diese Lizenzfragen an den PRIMÄRQUELLEN im Web (Lizenzseiten selbst abrufen, nicht nur Suchtreffer): tanzil.net (Text-Lizenz, Metadaten-Lizenz; prüfe auch den Lizenzblock in den Dateien unter quran/ im Repo und was plan/texte-lernen/KONZEPT.md dazu festhält), corpus.quran.com/download (Morphologie v0.4: genaue Bedingungen; ist es GPL und was heißt das für eine separat geladene Datendatei in einer Web-App – "mere aggregation" vs. abgeleitetes Werk; gibt es alternative offene Morphologie-Daten, z. B. von Tanzil-Umfeld, MASAQ-Datensatz, Quranic Treebank, "quran-morphology" auf GitHub mit eigener Lizenz, QUL "morphology"), qul.tarteel.ai (Lizenz je Ressource: Mutashabihat, Mushaf-Layouts, Wort-für-Wort, Übersetzungen, Rezitationen mit Segmenten), everyayah.com, Quran Foundation/Quran.com Developer Terms, mp3quran.net, verse-by-verse-Audio mit klarer freier Lizenz (gibt es eine Rezitation unter CC0/CC-BY oder gemeinfrei? z. B. bei archive.org – Lizenzangabe dort kritisch prüfen), deutsche Übersetzungen (Bubenheim/Elyas, Abu Rida, Frank Bubenheim; gibt es eine deutsche Übersetzung mit freier Lizenz – nur Lizenzlage, KEINE Bewertung des Inhalts; die Auswahl wäre Sache des Betreibers), Schriften im Ordner fonts/ des Repos (welche liegen dort, unter welcher Lizenz stehen KFGQPC Uthmanic Hafs und Amiri Quran – darf man sie selbst hosten?), Madinah-Bücher (was ist über Dr. V. Abdur Rahims Freigabe öffentlich belegbar, z. B. auf drvaniya.com; suche im Repo per Grep nach "Abdur Rahim", "Medina", "Madinah", "freigegeben", was dort als Beleg notiert ist), Bayna Yadayk (Arabic for All), Qasas an-Nabiyyin (Abul Hasan Ali Nadwi – Schutzfrist). Dazu die Grundsatzfrage nach deutschem/EU-Recht mit Quelle: Sind einzelne Vokabelpaare schutzfähig, was ist mit Auswahl/Anordnung (Sammelwerk § 4 UrhG) und Datenbankherstellerrecht (§ 87a UrhG)?

## Bericht des Agenten

**Lizenzlage der Quellen aus Runde 1 – Einordnung, KEINE Rechtsberatung** (abgerufen 07.10.2026; im Repo nur gelesen)

Die meisten offenen Punkte sind jetzt entscheidbar: Tanzil, Amiri und die Rowwad-Übersetzung sind nutzbar, fast alles andere braucht eine schriftliche Erlaubnis oder scheidet aus. Drei Seiten waren nicht prüfbar (KFGQPC-Schriftseite, Tarteel-Terms, everyayah-Statusseite).

## Teil 1 – Quellen

**Quran-Text und Metadaten**
- **Tanzil-Text (Uthmani 1.1)** – `sure|aya|text`, liegt in `quran/tanzil-uthmani.txt`, Lizenzblock Zeilen 6239–6266. Lizenz: „copy and distribute verbatim copies … CHANGING IT IS NOT ALLOWED“ (https://tanzil.net/docs/text_license). CC BY 3.0 plus Zusatz: Quelle nennen, auf tanzil.net verlinken, Copyright-Block in der Datei lassen. Selbst-Hosten ja; kommerzielle Nutzung ist nicht ausgeschlossen. `impressum.html` Z. 73–77 und `app.js` Z. 11654 erfüllen das bereits. **Nutzbar.**
- **Tanzil-Metadaten** – `quran/tanzil-quran-data.xml`, Kopf: `license="cc-by"`. Die Seite https://tanzil.net/docs/quran_metadata nennt selbst keinen Lizenztext; Beleg ist nur der Dateikopf. **Nutzbar** mit Namensnennung.

**Morphologie (Wurzel/Lemma je Wort)**
- **Quranic Arabic Corpus v0.4** – Textdatei, Buckwalter-Umschrift. Die Downloadseite nennt „GNU General Public License“ und zugleich „verbatim copies of this file, but CHANGING IT IS NOT ALLOWED“ (https://corpus.quran.com/download/); https://corpus.quran.com/license.jsp zeigt GPL v3. Verlangt werden Quelle, Link und Copyright-Hinweis, auch in „works derived from“.
  - Die beiden Aussagen widersprechen sich (GPL erlaubt Änderung, der Zusatz nicht).
  - Meine Lesart: Die unveränderte Datei getrennt ausliefern und im Browser auswerten liegt nahe an „Aggregat“ (GPLv3 § 5) und ist das geringste Risiko.
  - Eine umgebaute JSON (nur Wurzel/Lemma, arabische Schrift) ist eine Änderung und nach dem Zusatz nicht gedeckt. Sollte doch die GPL greifen, könnte Copyleft auf die App durchschlagen.
  - Kontakt: Kais Dukes über Feedback/Message Board auf corpus.quran.com.
  - **Unverändert mit Nennung vertretbar; jede Umformung nur mit Erlaubnis.**
- **mustafa0x/quran-morphology (GitHub)** – veränderter Fork von v0.4, keine eigene Lizenz im README. Erbt das Problem und ist selbst schon eine Änderung. **Nicht nutzbar ohne Klärung.**
- **MASAQ (Univ. of Jordan, Mendeley Data)** – über 131.000 Morphologie-Einträge, 20 Spalten, Basis Tanzil. Die Datensatzseite v6 zeigt „CC BY NC 3.0“ (https://data.mendeley.com/datasets/9yvrzxktmr/6); ein Suchtreffer nannte fälschlich CC BY. Solange die App kostenlos und ohne Zahlungen ist, vertretbar; freiwillige Zahlungen sind eine Grauzone. Kontakt: Majdi Sawalha. **Nur mit Erlaubnis, sobald Geld fließt.**
- **QUL „Morphology“** – sechs SQLite-Sätze (Wurzel/Stamm/Lemma je Wort und je Aya), keine Lizenzangabe auf der Seite. Herkunft vermutlich das Corpus. **Nur mit Erlaubnis.**

**QUL / Tarteel** (https://qul.tarteel.ai/faq)
- Grundaussage: „resources available on QUL vary in their copyright status“. Das Repo ist MIT, das betrifft nur den Code. Die Tarteel-Terms waren nicht lesbar.
- Mutashabihat (JSON), Mushaf-Layouts (12 Stück, SQLite/JSON; KFGQPC-Layouts), Rezitationen (133, Zeitstempel als JSON/SQLite): auf den Ressourcenseiten **keine** Lizenzangabe.
- Deutsch Wort-für-Wort: ausdrücklich „This resource is © copyrighted“, kein Download.
- Kontakt: GitHub-Issue bei TarteelAI/quranic-universal-library oder Tarteel-Support.
- **Alles nur mit schriftlicher Erlaubnis; Deutsch Wort-für-Wort derzeit nicht nutzbar.**

**Audio**
- **everyayah.com** – MP3 je Aya, über 80 Rezitatoren, 16–192 kbps, ZIP. Auf der Rezitationsseite steht keine Lizenzaussage; die Statusseite gab 404. Die Aufnahmen sind eigene Schutzgegenstände (Rezitator, Hersteller). **Nicht nutzbar ohne Erlaubnis des jeweiligen Rechteinhabers.**
- **Quran Foundation API** – kommerziell, Abo und Spenden sind erlaubt. Aber: „Keep client_secret on the server only“ (https://api-docs.quran.foundation/docs/quickstart/), und Inhalte dürfen höchstens eine Woche zwischengespeichert werden (https://api-docs.quran.foundation/legal/developer-terms/). Die Terms trennen Audio-URLs ausdrücklich von den Rechten an den Aufnahmen. Ohne eigenen Server technisch nicht zulässig. **Nur mit Backend (z. B. Cloud Function), kein Selbst-Hosten.**
- **mp3quran.net** – API v3 mit Aya-Zeiten, keine Nutzungsbedingungen auf der API-Seite. **Nur mit Erlaubnis** (Kontaktformular).
- **Frei lizenzierte Aya-Rezitation** – keine gefunden. AQQD (CC0) deckt nur Ausschnitte von 70 Suren ab und ist ein Forschungsdatensatz. archive.org-Angaben stammen vom Hochlader und sind kein Rechtenachweis (nicht einzeln geprüft). **Derzeit keine tragfähige freie Quelle.**

**Deutsche Übersetzungen** (nur Lizenzlage, keine inhaltliche Bewertung)
- **Tanzil (Abu Rida, Bubenheim & Elyas, Khoury, Zaidan)** – „for non-commercial purposes only“ (https://tanzil.net/trans/); sonst Erlaubnis von Übersetzer oder Verlag. **Nur mit Erlaubnis, sobald Zahlungen.**
- **Rowwad Translation Center (QuranEnc)** – CSV/XLS/XML/API. „can be downloaded and re-published“ (https://quranenc.com/en/browse/german_rwwad). Bedingungen: unverändert, Quelle und Versionsnummer nennen, aktuell halten, keine unpassende Werbung daneben. Selbst-Hosten ja. **Nutzbar** – die klarste deutsche Lizenz.
- **Gemeinfrei durch Fristablauf** (§ 64 UrhG, aus Vorwissen, Sterbedaten nicht nachgeschlagen): Rückert (gest. 1866), Henning (gest. 1927), Goldschmidt (gest. 1950). Rechtlich frei; die Auswahl ist Sache des Betreibers.

**Schriften in `fonts/`**
- **`AmiriQuran-arabisch.woff2`** mit `AmiriQuran-OFL.txt` – SIL OFL 1.1: einbetten, umwandeln und selbst hosten erlaubt, Lizenztext beilegen. Ist erfüllt. **Nutzbar.**
- **`UthmanicHafs1Ver18.ttf`** – laut `plan/audit/LOGBUCH.md` Z. 228–234 steht in der Datei „Use, Copy, Distribute“, nicht verändern oder verkaufen. Die Lizenzdatenbank zitiert dagegen: „may not be reproduced, modified without the express written approval“ (https://scancode-licensedb.aboutcode.org/kfgqpc-uthmanic-script-hafs.LICENSE). Die Primärseite fonts.qurancomplex.gov.sa war nicht erreichbar. Unverändertes Hosten der TTF ist gängige Praxis und durch den Dateitext gestützt; keine WOFF2-Umwandlung, kein Subsetting. **Nutzbar, Restzweifel** – Erlaubnis beim König-Fahd-Komplex wäre sauber.

**Lehrwerke**
- **Madinah-Bücher (Dr. V. Abdur Rahim)** – der einzige Repo-Beleg ist die mündliche Angabe des Betreibers in `plan/landing-page-strategie/LOGBUCH.md` Z. 447–458. Öffentlich fand ich nur LQ Toronto: „Reserved For Personal Use. No Commercial Use Allowed“ (https://www.lqtoronto.com/downloads.html). drvaniya.com hat auf der Startseite keine Freigabe-Erklärung. Ein belegbares „für alle Online-Zwecke frei“ gibt es also nicht. Rechte liegen vermutlich bei Erben und Verlagen (Islamische Universität Medina, Islamic Foundation Trust Chennai, Goodword). **Eigene Vokabelkarten vertretbar (siehe Grundsatz); Buchtexte, Dialoge, Übungen nur mit Erlaubnis.**
- **Al-Arabiyyah bayna Yadayk (Arabic for All, Riad)** – keine offene Lizenz gefunden, Verlag aktiv. **Nur mit Erlaubnis** (arabicforall.net).
- **Qasas an-Nabiyyin (Nadwi, gest. 1999)** – in der EU bis Ende 2069 geschützt (Sterbejahr aus Vorwissen). Der Text ist **nicht nutzbar** ohne Erlaubnis; einzelne Vokabeln siehe unten.
- **Lane's Lexicon** – nicht geprüft.

**Grundsatz Vokabeln (DE/EU; Rechtsprechung aus Vorwissen, in diesem Lauf nicht abgerufen)**
- Einzelne Wortpaare sind nicht schutzfähig; es fehlt die Schöpfungshöhe (§ 2 Abs. 2 UrhG; EuGH C-5/08 Infopaq).
- Auswahl und Anordnung können als Sammelwerk geschützt sein (§ 4 UrhG). Nach EuGH C-604/10 Football Dataco zählt nur schöpferische Auswahl, nicht Mühe. Eine Lektions-Wortliste, die dem Lehrgang folgt, ist ein Grenzfall. Das Risiko steigt, wenn Lektionsgliederung, Reihenfolge und Glossen 1:1 übernommen werden.
- Das Datenbankherstellerrecht (§ 87a UrhG, https://www.gesetze-im-internet.de/urhg/__87a.html) verlangt eine wesentliche Investition, dauert 15 Jahre (§ 87d) und gilt nach § 127a nur für Hersteller aus EU/EWR. Bei den saudischen und indischen Verlagen greift es praktisch nicht.
- Sicher ist: selbst erstellte deutsche Bedeutungen, kein Buchtitel als Herkunftsversprechen, keine Scans, keine Übungssätze.

## Teil 2 – Fragen an den Betreiber

1. **Madinah-Freigabe belegen?** Die Freigabe steht im Repo nur als deine Aussage; öffentlich belegbar ist nur „personal use, no commercial“. Für einen öffentlichen, später evtl. bezahlten Kartensatz reicht das nicht.
   - (a) Quelle der Freigabe heraussuchen (Video/Link) und ins Logbuch
   - (b) Verlag oder Erben schriftlich fragen
   - (c) nur eigene Wortkarten mit eigenen Übersetzungen, ohne Buchtexte
   - **Empfehlung: (c) sofort, (a) parallel.**
2. **Morphologie: welcher Weg?** Die Corpus-Datei darf unverändert verteilt, aber nicht geändert werden; MASAQ ist nicht-kommerziell.
   - (a) Corpus-Datei unverändert laden, im Browser auswerten, Quelle und Link nennen
   - (b) Kais Dukes um Erlaubnis für ein kompaktes JSON bitten
   - (c) verzichten
   - **Empfehlung: (b) anschreiben, bis dahin (a).**
3. **Sollen jemals Zahlungen fließen (auch freiwillige)?** Daran hängen MASAQ und die Tanzil-Übersetzungen (Bubenheim/Elyas, Abu Rida), die nur nicht-kommerziell frei sind.
   - (a) dauerhaft kostenlos
   - (b) Zahlungen möglich
   - **Empfehlung: von (b) ausgehen und nur Quellen ohne NC-Klausel einbauen.**
4. **Deutsche Übersetzung anzeigen?** Rechtlich klar sind Rowwad/QuranEnc (unverändert, mit Quelle) und die gemeinfreien alten Übersetzungen; Bubenheim/Elyas braucht eine Verlagserlaubnis.
   - (a) Rowwad
   - (b) Erlaubnis für Bubenheim/Elyas einholen
   - (c) keine Übersetzung
   - **Die inhaltliche Wahl triffst du; rechtlich am einfachsten ist (a).**
5. **Audio?** Eine frei lizenzierte Aya-Rezitation gibt es nicht; die Quran Foundation verlangt einen Server für das Secret.
   - (a) Cloud Function als Proxy zur QF-API
   - (b) Rechteinhaber einer Rezitation direkt anschreiben
   - (c) vorerst kein Audio
   - **Empfehlung: (c), später (a).**
6. **QUL-Daten (Mutashabihat, Mushaf-Layout)?** Auf den Seiten steht keine Lizenz. Soll ich eine Anfrage an Tarteel entwerfen (GitHub-Issue, Englisch), die du abschickst? **Empfehlung: ja, vor jedem Einbau.**
7. **UthmanicHafs absichern?** Zwei abweichende Lizenztexte sind im Umlauf.
   - (a) so lassen (unveränderte TTF)
   - (b) König-Fahd-Komplex schriftlich fragen
   - (c) ganz auf Amiri Quran (OFL) umstellen
   - **Empfehlung: (a) jetzt, (b) nebenbei.**

Gelesene Dateien: `C:\Users\USER\Wiederholung\quran\tanzil-uthmani.txt`, `C:\Users\USER\Wiederholung\quran\tanzil-quran-data.xml`, `C:\Users\USER\Wiederholung\fonts\AmiriQuran-OFL.txt`, `C:\Users\USER\Wiederholung\impressum.html`, `C:\Users\USER\Wiederholung\app.js`, `C:\Users\USER\Wiederholung\plan\texte-lernen\KONZEPT.md`, `C:\Users\USER\Wiederholung\plan\audit\LOGBUCH.md`, `C:\Users\USER\Wiederholung\plan\landing-page-strategie\LOGBUCH.md`.
