# Ablauf: gestalten in Claude Design, zurück ins Repo

Dieser Ordner ist **Strategie vor Code**. Gebaut wird erst, wenn der Design-Handoff
zurück ist und Claude Code ihn selektiv übernommen hat.

## Schritt für Schritt

1. **Claude Design öffnen.** Auf [claude.ai](https://claude.ai) ein Design/Artifact
   starten (oder das bestehende Design-Projekt fortsetzen, in dem schon der
   Ladebildschirm entstand).
2. **Repo-Dateien bereitstellen.** Claude Design die echten aktuellen Dateien geben:
   `styles.css`, `app.js`, `index.html`, `landing.html`. Es soll darauf aufbauen,
   nicht bei null anfangen. (Nur so werden die Änderungen echte Drop-in-Blöcke.)
3. **Prompt einfügen.** Den Text aus [`CLAUDE-DESIGN-PROMPT.md`](CLAUDE-DESIGN-PROMPT.md)
   einfügen (alles zwischen den beiden Linien).
4. **Gestalten und prüfen.** Varianten durchspielen. Bei jeder Variante die drei
   Regeln prüfen: eine gefüllte Handlung? Ordnung durch Abstand statt Kästen? Richtige
   Schriften? Fühlt es sich nach **Adrabic** an oder nach Vorlage? Was nach Vorlage
   riecht: verwerfen.
5. **Handoff herunterladen.** Am Ende „Download Handoff" — das ergibt ein ZIP mit den
   geänderten Dateien + einer README (was geändert wurde und warum) + neuen Bildern.
6. **ZIP an Claude Code zurückgeben.** Im nächsten Chat einfach das ZIP anhängen und
   sagen „das ist der Redesign-Handoff".

## Was Claude Code dann tut (nicht du)

- Den Handoff gegen die aktuellen Repo-Dateien **diffen** und **selektiv** übernehmen:
  nur die benannten Design-Blöcke, keine ungefragten Zusatz-Features, keine stumm
  entfernten Funktionen. (Lehre aus dem ersten Handoff — siehe `LOGBUCH.md`.)
- „Alles Alte, das damit zusammenhängt" sauber ersetzen: alte Regeln/Markup, die der
  Redesign ablöst, werden entfernt, nicht danebengelegt.
- Veröffentlichungsliste abarbeiten (`README.md`): `APP_VERSION` + `CACHE_NAME` hoch,
  neue Startdateien in `APP_SHELL`, `CHANGELOG.md`.
- Jede Übernahme-Entscheidung ins `LOGBUCH.md`, danach committen und auf den
  Arbeitsbranch pushen.

## Keine-AI-Slop-Garantie

Wie bei `../landing-page-strategie`: Die drei Gestaltungsregeln im Prompt sind **nicht
optional**. Sie sind der Grund, dass am Ende Adrabic herauskommt und nicht irgendeine
dunkle App mit runden Ecken. Wenn eine Design-Variante hübsch ist, aber gegen eine der
Regeln verstößt, ist sie falsch.
