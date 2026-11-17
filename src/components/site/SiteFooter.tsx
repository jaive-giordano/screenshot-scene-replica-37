import { LogoMark } from "@/components/site/Logo";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/site-data";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark className="size-8" />
          <p>
            © 2026 {CONTACT.name} · {t.footer.role}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${CONTACT.email}`} className="hover:text-primary">
            {CONTACT.email}
          </a>
          {CONTACT.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-primary">
              {p.display}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
