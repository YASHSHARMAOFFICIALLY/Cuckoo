"use client"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function DashboardHero({
  userName = "Investor",
  initial = "I",
  quickStats = [],
  selectedPeriod = "This month",
  dataSource = "demo",
  dataStatusLabel = "Demo portfolio data",
  insight = "",
  currentValue = 0,
}) {
  const ref = useRef(null);
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [amountInvested, setAmountInvested] = useState("");
  const [portfolioValue, setPortfolioValue] = useState(String(currentValue));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    setPortfolioValue(String(currentValue));
  }, [currentValue]);

  const handleAddInvestment = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/dashboard/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amountInvested: Number(amountInvested),
          currentValue: Number(portfolioValue),
        }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || "Failed to add investment");
      }

      setDialogOpen(false);
      setAmountInvested("");
      router.refresh();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={ref}>
      {/* Header row */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-8 h-8 rounded-full bg-[#0F0F0F] dark:bg-white flex items-center justify-center text-[13px] font-bold text-[#C9A84C]">
              {initial}
            </div>
            <span className="text-[13px] text-[#888] dark:text-[#777] tracking-[-0.01em]">{dateStr}</span>
            <span
              className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full border ${
                dataSource === "database"
                  ? "bg-[#F0FBF4] text-[#3A7A5A] border-[#C0E8D0]"
                  : "bg-[#FFF7E8] text-[#8B7340] border-[#E8DFC0]"
              }`}
            >
              {dataSource === "database" ? "LIVE" : "DEMO"}
            </span>
          </div>
          <h1
            className="text-[28px] font-semibold tracking-[-0.03em] text-[#0F0F0F] dark:text-white leading-tight"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            {greeting}, {userName} 👋
          </h1>
          <p className="text-[14px] text-[#888] dark:text-[#888] mt-1 tracking-[-0.01em]">
            {dataStatusLabel}
          </p>
          <p className="text-[12.5px] text-[#555] dark:text-[#AAA] mt-2 tracking-[-0.01em] max-w-[520px]">
            {insight}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E8E8E8] dark:border-[#2A2A2A] bg-white dark:bg-[#111111] text-[13px] text-[#555] dark:text-[#AAA] font-medium hover:border-[#0F0F0F] dark:hover:border-white hover:text-[#0F0F0F] dark:hover:text-white transition-all duration-150">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1.5" y="2" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 1.5V2.5M9 1.5V2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M1.5 5.5H12.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            {selectedPeriod}
          </button>
          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0F0F0F] dark:bg-white text-white dark:text-[#0F0F0F] text-[13px] font-medium hover:bg-[#2a2a2a] dark:hover:bg-[#E0E0E0] transition-all duration-150"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2V12M2 7H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Add Investment
          </button>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-[#111111] border border-[#E8E8E8] dark:border-[#232323] rounded-2xl px-5 py-4 hover:border-[#D0D0D0] dark:hover:border-[#3A3A3A] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-200"
            style={{
              opacity: 0,
              transform: "translateY(12px)",
              animation: `fadeUp 0.5s ease ${0.1 + i * 0.07}s both`,
            }}
          >
            <div className="text-[11.5px] text-[#888] dark:text-[#777] font-medium mb-2 tracking-[-0.01em]">
              {stat.label}
            </div>
            <div className="text-[22px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.03em] leading-none mb-1.5">
              {stat.value}
            </div>
            <div
              className={`text-[12px] font-medium flex items-center gap-1 ${
                stat.deltaDir === "up"
                  ? "text-[#3A7A5A]"
                  : "text-[#888] dark:text-[#888]"
              }`}
            >
              {stat.deltaDir === "up" && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 8V2M2 5L5 2L8 5" stroke="#3A7A5A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {stat.delta}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Investment</DialogTitle>
            <DialogDescription>
              Record a new contribution and update the latest portfolio snapshot.
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-3" onSubmit={handleAddInvestment}>
            <div className="grid gap-1.5">
              <Label htmlFor="amount-invested">New amount invested</Label>
              <Input
                id="amount-invested"
                type="number"
                min="1"
                value={amountInvested}
                onChange={(event) => setAmountInvested(event.target.value)}
                placeholder="5000"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="portfolio-value">Current portfolio value</Label>
              <Input
                id="portfolio-value"
                type="number"
                min="1"
                value={portfolioValue}
                onChange={(event) => setPortfolioValue(event.target.value)}
                placeholder="250000"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-[#F3D1D1] bg-[#FFF3F3] px-3 py-2 text-[12px] text-[#A04A4A]">
                {error}
              </div>
            )}

            <DialogFooter className="mt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save Snapshot"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
