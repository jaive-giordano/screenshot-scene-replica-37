import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { MailLabels, PlanId, PortfolioId } from "@/lib/site-data";

export const LANGS = ["et", "en", "ru", "it"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "et";

type PlanText = { name: string; description: string; features: string[]; cta: string };

export type Dict = {
  nav: { work: string; pricing: string; how: string; contact: string; cta: string; menu: string; openMenu: string; language: string };
  hero: { badge: string; title: string; titleAccent: string; sub: string; ctaWork: string; ctaPricing: string; chipTitle: string; chipSub: string };
  portfolio: {
    eyebrow: string;
    title: string;
    sub: string;
    view: string;
    items: Record<PortfolioId, { badge: string; title: string; description: string }>;
  };
  how: { eyebrow: string; title: string; sub: string; steps: { title: string; text: string }[] };
  pricing: {
    eyebrow: string;
    title: string;
    sub: string;
    oneTime: string;
    popular: string;
    plans: Record<PlanId, PlanText>;
    laterTitle: string;
    later: (perChange: number, hourly: number) => string;
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    intro: string;
    role: string;
    emailLabel: string;
    phoneLabel: string;
    countries: { ee: string; it: string };
    fields: { name: string; company: string; reply: string; message: string };
    placeholders: { name: string; company: string; reply: string; message: string };
    submit: string;
    selected: string;
    clearPlan: string;
    error: string;
    success: string;
    mail: MailLabels;
  };
  footer: { role: string };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
};

const et: Dict = {
  nav: {
    work: "Tehtud tööd",
    pricing: "Hinnakiri",
    how: "Kuidas töötab",
    contact: "Kontakt",
    cta: "Küsi pakkumist",
    menu: "Menüü",
    openMenu: "Ava menüü",
    language: "Keel",
  },
  hero: {
    badge: "Esimene kodulehe kavand kätte juba järgmisel tööpäeval — ilma ettemaksuta",
    title: "Kaasaegsed kodulehed väikeettevõtetele —",
    titleAccent: "näe valmis kavandit enne ostuotsust.",
    sub: "Aitan kohvikutel, salongidel ja teenusepakkujatel kiiresti internetis nähtavaks saada. Valmistan Sinu ettevõttele personaalse kodulehe kavandi ilma ettemaksuta.",
    ctaWork: "Vaata tehtud töid",
    ctaPricing: "Tutvu hindadega",
    chipTitle: "Kavand valmis",
    chipSub: "Järgmisel tööpäeval",
  },
  portfolio: {
    eyebrow: "Portfoolio",
    title: "Tehtud tööd & näidised",
    sub: "Iga leht on loodud konkreetse ettevõtte vajadusi silmas pidades.",
    view: "Vaata näidist",
    items: {
      rukkilill: {
        badge: "Kohvik & Restoran",
        title: "Rukkilill Kohvik & Resto Bar",
        description:
          "Hubane ja isuäratav koduleht Tallinna vanalinna perekohvikule koos mitmekeelse valiku, menüü ja laudade broneerimisvormiga.",
      },
      haljastusest: {
        badge: "Haljastus & Koduhooldus",
        title: "HaljastusEst OÜ",
        description:
          "Selge ja usaldusväärne teenusteportaal Pärnumaa ettevõttele — aiahooldusest siseviimistluse ja kinnisvarahalduseni.",
      },
      reveko: {
        badge: "Ehitus & Renoveerimine",
        title: "Reveko Invest OÜ",
        description:
          "Esinduslik ja konkreetne koduleht Lõuna-Eesti ehitusettevõttele koos teenuste ülevaate, tehtud tööde galerii ja hinnapäringu vormiga.",
      },
    },
  },
  how: {
    eyebrow: "Kuidas töötab",
    title: "Kuidas koostöö käib?",
    sub: "Kolm lihtsat sammu — ilma riskita.",
    steps: [
      {
        title: "Valmis kavand juba järgmisel tööpäeval",
        text: "Loon Sinu ettevõtte info põhjal esmase kodulehe kavandi, mida saad juba järgmisel tööpäeval oma telefonis ja arvutis proovida.",
      },
      {
        title: "Ülevaatus ja täiendused",
        text: "Vaatame lehe koos üle ning teeme kuni 2 muudatuste ringi tekstides ja piltides.",
      },
      {
        title: "Ametlik arve ja avalikustamine",
        text: "Maksad ametliku arve alusel alles siis, kui oled tulemusega rahul. Ei mingeid peidetud kulusid.",
      },
    ],
  },
  pricing: {
    eyebrow: "Hinnakiri",
    title: "Selge ja aus hinnakiri",
    sub: "Ühekordne tasu, ametlik arve. Maksad alles siis, kui oled rahul.",
    oneTime: "ühekordne",
    popular: "Populaarseim",
    plans: {
      lahtekood: {
        name: "Koduleht + Lähtekood",
        description: "Sobib ettevõttele, kes soovib lehe ise oma serverisse üles panna.",
        features: [
          "Personaalse disainiga koduleht",
          "Mobiilisõbralik vaade",
          "Hinna sees kuni 2 muudatuste ringi enne üleandmist",
          "Kontaktivorm ja kaardirakendus",
          "Täielik lähtekood (GitHub / ZIP)",
          "Ametlik arve ettevõttele",
        ],
        cta: "Vali see pakett",
      },
      "votmed-katte": {
        name: "Täislahendus \u201EVõtmed kätte\u201C",
        description: "Muretu täisteenus — mina hoolitsen kõige tehnilise eest.",
        features: [
          "Kõik, mis 250 € paketis",
          "Hinna sees kuni 2 muudatuste ringi enne avalikustamist",
          "Kodulehe ülespanek kiiretesse serveritesse",
          "Ühendamine Sinu .ee domeeniga",
          "Turvasertifikaat (HTTPS) hinna sees",
        ],
        cta: "Vali täislahendus",
      },
    },
    laterTitle: "Hilisemad muudatused ja haldus:",
    later: (a, b) =>
      `Kui soovid hiljem valmis lehel tekste, hindu või pilte uuendada, on muudatuste tasu alates ${a} € / kord (või ${b} €/h) vastavalt mahule.`,
  },
  contact: {
    eyebrow: "Võta ühendust",
    title: "Teeme Sinu ettevõttele uue kodulehe",
    text: "Võta julgelt ühendust, kui soovid tasuta esmast kavandit või küsida nõu. Teenuse eest saab tasuda ametliku arve alusel.",
    intro: "Tere! Olen Jaive. Aitan Eesti väikeettevõtetel saada kaasaegse ja kiire kodulehe ilma keerulise bürokraatia ja ettemaksuta.",
    role: "Veebidisain",
    emailLabel: "E-post",
    phoneLabel: "Telefon",
    countries: { ee: "Eesti", it: "Itaalia" },
    fields: {
      name: "Sinu nimi",
      company: "Ettevõtte nimi",
      reply: "E-post või telefon",
      message: "Sõnum / millist lehte soovid?",
    },
    placeholders: {
      name: "Mari Maasikas",
      company: "Kohvik OÜ",
      reply: "mari@ettevote.ee või +372 …",
      message: "Räägi lühidalt oma ettevõttest ja soovidest…",
    },
    submit: "Saada päring",
    selected: "Valitud pakett:",
    clearPlan: "Eemalda valitud pakett",
    error: "Palun täida nimi, kontakt ja sõnum.",
    success: "Avan Sinu e-posti rakenduse — vajuta seal \u201ESaada\u201C.",
    mail: { subject: "Kodulehe päring", name: "Nimi", company: "Ettevõte", contact: "Kontakt", plan: "Pakett" },
  },
  footer: { role: "Veebidisain" },
  faq: {
    eyebrow: "KKK",
    title: "Korduma kippuvad küsimused",
    items: [
      { q: "Mis saab siis, kui esmane kavand mulle ei meeldi?", a: "Sellisel juhul ei ole Sul mingeid kohustusi ega arveid. Maksad ainult siis, kui kavand meeldib ja otsustad sellega edasi minna." },
      { q: "Mida mul on vaja kavandi tellimiseks saata?", a: "Piisab Sinu ettevõtte nimest, lühikesest teenuste kirjeldusest ja olemasolevatest piltidest või sotsiaalmeedia lingist. Ülejäänud struktuuri ja tekstid panen ise paika." },
      { q: "Kui kiiresti koduleht täielikult valmis saab?", a: "Esmase kavandi saad juba järgmisel tööpäeval. Pärast muudatuste kinnitamist on koduleht avalik 1–2 tööpäeva jooksul." },
      { q: "Kas koduleht töötab hästi ka telefonis?", a: "Jah, kõik lehed on ehitatud nii, et need näevad suurepärased välja nii nutitelefonis, tahvlis kui ka arvutiekraanil." },
    ],
  },
};

const en: Dict = {
  nav: {
    work: "Work",
    pricing: "Pricing",
    how: "How it works",
    contact: "Contact",
    cta: "Get a quote",
    menu: "Menu",
    openMenu: "Open menu",
    language: "Language",
  },
  hero: {
    badge: "First website draft ready by the next business day — no upfront payment",
    title: "Modern websites for small businesses —",
    titleAccent: "see a finished draft before you decide.",
    sub: "I help cafés, salons and service providers get online quickly. I'll create a personalised website draft for your business with no upfront payment.",
    ctaWork: "See my work",
    ctaPricing: "View pricing",
    chipTitle: "Draft ready",
    chipSub: "By the next business day",
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "Work & demos",
    sub: "Every site is built around the needs of a specific business.",
    view: "View demo",
    items: {
      rukkilill: {
        badge: "Café & Restaurant",
        title: "Rukkilill Kohvik & Resto Bar",
        description:
          "A cosy, appetising website for a family café in Tallinn's Old Town, with language options, a menu and a table booking form.",
      },
      haljastusest: {
        badge: "Landscaping & Home Care",
        title: "HaljastusEst OÜ",
        description:
          "A clear, trustworthy services portal for a Pärnu County company — from garden care and interior finishing to property management.",
      },
      reveko: {
        badge: "Construction & Renovation",
        title: "Reveko Invest OÜ",
        description:
          "A strong, straightforward website for a South Estonian construction company, with a services overview, project gallery and quote request form.",
      },
    },
  },
  how: {
    eyebrow: "How it works",
    title: "How do we work together?",
    sub: "Three simple steps — no risk.",
    steps: [
      {
        title: "Draft ready by the next business day",
        text: "Based on your business details, I create a first website draft that you can try on your phone and computer by the next business day.",
      },
      {
        title: "Review and refinements",
        text: "We go through the site together and make up to 2 rounds of changes to the texts and images.",
      },
      {
        title: "Official invoice and launch",
        text: "You pay against an official invoice only once you're happy with the result. No hidden costs.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Clear and honest pricing",
    sub: "One-off fee, official invoice. You only pay once you're happy.",
    oneTime: "one-off",
    popular: "Most popular",
    plans: {
      lahtekood: {
        name: "Website + Source Code",
        description: "For businesses that want to host the site on their own server.",
        features: [
          "Custom-designed website",
          "Mobile-friendly layout",
          "Up to 2 rounds of changes included before handover",
          "Contact form and map",
          "Full source code (GitHub / ZIP)",
          "Official invoice for your business",
        ],
        cta: "Choose this package",
      },
      "votmed-katte": {
        name: "All-inclusive \u201CTurnkey\u201D",
        description: "Worry-free full service — I take care of everything technical.",
        features: [
          "Everything in the 250 € package",
          "Up to 2 rounds of changes included before launch",
          "Hosting on fast servers",
          "Connection to your .ee domain",
          "Security certificate (HTTPS) included",
        ],
        cta: "Choose all-inclusive",
      },
    },
    laterTitle: "Later changes and maintenance:",
    later: (a, b) =>
      `If you later want to update texts, prices or images on your site, changes start from ${a} € per update (or ${b} €/h) depending on the scope.`,
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Let's build a new website for your business",
    text: "Feel free to reach out if you'd like a free first draft or just some advice. Payment is made against an official invoice.",
    intro: "Hi! I'm Jaive. I help small Estonian businesses get a modern, fast website without complicated paperwork or upfront payment.",
    role: "Web design",
    emailLabel: "Email",
    phoneLabel: "Phone",
    countries: { ee: "Estonia", it: "Italy" },
    fields: {
      name: "Your name",
      company: "Company name",
      reply: "Email or phone",
      message: "Message / what kind of site do you need?",
    },
    placeholders: {
      name: "Jane Smith",
      company: "Café Ltd",
      reply: "jane@company.com or +372 …",
      message: "Tell me briefly about your business and what you need…",
    },
    submit: "Send request",
    selected: "Selected package:",
    clearPlan: "Remove selected package",
    error: "Please fill in your name, contact and message.",
    success: "Opening your email app — just press \u201CSend\u201D there.",
    mail: { subject: "Website enquiry", name: "Name", company: "Company", contact: "Contact", plan: "Package" },
  },
  footer: { role: "Web design" },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      { q: "What if I don't like the first draft?", a: "Then you have no obligations and no invoices. You only pay if you like the draft and decide to go ahead." },
      { q: "What do I need to send to order a draft?", a: "Your business name, a short description of your services and any existing photos or a social media link are enough. I'll take care of the structure and texts." },
      { q: "How quickly will the website be fully ready?", a: "You'll get the first draft by the next business day. Once the changes are approved, the site goes live within 1–2 business days." },
      { q: "Does the website work well on phones too?", a: "Yes, every site is built to look great on smartphones, tablets and desktop screens alike." },
    ],
  },
};

const ru: Dict = {
  nav: {
    work: "Работы",
    pricing: "Цены",
    how: "Как это работает",
    contact: "Контакты",
    cta: "Запросить цену",
    menu: "Меню",
    openMenu: "Открыть меню",
    language: "Язык",
  },
  hero: {
    badge: "Первая версия сайта уже на следующий рабочий день — без предоплаты",
    title: "Современные сайты для малого бизнеса —",
    titleAccent: "увидите готовый макет до принятия решения.",
    sub: "Помогаю кафе, салонам и сервисным компаниям быстро появиться в интернете. Подготовлю персональный макет сайта для вашего бизнеса без предоплаты.",
    ctaWork: "Смотреть работы",
    ctaPricing: "Узнать цены",
    chipTitle: "Макет готов",
    chipSub: "На следующий рабочий день",
  },
  portfolio: {
    eyebrow: "Портфолио",
    title: "Работы и примеры",
    sub: "Каждый сайт создаётся с учётом потребностей конкретного бизнеса.",
    view: "Смотреть пример",
    items: {
      rukkilill: {
        badge: "Кафе и ресторан",
        title: "Rukkilill Kohvik & Resto Bar",
        description:
          "Уютный и аппетитный сайт семейного кафе в Старом Таллинне — с выбором языка, меню и формой бронирования столиков.",
      },
      haljastusest: {
        badge: "Озеленение и уход за домом",
        title: "HaljastusEst OÜ",
        description:
          "Понятный и надёжный портал услуг для компании из Пярнумаа — от ухода за садом и внутренней отделки до управления недвижимостью.",
      },
      reveko: {
        badge: "Строительство и ремонт",
        title: "Reveko Invest OÜ",
        description:
          "Представительный и чёткий сайт строительной компании из Южной Эстонии — с обзором услуг, галереей работ и формой запроса цены.",
      },
    },
  },
  how: {
    eyebrow: "Как это работает",
    title: "Как проходит сотрудничество?",
    sub: "Три простых шага — без риска.",
    steps: [
      {
        title: "Готовый макет уже на следующий рабочий день",
        text: "На основе информации о вашей компании я создаю первый макет сайта, который уже на следующий рабочий день можно открыть на телефоне и компьютере.",
      },
      {
        title: "Обсуждение и доработки",
        text: "Вместе просматриваем сайт и вносим до 2 раундов правок в тексты и изображения.",
      },
      {
        title: "Официальный счёт и запуск",
        text: "Вы оплачиваете по официальному счёту только тогда, когда довольны результатом. Никаких скрытых расходов.",
      },
    ],
  },
  pricing: {
    eyebrow: "Цены",
    title: "Понятные и честные цены",
    sub: "Единоразовая оплата, официальный счёт. Платите, только когда довольны.",
    oneTime: "единоразово",
    popular: "Популярный",
    plans: {
      lahtekood: {
        name: "Сайт + исходный код",
        description: "Подходит компаниям, которые хотят разместить сайт на своём сервере.",
        features: [
          "Сайт с индивидуальным дизайном",
          "Удобная мобильная версия",
          "До 2 раундов правок перед передачей включены в цену",
          "Контактная форма и карта",
          "Полный исходный код (GitHub / ZIP)",
          "Официальный счёт для компании",
        ],
        cta: "Выбрать этот пакет",
      },
      "votmed-katte": {
        name: "Комплексное решение «Под ключ»",
        description: "Полный сервис без забот — всю техническую часть беру на себя.",
        features: [
          "Всё, что входит в пакет за 250 €",
          "До 2 раундов правок перед запуском включены в цену",
          "Размещение на быстрых серверах",
          "Подключение к вашему домену .ee",
          "Сертификат безопасности (HTTPS) включён",
        ],
        cta: "Выбрать «Под ключ»",
      },
    },
    laterTitle: "Последующие изменения и поддержка:",
    later: (a, b) =>
      `Если позже вы захотите обновить тексты, цены или изображения на сайте, стоимость изменений — от ${a} € за раз (или ${b} €/ч) в зависимости от объёма.`,
  },
  contact: {
    eyebrow: "Связаться",
    title: "Создадим новый сайт для вашей компании",
    text: "Смело пишите, если хотите бесплатный первый макет или просто совет. Оплата производится по официальному счёту.",
    intro: "Привет! Я Жаиве. Помогаю малому бизнесу в Эстонии получить современный и быстрый сайт — без лишней бюрократии и предоплаты.",
    role: "Веб-дизайн",
    emailLabel: "Эл. почта",
    phoneLabel: "Телефон",
    countries: { ee: "Эстония", it: "Италия" },
    fields: {
      name: "Ваше имя",
      company: "Название компании",
      reply: "Эл. почта или телефон",
      message: "Сообщение / какой сайт вам нужен?",
    },
    placeholders: {
      name: "Анна Иванова",
      company: "Кафе OÜ",
      reply: "anna@firma.ee или +372 …",
      message: "Коротко расскажите о компании и ваших пожеланиях…",
    },
    submit: "Отправить запрос",
    selected: "Выбранный пакет:",
    clearPlan: "Убрать выбранный пакет",
    error: "Пожалуйста, укажите имя, контакт и сообщение.",
    success: "Открываю ваш почтовый клиент — нажмите там «Отправить».",
    mail: { subject: "Запрос на сайт", name: "Имя", company: "Компания", contact: "Контакт", plan: "Пакет" },
  },
  footer: { role: "Веб-дизайн" },
  faq: {
    eyebrow: "FAQ",
    title: "Часто задаваемые вопросы",
    items: [
      { q: "Что, если первый макет мне не понравится?", a: "В таком случае у вас нет никаких обязательств и счетов. Вы платите, только если макет понравился и вы решили продолжить." },
      { q: "Что нужно прислать, чтобы заказать макет?", a: "Достаточно названия компании, краткого описания услуг и имеющихся фото или ссылки на соцсети. Структуру и тексты я подготовлю сам." },
      { q: "Как быстро сайт будет полностью готов?", a: "Первый макет вы получите уже на следующий рабочий день. После утверждения правок сайт будет опубликован в течение 1–2 рабочих дней." },
      { q: "Хорошо ли сайт работает на телефоне?", a: "Да, все сайты создаются так, чтобы отлично выглядеть на смартфоне, планшете и компьютере." },
    ],
  },
};

const it: Dict = {
  nav: {
    work: "Lavori",
    pricing: "Prezzi",
    how: "Come funziona",
    contact: "Contatti",
    cta: "Richiedi un preventivo",
    menu: "Menu",
    openMenu: "Apri il menu",
    language: "Lingua",
  },
  hero: {
    badge: "Prima bozza del sito pronta entro il giorno lavorativo successivo — senza anticipo",
    title: "Siti web moderni per piccole imprese —",
    titleAccent: "vedi la bozza pronta prima di decidere.",
    sub: "Aiuto bar, saloni e fornitori di servizi a farsi trovare online in poco tempo. Preparo una bozza personalizzata del sito per la tua attività, senza alcun anticipo.",
    ctaWork: "Guarda i lavori",
    ctaPricing: "Scopri i prezzi",
    chipTitle: "Bozza pronta",
    chipSub: "Il giorno lavorativo successivo",
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "Lavori ed esempi",
    sub: "Ogni sito nasce dalle esigenze concrete di un'attività.",
    view: "Vedi la demo",
    items: {
      rukkilill: {
        badge: "Bar e ristorante",
        title: "Rukkilill Kohvik & Resto Bar",
        description:
          "Un sito accogliente e invitante per un bar-ristorante di famiglia nel centro storico di Tallinn, con scelta della lingua, menù e modulo di prenotazione dei tavoli.",
      },
      haljastusest: {
        badge: "Giardinaggio e cura della casa",
        title: "HaljastusEst OÜ",
        description:
          "Un portale di servizi chiaro e affidabile per un'azienda della contea di Pärnu: dalla cura del giardino alle finiture d'interni, fino alla gestione immobiliare.",
      },
      reveko: {
        badge: "Edilizia e ristrutturazioni",
        title: "Reveko Invest OÜ",
        description:
          "Un sito autorevole e concreto per un'impresa edile dell'Estonia meridionale, con panoramica dei servizi, galleria dei lavori e modulo per richiedere un preventivo.",
      },
    },
  },
  how: {
    eyebrow: "Come funziona",
    title: "Come lavoriamo insieme?",
    sub: "Tre semplici passi, senza rischi.",
    steps: [
      {
        title: "Bozza pronta entro il giorno lavorativo successivo",
        text: "Partendo dalle informazioni sulla tua attività, creo una prima bozza del sito che puoi provare su telefono e computer già il giorno lavorativo successivo.",
      },
      {
        title: "Revisione e ritocchi",
        text: "Esaminiamo insieme il sito e apportiamo fino a 2 giri di modifiche a testi e immagini.",
      },
      {
        title: "Fattura ufficiale e pubblicazione",
        text: "Paghi con fattura ufficiale solo quando sei soddisfatto del risultato. Nessun costo nascosto.",
      },
    ],
  },
  pricing: {
    eyebrow: "Prezzi",
    title: "Prezzi chiari e onesti",
    sub: "Pagamento unico con fattura ufficiale. Paghi solo quando sei soddisfatto.",
    oneTime: "una tantum",
    popular: "Il più scelto",
    plans: {
      lahtekood: {
        name: "Sito web + Codice sorgente",
        description: "Ideale per chi vuole pubblicare il sito sul proprio server.",
        features: [
          "Sito con design personalizzato",
          "Versione ottimizzata per smartphone",
          "Fino a 2 giri di modifiche inclusi prima della consegna",
          "Modulo di contatto e mappa",
          "Codice sorgente completo (GitHub / ZIP)",
          "Fattura ufficiale per l'azienda",
        ],
        cta: "Scegli questo pacchetto",
      },
      "votmed-katte": {
        name: "Soluzione completa \u201CChiavi in mano\u201D",
        description: "Servizio completo e senza pensieri: mi occupo io di tutta la parte tecnica.",
        features: [
          "Tutto ciò che è incluso nel pacchetto da 250 €",
          "Fino a 2 giri di modifiche inclusi prima della pubblicazione",
          "Pubblicazione su server veloci",
          "Collegamento al tuo dominio .ee",
          "Certificato di sicurezza (HTTPS) incluso",
        ],
        cta: "Scegli chiavi in mano",
      },
    },
    laterTitle: "Modifiche successive e manutenzione:",
    later: (a, b) =>
      `Se in seguito vuoi aggiornare testi, prezzi o immagini del sito, le modifiche partono da ${a} € a intervento (oppure ${b} €/h) in base all'entità del lavoro.`,
  },
  contact: {
    eyebrow: "Contattami",
    title: "Creiamo il nuovo sito della tua attività",
    text: "Scrivimi senza impegno se vuoi una prima bozza gratuita o un consiglio. Il pagamento avviene con fattura ufficiale.",
    intro: "Ciao! Sono Jaive. Aiuto le piccole imprese estoni ad avere un sito moderno e veloce, senza burocrazia complicata e senza anticipi.",
    role: "Web design",
    emailLabel: "Email",
    phoneLabel: "Telefono",
    countries: { ee: "Estonia", it: "Italia" },
    fields: {
      name: "Il tuo nome",
      company: "Nome dell'azienda",
      reply: "Email o telefono",
      message: "Messaggio / che tipo di sito desideri?",
    },
    placeholders: {
      name: "Giulia Rossi",
      company: "Bar Centrale",
      reply: "giulia@azienda.it o +39 …",
      message: "Raccontami in breve la tua attività e cosa ti serve…",
    },
    submit: "Invia richiesta",
    selected: "Pacchetto scelto:",
    clearPlan: "Rimuovi il pacchetto scelto",
    error: "Compila nome, contatto e messaggio.",
    success: "Apro la tua app di posta: premi \u201CInvia\u201D per completare.",
    mail: { subject: "Richiesta sito web", name: "Nome", company: "Azienda", contact: "Contatto", plan: "Pacchetto" },
  },
  footer: { role: "Web design" },
  faq: {
    eyebrow: "FAQ",
    title: "Domande frequenti",
    items: [
      { q: "E se la prima bozza non mi piace?", a: "In quel caso non hai alcun obbligo né fatture. Paghi solo se la bozza ti piace e decidi di proseguire." },
      { q: "Cosa devo inviare per ordinare una bozza?", a: "Bastano il nome della tua attività, una breve descrizione dei servizi e le foto che hai già o un link ai social. Al resto, struttura e testi, penso io." },
      { q: "In quanto tempo il sito sarà completamente pronto?", a: "Ricevi la prima bozza già il giorno lavorativo successivo. Dopo l'approvazione delle modifiche, il sito è online entro 1–2 giorni lavorativi." },
      { q: "Il sito funziona bene anche su smartphone?", a: "Sì, ogni sito è progettato per apparire al meglio su smartphone, tablet e computer." },
    ],
  },
};

export const DICTIONARIES: Record<Lang, Dict> = { et, en, ru, it };

const STORAGE_KEY = "jg-lang";

type I18nValue = { lang: Lang; setLang: (lang: Lang) => void; t: Dict };

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Read the saved choice after hydration so server and first client render match.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as readonly string[]).includes(saved)) setLangState(saved as Lang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(next: Lang) {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t: DICTIONARIES[lang] }}>{children}</I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  // Fall back to Estonian instead of crashing the page if a component renders outside the provider.
  return ctx ?? { lang: DEFAULT_LANG, setLang: () => {}, t: DICTIONARIES[DEFAULT_LANG] };
}
