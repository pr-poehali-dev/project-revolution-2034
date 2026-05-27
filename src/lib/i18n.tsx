import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "ru" | "en";

const translations = {
  ru: {
    nav: {
      about: "О компании",
      directions: "Направления",
      markets: "Рынки",
      contact: "Контакты",
      cta: "Связаться",
    },
    hero: {
      pill: "МЕЖДУНАРОДНАЯ ТОРГОВЛЯ",
      title1: "Реал Групп",
      title2: "глобальная",
      title3: "торговля",
      subtitle:
        "Выстраиваем надёжные торговые связи между странами — быстро, прозрачно и на выгодных условиях",
      button: "Начать сотрудничество",
    },
    about: {
      pill: "О КОМПАНИИ",
      title: "Ваш партнёр в международной торговле",
      subtitle:
        "Реал Групп — международная торговая компания, которая помогает бизнесу выходить на глобальные рынки и выстраивать надёжные торговые цепочки по всему миру.",
      services: {
        title: "Направления",
        items: [
          {
            icon: "Package",
            name: "Экспорт и импорт",
            desc: "Организуем поставки товаров между странами — от поиска контрагентов до финального расчёта",
          },
          {
            icon: "Handshake",
            name: "Торговое посредничество",
            desc: "Соединяем покупателей и продавцов по всему миру, обеспечивая выгодные условия сделки",
          },
          {
            icon: "Truck",
            name: "Логистика и доставка",
            desc: "Полный цикл перевозки: мультимодальные маршруты, таможенное оформление, страхование грузов",
          },
          {
            icon: "FileText",
            name: "Консалтинг ВЭД",
            desc: "Помогаем с документами, таможней и регуляторными требованиями при выходе на зарубежные рынки",
          },
        ],
      },
      markets: {
        title: "Рынки присутствия",
        items: ["СНГ", "Европа", "Азия", "Ближний Восток", "Африка"],
      },
      stats: [
        { value: "5", label: "регионов" },
        { value: "4", label: "направления" },
        { value: "24/7", label: "поддержка" },
      ],
    },
    contact: {
      pill: "КОНТАКТЫ",
      title: "Начнём сотрудничество",
      subtitle: "Оставьте заявку — мы свяжемся с вами в течение одного рабочего дня",
      form: {
        name: "Ваше имя",
        company: "Компания",
        email: "Email",
        message: "Сообщение",
        messagePlaceholder: "Расскажите о вашем запросе — товар, направление, объёмы...",
        submit: "Отправить заявку",
        sending: "Отправляем...",
        successTitle: "Заявка отправлена!",
        successText: "Мы получили ваше сообщение и свяжемся с вами в ближайшее время.",
        errorText: "Не удалось отправить. Попробуйте ещё раз.",
      },
    },
    footer: {
      description: "Международная торговая компания. Выстраиваем надёжные связи между рынками по всему миру.",
      nav: "Навигация",
      links: [
        { label: "О компании", href: "#about" },
        { label: "Направления", href: "#directions" },
        { label: "Рынки", href: "#markets" },
        { label: "Контакты", href: "#contact" },
      ],
      contactsTitle: "Контакты",
      email: "real.group2020@mail.ru",
      copy: "© 2024 Реал Групп. Все права защищены.",
    },
  },
  en: {
    nav: {
      about: "About",
      directions: "Services",
      markets: "Markets",
      contact: "Contacts",
      cta: "Get in Touch",
    },
    hero: {
      pill: "INTERNATIONAL TRADE",
      title1: "Real Group",
      title2: "global",
      title3: "trade",
      subtitle:
        "Building reliable trade connections between countries — fast, transparent, and on favorable terms",
      button: "Start Cooperation",
    },
    about: {
      pill: "ABOUT US",
      title: "Your partner in international trade",
      subtitle:
        "Real Group is an international trading company that helps businesses access global markets and build reliable supply chains worldwide.",
      services: {
        title: "Services",
        items: [
          {
            icon: "Package",
            name: "Export & Import",
            desc: "We organize cross-border goods delivery — from finding counterparties to final settlement",
          },
          {
            icon: "Handshake",
            name: "Trade Mediation",
            desc: "Connecting buyers and sellers worldwide, ensuring favorable deal terms for both parties",
          },
          {
            icon: "Truck",
            name: "Logistics & Delivery",
            desc: "Full-cycle transportation: multimodal routes, customs clearance, and cargo insurance",
          },
          {
            icon: "FileText",
            name: "Foreign Trade Consulting",
            desc: "We assist with documents, customs, and regulatory requirements for entering foreign markets",
          },
        ],
      },
      markets: {
        title: "Markets",
        items: ["CIS", "Europe", "Asia", "Middle East", "Africa"],
      },
      stats: [
        { value: "5", label: "regions" },
        { value: "4", label: "services" },
        { value: "24/7", label: "support" },
      ],
    },
    contact: {
      pill: "CONTACTS",
      title: "Let's start working together",
      subtitle: "Leave a request — we'll get back to you within one business day",
      form: {
        name: "Your name",
        company: "Company",
        email: "Email",
        message: "Message",
        messagePlaceholder: "Tell us about your request — product, direction, volumes...",
        submit: "Send Request",
        sending: "Sending...",
        successTitle: "Request sent!",
        successText: "We've received your message and will be in touch shortly.",
        errorText: "Failed to send. Please try again.",
      },
    },
    footer: {
      description: "International trading company. Building reliable connections between markets around the world.",
      nav: "Navigation",
      links: [
        { label: "About", href: "#about" },
        { label: "Services", href: "#directions" },
        { label: "Markets", href: "#markets" },
        { label: "Contacts", href: "#contact" },
      ],
      contactsTitle: "Contacts",
      email: "real.group2020@mail.ru",
      copy: "© 2024 Real Group. All rights reserved.",
    },
  },
};

type Translations = typeof translations.ru;

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");
  const t = translations[lang];
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}