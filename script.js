// ====================================
// NEW YEAR'S TIMER 2026 - MAIN SCRIPT
// ====================================
// World map SVG is loaded externally from 'BlankMap-World.svg' for better performance

// ====================================
// SECURITY & SANITIZATION
// ====================================

/**
 * Sanitize HTML to prevent XSS attacks
 * Escapes special characters that could be used for XSS
 */
function sanitizeHTML(str) {
    if (!str) return '';

    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Validate and sanitize wish text
 * - Removes scripts, HTML tags, and dangerous content
 * - Limits length
 * - Trims whitespace
 */
function sanitizeWishText(text) {
    if (!text || typeof text !== 'string') return '';

    // Trim and limit length
    text = text.trim().substring(0, 100);

    // Remove any HTML tags and escape special characters
    text = sanitizeHTML(text);

    // Remove any potentially dangerous patterns
    text = text
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/<script/gi, '')
        .replace(/<\/script>/gi, '');

    return text;
}

/**
 * Validate and sanitize author name
 * - Removes scripts, HTML tags, and dangerous content
 * - Limits length
 * - Ensures only safe characters
 */
function sanitizeAuthorName(name) {
    if (!name || typeof name !== 'string') return '';

    // Trim and limit length
    name = name.trim().substring(0, 15);

    // Remove any HTML tags and escape special characters
    name = sanitizeHTML(name);

    // Only allow letters, numbers, spaces, and basic punctuation
    name = name.replace(/[^a-zA-Z0-9\s\-_.,!?]/g, '');

    return name;
}

// ====================================
// INTERNATIONALIZATION SYSTEM
// ====================================

