import Image from "next/image";
import CallButton from "@/components/ui/CallButton";
import { projects } from "@/content/projects";

function Preview({ src, priority }: { src: string; priority?: boolean }) {
  return (
    <div className="card relative aspect-[1600/756] overflow-hidden">
      <Image src={src} alt="" fill priority={priority} sizes="(min-width: 1024px) 380px, 100vw" className="object-cover object-top" />
    </div>
  );
}

// Track = two identical halves, slid -50%, so the loop is seamless.
// pb-4 matches gap-4 so both halves are exactly equal height.
// ponytail: each half repeats the list 3x so it stays taller than the column; trim repeats at 5+ projects.
function Column({ items, reverse }: { items: typeof projects; reverse?: boolean }) {
  const half = [...items, ...items, ...items];
  return (
    <div className="marquee-track flex flex-col gap-4 pb-4" data-reverse={reverse || undefined}>
      {[...half, ...half].map((p, i) => (
        <Preview key={i} src={p.src} />
      ))}
    </div>
  );
}

export default function Hero() {
  const reversed = [...projects].reverse();
  return (
    <section id="top" className="wrap grid items-center gap-16 pt-20 pb-16 sm:pt-24 lg:grid-cols-[1fr_1fr] lg:pt-20 lg:pb-16">
      <div className="fade-up">
        <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm font-medium text-zinc-600">
          <span className="size-2 rounded-full bg-accent ring-4 ring-accent/15" aria-hidden />
          Booking new projects
        </p>
        <h1 className="mt-7 text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem]">
          Your idea, designed, built and live in weeks.
        </h1>
        <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-pretty text-zinc-600 sm:text-xl">
          We design and build landing pages and MVPs for founders, from first sketch to production. You keep every file.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <CallButton>Book a free 15-min call</CallButton>
          <a
            href="#work"
            className="inline-flex h-12 items-center rounded-full border border-line px-6 text-base font-semibold transition-colors hover:border-zinc-300 hover:bg-zinc-50"
          >
            See our work
          </a>
        </div>
      </div>

      {/* mobile: one static screenshot */}
      <div className="fade-up sm:hidden">
        <div className="card relative aspect-[1600/756] overflow-hidden">
          <Image src={projects[0].src} alt={`${projects[0].name} website`} fill sizes="100vw" className="object-cover object-top" />
        </div>
      </div>

      {/* sm+: two columns scrolling in opposite directions, decorative (real links live in Work) */}
      <div
        className="marquee fade-up relative hidden overflow-hidden rounded-2xl [animation-delay:120ms] sm:block lg:rounded-none aspect-video sm:aspect-[1600/900] lg:aspect-auto lg:-mt-8 lg:-mb-16 lg:self-stretch"
        aria-hidden
      >
        {/* absolute so the tall tracks never set the hero height */}
        <div className="absolute inset-0 grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
          <Column items={projects} />
          <Column items={reversed} reverse />
        </div>
      </div>
    </section>
  );
}
