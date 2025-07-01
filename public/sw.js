const CACHE_NAME = 'cv-maxime-bellet-v1.2.0';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/images/profile.jpg',
  '/images/profile.webp',
  '/cv.pdf',
  '/favicon.svg',
  '/_astro/index.css', // Ajustez selon le nom généré
  '/_astro/index.js',  // Ajustez selon le nom généré
];

// Network-first strategy for these paths
const NETWORK_FIRST = [
  '/api/',
  '//analytics.tellebma.fr/',
];

// Cache-first strategy for these paths
const CACHE_FIRST = [
  '/images/',
  '/_astro/',
  '/fonts/',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName.startsWith('cv-') && cacheName !== CACHE_NAME;
            })
            .map((cacheName) => caches.delete(cacheName))
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Network-first strategy for specific paths
  if (NETWORK_FIRST.some(path => url.pathname.startsWith(path) || url.href.includes(path))) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Cache-first strategy for assets
  if (CACHE_FIRST.some(path => url.pathname.startsWith(path))) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Default strategy: cache with network fallback
  event.respondWith(cacheWithNetworkFallback(request));
});

// Cache-first strategy
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('Cache-first strategy failed:', error);
    return new Response('Offline content not available', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network-first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Network error and no cached version available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Cache with network fallback (stale-while-revalidate)
async function cacheWithNetworkFallback(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);

  // If we have a cached version, return it immediately
  if (cachedResponse) {
    // Try to update the cache in the background
    fetch(request).then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
    }).catch(() => {
      // Network failed, but we already have cached version
    });
    
    return cachedResponse;
  }

  // No cached version, try network
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return offline page or basic error response
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Offline - CV Maxime BELLET</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: system-ui, sans-serif; 
              text-align: center; 
              padding: 2rem;
              max-width: 600px;
              margin: 0 auto;
            }
            .offline-icon { font-size: 4rem; margin-bottom: 1rem; }
            .offline-title { color: #333; margin-bottom: 1rem; }
            .offline-message { color: #666; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="offline-icon">📡</div>
          <h1 class="offline-title">Connexion interrompue</h1>
          <p class="offline-message">
            Cette page n'est pas disponible hors ligne. 
            Veuillez vérifier votre connexion internet et réessayer.
          </p>
          <button onclick="window.location.reload()">Réessayer</button>
        </body>
      </html>
    `, {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}

// Background sync for analytics
self.addEventListener('sync', (event) => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  // Implement analytics sync logic if needed
  console.log('Syncing analytics data...');
}

// Push notification handler (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/images/profile.jpg',
      badge: '/favicon.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'Voir le CV',
          icon: '/images/profile.jpg'
        },
        {
          action: 'close',
          title: 'Fermer',
          icon: '/favicon.svg'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});