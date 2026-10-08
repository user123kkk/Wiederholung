# Bericht: Verständlichkeit des ganzen Tools

08.10.2026, Stand 3.18.27 (`main`, 74e0b5d). **Nur gelesen, nichts gebaut.**
Auftrag: `../GESAMTLISTE.md` Abschnitt 4a (Betreiber 08.10.: „an sich ist
das System ja nicht klar … ganzes Tool soll verständlich sein“).

Die eine Frage je Bildschirm: **Versteht ein Fremder ohne Erklärung, was
das hier ist und was er als Nächstes tun soll?**

**Wie geprüft:** Alle sichtbaren Texte aus `app.js` gezogen (rund 2000
Zeilen) und Bildschirm für Bildschirm am Code gelesen: Einstieg, Konto,
Lernen, Runde, Rundenende, geführter Satz, Fortschritt, Verwalten, Üben,
Speicherkarten, Blätter, Einstellungen mit Unterseiten.
**Nicht geprüft:** nichts im Browser angesehen (der volle Prüflauf lief
gleichzeitig, daneben keine Browser-Tests, LEHREN § 5.3); kein echter
Fremder; kein iPhone. Texte auswendig lernen nur am Rand (Probelauf bis
29.10., dort wird nichts umgebaut; der Fund zur Auswahl „Neu anlegen“
steht schon in der Gesamtliste Abschnitt 7).

Alle Wortlaute unten sind **Vorschläge**. Gebaut wird erst auf Dein Wort.

---

## 1. Kurz

Der tägliche Weg ist klar: Lernen-Bildschirm, eine Zahl, ein Knopf, Karte
umdrehen, bewerten, „Geschafft“. Unklar wird es an vier Stellen, und alle
vier haben dieselbe Ursache: **Die App benutzt eigene Wörter und erklärt
sie nicht dort, wo man ihnen zum ersten Mal begegnet.**

1. „Speicherkarte“ sagt etwas anderes, als gemeint ist (VS-1).
2. „Bereich“, „Kartensatz“ und „Satz“ sind dieselbe Sache mit drei Namen
   (VS-2).
3. Die drei Knöpfe der Runde erklärt nur der Einstieg, die App selbst
   nicht; mit den neuen Lernregeln verhält sich die Runde überraschend
   (VS-3).
4. „Üben“ sagt nur, was es nicht ist, und steht unter „Verwalten“ (VS-4).

Dazu ein Muster: 39 Erklärungen stehen nur als Maus-Hinweis (`title`) im
Code. Am Handy sieht die niemand (VS-7).

---

## 2. Funde

### Hoch: daran bleibt ein Fremder hängen

**VS-1 – „Speicherkarte“.** Gemeint ist eine benannte Auswahl von Karten.
Das Wort heißt im Alltag etwas anderes (die Karte in der Kamera). Es
steht an 31 Textstellen: Verwalten, Üben („Nach Stand | Speicherkarten“),
„In Speicherkarte ablegen“, Rückfragen. Die Erklärung („Feste Auswahl an
Vokabeln, jederzeit beliebig oft übbar“) kommt erst nach dem Aufklappen.
Im geführten Satz stecken unter „Speicherkarten“ die Lektionen: Eine
Lektion ist also eine Speicherkarte, was niemand erwartet. Für dieselbe
Handlung gibt es drei Verben: „Merken“ (Runde), „Ablegen“ (Auswahl),
„aufnehmen“ (Erklärtext).
- Dafür, das Wort zu ändern: Es ist das einzige Wort der App, das aktiv in
  die falsche Richtung zeigt. Der Fremdentest steht an.
- Dagegen: Es ist Dein Wort seit Version 2, wer die App kennt, hat es
  gelernt; 31 Texte und viele Tests hängen daran.
- Urteil: umbenennen in **„Sammlung“** („Sammelmappen“ steht schon in der
  eigenen Erklärung der App). Ein Verb: „ablegen“. Dazu ein Satz schon
  an der zugeklappten Zeile: „Karten, die Du zusammen üben willst.“
  Namensfrage, also Deine Entscheidung.

