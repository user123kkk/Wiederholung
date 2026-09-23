# Wortlaut des Einstiegs — jeder Bildschirm, Wort für Wort

Angelegt: 23. September 2026 · Status: **gebaut in v3.9.9.** Abweichungen, die
sich erst beim Bauen zeigten, stehen in Abschnitt 6 — dieses Dokument und der
Code stimmen überein.
Gehört zu: [`FRAGENKATALOG.md`](FRAGENKATALOG.md) (Umfang, Stationen) ·
[`PSYCHOLOGIE.md`](PSYCHOLOGIE.md) (was belegt ist) ·
[`BESTAND.md`](BESTAND.md) (wo es im Code einhakt)

---

## 0. Freigabe — warum der Agent hier religiöse Anker schreibt

`AUFTRAG.md` §4 und `../../CLAUDE.md` halten seit dem 13.09.2026 fest: **Der
Agent schreibt keine religiösen Inhalte; der Betreiber schreibt sie oder gibt
sie frei, bevor sie ins Repo kommen.** Diese Regel ist nicht aufgehoben, sie
ist an **einer** Stelle ausdrücklich vom Betreiber geöffnet worden.

**Betreiber am 23.09.2026, wörtlich:**

> „f4 alles klar, es soll passen, weis ned, dürftest von mir aus sowas wie nach
> fajr oder so idc, man kann ja schlecht 20 auswahlen haben."
> „e3 ich gebe frei, sachen die einem talab al ilm gehören eben"

Damit ist zweierlei entschieden:

1. **Gebetszeiten dürfen als Anker im Wenn-dann-Satz stehen** (F4).
2. **Der Wortlaut aller Bildschirme ist freigegeben** (E3), im Ton dessen, was
   zu einem *ṭālib al-ʿilm* gehört.

**Was der Agent daraus trotzdem nicht ableitet** — die Grenze bleibt, wo sie
war:

- **Keine religiösen Zitate**, kein Qurʾān-Vers, kein Hadith, keine Duʿāʾ, keine
  Formeln. Die Gebetsnamen stehen hier als **Tageszeiten**, weil sie die
  zuverlässigsten festen Punkte im Tag sind — nicht als religiöse Aussage.
- **Kein Satz über den religiösen Wert des Lernens.** Auch ein wohlmeinender
  wäre eine Behauptung, die der Agent nicht zu machen hat.
- **Keine Ermahnung, kein Appell.** Ein Einstieg, der belehrt, ist kein
  Einstieg.

Die Umschrift der Gebetsnamen steht in Abschnitt 3 und ist in einer Zeile
änderbar — der eine Punkt, an dem eine falsche Entscheidung sichtbar wäre.

---

## 1. Tonfall — sechs Regeln, gegen die jeder Satz unten geprüft ist

1. **Sachlich, nicht werbend.** Die App beschreibt, was sie tut. Sie verspricht
   nichts.
2. **„Du", knapp, ohne Anbiederung.** Kein „Super!", kein „Toll gemacht!".
3. **Kein Wort über Wirkung** — nichts über schneller, besser, wissenschaftlich
   (P4, `FRAGENKATALOG.md` §1).
4. **Kein Druck.** Kein Zähler, keine Serie, kein „nur noch zwei Schritte".
5. **Jede Antwort ist rücknehmbar**, und das steht dabei.
6. **Überspringen steht gleichrangig daneben**, nicht kleiner und nicht grau
   ([`VIDEO-BEFUND.md`](VIDEO-BEFUND.md) §5.1, Grammarly).

---

## 2. Die Bildschirme

Notation: **H** = Überschrift · **T** = Fließtext · **K** = Knopf ·
**A** = Hilfstext für Bildschirmleser. `data-action` ist der Wert für den
bestehenden delegierten Klick-Listener (`app.js:4707`), **kein neuer Listener**
(`README.md`).

### S1 · Zeigen, nicht sagen

> **H** Du hast es gelernt. Und es ist weg.
> **T** Die Wörter von letzter Woche. Die Lektion von letztem Monat. Nicht,
> weil du zu langsam bist – sondern weil du sie nie wieder gesehen hast.
> **T** Adrabic bringt dir jedes Wort zurück. In wachsenden Abständen, so
> lange, bis es sitzt.
> **K** Zeig mir das `data-action="einstieg-weiter"`
> **K** Überspringen `data-action="einstieg-ueberspringen"`

