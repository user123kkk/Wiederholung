/* Einbau Stufe 3 in app.js: node ersetze.js ../../../app.js s3i.js */
const fs = require('fs'), path = require('path');
const block = fs.readFileSync(path.join(__dirname, 's3_block.js'), 'utf8').replace(/\r\n/g, '\n');
const rend = fs.readFileSync(path.join(__dirname, 's3_render.js'), 'utf8').replace(/\r\n/g, '\n');
module.exports = [
// 1. Bausteine vor renderVerwalten
[`function renderVerwalten() {
  const cards = currentCards();`, block + '\n' + rend + `
function renderVerwalten() {
  const cards = currentCards();`],
// 2. ui
[`  zeileEdit: null,
  /* 3.3.1:`, `  zeileEdit: null,
  /* 3.18.3: laufende Sitzung "Neu lernen" eines Textes (Stufe 3). */
  textLernen: null,
  /* 3.3.1:`],
// 3. Modus
[`  const imModus = ui.tab === "lernen" && !!(ui.session || ui.lernSetId) && !ui.einstellungen;`,
 `  /* 3.18.3: Die Text-Sitzung gehoert zu dem Konto, in dem sie begann
     (LEHREN § 8.3), und nur in den Probelauf. */
  if (ui.textLernen && (ui.textLernen.uid !== (currentUser ? currentUser.uid : null) || !texteFreigeschaltet())) ui.textLernen = null;
  const imModus = (ui.tab === "lernen" && !!(ui.session || ui.lernSetId) && !ui.einstellungen) ||
    (!!ui.textLernen && !ui.einstellungen);`],
[`  if (ui.einstellungen) inhalt = renderEinstellungen();
  else inhalt = ui.tab === "lernen" ? renderLernen()`,
 `  if (ui.einstellungen) inhalt = renderEinstellungen();
  else if (ui.textLernen) inhalt = renderTextLernen();
  else inhalt = ui.tab === "lernen" ? renderLernen()`],
[`    ui.textAnlegen ? "ta-" + ui.textAnlegen.weg + "-" + ui.textAnlegen.schritt : "", ui.textAnsicht || ""].join("/");`,
 `    ui.textAnlegen ? "ta-" + ui.textAnlegen.weg + "-" + ui.textAnlegen.schritt : "", ui.textAnsicht || "",
    ui.textLernen ? ui.textLernen.fokus + "|" + ui.textLernen.schritt + "|" + (ui.textLernen.aufgedeckt ? 1 : 0) : ""].join("/");`],
// 4. Bereichswechsel beendet die Sitzung
[`  /* 3.18.1: Texte gehoeren zu ihrem Bereich. */
  ui.neuWahl = false;`, `  /* 3.18.1: Texte gehoeren zu ihrem Bereich (3.18.3: auch die Sitzung). */
  ui.textLernen = null;
  ui.neuWahl = false;`],
// 5. Knopf in der Text-Ansicht
[`  html += '<p class="hint">' + (t.quelle === "tanzil" ? mz(zeilen.length, "Aya", "Ayat") : mz(zeilen.length, "Zeile", "Zeilen")) +
    ' · ' + n.neu + ' neu · ' + n.frisch + ' frisch · ' + n.fest + ' fest</p>';`,
 `  html += '<p class="hint">' + (t.quelle === "tanzil" ? mz(zeilen.length, "Aya", "Ayat") : mz(zeilen.length, "Zeile", "Zeilen")) +
    ' · ' + n.neu + ' neu · ' + n.frisch + ' frisch · ' + n.fest + ' fest</p>';
  /* 3.18.3: Neu lernen (Stufe 3) - ab der ersten neuen Zeile. */
  const erste = naechsteNeueZeile(b, t, null);
  if (erste) html += '<button class="lg full text-neu-lernen" data-action="text-lernen" data-id="' + esc(t.id) + '">' +
    'Neu lernen · ' + zeilenWort(t) + ' ' + zeilenNummer(t, zeilen.indexOf(erste)) + '</button>';`],
// 6. Klicks
[`    case "texte-widerrufen": texteWiderrufen(); break;`, `    case "texte-widerrufen": texteWiderrufen(); break;
    /* 3.18.3: Neu lernen (Stufe 3). */
    case "text-lernen": textLernenStarten(btn.dataset.id); break;
    case "text-lernen-zu": textLernenEnde(); break;
    case "text-lernen-schritt": if (ui.textLernen) textLernenSchritt(btn.dataset.id === "buchstaben" ? "buchstaben" : "lesen"); break;
    case "text-aufdecken": textAufdecken(); break;
    case "text-konnte": if (ui.textLernen) textKonnte(btn.dataset.id === "ja"); break;
    case "text-am-stueck": if (ui.textLernen) textAmStueck(btn.dataset.id === "fliessend"); break;
    case "text-zeile-hakt": {
      const tl = ui.textLernen;
      if (tl && tl.schritt === "hakt") { if (tl.hakt.has(btn.dataset.id)) tl.hakt.delete(btn.dataset.id); else tl.hakt.add(btn.dataset.id); render(); }
      break;
    }
    case "text-hakt-weiter": textHaktWeiter(); break;
    case "text-lernen-weiter": textLernenWeiter(); break;
    case "text-lernen-rueckgaengig": textLernenRueckgaengig(); break;`],
];
