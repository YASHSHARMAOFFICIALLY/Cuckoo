import { NextResponse } from "next/server";
import { buildDashboardActivity } from "@/lib/dashboard-activity";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/session";
import { quizAttemptSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await getServerSession().catch(() => null);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = quizAttemptSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid quiz attempt payload" },
      { status: 400 }
    );
  }

  if (parsed.data.score > parsed.data.total) {
    return NextResponse.json(
      { error: "Score cannot be greater than total questions" },
      { status: 400 }
    );
  }

  const xpEarned =
    parsed.data.xpEarned ?? Math.max(10, parsed.data.score * 10);

  const attempt = await db.$transaction(async (tx) => {
    const createdAttempt = await tx.quizAttempt.create({
      data: {
        userId: session.user.id,
        topic: parsed.data.topic,
        score: parsed.data.score,
        total: parsed.data.total,
        xpEarned,
      },
    });

    await tx.dashboardActivity.create({
      data: {
        userId: session.user.id,
        ...buildDashboardActivity({
          category: "Learning",
          title: "Quiz Completed",
          description: `${createdAttempt.topic} — Score: ${createdAttempt.score}/${createdAttempt.total}`,
          icon: "📝",
          iconBg: "#F8F0FF",
          iconBorder: "#E0C8F8",
          amountLabel: `+${createdAttempt.xpEarned} XP`,
          amountColor: "#7A4AA0",
          tag: "Learning",
          tagBg: "#F8F0FF",
          tagColor: "#7A4AA0",
        }),
      },
    });

    return createdAttempt;
  });

  return NextResponse.json({ attempt }, { status: 201 });
}
