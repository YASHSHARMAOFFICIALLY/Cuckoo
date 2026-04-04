import { NextResponse } from "next/server";
import { buildDashboardActivity } from "@/lib/dashboard-activity";
import { db } from "@/lib/db";
import { getServerSession } from "@/lib/session";
import { learningProgressUpdateSchema } from "@/lib/validators";

function deriveBadge(completedLessons: number, lessons: number) {
  if (completedLessons >= lessons) return "Complete";
  if (completedLessons === 0) return "Up Next";
  return "In Progress";
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ moduleId: string }> }
) {
  const session = await getServerSession().catch(() => null);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = learningProgressUpdateSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid learning update payload" },
      { status: 400 }
    );
  }

  const { moduleId } = await context.params;

  const learningModule = await db.learningModuleProgress.findFirst({
    where: {
      id: moduleId,
      userId: session.user.id,
    },
  });

  if (!learningModule) {
    return NextResponse.json({ error: "Learning module not found" }, { status: 404 });
  }

  const modules = await db.$transaction(async (tx) => {
    const nextCompletedLessons = Math.min(
      learningModule.lessons,
      learningModule.completedLessons + 1
    );
    const completed = nextCompletedLessons >= learningModule.lessons;

    await tx.learningModuleProgress.update({
      where: { id: learningModule.id },
      data: {
        completedLessons: nextCompletedLessons,
        badge: deriveBadge(nextCompletedLessons, learningModule.lessons),
        isCurrent: completed ? false : true,
      },
    });

    if (completed) {
      const nextModule = await tx.learningModuleProgress.findFirst({
        where: {
          userId: session.user.id,
          sortOrder: { gt: learningModule.sortOrder },
        },
        orderBy: { sortOrder: "asc" },
      });

      if (nextModule) {
        await tx.learningModuleProgress.update({
          where: { id: nextModule.id },
          data: {
            isCurrent: true,
            badge: "In Progress",
          },
        });
      }
    }

    await tx.dashboardActivity.create({
      data: {
        userId: session.user.id,
        ...buildDashboardActivity({
          category: "Learning",
          title: completed ? "Module Completed" : "Lesson Completed",
          description: completed
            ? `${learningModule.title} completed`
            : `${learningModule.title} — ${nextCompletedLessons}/${learningModule.lessons} lessons complete`,
          icon: "📚",
          iconBg: "#F5F1E8",
          iconBorder: "#E8DFC0",
          amountLabel: "+20 XP",
          amountColor: "#8B7340",
          tag: "Learning",
          tagBg: "#F5F1E8",
          tagColor: "#8B7340",
        }),
      },
    });

    return tx.learningModuleProgress.findMany({
      where: { userId: session.user.id },
      orderBy: { sortOrder: "asc" },
    });
  });

  return NextResponse.json({ modules });
}
