import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Pill } from "./Pill";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import func2url from "../../backend/func2url.json";

export function Contact() {
  const { t } = useLang();
  const { contact } = t;
  const f = contact.form;

  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(func2url.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", company: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Pill className="mb-6">{contact.pill}</Pill>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sentient mt-6">
            {contact.title}
          </h2>
          <p className="font-mono text-sm sm:text-base text-foreground/60 mt-6 max-w-xl mx-auto">
            {contact.subtitle}
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {status === "success" ? (
            <div className="border border-primary/30 bg-primary/5 p-10 text-center">
              <div className="text-primary text-4xl mb-4">✓</div>
              <div className="font-sentient text-2xl mb-2">{f.successTitle}</div>
              <p className="font-mono text-sm text-foreground/60">{f.successText}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                    {f.name} *
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="bg-transparent border-border/60 focus-visible:border-primary rounded-none font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                    {f.company}
                  </label>
                  <Input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="bg-transparent border-border/60 focus-visible:border-primary rounded-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                  {f.email} *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-border/60 focus-visible:border-primary rounded-none font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                  {f.message} *
                </label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={f.messagePlaceholder}
                  className="bg-transparent border-border/60 focus-visible:border-primary rounded-none font-mono placeholder:text-foreground/25 resize-none"
                />
              </div>

              {status === "error" && (
                <p className="font-mono text-sm text-destructive">{f.errorText}</p>
              )}

              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full mt-2"
              >
                [{status === "sending" ? f.sending : f.submit}]
              </Button>
            </form>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
