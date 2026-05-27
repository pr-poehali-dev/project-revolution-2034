import { useLang } from "@/lib/i18n";
import { Pill } from "./Pill";

const REGIONS = [
  { id: "cis",    labelRu: "СНГ",           labelEn: "CIS",          cx: 58, cy: 32 },
  { id: "europe", labelRu: "Европа",         labelEn: "Europe",       cx: 49, cy: 28 },
  { id: "asia",   labelRu: "Азия",           labelEn: "Asia",         cx: 72, cy: 36 },
  { id: "me",     labelRu: "Ближний Восток", labelEn: "Middle East",  cx: 59, cy: 44 },
  { id: "africa", labelRu: "Африка",         labelEn: "Africa",       cx: 50, cy: 56 },
];

const MAP_URL = "https://cdn.poehali.dev/projects/17ebc9d7-b892-431e-a0b0-87f4e8af47af/bucket/45c723e6-57c7-448c-bcd0-09d3a9ccac9c.png";

export function WorldMap() {
  const { lang } = useLang();
  const { t } = useLang();
  const { about } = t;

  return (
    <section id="markets" className="py-24 md:py-36 relative z-10 bg-background overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Pill className="mb-6">{about.markets.title.toUpperCase()}</Pill>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sentient mt-6 max-w-3xl mx-auto">
            {lang === "ru" ? "Мы работаем по всему миру" : "We operate worldwide"}
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <img
            src={MAP_URL}
            alt="World map"
            className="w-full opacity-20 select-none pointer-events-none"
          />

          <div className="absolute inset-0">
            {REGIONS.map((r) => (
              <div
                key={r.id}
                className="absolute group"
                style={{ left: `${r.cx}%`, top: `${r.cy}%`, transform: "translate(-50%, -50%)" }}
              >
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap font-mono text-xs uppercase tracking-widest bg-background border border-primary/40 text-primary px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {lang === "ru" ? r.labelRu : r.labelEn}
                </span>
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-primary opacity-30 animate-ping" style={{ animationDuration: "2s" }} />
                  <span className="relative block w-3 h-3 rounded-full bg-primary cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-12">
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

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
