import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Coffee,
  TrendingUp,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import MetricCard from "../../components/MetricCard";
import Button from "../../components/Button";
import ListCard from "../../components/ListCard";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface WeeklyProject {
  id: string;
  project: string;
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  total: number;
}

interface WeeklySummary {
  label: string;
  value: string;
  icon: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const WEEKLY_DATA: WeeklyProject[] = [
  {
    id: "wp-001",
    project: "Design System",
    mon: 3.0,
    tue: 2.5,
    wed: 2.0,
    thu: 3.5,
    fri: 1.5,
    total: 12.5,
  },
  {
    id: "wp-002",
    project: "API Integration",
    mon: 2.0,
    tue: 1.5,
    wed: 3.0,
    thu: 1.0,
    fri: 2.5,
    total: 10.0,
  },
  {
    id: "wp-003",
    project: "Code Review",
    mon: 1.0,
    tue: 1.5,
    wed: 0.5,
    thu: 1.0,
    fri: 1.0,
    total: 5.0,
  },
  {
    id: "wp-004",
    project: "Team Meetings",
    mon: 1.5,
    tue: 0.5,
    wed: 1.5,
    thu: 0.5,
    fri: 1.0,
    total: 5.0,
  },
  {
    id: "wp-005",
    project: "Bug Fixes",
    mon: 1.0,
    tue: 1.5,
    wed: 1.0,
    thu: 1.5,
    fri: 1.0,
    total: 6.0,
  },
];

const DAILY_TOTALS = {
  mon: WEEKLY_DATA.reduce((sum, p) => sum + p.mon, 0),
  tue: WEEKLY_DATA.reduce((sum, p) => sum + p.tue, 0),
  wed: WEEKLY_DATA.reduce((sum, p) => sum + p.wed, 0),
  thu: WEEKLY_DATA.reduce((sum, p) => sum + p.thu, 0),
  fri: WEEKLY_DATA.reduce((sum, p) => sum + p.fri, 0),
  total: WEEKLY_DATA.reduce((sum, p) => sum + p.total, 0),
};

const SUMMARY_ITEMS: WeeklySummary[] = [
  {
    label: "Total Hours",
    value: "38.5h",
    icon: <Clock className="h-4 w-4 text-primary" />,
  },
  {
    label: "Billable",
    value: "32h",
    icon: <DollarSign className="h-4 w-4 text-primary" />,
  },
  {
    label: "Non-billable",
    value: "6.5h",
    icon: <Coffee className="h-4 w-4 text-primary" />,
  },
  {
    label: "Utilization",
    value: "83%",
    icon: <TrendingUp className="h-4 w-4 text-primary" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatHours(h: number): string {
  return h % 1 === 0 ? `${h}.0` : `${h}`;
}

function cellColor(h: number): string {
  if (h >= 3) return "text-primary font-semibold";
  if (h >= 2) return "text-foreground";
  if (h > 0) return "text-muted-foreground";
  return "text-muted-foreground/40";
}

/* ------------------------------------------------------------------ */
/*  Table sub-component (desktop)                                      */
/* ------------------------------------------------------------------ */

const DAY_HEADERS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;

function WeeklyTable() {
  return (
    <div className="rounded-none border border-border bg-card overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-[#0A0A0A]">
            <th className="px-4 py-3 text-left font-secondary text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Project
            </th>
            {DAY_HEADERS.map((day) => (
              <th
                key={day}
                className="px-4 py-3 text-center font-secondary text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {day}
              </th>
            ))}
            <th className="px-4 py-3 text-center font-secondary text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {WEEKLY_DATA.map((row) => (
            <tr
              key={row.id}
              className="border-b border-border transition-colors hover:bg-[#0A0A0A]"
            >
              <td className="px-4 py-3 font-primary text-sm font-medium text-foreground">
                {row.project}
              </td>
              {(["mon", "tue", "wed", "thu", "fri"] as const).map((day) => (
                <td
                  key={day}
                  className={`px-4 py-3 text-center font-primary text-sm tabular-nums ${cellColor(row[day])}`}
                >
                  {formatHours(row[day])}
                </td>
              ))}
              <td className="px-4 py-3 text-center font-primary text-sm font-bold text-primary tabular-nums">
                {formatHours(row.total)}
              </td>
            </tr>
          ))}
        </tbody>

        {/* Totals footer */}
        <tfoot>
          <tr className="border-t border-border bg-[#0A0A0A]">
            <td className="px-4 py-3 font-secondary text-sm font-semibold text-foreground">
              Total
            </td>
            {(["mon", "tue", "wed", "thu", "fri"] as const).map((day) => (
              <td
                key={day}
                className="px-4 py-3 text-center font-primary text-sm font-semibold text-foreground tabular-nums"
              >
                {formatHours(DAILY_TOTALS[day])}
              </td>
            ))}
            <td className="px-4 py-3 text-center font-primary text-sm font-bold text-primary tabular-nums">
              {formatHours(DAILY_TOTALS.total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TimesheetWeekly() {
  const [activeTab] = useState<"daily" | "weekly">("weekly");
  const [dateRange] = useState("Nov 11 - Nov 17, 2025");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <PageHeader title="Timesheet" subtitle="Weekly View" />

      {/* Toolbar */}
      <div className="border-b border-border bg-[#0A0A0A] px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Tab Toggle */}
          <div className="flex rounded-none border border-border">
            <a
              href="/dashboard/timesheet-daily"
              className="flex items-center px-4 py-1.5 font-secondary text-sm font-medium bg-card text-muted-foreground hover:text-foreground transition-colors"
            >
              Daily
            </a>
            <button
              className={`px-4 py-1.5 font-secondary text-sm font-medium transition-colors ${
                activeTab === "weekly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              Weekly
            </button>
          </div>

          {/* Date Range Navigation */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Previous week">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[180px] text-center font-primary text-sm font-medium text-foreground">
              {dateRange}
            </span>
            <Button variant="ghost" size="icon" aria-label="Next week">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Weekly Summary Strip */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {SUMMARY_ITEMS.map((item) => (
            <MetricCard key={item.label}>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-none border border-border bg-[#0A0A0A]">
                  {item.icon}
                </div>
                <div>
                  <p className="font-secondary text-xs text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="font-primary text-lg font-bold text-foreground tabular-nums">
                    {item.value}
                  </p>
                </div>
              </div>
            </MetricCard>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <WeeklyTable />
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {WEEKLY_DATA.map((project) => (
            <ListCard key={project.id}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="font-primary text-sm font-medium text-foreground">
                    {project.project}
                  </p>
                  <span className="font-primary text-sm font-bold text-primary tabular-nums">
                    {formatHours(project.total)}h
                  </span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto">
                  {(["mon", "tue", "wed", "thu", "fri"] as const).map(
                    (day) => (
                      <div
                        key={day}
                        className="flex min-w-[48px] flex-col items-center rounded-none border border-border bg-[#0A0A0A] px-2 py-1"
                      >
                        <span className="font-secondary text-[10px] uppercase text-muted-foreground">
                          {day}
                        </span>
                        <span
                          className={`font-primary text-xs tabular-nums ${cellColor(project[day])}`}
                        >
                          {formatHours(project[day])}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </ListCard>
          ))}

          {/* Mobile Total */}
          <ListCard>
            <div className="flex items-center justify-between">
              <span className="font-secondary text-sm font-semibold text-foreground">
                Week Total
              </span>
              <span className="font-primary text-base font-bold text-primary tabular-nums">
                {formatHours(DAILY_TOTALS.total)}h
              </span>
            </div>
          </ListCard>
        </div>
      </div>
    </div>
  );
}
