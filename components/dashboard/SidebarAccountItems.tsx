"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

export default function SidebarAccountItems() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-[#555] dark:text-[#a8b7c1] hover:bg-[#F5F5F3] dark:hover:bg-[#162129] hover:text-[#0F0F0F] dark:hover:text-[#f4f7f8] mb-0.5 transition-all duration-150"
      >
        <span>⚙️</span>
        Theme
      </button>
      <Link
        href="/coming-soon"
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-[#555] dark:text-[#a8b7c1] hover:bg-[#F5F5F3] dark:hover:bg-[#162129] hover:text-[#0F0F0F] dark:hover:text-[#f4f7f8] mb-0.5 transition-all duration-150"
      >
        <span>💬</span>
        Support
      </Link>
    </>
  );
}
