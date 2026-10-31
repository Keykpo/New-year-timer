'use strict';

/**
 * Country dataset for the programmatic "New Year countdown by country" pages.
 *
 * status:
 *   'published' -> pages are generated (EN + ES), indexed and listed in the sitemap
 *   'draft'     -> only used as data (hub table, "same time zone" lists); no page is generated
 *   'archived'  -> ignored everywhere
 *
 * zones: [IANA time zone, city/region (EN), city/region (ES)]. The first zone is the
 * primary one (capital or main population centre) and drives the live countdown.
 *
 * priority: editorial estimate of search demand (NOT measured volume). Replace with
 * Search Console / Keyword Planner data when available (see seo/README.md).
 *
 * traditions: only facts we are confident about. Leave empty rather than guess.
 */

const published = [
    {
        id: 'united-states', priority: 'high',
        name: { en: 'United States', es: 'Estados Unidos' },
        in: { en: 'in the United States', es: 'en Estados Unidos' },
        slug: { en: 'united-states', es: 'estados-unidos' },
        zones: [
            ['America/New_York', 'New York (Eastern)', 'Nueva York (hora del Este)'],
            ['America/Chicago', 'Chicago (Central)', 'Chicago (hora Central)'],
            ['America/Denver', 'Denver (Mountain)', 'Denver (hora de la Montaña)'],
            ['America/Phoenix', 'Phoenix (Arizona)', 'Phoenix (Arizona)'],
            ['America/Los_Angeles', 'Los Angeles (Pacific)', 'Los Ángeles (hora del Pacífico)'],
            ['America/Anchorage', 'Anchorage (Alaska)', 'Anchorage (Alaska)'],
            ['Pacific/Honolulu', 'Honolulu (Hawaii)', 'Honolulu (Hawái)']
        ],
        traditions: {
            en: 'The best-known celebration is the ball drop in Times Square, New York, a tradition that dates back to 1907. In the South, many families eat black-eyed peas on New Year\'s Day for good luck.',
            es: 'La celebración más conocida es la bajada de la bola en Times Square, Nueva York, una tradición que se remonta a 1907. En el sur del país muchas familias comen frijoles carita (black-eyed peas) el 1 de enero para atraer la buena suerte.'
        },
        blogMatch: ['Times Square', 'United States', 'America']
    },
    {
        id: 'canada', priority: 'high',
        name: { en: 'Canada', es: 'Canadá' },
        slug: { en: 'canada', es: 'canada' },
        zones: [
            ['America/Toronto', 'Toronto / Ottawa (Eastern)', 'Toronto / Ottawa (hora del Este)'],
            ['America/St_Johns', 'St. John\'s (Newfoundland)', 'St. John\'s (Terranova)'],
            ['America/Halifax', 'Halifax (Atlantic)', 'Halifax (hora del Atlántico)'],
            ['America/Winnipeg', 'Winnipeg (Central)', 'Winnipeg (hora Central)'],
            ['America/Regina', 'Regina (Saskatchewan)', 'Regina (Saskatchewan)'],
            ['America/Edmonton', 'Calgary / Edmonton (Mountain)', 'Calgary / Edmonton (hora de la Montaña)'],
            ['America/Vancouver', 'Vancouver (Pacific)', 'Vancouver (hora del Pacífico)']
        ],
        traditions: {
            en: 'In Vancouver, thousands of people take part in the Polar Bear Swim in the cold waters of English Bay on New Year\'s Day.',
            es: 'En Vancouver, miles de personas participan cada 1 de enero en el Polar Bear Swim, un baño en las aguas heladas de English Bay.'
        }
    },
    {
        id: 'mexico', priority: 'high',
        name: { en: 'Mexico', es: 'México' },
        slug: { en: 'mexico', es: 'mexico' },
        zones: [
            ['America/Mexico_City', 'Mexico City (Central)', 'Ciudad de México (hora del Centro)'],
            ['America/Cancun', 'Cancún (Quintana Roo)', 'Cancún (Quintana Roo)'],
            ['America/Mazatlan', 'Mazatlán (Pacific)', 'Mazatlán (hora del Pacífico)'],
            ['America/Tijuana', 'Tijuana (Northwest)', 'Tijuana (hora del Noroeste)']
        ],
        traditions: {
            en: 'Many Mexicans eat twelve grapes at midnight, one for each chime, making a wish with each one. Others wear red or yellow underwear for love or prosperity, or walk around the block with a suitcase to attract travel in the new year.',
            es: 'Muchas familias comen las doce uvas a medianoche, una por cada campanada y con un deseo cada una. También es común usar ropa interior roja o amarilla para atraer el amor o la prosperidad, o dar la vuelta a la manzana con una maleta para viajar durante el año.'
        },
        blogMatch: ['Mexico']
    },
    {
        id: 'brazil', priority: 'high',
        name: { en: 'Brazil', es: 'Brasil' },
        slug: { en: 'brazil', es: 'brasil' },
        zones: [
            ['America/Sao_Paulo', 'São Paulo / Rio de Janeiro / Brasília', 'São Paulo / Río de Janeiro / Brasilia'],
            ['America/Noronha', 'Fernando de Noronha', 'Fernando de Noronha'],
            ['America/Manaus', 'Manaus (Amazonas)', 'Manaos (Amazonas)'],
            ['America/Rio_Branco', 'Rio Branco (Acre)', 'Río Branco (Acre)']
        ],
        traditions: {
            en: 'Brazilians traditionally dress in white for Réveillon. On Copacabana beach in Rio de Janeiro, millions gather for the fireworks, and many people jump seven waves or offer flowers to Iemanjá, the goddess of the sea.',
            es: 'En Brasil es tradición vestirse de blanco para el Réveillon. En la playa de Copacabana, en Río de Janeiro, millones de personas se reúnen para ver los fuegos artificiales, y muchos saltan siete olas u ofrecen flores a Iemanjá, la diosa del mar.'
        },
        blogMatch: ['Brazil', 'Rio de Janeiro', 'Copacabana']
    },
    {
        id: 'argentina', priority: 'high',
        name: { en: 'Argentina', es: 'Argentina' },
        slug: { en: 'argentina', es: 'argentina' },
        zones: [['America/Argentina/Buenos_Aires', 'Buenos Aires', 'Buenos Aires']],
        traditions: {
            en: 'On the last working day of the year, office workers in central Buenos Aires throw shredded paper and old calendars out of their windows to say goodbye to the year.',
            es: 'El último día hábil del año, los oficinistas del centro de Buenos Aires arrojan por las ventanas papeles picados y calendarios viejos para despedir el año.'
        },
        blogMatch: ['Argentina', 'Buenos Aires']
    },
    {
        id: 'colombia', priority: 'high',
        name: { en: 'Colombia', es: 'Colombia' },
        slug: { en: 'colombia', es: 'colombia' },
        zones: [['America/Bogota', 'Bogotá', 'Bogotá']],
        traditions: {
            en: 'Popular Colombian customs include eating twelve grapes at midnight, wearing yellow underwear, walking around the block with an empty suitcase and burning an "año viejo", a life-size doll that represents the old year.',
            es: 'Entre las costumbres más populares están comer las doce uvas a medianoche, usar ropa interior amarilla, salir a dar la vuelta a la manzana con una maleta vacía y quemar el "año viejo", un muñeco de tamaño real que representa el año que termina.'
        },
        blogMatch: ['Colombia']
    },
    {
        id: 'chile', priority: 'high',
        name: { en: 'Chile', es: 'Chile' },
        slug: { en: 'chile', es: 'chile' },
        zones: [
            ['America/Santiago', 'Santiago', 'Santiago'],
            ['Pacific/Easter', 'Easter Island', 'Isla de Pascua']
        ],
        traditions: {
            en: 'The fireworks over the bay of Valparaíso are the biggest New Year show in the country. Many Chileans also eat a spoonful of lentils for prosperity and run around with a suitcase to attract travel.',
            es: 'Los fuegos artificiales sobre la bahía de Valparaíso son el mayor espectáculo de Año Nuevo del país. Muchos chilenos comen además una cucharada de lentejas para atraer la prosperidad y salen a correr con una maleta para viajar en el año nuevo.'
        },
        blogMatch: ['Chile', 'Valparaíso', 'Valparaiso']
    },
    {
        id: 'peru', priority: 'high',
        name: { en: 'Peru', es: 'Perú' },
        slug: { en: 'peru', es: 'peru' },
        zones: [['America/Lima', 'Lima', 'Lima']],
        traditions: {
            en: 'In Peru, wearing yellow on New Year\'s Eve is said to bring good luck, and many people eat twelve grapes at midnight.',
            es: 'En Perú se dice que vestir de amarillo en Nochevieja trae buena suerte, y muchas personas comen doce uvas a medianoche.'
        },
        blogMatch: ['Peru']
    },
    {
        id: 'venezuela', priority: 'medium',
        name: { en: 'Venezuela', es: 'Venezuela' },
        slug: { en: 'venezuela', es: 'venezuela' },
        zones: [['America/Caracas', 'Caracas', 'Caracas']],
        traditions: {
            en: 'Venezuelan families usually share hallacas at year-end dinners, eat twelve grapes at midnight and wear yellow underwear for good luck.',
            es: 'Las familias venezolanas suelen compartir hallacas en las cenas de fin de año, comer las doce uvas a medianoche y usar ropa interior amarilla para la buena suerte.'
        }
    },
    {
        id: 'ecuador', priority: 'medium',
        name: { en: 'Ecuador', es: 'Ecuador' },
        slug: { en: 'ecuador', es: 'ecuador' },
        zones: [
            ['America/Guayaquil', 'Quito / Guayaquil', 'Quito / Guayaquil'],
            ['Pacific/Galapagos', 'Galápagos Islands', 'Islas Galápagos']
        ],
        traditions: {
            en: 'At midnight, Ecuadorians burn "años viejos", effigies made of paper and sawdust that represent the year that is ending. Earlier in the day, men dressed as "widows" playfully ask passers-by for coins.',
            es: 'A medianoche los ecuatorianos queman los "años viejos", monigotes de papel y aserrín que representan el año que termina. Durante el día, hombres disfrazados de "viudas" piden monedas en broma a los transeúntes.'
        },
        blogMatch: ['Ecuador']
    },
    {
        id: 'bolivia', priority: 'medium',
        name: { en: 'Bolivia', es: 'Bolivia' },
        slug: { en: 'bolivia', es: 'bolivia' },
        zones: [['America/La_Paz', 'La Paz', 'La Paz']]
    },
    {
        id: 'uruguay', priority: 'medium',
        name: { en: 'Uruguay', es: 'Uruguay' },
        slug: { en: 'uruguay', es: 'uruguay' },
        zones: [['America/Montevideo', 'Montevideo', 'Montevideo']]
    },
    {
        id: 'paraguay', priority: 'medium',
        name: { en: 'Paraguay', es: 'Paraguay' },
        slug: { en: 'paraguay', es: 'paraguay' },
        zones: [['America/Asuncion', 'Asunción', 'Asunción']]
    },
    {
        id: 'cuba', priority: 'medium',
        name: { en: 'Cuba', es: 'Cuba' },
        slug: { en: 'cuba', es: 'cuba' },
        zones: [['America/Havana', 'Havana', 'La Habana']],
        traditions: {
            en: 'A well-known Cuban custom is throwing a bucket of water out of the door at midnight to wash away the bad luck of the old year.',
            es: 'Una costumbre cubana muy conocida es tirar un cubo de agua por la puerta a medianoche para llevarse la mala suerte del año que termina.'
        }
    },
    {
        id: 'dominican-republic', priority: 'medium',
        name: { en: 'Dominican Republic', es: 'República Dominicana' },
        in: { en: 'in the Dominican Republic', es: 'en República Dominicana' },
        slug: { en: 'dominican-republic', es: 'republica-dominicana' },
        zones: [['America/Santo_Domingo', 'Santo Domingo', 'Santo Domingo']]
    },
    {
        id: 'guatemala', priority: 'medium',
        name: { en: 'Guatemala', es: 'Guatemala' },
        slug: { en: 'guatemala', es: 'guatemala' },
        zones: [['America/Guatemala', 'Guatemala City', 'Ciudad de Guatemala']]
    },
    {
        id: 'costa-rica', priority: 'medium',
        name: { en: 'Costa Rica', es: 'Costa Rica' },
        slug: { en: 'costa-rica', es: 'costa-rica' },
        zones: [['America/Costa_Rica', 'San José', 'San José']]
    },
    {
        id: 'panama', priority: 'medium',
        name: { en: 'Panama', es: 'Panamá' },
        slug: { en: 'panama', es: 'panama' },
        zones: [['America/Panama', 'Panama City', 'Ciudad de Panamá']]
    },
    {
        id: 'el-salvador', priority: 'medium',
        name: { en: 'El Salvador', es: 'El Salvador' },
        slug: { en: 'el-salvador', es: 'el-salvador' },
        zones: [['America/El_Salvador', 'San Salvador', 'San Salvador']]
    },
    {
        id: 'honduras', priority: 'medium',
        name: { en: 'Honduras', es: 'Honduras' },
        slug: { en: 'honduras', es: 'honduras' },
        zones: [['America/Tegucigalpa', 'Tegucigalpa', 'Tegucigalpa']]
    },
    {
        id: 'nicaragua', priority: 'low',
        name: { en: 'Nicaragua', es: 'Nicaragua' },
        slug: { en: 'nicaragua', es: 'nicaragua' },
        zones: [['America/Managua', 'Managua', 'Managua']]
    },
    {
        id: 'spain', priority: 'high',
        name: { en: 'Spain', es: 'España' },
        slug: { en: 'spain', es: 'espana' },
        zones: [
            ['Europe/Madrid', 'Madrid (mainland)', 'Madrid (península)'],
            ['Atlantic/Canary', 'Canary Islands', 'Islas Canarias']
        ],
        traditions: {
            en: 'Spaniards eat twelve grapes in time with the twelve chimes of the Puerta del Sol clock in Madrid, which is broadcast live on television. In the Canary Islands many people celebrate twice: first with the mainland and an hour later at local midnight.',
            es: 'En España se comen las doce uvas al ritmo de las campanadas del reloj de la Puerta del Sol de Madrid, que se retransmiten en directo por televisión. En Canarias muchas personas lo celebran dos veces: con la península y una hora después, a la medianoche local.'
        },
        blogMatch: ['Spain', 'Madrid', 'grapes']
    },
    {
        id: 'united-kingdom', priority: 'high',
        name: { en: 'United Kingdom', es: 'Reino Unido' },
        in: { en: 'in the United Kingdom', es: 'en el Reino Unido' },
        slug: { en: 'united-kingdom', es: 'reino-unido' },
        zones: [['Europe/London', 'London', 'Londres']],
        traditions: {
            en: 'In London, crowds count down with the chimes of Big Ben before the fireworks over the Thames. In Scotland, New Year is Hogmanay, with traditions such as "first-footing" and singing "Auld Lang Syne".',
            es: 'En Londres, la multitud cuenta los segundos con las campanadas del Big Ben antes de los fuegos artificiales sobre el Támesis. En Escocia el Año Nuevo se llama Hogmanay, con tradiciones como el "first-footing" (la primera visita del año) y cantar "Auld Lang Syne".'
        },
        blogMatch: ['London', 'Scotland', 'Hogmanay', 'Big Ben']
    },
    {
        id: 'ireland', priority: 'low',
        name: { en: 'Ireland', es: 'Irlanda' },
        slug: { en: 'ireland', es: 'irlanda' },
        zones: [['Europe/Dublin', 'Dublin', 'Dublín']]
    },
    {
        id: 'france', priority: 'high',
        name: { en: 'France', es: 'Francia' },
        slug: { en: 'france', es: 'francia' },
        zones: [['Europe/Paris', 'Paris', 'París']],
        traditions: {
            en: 'The French celebrate the Réveillon de la Saint-Sylvestre with a long festive dinner, and large crowds gather on the Champs-Élysées in Paris at midnight.',
            es: 'En Francia se celebra el Réveillon de la Saint-Sylvestre con una larga cena festiva, y a medianoche miles de personas se reúnen en los Campos Elíseos de París.'
        },
        blogMatch: ['France', 'Paris']
    },
    {
        id: 'germany', priority: 'high',
        name: { en: 'Germany', es: 'Alemania' },
        slug: { en: 'germany', es: 'alemania' },
        zones: [['Europe/Berlin', 'Berlin', 'Berlín']],
        traditions: {
            en: 'Silvester in Germany usually means fireworks, a big party at the Brandenburg Gate in Berlin and watching the comedy sketch "Dinner for One" on TV.',
            es: 'En Alemania, Silvester suele significar fuegos artificiales, una gran fiesta frente a la Puerta de Brandeburgo en Berlín y ver en televisión el sketch cómico "Dinner for One".'
        },
        blogMatch: ['Germany', 'Berlin']
    },
    {
        id: 'italy', priority: 'high',
        name: { en: 'Italy', es: 'Italia' },
        slug: { en: 'italy', es: 'italia' },
        zones: [['Europe/Rome', 'Rome', 'Roma']],
        traditions: {
            en: 'Italians wear red underwear for luck and eat lentils with cotechino or zampone, because the lentils resemble coins and symbolise prosperity.',
            es: 'Los italianos usan ropa interior roja para la suerte y comen lentejas con cotechino o zampone: las lentejas recuerdan a monedas y simbolizan la prosperidad.'
        },
        blogMatch: ['Italy', 'Italian']
    },
    {
        id: 'portugal', priority: 'medium',
        name: { en: 'Portugal', es: 'Portugal' },
        slug: { en: 'portugal', es: 'portugal' },
        zones: [
            ['Europe/Lisbon', 'Lisbon (mainland & Madeira)', 'Lisboa (continente y Madeira)'],
            ['Atlantic/Azores', 'Azores', 'Azores']
        ],
        traditions: {
            en: 'The Portuguese eat twelve raisins at midnight, making a wish with each one, and the fireworks in Funchal, Madeira, are among the most famous in Europe.',
            es: 'Los portugueses comen doce pasas a medianoche, pidiendo un deseo con cada una, y los fuegos artificiales de Funchal, en Madeira, están entre los más famosos de Europa.'
        }
    },
    {
        id: 'netherlands', priority: 'medium',
        name: { en: 'Netherlands', es: 'Países Bajos' },
        in: { en: 'in the Netherlands', es: 'en los Países Bajos' },
        slug: { en: 'netherlands', es: 'paises-bajos' },
        zones: [['Europe/Amsterdam', 'Amsterdam', 'Ámsterdam']],
        traditions: {
            en: 'Dutch families eat oliebollen, deep-fried dough balls dusted with sugar, and on New Year\'s Day thousands take an icy plunge into the North Sea at Scheveningen.',
            es: 'Las familias neerlandesas comen oliebollen, bolas de masa frita espolvoreadas con azúcar, y el 1 de enero miles de personas se dan un baño helado en el mar del Norte en Scheveningen.'
        }
    },
    {
        id: 'poland', priority: 'low',
        name: { en: 'Poland', es: 'Polonia' },
        slug: { en: 'poland', es: 'polonia' },
        zones: [['Europe/Warsaw', 'Warsaw', 'Varsovia']]
    },
    {
        id: 'sweden', priority: 'low',
        name: { en: 'Sweden', es: 'Suecia' },
        slug: { en: 'sweden', es: 'suecia' },
        zones: [['Europe/Stockholm', 'Stockholm', 'Estocolmo']]
    },
    {
        id: 'greece', priority: 'low',
        name: { en: 'Greece', es: 'Grecia' },
        slug: { en: 'greece', es: 'grecia' },
        zones: [['Europe/Athens', 'Athens', 'Atenas']],
        traditions: {
            en: 'Greek families cut the vasilopita, a cake with a coin hidden inside: whoever finds the coin is said to have good luck all year.',
            es: 'Las familias griegas parten la vasilopita, un pastel con una moneda escondida dentro: quien la encuentra tendrá buena suerte todo el año.'
        },
        blogMatch: ['Greece', 'Greek']
    },
    {
        id: 'turkey', priority: 'medium',
        name: { en: 'Turkey', es: 'Turquía' },
        slug: { en: 'turkey', es: 'turquia' },
        zones: [['Europe/Istanbul', 'Istanbul / Ankara', 'Estambul / Ankara']]
    },
    {
        id: 'russia', priority: 'high',
        name: { en: 'Russia', es: 'Rusia' },
        slug: { en: 'russia', es: 'rusia' },
        zones: [
            ['Europe/Moscow', 'Moscow', 'Moscú'],
            ['Europe/Kaliningrad', 'Kaliningrad', 'Kaliningrado'],
            ['Europe/Samara', 'Samara', 'Samara'],
            ['Asia/Yekaterinburg', 'Yekaterinburg', 'Ekaterimburgo'],
            ['Asia/Omsk', 'Omsk', 'Omsk'],
            ['Asia/Novosibirsk', 'Novosibirsk', 'Novosibirsk'],
            ['Asia/Irkutsk', 'Irkutsk', 'Irkutsk'],
            ['Asia/Yakutsk', 'Yakutsk', 'Yakutsk'],
            ['Asia/Vladivostok', 'Vladivostok', 'Vladivostok'],
            ['Asia/Magadan', 'Magadan', 'Magadán'],
            ['Asia/Kamchatka', 'Petropavlovsk-Kamchatsky', 'Petropávlovsk-Kamchatski']
        ],
        traditions: {
            en: 'New Year (Novy God) is the main winter holiday in Russia. Families gather around a decorated tree, Ded Moroz and Snegurochka bring presents, and at midnight people listen to the Kremlin chimes after the president\'s televised address.',
            es: 'El Año Nuevo (Novy God) es la principal fiesta de invierno en Rusia. Las familias se reúnen alrededor del árbol decorado, Ded Moroz y Snegúrochka traen los regalos y a medianoche se escuchan las campanadas del Kremlin tras el discurso televisado del presidente.'
        },
        blogMatch: ['Russia', 'Russian']
    },
    {
        id: 'india', priority: 'high',
        name: { en: 'India', es: 'India' },
        in: { en: 'in India', es: 'en la India' },
        slug: { en: 'india', es: 'india' },
        zones: [['Asia/Kolkata', 'New Delhi / Mumbai', 'Nueva Delhi / Bombay']]
    },
    {
        id: 'china', priority: 'medium',
        name: { en: 'China', es: 'China' },
        slug: { en: 'china', es: 'china' },
        zones: [['Asia/Shanghai', 'Beijing / Shanghai', 'Pekín / Shanghái']],
        traditions: {
            en: 'January 1 is a public holiday in China, but the most important celebration is the Spring Festival (Lunar New Year), which falls in late January or February.',
            es: 'El 1 de enero es festivo en China, pero la gran celebración es la Fiesta de la Primavera (Año Nuevo Lunar), que cae entre finales de enero y febrero.'
        },
        blogMatch: ['China', 'Chinese', 'Lunar New Year']
    },
    {
        id: 'japan', priority: 'high',
        name: { en: 'Japan', es: 'Japón' },
        slug: { en: 'japan', es: 'japon' },
        zones: [['Asia/Tokyo', 'Tokyo', 'Tokio']],
        traditions: {
            en: 'Shōgatsu is Japan\'s most important holiday. On New Year\'s Eve people eat toshikoshi soba, Buddhist temples ring their bells 108 times (joya no kane) and many families make their first shrine visit of the year, hatsumōde.',
            es: 'El Shōgatsu es la fiesta más importante de Japón. En Nochevieja se comen fideos toshikoshi soba, los templos budistas tocan sus campanas 108 veces (joya no kane) y muchas familias hacen la primera visita del año a un santuario, el hatsumōde.'
        },
        blogMatch: ['Japan', 'Japanese']
    },
    {
        id: 'south-korea', priority: 'medium',
        name: { en: 'South Korea', es: 'Corea del Sur' },
        slug: { en: 'south-korea', es: 'corea-del-sur' },
        zones: [['Asia/Seoul', 'Seoul', 'Seúl']],
        traditions: {
            en: 'At midnight the Bosingak bell in central Seoul is struck 33 times. The bigger family holiday, however, is Seollal, the Lunar New Year.',
            es: 'A medianoche la campana Bosingak, en el centro de Seúl, se toca 33 veces. Sin embargo, la gran fiesta familiar es Seollal, el Año Nuevo Lunar.'
        },
        blogMatch: ['Korea', 'Korean']
    },
    {
        id: 'philippines', priority: 'high',
        name: { en: 'Philippines', es: 'Filipinas' },
        in: { en: 'in the Philippines', es: 'en Filipinas' },
        slug: { en: 'philippines', es: 'filipinas' },
        zones: [['Asia/Manila', 'Manila', 'Manila']],
        traditions: {
            en: 'Filipino families place twelve round fruits on the table, wear polka dots to attract money, and children jump at midnight in the hope of growing taller.',
            es: 'Las familias filipinas ponen doce frutas redondas en la mesa, visten lunares para atraer el dinero y los niños saltan a medianoche con la esperanza de crecer.'
        },
        blogMatch: ['Philippines', 'Filipino']
    },
    {
        id: 'indonesia', priority: 'medium',
        name: { en: 'Indonesia', es: 'Indonesia' },
        slug: { en: 'indonesia', es: 'indonesia' },
        zones: [
            ['Asia/Jakarta', 'Jakarta (Western)', 'Yakarta (hora occidental)'],
            ['Asia/Makassar', 'Bali / Makassar (Central)', 'Bali / Makassar (hora central)'],
            ['Asia/Jayapura', 'Jayapura (Eastern)', 'Jayapura (hora oriental)']
        ]
    },
    {
        id: 'thailand', priority: 'medium',
        name: { en: 'Thailand', es: 'Tailandia' },
        slug: { en: 'thailand', es: 'tailandia' },
        zones: [['Asia/Bangkok', 'Bangkok', 'Bangkok']],
        traditions: {
            en: 'Bangkok celebrates 31 December with fireworks along the Chao Phraya River, while the traditional Thai New Year, Songkran, is celebrated in April.',
            es: 'Bangkok celebra el 31 de diciembre con fuegos artificiales a orillas del río Chao Phraya, mientras que el Año Nuevo tradicional tailandés, Songkran, se celebra en abril.'
        },
        blogMatch: ['Thailand', 'Songkran']
    },
    {
        id: 'singapore', priority: 'low',
        name: { en: 'Singapore', es: 'Singapur' },
        slug: { en: 'singapore', es: 'singapur' },
        zones: [['Asia/Singapore', 'Singapore', 'Singapur']]
    },
    {
        id: 'malaysia', priority: 'low',
        name: { en: 'Malaysia', es: 'Malasia' },
        slug: { en: 'malaysia', es: 'malasia' },
        zones: [['Asia/Kuala_Lumpur', 'Kuala Lumpur', 'Kuala Lumpur']]
    },
    {
        id: 'united-arab-emirates', priority: 'medium',
        name: { en: 'United Arab Emirates', es: 'Emiratos Árabes Unidos' },
        in: { en: 'in the United Arab Emirates', es: 'en los Emiratos Árabes Unidos' },
        slug: { en: 'united-arab-emirates', es: 'emiratos-arabes-unidos' },
        zones: [['Asia/Dubai', 'Dubai / Abu Dhabi', 'Dubái / Abu Dabi']],
        traditions: {
            en: 'The fireworks and light show on the Burj Khalifa in Dubai, the world\'s tallest building, are one of the most watched New Year displays.',
            es: 'Los fuegos artificiales y el espectáculo de luces del Burj Khalifa de Dubái, el edificio más alto del mundo, son de los más vistos del Año Nuevo.'
        },
        blogMatch: ['Dubai', 'Burj Khalifa']
    },
    {
        id: 'australia', priority: 'high',
        name: { en: 'Australia', es: 'Australia' },
        slug: { en: 'australia', es: 'australia' },
        zones: [
            ['Australia/Sydney', 'Sydney / Melbourne / Canberra', 'Sídney / Melbourne / Canberra'],
            ['Australia/Brisbane', 'Brisbane (Queensland)', 'Brisbane (Queensland)'],
            ['Australia/Adelaide', 'Adelaide (South Australia)', 'Adelaida (Australia Meridional)'],
            ['Australia/Darwin', 'Darwin (Northern Territory)', 'Darwin (Territorio del Norte)'],
            ['Australia/Perth', 'Perth (Western Australia)', 'Perth (Australia Occidental)']
        ],
        traditions: {
            en: 'The fireworks over Sydney Harbour Bridge and the Opera House are watched around the world. Sydney holds an earlier family display at 9 pm and the main show at midnight.',
            es: 'Los fuegos artificiales sobre el puente de la bahía de Sídney y la Ópera se ven en todo el mundo. Sídney ofrece un primer espectáculo familiar a las 21:00 y el principal a medianoche.'
        },
        blogMatch: ['Sydney', 'Australia']
    },
    {
        id: 'new-zealand', priority: 'high',
        name: { en: 'New Zealand', es: 'Nueva Zelanda' },
        slug: { en: 'new-zealand', es: 'nueva-zelanda' },
        zones: [
            ['Pacific/Auckland', 'Auckland / Wellington', 'Auckland / Wellington'],
            ['Pacific/Chatham', 'Chatham Islands', 'Islas Chatham']
        ],
        traditions: {
            en: 'Auckland is one of the first major cities in the world to welcome the new year, with fireworks launched from the Sky Tower.',
            es: 'Auckland es una de las primeras grandes ciudades del mundo en recibir el año nuevo, con fuegos artificiales lanzados desde la Sky Tower.'
        },
        blogMatch: ['New Zealand', 'Auckland']
    },
    {
        id: 'kiribati', priority: 'high',
        name: { en: 'Kiribati', es: 'Kiribati' },
        slug: { en: 'kiribati', es: 'kiribati' },
        zones: [
            ['Pacific/Kiritimati', 'Kiritimati (Line Islands)', 'Kiritimati (Islas de la Línea)'],
            ['Pacific/Kanton', 'Kanton (Phoenix Islands)', 'Kanton (Islas Fénix)'],
            ['Pacific/Tarawa', 'Tarawa (Gilbert Islands)', 'Tarawa (Islas Gilbert)']
        ],
        blogMatch: ['Kiribati']
    },
    {
        id: 'samoa', priority: 'medium',
        name: { en: 'Samoa', es: 'Samoa' },
        slug: { en: 'samoa', es: 'samoa' },
        zones: [['Pacific/Apia', 'Apia', 'Apia']],
        traditions: {
            en: 'Samoa moved to the west side of the International Date Line at the end of 2011, skipping 30 December that year, which is why it is now among the first countries to celebrate.',
            es: 'Samoa se pasó al lado occidental de la línea internacional de cambio de fecha a finales de 2011 (ese año se saltó el 30 de diciembre), y por eso hoy es de los primeros países en celebrar.'
        },
        blogMatch: ['Samoa']
    },
    {
        id: 'tonga', priority: 'medium',
        name: { en: 'Tonga', es: 'Tonga' },
        slug: { en: 'tonga', es: 'tonga' },
        zones: [['Pacific/Tongatapu', 'Nukuʻalofa', 'Nukualofa']],
        blogMatch: ['Tonga']
    },
    {
        id: 'fiji', priority: 'low',
        name: { en: 'Fiji', es: 'Fiyi' },
        slug: { en: 'fiji', es: 'fiyi' },
        zones: [['Pacific/Fiji', 'Suva', 'Suva']]
    },
    {
        id: 'south-africa', priority: 'medium',
        name: { en: 'South Africa', es: 'Sudáfrica' },
        slug: { en: 'south-africa', es: 'sudafrica' },
        zones: [['Africa/Johannesburg', 'Johannesburg / Cape Town', 'Johannesburgo / Ciudad del Cabo']]
    },
    {
        id: 'nigeria', priority: 'medium',
        name: { en: 'Nigeria', es: 'Nigeria' },
        slug: { en: 'nigeria', es: 'nigeria' },
        zones: [['Africa/Lagos', 'Lagos / Abuja', 'Lagos / Abuya']]
    },
    {
        id: 'egypt', priority: 'low',
        name: { en: 'Egypt', es: 'Egipto' },
        slug: { en: 'egypt', es: 'egipto' },
        zones: [['Africa/Cairo', 'Cairo', 'El Cairo']]
    }
];

