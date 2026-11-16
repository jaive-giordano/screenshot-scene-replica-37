export const CONTACT = {
  name: "Jaive Giordano",
  email: "jaive.giordano@gmail.com",
  phones: [
    { label: "Eesti", display: "+372 5647 2817", tel: "+37256472817" },
    { label: "Itaalia", display: "+39 392 282 3232", tel: "+393922823232" },
  ],
} as const;

export const REVISION_ROUNDS = 2;

export type PricingPlan = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const PLANS: PricingPlan[] = [
  {
    id: "lahtekood",
    name: "Koduleht + Lähtekood",
    price: 250,
    description: "Sobib ettevõttele, kes soovib lehe ise oma serverisse üles panna.",
    features: [
      "Personaalse disainiga koduleht",
      "Mobiilisõbralik vaade",
      `Hinna sees kuni ${REVISION_ROUNDS} muudatuste ringi enne üleandmist`,
      "Kontaktivorm ja kaardirakendus",
      "Täielik lähtekood (GitHub / ZIP)",
      "Ametlik arve ettevõttele",
    ],
    cta: "Vali see pakett",
  },
  {
    id: "votmed-katte",
    name: "Täislahendus \u201EVõtmed kätte\u201C",
    price: 350,
    description: "Muretu täisteenus — mina hoolitsen kõige tehnilise eest.",
    features: [
      "Kõik, mis 250 € paketis",
      `Hinna sees kuni ${REVISION_ROUNDS} muudatuste ringi enne avalikustamist`,
      "Kodulehe ülespanek kiiretesse serveritesse",
      "Ühendamine Sinu .ee domeeniga",
      "Turvasertifikaat (HTTPS) hinna sees",
    ],
    cta: "Vali täislahendus",
    featured: true,
  },
];

export const LATER_CHANGES = { perChangeFrom: 15, hourly: 25 } as const;

export type ContactRequest = {
  name: string;
  company: string;
  reply: string;
  message: string;
  plan?: string | undefined;
};

/** Builds a mailto: link that opens the visitor's e-mail app with the request filled in. */
export function buildContactMailto(req: ContactRequest): string {
  const subject = `Kodulehe päring${req.company ? ` – ${req.company}` : ""}`;
  const lines = [
    `Nimi: ${req.name}`,
    `Ettevõte: ${req.company || "-"}`,
    `Kontakt: ${req.reply}`,
    ...(req.plan ? [`Pakett: ${req.plan}`] : []),
    "",
    req.message,
  ];
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
