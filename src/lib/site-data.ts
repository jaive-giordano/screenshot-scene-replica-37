export const CONTACT = {
  name: "Jaive Giordano",
  email: "info@jaivegiordano.ee",
  phones: [
    { country: "ee", display: "+372 5647 2817", tel: "+37256472817" },
    { country: "it", display: "+39 392 282 3232", tel: "+393922823232" },
  ],
} as const;

export const REVISION_ROUNDS = 2;

export type PlanId = "lahtekood" | "votmed-katte";

export type PricingPlan = { id: PlanId; price: number; featured?: boolean };

export const PLANS: PricingPlan[] = [
  { id: "lahtekood", price: 250 },
  { id: "votmed-katte", price: 350, featured: true },
];

export const LATER_CHANGES = { perChangeFrom: 15, hourly: 25 } as const;

export type PortfolioId = "rukkilill" | "haljastusest" | "reveko";

export const PORTFOLIO: { id: PortfolioId; url: string }[] = [
  { id: "rukkilill", url: "https://bright-tide-creative.lovable.app" },
  { id: "haljastusest", url: "https://parnumaa-kodu-korras.lovable.app" },
  { id: "reveko", url: "https://reveko-south-estonia-builders.lovable.app" },
];

export type ContactRequest = {
  name: string;
  company: string;
  reply: string;
  message: string;
  plan?: string | undefined;
};

export type MailLabels = {
  subject: string;
  name: string;
  company: string;
  contact: string;
  plan: string;
};

const DEFAULT_MAIL_LABELS: MailLabels = {
  subject: "Kodulehe päring",
  name: "Nimi",
  company: "Ettevõte",
  contact: "Kontakt",
  plan: "Pakett",
};

/** Builds a mailto: link that opens the visitor's e-mail app with the request filled in. */
export function buildContactMailto(req: ContactRequest, labels: MailLabels = DEFAULT_MAIL_LABELS): string {
  const subject = `${labels.subject}${req.company ? ` – ${req.company}` : ""}`;
  const lines = [
    `${labels.name}: ${req.name}`,
    `${labels.company}: ${req.company || "-"}`,
    `${labels.contact}: ${req.reply}`,
    ...(req.plan ? [`${labels.plan}: ${req.plan}`] : []),
    "",
    req.message,
  ];
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
