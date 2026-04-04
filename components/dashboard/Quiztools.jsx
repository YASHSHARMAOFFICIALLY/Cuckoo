import Link from "next/link";

export default function QuickTools({ tools = [] }) {
  return (
    <div className="bg-white dark:bg-[#111111] border border-[#E8E8E8] dark:border-[#232323] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[11.5px] font-semibold text-[#888] dark:text-[#777] uppercase tracking-[0.08em] mb-0.5">
            Shortcuts
          </div>
          <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
            Quick Tools
          </div>
        </div>
        <Link
          href="/tools"
          className="text-[12px] font-medium text-[#555] dark:text-[#AAA] hover:text-[#0F0F0F] dark:hover:text-white transition-colors"
        >
          All tools →
        </Link>
      </div>

      {tools.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E0E0E0] dark:border-[#2A2A2A] px-4 py-6 text-[12.5px] text-[#888] dark:text-[#777]">
          No quick tools available yet.
        </div>
      ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="group flex flex-col items-start p-3.5 rounded-xl border hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-150"
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
            <span className="text-[11px] text-[#888] dark:text-[#777] leading-snug">{tool.desc}</span>
          </Link>
        ))}
      </div>
      )}
    </div>
  );
}