**VS-2 – „Bereich“, „Kartensatz“, „Satz“.** Oben in der Leiste steht
„Vokabeln“ mit Pfeil; das Blatt dahinter heißt „Bereich“. Nirgends steht,
was ein Bereich ist. Kommt derselbe Stapel über einen Code, heißt er
„Kartensatz“ (28 Stellen), an drei Stellen nur „Satz“. Der Hinweis im
geführten Satz („tippe oben auf den Bereichsnamen und dann auf ‚Bereich
anlegen‘“) setzt das Wort voraus.
- Dafür, es zu ordnen: Wer einen Code einlöst, sucht danach seinen
  „Kartensatz“ und findet einen „Bereich“.
- Dagegen: Beide Wörter sind für sich verständlich; zwei Wörter für
  „eigen“ und „bekommen“ können auch helfen.
- Urteil: beide behalten, aber einmal verbinden. Im Bereich-Blatt und in
  „Neuer Bereich“ ein Satz: „Ein Bereich ist ein Stapel Karten zu einem
  Thema, zum Beispiel ein Buch oder ein Kurs.“ „Kartensatz“ nur für das,
  was per Code kommt oder geht. Das nackte „Satz“ überall ausschreiben.

**VS-3 – Die drei Knöpfe.** In der Runde stehen „Nicht“, „Fast“,
„Sicher“ ohne Unterzeile (so von Dir entschieden, 3.17.0). Was sie
bewirken, sagt nur der Einstieg an der Probekarte. Wer den Einstieg
schnell durchtippt oder ein Konto von früher hat, weiß es nicht. Mit den
zwei neuen Regeln (heute nur Dein Konto) kommt eine neue Karte nach
„Sicher“ in derselben Runde noch einmal. Ohne Erklärung sieht das wie ein
Fehler aus.
- Steht schon in der Liste („Einmalige Erklärung der drei Knöpfe“, wartet
  auf Deinen Wortlaut). Neu ist nur: Sie muss **vor** der Freigabe der
  zwei Regeln für alle da sein, und sie muss die neue Karte erwähnen.
- Vorschlag, aus den Vorlese-Texten, die schon im Code stehen: „Nicht –
  kommt gleich noch einmal. Fast – kommt morgen wieder. Sicher – kommt
  später wieder, jedes Mal mit mehr Abstand. Neue Karten fragt Adrabic
  zweimal.“ Einmal, vor der ersten Bewertung, wegtippbar.

**VS-4 – „Üben“.** Der Kasten sagt „Zählt nicht für deine
Wiederholungen“, die Runde „Übung – zählt nicht als Wiederholung“. Wozu es
gut ist, steht nirgends. Der Knopf liegt unter „Verwalten“; von „Lernen“
aus erreicht man ihn nur, wenn nichts fällig ist („Trotzdem üben“).
- Dafür, den Ort zu ändern: Üben ist Lernen, nicht Verwalten.
- Dagegen: Auf „Lernen“ gilt „eine Handlung“ (Dein Hick-Grundsatz); ein
  zweiter Knopf neben „Runde starten“ macht den Bildschirm unklarer.
- Urteil: Ort lassen, Satz ändern: „So oft Du willst. Ändert nichts
  daran, wann Deine Karten wiederkommen.“

### Mittel

**VS-5 – Runde, Abfrage, Durchsicht.** Im geführten Satz heißt dieselbe
Sache „Abfrage“ („Abfrage starten“, „erste Abfrage“), überall sonst
„Runde“. Dazu ein **Widerspruch am selben Bildschirm** (`app.js` 9945 und
9970): Die Leiste sagt „3 von 21 gelernt“, der Satz darunter „gelernt
hast du sie erst, wenn du sie dort weißt“. Gezählt werden Karten mit
„Gesehen“.
- Der Widerspruch ist ein falscher Text, kein Geschmack: „3 von 21
  **gesehen**“. Das baue ich als Kleinigkeit, sobald der Prüflauf durch
  ist (LEHREN § 1.2, § 7.2).
