/* H1: vorhandenes Kartenblatt aus der Runde. Firebase-Attrappe,
   echte DOM-Klicks; feste Gegenprobe gegen Produktcommit 00c66031. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const {start,neueSeite,vollerStore,foto} = require('./lib');
const alt = process.argv.includes('--gegenprobe');
const source = alt ? execFileSync('git',['show','00c66031:app.js'],{encoding:'utf8'}) : fs.readFileSync(path.join(__dirname,'../../../app.js'),'utf8');
const quelle = source + `
window.__rundeTest={
  start:art=>{if(art==='lernen')startSession();else startDrillWithCards(currentBereich().karten.slice(4,6),'Prüfung',art==='schreiben');ui.session.queue=['k4','k5'];ui.session.total=2;render();},
  stand:()=>JSON.parse(JSON.stringify({session:ui.session,verlauf,tab:ui.tab,bereich:ui.bereichId})),
  karte:id=>JSON.parse(JSON.stringify(findCard(id))),
  update:(id,v)=>fb.updateDoc(fb.doc(kartenColRef,id),v),
  del:id=>fb.deleteDoc(fb.doc(kartenColRef,id)),
  gefuehrt:v=>{currentBereich().gefuehrt=v;render();},
  text:v=>{findCard('k4').textId=v;render();},
  zeichnen:render
};`;
const button='[data-action="runde-karte-bearbeiten"]';
const click=(p,a)=>p.locator('[data-action="'+a+'"]').filter({visible:true}).first().click();
const stand=p=>p.evaluate(()=>__rundeTest.stand());
const ruhigesBild=p=>p.evaluate(async()=>{await document.fonts.ready;for(const a of document.getAnimations())if(Number.isFinite(a.effect?.getComputedTiming().endTime))a.finish();});
async function schmuggel(p,id){await p.evaluate(id=>{const e=document.createElement('button');e.dataset.action='runde-karte-bearbeiten';e.dataset.id=id;document.getElementById('app').append(e);e.click();e.remove();},id);}
(async()=>{
 const b=await start();let n=0;
 try{
  for(const art of ['lernen','ueben','schreiben'])for(const hell of [false,true]){
   const store=vollerStore({thema:hell?'hell':'dunkel'});
   store['users/u1'].settings.arabGroesse='sehrgross';
   store['users/u1/karten/k4'].extra='Notiz 12: كِتَابٌ';
   const {ctx,p}=await neueSeite(b,{width:hell?390:320,height:844,mobile:true,touch:true},{store,hell,ruhig:hell,
    vorher:ctx=>ctx.route(u=>u.hostname==='127.0.0.1'&&u.pathname.endsWith('/app.js'),r=>r.fulfill({contentType:'text/javascript',body:quelle}))});
   try{
    await p.evaluate(art=>__rundeTest.start(art),art);
    await p.waitForTimeout(700);
    await ruhigesBild(p);
    const topVor=await p.locator('.study-flaeche').evaluate(e=>e.getBoundingClientRect().top);
    if(process.argv.includes('--geometrie'))await foto(p,'runde-geometrie-'+(alt?'alt':'neu')+'-vor',true);
    assert.equal(await p.locator(button).count(),0,'kein Stift vor Aufdecken');
    await schmuggel(p,'k4');assert.equal(await p.locator('#f-wort').count(),0,'keine Umgehung vor Aufdecken');
    // Der normale Aufdecken-Weg, bei Handschrift die vorhandene Fertig-Aktion.
    await click(p,'reveal');
    await p.waitForTimeout(700);
    await ruhigesBild(p);
    const topNach=await p.locator('.study-flaeche').evaluate(e=>e.getBoundingClientRect().top);
    if(process.argv.includes('--geometrie')){await foto(p,'runde-geometrie-'+(alt?'alt':'neu')+'-nach',true);console.log(JSON.stringify({quelle:alt?'00c66031':'Arbeitsbaum',topVor,topNach}));return;}
    assert.equal(await p.locator(button).count(),1,'Stift nach Aufdecken fehlt');
    if(art!=='schreiben')assert.ok(Math.abs(topNach-topVor)<=1,'Karte bleibt beim Aufdecken stehen: '+topVor+' / '+topNach);
    const vor=await stand(p),karte=await p.evaluate(()=>__rundeTest.karte('k4'));
    await schmuggel(p,'k5');assert.equal(await p.locator('#f-wort').count(),0,'nur aktuelle Karte');
    const r=await p.locator(button).boundingBox();assert.ok(r.width>=44&&r.height>=44&&r.x>=0&&r.x+r.width<=p.viewportSize().width,'Stift erreichbar, mindestens 44 px');
    const kontrast=await p.locator(button).evaluate(el=>{
      const rgb=s=>s.match(/[\d.]+/g).map(Number),lin=x=>(x/=255)<=0.04045?x/12.92:((x+0.055)/1.055)**2.4;
      const lum=c=>0.2126*lin(c[0])+0.7152*lin(c[1])+0.0722*lin(c[2]);
      let e=el,bg;while(e){const c=rgb(getComputedStyle(e).backgroundColor);if(c.length===3||c[3]===1){bg=c;break;}e=e.parentElement;}
      if(!bg)throw Error('kein deckender Hintergrund');
      const a=lum(rgb(getComputedStyle(el.querySelector('svg')).color)),b=lum(bg);return(Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
    });assert.ok(kontrast>=3,'Stiftsymbol mindestens 3:1');
    await p.locator(button).click();
    assert.equal(await p.locator('#f-wort').inputValue(),karte.wort);
    assert.equal(await p.evaluate(()=>document.activeElement.id),'f-wort');
    assert.deepEqual(await stand(p),vor,'Öffnen verändert Runde nicht');
    await p.locator('#f-wort').fill('كِتَابٌ 12');
    await p.locator('#f-ueb').fill('Buch 12');
    await p.locator('#f-extra').fill('Notiz 12: كُتُبٌ');
    if(n===0)await foto(p,'runde-bearbeiten-320-blatt',true);
    await click(p,'submit-card');await p.waitForTimeout(180);
    assert.equal(await p.locator('#f-wort').count(),0);
    assert.deepEqual(await stand(p),vor,'Speichern verändert Runde/Zähler nicht');
    const nach=await p.evaluate(()=>__rundeTest.karte('k4'));
    assert.equal(nach.wort,'كِتَابٌ 12');assert.equal(nach.uebersetzung,'Buch 12');assert.equal(nach.extra,'Notiz 12: كُتُبٌ');
    for(const k of ['stufe','nextReview','ersteBewertung','maxStufe'])assert.equal(nach[k],karte[k]);
    assert.equal(await p.evaluate(()=>document.activeElement.dataset.action),'runde-karte-bearbeiten','Fokus zurück auf Stift');
    if(n===0){await p.waitForTimeout(3200);await foto(p,'runde-bearbeiten-320-karte',true);}
    await p.locator(button).click();await p.locator('#f-extra').fill('verwerfen');await click(p,'karte-sheet-zu');
    assert.deepEqual(await stand(p),vor);assert.equal((await p.evaluate(()=>__rundeTest.karte('k4'))).extra,nach.extra);
    await p.locator(button).click();await p.keyboard.press('Escape');
    await p.locator('#f-wort').waitFor({state:'hidden'});
    assert.equal(await p.locator('#f-wort').count(),0,'unverändert Escape ohne Nachfrage');
    await p.locator(button).click();await p.locator('#f-extra').fill('Entwurf');await p.keyboard.press('Escape');
    await p.getByText('Änderungen verwerfen?',{exact:true}).waitFor();
    assert.ok(await p.getByText('Änderungen verwerfen?',{exact:true}).isVisible());
    await p.getByRole('button',{name:'Abbrechen',exact:true}).last().click();
    assert.equal(await p.locator('#f-extra').inputValue(),'Entwurf');
    await p.evaluate(()=>__rundeTest.update('k4',{stufe:7,maxStufe:7}));await p.waitForTimeout(180);
    assert.equal(await p.locator('#f-extra').inputValue(),'Entwurf','fremder Snapshot erhält Eingabe');
    await click(p,'submit-card');await p.waitForTimeout(180);
    assert.equal((await p.evaluate(()=>__rundeTest.karte('k4'))).stufe,7,'Notiz überschreibt fremde Bewertung nicht');
    assert.deepEqual(await stand(p),vor);
    await p.evaluate(()=>__rundeTest.gefuehrt(true));assert.equal(await p.locator(button).count(),0);
    await schmuggel(p,'k4');assert.equal(await p.locator('#f-wort').count(),0,'geführte Karte geschützt');
    await p.evaluate(()=>{__rundeTest.gefuehrt(false);__rundeTest.text('geschuetzter-text');});assert.equal(await p.locator(button).count(),0);
    await schmuggel(p,'k4');assert.equal(await p.locator('#f-wort').count(),0,'Textprobelauf geschützt');
    if(n===0){
      await p.evaluate(()=>__rundeTest.text(null));
      await p.locator('.btn-known').click();await click(p,'reveal');
      const weiter=await stand(p);assert.ok(weiter.session.lastAction,'vorhandenes Undo');
      await p.locator(button).click();await p.locator('#f-extra').fill('Notiz zweite Karte');await click(p,'submit-card');
      assert.deepEqual(await stand(p),weiter,'bestehendes Undo und nächste Karte bleiben erhalten');
      await click(p,'undo-grade');assert.equal((await stand(p)).session.queue[0],'k4');
      if(!(await stand(p)).session.revealed)await click(p,'reveal');await p.locator(button).click();
      const punkt=await p.evaluate(()=>{for(let y=6;y<innerHeight;y+=12)for(let x=6;x<innerWidth;x+=24)if(document.elementFromPoint(x,y)?.classList.contains('dlg-backdrop'))return[x,y];});
      assert.ok(punkt);await p.mouse.click(...punkt);await p.locator('#f-wort').waitFor({state:'hidden'});
      await p.locator(button).click();await p.locator('#f-extra').fill('nicht verlieren');
      await p.evaluate(()=>__rundeTest.del('k4'));await p.waitForTimeout(180);await click(p,'submit-card');
      assert.ok(await p.getByText('Karte gelöscht',{exact:true}).isVisible());
      assert.equal(await p.locator('#f-extra').inputValue(),'nicht verlieren','gelöschte Karte: Entwurf bleibt');
      await p.evaluate(()=>{__FB.user=null;for(const cb of __FB.authListeners)cb(null);});
      await p.locator('#f-wort').waitFor({state:'hidden'});await schmuggel(p,'k5');
      assert.equal(await p.locator('#f-wort').count(),0,'Kontowechsel räumt Blatt und Sitzung auf');
      console.log('GRÜN Folgekarte, vorhandenes Undo, daneben schließen, Löschen und Kontowechsel');
    }
    assert.deepEqual(p.fehler,[]);n++;console.log('GRÜN '+art+' '+(hell?'hell/390/reduziert':'dunkel/320')+': Editor, Rückkehr, Fokus, Entwurf, Snapshot und Schutz; Stiftkontrast '+kontrast.toFixed(2)+':1');
   }finally{await ctx.close();}
  }
  console.log(n+' Konfigurationen grün; Quelle '+(alt?'00c66031':'Arbeitsbaum')+' SHA256 '+require('node:crypto').createHash('sha256').update(source.replace(/\r\n/g,'\n')).digest('hex'));
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
