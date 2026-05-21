export function calculateMonthlyNeeded(
  targetAmount: number,
  currentAmount: number,
  targetDate?: Date | null
) {
  if (!targetDate || currentAmount >= targetAmount) {
    return 0;
  }

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const targetDay = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );

  if (targetDay < startOfToday) {
    return 0;
  }

  const rawMonthsRemaining =
    (targetDate.getFullYear() - today.getFullYear()) * 12 +
    (targetDate.getMonth() - today.getMonth()) +
    (targetDate.getDate() >= today.getDate() ? 0 : -1);
  const monthsRemaining = Math.max(1, rawMonthsRemaining);

  return Math.max(
    0,
    Math.ceil((targetAmount - currentAmount) / monthsRemaining)
  );
}
