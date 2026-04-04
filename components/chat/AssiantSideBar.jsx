'use client'
import { RECENT_CONVERSATIONS } from "@/data/responses"

const QUICK_TOOLS = [
  { icon: "📈", label: "SIP Calculator", href: "#" },
  { icon: "🏦", label: "EMI Calculator", href: "#" },
  { icon: "🎯", label: "Goal Planner", href: "#" },
  { icon: "📊", label: "Budget Planner", href: "#" },
];

const FINANCE_TIPS = [
  "Invest before you spend, not with what's left.",
  "Index funds beat 90% of active fund managers long-term.",
  "The best time to start was yesterday. The next best is now.",
];

const DAILY_TIP = FINANCE_TIPS[new Date().getDate() % FINANCE_TIPS.length];

function RecentChats({ conversations }) {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[12px] font-semibold text-[#888] uppercase tracking-[0.08em]">
          Recent
        </div>
        <button className="text-[11.5px] text-[#888] hover:text-[#0F0F0F] transition-colors">
          Clear all
        </button>
      </div>
      <div className="flex flex-col gap-0.5">
        {conversations.map((conv) => (
          <a
            key={conv.id}
            href="#"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-[#FAFAF8] transition-colors group"
          >
            <div className="w-6 h-6 rounded-lg bg-[#F5F5F3] border border-[#EBEBEB] flex items-center justify-center flex-shrink-0">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M1 1.5H11C11.3 1.5 11.5 1.7 11.5 2V8C11.5 8.3 11.3 8.5 11 8.5H3L0.5 11V2C0.5 1.7 0.7 1.5 1 1.5Z" stroke="#888" strokeWidth="1.1" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] text-[#444] group-hover:text-[#0F0F0F] font-medium truncate tracking-[-0.01em] transition-colors">
                {conv.title}
              </div>
              <div className="text-[11px] text-[#BBB]">{conv.time}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function QuickTools() {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="text-[12px] font-semibold text-[#888] uppercase tracking-[0.08em] mb-3">
        Quick Tools
      </div>
      <div className="grid grid-cols-2 gap-2">
        {QUICK_TOOLS.map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#FAFAF8] border border-[#EBEBEB] hover:border-[#D0D0D0] hover:bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-150 text-center"
          >
            <span className="text-[18px]">{icon}</span>
            <span className="text-[11.5px] font-medium text-[#555] leading-tight">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function FinanceTip() {
  return (
    <div className="bg-[#0F0F0F] rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-base">💡</span>
        <span className="text-[11px] font-bold text-[#C9A84C] uppercase tracking-[0.08em]">
          Finance Tip
        </span>
      </div>
      <p className="text-[13px] text-white/70 leading-relaxed italic">
        &ldquo;{DAILY_TIP}&rdquo;
      </p>
    </div>
  );
}

export default function AssistantSidebar({ onNewChat }) {
  return (
    <aside className="flex flex-col gap-4 w-64 flex-shrink-0">
      {/* New chat button */}
      <button
        onClick={onNewChat}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#0F0F0F] text-white text-[13.5px] font-medium hover:bg-[#2a2a2a] hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2V12M2 7H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        New Conversation
      </button>

      <RecentChats conversations={RECENT_CONVERSATIONS} />
      <QuickTools />
      <FinanceTip />

      {/* Disclaimer */}
      <div className="px-2">
        <p className="text-[11px] text-[#CCC] leading-relaxed text-center">
          AI responses are educational only and not professional financial advice. Always consult a SEBI-registered advisor for investment decisions.
        </p>
      </div>
    </aside>
  );
}