const translations = {
    en: {
        mainTitle: "Time Until Your New Year",
        subtitle: "Your personal countdown to 2026",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        mapTitle: "These places are already in 2026!",
        alreadyCelebrating: "Already celebrating 2026",
        stillWaiting: "Still waiting",
        footer: "Happy New Year from around the world! 🎉",
        timezoneInfo: "Your timezone: {timezone}",
        wishesTitle: "Wishes Wall",
        wishesSubtitle: "Leave your wish for 2026 and it will come true! ✨",
        emptyTileTextFounder: "Founder Wish shines here 👑",
        emptyTileTextConstellation: "Constellation Wish ✨",
        emptyTileTextStar: "Star Wish ⭐",
        modalTitle: "Make Your Wish",
        modalSubtitle: "Your wish will shine on the wall forever!",
        wishLabel: "Your Wish for 2026",
        authorLabel: "Your Name",
        priceLabel: "Secure your wish for:",
        paymentNote: "💳 Secure payment via PayPal. Your wish will appear instantly!",
        payButton: "Pay & Make Wish",
        promoText: "✨ Your wish joins the stars. As a thank you, you will receive a <strong>secret title</strong> that predicts success and guides your path in the new year. ✨",
        viewStarWishes: "🌟 View Wishes",
        wishesMade: "wishes granted"
    },
    es: {
        mainTitle: "Tiempo Restante para tu Año Nuevo",
        subtitle: "Tu cuenta regresiva personal hacia 2026",
        days: "Días",
        hours: "Horas",
        minutes: "Minutos",
        seconds: "Segundos",
        mapTitle: "¡Estos lugares ya están en 2026!",
        alreadyCelebrating: "Ya celebrando 2026",
        stillWaiting: "Aún esperando",
        footer: "¡Feliz Año Nuevo desde todo el mundo! 🎉",
        timezoneInfo: "Tu zona horaria: {timezone}",
        wishesTitle: "Pared de Deseos",
        wishesSubtitle: "¡Deja tu deseo para el 2026 y se va a cumplir! ✨",
        emptyTileTextFounder: "Deseo Fundador brilla aquí 👑",
        emptyTileTextConstellation: "Deseo Constelación ✨",
        emptyTileTextStar: "Deseo Estrella ⭐",
        modalTitle: "Haz Tu Deseo",
        modalSubtitle: "¡Tu deseo brillará en el muro para siempre!",
        wishLabel: "Tu Deseo para 2026",
        authorLabel: "Tu Nombre",
        priceLabel: "Asegura tu deseo por:",
        paymentNote: "💳 Pago seguro vía PayPal. ¡Tu deseo aparecerá al instante!",
        payButton: "Pagar y Hacer Deseo",
        promoText: "✨ Tu deseo se une a las estrellas. Como agradecimiento, recibirás un <strong>título secreto</strong> que te augura éxito y guía tu camino en el nuevo año. ✨",
        viewStarWishes: "🌟 Ver Deseos",
        wishesMade: "deseos cumplidos"
    },
    pt: {
        mainTitle: "Tempo Restante para o seu Ano Novo",
        subtitle: "Sua contagem regressiva pessoal para 2026",
        days: "Dias",
        hours: "Horas",
        minutes: "Minutos",
        seconds: "Segundos",
        mapTitle: "Estes lugares já estão em 2026!",
        alreadyCelebrating: "Já comemorando 2026",
        stillWaiting: "Ainda esperando",
        footer: "Feliz Ano Novo de todo o mundo! 🎉",
        timezoneInfo: "Seu fuso horário: {timezone}",
        wishesTitle: "Parede de Desejos",
        wishesSubtitle: "Deixe seu desejo para 2026 e ele se tornará realidade! ✨",
        emptyTileTextFounder: "Desejo Fundador brilha aqui 👑",
        emptyTileTextConstellation: "Desejo Constelação ✨",
        emptyTileTextStar: "Desejo Estrela ⭐",
        modalTitle: "Faça Seu Desejo",
        modalSubtitle: "Seu desejo brilhará no muro para sempre!",
        wishLabel: "Seu Desejo para 2026",
        authorLabel: "Seu Nome",
        priceLabel: "Garanta seu desejo por:",
        paymentNote: "💳 Pagamento seguro via PayPal. Seu desejo aparecerá instantaneamente!",
        payButton: "Pagar e Fazer Desejo",
        promoText: "✨ Seu desejo se junta às estrelas. Como agradecimento, você receberá um <strong>título secreto</strong> que prevê sucesso e guia seu caminho no ano novo. ✨",
        viewStarWishes: "🌟 Ver Desejos"
    },
    fr: {
        mainTitle: "Temps Restant jusqu'à votre Nouvel An",
        subtitle: "Votre compte à rebours personnel vers 2026",
        days: "Jours",
        hours: "Heures",
        minutes: "Minutes",
        seconds: "Secondes",
        mapTitle: "Ces endroits sont déjà en 2026!",
        alreadyCelebrating: "Déjà en train de fêter 2026",
        stillWaiting: "Encore en attente",
        footer: "Bonne année du monde entier! 🎉",
        timezoneInfo: "Votre fuseau horaire: {timezone}",
        wishesTitle: "Mur de Souhaits",
        wishesSubtitle: "Laissez votre souhait pour 2026 et il se réalisera! ✨",
        emptyTileTextFounder: "Souhait Fondateur brille ici 👑",
        emptyTileTextConstellation: "Souhait Constellation ✨",
        emptyTileTextStar: "Souhait Étoile ⭐",
        modalTitle: "Faites Votre Souhait",
        modalSubtitle: "Votre souhait brillera sur le mur pour toujours!",
        wishLabel: "Votre Souhait pour 2026",
        authorLabel: "Votre Nom",
        priceLabel: "Sécurisez votre souhait pour:",
        paymentNote: "💳 Paiement sécurisé via PayPal. Votre souhait apparaîtra instantanément!",
        payButton: "Payer et Faire un Souhait",
        promoText: "✨ Votre souhait rejoint les étoiles. En remerciement, vous recevrez un <strong>titre secret</strong> qui prédit le succès et guide votre chemin dans la nouvelle année. ✨",
        viewStarWishes: "🌟 Voir les Souhaits"
    },
    de: {
        mainTitle: "Zeit bis zu Ihrem Neujahr",
        subtitle: "Ihr persönlicher Countdown bis 2026",
        days: "Tage",
        hours: "Stunden",
        minutes: "Minuten",
        seconds: "Sekunden",
        mapTitle: "Diese Orte sind bereits in 2026!",
        alreadyCelebrating: "Feiern bereits 2026",
        stillWaiting: "Warten noch",
        footer: "Frohes neues Jahr aus der ganzen Welt! 🎉",
        timezoneInfo: "Ihre Zeitzone: {timezone}",
        wishesTitle: "Wünsche-Wand",
        wishesSubtitle: "Hinterlassen Sie Ihren Wunsch für 2026 und er wird wahr werden! ✨",
        emptyTileTextFounder: "Gründer-Wunsch leuchtet hier 👑",
        emptyTileTextConstellation: "Konstellations-Wunsch ✨",
        emptyTileTextStar: "Stern-Wunsch ⭐",
        modalTitle: "Machen Sie Ihren Wunsch",
        modalSubtitle: "Ihr Wunsch wird für immer auf der Wand leuchten!",
        wishLabel: "Ihr Wunsch für 2026",
        authorLabel: "Ihr Name",
        priceLabel: "Sichern Sie Ihren Wunsch für:",
        paymentNote: "💳 Sichere Zahlung über PayPal. Ihr Wunsch erscheint sofort!",
        payButton: "Bezahlen & Wunsch abgeben",
        promoText: "✨ Ihr Wunsch schließt sich den Sternen an. Als Dankeschön erhalten Sie einen <strong>geheimen Titel</strong>, der Erfolg vorhersagt und Ihren Weg im neuen Jahr leitet. ✨",
        viewStarWishes: "🌟 Wünsche ansehen"
    },
    it: {
        mainTitle: "Tempo Rimanente per il tuo Capodanno",
        subtitle: "Il tuo conto alla rovescia personale verso il 2026",
        days: "Giorni",
        hours: "Ore",
        minutes: "Minuti",
        seconds: "Secondi",
        mapTitle: "Questi luoghi sono già nel 2026!",
        alreadyCelebrating: "Stanno già festeggiando il 2026",
        stillWaiting: "Ancora in attesa",
        footer: "Buon anno da tutto il mondo! 🎉",
        timezoneInfo: "Il tuo fuso orario: {timezone}",
        wishesTitle: "Muro dei Desideri",
        wishesSubtitle: "Lascia il tuo desiderio per il 2026 e si avvererà! ✨",
        emptyTileTextFounder: "Il Desiderio del Fondatore brilla qui 👑",
        emptyTileTextConstellation: "Desiderio Costellazione ✨",
        emptyTileTextStar: "Desiderio Stella ⭐",
        modalTitle: "Esprimi il Tuo Desiderio",
        modalSubtitle: "Il tuo desiderio brillerà sul muro per sempre!",
        wishLabel: "Il Tuo Desiderio per il 2026",
        authorLabel: "Il Tuo Nome",
        priceLabel: "Assicura il tuo desiderio per:",
        paymentNote: "💳 Pagamento sicuro tramite PayPal. Il tuo desiderio apparirà immediatamente!",
        payButton: "Paga e Esprimi Desiderio",
        promoText: "✨ Il tuo desiderio si unisce alle stelle. Come ringraziamento, riceverai un <strong>titolo segreto</strong> che predice il successo e guida il tuo percorso nel nuovo anno. ✨",
        viewStarWishes: "🌟 Vedi Desideri"
    },
    ru: {
        mainTitle: "Время до Нового года",
        subtitle: "Ваш персональный обратный отсчет до 2026",
        days: "Дней",
        hours: "Часов",
        minutes: "Минут",
        seconds: "Секунд",
        mapTitle: "Эти места уже в 2026 году!",
        alreadyCelebrating: "Уже празднуют 2026",
        stillWaiting: "Всё ещё ждут",
        footer: "С Новым годом со всего мира! 🎉",
        timezoneInfo: "Ваш часовой пояс: {timezone}",
        wishesTitle: "Стена Желаний",
        wishesSubtitle: "Оставьте свое желание на 2026 год, и оно сбудется! ✨",
        emptyTileTextFounder: "Желание Основателя сияет здесь 👑",
        emptyTileTextConstellation: "Желание Созвездия ✨",
        emptyTileTextStar: "Желание Звезды ⭐",
        modalTitle: "Загадайте Желание",
        modalSubtitle: "Ваше желание будет сиять на стене навсегда!",
        wishLabel: "Ваше Желание на 2026",
        authorLabel: "Ваше Имя",
        priceLabel: "Закрепите свое желание за:",
        paymentNote: "💳 Безопасная оплата через PayPal. Ваше желание появится мгновенно!",
        payButton: "Оплатить и Загадать Желание",
        promoText: "✨ Ваше желание присоединяется к звездам. В знак благодарности вы получите <strong>секретный титул</strong>, который предсказывает успех и направляет ваш путь в новом году. ✨",
        viewStarWishes: "🌟 Посмотреть Желания"
    },
    zh: {
        mainTitle: "距离新年的时间",
        subtitle: "您的个人2026倒计时",
        days: "天",
        hours: "小时",
        minutes: "分钟",
        seconds: "秒",
        mapTitle: "这些地方已经进入2026年！",
        alreadyCelebrating: "已在庆祝2026",
        stillWaiting: "仍在等待",
        footer: "来自世界各地的新年快乐！🎉",
        timezoneInfo: "您的时区：{timezone}",
        wishesTitle: "愿望墙",
        wishesSubtitle: "留下您2026年的愿望，它将成真！✨",
        emptyTileTextFounder: "创始人愿望在此闪耀 👑",
        emptyTileTextConstellation: "星座愿望 ✨",
        emptyTileTextStar: "星星愿望 ⭐",
        modalTitle: "许下您的愿望",
        modalSubtitle: "您的愿望将永远在墙上闪耀！",
        wishLabel: "您的2026年愿望",
        authorLabel: "您的名字",
        priceLabel: "确保您的愿望：",
        paymentNote: "💳 通过PayPal安全付款。您的愿望将立即显示！",
        payButton: "支付并许愿",
        promoText: "✨ 您的愿望加入了星辰。作为感谢，您将获得一个<strong>秘密称号</strong>，预示成功并引导您在新年的道路。✨",
        viewStarWishes: "🌟 查看愿望"
    },
    ja: {
        mainTitle: "新年までの時間",
        subtitle: "2026年へのあなた専用カウントダウン",
        days: "日",
        hours: "時間",
        minutes: "分",
        seconds: "秒",
        mapTitle: "これらの場所はすでに2026年です！",
        alreadyCelebrating: "すでに2026年を祝っています",
        stillWaiting: "まだ待っています",
        footer: "世界中から新年おめでとうございます！🎉",
        timezoneInfo: "あなたのタイムゾーン：{timezone}",
        wishesTitle: "願いの壁",
        wishesSubtitle: "2026年の願いを残してください、それは叶います！✨",
        emptyTileTextFounder: "創設者の願いがここで輝きます 👑",
        emptyTileTextConstellation: "星座の願い ✨",
        emptyTileTextStar: "星の願い ⭐",
        modalTitle: "願いを込めて",
        modalSubtitle: "あなたの願いは永遠に壁で輝きます！",
        wishLabel: "2026年のあなたの願い",
        authorLabel: "あなたの名前",
        priceLabel: "あなたの願いを確保：",
        paymentNote: "💳 PayPalによる安全な支払い。あなたの願いはすぐに表示されます！",
        payButton: "支払って願いを込める",
        promoText: "✨ あなたの願いは星々に加わります。感謝の気持ちとして、成功を予測し新年のあなたの道を導く<strong>秘密の称号</strong>を受け取ります。✨",
        viewStarWishes: "🌟 願いを見る"
    },
    ar: {
        mainTitle: "الوقت المتبقي حتى العام الجديد",
        subtitle: "العد التنازلي الشخصي الخاص بك حتى 2026",
        days: "أيام",
        hours: "ساعات",
        minutes: "دقائق",
        seconds: "ثواني",
        mapTitle: "هذه الأماكن بالفعل في 2026!",
        alreadyCelebrating: "يحتفلون بالفعل بـ 2026",
        stillWaiting: "لا يزالون ينتظرون",
        footer: "سنة جديدة سعيدة من جميع أنحاء العالم! 🎉",
        timezoneInfo: "منطقتك الزمنية: {timezone}",
        wishesTitle: "جدار الأمنيات",
        wishesSubtitle: "اترك أمنيتك لعام 2026 وسوف تتحقق! ✨",
        emptyTileTextFounder: "أمنية المؤسس تتألق هنا 👑",
        emptyTileTextConstellation: "أمنية الكوكبة ✨",
        emptyTileTextStar: "أمنية النجمة ⭐",
        modalTitle: "اصنع أمنيتك",
        modalSubtitle: "ستتألق أمنيتك على الحائط للأبد!",
        wishLabel: "أمنيتك لعام 2026",
        authorLabel: "اسمك",
        priceLabel: "احصل على أمنيتك مقابل:",
        paymentNote: "💳 دفع آمن عبر PayPal. ستظهر أمنيتك على الفور!",
        payButton: "ادفع واصنع الأمنية",
        promoText: "✨ تنضم أمنيتك إلى النجوم. كشكر لك، ستحصل على <strong>لقب سري</strong> يتنبأ بالنجاح ويرشد طريقك في العام الجديد. ✨",
        viewStarWishes: "🌟 عرض الأمنيات"
    },
    nl: {
        mainTitle: "Tijd tot je Nieuwjaar",
        subtitle: "Je persoonlijke aftelling naar 2026",
        days: "Dagen",
        hours: "Uren",
        minutes: "Minuten",
        seconds: "Seconden",
        mapTitle: "Deze plaatsen zijn al in 2026!",
        alreadyCelebrating: "Vieren al 2026",
        stillWaiting: "Nog aan het wachten",
        footer: "Gelukkig Nieuwjaar van over de hele wereld! 🎉",
        timezoneInfo: "Jouw tijdzone: {timezone}",
        wishesTitle: "Wensen Muur",
        wishesSubtitle: "Laat je wens achter voor 2026 en het zal uitkomen! ✨",
        emptyTileTextFounder: "Oprichters Wens schijnt hier 👑",
        emptyTileTextConstellation: "Constellatie Wens ✨",
        emptyTileTextStar: "Ster Wens ⭐",
        modalTitle: "Doe Je Wens",
        modalSubtitle: "Je wens zal voor altijd op de muur schijnen!",
        wishLabel: "Je Wens voor 2026",
        authorLabel: "Je Naam",
        priceLabel: "Verzeker je wens voor:",
        paymentNote: "💳 Veilige betaling via PayPal. Je wens verschijnt direct!",
        payButton: "Betalen & Wens Doen",
        promoText: "✨ Je wens voegt zich bij de sterren. Als dank ontvang je een <strong>geheime titel</strong> die succes voorspelt en je pad in het nieuwe jaar begeleidt. ✨",
        viewStarWishes: "🌟 Bekijk Wensen"
    },
    ko: {
        mainTitle: "새해까지 남은 시간",
        subtitle: "2026년을 향한 당신만의 카운트다운",
        days: "일",
        hours: "시간",
        minutes: "분",
        seconds: "초",
        mapTitle: "이곳들은 이미 2026년입니다!",
        alreadyCelebrating: "이미 2026년을 축하하고 있습니다",
        stillWaiting: "아직 기다리고 있습니다",
        footer: "전 세계에서 새해 복 많이 받으세요! 🎉",
        timezoneInfo: "당신의 시간대: {timezone}",
        wishesTitle: "소원 벽",
        wishesSubtitle: "2026년을 위한 소원을 남기면 이루어집니다! ✨",
        emptyTileTextFounder: "창립자의 소원이 여기서 빛납니다 👑",
        emptyTileTextConstellation: "별자리 소원 ✨",
        emptyTileTextStar: "별 소원 ⭐",
        modalTitle: "소원을 빌어보세요",
        modalSubtitle: "당신의 소원은 영원히 벽에서 빛날 것입니다!",
        wishLabel: "2026년을 위한 당신의 소원",
        authorLabel: "당신의 이름",
        priceLabel: "소원을 확보하세요:",
        paymentNote: "💳 PayPal을 통한 안전한 결제. 소원이 즉시 나타납니다!",
        payButton: "결제하고 소원 빌기",
        promoText: "✨ 당신의 소원이 별들과 함께합니다. 감사의 표시로, 성공을 예측하고 새해의 길을 안내하는 <strong>비밀 칭호</strong>를 받게 됩니다. ✨",
        viewStarWishes: "🌟 소원 보기"
    },
    tr: {
        mainTitle: "Yeni Yılınıza Kalan Süre",
        subtitle: "2026'ya kişisel geri sayımınız",
        days: "Gün",
        hours: "Saat",
        minutes: "Dakika",
        seconds: "Saniye",
        mapTitle: "Bu yerler zaten 2026'da!",
        alreadyCelebrating: "Zaten 2026'yı kutluyor",
        stillWaiting: "Hala bekliyor",
        footer: "Tüm dünyadan Mutlu Yıllar! 🎉",
        timezoneInfo: "Saat diliminiz: {timezone}",
        wishesTitle: "Dilek Duvarı",
        wishesSubtitle: "2026 için dileğinizi bırakın ve gerçek olacak! ✨",
        emptyTileTextFounder: "Kurucu Dileği burada parlıyor 👑",
        emptyTileTextConstellation: "Takımyıldız Dileği ✨",
        emptyTileTextStar: "Yıldız Dileği ⭐",
        modalTitle: "Dileğinizi Yapın",
        modalSubtitle: "Dileğiniz sonsuza dek duvarda parlayacak!",
        wishLabel: "2026 için Dileğiniz",
        authorLabel: "Adınız",
        priceLabel: "Dileğinizi güvence altına alın:",
        paymentNote: "💳 PayPal üzerinden güvenli ödeme. Dileğiniz anında görünecek!",
        payButton: "Öde ve Dilek Tut",
        promoText: "✨ Dileğiniz yıldızlara katılıyor. Teşekkür olarak, başarıyı öngören ve yeni yılda yolunuzu gösteren <strong>gizli bir unvan</strong> alacaksınız. ✨",
        viewStarWishes: "🌟 Dilekleri Görüntüle"
    },
    hi: {
        mainTitle: "आपके नए साल तक का समय",
        subtitle: "2026 के लिए आपकी व्यक्तिगत उलटी गिनती",
        days: "दिन",
        hours: "घंटे",
        minutes: "मिनट",
        seconds: "सेकंड",
        mapTitle: "ये स्थान पहले से ही 2026 में हैं!",
        alreadyCelebrating: "पहले से ही 2026 का जश्न मना रहे हैं",
        stillWaiting: "अभी भी इंतजार कर रहे हैं",
        footer: "पूरी दुनिया से नया साल मुबारक हो! 🎉",
        timezoneInfo: "आपका समय क्षेत्र: {timezone}",
        wishesTitle: "इच्छाओं की दीवार",
        wishesSubtitle: "2026 के लिए अपनी इच्छा छोड़ें और यह सच हो जाएगी! ✨",
        emptyTileTextFounder: "संस्थापक की इच्छा यहाँ चमकती है 👑",
        emptyTileTextConstellation: "तारामंडल इच्छा ✨",
        emptyTileTextStar: "तारा इच्छा ⭐",
        modalTitle: "अपनी इच्छा करें",
        modalSubtitle: "आपकी इच्छा हमेशा के लिए दीवार पर चमकेगी!",
        wishLabel: "2026 के लिए आपकी इच्छा",
        authorLabel: "आपका नाम",
        priceLabel: "अपनी इच्छा सुरक्षित करें:",
        paymentNote: "💳 PayPal के माध्यम से सुरक्षित भुगतान। आपकी इच्छा तुरंत दिखाई देगी!",
        payButton: "भुगतान करें और इच्छा करें",
        promoText: "✨ आपकी इच्छा सितारों से जुड़ती है। धन्यवाद के रूप में, आपको एक <strong>गुप्त उपाधि</strong> मिलेगी जो सफलता की भविष्यवाणी करती है और नए साल में आपके मार्ग का मार्गदर्शन करती है। ✨",
        viewStarWishes: "🌟 इच्छाएँ देखें"
    },
    pl: {
        mainTitle: "Czas do Twojego Nowego Roku",
        subtitle: "Twoje osobiste odliczanie do 2026",
        days: "Dni",
        hours: "Godziny",
        minutes: "Minuty",
        seconds: "Sekundy",
        mapTitle: "Te miejsca są już w 2026!",
        alreadyCelebrating: "Już świętują 2026",
        stillWaiting: "Wciąż czekają",
        footer: "Szczęśliwego Nowego Roku z całego świata! 🎉",
        timezoneInfo: "Twoja strefa czasowa: {timezone}",
        wishesTitle: "Ściana Życzeń",
        wishesSubtitle: "Zostaw swoje życzenie na 2026 i się spełni! ✨",
        emptyTileTextFounder: "Życzenie Założyciela świeci tutaj 👑",
        emptyTileTextConstellation: "Życzenie Konstelacji ✨",
        emptyTileTextStar: "Życzenie Gwiazdy ⭐",
        modalTitle: "Złóż Swoje Życzenie",
        modalSubtitle: "Twoje życzenie będzie świecić na ścianie na zawsze!",
        wishLabel: "Twoje Życzenie na 2026",
        authorLabel: "Twoje Imię",
        priceLabel: "Zabezpiecz swoje życzenie za:",
        paymentNote: "💳 Bezpieczna płatność przez PayPal. Twoje życzenie pojawi się natychmiast!",
        payButton: "Zapłać i Złóż Życzenie",
        promoText: "✨ Twoje życzenie dołącza do gwiazd. W podziękowaniu otrzymasz <strong>sekretny tytuł</strong>, który przepowiada sukces i prowadzi Twoją ścieżkę w nowym roku. ✨",
        viewStarWishes: "🌟 Zobacz Życzenia"
    },
    sv: {
        mainTitle: "Tid Kvar Till Ditt Nya År",
        subtitle: "Din personliga nedräkning till 2026",
        days: "Dagar",
        hours: "Timmar",
        minutes: "Minuter",
        seconds: "Sekunder",
        mapTitle: "Dessa platser är redan i 2026!",
        alreadyCelebrating: "Firar redan 2026",
        stillWaiting: "Väntar fortfarande",
        footer: "Gott Nytt År från hela världen! 🎉",
        timezoneInfo: "Din tidszon: {timezone}",
        wishesTitle: "Önskningar Vägg",
        wishesSubtitle: "Lämna din önskan för 2026 och den kommer att gå i uppfyllelse! ✨",
        emptyTileTextFounder: "Grundarens Önskan lyser här 👑",
        emptyTileTextConstellation: "Konstellation Önskan ✨",
        emptyTileTextStar: "Stjärn Önskan ⭐",
        modalTitle: "Gör Din Önskan",
        modalSubtitle: "Din önskan kommer att lysa på väggen för alltid!",
        wishLabel: "Din Önskan för 2026",
        authorLabel: "Ditt Namn",
        priceLabel: "Säkra din önskan för:",
        paymentNote: "💳 Säker betalning via PayPal. Din önskan kommer att visas omedelbart!",
        payButton: "Betala & Gör Önskan",
        promoText: "✨ Din önskan går med stjärnorna. Som tack kommer du att få en <strong>hemlig titel</strong> som förutspår framgång och vägleder din väg under det nya året. ✨",
        viewStarWishes: "🌟 Visa Önskningar"
    }
};

