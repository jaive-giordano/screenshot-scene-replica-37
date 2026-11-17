import { useState, type FormEvent } from "react";
import { Loader2, Mail, Phone, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/site/Logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { CONTACT, type PlanId } from "@/lib/site-data";

const WEB3FORMS_ACCESS_KEY = "75ca4eb0-cd86-477e-8366-8f7bc9909481";

type SendStatus = "idle" | "sending" | "success" | "error";

export function Contact({
  selectedPlan,
  onClearPlan,
}: {
  selectedPlan: PlanId | null;
  onClearPlan: () => void;
}) {
  const { t } = useI18n();
  const c = t.contact;
  const [form, setForm] = useState({ name: "", company: "", reply: "", message: "" });
  const [status, setStatus] = useState<SendStatus>("idle");
  const planName = selectedPlan ? t.pricing.plans[selectedPlan].name : null;

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (!form.name.trim() || !form.reply.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const payload = new FormData();
      payload.set("access_key", WEB3FORMS_ACCESS_KEY);
      payload.set("subject", "Uus kodulehe päring — " + (form.company.trim() || form.name.trim()));
      payload.set("from_name", "Jaive Giordano koduleht");
      payload.set("name", form.name.trim());
      payload.set("company", form.company.trim());
      payload.set("contact", form.reply.trim());
      payload.set("message", form.message.trim());
      if (planName) payload.set("plan", planName);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setForm({ name: "", company: "", reply: "", message: "" });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const contactRow =
    "grid size-11 place-items-center rounded-[2px] bg-background text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground";

  return (
    <section id="kontakt" className="bg-surface py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="mt-5 text-4xl sm:text-6xl">{c.title}</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">{c.text}</p>

          <div className="mt-10 rounded-[2px] border border-border bg-card p-7">
            <LogoMark className="h-32" />
            <div className="text-sm text-muted-foreground">{c.role}</div>
            <p className="mt-4 border-l-2 border-amber pl-4 leading-relaxed text-foreground/85">{c.intro}</p>
            <ul className="mt-6 space-y-4">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-4">
                  <span className={contactRow}>
                    <Mail className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium text-muted-foreground">{c.emailLabel}</span>
                    <span className="font-semibold group-hover:text-primary">{CONTACT.email}</span>
                  </span>
                </a>
              </li>
              {CONTACT.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="group flex items-center gap-4">
                    <span className={contactRow}>
                      <Phone className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-muted-foreground">
                        {c.phoneLabel} ({c.countries[p.country]})
                      </span>
                      <span className="font-semibold group-hover:text-primary">{p.display}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="h-fit space-y-5 rounded-[2px] border border-border bg-background p-7 sm:p-9"
        >
          {planName && (
            <div className="flex items-center justify-between gap-3 rounded-[2px] bg-primary-soft px-4 py-3 text-sm">
              <span>
                {c.selected} <span className="font-semibold text-accent-foreground">{planName}</span>
              </span>
              <button
                type="button"
                onClick={onClearPlan}
                aria-label={c.clearPlan}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{c.fields.name}</Label>
              <Input
                id="name"
                value={form.name}
                placeholder={c.placeholders.name}
                onChange={(e) => update("name", e.target.value)}
                className="h-12 rounded-[2px] bg-surface"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">{c.fields.company}</Label>
              <Input
                id="company"
                value={form.company}
                placeholder={c.placeholders.company}
                onChange={(e) => update("company", e.target.value)}
                className="h-12 rounded-[2px] bg-surface"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reply">{c.fields.reply}</Label>
            <Input
              id="reply"
              value={form.reply}
              placeholder={c.placeholders.reply}
              onChange={(e) => update("reply", e.target.value)}
              className="h-12 rounded-[2px] bg-surface"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{c.fields.message}</Label>
            <Textarea
              id="message"
              rows={5}
              value={form.message}
              placeholder={c.placeholders.message}
              onChange={(e) => update("message", e.target.value)}
              className="rounded-[2px] bg-surface"
              required
            />
          </div>
          <Button
            type="submit"
            variant="hero"
            size="xl"
            className="w-full rounded-[2px]"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                {c.sending} <Loader2 className="animate-spin" />
              </>
            ) : (
              <>
                {c.submit} <Send />
              </>
            )}
          </Button>
          {status === "success" && (
            <p role="status" className="rounded-[2px] border border-champagne/50 bg-ink px-4 py-3 text-sm leading-relaxed text-ink-foreground">
              {c.success}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="rounded-[2px] border border-foreground/25 bg-surface-deep px-4 py-3 text-sm leading-relaxed text-foreground">
              {c.error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
