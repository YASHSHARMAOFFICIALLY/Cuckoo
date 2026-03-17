'use client'
import TrendingTopics from "./Trendingtopics";
import TopContributors from "./Topcontributors";

const GUIDELINES = [
  { icon: "✅", text: "Be respectful and constructive" },
  { icon: "🚫", text: "No spam or self-promotion" },
  { icon: "💬", text: "Ask clear, specific questions" },
  { icon: "📎", text: "Cite sources for financial claims" },
  { icon: "🏷️", text: "Add relevant tags to your posts" },
];

function CommunityGuidelines() {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">📋</span>
        <div className="text-[13px] font-semibold text-[#0F0F0F] tracking-[-0.01em]">
          Community Guidelines
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {GUIDELINES.map(({ icon, text }) => (
          <div key={text} className="flex items-start gap-2.5 text-[12.5px] text-[#555] leading-relaxed">
            <span className="shrink-0 mt-0.5">{icon}</span>
            {text}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[#F5F5F5]">
        <a
          href="#"
          className="text-[12.5px] text-[#888] hover:text-[#0F0F0F] transition-colors font-medium"
        >
          Read full guidelines →
        </a>
      </div>
    </div>
  );
}

function JoinBanner() {
  return (
    <div className="bg-[#0F0F0F] rounded-2xl p-5 text-white">
      <div className="text-[13px] font-semibold mb-1 tracking-[-0.01em]">
        New to FinanceFlow?
      </div>
      <p className="text-[12.5px] text-white/60 leading-relaxed mb-4">
        Create a free account to ask questions, upvote answers, and track your learning progress.
      </p>
      <a
        href="#"
        className="block text-center py-2.5 rounded-xl bg-[#C9A84C] text-[#0F0F0F] text-[13px] font-semibold hover:bg-[#D4B460] transition-colors"
      >
        Create Free Account
      </a>
      <a
        href="#"
        className="block text-center mt-2 text-[12.5px] text-white/40 hover:text-white/70 transition-colors"
      >
        Already have an account? Sign in
      </a>
    </div>
  );
}

export default function CommunitySidebar() {
  return (
    <aside className="flex flex-col gap-4">
      <JoinBanner />
      <TrendingTopics />
      <TopContributors />
      <CommunityGuidelines />
    </aside>
  );
}