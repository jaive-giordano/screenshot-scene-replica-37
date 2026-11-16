import { describe, expect, it } from "vitest";
import { buildContactMailto, CONTACT, LATER_CHANGES, PLANS, REVISION_ROUNDS } from "@/lib/site-data";

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
      expect(plan.features.some((f) => f.includes("kuni 2 muudatuste ringi"))).toBe(true);
    }
  });

  it("hilisemad muudatused alates 15 € / kord või 25 €/h", () => {
    expect(LATER_CHANGES).toEqual({ perChangeFrom: 15, hourly: 25 });
  });
});

describe("Kontaktipäring", () => {
  it("saadetakse Jaive e-postile koos sisestatud andmetega", () => {
    const link = buildContactMailto({
      name: "Mari",
      company: "Kohvik OÜ",
      reply: "mari@example.ee",
      message: "Soovin kodulehte",
    });
    expect(link.startsWith(`mailto:${CONTACT.email}?`)).toBe(true);
    expect(CONTACT.email).toBe("jaive.giordano@gmail.com");
    const body = decodeURIComponent(link.split("body=")[1] ?? "");
    expect(body).toContain("Nimi: Mari");
    expect(body).toContain("Soovin kodulehte");
  });
});
