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
  const [submitting, setSubmitting] = useState(false);
  const [resetting, setResetting] = useState(false);
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

  const handleResetPortfolio = async () => {
    setResetting(true);
    setError("");

    try {
      const response = await fetch("/api/dashboard/portfolio", {
        method: "DELETE",
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || "Failed to reset portfolio");
      }

      setDialogOpen(false);
      setAmountInvested("");
      router.refresh();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div ref={ref}>
      {/* Header row */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-8 h-8 rounded-full bg-[#0F0F0F] dark:bg-[#142028] flex items-center justify-center text-[13px] font-bold text-[#C9A84C] border border-transparent dark:border-[#2d4451]">
              {initial}
            </div>
            <span className="text-[13px] text-[#888] dark:text-[#7e97a6] tracking-[-0.01em]">{dateStr}</span>
            <span
              className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full border ${
                dataSource === "database"
                  ? "bg-[#F0FBF4] text-[#3A7A5A] border-[#C0E8D0] dark:bg-[#11251d] dark:text-[#86c5a4] dark:border-[#284c3d]"
                  : "bg-[#FFF7E8] text-[#8B7340] border-[#E8DFC0] dark:bg-[#241d12] dark:text-[#dfbf75] dark:border-[#4b3d23]"
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
          <p className="text-[12.5px] text-[#555] dark:text-[#9fb0ba] mt-2 tracking-[-0.01em] max-w-[520px]">
            {insight}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E8E8E8] dark:border-[#243842] bg-white dark:bg-[#121c22] text-[13px] text-[#555] dark:text-[#a7bac6] font-medium hover:border-[#0F0F0F] dark:hover:border-[#4b6674] hover:text-[#0F0F0F] dark:hover:text-white transition-all duration-150">
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
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0F0F0F] dark:bg-[#f3efe3] text-white dark:text-[#091116] text-[13px] font-medium hover:bg-[#2a2a2a] dark:hover:bg-[#fff7e8] transition-all duration-150 shadow-[0_12px_28px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.32)]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
            className="bg-white dark:bg-[linear-gradient(180deg,_rgba(18,28,34,0.96)_0%,_rgba(11,17,22,0.98)_100%)] border border-[#E8E8E8] dark:border-[#243842] rounded-2xl px-5 py-4 hover:border-[#D0D0D0] dark:hover:border-[#39515d] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.34)] transition-all duration-200"
            style={{
              opacity: 0,
              transform: "translateY(12px)",
              animation: `fadeUp 0.5s ease ${0.1 + i * 0.07}s both`,
            }}
          >
            <div className="text-[11.5px] text-[#888] dark:text-[#89a0ad] font-medium mb-2 tracking-[-0.01em]">
              {stat.label}
            </div>
            <div className="text-[22px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.03em] leading-none mb-1.5">
              {stat.value}
            </div>
            <div
              className={`text-[12px] font-medium flex items-center gap-1 ${
                stat.deltaDir === "up"
                  ? "text-[#3A7A5A]"
                  : "text-[#888] dark:text-[#89a0ad]"
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
        <DialogContent className="sm:max-w-md border-[#e8e8e8] bg-white dark:border-[#243842] dark:bg-[#0f171d] dark:text-white">
          <DialogHeader>
            <DialogTitle>Add Investment</DialogTitle>
            <DialogDescription>
              Add a new contribution. The dashboard will automatically build on your latest stored portfolio value.
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

            <div className="rounded-xl border border-[#E8E8E8] bg-[#FAFAF8] px-3 py-2 text-[12px] text-[#666] dark:border-[#243842] dark:bg-[#142028] dark:text-[#a7bac6]">
              Current portfolio value: ₹{currentValue.toLocaleString("en-IN")}
            </div>

            {error && (
              <div className="rounded-xl border border-[#F3D1D1] bg-[#FFF3F3] px-3 py-2 text-[12px] text-[#A04A4A] dark:border-[#5a2d34] dark:bg-[#2a171b] dark:text-[#ef9ca8]">
                {error}
              </div>
            )}

            <DialogFooter className="mt-2">
              <Button
                type="button"
                variant="destructive"
                onClick={handleResetPortfolio}
                disabled={resetting || submitting}
              >
                {resetting ? "Resetting..." : "Reset to Zero"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting || resetting}>
                {submitting ? "Saving..." : "Save Snapshot"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
