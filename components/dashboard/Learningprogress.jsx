"use client"
import { useState, useEffect } from "react";

function ModuleRow({ mod, delay }) {
  const pct = Math.round((mod.completed / mod.lessons) * 100);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(pct), 400 + delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-150 ${
        mod.current
          ? "bg-[#FAFAF8] dark:bg-[#181818] border border-[#EBEBEB] dark:border-[#2A2A2A]"
          : "hover:bg-[#FAFAF8] dark:hover:bg-[#181818]"
      } ${mod.locked ? "opacity-50" : "cursor-pointer"}`}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
        style={{ background: mod.bg, border: `1px solid ${mod.border}` }}
      >
        {mod.locked ? "🔒" : mod.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em] truncate">
            {mod.title}
          </span>
          {mod.current && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#F5F1E8] text-[#8B7340] border border-[#E8DFC0] flex-shrink-0">
              CURRENT
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-[#EBEBEB] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-out"
              style={{ width: `${barWidth}%`, background: mod.color }}
            />
          </div>
          <span className="text-[11px] text-[#888] dark:text-[#777] flex-shrink-0">
            {mod.completed}/{mod.lessons}
          </span>
        </div>
      </div>

      <span
        className="text-[10.5px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
        style={{
          background: mod.bg,
          color: mod.color,
          border: `1px solid ${mod.border}`,
        }}
      >
        {mod.badge}
      </span>
    </div>
  );
}

export default function LearningProgress({ learning }) {
  const totalLessons = learning.modules.reduce((a, m) => a + m.lessons, 0);
  const completedLessons = learning.modules.reduce((a, m) => a + m.completed, 0);
  const overallPct = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="bg-white dark:bg-[#111111] border border-[#E8E8E8] dark:border-[#232323] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[11.5px] font-semibold text-[#888] dark:text-[#777] uppercase tracking-[0.08em] mb-0.5">
            Learning
          </div>
          <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
            Your curriculum
          </div>
        </div>
        <a
          href="#"
          className="text-[12px] font-medium text-[#555] dark:text-[#AAA] hover:text-[#0F0F0F] dark:hover:text-white transition-colors"
        >
          View all →
        </a>
      </div>

      {/* Overall progress */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FAFAF8] dark:bg-[#181818] border border-[#EBEBEB] dark:border-[#2A2A2A] mb-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1.5 text-[12px]">
            <span className="text-[#555] dark:text-[#AAA] font-medium">Overall Progress</span>
            <span className="font-bold text-[#0F0F0F] dark:text-white">{overallPct}%</span>
          </div>
          <div className="h-2 bg-[#E8E8E8] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0F0F0F] rounded-full"
              style={{ width: `${overallPct}%`, transition: "width 1s ease 0.3s" }}
            />
          </div>
          <div className="text-[11px] text-[#AAA] dark:text-[#777] mt-1.5">
            {completedLessons} of {totalLessons} lessons complete
          </div>
        </div>
        <div className="text-center flex-shrink-0">
          <div className="text-[22px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.03em] leading-none">
            🔥 {learning.streak}
          </div>
          <div className="text-[10px] text-[#888] dark:text-[#777] mt-0.5">day streak</div>
        </div>
      </div>

      {/* Modules */}
      <div className="flex flex-col gap-1">
        {learning.modules.map((mod, i) => (
          <ModuleRow key={mod.id} mod={mod} delay={i * 70} />
        ))}
      </div>

      {/* Latest quiz result */}
      <div className="mt-4 pt-4 border-t border-[#F5F5F5] dark:border-[#222]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5F1E8] border border-[#E8DFC0] flex items-center justify-center text-sm">
              📝
            </div>
            <div>
              <div className="text-[12.5px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em]">
                Latest Quiz — {learning.latestQuiz.topic}
              </div>
              <div className="text-[11.5px] text-[#888] dark:text-[#777]">{learning.latestQuiz.date}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[16px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
              {learning.latestQuiz.score}
              <span className="text-[12px] text-[#888] dark:text-[#777] font-normal">/{learning.latestQuiz.total}</span>
            </div>
            <div className="text-[11px] text-[#3A7A5A] font-medium">Excellent</div>
          </div>
        </div>
      </div>
    </div>
  );
}
