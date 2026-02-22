import React from "react";
import {
  Users,
  Clock,
  FolderOpen,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  MessageSquare,
  CheckCircle2,
  GitPullRequest,
} from "lucide-react";

import MetricCard from "../../components/MetricCard";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Avatar from "../../components/Avatar";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const metrics = [
  {
    label: "Active Members",
    value: "24",
    change: "+12%",
    changeType: "positive" as const,
  },
  {
    label: "Hours Tracked",
    value: "1,248",
    change: "+8%",
    changeType: "positive" as const,
  },
  {
    label: "Active Projects",
    value: "12",
    change: "+3%",
    changeType: "positive" as const,
  },
  {
    label: "Pending Actions",
    value: "5",
    change: "-2 items",
    changeType: "negative" as const,
  },
];

interface ActivityItem {
  id: number;
  initials: string;
  name: string;
  action: string;
  target: string;
  time: string;
  icon: React.ReactNode;
}

const activityFeed: ActivityItem[] = [
  {
    id: 1,
    initials: "JD",
    name: "Jake Dawson",
    action: "completed task",
    target: "API Integration",
    time: "12 min ago",
    icon: <CheckCircle2 className="h-4 w-4 text-primary" />,
  },
  {
    id: 2,
    initials: "ML",
    name: "Maria Lopez",
    action: "commented on",
    target: "Design Review",
    time: "34 min ago",
    icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  },
  {
    id: 3,
    initials: "KP",
    name: "Kevin Park",
    action: "opened PR for",
    target: "Auth Module",
    time: "1 hr ago",
    icon: <GitPullRequest className="h-4 w-4 text-muted-foreground" />,
  },
  {
    id: 4,
    initials: "AS",
    name: "Anya Singh",
    action: "logged 4h on",
    target: "Mobile App",
    time: "2 hr ago",
    icon: <Clock className="h-4 w-4 text-muted-foreground" />,
  },
];

interface LeaveItem {
  id: number;
  initials: string;
  name: string;
  dates: string;
  type: string;
  badgeColor: string;
}

const upcomingLeave: LeaveItem[] = [
  {
    id: 1,
    initials: "RL",
    name: "Rachel Lee",
    dates: "Mar 3 - Mar 7",
    type: "Vacation",
    badgeColor: "lime",
  },
  {
    id: 2,
    initials: "TN",
    name: "Tom Nguyen",
    dates: "Mar 5 - Mar 6",
    type: "Personal",
    badgeColor: "amber",
  },
  {
    id: 3,
    initials: "DP",
    name: "Diana Patel",
    dates: "Mar 10 - Mar 14",
    type: "Sick Leave",
    badgeColor: "red",
  },
];

interface TimeEntry {
  id: number;
  employee: string;
  initials: string;
  project: string;
  task: string;
  duration: string;
  date: string;
}

const timeEntries: TimeEntry[] = [
  {
    id: 1,
    employee: "Jake Dawson",
    initials: "JD",
    project: "TeamTrack Pro",
    task: "API Integration",
    duration: "3h 45m",
    date: "Feb 22, 2026",
  },
  {
    id: 2,
    employee: "Maria Lopez",
    initials: "ML",
    project: "Client Portal",
    task: "Design Review",
    duration: "2h 15m",
    date: "Feb 22, 2026",
  },
  {
    id: 3,
    employee: "Kevin Park",
    initials: "KP",
    project: "TeamTrack Pro",
    task: "Auth Module",
    duration: "4h 30m",
    date: "Feb 21, 2026",
  },
  {
    id: 4,
    employee: "Anya Singh",
    initials: "AS",
    project: "Mobile App",
    task: "Push Notifications",
    duration: "1h 50m",
    date: "Feb 21, 2026",
  },
];

interface BudgetProject {
  name: string;
  spent: number;
  budget: number;
  percentage: number;
  status: "healthy" | "warning" | "critical";
}

const budgetProjects: BudgetProject[] = [
  {
    name: "TeamTrack Pro",
    spent: 42_000,
    budget: 60_000,
    percentage: 70,
    status: "healthy",
  },
  {
    name: "Client Portal",
    spent: 28_500,
    budget: 35_000,
    percentage: 81,
    status: "warning",
  },
  {
    name: "Mobile App",
    spent: 18_200,
    budget: 20_000,
    percentage: 91,
    status: "critical",
  },
];

// ---------------------------------------------------------------------------
// DataTable column definitions
// ---------------------------------------------------------------------------

