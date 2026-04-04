"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

function mapModuleFromApi(module) {
  return {
    id: module.id,
    title: module.title,
    lessons: module.lessons,
    completed: module.completedLessons,
    icon: module.icon,
    color: module.color,
    bg: module.bgColor,
    border: module.borderColor,
    badge: module.badge,
    current: module.isCurrent,
  };
}

function ModuleRow({ mod, delay, onCompleteLesson, busy }) {
  const pct = Math.round((mod.completed / mod.lessons) * 100);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(pct), 400 + delay);
    return () => clearTimeout(t);
  }, [delay, pct]);

  return (
    <div
      className={`p-3 rounded-xl transition-all duration-150 ${
        mod.current
          ? "bg-[#FAFAF8] dark:bg-[#142028] border border-[#EBEBEB] dark:border-[#27404d]"
          : "hover:bg-[#FAFAF8] dark:hover:bg-[#10181d]"
      } ${mod.locked ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-3">
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
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#F5F1E8] text-[#8B7340] border border-[#E8DFC0] dark:bg-[#241d12] dark:text-[#dfbf75] dark:border-[#4b3d23] flex-shrink-0">
                CURRENT
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-[#EBEBEB] dark:bg-[#1d2a31] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-out"
                style={{ width: `${barWidth}%`, background: mod.color }}
              />
            </div>
            <span className="text-[11px] text-[#888] dark:text-[#89a0ad] flex-shrink-0">
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

      {mod.current && mod.completed < mod.lessons && (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => onCompleteLesson(mod.id)}
            disabled={busy}
            className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-[#D0E0FF] text-[#4A6FA5] bg-[#F0F5FF] dark:border-[#2e4c63] dark:bg-[#142330] dark:text-[#8cb8dc] disabled:opacity-50"
          >
            {busy ? "Saving..." : "Complete lesson"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function LearningProgress({ learning }) {
  const [modules, setModules] = useState(() => learning.modules);
  const [error, setError] = useState("");
  const [busyModuleId, setBusyModuleId] = useState(null);

  useEffect(() => {
    setModules(learning.modules);
  }, [learning]);

  const totalLessons = modules.reduce((a, m) => a + m.lessons, 0);
  const completedLessons = modules.reduce((a, m) => a + m.completed, 0);
  const overallPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const handleCompleteLesson = async (moduleId) => {
    setBusyModuleId(moduleId);
    setError("");

    try {
      const response = await fetch(`/api/dashboard/learning/${moduleId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "complete_lesson" }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || "Failed to update learning progress");
      }

      setModules(payload.modules.map(mapModuleFromApi));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyModuleId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-[linear-gradient(180deg,_rgba(18,28,34,0.96)_0%,_rgba(10,16,21,0.99)_100%)] border border-[#E8E8E8] dark:border-[#243842] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_14px_34px_rgba(0,0,0,0.34)]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[11.5px] font-semibold text-[#888] dark:text-[#89a0ad] uppercase tracking-[0.08em] mb-0.5">
            Learning
          </div>
          <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
            Your curriculum
          </div>
        </div>
        <Link
          href="/learn"
          className="text-[12px] font-medium text-[#555] dark:text-[#a7bac6] hover:text-[#0F0F0F] dark:hover:text-white transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FAFAF8] dark:bg-[#142028] border border-[#EBEBEB] dark:border-[#27404d] mb-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1.5 text-[12px]">
            <span className="text-[#555] dark:text-[#a7bac6] font-medium">Overall Progress</span>
            <span className="font-bold text-[#0F0F0F] dark:text-white">{overallPct}%</span>
          </div>
          <div className="h-2 bg-[#E8E8E8] dark:bg-[#1d2a31] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0F0F0F] dark:bg-[#dce6eb] rounded-full"
              style={{ width: `${overallPct}%`, transition: "width 1s ease 0.3s" }}
            />
          </div>
          <div className="text-[11px] text-[#AAA] dark:text-[#7f98a5] mt-1.5">
            {completedLessons} of {totalLessons} lessons complete
          </div>
        </div>
        <div className="text-center flex-shrink-0">
          <div className="text-[22px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.03em] leading-none">
            🔥 {learning.streak}
          </div>
          <div className="text-[10px] text-[#888] dark:text-[#89a0ad] mt-0.5">day streak</div>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-[#F3D1D1] bg-[#FFF3F3] px-3 py-2 text-[12px] text-[#A04A4A] dark:border-[#5a2d34] dark:bg-[#2a171b] dark:text-[#ef9ca8]">
          {error}
        </div>
      )}

      {modules.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E0E0E0] dark:border-[#2d434f] px-4 py-6 text-[12.5px] text-[#888] dark:text-[#89a0ad] bg-transparent dark:bg-[#10181d]/70">
          No learning modules available yet.
        </div>
      ) : (
      <div className="flex flex-col gap-1">
        {modules.map((mod, i) => (
          <ModuleRow
            key={mod.id}
            mod={mod}
            delay={i * 70}
            onCompleteLesson={handleCompleteLesson}
            busy={busyModuleId === mod.id}
          />
        ))}
      </div>
      )}

      <div className="mt-4 pt-4 border-t border-[#F5F5F5] dark:border-[#22343d]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5F1E8] border border-[#E8DFC0] flex items-center justify-center text-sm">
              📝
            </div>
            <div>
              <div className="text-[12.5px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em]">
                Latest Quiz — {learning.latestQuiz.topic}
              </div>
              <div className="text-[11.5px] text-[#888] dark:text-[#89a0ad]">{learning.latestQuiz.date}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[16px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
              {learning.latestQuiz.score}
              <span className="text-[12px] text-[#888] dark:text-[#89a0ad] font-normal">/{learning.latestQuiz.total}</span>
            </div>
            <div className="text-[11px] text-[#3A7A5A] dark:text-[#86c5a4] font-medium">Excellent</div>
          </div>
        </div>
      </div>
    </div>
  );
}
