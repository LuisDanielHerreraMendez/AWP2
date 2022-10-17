// asignar nombre y version cache 

const CACHE_NAME='V1_CAHCE_AWP';

var urlToCache=[
    './',
    './css/style.css',
    './assets/1.jpg',
    './assets/2.jpg',
    './assets/logo.png',
    './assets/Superleggera.png'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
            return cache.addAll(urlToCache)
                .then( () => {
                    self.skipWaiting();
            })
        })
        .catch(err => {
            console.log('NO SE HA REGISTRADO EL CACHE', err);
        })
    )
});

// Evento activate
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
              .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheNames => {
                        if(cacheWhiteList.indexOf(cacheName) === -1) {
                            // Borrar los elementos que no se necesitan
                            return caches.delete(cacheName);
                    }
                })
            );
        })
        .then( () => {
            // Activar la cache
            self.clients.claim();
        })
    );
})

// Evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
              .then(res => {
                if(res) {
                // Devuelvo los datos desde cache
                return res;
            }
            return fetch(e.request);
        })
    );
})