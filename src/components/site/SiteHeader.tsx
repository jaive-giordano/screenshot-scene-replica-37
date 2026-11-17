import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LogoMark } from "@/components/site/Logo";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/site-data";

function Brand({ role }: { role: string }) {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label={`${CONTACT.name} — ${role}`}>
      <LogoMark className="h-14" />
    </a>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const nav = [
    { href: "#tehtud-tood", label: t.nav.work },
    { href: "#hinnakiri", label: t.nav.pricing },
    { href: "#kuidas-tootab", label: t.nav.how },
    { href: "#kontakt", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5">
        <Brand role={t.footer.role} />
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden md:inline-flex" />
          <Button asChild variant="hero" className="hidden rounded-[2px] px-5 hover:ring-1 hover:ring-champagne sm:inline-flex">
            <a href="#kontakt">{t.nav.cta}</a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t.nav.openMenu}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background">
              <SheetTitle className="sr-only">{t.nav.menu}</SheetTitle>
              <nav className="mt-10 flex flex-col gap-1">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-[2px] px-3 py-3 text-base font-medium hover:bg-surface"
                  >
                    {item.label}
                  </a>
                ))}
                <LanguageSwitcher className="mt-4 self-start" />
                <Button asChild variant="hero" size="xl" className="mt-4 rounded-[2px] hover:ring-1 hover:ring-champagne">
                  <a href="#kontakt">{t.nav.cta}</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