// Global variable to store geolocation data from IP
let geoLocationData = null;

/**
 * Get user's geolocation data from IP (works with VPN)
 * This function fetches timezone, country, and language based on IP address
 * Uses multiple APIs as fallback to avoid CORS and rate limiting issues
 */
async function getGeoLocationData() {
    if (geoLocationData) {
        return geoLocationData; // Return cached data
    }

    // Try multiple APIs in order until one works
    const apis = [
        {
            name: 'ip-api.com',
            url: 'http://ip-api.com/json/',
            parse: (data) => ({
                country: data.countryCode || 'XX',
                timezone: data.timezone,
                languages: null, // This API doesn't provide languages
                utcOffset: data.offset ? `${data.offset / 3600}` : null
            })
        },
        {
            name: 'ipapi.co',
            url: 'https://ipapi.co/json/',
            parse: (data) => ({
                country: data.country_code || 'XX',
                timezone: data.timezone,
                languages: data.languages ? data.languages.split(',')[0] : null,
                utcOffset: data.utc_offset
            })
        },
        {
            name: 'ipwhois.app',
            url: 'https://ipwhois.app/json/',
            parse: (data) => ({
                country: data.country_code || 'XX',
                timezone: data.timezone,
                languages: null,
                utcOffset: data.timezone_gmt
            })
        }
    ];

    for (const api of apis) {
        try {
            console.log(`🔍 Trying ${api.name}...`);
            const response = await fetch(api.url);

            console.log(`📡 ${api.name} status:`, response.status, response.statusText);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`📦 ${api.name} response:`, data);

            const parsed = api.parse(data);

            geoLocationData = {
                country: parsed.country,
                timezone: parsed.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
                languages: parsed.languages || navigator.language,
                utcOffset: parsed.utcOffset
            };

            console.log(`✅ Geolocation detected from ${api.name}:`, geoLocationData);
            return geoLocationData;

        } catch (error) {
            console.warn(`⚠️ ${api.name} failed:`, error.message);
            // Continue to next API
        }
    }

    // All APIs failed, use browser defaults
    console.error('❌ All geolocation APIs failed');
    console.warn('⚠️ Using browser defaults instead');
    geoLocationData = {
        country: 'XX',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        languages: navigator.language,
        utcOffset: null
    };
    return geoLocationData;
}

// Detect language based on country code, timezone, and browser settings
function detectLanguage() {
    // Priority 1: Check country code from geolocation (most accurate with VPN)
    if (geoLocationData?.country) {
        const countryCode = geoLocationData.country.toUpperCase();
        console.log(`🌍 Detected country code: ${countryCode}`);

        // Country-to-language mapping
        const countryToLanguage = {
            // Spanish-speaking countries
            'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'PE': 'es',
            'VE': 'es', 'CL': 'es', 'EC': 'es', 'GT': 'es', 'CU': 'es',
            'BO': 'es', 'DO': 'es', 'HN': 'es', 'PY': 'es', 'SV': 'es',
            'NI': 'es', 'CR': 'es', 'PA': 'es', 'UY': 'es', 'GQ': 'es',

            // Portuguese-speaking countries
            'BR': 'pt', 'PT': 'pt', 'AO': 'pt', 'MZ': 'pt', 'GW': 'pt',
            'TL': 'pt', 'CV': 'pt', 'ST': 'pt',

            // French-speaking countries
            'FR': 'fr', 'BE': 'fr', 'CH': 'fr', 'CA': 'fr', 'LU': 'fr',
            'MC': 'fr', 'CI': 'fr', 'CM': 'fr', 'CD': 'fr', 'MG': 'fr',
            'ML': 'fr', 'SN': 'fr', 'TN': 'fr', 'DZ': 'fr', 'MA': 'fr',
            'HT': 'fr', 'BF': 'fr', 'NE': 'fr', 'TD': 'fr', 'RW': 'fr',
            'BJ': 'fr', 'TG': 'fr', 'CF': 'fr', 'CG': 'fr', 'GA': 'fr',
            'GN': 'fr', 'RE': 'fr',

            // German-speaking countries
            'DE': 'de', 'AT': 'de', 'LI': 'de',

            // Italian-speaking countries
            'IT': 'it', 'SM': 'it', 'VA': 'it',

            // Russian-speaking countries
            'RU': 'ru', 'BY': 'ru', 'KZ': 'ru', 'KG': 'ru',

            // Chinese-speaking countries/regions
            'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'MO': 'zh', 'SG': 'zh',

            // Japanese-speaking countries
            'JP': 'ja',

            // Arabic-speaking countries
            'SA': 'ar', 'EG': 'ar', 'AE': 'ar', 'IQ': 'ar', 'JO': 'ar',
            'KW': 'ar', 'LB': 'ar', 'LY': 'ar', 'OM': 'ar', 'QA': 'ar',
            'SD': 'ar', 'SY': 'ar', 'YE': 'ar', 'BH': 'ar', 'PS': 'ar',
            'MR': 'ar', 'SO': 'ar', 'DJ': 'ar', 'KM': 'ar',

            // Dutch-speaking countries
            'NL': 'nl', 'SR': 'nl',

            // Korean-speaking countries
            'KR': 'ko',

            // Turkish-speaking countries
            'TR': 'tr', 'CY': 'tr',

            // Hindi-speaking countries
            'IN': 'hi',

            // Polish-speaking countries
            'PL': 'pl',

            // Swedish-speaking countries
            'SE': 'sv'
        };

        const languageFromCountry = countryToLanguage[countryCode];
        if (languageFromCountry) {
            console.log(`✅ Language from country mapping: ${countryCode} → ${languageFromCountry}`);
            return languageFromCountry;
        } else {
            console.log(`⚠️ Country ${countryCode} not in mapping, falling back to timezone detection`);
        }
    }

    // Priority 2: Check timezone (for countries not in mapping)
    const timezone = geoLocationData?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Spanish-speaking timezones
    const spanishTimezones = [
        'America/Mexico_City', 'America/Cancun', 'America/Tijuana', 'America/Monterrey',
        'America/Buenos_Aires', 'America/Cordoba', 'America/Mendoza',
        'America/Bogota', 'America/Lima', 'America/Santiago',
        'America/Caracas', 'America/La_Paz', 'America/Asuncion',
        'America/Montevideo', 'America/Guayaquil', 'America/Santo_Domingo',
        'America/Havana', 'America/Guatemala', 'America/Tegucigalpa',
        'America/Managua', 'America/San_Jose', 'America/Panama',
        'Europe/Madrid', 'Atlantic/Canary', 'Africa/Ceuta'
    ];

    // Portuguese-speaking timezones
    const portugueseTimezones = [
        'America/Sao_Paulo', 'America/Fortaleza', 'America/Recife',
        'America/Manaus', 'America/Belem', 'America/Rio_Branco',
        'Europe/Lisbon', 'Atlantic/Azores', 'Atlantic/Madeira'
    ];

    // French-speaking timezones
    const frenchTimezones = [
        'Europe/Paris', 'Europe/Brussels', 'Europe/Luxembourg',
        'America/Montreal', 'America/Toronto', 'Indian/Reunion',
        'Africa/Abidjan', 'Africa/Dakar', 'America/Cayenne'
    ];

    // Check timezone for language detection
    if (spanishTimezones.includes(timezone)) {
        console.log(`✅ Language from timezone: ${timezone} → es`);
        return 'es';
    }
    if (portugueseTimezones.includes(timezone)) {
        console.log(`✅ Language from timezone: ${timezone} → pt`);
        return 'pt';
    }
    if (frenchTimezones.includes(timezone)) {
        console.log(`✅ Language from timezone: ${timezone} → fr`);
        return 'fr';
    }

    // Priority 3: Fallback to browser language
    const browserLang = navigator.language.toLowerCase();
    const langCode = browserLang.split('-')[0];
    console.log(`⚠️ No timezone match, using browser language: ${browserLang} → ${langCode}`);

    // Return the language if we have translations, otherwise default to English
    return translations[langCode] ? langCode : 'en';
}

// Apply translations to the page
function applyTranslations(lang) {
    console.log(`🌐 Applying translations for language: ${lang}`);

    // Handle regular text translations (data-i18n)
    const elements = document.querySelectorAll('[data-i18n]');
    console.log(`📝 Found ${elements.length} elements with data-i18n`);
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Handle HTML translations (data-i18n-html) - allows HTML tags like <strong>
    const htmlElements = document.querySelectorAll('[data-i18n-html]');
    console.log(`📝 Found ${htmlElements.length} elements with data-i18n-html`);
    htmlElements.forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        if (translations[lang] && translations[lang][key]) {
            console.log(`✅ Translating ${key} to ${lang}`);
            element.innerHTML = translations[lang][key];
        }
    });
}

