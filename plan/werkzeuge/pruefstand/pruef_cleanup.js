/* Nur Ressourcen dieses Testprozesses: auch alte Skripte ohne finally
   schliessen ihre frisch gestarteten Browser bei unbehandelten Fehlern. */
const {chromium}=require('playwright');
const browser=new Set(),original=chromium.launch.bind(chromium);
chromium.launch=async(...args)=>{const b=await original(...args);browser.add(b);b.on('disconnected',()=>browser.delete(b));return b;};
let endet=false;
async function fehler(e){
 if(endet)return;endet=true;console.error(e);
 await Promise.allSettled([...browser].map(b=>b.close()));
 process.exit(1);
}
process.on('uncaughtException',fehler);
process.on('unhandledRejection',fehler);
