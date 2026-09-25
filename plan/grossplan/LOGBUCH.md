# Logbuch: Großplan

Letzter Eintrag zuerst. Auftrag: [`AUFTRAG.md`](AUFTRAG.md).

| | |
|---|---|
| Routine | `trig_01L6Ves47R3gsG5kvqQVmyQA` „Adrabic Großplan – Nachtschicht", 23:07 · 2:07 · 5:07 (Berlin), weckt `session_01WzaCEZCxEqmfKVPh1ipGvX` |
| Stand der Kriterien | A1 ☐ · A2 ☑ · A3 ☑ · A4 ☐ · A5 ☐ · A6 ☐ |
| Nächste Runde | 2 |

---

### 2026-09-25 — Runde 0 und 1: Großprüfung, Plan, erste 21 Aufgaben (v3.17.30)

**Anlass:** Betreiber: Fehler, Verbesserungen, Unvollständiges, Fehlendes,
Firebase, E-Mail-Vorlagen, Passwort zurücksetzen, Spam, Onboarding,
Animationen, Features, Premium, Regeln, Logik – „wirklich alles". Dazu ein
Plan, Arbeit an günstigere Modelle, eine Schleife bis zu harten Kriterien und
ein Zeitplan für die Nacht.

**Runde 0 – Prüfung (8 Prüf-Agenten, Opus, nur lesend):** Konto/E-Mail,
Regeln/Daten (mit echtem Firestore-Emulator), Lernrunde/Serie, Verwalten/
Daten/Teilen (mit XSS-Nutzlasten), Einstieg/Bewegung, PWA/Hosting/SEO/
Barrierefreiheit, Einstellungen/Fortschritt/Üben/Board, Produkt/Premium
(Recherche). Ergebnis: **133 Funde** in `befunde/` – 1 kritisch, 9 hoch,
rund 50 mittel, der Rest niedrig; dazu 20 Funktions-/Premium-Vorschläge.
Doppelt gefunden (unabhängig): der kritische `not-found`-Fehler (DATEN-1 =
REGELN-1), der tote Teilen-Code (REGELN-7 = LERNEN-7 = DATEN-7), die
Offline-Kopie in der Datenschutzerklärung (KONTO-7 = REGELN-6 = TECHNIK-10).
Widerlegt: die Vermutung „Tageswechsel in UTC statt lokal" (9/9 Fälle mit
Europe/Berlin und gestellter Uhr richtig).

**Plan:** `AUFTRAG.md` (Rollen, Ablauf, Kriterien K1–K6 je Aufgabe, A1–A6
für das Ende), `AUFGABEN.md` (G-001 … G-086, Pakete P1–P14),
`ENTSCHEIDUNGEN.md` (E-01 … E-18, je Pro/Contra/Urteil), `KONSOLE.md`
(K1–K14, mit fertigen deutschen Mail-Vorlagen), `FUNKTIONEN.md`
(drei Körbe), `UEBERGABE.md` (Vorlage für Sonnet/Haiku).

**Runde 1 – gebaut (v3.17.30):**

| Aufgabe | Wer | Abnahme durch Opus |
|---|---|---|
| G-001 Prüfskript `pruefe_stand.mjs` | Sonnet | fand sofort einen echten Fehler (G-002); Gegenprobe mit falscher Version rot |
| G-002 Rechtsseiten-Thema (CSP) | Haiku | `t_csp.js` unter echter CSP: hell, keine Meldung |
| G-003 `not-found` → Vollschreiben (kritisch) | Opus | `t_notfound.js` neu: Felder bleiben, Löschung gewinnt; `daten_x_notfound.js` ebenso |
| G-006 verwaiste geteilte Sätze | Opus | Regel `list` nur nach Besitzer (Emulator E19 erlaubt, P5/P6 abgelehnt), `t_loeschen_teilen.js` +1 Fall |
| G-014 Stimmen-Bindung (Regel) | Opus | Emulator: P2/P3/E11/E14 abgelehnt, P1/P4 erlaubt |
| G-017/018/019 Teilen: erst Cloud, dann lokal; Größe; fremde Bilder | Sonnet | `t_teilen.js` neu 16/16, `t_loeschen_teilen`, `t_daten` grün |
| G-043 Verzögerungen bei „ruhig" | Sonnet | eigene Messung: Lernen 11 → 0, Fortschritt 7 → 0 wartende Verzögerungen |
| G-055 Regeltest 132 → 153 Fälle + `regeln_testen.sh` | Sonnet | selbst gelaufen: 153/153; gegen alte Regel genau 5 erwartete Abweichungen |
| G-008/034/071/072/073 Deploy-Prüfung, ZIP, Workflow, tote Hashes, Querverweis | Haiku | Diff gelesen, `pruefe_stand` grün |
| G-010/012/013 (Texte)/038/052/056/078/084 Texte, Sprache, Stufen-Deckel | Haiku | Diff gelesen; **zwei Anführungszeichen falsch (” statt “), ein „?" fehlte – von Opus korrigiert**, Regel in `UEBERGABE.md` ergänzt |

