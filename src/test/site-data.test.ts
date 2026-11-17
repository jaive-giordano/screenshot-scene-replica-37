import { describe, expect, it } from "vitest";
import { DICTIONARIES, LANGS, DEFAULT_LANG } from "@/lib/i18n";
import { buildContactMailto, CONTACT, EXTRA_SCOPE, LATER_CHANGES, PLANS, PORTFOLIO, REVISION_ROUNDS } from "@/lib/site-data";

describe("Hinnakiri", () => {
  it("lähtekoodiga pakett maksab 250 €", () => {
    expect(PLANS.find((p) => p.id === "lahtekood")?.price).toBe(250);
  });

  it("võtmed-kätte täislahendus maksab 300 € ja on esile tõstetud", () => {
    const plan = PLANS.find((p) => p.id === "votmed-katte");
    expect(plan?.price).toBe(300);
    expect(plan?.featured).toBe(true);
  });

  it("kõigis neljas keeles on käibemaksu märge 24%", () => {
    expect(DICTIONARIES.et.pricing.vat).toBe("Hindadele lisandub käibemaks (24%).");
    expect(DICTIONARIES.en.pricing.vat).toBe("Prices are subject to VAT (24%).");
    expect(DICTIONARIES.ru.pricing.vat).toBe("К ценам добавляется НДС (24%).");
    expect(DICTIONARIES.it.pricing.vat).toBe("Ai prezzi si aggiunge l'IVA (24%).");
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

  it("lisaleht alates 40 € / leht", () => {
    expect(EXTRA_SCOPE).toEqual({ perPageFrom: 40 });
    expect(DICTIONARIES.et.pricing.extra(EXTRA_SCOPE.perPageFrom)).toContain("alates 40 € / leht");
  });

  it("lähtekoodi pakett selgitab mahdu: kuni 6 sisusektsiooni ja üks keel", () => {
    const feats = DICTIONARIES.et.pricing.plans.lahtekood.features;
    expect(feats[0]).toBe("Kuni 6 sisusektsiooniga üheleheline koduleht (sama mahuga nagu see leht)");
    expect(feats).toContain("Üks keel (lisakeeled kokkuleppel)");
  });

  it("täislahendus viitab endiselt 250 € paketile", () => {
    expect(DICTIONARIES.et.pricing.plans["votmed-katte"].features[0]).toBe("Kõik, mis 250 € paketis");
  });

  it("KKK esimene küsimus on kodulehe mahu kohta", () => {
    const first = DICTIONARIES.et.faq.items[0];
    expect(first?.q).toBe("Kui suur koduleht hinna sisse kuulub?");
    expect(first?.a).toContain("kuni 6 sisusektsiooni");
    expect(first?.a).toContain("ühes keeles");
    expect(DICTIONARIES.en.faq.items[0]?.q).toBe("How big a website is included in the price?");
    expect(DICTIONARIES.ru.faq.items[0]?.q).toBe("Какой объём сайта входит в стоимость?");
    expect(DICTIONARIES.it.faq.items[0]?.q).toBe("Quanto è grande il sito incluso nel prezzo?");
  });
});

describe("Kontakt", () => {
  it("e-post on info@jaivegiordano.ee", () => {
    expect(CONTACT.email).toBe("info@jaivegiordano.ee");
  });

  it("telefonid on +372 5647 2817 ja +39 392 282 3232", () => {
    expect(CONTACT.phones.map((p) => p.display)).toEqual(["+372 5647 2817", "+39 392 282 3232"]);
  });

  it("päring saadetakse Outlooki aadressile koos sisestatud andmetega", () => {
    const link = buildContactMailto({ name: "Mari", company: "Kohvik OÜ", reply: "mari@example.ee", message: "Soovin kodulehte" });
    expect(link.startsWith("mailto:info@jaivegiordano.ee?")).toBe(true);
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
