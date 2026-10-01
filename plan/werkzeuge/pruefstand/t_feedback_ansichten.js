/* A11: angrenzende Formular-Zustaende, echte Renderfunktion, ohne Produktivdaten. */
const assert=require('node:assert/strict'),path=require('node:path');
const {start,vollerStore,OUT}=require('./lib');
const {seiteMitApp}=require('./text_lib');
const alt=process.argv.includes('--gegenprobe');
const zusatz=`formular:(theme,voll)=>{setThema(theme);ui.einstellungen=true;ui.seite='feedback';ui.feedbackForm=true;
  feedbackListe=voll?[{id:'test',text:'Neutrale Testidee',beschreibung:'Bestehende Idee',votes:2,status:'offen',erstelltAm:'2026-09-01'}]:[];render();},
  netz:aus=>{offline=aus;render();},`;
(async()=>{
  const b=await start();
  try{
    for(const viewport of [{width:320,height:568},{width:390,height:844},{width:810,height:1080}])
    for(const theme of ['hell','dunkel'])for(const reduced of [false,true])for(const voll of [false,true]){
      const {ctx,p}=await seiteMitApp(b,vollerStore({leer:!voll}),{viewport,zusatz,commit:alt?'c4b1c30':null});
      try{
        await p.emulateMedia({reducedMotion:reduced?'reduce':'no-preference'});
        await p.evaluate(([theme,voll])=>window.__PRUEF.formular(theme,voll),[theme,voll]);
        await p.locator('#fb-text').fill('Entwurf fuer spaeter');
        const btn=p.locator('[data-action="feedback-submit"]');
        await btn.scrollIntoViewIfNeeded();await p.waitForTimeout(350);
        const vorher=await btn.boundingBox(),cardVorher=await p.locator('.ideen-formular').boundingBox();assert.equal(await btn.isDisabled(),false);
        await p.evaluate(()=>window.__PRUEF.netz(true));await p.waitForTimeout(350);
        assert.equal(await btn.isDisabled(),!alt);
        assert.equal(await p.locator('#fb-text').inputValue(),'Entwurf fuer spaeter');
        const nach=await btn.boundingBox(),cardNach=await p.locator('.ideen-formular').boundingBox();
        // Der vorhandene Offline-Banner verschiebt die ganze Karte (auch
        // c4b1c30: bei 320 px exakt 104.15625 px). Neue interne Spruenge
        // dagegen bleiben ein Fehler: gleiche Lage relativ zum Formular.
        assert.ok(Math.abs(nach.x-vorher.x)<=1&&Math.abs((nach.y-cardNach.y)-(vorher.y-cardVorher.y))<=1,'Netzwechsel verschiebt den Knopf innerhalb des Formulars');
        if(alt)console.log(JSON.stringify({viewport,vorher,nach,versatz:nach.y-vorher.y}));
        if(!alt)assert.match(await p.locator('#app').innerText(),/Zum Einreichen brauchst du eine Verbindung/);
        const breite=await p.evaluate(()=>({s:document.documentElement.scrollWidth,w:innerWidth}));assert.ok(breite.s<=breite.w+1,'Horizontaler Ueberlauf');
        if(reduced&&voll&&((viewport.width===320&&theme==='dunkel')||(viewport.width===810&&theme==='hell')))
          await p.screenshot({path:path.join(OUT,'paket-a-feedback-'+viewport.width+'-'+theme+'.png'),fullPage:true});
        await p.evaluate(()=>window.__PRUEF.netz(false));assert.equal(await btn.isDisabled(),false);
        assert.deepEqual(p.fehler,[]);
        console.log(`OK Feedback ${viewport.width} ${theme} Bewegung=${reduced?'reduziert':'normal'} ${voll?'voll':'leer'}, online/offline/online`);
        if(alt)return;
      }finally{await ctx.close();}
    }
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
