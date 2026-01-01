// ====================================
// CONFIGURATION FILE
// ====================================
// Follow these instructions to set up your integrations

/**
 * PAYPAL CONFIGURATION
 *
 * Setup Instructions:
 * 1. Go to https://developer.paypal.com/
 * 2. Log in with your PayPal Business account (or create one)
 * 3. Go to Dashboard > My Apps & Credentials
 * 4. Under "REST API apps", click "Create App"
 * 5. Give it a name (e.g., "New Year Timer")
 * 6. Copy your Client ID
 * 7. Replace the value below with your Client ID
 *
 * For Testing (Sandbox):
 * - Use sandbox Client ID
 * - Use sandbox test accounts for payments
 *
 * For Production (Live):
 * - Switch to "Live" in PayPal dashboard
 * - Use production Client ID
 * - Update the script src in index.html to remove "sandbox"
 */
const PAYPAL_CONFIG = {
    // Replace with your actual PayPal Client ID
    clientId: 'AXi2xkj761AvR5Iadpo0AgjZU77pkxsYrxSs9y7Dzk-Tq7X3Wp5Vst7Q48wEmCmnwa2WpbI3eYBhm4Ez',

    // 'sandbox' for testing, 'production' for live
    mode: 'production',

    // Currency code (USD, EUR, GBP, etc.)
    currency: 'USD'
};


/**
 * FIREBASE CONFIGURATION
 *
 * Setup Instructions:
 * 1. Go to https://console.firebase.google.com/
 * 2. Click "Add project" or select existing project
 * 3. Add a web app to your project
 * 4. Go to Project Settings > General > Your apps
 * 5. Copy the firebaseConfig object
 * 6. Replace the values below with your actual Firebase config
 * 7. Enable Realtime Database in Firebase Console
 * 8. Set up database rules (see below)
 *
 * Recommended Database Rules:
 * {
 *   "rules": {
 *     "wishes": {
 *       ".read": true,
 *       ".write": "auth != null"
 *     },
 *     "totalSlots": {
 *       ".read": true,
 *       ".write": "auth != null"
 *     }
 *   }
 * }
 */
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCooDwPDhnTtAwD-G-AlWK8NiX4zUVtMIY",
    authDomain: "new-year-timer-9a3d9.firebaseapp.com",
    databaseURL: "https://new-year-timer-9a3d9-default-rtdb.firebaseio.com",
    projectId: "new-year-timer-9a3d9",
    storageBucket: "new-year-timer-9a3d9.firebasestorage.app",
    messagingSenderId: "869264928187",
    appId: "1:869264928187:web:f6d24ec1900aa892cf289e",
    measurementId: "G-DDQQ66PTTN"
};


/**
 * MERCADO PAGO CONFIGURATION
 *
 * Setup Instructions (for Argentina):
 * 1. Go to https://www.mercadopago.com.ar/
 * 2. Create an account or log in
 * 3. Go to https://www.mercadopago.com.ar/developers/panel
 * 4. Create a new application
 * 5. Go to "Credenciales" (Credentials)
 * 6. Copy your Public Key (for frontend) and Access Token (for backend)
 * 7. Replace the values below
 *
 * NOTE: For testing, use "TEST" credentials
 * For production, use "PRODUCTION" credentials
 */
const MERCADOPAGO_CONFIG = {
    // Replace with your actual Mercado Pago Public Key
    publicKey: 'APP_USR-2424f1a6-782b-4b69-9532-26aab69dce61',

    // 'test' for testing, 'production' for live
    mode: 'production',

    // Country (ar, br, mx, cl, co, pe, uy)
    country: 'ar'
};


/**
 * SITE CONFIGURATION
 *
 * Update these with your actual domain when deploying
 */
const SITE_CONFIG = {
    // Your actual domain (for meta tags and sharing)
    domain: 'newyeartimers.com',

    // Site name
    siteName: "New Year's Timer 2027",

    // Contact email
    contactEmail: 'francisarroyo20@gmail.com'
};


// Export configurations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PAYPAL_CONFIG, FIREBASE_CONFIG, MERCADOPAGO_CONFIG, SITE_CONFIG };
}
