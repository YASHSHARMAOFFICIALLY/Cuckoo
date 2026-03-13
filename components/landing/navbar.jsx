import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_#e5e5e5]" : "bg-white"
      }`}
      style={{ height: 64 }}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-[#0F0F0F] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 10L7 4L12 10" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="11" r="1.2" fill="#C9A84C"/>
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#0F0F0F]">FinanceFlow</span>
        </a>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Tools", "Learn", "Blog", "Pricing"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[13.5px] text-[#555] hover:text-[#0F0F0F] transition-colors duration-200 tracking-[-0.01em]"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden sm:block text-[13.5px] px-4 py-2 rounded-lg border border-[#E0E0E0] text-[#333] hover:border-[#0F0F0F] hover:text-[#0F0F0F] transition-all duration-200 tracking-[-0.01em]"
          >
            Log In
          </a>
          <a
            href="#"
            className="text-[13.5px] px-4 py-2 rounded-lg bg-[#0F0F0F] text-white hover:bg-[#2a2a2a] transition-all duration-200 tracking-[-0.01em] shadow-sm"
          >
            Create Account
          </a>
        </div>
      </div>
    </nav>
  );
}