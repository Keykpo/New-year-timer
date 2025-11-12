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
        eventsTitle: "Important Events of 2025",
        birthdayPromptText: "Want to see your birthday as the most important event?",
        selectMonth: "Month",
        selectDay: "Day",
        saveBirthday: "Save",
        skipBirthday: "Skip",
        pauseAutoplay: "Pause Auto-play",
        playAutoplay: "Play Auto-play",
        birthdayEventTitle: "The Most Important Event: Your Birthday!",
        birthdayEventDescription: "Today is YOUR special day! A unique celebration that makes this year extraordinary. May all your wishes come true! 🎉🎂"
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
        eventsTitle: "Sucesos Importantes de 2025",
        birthdayPromptText: "¿Quieres ver tu cumpleaños como el evento más importante?",
        selectMonth: "Mes",
        selectDay: "Día",
        saveBirthday: "Guardar",
        skipBirthday: "Omitir",
        pauseAutoplay: "Pausar reproducción",
        playAutoplay: "Reproducir",
        birthdayEventTitle: "¡El Suceso Más Importante: Tu Cumpleaños!",
        birthdayEventDescription: "¡Hoy es TU día especial! Una celebración única que hace este año extraordinario. ¡Que todos tus deseos se hagan realidad! 🎉🎂"
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
        eventsTitle: "Eventos Importantes de 2025",
        birthdayPromptText: "Quer ver seu aniversário como o evento mais importante?",
        selectMonth: "Mês",
        selectDay: "Dia",
        saveBirthday: "Salvar",
        skipBirthday: "Pular",
        pauseAutoplay: "Pausar reprodução",
        playAutoplay: "Reproduzir",
        birthdayEventTitle: "O Evento Mais Importante: Seu Aniversário!",
        birthdayEventDescription: "Hoje é o SEU dia especial! Uma celebração única que torna este ano extraordinário. Que todos os seus desejos se realizem! 🎉🎂"
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
        eventsTitle: "Événements Importants de 2025",
        birthdayPromptText: "Voulez-vous voir votre anniversaire comme l'événement le plus important?",
        selectMonth: "Mois",
        selectDay: "Jour",
        saveBirthday: "Enregistrer",
        skipBirthday: "Passer",
        pauseAutoplay: "Mettre en pause",
        playAutoplay: "Lecture automatique",
        birthdayEventTitle: "L'Événement le Plus Important: Votre Anniversaire!",
        birthdayEventDescription: "Aujourd'hui c'est VOTRE jour spécial! Une célébration unique qui rend cette année extraordinaire. Que tous vos vœux se réalisent! 🎉🎂"
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
// EVENTS SLIDER SYSTEM
// ====================================

/**
 * Important events of 2025
 * These events will be shown in the slider after the birthday event
 */
const importantEvents2025 = [
    {
        icon: "🤖",
        title: "AI Revolution Continues",
        description: "Artificial Intelligence reaches new milestones with advanced models transforming work, creativity, and daily life across the globe.",
        date: "Throughout 2025"
    },
    {
        icon: "🚀",
        title: "Space Exploration Advances",
        description: "Multiple missions to the Moon and Mars mark a new era of space exploration, with private companies and agencies pushing boundaries.",
        date: "2025"
    },
    {
        icon: "🌱",
        title: "Climate Action Accelerates",
        description: "Renewable energy adoption reaches record highs as nations intensify efforts to combat climate change with innovative green technologies.",
        date: "2025"
    },
    {
        icon: "⚽",
        title: "Major Sports Events",
        description: "Global sporting events bring nations together, featuring championships, world cups, and Olympic qualifiers that unite fans worldwide.",
        date: "2025"
    },
    {
        icon: "🎮",
        title: "Gaming Innovation",
        description: "Next-generation gaming experiences emerge with breakthrough VR/AR technologies and highly anticipated game releases captivating millions.",
        date: "2025"
    },
    {
        icon: "🎬",
        title: "Entertainment Renaissance",
        description: "Blockbuster films, streaming series, and music releases define a golden year for entertainment across all platforms.",
        date: "2025"
    },
    {
        icon: "🏥",
        title: "Medical Breakthroughs",
        description: "Revolutionary treatments and vaccines bring hope for diseases, while digital health platforms transform patient care globally.",
        date: "2025"
    }
];

/**
 * Slider state
 */
let sliderState = {
    currentSlide: 0,
    totalSlides: 0,
    autoplay: true,
    autoplayInterval: null,
    autoplayDelay: 5000
};

/**
 * Get birthday from localStorage
 */
function getBirthday() {
    const birthday = localStorage.getItem('userBirthday');
    return birthday ? JSON.parse(birthday) : null;
}

/**
 * Save birthday to localStorage
 */
function saveBirthday(month, day) {
    localStorage.setItem('userBirthday', JSON.stringify({ month, day }));
}

/**
 * Format birthday date
 */
