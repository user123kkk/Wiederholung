/* Einbau Stufe 4 in app.js: node ../entwurf-stufe3/ersetze.js ../../../app.js s4i.js */
const fs = require('fs'), path = require('path');
const lies = f => fs.readFileSync(path.join(__dirname, f), 'utf8').replace(/\r\n/g, '\n');
module.exports = [
[`function renderVerwalten() {
  const cards = currentCards();`, lies('s4_logik.js') + '\n' + lies('s4_block.js') + '\n' + lies('s4_render.js') + `
function renderVerwalten() {
  const cards = currentCards();`],
// portion im Text-Set
[`    festErgebnisse: normErgebnisse(s.festErgebnisse)
  };
}`, `    festErgebnisse: normErgebnisse(s.festErgebnisse),
    /* 3.18.5: was vom heutigen Kreis-Stueck noch offen ist (am Tag kreisTag). */
    portion: Number.isInteger(s.portion) && s.portion >= 0 ? s.portion : 0
  };
}`],
// Denkpause gilt fuer beide Sitzungen
[`    if (ui.textLernen !== tl) return;
    tl.frei = true;`, `    if (ui.textLernen !== tl && ui.textWdh !== tl) return;
    tl.frei = true;
    /* Waehrend die Kontrollfrage offen ist, bleibt "Aufdecken" gesperrt. */
    if (tl.frage && tl.frage.gewaehlt === null) return;`],
// ui
[`  textLernen: null,`, `  textLernen: null,
  /* 3.18.5: laufende Wiederhol-Sitzung eines Textes (Stufe 4). */
  textWdh: null,`],
// Modus
[`  if (ui.textLernen && (ui.textLernen.uid !== (currentUser ? currentUser.uid : null) || !texteFreigeschaltet())) ui.textLernen = null;
  const imModus = (ui.tab === "lernen" && !!(ui.session || ui.lernSetId) && !ui.einstellungen) ||
    (!!ui.textLernen && !ui.einstellungen);`,
 `  if (ui.textLernen && (ui.textLernen.uid !== (currentUser ? currentUser.uid : null) || !texteFreigeschaltet())) ui.textLernen = null;
  if (ui.textWdh && (ui.textWdh.uid !== (currentUser ? currentUser.uid : null) || !texteFreigeschaltet())) ui.textWdh = null;
  const imModus = (ui.tab === "lernen" && !!(ui.session || ui.lernSetId) && !ui.einstellungen) ||
    ((!!ui.textLernen || !!ui.textWdh) && !ui.einstellungen);`],
[`  else if (ui.textLernen) inhalt = renderTextLernen();`, `  else if (ui.textLernen) inhalt = renderTextLernen();
  else if (ui.textWdh) inhalt = renderTextWdh();`],
[`    ui.textLernen ? ui.textLernen.fokus + "|" + ui.textLernen.schritt + "|" + (ui.textLernen.aufgedeckt ? 1 : 0) : ""].join("/");`,
 `    ui.textLernen ? ui.textLernen.fokus + "|" + ui.textLernen.schritt + "|" + (ui.textLernen.aufgedeckt ? 1 : 0) : "",
    ui.textWdh ? ui.textWdh.nr + "|" + (ui.textWdh.schritt || "") + "|" + (ui.textWdh.aufgedeckt ? 1 : 0) : ""].join("/");`],
// Bereichswechsel
[`  ui.textLernen = null;
  ui.neuWahl = false;`, `  ui.textLernen = null; ui.textWdh = null;
  ui.neuWahl = false;`],
// Text-Ansicht: Wiederholen und Tagesmenge
[`  /* 3.18.3: Neu lernen (Stufe 3) - ab der ersten neuen Zeile. */
  const erste = naechsteNeueZeile(b, t, null);
  if (erste) html += '<button class="lg full text-neu-lernen" data-action="text-lernen" data-id="' + esc(t.id) + '">' +
    'Neu lernen · ' + zeilenWort(t) + ' ' + zeilenNummer(t, zeilen.indexOf(erste)) + '</button>';`,
 `  /* 3.18.5: zuerst Wiederholen (Kreis + frische Bloecke), dann Neues
     (WIEDERHOLEN.md § 4). Ueber 20 Minuten Wiederholarbeit wird Neues nicht
     angeboten, bleibt aber moeglich (§ 5). */
  const arbeit = textHeuteArbeit(zeilen, t, todayStr());
  const offen = arbeit.kreis.length + arbeit.bloecke.length;
  if (offen) html += '<button class="lg full text-wiederholen" data-action="text-wiederholen" data-id="' + esc(t.id) + '">' +
    'Wiederholen · etwa ' + Math.max(1, Math.round(arbeit.sekunden / 60)) + ' Min.</button>';
  /* 3.18.3: Neu lernen (Stufe 3) - ab der ersten neuen Zeile. */
  const erste = naechsteNeueZeile(b, t, null);
  if (erste && arbeit.sekunden > TAGESZEIT_HALTEN_S) {
    html += '<p class="hint">Heute lieber das Gelernte halten.</p>' +
      '<button class="ghost" data-action="text-lernen" data-id="' + esc(t.id) + '">Trotzdem neu lernen</button>';
  } else if (erste) html += '<button class="' + (offen ? 'secondary ' : '') + 'lg full text-neu-lernen" data-action="text-lernen" data-id="' + esc(t.id) + '">' +
    'Neu lernen · ' + zeilenWort(t) + ' ' + zeilenNummer(t, zeilen.indexOf(erste)) + '</button>';`],
// Klicks
[`    case "text-aufdecken": textAufdecken(); break;`, `    case "text-aufdecken": if (ui.textWdh) wdhAufdecken(); else textAufdecken(); break;
    /* 3.18.5: Wiederholen (Stufe 4). */
    case "text-wiederholen": textWiederholenStarten(btn.dataset.id); break;
    case "wdh-zu": textWdhEnde(); break;
    case "wdh-frage": wdhFrageWaehlen(btn.dataset.id); break;
    case "wdh-antwort": wdhAntwort(btn.dataset.id === "sicher"); break;
    case "wdh-zeile-hakt": {
      const w = ui.textWdh;
      if (w && w.schritt === "hakt") { if (w.hakt.has(btn.dataset.id)) w.hakt.delete(btn.dataset.id); else w.hakt.add(btn.dataset.id); render(); }
      break;
    }
    case "wdh-hakt-weiter": wdhHaktWeiter(); break;
    case "wdh-rueckgaengig": wdhRueckgaengig(); break;`],
// Neu lernen aus dem Ende der Wiederhol-Sitzung
[`function textLernenStarten(tid) {
  const b = currentBereich(), t = findText(b, tid);`, `function textLernenStarten(tid) {
  if (ui.textWdh) { if (denkpauseUhr) { clearTimeout(denkpauseUhr); denkpauseUhr = null; } ui.textWdh = null; }
  const b = currentBereich(), t = findText(b, tid);`],
];
