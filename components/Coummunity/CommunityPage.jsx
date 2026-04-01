'use client'
import { useState, useRef } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import CommunityHero from "./CommunityHero";
import CreatePost from "./CreatePost";
import Categories from "./Categories";
import DiscussionFeed from "./Discussionfeed";
import CommunitySidebar from "./Communitysidebar";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-[#0F0F0F] border-b border-[#EBEBEB] dark:border-[#222] flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0F0F0F] dark:bg-white flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 10L7 4L12 10" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="11" r="1.2" fill="#C9A84C" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#0F0F0F] dark:text-white">FinanceFlow</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Tools",     href: "/tools" },
            { label: "Learn",     href: "/learn" },
            { label: "Community", href: "/community", active: true },
            { label: "Pricing",   href: "/pricing" },
          ].map(({ label, href, active }) => (
            <a
              key={label}
              href={href}
              className={`text-[13.5px] tracking-[-0.01em] transition-colors ${
                active
                  ? "text-[#0F0F0F] dark:text-white font-medium"
                  : "text-[#555] dark:text-[#AAA] hover:text-[#0F0F0F] dark:hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/login"
            className="hidden sm:block text-[13.5px] px-4 py-2 rounded-lg border border-[#E0E0E0] dark:border-[#333] text-[#333] dark:text-[#CCC] hover:border-[#0F0F0F] dark:hover:border-white hover:text-[#0F0F0F] dark:hover:text-white transition-all tracking-[-0.01em]"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="text-[13.5px] px-4 py-2 rounded-lg bg-[#0F0F0F] dark:bg-white text-white dark:text-[#0F0F0F] hover:bg-[#2a2a2a] dark:hover:bg-[#E0E0E0] transition-all tracking-[-0.01em] shadow-sm"
          >
            Create Account
          </a>
        </div>
      </div>
    </nav>
  );
}



 export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [newPost, setNewPost] = useState(null);
  const createRef = useRef(null);

  const handleStartDiscussion = () => {
    createRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handlePost = (post) => {
    setNewPost(post);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#111] font-sans antialiased">
      <Navbar />

      <div className="pt-16">
        {/* Hero */}
        <CommunityHero onStartDiscussion={handleStartDiscussion} />

        {/* Main layout */}
        <div className="max-w-6xl mx-auto px-5 py-8">
          <div className="flex gap-6 items-start">
            {/* Left: main content */}
            <div className="flex-1 min-w-0 flex flex-col gap-5">
              {/* Create post */}
              <div ref={createRef}>
                <CreatePost onPost={handlePost} />
              </div>

              {/* Categories */}
              <div className="overflow-x-auto pb-1">
                <Categories active={activeCategory} onChange={setActiveCategory} />
              </div>

              {/* Feed */}
              <DiscussionFeed activeCategory={activeCategory} newPost={newPost} />
            </div>

            {/* Right: sidebar */}
            <div className="w-72 flex-shrink-0 hidden lg:block sticky top-20">
              <CommunitySidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
