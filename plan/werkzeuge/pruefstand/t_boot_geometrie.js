/* Loading-Pruefung: statisches Startbild gegen HTML, ohne Firebase.
   Die Pixelmessung begrenzt sich auf das Zeichen (Schriften sind OS-abhaengig). */
const {start,OUT} = require('./lib');
const fs = require('fs'), path = require('path');
const assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname,'../../../index.html'),'utf8');
const version = /const APP_VERSION = "([0-9.]+)";/.exec(fs.readFileSync(path.join(__dirname,'../../../app.js'),'utf8'))?.[1];
assert.ok(version,'APP_VERSION fehlt');
const startLinks = [...html.matchAll(/rel="apple-touch-startup-image"[^>]+href="([^"]+)"/g)].map(x=>x[1]);
assert.equal(startLinks.length,31,'31 Startbild-Links erwartet');
assert.ok(startLinks.every(x=>x.endsWith('?v='+version)),'Startbilder ohne aktuelle Versionsadresse');
(async()=>{
  const b=await start();
  try {
    for(const [w,h,d] of [[390,844,3],[375,667,2],[820,1180,2],[1180,820,2]]){
      const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:d,isMobile:true,hasTouch:true});
      const p=await ctx.newPage();
      await p.route('**/www.gstatic.com/**',()=>{});
      const link = startLinks.find(x=>x.startsWith(`./splash/splash-${w*d}x${h*d}.png?`));
      assert.ok(link,`${w}x${h}: Startbild-Link fehlt`);
      assert.equal((await p.request.get(new URL(link,'http://127.0.0.1:8099/index.html').href)).status(),200,'Startbild unter Versionsadresse nicht erreichbar');
      await p.goto('http://127.0.0.1:8099/index.html');
      await p.addStyleTag({content:'*,*::before,*::after{animation-play-state:paused!important;animation-delay:0s!important}.boot__linie{visibility:hidden!important}'});
      const lage=await p.evaluate(()=>{const r=document.querySelector('.boot__zeichen').getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height};});
      const png=await p.screenshot({path:path.join(OUT,`boot-${w}x${h}.png`)});
      const alt=fs.readFileSync(path.join(__dirname,`../../../splash/splash-${w*d}x${h*d}.png`));
      const pixel=await p.evaluate(async([a,b,w,h,d])=>{
        async function bbox(src){const img=new Image();img.src=src;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const x=c.getContext('2d');x.drawImage(img,0,0);const dat=x.getImageData(0,0,c.width,c.height).data;let minX=Infinity,minY=Infinity,maxX=0,maxY=0;
          for(let y=Math.floor((h/2-80)*d);y<(h/2+65)*d;y++)for(let xx=Math.floor((w/2-65)*d);xx<(w/2+65)*d;xx++){const i=(y*c.width+xx)*4;if(dat[i]>170&&dat[i+1]>170&&dat[i+2]>160){minX=Math.min(minX,xx);maxX=Math.max(maxX,xx);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}}
          return [minX/d,minY/d,(maxX+1)/d,(maxY+1)/d];}
        return {splash:await bbox(a),html:await bbox(b)};
      },['data:image/png;base64,'+alt.toString('base64'),'data:image/png;base64,'+png.toString('base64'),w,h,d]);
      console.log(JSON.stringify({geraet:`${w}x${h}`,lage,pixel}));
      assert.equal(lage.w,76,'Boot-Zeichen fehlt oder hat falsche Groesse');
      for(let i=0;i<4;i++) {
        assert.ok(Number.isFinite(pixel.splash[i]) && Number.isFinite(pixel.html[i]),'Zeichen nicht gefunden');
        assert.ok(Math.abs(pixel.splash[i]-pixel.html[i])<=1,`${w}x${h}: Startbild und HTML versetzt`);
      }
      await ctx.close();
    }
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
