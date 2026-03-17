const TRENDING = [
  { id: 1, topic: "SIP vs Lump Sum",        count: 234, hot: true },
  { id: 2, topic: "Best Investment Apps",    count: 189, hot: true },
  { id: 3, topic: "Emergency Fund Strategy", count: 156, hot: false },
  { id: 4, topic: "Compound Interest",       count: 143, hot: true },
  { id: 5, topic: "ELSS Tax Saving",         count: 128, hot: false },
  { id: 6, topic: "Nifty 50 Index Fund",     count: 117, hot: false },
  { id: 7, topic: "Budgeting for Beginners", count: 98,  hot: false },
];

export default function TrendingTopics() {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">🔥</span>
        <div className="text-[13px] font-semibold text-[#0F0F0F] tracking-[-0.01em]">
          Trending Topics
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {TRENDING.map((item, i) => (
          <a
            key={item.id}
            href="#"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#FAFAF8] transition-colors duration-150 group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[11.5px] font-bold text-[#DDD] w-4 text-right">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[13px] text-[#444] group-hover:text-[#0F0F0F] transition-colors tracking-[-0.01em] font-medium">
                {item.topic}
              </span>
              {item.hot && (
                <span className="text-[10px]">🔥</span>
              )}
            </div>
            <span className="text-[11.5px] text-[#BBB] font-medium">{item.count}</span>
          </a>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-[#F5F5F5]">
        <a
          href="#"
          className="text-[12.5px] text-[#888] hover:text-[#0F0F0F] transition-colors font-medium"
        >
          View all topics →
        </a>
      </div>
    </div>
  );
}
