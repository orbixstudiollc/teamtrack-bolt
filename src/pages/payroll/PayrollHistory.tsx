import { useState, useEffect } from "react";
import {
  Calendar,
  Download,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";

// ── Types ──────────────────────────────────────────────────────────────────────

interface PayrollMonth {
  id: string;
  month: string;
  employees: number;
  gross: string;
  deductions: string;
  net: string;
  status: "Completed" | "Processing";
}

// ── Data ───────────────────────────────────────────────────────────────────────

const payrollHistory: PayrollMonth[] = [
  {
    id: "NOV-2025",
    month: "November 2025",
    employees: 48,
    gross: "$284,160",
    deductions: "$42,624",
    net: "$241,536",
    status: "Processing",
  },
  {
    id: "OCT-2025",
    month: "October 2025",
    employees: 46,
    gross: "$275,080",
    deductions: "$41,262",
    net: "$233,818",
    status: "Completed",
  },
  {
    id: "SEP-2025",
    month: "September 2025",
    employees: 46,
    gross: "$272,400",
    deductions: "$40,860",
    net: "$231,540",
    status: "Completed",
  },
  {
    id: "AUG-2025",
    month: "August 2025",
    employees: 44,
    gross: "$261,200",
    deductions: "$39,180",
    net: "$222,020",
    status: "Completed",
  },
  {
    id: "JUL-2025",
    month: "July 2025",
    employees: 44,
    gross: "$258,500",
    deductions: "$38,775",
    net: "$219,725",
    status: "Completed",
  },
  {
    id: "JUN-2025",
    month: "June 2025",
    employees: 42,
    gross: "$248,640",
    deductions: "$37,296",
    net: "$211,344",
    status: "Completed",
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

// ── Table Columns ──────────────────────────────────────────────────────────────

const columns = [
  {
    key: "month" as const,
    label: "Month",
    render: (value: string) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className="font-primary text-sm font-medium text-foreground">
          {value}
        </span>
      </div>
    ),
  },
  {
    key: "employees" as const,
    label: "Employees",
    align: "right" as const,
  },
  {
    key: "gross" as const,
    label: "Gross",
    align: "right" as const,
  },
  {
    key: "deductions" as const,
    label: "Deductions",
    align: "right" as const,
  },
  {
    key: "net" as const,
    label: "Net Pay",
    align: "right" as const,
    render: (value: string) => (
      <span className="font-primary font-semibold text-foreground">{value}</span>
    ),
  },
  {
    key: "status" as const,
    label: "Status",
    render: (value: string, row: PayrollMonth) => (
      <Badge variant={row.status === "Completed" ? "success" : "warning"}>
        {value}
      </Badge>
    ),
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function PayrollHistory() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background text-foreground font-secondary">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader
          title="Payroll History"
          actions={
            <div className="flex items-center gap-3">
              <Button variant="ghost">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="secondary">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          }
        />

        {/* Totals Strip */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Total Paid (6 mo)</p>
            <p className="mt-1 font-primary text-lg font-bold text-foreground">
              $1,359,983
            </p>
          </div>
          <div className="border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Avg Monthly</p>
            <p className="mt-1 font-primary text-lg font-bold text-foreground">
              $226,664
            </p>
          </div>
          <div className="border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Total Deductions</p>
            <p className="mt-1 font-primary text-lg font-bold text-foreground">
              $239,997
            </p>
          </div>
          <div className="border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Avg Headcount</p>
            <p className="mt-1 font-primary text-lg font-bold text-foreground">
              45
            </p>
          </div>
        </div>

        {/* Table / List */}
        <section className="mt-8">
          {isMobile ? (
            <div className="space-y-3">
              {payrollHistory.map((row) => (
                <ListCard
                  key={row.id}
                  leading={
                    <div className="flex h-10 w-10 items-center justify-center border border-border bg-[#0A0A0A]">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                  }
                  title={row.month}
                  subtitle={`${row.employees} employees`}
                  trailing={
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-primary text-sm font-semibold text-foreground">
                        {row.net}
                      </span>
                      <Badge
                        variant={row.status === "Completed" ? "success" : "warning"}
                      >
                        {row.status}
                      </Badge>
                    </div>
                  }
                />
              ))}
            </div>
          ) : (
            <div className="rounded-none border border-border bg-card">
              <DataTable<PayrollMonth>
                columns={columns}
                data={payrollHistory}
              />
            </div>
          )}
        </section>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-primary font-medium text-foreground">6</span>{" "}
            of{" "}
            <span className="font-primary font-medium text-foreground">12</span>{" "}
            months
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
