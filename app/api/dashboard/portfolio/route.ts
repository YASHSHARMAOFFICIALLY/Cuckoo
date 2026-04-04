import { NextResponse } from "next/server";
import { buildDashboardActivity } from "@/lib/dashboard-activity";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/session";
import { portfolioContributionSchema } from "@/lib/validators";

function longDateLabel(date: Date) {
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
}

function monthLabel(date: Date) {
  return date.toLocaleDateString("en-IN", { month: "short" });
}

function allTimeLabel(date: Date) {
  return `${date.getFullYear()} Now`;
}

export async function POST(request: Request) {
  const session = await getServerSession().catch(() => null);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = portfolioContributionSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid portfolio payload" },
      { status: 400 }
    );
  }

  const latestPoint = await db.portfolioSnapshot.findFirst({
    where: {
      userId: session.user.id,
      rangeKey: "1M",
    },
    orderBy: {
      recordedAt: "desc",
    },
  });

  if (!latestPoint) {
    return NextResponse.json(
      { error: "Portfolio history is not initialized yet" },
      { status: 409 }
    );
  }

  const now = new Date();
  const nextInvested = latestPoint.invested + parsed.data.amountInvested;

  if (parsed.data.currentValue < nextInvested) {
    return NextResponse.json(
      { error: "Current portfolio value cannot be lower than total invested amount" },
      { status: 400 }
    );
  }

  const snapshotData = [
    { rangeKey: "1M", label: longDateLabel(now) },
    { rangeKey: "3M", label: monthLabel(now) },
    { rangeKey: "6M", label: monthLabel(now) },
    { rangeKey: "1Y", label: monthLabel(now) },
    { rangeKey: "All", label: allTimeLabel(now) },
  ];

  await db.$transaction(async (tx) => {
    await tx.portfolioSnapshot.createMany({
      data: snapshotData.map((entry) => ({
        userId: session.user.id,
        rangeKey: entry.rangeKey,
        label: entry.label,
        recordedAt: now,
        invested: nextInvested,
        value: parsed.data.currentValue,
      })),
    });

    await tx.dashboardActivity.create({
      data: {
        userId: session.user.id,
        ...buildDashboardActivity({
          category: "Investing",
          title: "Investment Added",
          description: `Portfolio updated to ${parsed.data.currentValue.toLocaleString("en-IN")}`,
          icon: "📈",
          iconBg: "#F0F5FF",
          iconBorder: "#D0E0FF",
          amountLabel: `+₹${parsed.data.amountInvested.toLocaleString("en-IN")}`,
          amountColor: "#3A7A5A",
          tag: "Investing",
          tagBg: "#F0F5FF",
          tagColor: "#4A6FA5",
          occurredAt: now,
        }),
      },
    });
  });

  return NextResponse.json({
    success: true,
    portfolio: {
      investedValue: nextInvested,
      currentValue: parsed.data.currentValue,
      totalReturn: parsed.data.currentValue - nextInvested,
    },
  });
}
