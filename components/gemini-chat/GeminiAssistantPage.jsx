'use client'
import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import AssistantSidebar from "@/components/chat/AssiantSideBar";
import ChatMessage, { TypingIndicator } from "@/components/chat/Chatmessage";

// ─── Time helper ─────────────────────────────────────────────────────────────
function getTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

let msgId = 1;
function nextId() { return ++msgId; }

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ onNewChat }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-[#EBEBEB] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0F0F0F] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 10L7 4L12 10" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="11" r="1.2" fill="#C9A84C" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#0F0F0F]">FinanceFlow</span>
        </Link>

        {/* Page title */}
        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <div className="w-5 h-5 rounded-md bg-[#0F0F0F] flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="#C9A84C" strokeWidth="1.5" />
              <path d="M7 10L9 12L13 8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[14px] font-semibold text-[#0F0F0F] tracking-[-0.01em]">ArthSathi</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-[#4338CA] font-medium">
            Gemini
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Tools",     href: "/tools" },
            { label: "Learn",     href: "/learn" },
            { label: "Community", href: "/community" },
            { label: "Dashboard", href: "/dashboard" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[13.5px] tracking-[-0.01em] text-[#555] hover:text-[#0F0F0F] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Gemini Hero (empty state) ────────────────────────────────────────────────
function GeminiHero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.65s ease, transform 0.65s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  const CAPABILITY_PILLS = [
    { icon: "📈", label: "Market trends" },
    { icon: "🪙", label: "Crypto insights" },
    { icon: "💹", label: "Stock analysis" },
    { icon: "🌐", label: "Global markets" },
    { icon: "🧾", label: "Tax planning" },
    { icon: "💡", label: "Investment tips" },
  ];

  return (
    <div ref={ref} className="text-center max-w-xl mx-auto px-4 pt-8 pb-6">
      {/* Icon */}
      <div className="relative w-14 h-14 mx-auto mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#0F0F0F] flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="9" stroke="#C9A84C" strokeWidth="1.5" />
            <path d="M10 13L12 15L16 11" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-[#C9A84C] opacity-20 animate-ping" />
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse" />
        <span className="text-[12px] text-[#4338CA] font-medium tracking-wide">
          ArthSathi · Powered by Google Gemini
        </span>
      </div>

      <h1
        className="text-[34px] leading-[1.1] font-semibold tracking-[-0.03em] text-[#0F0F0F] mb-4"
        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
      >
        Meet <span className="text-[#C9A84C]">ArthSathi</span> — Your Finance AI
      </h1>

      <p className="text-[15.5px] leading-[1.7] text-[#555] mb-8 tracking-[-0.01em]">
        Ask ArthSathi anything about markets, investments, crypto, tax, or personal finance. Powered by Google Gemini.
      </p>

      {/* Capability pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {CAPABILITY_PILLS.map(({ icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EBEBEB] text-[12.5px] text-[#555] font-medium shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            {icon} {label}
          </span>
        ))}
      </div>

      <p className="text-[12px] text-[#BBB] tracking-wide">
        Responses are educational only · Not financial advice
      </p>
    </div>
  );
}

// ─── Gemini Suggested Prompts ─────────────────────────────────────────────────
const GEMINI_PROMPTS = [
  { icon: "📈", label: "Market Trends", text: "What are the latest stock market trends I should know about?" },
  { icon: "🪙", label: "Crypto",        text: "Explain the current cryptocurrency market outlook and top coins to watch." },
  { icon: "💹", label: "Stocks",        text: "Which sectors are performing well in the Indian stock market right now?" },
  { icon: "🌐", label: "Global",        text: "How are global economic events like Fed rate decisions affecting Indian markets?" },
  { icon: "🏦", label: "Mutual Funds",  text: "What are the best mutual fund categories to invest in during current market conditions?" },
  { icon: "🧾", label: "Tax Saving",    text: "What are the top tax-saving investment options available under Section 80C?" },
];

function GeminiSuggestedPrompts({ onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {GEMINI_PROMPTS.map(({ icon, label, text }) => (
        <button
          key={label}
          onClick={() => onSelect(text)}
          className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EBEBEB] hover:border-[#C9A84C] hover:shadow-[0_2px_12px_rgba(201,168,76,0.12)] transition-all duration-200 text-left group"
        >
          <span className="text-[18px] flex-shrink-0 mt-0.5">{icon}</span>
          <div>
            <div className="text-[11.5px] font-bold text-[#8B7340] uppercase tracking-[0.06em] mb-0.5">{label}</div>
            <div className="text-[13px] text-[#555] leading-snug group-hover:text-[#0F0F0F] transition-colors">{text}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Gemini Chat Layout (wraps ChatLayout with custom empty state) ─────────────
function GeminiChatLayout({ messages, isTyping, isStreaming, streamingId, onSuggestSelect, onStreamDone }) {
  const bottomRef = useRef(null);
  const isEmpty = messages.length === 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4">
        {isEmpty ? (
          <div className="py-6">
            <GeminiHero />
            <div className="mt-2">
              <GeminiSuggestedPrompts onSelect={onSuggestSelect} />
            </div>
          </div>
        ) : (
          <div className="py-6 flex flex-col gap-5">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isStreaming={isStreaming && msg.id === streamingId}
                onStreamDone={onStreamDone}
                botName="ArthSathi"
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} className="h-4" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Gemini Chat Input ────────────────────────────────────────────────────────
const GEMINI_QUICK_ACTIONS = [
  { icon: "📈", label: "Market Trends" },
  { icon: "🪙", label: "Crypto Update" },
  { icon: "💹", label: "Stock Tips" },
  { icon: "📰", label: "Latest News" },
];

function GeminiChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
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
          {GEMINI_QUICK_ACTIONS.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => onSend(`${label}: what are the latest updates and trends?`)}
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
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            placeholder="Ask about market trends, stocks, crypto, investments…"
            rows={1}
            className="flex-1 text-[14px] text-[#0F0F0F] placeholder-[#C0C0C0] outline-none bg-transparent tracking-[-0.01em] leading-relaxed resize-none max-h-[140px] scrollbar-hide disabled:cursor-not-allowed"
            style={{ minHeight: "24px" }}
          />
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
            Press{" "}
            <kbd className="text-[10.5px] px-1.5 py-0.5 rounded bg-[#F5F5F3] border border-[#E8E8E8] text-[#888]">Enter</kbd>
            {" "}to send ·{" "}
            <kbd className="text-[10.5px] px-1.5 py-0.5 rounded bg-[#F5F5F3] border border-[#E8E8E8] text-[#888]">Shift+Enter</kbd>
            {" "}for new line
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

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function GeminiAssistantPage() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingId, setStreamingId] = useState(null);
  // Conversation history for multi-turn Gemini context
  const historyRef = useRef([]);

  const handleSend = useCallback(async (text) => {
    // Add user message to UI
    const userMsg = { id: nextId(), role: "user", text, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Add to history for Gemini context
    historyRef.current = [...historyRef.current, { role: "user", text }];

    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          // Send history minus the last user message (already the current message)
          history: historyRef.current.slice(0, -1),
        }),
      });

      const data = await res.json();
      setIsTyping(false);

      const aiId = nextId();
      const aiMsg = {
        id: aiId,
        role: "assistant",
        content: data.content ?? [{ type: "text", value: "Sorry, I couldn't get a response. Please try again." }],
        time: getTime(),
      };

      // Extract plain text from content blocks for history
      const aiText = (data.content ?? [])
        .filter((b) => b.type === "text")
        .map((b) => b.value)
        .join(" ");
      historyRef.current = [...historyRef.current, { role: "assistant", text: aiText }];

      setMessages((prev) => [...prev, aiMsg]);
      setIsStreaming(true);
      setStreamingId(aiId);
    } catch {
      setIsTyping(false);
      const aiId = nextId();
      setMessages((prev) => [
        ...prev,
        {
          id: aiId,
          role: "assistant",
          content: [{ type: "text", value: "Network error — please check your connection and try again." }],
          time: getTime(),
        },
      ]);
    }
  }, []);

  const handleStreamDone = useCallback(() => {
    setIsStreaming(false);
    setStreamingId(null);
  }, []);

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
    setIsStreaming(false);
    setStreamingId(null);
    historyRef.current = [];
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#FAFAF8] font-sans antialiased overflow-hidden">
      <Navbar onNewChat={handleNewChat} />

      {/* Main area below navbar */}
      <div className="flex flex-1 overflow-hidden pt-16 max-w-7xl mx-auto w-full px-5 gap-5 py-5">
        {/* Sidebar (hidden on mobile) */}
        <div className="hidden lg:flex flex-col pt-1">
          <AssistantSidebar onNewChat={handleNewChat} />
        </div>

        {/* Chat panel */}
        <div className="flex-1 flex flex-col bg-white border border-[#E8E8E8] rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.06)] overflow-hidden min-w-0">
          {/* Chat top bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#EBEBEB] flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#0F0F0F] flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="#C9A84C" strokeWidth="1.5" />
                  <path d="M7 10L9 12L13 8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#0F0F0F] tracking-[-0.01em]">
                  ArthSathi
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3A7A5A]" />
                  <span className="text-[11px] text-[#888]">Online · Your Finance Assistant</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleNewChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E8E8] bg-white text-[12.5px] font-medium text-[#555] hover:border-[#0F0F0F] hover:text-[#0F0F0F] transition-all duration-150"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                New chat
              </button>
              {messages.length > 0 && (
                <span className="text-[11.5px] text-[#BBB]">
                  {messages.filter((m) => m.role === "user").length} question
                  {messages.filter((m) => m.role === "user").length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          {/* Messages */}
          <GeminiChatLayout
            messages={messages}
            isTyping={isTyping}
            isStreaming={isStreaming}
            streamingId={streamingId}
            onSuggestSelect={handleSend}
            onStreamDone={handleStreamDone}
          />

          {/* Input */}
          <GeminiChatInput onSend={handleSend} disabled={isTyping || isStreaming} />
        </div>
      </div>
    </div>
  );
}
