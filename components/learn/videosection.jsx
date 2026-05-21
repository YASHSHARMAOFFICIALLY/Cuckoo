// "use client"
// import { useState } from "react";
// import { useScrollReveal } from "@/hooks/useScrollRevel";// 

// const VIDEOS = [
//   {
//     id: "v1",
//     title: "Basics of Investing — A Beginner's Complete Guide",
//     description:
//       "Start from zero. This video covers stocks, bonds, mutual funds, and how to begin investing with as little as ₹500/month.",
//     duration: "18 min",
//     views: "2.4L views",
//     channel: "FinanceFlow Academy",
//     thumbBg: "#0F0F0F",
//     thumbAccent: "#C9A84C",
//      videoUrl: "https://www.youtube.com/embed/AkMTxMN7res",
    
//   },
//   {
//     id: "v2",
//     title: "How Mutual Funds Work — Explained in 15 Minutes",
//     description:
//       "Demystify mutual funds: what NAV means, how fund managers operate, the difference between equity and debt funds, and how to pick the right one.",
//     duration: "15 min",
//     views: "1.8L views",
//     channel: "FinanceFlow Academy",
//     thumbBg: "#1A2A4A",
//     thumbAccent: "#4A6FA5",
//     illustration: (
//       <svg width="100" height="70" viewBox="0 0 100 70" fill="none">
//         <circle cx="50" cy="35" r="28" stroke="white" strokeWidth="1.2" opacity="0.2" />
//         <circle cx="50" cy="35" r="18" stroke="white" strokeWidth="1.2" opacity="0.3" />
//         <path d="M50 35 L50 10 A25 25 0 0 1 71.7 47.5Z" fill="#4A6FA5" opacity="0.7" />
//         <path d="M50 35 L71.7 47.5 A25 25 0 0 1 28.3 47.5Z" fill="white" opacity="0.15" />
//         <path d="M50 35 L28.3 47.5 A25 25 0 0 1 50 10Z" fill="#C9A84C" opacity="0.5" />
//         <circle cx="50" cy="35" r="5" fill="white" />
//       </svg>
//     ),
//   },
// ];

// function PlayButton() {
//   return (
//     <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200 cursor-pointer">
//       <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//         <path d="M7 5L16 10L7 15V5Z" fill="white" />
//       </svg>
//     </div>
//   );
// }

// function VideoCard({ video, delay }) {
//   const ref = useScrollReveal(delay);
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       ref={ref}
//       className="group bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden hover:border-[#D0D0D0] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-pointer"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Thumbnail */}
//       <div
//         className="relative h-48 flex items-center justify-center overflow-hidden"
//         style={{ background: video.thumbBg }}
//       >
//         {/* Subtle grid pattern */}
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
//             backgroundSize: "24px 24px",
//           }}
//         />
//         <div className="relative z-10 opacity-70">{video.illustration}</div>

//         {/* Play button overlay */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <PlayButton />
//         </div>

//         {/* Duration badge */}
//         <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 text-white text-[11px] font-medium tracking-wide">
//           {video.duration}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-5">
//         <div className="flex items-center gap-2 mb-3">
//           <div className="w-5 h-5 rounded-full bg-[#0F0F0F] flex items-center justify-center">
//             <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
//               <path d="M2 1.5L6.5 4L2 6.5V1.5Z" fill="#C9A84C" />
//             </svg>
//           </div>
//           <span className="text-[12px] text-[#888] font-medium">{video.channel}</span>
//           <span className="w-1 h-1 rounded-full bg-[#DDD]" />
//           <span className="text-[12px] text-[#AAA]">{video.views}</span>
//         </div>

//         <h3 className="text-[15px] font-semibold text-[#0F0F0F] tracking-[-0.02em] leading-snug mb-2">
//           {video.title}
//         </h3>
//         <p className="text-[13px] text-[#777] leading-relaxed tracking-[-0.01em] line-clamp-2">
//           {video.description}
//         </p>

//         <div className="mt-4 pt-4 border-t border-[#F0F0F0] flex items-center justify-between">
//           <span className="text-[12px] text-[#AAA]">Free to watch</span>
//           <span className="text-[12.5px] font-medium text-[#0F0F0F] group-hover:text-[#C9A84C] transition-colors flex items-center gap-1">
//             Watch now
//             <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//               <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
//             </svg>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function VideoSection() {
//   const headerRef = useScrollReveal();

