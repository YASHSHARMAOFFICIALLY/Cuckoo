"use client";

import { useEffect, useState } from "react";

const ICONS = {
  savings: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2C4.24 2 2 4.24 2 7s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" stroke="#C9A84C" strokeWidth="1.2" />
      <path d="M7 4.5V7L9 8.5" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  investing: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 10L4.5 7L7 9L9.5 5.5L12 4" stroke="#4A6FA5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="4" r="1.5" fill="#4A6FA5" />
    </svg>
  ),
  learning: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 4L7 2L12 4V7C12 9.76 9.76 11.76 7 12.5C4.24 11.76 2 9.76 2 7V4Z" stroke="#3A7A5A" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5 7L6.5 8.5L9 5.5" stroke="#3A7A5A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  resilience: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="5" width="10" height="7" rx="1.5" stroke="#7A4AA0" strokeWidth="1.2" />
      <path d="M5 5V3.5C5 2.67 5.67 2 6.5 2H7.5C8.33 2 9 2.67 9 3.5V5" stroke="#7A4AA0" strokeWidth="1.2" />
      <circle cx="7" cy="8.5" r="1" fill="#7A4AA0" />
    </svg>
  ),
};

function ScoreRing({ score }) {
  const r = 58;
  const cx = 70;
  const cy = 70;
  const sw = 9;
  const circumference = 2 * Math.PI * r;
  const [dashOffset, setDashOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDashOffset(circumference - (score / 100) * circumference);
    }, 150);

    return () => clearTimeout(timer);
  }, [circumference, score]);

  const scoreColor =
    score >= 80 ? "#C9A84C" : score >= 60 ? "#4A6FA5" : "#D97070";

  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F0F0F0" strokeWidth={sw} />
      {Array.from({ length: 20 }).map((_, index) => {
        const angle = (index / 20) * 360 - 90;
        const rad = (angle * Math.PI) / 180;
        const x1 = cx + (r + 5) * Math.cos(rad);
        const y1 = cy + (r + 5) * Math.sin(rad);
        const x2 = cx + (r + 8) * Math.cos(rad);
        const y2 = cy + (r + 8) * Math.sin(rad);

        return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#E8E8E8"
            strokeWidth="1"
          />
        );
      })}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={scoreColor}
        strokeWidth={sw}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fontSize="28"
        fontWeight="700"
        fill="#0F0F0F"
        fontFamily="'DM Serif Display', Georgia, serif"
      >
        {score}
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fontSize="11"
        fill="#BBB"
        fontFamily="'DM Sans', sans-serif"
      >
        out of 100
      </text>
      <text
        x={cx}
        y={cy + 24}
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill={scoreColor}
        fontFamily="'DM Sans', sans-serif"
      >
        {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Work"}
      </text>
    </svg>
  );
}

function IndicatorBar({ item, delay }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(item.value), 250 + delay);
    return () => clearTimeout(timer);
  }, [delay, item.value]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 min-w-0">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: `${item.color}18` }}
          >
            {ICONS[item.key]}
          </div>
          <span className="text-[12.5px] text-[#444] font-medium tracking-[-0.01em] truncate">
            {item.label}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{
              background: `${item.color}18`,
              color: item.color,
            }}
          >
            {item.status}
          </span>
          <span className="text-[12.5px] font-bold text-[#0F0F0F]">
            {item.value}
          </span>
        </div>
      </div>
      <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            background: item.color,
            transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

export default function FinancialHealthCard({ health }) {
  return (
    <div className="bg-white dark:bg-[#111111] border border-[#E8E8E8] dark:border-[#232323] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[11.5px] font-semibold text-[#888] dark:text-[#777] uppercase tracking-[0.08em] mb-0.5">
            Financial Health
          </div>
          <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
            Your overall score
          </div>
        </div>
        <button className="text-[12px] text-[#888] dark:text-[#888] hover:text-[#0F0F0F] dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-[#F0F0F0] dark:border-[#262626] hover:border-[#D0D0D0] dark:hover:border-[#3A3A3A]">
          Details →
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <ScoreRing score={health.score} />
        </div>

        <div className="flex-1 w-full space-y-4">
          {health.indicators.map((item, index) => (
            <IndicatorBar key={item.label} item={item} delay={index * 100} />
          ))}
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-[#F5F5F5] dark:border-[#222]">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F1E8] dark:bg-[#241E12] border border-[#E8DFC0] dark:border-[#4A3F28]">
          <span className="text-lg">💡</span>
          <div>
            <div className="text-[12px] font-semibold text-[#8B7340] mb-0.5">
              {health.tip.title}
            </div>
            <div className="text-[12px] text-[#8B7340] leading-relaxed">
              {health.tip.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
