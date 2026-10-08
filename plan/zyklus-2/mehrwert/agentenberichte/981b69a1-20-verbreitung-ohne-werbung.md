# Verbreitung ohne Werbung

Wörtlich aus dem Chat 981b69a1, Agent 20, gestartet 2026-10-07 15:55 (Quelle: `agent-a2ba1499bfbba7a0d.jsonl`).
Nichts gekürzt, nichts umgeschrieben.

## Auftrag an den Agenten

GEMEINSAMER RAHMEN (gilt strikt):
Du bist einer von 13 Agenten der ZWEITEN Runde für die App "Adrabic" im Repo C:\Users\USER\Wiederholung (Karteikarten-PWA zum Arabischlernen, Version 3.18.10, Vanilla JS ohne Build; Browser spricht direkt mit Firebase Auth + Firestore, KEIN eigener Server; Adresse derzeit adrabic.web.app). Betreiber ist ein Einzelner (minderjährig), Nutzer bisher er und wenige Freunde; Ziel: öffentliche, ernsthafte Lern-Website für deutschsprachige Muslime, die Quran-/klassisches Arabisch lernen. Neu im Probelauf: "Texte auswendig lernen" mit Quran aus Tanzil-Daten.
Der Betreiber hat entschieden: Er will ALLES Nützliche aus Runde 1 bauen. Runde 2 soll tiefer und weiter schauen.
ERGEBNIS RUNDE 1 (darauf aufbauen): Es gibt keine indexierbare Seite (index.html noindex, robots.txt sperrt sie, landing.html seit 3.9.0 gelöscht). Geplant: öffentliche statische Startseite, Proberunde ohne Konto, Seite "Was wir nicht tun – und wo du es nachprüfst", Vergleichsseite "Adrabic oder Anki?", Lehrer-Einstiegsseite, Einladungslink für Lektions-Codes, Regal mit Betreiber-Kartensätzen (zuerst Medina Buch 1), Liste einfügen, Texte/Hifz-Wiederholplan kostenlos ohne Mikrofon, Druckansicht, Export. Positionierungsvorschlag: "Was du im Arabischunterricht lernst, bleibt" + Lehrer als Vertriebsweg + Texte als zweite Säule. Nicht bauen: Tracking, Testimonials/Nutzerzahlen bei einer Handvoll Nutzern, Abo.
HARTE REGELN: NUR LESEN im Repo. Keine Datei anlegen/ändern, keine git-Befehle außer lesenden, nichts ausführen. Projektregeln: Religiöser Rahmen ausschließlich Quran und Sunnah nach dem Verständnis der Salaf; kein Agent verfasst religiöse Inhalte oder Werbetexte mit religiösem Wortlaut (Wortlaut kommt vom Betreiber); keine Sekten/Organisationen/Bewegungen/Politik nennen oder als Kanal empfehlen, auch nicht als Abgrenzung – Kanäle nur der ART nach beschreiben (z. B. "Arabisch-Institute", "Moschee-Kurse"), keine konkreten Prediger, Vereine oder Verbände empfehlen. Keine Dark Patterns, kein Tracking.
AUSGABEFORMAT (Deutsch, max. ca. 1000 Wörter): Teil 1 "Befunde/Ideen" (8–14 Punkte; je Punkt: Titel, was genau, Nutzen, Aufwand S/M/L, Abhängigkeiten, Risiko/Gegenargument, Beleg Datei:Zeile oder URL). Teil 2 "Fragen an den Betreiber" (3–8 Fragen, jede mit 2–3 Sätzen Hintergrund, Auswahlmöglichkeiten und Empfehlung, sodass er ohne Nachschlagen antworten kann). Ungeprüftes als Vermutung kennzeichnen.