// ====================================
// LOCAL COUNTDOWN TIMER
// ====================================

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Calculate next New Year (midnight of January 1st in user's timezone)
    const nextYear = currentYear + 1;
    const newYear = new Date(nextYear, 0, 1, 0, 0, 0);

    // Calculate time difference
    const diff = newYear - now;

    if (diff <= 0) {
        // New Year has arrived!
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update display with leading zeros
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Display user's timezone information
function displayTimezoneInfo() {
    const lang = detectLanguage();
    // Use geolocation data if available, otherwise browser timezone
    const timezone = geoLocationData?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezoneOffset = -(new Date().getTimezoneOffset() / 60);
    const offsetString = timezoneOffset >= 0 ? `+${timezoneOffset}` : `${timezoneOffset}`;

    const timezoneText = translations[lang].timezoneInfo.replace(
        '{timezone}',
        `${timezone} (UTC${offsetString})`
    );

    document.getElementById('timezoneInfo').textContent = timezoneText;
}

// ====================================
// GLOBAL MAP WITH TIMEZONES
// ====================================

/**
 * Country to Timezone Mapping
 *
 * This object maps ISO country codes to their primary timezone offset (from UTC).
 * Your SVG map should use these country codes as IDs for each <path> element.
 *
 * Format: "COUNTRY_CODE": { name: "Country Name", offset: UTC_OFFSET }
 *
 * Examples:
 * - <path id="US" d="..."/> for United States
 * - <path id="FR" d="..."/> for France
 * - <path id="AU" d="..."/> for Australia
 *
 * Note: Some countries span multiple timezones. This uses the primary/capital timezone.
 * You can add more specific regions like "US-PST", "US-EST", "RU-MSK", "RU-VLAT" if your
 * SVG map has separate paths for different regions of the same country.
 */
const countryTimezones = {
    // Pacific Islands (UTC+12 to +14)
    "KI": { name: "Kiribati", offset: 14 },          // Line Islands
    "NZ": { name: "New Zealand", offset: 13 },       // New Zealand
    "FJ": { name: "Fiji", offset: 12 },              // Fiji
    "NR": { name: "Nauru", offset: 12 },             // Nauru
    "TV": { name: "Tuvalu", offset: 12 },            // Tuvalu
    "MH": { name: "Marshall Islands", offset: 12 },  // Marshall Islands
    "WF": { name: "Wallis and Futuna", offset: 12 }, // Wallis and Futuna

    // Asia-Pacific (UTC+9 to +11)
    "AU": { name: "Australia", offset: 11 },         // Eastern Australia (Sydney)
    "SB": { name: "Solomon Islands", offset: 11 },   // Solomon Islands
    "NC": { name: "New Caledonia", offset: 11 },     // New Caledonia
    "PG": { name: "Papua New Guinea", offset: 10 },  // Papua New Guinea
    "GU": { name: "Guam", offset: 10 },              // Guam
    "JP": { name: "Japan", offset: 9 },              // Japan
    "KR": { name: "South Korea", offset: 9 },        // South Korea
    "KP": { name: "North Korea", offset: 9 },        // North Korea
    "PW": { name: "Palau", offset: 9 },              // Palau

    // Asia (UTC+5 to +8)
    "CN": { name: "China", offset: 8 },              // China
    "TW": { name: "Taiwan", offset: 8 },             // Taiwan
    "PH": { name: "Philippines", offset: 8 },        // Philippines
    "MY": { name: "Malaysia", offset: 8 },           // Malaysia
    "SG": { name: "Singapore", offset: 8 },          // Singapore
    "HK": { name: "Hong Kong", offset: 8 },          // Hong Kong
    "MO": { name: "Macau", offset: 8 },              // Macau
    "BN": { name: "Brunei", offset: 8 },             // Brunei
    "MN": { name: "Mongolia", offset: 8 },           // Mongolia
    "TH": { name: "Thailand", offset: 7 },           // Thailand
    "VN": { name: "Vietnam", offset: 7 },            // Vietnam
    "LA": { name: "Laos", offset: 7 },               // Laos
    "KH": { name: "Cambodia", offset: 7 },           // Cambodia
    "ID": { name: "Indonesia", offset: 7 },          // Indonesia (Western)
    "MM": { name: "Myanmar", offset: 6.5 },          // Myanmar
    "BD": { name: "Bangladesh", offset: 6 },         // Bangladesh
    "BT": { name: "Bhutan", offset: 6 },             // Bhutan
    "IN": { name: "India", offset: 5.5 },            // India
    "LK": { name: "Sri Lanka", offset: 5.5 },        // Sri Lanka
    "NP": { name: "Nepal", offset: 5.75 },           // Nepal
    "PK": { name: "Pakistan", offset: 5 },           // Pakistan
    "UZ": { name: "Uzbekistan", offset: 5 },         // Uzbekistan
    "TJ": { name: "Tajikistan", offset: 5 },         // Tajikistan
    "TM": { name: "Turkmenistan", offset: 5 },       // Turkmenistan
    "AF": { name: "Afghanistan", offset: 4.5 },      // Afghanistan

    // Middle East (UTC+2 to +4)
    "AE": { name: "UAE", offset: 4 },                // UAE
    "OM": { name: "Oman", offset: 4 },               // Oman
    "GE": { name: "Georgia", offset: 4 },            // Georgia
    "AM": { name: "Armenia", offset: 4 },            // Armenia
    "AZ": { name: "Azerbaijan", offset: 4 },         // Azerbaijan
    "IR": { name: "Iran", offset: 3.5 },             // Iran
    "RU": { name: "Russia", offset: 3 },             // Russia (Moscow)
    "SA": { name: "Saudi Arabia", offset: 3 },       // Saudi Arabia
    "IQ": { name: "Iraq", offset: 3 },               // Iraq
    "KW": { name: "Kuwait", offset: 3 },             // Kuwait
    "BH": { name: "Bahrain", offset: 3 },            // Bahrain
    "QA": { name: "Qatar", offset: 3 },              // Qatar
    "YE": { name: "Yemen", offset: 3 },              // Yemen
    "KE": { name: "Kenya", offset: 3 },              // Kenya
    "ET": { name: "Ethiopia", offset: 3 },           // Ethiopia
    "SO": { name: "Somalia", offset: 3 },            // Somalia
    "IL": { name: "Israel", offset: 2 },             // Israel
    "PS": { name: "Palestine", offset: 2 },          // Palestine
    "JO": { name: "Jordan", offset: 2 },             // Jordan
    "LB": { name: "Lebanon", offset: 2 },            // Lebanon
    "SY": { name: "Syria", offset: 2 },              // Syria
    "EG": { name: "Egypt", offset: 2 },              // Egypt
    "ZA": { name: "South Africa", offset: 2 },       // South Africa
    "BW": { name: "Botswana", offset: 2 },           // Botswana
    "ZW": { name: "Zimbabwe", offset: 2 },           // Zimbabwe
    "MZ": { name: "Mozambique", offset: 2 },         // Mozambique
    "GR": { name: "Greece", offset: 2 },             // Greece
    "RO": { name: "Romania", offset: 2 },            // Romania
    "BG": { name: "Bulgaria", offset: 2 },           // Bulgaria
    "TR": { name: "Turkey", offset: 3 },             // Turkey
    "UA": { name: "Ukraine", offset: 2 },            // Ukraine
    "FI": { name: "Finland", offset: 2 },            // Finland

    // Europe (UTC+0 to +2)
    "FR": { name: "France", offset: 1 },             // France
    "DE": { name: "Germany", offset: 1 },            // Germany
    "IT": { name: "Italy", offset: 1 },              // Italy
    "ES": { name: "Spain", offset: 1 },              // Spain
    "PT": { name: "Portugal", offset: 0 },           // Portugal
    "PL": { name: "Poland", offset: 1 },             // Poland
    "NL": { name: "Netherlands", offset: 1 },        // Netherlands
    "BE": { name: "Belgium", offset: 1 },            // Belgium
    "CH": { name: "Switzerland", offset: 1 },        // Switzerland
    "AT": { name: "Austria", offset: 1 },            // Austria
    "CZ": { name: "Czech Republic", offset: 1 },     // Czech Republic
    "SK": { name: "Slovakia", offset: 1 },           // Slovakia
    "HU": { name: "Hungary", offset: 1 },            // Hungary
    "SI": { name: "Slovenia", offset: 1 },           // Slovenia
    "HR": { name: "Croatia", offset: 1 },            // Croatia
    "BA": { name: "Bosnia", offset: 1 },             // Bosnia
    "RS": { name: "Serbia", offset: 1 },             // Serbia
    "ME": { name: "Montenegro", offset: 1 },         // Montenegro
    "MK": { name: "North Macedonia", offset: 1 },    // North Macedonia
    "AL": { name: "Albania", offset: 1 },            // Albania
    "SE": { name: "Sweden", offset: 1 },             // Sweden
    "NO": { name: "Norway", offset: 1 },             // Norway
    "DK": { name: "Denmark", offset: 1 },            // Denmark
    "GB": { name: "United Kingdom", offset: 0 },     // UK
    "IE": { name: "Ireland", offset: 0 },            // Ireland
    "IS": { name: "Iceland", offset: 0 },            // Iceland

    // Africa (UTC-1 to +3)
    "MA": { name: "Morocco", offset: 0 },            // Morocco
    "DZ": { name: "Algeria", offset: 1 },            // Algeria
    "TN": { name: "Tunisia", offset: 1 },            // Tunisia
    "LY": { name: "Libya", offset: 2 },              // Libya
    "SD": { name: "Sudan", offset: 2 },              // Sudan
    "NG": { name: "Nigeria", offset: 1 },            // Nigeria
    "GH": { name: "Ghana", offset: 0 },              // Ghana
    "CI": { name: "Ivory Coast", offset: 0 },        // Ivory Coast
    "SN": { name: "Senegal", offset: 0 },            // Senegal
    "ML": { name: "Mali", offset: 0 },               // Mali
    "NE": { name: "Niger", offset: 1 },              // Niger
    "TD": { name: "Chad", offset: 1 },               // Chad
    "CM": { name: "Cameroon", offset: 1 },           // Cameroon
    "AO": { name: "Angola", offset: 1 },             // Angola
    "ZM": { name: "Zambia", offset: 2 },             // Zambia
    "TZ": { name: "Tanzania", offset: 3 },           // Tanzania
    "UG": { name: "Uganda", offset: 3 },             // Uganda
    "RW": { name: "Rwanda", offset: 2 },             // Rwanda
    "MG": { name: "Madagascar", offset: 3 },         // Madagascar

    // Americas (UTC-10 to -3)
    "US": { name: "United States", offset: -5 },     // USA (Eastern)
    "CA": { name: "Canada", offset: -5 },            // Canada (Eastern)
    "MX": { name: "Mexico", offset: -6 },            // Mexico (Central)
    "BR": { name: "Brazil", offset: -3 },            // Brazil (Brasilia)
    "AR": { name: "Argentina", offset: -3 },         // Argentina
    "CL": { name: "Chile", offset: -3 },             // Chile
    "PE": { name: "Peru", offset: -5 },              // Peru
    "CO": { name: "Colombia", offset: -5 },          // Colombia
    "VE": { name: "Venezuela", offset: -4 },         // Venezuela
    "EC": { name: "Ecuador", offset: -5 },           // Ecuador
    "BO": { name: "Bolivia", offset: -4 },           // Bolivia
    "PY": { name: "Paraguay", offset: -4 },          // Paraguay
    "UY": { name: "Uruguay", offset: -3 },           // Uruguay
    "GY": { name: "Guyana", offset: -4 },            // Guyana
    "SR": { name: "Suriname", offset: -3 },          // Suriname
    "GF": { name: "French Guiana", offset: -3 },     // French Guiana
    "PA": { name: "Panama", offset: -5 },            // Panama
    "CR": { name: "Costa Rica", offset: -6 },        // Costa Rica
    "NI": { name: "Nicaragua", offset: -6 },         // Nicaragua
    "HN": { name: "Honduras", offset: -6 },          // Honduras
    "GT": { name: "Guatemala", offset: -6 },         // Guatemala
    "BZ": { name: "Belize", offset: -6 },            // Belize
    "SV": { name: "El Salvador", offset: -6 },       // El Salvador
    "CU": { name: "Cuba", offset: -5 },              // Cuba
    "JM": { name: "Jamaica", offset: -5 },           // Jamaica
    "HT": { name: "Haiti", offset: -5 },             // Haiti
    "DO": { name: "Dominican Republic", offset: -4 },// Dominican Republic
    "PR": { name: "Puerto Rico", offset: -4 },       // Puerto Rico

    // Special regions (if you want to handle US/Canada/Russia timezones separately)
    "US-EST": { name: "US Eastern", offset: -5 },
    "US-CST": { name: "US Central", offset: -6 },
    "US-MST": { name: "US Mountain", offset: -7 },
    "US-PST": { name: "US Pacific", offset: -8 },
    "US-AKST": { name: "Alaska", offset: -9 },
    "US-HST": { name: "Hawaii", offset: -10 },
    "RU-MSK": { name: "Moscow", offset: 3 },
    "RU-VLAT": { name: "Vladivostok", offset: 10 },
    "RU-KRAT": { name: "Krasnoyarsk", offset: 7 },
    "CA-EST": { name: "Canada Eastern", offset: -5 },
    "CA-CST": { name: "Canada Central", offset: -6 },
    "CA-MST": { name: "Canada Mountain", offset: -7 },
    "CA-PST": { name: "Canada Pacific", offset: -8 }
};

/**
 * Colors countries in the SVG map based on whether they've entered the new year
 */
function updateMap() {
    // Get the SVG element inside #world-map
    const worldMapContainer = document.getElementById('world-map');

    if (!worldMapContainer) {
        console.warn('World map container not found. Make sure you have a div with id="world-map"');
        return;
    }

    const svg = worldMapContainer.querySelector('svg');

    if (!svg) {
        console.warn('No SVG found inside #world-map. Please paste your SVG map inside the #world-map div.');
        return;
    }

    // Get current UTC time
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const newYearUTC = new Date(Date.UTC(nextYear, 0, 1, 0, 0, 0));

    // Find all path elements with IDs (countries)
    const paths = svg.querySelectorAll('path[id], g[id]');

    if (paths.length === 0) {
        console.warn('No paths with IDs found in the SVG. Make sure your country paths have id attributes like id="US", id="FR", etc.');
        return;
    }

    // Track celebration progress
    let totalTimezones = 0;
    let celebratingTimezones = 0;

    // Process each country path
    paths.forEach(path => {
        const countryCode = path.id.toUpperCase();

        // Check if we have timezone data for this country
        if (countryTimezones[countryCode]) {
            const country = countryTimezones[countryCode];
            totalTimezones++;

            // Calculate if this timezone has already entered the new year
            // New Year happens at different times in UTC depending on timezone offset
            const timezoneNewYear = new Date(newYearUTC.getTime() - (country.offset * 60 * 60 * 1000));
            const hasCelebrated = now >= timezoneNewYear;

            if (hasCelebrated) {
                celebratingTimezones++;
            }

            // Apply color classes
            path.classList.remove('celebrating', 'waiting');
            path.classList.add('country-path');

            if (hasCelebrated) {
                path.classList.add('celebrating');
                // Add celebration animation class for countries that just entered
                path.classList.add('celebrating-animation');
            } else {
                path.classList.add('waiting');
            }

            // Add or update tooltip
            let title = path.querySelector('title');
            if (!title) {
                title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                path.appendChild(title);
            }

            const offsetString = country.offset >= 0 ? `+${country.offset}` : `${country.offset}`;
            const status = hasCelebrated ? '🎉 Already in 2026!' : '⏳ Still waiting...';
            title.textContent = `${country.name} (UTC${offsetString})\n${status}`;

            // Add cursor pointer style
            path.style.cursor = 'pointer';
        } else {
            // Country not in our timezone database - apply default styling
            path.classList.add('country-path', 'waiting');
            path.style.cursor = 'default';
        }
    });

    // Update progress counter
    updateProgressCounter(celebratingTimezones, totalTimezones);
}

/**
 * Update the progress counter showing how many timezones have entered 2026
 */
function updateProgressCounter(celebrating, total) {
    let progressElement = document.getElementById('timezone-progress');

    if (!progressElement) {
        // Create progress element if it doesn't exist
        const mapTitle = document.querySelector('.map-title');
        if (mapTitle) {
            progressElement = document.createElement('p');
            progressElement.id = 'timezone-progress';
            progressElement.className = 'timezone-progress';
            mapTitle.insertAdjacentElement('afterend', progressElement);
        }
    }

    if (progressElement && total > 0) {
        const percentage = Math.round((celebrating / total) * 100);
        const lang = detectLanguage();

        const messages = {
            en: `🌍 ${celebrating} of ${total} timezones have entered 2026 (${percentage}%)`,
            es: `🌍 ${celebrating} de ${total} zonas horarias ya están en 2026 (${percentage}%)`,
            pt: `🌍 ${celebrating} de ${total} fusos horários já estão em 2026 (${percentage}%)`,
            fr: `🌍 ${celebrating} de ${total} fuseaux horaires sont déjà en 2026 (${percentage}%)`
        };

        progressElement.textContent = messages[lang] || messages.en;
    }
}

// ====================================
// LAZY LOADING - MAP INTERSECTION OBSERVER
// ====================================

let mapLoaded = false;
let mapUpdateInterval = null;

/**
 * Load and inject the world map SVG dynamically
 */
async function loadWorldMap() {
    if (mapLoaded) return; // Prevent loading twice

    const worldMapContainer = document.getElementById('world-map');
    if (!worldMapContainer) {
        console.warn('World map container (#world-map) not found');
        return;
    }

    try {
        // Fetch the SVG from external file
        const response = await fetch('BlankMap-World.svg');
        if (!response.ok) {
            throw new Error(`Failed to load map: ${response.status}`);
        }

        const svgText = await response.text();

        // Remove loading placeholder
        const placeholder = worldMapContainer.querySelector('.map-loading-placeholder');
        if (placeholder) {
            placeholder.remove();
        }

        // Inject the SVG into the container
        worldMapContainer.innerHTML = svgText;

        mapLoaded = true;

        // Initialize map coloring immediately after loading
        setTimeout(() => {
            updateMap();

            // Set up interval to update map colors every minute
            if (mapUpdateInterval) clearInterval(mapUpdateInterval);
            mapUpdateInterval = setInterval(updateMap, 60000);
        }, 100);
    } catch (error) {
        console.error('❌ Error loading world map:', error);

        // Check if it's a CORS error (common when opening file:// locally)
        const isCORSError = error.message.includes('Failed to fetch') ||
                           error.message.includes('CORS') ||
                           window.location.protocol === 'file:';

        if (isCORSError) {
            worldMapContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #fbbf24; background: rgba(251, 146, 60, 0.1); border-radius: 1rem; border: 2px solid rgba(251, 146, 60, 0.3);">
                    <h3 style="margin-bottom: 1rem; font-size: 1.2rem;">🗺️ Map Loading Blocked</h3>
                    <p style="margin-bottom: 1rem; color: #cbd5e1;">To see the interactive world map, you need to run a local server.</p>

                    <div style="text-align: left; max-width: 500px; margin: 1.5rem auto; padding: 1rem; background: rgba(15, 23, 42, 0.6); border-radius: 0.5rem;">
                        <p style="font-weight: 600; margin-bottom: 0.5rem; color: #fbbf24;">Windows:</p>
                        <code style="display: block; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 0.25rem; color: #10b981;">
                            Double-click start-server.bat
                        </code>

                        <p style="font-weight: 600; margin: 1rem 0 0.5rem; color: #fbbf24;">Mac/Linux:</p>
                        <code style="display: block; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 0.25rem; color: #10b981;">
                            ./start-server.sh
                        </code>
                    </div>

                    <p style="font-size: 0.9rem; color: #94a3b8;">Then open: <strong style="color: #60a5fa;">http://localhost:8000</strong></p>
                </div>
            `;
        } else {
            worldMapContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #ef4444;">
                    <p>⚠️ Error loading world map: ${error.message}</p>
                    <p style="margin-top: 1rem; font-size: 0.9rem; color: #94a3b8;">Please check the console for details.</p>
                </div>
            `;
        }
    }
}

/**
 * Setup Intersection Observer for lazy loading the map
 */
function setupMapLazyLoading() {
    const mapSection = document.querySelector('.map-section');

    if (!mapSection) {
        console.warn('Map section not found');
        return;
    }

    // Create Intersection Observer with options
    const observerOptions = {
        root: null, // viewport
        rootMargin: '200px', // Load 200px before entering viewport
        threshold: 0 // Trigger as soon as any part is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !mapLoaded) {
                // Map section is about to be visible - load it!
                loadWorldMap();

                // Stop observing once loaded
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(mapSection);
}

// ====================================
// FIREBASE CONFIGURATION
// ====================================

/**
 * Firebase configuration is now loaded from config.js
 * See config.js for setup instructions
 */

// Initialize Firebase
let database;
try {
    if (typeof FIREBASE_CONFIG !== 'undefined') {
        // Check if Firebase is already configured
        if (FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') {
            console.warn('⚠️ Firebase not configured. Please update config.js with your Firebase credentials');
        } else {
            firebase.initializeApp(FIREBASE_CONFIG);
            database = firebase.database();

            // Sign in anonymously to allow test wishes to be written to database
            firebase.auth().signInAnonymously()
                .then(() => {
                    console.log('✅ Firebase authenticated anonymously for test wishes');
                })
                .catch((error) => {
                    console.error('❌ Firebase auth error:', error);
                });
        }
    } else {
        console.error('❌ Firebase configuration not found. Make sure config.js is loaded');
    }
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}

// ====================================
// WISHES WALL SYSTEM
// ====================================

// Pricing tiers - 3 tiers for constellation design
const TIERS = {
    founder: {
        name: 'founder',
        price: 3.99,
        slotStart: 1,
        maxSlots: 4, // 4 large founder circles
        icon: '👑'
    },
    star: {
        name: 'star',
        price: 0.99,
        slotStart: 1,
        maxSlots: Infinity, // Grid of small star circles (~50)
        icon: '⭐'
    }
};

// Random wish titles for each tier
const WISH_TITLES = {
    founder: [
        'Golden Dream',
        'Royal Destiny',
        'Imperial Fortune',
        'Supreme Blessing',
        'Platinum Legacy',
        'Diamond Promise',
        'Crown Jewel',
        'Monarch\'s Grace',
        'Elite Vision',
        'Celestial Harmony',
        'Eternal Glory',
        'Legend\'s Path',
        'Majestic Hope',
        'Noble Quest',
        'Sovereign Light'
    ],
    star: [
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
        'Southern Cross',
        'Silver Lining',
        'Golden Hour',
        'Midnight Dream',
        'Dawn Promise',
        'Dusk Serenity',
        'Cloud Nine',
        'Rainbow Bridge',
        'Shooting Star'
    ]
};

/**
 * Get random wish title for a tier
 */
function getRandomWishTitle(tierName) {
    const titles = WISH_TITLES[tierName] || WISH_TITLES.star;
    const randomIndex = Math.floor(Math.random() * titles.length);
    return titles[randomIndex];
}

let currentSlot = null;
let currentPrice = 0.99;
let currentTier = null;
let wishes = {
    founder: {},
    star: {}
};

// Deseos semilla que siempre se muestran para dar confianza a nuevos visitantes
// Estos se combinan con los deseos reales de Firebase
const SEED_WISHES = {
    founder: {
        'seed_1': {
            text: "May 2026 bring health, love and success to everyone",
            author: "Sarah",
            country: "US",
            wishTitle: "Golden Pioneer",
            price: 3.99,
            timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000), // 7 días atrás
            isSeed: true
        },
        'seed_2': {
            text: "Que este año traiga paz y prosperidad para mi familia",
            author: "Carlos",
            country: "ES",
            wishTitle: "First Light",
            price: 3.99,
            timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000), // 5 días atrás
            isSeed: true
        }
    },
    star: {
        'seed_3': {
            text: "More adventures and less worries this year",
            author: "Emma",
            country: "GB",
            wishTitle: "Shooting Star",
            price: 0.99,
            timestamp: Date.now() - (6 * 24 * 60 * 60 * 1000),
            isSeed: true
        },
        'seed_4': {
            text: "Paz mundial e amor para todos os seres",
            author: "Ana",
            country: "BR",
            wishTitle: "Cosmic Wish",
            price: 0.99,
            timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000),
            isSeed: true
        },
        'seed_5': {
            text: "Que se cumplan todos mis sueños y metas",
            author: "María",
            country: "AR",
            wishTitle: "Starlight Dream",
            price: 0.99,
            timestamp: Date.now() - (4 * 24 * 60 * 60 * 1000),
            isSeed: true
        },
        'seed_6': {
            text: "Que le bonheur accompagne ma famille",
            author: "Pierre",
            country: "FR",
            wishTitle: "Nebula Hope",
            price: 0.99,
            timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000),
            isSeed: true
        },
        'seed_7': {
            text: "Success in all my projects and dreams",
            author: "John",
            country: "CA",
            wishTitle: "Moonbeam Wish",
            price: 0.99,
            timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000),
            isSeed: true
        },
        'seed_8': {
            text: "Viaggiare per il mondo senza limiti",
            author: "Marco",
            country: "IT",
            wishTitle: "Galaxy Dream",
            price: 0.99,
            timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000),
            isSeed: true
        },
        'seed_9': {
            text: "Éxito profesional y personal este año",
            author: "Pedro",
            country: "MX",
            wishTitle: "Stellar Hope",
            price: 0.99,
            timestamp: Date.now() - (20 * 60 * 60 * 1000),
            isSeed: true
        },
        'seed_10': {
            text: "Health and happiness for my loved ones",
            author: "Lisa",
            country: "AU",
            wishTitle: "Twilight Wish",
            price: 0.99,
            timestamp: Date.now() - (15 * 60 * 60 * 1000),
            isSeed: true
        },
        'seed_11': {
            text: "Die wahre Liebe finden in diesem Jahr",
            author: "Hans",
            country: "DE",
            wishTitle: "Aurora Dream",
            price: 0.99,
            timestamp: Date.now() - (10 * 60 * 60 * 1000),
            isSeed: true
        },
        'seed_12': {
            text: "May my family always stay united",
            author: "Yuki",
            country: "JP",
            wishTitle: "Celestial Hope",
            price: 0.99,
            timestamp: Date.now() - (5 * 60 * 60 * 1000),
            isSeed: true
        }
    }
};

