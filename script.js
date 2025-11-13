// ====================================
// NEW YEAR'S TIMER 2026 - MAIN SCRIPT
// ====================================
// World map SVG is loaded externally from 'BlankMap-World.svg' for better performance

// ====================================
// SECURITY & SANITIZATION
// ====================================

/**
 * Sanitize HTML to prevent XSS attacks
 * Escapes special characters that could be used for XSS
 */
function sanitizeHTML(str) {
    if (!str) return '';

    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Validate and sanitize wish text
 * - Removes scripts, HTML tags, and dangerous content
 * - Limits length
 * - Trims whitespace
 */
function sanitizeWishText(text) {
    if (!text || typeof text !== 'string') return '';

    // Trim and limit length
    text = text.trim().substring(0, 100);

    // Remove any HTML tags and escape special characters
    text = sanitizeHTML(text);

    // Remove any potentially dangerous patterns
    text = text
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/<script/gi, '')
        .replace(/<\/script>/gi, '');

    return text;
}

/**
 * Validate and sanitize author name
 * - Removes scripts, HTML tags, and dangerous content
 * - Limits length
 * - Ensures only safe characters
 */
function sanitizeAuthorName(name) {
    if (!name || typeof name !== 'string') return '';

    // Trim and limit length
    name = name.trim().substring(0, 15);

    // Remove any HTML tags and escape special characters
    name = sanitizeHTML(name);

    // Only allow letters, numbers, spaces, and basic punctuation
    name = name.replace(/[^a-zA-Z0-9\s\-_.,!?]/g, '');

    return name;
}

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
        wishesTitle: "Wishes Constellation",
        wishesSubtitle: "Leave your wish for 2026 and it will come true! ✨",
        emptyTileTextFounder: "Founder Wish shines here 👑",
        emptyTileTextConstellation: "Constellation Wish ✨",
        emptyTileTextStar: "Star Wish ⭐",
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
        wishesTitle: "Constelación de Deseos",
        wishesSubtitle: "¡Deja tu deseo para el 2026 y se va a cumplir! ✨",
        emptyTileTextFounder: "Deseo Fundador brilla aquí 👑",
        emptyTileTextConstellation: "Deseo Constelación ✨",
        emptyTileTextStar: "Deseo Estrella ⭐",
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
        wishesTitle: "Constelação de Desejos",
        wishesSubtitle: "Deixe seu desejo para 2026 e ele se tornará realidade! ✨",
        emptyTileTextFounder: "Desejo Fundador brilha aqui 👑",
        emptyTileTextConstellation: "Desejo Constelação ✨",
        emptyTileTextStar: "Desejo Estrela ⭐",
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
        wishesTitle: "Constellation de Souhaits",
        wishesSubtitle: "Laissez votre souhait pour 2026 et il se réalisera! ✨",
        emptyTileTextFounder: "Souhait Fondateur brille ici 👑",
        emptyTileTextConstellation: "Souhait Constellation ✨",
        emptyTileTextStar: "Souhait Étoile ⭐",
        modalTitle: "Faites Votre Souhait",
        modalSubtitle: "Votre souhait brillera sur le mur pour toujours!",
        wishLabel: "Votre Souhait pour 2026",
        authorLabel: "Votre Nom",
        priceLabel: "Sécurisez votre souhait pour:",
        paymentNote: "💳 Paiement sécurisé via PayPal. Votre souhait apparaîtra instantanément!",
        payButton: "Payer et Faire un Souhait"
    }
};

