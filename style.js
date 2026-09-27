document.addEventListener('DOMContentLoaded', () => {
    console.log('Сайт успешно инициализирован.');

    const menuBtn = document.getElementById('menuBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const mainLogo = document.getElementById('mainLogo');
    const infoBoxTitle = document.getElementById('infoBoxTitle');
    const infoBoxDesc = document.getElementById('infoBoxDesc');
    const factsContainer = document.getElementById('factsContainer');

    // --- ОТКРЫТИЕ И ЗАКРЫТИЕ МЕНЮ ---
    if (menuBtn && dropdownMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!dropdownMenu.contains(e.target) && e.target !== menuBtn) {
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // --- ИНТЕРАКТИВНЫЙ ЗУМ КАРТЫ (БЕЗОПАСНО) ---
    const mapScrollLayer = document.getElementById('mapScrollLayer');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    if (zoomInBtn && zoomOutBtn && mapScrollLayer) {
        let zoom = 1;
        zoomInBtn.addEventListener('click', () => { if (zoom < 2.5) mapScrollLayer.style.transform = `scale(${zoom += 0.25})`; });
        zoomOutBtn.addEventListener('click', () => { if (zoom > 1) mapScrollLayer.style.transform = `scale(${zoom -= 0.25})`; });
    }

    // --- КЛИКИ ПО МАРКЕРАМ КАРТЫ ---
    const markers = document.querySelectorAll('.map-marker');
    markers.forEach(m => m.addEventListener('click', () => {
        activeLocKey = m.getAttribute('data-loc');
        updateInfoBox();
    }));

    // --- СЛОВАРЬ ПЕРЕВОДОВ И 10 ФАКТОВ ---
    const translations = {
        'ru': {
            logo: 'БЕЛАРУСЬ', menu_facts: '10 фактов о Беларуси', map_title: 'Достопримечательности и интересные места', map_quiz_link: 'Пройти викторину →',
            info_idle_title: 'Кликните на маркер', info_idle_desc: 'Выберите любую точку на карте, чтобы узнать о ней подробнее.',
            minsk_title: 'Минск', minsk_desc: 'Столица Беларуси, крупнейший транспортный хаб.',
            mir_title: 'Мирский замок', mir_desc: 'Выдающийся памятник оборонительного зодчества XVI века. Включён в список Всемирного наследия ЮНЕСКО.',
            nesv_title: 'Несвижский замок', nesv_desc: 'Дворцово-парковый ансамбль резиденции рода Радзивиллов. Шедевр европейской архитектуры барокко.',
            brest_title: 'Брестская крепость', brest_desc: 'Крепость-герой, принявшая на себя первый удар в июне 1941 года. Масштабный мемориальный комплекс памяти.',
            polotsk_title: 'Софийский собор', polotsk_desc: 'Древнейший каменный храм Беларуси в Полоцке. Архитектурный символ духовной культуры.',
            gomel_title: 'Набережная в Гомеле', gomel_desc: 'Живописная набережная реки Сож и знаменитый классический дворец Румянцевых-Паскевичей.',
            quiz_back: '← На главную', quiz_title: 'Викторина о Беларуси', quiz_next: 'Дальше →', quiz_ended: 'Тест завершен!', quiz_retry: 'Пройти еще раз',
            items: [
                { title: "Географическое положение.", text: "Беларусь — самое крупное по площади государство Европы, которое полностью находится внутри континента и не имеет выхода к морю." },
                { title: "Лесные богатства.", text: "Около 40% территории страны покрыто лесами, из-за чего Беларусь часто называют «лёгкими Европы»." },
                { title: "Реликтовый лес.", text: "Беловежская пуща — древнейший заповедный лес в Европе, где обитает крупнейшая в мире популяция зубров." },
                { title: "Наследие ЮНЕСКО.", text: "В стране находятся четыре объекта из списка Всемирного наследия ЮНЕСКО: Мирский замок, Несвижский замок, Беловежская пуща и геодезическая дуга Струве." },
                { title: "Тяжёлая промышленность.", text: "Беларусь занимает одно из ведущих мест в мире по производству карьерных самосвалов — каждый третий сверхтяжелый грузовик выпускается на заводе БЕЛАЗ." },
                { title: "IT-индустрия.", text: "Страна известна своей мощной IT-индустрией. Игры и приложения вроде World of Tanks, Viber и MSQRD были созданы белорусскими разработчиками." },
                { title: "Национальная кухня.", text: "Картофель — главный кулинарный символ страны, в белорусской кухне насчитывается более 300 традиционных блюд из этого корнеплода." },
                { title: "Покорение космоса.", text: "Беларусь лидирует среди стран СНГ по количеству космонавтов на душу населения: уроженцами страны являются Петр Климук, Владимир Коваленок, Олег Новицкий и Марина Василевская." },
                { title: "Уникальная архитектура.", text: "В Минске находится Национальная библиотека Беларуси, здание которой выполнено в форме сложного многогранника (ромбокубооктаэдра)." },
                          { title: "Замки и дворцы.", text: "На территории Беларуси сохранилось более 150 старинных замков, дворцов и их руин, напоминающих о богатой истории времен Великого княжества Литовского." }
            ]
        },
        'en-gb': {
            logo: 'BELARUS', menu_facts: '10 Facts About Belarus', map_title: 'Sights and Places of Interest', map_quiz_link: 'Take the Quiz →',
            info_idle_title: 'Click a marker', info_idle_desc: 'Select any point on the map to find out more detailed information.',
            minsk_title: 'Minsk', minsk_desc: 'The capital of Belarus, the largest transport hub.',
            mir_title: 'Mir Castle', mir_desc: 'An outstanding 16th-century monument of defensive architecture.',
            nesv_title: 'Nesvizh Castle', nesv_desc: 'A magnificent palace and park complex.',
            brest_title: 'Brest Fortress', brest_desc: 'The Hero Fortress that withstood assault.',
            polotsk_title: 'Saint Sophia Cathedral', polotsk_desc: 'The oldest stone temple in Belarus.',
            gomel_title: 'Gomel Embankment', gomel_desc: 'The beautiful scenic embankment of the Sozh River.',
            quiz_back: '← Home', quiz_title: 'Belarus Quiz', quiz_next: 'Next →', quiz_ended: 'Quiz Completed!', quiz_retry: 'Try Again',
            items: [
                { title: "Geographical Location.", text: "Belarus is the largest country in Europe by land area that is entirely located within the continent and has no access to the sea." },
                { title: "Forest Wealth.", text: "About 40% of the country's territory is covered by forests, which is why Belarus is frequently called the 'lungs of Europe'." },
                { title: "Primeval Forest.", text: "Bialowieza Forest is the oldest protected woodland in Europe, home to the world's largest population of European bison." },
                { title: "UNESCO Heritage.", text: "The country features four UNESCO World Heritage sites: Mir Castle, Nesvizh Castle, Bialowieza Forest, and the Struve Geodetic Arc." },
                { title: "Heavy Industry.", text: "Belarus is a global leader in the production of haul trucks — every third heavy-duty dump truck on Earth is manufactured at the BELAZ plant." },
                { title: "IT Industry.", text: "The country is renowned for its powerful IT sector; hit games and apps like World of Tanks, Viber, and Masquerade (MSQRD) were created by Belarusian developers." },
                          { title: "National Cuisine.", text: "The potato is the ultimate culinary symbol of the country; Belarusian cuisine boasts over 300 traditional dishes made from this root vegetable." },
                          { title: "Space Exploration.", text: "Belarus leads CIS nations in cosmonauts per capita: native-born space explorers include Pyotr Klimuk, Vladimir Kovalyonok, Oleg Novitsky, and Marina Vasilevskaya." },
                          { title: "Unique Architecture.", text: "Minsk is home to the National Library of Belarus; its building is shaped like a complex polyhedron (rhombicuboctahedron)." },
                          { title: "Castles and Palaces.", text: "Over 150 historic castles, palaces, and ruins have survived across Belarus, serving as a reminder of the rich heritage of the Grand Duchy of Lithuania era." }
            ]
        },
        'en-us': {
            logo: 'BELARUS', menu_facts: '10 Facts About Belarus', map_title: 'Attractions & Places of Interest', map_quiz_link: 'Take the Quiz →',
            info_idle_title: 'Click on a marker', info_idle_desc: 'Select any point on the map to view more details.',
            minsk_title: 'Minsk', minsk_desc: 'The capital of Belarus, a major transportation hub.',
            mir_title: 'Mir Castle', mir_desc: 'An outstanding 16th-century monument.',
            nesv_title: 'Nesvizh Castle', nesv_desc: 'A beautiful palace and park complex.',
            brest_title: 'Brest Fortress', brest_desc: 'The Hero Fortress that took the first blow.',
            polotsk_title: 'St. Sophia Cathedral', polotsk_desc: 'The oldest stone church in Belarus.',
            gomel_title: 'Gomel Embankment', gomel_desc: 'The scenic embankment of the Sozh River.',
            quiz_back: '← Home', quiz_title: 'Belarus Quiz', quiz_next: 'Next →', quiz_ended: 'Quiz Completed!', quiz_retry: 'Try Again',
            items: [
                { title: "Geographical Location.", text: "Belarus is the largest country in Europe by land area that is entirely located within the continent and has no access to the sea." },
                { title: "Forest Wealth.", text: "About 40% of the country's territory is covered by forests, which is why Belarus is frequently called the 'lungs of Europe'." },
                { title: "Primeval Forest.", text: "Bialowieza Forest is the oldest protected woodland in Europe, home to the world's largest population of European bison." },
                { title: "UNESCO Heritage.", text: "The country features four UNESCO World Heritage sites: Mir Castle, Nesvizh Castle, Bialowieza Forest, and the Struve Geodetic Arc." },
                { title: "Heavy Industry.", text: "Belarus is a global leader in the production of haul trucks — every third heavy-duty dump truck on Earth is manufactured at the BELAZ plant." },
                { title: "IT Industry.", text: "The country is renowned for its powerful IT sector; hit games and apps like World of Tanks, Viber, and Masquerade (MSQRD) were created by Belarusian developers." },
                          { title: "National Cuisine.", text: "The potato is the ultimate culinary symbol of the country; Belarusian cuisine boasts over 300 traditional dishes made from this root vegetable." },
                          { title: "Space Exploration.", text: "Belarus leads CIS nations in cosmonauts per capita: native-born space explorers include Pyotr Klimuk, Vladimir Kovalyonok, Oleg Novitsky, and Marina Vasilevskaya." },
                          { title: "Unique Architecture.", text: "Minsk is home to the National Library of Belarus; its building is shaped like a complex polyhedron (rhombicuboctahedron)." },
                          { title: "Castles and Palaces.", text: "Over 150 historic castles, palaces, and ruins have survived across Belarus, serving as a reminder of the rich heritage of the Grand Duchy of Lithuania era." }
            ]
        }
    };

    let currentLang = localStorage.getItem('siteLanguage') || 'ru';
    let activeLocKey = null;

    function updateInfoBox() {
        if (!infoBoxTitle || !infoBoxDesc) return;
        const key = activeLocKey;
        infoBoxTitle.textContent = (key && translations[currentLang][`${key}_title`]) ? translations[currentLang][`${key}_title`] : translations[currentLang]['info_idle_title'];
        infoBoxDesc.textContent = (key && translations[currentLang][`${key}_desc`]) ? translations[currentLang][`${key}_desc`] : translations[currentLang]['info_idle_desc'];
    }

    // --- РЕНДЕР ФАКТОВ (БЕЗОПАСНО) ---
    function renderFacts(lang) {
        if (!factsContainer || !translations[lang].items) return;
        factsContainer.innerHTML = '';
        translations[lang].items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'fact-card';
            card.innerHTML = `
            <div class="fact-number">${String(index + 1).padStart(2, '0')}</div>
            <div class="fact-text"><strong>${item.title}</strong> ${item.text}</div>
            `;
            factsContainer.appendChild(card);
        });
    }

    // --- ГЛАВНАЯ ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ ЯЗЫКА ---
    function changeLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        localStorage.setItem('siteLanguage', lang);

        if (mainLogo) mainLogo.textContent = translations[lang].logo;

        // 1. ПЕРЕВОД ПУНКТОВ МЕНЮ
        // Перевод пункта "10 фактов" (на главной)
        // 1. ПЕРЕВОД ПУНКТОВ МЕНЮ
        // Перевод пункта "10 фактов" (на главной)
        const factsLink = document.querySelector('a[href*="facts.html"]');
        if (factsLink) {
            const textNode = Array.from(factsLink.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
            if (textNode) textNode.textContent = translations[lang].menu_facts;
        }

        // БЕЗОПАСНЫЙ перевод пункта "Главная" (работает и в фактах, и в квизе)
        const homeLink = document.getElementById('menuHomeLink') || document.querySelector('a[href="index.html"]');
        if (homeLink) {
            homeLink.textContent = lang === 'ru' ? 'Главная' : 'Home';
        }

        // Перевод заголовка "Выбор языка" в меню
        const langTitle = document.getElementById('menuLangTitle');
        if (langTitle) {
            langTitle.textContent = translations[lang].menu_lang || (lang === 'ru' ? 'Выбор языка' : 'Language Selection');
        }

        // 2. ПЕРЕВОД КОНТЕНТА СТРАНИЦ
        // Перевод заголовка над картой (для index.html)
        const mapHeading = document.querySelector('h2:not(.lang-text h2)');
        if (mapHeading && (mapHeading.textContent.includes('Достопримечательности') || mapHeading.textContent.includes('Sights') || mapHeading.textContent.includes('Attractions'))) {
            mapHeading.textContent = translations[lang].map_title;
        }

        // Перевод ссылки "Пройти викторину ->" (для index.html)
        const quizLink = document.querySelector('a[href*="quiz.html"]');
        if (quizLink) quizLink.textContent = translations[lang].map_quiz_link;

        // Переключение блоков сочинения
        document.querySelectorAll('.lang-text').forEach(b => {
            b.style.display = b.getAttribute('data-lang') === lang ? 'block' : 'none';
        });

        // Генерация фактов
        renderFacts(lang);


        // 3. ПЕРЕВОД ЭЛЕМЕНТОВ КВИЗА (С ПРОВЕРКАМИ)
        const backBtn = document.getElementById('factsBackBtn');
        if (backBtn) backBtn.textContent = translations[lang].quiz_back;

        const quizTitle = document.querySelector('h1:not(.lang-text h1)');
        if (quizTitle && (quizTitle.textContent.includes('Викторина') || quizTitle.textContent.includes('Quiz'))) {
            quizTitle.textContent = translations[lang].quiz_title;
        }

        const nextBtn = document.getElementById('nextBtn') || document.querySelector('button');
        if (nextBtn && (nextBtn.textContent.includes('Дальше') || nextBtn.textContent.includes('Next'))) {
            nextBtn.textContent = translations[lang].quiz_next;
        }

        const resHeader = document.querySelector('.result-section h2, h2');
        if (resHeader && (resHeader.textContent.includes('Тест завершен') || resHeader.textContent.includes('Quiz Completed'))) {
            resHeader.textContent = translations[lang].quiz_ended;
        }

        const retryBtn = document.getElementById('retryBtn') || document.querySelector('.result-section a');
        if (retryBtn) retryBtn.textContent = translations[lang].quiz_retry;

        // Перевод динамических счетчиков "Вопрос X из Y"
        document.body.querySelectorAll('*').forEach(el => {
            if (el.children.length === 0 && el.textContent.trim() !== '') {
                if ((el.textContent.includes('Вопрос') || el.textContent.includes('Question')) && (el.textContent.includes('из') || el.textContent.includes('of'))) {
                    const num = el.textContent.match(/\d+/g);
                    if (num && num.length >= 2) el.textContent = lang === 'ru' ? `Вопрос ${num[0]} из ${num[1]}` : `Question ${num[0]} of ${num[1]}`;
                }
                if ((el.textContent.includes('Вы набрали') || el.textContent.includes('You scored')) && (el.textContent.includes('из') || el.textContent.includes('out of'))) {
                    const num = el.textContent.match(/\d+/g);
                    if (num && num.length >= 2) el.textContent = lang === 'ru' ? `Вы набрали ${num[0]} из ${num[1]}` : `You scored ${num[0]} out of ${num[1]}`;
                }
            }
        });

        updateInfoBox();
        document.documentElement.lang = lang;
    }

    // Слушатели кликов по языкам в меню
    document.querySelectorAll('.submenu a[data-lang]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            changeLanguage(link.getAttribute('data-lang'));
            if (dropdownMenu) dropdownMenu.classList.remove('active');
        });
    });

    // Инициализация при открытии страницы
    changeLanguage(currentLang);
});
