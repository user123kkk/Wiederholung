/* F7/F8: sichtbare Texte und angrenzende Bildschirme, 24 Konfigurationen. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {start,vollerStore}=require('./lib'),{seiteMitApp}=require('./text_lib');
const out=path.join(__dirname,'../../zyklus-2/paket-f-belege/f-umfeld',new Date().toISOString().replace(/[:.]/g,'-'));
fs.mkdirSync(out,{recursive:true});
console.log('Bilder: '+out);
(async()=>{const browser=await start();try{
 for(const width of [320,390,820])for(const thema of ['hell','dunkel'])for(const ruhig of [false,true])for(const leer of [true,false]){
  const {p,ctx}=await seiteMitApp(browser,vollerStore({leer,thema}),{
   viewport:{width,height:width===320?568:844},
   zusatz:'get ui(){return ui;}, get b(){return currentBereich();}, render, weitergabeBestaetigung,',
  });
  const name=[width,thema,ruhig?'ruhig':'bewegt',leer?'leer':'voll'].join('-');
  try{
   await p.emulateMedia({reducedMotion:ruhig?'reduce':'no-preference'});
   for(const page of ['daten','konto-loeschen']){
    await p.evaluate(page=>{__PRUEF.ui.einstellungen=true;__PRUEF.ui.seite=page;__PRUEF.render();},page);
    await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
    const text=await p.locator('#app').textContent();
    assert(!/Backup|Lernkarten-Bestand|ein Sicherung|Ein Sicherung|letztes Sicherung/.test(text),name+' '+page);
    assert(text.includes(page==='daten'?'Eine Sicherung ist eine Datei':'Sicherung herunterladen'),name+' '+page+' Sicherung');
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),name+' '+page+' Querüberlauf');
    await p.screenshot({path:path.join(out,name+'-'+page+'.png'),fullPage:true});
   }
   if(!leer){
    const teilen=await p.evaluate(()=>{const a=__PRUEF,b=a.b;b.karten=b.karten.slice(0,1);
     b.sets=[{id:'lektion-eins',name:'Lektion 1',art:'lektion',order:0,cardIds:[b.karten[0].id]}];b.gefuehrt=true;
     a.ui.einstellungen=false;a.ui.seite=null;a.ui.tab='verwalten';a.render();return a.weitergabeBestaetigung(b,1,'fortschritt');});
    assert(!/1 Karten|1 Lektionen|der Rest/.test(teilen),name+' Teilen');
    const text=await p.locator('#app').textContent();assert(text.includes('1 von 1 Lektion frei'),name+' Banner');
    await p.waitForTimeout(800);
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),name+' Einzahl Querüberlauf');
    await p.screenshot({path:path.join(out,name+'-einzahl.png'),fullPage:true});
   }
   assert.deepEqual(p.fehler,[]);console.log(name+' Texte/Umfeld grün');
  }finally{await ctx.close();}
 }
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
