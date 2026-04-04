// "use client"
// import { useEffect, useState } from "react";

// // ── Confetti launcher ──────────────────────────────────────
// const CONFETTI_COLORS = [
//   "#C9A84C", "#0F0F0F", "#D97070", "#4A6FA5", "#3A7A5A", "#E8DFC0", "#F5F1E8",
// ];

// function launchConfetti() {
//   const wrap = document.createElement("div");
//   wrap.style.cssText =
//     "position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;";
//   document.body.appendChild(wrap);

//   for (let i = 0; i < 70; i++) {
//     setTimeout(() => {
//       const p = document.createElement("div");
//       const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
//       const size = 6 + Math.random() * 8;
//       const left = Math.random() * 100;
//       const duration = 2.5 + Math.random() * 2;
//       const delay = Math.random() * 0.8;
//       const isCircle = Math.random() > 0.5;
//       p.style.cssText = `
//         position: absolute;
//         width: ${size}px;
//         height: ${size}px;
//         background: ${color};
//         left: ${left}%;
//         top: -12px;
//         border-radius: ${isCircle ? "50%" : "2px"};
//         animation: confettiFall ${duration}s ${delay}s ease-in forwards;
//       `;
//       wrap.appendChild(p);
//     }, i * 18);
//   }

//   setTimeout(() => wrap.remove(), 5500);
// }

// // ── Animated score ring ────────────────────────────────────
// function ScoreRing({ score, total }) {
//   const pct = score / total;
//   const r = 68, cx = 80, cy = 80, sw = 10;
//   const circumference = 2 * Math.PI * r;
//   const [dashOffset, setDashOffset] = useState(circumference);

//   useEffect(() => {
//     const t = setTimeout(
//       () => setDashOffset(circumference - pct * circumference),
//       400
//     );
//     return () => clearTimeout(t);
//   }, []);

//   const ringColor =
//     pct >= 0.8 ? "#C9A84C" : pct >= 0.5 ? "#4A6FA5" : "#D97070";

//   return (
//     <svg width="160" height="160" viewBox="0 0 160 160">
//       {/* Track */}
//       <circle
//         cx={cx} cy={cy} r={r}
//         fill="none"
//         stroke="#F0F0F0"
//         strokeWidth={sw}
//       />
//       {/* Fill */}
//       <circle
//         cx={cx} cy={cy} r={r}
//         fill="none"
//         stroke={ringColor}
//         strokeWidth={sw}
//         strokeDasharray={circumference}
//         strokeDashoffset={dashOffset}
//         strokeLinecap="round"
//         transform={`rotate(-90 ${cx} ${cy})`}
//         style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) 0.3s" }}
//       />
//       {/* Score text */}
//       <text
//         x={cx} y={cy - 8}
//         textAnchor="middle"
//         fontSize="34"
//         fontWeight="700"
//         fill="#0F0F0F"
//         fontFamily="'DM Serif Display', Georgia, serif"
//       >
//         {score}
//       </text>
//       <text
//         x={cx} y={cy + 16}
//         textAnchor="middle"
//         fontSize="14"
//         fill="#BBB"
//         fontFamily="'DM Sans', sans-serif"
//       >
//         of {total}
//       </text>
//     </svg>
//   );
// }

// // ── Result content helpers ─────────────────────────────────
// function getResultContent(pct) {
//   if (pct === 1) return {
//     emoji: "🎯",
//     message: "Perfect score! You're a genuine finance expert.",
//     level: "Finance Expert",
//     levelDesc: "You're ready to mentor others on their financial journey.",
//     strength: "You have mastery over SIPs, compound interest, index funds, diversification, tax planning, and budgeting frameworks.",
//     improve: "Explore advanced topics like derivatives, asset allocation strategies, and international investing.",
//   };
//   if (pct >= 0.8) return {
//     emoji: "🌟",
//     message: "Impressive result! Your financial knowledge is top-tier.",
//     level: "Advanced Learner",
//     levelDesc: "You're well on your way to becoming a finance pro.",
//     strength: "You understand investing fundamentals, compound interest, SIPs, and core budgeting concepts very well.",
//     improve: "Deepen your knowledge of tax planning (Section 80C), inflation's impact on real returns, and portfolio rebalancing.",
//   };
//   if (pct >= 0.6) return {
//     emoji: "📈",
//     message: "Good work! You have a solid financial foundation.",
//     level: "Intermediate",
//     levelDesc: "Keep practising with daily quizzes to level up faster.",
//     strength: "You grasp basic investing concepts like SIPs, EMIs, and the purpose of diversification.",
//     improve: "Focus on understanding inflation, the Rule of 72, index funds, and how the 50/30/20 budgeting rule works.",
//   };
//   if (pct >= 0.4) return {
//     emoji: "💪",
//     message: "A decent start — keep learning and you'll get there.",
//     level: "Beginner+",
//     levelDesc: "You're building a foundation. Consistency is everything.",
//     strength: "You know the basics of banking products and the difference between saving and investing.",
//     improve: "Start with compound interest, SIPs, and government bonds. Read one finance article per day.",
//   };
//   return {
//     emoji: "🚀",
//     message: "Every expert started somewhere. Let's build your knowledge!",
//     level: "Beginner",
//     levelDesc: "Explore our learning resources to get up to speed quickly.",
//     strength: "You've taken the first step by attempting the quiz — that curiosity is your biggest asset.",
//     improve: "Start with the basics: what is compound interest, how does a SIP work, and what is diversification.",
//   };
// }

