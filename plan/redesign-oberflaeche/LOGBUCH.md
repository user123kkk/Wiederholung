# Logbuch: Oberfläche & Mobile-Gestalt

Letzter Eintrag zuerst.

---

### 2026-09-16 — Strang angelegt, Video-Ratschläge gefiltert, Design-Prompt fertig

**Geändert:**
- Neu: `plan/redesign-oberflaeche/` mit `AUFTRAG.md`, `PRINZIPIEN.md`,
  `CLAUDE-DESIGN-PROMPT.md`, `ANLEITUNG.md`, `LOGBUCH.md`.
- `plan/PLAN.md`: Strang C (dieser) + Strang D (`monetarisierung`) in Übersicht und
  „Wo eine neue Session anfängt" aufgenommen; offene Frage zur §7-Lockerung ergänzt.

**Entscheidung:**
- Betreiber liefert drei Videos (Mobile-UI, Geld verdienen, UX-Psychologie) und will
  einen strukturierten Redesign wie beim Ladebildschirm — plus ein **Gerüst** für die
  Punkte, die er jetzt nicht baut (Geld). Umfang per Rückfrage geklärt: Aussehen der
  App **und** Startseite, Bedienung/Navigation darf angefasst werden — **aber** nur im
  Rahmen der bestehenden ruhigen Gestalt, kein KI-Slop. Das lockert `KONZEPT.md` §7
  („App-Funktionen nicht anfassen") bewusst; als Betreiber-Entscheidung dokumentiert.
- Video-Ratschläge nicht sammeln, sondern **filtern** (`PRINZIPIEN.md`): übernommen
  werden ruhige mobile Gestalt, leere Zustände, Smart Defaults, sanftes Onboarding,
  Landing-Reziprozität. Verworfen: Stack-Wechsel (Supabase/Next.js — Rewrite ohne
  Anlass, `KONZEPT.md` §7), Dark-Patterns (Verlustaversion — markenfremd), erfundene
  Features, neue Gesten ohne Gewinn. Bezahlung/Wachstum → Gerüst in `monetarisierung/`.
- Wichtige Korrektur beim Token-Stand: **Gold ist als Aktionsfarbe raus** (seit
  Design-Stand 3.1.0), Akzent ist **Creme `#f5f3ec` auf Fast-Schwarz**. Der Prompt
  führt die echten aktuellen Token, damit Claude Design nicht goldlastig gegen den
  eigenen Code gestaltet.

**Offen:**
- `KONZEPT.md` §7 steht formal noch auf „App-Funktionen nicht anfassen". Es wird
  **nicht** eigenmächtig umgeschrieben — die Lockerung gilt nur für diesen Strang und
  steht als offene Frage in `plan/PLAN.md`. Falls der Betreiber sie dauerhaft will,
  muss er §7 selbst anpassen.
- Lehre aus dem ersten Handoff (Ladebildschirm, v3.0.44/45): ein Komplett-`app.js`
  hätte ungefragt Sprachumschalter + Benachrichtigungen eingebaut und den
  9-Sekunden-Lade-Hinweis stumm entfernt. Übernahme deshalb künftig **nur selektiv**,
  Block für Block, mit Diff. Steht als feste Regel in `ANLEITUNG.md` und im Prompt.

**Nächster Schritt:**
Betreiber gestaltet mit `CLAUDE-DESIGN-PROMPT.md` in Claude Design und gibt den
Handoff (ZIP) zurück. Dann: diffen, selektiv übernehmen, Altes ablösen,
Veröffentlichungsliste, committen, pushen.