DEIN AUFTRAG: Wie erfährt die Zielgruppe überhaupt davon – ohne Werbung, ohne Tracking, als Einzelner? Lies plan/landing-page-strategie/STRATEGIE.md, BEFUND.md, ANLEITUNG.md, plan/phase-7-seo/ (alles), plan/phase-6-startseite/, plan/phase-4-domain-hosting/, sitemap.xml, robots.txt, manifest.json, index.html (head). Recherchiere im Web: Wonach sucht die Zielgruppe auf Deutsch tatsächlich (Suchbegriffe rund um "Arabisch lernen Quran", "Madinah Arabisch Vokabeln", "Medina Buch 1 Vokabeln", "Quran auswendig lernen Plan/App", "arabische Vokabeln lernen App", "Karteikarten Arabisch") – was steht heute auf Seite 1 (Art der Seiten, Qualität, Lücken)? Welche Inhalte könnte Adrabic als statische, wirklich nützliche Seiten anbieten, die für sich Mehrwert sind und gefunden werden (z. B. druckbare Vokabellisten je Lektion aus dem Regal, eine Seite je Sure mit Lernfortschritt-Einstieg aus den Tanzil-Daten – Lizenzauflagen beachten, Wiederholplan-Rechner fürs Auswendiglernen, Anleitung "arabische Tastatur mit Harakat auf iPhone/Android/Windows einrichten", "Anki oder Adrabic", "Wie Wiederholen in Abständen funktioniert")? Technik ohne Build: statische HTML-Seiten im selben Hosting, canonical, strukturierte Daten (welche Typen sind sinnvoll und ehrlich: SoftwareApplication, FAQPage, HowTo – aktuellen Stand der Google-Unterstützung prüfen), Open-Graph-Vorschaubild für WhatsApp/Telegram-Links (wichtig für Einladungslinks!), eigene Domain statt web.app (Vertrauen, E-Mail-Zustellbarkeit der Bestätigungsmails), Eintrag in App-Verzeichnissen/PWA-Stores, Play Store per TWA. Mund-zu-Mund-Mechanik ohne Druck: was macht einen Lehrer oder Lernenden bereit, den Link in die Kursgruppe zu stellen (druckbares Blatt mit QR-Code für den Unterricht, "Lektion der Woche"-Link, Fortschritt als Bild)? Welche einfache, trackingfreie Messung sagt, ob es wirkt (Search Console, Hosting-Zugriffszahlen)? Reihenfolge nach Wirkung pro Aufwand.

## Bericht des Agenten

# Runde 2 – Auffindbarkeit ohne Werbung und Tracking

Vorbehalt zur Recherche: Mein Suchwerkzeug liefert US-Ergebnisse. Aussagen über "Seite 1 auf Deutsch" sind deshalb Vermutungen. Die Punkte zu Google-Rich-Results, zur Tanzil-Lizenz und zum Repo sind geprüft.

## Teil 1 – Befunde/Ideen (nach Wirkung pro Aufwand)

**1. Der Ist-Zustand widerspricht sich und ist als Link nackt**
- Was: `sitemap.xml:4` meldet `/` an, das ist aber `index.html` mit `noindex, nofollow` (`index.html:18`). `robots.txt:2` sperrt zusätzlich `/index.html`. `index.html` hat keine Beschreibung und keine Open-Graph-Angaben, der Titel ist nur "Adrabic" (`index.html:15`). Ein `og:image` gibt es im ganzen Repo nicht.
- Nutzen: Jeder in WhatsApp oder Telegram geteilte Link erscheint heute ohne Bild und ohne Text. Das zu beheben ist Voraussetzung für alles Weitere.
- Aufwand: S.
- Abhängigkeit: Die öffentliche Startseite aus Runde 1 wird `/`, die App zieht z. B. nach `/app`.
- Risiko: `start_url` und `scope` im Manifest (`manifest.json:6-7`) und der Service Worker müssen mitziehen, sonst brechen installierte Apps.

