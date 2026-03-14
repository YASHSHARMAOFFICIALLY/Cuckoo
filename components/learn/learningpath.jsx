import { useScrollReveal } from "../hooks/useScrollReveal";
import { useRef, useEffect } from "react";

const STEPS = [
  {
    step: "01",
    title: "Budgeting Basics",
    description:
      "Understand where your money goes. Learn the 50/30/20 rule and build a simple monthly budget that sticks.",
    duration: "~1 week",
    tag: "Foundation",
    tagStyle: { bg: "#F5F1E8", text: "#8B7340", border: "#E8DFC0" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2.5" stroke="#0F0F0F" strokeWidth="1.3" />
        <path d="M7 7H13M7 10H11M7 13H12" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Emergency Fund",
    description:
      "Before investing a single rupee, build 3–6 months of expenses in a liquid account. This is your financial foundation.",
    duration: "~1 month",
    tag: "Protection",
    tagStyle: { bg: "#F0FBF4", text: "#3A7A5A", border: "#C0E8D0" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3L17 6V11C17 14.314 13.866 17.124 10 18C6.134 17.124 3 14.314 3 11V6L10 3Z" stroke="#0F0F0F" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M7.5 10L9.5 12L13 8" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Mutual Funds & SIPs",
    description:
      "Start your investment journey with ₹500/month. Learn how to pick mutual funds based on your risk profile and goals.",
    duration: "~2 weeks",
    tag: "Investing",
    tagStyle: { bg: "#F0F5FF", text: "#4A6FA5", border: "#D0E0FF" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 14L7 9L10 12L13 7.5L17 5" stroke="#0F0F0F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="5" r="2" fill="#C9A84C" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Stock Market Basics",
    description:
      "Understand how equity markets work. Learn about Nifty 50, how to read a balance sheet, and what makes a good stock.",
    duration: "~3 weeks",
    tag: "Equities",
    tagStyle: { bg: "#FFF0F0", text: "#A04A4A", border: "#F8C8C8" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="4" y="12" width="3" height="5" rx="0.8" fill="#C9A84C" />
        <rect x="8.5" y="8" width="3" height="9" rx="0.8" fill="#0F0F0F" opacity="0.3" />
        <rect x="13" y="4" width="3" height="13" rx="0.8" fill="#0F0F0F" />
      </svg>
    ),
  },
  {
    step: "05",
    title: "Long-term Wealth Building",
    description:
      "Master asset allocation, portfolio rebalancing, tax-efficient investing (ELSS, PPF), and the psychology of staying the course.",
    duration: "Ongoing",
    tag: "Advanced",
    tagStyle: { bg: "#F8F0FF", text: "#7A4AA0", border: "#E0C8F8" },
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="#0F0F0F" strokeWidth="1.3" />
        <path d="M10 10L10 5.5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 10L13.5 12" stroke="#0F0F0F" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="10" cy="10" r="1.5" fill="#0F0F0F" />
      </svg>
    ),
  },
];

function StepCard({ step, index, total, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const isLast = index === total - 1;

  return (
    <div ref={ref} className="flex gap-5">
      {/* Left: step indicator + connector line */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-[#0F0F0F] flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
          {step.icon}
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-2 mb-0" style={{ background: "linear-gradient(to bottom, #E0E0E0, transparent)", minHeight: 32 }} />
        )}
      </div>

      {/* Right: content */}
      <div className={`flex-1 ${!isLast ? "pb-8" : "pb-0"}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[11px] font-bold text-[#C9A84C] tracking-[0.1em] uppercase">
            Step {step.step}
          </span>
          <span
            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
            style={{
              background: step.tagStyle.bg,
              color: step.tagStyle.text,
              border: `1px solid ${step.tagStyle.border}`,
            }}
          >
            {step.tag}
          </span>
          <span className="text-[11.5px] text-[#AAA] ml-auto">{step.duration}</span>
        </div>

        <h3 className="text-[16px] font-semibold text-[#0F0F0F] tracking-[-0.02em] mb-2">
          {step.title}
        </h3>
        <p className="text-[13.5px] text-[#666] leading-relaxed tracking-[-0.01em]">
          {step.description}
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-1.5 mt-3 text-[12.5px] font-medium text-[#888] hover:text-[#0F0F0F] transition-colors duration-150"
        >
          Start this step
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function LearningPath() {
  const headerRef = useScrollReveal();

  return (
    <section id="path" className="py-20 px-6 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: header */}
          <div ref={headerRef} className="lg:w-80 flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8E8E8] mb-5">
              <span className="text-[12px] text-[#666] font-medium tracking-wide">Learning Roadmap</span>
            </div>
            <h2
              className="text-[34px] font-semibold tracking-[-0.03em] text-[#0F0F0F] leading-tight mb-5"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Your path to financial mastery
            </h2>
            <p className="text-[15px] text-[#666] leading-relaxed tracking-[-0.01em] mb-6">
              A structured roadmap designed for beginners. Follow these five steps in order and you'll go from confused to confident in your money decisions.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E8E8]">
              <div className="text-[12px] text-[#888] uppercase tracking-wider font-medium mb-3">
                Your Progress
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-[#0F0F0F] rounded-full" style={{ width: "0%" }} />
                </div>
                <span className="text-[12px] font-semibold text-[#0F0F0F]">0%</span>
              </div>
              <p className="text-[12px] text-[#AAA]">Begin Step 1 to start your journey</p>
            </div>
          </div>

          {/* Right: steps */}
          <div className="flex-1">
            {STEPS.map((step, i) => (
              <StepCard
                key={step.step}
                step={step}
                index={i}
                total={STEPS.length}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}