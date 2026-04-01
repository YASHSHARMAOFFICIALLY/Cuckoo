"use client";

import { useState, useEffect } from "react";

function toINR(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function GoalCard({ goal, delay }) {
  const pct = Math.min(100, Math.round((goal.saved / goal.target) * 100));
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(pct), 300 + delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="group p-4.5 rounded-xl border border-[#E8E8E8] dark:border-[#232323] bg-white dark:bg-[#111111] hover:border-[#D0D0D0] dark:hover:border-[#3A3A3A] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-[18px]">{goal.emoji}</span>
          <div>
            <div className="text-[13.5px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em] leading-none mb-0.5">
              {goal.name}
            </div>
            <div className="text-[11px] text-[#AAA] dark:text-[#777]">{goal.deadline}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {goal.achieved && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0FBF4] text-[#3A7A5A] border border-[#C0E8D0]">
              ✓ Done
            </span>
          )}
          <span className="text-[14px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
            {pct}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#F0F0F0] dark:bg-[#262626] rounded-full overflow-hidden mb-2.5">
        <div
          className="h-full rounded-full transition-[width] duration-[800ms] ease-out"
          style={{ width: `${barWidth}%`, background: goal.barColor }}
        />
      </div>

      <div className="flex items-center justify-between text-[11.5px] text-[#888] dark:text-[#777]">
        <span>
          <span className="font-semibold text-[#0F0F0F] dark:text-white">{toINR(goal.saved)}</span>
          {" "}of {toINR(goal.target)}
        </span>
        {!goal.achieved && (
          <span className="text-[#888]">
            {toINR(goal.monthlyNeeded)}/mo needed
          </span>
        )}
      </div>
    </div>
  );
}

export default function GoalProgress({ goals = { achieved: 0, items: [] } }) {
  const achieved = goals.achieved;

  return (
    <div className="bg-white dark:bg-[#111111] border border-[#E8E8E8] dark:border-[#232323] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[11.5px] font-semibold text-[#888] dark:text-[#777] uppercase tracking-[0.08em] mb-0.5">
            Goals
          </div>
          <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
            {achieved} of {goals.items.length} achieved
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-[12px] font-medium text-[#555] dark:text-[#AAA] hover:text-[#0F0F0F] dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-[#F0F0F0] dark:border-[#262626] hover:border-[#D0D0D0] dark:hover:border-[#3A3A3A]">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          New Goal
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {goals.items.map((goal, i) => (
          <GoalCard key={goal.id} goal={goal} delay={i * 80} />
        ))}
      </div>
    </div>
  );
}
