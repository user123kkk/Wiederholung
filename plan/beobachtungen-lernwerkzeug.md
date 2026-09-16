# Beobachtungen am Lernwerkzeug — noch nicht entschieden, nicht gebaut

Angelegt: 15. September 2026, aus einer Nutzungssitzung des Betreibers.
Zuletzt erweitert: 15. September 2026 (Punkte 13–16 hinzugefügt).
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

## 5. Lernen/Üben-Feld auf dem iPad nicht mittig

**Beobachtung:** Auf dem iPad ist das Eingabefeld bei Lernen/Üben nicht
zentriert, sondern nach rechts verschoben — zusammen mit dem
„Antwort anzeigen"-Knopf.

**Einschätzung:** Echter Layout-Bug, wahrscheinlich Breakpoint-/Flexbox-
Problem, das nur bei bestimmten Viewport-Breiten (iPad-Größe) auftritt und am
Telefon/Desktop nicht auffällt. Ohne echtes Gerät oder iPad-Emulation im
Browser nicht zuverlässig zu reproduzieren — bräuchte gezielten Test in den
Breitenbereichen, die ein iPad tatsächlich hat (Hoch- und Querformat sind
vermutlich unterschiedlich betroffen).

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

## 16. Browser-Zurück von externen Seiten (Datenschutzerklärung, Impressum) zur App wirft Fehler oder zeigt alte Modal — ⏸ Ursache weiterhin ungeklärt, zwei Abmilderungen versucht (v3.0.41–43)

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

## Zusammenfassung nach Schweregrad (nur zur Einordnung, keine Entscheidung)

- **Echte Bugs, unabhängig voneinander behebbar:** 2 (versehentliches
  Verschieben — höchste Priorität, weil Datenänderung ohne Absicht), 4
  (ungewollter Autofokus/Tastatur), 5 (iPad-Layout), 6 (Formatierung geht
  verloren), 13 (Over-Scrolling — 🔧 Verdachts-Fix v3.0.50, unbestätigt),
  14 (Scroll-Position nicht zurückgesetzt),
  15 (Viewport-Verschiebung beim Scrollen/Speichern), 16 (History/Firebase-Bug
  beim Zurück von externen Seiten — auch höhere Priorität, weil App-Fehler).
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

**Nächster Schritt:** Liegt beim Betreiber — welche Punkte überhaupt
angegangen werden sollen, und ob dafür eine neue Phase/ein neuer Strang
aufgemacht wird (analog zur Landing-Page-Strategie). Bis dahin bleibt diese
Datei eine reine Sammlung, kein Auftrag.
