import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { PORTFOLIO, type PortfolioId } from "@/lib/site-data";
import rukkilillShot from "@/assets/portfolio-rukkilill.jpg.asset.json";
import haljastusShot from "@/assets/portfolio-haljastusest.jpg.asset.json";
import revekoShot from "@/assets/portfolio-reveko-invest.jpg.asset.json";

const IMAGES: Record<PortfolioId, string> = {
  rukkilill: rukkilillShot.url,
  haljastusest: haljastusShot.url,
  reveko: revekoShot.url,
};
const BADGE_TONES = ["bg-amber-soft", "bg-success-soft", "bg-primary-soft"];

export function Portfolio() {
  const { t } = useI18n();
  return (
    <section id="tehtud-tood" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="eyebrow">{t.portfolio.eyebrow}</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">{t.portfolio.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.portfolio.sub}</p>
        </div>
        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((work, i) => {
            const text = t.portfolio.items[work.id];
            return (
              <a
                key={work.id}
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-tactile flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
              >
                <div className="relative m-3 mb-0 aspect-[1920/911] overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={IMAGES[work.id]}
                    alt={text.title}
                    loading="lazy"
                    width={1920}
                    height={911}
                    className="card-zoom h-full w-full object-cover object-top"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full ${BADGE_TONES[i % 3]} px-3 py-1 text-xs font-bold text-foreground shadow-soft`}
                  >
                    {text.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-5">
                  <h3 className="text-2xl">{text.title}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {text.description}
                  </p>
                  <span className={buttonVariants({ variant: "heroOutline", className: "mt-6 h-11 w-full rounded-full" })}>
                    {t.portfolio.view} <ArrowUpRight />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
