import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { useLang } from "@/lib/i18n";

export const Header = () => {
  const { lang, setLang, t } = useLang();

  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.directions, href: "#directions" },
    { label: t.nav.markets, href: "#markets" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full">
      <header className="flex items-center justify-between container">
        <a href="/">
          <Logo className="w-[100px] md:w-[120px]" />
        </a>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
          {navItems.map((item) => (
            <a
              className="uppercase inline-block font-mono text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-x-4 max-lg:hidden">
          <button
            onClick={() => setLang(lang === "ru" ? "en" : "ru")}
            className="uppercase font-mono text-sm text-foreground/40 hover:text-foreground/80 transition-colors ease-out duration-150 border border-foreground/20 hover:border-foreground/50 rounded px-2 py-0.5"
          >
            {lang === "ru" ? "EN" : "RU"}
          </button>
          <a
            className="uppercase transition-colors ease-out duration-150 font-mono text-primary hover:text-primary/80"
            href="#contact"
          >
            {t.nav.cta}
          </a>
        </div>
        <MobileMenu />
      </header>
    </div>
  );
};
