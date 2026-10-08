/* F1/F9: echte SDK-Startabrufe, ohne Konto/Anmeldung; Altstand fest 5af78a0. */
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const {start} = require('./lib');
const repo = path.join(__dirname,'../../..');
(async () => {
  const browser = await start();
  const text = process.argv.includes('--gegenprobe')
    ? execFileSync('git',['show','5af78a0:datenschutzerklaerung.html'],{cwd:repo,encoding:'utf8'})
    : fs.readFileSync(path.join(repo,'datenschutzerklaerung.html'),'utf8');
  try {
    const measured = new Set();
    for (const mobile of [false,true]) {
      const ctx = await browser.newContext({serviceWorkers:'block',isMobile:mobile,hasTouch:mobile,
        viewport:{width:mobile?390:1440,height:844},
        ...(mobile ? {userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1'} : {})});
      const p = await ctx.newPage(), hosts = new Set(), errors = [];
      p.on('request',r => { const h = new URL(r.url()).hostname; if(h !== '127.0.0.1') hosts.add(h); });
      p.on('requestfailed',r => errors.push(r.url()+' '+r.failure().errorText));
      await p.goto('http://127.0.0.1:'+(process.env.PRUEF_PORT||8099)+'/index.html'); await p.waitForTimeout(9000);
      console.log(JSON.stringify({mobile,hosts:[...hosts].sort(),errors}));
      assert(hosts.has('www.gstatic.com'),'Echtes Firebase-SDK nicht angefordert');
      if (errors.length) throw new Error('Startabrufe unvollständig: '+errors.join('; '));
      for (const h of hosts) measured.add(h);
      await ctx.close();
    }
    for (const h of measured) assert(text.includes(h),'Datenschutz nennt Host nicht: '+h);
    assert(!text.includes('eine Sache von außen'));
    assert(text.includes('IndexedDB') && text.includes('Kopie deiner Lerninhalte'));
    assert(!text.includes('Die einzige weitere Speicherung'));
    assert(!text.includes('Feedback-Board'));
    assert(text.includes('→ Sichern &amp; einspielen'));
    assert(text.includes('außer den in Punkt 5 und 6 genannten Fällen'));
    console.log('F1/F9 Abnahme grün');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
