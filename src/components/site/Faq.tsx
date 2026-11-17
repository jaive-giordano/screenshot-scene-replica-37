import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";

export function Faq() {
  const { t } = useI18n();
  return (
    <section id="kkk" className="bg-surface-deep py-28">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <p className="eyebrow">{t.faq.eyebrow}</p>
          <h2 className="mt-5 text-4xl sm:text-6xl">{t.faq.title}</h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {t.faq.items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`q${i}`}
              className="rounded-[2px] border border-border bg-card px-6 transition-colors data-[state=open]:border-primary/40"
            >
              <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
