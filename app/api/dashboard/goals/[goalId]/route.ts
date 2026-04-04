import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buildDashboardActivity } from "@/lib/dashboard-activity";
import { getServerSession } from "@/lib/session";
import { dashboardGoalUpdateSchema } from "@/lib/validators";

function calculateMonthlyNeeded(targetAmount: number, currentAmount: number, targetDate?: Date | null) {
  if (!targetDate || currentAmount >= targetAmount) {
    return 0;
  }

  const today = new Date();
  const monthsRemaining =
    (targetDate.getFullYear() - today.getFullYear()) * 12 +
    (targetDate.getMonth() - today.getMonth()) +
    (targetDate.getDate() >= today.getDate() ? 0 : -1);

  return Math.max(0, Math.ceil((targetAmount - currentAmount) / Math.max(1, monthsRemaining)));
}

async function getOwnedGoal(userId: string, goalId: string) {
  return db.dashboardGoal.findFirst({
    where: {
      id: goalId,
      userId,
    },
  });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ goalId: string }> }
) {
  const session = await getServerSession().catch(() => null);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { goalId } = await context.params;
  const existingGoal = await getOwnedGoal(session.user.id, goalId);

  if (!existingGoal) {
    return NextResponse.json({ error: "Goal not found" }, { status: 404 });
  }

  const json = await request.json().catch(() => null);
  const parsed = dashboardGoalUpdateSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid goal payload" },
      { status: 400 }
    );
  }

  const targetDate =
    parsed.data.targetDate === undefined
      ? existingGoal.targetDate
      : parsed.data.targetDate
        ? new Date(parsed.data.targetDate)
        : null;

  const targetAmount = parsed.data.targetAmount ?? existingGoal.targetAmount;
  const currentAmount = parsed.data.currentAmount ?? existingGoal.currentAmount;
  const achieved = parsed.data.achieved ?? currentAmount >= targetAmount;

  const goal = await db.$transaction(async (tx) => {
    const updatedGoal = await tx.dashboardGoal.update({
      where: { id: existingGoal.id },
      data: {
        ...parsed.data,
        targetDate,
        targetAmount,
        currentAmount,
        achieved,
        monthlyNeeded: calculateMonthlyNeeded(targetAmount, currentAmount, targetDate),
      },
    });

    await tx.dashboardActivity.create({
      data: {
        userId: session.user.id,
        ...buildDashboardActivity({
          category: "Goals",
          title: updatedGoal.achieved ? "Goal Achieved" : "Goal Updated",
          description: `${updatedGoal.name} is at ${Math.round((updatedGoal.currentAmount / updatedGoal.targetAmount) * 100)}%`,
          icon: updatedGoal.emoji,
          iconBg: "#F0FBF4",
          iconBorder: "#C0E8D0",
          amountLabel: `Saved ${updatedGoal.currentAmount.toLocaleString("en-IN")}`,
          amountColor: "#3A7A5A",
          tag: "Goals",
          tagBg: "#F0FBF4",
          tagColor: "#3A7A5A",
        }),
      },
    });

    return updatedGoal;
  });

  return NextResponse.json({ goal });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ goalId: string }> }
) {
  const session = await getServerSession().catch(() => null);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { goalId } = await context.params;
  const existingGoal = await getOwnedGoal(session.user.id, goalId);

  if (!existingGoal) {
    return NextResponse.json({ error: "Goal not found" }, { status: 404 });
  }

  await db.$transaction(async (tx) => {
    await tx.dashboardGoal.delete({
      where: { id: existingGoal.id },
    });

    await tx.dashboardActivity.create({
      data: {
        userId: session.user.id,
        ...buildDashboardActivity({
          category: "Goals",
          title: "Goal Removed",
          description: `${existingGoal.name} was deleted`,
          icon: existingGoal.emoji,
          iconBg: "#FFF3F3",
          iconBorder: "#F3D1D1",
          amountLabel: "Removed",
          amountColor: "#A04A4A",
          tag: "Goals",
          tagBg: "#FFF3F3",
          tagColor: "#A04A4A",
        }),
      },
    });
  });

  return NextResponse.json({ success: true });
}
