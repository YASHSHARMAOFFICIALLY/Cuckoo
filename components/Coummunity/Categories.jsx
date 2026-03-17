'use client'
import { useState } from "react";

export const CATEGORIES = [
  { id: "all",       label: "All",              emoji: "✦",  count: 1840 },
  { id: "investing", label: "Investing",         emoji: "📈", count: 542 },
  { id: "stocks",    label: "Stock Market",      emoji: "💹", count: 318 },
  { id: "mf",        label: "Mutual Funds",      emoji: "🏦", count: 274 },
  { id: "savings",   label: "Saving Money",      emoji: "💰", count: 201 },
  { id: "planning",  label: "Financial Planning", emoji: "🎯", count: 188 },
  { id: "books",     label: "Books & Learning",  emoji: "📚", count: 117 },
  { id: "tax",       label: "Tax Planning",      emoji: "🧾", count: 94 },
  { id: "crypto",    label: "Crypto",            emoji: "🔗", count: 106 },
];

export default function Categories({ active, onChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium border transition-all duration-150 ${
              isActive
                ? "bg-[#0F0F0F] text-white border-[#0F0F0F] shadow-sm"
                : "bg-white text-[#555] border-[#E8E8E8] hover:border-[#C0C0C0] hover:text-[#0F0F0F]"
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
            <span
              className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-[#F5F5F3] text-[#888]"
              }`}
            >
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}