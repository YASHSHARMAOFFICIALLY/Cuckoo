"use client"
import { useScrollReveal } from "@/hooks/useScrollRevel";

const BOOKS = [
  {
    id: 1,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    year: "2020",
    pages: "256 pages",
    description:
      "Timeless lessons on wealth, greed, and happiness. Housel argues that financial success is less about what you know and more about how you behave.",
    tag: "Investing Mindset",
    tagStyle: { bg: "#F5F1E8", text: "#8B7340", border: "#E8DFC0" },
    spineColor: "#0F0F0F",
    coverColor: "#1A1A1A",
    accentColor: "#C9A84C",
    coverIllustration: (
      <svg width="36" height="50" viewBox="0 0 36 50" fill="none">
        <rect width="36" height="50" rx="2" fill="#1A1A1A" />
        <circle cx="18" cy="20" r="10" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
        <path d="M12 20C12 16.686 14.686 14 18 14" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 14V20L22 24" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="6" y="36" width="24" height="1.5" rx="0.75" fill="#C9A84C" opacity="0.4" />
        <rect x="6" y="40" width="18" height="1.5" rx="0.75" fill="#C9A84C" opacity="0.3" />
        <rect x="6" y="44" width="21" height="1.5" rx="0.75" fill="#C9A84C" opacity="0.2" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    year: "1997",
    pages: "336 pages",
    description:
      "The #1 personal finance book of all time. Kiyosaki challenges conventional thinking about money, jobs, and wealth — with a focus on assets vs. liabilities.",
    tag: "Financial Mindset",
    tagStyle: { bg: "#FFF0F0", text: "#A04A4A", border: "#F8C8C8" },
    spineColor: "#8A1A1A",
    coverColor: "#A52020",
    accentColor: "#FFD700",
    coverIllustration: (
      <svg width="36" height="50" viewBox="0 0 36 50" fill="none">
        <rect width="36" height="50" rx="2" fill="#A52020" />
        <path d="M18 8L22 16H28L23 21L25 30L18 25L11 30L13 21L8 16H14L18 8Z" fill="#FFD700" opacity="0.85" />
        <rect x="6" y="36" width="24" height="1.5" rx="0.75" fill="white" opacity="0.3" />
        <rect x="6" y="40" width="16" height="1.5" rx="0.75" fill="white" opacity="0.2" />
        <rect x="6" y="44" width="20" height="1.5" rx="0.75" fill="white" opacity="0.15" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    year: "1949",
    pages: "640 pages",
    description:
      "Warren Buffett's favourite book and the definitive guide to value investing. Graham's principles have stood the test of time across bull and bear markets.",
    tag: "Value Investing",
    tagStyle: { bg: "#F0F5FF", text: "#4A6FA5", border: "#D0E0FF" },
    spineColor: "#1A3050",
    coverColor: "#1E3A5F",
    accentColor: "#6B9FD4",
    coverIllustration: (
      <svg width="36" height="50" viewBox="0 0 36 50" fill="none">
        <rect width="36" height="50" rx="2" fill="#1E3A5F" />
        <rect x="5" y="30" width="6" height="14" rx="1" fill="#6B9FD4" opacity="0.5" />
        <rect x="13" y="22" width="6" height="22" rx="1" fill="#6B9FD4" opacity="0.65" />
        <rect x="21" y="14" width="6" height="30" rx="1" fill="#6B9FD4" opacity="0.8" />
        <path d="M5 32L13 24L21 16L29 10" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="29" cy="10" r="2.5" fill="#C9A84C" />
        <rect x="5" y="7" width="26" height="1.5" rx="0.75" fill="white" opacity="0.25" />
      </svg>
    ),
  },
];

function BookCard({ book, delay }) {
  const ref = useScrollReveal(delay);

  return (
    <div
      ref={ref}
      className="group bg-white border border-[#E8E8E8] rounded-2xl p-6 hover:border-[#D0D0D0] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200 flex gap-5 dark:bg-[#141414]"
    >
      {/* Book cover */}
      <div className="flex-shrink-0">
        <div
          className="w-14 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.2)] overflow-hidden"
          style={{ height: 88 }}
        >
          {book.coverIllustration}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em] leading-snug">
            {book.title}
          </h3>
          <span
            className="text-[10.5px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
            style={{
              background: book.tagStyle.bg,
              color: book.tagStyle.text,
              border: `1px solid ${book.tagStyle.border}`,
            }}
          >
            {book.tag}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2.5 text-[12px] text-[#888]">
          <span className="font-medium">{book.author}</span>
          <span className="w-1 h-1 rounded-full bg-[#DDD] dark:bg-[#444] " />
          <span>{book.year}</span>
          <span className="w-1 h-1 rounded-full bg-[#DDD] dark:bg-[#444]" />
          <span>{book.pages}</span>
        </div>

        <p className="text-[13px] text-[#777] leading-relaxed tracking-[-0.01em] line-clamp-2 mb-3">
          {book.description}
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[#0F0F0F] group-hover:text-[#C9A84C] transition-colors duration-150"
        >
          Read summary
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function BooksSection() {
  const headerRef = useScrollReveal();

  return (
    <section className="py-20 px-6 bg-[#FAFAF8] dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="flex items-end justify-between mb-10 flex-wrap gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8E8E8] mb-4">
              <span className="text-[12px] text-[#666] font-medium tracking-wide">Recommended Reading</span>
            </div>
            <h2
              className="text-[34px] font-semibold tracking-[-0.03em] text-[#0F0F0F] leading-tight dark:text-white"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Books every investor should read
            </h2>
          </div>
          <a
            href="#"
            className="text-[13.5px] font-medium text-[#555] hover:text-[#0F0F0F] transition-colors duration-200 flex items-center gap-1.5 dark:text-white"
          >
            Full reading list
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </a>
        </div>

        <div className="flex flex-col gap-4">
          {BOOKS.map((book, i) => (
            <BookCard key={book.id} book={book} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

