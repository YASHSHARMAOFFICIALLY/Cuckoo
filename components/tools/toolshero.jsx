export default function ToolsHero() {
  return (
    <section className="pt-32 pb-16 px-6 text-center">
      <div className="max-w-2xl mx-auto" style={{ animation: "fadeUp 0.6s ease both" }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F1E8] border border-[#E8DFC0] mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
          <span className="text-[12px] text-[#8B7340] font-medium tracking-wide">Financial Tools Suite</span>
        </div>

        <h1
          className="text-[48px] leading-[1.1] font-semibold tracking-[-0.035em] text-[#0F0F0F] mb-5 dark:text-white"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif", animationDelay: "0.05s", animation: "fadeUp 0.6s ease both" }}
        >
          Powerful Tools for <span className="text-[#C9A84C]">Smarter</span> Financial Decisions
        </h1>

        <p
          className="text-[16.5px] leading-[1.7] text-[#555] dark:text-neutral-400 mb-9 tracking-[-0.01em]"
          style={{ animation: "fadeUp 0.6s ease 0.15s both" }}
        >
          Calculate investments, track goals, and make confident money decisions
          with simple, beautifully designed financial tools.
        </p>

        <div style={{ animation: "fadeUp 0.6s ease 0.25s both" }} className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#tools-grid"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F0F0F] text-white text-[14px] rounded-xl font-medium hover:bg-[#2a2a2a] transition-all duration-200 shadow-sm tracking-[-0.01em]"
          >
            Start Using Tools
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#" className="text-[14px] text-[#888] hover:text-[#0F0F0F] dark:text-neutral-400 transition-colors duration-200 tracking-[-0.01em]">
            View all calculators →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}