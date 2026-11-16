import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { href: "#tehtud-tood", label: "Tehtud tööd" },
  { href: "#hinnakiri", label: "Hinnakiri" },
  { href: "#kuidas-tootab", label: "Kuidas töötab" },
  { href: "#kontakt", label: "Kontakt" },
];

function Brand() {
  return (
    <a href="#top" className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground">
        JG
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base font-semibold">Jaive Giordano</span>
        <span className="block text-xs font-medium text-muted-foreground">Veebidisain</span>
      </span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="hero" className="hidden rounded-xl sm:inline-flex">
            <a href="#kontakt">Küsi pakkumist</a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Ava menüü">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menüü</SheetTitle>
              <nav className="mt-10 flex flex-col gap-1">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted"
                  >
                    {item.label}
                  </a>
                ))}
                <Button asChild variant="hero" size="xl" className="mt-4">
                  <a href="#kontakt">Küsi pakkumist</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
