process.env.PRUEF_BILDER = __dirname + '/bilder';
const { start, neueSeite, aktion, foto, GERAETE, vollerStore, tag } = require('/home/user/Wiederholung/plan/werkzeuge/pruefstand/lib.js');
(async () => {
  const b = await start();
  // 1: h1 auf Lernen + Farbe neu-Segment dunkel
  {
    const { p } = await neueSeite(b, GERAETE.handy, {});
    console.log('H1 Lernen:', await p.evaluate(() => [...document.querySelectorAll('h1')].map(h => h.className + ' | ' + h.textContent.trim().slice(0, 40) + ' | sichtbar ' + (h.getBoundingClientRect().height > 0))));
    await aktion(p, 'tab-fortschritt', null, 1500);
    console.log('Segmente:', await p.evaluate(() => {
      const bar = document.querySelector('.stat-bar'); const card = bar.closest('.stat-block');
      return { card: getComputedStyle(card).backgroundColor, barBg: getComputedStyle(bar).backgroundColor, segs: [...bar.children].map(s => getComputedStyle(s).backgroundColor), kal0: getComputedStyle(document.querySelector('.kal-tag.s0') || document.body).backgroundColor, kalCols: getComputedStyle(document.querySelector('.kal')).gridTemplateColumns.split(' ').length };
    }));
    // Lektionen-Seite offen lassen, dann Bereich wechseln
    await p.context().close();
    const { p: q } = await neueSeite(b, GERAETE.desktop, {});
    await aktion(q, 'tab-fortschritt', null, 1200);
    await aktion(q, 'fort-seite', 'lektionen', 700);
        await q.evaluate(() => { const x = [...document.querySelectorAll('[data-action="select-bereich"]')].find(e => e.dataset.bid === 'b2'); x && x.click(); });
    const p2 = q;
    await p2.waitForTimeout(900);
    console.log('Nach Bereichswechsel auf Lektionen-Seite:', await p2.evaluate(() => ({ seite: document.querySelector('#app').innerText.replace(/\s+/g, ' ').slice(0, 200) })));
    await foto(p2, 'C-lektionen-nach-wechsel', true);
    await p2.context().close();
  }
  // 2: Ring mit zwei Bereichen: heute in b1 gelernt, b2 hat Faelliges
  {
    const st = vollerStore();
    st['users/u1'].verlauf[tag(0)] = { w: 30, n: 0 };
    st['users/u1/karten/x1'] = { wort: 'سَمَاءٌ', uebersetzung: 'Himmel', extra: '', stufe: 2, nextReview: tag(0), ersteBewertung: tag(-5), rueckfaelle: 0, quelleId: null, maxStufe: 2, order: 0, bereichId: 'b2' };
    st['users/u1/karten/x2'] = { wort: 'أَرْضٌ', uebersetzung: 'Erde', extra: '', stufe: 2, nextReview: tag(0), ersteBewertung: tag(-5), rueckfaelle: 0, quelleId: null, maxStufe: 2, order: 1, bereichId: 'b2' };
    const { p } = await neueSeite(b, GERAETE.handy, { store: st });
    await aktion(p, 'bereich-sheet-auf', null, 600);
    await p.evaluate(() => { const x = [...document.querySelectorAll('[data-action="select-bereich"]')].find(e => e.dataset.bid === 'b2'); x && x.click(); });
    await p.waitForTimeout(1000);
    console.log('Ring b2:', await p.evaluate(() => ({ t: document.querySelector('.stapel').innerText.replace(/\s+/g, ' '), ziel: getComputedStyle(document.querySelector('.ring__fuellung')).getPropertyValue('--ziel') })));
    await foto(p, 'C-ring-b2');
    await p.context().close();
  }
  // 3: diese Woche leer, Vorwoche voll -> "0 Antworten ... ↓ 100 %"
  {
    const st = vollerStore();
    const v = {}; for (let i = 8; i <= 13; i++) v[tag(-i)] = { w: 10, n: 1 };
    st['users/u1'].verlauf = v; st['users/u1'].streak = { count: 0, beste: 6, sockel: 0, sockelBis: tag(-60) };
    const { p } = await neueSeite(b, GERAETE.handy, { store: st });
    console.log('Lernen nach Pause:', await p.evaluate(() => document.querySelector('#app').innerText.replace(/\s+/g, ' ').slice(0, 400)));
    await aktion(p, 'tab-fortschritt', null, 1500);
    console.log('Woche leer:', await p.evaluate(() => document.querySelector('.stat-block').innerText.replace(/\s+/g, ' ')));
    await foto(p, 'C-woche-leer');
    await p.context().close();
  }
  // 4: Serie-Hinweis und Rueckblick; Meilenstein weg
  {
    const st = vollerStore();
    st['users/u1'].streak = { count: 0, beste: 9, sockel: 0, sockelBis: tag(-60) };
    const v = {}; for (let i = 2; i <= 8; i++) v[tag(-i)] = { w: 5, n: 1 };
    st['users/u1'].verlauf = v;
    const { p } = await neueSeite(b, GERAETE.handy, { store: st, ls: { 'adrabic-hinweise': JSON.stringify({ meilenstein: 25 }) } });
    console.log('Hinweis:', await p.evaluate(() => { const h = document.querySelector('.hinweis'); return h ? h.className + ' | ' + h.innerText.replace(/\s+/g, ' ') : 'kein'; }), '| Serie', await p.evaluate(() => document.querySelector('.serie-karte').innerText.replace(/\s+/g, ' ')));
    await p.context().close();
  }
  // 5: Einstellungen Erinnerung: Zeit tippen, dann render durch Snapshot -> Wert?
  {
    const { p } = await neueSeite(b, GERAETE.handy, {});
    await aktion(p, 'einstellungen', null, 800);
    await aktion(p, 'erinnerung-auf', null, 700);
    await p.fill('#erinnerung-zeit', '06:15');
    await p.evaluate(() => window.__FB && (async () => {})());
    // Fremdes Neuzeichnen ausloesen: Thema in der Cloud aendern -> Snapshot
    await p.evaluate(() => { const S = window.__FB; const d = S.store.get('users/u1'); d.settings.arabGroesse = 'gross'; S.store.set('users/u1', d); for (const l of S.listeners) l.cb(l.ref.col ? { docs: [], forEach(){}, size:0, empty:true, metadata:{} } : { id:'u1', exists:()=>true, data:()=>JSON.parse(JSON.stringify(d)), metadata:{hasPendingWrites:false, fromCache:false} }); });
    await p.waitForTimeout(600);
    console.log('Zeitfeld nach Neuzeichnen:', await p.evaluate(() => { const f = document.getElementById('erinnerung-zeit'); return f ? f.value : 'weg'; }));
    await p.context().close();
  }
  await b.close();
})();
