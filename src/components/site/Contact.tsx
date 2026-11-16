import { useState, type FormEvent } from "react";
import { Mail, Phone, Send, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildContactMailto, CONTACT } from "@/lib/site-data";

export function Contact({
  selectedPlan,
  onClearPlan,
}: {
  selectedPlan: string | null;
  onClearPlan: () => void;
}) {
  const [form, setForm] = useState({ name: "", company: "", reply: "", message: "" });

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.reply.trim() || !form.message.trim()) {
      toast.error("Palun täida nimi, kontakt ja sõnum.");
      return;
    }
    window.location.href = buildContactMailto({ ...form, plan: selectedPlan ?? undefined });
    toast.success("Avan Sinu e-posti rakenduse — vajuta seal „Saada“.");
  }

  return (
    <section id="kontakt" className="py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Võta ühendust</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Teeme Sinu ettevõttele uue kodulehe</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Võta julgelt ühendust, kui soovid tasuta esmast kavandit või küsida nõu. Teenuse eest
            saab tasuda ametliku arve alusel.
          </p>

          <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
            <div className="font-display text-lg font-semibold">{CONTACT.name}</div>
            <div className="text-sm text-muted-foreground">Veebidisain</div>
            <ul className="mt-6 space-y-4">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="group flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-xl bg-card text-primary shadow-soft">
                    <Mail className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium text-muted-foreground">E-post</span>
                    <span className="font-semibold group-hover:text-primary">{CONTACT.email}</span>
                  </span>
                </a>
              </li>
              {CONTACT.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="group flex items-center gap-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-card text-primary shadow-soft">
                      <Phone className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-muted-foreground">
                        Telefon ({p.label})
                      </span>
                      <span className="font-semibold group-hover:text-primary">{p.display}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="h-fit space-y-5 rounded-2xl border border-border bg-card p-7 shadow-lift sm:p-9"
        >
          {selectedPlan && (
            <div className="flex items-center justify-between gap-3 rounded-xl bg-primary-soft px-4 py-3 text-sm">
              <span>
                Valitud pakett: <span className="font-semibold text-primary">{selectedPlan}</span>
              </span>
              <button
                type="button"
                onClick={onClearPlan}
                aria-label="Eemalda valitud pakett"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Sinu nimi</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="h-11 rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Ettevõtte nimi</Label>
              <Input
                id="company"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reply">E-post või telefon</Label>
            <Input
              id="reply"
              value={form.reply}
              onChange={(e) => update("reply", e.target.value)}
              className="h-11 rounded-xl"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Sõnum / millist lehte soovid?</Label>
            <Textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="rounded-xl"
              required
            />
          </div>
          <Button type="submit" variant="hero" size="xl" className="w-full">
            Saada päring <Send />
          </Button>
        </form>
      </div>
    </section>
  );
}
