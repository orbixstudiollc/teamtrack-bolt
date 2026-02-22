import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";
import Avatar from "../../components/Avatar";

// ── Types ──────────────────────────────────────────────────────────────────────

interface PayslipRow {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
  position: string;
  gross: string;
  deductions: string;
  netPay: string;
  status: "Paid" | "Pending" | "Processing";
}

// ── Data ───────────────────────────────────────────────────────────────────────

const employees: PayslipRow[] = [
  {
    id: "EMP-001",
    name: "Sarah Chen",
    initials: "SC",
    position: "Senior Engineer",
    gross: "$8,500",
    deductions: "$1,275",
    netPay: "$7,225",
    status: "Paid",
  },
  {
    id: "EMP-002",
    name: "Marcus Johnson",
    initials: "MJ",
    position: "Product Designer",
    gross: "$7,200",
    deductions: "$1,080",
    netPay: "$6,120",
    status: "Paid",
  },
  {
    id: "EMP-003",
    name: "Aisha Patel",
    initials: "AP",
    position: "Marketing Lead",
    gross: "$6,800",
    deductions: "$1,020",
    netPay: "$5,780",
    status: "Paid",
  },
  {
    id: "EMP-004",
    name: "David Kim",
    initials: "DK",
    position: "DevOps Engineer",
    gross: "$7,800",
    deductions: "$1,170",
    netPay: "$6,630",
    status: "Processing",
  },
  {
    id: "EMP-005",
    name: "Elena Rodriguez",
    initials: "ER",
    position: "Sales Manager",
    gross: "$6,500",
    deductions: "$975",
    netPay: "$5,525",
    status: "Pending",
  },
  {
    id: "EMP-006",
    name: "James Okonkwo",
    initials: "JO",
    position: "HR Specialist",
    gross: "$5,400",
    deductions: "$810",
    netPay: "$4,590",
    status: "Paid",
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

function statusVariant(status: PayslipRow["status"]) {
  switch (status) {
    case "Paid":
      return "success";
    case "Processing":
      return "warning";
    case "Pending":
      return "default";
  }
}

// ── Table Columns ──────────────────────────────────────────────────────────────

const columns = [
  {
    key: "name" as const,
    label: "Employee",
    render: (_: string, row: PayslipRow) => (
      <div className="flex items-center gap-3">
        <Avatar initials={row.initials} src={row.avatarUrl} size="sm" />
        <div>
          <p className="font-primary text-sm font-medium text-foreground">
            {row.name}
          </p>
          <p className="text-xs text-muted-foreground">{row.id}</p>
        </div>
      </div>
    ),
  },
  { key: "position" as const, label: "Position" },
  { key: "gross" as const, label: "Gross", align: "right" as const },
  { key: "deductions" as const, label: "Deductions", align: "right" as const },
  {
    key: "netPay" as const,
    label: "Net Pay",
    align: "right" as const,
    render: (value: string) => (
      <span className="font-primary font-semibold text-foreground">
        {value}
      </span>
    ),
  },
  {
    key: "status" as const,
    label: "Status",
    render: (value: string, row: PayslipRow) => (
      <Badge variant={statusVariant(row.status)}>{value}</Badge>
    ),
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function EmployeePayslips() {
  const isMobile = useIsMobile();
  const [selectedMonth, setSelectedMonth] = useState("November 2025");

  const months = [
    "October 2025",
    "November 2025",
    "December 2025",
  ];
  const currentIdx = months.indexOf(selectedMonth);

  const goBack = () => {
    if (currentIdx > 0) setSelectedMonth(months[currentIdx - 1]);
  };
  const goForward = () => {
    if (currentIdx < months.length - 1) setSelectedMonth(months[currentIdx + 1]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-secondary">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader
          title="Employee Payslips"
          actions={
            <div className="flex items-center gap-3">
              {/* Month selector */}
              <div className="flex items-center gap-2 border border-border bg-card px-3 py-2">
                <button
                  onClick={goBack}
                  disabled={currentIdx === 0}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="min-w-[140px] text-center font-primary text-sm font-medium">
                  {selectedMonth}
                </span>
                <button
                  onClick={goForward}
                  disabled={currentIdx === months.length - 1}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <Button variant="secondary">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          }
        />

        {/* Search */}
        <div className="mt-6 flex items-center gap-2 border border-border bg-card px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full bg-transparent font-secondary text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        {/* Table / List */}
        <section className="mt-6">
          {isMobile ? (
            <div className="space-y-3">
              {employees.map((emp) => (
                <ListCard
                  key={emp.id}
                  leading={
                    <Avatar initials={emp.initials} src={emp.avatarUrl} size="sm" />
                  }
                  title={emp.name}
                  subtitle={emp.position}
                  trailing={
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-primary text-sm font-semibold text-foreground">
                        {emp.netPay}
                      </span>
                      <Badge variant={statusVariant(emp.status)}>
                        {emp.status}
                      </Badge>
                    </div>
                  }
                />
              ))}
            </div>
          ) : (
            <div className="rounded-none border border-border bg-card">
              <DataTable<PayslipRow> columns={columns} data={employees} />
            </div>
          )}
        </section>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-primary font-medium text-foreground">6</span> of{" "}
            <span className="font-primary font-medium text-foreground">48</span> employees
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled>
              Previous
            </Button>
            <Button variant="ghost" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
