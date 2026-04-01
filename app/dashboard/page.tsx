import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardHero from "@/components/dashboard/DashboardHero"
import FinancialHealthCard from "@/components/dashboard/Financialhealthcard ";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import GoalProgress from "@/components/dashboard/GoalProgress";
import LearningProgress from "@/components/dashboard/Learningprogress";
import QuickTools from "@/components/dashboard/Quiztools";
import RecentActivity from "@/components/dashboard/QuizActivity";
import { auth } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  }).catch(() => null);

  if (!session) {
    redirect("/signin?next=/dashboard");
  }

  const dashboard: any = await getDashboardData(session.user);

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0A0A0A]">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-60 bg-white dark:bg-[#111] border-r border-[#EBEBEB] dark:border-[#2a2a2a] z-40 flex flex-col hidden lg:flex">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-[#EBEBEB]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0F0F0F] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 10L7 4L12 10" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="7" cy="11" r="1.2" fill="#C9A84C" />
              </svg>
            </div>
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#0F0F0F]">
              FinanceFlow
            </span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="text-[10.5px] font-bold text-[#BBB] uppercase tracking-[0.1em] px-3 mb-2">
            Main
          </div>
          {[
            { label: "Dashboard", icon: "◉", active: true },
            { label: "Portfolio", icon: "📈" },
            { label: "Goals", icon: "🎯", href:"/goals" },
            { label: "Tools", icon: "🔧" ,href:"/tools" },
            { label: "Learn", icon: "📚" ,href:"/learn" },
            { label: "Quiz", icon: "🧠",href:"/Quiz" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-medium mb-0.5 transition-all duration-150 ${
                item.active
                  ? "bg-[#0F0F0F] text-white"
                  : "text-[#555] hover:bg-[#F5F5F3] hover:text-[#0F0F0F]"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}

          <div className="text-[10.5px] font-bold text-[#BBB] uppercase tracking-[0.1em] px-3 mb-2 mt-5">
            Account
          </div>
          {[
            { label: "Settings", icon: "⚙️" },
            { label: "Help", icon: "💬" },
          ].map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-[#555] hover:bg-[#F5F5F3] hover:text-[#0F0F0F] mb-0.5 transition-all duration-150"
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* User profile */}
        <div className="px-3 py-4 border-t border-[#EBEBEB]">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F5F5F3] cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#0F0F0F] flex items-center justify-center text-[13px] font-bold text-[#C9A84C] flex-shrink-0">
              {dashboard.user.initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-[#0F0F0F] tracking-[-0.01em] truncate">
                {dashboard.user.fullName}
              </div>
              <div className="text-[11.5px] text-[#888] truncate">{dashboard.user.plan}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 4L8 7L5 10" stroke="#BBB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </aside>

      {/* Mobile top nav */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-white border-b border-[#EBEBEB] flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0F0F0F] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 10L7 4L12 10" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="11" r="1.2" fill="#C9A84C" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.02em]">FinanceFlow</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#0F0F0F] flex items-center justify-center text-[13px] font-bold text-[#C9A84C]">
          {dashboard.user.initial}
        </div>
      </header>

      {/* Main content */}
      <main className="lg:ml-60 pt-14 lg:pt-0">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-8">
          {/* Hero */}
          <DashboardHero
            userName={dashboard.user.firstName}
            initial={dashboard.user.initial}
            quickStats={dashboard.hero.quickStats}
            selectedPeriod={dashboard.hero.selectedPeriod}
            dataSource={dashboard.hero.dataSource}
            dataStatusLabel={dashboard.hero.dataStatusLabel}
            insight={dashboard.hero.insight}
          />

          {/* Row 1: Health Card + Portfolio Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-5 mt-6">
            <FinancialHealthCard health={dashboard.financialHealth} />
            <PortfolioChart portfolio={dashboard.portfolio} />
          </div>

          {/* Row 2: Goals + Learning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <GoalProgress goals={dashboard.goals} />
            <LearningProgress learning={dashboard.learning} />
          </div>

          {/* Row 3: Quick Tools + Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 mt-5 pb-10">
            <RecentActivity activities={dashboard.activities} />
            <QuickTools tools={dashboard.tools} />
          </div>
        </div>
      </main>
    </div>
  );
}
