/**
 * Script para agregar 100 deseos MÁS (adicionales) Star ($1.49) a Firebase
 * Todos únicos, diferentes a los anteriores
 *
 * INSTRUCCIONES:
 * 1. Abre la página en el navegador
 * 2. Abre la consola (F12)
 * 3. Copia y pega este código
 * 4. Presiona Enter
 * 5. Recarga la página
 */

(async function add100MoreWishes() {
    if (typeof database === 'undefined') {
        console.error('❌ Firebase no está disponible.');
        return;
    }

    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    // Títulos aleatorios para Star wishes
    const STAR_TITLES = [
        'Starlight Dream',
        'Moonbeam Wish',
        'Sunrise Hope',
        'Crystal Vision',
        'Aurora Dream',
        'Twilight Wish',
        'Ocean Breeze',
        'Mountain Echo',
        'Forest Whisper',
        'Desert Star',
        'Northern Light',
        'Southern Cross'
    ];

    function getRandomTitle() {
        return STAR_TITLES[Math.floor(Math.random() * STAR_TITLES.length)];
    }

    // 100 deseos ADICIONALES - todos únicos y diferentes
    const wishes = [
        // Español - Emotivos
        { message: "Que mi papá encuentre trabajo pronto 🙏", author: "Julieta", country: "AR" },
        { message: "Poder mudarme solo este año finalmente", author: "Tomás", country: "MX" },
        { message: "Que mi hermana se recupere completamente", author: "Eduardo", country: "ES" },
        { message: "Adoptar un perrito de la calle ❤️", author: "Martina", country: "CL" },
        { message: "Reconciliarme con mi mejor amigo", author: "Facundo", country: "UY" },
        { message: "Conseguir la beca para estudiar afuera", author: "Catalina", country: "CO" },
        { message: "Que mi abuela viva muchos años más", author: "Sebastián", country: "PE" },
        { message: "Superar mi miedo a hablar en público", author: "Agustina", country: "AR" },
        { message: "Aprender a tocar la guitarra este año", author: "Joaquín", country: "MX" },
        { message: "Conocer el mar por primera vez 🌊", author: "Antonella", country: "BO" },
        { message: "Que mis padres se vuelvan a llevar bien", author: "Rodrigo", country: "VE" },
        { message: "Publicar mi primer libro este año 📚", author: "Florencia", country: "AR" },
        { message: "Correr mi primera maratón completa", author: "Matías", country: "CL" },
        { message: "Que mi negocio sobreviva este año", author: "Guadalupe", country: "MX" },
        { message: "Encontrar mi vocación verdadera", author: "Nicolás", country: "ES" },

        // Español - Trolls/Graciosos
        { message: "que mi gato deje de despertarme a las 5am", author: "catperson", country: "AR" },
        { message: "encontrar pareja antes que mi prima", author: "competitiva", country: "MX" },
        { message: "que mi roommate aprenda a lavar los platos", author: "cansado", country: "ES" },
        { message: "llegar a diamond en lol este año si o si", author: "hardstuck", country: "AR" },
        { message: "que mi ex vea lo feliz que soy sin el/ella", author: "venganza", country: "CL" },
        { message: "dejar de procrastinar desde mañana", author: "procrastinator", country: "MX" },
        { message: "que inventen delivery de asado", author: "carnívoro", country: "AR" },
        { message: "ganarle una sola vez a mi hermano en fifa", author: "loser", country: "UY" },
        { message: "que netflix agregue mis series favoritas", author: "binger", country: "CO" },
        { message: "dormir 8 horas seguidas aunque sea una vez", author: "insomne", country: "PE" },
        { message: "que mi crush vea mi historia de instagram", author: "stalker", country: "AR" },
        { message: "subir una foto y que tenga mas de 100 likes", author: "influencer", country: "MX" },
        { message: "wifi gratis en todo el mundo", author: "nómade digital", country: "ES" },
        { message: "que inventen calorias negativas", author: "foodie eterno", country: "AR" },
        { message: "encontrar la serie perfecta para ver", author: "aburrido", country: "CL" },

        // Inglés - Emotivos
        { message: "Start my own business and make it work", author: "Entrepreneur", country: "US" },
        { message: "Reconnect with my childhood best friend", author: "Nostalgic", country: "CA" },
        { message: "Learn to speak Spanish fluently 🇪🇸", author: "Language learner", country: "US" },
        { message: "Adopt a rescue dog this year 🐕", author: "Animal lover", country: "GB" },
        { message: "Save enough money for a house deposit", author: "Saver", country: "AU" },
        { message: "Get my driver's license finally", author: "Late bloomer", country: "US" },
        { message: "Overcome my anxiety and live freely", author: "Fighter", country: "CA" },
        { message: "Visit all 50 states this year", author: "Traveler", country: "US" },
        { message: "Write a song and perform it live", author: "Musician", country: "GB" },
        { message: "Make my parents proud of me", author: "Son", country: "AU" },
        { message: "Finish writing my novel this year", author: "Writer", country: "US" },
        { message: "Get accepted into my dream university", author: "Student", country: "CA" },
        { message: "Learn to cook like my grandmother", author: "Grandson", country: "US" },
        { message: "Build confidence to ask someone out", author: "Shy", country: "GB" },
        { message: "Start therapy and work on myself", author: "Self care", country: "US" },

        // Inglés - Trolls/Graciosos
        { message: "stop biting my nails challenge 2026", author: "nervous", country: "US" },
        { message: "find out what i want to do with my life", author: "lost", country: "GB" },
        { message: "get 10k followers doing absolutely nothing", author: "lazy influencer", country: "US" },
        { message: "beat my sister at monopoly just once", author: "competitive sibling", country: "CA" },
        { message: "make a viral tiktok by accident", author: "aspiring tiktoker", country: "US" },
        { message: "stop saying yes when i mean no", author: "people pleaser", country: "AU" },
        { message: "learn to parallel park without crying", author: "bad driver", country: "GB" },
        { message: "find the perfect spotify playlist", author: "music addict", country: "US" },
        { message: "survive family gatherings without drama", author: "peacekeeper", country: "CA" },
        { message: "get through one day without coffee", author: "caffeine dependent", country: "US" },
        { message: "stop checking my ex's instagram", author: "not over it", country: "GB" },
        { message: "win an argument with the internet", author: "optimistic", country: "US" },
        { message: "figure out what adulting actually means", author: "confused 20 something", country: "AU" },
        { message: "remember where i put my keys", author: "forgetful", country: "CA" },
        { message: "find matching socks in the laundry", author: "eternal struggle", country: "US" },

        // Portugués - Emotivos
        { message: "Me formar na faculdade com louvor", author: "Estudante dedicado", country: "BR" },
        { message: "Fazer as pazes com meu irmão", author: "Irmã arrependida", country: "BR" },
        { message: "Abrir minha própria empresa", author: "Empreendedor", country: "PT" },
        { message: "Aprender a cozinhar que nem minha vó", author: "Neto saudoso", country: "BR" },
        { message: "Conseguir adotar uma criança", author: "Esperançoso", country: "PT" },
        { message: "Vencer minha depressão de uma vez", author: "Lutador", country: "BR" },
        { message: "Visitar Portugal pela primeira vez", author: "Descendente", country: "BR" },
        { message: "Fazer meu pai se orgulhar de mim", author: "Filho dedicado", country: "PT" },

        // Portugués - Trolls/Graciosos
        { message: "parar de deixar tudo pra ultima hora", author: "rei da procrastinação", country: "BR" },
        { message: "acordar sem apertar soneca 10 vezes", author: "dorminhoco crônico", country: "BR" },
        { message: "entender o que a crush quis dizer com ok", author: "confuso", country: "PT" },
        { message: "comer açai todo dia e nao engordar", author: "brasileiro raiz", country: "BR" },
        { message: "sobreviver ao carnaval inteiro", author: "animado", country: "BR" },
        { message: "achar uma vaga de estacionamento de primeira", author: "motorista", country: "PT" },
        { message: "vencer uma discussao com minha mae", author: "sonhador", country: "BR" },

        // Francés - Emotivos
        { message: "Déménager à Paris pour mes études", author: "Étudiant ambitieux", country: "FR" },
        { message: "Réconcilier mes parents divorcés", author: "Fils espérant", country: "BE" },
        { message: "Ouvrir ma propre boulangerie", author: "Boulanger", country: "FR" },
        { message: "Apprendre à parler japonais", author: "Passionné", country: "CH" },

        // Francés - Trolls/Graciosos
        { message: "arreter de dire oui a tout le monde", author: "gentil faible", country: "FR" },
        { message: "survivre aux repas de famille", author: "neveu fatigué", country: "BE" },
        { message: "comprendre l'humour britannique", author: "français perdu", country: "FR" },

        // Alemán - Emotivos
        { message: "Ein eigenes Haus in München kaufen", author: "Träumer", country: "DE" },
        { message: "Meine Familie wieder vereinen", author: "Hoffnungsvoll", country: "AT" },
        { message: "Deutsch perfekt sprechen lernen", author: "Ausländer", country: "CH" },

        // Alemán - Trolls/Graciosos
        { message: "aufhören alles zu überanalysieren", author: "typisch deutsch", country: "DE" },
        { message: "pünktlich zu spät kommen können", author: "entspannter", country: "AT" },

        // Italiano - Emotivos
        { message: "Aprire un ristorante con ricette della nonna", author: "Nipote affettuoso", country: "IT" },
        { message: "Imparare a ballare il tango", author: "Romantico", country: "IT" },
        { message: "Visitare tutti i paesi d'Italia", author: "Viaggiatore", country: "IT" },

        // Italiano - Trolls/Graciosos
        { message: "smettere di gesticolare quando parlo", author: "italiano vero", country: "IT" },
        { message: "bere caffè senza criticarlo", author: "purista", country: "IT" },

        // Ruso
        { message: "Переехать в Санкт-Петербург", author: "Мечтатель", country: "RU" },
        { message: "Научиться играть на пианино", author: "Музыкант", country: "RU" },
        { message: "перестать откладывать все на потом", author: "прокрастинатор", country: "RU" },

        // Chino
        { message: "考上心仪的大学 📚", author: "高三学生", country: "CN" },
        { message: "学会做正宗的中国菜", author: "海外华人", country: "CN" },
        { message: "不再熬夜玩手机", author: "夜猫子", country: "CN" },

        // Japonés
        { message: "日本一周旅行する 🗾", author: "旅行者", country: "JP" },
        { message: "アニメを見るのをやめる", author: "オタク", country: "JP" },
        { message: "毎日運動する習慣をつける", author: "健康志向", country: "JP" },

        // Coreano
        { message: "한국어 마스터하기 💪", author: "학생", country: "KR" },
        { message: "부모님께 효도하기", author: "효자", country: "KR" },
        { message: "게임 그만하고 공부하기", author: "학생2", country: "KR" },

        // Árabe
        { message: "أن أحج إلى مكة هذا العام", author: "مؤمن", country: "SA" },
        { message: "أن أتعلم لغة جديدة", author: "طموح", country: "EG" },

        // Otros idiomas
        { message: "Stoppen met uitstelgedrag", author: "uitsteller", country: "NL" },
        { message: "Nauczyć się gotować", author: "student", country: "PL" },
        { message: "Sluta scrolla sociala medier", author: "beroende", country: "SE" },
        { message: "Bırakmak sigara içmeyi", author: "karar", country: "TR" },
        { message: "अपने सपनों को पूरा करना", author: "सपने देखने वाला", country: "IN" },
        { message: "Lære å lage tradisjonell mat", author: "nordmann", country: "NO" }
    ];

    console.log('🚀 Agregando 100 deseos ADICIONALES...');

    try {
        const wishesRef = database.ref('wishes/star');

        for (let i = 0; i < wishes.length; i++) {
            const wish = wishes[i];
            const hoursAgo = Math.floor(Math.random() * 48);

            await wishesRef.push({
                text: wish.message,
                author: wish.author,
                country: wish.country,
                wishTitle: getRandomTitle(),
                price: 1.49,
                timestamp: now - (hoursAgo * oneHour)
            });

            if ((i + 1) % 10 === 0) {
                console.log(`✅ ${i + 1}/100 deseos adicionales agregados`);
            }
        }

        console.log('✅ ¡100 deseos ADICIONALES agregados!');
        console.log('🔄 Recarga la página');
        console.log('📊 Total de deseos ahora: ~227');
        console.log('📊 Contador mostrará: 225 deseos cumplidos');

    } catch (error) {
        console.error('❌ Error:', error);
    }
})();
