/* Gemeinsamer Zusatz fuer die Stufe-4-Tests: einen Wiederhol-Tag direkt
   ueber die echten Funktionen durchspielen (ohne Oberflaeche). haktIds:
   diese Zeilen werden gehakt. Ein neuer Tag = kreisTag und Tageszaehler
   im Speicher leer - todayStr bleibt, darum pruefen die Tests kreisPos,
   nicht Daten. */
module.exports = `
  tagSim: (tid, haktIds, nurKreis) => {
    ui.kreisHeute = null;
    const b = currentBereich(), t = findText(b, tid);
    t.kreisTag = null;
    const plan = textWdhPlan(b, t, todayStr()).filter(x => !nurKreis || x.art === "kreis");
    const ids = [];
    ui.textLernen = { art: "wdh", uid: currentUser.uid, textId: tid, plan, pos: 0, id: plan[0] ? plan[0].ids[0] : null,
      fokus: "0", schritt: "wdh", hakt: new Set(), letzte: null, anzahl: 0, aufgedeckt: false, frei: true };
    plan.forEach((st, i) => { ids.push(st.ids.slice()); const tl = ui.textLernen; tl.pos = i; tl.hakt = new Set(st.bewerten.filter(x => haktIds.includes(x))); tl.kontrollHakt = null; textWdhBewerten(); });
    if (denkpauseUhr) { clearTimeout(denkpauseUhr); denkpauseUhr = null; }
    ui.textLernen = null; render();
    return { ids, kreisPos: t.kreisPos, kreisTage: t.kreisTage, erg: t.festErgebnisse };
  },
  plan: tid => { const b = currentBereich(); return textWdhPlan(b, findText(b, tid), todayStr()); },
  nachstellen: (tage, e) => kreisNachstellen(tage, e),
  zeile: id => JSON.parse(JSON.stringify(currentBereich().zeilen.find(z => z.id === id))),
  tab: () => {},`;
