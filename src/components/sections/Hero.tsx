import Image from "next/image";
import Link from "next/link";
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
    <section id="top" className="wrap grid grid-cols-1 items-center gap-16 pt-20 pb-16 sm:pt-24 sm:grid-cols-2 lg:grid-cols-[1fr_1fr] lg:pt-20 lg:pb-16">
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
        {/* mobile: equal-width stacked buttons on one edge; sm+: side by side */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
          <CallButton className="justify-center sm:justify-start">Book a free 15-min call</CallButton>
          <Link
            href="/#work"
            className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-800 px-6 text-base font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_1px_2px_rgb(24_24_27/0.2)] transition-colors hover:bg-zinc-700"
          >
            See our work
          </Link>
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
