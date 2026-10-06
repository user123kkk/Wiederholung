/* Diagnose zum Stilvergleich in x_paket_f_sicht.js: Welche berechnete Eigenschaft
   eines Elements schwankt zwischen zwei Läufen mit derselben Quelle? Kein Abnahmetest. */
const {start,neueSeite,GERAETE,vollerStore}=require('./lib');
const sel=process.argv[2]||'body';
(async()=>{const b=await start();try{
  const lies=async()=>{
    const {p,ctx}=await neueSeite(b,GERAETE.handy,{ruhig:true,store:vollerStore({thema:'hell'}),ls:{'adrabic-thema':'hell'}});
    try{await p.waitForTimeout(1500);
      return await p.evaluate(sel=>{const o={};for(const ps of [null,'::before','::after']){const cs=getComputedStyle(document.querySelector(sel),ps);for(let i=0;i<cs.length;i++)o[(ps||'')+' '+cs[i]]=cs.getPropertyValue(cs[i]);}return o;},sel);
    }finally{await ctx.close();}
  };
  const a=await lies(),c=await lies();
  const namen=[...new Set([...Object.keys(a),...Object.keys(c)])].filter(k=>a[k]!==c[k]);
  console.log(sel+': '+Object.keys(a).length+' Eigenschaften, verschieden: '+namen.length);
  for(const k of namen)console.log(k+'\n  A: '+String(a[k]).slice(0,200)+'\n  B: '+String(c[k]).slice(0,200));
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