// // ── Main QuizResult ────────────────────────────────────────
// export default function QuizResult({ score, total, onRetry }) {
//   const pct = score / total;
//   const content = getResultContent(pct);

//   useEffect(() => {
//     if (pct >= 0.6) setTimeout(launchConfetti, 500);
//   }, []);

//   return (
//     <div className="max-w-[680px] mx-auto px-6 pb-24">
//       <div
//         className="bg-white border border-[#E8E8E8] rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.07)] overflow-hidden"
//         style={{ animation: "bounceIn 0.6s cubic-bezier(0.4,0,0.2,1) both" }}
//       >
//         {/* Top: score ring */}
//         <div className="px-10 pt-10 pb-8 text-center">
//           <div className="text-[12px] font-semibold text-[#888] uppercase tracking-[0.1em] mb-6">
//             Your Score
//           </div>
//           <div className="flex justify-center mb-5">
//             <ScoreRing score={score} total={total} />
//           </div>
//           <div className="text-[28px] mb-2">{content.emoji}</div>
//           <p className="text-[16.5px] text-[#333] font-medium leading-[1.5] tracking-[-0.01em] max-w-[360px] mx-auto">
//             {content.message}
//           </p>
//         </div>

//         {/* Insights */}
//         <div className="px-8 pb-8 flex flex-col gap-3">
//           {/* Strength */}
//           <div className="p-5 rounded-2xl bg-[#FBF7EC] border border-[#E8DFC0]">
//             <div className="text-[11px] font-bold text-[#8B7340] uppercase tracking-[0.1em] mb-2">
//               💪 Strengths
//             </div>
//             <div className="text-[13.5px] text-[#555] leading-relaxed tracking-[-0.01em]">
//               {content.strength}
//             </div>
//           </div>

//           {/* Improve */}
//           <div className="p-5 rounded-2xl bg-[#FDF3F3] border border-[#F0CCCC]">
//             <div className="text-[11px] font-bold text-[#9A4A4A] uppercase tracking-[0.1em] mb-2">
//               📚 Areas to Improve
//             </div>
//             <div className="text-[13.5px] text-[#555] leading-relaxed tracking-[-0.01em]">
//               {content.improve}
//             </div>
//           </div>

//           {/* Level */}
//           <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#EBEBEB]">
//             <div className="flex items-center justify-between mb-2">
//               <div className="text-[11px] font-bold text-[#888] uppercase tracking-[0.1em]">
//                 🏆 Your Level
//               </div>
//               <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-[#F5F1E8] border border-[#E8DFC0] text-[#8B7340]">
//                 {content.level}
//               </span>
//             </div>
//             <div className="text-[13.5px] text-[#555] leading-relaxed tracking-[-0.01em]">
//               {content.levelDesc}
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="px-8 pb-9 flex gap-3 flex-wrap">
//           <button
//             onClick={onRetry}
//             className="flex-1 py-3.5 rounded-[14px] bg-[#0F0F0F] text-white text-[14px] font-medium tracking-[-0.01em] hover:bg-[#2a2a2a] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all duration-200 min-w-[140px]"
//           >
//             ↺ Retry Quiz
//           </button>
//           <button
//             onClick={() => (window.location.href = "#")}
//             className="flex-1 py-3.5 rounded-[14px] bg-white text-[#0F0F0F] text-[14px] font-medium tracking-[-0.01em] border-[1.5px] border-[#EBEBEB] hover:border-[#0F0F0F] hover:-translate-y-0.5 transition-all duration-200 min-w-[140px]"
//           >
//             Explore Finance Tools →
//           </button>
//         </div>
//       </div>

//       <style>{`
//         @keyframes bounceIn {
//           0%   { transform: scale(0.5); opacity: 0; }
//           60%  { transform: scale(1.04); opacity: 1; }
//           80%  { transform: scale(0.97); }
//           100% { transform: scale(1); }
//         }
//         @keyframes confettiFall {
//           0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
//           100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
//         }
//       `}</style>
//     </div>
//   );
// }


"use client"
import { useEffect, useState } from "react";

// ── Confetti launcher (unchanged) ──
const CONFETTI_COLORS = [
  "#C9A84C", "#0F0F0F", "#D97070", "#4A6FA5", "#3A7A5A", "#E8DFC0", "#F5F1E8",
];

