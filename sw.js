const C='azhar-heroes-v11';
const ASSETS=['./','index.html','grade1.html','grade2.html','grade3.html','grade4.html','grade5.html','grade6.html','grade7.html','grade8.html','grade9.html','kg.html','manifest.webmanifest','kg.webmanifest','icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(ASSETS.map(url=>c.add(url).catch(()=>null)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res}).catch(()=>caches.match('index.html'))))});
