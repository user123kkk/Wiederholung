/* Diagnose (kein Abnahmetest): D11 war am 07.10.2026 im langen Pakettest dreimal rot -
   die Meldung verschwand rund 80 ms nach Beginn des Ausblendens statt nach 160 ms.
   Wer nimmt sie aus dem Bild, und wann? Protokolliert jedes Entfernen der Meldung
   (Element.remove und das Neusetzen von #app) mit Zeit und Aufrufer.
     node x_toast_austritt.js [Anzahl] [commit] */
const { start, vollerStore } = require('./lib');
const { seiteMitApp } = require('./text_lib');
const anzahl = +process.argv[2] || 20, commit = process.argv[3] || null;
(async () => {
  const b = await start();
  let kurz = 0;
  try {
    for (let i = 0; i < anzahl; i++) {
      const { p, ctx } = await seiteMitApp(b, vollerStore({ leer: i % 2 === 1, thema: i % 4 < 2 ? 'hell' : 'dunkel' }), { commit, viewport: { width: [390, 320, 820][i % 3], height: 844 }, zusatz: 'zeigeToast,' });
      try {
        if (process.env.TOAST_CPU) { const cdp = await p.context().newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: +process.env.TOAST_CPU }); }
        const r = await p.evaluate(() => new Promise(fertig => {
          const log = [], t0 = performance.now();
          const merke = wie => { if (document.querySelector('.toast')) log.push({ t: Math.round(performance.now() - t0), wie, wer: (new Error().stack || '').split('\n').slice(2, 6).map(z => z.trim().replace(/^at /, '').replace(/\(.*[/\\]/, '(').slice(0, 60)).join(' < ') }); };
          const echtRemove = Element.prototype.remove;
          Element.prototype.remove = function () { if (this.classList && (this.classList.contains('toast-wrap') || this.querySelector && this.querySelector('.toast'))) merke('remove'); return echtRemove.call(this); };
          const d = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
          Object.defineProperty(document.getElementById('app'), 'innerHTML', { set(v) { merke('innerHTML'); d.set.call(this, v); }, get() { return d.get.call(this); }, configurable: true });
          let erstesAus = null, weg = null, bilder = 0; const lang = []; try { new PerformanceObserver(l => l.getEntries().forEach(e => lang.push(Math.round(e.startTime - t0) + '+' + Math.round(e.duration)))).observe({ entryTypes: ['longtask'] }); } catch (e) {}
          const messen = () => { const e = document.querySelector('.toast'); const t = performance.now() - t0;
            if (!e) { if (weg === null && t > 300) weg = t; } else { const o = +getComputedStyle(e).opacity; if (t >= 2600 && o > 0 && o < .95) bilder++; if (erstesAus === null && o < 0.999 && t > 2000) erstesAus = t; }
            if (t < 3200) requestAnimationFrame(messen); else fertig({ erstesAus: erstesAus && Math.round(erstesAus), weg: weg && Math.round(weg), log, bilder, lang }); };
          window.__PRUEF.zeigeToast('D11 Test'); requestAnimationFrame(messen);
        }));
        const dauer = r.weg && r.erstesAus ? r.weg - r.erstesAus : null;
        const auffaellig = r.bilder < 5 && !(i % 2 === 99);
        if (auffaellig) kurz++;
        console.log((auffaellig ? 'KURZ ' : 'ok   ') + i + ': Ausblenden ab ' + r.erstesAus + ' ms, weg bei ' + r.weg + ' ms (' + dauer + ' ms), Austrittsbilder ' + r.bilder + ', lange Aufgaben ' + r.lang.join(',') + ' | ' + r.log.map(l => l.t + ' ' + l.wie + ' [' + l.wer + ']').join(' ; '));
      } finally { await ctx.close(); }
    }
    console.log(kurz + ' von ' + anzahl + ' zu kurz');
  } finally { await b.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
