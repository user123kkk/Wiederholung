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

## 1. Karte in der Verwalten-Liste antippen → Detailansicht

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

## 2. Versehentliches Verschieben beim Scrollen (die 6 Knöpfe) — ⏸ nicht lokalisiert (15.09.2026)

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

**Versuch am 15.09.2026, nicht erfolgreich:** Im Code gesucht nach einem
Muster mit sechs Knöpfen links an einer Karte, die etwas verschieben.
Geprüft und verworfen: die Kartenzeile in der Verwalten-Liste (Ziehgriff +
Bearbeiten + Löschen = drei, nicht sechs, und die zwei Buttons sitzen rechts,
nicht links), die Mehrfachauswahl-Leiste (`select-actionbar`, zwei bis drei
Buttons), das Speicherkarten-Tag-System (keine Buttons, nur Text). Keine
Stelle passt eindeutig zu „6 Knöpfe links". Bewusst nicht geraten und am
falschen Code geändert — bei einem Bug mit Datenverlust-Risiko (ungewollte
Kartenverschiebung) ist eine falsche Korrektur schlimmer als keine. Braucht
einen Screenshot oder eine genauere Ortsangabe vom Betreiber, bevor das
angefasst wird.

## 3. Zurück zur Scroll-Position nach dem Bearbeiten

**Beobachtung:** Nach jedem Bearbeiten einer Karte musste wieder ganz nach
unten gescrollt werden, um zur nächsten Karte zu kommen. Wunsch: ein
„Zurück"-Mechanismus, der zur vorherigen Stelle zurückbringt.

**Einschätzung:** Sinnvoller, gut etablierter UX-Musterwunsch (Scroll-
Position beim Zurückkehren aus einer Detail-/Bearbeitungsansicht erhalten).
Hängt technisch mit Punkt 1 zusammen: Wenn Bearbeiten künftig in einem Modal
über der Liste passiert (statt die Liste selbst zu verlassen), löst sich
dieser Punkt von selbst — beide Punkte sollten zusammen entschieden werden,
nicht einzeln.

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

## 6. Formatierung (Absätze) der Notiz wird beim Anzeigen nicht übernommen

**Beobachtung:** Wird die Notiz einer Karte angezeigt (Popup), erscheint sie
anders formatiert, als sie eingegeben wurde — Absätze usw. gehen verloren.

**Einschätzung:** Echter Bug. Klassisches Muster: Eingabe (`<textarea>`)
erhält Zeilenumbrüche, die Anzeige nutzt aber vermutlich kein
`white-space: pre-line`/`pre-wrap` (oder rendert über `textContent` korrekt,
aber eine andere Stelle im Anzeige-Pfad normalisiert Leerraum weg). Klar
eingrenzbar, sobald jemand entscheidet, dass das gebaut wird.

## 7. Arabische Schrift bei der Kategorie leicht fehlerhaft

**Beobachtung:** Die arabische Schrift (z. B. bei der Kategorie-Anzeige eines
Worts) sieht „bisl verbuggt" aus, nicht sauber. Vermutung des Betreibers
selbst: vermutlich nichts zu machen.

**Einschätzung:** Ohne Screenshot/genauen Ort nicht einschätzbar, ob Font-
Rendering-Grenze (z. B. Ligaturen/Kerning in einer bestimmten Schriftgröße,
Browser-eigene Arabisch-Renderer-Eigenheit) oder ein behebbarer
CSS-/Font-Ladefehler. Realistisch: eher niedrige Priorität, wie der Betreiber
selbst vermutet — aber ein Screenshot würde reichen, um das sicher
einzuordnen, statt zu raten.

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

## 9. Ist in der Kartenliste klar, was Übersetzung und was Notiz ist?

**Beobachtung:** Frage, ob in der Liste wirklich klar erkennbar ist, welches
Feld Übersetzung und welches Notiz ist.

**Einschätzung:** Offene Prüffrage, kein bestätigter Bug — bräuchte einen
Blick in die aktuelle Liste (Label, Schriftgröße, Reihenfolge der Felder), um
zu beurteilen, ob eine Verwechslungsgefahr wirklich besteht oder nur in
diesem einen Moment unklar wirkte.

