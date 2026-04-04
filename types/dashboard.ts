export type QuickStat = {
  label: string
  value: string
  delta: string
  deltaDir: 'up' | 'down' | 'neutral'
}

export type GoalProgressItem = {
  id: string
  name: string
  emoji: string
  target: number
  saved: number
  deadline: string
  barColor: string
  monthlyNeeded: number
  achieved: boolean
  targetDate?: string | Date | null
}

export type GoalProgressData = {
  achieved: number
  items: GoalProgressItem[]
}

export type DashboardActivity = {
  id: string
  icon: string
  iconBg: string
  iconBorder: string
  title: string
  desc: string
  amount: string
  amountColor: string
  time: string
  tag: string
  tagBg: string
  tagColor: string
  category: string
}

export type DashboardTool = {
  id: string
  name: string
  desc: string
  emoji: string
  bg: string
  border: string
  color: string
  href: string
}

export type GoalItem = {
  id: string
  name: string
  emoji: string
  target: number
  saved: number
  deadline: string
  barColor: string
  monthlyNeeded: number
  achieved: boolean
}

export type Goal = {
  achieved: number
  items: GoalItem[]
}

export type CardItem = {
  id: string
  name: string
  desc: string
  emoji: string
  bg: string
  border: string
  color: string
  href: string
}

export type DashboardData = {
  hero: {
    quickStats: QuickStat[]
    goals?: Goal
  }
  cards: CardItem[]
}
