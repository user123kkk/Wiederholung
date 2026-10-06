/* F10: zentrale Schließliste plus echte Bereich-/Reiterwechsel; Altstand 5af78a0.
   Die Übungsauswahl (drillOpen) gehört nicht in die Liste: Der Reiter Verwalten
   ließ sie schon in 5af78a0 offen (Einstellungen darüber, dann Verwalten).
   --gegenprobe-drill setzt das Schließen in die Liste zurück; der Test muss rot werden. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const {start,vollerStore}=require('./lib');
const {seiteMitApp}=require('./text_lib');
const alt=process.argv.includes('--gegenprobe'),root=path.join(__dirname,'../../..');
const drillProbe=process.argv.includes('--gegenprobe-drill')?[['  ui.textLernen = null;\n}\nfunction selectBereich(','  ui.textLernen = null;\n  ui.drillOpen = false;\n}\nfunction selectBereich(']]:null;
(async()=>{
 const source=alt?execFileSync('git',['show','5af78a0:app.js'],{cwd:root,encoding:'utf8'}):fs.readFileSync(path.join(root,'app.js'),'utf8');
 assert(source.includes('function ebenenSchliessen('),'F10 zentrale Schließliste fehlt');
 const browser=await start();try{
  for(const width of [320,390,820])for(const thema of ['hell','dunkel'])for(const leer of [true,false]){
   const {p,ctx}=await seiteMitApp(browser,vollerStore({leer,thema}),{viewport:{width,height:844},ersetze:drillProbe,
    zusatz:'get ui(){return ui;}, get b(){return currentBereich();}, ebenenSchliessen, selectBereich, render,'});
   try{
    for(const keep of [false,true]){
     const state=await p.evaluate(keep=>{
      const a=__PRUEF,u=a.ui;
      u.seite='lektionen';u.einstellungen=true;u.wahlSheet='limit';u.setArtSheetId='s1';
      u.karteSheet=true;u.bereichSheet=true;u.bereichMehr=true;u.cardDetailId='k1';
      u.neuWahl=true;u.textAnlegen={};u.textAnsicht='t';u.zeileEdit={};u.textLernen={};u.drillOpen=true;
      a.ebenenSchliessen(keep);
      return Object.fromEntries(['seite','einstellungen','wahlSheet','setArtSheetId','karteSheet','bereichSheet','bereichMehr','cardDetailId','neuWahl','textAnlegen','textAnsicht','zeileEdit','textLernen','drillOpen'].map(k=>[k,u[k]]));
     },keep);
     assert.equal(state.seite,keep?'lektionen':null);
     assert.equal(state.drillOpen,true,'Übungsauswahl gehört nicht in die Schließliste');
     for(const [k,v]of Object.entries(state))if(k!=='seite'&&k!=='drillOpen')assert(v===false||v===null,k+' bleibt offen');
    }
    const gewechselt=await p.evaluate(()=>{
     const a=__PRUEF,u=a.ui;
     Object.assign(u,{seite:'daten',einstellungen:true,wahlSheet:'limit',setArtSheetId:'s1',
      karteSheet:true,bereichSheet:true,bereichMehr:true,cardDetailId:'k1',neuWahl:true,
      textAnlegen:{},textAnsicht:'t',zeileEdit:{},textLernen:{},drillOpen:true,
      searchQuery:'Suche',searchAll:true,session:{},selectedIds:new Set(['k1'])});
     a.selectBereich(a.b.id);
     return {seite:u.seite,suche:u.searchQuery,session:u.session,auswahl:u.selectedIds.size,
      offen:['einstellungen','wahlSheet','setArtSheetId','karteSheet','bereichSheet','bereichMehr',
       'cardDetailId','neuWahl','textAnlegen','textAnsicht','zeileEdit','textLernen','drillOpen'].filter(k=>u[k])};
    });
    assert.deepEqual(gewechselt,{seite:'daten',suche:'',session:null,auswahl:0,offen:[]},'Echter Bereichswechsel');
    await p.evaluate(()=>{__PRUEF.ui.seite=null;__PRUEF.render();});
    for(const action of ['tab-verwalten','tab-fortschritt','tab-lernen']){
     await p.locator('[data-action="'+action+'"]').first().click();await p.waitForTimeout(400);
     assert.equal(await p.evaluate(()=>__PRUEF.ui.tab),action.slice(4));
    }
    if(!leer){
     // Wie in 5af78a0: Übungsauswahl offen, Einstellungen darüber, Reiter Verwalten -> Auswahl steht noch.
     const klick=a=>p.evaluate(a=>{const e=document.querySelector('[data-action="'+a+'"]');if(!e)throw new Error('keine Aktion '+a);e.click();},a);
     await klick('tab-verwalten');await p.waitForTimeout(400);
     await klick('open-drill');await p.waitForTimeout(400);
     assert.equal(await p.locator('#drill-box').count(),1,'Übungsauswahl öffnet');
     await klick('einstellungen');await p.waitForTimeout(400);
     assert.equal(await p.evaluate(()=>__PRUEF.ui.einstellungen),true);
     await klick('tab-verwalten');await p.waitForTimeout(400);
     assert.deepEqual(await p.evaluate(()=>[__PRUEF.ui.tab,__PRUEF.ui.einstellungen,__PRUEF.ui.drillOpen]),['verwalten',false,true],'Verwalten lässt die Übungsauswahl offen');
     assert.equal(await p.locator('#drill-box').count(),1,'Übungsauswahl bleibt sichtbar');
     await klick('tab-fortschritt');await p.waitForTimeout(400);
     assert.equal(await p.evaluate(()=>__PRUEF.ui.drillOpen),false,'Fortschritt schließt die Übungsauswahl');
     await klick('tab-verwalten');await p.waitForTimeout(400);await klick('open-drill');await p.waitForTimeout(400);
     await klick('tab-lernen');await p.waitForTimeout(400);
     assert.equal(await p.evaluate(()=>__PRUEF.ui.drillOpen),false,'Lernen schließt die Übungsauswahl');
    }
    assert.deepEqual(p.fehler,[]);console.log('F10',width,thema,leer?'leer':'voll','grün');
   }finally{await ctx.close();}
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
