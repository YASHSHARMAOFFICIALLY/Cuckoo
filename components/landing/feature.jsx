// 'use client'
// import { useEffect, useRef } from "react";

// function useScrollReveal(threshold = 0.15) {
//   const ref = useRef(null);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     el.style.opacity = "0";
//     el.style.transform = "translateY(24px)";
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
//           el.style.opacity = "1";
//           el.style.transform = "translateY(0)";
//           obs.disconnect();
//         }
//       },
//       { threshold }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);
//   return ref;
// }

// function QuizMockup() {
//   return (
//     <div className="w-full bg-white dark:bg-[#1a1a1a] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
//       <div className="text-[11px] font-medium text-[#888] dark:text-[#777] uppercase tracking-wider mb-4">Daily Quiz · Day 12</div>
//       <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white leading-snug mb-5 tracking-[-0.01em]">
//         What is a key benefit of compound interest over simple interest?
//       </div>
//       <div className="space-y-2.5">
//         {[
//           { label: "A", text: "Lower risk exposure", correct: false },
//           { label: "B", text: "Interest earns interest over time", correct: true },
//           { label: "C", text: "Fixed guaranteed returns", correct: false },
//           { label: "D", text: "No tax implications", correct: false },
//         ].map((opt) => (
//           <div
//             key={opt.label}
//             className={`flex items-center gap-3 p-3 rounded-xl border text-[13.5px] ${
//               opt.correct
//                 ? "border-[#C9A84C] bg-[#FBF7EC] dark:bg-[#2a2518] text-[#8B7340] dark:text-[#C9A84C] font-medium"
//                 : "border-[#F0F0F0] dark:border-[#2a2a2a] text-[#555] dark:text-[#aaa]"
//             }`}
//           >
//             <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-semibold ${opt.correct ? "bg-[#C9A84C] text-white" : "bg-[#F5F5F5] dark:bg-[#2a2a2a] text-[#999] dark:text-[#777]"}`}>
//               {opt.label}
//             </span>
//             {opt.text}
//             {opt.correct && (
//               <svg className="ml-auto" width="14" height="14" viewBox="0 0 14 14" fill="none">
//                 <path d="M3 7L6 10L11 4" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="mt-5 flex items-center gap-3">
//         <div className="flex-1 h-1.5 bg-[#F0F0F0] dark:bg-[#2a2a2a] rounded-full">
//           <div className="h-full w-3/5 bg-[#0F0F0F] dark:bg-white rounded-full" />
//         </div>
//         <span className="text-[12px] text-[#888] dark:text-[#777]">3 of 5</span>
//       </div>
//     </div>
//   );
// }

// function SIPMockup() {
//   const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
//   const invested = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
//   const returns = [10, 21, 33, 46, 60, 75, 91, 109, 129, 151, 175, 201];
//   const max = 210;

//   return (
//     <div className="w-full bg-white dark:bg-[#1a1a1a] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
//       <div className="flex items-center justify-between mb-1">
//         <div className="text-[13.5px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em]">Portfolio Growth</div>
//         <div className="text-[12px] text-[#888] dark:text-[#777]">12 months</div>
//       </div>
//       <div className="flex items-baseline gap-2 mb-5">
//         <span className="text-[26px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.04em]">₹2,01,000</span>
//         <span className="text-[12px] font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">+67.5%</span>
//       </div>
//       <div className="flex items-end gap-1 h-28">
//         {months.map((m, i) => (
//           <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
//             <div className="w-full flex flex-col justify-end gap-px" style={{ height: 96 }}>
//               <div
//                 className="w-full rounded-sm bg-[#C9A84C] opacity-40 rounded-t-sm"
//                 style={{ height: `${(invested[i] / max) * 96}px` }}
//               />
//               <div
//                 className="w-full rounded-t-sm bg-[#0F0F0F] dark:bg-white"
//                 style={{
//                   height: `${Math.max(0, ((returns[i] - invested[i]) / max) * 96)}px`,
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex gap-1 mt-2">
//         {months.map((m,i) => (
//           <div key={`${m}-${i}`} className="flex-1 text-center text-[9px] text-[#bbb] dark:text-[#555]">{m}</div>
//         ))}
//       </div>
//       <div className="mt-4 flex gap-4 text-[12px] text-[#888] dark:text-[#777]">
//         <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#C9A84C] opacity-50" />Invested</span>
//         <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#0F0F0F] dark:bg-white" />Returns</span>
//       </div>
//     </div>
//   );
// }

