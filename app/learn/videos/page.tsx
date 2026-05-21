import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
const VIDEOS = [
  {
    id: "v1",
    title: "Basics of Investing — A Beginner's Complete Guide",
    description:
      "Learn stocks, bonds, mutual funds, and how to start investing.",
    duration: "18 min",
    views: "2.4L views",
    channel: "FinanceFlow Academy",
  },
  {
    id: "v2",
    title: "How Mutual Funds Work — Explained in 15 Minutes",
    description:
      "Understand mutual funds, NAV, equity funds, and debt funds.",
    duration: "15 min",
    views: "1.8L views",
    channel: "FinanceFlow Academy",
  },
];

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-black px-6 py-14">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/learn#watch"
          className="inline-flex items-center gap-2 mb-8 text-[14px] text-[#555] dark:text-[#aaa] hover:text-black dark:hover:text-white transition-colors"
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
        
        <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
            <div>
                <h1 className="text-4xl font-bold text-[#0F0F0F] dark:text-white mb-3">
                Finance Learning Videos
                </h1>

                <p className="text-[#666] dark:text-[#aaa] max-w-2xl">
                Watch curated finance and investing videos designed for beginners and long-term learners.
                </p>
            </div>

            <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VIDEOS.map((video) => (
            <Link
              key={video.id}
              href={`/learn/videos/${video.id}`}
              className="group bg-white dark:bg-[#141414] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              {/* Thumbnail */}
              <div className="h-52 bg-[#0F0F0F] flex items-center justify-center relative">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                    <path d="M7 5L16 10L7 15V5Z" fill="white" />
                  </svg>
                </div>

                <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-lg bg-black/60 text-white text-[11px]">
                  {video.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[12px] text-[#888] dark:text-[#aaa]">
                    {video.channel}
                  </span>

                  <span className="w-1 h-1 rounded-full bg-[#DDD]" />

                  <span className="text-[12px] text-[#AAA]">
                    {video.views}
                  </span>
                </div>

                <h2 className="text-[18px] font-semibold text-[#0F0F0F] dark:text-white mb-2">
                  {video.title}
                </h2>

                <p className="text-[14px] text-[#666] dark:text-[#aaa] leading-relaxed">
                  {video.description}
                </p>

                <div className="mt-5 text-[13px] font-medium text-[#C9A84C]">
                  Watch video →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}