- „Abfrage starten“ → „Runde starten“ wie auf jedem anderen Knopf; im
  Erklärsatz kann „Abfrage“ bleiben. Vorschlag, wartet auf Dich.

**VS-6 – „Geh mit dem Video mit.“** Steht in jeder Durchsicht eines
geführten Satzes. Ein Satz von einem Lehrer ohne Video hat kein Video,
und verlinkt ist keins. Vorschlag: „Lies die Karten einmal durch, zum
Beispiel neben Deinem Unterricht oder Video.“ Wortlaut von Dir.

**VS-7 – Erklärungen, die am Handy niemand sieht.** 39 `title`-Texte in
`app.js`. Die meisten doppeln nur die Beschriftung. Bei diesen ist der
Maus-Hinweis die **einzige** Erklärung:
- Fortschritt, Legende der sechs Stände („kommt schon seltener“ usw.);
- „Merken“ in der Runde (wohin die Karte geht: „Schwierige Wörter“);
- das Schloss an einer Lektion (warum gesperrt);
- „Reihenfolge umkehren“ und „Als Liste speichern“ unter „Mehr“.
Vorschlag: Schloss und Stand antippbar machen (kurze Meldung mit genau
dem vorhandenen Satz); bei „Merken“ beim ersten Mal eine Meldung „In
‚Schwierige Wörter‘ abgelegt“. Die Legende deckt Frage 26 ab („ein Satz
in Worten“).

**VS-8 – „Liste einfügen“ findet man nicht.** Viele Karten auf einmal
ist der wichtigste neue Weg zu Karten, steht aber unter „Mehr“ zwischen
„Drucken“ und „Bereich umbenennen“. Daneben „Als Liste speichern · CSV“;
unter Einstellungen gibt es „Sichern“. Zwei Arten zu speichern, zwei
Orte, eine Abkürzung.
- Dafür, es sichtbarer zu machen: Wer eine Vokabelliste hat, tippt sonst
  jede Karte einzeln.
- Dagegen: ein Hauptknopf je Bildschirm.
- Urteil: Der Hauptknopf bleibt. Im Blatt „Neue Karte“ und im leeren
  Bereich ein leiser Verweis „Viele auf einmal? Liste einfügen“. „Als
  Liste speichern · CSV“ → „Als Tabelle speichern“ mit Unterzeile „ohne
  Lernstand“.

**VS-9 – Sieben Wörter für „gekonnt“.** gewusst, geschafft, sitzt, saß,
gelernt, fest, durch. Dazu sechs Stand-Wörter (neu, im Lernen, frisch
gelernt, wird fester, gefestigt, dauerhaft). Jedes für sich geht, zusammen
weiß man nicht, ob „gelernt“ mehr ist als „gewusst“. Vorschlag für
„Begriffe festlegen“: Karte = „gewusst“, Lektion = „geschafft“, Tag =
„gelernt“; „sitzt“ nur als Bild im Einstieg. Die sechs Stand-Wörter
bleiben.

**VS-10 – Der „Plan“ verschwindet.** Der Einstieg baut einen Plan
(„Meinen Plan erstellen“, „Dein Plan steht“, „Plan speichern“). Nach dem
Konto kommt das Wort noch einmal („Dein Plan steht. Jetzt deine erste
eigene Karte.“) und dann nie wieder. Was im Plan stand (Zeitpunkt, Runde,
Schrift), ist nirgends als Plan zu sehen. Gehört zum Paket Einstieg
(Abschnitt 5 der Gesamtliste); dort mit entscheiden, ob „Dein Start“ den
Zeitpunkt nennt.

### Niedrig: ein Wort je Sache

