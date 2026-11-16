import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

function MockupCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary-soft/60 blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
        <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-3">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="ml-3 flex-1 rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
            sinu-ettevote.ee
          </span>
        </div>
        <div className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 rounded-full bg-foreground/80" />
            <div className="flex gap-3">
              <div className="h-2 w-10 rounded-full bg-muted" />
              <div className="h-2 w-10 rounded-full bg-muted" />
              <div className="h-2 w-10 rounded-full bg-muted" />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 space-y-3 pt-2">
              <div className="h-4 w-full rounded-full bg-foreground/85" />
              <div className="h-4 w-4/5 rounded-full bg-foreground/85" />
              <div className="h-2 w-full rounded-full bg-muted" />
              <div className="h-2 w-3/4 rounded-full bg-muted" />
              <div className="flex gap-2 pt-2">
                <div className="h-7 w-20 rounded-lg bg-primary" />
                <div className="h-7 w-16 rounded-lg border border-border" />
              </div>
            </div>
            <div className="col-span-2 aspect-[4/5] rounded-xl bg-gradient-to-br from-primary-soft to-success-soft" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2 rounded-xl border border-border p-3">
                <div className="size-6 rounded-lg bg-primary-soft" />
                <div className="h-2 w-3/4 rounded-full bg-foreground/70" />
                <div className="h-1.5 w-full rounded-full bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-soft">
        <span className="grid size-8 place-items-center rounded-full bg-success-soft text-success">
          <Check className="size-4" />
        </span>
        <div className="text-sm">
          <div className="font-semibold">Kavand valmis</div>
          <div className="text-xs text-muted-foreground">Ilma ettemaksuta</div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 md:pt-20 lg:grid-cols-2 lg:pb-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground shadow-soft">
            <ShieldCheck className="size-4 text-success" />
            Kiire ja riskivaba lahendus väikeettevõttele
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
            Kaasaegsed kodulehed väikeettevõtetele —{" "}
            <span className="text-primary">näe valmis kavandit enne ostuotsust.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Aitan kohvikutel, salongidel ja teenusepakkujatel kiiresti internetis nähtavaks saada.
            Valmistan Sinu ettevõttele personaalse kodulehe kavandi ilma ettemaksuta.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#tehtud-tood">
                Vaata tehtud töid <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <a href="#hinnakiri">Tutvu hindadega</a>
            </Button>
          </div>
        </div>
        <div className="animate-fade-up [animation-delay:150ms] lg:pl-6">
          <MockupCard />
        </div>
      </div>
    </section>
  );
}
