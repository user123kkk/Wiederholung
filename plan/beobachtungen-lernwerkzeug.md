# Beobachtungen am Lernwerkzeug — noch nicht entschieden, nicht gebaut

Angelegt: 15. September 2026, aus einer Nutzungssitzung des Betreibers.
Zuletzt erweitert: 15. September 2026 (Punkte 13–16 hinzugefügt).
Zuletzt abgeglichen: 17. September 2026 — Punkt 5 war bereits über den
Redesign-Strang (Block 3, v3.2.1) behoben, ohne dass diese Liste das
vermerkt hatte.
Gehört zu keiner Phase — **Phase 0–9 schließen „Funktion des Lernwerkzeugs
anfassen" ausdrücklich aus** (`../CLAUDE.md`, `PLAN.md` Abschnitt „Was in
keiner Phase passiert", Punkt 1). Diese Liste ist deshalb bewusst nur
**notiert, nicht bewertet als Auftrag** — nichts hier wird gebaut, bis der
Betreiber entscheidet, was überhaupt gemacht werden soll und ob/wann dafür
eine eigene Phase (oder ein eigener Strang wie die Landing-Page-Strategie)
aufgemacht wird.

Jeder Punkt: die Beobachtung wie gemeldet, danach eine kurze fachliche
Einschätzung (Bug vs. Wunsch, Schweregrad, ob ein bestehendes Muster in der
App schon passt). Die Einschätzung ersetzt keine Entscheidung.

---

## 1. Karte in der Verwalten-Liste antippen → Detailansicht — ✅ gebaut (v3.0.47)

**Beobachtung:** In „Verwalten" die Kartenliste unten — eine Karte antippen,
um sie genauer anzusehen (z. B. weil die Notiz zu lang für die Zeile ist),
soll ein Fenster/Modal öffnen. Frage, ob es dafür schon ein Muster gibt —
z. B. wie die 6 Knöpfe links, die etwas verschieben. Vielleicht Doppelklick,
aber unklar, wie man das als Bedienung entdeckt.

**Einschätzung:** Sinnvoller Wunsch, kein Bug. Die App hat mit dem
`.dlg`-System und jetzt zusätzlich dem Fehler-Modal (Phase 8) bereits ein
Muster für Overlays — ließe sich wiederverwenden statt neu erfinden.
Doppelklick/Doppeltipp ist als Geste für „Detail öffnen" auf Touch-Geräten
unüblich und schwer zu entdecken (kein sichtbarer Hinweis); ein normaler
Einfachtipp auf die Zeile (außerhalb der Aktions-Knöpfe) wäre naheliegender
und konsistenter mit Touch-Konventionen.

