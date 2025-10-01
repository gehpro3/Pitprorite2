const CACHE_NAME = 'blackjack-trainer-v2';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/services/geminiService.ts',
  '/components/Card.tsx',
  '/components/GameBoard.tsx',
  '/components/PlayerHand.tsx',
  '/components/ActionFeedback.tsx',
  '/components/StatsTracker.tsx',
  '/components/Chip.tsx',
  '/utils/chipCalculator.ts',
  '/utils/deck.ts',
  '/utils/handCalculator.ts',
  '/components/CardCountingPractice.tsx',
  '/components/ChipPayoutPractice.tsx',
  '/components/GiniasGroove.tsx',
  '/components/HitStandPractice.tsx',
  '/components/VirginiaRules.tsx',
  '/components/DealerTalkPractice.tsx',
  '/components/Tutorial.tsx',
  '/components/GameRules.tsx',
  '/components/AuditionPractice.tsx',
  '/components/PayoutChart.tsx',
  '/components/BasicStrategyChart.tsx',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdn.pixabay.com/audio/2022/03/10/audio_517983195b.mp3',
  'https://cdn.pixabay.com/audio/2024/02/22/audio_4d98c257b4.mp3',
  'https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c74438.mp3',
  'https://cdn.pixabay.com/audio/2022/03/15/audio_2931a29522.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE).catch(err => {
            console.error('Failed to cache initial assets:', err);
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
    // Exclude Gemini API calls from caching
    if (event.request.url.includes('generativelanguage.googleapis.com')) {
        return event.respondWith(fetch(event.request));
    }
  
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            if (response) {
                return response;
            }

            return fetch(event.request).then(
                (response) => {
                    // Check if we received a valid response. Don't cache opaque responses (from no-cors requests to CDNs) or errors.
                    if (!response || response.status !== 200 || response.type === 'error') {
                        return response;
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                    .then((cache) => {
                        // Use the full URL as the key for CDN assets
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }
            );
        })
    );
});
