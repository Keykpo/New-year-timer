/**
 * Vercel Serverless Function: Create Mercado Pago Payment Preference
 */

const { MercadoPagoConfig, Preference } = require('mercadopago');

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
        const { amount, wishText, author, slot, tier, country } = req.body;

        // Validate input
        if (!amount || !wishText || !author || !slot || !tier) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Mercado Pago configuration
        const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

        if (!MERCADOPAGO_ACCESS_TOKEN || MERCADOPAGO_ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN_HERE') {
            return res.status(500).json({ error: 'Mercado Pago not configured' });
        }

        const client = new MercadoPagoConfig({
            accessToken: MERCADOPAGO_ACCESS_TOKEN,
            options: { timeout: 5000 }
        });

        const preferenceClient = new Preference(client);

        // Convert USD to ARS for Argentina users
        let finalAmount = parseFloat(amount);
        let currency = 'USD';

        if (country === 'AR') {
            currency = 'ARS';
            // $1.99 USD → AR$2,000 (Star)
            // $49.99 USD → AR$50,000 (Founder)
            if (parseFloat(amount) === 1.99) {
                finalAmount = 2000;
            } else if (parseFloat(amount) === 49.99) {
                finalAmount = 50000;
            } else {
                finalAmount = parseFloat(amount) * 1000;
            }
        }

        console.log(`Payment: ${amount} USD → ${finalAmount} ${currency} (Country: ${country})`);

        // Get the site URL from environment or use default
        const siteUrl = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'https://newyeartimers.online';

        // Create preference
        const preference = {
            items: [
                {
                    title: `New Year 2026 Wish - ${tier === 'founder' ? 'Founder' : 'Star'} Tier`,
                    description: wishText,
                    quantity: 1,
                    unit_price: finalAmount,
                    currency_id: currency
                }
            ],
            back_urls: {
                success: `${siteUrl}/index.html`,
                failure: `${siteUrl}/index.html`,
                pending: `${siteUrl}/index.html`
            },
            notification_url: `${siteUrl}/api/webhooks`,
            metadata: {
                wishText: wishText,
                author: author,
                slot: slot,
                tier: tier,
                country: country || 'XX',
                timestamp: Date.now()
            },
            statement_descriptor: 'New Year Wish',
            external_reference: `wish-${tier}-${slot}-${Date.now()}`
        };

        const response = await preferenceClient.create({ body: preference });

        res.status(200).json({
            id: response.id,
            init_point: response.init_point,
            sandbox_init_point: response.sandbox_init_point
        });

    } catch (error) {
        console.error('Error creating preference:', error);
        res.status(500).json({
            error: 'Failed to create payment preference',
            details: error.message
        });
    }
};
