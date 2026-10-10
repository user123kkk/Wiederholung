/* Schutzabnahme mit echtem SDK, zwei getrennten Browserprofilen und Repo-Regeln.
   Die historische Diagnose bleibt unveraendert rot gegen 7142b93. */
const assert=require('node:assert/strict');
const {start}=require('./lib');
const {pruefeKontrast}=require('./kontrast');
const {seite,seed,fertig,rest,ROOT,SDK,APP_SOURCE,cloud}=require('./diagnose_karten_konflikt');
async function server(id='k4') {
  const r=await rest(ROOT+'/users/u1/karten/'+id),d=await r.json();
  return Object.fromEntries(Object.entries(d.fields).map(([k,v])=>[k,v.stringValue??(v.integerValue!==undefined?Number(v.integerValue):null)]));
}
(async()=>{
  const fs=require('node:fs'),path=require('node:path');
  const sha=s=>require('node:crypto').createHash('sha256').update(s.replace(/\r\n/g,'\n')).digest('hex');
  console.log('app.js SHA256 '+sha(APP_SOURCE));
  console.log('firestore.rules SHA256 '+sha(fs.readFileSync(path.join(__dirname,'../../../firestore.rules'),'utf8')));
  const sources={};for(const name of ['firebase-app.js','firebase-firestore.js']){
    const r=await fetch(SDK+name);assert.ok(r.ok);sources[name]=await r.text();
  }
  const b=await start();
  const einzel=process.argv.find(x=>x.startsWith('--fall='))?.slice(7);
  async function fall(name,test){
    if(einzel && name!==einzel)return;
    await seed();const a=await seite(b,sources),c=await seite(b,sources);
    const unberuehrt=await server('k6');
    try {await test(a,c);assert.deepEqual(await server('k6'),unberuehrt);assert.deepEqual(a.fehler,[]);assert.deepEqual(c.fehler,[]);console.log('GRUEN '+name);}
    finally{await a.context().close();await c.context().close();}
  }
  async function grade(p,id='k4',kind='known'){
    await p.evaluate(([id,kind])=>{window.__PRUEF.starten(id);window.__PRUEF.bewerten(kind);},[id,kind]);await fertig(p);
    await p.waitForFunction(()=>window.__PRUEF.aufbewahrt().length===0);
  }
  try{
    await fall('normale Bewertung und eigenes Undo',async(a)=>{
      const before=await server();await grade(a);const rated=await server();assert.notEqual(rated.bewertungsStand,undefined);
      await a.evaluate(()=>window.__PRUEF.undo());await fertig(a);const after=await server();
      for(const k of ['stufe','nextReview','ersteBewertung','rueckfaelle','maxStufe'])assert.equal(after[k],before[k]);
      assert.notEqual(after.bewertungsStand,rated.bewertungsStand);
    });
    await fall('altes Undo schuetzt fremde Bewertung und Tageszaehler',async(a,c)=>{
      await grade(a);await c.waitForFunction(()=>!!window.__PRUEF.karte().bewertungsStand);
      await grade(c,'k4','unknown');const newer=await server();
      await a.waitForFunction(id=>window.__PRUEF.karte().bewertungsStand===id,newer.bewertungsStand);
      const counts=await a.evaluate(()=>window.__PRUEF.verlauf());await a.evaluate(()=>window.__PRUEF.undo());await fertig(a);
      assert.deepEqual(await server(),newer);assert.deepEqual(await a.evaluate(()=>window.__PRUEF.verlauf()),counts);
      assert.match(await a.locator('.dlg').innerText(),/inzwischen geändert/);
    });
    await fall('Gesehen-Undo schuetzt fremde Bewertung',async(a,c)=>{
      await a.evaluate(()=>window.__PRUEF.gesehen('k0'));await fertig(a);
      await c.waitForFunction(()=>!!window.__PRUEF.karte('k0').bewertungsStand);await grade(c,'k0');const newer=await server('k0');
      await a.waitForFunction(id=>window.__PRUEF.karte('k0').bewertungsStand===id,newer.bewertungsStand);
      await a.evaluate(()=>window.__PRUEF.gesehenZurueck());await fertig(a);assert.deepEqual(await server('k0'),newer);
    });
    for(const gesehen of [false,true])await fall('Offline-'+(gesehen?'Gesehen':'Bewertung')+' bleibt nach Ablehnung und Neustart erhalten',async(a,c)=>{
      const id=gesehen?'k0':'k4';await a.evaluate(()=>window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB));
      await a.evaluate(([id,gesehen])=>{if(gesehen)window.__PRUEF.gesehen(id);else{window.__PRUEF.starten(id);window.__PRUEF.bewerten('unknown');}},[id,gesehen]);
      const pending=await a.evaluate(()=>window.__PRUEF.aufbewahrt());assert.equal(pending.length,1);
      await grade(c,id);const newer=await server(id);
      await a.evaluate(()=>window.__PRUEF_SDK.enableNetwork(window.__PRUEF_DB));await fertig(a);
      await a.waitForFunction(()=>window.__PRUEF.aufbewahrt()[0]?.status==='abgelehnt');assert.deepEqual(await server(id),newer);
      assert.equal(await a.evaluate(()=>window.__PRUEF.aufbewahrt()[0].id),pending[0].id);
      if(!gesehen){
        await a.screenshot({path:path.join(require('node:os').tmpdir(),'adrabic-karten-fix/konflikt-in-runde.png'),fullPage:true});
        const lage=await a.evaluate(()=>{const el=document.querySelector('[data-action="reveal"]');const r=el?.getBoundingClientRect();return {hoehe:innerHeight,antwort:r?{top:r.top,bottom:r.bottom}:null,seitenhoehe:document.documentElement.scrollHeight};});
        console.log('MESSUNG Konflikthinweis in laufender Runde '+JSON.stringify(lage));
      }
      const ctx=a.context();await a.close();const reload=await seite(b,sources,ctx);
      try{assert.equal(await reload.evaluate(()=>window.__PRUEF.aufbewahrt()[0].id),pending[0].id);
        await reload.evaluate(()=>window.__PRUEF.pruefen());await fertig(reload);
        assert.equal(await reload.evaluate(()=>window.__PRUEF.aufbewahrt()[0].status),'konflikt');assert.deepEqual(await server(id),newer);
        assert.match(await reload.locator('[data-action="bewertung-sichern"]').innerText(),/sichern/);assert.deepEqual(reload.fehler,[]);
        if(!gesehen){
          await reload.emulateMedia({reducedMotion:'reduce'});
          for(const size of [{width:390,height:844},{width:320,height:740},{width:768,height:1024},{width:1024,height:768}]){
            await reload.setViewportSize(size);
            for(const thema of ['hell','dunkel']){
              await reload.evaluate(t=>document.documentElement.setAttribute('data-thema',t),thema);
              const fits=await reload.evaluate(()=>{const button=document.querySelector('[data-action="bewertung-sichern"]'),box=button.closest('.banner-fehler').getBoundingClientRect();return box.left>=-1&&box.right<=innerWidth+1&&document.documentElement.scrollWidth<=innerWidth+1;});
              assert.ok(fits,'Konflikthinweis passt '+size.width+' '+thema);
              assert.deepEqual(await pruefeKontrast(reload,'Konflikthinweis '+size.width+' '+thema),[]);
            }
          }
          const ready=reload.waitForEvent('download');await reload.locator('[data-action="bewertung-sichern"]').click();const download=await ready;
          const backup=JSON.parse(fs.readFileSync(await download.path(),'utf8'));assert.equal(backup.antworten[0].id,pending[0].id);
          assert.deepEqual(backup.antworten[0].fields,pending[0].fields);assert.deepEqual(await server(id),newer);
          await reload.locator('[data-action="bewertung-verwerfen"]').click();await reload.locator('[data-action="dlg-cancel"]').click();
          assert.equal(await reload.evaluate(()=>window.__PRUEF.aufbewahrt().length),1);
          await reload.locator('[data-action="bewertung-verwerfen"]').click();await reload.locator('[data-action="dlg-ok"]').click();
          await reload.waitForFunction(()=>window.__PRUEF.aufbewahrt().length===0);assert.deepEqual(await server(id),newer);
          assert.equal(await reload.evaluate(id=>localStorage.getItem('adrabic-bewertung-u1/'+id),pending[0].id),null);
          console.log('GRUEN Konflikthinweis: vier Breiten, hell/dunkel, reduzierte Bewegung; Download vollstaendig');
          console.log('GRUEN Antworten entfernen: Abbruch bewahrt Kopie; bestaetigt entfernt nur lokale Antwort');
        }
      }finally{await reload.close();}
    });
    await fall('zwei Offline-Geraete: erste Antwort bleibt, zweite aufbewahrt',async(a,c)=>{
      for(const p of [a,c])await p.evaluate(()=>window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB));
      await a.evaluate(()=>{window.__PRUEF.starten();window.__PRUEF.bewerten('known');});
      await c.evaluate(()=>{window.__PRUEF.starten();window.__PRUEF.bewerten('unknown');});
      await c.evaluate(()=>window.__PRUEF_SDK.enableNetwork(window.__PRUEF_DB));await fertig(c);const first=await server();
      await a.evaluate(()=>window.__PRUEF_SDK.enableNetwork(window.__PRUEF_DB));await fertig(a);
      await a.waitForFunction(()=>window.__PRUEF.aufbewahrt()[0]?.status==='abgelehnt');assert.deepEqual(await server(),first);
    });
    await fall('gleiche Endwerte mit fremder Kennung blockieren Undo',async(a,c)=>{
      await grade(a);const rated=await server();await c.waitForFunction(id=>window.__PRUEF.karte().bewertungsStand===id,rated.bewertungsStand);
      await c.evaluate(rated=>window.__PRUEF_SDK.updateDoc(window.__PRUEF_SDK.doc(window.__PRUEF_DB,'users/u1/karten/k4'),{bewertungsStand:'gleiche-werte-fremde-aktion',bewertungsBasis:rated.bewertungsStand}),rated);
      const newer=await server();await a.waitForFunction(()=>window.__PRUEF.karte().bewertungsStand==='gleiche-werte-fremde-aktion');
      await a.evaluate(()=>window.__PRUEF.undo());await fertig(a);assert.deepEqual(await server(),newer);
    });
    await fall('Offline eigenes Undo bleibt erlaubt',async(a)=>{
      const before=await server();await a.evaluate(()=>window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB));
      await a.evaluate(()=>{window.__PRUEF.starten();window.__PRUEF.bewerten('known');window.__PRUEF.undo();});
      assert.equal(await a.evaluate(()=>window.__PRUEF.aufbewahrt().length),2);
      await a.evaluate(()=>window.__PRUEF_SDK.enableNetwork(window.__PRUEF_DB));await fertig(a);
      await a.waitForFunction(()=>window.__PRUEF.aufbewahrt().length===0);const after=await server();
      for(const k of ['stufe','nextReview','ersteBewertung','rueckfaelle','maxStufe'])assert.equal(after[k],before[k]);
    });
    await fall('fremde Loeschung wird nicht wieder angelegt; Antwort bleibt',async(a,c)=>{
      await a.evaluate(()=>window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB));await a.evaluate(()=>{window.__PRUEF.starten();window.__PRUEF.bewerten('known');});
      await c.evaluate(()=>window.__PRUEF_SDK.deleteDoc(window.__PRUEF_SDK.doc(window.__PRUEF_DB,'users/u1/karten/k4')));
      await a.evaluate(()=>window.__PRUEF_SDK.enableNetwork(window.__PRUEF_DB));await fertig(a);
      await a.waitForFunction(()=>window.__PRUEF.aufbewahrt()[0]?.status==='abgelehnt');await a.evaluate(()=>window.__PRUEF.pruefen());
      assert.equal(await a.evaluate(()=>window.__PRUEF.aufbewahrt()[0].status),'geloescht');
      const response=await fetch(ROOT+'/users/u1/karten/k4',{headers:{Authorization:'Bearer owner'}});assert.equal(response.status,404);
    });
    await fall('voller Geraetespeicher bucht keine Antwort',async(a)=>{
      await fertig(a);
      const before=await server(),counts=await a.evaluate(()=>window.__PRUEF.verlauf());
      await a.evaluate(()=>{const original=Storage.prototype.setItem;window.__PRUEF_STORAGE_ORIGINAL=original;Storage.prototype.setItem=function(k,v){if(k.startsWith('adrabic-bewertung-'))throw new DOMException('voll','QuotaExceededError');return original.call(this,k,v);};window.__PRUEF.starten();window.__PRUEF.bewerten('known');});
      await fertig(a);assert.deepEqual(await server(),before);assert.deepEqual(await a.evaluate(()=>window.__PRUEF.verlauf()),counts);
      assert.equal(await a.evaluate(()=>window.__PRUEF.karte().stufe),before.stufe);
      assert.match(await a.locator('.banner-fehler').innerText(),/Gerätespeicher/);
      assert.equal(await a.evaluate(()=>window.__PRUEF.aufbewahrt().length),0);
      await a.evaluate(()=>{Storage.prototype.setItem=window.__PRUEF_STORAGE_ORIGINAL;return window.__PRUEF.pruefen();});await fertig(a);
      assert.deepEqual(await server(),before);assert.deepEqual(await a.evaluate(()=>window.__PRUEF.verlauf()),counts);
      await grade(a);assert.equal((await server()).stufe,before.stufe+1);
    });
    await fall('echte Regeln-Ablehnung nachholen ohne doppelte Tagesantwort',async(a)=>{
      await a.evaluate(()=>{window.__PRUEF_KARTE_ABLEHNEN=true;window.__PRUEF.starten();window.__PRUEF.bewerten('known');});await fertig(a);
      await a.waitForFunction(()=>window.__PRUEF.aufbewahrt()[0]?.status==='abgelehnt');
      const saved=await a.evaluate(()=>window.__PRUEF.aufbewahrt()[0]),counts=await a.evaluate(()=>window.__PRUEF.verlauf());
      const heute=await a.evaluate(()=>window.__PRUEF.heute());await a.evaluate(()=>window.__PRUEF.flush());await fertig(a);
      const cloudVor=await cloud(heute);assert.equal(cloudVor.w,1);
      await a.evaluate(()=>{window.__PRUEF_KARTE_ABLEHNEN=false;return window.__PRUEF.pruefen();});await fertig(a);
      await a.waitForFunction(()=>window.__PRUEF.aufbewahrt().length===0);
      assert.equal((await server()).bewertungsStand,saved.id);assert.deepEqual(await a.evaluate(()=>window.__PRUEF.verlauf()),counts);
      await a.evaluate(()=>window.__PRUEF.pruefen());await fertig(a);assert.equal((await server()).bewertungsStand,saved.id);
      await a.evaluate(()=>window.__PRUEF.flush());await fertig(a);assert.deepEqual(await cloud(heute),cloudVor);
    });
    for(const gesehen of [false,true])await fall((gesehen?'Gesehen':'Bewertung')+': Speicherfehler erhaelt vorheriges Rueckgaengig',async(a)=>{
      const id=gesehen?'k0':'k4',zweite=gesehen?'k1':'k5',before=await server(id),other=await server(zweite);
      if(gesehen){await a.evaluate(()=>window.__PRUEF.gesehen('k0'));await fertig(a);}else await grade(a);
      const counts=await a.evaluate(()=>window.__PRUEF.verlauf());
      await a.evaluate(gesehen=>{const original=Storage.prototype.setItem;window.__PRUEF_STORAGE_ORIGINAL=original;Storage.prototype.setItem=function(k,v){if(k.startsWith('adrabic-bewertung-'))throw new DOMException('voll','QuotaExceededError');return original.call(this,k,v);};if(gesehen)window.__PRUEF.gesehen('k1');else window.__PRUEF.bewerten('known');},gesehen);
      assert.deepEqual(await server(zweite),other);assert.deepEqual(await a.evaluate(()=>window.__PRUEF.verlauf()),counts);
      await a.evaluate(()=>{Storage.prototype.setItem=window.__PRUEF_STORAGE_ORIGINAL;return window.__PRUEF.pruefen();});await fertig(a);
      await a.evaluate(gesehen=>gesehen?window.__PRUEF.gesehenZurueck():window.__PRUEF.undo(),gesehen);await fertig(a);
      const after=await server(id);for(const k of ['stufe','nextReview','ersteBewertung','rueckfaelle','maxStufe'])assert.equal(after[k],before[k]);
      assert.deepEqual(await server(zweite),other);
    });
    for(const defekt of [false,true])await fall(defekt?'beschaedigte Kopie blockiert sicher; weitere Antwort bleibt exportierbar':'Neustart offline: ungepruefte Antwort nicht entfernbar',async(a)=>{
      await fertig(a);const before=await server();
      await a.evaluate(defekt=>{if(defekt)localStorage.setItem('adrabic-bewertung-u1/kaputt','{ungueltig');return window.__PRUEF_SDK.disableNetwork(window.__PRUEF_DB);},defekt);
      await a.evaluate(()=>{window.__PRUEF.starten();window.__PRUEF.bewerten('known');});const saved=await a.evaluate(()=>window.__PRUEF.aufbewahrt()[0]);
      const ctx=a.context();await a.close();await ctx.addInitScript(()=>{window.__PRUEF_START_OFFLINE=true;});const reload=await seite(b,sources,ctx);
      try {
        assert.equal(await reload.evaluate(()=>window.__PRUEF.aufbewahrt()[0].id),saved.id);
        assert.equal(await reload.evaluate(()=>window.__PRUEF.aufbewahrt()[0].status),'pruefen');
        await reload.locator('[data-action="bewertung-verwerfen"]').click();assert.match(await reload.locator('.dlg').innerText(),/unterwegs|nicht geprüft/);
        assert.equal(await reload.locator('[data-action="dlg-cancel"]').count(),0);await reload.locator('[data-action="dlg-ok"]').click();
        assert.notEqual(await reload.evaluate(id=>localStorage.getItem('adrabic-bewertung-u1/'+id),saved.id),null);assert.deepEqual(await server(),before);
        if(defekt){const ready=reload.waitForEvent('download');await reload.locator('[data-action="bewertung-sichern"]').click();const d=await ready;
          const data=JSON.parse(fs.readFileSync(await d.path(),'utf8'));assert.equal(data.antworten[0].id,saved.id);assert.equal(data.beschaedigteKopien[0].inhalt,'{ungueltig');}
        await reload.evaluate(()=>window.__PRUEF_SDK.enableNetwork(window.__PRUEF_DB));await fertig(reload);await reload.evaluate(()=>window.__PRUEF.pruefen());await fertig(reload);
        await reload.waitForFunction(()=>window.__PRUEF.aufbewahrt().length===0);
        assert.equal((await server()).bewertungsStand,saved.id);assert.equal(await reload.evaluate(()=>window.__PRUEF.aufbewahrt().length),0);assert.deepEqual(reload.fehler,[]);
      } finally {await reload.close();}
    });
    await fall('alte Clients abgewiesen; Notiz weiterhin erlaubt',async(a)=>{
      const before=await server();
      const code=await a.evaluate(async()=>{try{await window.__PRUEF_SDK.updateDoc(window.__PRUEF_SDK.doc(window.__PRUEF_DB,'users/u1/karten/k4'),{stufe:9});return null;}catch(e){return e.code;}});
      assert.equal(code,'permission-denied');assert.deepEqual(await server(),before);
      await a.evaluate(()=>window.__PRUEF_SDK.updateDoc(window.__PRUEF_SDK.doc(window.__PRUEF_DB,'users/u1/karten/k4'),{extra:'Notiz'}));
      assert.equal((await server()).extra,'Notiz');
    });
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