/**
 * Combina los deseos de Firebase con los deseos semilla
 * Los deseos reales tienen prioridad sobre los semilla
 */
function mergeWishesWithSeeds(firebaseWishes, tierName) {
    const seedWishes = SEED_WISHES[tierName] || {};
    const merged = { ...seedWishes };

    // Los deseos reales de Firebase sobrescriben/se añaden a los semilla
    if (firebaseWishes && typeof firebaseWishes === 'object') {
        Object.keys(firebaseWishes).forEach(key => {
            // Los deseos reales van con slots numéricos, no 'seed_X'
            merged[key] = firebaseWishes[key];
        });
    }

    return merged;
}

/**
 * Convert tier name to HTML ID format
 * premium -> Premium, vip -> VIP, regular -> Regular
 */
function getTierDisplayName(tierName) {
    if (tierName === 'vip') return 'VIP';
    return tierName.charAt(0).toUpperCase() + tierName.slice(1);
}

/**
 * Get next available slot number for a tier
 */
function getNextAvailableSlot(tierName) {
    const tierWishes = wishes[tierName];
    const occupiedCount = Object.keys(tierWishes).length;
    return occupiedCount + 1;
}

/**
 * Initialize wishes wall
 */
function initWishesWall() {
    initializeConstellation();
    setupModal();
    loadWishesFromFirebase();
    setupCharCounter();
    setupStarsSlider();
}

/**
 * Initialize the constellation display (Founder + 8 Constellation hexagons + Stars slider)
 */
function initializeConstellation() {
    initializeFounderWishes();
    initializeStarWishesGrid();
}

/**
 * Update wishes counter - shows real wishes starting from 25
 * Current Firebase: 27 wishes (1 real + 26 fake)
 * Display: 25 + (new wishes beyond the initial 27)
 */
function updateWishesCounter() {
    let realWishesCount = 0;

    // Contar solo deseos REALES (no semilla)
    ['founder', 'star'].forEach(tierName => {
        if (wishes[tierName]) {
            Object.values(wishes[tierName]).forEach(wish => {
                // Solo contar si NO es un deseo semilla
                if (!wish.isSeed) {
                    realWishesCount++;
                }
            });
        }
    });

    // Número base (los deseos semilla dan la impresión de actividad)
    // + los deseos reales pagados
    const BASE_COUNT = 25;
    const displayCount = BASE_COUNT + realWishesCount;

    // Update counter display
    const counterElement = document.querySelector('.counter-number');
    if (counterElement) {
        counterElement.textContent = displayCount;
    }
}

/**
 * Initialize Founder Wishes (primer slot siempre vacío, deseos desde slot 2)
 */
