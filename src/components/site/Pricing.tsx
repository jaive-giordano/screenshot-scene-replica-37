import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { LATER_CHANGES, PLANS, type PlanId } from "@/lib/site-data";

export function Pricing({ onSelect }: { onSelect: (planId: PlanId) => void }) {
  const { t } = useI18n();
  return (
    <section id="hinnakiri" className="py-28">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t.pricing.eyebrow}</p>
          <h2 className="mt-5 text-4xl sm:text-6xl">{t.pricing.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.pricing.sub}</p>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {PLANS.map((plan) => {
            const text = t.pricing.plans[plan.id];
            return (
              <div
                key={plan.id}
                className={cn(
                  "card-tactile relative flex flex-col rounded-[2px] border p-8",
                  plan.featured
                    ? "border-ink-border bg-ink-card text-ink-foreground"
                    : "border-border bg-card",
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-8 inline-flex items-center gap-1.5 rounded-[2px] bg-gold px-3.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-ink">
                    <Sparkles className="size-3.5" />
                    {t.pricing.popular}
                  </span>
                )}
                <h3 className="text-2xl">{text.name}</h3>
                <p className={cn("mt-2", plan.featured ? "text-ink-muted" : "text-muted-foreground")}>
                  {text.description}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-6xl font-semibold">{plan.price} €</span>
                  <span className={cn("text-sm", plan.featured ? "text-ink-muted" : "text-muted-foreground")}>
                    {t.pricing.oneTime}
                  </span>
                </div>
                <ul className="mt-8 flex-1 space-y-3.5">
                  {text.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.95rem]">
                      <span
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-[2px]",
                          plan.featured ? "bg-champagne/15 text-champagne" : "bg-champagne/10 text-champagne",
                        )}
                      >
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.featured ? "heroOutline" : "hero"}
                  size="xl"
                  className="mt-9 w-full rounded-[2px]"
                  onClick={() => onSelect(plan.id)}
                >
                  {text.cta}
                </Button>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">{t.pricing.vat}</p>

        <div className="mt-8 flex gap-4 rounded-[2px] border border-dashed border-amber/60 bg-amber-soft/50 p-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-[2px] bg-amber text-foreground">
            <Sparkles className="size-5" />
          </span>
          <p className="leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">{t.pricing.laterTitle} </span>
            {t.pricing.later(LATER_CHANGES.perChangeFrom, LATER_CHANGES.hourly)}
          </p>
        </div>
      </div>
    </section>
  );
}