// Remaining countries: used for the world time-zone table and "same time zone" lists.
// Promote any of them to `published` by moving it above with full data.
// [name EN, name ES, zone, ...extra zones]
const drafts = [
    ['Afghanistan', 'Afganistán', 'Asia/Kabul'],
    ['Albania', 'Albania', 'Europe/Tirane'],
    ['Algeria', 'Argelia', 'Africa/Algiers'],
    ['Andorra', 'Andorra', 'Europe/Andorra'],
    ['Angola', 'Angola', 'Africa/Luanda'],
    ['Antigua and Barbuda', 'Antigua y Barbuda', 'America/Antigua'],
    ['Armenia', 'Armenia', 'Asia/Yerevan'],
    ['Austria', 'Austria', 'Europe/Vienna'],
    ['Azerbaijan', 'Azerbaiyán', 'Asia/Baku'],
    ['Bahamas', 'Bahamas', 'America/Nassau'],
    ['Bahrain', 'Baréin', 'Asia/Bahrain'],
    ['Bangladesh', 'Bangladés', 'Asia/Dhaka'],
    ['Barbados', 'Barbados', 'America/Barbados'],
    ['Belarus', 'Bielorrusia', 'Europe/Minsk'],
    ['Belgium', 'Bélgica', 'Europe/Brussels'],
    ['Belize', 'Belice', 'America/Belize'],
    ['Benin', 'Benín', 'Africa/Porto-Novo'],
    ['Bhutan', 'Bután', 'Asia/Thimphu'],
    ['Bosnia and Herzegovina', 'Bosnia y Herzegovina', 'Europe/Sarajevo'],
    ['Botswana', 'Botsuana', 'Africa/Gaborone'],
    ['Brunei', 'Brunéi', 'Asia/Brunei'],
    ['Bulgaria', 'Bulgaria', 'Europe/Sofia'],
    ['Burkina Faso', 'Burkina Faso', 'Africa/Ouagadougou'],
    ['Burundi', 'Burundi', 'Africa/Bujumbura'],
    ['Cambodia', 'Camboya', 'Asia/Phnom_Penh'],
    ['Cameroon', 'Camerún', 'Africa/Douala'],
    ['Cape Verde', 'Cabo Verde', 'Atlantic/Cape_Verde'],
    ['Central African Republic', 'República Centroafricana', 'Africa/Bangui'],
    ['Chad', 'Chad', 'Africa/Ndjamena'],
    ['Comoros', 'Comoras', 'Indian/Comoro'],
    ['Democratic Republic of the Congo', 'República Democrática del Congo', 'Africa/Kinshasa', 'Africa/Lubumbashi'],
    ['Republic of the Congo', 'República del Congo', 'Africa/Brazzaville'],
    ['Côte d\'Ivoire', 'Costa de Marfil', 'Africa/Abidjan'],
    ['Croatia', 'Croacia', 'Europe/Zagreb'],
    ['Cyprus', 'Chipre', 'Asia/Nicosia'],
    ['Czech Republic', 'República Checa', 'Europe/Prague'],
    ['Denmark', 'Dinamarca', 'Europe/Copenhagen'],
    ['Djibouti', 'Yibuti', 'Africa/Djibouti'],
    ['Dominica', 'Dominica', 'America/Dominica'],
    ['East Timor', 'Timor Oriental', 'Asia/Dili'],
    ['Equatorial Guinea', 'Guinea Ecuatorial', 'Africa/Malabo'],
    ['Eritrea', 'Eritrea', 'Africa/Asmara'],
    ['Estonia', 'Estonia', 'Europe/Tallinn'],
    ['Eswatini', 'Esuatini', 'Africa/Mbabane'],
    ['Ethiopia', 'Etiopía', 'Africa/Addis_Ababa'],
    ['Finland', 'Finlandia', 'Europe/Helsinki'],
    ['Gabon', 'Gabón', 'Africa/Libreville'],
    ['Gambia', 'Gambia', 'Africa/Banjul'],
    ['Georgia', 'Georgia', 'Asia/Tbilisi'],
    ['Ghana', 'Ghana', 'Africa/Accra'],
    ['Grenada', 'Granada', 'America/Grenada'],
    ['Guinea', 'Guinea', 'Africa/Conakry'],
    ['Guinea-Bissau', 'Guinea-Bisáu', 'Africa/Bissau'],
    ['Guyana', 'Guyana', 'America/Guyana'],
    ['Haiti', 'Haití', 'America/Port-au-Prince'],
    ['Hungary', 'Hungría', 'Europe/Budapest'],
    ['Iceland', 'Islandia', 'Atlantic/Reykjavik'],
    ['Iran', 'Irán', 'Asia/Tehran'],
    ['Iraq', 'Irak', 'Asia/Baghdad'],
    ['Israel', 'Israel', 'Asia/Jerusalem'],
    ['Jamaica', 'Jamaica', 'America/Jamaica'],
    ['Jordan', 'Jordania', 'Asia/Amman'],
    ['Kazakhstan', 'Kazajistán', 'Asia/Almaty'],
    ['Kenya', 'Kenia', 'Africa/Nairobi'],
    ['Kosovo', 'Kosovo', 'Europe/Belgrade'],
    ['Kuwait', 'Kuwait', 'Asia/Kuwait'],
    ['Kyrgyzstan', 'Kirguistán', 'Asia/Bishkek'],
    ['Laos', 'Laos', 'Asia/Vientiane'],
    ['Latvia', 'Letonia', 'Europe/Riga'],
    ['Lebanon', 'Líbano', 'Asia/Beirut'],
    ['Lesotho', 'Lesoto', 'Africa/Maseru'],
    ['Liberia', 'Liberia', 'Africa/Monrovia'],
    ['Libya', 'Libia', 'Africa/Tripoli'],
    ['Liechtenstein', 'Liechtenstein', 'Europe/Vaduz'],
    ['Lithuania', 'Lituania', 'Europe/Vilnius'],
    ['Luxembourg', 'Luxemburgo', 'Europe/Luxembourg'],
    ['Madagascar', 'Madagascar', 'Indian/Antananarivo'],
    ['Malawi', 'Malaui', 'Africa/Blantyre'],
    ['Maldives', 'Maldivas', 'Indian/Maldives'],
    ['Mali', 'Malí', 'Africa/Bamako'],
    ['Malta', 'Malta', 'Europe/Malta'],
    ['Marshall Islands', 'Islas Marshall', 'Pacific/Majuro'],
    ['Mauritania', 'Mauritania', 'Africa/Nouakchott'],
    ['Mauritius', 'Mauricio', 'Indian/Mauritius'],
    ['Micronesia', 'Micronesia', 'Pacific/Pohnpei', 'Pacific/Chuuk'],
    ['Moldova', 'Moldavia', 'Europe/Chisinau'],
    ['Monaco', 'Mónaco', 'Europe/Monaco'],
    ['Mongolia', 'Mongolia', 'Asia/Ulaanbaatar', 'Asia/Hovd'],
    ['Montenegro', 'Montenegro', 'Europe/Podgorica'],
    ['Morocco', 'Marruecos', 'Africa/Casablanca'],
    ['Mozambique', 'Mozambique', 'Africa/Maputo'],
    ['Myanmar', 'Myanmar', 'Asia/Yangon'],
    ['Namibia', 'Namibia', 'Africa/Windhoek'],
    ['Nauru', 'Nauru', 'Pacific/Nauru'],
    ['Nepal', 'Nepal', 'Asia/Kathmandu'],
    ['Niger', 'Níger', 'Africa/Niamey'],
    ['North Korea', 'Corea del Norte', 'Asia/Pyongyang'],
    ['North Macedonia', 'Macedonia del Norte', 'Europe/Skopje'],
    ['Norway', 'Noruega', 'Europe/Oslo'],
    ['Oman', 'Omán', 'Asia/Muscat'],
    ['Pakistan', 'Pakistán', 'Asia/Karachi'],
    ['Palau', 'Palaos', 'Pacific/Palau'],
    ['Papua New Guinea', 'Papúa Nueva Guinea', 'Pacific/Port_Moresby'],
    ['Qatar', 'Catar', 'Asia/Qatar'],
    ['Romania', 'Rumania', 'Europe/Bucharest'],
    ['Rwanda', 'Ruanda', 'Africa/Kigali'],
    ['Saint Kitts and Nevis', 'San Cristóbal y Nieves', 'America/St_Kitts'],
    ['Saint Lucia', 'Santa Lucía', 'America/St_Lucia'],
    ['Saint Vincent and the Grenadines', 'San Vicente y las Granadinas', 'America/St_Vincent'],
    ['San Marino', 'San Marino', 'Europe/San_Marino'],
    ['São Tomé and Príncipe', 'Santo Tomé y Príncipe', 'Africa/Sao_Tome'],
    ['Saudi Arabia', 'Arabia Saudí', 'Asia/Riyadh'],
    ['Senegal', 'Senegal', 'Africa/Dakar'],
    ['Serbia', 'Serbia', 'Europe/Belgrade'],
    ['Seychelles', 'Seychelles', 'Indian/Mahe'],
    ['Sierra Leone', 'Sierra Leona', 'Africa/Freetown'],
    ['Slovakia', 'Eslovaquia', 'Europe/Bratislava'],
    ['Slovenia', 'Eslovenia', 'Europe/Ljubljana'],
    ['Solomon Islands', 'Islas Salomón', 'Pacific/Guadalcanal'],
    ['Somalia', 'Somalia', 'Africa/Mogadishu'],
    ['South Sudan', 'Sudán del Sur', 'Africa/Juba'],
    ['Sri Lanka', 'Sri Lanka', 'Asia/Colombo'],
    ['Sudan', 'Sudán', 'Africa/Khartoum'],
    ['Suriname', 'Surinam', 'America/Paramaribo'],
    ['Switzerland', 'Suiza', 'Europe/Zurich'],
    ['Syria', 'Siria', 'Asia/Damascus'],
    ['Taiwan', 'Taiwán', 'Asia/Taipei'],
    ['Tajikistan', 'Tayikistán', 'Asia/Dushanbe'],
    ['Tanzania', 'Tanzania', 'Africa/Dar_es_Salaam'],
    ['Togo', 'Togo', 'Africa/Lome'],
    ['Trinidad and Tobago', 'Trinidad y Tobago', 'America/Port_of_Spain'],
    ['Tunisia', 'Túnez', 'Africa/Tunis'],
    ['Turkmenistan', 'Turkmenistán', 'Asia/Ashgabat'],
    ['Tuvalu', 'Tuvalu', 'Pacific/Funafuti'],
    ['Uganda', 'Uganda', 'Africa/Kampala'],
    ['Ukraine', 'Ucrania', 'Europe/Kyiv'],
    ['Uzbekistan', 'Uzbekistán', 'Asia/Tashkent'],
    ['Vanuatu', 'Vanuatu', 'Pacific/Efate'],
    ['Vatican City', 'Ciudad del Vaticano', 'Europe/Vatican'],
    ['Vietnam', 'Vietnam', 'Asia/Ho_Chi_Minh'],
    ['Yemen', 'Yemen', 'Asia/Aden'],
    ['Zambia', 'Zambia', 'Africa/Lusaka'],
    ['Zimbabwe', 'Zimbabue', 'Africa/Harare']
];

function slugify(text) {
    return text.normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

module.exports = [
    ...published.map(c => ({ status: 'published', ...c })),
    ...drafts.map(([en, es, ...tzs]) => ({
        id: slugify(en),
        status: 'draft',
        priority: 'low',
        name: { en, es },
        slug: { en: slugify(en), es: slugify(es) },
        // Region label = the zone's city (only shown for countries with several offsets)
        zones: tzs.map(tz => {
            const city = tz.split('/').pop().replace(/_/g, ' ');
            return [tz, city, city];
        })
    }))
];
