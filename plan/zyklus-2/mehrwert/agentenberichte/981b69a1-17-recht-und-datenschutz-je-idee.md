# Recht und Datenschutz je Idee

Wörtlich aus dem Chat 981b69a1, Agent 17, gestartet 2026-10-07 15:55 (Quelle: `agent-a3fcce52268f45f6f.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 13 Agenten der ZWEITEN Runde für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build: app.js ~820 KB, styles.css, index.html, sw.js; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server). Betreiber ist ein Einzelner (minderjährig), Nutzer bisher er und wenige Freunde; Ziel: öffentliche, ernsthafte Lern-Website für deutschsprachige Muslime, die Quran-/klassisches Arabisch lernen. Neu im Probelauf (nur Betreiber-Konto): "Texte auswendig lernen" mit Quran aus Tanzil-Daten (quran/).
Der Betreiber hat entschieden: Er will ALLES Nützliche aus Runde 1 bauen, egal wie schwer. Runde 2 soll tiefer und weiter schauen als Runde 1.
ERGEBNIS RUNDE 1 (nicht wiederholen, sondern darauf aufbauen): Bestätigte Fehler: (a) "Nicht" dann "Sicher" in derselben Runde gibt sofort wieder vollen Abstand (app.js gradeCard ~5985-6069); (b) Sitzungslimit schneidet erste N statt dringendste (startSession ~5893); (c) Backup ohne Verlauf/Serie/Einstellungen (exportBackup ~4191); (d) keine indexierbare Seite (index.html noindex, robots.txt). Geplante Ideen: Liste einfügen F-1 mit Vorschau/CSV/Lektionszeilen; ohne Harakat abfragen F-2 bzw. Harakat-Leiter; Regal mit Betreiber-Kartensätzen als statische Dateien (zuerst Medina Buch 1); Rückkehr nach Pause (Berg strecken); Ruhetag; Urlaubsmodus; öffentliche Startseite + Proberunde ohne Konto; Bearbeiten in der Abfrage; Rundenende zeigt verpatzte Karten; Kennzahl "sicher gekonnt"; Trefferquote reifer Karten; Problemkarten mit Diagnose/Verwechslungspaare; Wake Lock; Druckansicht; Text-/CSV-Export; Einladungslink für Lektions-Code; Nachliefern unter demselben Code; Wochentakt-Freigabe; Harakat-Eingabeleiste; Handschrift in normaler Runde; zweite Richtung Deutsch→Arabisch F-5; Texte: Bestand eintragen ohne Lawine, Kreis über mehrere Texte, Juz/Hizb/Seite, Hinweis auf ähnliche Ayat (rechnerisch), Übergangs-Abfrage, Einstiegsprobe, lokale Selbstaufnahme, Abhör-Modus auf einem Gerät, lange Ayat an Waqf-Zeichen teilen, Schwachstellen je Zeile; Wort in Aya antippen → Karte; Quran-Konkordanz zur Karte; Wurzel-Familien/Abdeckung (hängt an GPL-Morphologiedaten). Als "nicht bauen" eingestuft: TTS, Spracherkennung, KI-Karten, automatische Bedeutungen/Konjugationen, Web Push, öffentliche Nutzer-Bibliothek, Klassenraum mit Schülerfortschritt, Kinderkonten, .apkg-Import, OCR, Abzeichen/Bestenlisten, Rezitations-Audio ohne schriftliche Lizenz.
HARTE REGELN: NUR LESEN. In einem anderen Chat wird gerade am Repo gearbeitet. Keine Datei im Repo anlegen/ändern/löschen, keine git-Befehle außer rein lesenden, keine Tests, keine Server, keine Skripte starten, nichts installieren. app.js nie komplett lesen: Grep, dann Ausschnitte.
Projektregeln: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte; keine Sekten/Organisationen/Politik; keine Speicherung religiöser Angaben. Keine Dark Patterns. DSGVO ernst. Lernlogik nur mit ausdrücklicher Betreiber-Entscheidung. Wichtige Dateien: plan/STAND.md, plan/LEHREN.md (116 KB, gezielt greppen), plan/grossplan/FUNKTIONEN.md und ENTSCHEIDUNGEN.md, plan/zyklus-2/AUFGABEN.md, ENTSCHEIDUNGEN.md und befunde/, plan/texte-lernen/KONZEPT.md und WIEDERHOLEN.md, plan/lehrer-modus/GERUEST.md, plan/onboarding/, README.md, CHANGELOG.md, firestore.rules, firebase.json.
AUSGABEFORMAT (Deutsch, max. ca. 1000 Wörter, kein Vorgeplänkel): Teil 1 "Befunde/Ideen" (8–14 Punkte; je Punkt: Titel, was genau, Nutzen, Aufwand S/M/L, Abhängigkeiten, Risiko/Gegenargument, Beleg Datei:Zeile oder URL). Teil 2 "Fragen an den Betreiber" (3–8 Fragen; jede so formuliert, dass er sie OHNE Nachschlagen beantworten kann: 2–3 Sätze Hintergrund, die Auswahlmöglichkeiten, deine Empfehlung mit einem Satz Begründung). Ehrlich gewichten. Ungeprüftes als Vermutung kennzeichnen.

DEIN AUFTRAG: Recht und Datenschutz für jede Runde-1-Idee (Einordnung, ausdrücklich KEINE Rechtsberatung – so kennzeichnen). Lies datenschutzerklaerung.html und impressum.html vollständig, plan/phase-5-recht/ (AUFTRAG, LOGBUCH, Befunde), in plan/LEHREN.md die Abschnitte zu Recht/Texten/E-Mails (Grep "DSGVO", "Art. 9", "Art. 8", "minderj", "Einwilligung", "TTDSG", "TDDDG", "Impressum"), plan/texte-lernen/KONZEPT.md (Einwilligung Art. 9), plan/lehrer-modus/GERUEST.md (C5 Minderjährige), plan/monetarisierung/GERUEST.md. Erstelle eine Tabelle: Idee → welche personenbezogenen Daten neu/anders verarbeitet werden → nötige Änderung an Datenschutzerklärung/Einwilligung/Regeln → rechtliches Risiko (niedrig/mittel/hoch) → was eine echte Person (Anwalt/Datenschutzberater) prüfen sollte. Besonders gründlich: lokale Selbstaufnahme (Mikrofon, Stimme als biometrisches Datum? nur lokal im Arbeitsspeicher), öffentliche Startseite/SEO und Proberunde ohne Konto (localStorage/TDDDG § 25), anonymes Gastkonto, Trefferquote/zusätzliche Lerndaten, Lehrer-Funktionen und Einladungslink (Daten Minderjähriger, Art. 8 DSGVO, Altersgrenze 16 in Deutschland), Texte für alle freigeben (Art. 9: verraten gespeicherte Quran-Texte die Religion? wie ist das heute gelöst?), Regal mit Lehrbuch-Vokabeln (Urheberrecht: Schutz von Wortlisten/Sammelwerk/Datenbankrecht § 87a UrhG, Übersetzungen), Quran-Morphologiedaten unter GPL (was bedeutet GPL-Daten in einer nicht-GPL-Web-App wirklich; recherchiere die genauen Lizenzbedingungen auf corpus.quran.com und die von Tanzil), Druck/Export mit Quran-Text, "Unterstützen"-Zahlung bei minderjährigem Betreiber (Geschäftsfähigkeit § 106 ff. BGB, § 112 BGB, Gewerbe, Kleinunternehmer, Impressumspflicht mit Privatadresse), Haftung für von Nutzern geteilte Inhalte (DSA/TMG-Nachfolge DDG). Recherchiere im Web mit Primärquellen (Gesetzestext, Aufsichtsbehörden) und gib URLs an. Teil 2 wie beschrieben.

## Bericht des Agenten

**Recht und Datenschutz zu den Runde-1-Ideen — Einordnung durch einen Agenten, ausdrücklich KEINE Rechtsberatung. Entscheiden muss eine echte Person (LEHREN § 12).**

Gelesen: `datenschutzerklaerung.html`, `impressum.html`, `plan/phase-5-recht/AUFTRAG.md` und `PRUEFUNG-2026-09-24.md` vollständig; LEHREN, KONZEPT (Texte), Lehrer- und Monetarisierungs-Gerüst, `firestore.rules`, `firebase.json` gezielt. Nicht gelesen: `phase-5-recht/LOGBUCH.md`.

## Teil 1 — Befunde

**1. Texte für alle freigeben: Einwilligung unter 16 ist die eigentliche Lücke (Risiko hoch)**
- Heute: Dialog „Einverstanden", Datum `texteEinwilligung` im Nutzerdokument, Widerruf löscht alle Texte (`app.js:11735–11749`, `firestore.rules:143`, DSE Punkt 5, `datenschutzerklaerung.html:150–164`). Für Erwachsene ist das sauber gebaut.
- Lücke: Die Rechtsgrundlage ist eine Einwilligung (Art. 9 Abs. 2 lit. a). Nach Art. 8 DSGVO ist sie bei Online-Diensten erst ab 16 allein wirksam; Deutschland hat die Grenze nicht gesenkt.
- In der App gibt es keine Altersangabe: Grep nach „16 Jahre", „Mindestalter", „Eltern" in `app.js`, `index.html` und allen HTML-Seiten ergab keinen Treffer.
- Nötig vor der Freigabe: Alterserklärung (mindestens im Einwilligungsdialog), ein Satz in der DSE. Aufwand S.
- Anwalt prüfen lassen: ob die Selbstauskunft reicht, und ob schon ein Konto mit arabischen Karten bei dieser Zielgruppe ein Art.-9-Datum ist (EuGH C-184/20, weite Auslegung). Dann beträfe es die ganze App.
- Quelle: https://www.activemind.legal/de/guides/urteil-eugh-sensible-daten/ (über KONZEPT:82).

**2. Lokale Selbstaufnahme (Risiko niedrig, wenn wirklich nur lokal)**
- Die Stimme ist nur dann ein biometrisches Datum nach Art. 9, wenn sie mit speziellen technischen Verfahren zur Identifizierung verarbeitet wird. Aufnehmen und Abspielen gehört nicht dazu (Sekundärquelle: https://www.dr-datenschutz.de/biometrische-daten-einsatzfaelle-risiken-und-datenschutz/).
- Bleibt die Aufnahme im Arbeitsspeicher, erhält der Betreiber nichts.
- Der Mikrofonzugriff fällt unter § 25 TDDDG, ist aber ausdrücklich gewünscht (Abs. 2 Nr. 2).
- Technische Sperre: `firebase.json:57` und `:117` setzen `microphone=()`. Die Funktion ist also heute blockiert; die Zeile `csp-build` muss mitgezählt werden.
- Nötig: ein Satz in der DSE („verlässt das Gerät nicht, wird nicht gespeichert"), ein Test, dass nichts in Firestore oder im Cache landet. Speicherung in IndexedDB würde ich weglassen (Familiengerät). Aufwand S–M.

**3. Öffentliche Startseite und Proberunde ohne Konto (Risiko niedrig)**
- § 25 TDDDG gilt auch für `localStorage`. Erlaubt ist nur Einwilligung oder „unbedingt erforderlich"; eine Interessenabwägung gibt es nicht (DSK, OH Digitale Dienste 1.2).
- Der Probestand ist erforderlich, solange er nur dem Lernen dient: keine Zählung, keine Kennung, kein Rückkanal.
- Nötig: DSE Punkt 7 um den neuen Schlüssel ergänzen; nichts davon ungefragt ins spätere Konto übernehmen.
- Die Startseite darf keine fremden Dateien laden (LEHREN:1345). Werbeaussagen müssen stimmen.
- Punkt 2 der DSE („privat … kleiner Nutzerkreis", Zeile 79) passt dann nicht mehr.

**4. Anonymes Gastkonto (Firebase): lieber nicht (Risiko mittel)**
- Es entsteht eine dauerhafte Kennung bei Google samt Lerndaten, ohne E-Mail. Das sind personenbezogene Daten ohne Löschweg, wenn das Gerät weg ist, und es bleiben verwaiste Datensätze.
- Die Regeln verlangen überall `email_verified` (`firestore.rules:67`, `:304`) und müssten aufgeweicht werden.
- Die rein lokale Proberunde (Punkt 3) erreicht dasselbe ohne diese Folgen.

**5. Trefferquote, „sicher gekonnt", Problemkarten, Schwachstellen je Zeile (Risiko niedrig)**
- Abgeleitete Lerndaten im eigenen Konto, Grundlage wie bisher Art. 6 Abs. 1 lit. b.
- DSE Punkt 5 zählt Statistikfelder genau auf („höchstens 50 Antworten", Zeile 154). Jedes neue Feld muss dort ergänzt werden.
- Bei Texten hängen diese Daten an der Art.-9-Einwilligung; der Widerruf muss sie mitlöschen.
- Backup mit Verlauf (Fehler c) stützt Art. 20 – gut.

**6. Einladungslink, Nachliefern, Wochentakt (Risiko mittel)**
- Die bisherige Bauweise speichert keine Empfängerdaten („du erfährst nicht, wer eingelöst hat", DSE Zeile 146). So bleiben.
- Der Code gehört in den Fragment-Teil der Adresse (`#code=…`), nicht in den Pfad oder die Query, sonst steht er in den Hosting-Logs und im Referrer.
- Kein Einlösezähler und keine Empfängerliste: Die Sperre C5 gilt weiter (LEHREN:1337, GERUEST:199).
- „Nachliefern unter demselben Code" ändert die Regel „unveränderlich" (`firestore.rules:307–311`). DSE-Satz zur Aktualisierung ergänzen.

**7. Regal mit Medina Buch 1 (Risiko hoch, öffentlich)**
- Einzelne Wörter sind frei. Geschützt sein können Auswahl und Anordnung (Sammelwerk, § 4 UrhG), die Sammlung als Datenbank (§ 87a UrhG, https://www.gesetze-im-internet.de/urhg/__87a.html), Beispielsätze und Dialoge sowie fremde deutsche Übersetzungen.
- Der Autor starb 2023 (Vermutung, nicht nachgeprüft); die Schutzfrist läuft dann noch Jahrzehnte.
- Bisherige Entscheidung: „privat unter Brüdern" (`plan/PLAN.md:639`, PRUEFUNG Frage 4). Ein öffentliches Regal bricht damit.
- Sicherer: eigene deutsche Bedeutungen, Wortliste nach Häufigkeit oder Thema statt Lektion für Lektion, Buchtitel nur als Hinweis – oder eine schriftliche Erlaubnis des Verlags.
- Anwalt: ja, vor der Veröffentlichung.

**8. GPL-Morphologiedaten von corpus.quran.com (Risiko mittel–hoch)**
- Die Lizenzlage ist widersprüchlich. Die Downloadseite sagt „GNU General Public License" und zugleich „CHANGING IT IS NOT ALLOWED", Quellenangabe und Link Pflicht (https://corpus.quran.com/download/). Die Lizenzseite nennt GPLv3 (https://corpus.quran.com/license.jsp).
- Wird die Datei unverändert und getrennt ausgeliefert, mit Hinweis und Link, ist das vermutlich „Aggregation" und steckt `app.js` nicht an (Vermutung; die GPL-FAQ war nicht abrufbar).
- Sobald daraus eine eigene Wurzeltabelle gebaut wird (filtern, umformen), ist das eine Bearbeitung: nach dem Kopftext verboten, nach GPL nur unter GPL erlaubt.
- Empfehlung: den Urheber (Kais Dukes) schriftlich fragen, ob ein abgeleiteter Auszug erlaubt ist. Vorher nichts bauen.

**9. Tanzil: Druck, Export, Waqf-Teilung, Wort antippen (Risiko niedrig–mittel)**
- Lizenz CC BY 3.0 mit Zusatz: nur wortgetreue Kopien, Quelle und Link, Copyright-Vermerk in allen Kopien (https://tanzil.net/docs/text_license). Die Metadaten stehen ebenfalls unter „cc-by" (`quran/tanzil-quran-data.xml:2`).
- Druckansicht und Text-/CSV-Export mit Quran-Text brauchen eine Quellenzeile in der Ausgabe.
- Lange Ayat an Waqf-Zeichen teilen: nur in der Anzeige trennen, die Datei und die Zeichenfolge nicht ändern.
- „Ohne Harakat" für Quran-Text wäre eine Veränderung. Tanzil bietet eigene Fassungen an; sonst diese Funktion auf Karten beschränken.
- „Ähnliche Ayat (rechnerisch)" ist lizenzrechtlich unkritisch. Ob es inhaltlich passt, entscheidet der Betreiber (LEHREN § 2).

**10. „Unterstützen"-Zahlung (Risiko hoch, solange der Betreiber minderjährig ist)**
- Impressum und DSE sagen „privat und nicht-gewerblich", „kein Bezahl-Anbieter" (`impressum.html:64`, DSE Zeile 233). Mit Geldfluss stimmt beides nicht mehr.
- Privatpersonen können keine steuerlich echten Spenden annehmen; es sind Schenkungen oder, wenn regelmäßig, Einnahmen (Gewerbeanmeldung, Kleinunternehmer – Steuerberater).
- Ein Minderjähriger braucht für einen selbständigen Geschäftsbetrieb die Ermächtigung der Eltern mit Genehmigung des Familiengerichts (§ 112 BGB, https://www.gesetze-im-internet.de/bgb/__112.html).
- Zahlungsdienste verlangen in der Regel 18 Jahre (Vermutung). Praktisch liefe alles über den Vater, der schon im Impressum steht (PRUEFUNG Frage 1).
- § 5 DDG gilt für „geschäftsmäßige, in der Regel gegen Entgelt angebotene" Dienste (https://www.gesetze-im-internet.de/ddg/__5.html). Mit Zahlung ist die Impressumspflicht mit ladungsfähiger Anschrift eindeutig.

**11. Haftung für geteilte Inhalte (Risiko niedrig–mittel)**
- Geteilte Kartensätze und das Board sind Hosting. Art. 16 DSA (Meldeweg) gilt für alle Hostingdienste; die Ausnahme für Kleinunternehmen in Art. 19 betrifft nur die Plattformpflichten (Sekundärquelle: https://cms.law/de/deu/legal-updates/Vermittlungsdienste-im-DSA).
- Offen bleibt, ob ein unentgeltlicher Dienst überhaupt erfasst ist (PRUEFUNG Frage 3).
- Günstige Vorsorge: „Inhalt melden" als vorbefüllte E-Mail beim Einlösen eines Codes. Aufwand S.
- Der Einladungslink erhöht die Reichweite geteilter Inhalte, auch urheberrechtlich geschützter Lehrbuchlisten.

**12. Unkritisch (keine neuen Daten)**
- Wake Lock, Ruhetag, Urlaubsmodus, Rückkehr nach Pause, Harakat-Leiste, Handschrift, zweite Richtung, Bearbeiten in der Abfrage, Liste einfügen, die Korrekturen (a) und (b).
- Einzige Pflicht: neue Einstellungsfelder fallen unter „deine Einstellungen" in DSE Punkt 5; neue `localStorage`-Schlüssel gehören in Punkt 7.

## Teil 2 — Fragen an den Betreiber

1. **Altersangabe.** Die Texte-Einwilligung gilt rechtlich erst ab 16 ohne Eltern; die App fragt das Alter nirgends ab.
   - (a) Ein Satz „Ich bin mindestens 16" im Texte-Dialog.
   - (b) Dieselbe Angabe schon bei der Registrierung.
   - (c) Unter 16 mit Bestätigung der Eltern per E-Mail.
   - Empfehlung: (a) jetzt, (b) zur öffentlichen Freigabe. (c) braucht einen Server und speichert mehr Daten.

2. **Wer ist offiziell der Betreiber, wenn Geld fließt?** Heute steht der Vater im Impressum, die App gilt als privat.
   - (a) Kein Unterstützen-Knopf bis zur Volljährigkeit.
   - (b) Der Vater nimmt Zahlungen auf seinen Namen an, nach einem Gespräch mit einem Steuerberater.
   - (c) Familiengericht nach § 112 BGB.
   - Empfehlung: (a). Der Ertrag steht in keinem Verhältnis zu Gewerbe, Steuer und AGB.

3. **Medina Buch 1 im Regal.** Öffentlich kann die Auswahl und Reihenfolge eines Lehrbuchs geschützt sein; bisher galt „privat unter Brüdern".
   - (a) Den Verlag schriftlich um Erlaubnis bitten.
   - (b) Ein eigener Satz: häufigste Quran-Wörter mit eigenen Bedeutungen.
   - (c) Öffentlich ohne Klärung.
   - Empfehlung: (b) zuerst, (a) parallel; (c) nicht.

4. **Morphologiedaten.** Die Quelle sagt gleichzeitig „GPL" und „Ändern verboten".
   - (a) Den Urheber per E-Mail fragen und auf die Antwort warten.
   - (b) Die Datei nur unverändert und getrennt mitliefern.
   - (c) Auf Wurzel-Funktionen verzichten.
   - Empfehlung: (a), weil eine schriftliche Erlaubnis die Frage sauber beendet.

5. **Gast ohne Konto.**
   - (a) Proberunde nur auf dem Gerät.
   - (b) Anonymes Firebase-Konto.
   - Empfehlung: (a). Keine Daten bei Google, keine Regeländerung, kein Löschproblem.

6. **Selbstaufnahme.**
   - (a) Nur flüchtig: aufnehmen, anhören, weg.
   - (b) Auf dem Gerät speichern.
   - Empfehlung: (a). Dann genügt ein Satz in der Datenschutzerklärung.

7. **Anwaltstermin.** Die Abschlussdurchsicht ist seit dem 24.09. offen. Vor der öffentlichen Startseite einmal bündeln: Art. 8/9, DSA, Regal, Rechtstexte?
   - Empfehlung: ja, ein Termin mit dieser Liste, statt jede Idee einzeln zu fragen.
