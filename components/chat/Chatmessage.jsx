'use client'
import { useEffect, useRef, useState } from "react";

function AIAvatar() {
  return (
    <div className="w-7 h-7 rounded-lg bg-[#0F0F0F] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d="M7 1.5C7 1.5 4 3.5 4 7C4 10.5 7 12.5 7 12.5C7 12.5 10 10.5 10 7C10 3.5 7 1.5 7 1.5Z" stroke="#C9A84C" strokeWidth="1.3" strokeLinejoin="round" />
        <circle cx="7" cy="7" r="1.5" fill="#C9A84C" />
      </svg>
    </div>
  );
}

function HighlightBlock({ label, value }) {
  return (
    <div className="my-3 p-3.5 rounded-xl bg-[#F5F1E8] border border-[#E8DFC0] flex gap-2.5">
      <span className="text-[#C9A84C] mt-0.5 flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L8.73 5.27L13 6L9.5 9.41L10.46 13.73L7 11.77L3.54 13.73L4.5 9.41L1 6L5.27 5.27L7 1Z" fill="#C9A84C" />
        </svg>
      </span>
      <div>
        {label && (
          <div className="text-[11.5px] font-bold text-[#8B7340] uppercase tracking-[0.06em] mb-1">{label}</div>
        )}
        <div className="text-[13.5px] text-[#6B5530] leading-relaxed">{value}</div>
      </div>
    </div>
  );
}

function BulletList({ heading, items }) {
  return (
    <div className="my-3">
      {heading && (
        <div className="text-[13px] font-semibold text-[#0F0F0F] mb-2 tracking-[-0.01em]">{heading}</div>
      )}
      <ul className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-[#444] leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0 mt-2" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CalculationTable({ label, rows }) {
  return (
    <div className="my-3 rounded-xl overflow-hidden border border-[#EBEBEB]">
      {label && (
        <div className="px-4 py-2.5 bg-[#FAFAF8] border-b border-[#EBEBEB]">
          <span className="text-[11.5px] font-semibold text-[#888] uppercase tracking-[0.06em]">{label}</span>
        </div>
      )}
      <div className="bg-white divide-y divide-[#F5F5F5]">
        {rows.map(({ key, value }, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-2.5">
            <span className="text-[13px] text-[#666]">{key}</span>
            <span className={`text-[13.5px] font-semibold ${i === rows.length - 1 ? "text-[#0F0F0F]" : "text-[#444]"}`}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StreamingText({ text, onDone }) {
  const [displayed, setDisplayed] = useState(() => (text ? text.slice(0, 1) : ""));
  const idx = useRef(text ? 1 : 0);

  useEffect(() => {
    if (!text) {
      onDone?.();
      return;
    }

    const interval = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        clearInterval(interval);
        onDone?.();
      }
    }, 10);
    return () => clearInterval(interval);
  }, [onDone, text]);

  return <span>{displayed}</span>;
}

function AIMessageContent({ content, streaming, onStreamDone }) {
  const [streamedBlock, setStreamedBlock] = useState(0);

  const handleBlockDone = () => {
    setStreamedBlock((n) => n + 1);
  };

  return (
    <div className="flex flex-col">
      {content.map((block, i) => {
        const visible = !streaming || i <= streamedBlock;
        if (!visible) return null;

        if (block.type === "text") {
          return (
            <p key={i} className="text-[14px] text-[#333] leading-relaxed tracking-[-0.01em] mb-1">
              {streaming && i === streamedBlock ? (
                <StreamingText key={block.value} text={block.value} onDone={() => { handleBlockDone(); if (i === content.length - 1) onStreamDone?.(); }} />
              ) : block.value}
            </p>
          );
        }
        if (block.type === "highlight") return <HighlightBlock key={i} label={block.label} value={block.value} />;
        if (block.type === "bullets") return <BulletList key={i} heading={block.heading} items={block.items} />;
        if (block.type === "calculation") return <CalculationTable key={i} label={block.label} rows={block.rows} />;
        return null;
      })}
    </div>
  );
}

// Typing indicator
export function TypingIndicator() {
  return (
    <div className="flex gap-3 items-start" style={{ animation: "fadeSlideIn 0.3s ease both" }}>
      <AIAvatar />
      <div className="bg-white border border-[#EBEBEB] rounded-2xl rounded-tl-sm px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"
              style={{ animation: `typingBounce 1.2s ease ${i * 0.2}s infinite` }}
            />
          ))}
          <span className="text-[12px] text-[#AAA] ml-1 font-medium">AI is thinking…</span>
        </div>
      </div>

      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function ChatMessage({ message, isStreaming, onStreamDone, botName = "FinanceFlow AI" }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div
        className="flex justify-end"
        style={{ animation: "fadeSlideIn 0.25s ease both" }}
      >
        <div className="max-w-[72%] bg-[#F5F5F3] border border-[#E8E8E8] rounded-2xl rounded-tr-sm px-4 py-3">
          <p className="text-[14px] text-[#0F0F0F] leading-relaxed tracking-[-0.01em]">
            {message.text}
          </p>
        </div>
        <style>{`
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className="flex gap-3 items-start"
      style={{ animation: "fadeSlideIn 0.3s ease both" }}
    >
      <AIAvatar />
      <div className="flex-1 min-w-0 bg-white border border-[#EBEBEB] rounded-2xl rounded-tl-sm px-5 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        {/* AI label */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold text-[#888] uppercase tracking-[0.08em]">
            {botName}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#DDD]" />
          <span className="text-[11px] text-[#BBB]">{message.time}</span>
        </div>

        <AIMessageContent
          content={message.content}
          streaming={isStreaming}
          onStreamDone={onStreamDone}
        />

        {/* Feedback row */}
        {!isStreaming && (
          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#F5F5F5]">
            <span className="text-[11.5px] text-[#AAA]">Was this helpful?</span>
            <button className="flex items-center gap-1 text-[12px] text-[#888] hover:text-[#3A7A5A] transition-colors">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M5 12H10.5C11.05 12 11.5 11.55 11.5 11V6.5C11.5 5.95 11.05 5.5 10.5 5.5H8.5L9.5 2.5C9.5 2 9.2 1.5 8.5 1.5H8L5 5.5V12Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M2.5 12V5.5H5V12H2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              Yes
            </button>
            <button className="flex items-center gap-1 text-[12px] text-[#888] hover:text-[#A04A4A] transition-colors">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M9 2H3.5C2.95 2 2.5 2.45 2.5 3V7.5C2.5 8.05 2.95 8.5 3.5 8.5H5.5L4.5 11.5C4.5 12 4.8 12.5 5.5 12.5H6L9 8.5V2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M11.5 2V8.5H9V2H11.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              No
            </button>
            <button className="ml-auto text-[11.5px] text-[#888] hover:text-[#0F0F0F] transition-colors flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Copy
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
