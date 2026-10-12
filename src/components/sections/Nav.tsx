"use client";

import CallButton from "@/components/ui/CallButton";

const links = ["work", "services", "process", "faq"];

// Toggles data-scrolled on <header> directly: no state, no re-render per scroll event.
function watchScroll(el: HTMLElement | null) {
  if (!el) return;
  const update = () => el.toggleAttribute("data-scrolled", window.scrollY > 24);
  update();
  window.addEventListener("scroll", update, { passive: true });
  return () => window.removeEventListener("scroll", update);
}

export default function Nav() {
  return (
    <header ref={watchScroll} className="group fixed inset-x-0 top-0 z-50 px-3">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 rounded-full border border-transparent px-5 lg:px-12 transition-[max-width,height,transform,background-color,border-color,box-shadow,padding] duration-300 ease-out sm:px-8 motion-reduce:transition-none group-data-scrolled:h-14 group-data-scrolled:max-w-[760px] group-data-scrolled:translate-y-3 group-data-scrolled:border-line group-data-scrolled:bg-white/70 group-data-scrolled:pr-2 group-data-scrolled:pl-6 group-data-scrolled:shadow-[0_8px_30px_-12px_rgb(24_24_27/0.18)] group-data-scrolled:backdrop-blur-xl sm:group-data-scrolled:pr-2 lg:group-data-scrolled:pl-6"
      >
        <a href="#top" className="text-2xl font-semibold tracking-[-0.03em]">
          cuckoo<span className="text-accent">.</span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l}`} className="text-base font-medium text-muted capitalize transition-colors hover:text-ink">
                {l === "faq" ? "FAQ" : l}
              </a>
            </li>
          ))}
        </ul>
        <CallButton size="sm">Book a call</CallButton>
      </nav>
    </header>
  );
}
