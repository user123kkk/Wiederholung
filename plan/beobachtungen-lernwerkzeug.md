# Beobachtungen am Lernwerkzeug — noch nicht entschieden, nicht gebaut

Angelegt: 15. September 2026, aus einer Nutzungssitzung des Betreibers.
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

## 2. Versehentliches Verschieben beim Scrollen (die 6 Knöpfe)

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

## 4. Tastatur öffnet sich ungewollt nach dem Speichern

**Beobachtung:** Nach dem Bearbeiten einer Karte und „Fertig"/Speichern
öffnet sich sofort die Tastatur für das Feld „Karte anlegen" — auch wenn man
gar keine neue Karte anlegen wollte.

**Einschätzung:** Echter Bug. Klingt nach einem Autofokus auf das
„Neue Karte"-Eingabefeld nach dem Schließen des Bearbeiten-Dialogs, der nicht
beabsichtigt sein dürfte — der Nutzer soll selbst entscheiden, wann er dieses
Feld antippt. Vermutlich eine einzelne `.focus()`-Zeile im entsprechenden
Bearbeiten-Abschluss-Pfad.

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

## Zusammenfassung nach Schweregrad (nur zur Einordnung, keine Entscheidung)

- **Echte Bugs, unabhängig voneinander behebbar:** 2 (versehentliches
  Verschieben — höchste Priorität, weil Datenänderung ohne Absicht), 4
  (ungewollter Autofokus/Tastatur), 5 (iPad-Layout), 6 (Formatierung geht
  verloren).
- **Zusammenhängende UX-Verbesserung, gemeinsam zu entscheiden:** 1, 3, 10.
- **Prüffragen, kein bestätigter Fund:** 7, 9.
- **Vermutlich kein Bug, sondern Design-Entscheidung:** 8.
- **Bewusst zurückgestellt:** 11, 12.

**Nächster Schritt:** Liegt beim Betreiber — welche Punkte überhaupt
angegangen werden sollen, und ob dafür eine neue Phase/ein neuer Strang
aufgemacht wird (analog zur Landing-Page-Strategie). Bis dahin bleibt diese
Datei eine reine Sammlung, kein Auftrag.