// Detect language based on timezone and browser settings
function detectLanguage() {
    // Get user's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Spanish-speaking timezones
    const spanishTimezones = [
        'America/Mexico_City', 'America/Cancun', 'America/Tijuana', 'America/Monterrey',
        'America/Buenos_Aires', 'America/Cordoba', 'America/Mendoza',
        'America/Bogota', 'America/Lima', 'America/Santiago',
        'America/Caracas', 'America/La_Paz', 'America/Asuncion',
        'America/Montevideo', 'America/Guayaquil', 'America/Santo_Domingo',
        'America/Havana', 'America/Guatemala', 'America/Tegucigalpa',
        'America/Managua', 'America/San_Jose', 'America/Panama',
        'Europe/Madrid', 'Atlantic/Canary', 'Africa/Ceuta'
    ];

    // Portuguese-speaking timezones
    const portugueseTimezones = [
        'America/Sao_Paulo', 'America/Fortaleza', 'America/Recife',
        'America/Manaus', 'America/Belem', 'America/Rio_Branco',
        'Europe/Lisbon', 'Atlantic/Azores', 'Atlantic/Madeira'
    ];

    // French-speaking timezones
    const frenchTimezones = [
        'Europe/Paris', 'Europe/Brussels', 'Europe/Luxembourg',
        'America/Montreal', 'America/Toronto', 'Indian/Reunion',
        'Africa/Abidjan', 'Africa/Dakar', 'America/Cayenne'
    ];

    // Check timezone first for more accurate detection
    if (spanishTimezones.includes(timezone)) {
        return 'es';
    }
    if (portugueseTimezones.includes(timezone)) {
        return 'pt';
    }
    if (frenchTimezones.includes(timezone)) {
        return 'fr';
    }

    // Fallback to browser language
    const browserLang = navigator.language.toLowerCase();
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
}

// ====================================
// LAZY LOADING - MAP INTERSECTION OBSERVER
// ====================================

let mapLoaded = false;
let mapUpdateInterval = null;

/**
 * Load and inject the world map SVG dynamically
 */
async function loadWorldMap() {
    if (mapLoaded) return; // Prevent loading twice

    const worldMapContainer = document.getElementById('world-map');
    if (!worldMapContainer) {
        console.warn('World map container (#world-map) not found');
        return;
    }

    try {
        // Fetch the SVG from external file
        const response = await fetch('BlankMap-World.svg');
        if (!response.ok) {
            throw new Error(`Failed to load map: ${response.status}`);
        }

        const svgText = await response.text();

        // Remove loading placeholder
        const placeholder = worldMapContainer.querySelector('.map-loading-placeholder');
        if (placeholder) {
            placeholder.remove();
        }

        // Inject the SVG into the container
        worldMapContainer.innerHTML = svgText;

        mapLoaded = true;

        // Initialize map coloring immediately after loading
        setTimeout(() => {
            updateMap();

            // Set up interval to update map colors every minute
            if (mapUpdateInterval) clearInterval(mapUpdateInterval);
            mapUpdateInterval = setInterval(updateMap, 60000);
        }, 100);
    } catch (error) {
        console.error('❌ Error loading world map:', error);

        // Check if it's a CORS error (common when opening file:// locally)
        const isCORSError = error.message.includes('Failed to fetch') ||
                           error.message.includes('CORS') ||
                           window.location.protocol === 'file:';

        if (isCORSError) {
            worldMapContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #fbbf24; background: rgba(251, 146, 60, 0.1); border-radius: 1rem; border: 2px solid rgba(251, 146, 60, 0.3);">
                    <h3 style="margin-bottom: 1rem; font-size: 1.2rem;">🗺️ Map Loading Blocked</h3>
                    <p style="margin-bottom: 1rem; color: #cbd5e1;">To see the interactive world map, you need to run a local server.</p>

                    <div style="text-align: left; max-width: 500px; margin: 1.5rem auto; padding: 1rem; background: rgba(15, 23, 42, 0.6); border-radius: 0.5rem;">
                        <p style="font-weight: 600; margin-bottom: 0.5rem; color: #fbbf24;">Windows:</p>
                        <code style="display: block; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 0.25rem; color: #10b981;">
                            Double-click start-server.bat
                        </code>

                        <p style="font-weight: 600; margin: 1rem 0 0.5rem; color: #fbbf24;">Mac/Linux:</p>
                        <code style="display: block; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 0.25rem; color: #10b981;">
                            ./start-server.sh
                        </code>
                    </div>

                    <p style="font-size: 0.9rem; color: #94a3b8;">Then open: <strong style="color: #60a5fa;">http://localhost:8000</strong></p>
                </div>
            `;
        } else {
            worldMapContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #ef4444;">
                    <p>⚠️ Error loading world map: ${error.message}</p>
                    <p style="margin-top: 1rem; font-size: 0.9rem; color: #94a3b8;">Please check the console for details.</p>
                </div>
            `;
        }
    }
}

