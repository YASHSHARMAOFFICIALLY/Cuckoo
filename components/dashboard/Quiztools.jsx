import Link from "next/link";

/**
 * @typedef {import("@/types/dashboard").DashboardTool} DashboardTool
 */

/**
 * @param {{ tools?: DashboardTool[] }} props
 */
export default function QuickTools({ tools = [] }) {
  return (
    <div className="bg-white dark:bg-[linear-gradient(180deg,_rgba(18,28,34,0.96)_0%,_rgba(10,16,21,0.99)_100%)] border border-[#E8E8E8] dark:border-[#243842] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_14px_34px_rgba(0,0,0,0.34)]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[11.5px] font-semibold text-[#888] dark:text-[#89a0ad] uppercase tracking-[0.08em] mb-0.5">
            Shortcuts
          </div>
          <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
            Quick Tools
          </div>
        </div>
        <Link
          href="/tools"
          className="text-[12px] font-medium text-[#555] dark:text-[#a7bac6] hover:text-[#0F0F0F] dark:hover:text-white transition-colors"
        >
          All tools →
        </Link>
      </div>

      {tools.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E0E0E0] dark:border-[#2d434f] px-4 py-6 text-[12.5px] text-[#888] dark:text-[#89a0ad] bg-transparent dark:bg-[#10181d]/70">
          No quick tools available yet.
        </div>
      ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group flex flex-col items-start p-3.5 rounded-xl border hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition-all duration-150"
            style={{
              background: tool.bg,
              borderColor: tool.border,
            }}
          >
            <span className="text-[20px] mb-2">{tool.emoji}</span>
            <span
              className="text-[12.5px] font-semibold tracking-[-0.01em] leading-tight mb-0.5"
              style={{ color: tool.color }}
            >
              {tool.name}
            </span>
            <span className="text-[11px] text-[#888] dark:text-[#89a0ad] leading-snug">{tool.desc}</span>
          </Link>
        ))}
      </div>
      )}
    </div>
  );
}
