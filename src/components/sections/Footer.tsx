const EMAIL = "yashsharmaofficially@gmail.com";
const socials = [
  {
    label: "X",
    href: "https://x.com/buildwithyash",
    path: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.57l11.1 14.43Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/buildwithyash/",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" className="text-lg font-semibold tracking-[-0.03em]">
          cuckoo<span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-2">
          <a href={`mailto:${EMAIL}`} className="mr-2 text-base text-muted transition-colors hover:text-ink">
            {EMAIL}
          </a>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-paper hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
