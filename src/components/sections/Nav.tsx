"use client";

import { useState } from "react";
import CallButton from "@/components/ui/CallButton";

const links = ["work", "services", "process", "faq"];
const label = (l: string) => (l === "faq" ? "FAQ" : l);

// Toggles data-scrolled on <header> directly: no state, no re-render per scroll event.
function watchScroll(el: HTMLElement | null) {
  if (!el) return;
  const update = () => el.toggleAttribute("data-scrolled", window.scrollY > 24);
  update();
  window.addEventListener("scroll", update, { passive: true });
  return () => window.removeEventListener("scroll", update);
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
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
                  {label(l)}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <CallButton size="sm">Book a call</CallButton>
          </div>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="grid size-10 place-items-center rounded-full md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
      </header>

      {/* outside <header>: its transform and backdrop-filter would trap this fixed overlay */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onKeyDown={(e) => e.key === "Escape" && close()}
          className="fixed inset-0 z-[60] flex flex-col bg-paper md:hidden"
        >
          <div className="flex h-16 items-center justify-between px-5 sm:px-8">
            <a href="#top" onClick={close} className="text-2xl font-semibold tracking-[-0.03em]">
              cuckoo<span className="text-accent">.</span>
            </a>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              autoFocus
              className="grid size-10 place-items-center rounded-full"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col items-center justify-center gap-8 px-5">
            <ul className="flex flex-col items-center gap-6">
              {links.map((l) => (
                <li key={l}>
                  <a href={`#${l}`} onClick={close} className="text-4xl font-semibold tracking-[-0.03em] capitalize">
                    {label(l)}
                  </a>
                </li>
              ))}
            </ul>
            <CallButton className="w-full max-w-xs justify-center">Book a call</CallButton>
          </nav>
        </div>
      )}
    </>
  );
}
