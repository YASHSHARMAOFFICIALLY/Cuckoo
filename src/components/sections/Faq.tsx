import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "How long does a project take?",
    a: "Most landing pages take 2–3 weeks and most MVPs take 3–4. You get a firm timeline after the discovery call, before any work starts.",
  },
  {
    q: "How do revisions work?",
    a: "Revisions are unlimited within the agreed scope. If you want to add something new mid-project, we scope it together and tell you upfront what it changes.",
  },
  {
    q: "Who owns the work?",
    a: "You do. 100% of the code, design files and assets are yours. We build in your accounts, so there is nothing to hand over at the end.",
  },
  {
    q: "How does payment work?",
    a: "50% upfront to book your slot and 50% at launch. Retainers are billed monthly and you can pause or cancel anytime.",
  },
  {
    q: "What if I'm not happy?",
    a: "Tell us early and we fix it. Design is signed off before any code is written, so there are no surprises at the end. If we still can't get it right, we'll work out a fair refund.",
  },
];

// Native <details>: accessible accordion, zero JS.
export default function Faq() {
  return (
    <section id="faq" className="wrap grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.4fr]">
      <SectionHeading eyebrow="FAQ" title="Questions founders ask us." />
      <Reveal>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-lg font-medium">
                {f.q}
                <span className="relative size-4 shrink-0 text-muted" aria-hidden>
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:rotate-90" />
                </span>
              </summary>
              <p className="max-w-xl pb-6 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