/**
 * Setup Intersection Observer for lazy loading the map
 */
function setupMapLazyLoading() {
    const mapSection = document.querySelector('.map-section');

    if (!mapSection) {
        console.warn('Map section not found');
        return;
    }

    // Create Intersection Observer with options
    const observerOptions = {
        root: null, // viewport
        rootMargin: '200px', // Load 200px before entering viewport
        threshold: 0 // Trigger as soon as any part is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !mapLoaded) {
                // Map section is about to be visible - load it!
                loadWorldMap();

                // Stop observing once loaded
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(mapSection);
}

// ====================================
// FIREBASE CONFIGURATION
// ====================================

/**
 * Firebase configuration is now loaded from config.js
 * See config.js for setup instructions
 */

// Initialize Firebase
let database;
try {
    if (typeof FIREBASE_CONFIG !== 'undefined') {
        // Check if Firebase is already configured
        if (FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') {
            console.warn('⚠️ Firebase not configured. Please update config.js with your Firebase credentials');
        } else {
            firebase.initializeApp(FIREBASE_CONFIG);
            database = firebase.database();
        }
    } else {
        console.error('❌ Firebase configuration not found. Make sure config.js is loaded');
    }
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// ====================================
// WISHES WALL SYSTEM
// ====================================

// Pricing tiers - 3 tiers for constellation design
const TIERS = {
    founder: {
        name: 'founder',
        price: 49.99,
        slotStart: 1,
        maxSlots: 1, // Only 1 Founder wish in the center
        icon: '👑'
    },
    constellation: {
        name: 'constellation',
        price: 19.99,
        slotStart: 1,
        maxSlots: 8, // 8 hexagons around the center
        icon: '💎'
    },
    star: {
        name: 'star',
        price: 1.99,
        slotStart: 1,
        maxSlots: Infinity, // Unlimited stars in slider
        icon: '⭐'
    }
};

let currentSlot = null;
let currentPrice = 1.99;
let currentTier = null;
let wishes = {
    founder: {},
    constellation: {},
    star: {}
};

/**
 * Convert tier name to HTML ID format
 * premium -> Premium, vip -> VIP, regular -> Regular
 */
function getTierDisplayName(tierName) {
    if (tierName === 'vip') return 'VIP';
    return tierName.charAt(0).toUpperCase() + tierName.slice(1);
}

/**
 * Get next available slot number for a tier
 */
function getNextAvailableSlot(tierName) {
    const tierWishes = wishes[tierName];
    const occupiedCount = Object.keys(tierWishes).length;
    return occupiedCount + 1;
}

/**
 * Initialize wishes wall
 */
function initWishesWall() {
    initializeConstellation();
    setupModal();
    loadWishesFromFirebase();
    setupCharCounter();
    setupStarsSlider();
}

/**
 * Initialize the constellation display (Founder + 8 Constellation hexagons + Stars slider)
 */
function initializeConstellation() {
    initializeFounderWish();
    initializeConstellationHexagons();
    initializeStarsSlider();
}

/**
 * Initialize Founder Wish (Center Diamond)
 */
function initializeFounderWish() {
    const founderContainer = document.getElementById('founderWish');
    if (!founderContainer) return;

    const lang = detectLanguage();
    const founderWish = wishes.founder[1]; // Only slot 1 exists for Founder

    if (founderWish) {
        // Occupied - show wish
        const safeText = sanitizeWishText(founderWish.text);
        const safeAuthor = sanitizeAuthorName(founderWish.author);
        const flag = countryToFlag(founderWish.country);

        founderContainer.innerHTML = `
            <div class="founder-center-content">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">👑</div>
                <p style="font-size: 0.85rem; color: #fbbf24; margin-bottom: 0.5rem;">"${safeText}"</p>
                <p style="font-size: 0.7rem; color: #cbd5e1;">${flag} ${safeAuthor}</p>
            </div>
        `;
        founderContainer.style.cursor = 'pointer';
        founderContainer.onclick = () => openViewWishModal(founderWish, 1, 'founder');
    } else {
        // Empty - show price
        founderContainer.innerHTML = `
            <div class="founder-center-content">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">👑</div>
                <p style="font-size: 0.9rem; color: #fbbf24; font-weight: 600; margin-bottom: 0.25rem;">${translations[lang].emptyTileTextFounder}</p>
                <p style="font-size: 1.2rem; color: #ffd700; font-weight: 700;">$49.99 USD</p>
            </div>
        `;
        founderContainer.style.cursor = 'pointer';
        founderContainer.onclick = () => handleTileClick(1, 'founder');
    }
}

/**
 * Initialize Constellation Hexagons (8 around center)
 */
function initializeConstellationHexagons() {
    const lang = detectLanguage();

    for (let i = 1; i <= 8; i++) {
        const hexContainer = document.getElementById(`constellationWish${i}`);
        if (!hexContainer) continue;

        const constellationWish = wishes.constellation[i];

        if (constellationWish) {
            // Occupied - show wish
            const safeText = sanitizeWishText(constellationWish.text);
            const safeAuthor = sanitizeAuthorName(constellationWish.author);
            const flag = countryToFlag(constellationWish.country);

            hexContainer.innerHTML = `
                <div class="constellation-hex-content">
                    <p style="font-size: 0.65rem; color: #cbd5e1; margin-bottom: 0.25rem;">"${safeText.substring(0, 30)}..."</p>
                    <p style="font-size: 0.55rem; color: #94a3b8;">${flag} ${safeAuthor}</p>
                </div>
            `;
            hexContainer.style.cursor = 'pointer';
            hexContainer.onclick = () => openViewWishModal(constellationWish, i, 'constellation');
        } else {
            // Empty - show price
            hexContainer.innerHTML = `
                <div class="constellation-hex-content">
                    <div style="font-size: 1.5rem; margin-bottom: 0.25rem;">💎</div>
                    <p style="font-size: 0.65rem; color: #60a5fa; margin-bottom: 0.25rem;">${translations[lang].emptyTileTextConstellation}</p>
                    <p style="font-size: 0.75rem; color: #93c5fd; font-weight: 600;">$19.99</p>
                </div>
            `;
            hexContainer.style.cursor = 'pointer';
            hexContainer.onclick = () => handleTileClick(i, 'constellation');
        }
    }
}

/**
 * Initialize Stars Slider
 */
function initializeStarsSlider() {
    const sliderTrack = document.getElementById('starsSliderTrack');
    if (!sliderTrack) return;

    sliderTrack.innerHTML = ''; // Clear existing
    const lang = detectLanguage();
    const starWishes = wishes.star;
    const starKeys = Object.keys(starWishes).sort((a, b) => parseInt(a) - parseInt(b));
    const nextAvailableSlot = getNextAvailableSlot('star');

    // Add next available empty star first
    const emptyStar = document.createElement('div');
    emptyStar.className = 'star-wish';
    emptyStar.innerHTML = `
        <div class="star-wish-content">
            <div style="font-size: 1.5rem;">⭐</div>
            <p style="font-size: 0.6rem; color: #fbbf24; margin-top: 0.25rem;">$1.99</p>
        </div>
    `;
    emptyStar.onclick = () => handleTileClick(nextAvailableSlot, 'star');
    sliderTrack.appendChild(emptyStar);

    // Add all occupied stars
    starKeys.forEach(slot => {
        const wish = starWishes[slot];
        const star = document.createElement('div');
        star.className = 'star-wish';

        const safeAuthor = sanitizeAuthorName(wish.author);
        const flag = countryToFlag(wish.country);

        star.innerHTML = `
            <div class="star-wish-content">
                <div style="font-size: 1.2rem;">⭐</div>
                <p style="font-size: 0.55rem; color: #cbd5e1; margin-top: 0.15rem;">${flag} ${safeAuthor.substring(0, 8)}</p>
            </div>
        `;
        star.onclick = () => openViewWishModal(wish, slot, 'star');
        sliderTrack.appendChild(star);
    });

    // Add some empty placeholder stars for visual effect (up to 20 total)
    const totalStars = Math.min(20, Math.max(5, starKeys.length + 5));
    for (let i = sliderTrack.children.length; i < totalStars; i++) {
        const placeholder = document.createElement('div');
        placeholder.className = 'star-wish';
        placeholder.style.opacity = '0.3';
        placeholder.innerHTML = `
            <div class="star-wish-content">
                <div style="font-size: 1.2rem;">⭐</div>
            </div>
        `;
        sliderTrack.appendChild(placeholder);
    }
}

/**
 * Setup stars slider navigation
 */
function setupStarsSlider() {
    const prevBtn = document.getElementById('sliderPrevStar');
    const nextBtn = document.getElementById('sliderNextStar');
    const wrapper = document.querySelector('.stars-slider-wrapper');

    if (!prevBtn || !nextBtn || !wrapper) return;

    prevBtn.addEventListener('click', () => {
        wrapper.scrollBy({
            left: -400,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        wrapper.scrollBy({
            left: 400,
            behavior: 'smooth'
        });
    });
}

/**
 * Setup slider for a specific tier
 */
function setupTierSlider(prevBtnId, nextBtnId, wrapperIndex) {
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const wrappers = document.querySelectorAll('.wishes-slider-wrapper');
    const wrapper = wrappers[wrapperIndex];

    if (!prevBtn || !nextBtn || !wrapper) {
        console.warn(`Slider elements not found for: ${prevBtnId}`);
        return;
    }

    prevBtn.addEventListener('click', () => {
        wrapper.scrollBy({
            left: -400,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        wrapper.scrollBy({
            left: 400,
            behavior: 'smooth'
        });
    });
}

/**
 * Handle tile click
 */
function handleTileClick(slot, tierName) {
    // If tile is occupied, it will be handled by updateWishesDisplay's onclick
    if (wishes[tierName][slot]) {
        return;
    }

    // Open purchase modal
    currentSlot = slot;
    currentTier = tierName;
    currentPrice = TIERS[tierName].price;
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
async function openModal() {
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

    // Detect user's country
    const userCountry = await getUserCountry();

    // Initialize PayPal button (always shown)
    initPayPalButton();

    // Initialize Mercado Pago button only for Argentina
    const mpContainer = document.getElementById('mercadopago-button-container');
    if (userCountry === 'AR') {
        mpContainer.style.display = 'block';
        initMercadoPagoButton();
    } else {
        mpContainer.style.display = 'none';
    }
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
        // Wait for PayPal SDK to load (up to 5 seconds)
        let attempts = 0;
        const maxAttempts = 50;
        const checkPayPalLoaded = setInterval(() => {
            attempts++;
            if (typeof paypal !== 'undefined') {
                clearInterval(checkPayPalLoaded);
                renderPayPalButton(container);
            } else if (attempts >= maxAttempts) {
                clearInterval(checkPayPalLoaded);
                console.error('PayPal SDK not loaded after 5 seconds');
                container.innerHTML = '';
                document.getElementById('paymentButton').style.display = 'block';
            }
        }, 100);
        return;
    }

    renderPayPalButton(container);
}

function renderPayPalButton(container) {
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal'
        },
        createOrder: function(data, actions) {
            // Validate and sanitize form before creating order
            const rawWishText = document.getElementById('wishText').value;
            const rawAuthor = document.getElementById('wishAuthor').value;

            const wishText = sanitizeWishText(rawWishText);
            const author = sanitizeAuthorName(rawAuthor);

            if (!wishText || !author) {
                alert('Please fill in both your wish and your name with valid characters');
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
    }).render(container).catch((err) => {
        console.error('❌ Error rendering PayPal button:', err);
        container.innerHTML = '';
        document.getElementById('paymentButton').style.display = 'block';
    });
}

/**
 * Initialize Mercado Pago button (for Argentina users only)
 *
 * IMPORTANT: Mercado Pago requires a backend to create payment preferences securely.
 *
 * Two options:
 * 1. Simple: Use Mercado Pago Payment Links (recommended for testing)
 *    - Go to https://www.mercadopago.com.ar/tools/create
 *    - Create a payment link with your price
 *    - Use that link in the button below
 *
 * 2. Complete: Create a backend endpoint
 *    - Use Node.js/PHP/Python to create payment preferences
 *    - Call your backend from here
 *    - Handle payment notifications (webhooks)
 */
function initMercadoPagoButton() {
    const container = document.getElementById('wallet_container');

    // Check if Mercado Pago SDK is loaded
    if (typeof MercadoPago === 'undefined') {
        console.error('Mercado Pago SDK not loaded');
        return;
    }

    // Check if public key is configured
    if (!MERCADOPAGO_CONFIG || MERCADOPAGO_CONFIG.publicKey === 'YOUR_MERCADOPAGO_PUBLIC_KEY') {
        console.warn('⚠️ Mercado Pago not configured. Please update config.js with your Public Key');

        // Show placeholder button with instructions
        container.innerHTML = `
            <div style="background: linear-gradient(135deg, #009ee3 0%, #0066ff 100%);
                        color: white;
                        padding: 1rem;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        font-weight: 600;
                        margin-top: 0.5rem;">
                💳 Pagar con Mercado Pago
            </div>
            <p style="font-size: 0.8rem; color: #64748b; text-align: center; margin-top: 0.5rem;">
                Configure Mercado Pago en config.js
            </p>
        `;
        return;
    }

    // Initialize Mercado Pago
    const mp = new MercadoPago(MERCADOPAGO_CONFIG.publicKey, {
        locale: 'es-AR'
    });

    // For now, show a styled button (you'll need to implement backend)
    container.innerHTML = `
        <button id="mp-payment-button" style="
            background: linear-gradient(135deg, #009ee3 0%, #0066ff 100%);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            width: 100%;
            text-align: center;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            margin-top: 0.5rem;
            transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.02)'"
           onmouseout="this.style.transform='scale(1)'">
            💳 Pagar con Mercado Pago
        </button>
    `;

    // Add click handler
    document.getElementById('mp-payment-button').addEventListener('click', async () => {
        // Validate form
        const rawWishText = document.getElementById('wishText').value;
        const rawAuthor = document.getElementById('wishAuthor').value;

        const wishText = sanitizeWishText(rawWishText);
        const author = sanitizeAuthorName(rawAuthor);

        if (!wishText || !author) {
            alert('Por favor completa tu deseo y tu nombre con caracteres válidos');
            return;
        }

        // Get user's country
        const country = await getUserCountry();

        try {
            // Call backend to create payment preference
            // Use relative URL to work in both development and production
            const response = await fetch('/api/create-preference', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: currentPrice,
                    wishText: wishText,
                    author: author,
                    slot: currentSlot,
                    tier: currentTier,
                    country: country
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create payment preference');
            }

            const data = await response.json();

            // Redirect to Mercado Pago checkout
            // Use sandbox_init_point for testing, init_point for production
            window.location.href = data.sandbox_init_point || data.init_point;

        } catch (error) {
            console.error('Error creating payment:', error);
            alert('Error al procesar el pago. Asegúrate de que el servidor esté corriendo.\n\n' +
                  'Ejecuta: npm start');
        }
    });
}

/**
 * Get user's country code from IP
 */
async function getUserCountry() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.country_code || 'XX'; // XX if unknown
    } catch (error) {
        console.warn('Could not detect country:', error);
        return 'XX';
    }
}

/**
 * Convert country code to flag emoji
 */
function countryToFlag(countryCode) {
    if (!countryCode || countryCode === 'XX') return '🌍';

    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

/**
 * Handle successful payment
 */
async function handleSuccessfulPayment() {
    // Get and sanitize inputs
    const rawWishText = document.getElementById('wishText').value;
    const rawAuthor = document.getElementById('wishAuthor').value;

    const wishText = sanitizeWishText(rawWishText);
    const author = sanitizeAuthorName(rawAuthor);

    if (!wishText || !author || !currentSlot || !currentTier) {
        alert('Error: Missing or invalid wish data');
        return;
    }

    // Get user's country
    const country = await getUserCountry();

    const wish = {
        text: wishText,
        author: author,
        country: country, // ← Add country
        slot: currentSlot,
        tier: currentTier,
        price: currentPrice,
        timestamp: Date.now()
    };

    // Save to Firebase
    saveWishToFirebase(wish);

    // Close modal
    closeModal();

    // Show success message
    alert('🎉 Your wish has been saved! It will shine on the wall forever!');

    // Regenerate the constellation to show the next available slot
    setTimeout(() => {
        initializeConstellation();
    }, 500);
}

/**
 * Save wish to Firebase
 */
function saveWishToFirebase(wish) {
    if (!database) {
        console.error('Firebase not initialized');
        return;
    }

    // Save wish in the tier-specific path
    database.ref(`wishes/${wish.tier}/${wish.slot}`).set({
        text: wish.text,
        author: wish.author,
        country: wish.country, // ← Save country
        price: wish.price,
        timestamp: wish.timestamp
    }).catch((error) => {
        console.error('Error saving wish:', error);
    });
}

/**
 * Load wishes from Firebase
 */
function loadWishesFromFirebase() {
    if (!database) {
        console.error('Firebase not initialized');
        return;
    }

    // Listen for wishes changes in real-time for each tier
    ['founder', 'constellation', 'star'].forEach(tierName => {
        database.ref(`wishes/${tierName}`).on('value', (snapshot) => {
            wishes[tierName] = snapshot.val() || {};
            // Regenerate constellation when wishes change
            initializeConstellation();
        });
    });
}

/**
 * Update wishes display for a specific tier
 */
function updateTierWishesDisplay(tierName) {
    const tierWishes = wishes[tierName];

    Object.keys(tierWishes).forEach(slot => {
        const wish = tierWishes[slot];
        const tile = document.querySelector(`[data-tier="${tierName}"][data-slot="${slot}"]`);

        if (tile && wish) {
            tile.className = `wish-tile occupied ${tierName}`;

            // Sanitize again for defense in depth
            const safeText = sanitizeWishText(wish.text);
            const safeAuthor = sanitizeAuthorName(wish.author);

            // Get flag emoji
            const flag = countryToFlag(wish.country);

            tile.innerHTML = `
                <div class="wish-tile-content">
                    <p class="wish-text">"${safeText}"</p>
                    <p class="wish-author">${flag} ${safeAuthor}</p>
                </div>
            `;
            // Add click handler to view wish in modal
            tile.style.cursor = 'pointer';
            tile.onclick = () => openViewWishModal(wish, slot, tierName);
        }
    });
}

/**
 * Open view wish modal
 */
function openViewWishModal(wish, slot, tierName) {
    const modal = document.getElementById('viewWishModal');

    // Sanitize data
    const safeText = sanitizeWishText(wish.text);
    const safeAuthor = sanitizeAuthorName(wish.author);

    // Set tier badge
    const badge = document.getElementById('viewWishBadge');
    const icon = document.getElementById('viewWishIcon');
    const tierText = document.getElementById('viewWishTier');

    badge.className = `wish-tier-badge ${tierName}`;

    if (tierName === 'premium') {
        icon.textContent = '👑';
        tierText.textContent = "Founder's Wish";
    } else if (tierName === 'vip') {
        icon.textContent = '💎';
        tierText.textContent = 'Constellation Wish';
    } else {
        icon.textContent = '⭐';
        tierText.textContent = 'Star Wish';
    }

    // Set wish content
    const flag = countryToFlag(wish.country);
    document.getElementById('viewWishText').textContent = safeText;
    document.getElementById('viewWishAuthor').textContent = `${flag} ${safeAuthor}`;

    // Set date
    if (wish.timestamp) {
        const date = new Date(wish.timestamp);
        document.getElementById('viewWishDate').textContent = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } else {
        document.getElementById('viewWishDate').textContent = '';
    }

    // Open modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close view wish modal
 */
function closeViewWishModal() {
    const modal = document.getElementById('viewWishModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Setup view wish modal
 */
function setupViewWishModal() {
    const closeBtn = document.getElementById('viewWishClose');
    const modal = document.getElementById('viewWishModal');

    // Close button
    closeBtn.addEventListener('click', closeViewWishModal);

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeViewWishModal();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeViewWishModal();
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

    // 4. Setup lazy loading for map (will load when user scrolls to it)
    setupMapLazyLoading();

    // 5. Initialize wishes wall
    initWishesWall();

    // 6. Setup view wish modal
    setupViewWishModal();
}

// Start everything when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
