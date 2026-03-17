'use client'
import { useEffect, useRef } from "react";
import ChatMessage, { TypingIndicator } from  "./Chatmessage"
import AssistantHero from "./AssistantHero";
import SuggestedPrompts from "./SuggestedPrompts";

export default function ChatLayout({ messages, isTyping, isStreaming, streamingId, onSuggestSelect, onStreamDone }) {
  const bottomRef = useRef(null);
  const isEmpty = messages.length === 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4">
        {isEmpty ? (
          /* Empty state: hero + suggested prompts */
          <div className="py-6">
            <AssistantHero />
            <div className="mt-2">
              <SuggestedPrompts onSelect={onSuggestSelect} />
            </div>
          </div>
        ) : (
          /* Messages */
          <div className="py-6 flex flex-col gap-5">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isStreaming={isStreaming && msg.id === streamingId}
                onStreamDone={onStreamDone}
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