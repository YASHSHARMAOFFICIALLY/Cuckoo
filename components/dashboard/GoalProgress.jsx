"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

/**
 * @typedef {import("@/types/dashboard").GoalProgressData} GoalProgressData
 */

function toINR(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function formatDateValue(value) {
  if (!value) return "";
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

function normalizeGoal(goal) {
  return {
    ...goal,
    targetDate: goal.targetDate ?? null,
  };
}

function buildDeadline(targetDate, achieved) {
  if (achieved || !targetDate) {
    return "Achieved!";
  }

  return new Date(targetDate).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

function mapGoalFromApi(goal) {
  return {
    id: goal.id,
    name: goal.name,
    emoji: goal.emoji,
    target: goal.targetAmount,
    saved: goal.currentAmount,
    deadline: buildDeadline(goal.targetDate, goal.achieved),
    barColor: goal.color,
    monthlyNeeded: goal.monthlyNeeded,
    achieved: goal.achieved,
    targetDate: goal.targetDate,
  };
}

function buildGoalSummary(items) {
  return items.filter((goal) => goal.achieved).length;
}

async function parseApiResponse(response) {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error || "Request failed");
  }

  return payload;
}

function GoalCard({ goal, delay, onBoost, onToggleAchieved, onDelete, busy }) {
  const pct = Math.min(100, Math.round((goal.saved / goal.target) * 100));
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(pct), 300 + delay);
    return () => clearTimeout(t);
  }, [delay, pct]);

  return (
    <div className="group p-4.5 rounded-xl border border-[#E8E8E8] dark:border-[#243842] bg-white dark:bg-[#10181d] hover:border-[#D0D0D0] dark:hover:border-[#39515d] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_22px_rgba(0,0,0,0.26)] transition-all duration-200">
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-[18px]">{goal.emoji}</span>
          <div>
            <div className="text-[13.5px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.01em] leading-none mb-0.5">
              {goal.name}
            </div>
            <div className="text-[11px] text-[#AAA] dark:text-[#7f98a5]">{goal.deadline}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {goal.achieved && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0FBF4] text-[#3A7A5A] border border-[#C0E8D0] dark:bg-[#11251d] dark:text-[#86c5a4] dark:border-[#284c3d]">
              ✓ Done
            </span>
          )}
          <span className="text-[14px] font-bold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
            {pct}%
          </span>
        </div>
      </div>

      <div className="h-1.5 bg-[#F0F0F0] dark:bg-[#1d2a31] rounded-full overflow-hidden mb-2.5">
        <div
          className="h-full rounded-full transition-[width] duration-[800ms] ease-out"
          style={{ width: `${barWidth}%`, background: goal.barColor }}
        />
      </div>

      <div className="flex items-center justify-between text-[11.5px] text-[#888] dark:text-[#89a0ad]">
        <span>
          <span className="font-semibold text-[#0F0F0F] dark:text-white">{toINR(goal.saved)}</span>
          {" "}of {toINR(goal.target)}
        </span>
        {!goal.achieved && <span className="text-[#888] dark:text-[#7f98a5]">{toINR(goal.monthlyNeeded)}/mo needed</span>}
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {!goal.achieved && (
          <button
            type="button"
            onClick={onBoost}
            disabled={busy}
            className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-[#D0E0FF] text-[#4A6FA5] bg-[#F0F5FF] dark:border-[#2e4c63] dark:bg-[#142330] dark:text-[#8cb8dc] disabled:opacity-50"
          >
            Add ₹5,000
          </button>
        )}
        {!goal.achieved && (
          <button
            type="button"
            onClick={onToggleAchieved}
            disabled={busy}
            className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-[#E8DFC0] text-[#8B7340] bg-[#F5F1E8] dark:border-[#4b3d23] dark:bg-[#241d12] dark:text-[#dfbf75] disabled:opacity-50"
          >
            Mark done
          </button>
        )}
        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          className="text-[11px] font-medium px-2.5 py-1.5 rounded-lg border border-[#F3D1D1] text-[#A04A4A] bg-[#FFF3F3] dark:border-[#5a2d34] dark:bg-[#2a171b] dark:text-[#ef9ca8] disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const initialForm = {
  name: "",
  emoji: "🎯",
  targetAmount: "",
  currentAmount: "",
  color: "#3A7A5A",
  targetDate: "",
};

/**
 * @param {{ goals?: GoalProgressData }} props
 */
export default function GoalProgress({ goals = { achieved: 0, items: [] } }) {
  const [items, setItems] = useState(() => goals.items.map(normalizeGoal));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [busyGoalId, setBusyGoalId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setItems(goals.items.map(normalizeGoal));
  }, [goals]);

  const achieved = buildGoalSummary(items);

  const updateGoal = async (goalId, payload) => {
    setBusyGoalId(goalId);
    setError("");

    try {
      const data = await parseApiResponse(
        await fetch(`/api/dashboard/goals/${goalId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      );

      setItems((current) =>
        current.map((goal) => (goal.id === goalId ? mapGoalFromApi(data.goal) : goal))
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyGoalId(null);
    }
  };

  const deleteGoal = async (goalId) => {
    setBusyGoalId(goalId);
    setError("");

    try {
      await parseApiResponse(
        await fetch(`/api/dashboard/goals/${goalId}`, {
          method: "DELETE",
        })
      );

      setItems((current) => current.filter((goal) => goal.id !== goalId));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusyGoalId(null);
    }
  };

  const handleCreateGoal = async (event) => {
    event.preventDefault();
    setError("");
    setIsCreating(true);

    try {
      const payload = {
        name: form.name,
        emoji: form.emoji,
        targetAmount: Number(form.targetAmount),
        currentAmount: Number(form.currentAmount || 0),
        color: form.color,
        targetDate: form.targetDate ? new Date(form.targetDate).toISOString() : null,
      };

      const data = await parseApiResponse(
        await fetch("/api/dashboard/goals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      );

      setItems((current) => [...current, mapGoalFromApi(data.goal)]);
      setDialogOpen(false);
      setForm(initialForm);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[linear-gradient(180deg,_rgba(18,28,34,0.96)_0%,_rgba(10,16,21,0.99)_100%)] border border-[#E8E8E8] dark:border-[#243842] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_14px_34px_rgba(0,0,0,0.34)] h-full">
      <div className="flex items-center justify-between mb-5 gap-3">
        <div>
          <div className="text-[11.5px] font-semibold text-[#888] dark:text-[#89a0ad] uppercase tracking-[0.08em] mb-0.5">
            Goals
          </div>
          <div className="text-[15px] font-semibold text-[#0F0F0F] dark:text-white tracking-[-0.02em]">
            {achieved} of {items.length} achieved
          </div>
        </div>
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="flex items-center gap-1.5 text-[12px] font-medium text-[#555] dark:text-[#a7bac6] hover:text-[#0F0F0F] dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-[#F0F0F0] dark:border-[#243842] hover:border-[#D0D0D0] dark:hover:border-[#39515d]"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          New Goal
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-[#F3D1D1] bg-[#FFF3F3] px-3 py-2 text-[12px] text-[#A04A4A] dark:border-[#5a2d34] dark:bg-[#2a171b] dark:text-[#ef9ca8]">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E0E0E0] dark:border-[#2d434f] px-4 py-6 text-[12.5px] text-[#888] dark:text-[#89a0ad] bg-transparent dark:bg-[#10181d]/70">
          No goals yet. Create one to start tracking progress.
        </div>
      ) : (
      <div className="flex flex-col gap-3">
        {items.map((goal, i) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            delay={i * 80}
            busy={busyGoalId === goal.id}
            onBoost={() =>
              updateGoal(goal.id, {
                currentAmount: Math.min(goal.target, goal.saved + 5000),
              })
            }
            onToggleAchieved={
              goal.achieved
                ? undefined
                : () =>
                    updateGoal(goal.id, {
                      achieved: true,
                      currentAmount: goal.target,
                    })
            }
            onDelete={() => deleteGoal(goal.id)}
          />
        ))}
      </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md border-[#e8e8e8] bg-white dark:border-[#243842] dark:bg-[#0f171d] dark:text-white">
          <DialogHeader>
            <DialogTitle>Create Goal</DialogTitle>
            <DialogDescription>
              Add a savings goal and keep it synced to your dashboard data.
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-3" onSubmit={handleCreateGoal}>
            <div className="grid gap-1.5">
              <Label htmlFor="goal-name">Goal name</Label>
              <Input
                id="goal-name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Emergency Fund"
              />
            </div>

            <div className="grid grid-cols-[88px_1fr] gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="goal-emoji">Emoji</Label>
                <Input
                  id="goal-emoji"
                  value={form.emoji}
                  onChange={(event) => setForm((current) => ({ ...current, emoji: event.target.value }))}
                  maxLength={2}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="goal-color">Color</Label>
                <Input
                  id="goal-color"
                  type="color"
                  className="h-8"
                  value={form.color}
                  onChange={(event) => setForm((current) => ({ ...current, color: event.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="goal-target">Target amount</Label>
                <Input
                  id="goal-target"
                  type="number"
                  min="1"
                  value={form.targetAmount}
                  onChange={(event) => setForm((current) => ({ ...current, targetAmount: event.target.value }))}
                  placeholder="300000"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="goal-saved">Current saved</Label>
                <Input
                  id="goal-saved"
                  type="number"
                  min="0"
                  value={form.currentAmount}
                  onChange={(event) => setForm((current) => ({ ...current, currentAmount: event.target.value }))}
                  placeholder="50000"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="goal-date">Target date</Label>
              <Input
                id="goal-date"
                type="date"
                value={formatDateValue(form.targetDate)}
                onChange={(event) => setForm((current) => ({ ...current, targetDate: event.target.value }))}
              />
            </div>

            <DialogFooter className="mt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Saving..." : "Create Goal"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
