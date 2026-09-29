/* Alte Board-Antworten duerfen Entwurf/Stimm-Anzeige von B nicht veraendern. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const repo=path.join(__dirname,'../../../..'),gegenprobe=process.argv.includes('--gegenprobe');
const source=gegenprobe?require('node:child_process').execFileSync('git',['show','5de6969:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
const code=source.slice(source.indexOf('async function feedbackEinreichen()'),source.indexOf('/* ---------- Das Wahl-Blatt'));
(async()=>{for(const fall of ['einreichen','abstimmen']){
 let antwort;const refA={},refB={},fehler=[],bEntwurf={text:'Noch nicht abgeschickte Idee B',beschreibung:'B'};
 const ctx=vm.createContext({console,Date,Object,Set,kontoWirdGeloescht:false,userDocRef:refA,currentUser:{uid:'a'},db:{},
  ui:{feedbackForm:true},feedbackEinreichtWird:false,feedbackFormFehler:false,feedbackEntwurf:{text:'A',beschreibung:''},
  feedbackListe:[{id:'idee1',votes:2}],feedbackEigeneVotes:new Set(),feedbackPopId:null,
  document:{getElementById:id=>({value:id==='fb-text'?'Idee A':''})},
  render(){},zeichneIdeen(){},fuehlbar(){},ansagen(){},feedbackLaden:async()=>{},
  fehlerKlartext:()=> 'Alte Ablehnung',dlgAlert:x=>fehler.push(x),zeigeToast:x=>fehler.push(x),
  fb:{serverTimestamp:()=>({}),collection:()=>({}),doc:()=>({}),increment:n=>({n}),
   addDoc:()=>new Promise(ok=>antwort=ok),writeBatch:()=>({set(){},update(){},delete(){},commit:()=>new Promise((ok,nein)=>antwort=nein)})}});
 const lauf=vm.runInContext(code+(fall==='einreichen'?';feedbackEinreichen()':';feedbackAbstimmen("idee1",true)'),ctx);
 ctx.userDocRef=refB;ctx.currentUser={uid:'b'};ctx.feedbackEntwurf=bEntwurf;
 ctx.feedbackListe=[{id:'idee1',votes:8}];ctx.feedbackEigeneVotes=new Set(['idee1']);ctx.feedbackEinreichtWird=false;
 ctx.ui.feedbackForm=true;
 if(fall==='einreichen')antwort({id:'von-a'});else antwort({code:'permission-denied'});
 await lauf;
 const alt=gegenprobe||process.argv.includes('--befund');
 if(alt){
  if(fall==='einreichen'){assert.notEqual(ctx.feedbackEntwurf,bEntwurf);assert.equal(ctx.ui.feedbackForm,false);}
  else {assert.equal(ctx.feedbackEigeneVotes.has('idee1'),false);assert.equal(fehler.length,1);}
 }else{assert.equal(ctx.feedbackEntwurf,bEntwurf);assert.equal(ctx.ui.feedbackForm,true);assert.equal(ctx.feedbackEigeneVotes.has('idee1'),true);assert.deepEqual(fehler,[]);}
 console.log(JSON.stringify({fall,entwurfErhalten:ctx.feedbackEntwurf===bEntwurf,formOffen:ctx.ui.feedbackForm,BStimme:ctx.feedbackEigeneVotes.has('idee1'),fehler}));
}})().catch(e=>{console.error(e);process.exitCode=1;});
