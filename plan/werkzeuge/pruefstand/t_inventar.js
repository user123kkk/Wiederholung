/* Inventar: je Bildschirm eine Ganzseiten-Aufnahme und die Textgliederung
   (Ueberschriften, Zeilen, Knoepfe) - Grundlage fuer die Hick-/Doppelt-Pruefung. */
const { start, neueSeite, aktion, foto, GERAETE } = require('./lib');
(async () => {
  const b = await start();
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1800 });
  const inv = async (name) => {
    await p.waitForTimeout(500);
    await foto(p, 'inv-' + name, true);
    const t = await p.evaluate(() => {
      const out = [];
      const sel = 'h1,h2,h3,.eyebrow,.stat-titel,.stat-sub,.hint,p,button,.liste-zeile__text,.badge,strong,.kpi,.card-title,label,summary';
      document.querySelectorAll('#app ' + sel.split(',').join(', #app ')).forEach(e => {
        const r = e.getBoundingClientRect();
        if (!r.width || !r.height) return;
        if (e.closest('[aria-hidden="true"]')) return;
        const txt = (e.innerText || '').replace(/\s+/g, ' ').trim();
        if (!txt || txt.length > 140) return;
        if (e.parentElement && e.parentElement.closest(sel) && e.tagName !== 'BUTTON') return;
        out.push(e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : '') + ': ' + txt);
      });
      return out;
    });
    console.log('\n=== ' + name + ' (' + t.length + ' Elemente, Hoehe ' + await p.evaluate(() => document.documentElement.scrollHeight) + 'px)');
    console.log(t.join('\n'));
  };
  await inv('lernen');
  await aktion(p, 'tab-fortschritt', null, 1200); await inv('fortschritt');
  await aktion(p, 'tab-verwalten', null, 1200); await inv('verwalten');
  await aktion(p, 'tab-lernen', null, 800);
  await aktion(p, 'einstellungen', null, 900); await inv('einstellungen');
  console.log(p.fehler.join('\n') || '');
  await b.close();
})();
