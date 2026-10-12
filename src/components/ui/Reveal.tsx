"use client";

// Module-level ref callback: stable identity, React 19 runs the returned cleanup on unmount.
function observe(el: HTMLElement | null) {
  if (!el) return;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      el.dataset.shown = "";
      io.disconnect();
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  io.observe(el);
  return () => io.disconnect();
}

type Props = { children: React.ReactNode; className?: string; delay?: number };

export default function Reveal({ children, className, delay = 0 }: Props) {
  return (
    <div ref={observe} data-reveal className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
