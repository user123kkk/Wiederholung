# Welche Agenten-Hilfen Adrabic wirklich braucht

## Ergänzung 10.10.2026: LLM Council ausdrücklich beauftragt

Jetzt vier Projekt-Skills: die drei Fachskills plus `llm-council`.
Quelle vom Betreiber: [tenfoldmarc/llm-council-skill](https://github.com/tenfoldmarc/llm-council-skill),
festgehaltener Commit `0dc03275b0ddf542545da3a9684510fff31df353`.
Mit offiziellem Skill-Installer nach `.agents/skills/llm-council` geladen;
lokal für Codex und Claude angepasst. Original bleibt unter
`references/upstream-SKILL.md`, README mit MIT-Angabe erhalten. Kein externes
Plugin, keine API-Schlüssel oder fremden Modellkonten eingerichtet.

Wichtige strittige Entscheidungen: fünf getrennte Berater, danach fünf
anonymisierte Gegenprüfungen und Synthese. Nicht für Routinefixes, Status,
Fakten oder bloßes Installieren. Begrenzte Agentenslots erlauben gestaffelte
Durchgänge mit getrennten Briefings; fünf verschiedene Modelle werden nicht
behauptet. Zehn Agentenantworten kosten zusätzliche Zeit und Tokens.
Einigkeit beweist nichts; Quellen, Gegenargumente und fehlende Belege zählen.
Kein Qualitätsgewinn gemessen und noch kein Council im Rahmen der Installation
durchgeführt. Laufzeitversprechen der Vorlage wird nicht übernommen.

Ergebnis zuerst kurz auf Deutsch: konkretes Benutzungsbeispiel, dafür,
dagegen, belegt/unklar, Empfehlung, nächster Schritt. Verständniskorrektur
`plan/ENTSCHEIDUNGEN-VERSTEHEN.md` und Fachskills gelten weiter; ein Council
erteilt keine Funktionsfreigabe. Volltext und aufklappbarer HTML-Bericht erst
bei echter Sitzung unter plan/council. Implizite passende Auswahl erlaubt,
aktuell auch direktes Lesen; Skill-Entdeckung kann ab dem nächsten Turn erfolgen.

Pflegewerkzeug verwaltet jetzt alle vier SKILL.md-Spiegel und zusätzlich
die Council-Quellennachweise. Frühere Drei-Skill-Angaben unten sind Verlauf.

Stand: 09.10.2026. Auftrag des Betreibers: aus dem Repo auswählen, was Claude
und Codex tatsächlich hilft, automatisch passend einsetzen und unnötige
Tokenkosten vermeiden. Ergebnis: **drei kleine Projekt-Skills sind eingerichtet;
kein zusätzliches externes Plugin ist für die tägliche Arbeit erforderlich.**
Das ist ein begründetes Projekturteil, keine gemessene Qualitätsrangliste.

## 1. Grundlage und Grenzen der Repo-Prüfung

Die vollständige Git-Dateiliste wurde eingelesen: **2.171 Dateien, 23.106.839
Bytes**, davon 2.108 UTF-8-Textdateien und 1.492 verschiedene Textinhalte nach
SHA-256. Kein Lesefehler. Darunter 1.365 Sicherungsdateien, 271 Werkzeuge,
432 Plan-Dateien, 40 Archiv-Dateien und 63 übrige Dateien. Der Zeitpunkt liegt
vor dem Hinzufügen dieser Skills; die Minuten-Sicherung verändert den Bestand.

Das bedeutet: vollständiges mechanisches Inventar mit Inhaltssuche und Hashes,
**kein behauptetes semantisches Zeilen-für-Zeilen-Audit aller Logs, Bilder und
historischen Kopien**. Inhaltlich geprüft wurden Arbeitsregeln, aktuelle offene
Aufgaben, Mehrwert-Entscheidungen, Empfehlungen-Prüfung, App-/Daten-/Importwege,
Firestore-Regeln, Service Worker, Hosting, UI-/Gerätenachweise und der Prüfstand.
Generierte Abhängigkeiten und `.git` sind nicht Teil der Git-Dateiliste.

Vollständiges Inventar und Kurzfassung liegen außerhalb des öffentlichen Repos:
`C:\Users\USER\Desktop\Wiederholung-Belege\skills-2026-10-09\repo-inventar.json`
und `inventar-kurz.json`. Die Kurzfassung liegt zusätzlich neben diesem Bericht.

Der entscheidende Befund: statische HTML/CSS/Vanilla-JS-PWA, Firebase-JS 10.14.1,
Firestore und Auth, arabische Schrift/RTL, Offline-/Mehrgeräte-Fälle und iPhone.
Keine React-/Next-/Tailwind-Anwendung. Bereits vorhanden: 157 Browser-Testskripte
im aktuellen Gesamtlauf, echte SDK-/Regelprüfungen, Simulation mit Negativfällen,
Veröffentlichungsprüfer, Sicherung und detaillierte Arbeitsregeln. Die offenen
Fehler A14–A16 zeigen, warum die **richtige Prüfebene** wichtiger ist als noch
eine allgemeine Anleitung zum Programmieren.

## 2. Was die Begriffe bedeuten und wie viel sie kosten

- **AGENTS.md / CLAUDE.md:** verbindliche Projektregeln und Orientierung.
- **Skill:** bei Bedarf geladene Arbeitsanleitung; bringt kein neues Modell mit.
- **MCP / Connector:** zusätzliche Werkzeuge oder Zugriff auf einen Dienst.
- **Plugin:** Paket aus solchen Fähigkeiten, gegebenenfalls mit Skills/Hooks.
- **Prüfwerkzeug:** führt kontrollierbare Messungen aus; z. B. unser Emulator
  oder axe-core. Das kann wertvoller sein als ein weiterer Text-Skill.

Aktuelle starke Modelle brauchen weniger allgemeine Verfahrensanweisungen.
Spezifische Projektkenntnisse können weiter helfen; breite Trigger und
überladene Anleitungen können unnötige Arbeit auslösen. Das entspricht auch
OpenAIs aktueller Empfehlung. Es beweist keine bestimmte Einsparung in diesem
Repo. [OpenAI: Skills und Prompts für GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra).

Skills sind nicht kostenlos: Namen/Beschreibungen benötigen Auswahlkontext,
der vollständige Inhalt und Werkzeugausgaben zusätzlich Kontext bei Nutzung.
Beide Anbieter beschreiben dieses bedarfsweise Laden. Unsere drei Beschreibungen
zusammen: **635 Zeichen**, vollständige Inhalte zusammen: **5.812 UTF-8-Bytes**.
Das sind keine Tokenmessungen. Hinzu kommen kurze Auswahlregeln in den beiden
Projektdateien. Kein neuer dauerhafter Server, kein neuer Session-Hook und kein
automatischer Gesamttest. [Codex Skills](https://learn.chatgpt.com/docs/build-skills),
[Claude Code Skills](https://code.claude.com/docs/en/skills).

## 3. Eingerichtet: nur diese drei Projekt-Skills

| Skill | Konkreter Nutzen / Repo-Beleg | Alternative und Geltungsgrenze |
|---|---|---|
| `adrabic-daten` | Wählt echte SDK-/Emulator-/Regelprüfungen für Firestore, Auth, Offline, Undo, Import/Export und Kontolöschen. Vermeidet die bekannte Verwechslung von Firebase-Attrappe und Serverbeleg; LEHREN §§ 8/13, A14–A16. | Ein fähiges Modell kann die vorhandenen Dateien selbst finden. Der Skill verkürzt die Suche; er beweist weder fehlerfreie Daten noch echte Auth-/Produktivfunktion. |
| `adrabic-oberflaeche` | Verweist auf vorhandene UI-Muster und passende RTL-, Kontrast-, Tastatur- und Boot-Prüfungen. Trennt Klein-Weg von Lern-/Datenänderung und Browser von installierter iPhone-PWA; LEHREN §§ 6/11/13. | Allgemeine Design-/Browser-Skills können helfen, kennen aber die lokalen Grenzen nicht. Echtes Gerät bleibt erforderlich, wenn die Behauptung davon abhängt. |
| `adrabic-lernbelege` | Unterscheidet Runde, Tagesziel mit Weiterlernen und harten Deckel. Nutzt vorhandene Eingangs-Gegenproben und Aussage–Beleg-Zuordnung; EMPFEHLUNGEN-PRUEFEN und Tagesdeckel-Audit. | Kein zusätzlicher Rechenserver nötig. Der Skill kann fehlende Lernwirkungsdaten erkennen, sie aber nicht erzeugen oder sprachliche Urteile zuverlässig erzwingen. |

Die Inhalte ergänzen die Projektregeln um konkrete Werkzeugwahl. Sie ersetzen
weder Pflichtlektüre noch Betreiberentscheidungen. Keine generische
Brainstorming-, TDD-, Commit- oder Delegationspflicht wurde hinzugefügt.

## 4. Geprüfte bekannte Angebote: Auswahl statt Sammelinstallation

| Angebot | Urteil für dieses Repo | Nutzen, Gegenargument und Grenze / Primärquelle |
|---|---|---|
| **Context7** | Sinnvoll bei schwierigen Versions-/API-Fragen; optional. | Liefert Bibliotheksdokumentation und Beispiele. Zuerst Version 10.14.1 im Code beachten und offizielle Quellen nutzen; nicht blind auf neueste Beispiele umstellen. Zusätzlicher Dienst, bislang kein gemessener Vorteil gegenüber gezielter Websuche. Keine Kontodaten/Schlüssel in Dokumentationsanfragen. [Upstash](https://github.com/upstash/context7/blob/master/packages/mcp/README.md). |
| **Offizieller Firebase Rules Auditor** | Gute ergänzende Checkliste bei ausdrücklicher Regelprüfung; kein komplettes Firebase-Paket nötig. | Prüft u. a. create/update-Bypass, Autoritätsquelle, Eigentümerschaft, Typen und Grenzen. Gegen tatsächliche Adrabic-Regeln und Altbestand auslegen; sein Score ersetzt keine Emulator-Gegenprobe. Der aktuelle Skillname ist `firebase-security-rules-auditor`; die Übersichtsseite nutzt noch einen anderen Namen. Nicht installiert. [Google-Skill](https://github.com/firebase/agent-skills/blob/main/skills/firebase-security-rules-auditor/SKILL.md), [Firebase-Übersicht](https://firebase.google.com/docs/ai-assistance/agent-skills). |
| **axe-core** | Der klarste zusätzliche lokale Prüfnutzen für eine kommende Barrierefreiheitsprüfung. | Im Repo nicht gefunden; ergänzt eigene Kontrast-/Bewegungstests um weitere automatisierbare Accessibility-Regeln. Bei einer solchen Aufgabe lokal im bestehenden Playwright-Prüfstand einsetzen, nicht in die ausgelieferte App. Keine WCAG-Garantie, Screenreader/Bedienung bleiben manuell. Hier noch nicht eingebaut oder ausgeführt. [Deque](https://github.com/dequelabs/axe-core). |
| **Codex Security, lokal** | Gezielter zusätzlicher Sicherheits-Audit kann sich lohnen; kein Dauerlauf pro Änderung. | Separater Scanner mit Befunden und Validierung. Zugang und Kosten hängen vom Konto/Scan ab, hier nicht getestet; kein Ersatz für Firestore-/Mehrgeräte-Prüfung. Bei Nutzung einen begrenzten Scan auf App, Rules und Hosting prüfen. Das lokale Plugin ist vom Cloud-Plugin zu unterscheiden. [OpenAI Quickstart](https://learn.chatgpt.com/docs/security/plugin). |
| **Firebase MCP** | Erst bei benötigter Konsole-/Projektinspektion. | Zusätzliche Dienstwerkzeuge; unsere CLI und Demo-Emulatoren reichen für lokale Fehler. `--dir` und passende Featuregruppen verwenden, falls später nötig. `--only` lässt Core-Werkzeuge weiterhin zu und ist keine Read-only-Sperre. Kein Deploy allein aus einer Installation ableiten. [Firebase](https://firebase.google.com/docs/ai-assistance/mcp-server). |
| **Firebase Firestore/Auth/Hosting Skills** | Einzelne offizielle Referenzen bei passender Aufgabe; gesamtes Paket aktuell überflüssig. | Fachwissen nützlich bei unbekannter Funktion. Basics/Initialisierung überschneiden sich mit fertigem Projekt. App Hosting, Data Connect, native Crashlytics und AI Logic passen nicht zur vorhandenen Architektur bzw. zu bisherigen Entscheidungen. [Firebase Skills](https://firebase.google.com/docs/ai-assistance/agent-skills). |
| **Microsoft Playwright CLI / MCP** | Vorhandener Node-Prüfstand zuerst. CLI bei fehlender Explorationsfähigkeit; MCP nur bei echtem Bedarf. | Microsoft unterscheidet knappe CLI-Arbeit und MCP mit dauerhaftem Browserkontext. Codex hat hier zusätzlich Computer-Use. Kein Grund, alle 157 Tests umzuschreiben oder pauschal noch Browser-Werkzeuge zu laden. Hersteller-Effizienzbehauptung ist kein Repo-Benchmark. [CLI](https://github.com/microsoft/playwright-cli), [MCP](https://github.com/microsoft/playwright-mcp). |
| **Serena** | Interessanter späterer Vergleich für Symbolnavigation; derzeit kein Standard. | Symbolsuche/-Referenzen und Refactoring sind eine echte zusätzliche Fähigkeit, auch für JavaScript. Bei unserem großen `app.js` denkbar. LSP-Einrichtung und zusätzliche Tools kosten Aufwand; Symbolwerkzeuge prüfen keine dynamische Render-/Offline-Wirkung. Erst an einigen realen Aufgaben gegen `rg` vergleichen. Nicht bloß aus Testimonials installieren. [Serena](https://github.com/oraios/serena). |
| **Superpowers als Gesamtpaket** | Hier nicht standardmäßig installieren. | Enthält einen vollständigen Workflow mit Designabnahme, Worktrees und Subagenten. Das überschneidet sich mit unseren Arbeitsregeln und erzeugt potenziell zusätzliche Unterbrechungen/Schritte. Einzelne Debugging-Ideen bleiben sinnvoll; unser Repo hat bereits Gegenprüfung und Regressionspflicht. [Hersteller](https://github.com/obra/superpowers). |
| **Anthropic frontend-design** | Nur bei einer ausdrücklich neuen Gestaltungsaufgabe mit passendem Brief. | Hilft bei visueller Richtung; die aktuelle App hat bereits ein gewolltes Gestaltungssystem. Kein pauschaler Trigger für Abstand/Wortlaut, keine neue Designrunde bei jedem Fix. [Anthropic](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md). |
| **Anthropic webapp-testing** | Aktuell kein zusätzlicher Standardskill. | Allgemeine Playwright-Hilfe, aber vorhandener Node-Prüfstand und Anleitungen sind spezifischer. Kein zweites Python-Testgerüst aufbauen. [Anthropic](https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md). |
| **Sequential Thinking MCP** | Kein Standard hier. | Strukturierte Denk-Schritte sind keine fehlende externe Fähigkeit. Ohne vergleichenden Nachweis zusätzlicher Nutzen unklar; weitere Werkzeugaufrufe allein beweisen keine bessere Prüfung. [Referenzimplementierung](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking). |
| **GitHub / Docs / Figma / ImageGen / PDFs usw.** | Nur für die konkrete Dienst-/Dateiaufgabe. | GitHub ist in Codex bereits installiert. Zusätzliche Dienste helfen bei Issues, externem Design oder ausdrücklich gewünschter Datei; die momentane App-Arbeit benötigt sie nicht. Vorhandene persönliche Skills bleiben erhalten; sie werden nicht pauschal beim Programmieren geladen. |
| **React/Next/Tailwind/Vercel-Pakete** | Für die bestehende Anwendung nicht passend. | Die Architektur ist statische PWA mit Firebase Hosting. Eine andere Framework-Anleitung ist kein Mehrwert, solange kein solcher Umbau beauftragt ist. |

Bei Plugin-Suche wurde GitHub als installiert bestätigt, Context7 und Codex
Security als nicht installiert. Claude aktiviert derzeit `caveman` und `watch`.
Die Suche ist keine vollständige Marktinventur. Keine persönlichen/globalen
Plugins entfernt, keine fremden Konten verbunden, keine Scan-Kosten ausgelöst.

## 5. Automatische passende Verwendung durch beide Agenten

Die gemeinsame Quelle ist `.agents/skills/<name>/SKILL.md` für Codex.
Claude erhält identische Dateien unter `.claude/skills/<name>/SKILL.md`.
Die Codex-Metadaten erlauben implizite Auswahl; Claude hat keine Sperre der
Modell-Initiierung. Beide Projektdateien enthalten dieselbe knappe Zuordnung
und eine direkte Datei-Lesealternative, falls die Skill-Funktion fehlt.
Diese Orte und Auswahlmechanismen sind dokumentiert:
[Codex](https://learn.chatgpt.com/docs/build-skills),
[Claude Code](https://code.claude.com/docs/en/skills).

Ein neuer **lokaler Chat im selben Repo** kann damit passend auswählen,
ohne dass der Betreiber jedes Mal Skillnamen nennen muss. Ein bereits laufender
Chat kann seine Skill-Liste erst nach einer Aktualisierung erneut entdecken;
für Cloud/anderen Rechner müssen die Dateien dort vorhanden sein.
Automatische Auswahl bleibt eine Modellentscheidung, keine deterministische
Garantie. Unpassende Aufträge sollen keinen dieser drei Skills laden.

Pflege nach einer Skill-Änderung, vom Repo aus:

```text
node plan/werkzeuge/projekt_skills.mjs --schreiben
node plan/werkzeuge/projekt_skills.mjs --pruefen
```

Nur die drei verwalteten Claude-Spiegel werden geschrieben. Keine Symlinks,
keine Adminrechte und keine zusätzliche Laufzeit-Abhängigkeit des Prüfers.
Die Skilldateien sind über Firebase `**/.*` ausgeschlossen; `plan/` ist
ebenfalls Hosting-ausgeschlossen. Der uncommittete App-Entwurf bleibt erhalten.

## 6. Was geprüft ist und was erst die Nutzung zeigen kann

- Offizieller Skill-Creator-YAML-Prüfer: alle sechs SKILL.md-Dateien gültig.
- Projektprüfer: Namen, Verweise, Beschreibungsgrenzen, Codex-Auswahlmetadaten
  und identische Claude-Spiegel geprüft. Er fing einen falschen Gerätepfad
  tatsächlich ab; dieser wurde korrigiert. Keine kosmetische Grünmeldung.
- Die Auswahlregeln wurden gegen folgende Fälle fachlich abgeglichen:

| Auftrag | Erwartete Auswahl |
|---|---|
| Altes Undo überschreibt Bewertung auf Gerät B | Daten |
| Tageszähler-Ablehnung geht nach Neustart verloren | Daten, keine neue Lernmengen-Empfehlung |
| Arabischer Dialog wird auf iPhone abgeschnitten | Oberfläche |
| Tagesziel mit Weiterlernen empfehlen | Lernbelege |
| Neue Lernregel mit zusätzlichem Cloud-Feld | Lernbelege + Daten; Oberfläche nur bei UI-Beteiligung |
| Nur Stand erklären / Plantext pflegen / vorhandenes Log lesen | Kein Projektskill, sofern keine fachliche Prüfung beauftragt |

Das ist eine Auswahl-Spezifikation, **kein gemessener Modell-Eval**. Ein späterer
Vergleich an echten Aufgaben muss Aufrufquote, Fehltrigger, vollständige Abnahme
und gesamten Tokenverbrauch betrachten. Nur beibehalten, was dabei hilft.
Aktuell gibt es keinen belastbaren Prozentwert für Tokenersparnis oder weniger
Fehler. Ein Skill kann fehlende Geräte-/Lernnachweise nicht ersetzen.

Weitere allgemeine Skills würde ich erst nach einer erkennbaren wiederkehrenden
Lücke ergänzen. Die große bestehende Pflichtlektüre ist ein größerer Kontextblock
als diese drei Beschreibungen; ihre Verkürzung wäre eine eigene sorgfältige
Dokumentationsarbeit und darf geltende Regeln nicht versehentlich verlieren.

**Nächste App-Aufgabe bleibt A16/DATEN-11**, anschließend die bereits entschiedene
Mehrwert-Reihenfolge. Große Gesamtabnahme und Veröffentlichung bleiben wie vom
Betreiber gewünscht später gesammelt.
