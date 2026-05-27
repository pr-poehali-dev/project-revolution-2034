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
      title1: "Реал Групп —",
      title2: "глобальная",
      title3: "торговля",
      subtitle:
        "Выстраиваем надёжные торговые связи между странами — быстро, прозрачно и на выгодных условиях",
      button: "Начать сотрудничество",
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
      title1: "Real Group —",
      title2: "global",
      title3: "trade",
      subtitle:
        "Building reliable trade connections between countries — fast, transparent, and on favorable terms",
      button: "Start Cooperation",
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