// function ScoreMockup() {
//   const metrics = [
//     { label: "Emergency Fund", value: 85, color: "#C9A84C" },
//     { label: "Debt-to-Income", value: 62, color: "#0F0F0F" },
//     { label: "Investment Rate", value: 74, color: "#888" },
//     { label: "Insurance Cover", value: 90, color: "#C9A84C" },
//   ];

//   return (
//     <div className="w-full bg-white dark:bg-[#1a1a1a] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
//       <div className="flex items-center justify-between mb-5">
//         <div className="text-[13.5px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em]">Financial Health Score</div>
//         <div className="w-10 h-10 rounded-full bg-[#F5F1E8] dark:bg-[#2a2518] border-2 border-[#C9A84C] flex items-center justify-center">
//           <span className="text-[14px] font-bold text-[#8B7340] dark:text-[#C9A84C]">78</span>
//         </div>
//       </div>
//       <div className="space-y-4">
//         {metrics.map((m) => (
//           <div key={m.label}>
//             <div className="flex items-center justify-between mb-1.5">
//               <span className="text-[12.5px] text-[#555] dark:text-[#aaa]">{m.label}</span>
//               <span className="text-[12px] font-semibold text-[#0F0F0F] dark:text-white">{m.value}</span>
//             </div>
//             <div className="h-1.5 bg-[#F0F0F0] dark:bg-[#2a2a2a] rounded-full overflow-hidden">
//               <div className="h-full rounded-full transition-all duration-700" style={{ width: `${m.value}%`, background: m.color }} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const features = [
//   {
//     number: "01",
//     title: "Learn Finance With Quizzes",
//     desc: "Short daily quizzes that build real financial knowledge — from mutual funds to tax planning. Each question comes with a clear explanation so you actually understand, not just answer.",
//     tags: ["Daily Questions", "Explanations", "Streaks"],
//     mockup: <QuizMockup />,
//   },
//   {
//     number: "02",
//     title: "Track SIP & Investments",
//     desc: "Monitor your mutual fund growth with visual charts. See invested vs returns, set target goals, and get a clear picture of how your SIPs are performing month after month.",
//     tags: ["Real-time Charts", "Goal Tracking", "SIP Summary"],
//     mockup: <SIPMockup />,
//   },
//   {
//     number: "03",
//     title: "Financial Health Score",
//     desc: "See exactly how financially strong you are based on your savings, investments, debt, and insurance. Get a personalized score and actionable steps to improve every metric.",
//     tags: ["Personalized Score", "Actionable Tips", "Progress Tracking"],
//     mockup: <ScoreMockup />,
//   },
// ];

// export default function Features() {
//   return (
//     <section className="py-24 px-6 max-w-6xl mx-auto">
//       <FeatureHeader />
//       <div className="space-y-24">
//         {features.map((f, i) => (
//           <FeatureRow key={f.number} feature={f} reverse={i % 2 !== 0} />
//         ))}
//       </div>
//     </section>
//   );
// }

// function FeatureHeader() {
//   const ref = useScrollReveal();
//   return (
//     <div ref={ref} className="text-center mb-20">
//       <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F5F3] dark:bg-[#1a1a1a] border border-[#E8E8E8] dark:border-[#2a2a2a] mb-5">
//         <span className="text-[12px] text-[#666] dark:text-[#aaa] font-medium tracking-wide">Core Features</span>
//       </div>
//       <h2 className="text-[38px] font-semibold tracking-[-0.03em] text-[#0F0F0F] dark:text-white max-w-xl mx-auto leading-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
//         Everything you need to take control of your money
//       </h2>
//     </div>
//   );
// }

// function FeatureRow({ feature, reverse }) {
//   const ref = useScrollReveal();
//   return (
//     <div
//       ref={ref}
//       className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${reverse ? "lg:flex-row-reverse" : ""}`}
//     >
//       {/* Text */}
//       <div className="flex-1 max-w-md">
//         <div className="text-[11px] font-semibold text-[#C9A84C] tracking-[0.12em] uppercase mb-4">{feature.number}</div>
//         <h3 className="text-[28px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.025em] mb-4 leading-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
//           {feature.title}
//         </h3>
//         <p className="text-[15.5px] leading-relaxed text-[#555] dark:text-[#aaa] mb-6 tracking-[-0.01em]">{feature.desc}</p>
//         <div className="flex flex-wrap gap-2">
//           {feature.tags.map((tag) => (
//             <span
//               key={tag}
//               className="text-[12px] px-3 py-1.5 rounded-full bg-[#F5F5F3] dark:bg-[#1a1a1a] border border-[#E8E8E8] dark:border-[#2a2a2a] text-[#666] dark:text-[#aaa] font-medium"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//         <a href="#" className="mt-8 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#0F0F0F] dark:text-white hover:text-[#C9A84C] dark:hover:text-[#C9A84C] transition-colors duration-200 group tracking-[-0.01em]">
//           Learn more
//           <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200">
//             <path d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//         </a>
//       </div>

