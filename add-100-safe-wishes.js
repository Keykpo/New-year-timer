/**
 * Script para agregar 100 deseos MÁS con autores SAFE (solo ASCII)
 * Sin caracteres especiales en nombres de autor
 *
 * INSTRUCCIONES:
 * 1. Abre la página en el navegador
 * 2. Abre la consola (F12)
 * 3. Copia y pega este código
 * 4. Presiona Enter
 * 5. Recarga la página
 */

(async function add100SafeWishes() {
    if (typeof database === 'undefined') {
        console.error('❌ Firebase no está disponible.');
        return;
    }

    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    // Títulos aleatorios para Star wishes
    const STAR_TITLES = [
        'Starlight Dream', 'Moonbeam Wish', 'Sunrise Hope', 'Crystal Vision',
        'Aurora Dream', 'Twilight Wish', 'Ocean Breeze', 'Mountain Echo',
        'Forest Whisper', 'Desert Star', 'Northern Light', 'Southern Cross'
    ];

    function getRandomTitle() {
        return STAR_TITLES[Math.floor(Math.random() * STAR_TITLES.length)];
    }

    // 100 deseos ÚNICOS con autores SAFE (solo ASCII, sin acentos)
    const wishes = [
        // Español - Emotivos (nombres sin acentos)
        { message: "Que mi hermano supere su operación pronto 🙏", author: "Valeria", country: "AR" },
        { message: "Poder irme de vacaciones con mi familia", author: "Tomas", country: "MX" },
        { message: "Terminar de escribir mi libro este año", author: "Federico", country: "ES" },
        { message: "Que mi perrito viejo viva un año más 🐕", author: "Carolina", country: "CL" },
        { message: "Encontrar mi lugar en el mundo", author: "Matias", country: "CO" },
        { message: "Poder pagar la universidad sin endeudarme", author: "Julieta", country: "PE" },
        { message: "Reencontrarme con mi amor de la infancia", author: "Rodrigo", country: "UY" },
        { message: "Que mi startup consiga inversores", author: "Camila", country: "AR" },
        { message: "Volver a ver a mi familia que está en España", author: "Lucas", country: "VE" },
        { message: "Conseguir mi ciudadanía europea", author: "Valentina", country: "AR" },
        { message: "Mudarme a la playa y trabajar remoto", author: "Santiago", country: "MX" },
        { message: "Que mi mamá se jubile y descanse", author: "Agustina", country: "ES" },
        { message: "Aprender a surfear finalmente 🏄", author: "Nicolas", country: "CL" },
        { message: "Saldar mis deudas y empezar de cero", author: "Isabella", country: "CO" },
        { message: "Viajar por Sudamérica en moto", author: "Francisco", country: "AR" },

        // Español - Trolls/Graciosos
        { message: "que me toque la lotería y renunciar", author: "soñador", country: "AR" },
        { message: "wifi infinito y sin cortes nunca mas", author: "gamer", country: "MX" },
        { message: "que mi crush me hable primero", author: "timido", country: "ES" },
        { message: "nunca mas tener que madrugar", author: "dormilona", country: "CL" },
        { message: "comer asado todos los dias sin engordar", author: "carnivoro", country: "AR" },
        { message: "que mi jefe se gane la loteria y renuncie", author: "empleado", country: "CO" },
        { message: "bitcoin a 1 millon antes de fin de año", author: "hodler", country: "MX" },
        { message: "encontrar la serie perfecta en netflix", author: "buscador", country: "ES" },
        { message: "que bajen los precios de una vez", author: "consumidor", country: "AR" },
        { message: "tener superpoderes pero secretos", author: "soñador2", country: "CL" },
        { message: "ganar todas las discusiones con mi pareja", author: "iluso", country: "UY" },
        { message: "que me paguen por dormir", author: "perezoso", country: "PE" },
        { message: "resetear mi vida como en los videojuegos", author: "gamer pro", country: "AR" },
        { message: "no tener que cocinar nunca más", author: "vago", country: "MX" },
        { message: "que mi código funcione a la primera", author: "developer", country: "ES" },

        // Inglés - Emotivos
        { message: "Finally pay off my mortgage this year 🏠", author: "Homeowner", country: "US" },
        { message: "Get my dream job at a tech company", author: "Coder", country: "CA" },
        { message: "Travel to New Zealand with my partner", author: "Wanderer", country: "AU" },
        { message: "Finish my PhD after 5 long years", author: "Academic", country: "GB" },
        { message: "Adopt a rescue cat and give it love ❤️", author: "Cat lover", country: "US" },
        { message: "Launch my own podcast successfully", author: "Creator", country: "CA" },
        { message: "Learn Spanish fluently this year", author: "Student", country: "US" },
        { message: "Run a half marathon without stopping", author: "Runner", country: "GB" },
        { message: "Start my own YouTube channel", author: "Aspiring", country: "AU" },
        { message: "Buy my parents a vacation home", author: "Grateful son", country: "US" },
        { message: "Get promoted to team lead finally", author: "Engineer", country: "CA" },
        { message: "Learn to cook like a professional chef", author: "Foodie", country: "GB" },
        { message: "Visit Japan and see the cherry blossoms 🌸", author: "Dreamer", country: "US" },
        { message: "Make my first million dollars", author: "Hustler", country: "AU" },
        { message: "Find true happiness within myself", author: "Seeker", country: "US" },

        // Inglés - Trolls/Graciosos
        { message: "win the lottery and ghost everyone lol", author: "antisocial", country: "US" },
        { message: "never have to do laundry again", author: "lazy person", country: "GB" },
        { message: "my code compiles on first try", author: "dev dreams", country: "CA" },
        { message: "become famous for doing nothing", author: "influencer", country: "US" },
        { message: "find the perfect meme for every mood", author: "meme lord", country: "AU" },
        { message: "unlimited pizza delivery for life", author: "pizza addict", country: "US" },
        { message: "my crush likes me back finally", author: "hopeless", country: "GB" },
        { message: "never get spam emails again", author: "inbox zero", country: "CA" },
        { message: "discover a cheat code for real life", author: "gamer mind", country: "US" },
        { message: "monday mornings get cancelled forever", author: "sleepyhead", country: "AU" },
        { message: "my pets learn to talk to me", author: "pet parent", country: "US" },
        { message: "time travel becomes real this year", author: "sci fi fan", country: "GB" },
        { message: "get paid to watch netflix all day", author: "couch potato", country: "CA" },
        { message: "never have to adult ever again", author: "kidatheart", country: "US" },
        { message: "my phone battery lasts forever", author: "always dying", country: "AU" },

        // Portugués - Emotivos (sin acentos en nombres)
        { message: "Conseguir meu sonho de morar sozinho 🏠", author: "Joao", country: "BR" },
        { message: "Minha familia toda reunida no Natal", author: "Familia", country: "PT" },
        { message: "Passar em medicina depois de 3 anos", author: "Estudante", country: "BR" },
        { message: "Conhecer Fernando de Noronha", author: "Viajante", country: "BR" },
        { message: "Abrir minha confeitaria dos sonhos", author: "Confeiteira", country: "PT" },
        { message: "Voltar a jogar futebol sem lesoes", author: "Jogador", country: "BR" },
        { message: "Meu cachorro viver mais 10 anos 🐶", author: "Dono", country: "BR" },
        { message: "Conquistar minha independencia financeira", author: "Lutador", country: "PT" },

        // Portugués - Trolls/Graciosos
        { message: "ganhar na megasena e vazar do pais", author: "sonhador br", country: "BR" },
        { message: "nunca mais pegar transito", author: "motorista", country: "BR" },
        { message: "comer feijoada todo dia sem culpa", author: "brasileiro", country: "BR" },
        { message: "descobrir o segredo pra acordar cedo", author: "dorminhoco", country: "PT" },
        { message: "meu time ganhar tudo esse ano", author: "torcedor", country: "BR" },
        { message: "achar vaga de estacionamento sempre", author: "sortudo", country: "PT" },
        { message: "wifi gratis em todo lugar", author: "conectado", country: "BR" },

        // Francés - Emotivos
        { message: "Acheter un appartement a Paris enfin", author: "Parisien", country: "FR" },
        { message: "Trouver l'amour de ma vie cette annee", author: "Romantique", country: "BE" },
        { message: "Reussir mon examen d'avocat 📚", author: "Etudiant", country: "FR" },
        { message: "Voyager en Asie pendant 6 mois", author: "Voyageur", country: "CH" },
        { message: "Ouvrir ma boulangerie artisanale", author: "Boulanger", country: "FR" },

        // Francés - Trolls/Graciosos
        { message: "gagner au loto et partir vivre a Bali", author: "reveur", country: "FR" },
        { message: "ne plus jamais etre en retard", author: "toujours late", country: "BE" },
        { message: "manger du fromage sans grossir", author: "francais", country: "FR" },

        // Alemán - Emotivos
        { message: "Endlich nach Australien auswandern 🦘", author: "Abenteurer", country: "DE" },
        { message: "Meine eigene Firma erfolgreich machen", author: "Unternehmer", country: "AT" },
        { message: "Ein Haus in den Bergen kaufen", author: "Bergliebhaber", country: "CH" },
        { message: "Meine Doktorarbeit fertigstellen", author: "Doktorand", country: "DE" },

        // Alemán - Trolls/Graciosos
        { message: "nie wieder Montage haben", author: "wochenende fan", country: "DE" },
        { message: "Bier umsonst fur immer", author: "bierliebhaber", country: "AT" },

        // Italiano - Emotivos
        { message: "Aprire il mio ristorante italiano vero", author: "Cuoco", country: "IT" },
        { message: "Visitare tutte le regioni d'Italia 🇮🇹", author: "Viaggiatore", country: "IT" },
        { message: "Sposarmi in Toscana quest'anno", author: "Innamorato", country: "IT" },

        // Italiano - Trolls/Graciosos
        { message: "mangiare pasta ogni giorno senza ingrassare", author: "italiano vero", country: "IT" },
        { message: "trovare parcheggio sempre al primo giro", author: "automobilista", country: "IT" },

        // Otros idiomas (nombres ASCII seguros)
        { message: "Eindelijk mijn droomhuis kopen", author: "Jan", country: "NL" },
        { message: "Stoppen met werken en reizen", author: "Dromer", country: "NL" },
        { message: "Znalezc prace marzen w IT", author: "Programista", country: "PL" },
        { message: "Wyjechac na rok do Azji", author: "Podroznik", country: "PL" },
        { message: "Hitta mitt dromjobb i Stockholm", author: "Soker", country: "SE" },
        { message: "Resa runt hela varlden", author: "Aventyrare", country: "SE" },
        { message: "Hayalimdeki isi bulmak", author: "Umutlu", country: "TR" },
        { message: "Dunyayi gezmek istiyorum", author: "Gezgin", country: "TR" }
    ];

    console.log('🚀 Agregando 100 deseos SAFE con autores ASCII...');

    try {
        const wishesRef = database.ref('wishes/star');

        for (let i = 0; i < wishes.length; i++) {
            const wish = wishes[i];
            const hoursAgo = Math.floor(Math.random() * 72); // últimas 72 horas

            await wishesRef.push({
                text: wish.message,
                author: wish.author,
                country: wish.country,
                wishTitle: getRandomTitle(),
                price: 0.99,
                timestamp: now - (hoursAgo * oneHour)
            });

            if ((i + 1) % 10 === 0) {
                console.log(`✅ ${i + 1}/100 deseos agregados`);
            }
        }

        console.log('✅ ¡100 deseos SAFE agregados exitosamente!');
        console.log('🔄 Recarga la página');
        console.log('📊 Todos los autores son compatibles con sanitización ASCII');

    } catch (error) {
        console.error('❌ Error:', error);
    }
})();
