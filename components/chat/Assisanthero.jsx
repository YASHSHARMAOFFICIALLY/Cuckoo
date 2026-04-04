import { useEffect, useRef } from "react";

function AIIcon() {
  return (
    <div className="relative w-14 h-14 mx-auto mb-6">
      <div className="w-14 h-14 rounded-2xl bg-[#0F0F0F] flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M13 3C13 3 7 6 7 13C7 20 13 23 13 23C13 23 19 20 19 13C19 6 13 3 13 3Z"
            stroke="#C9A84C"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="13" cy="13" r="3" fill="#C9A84C" opacity="0.9" />
          <path d="M13 7V9M13 17V19M7 13H9M17 13H19" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Pulse ring */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[#C9A84C] opacity-20 animate-ping" />
    </div>
  );
}

const CAPABILITY_PILLS = [
  { icon: "📊", label: "Investment advice" },
  { icon: "🧮", label: "SIP calculations" },
  { icon: "🎯", label: "Goal planning" },
  { icon: "📚", label: "Finance concepts" },
  { icon: "🧾", label: "Tax guidance" },
  { icon: "💡", label: "Savings strategies" },
];

export default function AssistantHero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.65s ease, transform 0.65s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <div ref={ref} className="text-center max-w-xl mx-auto px-4 pt-8 pb-6">
      <AIIcon />

      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F1E8] border border-[#E8DFC0] mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
        <span className="text-[12px] text-[#8B7340] font-medium tracking-wide">
          AI Finance Assistant · Powered by FinanceFlow
        </span>
      </div>

      <h1
        className="text-[34px] leading-[1.1] font-semibold tracking-[-0.03em] text-[#0F0F0F] mb-4"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        Your Personal AI <span className="text-[#C9A84C]">Finance</span> Assistant
      </h1>

      <p className="text-[15.5px] leading-[1.7] text-[#555] mb-8 tracking-[-0.01em]">
        Ask anything about investing, savings, or financial planning. I&apos;ll give you clear, jargon-free guidance tailored to your situation.
      </p>

      {/* Capability pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {CAPABILITY_PILLS.map(({ icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EBEBEB] text-[12.5px] text-[#555] font-medium shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            {icon} {label}
          </span>
        ))}
      </div>

      <p className="text-[12px] text-[#BBB] tracking-wide">
        Free to use · No sign-up required · Responses are educational, not financial advice
      </p>
    </div>
  );
}
