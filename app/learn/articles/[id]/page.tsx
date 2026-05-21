import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const ARTICLE_DETAILS = {
  1: {
    title: "What is SIP and Why It Builds Wealth Over Time",
    category: "Investing",
    date: "Jan 12, 2025",
    readTime: "5 min read",
    content:
      "A Systematic Investment Plan (SIP) is one of the simplest and most effective ways to build long-term wealth through disciplined investing. Instead of investing a large amount all at once, SIP allows individuals to invest smaller fixed amounts regularly into mutual funds. This approach encourages consistency and helps investors develop strong financial habits over time. One of the biggest advantages of SIP investing is rupee-cost averaging, which means investors buy more units when markets are low and fewer units when markets are high, reducing the impact of market volatility. SIPs also benefit greatly from the power of compounding, where returns generated over time begin to generate additional returns, significantly increasing wealth over the long term. SIPs are ideal for beginners because they reduce emotional decision-making and make investing accessible even with small monthly contributions. They also promote financial discipline by automating investments and encouraging long-term thinking rather than short-term market speculation. Whether the goal is retirement planning, wealth creation, education funding, or financial independence, SIPs provide a practical and low-stress method for achieving financial goals steadily over time.",
  },

  2: {
    title: "The Power of Compound Interest Explained Simply",
    category: "Banking",
    date: "Jan 8, 2025",
    readTime: "4 min read",
    content:
      "Compound interest is often described as one of the most powerful concepts in finance because it allows money to grow exponentially over time. Unlike simple interest, where returns are calculated only on the original investment, compound interest generates returns on both the principal amount and the accumulated earnings. This means investments grow faster as time passes. The earlier someone starts investing, the greater the benefits of compounding because the investment gets more time to grow. Even small regular investments can become substantial over long periods when compounded consistently. Compound interest plays a major role in long-term wealth creation, retirement planning, and investment growth through mutual funds, fixed deposits, and stock market investments. It also highlights the importance of patience and long-term consistency rather than chasing quick profits. Understanding compounding helps individuals appreciate why saving and investing early can significantly improve financial security and future wealth.",
  },

  3: {
    title: "50/30/20 Rule: The Budgeting Framework That Works",
    category: "Planning",
    date: "Jan 3, 2025",
    readTime: "3 min read",
    content:
      "The 50/30/20 budgeting rule is a simple and practical framework that helps individuals manage their money effectively by dividing income into three categories. According to this method, 50% of income should be allocated to essential needs such as rent, groceries, transportation, utilities, and healthcare. Around 30% can be used for wants, including entertainment, travel, hobbies, dining out, and lifestyle expenses. The remaining 20% is dedicated to savings, investments, emergency funds, or debt repayment. This budgeting approach works well because it creates balance between financial responsibility and personal enjoyment while encouraging long-term financial stability. The rule is easy to follow and flexible enough for different income levels and lifestyles. It also helps individuals avoid overspending, build emergency savings, and stay focused on financial goals. By consistently applying the 50/30/20 rule, people can improve money management habits, reduce financial stress, and create a healthier financial future.",
  },
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article =
    ARTICLE_DETAILS[id as keyof typeof ARTICLE_DETAILS];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] dark:bg-black">
        <h1 className="text-2xl font-semibold dark:text-white">
          Article not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-black px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Top Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
          <Link
            href="/learn/articles"
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

            Back to blogs
          </Link>

          <ThemeToggle />
        </div>

        {/* Article Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 text-[13px] text-[#888] mb-5">
            <span>{article.category}</span>

            <span className="w-1 h-1 rounded-full bg-[#CCC]" />

            <span>{article.date}</span>

            <span className="w-1 h-1 rounded-full bg-[#CCC]" />

            <span>{article.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#0F0F0F] dark:text-white">
            {article.title}
          </h1>
        </div>

        {/* Article Content */}
        <div className="bg-white dark:bg-[#141414] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl p-8 md:p-10">
          <p className="text-[16px] leading-9 text-[#555] dark:text-[#aaa]">
            {article.content}
          </p>
        </div>
      </div>
    </div>
  );
}