**Geändert am 23.09.2026 auf Betreiber-Wunsch:** „das problem soll schmerzhaft
benannt werden ja." Die frühere Fassung („Arabisch, Karte für Karte. — Sieh dir
kurz an, wie es läuft.") zeigte nur und benannte nichts; Video 2 verlangt
Problem **und** Lösung in den ersten Bildschirmen
([`VIDEO-BEFUND-2.md`](VIDEO-BEFUND-2.md) §6).

**Warum das trotzdem P4 besteht:** Der erste Absatz behauptet nichts über
**diese App** — er benennt den Grund, warum es Karteikarten überhaupt gibt.
Der zweite beschreibt reine Mechanik (wachsende Abstände, `app.js`), keine
Wirkung. Es steht kein Zeitraum darin, keine Zahl und kein Versprechen.

### S2 · Eine Karte, einmal ausprobiert

**Vorderseite:**

> **H** Probier eine Karte.
> **T** Tipp die Karte an, um sie umzudrehen.
> **A** Beispielkarte, Vorderseite. Antippen dreht die Karte um.

**Nach dem Umdrehen** — die drei Knöpfe der App, unverändert benannt:

> **T** Wie sicher war das?
> **K** Nicht · **K** Fast · **K** Sicher `data-action="einstieg-bewerten"`

**Danach, ein Satz, der die Mechanik erklärt statt sie zu behaupten:**

> **T** „Nicht" bringt die Karte gleich wieder. „Sicher" legt sie länger weg.
> Mehr ist es nicht.
> **K** Weiter

