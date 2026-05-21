import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/session";
import { buildDashboardActivity } from "@/lib/dashboard-activity";
import { calculateMonthlyNeeded } from "@/lib/goal-utils";
import { dashboardGoalSchema } from "@/lib/validators";

export async function GET() {
  const session = await getServerSession().catch(() => null);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const goals = await db.dashboardGoal.findMany({
    where: { userId: session.user.id },
    orderBy: [{ achieved: "asc" }, { createdAt: "asc" }],
  });

  return NextResponse.json({ goals });
}

export async function POST(request: Request) {
  const session = await getServerSession().catch(() => null);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = dashboardGoalSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid goal payload" },
      { status: 400 }
    );
  }

  const targetDate = parsed.data.targetDate ? new Date(parsed.data.targetDate) : null;
  const achieved =
    parsed.data.achieved ?? parsed.data.currentAmount >= parsed.data.targetAmount;

  const goal = await db.$transaction(async (tx) => {
    const createdGoal = await tx.dashboardGoal.create({
      data: {
        userId: session.user.id,
        name: parsed.data.name,
        emoji: parsed.data.emoji,
        targetAmount: parsed.data.targetAmount,
        currentAmount: parsed.data.currentAmount,
        targetDate,
        color: parsed.data.color,
        achieved,
        monthlyNeeded: calculateMonthlyNeeded(
          parsed.data.targetAmount,
          parsed.data.currentAmount,
          targetDate
        ),
      },
    });

    await tx.dashboardActivity.create({
      data: {
        userId: session.user.id,
        ...buildDashboardActivity({
          category: "Goals",
          title: "Goal Created",
          description: `${createdGoal.name} goal added`,
          icon: createdGoal.emoji,
          iconBg: "#F0FBF4",
          iconBorder: "#C0E8D0",
          amountLabel: `Target ${createdGoal.targetAmount.toLocaleString("en-IN")}`,
          amountColor: "#3A7A5A",
          tag: "Goals",
          tagBg: "#F0FBF4",
          tagColor: "#3A7A5A",
        }),
      },
    });

    return createdGoal;
  });

  return NextResponse.json({ goal }, { status: 201 });
}
