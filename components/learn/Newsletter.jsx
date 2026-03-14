import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center" ref={ref}>
        {/* Deco */}
        <div className="flex items-center justify-center mb-10">
          <div
            className="h-px w-16"
            style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }}
          />
          <div className="w-2 h-2 rounded-full bg-[#C9A84C] mx-3" />
          <div
            className="h-px w-16"
            style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }}
          />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F5F3] border border-[#E8E8E8] mb-5">
          <span className="text-[12px] text-[#666] font-medium tracking-wide">Weekly Newsletter</span>
        </div>

        <h2
          className="text-[36px] font-semibold tracking-[-0.035em] text-[#0F0F0F] mb-4 leading-tight"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Get Smarter About Money Every Week
        </h2>

        <p className="text-[15.5px] text-[#666] leading-relaxed mb-10 tracking-[-0.01em] max-w-md mx-auto">
          Receive simple finance tips and investing insights in your inbox — no jargon, no spam.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#F0FBF4] border border-[#C0E8D0] text-[#3A7A5A] font-medium text-[14.5px]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8" fill="#3A7A5A" />
              <path d="M5.5 9L7.5 11L12.5 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            You're in! Check your inbox for a welcome note.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div
              className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border bg-white transition-all duration-200 ${
                focused
                  ? "border-[#0F0F0F] shadow-[0_0_0_3px_rgba(15,15,15,0.06)]"
                  : "border-[#E0E0E0]"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="1.5" y="3" width="12" height="9" rx="1.5" stroke="#BBB" strokeWidth="1.3" />
                <path d="M1.5 5L7.5 8.5L13.5 5" stroke="#BBB" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="you@example.com"
                required
                className="flex-1 text-[14px] text-[#0F0F0F] placeholder-[#CCC] outline-none bg-transparent tracking-[-0.01em]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#0F0F0F] text-white text-[13.5px] font-medium rounded-xl hover:bg-[#2a2a2a] hover:-translate-y-0.5 transition-all duration-200 tracking-[-0.01em] whitespace-nowrap shadow-sm"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-5 text-[12px] text-[#BBB]">
          Free forever · No spam · Unsubscribe any time
        </p>

        <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-[12.5px] text-[#888]">
          {["Weekly delivery", "Curated by experts", "5,000+ subscribers"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}