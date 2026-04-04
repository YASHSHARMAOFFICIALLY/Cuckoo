// "use client"
// import { useRef, useEffect } from "react";
// import { useScrollReveal } from "@/hooks/useScroeRevel";

// const BLOGS = [
//   {
//     id: 1,
//     tag: "Investing",
//     tagStyle: { bg: "#F0F5FF", text: "#4A6FA5", border: "#D0E0FF" },
//     title: "What is SIP and Why It Builds Wealth Over Time",
//     description:
//       "Understand how Systematic Investment Plans help you invest consistently and reduce market risk through the power of rupee-cost averaging.",
//     readTime: "5 min read",
//     date: "Jan 12, 2025",
//     gradient: "from-[#F0F5FF] to-[#E8EDF8]",
//     illustration: (
//       <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
//         <rect x="4" y="40" width="10" height="16" rx="2" fill="#4A6FA5" opacity="0.3" />
//         <rect x="20" y="30" width="10" height="26" rx="2" fill="#4A6FA5" opacity="0.5" />
//         <rect x="36" y="20" width="10" height="36" rx="2" fill="#4A6FA5" opacity="0.7" />
//         <rect x="52" y="10" width="10" height="46" rx="2" fill="#4A6FA5" />
//         <path d="M4 44L20 36L36 24L52 14L66 8" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//         <circle cx="66" cy="8" r="3" fill="#C9A84C" />
//       </svg>
//     ),
//   },
//   {
//     id: 2,
//     tag: "Banking",
//     tagStyle: { bg: "#F0FBF4", text: "#3A7A5A", border: "#C0E8D0" },
//     title: "The Power of Compound Interest Explained Simply",
//     description:
//       "Learn how compounding can turn modest, regular investments into significant wealth over time — and why starting early is the most powerful financial decision you can make.",
//     readTime: "4 min read",
//     date: "Jan 8, 2025",
//     gradient: "from-[#F0FBF4] to-[#E5F5EC]",
//     illustration: (
//       <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
//         <path d="M8 52C20 48 28 30 40 24C52 18 56 10 70 8" stroke="#3A7A5A" strokeWidth="2" strokeLinecap="round" fill="none" />
//         <path d="M8 52C20 48 28 30 40 24C52 18 56 10 70 8L70 56L8 56Z" fill="#3A7A5A" opacity="0.1" />
//         <circle cx="40" cy="24" r="4" fill="#C9A84C" />
//         <circle cx="70" cy="8" r="5" fill="#3A7A5A" />
//         <text x="64" y="6" fontSize="8" fill="#3A7A5A" fontWeight="700">$</text>
//       </svg>
//     ),
//   },
//   {
//     id: 3,
//     tag: "Planning",
//     tagStyle: { bg: "#F5F1E8", text: "#8B7340", border: "#E8DFC0" },
//     title: "50/30/20 Rule: The Budgeting Framework That Actually Works",
//     description:
//       "A simple, proven budgeting method that splits your income into needs, wants, and savings — without complicated spreadsheets or financial jargon.",
//     readTime: "3 min read",
//     date: "Jan 3, 2025",
//     gradient: "from-[#F5F1E8] to-[#EDE7D8]",
//     illustration: (
//       <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
//         <circle cx="40" cy="30" r="24" stroke="#E8E8E8" strokeWidth="8" fill="none" />
//         <path d="M40 30 L40 6 A24 24 0 0 1 63.1 42Z" fill="#C9A84C" opacity="0.9" />
//         <path d="M40 30 L63.1 42 A24 24 0 0 1 16.9 42Z" fill="#0F0F0F" opacity="0.25" />
//         <path d="M40 30 L16.9 42 A24 24 0 0 1 40 6Z" fill="#8B7340" opacity="0.4" />
//         <text x="52" y="20" fontSize="7" fill="#8B7340" fontWeight="700">50%</text>
//         <text x="46" y="50" fontSize="7" fill="#555" fontWeight="700">30%</text>
//         <text x="20" y="36" fontSize="7" fill="#8B7340" fontWeight="700">20%</text>
//       </svg>
//     ),
//   },
// ];

// function BlogCard({ blog, delay }) {
//   const ref = useScrollReveal(delay);

//   return (
//     <div
//       ref={ref}
//       className="group bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden hover:border-[#D0D0D0] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-pointer flex flex-col"
//     >
//       {/* Illustration area */}
//       <div
//         className={`h-36 bg-gradient-to-br ${blog.gradient} flex items-center justify-center relative overflow-hidden`}
//       >
//         <div className="opacity-80">{blog.illustration}</div>
//         <div className="absolute top-4 left-4">
//           <span
//             className="text-[11px] font-medium px-2.5 py-1 rounded-full"
//             style={{
//               background: blog.tagStyle.bg,
//               color: blog.tagStyle.text,
//               border: `1px solid ${blog.tagStyle.border}`,
//             }}
//           >
//             {blog.tag}
//           </span>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-5 flex flex-col flex-1">
//         <h3 className="text-[15.5px] font-semibold text-[#0F0F0F] tracking-[-0.02em] leading-snug mb-2.5">
//           {blog.title}
//         </h3>
//         <p className="text-[13px] text-[#777] leading-relaxed tracking-[-0.01em] flex-1 mb-4">
//           {blog.description}
//         </p>
//         <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F0F0F0]">
//           <div className="flex items-center gap-3 text-[12px] text-[#AAA]">
//             <span>{blog.date}</span>
//             <span className="w-1 h-1 rounded-full bg-[#DDD]" />
//             <span>{blog.readTime}</span>
//           </div>
//           <span className="text-[12.5px] font-medium text-[#0F0F0F] group-hover:text-[#C9A84C] transition-colors duration-150 flex items-center gap-1">
//             Read
//             <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//               <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function BlogSection() {
//   const headerRef = useScrollReveal();

