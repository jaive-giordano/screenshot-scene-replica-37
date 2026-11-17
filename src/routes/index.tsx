import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { Portfolio } from "@/components/site/Portfolio";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Pricing } from "@/components/site/Pricing";
import { Contact } from "@/components/site/Contact";
import { SiteFooter } from "@/components/site/SiteFooter";
import { LanguageProvider } from "@/lib/i18n";
import type { PlanId } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jaive Giordano · Veebidisain väikeettevõtetele" },
      {
        name: "description",
        content:
          "Kaasaegsed kodulehed kohvikutele, salongidele ja teenusepakkujatele. Esimene kavand juba järgmisel tööpäeval — ilma ettemaksuta.",
      },
      { property: "og:title", content: "Jaive Giordano · Veebidisain väikeettevõtetele" },
      {
        property: "og:description",
        content: "Personaalne kodulehe kavand järgmisel tööpäeval, ilma ettemaksuta. Paketid alates 250 €.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);

  function selectPlan(id: PlanId) {
    setSelectedPlan(id);
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main>
          <Hero />
          <Portfolio />
          <HowItWorks />
          <Pricing onSelect={selectPlan} />
          <Contact selectedPlan={selectedPlan} onClearPlan={() => setSelectedPlan(null)} />
        </main>
        <SiteFooter />
      </div>
    </LanguageProvider>
  );
}
