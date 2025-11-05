self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // If it's not a request for our origin, let it pass through.
  if (request.url.startsWith('http') && !request.url.startsWith(self.location.origin)) {
    return;
  }

  // For same-origin requests, fetch and add the headers.
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(request);
        const headers = new Headers(response.headers);
        headers.set('Cross-Origin-Opener-Policy', 'same-origin');
        headers.set('Cross-Origin-Embedder-Policy', 'require-corp');

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: headers,
        });
      } catch (e) {
        console.error('Service worker fetch failed:', e);
        return e;
      }
    })()
  );
});