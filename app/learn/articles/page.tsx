import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const BLOGS = [
  {
    id: 1,
    tag: "Investing",
    tagStyle: {
      bg: "#F0F5FF",
      text: "#4A6FA5",
      border: "#D0E0FF",
    },
    title: "What is SIP and Why It Builds Wealth Over Time",
    description:
      "Understand how Systematic Investment Plans help you invest consistently and reduce market risk through the power of rupee-cost averaging.",
    readTime: "5 min read",
    date: "Jan 12, 2025",
    gradient: "from-[#F0F5FF] to-[#E8EDF8]",
  },
  {
    id: 2,
    tag: "Banking",
    tagStyle: {
      bg: "#F0FBF4",
      text: "#3A7A5A",
      border: "#C0E8D0",
    },
    title: "The Power of Compound Interest Explained Simply",
    description:
      "Learn how compounding can turn modest investments into wealth over time.",
    readTime: "4 min read",
    date: "Jan 8, 2025",
    gradient: "from-[#F0FBF4] to-[#E5F5EC]",
  },
  {
    id: 3,
    tag: "Planning",
    tagStyle: {
      bg: "#F5F1E8",
      text: "#8B7340",
      border: "#E8DFC0",
    },
    title: "50/30/20 Rule: The Budgeting Framework That Works",
    description:
      "A simple budgeting method that splits your income into needs, wants, and savings.",
    readTime: "3 min read",
    date: "Jan 3, 2025",
    gradient: "from-[#F5F1E8] to-[#EDE7D8]",
  },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-black px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Top Navigation */}
        <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
          <Link
            href="/learn#blogs"
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
            All Articles
          </h1>

          <p className="text-[#666] dark:text-[#aaa] max-w-2xl leading-7">
            Explore curated finance and investing articles designed to simplify complex concepts and improve financial literacy.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOGS.map((blog) => (
            <Link
              key={blog.id}
              href={`/learn/articles/${blog.id}`}
              className="group bg-white dark:bg-[#141414] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              {/* Top */}
              <div
                className={`h-36 bg-gradient-to-br ${blog.gradient} relative`}
              >
                <div className="absolute top-4 left-4">
                  <span
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: blog.tagStyle.bg,
                      color: blog.tagStyle.text,
                      border: `1px solid ${blog.tagStyle.border}`,
                    }}
                  >
                    {blog.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3 text-[12px] text-[#AAA] dark:text-[#666] mb-4">
                  <span>{blog.date}</span>

                  <span className="w-1 h-1 rounded-full bg-[#DDD] dark:bg-[#444]" />

                  <span>{blog.readTime}</span>
                </div>

                <h2 className="text-[20px] font-semibold text-[#0F0F0F] dark:text-white mb-3 group-hover:text-[#C9A84C] transition-colors">
                  {blog.title}
                </h2>

                <p className="text-[14px] leading-7 text-[#666] dark:text-[#aaa] mb-6">
                  {blog.description}
                </p>

                <div className="text-[14px] font-medium text-[#C9A84C]">
                  Read article →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}