**2. Vorschaubild und OG-Angaben auf jeder öffentlichen Seite, auch auf dem Einladungslink**
- Was: Ein statisches PNG 1200×630 unter 300 KB, mit absoluter URL, plus `og:title` und `og:description` je Seite.
- Grenze: Ohne Server ist kein Bild je Lektions-Code möglich. Alle Einladungslinks zeigen dieselbe Vorschau, etwa "Einladung zu einer Lektion". Der Code gehört in den Hash (`/einladung#CODE`), nicht in die Query.
- Aufwand: S.
- Risiko: WhatsApp cached Vorschauen lange, es muss beim ersten Mal stimmen. Der Bildtext kommt vom Betreiber.

**3. FAQPage und HowTo bringen bei Google nichts mehr**
- Was: FAQ-Rich-Results wurden laut mehreren Berichten am 7. Mai 2026 eingestellt, HowTo schon 2023. Beide fehlen in Googles aktueller Galerie (geprüft: developers.google.com/search/docs/appearance/structured-data/search-gallery). Die Phase-7-Begründung "Google verlangt das für Rich-Snippets" (`plan/phase-7-seo/LOGBUCH.md:45-46`) ist überholt.
- Sinnvoll und ehrlich bleiben: `SoftwareApplication` (WebApplication, Preis 0, ohne `aggregateRating`, weil es keine echten Bewertungen gibt), `BreadcrumbList`, `Organization`.
- Aufwand: S.
- Risiko: "Software app" zeigt ohne Bewertung meist kein Sternchen-Snippet, der Gewinn ist klein.

**4. Vokabelseite je Lektion aus dem Regal (stärkster Suchinhalt)**
- Was: Eine statische Seite je Lektion mit Tabelle Arabisch/Deutsch, Druck-CSS und dem Knopf "Diese Lektion als Karten lernen". Dazu eine Übersichtsseite je Buch.
- Nutzen: Zu "Medina Buch 1 Vokabeln" fand ich vor allem PDF-Schlüssel auf archive.org, Anki-Decks, Quizlet-Sets und englische Kursseiten. Eine saubere deutsche, druckbare HTML-Seite je Lektion habe ich nicht gefunden (Vermutung, da US-Suche). Suchende schreiben "Medina" und "Madinah", beide Schreibweisen gehören auf die Seite.
- Aufwand: M. Ohne Build heißt das von Hand oder mit einem lokalen Erzeugerskript, das fertiges HTML committet.
- Abhängigkeit: Urheberrecht am Buchwortschatz, offen seit `STRATEGIE.md:164`. Der Wortlaut kommt vom Betreiber (`STRATEGIE.md:199-201`).
- Risiko: Der Vater haftet. Ohne Klärung nicht veröffentlichen.

**5. Wiederholplan-Rechner fürs Auswendiglernen**
- Was: Eine statische Seite mit Eingabe (Zeilen pro Tag, Starttermin) und Ausgabe als druckbarer Plan nach den echten App-Stufen 1·2·3·6·10·19·34·61·110·180 Tage (`BEFUND.md:147`).
- Nutzen: Die Treffer zu Hifz-Plänen sind fast nur englische Akademie-Blogs und App-Store-Einträge. Ein deutsches, kontoloses Werkzeug fehlt dort (Vermutung).
- Aufwand: M. Eigenes JS aus `'self'` ist CSP-konform (`firebase.json:60`).
- Risiko: Nur Mechanik zeigen. Keine religiösen Ratschläge und keine Wirkungsbehauptung (`STRATEGIE.md:74-77`).

**6. Anleitung "Arabische Tastatur mit Harakat einrichten" (iPhone/Android/Windows)**
- Was: Eine rein technische Schrittfolge mit eigenen Bildschirmfotos.
- Nutzen: Die deutschen Treffer sind dünn (giga.de nur Android, sonst Englisch). Die Seite hilft auch beim eigenen "Liste einfügen".
- Aufwand: S–M.
- Risiko: Menüpfade veralten, also Datum und Systemversion dazuschreiben. Passt nur lose zum Kern.