//       {/* Mockup */}
//       <div className="flex-1 w-full max-w-md">
//         {feature.mockup}
//       </div>
//     </div>
//   );
// }

'use client'
import { useEffect, useRef } from "react";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function QuizMockup() {
  return (
    <div className="w-full bg-white dark:bg-[#1a1a1a] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <div className="text-[10.5px] font-semibold text-[#999] dark:text-[#666] uppercase tracking-[0.1em] mb-4">
        Daily Quiz · Day 12
      </div>
      <div className="text-[14.5px] font-semibold text-[#0F0F0F] dark:text-white leading-snug mb-4 tracking-[-0.01em]">
        What is a key benefit of compound interest over simple interest?
      </div>
      <div className="space-y-2">
        {[
          { label: "A", text: "Lower risk exposure", correct: false },
          { label: "B", text: "Interest earns interest over time", correct: true },
          { label: "C", text: "Fixed guaranteed returns", correct: false },
          { label: "D", text: "No tax implications", correct: false },
        ].map((opt) => (
          <div
            key={opt.label}
            className={`flex items-center gap-3 p-2.5 rounded-xl border text-[13px] ${
              opt.correct
                ? "border-[#C9A84C] bg-[#C9A84C]/[0.08] text-[#8B7340] dark:text-[#C9A84C] font-medium"
                : "border-[#F0F0F0] dark:border-[#2a2a2a] text-[#666] dark:text-[#aaa]"
            }`}
          >
            <span
              className={`w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center text-[11px] font-semibold ${
                opt.correct
                  ? "bg-[#C9A84C] text-white"
                  : "bg-[#F5F5F5] dark:bg-[#2a2a2a] text-[#999] dark:text-[#777]"
              }`}
            >
              {opt.label}
            </span>
            {opt.text}
            {opt.correct && (
              <svg className="ml-auto flex-shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7L6 10L11 4" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-1 bg-[#F0F0F0] dark:bg-[#2a2a2a] rounded-full overflow-hidden">
          <div className="h-full w-3/5 bg-[#0F0F0F] dark:bg-white rounded-full" />
        </div>
        <span className="text-[11.5px] text-[#999] dark:text-[#666]">3 of 5</span>
      </div>
    </div>
  );
}

function SIPMockup() {
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const invested = [10,20,30,40,50,60,70,80,90,100,110,120];
  const returns  = [10,21,33,46,60,75,91,109,129,151,175,201];
  const MAX = 210;
  const H = 88;

  return (
    <div className="w-full bg-white dark:bg-[#1a1a1a] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[13.5px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em]">Portfolio Growth</div>
        <div className="text-[11.5px] text-[#999] dark:text-[#666]">12 months</div>
      </div>
      <div className="text-[26px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.04em] leading-none mt-1 mb-1">₹2,01,000</div>
      <div className="inline-block text-[11.5px] font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full mb-4">
        +67.5%
      </div>

      {/* Bar chart — returns on top, invested at bottom */}
      <div className="flex items-end gap-[3px]" style={{ height: H }}>
        {months.map((_, i) => {
          const invH = Math.round((invested[i] / MAX) * H);
          const retH = Math.max(0, Math.round(((returns[i] - invested[i]) / MAX) * H));
          return (
            <div key={i} className="flex-1 flex flex-col justify-end" style={{ height: H, gap: 1 }}>
              {/* Returns segment (top) */}
              <div
                className="w-full rounded-t-sm bg-[#0F0F0F] dark:bg-white"
                style={{ height: retH }}
              />
              {/* Invested segment (bottom) */}
              <div
                className="w-full bg-[#C9A84C] opacity-45"
                style={{ height: invH }}
              />
            </div>
          );
        })}
      </div>

      {/* Month labels */}
      <div className="flex gap-[3px] mt-1.5">
        {months.map((m, i) => (
          <div key={i} className="flex-1 text-center text-[8.5px] text-[#ccc] dark:text-[#555]">{m}</div>
        ))}
      </div>

      <div className="mt-3.5 flex gap-4 text-[11.5px] text-[#888] dark:text-[#777]">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#C9A84C] opacity-50 inline-block" />
          Invested
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#0F0F0F] dark:bg-white inline-block" />
          Returns
        </span>
      </div>
    </div>
  );
}

function ScoreMockup() {
  const metrics = [
    { label: "Emergency Fund",  value: 85, color: "#C9A84C" },
    { label: "Debt-to-Income",  value: 62, color: "#0F0F0F" },
    { label: "Investment Rate", value: 74, color: "#888" },
    { label: "Insurance Cover", value: 90, color: "#C9A84C" },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#1a1a1a] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between mb-5">
        <div className="text-[13.5px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em]">Financial Health Score</div>
        <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 border-2 border-[#C9A84C] flex items-center justify-center">
          <span className="text-[13px] font-bold text-[#8B7340] dark:text-[#C9A84C]">78</span>
        </div>
      </div>
      <div className="space-y-3.5">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12.5px] text-[#666] dark:text-[#aaa]">{m.label}</span>
              <span className="text-[12px] font-semibold text-[#0F0F0F] dark:text-white">{m.value}</span>
            </div>
            <div className="h-1 bg-[#F0F0F0] dark:bg-[#2a2a2a] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${m.value}%`, background: m.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    number: "01",
    title: "Learn Finance With Quizzes",
    desc: "Short daily quizzes that build real financial knowledge — from mutual funds to tax planning. Each question comes with a clear explanation so you actually understand, not just answer.",
    tags: ["Daily Questions", "Explanations", "Streaks"],
    mockup: <QuizMockup />,
  },
  {
    number: "02",
    title: "Track SIP & Investments",
    desc: "Monitor your mutual fund growth with visual charts. See invested vs returns, set target goals, and get a clear picture of how your SIPs are performing month after month.",
    tags: ["Real-time Charts", "Goal Tracking", "SIP Summary"],
    mockup: <SIPMockup />,
  },
  {
    number: "03",
    title: "Financial Health Score",
    desc: "See exactly how financially strong you are based on your savings, investments, debt, and insurance. Get a personalized score and actionable steps to improve every metric.",
    tags: ["Personalized Score", "Actionable Tips", "Progress Tracking"],
    mockup: <ScoreMockup />,
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <FeatureHeader />
      <div className="space-y-24">
        {features.map((f, i) => (
          <FeatureRow key={f.number} feature={f} reverse={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
}

function FeatureHeader() {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="text-center mb-20">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F5F3] dark:bg-[#1a1a1a] border border-[#E8E8E8] dark:border-[#2a2a2a] mb-5">
        <span className="text-[12px] text-[#666] dark:text-[#aaa] font-medium tracking-wide">Core Features</span>
      </div>
      <h2
        className="text-[38px] font-semibold tracking-[-0.03em] text-[#0F0F0F] dark:text-white max-w-xl mx-auto leading-tight"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        Everything you need to take control of your money
      </h2>
    </div>
  );
}

function FeatureRow({ feature, reverse }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      // KEY FIX: use grid instead of flex so both columns are always equal width
      // and use col-start to swap order for reversed rows — no flex-row-reverse needed
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
    >
      <div className={reverse ? "lg:col-start-2" : ""}>
        {/* Text */}
        <div className="text-[11px] font-semibold text-[#C9A84C] tracking-[0.12em] uppercase mb-4">
          {feature.number}
        </div>
        <h3
          className="text-[28px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.025em] mb-4 leading-tight"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          {feature.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-[#555] dark:text-[#aaa] mb-6 tracking-[-0.01em]">
          {feature.desc}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {feature.tags.map((tag) => (
            <span
              key={tag}
              className="text-[12px] px-3 py-1.5 rounded-full bg-[#F5F5F3] dark:bg-[#1a1a1a] border border-[#E8E8E8] dark:border-[#2a2a2a] text-[#666] dark:text-[#aaa] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <a 
          href="#"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#0F0F0F] dark:text-white hover:text-[#C9A84C] dark:hover:text-[#C9A84C] transition-colors duration-200 group tracking-[-0.01em]">
        
          Learn more
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200">
            <path d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Mockup — always col 1 or col 2 depending on reverse */}
      <div className={reverse ? "lg:col-start-1 lg:row-start-1" : ""}>
        {feature.mockup}
      </div>
    </div>
  );
}