function initializeFounderWishes() {
    const lang = detectLanguage();

    // Phrases for different languages
    const phrases = {
        en: 'Write your wish',
        es: 'Escribe tu deseo',
        pt: 'Escreva seu desejo',
        fr: 'Écris ton vœu'
    };

    const occupiedText = {
        en: 'Wish Reserved',
        es: 'Deseo Reservado',
        pt: 'Desejo Reservado',
        fr: 'Vœu Réservé'
    };

    // Obtener todos los deseos comprados ordenados por timestamp DESCENDENTE (más reciente primero)
    const purchasedWishes = Object.entries(wishes.founder)
        .map(([slot, wish]) => ({ ...wish, originalSlot: slot }))
        .sort((a, b) => b.timestamp - a.timestamp); // Más reciente primero

    // Calcular el número total necesario basado en los deseos ocupados + buffer
    const occupiedCount = purchasedWishes.length;
    const minHexagons = Math.max(4, occupiedCount + 1); // Mínimo 4, crece dinámicamente
    const totalHexagons = minHexagons;

    const gridContainer = document.getElementById('founderWishesContainer');
    if (!gridContainer) return;
    gridContainer.innerHTML = ''; // Clear existing

    // Create all hexagons dynamically
    for (let i = 1; i <= totalHexagons; i++) {
        const founderHex = document.createElement('div');
        founderHex.className = 'founder-wish';
        founderHex.id = `founderWish${i}`;
        founderHex.dataset.slot = i;
        const founderContainer = founderHex;

        // El slot 1 se ve como disponible para comprar, pero nunca se llena
        if (i === 1) {
            founderContainer.className = 'founder-wish';
            founderContainer.innerHTML = `
                <div class="founder-wish-content">
                    <div class="founder-wish-icon">👑</div>
                    <div class="founder-wish-price">$3.99</div>
                    <div class="founder-wish-text">${phrases[lang] || phrases.en}</div>
                </div>
            `;
            founderContainer.style.cursor = 'pointer';
            founderContainer.style.opacity = '1';
            founderContainer.onclick = () => handleTileClick(i, 'founder'); // Se puede comprar
            gridContainer.appendChild(founderHex);
            continue;
        }

        // Slots 2, 3, 4, 5... muestran los deseos comprados (dinámico)
        const wishIndex = i - 2; // Slot 2 = índice 0, Slot 3 = índice 1, etc.
        const founderWish = purchasedWishes[wishIndex];

        if (founderWish) {
            // Occupied - show wish text and author with flag (PREMIUM style)
            founderContainer.className = 'founder-wish occupied';

            // Get flag PNG image
            const flagImg = countryToFlag(founderWish.country);

            // Sanitize data
            const safeText = sanitizeWishText(founderWish.text);
            const safeAuthor = sanitizeAuthorName(founderWish.author);

            founderContainer.innerHTML = `
                <div class="founder-crown-floating">👑</div>
                <div class="founder-wish-content occupied-content premium">
                    <p class="founder-wish-message">"${safeText}"</p>
                    <div class="founder-wish-author-display">
                        ${flagImg}
                        <span>${safeAuthor}</span>
                    </div>
                </div>
            `;
            founderContainer.style.cursor = 'pointer';
            founderContainer.style.opacity = '1';
            founderContainer.onclick = () => openViewWishModal(founderWish, i, 'founder');
        } else {
            // Empty - available for purchase
            founderContainer.className = 'founder-wish';
            founderContainer.innerHTML = `
                <div class="founder-wish-content">
                    <div class="founder-wish-icon">👑</div>
                    <div class="founder-wish-price">$3.99</div>
                    <div class="founder-wish-text">${phrases[lang] || phrases.en}</div>
                </div>
            `;
            founderContainer.style.cursor = 'pointer';
            founderContainer.style.opacity = '1';
            founderContainer.onclick = () => handleTileClick(i, 'founder');
        }

        gridContainer.appendChild(founderHex);
    }
}

/**
 * Initialize Star Wishes Grid (slot 1 vacío, resto ordenado por timestamp descendente)
 */
function initializeStarWishesGrid() {
    const gridContainer = document.getElementById('starWishesGrid');
    if (!gridContainer) return;

    gridContainer.innerHTML = ''; // Clear existing
    const lang = detectLanguage();

    // Phrases for different languages
    const phrases = {
        en: 'Write your wish',
        es: 'Escribe tu deseo',
        pt: 'Escreva seu deseo',
        fr: 'Écris ton vœu'
    };

    // Obtener todos los deseos comprados ordenados por timestamp DESCENDENTE (más reciente primero)
    const purchasedWishes = Object.entries(wishes.star)
        .map(([slot, wish]) => ({ ...wish, originalSlot: slot }))
        .sort((a, b) => b.timestamp - a.timestamp); // Más reciente primero

    // Calcular el número total necesario basado en los deseos ocupados + buffer
    const occupiedCount = purchasedWishes.length;
    const minCircles = Math.max(60, occupiedCount + 10); // Mínimo 60, o los ocupados + 10 más
    const totalCircles = minCircles;

    // Generar todos los círculos
    for (let i = 1; i <= totalCircles; i++) {
        const starCircle = document.createElement('div');
        starCircle.className = 'star-wish-circle';

        // El slot 1 se ve como disponible para comprar, pero nunca se llena
        if (i === 1) {
            starCircle.innerHTML = `
                <div class="star-wish-content">
                    <div class="star-wish-price">$0.99</div>
                    <div class="star-wish-text">${phrases[lang] || phrases.en}</div>
                </div>
            `;
            starCircle.style.cursor = 'pointer';
            starCircle.style.opacity = '1';
            starCircle.onclick = () => handleTileClick(i, 'star'); // Se puede comprar
            gridContainer.appendChild(starCircle);
            continue;
        }

        // Slots 2, 3, 4, 5... muestran los deseos comprados en orden descendente
        const wishIndex = i - 2; // Slot 2 = índice 0, Slot 3 = índice 1, etc.
        const starWish = purchasedWishes[wishIndex];

        if (starWish) {
            // Occupied - show wish text and author with flag
            starCircle.classList.add('occupied');

            // Get flag PNG image
            const flagImg = countryToFlag(starWish.country);

            // Sanitize data
            const safeText = sanitizeWishText(starWish.text);
            const safeAuthor = sanitizeAuthorName(starWish.author);

            starCircle.innerHTML = `
                <div class="star-wish-content occupied-content">
                    <p class="star-wish-message">"${safeText}"</p>
                    <div class="star-wish-author-display">
                        ${flagImg}
                        <span>${safeAuthor}</span>
                    </div>
                </div>
            `;
            starCircle.style.cursor = 'pointer';
            starCircle.style.opacity = '1';
            starCircle.onclick = () => openViewWishModal(starWish, i, 'star');
        } else {
            // Empty - available for purchase
            starCircle.innerHTML = `
                <div class="star-wish-content">
                    <div class="star-wish-price">$0.99</div>
                    <div class="star-wish-text">${phrases[lang] || phrases.en}</div>
                </div>
            `;
            starCircle.style.cursor = 'pointer';
            starCircle.style.opacity = '1';
            starCircle.onclick = () => handleTileClick(i, 'star');
        }

        gridContainer.appendChild(starCircle);
    }
}

/**
 * Setup stars navigation buttons (scroll left/right)
 */
