"use client";
 
import { useEffect, useState, useCallback } from "react";
 
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
 
  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 300);
  }, []);
 
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
 
  const scrollToTop = () => {
    setIsAnimating(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsAnimating(false), 600);
  };
 
  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`
        fixed bottom-6 right-6 z-50
        w-11 h-11 rounded-full
        bg-white dark:bg-[#1a1a1a]
        border border-[#E0E0E0] dark:border-[#333]
        shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)]
        flex items-center justify-center
        text-[#555] dark:text-[#aaa]
        hover:bg-[#F5F5F3] dark:hover:bg-[#262626]
        hover:border-[#ccc] dark:hover:border-[#444]
        hover:text-[#111] dark:hover:text-white
        hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]
        hover:-translate-y-0.5
        active:translate-y-0 active:scale-95
        transition-all duration-200 ease-out
        ${visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className={`transition-transform duration-300 ${isAnimating ? "-translate-y-0.5" : ""}`}
      >
        <path
          d="M8 12.5V3.5M4 7l4-4 4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}