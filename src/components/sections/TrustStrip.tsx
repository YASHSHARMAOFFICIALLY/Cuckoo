const items = [
  { title: "2–4 week delivery", body: "Fixed timeline agreed before we start." },
  { title: "Unlimited revisions within scope", body: "We iterate until it is right." },
  { title: "You own 100% of code and design", body: "No lock-in, no licensing fees." },
];

export default function TrustStrip() {
  return (
    <section aria-label="What you get" className="border-y border-line">
      <ul className="wrap grid gap-6 py-10 sm:grid-cols-3 sm:gap-8">
        {items.map((i) => (
          <li key={i.title} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <div>
              <p className="font-semibold">{i.title}</p>
              <p className="mt-1 text-base text-muted">{i.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
