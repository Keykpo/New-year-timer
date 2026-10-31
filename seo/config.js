'use strict';

module.exports = {
    siteUrl: 'https://newyeartimers.com',
    siteName: 'New Year Timers',
    // Year being counted down to. Bump it right after 1 January and run `npm run seo:build`.
    year: 2027,
    gaId: 'G-DDQQ66PTTN',
    adsenseClient: 'ca-pub-7982216026691433',
    ogImage: { url: '/og-image.jpg', width: 1024, height: 904, type: 'image/jpeg' },

    // Only languages with fully localized, reviewed content belong here.
    // The 16 UI translations in script.js stay available through ?lang=xx, but those
    // URLs serve the same English HTML, so they are not exposed to search engines.
    languages: {
        en: {
            locale: 'en-US', ogLocale: 'en_US',
            home: '/',
            hub: '/countdown/',
            country: slug => `/countdown/${slug}/`
        },
        es: {
            locale: 'es-ES', ogLocale: 'es_ES',
            home: '/es/',
            hub: '/es/cuenta-regresiva/',
            country: slug => `/es/cuenta-regresiva/${slug}/`
        }
    },
    defaultLanguage: 'en',

    // Static pages that are not generated but must appear in the sitemap.
    staticPages: [
        { path: '/about.html', file: 'about.html' },
        { path: '/blog/', file: 'blog/index.html' },
        { glob: 'blog', base: '/blog/' }
    ],

    // Cities shown in the "what time is it elsewhere" table, per language.
    referenceZones: {
        en: [
            ['America/New_York', 'New York'], ['America/Los_Angeles', 'Los Angeles'],
            ['America/Mexico_City', 'Mexico City'], ['America/Sao_Paulo', 'São Paulo'],
            ['Europe/London', 'London'], ['Europe/Paris', 'Paris'],
            ['Asia/Dubai', 'Dubai'], ['Asia/Kolkata', 'New Delhi'],
            ['Asia/Tokyo', 'Tokyo'], ['Australia/Sydney', 'Sydney']
        ],
        es: [
            ['Europe/Madrid', 'Madrid'], ['America/Mexico_City', 'Ciudad de México'],
            ['America/Bogota', 'Bogotá'], ['America/Lima', 'Lima'],
            ['America/Santiago', 'Santiago de Chile'], ['America/Argentina/Buenos_Aires', 'Buenos Aires'],
            ['America/New_York', 'Nueva York'], ['Europe/London', 'Londres'],
            ['Asia/Tokyo', 'Tokio'], ['Australia/Sydney', 'Sídney']
        ]
    }
};
