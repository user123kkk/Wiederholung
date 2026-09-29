/* Testdaten muessen auch nachts den Lerntag ab 04:00 verwenden. */
const assert=require('node:assert/strict');
const {tag}=require('./lib');
const Echt=Date;
try{
  for(const[stunde,minute,soll]of [[0,0,'2026-09-28'],[3,59,'2026-09-28'],[4,0,'2026-09-29'],[23,59,'2026-09-29']]){
    const zeit=new Echt(2026,8,29,stunde,minute).getTime();
    global.Date=class extends Echt{constructor(...a){super(...(a.length?a:[zeit]));}static now(){return zeit;}};
    assert.equal(tag(0),soll);assert.equal(tag(-1),soll==='2026-09-28'?'2026-09-27':'2026-09-28');
    assert.equal(tag(1),soll==='2026-09-28'?'2026-09-29':'2026-09-30');
    console.log(`OK  Pruefdatum ${stunde}:${String(minute).padStart(2,'0')} -> ${soll}, auch +/-1 Tag.`);
  }
}finally{global.Date=Echt;}
