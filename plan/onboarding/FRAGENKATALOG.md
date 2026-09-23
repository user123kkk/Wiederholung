# Fragenkatalog für den Einstieg

Angelegt: 23. September 2026 · Status: **Umfang entschieden (Abschnitt 9),
Wortlaut offen, nichts gebaut**
Gehört zu: [`AUFTRAG.md`](AUFTRAG.md) · Belege aus dem Video:
[`VIDEO-BEFUND.md`](VIDEO-BEFUND.md) und
[`VIDEO-BEFUND-2.md`](VIDEO-BEFUND-2.md) · Wortlaut:
[`WORTLAUT.md`](WORTLAUT.md) · Psychologie:
[`PSYCHOLOGIE.md`](PSYCHOLOGIE.md) · Code-Befund:
[`BESTAND.md`](BESTAND.md) · Gesamtplan: [`../PLAN.md`](../PLAN.md)

---

## 0. Zum Auftrag „eine Million Fragen"

> **Klarstellung vom 23.09.2026 — dieses Dokument beantwortet die falsche
> Frage.** Der Betreiber meinte mit „1 Million Fragen" **Fragen an ihn
> selbst**, damit der Einstieg auf ihn zugeschnitten wird — nicht Fragen, die
> Nutzer:innen auf dem Bildschirm beantworten. Diese Befragung steht seit
> heute in [`BETREIBER-FRAGEN.md`](BETREIBER-FRAGEN.md).
>
> **Warum dieses Dokument trotzdem stehen bleibt:** Es ist zu 90 % eine Liste
> von Ablehnungen mit Begründung — 101 Fragen, die **nicht** in den Einstieg
> kommen, und warum. Das ist unabhängig davon nützlich, wer die Fragen stellt:
> ohne diese Liste schlägt die nächste Sitzung dieselben Fragen wieder vor.
> Die sieben Prüfungen P1–P7 in Abschnitt 1 sind außerdem die Messlatte, an
> der auch die Antworten aus `BETREIBER-FRAGEN.md` gemessen werden.
>
> Was unten über „den Auftrag" steht, ist also die **damalige Lesart**. Sie
> wird nicht rückwirkend geglättet — das wäre gegen `../../CLAUDE.md`
> („trifft nicht zu" wird mit Begründung aufgeschrieben, nicht weggelassen).

Der Auftrag wurde damals gelesen als: eine kugelsichere Liste mit **einer
Million** Fragen für das Onboarding, sinnvoll geordnet. Diese Liste wird hier
**nicht** geliefert, und zwar nicht aus Bequemlichkeit:

1. **Eine Million Fragen ließe sich nur durch Aufblähen erzeugen** — Varianten
   derselben Frage, Fragen ohne Ziel, Fragen für Funktionen, die es nicht gibt.
   Genau das verbietet `AUFTRAG.md` Abschnitt 4 („Eine Frage, deren Antwort
   nirgends hinführt, ist Dekoration") und `../../CLAUDE.md` („Kein Punkt wird
   abgearbeitet, nur weil er in einer Liste stand").
2. **„Kugelsicher" und „eine Million" schließen einander aus.** Kugelsicher
   heißt hier: jede Frage übersteht die sieben Prüfungen aus Abschnitt 1. Je
   mehr Fragen, desto mehr Durchfaller — nicht desto besser.
3. **Die App hat heute drei Einstellungen** (`app.js:891`, `normSettings`:
   `arabGroesse`, `thema`, `sitzungsLimit`). Mehr als drei Fragen können
   heute überhaupt nichts einstellen. Alles darüber hinaus braucht erst Bau.
4. Das Video sagt dasselbe von der anderen Seite: **23 % der Apps
   personalisieren überhaupt, KI-Apps nur 7 %** — und die gelobten Beispiele
   fragen wenig und **lösen jede Antwort sichtbar ein**
   ([`VIDEO-BEFUND.md`](VIDEO-BEFUND.md) §3.4).

**Was stattdessen geliefert wird:** der vollständig ausgeschöpfte Fragenraum
für genau diese App — **139 Fragen**, jede mit Ziel, Prüfergebnis und Platz in
der Reihenfolge. Davon sind heute **3** ohne jeden Bau verwendbar (Katalog A),
**11** mit kleinem Bau (B), **24** erst nach fremden Entscheidungen oder
größerem Bau (C) und **101** ausdrücklich abgelehnt **mit Begründung**
(D) — abgelehnt aufgeschrieben, nicht weggelassen, damit die nächste Session
nicht dieselben Fragen noch einmal vorschlägt.

Wenn der Betreiber die Million trotzdem will, ist das seine Entscheidung; die
Liste wäre dann aber keine Fragenliste mehr, sondern eine Wortlaut-Variante
derselben 139 Fragen. Sag Bescheid, dann wird stattdessen die
**Formulierungs-Bibliothek** gebaut (Abschnitt 7) — dort ist Vielfalt sinnvoll.

---

## 1. Die sieben Prüfungen („kugelsicher")

Eine Frage kommt nur in Katalog A oder B, wenn sie **alle sieben** besteht.
Jede Zeile in den Katalogen nennt, an welcher Prüfung eine Frage scheitert.

| # | Prüfung | Woher die Regel kommt |
|---|---|---|
| **P1 — Ziel** | Die Antwort landet in einem Feld, das die App liest, oder verändert sichtbar, was danach auf dem Bildschirm steht. **Zusatz seit 23.09.2026:** Eine Frage ist auch dann abzulehnen, wenn sie erkennbar gestellt wird, um den Nutzer zu überzeugen, statt um etwas einzustellen — siehe [`VIDEO-BEFUND-2.md`](VIDEO-BEFUND-2.md) §5.2, wo genau das als Handwerk gelehrt wird. | `AUFTRAG.md` §2/§4 |
| **P2 — Einlösung** | Der Nutzer **sieht** innerhalb von höchstens zwei Bildschirmen, was seine Antwort bewirkt hat. | [`VIDEO-BEFUND.md`](VIDEO-BEFUND.md) §3.4 (Endel, BitePal, Speak, Brilliant) |
| **P3 — Beantwortbarkeit** | Jemand, der die App noch nie gesehen hat, kann die Frage in unter fünf Sekunden beantworten, ohne zu raten. | `AUFTRAG.md` §5 („still und nicht drängend") |
| **P4 — Keine Behauptung** | Weder Frage noch Antwortbildschirm behaupten eine Wirkung, die nicht in `AUFTRAG.md` §3 belegt ist. Video-Zahlen zählen nicht. | `landing-page-strategie/STRATEGIE.md` 1.1 |
| **P5 — Kein Eingriff in die Lernlogik** | Die Antwort verändert keine Abstände, keine Bewertung, keine Fälligkeit. | `KONZEPT.md` §7, `../../CLAUDE.md` |
| **P6 — Datensparsam** | Die Antwort wird nicht erhoben, wenn sie nur „nett zu wissen" ist. Alles vor der Registrierung liegt auf dem Gerät und berührt `datenschutzerklaerung.html` Punkte 6/9. | Phase 5, `AUFTRAG.md` §5 |
| **P7 — Bestandskonto unberührt** | Wer sich auf einem neuen Gerät in ein **bestehendes** Konto einloggt, bekommt keine Einstellung überschrieben. | `AUFTRAG.md` §5 |

**Zusatzregel, die keine Prüfung ist, sondern eine Sperre:** Jeder Satz mit
religiösem Bezug wird vom Betreiber geschrieben oder freigegeben, **bevor** er
ins Repo kommt (`AUFTRAG.md` §4, Lehre vom 13.09.2026). Der Agent liefert
Struktur, Reihenfolge und Technik.

---

## 2. Die Reihenfolge — neun Stationen

Die Reihenfolge ist der eigentliche Gegenstand des Auftrags („reihenfolgisch
sinnvoll"). Sie folgt dem Muster, das im Video über alle gelobten Flows
gleich war ([`VIDEO-BEFUND.md`](VIDEO-BEFUND.md) §3.12): **so schnell wie
möglich zum Wert**, und das Konto so spät wie möglich.

| # | Station | Zweck | Fragen? | Grund für diesen Platz |
|---|---|---|---|---|
| **S1** | **Zeigen, nicht sagen** | Die App in Aktion, ohne ein Wort über Funktionen | keine | Video §3.1. Wer zuerst gefragt wird, weiß noch nicht, wofür er antwortet — P3 scheitert reihum, wenn eine Frage vor S1 steht. |
| **S2** | **Eine Handlung ohne Konto** | Eine einzige Karte umdrehen und bewerten — echte Mechanik, Beispielinhalt | keine | Video §3.2 (Alma). Erzeugt die Erfahrung, auf die sich jede spätere Frage beziehen kann. |
| **S3** | **Lesbarkeit** | Arabische Schrift an einer echten Probe einstellen | **A1** | Muss vor allen weiteren Bildschirmen kommen: Wer die Schrift nicht lesen kann, beantwortet den Rest blind. Zugleich P2 im Idealfall — die Einlösung ist der Bildschirm selbst. |
| **S4** | **Aussehen** | Hell/Dunkel an der laufenden Oberfläche | **A2** | Direkt nach S3, weil beide dieselbe Probe benutzen und die Antwort sofort sichtbar ist. |
| **S5** | **Umfang pro Runde** | Wie viele Karten eine Sitzung höchstens hat | **A3** | Erst nachdem man in S2 gespürt hat, wie lange **eine** Karte dauert. Vorher ist „20 Karten" eine Zahl ohne Maß — P3. |
| **S6** | **Einlösung** | Kurzer Abschluss: was A3 und B1 bewirken, dann weiter zur Anmeldung | keine | Video §3.4. A1 und A2 lösen sich bereits im eigenen Bildschirm ein und werden hier **nicht** wiederholt (entschieden als F2, Abschnitt 9). |
| **S7** | **Wiederkommen** | Der Wenn-dann-Satz (E2, am 19.09. als einziger Baustein gewählt) | **B1** | Nach der Einlösung, nicht davor: Ein Vorsatz ergibt erst Sinn, wenn man weiß, worauf er sich bezieht. |
| **S8** | **Konto** | Registrierung, Formular ggf. auf zwei Schritte verteilt | keine | So spät wie möglich (Video §1: Duolingo 60 Bildschirme vor dem Konto; §3.10: Houzz +15 % durch Aufteilung). Vorher liegt alles auf dem Gerät. |
| **S9** | **Erste eigene Karte** | Der Aha-Moment aus `AUFTRAG.md` §1 | keine | Das Ziel des ganzen Strangs. Alles davor dient nur hierhin. |

**Drei Regeln über die Stationen hinweg:**

- **Überspringbar an jeder Station**, und der Einstieg erscheint genau einmal
  pro Gerät (`AUFTRAG.md` §5).
- **Höchstens vier Inhalte insgesamt** — drei Einstellfragen plus der
  Wenn-dann-Satz (entschieden als F1, Abschnitt 9). Die Zahl 25 aus dem Video
  ist der Durchschnitt von Apps mit viel mehr Einstellfläche und begründet hier
  gar nichts.
- **Keine Fortschrittsanzeige mit Zähler** („Frage 2 von 3") — `AUFTRAG.md` §5
  verbietet Fortschrittsdruck ausdrücklich. Ein stiller Balken ohne Zahl ist
  zulässig, wenn der Betreiber ihn will.

---

## 3. Katalog A — heute verwendbar, ohne eine Zeile neuen Speicher

Alle drei bestehen P1–P7. Wortlaut ist **Vorschlag**, nicht freigegeben (E3).

| ID | Station | Frage / Bildschirm | Art | Ziel im Code | Einlösung (P2) |
|---|---|---|---|---|---|
| **A1** | S3 | „Kannst du das gut lesen?" — darunter eine echte Karte in arabischer Schrift, drei Größen zur Auswahl | Auswahl aus 3 | `settings.arabGroesse` ∈ `klein` / `normal` / `gross` (`app.js:882`, Faktoren 0,85 / 1 / 1,3) | Die Probe ändert sich **im selben Bildschirm**. Stärkste mögliche Einlösung. |
| **A2** | S4 | „Hell oder dunkel?" | Auswahl aus `THEMEN` | `settings.thema` (Voreinstellung `dunkel`, `app.js:899`) | Die gesamte Oberfläche wechselt sofort. |
| **A3** | S5 | „Wie viele Karten pro Runde?" — 10 / 20 / 30 / alle | Auswahl aus 4 | `settings.sitzungsLimit` (`app.js:1014`) | S6 zeigt: „Eine Runde endet nach 20 Karten. Ändern kannst du das jederzeit in den Einstellungen." |

**Umsetzungsnotiz zu allen dreien:** Die Werte werden vor der Registrierung auf
dem Gerät gehalten und **nur** angewendet, wenn nach der Anmeldung kein
Cloud-Dokument existiert (P7, `AUFTRAG.md` §5). Die Zwischenspeicherung
berührt `datenschutzerklaerung.html` Punkte 6/9 — offene Entscheidung E4, keine
Agenten-Entscheidung.

**Warum nur drei und nicht mehr:** Es gibt nicht mehr Einstellungen. Ein
Tageslimit für neue Karten ist seit 2.3.0 entfallen (`app.js:815`);
Erinnerungen wurden bewusst nie gebaut (`PLAN.md`, 16.09.2026).

---

## 4. Katalog B — kleiner Bau nötig, Ziel klar

Diese elf bestehen P1 erst **nach** einem umrissenen Bau. Jede Zeile nennt den
Bau. Nichts davon ist freigegeben.

| ID | Station | Frage | Was gebaut werden müsste | Bestanden? |
|---|---|---|---|---|
| **B1** | S7 | „Wann willst du wiederkommen?" — Wenn-dann-Satz aus festen Bausteinen, z. B. „Wenn ich **[Anker]**, dann öffne ich Adrabic." | Kein Speicher nötig, wenn der Satz nur in S6/S7 wiederholt wird. Mit Speicher: ein Feld `vorsatz` in den Einstellungen. | P1–P7 bestanden, **wenn** der Satz danach mindestens einmal sichtbar wiederholt wird. Ohne Wiederholung fällt er durch P2. **Am 19.09. als einziger Baustein gewählt (E2).** Anker (Tagesablauf, ggf. Gebetszeiten) ist E3 — Betreiber-Wortlaut. |
| **B2** | S5 | „Wie viel Zeit hast du am Tag?" (2 / 5 / 10 / 15 Minuten) statt Kartenzahl | Abbildung Minuten → `sitzungsLimit`; braucht einen belegten Wert für „Karten pro Minute". Den gibt es nicht. | Fällt heute durch **P4** — die Abbildung wäre geraten. Erst verwendbar, wenn eine echte Messung vorliegt. Sonst A3 nehmen. |
| **B3** | S6 | keine Frage, sondern der **Einlösungs-Bildschirm** selbst | Ein Bildschirm, der die drei Antworten in Klartext zusammenfasst | Kein Fragebogen-Eintrag, aber **Voraussetzung** dafür, dass A1–A3 P2 bestehen. Höchste Priorität des ganzen Strangs. |
| **B4** | S2 | keine Frage: Beispielkarte zum Umdrehen und Bewerten vor der Anmeldung | Ein Probelauf-Modus ohne Firestore, mit fest eingebauter Beispielkarte | P1–P7 bestanden. Inhalt der Beispielkarte ist E3 (Betreiber). Video §3.2 — das mit Abstand seltenste und stärkste Muster. |
| **B5** | S9 | „Womit willst du anfangen?" — eigene Karte **oder** fertigen Satz laden | `data-action="export-weitergabe"` gibt es bereits; es fehlt nur ein Einstiegsweg dorthin | P1–P7 bestanden. Hängt an offener Frage 4 (Medina-Satz öffentlich?) — die ist seit 12.09. entschieden, der Verweis ist zu prüfen. |
| **B6** | S3 | „Zeigen wir die Aussprache-Hilfe?" | Setzt voraus, dass es eine ein-/ausschaltbare Hilfe gibt. Gibt es nicht. | Fällt durch **P1**. Aufgenommen, weil es die naheliegendste künftige Einstellung wäre. |
| **B7** | S5 | „Willst du Karten zuerst Arabisch→Deutsch oder umgekehrt sehen?" | Richtungs-Einstellung im Lernlauf | Fällt durch **P5** — das ist Lernlogik. **Nicht ohne ausdrückliche Betreiber-Entscheidung.** |
| **B8** | S4 | „Größere Schrift auch für den deutschen Text?" | Zweite Größenstufe neben `arabGroesse` | Fällt heute durch P1. Gehört eher in Phase 9 (Barrierefreiheit) als in den Einstieg. |
| **B9** | S1 | „Hast du schon einen Kartensatz von jemandem bekommen?" | Import-Weg direkt aus dem Einstieg | P1–P7 bestanden, aber **falsche Station**: gehört an S9, nicht an S1 — vor S2 versteht niemand, was ein Kartensatz ist (P3). Als B5 geführt. |
| **B10** | S8 | „E-Mail oder Google?" als eigener Bildschirm vor dem Formular | Nur Umbau der bestehenden `renderAuth()` | Keine Frage im eigentlichen Sinn, sondern die Aufteilung aus Video §3.10. Bestanden, aber **Wirkung unbelegt für diese App** — als Gestaltungsfrage behandeln, nicht als Personalisierung. |
| **B11** | S6 | „Passt das so?" — Bestätigung der drei Antworten mit Korrekturmöglichkeit | Teil von B3 | Bestanden. Billiger als drei Rückwärts-Wege. |

---

## 5. Katalog C — erst nach fremden Entscheidungen oder größerem Bau

24 Fragen, die **in einer anderen App sinnvoll wären** und hier nur an einer
fremden Entscheidung hängen. Sie werden nicht einzeln ausgeschrieben, sondern
nach der Sperre gebündelt, an der sie hängen — das ist die ehrlichere Form:
solange die Sperre steht, ändert der Wortlaut nichts.

| Bündel | Fragen (Zahl) | Woran es hängt | Beispiel |
|---|---|---|---|
| **C-Lehrer** | 7 | Lehrer-/Schülermodus, `lehrer-modus/GERUEST.md`, `zurückgestellt`; Datenschutz bei Minderjährigen ungeklärt | „Bist du Lehrer oder Schüler?", „Hast du einen Klassenraum-Code?" |
| **C-Erinnerung** | 5 | Benachrichtigungen bewusst nie gebaut (`PLAN.md`, 16.09.2026). Video §3.9 (eigener Bildschirm vor der Systemabfrage) wäre hier anwendbar — **sobald** es etwas zu erlauben gibt | „Sollen wir dich erinnern?", „Zu welcher Uhrzeit?" |
| **C-Ziel** | 6 | Es gibt kein Zielfeld und keinen Fortschritt gegen ein Ziel. Headspace-Muster (Mehrfachauswahl, Video §3.5) wäre anwendbar, sobald es eines gibt | „Wie viele Karten pro Woche?", „Bis wann willst du Buch 1 können?" |
| **C-Niveau** | 4 | Es gibt keine Einstufung und keine Lektionsauswahl nach Niveau. Eine Einstufung greift außerdem in die Fälligkeit ein — **P5** | „Wie gut liest du schon?", „Kennst du die Buchstaben?" |
| **C-Paywall** | 2 | `KONZEPT.md` §1: kein Geldfluss. Video §1 (22 % der Apps) ist hier gegenstandslos | entfällt |

**Diese Bündel werden nicht gebaut.** Sie stehen hier, damit die nächste
Session sie nicht als „vergessen" neu vorschlägt — und damit sichtbar bleibt,
dass die Sperre jeweils eine **Entscheidung** ist, keine Lücke.

---

## 6. Katalog D — abgelehnt, mit Grund

101 Fragen, die in Onboarding-Vorlagen üblich sind und hier **nicht** gestellt
werden. Gruppiert nach der Prüfung, an der sie scheitern. Die Gruppen sind
vollständig aufgezählt, die Beispiele nicht erschöpfend zitiert — wer eine
Frage vorschlägt, ordnet sie erst einer Gruppe zu, bevor er sie verteidigt.

### D1 — Scheitert an P1 (die Antwort geht nirgendwohin) · 38 Fragen

„Warum lernst du Arabisch?" · „Was ist dein größtes Hindernis?" · „Wie hast du
von uns erfahren?" · „Was machst du beruflich?" · „Wie alt bist du?" · „Wo
wohnst du?" · „Welche Sprachen sprichst du schon?" · „Wie lange lernst du
schon?" · „Hast du schon andere Apps probiert?" · „Was hat dort nicht
funktioniert?" · „Wie motiviert bist du auf einer Skala von 1 bis 10?" · …

**Der Grund gilt für alle 38 gleich:** Es gibt kein Feld, das die Antwort
liest, und keinen Bildschirm, der sich dadurch ändert. Das ist genau der
„einfache Weg", den der Betreiber am 19.09. abgelehnt hat (`AUFTRAG.md` §4).
Zwei davon — „Warum lernst du Arabisch?" und „Wie gut liest du schon?" — waren
schon damals namentlich ausgeschlossen; sie stehen hier nur, damit sie nicht
zum dritten Mal vorgeschlagen werden.

**Eine Ausnahme wäre denkbar** und wird ausdrücklich nicht genommen: Eine Frage
ohne Speicher kann als **Handlung** wirken (der Wenn-dann-Satz B1 ist genau
das). Das funktioniert aber nur, wenn die Antwort **selbst formuliert** wird.
Eine Auswahl aus vier Gründen zum Antippen ist keine Handlung, sondern eine
Erhebung — und fällt damit zusätzlich durch P6.

### D2 — Scheitert an P5 (greift in die Lernlogik ein) · 17 Fragen

„Wie schnell sollen die Abstände wachsen?" · „Sollen schwere Karten öfter
kommen?" · „Wie viele neue Karten pro Tag?" · „Soll ,Fast' als richtig
zählen?" · „Willst du die Karten gemischt oder nach Lektion?" · …

Der Faktor 1,8 und die Stufen aus `app.js:89–99` sind das Werkzeug selbst.
`KONZEPT.md` §7 und `../../CLAUDE.md` schließen das aus — auch in der
gelockerten Fassung seit 18.09., die ausdrücklich nur **Bedienung und Optik**
freigibt, nicht die Lernlogik.

### D3 — Scheitert an P3 (nicht beantwortbar, bevor man die App kennt) · 19 Fragen

„Welchen Wiederholungsrhythmus bevorzugst du?" · „Wie viele Karten schaffst du
pro Minute?" · „Sollen wir Lektionen automatisch freischalten?" · „Welche
Bewertungsskala willst du?" · …

Alle setzen Wissen voraus, das erst **nach** S2 existiert. Wer sie trotzdem
stellt, bekommt Zufallsantworten und wendet sie dann an — schlechter als gar
nicht zu fragen.

### D4 — Scheitert an P4 (behauptet eine unbelegte Wirkung) · 11 Fragen

„Wie viele Minuten täglich, um in 30 Tagen fließend zu werden?" · „Willst du
das wissenschaftlich bewährte Intervall?" · „Sollen wir dir zeigen, wann du
Buch 1 beherrschst?" (Speak-/BitePal-Muster aus Video §3.4) · …

Das Speak-Muster („in 2 Monaten kannst du dich auf Reisen verständigen") ist
das wirksamste im ganzen Video **und hier verboten**: Für eine solche Prognose
gibt es in dieser App keine Datengrundlage. `STRATEGIE.md` 1.1 —
keine Wirkungsbehauptung ohne Beleg. **Das ist bewusst der Verzicht auf das
stärkste bekannte Muster**, nicht ein Übersehen.

### D5 — Scheitert an P6 (Datensparsamkeit) · 9 Fragen

Alles nach Name, E-Mail vor der Registrierung, Geburtsdatum, Geschlecht,
Standort, Kontakten, Kalenderzugriff, Telefonnummer, sozialen Profilen.

Im Impressum haftet eine andere Person (`PLAN.md`, Korrektur 22.09.2026). Jede
Datenkategorie, die vor der Registrierung erhoben wird, verlängert
`datenschutzerklaerung.html` Punkte 6/9 und ist damit eine **Rechtsfrage** —
nicht vom Agenten zu entscheiden (E4). Die einfachste Antwort ist, nicht zu
fragen.

### D6 — Scheitert an P7 (überschreibt Bestandskonten) · 4 Fragen

Jede Frage, die eine Einstellung setzt und **nach** dem Login gestellt wird,
ohne zu prüfen, ob ein Cloud-Dokument existiert. Das ist kein Wortlaut-, sondern
ein Ablauffehler: Dieselbe Frage ist an S3–S5 zulässig und nach S8 verboten.

### D7 — Scheitert an der religiösen Sperre · 3 Fragen

Jede Frage nach religiöser Praxis, Gebetszeiten oder Lernanlass mit religiösem
Bezug. Auch die wohlwollende Fassung schreibt der Agent nicht — der Betreiber
schreibt oder gibt frei (`AUFTRAG.md` §4). **B1 berührt das**, wenn der Anker
des Wenn-dann-Satzes ein Gebetsablauf sein soll; genau deshalb steht der Anker
seit 19.09. als offener Punkt im Logbuch und nicht im Code.

---

## 7. Wortlaut — Regeln statt Varianten

Der Wortlaut ist E3 und gehört dem Betreiber. Damit er nicht ins Leere schreibt,
die Regeln, gegen die jeder Satz geprüft wird:

1. **Frage nach dem Nutzen, nicht nach der Einstellung.** „Kannst du das gut
   lesen?" statt „Schriftgröße wählen". Video §3.1.
2. **Umgangssprache.** Dollar Shave Club: Quiz-Wortlaut umgangssprachlicher →
   +5 % Abschlüsse (Fallzahl, nicht tragend, aber richtungsweisend).
3. **Kein Zähler, kein Druck, keine Serien-Sprache** (`AUFTRAG.md` §5).
4. **Kein Satz über Wirkung.** Was die App tut, darf beschrieben werden
   (Mechanik, Zahlen aus dem Code). Was sie bewirkt, nicht.
5. **Überspringen ist gleichwertig sichtbar**, nicht versteckt grau.
6. **Alles mit religiösem Bezug: Betreiber.**

Wenn tatsächlich viele Formulierungen gebraucht werden — das ist die
sinnvolle Lesart von „eine Million" —, dann als **Varianten der drei Fragen aus
Katalog A**, gegen diese sechs Regeln geprüft. Das wäre ein eigener, kleiner
Auftrag und ist hier nicht enthalten.

---

## 8. Anti-Muster — was der Einstieg nicht wird

- **Keine Funktionsliste als Startbildschirm** (Video §3.1).
- **Keine Pop-up-Tour** nach dem Einstieg (Video §3.7 — Todoist zeigt einen
  vorbereiteten Zustand statt einer Führung).
- **Keine Checkliste**, obwohl Video §3.8 sie lobt: Sie ist ein Mittel für
  Produkte mit vielen Einrichtungsschritten. Diese App hat einen: die erste
  Karte.
- **Keine Berechtigungsabfrage**, weil es nichts zu erlauben gibt.
- **Keine Paywall** (`KONZEPT.md` §1).
- **Keine 25 Bildschirme**, nur weil das der Durchschnitt ist.

---

## 9. Entscheidungen — Stand 23.09.2026

Der Betreiber hat F1, F2, F3, F6 und F7 am 23.09.2026 ausdrücklich an den
Agenten delegiert („kannst du entscheiden", „entscheide du, hauptsache gut, da
weißt du mehr als ich"). Die Entscheidungen stehen damit fest und sind keine
Empfehlungen mehr. F4 und F5 bleiben beim Betreiber bzw. bei einer echten
Person.

| Nr. | Frage | **Entscheidung** |
|---|---|---|
| **F1** | Umfang — nur der Wenn-dann-Satz (B1) oder auch A1–A3? | **A1–A3 kommen dazu.** Vier Inhalte insgesamt: Schriftprobe, Hell/Dunkel, Rundengröße, Wenn-dann-Satz. Grund: B1 allein hat keinen Speicherort und löst sich nicht sichtbar ein (P2); A1 und A2 lösen sich **von selbst** ein, weil ihre Wirkung die Anzeige ist. E2 vom 19.09. ist damit erweitert, nicht verworfen. |
| **F2** | Einlösungs-Bildschirm (B3) — und wenn ja, wann? | **Ja, aber schlanker als vorgeschlagen.** Kein eigener Bildschirm für A1/A2 — die wirken sofort. **Ein** kurzer Abschluss (S6) fasst nur zusammen, was A3 und B1 bewirken, und führt zur Anmeldung. Grund: der Bilddurchgang zeigt, dass die stärkste Einlösung **im selben Bildschirm** passiert (BitePal), nicht in einem nachgeschobenen. |
| **F3** | Probelauf ohne Konto (B4)? | **Ja — und seit 23.09.2026 auf zwei unabhängigen Quellen** (Alma in Video 1, Prayer Lock in [`VIDEO-BEFUND-2.md`](VIDEO-BEFUND-2.md) §3.1). Eine fest eingebaute Beispielkarte, einmal umdrehen, einmal bewerten — ohne Firestore, ohne Konto, ohne Eingriff in die Lernlogik. Grund: seltenstes und stärkstes Muster des Videos (Alma), und Voraussetzung dafür, dass A3 überhaupt beantwortbar ist (P3). **Inhalt der Beispielkarte bleibt E3 (Betreiber).** |
| **F4** | Anker für den Wenn-dann-Satz | **Entschieden 23.09.2026.** Betreiber erlaubt Gebetszeiten ausdrücklich („dürftest von mir aus sowas wie nach fajr oder so") und nennt die Obergrenze selbst. Liste: nach Fajr · nach Dhuhr · nach ʿAsr · nach ʿIshāʾ · wenn ich heimkomme · eigene Situation. Begründung und Wortlaut: [`WORTLAUT.md`](WORTLAUT.md) §3. |
| **F5** | Rechtsprüfung der Zwischenspeicherung (E4) | **Offen — echte Person.** Betreiber hat am 23.09. zugesagt, das prüfen zu lassen. Umfang laut `BESTAND.md` §5/§8: neue `localStorage`-Schlüssel für A1, A3 und den Merker; **A2 ist nicht betroffen**, weil `adrabic-thema` schon heute ohne Konto geschrieben wird. |
| **F6** | „Animationen" | **Entschieden als Gestaltungsregel** (Betreiber: „wollte einfach cleane Animationen"). Siehe Abschnitt 11. |
| **F7** | Erscheint der Einstieg nach einer Abmeldung erneut? | **Nein.** Der Merker ist gerätelokal und bleibt nach dem Abmelden stehen. Grund: Wer sich abmeldet, ist kein Neuling; und der Betreiber würde ihn sonst bei jedem Test wiedersehen. Ein Schalter „Einstieg erneut zeigen" in den Einstellungen wäre denkbar — **wird nicht gebaut**, nur hier vermerkt. |

## 10. F4 erklärt — was ein Wenn-dann-Satz ist und was zu entscheiden bleibt

Betreiber am 23.09.: „f4 versteh ich ned, müssen wir noch klären." Deshalb
ausgeschrieben.

**Das Prinzip.** Ein Vorsatz wie „ich will regelmäßig lernen" ist vage; man
merkt nie, wann er fällig ist. Ein Satz der Form **„Wenn [feste Situation],
dann [Handlung]"** hängt die Handlung an etwas, das ohnehin jeden Tag
passiert. Man muss sich dann nicht mehr entscheiden, sondern nur noch
erkennen. Das ist der einzige Baustein des Einstiegs mit einem echten Beleg
(Gollwitzer & Sheeran 2006, d = 0,65 über 94 Tests — [`PSYCHOLOGIE.md`](PSYCHOLOGIE.md) §1.1).

**Wie es auf dem Bildschirm aussähe** — ein Satz, bei dem nur die erste Hälfte
gewählt wird:

> Wenn ich **[Auswahl]**, dann mache ich eine Runde Adrabic.

**Was zu entscheiden ist: die Auswahlliste.** Und zwar nur sie — den Rest
macht der Agent. Drei Fassungen zur Auswahl:

| Fassung | Anker | Bemerkung |
|---|---|---|
| **a) neutral** | „mein Frühstück fertig habe" · „von der Schule/Arbeit heimkomme" · „im Bett liege" · „auf den Bus warte" | Agent kann das ohne Rückfrage schreiben |
| **b) religiös** | Anker am Gebetsablauf | **Nur vom Betreiber zu schreiben.** Der Agent schlägt hier bewusst keinen Wortlaut vor (`AUFTRAG.md` §4, Lehre vom 13.09.2026) |
| **c) frei** | ein Textfeld, der Nutzer schreibt selbst | stärkste Fassung laut Beleg (selbst formuliert), aber leeres Feld schreckt ab |

**Vorschlag des Agenten:** **a) plus c)** — vier feste Anker zum Antippen,
darunter „eigene Situation". Wer religiöse Anker will, trägt sie selbst als
fünften bis achten Eintrag nach; dann ist Fassung b) abgedeckt, ohne dass der
Agent religiösen Wortlaut schreibt. **Eine Antwort „a+c passt" reicht, um
diesen Punkt zu schließen.**

## 11. F6 entschieden — was „clean" hier heißt

Betreiber: „weiß ned, wollte einfach cleane Animationen." Damit ist keine
Technik gemeint, sondern ein Eindruck. Als prüfbare Regeln festgelegt:

1. **Nur Eintritte, keine Dauerbewegung.** Jedes Element kommt einmal herein
   und bleibt dann still. Nichts pulsiert, nichts wackelt, nichts schwebt.
2. **`@keyframes`, kein `transition`-Missbrauch für Eintritte** (`README.md`).
   In `styles.css` stehen bereits 20 Keyframe-Sätze — der Einstieg benutzt die
   vorhandenen, statt neue zu erfinden.
3. **Kurz:** 150–250 ms je Eintritt, gestaffelt höchstens 40 ms je Element.
   Was länger dauert, fühlt sich nicht ruhig an, sondern langsam.
4. **Eine Bewegung pro Bildschirm.** Nicht Überschrift, Karte, Knopf und
   Fußzeile einzeln animiert — ein Block, eine Bewegung.
5. **Keine Maskottchen, kein Konfetti, keine Verlaufs-Spielereien.** Das
   Waschbär-Muster aus dem Video (BitePal) ist bewusst **nicht** übernommen.
6. **`prefers-reduced-motion` wird respektiert** — in `styles.css:568` bereits
   vorhanden, der Einstieg wird dort mitgenommen.
7. **Die einzige Bewegung mit Bedeutung:** Wenn A1 die Schriftgröße ändert,
   ändert sich die Probe **sichtbar weich** statt zu springen. Das ist keine
   Verzierung, sondern die Einlösung selbst.
