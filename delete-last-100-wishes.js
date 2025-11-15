/**
 * Script para eliminar los últimos 100 deseos agregados
 *
 * INSTRUCCIONES:
 * 1. Abre la página en el navegador
 * 2. Abre la consola (F12)
 * 3. Copia y pega este código
 * 4. Presiona Enter
 * 5. Recarga la página
 */

(async function deleteLast100Wishes() {
    if (typeof database === 'undefined') {
        console.error('❌ Firebase no está disponible.');
        return;
    }

    console.log('🗑️ Eliminando últimos 100 deseos agregados...');

    try {
        // Obtener todos los deseos Star
        const snapshot = await database.ref('wishes/star').once('value');
        const wishes = snapshot.val() || {};

        // Convertir a array con keys para poder ordenar y eliminar
        const wishesArray = Object.entries(wishes).map(([key, wish]) => ({
            key: key,
            timestamp: wish.timestamp || 0
        }));

        // Ordenar por timestamp (más recientes primero)
        wishesArray.sort((a, b) => b.timestamp - a.timestamp);

        // Tomar los primeros 100 (los más recientes)
        const toDelete = wishesArray.slice(0, 100);

        console.log(`📊 Total de deseos Star: ${wishesArray.length}`);
        console.log(`🗑️ Se eliminarán los ${toDelete.length} más recientes`);

        // Confirmar antes de eliminar
        const confirm = window.confirm(
            `¿Estás seguro de eliminar los ${toDelete.length} deseos más recientes?\n\n` +
            `Quedarán ${wishesArray.length - toDelete.length} deseos Star en Firebase.`
        );

        if (!confirm) {
            console.log('❌ Operación cancelada por el usuario');
            return;
        }

        // Eliminar los deseos seleccionados
        let deleted = 0;
        for (const wish of toDelete) {
            await database.ref(`wishes/star/${wish.key}`).remove();
            deleted++;

            if (deleted % 10 === 0) {
                console.log(`✅ Eliminados ${deleted}/${toDelete.length}`);
            }
        }

        console.log(`✅ ¡${deleted} deseos eliminados exitosamente!`);
        console.log(`📊 Deseos restantes: ${wishesArray.length - deleted}`);
        console.log('🔄 Recarga la página para ver los cambios');

    } catch (error) {
        console.error('❌ Error al eliminar deseos:', error);
    }
})();
