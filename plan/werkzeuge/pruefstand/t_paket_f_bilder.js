/* F3/F12: strenger RGBA-Vergleich, keine Pixeltoleranz. Altstand 5af78a0. */
/* 05.10.2026: Software-Raster (--disable-gpu). Mit GPU-Raster schwanken auch
   Fensterfotos derselben Quelle (Verlaufs-Rauschen, Alt gegen Alt rot); das
   Messgerät muss bei gleicher Quelle gleiche Bilder liefern. Toleranz bleibt 0. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const {chromium}=require('playwright');
const {vollerStore,neueSeite,aktion}=require('./lib');
const repo=path.join(__dirname,'../../..'),out=path.join(repo,'plan/zyklus-2/paket-f-belege/bilder');
fs.mkdirSync(out,{recursive:true});
const old=f=>execFileSync('git',['show','5af78a0:'+f],{cwd:repo,encoding:'utf8'});
const mode=process.argv.includes('--alle')?'F12':'F3';
async function pixels(browser,a,b) {
 const p=await browser.newPage();
 try{return await p.evaluate(async([a,b])=>{
  const load=async s=>{const i=new Image();i.src='data:image/png;base64,'+s;await i.decode();return i;};
  const x=await load(a),y=await load(b);if(x.width!==y.width||x.height!==y.height)return -1;
  const c=document.createElement('canvas');c.width=x.width;c.height=x.height;const g=c.getContext('2d');
  g.drawImage(x,0,0);const d=g.getImageData(0,0,c.width,c.height).data;
  g.clearRect(0,0,c.width,c.height);g.drawImage(y,0,0);const e=g.getImageData(0,0,c.width,c.height).data;
  let n=0;for(let i=0;i<d.length;i+=4)if(d[i]!==e[i]||d[i+1]!==e[i+1]||d[i+2]!==e[i+2]||d[i+3]!==e[i+3])n++;
  return n;
 },[a.toString('base64'),b.toString('base64')]);}finally{await p.close();}
}
(async()=>{const browser=await chromium.launch({...(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{}),args:['--disable-gpu']});try{
 for(const width of [320,390,820])for(const thema of ['hell','dunkel'])for(const leer of [true,false]){
  const imgs=[];
  for(const alt of [true,false]){
   const {ctx,p}=await neueSeite(browser,{width,height:844,touch:true,mobile:width<500},{
    store:vollerStore({leer,thema}),ruhig:true,vorher:async ctx=>{
      await ctx.addInitScript(()=>{let s=7;Math.random=()=>{s=s*16807%2147483647;return(s-1)/2147483646;};});
      if(alt){await ctx.route('**/styles.css?*',r=>r.fulfill({contentType:'text/css',body:old('styles.css')}));
       if(mode==='F3')await ctx.route('**/app.js?*',r=>r.fulfill({contentType:'text/javascript',body:old('app.js')}));}
    }});
   try{
    await aktion(p,'tab-fortschritt');
    const shots=[];
    const capture=async name=>{await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
      const file=path.join(out,`${mode}-${width}-${thema}-${leer?'leer':'voll'}-${name}-${alt?'alt':'neu'}.png`);
      shots.push([name,await p.screenshot({path:file})]);assert.deepEqual(p.fehler,[],'Browserfehler');};
    await capture('Fortschritt');
    if(mode==='F12'){for(const [action,name]of [['tab-lernen','Lernen'],['tab-verwalten','Verwalten'],['einstellungen','Einstellungen']]){await aktion(p,action);await capture(name);}}
    imgs.push(shots);
   }finally{await ctx.close();}
  }
  assert.equal(imgs[0].length,imgs[1].length);
  for(let i=0;i<imgs[0].length;i++){const n=await pixels(browser,imgs[0][i][1],imgs[1][i][1]);
    console.log(mode,width,thema,leer?'leer':'voll',imgs[0][i][0],n+' Fehlerpixel');assert.equal(n,0,'Fotovergleich rot');}
 }
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
