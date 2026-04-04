'use client'
import { useEffect, useRef } from "react";

const bentoCards = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#C9A84C" opacity="0.9"/>
        <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#0F0F0F" opacity="0.12"/>
        <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#0F0F0F" opacity="0.08"/>
        <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#0F0F0F" opacity="0.05"/>
      </svg>
    ),
    title: "Finance Quiz",
    desc: "Daily bite-sized learning",
    accent: true,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 13L6.5 9L9.5 11L13.5 6L15 7.5" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="15" cy="5" r="1.5" fill="#C9A84C"/>
      </svg>
    ),
    title: "SIP Tracker",
    desc: "Mutual fund investments",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6.5" stroke="#0F0F0F" strokeWidth="1.3" opacity="0.2"/>
        <path d="M9 9L9 4.5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 9L13 11" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="9" r="1.5" fill="#0F0F0F"/>
      </svg>
    ),
    title: "Financial Score",
    desc: "Your financial strength",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 5H15M3 9H11M3 13H13" stroke="#0F0F0F" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: "Smart Blogs",
    desc: "Practical knowledge",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="11" width="3" height="4" rx="0.8" fill="#C9A84C"/>
        <rect x="7.5" y="8" width="3" height="7" rx="0.8" fill="#0F0F0F" opacity="0.3"/>
        <rect x="12" y="5" width="3" height="10" rx="0.8" fill="#0F0F0F"/>
      </svg>
    ),
    title: "Portfolio Insights",
    desc: "Visual growth charts",
  },
];

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".bento-card");
    if (!cards) return;
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(16px)";
      setTimeout(() => {
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 600 + i * 80);
    });
  }, []);

  return (
    <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start gap-16">
        {/* Left: text */}
        <div className="flex-1 max-w-xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F1E8] dark:bg-[#2a2518] border border-[#E8DFC0] dark:border-[#4a3f28] mb-8"
            style={{ animation: "fadeUp 0.6s ease both" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <span className="text-[12px] text-[#8B7340] dark:text-[#C9A84C] font-medium tracking-wide">Personal Finance, Simplified</span>
          </div>

          <h1
            className="text-[52px] leading-[1.1] font-semibold tracking-[-0.035em] text-[#0F0F0F] dark:text-white mb-6"
            style={{ animation: "fadeUp 0.6s ease 0.1s both", fontFamily: "'DM Serif Display', 'Georgia', serif" }}
          >
            Master Your Money.{" "}
            <span className="text-[#C9A84C]">One Smart</span>{" "}
            Decision at a Time.
          </h1>

          <p
            className="text-[16.5px] leading-[1.7] text-[#555] dark:text-[#aaa] mb-10 tracking-[-0.01em]"
            style={{ animation: "fadeUp 0.6s ease 0.2s both" }}
          >
            Learn personal finance, track SIP investments, and build lasting financial habits — with interactive quizzes and powerful tools built for everyday people.
          </p>

          <div
            className="flex items-center gap-4 flex-wrap"
            style={{ animation: "fadeUp 0.6s ease 0.3s both" }}
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F0F0F] dark:bg-white text-white dark:text-[#0F0F0F] text-[14px] rounded-xl font-medium hover:bg-[#2a2a2a] dark:hover:bg-[#e0e0e0] transition-all duration-200 shadow-sm tracking-[-0.01em]"
            >
             Chat with Arthsathi 
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="/tools"
              className="inline-flex items-center gap-1.5 text-[14px] text-[#555] dark:text-[#aaa] hover:text-[#0F0F0F] dark:hover:text-white transition-colors duration-200 tracking-[-0.01em] group"
            >
              Explore Tools
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200">
                <path d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div
            className="mt-12 flex items-center gap-6 text-[13px] text-[#888] dark:text-[#777]"
            style={{ animation: "fadeUp 0.6s ease 0.4s both" }}
          >
            {["10,000+ learners", "Free to start", "No credit card"].map((t, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Bento grid */}
        <div ref={containerRef} className="flex-1 w-full max-w-md">
          <div className="grid grid-cols-2 gap-3">
            {/* Large card top-left */}
            <div
              className="bento-card col-span-1 row-span-1 p-5 rounded-2xl bg-[#0F0F0F] dark:bg-white text-white dark:text-[#0F0F0F] cursor-pointer hover:-translate-y-0.5 transition-all duration-200"
              style={{ minHeight: 140 }}
            >
              <div className="mb-3">{bentoCards[0].icon}</div>
              <div className="text-[15px] font-semibold tracking-[-0.02em] mb-1">{bentoCards[0].title}</div>
              <div className="text-[12.5px] text-white/50 dark:text-[#0F0F0F]/50">{bentoCards[0].desc}</div>
              <div className="mt-4 text-[11px] font-medium text-[#C9A84C] tracking-wide uppercase">Today&apos;s quiz →</div>
            </div>

            {/* SIP Tracker */}
            <div
              className="bento-card p-5 rounded-2xl bg-[#F8F8F6] dark:bg-[#1a1a1a] border border-[#EBEBEB] dark:border-[#2a2a2a] cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              style={{ minHeight: 140 }}
            >
              <div className="mb-3">{bentoCards[1].icon}</div>
              <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em] mb-1">{bentoCards[1].title}</div>
              <div className="text-[12.5px] text-[#888] dark:text-[#777]">{bentoCards[1].desc}</div>
              {/* Mini sparkline */}
              <div className="mt-4 flex items-end gap-1 h-8">
                {[3, 5, 4, 6, 5, 7, 8].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-[#C9A84C] opacity-80" style={{ height: `${h * 3.5}px` }} />
                ))}
              </div>
            </div>

            {/* Health Score - wider */}
            <div
              className="bento-card col-span-2 p-5 rounded-2xl border border-[#EBEBEB] dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div>{bentoCards[2].icon}</div>
                    <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">{bentoCards[2].title}</div>
                  </div>
                  <div className="text-[12.5px] text-[#888] dark:text-[#777]">{bentoCards[2].desc}</div>
                </div>
                <div className="text-right">
                  <div className="text-[32px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.04em] leading-none">78</div>
                  <div className="text-[11px] text-[#C9A84C] font-medium mt-1">Good</div>
                </div>
              </div>
              <div className="mt-4 h-1.5 bg-[#F0F0F0] dark:bg-[#2a2a2a] rounded-full overflow-hidden">
                <div className="h-full bg-[#C9A84C] rounded-full" style={{ width: "78%" }} />
              </div>
            </div>

            {/* Smart Blogs */}
            <div
              className="bento-card p-5 rounded-2xl border border-[#EBEBEB] dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              <div className="mb-3">{bentoCards[3].icon}</div>
              <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em] mb-1">{bentoCards[3].title}</div>
              <div className="text-[12.5px] text-[#888] dark:text-[#777]">{bentoCards[3].desc}</div>
            </div>

            {/* Portfolio */}
            <div
              className="bento-card p-5 rounded-2xl bg-[#F5F1E8] dark:bg-[#2a2518] border border-[#E8DFC0] dark:border-[#4a3f28] cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              <div className="mb-3">{bentoCards[4].icon}</div>
              <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em] mb-1">{bentoCards[4].title}</div>
              <div className="text-[12.5px] text-[#8B7340] dark:text-[#C9A84C]">{bentoCards[4].desc}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
