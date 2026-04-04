type ActivityInput = {
  category: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconBorder: string;
  amountLabel: string;
  amountColor: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  occurredAt?: Date;
};

export function buildDashboardActivity(input: ActivityInput) {
  return {
    ...input,
    occurredAt: input.occurredAt ?? new Date(),
  };
}
