/**
 * Script para eliminar deseos que NO tienen autor/nombre
 *
 * INSTRUCCIONES:
 * 1. Abre la página en el navegador
 * 2. Abre la consola (F12)
 * 3. Copia y pega este código
 * 4. Presiona Enter
 * 5. Confirma en el popup
 * 6. Recarga la página
 */

(async function deleteWishesWithoutAuthor() {
    if (typeof database === 'undefined') {
        console.error('❌ Firebase no está disponible.');
        return;
    }

    console.log('🔍 Buscando deseos sin autor...');

    try {
        let totalFound = 0;
        let totalDeleted = 0;
        const toDelete = {
            star: [],
            founder: []
        };

        // Buscar en ambos tiers
        for (const tier of ['star', 'founder']) {
            const snapshot = await database.ref(`wishes/${tier}`).once('value');
            const wishes = snapshot.val() || {};

            for (const [key, wish] of Object.entries(wishes)) {
                // Verificar si NO tiene author o está vacío
                if (!wish.author || wish.author.trim() === '') {
                    toDelete[tier].push({
                        key: key,
                        text: wish.text || '(sin texto)',
                        timestamp: wish.timestamp
                    });
                    totalFound++;
                }
            }
        }

        console.log(`📊 Deseos encontrados sin autor:`);
        console.log(`   - Star: ${toDelete.star.length}`);
        console.log(`   - Founder: ${toDelete.founder.length}`);
        console.log(`   - TOTAL: ${totalFound}`);

        if (totalFound === 0) {
            console.log('✅ No hay deseos sin autor. Todo está bien.');
            return;
        }

        // Mostrar algunos ejemplos
        console.log('\n📋 Ejemplos de deseos que se eliminarán:');
        const examples = [...toDelete.star, ...toDelete.founder].slice(0, 5);
        examples.forEach((wish, index) => {
            const preview = wish.text.substring(0, 50);
            console.log(`   ${index + 1}. "${preview}..."`);
        });

        // Confirmar antes de eliminar
        const confirm = window.confirm(
            `¿Estás seguro de eliminar ${totalFound} deseos SIN AUTOR?\n\n` +
            `Star: ${toDelete.star.length}\n` +
            `Founder: ${toDelete.founder.length}\n\n` +
            `Esta acción NO se puede deshacer.`
        );

        if (!confirm) {
            console.log('❌ Operación cancelada por el usuario');
            return;
        }

        // Eliminar deseos sin autor
        for (const tier of ['star', 'founder']) {
            for (const wish of toDelete[tier]) {
                await database.ref(`wishes/${tier}/${wish.key}`).remove();
                totalDeleted++;

                if (totalDeleted % 10 === 0) {
                    console.log(`🗑️ Eliminados ${totalDeleted}/${totalFound}...`);
                }
            }
        }

        console.log(`✅ ¡${totalDeleted} deseos sin autor eliminados exitosamente!`);
        console.log('🔄 Recarga la página para ver los cambios');

    } catch (error) {
        console.error('❌ Error al eliminar deseos:', error);
    }
})();
