# Video-Befund: „I studied 1000+ onboarding flows"

Quelle: <https://youtu.be/Qsq-Sj_rojU> (Mobbin, 10:06 min). Ausgewertet am
23.09.2026 mit dem `/watch`-Skill in **zwei Durchgängen**: erst die Untertitel
der Plattform, danach **70 Bilder** (szenenbasiert aus 128 Kandidaten,
`--detail balanced`). Der zweite Durchgang war nötig — das Video zeigt mehr,
als es sagt, und der erste Durchgang hatte drei App-Namen falsch (siehe §0.1).
Gehört zu: [`AUFTRAG.md`](AUFTRAG.md) Abschnitt 0 („Neustart des Konzepts").

---

## 0. Warum dieses Dokument getrennt steht

`AUFTRAG.md` Abschnitt 3 hält die Regel fest: **keine Wirkungsbehauptung ohne
Beleg**, und Zahlen aus Videos oder Anbieter-Blogs sind keine Belege im Sinne
einer kontrollierten Studie. Das Video ist trotzdem verwertbar — aber als
**Musterkatalog**, nicht als Wirkungsnachweis. Deshalb steht es hier und nicht
in der Belegtabelle des Auftrags.

Die Trennung, die für jede einzelne Zeile unten gilt:

| Art der Aussage | Belastbarkeit | Was damit erlaubt ist |
|---|---|---|
| **Verteilung** („22 % der Apps zeigen eine Paywall im Onboarding") | Auszählung über ~900–986 Apps in der Mobbin-Sammlung | Beschreibt, was üblich ist. Sagt **nichts** darüber, was wirkt. Als Orientierung verwendbar, nie als Begründung. |
| **Fallzahl** („Headspace: +10 % Testabschlüsse") | Einzelfall-A/B-Test einer Firma, Methodik nicht einsehbar | Darf eine Idee **anregen**, nie eine Entscheidung tragen und **niemals auf dem Bildschirm stehen**. |
| **Muster** („viele gute Flows verkaufen das Ergebnis, nicht die Funktionsliste") | qualitative Beobachtung des Autors | Brauchbar als Bauprinzip, weil überprüfbar am eigenen Entwurf. |

---

## 0.1 Korrekturen aus dem Bilddurchgang

Die Untertitel sind automatisch erzeugt und geben Produktnamen falsch wieder.
Am Bild geprüft und berichtigt:

| Untertitel sagt | Richtig ist | Was die App tut |
|---|---|---|
| „Bipul", „Bumpits" | **BitePal** | Ernährungs-App mit Waschbär-Maskottchen, **61 Bildschirme**, Quiz → Plan → Paywall |
| „Bump" (derselbe Satz) | **Bump** — eine **andere** App | „Hang with friends IRL", Social; das sind die verspielten Ladezustände und die Verifizierungs-Animation |
| „Elma" | **Alma** | „Track, learn & discover food", Health & Fitness/KI — die App, die die Kernhandlung **vor** der Anmeldung zulässt |
| „House" | **Houzz** | Renovierung; das aufgeteilte Anmeldeformular (+15 %) heißt dort „Welcome to Houzz! — Step 1 of 2" |
| „To-do apps" | **Todoist** | der vorbereitete Zustand nach der Anmeldung |
| „The site" (Paywall + Einmalangebot) | **Zoe** o. ä., am Bild nicht sicher lesbar | **nicht verwertet**, weil der Name nicht belegbar ist |

**Lehre für künftige Video-Auswertungen in diesem Repo:** Ein reiner
Untertitel-Durchgang reicht für Muster, **nicht für Namen und Zahlen auf dem
Bildschirm**. Wer einen Beleg zitieren will, braucht den Bilddurchgang.

---

## 1. Verteilungen aus der Sammlung

- Untersucht: über 1000 Onboarding-Flows, ausgezählt über ~900–986 Apps und
  Websites.
- **Durchschnitt: 25 Onboarding-Bildschirme.** Die verbreitete Regel „halte es
  kurz" deckt sich nicht mit dem, was erfolgreiche Apps tun.
- Längste Kategorien: **Finanzen, Gesundheit/Fitness, Bildung.** Sieben der
  zehn längsten Flows sind Finanz-Apps.
- Kürzeste Flows: drei der kürzesten sind **KI-Produkte**.
- **23 % personalisieren** während des Onboardings — bei KI-Apps nur **7 %**.
  KI-Produkte fragen nicht, sie lernen aus der Nutzung.
- **22 % zeigen eine Paywall** im Onboarding.
- Web-Onboarding ist **21 % kürzer als iOS** — Mobile trägt Berechtigungs- und
  Paywall-Bildschirme zusätzlich.
- Duolingo: rund **60 Bildschirme vor der Registrierung**; BitePal: 61.
- **Nur 27 % derjenigen, die personalisieren, zeigen auch eine Paywall**
  (Einblendung bei 05:1x im Bild: „the quiz-then-paywall combo is rarer than
  you think"). Die verbreitete Annahme „Quiz = Verkaufstrichter" trägt also
  nicht.
- Die Auszählung der Muster („What Patterns Appear in Onboarding?") benennt
  sechs Kategorien: **Verification, Personalization, Paywall, Social seeding,
  Tutorial, Connecting accounts.** Für diese App sind davon **zwei** überhaupt
  anwendbar (Verification gibt es bereits, Personalization ist Gegenstand
  dieses Strangs); Paywall, Social seeding und Connecting accounts sind
  ausgeschlossen, Tutorial ist bewusst abgelehnt.

**Folgerung für diesen Strang:** Die Länge ist nicht die Stellschraube. Ein
Einstieg darf mehrere Bildschirme haben, wenn jeder einzelne etwas leistet.
Umgekehrt rechtfertigt der Durchschnitt von 25 Bildschirmen **keinen** langen
Einstieg für eine App mit drei Einstellungen — die Zahl beschreibt Apps mit
weit mehr Einstellfläche.

## 2. Fallzahlen (anregend, nicht tragend)

| Fall | Maßnahme | Berichtete Wirkung |
|---|---|---|
| Headspace | Mehrfachauswahl statt „ein Ziel wählen" | +10 % Testabschlüsse |
| Dollar Shave Club | Quiz-Wortlaut umgangssprachlicher | +5 % Abschlüsse |
| Grammarly | Tarifempfehlung aus den Quiz-Antworten | ~+20 % Upgrades |
| Houzz | ein Anmeldeformular auf mehrere Bildschirme verteilt | +15 % Abschlüsse |
| Mural | sechsstufige Checkliste statt Pop-ups/Banner | +10 % relative 7-Tage-Bindung |

Keine dieser Zahlen kommt in die App. Sie stehen hier, damit die nächste
Session nicht dieselbe Recherche wiederholt.

## 3. Muster — das eigentlich Verwertbare

1. **Das Ergebnis verkaufen, nicht die Funktionsliste.** Startbildschirme, die
   das Produkt in Aktion zeigen (Timehop, Runkeeper), statt Merkmale zu aufzählen.
2. **Ausprobieren vor der Anmeldung.** Alma lässt die Kernhandlung vor dem
   Konto zu. Im Video ausdrücklich als selten hervorgehoben — besonders bei
   KI-Apps.
3. **Menschlicher Ton statt Pitch.** Handschriftliche Gründernotiz (One Year),
   Notiz nach der Kontoerstellung (Basecamp).
4. **Personalisierung muss sichtbar einlösen.** Endel, BitePal, Brilliant,
   Speak: nach den Fragen kommt ein Bildschirm, der zeigt, **was die Antworten
   bewirkt haben** — ein fertiger Plan, eine gefüllte Startseite, ein Satz wie
   „in 2 Monaten kannst du dich auf Reisen verständigen".
   **Das ist der wichtigste Punkt für uns:** Eine Frage ohne sichtbare Einlösung
   ist eine Erhebung, kein Onboarding.
5. **Mehrfachauswahl statt Einfachauswahl**, wenn Menschen mehrere Anliegen
   gleichzeitig haben (Headspace).
6. **Bildung nicht vorab abladen.** Cake Equity erklärt an der Stelle, an der
   es gebraucht wird — Tooltips, Beruhigungs-Text, Passwortfeld, das die
   Anforderungen live abhakt.
7. **Leerer Zustand mit Anstoß statt Führung durch Pop-ups.** Todoist zeigt
   einen vorbereiteten Zustand, keine Tour.
8. **Checklisten überleben den Einstieg** und wirken länger als ein Pop-up.
9. **Eigener Bildschirm vor jeder Systemabfrage** (Benachrichtigungen), der
   den Grund nennt und die Benachrichtigung vorzeigt. **Trifft hier nicht zu:**
   Benachrichtigungen sind in dieser App bewusst nicht gebaut (`PLAN.md`,
   16.09.2026).
10. **Formular aufteilen kann Abschlüsse erhöhen** — Reibung an einer Stelle
    kann Reibung an anderer Stelle wegnehmen.
11. **Kultur zählt.** Östliche Märkte vertragen informationsdichte Oberflächen
    besser; „Unordnung" für die einen ist „effizient" für die anderen. Deshalb
    lässt sich ein fremder Flow nicht abkupfern.
12. **Kernaussage des Videos:** Die besten Flows fühlen sich nicht wie
    Onboarding an. Gemeinsam ist ihnen nur eines — sie bringen Nutzer **schnell
    zum Wert**. Manchmal heißt das: gar kein Onboarding (Mobbin selbst,
    KI-Chats), weil das Produkt für sich spricht.

## 4. Was das Video für diese App **nicht** hergibt

- **Keine Zahl zur Frage „Einstieg vor der Anmeldung erhöht Registrierungen".**
  Das war schon am 19.09. der Befund und bleibt es.
- **Keine Aussage über Vokabel-/Sprachlern-Apps im Besonderen**, außer den
  Beispielen Duolingo, Brilliant und Speak — und die sind Produktbeispiele,
  keine Messwerte.
- **Nichts zu Animationen im technischen Sinn.** Das Video lobt Animationen
  (Bumpits, Focus Flight) als Stimmungsmittel, nennt aber keine Technik. Die
  Betreiber-Stichworte „Higgsfield" und „Flutter" aus `AUFTRAG.md` Abschnitt 0
  finden im Video keine Entsprechung; es bleibt bei `@keyframes` nach
  `README.md`.
- **Paywall-Muster sind gegenstandslos**: `KONZEPT.md` §1 — kein Geldfluss.

---

## 5. Bildschirm-für-Bildschirm — was der Bilddurchgang zusätzlich zeigt

Der Untertitel nennt Muster, die Bilder zeigen die **Umsetzung**. Nur das
Aufgeführte ist am Bild abgelesen, nicht aus dem Ton geschlossen.

### 5.1 Fragen, die tatsächlich gestellt werden

| App | Frage auf dem Bildschirm | Art | Was danach kommt |
|---|---|---|---|
| **Beside** | „What kind of conversations will you have in Beside?" — Business · Personal · A mix of both | Einfachauswahl, 3 Optionen | direkt der Wert-Bildschirm („Unlock your AI phone assistant") |
| **How We Feel** | „Before jumping in, let's explore why you're here." — fünf Gründe zum Ankreuzen, letzter: „Another reason not listed here" | **Mehrfachauswahl**, Schritt 2 von 9 | weitere Fragen; Fortschritt oben als „2/9" |
| **Grammarly** | „I want help with" — zwölf Chips, „Select all that apply" | Mehrfachauswahl + **„Skip personalization"** sichtbar daneben | Tarifempfehlung |
| **BitePal** | „What is your main goal?" — Lose · Maintain · Gain weight | Einfachauswahl mit Icons | „How fast do you want to achieve your goal?" mit Schieberegler |
| **BitePal** | „How fast…" — Schieberegler 0,1–1,0 kg/Woche, darunter live: „Reach your goal by 28 January 2026" | Schieberegler | „Losing 0.5 kg is a realistic target" — die App **kommentiert die Antwort** |
| **Brilliant** | Tagesabschnitte zum Ankreuzen („morning routine", „lunch break", „nightly ritual") | Mehrfachauswahl | personalisierte Kurse |
| **Houzz** | „Tell us a little about yourself" + „What projects are you working on or planning to start? (Select all that apply)" | Formular + Mehrfachauswahl | Schritt 2 von 2 |

**Drei Beobachtungen, die im Ton des Videos nicht vorkommen:**

1. **Mehrfachauswahl ist die Regel, nicht die Ausnahme** — bei vier der sieben
   Fragen oben steht „select all that apply". Das Headspace-Beispiel ist kein
   Sonderfall.
2. **Überspringen steht sichtbar daneben**, nicht versteckt (Grammarly: „Skip
   personalization" als gleichrangiger Text). Deckt sich mit `FRAGENKATALOG.md`
   Abschnitt 7 Regel 5, die vorher nur aus `AUFTRAG.md` §5 abgeleitet war —
   **jetzt am Bild bestätigt.**
3. **Die Antwort wird sofort kommentiert**, nicht erst am Ende (BitePal:
   „Losing 0.5 kg is a realistic target" **im selben Bildschirm** wie der
   Schieberegler). Das ist die **stärkste Form von P2** aus
   `FRAGENKATALOG.md` — Einlösung ohne eigenen Bildschirm. Für uns direkt
   anwendbar: A1 (Schriftprobe) und A2 (Hell/Dunkel) können genauso wirken,
   weil ihre Wirkung **die Anzeige selbst** ist.

### 5.2 Wie die Einlösung aussieht

- **BitePal:** „45 % — Personalization plan" (Ladebalken, der die Antworten
  verarbeitet), dann „Reach 60.2 kg by 28 January 2026" mit Verlaufskurve,
  dann „Now let's create account".
- **Cake Equity:** „Building your Cake account." mit drei abgehakten Zeilen
  („Setting up your company", „Customising onboarding information", „Setting
  up option plans and vesting templates"). Der Ladezustand **zeigt, was
  gerade entsteht** — kein Spinner.
- **Speak:** drei Sätze auf blauem Grund, in dieser Reihenfolge — „The secret?
  Speaking early and often, not memorizing flashcards." · „Adults can become
  fluent — even faster than kids." · „Speak turns science into speaking
  practice from Day 1."
  **Für uns bemerkenswert:** Speak baut seinen Einstieg auf einem **Angriff
  gegen Karteikarten** auf. Das ist die Gegenposition zu dieser App. Sie wird
  hier nur festgehalten, **nicht beantwortet** — eine Verteidigung der
  Karteikarte auf dem Einstiegsbildschirm wäre eine Wirkungsbehauptung (P4)
  und ist damit ausgeschlossen.
- **Todoist:** nach Anmeldung und E-Mail-Prüfung „Welcome to Todoist!" mit
  vier Häkchenzeilen und **einem** Knopf („Let's go!").
- **Outseta / Mural:** dauerhafte „Setup guide"-Checkliste mit „8 / 8
  completed" — bleibt in der Oberfläche, auch nach dem Einstieg.

### 5.3 Anmeldung — wie andere das Formular schneiden

- **Acorns:** E-Mail → Passwort mit **live abgehakten Anforderungen** →
  Zustimmung zu Bedingungen → Telefon-Bestätigung. Vier Bildschirme für das,
  was hier ein Formular ist.
- **Todoist:** Sign Up → „Check your email" mit „Resend Email" und „Already
  verified? Refresh" → Willkommen.
  **Direkt vergleichbar mit dieser App:** `renderPendingVerification()` macht
  genau das bereits.
- **Duolingo:** Startbildschirm nur Logo + „Learn for free. Forever." +
  „GET STARTED" / „I ALREADY HAVE AN ACCOUNT" — die 60 Fragen kommen
  **danach**, das Konto ganz am Schluss.

### 5.4 Was am Bild gegen eine Übernahme spricht

- **Kakao Pay** (informationsdichte koreanische Oberfläche) ist das Bild zur
  Aussage „Kultur zählt". Es belegt, dass Dichte kein Fehler sein muss — aber
  nicht, dass sie hier richtig wäre. Nicht übernehmen.
- Fast alle gezeigten Einstiege enden in einer **Paywall** oder einem
  **Konto-Zwang mit Sozialbeweis**. Beides ist hier ausgeschlossen
  (`KONZEPT.md` §1). Wer den gezeigten Ablauf eins zu eins nachbaut, baut den
  Trichter einer Bezahl-App nach.
