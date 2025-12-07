/**
 * Backend Server for New Year's Timer
 * Handles Mercado Pago payments and Firebase integration
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration - Allow requests from production and development
const corsOptions = {
    origin: [
        'https://newyeartimers.com',
        'https://www.newyeartimers.com',
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (frontend) with video support
app.use(express.static(path.join(__dirname), {
    setHeaders: (res, filePath) => {
        // Set correct MIME type for video files
        if (filePath.endsWith('.mp4')) {
            res.setHeader('Content-Type', 'video/mp4');
        }
    }
}));

// Mercado Pago Configuration
// Get your Access Token from: https://www.mercadopago.com.ar/developers/panel/app
const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || 'APP_USR-82134636170200-111220-e7441692c9ac573863ea994d69cb77d2-679745158';

const client = new MercadoPagoConfig({
    accessToken: MERCADOPAGO_ACCESS_TOKEN,
    options: { timeout: 5000 }
});

const preferenceClient = new Preference(client);

/**
 * Create Payment Preference
 * POST /api/create-preference
 */
app.post('/api/create-preference', async (req, res) => {
    try {
        const { amount, wishText, author, slot, tier, country } = req.body;

        // Validate input
        if (!amount || !wishText || !author || !slot || !tier) {
            return res.status(400).json({
                error: 'Missing required fields'
            });
        }

        // Convert USD to ARS for Argentina users
        let finalAmount = parseFloat(amount);
        let currency = 'USD';

        if (country === 'AR') {
            currency = 'ARS';
            // Convert USD to ARS
            // $0.99 USD → AR$1000 (Star)
            // $3.99 USD → AR$4000 (Founder)
            if (parseFloat(amount) === 0.99) {
                finalAmount = 1000;
            } else if (parseFloat(amount) === 3.99) {
                finalAmount = 4000;
            } else {
                // Fallback: use approximate exchange rate (1 USD ≈ 1000 ARS)
                finalAmount = parseFloat(amount) * 1000;
            }
        }

        console.log(`Payment request: ${amount} USD → ${finalAmount} ${currency} (Country: ${country})`);

        // Create preference
        const preference = {
            items: [
                {
                    title: `New Year 2026 Wish - ${tier === 'premium' ? 'Founder' : 'Star'} Tier`,
                    description: wishText,
                    quantity: 1,
                    unit_price: finalAmount,
                    currency_id: currency
                }
            ],
            back_urls: {
                success: `https://newyeartimers.com`,
                failure: `https://newyeartimers.com`,
                pending: `https://newyeartimers.com`
            },
            auto_return: 'approved',
            // notification_url: `http://YOUR_NGROK_URL/api/webhooks`, // Update this with your ngrok URL
            metadata: {
                wishText: wishText,
                author: author,
                slot: slot,
                tier: tier,
                country: country || 'XX',
                timestamp: Date.now()
            },
            // Add these for better UX
            statement_descriptor: 'New Year Wish',
            external_reference: `wish-${tier}-${slot}-${Date.now()}`
        };

        const response = await preferenceClient.create({ body: preference });

        res.json({
            id: response.id,
            init_point: response.init_point, // Redirect user here
            sandbox_init_point: response.sandbox_init_point
        });

    } catch (error) {
        console.error('Error creating preference:', error);
        res.status(500).json({
            error: 'Failed to create payment preference',
            details: error.message
        });
    }
});

/**
 * Webhook handler for payment notifications
 * POST /api/webhooks
 */
app.post('/api/webhooks', async (req, res) => {
    try {
        const { type, data } = req.body;

        console.log('Webhook received:', { type, data });

        // Only process payment notifications
        if (type === 'payment') {
            const paymentId = data.id;

            // Here you would:
            // 1. Verify the payment with Mercado Pago API
            // 2. Get payment details
            // 3. If approved, save wish to Firebase
            // 4. Send confirmation

            console.log('Payment notification:', paymentId);

            // TODO: Implement Firebase saving logic here
            /*
            const admin = require('firebase-admin');
            const serviceAccount = require('./firebase-service-account.json');

            if (!admin.apps.length) {
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount),
                    databaseURL: 'https://new-year-timer-9a3d9-default-rtdb.firebaseio.com'
                });
            }

            const db = admin.database();
            const { wishText, author, slot, tier, country } = metadata;

            await db.ref(`wishes/${tier}/${slot}`).set({
                text: wishText,
                author: author,
                country: country,
                price: amount,
                timestamp: Date.now(),
                paymentId: paymentId
            });
            */
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).send('Error');
    }
});

/**
 * Health check
 */
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`
    ========================================
    🚀 Server running on http://localhost:${PORT}
    ========================================

    Endpoints:
    - POST /api/create-preference
    - POST /api/webhooks
    - GET  /health

    ⚠️  Remember to:
    1. Set MERCADOPAGO_ACCESS_TOKEN in environment or in code
    2. Update notification_url with your ngrok URL
    3. Configure Firebase Admin SDK for webhooks
    ========================================
    `);
});
