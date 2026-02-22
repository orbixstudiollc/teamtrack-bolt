import { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import MetricCard from "../../components/MetricCard";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";

// ── Types ──────────────────────────────────────────────────────────────────────

interface DepartmentRow {
  department: string;
  employees: number;
  total: string;
  avg: string;
  status: "On Track" | "Over Budget" | "Under Review";
}

// ── Data ───────────────────────────────────────────────────────────────────────

const departmentData: DepartmentRow[] = [
  {
    department: "Engineering",
    employees: 16,
    total: "$112,000",
    avg: "$7,000",
    status: "On Track",
  },
  {
    department: "Design",
    employees: 8,
    total: "$52,000",
    avg: "$6,500",
    status: "On Track",
  },
  {
    department: "Marketing",
    employees: 10,
    total: "$55,000",
    avg: "$5,500",
    status: "Over Budget",
  },
  {
    department: "Sales",
    employees: 9,
    total: "$45,000",
    avg: "$5,000",
    status: "Under Review",
  },
  {
    department: "Operations",
    employees: 5,
    total: "$20,160",
    avg: "$4,032",
    status: "On Track",
  },
];

const columns = [
  { key: "department" as const, label: "Department" },
  { key: "employees" as const, label: "Employees", align: "right" as const },
  { key: "total" as const, label: "Total", align: "right" as const },
  { key: "avg" as const, label: "Avg Salary", align: "right" as const },
  {
    key: "status" as const,
    label: "Status",
    render: (value: string) => {
      const variant =
        value === "On Track"
          ? "success"
          : value === "Over Budget"
            ? "destructive"
            : "warning";
      return <Badge variant={variant}>{value}</Badge>;
    },
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────────

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);
    onChange(mql);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
}

function getCountdown(target: Date): string {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return "Today";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return `${days}d ${hours}h remaining`;
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function PayrollOverview() {
  const isMobile = useIsMobile();
  const nextPayrollDate = new Date(2025, 11, 1); // Dec 1, 2025
  const [countdown, setCountdown] = useState(getCountdown(nextPayrollDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(nextPayrollDate));
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-secondary">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader
          title="Payroll Overview"
          actions={
            <Button variant="primary" href="/payroll/run">
              <DollarSign className="mr-2 h-4 w-4" />
              Run Payroll
            </Button>
          }
        />

        {/* Metric Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Payroll"
            value="$284K"
            icon={<DollarSign className="h-5 w-5" />}
            trend="+3.2% from last month"
          />
          <MetricCard
            title="Employees"
            value="48"
            icon={<Users className="h-5 w-5" />}
            trend="+2 new this month"
          />
          <MetricCard
            title="Avg Salary"
            value="$5,917"
            icon={<TrendingUp className="h-5 w-5" />}
            trend="+1.8% from last month"
          />
          <MetricCard
            title="Pending"
            value="$12.4K"
            icon={<Clock className="h-5 w-5" />}
            trend="3 employees pending"
          />
        </div>

        {/* Department Breakdown */}
        <section className="mt-10">
          <h2 className="mb-4 font-primary text-lg font-semibold tracking-tight text-foreground">
            Department Breakdown
          </h2>

          {isMobile ? (
            <div className="space-y-3">
              {departmentData.map((dept) => (
                <ListCard
                  key={dept.department}
                  title={dept.department}
                  subtitle={`${dept.employees} employees`}
                  trailing={
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-primary text-sm font-medium text-foreground">
                        {dept.total}
                      </span>
                      <Badge
                        variant={
                          dept.status === "On Track"
                            ? "success"
                            : dept.status === "Over Budget"
                              ? "destructive"
                              : "warning"
                        }
                      >
                        {dept.status}
                      </Badge>
                    </div>
                  }
                />
              ))}
            </div>
          ) : (
            <div className="rounded-none border border-border bg-card">
              <DataTable<DepartmentRow> columns={columns} data={departmentData} />
            </div>
          )}
        </section>

        {/* Upcoming Payroll */}
        <section className="mt-10">
          <div className="rounded-none border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-[#0A0A0A] border border-border">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-primary text-sm font-semibold text-foreground">
                  Upcoming Payroll
                </h3>
                <p className="text-xs text-muted-foreground">
                  Next scheduled payroll run
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-primary text-2xl font-bold text-foreground">
                  December 1, 2025
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {countdown}
                </p>
              </div>
              <Button variant="ghost" className="group">
                View Schedule
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
