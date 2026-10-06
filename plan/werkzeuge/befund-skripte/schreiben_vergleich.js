/* Isolierter iPad-Durchgang des echten Schreibtests. --alt verwendet den
   festen Stand vor Runde 13; identische Attrappe/Geraet/Testbewegungen. */
const path=require('node:path'),lib=require('../pruefstand/lib');
const alt=process.argv.includes('--alt');
if(alt){
 const source=require('node:child_process').execFileSync('git',['show','5de6969:app.js'],{cwd:path.join(__dirname,'../../..'),encoding:'utf8'});
 const original=lib.neueSeite;
 lib.neueSeite=(browser,viewport,opt={})=>original(browser,viewport,{...opt,vorher:ctx=>ctx.route(
  u=>u.hostname==='127.0.0.1'&&u.pathname.endsWith('/app.js'),
  r=>r.fulfill({contentType:'text/javascript',body:source}))});
}
const geraet=process.argv.includes('--handy')?'handy':'ipad';
console.log('Isoliert '+geraet+': '+(alt?'5de6969 vor Runde 13':'aktueller Stand'));
process.argv[2]=geraet;
require('../pruefstand/t_schreiben');
