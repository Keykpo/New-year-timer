/**
 * Vercel Serverless Function: Mercado Pago Webhooks
 */

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { type, data } = req.body;

        console.log('Webhook received:', { type, data });

        // Only process payment notifications
        if (type === 'payment') {
            const paymentId = data.id;

            // TODO: Implement Firebase saving logic here
            // 1. Verify payment with Mercado Pago API
            // 2. Get payment details
            // 3. If approved, save wish to Firebase
            // 4. Send confirmation

            console.log('Payment notification:', paymentId);

            /*
            Example implementation:

            const admin = require('firebase-admin');

            if (!admin.apps.length) {
                admin.initializeApp({
                    credential: admin.credential.cert({
                        projectId: process.env.FIREBASE_PROJECT_ID,
                        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
                    }),
                    databaseURL: process.env.FIREBASE_DATABASE_URL
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
};
