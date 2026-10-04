const {start}=require('./lib');
(async()=>{const b=await start();try{const c=await b.newBrowserCDPSession();console.log((await c.send('Tracing.getCategories')).categories.filter(x=>/gpu|angle|skia|viz|cc.*debug/i.test(x)).join('\n'));}finally{await b.close();}})();
