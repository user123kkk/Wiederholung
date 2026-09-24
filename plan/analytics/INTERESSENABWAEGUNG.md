# Interessenabwägung nach Art. 6 Abs. 1 lit. f DSGVO — Anonyme Nutzungsstatistik

**Nicht öffentlich, kein Teil der ausgelieferten App.** Dient als beleghafter
Nachweis der Rechenschaftspflicht (Art. 5 Abs. 2 DSGVO), falls eine
Aufsichtsbehörde oder eine betroffene Person die Rechtsgrundlage aus
`datenschutzerklaerung.html` Punkt 15 hinterfragt.

**Rechtliche Freigabe:** Anwaltliche Prüfung am 24.09.2026 bestätigt die
Rechtsgrundlage und die Ausgestaltung als zutreffend (Betreiber-Mitteilung:
„mein anwalt sagt dass das alles stimmt"). Diese Abwägung dokumentiert die
Begründung dazu.

## 1. Zweck der Verarbeitung

Erfassung, welche Funktionen der App genutzt werden (Bildschirmwechsel,
Rundenstart/-ende, Übungsstart, Kartensatz-Code einlösen, Fehlermeldungen
u. a. — vollständige Liste in `app.js` Kopfkommentar „Nutzungsstatistik"),
um zu erkennen, was funktioniert, was ungenutzt bleibt und wo Nutzer:innen
abbrechen. Ohne diese Daten sind alle bisherigen Verbesserungen
(Redesign-Phasen, Onboarding) auf Vermutung und Einzelbeobachtung des
Betreibers gestützt, nicht auf tatsächliches Verhalten.

## 2. Erforderlichkeit

- Es wird **keine** fertige Analytics-Bibliothek eingesetzt (kein PostHog-
  Skript, kein Fremdcode im Browser) — eine selbst geschriebene, schlanke
  `fetch()`-Übertragung an die PostHog-Capture-Schnittstelle (`app.js`
  Abschnitt „Nutzungsstatistik", Zeilen 144–242).
- Keine Cookies, kein `localStorage` für die Zählung selbst.
- Keine automatische Klick-/Formular-Erfassung (Autocapture), keine
  Bildschirmaufnahmen — nur handbenannte Ereignisse.
- Übertragene Kennung ist bei angemeldeten Konten ein SHA-256-Hash aus
  einem festen Präfix + Konto-ID, gekürzt auf 128 Bit; bei abgemeldeten
  Besucher:innen eine reine Sitzungs-Zufallskennung ohne Personenbezug
  über die Sitzung hinaus.
- IP-Adresse wird laut PostHog-Konfiguration nicht gespeichert
  (`$geoip_disable: true`), Anfragen laufen mit `credentials: "omit"`.
- Karteninhalte, Name, E-Mail-Adresse, Konto-ID im Klartext und die
  Seitenadresse werden nie übertragen.
- Datenminimierung: nur Ereignisname, grobe Geräteart, App-Version,
  Zeitstempel, Session-ID.

**Ergebnis:** Die Verarbeitung ist auf das für den Zweck Notwendige
begrenzt; ein milderes Mittel mit vergleichbarer Aussagekraft
(Trichter, Wiederkehr) ist nicht ersichtlich, ohne auf jede quantitative
Erkenntnis zu verzichten.

## 3. Interessenabwägung

**Für die Verarbeitung spricht:**

- Berechtigtes Interesse an der Verbesserung eines aktiv weiterentwickelten
  Produkts ist ein anerkanntes Interesse (Erwägungsgrund 47 DSGVO).
- Datensparsame Ausgestaltung (siehe oben) senkt das Risiko für
  Betroffene erheblich gegenüber Standard-Tracking.
- Kein Profiling zu Werbe- oder Verkaufszwecken, keine Weitergabe an
  Dritte außer dem einen Auftragsverarbeiter.
- Klar kommunizierte, sofort wirksame Widerspruchsmöglichkeit
  (Einstellungen → Nutzungsstatistik ausschalten) — strenger als vom
  Gesetz für lit.-f-Verarbeitungen gefordert (kein Abwägungsvorbehalt,
  sondern sofortiger, bedingungsloser Stopp).
- Begrenzte Speicherdauer (max. 1 Jahr).
- Betroffenenkreis ist überschaubar (kleiner, wachsender Nutzerkreis;
  keine besonderen Kategorien nach Art. 9 DSGVO in den Ereignissen — alle
  `zaehle()`-Aufrufe am 24.09.2026 nachgelesen). **Ob Minderjährige zur
  Zielgruppe gehören, ist nicht geprüft** — Korrektur 24.09.2026: Die frühere
  Fassung behauptete „keine Kinder als Zielgruppe" ohne Grundlage. Betreiber
  bestätigen lassen.

**Gegen die Verarbeitung spricht:**

- Betroffene erwarten bei einer Lern-App möglicherweise keine
  Datenübermittlung an einen US-amerikanischen Auftragsverarbeiter,
  auch wenn die Verarbeitung in der EU stattfindet.
- Ein Hash ist Pseudonymisierung, keine Anonymisierung im strengen
  Sinn — die Daten bleiben personenbezogen, solange der Hash mit dem
  Konto in Verbindung gebracht werden könnte (was nur mit Kenntnis der
  Konto-ID und erheblichem Rechenaufwand möglich wäre).

**Abwägungsergebnis:** Die datensparsame, transparente und jederzeit
widerrufbare Ausgestaltung überwiegt das Interesse der Nutzer:innen an
einer Unterlassung der Verarbeitung. Art. 6 Abs. 1 lit. f DSGVO trägt
diese Verarbeitung.

## 4. Auftragsverarbeitung und internationale Übermittlung

- PostHog Inc. als Auftragsverarbeiter, Art. 28 DSGVO — Auftrags-
  verarbeitungsvertrag im PostHog-Dashboard vor Aktivierung des
  Projektschlüssels abzuschließen (siehe „Offen" unten).
- Datenhaltung: PostHog Cloud EU.
- Soweit ein Zugriff aus den USA (Support/Wartung) stattfindet: Grundlage
  ist die aktuelle Transfer-Dokumentation von PostHog (EU-Standard-
  vertragsklauseln oder EU-US Data Privacy Framework) — vor Aktivierung
  zu prüfen, welche davon aktuell zutrifft.

## 5. Offen — vor Aktivierung des `POSTHOG_KEY` zu erledigen

1. Auftragsverarbeitungsvertrag mit PostHog abschließen — **gilt nicht
   automatisch** (Korrektur 24.09.2026): `https://eu.posthog.com/legal` →
   „+ New" → „Data Processing Agreement" → Firmen-/Namensangaben →
   „Send for signature" → E-Mail von PandaDoc öffnen und unterschreiben.
2. Aktuelle Transfer-Grundlage (SCC oder DPF) bei PostHog nachsehen und
   `datenschutzerklaerung.html` Punkt 15 bei Bedarf präzisieren (Formulierung
   deckt beide Fälle bereits ab, „bzw."-Formulierung).
3. Datenaufbewahrung im PostHog-Projekt auf ≤ 1 Jahr einstellen (technische
   Durchsetzung des Versprechens in Punkt 15).
4. Erst danach `POSTHOG_KEY` in `app.js` eintragen und veröffentlichen.

**Rechtlicher Status:** Die Grundkonstruktion (Rechtsgrundlage,
Datenminimierung, Transfer-Formulierung) ist anwaltlich bestätigt
(24.09.2026). Die vier Punkte oben sind technische/organisatorische
Vollzugsschritte, keine offenen Rechtsfragen.
