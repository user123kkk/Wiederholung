/* Diagnose: Mindestkachelhöhe 448 gegen historische Fotos und rote 256-Spur.
   Endanimationen, Aufnahmeparameter und strenge Assertion bleiben unverändert.
   Filter ist nur Diagnose; dieser Lauf ist keine gesamte Fotoabnahme. */
const {chromium}=require('playwright');
const lib=require('./lib');
lib.start=()=>chromium.launch({executablePath:process.env.CHROMIUM,args:['--min-height-for-gpu-raster-tile=448']});
require('./x_paket_d_fotos');