function setupStarsSlider() {
    // Navegación para star wishes
    const navLeft = document.getElementById('navLeft');
    const navRight = document.getElementById('navRight');
    const gridContainer = document.getElementById('starWishesGrid');

    if (navLeft && navRight && gridContainer) {
        // Función para calcular scrollAmount según el ancho de pantalla
        const getStarScrollAmount = () => {
            const width = window.innerWidth;
            if (width <= 480) {
                // Mobile muy pequeño: 3 columnas de 85px + gap 0.5rem (8px)
                // (85px × 3) + (8px × 2) + 16px = 287px
                return 287;
            } else if (width <= 600) {
                // Mobile pequeño: 3 columnas de 95px + gap 0.6rem (10px)
                // (95px × 3) + (10px × 2) + 16px = 321px
                return 321;
            } else if (width <= 768) {
                // Mobile: 3 columnas de 105px + gap 0.75rem (12px)
                // (105px × 3) + (12px × 2) + 16px = 355px
                return 355;
            } else {
                // Desktop: 4 columnas de 180px + gap 1.5rem (24px)
                // (180px × 4) + (24px × 3) + 32px = 824px
                return 824;
            }
        };

        navLeft.addEventListener('click', () => {
            gridContainer.scrollBy({
                left: -getStarScrollAmount(),
                behavior: 'smooth'
            });
        });

        navRight.addEventListener('click', () => {
            gridContainer.scrollBy({
                left: getStarScrollAmount(),
                behavior: 'smooth'
            });
        });
    }

    // Navegación para founder wishes
    const founderNavLeft = document.getElementById('founderNavLeft');
    const founderNavRight = document.getElementById('founderNavRight');
    const founderContainer = document.querySelector('.founder-wishes-container');

    if (founderNavLeft && founderNavRight && founderContainer) {
        // Navegar por bloques de 4 hexágonos completos
        // Cálculo: (200px hexágono × 4) + (2rem gap × 3) + (1rem padding × 2) = 800px + 96px + 32px = 928px
        const scrollAmount = 928;

        founderNavLeft.addEventListener('click', () => {
            founderContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        founderNavRight.addEventListener('click', () => {
            founderContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Setup slider for a specific tier
 */
function setupTierSlider(prevBtnId, nextBtnId, wrapperIndex) {
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const wrappers = document.querySelectorAll('.wishes-slider-wrapper');
    const wrapper = wrappers[wrapperIndex];

    if (!prevBtn || !nextBtn || !wrapper) {
        console.warn(`Slider elements not found for: ${prevBtnId}`);
        return;
    }

    prevBtn.addEventListener('click', () => {
        wrapper.scrollBy({
            left: -400,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        wrapper.scrollBy({
            left: 400,
            behavior: 'smooth'
        });
    });
}

/**
 * Handle tile click
 */
function handleTileClick(slot, tierName) {
    // Slot 1 is always available for purchase (never visually occupied)
    // Other slots only allow purchase if empty
    if (slot !== 1 && wishes[tierName][slot]) {
        return;
    }

    // Open purchase modal
    currentSlot = slot;
    currentTier = tierName;
    currentPrice = TIERS[tierName].price;
    openModal();
}

/**
 * Setup modal
 */
function setupModal() {
    const modal = document.getElementById('wishModal');
    const closeBtn = document.getElementById('modalClose');
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Open modal
 */
async function openModal() {
    const modal = document.getElementById('wishModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Clear form
    document.getElementById('wishText').value = '';
    document.getElementById('wishAuthor').value = '';
    document.getElementById('charCount').textContent = '0';

    // Update price display
    const priceElement = document.querySelector('.price-amount');
    if (priceElement) {
        priceElement.textContent = `$${currentPrice} USD`;
    }

    // Detect user's country
    const userCountry = await getUserCountry();

    // Initialize PayPal button (always shown)
    initPayPalButton();

    // Initialize Mercado Pago button only for Argentina
    const mpContainer = document.getElementById('mercadopago-button-container');
    if (userCountry === 'AR') {
        mpContainer.style.display = 'block';
        initMercadoPagoButton();
    } else {
        mpContainer.style.display = 'none';
    }
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('wishModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentSlot = null;
    currentPrice = 1;
}

/**
 * Setup character counter
 */
function setupCharCounter() {
    const textarea = document.getElementById('wishText');
    const counter = document.getElementById('charCount');
    
    textarea.addEventListener('input', () => {
        counter.textContent = textarea.value.length;
    });
}

/**
 * Initialize PayPal Button
 * 
 * INSTRUCTIONS FOR PAYPAL INTEGRATION:
 * 
 * 1. Go to https://developer.paypal.com/
 * 2. Create a PayPal Business account (or use existing)
 * 3. Go to Dashboard > My Apps & Credentials
 * 4. Create a new app to get your Client ID
 * 5. Replace "YOUR_PAYPAL_CLIENT_ID" in index.html with your actual Client ID
 * 6. For PRODUCTION: Replace sandbox URL with live URL and use production client ID
 * 
 * The PayPal button will handle the payment and call onApprove when successful
 */
function initPayPalButton() {
    const container = document.getElementById('paypal-button-container');
    container.innerHTML = ''; // Clear existing button

    // Check if PayPal SDK is loaded
    if (typeof paypal === 'undefined') {
        // Wait for PayPal SDK to load (up to 5 seconds)
        let attempts = 0;
        const maxAttempts = 50;
        const checkPayPalLoaded = setInterval(() => {
            attempts++;
            if (typeof paypal !== 'undefined') {
                clearInterval(checkPayPalLoaded);
                renderPayPalButton(container);
            } else if (attempts >= maxAttempts) {
                clearInterval(checkPayPalLoaded);
                console.error('PayPal SDK not loaded after 5 seconds');
                container.innerHTML = '';
                document.getElementById('paymentButton').style.display = 'block';
            }
        }, 100);
        return;
    }

    renderPayPalButton(container);
}

function renderPayPalButton(container) {
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal'
        },
        createOrder: function(data, actions) {
            // Validate and sanitize form before creating order
            const rawWishText = document.getElementById('wishText').value;
            const rawAuthor = document.getElementById('wishAuthor').value;

            const wishText = sanitizeWishText(rawWishText);
            const author = sanitizeAuthorName(rawAuthor);

            if (!wishText || !author) {
                alert('Please fill in both your wish and your name with valid characters');
                return;
            }

            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: currentPrice.toFixed(2),
                        currency_code: 'USD'
                    },
                    description: `New Year 2026 Wish - $${currentPrice} Slot`
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Payment successful!
                handleSuccessfulPayment();
            });
        },
        onError: function(err) {
            console.error('PayPal Error:', err);
            alert('Payment failed. Please try again.');
        }
    }).render(container).catch((err) => {
        console.error('❌ Error rendering PayPal button:', err);
        container.innerHTML = '';
        document.getElementById('paymentButton').style.display = 'block';
    });
}

/**
 * Check if user is returning from Mercado Pago payment and process the wish
 * Mercado Pago adds URL parameters like: ?status=approved or ?collection_status=approved
 */
async function checkMercadoPagoReturn() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status') || urlParams.get('collection_status');

    // Check if payment was approved
    if (status === 'approved') {
        console.log('✅ Mercado Pago payment approved, checking for pending wish...');

        // Get pending wish from localStorage
        const pendingWishData = localStorage.getItem('pendingMercadoPagoWish');

        if (pendingWishData) {
            try {
                const wishData = JSON.parse(pendingWishData);
                console.log('📦 Found pending wish data:', wishData);

                // Generate random title for the wish
                const wishTitle = getRandomWishTitle(wishData.tier);

                // Create wish object
                const wish = {
                    text: wishData.text,
                    author: wishData.author,
                    country: wishData.country,
                    wishTitle: wishTitle,
                    tier: wishData.tier,
                    slot: wishData.slot,
                    price: wishData.price,
                    timestamp: wishData.timestamp
                };

                // Save to Firebase
                await saveWishToFirebase(wish);

                // Clear pending wish from localStorage
                localStorage.removeItem('pendingMercadoPagoWish');
                console.log('✅ Mercado Pago wish saved successfully!');

                // Show success message
                alert('🎉 ¡Tu deseo ha sido guardado exitosamente! Gracias por tu pago.');

                // Clean URL (remove Mercado Pago parameters)
                const cleanUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, cleanUrl);

                // Reload constellation to show new wish
                setTimeout(() => {
                    initializeConstellation();
                }, 500);

            } catch (error) {
                console.error('❌ Error processing Mercado Pago return:', error);
                alert('Hubo un error al guardar tu deseo. Por favor contacta al soporte.');
            }
        } else {
            console.log('⚠️ No pending wish data found in localStorage');
        }
    } else if (status === 'pending') {
        console.log('⏳ Payment is pending');
        alert('Tu pago está pendiente. Cuando se apruebe, tu deseo aparecerá automáticamente.');
        // Clear URL parameters
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    } else if (status === 'rejected' || status === 'failure') {
        console.log('❌ Payment was rejected or failed');
        localStorage.removeItem('pendingMercadoPagoWish');
        alert('El pago fue rechazado. Por favor intenta nuevamente.');
        // Clear URL parameters
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    }
}

/**
 * Initialize Mercado Pago button (for Argentina users only)
 *
 * IMPORTANT: Mercado Pago requires a backend to create payment preferences securely.
 *
 * Two options:
 * 1. Simple: Use Mercado Pago Payment Links (recommended for testing)
 *    - Go to https://www.mercadopago.com.ar/tools/create
 *    - Create a payment link with your price
 *    - Use that link in the button below
 *
 * 2. Complete: Create a backend endpoint
 *    - Use Node.js/PHP/Python to create payment preferences
 *    - Call your backend from here
 *    - Handle payment notifications (webhooks)
 */
function initMercadoPagoButton() {
    const container = document.getElementById('wallet_container');

    // Check if Mercado Pago SDK is loaded
    if (typeof MercadoPago === 'undefined') {
        console.error('Mercado Pago SDK not loaded');
        return;
    }

    // Check if public key is configured
    if (!MERCADOPAGO_CONFIG || MERCADOPAGO_CONFIG.publicKey === 'YOUR_MERCADOPAGO_PUBLIC_KEY') {
        console.warn('⚠️ Mercado Pago not configured. Please update config.js with your Public Key');

        // Show placeholder button with instructions
        container.innerHTML = `
            <div style="background: linear-gradient(135deg, #009ee3 0%, #0066ff 100%);
                        color: white;
                        padding: 1rem;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        font-weight: 600;
                        margin-top: 0.5rem;">
                💳 Pagar con Mercado Pago
            </div>
            <p style="font-size: 0.8rem; color: #64748b; text-align: center; margin-top: 0.5rem;">
                Configure Mercado Pago en config.js
            </p>
        `;
        return;
    }

    // Initialize Mercado Pago
    const mp = new MercadoPago(MERCADOPAGO_CONFIG.publicKey, {
        locale: 'es-AR'
    });

    // For now, show a styled button (you'll need to implement backend)
    container.innerHTML = `
        <button id="mp-payment-button" style="
            background: linear-gradient(135deg, #009ee3 0%, #0066ff 100%);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            width: 100%;
            text-align: center;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            margin-top: 0.5rem;
            transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.02)'"
           onmouseout="this.style.transform='scale(1)'">
            💳 Pagar con Mercado Pago
        </button>
    `;

    // Add click handler
    document.getElementById('mp-payment-button').addEventListener('click', async () => {
        // Validate form
        const rawWishText = document.getElementById('wishText').value;
        const rawAuthor = document.getElementById('wishAuthor').value;

        const wishText = sanitizeWishText(rawWishText);
        const author = sanitizeAuthorName(rawAuthor);

        if (!wishText || !author) {
            alert('Por favor completa tu deseo y tu nombre con caracteres válidos');
            return;
        }

        // Get user's country
        const country = await getUserCountry();

        try {
            // Call backend to create payment preference
            // Use Render backend URL for production
            const BACKEND_URL = 'https://new-year-timer.onrender.com';
            const response = await fetch(`${BACKEND_URL}/api/create-preference`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: currentPrice,
                    wishText: wishText,
                    author: author,
                    slot: currentSlot,
                    tier: currentTier,
                    country: country
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create payment preference');
            }

            const data = await response.json();

            // Save wish data to localStorage before redirect (Mercado Pago flow)
            const pendingWish = {
                text: wishText,
                author: author,
                country: country,
                tier: currentTier,
                slot: currentSlot,
                price: currentPrice,
                timestamp: Date.now()
            };
            localStorage.setItem('pendingMercadoPagoWish', JSON.stringify(pendingWish));
            console.log('💾 Wish data saved to localStorage before Mercado Pago redirect');

            // Redirect to Mercado Pago checkout
            // Use init_point for production, sandbox_init_point for testing
            window.location.href = data.init_point || data.sandbox_init_point;

        } catch (error) {
            console.error('Error creating payment:', error);
            alert('Error al procesar el pago. Asegúrate de que el servidor esté corriendo.\n\n' +
                  'Ejecuta: npm start');
        }
    });
}

/**
 * Get user's country code from IP
 */
async function getUserCountry() {
    // Use cached geolocation data if available
    if (geoLocationData) {
        return geoLocationData.country;
    }

    // Otherwise fetch it
    const geoData = await getGeoLocationData();
    return geoData.country;
}

/**
 * Map country code to flag PNG filename
 */
const countryToFlagFile = {
    'AR': 'Argentina',
    'US': 'United-States-of-America',
    'ES': 'Spain',
    'BR': 'Brazil',
    'MX': 'Mexico',
    'FR': 'France',
    'IT': 'Italy',
    'DE': 'Germany',
    'JP': 'Japan',
    'GB': 'United-Kingdom',
    'CA': 'Canada',
    'AU': 'Australia',
    'CN': 'China',
    'IN': 'India',
    'RU': 'Russia',
    'KR': 'South-Korea',
    'PT': 'Portugal',
    'NL': 'Netherlands',
    'SE': 'Sweden',
    'NO': 'Norway',
    'DK': 'Denmark',
    'FI': 'Finland',
    'PL': 'Poland',
    'BE': 'Belgium',
    'CH': 'Switzerland',
    'AT': 'Austria',
    'IE': 'Ireland',
    'GR': 'Greece',
    'CL': 'Chile',
    'CO': 'Colombia',
    'PE': 'Peru',
    'VE': 'Venezuela',
    'EC': 'Ecuador',
    'UY': 'Uruguay',
    'BO': 'Bolivia',
    'PY': 'Paraguay',
    'ZA': 'South-Africa',
    'EG': 'Egypt',
    'NG': 'Nigeria',
    'KE': 'Kenya',
    'TH': 'Thailand',
    'VN': 'Vietnam',
    'PH': 'Philippines',
    'MY': 'Malaysia',
    'SG': 'Singapore',
    'ID': 'Indonesia',
    'NZ': 'New-Zealand',
    'TR': 'Turkey',
    'SA': 'Saudi-Arabia',
    'AE': 'United-Arab-Emirates',
    'IL': 'Israel',
    'PK': 'Pakistan',
    'BD': 'Bangladesh',
    'UA': 'Ukraine',
    'RO': 'Romania',
    'CZ': 'Czech-Republic',
    'HU': 'Hungary',
    'XX': 'World' // Default fallback
};

/**
 * Convert country code to flag PNG image HTML
 * Using GitHub Raw URL for production compatibility
 */
function countryToFlag(countryCode) {
    // GitHub Raw URL base (change branch if needed: main or your branch name)
    const GITHUB_FLAGS_BASE = 'https://raw.githubusercontent.com/Keykpo/New-year-timer/claude/new-years-timer-app-011CV4M9g8SvSXPkHc83gdrj/Flags%20PNG/';

    if (!countryCode || countryCode === 'XX') {
        return `<img src="${GITHUB_FLAGS_BASE}World.png" alt="World" class="flag-icon" onerror="this.style.display='none'" />`;
    }

    const flagFile = countryToFlagFile[countryCode.toUpperCase()];

    if (flagFile) {
        return `<img src="${GITHUB_FLAGS_BASE}${flagFile}.png" alt="${flagFile}" class="flag-icon" onerror="this.style.display='none'" />`;
    }

    // Fallback to emoji if PNG not found
    return '🌍';
}

/**
 * Find the next available slot for a tier, starting from slot 2
 * (Slot 1 is always kept empty for display)
 */
function findNextAvailableSlot(tierName) {
    let slot = 2;
    while (wishes[tierName][slot]) {
        slot++;
    }
    return slot;
}

/**
 * Handle successful payment
 */
async function handleSuccessfulPayment() {
    // Get and sanitize inputs
    const rawWishText = document.getElementById('wishText').value;
    const rawAuthor = document.getElementById('wishAuthor').value;

    const wishText = sanitizeWishText(rawWishText);
    const author = sanitizeAuthorName(rawAuthor);

    if (!wishText || !author || !currentSlot || !currentTier) {
        alert('Error: Missing or invalid wish data');
        return;
    }

    // Get user's country
    const country = await getUserCountry();

    // Generate random wish title based on tier
    const wishTitle = getRandomWishTitle(currentTier);

    // If user clicked slot 1, assign them the next available slot starting from 2
    let assignedSlot = currentSlot;
    if (currentSlot === 1) {
        assignedSlot = findNextAvailableSlot(currentTier);
        console.log(`User clicked slot 1, assigning slot ${assignedSlot} instead`);
    }

    const wish = {
        text: wishText,
        author: author,
        country: country,
        wishTitle: wishTitle, // ← Random title for this wish
        slot: assignedSlot, // ← Use assigned slot (may be different from currentSlot)
        tier: currentTier,
        price: currentPrice,
        timestamp: Date.now()
    };

    // Save to Firebase and wait for completion
    try {
        await saveWishToFirebase(wish);

        // Close modal
        closeModal();

        // Show success message
        alert('🎉 Your wish has been saved! It will shine on the wall forever!');

        // Regenerate the constellation to show the next available slot
        // Si es un star wish, se crearán automáticamente más espacios en initializeStarWishesGrid
        setTimeout(() => {
            initializeConstellation();
        }, 500);
    } catch (error) {
        console.error('Error saving wish:', error);
        alert('❌ Error saving your wish. Please try again or contact support.');
    }
}

/**
 * Save wish to Firebase
 * Returns a promise that resolves when the wish is saved
 */
async function saveWishToFirebase(wish) {
    if (!database) {
        console.error('❌ Firebase not initialized');
        throw new Error('Firebase not initialized');
    }

    console.log(`💾 Saving wish to Firebase: Tier=${wish.tier}, Slot=${wish.slot}`);

    try {
        // Save wish in the tier-specific path and wait for completion
        await database.ref(`wishes/${wish.tier}/${wish.slot}`).set({
            text: wish.text,
            author: wish.author,
            country: wish.country, // ← Save country
            wishTitle: wish.wishTitle, // ← Save random title
            price: wish.price,
            timestamp: wish.timestamp
        });

        console.log(`✅ Wish saved successfully to Firebase: Slot ${wish.slot}`);
        return true;
    } catch (error) {
        console.error('❌ Error saving wish to Firebase:', error);
        throw error;
    }
}

/**
 * Load wishes from Firebase
 * Combina los deseos de Firebase con los deseos semilla para siempre mostrar contenido
 */
function loadWishesFromFirebase() {
    if (!database) {
        console.error('Firebase not initialized - using seed wishes only');
        // Si no hay Firebase, usar solo los deseos semilla
        wishes.founder = mergeWishesWithSeeds({}, 'founder');
        wishes.star = mergeWishesWithSeeds({}, 'star');
        initializeConstellation();
        updateWishesCounter();
        return;
    }

    // Listen for wishes changes in real-time for each tier (only 2 tiers now)
    ['founder', 'star'].forEach(tierName => {
        database.ref(`wishes/${tierName}`).on('value',
            (snapshot) => {
                console.log(`✅ Firebase ${tierName} wishes loaded:`, snapshot.val());
                // Combinar deseos de Firebase con deseos semilla
                wishes[tierName] = mergeWishesWithSeeds(snapshot.val(), tierName);
                // Regenerate constellation when wishes change
                initializeConstellation();
                // Update counter immediately after loading wishes
                updateWishesCounter();
            },
            (error) => {
                // ERROR: Probablemente reglas de Firebase o conexión
                console.error(`❌ Firebase error loading ${tierName} wishes:`, error.message);
                console.warn(`⚠️ Using seed wishes only for ${tierName} due to Firebase error`);
                // Usar solo deseos semilla como fallback
                wishes[tierName] = mergeWishesWithSeeds({}, tierName);
                initializeConstellation();
                updateWishesCounter();
            }
        );
    });
}

/**
 * FUNCIÓN TEMPORAL: Cargar 12 deseos de prueba de diferentes países
 * ¡COMENTAR O ELIMINAR DESPUÉS DE PROBAR!
 */
function loadTestWishes() {
    if (!database) return;

    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    // 12 deseos de prueba con timestamps espaciados (más antiguo primero)
    // Cada deseo está en el idioma del país de origen
    const testWishes = [
        {
            text: "Que este año traiga salud y prosperidad para todos",
            author: "María",
            country: "AR", // Argentina - Español
            timestamp: now - (12 * oneHour)
        },
        {
            text: "More adventures and less worries",
            author: "John",
            country: "US", // Estados Unidos - Inglés
            timestamp: now - (11 * oneHour)
        },
        {
            text: "Que se cumplan todos mis sueños en 2026",
            author: "Carlos",
            country: "ES", // España - Español
            timestamp: now - (10 * oneHour)
        },
        {
            text: "Paz mundial e amor para todos",
            author: "Ana",
            country: "BR", // Brasil - Portugués
            timestamp: now - (9 * oneHour)
        },
        {
            text: "Éxito en todos mis proyectos",
            author: "Pedro",
            country: "MX", // México - Español
            timestamp: now - (8 * oneHour)
        },
        {
            text: "Que le bonheur nous accompagne toujours",
            author: "Sophie",
            country: "FR", // Francia - Francés
            timestamp: now - (7 * oneHour)
        },
        {
            text: "Viaggiare per il mondo senza limiti",
            author: "Marco",
            country: "IT", // Italia - Italiano
            timestamp: now - (6 * oneHour)
        },
        {
            text: "Die wahre Liebe finden",
            author: "Hans",
            country: "DE", // Alemania - Alemán
            timestamp: now - (5 * oneHour)
        },
        {
            text: "May my family always be united",
            author: "Yuki",
            country: "JP", // Japón - Inglés (simplificado)
            timestamp: now - (4 * oneHour)
        },
        {
            text: "Health and wellness for my loved ones",
            author: "James",
            country: "GB", // Reino Unido - Inglés
            timestamp: now - (3 * oneHour)
        },
        {
            text: "To grow professionally and personally",
            author: "Emma",
            country: "CA", // Canadá - Inglés
            timestamp: now - (2 * oneHour)
        },
        {
            text: "May life surprise us with good things",
            author: "Jack",
            country: "AU", // Australia - Inglés
            timestamp: now - (1 * oneHour)
        },
        {
            text: "Att mina drömmar blir verklighet",
            author: "Lars",
            country: "SE", // Suecia - Sueco
            timestamp: now - (55 * 60 * 1000) // 55 minutos
        },
        {
            text: "Здоровье и счастье моей семье",
            author: "Ivan",
            country: "RU", // Rusia - Ruso
            timestamp: now - (50 * 60 * 1000) // 50 minutos
        },
        {
            text: "새로운 시작과 희망",
            author: "Min-jun",
            country: "KR", // Corea del Sur - Coreano
            timestamp: now - (45 * 60 * 1000) // 45 minutos
        },
        {
            text: "Een jaar vol vreugde en voorspoed",
            author: "Anna",
            country: "NL", // Países Bajos - Holandés
            timestamp: now - (40 * 60 * 1000) // 40 minutos
        },
        {
            text: "Que a felicidade me acompanhe sempre",
            author: "Lucas",
            country: "PT", // Portugal - Portugués
            timestamp: now - (35 * 60 * 1000) // 35 minutos
        },
        {
            text: "Więcej miłości i spokoju",
            author: "Kasia",
            country: "PL", // Polonia - Polaco
            timestamp: now - (30 * 60 * 1000) // 30 minutos
        },
        {
            text: "Να πραγματοποιηθούν τα όνειρά μου",
            author: "Nikos",
            country: "GR", // Grecia - Griego
            timestamp: now - (25 * 60 * 1000) // 25 minutos
        },
        {
            text: "Success in every endeavor",
            author: "Aisha",
            country: "ZA", // Sudáfrica - Inglés
            timestamp: now - (20 * 60 * 1000) // 20 minutos
        },
        {
            text: "ความสุขและความสำเร็จในปีใหม่",
            author: "Somchai",
            country: "TH", // Tailandia - Tailandés
            timestamp: now - (15 * 60 * 1000) // 15 minutos
        },
        {
            text: "Thành công và hạnh phúc",
            author: "Linh",
            country: "VN", // Vietnam - Vietnamita
            timestamp: now - (10 * 60 * 1000) // 10 minutos
        }
    ];

    // TEMPORAL: Eliminar deseos antiguos y cargar nuevos con idiomas nativos
    database.ref('wishes/star').once('value', (snapshot) => {
        const existingWishes = snapshot.val() || {};
        const existingCount = Object.keys(existingWishes).length;

        console.log(`📊 Encontrados ${existingCount} deseos existentes`);

        // FORZAR recarga: Eliminar todos los deseos existentes
        console.log('🗑️ Eliminando deseos antiguos...');
        database.ref('wishes/star').remove().then(() => {
            console.log('🎯 Cargando 22 deseos de prueba con idiomas nativos...');

            // Cargar cada deseo con un slot único después de un pequeño delay
            setTimeout(() => {
                testWishes.forEach((wish, index) => {
                    const slot = index + 2; // Slots 2, 3, 4... 23 (skip slot 1)
                    const randomTitle = getRandomWishTitle('star'); // Generate random title
                    database.ref(`wishes/star/${slot}`).set({
                        text: wish.text,
                        author: wish.author,
                        country: wish.country,
                        wishTitle: randomTitle, // ← Random title for each wish
                        price: 0.99,
                        timestamp: wish.timestamp
                    });
                });

                console.log('✅ 22 deseos de prueba cargados exitosamente con idiomas nativos y títulos aleatorios');
            }, 500);
        });
    });
}

/**
 * FUNCIÓN TEMPORAL: Cargar 2 deseos de prueba Founder ($3.99)
 * ¡COMENTAR O ELIMINAR DESPUÉS DE PROBAR!
 */
function loadTestFounderWishes() {
    if (!database) return;

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    // 2 deseos Founder de prueba con timestamps espaciados
    // Cada deseo está en el idioma del país de origen
    const founderWishes = [
        {
            text: "Que todos mis emprendimientos prosperen y traigan abundancia infinita",
            author: "Roberto",
            country: "AR", // Argentina - Español
            timestamp: now - (2 * oneDay)
        },
        {
            text: "May my dreams become reality and inspire millions around the world",
            author: "Michael",
            country: "US", // Estados Unidos - Inglés
            timestamp: now - (1 * oneDay)
        }
    ];

    // TEMPORAL: Eliminar deseos antiguos y cargar nuevos
    database.ref('wishes/founder').once('value', (snapshot) => {
        const existingWishes = snapshot.val() || {};
        const existingCount = Object.keys(existingWishes).length;

        console.log(`👑 Encontrados ${existingCount} deseos Founder existentes`);

        // FORZAR recarga: Eliminar todos los deseos existentes
        console.log('🗑️ Eliminando deseos Founder antiguos...');
        database.ref('wishes/founder').remove().then(() => {
            console.log('🎯 Cargando 2 deseos Founder de prueba...');

            // Cargar cada deseo con un slot único después de un pequeño delay
            setTimeout(() => {
                founderWishes.forEach((wish, index) => {
                    const slot = index + 2; // Slots 2, 3 (skip slot 1)
                    const randomTitle = getRandomWishTitle('founder'); // Generate random title
                    database.ref(`wishes/founder/${slot}`).set({
                        text: wish.text,
                        author: wish.author,
                        country: wish.country,
                        wishTitle: randomTitle, // ← Random title for each wish
                        price: 3.99,
                        timestamp: wish.timestamp
                    });
                });

                console.log('✅ 2 deseos Founder de prueba cargados exitosamente con títulos aleatorios');
            }, 500);
        });
    });
}

/**
 * Update wishes display for a specific tier
 */
function updateTierWishesDisplay(tierName) {
    const tierWishes = wishes[tierName];

    Object.keys(tierWishes).forEach(slot => {
        const wish = tierWishes[slot];
        const tile = document.querySelector(`[data-tier="${tierName}"][data-slot="${slot}"]`);

        if (tile && wish) {
            tile.className = `wish-tile occupied ${tierName}`;

            // Sanitize again for defense in depth
            const safeText = sanitizeWishText(wish.text);
            const safeAuthor = sanitizeAuthorName(wish.author);

            // Get flag emoji
            const flag = countryToFlag(wish.country);

            tile.innerHTML = `
                <div class="wish-tile-content">
                    <p class="wish-text">"${safeText}"</p>
                    <p class="wish-author">${flag} ${safeAuthor}</p>
                </div>
            `;
            // Add click handler to view wish in modal
            tile.style.cursor = 'pointer';
            tile.onclick = () => openViewWishModal(wish, slot, tierName);
        }
    });
}

/**
 * Open view wish modal
 */
function openViewWishModal(wish, slot, tierName) {
    const modal = document.getElementById('viewWishModal');

    // Sanitize data
    const safeText = sanitizeWishText(wish.text);
    const safeAuthor = sanitizeAuthorName(wish.author);

    // Set tier badge
    const badge = document.getElementById('viewWishBadge');
    const icon = document.getElementById('viewWishIcon');
    const tierText = document.getElementById('viewWishTier');

    badge.className = `wish-tier-badge ${tierName}`;

    // Use saved wish title or fallback to tier-based title
    const wishTitle = wish.wishTitle || (tierName === 'founder' ? 'Golden Wish' : 'Star Wish');

    if (tierName === 'founder') {
        icon.textContent = '👑';
        tierText.textContent = wishTitle;
    } else if (tierName === 'star') {
        icon.textContent = '⭐';
        tierText.textContent = wishTitle;
    } else {
        icon.textContent = '⭐';
        tierText.textContent = wishTitle;
    }

    // Set wish content
    const flagImg = countryToFlag(wish.country);
    document.getElementById('viewWishText').textContent = safeText;
    document.getElementById('viewWishAuthor').innerHTML = `${flagImg} <span>${safeAuthor}</span>`;

    // Set date
    if (wish.timestamp) {
        const date = new Date(wish.timestamp);
        document.getElementById('viewWishDate').textContent = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } else {
        document.getElementById('viewWishDate').textContent = '';
    }

    // Open modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close view wish modal
 */
function closeViewWishModal() {
    const modal = document.getElementById('viewWishModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Setup view wish modal
 */
function setupViewWishModal() {
    const closeBtn = document.getElementById('viewWishClose');
    const modal = document.getElementById('viewWishModal');

    // Close button
    closeBtn.addEventListener('click', closeViewWishModal);

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeViewWishModal();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeViewWishModal();
        }
    });
}

// ====================================
// DARK MODE TOGGLE
// ====================================

/**
 * Setup dark mode toggle
 */
function setupDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const icon = document.querySelector('.toggle-icon');

    if (!toggle || !icon) {
        console.warn('Dark mode toggle elements not found');
        return;
    }

    // Check saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
        icon.textContent = '☀️';
    }

    // Toggle on click
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        icon.textContent = isDark ? '☀️' : '🌙';
    });
}

