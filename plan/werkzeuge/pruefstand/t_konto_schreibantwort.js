/* Neuer Fund: eine abgelehnte Bewertung des vorigen Kontos darf niemals
   beim naechsten Konto nachgeschickt werden. Gleiche Karten-IDs sind erlaubt
   (z.B. Test/Import); der SDK-Schreibfehler wird kontrolliert verzoegert. */
const {start,aktion,vollerStore}=require('./lib');
const {APP,AUTH,FS}=require('./stubs');
const {execFileSync}=require('node:child_process');
const assert=require('node:assert/strict');
const path=require('node:path');
const gegenprobe=process.argv.includes('--gegenprobe');
const alt=gegenprobe?execFileSync('git',['show','c3a6aec:app.js'],{cwd:path.join(__dirname,'../../..'),encoding:'utf8'}):null;
(async()=>{
  const b=await start();
  try{
    for(const fall of ['danach','davor','abgemeldet']){
      const fehlerVorWechsel=fall==='davor',abmelden=fall==='abgemeldet';
      const store=vollerStore();
      for(const [k,v] of Object.entries({...store}))store[k.replace('users/u1','users/u2')]=JSON.parse(JSON.stringify(v));
      const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:'block'});
      await ctx.addInitScript(x=>{window.__START_STORE=x;window.__START_USER={uid:'u1',emailVerified:true,email:'eins@example.com'};},store);
      const gehalten=FS.replace('export function updateDoc(ref, ...args){',`export function updateDoc(ref, ...args){
        if(S.holdCard&&ref.path.includes('/karten/')){S.holdCard=false;return new Promise((ok,nein)=>{S.rejectHeld=()=>nein(Object.assign(new Error('abgelehnt'),{code:'permission-denied'}));});}`);
      await ctx.route('**/www.gstatic.com/**',r=>r.fulfill({contentType:'text/javascript',body:r.request().url().includes('auth')?AUTH:r.request().url().includes('firestore')?gehalten:APP}));
        await ctx.route('**/app.js?*',async r=>{
          const source=alt||(await(await r.fetch()).text());
          await r.fulfill({contentType:'text/javascript',body:source+'\nwindow.__PRUEF_RETRY=abgelehntesNachholen;window.__PRUEF_FEHLER=()=>schreibFehler;'});
        });
      const p=await ctx.newPage();p.fehler=[];p.on('pageerror',e=>p.fehler.push(e.message));
      await p.goto('http://127.0.0.1:'+(process.env.PRUEF_PORT||8099)+'/index.html');await p.waitForTimeout(1400);
      await aktion(p,'start-session',null,700);
      const wort=await p.locator('.study-word').textContent();
      const id=await p.evaluate(w=>[...window.__FB.store].find(([k,v])=>k.startsWith('users/u1/karten/')&&v.wort===w)[0].split('/').pop(),wort);
      const vor=await p.evaluate(id=>structuredClone(window.__FB.store.get('users/u2/karten/'+id)),id);
      await p.evaluate(()=>{window.__FB.holdCard=true;window.__FB.user.getIdToken=()=>new Promise(()=>{});});
      await aktion(p,'reveal',null,600);await aktion(p,'grade-known',null,150);
      await p.waitForFunction(()=>typeof window.__FB.rejectHeld==='function');
      if(fehlerVorWechsel){await p.evaluate(()=>window.__FB.rejectHeld());await p.waitForTimeout(300);}
      await p.evaluate(abmelden=>{const s=window.__FB;s.user=abmelden?null:{uid:'u2',emailVerified:true,email:'zwei@example.com',getIdToken:()=>Promise.resolve('tok')};for(const cb of s.authListeners)cb(s.user);},abmelden);
      await p.waitForTimeout(400);
      if(fehlerVorWechsel)await p.evaluate(()=>window.__PRUEF_RETRY());
      else await p.evaluate(()=>window.__FB.rejectHeld());
      await p.waitForTimeout(450);
      const nach=await p.evaluate(id=>structuredClone(window.__FB.store.get('users/u2/karten/'+id)),id);
      const gleich=JSON.stringify(vor)===JSON.stringify(nach);
      if(abmelden){
        const fehler=await p.evaluate(()=>window.__PRUEF_FEHLER());
        assert.equal(fehler,gegenprobe?'permission-denied':null,'Alte Ablehnung setzt nach Abmeldung einen fremden Speicherfehler');
        assert.deepEqual(nach,vor,'Abgemeldeter Schreibvorgang veraendert Konto B');
      }else if(gegenprobe)assert.equal(gleich,false,'Altstand sollte den falschen Konto-Schreibvorgang reproduzieren');
      else assert.deepEqual(nach,vor,'Bewertung von Konto A wurde auf Konto B angewendet');
      assert.deepEqual(p.fehler,[],'JavaScript-Fehler');
      console.log(`OK  ${gegenprobe?'Gegenprobe: alter Fehler bestaetigt':'Alte Rueckmeldung isoliert'}; ${fall}.`);
      await ctx.close();
    }
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
