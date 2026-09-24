/* Kontrastpruefung (3.15.0). Misst fuer jeden sichtbaren Text das
   Verhaeltnis Schriftfarbe : wirksamer Hintergrund (WCAG 2.x) und meldet
   alles unter 4.5:1 (unter 3:1 bei grosser Schrift). Hintergrund = erste
   deckende Flaeche nach oben; halbtransparente Flaechen und Deckkraft der
   Vorfahren werden eingerechnet. Verlaeufe/Bilder zaehlen als ihre
   Grundfarbe - im Zweifel ein Foto ansehen.
   Aufruf aus einem Test: const { pruefeKontrast } = require('./kontrast');
   const funde = await pruefeKontrast(page, 'Bildschirmname'); */
async function pruefeKontrast(p, name) {
  return p.evaluate((name) => {
    const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null;
      const v = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r: v[0], g: v[1], b: v[2], a: v.length > 3 ? v[3] : 1 }; };
    const lin = x => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); };
    const lum = c => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
    const mix = (o, u) => ({ r: o.r * o.a + u.r * (1 - o.a), g: o.g * o.a + u.g * (1 - o.a), b: o.b * o.a + u.b * (1 - o.a), a: 1 });
    function grund(el) {
      const schichten = [];
      for (let e = el; e; e = e.parentElement) {
        const st = getComputedStyle(e);
        if (st.backgroundImage && st.backgroundImage !== 'none' && /gradient\(/.test(st.backgroundImage) && !parse(st.backgroundColor)?.a) return null;   /* Verlauf ohne Grundfarbe: nicht messbar */
        const c = parse(st.backgroundColor);
        if (c && c.a > 0) { schichten.push(c); if (c.a >= 1) break; }
      }
      let g = parse(getComputedStyle(document.body).backgroundColor) || { r: 0, g: 0, b: 0, a: 1 };
      if (g.a < 1) g = { r: 17, g: 16, b: 16, a: 1 };
      for (let i = schichten.length - 1; i >= 0; i--) g = mix(schichten[i], g);
      return g;
    }
    function deckkraft(el) { let o = 1; for (let e = el; e; e = e.parentElement) o *= +getComputedStyle(e).opacity; return o; }
    const funde = []; const gesehen = new Set();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const t = walker.currentNode; const el = t.parentElement;
      if (!el || !t.textContent.trim() || gesehen.has(el)) continue;
      gesehen.add(el);
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height || r.bottom < 0 || r.top > innerHeight) continue;
      if (el.closest('[aria-hidden="true"]') && el.closest('.study-extra--platz, [style*="visibility:hidden"]')) continue;
      const o = deckkraft(el); if (o < 0.05) continue;
      let f = parse(cs.color); if (!f) continue;
      const g = grund(el);
      if (!g) continue;
      f = mix({ ...f, a: f.a * o }, g);
      const L1 = lum(f), L2 = lum(g);
      const k = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const px = parseFloat(cs.fontSize), fett = +cs.fontWeight >= 700;
      const gross = px >= 24 || (fett && px >= 18.66);
      const soll = gross ? 3 : 4.5;
      if (k < soll) funde.push({ bild: name, text: t.textContent.trim().slice(0, 40), klasse: (el.className && el.className.baseVal === undefined ? el.className : '') || el.tagName, kontrast: +k.toFixed(2), soll, disabled: !!el.closest('[disabled]') });
    }
    return funde;
  }, name);
}
module.exports = { pruefeKontrast };
