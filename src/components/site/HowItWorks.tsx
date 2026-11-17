import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const TONES = ["bg-primary text-primary-foreground", "border border-foreground text-foreground", "border border-foreground text-foreground"];

export function HowItWorks() {
  const { t } = useI18n();
  return (
    <section id="kuidas-tootab" className="relative bg-surface py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t.how.eyebrow}</p>
          <h2 className="mt-5 text-4xl sm:text-6xl">{t.how.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.how.sub}</p>
        </div>
        <ol className="mt-14 grid gap-7 md:grid-cols-3">
          {t.how.steps.map((step, i) => (
            <li
              key={i}
              className="card-tactile relative rounded-[2px] border border-border bg-background p-8"
            >
              <span
                className={cn(
                  "grid size-14 place-items-center rounded-[2px] font-display text-2xl font-semibold",
                  TONES[i],
                )}
              >
                {i + 1}
              </span>
              <h3 className="mt-6 text-2xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