**7. "Wie Wiederholen in Abständen funktioniert" und "Adrabic oder Anki?"**
- Was: Beide Seiten sind in Runde 1 geplant. Für die Suche zählt, dass sie Stufenzahlen und konkrete Unterschiede nennen. Das Anki-Deck zu Madinah Buch 1 existiert (ankiweb.net/shared/info/1621926215) und sollte fair erwähnt werden.
- Aufwand: S je Seite.
- Risiko: Kein "wissenschaftlich" (`STRATEGIE.md:256-263`).

**8. Eine Seite je Sure: nicht bauen**
- Was: Die Tanzil-Lizenz erlaubt nur unveränderte Kopien mit Quellenangabe und Link auf tanzil.net (geprüft: tanzil.net/docs/text_license, im Repo `app.js:11654`, `impressum.html:74-77`). 114 Textseiten wären Dubletten großer Quran-Portale ohne eigenen Mehrwert, und jeder Darstellungsfehler wiegt schwer.
- Stattdessen: Eine Übersichtsseite "Texte lernen: Sure wählen" mit Aya-Zahlen und Einstieg in die App. Erst wenn Texte freigegeben sind (derzeit nur Betreiberkonto).
- Aufwand: S.

**9. Unterrichtsblatt mit QR-Code**
- Was: Die Druckansicht einer Lektion bekommt Kopfzeile, Lektions-Code und QR-Code zum Einladungslink. Der QR-Code wird clientseitig mit eigenem Code erzeugt oder steht als festes PNG je Regal-Lektion bereit.
- Nutzen: Der Lehrer verteilt ohnehin Blätter. Der Link wandert ohne Bitte ums Teilen in den Kurs. Das ist der beste Mund-zu-Mund-Hebel.
- Aufwand: M.
- Abhängigkeit: Einladungslink und Druckansicht aus Runde 1.
- Risiko: Der QR-Code muss dauerhaft gültig bleiben, die URL-Struktur vorher festlegen.

**10. "Lektion der Woche" und Fortschritt als Bild: zurückstellen**
- Was: Die "Lektion der Woche" ist nur ein Einladungslink, den der Lehrer selbst postet. Dafür reicht ein Knopf "Link kopieren" mit vorformuliertem neutralem Satz. Das Fortschrittsbild (Canvas zu PNG) erzeugt Vergleichsdruck und passt schlecht zum Rahmen.
- Aufwand: S bzw. M.
- Urteil: Den Kopierknopf bauen, das Fortschrittsbild lieber nicht.

**11. Eigene Domain**
- Nutzen: Vertrauen auf dem gedruckten Blatt und im Messenger, stabile QR-Codes, eigener Absender für Bestätigungsmails statt `…firebaseapp.com`. Bessere Zustellbarkeit ist eine Vermutung.
- Aufwand: M, rund 10–15 € im Jahr.
- Umzugspflichten: Authorized Domains, Browser-Key-Freigabe, CSP `frame-src`, neue Search-Console-Property, canonical und Sitemap. Genau diese Stellen sind am 18.09. einzeln gebrochen (`plan/phase-4-domain-hosting/LOGBUCH.md:98-118`, `668-714`).
- Reihenfolge: Vor dem Druck von QR-Blättern und vor dem Anlauf der Indexierung. Ein späterer Umzug kostet Ranking und macht Ausdrucke ungültig.

**12. Play Store per TWA: jetzt nicht**
- Was: Ein Entwicklerkonto verlangt 18+, Identitäts- und Adressnachweis und für neue Privatkonten einen 14-tägigen geschlossenen Test mit 12 Testern (Websuche, nicht an Googles Originalseite gegengeprüft). Das Konto müsste also der Vater führen.
- Stattdessen: Eine Anleitungszeile "Zum Startbildschirm hinzufügen". Ein Eintrag in PWA-Verzeichnissen bringt wenig Reichweite (Vermutung).

