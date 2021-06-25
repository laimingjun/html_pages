importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");
var cacheStorageKey = 'minimal-pwa-4'
var cacheList=[
  '/',
  'index.html',
  'main.css',
  'logo192.png',
  'https://cdn.bootcdn.net/ajax/libs/vue/3.1.1/vue.cjs.js'
]


self.addEventListener('install',e =>{
  console.log('install')
  e.waitUntil(
    caches.open(cacheStorageKey)
    .then(cache => cache.addAll(cacheList))
    .then(() => self.skipWaiting())
  )
})

// 设置缓存
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response != null) {
        console.log(response)
        return response
      }
      return fetch(e.request.url)
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
      Promise.all([
          // 更新客户端
          self.clients.claim(),

          // 清理旧版本
          caches.keys().then(function (cacheList) {
              return Promise.all(
                  cacheList.map(function (cacheName) {
                      if (cacheName !== 'cachev1') {
                          return caches.delete(cacheName);
                      }
                  })
              );
          })
      ])
  );
});