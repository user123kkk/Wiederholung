/* Paket C: Abnahmen gegen echte App, feste Gegenprobe b60abf4.
   Einzelner Fall: node t_paket_c_weiter.js C3 --alt. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const {start,neueSeite,aktion,foto,GERAETE,vollerStore,tag} = require('./lib');
const repo=path.resolve(__dirname,'../../..');
const alt=process.argv.includes('--alt');
const fall=process.argv.find(x=>/^C\d+$/.test(x));
const instrument=`
window.__C = {
 get ui(){return ui;}, get bereiche(){return bereiche;}, get draft(){return formDraft;},
 render, selectBereich, editCard, cancelEdit, saveSelectedToSet, deleteSelectedCards,
 moveSelectedCardsTo, deleteCard, resetRueckfaelle,
 async testKartenAnlegen(karten){const batch=fb.writeBatch(db);for(const k of karten)batch.set(karteRef(k.id),k);await batch.commit();},
 quelle(){return currentBereich();},
 setVerlauf(v){verlauf=v;render();},
 stoff(cards){return fortschrittStoff(cards);},
 kalender(){return fortschrittWochen();}
};`;
async function seite(b,vp,opt={}) {
 return neueSeite(b,vp,{...opt,vorher:async ctx=>{
  await ctx.addInitScript(()=>{navigator.serviceWorker.register=()=>Promise.reject(new Error('Test ohne Worker'));});
  for(const datei of ['app.js','styles.css']) {
   let body=alt?execFileSync('git',['show','b60abf4:'+datei],{cwd:repo,encoding:'utf8',maxBuffer:4e6}):fs.readFileSync(path.join(repo,datei),'utf8');
   if(datei==='app.js')body+=instrument;
   await ctx.route(u=>u.hostname==='127.0.0.1'&&u.pathname.endsWith('/'+datei),r=>r.fulfill({body,contentType:datei.endsWith('.js')?'text/javascript':'text/css'}));
  }
 }});
}
const faelle={
 async C3(p){
  await aktion(p,'tab-fortschritt');
  assert.equal(await p.locator('.arab-ziffer').count(),0,'C3 Quran-Zierziffer');
 },
 async C4(p){
  await aktion(p,'tab-fortschritt');
  assert.equal(await p.locator('.appbar .bereich-pill').count(),0,'C4 Kopf suggeriert Bereich');
  assert.equal(await p.locator('.appbar h1').innerText(),'Fortschritt');
  const t=await p.locator('[data-action="fort-seite"][data-id="lektionen"]').innerText();
  assert.ok(t.includes('Medina Buch 1'),'C4 Lektionen ohne Bereichsname');
  await p.evaluate(()=>__C.selectBereich('b2'));
  await p.waitForTimeout(500);
  assert.equal(await p.locator('.appbar h1').innerText(),'Fortschritt');
  assert.ok((await p.locator('.view').innerText()).includes('von 40 Karten'));
 },
 async C5(p){
  await aktion(p,'tab-fortschritt');
  for(const tage of [30,100]){
   await p.evaluate(([iso])=>__C.setVerlauf({[iso]:{w:5,n:0}}),[tag(-tage)]);
   await p.waitForTimeout(500);
   const t=await p.locator('.view').innerText();
   assert.ok(!t.includes('Noch nichts aufgezeichnet'),'C5 Pause als Anfang dargestellt');
   assert.ok(t.includes('Dein bisheriger Fortschritt bleibt.'),'C5 Pausensatz fehlt');
   const k=p.locator('[data-action="fort-runde"]');
   assert.equal(await k.count(),1,'C5 Handlung fehlt');
   await k.click(); await p.waitForTimeout(600);
   assert.ok(await p.locator('.study-flaeche').count(),'C5 Runde startet nicht');
   await aktion(p,'end-session'); await aktion(p,'tab-fortschritt');
  }
  await p.evaluate(()=>__C.setVerlauf({}));
  assert.ok((await p.locator('.view').innerText()).includes('Dein bisheriger Fortschritt bleibt.'),'C5 bewertete Karten ohne Protokoll bleiben Fortschritt');
  await p.evaluate(()=>{
   for(const b of __C.bereiche) for(const c of b.karten) {c.ersteBewertung=null;c.stufe=0;c.maxStufe=0;}
   __C.setVerlauf({});
  });
  const anfang=await p.locator('.view').innerText();
  assert.ok(anfang.includes('Noch nichts aufgezeichnet'),'C5 echter Anfang fehlt');
  assert.ok(!anfang.includes('Dein bisheriger Fortschritt bleibt.'),'C5 echter Anfang als Pause');
  assert.equal(await p.locator('.stat-block').first().locator('[data-action="fort-runde"]').count(),0,'C5 Anfang hat keine Pausenhandlung');
 },
 async C6(p){
  await aktion(p,'tab-fortschritt');
  for(const n of [1,40]){
   const html=await p.evaluate(n=>__C.stoff(Array.from({length:n},(_,i)=>({id:'n'+i,stufe:0,maxStufe:0,ersteBewertung:null}))),n);
   assert.ok(!/<strong>0<\/strong>/.test(html),'C6 grosse Null');
   assert.ok(!/1 Karten noch nicht gewusst/.test(html),'C6 falsche Mehrzahl');
   assert.ok(/gerade/.test(html),'C6 Stand fehlt');
   await p.evaluate(n=>{
    const vorlage=__C.bereiche[0].karten[0];
    __C.bereiche[0].karten=Array.from({length:n},(_,i)=>({...vorlage,id:'n'+i,stufe:0,maxStufe:0,ersteBewertung:null}));
    for(const b of __C.bereiche.slice(1))b.karten=[];
    __C.render();
   },n);
   const stoff=p.locator('.stat-block').filter({has:p.locator('h3',{hasText:'Dein Stoff'})});
   assert.equal(await stoff.locator('.gross-zahl strong').count(),0,'C6 gerenderte Null');
   assert.equal(await stoff.getByRole('button',{name:'Runde starten',exact:true}).count(),1,'C6 nächster Schritt fehlt');
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'C6 importierte Karten überlaufen');
  }
  await p.evaluate(()=>{const c=__C.bereiche[0].karten[0];__C.bereiche[0].karten=[c];c.ersteBewertung='2026-09-01';__C.render();});
  assert.ok(!/1 Karten noch nicht gewusst/.test(await p.locator('.view').innerText()),'C6 einmal Nicht: Mehrzahl');
  assert.equal(await p.locator('.gross-zahl strong').filter({hasText:/^0$/}).count(),0,'C6 einmal Nicht: Null');
 },
 async C7(p){
  await aktion(p,'tab-fortschritt');
  assert.ok((await p.locator('.view').innerText()).includes('schon einmal gewusst'),'C7 Kartenwortlaut');
  assert.ok((await p.locator('.view').innerText()).includes('einmal geschafft'),'C7 Lektionswortlaut');
  await aktion(p,'fort-seite','lektionen');
  assert.ok((await p.locator('.view').innerText()).includes('einmal geschafft'));
  await aktion(p,'seite-zu');
  await aktion(p,'tab-lernen');
  assert.ok((await p.locator('.view').innerText()).includes('schon einmal gewusst'),'C7 Meilenstein unverändert ungenau');
  await aktion(p,'tab-verwalten');
  await p.evaluate(()=>{__C.quelle().gefuehrt=true;__C.ui.setsOffen=true;__C.render();});
  assert.ok((await p.locator('#set-s1').innerText()).includes('schon einmal gewusst'),'C7 geführte Lektion: Kartenwortlaut');
 },
 async C8(p){
  await aktion(p,'tab-fortschritt',null,1600);
  const geo=await p.evaluate(()=>{
   const kal=document.querySelector('.kal');
   const tage=[...kal.querySelectorAll('.kal-tag')];
   const r=kal.getBoundingClientRect();
   return {anteil:(Math.max(...tage.map(e=>e.getBoundingClientRect().right))-Math.min(...tage.map(e=>e.getBoundingClientRect().left)))/r.width,
    text:kal.parentElement.innerText,
    gelernt:getComputedStyle(kal.querySelector('.s1')).backgroundColor,
    leer:getComputedStyle(kal.querySelector('.s0')).backgroundColor};
  });
  assert.ok(geo.anteil>=.8,'C8 Rasterbreite '+geo.anteil);
  assert.ok(/Mo/.test(geo.text)&&/Mi/.test(geo.text)&&/Fr/.test(geo.text),'C8 Wochentage fehlen');
  assert.ok(/Gelernt/.test(geo.text),'C8 Legende fehlt');
  const lum=c=>{const rgb=c.match(/[\d.]+/g).slice(0,3).map(n=>{const v=Number(n)/255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];};
  const a=lum(geo.gelernt),c=lum(geo.leer),kontrast=(Math.max(a,c)+.05)/(Math.min(a,c)+.05);
  assert.ok(kontrast>=3,'C8 Grafik-Kontrast '+kontrast);
  console.log('C8 Kontrast',kontrast.toFixed(2),'Breite',geo.anteil.toFixed(2));
  for(const v of [{}, {[tag(-100)]:{w:1,n:0}}]){
   await p.evaluate(v=>__C.setVerlauf(v),v);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'C8 leer/lang: Überlauf');
   assert.ok((await p.locator('.kal').getAttribute('aria-label')).includes('Tagen gelernt'),'C8 lesbarer Kalender fehlt');
  }
  await p.evaluate(v=>__C.setVerlauf(v),vollerStore()['users/u1'].verlauf);
  await p.waitForTimeout(1600);
 },
 async C17(p){
  await aktion(p,'tab-fortschritt');
  const iso=tag(-25);
  await p.evaluate(iso=>__C.setVerlauf({[iso]:{w:1,n:0}}),iso);
  assert.ok(await p.locator('.kal-tag[title^="'+Number(iso.slice(8))+'.'+Number(iso.slice(5,7))+'."]').count(),'C17 alter Tag fehlt');
 },
 async C19(p){
  await aktion(p,'tab-fortschritt');
  await aktion(p,'fort-seite','leeches');
  const kopf=()=>p.locator('h1').innerText();
  assert.equal(await kopf(),'Karten, die nicht klappen');
  await aktion(p,'edit-leech','k5');
  await p.keyboard.press('Escape');await p.waitForTimeout(600);
  assert.equal(await kopf(),'Karten, die nicht klappen','C19 Bearbeiten verlässt Liste');
  await aktion(p,'edit-leech','k5');
  await p.fill('#f-ueb','Überarbeitete Übersetzung');
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  assert.ok((await p.locator('.dlg').last().innerText()).includes('Änderungen verwerfen?'),'C19/C12 Entwurfschutz fehlt im Fortschritt');
  await p.locator('.dlg').last().getByRole('button',{name:'Abbrechen',exact:true}).click();
  await p.waitForTimeout(500);
  assert.equal(await p.inputValue('#f-ueb'),'Überarbeitete Übersetzung','C19 Entwurf nach Rückfrage verloren');
  await p.evaluate(()=>__C.render());
  assert.equal(await p.inputValue('#f-ueb'),'Überarbeitete Übersetzung','C19 Entwurf nach Neuzeichnen verloren');
  await aktion(p,'submit-card',null,700);
  assert.equal(await kopf(),'Karten, die nicht klappen','C19 Speichern verlässt Liste');
  const vor=await p.evaluate(()=>window.__FB.store.get('users/u1/karten/k9').rueckfaelle);
  await aktion(p,'reset-leech','k9');
  assert.equal(await p.locator('[data-action="reset-leech"][data-id="k9"]').count(),0);
  const undo=p.getByRole('button',{name:'Rückgängig',exact:true});
  assert.equal(await undo.count(),1,'C19 Rückweg fehlt');
  assert.ok(await undo.isVisible());await undo.click();await p.waitForTimeout(500);
  assert.equal(await p.evaluate(()=>window.__FB.store.get('users/u1/karten/k9').rueckfaelle),vor);
  assert.equal(await p.locator('[data-action="reset-leech"][data-id="k9"]').count(),1);
  await aktion(p,'reset-leech','k9');
  await p.evaluate(()=>{__C.quelle().karten.find(c=>c.id==='k9').rueckfaelle=7;window.__FB.store.get('users/u1/karten/k9').rueckfaelle=7;});
  await undo.click();await p.waitForTimeout(400);
  assert.equal(await p.evaluate(()=>window.__FB.store.get('users/u1/karten/k9').rueckfaelle),7,'C19 neue Änderung überschrieben');
 },
 async C20(p){
  await aktion(p,'tab-fortschritt',null,1700);
  if(p.viewportSize().width>=720){
   assert.ok(await p.locator('.fort-details').isVisible(),'C20 Unterseiten auf breitem Bildschirm verborgen');
   assert.equal(await p.locator('.fort-details section').count(),3);
   assert.ok(!(await p.locator('.fort-details-nav').isVisible()));
   const leer=await p.locator('.view > .stat-block').evaluateAll(els=>els.map(el=>{
    const box=el.getBoundingClientRect();const ende=Math.max(...[...el.children].map(c=>c.getBoundingClientRect().bottom));
    return (box.bottom-ende)/box.height;
   }));
   assert.ok(leer.every(x=>x<=1/3),'C20 Block mehr als ein Drittel leer: '+leer);
   if(p.viewportSize().width===820&&!process.argv.includes('--alt'))await foto(p,'paket-c-C20-ipad');
  }else{
   assert.ok(await p.locator('[data-action="fort-seite"][data-id="leeches"]').isVisible());
   if(await p.locator('.fort-details').count())assert.ok(!(await p.locator('.fort-details').isVisible()));
  }
 },
 async C21(p){
  await aktion(p,'tab-fortschritt',null,0);
  await p.evaluate(()=>{document.querySelector('.view').getBoundingClientRect();document.querySelector('.view').getAnimations({subtree:true});});
  await p.waitForTimeout(600);
  const lauf=await p.evaluate(()=>document.querySelector('.view').getAnimations({subtree:true}).filter(a=>a.playState==='running').map(a=>a.animationName));
  assert.deepEqual(lauf,[],'C21 Fortschritt nach 600ms noch bewegt');
 },
 async C23(p){
  await aktion(p,'tab-verwalten');
  await p.evaluate(()=>{__C.ui.selectedIds=new Set(['k0','k1']);__C.moveSelectedCardsTo('b2');});
  await p.waitForTimeout(300);
  assert.ok((await p.locator('#ansage').textContent()).includes('2 Karten nach „Quran-Wörter“ verschoben'),'C23 Verschieben ohne Ansage');
  assert.equal(await p.evaluate(()=>window.__FB.store.get('users/u1/karten/k0').bereichId),'b2');
  assert.ok(!(await p.evaluate(()=>window.__FB.store.get('users/u1/bereiche/b1').sets.s1.cardIds)).includes('k0'));
  await p.evaluate(()=>{__C.ui.selectedIds=new Set(['k2','k3']);__C.deleteSelectedCards();});
  await p.waitForTimeout(300);
  await p.getByRole('button',{name:'Abbrechen',exact:true}).click();await p.waitForTimeout(400);
  assert.ok(await p.evaluate(()=>window.__FB.store.has('users/u1/karten/k2')));
  await p.evaluate(()=>{__C.deleteSelectedCards();});await p.waitForTimeout(300);
  await p.getByRole('button',{name:'Endgültig löschen',exact:true}).click();await p.waitForTimeout(400);
  assert.ok((await p.locator('#ansage').textContent()).includes('2 Karten gelöscht'),'C23 Mehrfachlöschen ohne Ansage');
  assert.ok(!(await p.evaluate(()=>window.__FB.store.has('users/u1/karten/k2'))));
  // 3.18.27 (E-09): Einzelkarte ohne Rückfrage, dafür „Rückgängig“ in der Meldung (t_loeschen_rueckgaengig.js).
  await p.evaluate(()=>{__C.deleteCard('k4');});await p.waitForTimeout(400);
  assert.ok((await p.locator('#ansage').textContent()).includes('Karte gelöscht'),'C23 Einzellöschen ohne Ansage');
  assert.ok(!(await p.evaluate(()=>window.__FB.store.has('users/u1/karten/k4'))));
 },
 async C24(p){
  for(const weg of ['fortschritt','lernen']){
   await aktion(p,'tab-verwalten');
   await p.evaluate(()=>{Object.assign(__C.ui,{searchQuery:'Stu',searchAll:true,kartenSeite:1,selectMode:true,selectedIds:new Set(['k5'])});__C.render();});
   await aktion(p,'tab-'+weg);await aktion(p,'tab-verwalten');
   const s=await p.evaluate(()=>[__C.ui.searchQuery,__C.ui.searchAll,__C.ui.kartenSeite,__C.ui.selectMode,__C.ui.selectedIds.size]);
   assert.deepEqual(s,['',false,0,false,0],'C24 anderer Rückweg über '+weg);
  }
 },
 async C25(p){
  await aktion(p,'tab-verwalten');
  await p.evaluate(()=>{__C.ui.setsOffen=true;__C.render();});
  let t=await p.locator('.view').innerText();
  assert.ok(!/hier siehst du nur|freigeschaltete/.test(t),'C25 eigene Gruppen falsch beschrieben');
  await p.evaluate(()=>{__C.quelle().gefuehrt=true;__C.render();});
  t=await p.locator('.view').innerText();
  assert.ok(t.includes('hier siehst du nur')&&t.includes('freigeschaltete'),'C25 geführte Erklärung verloren');
 },
 async C26(p){
  await aktion(p,'tab-verwalten');
  await p.evaluate(()=>{__C.ui.zuletztSetId='s5';__C.ui.wahlSheet='speicherkarte';__C.render();});
  const ziel=p.locator('[data-action="auswahl-ziel-set"][data-id="s5"]');
  assert.ok((await ziel.getAttribute('class')).includes('aktiv'),'C26 letztes Ziel nicht vorausgewählt');
  assert.equal(await p.locator('[data-action="auswahl-ziel-set"]').nth(1).getAttribute('data-id'),'s5','C26 letztes Ziel nicht oben');
  await aktion(p,'wahl-sheet-zu');
  await p.evaluate(()=>{__C.ui.zuletztSetId='gelöscht';__C.ui.wahlSheet='speicherkarte';__C.render();});
  assert.equal(await p.locator('.sheet-liste .aktiv').count(),0,'C26 gelöschtes Ziel gewählt');
  await aktion(p,'wahl-sheet-zu');
  await p.evaluate(()=>{__C.ui.setsOffen=true;__C.ui.openSetId='s5';__C.render();});
  const zeile=p.locator('#set-s5 .set-cards > .card-row').first();
  assert.equal(await zeile.locator('.card-row__stand').count(),1,'C26 Standpunkte fehlen');
  assert.equal(await zeile.getAttribute('data-action'),'card-detail');
  await zeile.locator('.words').click();await p.waitForTimeout(500);
  assert.equal(await p.locator('#card-detail-titel').count(),1);
  await aktion(p,'card-detail-zu');
  const griff=p.locator('#karten-liste > .card-row .drag-handle').first();
  if(p.viewportSize().width<900)await griff.tap();else await griff.click();
  await p.waitForTimeout(500);
  assert.equal(await p.locator('.dlg').count(),0,'C26 Griff öffnet Blatt');
  await p.evaluate(()=>{__C.quelle().karten.find(c=>c.id==='k0').extra='Lange Notiz. '.repeat(350);__C.render();});
  await aktion(p,'card-detail','k0');
  const note=p.locator('.dlg .extra-note-voll');
  assert.ok(await note.evaluate(el=>el.scrollHeight>el.clientHeight),'C26 Notiz scrollt nicht in sich');
  const bearbeiten=await p.locator('[data-action="card-detail-bearbeiten"]').boundingBox();
  const schliessen=await p.locator('[data-action="card-detail-zu"]').last().boundingBox();
  assert.ok(bearbeiten.y+bearbeiten.height<=p.viewportSize().height,'C26 Bearbeiten außerhalb');
  assert.ok(schliessen.y+schliessen.height<=p.viewportSize().height,'C26 Schließen außerhalb');
  if([320,1440].includes(p.viewportSize().width))await foto(p,'paket-c-C26-notiz-'+p.viewportSize().width);
  await aktion(p,'card-detail-zu');
  await p.evaluate(()=>__C.editCard('k4'));
  await p.fill('#f-ueb','Entwurf zum Behalten');
  await p.evaluate(()=>{const q=__C.quelle();q.karten=q.karten.filter(c=>c.id!=='k4');window.__FB.store.delete('users/u1/karten/k4');});
  await aktion(p,'submit-card');
  assert.ok((await p.locator('.dlg').last().innerText()).includes('Karte gibt es nicht mehr'),'C26 fälschlich gespeichert');
  assert.equal(await p.locator('#f-ueb').inputValue(),'Entwurf zum Behalten');
  assert.ok(!(await p.evaluate(()=>window.__FB.store.has('users/u1/karten/k4'))));
 },
 async C27(p){
  await aktion(p,'tab-verwalten');
  await p.fill('#f-search','Stu');await p.waitForTimeout(400);
  await p.evaluate(()=>{__C.ui.selectMode=true;__C.render();});
  const alle=p.locator('[data-action="auswahl-alle"]');
  assert.equal(await alle.count(),1,'C27 Alle fehlt');
  const treffer=await p.locator('#karten-liste > [data-action="toggle-card-select"]').count();
  await alle.click();await p.waitForTimeout(300);
  assert.equal(await p.evaluate(()=>__C.ui.selectedIds.size),treffer);
  assert.equal(await alle.innerText(),'Keine');
  await alle.click();await p.waitForTimeout(300);
  assert.equal(await p.evaluate(()=>__C.ui.selectedIds.size),0);
  // Auch der Snapshot muss die Testkarten kennen; direktes Map.set umgeht
  // Firestore und hinterlaesst einen unmoeglichen Listenerstand.
  await p.evaluate(async()=>{const q=__C.quelle();const vor=q.karten[0],karten=[];for(let i=40;i<200;i++)karten.push({...vor,id:'extra'+i,order:i,bereichId:q.id});await __C.testKartenAnlegen(karten);});
  await p.waitForFunction(()=>__C.quelle().karten.length===200);
  await p.evaluate(()=>{Object.assign(__C.ui,{searchQuery:'',searchAll:false,kartenSeite:0});__C.render();});
  assert.equal(await p.locator('#karten-liste > [data-action="toggle-card-select"]').count(),100);
  const lage=await p.locator('.select-actionbar').boundingBox();
  await alle.click();await p.waitForTimeout(300);
  assert.equal(await p.evaluate(()=>__C.ui.selectedIds.size),100,'C27 ganze statt gezeigte Seite gewählt');
  const danach=await p.locator('.select-actionbar').boundingBox();assert.equal(lage.height,danach.height);
  if(p.viewportSize().width===320)await foto(p,'paket-c-C27-auswahl-320');
  await aktion(p,'seite-vor');await alle.click();await p.waitForTimeout(300);
  assert.equal(await p.evaluate(()=>__C.ui.selectedIds.size),200);
  await alle.click();await p.waitForTimeout(300);
  assert.equal(await p.evaluate(()=>__C.ui.selectedIds.size),100,'C27 andere Seite verloren');
  await p.evaluate(()=>{__C.ui.selectedIds=new Set(__C.quelle().karten.slice(0,20).map(c=>c.id));__C.render();});
  await aktion(p,'delete-selected');
  assert.equal(await p.locator('.dlg input').count(),1,'C27 20 Karten ohne getipptes Wort');
  assert.ok((await p.locator('.dlg').innerText()).includes('20 Karten'));
  await p.locator('.dlg input').fill('falsch');
  await p.getByRole('button',{name:'Endgültig löschen',exact:true}).click();await p.waitForTimeout(400);
  assert.equal(await p.evaluate(()=>__C.quelle().karten.length),200);
  await p.locator('.dlg button').last().click();await p.waitForTimeout(400);
  await aktion(p,'delete-selected');await p.locator('.dlg input').fill('Löschen');
  await p.getByRole('button',{name:'Endgültig löschen',exact:true}).click();await p.waitForTimeout(600);
  assert.equal(await p.evaluate(()=>__C.quelle().karten.length),180);
  assert.ok(!(await p.evaluate(()=>window.__FB.store.has('users/u1/karten/k0'))));
  await p.evaluate(()=>{
   const q=__C.quelle();q.karten=q.karten.slice(0,20);
   q.karten.forEach(c=>{c.uebersetzung='Auswahlprobe';c.maxStufe=0;c.rueckfaelle=0;});
   q.gefuehrt=true;q.sets=[{id:'frei',name:'Erste',art:'lektion',order:0,cardIds:q.karten.slice(0,10).map(c=>c.id)},
    {id:'zu',name:'Zweite',art:'lektion',order:1,cardIds:q.karten.slice(10).map(c=>c.id)}];
   __C.bereiche.find(b=>b.id==='b2').karten=[{...q.karten[0],id:'fremd'}];
   Object.assign(__C.ui,{searchQuery:'Auswahlprobe',searchAll:true,kartenSeite:0,selectMode:true,selectedIds:new Set()});__C.render();
  });
  assert.equal(await p.locator('#karten-liste > .card-row').count(),21);
  assert.equal(await p.locator('#karten-liste > .card-locked').count(),10);
  await alle.click();await p.waitForTimeout(300);
  assert.equal(await p.evaluate(()=>__C.ui.selectedIds.size),10,'C27 fremde oder gesperrte Karte gewählt');
  assert.ok(!(await p.evaluate(()=>__C.ui.selectedIds.has('fremd'))));
  await p.fill('#f-search','xyzq');await p.waitForTimeout(400);
  assert.ok(await alle.isDisabled(),'C27 Alle ohne sichtbare Treffer aktiv');
  assert.equal(await p.evaluate(()=>__C.ui.selectedIds.size),10,'C27 Suche verliert bestehende Auswahl');
 },
 async C22(p){
  const body=alt?execFileSync('git',['show','b60abf4:app.js'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'app.js'),'utf8');
  // Teil (a) gehört laut Doppelt-gemeldet-Liste zu F3; C prüft b/c/d.
  const css=alt?execFileSync('git',['show','b60abf4:styles.css'],{cwd:repo,encoding:'utf8'}):fs.readFileSync(path.join(repo,'styles.css'),'utf8');
  assert.ok(!/stat-kennzahl|serie-klein|legende-erklaerung/.test(css),'C22 ungenutzte Klassen');
  assert.ok(!/300er-Tag|beantwortet - Serie, heute/.test(body),'C22 veralteter Kommentar');
  await aktion(p,'tab-fortschritt');
  const svg=await p.locator('[data-action="fort-seite"][data-id="vorschau"] svg').first().innerHTML();
  assert.ok(svg.includes('rect')&&svg.includes('x1="8"'),'C22 Kalender-Symbol fehlt');
 }
};
(async()=>{
 const b=await start();
 try{
  for(const name of fall?[fall]:Object.keys(faelle)){
   for(const vp of [GERAETE.handy,{...GERAETE.handy,width:320,height:568},GERAETE.ipad,GERAETE.desktop])
    for(const thema of ['hell','dunkel']) for(const ruhig of [false,true]){
     const {p,ctx}=await seite(b,vp,{thema,ruhig});
     try{
      await faelle[name](p);
      await p.evaluate(()=>document.fonts.ready);
      assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Querscrollen');
      assert.deepEqual(p.fehler,[]);
      if(vp.width===320&&!ruhig)await foto(p,'paket-c-'+name+'-'+thema);
      console.log(name,'grün',vp.width,thema,ruhig);
     }finally{await ctx.close();}
    }
  }
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