//   return (
//     <section className="py-20 px-6 bg-white dark:bg-black">
//       <div className="max-w-6xl mx-auto">
//         <div ref={headerRef} className="flex items-end justify-between mb-10 flex-wrap gap-5">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F5F3] border border-[#E8E8E8] mb-4">
//               <span className="text-[12px] text-[#666] font-medium tracking-wide dark:text-white">Video Lessons</span>
//             </div>
//             <h2
//               className="text-[34px] font-semibold tracking-[-0.03em] text-[#0F0F0F] leading-tight dark:text-white"
//               style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
//             >
//               Watch & learn at your pace
//             </h2>
//           </div>
//           <a
//             href="#"
//             className="text-[13.5px] font-medium text-[#555] hover:text-[#0F0F0F] transition-colors duration-200 flex items-center gap-1.5 dark:text-shadow-white"
//           >
//             All videos
//             <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
//               <path d="M2.5 6.5H10.5M10.5 6.5L7 3M10.5 6.5L7 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//             </svg>
//           </a>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           {VIDEOS.map((v, i) => (
//             <VideoCard key={v.id} video={v} delay={i * 100} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }





"use client";

import { useState } from "react";
// import { useScrollReveal } from "@/hooks/useScrollReveal";
 import { useScrollReveal } from "@/hooks/useScrollRevel" // ✅ fixed typo
 import Link from "next/link";

const VIDEOS = [
  {
    id: "v1",
    title: "Basics of Investing — A Beginner's Complete Guide",
    description:
      "Start from zero. This video covers stocks, bonds, mutual funds, and how to begin investing with as little as ₹500/month.",
    duration: "18 min",
    views: "2.4L views",
    channel: "FinanceFlow Academy",
    thumbBg: "#0F0F0F",
    videoUrl: "https://youtu.be/AkMTxMN7res",
  },
  {
    id: "v2",
    title: "How Mutual Funds Work — Explained in 15 Minutes",
    description:
      "Demystify mutual funds: what NAV means, how fund managers operate, the difference between equity and debt funds, and how to pick the right one.",
    duration: "15 min",
    views: "1.8L views",
    channel: "FinanceFlow Academy",
    thumbBg: "#1A2A4A",
    videoUrl: "https://youtu.be/-UjN7aOPq1A?si=9TsYbpuuXUnSosOO", // ⚠️ replace with real one
  },
];

function PlayButton() {
  return (
    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200 cursor-pointer">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7 5L16 10L7 15V5Z" fill="white" />
      </svg>
    </div>
  );
}

function VideoCard({ video, delay }) {
  const ref = useScrollReveal(delay);
  const [playing, setPlaying] = useState(false);

  // Convert YouTube → embed
  const getEmbedUrl = (url) => {
    if (!url) return null;
    return url
      .replace("youtu.be/", "www.youtube.com/embed/")
      .replace("?si=", "?autoplay=1&si=");
  };

  return (
    <div
      ref={ref}
      className="group bg-white dark:bg-[#0a0f12] border border-[#E8E8E8] dark:border-[#222] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-200"
    >
      {/* Thumbnail / Video */}
      <div
        className="relative h-48 flex items-center justify-center overflow-hidden"
        style={{ background: video.thumbBg }}
      >
        {playing && video.videoUrl ? (
          <iframe
            className="w-full h-full"
            src={getEmbedUrl(video.videoUrl)}
            title={video.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <>
            {/* Grid effect */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div onClick={() => setPlaying(true)}>
                <PlayButton />
              </div>
            </div>

            {/* Duration */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 text-white text-[11px]">
              {video.duration}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[12px] text-[#888] dark:text-[#aaa]">
            {video.channel}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#DDD]" />
          <span className="text-[12px] text-[#AAA]">{video.views}</span>
        </div>

        <h3 className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white mb-2">
          {video.title}
        </h3>

        <p className="text-[13px] text-[#777] dark:text-[#bbb] line-clamp-2">
          {video.description}
        </p>

        <div className="mt-4 pt-4 border-t border-[#F0F0F0] dark:border-[#222] flex justify-between">
          <span className="text-[12px] text-[#AAA]">Free to watch</span>
          <Link
            href={`/learn/videos/${video.id}`} 
            className="text-[12.5px] font-medium text-[#0F0F0F] dark:text-white">
            Watch now →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VideoSection() {
  const headerRef = useScrollReveal();

  return (
    <section id="watch" className="py-20 px-6 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className="flex justify-between mb-10 flex-wrap gap-5"
        >
          <h2 className="text-3xl font-semibold dark:text-white">
            Watch & learn at your pace
          </h2>

          <Link
            href="/learn/videos"
            className="text-[13.5px] text-[#555] dark:text-[#aaa] hover:text-black dark:hover:text-white flex items-center gap-1"
          >
            View all videos →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VIDEOS.map((v, i) => (
            <VideoCard key={v.id} video={v} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}