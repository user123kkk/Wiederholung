// F5: Originale vollständig archivieren, relative Markdown-Verweise erhalten.
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const archive=path.join(root,'plan/archiv');
fs.mkdirSync(archive,{recursive:true});
function preserve(file,name) {
 const src=path.join(root,file),dst=path.join(archive,name);
 if(fs.existsSync(dst)) throw new Error('Archiv existiert bereits: '+dst);
 const raw=fs.readFileSync(src,'utf8');
 const rebased=raw.replace(/(\]\()([^\s)]+)(\))/g,(all,a,p,b)=>{
   if(/^(?:[a-z]+:|#|\/)/i.test(p))return all;
   const [f,hash]=p.split('#');
   const rel=path.relative(archive,path.resolve(path.dirname(src),f)).replaceAll('\\','/');
   return a+rel+(hash?'#'+hash:'')+b;
 });
 fs.writeFileSync(dst,'# Archivstand vor Paket F, 05.10.2026\n\nHistorischer Verlauf; aktuelle Arbeit: [STAND](../STAND.md).\n\n'+rebased);
 return raw;
}
let claude=preserve('CLAUDE.md','CLAUDE-verlauf-2026-10-05.md');
preserve('plan/PLAN.md','PLAN-verlauf.md');
claude=claude.slice(claude.indexOf('## Zuerst:'));
const begin=claude.indexOf('### AKTUELL (30.09.2026):');
const end=claude.indexOf('## Zwei Grundsätze');
if(begin<0||end<begin)throw new Error('CLAUDE-Anker fehlen');
claude=claude.slice(0,begin)+`## Verbindlicher Arbeitsablauf

Bei „leg los“ oder „weiter“ zuerst [plan/STAND.md](plan/STAND.md), dann das
Logbuch der laufenden Phase lesen. Für Zyklus 2 gelten
[CODEX-START.md](plan/zyklus-2/CODEX-START.md) und die Aufgabenliste.
Der konkrete Betreiberauftrag bestimmt Paket und Umfang.
Historische Aufträge und Übergaben stehen vollständig im
[Archiv](plan/archiv/CLAUDE-verlauf-2026-10-05.md).

Pflicht: LEHREN vollständig vor der ersten Änderung, §14 vor jedem Commit.
Jede neue Fehlerart als Regel und Vorfall in LEHREN dokumentieren.
UI-/Bewegungsänderungen auch auf angrenzenden Bildschirmen prüfen: kurze und
lange Viewports, Scrollposition, Karte und Bewertung, Plan-Aufbau und fertiger
Plan, iOS First Paint. Ein neuer Sprung oder Ruckler verhindert die Abnahme.
Geräteabnahme und Chromium-Prüfung ausdrücklich unterscheiden.

`+claude.slice(end);
const b=claude.indexOf('**So findest du die Stelle');
const e=claude.indexOf('## Die Grundregel',b);
if(b<0||e<0)throw new Error('Fortsetzungsanker fehlen');
claude=claude.slice(0,b)+`Die Stelle steht in [plan/STAND.md](plan/STAND.md) und im obersten Eintrag
des laufenden Logbuchs. [plan/PLAN.md](plan/PLAN.md) enthält die Übersicht
und offenen Fragen. Vorhandenen Arbeitsstand erhalten; den konkreten
Fortsetzungsauftrag und seine Prüfpflichten befolgen.

`+claude.slice(e);
fs.writeFileSync('CLAUDE.md','# Hinweise für Claude Code und Codex\n\n'+claude);
fs.writeFileSync('plan/PLAN.md',`# Gesamtplan – Übersicht und offene Schritte

Maßgeblich ist [STAND.md](STAND.md). Historische Phasen, Entscheidungen und
sämtliche früheren Arbeitsstände bleiben im [PLAN-Verlauf](archiv/PLAN-verlauf.md).
Grundlage: [KONZEPT.md](../KONZEPT.md), Arbeitsregeln: [CLAUDE.md](../CLAUDE.md)
und [LEHREN.md](LEHREN.md).

## Aktuelle Arbeit, 05.10.2026

Paket E einschließlich E7 abgeschlossen auf main: 5af78a0, 3.18.16.
Paket F ist ausdrücklich beauftragt; Änderungen bleiben bis zur vollständigen
Abnahme am Laptop uncommittet. Keine Veröffentlichung, Version oder Push hier.
Fortsetzung: [Paket-F-Übergabe](zyklus-2/PAKET-F-FORTSETZUNG.md),
[Aufgaben](zyklus-2/AUFGABEN.md), [Logbuch](zyklus-2/LOGBUCH.md).

## Reihenfolge

1. Paket F nach [CODEX-START](zyklus-2/CODEX-START.md) bauen und prüfen.
2. Am Laptop vollständige Paketabnahme, Gegenprüfung, Version, Commit und Push.
3. Nachprüfung nach [Zyklus-Auftrag](zyklus-2/AUFTRAG.md) §3.6, nur auf Auftrag.
4. Text-Probelauf bis 29.10.2026 unverändert lassen; danach Auswertung.

## Offen

- F: vollständige Abnahme am Laptop und Rechtsprüfung der angeglichenen
  Datenschutzerklärung durch eine Person. Nicht als abgeschlossen behandeln.
- D12–D15 bleiben zurück; nichts daran bauen oder weiter messen.
- E17 wartet auf Google-Kontolöschung am Gerät (G4), E26 später (Z7).
- Geräteprüfungen G1–G7: [Entscheidungen](zyklus-2/ENTSCHEIDUNGEN.md).
- Fortschritt-Umbau Z1 einschließlich C9/C10/C28 nur im eigenen Auftrag.
- Regeln und Hosting veröffentlicht ausschließlich der Betreiber nach Auftrag;
  „ladegerät“ startet den festgelegten Ablauf. Kein Deploy in Paket F.
- Spätere Funktionen und Konsolenschritte: [FUNKTIONEN](grossplan/FUNKTIONEN.md),
  [KONSOLE](grossplan/KONSOLE.md), historische Fragen im PLAN-Verlauf.

## Neue Session

STAND, CLAUDE und LEHREN lesen, dann Auftrag, Aufgaben und obersten
Logbucheintrag. Bei Paket-F-Fortsetzung die Übergabe lesen und Änderungen
erhalten. Eine Unterbrechung ersetzt keine Abnahme.
`);
console.log('F5: vollständige Originale archiviert; aktuelle Einstiegsdateien gekürzt.');
