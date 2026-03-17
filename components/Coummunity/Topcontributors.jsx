const CONTRIBUTORS = [
  {
    id: 1,
    name: "Rahul Mehta",
    handle: "@rahulmehta",
    answers: 245,
    badge: "🏆",
    badgeLabel: "Top Contributor",
    avatarBg: "#0F0F0F",
    avatarAccent: "#C9A84C",
  },
  {
    id: 2,
    name: "Karthik Raj",
    handle: "@karthikraj",
    answers: 187,
    badge: "📊",
    badgeLabel: "CFA Level 2",
    avatarBg: "#4A6FA5",
    avatarAccent: "#fff",
  },
  {
    id: 3,
    name: "Neha Joshi",
    handle: "@nehajoshi",
    answers: 163,
    badge: "💡",
    badgeLabel: "Finance Nerd",
    avatarBg: "#3A7A5A",
    avatarAccent: "#fff",
  },
  {
    id: 4,
    name: "Divya Patel",
    handle: "@divyapatel",
    answers: 129,
    badge: "⭐",
    badgeLabel: "Rising Star",
    avatarBg: "#7A4AA0",
    avatarAccent: "#fff",
  },
];

export default function TopContributors() {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">🌟</span>
        <div className="text-[13px] font-semibold text-[#0F0F0F] tracking-[-0.01em]">
          Top Contributors
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {CONTRIBUTORS.map((user, i) => (
          <div
            key={user.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FAFAF8] transition-colors cursor-pointer group"
          >
            {/* Rank */}
            <span className="text-[11px] font-bold text-[#DDD] w-4 text-center flex-shrink-0">
              {i + 1}
            </span>

            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0 relative"
              style={{ background: user.avatarBg, color: user.avatarAccent }}
            >
              {user.name[0]}
              {/* Badge overlay */}
              <span
                className="absolute -bottom-0.5 -right-0.5 text-[9px] w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#F0F0F0]"
                title={user.badgeLabel}
              >
                {user.badge}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-[#0F0F0F] tracking-[-0.01em] group-hover:text-[#222] truncate">
                {user.name}
              </div>
              <div className="text-[11.5px] text-[#AAA]">{user.handle}</div>
            </div>

            {/* Answers */}
            <div className="text-right flex-shrink-0">
              <div className="text-[13px] font-bold text-[#0F0F0F]">{user.answers}</div>
              <div className="text-[10.5px] text-[#AAA]">answers</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-[#F5F5F5]">
        <a
          href="#"
          className="text-[12.5px] text-[#888] hover:text-[#0F0F0F] transition-colors font-medium"
        >
          See full leaderboard →
        </a>
      </div>
    </div>
  );
}