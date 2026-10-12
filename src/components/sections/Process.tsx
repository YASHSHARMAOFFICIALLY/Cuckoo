import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  { title: "Discovery call", body: "15 minutes. You tell us what you're building, we tell you honestly if we're a fit and what it takes." },
  { title: "Design", body: "We map the pages and flows, then design them in Figma. You review, we refine until it's right." },
  { title: "Build", body: "We turn the approved design into clean code, with preview links every few days so you see progress." },
  { title: "Launch", body: "We deploy to your accounts, connect your domain, and stay on hand for fixes after go-live." },
];

export default function Process() {
  return (
    <section id="process" className="wrap py-20 sm:py-24">
      <SectionHeading eyebrow="Process" title="From first call to live in four steps." />
      <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title}>
            <Reveal className="border-t border-line pt-6">
              <span className="text-sm font-semibold text-accent tabular-nums">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-base text-muted">{s.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
