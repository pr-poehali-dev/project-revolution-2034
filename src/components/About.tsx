import { useLang } from "@/lib/i18n";
import { Pill } from "./Pill";
import Icon from "@/components/ui/icon";

export function About() {
  const { t } = useLang();
  const { about } = t;

  return (
    <section id="about" className="py-24 md:py-36 relative z-10 bg-background">
      {/* world map background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "url('https://cdn.poehali.dev/projects/17ebc9d7-b892-431e-a0b0-87f4e8af47af/bucket/45c723e6-57c7-448c-bcd0-09d3a9ccac9c.png')" }}
      />
      {/* subtle top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <Pill className="mb-6">{about.pill}</Pill>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sentient mt-6 max-w-3xl mx-auto">
            {about.title}
          </h2>
          <p className="font-mono text-sm sm:text-base text-foreground/60 mt-6 max-w-2xl mx-auto text-balance">
            {about.subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 md:gap-24 mb-20 md:mb-28">
          {about.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-sentient text-primary">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-foreground/40 uppercase mt-2 tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="mb-20 md:mb-28">
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-8 text-center">
            {about.services.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {about.services.items.map((item) => (
              <div
                key={item.name}
                className="bg-background p-8 md:p-10 group hover:bg-white/[0.03] transition-colors duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="mt-0.5 text-primary shrink-0">
                    <Icon name={item.icon as Parameters<typeof Icon>[0]["name"]} size={22} fallback="Package" />
                  </div>
                  <div>
                    <div className="font-sentient text-lg md:text-xl mb-2">
                      {item.name}
                    </div>
                    <p className="font-mono text-sm text-foreground/50 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Markets */}
        <div className="text-center">
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-8">
            {about.markets.title}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {about.markets.items.map((market) => (
              <span
                key={market}
                className="font-mono text-sm uppercase px-5 py-2 border border-border text-foreground/60 hover:text-foreground hover:border-primary/50 transition-colors duration-200"
              >
                {market}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* subtle bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}