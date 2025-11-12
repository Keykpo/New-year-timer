// ====================================
// INTERNATIONALIZATION SYSTEM
// ====================================

const translations = {
    en: {
        mainTitle: "Time Until Your New Year",
        subtitle: "Your personal countdown to 2026",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        mapTitle: "These places are already in 2026!",
        alreadyCelebrating: "Already celebrating 2026",
        stillWaiting: "Still waiting",
        footer: "Happy New Year from around the world! 🎉",
        timezoneInfo: "Your timezone: {timezone}",
        wishesTitle: "Global Wishes Wall",
        wishesSubtitle: "Leave your wish for 2026 and it will come true! ✨",
        emptyTileText: "Leave your wish for 2026 and it will come true",
        emptyTileTextPremium: "Premium wish - Top spot with golden glow!",
        emptyTileTextVIP: "VIP wish - Featured with silver shine!",
        modalTitle: "Make Your Wish",
        modalSubtitle: "Your wish will shine on the wall forever!",
        wishLabel: "Your Wish for 2026",
        authorLabel: "Your Name",
        priceLabel: "Secure your wish for:",
        paymentNote: "💳 Secure payment via PayPal. Your wish will appear instantly!",
        payButton: "Pay & Make Wish"
    },
    es: {
        mainTitle: "Tiempo Restante para tu Año Nuevo",
        subtitle: "Tu cuenta regresiva personal hacia 2026",
        days: "Días",
        hours: "Horas",
        minutes: "Minutos",
        seconds: "Segundos",
        mapTitle: "¡Estos lugares ya están en 2026!",
        alreadyCelebrating: "Ya celebrando 2026",
        stillWaiting: "Aún esperando",
        footer: "¡Feliz Año Nuevo desde todo el mundo! 🎉",
        timezoneInfo: "Tu zona horaria: {timezone}",
        wishesTitle: "Muro de Deseos Global",
        wishesSubtitle: "¡Deja tu deseo para el 2026 y se va a cumplir! ✨",
        emptyTileText: "Deja tu deseo para el 2026 y se va a cumplir",
        emptyTileTextPremium: "Deseo Premium - ¡Lugar destacado con brillo dorado!",
        emptyTileTextVIP: "Deseo VIP - ¡Destacado con brillo plateado!",
        modalTitle: "Haz Tu Deseo",
        modalSubtitle: "¡Tu deseo brillará en el muro para siempre!",
        wishLabel: "Tu Deseo para 2026",
        authorLabel: "Tu Nombre",
        priceLabel: "Asegura tu deseo por:",
        paymentNote: "💳 Pago seguro vía PayPal. ¡Tu deseo aparecerá al instante!",
        payButton: "Pagar y Hacer Deseo"
    },
    pt: {
        mainTitle: "Tempo Restante para o seu Ano Novo",
        subtitle: "Sua contagem regressiva pessoal para 2026",
        days: "Dias",
        hours: "Horas",
        minutes: "Minutos",
        seconds: "Segundos",
        mapTitle: "Estes lugares já estão em 2026!",
        alreadyCelebrating: "Já comemorando 2026",
        stillWaiting: "Ainda esperando",
        footer: "Feliz Ano Novo de todo o mundo! 🎉",
        timezoneInfo: "Seu fuso horário: {timezone}",
        wishesTitle: "Muro de Desejos Global",
        wishesSubtitle: "Deixe seu desejo para 2026 e ele se tornará realidade! ✨",
        emptyTileText: "Deixe seu desejo para 2026 e ele se tornará realidade",
        emptyTileTextPremium: "Desejo Premium - Lugar de destaque com brilho dourado!",
        emptyTileTextVIP: "Desejo VIP - Destaque com brilho prateado!",
        modalTitle: "Faça Seu Desejo",
        modalSubtitle: "Seu desejo brilhará no muro para sempre!",
        wishLabel: "Seu Desejo para 2026",
        authorLabel: "Seu Nome",
        priceLabel: "Garanta seu desejo por:",
        paymentNote: "💳 Pagamento seguro via PayPal. Seu desejo aparecerá instantaneamente!",
        payButton: "Pagar e Fazer Desejo"
    },
    fr: {
        mainTitle: "Temps Restant jusqu'à votre Nouvel An",
        subtitle: "Votre compte à rebours personnel vers 2026",
        days: "Jours",
        hours: "Heures",
        minutes: "Minutes",
        seconds: "Secondes",
        mapTitle: "Ces endroits sont déjà en 2026!",
        alreadyCelebrating: "Déjà en train de fêter 2026",
        stillWaiting: "Encore en attente",
        footer: "Bonne année du monde entier! 🎉",
        timezoneInfo: "Votre fuseau horaire: {timezone}",
        wishesTitle: "Mur des Souhaits Global",
        wishesSubtitle: "Laissez votre souhait pour 2026 et il se réalisera! ✨",
        emptyTileText: "Laissez votre souhait pour 2026 et il se réalisera",
        emptyTileTextPremium: "Souhait Premium - Place privilégiée avec éclat doré!",
        emptyTileTextVIP: "Souhait VIP - En vedette avec éclat argenté!",
        modalTitle: "Faites Votre Souhait",
        modalSubtitle: "Votre souhait brillera sur le mur pour toujours!",
        wishLabel: "Votre Souhait pour 2026",
        authorLabel: "Votre Nom",
        priceLabel: "Sécurisez votre souhait pour:",
        paymentNote: "💳 Paiement sécurisé via PayPal. Votre souhait apparaîtra instantanément!",
        payButton: "Payer et Faire un Souhait"
    }
};

