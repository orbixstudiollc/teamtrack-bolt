import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Play, Pause } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TimesheetEntry {
  id: string;
  project: string;
  task: string;
  startTime: string;
  endTime: string;
  duration: string;
  status: "completed" | "in-progress" | "paused";
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const TIMESHEET_DATA: TimesheetEntry[] = [
  {
    id: "ts-001",
    project: "Design System",
    task: "Component Library Updates",
    startTime: "09:00 AM",
    endTime: "11:15 AM",
    duration: "2h 15m",
    status: "completed",
  },
  {
    id: "ts-002",
    project: "API Integration",
    task: "REST Endpoint Development",
    startTime: "11:30 AM",
    endTime: "01:00 PM",
    duration: "1h 30m",
    status: "completed",
  },
  {
    id: "ts-003",
    project: "Code Review",
    task: "PR Review & Feedback",
    startTime: "02:00 PM",
    endTime: "03:00 PM",
    duration: "1h 00m",
    status: "completed",
  },
  {
    id: "ts-004",
    project: "Team Meeting",
    task: "Sprint Planning",
    startTime: "03:15 PM",
    endTime: "04:00 PM",
    duration: "0h 45m",
    status: "completed",
  },
  {
    id: "ts-005",
    project: "Bug Fixes",
    task: "Critical Issue Resolution",
    startTime: "04:15 PM",
    endTime: "05:45 PM",
    duration: "1h 30m",
    status: "in-progress",
  },
  {
    id: "ts-006",
    project: "Documentation",
    task: "API Docs & Guides",
    startTime: "05:45 PM",
    endTime: "06:30 PM",
    duration: "0h 45m",
    status: "paused",
  },
];

const TOTAL_DURATION = "7h 45m";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function statusVariant(status: TimesheetEntry["status"]) {
  switch (status) {
    case "completed":
      return "success" as const;
    case "in-progress":
      return "warning" as const;
    case "paused":
      return "secondary" as const;
  }
}

function StatusIcon({ status }: { status: TimesheetEntry["status"] }) {
  switch (status) {
    case "completed":
      return <Clock className="h-3 w-3" />;
    case "in-progress":
      return <Play className="h-3 w-3" />;
    case "paused":
      return <Pause className="h-3 w-3" />;
  }
}

/* ------------------------------------------------------------------ */
/*  Column definitions for DataTable                                   */
/* ------------------------------------------------------------------ */

const columns = [
  {
    key: "project" as const,
    header: "Project",
    render: (row: TimesheetEntry) => (
      <span className="font-primary text-sm font-medium text-foreground">
        {row.project}
      </span>
    ),
  },
  {
    key: "task" as const,
    header: "Task",
    render: (row: TimesheetEntry) => (
      <span className="text-sm text-muted-foreground">{row.task}</span>
    ),
  },
  {
    key: "startTime" as const,
    header: "Start Time",
    render: (row: TimesheetEntry) => (
      <span className="font-primary text-sm text-foreground tabular-nums">
        {row.startTime}
      </span>
    ),
  },
  {
    key: "endTime" as const,
    header: "End Time",
    render: (row: TimesheetEntry) => (
      <span className="font-primary text-sm text-foreground tabular-nums">
        {row.endTime}
      </span>
    ),
  },
  {
    key: "duration" as const,
    header: "Duration",
    render: (row: TimesheetEntry) => (
      <span className="font-primary text-sm font-semibold text-primary tabular-nums">
        {row.duration}
      </span>
    ),
  },
  {
    key: "status" as const,
    header: "Status",
    render: (row: TimesheetEntry) => (
      <Badge variant={statusVariant(row.status)}>
        <span className="flex items-center gap-1.5">
          <StatusIcon status={row.status} />
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      </Badge>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TimesheetDaily() {
  const [activeTab] = useState<"daily" | "weekly">("daily");
  const [currentDate] = useState("Nov 15, 2025");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <PageHeader title="Timesheet" subtitle="Daily View" />

      {/* Toolbar */}
      <div className="border-b border-border bg-[#0A0A0A] px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Tab Toggle */}
          <div className="flex rounded-none border border-border">
            <button
              className={`px-4 py-1.5 font-secondary text-sm font-medium transition-colors ${
                activeTab === "daily"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              Daily
            </button>
            <a
              href="/dashboard/timesheet-weekly"
              className="flex items-center px-4 py-1.5 font-secondary text-sm font-medium bg-card text-muted-foreground hover:text-foreground transition-colors"
            >
              Weekly
            </a>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Previous day">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[140px] text-center font-primary text-sm font-medium text-foreground">
              {currentDate}
            </span>
            <Button variant="ghost" size="icon" aria-label="Next day">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="rounded-none border border-border bg-card">
            <DataTable<TimesheetEntry>
              columns={columns}
              data={TIMESHEET_DATA}
              rowKey="id"
            />

            {/* Total Row */}
            <div className="flex items-center justify-between border-t border-border bg-[#0A0A0A] px-4 py-3">
              <span className="font-secondary text-sm font-semibold text-foreground">
                Total
              </span>
              <span className="font-primary text-sm font-bold text-primary tabular-nums">
                {TOTAL_DURATION}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {TIMESHEET_DATA.map((entry) => (
            <ListCard key={entry.id}>
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-primary text-sm font-medium text-foreground">
                      {entry.project}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.task}
                    </p>
                  </div>
                  <Badge variant={statusVariant(entry.status)}>
                    <span className="flex items-center gap-1">
                      <StatusIcon status={entry.status} />
                      {entry.status.charAt(0).toUpperCase() +
                        entry.status.slice(1)}
                    </span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-2">
                  <span className="font-primary text-xs text-muted-foreground tabular-nums">
                    {entry.startTime} - {entry.endTime}
                  </span>
                  <span className="font-primary text-sm font-semibold text-primary tabular-nums">
                    {entry.duration}
                  </span>
                </div>
              </div>
            </ListCard>
          ))}

          {/* Mobile Total Card */}
          <ListCard>
            <div className="flex items-center justify-between">
              <span className="font-secondary text-sm font-semibold text-foreground">
                Total
              </span>
              <span className="font-primary text-base font-bold text-primary tabular-nums">
                {TOTAL_DURATION}
              </span>
            </div>
          </ListCard>
        </div>
      </div>
    </div>
  );
}