| Stelle | Heute | Vorschlag |
|---|---|---|
| Lernen, Serie | „Tage am Stück“, „Bester Lauf“, sonst „Serie“ | „Beste Serie“ |
| Einstellungen → Sichern | „Aufzeichnung“ und „Tagesprotokoll“ im selben Absatz | ein Wort: „Aufzeichnung“ |
| Geführter Satz | „dein:e Lehrer:in“ und „Lehrperson“ | eins von beiden |
| Teilen | „Ausgabe Nr.“ und „Veröffentlichung Nr.“ | „Ausgabe“ |
| Code | „Code einlösen“, „Code eingeben“, „Übernehmen“, „Kartensatz per Code“ | Knopf überall „Code einlösen“ |
| Karten | „Vokabeln“ (Speicherkarten-Texte), sonst „Karten“ | „Karten“ |
| Rundenende | „noch 8 Karten offen“, sonst „fällig“ | „fällig“ |
| Einstellungen | „Tägliche Erinnerung: Vorlage für 7 Uhr“ | „7 Uhr, im Kalender“ |
| Anlegen | „Karte hinzufügen“, „Erste Karte anlegen“, „Neue Karte“, „Hinzufügen“ | „anlegen“ |
| Einstieg gegen App | Leiter fünf Punkte, Karte in der Runde sechs | mit O-5 zusammen klären |
| Karte bearbeiten | Feld „Stand“ ohne Hinweis, dass es den Lernstand ändert | Unterzeile „Nur ändern, wenn die Karte falsch eingestuft ist.“ |
| Erster Bildschirm | „Datei einspielen“ ohne zu sagen, welche Datei | „Sicherung oder Kartensatz-Datei einspielen“; fällt mit dem Regal ohnehin anders aus |
| Blatt „Mehr“ | Überschrift „Weitere Handlungen“ | „Mehr zu diesem Bereich“ |

### Angesehen, bleibt so

- **Reiter „Verwalten“.** „Karten“ wäre für einen Fremden klarer. Dagegen:
  Mit den Texten liegt dort mehr als Karten, und das Wort steht in vielen
  Hinweisen. Urteil: bleibt; neu ansehen, wenn Texte für alle kommen.
- **Erster Bildschirm des Einstiegs** sagt nicht, dass man eigene Wörter
  mitbringt; das kommt als Antwort auf die Zielwahl („Adrabic ist kein
  fertiger Kurs …“). So gewollt („Einordnung vor Erklärung“), und der
  Satz ist gut. Bleibt.
- **„fällig“** wird nie erklärt, steht aber immer neben „Wiederholung“
  und „neu“ und neben dem Knopf. Reicht.
- Lernen-Bildschirm, Rundenende, leere Zustände, Konto löschen, Sichern,
  Offline-Hinweise, Fehlermeldungen: sagen, was los ist und was zu tun
  ist. Kein Fund.

---

## 3. Vorschlag für die Reihenfolge (nicht entschieden)

1. **Klein, ohne Dich:** VS-5 erster Teil („gesehen“ statt „gelernt“).
2. **Ein Wort von Dir, dann ein Paket „Wörter“:** VS-1 (Speicherkarte →
   Sammlung?), VS-2, VS-4, VS-9, die Tabelle „Niedrig“. Ein Durchgang
   über alle Texte, damit kein Wort halb umgestellt bleibt (LEHREN § 3.3).
3. **Mit der Erklärung der drei Knöpfe:** VS-3, vor der Freigabe der
   zwei Lernregeln.
4. **Erklären, wo man es braucht:** VS-7, VS-8.
5. **Im Paket Einstieg:** VS-10, die Punkte-Zahl, O-5.
6. **Wortlaut von Dir:** VS-6.

Danach erst der Fremdentest: Er zeigt, was dieser Bericht nicht sehen
kann.

## 4. Was Du entscheiden musst

1. VS-1: „Speicherkarte“ umbenennen? Empfehlung: ja, „Sammlung“.
2. VS-2: Satz zum Bereich so? („Ein Bereich ist ein Stapel Karten zu
   einem Thema, zum Beispiel ein Buch oder ein Kurs.“)
