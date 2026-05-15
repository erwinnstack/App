// Planner PWA - Service Worker
const CACHE_NAME = 'planner-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

// Install: cache assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// Push: show notification from push event (future use with push server)
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: '📅 Planner', body: 'Ai o alertă!' };
  e.waitUntil(
    self.registration.showNotification(data.title || '📅 Planner', {
      body: data.body || '',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-96.png',
      vibrate: [200, 100, 200],
      data: data
    })
  );
});

// Notification click: focus or open app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length > 0) return list[0].focus();
      return clients.openWindow('/');
    })
  );
});

// Message from main thread: schedule a local notification via SW
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_NOTIF') {
    const { label, isoDateTime } = e.data;
    const ms = new Date(isoDateTime).getTime() - Date.now();
    if (ms <= 0) return;
    setTimeout(() => {
      self.registration.showNotification('📅 Planner', {
        body: label,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-96.png',
        vibrate: [200, 100, 200],
        tag: label + isoDateTime, // prevent duplicates
        renotify: false
      });
    }, ms);
  }
});
