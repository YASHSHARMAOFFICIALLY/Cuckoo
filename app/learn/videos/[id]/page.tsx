import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

const VIDEO_DETAILS = {
  v1: {
    title: "Basics of Investing — A Beginner's Complete Guide",
    channel: "FinanceFlow Academy",
    duration: "18 min",
    description:
      "This beginner-friendly investing guide explains stocks, bonds, mutual funds, SIPs, and long-term investing strategies.",
    embed: "https://www.youtube.com/embed/AkMTxMN7res",
  },

  v2: {
    title: "How Mutual Funds Work — Explained in 15 Minutes",
    channel: "FinanceFlow Academy",
    duration: "15 min",
    description:
      "Understand how mutual funds operate, what NAV means, equity vs debt funds, and how beginners can start investing safely.",
    embed: "https://www.youtube.com/embed/-UjN7aOPq1A",
  },
};

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const video =
    VIDEO_DETAILS[id as keyof typeof VIDEO_DETAILS];

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] dark:bg-black">
        <h1 className="text-2xl font-semibold dark:text-white">
          Video not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-black px-6 py-14">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/learn/videos"
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

          Back to videos
        </Link>

        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
            <div>
                <p className="text-[#888] mb-2">
                {video.channel} • {video.duration}
                </p>

                <h1 className="text-4xl font-bold text-[#0F0F0F] dark:text-white leading-tight">
                {video.title}
                </h1>
            </div>

            <ThemeToggle />
        </div>

        {/* Video */}
        <div className="rounded-2xl overflow-hidden border border-[#E8E8E8] dark:border-[#2a2a2a] bg-black shadow-lg">
          <iframe
            className="w-full aspect-video"
            src={video.embed}
            title={video.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        {/* Description */}
        <div className="mt-8 bg-white dark:bg-[#141414] border border-[#E8E8E8] dark:border-[#2a2a2a] rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-[#0F0F0F] dark:text-white mb-4">
            About this video
          </h2>

          <p className="text-[15px] leading-8 text-[#555] dark:text-[#aaa]">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}