**13. Messung ohne Tracking**
- Search Console: Suchbegriffe, Klicks und indexierte Seiten je URL. Vier Wochen nach Livegang die Hypothesen aus `STRATEGIE.md:373-377` gegen echte Begriffe tauschen.
- Firebase-Konsole: Zahl der Konten.
- Eigene Daten: Zahl eingelöster Lektions-Codes je Lektion, ohne Personenbezug.
- Hosting-Nutzung: Nur Datenmenge, keine Seitenaufrufe (Vermutung). Cloud-Logging mit IP-Adressen nicht einschalten, das wäre Tracking durch die Hintertür.
- Aufwand: S.

## Teil 2 – Fragen an den Betreiber

**F1. Eigene Domain jetzt?**
Jeder gedruckte QR-Code und jeder Google-Eintrag hängt an der Adresse. Ein Umzug danach kostet doppelt. Die Domain müsste auf Deinen Vater laufen.
- a) jetzt, vor der Startseite
- b) nach den ersten Seiten
- c) gar nicht

Empfehlung: a.

**F2. Dürfen Vokabellisten aus Medina Buch 1 öffentlich als Seiten stehen?**
Das wäre der stärkste Suchinhalt, aber die Urheberrechtsfrage ist seit dem 13.09. offen und Dein Vater haftet.
- a) erst klären (Verlag oder Rechteinhaber fragen), dann bauen
- b) nur eigene Wortlisten veröffentlichen
- c) Listen nur hinter dem Lektions-Code

Empfehlung: a. Bis dahin c.

**F3. Wohin zieht die App?**
Die Startseite braucht `/`. Die App muss auf einen eigenen Pfad, und installierte Apps müssen weiterlaufen.
- a) `/app`
- b) App bleibt auf `/index.html`, Startseite wird `/start`
- c) Subdomain

Empfehlung: a, mit Weiterleitung und Test auf dem iPhone.

**F4. Sure-Seiten?**
Die Lizenz erlaubt nur unveränderten Text mit Quellenlink. 114 Seiten wären Dubletten großer Portale.
- a) keine Sure-Seiten, nur eine Übersichtsseite
- b) alle 114
- c) später entscheiden

Empfehlung: a.

**F5. Wer schreibt den Text fürs Vorschaubild und für den Einladungssatz?**
Er erscheint in jeder Kursgruppe und sollte ohne religiösen Wortlaut vom Agenten auskommen.
- a) Du lieferst beide Sätze
- b) Ein Agent schlägt drei neutrale Fassungen vor, Du wählst

Empfehlung: b, streng sachlich.

**F6. Play Store?**
Er braucht ein Konto eines Volljährigen mit Ausweisprüfung und 12 Testern über 14 Tage.
- a) jetzt über den Vater
- b) frühestens bei rund 50 aktiven Nutzern
- c) nie

Empfehlung: b.

**F7. Fortschritt als teilbares Bild?**
Es verbreitet die App, erzeugt aber Vergleich und Zurschaustellen.
- a) bauen
- b) nicht bauen, nur der Link-kopieren-Knopf
- c) nur für Lehrer als Klassenübersicht

Empfehlung: b.

**F8. Tastatur-Anleitung als eigene Seite?**
Sie ist nützlich und vermutlich gut auffindbar, gehört aber nicht zum Kern und muss gepflegt werden.
- a) ja, eine Seite für alle drei Systeme
- b) nur als Hilfeabschnitt bei "Liste einfügen"
- c) nein

Empfehlung: a, mit Datum und Systemversion.

## Reihenfolge

1 → 2 → 11 (Domain, falls ja) → Startseite mit 3 → 7 → 9 → 5 → 4 (nach Rechtsklärung) → 6 → 13 laufend. Nicht bauen: 8 in der Vollform, 12, das Fortschrittsbild aus 10.
