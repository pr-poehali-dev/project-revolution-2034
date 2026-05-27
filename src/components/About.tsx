import { useLang } from "@/lib/i18n";
import { Pill } from "./Pill";
import { StatNumber } from "./StatNumber";

const MAP_URL = "https://cdn.poehali.dev/projects/17ebc9d7-b892-431e-a0b0-87f4e8af47af/bucket/45c723e6-57c7-448c-bcd0-09d3a9ccac9c.png";

export function About() {
  const { t } = useLang();
  const { about } = t;

  return (
    <section id="about" className="py-24 md:py-36 relative z-10 bg-background">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[0.3] pointer-events-none"
        style={{ backgroundImage: `url('${MAP_URL}')` }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-24">
          <Pill className="mb-6">{about.pill}</Pill>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sentient mt-6 max-w-3xl mx-auto">
            {about.title}
          </h2>
          <p className="font-mono text-sm sm:text-base text-foreground/60 mt-6 max-w-2xl mx-auto text-balance">
            {about.subtitle}
          </p>
        </div>

        <div className="flex justify-center gap-12 md:gap-24 mb-20 md:mb-28">
          {about.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <StatNumber
                value={stat.value}
                className="text-4xl md:text-5xl font-sentient text-primary"
              />
              <div className="font-mono text-xs text-foreground/40 uppercase mt-2 tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
