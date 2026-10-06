/* A10/A11: echte App, feste Gegenprobe c4b1c30. Der SDK-Schreibvorgang
   bleibt offen; die echten 12 Sekunden werden nicht abgekuerzt. */
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { APP, AUTH, FS } = require('./stubs');
const { start, vollerStore } = require('./lib');
const { seiteMitApp } = require('./text_lib');
const alt = process.argv.includes('--gegenprobe');
for(const [name,source] of Object.entries({APP,AUTH,FS})){
  const r=spawnSync(process.execPath,['--input-type=module','--check'],{input:source,encoding:'utf8',windowsHide:true});
  assert.ifError(r.error);assert.equal(r.status,0,name+': '+r.stderr);
}
const zusatz = `formular:()=>{ui.einstellungen=true;ui.seite='feedback';ui.feedbackForm=true;feedbackListe=[];render();},
  netz:(aus)=>{offline=aus;render();},einreichen:feedbackEinreichen,
  schreiben:()=>schreibeInsNutzerdokument({'settings.thema':settings.thema}),
  zustand:()=>({busy:feedbackEinreichtWird,danke:feedbackDanke,entwurf:feedbackEntwurf,anz:feedbackListe.length}),`;
(async()=>{
  const b = await start();
  try {
    const {ctx,p} = await seiteMitApp(b,vollerStore(),{commit:alt?'c4b1c30':null,zusatz});
    try {
      await p.evaluate(async()=>{window.__FB.fail=true;await window.__PRUEF.schreiben();await window.__PRUEF.schreiben();});
      await p.locator('#dlg-title').filter({hasText:'Nicht gespeichert'}).waitFor();
      const text=await p.locator('.dlg').innerText();
      assert.equal(text.includes('versucht es weiter'),alt);
      if(!alt)assert.match(text,/Versuch die letzte Änderung noch einmal zu speichern/);
      await p.locator('[data-action="dlg-ok"]').click();
      await p.evaluate(()=>{void window.__PRUEF.schreiben();});
      await p.waitForTimeout(200);
      assert.equal(await p.locator('.dlg').count(),0,'gleicher Fehler oeffnet nicht erneut');
      assert.match(await p.locator('#app').innerText(),/Versuch die letzte Änderung noch einmal zu speichern/);
      await p.evaluate(()=>{window.__FB.fail=false;window.__PRUEF.formular();window.__PRUEF.netz(true);});
      const submit=p.locator('[data-action="feedback-submit"]');
      assert.equal(await submit.isDisabled(),!alt);
      if(!alt)assert.match(await p.locator('#app').innerText(),/Zum Einreichen brauchst du eine Verbindung/);
      await p.locator('#fb-text').fill('Neutrale Testidee');
      await p.locator('#fb-beschreibung').fill('Entwurf bleibt erhalten');
      if(!alt){await p.evaluate(()=>{void window.__PRUEF.einreichen();});assert.equal(await p.evaluate(()=>window.__FB.addDocAufrufe||0),0,'Offline-Sperre gilt auch fuer Funktion');}
      await p.evaluate(()=>{window.__PRUEF.netz(false);window.__FB.addDocHaengt=true;});
      await p.locator('#fb-text').fill('Neutrale Testidee');
      await p.locator('#fb-beschreibung').fill('Entwurf bleibt erhalten');
      await submit.click();
      assert.equal(await submit.isDisabled(),true);
      await p.waitForTimeout(12500);
      const z=await p.evaluate(()=>window.__PRUEF.zustand());
      assert.equal(z.busy,alt,'Zeitlimit gibt den Knopf frei');
      assert.equal(z.entwurf.text,'Neutrale Testidee');
      assert.equal(z.entwurf.beschreibung,'Entwurf bleibt erhalten');
      if(!alt){
        assert.equal(z.anz,0);assert.equal(z.danke,false);
        assert.equal(await p.locator('#dlg-title').innerText(),'Nicht gespeichert');
        await p.locator('[data-action="dlg-ok"]').click();
        assert.equal(await submit.isDisabled(),false);
        await p.evaluate(()=>window.__FB.addDocFreigeben());
        await p.waitForTimeout(250);
        assert.deepEqual(await p.evaluate(()=>window.__PRUEF.zustand()),z,'Spaete Bestaetigung aendert die Oberflaeche nicht');
      }
      assert.deepEqual(p.fehler,[]);
      console.log('OK '+(alt?'Gegenprobe: falsche Zusage, Offline offen, nach 12s weiter busy':'Meldungen gleich; offline gesperrt; nach 12s bedienbar, Entwurf erhalten; spaete Antwort ohne UI-Wirkung'));
    }finally{await ctx.close();}
    const zweite=await seiteMitApp(b,vollerStore(),{commit:alt?'c4b1c30':null,zusatz});
    try{
      await zweite.p.evaluate(async()=>{sessionStorage.setItem('adrabic-token-erneuert-schreiben','1');window.__FB.fail=true;await window.__PRUEF.schreiben();await window.__PRUEF.schreiben();});
      await zweite.p.locator('#dlg-title').filter({hasText:'Nicht gespeichert'}).waitFor();
      const dialog=await zweite.p.locator('.dlg').innerText();
      assert.equal(dialog.includes('versucht es weiter'),alt);
      if(!alt)assert.match(dialog,/Lade eine Sicherung herunter, bevor du weiterlernst/);
      await zweite.p.locator('[data-action="dlg-ok"]').click();
      await zweite.p.evaluate(()=>window.__PRUEF.schreiben());
      // F8/Z13 (3.18.17): „Sicherung“ statt „Backup“; der Altstand c4b1c30 sagt weiter „Backup“.
      assert.match(await zweite.p.locator('#app').innerText(),alt?/Lade ein Backup herunter, bevor du weiterlernst/:/Lade eine Sicherung herunter, bevor du weiterlernst/);
      assert.deepEqual(zweite.p.fehler,[]);
      console.log('OK dauerhafte Ablehnung: '+(alt?'Gegenprobe verspricht weiter falschen Retry':'Dialog und Banner nennen die Sicherung'));
    }finally{await zweite.ctx.close();}
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
