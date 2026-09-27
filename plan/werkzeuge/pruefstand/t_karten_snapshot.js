/* G-037: einzelne Cloud-Aenderungen, eigenes Echo und Strukturwechsel.
   Echte App mit Firebase-Attrappe; Zugriff nur im nicht ausgelieferten Test. */
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const { start, neueSeite, vollerStore, GERAETE, tag } = require('./lib');
const quelle = fs.readFileSync(path.join(__dirname, '../../../app.js'), 'utf8') + `
window.__kartenTest = { bereiche:()=>bereiche, roh:()=>rohKarten,
  frei:()=>[...offeneLektionIds(bereiche[0])],
  update:(id,werte)=>fb.updateDoc(fb.doc(kartenColRef,id),werte),
  del:id=>fb.deleteDoc(fb.doc(kartenColRef,id)),
  add:(id,werte)=>fb.setDoc(fb.doc(kartenColRef,id),werte) };
`;
(async () => {
  const browser = await start();
  try {
    const store = vollerStore();
    const {ctx,p} = await neueSeite(browser, GERAETE.handy, {store,
      vorher:ctx=>ctx.route(u=>u.hostname==='127.0.0.1' && u.pathname.endsWith('/app.js'),
        r=>r.fulfill({contentType:'text/javascript',body:quelle}))});
    const update = async (id,v) => { await p.evaluate(([id,v])=>__kartenTest.update(id,v),[id,v]); await p.waitForTimeout(100); };
    await p.evaluate(()=>{window.__altBereich=__kartenTest.bereiche()[0];window.__altKarte=__altBereich.karten.find(c=>c.id==='k4');});
    await update('k4',{stufe:7,maxStufe:7});
    assert.deepEqual(await p.evaluate(()=>({gleich:__altBereich===__kartenTest.bereiche()[0], stufe:__kartenTest.bereiche()[0].karten.find(c=>c.id==='k4').stufe})),{gleich:true,stufe:7});
    console.log('ok fremde Bewertung uebernommen, Bereich nicht neu aufgebaut');
    await p.evaluate(()=>{const c=__kartenTest.bereiche()[0].karten.find(c=>c.id==='k4');c.stufe=8;c.maxStufe=8;window.__echoKarte=c;});
    await update('k4',{stufe:8,maxStufe:8});
    assert.equal(await p.evaluate(()=>__echoKarte===__kartenTest.bereiche()[0].karten.find(c=>c.id==='k4')),true);
    console.log('ok eigenes Echo behaelt das bereits bewertete Kartenobjekt');
    await update('k4',{uebersetzung:'Geaendert',extra:'Notiz',quelleId:'quelle'});
    await p.evaluate(()=>__kartenTest.update('k4',{extra:{__del:true},quelleId:{__del:true}}));
    await p.waitForTimeout(100);
    assert.deepEqual(await p.evaluate(()=>{const c=__kartenTest.bereiche()[0].karten.find(c=>c.id==='k4'),r=__kartenTest.roh().find(c=>c.id==='k4');return [c.uebersetzung,c.extra,c.quelleId,Object.hasOwn(r,'extra')];}),['Geaendert','',null,false]);
    console.log('ok geaenderter Inhalt und entfernte optionale Felder');
    await update('k4',{order:-1});
    assert.equal(await p.evaluate(()=>__kartenTest.bereiche()[0].karten[0].id),'k4');
    console.log('ok Sortieren verwendet den vollstaendigen Aufbau');
    await p.evaluate(()=>__kartenTest.del('k4')); await p.waitForTimeout(100);
    assert.equal(await p.evaluate(()=>__kartenTest.bereiche()[0].karten.some(c=>c.id==='k4')),false);
    await p.evaluate(v=>__kartenTest.add('neu',v),{...store['users/u1/karten/k4'],nextReview:tag(0)}); await p.waitForTimeout(100);
    assert.equal(await p.evaluate(()=>__kartenTest.bereiche()[0].karten.some(c=>c.id==='neu')),true);
    console.log('ok Loeschen und Anlegen');
    await update('neu',{bereichId:'nicht-vorhanden'});
    assert.equal(await p.evaluate(()=>__kartenTest.bereiche()[0].karten.some(c=>c.id==='neu')),false);
    await update('neu',{stufe:9,maxStufe:9});
    await update('neu',{bereichId:'b1'});
    assert.equal(await p.evaluate(()=>__kartenTest.bereiche()[0].karten.find(c=>c.id==='neu').stufe),9);
    console.log('ok Verschieben und verwaiste Karten');
    assert.deepEqual(p.fehler,[]);
    await ctx.close();
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
