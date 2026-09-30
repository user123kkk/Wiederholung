/* Die Text-Sitzung (KONZEPT § 8.1 Punkt 4): Zeile bzw. Abschnitt gross,
   Hinweiszeilen grau darueber, Knoepfe unten an festem Platz - jeder
   Schritt hat dieselbe Knopfreihe mit zwei Plaetzen, nichts springt. */
function textZeileHtml(z, art, nr, wortName) {
  const inhalt = art === "verdeckt" ? '<span class="text-buehne__verdeckt">' + '· · ·' + '</span>'
    : art === "buchstaben" ? esc(anfangsbuchstaben(z.wort)) : esc(z.wort);
  const label = art === "verdeckt" ? ' aria-label="' + wortName + ' ' + nr + ', verdeckt"' : '';
  return '<p class="text-buehne__zeile text-buehne__zeile--' + art + '"' + schriftAttr(z.wort) + label + '>' + inhalt + '</p>';
}
function renderTextLernen() {
  const tl = ui.textLernen, b = currentBereich(), t = findText(b, tl.textId);
  if (!t) return "";
  const zeilen = textZeilenVon(b, t);
  const nrVon = id => zeilenNummer(t, zeilen.findIndex(z => z.id === id));
  const wortName = zeilenWort(t);
  const n = textZahlen(b, t);
  let html = modeBar({ zu: "text-lernen-zu", zuLabel: "Neu lernen beenden",
    mitte: '<span class="modebar__titel" dir="auto">' + esc(t.name) + '</span>',
    anteil: zeilen.length ? (n.frisch + n.fest) / zeilen.length : 0 });
  html += '<div class="text-buehne">';
  let knoepfe = "";
  const denk = tl.frei ? "" : ' gedimmt" aria-disabled="true';
  const aufdecken = '<button class="lg full' + denk + '" data-action="text-aufdecken">Aufdecken</button>';
  /* Bis zu zwei Zeilen davor als Einstieg (KONZEPT § 4), nie die folgende. */
  const hinweis = (bisId, anzahl) => {
    const i = zeilen.findIndex(z => z.id === bisId);
    return zeilen.slice(Math.max(0, i - anzahl), i).map(z => textZeileHtml(z, "hinweis", nrVon(z.id), wortName)).join("");
  };
  if (tl.schritt === "gelernt") {
    const heute = zeilen.filter(heuteNeuGelernt).length;
    const weitere = !!naechsteNeueZeile(b, t, tl.id);
    html += '<h1 class="text-buehne__titel">' + (tl.letzte ? wortName + ' ' + nrVon(tl.letzte.id) + ' sitzt' : 'Sitzt') + '</h1>';
    html += '<p class="hint">' + (heute >= NEU_GUT_FUER_HEUTE ? 'Für heute ist das gut. Morgen kommt alles noch einmal.'
      : 'Morgen kommt ' + (heute === 1 ? 'sie' : 'alles') + ' noch einmal.') + '</p>';
    if (tl.letzte) html += '<button class="ghost" data-action="text-lernen-rueckgaengig">' + ikon("rueckgaengig", "i-sm") + ' Rückgängig</button>';
    knoepfe = (weitere ? '<button class="' + (heute >= NEU_GUT_FUER_HEUTE ? 'secondary' : '') + ' lg full" data-action="text-lernen-weiter">Nächste ' + wortName + '</button>' : '') +
      '<button class="' + (weitere && heute < NEU_GUT_FUER_HEUTE ? 'secondary ' : '') + 'lg full" data-action="text-lernen-zu">Für heute aufhören</button>';
  } else if (tl.schritt === "amStueck" || tl.schritt === "hakt") {
    const reihe = amStueckZeilen(b, t, tl);
    html += '<h1 class="text-buehne__auftrag">' + (tl.schritt === "hakt" ? 'Tipp an, wo es gehakt hat.'
      : reihe.length > 1 ? 'Alles von heute am Stück aufsagen.' : 'Noch einmal ohne Hilfe aufsagen.') + '</h1>';
    html += hinweis(reihe[0].id, 2);
    for (const z of reihe) {
      if (tl.schritt === "hakt") {
        const an = tl.hakt.has(z.id);
        html += '<button class="text-buehne__wahl' + (an ? ' aktiv' : '') + '" data-action="text-zeile-hakt" data-id="' + esc(z.id) + '" aria-pressed="' + an + '">' +
          '<span class="text-zeile__nr">' + nrVon(z.id) + '</span>' + textZeileHtml(z, "offen", nrVon(z.id), wortName) + '</button>';
      } else html += textZeileHtml(z, tl.aufgedeckt ? "offen" : "verdeckt", nrVon(z.id), wortName);
    }
    if (tl.schritt === "hakt") {
      knoepfe = '<button class="lg full" data-action="text-hakt-weiter"' + (tl.hakt.size ? '' : ' disabled') + '>Diese üben</button>';
    } else if (!tl.aufgedeckt) knoepfe = aufdecken;
    else knoepfe = '<button class="secondary lg full" data-action="text-am-stueck" data-id="hakt">Hakt</button>' +
      '<button class="lg full" data-action="text-am-stueck" data-id="fliessend">Fließend</button>';
  } else {
    const z = textLernenZeile(b, tl.fokus);
    if (!z) return html + '</div>';
    const auftrag = { lesen: 'Lesen – laut, bis es sich vertraut anfühlt.', buchstaben: 'Mit den Anfangsbuchstaben aufsagen.', ohne: 'Ohne Hilfe aufsagen.' }[tl.schritt];
    html += '<h1 class="text-buehne__auftrag">' + auftrag + '</h1>';
    html += hinweis(z.id, tl.schritt === "ohne" ? 1 : 2);
    html += '<p class="text-buehne__nr">' + wortName + ' ' + nrVon(z.id) + '</p>';
    if (tl.schritt === "lesen") {
      html += textZeileHtml(z, "offen", nrVon(z.id), wortName);
      knoepfe = '<button class="lg full" data-action="text-lernen-schritt" data-id="buchstaben">Weiter</button>';
    } else {
      if (tl.schritt === "buchstaben" && !tl.aufgedeckt) html += textZeileHtml(z, "buchstaben", nrVon(z.id), wortName);
      else html += textZeileHtml(z, tl.aufgedeckt ? "offen" : "verdeckt", nrVon(z.id), wortName);
      knoepfe = !tl.aufgedeckt ? aufdecken
        : '<button class="secondary lg full" data-action="text-konnte" data-id="nein">Noch nicht</button>' +
          '<button class="lg full" data-action="text-konnte" data-id="ja">Konnte ich</button>';
    }
  }
  html += '</div>';
  html += '<div class="text-knoepfe">' + knoepfe + '</div>';
  return html;
}
