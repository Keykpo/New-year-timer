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
        timezoneInfo: "Your timezone: {timezone}"
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
        timezoneInfo: "Tu zona horaria: {timezone}"
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
        timezoneInfo: "Seu fuso horário: {timezone}"
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
        timezoneInfo: "Votre fuseau horaire: {timezone}"
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

// Simplified world map with timezone regions (UTC offsets)
const timezoneRegions = [
    { name: "Pacific/Kiritimati", offset: 14, path: "M950,450 L970,450 L970,470 L950,470 Z" }, // Line Islands
    { name: "Pacific/Auckland", offset: 13, path: "M920,520 L945,520 L945,550 L920,550 Z" }, // New Zealand
    { name: "Pacific/Fiji", offset: 12, path: "M900,480 L920,480 L920,500 L900,500 Z" }, // Fiji
    { name: "Asia/Kamchatka", offset: 12, path: "M880,280 L920,280 L920,320 L880,320 Z" }, // Kamchatka
    { name: "Pacific/Norfolk", offset: 11, path: "M890,500 L905,500 L905,515 L890,515 Z" }, // Norfolk Island
    { name: "Australia/Sydney", offset: 11, path: "M850,500 L890,500 L890,540 L850,540 Z" }, // Eastern Australia
    { name: "Asia/Vladivostok", offset: 10, path: "M840,320 L880,320 L880,360 L840,360 Z" }, // Vladivostok
    { name: "Australia/Brisbane", offset: 10, path: "M850,470 L885,470 L885,510 L850,510 Z" }, // Queensland
    { name: "Asia/Tokyo", offset: 9, path: "M820,360 L850,360 L850,390 L820,390 Z" }, // Japan
    { name: "Asia/Seoul", offset: 9, path: "M810,355 L825,355 L825,370 L810,370 Z" }, // Korea
    { name: "Asia/Shanghai", offset: 8, path: "M760,360 L810,360 L810,410 L760,410 Z" }, // China
    { name: "Asia/Singapore", offset: 8, path: "M770,460 L790,460 L790,475 L770,475 Z" }, // Singapore
    { name: "Asia/Bangkok", offset: 7, path: "M730,440 L755,440 L755,470 L730,470 Z" }, // Thailand
    { name: "Asia/Dhaka", offset: 6, path: "M700,400 L725,400 L725,425 L700,425 Z" }, // Bangladesh
    { name: "Asia/Kolkata", offset: 5.5, path: "M680,405 L710,405 L710,445 L680,445 Z" }, // India
    { name: "Asia/Karachi", offset: 5, path: "M650,380 L685,380 L685,420 L650,420 Z" }, // Pakistan
    { name: "Asia/Dubai", offset: 4, path: "M600,390 L630,390 L630,420 L600,420 Z" }, // UAE
    { name: "Europe/Moscow", offset: 3, path: "M570,300 L630,300 L630,360 L570,360 Z" }, // Moscow
    { name: "Africa/Nairobi", offset: 3, path: "M560,450 L590,450 L590,490 L560,490 Z" }, // East Africa
    { name: "Europe/Athens", offset: 2, path: "M540,360 L560,360 L560,380 L540,380 Z" }, // Greece
    { name: "Africa/Cairo", offset: 2, path: "M530,400 L555,400 L555,425 L530,425 Z" }, // Egypt
    { name: "Europe/Paris", offset: 1, path: "M480,330 L510,330 L510,360 L480,360 Z" }, // Central Europe
    { name: "Europe/Berlin", offset: 1, path: "M510,320 L535,320 L535,345 L510,345 Z" }, // Germany
    { name: "Africa/Lagos", offset: 1, path: "M480,450 L520,450 L520,490 L480,490 Z" }, // West Africa
    { name: "Europe/London", offset: 0, path: "M460,320 L485,320 L485,345 L460,345 Z" }, // UK
    { name: "Africa/Casablanca", offset: 0, path: "M450,380 L480,380 L480,410 L450,410 Z" }, // Morocco
    { name: "Atlantic/Azores", offset: -1, path: "M420,370 L440,370 L440,385 L420,385 Z" }, // Azores
    { name: "America/Sao_Paulo", offset: -3, path: "M340,470 L380,470 L380,530 L340,530 Z" }, // Brazil (East)
    { name: "America/Argentina", offset: -3, path: "M320,510 L350,510 L350,570 L320,570 Z" }, // Argentina
    { name: "America/Santiago", offset: -3, path: "M280,520 L310,520 L310,570 L280,570 Z" }, // Chile
    { name: "America/Caracas", offset: -4, path: "M300,440 L330,440 L330,465 L300,465 Z" }, // Venezuela
    { name: "America/New_York", offset: -5, path: "M220,340 L270,340 L270,390 L220,390 Z" }, // US East Coast
    { name: "America/Chicago", offset: -6, path: "M170,330 L220,330 L220,390 L170,390 Z" }, // US Central
    { name: "America/Denver", offset: -7, path: "M120,320 L170,320 L170,380 L120,380 Z" }, // US Mountain
    { name: "America/Los_Angeles", offset: -8, path: "M70,330 L120,330 L120,390 L70,390 Z" }, // US West Coast
    { name: "America/Anchorage", offset: -9, path: "M50,250 L120,250 L120,310 L50,310 Z" }, // Alaska
    { name: "Pacific/Honolulu", offset: -10, path: "M30,400 L65,400 L65,420 L30,420 Z" }, // Hawaii
    { name: "Pacific/Midway", offset: -11, path: "M10,420 L35,420 L35,440 L10,440 Z" } // Midway
];

