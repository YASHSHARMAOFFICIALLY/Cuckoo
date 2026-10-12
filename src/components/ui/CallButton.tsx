export const CALENDLY_URL = "https://calendly.com/buildwithyashx";

type Props = { children: React.ReactNode; size?: "sm" | "lg" };

export default function CallButton({ children, size = "lg" }: Props) {
  const sm = size === "sm";
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/btn inline-flex items-center rounded-full bg-accent font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_1px_2px_rgb(24_24_27/0.12)] transition-[background-color,transform] duration-200 hover:bg-accent-hover active:scale-[0.98] ${
        sm ? "h-10 gap-2.5 pr-1.5 pl-4 text-sm" : "h-12 gap-3 pr-1.5 pl-5 text-base"
      }`}
    >
      {children}
      <span className={`grid place-items-center rounded-full bg-white/20 text-white ${sm ? "size-7" : "size-9"}`} aria-hidden>
        <svg viewBox="0 0 16 16" fill="none" className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-px group-hover/btn:-translate-y-px">
          <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
