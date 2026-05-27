import { useLang } from "@/lib/i18n";
import { Logo } from "./Logo";
import Icon from "@/components/ui/icon";

export function Footer() {
  const { t } = useLang();
  const { footer } = t;

  return (
    <footer className="border-t border-border py-16 md:py-20 relative z-10 bg-background overflow-hidden">
      {/* world map background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[0.3] pointer-events-none"
        style={{ backgroundImage: "url('https://cdn.poehali.dev/projects/17ebc9d7-b892-431e-a0b0-87f4e8af47af/bucket/01c345e7-57b6-4a94-a96b-f3cb12f4f193.png')" }}
      />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/">
              <Logo className="w-[100px] mb-5" />
            </a>
            <p className="font-mono text-sm text-foreground/50 leading-relaxed max-w-xs">
              {footer.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-foreground/30 mb-5">
              {footer.nav}
            </div>
            <ul className="space-y-3">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-foreground/30 mb-5">
              {footer.contactsTitle}
            </div>
            <a
              href={`mailto:${footer.email}`}
              className="inline-flex items-center gap-2 font-mono text-sm text-foreground/60 hover:text-primary transition-colors duration-150"
            >
              <Icon name="Mail" size={14} />
              {footer.email}
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-foreground/30">{footer.copy}</p>
          <div className="flex items-center gap-1 font-mono text-xs text-foreground/20">
            <Icon name="Globe" size={12} />
            <span>realgroup.pw</span>
          </div>
        </div>
      </div>
    </footer>
  );
}