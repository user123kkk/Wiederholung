/* A16: echter SDK 10.14.1, Repo-Regeln, Demo-Emulator 8082.
   Auth-Attrappe und blockierter Service Worker: kein PWA-Kaltstartbeleg.
   --gegenprobe stellt die feste Entwurfsquelle 591d03e samt Patch her. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const {start, vollerStore} = require('./lib');
const {pruefeKontrast} = require('./kontrast');
if (process.argv.includes('--gegenprobe')) {
  const dir = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'entwurf-a16-591d03e-'));
  fs.writeFileSync(path.join(dir, 'app.js'), cp.execFileSync('git', ['show', '591d03e:app.js']));
  cp.execFileSync('git', ['apply', '--include=app.js', '-'], {
    cwd: dir, input: cp.execFileSync('git', ['show', '591d03e:plan/sicherung/entwurf-aktuell.patch'])
  });
  const sha = crypto.createHash('sha256').update(fs.readFileSync(path.join(dir, 'app.js'), 'utf8').replace(/\r\n/g, '\n')).digest('hex');
  assert.equal(sha, '44c05375c7511ba420fbabe5b52cea6599ecf7c1ea3e67e77b52428aa30347d9');
  const result = cp.spawnSync(process.execPath, [path.join(__dirname, 'diagnose_verlauf_neustart.js'), '--schutz'], {
    env: {...process.env, PRUEF_APP_FILE: path.join(dir, 'app.js')}, encoding: 'utf8'
  });
  process.stdout.write(result.stdout); process.stderr.write(result.stderr);
  assert.equal(result.status, 1);
  assert.match(result.stdout + result.stderr, /abgelehnte Tagesantwort nach Neustart verloren/);
  console.log('GRUEN feste Gegenprobe erkennt den urspruenglichen Verlust.');
  process.exit(0);
}
const {seite, seed, fertig, rest, wert, ROOT, SDK, cloud, APP_SOURCE} = require('./diagnose_karten_konflikt');
const sha = s => crypto.createHash('sha256').update(s.replace(/\r\n/g, '\n')).digest('hex');
const FALL_NAMEN = ['Ablehnung-Neustart-mehrfach', 'Neustart-vor-Bestaetigung-offline', 'Bestaetigung-verloren',
  'urspruenglicher-Lerntag', 'fremder-Reset', ...['n', 'u', 't', 'r'].map(art => 'Antwortart-' + art),
  'Speicherfehler-keine-Bewertung', 'Undo-Neustart', 'Kontowechsel-Ursprung-erhalten',
  'Offline-Neustart-vor-zwei-Sekunden', 'Absturz-nach-Kartenkopie-vor-Aktivierung',
  'vorbereiteter-Beitrag-Kartenkopie-Epoche-falsch', 'vorbereiteter-Beitrag-ohne-Kartenkopie',
  'beschaedigter-Tagesbeitrag', 'Tageshinweis-Darstellung-und-Entfernen', 'Kontoloeschung-entfernt-Cloudbelege',
  'Nachholen-Altersgrenze-120', 'Nachholen-Altersgrenze-121', 'Cloudbeleg-Antwortart-weicht-ab'];
(async () => {
  const single = process.argv.find(x => x.startsWith('--fall='))?.slice(7);
  assert.ok(single === undefined || FALL_NAMEN.includes(single), 'Unbekannter A16-Prueffall: ' + single);
  assert.equal(new Set(FALL_NAMEN).size, FALL_NAMEN.length, 'Doppelte A16-Fallnamen');
  console.log('app.js SHA256 ' + sha(APP_SOURCE));
  console.log('firestore.rules SHA256 ' + sha(fs.readFileSync(path.join(__dirname, '../../../firestore.rules'), 'utf8')));
  const sources = {};
  for (const name of ['firebase-app.js', 'firebase-firestore.js']) {
    const r = await fetch(SDK + name); assert.ok(r.ok); sources[name] = await r.text();
  }
  const b = await start();
  let passed = 0;
  const gesehen = new Set();
  async function fall(name, test, kontoGeloescht = false) {
    assert.ok(FALL_NAMEN.includes(name), 'A16-Fall fehlt im Katalog: ' + name);
    assert.ok(!gesehen.has(name), 'A16-Fall doppelt definiert: ' + name);
    gesehen.add(name);
    if (single && name !== single) return;
    await seed(); let p = await seite(b, sources); const ctx = p.context();
    const other = await (await rest(ROOT + '/users/u1/karten/k6')).json();
    const change = next => {p = next;};
    try {
      await test(p, ctx, change);
      if (kontoGeloescht) assert.equal((await fetch(ROOT + '/users/u1/karten/k6', {headers:{Authorization:'Bearer owner'}})).status, 404);
      else assert.deepEqual((await (await rest(ROOT + '/users/u1/karten/k6')).json()).fields, other.fields);
      assert.deepEqual(p.fehler, []);
      console.log('GRUEN ' + name + (kontoGeloescht ? '; Kontodaten geloescht' : '; andere Karte k6 unveraendert')); passed++;
    } finally { await ctx.close(); }
  }
  async function restart(p, ctx, change, uid) {
    await p.close(); const next = await seite(b, sources, ctx, uid); change(next); return next;
  }
  async function reject(p, art = 'w') {
    await p.evaluate(art => {
      sessionStorage.setItem('adrabic-token-erneuert-schreiben', '1');
      window.__PRUEF_ABLEHNEN = true;
      if (art === 'w') {window.__PRUEF.starten(); window.__PRUEF.bewerten('known');}
      else window.__PRUEF.zaehle(art);
      window.__PRUEF.flush();
    }, art);
    await fertig(p);
    await p.waitForFunction(() => window.__PRUEF.tagesantworten().some(x => x.status === 'abgelehnt'));
  }
  async function retry(p) {
    await p.evaluate(async () => {window.__PRUEF_ABLEHNEN = false; await window.__PRUEF.tagespruefen();});
    await fertig(p);
  }
  try {
    await fall('Ablehnung-Neustart-mehrfach', async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute()); await reject(p);
      const card = await p.evaluate(() => window.__PRUEF.karte().bewertungsStand);
      p = await restart(p, ctx, change);
      assert.match(await p.evaluate(() => window.__PRUEF.banner()), /Antworten aufbewahrt/);
      assert.equal((await p.evaluate(() => window.__PRUEF.sicherung())).tagesantworten[0].delta, 1);
      assert.equal(await p.evaluate(() => window.__PRUEF.karte().bewertungsStand), card);
      await retry(p); await retry(p); await retry(p);
      assert.equal((await cloud(day)).w, 1);
      assert.deepEqual(await p.evaluate(() => window.__PRUEF.tagesantworten()), []);
    });
    await fall('Neustart-vor-Bestaetigung-offline', async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute());
      await p.evaluate(async () => {await window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB); window.__PRUEF.starten(); window.__PRUEF.bewerten('known'); window.__PRUEF.flush();});
      await p.waitForFunction(() => window.__PRUEF.tagesantworten().some(x => x.status === 'offen'));
      assert.equal((await cloud(day)).w, 0);
      p = await restart(p, ctx, change); await fertig(p); await retry(p);
      assert.equal((await cloud(day)).w, 1); await retry(p); assert.equal((await cloud(day)).w, 1);
    });
    await fall('Bestaetigung-verloren', async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute());
      await p.evaluate(() => {
        const remove = Storage.prototype.removeItem;
        Storage.prototype.removeItem = function(key) {if (key.startsWith('adrabic-tagesantwort-')) throw new Error('Beleg bleibt lokal'); return remove.call(this, key);};
        window.__PRUEF.starten(); window.__PRUEF.bewerten('known'); window.__PRUEF.flush();
      });
      await fertig(p); assert.equal((await cloud(day)).w, 1);
      p = await restart(p, ctx, change); await retry(p); await retry(p);
      assert.equal((await cloud(day)).w, 1);
      assert.deepEqual(await p.evaluate(() => window.__PRUEF.tagesantworten()), []);
    });
    await fall('Cloudbeleg-Antwortart-weicht-ab', async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute());
      await p.evaluate(() => {
        const remove = Storage.prototype.removeItem;
        Storage.prototype.removeItem = function(key) {if (key.startsWith('adrabic-tagesantwort-')) throw new Error('Lokale Bestaetigung kontrolliert behalten'); return remove.call(this, key);};
        window.__PRUEF.zaehle('n'); window.__PRUEF.flush();
      });
      await fertig(p); assert.equal((await cloud(day)).n, 1);
      const saved = await p.evaluate(() => {
        const entries = window.__PRUEF.tagesantworten();
        if (entries.length !== 1) throw new Error('Genau eine lokale Kopie erforderlich');
        const x = entries[0];
        if (x.uid !== 'u1' || x.art !== 'n' || x.delta !== 1) throw new Error('Falsche Beleg-Eingabe');
        x.art = 'u';
        localStorage.setItem('adrabic-tagesantwort-u1/' + x.id, JSON.stringify(x));
        return x;
      });
      const receiptBefore = (await (await rest(ROOT + '/users/u1/tagesantworten/' + saved.id)).json()).fields;
      assert.equal(receiptBefore.art.stringValue, 'n'); assert.equal(saved.art, 'u');
      assert.equal(receiptBefore.tag.stringValue, saved.tag); assert.equal(saved.tag, day);
      assert.equal(receiptBefore.epoche.stringValue, saved.epoche); assert.equal(Number(receiptBefore.delta.integerValue), saved.delta);
      p = await restart(p, ctx, change); await retry(p); await retry(p);
      const copies = await p.evaluate(() => window.__PRUEF.tagesantworten());
      assert.equal(copies.length, 1, 'Abweichende Belegkopie darf nicht entfernt werden');
      assert.equal(copies[0].id, saved.id); assert.equal(copies[0].art, 'u'); assert.equal(copies[0].status, 'veraltet');
      assert.equal((await cloud(day)).n, 1); assert.equal((await cloud(day)).u, 0);
      assert.deepEqual((await (await rest(ROOT + '/users/u1/tagesantworten/' + saved.id)).json()).fields, receiptBefore);
    });
    await fall('urspruenglicher-Lerntag', async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute()); await reject(p);
      p = await restart(p, ctx, change);
      const next = new Date(day + 'T12:00:00'); next.setDate(next.getDate() + 1);
      const tomorrow = next.toISOString().slice(0, 10);
      await p.evaluate(tag => window.__PRUEF.tagSetzen(tag), tomorrow); await retry(p);
      assert.equal((await cloud(day)).w, 1); assert.equal((await cloud(tomorrow)).w, 0);
    });
    for (const age of [120, 121]) await fall('Nachholen-Altersgrenze-' + age, async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute());
      const target = new Date(day + 'T12:00:00');
      target.setDate(target.getDate() - age);
      const oldDay = [target.getFullYear(), String(target.getMonth() + 1).padStart(2, '0'), String(target.getDate()).padStart(2, '0')].join('-');
      assert.equal(Math.round((Date.parse(day + 'T12:00:00Z') - Date.parse(oldDay + 'T12:00:00Z')) / 86400000), age);
      await reject(p, 'n');
      const saved = await p.evaluate(oldDay => {
        const entries = window.__PRUEF.tagesantworten();
        if (entries.length !== 1) throw new Error('Genau ein abgelehnter Beitrag erforderlich');
        const x = entries[0];
        if (x.uid !== 'u1' || x.art !== 'n' || x.delta !== 1 || x.status !== 'abgelehnt') throw new Error('Falsche Eingangsverteilung');
        x.tag = oldDay;
        localStorage.setItem('adrabic-tagesantwort-u1/' + x.id, JSON.stringify(x));
        return x;
      }, oldDay);
      assert.equal(saved.tag, oldDay);
      assert.equal(saved.art, 'n'); assert.equal(saved.delta, 1); assert.equal(saved.status, 'abgelehnt');
      assert.equal((await cloud(day)).n, 0); assert.equal((await cloud(oldDay)).n, 0);
      p = await restart(p, ctx, change); await retry(p); await retry(p);
      const copies = await p.evaluate(() => window.__PRUEF.tagesantworten());
      assert.equal((await cloud(oldDay)).n, age === 120 ? 1 : 0, 'Altersgrenze muss exakt gelten');
      assert.equal((await cloud(day)).n, 0, 'Keine Umbuchung auf heute');
      if (age === 120) assert.deepEqual(copies, []);
      else {
        assert.equal(copies.length, 1); assert.equal(copies[0].id, saved.id);
        assert.equal(copies[0].tag, oldDay); assert.equal(copies[0].status, 'veraltet');
      }
      console.log(JSON.stringify({fall: 'Nachholen-Altersgrenze-' + age, heute: day, ursprung: oldDay, alter: age, server: (await cloud(oldDay)).n}));
    });
    await fall('fremder-Reset', async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute()); await reject(p);
      const c = await seite(b, sources);
      try {
        await c.evaluate(() => window.__PRUEF_SDK.updateDoc(window.__PRUEF_SDK.doc(window.__PRUEF_DB, 'users/u1'), {verlauf: {}, verlaufEpoche: 'fremder-reset'}));
        await fertig(c);
      } finally {await c.context().close();}
      p = await restart(p, ctx, change); await retry(p); await retry(p);
      assert.equal((await cloud(day)).w, 0);
      assert.equal((await p.evaluate(() => window.__PRUEF.tagesantworten()))[0].status, 'veraltet');
      assert.match(await p.evaluate(() => window.__PRUEF.banner()), /früheren Aufzeichnung/);
    });
    for (const art of ['n', 'u', 't', 'r']) await fall('Antwortart-' + art, async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute()); await reject(p, art);
      p = await restart(p, ctx, change); await retry(p); await retry(p);
      const data = await (await rest(ROOT + '/users/u1')).json();
      assert.equal(Number(data.fields.verlauf.mapValue.fields[day].mapValue.fields[art].integerValue), 1);
    });
    await fall('Speicherfehler-keine-Bewertung', async p => {
      const before = await p.evaluate(() => window.__PRUEF.karte());
      await p.evaluate(() => {
        const set = Storage.prototype.setItem;
        window.__A16_SET = set;
        Storage.prototype.setItem = function(key, val) {if (key.startsWith('adrabic-tagesantwort-')) throw new Error('voll'); return set.call(this, key, val);};
        window.__PRUEF.starten(); window.__PRUEF.bewerten('known');
      });
      await fertig(p); assert.deepEqual(await p.evaluate(() => window.__PRUEF.karte()), before);
      assert.equal((await cloud(await p.evaluate(() => window.__PRUEF.heute()))).w, 0);
      await p.evaluate(() => {Storage.prototype.setItem = window.__A16_SET;}); await retry(p);
      assert.deepEqual(await p.evaluate(() => window.__PRUEF.tagesantworten()), []);
    });
    await fall('Undo-Neustart', async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute());
      await p.evaluate(() => {window.__PRUEF.starten(); window.__PRUEF.bewerten('known'); window.__PRUEF.flush();});
      await fertig(p); await p.waitForFunction(() => window.__PRUEF.aufbewahrt().length === 0);
      assert.equal((await cloud(day)).w, 1);
      await p.evaluate(() => {sessionStorage.setItem('adrabic-token-erneuert-schreiben', '1'); window.__PRUEF_ABLEHNEN = true; window.__PRUEF.undo();});
      await fertig(p); await p.waitForFunction(() => window.__PRUEF.tagesantworten().some(x => x.status === 'abgelehnt' && x.delta === -1));
      p = await restart(p, ctx, change); await retry(p); await retry(p); assert.equal((await cloud(day)).w, 0);
    });
    await fall('Kontowechsel-Ursprung-erhalten', async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute()); await reject(p);
      const store = vollerStore();
      const writes = Object.entries(store).map(([k, v]) => ({update: {name: ROOT.replace('http://127.0.0.1:8082/v1/', '') + '/' + k.replace('users/u1', 'users/u2'), fields: wert(k === 'users/u1' ? {...v, verlauf: {}, streak: {sockel: 0, sockelBis: '2000-01-01'}} : v).mapValue.fields}}));
      await rest(ROOT + ':commit', {method: 'POST', body: JSON.stringify({writes})});
      p = await restart(p, ctx, change, 'u2');
      assert.deepEqual(await p.evaluate(() => window.__PRUEF.tagesantworten()), []);
      await retry(p); assert.equal((await cloud(day)).w, 0);
      const data = await (await rest(ROOT + '/users/u2')).json(); assert.deepEqual(data.fields.verlauf.mapValue.fields || {}, {});
      p = await restart(p, ctx, change, 'u1'); await retry(p); assert.equal((await cloud(day)).w, 1);
    });
    await fall('Offline-Neustart-vor-zwei-Sekunden', async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute());
      // Harte Beendigung vor SDK-Uebergabe: beim regulaeren Schliessen
      // wuerde visibilitychange noch flushen und einen anderen Fall erzeugen.
      await p.evaluate(async () => {await window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB);window.__PRUEF.zaehle('u');window.__PRUEF.vorVersandStoppen();});
      assert.equal((await p.evaluate(() => window.__PRUEF.tagesantworten()))[0].status, 'bereit');
      await ctx.addInitScript(() => {window.__PRUEF_START_OFFLINE=true;});
      p = await restart(p, ctx, change);
      assert.equal((await p.evaluate(() => window.__PRUEF.verlauf()))[day].u, 1);
      assert.match(await p.evaluate(() => window.__PRUEF.banner()), /Antworten aufbewahrt/);
      await p.evaluate(() => window.__PRUEF_SDK.enableNetwork(window.__PRUEF_DB));await retry(p);
      assert.equal((await cloud(day)).u, 1);
    });
    for (const mismatch of [false, true]) await fall(mismatch ? 'vorbereiteter-Beitrag-Kartenkopie-Epoche-falsch' : 'Absturz-nach-Kartenkopie-vor-Aktivierung', async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute());
      await p.evaluate(async () => {
        await window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB);
        window.__PRUEF.tagesversandSperren();
        window.__PRUEF.starten(); window.__PRUEF.bewerten('known');
        window.__PRUEF.vorVersandStoppen();
      });
      const staged = await p.evaluate(mismatch => {
        const key = Object.keys(localStorage).find(k => k.startsWith('adrabic-bewertung-u1/'));
        if (!key) throw new Error('Dauerhafte Kartenkopie fehlt');
        const card = JSON.parse(localStorage.getItem(key));
        const contributionKey = 'adrabic-tagesantwort-u1/' + card.tagesantwort.id;
        const contribution = JSON.parse(localStorage.getItem(contributionKey));
        // Kontrollierter frueherer Speicherstand: echte Kartenkopie bleibt,
        // Tageskopie steht noch vor ihrer Aktivierung. Kein echter Prozesskill.
        contribution.status = 'vorbereitet';
        if (mismatch) contribution.epoche = 'abweichende-kopie';
        localStorage.setItem(contributionKey, JSON.stringify(contribution));
        return {card, contribution};
      }, mismatch);
      assert.equal(staged.card.status, 'offen');
      assert.equal(staged.card.tagesantwort.status, 'vorbereitet');
      for (const field of ['id', 'uid', 'tag', 'art', 'delta'])
        assert.equal(staged.card.tagesantwort[field], staged.contribution[field]);
      if (mismatch) assert.notEqual(staged.card.tagesantwort.epoche, staged.contribution.epoche);
      else assert.equal(staged.card.tagesantwort.epoche, staged.contribution.epoche);
      assert.equal(staged.contribution.tag, day);
      assert.equal(staged.contribution.delta, 1);
      assert.equal((await cloud(day)).w, 0);
      const cached = await p.evaluate(async () => {
        const sdk = window.__PRUEF_SDK;
        const snap = await sdk.getDocFromCache(sdk.doc(window.__PRUEF_DB, 'users/u1/karten/k4'));
        return {id: snap.data()?.bewertungsStand, pending: snap.metadata.hasPendingWrites};
      });
      assert.equal(cached.id, staged.card.id);
      assert.equal(cached.pending, true);
      p = await restart(p, ctx, change); await fertig(p); await retry(p); await retry(p);
      assert.equal((await cloud(day)).w, mismatch ? 0 : 1);
      if (mismatch) {
        const copies = await p.evaluate(() => window.__PRUEF.tagesantworten());
        assert.equal(copies.length, 1);
        assert.equal(copies[0].status, 'vorbereitet');
        assert.equal(copies[0].epoche, 'abweichende-kopie');
      } else assert.deepEqual(await p.evaluate(() => window.__PRUEF.tagesantworten()), []);
      const card = await (await rest(ROOT + '/users/u1/karten/k4')).json();
      assert.equal(card.fields.bewertungsStand.stringValue, staged.card.id);
    });
    await fall('vorbereiteter-Beitrag-ohne-Kartenkopie', async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute());
      await p.evaluate(tag => localStorage.setItem('adrabic-tagesantwort-u1/nicht-gebucht', JSON.stringify({id:'nicht-gebucht',uid:'u1',epoche:'',tag,art:'w',delta:1,status:'vorbereitet'})), day);
      p = await restart(p, ctx, change); await retry(p);
      assert.equal((await cloud(day)).w, 0);
      assert.equal((await p.evaluate(() => window.__PRUEF.sicherung())).tagesantworten[0].status, 'vorbereitet');
    });
    await fall('beschaedigter-Tagesbeitrag', async (p, ctx, change) => {
      const day = await p.evaluate(() => window.__PRUEF.heute());
      await p.evaluate(() => localStorage.setItem('adrabic-tagesantwort-u1/kaputt', '{ungueltig'));
      p = await restart(p, ctx, change); await retry(p);
      assert.match(await p.evaluate(() => window.__PRUEF.banner()), /Gerätespeicher/);
      assert.equal((await p.evaluate(() => window.__PRUEF.sicherung())).beschaedigteKopien[0].inhalt, '{ungueltig');
      await p.evaluate(() => {window.__PRUEF.starten();window.__PRUEF.bewerten('known');}); await fertig(p);
      assert.equal((await cloud(day)).w, 0);
    });
    await fall('Tageshinweis-Darstellung-und-Entfernen', async p => {
      const day = await p.evaluate(() => window.__PRUEF.heute());await reject(p);
      const saved = (await p.evaluate(() => window.__PRUEF.tagesantworten()))[0];
      await p.evaluate(() => window.__PRUEF_SDK.updateDoc(window.__PRUEF_SDK.doc(window.__PRUEF_DB,'users/u1'), {verlauf:{},verlaufEpoche:'hinweis-reset'}));
      await fertig(p);await retry(p);
      if(await p.locator('[data-action="dlg-ok"]').count())await p.locator('[data-action="dlg-ok"]').click();
      await p.evaluate(() => {window.__PRUEF.starten();window.__PRUEF.neuZeichnen();});
      await p.emulateMedia({reducedMotion:'reduce'});
      for(const size of [{width:390,height:844},{width:320,height:740},{width:768,height:1024},{width:1024,height:768}]) {
        await p.setViewportSize(size);
        await p.waitForTimeout(250); // Viewport/CSS-Einheiten nach Resize gesetzt.
        for(const theme of ['hell','dunkel']) {
          await p.evaluate(t=>document.documentElement.setAttribute('data-thema',t),theme);
          const fits = await p.evaluate(() => {const r=document.querySelector('.banner-fehler').getBoundingClientRect(),knopf=document.querySelector('.btn-known').getBoundingClientRect();return {horizontal:r.left>=-1&&r.right<=innerWidth+1&&document.documentElement.scrollWidth<=innerWidth+1,seitenhoehe:document.documentElement.scrollHeight,hoehe:innerHeight,knopfUnten:knopf.bottom};});
          assert.ok(fits.horizontal && fits.seitenhoehe<=fits.hoehe+1 && fits.knopfUnten<=fits.hoehe+1, 'Tageshinweis passt '+size.width+' '+theme+' '+JSON.stringify(fits));
          assert.deepEqual(await pruefeKontrast(p,'Tageshinweis '+size.width+' '+theme),[]);
        }
      }
      await p.setViewportSize({width:390,height:844});
      await p.screenshot({path:path.join(__dirname,'../../sicherung/tests/a16-tageshinweis.png'),fullPage:true});
      const ready = p.waitForEvent('download');await p.locator('[data-action="bewertung-sichern"]').click();
      const backup = JSON.parse(fs.readFileSync(await (await ready).path(),'utf8'));
      assert.equal(backup.tagesantworten[0].id,saved.id);assert.equal(backup.tagesantworten[0].delta,1);
      await p.locator('[data-action="bewertung-verwerfen"]').click();await p.locator('[data-action="dlg-cancel"]').click();
      assert.equal((await p.evaluate(() => window.__PRUEF.tagesantworten())).length,1);
      await p.locator('[data-action="bewertung-verwerfen"]').click();await p.locator('[data-action="dlg-ok"]').click();
      assert.deepEqual(await p.evaluate(() => window.__PRUEF.tagesantworten()),[]);
      assert.equal((await cloud(day)).w,0);
    });
    await fall('Kontoloeschung-entfernt-Cloudbelege', async p => {
      await p.evaluate(() => {window.__PRUEF.zaehle('u');window.__PRUEF.flush();}); await fertig(p);
      const prior = await (await rest(ROOT + '/users/u1/tagesantworten')).json();
      assert.equal(prior.documents.length, 1);
      await p.evaluate(() => window.__PRUEF.kontoLoeschen());
      assert.equal((await fetch(ROOT + '/users/u1', {headers:{Authorization:'Bearer owner'}})).status, 404);
      const after = await (await rest(ROOT + '/users/u1/tagesantworten')).json();
      assert.equal((after.documents || []).length, 0);
    }, true);
    assert.equal(gesehen.size, FALL_NAMEN.length, 'A16-Fallkatalog nicht vollstaendig definiert');
    assert.equal(passed, single === undefined ? FALL_NAMEN.length : 1, 'A16-Lauf hat nicht die geforderte Fallzahl');
    console.log(passed + ' A16 SDK-Faelle gruen. Keine Gesamtabnahme oder iPhone-Abnahme.');
  } finally {await b.close();}
})().catch(e => {console.error(e); process.exitCode = 1;});
