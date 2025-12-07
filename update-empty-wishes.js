/**
 * Script para actualizar deseos vacíos con frases realistas
 *
 * INSTRUCCIONES:
 * 1. Abre la página en el navegador
 * 2. Abre la consola (F12)
 * 3. Copia y pega este código
 * 4. Presiona Enter
 * 5. Recarga la página
 */

(async function updateEmptyWishes() {
    if (typeof database === 'undefined') {
        console.error('❌ Firebase no está disponible.');
        return;
    }

    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    // Títulos aleatorios
    const STAR_TITLES = [
        'Starlight Dream', 'Moonbeam Wish', 'Sunrise Hope', 'Crystal Vision',
        'Aurora Dream', 'Twilight Wish', 'Ocean Breeze', 'Mountain Echo',
        'Forest Whisper', 'Desert Star', 'Northern Light', 'Southern Cross'
    ];
    const FOUNDER_TITLES = [
        'Golden Dream', 'Royal Destiny', 'Imperial Fortune', 'Supreme Blessing',
        'Platinum Legacy', 'Diamond Promise', 'Crown Jewel', 'Monarch\'s Grace',
        'Elite Vision', 'Celestial Harmony', 'Eternal Glory', 'Legend\'s Path'
    ];

    function getRandomTitle(tier) {
        const titles = tier === 'founder' ? FOUNDER_TITLES : STAR_TITLES;
        return titles[Math.floor(Math.random() * titles.length)];
    }

    // 30 frases realistas para reemplazar los vacíos (más de las necesarias por si acaso)
    const phrases = [
        // Español - Emotivos
        { message: "Que este año sea el mejor de mi vida 🌟", author: "Manu", country: "AR" },
        { message: "Poder comprarme mi primer auto", author: "Fede", country: "UY" },
        { message: "Que mi familia esté siempre sana y feliz", author: "Caro", country: "CL" },
        { message: "Conseguir mi primer departamento propio", author: "Juli", country: "AR" },
        { message: "Viajar a Japón con mis ahorros", author: "Nico", country: "MX" },
        { message: "Terminar la carrera de una vez por todas", author: "Valen", country: "CO" },

        // Español - Trolls
        { message: "que la inflación baje aunque sea un poco", author: "Argentino", country: "AR" },
        { message: "ganar la quiniela y rajar de aca", author: "anonimo", country: "AR" },
        { message: "que mi crush me de bola de una vez", author: "esperanzado", country: "MX" },
        { message: "nunca mas tener que estudiar matematica", author: "estudiante", country: "ES" },

        // Inglés - Emotivos
        { message: "Get my first promotion at work 💼", author: "Chris", country: "US" },
        { message: "Buy my parents their dream house", author: "Taylor", country: "CA" },
        { message: "Finally learn to cook properly", author: "Jordan", country: "AU" },
        { message: "Run my first marathon this year", author: "Morgan", country: "GB" },

        // Inglés - Trolls
        { message: "my wifi never crashes again", author: "remote worker", country: "US" },
        { message: "monday mornings dont exist anymore", author: "sleepyhead", country: "GB" },
        { message: "unlimited coffee for life", author: "caffeine addict", country: "CA" },
        { message: "my playlist only plays bangers", author: "music lover", country: "AU" },

        // Portugués
        { message: "Conseguir meu primeiro emprego CLT", author: "Thiago", country: "BR" },
        { message: "Viajar pro exterior pela primeira vez", author: "Fernanda", country: "BR" },
        { message: "Adotar um cachorrinho finalmente 🐶", author: "Camila", country: "BR" },
        { message: "comprar uma moto nova", author: "Gustavo", country: "BR" },

        // Francés
        { message: "Déménager à Lyon cette année", author: "Jules", country: "FR" },
        { message: "Apprendre à jouer de la guitare", author: "Léa", country: "FR" },

        // Alemán
        { message: "Eine Weltreise machen endlich", author: "Max", country: "DE" },
        { message: "Mein Deutsch verbessern", author: "Lisa", country: "AT" },

        // Italiano
        { message: "Aprire il mio ristorante", author: "Giuseppe", country: "IT" },
        { message: "Imparare a suonare il pianoforte", author: "Francesca", country: "IT" },

        // Otros
        { message: "Найти хорошую работу наконец", author: "Дмитрий", country: "RU" },
        { message: "今年一定要升职 💪", author: "小李", country: "CN" }
    ];

    console.log('🔍 Buscando deseos vacíos...');

    try {
        let updatedCount = 0;
        let phraseIndex = 0;

        // Buscar en ambos tiers
        for (const tier of ['star', 'founder']) {
            const snapshot = await database.ref(`wishes/${tier}`).once('value');
            const wishes = snapshot.val() || {};

            for (const [key, wish] of Object.entries(wishes)) {
                // Verificar si el deseo está vacío o no tiene texto
                if (!wish.text || wish.text.trim() === '') {
                    if (phraseIndex >= phrases.length) {
                        console.warn('⚠️ No hay más frases disponibles');
                        break;
                    }

                    const phrase = phrases[phraseIndex];
                    const hoursAgo = Math.floor(Math.random() * 72); // últimas 72 horas
                    const price = tier === 'founder' ? 3.99 : 0.99;

                    // Actualizar el deseo vacío
                    await database.ref(`wishes/${tier}/${key}`).update({
                        text: phrase.message,  // ← Cambiado de 'message' a 'text'
                        author: phrase.author,
                        country: phrase.country,
                        wishTitle: getRandomTitle(tier),  // ← Título aleatorio
                        price: price,  // ← Precio según tier
                        timestamp: wish.timestamp || (now - (hoursAgo * oneHour))
                    });

                    updatedCount++;
                    phraseIndex++;
                    console.log(`✅ Actualizado deseo ${updatedCount} en ${tier}: "${phrase.message.substring(0, 40)}..."`);
                }
            }
        }

        if (updatedCount === 0) {
            console.log('ℹ️ No se encontraron deseos vacíos');
        } else {
            console.log(`✅ ¡${updatedCount} deseos vacíos actualizados con texto!`);
            console.log('🔄 Recarga la página para ver los cambios');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    }
})();
