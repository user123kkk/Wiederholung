/* 3.17.28: Eine Bewertung, die die Cloud wegen veralteter Anmeldung ablehnt
   (permission-denied), wird nach dem Erneuern des Ausweises nachgeschickt -
   samt Tagesprotokoll. Vorher war sie verloren (echtes Firebase nimmt eine
   Ablehnung auch lokal zurueck: die Karte kam wieder).
   Nachbau: __FB.fail lehnt ab; getIdToken(true) "erneuert" und hebt das auf.
   node t_abgelehnt.js */
const { start, neueSeite, aktion, GERAETE, tag } = require('./lib');
(async () => {
  const b = await start();
  const heute = tag(0);
  const { p } = await neueSeite(b, GERAETE.handy, { warte: 1500 });
  await aktion(p, 'start-session', null, 900);
  const wort = await p.evaluate(() => document.querySelector('.study-word').textContent);
  const lies = () => p.evaluate(([w, t]) => { const k = [...window.__FB.store.keys()].find(k => k.includes('/karten/') && window.__FB.store.get(k).wort === w);
    const s = window.__FB.store.get(k); return { karte: s.stufe + '/' + s.nextReview, verlauf: JSON.stringify((window.__FB.store.get('users/u1').verlauf || {})[t] || null) }; }, [wort, heute]);
  const vorher = await lies();
  await p.evaluate(() => {
    window.__FB.fail = true;
    const u = window.__FB.user;
    u.getIdToken = erneuern => new Promise(ok => setTimeout(() => { if (erneuern) window.__FB.fail = false; ok('tok'); }, 300));
  });
  await aktion(p, 'reveal', null, 700);
  await aktion(p, 'grade-known', null, 1500);
  const nachher = await lies();
  const banner = await p.evaluate(() => !!document.querySelector('.banner-fehler, .banner'));
  const ok = nachher.karte !== vorher.karte && nachher.karte.split('/')[1] > heute && nachher.verlauf !== 'null';
  console.log((ok ? 'OK  ' : 'FEHL') + ' abgelehnte Bewertung nachgeschickt: ' + vorher.karte + ' -> ' + nachher.karte + ' | Protokoll ' + vorher.verlauf + ' -> ' + nachher.verlauf + ' | Banner danach: ' + banner + (p.fehler.length ? ' | ' + p.fehler.join('|') : ''));
  await b.close();
  process.exit(ok ? 0 : 1);
})();
