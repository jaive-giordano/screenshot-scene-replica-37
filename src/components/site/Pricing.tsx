import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LATER_CHANGES, PLANS } from "@/lib/site-data";

export function Pricing({ onSelect }: { onSelect: (planName: string) => void }) {
  return (
    <section id="hinnakiri" className="bg-surface py-24">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Hinnakiri</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Selge ja aus hinnakiri</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ühekordne tasu, ametlik arve. Maksad alles siis, kui oled rahul.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-8 shadow-soft",
                plan.featured ? "border-primary shadow-lift ring-1 ring-primary" : "border-border",
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-8 rounded-full bg-primary px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                  Populaarseim
                </span>
              )}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-muted-foreground">{plan.description}</p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-5xl font-bold">{plan.price} €</span>
                <span className="text-sm text-muted-foreground">ühekordne</span>
              </div>
              <ul className="mt-8 flex-1 space-y-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-[0.95rem]">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success-soft text-success">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.featured ? "hero" : "heroOutline"}
                size="xl"
                className="mt-9 w-full"
                onClick={() => onSelect(plan.name)}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4 rounded-2xl border border-border bg-card p-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            <Info className="size-5" />
          </span>
          <p className="leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Hilisemad muudatused ja haldus: </span>
            Kui soovid hiljem valmis lehel tekste, hindu või pilte uuendada, on muudatuste tasu
            alates {LATER_CHANGES.perChangeFrom} € / kord (või {LATER_CHANGES.hourly} €/h)
            vastavalt mahule.
          </p>
        </div>
      </div>
    </section>
  );
}