const timeEntryColumns = [
  {
    key: "employee" as const,
    header: "Employee",
    render: (row: TimeEntry) => (
      <div className="flex items-center gap-3">
        <Avatar initials={row.initials} size="sm" />
        <span className="font-secondary text-sm text-foreground">
          {row.employee}
        </span>
      </div>
    ),
  },
  {
    key: "project" as const,
    header: "Project",
    render: (row: TimeEntry) => (
      <span className="font-secondary text-sm text-foreground">
        {row.project}
      </span>
    ),
  },
  {
    key: "task" as const,
    header: "Task",
    render: (row: TimeEntry) => (
      <span className="font-secondary text-sm text-muted-foreground">
        {row.task}
      </span>
    ),
  },
  {
    key: "duration" as const,
    header: "Duration",
    render: (row: TimeEntry) => (
      <span className="font-primary text-sm text-primary">{row.duration}</span>
    ),
  },
  {
    key: "date" as const,
    header: "Date",
    render: (row: TimeEntry) => (
      <span className="font-secondary text-sm text-muted-foreground">
        {row.date}
      </span>
    ),
  },
];

// ---------------------------------------------------------------------------
// Helper: Budget bar colour
// ---------------------------------------------------------------------------

function budgetBarColor(status: BudgetProject["status"]): string {
  switch (status) {
    case "healthy":
      return "bg-primary";
    case "warning":
      return "bg-amber-500";
    case "critical":
      return "bg-red-500";
  }
}

function budgetTextColor(status: BudgetProject["status"]): string {
  switch (status) {
    case "healthy":
      return "text-primary";
    case "warning":
      return "text-amber-500";
    case "critical":
      return "text-red-500";
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      {/* ------- Page Header ------- */}
      <PageHeader
        title="Admin Dashboard"
        subtitle="Welcome back, Sarah"
        actions={
          <Button variant="primary" size="sm">
            <Calendar className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        }
      />

      {/* ------- Metric Cards ------- */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m) => (
          <MetricCard
            key={m.label}
            label={m.label}
            value={m.value}
            change={m.change}
            changeType={m.changeType}
          />
        ))}
      </div>

      {/* ------- Two-Column: Activity Feed + Upcoming Leave ------- */}
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* --- Team Activity Feed --- */}
        <div className="flex-1 bg-card border border-border rounded-none p-5">
          <h2 className="font-primary text-base font-semibold text-foreground mb-4">
            Team Activity Feed
          </h2>

          <div className="flex flex-col gap-4">
            {activityFeed.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 pb-4 border-b border-border last:border-b-0 last:pb-0"
              >
                <Avatar initials={item.initials} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-secondary text-sm text-foreground leading-snug">
                    <span className="font-medium">{item.name}</span>{" "}
                    <span className="text-muted-foreground">
                      {item.action}
                    </span>{" "}
                    <span className="text-foreground font-medium">
                      {item.target}
                    </span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {item.icon}
                    <span className="font-secondary text-xs text-muted-foreground">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Upcoming Leave --- */}
        <div className="w-full lg:w-[380px] bg-card border border-border rounded-none p-5 shrink-0">
          <h2 className="font-primary text-base font-semibold text-foreground mb-4">
            Upcoming Leave
          </h2>

          <div className="flex flex-col gap-4">
            {upcomingLeave.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 pb-4 border-b border-border last:border-b-0 last:pb-0"
              >
                <Avatar initials={item.initials} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-secondary text-sm font-medium text-foreground truncate">
                    {item.name}
                  </p>
                  <p className="font-secondary text-xs text-muted-foreground mt-0.5">
                    {item.dates}
                  </p>
                </div>
                <Badge label={item.type} color={item.badgeColor} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------- Recent Time Entries ------- */}
      <div className="bg-card border border-border rounded-none">
        {/* Desktop table */}
        <div className="hidden md:block">
          <DataTable
            title="Recent Time Entries"
            columns={timeEntryColumns}
            data={timeEntries}
          />
        </div>

        {/* Mobile list cards */}
        <div className="md:hidden p-4">
          <h2 className="font-primary text-base font-semibold text-foreground mb-4">
            Recent Time Entries
          </h2>
          <div className="flex flex-col gap-3">
            {timeEntries.map((entry) => (
              <ListCard
                key={entry.id}
                name={entry.employee}
                detail={`${entry.project} - ${entry.task} | ${entry.duration}`}
                badge={entry.date}
                avatar={entry.initials}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ------- Project Budget Health ------- */}
      <div className="bg-card border border-border rounded-none p-5">
        <h2 className="font-primary text-base font-semibold text-foreground mb-5">
          Project Budget Health
        </h2>

        <div className="flex flex-col gap-5">
          {budgetProjects.map((project) => (
            <div key={project.name} className="flex flex-col gap-2">
              {/* Label row */}
              <div className="flex items-center justify-between">
                <span className="font-secondary text-sm text-foreground font-medium">
                  {project.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-primary text-xs text-muted-foreground">
                    ${project.spent.toLocaleString()} / $
                    {project.budget.toLocaleString()}
                  </span>
                  <span
                    className={`font-primary text-xs font-semibold ${budgetTextColor(
                      project.status
                    )}`}
                  >
                    {project.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full bg-border rounded-none overflow-hidden">
                <div
                  className={`h-full rounded-none transition-all duration-300 ${budgetBarColor(
                    project.status
                  )}`}
                  style={{ width: `${project.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
