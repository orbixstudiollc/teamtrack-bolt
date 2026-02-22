import React from "react";
import {
  Monitor,
  Activity,
  Clock,
  Camera,
  AlertTriangle,
  AlertCircle,
  Moon,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import MetricCard from "../../components/MetricCard";
import Avatar from "../../components/Avatar";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const metrics = [
  { label: "Online Now", value: "18", icon: Monitor, accentClass: "text-primary" },
  { label: "Avg Activity", value: "87%", icon: Activity, accentClass: "text-[#00C2FF]" },
  { label: "Tracked Today", value: "142h", icon: Clock, accentClass: "text-[#7B61FF]" },
  { label: "Screenshots", value: "52", icon: Camera, accentClass: "text-[#FFB800]" },
] as const;

interface ActiveUser {
  name: string;
  role: string;
  status: "online" | "away";
  activity: number;
}

const activeUsers: ActiveUser[] = [
  { name: "Sarah Chen", role: "Frontend Dev", status: "online", activity: 94 },
  { name: "Marcus Johnson", role: "UI Designer", status: "online", activity: 87 },
  { name: "Emily Davis", role: "Backend Dev", status: "away", activity: 72 },
  { name: "Alex Rivera", role: "Product Manager", status: "online", activity: 81 },
];

interface AppUsage {
  name: string;
  percentage: number;
  colorClass: string;
}

const appUsage: AppUsage[] = [
  { name: "VS Code", percentage: 34, colorClass: "bg-primary" },
  { name: "Chrome", percentage: 28, colorClass: "bg-info" },
  { name: "Figma", percentage: 18, colorClass: "bg-purple" },
  { name: "Slack", percentage: 12, colorClass: "bg-warning" },
  { name: "Other", percentage: 8, colorClass: "bg-muted-foreground" },
];

interface AlertItem {
  icon: React.ElementType;
  iconColorClass: string;
  title: string;
  description: string;
  time: string;
  severity: "warning" | "destructive" | "info";
}

const alerts: AlertItem[] = [
  {
    icon: AlertTriangle,
    iconColorClass: "text-[#FFB800]",
    title: "Idle Alert",
    description: "Marcus Johnson idle for 15 min",
    time: "2 min ago",
    severity: "warning",
  },
  {
    icon: AlertCircle,
    iconColorClass: "text-[#FF5C33]",
    title: "Low Activity",
    description: "Emily Davis activity dropped below 50%",
    time: "18 min ago",
    severity: "destructive",
  },
  {
    icon: Moon,
    iconColorClass: "text-[#7B61FF]",
    title: "Unusual Hours",
    description: "Alex Rivera logged in at 11:42 PM",
    time: "34 min ago",
    severity: "info",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ActiveUsersCard() {
  return (
    <div className="bg-card border border-border p-6 rounded-none">
      <h3 className="font-primary text-foreground text-sm font-semibold uppercase tracking-wider mb-5">
        Active Users
      </h3>

      <div className="flex flex-col gap-4">
        {activeUsers.map((user) => (
          <div
            key={user.name}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Avatar name={user.name} />
              <div className="min-w-0">
                <p className="font-secondary text-foreground text-sm font-medium truncate">
                  {user.name}
                </p>
                <p className="font-secondary text-muted-foreground text-xs truncate">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`h-2 w-2 rounded-full ${
                  user.status === "online" ? "bg-[#BFFF00]" : "bg-[#FFB800]"
                }`}
              />
              <span className="font-primary text-foreground text-sm tabular-nums">
                {user.activity}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppUsageCard() {
  return (
    <div className="bg-card border border-border p-6 rounded-none">
      <h3 className="font-primary text-foreground text-sm font-semibold uppercase tracking-wider mb-5">
        Application Usage
      </h3>

      <div className="flex flex-col gap-4">
        {appUsage.map((app) => (
          <div key={app.name} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-secondary text-foreground text-sm">
                {app.name}
              </span>
              <span className="font-primary text-muted-foreground text-xs tabular-nums">
                {app.percentage}%
              </span>
            </div>
            <div className="h-2 w-full bg-[#0A0A0A] rounded-none">
              <div
                className={`h-full ${app.colorClass} rounded-none`}
                style={{ width: `${app.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentAlertsCard() {
  return (
    <div className="bg-card border border-border p-6 rounded-none">
      <h3 className="font-primary text-foreground text-sm font-semibold uppercase tracking-wider mb-5">
        Recent Alerts
      </h3>

      <div className="flex flex-col gap-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.title}
              className="flex items-start gap-3 p-3 bg-[#0A0A0A] border border-border rounded-none"
            >
              <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${alert.iconColorClass}`} />

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="font-secondary text-foreground text-sm font-medium truncate">
                    {alert.title}
                  </p>
                  <Badge variant={alert.severity}>{alert.time}</Badge>
                </div>
                <p className="font-secondary text-muted-foreground text-xs">
                  {alert.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ActivityMonitor(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <PageHeader
        title="Activity Monitor"
        subtitle="Real-time team activity"
      />

      {/* Metric cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <MetricCard
            key={m.label}
            label={m.label}
            value={m.value}
            icon={m.icon}
            accentClass={m.accentClass}
          />
        ))}
      </div>

      {/* Three-column detail grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ActiveUsersCard />
        <AppUsageCard />
        <RecentAlertsCard />
      </div>
    </div>
  );
}
