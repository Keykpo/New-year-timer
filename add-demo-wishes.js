/**
 * Script para agregar 4 deseos de prueba de $3.99 (Founder tier)
 *
 * INSTRUCCIONES:
 * 1. Abre la página en el navegador
 * 2. Abre la consola (F12 o Ctrl+Shift+I)
 * 3. Copia y pega todo este código en la consola
 * 4. Presiona Enter
 * 5. Recarga la página para ver los nuevos deseos
 */

(async function addDemoFounderWishes() {
    // Verificar que Firebase esté disponible
    if (typeof database === 'undefined') {
        console.error('❌ Firebase no está disponible. Asegúrate de estar en la página correcta.');
        return;
    }

    const demoWishes = [
        {
            message: "May this year bring prosperity and success to all who dare to dream big! 🌟",
            author: "John Smith",
            country: "US",
            timestamp: Date.now() - 3600000 // 1 hora atrás
        },
        {
            message: "Wishing everyone love, health, and happiness throughout the coming year! ❤️",
            author: "María García",
            country: "ES",
            timestamp: Date.now() - 7200000 // 2 horas atrás
        },
        {
            message: "Let's make this year unforgettable with kindness, courage, and innovation! 🚀",
            author: "李明",
            country: "CN",
            timestamp: Date.now() - 10800000 // 3 horas atrás
        },
        {
            message: "May peace and understanding unite all nations in the year ahead! 🕊️",
            author: "Sophie Martin",
            country: "FR",
            timestamp: Date.now() - 14400000 // 4 horas atrás
        }
    ];

    console.log('🚀 Agregando 4 deseos de prueba de $3.99...');

    try {
        const wishesRef = database.ref('wishes/founder');

        for (let i = 0; i < demoWishes.length; i++) {
            const wish = demoWishes[i];
            await wishesRef.push(wish);
            console.log(`✅ Deseo ${i + 1}/4 agregado`);
        }

        console.log('✅ ¡Todos los deseos de prueba fueron agregados exitosamente!');
        console.log('🔄 Recarga la página para verlos');

    } catch (error) {
        console.error('❌ Error al agregar deseos:', error);
    }
})();