function formatBirthdayDate(month, day) {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[month - 1]} ${day}`;
}

/**
 * Create slider slides
 */
function createSlides() {
    const lang = detectLanguage();
    const birthday = getBirthday();
    const slides = [];

    // Add birthday slide if available
    if (birthday) {
        slides.push({
            isBirthday: true,
            icon: "🎂",
            title: translations[lang].birthdayEventTitle,
            description: translations[lang].birthdayEventDescription,
            date: formatBirthdayDate(birthday.month, birthday.day)
        });
    }

    // Add important events
    slides.push(...importantEvents2025);

    return slides;
}

/**
 * Render slides
 */
function renderSlides() {
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = createSlides();

    sliderState.totalSlides = slides.length;

    sliderTrack.innerHTML = slides.map((slide, index) => `
        <div class="slider-slide ${slide.isBirthday ? 'birthday-slide' : ''}">
            <div class="slide-icon">${slide.icon}</div>
            <h3 class="slide-title">${slide.title}</h3>
            <p class="slide-description">${slide.description}</p>
            <p class="slide-date">${slide.date}</p>
        </div>
    `).join('');

    renderIndicators();
    updateSliderPosition();
}

/**
 * Render indicators
 */
function renderIndicators() {
    const indicatorsContainer = document.getElementById('sliderIndicators');
    indicatorsContainer.innerHTML = '';

    for (let i = 0; i < sliderState.totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
}

/**
 * Update slider position
 */
function updateSliderPosition() {
    const sliderTrack = document.getElementById('sliderTrack');
    const offset = -sliderState.currentSlide * 100;
    sliderTrack.style.transform = `translateX(${offset}%)`;

    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === sliderState.currentSlide);
    });
}

/**
 * Go to specific slide
 */
function goToSlide(index) {
    if (index >= 0 && index < sliderState.totalSlides) {
        sliderState.currentSlide = index;
        updateSliderPosition();
        resetAutoplay();
    }
}

/**
 * Next slide
 */
function nextSlide() {
    const nextIndex = (sliderState.currentSlide + 1) % sliderState.totalSlides;
    goToSlide(nextIndex);
}

/**
 * Previous slide
 */
function prevSlide() {
    const prevIndex = (sliderState.currentSlide - 1 + sliderState.totalSlides) % sliderState.totalSlides;
    goToSlide(prevIndex);
}

/**
 * Start autoplay
 */
function startAutoplay() {
    if (sliderState.autoplayInterval) {
        clearInterval(sliderState.autoplayInterval);
    }
    sliderState.autoplayInterval = setInterval(nextSlide, sliderState.autoplayDelay);
}

/**
 * Stop autoplay
 */
function stopAutoplay() {
    if (sliderState.autoplayInterval) {
        clearInterval(sliderState.autoplayInterval);
        sliderState.autoplayInterval = null;
    }
}

/**
 * Reset autoplay
 */
function resetAutoplay() {
    if (sliderState.autoplay) {
        stopAutoplay();
        startAutoplay();
    }
}

/**
 * Toggle autoplay
 */
function toggleAutoplay() {
    const lang = detectLanguage();
    const autoplayToggle = document.getElementById('autoplayToggle');
    const autoplayIcon = document.getElementById('autoplayIcon');
    const autoplayText = document.getElementById('autoplayText');

    sliderState.autoplay = !sliderState.autoplay;

    if (sliderState.autoplay) {
        startAutoplay();
        autoplayIcon.textContent = '⏸';
        autoplayText.textContent = translations[lang].pauseAutoplay;
    } else {
        stopAutoplay();
        autoplayIcon.textContent = '▶';
        autoplayText.textContent = translations[lang].playAutoplay;
    }
}

/**
 * Initialize birthday prompt
 */
function initBirthdayPrompt() {
    const birthday = getBirthday();
    const birthdayPrompt = document.getElementById('birthdayPrompt');

    if (birthday) {
        birthdayPrompt.style.display = 'none';
    } else {
        birthdayPrompt.style.display = 'block';

        // Populate day dropdown
        const daySelect = document.getElementById('birthDay');
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }

        // Save button
        document.getElementById('saveBirthday').addEventListener('click', () => {
            const month = document.getElementById('birthMonth').value;
            const day = document.getElementById('birthDay').value;

            if (month && day) {
                saveBirthday(parseInt(month), parseInt(day));
                birthdayPrompt.style.display = 'none';
                renderSlides();
            } else {
                alert('Please select both month and day');
            }
        });

        // Skip button
        document.getElementById('skipBirthday').addEventListener('click', () => {
            birthdayPrompt.style.display = 'none';
        });
    }
}

/**
 * Initialize slider
 */
function initSlider() {
    renderSlides();
    initBirthdayPrompt();

    // Navigation buttons
    document.getElementById('prevBtn').addEventListener('click', prevSlide);
    document.getElementById('nextBtn').addEventListener('click', nextSlide);

    // Autoplay toggle
    document.getElementById('autoplayToggle').addEventListener('click', toggleAutoplay);

    // Start autoplay
    if (sliderState.autoplay) {
        startAutoplay();
    }

    // Pause autoplay on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        if (sliderState.autoplay) {
            stopAutoplay();
        }
    });
    sliderContainer.addEventListener('mouseleave', () => {
        if (sliderState.autoplay) {
            startAutoplay();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
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
    // Update map every minute to reflect timezone changes
    setInterval(updateMap, 60000);

    // 5. Initialize slider
    initSlider();
}

// Start everything when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