## 10. Formatierung auch in der Liste anzeigen

**Beobachtung:** Es gab wohl mal die Idee/Funktion, dass Formatierung
(Absätze usw.) auch in der Listenansicht sichtbar ist. Hängt mit Punkt 1
zusammen. Unklar, wie wichtig das ist — Einschätzung des Betreibers selbst.

**Einschätzung:** Kein eigenständiger Punkt, sondern eine Ausbaustufe von
Punkt 6 (Formatierung wird überhaupt respektiert) plus Punkt 1
(Detailansicht). Erst relevant, wenn diese beiden geklärt sind.

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

## 13. Über-Scrolling: weiter nach unten als nötig

**Beobachtung:** In allen 3 Tabs (Verwalten, Lernen, Üben) kann man weiter
nach unten scrollen als sinnvoll ist. Beispiel: Bei Lernen, wo es nichts mehr
zu lernen gibt, kann man bis ganz nach unten scrollen, bis alles leer ist.

**Einschätzung:** Echter Bug — vermutlich fehlender `overflow: hidden` oder
ähnliches am Container, der alles über die Viewport-Höhe hinaus erlaubt.
Sollte ein Mindest-`max-height` oder Scroll-Einschränkung geben, so dass die
letzte sichtbare Zeile der Liste nicht ganz oben landet.

## 14. Scroll-Position wird zwischen Bereichen nicht zurückgesetzt

**Beobachtung:** Wenn man in einem Bereich (z. B. Medina im Verwalten) nach
unten scrollt und dann zu einem anderen Bereich wechselt (oder ein neues Tab
öffnet), befindet man sich dort auch noch auf der gleichen Scroll-Position —
statt oben zu sein.

**Einschätzung:** Echter Bug/Nicht-Verhalten. Jeder Bereich sollte seine
Scroll-Position unabhängig speichern und beim Zurückkehren wiederherstellen,
oder (einfacher) beim Tab-Wechsel oder Bereich-Wechsel nach oben springen.
Aktuell sieht es aus, wie wenn ein globales Scroll-Memory existiert, das
nicht neu zurückgesetzt wird.

Hängt zusammen mit **Punkt 3 (Zurück zur Scroll-Position nach dem Bearbeiten)**
— beide sind Scroll-Verwaltungs-Probleme, sollten aber nicht zusammen
entschieden werden, da 3 um eine bewusste Erhaltung nach einem Modal/Dialog
geht, während 14 um ein unerwartetes Verhalten bei einfachem Navigation geht.

## 16. Browser-Zurück von externen Seiten (Datenschutzerklärung, Impressum) zur App wirft Fehler oder zeigt alte Modal — ⏸ neue Spur, nicht gefixt (15.09.2026)

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

---

## Zusammenfassung nach Schweregrad (nur zur Einordnung, keine Entscheidung)

- **Echte Bugs, unabhängig voneinander behebbar:** 2 (versehentliches
  Verschieben — höchste Priorität, weil Datenänderung ohne Absicht), 4
  (ungewollter Autofokus/Tastatur), 5 (iPad-Layout), 6 (Formatierung geht
  verloren), 13 (Over-Scrolling), 14 (Scroll-Position nicht zurückgesetzt),
  15 (Viewport-Verschiebung beim Scrollen/Speichern), 16 (History/Firebase-Bug
  beim Zurück von externen Seiten — auch höhere Priorität, weil App-Fehler).
- **Zusammenhängende UX-Verbesserung, gemeinsam zu entscheiden:** 1, 3, 10, 14.
- **Prüffragen, kein bestätigter Fund:** 7, 9.
- **Vermutlich kein Bug, sondern Design-Entscheidung:** 8.
- **Bewusst zurückgestellt:** 11, 12.

**Nächster Schritt:** Liegt beim Betreiber — welche Punkte überhaupt
angegangen werden sollen, und ob dafür eine neue Phase/ein neuer Strang
aufgemacht wird (analog zur Landing-Page-Strategie). Bis dahin bleibt diese
Datei eine reine Sammlung, kein Auftrag.
