const CACHE='heat-control-demo-v021-login';
const ASSETS=['./','./index.html','./style.css?v=0.2.1','./app.js?v=0.2.1','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(ASSETS);await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const request=event.request;
  if(request.mode==='navigate'){
    event.respondWith((async()=>{
      try{const response=await fetch(request,{cache:'no-store'});const cache=await caches.open(CACHE);cache.put('./index.html',response.clone());return response;}
      catch(error){return (await caches.match('./index.html'))||Response.error();}
    })());
    return;
  }
  event.respondWith((async()=>{
    const cached=await caches.match(request);
    if(cached) return cached;
    try{const response=await fetch(request);if(response.ok){const cache=await caches.open(CACHE);cache.put(request,response.clone());}return response;}
    catch(error){return cached||Response.error();}
  })());
});
