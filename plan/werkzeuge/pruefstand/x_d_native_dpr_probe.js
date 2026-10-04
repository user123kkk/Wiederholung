/* Diagnose: native Browser-Pixelskala an die vorhandene DPR-2-Matrix binden.
   Kein Produktfix, keine Assertion ändern; originaler Rundgang bleibt bestehen. */
const {chromium}=require('playwright');
const lib=require('./lib');
lib.start=()=>chromium.launch({executablePath:process.env.CHROMIUM,args:['--force-device-scale-factor=2']});
require('./x_paket_d_fotos');
