let cacheName = "lessonsApp-v1";

let cacheFiles = [
  "index.html",
  "lessons.js",
  "dist/css/bootstrap.min.css",
  "img/bg.png",
  "lessonsApp.webmanifest",
  "img/icon.png",
  "img/cs.jpg",
  "img/maths.svg",
  "img/english.png",
  "img/science.png",
  "img/history.png",
  "img/business.png",
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install Learning App");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[Service Worker] Caching all the files");
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("fetch", function (e) {
  /*
  if (isCrossOrigin(e.request)) {
    return;
  }*/
  e.respondWith(
    caches.match(e.request).then(function (r) {
      // Download the file if it is not in the cache,
      return (
        r ||
        fetch(e.request).then(function (response) {
          // add the new file to cache
          return caches.open(cacheName).then(function (cache) {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
