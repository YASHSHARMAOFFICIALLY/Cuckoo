'use client'
import { useState, useCallback } from "react";
import Link from "next/link";
import ChatLayout from "./chatlayout";
import ChatInput from "./chatinput";
import AssistantSidebar from "./AssiantSideBar";
import { generateResponse } from "@/data/responses";

// Formatting helper for time
function getTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

let msgId = 1;
function nextId() { return ++msgId; }

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-[#EBEBEB] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
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
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5C7 1.5 4 3.5 4 7C4 10.5 7 12.5 7 12.5C7 12.5 10 10.5 10 7C10 3.5 7 1.5 7 1.5Z" stroke="#C9A84C" strokeWidth="1.3" strokeLinejoin="round" />
              <circle cx="7" cy="7" r="1.5" fill="#C9A84C" />
            </svg>
          </div>
          <span className="text-[14px] font-semibold text-[#0F0F0F] tracking-[-0.01em]">AI Finance Assistant</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F5F1E8] border border-[#E8DFC0] text-[#8B7340] font-medium">Beta</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Tools",     href: "/tools" },
            { label: "Learn",     href: "/learn" },
            { label: "Community", href: "/community" },
            { label: "Dashboard", href: "/dashboard", active: true },
          ].map(({ label, href, active }) => (
            <Link
              key={label}
              href={href}
              className={`text-[13.5px] tracking-[-0.01em] transition-colors ${
                active ? "text-[#0F0F0F] font-medium" : "text-[#555] hover:text-[#0F0F0F]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function AssistantPage() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingId, setStreamingId] = useState(null);

  const handleSend = useCallback((text) => {
    // Add user message
    const userMsg = {
      id: nextId(),
      role: "user",
      text,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI thinking delay (800ms–1400ms)
    const thinkDelay = 800 + Math.random() * 600;

    setTimeout(() => {
      setIsTyping(false);

      const response = generateResponse(text);
      const aiId = nextId();

      const aiMsg = {
        id: aiId,
        role: "assistant",
        content: response.content,
        time: getTime(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsStreaming(true);
      setStreamingId(aiId);
    }, thinkDelay);
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
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#FAFAF8] font-sans antialiased overflow-hidden">
      <Navbar />

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
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1.5C4 3.5 4 7 4 7C4 10.5 7 12.5 7 12.5C10 10.5 10 7 10 7C10 3.5 7 1.5 7 1.5Z" stroke="#C9A84C" strokeWidth="1.3" strokeLinejoin="round" />
                  <circle cx="7" cy="7" r="1.5" fill="#C9A84C" />
                </svg>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#0F0F0F] tracking-[-0.01em]">
                  FinanceFlow AI
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3A7A5A]" />
                  <span className="text-[11px] text-[#888]">Online · Ready to help</span>
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
                <span className="text-[11.5px] text-[#BBB]">{messages.filter(m => m.role === "user").length} question{messages.filter(m => m.role === "user").length !== 1 ? "s" : ""}</span>
              )}
            </div>
          </div>

          {/* Messages */}
          <ChatLayout
            messages={messages}
            isTyping={isTyping}
            isStreaming={isStreaming}
            streamingId={streamingId}
            onSuggestSelect={handleSend}
            onStreamDone={handleStreamDone}
          />

          {/* Input */}
          <ChatInput
            onSend={handleSend}
            disabled={isTyping || isStreaming}
          />
        </div>
      </div>
    </div>
  );
}
