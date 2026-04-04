"use client"
import { useScrollReveal } from "@/hooks/useScrollRevel";
import { useRef, useEffect } from "react";

const CONCEPTS = [
  {
    id: 1,
    emoji: "📈",
    name: "Compound Interest",
    tagline: "The 8th wonder of the world",
    explanation:
      "Your money earns interest, and that interest earns more interest. Over time, this snowball effect can turn small investments into substantial wealth.",
    color: "#F5F1E8",
    border: "#E8DFC0",
    accent: "#8B7340",
  },
  {
    id: 2,
    emoji: "🎯",
    name: "Diversification",
    tagline: "Don't put eggs in one basket",
    explanation:
      "Spreading investments across different asset classes — stocks, bonds, gold, real estate — reduces the risk that any single loss wipes out your portfolio.",
    color: "#F0F5FF",
    border: "#D0E0FF",
    accent: "#4A6FA5",
  },
  {
    id: 3,
    emoji: "📉",
    name: "Inflation",
    tagline: "The silent wealth destroyer",
    explanation:
      "The gradual rise in prices over time that erodes purchasing power. At 6% annual inflation, ₹100 today is worth only ₹56 in just 10 years.",
    color: "#FFF0F0",
    border: "#F8C8C8",
    accent: "#A04A4A",
  },
  {
    id: 4,
    emoji: "🛡️",
    name: "Emergency Fund",
    tagline: "Your financial safety net",
    explanation:
      "3–6 months of living expenses kept in a liquid account. It protects you from taking on debt during job loss, medical emergencies, or unexpected repairs.",
    color: "#F0FBF4",
    border: "#C0E8D0",
    accent: "#3A7A5A",
  },
  {
    id: 5,
    emoji: "⚖️",
    name: "Asset Allocation",
    tagline: "Balance is everything",
    explanation:
      "The strategy of dividing investments among asset categories based on your risk tolerance, time horizon, and financial goals. It determines most of your returns.",
    color: "#F8F0FF",
    border: "#E0C8F8",
    accent: "#7A4AA0",
  },
  {
    id: 6,
    emoji: "💹",
    name: "Rupee-Cost Averaging",
    tagline: "Beat market timing",
    explanation:
      "Investing a fixed amount regularly regardless of market levels. When prices are low you buy more units; when high, fewer. Over time this averages your cost.",
    color: "#F5F5F3",
    border: "#E0E0E0",
    accent: "#555555",
  },
];

function ConceptCard({ concept, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="group p-5 rounded-2xl border hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)] transition-all duration-200 cursor-pointer"
      style={{
        background: concept.color,
        borderColor: concept.border,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{concept.emoji}</span>
        <svg
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1 group-hover:translate-x-0 transition-transform"
          width="14" height="14" viewBox="0 0 14 14" fill="none"
        >
          <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke={concept.accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="text-[14.5px] font-semibold text-[#0F0F0F] tracking-[-0.02em] mb-0.5">
        {concept.name}
      </div>
      <div className="text-[11px] font-medium mb-2.5" style={{ color: concept.accent }}>
        {concept.tagline}
      </div>
      <p className="text-[12.5px] text-[#666] leading-relaxed tracking-[-0.01em]">
        {concept.explanation}
      </p>
    </div>
  );
}

export default function FinanceConcepts() {
  const headerRef = useScrollReveal();

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F5F3] border border-[#E8E8E8] mb-5">
            <span className="text-[12px] text-[#666] font-medium tracking-wide">Finance Glossary</span>
          </div>
          <h2
            className="text-[34px] font-semibold tracking-[-0.03em] text-[#0F0F0F] max-w-lg mx-auto leading-tight"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Key concepts every investor must know
          </h2>
          <p className="text-[15px] text-[#666] mt-3 max-w-md mx-auto leading-relaxed tracking-[-0.01em]">
            Clear, jargon-free explanations of the ideas that drive smart financial decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONCEPTS.map((concept, i) => (
            <ConceptCard key={concept.id} concept={concept} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}