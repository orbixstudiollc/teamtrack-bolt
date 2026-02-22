import { useState, useEffect } from "react";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Percent,
  DollarSign,
  MoreVertical,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";

// ── Types ──────────────────────────────────────────────────────────────────────

interface SalaryComponent {
  id: string;
  component: string;
  type: "Fixed" | "Variable";
  percentage: string;
  amount: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const earningsData: SalaryComponent[] = [
  { id: "e1", component: "Basic Salary", type: "Fixed", percentage: "50%", amount: "$2,959" },
  { id: "e2", component: "HRA", type: "Fixed", percentage: "20%", amount: "$1,183" },
  { id: "e3", component: "Transport Allowance", type: "Fixed", percentage: "10%", amount: "$592" },
  { id: "e4", component: "Performance Bonus", type: "Variable", percentage: "5%", amount: "$296" },
  { id: "e5", component: "Health Insurance", type: "Fixed", percentage: "5%", amount: "$296" },
];

const deductionsData: SalaryComponent[] = [
  { id: "d1", component: "Income Tax", type: "Fixed", percentage: "15%", amount: "$888" },
  { id: "d2", component: "Provident Fund", type: "Fixed", percentage: "12%", amount: "$710" },
  { id: "d3", component: "Health Insurance", type: "Fixed", percentage: "5%", amount: "$296" },
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
  { key: "component" as const, label: "Component" },
  {
    key: "type" as const,
    label: "Type",
    render: (value: string) => (
      <Badge variant={value === "Fixed" ? "default" : "warning"}>
        {value}
      </Badge>
    ),
  },
  {
    key: "percentage" as const,
    label: "Percentage",
    align: "right" as const,
    render: (value: string) => (
      <span className="flex items-center justify-end gap-1 font-primary text-sm">
        <Percent className="h-3 w-3 text-muted-foreground" />
        {value}
      </span>
    ),
  },
  {
    key: "amount" as const,
    label: "Amount (Avg)",
    align: "right" as const,
    render: (value: string) => (
      <span className="font-primary font-semibold text-foreground">{value}</span>
    ),
  },
];

// ── Section Component ──────────────────────────────────────────────────────────

function StructureSection({
  title,
  icon,
  data,
  totalPercentage,
  totalAmount,
  isMobile,
}: {
  title: string;
  icon: React.ReactNode;
  data: SalaryComponent[];
  totalPercentage: string;
  totalAmount: string;
  isMobile: boolean;
}) {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="font-primary text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          <Badge variant="default">{data.length} components</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        {isMobile ? (
          <div className="space-y-3">
            {data.map((item) => (
              <ListCard
                key={item.id}
                title={item.component}
                subtitle={
                  <div className="flex items-center gap-2">
                    <Badge variant={item.type === "Fixed" ? "default" : "warning"}>
                      {item.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {item.percentage}
                    </span>
                  </div>
                }
                trailing={
                  <div className="flex items-center gap-2">
                    <span className="font-primary text-sm font-semibold text-foreground">
                      {item.amount}
                    </span>
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                }
              />
            ))}
          </div>
        ) : (
          <div className="rounded-none border border-border bg-card">
            <DataTable<SalaryComponent> columns={columns} data={data} />
          </div>
        )}

        {/* Total Row */}
        <div className="mt-2 flex items-center justify-between border border-border bg-[#0A0A0A] px-4 py-3">
          <span className="font-primary text-sm font-semibold text-foreground">
            Total {title}
          </span>
          <div className="flex items-center gap-6">
            <span className="font-primary text-sm font-medium text-muted-foreground">
              {totalPercentage}
            </span>
            <span className="font-primary text-sm font-semibold text-foreground">
              {totalAmount}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page Component ─────────────────────────────────────────────────────────────

export default function SalaryStructure() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background text-foreground font-secondary">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader
          title="Salary Structure"
          actions={
            <Button variant="primary">
              <Plus className="mr-2 h-4 w-4" />
              Add Component
            </Button>
          }
        />

        {/* Summary bar */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Total Earnings</p>
            <p className="mt-1 font-primary text-xl font-bold text-foreground">
              90%
            </p>
            <p className="text-xs text-muted-foreground">$5,326 avg/employee</p>
          </div>
          <div className="border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Total Deductions</p>
            <p className="mt-1 font-primary text-xl font-bold text-destructive">
              32%
            </p>
            <p className="text-xs text-muted-foreground">$1,894 avg/employee</p>
          </div>
          <div className="border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Net Pay Ratio</p>
            <p className="mt-1 font-primary text-xl font-bold text-primary">
              68%
            </p>
            <p className="text-xs text-muted-foreground">$4,023 avg/employee</p>
          </div>
        </div>

        {/* Earnings Section */}
        <div className="mt-10">
          <StructureSection
            title="Earnings"
            icon={<TrendingUp className="h-5 w-5 text-primary" />}
            data={earningsData}
            totalPercentage="90%"
            totalAmount="$5,326"
            isMobile={isMobile}
          />
        </div>

        {/* Deductions Section */}
        <div className="mt-10">
          <StructureSection
            title="Deductions"
            icon={<TrendingDown className="h-5 w-5 text-destructive" />}
            data={deductionsData}
            totalPercentage="32%"
            totalAmount="$1,894"
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
}
