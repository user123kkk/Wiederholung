/* Messhilfe (nicht Teil der Abnahme): wie t_text_tempo, aber mit
   Chrome-Trace. Zerlegt jede Aufgabe > 50 ms in ihre groessten Teile
   (Skript-Funktion, Layout, Stil, HTML-Parsen). Aufruf:
   node x_tempo_spur.js [schritt-filter] */
const fs = require('node:fs'), path = require('node:path');
const { start, tag } = require('./lib');
const { seiteMitApp, BETREIBER_UID, zeilenStore } = require('./text_lib');
const S2 = fs.readFileSync(path.join(__dirname, '../../../quran/tanzil-uthmani.txt'), 'utf8')
  .split('\n').filter(l => l && l[0] !== '#').map(l => l.split('|')).filter(p => p[0] === '2').map(p => p[2]);

(async () => {
  const browser = await start();
  try {
    const store = zeilenStore(S2.length, i => i < 250 ? { stufe: 7, next: '2099-12-31', erste: tag(-30) }
      : i < 270 ? { stufe: 2, next: tag(0), erste: tag(-4) } : { stufe: 0, next: tag(0), erste: null },
      { wort: i => S2[i], set: { quelle: 'tanzil', sure: 2, kreisPos: 'z0' } });
    const { ctx, p } = await seiteMitApp(browser, store, { uid: BETREIBER_UID });
    const cdp = await ctx.newCDPSession(p);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    const events = [];
    cdp.on('Tracing.dataCollected', d => events.push(...d.value));
    const fertig = new Promise(r => cdp.once('Tracing.tracingComplete', r));
    await cdp.send('Tracing.start', { categories: 'devtools.timeline,disabled-by-default-devtools.timeline,blink.user_timing', transferMode: 'ReportEvents' });
    const marke = n => p.evaluate(n => performance.mark('S:' + n), n);
    await marke('Verwalten'); await p.click('[data-action="tab-verwalten"]'); await p.waitForTimeout(800);
    await marke('Text oeffnen'); await p.click('[data-action="text-oeffnen"][data-id="t1"]'); await p.waitForTimeout(1500);
    await marke('ende');
    await cdp.send('Tracing.end'); await fertig;
    const marken = events.filter(e => e.name && e.name.startsWith('S:')).map(e => [e.ts, e.name.slice(2)]).sort((a, b) => a[0] - b[0]);
    const schrittVon = ts => { let s = 'start'; for (const [t, n] of marken) if (t <= ts) s = n; return s; };
    const tid = events.find(e => e.name === 'TracingStartedInBrowser') ? null : null;
    const tasks = events.filter(e => e.name === 'RunTask' && e.ph === 'X' && e.dur > 50000);
    for (const t of tasks) {
      const kids = events.filter(e => e.ph === 'X' && e.tid === t.tid && e.pid === t.pid && e.ts >= t.ts && e.ts + (e.dur || 0) <= t.ts + t.dur && e !== t && e.dur > 3000);
      const teile = kids.filter(e => ['Layout', 'UpdateLayoutTree', 'ParseHTML', 'FunctionCall', 'EvaluateScript', 'Paint', 'TimerFire', 'FireAnimationFrame', 'EventDispatch', 'IntersectionObserverController::computeIntersections', 'PrePaint', 'Layerize', 'v8.compile', 'XHRLoad', 'ResourceReceivedData'].includes(e.name) || e.name.includes('Intersection'))
        .map(e => e.name + (e.args && e.args.data && e.args.data.functionName ? '(' + e.args.data.functionName + ')' : '') + (e.args && e.args.data && e.args.data.type ? '[' + e.args.data.type + ']' : '') + ' ' + Math.round(e.dur / 1000));
      console.log(schrittVon(t.ts) + ': Aufgabe ' + Math.round(t.dur / 1000) + ' ms -> ' + teile.join(', '));
    }
    const fontEv = events.filter(e => /font/i.test(e.name||'')).map(e => schrittVon(e.ts)+' '+e.name+' '+Math.round((e.ts-marken[0][0])/1000)+'ms'+(e.dur?' dur '+Math.round(e.dur/1000):'')+' '+JSON.stringify((e.args&&e.args.data)||{}).slice(0,120));
    console.log(fontEv.slice(0,60).join(String.fromCharCode(10)));
    for (const t of tasks) console.log('Task at '+Math.round((t.ts-marken[0][0])/1000)+'ms dur '+Math.round(t.dur/1000));
    const lay = events.filter(e=>e.name==='Layout'&&e.dur>40000).map(e=>Math.round((e.ts-marken[0][0])/1000)+'ms '+Math.round(e.dur/1000)+' '+JSON.stringify(e.args).slice(0,300));
    console.log(lay.join(String.fromCharCode(10)));
    await ctx.close();
  } finally { await browser.close(); }
})();
