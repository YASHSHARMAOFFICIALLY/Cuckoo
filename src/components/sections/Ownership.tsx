import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const items = [
  { title: "Full source code", body: "In your own GitHub repo, from the first commit." },
  { title: "Figma files", body: "Every screen and component, ready for your next designer." },
  { title: "All assets", body: "Images, icons, fonts and copy, organized and handed over." },
  { title: "Deployed in your accounts", body: "Hosting, domain and analytics set up under your name." },
];

export default function Ownership() {
  return (
    <section>
      <div className="wrap grid gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="Ownership"
          title="Everything we make is yours."
          sub="No lock-in, no licensing, no code held hostage. When the project ends you walk away with all of it."
        />
        <Reveal>
          <ul className="card divide-y divide-line">
            {items.map((i) => (
              <li key={i.title} className="flex gap-4 p-6">
                <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0 text-accent" fill="none" aria-hidden>
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeOpacity=".3" />
                  <path d="m6.5 10.2 2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="font-semibold">{i.title}</p>
                  <p className="mt-1 text-base text-muted">{i.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
