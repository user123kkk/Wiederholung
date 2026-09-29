/* G-013: leere/blanke E-Mail lokal melden; keine Firebase-Anfrage.
   Gegenprobe im festen Stand vor Runde 13: 5de6969. */
const {start,neueSeite,aktion,GERAETE}=require('./lib');
const assert=require('node:assert/strict');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const gegenprobe=process.argv.includes('--gegenprobe');
const alt=gegenprobe?execFileSync('git',['show','5de6969:app.js'],{cwd:path.join(__dirname,'../../..'),encoding:'utf8'}):null;
(async()=>{
 const b=await start();
 try{
  const {p,ctx}=await neueSeite(b,GERAETE.handy,{user:null,vorher:alt?ctx=>ctx.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:alt})):undefined});
  await p.waitForFunction(()=>!document.querySelector('.boot'));
  await aktion(p,'einstieg-konto',null,500);await aktion(p,'mode-reset',null,500);
  const start=await p.locator('[data-action="reset"]').boundingBox();
  for(const wert of ['', '   ']){
   await p.fill('#a-email',wert);await aktion(p,'reset',null,500);
   const stand=await p.evaluate(()=>({anfragen:window.__FB.resetAnfragen||[],invalid:document.getElementById('a-email').getAttribute('aria-invalid'),fokus:document.activeElement.id}));
   if(gegenprobe)assert.ok(stand.anfragen.length>0,'Altstand muss leere Adresse an Firebase senden');
   else{
    assert.deepEqual(stand.anfragen,[]);assert.equal(stand.invalid,'true');assert.equal(stand.fokus,'a-email');
    const r=await p.locator('[data-action="reset"]').boundingBox();assert.equal(r.y,start.y,'Feldfehler verschiebt Absende-Knopf');
    assert.equal(await p.locator('#a-email-fehler').textContent(),' – bitte ausfüllen');
   }
  }
  if(!gegenprobe){
   await p.fill('#a-email',' test@example.com ');
   assert.equal(await p.locator('#a-email').getAttribute('aria-invalid'),null,'Feldfehler bleibt beim Tippen');
   await p.keyboard.press('Enter');await p.waitForTimeout(500);
   assert.deepEqual(await p.evaluate(()=>window.__FB.resetAnfragen),['test@example.com'],'Enter muss genau eine getrimmte Anfrage senden');
   assert.match(await p.locator('.auth-meldung').textContent(),/Wenn es zu dieser Adresse ein Konto gibt/);
  }
  assert.deepEqual(p.fehler,[]);console.log(gegenprobe?'OK  Gegenprobe: leere Adresse wurde an Firebase gesendet.':'OK  Leer/Whitespace lokal, Fokus/ARIA ohne Sprung, Korrektur/Enter genau einmal.');
  await ctx.close();
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
