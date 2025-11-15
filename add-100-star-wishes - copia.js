/**
 * Script para agregar 100 deseos Star ($1.49) REALISTAS a Firebase
 * Con frases únicas, trolls, emojis y muy variados
 *
 * INSTRUCCIONES:
 * 1. Abre la página en el navegador
 * 2. Abre la consola (F12)
 * 3. Copia y pega este código
 * 4. Presiona Enter
 * 5. Recarga la página
 */

(async function add100StarWishes() {
    if (typeof database === 'undefined') {
        console.error('❌ Firebase no está disponible.');
        return;
    }

    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    // 100 deseos REALISTAS - variados, únicos, algunos trolls
    const wishes = [
        // Español - Serios/Emotivos
        { message: "Que mi mamá se cure pronto, te amo vieja ❤️", author: "Mateo", country: "AR" },
        { message: "Este año me recibo SÍ O SÍ!! 🎓", author: "Camila", country: "MX" },
        { message: "Ojalá mi novio por fin me proponga matrimonio jajaja", author: "Lucía", country: "CO" },
        { message: "Salud para toda mi familia, los amo 💕", author: "Santiago", country: "ES" },
        { message: "Que consiga ese trabajo remoto que tanto quiero 🙏", author: "Valentina", country: "CL" },
        { message: "Volver a ver a mi abuela que está en otro país 😢", author: "Diego", country: "PE" },
        { message: "Encontrar el amor de mi vida este año por favor", author: "Isabella", country: "UY" },
        { message: "Que mi emprendimiento despegue de una vez 🚀", author: "Martín", country: "VE" },
        { message: "Poder viajar a Europa con mi mejor amiga", author: "Sofía", country: "EC" },
        { message: "Terminar de pagar mis deudas y vivir tranquilo", author: "Andrés", country: "CR" },

        // Español - Trolls/Graciosos
        { message: "que mi ex vuelva arrastrándose JAJAJA 😂", author: "Anónimo", country: "AR" },
        { message: "conseguir sugar daddy rico pls", author: "Fernanda", country: "MX" },
        { message: "que bajen los precios lpm", author: "Carlos", country: "AR" },
        { message: "Ganar la lotería y mandar todo a la mierda 💸", author: "Roberto", country: "ES" },
        { message: "que mi suegra se mude LEJOS", author: "Laura", country: "CO" },
        { message: "no volver a trabajar nunca más amen", author: "Pablo", country: "CL" },
        { message: "conseguir novia gamer que me entienda 🎮", author: "Nico", country: "UY" },
        { message: "que mi jefe renuncie antes que yo jajajaj", author: "Ana", country: "PE" },
        { message: "bajar 20 kilos comiendo lo que quiera", author: "Marta", country: "MX" },
        { message: "128gb de ram para la pc nueva", author: "Gamer", country: "AR" },

        // Inglés - Serios/Emotivos
        { message: "Finally get my dream job at Google 🙏", author: "Alex", country: "US" },
        { message: "My mom beats cancer this year ❤️", author: "Sarah", country: "GB" },
        { message: "Find someone who truly loves me", author: "Mike", country: "CA" },
        { message: "Buy my first house with my savings", author: "Emma", country: "AU" },
        { message: "Graduate with honors and make my parents proud", author: "James", country: "US" },
        { message: "Travel to Japan finally!! Been dreaming forever", author: "Olivia", country: "GB" },
        { message: "Get promoted to senior developer 💻", author: "David", country: "CA" },
        { message: "My startup gets funded this year 🚀", author: "Lisa", country: "US" },
        { message: "Meet my online friends IRL", author: "Tom", country: "AU" },
        { message: "Pay off my student loans once and for all", author: "Jessica", country: "US" },

        // Inglés - Trolls/Graciosos
        { message: "my ex sees me thriving and regrets everything lol", author: "karma", country: "US" },
        { message: "get rich without doing anything", author: "lazy", country: "GB" },
        { message: "unlimited pizza for life pls", author: "foodie", country: "US" },
        { message: "become tiktok famous overnight 📱", author: "gen z", country: "CA" },
        { message: "never have to adult again", author: "Peter Pan", country: "AU" },
        { message: "my crushes crush likes me back", author: "Anonymous", country: "US" },
        { message: "bitcoin to 1 million lets gooo 🚀", author: "hodler", country: "GB" },
        { message: "find the perfect meme for every situation", author: "memegod", country: "US" },
        { message: "my code works on first try", author: "dev dreams", country: "CA" },
        { message: "no more monday mornings ever", author: "sleepy", country: "AU" },

        // Portugués - Serios/Emotivos
        { message: "Conseguir comprar a casa própria esse ano 🏠", author: "João", country: "BR" },
        { message: "Minha mãe finalmente se aposentar", author: "Maria", country: "PT" },
        { message: "Passar no concurso público 🙏", author: "Pedro", country: "BR" },
        { message: "Conhecer meu ídolo pessoalmente", author: "Ana", country: "PT" },
        { message: "Casar com o amor da minha vida ❤️", author: "Lucas", country: "BR" },
        { message: "Viajar pra Disney com minha família", author: "Beatriz", country: "BR" },
        { message: "Conseguir aquele emprego dos sonhos", author: "Rafael", country: "PT" },
        { message: "Terminar a faculdade finalmente", author: "Juliana", country: "BR" },

        // Portugués - Trolls/Graciosos
        { message: "ganhar na mega sena e sumir", author: "sonhador", country: "BR" },
        { message: "meu crush me notar finalmente kkkkk", author: "apaixonada", country: "BR" },
        { message: "nunca mais ter que acordar cedo", author: "dorminhoco", country: "PT" },
        { message: "comer pizza todo dia e não engordar", author: "foodlover", country: "BR" },
        { message: "virar influencer e ganhar grana fácil", author: "aspirante", country: "BR" },

        // Francés - Serios/Emotivos
        { message: "Trouver un travail qui me passionne vraiment", author: "Pierre", country: "FR" },
        { message: "Acheter mon premier appartement à Paris", author: "Marie", country: "FR" },
        { message: "Retrouver ma meilleure amie d'enfance", author: "Sophie", country: "BE" },
        { message: "Réussir mon master avec mention 🎓", author: "Antoine", country: "CH" },

        // Francés - Trolls/Graciosos
        { message: "que mon ex me voit heureux et regrette mdr", author: "vengeance", country: "FR" },
        { message: "gagner au loto et partir vivre sur une île", author: "rêveur", country: "FR" },
        { message: "plus jamais de lundis", author: "flemme", country: "BE" },

        // Alemán - Serios/Emotivos
        { message: "Endlich meine Traumwohnung finden 🏠", author: "Hans", country: "DE" },
        { message: "Meinen Traumjob in Berlin bekommen", author: "Anna", country: "DE" },
        { message: "Mit meiner Familie nach Japan reisen", author: "Peter", country: "AT" },
        { message: "Mein eigenes Business erfolgreich starten", author: "Klaus", country: "CH" },

        // Alemán - Trolls/Graciosos
        { message: "im Lotto gewinnen und nie wieder arbeiten", author: "träumer", country: "DE" },
        { message: "meine Ex bereut alles haha", author: "rache", country: "AT" },

        // Italiano - Serios/Emotivos
        { message: "Trovare il lavoro dei miei sogni quest'anno", author: "Marco", country: "IT" },
        { message: "Comprare casa finalmente 🏡", author: "Giulia", country: "IT" },
        { message: "Sposarmi con l'amore della mia vita", author: "Alessandro", country: "IT" },

        // Italiano - Trolls/Graciosos
        { message: "vincere alla lotteria e sparire", author: "sognatore", country: "IT" },
        { message: "mangiare pasta tutti i giorni senza ingrassare", author: "goloso", country: "IT" },

        // Ruso
        { message: "Купить свою квартиру в Москве 🏠", author: "Иван", country: "RU" },
        { message: "Найти работу мечты с хорошей зарплатой", author: "Анна", country: "RU" },
        { message: "выиграть в лотерею и уехать на Бали", author: "мечтатель", country: "RU" },

        // Chino
        { message: "今年一定要找到好工作 💼", author: "小明", country: "CN" },
        { message: "买到自己的房子", author: "小红", country: "CN" },
        { message: "发财暴富走上人生巅峰 💰", author: "梦想家", country: "CN" },

        // Japonés
        { message: "夢の仕事に就けますように 🙏", author: "田中", country: "JP" },
        { message: "彼女ができますように ❤️", author: "佐藤", country: "JP" },
        { message: "宝くじ当たって仕事辞めたい", author: "夢見る人", country: "JP" },

        // Árabe
        { message: "أتمنى أن أجد وظيفة أحلامي", author: "أحمد", country: "SA" },
        { message: "أن أتزوج هذا العام ❤️", author: "فاطمة", country: "EG" },
        { message: "أربح اليانصيب وأسافر العالم", author: "حالم", country: "AE" },

        // Coreano
        { message: "좋은 직장 꼭 구하기 🙏", author: "김민수", country: "KR" },
        { message: "올해는 꼭 사랑 찾기 ❤️", author: "박지민", country: "KR" },
        { message: "로또 당첨되어서 회사 때려치기", author: "꿈나무", country: "KR" },

        // Holandés
        { message: "Eindelijk mijn droomhuis kopen", author: "Jan", country: "NL" },
        { message: "loterij winnen en stoppen met werken", author: "dromer", country: "NL" },

        // Polaco
        { message: "Znaleźć pracę marzeń w tym roku", author: "Jan", country: "PL" },
        { message: "wygrać na loterii i wyjechać", author: "marzyciel", country: "PL" },

        // Turco
        { message: "Hayallerimin işini bulmak", author: "Ahmet", country: "TR" },
        { message: "piyango kazanıp işi bırakmak", author: "hayalperest", country: "TR" },

        // Sueco
        { message: "Hitta mitt drömjobb äntligen", author: "Erik", country: "SE" },
        { message: "vinna på lotto och sluta jobba", author: "drömmare", country: "SE" },

        // Hindi
        { message: "सपनों की नौकरी मिले 🙏", author: "राज", country: "IN" },
        { message: "लॉटरी जीतकर अमीर बनना", author: "सपने देखने वाला", country: "IN" }
    ];

    console.log('🚀 Agregando 100 deseos REALISTAS...');

    try {
        const wishesRef = database.ref('wishes/star');

        for (let i = 0; i < wishes.length; i++) {
            const wish = wishes[i];
            const hoursAgo = Math.floor(Math.random() * 48);

            await wishesRef.push({
                message: wish.message,
                author: wish.author,
                country: wish.country,
                timestamp: now - (hoursAgo * oneHour)
            });

            if ((i + 1) % 10 === 0) {
                console.log(`✅ ${i + 1}/100 deseos agregados`);
            }
        }

        console.log('✅ ¡100 deseos REALISTAS agregados!');
        console.log('🔄 Recarga la página');
        console.log('📊 Contador mostrará: 125 deseos cumplidos');

    } catch (error) {
        console.error('❌ Error:', error);
    }
})();
