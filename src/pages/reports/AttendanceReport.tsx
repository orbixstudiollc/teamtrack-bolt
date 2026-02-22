import React, { useState } from "react";
import {
  Download,
  Users,
  AlertTriangle,
  UserX,
  Clock,
  CalendarDays,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import MetricCard from "../../components/MetricCard";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AttendanceRow {
  id: number;
  employee: string;
  department: string;
  checkIn: string;
  checkOut: string;
  totalHours: string;
  status: "Present" | "Late" | "Absent";
  overtime: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const attendanceData: AttendanceRow[] = [
  {
    id: 1,
    employee: "Sarah Chen",
    department: "Engineering",
    checkIn: "08:55",
    checkOut: "17:30",
    totalHours: "8.6h",
    status: "Present",
    overtime: "0.6h",
  },
  {
    id: 2,
    employee: "James Wilson",
    department: "Design",
    checkIn: "09:02",
    checkOut: "18:15",
    totalHours: "9.2h",
    status: "Present",
    overtime: "1.2h",
  },
  {
    id: 3,
    employee: "Maria Garcia",
    department: "Marketing",
    checkIn: "09:47",
    checkOut: "17:45",
    totalHours: "8.0h",
    status: "Late",
    overtime: "0.0h",
  },
  {
    id: 4,
    employee: "David Kim",
    department: "Engineering",
    checkIn: "08:30",
    checkOut: "17:00",
    totalHours: "8.5h",
    status: "Present",
    overtime: "0.5h",
  },
  {
    id: 5,
    employee: "Emma Thompson",
    department: "HR",
    checkIn: "--:--",
    checkOut: "--:--",
    totalHours: "0.0h",
    status: "Absent",
    overtime: "0.0h",
  },
  {
    id: 6,
    employee: "Alex Rivera",
    department: "Sales",
    checkIn: "09:32",
    checkOut: "18:00",
    totalHours: "8.5h",
    status: "Late",
    overtime: "0.5h",
  },
  {
    id: 7,
    employee: "Priya Patel",
    department: "Engineering",
    checkIn: "08:45",
    checkOut: "17:50",
    totalHours: "9.1h",
    status: "Present",
    overtime: "1.1h",
  },
  {
    id: 8,
    employee: "Marcus Johnson",
    department: "Finance",
    checkIn: "08:58",
    checkOut: "17:30",
    totalHours: "8.5h",
    status: "Present",
    overtime: "0.5h",
  },
];

const statusConfig: Record<
  AttendanceRow["status"],
  { bg: string; text: string }
> = {
  Present: { bg: "bg-primary/15", text: "text-primary" },
  Late: { bg: "bg-[#FFB800]/15", text: "text-[#FFB800]" },
  Absent: { bg: "bg-[#FF5C33]/15", text: "text-[#FF5C33]" },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: AttendanceRow["status"] }) {
  const cfg = statusConfig[status];
  return (
    <Badge className={`${cfg.bg} ${cfg.text} rounded-none font-primary text-xs`}>
      {status}
    </Badge>
  );
}

/* ------------------------------------------------------------------ */
/*  Table columns                                                      */
/* ------------------------------------------------------------------ */

const columns = [
  { header: "Employee", accessor: "employee" as const },
  { header: "Check In", accessor: "checkIn" as const },
  { header: "Check Out", accessor: "checkOut" as const },
  { header: "Total Hours", accessor: "totalHours" as const },
  {
    header: "Status",
    accessor: "status" as const,
    render: (_val: string, row: AttendanceRow) => (
      <StatusBadge status={row.status} />
    ),
  },
  { header: "Overtime", accessor: "overtime" as const },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const AttendanceReport: React.FC = () => {
  const [dateFrom, setDateFrom] = useState("2026-02-16");
  const [dateTo, setDateTo] = useState("2026-02-22");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <PageHeader title="Attendance Report" />
          <Button className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-none px-4 py-2 font-primary text-sm font-medium hover:bg-[#d9ff4d] transition-colors">
            <Download size={16} />
            Export
          </Button>
        </div>

        {/* Date Range Toolbar */}
        <div className="mt-6 flex flex-wrap items-center gap-3 border border-border bg-card rounded-none p-4">
          <CalendarDays size={16} className="text-muted-foreground" />
          <span className="font-secondary text-xs text-muted-foreground">
            Date Range
          </span>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="bg-[#0A0A0A] border border-border rounded-none px-3 py-1.5 font-primary text-xs text-foreground focus:outline-none focus:border-primary"
          />
          <span className="text-muted-foreground text-xs">to</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="bg-[#0A0A0A] border border-border rounded-none px-3 py-1.5 font-primary text-xs text-foreground focus:outline-none focus:border-primary"
          />
          <Button className="ml-auto bg-[#0A0A0A] border border-border rounded-none px-4 py-1.5 font-primary text-xs text-foreground hover:border-[#333] transition-colors">
            Apply
          </Button>
        </div>

        {/* Metric Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Present Today"
            value="42/48"
            change="87.5% attendance"
            icon={<Users size={18} />}
          />
          <MetricCard
            title="Late Arrivals"
            value="3"
            change="-2 vs yesterday"
            icon={<AlertTriangle size={18} />}
          />
          <MetricCard
            title="Absent"
            value="6"
            change="+1 vs yesterday"
            icon={<UserX size={18} />}
          />
          <MetricCard
            title="Avg Hours"
            value="8.2h"
            change="+0.3h vs last week"
            icon={<Clock size={18} />}
          />
        </div>

        {/* Desktop: DataTable */}
        <div className="mt-8 hidden md:block">
          <DataTable<AttendanceRow> columns={columns} data={attendanceData} />
        </div>

        {/* Mobile: ListCards */}
        <div className="mt-8 flex flex-col gap-3 md:hidden">
          {attendanceData.map((row) => (
            <ListCard
              key={row.id}
              className="bg-card border border-border rounded-none p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-primary text-sm font-semibold text-foreground">
                    {row.employee}
                  </p>
                  <p className="font-secondary text-xs text-muted-foreground">
                    {row.department}
                  </p>
                </div>
                <StatusBadge status={row.status} />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <div>
                  <p className="font-secondary text-[10px] uppercase tracking-wider text-muted-foreground">
                    Check In
                  </p>
                  <p className="font-primary text-xs text-foreground">
                    {row.checkIn}
                  </p>
                </div>
                <div>
                  <p className="font-secondary text-[10px] uppercase tracking-wider text-muted-foreground">
                    Check Out
                  </p>
                  <p className="font-primary text-xs text-foreground">
                    {row.checkOut}
                  </p>
                </div>
                <div>
                  <p className="font-secondary text-[10px] uppercase tracking-wider text-muted-foreground">
                    Total
                  </p>
                  <p className="font-primary text-xs text-foreground">
                    {row.totalHours}
                  </p>
                </div>
              </div>
            </ListCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