//   return (
//     <section id="blogs" className="py-20 px-6 bg-[#FAFAF8]">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div ref={headerRef} className="flex items-end justify-between mb-10 flex-wrap gap-5">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8E8E8] mb-4">
//               <span className="text-[12px] text-[#666] font-medium tracking-wide">Latest Articles</span>
//             </div>
//             <h2
//               className="text-[34px] font-semibold tracking-[-0.03em] text-[#0F0F0F] leading-tight"
//               style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
//             >
//               Finance blogs worth reading
//             </h2>
//           </div>
//           <a
//             href="#"
//             className="text-[13.5px] font-medium text-[#555] hover:text-[#0F0F0F] transition-colors duration-200 flex items-center gap-1.5 tracking-[-0.01em]"
//           >
//             View all articles
//             <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
//               <path d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </a>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {BLOGS.map((blog, i) => (
//             <BlogCard key={blog.id} blog={blog} delay={i * 80} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client"
import { useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollRevel";

const BLOGS = [
  {
    id: 1,
    tag: "Investing",
    tagStyle: { bg: "#F0F5FF", text: "#4A6FA5", border: "#D0E0FF" },
    title: "What is SIP and Why It Builds Wealth Over Time",
    description:
      "Understand how Systematic Investment Plans help you invest consistently and reduce market risk through the power of rupee-cost averaging.",
    readTime: "5 min read",
    date: "Jan 12, 2025",
    gradient: "from-[#F0F5FF] to-[#E8EDF8]",
    illustration: <div />, // keep your SVG here
  },
  {
    id: 2,
    tag: "Banking",
    tagStyle: { bg: "#F0FBF4", text: "#3A7A5A", border: "#C0E8D0" },
    title: "The Power of Compound Interest Explained Simply",
    description:
      "Learn how compounding can turn modest investments into wealth over time.",
    readTime: "4 min read",
    date: "Jan 8, 2025",
    gradient: "from-[#F0FBF4] to-[#E5F5EC]",
    illustration: <div />,
  },
  {
    id: 3,
    tag: "Planning",
    tagStyle: { bg: "#F5F1E8", text: "#8B7340", border: "#E8DFC0" },
    title: "50/30/20 Rule: The Budgeting Framework That Works",
    description:
      "A simple budgeting method that splits your income into needs, wants, and savings.",
    readTime: "3 min read",
    date: "Jan 3, 2025",
    gradient: "from-[#F5F1E8] to-[#EDE7D8]",
    illustration: <div />,
  },
];

function BlogCard({ blog, delay }) {
  const ref = useScrollReveal(delay);

  return (
    <div
      ref={ref}
      className="group bg-white dark:bg-[#141414] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#D0D0D0] dark:hover:border-[#444] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-200 cursor-pointer flex flex-col"
    >
      {/* Illustration */}
      <div className={`h-36 bg-gradient-to-br ${blog.gradient} flex items-center justify-center relative`}>
        {blog.illustration}
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
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[15.5px] font-semibold text-[#0F0F0F] dark:text-white mb-2.5">
          {blog.title}
        </h3>

        <p className="text-[13px] text-[#777] dark:text-[#aaa] flex-1 mb-4">
          {blog.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F0F0F0] dark:border-[#2a2a2a]">
          <div className="flex items-center gap-3 text-[12px] text-[#AAA] dark:text-[#666]">
            <span>{blog.date}</span>
            <span className="w-1 h-1 rounded-full bg-[#DDD] dark:bg-[#444]" />
            <span>{blog.readTime}</span>
          </div>

          <span className="text-[12.5px] font-medium text-[#0F0F0F] dark:text-white group-hover:text-[#C9A84C] transition-colors flex items-center gap-1">
            Read →
          </span>
        </div>
      </div>
    </div>
  );
}

export default function BlogSection() {
  const headerRef = useScrollReveal();

  return (
    <section id="blogs" className="py-20 px-6 bg-[#FAFAF8] dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between mb-10 flex-wrap gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#1a1a1a] border border-[#E8E8E8] dark:border-[#2a2a2a] mb-4">
              <span className="text-[12px] text-[#666] dark:text-[#aaa]">
                Latest Articles
              </span>
            </div>

            <h2 className="text-[34px] font-semibold text-[#0F0F0F] dark:text-white">
              Finance blogs worth reading
            </h2>
          </div>

          <a
            href="#"
            className="text-[13.5px] text-[#555] dark:text-[#aaa] hover:text-black dark:hover:text-white flex items-center gap-1"
          >
            View all →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BLOGS.map((blog, i) => (
            <BlogCard key={blog.id} blog={blog} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}