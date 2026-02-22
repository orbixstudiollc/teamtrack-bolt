import React from "react";
import {
  Calendar,
  Wallet,
  Plane,
  Trophy,
  Clock,
  Folder,
  ArrowRight,
  BarChart3,
  Users,
  TrendingUp,
  FileText,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import MetricCard from "../../components/MetricCard";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ReportCategory {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  iconColor: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const reportCategories: ReportCategory[] = [
  {
    title: "Attendance Report",
    description:
      "Track daily attendance, late arrivals, and absence patterns across the organization.",
    icon: Calendar,
    href: "/reports/attendance",
    iconColor: "text-[#00C2FF]",
  },
  {
    title: "Payroll Summary",
    description:
      "Review payroll disbursements, tax withholdings, and benefits breakdown by department.",
    icon: Wallet,
    href: "/reports/payroll",
    iconColor: "text-[#BFFF00]",
  },
  {
    title: "Leave Analytics",
    description:
      "Analyse leave utilisation, trends, and balances for all employees and departments.",
    icon: Plane,
    href: "/reports/leave",
    iconColor: "text-[#FFB800]",
  },
  {
    title: "Team Performance",
    description:
      "Evaluate productivity metrics, task completion rates, and team efficiency scores.",
    icon: Trophy,
    href: "/reports/performance",
    iconColor: "text-[#7B61FF]",
  },
  {
    title: "Time Tracking",
    description:
      "Monitor logged hours, overtime trends, and project-level time allocation.",
    icon: Clock,
    href: "/reports/time-tracking",
    iconColor: "text-[#FF5C33]",
  },
  {
    title: "Project Reports",
    description:
      "View project progress, resource allocation, and milestone completion status.",
    icon: Folder,
    href: "/reports/projects",
    iconColor: "text-[#00C2FF]",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ReportCategoryCard({ category }: { category: ReportCategory }) {
  const Icon = category.icon;

  return (
    <a
      href={category.href}
      className="group block bg-card border border-border rounded-none p-6 transition-colors hover:border-[#333]"
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center bg-[#0A0A0A] border border-border ${category.iconColor}`}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-primary text-sm font-semibold text-foreground">
            {category.title}
          </h3>
          <p className="mt-1 font-secondary text-xs leading-relaxed text-muted-foreground">
            {category.description}
          </p>

          <span className="mt-4 inline-flex items-center gap-1.5 font-primary text-xs font-medium text-primary transition-colors group-hover:text-[#d9ff4d]">
            View Report
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const ReportsDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader title="Reports" subtitle="Analytics & Insights" />

        {/* Report Category Cards */}
        <section className="mt-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportCategories.map((category) => (
              <ReportCategoryCard key={category.title} category={category} />
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mt-10">
          <h2 className="font-primary text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Stats
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Employees"
              value="48"
              change="+3 this month"
              icon={<Users size={18} />}
            />
            <MetricCard
              title="Reports Generated"
              value="156"
              change="+12 this week"
              icon={<FileText size={18} />}
            />
            <MetricCard
              title="Avg Attendance"
              value="94.2%"
              change="+1.8% vs last month"
              icon={<BarChart3 size={18} />}
            />
            <MetricCard
              title="Productivity Index"
              value="87%"
              change="+4% vs Q3"
              icon={<TrendingUp size={18} />}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReportsDashboard;
