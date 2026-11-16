import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import cafe from "@/assets/portfolio-cafe.jpg";
import salon from "@/assets/portfolio-salon.jpg";
import service from "@/assets/portfolio-service.jpg";

const WORKS = [
  {
    title: "Rukkilill Kohvik & Resto Bar",
    description:
      "Hubane ja isuäratav koduleht Tallinna vanalinna perekohvikule koos menüü ja broneerimisvormiga.",
    image: cafe,
    tag: "Kohvik",
  },
  {
    title: "Ilusalong & Stuudio (Näidis)",
    description: "Elegantne teenuste ja hinnakirjaga veebileht iluvaldkonna ettevõttele.",
    image: salon,
    tag: "Ilusalong",
  },
  {
    title: "Kohalik Teenusepakkuja (Näidis)",
    description: "Selge ja usaldusväärne visiitkaart-koduleht koos kiire hinnapäringu vormiga.",
    image: service,
    tag: "Teenused",
  },
];

export function Portfolio() {
  return (
    <section id="tehtud-tood" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="eyebrow">Portfoolio</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Tehtud tööd & näidised</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Iga leht on loodud konkreetse ettevõtte vajadusi silmas pidades.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WORKS.map((work) => (
            <article
              key={work.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-muted">
                <img
                  src={work.image}
                  alt={`${work.title} kodulehe kavand`}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold shadow-soft">
                  {work.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold">{work.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {work.description}
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="heroOutline" className="mt-6 h-10 w-full rounded-xl">
                      Vaata näidist <ArrowUpRight />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl gap-3 p-3 sm:rounded-2xl">
                    <DialogTitle className="px-2 pt-1">{work.title}</DialogTitle>
                    <DialogDescription className="px-2">{work.description}</DialogDescription>
                    <img
                      src={work.image}
                      alt={`${work.title} kodulehe kavand`}
                      width={1280}
                      height={896}
                      className="w-full rounded-xl border border-border"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
