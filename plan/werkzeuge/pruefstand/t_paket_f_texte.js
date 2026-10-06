/* F7/F8: echte Text-/Exportwege mit Einzahl/Mehrzahl; fester Altstand 5af78a0. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {start,vollerStore}=require('./lib');
const {seiteMitApp}=require('./text_lib');
const alt=process.argv.includes('--gegenprobe');
(async()=>{const browser=await start();try{
 const {p,ctx}=await seiteMitApp(browser,vollerStore(),{commit:alt?'5af78a0':null,
  zusatz:'get ui(){return ui;}, get b(){return currentBereich();}, weitergabeBestaetigung, fortschrittStoff, renderVerwalten, renderFaden, renderEinstellungenSeite, exportBackup,'});
 try{
  for(const n of (process.argv.includes('--nur-f8') ? [] : [1,2])){
   const texts=await p.evaluate(n=>{
    const a=__PRUEF,b=a.b; a._karten ||= b.karten.slice();b.karten=a._karten.slice(0,n);b.gefuehrt=true;
    b.sets=Array.from({length:n},(_,i)=>({id:'l'+i,name:'Lektion '+(i+1),art:'lektion',order:i,cardIds:[b.karten[i].id]}));
    const mixed=[{...b.karten[0],stufe:0,ersteBewertung:null}, {...b.karten[0],id:'weiter',stufe:5,ersteBewertung:'2026-01-01'}];
    document.getElementById('app').innerHTML=a.renderVerwalten()+a.renderFaden(b,[])+a.fortschrittStoff(mixed);
    const body=document.getElementById('app');
    return [a.weitergabeBestaetigung(b,1,'fortschritt'),body.textContent,...[...body.querySelectorAll('[title]')].map(e=>e.title)];
   },n);
   console.log('F7',n,JSON.stringify(texts));
   for(const s of texts)assert(!/\b1 (?:Karten|Lektionen)\b/.test(s),'F7 falsche Mehrzahl');
   if(n===1)assert(!texts[0].includes('der Rest'),'F7 erfundener Rest');
  }
  const download=p.waitForEvent('download');await p.evaluate(()=>__PRUEF.exportBackup(false));
  const file=await download;console.log('F8 Dateiname',file.suggestedFilename());
  assert(file.suggestedFilename().startsWith('adrabic-sicherung-'),'F8 Dateiname');
  const json=JSON.parse(fs.readFileSync(await file.path(),'utf8'));
  assert(Array.isArray(json.bereiche)&&json.bereiche.length>0,'Unverändertes Sicherungsformat');
  assert(json.bereiche.every(b=>Array.isArray(b.karten)),'Kartenlisten erhalten');
  const text=await p.evaluate(()=>{const el=document.createElement('div');el.innerHTML=__PRUEF.renderEinstellungenSeite('daten');return el.textContent;});
  assert(!/Backup|ein Sicherung|Ein Sicherung|letztes Sicherung/.test(text),'F8 sichtbarer Wortlaut');
  assert(text.includes('Eine Sicherung ist eine Datei'),'F8 Erklärung');
  console.log('F8 Sicherungsformat und sichtbarer Wortlaut grün');
 }finally{await ctx.close();}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
