import { useState } from "react";
import {
  Calendar,
  Clock,
  Heart,
  Award,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import MetricCard from "../../components/MetricCard";
import DataTable from "../../components/DataTable";
import ListCard from "../../components/ListCard";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LeaveBalance {
  label: string;
  used: number;
  total: number;
  icon: React.ReactNode;
  trend: "up" | "down";
  trendValue: string;
}

interface DepartmentLeave {
  department: string;
  annual: number;
  sick: number;
  personal: number;
  compOff: number;
}

interface RecentRequest {
  id: string;
  employee: string;
  avatar: string;
  type: string;
  from: string;
  to: string;
  status: "Approved" | "Pending" | "Rejected";
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const leaveBalances: LeaveBalance[] = [
  {
    label: "Annual Leave",
    used: 18,
    total: 24,
    icon: <Calendar className="h-5 w-5 text-[#BFFF00]" />,
    trend: "up",
    trendValue: "+3 this month",
  },
  {
    label: "Sick Leave",
    used: 3,
    total: 10,
    icon: <Heart className="h-5 w-5 text-[#FF5C33]" />,
    trend: "down",
    trendValue: "-1 this month",
  },
  {
    label: "Personal",
    used: 2,
    total: 5,
    icon: <Clock className="h-5 w-5 text-[#00C2FF]" />,
    trend: "up",
    trendValue: "+1 this month",
  },
  {
    label: "Comp Off",
    used: 1,
    total: 3,
    icon: <Award className="h-5 w-5 text-[#7B61FF]" />,
    trend: "down",
    trendValue: "No change",
  },
];

const departmentLeaveData: DepartmentLeave[] = [
  { department: "Engineering", annual: 42, sick: 8, personal: 6, compOff: 3 },
  { department: "Design", annual: 18, sick: 4, personal: 3, compOff: 1 },
  { department: "Marketing", annual: 22, sick: 6, personal: 4, compOff: 2 },
  { department: "Sales", annual: 30, sick: 5, personal: 5, compOff: 2 },
  { department: "HR", annual: 10, sick: 2, personal: 2, compOff: 1 },
];

const recentRequests: RecentRequest[] = [
  {
    id: "LR-001",
    employee: "Sarah Chen",
    avatar: "SC",
    type: "Annual",
    from: "Nov 18, 2025",
    to: "Nov 22, 2025",
    status: "Approved",
  },
  {
    id: "LR-002",
    employee: "Marcus Rivera",
    avatar: "MR",
    type: "Sick",
    from: "Nov 20, 2025",
    to: "Nov 21, 2025",
    status: "Pending",
  },
  {
    id: "LR-003",
    employee: "Aisha Patel",
    avatar: "AP",
    type: "Personal",
    from: "Nov 25, 2025",
    to: "Nov 25, 2025",
    status: "Approved",
  },
  {
    id: "LR-004",
    employee: "James O'Brien",
    avatar: "JO",
    type: "Comp Off",
    from: "Nov 28, 2025",
    to: "Nov 29, 2025",
    status: "Rejected",
  },
  {
    id: "LR-005",
    employee: "Lena Kowalski",
    avatar: "LK",
    type: "Annual",
    from: "Dec 01, 2025",
    to: "Dec 05, 2025",
    status: "Pending",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusVariant: Record<RecentRequest["status"], string> = {
  Approved: "bg-[#BFFF00]/10 text-[#BFFF00]",
  Pending: "bg-[#FFB800]/10 text-[#FFB800]",
  Rejected: "bg-[#FF5C33]/10 text-[#FF5C33]",
};

const leaveTypeColor: Record<string, string> = {
  Annual: "bg-[#BFFF00]",
  Sick: "bg-[#FF5C33]",
  Personal: "bg-[#00C2FF]",
  "Comp Off": "bg-[#7B61FF]",
};

function ProgressBar({ used, total }: { used: number; total: number }) {
  const pct = Math.round((used / total) * 100);
  return (
    <div className="mt-3 space-y-1.5">
      <div className="flex items-center justify-between text-xs font-[Inter]">
        <span className="text-[#6e6e6e]">
          {used}/{total} days used
        </span>
        <span className="text-white">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-none bg-[#1A1A1A]">
        <div
          className="h-full rounded-none bg-[#BFFF00] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LeaveOverview() {
  const [isMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  // ---- Desktop table columns ----
  const columns = [
    {
      header: "Employee",
      accessor: "employee" as const,
      render: (row: RecentRequest) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-none bg-[#1A1A1A] text-xs font-semibold text-white font-[JetBrains_Mono]">
            {row.avatar}
          </div>
          <span className="text-sm font-medium text-white font-[Inter]">
            {row.employee}
          </span>
        </div>
      ),
    },
    {
      header: "Type",
      accessor: "type" as const,
      render: (row: RecentRequest) => (
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-none ${leaveTypeColor[row.type] ?? "bg-white"}`}
          />
          <span className="text-sm text-[#6e6e6e] font-[Inter]">
            {row.type}
          </span>
        </div>
      ),
    },
    {
      header: "From",
      accessor: "from" as const,
      render: (row: RecentRequest) => (
        <span className="text-sm text-[#6e6e6e] font-[JetBrains_Mono]">
          {row.from}
        </span>
      ),
    },
    {
      header: "To",
      accessor: "to" as const,
      render: (row: RecentRequest) => (
        <span className="text-sm text-[#6e6e6e] font-[JetBrains_Mono]">
          {row.to}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status" as const,
      render: (row: RecentRequest) => (
        <Badge className={`rounded-none px-2.5 py-1 text-xs font-medium font-[Inter] ${statusVariant[row.status]}`}>
          {row.status}
        </Badge>
      ),
    },
  ];

  // ---- Max bar width for distribution chart ----
  const maxTotal = Math.max(
    ...departmentLeaveData.map(
      (d) => d.annual + d.sick + d.personal + d.compOff,
    ),
  );

  return (
    <div className="min-h-screen bg-[#000] text-white font-[Inter]">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <PageHeader
          title="Leave Management"
          subtitle="Overview & balances"
        />

        {/* Metric Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leaveBalances.map((lb) => (
            <MetricCard key={lb.label}>
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-none bg-[#0A0A0A] border border-[#1A1A1A]">
                  {lb.icon}
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium font-[Inter] ${
                    lb.trend === "up" ? "text-[#BFFF00]" : "text-[#FF5C33]"
                  }`}
                >
                  {lb.trend === "up" ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {lb.trendValue}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-[#6e6e6e] font-[JetBrains_Mono]">
                  {lb.label}
                </p>
                <p className="mt-1 text-2xl font-bold text-white font-[JetBrains_Mono]">
                  {lb.used}
                  <span className="text-base font-normal text-[#6e6e6e]">
                    /{lb.total}
                  </span>
                </p>
              </div>

              <ProgressBar used={lb.used} total={lb.total} />
            </MetricCard>
          ))}
        </div>

        {/* Leave Distribution */}
        <div className="rounded-none border border-[#1A1A1A] bg-[#111] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white font-[Inter]">
                Leave Distribution
              </h2>
              <p className="mt-0.5 text-sm text-[#6e6e6e] font-[Inter]">
                Department-wise leave usage
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#6e6e6e] font-[Inter]">
              <TrendingUp className="h-4 w-4" />
              <span>Current quarter</span>
            </div>
          </div>

          {/* Stacked bar chart (CSS-only) */}
          <div className="space-y-4">
            {departmentLeaveData.map((dept) => {
              const total =
                dept.annual + dept.sick + dept.personal + dept.compOff;
              return (
                <div key={dept.department} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm font-[Inter]">
                    <span className="text-white">{dept.department}</span>
                    <span className="text-[#6e6e6e] font-[JetBrains_Mono]">
                      {total} days
                    </span>
                  </div>
                  <div className="flex h-3 w-full overflow-hidden rounded-none bg-[#0A0A0A]">
                    <div
                      className="h-full bg-[#BFFF00] transition-all duration-500"
                      style={{
                        width: `${(dept.annual / maxTotal) * 100}%`,
                      }}
                    />
                    <div
                      className="h-full bg-[#FF5C33] transition-all duration-500"
                      style={{
                        width: `${(dept.sick / maxTotal) * 100}%`,
                      }}
                    />
                    <div
                      className="h-full bg-[#00C2FF] transition-all duration-500"
                      style={{
                        width: `${(dept.personal / maxTotal) * 100}%`,
                      }}
                    />
                    <div
                      className="h-full bg-[#7B61FF] transition-all duration-500"
                      style={{
                        width: `${(dept.compOff / maxTotal) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 border-t border-[#1A1A1A] pt-4">
            {[
              { label: "Annual", color: "bg-[#BFFF00]" },
              { label: "Sick", color: "bg-[#FF5C33]" },
              { label: "Personal", color: "bg-[#00C2FF]" },
              { label: "Comp Off", color: "bg-[#7B61FF]" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-xs text-[#6e6e6e] font-[Inter]"
              >
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-none ${item.color}`}
                />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Leave Requests */}
        <div className="rounded-none border border-[#1A1A1A] bg-[#111] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white font-[Inter]">
                Recent Leave Requests
              </h2>
              <p className="mt-0.5 text-sm text-[#6e6e6e] font-[Inter]">
                Latest 5 requests across the organisation
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#6e6e6e] font-[Inter]">
              <Users className="h-4 w-4" />
              <span>{recentRequests.length} requests</span>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <DataTable columns={columns} data={recentRequests} />
          </div>

          {/* Mobile */}
          <div className="space-y-3 md:hidden">
            {recentRequests.map((req) => (
              <ListCard key={req.id}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-none bg-[#0A0A0A] border border-[#1A1A1A] text-xs font-semibold text-white font-[JetBrains_Mono]">
                      {req.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white font-[Inter]">
                        {req.employee}
                      </p>
                      <p className="text-xs text-[#6e6e6e] font-[Inter]">
                        {req.type} Leave
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`rounded-none px-2 py-0.5 text-xs font-medium font-[Inter] ${statusVariant[req.status]}`}
                  >
                    {req.status}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-[#6e6e6e] font-[JetBrains_Mono]">
                  <Calendar className="h-3.5 w-3.5" />
                  {req.from} &mdash; {req.to}
                </div>
              </ListCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
