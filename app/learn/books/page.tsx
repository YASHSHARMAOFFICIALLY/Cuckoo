import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const BOOKS = [
  {
    id: 1,
    title: "The Psychology of Money",
    author: "Morgan Housel",
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
  },
  {
    id: 3,
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
  },
];

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-black px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Top Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
          <Link
            href="/learn#books"
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

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#0F0F0F] dark:text-white mb-4">
            Recommended Books
          </h1>

          <p className="text-[#666] dark:text-[#aaa] max-w-2xl leading-7">
            Explore timeless finance, investing, and wealth-building books curated for learners and long-term investors.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BOOKS.map((book) => (
            <Link
              key={book.id}
              href={`/learn/books/${book.id}`}
              className="group bg-white dark:bg-[#141414] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              <h2 className="text-2xl font-semibold text-[#0F0F0F] dark:text-white mb-2 group-hover:text-[#C9A84C] transition-colors">
                {book.title}
              </h2>

              <p className="text-[#777] dark:text-[#aaa] mb-6">
                by {book.author}
              </p>

              <div className="text-[14px] font-medium text-[#C9A84C]">
                Read summary →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}