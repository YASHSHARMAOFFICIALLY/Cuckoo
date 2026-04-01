"use client";

import { useMemo, useState } from "react";

function ActivityItem({ activity }) {
  return (
    <div className="flex items-start gap-3 py-3 group hover:bg-[#FAFAF8] dark:hover:bg-[#181818] -mx-2 px-2 rounded-xl transition-colors duration-150 cursor-pointer">
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5"
        style={{
          background: activity.iconBg,
          border: `1px solid ${activity.iconBorder}`,
        }}
      >
        {activity.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[13px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em]">
            {activity.title}
          </span>
          <span
            className="text-[10.5px] font-medium px-1.5 py-0.5 rounded-full"
            style={{ background: activity.tagBg, color: activity.tagColor }}
          >
            {activity.tag}
          </span>
        </div>
        <div className="text-[12.5px] text-[#888] dark:text-[#888] tracking-[-0.01em]">{activity.desc}</div>
        <div className="text-[11px] text-[#BBB] dark:text-[#666] mt-0.5">{activity.time}</div>
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0">
        <div
          className="text-[13px] font-bold tracking-[-0.01em]"
          style={{ color: activity.amountColor }}
        >
          {activity.amount}
        </div>
      </div>
    </div>
  );
}

export default function RecentActivity({ activities = [] }) {
  const [filter, setFilter] = useState("All");
  const filteredActivities = useMemo(() => {
    if (filter === "All") return activities;
    return activities.filter((activity) => activity.category === filter);
  }, [activities, filter]);

  return (
    <div className="bg-white dark:bg-[#111111] border border-[#E8E8E8] dark:border-[#232323] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[11.5px] font-semibold text-[#888] dark:text-[#777] uppercase tracking-[0.08em] mb-0.5">
            Activity
          </div>
          <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
            Recent transactions
          </div>
        </div>
        <button className="text-[12px] font-medium text-[#555] dark:text-[#AAA] hover:text-[#0F0F0F] dark:hover:text-white transition-colors">
          View all →
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 mb-4">
        {["All", "Investing", "Learning", "Goals"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${
              filter === f
                ? "bg-[#0F0F0F] text-white"
                : "text-[#888] dark:text-[#888] hover:text-[#555] dark:hover:text-white border border-[#F0F0F0] dark:border-[#262626]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex flex-col divide-y divide-[#F5F5F5] dark:divide-[#222]">
        {filteredActivities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