3. VS-3: Wortlaut der Erklärung der drei Knöpfe.
4. VS-4: Satz zu „Üben“ so?
5. VS-5 zweiter Teil: „Abfrage starten“ → „Runde starten“?
6. VS-6: Satz statt „Geh mit dem Video mit.“
7. Tabelle „Niedrig“: „alles wie vorgeschlagen“ reicht.

## 5. Entscheidung des Betreibers (08.10.2026, 16:40)

„alles ja wie du empfiehlst“. Damit gilt:

1. VS-1: „Speicherkarte“ heißt künftig **„Sammlung“**; ein Verb: „ablegen“;
   Satz an der zugeklappten Zeile.
2. VS-2: Satz zum Bereich wie vorgeschlagen; „Kartensatz“ nur für das, was
   per Code kommt oder geht; kein nacktes „Satz“.
3. VS-3: Erklärung der drei Knöpfe mit dem vorgeschlagenen Wortlaut,
   einmal, wegtippbar, vor der Freigabe der zwei Lernregeln.
4. VS-4: Satz zu „Üben“ wie vorgeschlagen, Ort bleibt.
5. VS-5: „gesehen“ statt „gelernt“; „Abfrage starten“ → „Runde starten“.
6. VS-6: „Lies die Karten einmal durch, zum Beispiel neben Deinem
   Unterricht oder Video.“
7. Tabelle „Niedrig“: wie vorgeschlagen. VS-7, VS-8, VS-9 nach den
   Urteilen im Bericht; VS-10 im Paket Einstieg.

Dazu vom Betreiber (Bildschirmfoto YouTube): Die Playlist zum
Medina-Kartensatz heißt **„MADINA BOOK 1“**, Kanal **Madrasatuna ||
مدرستنا**, 46 Lektionen (erste Videos: „Madinah Arabic course | Book 1 -
LESSON 1 (part 1)“ 41:16, „(part 2)“ 28:13). Die Adresse selbst fehlt
noch; sie wird gebraucht, sobald der Satz ins Regal kommt (Gesamtliste
Abschnitt 3).

Bau in zwei Schritten: (a) reine Wortlaute (1, 2, 4, 5, 6, 7, VS-9, die
Beschriftungen aus VS-8) als eine Version nach dem Klein-Weg; (b) was neue
Bedienung ist (VS-3, antippbare Erklärungen VS-7, Verweis „Liste
einfügen“ VS-8) mit Rundenabnahme.

## 6. Stand Schritt (a), 08.10., 16:50

Als Entwurf 3.18.28 gebaut im getrennten Ordner
`C:\Users\USER\Wiederholung-woerter` (git worktree auf c6dcd75), derselbe
Stand als Patch: `woerter-3.18.28-entwurf.patch` (auf sauberem `main`:
`git apply --check`, dann `git apply`). Inhalt: CHANGELOG 3.18.28 im
Patch. **Geprüft:** nur `node --check` und `pruefe_stand.mjs`.
**Nicht geprüft:** nichts im Browser (der volle Lauf an 3.18.27 läuft
noch). Danach: betroffene Tests am Entwurf (eigener Port), weil
Rundenende und Durchsicht berührt sind auch `abnahme_runde.js`.
Angepasste Tests: `t_runde_bereiche.js` („fällig“ statt „offen“),
`t_paket_c_weiter.js` (C6, neuer Wortlaut).
Nicht umgesetzt aus der Tabelle: „Datei einspielen“ länger beschriften
(bricht auf kleinen Handys um; fällt mit dem Regal anders aus) und die
Punkte-Zahl Einstieg/Runde (gehört zu O-5).
In der Datenschutzerklärung ist ein Wort mitgezogen („Speicherkarten“ →
„Sammlungen“, Abschnitt Kartensatz per Code); sonst nichts daran.
