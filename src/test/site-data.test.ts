import { describe, expect, it } from "vitest";
import { DICTIONARIES, LANGS, DEFAULT_LANG } from "@/lib/i18n";
import { buildContactMailto, CONTACT, LATER_CHANGES, PLANS, PORTFOLIO, REVISION_ROUNDS } from "@/lib/site-data";

describe("Hinnakiri", () => {
  it("lähtekoodiga pakett maksab 250 €", () => {
    expect(PLANS.find((p) => p.id === "lahtekood")?.price).toBe(250);
  });

  it("võtmed-kätte täislahendus maksab 350 € ja on esile tõstetud", () => {
    const plan = PLANS.find((p) => p.id === "votmed-katte");
    expect(plan?.price).toBe(350);
    expect(plan?.featured).toBe(true);
  });

  it("mõlemas paketis on hinna sees kuni 2 muudatuste ringi", () => {
    expect(REVISION_ROUNDS).toBe(2);
    for (const plan of PLANS) {
      expect(DICTIONARIES.et.pricing.plans[plan.id].features.some((f) => f.includes("kuni 2 muudatuste ringi"))).toBe(true);
    }
  });

  it("hilisemad muudatused alates 15 € / kord või 25 €/h", () => {
    expect(LATER_CHANGES).toEqual({ perChangeFrom: 15, hourly: 25 });
  });
});

describe("Kontakt", () => {
  it("e-post on jaive.giordano@outlook.com", () => {
    expect(CONTACT.email).toBe("jaive.giordano@outlook.com");
  });

  it("telefonid on +372 5647 2817 ja +39 392 282 3232", () => {
    expect(CONTACT.phones.map((p) => p.display)).toEqual(["+372 5647 2817", "+39 392 282 3232"]);
  });

  it("päring saadetakse Outlooki aadressile koos sisestatud andmetega", () => {
    const link = buildContactMailto({ name: "Mari", company: "Kohvik OÜ", reply: "mari@example.ee", message: "Soovin kodulehte" });
    expect(link.startsWith("mailto:jaive.giordano@outlook.com?")).toBe(true);
    const body = decodeURIComponent(link.split("body=")[1] ?? "");
    expect(body).toContain("Nimi: Mari");
    expect(body).toContain("Soovin kodulehte");
  });
});

describe("Keeled", () => {
  it("vaikimisi keel on eesti ja valikus on ET, EN, RU, IT", () => {
    expect(DEFAULT_LANG).toBe("et");
    expect([...LANGS]).toEqual(["et", "en", "ru", "it"]);
  });

  it("hero märk lubab kavandi järgmisel tööpäeval ilma ettemaksuta", () => {
    expect(DICTIONARIES.et.hero.badge).toBe("Esimene kodulehe kavand kätte juba järgmisel tööpäeval — ilma ettemaksuta");
  });
});

describe("Portfoolio", () => {
  it("näidab kolme tööd: Rukkilill, HaljastusEst, Reveko", () => {
    expect(PORTFOLIO.map((p) => DICTIONARIES.et.portfolio.items[p.id].title)).toEqual([
      "Rukkilill Kohvik & Resto Bar",
      "HaljastusEst OÜ",
      "Reveko Invest OÜ",
    ]);
  });

  it("lingid avavad need kolm aadressi, mitte lehe siseseid ankruid", () => {
    expect(PORTFOLIO.map((p) => [p.id, p.url] as const)).toEqual([
      ["rukkilill", "https://bright-tide-creative.lovable.app"],
      ["haljastusest", "https://parnumaa-kodu-korras.lovable.app"],
      ["reveko", "https://reveko-south-estonia-builders.lovable.app"],
    ]);
    for (const p of PORTFOLIO) {
      expect(p.url.startsWith("#")).toBe(false);
      expect(p.url.startsWith("http")).toBe(true);
    }
  });
});
