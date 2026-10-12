import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";


export default function Work() {
  return (
    <section id="work" className="wrap py-20 sm:py-24">
      <SectionHeading eyebrow="Selected work" title="Recent things we've shipped." sub="Live products, built end to end." />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <Reveal key={p.name} className="h-full">
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group card lift flex h-full flex-col overflow-hidden"
            >
              <div className="relative aspect-[1600/756] overflow-hidden border-b border-line bg-zinc-50">
                <Image
                  src={p.src}
                  alt={`${p.name} homepage`}
                  fill
                  sizes="(min-width: 768px) 540px, 100vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                />
              </div>
              <div className="flex flex-1 items-start justify-between gap-6 p-6 sm:p-7">
                <div>
                  <p className="text-sm font-medium text-muted">{p.tag}</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em]">{p.name}</h3>
                  <p className="mt-2 text-base leading-relaxed text-zinc-600">{p.caption}</p>
                </div>
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-white"
                  aria-hidden
                >
                  <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
                    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