**Eigener Fund bei der Abnahme:** Die neue Sperre „lokale Änderungen" in
`veroeffentlichen.bat` hätte ab dem zweiten Deploy jeden Deploy blockiert,
weil die Firebase-CLI `.firebase/` anlegt. `.gitignore` ergänzt, LEHREN § 15.

**Geändert:** `app.js` (patchDoc/persistAll ~2180–2300, kontoDatenLoeschen
~2810, teileLektionCode/beendeTeilenCode/lehrerFreigeben ~3610–3745,
bereichEntfernen ~4302, verarbeiteImportDaten ~4127, normCard 222,
AUTH_ERRORS ~2566, Sprache 1873, Texte 2754/6918/6983), `styles.css` (577,
4245), `firestore.rules` (geteilteLektionen `list`, feedback `votes`,
`votes/{uid}` create), `firebase.json`, `index.html`, `impressum.html`,
`datenschutzerklaerung.html`, `sw.js`, `veroeffentlichen.bat`,
`.github/workflows/veroeffentlichen.yml`, `.gitignore`, `CHANGELOG.md`,
`plan/LEHREN.md` (§ 8.1a, § 8.1b, § 14 Punkt 11, § 15), Prüfstand
(`t_notfound.js`, `t_teilen.js`, `t_csp.js`, `t_loeschen_teilen.js`),
`plan/phase-1-datenzugriff/regeln-pruefung.mjs`, `plan/werkzeuge/`
(`pruefe_stand.mjs`, `regeln_testen.sh`).

**Entscheidung:** G-007 (Serie bleibt bei 121 Tagen) als **Fehler** eingestuft,
nicht als Lernlogik-Frage: Die Regel der Serie bleibt, nur ein Speicherfehler
wird behoben. Kommt in Runde 2 mit Testfällen vorab. Die Routine weckt diese
Session statt frischer Sessions (Grund: `AUFTRAG.md` § 5).

**Prüfstand vor dem Commit (Chromium, Firebase-Attrappe):** `pruefe_stand.mjs`
grün · `abnahme_runde.js` 13/13 („lesen"-Ausgaben gelesen: Einzahl/Mehrzahl,
Limit mit Weiterlernen, Kontrast 0, Zeichnen ohne verpasstes Bild) ·
`t_sprung`, `t_kontrast` (0 Funde), `t_a11y`, `t_notfound`, `t_teilen`,
`t_loeschen_teilen`, `t_daten`, `t_anmelden`, `t_einstieg`, `t_start`,
`t_csp`, `t_konto`, `t_bestaetigung`, `t_einstellungen`, `t_gross_alle` grün ·
Affe Handy 150 und iPad 120 Schritte: 0 Befunde · Regeln im Emulator 153/153.
**Nicht geprüft** (§ 5.6): echtes iOS, echtes Firebase (Regeln live,
Mail-Zustellung, deutsche Mail nach G-010) – das sind Betreiber-Schritte.

**Kriterien:** A1 ☐ (21 von 73 A-Aufgaben erledigt, G-013 teilweise) · A2 ☑ (alle Fragen mit
Pro/Contra in ENTSCHEIDUNGEN.md) · A3 ☑ (KONSOLE.md vollständig) · A4 ☐ ·
A5 ☐ · A6 ☐

**Offen (beim Betreiber):**
- Veröffentlichen (K11) **und** Regeln veröffentlichen (K10) – die neuen
  Regeln sind nötig, damit G-006 und G-014 wirken; Reihenfolge egal.
- K1, K2, K4, K5 (je Minuten), K3 (Support-Anfrage), K6, K7, K12.
- Entscheidungen E-01 … E-18.
- Gerätetest E-18 (Google aus der Home-Bildschirm-App).

**Nächster Schritt:** Runde 2 – Paket P5 (G-007 Serie 121, G-035, G-036,
Opus/Sonnet) und P4 (G-004, G-005, G-020, G-021, G-077, G-081).
