import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

const title = "Free MVP Cost Calculator | Freelance Software Agency";
const description =
  "Estimate the cost and timeline for a landing page, MVP, web app or AI integration. Free, instant and built by a freelance software agency.";
const url = "https://cuckoo.agency/tools/mvp-cost-calculator";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    siteName: "cuckoo",
    url,
    title,
    description,
  },
};

const faqs = [
  {
    question: "How accurate is this MVP cost calculator?",
    answer:
      "It gives you a practical planning range based on project type, scope, platform and delivery speed. A detailed estimate still needs a short scope review because integrations, content and existing assets can change the work involved.",
  },
  {
    question: "What is included in the estimate?",
    answer:
      "The estimate covers product design and software development for a focused first release. Hosting fees, paid third-party services, large content migrations and ongoing marketing are not included.",
  },
  {
    question: "Is a freelance software agency cheaper than hiring a team?",
    answer:
      "A small freelance software agency can be more efficient for a defined launch because you pay for the project rather than permanent roles. The best option depends on your scope, deadline and need for ongoing internal ownership.",
  },
  {
    question: "Can cuckoo build the project after I calculate it?",
    answer:
      "Yes. cuckoo designs and builds landing pages, MVPs, web apps and AI integrations. Use the single call-to-action beside your estimate to discuss the scope and get a firm timeline.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "MVP Cost Calculator",
      url,
      description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      provider: {
        "@type": "Organization",
        name: "cuckoo",
        url: "https://cuckoo.agency/",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function MvpCostCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <header className="border-b border-line bg-white">
        <nav className="wrap flex h-16 items-center justify-between" aria-label="Tool navigation">
          <Link href="/" className="text-2xl font-semibold tracking-[-0.03em]" aria-label="cuckoo home">
            cuckoo<span className="text-accent">.</span>
          </Link>
          <Link href="/#services" className="text-sm font-medium text-muted transition-colors hover:text-ink">
            Software agency services
          </Link>
        </nav>
      </header>

      <main id="top">
        <section className="bg-paper">
          <div className="wrap py-14 sm:py-20">
            <p className="text-sm font-semibold tracking-[0.12em] text-accent uppercase">Free founder tool</p>
            <h1 className="mt-4 max-w-4xl text-[2.65rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-6xl">
              MVP cost calculator for your next software project
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl">
              Get an instant budget and timeline range for a landing page, MVP, web app or AI integration. No signup and no sales gate.
            </p>
            <div className="mt-10">
              <Calculator />
            </div>
          </div>
        </section>

        <section className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.12em] text-accent uppercase">How to use it</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">A useful range in under a minute.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              ["01", "Choose the build", "Start with the closest project type, from a landing page to a full web app."],
              ["02", "Set the scope", "Describe the first release, platforms and deadline. Your result updates instantly."],
              ["03", "Plan the next step", "Use the range for early budgeting, then validate the scope before committing."],
            ].map(([number, heading, body]) => (
              <article key={number} className="border-t border-line pt-5">
                <span className="text-sm font-semibold text-accent">{number}</span>
                <h3 className="mt-3 font-semibold">{heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-line bg-paper">
          <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold tracking-[0.12em] text-accent uppercase">What changes the price</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Scope matters more than feature count.</h2>
            </div>
            <div className="space-y-5 text-zinc-600">
              <p>
                Authentication, payments, admin workflows and third-party integrations often add more complexity than visible screens. A strong first version protects one core user journey instead of trying to ship every future idea.
              </p>
              <p>
                cuckoo works like a focused <Link href="/#process" className="font-medium text-ink underline decoration-zinc-300 underline-offset-4 hover:decoration-ink">freelance software agency</Link>: scope first, agree the timeline, then design and build toward a clear launch. You retain the design and code when the work is complete.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.12em] text-accent uppercase">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">MVP cost questions.</h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex cursor-pointer items-center justify-between gap-5 py-5 font-medium">
                  {faq.question}
                  <span className="text-xl text-muted transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="max-w-2xl pb-5 leading-relaxed text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="wrap flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-semibold text-ink">cuckoo<span className="text-accent">.</span></Link>
          <p>Landing pages, MVPs, web apps and AI integrations for founders.</p>
        </div>
      </footer>
    </>
  );
}
