const STEPS = [
  {
    title: "Valmis kavand",
    text: "Loon Sinu ettevõtte info põhjal esmase kodulehe kavandi, mida saad kohe oma telefonis ja arvutis proovida.",
  },
  {
    title: "Ülevaatus ja täiendused",
    text: "Vaatame lehe koos üle ning teeme kuni 2 muudatuste ringi tekstides ja piltides.",
  },
  {
    title: "Ametlik arve ja avalikustamine",
    text: "Maksad ametliku arve alusel alles siis, kui oled tulemusega rahul. Ei mingeid peidetud kulusid.",
  },
];

export function HowItWorks() {
  return (
    <section id="kuidas-tootab" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Kuidas töötab</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Kuidas koostöö käib?</h2>
          <p className="mt-4 text-lg text-muted-foreground">Kolm lihtsat sammu — ilma riskita.</p>
        </div>
        <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div
            aria-hidden
            className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-border md:block"
          />
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl border border-border bg-card p-7 shadow-soft">
              <span className="grid size-14 place-items-center rounded-2xl bg-primary font-display text-xl font-bold text-primary-foreground shadow-lift">
                {i + 1}
              </span>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
