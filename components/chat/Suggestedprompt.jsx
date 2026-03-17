'use client'
import { SUGGESTED_PROMPTS } from "../data/responses";

const CATEGORY_STYLES = {
  Investing: { bg: "#F0F5FF", text: "#4A6FA5", border: "#D0E0FF" },
  Savings:   { bg: "#F0FBF4", text: "#3A7A5A", border: "#C0E8D0" },
  Concepts:  { bg: "#F5F1E8", text: "#8B7340", border: "#E8DFC0" },
  Funds:     { bg: "#F8F0FF", text: "#7A4AA0", border: "#E0C8F8" },
  Goals:     { bg: "#FFF0F0", text: "#A04A4A", border: "#F8C8C8" },
  Tax:       { bg: "#F5F5F3", text: "#555",    border: "#E0E0E0" },
};

export default function SuggestedPrompts({ onSelect }) {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="text-[12px] font-semibold text-[#BBB] uppercase tracking-[0.08em] text-center mb-4">
        Try asking
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {SUGGESTED_PROMPTS.map((prompt) => {
          const style = CATEGORY_STYLES[prompt.category] || CATEGORY_STYLES.Concepts;
          return (
            <button
              key={prompt.id}
              onClick={() => onSelect(prompt.text)}
              className="group flex items-start gap-3 p-4 bg-white border border-[#E8E8E8] rounded-2xl text-left hover:border-[#C0C0C0] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)] transition-all duration-150"
            >
              <span className="text-xl flex-shrink-0 mt-0.5">{prompt.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] font-medium text-[#333] group-hover:text-[#0F0F0F] leading-snug tracking-[-0.01em] mb-1.5">
                  {prompt.text}
                </div>
                <span
                  className="text-[10.5px] font-medium px-2 py-0.5 rounded-full"
                  style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
                >
                  {prompt.category}
                </span>
              </div>
              <svg
                className="w-4 h-4 text-[#DDD] group-hover:text-[#888] transition-colors flex-shrink-0 mt-0.5"
                viewBox="0 0 16 16" fill="none"
              >
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}