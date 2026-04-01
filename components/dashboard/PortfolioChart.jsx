"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RANGES = ["1M", "3M", "6M", "1Y", "All"];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  const inv = payload[1]?.value;
  const gain = val - inv;
  const pct = ((gain / inv) * 100).toFixed(1);

  return (
    <div className="bg-white dark:bg-[#111111] border border-[#E8E8E8] dark:border-[#232323] rounded-xl p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] min-w-[160px]">
      <div className="text-[11.5px] text-[#888] mb-2 font-medium">{label}</div>
      <div className="text-[16px] font-bold text-[#0F0F0F] tracking-[-0.03em]">
        ₹{val?.toLocaleString("en-IN")}
      </div>
      <div className="text-[11.5px] text-[#888] mt-1">
        Invested: ₹{inv?.toLocaleString("en-IN")}
      </div>
      <div
        className={`text-[11.5px] font-semibold mt-0.5 ${
          gain >= 0 ? "text-[#3A7A5A]" : "text-[#D97070]"
        }`}
      >
        {gain >= 0 ? "+" : ""}₹{Math.abs(gain).toLocaleString("en-IN")} ({pct}%)
      </div>
    </div>
  );
}

export default function PortfolioChart({ portfolio }) {
  const [range, setRange] = useState("1M");
  const data = portfolio.series[range] || [];
  const fallback = data[data.length - 1] || {
    value: portfolio.currentValue,
    invested: portfolio.investedValue,
  };
  const gain = fallback.value - fallback.invested;
  const gainPct = ((gain / fallback.invested) * 100).toFixed(1);
  const isPositive = gain >= 0;

  return (
    <div className="bg-white dark:bg-[#111111] border border-[#E8E8E8] dark:border-[#232323] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <div className="text-[11.5px] font-semibold text-[#888] dark:text-[#777] uppercase tracking-[0.08em] mb-1">
            Portfolio Value
          </div>
          <div className="flex items-baseline gap-2.5">
            <span
              className="text-[28px] font-bold text-[#0F0F0F] tracking-[-0.04em] leading-none"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              ₹{portfolio.currentValue.toLocaleString("en-IN")}
            </span>
            <span
              className={`text-[13px] font-semibold px-2 py-0.5 rounded-full ${
                isPositive
                  ? "text-[#3A7A5A] bg-[#F0FBF4]"
                  : "text-[#D97070] bg-[#FDF3F3]"
              }`}
            >
              {isPositive ? "+" : ""}{gainPct}%
            </span>
          </div>
          <div className="text-[12.5px] text-[#888] mt-1">
            {isPositive ? "+" : ""}₹{Math.abs(portfolio.totalReturn).toLocaleString("en-IN")} total returns
          </div>
        </div>

        {/* Range selector */}
        <div className="flex items-center gap-1 bg-[#F5F5F3] rounded-xl p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${
                range === r
                  ? "bg-white dark:bg-[#1A1A1A] text-[#0F0F0F] dark:text-white shadow-sm"
                  : "text-[#888] dark:text-[#888] hover:text-[#555] dark:hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F0F0F" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#0F0F0F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F3" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#BBB", fontFamily: "'DM Sans', sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#BBB", fontFamily: "'DM Sans', sans-serif" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : `₹${v / 1000}k`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="invested"
              stroke="#C9A84C"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              fill="url(#investedGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#C9A84C", strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0F0F0F"
              strokeWidth={2}
              fill="url(#portfolioGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#0F0F0F", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-4 pt-4 border-t border-[#F5F5F5] dark:border-[#222] text-[12px] text-[#888] dark:text-[#777]">
        <span className="flex items-center gap-1.5">
          <span className="w-5 h-0.5 bg-[#0F0F0F] rounded inline-block" />
          Portfolio value
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-5 h-0.5 bg-[#C9A84C] rounded inline-block border-dashed border-b border-[#C9A84C]" />
          Amount invested
        </span>
        <span className="ml-auto text-[11px] text-[#AAA]">All returns are unrealised</span>
      </div>
    </div>
  );
}
