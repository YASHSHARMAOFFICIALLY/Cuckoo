const TAG_STYLES = {
  Investing:       { bg: "#F0F5FF", text: "#4A6FA5", border: "#D0E0FF" },
  SIP:             { bg: "#F5F1E8", text: "#8B7340", border: "#E8DFC0" },
  Stocks:          { bg: "#F0FBF4", text: "#3A7A5A", border: "#C0E8D0" },
  Budgeting:       { bg: "#FFF0F0", text: "#A04A4A", border: "#F8C8C8" },
  "Mutual Funds":  { bg: "#F8F0FF", text: "#7A4AA0", border: "#E0C8F8" },
  Tax:             { bg: "#F0FBF4", text: "#3A7A5A", border: "#C0E8D0" },
  "Emergency Fund":{ bg: "#F5F5F3", text: "#555",    border: "#E0E0E0" },
  ELSS:            { bg: "#F5F1E8", text: "#8B7340", border: "#E8DFC0" },
  "Index Funds":   { bg: "#F0F5FF", text: "#4A6FA5", border: "#D0E0FF" },
  Crypto:          { bg: "#FFF0F0", text: "#A04A4A", border: "#F8C8C8" },
  "Real Estate":   { bg: "#F0FBF4", text: "#3A7A5A", border: "#C0E8D0" },
  Books:           { bg: "#F8F0FF", text: "#7A4AA0", border: "#E0C8F8" },
  Planning:        { bg: "#F5F1E8", text: "#8B7340", border: "#E8DFC0" },
  Beginner:        { bg: "#F5F5F3", text: "#555",    border: "#E0E0E0" },
};

function getTagStyle(tag) {
  return TAG_STYLES[tag] || { bg: "#F5F5F3", text: "#555", border: "#E0E0E0" };
}

function Avatar({ name, color, size = 8 }) {
  const colors = ["#0F0F0F", "#4A6FA5", "#3A7A5A", "#7A4AA0", "#8B7340", "#A04A4A"];
  const bg = color || colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className={`w-${size} h-${size} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}
      style={{
        background: bg,
        fontSize: size === 8 ? 13 : size === 7 ? 12 : 11,
        width: size * 4,
        height: size * 4,
      }}
    >
      {name[0].toUpperCase()}
    </div>
  );
}

export default function DiscussionCard({ post, onJoin }) {
  const timeAgo = post.timeAgo || "2h ago";

  return (
    <div className="group bg-white border border-[#E8E8E8] rounded-2xl p-5 hover:border-[#D0D0D0] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-all duration-200 cursor-pointer">
      {/* Top row: user + time + optional pin */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <Avatar name={post.author} size={8} />
          <div>
            <span className="text-[13px] font-semibold text-[#0F0F0F] tracking-[-0.01em]">
              {post.author}
            </span>
            {post.badge && (
              <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#F5F1E8] text-[#8B7340] border border-[#E8DFC0]">
                {post.badge}
              </span>
            )}
            <div className="text-[11.5px] text-[#AAA] mt-0.5">{timeAgo}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post.pinned && (
            <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[#F5F1E8] text-[#8B7340] border border-[#E8DFC0]">
              📌 Pinned
            </span>
          )}
          {post.solved && (
            <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[#F0FBF4] text-[#3A7A5A] border border-[#C0E8D0]">
              ✓ Solved
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-[15.5px] font-semibold text-[#0F0F0F] tracking-[-0.02em] leading-snug mb-2 group-hover:text-[#222]">
        {post.title}
      </h3>

      {/* Preview */}
      <p className="text-[13.5px] text-[#777] leading-relaxed tracking-[-0.01em] mb-3 line-clamp-2">
        {post.preview}
      </p>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag) => {
            const s = getTagStyle(tag);
            return (
              <span
                key={tag}
                className="text-[11.5px] font-medium px-2.5 py-0.5 rounded-full"
                style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}

      {/* Bottom: metrics + CTA */}
      <div className="flex items-center justify-between pt-3.5 border-t border-[#F5F5F5]">
        <div className="flex items-center gap-4">
          {/* Replies */}
          <div className="flex items-center gap-1.5 text-[12.5px] text-[#888]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2H12C12.55 2 13 2.45 13 3V9C13 9.55 12.55 10 12 10H4L1 13V3C1 2.45 1.45 2 2 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <span className="font-medium text-[#555]">{post.replies}</span>
            <span>replies</span>
          </div>

          {/* Likes */}
          <div className="flex items-center gap-1.5 text-[12.5px] text-[#888]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 12L2.5 7.5C1.5 6.5 1.5 4.9 2.5 3.9C3.5 2.9 5.1 2.9 6.1 3.9L7 4.8L7.9 3.9C8.9 2.9 10.5 2.9 11.5 3.9C12.5 4.9 12.5 6.5 11.5 7.5L7 12Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <span className="font-medium text-[#555]">{post.likes}</span>
            <span>likes</span>
          </div>

          {/* Views */}
          <div className="flex items-center gap-1.5 text-[12.5px] text-[#888]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7C1 7 3 3 7 3C11 3 13 7 13 7C13 7 11 11 7 11C3 11 1 7 1 7Z" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <span className="font-medium text-[#555]">{post.views}</span>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onJoin?.(post); }}
          className="text-[12.5px] font-medium text-[#555] border border-[#E8E8E8] px-3 py-1.5 rounded-lg hover:bg-[#0F0F0F] hover:text-white hover:border-[#0F0F0F] transition-all duration-150"
        >
          Join Discussion →
        </button>
      </div>
    </div>
  );
}