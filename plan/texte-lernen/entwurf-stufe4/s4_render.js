/* Die Wiederhol-Sitzung - derselbe Aufbau wie "Neu lernen" (Buehne, feste
   Knopfreihe unten). */
function renderTextWdh() {
  const w = ui.textWdh, b = currentBereich(), t = findText(b, w.textId);
  if (!t) return "";
  const zeilen = textZeilenVon(b, t);
  const nrVon = id => zeilenNummer(t, zeilen.findIndex(z => z.id === id));
  const wortName = zeilenWort(t);
  const rechts = w.letzte
    ? '<button class="icon-btn" data-action="wdh-rueckgaengig" aria-label="Letzten Abschnitt rückgängig">' + ikon("rueckgaengig") + '</button>'
    : null;
  let html = modeBar({ zu: "wdh-zu", zuLabel: "Wiederholen beenden",
    mitte: '<span class="modebar__titel" dir="auto">' + esc(t.name) + '</span>',
    anteil: w.aufgaben.length ? w.nr / w.aufgaben.length : 1, rechts: rechts });
  html += '<div class="text-buehne">';
  let knoepfe = "";
  const a = wdhAufgabe();
  if (!a) {
    const arbeit = textHeuteArbeit(zeilen, t, todayStr());
    html += '<h1 class="text-buehne__titel">Für heute wiederholt</h1>';
    html += '<p class="hint">' + mz(w.erledigt, "Abschnitt", "Abschnitte") + ' – ' +
      (textZahlen(b, t).fest ? 'der Kreis macht morgen weiter.' : 'morgen kommt das Frische wieder.') + '</p>';
    if (arbeit.kreis.length + arbeit.bloecke.length === 0 && naechsteNeueZeile(b, t, null)) {
      knoepfe = '<button class="secondary lg full" data-action="wdh-zu">Fertig</button>' +
        '<button class="lg full" data-action="text-lernen" data-id="' + esc(t.id) + '">Neu lernen</button>';
    } else knoepfe = '<button class="lg full" data-action="wdh-zu">Fertig</button>';
    return html + '</div><div class="text-knoepfe">' + knoepfe + '</div>';
  }
  const denk = w.frei ? "" : ' gedimmt" aria-disabled="true';
  const auftrag = w.schritt === "hakt" ? 'Tipp an, wo es gehakt hat.'
    : w.frage && w.frage.gewaehlt === null ? 'Wie geht es weiter?'
    : a.art === "kreis" ? 'Aus dem Gedächtnis aufsagen.' : 'Mit den Nachbarzeilen aufsagen.';
  html += '<h1 class="text-buehne__auftrag">' + auftrag + '</h1>';
  for (const id of a.hinweis) { const z = textLernenZeile(b, id); if (z) html += textZeileHtml(z, "hinweis", nrVon(id), wortName); }
  if (w.schritt === "hakt") {
    for (const id of a.bewerten) {
      const z = textLernenZeile(b, id); if (!z) continue;
      const an = w.hakt.has(id);
      html += '<button class="text-buehne__wahl' + (an ? ' aktiv' : '') + '" data-action="wdh-zeile-hakt" data-id="' + esc(id) + '" aria-pressed="' + an + '">' +
        '<span class="text-zeile__nr">' + nrVon(id) + '</span>' + textZeileHtml(z, "offen", nrVon(id), wortName) + '</button>';
    }
    knoepfe = '<button class="lg full" data-action="wdh-hakt-weiter"' + (w.hakt.size ? '' : ' disabled') + '>Weiter</button>';
  } else {
    for (const id of a.zeigen) {
      const z = textLernenZeile(b, id); if (!z) continue;
      const nachbar = a.bewerten.indexOf(id) === -1;
      html += textZeileHtml(z, w.aufgedeckt ? (nachbar ? "nachbar" : "offen") : "verdeckt", nrVon(id), wortName);
    }
    if (w.frage && w.frage.gewaehlt === null) {
      html += '<div class="text-frage" role="group" aria-label="Wie geht es weiter?">';
      for (const wort of w.frage.woerter) {
        html += '<button class="secondary text-frage__wort" data-action="wdh-frage" data-id="' + esc(wort) + '"' + schriftAttr(wort) + '>' + esc(wort) + '</button>';
      }
      html += '</div>';
    } else if (w.frage && !w.aufgedeckt) {
      html += '<p class="hint" aria-live="polite">' + (w.frage.gewaehlt === w.frage.richtig ? 'Richtig.' : 'Richtig wäre „' + esc(w.frage.richtig) + '“ – die Zeile kommt morgen wieder.') + '</p>';
    }
    if (!w.aufgedeckt) {
      const gesperrt = w.frage && w.frage.gewaehlt === null;
      knoepfe = '<button class="lg full study-aufdecken' + (gesperrt ? ' gedimmt" aria-disabled="true' : denk) + '" data-action="text-aufdecken">Aufdecken</button>';
    } else {
      knoepfe = '<button class="secondary lg full" data-action="wdh-antwort" data-id="hakt">Hakt</button>' +
        '<button class="lg full" data-action="wdh-antwort" data-id="sicher">Sicher</button>';
    }
  }
  html += '</div>';
  html += '<div class="text-knoepfe">' + knoepfe + '</div>';
  return html;
}
