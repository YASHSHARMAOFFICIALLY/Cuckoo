

"use client"
import { useEffect, useRef } from "react";

const tools = [
  {
    id: "stock",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 14L7 9L10 12L14 7L19 10" stroke="#0F0F0F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="19" cy="8" r="2" fill="#C9A84C"/>
      </svg>
    ),
    name: "Stock Market Tool",
    desc: "Search and explore live stock data, price movements, and market insights in one clean view.",
    tag: "Markets",
    tagStyle: { background: "#F5F1E8", color: "#8B7340", border: "1px solid #E8DFC0" },
    href: "#stock-tool",
  },
  {
    id: "sip",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="3" stroke="#0F0F0F" strokeWidth="1.3"/>
        <path d="M7 15L9.5 9L12 13L14 11L16 15" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    name: "SIP Calculator",
    desc: "Project the future value of your systematic investments with expected rate and duration inputs.",
    tag: "Investing",
    tagStyle: { background: "#F0F5FF", color: "#4A6FA5", border: "1px solid #D0E0FF" },
    href: "#sip-calc",
  },
  {
    id: "emi",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 11H10L12 7L14 15L16 11H18" stroke="#0F0F0F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="1.5" fill="#C9A84C"/>
      </svg>
    ),
    name: "EMI Calculator",
    desc: "Find your monthly loan repayment amount, total interest and payment breakdown in seconds.",
    tag: "Debt",
    tagStyle: { background: "#FFF0F0", color: "#A04A4A", border: "1px solid #F8C8C8" },
    href: "#emi-calc",
  },
  {
    id: "goal",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="7.5" stroke="#0F0F0F" strokeWidth="1.3"/>
        <circle cx="11" cy="11" r="4" stroke="#C9A84C" strokeWidth="1.3"/>
        <circle cx="11" cy="11" r="1.5" fill="#0F0F0F"/>
      </svg>
    ),
    name: "Financial Goal Tracker",
    desc: "Set a savings target, input your current progress, and visualize the gap left to close.",
    tag: "Goals",
    tagStyle: { background: "#F0FBF4", color: "#3A7A5A", border: "1px solid #C0E8D0" },
    href: "#goal-tracker",
  },
];

function ToolCard({ tool, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, delay);
        obs.disconnect();
      }
    }, { threshold: 0.1 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="group p-7 rounded-2xl border border-[#E8E8E8] dark:border-[#2A2A2A] bg-white dark:bg-[#0F0F0F] hover:border-[#D0D0D0] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-pointer flex flex-col"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-11 h-11 rounded-xl bg-[#F8F8F6] dark:bg-[#1A1A1A] border border-[#F0F0F0] dark:border-[#2A2A2A] flex items-center justify-center group-hover:bg-[#F5F1E8] transition-colors duration-200">
          {tool.icon}
        </div>
        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={tool.tagStyle}>
          {tool.tag}
        </span>
      </div>

      <h3 className="text-[16px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em] mb-2">
        {tool.name}
      </h3>

      <p className="text-[13.5px] text-[#777] dark:text-[#A0A0A0] leading-relaxed tracking-[-0.01em] flex-1">
        {tool.desc}
      </p>

      <a
        href={tool.href}
        className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0F0F0F] dark:text-white bg-[#F8F8F6] dark:bg-[#1A1A1A] border border-[#EBEBEB] dark:border-[#2A2A2A] px-4 py-2 rounded-lg hover:bg-[#0F0F0F] hover:text-white hover:border-[#0F0F0F] transition-all duration-200 self-start"
      >
        Open Tool
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
}

export default function ToolsGrid() {
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.1 });

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="tools-grid" className="py-16 px-6 bg-[#FAFAF8] dark:bg-black">
      <div className="max-w-6xl mx-auto">
        
        <div ref={headerRef} className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A] mb-4">
              <span className="text-[12px] text-[#666] dark:text-[#A0A0A0] font-medium tracking-wide">
                All Tools
              </span>
            </div>

            <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-[#0F0F0F] dark:text-white">
              Pick a tool to get started
            </h2>
          </div>

          <p className="text-[14px] text-[#888] dark:text-[#A0A0A0] max-w-xs leading-relaxed">
            4 calculators. All free. No sign-up required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((t, i) => (
            <ToolCard key={t.id} tool={t} delay={i * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}