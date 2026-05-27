import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",       label: "Главная" },
  { id: "about",      label: "О компании" },
  { id: "directions", label: "Направления" },
  { id: "markets",    label: "Рынки" },
  { id: "contact",    label: "Контакты" },
];

export function SectionIndicator() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3 items-center">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          title={label}
          className="group flex items-center gap-2 justify-end"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {label}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === id
                ? "w-3 h-3 bg-primary"
                : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/50"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