function launchConfetti() {
  const wrap = document.createElement("div");
  wrap.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;";
  document.body.appendChild(wrap);

  for (let i = 0; i < 70; i++) {
    setTimeout(() => {
      const p = document.createElement("div");
      const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const size = 6 + Math.random() * 8;
      const left = Math.random() * 100;
      const duration = 2.5 + Math.random() * 2;
      const delay = Math.random() * 0.8;
      const isCircle = Math.random() > 0.5;
      p.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        top: -12px;
        border-radius: ${isCircle ? "50%" : "2px"};
        animation: confettiFall ${duration}s ${delay}s ease-in forwards;
      `;
      wrap.appendChild(p);
    }, i * 18);
  }

  setTimeout(() => wrap.remove(), 5500);
}

// ── Score Ring (FIXED) ──
function ScoreRing({ score, total }) {
  const pct = score / total;
  const r = 68, cx = 80, cy = 80, sw = 10;
  const circumference = 2 * Math.PI * r;
  const [dashOffset, setDashOffset] = useState(circumference);

  useEffect(() => {
    const t = setTimeout(
      () => setDashOffset(circumference - pct * circumference),
      400
    );
    return () => clearTimeout(t);
  }, []);

  const ringColor =
    pct >= 0.8 ? "#C9A84C" : pct >= 0.5 ? "#4A6FA5" : "#D97070";

  return (
    <svg width="160" height="160" viewBox="0 0 160 160">
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke="#F0F0F0" className="dark:stroke-[#2A2A2A]" strokeWidth={sw}/>

      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke={ringColor}
        strokeWidth={sw}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />

      <text x={cx} y={cy - 8} textAnchor="middle"
        fontSize="34" fontWeight="700"
        fill="#0F0F0F"
        className="dark:fill-white"
      >
        {score}
      </text>

      <text x={cx} y={cy + 16} textAnchor="middle"
        fontSize="14"
        fill="#BBB"
        className="dark:fill-[#666]"
      >
        of {total}
      </text>
    </svg>
  );
}

// ── Result Content (unchanged) ──
function getResultContent(pct) {
  if (pct === 1) return {
    emoji: "🎯",
    message: "Perfect score!",
    level: "Finance Expert",
    levelDesc: "You're ready to mentor others.",
    strength: "Mastery over finance.",
    improve: "Explore advanced topics.",
  };
  if (pct >= 0.6) return {
    emoji: "📈",
    message: "Good work!",
    level: "Intermediate",
    levelDesc: "Keep improving.",
    strength: "Solid basics.",
    improve: "Learn deeper concepts.",
  };
  return {
    emoji: "🚀",
    message: "Start learning!",
    level: "Beginner",
    levelDesc: "Build fundamentals.",
    strength: "Curiosity.",
    improve: "Start basics.",
  };
}

// ── Main ──
export default function QuizResult({ score, total, onRetry }) {
  const pct = score / total;
  const content = getResultContent(pct);

  useEffect(() => {
    if (pct >= 0.6) setTimeout(launchConfetti, 500);
  }, []);

  return (
    <div className="max-w-[680px] mx-auto px-6 pb-24">

      <div className="bg-white dark:bg-[#0F0F0F] border border-[#E8E8E8] dark:border-[#2A2A2A] rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.07)]">

        {/* Top */}
        <div className="px-10 pt-10 pb-8 text-center">
          <div className="text-[12px] text-[#888] dark:text-[#A0A0A0] mb-6">
            Your Score
          </div>

          <div className="flex justify-center mb-5">
            <ScoreRing score={score} total={total} />
          </div>

          <div className="text-[28px] mb-2">{content.emoji}</div>

          <p className="text-[16px] text-[#333] dark:text-[#DDD]">
            {content.message}
          </p>
        </div>

        {/* Cards */}
        <div className="px-8 pb-8 flex flex-col gap-3">

          <div className="p-5 rounded-2xl bg-[#FBF7EC] dark:bg-[#1A1A1A] border border-[#E8DFC0] dark:border-[#2A2A2A]">
            <div className="text-[#8B7340]">Strengths</div>
            <div className="text-[#555] dark:text-[#A0A0A0]">{content.strength}</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FDF3F3] dark:bg-[#1A1A1A] border border-[#F0CCCC] dark:border-[#2A2A2A]">
            <div className="text-[#9A4A4A]">Improve</div>
            <div className="text-[#555] dark:text-[#A0A0A0]">{content.improve}</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAFAF8] dark:bg-[#1A1A1A] border border-[#EBEBEB] dark:border-[#2A2A2A]">
            <div className="text-[#888] dark:text-[#A0A0A0]">Level</div>
            <div className="text-[#0F0F0F] dark:text-white">{content.level}</div>
          </div>

        </div>

        {/* Buttons */}
        <div className="px-8 pb-9 flex gap-3">

          <button
            onClick={onRetry}
            className="flex-1 py-3 rounded bg-[#0F0F0F] text-white hover:bg-[#2a2a2a]"
          >
            Retry Quiz
          </button>

          <button
            className="flex-1 py-3 rounded bg-white dark:bg-[#1A1A1A] text-[#0F0F0F] dark:text-white border border-[#EBEBEB] dark:border-[#2A2A2A] hover:border-[#0F0F0F]"
          >
            Explore →
          </button>

        </div>
      </div>
    </div>
  );
}