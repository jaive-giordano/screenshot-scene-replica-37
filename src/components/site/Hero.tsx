import { ArrowRight, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { PORTFOLIO, type PortfolioId } from "@/lib/site-data";
import rukkilillShot from "@/assets/portfolio-rukkilill.jpg.asset.json";
import haljastusShot from "@/assets/portfolio-haljastusest.jpg.asset.json";
import revekoShot from "@/assets/portfolio-reveko-invest.jpg.asset.json";

const SHOTS: Record<PortfolioId, string> = {
  rukkilill: rukkilillShot.url,
  haljastusest: haljastusShot.url,
  reveko: revekoShot.url,
};

/** Real project URL per demo, so the hero previews and the portfolio cards always open the same address. */
const PROJECT_URLS = Object.fromEntries(PORTFOLIO.map((p) => [p.id, p.url])) as Record<PortfolioId, string>;

function MiniPreview({
  id,
  label,
  className,
}: {
  id: PortfolioId;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={PROJECT_URLS[id]}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "absolute block overflow-hidden rounded-[2px] border border-border bg-card transition-all duration-500 ease-out hover:z-30 hover:-translate-y-1 hover:rotate-0 ",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2">
        <span className="size-2 rounded-[2px] bg-primary/70" />
        <span className="size-2 rounded-[2px] bg-amber" />
        <span className="size-2 rounded-[2px] bg-success" />
        <span className="ml-2 truncate rounded-md bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
          {label}
        </span>
      </div>
      <img
        src={SHOTS[id]}
        alt=""
        width={1920}
        height={911}
        className="block aspect-[1920/911] w-full object-cover object-top"
      />
    </a>
  );
}

function Collage({ chipTitle, chipSub }: { chipTitle: string; chipSub: string }) {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
      <div className="absolute inset-[8%] -z-10 rounded-[2px] bg-peach/60 blur-3xl" />
      <MiniPreview
        id="haljastusest"
        label="haljastusest.ee"
        className="left-0 top-[6%] z-10 w-[62%] -rotate-6"
      />
      <MiniPreview
        id="reveko"
        label="reveko.ee"
        className="right-0 top-0 z-0 w-[56%] rotate-[5deg]"
      />
      <MiniPreview
        id="rukkilill"
        label="rukkilill.ee"
        className="bottom-0 left-[18%] z-20 w-[66%] rotate-[-1.5deg]"
      />
      <div className="animate-float absolute -left-3 bottom-[14%] z-40 flex items-center gap-3 rounded-[2px] border border-border bg-background px-4 py-3">
        <span className="grid size-9 place-items-center rounded-[2px] bg-success-soft text-success">
          <Check className="size-4" strokeWidth={3} />
        </span>
        <div className="text-sm">
          <div className="font-semibold">{chipTitle}</div>
          <div className="text-xs text-muted-foreground">{chipSub}</div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className="relative overflow-hidden bg-hero">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:pb-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-[2px] border border-border px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground">
            <Clock className="size-4 text-primary" />
            {t.hero.badge}
          </span>
          <h1 className="mt-7 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
            {t.hero.title} <em className="font-medium text-primary">{t.hero.titleAccent}</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.hero.sub}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl" className="rounded-[2px]">
              <a href="#tehtud-tood">
                {t.hero.ctaWork} <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="xl" className="rounded-[2px]">
              <a href="#hinnakiri">{t.hero.ctaPricing}</a>
            </Button>
          </div>
        </div>
        <div className="animate-fade-up [animation-delay:150ms]">
          <Collage chipTitle={t.hero.chipTitle} chipSub={t.hero.chipSub} />
        </div>
      </div>
    </section>
  );
}
