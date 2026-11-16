import { CONTACT } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© 2026 {CONTACT.name} · Veebidisain</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${CONTACT.email}`} className="hover:text-foreground">
            {CONTACT.email}
          </a>
          {CONTACT.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-foreground">
              {p.display}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
