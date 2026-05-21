import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const CONCEPT_DETAILS = {
  1: {
    emoji: "📈",
    title: "Compound Interest",
    tagline: "The 8th wonder of the world",
    content:
      "Compound interest is the process where your investment earns returns, and those returns begin generating additional returns over time. This creates exponential growth and is considered one of the most powerful wealth-building concepts in finance. The earlier you start investing, the more time compounding has to work in your favor.",
  },

  2: {
    emoji: "🎯",
    title: "Diversification",
    tagline: "Don't put eggs in one basket",
    content:
      "Diversification reduces investment risk by spreading money across different asset classes such as stocks, bonds, gold, and real estate. If one investment performs poorly, others may balance the losses. This strategy improves long-term portfolio stability.",
  },

  3: {
    emoji: "📉",
    title: "Inflation",
    tagline: "The silent wealth destroyer",
    content:
      "Inflation gradually reduces purchasing power over time. As prices rise, the same amount of money buys fewer goods and services. Investing helps combat inflation by allowing money to grow faster than rising prices.",
  },

  4: {
    emoji: "🛡️",
    title: "Emergency Fund",
    tagline: "Your financial safety net",
    content:
      "An emergency fund is money set aside for unexpected situations such as medical emergencies, job loss, or urgent repairs. Financial experts recommend keeping at least 3–6 months of expenses saved in a liquid account.",
  },

  5: {
    emoji: "⚖️",
    title: "Asset Allocation",
    tagline: "Balance is everything",
    content:
      "Asset allocation means dividing investments among categories like equities, bonds, and cash based on financial goals and risk tolerance. Proper allocation is one of the most important factors influencing investment performance.",
  },

  6: {
    emoji: "💹",
    title: "Rupee-Cost Averaging",
    tagline: "Beat market timing",
    content:
      "Rupee-cost averaging involves investing a fixed amount regularly regardless of market conditions. This strategy reduces emotional investing and lowers average purchase cost over time.",
  },
};

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const concept =
    CONCEPT_DETAILS[id as keyof typeof CONCEPT_DETAILS];

  if (!concept) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:text-white">
        Concept not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-black px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Top Nav */}
        <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
          <Link
            href="/learn#gloassary"
            className="inline-flex items-center gap-2 text-[14px] text-[#555] dark:text-[#aaa] hover:text-black dark:hover:text-white transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </Link>

          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="text-6xl mb-5">
            {concept.emoji}
          </div>

          <h1 className="text-5xl font-bold dark:text-white mb-3">
            {concept.title}
          </h1>

          <p className="text-lg text-[#888]">
            {concept.tagline}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-[#141414] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-3xl p-10">
          <p className="text-[16px] leading-9 text-[#555] dark:text-[#aaa]">
            {concept.content}
          </p>
        </div>
      </div>
    </div>
  );
}