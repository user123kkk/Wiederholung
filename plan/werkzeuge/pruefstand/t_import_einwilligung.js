/* DATEN-4: Widerruf -> eigene Sicherung, normale Konten und manipulierter
   geteilter Satz. Testtexte stammen aus den bestehenden neutralen Fixtures.
   Gegenprobe fest c4b1c30 / 3.18.10; keine Produktionskonten. */
const assert = require('node:assert/strict');
const { start } = require('./lib');
const { seiteMitApp, textStore, storeLesen, BETREIBER_UID } = require('./text_lib');
const alt = process.argv.includes('--gegenprobe');
const zusatz = `sicherung:()=>JSON.parse(JSON.stringify({bereiche})),
  widerrufen:()=>texteWiderrufen(),
  importieren:(d,code)=>code?codeEinloesen('AB234-CD567'):verarbeiteImportDaten(d),
  einwilligung:()=>texteEinwilligung,`;
function texte(store, uid) {
  return { zeilen: Object.entries(store).filter(([k,v])=>k.startsWith('users/'+uid+'/karten/') && v.textId).length,
    texte: Object.entries(store).filter(([k])=>k.startsWith('users/'+uid+'/bereiche/')).flatMap(([,v])=>Object.values(v.sets||{})).filter(s=>s.art==='text').length };
}
(async()=>{
  const browser=await start();
  try {
    let backup;
    const st=textStore(); st['users/u1'].texteEinwilligung='2026-09-01';
    const {ctx,p}=await seiteMitApp(browser,st,{uid:BETREIBER_UID,commit:alt?'c4b1c30':null,zusatz});
    try {
      backup=await p.evaluate(()=>window.__PRUEF.sicherung());
      await p.evaluate(()=>{window.__PRUEF.widerrufen().then(()=>window.__WIDERRUF_FERTIG=true);});
      await p.locator('[data-action="dlg-ok"]').click();
      await p.waitForFunction(()=>window.__WIDERRUF_FERTIG);
      assert.deepEqual(texte(await storeLesen(p),BETREIBER_UID),{zeilen:0,texte:0});
      assert.equal(await p.evaluate(()=>window.__PRUEF.einwilligung()),null);
      console.log('OK echte Widerrufs-Funktion: Texte weg, Einwilligung null, Sicherung davor erfasst.');
    } finally {await ctx.close();}
    for(const fall of ['abgelehnt','einverstanden','normales-konto','geteilt']) {
      const uid=fall==='normales-konto'?'u1':BETREIBER_UID;
      const store=textStore();
      for(const key of Object.keys(store))if(key.includes('/karten/z'))delete store[key];
      delete store['users/u1/bereiche/b1'].sets.t1;
      store['users/u1'].texteEinwilligung=null;
      store['geteilteLektionen/AB234-CD567']={inhalt:structuredClone(backup)};
      const {ctx,p}=await seiteMitApp(browser,store,{uid,commit:alt?'c4b1c30':null,zusatz});
      try {
        await p.evaluate(([data,code])=>{window.__PRUEF.importieren(data,code).then(()=>window.__IMPORT_FERTIG=true);},[backup,fall==='geteilt']);
        if(fall==='geteilt')await p.locator('[data-action="dlg-ok"]').click();
        if(!alt && ['abgelehnt','einverstanden'].includes(fall)) {
          await p.locator('.dlg').filter({hasText:'Texte speichern'}).waitFor();
          await p.locator('[data-action="'+(fall==='einverstanden'?'dlg-ok':'dlg-cancel')+'"]').click();
        }
        await p.waitForFunction(()=>window.__IMPORT_FERTIG);
        await p.waitForTimeout(250);
        const saved=await storeLesen(p),anz=texte(saved,uid);
        assert.deepEqual(anz,alt||fall==='einverstanden'?{zeilen:10,texte:1}:{zeilen:0,texte:0});
        assert.equal(Object.keys(saved).filter(k=>k.startsWith('users/'+uid+'/karten/')&&!saved[k].textId).length,80,'Karten trotz Text-Ausschluss eingespielt');
        if(!alt && fall==='einverstanden')assert.ok(saved['users/'+uid].texteEinwilligung);
        if(!alt && fall!=='einverstanden')assert.match(await p.locator('.dlg').innerText(),/Texte wurden nicht eingespielt/);
        assert.deepEqual(p.fehler,[]);
        console.log('OK '+fall+': '+JSON.stringify(anz)+(alt?' (Gegenprobe: ohne neue Einwilligung)':''));
      } finally {await ctx.close();}
    }
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
