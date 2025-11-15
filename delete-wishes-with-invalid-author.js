/**
 * Script para eliminar deseos cuyo autor se convierte en vacío después de sanitización
 * (nombres con caracteres no-ASCII como chino, ruso, emojis, etc.)
 *
 * INSTRUCCIONES:
 * 1. Abre la página en el navegador
 * 2. Abre la consola (F12)
 * 3. Copia y pega este código
 * 4. Presiona Enter
 * 5. Confirma en el popup
 * 6. Recarga la página
 */

(async function deleteWishesWithInvalidAuthor() {
    if (typeof database === 'undefined') {
        console.error('❌ Firebase no está disponible.');
        return;
    }

    // Función de sanitización copiada de script.js
    function sanitizeHTML(str) {
        if (!str || typeof str !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/on\w+="[^"]*"/gi, '')
            .replace(/on\w+='[^']*'/gi, '');
    }

    function sanitizeAuthorName(name) {
        if (!name || typeof name !== 'string') return '';

        // Trim and limit length
        name = name.trim().substring(0, 15);

        // Remove any HTML tags and escape special characters
        name = sanitizeHTML(name);

        // Only allow letters, numbers, spaces, and basic punctuation
        name = name.replace(/[^a-zA-Z0-9\s\-_.,!?]/g, '');

        // Final trim to remove any extra spaces
        return name.trim();
    }

    console.log('🔍 Buscando deseos con autores que se vuelven vacíos después de sanitización...');

    try {
        let totalFound = 0;
        const toDelete = {
            star: [],
            founder: []
        };

        // Buscar en ambos tiers
        for (const tier of ['star', 'founder']) {
            const snapshot = await database.ref(`wishes/${tier}`).once('value');
            const wishes = snapshot.val() || {};

            for (const [key, wish] of Object.entries(wishes)) {
                const originalAuthor = wish.author || '';
                const sanitizedAuthor = sanitizeAuthorName(originalAuthor);

                // Si el autor sanitizado está vacío (aunque el original no lo esté)
                if (sanitizedAuthor === '') {
                    toDelete[tier].push({
                        key: key,
                        originalAuthor: originalAuthor,
                        text: wish.text || '(sin texto)',
                        timestamp: wish.timestamp
                    });
                    totalFound++;
                }
            }
        }

        console.log(`📊 Deseos con autores inválidos encontrados:`);
        console.log(`   - Star: ${toDelete.star.length}`);
        console.log(`   - Founder: ${toDelete.founder.length}`);
        console.log(`   - TOTAL: ${totalFound}`);

        if (totalFound === 0) {
            console.log('✅ No hay deseos con autores inválidos.');
            return;
        }

        // Mostrar ejemplos de autores inválidos
        console.log('\n📋 Ejemplos de autores inválidos que se eliminarán:');
        const examples = [...toDelete.star, ...toDelete.founder].slice(0, 10);
        examples.forEach((wish, index) => {
            console.log(`   ${index + 1}. "${wish.originalAuthor}" → (vacío después de sanitización)`);
        });

        // Confirmar antes de eliminar
        const confirm = window.confirm(
            `¿Eliminar ${totalFound} deseos con autores INVÁLIDOS?\n\n` +
            `(Nombres con caracteres no-ASCII que se vuelven vacíos)\n\n` +
            `Star: ${toDelete.star.length}\n` +
            `Founder: ${toDelete.founder.length}\n\n` +
            `Esta acción NO se puede deshacer.`
        );

        if (!confirm) {
            console.log('❌ Operación cancelada por el usuario');
            return;
        }

        // Eliminar deseos
        let totalDeleted = 0;
        for (const tier of ['star', 'founder']) {
            for (const wish of toDelete[tier]) {
                await database.ref(`wishes/${tier}/${wish.key}`).remove();
                totalDeleted++;

                if (totalDeleted % 10 === 0) {
                    console.log(`🗑️ Eliminados ${totalDeleted}/${totalFound}...`);
                }
            }
        }

        console.log(`✅ ¡${totalDeleted} deseos con autores inválidos eliminados!`);
        console.log('🔄 Recarga la página para ver los cambios');

    } catch (error) {
        console.error('❌ Error:', error);
    }
})();