// Detect browser language
function detectLanguage() {
    const browserLang = navigator.language.toLowerCase();

    // Extract the primary language code
    const langCode = browserLang.split('-')[0];

    // Return the language if we have translations, otherwise default to English
    return translations[langCode] ? langCode : 'en';
}

// Apply translations to the page
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// ====================================
// LOCAL COUNTDOWN TIMER
// ====================================

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Calculate next New Year (midnight of January 1st in user's timezone)
    const nextYear = currentYear + 1;
    const newYear = new Date(nextYear, 0, 1, 0, 0, 0);

    // Calculate time difference
    const diff = newYear - now;

    if (diff <= 0) {
        // New Year has arrived!
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update display with leading zeros
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Display user's timezone information
function displayTimezoneInfo() {
    const lang = detectLanguage();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezoneOffset = -(new Date().getTimezoneOffset() / 60);
    const offsetString = timezoneOffset >= 0 ? `+${timezoneOffset}` : `${timezoneOffset}`;

    const timezoneText = translations[lang].timezoneInfo.replace(
        '{timezone}',
        `${timezone} (UTC${offsetString})`
    );

    document.getElementById('timezoneInfo').textContent = timezoneText;
}

// ====================================
// GLOBAL MAP WITH TIMEZONES
// ====================================

/**
 * Country to Timezone Mapping
 *
 * This object maps ISO country codes to their primary timezone offset (from UTC).
 * Your SVG map should use these country codes as IDs for each <path> element.
 *
 * Format: "COUNTRY_CODE": { name: "Country Name", offset: UTC_OFFSET }
 *
 * Examples:
 * - <path id="US" d="..."/> for United States
 * - <path id="FR" d="..."/> for France
 * - <path id="AU" d="..."/> for Australia
 *
 * Note: Some countries span multiple timezones. This uses the primary/capital timezone.
 * You can add more specific regions like "US-PST", "US-EST", "RU-MSK", "RU-VLAT" if your
 * SVG map has separate paths for different regions of the same country.
 */
const countryTimezones = {
    // Pacific Islands (UTC+12 to +14)
    "KI": { name: "Kiribati", offset: 14 },          // Line Islands
    "NZ": { name: "New Zealand", offset: 13 },       // New Zealand
    "FJ": { name: "Fiji", offset: 12 },              // Fiji
    "NR": { name: "Nauru", offset: 12 },             // Nauru
    "TV": { name: "Tuvalu", offset: 12 },            // Tuvalu
    "MH": { name: "Marshall Islands", offset: 12 },  // Marshall Islands
    "WF": { name: "Wallis and Futuna", offset: 12 }, // Wallis and Futuna

    // Asia-Pacific (UTC+9 to +11)
    "AU": { name: "Australia", offset: 11 },         // Eastern Australia (Sydney)
    "SB": { name: "Solomon Islands", offset: 11 },   // Solomon Islands
    "NC": { name: "New Caledonia", offset: 11 },     // New Caledonia
    "PG": { name: "Papua New Guinea", offset: 10 },  // Papua New Guinea
    "GU": { name: "Guam", offset: 10 },              // Guam
    "JP": { name: "Japan", offset: 9 },              // Japan
    "KR": { name: "South Korea", offset: 9 },        // South Korea
    "KP": { name: "North Korea", offset: 9 },        // North Korea
    "PW": { name: "Palau", offset: 9 },              // Palau

    // Asia (UTC+5 to +8)
    "CN": { name: "China", offset: 8 },              // China
    "TW": { name: "Taiwan", offset: 8 },             // Taiwan
    "PH": { name: "Philippines", offset: 8 },        // Philippines
    "MY": { name: "Malaysia", offset: 8 },           // Malaysia
    "SG": { name: "Singapore", offset: 8 },          // Singapore
    "HK": { name: "Hong Kong", offset: 8 },          // Hong Kong
    "MO": { name: "Macau", offset: 8 },              // Macau
    "BN": { name: "Brunei", offset: 8 },             // Brunei
    "MN": { name: "Mongolia", offset: 8 },           // Mongolia
    "TH": { name: "Thailand", offset: 7 },           // Thailand
    "VN": { name: "Vietnam", offset: 7 },            // Vietnam
    "LA": { name: "Laos", offset: 7 },               // Laos
    "KH": { name: "Cambodia", offset: 7 },           // Cambodia
    "ID": { name: "Indonesia", offset: 7 },          // Indonesia (Western)
    "MM": { name: "Myanmar", offset: 6.5 },          // Myanmar
    "BD": { name: "Bangladesh", offset: 6 },         // Bangladesh
    "BT": { name: "Bhutan", offset: 6 },             // Bhutan
    "IN": { name: "India", offset: 5.5 },            // India
    "LK": { name: "Sri Lanka", offset: 5.5 },        // Sri Lanka
    "NP": { name: "Nepal", offset: 5.75 },           // Nepal
    "PK": { name: "Pakistan", offset: 5 },           // Pakistan
    "UZ": { name: "Uzbekistan", offset: 5 },         // Uzbekistan
    "TJ": { name: "Tajikistan", offset: 5 },         // Tajikistan
    "TM": { name: "Turkmenistan", offset: 5 },       // Turkmenistan
    "AF": { name: "Afghanistan", offset: 4.5 },      // Afghanistan

    // Middle East (UTC+2 to +4)
    "AE": { name: "UAE", offset: 4 },                // UAE
    "OM": { name: "Oman", offset: 4 },               // Oman
    "GE": { name: "Georgia", offset: 4 },            // Georgia
    "AM": { name: "Armenia", offset: 4 },            // Armenia
    "AZ": { name: "Azerbaijan", offset: 4 },         // Azerbaijan
    "IR": { name: "Iran", offset: 3.5 },             // Iran
    "RU": { name: "Russia", offset: 3 },             // Russia (Moscow)
    "SA": { name: "Saudi Arabia", offset: 3 },       // Saudi Arabia
    "IQ": { name: "Iraq", offset: 3 },               // Iraq
    "KW": { name: "Kuwait", offset: 3 },             // Kuwait
    "BH": { name: "Bahrain", offset: 3 },            // Bahrain
    "QA": { name: "Qatar", offset: 3 },              // Qatar
    "YE": { name: "Yemen", offset: 3 },              // Yemen
    "KE": { name: "Kenya", offset: 3 },              // Kenya
    "ET": { name: "Ethiopia", offset: 3 },           // Ethiopia
    "SO": { name: "Somalia", offset: 3 },            // Somalia
    "IL": { name: "Israel", offset: 2 },             // Israel
    "PS": { name: "Palestine", offset: 2 },          // Palestine
    "JO": { name: "Jordan", offset: 2 },             // Jordan
    "LB": { name: "Lebanon", offset: 2 },            // Lebanon
    "SY": { name: "Syria", offset: 2 },              // Syria
    "EG": { name: "Egypt", offset: 2 },              // Egypt
    "ZA": { name: "South Africa", offset: 2 },       // South Africa
    "BW": { name: "Botswana", offset: 2 },           // Botswana
    "ZW": { name: "Zimbabwe", offset: 2 },           // Zimbabwe
    "MZ": { name: "Mozambique", offset: 2 },         // Mozambique
    "GR": { name: "Greece", offset: 2 },             // Greece
    "RO": { name: "Romania", offset: 2 },            // Romania
    "BG": { name: "Bulgaria", offset: 2 },           // Bulgaria
    "TR": { name: "Turkey", offset: 3 },             // Turkey
    "UA": { name: "Ukraine", offset: 2 },            // Ukraine
    "FI": { name: "Finland", offset: 2 },            // Finland

    // Europe (UTC+0 to +2)
    "FR": { name: "France", offset: 1 },             // France
    "DE": { name: "Germany", offset: 1 },            // Germany
    "IT": { name: "Italy", offset: 1 },              // Italy
    "ES": { name: "Spain", offset: 1 },              // Spain
    "PT": { name: "Portugal", offset: 0 },           // Portugal
    "PL": { name: "Poland", offset: 1 },             // Poland
    "NL": { name: "Netherlands", offset: 1 },        // Netherlands
    "BE": { name: "Belgium", offset: 1 },            // Belgium
    "CH": { name: "Switzerland", offset: 1 },        // Switzerland
    "AT": { name: "Austria", offset: 1 },            // Austria
    "CZ": { name: "Czech Republic", offset: 1 },     // Czech Republic
    "SK": { name: "Slovakia", offset: 1 },           // Slovakia
    "HU": { name: "Hungary", offset: 1 },            // Hungary
    "SI": { name: "Slovenia", offset: 1 },           // Slovenia
    "HR": { name: "Croatia", offset: 1 },            // Croatia
    "BA": { name: "Bosnia", offset: 1 },             // Bosnia
    "RS": { name: "Serbia", offset: 1 },             // Serbia
    "ME": { name: "Montenegro", offset: 1 },         // Montenegro
    "MK": { name: "North Macedonia", offset: 1 },    // North Macedonia
    "AL": { name: "Albania", offset: 1 },            // Albania
    "SE": { name: "Sweden", offset: 1 },             // Sweden
    "NO": { name: "Norway", offset: 1 },             // Norway
    "DK": { name: "Denmark", offset: 1 },            // Denmark
    "GB": { name: "United Kingdom", offset: 0 },     // UK
    "IE": { name: "Ireland", offset: 0 },            // Ireland
    "IS": { name: "Iceland", offset: 0 },            // Iceland

    // Africa (UTC-1 to +3)
    "MA": { name: "Morocco", offset: 0 },            // Morocco
    "DZ": { name: "Algeria", offset: 1 },            // Algeria
    "TN": { name: "Tunisia", offset: 1 },            // Tunisia
    "LY": { name: "Libya", offset: 2 },              // Libya
    "SD": { name: "Sudan", offset: 2 },              // Sudan
    "NG": { name: "Nigeria", offset: 1 },            // Nigeria
    "GH": { name: "Ghana", offset: 0 },              // Ghana
    "CI": { name: "Ivory Coast", offset: 0 },        // Ivory Coast
    "SN": { name: "Senegal", offset: 0 },            // Senegal
    "ML": { name: "Mali", offset: 0 },               // Mali
    "NE": { name: "Niger", offset: 1 },              // Niger
    "TD": { name: "Chad", offset: 1 },               // Chad
    "CM": { name: "Cameroon", offset: 1 },           // Cameroon
    "AO": { name: "Angola", offset: 1 },             // Angola
    "ZM": { name: "Zambia", offset: 2 },             // Zambia
    "TZ": { name: "Tanzania", offset: 3 },           // Tanzania
    "UG": { name: "Uganda", offset: 3 },             // Uganda
    "RW": { name: "Rwanda", offset: 2 },             // Rwanda
    "MG": { name: "Madagascar", offset: 3 },         // Madagascar

    // Americas (UTC-10 to -3)
    "US": { name: "United States", offset: -5 },     // USA (Eastern)
    "CA": { name: "Canada", offset: -5 },            // Canada (Eastern)
    "MX": { name: "Mexico", offset: -6 },            // Mexico (Central)
    "BR": { name: "Brazil", offset: -3 },            // Brazil (Brasilia)
    "AR": { name: "Argentina", offset: -3 },         // Argentina
    "CL": { name: "Chile", offset: -3 },             // Chile
    "PE": { name: "Peru", offset: -5 },              // Peru
    "CO": { name: "Colombia", offset: -5 },          // Colombia
    "VE": { name: "Venezuela", offset: -4 },         // Venezuela
    "EC": { name: "Ecuador", offset: -5 },           // Ecuador
    "BO": { name: "Bolivia", offset: -4 },           // Bolivia
    "PY": { name: "Paraguay", offset: -4 },          // Paraguay
    "UY": { name: "Uruguay", offset: -3 },           // Uruguay
    "GY": { name: "Guyana", offset: -4 },            // Guyana
    "SR": { name: "Suriname", offset: -3 },          // Suriname
    "GF": { name: "French Guiana", offset: -3 },     // French Guiana
    "PA": { name: "Panama", offset: -5 },            // Panama
    "CR": { name: "Costa Rica", offset: -6 },        // Costa Rica
    "NI": { name: "Nicaragua", offset: -6 },         // Nicaragua
    "HN": { name: "Honduras", offset: -6 },          // Honduras
    "GT": { name: "Guatemala", offset: -6 },         // Guatemala
    "BZ": { name: "Belize", offset: -6 },            // Belize
    "SV": { name: "El Salvador", offset: -6 },       // El Salvador
    "CU": { name: "Cuba", offset: -5 },              // Cuba
    "JM": { name: "Jamaica", offset: -5 },           // Jamaica
    "HT": { name: "Haiti", offset: -5 },             // Haiti
    "DO": { name: "Dominican Republic", offset: -4 },// Dominican Republic
    "PR": { name: "Puerto Rico", offset: -4 },       // Puerto Rico

    // Special regions (if you want to handle US/Canada/Russia timezones separately)
    "US-EST": { name: "US Eastern", offset: -5 },
    "US-CST": { name: "US Central", offset: -6 },
    "US-MST": { name: "US Mountain", offset: -7 },
    "US-PST": { name: "US Pacific", offset: -8 },
    "US-AKST": { name: "Alaska", offset: -9 },
    "US-HST": { name: "Hawaii", offset: -10 },
    "RU-MSK": { name: "Moscow", offset: 3 },
    "RU-VLAT": { name: "Vladivostok", offset: 10 },
    "RU-KRAT": { name: "Krasnoyarsk", offset: 7 },
    "CA-EST": { name: "Canada Eastern", offset: -5 },
    "CA-CST": { name: "Canada Central", offset: -6 },
    "CA-MST": { name: "Canada Mountain", offset: -7 },
    "CA-PST": { name: "Canada Pacific", offset: -8 }
};

/**
 * Colors countries in the SVG map based on whether they've entered the new year
 */
function updateMap() {
    // Get the SVG element inside #world-map
    const worldMapContainer = document.getElementById('world-map');

    if (!worldMapContainer) {
        console.warn('World map container not found. Make sure you have a div with id="world-map"');
        return;
    }

    const svg = worldMapContainer.querySelector('svg');

    if (!svg) {
        console.warn('No SVG found inside #world-map. Please paste your SVG map inside the #world-map div.');
        return;
    }

    // Get current UTC time
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const newYearUTC = new Date(Date.UTC(nextYear, 0, 1, 0, 0, 0));

    // Find all path elements with IDs (countries)
    const paths = svg.querySelectorAll('path[id], g[id]');

    if (paths.length === 0) {
        console.warn('No paths with IDs found in the SVG. Make sure your country paths have id attributes like id="US", id="FR", etc.');
        return;
    }

    // Process each country path
    paths.forEach(path => {
        const countryCode = path.id.toUpperCase();

        // Check if we have timezone data for this country
        if (countryTimezones[countryCode]) {
            const country = countryTimezones[countryCode];

            // Calculate if this timezone has already entered the new year
            // New Year happens at different times in UTC depending on timezone offset
            const timezoneNewYear = new Date(newYearUTC.getTime() - (country.offset * 60 * 60 * 1000));
            const hasCelebrated = now >= timezoneNewYear;

            // Apply color classes
            path.classList.remove('celebrating', 'waiting');
            path.classList.add('country-path');

            if (hasCelebrated) {
                path.classList.add('celebrating');
            } else {
                path.classList.add('waiting');
            }

            // Add or update tooltip
            let title = path.querySelector('title');
            if (!title) {
                title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                path.appendChild(title);
            }

            const offsetString = country.offset >= 0 ? `+${country.offset}` : `${country.offset}`;
            const status = hasCelebrated ? '🎉 Already in 2026!' : '⏳ Still waiting...';
            title.textContent = `${country.name} (UTC${offsetString})\n${status}`;

            // Add cursor pointer style
            path.style.cursor = 'pointer';
        } else {
            // Country not in our timezone database - apply default styling
            path.classList.add('country-path', 'waiting');
            path.style.cursor = 'default';
        }
    });

    console.log(`Updated ${paths.length} countries on the map`);
}

// ====================================
// FIREBASE CONFIGURATION
// ====================================

/**
 * INSTRUCTIONS: Replace these with your own Firebase credentials
 * 
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project (or use existing)
 * 3. Go to Project Settings > General
 * 4. Scroll down to "Your apps" and click "Web" (</>) to add a web app
 * 5. Copy the firebaseConfig object and paste it below
 * 6. Enable "Realtime Database" in Firebase Console
 * 7. Set database rules to:
 *    {
 *      "rules": {
 *        "wishes": {
 *          ".read": true,
 *          ".write": true
 *        }
 *      }
 *    }
 */

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
let database;
try {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
}

// ====================================
// WISHES WALL SYSTEM
// ====================================

const PREMIUM_SLOTS = 5;  // First 5 slots - $50 each
const VIP_SLOTS = 5;      // Next 5 slots - $20 each
const INITIAL_REGULAR_SLOTS = 10; // Initial regular slots - $1 each
let totalSlots = PREMIUM_SLOTS + VIP_SLOTS + INITIAL_REGULAR_SLOTS; // Dynamic total
let currentSlot = null;
let currentPrice = 1;
let wishes = {};

/**
 * Get the price for a slot
 */
function getSlotPrice(slot) {
    if (slot <= PREMIUM_SLOTS) return 50;
    if (slot <= PREMIUM_SLOTS + VIP_SLOTS) return 20;
    return 1;
}

/**
 * Get the tier for a slot
 */
function getSlotTier(slot) {
    if (slot <= PREMIUM_SLOTS) return 'premium';
    if (slot <= PREMIUM_SLOTS + VIP_SLOTS) return 'vip';
    return 'regular';
}

/**
 * Initialize wishes wall
 */
function initWishesWall() {
    createWishesGrid();
    setupModal();
    loadWishesFromFirebase();
    setupCharCounter();
}

/**
 * Create the wish tiles with dynamic pricing
 */
function createWishesGrid() {
    const grid = document.getElementById('wishesGrid');
    grid.innerHTML = ''; // Clear existing tiles
    const lang = detectLanguage();

    for (let i = 1; i <= totalSlots; i++) {
        const tile = document.createElement('div');
        const tier = getSlotTier(i);
        const price = getSlotPrice(i);

        tile.className = `wish-tile empty ${tier}`;
        tile.dataset.slot = i;

        // Get appropriate text based on tier
        let tileText = translations[lang].emptyTileText;
        if (tier === 'premium') {
            tileText = translations[lang].emptyTileTextPremium;
        } else if (tier === 'vip') {
            tileText = translations[lang].emptyTileTextVIP;
        }

        tile.innerHTML = `
            <div class="wish-tile-empty-content">
                <p class="wish-tile-phrase">${tileText}</p>
                <p class="wish-tile-price">$${price} USD</p>
            </div>
        `;
        tile.addEventListener('click', () => handleTileClick(i));
        grid.appendChild(tile);
    }
}

/**
 * Handle tile click
 */
function handleTileClick(slot) {
    if (wishes[slot]) {
        // Tile already occupied, don't open modal
        return;
    }

    currentSlot = slot;
    currentPrice = getSlotPrice(slot);
    openModal();
}

/**
 * Setup modal
 */
function setupModal() {
    const modal = document.getElementById('wishModal');
    const closeBtn = document.getElementById('modalClose');
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Open modal
 */
function openModal() {
    const modal = document.getElementById('wishModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Clear form
    document.getElementById('wishText').value = '';
    document.getElementById('wishAuthor').value = '';
    document.getElementById('charCount').textContent = '0';

    // Update price display
    const priceElement = document.querySelector('.price-amount');
    if (priceElement) {
        priceElement.textContent = `$${currentPrice} USD`;
    }

    // Initialize PayPal button with current price
    initPayPalButton();
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('wishModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentSlot = null;
    currentPrice = 1;
}

/**
 * Setup character counter
 */
function setupCharCounter() {
    const textarea = document.getElementById('wishText');
    const counter = document.getElementById('charCount');
    
    textarea.addEventListener('input', () => {
        counter.textContent = textarea.value.length;
    });
}

/**
 * Initialize PayPal Button
 * 
 * INSTRUCTIONS FOR PAYPAL INTEGRATION:
 * 
 * 1. Go to https://developer.paypal.com/
 * 2. Create a PayPal Business account (or use existing)
 * 3. Go to Dashboard > My Apps & Credentials
 * 4. Create a new app to get your Client ID
 * 5. Replace "YOUR_PAYPAL_CLIENT_ID" in index.html with your actual Client ID
 * 6. For PRODUCTION: Replace sandbox URL with live URL and use production client ID
 * 
 * The PayPal button will handle the payment and call onApprove when successful
 */
function initPayPalButton() {
    const container = document.getElementById('paypal-button-container');
    container.innerHTML = ''; // Clear existing button
    
    // Check if PayPal SDK is loaded
    if (typeof paypal === 'undefined') {
        console.error('PayPal SDK not loaded. Make sure you added the PayPal script tag.');
        // Show fallback button
        document.getElementById('paymentButton').style.display = 'block';
        return;
    }
    
    paypal.Buttons({
        createOrder: function(data, actions) {
            // Validate form before creating order
            const wishText = document.getElementById('wishText').value.trim();
            const author = document.getElementById('wishAuthor').value.trim();

            if (!wishText || !author) {
                alert('Please fill in both your wish and your name');
                return;
            }

            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: currentPrice.toFixed(2),
                        currency_code: 'USD'
                    },
                    description: `New Year 2026 Wish - $${currentPrice} Slot`
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Payment successful!
                handleSuccessfulPayment();
            });
        },
        onError: function(err) {
            console.error('PayPal Error:', err);
            alert('Payment failed. Please try again.');
        }
    }).render('#paypal-button-container');
}

/**
 * Handle successful payment
 */
function handleSuccessfulPayment() {
    const wishText = document.getElementById('wishText').value.trim();
    const author = document.getElementById('wishAuthor').value.trim();

    if (!wishText || !author || !currentSlot) {
        alert('Error: Missing wish data');
        return;
    }

    const wish = {
        text: wishText,
        author: author,
        slot: currentSlot,
        price: currentPrice,
        timestamp: Date.now()
    };

    // Save to Firebase
    saveWishToFirebase(wish);

    // If it's a $1 slot (regular), generate a new slot
    if (currentPrice === 1) {
        totalSlots++;
        // Regenerate the grid to add the new slot
        setTimeout(() => {
            createWishesGrid();
            updateWishesDisplay();
        }, 500);
    }

    // Close modal
    closeModal();

    // Show success message
    alert('🎉 Your wish has been saved! It will shine on the wall forever!');
}

/**
 * Save wish to Firebase
 */
function saveWishToFirebase(wish) {
    if (!database) {
        console.error('Firebase not initialized');
        return;
    }

    // Save wish
    database.ref(`wishes/${wish.slot}`).set({
        text: wish.text,
        author: wish.author,
        price: wish.price,
        timestamp: wish.timestamp
    }).then(() => {
        console.log('Wish saved successfully');
    }).catch((error) => {
        console.error('Error saving wish:', error);
    });

    // Update total slots count in Firebase for synchronization
    database.ref('config/totalSlots').set(totalSlots);
}

/**
 * Load wishes from Firebase
 */
function loadWishesFromFirebase() {
    if (!database) {
        console.error('Firebase not initialized');
        return;
    }

    // Listen for total slots changes
    database.ref('config/totalSlots').on('value', (snapshot) => {
        const firebaseTotalSlots = snapshot.val();
        if (firebaseTotalSlots && firebaseTotalSlots !== totalSlots) {
            totalSlots = firebaseTotalSlots;
            createWishesGrid();
        }
    });

    // Listen for wishes changes in real-time
    database.ref('wishes').on('value', (snapshot) => {
        wishes = snapshot.val() || {};
        updateWishesDisplay();
    });
}

/**
 * Update wishes display
 */
function updateWishesDisplay() {
    Object.keys(wishes).forEach(slot => {
        const wish = wishes[slot];
        const tile = document.querySelector(`[data-slot="${slot}"]`);

        if (tile && wish) {
            const tier = getSlotTier(parseInt(slot));
            tile.className = `wish-tile occupied ${tier}`;
            tile.innerHTML = `
                <div class="wish-tile-content">
                    <p class="wish-text">"${wish.text}"</p>
                    <p class="wish-author">- ${wish.author}</p>
                </div>
            `;
            // Remove click handler for occupied tiles
            tile.style.cursor = 'default';
            tile.onclick = null;
        }
    });
}

// ====================================
// INITIALIZATION
// ====================================

function init() {
    // 1. Detect and apply language
    const userLanguage = detectLanguage();
    applyTranslations(userLanguage);

    // 2. Display timezone information
    displayTimezoneInfo();

    // 3. Initialize countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 4. Initialize map
    updateMap();
    setInterval(updateMap, 60000);

    // 5. Initialize wishes wall
    initWishesWall();
}

// Start everything when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
