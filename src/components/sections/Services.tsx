import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    title: "Website or landing page",
    body: "A fast, sharp site that explains what you do and turns visitors into signups.",
    points: ["Copy structure and design in Figma", "Built in Next.js, tuned for speed", "Live in 2–3 weeks"],
  },
  {
    title: "App or MVP build",
    body: "The first real version of your product, scoped tight so you can ship and learn.",
    points: ["Core flows, auth and payments", "Clean code your next hire can pick up", "Live in 3–4 weeks"],
  },
  {
    title: "Monthly retainer",
    body: "Ongoing design and development for teams that keep shipping after launch.",
    points: ["Updates in 24–48 hours", "Flexible scope, month to month", "Pause or stop anytime"],
  },
];

export default function Services() {
  return (
    <section id="services">
      <div className="wrap py-20 sm:py-24">
        <SectionHeading eyebrow="Services" title="Three ways to work together." sub="Pick a one-off build or keep us on for ongoing work." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <Reveal key={s.title} className="h-full">
              <article className="card lift flex h-full flex-col p-7 sm:p-8">
                <h3 className="text-xl font-semibold tracking-[-0.015em]">{s.title}</h3>
                <p className="mt-3 text-muted lg:min-h-[3lh]">{s.body}</p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6 text-base">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
