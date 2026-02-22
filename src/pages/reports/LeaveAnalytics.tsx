import React from "react";
import {
  CalendarDays,
  TrendingDown,
  Palmtree,
  Clock,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import MetricCard from "../../components/MetricCard";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DepartmentLeave {
  id: number;
  department: string;
  annual: number;
  sick: number;
  personal: number;
  total: number;
}

interface MonthlyLeave {
  month: string;
  annual: number;
  sick: number;
  personal: number;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const departmentLeaveData: DepartmentLeave[] = [
  { id: 1, department: "Engineering", annual: 22, sick: 8, personal: 5, total: 35 },
  { id: 2, department: "Sales", annual: 18, sick: 10, personal: 4, total: 32 },
  { id: 3, department: "Marketing", annual: 14, sick: 6, personal: 3, total: 23 },
  { id: 4, department: "HR", annual: 10, sick: 5, personal: 2, total: 17 },
  { id: 5, department: "Finance", annual: 16, sick: 14, personal: 11, total: 41 },
];

const monthlyLeaveData: MonthlyLeave[] = [
  { month: "Sep", annual: 18, sick: 8, personal: 4 },
  { month: "Oct", annual: 22, sick: 10, personal: 5 },
  { month: "Nov", annual: 16, sick: 12, personal: 3 },
  { month: "Dec", annual: 30, sick: 6, personal: 8 },
  { month: "Jan", annual: 20, sick: 9, personal: 6 },
  { month: "Feb", annual: 24, sick: 7, personal: 5 },
];

/* ------------------------------------------------------------------ */
/*  Table columns                                                      */
/* ------------------------------------------------------------------ */

const columns = [
  { header: "Department", accessor: "department" as const },
  {
    header: "Annual",
    accessor: "annual" as const,
    render: (val: number) => (
      <span className="font-primary text-sm text-[#00C2FF]">{val}</span>
    ),
  },
  {
    header: "Sick",
    accessor: "sick" as const,
    render: (val: number) => (
      <span className="font-primary text-sm text-[#FF5C33]">{val}</span>
    ),
  },
  {
    header: "Personal",
    accessor: "personal" as const,
    render: (val: number) => (
      <span className="font-primary text-sm text-[#7B61FF]">{val}</span>
    ),
  },
  {
    header: "Total",
    accessor: "total" as const,
    render: (val: number) => (
      <span className="font-primary text-sm font-bold text-foreground">{val}</span>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function LeaveTrendChart({ data }: { data: MonthlyLeave[] }) {
  const maxTotal = Math.max(...data.map((d) => d.annual + d.sick + d.personal));

  return (
    <div className="space-y-1">
      {/* Legend */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 bg-[#00C2FF]" />
          <span className="font-secondary text-xs text-muted-foreground">Annual</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 bg-[#FF5C33]" />
          <span className="font-secondary text-xs text-muted-foreground">Sick</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 bg-[#7B61FF]" />
          <span className="font-secondary text-xs text-muted-foreground">Personal</span>
        </div>
      </div>

      {/* Stacked bars */}
      <div className="flex items-end gap-3 h-48">
        {data.map((item) => {
          const total = item.annual + item.sick + item.personal;
          const heightPct = (total / maxTotal) * 100;
          const annualPct = (item.annual / total) * 100;
          const sickPct = (item.sick / total) * 100;
          const personalPct = (item.personal / total) * 100;

          return (
            <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="font-primary text-[10px] text-muted-foreground">
                {total}
              </span>
              <div
                className="w-full max-w-[48px] flex flex-col overflow-hidden rounded-none"
                style={{ height: `${heightPct * 1.6}px` }}
              >
                <div
                  className="bg-[#7B61FF]"
                  style={{ height: `${personalPct}%` }}
                />
                <div
                  className="bg-[#FF5C33]"
                  style={{ height: `${sickPct}%` }}
                />
                <div
                  className="bg-[#00C2FF]"
                  style={{ height: `${annualPct}%` }}
                />
              </div>
              <span className="font-secondary text-xs text-muted-foreground">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const LeaveAnalytics: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader title="Leave Analytics" />

        {/* Metric Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Leave Days"
            value="148"
            change="This quarter"
            icon={<CalendarDays size={18} />}
          />
          <MetricCard
            title="Avg per Employee"
            value="3.1"
            change="days this quarter"
            icon={<TrendingDown size={18} />}
          />
          <MetricCard
            title="Most Common"
            value="Annual"
            change="54% of all leave"
            icon={<Palmtree size={18} />}
          />
          <MetricCard
            title="Pending Requests"
            value="12"
            change="Awaiting approval"
            icon={<Clock size={18} />}
          />
        </div>

        {/* Leave by Department */}
        <section className="mt-10">
          <h2 className="font-primary text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Leave by Department
          </h2>

          {/* Desktop */}
          <div className="mt-4 hidden md:block">
            <DataTable<DepartmentLeave>
              columns={columns}
              data={departmentLeaveData}
            />
          </div>

          {/* Mobile */}
          <div className="mt-4 flex flex-col gap-3 md:hidden">
            {departmentLeaveData.map((row) => (
              <ListCard
                key={row.id}
                className="bg-card border border-border rounded-none p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-primary text-sm font-semibold text-foreground">
                    {row.department}
                  </p>
                  <span className="font-primary text-xs font-bold text-foreground">
                    {row.total} days
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div>
                    <p className="font-secondary text-[10px] uppercase tracking-wider text-muted-foreground">
                      Annual
                    </p>
                    <p className="font-primary text-xs text-[#00C2FF]">{row.annual}</p>
                  </div>
                  <div>
                    <p className="font-secondary text-[10px] uppercase tracking-wider text-muted-foreground">
                      Sick
                    </p>
                    <p className="font-primary text-xs text-[#FF5C33]">{row.sick}</p>
                  </div>
                  <div>
                    <p className="font-secondary text-[10px] uppercase tracking-wider text-muted-foreground">
                      Personal
                    </p>
                    <p className="font-primary text-xs text-[#7B61FF]">{row.personal}</p>
                  </div>
                </div>

                {/* Mini bar */}
                <div className="mt-3 flex h-1.5 w-full overflow-hidden rounded-none">
                  <div
                    className="bg-[#00C2FF]"
                    style={{ width: `${(row.annual / row.total) * 100}%` }}
                  />
                  <div
                    className="bg-[#FF5C33]"
                    style={{ width: `${(row.sick / row.total) * 100}%` }}
                  />
                  <div
                    className="bg-[#7B61FF]"
                    style={{ width: `${(row.personal / row.total) * 100}%` }}
                  />
                </div>
              </ListCard>
            ))}
          </div>
        </section>

        {/* Leave Trend */}
        <section className="mt-10">
          <h2 className="font-primary text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Leave Trend
          </h2>

          <div className="mt-4 bg-card border border-border rounded-none p-6">
            <LeaveTrendChart data={monthlyLeaveData} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeaveAnalytics;
