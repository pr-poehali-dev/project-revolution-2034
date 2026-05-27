import { useLang } from "@/lib/i18n";
import { Pill } from "./Pill";
import Icon from "@/components/ui/icon";

const MAP_URL = "https://cdn.poehali.dev/projects/17ebc9d7-b892-431e-a0b0-87f4e8af47af/bucket/01c345e7-57b6-4a94-a96b-f3cb12f4f193.png";

const ACCENT_COLORS = [
  "group-hover:text-primary",
  "group-hover:text-primary",
  "group-hover:text-primary",
  "group-hover:text-primary",
];

export function Directions() {
  const { t } = useLang();
  const { about } = t;

  return (
    <section id="directions" className="py-24 md:py-36 relative z-10 bg-background overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[0.3] pointer-events-none"
        style={{ backgroundImage: `url('${MAP_URL}')` }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <Pill className="mb-6">{about.services.title.toUpperCase()}</Pill>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sentient mt-6 max-w-3xl mx-auto">
            {t.nav.directions}
          </h2>
          <p className="font-mono text-sm sm:text-base text-foreground/60 mt-6 max-w-2xl mx-auto text-balance">
            {about.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {about.services.items.map((item, i) => (
            <div
              key={item.name}
              className="group relative bg-background border border-border p-8 md:p-10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500" />
              <div className={`text-foreground/40 mb-5 transition-colors duration-300 ${ACCENT_COLORS[i]}`}>
                <Icon name={item.icon as Parameters<typeof Icon>[0]["name"]} size={32} fallback="Package" />
              </div>
              <div className="font-sentient text-xl md:text-2xl mb-3">{item.name}</div>
              <p className="font-mono text-sm text-foreground/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}