function createWorldMap() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 1000 600");
    svg.setAttribute("xmlns", svgNS);

    // Create a simplified world map background
    const background = document.createElementNS(svgNS, "rect");
    background.setAttribute("width", "1000");
    background.setAttribute("height", "600");
    background.setAttribute("fill", "#0f172a");
    svg.appendChild(background);

    // Add ocean
    const ocean = document.createElementNS(svgNS, "rect");
    ocean.setAttribute("width", "1000");
    ocean.setAttribute("height", "600");
    ocean.setAttribute("fill", "#1e293b");
    svg.appendChild(ocean);

    // Get current UTC time
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const newYearUTC = new Date(Date.UTC(nextYear, 0, 1, 0, 0, 0));

    // Create regions for each timezone
    timezoneRegions.forEach(region => {
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", region.path);
        path.setAttribute("class", "timezone-region");

        // Calculate if this timezone has already entered the new year
        const timezoneNewYear = new Date(newYearUTC.getTime() - (region.offset * 60 * 60 * 1000));
        const hasCelebrated = now >= timezoneNewYear;

        if (hasCelebrated) {
            path.classList.add("celebrating");
        } else {
            path.classList.add("waiting");
        }

        // Add tooltip
        const title = document.createElementNS(svgNS, "title");
        title.textContent = `${region.name} (UTC${region.offset >= 0 ? '+' : ''}${region.offset})`;
        path.appendChild(title);

        svg.appendChild(path);
    });

    // Add grid lines for visual reference
    for (let i = 0; i <= 1000; i += 100) {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", i);
        line.setAttribute("y1", 0);
        line.setAttribute("x2", i);
        line.setAttribute("y2", 600);
        line.setAttribute("stroke", "#334155");
        line.setAttribute("stroke-width", "0.5");
        line.setAttribute("opacity", "0.3");
        svg.appendChild(line);
    }

    for (let i = 0; i <= 600; i += 100) {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", i);
        line.setAttribute("x2", 1000);
        line.setAttribute("y2", i);
        line.setAttribute("stroke", "#334155");
        line.setAttribute("stroke-width", "0.5");
        line.setAttribute("opacity", "0.3");
        svg.appendChild(line);
    }

    return svg;
}

function updateMap() {
    const mapContainer = document.getElementById('mapContainer');
    mapContainer.innerHTML = '';
    const svg = createWorldMap();
    mapContainer.appendChild(svg);
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
}

// Start everything when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
