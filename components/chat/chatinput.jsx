'use client'
import { useState, useRef, useEffect } from "react";

const QUICK_ACTIONS = [
  { icon: "📈", label: "SIP Advice" },
  { icon: "💰", label: "Savings Tips" },
  { icon: "🧮", label: "Calculator" },
  { icon: "📚", label: "Explain Concept" },
];

export default function ChatInput({ onSend, disabled, placeholder = "Ask anything about finance…" }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    // Auto-resize
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 140) + "px";
    }
  };

  const charCount = value.length;
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="border-t border-[#EBEBEB] bg-white px-4 py-4">
      <div className="max-w-2xl mx-auto">
        {/* Quick action chips */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
          {QUICK_ACTIONS.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => { onSend(`${label}: give me advice`); }}
              disabled={disabled}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E8E8] bg-white text-[12px] font-medium text-[#555] hover:border-[#C9A84C] hover:text-[#8B7340] hover:bg-[#FBF7EC] transition-all duration-150 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div
          className={`flex items-end gap-3 px-4 py-3 rounded-2xl border bg-white transition-all duration-200 ${
            focused
              ? "border-[#0F0F0F] shadow-[0_0_0_3px_rgba(15,15,15,0.06)]"
              : "border-[#E0E0E0]"
          } ${disabled ? "opacity-60" : ""}`}
        >
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            className="flex-1 text-[14px] text-[#0F0F0F] placeholder-[#C0C0C0] outline-none bg-transparent tracking-[-0.01em] leading-relaxed resize-none max-h-[140px] scrollbar-hide disabled:cursor-not-allowed"
            style={{ minHeight: "24px" }}
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!canSend}
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
              canSend
                ? "bg-[#0F0F0F] text-white hover:bg-[#2a2a2a] hover:scale-105 shadow-sm"
                : "bg-[#F0F0F0] text-[#CCC] cursor-not-allowed"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M8 13V3M3 8L8 3L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-[11.5px] text-[#BBB]">
            Press <kbd className="text-[10.5px] px-1.5 py-0.5 rounded bg-[#F5F5F3] border border-[#E8E8E8] text-[#888]">Enter</kbd> to send · <kbd className="text-[10.5px] px-1.5 py-0.5 rounded bg-[#F5F5F3] border border-[#E8E8E8] text-[#888]">Shift+Enter</kbd> for new line
          </span>
          {charCount > 0 && (
            <span className={`text-[11.5px] ${charCount > 400 ? "text-[#D97070]" : "text-[#BBB]"}`}>
              {charCount}/500
            </span>
          )}
        </div>
      </div>
    </div>
  );
}