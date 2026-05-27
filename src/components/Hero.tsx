import { Globe } from "./Globe";
import { Pill } from "./Pill";
import { Button } from "./ui/button";
import { useState } from "react";
import { Header } from "./Header";
import { useLang } from "@/lib/i18n";

export function Hero() {
  const [hovering, setHovering] = useState(false);
  const { t } = useLang();

  return (
    <div id="hero" className="flex flex-col h-svh justify-between relative z-10">
      <Globe />
      <Header />

      <div className="pb-16 mt-auto text-center relative">
        <Pill className="mb-6">{t.hero.pill}</Pill>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
          {t.hero.title1} <br />
          {t.hero.title2} {t.hero.title3}
        </h1>
        <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto">
          {t.hero.subtitle}
        </p>

        <a className="contents max-sm:hidden" href="#contact">
          <Button
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [{t.hero.button}]
          </Button>
        </a>
        <a className="contents sm:hidden" href="#contact">
          <Button
            size="sm"
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [{t.hero.button}]
          </Button>
        </a>
      </div>
    </div>
  );
}