**Inhalt der Beispielkarte:** im Code steht كِتَابٌ („Buch") als Platzhalter —
ein Wort ohne religiösen Gehalt, weil der Einstieg die Mechanik zeigt und nicht
den Stoff. Ersetzbar in einer Zeile, siehe Abschnitt 5, Punkt 1.

„Mehr ist es nicht." ist bewusst so knapp: Es ist die einzige Stelle, an der
die App ihre eigene Einfachheit behauptet, und sie ist nachprüfbar wahr.

### S3 · Lesbarkeit

> **H** Kannst du das gut lesen?
> *(darunter dieselbe Karte aus S2, in arabischer Schrift)*
> **K** Klein · **K** Normal · **K** Groß `data-action="einstieg-schrift"`
> **T** Änderbar in den Einstellungen.
> **A** Schriftgröße wählen. Die Probe darüber ändert sich sofort.

Die Probe ändert sich **im selben Bildschirm** — stärkste Form der Einlösung
(`FRAGENKATALOG.md` §9, F2). **Ein „Weiter"-Knopf steht trotzdem darunter**;
warum, steht in Abschnitt 6 a.

### S4 · Aussehen

> **H** Hell oder dunkel?
> **K** Dunkel · **K** Hell · **K** Automatisch `data-action="einstieg-thema"`
> **T** Automatisch richtet sich nach deinem Gerät.

Ruft direkt `setThema()` (`app.js:1052`) auf. Kein neuer Speicher nötig
(`BESTAND.md` §5).

### S5 · Wie lang eine Runde ist

> **H** Wie lang soll eine Runde sein?
> **T** Eine Runde ist das, was du an einem Tag durchgehst.
> **K** 10 Karten · **K** 20 · **K** 30 · **K** Alle fälligen
> `data-action="einstieg-runde"`
> **T** Änderbar in den Einstellungen.

Steht **nach** S2, weil vorher niemand weiß, wie lange eine Karte dauert (P3).
Der erklärende Satz steht **über** den Knöpfen, nicht darunter — man liest ihn,
bevor man wählt.

### S6 · Kurzer Abschluss

> **H** Passt das so?
> **T** Runde: *20 Karten*. Schrift und Aussehen hast du gerade eingestellt.
> **K** Passt `data-action="einstieg-weiter"`
> **K** Noch mal ändern `data-action="einstieg-zurueck"`

**Kein eigener Bildschirm für Schrift und Aussehen** (F2): Die haben sich
bereits selbst gezeigt. Wiederholen wäre Füllmaterial.

### S7 · Wann du zurückkommst

> **H** Wann kommst du zurück?
> **T** Ein fester Punkt am Tag hilft mehr als ein guter Vorsatz.
> **T** Wenn ich **[Auswahl]**, dann mache ich eine Runde.
> *(Ankerliste, Abschnitt 3)*
> **K** Passt · **K** Überspringen

Der zweite Satz ist die **einzige** Stelle im ganzen Einstieg, die einen
Mechanismus nennt — und er nennt ihn ohne Zahl, ohne Studie, ohne „belegt".
Beleg steht in [`PSYCHOLOGIE.md`](PSYCHOLOGIE.md) §1.1, nicht auf dem
Bildschirm.

**Noch nicht gebaut:** Der Satz sollte nach der Anmeldung einmal als stille
Zeile über dem Lernen-Bildschirm wiederkehren. In v3.9.9 ist er **nur** im
Einstieg zu sehen. Damit besteht B1 die Prüfung P2 heute nur halb — die Wahl
wirkt im Satz darüber sofort, aber sie kommt danach nicht wieder. Bewusst
offengelassen, weil jede Wiederkehr ein Feld in den Einstellungen bräuchte und
damit die Rechtsfrage F5 vergrößert. Nächste Ausbaustufe, nicht vergessen.

### S8 · Konto

Der bestehende `renderAuth()`, **völlig unverändert**. Die Kopfzeile bleibt
„Schritt 1 von 2 · Konto" — warum die ursprünglich geplante Umnummerierung
falsch gewesen wäre, steht in Abschnitt 6 b. Der Einstieg setzt beim Übergang
nur `ui.authMode = "register"`, damit man direkt im richtigen Formular landet.

### S9 · Erste eigene Karte

Der bestehende leere Lernen-Bildschirm mit „Erste Karte anlegen", unverändert.
**In v3.9.9 ist hier nichts hinzugefügt worden** — der geplante Satz „Fertig.
Jetzt deine erste eigene Karte." fehlt noch.

Das ist die wichtigste offene Lücke des Strangs: Nach `PSYCHOLOGIE.md` §1.2
zählt der **Abschluss**, nicht der Anfang — ein Einstieg, der jemanden ohne
erste eigene Karte stehen lässt, verschenkt genau den Teil, für den es Belege
gibt. Gehört in die nächste Ausbaustufe, zusammen mit der Wiederkehr des
Wenn-dann-Satzes.

---

## 3. Die Ankerliste (F4, entschieden)

Fünf feste Anker plus ein freies Feld. Nicht mehr — der Betreiber hat die
Obergrenze selbst benannt („man kann ja schlecht 20 auswahlen haben"), und
jeder weitere Anker macht die Wahl zur Suche.

**Endstand nach der Betreiber-Antwort vom 23.09.2026** („glaub die 6 dings
reichen, 5 gebete und das extra"): alle fünf Gebete plus ein freies Feld. Der
weltliche Anker „wenn ich heimkomme" aus der ersten Fassung ist dafür
entfallen — wer ihn braucht, schreibt ihn ins freie Feld.

| # | Anker | Warum dieser |
|---|---|---|
| 1 | nach dem Fajr-Gebet | frühester fester Punkt des Tages |
| 2 | nach dem Dhuhr-Gebet | Mitte des Tages |
| 3 | nach dem Asr-Gebet | Nachmittag |
| 4 | nach dem Maghrib-Gebet | Abend |
| 5 | nach dem Ischa-Gebet | Abschluss des Tages |
| 6 | *eigene Situation …* | freies Textfeld, bis 60 Zeichen |

**Schreibweise:** ohne Sonderzeichen — Fajr · Dhuhr · Asr · Maghrib · Ischa.
Der Betreiber hat die Frage nach der Umschrift offengelassen; gewählt wurde die
Fassung, die auf jedem Gerät gleich aussieht und die niemand falsch tippt. Eine
Zeile Antwort ändert das in `EINSTIEG_ANKER` (`app.js`).

**Warum Gebetszeiten hier fachlich die besten Anker sind** — und das ist kein
frommer Zusatz, sondern der Grund, warum sie in dieser Liste stehen: Ein
Wenn-dann-Satz wirkt nur, wenn die Situation **zuverlässig eintritt und
erkennbar ist** (`PSYCHOLOGIE.md` §1.1). Fünf feste, täglich wiederkehrende,
unübersehbare Punkte sind genau das. Für die Zielgruppe dieser App gibt es
schlicht keinen besseren Anker.

**Punkt 5 ist nicht Beiwerk.** Wer im Schichtdienst steht oder den Tag anders
einteilt, braucht einen weltlichen Anker; und Punkt 6 fängt alles übrige. Der
Beleg spricht ohnehin dafür, dass ein **selbst formulierter** Satz am stärksten
wirkt.

**Punkt 6 ist nicht Beiwerk.** Wer im Schichtdienst steht oder den Tag anders
einteilt, trägt seine eigene Situation ein — und der Beleg spricht ohnehin
dafür, dass ein **selbst formulierter** Satz am stärksten wirkt.

---

## 4. Was bewusst nirgends steht

- **Keine Zahl, kein Prozentwert, keine Studie.** Nicht „wissenschaftlich
  belegt", nicht „93 % bleiben dabei", nicht „in 2 Monaten kannst du …".
- **Kein Vergleich mit anderen Apps.** Speak baut seinen Einstieg auf einem
  Angriff gegen Karteikarten auf ([`VIDEO-BEFUND.md`](VIDEO-BEFUND.md) §5.2);
  die Gegenrede wäre genauso eine Behauptung.
- **Keine Serie, kein Streak, kein „schon X Tage".** `AUFTRAG.md` §5.
- **Kein „Willkommen!" mit Ausrufezeichen.** Im ganzen Einstieg steht kein
  einziges Ausrufezeichen.
- **Kein Hinweis darauf, dass der Einstieg nur einmal kommt.** Wer ihn
  überspringt, soll nicht das Gefühl haben, etwas verpasst zu haben.

---

## 5. Was der Betreiber noch prüfen muss

1. **Das Wort auf der Beispielkarte in S2.** Im Code steht كِتَابٌ („Buch") als
   **Platzhalter** — ein Wort ohne religiösen Gehalt, weil der Einstieg die
   Mechanik zeigt und nicht den Stoff. Der Betreiber antwortete „keine ahnung
   ig"; damit der Bau nicht stehen bleibt, ist ein neutrales Wort gewählt
   worden. Ein Wort aus Medina Buch 1, Lektion 1 ersetzt es jederzeit — es
   ändert sich genau eine Zeile (`EINSTIEG_BEISPIEL` in `app.js`).
2. **Die Umschrift der Gebetsnamen** (Abschnitt 3) — gewählt ist die Fassung
   ohne Sonderzeichen. Änderbar in einer Zeile.
3. **Die Rechtsprüfung** der Zwischenspeicherung (F5). Betrifft die zwei neuen
   `localStorage`-Schlüssel, nicht `adrabic-thema`.

---

## 6. Abweichungen, die sich erst beim Bauen zeigten

Beide sind im Code umgesetzt und hier nachgetragen, damit Dokument und Code
nicht auseinanderlaufen.

**a) S3 behält einen „Weiter"-Knopf.** Oben stand: „kein Weiter-Knopf, die Wahl
ist die Bestätigung". Am laufenden Bildschirm zeigte sich, dass ein Tipp, der
sofort weiterspringt, die Schriftprobe genau in dem Moment wegnimmt, in dem man
sie ansehen will — die Einlösung fiele damit weg, also genau das, wofür der
Bildschirm da ist. Die Wahl wirkt weiterhin sofort; das Weitergehen entscheidet
der Mensch.

**b) Die Kopfzeile des Anmeldeformulars bleibt „Schritt 1 von 2 · Konto".**
Oben stand, sie werde zu „Schritt 2 von 2". Das war falsch: Die beiden Schritte
zählen **Konto anlegen → E-Mail bestätigen**
(`renderPendingVerification()` trägt „Schritt 2 von 2 · Bestätigen"). Hätte man
sie umnummeriert, stünden im Ablauf zwei Bildschirme mit „Schritt 2 von 2", und
für alle, die den Einstieg überspringen oder schon gesehen haben, wäre die
Zählung schlicht falsch. Der Einstieg zählt nicht mit — er hat aus gutem Grund
gar keinen Zähler (Abschnitt 1, Regel 4).