**Gebaut am 16.09.2026 (v3.0.47), auf ausdrückliche Freigabe des Betreibers**
(„nimm einen Punkt und mach"), genau wie hier eingeschätzt: Einfachtipp auf
die Zeile (`.card-row`, außerhalb von Ziehgriff/Bearbeiten/Löschen — die
haben als eigene `data-action`-Elemente Vorrang über `closest()`) öffnet ein
neues Blatt (`cardDetailSheet()`, `app.js`) nach dem bestehenden
`.dlg`-Muster von `bereichSheet()` — Wort, Übersetzung, volle Notiz
(`.extra-note-voll`, `pre-wrap` statt der abgeschnittenen Listenvorschau),
Zustand, Speicherkarten-Zugehörigkeit, plus ein Knopf direkt ins bestehende
Bearbeiten-Formular. Rein lesend, keine zweite Bearbeiten-Logik. Nur für
Karten im offenen Bereich (`findCard()` deckt nur `currentBereich()` ab) —
Treffer aus anderen Bereichen (`fremd`) bleiben ohne die neue Aktion, deren
eigener Bearbeiten-Knopf ist unverändert. Escape schließt wie beim
Bereichs-Sheet (Phase 9); `ui.cardDetailId` wird beim Tab- und
Bereichswechsel zurückgesetzt, damit kein Geisterzustand übrig bleibt.

**Geprüft, kein Konflikt mit dem Ziehgriff:** Ein Loslassen nach echtem
Ziehen (oder nach aktiviertem, aber bewegungslosem Halten) ruft `endDrag()`
auf, das synchron `render()` ausführt und damit den ursprünglichen
Ziel-Knoten aus dem DOM entfernt, **bevor** der Browser den nachfolgenden
synthetischen Klick auslösen würde — der erreicht damit den
Zeilen-Listener nicht mehr. Ein kurzer Tipp auf den Griff **unterhalb**
der Halteschwelle (kein Ziehen ausgelöst) öffnet dagegen jetzt die
Detailansicht, weil `closest()` vom Griff (kein eigenes `data-action`) zur
Zeile hochläuft — bewusst kein Bug, sondern eine zusätzliche, harmlose
Tipp-Fläche.

**Noch offen (bewusst nicht mitgebaut):** Punkt 3 (Scroll-Position nach
Bearbeiten) hängt technisch nicht mehr an diesem Punkt, weil die
Detailansicht ein Overlay ist und die Liste nicht verlässt — das
Bearbeiten-Formular selbst bleibt aber weiterhin ein Sprung an den
Seitenanfang, unverändert. Punkt 10 (Formatierung auch in der Listenvorschau)
bleibt ebenfalls offen, das ist die einzeilige `.extra-note`-Vorschau, extra
unverändert gelassen (Ellipsis-Kurzform bleibt so, wie sie ist).

## 2. Versehentliches Verschieben beim Scrollen (die 6 Knöpfe) — 🔧 Geste auf Long-Press umgestellt, Scroll-Konflikt behoben (v3.0.42)

**Beobachtung:** Beim Scrollen mit dem Daumen links (wo die 6 Verschieben-
Knöpfe sitzen) wurde aus Versehen eine Karte verschoben. Wunsch: Doppeltipp
oder Ähnliches, damit Verschieben erst nach einer bewussten zweiten Aktion
passiert.

**Einschätzung:** Echter Bug/Risiko, kein reiner Komfortwunsch — eine
versehentliche Datenänderung (Kartenreihenfolge) durch eine Scrollgeste ist
ein Bedienfehler mit echtem Schaden (Nutzer merkt es evtl. nicht sofort).
Sollte bei einer Umsetzung Vorrang vor reinen Komfortpunkten bekommen.
Lösungsraum größer als nur „Doppeltipp" — z. B. auch: Knöpfe erst nach kurzem
Halten aktiv, größerer Abstand zur Scroll-Zone, oder ein „Griff"-Symbol wie
das schon existierende Ziehgriff-Muster aus Phase 9 (dort extra für
Tastatur/Fokus gebaut, aber das Prinzip „bewusstes Fassen vor dem Bewegen"
passt auch hier).

**Erster Versuch am 15.09.2026, nicht erfolgreich:** Im Code gesucht nach
einem Muster mit sechs Knöpfen links an einer Karte. Geprüft und verworfen:
die Kartenzeile in der Verwalten-Liste (Ziehgriff + Bearbeiten + Löschen =
drei, nicht sechs, und die zwei Buttons sitzen rechts, nicht links), die
Mehrfachauswahl-Leiste, das Speicherkarten-Tag-System. Keine Stelle passte.

**Klargestellt vom Betreiber:** „6 Knöpfe" meinte die **sechs Punkte des
Ziehgriff-Icons** (`ikon("griff", ...)`, das übliche ⠿-Symbol), nicht sechs
einzelne Buttons — also doch der Ziehgriff aus Phase 9, wie im ersten
Versuch schon als Kandidat geprüft, aber wegen der Fehldeutung „Knöpfe"
verworfen.

**Ursache gefunden und behoben (v3.0.35):** `.drag-handle` hatte in
`styles.css:1355` `touch-action: none` — das unterbindet natives Scrollen
schon bei der bloßen Berührung, bevor überhaupt JavaScript läuft
(`touch-action` wird vom Browser vorab ausgewertet, nicht dynamisch während
einer laufenden Berührung änderbar). Der `pointerdown`-Handler in `app.js`
aktivierte das Ziehen außerdem sofort, ohne jede Schwelle. Wer beim Scrollen
mit dem Daumen über den Griff strich, löste damit garantiert ein Verschieben
aus.

Auf Vorschlag des Betreibers („doppelklick, beim zweiten klick nicht
loslassen, dann verschieben") umgesetzt: Ein Finger zieht jetzt erst beim
**zweiten** Antippen desselben Griffs innerhalb von 400 ms
(`app.js`, neue Variablen `tippGriff`/`tippZeit`/`tippResetTimer` vor dem
`pointerdown`-Handler). Der erste Antipper setzt nur den Zeitstempel und
kehrt zurück, ohne `preventDefault()` — die Seite scrollt normal weiter.
`touch-action` auf `manipulation` geändert, damit der erste Kontakt nicht
mehr blockiert; beim zweiten, erkannten Tap übernimmt `setPointerCapture()`
den Kontakt exklusiv, was das native Scrollen für diese eine Berührung
zuverlässig unterdrückt. Maus bleibt unverändert (Einzelklick zieht sofort
weiter) — `e.pointerType === "mouse"` überspringt die Doppeltipp-Prüfung.

Kernlogik isoliert in Node nachgebaut und mit fünf Szenarien durchgerechnet
(einzelnes Streifen beim Scrollen, bewusster Doppeltipp mit 150 ms Abstand,
zwei verschiedene Griffe kurz hintereinander, zu langsamer Doppeltipp mit
500 ms, Maus) — alle verhalten sich wie beabsichtigt. Kein echter
Touch-Gerätetest möglich in dieser Umgebung; ein Betreiber-Test auf einem
echten Handy bleibt sinnvoll, ist aber kein Blocker, weil die Ursache
eindeutig war (anders als bei Punkt 16).

**Testrückmeldung 15.09.2026, nachgebessert (v3.0.38):** Am echten Gerät
markierte das Halten nach dem zweiten Antippen Text, statt zu ziehen.
Ursache: `touch-action` steuert nur Scroll-/Zoom-Gesten, nicht die native
Textauswahl bei Long-Press — das vorherige `touch-action: none` hatte
diese als Nebeneffekt mit unterbunden, `manipulation` nicht mehr.
`-webkit-touch-callout: none` ergänzt (dasselbe Paar aus `user-select`+
`touch-callout`, das jeder Button in der App schon trägt).

**Zweite Testrückmeldung 15.09.2026 (v3.0.39):** Ziehen funktionierte
danach, aber Markierung blitzte weiter kurz auf — „nervig". Ursache: Ein
Finger deckt beim Halten mehr Fläche ab als der 28px breite Griff; reichte
er auf den Wort-Text daneben, griff `user-select: none` dort nicht (nur
auf `.drag-handle` selbst gesetzt). Jetzt für die ganze Zeile (`.card-row`,
`.set-row`) gesperrt statt nur den Griff. Kompromiss bewusst eingegangen:
Text in der Verwalten-Liste ist dadurch nicht mehr per Long-Press
markierbar — zuverlässiges Ziehen wog stärker als diese Komfortfunktion,
die ohnehin selten gebraucht wird (Karteninhalt lässt sich über
„Bearbeiten" vollständig einsehen).

**Dritte Anpassung 15.09.2026 (v3.0.40):** Die Feedback-Meldung
„funktuniert selten gut, mal scrollt..., mal wird trotzdem was mackiert"
deutet darauf hin, dass die Doppeltipp-Aktivierung selbst zu schwierig ist —
wahrscheinlich weil der 400ms-Fenster zu eng ist, um auf einem 28px-breiten
Ziel zweimal präzise zu tippen. Zwei Optimierungen: (1) Fenster von 400ms →
600ms (mehr Zeit für den Benutzer, kein gefühltes Delay). (2) Visuelle
Rückmeldung auf den ersten Tap: `.drag-handle:active` bekommt jetzt ein
Hintergrund, damit sofort erkennbar ist, dass die erste Tap registriert
wurde — ermutigt zum schnellen zweiten Tap. Diese Änderungen machen das
Doppeltipp-Muster fehlertoleranter, ohne die Mechanik selbst zu verändern.

**Geste komplett ersetzt, 16.09.2026 (v3.0.41):** Betreiber-Anweisung nach
vier erfolglosen Anläufen am Doppeltipp: „finde einen anderen Weg fürs
Verschieben." Das Doppeltipp-Muster selbst war das Problem, nicht die
Feinjustierung (Fenster, visuelle Rückmeldung) — zwei getrennte, präzise
Antipper auf ein 28px-Ziel sind für einen Finger grundsätzlich schwer zu
treffen, egal wie großzügig das Zeitfenster ist. Jetzt **Long-Press** statt
Doppeltipp: eine einzige, durchgehende Berührung. Griff berühren und 350ms
stillhalten aktiviert das Ziehen; bewegt sich der Finger währenddessen mehr
als 10px (das ist Wischen/Scrollen), bricht der Versuch sofort ab, ohne
dass `preventDefault()` je lief — die Seite scrollt normal weiter, ohne
Verzögerung oder Ruckeln. Das ist dasselbe Prinzip, das iOS/Android für
„Liste per Halten neu sortieren" verwenden (Erinnerungen, Mail, Trello) und
dürfte darum vertrauter sein als ein Doppeltipp. Visuelle Rückmeldung
während des Haltens: Der Griff färbt sich ein und zeigt eine kurze
„Aufladen"-Animation, synchron zur 350ms-Haltedauer. Maus unverändert
(zieht weiterhin sofort per Klick). Nebenbei gefunden: Die visuelle
Rückmeldung aus v3.0.40 nutzte eine nirgends definierte CSS-Variable
(`--accent-rgb`) — die Regel griff nie, `.drag-handle:active` hatte also in
Wirklichkeit gar keinen sichtbaren Hintergrund. Jetzt korrekt mit dem
vorhandenen Token `--accent-bg-strong`.

**Testrückmeldung zu v3.0.41, neue Ursache gefunden und behoben (v3.0.42):**
Long-Press aktivierte das Ziehen zuverlässig, aber „Problem beim Verschieben
ist, dass man dabei scrollt" — während des aktiven Ziehens bewegte sich die
Seite mit. Ursache: `touch-action: manipulation` (seit v3.0.35 unverändert
mitgeschleppt) erlaubt dem Browser, natives Scrollen für eine Berührung
schon auf seinem eigenen Compositor-Thread zu beginnen, sobald sich der
Finger bewegt — unabhängig davon, was JS später entscheidet (genau dafür
ist touch-action da: flüssiges Scrollen, ohne auf das Haupt-Thread-JS warten
zu müssen). `setPointerCapture()` beim Aktivieren des Ziehens kam dafür zu
spät: Ein bereits begünstigtes natives Scrollen lässt sich damit nicht mehr
zuverlässig zurückholen. Die App hat währenddessen ihr eigenes,
kontrolliertes Rand-Scrollen laufen (`autoScrollTick`) — beides zusammen
ergab die gemeldete Doppelbewegung.

Jetzt `touch-action: none` auf `.drag-handle` — natives Scrollen ist für
jede Berührung, die auf dem Griff beginnt, von Anfang an und endgültig
unterbunden, kein Compositor-Scroll mehr, den man sich zurückerobern
müsste. Damit eine Berührung, die nur über den Griff hinwegwischen wollte,
trotzdem scrollt, holt `app.js` das entgangene Scrollen jetzt manuell per
`window.scrollBy()` nach, sobald die Bewegung `HOLD_TOLERANZ` (10px)
überschreitet (neuer Zustand `scrollUebernahme`) — für den Nutzer soll sich
nichts anders anfühlen, außer dass die Seite beim aktiven Ziehen nicht mehr
mitwandert. Einzige bekannte Abweichung: Ein Wisch, der exakt auf dem 28px
breiten Griff beginnt, hat danach kein natives Scroll-„Nachschwingen"
(Momentum) mehr, weil er komplett von JS statt vom Browser getragen wird —
scrollt man stattdessen (wie meist) über den restlichen Zeileninhalt,
bleibt das native Momentum-Scrollen unverändert erhalten. Nächster Schritt:
Gerätetest, ob sich Aktivierung UND aktives Ziehen jetzt beide zuverlässig
anfühlen.

## 3. Zurück zur Scroll-Position nach dem Bearbeiten — ✅ gebaut (v3.0.48)

**Beobachtung:** Nach jedem Bearbeiten einer Karte musste wieder ganz nach
unten gescrollt werden, um zur nächsten Karte zu kommen. Wunsch: ein
„Zurück"-Mechanismus, der zur vorherigen Stelle zurückbringt.

**Einschätzung:** Sinnvoller, gut etablierter UX-Musterwunsch (Scroll-
Position beim Zurückkehren aus einer Detail-/Bearbeitungsansicht erhalten).
Hängt technisch mit Punkt 1 zusammen: Wenn Bearbeiten künftig in einem Modal
über der Liste passiert (statt die Liste selbst zu verlassen), löst sich
dieser Punkt von selbst — beide Punkte sollten zusammen entschieden werden,
nicht einzeln.

**Anders gelöst als vermutet, gebaut am 16.09.2026 (v3.0.48):** Punkt 1 wurde
bewusst NICHT als Modal für das Bearbeiten gebaut (nur fürs reine Ansehen,
siehe dort) — das Bearbeiten-Formular bleibt die bestehende Inline-Ansicht
am Seitenanfang, ein Umbau auf ein Bearbeiten-Modal wäre ein deutlich
größerer, riskanterer Eingriff in ein gut eingespieltes Formular gewesen.
Stattdessen einfacher: `editCard()` merkt sich `window.scrollY` in einer
neuen Variable `editRueckkehrY` (nur wenn der Sprung innerhalb von Verwalten
passiert), `submitCardForm()` und `cancelEdit()` springen beim Bearbeiten
einer bestehenden Karte dorthin zurück. Neuanlegen bleibt unverändert (Fokus
im Wort-Feld, D1). Der Sprung aus dem Fortschritts-Tab (`editCardInBereich`)
setzt `editRueckkehrY` danach ausdrücklich wieder auf `null` zurück — sonst
hätte `editCard()` durch die dort schon vorgezogene `ui.tab = "verwalten"`-
Zuweisung fälschlich die alte Fortschritt-Scrollposition gemerkt.

## 4. Tastatur öffnet sich ungewollt nach dem Speichern — ✅ behoben (v3.0.34)

**Beobachtung:** Nach dem Bearbeiten einer Karte und „Fertig"/Speichern
öffnet sich sofort die Tastatur für das Feld „Karte anlegen" — auch wenn man
gar keine neue Karte anlegen wollte.

**Einschätzung:** Echter Bug. Klingt nach einem Autofokus auf das
„Neue Karte"-Eingabefeld nach dem Schließen des Bearbeiten-Dialogs, der nicht
beabsichtigt sein dürfte — der Nutzer soll selbst entscheiden, wann er dieses
Feld antippt. Vermutlich eine einzelne `.focus()`-Zeile im entsprechenden
Bearbeiten-Abschluss-Pfad.

**Behoben am 15.09.2026 (v3.0.34):** Bestätigt genau wie vermutet.
`submitCardForm()` (`app.js:3332`) bedient sowohl Neuanlegen als auch
Bearbeiten und rief am Ende immer `document.getElementById("f-wort").focus()`
auf (Kommentar „D1": Fokus zurück, damit man mehrere Vokabeln hintereinander
eintippen kann — sinnvoll nur beim Neuanlegen). Fix: Vor dem Zurücksetzen von
`ui.editId` in einer Variable `warEdit` gemerkt, der Fokus-Aufruf läuft jetzt
nur noch, wenn `!warEdit`.

## 5. Lernen/Üben-Feld auf dem iPad nicht mittig — ✅ behoben (v3.2.1, außerhalb dieser Liste)

**Beobachtung:** Auf dem iPad ist das Eingabefeld bei Lernen/Üben nicht
zentriert, sondern nach rechts verschoben — zusammen mit dem
„Antwort anzeigen"-Knopf.

**Einschätzung:** Echter Layout-Bug, wahrscheinlich Breakpoint-/Flexbox-
Problem, das nur bei bestimmten Viewport-Breiten (iPad-Größe) auftritt und am
Telefon/Desktop nicht auffällt. Ohne echtes Gerät oder iPad-Emulation im
Browser nicht zuverlässig zu reproduzieren — bräuchte gezielten Test in den
Breitenbereichen, die ein iPad tatsächlich hat (Hoch- und Querformat sind
vermutlich unterschiedlich betroffen).

**Nachträglich als behoben erkannt (17.09.2026), beim Abgleich dieser Liste
gegen den Code.** Genau dieser Bug ist derselbe, den der Betreiber am
17.09.2026 unabhängig von dieser Liste am echten iPad gemeldet hat
("der Bildschirm beim Lernen ist nach rechts verschoben, nicht mittig") und
der im Redesign-Strang, Block 3, als eigener Fund behoben wurde (v3.2.1,
`styles.css:2324–2341`, Kommentar „3.2.1"): Ab 900px rückt `.view` den
Inhalt um die Spaltenbreite (120px) ein, damit er neben der Desktop-Spalte
steht — im Modus (Lernen/Üben) gibt es diese Spalte aber nicht, `.view--modus`
nahm den Einzug bisher nicht zurück. Jetzt tut sie das. Diese Liste war seit
15.09.2026 nicht mit dem Redesign-Strang abgeglichen worden, deshalb stand
Punkt 5 hier fälschlich weiter als offen — reine Nachdokumentation, kein
neuer Codeschritt nötig.

## 6. Formatierung (Absätze) der Notiz wird beim Anzeigen nicht übernommen — ✅ behoben (v3.0.36)

**Beobachtung:** Wird die Notiz einer Karte angezeigt (Popup), erscheint sie
anders formatiert, als sie eingegeben wurde — Absätze usw. gehen verloren.

**Einschätzung:** Echter Bug. Klassisches Muster: Eingabe (`<textarea>`)
erhält Zeilenumbrüche, die Anzeige nutzt aber vermutlich kein
`white-space: pre-line`/`pre-wrap` (oder rendert über `textContent` korrekt,
aber eine andere Stelle im Anzeige-Pfad normalisiert Leerraum weg). Klar
eingrenzbar, sobald jemand entscheidet, dass das gebaut wird.

**Behoben am 15.09.2026 (v3.0.36):** Bestätigt genau wie vermutet.
`.study-extra` (`styles.css`) hatte kein `white-space` — jetzt `pre-wrap`.
Zusätzlicher Fund dabei: Die aufklappbare Notiz im Lernen-Tab
(`app.js:4419`, Chevron-Knopf bei „Gesehen"-Karten) nutzte dieselbe
`.extra-note`-Klasse wie die einzeilige Listenvorschau in Verwalten
(`app.js:5792`, dort korrekt mit `nowrap`+`ellipsis` für die Kurzansicht).
Für den bewusst aufgeklappten Volltext war `nowrap` falsch. Jetzt eigene
Klasse `.extra-note-voll` mit `pre-wrap`, die Listenvorschau bleibt
unverändert bei `.extra-note`.

## 7. Arabische Schrift bei der Kategorie leicht fehlerhaft — ✅ Ursache gefunden und behoben (v3.0.49)

**Beobachtung:** Die arabische Schrift (z. B. bei der Kategorie-Anzeige eines
Worts) sieht „bisl verbuggt" aus, nicht sauber. Vermutung des Betreibers
selbst: vermutlich nichts zu machen.

**Einschätzung:** Ohne Screenshot/genauen Ort nicht einschätzbar, ob Font-
Rendering-Grenze (z. B. Ligaturen/Kerning in einer bestimmten Schriftgröße,
Browser-eigene Arabisch-Renderer-Eigenheit) oder ein behebbarer
CSS-/Font-Ladefehler. Realistisch: eher niedrige Priorität, wie der Betreiber
selbst vermutet — aber ein Screenshot würde reichen, um das sicher
einzuordnen, statt zu raten.

**Ursache doch ohne Screenshot gefunden, 16.09.2026, beim Prüfen von Punkt
9:** Wort, Übersetzung und Notiz bekommen bei arabischem Text automatisch
eine eigene Schriftart und `dir="rtl"` (`istArabisch()`/`schriftAttr()`,
`app.js`) — Kategorie-/Lektions-/Speicherkarten-**Namen** dagegen nirgends.
Eine arabisch benannte Kategorie lief also immer in der normalen
lateinischen Schrift und von links nach rechts mit, statt in der dafür
vorgesehenen arabischen Schrift von rechts nach links — genau das erklärt
„bisl verbuggt" (falsche Schriftart plus falsche Richtung für arabischen
Text, keine Ligaturen/Kerning-Grenze).

**Behoben (v3.0.49), bewusst nicht überall:** Die zwei Stellen ergänzt, an
denen ein Kategorie-/Lektions-/Speicherkarten-**Name** direkt als Text zu
sehen ist — `kartenTagsHtml()` (Tag-Zeile unter einem Wort, z. B.
„Schwierige Wörter") und `setBlock()` (Name der Speicherkarte in Verwalten).
**Nicht** mitgezogen: `<option>`-Elemente (Verschieben-/Speichern-Auswahl),
Bereichs-Sheet/-Pill (das sind **Bereichs**namen, nicht Kategorien — andere
Ebene, gleicher Fund wäre aber übertragbar) und die Export-/Backup-Texte.
Bewusst kleiner Schnitt statt einer Sammel-Änderung an zehn Stellen auf
einmal — die übrigen Stellen sind derselbe Fund, aber nicht das, was
gemeldet wurde, und bräuchten für `<option>` ohnehin eine andere Lösung
(kein `class`/`dir` auf Options-Text ohne Weiteres wirksam in jedem
Browser).

## 8. Notiz-Schriftart weicht von Wort-Schriftart ab (Ya mit/ohne Punkte)

**Beobachtung:** Die Schrift der Notizen unterscheidet sich von der des
Wort-Felds. Beispiel „Stuhl": im Wort-Bereich erscheint ein Ya ohne die 2
Punkte darunter, in der Notiz mit Punkten. Betreiber selbst: hält das für
normal, kleines Problem.

**Einschätzung:** Stimmt vermutlich mit der Einschätzung des Betreibers
überein — das Wort-Feld lädt wahrscheinlich bewusst eine Quran-/Uthmani-
Schriftart (im Repo als eigene Ressource vermerkt, `verses.quran.foundation`
in `sw.js`), die für den Korantext optimiert ist und dort bewusst die
kontextabhängige („dotless" in bestimmten Positionen) Ya-Form zeigt; Notizen
laufen über eine allgemeine Systemschrift ohne diese Eigenheit. Das wäre kein
Bug, sondern zwei verschiedene, beide korrekte Schriftsysteme für zwei
verschiedene Zwecke (Korantext vs. freie Notiz). Nur zu ändern, wenn der
Betreiber das wirklich einheitlich haben will — technisch möglich, aber
Geschmacksfrage, keine Fehlerbehebung.

## 9. Ist in der Kartenliste klar, was Übersetzung und was Notiz ist? — geprüft, kein Fund (16.09.2026)

**Beobachtung:** Frage, ob in der Liste wirklich klar erkennbar ist, welches
Feld Übersetzung und welches Notiz ist.

**Einschätzung:** Offene Prüffrage, kein bestätigter Bug — bräuchte einen
Blick in die aktuelle Liste (Label, Schriftgröße, Reihenfolge der Felder), um
zu beurteilen, ob eine Verwechslungsgefahr wirklich besteht oder nur in
diesem einen Moment unklar wirkte.

**Geprüft am 16.09.2026, `styles.css`:** Drei gleichzeitig wirkende
Unterscheidungsmerkmale, keine Verwechslungsgefahr gefunden. Wort
(`.card-row .wort`): eigene Schriftfamilie (`--font-text`, dieselbe wie
Überschriften/`.dlg h3`), 1rem, hellste Textfarbe (`--text-1`, geerbt vom
globalen Body-Standard, `styles.css:300`). Übersetzung
(`.card-row .uebersetzung`): 0.8125rem, mittlere Farbe `--text-2`. Notiz
(`.extra-note`): 0.75rem, schwächste Farbe `--text-3`, zusätzlich einzeilig
mit Ellipsis abgeschnitten. Reihenfolge im Markup ist immer Wort →
Übersetzung → Notiz, nie vertauscht. Damit unterscheiden sich alle drei
Felder gleichzeitig in Schriftgröße, Farbe und (Wort) Schriftfamilie — eine
klare dreistufige visuelle Hierarchie, kein Fund. Kein Code geändert.

## 10. Formatierung auch in der Liste anzeigen — durch Punkt 1 abgedeckt (16.09.2026)

**Beobachtung:** Es gab wohl mal die Idee/Funktion, dass Formatierung
(Absätze usw.) auch in der Listenansicht sichtbar ist. Hängt mit Punkt 1
zusammen. Unklar, wie wichtig das ist — Einschätzung des Betreibers selbst.

**Einschätzung:** Kein eigenständiger Punkt, sondern eine Ausbaustufe von
Punkt 6 (Formatierung wird überhaupt respektiert) plus Punkt 1
(Detailansicht). Erst relevant, wenn diese beiden geklärt sind.

**Beide Voraussetzungen seit v3.0.36/v3.0.47 erfüllt — bewusst kein
zusätzlicher Bau.** Punkt 6 (Notiz-Formatierung wird respektiert) ist seit
v3.0.36 behoben, Punkt 1 (Detailansicht) seit v3.0.47 gebaut: Wer die volle,
formatierte Notiz sehen will, tippt die Zeile an und sieht sie in
`cardDetailSheet()` mit `.extra-note-voll` (`pre-wrap`). Die einzeilige
Listenvorschau (`.extra-note`) bleibt bewusst `nowrap`+Ellipsis — sie ist
als kompakte Vorschau gedacht, nicht als Volltextanzeige; genau dafür gibt
es jetzt die Detailansicht. Kein Code geändert.

## 11. Design-Sachen — bewusst zurückgestellt

**Beobachtung:** Der Betreiber selbst: „wären Design-Sachen für wann anders."

**Einschätzung:** Nicht weiter ausgeführt, wie vom Betreiber selbst
vorgesehen — nur als Platzhalter vermerkt, damit klar ist, dass diese
Kategorie existiert und bewusst nicht in dieser Liste steckt.

## 12. Kurzer weißer/leerer Bildschirm vor dem Lade-Indikator

**Beobachtung:** Beim Öffnen der App ist der Bildschirm oft noch kurz leer,
bevor überhaupt der Lade-Indikator erscheint. Wunsch: das so gut wie möglich
kaschieren — als Vorbild die Ernährungs-App Yazio genannt, deren Icon beim
Laden eine eigene Animation durchläuft, während im Hintergrund Dinge
aufgebaut werden.

**Einschätzung:** Bekanntes Muster („weißer Blitz" vor dem ersten Rendern),
technisch meist gelöst über ein sofort inline im HTML sichtbares
Lade-Icon/Splash (nicht erst nach dem Laden von `app.js`/`styles.css`
eingeblendet), plus CSS-Animation ohne JavaScript-Abhängigkeit — passt zum
bestehenden Grundsatz aus `../CLAUDE.md`, dass Eintrittsbewegungen
`@keyframes` sein müssen. Technisch machbar, ohne neue Abhängigkeiten. Kein
Bug im engeren Sinn, sondern wahrgenommene Ladezeit/Politur — passt eher zu
„später", ähnlich wie Punkt 11.

---

## 13. Über-Scrolling: weiter nach unten als nötig — 🔧 Verdachts-Fix versucht, unbestätigt (v3.0.50)

**Beobachtung:** In allen 3 Tabs (Verwalten, Lernen, Üben) kann man weiter
nach unten scrollen als sinnvoll ist. Beispiel: Bei Lernen, wo es nichts mehr
zu lernen gibt, kann man bis ganz nach unten scrollen, bis alles leer ist.

**Einschätzung:** Echter Bug — vermutlich fehlender `overflow: hidden` oder
ähnliches am Container, der alles über die Viewport-Höhe hinaus erlaubt.
Sollte ein Mindest-`max-height` oder Scroll-Einschränkung geben, so dass die
letzte sichtbare Zeile der Liste nicht ganz oben landet.

**Geprüft am 15.09.2026, nicht behoben:** Mehrere Container mit
`min-height: 100dvh` gefunden (`.view--modus`, `.boot`, `.study-card` bei
bestimmten Breiten), teils mit zusätzlichem Padding. Mit `box-sizing:
border-box` (global gesetzt) sollte das theoretisch kein Overscroll
verursachen, aber ob und wie stark es in der Praxis dennoch auftritt, hängt
von der tatsächlich gerenderten Höhe mehrerer verschachtelter Container
zusammen mit `dvh`-Verhalten bei ein-/ausblendender Adressleiste auf
Mobilgeräten ab — das lässt sich nicht zuverlässig durch Code-Lesen
berechnen, nur durch echtes Messen im Browser. Bewusst nicht geraten und
keine CSS-Werte blind geändert.

**16.09.2026: doch versucht, auf ausdrücklichen Wunsch des Betreibers
("checke halt nicht, lass machen") — als Verdachts-Fix, nicht als
bestätigte Lösung.** Konkrete Theorie: `dvh` bildet die AKTUELL sichtbare
Höhe ab und wächst, sobald die Werkzeugleiste des mobilen Browsers beim
Scrollen einklappt. Startet die Seite mit sichtbarer Leiste (kleineres
`dvh`) und die Leiste klappt WÄHREND des Scrollens ein, wächst jeder
`min-height: 100dvh`-Container in diesem Moment nach — es taucht mehr
leerer Raum auf, als beim Laden da war, und genau das liest sich wie „man
kann weiter scrollen, als sinnvoll ist". `svh` (kleinstmögliche Höhe, Leiste
immer mit eingerechnet) bleibt beim Scrollen konstant, kein nachträglich
wachsender Leerraum. Alle fünf Fundstellen aus dem 15.09.-Durchgang
(`body`, `.view--modus`, `.study-card` × 2 Breiten, `.boot`) umgestellt
(v3.0.50). Die zwei `max-height: 88dvh` an `.dlg` (Bottom-Sheet/Dialog)
bewusst nicht angefasst — dort ist `dvh` eine Obergrenze, kein
Scroll-Boden, ein anderer Fall.

**Ausdrücklich unbestätigt.** Anders als bei Beobachtung 7 (dort ergab die
Code-Prüfung selbst schon Gewissheit) bleibt das hier eine Theorie ohne
Messung an einem echten Gerät mit ein-/ausklappender Werkzeugleiste — in
keiner hier verfügbaren Umgebung nachstellbar (auch ein hier laufender
Headless-Chromium ist kein mobiles Safari mit dynamischer Toolbar). Falls
das Over-Scrolling weiterhin auftritt oder sich etwas anderes verschiebt
(z. B. der Ladebildschirm, `.boot`, jetzt `svh` statt `dvh`): einfach
rückgängig machbar (dieser eine Commit), kein Rückbau an mehreren Stellen
nötig.

## 14. Scroll-Position wird zwischen Bereichen nicht zurückgesetzt — ✅ behoben (v3.0.36)

**Beobachtung:** Wenn man in einem Bereich (z. B. Medina im Verwalten) nach
unten scrollt und dann zu einem anderen Bereich wechselt (oder ein neues Tab
öffnet), befindet man sich dort auch noch auf der gleichen Scroll-Position —
statt oben zu sein.

**Einschätzung:** Echter Bug/Nicht-Verhalten. Jeder Bereich sollte seine
Scroll-Position unabhängig speichern und beim Zurückkehren wiederherstellen,
oder (einfacher) beim Tab-Wechsel oder Bereich-Wechsel nach oben springen.
Aktuell sieht es aus, wie wenn ein globales Scroll-Memory existiert, das
nicht neu zurückgesetzt wird.

**Behoben am 15.09.2026 (v3.0.36):** Bestätigt. `selectBereich()` (Zeile
~2759) und die drei Tab-Wechsel-Aktionen `tab-lernen`/`tab-fortschritt`/
`tab-verwalten` setzten viele UI-Zustände zurück (Suchfeld, Auswahlmodus,
Seiten-Index …), aber nie die Scroll-Position — anders als `einstellungen`/
`einstellungen-zu`, die das schon taten (`window.scrollTo(0, 0)`). Dasselbe
jetzt an allen vier Stellen ergänzt. Bewusst **kein** `springeNachOben()`
verwendet — diese bestehende Funktion ist für sanfte Sprünge zu einem
bestimmten Element innerhalb der Seite gedacht (Üben/Abfrage/Durchsicht),
nicht für harte Tab-/Bereichswechsel; das direkte `scrollTo(0,0)` ohne
Animation passt zum bestehenden Einstellungen-Muster.

Hängt zusammen mit **Punkt 3 (Zurück zur Scroll-Position nach dem Bearbeiten)**
— beide sind Scroll-Verwaltungs-Probleme, sollten aber nicht zusammen
entschieden werden, da 3 um eine bewusste Erhaltung nach einem Modal/Dialog
geht, während 14 um ein unerwartetes Verhalten bei einfachem Navigation geht.

## 16. Browser-Zurück von externen Seiten (Datenschutzerklärung, Impressum) zur App wirft Fehler oder zeigt alte Modal — ⏸ Ursache weiterhin ungeklärt, drei Abmilderungen versucht (v3.0.41–43, 51)

**Beobachtung:** Navigation zwischen App und statischen Seiten ist fehlerhaft:
- Von der App (z.B. Fehlerformular in Einstellungen) zur externen Seite
  (Datenschutzerklärung, Impressum) navigieren
- Dann Browser-Zurück drücken
- Ergebnis: Entweder wird das Fehlerformular/die alte App-Seite erneut
  angezeigt (statt zur vorherigen State zu gehen), oder es wirft:
  `Failed to fetch dynamically imported module: https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js`

**Einschätzung:** Echter Bug, vermutlich zwei zusammenhängende Probleme:
1. **Browser-History-Verwirrung:** `index.html` und die statischen Seiten
   (`datenschutzerklaerung.html`, `impressum.html`) sind technisch verschiedene
   HTML-Dateien, aber die App selbst manipuliert `window.history` für
   interne Navigation (ohne Seitenneuladen). Wenn man zur externen Seite
   springt, geht das über echte Links; Zurück über Browser versucht, die
   alte App-State wiederherzustellen, statt wirklich eine Seite zu laden —
   das verwirrt sowohl den Browser als auch Firebase
2. **Firebase Context:** Wenn Zurück in die App gehen will, ist Firebase
   eventuell nicht mehr initialisiert (die externe Seite hielt es nicht am
   Leben), und der Versuch, die alte State zu laden, schlägt fehl

Lösungsraum: `<a>`-Links zwischen App und statischen Seiten müssen echte
Navigationen sein, nicht manipulierte History; oder die statischen Seiten
müssen in einen Single-Page-Kontext integriert sein (eine Seite, mehrere
Views). Heute sind sie separate HTML-Dateien, was der History-Manipulation
widerspricht.

**Geprüft am 15.09.2026: Vermutung 1 widerlegt.** `grep` nach
`history`/`History`/`pushState`/`popstate`/`replaceState` in `app.js` findet
**nichts** — die App manipuliert `window.history` an keiner Stelle. Die
Links zu `datenschutzerklaerung.html`/`impressum.html` sind echte `<a href>`,
echte Navigationen. Vermutung 1 trifft nicht zu.

**Neue Spur, aber nicht verifiziert:** `index.html` lädt `app.js` als
ES-Modul (`<script type="module">`), das bei jedem echten Seitenladen neu
läuft und dann `initFirebase()` aufruft (`app.js:1222`, dynamischer Import
von `gstatic.com` — exakt die Datei aus der gemeldeten Fehlermeldung).
Schlägt das fehl, greift seit v3.0.24 eine Selbstheilung (Service
Worker/Caches löschen, neu laden) — aber nur **einmal pro Sitzung**
(`sessionStorage`-Flag `adrabic-selbstheilung`, bewusst gegen
Endlosschleifen, siehe `app.js:6657-6659`). Hypothese: Wenn diese
Selbstheilung schon beim ersten Laden gegriffen hat, zeigt ein zweiter
Ladefehler (z. B. ausgelöst durch Browser-Zurück, je nach
Back-Forward-Cache-Verhalten des Browsers) direkt den rohen
Fehlerbildschirm statt eines erneuten Heilungsversuchs — das passt zur
gemeldeten Fehlermeldung.

**Nicht gefixt, weil nicht verifizierbar ohne echten Browser.** Anders als
Punkt 4 ist das kein eindeutig lesbarer Code-Fehler, sondern eine Vermutung
über Browser-Cache-Verhalten (bfcache) und Timing. Ein blinder Eingriff am
bestehenden Selbstheilungs-Mechanismus (der bewusst gegen Endlosschleifen
gebaut ist) ohne Testmöglichkeit wäre riskanter als der jetzige Zustand.
Bräuchte einen echten Browser-Test (wie bei Phase 9 mit Playwright), bevor
hier etwas geändert wird.

**Reproduziert auf echtem Gerät, 16.09.2026:** Der Betreiber hat den Fehler
gezielt nachgestellt — „Impressum" in den Einstellungen öffnen, Browser-
Zurück, der Ladefehler-Bildschirm erschien wieder. Bestätigt damit die
Hypothese aus dem vorigen Absatz in ihrem Kern: Der Fehler tritt nach einer
echten Zurück-Navigation zur App auf, nicht durch eine der bereits
widerlegten History-Manipulationen.

**Teilverbesserung v3.0.41, Ursache selbst weiter offen.** Ohne Zugriff auf
Browser-Entwicklertools auf einem echten Gerät lässt sich nicht abschließend
klären, WARUM `initFirebase()` nach der Zurück-Navigation fehlschlägt (bfcache-
Verhalten, Ressourcen-Priorisierung des Browsers bei History-Navigation,
oder etwas Drittes) — das bleibt eine unverifizierte Vermutung, wie zuvor.
Was sich aber sicher und risikoarm verbessern lässt: Die bestehende
Selbstheilung (v3.0.24) versucht bisher nur EINMAL pro Sitzung neu zu laden;
schlägt der automatische Reload-Versuch selbst noch einmal fehl (z. B. durch
ein kurzzeitig blockiertes Cache-/IndexedDB-Handle direkt nach der
Navigation), erscheint sofort der rohe Fehlerbildschirm, obwohl ein zweiter
Versuch die Ursache noch hätte lösen können. Kontingent von 1 auf 2
automatische Versuche pro Sitzung erhöht (`SELBSTHEILUNG_MAX`, `app.js`) —
der bestehende Schutz gegen echtes Endlos-Neuladen (dauerhaft offline,
gstatic.com vom Netzwerk blockiert) bleibt als feste Obergrenze erhalten,
aber eine zweite, wirklich transiente Störung bekommt jetzt eine echte
Chance, sich von selbst zu lösen. Das behebt den Bug nicht zwangsläufig
vollständig (falls der Fehler bei JEDEM Zurück-Navigieren zuverlässig
auftritt statt nur gelegentlich, würde auch ein zweiter Versuch nichts
nützen), macht ihn aber seltener sichtbar.

**Testrückmeldung 16.09.2026: „passiert halt eben wieder" — reichte nicht.**
Wichtiges Signal, kein Fehlschlag zum Ignorieren: Wenn selbst zwei komplette
Neuladen-Versuche (samt Service-Worker-/Cache-Löschung) den Fehler nicht
beheben, spricht das GEGEN die Cache-/bfcache-Hypothese aus dem vorigen
Absatz — ein echter Reload ist keine Zurück-Navigation mehr, unterliegt also
keiner eventuellen Zurück-spezifischen Ressourcen-Drosselung des Browsers
mehr, und scheiterte trotzdem. Wahrscheinlicher: ein echter, einzelner
Netzwerk-Aussetzer genau bei diesem einen Abruf (`import()` von
`firebase-app.js` von gstatic.com), der auch einen frischen Reload nicht
automatisch übersteht, weil jeder Reload denselben Abruf ja erneut riskiert.

**Zwei weitere, unabhängige Abmilderungen (v3.0.43), Ursache weiterhin
ungeklärt:** (1) `initFirebase()` versucht jeden der drei
Firebase-Bausteine jetzt bis zu dreimal einzeln nachzuladen (500ms Pause
dazwischen), BEVOR der teure Reload-Mechanismus überhaupt greift — deutlich
schneller und unauffälliger als ein Reload, falls es wirklich nur ein
kurzer Aussetzer war. (2) Der Fehlerbildschirm zeigt jetzt zusätzlich, wie
viele automatische Selbstheilungs-Versuche schon liefen und ob der Browser
sich selbst für online hielt (`navigator.onLine`) — bewusst NICHT als
weitere Vermutung gedacht, sondern als Diagnose-Werkzeug: Kommt der Fehler
ein drittes Mal, liefert ein Screenshot dieser Zeile einen echten,
verifizierbaren Anhaltspunkt (wie viele Versuche liefen, glaubte der
Browser, online zu sein) statt einer weiteren Vermutung von hier aus ohne
Testmöglichkeit.

**Ehrlich offen:** Die tatsächliche Ursache ist nach jetzt zwei
Interventionsrunden (v3.0.41–43) immer noch nicht bestätigt, nur
eingegrenzt (kein reines Cache-/bfcache-Problem, da Reload allein nicht
half). Ohne echte Browser-Entwicklertools (Netzwerk-Tab) auf dem
betroffenen Gerät bleibt jeder weitere Eingriff am Selbstheilungs-
Mechanismus selbst eine Vermutung. Nächster Schritt: erneuter Gerätetest;
kommt der Fehler wieder, den Diagnose-Text aus dem Fehlerbildschirm
(„X automatische Versuche · online: ja/nein") mitschicken.

**16.09.2026, dritter Versuch (v3.0.51), auf Wunsch des Betreibers
("checke halt nicht, lass machen") — wieder als Verdachts-Fix, nicht als
bestätigte Lösung.** Erst geprüft, ob ein `pageshow`-Listener (Standard-
Werkzeug gegen bfcache-Probleme) etwas bringen würde - Fehlschluss
verworfen: Da der Fehlerbildschirm bei jedem gemeldeten Fall neu aufgebaut
wurde, MUSS das Skript neu ausgeführt worden sein (bei einer echten
bfcache-Wiederherstellung läuft `<script type="module">` gar nicht erneut,
das Skript würde also gar nicht bis zum `initFirebase()`-Aufruf am Ende
kommen). bfcache scheidet damit als Erklärung endgültig aus, nicht nur als
Vermutung - es ist ein echtes, neues Nachladen von `index.html`.

Stattdessen: `initFirebase()` startet die Verbindung zu `gstatic.com`
bisher erst mitten im Skript, beim dynamischen Import selbst - vorher
existiert dafür keine vorbereitete Verbindung. `<link rel="preconnect">`
(+ `dns-prefetch` als Rückfalloption für Browser ohne Preconnect-
Unterstützung) in `index.html` baut TCP/TLS zu `gstatic.com` schon
während des HTML-Parsens auf, parallel zu Stylesheet und Hauptskript,
statt erst Zeilen später. Reine Verbindungs-Vorbereitung ohne
Verhaltensänderung an Selbstheilung/Retry-Logik - kann die Chance
erhöhen, dass der ohnehin schon dreifach wiederholte Import
(`importMitVersuch`) gleich beim ersten Versuch durchkommt, behebt aber
nichts, falls die eigentliche Ursache woanders liegt (z. B. echte
Bandbreiten-/DNS-Drosselung durch den Browser bei einer
Zurück-Navigation, die auch eine vorbereitete Verbindung nicht umgeht).

**Weiterhin ausdrücklich unbestätigt**, wie bei Beobachtung 13 - kein
Gerätetest in dieser Umgebung möglich. Trivial rückgängig zu machen (ein
`<link>`-Paar), keine Logik geändert.

## 15. Viewport-Verschiebung beim Scrollen und beim Registrieren — ✅ behoben (v3.0.37)

**Beobachtung:** Der Bildschirm verschiebt sich bzw. der Viewport ändert sich:
- Beim Scrollen in der Verwalten-Liste verschieben sich die Seitenverhältnisse
- Beim Registrieren, wenn man alles eingibt und auf „Fertig" drückt, zoomt der
  Bildschirm rein
- Das Ganze lässt sich rauszoomem (also kein echtes Zoom, sondern eine
  Viewport-/Größen-Verschiebung)

**Einschätzung:** Echter Layout-Bug, vermutlich mehrere Root Causes:
1. Beim Scrollen: Vermutlich Scrollbar, die sich ein-/auszeigt und dadurch die
   Breite des sichtbaren Bereichs ändert (auf Desktop sichtbar, auf Handy oft
   kaum bemerkt) — Standard-Lösung: `scrollbar-gutter: stable` CSS-Property,
   um Platz zu reservieren
2. Beim Speichern des Registrierungs-Dialogs: Ein Modal öffnet/schließt sich
   vielleicht, was den Overflow der Seite ändert — Standard-Lösung:
   `overflow: hidden` auf `body` während Modal offen, wieder entfernen beim
   Schließen
3. Das Rauszoombare deutet auf `viewport`-Meta-Tag-Probleme hin oder fehlenden
   Touch-Action-Constraints

Alle drei Probleme sind Kombination aus häufigen Bugs — sollten priorisiert
werden, wenn was gebaut wird.

**Behoben am 15.09.2026 (v3.0.37), Ursachen anders als vermutet:**

1. **Zoom-Symptome (Punkte 2+3) waren derselbe Bug, kein Modal-Problem.**
   Alle Text-Eingabefelder (`styles.css:862`) hatten `font-size: 0.9375rem`
   = 15px — unter der 16px-Schwelle, ab der iOS Safari beim Fokussieren
   eines Feldes automatisch hineinzoomt und beim Verlassen nicht
   zuverlässig zurückzoomt. „Fertig drücken" bezieht sich vermutlich auf
   die Tastatur-Fertig-Taste, nicht auf einen App-Button — der
   Registrierungsbildschirm (`.solo`) ist ohnehin kein Overlay/Modal,
   sondern eine normale Ansicht im Dokumentfluss, die
   `overflow:hidden`-Vermutung traf nicht zu. Jetzt `font-size: 1rem`
   (16px) für alle Eingabefelder — hält iOS unter der Zoom-Schwelle, ohne
   dass die App selbst Zoom einschränkt (kein `maximum-scale`, das wäre
   ein WCAG-1.4.4-Verstoß).

2. **Scrollbar-Vermutung (Punkt 1) bestätigt.** `html` reservierte keinen
   festen Platz für die Scrollbar. Jetzt `scrollbar-gutter: stable`.

---

## 17. Serie ändert sich unberechenbar — ✅ Ursache gefunden und behoben (18.09.2026)

**Beobachtung:** Betreiber, ohne genauere Angabe: „meine Streak ändert sich
ständig... da muss was sicher dahinter", auf Nachfrage nach dem genauen
Muster: „ehrlich ka, da ist unberechenbar hab ich das gefühl. mach was
starkes daraus."

**Anders als die übrigen Punkte hier: Das ist echte Lernlogik** (Serie/Streak
steht in `AUFTRAG.md` des Redesign-Strangs als harte, dauerhaft ausgenommene
Grenze — „auch bei vollem Umbau"). Nur auf diese ausdrückliche Freigabe hin
angefasst, nicht von selbst.

**Ursache gefunden, ohne Screenshot/Reproduktion — direkt im Code beweisbar:**
Der Firestore-Listener auf das Nutzerdokument (`app.js`, `onAuthStateChanged`
→ `onSnapshot`) begann mit `if (snap.metadata.hasPendingWrites) return;` —
gedacht, um das Echo der EIGENEN, gerade selbst ausgelösten Schreibaktion zu
ignorieren (Kommentar „eigenes Echo ignorieren"). Das blockte aber auch die
ALLERERSTE Momentaufnahme nach einem Neustart der App, wenn zu diesem
Zeitpunkt noch ein ungesendeter Schreibvorgang aus der letzten Sitzung in
Firestores eigenem Offline-Speicher lag (z. B.: App im Flugmodus oder mit
schlechtem Netz geschlossen, kurz nachdem heute die erste Karte bewertet
wurde — genau der Moment, der die Serie um einen Tag verlängert). `verlauf`
und `streak` blieben dann auf ihrem frisch zurückgesetzten Leerzustand
stehen (`serieAktuell()` zeigt dann 0 bzw. den alten Stand), bis der
Schreibvorgang online ging und eine zweite, „saubere" Momentaufnahme
nachkam — für den Nutzer sieht das aus, als würde sich die Serie von selbst
ändern, ohne dass am Kartenbestand etwas passiert wäre.

**Behoben:** Bedingung auf `if (snap.metadata.hasPendingWrites &&
cloudDocExists) return;` erweitert. `cloudDocExists` ist erst NACH der
ersten wirklich verarbeiteten Momentaufnahme dieser Sitzung wahr (startet
`false`, wird bei jedem Neustart zurückgesetzt) — solange es falsch ist,
gibt es nichts Frischeres im Speicher zu schützen, also wird auch eine noch
ausstehende Momentaufnahme diesmal verarbeitet statt verworfen. Die
eigentliche Echo-Unterdrückung (mitten in einer laufenden Sitzung, nach dem
ersten echten Laden) bleibt unverändert erhalten.

**Bewusst nicht angefasst:** die eigentliche Streak-Mathematik
(`serieAktuell()`, `evaluateStreakForNewDay()`, Sockel/Joker) — dort war
beim Durchlesen kein Fehler zu finden, nur diese eine Ladelücke davor. Eine
zweite, spekulative Idee (leere `{w:0,n:0}`-Tageseinträge könnten theoretisch
fälschlich als „gelernter Tag" zählen) wurde geprüft und verworfen: Beide
Aufrufer von `verlaufZaehle()` erhöhen den Zähler synchron, bevor irgendwas
gespeichert wird — ein solcher Leereintrag entsteht im heutigen Code
nachweislich nicht.

**Offen:** **Kein Gerätetest möglich** (kein Firebase-Login in dieser
Umgebung, kein Weg, einen echten Offline/Online-Wechsel nachzustellen).
Geprüft nur per Code-Review und `node --check`. Ob das Gefühl „unberechenbar"
damit vollständig behoben ist oder ob es noch eine zweite Ursache gibt,
zeigt sich erst nach ein paar Tagen echter Nutzung.

**Nächster Schritt:** Beobachten, ob die Serie über die nächsten Tage/eine
Woche stabil bleibt (besonders nach Nutzung mit schwachem Netz). Wenn sie
weiter unerwartet wechselt: möglichst genau notieren, WANN (direkt nach dem
Öffnen? nach einem Ortswechsel/Netzwechsel? nach einem zweiten Gerät?) —
das würde die verbleibenden Kandidaten (z. B. `verlaufSpeichernBald()`s
2-Sekunden-Verzögerung bei WEITEREN Bewertungen desselben Tages, die verloren
gehen kann, wenn die Seite currentUser vorher schließt) eingrenzen.

## Zusammenfassung nach Schweregrad (nur zur Einordnung, keine Entscheidung)

- **Echte Bugs, unabhängig voneinander behebbar:** 2 (versehentliches
  Verschieben — höchste Priorität, weil Datenänderung ohne Absicht), 4
  (ungewollter Autofokus/Tastatur), 5 (✅ v3.2.1, siehe dort — über den
  Redesign-Strang behoben, nicht über diese Liste), 6 (Formatierung geht
  verloren), 13 (Over-Scrolling — 🔧 Verdachts-Fix v3.0.50, unbestätigt),
  14 (Scroll-Position nicht zurückgesetzt),
  15 (Viewport-Verschiebung beim Scrollen/Speichern), 16 (History/Firebase-Bug
  beim Zurück von externen Seiten — auch höhere Priorität, weil App-Fehler;
  🔧 dritter Verdachts-Fix v3.0.51, unbestätigt).
- **Zusammenhängende UX-Verbesserung, gemeinsam zu entscheiden:** 1 (✅ v3.0.47),
  3 (✅ v3.0.48, beide auf Freigabe des Betreibers gebaut — am Ende unabhängig
  voneinander gelöst, siehe dort), 10 (✅ 16.09.2026, durch 1+6 abgedeckt, kein
  eigener Bau nötig), 14.
- **Prüffragen:** 9 (✅ 16.09.2026 geprüft — dreistufige Hierarchie aus
  Schriftgröße, Farbe und Schriftfamilie, keine Verwechslungsgefahr).
  7 stellte sich beim Prüfen als echter, jetzt behobener Fund heraus (✅
  v3.0.49) — siehe dort.
- **Vermutlich kein Bug, sondern Design-Entscheidung:** 8.
- **Bewusst zurückgestellt:** 11, 12.

## 18. Untere Navigationsleiste springt vertikal auf dem Handy — GELÖST (v3.6.7)

Betreiber nutzt eine zum Home-Bildschirm hinzugefügte PWA (`display:
standalone`, kein Safari-Chrome, keine Browser-Toolbar). Screenshots
zeigen: Bei kurzem Inhalt sitzt `.nav` sichtbar höher als bei langem/
gescrolltem Inhalt.

**Drei Anläufe, keiner hat die Ursache getroffen:**
1. **v3.6.1** — Bereichs-Pill feste Breite gemacht. Falsches Element (Betreiber meinte die untere Nav-Leiste, nicht die Pille oben).
2. **v3.6.3** — `--vv-gap` über `window.visualViewport` gegen Adressleisten-Dynamik. Scheidet aus: Standalone-PWA hat keine Browser-Toolbar.
3. Geprüft und ausgeschlossen: Margin-Symmetrie auf `.nav__tab.active`, Icon-Varianten `.i.voll`, `body`-Höhe (schon `100svh`), Containing-Block durch Transform/Filter auf einem `.nav`-Elternelement.

**v3.6.4/3.6.5 — Debug-Overlay** (später auch per 7× Tap auf die Versionsnummer aktivierbar, da die installierte App mit eigener `start_url` startet und den URL-Parameter verliert).

**v3.6.6 — Ursache gefunden, mit Messwerten belegt.** `window.innerHeight` liefert in der Home-Bildschirm-App unterschiedliche Werte für denselben Bildschirm: 848px bei nicht-scrollbarem Inhalt, 896px bei scrollbarem — 48px Differenz. `visualViewport` zeigt denselben falschen Wert. Fix: größten je gemessenen Wert als Referenz nehmen.

**v3.6.7 — Vorzeichenfehler korrigiert.** Erster Versuch addierte `--vv-gap` zu `bottom`, richtig ist subtrahieren (bei zu kleinem `innerHeight` muss die Leiste näher an den Rand, nicht weiter weg). **Am echten Handy bestätigt:** `nav.bottom` zeigt jetzt in allen drei Tabs identisch 850 — Sprung ist weg.

**v3.6.14 — Nachtrag, weil „gelöst" zu früh war (19.09.2026).** Betreiber-Screenshots (iPhone, Home-Bildschirm-App): Beim Öffnen sitzt die Leiste bei y≈1603 (px im Screenshot), nach dem ersten Wechsel zu Fortschritt bei 1698 – dieselben 48 CSS-px wie oben. Der „größte gemessene Wert" fehlt beim ersten Öffnen, und beim Tabwechsel läuft `innerHeight` dem Neuzeichnen hinterher (kurzes Springen). Fix: in der iOS-App feste Höhe aus `screen.*`, Leiste von oben verankert, unabhängig von `innerHeight`. Am Gerät gegenzuprüfen.

**Nebenfund beim Testen, ebenfalls behoben (v3.6.8):** Die Hochzähl-Animation ("Diese Woche im Vergleich") lief bei jedem Tab-Besuch neu von 0, weil ihr Merker im DOM stand und bei jedem `render()` verloren ging. Bestand schon vorher, unabhängig von Beobachtung 18. Jetzt in einer Modul-Variable, übersteht render()-Aufrufe.

## 19. Gesamtprüfung „Reibungsfreiheit" (19.09.2026) — 19 Funde, 16 behoben in v3.6.13, 3 bewusst offen

**Anlass:** Betreiber meldet: grüner Kasten oben links steht noch immer; der
Seitenwechsel ist seit dem Nav-Fix (Beobachtung 18) „verbuggt, nicht smooth".
Auftrag: die ganze App nach unsauberen Stellen absuchen, so viele wie möglich.

**Methode:** Die echte `app.js`/`styles.css` liefen unverändert in Playwright/
Chromium (Handy-Größe 390×844, auch 320×568, 768×1024, 1280×800) gegen eine
Firebase-Attrappe im Speicher (Konto, 3 Bereiche, Karten). Gemessen wurde mit
`MutationObserver`, `getAnimations()`, CDP-Profiler und `Performance.getMetrics`.
Die Prüfwerkzeuge liegen im Scratchpad der Session (`fbstub.js`, `probe.mjs`,
`t1`–`t15.mjs`), nicht im Repo. **Nicht prüfbar ohne echtes Gerät:** iOS-
Tastatur, echte `visualViewport`-Werte der Home-Bildschirm-App, Bildwiederholrate.
„gemessen" = im Probelauf reproduziert; „Code" = nur aus dem Quelltext gelesen.

**A · Der grüne Kasten und das Scrollen**
1. **gemessen — Der grüne Kasten ist das Debug-Overlay aus v3.6.4/3.6.5**
   (`zeigeNavDebugOverlay`, `app.js:7721`). Es bleibt über `localStorage`
   `debugNav=1` **für immer an**, wird von keiner Version je abgeschaltet
   (7× Tap auf die Versionsnummer setzt es, nichts löscht es) und wurde nach der
   Lösung von Beobachtung 18 nicht entfernt, obwohl der Kommentar es zusagt
   (`app.js:7720`). Es liegt mit z-index 99999 über Kopfzeile und Bereichs-Pille
   (390×185 px). **Schlimmer: es macht das Scrollen ~9× langsamer.** Bei jedem
   `scroll`-Ereignis liest es `getBoundingClientRect`/`getComputedStyle` und
   schreibt Text — 90 Scroll-Frames = 121 erzwungene Layouts + Style-Neuberechnungen,
   Bildzeit bei 4× gedrosselter CPU **≈250 ms mit, ≈28 ms ohne** Overlay.
   Dazu ein `setInterval` alle 500 ms, das nie endet (`app.js:7753`).

**B · Seitenwechsel**
2. **gemessen — Jeder `render()` baut ganz `#app` neu:** Kopfzeile und
   Navigationsleiste werden zerstört und neu erzeugt, `.view` blendet von
   Deckkraft **0** auf 1 (`styles.css:527`, `enter-fade`), dazu `enter-rise` auf
   Karten/Stapel. Die Eintrittsanimationen sind für „neue Seite" gedacht, laufen
   aber bei **jedem** Neuzeichnen. Gemessen bei: Tab-Wechsel, **erneutem Tippen
   auf den schon aktiven Tab**, Öffnen des Bereichs-Blatts (der ganze Hintergrund
   blinkt mit) und **Cloud-Daten ohne jeden Klick** (fremde Änderung → Blinken).
   Das ist das „verhackt" beim Wechsel. Die aktive Reiter-Fläche kann nie
   gleiten, weil das Element jedes Mal neu ist.
3. **gemessen — Ein Bewerten = 2 Neuaufbauten** im selben Takt (Bewerten +
   Snapshot-Echo von `persistCardGrade`); drei getrennte Snapshot-Listener
   (`app.js:1368/1372/1446`) rufen je `render()`. Nicht sichtbar doppelt, aber
   doppelte Arbeit pro Antwort.
4. **gemessen — Regression aus Beobachtung 18: Die Nav-Leiste verschwindet
   nach dem Drehen.** `maxViewportHeight` (`app.js:7700`) merkt sich den größten
   je gemessenen Wert und wird nie zurückgesetzt. 390×844 → Querformat 844×390:
   `--vv-gap` = 454 px, die Leiste sitzt bei y=766 in einem 390 px hohen Fenster —
   **komplett außerhalb, nicht erreichbar.** Gleiches am Desktop bei Fenstern
   <900 px Breite, die man niedriger zieht (560 px → 284 px Lücke). Erst zurück
   im Hochformat ist sie wieder da. Die Portrait-Lösung selbst stimmt.
   Der Toast (`styles.css:2112`) kennt `--vv-gap` nicht und sitzt anders als die Leiste.
5. **Code — Tab-Wechsel scrollt vor dem Neuzeichnen nach oben**
   (`window.scrollTo(0,0)` vor `render()`, `app.js:8020–8025`): erst Sprung,
   dann Blinken. Auf den aktiven Tab tippen springt ebenfalls nach oben und
   verwirft Suche/Auswahl.

**C · Blätter, Dialoge, Toast**
6. **gemessen — Der Toast verdeckt das Notiz-Feld des offenen Karten-Blatts**
   (Toast-Fläche 105–285 × 711–752 px liegt auf `#f-extra`, `pointer-events:auto`)
   für 2,6 s — Tippen aufs Feld geht ins Leere.
7. **gemessen — Der Toast-Timer zeichnet das offene Blatt neu, während man
   tippt:** 2,6 s nach „Hinzufügen" ist `#f-wort` ein **anderes Element**
   (Markierung weg, Fokus per Skript zurückgesetzt). Auf iOS öffnet ein Skript-
   Fokus die Tastatur nicht wieder → sie dürfte mitten im Wort zugehen; eine
   arabische Eingabemethode (IME) wird unterbrochen. (Am Gerät bestätigen.)
   Dasselbe passiert bei jedem Cloud-Snapshot, der bei offenem Blatt eintrifft;
   das Blatt spielt dabei `sheet-up` neu ab.
8. **gemessen — Die Seite hinter einem offenen Blatt scrollt mit** (kein
   Scroll-Lock, `body` bleibt scrollbar).
9. **Code — Blätter haben keine Austrittsbewegung** (sie verschwinden abrupt),
   keinen Fokus-Fang und keine Fokus-Rückgabe trotz `aria-modal`. Escape schließt
   Bereichs-, Mehr- und Detail-Blatt, aber **nicht** Karten-, Wahl- und
   Speicherkarten-Blatt (`app.js:7869–7880`); zwei getrennte `render()` hintereinander.
   **✅ Zweite Hälfte behoben (v3.9.3, 23.09.2026):** Austrittsbewegung (dieselbe
   wie beim Wegwischen, jetzt auch bei Escape/Hintergrund-Tipp/Knopf, geteilte
   Funktion `spielAustrittsAnimation`), Fokus-Fang per Tab (`.dlg` haelt den
   Fokus, solange es offen ist) und Fokus-Rückgabe an den öffnenden Knopf beim
   Schließen (`sheetOeffnerSel`/`fokusSchluessel` in `render()`). Mit Playwright
   gegen eine Firebase-Attrappe geprüft (Öffnen/Schließen/Tab-Fang/Timing);
   **kein Gerätetest** — ob sich die Bewegung auf einem echten Bildschirm
   genauso anfühlt, ist offen. Details: `CHANGELOG.md` 3.9.3,
   `redesign-oberflaeche/LOGBUCH.md`.

**D · Fehler in der Konsole**
10. **gemessen — `ReferenceError: teilLinkPruefenUndVerarbeiten is not defined`
    bei JEDEM Daten-Snapshot** (`app.js:1357`, aufgerufen in
    `datenZusammenbauen()`). Rest des Link-Teilens, das mit v3.6.0 durch Code-
    Teilen ersetzt wurde; die Funktion gibt es nicht mehr. Der Aufruf steht nach
    `render()`, die Oberfläche merkt es nicht — aber jeder Snapshot wirft, das
    verdeckt echte Fehler in Konsole/Fehlerprotokoll.

**E · Lernen**
11. **gemessen — Wischen + zweite Eingabe innerhalb 180 ms bewertet zwei Karten,
    die zweite ungesehen.** `wischEnde` löst die Bewertung per `setTimeout(…,180)`
    aus (`app.js:4296`) ohne Sperre; der Bewertungs-Knopf/die Taste bleibt in der
    Zeit aktiv. Probelauf: 1 Wischen + Taste „3" → Schreibvorgänge auf `k0_0` **und**
    `k0_5`.

**F · Verwalten und Größe**
12. **Code (Kommentar im Quelltext bestätigt es) — Der Ziehgriff links in jeder
    Zeile hat `touch-action:none` und holt das Scrollen per `scrollBy` nach**
    (`app.js:7382–7400`) — ohne Schwung/Auslaufen. Mit dem Daumen über die
    Griffspalte zu scrollen ruckelt.
13. **gemessen — Schwer zu zeichnen:** Verwalten = **2356 Elemente** bei 200
    Karten/Bereich; Tab-Eintritt ≈70 ms Style+Layout, je 1 Long-Task
    (114–153 ms ohne Drosselung) bei Fortschritt und Verwalten, Tippen in der
    Suche bei 3000 Karten 1 Long-Task (62 ms). Auf dem Handy mehrfach so lang.
    Nur Größenordnung — Headless-Chromium rasterisiert per Software.
    **✅ Nachgemessen und geprüft (23.09.2026, Betreiber-Freigabe „mach A" →
    „mach einfach"):** Die Seitenteilung (`SEITEN_SCHWELLE`/`SEITE_GROESSE`,
    `app.js:922-923`) kam mit v3.6.9 — **vor** dieser Messung in v3.6.13 — und
    deckelt die Verwalten-Liste strukturell auf ~100 gerenderte Zeilen,
    unabhängig von der Gesamtkartenzahl. Frisch gemessen: 200 Karten → 1445
    Elemente/63 ms, 5000 Karten → **unverändert** 1445 Elemente/85 ms. Eine
    Virtualisierung (dafür gedacht, DOM-Größe zu deckeln) hätte hier nichts
    mehr zu tun — genau das leistet die Seitenteilung bereits. Warum die
    2356 damals trotz schon aktiver Seitenteilung gemessen wurden, ist nicht
    mehr rekonstruierbar (vermutlich andere Testkonfiguration), aber ohne
    Belang, da der heutige Code nachweislich nicht so hoch geht. Leeches/
    Lektionen im Fortschritt-Tab sind fachlich klein und brauchen keine
    Seitenteilung. Die Fortschritt-**Übersicht** selbst ist kein DOM-Problem
    (nur 90 Elemente), sondern reine Rechenkosten über die volle Kartenliste
    (20–72 ms bei 3000 Karten gemessen) — ein anderer, kleinerer Punkt als
    der hier gemeldete, nicht mitgebaut. **Kein Code geändert** — der Fund
    war real, ist aber bereits durch v3.6.9 erledigt. Details, Messwerte und
    Testaufbau: `redesign-oberflaeche/AUFTRAG.md`, `redesign-oberflaeche/LOGBUCH.md`.

**G · Bedienbarkeit**
14. **gemessen — Ziele unter der eigenen 44-px-Regel (`--tap`, Satz 3):**
    „Jetzt sichern" 95×36, Fortschritt „Alle Bereiche/Nur …" 36, „Üben"/„Mehr" 36,
    Such-Bereichs-Umschalter 34, Such-Leeren 34×34, **Bearbeiten und Löschen
    nebeneinander je 42×36**, „Fertig" 62×36, Anmelde-Links „Passwort vergessen" 36,
    **Datenschutz/Impressum-Links nur 21 px hoch** (Einstellungen und Anmeldung).
15. **Code — `.appbar.scrolled` wird von keinem Skript gesetzt** (`styles.css:572`):
    die versprochene Kante unter der Kopfleiste erscheint nie, Inhalt läuft
    unscharf darunter durch.

**H · Start und Gerät**
16. **Code — Service Worker: Netz zuerst, ohne Zeitlimit, `cache:"no-store"`**
    (`sw.js:93`). Jeder Start wartet auf das Netz für `app.js`/`styles.css`/Bilder;
    bei schlechtem Netz hängt der Start am Lade-Kreisel, statt sofort aus dem
    Cache zu kommen. Kein Ausweichen nach z. B. 3 s.
17. **Code — Farbnaht:** `theme-color`/`background_color` = `#0b0a09`
    (`index.html:24`, `manifest.json`), aber die Seite ist seit 17.09. `#0e0e12`
    (`--ink-900`). Auf Android sichtbarer Farbsprung an Statusleiste/Startbild.
18. **Code — Icons mit `"any maskable"` in einer Angabe:** maskable-Symbole
    brauchen Sicherheitsrand; so kann Android das Symbol beschneiden.
19. **Code — Zwei Neuaufbauten für einen Escape-Druck** und `visualViewport`-
    Reaktion auf Tastatur/Pinch-Zoom: dort wächst `--vv-gap` ebenfalls (die
    Leiste rutscht weg); ob das auf dem Gerät stört, ungeklärt.

**Umgesetzt in v3.6.13 (am selben Tag, Betreiber-Freigabe „alle fixen, push main"):**
Punkte 1–8, 10, 11, 12, 14–19. Im Probelauf gegen denselben Stand nachgemessen:
Nav-Leiste wird nicht mehr neu erzeugt, erneutes Tippen auf den aktiven Tab
zeichnet nichts neu, Cloud-Stand/Sheet-Öffnen blinken nicht mehr (`.view`-
Deckkraft bleibt 1), Drehen ins Querformat lässt die Leiste sichtbar
(`--vv-gap` 0 statt 454), Bewerten = 1 Neuaufbau, Feld `#f-wort` bleibt beim
Toast-Ablauf dasselbe Element, Toast liegt oben (y=16) und verdeckt kein
Formularfeld, Seite hinter Blatt scrollt nicht, Wischen + Taste = 1
Schreibvorgang, kein Overlay/keine Seitenfehler mehr. Zusätzlich: Klick-Durchlauf
über alle sichtbaren Knöpfe ohne Seitenfehler.
**Bewusst offen:** Punkt 9 zur Hälfte (Austrittsbewegung der Blätter, Fokus-
Rückgabe beim Schließen) — **✅ nachgeholt in v3.9.3, 23.09.2026, siehe dort**.
Punkt 13 (Renderkosten der Verwalten-Liste) — **✅ am 23.09.2026 nachgemessen,
bereits durch v3.6.9 (Seitenteilung) erledigt, kein weiterer Bau nötig, siehe
dort**. Weiterhin offen: alles, was nur am echten iPhone prüfbar ist
(Tastatur bleibt beim Toast-Ablauf offen? Nav-Höhe in der Home-Bildschirm-App
unverändert 850 in allen Tabs?). **Beides am Gerät gegenprüfen.**

**Ursprüngliche Empfehlung (Stand vor dem Bau):** ① Overlay samt Aktivierung
entfernen und `debugNav` einmalig aus `localStorage` löschen (Punkt 1, löst „grüner
Kasten" und den größten Teil des zähen Scrollens). ② Toten Aufruf in
`app.js:1357` entfernen (10). ③ `maxViewportHeight` beim Drehen/Breitenwechsel
zurücksetzen (4). ④ Eintrittsanimation nur bei echtem Seitenwechsel abspielen
(Klasse nur dann setzen) und Kopfzeile/Leiste nicht bei jedem Snapshot ersetzen
(2, 3, 5, 7). ⑤ Toast außerhalb des Blatts und ohne `render()` (6, 7). ⑥ Sperre
für den Wisch-Timer (11). ⑦ Ziele auf 44 px (14).

---

## 20. Quran-Ayat auswendig lernen — Reihenfolge statt Zufallsprinzip (neue Idee, 23.09.2026)

**Beobachtung:** Betreiber-Idee, ausdrücklich „ohne in die Umsetzung zu
gehen": Verse (Ayat) des Quran auswendig lernen ist anders als Vokabeln
lernen. Die heutige Lernlogik zeigt fällige Karten in der Reihenfolge, die
sich aus Fälligkeit/Algorithmus ergibt — für Ayat will man aber die
**Reihenfolge im Text**, nicht zufällig durcheinander. Gegenprobe des
Betreibers, mit der eigenen Unsicherheit benannt: manche Leute lernen Ayat
gerade so, dass man ihnen eine beliebige Ayah nennt und sie die davor/danach
rezitieren können — das wäre dann doch kein reines Sequenz-Lernen. Betreiber
selbst: „damit kenn ich mich ned aus."

**Einschätzung:** Kein Bug, ein echter Unterschied im Lernziel. Die
Wiederholung nach Stufen (worauf diese App aufbaut) optimiert dafür, WANN
eine Karte wieder drankommt, nicht in welcher Reihenfolge mehrere fällige
Karten gezeigt werden — für Vokabeln beliebig, für einen fortlaufenden Text
nicht. Eine „Reihenfolge halten"-Option wäre kein kleiner Zusatz, sondern
eine zweite Lern-Betriebsart neben der heutigen (fasst die Lernlogik selbst
an, `../CLAUDE.md` § 7 schließt das für laufende Phasen aus). Die zweite,
vom Betreiber selbst genannte Variante (beliebige Ayah → Vor-/Nachbarvers)
ist fachlich als aktiver Abruf über den Kontext eine dritte, wieder andere
Anforderung. Beides bräuchte, falls verfolgt, ein eigenes Konzept wie
`onboarding/` oder `lehrer-modus/` — kein Punkt für „nimm einen und mach."

**Nächster Schritt:** Keiner. Notiert für den Fall, dass der Betreiber das
später vertiefen will — dann eigener Nebenstrang, kein Direktbau. Zusätzlich
als möglicher Premium-Feature-Kandidat in
[`monetarisierung/GERUEST.md`](monetarisierung/GERUEST.md) Abschnitt A
verlinkt (Betreiber-Wunsch 23.09.2026) — ändert nichts an „nicht gebaut",
nur ein zweiter Ort, an dem die Idee nicht verloren geht.

## 21. Karten-Formular: „Notiz"-Feld trägt auch Grammatik, aber ist nicht als solches erkennbar — ✅ Label-Wort ergänzt (23.09.2026)

**Beobachtung:** Betreiber nutzt das Feld `extra` (Formular-Beschriftung:
„Beispielsatz, Bild-Link oder Notiz") auch für grammatische Hinweise zu
einer Karte. Vermutung: Wer eine Karten-App primär für Vokabeln erwartet,
kommt nicht unbedingt darauf, dass genau dieses eine Feld auch für Grammatik
gedacht sein kann — die Beschriftung nennt drei Beispiele, Grammatik ist
keines davon.

**Einschätzung:** Kein Bug, eine Formulierungsfrage. Betrifft nur die
Feldbeschriftung in `app.js` (`karteSheet()`, Label bei `f-extra`), keine
Lernlogik — läge damit unter der seit 18.09.2026 dauerhaften Lockerung aus
`../CLAUDE.md` § 7 (Bedienung/Optik für Design-/Verbesserungszwecke).
Kleinstmöglicher Schritt wäre, „Grammatik" als viertes Beispiel in die
Beschriftung aufzunehmen („Beispielsatz, Grammatik, Bild-Link oder Notiz").
Nicht gebaut — der Betreiber hat das als offenen Punkt benannt, „wo man was
machen könnte passend", keine Entscheidung getroffen, wie prominent das sein
soll (Label-Wort reicht, oder soll das Feld sichtbar in „Notiz" und
„Grammatik" aufgeteilt werden — Letzteres wäre keine Formulierungsfrage mehr,
sondern ein neues Datenfeld mit allem, was das an `firestore.rules` und
Anzeige nach sich zieht).

**Gebaut am 23.09.2026:** Betreiber wollte „erst an Feld 21 rangehen" —
ohne weitere Angabe zwischen Label-Wort und eigenem Feld gewählt der
**kleinstmögliche Schritt**: Beschriftung von `f-extra` in `app.js`
(`karteSheet()`, Zeile bei `f-extra`) und der zugehörige Kommentar bei
`MAX_EXTRA` von „Beispielsatz, Bild-Link oder Notiz" auf „Beispielsatz,
**Grammatik**, Bild-Link oder Notiz" erweitert. Reine Textänderung, keine
Datenstruktur, keine `firestore.rules` betroffen. Ein eigenes Grammatik-Feld
(sichtbar getrennt von der Notiz) bleibt möglich, falls das Label allein
nicht reicht — dann bitte ausdrücklich sagen, das ist ein größerer Schritt
mit neuem Datenfeld.

**Nächster Schritt:** Keiner, außer der Betreiber meldet, dass das
Label-Wort nicht reicht.

---

**Nächster Schritt:** Liegt beim Betreiber — welche Punkte überhaupt
angegangen werden sollen, und ob dafür eine neue Phase/ein neuer Strang
aufgemacht wird (analog zur Landing-Page-Strategie). Bis dahin bleibt diese
Datei eine reine Sammlung, kein Auftrag.