// ====================================
// SCROLL TO STAR WISHES
// ====================================

/**
 * Setup scroll button to navigate to Star wishes section
 */
function setupScrollToStarWishes() {
    const scrollButton = document.getElementById('scrollToStarWishes');

    if (!scrollButton) {
        console.warn('Scroll to Star wishes button not found');
        return;
    }

    scrollButton.addEventListener('click', () => {
        const starGrid = document.getElementById('starWishesGrid');
        if (starGrid) {
            starGrid.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });

    console.log('✅ Scroll to Star wishes button initialized');
}

// ====================================
// INITIALIZATION
// ====================================

async function init() {
    // 1. Get geolocation data from IP (works with VPN)
    await getGeoLocationData();

    // 2. Detect and apply language
    const userLanguage = detectLanguage();
    applyTranslations(userLanguage);

    // 3. Check if returning from Mercado Pago payment
    checkMercadoPagoReturn();

    // 4. Display timezone information
    displayTimezoneInfo();

    // 5. Initialize countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 6. Setup lazy loading for map (will load when user scrolls to it)
    setupMapLazyLoading();

    // 7. Initialize wishes wall
    initWishesWall();

    // 8. Setup view wish modal
    setupViewWishModal();

    // 9. Setup dark mode toggle
    setupDarkMode();

    // 10. Setup scroll button to Star wishes
    setupScrollToStarWishes();
}

// Generate starry background
function generateStars() {
    const starsContainer = document.getElementById('starsBackground');
    if (!starsContainer) return;

    const numberOfStars = 150; // Number of stars to generate

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // Random size variation
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random animation delay
        star.style.animationDelay = `${Math.random() * 3}s`;

        starsContainer.appendChild(star);
    }
}

/**
 * Initialize and play background video
 */
function initVideoBackground() {
    const video = document.querySelector('.video-background');
    if (!video) {
        console.error('❌ Video element not found');
        return;
    }

    console.log('🎥 Initializing video background...');

    // Try to play the video
    const playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('✅ Video playing successfully');
            })
            .catch(error => {
                console.error('❌ Video playback failed:', error);
                console.log('Video src:', video.src);
                console.log('Video readyState:', video.readyState);
            });
    }

    // Log when video is loaded
    video.addEventListener('loadeddata', () => {
        console.log('✅ Video data loaded');
    });

    // Log errors
    video.addEventListener('error', (e) => {
        console.error('❌ Video error:', e);
        console.error('Error code:', video.error?.code);
        console.error('Error message:', video.error?.message);
    });
}

// Start everything when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initVideoBackground(); // Initialize video background
        generateStars(); // Generate stars first
        init();
    });
} else {
    initVideoBackground(); // Initialize video background
    generateStars(); // Generate stars first
    init();
}
