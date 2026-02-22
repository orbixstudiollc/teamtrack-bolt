import React, { useState } from "react";
import {
  DollarSign,
  Banknote,
  Receipt,
  HeartPulse,
  ChevronDown,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import MetricCard from "../../components/MetricCard";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DepartmentPayroll {
  id: number;
  department: string;
  headcount: number;
  grossPay: string;
  taxes: string;
  benefits: string;
  netPay: string;
}

interface MonthlyTrend {
  month: string;
  amount: number;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const departmentData: DepartmentPayroll[] = [
  {
    id: 1,
    department: "Engineering",
    headcount: 18,
    grossPay: "$112,400",
    taxes: "$16,860",
    benefits: "$7,200",
    netPay: "$88,340",
  },
  {
    id: 2,
    department: "Sales",
    headcount: 10,
    grossPay: "$68,500",
    taxes: "$10,275",
    benefits: "$4,100",
    netPay: "$54,125",
  },
  {
    id: 3,
    department: "Marketing",
    headcount: 8,
    grossPay: "$48,200",
    taxes: "$7,230",
    benefits: "$3,200",
    netPay: "$37,770",
  },
  {
    id: 4,
    department: "HR",
    headcount: 5,
    grossPay: "$31,600",
    taxes: "$4,740",
    benefits: "$2,100",
    netPay: "$24,760",
  },
  {
    id: 5,
    department: "Finance",
    headcount: 7,
    grossPay: "$43,300",
    taxes: "$6,495",
    benefits: "$2,800",
    netPay: "$34,005",
  },
];

const trendData: MonthlyTrend[] = [
  { month: "Sep", amount: 268000 },
  { month: "Oct", amount: 272000 },
  { month: "Nov", amount: 275000 },
  { month: "Dec", amount: 290000 },
  { month: "Jan", amount: 280000 },
  { month: "Feb", amount: 284000 },
];

const months = [
  "January 2026",
  "February 2026",
  "December 2025",
  "November 2025",
  "October 2025",
  "September 2025",
];

/* ------------------------------------------------------------------ */
/*  Table columns                                                      */
/* ------------------------------------------------------------------ */

const columns = [
  { header: "Department", accessor: "department" as const },
  { header: "Headcount", accessor: "headcount" as const },
  { header: "Gross Pay", accessor: "grossPay" as const },
  { header: "Taxes", accessor: "taxes" as const },
  { header: "Benefits", accessor: "benefits" as const },
  { header: "Net Pay", accessor: "netPay" as const },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function PayrollTrendChart({ data }: { data: MonthlyTrend[] }) {
  const maxAmount = Math.max(...data.map((d) => d.amount));

  return (
    <div className="flex items-end gap-3 h-48">
      {data.map((item) => {
        const heightPct = (item.amount / maxAmount) * 100;
        return (
          <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
            <span className="font-primary text-[10px] text-muted-foreground">
              ${(item.amount / 1000).toFixed(0)}K
            </span>
            <div className="relative w-full flex justify-center">
              <div
                className="w-full max-w-[48px] bg-primary/80 hover:bg-primary transition-colors rounded-none"
                style={{ height: `${heightPct * 1.6}px` }}
              />
            </div>
            <span className="font-secondary text-xs text-muted-foreground">
              {item.month}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const PayrollSummary: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(months[1]);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <PageHeader title="Payroll Summary" />

          {/* Month Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
              className="inline-flex items-center gap-2 bg-card border border-border rounded-none px-4 py-2 font-primary text-sm text-foreground hover:border-[#333] transition-colors"
            >
              {selectedMonth}
              <ChevronDown size={14} className="text-muted-foreground" />
            </button>

            {monthDropdownOpen && (
              <div className="absolute right-0 z-20 mt-1 w-52 border border-border bg-card rounded-none shadow-xl">
                {months.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setSelectedMonth(m);
                      setMonthDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left font-secondary text-sm transition-colors hover:bg-[#0A0A0A] ${
                      m === selectedMonth
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Metric Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Payroll"
            value="$284K"
            change="+1.4% vs last month"
            icon={<DollarSign size={18} />}
          />
          <MetricCard
            title="Net Disbursed"
            value="$241K"
            change="84.9% of gross"
            icon={<Banknote size={18} />}
          />
          <MetricCard
            title="Tax Withheld"
            value="$42.6K"
            change="15.0% effective rate"
            icon={<Receipt size={18} />}
          />
          <MetricCard
            title="Benefits"
            value="$18.2K"
            change="6.4% of gross"
            icon={<HeartPulse size={18} />}
          />
        </div>

        {/* Department Breakdown */}
        <section className="mt-10">
          <h2 className="font-primary text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Department Breakdown
          </h2>

          {/* Desktop */}
          <div className="mt-4 hidden md:block">
            <DataTable<DepartmentPayroll>
              columns={columns}
              data={departmentData}
            />
          </div>

          {/* Mobile */}
          <div className="mt-4 flex flex-col gap-3 md:hidden">
            {departmentData.map((row) => (
              <ListCard
                key={row.id}
                className="bg-card border border-border rounded-none p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-primary text-sm font-semibold text-foreground">
                    {row.department}
                  </p>
                  <span className="font-primary text-xs text-muted-foreground">
                    {row.headcount} employees
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4">
                  <div>
                    <p className="font-secondary text-[10px] uppercase tracking-wider text-muted-foreground">
                      Gross Pay
                    </p>
                    <p className="font-primary text-xs text-foreground">
                      {row.grossPay}
                    </p>
                  </div>
                  <div>
                    <p className="font-secondary text-[10px] uppercase tracking-wider text-muted-foreground">
                      Net Pay
                    </p>
                    <p className="font-primary text-xs text-primary">
                      {row.netPay}
                    </p>
                  </div>
                  <div>
                    <p className="font-secondary text-[10px] uppercase tracking-wider text-muted-foreground">
                      Taxes
                    </p>
                    <p className="font-primary text-xs text-foreground">
                      {row.taxes}
                    </p>
                  </div>
                  <div>
                    <p className="font-secondary text-[10px] uppercase tracking-wider text-muted-foreground">
                      Benefits
                    </p>
                    <p className="font-primary text-xs text-foreground">
                      {row.benefits}
                    </p>
                  </div>
                </div>
              </ListCard>
            ))}
          </div>
        </section>

        {/* Payroll Trend */}
        <section className="mt-10">
          <h2 className="font-primary text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Payroll Trend
          </h2>

          <div className="mt-4 bg-card border border-border rounded-none p-6">
            <PayrollTrendChart data={trendData} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PayrollSummary;
