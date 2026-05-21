import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";


const BOOK_DETAILS = {
  1: {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    summary:
      "The Psychology of Money explores how people think about wealth, success, and financial decisions in everyday life. Instead of focusing only on formulas or investment strategies, the book explains how emotions, habits, behavior, and mindset play a major role in building long-term financial stability. Through real-life stories and practical lessons, Morgan Housel shows that managing money is less about intelligence and more about discipline, patience, and understanding human behavior. The book highlights important financial principles such as saving consistently, avoiding unnecessary risks, staying patient during market changes, and defining personal success on your own terms. It also explains how luck and risk influence financial outcomes, why compounding is powerful, and how financial freedom often matters more than showing wealth. Written in a simple and engaging style, The Psychology of Money offers timeless insights for investors, entrepreneurs, students, and anyone who wants to improve their relationship with money. The book encourages readers to make smarter financial decisions by focusing on long-term thinking, emotional control, and sustainable habits rather than chasing quick success. Whether you are new to personal finance or already experienced in investing, this bestselling book provides valuable lessons that can help you build wealth wisely and achieve greater financial confidence.",
  },
  2: {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    summary:
      "Rich Dad Poor Dad is a widely popular personal finance book that challenges traditional ideas about money, education, and wealth creation. Through the story of two father figures—one highly educated but financially struggling, and the other financially successful despite limited formal education—Robert Kiyosaki explains the different mindsets that shape financial success. The book focuses on essential financial concepts such as building assets, creating passive income, understanding cash flow, and developing financial intelligence. It encourages readers to think beyond working only for a paycheck and instead learn how money can work for them through investments, businesses, and smart financial decisions. One of the key lessons in Rich Dad Poor Dad is the importance of financial education, which the author believes is often missing from traditional schooling. The book explains the difference between assets and liabilities, highlights the value of entrepreneurship, and emphasizes taking calculated risks to achieve long-term financial independence. Written in a simple and motivational style, the book inspires readers to rethink their approach to money management, career choices, and investing. It is especially popular among entrepreneurs, investors, students, and individuals seeking financial freedom and a better understanding of wealth-building strategies. Rich Dad Poor Dad remains one of the most influential personal finance books for anyone looking to improve their financial mindset, increase financial literacy, and create a stronger foundation for long-term wealth.",
  },
  3: {
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    summary:
      "The Intelligent Investor is one of the most influential books ever written on investing and financial management. Written by Benjamin Graham, widely regarded as the father of value investing, the book provides timeless strategies for building long-term wealth through disciplined and rational investment decisions. The book focuses on the principles of value investing, teaching readers how to analyze stocks carefully, reduce investment risks, and avoid emotional decision-making in the financial markets. Benjamin Graham emphasizes the importance of patience, consistency, and protecting investments from significant losses rather than chasing quick profits or market trends. One of the central ideas in The Intelligent Investor is the concept of “Mr. Market,” which explains how investors should avoid being influenced by market emotions and short-term price fluctuations. The book also introduces the idea of investing with a margin of safety, encouraging investors to buy assets at reasonable prices to minimize risks and maximize long-term returns. Written in a practical and educational style, the book is suitable for both beginner and experienced investors who want to develop a strong understanding of stock market investing, portfolio management, and financial discipline. Its lessons continue to influence modern investing strategies and have inspired many successful investors around the world. The Intelligent Investor is considered an essential read for anyone interested in personal finance, stock market investing, wealth creation, and long-term financial success through smart and disciplined investing principles.",
  },
};

export default async function BookSummaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const book =
    BOOK_DETAILS[id as keyof typeof BOOK_DETAILS];

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:text-white">
        Book not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-black px-6 py-14">
      <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
          <Link
            href="/learn/books"
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

            Back to books
          </Link>

          <ThemeToggle />
        </div>

        <h1 className="text-4xl font-bold dark:text-white mb-3">
          {book.title}
        </h1>

        <p className="text-[#888] mb-8">
          by {book.author}
        </p>

        <div className="bg-white dark:bg-[#141414] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl p-8">
          <h2 className="text-2xl font-semibold dark:text-white mb-4">
            Summary
          </h2>

          <p className="text-[15px] leading-8 text-[#555] dark:text-[#aaa]">
            {book.summary}
          </p>
        </div>
      </div>
    </div>
  );
}